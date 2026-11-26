---
layout: "default"
title: "T-4182 handoff (lane a2, 2026-11-26, Idris)"
section: "documents"
description: "Rewritten at the end of the 5:05 AM ET session. Pernille reviews once at the merge point."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, 2026-11-26, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Rewritten at the end of the 5:05 AM ET session. Pernille reviews once at the merge point.

- On this branch (personal/a2), main at 9b5453098a:
  - T-3291 slice 2, 8199273c87 (partial, no Plain line): the norun card (s11 "No picture yet"), copy keys `norun.*`
    and voiceover `norun_card` (DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>), tap to Activity on Failed; `WidgetBadge.couldNotRun` shared with the
    badge. Whole unit 2478/0 (J-20261126-0532-land-chk-a5ab71-1-50eca2), RunLogUITests 2/0, host 4388/0.
  - T-2492, 6c112dc987 (finished): `Marker.stuck`, `LaneRunFiles.markStuck`; a <span title="A test written in advance. If it fires, we drop the idea.">kill</span> after an un-demotion is a
    killed row. Whole unit 2481/0 (J-20261126-0613-land-chk-a5ab71-1-158bcc).
  - T-2493, 578e382441 (finished): the closed lane asks the Pro gate before it logs. Whole unit 2483/0
    (J-20261126-0705-land-chk-a5ab71-2-021136), red first in J-20261126-0643-land-chk-a5ab71-2-04f875.
  - MERGE POINT: yes at minute 130 (hand-in).
- T-3291, still open:
  1. **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> question for Ines, unanswered:** s11 row 6 (`expired` with `failing_since` keeps the badge) narrows
     ADR-007 2026-10-26 2:40 AM item 1. showsBadge's expired case is as 2:40 AM has it; if Ines rules for s11, flip that
     one case in WidgetStatus.showsBadge and the two tests that pin it (WidgetBadgeTests, WidgetStatusTests).
  2. Simulator check: dark large slot contrast (3.86:1 drawn) and accessoryCircular clipping (s8 item 2). Needs a
     placed widget on the Home Screen / Lock Screen: UITests/WidgetKitCheckTests has the placing steps.
  3. `moved` has no time to say ("Last run was stopped."): the demoted list keeps none.
  4. state-spec s11's "At HEAD the no-tree case draws No view for this size" sentence is stale (Maren's text).
- T-2232, no commit, waits on Ines: ADR-007 r2 s3 item 1 makes lane `peak_mb` P (above the process's baseline, as
  the lane writes); item 5 defines the app's estimate as the run's peak above the app's footprint at its start, and
  item 8 says Run log rows carry the same figures. The app row today writes the lifetime peak when the run raised it
  (WidgetWriter.peakMb). Ask: does the app row's `peak_mb` become item 5's estimate (delta from the run's start), or
  stay the lifetime peak with the estimate in another key? Ines's 11-13 note on T-4281 leans to the delta. Record
  the answer in r2 s3, then build. <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span> patch refs/archive/parked/b3/20261109-152815-recut contradicts r2.
- T-2497, not started (hand-in): retitle testTheStuckRowIsWrittenBeforeTheProcessEnds to what it pins and rename it
  in Tests/mutants-t2271.json (3 places). A ready script: company-scratch/T-4182-idris/t2497.py <worktree>.
- `swift build` in pywidget/ios/Core: not rerun this session.
{% endraw %}

</div>
