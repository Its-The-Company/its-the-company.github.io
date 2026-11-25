---
layout: "default"
title: "L3/L13 C1 runtime spike: CPython in the app and in the widget extension"
section: "documents"
description: "Times in ms, memory in MB (phys_footprint). &quot;to entry&quot; is process start to probe entry; &quot;to result&quot; is process start to the script&#x27;s value."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l3-runtime-spike.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L3-runtime-spike.md</code></span></div><h1>L3/L13 C1 runtime spike: CPython in the app and in the widget extension</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-25 (runs 7:29-8:07 PM ET). Board line "[build] Idris, P0, L3/L13 C1 spike". Simulator only (Apple membership pending; no device). Raw lines: `pywidget/ios/bench/*.txt`; table made by `pywidget/ios/scripts/summarize.py bench/*.txt`.

## 1. Result in four lines

- Upstream CPython 3.15.1 (python.org iOS XCframework, PEP 730) embeds through the C API and runs in the app and inside the WidgetKit extension process; the Home Screen widget shows the Python result (screenshot checked, 8:01 PM).
- In the extension, Python adds about 23 ms to a cold start of about 375 ms (init 8-9 ms, tiny script 14 ms) and about 4 MB of footprint (7.7 MB before, 11.9 MB peak).
- A network/data import set (ssl, sqlite3, asyncio, decimal, zoneinfo ...) takes the extension to 21.6 MB peak; a warm extension process that already ran it sits at 27-28 MB. That is close to the ~30 MB ceiling the brief calls "widely reported". The Simulator enforces no ceiling, so the ceiling itself is **not measured**.
- Zipped stdlib cuts the bundle's `python/` from 237 MB to 12 MB at no measurable cost in time or memory. PEP 810 lazy imports (`-X lazy_imports=all`) cut the heavy import set by a third in time and 2.5 MB in peak (zip vs zip + lazy: app 18.5 -> 16.0, extension 20.7 -> 18.2; corrected 2026-10-25 from 3.5 MB after Odalys's ADR-007 review S1, which compared two changes at once).

## 2. Method

- Runtime: `Vendor/python/Python.xcframework`, CPython 3.15.1, fetched by `scripts/fetch_python.sh` from python.org with a pinned sha256. Not committed (gitignored, 270 MB installed). One interpreter per process (`Shared/PythonRuntime.swift`): `PyConfig_InitIsolatedConfig`, home = the app bundle's `python/`, no bytecode writes, GIL released after init, every call on one serial queue.
- The extension has no copy of the stdlib or of `Python.framework`: it loads both from the containing app (`@executable_path/../../Frameworks`, and `PyWidget.app/python`). The `.appex` is 320 KB.
- Probe (`Shared/Bench.swift`), the same code in both processes: time from kernel process start to probe entry (`sysctl KERN_PROC p_starttime`), `Py_InitializeFromConfig` time, a tiny widget script (`json, datetime, math`, returns a string), then a heavier import set (json, urllib.request, urllib.parse, ssl, sqlite3, decimal, statistics, re, zoneinfo, csv, asyncio). Memory is `phys_footprint` and its lifetime peak from `task_info(TASK_VM_INFO)`, the number jetsam enforces. `os_proc_available_memory()` is recorded too.
- App runs (`scripts/bench.sh`): terminate, launch, 6 times per stdlib mode.
- Extension runs (`scripts/bench_widget.sh`): two PyWidget widgets placed on the Home Screen by the UI test `AddWidgetTests.testAddWidget`; per run, <span title="A test written in advance. If it fires, we drop the idea.">kill</span> the extension process, launch the app with `-reload` (it calls `WidgetCenter.reloadAllTimelines()` once its scene is active), wait for the extension's `getTimeline` line. 6 cold runs per mode. With two widgets, a reload sometimes gives a second call in the same process: that is the "warm" row (n = 1 per mode).
- "Cold" means a new process. The host's file cache stays warm, so cold-from-disk on a phone will be slower.
- Build: Debug, `iphonesimulator`, arm64 + x86_64; iPhone 17e simulator, iOS 27.0, on the Mac mini (Apple silicon). Device, Release and the oldest supported device were not available.
- **Device session rest reading and the 0-rule (T-0680 item 2; T-2097, from T-2085 M1).** Since 504703ed2 a 0 from
  `os_proc_available_memory()` inside the widget extension refuses, then demotes, every <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> widget, and no one has read
  that call in the extension on a phone. The gate build (Release, device, `PYWIDGET_LANE_GATE` on the xcodebuild line,
  s8 of T-1853's plan; T-1988 builds the switch's guards) writes one row per extension process to the App Group's
  `lane-rest.jsonl`, at the top of the first getTimeline, before any lane decision and with the flag on or off
  (`Shared/LaneRestBench.swift`): `available_bytes` and `available_mb`, task_vm_info's `limit_remaining_bytes`,
  `footprint_mb`, `process`, `bundle`, `pid`. The forced Simulator run writes the same row (0 there, no jetsam limit).
  **Rule:** the (c) flag stays shut until the rows whose `bundle` is the widget extension's read `available_bytes` > 0 in
  every one of n >= 6 cold processes on the oldest supported phone. A row from the app's bundle does not count. One 0
  at rest: no flag default from this session; the margin's headroom moves to another source (`limit_remaining_bytes`, if
  it read non-zero in the same rows) through a new build line and an independent review, never by reading 0 as room.
  Release builds stop at the legal links check until T-0485 lands; check before the session whether the gate line
  needs the editor bench's exemption (`PW_EDITOR_BENCH=YES`) [not tried].

