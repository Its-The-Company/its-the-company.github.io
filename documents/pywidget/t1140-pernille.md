---
layout: "default"
title: "T-3133: review of T-1140, how the app records widget runs"
section: "documents"
description: "Verdict: PASS-with-fixes. Nothing here hangs, deadlocks or touches a person&#x27;s scripts. Lock ordering is clean. Four Medium findings: three ways a run ends up with no row at all, and one memory amplification on\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1140-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t1140-pernille.md</code></span></div><h1>T-3133: review of T-1140, how the app records widget runs</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS-with-fixes.** Nothing here hangs, deadlocks or touches a person's scripts. Lock ordering is clean.
Four Medium findings: three ways a run ends up with no row at all, and one memory amplification on output-heavy
runs. Fix F1 to F4 before the first TestFlight build that ships the Activity screen. They do not block a build without
that screen. The Lows can wait.

Read: 0cfa6404b, 94f1203da, 8b90f35f8, f13def282, 3727c91d9 and the files they touch at HEAD (69018af2d);
ExtensionLane.swift (0e756d6cc and later fixes); CrashMarker.swift; PyBridge.swift runAndEmit/doStart; LaneGuard.swift
WidgetStateLock; WidgetStatus.swift WidgetStatusStore; RunLogStore/RunLogRetention; WidgetScriptSave.swift's commit;
ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-02 5:15 PM items 1-7; board lines T-1140/T-3132 and T-0198. I did not see Idris's reasoning.

Ran: `swift test --filter 'RunLog|WidgetStatus'` in pywidget/ios/Core on the host: 128 tests, 0 failures. On the host,
a 12-line Swift script showed that an `AsyncStream` loop whose task is cancelled ends without the element yielded after
the cancel (`stream ended without finished, cancelled=true seen [1]`). That is the mechanism behind F3. No Xcode
suite was run. RunLogUITests is judged from its code only (job J-20261106-1712 runs it).

## What holds

- **Lock order.** `RunLogStore.recordWidgetRun` takes `state.lock` (flock) and then, inside `status`,
  `WidgetStatusStore.writeLock`. `recordExpiry` takes only `writeLock`. Nothing takes `writeLock` and then waits on a
  flock, so there is no cycle. No recorder call is made while another flock is held: `sink.finish` releases
  `state.lock` before `record`, `bridge.takeBudgetStop` is evaluated before the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, and in ExtensionLane
  `demotions.add` returns before `logMarkerDemotion`/`recordLaneTurn`. Every wait is the bounded 0.5 s LOCK_NB loop,
  so a suspended or dead holder costs at most 0.5 s per lock. That gives one lost row (L1) and never a hang.
- **Order inside a hold.** The row, then the detail, then status.json (RunLogStore.swift:75-96). A crash after the
  row and before the detail leaves a row whose detail reads as `d.nokept`. A crash before status.json leaves the old
  status. A detail is never written without its row. A stray `.atomic` temp file in `out/` is not a kept row's
  detail, so the next prune deletes it (RunLogRetention.swift:73).
- **Killed rows against T-0198.** `recover` (RunLogRecorder.swift:229-272) always writes the row as `killed`/`stuck`,
  sets `after_expiry` from the `expired_runs` decision, and writes status.json only on `.writeKilled`. The decision
  is checked again under the mutex. A marker with no launch line counts as a real <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. This matches T-0198 and
  ADR-007 item 3 ("decides status.json, not the row"). A live `stuck` row is not doubled at launch (`hasStuckRow`
  matches the launch:run key).
- **0xdead10cc.** Every App Group write in the app runs inside `BackgroundHold` (WidgetWriter, LaunchRunLog,
  ConsoleModel.logConsoleRun, ShortcutRun.logFinished).
- **Main thread.** No recorder call runs on the main actor. `BackgroundHold.app` hops to it only for
  `beginBackgroundTask`/`endBackgroundTask`, and the launch pass is `Task.detached`. ConsoleModel.boot *awaits*
  the pass, which delays the "ready" line but does not block the main thread.
