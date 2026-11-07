---
layout: "default"
title: "T-3142: re-review of the fixes for t1140 F1-F4 and L7"
section: "documents"
description: "Verdict: PASS-with-fixes. F1, F2, F3, F4 and L7 are fixed as asked, and each test fails on the old behaviour. The cancel path cannot hang or write two rows, the UTF-8 cut is right, and the lock order has not changed\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3135-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t3135-pernille.md</code></span></div><h1>T-3142: re-review of the fixes for t1140 F1-F4 and L7</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS-with-fixes.** F1, F2, F3, F4 and L7 are fixed as asked, and each test fails on the old behaviour.
The cancel path cannot hang or write two rows, the UTF-8 cut is right, and the lock order has not changed. Two new
Medium findings come from the F1/F2 change itself. M1: a left marker for a widget that no longer exists is never
cleared, and the console then repeats the crash line at every launch. M2: a run that *returned* before its row
is recovered as a real <span title="A test written in advance. If it fires, we drop the idea.">kill</span>, so a healthy widget gets the `killed` badge and moves toward the loop breaker (limit 2).
Both are small. Fix them before the first TestFlight build that ships the Activity screen. They do not block a build
without that screen.

Read: b4632bfb6, a9e90e166, 73fda614a (no later commit touches pywidget/ios); CrashMarker.swift, PyBridge.swift
(RunRequest.rowOwed, runRowWritten, clearRecovered, doStart, runAndEmit, stop, records(after:)), RunLogRecorder.swift
(atLaunch, recovered, hasRow), LaunchRunLog.swift, WidgetWriter.swift (run to record, BackgroundHold), PyWidgetApp.swift
(console close and logConsoleRun), RunScriptIntents.swift, ShortcutRunLog.swift, ShortcutRunRecords.swift,
RunDetail.swift, WidgetRunLog.swift, RunLogStore.recordWidgetRun, LaneGuard.swift WidgetStateLock, WidgetStatus.swift
(Recovery, LoopBreaker); the new tests in RunLogRecorderTests, BridgeSlice2Tests, RunLogUITests,
ShortcutRunRecordsTests, ShortcutRunLogTests and RunDetailTailTests. I did not see Idris's reasoning beyond the
commit messages.

Ran (host, `swift build --build-tests` and `swift test` in pywidget/ios/Core):
`RunDetailTail|RunLogRecorder|ShortcutRunRecords|RunLog|WidgetStatus`, 150 tests with 0 failures. Two throwaway test
files, deleted afterwards and not committed:
- a differential fuzz of `RunDetail.file(output: outputTail(p).records)` against the old whole-output rule over 400
  random outputs of 0-60 KB. The outputs mixed valid 2/3/4-byte characters, stray continuations, truncated leads,
  0xFF, overlong and surrogate encodings, two streams, empty pieces, and `finished` payloads up to 12 KB. 0 mismatches.
- a probe of M1 and M2, with the output quoted in each finding.

Owed, not failures: the app, unit and UI targets were not built on this host. RunLogUITests steps 3-4,
BridgeSlice2Tests and ShortcutRunLogTests.testCancelledRunWritesOneKeyboardInterruptRow run in the runner jobs
J-20261106-1739, -1749 and -1756 after the push. I judged them from their code only.

## What holds

- **F1, the marker outlives the return.** `RunMarkerRows` ends the marker at whichever comes second, the return or
  `runRowWritten`. Both are under `markerLock`, so the two orders cannot interleave. A row written while the run is
  still inside Python (a stuck row) is remembered and ends the marker at the return. Every `rowOwed` caller reaches
  `runRowWritten` on every path. WidgetWriter always calls `record` after `collect`, a stuck run included. The
  no-recorder path ends the marker itself, and a waiter that did not claim the run leaves the call to the one that did.
  The console calls it after `logConsoleRun`'s hold, and also on close for a run whose row will never come. The
  Shortcut calls it after `logFinished` and after `logCancelled`. A stuck Shortcut run makes no call on purpose,
  and recovery writes its `stuck` row. A coalesced refresh ORs `rowOwed` (PyBridge.swift:649), and a second
  `runRowWritten` does nothing.
