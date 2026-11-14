---
layout: "default"
title: "T-2494 review: the last closed-lane writer ends the extension (T-3825)"
section: "documents"
description: "PASS with fixes. The fix closes F4 as I reported it: a caller that finds the lane closed is counted in the same lock hold that sees closed. Neither a turn&#x27;s end nor another closed caller can then end the process until\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2494-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t2494-pernille.md</code></span></div><h1>T-2494 review: the last closed-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> writer ends the extension (T-3825)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13, independent; pre-release standard (this is before the next TestFlight build).
Reviewed: Idris 8b20e9fb5 (T-2494, the fix for T-2272 F4, pywidget/docs/reviews/t2272-pernille.md). The commit is on
<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/b/20261109-093127-82531 and personal/b62, not on this lane's HEAD (5a2e29637). Between its parent and 5a2e29637,
pywidget/ios differs only in PremadeSensorStallTests.swift, so the two files at 8b20e9fb5 on this HEAD are exactly what
is under review. Line numbers are 8b20e9fb5's ExtensionLane.swift unless another file is named.
I read the diff, ExtensionLane.swift's refresh/takeTurn/turn/logClosed/judge, LaneGuard.swift's carryOut (:219-223), and
RunLogRecorder.recordLaneTurn. I did not read the author's notes beyond the commit message.

## Re-check on main ba64754724 (Pernille, 2026-11-13 9:45 PM ET)

The first thing that broke was the line numbers: main has moved 183 lines in ExtensionLane.swift since 8b20e9fb5
(bb26fb7205 is T-2494 as landed; then T-2230, T-2491, T-4152, T-3895). I re-read main's HEAD, not the parked commit.
Read only, no Swift change, no Xcode run (Idris holds the slot). Line numbers in this section are main's
ExtensionLane.swift at ba64754724; the sections after it are the 11-09 review at 8b20e9fb5's numbers and stand as written.

**Verdict on main: PASS with fixes, unchanged.** T-2494's mechanism is intact on main: closed check and count in one
lock hold (:278), both ends ask `endsNow()` (:287, :303), `endsNow()` is unchanged (:427-431). The one new place that
sets `closed` keeps every invariant below. L1, L2 and L3 are still open on main; they now have board lines (T-4404,
T-4405, T-4406, all part of T-4181). No Medium or worse.

**Every path that sets `closed` (two now, was one):**
- :418, a stuck run, as before: after the run's row and status.json (:405-415), inside the turn.
- :398, new with T-3895: `bridge.run` threw BridgeError.stuck (`Ran.start == .bridgeStuck`, :84). It sets `closed`,
  then writes the turn's own `closed` row (:399), still inside the turn, so `inFlight[id]` holds and the turn's own end
  waits for that row. `finished` is nil on this path (:79), so `judge` does not run on the turn that sets `closed` here
  either. The id is not put in `stuckHere`, which is right (its run did not go stuck), and `closedLogged` stops a later
  closed caller for the same id writing a second row. `closed` is set before the row here, after it at :418; that order
  is not observable, because turns run one at a time and a closed caller for this id joins `inFlight[id]` instead.
- Nothing clears `closed`.

**Every call to `exit` (three, unchanged):** a turn's end (:290), a closed caller's end (:305), and `judge` (:616) into
WidgetLaneGuard.carryOut (LaneGuard.swift:267-271, the same code as at 8b20e9fb5). carryOut's exit does not set
`ended`. It runs only on a turn with `finished` set, and both `closed` setters are on turns with `finished` nil; turns
run one at a time, so `closed` is false and `closedWriters` is 0 whenever carryOut runs. With the real `_exit` that is
safe (L2 stands as a doc and stub matter). `ExtensionLane.endProcess` is passed nowhere else in Shared.

**A turn ending while a closed caller writes:** as in the 11-09 analysis, on main's numbers: c counts itself at :278,
b's end gets false while `closedWriters` is 1, c's end after its row and status.json gets true and calls exit. The turn-
first order still leaves L1's window (:278 never reads `ended`).

**Exactly once:** `ended` is set in the lock hold that returns true (:429). Both lane exits go through it; carryOut's
does not (L2). Once per process with the real `_exit`.

**What the tests pin on main** (the two T-2494 tests are unchanged since 8b20e9fb5, now at ExtensionLaneTests.swift:1377
and :1414; by reading, not run):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Re-check on main ba64754724 (Pernille, 2026-11-13 21:45 ET), scrolls sideways" style="--tw:640px" markdown="1">

