---
layout: "default"
title: "T-4661: free the Mac mini&#x27;s disk and cut its load"
section: "documents"
description: "Investor an Investor, #41 c6935343478 (2026-11-16 8:47 PM ET, log/rulings.md): the company manages storage and load on the Mac mini itself, no ask first. Step (1) is also T-3859&#x27;s step (2) for Simulators and temp\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4661-load.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4661-load.md</code></span></div><h1>T-4661: free the Mac mini's disk and cut its load</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor, #41 c6935343478 (2026-11-16 8:47 PM ET, log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md): the company manages storage and load
on the Mac mini itself, no ask first. Step (1) is also T-3859's step (2) for Simulators and temp (rulings #248 and
#250 asked the Investors for these by hand; the 8:47 PM ruling hands them to the company). All times ET.

## 1. Disk

`python3 -I tools/storage_guard.py check` lists what `clean --yes` removes; both rerun at any time.

Run 7:35 to 7:40 AM 11-17: Data volume **20.8 GB free before, 30.7 GB after (+9.9 GB)**; 32.3 GB at 7:54 AM
(other writers move the figure both ways; the 7:20 AM reading was 21 GB).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Disk, scrolls sideways" style="--tw:724px" markdown="1">

| Removed | GB | Why it was safe |
|---|---|---|
| 68,076 items in the per-user temp folder untouched 12+ h | 8.29 | test and build leftovers (stdlib-manifest-*, t0297-*, pywidget-host*, mq-test*, TemporaryDirectory.*); not com.apple.*, none named by a running process; 104 items refused removal (in use or not ours) and were left |
| Simulator devices "T1703 main r2", "T1703 main r3" | 4.27 | T-1703 is archived; nothing in tools/, tests/ or pywidget/ names them |
| 1 DerivedData folder untouched 3+ days | <0.01 | xcodebuild rebuilds it |

</div>


Kept, and why (35 devices, 65 GB in ~/Library/Developer/CoreSimulator/Devices):
- named by a tool, test, script or doc (iPhone 17e, iPhone Air for gate_session_build.sh, the iPad Air 11-inch (M4)
  and iPad Pro 11-inch (M5) the iPad UI tests run on, ...), or named by a running session;
- carrying a task still open on the board (t3765-iphone/ipad, T3764 iPad, pywidget-t4181-idris,
  pywidget-t0678-ios26, two T-2027 devices): about 16.4 GB, freed when those tasks close and `clean` runs again;
- booted (pywidget-t0696).
- No runtime deleted: every runtime (iOS 26.0, 27.0, 27.1) has a kept device.

Found, not done:
- The iPhone 17e Simulator (the main test device) is 16.3 GB, 9.5 GB of it in its wallpaper poster store
  (Library/Application Support/PRBPosterExtensionDataStore). `xcrun simctl erase` would return about 14 GB but
  wipes the device's installed state while sessions name it. Next: erase it in a quiet hour, then check the next
  xc.sh run still installs and passes.
- Regrowth: the temp leftovers come from tests that make a tempfile.mkdtemp folder and do not remove it
  (pywidget/runtime/stdlib_manifest.py "stdlib-manifest-", pywidget/tests/stdlib/test_install_phase.py "t0297-").
  Until each is fixed, `storage_guard.py clean --yes` should run daily (wiring it into the nightly runner is the
  next step; not done here to stay off the pipeline files).

## 2. Load split

`python3 -I tools/storage_guard.py sample --every 30 --minutes 32` then `split FILE`: each process's ps %CPU is
charged to the most specific run among itself and its ancestors (landing gate, apply-proposal verify,
bridge_driver tests, Xcode test run, host or suite tests, claude session, supervisor and upkeep), else Simulator
devices (children of launchd_sim), macOS and apps, other.

Window: **7:22 to 7:54 AM ET 11-17, 60 readings about 32 s apart** (not the hour asked for). My own disk sizing
(7:27 to 7:33 AM) and clean (7:35 to 7:40 AM) ran inside it and count under "claude session" (about 2%).
Mean load1 70 (5.6 to 262); mean CPU in use 5.1 of 8 cores.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Load split, scrolls sideways" data-n="2 3" style="--tw:438px" markdown="1">

| Kind of run | Share of CPU | Cores |
|---|---|---|
| Landing gates (main gate, personal lands, merge queue; their tests, xcodebuild and bridge_driver runs inside) | 43% | 2.16 |
| macOS and apps (WindowServer, the Neural Engine compiler, wallpaper extension) | 26% | 1.29 |
| Simulator devices | 21% | 1.04 |
| Supervisor and upkeep tools (du disk sizing, movers) | 8% | 0.42 |
| Claude sessions themselves | 2% | 0.08 |
| Other | 1% | 0.04 |
| Apply-proposal verify | 0% | 0.00 |

</div>


Every xcodebuild and bridge_driver run in the window ran inside a landing gate, so it is in that row.

Longer record, ops/metrics/machine.jsonl 7:20 AM 11-16 to 7:45 AM 11-17 (1,242 one-minute rows):
- an xcodebuild ran in half the minutes, and then median load1 was 157 to 167 (whatever else ran);
- with no xcodebuild: no heavy runs 4 to 17, 1 run 8, 2 runs 42, 3 or more beside a booted Simulator 184 to 256;
- 8:50 PM 11-16 (load 270 to 290): no xcodebuild, 1 Simulator, 4 to 5 test suites at once, 3 sessions; memory
  54% free. That was before the heavy-run <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> landed (1:15 AM 11-17).
- Load average counts waiting threads, not CPU: at load 144 to 262 (7:31 to 7:36 AM) CPU in use was 5 to 7 cores.
  A Simulator boot starts about 300 processes at once; that is most of the spike.

Median load1: 100 (7:20 AM to 8:15 PM 11-16), 163 (8:15 PM to 1:15 AM), 25 (1:15 to 7:45 AM 11-17, after the cap;
night hours, xcodebuild in 29% of minutes against 54% and 75%, so not a clean comparison).

## 3. Cap on concurrent heavy runs

Already there (T-4655, commit 5274377036 at 1:15 AM 11-17): tools/heavy_slot.py, one machine-wide set of slots
(flock) that tests/run.sh, host_keep, lane_landcheck, merge_queue and main_gate take; apply-proposal verify runs
tests/run.sh, so it takes one too. Xcode runs keep their own one-at-a-time lock in tools/xc.sh (T-0140). During the
window its status showed 3 slots held and 2 runs waiting. Beside it: the load-follow suite limit (T-4617/T-3888) and Simulators on the
SSD (T-3726).

Tuned, not duplicated: general slots = cores // 2 - 1 - booted Simulators - **1 while any xcodebuild runs**
(`xcode_slots` in ops/heavy_slot.json; 0 turns it off). On 8 cores during an Xcode test run that is 1 general slot
plus the gate's, was 2 plus the gate's. Why: with an xcodebuild running, median load1 by heavy runs beside it was
0 -> 130, 1 -> 125, 2 -> 157, 3 -> 175, 4 -> 196. tools/xc.sh is unchanged: it already serialises Xcode runs.

Seen-line (to check 9 AM 11-18 on machine.jsonl): median load1 in minutes with an xcodebuild below 140 (was 157 to
167), and main-gate land time not longer (ops/metrics/main_gate.jsonl). If lands slow down, set xcode_slots 0.
{% endraw %}

</div>