- **F2, read without deleting.** `collect()` renames run.marker to `left-<launch>-<run>.marker` and writes the
  faulthandler text beside it before Python init truncates it. The pass settles each owed run only on `.wrote`,
  `.logged` or `.nothing`. A lock that is not taken keeps the marker. The test with `-hold-start-after-marker` kills
  the app in exactly the window F2 described.
- **Dedupe in every path.** A widget run is skipped when the log has any row for its launch:run (`hasRow`, widened
  from `stuck` only). Console and Shortcut runs are checked against `consoleRowsRead()` on the same key, and every live
  console and Shortcut row carries `launch = thisLaunch` (RunLogRecorder.swift:148). The pass runs once per launch
  (LaunchRunLog's `pass` lock). `found` is listed once, in `owed`, because `collect` has renamed it by the time `owed()`
  reads the folder. testLaunchPassTwiceWritesOneRow and RunLogUITests step 3 pin it. A marker with no `launch` line has
  no key, so a pass killed between its write and its clear would write it twice. Every marker written since T-1168
  carries the line.
- **Bound on left markers.** Each launch leaves at most one marker per run whose row was still in flight when the
  process died, and the next launch's pass settles each one. They live in the app's Caches folder (CrashMarker.swift:39),
  never in the App Group. The only markers that are never cleared are those in M1 and L1.
- **Lock order with the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.** No change. `markerLock` is an in-process NSLock, taken alone, and the
  extension never uses CrashMarker. `runRowWritten` and `clearRecovered` run after `recordWidgetRun` or
  `recordConsoleRun` has released its flock, so no flock is held while `markerLock` is waited on, and the reverse
  never happens either.
- **F3, the cancel path.** `records(after:)` never finishes from the bridge's side, since PyBridge has no `finish()`
  on its subscribers. So a stream that ends means a cancel, and `ShortcutRunRecords.read` writes exactly one row.
  `finished` returns the value before `cancelled` can run. A cancel during `logFinished` still returns that value. A
  `step` error is rethrown without a cancel row. It cannot hang: `BackgroundHold.app`'s `MainActor.run` ignores
  cancellation, and the console flock waits at most 0.5 s. If the process is killed after the stop and before the
  run returns, run.marker is left, and recovery finds the console row and settles the marker as `.logged`.
- **F4, the UTF-8 cut.** It is right. A byte that is not a continuation byte always starts a new decode, so decoding
  from it gives a suffix of the whole decode. After three skipped continuation bytes, no sequence can reach the next
  byte, so it is a stray in both decodes. The 24 KiB kept is at least 16 KiB of text plus the line search's byte,
  because a bad byte only ever grows into U+FFFD. `cut` from the tail is dropped, but `file` sets it again because the
  kept tail is always over `outputBytes`. The copy is bounded: `suffix` shares storage, and only the kept parts are
  appended. The walk over the dropped prefix is lazy (`contains`, `prefix(while:)`), so it costs time, never memory.
- **Tests fail on the old behaviour.** The F1/F2 recorder tests went red against stubs, and three mutants were
  caught. ShortcutRunLogTests' cancel test asserts one row at the cancel, which the old loop never wrote. Three of
  RunDetailTailTests' tests go red on the old rule, and the other two pin sameness. RunLogUITests step 3 needs a left
  marker that the old code never made, and it now counts the rows for one launch:run exactly (L7).

## Findings

### M1: a left marker for a widget that is gone is never cleared, and its crash line repeats at every launch

`recovered` (RunLogRecorder.swift:292) returns `.nothing` only for an invalid id. For a valid id whose folder
`widgets/<id>/` has been deleted, `recordWidgetRun` cannot open `state.lock`: the open uses `O_CREAT`, but a lock
in a folder that is gone is nil (LaneGuard.swift:250-254). It returns nil, and `.notWritten` keeps the marker
(RunLogRecorder.swift:229, :313). So it is never settled. Every launch retries it. While no newer marker is found,
`lastRun = found ?? owed.last { !$0.returned }` (PyBridge.swift:934) picks it, and the console opens with "Your last
run didn't finish: PyWidget was closed while it ran..." at every launch, for a widget that no longer exists.

Concrete case: a widget's run kills the app twice, so the loop breaker demotes it, and the person deletes the widget.
That is the likely response. The same happens when a save renames the widget id (`.moves`). Before T-3136, `collect`
deleted the marker, so this is new. Probe output on the host (marker for `gone_card`, three launches):
`settled=0 owed=1` at L2, L3 and L4.

Fix: in `recovered`, return `.nothing` when `widgets/<id>/` does not exist, so the marker is settled with no row. As a
backstop, the pass could drop any left marker older than the log's 14 days. Test: an owed run for a widget with no
folder is settled with no row and no status.json, and `owed()` is empty afterwards.

### M2: a run that returned before its row is recovered as a real kill: badge and loop-breaker count

A `returned` marker (F1's window) goes through the same `recovered` path as a run that died inside Python
(RunLogRecorder.swift:294-312). Its decision is `.writeKilled`, so status.json gets `killed` with its badge, and the
row has `after_expiry=false`, so it counts toward the loop breaker. The limit is 2 consecutive background runs
(WidgetStatus.swift:315). Yet that run's Python finished. The process was ended afterwards, before the app wrote the
result. The T2 expiration handler does not help here: it lists the *current* run, and a run that has returned is no
longer current. On top of this, `leave` moves the marker out of `run.marker`, so `sceneDidEnterBackground`
(PyBridge.swift:509) no longer marks it `backgrounded`, and the console line blames memory.

Concrete case: a `bg_refresh` run returns, and the background task expires before the main-actor hop for the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. The
app is suspended and later reclaimed. Two of those in a row demote a healthy widget to tap-only. Probe output
(returned marker, `bg_refresh`): `row outcome=killed afterExpiry=false status=killed`.

Fix: for `last.returned`, use `.writeNothing`. The row still says `killed` (ADR-007 item 3: the marker is the source
of `killed` rows), with `after_expiry=true`, and status.json is left alone. Test: a returned `bg_refresh` marker gives
one `killed` row with `after_expiry=true`, an unchanged status.json, and no loop-breaker count.

### L1: a left marker that is not UTF-8 is skipped for good

`owed()` drops a file that does not decode (CrashMarker.swift:153), so it is never listed and never cleared. The app
writes these markers in ASCII with `.atomic`, and `leave` only adds an ASCII line, so this needs a torn file. If it
happens, delete such a file instead of skipping it.

### L2: the records of an output-heavy run are still all held once

F4's fix bounds the copy and the decode, which was the amplification. `RunResultSink.collect`
(RunResultSink.swift:64) still keeps every record, as it did before T-1140, so a run that prints 50 MiB is still held
once (1x) at the write. My "better still" item, a bounded tail in `collect`, is not done. It is fine for this
build. Raise it again if the extension lane is turned on in Release.

### L3 (mine): t1140 L4 is not small, so I left it

My plan in t1140 L4 was "delete only the oldest detail by name order". That does not work: a detail's name is its row's
UUID (RunRow.swift:164), so name order is not age order. A correct fix needs modification dates or the row order, a
test of T-1174's "never more than the newest 100" rule, and a reviewer for Shared code. I left it open under T-1139.

## Board

- M1: T-3146 (Idris, P1)
- M2: T-3147 (Idris, P1)
- L1 and L2 are for Idris to fold in at his choice. L3 stays with me under T-1139.
- T-3135 and T-3136 are ticked on this review. The Simulator runs are still owed by J-20261106-1739, -1749 and -1756.
{% endraw %}

</div>
