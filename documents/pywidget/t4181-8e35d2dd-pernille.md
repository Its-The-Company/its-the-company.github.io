---
layout: "default"
title: "Review of T-4181 at main..8e35d2dd (T-4775, T-5018): a late tap gets a run of its own; the due moment is pinned"
section: "documents"
description: "T-5018 does what its L1 asked. T-4775&#x27;s lock is right, and so is its seam, but the tap&#x27;s own run is not on the tap&#x27;s clock. The code comment says it is."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-8e35d2dd-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 38 · Sat Nov 28</span><span><code>pywidget/docs/reviews/t4181-8e35d2dd-pernille.md</code></span></div><h1>Review of T-4181 at main..8e35d2dd (T-4775, T-5018): a late tap gets a run of its own; the due moment is pinned</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (Commandment 13). Author: Idris. Reviewed: `git diff main...HEAD`, which is d8443a32cd (T-4775),
8e35d2dd5c (T-5018) and 881c567371 (the handoff note). The two-dot diff also shows files that main changed after the
branch point; those are not this branch's work and I did not review them. I checked the change against my own items:
L1 of t4181-bd131735-pernille.md and L1 of t4773-f20116b9-pernille.md. Paths are under pywidget/ios/ unless they say
otherwise; line numbers are at 8e35d2dd5c. Date: 2026-11-28.

## Tests run

None. I read the tests and the mutants; I did not rerun Xcode. The author's jobs (units 2830/0/2,
J-20261128-0345-land-chk-a5ab71-4-18e57d; LaneWarmWindowTests 6/0; host 4602/0) I have not checked against their logs.
`tools/site/how_it_works.py --help` reads the extension.md box "A test build's widget run stays short" as `ok`
(checked 21099ea73699, now 21099ea73699).

## Verdict: FIX FIRST (one Medium)

T-5018 does what its L1 asked. T-4775's lock is right, and so is its seam, but the tap's own run is not on the tap's
clock. The code comment says it is.

## What the two L1 items asked, and what came


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the two L1 items asked, and what came, scrolls sideways" style="--tw:874px" markdown="1">

| Item | Asked | Came |
|---|---|---|
| t4181-bd131735 L1 | a tap that finds a turn whose row is written queues one run of its own after it | Done (ExtensionLane.swift:318, 356-365), but see M1 |
| t4181-bd131735 L1, second half | getTimeline's doc no longer says `sampled_at` | Done (Widget/PyWidget.swift:62-64), wording L3 |
| t4773-f20116b9 L1 | assert `reruns` is true at exactly `due`, ask between floor and <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>; mutant in mutants-t4773.json | Done (Core/LaneRerunRuleTests.swift:151-161, mutants-t4773.json:42-50). The `find` text matches LaneRerunRule.swift:53 exactly. `now > due` makes the first `XCTAssertTrue` false, so the mutant is killed |

</div>


## The lock (no finding)

`rowWritten.insert(id)` and `tapped.contains(id)` are in one `lock.withLock` (:501). A tap's check of `rowWritten`
and its `tapped.insert` are in the one lock that finds `inFlight[id]` (:314-319). So a tap lands either before the
mark, and the row is its own, or after it, and the tap waits. There is no third order. `rowWritten` is cleared in the
same lock that clears `inFlight[id]` (:337), so the next turn cannot inherit it. A tap that finds `inFlight[id]` gone
makes a turn of its own, as before. Two taps behind one written turn both wait. The first makes the new turn and the
second joins it, so there is one run and one `intent` row; that is right. A turn with no `log` (a start failure) never
sets `rowWritten`, so a tap there joins as before; that path was out of my L1.

## The seam (no finding)

`afterRow` defaults to `{ _ in }` (:261), and `ExtensionLane.shared` (:281-289) passes nothing. In the shipped <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> it
costs one `await` on an empty closure after the row, with no hop and no state. It is a no-op.

