---
layout: "default"
title: "T-4188 handoff (Idris, updated 2026-11-22)"
section: "documents"
description: "The 11-17 note&#x27;s T-2027 and cherry-picked commits (T-1241, T-0543, T-1671, T-1672) are on main; nothing of them is left here. Its open question, C2-Q1&#x27;s placement, is ruled: ADR-007 s14 chair line, Ines, 2026-11-20\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4188-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-4188-handoff.md</code></span></div><h1>T-4188 handoff (Idris, updated 2026-11-22)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The 11-17 note's T-2027 and cherry-picked commits (T-1241, T-0543, T-1671, T-1672) are on main; nothing of them is
left here. Its open question, C2-Q1's placement, is ruled: ADR-007 s14 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line, Ines, 2026-11-20 11:57 AM ET
(T-5362). The fix lives only in the second extension's own container,
`Library/Application Support/pywidget/device/location-refresh.json`; only that extension's Swift reads it; no
`location/last.json` in the App Group; the app and PyWidgetExtension keep `app_cache` / app-only.

## T-0053 parts 1 and 2: committed as T-5365 (2026-11-22, this commit; hash in the T-5365 tick); parts 3 and 4 left

Applied the saved patch (SanDisk copy, BASE 051fbbdf9a) cleanly onto main 9012e17522, after the #325 hold <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span>
(an Investor #325 c7089960090). Checks, all green on the tree committed:
- build-for-testing at main before the patch: runner job J-20261122-2134-land-chk-a5ab71-3-50e801, 2187 tests, 0
  failures (log ops/runs/xcodebuild-20261122-214557.log, on the runner).
- the patched tree, first try (check commit 09428dea): runner job J-20261122-2156-land-chk-a5ab71-2-11405f, the whole
  PyWidgetTests target, 2209 tests, 0 failures (ops/runs/xcodebuild-20261122-215833.log, on the runner). The plan's
  filtered run and `-only-testing:PyWidgetTests` were both answered from that job (T-5476). The commit hook then
  refused one test's read of LocationRefresh.swift as text (T-4753 lint): that half of the test is gone (the
  route-nil assert stays); "PyWidgetExtension never links CoreLocation" is now part 3's load-commands test.
- the tree committed (check commit 001be0df): runner job J-20261122-2209-land-chk-a5ab71-4-278203, whole PyWidgetTests,
  2209 tests (22 of them LocationRefreshTests), 0 failures, 2 skipped (GalleryModesSnapshotTests, as on main)
  (ops/runs/xcodebuild-20261122-221711.log, on the runner).
- `python3 -I tools/host_keep.py run --wt . --task T-5365`: 3.9.6 and 3.13.18, 21 suites, 1939 tests each, 0 failed.

What T-5365 holds:
- `pywidget/ios/Shared/Bridge/LocationRefresh.swift`, no CoreLocation: the `getTimeline` policy (`refresh`: guard
  first, deleting the file when location or widget updates are not allowed or Precise Location is off for a fine
  fix; then for a widget that declares location and a kept fix `maxAgeS` (300 s) or older, one fix within
  `boundS` (3 s), written only if it came within the bound and location is still allowed); the file (`File`:
  atomic, `{"source":"refresh","sampled_at","fix"}`, folder out of backups, a bad record deleted on read); the route
  (`answer`: `sample()` from the file as `source="refresh"`, `no_fix` when none is young enough, LocationCall's
  refusals word for word; `last_known`/`request_*` NotAvailableHere, `updates` LiveOnlyInWidget).
- `LaneDeviceRouter.handle` sends `device.location` to `LocationRefresh.installed.route` when one is installed.
  Nothing installs one yet, so behaviour today is unchanged.
- Python already accepted `refresh` in `location.sample()`; test_device_modules now pins it.
- Tests: Tests/LocationRefreshTests.swift (22, incl. no fix in 3 s and a late fix never written).


T-0053 stays open for what follows. Left, in order:
3. The second extension target in project.yml: `NSWidgetWantsLocation` in its Info.plist; its own
   PrivacyInfo.xcprivacy and entitlements; its own WidgetBundle with a location kind whose provider runs
   `LocationRefresh.refresh` before `ExtensionLane.shared.refresh`, and installs the route
   (`LocationRefresh.installed.install(Route(source: <CL source>, store: File()))`) at start. The CoreLocation
   `Source` lives in that target's own folder, never Shared/. PyWidgetExtension never links CoreLocation
   (add a test reading the built appex's load commands). Also: <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py's `APP_ONLY_SUBMODULES` / `send_lane` must
   place location-declaring widgets in that extension's lane instead of the app's (Pernille's file; ask her), and
   "declares location" needs a manifest field or the kind itself to decide it. Steps (pedometer) join it (T-0671).
4. Footprint of the second extension measured in the Simulator against ADR-007 s6's margin; then Wrenna's two
   Simulator checks (the file survives between extension launches; the app cannot read it); then C2 s7 from open
   to ruled. `LocationRefresh.maxAgeS` may move with the measurement.

Before part 3 starts: Pernille's word on lane.py's placement, and the Investors' registration of the second
extension's bundle ID. On 2026-11-22 no open issue asks the Investors for that bundle ID (searched open issues for
bundle, extension, location); none was opened in this session.
{% endraw %}

</div>
