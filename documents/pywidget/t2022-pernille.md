---
layout: "default"
title: "T-2022: review of c2497483d (Idris, T-2015..T-2018, answers to T-2014 F1-F4)"
section: "documents"
description: "Verdict: approve with changes. Three findings, all Low. None blocks the commit."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2022-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2022-pernille.md</code></span></div><h1>T-2022: review of c2497483d (Idris, T-2015..T-2018, answers to T-2014 F1-F4)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read: pywidget/ios/Shared/ExtensionLane.swift, Tests/ExtensionLaneTests.swift,
bench/t2015-mutants.json, bench/t2015-review-fixes.txt, Widget/PyWidget.swift. No runs of my own: these are Simulator
tests, and the task asked for reading and host-only work. Idris's local record is 66/0, seven mutants killed, timing
tests 18/0 over 6 iterations. The MacBook full suite on this commit is still to come, and it is needed before TestFlight.

**Verdict: approve with changes.** Three findings, all Low. None blocks the commit.

## What I checked, and what holds

- **F1 (T-2015).** `turnNeedsSeconds = budget + 2 * stopRepeatSeconds` = 2.5 s. The doc comment says this is a stopgap
  and names the measurement (T-2021). `testTheADRsNumbers` pins the value, and that is the right kind of test for a
  constant. No behavioural test tells 2.25 s from 2.5 s. That is fine while the number is not a measured one.
- **F2 (T-2016).** `startsInTime(left:needs:)` at :163 reads the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s `turnNeeds`. The 3.3 s test <span title="A test written in advance. If it fires, we drop the idea.">kills</span> "budget",
  "half the deadline" and "margin - 0.5". The boundary test kills `>`. Covered.
- **F3 (T-2017), verified.** `ExtensionLane.shared.refresh(id)` at Widget/PyWidget.swift:37 is the only caller outside
  Tests (I grepped every non-test Swift file for `ExtensionLane` and `.refresh(`). It discards the result
  (`@discardableResult`). Nothing outside ExtensionLane.swift names `Outcome`, so no run-log mapping reads it, and
  adding `.late` cannot break an exhaustive switch in app code. The mutant "late reads as deadline" is killed by two
  tests.
- **F4 (T-2018), the question the task asked: can moving `due` later start a turn past the first caller's deadline and
  get the run killed mid-way, the T-1851 bug? No.** The reasons:
  1. `inFlight` and `due` belong to the one `ExtensionLane.shared` in this process. So a joiner is always in the same
     process as the first caller. A caller in another process has its own lane and never joins.
  2. `due[id]` is the max over its callers' `mine`. Each caller answers through `upTo(deadline)` (:142), which starts
     after `mine` is taken and so ends at or after `mine`. Its sleep runs in a detached task, so cancelling the
     caller's task cannot cut it short. So the caller that owns `due[id]` still has a getTimeline pending at `due[id]`.
  3. The turn starts only with `left >= turnNeeds` against that max (:162-163). So the run starts with 2.5 s of a
     pending getTimeline still ahead in this process. That is the same footing as a lone caller under T-1851. The
     first caller may already have answered `.deadline`. That is safe, because the process does not end on its answer
     while the joiner's answer is still pending.
  4. `ContinuousClock` keeps counting through a suspension, so a process that resumes late sees `due` as past and
     skips the turn. `SuspendingClock` would have been wrong here.
  5. Races: the creator holds `lock` while it sets `inFlight[id]` and `due[id]`. Both the read in `takeTurn` and the
     cleanup take `lock`, so neither can run before the set. While `inFlight[id]` is set, a new caller joins the turn
     and does not start a second one. A joiner that comes after the check moves `due` to no effect, which is harmless.
  So the direction can only add runs that the latest caller's pending answer covers. What T-2014 F4 and T-1851 did not
  cover (a script that ignores step 0 and runs to the hard stop) is still the existing design, as T-2014 said.
- **Planted bugs instead of a failing-first run.** Each old behaviour has a mutant, and each mutant was killed: the F1
  constant, the three F2 thresholds and `>`, the F3 `.deadline` return, and the F4 "joiner keeps the first due". The
  mutants it does not plant are equivalent: `min`, or a plain `due[id] = mine`, because `mine` only grows; a missing
  `due[id] = nil`, because the next turn overwrites it; and the unreachable `?? .zero`. One claim has no mutant: "every
  caller still answers on its own clock". See F1 below.

## Findings

### F1. Low: the F4 test never starts the turn after the first caller has answered

Tests/ExtensionLaneTests.swift:322. In `testALaterReloadThatJoinsAQueuedTurnGivesItItsOwnDeadline`, c runs from about
2 s to about 3 s. That is before its first caller's 4.1 s, so both callers get `.wrote`. The case F4 makes possible is
untested: the turn starts or ends after the first caller answered, on the joiner's clock alone.

Failing case: a mutant that makes callers answer on the shared `due[id]`, not on their own `deadline`, still passes the
whole file. For example, :142 waits `ContinuousClock.now.duration(to: lock.withLock { due[id] } ?? mine)` in place of
`deadline`. Then the first caller of c waits until the joiner's 5.5 s, and WidgetKit gets its answer up to 1.4 s past
the 4 s the ADR gives it. The test sees `.wrote` either way.

Fix: add a case with runs of 2.1 s for a and b. c's first caller asks at 0.1 s (due 4.1) and a joiner asks at 2.7 s
(due 6.7). c comes up at about 4.2 s. Assert:
- the first caller returns `.deadline` within about 4.3 s of its call (measure it);
- the joiner returns `.wrote`;
- c ran once;
- c has no marker and `demotions().ids()` is empty afterwards;
- a later `refresh("c")` is not `.demoted`.

Add the "answer on the shared due" mutant to t2015-mutants.json.

### F2. Low: the lock comment on the class leaves out `due`

ExtensionLane.swift:16 says "`laneGuard`, `inFlight` and `lastTurn` under `lock`; the rest immutable". `due` (:78) is
mutable and under `lock` too. The next person to touch it will read "the rest immutable".

Fix: change it to "`laneGuard`, `inFlight`, `due` and `lastTurn` under `lock`".

### F3. Low: a widget queued behind a budget-hitting script in the same reload is always `.late`, and nothing notices

ExtensionLane.swift:162-163 with Widget/PyWidget.swift:37. This comes from T-1851, not from this commit. F1 widens it
from a 1.75 s window to 1.5 s.

Failing case: x and y are both lane widgets. They reload together, for example on `reloadAllTimelines` or on the same
timeline policy. x's script hits its 2 s budget every time. y's caller asks at about 0 s (due about 4 s), and y comes
up at 2 s or later with 2 s or less left, below 2.5 s. So y is `.late` on every shared reload. If their reloads stay
in step, y's lane tree never refreshes. y is never demoted either, so it never moves to the app lane. `.late` now
names this case (T-2017), but PyWidget.swift:37 throws it away, so neither the run log nor the timeline policy ever
sees it.

Fix (pick one, after T-2021 measures the margin):
- (a) Count consecutive `.late` per widget id, in the lane or in a small group-container file. After N in a row, that
  widget's next turn goes first in the queue.
- (b) Have PyWidget read `.late` and ask for a reload sooner. This costs WidgetKit reload budget.

At the least, log `.late` as a lane event so the TestFlight data can show whether this happens.
{% endraw %}

</div>
