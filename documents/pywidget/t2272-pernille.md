---
layout: "default"
title: "T-2272 review: extension-lane fix series"
section: "documents"
description: "Fix first. Not for TestFlight yet. Two things block it. F1 must be fixed or answered. And none of ed1e3805f or 9286dd56a has executed on the MacBook runner: the runner job T-2271 names must be green. F2 to F7 are Low\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2272-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2272-pernille.md</code></span></div><h1>T-2272 review: extension-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fix series</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent review before TestFlight (Commandment 13) of three commits by Idris:

- 0e756d6cc (T-1854/T-2035): the lane writes its run rows and status.json through the app's RunLogRecorder; the row rule moves to Shared/Bridge/WidgetRunLog.swift.
- ed1e3805f (T-2211): `logClosed` makes `widgets/<id>/` before its `deferred` row.
- 9286dd56a (T-2228/T-2229): no `closed` row for a widget stuck in this process; the marker check reads the lane's last row and skips app rows; the stub's exit records row counts.

Read: the three diffs; HEAD's (27af1c4e6) pywidget/ios/Shared/ExtensionLane.swift, which also carries T-2369's gate-build lines (3f55ca3ff, not under review); ExtensionLaneTests.swift and WidgetWriterTests.swift; the helpers they call (LaneGuard.swift's LaneRunFiles, RunResultSink.swift, RunLogStore.rows, RunLogRecorder.recordLaneTurn). I did not read the author's notes. Line numbers are HEAD's ExtensionLane.swift unless another file is named. Nothing built or run here (no Xcode jobs queued, per the packet). This replaces my earlier draft on <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/b3/20261104-214559-56972. That session ended unclean and its board lines never landed, so its numbers (T-2283..T-2288) were reused for other tasks and do not apply here.

## Runner evidence

- **No runner result exercises ExtensionLaneTests at ed1e3805f, 9286dd56a or later.** T-2271's board line records J-20261104-1740-xc-test (ed1e3805f, full suite) and J-20261104-1822-xc-test (9286dd56a, ExtensionLaneTests + WidgetWriterTests): both failed to compile at App/Settings/SettingsView.swift (T-0657's 036c854f) before any test ran. Neither has a result file in ops/runs/.
- The one result in ops/runs/ at a commit that contains all three, ops/runs/J-20261104-2341-xc-test-result.json (aef5bb0f9, passed), executed 2 tests: T-2456's two previously red tests, neither from this series.
- J-20261104-1551 (cb1fa9c15, which contains 0e756d6cc and not the two fixes) is cited by ed1e3805f as having `testTheClosedLaneLogsOnceAWidget` red. That is the only test evidence for the series, and it shows the pre-fix failure, not the fix.

## Do the tests fail when the fix is reverted? (by reading, not run)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Do the tests fail when the fix is reverted? (by reading, not run), scrolls sideways" style="--tw:1185px" markdown="1">

| Fix | Revert | Test that goes red | Holds? |
|---|---|---|---|
| ed1e3805f `createDirectory` in logClosed (:399-402) | removed | testTheClosedLaneLogsOnceAWidget (ExtensionLaneTests.swift:999), via the `rows("b")` and `status("b")` asserts at :1011-1013; :1005 pins the precondition (no widgets/b) | Yes. Red at cb1fa9c15 per the commit. |
| 9286dd56a `stuckHere` guard (:398) | `!stuckHere.contains(id) &&` dropped | testAReloadOfTheStuckWidgetBeforeTheLaneEndsLeavesOnlyItsStuckRow (:1030): rows("a") becomes ["stuck","deferred"], then the next process sees `deferred` last and writes `killed` | Yes |
| 9286dd56a lane filter in logMarkerDemotion (:416) | `.last` of all rows | testAnAppRowAfterTheStuckRowIsNotReadAsAKill (:1052): last row is the app's `ok`, so `killed` is appended and status turns killed | Yes |
| T-2229 row before judge (:288-295 before :301) | `recordWidgetRun` moved below `judge` | testTheRowIsWrittenBeforeATamperedReportEndsTheProcess (:1067): `rowsAtExit` is [0] | Yes |
| T-2229 stuck row before exit | any reorder inside `turn()` | testTheStuckRowIsWrittenBeforeTheProcessEnds (:1081) | **No.** See F7. |

