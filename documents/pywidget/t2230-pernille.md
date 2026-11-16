---
layout: "default"
title: "Review: T-2230, the deadline mark on a lane row (749b555036, Idris)"
section: "documents"
description: "Since 749b555036, eight commits touched these files (T-3895, T-4152, T-4280, T-2491 twice, T-4521, T-3282, T-3310). None of them moved a T-2230 line: firstDue (ExtensionLane.swift:200, :274, :286, :298), the row check\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2230-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t2230-pernille.md</code></span></div><h1>Review: T-2230, the deadline mark on a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> row (749b555036, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4032, 2026-11-16 (written at 12:05 PM ET). Independent review (Commandment 13). I read the
diff, the two files as they stand on personal/a2 at 55f7702836 (749b555036 is on main and an ancestor of this
branch), the T-2230 board line (log/board-archive.md, done 11-11), the finding it fixes (T-2177 F3 in
t2177-extensionlane-pernille.md) and the line folded into it at the 11-07 prune (T-2495, T-2272 F5 in
t2272-pernille.md). Test run: see "Tests" at the end.

Since 749b555036, eight commits touched these files (T-3895, T-4152, T-4280, T-2491 twice, T-4521, T-3282, T-3310). None
of them moved a T-2230 line: `firstDue` (ExtensionLane.swift:200, :274, :286, :298), the row check (:421-423) and
`upTo(until:)` (:657-667) read exactly as in the diff. The row is now further from the run's end than it was (T-4280's
LaneChoice judge and T-3895's start-failure rows sit between `run` and the row), which matters for L2.

**Verdict: PASS with findings.** The fix is the one F3 asked for, and the concurrency is sound: `firstDue` is set,
lowered and cleared under the same lock as `inFlight`, the turn cannot read it before it is set, and both sides use
the same clock. The race F3 named (a run ending between the caller's deadline and the caller's flag) is gone,
because there is no flag. Two Lows (T-4589, Idris): the new test does not tell the old code from the new, and the doc comments claim
a tighter meaning for `deadline` than the clock rule gives. No FIX FIRST: nothing here blocks TestFlight.

## What I checked

**1. firstDue bookkeeping under the lock.** Set to `mine` when the turn is made (:298), in the same `withLock` that
stores `inFlight[id]` and `due[id]`; lowered with `min` by every joiner (:274); cleared with `inFlight` and `due` in
the turn's end hold (:286). The turn's Task is created inside the lock (:279) and its first act that touches state
(`takeTurn` -> `lock.withLock { closed }`, :323) needs the same lock, so it cannot run before `firstDue[id]` exists;
the end hold likewise cannot run before it. `min`, not first-come, is right: two callers compute `mine` before the
lock (:270), so the later-stamped one can reach the lock first and make the turn; the earlier one then joins and
lowers it. A caller that joins after the row (between :421 and the end hold) has a later `mine` and cannot move it.
A closed lane makes no turn and sets nothing (:281).

**2. Row time against the caller's `upTo(until:)`.** The caller now sleeps until the same `mine` it registered
(:312, :663), on `.continuous`, the clock `mine`, `due` and the row check all use. The old `upTo(seconds)` started
its own `now` after the lock, a few microseconds after `mine`; the new overload removes that skew, and the seconds
form now just forwards (:652-654). ContinuousClock counts time the extension spends suspended, so a widget process
frozen mid-run and thawed past its deadline marks the row, which is the honest answer. A `mine` already past (the
lock held long) makes `Task.sleep(until:)` return at once; the caller answers `.deadline` and the row agrees.

**3. Deadlock and lost wake-ups.** The row check is a single read under `lock` with no await inside (:421). No path
takes `lock` while holding another lock: `Once` has its own and never calls out under it. Both of `upTo`'s detached
tasks always resume `Once`, and only the first counts, so the caller cannot hang and cannot be resumed twice.

**4. Removing `overdue` loses nothing.** `overdue` had one writer (the caller after `upTo` returned nil, while
`inFlight[id] == turn`) and one reader (the row). Every case it marked, the clock now marks: a caller whose deadline
passed while the turn was queued or running has `mine <= now` at the row. The `late`, `closed`, `oom_guard` and
start-failure rows never read it, then or now. The answered-in-time case stays unmarked and is pinned
(testEachRunWritesItsRowAndStatus, Tests:1278).

