---
layout: "default"
title: "T-2177: review of the extension lane&#x27;s run rows and status.json"
section: "documents"
description: "Commits read with git show / git diff 0e756d6cc~1 ed1e3805f: 0e756d6cc (T-1854, T-2035), de4b1aa78 (WidgetRun: Equatable), cb1fa9c15 (the test split; 2f73557e4, named in the packet as the split, holds only the job file\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2177-extensionlane-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2177-extensionlane-pernille.md</code></span></div><h1>T-2177: review of the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s run rows and status.json</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Commits read with `git show` / `git diff 0e756d6cc~1 ed1e3805f`: 0e756d6cc (T-1854, T-2035), de4b1aa78 (WidgetRun: Equatable), cb1fa9c15 (the test split; 2f73557e4, named in the packet as the split, holds only the job file ops/jobs/J-20261104-1551-xc-test.json), ed1e3805f (logClosed makes widgets/<id>/). Files: Shared/ExtensionLane.swift, Shared/Bridge/WidgetRunLog.swift, Shared/RunLog/RunLogRecorder.swift, App/Bridge/WidgetWriter.swift, Tests/ExtensionLaneTests.swift. Spec: ADR-007 7.2 (table), 7.5, and the 2026-10-29 8:03 AM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line item 2.

**Verdict: pass with fixes.** No finding is High. Two Medium findings, three Low. Each one is a board line for Idris (T-2228 to T-2232).

**Runner evidence.** J-20261104-1740-xc-test (the full suite at ed1e3805f) has **no result.json** on origin/macbook-results as of this review (fetched 2026-11-04 ~5:55 PM). The latest run of this code is J-20261104-1551 at cb1fa9c15: status failed, exit 65, 1221 executed, 21 skipped, 4 failures in 2 tests: `ExtensionLaneTests/testTheClosedLaneLogsOnceAWidget` (the bug ed1e3805f fixes) and `ProPaywallUITests/testRestoreAndLegalLinksReachableAtLargeAndAX5` (T-2040's known flake). This verdict is a code read. It does not cover a green Xcode run, and the code does not ship until J-1740 or a later run is green.

## What holds (checked against the diff)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What holds (checked against the diff), scrolls sideways" style="--tw:960px" markdown="1">

| Check | Result | Where |
|---|---|---|
| Late (`no_time`, `gave_way`) is 7.2 `deferred` | yes. `deferred_since` only, no outcome, no badge (WidgetStatus.deferred) | ExtensionLane.swift:241, 251, 257; test at :444-449 and testALateTurnIsADeferredRowWithNoTime |
| Closed lane is `deferred`, once per widget | yes, and since ed1e3805f the folder is made first | :195, :211-212, :361-368; testTheClosedLaneLogsOnceAWidget |
| Marker demotion is `killed`, with a badge, and skipped when the stuck row stands | yes, apart from F1 | :229-233, :373-378; testAMarkerDemotionIsAKilledRow, testTheNextProcessWritesNoSecondRowForAStuckRun |
| A refusal is `oom_guard` in either process; the later process adds `demoted`/`refused` | yes | refused() :327-338; testRefusalsAreOomGuardRows |
| `deadline` goes on the run's own row as `lane_outcome` | yes, apart from F3 | :200, :271; testARunPastTheDeadlineSaysSoInItsRow |
| Locked writes nothing, as in the app lane | yes on the turn path (:227 returns before any log), apart from F4 | testALockedPremadeLogsNothing |
| The run row is written before judge's `exit` | yes. :270-273 come before `closed = true` and `judge` (:279). No test pins it (F2) | |
| Row and status.json in one hold of widgets/<id>/state.lock | yes. recordLaneTurn (RunLogRecorder.swift:125) and recordWidgetRun both go through RunLogStore.recordWidgetRun's WidgetStateLock hold, and status goes through `updateHeld`, which takes only the in-process mutex, so there is no second flock on the same file | |
| The row rule is the app's | yes. WidgetRunLog.run/tree/output moved verbatim; WidgetWriter forwards; the lane sets `lane=widget` and the trigger from runInfo | WidgetRunLog.swift:11-56 |
| de4b1aa78 | `WidgetRun: Equatable`. Every member is already Equatable, so the change only adds the conformance | |

</div>


## Findings

**F1 (Medium) -> T-2228. A stuck run can become a second, wrong `killed` row in the next process.** ExtensionLane.swift:373-378 skips the killed row only when the widget's *last* row is `lane=widget, stuck`. After a stuck run, the lane stays open until the other turns in flight end (:182-186). A reload for the stuck widget in that window gets `turn == nil` (:175, :194-196), and logClosed(id) writes a `deferred`/`closed` row for that same widget. The next process then finds the marker, sees `deferred` as the last row, and writes `killed` with `WidgetStatus.killed` (no frame). Result: one hang leaves two rows, stuck plus killed. status.json loses the stuck frame, and the Activity row says "closed while it ran, possibly out of memory" when the run actually hung. These rows also count toward 7.2's loop breaker (2 consecutive killed or stuck). The same check also reads the whole rows file outside state.lock (:375), so the app can append between that read and the write, and the extension parses up to 14 days of RunRows to look at one of them. **Fix:** logClosed writes nothing for an id whose own run went stuck in this process (keep a `stuckHere` set; its stuck row and status already stand). Also, or instead, match the marker's run id against the stuck row's `run_id` rather than "last row". **Test:** lanes `a` and `b`, with `b` queued behind a stuck `a`; `refresh("a")` again before `b` ends; then `lane(process: "second").refresh("a")` must leave rows `["stuck"]` and status `stuck`. Today this test would fail with `["stuck", "deferred", "killed"]`.

**F2 (Medium) -> T-2229. No test would fail if the row moved after the judging.** The order at :270-273 (row before `closed = true` and before `judge` -> `WidgetLaneGuard.carryOut(..., exit:)`, :383) is correct. But the test stub's `exit` (Tests:72-74) does not end anything, and every row assertion runs after `refresh` returns. So moving `recordWidgetRun` below `judge` passes the whole suite, and on a device that move loses the row of every run whose report ends the process. **Fix (test only):** in the stub's `exit`, record `rows(id).count` (or note it as the marker is noted). Then, for a tampered report (the :118 / :124 cases) with `logWord: "ok"` and for the stuck case, assert that the row existed when `exit` was called. Seed the mutant (the write moved below judge) and confirm that it fails.

**F3 (Low) -> T-2230. The `deadline` mark races the run's end.** The caller sets `overdue` only after `upTo` has returned nil (:199-200), and the turn reads it before writing the row (:271). If the run ends between the caller's deadline and the caller's `insert`, the row has no `deadline` although the caller drew the cached tree. A run that takes about as long as the deadline is exactly the case this column exists to count (7.5: the rows are the device evidence for section 6's gates). **Fix:** let the turn decide from the clock rather than from a flag. Keep the earliest caller deadline for `id` under `lock` (alongside `due`), and mark `deadline` when `ContinuousClock.now` at row time is past it. **Test:** the existing deadline test with `hang` equal to `deadline` must still mark the row (run it n=20 to show the race is gone).

