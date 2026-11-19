---
layout: "default"
title: "T-5126: where process merge minutes go, and the fix plan (T-5128, Odalys, 2026-11-19)"
section: "documents"
description: "Process checks are not slow because of the Simulator; most process lands take about a minute once their turn comes (162 process/site lands: median 0.1 min, p90 4.8 min from start to landed). The stall is the turn. Lane\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5126-process-merge.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 26 · Mon Nov 16</span><span><code>ops/plans/T-5126-process-merge.md</code></span></div><h1>T-5126: where process merge minutes go, and the fix plan (T-5128, Odalys, 2026-11-19)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by: Investor an Investor, #325 c7011404417 (9:05 AM 11-19): "What is the bottleneck preventing process work from
merging? ... this work should never theoretically stall, since the process merge tests run very fast. Explain the
issue and work on it's big-picture solution as a top priority task." The company's first answer (c7011454382) named
four causes. This page measures them. Read-only: no tool, test or code was changed.

Window: 2026-11-16 9:10 AM to 2026-11-19 9:10 AM ET (72 h). Scripts: the T-5128 scratch folder (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.py, gate.py,
slots.py, lock.py), each a read of the records below and nothing else.

Sources: ops/runs/land_steps.jsonl (536 lane lands); ops/runs/personal-tick-{a,b}.log; the lane land and precheck
logs in ops/runs/, the main-red probe logs in .git/personal-ready/.mainred/ and the gate's kept red outputs in
.git/main-gate/red/ (per-suite seconds); ~/Library/Caches/company-heavy-slot/waits.jsonl (2,206 rows; the heavy-slot
waits and holds); ops/metrics/main_gate.jsonl (1,205 suite rows, 62 reds); tools/park_stats.py --since 2026-11-16;
ops/metrics/waiting.jsonl and ops/runs/.waiting.json (the count); ops/metrics/machine.jsonl (3,704 load rows);
ops/metrics/bottleneck.jsonl (gate_blocks).

## Answer in one paragraph

Process checks are not slow because of the Simulator; most process lands take about a minute once their turn comes
(162 process/site lands: median 0.1 min, p90 4.8 min from start to landed). The stall is the turn. Lane lands go
through one lock (.git/personal-ready/.landing), and a land holds it through its whole host check, including the
time it waits for a heavy-run slot and the run-loop suites (supervisor_test.sh, personal_land_test.sh, 16 to 18 min
median each). So one slow or red process check stops every other lane from landing: today from 5:50 AM to 9:10 AM three
single-task lands held the lock for 64, 50 and 65 min while 20 branches waited "out of time" for the next tick. The
"one-at-a-time hub queue" in c7011454382 is a different thing (the admission limit of 1 for gate-and-scheduler
changes); it holds one task (T-4961) from starting new work, not anything from merging. Correction recorded here.

## Causes, ranked by measured minutes


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Causes, ranked by measured minutes, scrolls sideways" data-n="1" style="--tw:991px" markdown="1">