- **A save does not break the lock.** WidgetScriptSave swaps files one by one inside `widgets/<id>/`, so
  `state.lock` keeps its inode across a save. A `.moves` rename takes the lock with the folder, and a run of the old id
  then finds no folder and writes nothing (T-0753's rule).
- **Growth.** Rows are <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 1 MiB per widget and 512 KiB for the console, with 14 days' age. Details are capped
  at 24 KiB each and 100 per widget, and the whole log at 24 MiB at launch. RunClaims and `budgetStopped` are each
  capped at 256 entries.

## Findings

### F1 (M): a run that ends just before the app is killed gets no row and no killed row

PyBridge.swift:982 deletes run.marker as soon as `pw_rt_run` returns. The row is written later, after
`RunResultSink.collect` returns, after a `MainActor.run` hop to `beginBackgroundTask`, and after `sink.finish`
(WidgetWriter.swift:203-214, :287-291). The console's row comes even later, when `render` sees `finished`
(PyWidgetApp.swift:790-805). The Shortcut's row likewise waits for its loop to see `finished`. If the process is killed
in that gap, the run leaves no live row. It also leaves no marker, so the next launch writes no `killed` row, and
status.json keeps the previous outcome.

Concrete case: a widget run finishes while the app is going to the background. The app is suspended before the hop
to the main actor runs, and iOS then reclaims the suspended app. The tree was never written either. The run log shows
nothing for that run, although ADR-007 item 3 makes the marker the source of `killed` rows.

Fix: end the marker only after the run's row is durable. Either the bridge leaves the marker and the run sink ends
it once its hold returns, or begin the background assertion before the run is queued and hold it across collect.
Recovery then needs to skip a marker whose launch:run already has a row. `hasStuckRow` already does that for
`stuck`; widen it to any row. Add a test that kills between `pw_rt_run`'s return and the hold. A debug hold like
`holdRunEnd` would do.

### F2 (M): the last launch's marker is deleted at start, before its killed row is written

`CrashMarker.collect()` deletes run.marker as soon as it reads it (CrashMarker.swift:122-124). It is called at the top
of `doStart` (PyBridge.swift:900). The report then lives only in memory until `LaunchRunLog.afterStart` writes the
row. That happens after `pw_rt_start` (interpreter init, which takes about 1-2 s on a device) and after the
`BackgroundHold` begins (LaunchRunLog.swift:35-46).

Concrete case: a widget run is jetsammed, so a marker is left. iOS then launches the app in the background for the
Refresh Widgets intent or T2, and kills that launch too (memory again, or the intent's time limit) during Python init.
The marker is gone, and the kill gets no row, no `killed` in status.json and no loop-breaker count. This is the case
the loop breaker exists for: a widget whose run kills the process again and again. The faulthandler text goes the
same way.

Fix: `collect()` reads without deleting. The launch pass deletes the marker after `recover` returns a written row (or
a decision of "nothing to write"), with the same launch:run dedupe as F1, so a pass that runs twice writes one row.

### F3 (M): a Shortcut run that Shortcuts cancels writes no row

RunScriptIntents.swift:159 reads the run's records with `for await` inside `withTaskCancellationHandler`. When
Shortcuts cancels the intent (its own time limit, or the person stopping the shortcut), `onCancel` stops the run.
The `AsyncStream` iterator then returns nil at once, so the loop falls through to `throw CancellationError()` at :171
and the `finished` record is never seen. I checked this on the host (see Ran). The run returns, and PyBridge.swift:982
removes the marker. The result is no live row and no recovered row. `cancelled: Task.isCancelled` at :166, and the
cancelled branch of `RunLogRecorder.shortcutOutcome` (RunLogRecorder.swift:171-174), only run in the rare case where
the cancel lands after `finished` was delivered. ShortcutRunLogTests has no cancellation test.

Fix: log a cancelled run from the `onCancel`/catch path: an `error` KeyboardInterrupt row with `trigger=shortcut`,
awaited inside `runLogHold` before rethrowing, or wait a bounded time for the run's `finished` on a separate
subscription. Add a test that cancels a `while True: pass` Shortcut run and expects exactly one console row.

### F4 (M): a run's whole output is copied two or three more times before the detail keeps 16 KiB

`RunResultSink.collect` (RunResultSink.swift:64-72) keeps every record of the run. That came before T-1140. T-1140
then has `WidgetRunLog.output` (WidgetRunLog.swift:39-56) join all of a stretch's bytes into one `Data`, decode it
into a `String` and hand the full `[OutputRecord]` to `RunDetail.file`, which keeps the last 16 KiB. The peak for an
output-heavy run is therefore several times its total output, held at the moment the app writes, inside the
background hold.

Concrete case: a widget script with `while True: print("x" * 1000)` runs its 5 s budget (`stopDeadlineSeconds`) in
the app <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. Every byte it printed is held as records, then as one `Data`, then as one `String`. In a background
launch (T2, the Refresh intent) with a low memory limit, that can jetsam the app. F1 and F2 then lose even the
`killed` row. In the extension lane (C = 30 MiB, flag off in Release today) the threshold is a few MiB.

Fix: build the detail's output from the tail. Walk the records backwards until 16 KiB + 4 bytes (the UTF-8 slack) is
covered, set `cut` when anything was left out, and decode only that. Better still, have `collect` keep a bounded tail
of stdout/stderr beside the tree and `finished` records, so that neither lane ever holds more than a cap. Pin it with
a test: 50 MiB of output in records gives a detail of at most 24 KiB with `cut: true`, and the peak does not grow
with the output size (count bytes allocated, or check that `output()` never receives more than the tail).

### L1: a lock timeout drops the row and status.json with no second try

RunLogStore.swift:69-75 returns nil after 0.5 s. WidgetWriter.record (WidgetWriter.swift:226-233) has by then
already claimed the run id in `RunClaims` and the marker is gone, so nothing retries. The comment says that the next
run writes status. This is rare (it needs the extension holding the same widget's lock for more than 0.5 s), but the
row is lost for good. A single retry after the wait, or one log line so a field report shows it, would be enough.

### L2: the launch pass is one long background hold

LaunchRunLog.swift:41 runs `atLaunch`, including the recovery, every widget's render-fault check, `pruneAll` and the
24 MiB pass, under one `beginBackgroundTask`. `BackgroundTask.begin` ends the assertion from its expiration handler
(WidgetWriter.swift:300) while the body may still hold a flock. In a background launch with little time left, the app
would then be suspended holding `state.lock` (0xdead10cc). `beginBackgroundTask` can also return `.invalid`, and the
body then runs with no assertion at all. Fix: one hold per widget in `pruneAll`, and skip the remaining widgets once
the expiration handler has fired.

### L3: a live row can say `error` where status.json kept the handler's write

RunLogRecorder.swift:87-104 decides `expired` for the row in `prepare`, and for status again under the mutex. An
expiry that lands between the two leaves a row that says `error KeyboardInterrupt` (or the real outcome) while
status.json is the handler's. The handler lists the run before it stops it, so this needs a run that finishes
naturally at the moment of expiry. It is cosmetic, and I note it only for T-0793's wiring.

### L4: once a widget has 100 details, every append reads and decodes its whole runs.jsonl

RunLogRetention.swift:84 (`details >= detailRows`) sends every append from the 101st detail onward through
`pruneWidget`. That function reads up to 1 MiB of rows, decodes each one and lists `out/`, all inside `state.lock`.
A widget refreshed every 15 minutes reaches that after about 25 hours. This is my code (T-1139), not Idris's: it
costs time inside the hold, and memory in the extension. I will take it: delete only the oldest detail by name order
when the count is reached, and leave the full plan to the age/cap path and the launch pass.

### L5: console rows name the file, not the project

PyWidgetApp.swift:793 uses `fileTitle` (the file's last path component). Every project's `main.py` therefore logs as
`main.py`, while ADR-007 item 4 says "the project name as `id`" and the Shortcut path names the folder
(`shortcutProject`). The Runs log cannot tell projects apart. Use the project folder's name for a project file, and
keep `fileTitle` for a loose file. Change recovery (`RunLogRecorder.project`) the same way, so the two agree.

### L6: `peak_mb` is missing on most runs

WidgetWriter.swift:251-254 reports the process's *lifetime* peak only when a run raised it, so after the first heavy
run of a launch most rows have no `peak_mb`. Reporting nil is the honest choice: the lifetime peak cannot measure one
run. But the Activity screen and ADR item 3's "task_info around the run" will read it as a figure that exists.
Maren's column needs a word for "not measured" (T-1141).

### L7: RunLogUITests would pass with a duplicated killed row

RunLogUITests.swift:157-158 accepts `>= count`, and step 3 reads only `after[2]` (:78-85). If the launch pass ran
twice, or recovery and a live write both logged the killed run, there would be four rows and the test would still
pass. Step 3 should assert that exactly one row has `run_id == runID` and that no row after the killed one says
`killed`. The test can otherwise fail when the behaviour is wrong: a fresh id, exact keys, the detail text, the
marker's run and launch, and status.json at each step. It also leaves the `uitest-runlog-<token>` project behind on
the Simulator, since teardown removes only the widget and log folders.

## Board

- F1: T-3135 (Idris, P1)
- F2: T-3136 (Idris, P1)
- F3: T-3137 (Idris, P1)
- F4: T-3138 (Idris, P1)
- L1-L3, L5-L7 are for Idris to fold into T-3132 or later lines at his choice. L4 is mine and I will raise it under
  T-1139.
{% endraw %}

</div>
