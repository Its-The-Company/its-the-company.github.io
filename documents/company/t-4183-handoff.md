---
layout: "default"
title: "T-4183 handoff"
section: "documents"
description: "Stopped mid-step 1 (T-0193) on a fault I can&#x27;t fix: the internal disk is under xc.sh&#x27;s 20 GB line, so every Xcode test run exits 75 before xcodebuild starts. Nothing was tested in the Simulator, so nothing is committed\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4183-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4183-handoff.md</code></span></div><h1>T-4183 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Stopped mid-step 1 (T-0193) on a fault I can't fix: the internal disk is under xc.sh's 20 GB line, so every
Xcode test run exits 75 before xcodebuild starts. Nothing was tested in the Simulator, so nothing is committed
for any step.

## What ran
- `xcodegen generate` + `build-for-testing` (XC_TASK=T-4183, then T-0193): exit 0, logs
  ops/runs/xcodebuild-20261117-142343.log and -145101.log. The step 1 code compiles.
- Host: `python3 -I tools/host_keep.py run --wt . --task T-0193`: 21 suites, 1848 tests, 0 failed.
- Unit tests for T-0193 (the plan's 8 filters): exit 75 three times, 10 -> 18 -> 20 GB free; nothing ran.
  disk_keeper status: under its 30 GB line since 2026-11-16 3:00 PM, note already posted.
- Refused: `xcrun simctl delete` of my own stale T4631 sim (1.9 GB) was refused by the classifier; stopped there
  (Commandment 14), not retried another way.

## Step 1, T-0193 (uncommitted, in the working tree, unchanged by this session)
Files: App/Gallery/TourCountdownPage.swift (new), Tests/TourCountdownTests.swift (new),
UITests/TourUITests.swift (new), App/Gallery/GalleryPreview.swift (stateJSON passed to the preview),
App/PyWidgetApp.swift (Debug `-tour-page3` launch argument). I read it through; it looks complete against the
line and Pernille's T-0340 fixtures. Still owed, in this order, once the disk is over 20 GB:
1. `python3 tools/feature_session.py plan T-4183 T-0193`, then its unit and UI test commands (XC_TASK=T-0193).
2. Screenshots: TourUITests with SHOT_DIR set, on iPhone 17e and on an iPad (before/after files
   tour-page3-before/after and tour-page3-ipad-before/after). The UI test's calendar taps ("Next Month", a
   label ending " 15", the dismiss tap at the top) have never run; expect to adjust them.
3. Commit by path, "T-0193 Idris: ...", Plain:/Evidence:/ws: lines; then `feature_session.py check`.

## Steps 2-4, not started
- T-0811: follow Maren's spec s5.13 (pywidget/docs/design/ide/spec.md line ~926): Examples row after the
  projects in All, New menu "Open an Example", pushed Examples screen, `BundledExamples.summary`, identifiers in
  s5.13.5. Today ProjectsView has a "+" button and a "More" menu, not a New menu, so (b) means turning "+" into a
  Menu. The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs (refs/archive/parked/a2/2026110*-*) hold the older "More > Open Example" patch, which
  predates the spec; reuse only its ConsoleModel.open `opens` bump fix. The bundle now holds 11 examples
  (earthquakes_today), so [n] must come from the bundle, not "10".
- T-2723: needs the Simulator (ExamplesBundleTests, ExamplesUITests/testEarthquakesToday) plus the host run.
- T-4139: needs the Simulator in light and dark.
- The final full `-only-testing:PyWidgetTests` run is also owed.
{% endraw %}

</div>
