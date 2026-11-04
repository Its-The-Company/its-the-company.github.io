---
layout: "default"
title: "T-2014: review of a8d0bde99 (T-1851, T-1838 F2): a late lane turn neither runs nor writes ext.marker"
section: "documents"
description: "Verdict: approve with changes. The fix closes F2 as I wrote it: the turn now gets its caller&#x27;s deadline, and a late turn returns before anything writes. There are no blockers. All four findings are Low. F1 and F2 should\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2014-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2014-pernille.md</code></span></div><h1>T-2014: review of a8d0bde99 (T-1851, T-1838 F2): a late <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> turn neither runs nor writes ext.marker</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. 2026-11-04. Read from the diff and the tests: `git show a8d0bde99`,
pywidget/ios/Shared/ExtensionLane.swift at HEAD (763bf8b63, unchanged since a8d0bde99), Tests/ExtensionLaneTests.swift,
Bridge/PyBridge.swift (stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>, budget), Bridge/BridgeLimits.swift, Widget/PyWidget.swift (the caller), and the
lane bench files pywidget/ios/bench/t0675-lane-premades-bench*.jsonl. Nothing was built or run. Xcode was not used.

**Verdict: approve with changes.** The fix closes F2 as I wrote it: the turn now gets its caller's deadline, and a late
turn returns before anything writes. There are no blockers. All four findings are Low. F1 and F2 should land before the (c)
flag opens. F3 and F4 can come after.

Full suite J-20261104-0322-xc-test (on 763bf8b63): **still queued** when I wrote this (one job ahead; the runner was busy
with J-20261104-0240). I have no result to quote. The red/green record in pywidget/ios/bench/t1851-late-turn.txt is the
author's own local run.

## What I checked and found sound

- **The guard's position.** ExtensionLane.swift:146 comes after the Pro gate (`await mayRun`, which can wait on
  StoreKit, so the clock is read after that wait) and after the marker demotion (a marker found here belongs to an
  earlier process, so acting on it is correct even for a late turn). It comes before `LaneMargin.allows` and
  `files.writeMarker()` (:150). Nothing between :146 and :150 awaits: `headroom()`, `files.lastPeak()`,
  `footprint.residue()` and `writeMarker()` are all synchronous. A turn cannot pass the check, get suspended, and then
  write its marker late. The first suspension point is `await run(...)`, which comes after the marker. That is
  F1's territory, not a hole in the guard.
- **The clock.** `ContinuousClock` is monotonic and keeps counting through sleep. If the process was suspended while a
  turn waited, the turn comes up with less time left and skips. That is the safe direction. `upTo`'s `Task.sleep(for:)`
  also uses the continuous clock, so the turn and its caller measure the same time. `due` is read before `upTo`'s timer
  is armed, so the turn's horizon ends a few microseconds before the caller's. Also safe. (The bridge's budget counts
  `DispatchTime` uptime, which stops during sleep. That mismatch predates this commit and does not affect a check made
  before the run.)
- **Concurrent refresh.** `inFlight` and `lastTurn` are still set under `lock`. A skipped turn returns at once, so the
  turn queued behind it starts sooner and makes its own check against its own `due`. Order is kept. A refresh that
  lands between `takeTurn` returning and `inFlight[id] = nil` joins a finished task and gets `.deadline`. That window
  existed before for every outcome.
- **The joiner uses the first caller's deadline.** Every caller has the same `deadline`, so the first caller's `due` is
  the earliest of the group. The turn can never run past it because of a joiner. That direction is safe. The cost is in
  F4.
- **The face.** PyWidget.swift:37 ignores the outcome and draws tree.json as it stands. A skipped turn draws the cached
  tree with its own `sampled_at`/`stale_after`, so the age line and the stale face show its real age. That is correct
  under the face rule. Nothing claims a fresh run happened.

## Findings

### F1. Low: the 2.25 s margin is the ladder's repeat interval, not a measured finish, and it has no slack for work outside the budget

ExtensionLane.swift:24 (`turnNeedsSeconds = budgetSeconds + BridgeLimits.stopRepeatSeconds`).

`stopRepeatSeconds` is how often the ladder repeats step 0 (PyBridge.swift:655). It does not measure when a script
that obeys the stop has ended. A turn that passes the check with exactly 2.25 s left must fit all of this in 0.25 s:
- **Before the budget starts:** the marker write and `bridge.start`. The bridge counts the budget from `queuedAt` in
  `run` (PyBridge.swift:792-796), so a cold `bridge.start` (ExtensionLane.swift:217) is outside the budget. The lane
  bench measures cold starts at 63-137 ms (first `started` line per pid in t0675-lane-premades-bench*.jsonl). A late
  turn pays this when it is the first in its process to start Python, for example behind turns that returned
  `.locked` after a slow StoreKit gate.
- **After the budget:** how long step 0 takes to land (unmeasured on device; my T-1143 Python-thread watchdog took about
  93 ms median at load 60, which is a different mechanism but the same GIL wait), then the `finished` record,
  `sink.finish` writing tree.json under `state.lock`, the footprint read, and `clearMarker`.

