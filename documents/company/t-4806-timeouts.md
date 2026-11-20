---
layout: "default"
title: "T-4806: why merges time out and the runner errors, and the fix for each cause"
section: "documents"
description: "Odalys, 11-17 evening ET. Answers an Investor&#x27;s 7:26 PM ruling on #41 (c6965124089; log/rulings.md, 2026-11-17 7:26 PM ET): &quot;fix the timeout errors or macbook runner errors ... ensure that reasons are always captured\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4806-timeouts.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4806-timeouts.md</code></span></div><h1>T-4806: why merges time out and the runner errors, and the fix for each cause</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 11-17 evening ET. Answers an Investor's 7:26 PM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> on #41 (c6965124089; log/rulings.md, 2026-11-17 7:26 PM ET):
"fix the timeout errors or macbook runner errors ... ensure that reasons are always captured, and resolve the root
causes". Starts from my T-4787 count (ops/plans/T-4787-red-causes.md: 26 "other" reds of 134, 23 time-outs and 3
runner errors) and Pernille's T-4786 finding (ops/plans/T-4786-bad-tests.md, "Runner time-outs").

## What the records say (read 11-17 about 8:40 PM)

- The gate's MacBook wait is the biggest single cause, and T-4787 did not count it: a gate wait-out (exit 75) left no
  row in any ledger, so my count could not see it. The worker session logs (ops/runs/*-work.jsonl) hold the line
  "no result in 540 s" for **27 distinct gate jobs, 11-15 to 11-17, 24 of them on 11-17**. 20 of the 27 later got a
  result row and 18 of those passed: they were waits, not failures.
- Gate jobs from 11-15 on (ops/metrics/land_xc.jsonl, result rows of land/m*): 56 jobs, run median 440 s, p90 549 s;
  queue median 82 s, p90 344 s. **24 of the 56 took longer than 540 s from queue to result.** The gate waited 540 s.
- Jobs nobody read: 79 gate jobs were queued from 11-15 on and 56 have a result row; 23 (29%) have none. Each is up
  to 10 runner minutes spent for nobody, and each sits ahead of the next land in the runner's queue.
- The session's command limit is a cause of its own. A worker's foreground command is moved to the background at 10
  minutes and stopped at 20. This task's own land was stopped at 20 minutes on 11-17 at about 9:26 PM, with load
  near 80: host suites, then three runs of each changed test (T-4701), before the MacBook wait had begun. A stop
  writes no row and returns no exit code. No "Command timed out" line shows in the last 25 session logs, so how often
  it happened before tonight is not known.

## Causes and fixes


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Causes and fixes, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | cause | count | fix | state |
|---|---|---|---|---|
| 1 | A wait-out (75) wrote no row: the reason lived only on a worker's screen | 27 gate jobs 11-15..17 | land_xc.py writes `waited_out` (job, seconds, runner's view: running, or queued with n ahead) and `dropped` (why `drop` or `superseded`) rows; main_gate.py writes a `wait` row (why `no result` or `slots full`, the job, the expected time) | landed in this task (commits below) |
| 2 | The gate waits 540 s; queue plus run took longer for 24 of 56 jobs | 24 of 56 | the gate says at queue time how long the last 20 gate jobs took (median and p90) and that a 75 is likely when p90 is over the wait; the `wait` row carries it. The wait itself stays 540 s until the progress-based wait (slice 7) lands; with fix 3 a 75 costs one rerun that reads the same job, not a new job | landed (the estimate); the progress-based wait is slice 7 |
| 3 | Main moving between a 75 and the rerun, or during the check, gave the change a new key, and a new key sent a new job: a passed or running job was thrown away | T-2296: 3 jobs for one change; T-4786: 3 jobs; 23 gate jobs without a result row since 11-15 | main_gate.py applies land_xc.py's holds() rule (the audit already counts it as verified): a pass of the same task and the same files holds when main's HEAD descends from its base, main moved in none of the change's files, and every gated path where the tested commit and the candidate differ is one main changed; a waiting job of the same change is kept and read (`carried` row). A red of the same change after its newest pass carries nothing. MAIN_GATE_CARRY=off restores the old path | landed (commits below) |
| 4 | Host suites over their limit under load (supervisor_test.sh, personal_pool_test.sh, personal_off_test.sh at the gate) | 13 of 23 time-outs | the red: since T-4694 (92521ed099, 2:26 AM 11-17) a time-out with no failed row reruns once at low load, then is no verdict (75), never a red. The limit: each suite's own base, 2x the median of its passes, since T-4701 (39d0f8b56e; c57b41eea7 6:43 AM 11-17 reads main's runs from a copy), and since T-4912 (11-18) the limit is only a 5x ceiling behind a stall check. Slice 4 (11-19): each copy still had its own base, since main's file had no row after 11-18 4:44 PM and the lands' rows stay in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> copies (supervisor_test.sh 972 s in one copy, 1221 s in another; apply_proposal_test.py, median 772 s, the flat 360 s in 6 of 9 copies, a ceiling of 1800 s under its longest pass of 1857 s). tools/test_health.py now reads the runs of every checkout on the Mac's own disk (not /Volumes), a shared row once: one base everywhere (supervisor_test.sh 1491 s, personal_off_test.sh 1250 s, personal_pool_test.sh 590 s) | done. main_gate.jsonl from 6:43 AM 11-17 to its last row, 4:01 PM 11-19: no tests/ suite red or suite_load row for a time-out (973 suite_pass rows) |
| 5 | Lane land host step hit its 25-minute limit (T-4227 seven times on 11-15, a 17-task train on 11-10, T-4663 on 11-17) | 10 of 23 time-outs | none yet. The host step runs every suite a train touches in one budget; a big train cannot fit | owed: slice 5 |
| 6b | The session stops a gate run at 20 minutes (moved to the background at 10): no row, no exit | this task's land, 11-17 9:26 PM; earlier count unknown | keyed suite passes survive the stop, so a rerun skips what passed. Owed: the gate writes a `started` row and a `stopped` row from a signal handler, and the progress-based wait (slice 7) keeps under the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> | owed: slice 7 |
| 6 | Runner error, job code 3: "tar timed out" twice on 11-16, one on 11-10 with no reason kept | 3 | land_xc.py already falls back to xc on the Mac mini (a `fallback` row, reason runner). Not a failed merge for a lane; the gate returns 3 and asks for a rerun | owed: slice 6 (the runner's tar step, tools/macbook-runner) |

</div>


What "landed" means here: each fix is in the commit named in the board's done-note, with its tests; Commandment 13
review is owed by someone other than me.

## The trade in fix 3

A carried pass means main's newer app commits and this change were not run together on the iPhone Simulator. Both
passed on their own, and they touch different files. This is the rule lanes have used since T-2634 (land_xc.py
holds()), and the audit (`main_gate.py audit`) already counts such a land as verified. A clash between two changes
that touch different files is caught by the next land's run, which tests the whole tree. MAIN_GATE_CARRY=off turns it
off at once if that ever proves wrong.

## How to read it from now on

- Every gate 75: a `wait` row in ops/metrics/main_gate.jsonl, and a `waited_out` row in ops/metrics/land_xc.jsonl
  that says whether the runner was running the job or had n ahead.
- Every job nobody read: a `dropped` row (why `drop` or `superseded`).
- Every carried pass: a `verdict` row with `carried_from`, or a `carried` row for a kept waiting job. Count them
  against `queued` rows to see the runner minutes saved.

## Part 5, landed 11-18 night (an Investor #325 c6996487980; an Investor #41 c6965124089)

The rule: a time-out with no failing check is never a failed merge in the lanes either; a check still working is never
stopped; a hang is a stall. Built on T-4912 (tools/with_timeout.py, ops/plans/time-limits.md), not beside it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Part 5, landed 11-18 night (an Investor #325 c6996487980; an Investor #41…, scrolls sideways" style="--tw:960px" markdown="1">

| Where in tools/personal_land.sh | Before | Now |
|---|---|---|
| watch_step, at LAND_TEST_SECONDS | the check was stopped (143) whatever it was doing | it goes on while its log grows or its processes use CPU (with_timeout.py's tree_cpu); stopped only after LAND_STALL (300 s) with neither: exit 125, a STALLED line, red (a hang); or at LAND_CEILING_X (5) x its limit: 143, the over-limit retry. LAND_STALL=0: the old stop |
| a suites run whose only reds are "FAIL <suite> timed out after" rows, no other FAIL or ERROR row | red (exit 1), held | the over-limit retry (main_gate.py load_only's rule); a timed-out suite with a failed row stays red |
| host: run_host.py TIMEOUT suites only | red | the over-limit retry |
| over_limit_again past LAND_OVERLIMIT_TRIES (2) | red, held, a "did not land" | no verdict: put back, counted (`overlimit n`); try_land starts it again only at a one-minute load under LAND_LOW_LOAD (40, the gate's line) |
| the tick's 300 s stop during a check, past the tries | give_up "stopped at the tick's time limit" | the same no-verdict put back |

</div>


Tests: tests/personal_land_test.sh part 2, 9 new rows (printing past the limit lands; silent with CPU lands; silent and
idle is a 125 stall; busy all along stops at the ceiling and is queued; a time-out-only suites run is queued; a
time-out beside a failed row is red; the third and fourth over-limit are no verdict; at load 55 it waits); 3 old rows
changed from "red" to "no verdict".

Not in this part: the stall stretch is LAND_STALL (300 s) for the whole check, and T-4912's 180 s of work for each
suite in tests/run.sh, not yet each suite's own history. A history-sized stretch (the suite's median when longer than
180 s) was written and taken out before the land: test_health.py's limits never go under 360 s (median floor 180), so
a test of it waits 180 s or more, and it needs a seam first. A branch past its tries that times out at low load too is
tried again each tick under load 40; count its `overlimit` rows from 11-19 before adding a cap.

## Slices left (each about 45 minutes, in this order)

4. Done 11-19 (see row 4): the per-suite limits were on main since T-4701; the slice made every copy read the same
   measured runs, so the base no longer depends on which copy runs the land.
5. Lane host step (tools/personal_land.sh): split a train's host step by suite so a 25-minute limit holds one batch,
   not the whole train; the gate's T-4694 rule (time-out with no failed row reruns at low load) applied there too.
6. Runner "tar timed out": read the runner log for the two 11-16 jobs and size or stream the tar step; a code-3 job
   is queued once more before it falls back.
7. The wait, by progress, not a flat 540 s (an Investor #41 c6966450021, 8:43 PM 11-17: flag a stall instead of a
   pre-set limit). Build: the gate waits while the job advances and stops only after a quiet period with nothing
   new (the no-output time-out pattern), with an outer cap sized from the jobs ahead times the median run plus this
   job's median run, and a row naming the reason for every stop (stalled: quiet N s; cap: N s; runner offline).
   What it needs first: the runner posts no progress while it runs a job. It checks in only when a run ends
   (tools/xc_route.py checkin_state: "a busy runner does not check in until the run ends", 43 min between check-ins
   on J-20261103-2015), and the job log stays on the MacBook. So step one is a heartbeat from tools/macbook-runner
   during a run (tests finished so far, the log's last line time) pushed to macbook-results every 60 s; step two is
   the gate's wait reading it. That is a runner change, deployed on the MacBook, so it is its own slice, not this
   one. Until then the 540 s stays, and fix 3 makes a 75 cost one rerun that reads the same job. T-4792 (retest only
   what failed) shares main_gate.py; its owner should read fix 3 first, since a carried pass covers its xc part.
{% endraw %}

</div>
