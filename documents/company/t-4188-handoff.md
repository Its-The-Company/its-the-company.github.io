---
layout: "default"
title: "T-4188 handoff (Idris, updated 2026-11-26)"
section: "documents"
description: "Baseline, the session&#x27;s build-for-testing at a57dd2807b: J-20261126-0346-land-chk-a5ab71-3-428d99, whole PyWidgetTests, 2456 run, 0 failures, 2 skipped (GalleryModesSnapshotTests, as before)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4188-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4188-handoff.md</code></span></div><h1>T-4188 handoff (Idris, updated 2026-11-26)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
## Session 2026-11-26 (b3), from main a57dd2807b: T-4650, T-4651, T-4652 committed; T-3554, T-0543 no commit

Baseline, the session's build-for-testing at a57dd2807b: J-20261126-0346-land-chk-a5ab71-3-428d99, whole PyWidgetTests,
2456 run, 0 failures, 2 skipped (GalleryModesSnapshotTests, as before).
- T-3554, T-0543: no commit, as in 11-25 (c). Re-checked on a57dd2807b: nothing in Swift purges a widget from `.trash`
  (WidgetID.trashName and the library's id filter only; the installer's `.trash-*` is its own staging folder), so L4
  still has nothing to hook; F7 still needs a real iPhone. Reviews of 0ca25f84f9 and 6ec7e29f14 still Odalys's.
- T-4650 cd35908b91 (T-4597 M1): GalleryModel.runAll stops before a tile while a console run is pending
  (PyBridge.appRunPending, injected as `consoleWaiting`); runShelf (the screen's .task, Allow, Try again) polls every
  250 ms and runs the rest once it ends; a runAll asked during a pass makes the pass look again (`again`); rerunStale
  stands down too. screens.md's GalleryView says so. 4 tests in PremadeSensorStallTests (two on the real bridge, two
  with a fake runner). First try J-20261126-0358-land-chk-a5ab71-3-05b3c9 red for the test's own ordering (console run
  queued before the preview); fixed. Green: J-20261126-0426-land-chk-a5ab71-1-27e6dc, 2460 run, 0 failures.
- T-4651 f71b9de69f (T-4597 L1): the gallery-and-app-pass test requires a preview that waited more than 2 s behind a
  widget run (queue times from the runner, run ids by runInfo context, RecordLog times and seqs). Two compile fails
  on the runner (J-...0444-...34d9f9, J-...0449-...2004a9), whose kept lines hid the error; `XC_LOCAL=here ...
  build-for-testing` builds on the Mac mini and shows it. Green: J-20261126-0459-land-chk-a5ab71-3-44f6d6, 2460/0.
