---
layout: "default"
title: "Review of T-4190 at 8db4535c: the Pro store test timeout (T-3745)"
section: "documents"
description: "Nothing from T-3745 can reach TestFlight, because nothing app-facing landed. T-4190 is still open and so is T-3745, so neither has been passed off as done. The red the step exists to fix still stands, and T-3745 still\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4190-8db4535c-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4190-8db4535c-odalys.md</code></span></div><h1>Review of T-4190 at 8db4535c: the Pro store test timeout (T-3745)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-4607, Commandment 13). Author of the step: Idris. Reviewed: what T-3745 landed up to
8db4535c84 on main. `git log --oneline 8db4535c84 --grep=T-3745` finds one commit, 4cac22227b ("ops: <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-b3
records (T-3745 stop event, T-4433 board notes: backed out, still open)"), which adds three ops/lane-outbox records
and no app or test code. There is no ops/board_notes/T-3745.md. So **T-3745 landed no app code**: the step was
stopped unfinished on 2026-11-16 and its board line is still open. Also read, for the state the step must fix:
ios/Tests/ProStoreTests.swift (setUp, tearDown, clearSession, bounded, eventually, the failing test). That file and
ios/App/Store/ProStore.swift are the same at 8db4535c and at this branch's HEAD (030410be76). Paths below are under
pywidget/. Date: 2026-11-17.

Tests:
- `xcodegen generate`, then `XC_TASK=T-4607 tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination
  'platform=iOS Simulator,name=iPhone 17e' -only-testing:PyWidgetTests/ProStoreTests test` exited 75. xc.sh sent it to
  the MacBook runner as a lane job (ops/lane-outbox/a-1794954350074407000-368.json), which is created when this branch
  lands. **Nothing ran here.** That record is committed with this review, so ProStoreTests gets one run on main
  after landing; read it with `python3 tools/jobs.py list`.
- The only ProStoreTests runs in this worktree's ops/runs are 21/21 green (xcodebuild-20261109-102856.log,
  xcodebuild-20261115-163101.log), solo runs, n = 2. They say nothing about the whole-target red the board line cites.

## Verdict: PASS with findings

What landed is records only, and they are true where I could check them:
- The stop event (ops/lane-outbox/b3-1794827799895976000-69827.json in 4cac22227b) was replayed into
  log/events.jsonl (line 3958 at HEAD, time 2026-11-16T06:16:39-5:00 AM) word for word. At 8db4535c it was still in
  the outbox, which is how lane records reach log/. Records and log/ agree.
- "Idris's baseline run exited 75 on the Xcode lock (T-3014)": lane b3's ops/metrics/xc.jsonl has a row for task
  T-3745 at 2026-11-16 6:09:41 AM, exit 75, lock "stalled", log ops/runs/xcodebuild-20261116-060857.log. That agrees.
  xc.sh's header says a T-3014 takeover leaves that run's tree running, which fits the two processes he killed. I
  could not check the pids or the classifier refusal from the repository. Nothing contradicts them.
- The scratch folder the event names exists and holds only OWNER.json (task T-3745, Idris, started 6:08:40 AM), so
  no unlanded patch is waiting there.
- The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch entry (ops/merge_queue_queued.txt, parked/b3/20261116-093352-q122, e30903ca82) is the same
  three-record commit before it was cherry-picked. It holds no code.

Nothing from T-3745 can reach TestFlight, because nothing app-facing landed. T-4190 is still open and so is
T-3745, so neither has been passed off as done. The red the step exists to fix still stands, and T-3745 still owns
it. Two findings in the test code it must touch (M1, L1) change how that red shows up and what it takes down with
it. They are not the root cause and they hold nothing for TestFlight.

## Findings

### M1. A Pro store wait that runs out reports a failure and then goes on, into the race it was there to prevent

