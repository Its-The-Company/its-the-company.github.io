---
layout: "default"
title: "T-0683: review of b0887819 (T-0512, the app&#x27;s widget write path)"
section: "documents"
description: "Accept with changes. M1 before the TestFlight build (a hung App Intent is visible in Shortcuts and is the kind of hang App Review sees). M2 before the App Store build. Lows are optional."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0512-widgetwriter-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0512-widgetwriter-review-odalys.md</code></span></div><h1>T-0683: review of b0887819 (T-0512, the app's widget write path)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. Independent review (Commandment 13): I read the diff, the board line and
pywidget/docs/reviews/t0512-evidence/, plus the code the diff calls (PyBridge queue, records stream, stop
<span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>, RunResultSink, DeviceSupport, ClipboardCall, RunScriptIntents). I did not read the author's notes.
The board line names `t0512-write-path-review-<name>.md`; the review packet named this file. Same review.

Checks run by me: host suites `python3 pywidget/tests/run_host.py --both`: 2 interpreters, 32 suites,
2020 tests, 0 failed (3.9.6 and 3.13.18). No Xcode run: no finding below needs a build to prove; each is
shown from the code paths, with line numbers at b0887819.

## Verdict

Accept with changes. M1 before the TestFlight build (a hung App Intent is visible in Shortcuts and is the
kind of hang App Review sees). M2 before the App Store build. Lows are optional.

What <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>, checked against the board line:
- Pro gate before any run: `mayWrite(id)` is the first statement of `run` (WidgetWriter.swift:112); a locked
  premade returns `.skipped("locked")` before the source is read, Python is started or anything is queued.
- Source rules: a premade id resolves only through `Premades.named`, which lists regular, non-symlink `.py`
  files in the bundle folder and compares names exactly (Premades.swift:68-89), so `pywidget.premade.../x`
  finds nothing. Any other id must pass `WidgetID.problem` and `WidgetFolder.url`, and `main.py` must be a
  regular file and not a symlink (WidgetWriter.swift:55-60).
- `.widget` run on the queue key `widget:<id>`; coalescing keeps the pending run id, and the writer waits on
  `handle.runID`, so a coalesced caller waits on the right run. The subscription starts from `lastRecordSeq`
  taken before queueing, so no record is missed (replay covers it).
- Records go to RunResultSink, which decides on `bridge.runInfo`, not the caller; tree.json is written
  `.atomic`, so concurrent writers cannot leave a torn file. A failing script keeps the last tree (tested).
- Off-switch: `writesWidgets = bridge && no XCTestConfigurationFilePath` (PyWidgetApp.swift:58); `bridge` is
  false for `-bench` and every check launch. Same flag gates the intent install and the foreground hook.
- Widget runs queue behind a console run (never stop it) and end `busy` after their 5 s budget if the console
  holds the thread (input() included); the console renders only its own run id's output.
- RunResultSink.appGroup reloads `PyTreeWidget` only.

## Findings

### M1 (Medium). A run that ends `stuck` hangs the writer forever, and with it the Refresh Widgets intent

WidgetWriter.swift:130-133:

    for await r in stream where r.runID == handle.runID {
        records.append(r)
        if r.kind == .finished { break }
    }

The loop ends only on a `.finished` record. The stop ladder's deadline path (PyBridge.swift:586-599,
`markStuck`) emits a `status` record `"stuck"` and no `finished`; a run stuck in native code never returns
from `doRun`, so no `finished` ever comes. The Shortcut path already handles this case
(RunScriptIntents.swift:138, `case .status where r.status == "stuck": throw ShortcutRunError.stuck`); the
writer does not.

Failure scenario: a placed widget's script does a long native call that ignores the interrupt (a huge integer
power, a catastrophic regex). Its 5 s budget starts the ladder, the hard stop fails, the run is marked stuck at
5 s more. (a) The foreground Task never returns and keeps its stream subscriber for the life of the process.
(b) If the same happened under Refresh Widgets, `WidgetRefresh.run()` never returns, so
`RefreshWidgetsIntent.perform` never returns (RefreshWidgetsIntent.swift:25); Shortcuts spins until the
system <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the intent, and the fallback `reload()` never runs. (c) The person never pressed Run, yet every
console window shows "This script is stuck in native code... Quit and reopen PyWidget" (the console renders
`stuck` for any run id, PyWidgetApp.swift:452), and Python is gone until relaunch. Later foregrounds are safe
(`bridge.run` throws `.stuck`, so they skip).

