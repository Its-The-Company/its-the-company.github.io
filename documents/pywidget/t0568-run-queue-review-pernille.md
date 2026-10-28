---
layout: "default"
title: "T-0573 review: 463137aa (T-0567), d6ac94b7 (T-0568), 175d3653 (T-0574)"
section: "documents"
description: "Fix lines for Idris (all P2): T-0576 (F1), T-0577 (F2), T-0578 (F3), T-0579 (F4)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0568-run-queue-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0568-run-queue-review-pernille.md</code></span></div><h1>T-0573 review: 463137aa (T-0567), d6ac94b7 (T-0568), 175d3653 (T-0574)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28. Read from `git show` and the files on main at 2a4833ad,
without the author's notes. Checked against `docs/design/ide/home-setup.md` s7.4, `docs/design/ide/run-screen.md`
(`confirm.*`), and my T-0515/T-0571 review ([`t0515-ipad-windows-review-pernille.md`](t0515-ipad-windows-review-pernille.html), M1 and H2).
Runs (iPhone Simulator, PyWidgetTests, through `tools/xc.sh`): `ops/runs/xcodebuild-20261028-133229.log`,
`-133340.log`, `-133721.log` (mutant and probes), `-133811.log` (clean code). Every mutant and probe was reverted.
The tree is as committed.

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdicts, scrolls sideways" style="--tw:640px" markdown="1">

| Commit | Verdict |
|---|---|
| 463137aa (T-0567 close-a-running-window UI test) | **Approve.** |
| d6ac94b7 (T-0568 one run at a time across windows) | **Approve with fixes** (F1, F2, F3). The code is correct as far as I can read it. The fixes are a test that does not reliably pin its claim, copy that Maren has not seen, and two Restart lines that no test checks. None of them changes the binary's behaviour, so none of them <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> TestFlight. |
| 175d3653 (T-0574 bounded StoreKit waits) | **Approve with fixes** (F4). `bounded()` is sound, but the commit's "every StoreKit read, purchase and restore" is not true yet. |

</div>


Fix lines for Idris (all P2): T-0576 (F1), T-0577 (F2), T-0578 (F3), T-0579 (F4).

## Findings, by severity

### F1 (Medium, d6ac94b7): "B's Stop leaves A alone" is not reliably pinned
`pywidget/ios/Tests/BridgeSlice2Tests.swift:250-272`, assertion at `:266`.

Now that a second window's Run is refused, the UI can no longer queue B behind A, so no UI test can reach B's
Stop on a queued run. That makes this bridge test the only pin. Its check, `XCTAssertNil(log.finished(a))`, runs
the moment B's `finished` arrives. A Stop that wrongly reaches A ends A a few milliseconds later, so whether the
check sees it depends on timing.

Mutant: in `PyBridge.stop` (`App/Bridge/PyBridge.swift:556`), after the queued run's `emitFinished`, also stop
the current run (`let cur = lock.withLock { currentRun }; if cur != 0 { stop(runID: cur) }`). With that mutant
the test passed in `-133229` (1 of 1), failed in `-133340` (1 of 1) and failed 7 of 10 in `-133721`
(`-test-iterations 10`). That is **green in 4 of 12 runs**, so it catches the bug only part of the time.

Fix (probe tested): after B's `finished`, sleep 300 ms, then assert that A has not finished, send A its line
with `provideLine(runID: a, waitID: <A's inputRequest waitID>, line: "Ada")` and expect it to be accepted, then
require A's outcome `ok` with `A Ada` on its stdout. With the same mutant, this probe was red on four asserts
(`-133340`: "the current run ended after the queued run's Stop", "A no longer waits for its line",
`interrupted` not `ok`). On clean code it was green 5 of 5, alongside the original 5 of 5 (`-133811`).

### F2 (Medium, d6ac94b7): three new user-facing strings are not in any words table
`App/PyWidgetApp.swift:294-296` (`busyLine`), `:302`, `:306`.

The strings are "X is running in another window. Stop it there, then run here.", "Restart stops X in another
window." and "Restart in X stopped this run." `grep` over `pywidget/docs/` finds none of them. The code comment
marks the first as DRAFT, but Maren's copy check covers only the tables, so these three never reach her
(<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). Fix: add the three as DRAFT rows in the run-screen.md strings table, next to `confirm.*`, so
she can check them.

Against s7.4: the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> for case (a), an editor run meeting another run, is the "Stop X and open Y?" alert with
X as the file name. This commit ships the interim my T-0515 M1 asked for: a console line that names the other
window's file and never queues. It does name the file (`fileTitle`, "word_count.py" in the UI test, "Another
script" when the window has no file). So it matches the interim, but not the s7.4 alert, which is still
T-0505's. One more point for T-0505: a console line is not read out by VoiceOver, and an alert is. That is a
reason to keep the alert as the real fix rather than to add an announcement now.

### F3 (Low, d6ac94b7): the Restart lines about the other window are untested, and one can be false
`App/PyWidgetApp.swift:300-310`; `Tests/ConsoleModelsTests.swift:166-179`.

- `testRestartTellsEveryWindow` has no live run in the other window, so `other` is nil. Deleting `:302` or `:306`
  leaves every test green (by reading: no test checks either string).
- "Restart stops X in another window." is said **before** `PyBridge.restart()`. If Restart is refused (stuck),
  the line is false and is followed by "Restart refused". It is also false when X is only queued behind a
  background run. `restart()` stops only `currentRun`, and a queued run survives the reset and runs afterwards.
