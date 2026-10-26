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
Idris, 2026-10-25 (runs 19:29-20:07 ET). Board line "[build] Idris, P0, L3/L13 C1 spike". Simulator only (Apple membership pending; no device). Raw lines: `pywidget/ios/bench/*.txt`; table made by `pywidget/ios/scripts/summarize.py bench/*.txt`.

## 1. Result in four lines

- Upstream CPython 3.15.1 (python.org iOS XCframework, PEP 730) embeds through the C API and runs in the app and inside the WidgetKit extension process; the Home Screen widget shows the Python result (screenshot checked, 20:01).
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
- Earlier (19:31) the widget gallery's preview ran `getSnapshot` in an extension process whose footprint was 14.3 MB before Python and 27.9 MB after the heavy set. The gallery path is also a Python path and must obey the same limits.

## 4. Bundle sizes (Debug, simulator, fat arm64 + x86_64)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Bundle sizes (Debug, simulator, fat arm64 + x86_64), scrolls sideways" style="--tw:589px" markdown="1">

| stdlib mode | .app | python/ | Frameworks/ |
|---|---|---|---|
| full (upstream as shipped, includes the 174 MB test suite) | 270 MB | 237 MB | 32 MB |
| stripped (no test/idle/tk/turtle/ensurepip, no opt-1/opt-2 .pyc) | 58 MB | 25 MB | 32 MB |
| zip (stripped, then sourceless .pyc in python315.zip) | 45 MB | 12 MB | 32 MB |

</div>


- `Frameworks/` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> `Python.framework` (12 MB fat) and 68 extension-module frameworks. About 2.1 MB of them are CPython's own test modules (`_testcapi`, `_testinternalcapi`, `xxlimited` ...) and can be dropped.
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
- Frozen-modules measurement; a Release-build run.
- Execution ADR (ADR-003) and failure-mode spec, from section 5.
- Logged: CPython 3.15.1 iOS XCframework and the libraries linked into its modules in `log/software.md`.
{% endraw %}

</div>