**F4 (Low) -> T-2231. The closed lane writes for a locked premade.** logClosed (:195, :212) runs before the Pro gate (:227). In a closed lane, a lapsed-Pro premade gets a `deferred` row, `deferred_since`, and a new widgets/<id>/ folder (ed1e3805f). That breaks "locked writes nothing, as the app lane does" on that one path. **Fix:** in logClosed, skip `WidgetID.premadePrefix` ids. They are owed nothing the person can see, and calling `mayRun` there would put StoreKit on a closing lane. Alternatively, gate with the same cheap check the turn uses. **Test:** a stuck `a`, then `refresh(premade)` with `mayRun` false, gives `.closed` with no rows, no status and no folder.

**F5 (Low) -> T-2232. `peak_mb` means something different in each lane.** In the app, `peak_mb` is the process's lifetime peak, written only when the run raised it (WidgetWriter.peakMb, :201). In the lane it is the lane's own peak above baseline (ExtensionLane.swift:450). 7.5 names one column, the `phys_footprint` peak around the run. Activity and the device gates will compare the two numbers as if they measured the same thing. **Fix:** pick one meaning per 7.5, or keep the delta and put it in an `extra` key (`lane_peak_mb`), writing the footprint peak in `peak_mb`. Record the choice in 7.5.

## Observation (no board line)

ExtensionLane.swift:173-175 (from before this change, T-1852): `queued += 1` runs before `if closed { return nil }`, so each refused call in a closed lane leaks one `queued`, and `gathered` never resets. This does no harm while the process is ending. It matters if a closed lane ever stops ending the process.
{% endraw %}

</div>
