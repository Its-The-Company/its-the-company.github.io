---
layout: "default"
title: "Review of ce50b921: T-4782, a Pro store test stops at its first wait that runs out"
section: "documents"
description: "PASS with findings. A Pro store wait that runs out now stops setUp, the body or tearDown at that wait; the mutant shows the clear is never reached, tearDown stops at its own wait, and the case ends in 21 s with two\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4782-ce50b921-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4782-ce50b921-pernille.md</code></span></div><h1>Review of ce50b921: T-4782, a Pro store test stops at its first wait that runs out</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4932, Commandment 13). Author: Idris. Reviewed: ce50b921 as a whole (5 files; the author's two
memory files are in the diff and were not read), with its follow-up 282623083f (same task, `lateAnswersDropped`),
against M1 and L1 of [`pywidget/docs/reviews/t4190-8db4535c-odalys.md`](t4190-8db4535c-odalys.html). Line numbers are at HEAD d79a2425ed;
`ProStoreTests.swift` has changed since ce50b921 only in 282623083f (+4 lines above the cited code) and in T-4679
(a16af47842, below line 696, not this work). Date: 2026-11-19.

## Tests run

All with `xcodegen generate` first, `XC_LOCAL=1 XC_TASK=T-4932 tools/xc.sh -scheme PyWidget`, iPhone 17e by id.

- HEAD d79a2425ed, `-only-testing:PyWidgetTests/ProStoreTests`, first try: exit 75 after a 684 s lock wait (a waiter
  took the lock from a stalled run; empty log `xcodebuild-20261118-234554.log`). No result.
- HEAD again: 23 executed, 0 failures, exit 0 (`ops/runs/xcodebuild-20261119-004030.log`), machine load 370-510.
  The M1 test printed "eventually threw WaitRanOut after 1.025136458 seconds on a 1 s deadline" and passed (1.075 s);
  the L1 test passed (4.592 s); no "API violation" line in the log.
- Mutant, on a `git archive` copy of HEAD in my scratch folder: clearSession's first wait made never true (its
  condition returns `false`), plus a print just before `session.clearTransactions()`,
  `-only-testing:PyWidgetTests/ProStoreTests/testLoadsTheFlagFilesProduct`: exit 65, KILLED (scratch log
  `xcodebuild-20261118-235958.log`). Two failures, both `caught error: "waited 10.0 seconds and it did not come true:
  every session purchase reaches the app's StoreKit before the clear"` at `ProStoreTests.swift:183` in the copy (the
  throw in `eventually`): one from setUp, one from tearDown. The print never appeared, so neither clear ran after
  its wait ran out, and the test body did not run. The case took 21.3 s (two 10 s waits): no hang.
- `python3 tests/site_how_it_works_test.py`: 58 passed, 0 failed (the new purchases.md step and the Tests copy).
- <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> logs: the two new tests in the 27 run logs from 2026-11-17..19 that ran them (every lane's `ops/runs`, as the
  commit message used; my HEAD run is one of them). The L1 test passed 27 of 27. The M1 test passed 26 of 27; the
  one red is the author's own old-helpers mutant (`a/ops/runs/xcodebuild-20261117-190935.log`), as intended. The
  real code took 1.016 to 1.039 s; the mutant's run of the same polling loop took 1.407 s.

## Question 1: does a test really stop at the first wait that runs out?

Yes. `eventually` (`ProStoreTests.swift:176-184`) throws `WaitRanOut` at :181 instead of `XCTFail` and return. All
three of its callers' paths propagate the throw: `setUp` :33 and :37, `tearDown` :47, `clearSession` :63 and :70,
and every test body call is `try await` with no `try?` and no catch-all. The only `do/catch` blocks around a wait
(:213, :228, :261) catch one concrete type, so any other error still fails the test. The mutant shows the stop
in practice: the clear is never reached and tearDown stops at its own first wait. A setUp throw is reported by
XCTest as a failure plus "Test skipped: threw error", and xc.sh still counts the case as failing (exit 65).

## Question 2: does it weaken what the ProStore tests assert?

No. A wait that runs out was a recorded failure before and is a thrown failure now; the name of the wait is in the
message both times. `clearWait` (10 s, :24) equals the old default, so no wait got shorter or longer. The two new
tests add checks; none was removed or loosened. 282623083f adds `lateAnswersDropped == 1` (:269), which makes the
L1 test <span title="A test written in advance. If it fires, we drop the idea.">kill</span> a `bounded` that fulfils unconditionally (the author's 11-17 mutant showed it did not before).
`lateAnswersDropped` is per instance, and XCTest makes one instance per test, so a late answer from another test
cannot change it.

## Question 3: did product code change?

No. ce50b921 touches `ProStoreTests.swift`, `docs/how-it-works/purchases.md`, `tests/site_how_it_works_test.py`
(the fixture copy now includes `pywidget/ios/Tests`) and the author's memory files. Nothing under `ios/App`,
`ios/Shared`, `ios/Widget` or `ios/StoreKit`.

## Findings

### L1 (Low): the M1 test's 2 s ceiling leaves 1 s for a machine at load 500

`ProStoreTests.swift:236`: `XCTAssertLessThan(took, .seconds(2), ...)`. Each poll runs a `bounded` read (a new Task
and an `XCTWaiter`) and a 100 ms sleep, so the time past 1 s grows with load. The real code measured 1.016 to 1.039 s in 26 runs,
but the same loop took 1.41 s once on 11-17 and this Mac ran at load 300-500 tonight. A red here would be a flake,
not a finding. The floor at :235 (`>= 1 s`) already proves it waited; the ceiling only has to prove it did not hang,
and its sibling test uses 5 s (:216).
**Fix (Idris):** ceiling 5 s.

### L2 (Low): the Slot comment says more than the code guarantees

`ProStoreTests.swift:89-90` says the task "either fulfils before that (and the waiter sees it) or never". Between
`XCTWaiter.fulfillment` timing out (:114) and `bounded` resuming on the main actor to set `expired` (:116), the
task can run first, see `expired == false` and fulfil. Nothing breaks, because the expectation is now a standalone
one (:108) and a late fulfil of it is pinned on no test. That is the real fix for Odalys's L1; the flag narrows the
window and gives the test something to count. Only the comment is wrong; such a fulfil is also not counted in
`lateAnswersDropped`, so the comment should not suggest that count is exact.
**Fix (Idris):** reword :89-90 to say this.

### Note (no work): where the red points

Every `WaitRanOut` red points at :181 (the throw), not at the caller's line, as the old `XCTFail` pointed at its
own line. The message names the wait, which is enough to find it; passing `#filePath`/`#line` through `eventually`
would be a nicety, not a fix.

## Verdict

**PASS with findings.** A Pro store wait that runs out now stops setUp, the body or tearDown at that wait; the
mutant shows the clear is never reached, tearDown stops at its own wait, and the case ends in 21 s with two named
failures, not a hang. No assertion is weaker, `bounded`'s late answers can no longer fail another test, and no
product code changed. ProStoreTests is 23/0 at HEAD. L1 (a 2 s ceiling that can flake under load) and L2 (a comment
that overclaims) go to Idris as one board line: T-5049.
{% endraw %}

</div>
