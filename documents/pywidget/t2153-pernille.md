---
layout: "default"
title: "T-2153: review of 0448468a9 (T-1852, T-1838 F3: a stuck run closes the lane), Pernille, 2026-11-04"
section: "documents"
description: "Independent review (Commandment 13) of Idris&#x27;s 0448468a9, read as it stands at HEAD (536f8ac63) with the commits that landed on top of it in the same files: 0e756d6cc (T-1854 run rows), cb1fa9c15 (T-2176 test split)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2153-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2153-pernille.md</code></span></div><h1>T-2153: review of 0448468a9 (T-1852, T-1838 F3: a stuck run closes the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>), Pernille, 2026-11-04</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent review (Commandment 13) of Idris's 0448468a9, read as it stands at HEAD (536f8ac63) with the commits that
landed on top of it in the same files: 0e756d6cc (T-1854 run rows), cb1fa9c15 (T-2176 test split), ed1e3805f (T-2211
folder before the deferred row) and 9286dd56a (T-2228/T-2229 no deferred row for the stuck widget, marker check reads
the lane's last row). I read the code, not Idris's notes. Files read: Shared/ExtensionLane.swift (lines 1-400),
Tests/ExtensionLaneTests.swift (helper 20-82, the stuck and closed tests 227-275 and 849-945 by name),
Tests/mutants-t1852.json, bench/t1852-stuck-closes-lane-2026-11-04.txt, Widget/PyWidget.swift (25-60, the provider),
and my own T-1838 F3 (docs/reviews/t0675-swift-pernille.md:59-68). All code paths below are under pywidget/ios/.

**No Xcode run.** Another task holds the local slot, so I did not rerun ExtensionLaneTests or the mutants the board
line names. Idris's record (79/79, 5 of 5 KILLED, at 0448468a9) is his evidence, not mine. What I checked without a
build: each mutant's find string against HEAD's source, by count (F2).

**Verdict: approve with changes.** The closed lane does what T-1838 F3 asked: after `ran.stuck` no later turn runs or
puts a marker down (refresh at 177-178 and takeTurn at 213-217), the stuck widget's marker is kept for the next
process, and the end condition `closed && inFlight.isEmpty` (186) is sound: every turn chains on `lastTurn`, so turns
made before the stuck one have finished, turns made after it return `.closed` at once, and inFlight only shrinks. The
lock order is right (`inFlight[id] = turn` is set under the same lock the turn's end needs). But the exit lands before
the provider has drawn anything for the callers of the last turn (F1), and that is the part of F3 I wrote wrong.

## Findings

### F1. Medium: the process ends before the last turn's callers get a timeline

ExtensionLane.swift:182-190 with Widget/PyWidget.swift:36-38. The exit is called inside the turn's task, before
`return outcome`, so no caller awaiting that turn ever gets its value. The provider's `timeline(for:)` awaits
`refresh(id)` and only then calls `drawn(...)` to build the Timeline it returns to WidgetKit. So `exit()` <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the
process with those `timeline(for:)` calls still unanswered.

Concrete cases, both shown by the code:
- Widget `a`, small and medium on the Home Screen. Both families join one turn (171-173). If the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>'s stuck verdict
  lands inside the 4 s deadline, the turn ends and inFlight is empty, so `exit()` runs. Neither family's
  `timeline(for:)` returns.
- `b` queued behind a stuck `a` (testATurnQueuedBehindAStuckRunRunsNothing's case). `b`'s turn returns `.closed`
  at 214-216, its end finds inFlight empty, and `exit()` runs before `.closed` reaches `b`'s caller. The test's
  `XCTAssertEqual(queued, .closed)` passes only because the stub's exit returns. On a phone that answer is never
  delivered.

The `.closed` doc (60-61) says "the cached tree stands". It does on disk, but nothing in this process draws it. What
WidgetKit shows after an extension exits in the middle of getTimeline (the previous entry, a placeholder, or a
throttled retry) can only be settled by a run on a Simulator or device. The code alone cannot settle it, so I am not
claiming either way.

This is my mistake as much as Idris's. T-1838 F3 asked for "end the process once `inFlight` is empty", and an empty
inFlight does not mean every caller has answered. The C2 1.7 path (`judge` -> `WidgetLaneGuard.carryOut(..., exit:)`,
391-394) has the same structure and predates this commit. I note it here and do not count it as a finding of this
commit.

Fix: choose one of these and record the choice.
(a) Drop the exit. The closed lane on its own already removes F3's cost, because later turns return in microseconds,
    not after a 2 s `busy`. The stuck script thread's memory then goes when the system ends the process. Keep this
    option unless the stuck thread's footprint is measured and shown to matter.
(b) Exit only once every caller has answered. Count callers from `refresh` entry to the provider's return: add a
    `func answered()` that `timeline(for:)` calls after `drawn(...)` returns. Exit when `closed`, inFlight is empty
    and the caller count is 0. The Timeline is handed back only after the function returns, so this still needs a
    short grace or a run that shows it is enough.
Test: a stub `exit` that records the outcomes already delivered to callers when it is called. For the queued-`b`
case and the two-family stuck-`a` case, every caller's outcome must be recorded before exit (with (a): no exit at
all). Then rerun ExtensionLaneTests and the mutants (F2) and record the result in a bench file.

### F2. Low: two of the five recorded mutants no longer apply to HEAD

Tests/mutants-t1852.json. Counted against HEAD's ExtensionLane.swift: `stuck-leaves-lane-open` (find
`if ran.stuck { lock.withLock { closed = true } }`) occurs 0 times, because 9286dd56a made it
`closed = true; stuckHere.insert(id)` at 279. `queued-turn-runs-on-closed-lane` (find
`if lock.withLock({ closed }) { return .closed }`) occurs 0 times, because the block now calls `logClosed` (214-217).
tools/xc_mutants.py:53-54 prints `MISSING` for those two. So a rerun of this file, which T-2153's own line asks for,
cannot test the core F3 behaviour. The other three occur once each. The code is not wrong; only the evidence can no
longer be rerun.
Fix: update both find strings to HEAD's text and rerun. This goes in F1's line.

### F3. Low: a closed refresh counts a turn it never makes

ExtensionLane.swift:176-178. `queued += 1` runs before `if closed { return nil }`, and nothing decrements it on that
path. `queued` is documented as "turns made and not yet finished" (104), so after one closed refresh it never returns
to 0 and `gathered` never resets (184). No harm today: the closed lane runs nothing and the process is about to end.
But if F1 goes the (a) way, the process lives on with a wrong count, and any later code that reads `queued` inherits
the error.
Fix: move `if closed { return nil }` above `queued += 1`, after the inFlight join.

### F4. Low: the nil-turn path is tested only in a state production never reaches

Tests/ExtensionLaneTests.swift:243-259. In testAStuckRunClosesTheLaneAndEndsTheProcess, `next` and `again` are asked
after the stub's exit has already fired. On a phone there is no process left by then. The nil-turn path (197-200)
only runs in production between `closed = true` and the last in-flight turn's end. testAReloadOfTheStuckWidget...
(from 9286dd56a) covers that window for the stuck widget itself. No test covers it for a third widget `c` that
arrives while `b` is still in flight: `c` should get `.closed` and one `deferred` row, and exit should still be called
once, when `b` ends.
Fix: add that case to F1's test work.

### F5. Info: the changed test is right

testAStuckRunKeepsItsMarkerAndTheNextCallDemotes (227-238) now demotes in a second lane (`process: "second"`).
That is the correct change: this process now closes its lane, so a same-process refresh answers `.closed` (asserted
in the new test at 255), and the marker belongs to the next process. `ranCount == 1` still proves the second lane ran
nothing. The `process` name does not affect the marker path (it only names refusals), so the test means what it says.

### F6. Info: the `.closed` doc says "the next process runs as usual"

ExtensionLane.swift:60-61. For the stuck widget the next process does not run it; it demotes it on the marker.
Suggested wording: "the next process runs the others as usual and demotes the stuck widget on its marker."

### F7. Info: a widget turned away by the closed lane is not marked owed

ExtensionLane.swift:213-217. A `b` turned away keeps any late mark it already had but gets no new one, so in the next
process it has no priority for the turn it lost. It lost that turn to another widget's hang, not to time. This is a
design choice, not a bug, and I do not ask for a change. If the gather rule (T-2025/T-2031) is meant to make up for
lost turns, `files.recordLate()` on this path would do it.

## Board lines for Idris

T-2260 (fix, Idris, P1): F1, with F2, F3 and F4 folded in. F3 is in the same line because it touches the lines F1
changes. F5 to F7 need no line.
{% endraw %}

</div>
