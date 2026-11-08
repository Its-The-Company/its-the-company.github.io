---
layout: "default"
title: "T-3477: review of 5914346c4 (T-3393, budget reserve for stalled sensor calls)"
section: "documents"
description: "Verdict: PASS with fixes. The runtime change is right, and the 0.5 s holds on the host for both budgets. It turns a blank Steps or Altitude first render into a drawn notice. It also adds a regression on the widget path\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3477-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3477-pernille.md</code></span></div><h1>T-3477: review of 5914346c4 (T-3393, budget reserve for stalled sensor calls)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13 review of Idris's commit 5914346c4. I read `git show 5914346c4`
and the code it calls, then ran the runtime on the host. No Xcode: the Mac mini's disk is under its line, and T-3518
owns the MacBook run of the Swift tests.

**Verdict: PASS with fixes.** The runtime change is right, and the 0.5 s holds on the host for both budgets. It turns
a blank Steps or Altitude first render into a drawn notice. It also adds a regression on the widget path (F1), and
it guards less than its tests claim (F2, F3). The same bug is still open in `pywidget.http` (F4).

## What I ran

`/Volumes/Company SSD/company-scratch/T-3477-pernille/stall_probe.py` stages the app's Runtime folder the way the
build lays it out (the `test_bundle_runtime.stage` build phases). It then runs all 12 premades through the real runner
(`tests/bridge/bridge_driver.py`, `PW_BUNDLE_ONLY=1`). Every `device.pedometer.*` and `device.location.*` call
hangs. Each premade runs twice: once as a gallery preview (`budget_s` 2.0) and once as an app widget run (`budget_s`
5.0). The driver's Stop timer (`stop_after` = the budget) starts before `runtime.run`, just as Swift's budget timer
starts before `pw_rt_run`. That keeps the runner's reset, before Python sets its deadline, inside the measurement.
The probe ran with `BUDGET_RESERVE_S` = 0.5 (four runs) and with 0.0 (one run). Outputs: `probe-*.json` beside the
script.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:976px" markdown="1">

| premade | stalled call reached | 0.5 s: preview / widget | 0.5 s: slack left at the end (host, 4 runs) | 0.0 s: preview / widget |
|---|---|---|---|---|
| steps | `pedometer.status` | ok / ok | 0.45-0.48 s / 0.37-0.49 s | **interrupted** / ok (raced) |
| altitude | `location.status` | ok / ok | 0.38-0.48 s / 0.35-0.48 s | ok (raced) / ok (raced) |
| distance | none (no saved places) | ok / ok | 1.99 s / 4.99 s | ok / ok |
| the other 9 | none | ok / ok | more than 1.8 s | ok / ok |

</div>


The host fake's Stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> delivers late, so without the reserve the host outcome is a race. With the real C bridge
it is not. `slot_wait` (`Shared/Bridge/pwbridge.c:177-200`) wakes on Stop at once. Python's deadline is set after
Swift's timer (`PyBridge.swift` doRun, then the runner's `_prepare` at `runner.py:1176`), so without the reserve
Python's wait is still <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> when Stop lands. The `KeyboardInterrupt` skips `except Exception`.

`tests/bridge/test_device_call.py` (15), `tests/device/test_device_modules.py` (28) and `tests/prompts` (24) pass on
the host at HEAD. The new `test_budget_cut_leaves_the_script_time_to_draw` is red on the old runtime: there,
`effective_timeout(10, 1.0)` gives 1.0, not 0.5.

## Check 1: the 0.5 s against the 2 s preview and the 2 s <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>

- **Preview (2.0 s).** A stalled call is cut to (2.0 - lag - time before the call) - 0.5. It raises `BridgeTimeout`
  at Swift time lag + 1.5 s. The fallback (one `notice` per family, serialise, emit) then has 0.5 - lag s before
  Stop. On the host that work took 17-150 ms after the timeout, so the smallest slack I saw was 0.35 s. That is
  enough unless the phone is about 3x slower than this Mac on the fallback render. Nobody has measured the device
  side (F7).
- **App widget pass (5.0 s).** The same window. The wait is 4.5 s.
- **Extension lane (2.0 s).** The reserve cannot help a sensor there and is not needed for one.
  `LaneDeviceRouter.handle` (`Shared/Bridge/LaneDevice.swift:11-29`) answers `device.location` and
  `device.pedometer` with `NotAvailableHere` synchronously, and lane.json runs only countdown, habits and quote. In
  the lane the reserve touches only `net.get`, and there it inverts net's own margin (F5).
