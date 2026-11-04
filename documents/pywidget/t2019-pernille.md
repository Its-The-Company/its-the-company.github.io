---
layout: "default"
title: "T-2019: review of 5bfc91948 (T-1927, Idris): notification authorization settled before the bridge test asks"
section: "documents"
description: "Verdict: approve with changes. The helper is bounded, compiles under Swift 6 complete checking (J-20261104-0240 built it), and cannot turn a bridge failure into a pass: it returns before the bridge runs or it skips, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2019-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2019-pernille.md</code></span></div><h1>T-2019: review of 5bfc91948 (T-1927, Idris): notification authorization settled before the bridge test asks</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Read from the diff, `NotificationsCall.swift`, `BridgeTests.run`, `tools/xc.sh`, the MacBook runner
(`tools/macbook-runner/runner.py`) and the result files of J-20261103-2015, J-20261103-2157 and J-20261104-0240 on
`origin/macbook-results`, plus the red Mac mini log `ops/runs/xcodebuild-20261103-014624.log` (grepped, lines 9240-9259).
I did not run Xcode. No finding needed it.

**Verdict: approve with changes.** The helper is bounded, compiles under Swift 6 complete checking (J-20261104-0240
built it), and cannot turn a bridge failure into a pass: it returns before the bridge runs or it skips, and every
bridge assertion after it still runs. But the green evidence does not show what the commit says it shows. The
count is inferred, nobody has named the one skipped test, and the runner's Simulator was probably already settled
before 0240 ran, so the helper's ask path may never have run. F1 and F2 are about that evidence. F3 and F4 are Low.

## What the first red actually was

The commit message and the doc comment (Tests/DeviceModulesSlice2Tests.swift:595) both describe a "120 s
PERMISSION_WAIT_S" stall. The red log says otherwise. At ops/runs/xcodebuild-20261103-014624.log:9255 the error is
`pywidget.errors.BridgeTimeout: notifications.request_permission got no answer in 10 s`. That came from an
`<editor:main.py>` run, where the wait is 10 s, not 120. The test then failed after 72.7 s (Mac mini) and 17.1 s
(J-20261103-2157). A wait of 120 s never happened in this test.

## Findings

**F1 (Medium): the green proof rests on a skip count, and nobody has named the test that skips.**
J-20261104-0240-xc-test/result.json: `BridgeTests ... Executed 110 tests, with 1 test skipped`.
The argument goes: 2157 had 1 skip while the notification test failed, so that skip belongs to some other test;
0240 still has 1, so the notification test did not skip. That <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> only if the same other test skipped in both
runs. Three BridgeTests can skip on a Simulator. `testNetGetPeakFootprintByBody` skips only if the
`FootprintInterval` symbols are missing (fixed for a given runtime). `testPedometerOnTheSimulatorIsUnsupported`
skips only on hardware. `testLocationSampleThroughTheBridge` (DeviceModulesTests.swift:519) depends on xc.sh's
location grant, which xc.sh:110-112 calls "best effort". Suppose the grant failed in 2157 and worked in 0240,
while the notification helper skipped. The count stays at 1, and the run looks the same as the one we got. The
BridgeTests time also went from 68.4 s (2157) to 221.3 s (0240). Nothing in the summary explains the extra 153 s,
and a helper that waits out its full 60 s would fit inside it.

Can the job's full log give a per-test line? Yes, but it never leaves the MacBook. xc.sh:25 writes
`$ROOT/ops/runs/xcodebuild-<ts>.log`, which on the runner is `~/itsthecompany-runner/jobs/<id>/src/ops/runs/`. The
`.xcresult` sits under `{JOB}/derived/Logs/Test`. The runner sends back only the last 60 lines of `output.log`
(runner.py:1541-1546). xc.sh prints the names of failed tests (xc.sh:233) but not skipped ones.
Fix: in xc.sh, print `xc.sh: skipped: <Suite>/<test>` lines next to the `failed:` lines, taken from
`Test Case '-[...]' skipped` in `$LOG` and <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> like the failed list. Then queue one more MacBook run and quote
the line that names the skipped test. That makes the evidence direct, and it helps every test that can skip.

