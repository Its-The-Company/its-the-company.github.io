---
layout: "default"
title: "T-5236: a land&#x27;s host suites on the MacBook when the Mac mini is over its line"
section: "documents"
description: "The line: load5 / cores &gt;= 16, memory pressure warn or critical, or a Simulator booted, read from the newest machine row when it is under 5 minutes old; or every general heavy slot held (tools/heavy_slot.py, read only\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5236-macbook-host-suite.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-5236-macbook-host-suite.md</code></span></div><h1>T-5236: a land's host suites on the MacBook when the Mac mini is over its line</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-19 (night). Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> an Investor #325 c7030179059, 11:12 PM ET: "send a land's host test suite to
the MacBook runner as a job whenever the Mac mini is over a load or memory line", built at once, in parallel with
T-5234's load cut, free of merge limits and the pool <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. T-5234 keeps the load cut; this is the route only.

## The line, and where it comes from

Source: ops/metrics/machine.jsonl, tools/machine_load.py's row a minute (12,532 rows, 2026-11-10 7:06 AM to 11-20 4:18 AM
UTC). Against it I laid every subset run of tests/run.sh in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktrees' ops/runs/test-runs.jsonl (667 runs
matched to a machine row within 3 min; 1,827 subset runs in all), and put each suite's seconds over that suite's own
median (suites with 3 or more runs, median over 5 s). Median ratio and p90 by the row at the run's middle:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The line, and where it comes from, scrolls sideways" data-n="2 3 4" style="--tw:299px" markdown="1">

| load5 per core | suite rows | median of time / own median | p90 |
|---|---|---|---|
| under 4 | 633 | 0.78 | 1.15 |
| 4 to 8 | 583 | 1.14 | 2.34 |
| 8 to 12 | 180 | 0.96 | 1.69 |
| 12 to 16 | 95 | 1.22 | 2.78 |
| 16 to 24 | 129 | 1.38 | 7.20 |
| 24 to 32 | 54 | 1.28 | 3.70 |
| 32 and over | 174 | 1.78 | 4.31 |

</div>



<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The line, and where it comes from, scrolls sideways" data-n="3 4" style="--tw:341px" markdown="1">

| memory pressure | suite rows | median ratio | p90 |
|---|---|---|---|
| normal | 1,411 | 0.98 | 2.31 |
| warn | 437 | 1.18 | 2.74 |

</div>


The line: **load5 / cores >= 16, memory pressure warn or critical, or a Simulator booted**, read from the newest
machine row when it is under 5 minutes old; **or every general heavy slot held** (tools/heavy_slot.py, read only:
its config, size and live holders), read at the moment of the land. At 16 and over a suite takes 1.3 to 1.8 times its own median and its p90 jumps to 3.7 to 7.2
times; under 12 the median stays at or near 1. Memory warn costs less (1.18x) but is the memory line the ruling names.
Over the last 7 days the machine was at load5/core >= 16 in 21% of rows, and under memory warn in 19%.
Added after T-5234's measurement (ops/plans/T-5234-macbook-merge-tests.md, 2af8bb759e): the load past 10 a core
comes from a booted Simulator (median 22-24 a core with one booted, 42-60 with an Xcode run, about 5 for host runs
alone), and at 1 general heavy slot a land's tests/run.sh waits behind any run already holding it, whatever the load
(the 149 host holds in the slot record, ~/Library/Caches/company-heavy-slot/waits.jsonl: median wait 115 s, p90 1,261 s, 56% waited over a minute). So a booted
Simulator (machine row "simulators" >= 1) and a full set of general slots each count as over the line. Over the last
7 days a Simulator was booted in 40% of rows, half of them under the load and memory line; with it the share of rows
over the line goes from 37% to 57%. At 12:15 AM ET 11-20, `land_host.py route` read "every general heavy slot is held
(2 of 1)". A caller already inside a slot (HEAVY_SLOT_HELD) does not count the slots: its run would not wait.
LAND_HOST_SIM=off and LAND_HOST_SLOTS=off take either out. The slot count needs no machine row, so it still counts
when the row is old.
mem_free_pct and swap gave no clean step (swap 11-15 GB rows were faster than 2-5 GB ones), so they are not the line.
At the time of writing the Mac mini read load1 309 on 8 cores (38.7 per core), swap 12 GB, pressure normal.

No row, a row over 5 minutes old or one that can't be read is under the line: the land runs as before.
LAND_HOST_LOAD5 and LAND_HOST_MEM move the line; LAND_HOST=off turns the route off, LAND_HOST=on sends every land.

## The route

tools/personal_land.sh run_tests, after cache_skip and before its tests/run.sh loop, calls host_mb (tools/land_host.sh,
main's copy). Over the line, tools/land_host.py check:

1. asks the runner (tools/land_xc.py online, plus runner 33 or later listing the host-suite command);
2. pushes the land's exact commit (the worktree's rebased HEAD) with one child commit adding ops/jobs/<job>.json to
   refs/heads/land/<id>-host (apart from land_xc.py's land/<id>, so the xc job and the host job never supersede each
   other). The job is command host-suite, kind test, with "suites": the land's suite set;
