---
layout: "default"
title: "T-2728: review of c27b8cf46 (T-2721, the oom_guard badge gap, ADR-007 2026-11-05 14:48 rule D)"
section: "documents"
description: "No High, no Medium. Two Lows, both test or rule follow-ups; neither blocks the flag-off build. Both are on the board as T-2841 (Idris, P3; L2&#x27;s question goes to Ines from there)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2728-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2728-pernille.md</code></span></div><h1>T-2728: review of c27b8cf46 (T-2721, the oom_guard badge gap, ADR-007 2026-11-05 14:48 rule D)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (C13, independent). Read: `git show c27b8cf46`; at HEAD, WidgetStatus.swift (`oomGuard`,
`missingStatusSince`, `missingStatusFallback`, `showsBadge`), ExtensionLane.swift (`refresh`, `turn`, `givesWay`,
`refused`, `log`), LaneGuard.swift (`WidgetStateLock.with`), ExtensionLaneTests.swift (its `showsBadge` and oom_guard
asserts), <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py's Not held bullet; the 14:48 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line. Host only, no Xcode, no Simulator.

## Verdict: PASS

No High, no Medium. Two Lows, both test or rule follow-ups; neither blocks the flag-off build. Both are on the
board as T-2841 (Idris, P3; L2's question goes to Ines from there).

## What I ran (scratch T-2728-pernille, `rsync -aL` of pywidget/ios/Core)

- `swift test --filter 'WidgetStatusTests|RefreshOutcomeRuleTests'`: 65 and 14 green, 0 failures.
- `tools/mutation_check.py <scratch>/core pywidget/ios/Core/mutants-t2721.json --filter WidgetStatusTests`: baseline 65
  green, 8 of 8 killed, matching bench/t2721-green.txt.
- Three mutants of my own: gap 61 killed (4), `underWay ? missingStatusFallback(now)` killed (10),
  `abs(ts.timeIntervalSince(since)) >= gap` **survived** (L1).
- A throwaway probe test, deleted after: real-clock dates through `encoded()`/`decode` at every step.
  Four refusals at +0.0013, +0.0021, +1.4007, +3.9991 s after `ok`: no badge on any; +900.0007 s: badge.
  Boundary through the file (stamps are milliseconds): a true gap of 59.9985 s reads 59.999 (no badge), 59.9990 s reads
  60.000 (badge). Half a millisecond of rounding at the boundary, harmless against a 15 min reload floor.
  Under way on a missing status: `oom_guard_since` stamps `0001-01-01T00:00:00.000Z` and badges at the first refusal.

## The three checks asked for

1. **Boundary, inclusive.** WidgetStatus.swift:266 `ts.timeIntervalSince(since) >= oomGuardBadgeGap`, gap at :220.
   `testTheGapIsSixtySecondsInclusive` (WidgetStatusTests.swift:262) pins 60.999 s after `at(1)` false and `at(61)`
   true; `t2721-gap-exclusive` dies. Correct.
2. **Under-way cases still badge at the first refusal.** :211 `underWay` is unchanged; `missingStatusSince` still
   returns `Date.distantPast`, and the fallback (:231) is `now - 61 s`, one second past the gap.
   `testUnderWayRefusalsStillBadgeAtTheFirst` (:272) covers missing status, no outcome, and `failing_since`, each at
   the first refusal and 1 s later; `t2721-underway-since-now` and `t2721-fallback-exactly-gap` die. Correct.
3. **The 60 s gap against ExtensionLane's queue.** It holds. A refusal is written only from `turn`, at
   ExtensionLane.swift:284, after two `startsInTime` checks (:259 and :275, the second after `givesWay`'s
   `gatherSeconds` wait) that need `turnNeedsSeconds` (2.5 s) left before the latest caller's 4 s `due`. So every
   refusal starts within 1.5 s of some caller's arrival; between the check and the `Date()` in the status closure
   there is only the headroom read, the refusal file, and `WidgetStateLock`'s flock, bounded at 0.5 s
   (LaneGuard.swift:246). A turn queued behind `lastTurn` (a running neighbour, a premade's StoreKit gate) that comes
   up late is `late`, a `deferred` write that keeps `oom_guard_since` and writes no `ts`; it is never a refusal. The
   lane therefore adds about 2 s to the spread of one reload's refusals, never 60. What remains open is WidgetKit's
   own spacing of one reload's family calls, which only T-0680's device log can show (the chair line says so).

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:844px" markdown="1">

| # | Rank | Where | Finding and failure case |
|---|------|-------|--------------------------|
| L1 | Low | WidgetStatusTests.swift:374; ExtensionLaneTests.swift:837 | Two gaps in the pins. (a) Nothing pins "`oom_guard_since` 60 s or more *after* `ts` shows no badge": the `abs(...)` mutant survives. Case: the wall clock steps back 120 s (a manual time change, an NTP correction) between two refusals; at HEAD no badge (my probe), under the mutant a badge. The existing "later than the write" assert is 1 s, inside the gap, so it can't tell. (b) The one end-to-end test of four refusals in one process (ExtensionLaneTests.swift:837, small, medium, large, extra large) checks the outcomes and no run, but not the face: one `XCTAssertFalse(WidgetStatus.showsBadge(status(...), treeExists: true))` there would pin rule D's "ends today's split faces in one reload" through the real writer. Xcode-only, so it rides the next Simulator slot. |
| L2 | Low (rule, for Ines) | ExtensionLane.swift:379-386 with WidgetStatus.swift:266 | A demotion write within 60 s of the run's first refusal no longer badges. Case: process P1 refuses the small at t (`oom_guard_since = t`); P1 ends (a memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> or the T-1852 `_exit`), and the medium of the same reload reaches P2 at t + 2 s; `refused` demotes and writes `.oomGuard` with `ts = t + 2`: no badge (probe: `badge=false`). Before c27b8cf46 it badged. A demoted widget leaves the lane, so no later lane refusal comes to add the badge: the stale picture stays unbadged until the app lane writes, not for "one reload" as the chair line's error bound says. Rare (two extension processes inside one reload), and the demotion itself stands. Question for the chair: should the demotion write badge at once (it is cross-process proof, not one reload's repeat)? No code change asked of T-2721. |

</div>


## Outside this commit (mine)

lane.py:202 still says the badge comes "from the second oom_guard in a row", and that it is "planned, not built"
(T-1714 landed on 2026-11-03). Both are stale against rule D. That bullet is my text; I fix it in my next lane.py
change, not Idris's.

## Docstrings

`oomGuard` (WidgetStatus.swift:196-207), the gap (:217-220), `missingStatusFallback` (:230), `showsBadge` (:255-259) and
`ExtensionLane.refused` (:374-377) agree with the code and with the 14:48 line. "Inside their callers' 4 s deadline"
is true for refusals by the queue argument above.
{% endraw %}

</div>