## 3. Benchmark table (medians of n, max in brackets)

Times in ms, memory in MB (phys_footprint). "to entry" is process start to probe entry; "to result" is process start to the script's value.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. Benchmark table (medians of n, max in brackets), scrolls sideways" data-n="3 4 10" style="--tw:1406px" markdown="1">

| Process | stdlib | lazy | n | to entry | Py init | script | to result | MB before | MB after init | MB peak | heavy imports | MB peak heavy | modules (tiny/heavy) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| app | full | no | 6 | 302.6 (635.9) | 11.7 (50.4) | 13.5 (27.1) | 327.6 (662.9) | 5.1 | 8.0 | 9.7 | 111.4 (204.0) | 19.3 | 63/218 |
| app | stripped | no | 6 | 295.1 (308.7) | 11.4 (22.5) | 13.4 (24.9) | 320.3 (356.3) | 5.1 | 8.0 | 9.7 | 106.1 (195.6) | 19.3 | 63/218 |
| app | zip | no | 6 | 291.4 (314.9) | 12.8 (23.7) | 14.3 (26.5) | 318.2 (365.4) | 5.1 | 8.2 | 9.8 | 106.5 (191.6) | 18.5 | 63/218 |
| app | zip | yes | 6 | 302.2 (309.0) | 13.1 (24.9) | 13.9 (27.1) | 329.5 (361.5) | 5.1 | 8.2 | 9.7 | 73.0 (115.0) | 16.0 | 59/153 |
| extension, cold | full | no | 6 | 351.8 (377.8) | 7.9 (8.6) | 14.2 (22.3) | 374.1 (408.9) | 7.7 | 10.2 | 11.9 | 104.5 (177.7) | 21.6 | 63/218 |
| extension, cold | stripped | no | 6 | 359.5 (576.3) | 8.0 (8.3) | 14.6 (19.7) | 382.1 (603.9) | 7.7 (14.6) | 10.2 | 11.9 (18.6) | 109.9 (149.6) | 21.7 (28.1) | 63/218 |
| extension, cold | zip | no | 6 | 346.1 (658.3) | 9.3 (11.2) | 14.8 (28.0) | 369.4 (697.6) | 7.7 (14.3) | 10.4 | 12.1 (18.4) | 110.5 (191.7) | 20.7 (26.8) | 63/218 |
| extension, cold | zip | yes | 5 | 360.4 (367.3) | 9.2 (9.4) | 14.4 (15.1) | 385.0 (391.2) | 7.7 | 10.4 | 11.9 | 73.9 (77.7) | 18.2 | 59/153 |
| extension, warm | full | no | 1 | (4,295) | 0 (already up) | 0.4 | - | 27.8 | 27.8 | 28.0 | 0.2 | 28.0 | 218/218 |
| extension, warm | stripped | no | 1 | (4,054) | 0 | 0.4 | - | 28.2 | 28.2 | 28.3 | 0.2 | 28.3 | 218/218 |
| extension, warm | zip | no | 1 | (3,942) | 0 | 0.4 | - | 26.9 | 26.9 | 27.0 | 0.2 | 27.0 | 218/218 |
| extension, warm | zip | yes | 1 | (4,029) | 0 | 0.3 | - | 26.8 | 26.8 | 26.9 | 0.2 | 26.9 | 218/218 |

