---
layout: "default"
title: "One coordinator: no gaps between sessions (T-3247)"
section: "documents"
description: "Tool: python3 tools/session_gaps.py --since 2026-11-04 (test: tests/session_gaps_test.py). It reads only ops/runs/supervisor.log (governor records, timed step lines, launchd retries) and the session streams in ops/runs\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/one-coordinator.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/one-coordinator.md</code></span></div><h1>One coordinator: no gaps between sessions (T-3247)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-07. Evan asked (#41, 4:11 AM) why there are gaps between sessions and whether discrete sessions are
needed at all. This plan measures the gaps from raw evidence and designs the change. It builds on
ops/plans/one-dispatcher.md (who runs each task) and ops/plans/sessions-main-vs-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.md (why one coordinator, plain
workers). The This Session chart (ops/plans/this-session.md, T-3295 to T-3297) draws this flow.

## The numbers

Tool: `python3 tools/session_gaps.py --since 2026-11-04` (test: tests/session_gaps_test.py). It reads only
ops/runs/supervisor.log (governor records, timed step lines, launchd retries) and the session streams in ops/runs and
ops/runs-archive, and reuses tools/changeover_gaps.py (T-2298) for each session's agents and wind-down. Window: main
account, 2026-11-04 12:00 AM to 2026-11-07 10:05 AM ET, 82.1 h; 61 work sessions, 20 inbox and report sessions.

"Seats" are the agent count the governor set for the session (its pool target: 12 on the LOCK IN day 11-05, 1 or 2
under Spread from 11-06). A seat-hour is one seat for one hour.

**Where the clock went** (n = 82.1 h)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The numbers, scrolls sideways" data-n="2 3" style="--tw:438px" markdown="1">

| | hours | share |
| --- | --- | --- |
| Work session, at least one agent running | 56.4 | 69% |
| Work session, the Operator alone (cold start, wind-down tail) | 7.7 | 9% |
| Inbox and report sessions | 0.5 | 1% |
| No session at all | 17.5 | 21% |

</div>


Gap from the last agent of one work session to the first agent of the next (n = 50 changeovers): median 14 min, 90th
percentile 73 min. Since 11-06 (n = 16): median 25 min, 90th percentile 76 min.

**The no-session hours, by cause** (each interval between two timed supervisor lines goes to one cause; untimed jobs
fall in the interval of the next timed line)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The numbers, scrolls sideways" data-n="2 3 4" style="--tw:518px" markdown="1">

| Cause | h | seat-h | intervals |
| --- | --- | --- | --- |
| The supervisor's lock held 11-05 3:09 PM to 6:56 PM by a stray disk_overflow run, so no tick ran (fixed in e6363723b, 6:49 PM) | 3.8 | 45.3 | 1 |
| After the session: metrics, board upkeep, runs archive, records backup, site build, git push | 4.1 | 23.3 | 399 |
| Land checks run inside the tick, one after another (personal_land.sh) | 3.7 | 21.7 | 65 |
| Before the session: merge queue, git sync, applier, xc route, disk sweep | 2.5 | 11.2 | 293 |
| Launchd's 15-minute wait for a tick that did not chain, then its pre-session jobs | 1.5 | 9.3 | 27 |
| Session start: meter, governor, dispatcher | 0.2 | 1.3 | 165 |
| Held on purpose: Spread pacing, an Investor pause, a plan limit | 1.6 | 9.8 | 13 |

</div>


By day: 11-04 3.0 h, 11-05 7.7 h (3.8 of it the held lock), 11-06 3.2 h, 11-07 3.5 h (to 10:05 AM).

**Inside work sessions**: 314.8 seat-h at target, 170.9 agent-h used. Empty: wind-down 93.1 seat-h (72.9 in sessions
that ended for a between-session job, 18.0 in sessions that closed themselves, 2.2 time and hours limits), cold start
(session start to first agent) 32.3, the rest 18.5 (under-filled mid-session).

