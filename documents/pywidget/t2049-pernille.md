---
layout: "default"
title: "T-2049: review of 55e3fb63f (T-2039, the testStopLoop red)"
section: "documents"
description: "Approve with changes. The fix is right for the path it targets. stopping now goes out before step 0, and pw_emit_live checks g_done_run under the same g_qlock that hands out seq. That means a live record either gets a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2049-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2049-pernille.md</code></span></div><h1>T-2049: review of 55e3fb63f (T-2039, the testStopLoop red)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Read the diff and the code it touches (PyBridge.swift, pwbridge.c/.h,
BridgeTests.swift, mutants-t2039.json, runner.py and records.py where `finished` comes from). I did not read
the board notes or the author's memory. Reading only: no Xcode runs (T-2051 holds those).

## Verdict

**Approve with changes.** The fix is right for the path it targets. `stopping` now goes out before step 0, and
`pw_emit_live` checks `g_done_run` under the same `g_qlock` that hands out seq. That means a live record either
gets a seq below the run's `finished` or is dropped. No lock-order problem: `stop()` calls `emitStatus` outside
`lock`, `g_qlock` is never held while `lock` or the GIL is taken (drain calls back after the unlock,
pwbridge.c:90), and pw_rt_run takes `g_qlock` under the GIL with nothing reversed. The <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> guard
(PyBridge.swift:679-685) and `doRun`'s cleanup share `lock`, so a ladder is either installed and then cancelled by
cleanup, or never installed. Resuming the cancelled timer afterwards is legal and avoids releasing an inactive
source. The hook cannot reach Release: both call sites and both declarations sit under `#if DEBUG`, and `DEBUG`
is only set in the project-level Debug config (project.pbxproj:3454).

The broader claim, that **nothing of a run can follow its `finished` except doRun's `unstuck`, is false.** There
are three other ways, listed below. None of them came from this commit, but the commit comments now say so in
writing. And the new tests do not touch the one window that the C half of the fix exists for.

No High. Three Medium, four Low.

## Medium

**M1. `stuck` can follow `finished`, and can even land after `unstuck`.** PyBridge.swift:696-708, 937.
The ladder tick gates on `pw_stop_step(runID) == 1`, which only checks `g_run_id == runID`. `g_run_id` stays set
from the moment Python queues `finished` (records.py:144 / runner.py:1427) until pw_rt_run's end
(pwbridge.c:649). `markStuck` gates on Swift's `currentRun`, which clears later still (doRun cleanup, :931).
`emitStatus(runID, "stuck")` (:707) is a plain `pw_emit`, sent after `lock` is released.
Scenario: a stopped run is stuck in a native call that returns at about 5.0 s. Python queues `finished`. The 5 s tick
then sees `g_run_id == A`, `markStuck` sets `isStuck`, and the stream reads `finished, stuck, unstuck`. If
ladderQueue is preempted between the unlock and :707, the script thread's cleanup reads `wasStuck == true` and
sends `unstuck` first, so the stream reads `finished, unstuck, stuck`. Any reader that applies statuses after
`finished` is left showing a finished run as stuck. This is the same class of bug as T-2039.
Fix: send `stuck` with `live: true` while still holding `lock`. Lock order lock → g_qlock is safe (see above).
Store whether it was queued, and have doRun send `unstuck` only when `stuck` actually went out.

**M2. Records written from the C half after a run's `finished` still carry that run's id.** pwbridge.c:364, 379, 474.
`br_write` stamps `rid = g_run_id` at call time and queues with plain `pw_emit`. Two paths:
(a) The tail window. After `records.finish` emits `finished`, the runner still runs bytecode (encode, `finally`,
return), so the GIL can switch. A daemon thread's `print` with line buffering then queues stdout for run A after A's
`finished`.
(b) Back-pressure. A writer that <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> at :366-377 has already captured `rid = A`. When the drain wakes it, which
can be after A's `finished` or in the middle of run B, it queues a record for A. Here the 250 ms ladder never reaches
it, because Stop only posts to slots while `g_run_id == A`.
Scenario: `threading.Thread(target=lambda: [print(i) for i in range(10**6)], daemon=True).start()` followed by a
short main body. Under load, stdout records for A arrive after A's `finished`, and once B starts some arrive inside
B's lifetime. A reader that ends at `finished` drops them (the test collector at BridgeTests.swift:39 does).
Fix: queue `br_write` and the non-`finished` kinds of `br_emit` through `emit_rec(..., live_only=1)`. S5 already
says the rest is dropped. This also makes the claim true at the C level. Related, mine: the open
origin-run stamping item from T-0515 H1.

