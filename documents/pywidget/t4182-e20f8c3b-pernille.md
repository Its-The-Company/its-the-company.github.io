---
layout: "default"
title: "Review of e20f8c3ba5: T-0048&#x27;s Open at Line and Go to Line, and the app lane&#x27;s widget errors now name their line"
section: "documents"
description: "The change does what T-0048&#x27;s slice says, inside what it leaves out, and nothing here is a crash, data loss or a risk of App Review rejection. So this review does not hold a TestFlight build."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4182-e20f8c3b-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4182-e20f8c3b-pernille.md</code></span></div><h1>Review of e20f8c3ba5: T-0048's Open at Line and Go to Line, and the app <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s widget errors now name their line</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5217, Commandment 13). Author: Idris. Reviewed: e20f8c3ba5 as a whole. c6ce4a9b, named on the
board line, is the Operator's records commit that closes it. The files: ConsoleEditor.swift, PyWidgetApp.swift,
WidgetActivityView.swift, PyBridge.swift, ActivityList.swift, ConsoleEditorOpenTests, ActivityListTests,
ExtensionRuntimeTests, WidgetWriterTests (a BridgeTests extension), RunLogUITests and the three screenshots. I checked
it against the T-0048 and T-4182 board lines, ops/board_notes/T-0048.md, IDE spec s5.12 (12.2, 12.3 item 2, 12.4
`:741`, 12.5, the 12.12 keys) and my review of the first slice (docs/reviews/t4182-a98d0790-pernille.md). I did not
read the author's memory or handoff notes. I also read the code the change depends on: runner.py (`_is_user`, `_kind`,
`hard_stop`, `_frames`, the run setup), lane.py's LaneFinder (the extension's only reader of user_roots), ConsoleModel's
open and save (`openProjectFile`, `saveNow`, `pauseSave`), WidgetTapRouting, RunLogRecorder's row stamp and
RunestoneEngine.goToLine. None of the reviewed files has changed on main since (ec63ed6caf), so the line numbers below
hold at e20f8c3ba5 and at main. Paths are under pywidget/. Date: 2026-11-20.

## Tests run

