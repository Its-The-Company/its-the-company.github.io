---
layout: "default"
title: "Audit implementation: status"
section: "documents"
description: "The running record of carrying out ops/plans/system-audit-2026-11.md under the Investors&#x27; mandate of 2026-11-10 (rulings 11-10 00:12, 00:13 and 00:19 in log/rulings.md). Kept by the Fable session that owns the work\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/audit-implementation.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/audit-implementation.md</code></span></div><h1>Audit implementation: status</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The running record of carrying out [`ops/plans/system-audit-2026-11.md`](system-audit-2026-11.html) under the Investors' mandate of 2026-11-10 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> 11-10 00:12, 00:13 and 00:19 in `log/rulings.md`). Kept by the Fable session that owns the work. Board lines T-3992 to T-3997, one per phase. Times are ET.

A phase is marked done only when its changes have passed their tests and are on main.

## Who owns what

Until T-3992 to T-3997 are ticked, only the Fable session changes these files. Other workers hand it patches by a note on its board line.

`tools/dispatch.py`, `tools/governor.py`, `tools/pool_adapt.py`, `tools/personal_tick.sh`, `tools/personal_land.sh`, `tools/merge_queue.py`, `tools/main_gate.py`, `tools/supervisor.sh`, `tools/parked_count.py`

## Baseline, 12:15 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline, 12:15 AM 11-10, scrolls sideways" style="--tw:893px" markdown="1">

| Measure | Reading | Source |
|---|---|---|
| Unique tasks <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> | 188 (452 waiting branches) | `python3 tools/parked_count.py --json` |
| <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> branches waiting to land | 6 of 6 slots | lane tick logs |
| Land tries, 11-09 | 186, 56 landed (30%) | `ops/runs/land_steps.jsonl` |
| Land time on tries that did not land, 11-06 to 11-09 | 80% | same |
| Main moves, 11-09 | 508, about 8 in 10 records | main's reflog |
| App share of changed code lines, 11-06 to 11-09 | 12% | `git log --numstat` |
| Verified app commits a day | about 15 | same |
| First hand-out to landed | median 9.9 h, slowest tenth over 41.8 h | dispatch log, land steps |
| Kept test passes reused, 11-06 to 11-09 | 10 | `ops/runs/check_reuse.jsonl` |
| Real lane sessions against offers, 11-09 | 35 against 243 | lane tick logs, dispatch log |
| Machine load series | none recorded | |

</div>


## Workers and processes found, 12:13 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Workers and processes found, 12:13 AM 11-10, scrolls sideways" style="--tw:916px" markdown="1">

| What | State | Decision |
|---|---|---|
| Main work session | none running; pacing holds work ("the week is ahead of its line") | nothing to stop |
| Lane sessions | none running; all six slots wait for their last branch to land; merge mode on | left as they are |
| Supervisor tick (pid 18412) | finishing its jobs after the 12:11 AM inbox session | left alone |
| Inbox watcher, lane tick jobs, supervisor job (launchd) | running as designed | kept |
| An interactive session open for 2.6 days (pid 11422) | idle | left alone; not the company's worker |
| Shared folder | clean: the 11:43 PM close sweep committed everything left in it, the merge queue page and the throughput files included, without a gate pass | checked under phase 0 |
| Saved patches in scratch | T-3818, T-3907 (2), T-3962, T-3967, T-3971, T-3976, T-3978, T-3980 | see below |

</div>


## Proposals, as decided by the mandate

- **Closed 11-10 (dropped, deferred or duplicate):** T-3890 as a standing path, T-3907, T-3951, T-3957, T-3958, T-3962, T-3964, T-3965, T-3973, T-3980, T-3985, T-3987.
- **Kept and landed by this work:** T-3818, T-3972, T-3908, T-3974, T-3975, T-3905, T-3883, and the useful parts of T-3885, T-3901 and T-3979.
- **Changed or folded in:** T-3875 and T-3971 into the one limit (T-3993); T-3978 into one road with the same lander (T-3994); T-3955 into the one workflow record (T-3996); T-3963 with its session count fixed; T-3986 light only.
- **Deferred, patch not landed:** T-3967, T-3976.

## Phases


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Phases, scrolls sideways" style="--tw:499px" markdown="1">

| Phase | Board line | State |
|---|---|---|
| 0. Stabilize | T-3992 | in progress |
| 1. Admission: one limit on unmerged work | T-3993 | not started |
| 2. Quiet main, one road | T-3994 | not started |
| 3. One merge line | T-3995 | not started |
| 4. One record, Home, This Session | T-3996 | not started |
| 5. Return to app work | T-3997 | not started |

</div>


## Log of what landed

(newest last; each line: time, commit, what, the test that proves it)
{% endraw %}

</div>
