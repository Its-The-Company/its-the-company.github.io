---
layout: "default"
title: "T-4182 handoff (lane a, 2026-11-25 06:2x)"
section: "documents"
description: "The session stopped at minute 80 with one step committed; the 20 minutes left could not carry the next step&#x27;s runner jobs."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 35 · Wed Nov 25</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a, 2026-11-25 06:2x)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The session stopped at minute 80 with one step committed; the 20 minutes left could not carry the next step's runner jobs.

- On this branch: T-3791 at 23b64c9a8f (the Activity screen's <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> card and say-so). Plan checks green: host 21 suites
  2068 tests; whole PyWidgetTests 2323/0 on the runner (J-20261125-0557-land-chk-a5ab71-2-2732bb); RunLogUITests 2/0
  (J-20261125-0559-land-chk-a5ab71-3-5699e3). The first runner job caught one red, fixed in the same commit:
  PreviewQueueTests' reload list now names App/WidgetActivityView.swift. Pernille reviews once at the merge point.
- T-1765 (01d1fda3c0) and T-1643 are on main; `python3 tools/feature_session.py landed T-4182` gives T-1765's tick.
- Next, in order: T-3792 (test L re-run after a lift: WK_LANE=1 scripts/widgetkit_check.sh, a lane-forced Debug build,
  runs on the local Simulator), then T-3291 (red badge; its 11-08 slice-1 commit was refused by the classifier, so
  start it from main as fresh work), then T-2836, then T-2841.
- T-2836 is written: `/Volumes/SANDISK SSD/company-scratch/T-4182-idris/t2836/` holds LaneGuard.swift (on top of
  T-3791 it differs only in carryOut and the Marker comment, +25/-3), ExtensionLane.swift, ExtensionLaneTests.swift and
  LaneGuardTests.swift; the diffs against main are in `.../t2836-diff/`. Diff each against the branch before copying.
- Timing seen today: a runner job waits about 10 min in the queue and runs 9 to 16 min. The plan's build-for-testing
  is one whole-unit-target job and its unit filters answer from it; queue the UI filter job right after it, same tree.
- `swift test` in pywidget/ios/Core does not build on main today: Tests/Core/LauncherEditorTests.swift uses
  LauncherEditorGate, which lives in App/. Not part of this feature; worth a board line.
{% endraw %}

</div>
