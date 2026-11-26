---
layout: "default"
title: "T-4182 handoff (lane b2, 2026-11-26, Idris)"
section: "documents"
description: "Rewritten at the end of the 12:50 PM ET session (from main 347e6dc0a0). Pernille reviews once at the merge point. The 8:44 AM session&#x27;s three steps (T-2497, T-3294, T-4800) are on main; feature_session.py landed T-4182\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b2, 2026-11-26, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Rewritten at the end of the 12:50 PM ET session (from main 347e6dc0a0). Pernille reviews once at the merge point.
The 8:44 AM session's three steps (T-2497, T-3294, T-4800) are on main; `feature_session.py landed T-4182` gives
their ticks.

- On this branch (personal/b2):
  - T-3291, a315e05d1e (partial): handoff item 3. The moved badge says when the run was stopped: the lane-moved
    reason file's date (LaneRunFiles.movedAt; nil for no file, a non-regular file, or a date over aheadAllowed ahead),
    WidgetLane.movedAt, WidgetBadge.of(movedAt:), passed by TreeProvider.drawn; a marker's demotion dates the file to
    the marker's own date. Tests in LaneGuardTests, WidgetBadgeTests, ExtensionLaneTests. Core 89/0; whole unit
    target 2568/0, 2 skipped (J-20261126-1325-land-chk-a5ab71-4-115852); RunLogUITests 2/0; host 4422/0. The
    ExtensionLane mutant (no `at:`) was reasoned, not run.
  - T-4802, 611745fbce (finished): the ExtensionLane comment says a start failure writes its own error status;
    extension.md has a new part, "A widget run that never started is not left looking fine", saying which lane turns
    write status.json. Fingerprints renewed for the three extension.md parts whose code this branch changed
    (WidgetLane, ExtensionLane, TreeProvider); "A refresh tap starts the app in the background" was CHANGED before
    this branch and is left for whoever re-reads RefreshWidgetIntent. Whole unit target 2567/0, 2 skipped
    (J-20261126-1352-land-chk-a5ab71-2-392f55); RunLogUITests 2/0; host 4422/0.
  - Unit counts: main 2565; the branch adds 2 tests (WidgetBadgeTests got assertions, no new test), so 2567: T-4802's
    job and the final whole-target run at 611745fb (J-20261126-1420-land-chk-a5ab71-2-2095a2). T-3291's 2568
    counted one second try (ProStoreTests.testRefundRevokesTheGrant).
- MERGE POINT at the end of this session: no (2 of 5 steps on the branch). The next session takes T-3792 first.
- Questions for Ines, queued as events in ops/lane-outbox/ (they reach log/events.jsonl when this branch lands):
  T-3291 item 1 and T-2232 below.
- T-3792, no commit: test L never ran. Both tries this session exited 75 (Mac mini load 161 and 241, the T-5865 gate), as both did in the last. Ready to run
  in company-scratch/T-4182-idris/wt (detached at a315e05d1e, t3792-session2.diff applied, xcodegen done):
  `cd <wt>/pywidget/ios && XC_TASK=T-3792 WK_LANE=1 WK_ONLY=testLPremadesRunInTheExtension WK_LANE_NAMES=countdown
  scripts/widgetkit_check.sh <scratch>/t3792-L5`. If it goes green, apply the same diff on the branch and commit it
  (the draft message is t3792-commit.txt; its "still red" paragraph needs the new result). The T-4773 note stands:
  no warm second run can come under LaneRerunRule's 15-minute floor when the app launches seconds after the cold run,
  so test L's countdown warm-run assertion may be stale, not the lane.
- T-3291, still open:
  1. **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> question for Ines, unanswered:** s11 row 6 (`expired` with `failing_since` keeps the badge) narrows
     ADR-007 2026-10-26 2:40 AM item 1. If Ines rules for s11, flip that case in WidgetStatus.showsBadge and the two
     tests that pin it (WidgetBadgeTests, WidgetStatusTests).
  2. Simulator check: dark large slot contrast (3.86:1 drawn) and accessoryCircular clipping (s8 item 2); needs a
     placed widget (UITests/WidgetKitCheckTests has the placing steps). Not run: Mac mini load.
  4. state-spec s11's "At HEAD the no-tree case draws No view for this size" sentence is stale (Maren's text).
- T-2232, no commit, waits on Ines: does the app row's `peak_mb` become ADR-007 r2 s3 item 5's estimate (peak above
  the app's footprint at the run's start), or stay the lifetime peak with the estimate in another key? r2 s3 holds
  no answer at 608a100fca. Record the answer in r2 s3, then build. <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span> patch
  refs/archive/parked/b3/20261109-152815-recut contradicts r2.
- T-4801, no commit: already fixed on main in c0e4a0f0b7 (a T-0048 commit, so no merge ticks it): ActivityRequest
  .project, AppShell passes request.project, WidgetTapRoutingTests.testTheActivityRequestNamesTheWidgetsOwnProject,
  RunLogTests' no-file header, screens.md:134. Odalys's review t4193-c0e4a0f0 calls it fixed. Its line needs its tick
  with that evidence, by whoever may tick it.
{% endraw %}

</div>
