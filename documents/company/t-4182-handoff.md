---
layout: "default"
title: "T-4182 handoff (lane b2, 2026-11-26, Idris)"
section: "documents"
description: "Rewritten at the end of the 8:44 AM ET session (main at 39e1956065). Pernille reviews once at the merge point."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b2, 2026-11-26, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Rewritten at the end of the 8:44 AM ET session (main at 39e1956065). Pernille reviews once at the merge point.

- On this branch (personal/b2), MERGE POINT: yes at minute 114 (hand-in):
  - T-2497, c07d986e06 (finished): testTheStuckRowIsWrittenBeforeTheProcessEnds is now
    testAStuckLaneEndsItsProcessOnceAfterTheTurn, doc says what it pins; mutants-t2271.json follows. Test only.
  - T-3294, be8405359e (finished): PreviewQueueTests R1-R4 (no other file extends WidgetFolder/WidgetStatus; the plan's
    runFileNames count pinned; `open(` banned; whole-line comment cut). Mutants by replica only
    (company-scratch/T-4182-idris/t3294-replica.py), not as Xcode mutants.
  - T-4800, 73d4d2162c (finished): the Activity export file is written on the Export tap and deleted when the sheet
    closes; Clear removes the widget's export files; launch sweeps leftovers. WidgetActivityModelTests 6 (red first on
    a Clear mutant). The share sheet itself was not seen on a Simulator screen (no UI test taps Export).
  - Whole unit target 2517/0, 2 skipped as on main (J-20261126-1031-land-chk-a5ab71-3-20c2c7, the committed tree);
    RunLogUITests 2/0 per step; host 42 suites, 4408 tests, 0 failed per step; Core `swift build` green.
- T-3792, no commit: test L's say-so <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>. The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> 11-25 diff (liftAndRunAgain, makeDue) plus a draw-record dump
  (T and t lines for the id after the re-place, to tell "WidgetKit asked for no timeline" from "the lane declined")
  is in company-scratch/T-4182-idris/t3792-session2.diff; `git apply` it. It has not run: both tries exited 75 (the
  Mac mini was busy with another session's Simulator run). Run: `XC_TASK=T-3792 WK_LANE=1
  WK_ONLY=testLPremadesRunInTheExtension WK_LANE_NAMES=countdown scripts/widgetkit_check.sh <scratch dir>`.
  Note for whoever reads it: no warm second run can come under LaneRerunRule's 15-minute floor (T-4773) when the
  app launches seconds after the cold run, so test L's countdown warm-run assertion may be stale, not the lane.
- T-3291, no commit, still open:
  1. **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> question for Ines, unanswered:** s11 row 6 (`expired` with `failing_since` keeps the badge) narrows
     ADR-007 2026-10-26 2:40 AM item 1. If Ines rules for s11, flip that case in WidgetStatus.showsBadge and the two
     tests that pin it (WidgetBadgeTests, WidgetStatusTests).
  2. Simulator check: dark large slot contrast (3.86:1 drawn) and accessoryCircular clipping (s8 item 2); needs a
     placed widget (UITests/WidgetKitCheckTests has the placing steps). Not run: the Mac mini was busy.
  3. `moved` has no time to say ("Last run was stopped."): the demoted list keeps none.
  4. state-spec s11's "At HEAD the no-tree case draws No view for this size" sentence is stale (Maren's text).
- T-2232, no commit, waits on Ines: does the app row's `peak_mb` become ADR-007 r2 s3 item 5's estimate (delta from
  the run's start), or stay the lifetime peak with the estimate in another key? Ines's 11-13 note on T-4281 leans to
  the delta. Record the answer in r2 s3, then build. Parked patch refs/archive/parked/b3/20261109-152815-recut
  contradicts r2.
{% endraw %}

</div>
