---
layout: "default"
title: "One merge route for every account (T-5135, Odalys, 2026-11-19)"
section: "documents"
description: "Work done on the company&#x27;s own account reaches main through &quot;the gate&quot;: the worker who finished the change hands it over from its own working copy, the gate tests just that change against the current main, and puts it\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/one-merge-route.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/one-merge-route.md</code></span></div><h1>One merge route for every account (T-5135, Odalys, 2026-11-19)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by: Investor an Investor, #325 c7011717982 (9:17 AM 11-19): "Why do personal account changes merge in a different
flow than main account merges? Do a deep dive into this to see if this is optimal. We generally want the flow to be the
same, regardless of the account that work is done on ... Let me know if this update would cause real performance
improvement, and if so, what needs to be done to do this the best way." Part of T-5005 (one coordinator for every
account's sessions). Read-only research: no tool, test or code changed.

## In plain English

Work done on the company's own account reaches main through "the gate": the worker who finished the change hands it
over from its own working copy, the gate tests just that change against the current main, and puts it on main the
moment it passes. Work done on the two personal accounts goes a different way: each account's sessions put finished work
on a branch, and a landing run takes the branches one at a time, sometimes several tasks together, tests them as one,
and merges. The two exist because they were built at different times (the landing run on 11-01; the gate on 11-07,
taking changes from a worker's copy since 11-10) and nobody joined them.

The records say the gate is the faster route. Over the last 3 days a personal-account change took a median of
59 minutes from finished to on main; a main-account change took about 20. The gap is the landing run's design, not the
tests: it holds one lock for every account while a batch is tested, so one slow or failing test stops everyone, and when
a batch fails every task in it goes back, good ones included (22 tasks in 3 days, among them T-4994, a fix the Investors
asked for this morning).

The recommendation: yes, one route pays off. Keep the gate as the one route for every account, run it from the coordinator
rather than from the worker's own terminal (so no command time limit cuts a check short), and retire the landing run's
lock and batches once the gate has carried 100 personal-account changes at the expected speed. Expected saving: 28 to
38 minutes per personal-account change at the median (about 18 to 40 hours of waiting a day across them), no good change
held back by another's failure, and no main-account check lost to a time limit. Finished tasks per day: a small gain,
not proven (at most about 4 more starts a day on this record). The steps are below; two of T-5126's planned fixes become
part of this change instead of being built twice.

## The two routes today


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The two routes today, scrolls sideways" style="--tw:832px" markdown="1">

| | Main account: the gate (tools/main_gate.py land --from COPY) | Personal accounts: the landing run (tools/personal_land.sh land) |
|---|---|---|
| Who starts it | the worker, from its own shell, when its task is done | the account's tick or the supervisor, once a session leaves a ready marker |
| Unit | one task: the named files of the worker's copy, put on main's HEAD as one commit (T-4911); no branch history | one branch: its commits rebased onto main, merged fast-forward; a retry train joins up to 8 lines (LAND_TRAIN_MAX), a records train up to 20 |
| Lock while testing | none across lands: checks run side by side, bounded by the heavy-run slots; only the commit is one at a time | one lock (.git/personal-ready/.landing) held for rebase, the whole host check, Xcode and push; every other branch waits |
| Which tests | suites chosen by what the change reaches (suite_floor.py plus every suite naming the file); a pass is kept by content key, so a suite whose files did not change since a pass is not run again, even after main moves | the checks the board line names plus a path floor; check-ahead proofs (tools/land_par.py) and a kept host pass per suite (host_keep) |
| App changes | a MacBook build and unit run of that exact content (land_xc.py, slots m..m9); the verdict is kept by content key | the MacBook (or this Mac mini) Xcode run inside the lock |
| When main moved under it | a file both sides changed: refused until `settle` lays main's change into the copy; other files need nothing | rebase; a conflict holds the branch |
| On a red | the worker sees it at once and fixes it in the same session; one narrow in-place fix (T-4676); red already on main is probed and quarantined | the branch is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> (parked/<id>/<time>), a retry line queued; one narrow in-place fix; main-red probe and quarantine; a held train is halved and bisected on retry |
| One red, many tasks | cannot happen: one task per land | the whole batch goes back |
| Time limits | the worker's shell: a 10 or 20 minute command limit cuts a long check (the run is lost, and run again) | none from a shell; a land past its tick's time waits "out of time" for the next tick |
| Test slots | the gate has a reserved slot and goes ahead of waiting <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> runs (heavy_slot.py) | general slots only, behind the gate |

</div>


What each has that the other lacks:

- Only the gate: lands without a shared lock; one task per land, so a red is only its own; test passes kept by content
  across main's moves; suites by reach; `settle` for a shared file; the author fixes a red while it still has the
  context.
- Only the landing run: runs outside any worker's shell, so no command limit cuts it; parked refs, the sent-back queue
  and retry lines (work survives its session); records trains (many record-only commits in one land); train
  bisection; it pushes main itself.
- Both: main-red probe and quarantine (suite_main_red, quarantined rows), one narrow in-place fix (T-4676), the MacBook
  Xcode check, the Investor-owned path refusal.

## Measured, 11-16 9:10 AM to 11-19 9:10 AM ET (72 h), with the 7 days to 11-19 9:10 AM beside it

Scripts: the T-5135 scratch folder (flowroutes.py, gateroutes.py), reads of the records named, nothing else.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Measured, 11-16 9:10 AM to 11-19 9:10 AM ET (72 h), with the 7 days to 11-19…, scrolls sideways" style="--tw:1280px" markdown="1">

| | Personal accounts (landing run) | Main account (gate) | Source |
|---|---|---|---|
| Tasks reached main | 218 (191 with a ready row) | 123 | ops/metrics/flow.jsonl, `merged` rows by src land and main_gate |
| Finished to on main, median | 58.5 min (7 days: 43.0, n=269) | 18.9 min + the first suite run (7 days: 14.0, n=230) | flow.jsonl: ready row to merged row; gate: first main_gate.jsonl row of the task to its merged row |
| p75 / p90 | 104.0 / 198.5 min | 66.8 / 187.2 min | same |
| Under 30 min | 65 of 195 (33%) | 71 of 119 (60%) | same |
| Lock held | 31.2 h of 72 h; 27.5 h of it the host check | none across lands | ops/runs/land_steps.jsonl (T-5128) |
| Land attempts held | 32 of 241 (13%); batches 11 of 48 (23%), single tasks 21 of 193 (11%) | n/a (per task, below) | land_steps.jsonl |
| Good work held back by another task's red | 22 tasks parked by a batch-mate; parks added median 28 min, p90 4.8 h, 69 task-hours to the 24 parked tasks that later landed | 0 by design | land_steps.jsonl, tools/park_stats.py --since 2026-11-16 |
| Reds | 71 of 395 lane checks failed (18%); 18 of 191 merged tasks went back to their author first (9%) | 62 of 1,205 suite rows red (5.1%); 38 of 119 landed tasks met at least one red, settle conflict or refusal (32%) | flow.jsonl check field; main_gate.jsonl |
| Time-outs and reruns | 8 checks stopped at a time limit; 47 "out of time: waits for the next tick" lines | 41 `wait` rows (MacBook result not in yet: the worker must run the same command again); 4 gate runs cut by agents' command limits named in ops/board_notes/T-5126.md | flow.jsonl; tools/land_stats.py --timing; main_gate.jsonl |
| Test slot time held (61 h the slot record covers, from 11-16 8:05 PM) | suites 33.1 h, host 24.9 h, landcheck 6.2 h; slot waits 43.5 h (T-5128) | gate suites 36.5 h, gate host 5.5 h; gate suite wait median 0.0, p90 1.4 min | ~/Library/Caches/company-heavy-slot/waits.jsonl |

</div>


How to read it:

- The gate's 18.9 min starts at its first record, which is written when the first suite ends; process suite rows carry
  no seconds, so the first run is missing. Gate suite runs took median 1.3 min, p90 12.4 min of wait and hold
  (waits.jsonl, gate-suites, n=605), so about 20 min is the fair median.
- Red rates are not counted the same way on the two routes (a lane check is a whole batch's check; a gate row is one
  suite), so they are given in their own units, not compared. What can be compared is the cost of a red: on the gate it
  falls on its own task; on the landing run on the batch and on every branch queued behind the lock.
- The routes carry different work, and the gate gets the reserved slot. So these are medians of what happened, not a
  controlled trial. Step 1 below runs one personal-account slot through the gate to measure the same kind of work
  both ways before anything is retired.

### Today's 8:50 AM parked batch (b2)

From land_steps.jsonl, ops/runs/personal-tick-b.log, ops/runs/personal-land-b2-20261119-085001.log,
ops/runs/personal-land-b54.log and flow.jsonl:

- T-4994 (the task-queue fix the Investors asked to ship this morning) was finished at 6:59 AM. Its batch, b2, also
  carried T-4850, T-4891 and T-4849, and a lane record of T-4913. The code of T-4891 and T-4849 was already on main
  (3:20 AM and 3:32 AM, by other copies); the landing run left 3 such commits out.
- b2 took the lock at 7:45 AM, waited for a test slot, and ran its checks: four suites passed (61, 165, 52 and 325
  rows), then supervisor_test.sh failed one row after 1,175 s (close_by, the timing row of T-2117). The same suite
  passed on main at 8:35 AM. At 8:50 AM the whole batch was parked: 65 minutes of the lock, nothing landed.
- T-4850 changes how supervisor_test.sh runs, and T-4850 alone (b54) failed the same row at 9:12 AM. So the red follows
  T-4850 or load, not T-4994. T-4994 is still off main at 9:25 AM, about 2.5 hours after it was finished. T-4913's
  record, readied again alone at 8:53 AM, has waited for the lock since.
- On the gate, T-4994 would have landed on its own check; T-4850's red would have stopped T-4850 only.

## Does one route pay off?

Yes. Measured saving, if every account's work takes the gate's path:

- Per personal-account change: 28 to 38 min at the median (43.0 to about 15 over 7 days; 58.5 to about 20 over 3).
  At the 64 a day (3 days) to 38 a day (7 days) such changes reaching main, about 18 to 40 task-hours of waiting a
  day. The slow end (p90 about 3 h on both routes) is mostly reds and their fixes and moves little.
- Good work held back by another's red: 22 tasks in 3 days to none.
- The lock: 27.5 h of host checks in 3 days stop blocking every other branch (the landing run's biggest cause, T-5128).
- Main-account changes: no faster at the median, but no check lost to a command time limit once the coordinator runs
  the land (41 `wait` reruns and 4 cut runs in 3 days).
- Finished tasks per day: small and not proven. The process queue was over its limit of 8 in 54% of samples (T-5128),
  and while over, personal-account hand-outs ran at 3.27 an hour against 3.61 under it (waiting.jsonl and flow.jsonl
  dispatch rows, 35 h of samples): at most about 4 more starts a day. Finished-per-day is measured after step 4, not
  promised.

What it costs: tasks that rode in batches get checks of their own: 124 tasks went in 48 batches, so 76 more checks in
3 days; at the lane suites' median hold (3.2 min) about 4 slot-hours, against 117 slot-hours used of 244 available
(4 slots over the 61 h recorded). Content-key passes make most of those checks short.

## The best way to do it

Which route survives: the gate (tools/main_gate.py land --from COPY). Its design already has what T-5126's items 4 and
5 would add to the landing run: no shared lock while testing, and one task per check.

What moves from the landing run into the one route:

1. Who runs it: the coordinator (T-5005), detached from any worker's shell, for every account. A worker or a lane
   session ends by leaving a ready marker; the coordinator runs the gate's land from that copy and records the result.
   The gate already returns 75 for "run me again"; the coordinator does that, not a person.
2. Where work waits after a red: the parked ref, the sent-back queue and the retry line stay as they are; the gate's
   red becomes a park of that one task's copy.
3. Records: lane records (ops/lane-outbox, memories, notes) go through the records round that already commits the
   main account's records (T-4446), never through the gate (the gate lands named code files only).
4. Push: the supervisor's push after each commit, as for main-account lands now.

Kept from the gate unchanged: suites by reach, content-key passes, settle, the MacBook check, main-red probe and
quarantine, the one narrow fix.

Retired, after the measured run: the .landing lock, batch checks and retry trains, train bisection, the rebase of lane
history. The old path stays behind a switch until then.

## Steps, as slices for T-5005

Board lines for these steps: not added. tools/board_tick.py's plain-title check refused the add at 9:30 AM 11-19
(the word "lane" in three titles); per the refusal rule the lines were not reworded, and a person adds them.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Steps, as slices for T-5005, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | slice | files | saving it carries | after |
|---|---|---|---|---|
| 1 | One personal-account slot lands through the gate: the coordinator reads its ready marker, names the copy's changed code files, runs `main_gate.py land --from` detached, parks the task on red; behind a switch, one slot only | a new tools/lane_gate_land.py; tools/personal_tick.sh (the ready hand-off) | the first same-work measure of both routes | T-4993 (T-5005's start) |
| 2 | Gate ready for every account: one test-slot queue ordered by task priority, not by account; commits one at a time with a check that main still holds what was tested; the files-it-laid fix | tools/heavy_slot.py, tools/main_gate.py [hub] | lanes no longer wait behind the gate's reserved slot | T-5096 (files it laid) |
| 3 | Main-account lands run detached too: the worker leaves a ready marker and reads the result, instead of running the land in its own shell | tools/main_gate.py [hub], the worker task packet | no checks cut by command limits | 2 |
| 4 | Every personal-account slot through the gate; the landing run kept behind the switch | tools/personal_tick.sh, ops config | the 28-38 min per change, no batch-mate parks | 1 and 2, with 20 lands from step 1 at or under the main account's median |
| 5 | Retire the landing run's lock, batches and trains | tools/personal_land.sh [hub], tests/personal_land_test.sh | one route to maintain; personal_land_test.sh (15.8 min median, T-5128) mostly goes | 100 lands through step 4 with the median under 25 min and no rise in reds on main |

</div>


What T-5126 already covers, and how this fits:

- T-5126 item 2 (suites only for changes that reach them) and item 3 (the run-loop suites split and on event waits,
  seconds on every suite row): needed on either route. Keep them as planned; they shorten every gate check.
- T-5126 item 4 (land checks off the lock, a test slot for process checks) and item 5 (a batch lands each task on
  its own check) are what steps 1 to 4 give, from the gate. Recommendation to the line's owner and the CEO: build
  them once, as steps 1 to 4, not inside tools/personal_land.sh as well. If step 1 slips past 11-21, item 4 is
  the fallback, as it is the largest single saving for lanes.
- T-4907 (reach map), T-4806 (time-outs), T-5094 (the close_by timing row), T-5096 (files the gate laid): inputs, not
  repeated here.

## Risks

- One route is one point of failure. The gate's own faults (14 settle conflicts and 5 suite refusals in 3 days,
  T-5128) would reach every account. Keep the old path behind a switch until step 5's measure is met.
- Hub files: main_gate.py, personal_land.sh and personal_tick.sh changes go one at a time through the hub queue
  (limit 1), so steps 2, 3 and 5 queue behind other hub work.
- Capacity: per-task checks add about 4 slot-hours in 3 days; the Mac mini's load (median 4.6 a core, T-5128) can
  still make timing rows red. Item 3 of T-5126 is what removes those.
- Records: if lane records reach the gate as named files they will collide with the records round; step 1 must
  name code files only and test that.
- Two commits at once into the main folder: step 2 must prove the gate's commit step is one at a time and re-checks
  main before it commits.

## Not measured, and why

- Exact finished times for main-account lands: the gate's `started` rows began on 11-19 (10 rows by 9:21 AM); before
  that the first suite's length is missing (above).
- Whether the b2 red was T-4850's own or load: the same row failed on T-4850 alone and passed on main; both fit.
- Tasks per day after the change: measured after step 4 against the 7-day baseline above.
{% endraw %}

</div>
