---
layout: "default"
title: "ADR-007: Widget execution architecture. Python runs in the app; the extension only renders (option b), with the hybrid (c) gated on device\u2026"
section: "documents"
description: "This is ADR-001&#x27;s default, confirmed by measurement rather than assumed. The one change from ADR-001&#x27;s wording: &quot;the extension only renders&quot; now also covers the gallery snapshot and placeholder paths, which the spike\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-007-execution-architecture.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/decisions/ADR-007-execution-architecture.md</code></span></div><h1>ADR-007: Widget execution architecture. Python runs in the app; the extension only renders (option b), with the hybrid (c) gated on device…</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **accepted** for v1 (Ines, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-25 21:08 ET, at the end: option (b), amendments A1-A3; C2-Q1 approved narrowed as a 1.0 stretch by Day 13; 7.4 closes state-spec s1). Proposed by Idris 20:12 ET, amended 20:28 ET after Odalys's review ("Changes after review"). Option (c) stays off: it opens only when gates <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 (section 6) pass on a device, in a new ADR line.
- Author: Idris. Numbers are from my own spike, pywidget/docs/research/L3-runtime-spike.md (edbcb42c), Simulator only. Every figure not measured there is marked **[recalled]** or **unmeasured**.
- Inputs: ops/plans/pywidget/build-brief.md L3 (options a-e, failure behaviour), ADR-001 3.1 (C4, "default unless ADR-002 says otherwise"), ADR-002 (view tree: `timeline`, `sampled_at`, `stale_after`, reload policy), L2-refresh-budget.md (triggers and budget), L4-view-dsl.md s8 (stale rule), Maren's pywidget/docs/design/states/state-spec.md s1 (state priority) with Ines's chair ruling there (2026-10-25 20:08, Pro card), C2-device-api.md s7 (C2-Q1), panel note on restart (board line C1, 19:55).

## 0. Numbering

