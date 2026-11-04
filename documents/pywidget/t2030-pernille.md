---
layout: "default"
title: "T-2030: review of 58304d8f6 (Idris, T-2023..T-2025, answers to T-2022 F1-F3)"
section: "documents"
description: "Verdict: approve with changes. Two Medium, five Low. T-2023 (F1) and T-2024 (F2) are done and correct. T-2025 fixes the two-widget case it was built for, but three widgets in step still starve one (F1 below), and an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2030-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2030-pernille.md</code></span></div><h1>T-2030: review of 58304d8f6 (Idris, T-2023..T-2025, answers to T-2022 F1-F3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read: pywidget/ios/Shared/ExtensionLane.swift, Shared/LaneGuard.swift (LaneRunFiles),
Tests/ExtensionLaneTests.swift:300-442, bench/t2023-review-fixes.txt, bench/t2015-mutants.json. No runs of my own:
these are Simulator tests, and the task asked for reading only. The schedules below are worked by hand from the code,
with the tests' own numbers. Idris's record: 70/0 in the file, six mutants killed, no full suite on this commit.

**Verdict: approve with changes.** Two Medium, five Low. T-2023 (F1) and T-2024 (F2) are done and correct. T-2025
fixes the two-widget case it was built for, but three widgets in step still starve one (F1 below), and an owed mark
that no reload answers slows every turn for up to 24 h (F2). Neither is a crash or data loss. Both should land before
the (c) flag, as T-2025 was meant to.

## What I checked, and what <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>

- **T-2023.** The new test has c's first caller answer `.deadline` before 4.3 s while the joiner gets `.wrote`. The
  "answer on the shared due" mutant is killed. b being `.deadline` is right: I had that wrong in my sketch.
- **T-2024.** The lock comment at :16 now names `due`.
- **The question asked: does the 0.25 s gather eat the giving-way widget's own deadline? Mostly no.** The gather is
  `min(gatherSeconds, left - turnNeeds)` (:175, :199). A turn that gives way answers `.late` at once, so its caller
  loses nothing. A turn that does not give way starts its run with at least `turnNeeds` left, give or take the poll
  overshoot (F3). What the gather does cost is the turns queued behind it. See F2.
- **Two widgets in step take turns.** testAWidgetThatCameUpLateGoesFirstOnTheNextSharedReload shows x, y, x over
  three rounds. Owed turns never give way, so two owed widgets cannot both give way and leave nobody running.
- **Writing and clearing the mark.** `recordLate` writes with `.atomic` (a temp file renamed over the old one), so a
  reader never sees half a file. The mark only has to exist and carry an mtime, so an empty file is enough. `clearLate`
  (:183) runs after `writeMarker` and before the run. A process killed during the run therefore leaves a marker and no
  mark: the next turn demotes the widget, and `owed()` skips demoted widgets. A <span title="A test written in advance. If it fires, we drop the idea.">kill</span> between `writeMarker` and
  `clearLate` leaves both, and the same demotion covers it. A kill after `recordLate` leaves the mark, which is
  correct. Two extension processes at once, one ending and one starting, can only add or miss one mark. That costs a
  single give-way, and it can't deadlock: `inFlight` is per process, so nobody waits on another process's queue.
- **Clock changes.** `isOwed` compares wall-clock mtime with wall-clock `now`. If the clock moves forward more than
  24 h, the mark expires early, which is today's behaviour and harmless. If the clock moves back, the mark lasts longer
  (F5).

## Findings

### F1. Medium: three widgets in step still starve one. Among owed widgets, queue order decides

ExtensionLane.swift:175 (only a turn that is *not* owed gives way) and LaneGuard.swift:348-351 (every late turn
rewrites the mark, so it carries no age).

Failing case: use testAWidgetThatCameUpLateGoesFirstOnTheNextSharedReload's numbers (deadline 2 s, turnNeeds 1.2 s,
runs of 1 s) with three widgets x, y, z, whose callers arrive 50 ms apart in that order on every reload. Only one run
fits in a reload.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: F1. Medium: three widgets in step still starve one. Among owed widgets, queue…, scrolls sideways" data-n="1" style="--tw:866px" markdown="1">

| round | x | y | z |
|---|---|---|---|
| 1 | runs 0-1.0 | up at 1.0, 1.05 s left: late, owed | up at 1.0, 1.1 s left: late, owed |
| 2 | not owed, y queued: gives way, owed | owed: runs 0.05-1.05 | owed, up at 1.05, 1.05 s left: **late** |
| 3 | owed: runs 0-1.0 | not owed, z queued: gives way, owed | owed, up at 1.0: **late** |
| 4 | not owed: gives way | owed: runs | owed: **late** |

</div>


Rounds 3 and 4 then repeat. z is late on every reload, which is the T-2022 F3 starvation with one more widget. With
budget-hitting scripts (2.1 s against 4 s and a 2.5 s margin), one run per reload is also all the real <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fits, so
the case is not contrived.

A related cost: a widget that is not owed gives way even when both would fit. A 0.1 s script queued ahead of an owed
widget skips a reload it had room for.

Fix: the widget owed longest goes first. `recordLate` keeps the date of the first late turn in the file's contents
(write it only when the file is absent, and touch the mtime on later late turns so the 24 h rule still reads the
latest one). An owed turn also gives way to a queued owed widget with an older first-late date. Test: x, y, z as
above for three rounds. Each runs at least once, and nobody is late twice in a row. Add a mutant for "owed turns never
give way" (today's code). The skipping cost can wait: reordering turns in place of skipping them needs a queue other
than the `lastTurn` chain, because a turn that waits on a later turn deadlocks the chain.