**F2 (Medium): 0240 cannot tell "the helper fixed it" from "the device was already settled".**
The runner reuses one Simulator (kinds.json: `{SIM}` is "made once"). 0240 had no `warm` step, so it ran on the
same device as 2157. In 2157 the bridge asked for `.provisional` and Python gave up after 10 s, but the Swift side
keeps waiting. NotificationsCall.swift:85 `await`s `center.requestAuthorization` with no limit. So the answer could
arrive late and leave app.pywidget `provisional` on that device. If that happened, 0240's helper read
`before == .provisional` and returned at once. The wait for the app to be active and the ask on the main actor
would never have run. The same holds for any run on the Mac mini's FCC3968B. We also still don't know which of
these caused the red: the app not being active, the thread the bridge asks from (the helper asks on the main actor;
the bridge does not), or a first answer on a fresh device that takes longer than 10 s. Because the helper settles
the state first, the bridge's own ask from `.notDetermined` is no longer tested. On a user's fresh install, that
ask is the real path.
Fix: (a) run `-only-testing:PyWidgetTests/BridgeTests/testNotificationScheduleAndCancelThroughTheBridge` once on a
device that has never run the app, either A013E98E (waiting since T-1466) or a scratch device after
`simctl erase`. Have the helper put its diagnosis where the summary keeps it: before status, seconds waited for
active, seconds the ask took. One way is to add that string to the bridge assertions' messages, and to the F1
skipped line when it skips. (b) Correct the doc comment and the T-1927 wording from "120 s" to the 10 s
editor-run BridgeTimeout. (c) Once the cause is named, add one test, or a board row, that has the bridge itself
ask from `.notDetermined` on a fresh device.

**F3 (Low): a late answer, after the 30 s skip, fulfils an expectation that belongs to a test that has ended.**
DeviceModulesSlice2Tests.swift:608-613. `expectation(description:)` registers the expectation with the running
`XCTestCase`. The unstructured `Task { @MainActor in ... }` keeps running after `XCTWaiter.fulfillment` times out
and the helper throws `XCTSkip`. If iOS answers later, `answered.fulfill()` runs during some later test. XCTest
reports that as an API violation (fulfil after the wait context ended), which can land on an unrelated test or stop
the runner. This happens only on the skip path, the path meant for diagnosis.
Fix: `let answered = XCTestExpectation(description: "requestAuthorization(.provisional)")`. A standalone
expectation waited on by `XCTWaiter` can be fulfilled late without harm. Nothing else changes.

**F4 (Low): two waits in the helper have no limit.**
DeviceModulesSlice2Tests.swift:597 and :614. `notificationSettings()` is awaited with no timeout before the
bounded section and again after it. The wait for active (60 x 0.5 s) and the ask (30 s) are bounded, so the stated
worst case is 60 s. But a stuck `usernotificationsd`, the same daemon we suspect here, would hang the test at
line 597 until the job's 5400 s limit, with no skip and no message. Fix: read the status through the same
`XCTWaiter` pattern (a standalone expectation with a 10 s timeout), and skip with "settings did not answer" if
it times out.

## Checks with no finding

- **Can the skip hide a bridge failure?** Not in this code. The helper runs before `withSlice2Router()` and before
  the bridge does anything. It either returns, and then every bridge assertion runs, or it skips, and then the
  bridge never runs. A bridge regression cannot turn into a skip. What a skip can hide is how often the test
  runs at all. That is F1.
- **Bounds:** at most 30 s for the app to become active, plus 30 s for the ask, then the existing
  `run(timeout: 20)`. The two settings reads are F4.
- **Swift 6 strict concurrency:** the test target builds with `SWIFT_VERSION 6.0` and `SWIFT_STRICT_CONCURRENCY:
  complete` (project.yml:8-9), and 0240 compiled it. `MainActor.run` returns an `Int`. The Task captures only the
  expectation, which is Sendable. I see no race.
- **Does `request_permission` need a Swift-side bound at 120 s?** No. In this test the call is an editor run, and
  Python already gives up at 10 s (red log :9255). In the app, the 120 s wait is for a person reading the prompt.
  A Swift limit below 120 s would cut that person off. A Swift limit above it changes nothing they can see,
  because Python has already raised `BridgeTimeout`. The one cost is a suspended Swift task, which stays until iOS
  answers. That task is also what can settle the device's state late (F2), and that matters to the evidence, not
  to users.
- **Message text (no fix line):** the skip messages print `UNAuthorizationStatus` raw values (0 not determined,
  1 denied, 2 authorized, 3 provisional, 4 ephemeral) but explain only the app state's "0 = active". A reader of
  the summary needs that mapping. Change it when touching F2.
{% endraw %}

</div>