ADR-001 and the board line "[plan] Idris, P0, ADR-002 widget execution architecture" call this document ADR-002. ADR-002 is now the widget view tree (L4), and the plan (ops/plans/pywidget/plan.md row 6) reserves ADR-003 for packages. ADR-004 (editor), 005 (compat corpus) and 006 (marketplace staging) are taken. This is **ADR-007**. Wherever ADR-001 says "ADR-002 (execution architecture)" read ADR-007; a CORRECTIONS row records it. I do not edit ADR-001 (Ines's file).

## 1. Context

A pywidget widget is a Python script that returns a view tree (ADR-002). Something has to run that script, and the only two processes we own on the phone are the app and the WidgetKit extension. The extension has a small memory allowance ("about 30 MB is widely reported" per the brief; **unmeasured** on device, the Simulator enforces none) and must return from `getTimeline` promptly. The app has the full runtime and no tight ceiling, but it is not running when the system asks for a timeline.

The brief's L3 asks for a choice among five options, a benchmark table, and a failure-mode spec. ADR-001 set option (b) as the default "unless ADR-002 says otherwise". The spike measured what (a) and (c) would cost. This ADR decides.

The IDE is out of scope: scripts run in the app with the full runtime whatever this ADR says (brief L3 scope note).

## 2. Benchmark table (spike, Simulator, Debug, iPhone 17e / iOS 27.0; medians of n, max in brackets)

Times in ms, memory in MB (`phys_footprint`, the number jetsam enforces). "tiny" = `json, datetime, math`, 63 modules; "heavy" = json, urllib, ssl, sqlite3, decimal, statistics, re, zoneinfo, csv, asyncio, 218 modules. Full table and method: L3-runtime-spike.md s2-s3.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Benchmark table (spike, Simulator, Debug, iPhone 17e / iOS 27.0; medians of…, scrolls sideways" data-n="2 3 4" style="--tw:1276px" markdown="1">

| Process | stdlib | lazy | n | start to probe | Py init | tiny script | MB before Python | MB peak tiny | heavy imports | MB peak heavy |
|---|---|---|---|---|---|---|---|---|---|---|
| app | zip | no | 6 | 291 (315) | 12.8 (23.7) | 14.3 (26.5) | 5.1 | 9.8 | 106.5 (191.6) | 18.5 |
| app | zip | yes | 6 | 302 (309) | 13.1 (24.9) | 13.9 (27.1) | 5.1 | 9.7 | 73.0 (115.0) | 16.0 |
| extension, cold | full | no | 6 | 352 (378) | 7.9 (8.6) | 14.2 (22.3) | 7.7 | 11.9 | 104.5 (177.7) | 21.6 |
| extension, cold | zip | no | 6 | 346 (658) | 9.3 (11.2) | 14.8 (28.0) | 7.7 (14.3) | 12.1 (18.4) | 110.5 (191.7) | 20.7 (26.8) |
| extension, cold | zip | yes | 5 | 360 (367) | 9.2 (9.4) | 14.4 (15.1) | 7.7 | 11.9 | 73.9 (77.7) | 18.2 |
| extension, warm (second call, same process) | zip | yes | 1 | (4,029) | 0 | 0.3 | 26.8 | 26.9 | 0.2 | 26.9 |
| extension, gallery `getSnapshot` (19:31, one observation) | full | no | 1 | - | - | - | 14.3 | - | - | 27.9 |

</div>


Bundle: `python/` 237 MB full, 25 MB stripped, 12 MB zipped; `Frameworks/` 32 MB fat, of which 2.1 MB are CPython test modules to drop. Zip costs nothing measurable in time or memory.

What the table says, in order of weight:
1. Python itself is cheap in the extension: +23 ms on a ~375 ms cold start, +4 MB on a 7.7 MB baseline. Time is not the problem.
2. Memory accumulates. One interpreter per process, never finalized: after one heavy run the extension sits at 27-28 MB and stays there for the next call. The gallery's snapshot process starts at 14.3 MB before Python. Both are within a few MB of a ceiling we have not measured.
3. The ceiling is the unknown. `os_proc_available_memory()` returned 0 in every Simulator run. Nothing in the table proves an extension run survives on a phone.

## 3. Options (brief L3 a-e)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Options (brief L3 a-e), scrolls sideways" style="--tw:1280px" markdown="1">

| Option | What it is | Measured | Verdict |
|---|---|---|---|
| (a) Python in the extension, minimal runtime | Extension links Python.framework and runs the script inside `getTimeline` | tiny 11.9 MB peak; heavy 21.6; warm 27-28; snapshot path 27.9 | Not as the only path. Freshest, but a heavy script or two widgets in one process sits at the recalled ceiling, and a jetsam <span title="A test written in advance. If it fires, we drop the idea.">kill</span> shows the user a blank or placeholder widget with no error we can see. Also means every widget bug is a crash in a process we cannot attach to on a customer's phone. |
| (b) Python in the app; extension renders a cached tree from the App Group | App runs widgets on foreground, BGAppRefresh and intents; writes `tree.json`; extension decodes and draws | app heavy 18.5 MB peak against no tight ceiling; extension 7.7 MB with Python.xcframework linked but not initialized; the v1 extension with no Python linked is **unmeasured** (7.7 is likely an upper bound) | **Chosen for v1.** Cost is freshness, bounded by the L2 budget and by the stale mark; the view tree's `sampled_at`/`stale_after` already make that cost visible to the user. |
| (c) Hybrid: allowlisted light scripts in the extension, the rest in the app | Static import scan at save time picks the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>; runtime guard demotes to (b) | tiny set 12 MB peak (cold); lazy imports cut heavy peak by 2.5 MB (zip vs zip + lazy, app and extension) | **Built on the same runtime behind a flag, off in v1.** Gated on device numbers (section 6, G1-G3). Until the ceiling is measured it is a guess about headroom. |
| (d) Opt-in cloud execution | A server runs network-only widgets | not measured | **No.** Needs a server (spending and sign-ups are the Investors'), cannot read sensors, moves scripts and data off the phone (privacy label and App Review change). Not v1; not proposed for 1.1 either. |
| (e) Alternative interpreter or compile strategy | MicroPython, RustPython, AOT; inside CPython: lazy imports, frozen modules | PEP 810 lazy imports: heavy 110 -> 74 ms, peak -2.5 MB (18.5 -> 16.0 app, 20.7 -> 18.2 extension), no import errors. Frozen modules unmeasured (follow-up line). Other interpreters unmeasured | **Lazy imports on in both processes** (`-X lazy_imports=all` equivalent in `PyConfig`), measured, free. No alternative interpreter: their compatibility cost (missing stdlib, no C-API packages) is certain and the numbers give no reason to pay it. |

</div>


## 4. Decision

1. **v1 is option (b).** The widget extension links neither Python.framework nor the stdlib. It decodes `widgets/<id>/tree.json` from the App Group and renders it. The extension never runs user code, in `getTimeline`, `getSnapshot` or `placeholder`.
2. **Every Python run of a widget happens in the app process** through one `PythonRuntime` (one interpreter per process, the bridge contract's script thread, 8.1), on the triggers in section 5. Lazy imports on. The output is written atomically (temp file + rename) only on success; a failed run never touches the last good tree.
3. **Option (c) is designed in, switched off.** The runtime, the allowlist scan, the run marker and the demotion rule are specified here so that (c) is a flag flip plus the extension linking the framework, not a rewrite. The flag opens only when the device gates in section 6 pass; that is a 1.1 decision at the earliest, recorded in a new ADR line, not silently.
4. **The IDE runtime is untouched** by any widget limit.

This is ADR-001's default, confirmed by measurement rather than assumed. The one change from ADR-001's wording: "the extension only renders" now also covers the gallery snapshot and placeholder paths, which the spike showed are Python paths too if we let them be.

## 5. How a widget run is triggered, and what runs where

### 5.1 Triggers (all run Python in the app)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 5.1 Triggers (all run Python in the app), scrolls sideways" data-n="1" style="--tw:1640px" markdown="1">

| # | Trigger | Where it fires | What runs | Reload call | Budget (L2) |
|---|---|---|---|---|---|
| <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> | Foreground sweep | app becomes active; IDE saves a widget script; a premade is added or configured | all placed widgets in one batched run, changed ones first | `reloadAllTimelines()` once, from the active scene (a call from `App.init` never reached the extension in the spike [observed, unlogged: not in L3-runtime-spike.md; the next renderer task logs it]) | free: foreground reloads are exempt [recalled] |
| T2 | Background refresh | `BGAppRefreshTask`, identifier `com.pywidget.refresh`, rescheduled after every run at the smallest requested interval, never under 15 min | batched run under the batch rule below (worst-case end 25 s against the task's limit of about 30 s [recalled]); an **expiration handler** is set before the first run (5.3) | `reloadTimelines(ofKind:)` only for widgets whose tree hash changed | counts; one reload per changed widget |
| T3 | App Intent `Refresh Widgets` (Shortcuts automation: time of day, arrival, alarm off, Focus change) | intent handler in the app process, no scene | the named widgets, or all; same batch rule as T2 (the intent limit is also about 30 s [recalled], L9 line 42) | as T2 | counts [recalled; L2 measure item] |
| T4 | App Intents `Run Script`, `Run Script with Input` | app process | the script, `budget_s = 20` (contract S4); if it is a widget script, its tree is written too | as T2 | as T3 |
| T5 | Widget action intent (1.1, L5) | app process **on iOS 27+ only** (`allowedExecutionTargets = [.main]`); on iOS 18-26 the app runs a handler only after a signed action link opens it, or from the queue at the next T1-T3; state ops run in the extension (corrected 2026-10-26 by Idris: L5-interactivity.md s0, s4) | the widget's handler, then `render(state)` | none on 27+ (the system reloads after `perform()` [recalled]); `reloadTimelines(ofKind:)` from the foreground on 18-26 | not charged for the post-intent reload [recalled; L5 gate G-L5-2] |
| T6 | WidgetKit asks the extension for a timeline (`getTimeline`) | extension | **no Python.** Reads `tree.json` and `status.json`; if `tree.json` is missing, writes `widgets/<id>/wants-run` and returns the error card | none (it is the reload) | the system's own schedule |
| T7 | Location wake, push reload | app (significant change needs Always; push needs a server) | - | - | **not v1** (ADR-001; push also L2 s2 item 6; citation corrected 2026-10-26, CORRECTIONS U1-06) |

</div>


**Batch rule (T2, T3), from the contract's stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (bridge-contract.md s5).** A widget run with `budget_s` is stopped by the ladder when its budget runs out: interrupt + SIGURG wake at 0, repeated every 250 ms, hard stop at 2.0 s, deadline `stopDeadlineSeconds = 5.0` s, then `stuck`. So a widget's worst case is `budget_s + 5.0` s. A batch starts the next widget only if `elapsed + budget_s + 5.0 <= 25 s`; otherwise that widget and the rest are left for the next trigger (outcome `deferred`, no badge, stale clock applies, `wants-run` kept). With the default `budget_s = 5`, the worst case per widget is 10 s and the batch ends, stuck or not, by 25 s, leaving 5 s for the last atomic write, the reload calls and `setTaskCompleted` (T2) or the intent's return (T3). The manifest <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> of 20 s keeps any one widget inside 25 s when it runs first; a widget deferred twice in a row for lack of time runs first in the next batch.

**Runs queue behind the IDE.** The interpreter is shared (contract Q1, queue-then-busy): a widget run waits behind a console run, and a T2/T3 batch that finds a console run in progress defers every widget (`deferred`). A console script's monkeypatch to a stdlib or bundled module stays in place for later widget runs until quit (contract s6, Kept); the Restart help text says so.

`wants-run` is honoured by the next T1-T4 run. The widget's `reload_policy` (ADR-002, mirrors `TimelineReloadPolicy`) tells WidgetKit when to come back; default `.atEnd`; a widget that requests `after(date)` gets the date clamped to the L2 estimator's expected interval so we do not ask for reloads the budget will refuse.

### 5.2 What runs where


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 5.2 What runs where, scrolls sideways" style="--tw:640px" markdown="1">

| Extension (no Python linked) | App |
|---|---|
| View-tree decoder and SwiftUI interpreter (ADR-002), all families and modes | CPython 3.15.1, the bridge (section 8), every widget and script run |
| State precedence (section 7.1) from `tree.json` + `status.json` + `entitlement.json` + tree `version` | Writes `tree.json`, `status.json`, `entitlement.json` (StoreKit, Pro purchase line), the Activity log rows (L2 s3.3) |
| Timeline construction: entries from the tree, badge flag, the synthetic stale entry (7.4) | Scheduling T2; the L2 estimator |
| `getSnapshot`/`placeholder`: last good tree, else the premade's bundled preview tree, else the renderer's placeholder; never a run | Premade gallery previews (real runs on the user's data, chair ruling item 1) |
| App Intent entity query for the widget picker (reads `widgets/index.json`; Pro premades only with the entitlement, chair ruling item 2) | Keeps `widgets/index.json` current |
| C2-Q1 Swift-only location fix, if the chair approves (section 9) | Reads that fix as `source="refresh"` on the next run |

</div>


App Group layout (one container, `group.<bundle>.shared`): `widgets/index.json`; `widgets/<id>/tree.json`, `status.json`, `wants-run`, `render-fault.json`, `state.json` (1.1); `entitlement.json`; `location/last.json` (C2); `log/runs.jsonl` (L2 s3.3, 14 days). Everything the extension reads is a file written atomically by the app, so a half-written file is never seen. (Amended 2026-10-26 for 1.1, chair amendment at the end: the extension also writes `state.json` and `actions.jsonl` under a lock; v1 unchanged.) The in-flight run marker is the contract's crash marker in the app's Caches (contract s7), not an App Group file: under (b) only the app needs it. One marker for one event (review S11 gap c); the (c) lane will need an App Group marker of its own and its ADR line names it.

### 5.3 Background expiry and the stuck state (T2, T3)

- **Expiration handler (T2).** Set on the `BGAppRefreshTask` before the first run. When iOS calls it: `stop(run_id)` on the run in flight, write `status.json` `last_outcome=expired` for that widget and `deferred` for the rest (neither sets the badge; both are our scheduling, not the script), append `backgrounded` to the crash marker (contract s7), reschedule the task, and call `setTaskCompleted(success: false)` **at once**, without waiting for the 5.0 s deadline. The run in flight is **stopped, not resumed**: if the app is suspended before it unwinds, the pending stop lands when the app next runs, and the run row is `expired`. `expired` never counts toward the loop breaker (7.2 `killed`), so a healthy widget is never demoted for our own scheduling.
- **Stuck (B1).** One interpreter, one script thread (contract s1-s2): a run that passes the 5.0 s deadline <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the only interpreter, so nothing can be abandoned and nothing else can run. When the bridge reports `stuck` during a batch: the stuck widget's `status.json` gets `last_outcome=stuck` (badge on the last good render, 7.1 row 4); the batch ends at once; every remaining widget gets `deferred` (no badge, stale clock) and keeps `wants-run`; T2 calls `setTaskCompleted(success: false)` and reschedules; T3 returns the intent error "Python is busy in PyWidget. Open the app to continue." From then on every run, Restart, widget trigger and Shortcut refuses with `stuck` (contract s5); T1 shows the contract's console banner ("Quit and reopen PyWidget to run Python again. Your files are saved."). The app never quits itself.
- **Recovery.** Either the thread returns (`unstuck`, contract s5): the state clears and the next trigger runs the deferred widgets first; or the process ends (the user quits, or iOS terminates the suspended app): the next launch finds the crash marker, records the stuck widget as `stuck` (not `killed`), and T1 runs normally in the new interpreter. A widget that ends `stuck` or `killed` twice in a row on a background trigger gets `background=false` (7.2 loop breaker); `expired` and `deferred` never count.

## 6. Memory budget, margin, and what happens when the device numbers differ

Three unknowns, not one (review S3):
- **C**, the extension's memory ceiling on the oldest supported phone. Until the board line "L3 device run" lands, C = 30 MB **[recalled]**; it may differ by device class [recalled, unverified].
- **A**, the app's memory limit as a background process (T2, T3). **[recalled]**, no number assumed.
- **B**, the v1 extension's render-path baseline (no Python linked, decoder and SwiftUI interpreter loaded, before a tree is decoded). **Unmeasured.** The spike's 7.7 MB and 14.3 MB are Python-linked processes (review S2), so they are upper bounds at best; the first renderer task measures B in the Simulator (open item 2) and the device run measures it on a phone.

The runtime rules below read the process's own headroom with `os_proc_available_memory()` and one margin rule; none of them compiles in C or A. C is a **design-time input only**: it sets the ADR-002 schema caps (node count, image bytes, entries per timeline) so that B + tree cost stays well under it. When the device run lands, the caps change; the runtime rules do not.

**One margin rule:** a run or a render starts only if available headroom >= 2 x its last measured peak above baseline (first run of a widget: 2 x 13.4 MB, the spike's heavy run above its 5.1 MB baseline, i.e. 27 MB). The same rule serves the app, the render path and the (c) lane.

**Simulator fallback:** `os_proc_available_memory()` returns 0 on the Simulator (spike). A 0 is read as "unknown", not "none": the check passes and the run row records `headroom=unknown`. A unit test drives the rule with a stubbed headroom source (0, below, at and above the margin) so the device path is tested before a device exists.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 6. Memory budget, margin, and what happens when the device numbers differ, scrolls sideways" style="--tw:1201px" markdown="1">

| Process and path | Rule | Measured (Simulator) | When it fails |
|---|---|---|---|
| Extension, render path (v1) | decode, then render only if headroom >= 2 x the render cost measured for this widget's last tree (first render: 2 x the fixture tree cost the renderer task measures). Render cost = footprint after the SwiftUI render, not after decode (review S8c) | B unmeasured; fixture tree cost unmeasured | error card with reason `tree_too_large` (7.2) |
| Extension, gallery snapshot | same rule; the snapshot never runs Python in v1 | 14.3 MB before Python on one Python-linked observation (S5); v1 value unmeasured | same |
| Extension, (c) lane (flag, off) | the margin rule, counting the warm residue; heavy imports never allowed | tiny 12 MB cold; warm residue 27 MB after heavy | demotion, 7.2 |
| App, widget batch (T2, T3) | the margin rule per widget at its start; no batch total (the batch rule in 5.1 bounds time, A bounds memory and is read, not assumed) | heavy 18.5 MB peak cold (16.0 lazy) on a 5.1 MB baseline; the real app's baseline is higher and unmeasured | widget outcome `oom_guard`, skipped, no badge; batch continues with smaller widgets |
| App, T1 and IDE | no check (foreground) | - | - |

</div>


Gates for opening the (c) flag (all on device, Release, oldest supported phone, n >= 6):
- G1: C and B measured; the allowlisted tiny run's cold peak + B <= 0.5 C.
- G2: two widgets in one warm extension process after their runs <= 0.6 C.
- G3: the demotion path (7.2) exercised by a deliberate over-allocation and seen in the Activity log as `killed` (or `oom_guard`) -> lane `app`. (Under jetsam the process cannot tell "out of memory" from other kills; the marker without `backgrounded` is the evidence.)
If C on device comes in under 2 x (B + the measured render cost of the largest premade), (c) is dropped from the roadmap, not just gated, and this ADR gets a line saying so.

## 7. Failure-mode spec

Aligned with state-spec.md s1 (Maren) and the chair ruling of 20:08 (Pro card). Precedence, first match wins, evaluated by the renderer at each timeline entry:

### 7.1 Precedence


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 7.1 Precedence, scrolls sideways" data-n="1" style="--tw:781px" markdown="1">

| # | State | Source of truth in the App Group | Shows |
|---|---|---|---|
| 1 | Update card | `tree.json` `version` is not one this renderer reads (newer or unsupported older; state-spec s1 wording) | card (never a run) |
| 2 | Pro card | the widget is a Pro premade (`index.json`) and `entitlement.json` lacks its entitlement **or is missing** (a missing file means no entitlement: restore on a new device not yet run, ruling item 3) | card; the app has stopped writing this widget's timeline and has reloaded it (7.2 `entitlement_lost`) |
| 3 | Error card | no `tree.json` for this id (never a good render): "Script error", line, "Tap to open". Or `render-fault.json` says `tree_too_large`: a separate copy variant (the script did nothing wrong; copy is Maren's, board follow-up) | card |
| 4 | Error badge | `status.json` `last_outcome` in {`error`, `timeout`, `stuck`, `killed`} and `tree.json` exists | last good render + badge |
| 5 | Stale mark | the entry is at or after `sampled_at + stale_after` (ADR-002; absent `stale_after` means never stale, as the shipped DSL, 7.4) | last good render + clock |
| - | Normal | otherwise (`oom_guard`, `expired`, `deferred` set no badge) | the entry's view |

</div>


Never a blank widget. The traceback never leaves `status.json` and the Activity screen; the card shows exception type and file only on Home Screen medium and larger, line number only on the Lock Screen (state-spec s3, tested by `check_states.py`).

### 7.2 Outcomes and what each does

`status.json` outcomes are decided by Swift. The bridge reports `bridge-outcome/1` `status` (contract s7); the mapping (contract s11 A4) is: `ok`, and `exit` with code 0 and a tree -> `ok`; `error`, `syntax_error`, `internal_error`, `exit` with a non-zero code, and `exit` 0 **without** a tree -> `error` (type `SystemExit`, `NoTree`, `SyntaxError` or `InternalError` as the bridge reports); `interrupted` after a budget stop Swift sent -> `timeout`; the bridge's `stuck` status -> `stuck`. `oom_guard`, `killed`, `expired`, `deferred`, `entitlement_lost` and `tree_too_large` never reach Python.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 7.2 Outcomes and what each does, scrolls sideways" style="--tw:1600px" markdown="1">

| Outcome | How it is detected | App Group effect | Widget shows | Then |
|---|---|---|---|---|
| `ok` | `finished` with a `widget_tree` record that validates against the schema (8.3) | `tree.json` replaced atomically; `status.json` `last_outcome=ok`, `failing_since` cleared | normal | - |
| `error` | as mapped above, or the tree fails schema validation (`schema_error`, line = the `render` call) | `status.json`: outcome, exception type, file, line, `failing_since` (first failure in the streak), traceback (contract s8 `error`, mapped as contract s11 A7) | badge (or error card if no tree yet) | widget stays scheduled |
| `timeout` | `budget_s` ran out (default 5 s; manifest up to 20 s; Shortcut 20 s) and the stop ladder ended the run before the 5.0 s deadline | as `error`, type `TimeoutError`, line = the frame executing at interrupt | badge | next widget in the batch, if the batch rule (5.1) allows |
| `stuck` | the run passed the 5.0 s deadline (contract s5) | `status.json` outcome `stuck`, the frame if known | badge | batch ends; 5.3 |
| `expired` | the T2 expiration handler fired during this widget's run | `status.json` `last_outcome=expired`; run row `expired` | no badge; stale clock | 5.3; not a loop-breaker count |
| `deferred` | not started: batch time (5.1), a console run in progress, or a stuck run | `status.json` unchanged except `deferred_since`; `wants-run` kept | no badge; stale clock | runs first on the next trigger |
| `oom_guard` | headroom under the margin rule (6) at run start (background only) | `status.json` outcome `oom_guard`; widget not run this batch | no badge (nothing failed in the script); stale clock | run again on T1 (foreground, no check) |
| `killed` | the contract's crash marker (Caches, contract s7) exists at launch with no `finished`; the marker names the run's `run_id`, Swift's job record gives widget id and trigger | outcome `killed`; with `backgrounded` in the marker the Activity row says "iOS closed PyWidget in the background", without it "closed while it ran, possibly out of memory" (contract s7 copy) | badge, VoiceOver "Last run was stopped" | after 2 consecutive `killed` or `stuck` on background triggers the widget gets `background=false` in `index.json` and runs only on T1 until a T1 run succeeds, then `background` is restored. The one loop breaker. A `killed` with `backgrounded` that followed an `expired` is not counted |
| `entitlement_lost` | the app sees the entitlement go (StoreKit `Transaction.updates`, or the launch check of current entitlements) | `entitlement.json` rewritten without it; the app stops writing Pro widgets' timelines and calls `reloadTimelines(ofKind:)` for each Pro kind at once | Pro card (7.1 row 2) | restored the same way when the entitlement returns |
| `tree_too_large` (renderer) | the render rule in section 6 fails | the extension writes `widgets/<id>/render-fault.json` (`status.json` is the app's) | error card, `tree_too_large` variant. No older tree is kept in the App Group, so there is no "smaller good tree" to fall back to | app reads the fault on next launch, logs a run row, shows it in Activity |
| (c) lane only: extension run fails, times out or is killed | same markers, in the extension | `lane=app` written to `index.json` by whichever process finds the marker | last good render + badge | the widget never returns to the extension lane without a successful foreground run and the user's confirmation in Activity |

</div>


**Entitlement lag (S7).** A refund or revocation reaches the app only when it runs: `Transaction.updates` delivers while the app is running, and the launch check catches the rest [recalled, browser read open]. Until then the extension keeps showing Pro content from entries already written. The app therefore writes Pro widgets' timelines no further than 24 h ahead, so the lag is at most the time to the next app run or 24 h, whichever comes first.

### 7.3 Timeout mechanics (app side)

Each widget runs on the contract's script thread (8.1) with `budget_s`. When the budget runs out Swift calls `stop(run_id)` and the contract's ladder (s5) runs: interrupt + SIGURG wake at 0, repeated every 250 ms; hard stop through `sys.monitoring` at 2.0 s; deadline at 5.0 s. Bytecode stops at the next boundary. `time.sleep`, `select`, socket reads and lock waits are woken by SIGURG and stop at the next `EINTR` (0.24-0.25 s on host, contract probe I1), not when they return. Only a C call that holds the GIL and never checks signals can outlast the ladder; that is `stuck` (5.3), never "abandon and move on": with one interpreter and one script thread there is nothing to move on to. Every network call the stdlib wrapper (L8) makes still carries its own socket timeout of min(remaining, 10 s), as defence in depth. The Activity screen shows the duration and the frame.

### 7.4 Timeline construction and the stale entry

The provider turns `tree.json`'s `timeline.entries` into `TimelineEntry`s in date order, dropping entries older than now except the newest past one (so the widget always has a current entry). Each entry carries the badge flag from `status.json`. Then, **answering Maren's s1 question**: let T = `sampled_at + stale_after`. If T is already past, the current entry is stale from the start. Otherwise the provider inserts one synthetic entry at T **wherever T falls**, cloning the view of the entry before it, with `stale = true`; every entry at or after T is stale too (review S9: with entries at 0 and 60 min and `stale_after` 30 min, the mark now appears at 30 min, not 60). Without this entry the stale mark would wait for the next reload, which is exactly when it is least likely to come.

**Absent `stale_after` means never stale** (review S10). That is what the shipped DSL does (`pywidget_ui` `Timeline.stale_at` is None, `is_stale` False), so a script branching on `When("stale", True)` and the renderer's clock agree. The 30-minute figure of L1 rule c becomes a default the premades and the `pywidget` device modules' templates set explicitly, not a renderer default. One fixture (a two-entry timeline with T between them, and the same with `stale_after` absent) is tested by the DSL suite and the renderer's state tests. Reload policy: the tree's, default `.atEnd`, clamped as in 5.1.

### 7.5 Logging

Every run (any trigger, any outcome) appends one row to `log/runs.jsonl` with the L2 s3.3 columns (`ts`, kind, id, trigger, duration ms, peak MB, outcome, sensors), plus `run_id` and `headroom` (MB at start, or `unknown`). Trigger and peak MB are Swift's: the trigger from its job record keyed by `run_id`, peak MB from `phys_footprint` sampled by `task_info` around the run (contract s11 A2, A8); duration from the contract's `duration_s`. 14 days, export by share sheet only (PROPOSAL-002 s5). That row set is also the device evidence for section 6's gates.

## 8. Runtime and bridge: restart rule and interface

The bridge contract, pywidget/docs/design/bridge-contract.md (Pernille, v2 ebca07ba, with Idris's review S1-S6 binding), is this ADR's interface. Its names and rules win; this section only adds what is ADR-specific.

### 8.1 One interpreter per process

`Py_InitializeFromConfig` once; never `Py_FinalizeEx`. CPython cannot be finalized and re-initialized safely once numpy or any module with static state has loaded (panel note, 19:55). Every run, widget or console, executes on the contract's **script thread** (contract s2, S1): one dedicated pthread created before any `PyConfig_*` call, Python's main thread, with all of `start()` on it; a stop thread and a tooling thread beside it; the main thread never in the C API. Not a GCD serial queue: a queue does not pin a thread, so signal handlers would not run on it (contract s0 item 3, s11 A14).

### 8.2 Restart rule: clear user modules, keep the interpreter

The rule is contract s6, and it replaces the five steps this section had (review S11). In short: every run starts with a reset on the script thread with the GIL; `restart()` is the same reset without a run, plus the stop; it is refused while `stuck`. Cleared: `__main__`; every `sys.modules` entry not present at bootstrap and not inside the app bundle; `sys.path`, `sys.argv`, `os.environ`, cwd and the other process settings listed there; user changes to `builtins`; signal handlers (SIGURG via `rearm_wake`); root `logging` handlers; `atexit` callbacks (run, then cleared); then `gc.collect()`. Kept: the interpreter, every bundle module in whatever state the user left it, the same `sys.stdin/stdout/stderr` objects, and threads (a run ends only when its non-daemon threads finish; threads alive after the deadline are counted in `background_threads`).

ADR-specific: widget runs get the reset at the start of each run like any other run, so one widget's modules never shadow another's. Stdlib modules a widget imported stay resident; that is the accumulation measured in the warm row and is accepted in the app (no tight ceiling), and the reason heavy imports are never allowed in the (c) lane. Closing file handles and sockets the `pywidget` package hands out is **not v1**: the package does not track them, and the contract does not close them (s11 A18). A leaked handle lives until quit; revisit if the run rows show it.

### 8.3 The bridge contract as this ADR's interface

Names from contract s3 and s7, replacing this section's draft names (s11 A1-A11):

- `run(RunRequest{run_id, source: .file(URL) | .text(String, name), argv, cwd, stdin: .interactive | .preset | .none, context: .app | .widget | .shortcut, budget_s})` -> `RunHandle(run_id)`. Widget runs use `context: .widget`, `stdin: .none` (`input()` raises `EOFError`), `budget_s` from the manifest. The trigger is not a bridge field; Swift keeps it in its job record keyed by `run_id`.
- Output streams as records (`stdout`, `stderr`, `status`, ...) with `seq`; Swift assembles them. The run's last record is `finished` with `bridge-outcome/1` (`status`, `duration_s`, `background_threads`, `error` with contract s8 frames). Section 7.2 maps `status` to the widget outcome.
- **Widget tree channel (contract s11 A5, the gap this ADR owned):** a `widget_tree` record kind, emitted once by the widget runner before `finished`, payload the ADR-002 serializer's JSON (`pywidget_ui` v1); `finished` carries its `seq` as `tree_seq` (null for non-widget runs and for widget runs that produced no tree). A record, not an outcome field, so the tree is streamed and size-capped like any other record, and an `exit` before `render()` is visibly "no tree". Swift validates it against `viewtree.schema.json` and writes `tree.json` atomically only on `ok`. Pernille adds the kind in contract v3 (board follow-up).
- `stop(run_id)`: run-scoped and idempotent; a late Stop never hits the next run.
- `restart() async -> RestartReport{cleared_modules, background_threads, stuck}`.
- `peak_mb` is not a bridge field; Swift measures it (7.5).
- `set_lane(widget_id, lane)` is not a bridge call; the lane lives in `index.json`.
- Widget-mode guarantees the Python side keeps: `render()` returns a serializable tree, no `input()`, no UI calls, device modules follow C2's context matrix (`LiveOnlyInWidget` etc.).

## 9. C2-Q1: a Swift-only location fix in the widget extension (recommendation for the chair)

The question (C2-device-api.md s7): under option (b), a background Python run with When In Use gets no fresh fix; `location.sample()` returns the app's cache. The extension, however, may take a one-shot fix when `isAuthorizedForWidgetUpdates` is true ("if called upon to refresh within a few minutes of having been seen", CLLocationManager.h, [SDK]). A Swift-only step in the provider could take it and write `location/last.json` with `source="refresh"`, for the next Python run to read. The premade "distance to a saved place" (ADR-001 C11) is the first user.

What it costs: `NSWidgetWantsLocation` in the extension's Info.plist; CoreLocation linked in the extension (memory **unmeasured**; expected small, Simulator follow-up line); one code path in the provider (request, wait at most 3 s inside `getTimeline`, write, continue with the cached tree); the fix is used by the **next** run, so the widget's number updates one run later, not at this reload. It does not change the privacy label (location is already When In Use for the app; the usage string covers it) [recalled; Wrenna's matrix row to confirm]. It stays inside this ADR's rule: no Python in the extension.

Recommendation: **approve, narrowed.** Only widgets whose manifest declares `location` (C2 context matrix) trigger the request; the provider skips it when `isAuthorizedForWidgetUpdates` is false or the cached fix is younger than the widget's `max_age`; the written fix carries `sampled_at` so the Python side applies the same `stale_after` honesty. Ship it in 1.0 only if the distance premade is among the 8 the Day 14 cut line needs (ADR-001 3.3); otherwise 1.1. Without it that premade is honest but usually old, which is the state Maren's stale mark was drawn for, so nothing breaks either way. The chair decides; the device modules spec (C2 s7) then gets its `source="refresh"` row confirmed.

## 10. Consequences

- The extension is small (320 KB `.appex` in the spike) and cannot crash on user code. Widget bugs are app-side runs with full tracebacks in Activity.
- Freshness is the L2 budget's: 40-70 reloads a day for a frequently viewed widget [recalled], with T1 free. A widget that wants minute-level data gets the stale mark, by design.
- The renderer and the app must agree on file formats through the schema (`viewtree.schema.json`) and the two small JSON files in section 5.2; a test fixture per state in 7.1 belongs to the first renderer task.
- (c) stays possible without rework: the allowlist scan and the lane field are built now, cheap, and off.
- The Pro card (ruling item 3) needs no run and no Python: the app stops writing and the extension reads one flag file; the app reloads Pro kinds when the entitlement changes (7.2 `entitlement_lost`).
- The IDE and widgets share one interpreter: widget runs queue behind console runs, a console script's monkeypatch to a bundled module persists until quit, and a stuck console script stops widget runs until it returns or the app is quit (5.1, 5.3). 4.4 holds for limits, not for the interpreter's state.

## 11. Risks

1. **The ceiling is still recalled.** Section 6 is written against C so the device run changes a constant; if C is far lower than 30 MB the render path itself needs the cap in 6, and that is a schema limit, not an architecture change.
2. **Background runs on a phone are slower than the Simulator** (cold file cache, CPU). The 5 s default per widget may need to rise; the run rows will show it.
3. **Extensions loading Python from the containing app** is unneeded under (b) in v1 (nothing to load), which removes spike risk 5 from the v1 path; it returns with (c).
4. **BGAppRefresh is not guaranteed** [recalled]; the Shortcuts automation (T3) is the user's own lever, and the premade library should ship one "refresh my widgets at 7:00" shortcut example.
5. **A stuck run costs every widget its background freshness until the app is quit.** One interpreter (8.1) makes this unavoidable; 5.3 bounds it to a badge on one widget and the stale clock on the rest, never a blank widget or a demoted healthy widget.
6. **The 25 s batch end is against a [recalled] 30 s limit.** If the device shows less, the batch rule's 25 changes; the expiration handler covers the gap either way.

## 12. Open (for Odalys's review and Ines's chair line)

1. Device run: C, A, B, cold start, render-path peak (board line "L3 device run", waits on the membership, due 2026-10-28).
2. Renderer footprint on a fixture tree in the Simulator; the render rule (section 6) needs a measured render cost before `tree_too_large` means anything. (The 0.8 C constant is gone, review S6.)
3. Whether reloads from T3/T4 count against the budget (L2 measure item).
4. CoreLocation's cost in the extension if C2-Q1 is approved.
5. Contract v3: the `widget_tree` record kind and `tree_seq` (8.3), Pernille.
6. The state fixture set (one `tree.json`/`status.json`/`entitlement.json` triple per row of 7.1) as renderer tests; belongs to the first renderer task line.
7. Measure B, the v1 render-path baseline, and the fixture tree's render cost (section 6), first renderer task.
8. `tree_too_large` card copy (7.1 row 3), Maren.

## 13. Evidence

- pywidget/docs/research/L3-runtime-spike.md s2-s7 (edbcb42c): every number in sections 2 and 6.
- ADR-001 3.1 C4 and 3.3; ADR-002 (timeline, reload policy, `sampled_at`/`stale_after`).
- state-spec.md s1-s3 and the chair ruling of 20:08 (38e91d1c and after).
- L2-refresh-budget.md s1 (budget and exemptions, [recalled], browser read open), s3 (foreground sweep), s5 (run row).
- C2-device-api.md s7; CLLocationManager.h line 253 (`isAuthorizedForWidgetUpdates`, [SDK]).
- Board line C1 note (Idris 19:55, e4ae2bce): restart clears user modules, keeps the interpreter.

## Review (Odalys)

Odalys, 2026-10-25 20:19 ET. Independent review (Commandment 13): I read the document, not the author's reasoning. No edit to sections 0-13. Read against: L3-runtime-spike.md s1-s7 (edbcb42c); the table regenerated from the raw lines with `python3 -I pywidget/ios/scripts/summarize.py pywidget/ios/bench/*.txt` (12 rows, 0 errors); `pywidget/ios/project.yml`; state-spec.md s1-s3 and Ines's chair ruling (20:08); board line C1 (Idris 19:55); bridge-contract.md (1ba53f42) with Idris's review and S1-S6 (f84b7d9b); `pywidget/python/pywidget_ui/__init__.py` (5769e9c9) for `stale_after`. No device, no build.

**Verdict: the decision stands; the spec around it does not yet.** Option (b) for v1 and (c) gated are supported by every number checked. Two blockers sit in the failure spec (7.2, 7.3, 8.2, 5.1 T2), both from the bridge contract landing after this ADR was written. Fix B1-B2 and the should-fix items S1-S12 in an amendment pass, then the chair line. Counts: 2 blockers, 12 should-fix, 6 notes.

### Numbers (section 2, 3, 6 against spike s3 and bench/*.txt)

- **N1 (note).** Section 2: 7 rows, 49 numeric cells, all equal to spike s3 and to the regenerated table (start-to-probe rounded to whole ms). Warm rows: the raw lines carry the process's earlier init time (7.7-11.2 ms); "0" is the right reading for the warm call itself.
- **N2 (note).** "+23 ms, +4 MB" (s2 item 1): init + tiny script is 22.1-24.1 ms over the four cold extension modes; footprint +4.2 to +4.4 MB. Holds. Bundle sizes match spike s4.
- **S1 (should-fix). Lazy imports cut peak by 2.5 MB, not 3.5** (s3 rows c and e). Like for like, zip vs zip + lazy: app 18.5 -> 16.0, extension 20.7 -> 18.2, both 2.5 MB (n = 6/6 app, 6/5 extension). 3.4 MB appears only when comparing full no-lazy (21.6) with zip lazy (18.2), two changes at once. The error starts in spike s1 and s5; correct both. The time figure (110.5 -> 73.9 ms, 106.5 -> 73.0 ms) is right.
- **S2 (should-fix). "Extension baseline 7.7 MB with no Python linked"** (s3 row b) is mislabelled. The spike's extension links `Python.xcframework` (`project.yml` lines 53-54); 7.7 MB is the footprint with the framework loaded, before `Py_InitializeFromConfig`. The v1 extension's no-Python baseline is **unmeasured**. The error is in the safe direction (7.7 is likely an upper bound), but s6's render row cites it as a measured v1 baseline.
- **N3 (note).** T1's "a call from `App.init` never reaches the extension" has no source in the spike document. Cite the run or mark it [observed, unlogged].

### Memory rules (section 6): do they reduce to one constant C?

**No. They reduce to three unknowns and two margins that disagree.**

- **S3 (should-fix). The app row does not use C at all.** 60 MB per batch, 25 MB per widget and the 25 MB `oom_guard` floor are absolute numbers. They depend on a second unknown, the app's background memory limit (call it A, [recalled] in the row), and none is derived from a measurement: the heavy run peaks at 18.5 MB total, 13.4 MB above the Simulator baseline of 5.1, and the real app's baseline (SwiftUI, StoreKit, the IDE's resident modules) is not 5.1. When the device run lands, C changes and these do not.
- **S4 (should-fix). The margins disagree.** The (c) lane demotes at available < 2 x the script's last peak. The app skips a widget at available < 25 MB while budgeting 25 MB per widget: a 1 x margin, so a widget at its budget with the floor's headroom reaches the limit. Use one margin rule (2 x the widget's last measured peak, as in (c)).
- **S5 (should-fix). The render budget has no measured baseline B, and the one Simulator signal says it is already spent on the gallery path.** 0.5 C = 15 MB at the recalled C. Before any Python, the extension measured 14.3 MB on the gallery `getSnapshot` path (1 observation) and 14.6 and 14.3 MB in 2 of 24 cold runs (the post-reinstall runs, spike s3 notes). That is 0.48-0.49 C before a tree is decoded. These are Python-linked processes (S2), so v1 may be lower; until the renderer-only baseline is measured (open item 2), "over 0.5 C: cap the tree" may fire for every tree on that path. Measure B in the Simulator first and write the render rule as B + tree cost.
- **S6 (should-fix). The 0.8 C refusal is a compiled constant; the extension can read its own headroom.** If the limit differs by device class [recalled, unverified], one C is wrong on every phone but one. Write the runtime rules on `os_proc_available_memory()` (refuse when headroom after decode falls under a set fraction of the measured render cost), as the (c) lane already does, and keep C only as the design-time input for the ADR-002 schema caps. Simulator returns 0, so the rule needs a Simulator fallback that is tested. Then the device number really does change one constant: the caps.

### Failure precedence (7.1) against state-spec s1 and the 20:08 ruling

The order matches: update card, Pro card, error card, error badge, stale mark, normal; Pro card after the update card and before the error card, as ruling item 3 says. Badge outranks stale, as s1 says. Findings are in the rows' sources and copy.

- **S7 (should-fix). The Pro card does not reach a widget already on screen.** Ruling item 3: never the last good render after the entitlement is lost. The app "stops writing" (7.1 row 2), but WidgetKit keeps the future entries it already holds until its own reload, so Pro content keeps showing. The app must call `reloadTimelines(ofKind:)` when the entitlement changes, and 7.1 must say a **missing** `entitlement.json` means no entitlement (the ruling names "restore on a new device not yet run"). Refunds reach the app only when it runs [recalled: `Transaction.updates`]; state the lag.
- **S8 (should-fix). `tree_too_large` has no source file and no copy.** (a) "Badge on the last good render if one is smaller" (s6 row 1, 7.2): `tree.json` is replaced atomically and no older tree is kept anywhere in the App Group layout (5.2). Either keep `tree.prev.json` or drop the clause. (b) Row 3 shows "Script error", line, "Tap to open", but the script did nothing wrong; state-spec s3 has no copy for this case. Maren needs a variant. (c) The footprint is checked "after decode"; the SwiftUI render that follows is the larger allocation. Check after render or budget for it.
- **S9 (should-fix). The stale entry is only added after the last entry** (7.4). If `sampled_at + stale_after` falls between two entries (entries at 0 and 60 min, `stale_after` 30 min), no entry is added and the mark appears at 60 min, 30 minutes late. Insert the synthetic entry at the stale time wherever it falls, cloning the entry before it. With that change 7.4 answers state-spec s1's question; without it, only for single-entry timelines.
- **S10 (should-fix). Two defaults for an absent `stale_after`.** 7.4: absent means 30 minutes (C2 L1 rule c). The shipped DSL (`pywidget_ui` v1, `Timeline.stale_at` / `is_stale`): absent means never stale. A script that branches on `When("stale", True)` and the renderer's clock will disagree for every widget that omits it. Pick one; the DSL and the renderer test the same fixture.
- **N4 (note).** Row 1 says `version` "newer than the renderer reads"; state-spec s1 says "not one this renderer reads" (older unsupported versions too). Use the spec's wording.

### Restart rule (8.2) and interface (8.3) against the C1 note and the bridge contract

The C1 note (Idris 19:55: clear the user's modules, keep the interpreter) is met by 8.1-8.2 in principle. The contract (s1-s6, with S1-S6 binding) differs in mechanism in the places below. The contract was signed after this ADR; its names and rules should win, as 8.3 itself says.

- **B1 (blocker). "Abandon the worker and move on" is impossible under the contract.** 7.2 `timeout`, 7.3 and 8.2 step 1 say: interrupt, after 2 s abandon the thread, mark the interpreter tainted, let the batch move on, restart before the next run. The contract has one interpreter, one script thread, one run at a time (s1, s2): a thread still inside `run` holds the only interpreter. Its ladder is interrupt + wake at 0, repeat every 250 ms, hard stop at 2.0 s, deadline at **5.0 s**, then `stuck`: run, restart, widget runs and Shortcut runs all refuse until the thread returns (`unstuck`) or the user quits. The ADR needs: the ladder's numbers in 7.2/7.3; a `stuck` outcome (what the batch does with the remaining widgets, what each widget shows, what the run row says); per-widget worst case = timeout + 5.0 s, used in the T2/T3 arithmetic.
- **B2 (blocker). T2 has no margin and no expiration handler.** Batch deadline 25 s + 5.0 s stop deadline = 30 s, the task's recalled limit: the same arithmetic made Idris cut the Shortcut budget to 20 s (contract S4). Idris's carry item 3 adds the expiration handler: `stop(run_id)` and `setTaskCompleted` at once, without waiting for the deadline. Without it iOS ends the app, `run.lock` is left behind, 7.2 records `killed`, and after two of those the widget is set `background=false`. The loop breaker would then demote healthy widgets for our own scheduling fault. Fix the T2 deadline (20 s, as T3) and add the handler to 5.1.
- **S11 (should-fix). 8.2 differs from contract s6 in six places.** (1) Which modules are cleared: 8.2 uses `__spec__.origin` under the scripts directory or App Group. The contract uses "not present at bootstrap and not inside the app bundle", which also catches modules with no origin that the user put in `sys.modules`. (2) stdio: 8.2 resets the stdin/stdout/stderr wrappers; the contract keeps the same objects for the life of the process. (3) File handles and sockets "the pywidget package tracks": no such tracking in the contract; nobody owns it. (4) `atexit`, `logging` and signal handlers: 8.2 says these cannot be undone; the contract runs and clears `atexit`, restores the root logger and signal handlers, and restores `builtins`. (5) Timing: 8.2 scrubs after each widget; the contract resets at the start of every run. (6) Threads: 8.2 counts "surviving non-daemon threads"; under the contract a run does not end until its non-daemon threads finish, and `background_threads` counts threads alive after the deadline. Replace 8.2 with a citation to contract s6 plus anything ADR-specific.
- **S12 (should-fix). 8.1 and 8.3 names and the thread model.** 8.1: "every run takes [the GIL] on one serial queue". The contract uses one dedicated pthread script thread that is Python's main thread, with all of `start()` on it (s2, S1); a GCD queue is the spike fault in contract s0 item 3. Name mismatches in 8.3, ADR -> contract:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: Restart rule (8.2) and interface (8.3) against the C1 note and the bridge…, scrolls sideways" style="--tw:640px" markdown="1">

| ADR-007 8.3 | bridge-contract.md |
|---|---|
| `run(source\|path, mode: script\|widget, deadline, trigger, stdin: prompt provider) -> RunResult` | `run(RunRequest{run_id, source: .file(URL)\|.text(String, name), argv, cwd, stdin: .interactive\|.preset\|.none, context: .app\|.widget\|.shortcut, budget_s})` -> `RunHandle`; outcome later as a `finished` record |
| `mode` (2 values) | `context` (3: app, widget, shortcut) |
| `deadline` | `budget_s` |
| `trigger` | not in the request; the run row's trigger is Swift-side |
| `RunResult.outcome`: ok, error, timeout, ... | `bridge-outcome/1` `status`: ok, exit, error, interrupted, syntax_error, internal_error; plus `stuck` |
| `value` (tree JSON) | **absent**: the contract leaves widget view-tree output out of scope ("Not in this page") |
| `stdout`, `stderr` in the result | streamed `stdout`/`stderr` records with `seq` |
| `traceback{type, file, line, text}` | `error` (contract s8, structured frames, UTF-16 columns) |
| `duration_ms` | `duration_s` |
| `peak_mb` | absent |
| `surviving_threads` | `background_threads` |
| `interrupt()` | `stop(run_id)` (run-scoped, no-op on a finished run) |
| `restart()` -> modules cleared, threads surviving | `restart()` -> `RestartReport{cleared_modules, background_threads, stuck}` |
| `run.lock` in the App Group | crash marker in Caches + `faulthandler` file (contract s7); "backgrounded" wording (Idris carry item 4) |

</div>


  Three of these are gaps, not renames: (a) **the tree has no channel**: name the owner and the mechanism (a `finished` payload field, an `emit` kind, or a file the runner writes); (b) **one outcome enum**: map `interrupted` by budget to `timeout`, and give `exit` without a tree, `syntax_error`, `internal_error` and `stuck` a row in 7.2. G3 expects `oom` in the Activity log, but 7.2 only ever writes `killed` under (b). (c) **`peak_mb`** is needed by the run row and the (c) demotion rule; Swift samples `phys_footprint` around each run. Two crash markers for one event should become one.
- **N5 (note). The IDE shares the interpreter.** 4.4 ("IDE runtime untouched by any widget limit") is true for limits. But widget runs queue behind console runs (contract Q1, queue-then-busy), and a console script's monkeypatch to a stdlib or bundled module stays in place for later widget runs (contract s6, Kept). Say both in 5.1 or 10.
- **N6 (note).** 7.3 says a script in `time.sleep` or a socket read stops "when it returns". With the contract's SIGURG wake (S2) it stops at the next EINTR (0.24-0.25 s on host, probe I1). That is the better behaviour; the text understates it.

### For the chair

Accept option (b) for v1 and (c) gated: no number contradicts them. Hold the failure spec until B1 and B2 are amended. S9 decides whether 7.4 closes state-spec s1's question. C2-Q1 (s9) is outside what I checked against evidence; nothing in it conflicts with the memory rules, since its cost is listed as unmeasured.

## Changes after review

Idris, 2026-10-25 20:28 ET. Each finding in "Review (Odalys)" and each row of bridge-contract.md s11 (Pernille, ebca07ba), and the edit that answers it. Odalys's section is untouched. Status stays proposed for Ines's chair line.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: Changes after review, scrolls sideways" style="--tw:640px" markdown="1">

| Finding | Edit |
|---|---|
| **B1** abandon impossible with one script thread | New 5.3 "Stuck": the batch ends, the stuck widget gets `stuck` + badge, the rest `deferred` (no badge, stale clock, `wants-run` kept), T2 completes and reschedules, T3 returns a busy error, every later run refuses until `unstuck` or quit; recovery by `unstuck` or next launch. 7.2 rows `stuck`, `deferred`; 7.3 rewritten on the contract ladder; 8.2 step 1 removed. Risk 5 added. (s11 A12, A15) |
| **B2** T2 25 s + 5.0 s = 30 s, no expiration handler | 5.1 batch rule: a widget starts only if `elapsed + budget_s + 5.0 <= 25 s`, so the batch ends by 25 s, stuck or not; applies to T2 and T3. 5.3 expiration handler: `stop(run_id)`, `expired`/`deferred` outcomes, `backgrounded` in the marker, reschedule, `setTaskCompleted(success: false)` at once; the run is stopped, not resumed (contract carry item 3 answered). `expired` never counts toward the loop breaker. Risk 6 added |
| S1 lazy imports 2.5 MB, not 3.5 | Section 3 rows (c), (e) corrected with the like-for-like pairs; L3-runtime-spike.md s1 and s5 corrected with a note |
| S2 7.7 MB mislabelled | Section 3 row (b) relabelled (framework linked, not initialized; v1 no-Python baseline unmeasured); section 6 says the same |
| S3 three unknowns, app row not on C | Section 6 rewritten around C, A, B; app rule reads headroom, no absolute 60/25 MB figures |
| S4 margins disagree | One margin rule (2 x last measured peak above baseline; first run 27 MB from the spike) for app, render and (c) lane |
| S5 render budget has no baseline | B defined, unmeasured; render rule is headroom against measured render cost; open items 2 and 7 |
| S6 0.8 C compiled constant | Runtime rules on `os_proc_available_memory()`; C kept only for ADR-002 schema caps; Simulator 0 read as unknown, with a stubbed-headroom unit test |
| S7 Pro card on a widget on screen | 7.1 row 2: missing `entitlement.json` = no entitlement; 7.2 `entitlement_lost`: rewrite, stop writing, `reloadTimelines(ofKind:)` at once; lag stated, Pro timelines written at most 24 h ahead |
| S8 `tree_too_large` source and copy | (a) "smaller good tree" clause dropped, no older tree kept; (b) separate card variant, copy to Maren (open 8); (c) render cost measured after the SwiftUI render, not after decode |
| S9 stale entry only after the last entry | 7.4: synthetic entry inserted at `sampled_at + stale_after` wherever it falls, cloning the entry before it |
| S10 two defaults for absent `stale_after` | 7.4: absent means never stale, matching the shipped DSL; 30 min moves to premade and device-module templates; one shared fixture for DSL and renderer tests |
| S11 8.2 differs from contract s6 in six places | 8.2 replaced by a citation to contract s6; reset at the start of every run; handle tracking declared not v1 (s11 A16, A17, A18) |
| S12 8.1 queue and 8.3 names | 8.1 names the script thread (contract s2, S1); 8.3 rewritten in contract names: `RunRequest`, `context`, `budget_s`, `RunHandle`, records, `finished`/`bridge-outcome/1`, `stop(run_id)`, `RestartReport`, `background_threads`, `duration_s` (s11 A1, A3, A6, A9, A10, A11, A13, A14) |
| S12 gap (a) / s11 **A5** tree channel | 8.3: a `widget_tree` record before `finished`, `tree_seq` in `finished`; record chosen over an outcome field (streamed, size-capped, "no tree" visible). Pernille adds it in v3 (open 5) |
| S12 gap (b) / s11 A4 one outcome enum | 7.2 mapping paragraph: bridge `status` -> widget outcome, including `exit` without a tree and `internal_error`; G3 now expects `killed` (or `oom_guard`), since jetsam is not distinguishable under (b) |
| S12 gap (c) / s11 A2, A8 `peak_mb`, trigger, two markers | 7.5: trigger and peak MB are Swift's (job record, `task_info`); 5.2 and 7.2 `killed`: one marker, the contract's in Caches; `run.lock` removed from the App Group layout |
| s11 A7 traceback fields | 7.2 `error` row cites the contract s11 A7 mapping |
| s11 A19 | covered by B2 |
| N3 `App.init` claim unsourced | 5.1 T1 marked [observed, unlogged] |
| N4 update card wording | 7.1 row 1 uses state-spec s1's wording |
| N5 IDE shares the interpreter | 5.1 "Runs queue behind the IDE" and a line in section 10 |
| N6 SIGURG wake understated | 7.3 says sleeps and socket reads stop at the next `EINTR` (0.24-0.25 s, probe I1) |
| N1, N2 | no change needed (numbers hold) |

</div>


Deferred, with reason: none of the review's items. Two things this pass chose not to do: closing handed-out file handles (8.2, not v1: nothing tracks them), and a `tree.prev.json` fallback for `tree_too_large` (dropped instead; the caps should keep that path rare, and the run rows will show if it is not).

## Chair line (Ines), 2026-10-25 21:08 ET

Form: independent views, then the chair's decision (C13, C27, C30). Views read: Idris's ADR (00cab1a4) and his amendment pass (76a833f5); Odalys's independent review (a317a344, d0c79bee); bridge-contract.md v2 s5-s7 and s11 (Pernille, ebca07ba); state-spec.md s1 and my 20:08 ruling; C2-device-api.md s7; ADR-001 3.3 (cut line). I checked the amendment against each blocker, not only the mapping table.

**Ruling 1: accepted, with three amendments. v1 is option (b); option (c) stays built-in and switched off.** Odalys found no number that contradicts (b), and her two blockers are closed in the text, not just in the table:
- B1: 5.3 replaces "abandon and move on" with the contract's `stuck` state. One interpreter means a stuck run stops every widget until it returns or the app is quit; risk 5 says so, and the cost is one badge plus the stale clock on the rest. Accepted as the honest cost of one interpreter.
- B2: the batch rule admits a widget only if `elapsed + budget_s + 5.0 <= 25 s`, and the expiration handler completes the task at once. `expired` and `deferred` never count toward the loop breaker, so our own scheduling never demotes a healthy widget. That was the failure I cared about most.
- The (c) flag opens only on G1-G3 on a device, recorded in a new ADR line, never silently. If C on device fails the 2 x (B + largest premade render) test, (c) leaves the roadmap. Nothing about (c) is v1 work beyond the allowlist scan and the lane field.

Amendments (binding on the build):
- **A1. User widgets start honest.** 7.4 and S10 stand: absent `stale_after` means never stale, as the shipped DSL does. But a user who never writes `stale_after` then gets old data with no mark. So the IDE's "New widget" file template sets `stale_after=timedelta(minutes=30)` on its timeline, as the premades do. The default stays in the language; the honest choice is what the user starts from. Board line (Pernille, template text and DSL test; Idris wires it into the IDE).
- **A2. Pro timelines 24 h ahead (7.2, S7)** is accepted as the refund-lag bound. It costs at most one extra reload a day per Pro widget; L2's budget absorbs it.
- **A3. No stdlib change from this ADR.** The bundle contents are the stdlib cut's (pywidget/docs/research/stdlib-manifest.md, chair line there). Under (b) the extension ships no stdlib at all.

**Ruling 2: C2-Q1 approved, narrowed as section 9 says, with one change to the release condition.** The extension may take one Swift-only location fix in `getTimeline` and write `location/last.json` (`source="refresh"`, `sampled_at` set) for the next Python run. Only widgets whose manifest declares `location`; skipped when `isAuthorizedForWidgetUpdates` is false or the cached fix is younger than `max_age`; at most 3 s inside `getTimeline`, then the cached tree, with or without a fix; written atomically; no Python in the extension; nothing leaves the phone.
- Change: section 9's condition "1.0 only if the distance premade is among the 8 the cut line needs" cannot be decided. The cut line counts any 8 of 12 that render correctly, and the distance premade renders correctly without the fix (honest but old, with the stale mark). So the fix never gates the cut line. It is a **1.0 stretch**: in 1.0 only if it lands by Day 13 (2026-11-03) with (i) CoreLocation's footprint in the extension measured in the Simulator and inside section 6's margin rule, (ii) a test where no fix arrives in 3 s and the provider returns the cached tree, and (iii) Wrenna's privacy-matrix row confirming no label change (location is already When In Use; that it stays so is **[recalled]** until the row lands). Otherwise 1.1. It starts only after the renderer's first fixture set; the cut-line work comes first.
- Why yes at all: "distance to a saved place" is the premade a buyer understands in one glance, and without the fix it is usually stale on the Home Screen, which is where buyers judge it. One code path and one Info.plist key is a small price for that, and it stays inside Ruling 1 (no Python in the extension).
- C2-device-api.md s7: the `source="refresh"` row is confirmed by this ruling; Idris updates s7 from "open" to this line when he builds it.

**Ruling 3: yes, 7.4 closes state-spec s1's question** ("Idris: check whether ADR-002's provider already does this"). The provider inserts the synthetic stale entry at `T = sampled_at + stale_after` wherever T falls, not only after the last entry (S9), and the current entry is stale from the start if T has passed. That is stronger than s1's "appends one entry". Three deltas for state-spec s1, Maren's file, so I do not edit it:
- The trigger reads `now >= sampled_at + stale_after` (at or after, as 7.1 row 5); s1's `>` would leave the entry at T unmarked.
- Absent `stale_after` means never stale (A1 above).
- The precedence table gains the Pro card between the update card and the error card (my 20:08 ruling; already on Maren's Pro card line).
- One note for the renderer task: the synthetic entry can become the timeline's last entry, which moves an `.atEnd` reload to T. That is the right time to ask, and it is not an extra reload; the shared fixture (7.4) should assert it.

The Idris line "Maren states open items 2-3" keeps its Simulator items (corner clipping, rendering modes); its timeline-entry question is answered here.

Open, owned elsewhere: device numbers C, A, B (L3 device run, waits on the membership, due 2026-10-28); contract v3 `widget_tree` (Pernille); `tree_too_large` copy (Maren); renderer fixtures and B (first renderer task).

## Corrections after acceptance (Idris, 2026-10-26)

Not a change to the decision (option b stands); facts and citations only.

1. **T5 (CORRECTIONS U1-34).** The row said a widget action intent runs in the app process. The SDK says the process is whichever target contains the intent ("By default, the system performs an intent or entity query using any available target", doc comment of `IntentExecutionTargets`), and it can be pinned only from iOS 27 (`allowedExecutionTargets`, AppIntents.swiftinterface 3111-3112). On our iOS 18 floor the row was true only for iOS 27+. The row now says so; the 1.1 design for 18-26 (ops in the extension, signed action links, a queue) is L5-interactivity.md s4. That design has the extension write `state.json` and `actions.jsonl`, which changes 5.2's "everything the extension reads is a file written atomically by the app"; that is for a 1.1 chair line (L5 s15 item 1), not changed here. T5 also no longer names "configuration" intents: a widget's configuration intent is resolved by the timeline provider in the extension and runs no Python.
2. **Citations (CORRECTIONS U1-06).** "L2 s5" (5.2 twice, 7.5) is L2 s3.3: L2 has no section 5. T7's "L2 s1" is L2 s2 item 6, which says push is not v1; location wake not being v1 rests on ADR-001.
3. **T3's "about 30 s [recalled]"** now has a primary source: the `LongRunningIntent` doc comment, "In iOS, iPadOS, tvOS, visionOS, and watchOS, the system gives tasks 30 seconds to run in the background unless you use the methods of this protocol to extend that runtime." The row text is unchanged; the batch rule's 25 s stands.

## Chair amendment (Ines), 2026-10-26 00:15 ET: 5.2 writers for 1.1

Ruled in L5-interactivity.md s15 (chair note, items 1 and 2); this records the architecture change. Option (b) stands, and so does "no Python in any extension". Idris's corrections 1-3 above are accepted.

1. **5.2's rule, restated.** Every App Group file is written atomically (temp file plus `rename` in the same directory). The extension writes only: `widgets/<id>/wants-run` (T6) and `location/last.json` (C2-Q1, if it lands), as in v1; and from 1.1, `widgets/<id>/state.json` and `widgets/<id>/actions.jsonl`, both under `flock` on `widgets/<id>/state.lock`. Every other file the extension reads is written by the app. The old sentence was already not literal for `wants-run` and the location fix.
2. **What the extension may do to state** is a closed op set fixed in Swift (L5 s3.2: `set`, `set_arg`, `toggle`, `add`, `cycle`, `toggle_member`, `clear`). No expressions and no user code. A new op is an app update and a dated line here.
3. **One write path, bounded lock** (L5 s15 S3-S5): one Swift type in the shared framework does every state write in both processes; the extension's lock wait is non-blocking with at most 200 ms of retry; the lock is never held across an `await` or a Python run; an unreadable state file is kept as `state.bad.json`, never silently reset.
4. **Names held from v1 (L5 R6), nothing written in v1:** `widgets/<id>/state.json` (`schema`, `rev`, `scopes.shared`), `state.lock`, `actions.jsonl`, `controls/`, `secrets/`. `secrets/link.key` is created by the app at first 1.1 launch, not in v1 (L5 R10 dropped).
5. **7.5, reserved values (L5 R8):** triggers `widget_action`, `control`, `deep_link`; outcome `conflict`. The v1 log reader shows any unknown trigger or outcome as text and never fails.
6. **T5 on iOS 18-26:** a handler action defaults to `fallback="open_app"`, a signed link that opens the app and runs the handler in the foreground; `queue` is opt-in, and a queued tap is never dropped (refused at 100 rows).
7. **Gate:** no 1.1 state code before G-L5-1 (a) and the widened G-L5-5 pass in the Simulator and Odalys has reviewed L5 s5 independently.
{% endraw %}

</div>