Failing case: a lane widget whose script runs to its budget and stops on step 0, queued so that it comes up with
2.25-2.4 s left, in the process's first Python run, on a loaded phone. `clearMarker` lands after its caller has
answered, which is exactly the F2 window. A wrong demotion is sticky and visible to the person. A skipped turn costs
one refresh. Those costs are lopsided, so the margin should err high.

Fix: measure first. In the lane bench (PYWIDGET_LANE_FORCED), use `while True: pass` with the 2 s budget, both warm and
cold, and record the time from the guard to `clearMarker`. Set `turnNeedsSeconds` to the measured p95 plus 0.1 s.
Until there is a number, use `budgetSeconds + 2 * stopRepeatSeconds` (2.5 s). It costs little: a turn only lands in the
2.25-2.5 s band when the turns ahead of it took 1.5-1.75 s together. Update `testTheADRsNumbers` to match, and put the
measurement's path in the doc comment.

### F2. Low: the test does not pin the margin; an off-by-margin guard passes

Tests/ExtensionLaneTests.swift:273-291 against ExtensionLane.swift:146.

In the test, b's caller asks at about 0.05 s (`due` about 4.05) and its turn comes up at about 1.5 s, with **about
2.55 s left**. c's caller asks at about 0.1 s (`due` about 4.1) and its turn comes up at about 3.0 s, with **about 1.1 s
left**. Any threshold between 1.1 and 2.55 s passes. `testTheADRsNumbers` pins the constant but not what the guard
compares against. Mutants that survive by reading:
`>= .seconds(Self.budgetSeconds)`, `>= .seconds(deadline / 2)`, `>= .seconds(1.5)`, and `>= .seconds(turnNeeds - 0.5)`.
Mutants the suite catches: removing the guard (the author's red run), moving it after `writeMarker` (marker
assertion), and computing `due` inside the detached task (c would have 4 s left and run). I did not run these mutants.
This is arithmetic from the test's timings. tools/mutation_check.py runs Python suites, and these tests run only under
xc.sh.

Fix: add a case that uses the injectable `turnNeeds` on either side of b's 2.55 s. With `turnNeeds: 2.9`, b must
return `.deadline`, write no marker, and never call `run`. With the default 2.25, b runs (already covered). That <span title="A test written in advance. If it fires, we drop the idea.">kills</span>
every mutant listed above, and each assertion keeps a margin of 0.3 s or more, enough for a loaded runner. A cleaner
alternative: pull the comparison out as `static func startsInTime(left: Duration, needs: Double) -> Bool` and test it at
needs - 0.01, needs and needs + 0.01. Keep the timing test for the wiring.

### F3. Low: `.deadline` now means two things, and its doc comment is wrong for one of them

ExtensionLane.swift:33-34 ("The cached tree stands; the run goes on by itself") and the comment at :144-145 ("the next
reload runs it").

A skipped turn returns `.deadline`, but no run goes on. Tests, telemetry and any future caller cannot tell "ran past the
deadline, the marker stays until it ends" from "never started, no marker". testATurnThatComesUpTooLate asserts
`third == .deadline` and testARunPastTheDeadlineKeepsItsMarkerUntilItEnds asserts `.deadline`, so two opposite marker
states share one outcome. "The next reload" is whenever the cached tree's own timeline ends (TreeTimelinePlanner via
PyWidget.swift). For a tree with a long timeline, that can be hours. The face is honest about this (see above). The
comment is not.

Fix: add `case late` with the doc comment "Nothing ran and no marker: the turn came up with less than
`turnNeedsSeconds` left. The cached tree stands until the next reload." Return it from :146, assert it in the new test,
and fix the comment at :144-145 so it does not promise a reload time.

### F4. Low: a refresh from a later reload joins a queued turn that still carries the earlier caller's deadline

ExtensionLane.swift:111-117. The comment at :111 says "a second family joins within the same reload". Nothing makes
that true. `inFlight[id]` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the turn from the moment it is queued. Any later `refresh(id)` joins it, including one
from the next reload seconds later.

Failing case: x, y and z are queued at 0 s, and x and y run 1.5 s each. z's caller asks at 0.1 s (`due` 4.1). A new
reload of z at 2.5 s joins z's queued turn. That caller has until 6.5 s, but the turn comes up at 3.0 s with 1.1 s
left against 4.1, skips, and both callers draw the cached tree. One refresh is lost even though the latest caller had
time. The direction is safe (it never overruns), so this is Low.

Fix: keep `due` in a small box next to `inFlight[id]`. A joiner moves it later (`max`) while the turn is still queued.
`takeTurn` reads the box at the check. This is safe because the process has a getTimeline pending until the latest
joiner answers. If that is more than T-1851 should carry, change the comment to "any caller that finds the turn joins
it, on the first caller's clock" and leave a line for later.

## Not findings

- The order "Pro gate, marker, time, margin" is right. If the time check came before the marker check, a late turn
  would leave an earlier process's marker for one more call. If it came after the margin rule, a late turn could
  record a refusal for a run it never tried.
- A run that ignores step 0 and returns only at the hard stop (budget + 2.0 s) or at stuck (budget + 5.0 s) still
  overruns any caller, the first turn included. That is the existing design ("A run that ends after the deadline still
  writes its tree"). F3 of T-1838 (T-1852) and the ladder cover it. No turn margin below 4 s can.
{% endraw %}

</div>