- **Prompts.** `alert.budget_runs_out` now needs 4.0 s of budget to keep its 3.5 s call. PromptDesk takes its
  deadline from the timeout Python sends, so Swift and Python still agree.

## Check 2: does each per-premade stall test fail without the reserve?

No. Only **2 of 12** do: Steps and Altitude. See F2.

## Findings

**F1, High: the fallback overwrites a good widget with a false message.**
`widgets/premade/steps.py:42-43,87-88`, `widgets/premade/altitude.py:35-37,82-83` and
`widgets/premade/distance.py:58-60` turn every exception into "unavailable" or "off". This commit makes that path
fire on every stalled call (`_pywidget_runtime/device.py:70-73`). Failure case: Steps is placed and drew 6,200
steps at 09:00. At 10:00 the app comes to the front and the pedometer query stalls. The wait ends at 4.5 s, the
run ends `ok`, and `tree.json` is overwritten with "No step count. This device does not count steps." on an iPhone
that does count steps. Altitude and Distance say "Location is off" while it is on. Before this commit, that run was
interrupted, wrote nothing, and the widget kept its last good tree under its own stale rule. A blank first render
became a notice, which is a gain. A later stall now replaces true data with a false sentence, which is a loss. The
tests only check that a tree decodes (`ios/Tests/PremadeSensorStallTests.swift:40-51`), so they cannot see this. Fix:
give a `BridgeTimeout` its own status with honest copy ("Couldn't read steps just now", wording from Maren). And do
not let a timeout notice replace a tree that is still fresh, either from the premade (re-raise when a recent reading
exists) or in the sink.

**F2, Medium: 10 of the 12 per-premade stall tests cannot fail without the reserve, Distance among them.**
`ios/Tests/PremadeSensorStallTests.swift:53-84,121-132`. `checkDrawsWithStalledSensors` never asserts that a stalled
call was reached. Distance with no saved places returns `"empty"` before it touches location
(`widgets/premade/distance.py:48-51`). Sun calls location only with `use_current` (`widgets/premade/sun.py:63-70`).
The gallery preview passes no state, and a fresh widget folder has none. So setting `BUDGET_RESERVE_S = 0` turns
only `testT3393Steps…` and `testT3393Altitude…` red. The probe shows distance at 7 ms with no sensor call. The commit
message and the T-3393 note also say the stall blanked Distance, which cannot happen on an empty store. Fix: run
Distance with a saved place, and Sun with `use_current` (preview `stateJSON`, or the widget folder's
`premade.json`). Assert `log.calls` non-empty for steps, distance, altitude and sun, and empty for the rest, so the
other eight are named as controls.

**F3, Medium: the no-starvation test is sequential; the product is not.**
`ios/Tests/PremadeSensorStallTests.swift:90-118` runs the whole gallery, then the whole app pass. In the app the
scene-active pass (`App/PyWidgetApp.swift:117`) and `GalleryModel.runAll` (`App/Gallery/GalleryView.swift:130`,
`GalleryPreview.swift:169-179`) share the one script-thread queue. A preview's 2 s budget counts its time queued
(`Shared/Bridge/PyBridge.swift:661-668,900-906`). Failure case: Steps is placed, so the pass runs it first. Its
pedometer stalls and the run holds the thread for 4.5 s, down from 5.0 s. The preview queued behind it ends `busy`,
and that tile stays Failed for the session. Countdown is first in both queues and gets through. The reserve does not
change this, because 4.5 s is still more than 2 s, yet the test's name says nothing is starved. Fix: add the
concurrent case (start `refreshPlaced` and `runAll` together, sensors stalled), and either keep a widget run's
sensor waits under the preview budget or stop counting a preview's queue time against it. This is also the T-3411
candidate.

**F4, Medium: `pywidget.http` has the same bug, untouched.**
`ios/App/Runtime/pywidget/http.py:170-175` <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> the socket timeout at the full `remaining`, with no reserve. Failure
case: GitHub (Pro) with a repo set, on captive-portal Wi-Fi. `http.get(..., timeout=10)` (`widgets/premade/github.py:64`)
waits the whole 5 s budget, Swift's Stop comes first, the `KeyboardInterrupt` skips `except Exception`, and a first
render stays blank. A socket timeout applies to each operation, so a server that sends slowly can run past even the
full budget. Fix: the same reserve (shared from one place), and a deadline for the whole request rather than for each
operation.