- Fix: say the naming line after `restart()` returns, and only when X's run actually ended (its `running` went to
  0, or its ID was the bridge's current run). Add a unit test with the real bridge: A runs `input()`, B restarts.
  Then A has "stopped this run", B names A's file, and both have "Restarted:".

Every window does get Restarted. `every` is `models.values` plus the spare (`SceneFile.swift:75`), so all live
windows are covered, and discarded windows are rightly left out. `testRestartTellsEveryWindow` pins it: the
author's restart-to-self mutant is red at `ConsoleModelsTests.swift:177` in `-124229.log`.

### F4 (Medium, 175d3653): StoreKit awaits outside `bounded` remain in four tests
`Tests/ProStoreTests.swift:300, 305` (`testEntitlementChangeReloadsWidgetsOnce`: `counted.purchase()`,
`entitlementCatchUp?.value`); `:330, 333, 340, 350` (`testPendingThenRestoreNothingLeavesBuyEnabled`: PaywallModel
load, buy, restore); `:360, 364, 373, 377, 383-387` (`testFailedRestoreShowsItsOwnLineOnBothScreens`); `:394, 395`
(`testRefundWhileThePurchasedScreenIsOpenReturnsToTheOffer`); `session.buyProduct` at `:198, 210, 235, 424`.

Each of these calls StoreKit (Product load, purchase, `AppStore.sync`, the test session). A stall in any of them
holds the run until xc.sh's 20-minute limit, which is exactly the 12:47 failure this commit is meant to fix.
Fix: put these under `bounded` too. `PaywallModel` calls are `@MainActor` and fit the helper as written. Then add
a backstop for any await missed in future: `executionTimeAllowance = 120` in `ProStoreTests.setUp`, with test
timeouts turned on for PyWidgetTests in the scheme (or `-test-timeouts-enabled YES` in the unit-test call).
That way any single unbounded wait fails one named test within about 2 minutes.

### F5 (Info, 175d3653): `bounded()` cannot flake on a late answer; its leak is bounded and accepted
`Tests/ProStoreTests.swift:77-91`.

- Late return, probed (`-133229`): an op that returned 1 s after a 0.5 s deadline inside the same test, and one
  that returned about 3.5 s after its test ended while the next test was running. Neither raised an XCTest
  "fulfill after the wait context" violation, and neither failed a test. A late `done.fulfill()` is harmless, and
  a late result goes only to its own `Slot`.
- Leak: on a real stall, `task.cancel()` cannot wake an await that ignores cancellation, so the task and what it
  holds (the old store, the expectation) stay suspended for the life of the test process. That is one small
  object graph per failed test, which is acceptable for a test that has already failed. Its later writes touch
  only the store the test captured. `tearDown` gives the next test a new store.
- No main-thread block: the wait is `await XCTWaiter.fulfillment`, so the main actor stays free for the op.
- `testACallThatNeverReturnsFailsAtTheDeadlineInsteadOfHoldingTheRun` (`:152`) is a real test. An unsafe
  continuation that is never resumed ignores cancellation, as a stuck StoreKit await would. The test asserts the
  named `StoreKitStall` and less than 5 s elapsed, and it passed in 1.10 s (`-133229`). Without the deadline it
  would hang, and without the throw it would fail with "came back".
- Small: `eventually` bounds each read at the 30 s default, so one stalled read reports after 30 s, not after
  the poll's 10 s. The message names the read ("the read inside: …"), which is what matters.

### F6 (Info, d6ac94b7): the bridge change is race-free as far as I can read it
`App/Bridge/PyBridge.swift:534-559`. There are three orderings with the script loop. (1) Stop finds the run still
queued: it removes it, clears `cancelledQueued`, and emits once. (2) The loop dequeued it but `doRun` has not
taken `lock`: Stop's `jobs` search finds nothing, and `doRun` finds the ID in `cancelledQueued` and emits once.
(3) `doRun` already set `currentRun`: Stop takes the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> branch. So there is never a second `finished`, and the
author's test pins one finished at `:271`. A queued widget run's busy timer is cancelled before the emit.
Pre-existing, not from this commit: Stop on an ID that has already finished leaves it in `cancelledQueued` for
good. It is harmless because IDs are never reused.

### F7 (Info, 463137aa)
- The close hook is `#if DEBUG` and keyed on a launch argument, so it is not in a TestFlight (Release) build.
- The second tap (`SceneWindowsUITests.swift:162`) could start a second run if the first run ended within 3 s.
  word_count waits in `input()`, so this cannot happen here, and the assertion holds either way. The author's
  mutant (close() without stop()) is red, and the test is green in `-123523` and `-123958`.
- The `discard` log line records only the session ID and run number, with no user data.
- My T-0569 hermeticity point still applies: "window A holds word_count, or whatever file the launch restored".

## Questions the task asked
- **Refusal line against s7.4:** it names the other window's file and never queues, so it is the agreed interim.
  The s7.4 alert is still T-0505's. The copy is not in a table yet (F2).
- **"B's Stop leaves A alone" pinned by the bridge test:** only part of the time. The mutant was green in 4 of 12
  runs. F1 has a probe-tested fix.
- **Every window gets Restarted:** yes, and it is pinned. The lines naming the other window are not (F3).
- **`bounded()` flake or leak:** no flake on a late answer (probed). It leaks one suspended task per real stall,
  which is acceptable. The never-returning test is real. Its coverage is incomplete (F4).
{% endraw %}

</div>