| # | cause | measured (72 h unless said) | in c7011454382? |
|---|---|---|---|
| 1 | One land lock held through the whole host check | lock busy 31.2 h of 72 h (43%); 27.5 h of that was the host step, 2.1 h the Xcode step, 1.6 h rebase and push. 3,046 tick lines "waits: another land is running"; 47 "out of time: waits for the next tick". Lands over 20 min: 35, 18.1 h in all. 11-19 5:50 AM-09:10: a50 (T-4961) 64 min, b40 (T-4850) 50 min, b2 (4 tasks) 65 min and <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>, b54 (T-4850 again) running since 8:50 AM | no ("hub queue" named instead; corrected) |
| 2 | Slow run-loop suites, made slower by load | per-suite seconds from kept logs: supervisor_test.sh median 18.3 min, p90 26.9 min (n=12); personal_land_test.sh median 15.8 min, p90 27.4 min (n=13); site_test.sh 1.8 / 2.7 min (n=15); every other process suite under 5 min. A lane check's suites hold a slot median 3.2 min, p90 17.0 min, max 100.6 min (n=285); a lane host run median 11.4 min, p90 18.1 min (n=132). Load per core at a gate suite red median 4.9, at a pass 3.2 | yes |
| 3 | Waiting for a heavy-run slot | lane suites waited 17.8 h (p90 10.8 min, max 60 min, n=285), lane host runs 16.4 h (median 1.6, p90 20.9 min, n=132), landchecks 9.3 h (median 5.8, p90 21.4 min, n=59): 43.5 h in all, 10.3 h of it on 11-19 alone. Session gate suites held 36.5 h of slot time and go ahead of lanes (heavy_slot's priority rule). Example: b2 at 7:45 AM waited 25.8 min for slot-1 while the gate held gate-0 and two general slots | partly ("share the test slots") |
| 4 | One red parks the whole batch | 32 lane holds; 11 were batches, which parked 22 other tasks with them. Parks added median 28 min, p90 4.8 h, 69 task-hours to the 24 tasks that landed after a park (park_stats). 15 of 143 land attempts did not land | yes |
| 5 | Reds that are not the change's own | gate: 62 suite reds. Timing rows under load at least 9 (supervisor_test.sh close_by 5, T-5094; personal_land_test.sh "park settle: 0.2 s" 2; personal_pool_test.sh timed out 1; queue_check_test.py "under 3 s" 1). Red already on main: 26 suite_main_red rows over 12 suites (personal_land_test.sh 6, disk_sweep_temp_test.py 6). Bad test (disk_sweep_temp_test.py) 6, quarantined. The b2 park was one of these: supervisor_test.sh close_by red at 1,175 s, then the same suite passed on main in 928 s | partly |
| 6 | Gate refusals and settle conflicts (session lands) | 14 land conflicts, 5 suite refusals; bottleneck gate_blocks n=7, 10.3 h waited in all, median 296 s, max 7.4 h | yes (T-5096) |
| 7 | Copies of one task, and process tasks riding with app tasks | 28 live ready markers for 21 tasks; T-4850 landed at 7:44 AM (b40) and a second copy (b54) holds the lock again since 8:50 AM; T-4961 landed at 6:54 AM and two more copies wait. Batch b3 carries three process tasks with an app change (T-4681), so it needs the MacBook Xcode run | no |
| 8 | GitHub push retry | 653 "push failed: main ... touches an Investor-owned path" lines in 389 distinct minutes; 11-19 4:44-5:50 AM no lane landed while it repeated (cause of the gap not proven) | no |

</div>


The process and site queue ("other" in waiting.jsonl) read median 10 over 167 samples since 11-16 9:10 AM, max 20, and
was over its limit 8 in 54% of them.

## Minutes per suite (process and site lands)

What the records hold, and what they don't: main_gate.jsonl gives seconds only for app suites (median 5.7 min, p90
11.6 min, n=418); its 787 process and site suite rows carry no seconds. The per-suite figures below are from the 150
lane and gate logs kept in the window that print "== suite (N s)"; they lean to the slow and the red (a red's log is
kept, a pass's is overwritten), so read them as the slow end. A record of every suite's seconds is part of item 3.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Minutes per suite (process and site lands), scrolls sideways" data-n="2 3 4 5" style="--tw:395px" markdown="1">

| suite | median min | p90 min | max min | n |
|---|---|---|---|---|
| supervisor_test.sh | 18.3 | 26.9 | 32.6 | 12 |
| personal_land_test.sh | 15.8 | 27.4 | 28.9 | 13 |
| personal_lane_test.py | 19.6 | 19.6 | 19.6 | 1 |
| governor_test.sh | 4.9 | 5.7 | 5.7 | 2 |
| lane_landcheck_test.py | 4.4 | 8.4 | 8.4 | 4 |
| main_green_test.py | 4.3 | 4.4 | 4.4 | 4 |
| site_work_test.py | 3.0 | 4.9 | 4.9 | 2 |
| site_test.sh | 1.8 | 2.7 | 7.1 | 15 |
| board_tick_test.py | 1.6 | 1.8 | 1.8 | 4 |
| disk_sweep_temp_test.py | 0.7 | 1.1 | 1.2 | 6 |

</div>


Lane land steps by kind (land_steps.jsonl): process and site lands (no Xcode step, n=405): host step median 9.3 min,
p90 30.1 min (n=54; most lands reuse a check-ahead proof and run no host step); rebase and push under 1 min. Lands
with an Xcode step (n=131): host median 16.0 min, p90 23.8 min; Xcode step median 0.4 min (it mostly yields: 79 of
138 "waits").

## Each waiting process task now (9:12 AM ET 11-19; 13 in the process and site queue)

Every one of these waits first on the land lock (cause 1). Age is from its oldest live ready marker.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Each waiting process task now (09:12 ET 11-19; 13 in the process and site queue), scrolls sideways" style="--tw:739px" markdown="1">

| task | waited | on what |
|---|---|---|
| T-4961 (hub) | 4.7 h | land lock; a copy already landed 6:54 AM (a50); copies a2, a56 remain |
| T-4795 | 4.3 h | land lock; now in batch b3 with app T-4681, so also the MacBook Xcode run |
| T-5045 (site) | 4.0 h | land lock; three copies (a59, a62, batch a) |
| T-5057 (site) | 4.0 h | land lock; three copies (a80, a50, batch a3) |
| T-0349 | 3.8 h | land lock; counts as app and process; batch a with T-3402 |
| T-5037 | 3.7 h | land lock; three copies (a61, a65, batch a) |
| T-4849 | 2.2 h (parked since 11-18 1:24 PM, 19.8 h) | land lock; a copy landed 4:33 AM (b47); parked b2 still names it |
| T-4850 | 2.2 h | holds the land lock now (b54, host step since 8:50 AM); a copy landed 7:44 AM |
| T-4994 | 2.2 h | land lock; parked in b2 by another task's red |
| T-2378 | 1.2 h | land lock; batch b3 needs Xcode for T-4681 |
| T-5062 (site) | 1.2 h | land lock; batch a3 |
| T-4807 | 1.1 h | land lock; batch b3 needs Xcode |
| T-4913 | 0.3 h | land lock; parked in b2 at 8:50 AM, readied alone 8:53 AM |

</div>


Median wait 2.2 h; none is waiting on its own red.

## Already on main or in flight (not repeated below)

- T-4907 (Keep main green after every land): item (1) chooses a land's suites by what reads the changed files. Item 2
  below uses that map; it does not build a second one.
- T-4806 (merge time-outs and runner errors): time-outs and runner faults retry or wait, not count as reds.
- T-5094 (session stop test holds under load): the supervisor_test.sh close_by timing row, cause 5's biggest part.
- T-5096 (gate stops counting files it laid in): cause 6. Waits on T-4838.
- T-4849 (shorten the process merge wait for good) and T-4843 (size each batch from measured data): T-4843 sets the
  batch size; item 5 below changes what a red does inside a batch, which T-4843's sizing then reads.
- T-4850 (Mac mini load): load per core median 4.6, p90 32.5 over the window; item 4 reserves capacity, it does not
  lower load.
- The count holding lane work already on main (T-5126's board note, 9:1x 11-19) is folded into item 5.

## The plan for T-5126 items 2 to 5

Hub files (tools/main_gate.py, tools/personal_land.sh, tools/supervisor.sh, tools/merge_queue.py, tools/land_xc.py,
tools/dispatch.py, tools/governor.py) wait for the gate-and-scheduler queue, one at a time. Marked [hub] below.
Order: item 4 first (largest saving), then 3, 5, 2.

### Item 4: process checks never hold the land lock, and get a slot of their own (largest saving)

What: a lane land takes .landing only once its branch has a green check-ahead proof; a branch with no proof runs its
check outside the lock, in its own worktree (the check-ahead path, tools/land_par.py, already does this for up to
SLOTS - 1 branches), and returns to the line with the proof. One heavy-run slot is kept for lane process checks
(kind "suites" and "host" from a branch with no app paths), as gate_slots keeps one for the gate; session gate suites
may not take it.
Measured saving: the lock's host time, 27.5 h of 72 h, leaves the lock; the lock then holds rebase and push, 1.6 h in
72 h. Today's 5:50-9:10 AM hold (about 3 h, two tasks landed) would have been about 3 min of lock for those two lands,
with the 20 branches that waited landing behind them as their proofs came in. Slot waits for lane process checks: part of
43.5 h, to under 1 slot's turn.
Files: tools/personal_land.sh [hub], tools/land_par.py, tools/heavy_slot.py, ops/heavy_slot.json,
tests/personal_land_test.sh, tests/heavy_slot_test.py.
ETA: 2026-11-21 (the personal_land.sh part waits for the hub queue).

### Item 3: the two run-loop suites split to run side by side, on event waits, not clocks

What: tests/supervisor_test.sh (250 rows at the b2 main probe) and tests/personal_land_test.sh run as named groups in parallel
(each group its own temp root), and every row that waits a fixed window (close_by's 8 s, "park settle: 0.2 s",
queue_check's "under 3 s") waits on the event with a long ceiling instead. T-5094 is the close_by row; this item
takes the rest of both suites. Also: every suite run writes its seconds to a record (main_gate.jsonl suite rows
carry seconds for process suites too), so the next measurement needs no log scraping.
Measured saving: supervisor_test.sh median 18.3 min and personal_land_test.sh 15.8 min to a target of 5 min each at
load 5 a core: about 24 min per land that runs both, and about 9 of the 62 gate reds (the timing rows) gone.
Files: tests/supervisor_test.sh, tests/personal_land_test.sh, tests/run.sh, tools/main_gate.py [hub] (seconds on
process suite rows only).
ETA: 2026-11-21 (tests first; the main_gate.py row field waits for the hub queue).

### Item 5: a lane batch lands each task on its own check

What: a batch's land checks each task's commits on their own when the batch's check is red (bisect by task, as
merge trains do), lands the green ones, and parks only the task whose check is red. Before a land, copies of a task
already on main (by patch) are dropped and the task's other ready markers merged into one, so the lock never runs
the same task twice.
Measured saving: 22 tasks parked by a batch-mate's red in 72 h; parks cost median 28 min, p90 4.8 h per task
(69 task-hours in all for the 24 parked tasks that later landed). Copies: today T-4850 and T-4961 each took the
lock again after landing (b54 alone held it 20+ min at this writing).
Files: tools/personal_land.sh [hub], tools/park_batch.py, tools/parked_count.py, tests/personal_land_test.sh,
tests/park_batch_test.py.
ETA: 2026-11-22.

### Item 2: run the run-loop suites only for changes that reach them

What: with T-4907 item (1)'s reach map, the suite floor (tools/suite_floor.py) adds supervisor_test.sh and
personal_land_test.sh only when a change reaches the code they run (the supervisor, the land, the tools they load);
a process change elsewhere runs its own suites and site_test.sh when it touches the site. Today's b2 batch (files:
bottleneck_watch.py, disk_sweep.py, jobs_loop.py, tests) ran supervisor_test.sh for 19.6 min and parked on its
timing row.
Measured saving: up to 18.3 min (median) per process land that does not reach the run loop, plus its share of the
timing reds. The count of such lands needs the reach map; T-4907 measures the added minutes of its own map, and
this item reports the minutes removed.
Files: tools/suite_floor.py, tests/suite_floor_test.py (no hub file).
ETA: 2026-11-21, after T-4907 item (1) lands.

## Not measured, and why

- Which lands ran supervisor_test.sh: only kept logs say it, so the per-suite table is the slow end, not the whole.
- The 4:44-5:50 AM 11-19 gap with no lane land: the push retry repeated through it; that it held the lands is not proven.
- Site lands are counted with process lands (the count's "other" queue); site_test.sh is their own slow suite (1.8 min
  median), not a stall cause.
{% endraw %}

</div>