**Why sessions end** (n = 61): 35 for a between-session job (amendments.md changed 12, a proposal approved 11, GitHub
has commits the session must push 6, a lane waiting to land 3, a personal account's first task 2, a report due 1);
9 the runaway time limit; 8 closed themselves; 5 exit 1; 3 the hours limit; 1 an Investor pause. None ended for
context size.

**The Operator's cost**: 220 of 1,220 USD list price of session cost (18%) is the Operator's own turns; 10% of the
Operator's tokens (62.4M of 634.4M, n = 51 sessions) are spent before its first agent call.

**What this does not say**. Every account reached its weekly line before this week's reset: the main account read 96%
at 10:05 AM, personal a and b 100% (dispatch.log 10:05 AM, readings 12 h old). So this week the gaps did not waste allowance;
they delayed work, and lands. They waste allowance only in a week, or on a key, where usage expires unused. The seat
counts are the governor's targets, not proof that that many runnable, non-overlapping tasks were waiting. The personal
lanes have the same 15-minute tick and are not in this log; dispatch.log idle hours (T-2677's measure) cover them.

## The answer to "are discrete sessions needed?"

No, not for the work. A session ends today for three reasons, and none needs the workers to stop:

1. Jobs that must not run while a session works in the main checkout (sync, push, applier, amendment records, lands).
   They block because the session and the jobs share one checkout and one lock. Give each its own copy and lock, and
   they run beside the workers.
2. Limits (the runaway time limit, the 3-hour hours limit). They exist to bound one Operator's context and cost; with
   the Operator no longer the workers' parent, they bound only the Operator.
3. Context size. This one is real for the Operator, and it stays: the coordinator restarts from a handoff file, and
   the workers, separate processes, keep running.

## The design, in steps

Build order follows the merge-first rule (Investors 2026-11-05 11:35 PM): merge-path steps first. The amendment of
2026-11-05 1:07 AM asks for such a change to be built in one go: steps 1 to 3 go together once their prerequisites are on
main, then step 4 measures.

0. **On the board already.** T-3288 (main stays green, so continuous landing does not fail every lane at once; P0,
   first). T-2641 (cut the old personal split; running now). T-2677 (the dispatcher's own clock and slots). T-2719
   (main-plan work in its own worktrees, so nothing but the Operator touches the main checkout). T-2346 (apply approved
   changes without ending the session; the mid-session apply landed in T-2484). T-1422 (answer messages while work
   lands) is likely solved by step 1, since the land no longer holds the supervisor's lock.
1. **T-3300, merge-first: land outside the tick.** personal_land.sh runs as its own launchd job with its own lock,
   every 60 s and at once when a MacBook land job reports; it merges in its own worktree and moves main by
   fast-forward push only. Removes the 3.7 h (21.7 seat-h) of land checks from the critical path and lands work as soon
   as its tests pass, not at the next changeover.
2. **T-3301, merge-first: between-session jobs beside the workers.** One jobs loop with its own lock runs sync and push,
   the applier and amendment records, the merge queue, metrics, board upkeep, backups and the site build on their own
   cadence. session_end.py drops each (a) reason as its job moves. Removes 45.1 seat-h of no-session steps and the
   72.9 seat-h of wind-downs that the (a) ends caused, and, with one lock per job, the class of the 11-05 held lock
   (45.3 seat-h).
3. **T-3302: one coordinator session.** One Operator session, kept running by the keeper, holds the inbox, board,
   plans, review assignments and reports; it starts no build agents. Every worker is a plain session that
   tools/dispatch.py starts on any account (main plan, personal accounts, API keys) in its own worktree, one task each,
   landing through the merge queue; dispatch ticks at once when a worker exits. Chain, CHAIN_MAX, the hours limit and
   separate inbox and report sessions retire. Removes the 32.3 seat-h of cold starts and 20.2 of the other wind-downs.
   The old path stays one setting away (COORD=0) until step 4.
4. **T-3303: the 48-hour check.** tools/session_gaps.py on the new window beside these before numbers, plus
   dispatch.log idle hours, land_stats and tasks finished per day, n beside each. Keep it if machinery, wind-down and
   cold-start seat-h fall by half and the land rate does not drop; otherwise switch back and write what failed.

### Step 3 in slices (T-5397, Odalys, 11-21 1 PM ET)

Seven board lines, each about 45 minutes, each "part of T-5397" (the trim freeze's allow list), each with a reviewer
who did not write it. The switch is `COORD` (environment, else `ops/coord.json` "coord"; off unless the number 1).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Step 3 in slices (T-5397, Odalys, 11-21 1 PM ET), scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| # | Line | What | Guard |
| --- | --- | --- | --- |
| 1 | T-5447 | dispatch.py: the switch, `coord`, `worker --task` (a one-task worker's plan; starts nothing). Off. | none; committed a3f8fac2d5 |
| 2 | T-5448 | dispatch.py: with COORD=1 a free slot gets one task, no chain; `kick` on a worker's exit | none |
| 3 | T-5449 | ops/prompts/coordinator.md: the kept-running session that starts no build agents | none; the hook is a proposal at the end of this page |
| 4 | T-5450 | supervisor.sh: start and keep the coordinator; no chain, no hours limit | refused before (11-09, 11-14) |
| 5 | T-5451 | personal_tick.sh: each slot one task, no chain, hands to the road merge_road.json names | refused before (11-07, 11-21) |
| 6 | T-5452 | the main plan's work as plain workers in their own copies | its starter is supervisor.sh or an Investor-loaded job |
| 7 | T-5453 | switch on after a drain and seen working, or COORD stays 0 for the four days and #325 is told | none |

</div>


Slices 4 to 6 change the two files that start sessions. Edits to both have been refused by a guard or the auto-mode
classifier before; each worker tries once in its own copy, and a refusal stops the slice (Commandment 14): the change
then goes as a patch through the applier's proposal path or to the Investors. Without slices 4 and 5 the switch has
nothing to turn on, so "on by Saturday 11-21 evening" depends on those two passing the guard today.

### Step 3 not on main: COORD stays 0 for the comparison (T-5453, Odalys, 11-21 11:25 PM ET; reversed 11-22 12:41 AM)

History. The Investors reversed this record-off at 12:41 AM ET 11-22 (an Investor #325 c7074887817); the section that
follows it says what holds now. Kept as written at the time.

T-5453 switches the coordinator on only if slices 2 to 6 (T-5448 to T-5452) are on main by Saturday 11-21 evening.
They were not, so the line takes its other path, as the Operator ruled on the Investors' decision: Step 3 is not on
main, and `COORD` stays 0 (ops/coord.json "coord": 0) for all four comparison days, 11-22 to 11-25. Both roads run the
comparison on today's path.

At the cutoff (`git log main` and the board, 11:25 PM ET 11-21):


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Step 3 not on main: COORD stays 0 for the comparison (T-5453, Odalys, 11-21…, scrolls sideways" data-n="1" style="--tw:444px" markdown="1">

| # | Line | State |
| --- | --- | --- |
| 2 | T-5448 | on main, ticked |
| 3 | T-5449 | on main, ticked |
| 4 | T-5450 | code on main (9decedf6fe, off by default); Pernille's review still under way, not ticked |
| 5 | T-5451 | not on main, open |
| 6 | T-5452 | not on main, open (needs T-5450) |

</div>


Without slice 5 the personal slots still run chained sessions, and without slice 6 the main plan's work has no
plain-worker starter, so COORD=1 would have had nothing to turn on for either road. No drain was run and nothing was
switched.

Steps 1 and 2 as T-5399 re-cuts them (the land as its own job, and the between-session jobs beside the workers, the
same change on both roads) are left off for the same four days. That line adds them only after Step 3 is on and a
brief check shows it works, by Saturday evening (an Investor #325 c7049941829). Step 3 is not on, so there was nothing
to check, and T-5399's own changes to tools/supervisor.sh, tools/personal_tick.sh, tools/personal_land.sh and
tools/jobs_loop.py were not made. The land and the between-session jobs run on each road as they did before the
comparison; the jobs loop T-4958 installed is unchanged.

Left for after the comparison (from 11-26), as written at 11:25 PM 11-21; items 1 to 3 are overtaken by the next
section.

1. T-5450: Pernille's review, then its tick.
2. T-5451 and T-5452 on main. Both change a guarded starter; a refusal still goes as a proposal (Commandment 14).
3. T-5453's other path: a drain, `tools/personal_land.sh road-check` clear, COORD=1 on both roads, one worker seen
   from start to its branch reaching the road, the keeper restarting the coordinator once; then this page records
   Step 3 as landed and on.
4. T-5399: Steps 1 and 2 re-cut against main as it is then, after a brief check of Step 3 (each account runs work
   sessions under it, no gap left by the coordinator, the figures on this page); then this page records them as
   landed.
5. Step 4 (T-3303), the 48-hour check, against the numbers at the top of this page.
6. The hook proposal at the end of this page stays with the Operator.

### Step 3 on main and switched on: COORD=1 for the comparison (T-5453, Odalys, 11-22)

The Investors ruled at 12:41 AM ET 11-22 (an Investor #325 c7074887817, log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md): "COORD=1 will be set for the
comparison. We want to use one operator for both merge roads during rhe comparison. Fix this immediately". The
record-off above is reversed: one coordinator serves both merge roads for the comparison, 11-22 to 11-25.

Every slice of Step 3 is now on main (`git log main`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Step 3 on main and switched on: COORD=1 for the comparison (T-5453, Odalys…, scrolls sideways" data-n="1" style="--tw:449px" markdown="1">

| # | Line | On main |
| --- | --- | --- |
| 1 | T-5447 | 56e8481df0, bf0cf7516f (the switch and the one-task worker plan, off) |
| 2 | T-5448 | 2675da5575 (one task per free slot, `kick` on a worker's exit) |
| 3 | T-5449 | b4dae2ee5e, 66299e9ee4 (the coordinator's prompt) |
| 4 | T-5450 | 9decedf6fe (the supervisor starts and keeps the coordinator) |
| 5 | T-5451 | 87ff1e51ac (each personal slot a one-task worker, handing to the road ops/merge_road.json names) |
| 6 | T-5452 | 21fd2671f9 (the main plan's work as plain one-task workers in their own copies) |
| fix | T-5555 | c25cf2f841 (the coordinator's own run kind, coord, fixing Pernille's H1/M1/M2 FAIL of T-5450) |

</div>


T-5555 also set ops/coord.json "coord" to 1 (c25cf2f841, 3:13 AM ET 11-22), so the switch is on. With it the main plan's work
and each personal slot run as plain one-task workers, and one coordinator, kept running by the keeper, holds the
inbox, board, plans, review assignments and reports for both roads. The old path stays one setting away (COORD=0).
T-5555's own line is still open on the board.

Not yet recorded on this page: the drain and `tools/personal_land.sh road-check` that T-5453's line puts before the
switch (the ruling asked for the switch at once), one worker seen from start to its branch reaching the road, and the
keeper restarting the coordinator once. They are noted here when seen; they are also the brief check T-5399 waits on.

What is left, under the ruling:

1. Seeing Step 3 work, as in the paragraph above, on both roads' days.
2. T-5399 (Steps 1 and 2). The 12:41 AM ruling names Step 3 only; it does not reverse T-5399's record-off (b63ff702d5),
   so Steps 1 and 2 stay off and none of T-5399's target files is changed. T-5399's condition (Step 3 on, and a
   brief check that it works) can now be met once the check above is seen, but the comparison began at 2:00 AM
   11-22 and Steps 1 and 2 change the old road itself (an Investor #325 c7049480636, 11-20 3:08 PM), while #325
   c7049941829 (3:32 PM) wanted them in before the comparison. Whether they go in during the four days is for the
   Operator to settle with the Investors; until then the cautious reading holds: off for 11-22 to 11-25, re-cut
   against main from 11-26, and this page records them when they land.
3. Step 4 (T-3303), the 48-hour check, against the numbers at the top of this page.
4. The hook proposal at the end of this page stays with the Operator.

### Step 1 on main, off (T-5399 slice 1, Odalys, 11-22)

What landed: tools/land_job.py, the land as its own job with its own loop lock and pass lock (a second loop or pass
refuses, exit 3) and a heartbeat, in the pattern of tools/jobs_loop.py. A pass runs every 60 s, and at once when a
MacBook land job reports (main's refs/remotes/origin/macbook-results moved since the last pass) or on
`tools/land_job.py kick`. It runs the road ops/merge_road.json names, read with personal_land.sh's own test: on the old
road `tools/personal_land.sh land-live`, which lands every ready branch and takes the supervisor's ops/.lock only for
the merge, push and records (T-3995); on the merge.sh road the same command, which there lands no branch and replays
the records, posts waiting lines and pushes what is due. Its launchd template is ops/launchd/com.company.land.plist.template
(`tools/install-launchd.sh --land`, `--unland`); it is not installed or loaded.

The setting: ops/land_job.json "enabled", shipped false. Only the JSON value true is on. Off, not installed, or a
heartbeat older than 180 s: `tools/land_job.py live` says no, tools/supervisor.sh step 4b passes LAND_JOB_LIVE=0, and
the tick's land is today's. On and live: the tick passes LAND_JOB_LIVE=1 and its land starts no branch ("leaves ... to
the land job"), keeping only what it alone does under the tick's lock (the records after the sync, the drains, the
waiting lines, the personal total; seconds). Tests: tests/land_job_test.py, and rows in tests/supervisor_test.sh and
tests/personal_land_test.sh.

Switching it on waited on the Operator and the Investors; it was switched on at 4:09 PM ET 11-22, before the
comparison's start (next section).

Left open for Step 1: on the merge.sh road each ready branch's tools/merge.sh run is still its lane's tick's
(tools/personal_tick.sh merge_now), outside the supervisor's tick already but on the lane tick's cadence, not 60 s.
Moving that run into the land job needs merge_now (with its red, wait-<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> and done-list handling) out of
personal_tick.sh, a guarded starter; it was not tried in this slice. Nothing yet calls `kick` (tools/land_xc.py or
tools/runner_watch.py could, when a result arrives). Left for Step 2 (tools/jobs_loop.py's docstring, "Not here yet"):
the applier and amendment records (T-2346's guard path) and the sync between sessions (the supervisor's step 2).

### Steps 1 and 2 on main (T-5399, 11-22 4:15 PM ET)

an Investor chose B on #325 (c7077473399, 4:56 AM 11-22: "turn T-5399 on!"): both steps in before the comparison
starts, so both roads run with them for all four days. an Investor's Mac mini session finished it at his word
(`log/rulings.md`, 3:06 PM 11-22).

**Step 1, the land as its own job: on main, on.** `0b9252074d` (lane a's slice `b2ed3d4305` with the Operator's
fix `c736e78c3b`). The slice's land had been red three times that day (5:56 AM, 11:32 AM, 12:10 PM, and a fourth
time at 3:41 PM on the unfixed branch) on one row of tests/personal_land_test.sh, "a hook in HEAD is these two lines:
the no-hook arm names no land script": the slice changed the supervisor's land line and put four lines between the 4b
comment and it, while the test's pin still held the old line. The land-job read now stands above step 4a2's call and
the pin holds the new line. The gate's run before the commit: jobs_loop_test.py, land_job_test.py,
personal_land_test.sh, personal_load_test.sh and supervisor_test.sh green, the three changed suites three times each.
Installed with `tools/install-launchd.sh --land` (com.company.land, pid 17629) and `ops/land_job.json` set to true at
4:09 PM ET. Seen: `tools/land_job.py status` at 4:09 PM: "on; heartbeat 1 s ago; live: yes; road now: old", one pass
(trigger macbook) exit 0 in 0.6 s with nothing ready. **Not yet seen:** a branch landed by the job; the first ready
branch after this shows it, and its line in ops/runs/land-job.log is the evidence. Back to the tick's land: set
`ops/land_job.json` to false, or `tools/install-launchd.sh --unland`.

**Step 2, the between-session jobs beside the workers: on main, on since T-4958 (11-18).** Re-cut against main as it
is, nothing was left to build for the jobs the line names. `tools/jobs_loop.py status` at 4:08 PM ET 11-22: heartbeat
9 s old, and the loop runs sync and push (every 2 min, last 4:07 PM, "pushed 0b9252074"), the merge queue (old road;
5 min), merge_first, the MacBook results, main's green check, the metrics (quality_metrics, metric_series,
bottleneck_watch, board_growth, batch_size), board upkeep (board_stale, board_similar), the records backup, the runs
archive, the disk keeper and sweep, and the nightly suites and mutation runs. The site build stays between sessions on
purpose (`ops/jobs_config.json` site_publish off; "What stays between sessions" below), as do the applier and
amendment records (T-2346's guard path) and the pull between sessions. Each has the old path one setting away
(`ops/jobs_config.json` "enabled": false).

Still open from Step 1, for after the comparison: moving the merge.sh road's per-branch run out of the lane's tick
into the land job, and a caller for `kick`.

## What it should save

Since 11-04, at the governor's targets: 21.7 (step 1) + 163.3 (step 2; 118.0 without the 11-05 held lock, already fixed) +
52.5 (step 3) = 237.5 seat-h, against 170.9 agent-h used. Since 11-06 under Spread (1 or 2 seats): 27.9 seat-h against
49.7 used (5.2 h of 6.8 h with no session were machinery, not pacing). Wall clock: 15.9 h with no session that was not
on purpose, and most of the 7.7 h of Operator-alone time. Not saved: Spread holds (1.6 h), mid-session under-filling
(18.5 seat-h).

In usage this means: in a week where the allowance binds, as this one did, the same usage is spent sooner and work
lands hours earlier; in a week or on a key where usage would expire, it is up to that many more agent-hours. Real
tokens saved either way: most cold starts (10% of Operator tokens) and the Operator's turns spent waiting for agents
to drain (not measured here).

## What would make this fail

- Lands from a separate worktree racing a session's commit on main: the push is fast-forward only, so the loser
  rebases and tries again (the supervisor's retry, #125), and a red main still stops lands (T-3288).
- Two writers of ops/board.md at once (coordinator and jobs loop): every write goes through board_tick.py and its lock.
- A stuck job: each job has its own lock and time limit, so it holds only itself, never a worker start.
- The coordinator's context: a restart from the handoff file; workers are not its children.
- The Investor-owned files: amendment records keep their file-guard path (T-2346); nothing here edits rules/.

## What stays between sessions (T-4958, 2026-11-18)

Evan asked (#325 c6995142803, 6:52 PM) to itemize every between-session process and move into the session each one
that would gain from it. The jobs loop (step 2, T-3301) was built on 11-07 but never switched on: its launchd job was a
main-session step (`tools/install-launchd.sh --jobs`) that no lane could run, its line (T-3660) kept coming back
empty and was archived with the unbuilt process lines on 11-17 (T-4092). T-4958 installs it, so these now run beside
sessions on their own cadence (tools/jobs_loop.py JOBS): sync and push (2 min, sessions only), the merge queue,
merge_first, MacBook results, main's green check, the disk keeper, starred-task notices (5 min), board upkeep, the
records backup, proposal skips, the daily MacBook run (15 min), the runs archive (30 min), the quality and flow charts,
stale waiting copies, test expiry (hourly), the nightly host suites, the bottleneck watch (15 min), and three new ones: the pool check (5 min,
sessions only), the supervisor wakes (1 min) and the supervisor's launchd refresh (5 min, only with no supervisor
process). The supervisor's fixed tick goes from 15 to 5 minutes as the safety net.

Three stay in the supervisor's between-session steps, each for a reason:


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: What stays between sessions (T-4958, 2026-11-18), scrolls sideways" style="--tw:640px" markdown="1">

| Job | Why it stays between sessions |
| --- | --- |
| The pull into the main folder (step 2, `git pull --rebase`) | It rewrites the folder every worker and the Operator are using; the guard forbids a pull while they work. During a session the loop's sync moves main only by fast-forward or a merge-tree commit under the lands' lock, and holds anything that touches an Investor-owned path or an open file, for this step. |
| Proposal applies (the applier and amendment records) | They change Investor-owned files (`CLAUDE.md`, `rules/`, settings), which a running session has loaded and the file guard checks at close; they need the folder to themselves. |
| The full site build (tools/site_publish.sh) | The Investors' 11-10 mandate (T-4141): no 15-minute full rebuild during a session; it adds load and its tests dirty the shared folder. It waits for a session's changes to settle; the live status carries Home meanwhile. Kept in the tick (ops/jobs_config.json switches the loop's copy off), since the loop would only catch the short gaps between chained sessions. |

</div>


Also staying in the tick, unchanged: the governor's decision and the session start itself, salvage of what a session
left uncommitted, the session-end flag, the lane-claim sweep and lane stops (each needs the session to have ended),
the disk sweep's hourly step 1b (T-3368), and the daily queue check (it runs only under the tick's own lock with no
session). Investor messages already run during sessions (the inbox watcher).

The old path stays one switch away: ops/jobs_config.json `{"enabled": false}` or `tools/install-launchd.sh --unjobs`
gives every job back to the tick at once (`jobs_loop.py moved` prints nothing).

## Proposal: a hook that holds "starts no build agents" (T-5449; not applied, the Operator decides)

Slice 3 (ops/prompts/coordinator.md) holds the rule by the prompt alone. Odalys judges a hook worth having: the whole
saving of step 3 (32.3 seat-h of cold starts, 20.2 of wind-downs) rests on the coordinator not becoming the workers'
parent again, and a prompt drifts as its context grows, which is exactly when this session runs longest. an Investor
#325 c7067153738 (1:18 PM ET 11-21, log/rulings.md) lets workers change guard files through the applier before 2:00 AM
ET 11-22; this text is for the Operator to apply or drop.

- **Where.** rules/hooks/model-guard.py, already the hook on `Agent|Task` (.claude/settings.json); no new hook entry.
- **Which session.** The coordinator's starter (slice 4, supervisor.sh) sets `COORD_SESSION=1` in that session's
  environment only. Not ops/run.json: a worker in its own copy reads that copy's run.json, so a file flag could catch
  workers or miss the coordinator.
- **What.** In `main()`, after the tool-name check: if `os.environ.get("COORD_SESSION") == "1"` and the description
  does not start with `[report]`, print "The coordinator starts no build agents: put the work on the board
  (ops/prompts/coordinator.md)." to stderr and exit 2. The one report agent of a due report stays allowed.
- **Test.** tests/guard_test.sh gains three cases: COORD_SESSION=1 refuses "[build] x" (exit 2) and allows
  "[report] evening"; unset, "[build] x" is allowed as today.
- **Old path.** Unset COORD_SESSION, or COORD=0, and nothing changes.
{% endraw %}

</div>
