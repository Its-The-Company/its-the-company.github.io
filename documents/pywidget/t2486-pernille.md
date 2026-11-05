---
layout: "default"
title: "T-2708: review of 867fdc805 (T-2486, T-2265 H1: a refused stuck still marks the bridge stuck)"
section: "documents"
description: "Pass. H1 is fixed as I asked. A tail that hangs after finished now marks the bridge stuck. A waiting Restart gets .stuck, Run refuses, and the stream still carries nothing of the run&#x27;s after finished. I found nothing\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2486-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2486-pernille.md</code></span></div><h1>T-2708: review of 867fdc805 (T-2486, T-2265 H1: a refused stuck still marks the bridge stuck)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-05. Independent review (C13). I read the diff, `PyBridge.swift` at 867fdc805 (`markStuck` :746-767,
`restart()` :772-784, `stop()` and its <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> :666-728, `doRun` :942-999, `doReset` :1001-1023), the two tail tests in
`BridgeTests.swift` (:330-387), `mutants-t2054.json`, contract s5, my T-2265 review and the evidence
`pywidget/ios/bench/t2486-red-green.txt`. The console consumer: `PyWidgetApp.swift` :645-660 and :826-831.

**Verified by reading only. Nothing run by me**: no local Xcode slot, and the commit is not on origin/main, so the
MacBook runner cannot take it. The red and green runs are Idris's (evidence file, at 608c5a522 plus this change, not
at 867fdc805 on top of 45210ae2a). The three mutants have not been run by anyone yet.

## Verdict

**Pass.** H1 is fixed as I asked. A tail that hangs after `finished` now marks the bridge stuck. A waiting Restart
gets `.stuck`, Run refuses, and the stream still carries nothing of the run's after `finished`. I found nothing that
blocks the first TestFlight build. One Medium (M1, T-2716) and two Lows (T-2717) go to Idris as follow-ups.
T-2486 may be ticked once BridgeTests passes at 867fdc805 itself and `mutants-t2054.json` shows 3/3 KILLED.

## What I checked

**Lock order.** Unchanged and correct. `markStuck` takes `lock`, then `emitStatus(live:)` takes `g_qlock` inside
`pw_emit_live`, and it assigns `stuckSent` and `isStuck` in the same region (:756-757). `doRun` reads and clears both
under `lock` (:991-996) and emits `unstuck` outside it (:998). No new lock is taken, and nothing takes `lock` while
holding `g_qlock`.

**markStuck racing the run's end.** `doRun` sets `currentRun = 0` in the same region where it reads and clears
`stuckSent`/`isStuck`, and `markStuck` guards on `currentRun == runID`. That leaves two orders. Either markStuck comes
first, and doRun clears the mark it made, or it comes second and marks nothing. So `isStuck` cannot outlive the run.
If the deadline tick lands in an ordinary short tail (`finished` queued, `pw_rt_run` a few ms from returning), the
bridge is stuck for those few ms. A Restart waiting then gets `.stuck` although Python is back a moment later. That
is the price of the fix and I accept it: the tick cannot tell a short tail from a hung one, and refusing is the only
answer that cannot wedge.

**Order of records.** If the live `stuck` is accepted, it is ahead of `finished`, `stuckSent` is true, and `unstuck`
follows `finished` (contract v4.4 order). If it is refused, `stuckSent` is false and nothing follows `finished`. That
matches S5.

**resetWaiters.** markStuck takes the waiters under `lock`, resumes them with `.stuck` outside it, and purges the
queued `.reset` jobs. `doReset` cannot run concurrently, because it runs on the script thread, which is inside
`doRun`. No continuation can be resumed twice: each one is taken out of `resetWaiters` under `lock` exactly once. Two
narrow races remain in `restart()` itself. They predate this commit (L1).