**F5, Low: `net.get`'s margin is now inverted.**
`ios/App/Runtime/pywidget/net.py:50-51,146-151`. Swift's URLSession timeout is set to `left - 0.25`, and the device
call's wait is now cut to `left - 0.5`. So Python stops listening 0.25 s before Swift's own timeout, which breaks the
comment's promise that "Swift's own timeout ends this long before the run's budget does". Failure case: in the 2 s
extension lane, a response that lands between `left - 0.5` and `left - 0.25` is thrown away. The script gets
`BridgeTimeout` instead of the body or net's own timeout error, and the URLSession task runs on with no waiter. Fix:
`MARGIN_S` greater than `BUDGET_RESERVE_S` (for example 0.75), or derive one from the other.

**F6, Low: a call made in the last 0.5 s still runs in Swift but reports a timeout.**
`_pywidget_runtime/device.py:70-73` sends `timeout` 0 when less than 0.5 s is left, and `br_call` still calls the
handler before it waits (`Shared/Bridge/pwbridge.c:451-452`). Failure case: a Shortcut run calls
`notifications.schedule` with 0.4 s of its 20 s left. The notification is scheduled, but Python raises
`BridgeTimeout`, so the script reports a failure or schedules it again. This was already possible at exactly 0 s
left. The commit widens it to the last 0.5 s, which is a quarter of a 2 s preview or lane run. Fix: when the cut
leaves 0, raise `BridgeTimeout` in Python without calling C, as `net.get` already does (`net.py:149-150`).

**F7, Low: the 0.5 s is not measured on a phone.**
`_pywidget_runtime/device.py:36-39`. On the host, the work after the timeout took up to 150 ms, leaving 0.35 s of
slack. The Simulator runs at Mac speed, so T-3518's green run will not show a phone where lag plus the fallback
render takes more than 0.5 s. Ask: the phone's Run log or T-3518's notes should carry the time from `BridgeTimeout`
to `finished` for Steps, so the number is measured, not guessed.

**F8, Low (docs and text).**
`_pywidget_runtime/device.py:9-11` and the later sentence of the bridge-contract s4 paragraph
(`docs/design/bridge-contract.md:123`) still say the call times out at once "with no budget left". It is now "with
0.5 s or less left". The message at `device.py:79-80` says the wait "was cut to leave 0.5 s to draw" even when only
0.3 s remained. `tests/device/test_device_modules.py:308-311` hardcodes 0.5 instead of
`device.BUDGET_RESERVE_S`.

## Check 3: other ways the phone could still draw only Countdown, and Sunrise

**This fix cannot explain Sunrise going blank.** Sun makes no device call unless its store sets `use_current`
(`sun.py:63-70`), and the reserve changes nothing but `device_call` waits. With no place set, Sun's own run draws
"No place set" in 14-24 ms (probe). Distance on an empty store is the same: no sensor call, so this fix explains at
most Steps and Altitude. Paths this commit does not touch:

1. **Gallery hold by capability text.** `GalleryGrantNeed.of` (`App/Gallery/GalleryPreview.swift:57-62`) reads the
   `CAPABILITIES` line. Sun's line lists `location.when_in_use` ("only with use_current"), so `runAll`
   (`GalleryPreview.swift:175`) never runs Sun's preview until Location is granted. On a phone that has not granted
   Location, Sun, Steps, Distance and Altitude are all held, Countdown is the only free premade that runs, and the
   Pro ones are locked. Idris's T-3393 note has this lead. I think it fits "only Countdown" best on a fresh TestFlight
   install.
2. **Preview `busy` behind the scene-active pass (F3).** It needs no stall at all if any widget run ahead in the
   queue takes more than the preview's 2 s on the phone.
3. **Home Screen:** Sun is not in lane.json, so the extension only draws the `tree.json` the app wrote. If the app
   pass never reached Sun (the app was left, or a pass skipped as spaced), the widget has no tree. The Run log asked
   for in #227 would show this.

No security findings; nothing held.
{% endraw %}

</div>
