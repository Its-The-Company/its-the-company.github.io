---
layout: "default"
title: "T-2043: review of 473495460 (Idris, T-2037, answering T-2036 F1)"
section: "documents"
description: "Verdict: approve with changes. The fix answers T-2036 F1: the flag is taken at the wait, under the lock, by the first turn that has someone owed longer, and reset in the same critical section that takes queued back to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2043-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2043-pernille.md</code></span></div><h1>T-2043: review of 473495460 (Idris, T-2037, answering T-2036 F1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-04. Independent review (Commandment 13) from the commit alone. Read: `git diff 473495460^ 473495460`
(Shared/ExtensionLane.swift, Tests/ExtensionLaneTests.swift), bench/t2037-mutants.json, bench/t2037-gather-at-the-wait.txt.
No Xcode run here: the mutants are traced by hand against the code (below). MacBook full suite J-20261104-0553-xc-test
at 473495460: still queued (ops/jobs/J-20261104-0553-xc-test.json has no result); not waited for.

Verdict: **approve with changes.** The fix answers T-2036 F1: the flag is taken at the wait, under the lock, by the
first turn that has someone owed longer, and reset in the same critical section that takes `queued` back to 0. No
High or Medium. Three Lows: one about how well the new test guards the old bug, one about an untested claim, and one
design gap that the fix leaves in place (it was there before the fix too).

## Checked, clean

- **Lock order.** One `lock`; every `withLock` body is synchronous; nothing nests (`givesWay` takes it three times
  separately, the completion block once). `Task.detached` is only created under the lock, not run there. No await
  under the lock.
- **Lost wake-up.** No condition signal to lose: `givesWay` polls `inFlight` every 10 ms, and the loop checks once more
  before `rest > .zero` fails, so a widget that joins right at the bound is still seen.
- **Reset when `queued` returns to 0 by a cancel or timeout.** A caller's deadline (`upTo` returns nil, `.deadline`)
  does not cancel the detached turn; `queued -= 1` and the reset happen only when the turn body returns, in the same
  `withLock` block, before the turn's Task yields its value, so the next turn (`await before?.value`) always sees the
  reset state. Joiners do not touch `queued`. Nothing can take `queued` to 0 with a turn still to come, and nothing
  else resets the flag. A stuck run ends the turn with `ran.stuck` or ends the process, so the flag cannot stay true
  forever.
- **Owed-longest-first (f501acb86).** The owed-longest widget has an empty `older`, returns before the flag, and never
  gives way, so some turn still always runs.
- **Mutant claims.** All three `find` strings occur once in the new file. Mutant 1 (`if queued > 0 { gathered = true }`
  at queue time) reproduces f501acb86 for this test: P is made at queued 0, a at queued 1, so a looks once, sees no o,
  and runs 1 s; o is late. That matches the bench's red run on f501acb86 (a .wrote, o .late). Mutants 2 and 3 are
  traced the same way and their named tests are the right ones.

## F1 (Low): the red test <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the old bug only within 15 ms of slack

`Tests/ExtensionLaneTests.swift:530-537` (P's gate sleeps 20 ms; a at 5 ms; o at 45 ms).

The green side has room: a's wait opens at about 20 ms and runs to about 270 ms, and o joins at 45 ms, so there are
about 225 ms either side. The red side does not. On f501acb86 (and mutant 1) the test fails only if (i) a is made
while P's turn is still queued, which leaves 15 ms between a's 5 ms and P's 20 ms gate, and (ii) a's single look
comes before o joins, which leaves about 25 ms. On a loaded runner (the bench saw load 179) a 5 ms `Task.sleep` that
overshoots past 20 ms brings `queued` back to 0 before a is made, so a gathers on the old code as well. A gate sleep
that overshoots past 45 ms means a's look finds o. Either way the old code passes. The suite then stays green with
the bug back in, and the mutant run can report SURVIVED for timing rather than code.

Fix: take sleeps out of the ordering that makes the test red. Let P's gate wait on something the test controls. One
way: a `CheckedContinuation` that the test resumes after it has issued `l.refresh("a")` and slept 50 ms. Then issue
o's refresh from the injected `nap`'s first call (on the new code only a's gather naps; on the old code a never
naps), with a fallback that issues o 100 ms after the gate opens if nothing has napped. Cheaper: widen the spacing to
a gate of 150 ms, a at 5 ms and o at 200 ms (old code: a looks at about 150 ms, 50 ms before o; new code: a's window
runs from about 150 to 400 ms). Re-run mutant 1 at load to show it is killed.

## F2 (Low): "a turn with nobody owed longer leaves the flag" has no test

`Shared/ExtensionLane.swift:236-240`: the flag is taken after `guard !older.isEmpty`. The commit message and the
`givesWay` doc comment both state this. No test or mutant pins it: in the new test P never reaches `givesWay` and a
has `older = {o}`. Mutant: move the `let first = lock.withLock {...}` block above the guard. I expect it to survive
the whole file, because nothing in the commit exercises it.

Failure it would let in: X is owed longest and its script is quick (30 ms). Y (not owed) is made at 5 ms, and Z
(owed, but more recently than X) calls at 60 ms. X spends the burst's wait without waiting, Y looks once at about
35 ms, misses Z and runs its whole budget, and Z comes up late again. With WidgetKit's call order steady from reload
to reload, Z's mark is rewritten every time: the T-2036 F1 starvation coming back by a different route.

Fix: add that test (X owed and recorded late first, quick `hang`; Y; Z owed after X, issued after Y's look), assert
Y is .late and Z wrote, and add the mutant to bench/t2037-mutants.json.

## F3 (Low): the burst's one wait ends at the first older widget to join, not the oldest

`Shared/ExtensionLane.swift:236-246`. The flag is spent by the first turn to wait. That turn stops at the first
widget in `older` that joins. The next turn of the burst has its own, shorter `older` but only looks once.

Scenario: A is owed since t1, B since t2 (later), C is not owed. A reload calls C, then B 5 ms later, then A 10 ms
later. C takes the wait and gives way at about 5 ms (B joined). B's turn has `older = {A}`, looks once at about 6 ms,
misses A (still 4 ms out), and runs its 2 s budget. A then has about 2 s of its 4 s left against the 2.5 s it needs,
so it is .late again. On the next reload C waits for A and B gives way to it, so A runs one reload late. That is a
delay, not starvation, but the widget owed longest is the one that waits, which is the reverse of f501acb86's rule.
The same gap lets a first-reaching turn whose `slack` is close to 0 spend the whole wait on almost nothing.

Fix: replace `gathered: Bool` with `gatherUntil: ContinuousClock.Instant?` under `lock`. The first turn to reach the
wait with `older` non-empty sets it to `now + gatherSeconds`. Every turn of the burst then waits until
`min(gatherUntil, now + slack)`. Reset it to nil where `queued` returns to 0. The window is shared, so an orphan mark
still costs a burst at most one 0.25 s window (T-2032 and testAnOwedWidgetThatNeverReloadsCostsAReloadOneWait still
hold). Test: the C, B, A order above, asserting that A wrote and B is .late. Mutant: put the Bool back.

## Not covered here

The orphan-mark 1.4 s bound under load is T-2044's; not repeated.
{% endraw %}

</div>