- T-4652 f8c21f9822 (T-4597 L2): text only. bridge-contract s1 v5.10 (10 s from the latest request; what can hold a preview
  that long), the s7 `busy` row ("a preview whose queue limit ran out"; the tile's Failed), the v5.10 changelog row;
  PyBridge.previewQueueSeconds's comment. Green: J-20261126-0515-land-chk-a5ab71-1-214a3a, whole PyWidgetTests, 2460
  run, 0 failures, 2 skipped; host_keep 21 suites, 2194 tests on both interpreters, 0 failed.
- Not done: none of the new tests has been seen red on a mutant yet. Worth one job: drop the
  `if consoleWaiting() { stoodDown = true; return }` line and `again = true` (all four T-4650 tests should go red), and
  run the gallery after the app pass in testT3552GalleryAndAppPassTogetherWithSensorsStalled (T-4651's assert should).
  The Mac mini's load was 150 at 5:15 AM, past xc.sh's gate, so it could not run here.
- Left out on purpose: TestWidgetsSection.runAll (GalleryView.swift, internal TestFlight builds only) still runs its
  previews with no stand-down.
- Closing checks at f8c21f9822: whole `-only-testing:PyWidgetTests` read from J-20261126-0515-land-chk-a5ab71-1-214a3a
  (same tree); host_keep --task T-4188, 42 suite runs kept, 0 failed. `feature_session.py check`: MERGE POINT yes.
- Open: Odalys's review of cd35908b91, f71b9de69f, f8c21f9822 (one review for the branch). Next session: T-4832,
  T-4833, T-5850.

## Session 2026-11-25 (d), from main a19e52f3c9: T-5294 committed; T-3554, T-0543 no commit

- T-5294 c255c03bc2: the scratch t5294/ files copied in (none of the six had moved on main since 41ef454488).
  The earlier job J-20261125-0244-land-chk-a5ab71-1-58346c had failed to build (exit 65, 281 s); today's first build
  (J-20261125-0932-land-chk-a5ab71-2-14a00b) showed why: `until`'s non-escaping closure; now `@escaping`. Plants
  (schedule without scheduleTurns; picks under one process-wide key), J-20261125-0935-land-chk-a5ab71-3-2583bd: both new
  tests red (17 pending; "run B bookmarked run A's pick"). First green try, J-20261125-0939-land-chk-a5ab71-3-22283f:
  3 older bookmark tests red; they noted the pick in Self.pickRun and bookmarked as runs 2-4, which the per-run rule
  rightly refuses, so their bookmark calls now come from the picking run. Final tree: J-20261125-0954-land-chk-a5ab71-3-252029,
  whole PyWidgetTests, 2331 run, 0 failures, 2 skipped; host_keep 21 suites, 2072 tests on both interpreters, 0 failed.
  Open: Odalys's review of c255c03bc2.
- T-3554, T-0543: no commit, as in (c) below (main moved only by records and T-2027's note since 9d117bc72d). F7 needs a
  real iPhone; L4 waits for a purge to exist.
- Slip: running `tools/runner_queue.py` without `--help` to read its options queued a unit-target request at a19e52f3c9
  in ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox/; I deleted that untracked request file before anything picked it up.

## Session 2026-11-25 (c), from main 9d117bc72d: T-3554, T-0543, T-2027

T-0053 and T-0063 are on main (7db2936a61, a5c9b3fe69): not redone; `feature_session.py landed T-4188` ticks them.
Baseline, the session's build-for-testing at 9d117bc72d: J-20261125-0838-land-chk-a5ab71-5-57212c, whole
PyWidgetTests, 2329 executed, 0 failures, 2 skipped (GalleryModesSnapshotTests, as before). No app code changed.
- T-3554: no commit. F5, F6, F8 are on main in 0ca25f84f9 (checked 11-25: device.py's docstring and messages,
  bridge-contract s4 "Device calls" and net.MARGIN_S all name the reserve; test_device_modules reads
  BUDGET_RESERVE_S). Left: F7, time from BridgeTimeout to `finished`, needs a real iPhone; and the review of
  0ca25f84f9 by someone other than me, Odalys's to do (the 11-25 audit says it is still owed).
- T-0543: no commit. L1, L2, L3, L5 are on main in 6ec7e29f14. L4 (delete a purged widget's `<id>/` keychain
  accounts) is still blocked: on 9d117bc72d nothing in Swift or the runtime purges a widget from `.trash` (only
  WidgetID.trashName and the library's id filter name it), so there is no purge to hook it to. Deleting the
  accounts at some other moment (project or file delete) would be a new rule for when a person's secrets go,
  which is a product decision, not this line's. Left: L4 once a purge exists; review of 6ec7e29f14.
- T-2027: re-run on a never-used Simulator (iPhone 17e, iOS 27.0, created for the run as A87CB1A8, deleted after),
  current test (T-5607's ready check included), `XC_TASK=T-2027 tools/xc.sh ... -destination id=A87CB1A8...
  -only-testing:PyWidgetTests/BridgeTests/testNotificationScheduleAndCancelThroughTheBridge test`: 1 executed,
  0 skipped, 0 failures, ops/runs/xcodebuild-20261125-084046.log (local, git-ignored), line 18798: "status before
  0 (read took 0.0 s), after 3; waited 0.0 s for active; ask 0.0 s"; ready check "ok after 1 try(s), 0.0 s". So
  the bridge path from not determined is green end to end on a fresh device. Unlike the 11-17 fresh runs (first
  read 27-172 s, then 2003), this one's server answered at once (xc.sh had installed the app first with
  a ThemeTests run; I have not checked whether the 11-17 runs had that step). One run, so 2003 is not ruled out on a fresh device: the test's skip and the
  ready check still cover it. Left (T-4188's iPhone sitting, not this line): does a real iPhone ever answer 2003.

## Session 2026-11-25 (b), from main cc4de5ff80: merge point, 2 steps committed

- T-0053 (folded into one commit 47f1ee158b): Odalys's widened check (any "CoreLocation" image) went red on main
  (J-20261125-0432-land-chk-a5ab71-1-12d30c): every PyWidgetExtension build weakly loads libswiftCoreLocation.dylib
  through the SDK's autolink, binding only `__swift_FORCE_LOAD_$_swiftCoreLocation`. So: the framework check stays on
  load commands, plus a new test on LC_SYMTAB's bound imports. J-20261125-0540-land-chk-a5ab71-1-022d40, 2318 run, 0
  failures, 2 skipped. Mutants (scratch mutant-t0053.json): CLLocationManager and CLLocationUpdate-only both KILLED.
- T-0053 review fixes (Odalys, second pass on this branch, 11-25): ExtensionLinkTests now walks every library the
  extension loads from inside the app (@rpath via LC_RPATH, @executable_path, @loader_path; Python.framework must be
  among them) and runs both checks on each file; a cut-short symbol or string table throws (new fixture test). The
  framework branch went red on a plant (scratch worktree: a dylib target using CLLocationManager, embedded in the
  appex, removed after): J-20261125-0627-land-chk-a5ab71-3-40c991, both checks failed on libLocationPlant.dylib.
  Final tree: J-20261125-0628-land-chk-a5ab71-5-051af3, whole PyWidgetTests, 2319 run, 0 failures, 2 skipped;
  host_keep 2071/0. Committed eea3f347a6 (its body says 47f1ee158b's Evidence should have been J-...0540). Open:
  Odalys re-review. A duplicate whole-target job, J-20261125-0649-land-chk-a5ab71-4-344155, was still running at hand-in.
- T-0063 cbe9e5ff9f: ShippedPremadesNeedNoGrant, host_keep 2071/0. Python only.
- Not taken: T-3554 (session hit its hand-in). Still owed there: F7 (BridgeTimeout-to-finished on a real iPhone) and
  a review of 0ca25f84f9 (Odalys's t4188-030410be review covers it as commit-list only; the 11-25 audit says the
  review is still owed). T-5294 stays in scratch for the next session.
- Backup of the pre-fold branch: local branch idris-t4188-backup-1125 (delete after the merge).

## Session 2026-11-25 (feature session from main 41ef454488, branch personal/b)

Parts 1 and 2 of T-0053 are on main as T-5365 (77b59b60f7, c9fb09ddc2, 824c627382; review 62d02e0cc0). Baseline:
the session's one-time build-for-testing at main ran as J-20261125-0143-land-chk-a5ab71-5-51cbec, whole PyWidgetTests,
2309 tests, 0 failures, 2 skipped (GalleryModesSnapshotTests).

- T-0053, part 3 slice: `pywidget/ios/Tests/ExtensionLinkTests.swift` (new). Reads the built PyWidgetExtension.appex's
  Mach-O load commands (its executable and, where the build makes one, its .debug.dylib) and fails if it loads
  CoreLocation; its Info.plist must carry no `NSWidgetWantsLocation` and no `NSLocation*` key. Control: the app's own
  binary does load CoreLocation, so a reader that sees nothing fails there. Committed c3f56595e5. Check: whole
  PyWidgetTests at that tree, J-20261125-0219-land-chk-a5ab71-6-38a856, 2312 run (the 3 new ones among them), 0
  failures, 2 skipped as on main; host_keep 21 suites, 2068 tests, 0 failed. Not seen red on a planted CoreLocation
  import yet (worth one mutant run: `import CoreLocation` in any Shared/ file).
  Pernille's word on lane.py placement is not on the board or in log/ (searched 11-25), so nothing else of part 3 was
  built: the rest is T-5850 on the board (second extension target, Info.plist, privacy manifest, entitlements,
  WidgetBundle, the CoreLocation Source in its own folder), waiting on her word and on what decides "declares
  location". Without both, the new kind would sit in the widget gallery while every location script still runs in the
  app, which cannot read that extension's fix. Part 4 (footprint, Wrenna's two checks, C2 s7) follows T-5850.
- T-0063 and T-5294: written and host-green, NOT committed (the session reached its hand-in on the runner's queue).
  Both are in the scratch folder `/Volumes/SANDISK SSD/company-scratch/T-4188-idris/` (`test_pro_grants.py`;
  `t5294/`: NotificationsCall.swift, FilesCall.swift, DeviceModulesSlice2Tests.swift, bridge-contract.md, device.py,
  test_device_call.py). Copy each to its place in the tree (paths below) and run each step's plan.
  - T-0063 (`pywidget/tests/test_pro_grants.py`): the "location is off" state ("Location is off", "Allow location for
    PyWidget to see distances.") and the typed place (city list, T-4468; no permission) are on main already, pinned by
    tests/widgets/test_premade_refused.py. What was left: the 5.1.1(ii) guard read only the design file
    docs/design/widgets/premade.py. New class ShippedPremadesNeedNoGrant imports every shipped premade
    (pywidget/widgets/premade/*.py, as first_renders.py does, sys.path and sys.modules put back) and checks its
    CAPABILITIES against runtime/pro-flags.json. 3 tests; a planted Pro tag on steps went red. host_keep 21 suites, 2071
    tests, 0 failed. No Xcode run needed once T-0053 is committed (the plan then lists only this Python file).
  - T-5294 (L1-L4 of pywidget/docs/reviews/t4188-030410be-odalys.md): L1 `NotificationsCall.scheduleTurns`, a
    first-come turn around count, add and read-back (the prompt stays outside); L2 the 2003 reply now "iOS would not
    save this notification yet (code 2003)." / "Try again."; L3 SystemFiles keeps picks by run id
    (`picked(_:runID:)`, `save(_:as:runID:)`, `notePicked(_:runID:)`), so another run is refused and one run's end
    leaves another's pick; L4 bridge-contract s4 item 7 rewritten, and device.py's BridgeTimeout for a sent call adds
    "it was sent, so it may still have been done" (host test red on the old device.py, green after). New Swift tests:
    DeviceModulesSlice2Tests.testT5294TwoConcurrentSchedulesOfOneScriptEndAt16 (adds held until both calls stand
    where they would race; no timing) and testT5294APickHeldByOneRunIsRefusedToAnother, plus HeldAddCenter.
    host_keep 21 suites, 2072 tests, 0 failed. Xcode: the first combined check (J-20261125-0214-land-chk-a5ab71-1-165c50)
    failed to compile (FilesCall's remember_as save lacked runID), fixed in the scratch copy; the second,
    J-20261125-0244-land-chk-a5ab71-1-58346c (tree of all three steps), was still queued at hand-in. Read its result
    first; its tree is the tree after the three commits, so re-asking the same build reads it. Neither new Swift test
    has been seen red yet on the runner: plant the unserialised schedule (call `place` without `scheduleTurns.run`)
    and a process-wide pick, and see each red, before landing.


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
3. (Now T-5850 on the board; PyWidgetExtension's load-commands test landed in T-0053's 11-25 slice.) The second
   extension target in project.yml: `NSWidgetWantsLocation` in its Info.plist; its own
   PrivacyInfo.xcprivacy and entitlements; its own WidgetBundle with a location kind whose provider runs
   `LocationRefresh.refresh` before `ExtensionLane.shared.refresh`, and installs the route
   (`LocationRefresh.installed.install(Route(source: <CL source>, store: File()))`) at start. The CoreLocation
   `Source` lives in that target's own folder, never Shared/. PyWidgetExtension never links CoreLocation
   (add a test reading the built appex's load commands). Also: lane.py's `APP_ONLY_SUBMODULES` / `send_lane` must
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