- MacBook runner, full suite with the UI target, J-20261120-0227-xc-test (the daily job) at ec63ed6caf, which
  contains e20f8c3ba5: 2301 executed, 40 skipped, 2 failures, exit 65. The two failures are
  `WidgetKitCheckTests/testETokenOnTheHomeScreen` (red at main since 11-18, before this commit; T-4898, T-5047) and
  `WidgetKitCheckTests/testTPremadeDrawsPaperInLightAndStudioGreyInDark` ("dark: white 0.013, dark 0.80, hued
  0.16"). The second is the colour of a premade's Home Screen drawing in dark mode. It was not red on the 11-19 daily
  (J-20261119-0210, at f970fe40, before this commit), so something since then broke it. This commit touches no
  drawing, appearance or premade code, so I do not count it against this commit. The runner's watch files its own
  line for a red daily. Both RunLogUITests tests have no skip condition and are not in the failing list, so they
  passed. That includes the new asserts: line 5 in status.json, the row, the strip and the button; "Go to Line 5";
  no `run.changed`; Go to Line lands in main.py's editor with Activity gone.
- MacBook runner, unit filter, J-20261120-0229-xc-test (queued by me, at bcf40a81): ActivityListTests,
  ConsoleEditorOpenTests, ExtensionRuntimeTests, BridgeTests/testT0048AWidgetErrorInTheAppGroupNamesItsLine,
  WidgetTapRoutingTests, RunLogExportTests, EditorCaptureMapTests: passed, 54 executed, 0 skipped, 0 failures, exit 0,
  112.5 s.
- `swift test --filter ActivityListTests` in my own copy of the Core package: 18 executed, 0 failures. At main the
  Core test target does not build: `LauncherEditorTests.swift:403` needs `LauncherEditorGate`, which is app-only, as
  the commit says. So for these runs I moved that one file out of my copy, and put it back afterwards.
- ActivityList mutants, each on its own in that copy under the same filter, all KILLED:
  (a) `primary` without `where line > 0`: 1 failure (`:99`, "line(0)");
  (b) `primary` gives nil while too big: 1 failure (`:96`);
  (c) `primary` ignores `hasFile`: 2 failures (`:103`, `:105`);
  (d) `goTo` without `!RunLogExport.startFailed(row)`: 1 failure (`testAStartFailureHasNoOpenButton`);
  (e) `goTo` without `row.failed`: 2 failures (ok and deferred rows);
  (f) `changedSince` with `>=`: 1 failure (`:129`);
  (g) `goTo` ignores `hasFile`: 1 failure (`:120`).
  The file was restored after each one, and my copy is clean.
- Host, the runtime half (runner.py itself did not change): `run_host.py runner widget_state` on 3.9: runner 35/0,
  widget_state 28/0. `bridge` timed out at 600 s at load average 78. I ran it again with `--timeout 2400`: one
  error out of 347, and I did not keep that output, so I cannot name the test. Then a third time, verbose and kept:
  347 tests, 0 failed, 5 skipped. I count the one error as load, not this commit (nothing in the runtime changed),
  but I have not proved that.
- Host probe of what the PyBridge change does, through the bridge test driver (`Scenario`), with a widget's main.py
  under `<tmp>/group/widgets/w1/`. I ran it once with user_roots `[Documents]` (before this commit) and once with
  `[Documents, group/widgets]` (after it):
  - A `raise ValueError` on line 3. Before: the frame is `('main.py', 3, 'bundled')`, so the row gets no line.
    After: `('main.py', 3, 'user')`. This is the cause the commit names.
  - A loop that catches every BaseException and is then stopped (the shape of `test_swallow_ends_by_hard_stop_twice`),
    on 3.13. After: `interrupted`, the hard stop called, 2.23 s, not stuck. Before: the driver never finished and
    was killed at its 120 s limit. The hard stop's callback returns DISABLE for every line it does not count as the
    user's, so it could never reach a widget's own code.
- Not run: XC_LOCAL Xcode runs (the packet allows the runner only), Swift mutants of the app target (the runner only
  runs a commit that is on main), and no phone run.

## Verdict: PASS with findings

The change does what T-0048's slice says, inside what it leaves out, and nothing here is a crash, data loss or a risk
of App Review rejection. So this review does not hold a TestFlight build.

The runtime half is the most important part of the commit, and it is right. `RuntimeConfig.app` adds the App Group's
`widgets/` to user_roots (`Shared/Bridge/PyBridge.swift:28`). In the app process, user_roots has exactly two
readers: `_kind`, which marks traceback frames, and the hard stop's callback. The lane finder is installed only in
the extension (`runner.py:562-563`, `lane.py:1268-1271`), so the import rules do not change. The probe shows both
effects. Widget errors in the app lane now name their line. And, though the commit message says it only in passing,
the 2 s hard stop now reaches a widget's own code in the app lane. Before, a widget script that catches
BaseException in a loop could not be stopped there. `testAppConfigCountsTheWidgetsFolderAsTheUsers` pins the config,
so dropping the root again fails a unit test, and through it both effects.

Each ActivityList rule has a test that fails when the rule breaks (seven mutants, seven killed). 12.4 `:741` is now
met: a start failure has no `act.open` and no Go to Line, which my last review left for this step. The editor's
deferred jump is sound. The coordinator applies a request only when the engine holds the model's text and no open is
in flight (`ConsoleEditor.swift:99-104`), once per request id, and the open's end retries it (`:239`).
`RunestoneEngine.goToLine` returns false for a line past the end and does not crash (EditorCaptureMapTests:42), so a
shortened file is safe.

One Medium: the step that actually moves the caret from Activity is not pinned by any test (M1). One Low: "This
file changed since the run." can be missing when the text that ran differs from the file (L1).

## Findings

### M1 (Medium): nothing fails if Go to Line stops moving the caret

- Where: `App/PyWidgetApp.swift:1212-1217` (`openFromActivity`: pop Activity, open the file if needed, then
  `model.goToLine(line)`). Tests: `UITests/RunLogUITests.swift:226-235`, `Tests/ConsoleEditorOpenTests.swift`
  (`testALineAskedDuringAnOpenIsAppliedToTheNewText`).
- The UI test taps Go to Line and asserts three things: main.py's navigation bar, no Activity bar, and the Run
  button. It says the caret is "ConsoleEditorOpenTests' check". That unit test calls `model.goToLine(3)` and
  `c.lineRequested()` itself, so it never goes through `openFromActivity`. `openFromActivity` is private to
  ContentView and no test reaches it. Delete `model.goToLine(line)`, or break the path comparison on `:1215` that
  guards it, and every test above still passes. A person would then land at the top of main.py, not at the error.
  I found this by reading. I could not run the Swift mutant, because the runner takes only commits on main. The
  screenshot `t0048-editor-at-line.png` does show the caret on line 5, but only for that one run.
- Why Medium: Go to Line is the headline of this step and the commit's Plain line ("opens the script at the failing
  line"). It is an action the person sees, and its last call has no test.
- Fix: move the open-then-jump into ConsoleModel (for example `openAt(_ file: URL, line: Int?)`, which ContentView
  calls after it pops Activity). Unit-test it red first: the open file is not the widget's, so the file is opened and
  `lineRequest?.line == 5`; a refused open (save refused) leaves `lineRequest` nil; the same file twice asks twice.
  Or make RunLogUITests read the caret's line, as EditorCaretUITests reads the caret. Either is enough.
- Board line: added (Idris).

### L1 (Low): "This file changed since the run." compares the wrong file and the wrong moment

- Where: `App/WidgetActivityView.swift:376-383` with `Shared/RunLog/ActivityList.swift:169-172`. The rule is
  `fileModified > row.date`. `fileModified` is the project file's modification date. `row.date` is the row's `ts`,
  stamped when the run is recorded, which is its end (`RunLogRecorder.swift:102`, `RunRow.stamp(now)`).
- A widget does not run the project file. It runs the copy in `widgets/<id>/main.py` (or the lane's mirror). That
  copy is updated only at a boundary: `pauseSave` writes the project file alone (`PyWidgetApp.swift:384`, T-0747).
  So the warning can be missing in two cases:
  (a) the person types; the pause save writes the project file at <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>; a Home Screen refresh at T2 > T1 runs the older
  copy and fails at line N; opening Activity sends the new text. Then `T1 < T2` and no warning shows, but line N is a
  line of the older text;
  (b) the file is saved while a run is going: the save lands before the run's end stamp, so again no warning.
  The jump itself is still safe in both cases, because the engine refuses a line past the end.
- Fix: compare against the run's start (`ts` minus `duration_ms`). Also count the sent copy: show the warning when
  `widgets/<id>/main.py` was written after the run started, or when its bytes differ from the project file's
  (WidgetTapRouting already reads them as `sentScript`). Add a test for (a).
- Board line: added (Idris).

### Info (no new line)

- **T-4801 (my last review's L1) is now a one-line fix.** `ActivityRequest` carries the widget's file
  (`WidgetActivityView.swift`, `file`), but the export header still takes `model.projectFile`
  (`PyWidgetApp.swift`, the `navigationDestination`). Taking `request.file`'s folder name, or "" when it is nil, is
  T-4801's fix.
- **T-4800 (my last review's M1) is unchanged here:** the export file is still written on appear and never deleted.
  It stays open on its own line.
- **The Plain line overstates one thing.** "Before this, widget errors did not record the line at all" is true of
  the app lane only. Extension-lane runs read `lane-scripts/`, which was already a user root
  (`lane.py:1317`), so their rows named the line already. Worth saying right when the reports quote it.
- `ActivityList.goTo` and `primary` do not compare `row.file` with the file they open. In the app lane today the only
  user file a widget run can have is its own main.py: sys.path[0] is `widgets/<id>/`, no cwd is passed, and Documents
  is not on the path. So this is right for now. If widgets ever import project modules, `goTo` must check
  `row.file`.

## Board lines

- M1: test that Go to Line moves the caret (Idris, P2).
- L1: the changed-since-the-run note's file and moment (Idris, P3).
{% endraw %}

</div>