### F2. Medium: the gather runs in every turn, so a mark that no reload answers costs every widget 0.25 s for 24 h

ExtensionLane.swift:175 and :196-205, with :135 (`before`).

Failing case: y is owed but doesn't reload with the others. It may have been taken off the Home Screen with its
folder kept, reload on its own timeline, or be a locked premade (F4). Each non-owed turn sees `owed = {y}`, y never
queues, and the turn waits the full 0.25 s before it runs. Turns are chained, so the k-th turn of a reload starts
k x 0.25 s later. Take 0.3 s scripts at a 4 s deadline and a 2.5 s margin. Without the mark, five turns start in time
(0.3k <= 1.5). With it, three do (0.55k <= 1.5). The fourth and fifth turns become late, and then owed. This lasts
until the mark expires, up to 24 h. testAnOwedWidgetThatDoesNotReloadHoldsNobodyBack (Tests:408) runs one widget, so
it can't see the build-up.

Fix: gather only in a turn that did not wait on an earlier one. Its callers really can be a few ms behind it. When
`before` was nil or already finished at the call, gather as now. Otherwise, check `inFlight` once with no wait: the
reload's callers queued while the earlier turns ran. Test: an orphan mark and three 0.3 s widgets. The third turn
starts before about 0.25 + 0.6 s plus 0.1 s of tolerance.

### F3. Low: nothing re-checks the time left after the gather, and the poll can run past its end

ExtensionLane.swift:199-204. `until` is bounded by the slack, but the loop checks `now < until` and then sleeps
10 ms. Under load, a Task's wake-up can come much later than that. The run then starts with less than `turnNeeds`
left, by the overshoot, and `left` is never read again. That is a small T-1851 hole. The 2.5 s interim margin hides
it today, but the T-2021 measurement may not.

Fix: after `yieldsToOwed` returns false, recompute `left` from `due[id]` and repeat the `startsInTime` guard (late plus
`recordLate` if it fails). Sleep `min(10 ms, until - now)`. Mutant: drop the re-check, with a slack of a few ms and a
gather that overshoots.

### F4. Low: a turn that can never run keeps its mark, and others give way to it for 24 h

ExtensionLane.swift:158 (`.locked`), with `refused` and `.noTree`. A premade whose Pro has lapsed is owed (it was
late once), so it queues on each reload, and every non-owed widget ahead of it gives way. Then it answers `.locked`,
which touches no files. Its mark stays until it expires. The widgets that gave way run every other reload for up to
24 h, and in those reloads nothing runs at all.

Fix: the mark means "would have run, had no time". Clear it on every path out of `takeTurn` except `.late` (a `defer`
keyed on the outcome). Test: a locked premade with a mark and one widget ahead of it. The widget gives way at most
once, and the mark is gone after the premade's turn.

### F5. Low: a clock set back keeps a mark owed for the shift plus 24 h

LaneGuard.swift:356-360. If the mtime is in the future, `now.timeIntervalSince(date)` is negative, so it is always
`< within`. Setting the clock back a week keeps an orphan mark alive for eight days, with F2's cost throughout.

Fix: `let age = now.timeIntervalSince(date); return age > -300 && age < within`. A mark more than 5 minutes in the
future counts as stale. Test with `isOwed(now: .now - 3600)`.

### F6. Low: the T-2018 failure is a tight test, not a race

Tests/ExtensionLaneTests.swift:322. Nothing is owed in that test, so the new code only lists the folder there. The
schedule is a 0-1, b 1-2, c 2-3 against c's first caller's 4.1 s. Three runs plus their file work must fit in the
first caller's 4 s, with 1.1 s spare. At a load average near 100, the chain of three detached tasks used up that
1.1 s once in five runs. The first caller then answers `.deadline` on its own clock, which is the designed behaviour.
I see no code path that gives a wrong answer. The direction that matters (c comes up late if the joiner hasn't joined)
fails safe, as `.late`.

Fix: move the slack to the side that flakes. Use `hang: 0.6`, `turnNeeds: 3.0` and the joiner at 0.8 s. c comes up at
about 1.2 s with 2.9 s left alone, which is late, and 3.6 s with the joiner, so it runs. It finishes at about 1.8 s
against 4.1 s, leaving 2.3 s spare. The "joiner keeps the first due" mutant is still killed (2.9 < 3.0). Also widen
T-2023's `took < 4.3 s` (Tests:344) to 5.0 s. That is an `upTo` sleep under load, and the mutant is killed anyway,
because its first caller gets `.wrote`.

### F7. Low: `.late` still writes no run-log row. It belongs to T-1854, not a new line

ExtensionLane.swift:168-177. T-1854 builds the extension's status and run-row writer (WidgetStatusStore and RunLogStore
under state.lock). Its outcome list (error, timeout, deadline, oom_guard, demoted, locked) was written before `.late`
existed. A separate line would write to the same stores through the same code. So: T-1854 adds `late` with two
reasons, `no_time` (:168) and `gave_way` (:175). Then a person can see on the Activity row that a widget skipped a
refresh, and why. The fix line below only widens T-1854's scope.
{% endraw %}

</div>