3. the runner runs `tests/run.sh <suites>` on that commit with RUN_STOP=1, as the land does, in its job sandbox;
4. the land waits for the result, then deletes the ref.

Green there (status passed and exit 0): the land runs no host suite here and goes on (host, xc) as after a green run.
Red there (status failed): the suites run.sh's last Red: line and its Not run line name (every suite when it names
none: a lint or name error) run here next, through the land's own loop, so a red holds the branch by the same code and
the same rules (main_red, timeout_only, the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>) as any red here.

Why a MacBook red is confirmed here first, in this slice: the job sandbox denies all network, localhost included, and
53 of the 578 suites name a local server (127.0.0.1, http.server, a socket). Those can be red there and green here
with no change at fault (T-4807 rule 2: a red must mean broken behaviour). Each confirmation is a "verdict" row
(mini_code, confirmed); when the ledger shows MacBook reds the Mac mini never overturned, the confirm step can go, and a
red there holds directly. That is a recorded change of what the ruling asked for ("a red there holds the branch exactly
as a red on the Mac mini does"): it holds through exactly the same path, after one run of only the red suites here.

## The fallback, never a pass

Any of these runs the suites here, as before, and writes a "fallback" row: the runner offline, silent, paused,
blocked, older than 33 or without host-suite; the job not pushed; the job not started 300 s after it was queued
(runner queue wait at land: median 91 s, p90 1,360 s, n = 343, ops/metrics/land_xc.jsonl); no result by the land's
own time left (LAND_TEST_SECONDS, 900 s by default; never more than 900 s); a result refused, error or timeout; a
"passed" with a non-zero exit; land_host.py failing. A dropped job's ref is deleted, so a job not yet started never
runs for nobody. A precheck never goes to the MacBook.

## The runner side (runner 33)

tools/macbook-runner/kinds.json gains host-suite (kind test, cwd ".", argv /bin/bash tests/run.sh, takes_suites,
env RUN_STOP=1 and TEST_RUNS_LOG in the job's folder). runner.py takes an optional job field "suites" (file names
only, no leading dash, no slash, 1-600 of them), appended after the argv only for a command with takes_suites; VERSION
32 -> 33. The job sandbox is unchanged and kind test is already approved, so the runner updates itself between jobs
once this is on main: **no person needs to install anything.** Until it has (check-in runner_version 33 with
host-suite in commands), every land falls back to the Mac mini.

Not known until the first jobs run: whether the MacBook's python3 and tools match the suites (PATH is
/opt/homebrew/bin first, then /usr/bin). A suite that cannot run there shows as a MacBook red that the Mac mini
overturns, in the verdict rows; it costs that one suite's run here, never a wrong hold.

## The proposal check's whole suite (ruling an Investor #325 c7031233507, 12:21 AM ET 11-20, answer A)

The ruling: the proposal check's whole --fast suite (tools/apply_proposal.py --verify) goes to the MacBook through
this route, unchanged. In this slice (so runner 33 carries it and no second runner release is needed):

- kinds.json gains host-suite-fast: kind test, cwd ".", argv /bin/bash tests/run.sh --fast, no suites, limit 10800 s
  (the check's own VERIFY_SECONDS), TEST_RUNS_LOG in the job's folder.
- tools/land_host.py check and GitRunner.push take command (host-suite-fast), limit and max_bound, so the proposal
  check calls the same route, the same line and the same fallbacks.

Left for slice 2 (tools/apply_proposal.py is T-5234's file and was being edited in this worktree, so not touched
here; built on 2af8bb759e): in run_suite, only for the whole-suite call (cmd == suite_cmd(), no suite names after it),
call land_host.check("proposal-<sha12>", sha, [], task="", seconds=VERIFY_SECONDS, command="host-suite-fast",
limit=VERIFY_SECONDS, max_bound=VERIFY_SECONDS) before making the worktree. 0: return ([], "... passed on the MacBook").
1: return (the red suites read from the result's Red: line, summary), so the existing reruns at the parent and alone
on the applied commit run here, on a few suites, as now. 3: run here as now. The ref is land/proposal-<sha12>-host.
A start bound of 300 s still applies, so a busy MacBook costs the check 5 minutes at most before it runs here.

## How to read it

ops/metrics/land_host.jsonl: route (where mini, why, the figures), queued (job, suites, why), result (status, code,
seconds, rerun), fallback (reason runner, queue or slow; detail), verdict (job, mini_code, confirmed).
Tests: tests/land_host_test.py (the line from fixture rows and a fixture heavy-slot folder; the route, the wait, red and every fallback with a stand-in
runner on a stand-in clock; the shell glue with a stand-in tool; the real git route on a bare origin read back by
runner.py's own validate_job and job_argv).

## Open

- Confirm step: drop it once the verdict rows show no overturned MacBook red over at least 20 reds.
- A green MacBook run is not written to the land's per-suite pass cache (tools/check_cache.py), since the result
  carries only the last 60 lines of output; a retry of the same tree runs them again.
- A wait (the job running past the land's time) falls back rather than keeping the job for the next try, as land_xc.py
  does with exit 75; a second slice can keep it.
{% endraw %}

</div>
