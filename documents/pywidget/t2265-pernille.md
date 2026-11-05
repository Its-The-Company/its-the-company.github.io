---
layout: "default"
title: "T-2265 review: 654bf72e6 and f7ca2d3bd (run-end tail, stuck under lock, emit_for_run)"
section: "documents"
description: "The ordering work is right, and three of the four tail tests do what they say. But f7ca2d3bd swaps one bug for a worse one. Before, a run whose tail hangs got stuck in the wrong place in the stream. Now it never gets\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2265-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2265-pernille.md</code></span></div><h1>T-2265 review: 654bf72e6 and f7ca2d3bd (run-end tail, stuck under lock, emit_for_run)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (Commandment 13): I read the diffs, the tests, the mutant files and
the code around them (pwbridge.c emit_rec, pw_rt_run, br_write, br_emit; PyBridge.swift stop, markStuck, doRun,
emitStatus; bridge-contract.md s5 Stuck). Nothing was compiled or run by me; T-2266 (Idris) owns the runner job.

## Verdict: fix first

The ordering work is right, and three of the four tail tests do what they say. But f7ca2d3bd swaps one bug for a worse
one. Before, a run whose tail hangs got `stuck` in the wrong place in the stream. Now it never gets `stuck` at all,
and the app wedges with no way out (H1). Also, f7ca2d3bd has never been compiled. Nothing here ships to TestFlight
until H1 is fixed and T-2266 is green, with every listed mutant killed.

## Findings

### H1 (High): a refused `stuck` never comes back, so a tail that hangs wedges the bridge silently
`PyBridge.swift:673-675` sets `state.deadlineHit = true` before calling `markStuck`. `PyBridge.swift:711` then returns
`(false, [])` when the live emit is refused (the run's `finished` is queued). No later tick retries, `isStuck` stays
false, and `resetWaiters` are never resumed.

That is fine only if the tail is short, and it is not always short. Once the runner queues `finished` it still has to
run bytecode, so it needs the GIL. A daemon thread inside a C call that holds the GIL (`re` with catastrophic
backtracking, a big-int op, a C extension that does not release the GIL) keeps the main thread out of
`pw_rt_run`'s tail indefinitely. The hard stop at 2 s waits in `PyGILState_Ensure` behind that same GIL
(`pwbridge.c` `pw_rt_hard_stop`). So the console shows `finished(interrupted)` and never `stuck`. Run and Restart
queue up behind a `doRun` that never returns, the Restart continuation waits forever, and the user gets no banner and
no "quit and reopen". Contract s5 (Stuck) says Run and Restart refuse with `stuck` in this state.

Before f7ca2d3bd this case did recover: `isStuck` was set, waiters got `.stuck`, and later runs threw. Only the
stream order was wrong.

Fix (my suggestion, Idris's call): split the two meanings. When the live emit is refused, still mark the bridge stuck:
set `isStuck`, resume `resetWaiters` with `.stuck`, note it in the crash marker. Record separately that no `stuck`
record went out (e.g. `stuckSent = false`). Then `doRun` emits `unstuck` only when `stuckSent`. That keeps S5 (nothing
of the run's after `finished` except the contract's `unstuck`) and keeps the liveness.

Test that would have caught it: `runHeldAtItsEnd` with `ready: true`. Hold past the deadline, call
`restart()`/`reset` from a task, and assert it throws `.stuck` within about 1 s, before `holdRunEnd(false)`. Today it
would hang until the 30 s debug release. Add it to `mutants-t2054.json` with the "refused marks nothing" mutant.

### L1 (Low): user code can forge its run's `finished`, and the new test pins that
`pwbridge.c:486-487` always queues `finished` from `_pwbridge.emit`, whoever calls it. `BridgeTests.swift:292-299`
(`testNothingFromPythonFollowsTheRunsFinished`) uses this as its window and asserts that a second `finished` follows
(`[.finished]`). So one run gets two `finished` records, and the collector keeps the forged one (`{}`, no outcome). The
real outcome is lost. For a widget run, that is what status.json gets. This predates these commits, but the test now
treats it as intended. Either refuse a second `finished` per run in C (`g_done_run == rid` already tells you), or have
the test say clearly that the double `finished` is a known gap, not the contract.

### L2 (Low): `failNextRun` can leak into the next test
`BridgeTests.swift:379` arms `g_dbg_fail` before `runHeldAtItsEnd`. If `bridge.run` throws or the test fails before
the run starts, the flag stays set, and an unrelated later test ends `internal_error`. No teardown clears it. Fix:
`pw_debug_fail_next_run` takes an int (0 clears), and the teardown block calls it with 0, as `holdRunEnd(false)` does.

### L3 (Low): the debug declarations are not guarded in the header
`pwbridge.h:53-56` declares `pw_debug_*` in every configuration. The definitions are `#ifdef DEBUG`
(`pwbridge.c` T-2056 block), and the Swift callers are `#if DEBUG` (`PyBridge.swift` debug accessors). I checked the
project: only the project-level Debug configuration sets `DEBUG=1` and `SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG`,
both inherited by the targets. Release has neither, and there are only two configurations. So nothing leaks today,
and a stray Release caller would fail at link, loudly. Still, wrap the three declarations in `#ifdef DEBUG` so the
header says what the build does. When T-2266 runs, have it also check with `nm` that a Release build has no
`pw_debug_` symbol. That is a one-line check, and it proves the property better than reading it.

## Checked and fine

- **Races between finished, stuck and status.** The `stuck` live emit under `lock` takes `lock -> g_qlock`. `g_qlock`
  is never held while calling out: `emit_rec` merges the dispatch source after unlocking, and `pw_records_drain` calls
  its callback after unlocking. So no inversion is possible. `stuck` is either ahead of `finished` or refused, and
  `unstuck` (a plain emit after `pw_rt_run` returns) follows a `stuck` that was queued under the same lock. `unstuck`
  after `finished(interrupted)` is allowed by contract v4.4 row 6. The internal_error path: `:719-721` marks the run
  over before Swift's `finished`, so `stopping` and `stuck` in that gap are refused. `g_done_run` holding one value is
  enough because only one run is current.
- **emit_for_run.** `rid` is read before the back-pressure <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> and checked against `g_run_id` after the GIL is back
  (`Py_END_ALLOW_THREADS`). `g_run_id` changes only under the GIL (`pw_rt_run:706, :722`), so the check and the
  `g_done_run` check under `g_qlock` cover both "after finished" and "a later run or between runs". Run 0 stays plain.
- **Would the tests fail with the fix reverted?** I traced each mutant by hand:
  - stuck-not-live: `[stuck, unstuck]` after finished, red.
  - stuck-marked-when-refused: `[unstuck]`, red.
  - no-done-mark-at-finished: `stopping` accepted after finished, red.
  - no-done-mark-at-run-end: the internal_error `stopping` accepted, red.
  - no-<span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>-guard: `ladderInstalled` is true, red. `stop()` runs synchronously inside the record callback, before
    the run's result is handed back, so the read is ordered.
  - write-plain and done-run-only: A's line after A's finished, red.
  - emit-plain: the late status, red.

  T-2266 has to confirm all of these on the runner. None is confirmed yet.
- **Debug hook design.** It holds the GIL like the real tail, releases itself after 30 s (`CLOCK_REALTIME` with
  `pthread_cond_timedwait`, a correct loop), and is consumed per run.
{% endraw %}

</div>