**M3. Neither test nor mutant covers the window the C half of the fix is for.** pwbridge.c:52, BridgeTests.swift:252.
`holdStop` waits for `activeRunInC` (`g_run_id`) to reach 0, and that happens after pw_rt_run has already set
`g_done_run` at :647. So both tests exercise only "the run is completely over". They never exercise "the run's
`finished` is queued but pw_rt_run has not returned", which is the window line 52 closes, and which is where a
real `stop()` racing a run's natural end lands.
Failing scenario for the suite: delete line 52 (the `kind == PW_REC_FINISHED` assignment). Both tests stay green,
yet in the field a stop claimed during the runner's tail sends `stopping` after `finished`. Deleting :646-648
also survives, and that leaves the internal_error path (finished sent by Swift with `g_run_id == 0`) unprotected.
The ladder guard at PyBridge.swift:680 has no mutant either.
Fix: add a Debug-only C hold in pw_rt_run between `call_rt` and :646 (for example a flag plus semaphore a test can
set), and hold there instead of polling `g_run_id`. Add mutants: drop :52, drop :646-648, drop the :680 guard.

## Low

**L1. `g_done_run` holds one run, so a stale `stop()` can get through.** pwbridge.c:51. If `stop(A)` is claimed
and the thread is then stalled while A ends and the next run B finishes, `g_done_run` becomes B and A's live
`stopping` passes, after A's `finished`. Unlikely (main or ladderQueue starved for a whole run) but not impossible
under the load that caused T-2039. Run ids are monotonic (`newRunID`), so `run_id <= g_done_run` closes it. Keep
the "current run only" condition on the assignment at :52, or a cancelled queued run's `finished` would raise
`g_done_run` past the current run.

**L2. The internal_error path through pw_rt_run's "not started" return leaves `g_done_run` unset.** pwbridge.c:635.
That return happens before `g_run_id` is set and before :647. The Swift `internal_error` finished
(PyBridge.swift:927) is queued with `g_run_id == 0`, so line 52 does not record it either, and a claimed stop's
live `stopping` can follow it. Today this is close to unreachable (doRun skips runs when start failed), but the
comment at :647 promises coverage it does not give. Set `g_done_run = run_id` under `g_qlock` on that return too.
The other internal_error path (call_rt returns NULL) is covered by :647. Checked.

**L3. Test 2 does not prove the stop was claimed while the run was live.** BridgeTests.swift:276. `dt` runs from READY
to the collector's return. The collector itself is blocked inside `onRecord` (the hook) and the script sleeps
0.3 s, so `dt > 0.2` holds even if `stop` saw `currentRun != id` and the hook never ran. In that case the test
passes without testing anything. The 3 s timeout in the hook (:252) also ends silently. Fix: have the hook set a
`Locked<Bool>` flag, assert it, and assert that the wait did not time out.

**L4. `stopHook` is an unsynchronized `var`.** PyBridge.swift:691. It is written on the test's thread and read in
`stop()` on the collector's pool thread or ladderQueue. Thread Sanitizer would flag it. The hook also blocks a
cooperative-pool thread with `usleep` for up to 3 s. Debug only, so no product effect. Read it under `lock`.

## The two tests against the old code

The tests do not compile on pre-commit code (`stopHook` did not exist). Their red comes from the mutants.
Mutant 1 reverses the order but keeps `live: true`. With the hook at `.stepped`, the run ends first, the live
`stopping` is refused, and :263 fails with nil != "stopping". That is deterministic. Its red is "no status",
not the MacBook's "status after finished". Applying both mutants together gives the MacBook shape, and :263 and
:266 both catch it. Mutant 2 (`live` dropped) with the hook at `.claimed` queues `stopping` after the self-ended run's
`finished`, and :279 catches it in the 0.3 s window. Both mutants target the right lines and match uniquely.
The gaps are in M3.
{% endraw %}

</div>
