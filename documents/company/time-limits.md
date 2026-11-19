---
layout: "default"
title: "T-4912: every fixed time limit from a task&#x27;s start to its merge"
section: "documents"
description: "Pernille, 11-18 8:30 PM ET. Answers an Investor on #325 (c6991006083, 3:40 PM 11-18): &quot;If the time limit is not useful, remove all time limits and replace them with more meaningful root-cause checks\u2013 flagging actual\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/time-limits.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/time-limits.md</code></span></div><h1>T-4912: every fixed time limit from a task's start to its merge</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 11-18 8:30 PM ET. Answers an Investor on #325 (c6991006083, 3:40 PM 11-18): "If the time limit is not useful,
remove all time limits and replace them with more meaningful root-cause checks– flagging actual errors or stalls
instead of simple time limits. Alternatively, if a time limit is the best way, these should update dynamically so they
don't cut off tasks that have no real issue". <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> of 11-18 3:40 PM ET in log/rulings.md.

Window: 11-04 12:00 AM to 11-18 8:00 PM ET (14 days). Sources: ops/runs/supervisor.log, ops/metrics/main_gate.jsonl,
ops/metrics/land_xc.jsonl, ops/metrics/xc.jsonl, ops/runs/land_steps.jsonl, the kept gate red logs under
.git/main-gate/red/. "No real fault" means: no failed row before the cut, and the same work passed later with no fix
for the cut. Where a log cannot tell, the row says so. The counts are greps of those files on 11-18.

Words: **useful** = it guards a real hang nothing else sees. **harmful** = it cuts work that has no fault, or stands
in for a check of the real fault. A **stall check** = cut when there is no output and no progress (CPU, a heartbeat, a
row) for a measured while. A **sized limit** = from the work's own measured history, stretched by the load as it runs.

## Every time limit

In the order a task meets them: session, the worker's own commands, tests, the gate, the land, the supervisor around it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Every time limit, scrolls sideways" data-n="1" style="--tw:2848px" markdown="1">