- Where: `ios/Tests/ProStoreTests.swift:138-146` (`eventually`: on timeout `XCTFail(...); return`, at :143); its
  callers `clearSession` :51-62, `setUp` :22 and :26, `tearDown` :36; the failing test
  `testClearRightAfterAnOutsidePurchaseLeavesNothing` :225-232.
- The failure: `eventually` does not throw when its 10 s run out. It records the failure and returns, and the
  caller carries on. In `clearSession` the first wait is there so `session.clearTransactions()` does not run while a
  purchase is still on its way to the app (T-0530: without it the clear lost 5 of 5 times). If that wait runs out
  under load, the clear runs anyway (:55), which is the losing case. The second wait then usually runs out too, and
  `setUp` or the test body carries on with a session that is not clear. In `tearDown` (:36) the same thing leaves a
  purchase in flight for the next test's `setUp`. One slow StoreKit answer can then turn red in tests that did
  nothing wrong. The board line says ProStoreTests run alone "went 21/10 red in a different test", which fits a
  cascade like this. That fit is my reading of the code, not something I measured.
- There is also a budget mismatch. Each poll is bounded at 30 s (:80, :142) but the whole wait gets only 10 s
  (:138), a figure from the solo runs of 2026-10-28. The board line quotes T-2549's note as "13 ProStoreTests StoreKit 30 s under load". So in
  the whole target, the 10 s wait is the likely first thing to fail, and the red then names a timeout, not a cause.
- Fix: make `eventually` throw on its deadline, a named error the way `bounded` throws `StoreKitStall`, so the test
  stops at the first wait that ran out and its message names that wait. Size `clearSession`'s two waits from the
  whole-target runs, not the solo ones. A red after the fix then names one wait and stops there, which is what
  T-3745 needs in order to find its wait.
- Test: a test that runs `eventually` against a condition that never comes true with a 1 s timeout, and requires
  that it throws within about 2 s and that the next line does not run. That mirrors
  `testACallThatNeverReturnsFailsAtTheDeadlineInsteadOfHoldingTheRun` (:168-179).

### L1. A bounded StoreKit call that answers after its deadline still fulfils its expectation

- Where: `ios/Tests/ProStoreTests.swift:80-94`. The expectation comes from the test case at :82, is fulfilled
  unconditionally at :86, and is cancelled at :90.
- The failure: on the deadline `bounded` cancels the task and throws. A StoreKit await can ignore cancellation
  (the comment at :166 says so), and when it does come back the task still calls `done.fulfill()` after the wait has
  ended. That may be after the test itself has ended. XCTest treats a fulfil after the wait as an API violation and
  can pin it on whatever test is running then. So one stall can show up as a red in a later, unrelated test. That is
  the same "red in a different test" symptom as M1, from a second source. I have not seen this in a log. It is a
  reading of the code and of XCTest's rules.
- Fix: use a standalone `XCTestExpectation(description:)`, and fulfil it only if the deadline has not passed. For
  example, `Slot` could carry a main-actor `expired` flag that the caller sets before it throws, and the task checks
  that flag before it fulfils.
- Test: in the never-returns test, let the continuation resume about 1 s after the deadline, then wait 2 s. The
  test must stay green with no API-violation line in the log.

### I1. (Information, no work) T-3745's red cannot be re-read from any log I could find

- The board line cites `ops/runs/xcodebuild-20261108-213651.log` (lane b2). It is not in lane b2's ops/runs, and
  lane b3's 11-16 run log is gone too. ops/runs is per worktree and gets cleaned. The board line also says nothing
  about the 11-16 attempt. The likely cause Idris named ("clearSession waits only on Transaction.all", that is,
  the first wait at :51-54 does not check currentEntitlements) is only in log/events.jsonl.
- No board line, because this is a record and not a defect. Whoever picks T-3745 up next should start with
  log/events.jsonl at 2026-11-16T06:16:39, and should put the failing lines of the next red run in
  ops/board_notes/T-3745.md so they outlive the log.
{% endraw %}

</div>
