---
layout: "default"
title: "T-5247: why Xcode runs stayed on the Mac mini while the MacBook runner sat idle, and part 2&#x27;s design"
section: "documents"
description: "The xc.jsonl row carries no caller, so the caller below is read from the argument shape. Each shape is one tool&#x27;s own command line; the counts are firm, the caller names are an inference."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5247-runner-pre-merge.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5247-runner-pre-merge.md</code></span></div><h1>T-5247: why Xcode runs stayed on the Mac mini while the MacBook runner sat idle, and part 2's design</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-20. P0, merge-first (Investor an Investor #325 c7031233507, 12:21 AM ET 11-20: "a root cause fix would
be to prevent the runner from ever idling"). Part 1 (this commit) records every local route answer. Part 2 (below)
waits for T-5236 to land, because it changes `tools/macbook-runner`, which T-5236 owns now.

## 1. What 11-19 shows (measured, read only)

Source: `ops/metrics/xc.jsonl` in the main checkout and in every <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree (`~/company-personal/*`), rows whose
start is on 11-19 local time, and the first two lines of each run's own log (`Command line invocation`). The script is
`measure.py` in the task's scratch folder. T-5234 counted 72 runs in its 24-hour window (11-18 11:19 PM to 11-19
11:19 PM); the calendar day has 76 runs and 6.37 hours, in 6 checkouts (a2 35, b3 21, b 11, a3 6, main 2, b2 1).

The xc.jsonl row carries no caller, so the caller below is read from the argument shape. Each shape is one tool's own
command line; the counts are firm, the caller names are an inference.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What 11-19 shows (measured, read only), scrolls sideways" data-n="2 3 4" style="--tw:518px" markdown="1">

| caller (by argument shape) | runs | hours | with a Simulator |
|---|---|---|---|
| feature session check lines: `build-for-testing` then `test-without-building`, `ENABLE_DEBUG_DYLIB=NO`, XC_LOCAL=1 (`tools/feature_session.py plan`) | 44 | 3.44 | 22 |
| a worker's own run (`test`, `build-for-testing` or `test-without-building`) | 13 | 1.47 | 9 |
| a Simulator named by `id=` (local checks of one device) | 11 | 1.10 | 11 |
| `tools/xc_mutants.py` (the caller's own `-collect-test-diagnostics never`, no task, exit 65 = a killed mutant) | 7 | 0.35 | 7 |
| no log left (exit 75, a lock wait) | 1 | 0 | 1 |

</div>


What `xc_route.decide()` answers for the same arguments with XC_LOCAL unset: 53 runs are `build-for-testing` or
`test-without-building`, actions the runner has no command for; 8 name one Simulator by id; 14 have arguments the
runner could take. Those 14 were still not runner work: each was a check before its commit (feature session steps,
mutants on an edited tree, a worker's loop), and a job pins a commit that is on main.

The land gate is not in the 76. On 11-19 the lands' Xcode checks went to the runner on `land/<id>` (T-2634; main's
`ops/metrics/land_xc.jsonl` that day: 19 queued, 11 results, 17 waited out, 8 dropped).

## 2. Why the runner idled

Two reasons together, and neither is the runner being down:

1. **The route answers "here" before it asks the runner.** XC_LOCAL=1 is the first test in `decide()`. Every pre-merge
   caller sets it (`feature_session.py` prints it into every check line, `xc_mutants.py`, `lane_landcheck.py`,
   `park_batch.py`, `main_gate.py`, `merge_queue.py`'s xc step, `alpha_run.sh`), because the runner only runs a commit
   that is already on main or on a `land/<id>` ref. The land's road (`land_xc.py`: a child commit with the job file,
   pushed to `land/<id>`) exists, but only `personal_land.sh` uses it.
2. **The feature session splits each check in two Xcode actions.** `build-for-testing` and `test-without-building` are
   not runner commands (`decide()`: "not a test or build run"). Even without XC_LOCAL they stay here. 44 of 76 runs
   and 3.4 of 6.4 hours were these.

Before this commit none of this was on record: a local route answer wrote no row (T-5234 section 3 item 2).

## 3. Part 1: every local answer is a row (this commit)

`tools/xc_route.py route` now writes one row to `ops/metrics/xc_route.jsonl` for every run it keeps here:
`answer: "local"`, `why` (decide()'s reason), `caller`, `task`, `lane`, `checkout`, `action`, `local_flag` (XC_LOCAL=1
or not) and `runner` (the last check-in's state in this checkout's copy: idle, busy, silent or unknown; no fetch).

- **Caller**: XC_CALLER when set; else the first known tool in the command lines of xc.sh's ancestors (one `ps`
  read): land gate, lane landcheck, xc_mutants, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> batch, main gate, merge queue, alpha run, land host, macbook
  runner, feature session, bisect, a test; a Claude session above with none of these is "worker"; else "unknown".
  This needs no change in the callers, several of which other tasks own.