**Does the test reach the refused-stuck window?** Yes, by reading. `runHeldAtItsEnd(ready: true)` stops the run at
READY, which starts the ladder at t0. The <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> C after `finished` is queued, and the test asserts `finished`
before going on (:358-359). The Restart starts well before t0 + 5 s, so its waiter is queued when the deadline tick
fires. Then `pw_stop_step` still sees the run active, `markStuck` runs, and its live emit is refused because
`finished` is out. Two assertions prove the refusal actually happened. With an accepted `stuck`, `stuckSent` would be
true and `unstuck` would follow `finished`, so `statusesAfterFinished == []` (:383) would fail. And
`activeRunInC == a` (:372) shows Restart was answered while the tail was still held, not after it returned. The
30 s debug auto-release is far past the 6.5 s wait.

**Would the mutants be killed?** By reading, yes. Every find string occurs exactly once in the file, which is what
`tools/xc_mutants.py` needs (it reports MISSING otherwise).
- Entry 1, `stuck-not-live`: the plain emit is accepted after `finished`, so `stuckSent` is true and the old test
  reads `[stuck, unstuck]` after `finished` (:347). Killed.
- Entry 2, `return isStuck`: in both tail tests `isStuck` is true at doRun's end with nothing sent, so `unstuck`
  follows `finished` (:347, :383). Killed by both.
- Entry 3, `guard stuckSent else return`: this behaves exactly like the pre-fix code. The RED run in the evidence is
  that behaviour (4 failures: :370, :371, :373, :374), but it is not a run of the mutant itself.
The old entry 2 (`stuck-marked-when-refused`) was rightly removed: what it described is now the intended behaviour,
and its find string no longer exists.

**Crash marker.** A refused stuck now notes `stuck` in the marker (:763). That is what I suggested in T-2265 and
what the code did before f7ca2d3bd. Not a finding.

## Findings

### M1 (Medium): the stuck banner set from a refused stuck is never withdrawn (T-2716)
This commit creates a state that did not exist before: the bridge is stuck but no `stuck` record was sent. In the
hung-tail case, the console's Run is enabled again once it renders `finished` (`running = 0`). If the user taps Run,
`run()` throws `.stuck`, and `PyWidgetApp.swift:655-656` sets the quit-and-reopen banner. If the tail then returns
(the daemon's C call ends), `doRun` sends no `unstuck` because `stuckSent` is false (`PyBridge.swift:995-998`). The
banner is cleared only by an `unstuck` record (`PyWidgetApp.swift:829`), so it stays while Python works again.
Contract s5 (line 170) says `unstuck` withdraws the banner when the script thread returns. The harm is small: the
banner's advice, quit and reopen, is safe and loses nothing. So this is not a TestFlight gate. It is still wrong copy
on screen. My suggestion: when `isStuck && !stuckSent` at doRun's end, send a bridge-level `unstuck` with run_id 0,
which keeps S5 for the run, and let `render()` take it (status records already pass its run-id guard). Or have the
console clear the stuck banner once the bridge's `stuck` goes false. Idris's call.

### L1 (Low, pre-existing): two Restart races around the stuck mark (T-2717)
`restart()` checks `isStuck` in one lock region (:773-776) and appends its waiter in another (:780).
- A markStuck between the two leaves that Restart waiting on the tail. That is H1's symptom, in a window of
  microseconds.
- A markStuck between the append and `push(.reset)` resumes the waiter with `.stuck` and purges the queue before the
  reset is pushed. The orphan reset then runs after the tail with no waiter.

Fix: check `isStuck` and append in one region, and resume `.stuck` there.

### L2 (Low, coverage): no mutant for the cleared `stuckSent` (T-2717)
Dropping `stuckSent = false` from doRun's defer (:995) leaves it true after a sent stuck. Every later run that is
never marked then gets a stray `unstuck` after its `finished`. I could not tell by reading whether any current test
<span title="A test written in advance. If it fires, we drop the idea.">kills</span> this. Add the mutant, and a test if none kills it.
{% endraw %}

</div>