**5. The new test (Tests:1304).** Not flaky: the fake run's hang is `Task.sleep(for:)` on the continuous clock
(Tests:84), started after `mine` was stamped, so the row is always at or past `mine`; each pass uses its own id and
lane and waits up to 2 s for the row. But it does not pin the change; see L1.

**6. T-2495 (my T-2272 F5), folded into this line.** F5 said a caller whose deadline passes after the row and before
the turn returns answers `.deadline` with no mark on the row, "yet WidgetKit drew the cached tree". The second half
was wrong, and I own it: the tree is written by `sink.finish` inside the run (ExtensionLane.swift:730), before the
row, and the provider ignores the outcome and draws whatever tree.json holds (Widget/PyWidget.swift:47). A caller
answered in that window draws this run's tree, so no mark is the correct row. That gap needs no fix; the words for it
are part of L2.

## Findings

**L1 (Low): the new test passes on the old code, and nothing pins `min` across callers.**
The test's own comment says so (Tests:1298-1303): with `hang == deadline` the old flag also passed at n=20, because
the caller's wake beat the run's end by the milliseconds the turn spends on marker and folder work. That was the test
I proposed in F3; the author ran it and reported honestly that it does not discriminate. So no test fails if the row
goes back to a flag set by the caller. Separately, no test fails if the joiner line (:274) overwrites instead of
lowering, or if the row reads `due` (the latest caller) instead of `firstDue`: the one test with a late joiner
(testATurnThatStartsAfterItsFirstCallerAnsweredLeavesThatAnswerOnItsOwnClock, Tests:536) writes no row.
**Fix (test only):** (a) a joiner test with `logWord: "ok"`: caller one, then a joiner 0.3 s later on the same id,
deadline 0.5, hang 0.6; the run ends after the first caller's deadline and before the joiner's, and the row must say
`deadline`. Seed the two mutants (`firstDue[id] = mine` on join; `due` in the row check) and confirm both fail.
(b) Optional: make `upTo`'s sleep injectable like `nap`, hold the caller's wake past the run's end, and assert the row
still says `deadline`; that is the one test that tells clock from flag.

**L2 (Low): the doc comments promise more than the clock rule gives.**
The key's doc (ExtensionLane.swift:139-141) says `deadline` means "a caller was answered from the cached tree before
the run ended", and `firstDue`'s (:196-197) says the caller "answers on the same instant". Neither holds exactly:
- The clock is read at the row, not at the tree. Between `sink.finish` (:730) and the row (:421) come the peak read,
  `files.record(peak:)` (:406), `clearMarker` (:408) and the LaneChoice judge. A tree written just before the deadline
  is drawn by the caller, yet its row says `deadline`.
- The caller answers when its sleep task wakes, which can be after the turn's end under load; `Once` takes whichever
  task is first (:661-664), so the caller can get `.wrote` while the row says `deadline`.
Both over-report, by milliseconds, which is the safe direction for 7.5's gate evidence; neither loses a real
deadline. **Fix:** stamp `let ended = ContinuousClock.now` right after `await run(id, entry)` (:397) and compare that
with `firstDue` at the row, so the mark means "this run's result came at or after its earliest caller's deadline";
and reword :139-141 and :196-197 to say exactly that, including that the caller's own answer can still be the run's
when its timer wakes late, and that a deadline passing after the result (T-2495's window) is rightly unmarked.

## Tests

Command: `xcodegen generate` in pywidget/ios, then from pywidget/ios `XC_LOCAL=1 XC_TASK=T-4032 tools/xc.sh -scheme
PyWidget -destination 'platform=iOS Simulator,name=iPhone 18 Pro' -only-testing:PyWidgetTests/ExtensionLaneTests test`.

**Green: ExtensionLaneTests 106 run, 0 failures, 0 skipped** (xc.sh exit 0, 2026-11-16, the run ending at 12:11 PM
ET, full log ops/runs/xcodebuild-20261116-115237.log). testARunEndingAtTheDeadlineStillSaysSoInItsRow passed all 20
passes in 4.5 s, so the n=20 run the T-2230 done-note said was "not on record" is now on record. The first try, at
11:46 AM ET, exited 75 after a 296 s lock wait (a waiter took the lock); nothing ran in it and it counts for nothing.

Not run: the mutants in L1 (they need the new tests first), and the full PyWidgetTests suite.

Board: L1 and L2 are T-4589 (Idris, P3).
{% endraw %}

</div>