</div>


Notes on the table:
- The first call of each process carries a 10-25 ms first-touch outlier (the max column); medians are steady.
- The `max` memory figures in the stripped and zip extension rows (14-18 MB before Python) are the run right after a reinstall, when WidgetKit's own reload ran first in a fresher process; one run each.
- The zip-lazy extension file has 6 cold lines; one is `lazy: false` (the reload WidgetKit makes on reinstall, before the app wrote the lazy flag) and is left out of the row.
- Warm rows: the interpreter is already up and every module from the previous call stays imported, so the footprint is whatever the last script left behind. The warm row is the cumulative cost, not a fresh one.
- `os_proc_available_memory()` returned 0 in every extension run: the Simulator applies no per-process memory limit. Nothing here proves the extension would survive on a phone.
- Earlier (7:31 PM) the widget gallery's preview ran `getSnapshot` in an extension process whose footprint was 14.3 MB before Python and 27.9 MB after the heavy set. The gallery path is also a Python path and must obey the same limits.

## 4. Bundle sizes (Debug, simulator, fat arm64 + x86_64)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Bundle sizes (Debug, simulator, fat arm64 + x86_64), scrolls sideways" style="--tw:589px" markdown="1">

| stdlib mode | .app | python/ | Frameworks/ |
|---|---|---|---|
| full (upstream as shipped, includes the 174 MB test suite) | 270 MB | 237 MB | 32 MB |
| stripped (no test/idle/tk/turtle/ensurepip, no opt-1/opt-2 .pyc) | 58 MB | 25 MB | 32 MB |
| zip (stripped, then sourceless .pyc in python315.zip) | 45 MB | 12 MB | 32 MB |

</div>


- `Frameworks/` holds `Python.framework` (12 MB fat) and 68 extension-module frameworks. About 2.1 MB of them are CPython's own test modules (`_testcapi`, `_testinternalcapi`, `xxlimited` ...) and can be dropped.
- A device build is arm64 only, so the frameworks shrink; App Store thinning applies too. Not measured.
- Zip has no measurable time or memory cost against stripped (rows above). Recommendation: ship `zip`, drop the test modules.

## 5. What it means for the execution options (brief L3 a-e)

The brief's L3 deliverable is an "architecture ADR". ADR-001 calls it "ADR-002 (execution architecture)", but ADR-002 is now the view-tree ADR (L4). The execution ADR needs a number; ADR-003 is free.