</div>


The WidgetRunLog move is byte-for-byte. WidgetWriter's forwarders (App/Bridge/WidgetWriter.swift:231-242) keep WidgetWriterTests' `logRun` cases (WidgetWriterTests.swift:406, :429) on the moved code.

## Findings

**F1 (Medium): ExtensionLane.swift:397-402 (ed1e3805f). The closed lane recreates `widgets/<id>/` for a user widget whose folder a send moved away or removed, which T-0753 forbids.**
RunResultSink.swift:33-39 says a user id's folder is made by its send and goes with an id change's move or removal. A run of the old id that ends after that must not bring the folder back, which is why both sinks are `premadeFoldersOnly`. `logClosed` calls `createDirectory` for any id. Failure: `w` goes stuck, so the lane closes. `x` was queued at :188-190 and waits on `before?.value`, which is the stuck run's whole budget plus the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>. During that wait the user renames or deletes `x` in the app. Then `x`'s turn reaches :223-225, and `logClosed` makes `widgets/x/` again with state.lock, a status.json (`deferred_since`) and a `deferred` row: a folder for a removed id, with a status and no script. I did not trace what the app does with it next (gallery, a later send of the same id). The test's state (lane-scripts/b/ present, widgets/b/ absent; BridgeTests.laneProject) is, for a user id in production, exactly the "removed" state. A premade is the only id whose folder legitimately does not exist yet. LaneRunFiles' writeMarker, record(refusal:) and recordLate (LaneGuard.swift:338-341, :358-361, :369-373) make the folder the same way. They run before the wait, so their window is shorter, but they have the same question to answer.
Fix: make the folder only when `RunResultSink.premadeFoldersOnly(id)` is true. For a user id with no folder, write nothing (T-0753's answer). Change the fixture to create widgets/b/ the way a send does. Add a case that removes the folder while the turn waits and must end with no `widgets/<id>/`.

**F2 (Low): ExtensionLane.swift:414-419 (9286dd56a). "The lane's last row is `stuck`" hides a real <span title="A test written in advance. If it fires, we drop the idea.">kill</span> after a widget is un-demoted.**
The marker carries no run id. pywidget/docs/research/C2-device-api.md:120 records that a script can delete or rewrite `.lane-demoted.json`, which un-demotes a widget, with the backstop "one that blows memory again is caught by the marker". Failure: `a` goes stuck (a `stuck` row) and is demoted. It runs in the app for days, writing only app rows. Its script then clears the demotion list. Its next extension run is killed by jetsam, so the marker is down and no row is written. The next process demotes `a`, which is right. But the last lane=widget row is still the old `stuck`, so no `killed` row is written and status.json keeps the app's `ok`, with no badge. Before 9286dd56a an app row in between made this case write `killed`. The demotion still happens; the log and the badge lose the kill.
Fix: have writeMarker store this process/launch id and compare it with the stuck row's `launch`, or skip only when the stuck row is newer than the marker's mtime. Test: stuck, un-demoted, then a marker with no row, which must end in `killed`.

**F3 (Low): ExtensionLane.swift:206-209 and :223-226, before the Pro gate at :239 (0e756d6cc, widened by ed1e3805f). The closed lane logs a locked premade, which the open lane deliberately does not.**
The `log(...)` doc (:376-378) and testALockedPremadeLogsNothing (:1119) say that a locked premade writes no row and no status, because its face is the Pro card. `logClosed` runs before `mayRun`. Failure: Pro has lapsed, a user widget goes stuck, and WidgetKit reloads `premade.*`. The premade gets a `deferred`/`closed` row and a status.json with `deferred_since`, and since ed1e3805f a fresh widgets/premade.*/ folder. After a Pro restore it starts with a deferred clock that was set while it was locked.
Fix: on the closed path, skip premades whose `mayRun` is false (or skip premades entirely). Add a test.

**F4 (Low): ExtensionLane.swift:207 against :191-198 (0e756d6cc). A closed row written from `refresh` is outside any turn, so `exit()` can land in the middle of it.**
`ends` counts only `inFlight`. A caller that finds the lane closed writes its row on its own task. Failure: `w` is stuck and `b` is still in flight. A reload for `c` takes :206 and enters `recordLaneTurn` (row append, then status.json). `b` ends, `inFlight` is empty, and `Foundation.exit(0)` runs on `b`'s task. `c` is left with a `deferred` row and no `deferred_since`. The append is a single write, so no line is torn; the harm is that row and status disagree.
Fix: count closed-path writers under `lock` and have `ends` require zero, with the last one out calling `exit()`. Or test with a stub exit that records whether `c`'s status existed.

**F5 (Low): ExtensionLane.swift:289 against :210-212 (0e756d6cc). `lane_outcome=deadline` is missed if the caller's deadline passes after the row is written and before the turn returns.**
`overdue` is read once, at :289. `judge`, `clearRefusal` and `clearLate` (:300-301, :230-231) run after it. A run that ends at 4.98 s of 5 s gets no key, yet WidgetKit drew the cached tree. This is a reporting error only, but this key exists for exactly that case.
Fix: compare the earliest caller's `due` with the row's timestamp instead of a flag, or document the gap in the key's doc (:77-80).

**F6 (Low, maybe a spec gap): ExtensionLane.swift:458, :470, :482 and :281 (0e756d6cc). A turn that cannot start Python, or cannot put its marker down, writes no row and no status.**
`Ran.log` is nil for `no runtime config`, `Python unavailable`, `not queued`, and `no marker`. Failure: the extension's RuntimeConfig breaks after an update. Every lane widget then goes stale on every reload, with no row and no badge, and status.json still says `ok`. A run log exists for exactly this case. I found no 7.2 word for "the lane could not start".
Fix: a lane row through `log(...)` with `lane_outcome` `start_failed` and an outcome Idris and Maren agree on, or a spec row if 7.2 has none.

**F7 (Low, test only): ExtensionLaneTests.swift:1081-1087 (9286dd56a). testTheStuckRowIsWrittenBeforeTheProcessEnds cannot fail on ordering.**
`exit()` for a stuck lane is called at :198, after `takeTurn` returns, so any order of the row write inside `turn()` passes. The test only catches "no row at all", which testTheNextProcessWritesNoSecondRowForAStuckRun already covers. The hazard it names does not exist in this code (a stuck run never reaches `judge`), so either retitle it or delete it. No production change.

## Checked and fine

- The row order inside `turn()` (:283-301): peak, marker cleared (not when stuck), row and status.json, `closed`/`stuckHere`, refusal cleared, then `judge`, which can end the process. The row always lands before any `exit()`.
- `stuckHere` is set under the same lock as `closed` (:298). A reload of the stuck id while its turn is in flight joins the turn (:180-182), so it never reaches `logClosed`.
- `overdue` goes with `inFlight[id]` (:192). The insert at :212 checks that the turn is still in flight, so a finished turn cannot leave a stale flag.
- `logMarkerDemotion` reads outside state.lock. The only writer of this id's lane rows is the turn holding `inFlight[id]`, and app appends are filtered out, as its doc says.
- Crash paths in the extension: no force-unwraps or `try!` in the new code. Every file operation is `try?`, and a recorder that cannot take the lock returns nil and writes nothing.

## Verdict

**Fix first. Not for TestFlight yet.** Two things block it. F1 must be fixed or answered. And none of ed1e3805f or 9286dd56a has executed on the MacBook runner: the runner job T-2271 names must be green. F2 to F7 are Low and go on their own lines.

Board lines (owner Idris): F1 T-2491, F2 T-2492, F3 T-2493, F4 T-2494, F5 T-2495, F6 T-2496, F7 T-2497.
{% endraw %}

</div>