## Findings

### M1 (Medium): the tap's own run starts on a fresh 4 s clock, not the tap's, so T-1851's "too late to start" rule no longer holds for it

`Shared/ExtensionLane.swift:356-365`. The comment says the tap's run comes "after that turn, on this caller's clock".
The code does not do that. `refresh(id, trigger: .intent)` at :362 computes its own `mine` at :311, which is
`ContinuousClock.now + deadline` at the moment `behind` ended. The tap's real clock is the outer `mine`. The outer
`upTo(until: mine)` bounds only when the caller answers; it does not bound the turn. Two of the lane's rules read the
inner clock:

- T-1851 (`timeLeft`, `startsInTime`, :424-428) judges the start against the inner `due`. Suppose a tap lands at t0 and
  the written turn's judging runs to t0 + 3.9 s. The tap's turn then still sees about 4 s left. It writes the marker
  and starts a full run, while its caller answers `.deadline` at t0 + 4 s. That is the case T-1851 (T-1838 F2) exists
  to stop: "too late to finish before the latest caller's answer. No marker and no run". The caller here is
  RefreshWidgetIntent's perform (RefreshWidgetIntent.swift:55). Once perform has answered, nothing holds the extension
  awake. If the process is suspended or ended mid-run, the marker stays, and the next process demotes the widget as
  `killed` (:405-418). A tap could then move a widget out of the lane with a moved badge, which is worse than the
  missing `intent` row this fixes.
- T-2230 (`firstDue`, :504) marks the row `deadline` only when the run returned after the inner clock. A tap whose
  caller drew the cached tree gets a row that does not say so.

The commit message says "on its own clock". That is a third description, and it is true only of the inner call.

Fix: pass the outer `mine` into the inner call, for example a private `refresh(_:trigger:until:)` that takes the
instant instead of computing it. Then T-1851 sees the tap's real time left and writes `late` when it has none. A test
with a short `deadline` and an `afterRow` that holds past it should expect no second run and a `late` mark. As the
code stands, that test would see two runs. This is a test-build path only (the lane switch is off in every shipping
build), so it holds no release. It should not merge with a comment that claims the opposite.

### L1: the new ExtensionLaneTests test passes by the old path too

`Tests/ExtensionLaneTests.swift:1662-1677`. `afterRow` starts the tap in a `Task` and sleeps 300 ms. If the tap does
not reach the lock in that time, it finds `inFlight` empty and makes its own turn. The result is the same two runs and
`["system", "intent"]`. So with the fix in place, the test does not show that the `behind` branch ran. Red-before
holds only when the tap does land in the 300 ms window, which it should on an idle Simulator. A hook that lets
`afterRow` wait until the tap has passed the lock would make the test exact.

### L2: T-4775's red-first mutant is not in mutants-t4773.json

The T-5018 commit says T-4775's mutant ("a late tap joins the written turn again: 1 run, not 2") was planted in
J-20261128-0208-land-chk-a5ab71-4-379b28. Only T-5018's mutant was added to the file, so a later mutant run will not
replay T-4775's.

### L3: wording

- `pywidget/docs/how-it-works/extension.md:15` says "so every tap leaves a line marked as a tap". A tap whose turn is
  locked, demoted, late or fails to start leaves no `intent` row. After M1's fix, a tap past its clock leaves a `late`
  mark instead. "A tap that runs leaves a line marked as a tap" is true.
- `Widget/PyWidget.swift:62-63`: "the tree's own ask, as a date counted from the widget's last run". The ask is a
  date of its own. The last run only bounds it (15 min floor, 24 h cap). Say "when the tree's own ask has come, held
  between 15 min and 24 h after the widget's last run".

## Not checked

The author's job logs; the handoff note's claims about the blocked steps (T-4280, T-1882, T-2021, T-4433, T-4435,
T-0793), apart from reading them.
{% endraw %}

</div>