- **(a) Python in the extension, minimal runtime.** Works and is cheap for light scripts: +23 ms and +4 MB on a ~375 ms, ~8 MB extension. The risk is memory, not time: a heavy import set reaches 22 MB cold and a warm process carries 27-28 MB, inside what may be a ~30 MB ceiling (unmeasured). Not safe as the only path.
- **(b) Python in the app, extension renders a cached view tree.** ADR-001's v1 default. These numbers do not argue against it: the app's Python cold path is 25 ms on top of launch, and the app has no tight ceiling. Its cost is freshness (background budget, L2), not runtime.
- **(c) Hybrid.** The numbers support it best: a script whose imports stay inside an allowlist (the tiny set loads 63 modules, 12 MB peak) runs in the extension at render time; anything that imports ssl, sqlite3, asyncio, or any native package runs in the app (b). Selection by a static import scan at save time, plus a runtime guard: on device, read `os_proc_available_memory()` before and after the run and fall back to the last good render with an error badge when headroom is under a set margin. My recommendation: keep (b) for v1 as ADR-001 says, and build (c) on the same runtime behind a flag once device numbers confirm the headroom (target: twice the measured peak).
- **(d) Opt-in cloud execution.** Not measured. It needs a server, so spending and sign-ups are the Investors'; it cannot read on-device sensors; scripts and their data leave the phone, a privacy-label and App Review change. Not for v1.
- **(e) Alternatives.** Measured inside CPython: PEP 810 lazy imports (3.15) cut the heavy import set from ~110 to ~74 ms and peak by 2.5 MB (app and extension; was 3.5, corrected after ADR-007 review S1) with no import errors, so it is the cheapest lever for (a)/(c). Not measured: frozen modules (3.15 freezes its startup modules by default [recalled, unchecked]; the brief asks for it, a follow-up), a smaller interpreter (MicroPython, RustPython) or AOT compile. Their compatibility cost is real (missing stdlib, C-API packages), and these numbers give no reason to pay it.

Failure behaviour (input to the ADR, not yet a spec): every extension run gets a wall-clock deadline (the timeline call must return; on timeout, return the last good entry with a badge); an out-of-memory kill cannot be caught in-process, so the extension writes a "run started" marker to the App Group and the next call that finds a marker without a matching "run finished" moves that widget to app-side execution (b) and shows the badge.

## 6. Risks and limits of this spike

1. **Simulator, not a phone.** No jetsam ceiling (`os_proc_available_memory()` = 0), Mac CPU, warm host file cache, Debug build. The brief asks for the oldest supported device; ADR-001 sets the floor at iOS 18. Every number here is a lower bound on time and an unverified figure on memory.
2. **Warm accumulation.** One interpreter per process, never finalized; modules imported by one widget's script stay resident for the next. Re-initializing CPython in-process is not supported cleanly, so the extension cannot shed memory except by being killed.
3. **The ceiling is a recalled figure.** "About 30 MB" is the brief's "widely reported"; Apple publishes none that I read. Measure on device with a deliberate allocation ramp.
4. **Snapshot path.** The widget gallery runs `getSnapshot` too, in an extension process with a larger baseline (14.3 MB). The gallery must render a cached tree, never run user code.
5. **Stdlib in the app bundle.** The extension reads Python from `PyWidget.app/python` and `PyWidget.app/Frameworks`. This works in the Simulator; that extensions may load frameworks from the containing app is [recalled], and code signing of this layout on a device is unchecked.
6. **Test modules shipped.** Upstream ships `_testcapi` and siblings in `Frameworks/`; they must be stripped before submission (2.1 MB, and App Review may flag private-looking symbols [unchecked]).
7. **The UI test once passed without proving its point.** It now asserts the widget is on the Home Screen. Its earlier failure was a label: iOS 27 names the gallery button " Add Widget" with a leading glyph.

## 7. Open

- Device run on the oldest supported phone: cold start, peak, and the real ceiling by allocation ramp. Needs a device and signing (Apple membership pending, due Day 7, 2026-10-28).
- ~~Frozen-modules measurement; a Release-build run.~~ Done 2026-11-23, section 9 (T-0213).
- T-1853 (2026-11-04): the device session's Release build runs the lane with a record-only margin under `PYWIDGET_LANE_GATE`; how <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 get their numbers: `docs/decisions/gate-session-build.md`.
- Execution ADR (ADR-003) and failure-mode spec, from section 5.
- Logged: CPython 3.15.1 iOS XCframework and the libraries linked into its modules in `log/software.md`.

## 8. Sensors inside the extension (T-0011, 2026-11-17, host-side only)