| # | Limit | Where (file, setting) | Value | Guards against | Cut work, 14 d | No real fault | Mark | Replacement | Owner / line |
|---|-------|-----------------------|-------|----------------|----------------|---------------|------|-------------|--------------|
| 1 | Session end flag | tools/session_end.py, ops/session_end_config.json | 3 h | a session that runs on | (flag only, no cut) | - | harmful | stall_watch.py (no tool result for quiet_minutes) | T-4909 (Odalys, now) |
| 2 | Session stop | tools/supervisor.sh SESSION_SECONDS (run_limited, 225 min) | 13 500 s | a session that never ends | 15 sessions stopped at 225 min; 8 of them had half-done work the salvage committed | not separable in the log; 2 other stops came from outside | harmful | the stall watch (exists) + a usage ceiling | T-4909 (Odalys, now) |
| 3 | Agents' foreground command limit | Claude Code's Bash tool (not a company setting) | 600 s max | a tool call that never returns | 2 "Command timed out" in the last 400 session streams (about 4 days) | not checked | harmful, not ours to change | run a long gate in the background and wait on its own result (Monitor), or have main_gate.py print progress so a stall is seen | follow-up (prompt, ops/prompts/work.md held by T-4909) |
| 4 | Per-suite limit in tests/run.sh | tests/run.sh limit_for, tools/with_timeout.py --follow-load, tools/test_health.py limits | 2x the suite's median (floor 360 s of work), x1-4 by load | one stuck suite holding the run | 17 suites cut in the gate (personal_pool 8, supervisor 3, personal_off 2, apply_proposal, personal_land, site_home_replace, site_t3427 1 each) | the 4 logs still kept show only the time-out line, no failed row; 13 of 17 passed later for the same task (none on the same tree: main moved); no hang was found in any | harmful as the cut, useful as a ceiling | **done here**: cut on a stall (no output and no CPU in the suite's processes for SUITE_STALL 180 s of work); the limit becomes a ceiling at 5x (10x the median) for a suite busy forever | T-4912 (this commit) |
| 5 | SUITE_TIMEOUT given flat | tools/site_publish_live.sh SUITE_TIMEOUT=180 | 180 s | the live publish waiting on a suite | 0 found | - | harmful in kind (flat) | now also has the stall check; drop the flat value for the sized one | follow-up |
| 6 | Whole tests/run.sh in the gate | tools/main_gate.py SUITE_RUN_S | 3600 s | a run.sh that never ends | 0 ("main_gate SUITE_RUN_S" in no row) | - | useful only as a ceiling now that each suite has a stall check | keep as ceiling; size from run.sh's wall history | T-4805/T-4792 hold the file |
| 7 | Gate host run | tools/main_gate.py HOST_RUN_S | 1800 s | a host check that never ends | 0 found | - | useful as ceiling | same as 6 | same |
| 8 | Gate low-load wait | tools/main_gate.py LOW_WAIT_S | 600 s | a rerun waiting forever for load under 40 | a wait, not a cut | - | useful | none needed | - |
| 9 | Gate git calls | tools/main_gate.py git(timeout=120), cat-file 120, commit 300 | 120-300 s | a git wedged on a lock or a disk | 0 "no answer in" rows | - | useful (a wedged git shows nothing else) | keep; say the lock it waited on | - |
| 10 | Gate slot stale | tools/main_gate.py SLOT_STALE_S | 3 h | a gate slot whose owner died | reclaims, not cuts | - | harmful in kind | a dead-pid check of the slot's owner, not its age | follow-up |
| 11 | MacBook xc check wait | tools/personal_land.sh -> tools/land_xc.py check --seconds (what is left of the land's budget: 30-840 s) | 30-840 s | a land waiting forever on the MacBook | 80 land waits gave up | 33 gave up while the job was running on the MacBook; 31 with other jobs ahead of it; 16 with the runner idle (a real fault) | harmful | wait while the runner shows progress; flag an idle runner at once | T-4838 (Odalys) |
| 12 | MacBook xc job | tools/land_xc.py LIMIT_S (runner job limit) | 1200 s (expected 300) | an xcodebuild that never ends on the MacBook | 0 status "timeout" (262 passed, 60 failed, 8 error) | - | useful as ceiling | xc.sh's idle check (row 14) on the runner already sees the hang; size from the 300 s expected | follow-up |
| 13 | Land test budget | tools/personal_land.sh LAND_TEST_SECONDS | 900 s (1500 live) | a branch's checks that never end | not separable from row 15 in the logs before T-4805 | - | harmful | the suites' own stall check (row 4) and the xc wait (row 11) | T-4805/T-4792 hold the file |
| 14 | Land total | tools/personal_land.sh LAND_TOTAL_SECONDS | 600 s (3000 live) | one tick landing for ever | 43 "out of time: waits for the next tick" (a delay, no work lost) | 43 (it only defers) | harmful (a delay with no fault) | start a branch while the tick's own limit leaves room for its measured median | same |
| 15 | Supervisor land step | tools/supervisor.sh run_limited PERSONAL_LAND_SECONDS | 300 s | the land holding the tick | 39 branches stopped "at the tick's time limit" (34 put back, 5 not landed) | not separable: no failed row is logged for a cut | harmful | land runs as its own job (it already has its lock) with the stall check; the tick does not wait for it | T-4909 holds supervisor.sh |
| 16 | xc.sh idle stop | tools/xc.sh XC_IDLE 30 s after xcodebuild's own end line, XC_IDLE_LATE 180 s after a suite's end | 30 / 180 s of no output | xcodebuild's known hang after it has printed its result | 15 of 193 runs, every one after "Selected tests passed/failed" | 15 (results were kept; it ended a hung process) | **useful** (already a stall check) | none | - |
| 17 | xc.sh quiet | tools/xc.sh XC_QUIET | 1800 s of no output | a build that hangs before any result | 0 | - | useful (a stall check) | none | - |
| 18 | Supervisor metric series | tools/supervisor.sh run_limited METRIC_SERIES_SECONDS | 120 s | the tick held by a metrics pass | 136 of 234 runs cut (exit 143 at 120-123 s): ops/metrics/xmr kept stale | no error logged before the cut; work cut, not failed | harmful | run as a jobs-loop job off the tick, with a stall check; or make it incremental | follow-up |
| 19 | Supervisor quality metrics | tools/supervisor.sh run_limited QUALITY_METRICS_SECONDS | 180 s | same | 52 of 233 cut (exit 143 at 180-183 s) | same as 18 | harmful | same as 18 | follow-up |
| 20 | Supervisor queue check / read | run_limited QUEUE_CHECK_SECONDS 600, QUEUE_READ_SECONDS 900 | 600 / 900 s | a queue pass holding the tick | 0 cuts found | - | useful as ceiling | size from history | T-4909 holds the file |
| 21 | Supervisor sweeps | run_limited SWEEP_LIMIT (180) for disk_sweep and scratch sweep | 180 s | a sweep holding the tick | 1 "copies sweep" cut | 1 (a sweep resumes) | harmful in kind, cheap | budgeted sweeps already stop themselves (--budget); drop the outer limit to a ceiling | follow-up |
| 22 | Other supervisor steps | run_limited 20-1800 s on 25 steps (disk_free 240, disk_keeper 1800, merge_queue 1800, main_green 1800, runner_watch 120, merge_first 60, lane_stop 60, stall_watch 60, session_end 150, ...) | 20-1800 s | one step holding the tick | 0 cuts found in the window | - | useful as ceilings | size each from its run history when one starts to cut | - |
| 23 | Wall-clock asserts in tests | about 40 rows (grep "time.time() - t0 <", "took <", "secs <") | 0.15-60 s | a cut that never comes, in tests of time-limit code | reds in the gate: site_issue_page "main thread held N ms" 9, disk_sweep 3, queue_check 1, macbook_runner_update 1, page-load 30 s 2 | all 16: load, not code | harmful where tight | the reds' rows were fixed before tonight (T-4749 load-gated main-thread reads and the over_bound flag, T-4560 CPU time, the backlog-128 server); see below for the tight ones left | below |
| 24 | Playwright default waits | tests/site_*.py: goto / click 30 s | 30 s | a page that never answers | 2 (the backlog-5 server, fixed) | 2 | useful as ceiling once the server is fixed | none | - |

</div>


Count: 24 rows (22 distinct limit kinds plus 2 groups: 25 supervisor steps in row 22, about 40 test rows in 23).
Useful: 10 (rows 6-9, 12, 16, 17, 20, 22, 24; 6, 7, 12, 20, 22 and 24 only as ceilings). Harmful: 13 (rows 1-5, 10,
11, 13-15, 18, 19, 21). Row 23 is mixed: its reds are fixed, its tight rows listed below. Cuts in 14 days with no fault
shown, where the log can tell: per-suite 17 (13 passed later), metric steps 188 (cut, not failed), xc land waits 64 of
80 (16 were an idle runner, a real fault), land total 43 (deferred, nothing lost).

## What changed tonight (row 4)

tools/with_timeout.py --stall S: a suite is cut (exit 125, a STALLED line, "FAIL <suite> stalled after N s: no output
and no CPU for S s of work" in tests/run.sh) when its log has not grown and its processes (its tree and its process
group, `ps -S` so a reaped child's CPU counts) have used under 0.05 s of CPU for S seconds of work. S is load-weighted
and paused in a heavy-slot wait, as the old limit was. A suite that works in silence (supervisor_test.sh prints nothing
until its 13 groups end, up to 418 s; Python's print() is block-buffered into the log) is not stalled; a suite blocked
on a lock, a pipe, a read or a wait that never ends is. The old limit stays only as the ceiling for a suite busy forever:
SUITE_CEILING_X (5) x its own limit, which is 10x its median, rule 1 of ops/plans/T-4807-test-rules.md. A stall is
reported in its own words, not "timed out", so main_gate.py's TIMEOUT_ROW (which reruns a time-out at low load) takes it
as a red like a failed row, and known_red does not key it to the tree.

Why S = 180 s of work: every wait inside a suite now ends on an event or a short limit the row sets itself (rule 1);
none of those is near 180 s, and 180 s of work at load 40 on 8 cores is up to 720 s of wall. With the CPU reading, a
silent but busy suite never counts toward it. Test: tests/suite_stall_test.py (14 rows: parts on fixed input, real
processes, run.sh in a copy); mutants (CPU ignored; the child tree ignored; run.sh without --stall) each turn rows red.

Expected effect: of the 17 suite cuts above, none had a stall; under the new rule each would have run to its end (the
longest, 1440 s at load, sits under its new ceiling). Measured after: count "stalled after" and "timed out after" rows
in main_gate.jsonl from 11-19.

## Tight wall-clock asserts left (row 23)

None of these went red in the window; each bounds a cut in code that is about time. Kept as hang ceilings where the
bound is 5x or more the limit under test; tight ones to rewrite to count events, not seconds:
tests/land_kick_test.py:75 (0.15 s "not waited for"), tests/lane_fetch_gate_test.py:132 (0.5 s), tests/inbox_wait_test.py
:74 and :118 (1.4-4.5 s window), tests/claim_waiting_test.py:106 (2 s), tests/direct_session_test.py:115 (5 s "even
loaded"), tests/live_status_test.py:592 (2.5-15 s window). Follow-up line: "Tight timing asserts count events instead".

## Follow-ups (one line per tool, from T-4912)

- tools/supervisor.sh metric series and quality metrics off the tick (rows 18-19); after T-4909 frees the file.
- tools/personal_land.sh land budget and land total sized from history (rows 13-15); after T-4805/T-4792.
- tools/main_gate.py slot reclaim by dead owner, not age (row 10), and progress lines for long lands (row 3).
- tools/site_publish_live.sh flat SUITE_TIMEOUT (row 5).
- tests: the tight timing asserts above (row 23).
Row 11 is T-4838's; rows 1-2 are T-4909's.
{% endraw %}

</div>