| Mutant on main | Test that goes red |
|---|---|
| Drop the count (:278 `closedWriters += 1`, :302 `-= 1`) or `closedWriters == 0` in `endsNow` | :1377 (b exits while c is held between row and status) |
| Count down before `logClosed` (:300 and :302 swapped) | :1377 |
| Drop `inFlight.isEmpty` from `endsNow` | :1377 (a's end exits while b is still queued: `exitCount` 1 at :1397 where 0 is asserted). testATurnQueuedBehindAStuckRunRunsNothing (:402) does not catch it: it counts exits, not rows at exit |
| Drop `if ends { exit() }` at :290 | :383 and :1377 |
| Drop `!ended` / `ended = true` | :1414 (3 exits, not 1) |
| Drop `closed = true` at :398 | testAStuckBridgeAtQueueingIsTheClosedLane (:1611, `exitCount` 0) |
| Put the bridgeStuck id in `stuckHere` at :398 | :1611 (no `deferred` row) |
| Move `closed = true` after `logClosed` at :398-399 | none; equivalent, see above |
| **Count in a second lock hold** (the closed check returns nil, the else branch takes the lock again to count) | **none**. :1377 holds c at its row step, long after the count, so it pins "counted before the row", not "counted in the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> that saw `closed`". A turn ending in the gap between the two holds would exit under c's row. No seam lets a test put b's end in that gap; it is held by code reading only. Not a board line |
| **A closed caller after `ended`** (L1) | **none**. T-4404 adds the probe |

</div>


## Test runs: none ran

I put the two files from 8b20e9fb5 in the worktree, added a scratch probe for L1 (below), ran `xcodegen generate`, then
`tools/xc.sh -scheme PyWidget -destination "platform=iOS Simulator,name=iPhone 17" test
-only-testing:PyWidgetTests/ExtensionLaneTests`. The runner refused it (exit 2: uncommitted paths). With `XC_LOCAL=1`
it waited on the machine's xcodebuild lock, which other lanes' runs held, printed nothing for 20 minutes, and was stopped
by my tool's time limit. **No test ran, the author's two tests included.** The mutant results below come from reading the
code. The files are back at HEAD, and neither the probe nor any mutant is committed.

## Verdict

**PASS with fixes.** The fix closes F4 as I reported it: a caller that finds the lane closed is counted in the same
lock hold that sees `closed`. Neither a turn's end nor another closed caller can then end the process until that caller's
row and status.json are both down. `ended` makes `endsNow()` true once. Nothing below blocks the TestFlight build. There
is one gap of the same kind left, much narrower (L1), and one doc claim that is not true of carryOut's exit (L2).

## The paths (checks 1-3)

- **Setting `closed`:** only :323, inside a turn, after that run's row and status.json (:312-321). Nothing clears it.
- **`exit` calls:** three. A turn's end (:206-213), a closed caller's end (:222-227), and `judge` (:471), which goes to
  `WidgetLaneGuard.carryOut` (LaneGuard.swift:222).
- **Turns run one at a time.** Each turn awaits `before?.value` (:203). `lastTurn` is never cleared, so a turn's
  `turn()` starts only after the previous turn's task has returned. When the stuck turn sets `closed`, no other `turn()`
  is running, and every later turn stops at the closed check in takeTurn (:243). It writes its `closed` row there, while
  still in `inFlight`, so its own end waits for its row.
- **carryOut's exit** (check 1) runs only on a turn whose run finished. A stuck run has `finished == nil` in production
  (:542), so `judge` never runs on the turn that sets `closed`. Because turns run one at a time, `closed` is still false
  at carryOut, so `closedWriters` is 0 and no `closed` row is being written. The turn's own row is already down
  (:312-321, before :326). Turns queued behind it have written nothing yet. `_exit` never returns, so in production it
  cannot be followed by a second exit. It does not set `ended`. That matters only with a stub (L2).
- **A turn ends while a closed caller writes, caller first:** c takes the lock at :196, sees `closed`, and counts itself
  (:201). b's turn ends: `inFlight` is empty, but `closedWriters` is 1, so `endsNow()` is false and there is no exit. c
  writes its row and status.json in one recordLaneTurn, takes the lock, counts down to 0, and gets true from
  `endsNow()`, so c calls exit. Correct.
- **Turn first:** b's end gets true from `endsNow()`, which sets `ended`. A caller c that arrives after that point still
  passes :201 and writes. See L1.
- **Exactly once (check 3):** `ended` is set in the same lock hold that returns true, and every exit path except
  carryOut's goes through `endsNow()`. Once per process, yes. In production carryOut's exit is the process's last act.

## Do the tests pin it? (check 4; by reading, not run)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Do the tests pin it? (check 4; by reading, not run), scrolls sideways" style="--tw:960px" markdown="1">

| Mutant | Test that goes red | Why |
|---|---|---|
| Drop `closedWriters += 1` / `-= 1` (:201, :224) | testAClosedRowFromAReloadIsWrittenBeforeTheProcessEnds (:1303) | b's end exits while c is held between its row and its status: `statusAtExit["c"]` is false |
| Count down before `logClosed` instead of after (:221-224 swapped) | same | as above |
| Drop the closed caller's `if ends { exit() }` (:227) | same | b's end waits on c, c never exits: `exitCount` 0 |
| Turn end back to `closed && inFlight.isEmpty` (:210) | same | b exits under c's row; c's end then exits again |
| Drop `!ended` from `endsNow()` (:333) | testAClosedReloadAfterTheEndCallsExitNoMore (:1340) | each b reload exits: 3, not 1 (the author's run says the same) |
| Write in the gap after `endsNow()` and before `exit()` (L1) | **none** | no test puts a caller in that gap |

</div>


The first test is sound for the order it targets. The row-step hold puts c's count ahead of b's end, and the stub's exit
reads status.json at the moment of exit, which is exactly what F4 asked for. Its costs are in L3.

## Findings

**L1 (Low): ExtensionLane.swift:201 against :206-213 and :222-227. A caller that arrives after `endsNow()` returned true
and before `exit()` runs still writes its `closed` row, and `_exit` can cut it between the row and status.json.**
`ended` is set under the lock, but `exit()` runs after the lock is released (on purpose: a stub may call back in). The
closed branch at :201 does not look at `ended`. Failure: `a` is stuck and its turn is the last one in flight. Its end
gets true from `endsNow()` and releases the lock, and then the scheduler takes the thread away before `_exit`. That is
likely here, because the stuck Python thread is still burning a core. WidgetKit's getTimeline for `c` takes the lock,
counts itself, makes `widgets/c/`, and appends its `deferred` row. Then `_exit(0)` lands before the status.json write.
c has the row and no `deferred_since`: the same harm as F4, now in a window of microseconds to milliseconds instead of a
whole turn's tail.
Fix: in the closed branch, when `ended` is already set, return `.closed` without calling `logClosed` and without
counting. The process is ending, and a row that is never started cannot be left half-written. Test: the probe below,
which should go red now and green after the fix. It builds the lane with an exit stub that, on its first call, starts
`refresh("c")` on another task (as `writer` "c"), waits until c's row step is reached (held there by the recorder's
`observe`), then records c's row count and status. Expected now: rows 1, status false.

**L2 (Low): ExtensionLane.swift:133-135 and :330-331 against :471 (LaneGuard.swift:222). The docs say `ended` means "exit
was called", but carryOut's exit does not set it.**
In production this cannot cause a second exit (see "The paths": closed is false at carryOut, and `_exit` does not
return). With a stub exit it can: a test that judges `endProcess`, then makes a stuck run, gets a second exit from
`endsNow()`. The test helper makes that easy, because `lane()` defaults to `finished: clean` even with `stuck: true`, so
`judge` runs on a stuck turn there, though never in production (:542).
Fix: pass carryOut a closure that sets `ended` under `lock` before calling `exit`. Or say in both docs that carryOut's
exit is outside `ended` and why that is safe.

**L3 (Low, test only): ExtensionLaneTests.swift:1308-1316. The race test takes a fixed 1 s when green, and with a slow
start it goes red, not falsely green.**
On the fixed code, c's hold ends only when exit has read the statuses, and exit comes after c, so c always waits out its
1 s. b's wait for c's row is also <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 1 s. If the test's task reaches `refresh("c")` more than 1 s after b's row
(a loaded simulator), b ends first. Then c's row is missing at exit and :1330 fails on correct code. The direction is
safe, but it is a flake source on the runner.
Fix: release c's hold on a flag the test sets once b's turn has returned (`second.value`), not on exit. Raise both caps
to 3 s.

**I1 (Info, before this change): ExtensionLane.swift:198. `queued += 1` runs before the closed check, and a closed
caller never counts it down.** After `closed`, `queued` never returns to 0, so `gathered` stays set. A closed lane makes
no turn, so nothing reads either, and there is no harm. Moving :198 below :201 would keep the count true.

No Medium or worse, so no board lines (the packet asks for those only). L1-L3 are for Idris to take into T-2494's
follow-up or leave on record here.
{% endraw %}

</div>