No device numbers yet. They come from the Investors' Settings > Export measurements of T-4282's gate build (an Investor #192 c6673876442: TestFlight exports in place of a sitting). Nobody installs to or reads from an Investor's phone from a session, and permission prompts stay with the Investors.

**What exists at HEAD (checked in code, 2026-11-17).** The pedometer (`App/Device/PedometerCall.swift`, CMPedometer, last 7 days) and location (`App/Device/LocationCall.swift`) are read in the app process only. Their purpose strings (`NSMotionUsageDescription`, `NSLocationWhenInUseUsageDescription`) are in the app's Info.plist only; the widget extension's has neither, nor `NSWidgetWantsLocation`, and it imports no CoreMotion, CoreLocation or HealthKit. There is no second extension target in `project.yml` (T-0680 item 6's pedometer half, T-0682's steps query): T-0798 item 2 records that half as not run while it is absent. HealthKit is in no target and has no entitlement. Run rows (`runs-<id>.jsonl`) already tell a refresh-button run (`trigger: intent`, ExtensionLane) from a reload (`system`); a Shortcuts reload (RefreshWidgetsIntent) runs nothing in the extension and shows as `system`, so `shortcut` (reserved in RunTrigger) is never written.

**Added (T-0011).** `Shared/SensorProbe.swift`, in the same two builds as `lane-rest.jsonl` (gate build, forced Simulator run): one row per process per step in the App Group's `sensors.jsonl`, `rest` at getTimeline's top and `intent` at RefreshWidgetIntent's perform, with process, bundle, pid, battery level (null when unknown) and state, Low Power Mode, thermal state, and `protected_data` (a FileProtectionType.complete file: `unreadable` while locked). Each row also has `protection_class` (T-5058): that file's class as the file system reports it (`.protectionKey`'s raw value, `NSFileProtectionComplete` on a phone), null where none is reported. The Simulator has no data protection, so a build that lost the flag passed every unit test (T-4928 M1); the write options are now one constant, `SensorProbe.lockProbeWriteOptions`, and `testTheLockProbeIsWrittenWithCompleteProtection` is red without `.completeFileProtection`. Each row lists `not_probed`. RefreshWidgetsIntent's perform appends a `{"step": "shortcut_reload", "t": ...}` row on every call (item 5 below, done here). Export measurements copies it; the manifest names it missing when absent. Unit tests: `SensorProbeTests`, `MeasurementExportTests`. App Store builds stay silent, and the three call sites stay (T-5059, T-4928 M2: a mutant without the two `LaneRestBench.records` guards and the three call sites passed the whole unit target): `record` and `recordShortcutReload` take the gate and folder as parameters (defaults `LaneRestBench.records`, `WidgetFolder.appGroup`); `SensorProbeTests.testRecordsFalseWritesAndCreatesNothing` is red when either guard drops the gate (a row, the lock probe or `sensors.jsonl` appears), and `LaneRestBenchTests.testSensorProbeHasExactlyItsThreeCallSitesEachFirst` is red when a call site goes, moves, gains a sibling or passes its own gate: `record("rest")` right after getTimeline's at-rest reading, `record("intent")` first in RefreshWidgetIntent's perform, `recordShortcutReload()` first in RefreshWidgetsIntent's perform, and both defaults the build's gate (mutants: `pywidget/ios/Tests/mutants-t5059.json`, results `ops/runs/t5059-mutants.txt`).

**What reading it answers.** Battery in the extension: a non-null level in an extension `rest` row. Locked against unlocked: rows with `protected_data` `unreadable` against `readable`, from the same phone, and only where `protection_class` reads `NSFileProtectionComplete`; any other class or null means `readable` says nothing about the lock. An intent run's process: the `intent` row's bundle (app or extension, by iOS version, RefreshTapRule).

**Added (T-4824, 2026-11-24, host-side only): L3 s8 items 1-3.** Same file, same two builds, same gate and call sites (`record` reads them; App Store builds write nothing, T-5059's test unchanged). Every row now carries eleven more keys, null where that process did not read them:
- `pedometer_authorization` (`CMPedometer.authorizationStatus()`: `authorized`, `denied`, `restricted`, `not_determined`), `step_counting_available` (`CMPedometer.isStepCountingAvailable()`), `motion_activity_available` (`CMMotionActivityManager.isActivityAvailable()`), `motion_activity_authorization` (`CMMotionActivityManager.authorizationStatus()`, named as the pedometer's).
- `pedometer_query`: how the one `queryPedometerData(from: start of today, to: now)` ended: `answered`, `error <domain> <code>`, or `no answer within 3 s`; and `pedometer_query_ms`, the call to that ending. The count is never read out of the answer. It runs only when the status reads `authorized` (granted in the app by a script's pedometer call), only in the widget extension (on iOS 27 an intent row is the app's, and the app already reads the pedometer), and only in the process that makes the install-once marker `sensors-pedometer-query` in the App Group, exclusively, before the call. Otherwise `not tried: <status>`, `not tried: not the widget extension`, `not tried: tried before`, or `not tried: no marker: <domain> <code>`. Reading it: a marker in the App Group and no row with `answered`, `error` or `no answer` means the query took its process with it; that cost one process, once. The query rides in the first row that reaches it, so one `rest` row per install can sit up to 3 s longer in getTimeline before the lane runs; `pedometer_query_ms` says how long.
- `sensor_recorder_available` (`CMSensorRecorder.isAccelerometerRecordingAvailable()`) and `sensor_recorder_authorization` (`CMSensorRecorder.authorizationStatus()`, named as the pedometer's). No recording is started.
- `location_authorization` (`when_in_use`, `always`, `denied`, `restricted`, `not_determined`), `location_accuracy` (`full`, `reduced`), `location_widget_updates` (`isAuthorizedForWidgetUpdates`), from a fresh `CLLocationManager`; no fix asked for. Read only where a location reader is installed: the app installs one at launch in these builds (`App/Device/SensorProbeLocation.swift`), so app rows carry it. PyWidgetExtension installs none and never links CoreLocation (T-0053's design: only the second extension, with `NSWidgetWantsLocation` and its own when-in-use string, may), so its rows read null here and name `location` in `not_probed`. Reading a status needs no purpose string; the extension's `isAuthorizedForWidgetUpdates` waits on T-0053's extension, which installs its own reader.
- `not_probed` now lists what that row did not read: `health` always (item 4), `location` where no reader is installed, and the three motion names only in a row without a motion reading (none from the live read).

Purpose strings: the extension's Info.plist now carries `NSMotionUsageDescription`, the app's exact words (Maren reviews them in the change review); no location string and no `NSWidgetWantsLocation`, since the extension links no CoreLocation. Whether App Store Connect accepts the bundle (its missing-purpose-string check, recalled, unchecked) is the internal upload's to show, not yet run: T-4824's follow-up line. Unit tests: `SensorProbeTests` (marker first and once, a killed query's marker never tried again, no marker no query, the 3 s bound with the deadline owned by the test, an answer cancels the deadline, error as domain and code, authorized-in-the-extension only, the row's keys and nulls), `MeasurementExportTests`.

**The earlier list (items 1-3 are now the T-4824 paragraph above).**
4. Not probed: HealthKit, not asked for either; out of 1.0 (ops/decisions/2026-11-18-t4841-healthkit.md).
5. Done in T-0011 (`SensorProbe.recordShortcutReload`, test `testEveryShortcutReloadIsARow`). Shortcuts reloads: RefreshWidgetsIntent's perform appends one `{"step": "shortcut_reload", "t": ...}` row per call (not once per process), so reloads it asked for can be counted against the extension's `system` rows that follow.

## 9. Release build, frozen modules, zip default (T-0213, 2026-11-23, Simulator only)

Idris, runs 8:10-8:21 AM ET, built from main at b52edd9c15 (this worktree, clean). Simulator only; the device run (T-0008, T-4282's gate build) still decides. A per-task iPhone 17e Simulator ("T0213 iPhone 17e"), iOS 27.0, arm64 only (`ONLY_ACTIVE_ARCH=YES`). Release built with `PW_EDITOR_BENCH=YES`, the legal-links check's switch for a non-archive bench build (T-0497); it is not a shippable build. Driver and raw lines: `pywidget/ios/bench/t0213/` (`run.sh`, `frozen_probe.c`, `*.jsonl`, `size-*.txt`; `summary.py` prints the medians below). The driver and probe are from a 2026-11-02 run of the same task that was never merged (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> at refs/archive/parked/b/20261102-084136-20620, built from d5e3dc89); its figures are quoted below only as "11-02" for comparison.

**Zip default.** Already in main: `STDLIB_MODE: zip` in `project.yml`, base and Release (f4934e8752, T-0052, 2026-10-27). Both builds read `zip` back from the bundle's `python/STDLIB_MODE`; `python315.zip` is 11,081,068 B, the same as on 11-02. Nothing to flip. The board line's "project.yml says full" was written before T-0052 landed.

### 9.1 Read the deltas, not the totals

The host was loaded: load average 505 / 224 / 117 (1 / 5 / 15 min) at 8:10 AM, during the Release build, on 8 cores; 180 / 289 / 235 at 8:21 AM. Other sessions were building. "To entry" (process start to the bench's entry) was 2.0-3.6 s, against 0.3 s on 2026-10-25 (section 3) and 1.9-2.1 s on 11-02. That measures the machine. Compare rows with each other, and with section 3 only for memory and Python's own init.

### 9.2 Release against Debug (app, zip, 6 cold launches each, medians, max in brackets)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 9.2 Release against Debug (app, zip, 6 cold launches each, medians, max in…, scrolls sideways" data-n="2 7 8 9 10" style="--tw:902px" markdown="1">

| config | lazy | to entry ms | Py init ms | script ms | heavy ms | MB before | MB after init | MB peak | MB peak heavy | modules |
|---|---|---|---|---|---|---|---|---|---|---|
| Release | no | 2465.8 (3000.6) | 11.3 (24.0) | 27.9 (36.0) | 238.2 (256.5) | 6.9 | 9.8 | 11.5 | 20.3 | 63/218 |
| Release | yes | 2193.0 (2211.1) | 11.3 (12.2) | 25.8 (27.0) | 119.6 (128.2) | 6.9 | 9.8 | 11.2 | 17.6 | 59/153 |
| Debug | no | 2063.8 (3565.4) | 10.4 (26.6) | 23.0 (38.1) | 178.3 (269.8) | 7.0 | 9.9 | 11.6 | 20.3 | 63/218 |
| Debug | yes | 2242.8 (2373.2) | 10.8 (11.6) | 23.6 (27.5) | 113.9 (124.3) | 7.0 | 9.9 | 11.3 | 17.7 | 59/153 |

</div>


No errors in any of the 24 lines; every heavy import loaded.

- **Release changes nothing on the Python side**, as on 11-02. Init and memory are the same within noise (memory within 0.1 MB). The interpreter is the same prebuilt `Python.framework` in both; only our Swift compiles differently. Release's slower heavy set (238 against 178 ms) is not a Release cost: it is pure Python in the same framework, and the run-to-run spread on this host is wider than the gap (the Debug max is 270 ms). I don't claim either direction.
- **Lazy imports hold up**: the heavy set 238 -> 120 ms and 20.3 -> 17.6 MB peak (Release); 178 -> 114 ms and 20.3 -> 17.7 MB (Debug). On 11-02: 157 -> 96 ms, 20.2 -> 17.4 MB. The memory saving (2.6-2.7 MB) repeats; the times are slower today on both sides, which the load explains as well as anything in the app.
- **Memory before Python** is 6.9 MB (6.8 on 11-02, 5.1 on 10-25); peak after the heavy set 20.3 MB (20.2). The app's launch cost hasn't moved since 11-02.

### 9.3 Bundle (arm64 Simulator, zip; `du -sk`, MB = KiB/1024)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 9.3 Bundle (arm64 Simulator, zip; du -sk, MB = KiB/1024), scrolls sideways" data-n="2 3 4 5 6" style="--tw:763px" markdown="1">

| config | .app | python/ | Frameworks/ (52) | of which Python.framework | PlugIns/ | our binary |
|---|---|---|---|---|---|---|
| Release | 68.9 | 10.8 | 28.1 | 12.0 | 2.3 | `PyWidget` 12.7 |
| Debug | 85.9 | 10.8 | 28.1 | 12.0 | 7.4 | `PyWidget.debug.dylib` 24.2 |
| Release, 11-02 | 61.5 | 10.8 | 28.1 | 12.0 | 1.6 | `PyWidget` 7.3 |

</div>


- Python's part (`python/` and `Frameworks/`, 38.9 MB) is unchanged since 11-02. The Release app grew 7.4 MB in three weeks, all of it our code: the `PyWidget` binary 7.3 -> 12.7 MB and `PlugIns` 1.6 -> 2.3 MB. Since d5e3dc89, 294 commits touched `App/` and `Shared/` (T-0642's plain targets for the editor engine among them); which of them grew the binary is not broken down here.
- Not the App Store size: no thinning, no device slice, no archive. The figure the store page states comes from App Store Connect's own size report for an uploaded build (T-4192's Done-when), not from this table.

### 9.4 Frozen modules (A/B on `PyConfig.use_frozen_modules`)

Method as on 11-02: `frozen_probe.c`, a bare process (no UIKit, no SwiftUI) linked against the Release bundle's own `Python.framework`, started with `xcrun simctl spawn`. It initializes CPython as `Shared/PythonRuntime.swift` does (isolated config, the bundle's `python/` as home, no bytecode writes; checked unchanged at b52edd9c15) and changes one field, `use_frozen_modules`. Then it runs `App/Bench.swift`'s tiny and heavy scripts. 6 runs per setting, interleaved on/off. The probe reads the switch back by counting the modules whose `__spec__.origin` is `frozen`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 9.4 Frozen modules (A/B on PyConfig.use_frozen_modules), scrolls sideways" data-n="1 2 7 8 9 11" style="--tw:1092px" markdown="1">

| frozen | n | Py init ms | script ms | to result ms | heavy ms | MB after init | MB peak | MB peak heavy | frozen modules loaded (init/tiny/heavy) | frozen available |
|---|---|---|---|---|---|---|---|---|---|---|
| on | 6 | 9.4 (46.7) | 12.4 (37.5) | 239.4 (364.5) | 111.7 (292.1) | 6.8 | 8.0 | 16.9 | 14/15/21 | 29 |
| off | 6 | 11.0 (14.7) | 12.0 (13.9) | 233.3 (238.1) | 108.4 (112.5) | 6.9 | 8.1 | 17.0 | 3/3/5 | 3 |

</div>


- **Frozen modules save about 1.6 ms of init and nothing else measurable** (11-02: about 2 ms). Per-run init, on: 46.7 (the first run, first touch of the framework), 9.5, 9.3, 9.0, 13.6, 9.2; off: 14.7, 10.6, 11.7, 11.1, 11.0, 10.7. Script, heavy imports and memory are the same within noise and 0.1 MB. With the switch off, 3 modules stay frozen (the import system's bootstrap), which can't be turned off.
- **Is it on in the shipped app?** Still not read back from inside the app: `PythonRuntime.swift` doesn't set the field, so the app runs with CPython's default, which turns it off only for a run from a source tree [recalled, unchecked]. Setting `use_frozen_modules = 1` explicitly is a one-line change for about 2 ms; it can ride with the next change to `PythonRuntime.swift`, as 11-02 said.

### 9.5 What changes in the recommendation

Nothing in section 5. Release doesn't change the runtime's cost; frozen modules are a rounding error; zip is the default and has been since 10-27. The lever that moves time and memory is still the import set (lazy imports: about 60-120 ms and 2.6 MB on the heavy set). The bundle's growth since 11-02 is our own binary, not Python, so the next size work is there and in the device-thinned figure, not in the stdlib. Open: the device run (T-0008) and the store's own size figure for T-4192.
{% endraw %}

</div>