- **Lanes reach main**: `ops/metrics/` is out of git (`tools/records.py`), so a lane's metrics never travel; main's
  readers glob `~/company-personal/*` (`feature_session.py counts`, `storage_guard.py`), and a removed worktree takes
  its rows with it. So a linked worktree's rows now go straight to the main checkout's file (git's common directory's
  parent), with `checkout` naming the lane. No lane-outbox record is needed: it would reach main only when the branch
  lands, and a parked branch's runs would never be counted.
- A run on another lock (the runner itself, every fixture) keeps its row in its own checkout, so test runs never
  enter main's record.
- `not queued` (jobs.py create failed, so xc.sh runs here) was already a row.

Test: `tests/xc_route_local_test.py`, 6 checks on a throwaway main repository with a linked worktree, `route` run
under a stand-in caller script. Red on HEAD's `xc_route.py` (3 fails, then no row to read), green with the change.
`tests/xc_route_test.py` still passes (96 of 96).

## 4. Part 2's design: the runner takes pre-merge runs (after T-5236 lands)

Goal: a run that only stays here because its commit is not on main goes to the runner, the caller waits for the
answer, and the Mac mini runs it only when the runner is down. Archive, upload, export and device runs stay here.

1. **A check ref per request.** `land_xc.py`'s road, made general: commit the tree under test (the caller's HEAD, or
   for a dirty tree a temporary commit of the run's paths, `run_paths()`, never a branch commit), add one child
   commit with `ops/jobs/<job>.json`, push it to `refs/heads/check/<checkout>-<n>` (forced, one per caller), and the
   runner fetches `check/*` as it fetches `land/*` (T-3317) and accepts the commit because the ref contains it. The
   ref is deleted when the result is read. The runner needs `check/*` in its fetch and job list: a VERSION bump
   (it updates itself between jobs).
2. **The runner learns the two split actions.** A `xc-build-for-testing` + `xc-test-without-building` pair is one job
   on the runner (`xc-test` with the same `-only-testing` filters, which builds then tests): the caller's
   build-then-test becomes one request whose answer covers both. The feature session's plan lines then need no
   XC_LOCAL.
3. **XC_LOCAL=1 becomes "answer before the push", not "run here".** `decide()` sends a pre-merge run to the check-ref
   road unless it is truly local: a mutated tree that must be restored at once (`xc_mutants.py`, unless its mutants
   become commits on the ref), one Simulator by `id=`, a `-resultBundlePath` read here, archive/export/upload.
   XC_LOCAL=here keeps today's meaning for those.
4. **The caller waits.** `xc.sh` waits on `xc_route.py wait` (poll 120 s, a fetch each) up to the run's limit and
   exits with the job's verdict, as `land_xc.py check` does, so a script that runs `xc.sh` sees the same exit codes.
5. **Fallback only when the runner is down.** "Down" is `checkin_state()` silent, or `land_xc.py online` exit 3, or a
   push of the check ref that fails. Then the run goes on here, and its row says `why: runner down`. A busy runner is
   a wait, not a fallback (T-5234: a Simulator run on the mini costs 22 to 60 load a core).
6. **Measure before and after.** From the rows this commit adds: local runs a day by why and caller, and the runner's
   busy share (`tools/runner_busy.py`). Done when local runs that only needed a commit on main are near 0 and the
   runner's idle hours while the mini ran Xcode fall day over day.

Open: whether `xc_mutants.py` mutants go as one commit each on a check ref (8 to 10 jobs a land) or stay here; and
the runner's parallel slots for several check refs at once (an Investor 11-05: "as many simulators as is needed").
{% endraw %}

</div>