Fix direction (Idris decides): end the loop on `status == "stuck"` as RunScriptIntents does and return
`.noTree("stuck")`; add a test with a stub record stream that sends `stuck` and no `finished`. Part (c) is a
product question: should a widget run that the person did not start be allowed to strand the console, or
should the writer stay off scripts that went stuck before (a per-id note)? Recorded here; not for this fix.

### M2 (Medium). Every `.active` runs every placed widget's script, with no single-flight and no spacing

PyWidgetApp.swift:115, `if writesWidgets { Task { await WidgetWriter.app.refreshPlaced() } }`, runs on each
`scenePhase == .active`. The app-level phase goes `.inactive` -> `.active` on a Control Center or
Notification Center pull-down, the app switcher, a system alert, Face ID, and every return to the app.

Failure scenarios:
1. Console disturbed: the person returns to the app and taps Run. The console run (`context: .app`) is pushed
   behind the widget run already on the script thread (PyBridge.swift:452-454) and waits for it: up to the 5 s
   budget, and up to 5 s more if the run needs the stop ladder. Nothing on screen says why. With n placed
   widgets the writer queues them one at a time, so at most one is ahead, but each `.active` starts the round
   again.
2. Repeated work: two `.active` events a second apart start two `refreshPlaced` Tasks. The second's requests
   coalesce only while the first's are still pending; once a run has started, the second queues a full new
   run of the same script. Scripts with `net.get` (T-0677) make one network request per widget per activation.
3. Two Tasks waiting on one coalesced run both call `sink.finish` on the same records (see L1).

Fix direction: one writer pass in flight at a time (a flag or actor), and a minimum spacing between passes
unless the placements changed (compare `placedNow()` with the last pass's ids). The console could also
ask the writer to stand down while a console run is waiting; that is Idris's call. A test that two quick
`.active` calls produce one pass.

### L1 (Low). Two waiters on one coalesced run write the same tree twice

WidgetWriter.swift:134. Foreground plus Refresh Widgets, or two `.active` passes, can coalesce into one run id;
each waiter calls `sink.finish` with the same records, so tree.json is written twice (atomic, same bytes) and
two reloads are asked. Harmless today. When status.json (T-0198) and the Activity log (T-0048) are written
from the sink, this becomes two Activity rows for one run. M2's single-flight removes it.

### L2 (Low). No background-task assertion: a refresh started at `.active` and abandoned stalls

PyBridge has no `beginBackgroundTask` (grep finds none in App/). A person taps a widget to refresh it, the app
opens, and they go Home at once. The pass runs on a suspended process; the busy and budget timers count
uptime, which keeps running while the app is suspended, so on the next foreground the run is likely already
past its budget and ends `busy` or interrupted, with no write. The widget keeps its last tree (no data loss).
The UI test waits for tree.json before pressing Home, so it does not cover this. Suggest wrapping one pass in
a background task and measuring how often a tap-then-Home writes the tree (n >= 10, cold and warm).

### L3 (Low). The intent path has no system-level evidence

RefreshWidgetsIntent is compiled into both targets. The evidence covers the foreground tap (UI test testF)
and a unit test with `$override`. Nothing shows that the system runs the intent in the app process (where
the writer is installed) rather than the extension (where `run()` returns 0 and only reloads). Its run time is
also unmeasured: n widgets in sequence, each up to 5 s budget plus up to 5 s of stop ladder, after a cold
Python start, against the system's time limit for a background intent. One Shortcuts run on the Simulator
with two placed widgets, timed, would close both.

### L4 (Low). The writer's log line is public and carries the App Group path and error text

WidgetWriter.swift:107 logs `id` and `String(describing: result)` with `privacy: .public`. Widget ids are
names the person chose; `.wrote(URL)` includes the App Group container path, and `.skipped`/`.noTree` carry
error descriptions (file paths). Unified logs go into sysdiagnoses. Suggest `.private` for the id and logging
the outcome's case name only (wrote / skipped / noTree plus a fixed reason word).

### L5 (Low, note for C2). Foreground widget runs can now read the clipboard on every activation

ClipboardCall.swift:40 allows a `.widget` run while the app is in front (C2 s2, by design). Before T-0512 that
was rare (previews). Now a placed widget whose script reads the clipboard reads it on every `.active`, and iOS
shows its paste notice each time. Not a code defect; worth one line in C2 s2 or a gate on "run started by the
writer". Location and pedometer permission prompts are `.app`-only (LocationCall.swift:149), so the writer
cannot raise a permission prompt.

## Not checked

- The device itself (no TestFlight build yet); the Simulator UI evidence is Idris's.
- WidgetWriterTests.swift bodies: read by name in the evidence only.
- WidgetFolder.url's handling of a symlinked widgets/<id>/ folder (only main.py's own symlink check was read).
{% endraw %}

</div>
