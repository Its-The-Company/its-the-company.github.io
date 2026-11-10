---
layout: "default"
title: "T-3875: size every account&#x27;s agents to what merges can absorb (prediction, written before the change)"
section: "documents"
description: "The check the board line asked for: the old line NOT_LANDED_LINE 0.70 is a not-landed share. By the land record it was over on 1 day of 7 (11-05, 72% not landed). Read as the Operator wrote it for this task (pass rate\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t3875-merge-capacity.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/t3875-merge-capacity.md</code></span></div><h1>T-3875: size every account's agents to what merges can absorb (prediction, written before the change)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-09. Investor an Investor #41 c6702207354 (11-06, approving c6702149241: "match the agent count to what
merges can absorb"); asked again #41 c6754467284; Operator c6754514005.

## Baseline (before)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline (before), scrolls sideways" style="--tw:960px" markdown="1">

| Measure | Value | Source, sample |
|---|---|---|
| Land attempts / landed per day, 11-03..11-09 | 109/49, 46/26, 76/21, 172/57, 48/36, 251/77, 64/35 (11-09 to ~6:30 PM) | tools/land_stats.py --json, 766 attempts |
| Landed per day, median | 36 (range 21-77) | same, 7 days |
| Land pass rate per day | 45%, 57%, 28%, 33%, 75%, 31%, 55% | same |
| Waiting <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs by stamp day (UTC), 11-06..11-09 | 68, 39, 133, 155 | ops/runs/.dispatch-parked.json 6:30 PM, 478 refs |
| Parked against landed, 11-09 | 147 parked, 35 landed (Operator's count) | task packet |
| Live retry lines | 11-08 62-163, 11-09 77-110 (now 109) | ops/metrics/retry_queue.jsonl, 43 rows |
| main_gate run time | median 479 s, p90 1279 s | ops/metrics/main_gate.jsonl, 276 runs |
| Load | 120-430 on 8 cores (15-54 a core); pool.jsonl 12:35 PM read 13.3 a core | task packet, ops/metrics/pool.jsonl |

</div>


The check the board line asked for: the old line NOT_LANDED_LINE 0.70 is a not-landed share. By the land record it
was over on 1 day of 7 (11-05, 72% not landed). Read as the Operator wrote it for this task (pass rate under 0.70),
it is under on 6 days of 7; only 11-07 (48 attempts, the quietest day) passed 75%. The quiet day passing best is the
reason to expect fewer agents to land a larger share.

## The change

1. A merge signal in tools/pool_adapt.py, beside the four old ones (all kept, lines unchanged): waiting parked refs
   stamped in the last 24 h over PARKED_LINE (40, the 11-07 level), live retry lines over RETRY_LINE (50, under
   11-08's low of 62), or the land pass rate over 3 hours under PASS_LINE (0.70, read only with 5 or more attempts).
   While it is over, the pool steps down one per 20 minutes and may go under the floor of 8 to MERGE_FLOOR (2). With
   the merge signal clear, the floor of 8 stands as before, and a pool under it climbs one step per 30 minutes.
2. The pool already <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> every account's per-session agents (governor.personal_pool reads pool_cap()). New:
   tools/dispatch.py, while the merge signal is over, deals new tasks only while personal task sessions number under
   pool_max // 4 (9 -> 2, 4 -> 1, 3 and less -> 0 new). A <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own parked work (its retry line, the open tasks
   of its parked refs: T-3885) is not held by this cap.
3. Load line: no session starts with an agent (new or own task) while the 5-minute load a core is over the
   governor's LOAD_LINE (10). Retry lines and reading refreshes still start: they run no agent.
4. Reserve: one account (ops/dispatch.json "reserve_account", else the account whose week resets last) stops taking
   tasks at 95% of its week, so 5% stays for Investor replies (the chat path in tools/personal_tick.sh, T-3346).

## Prediction (after, judged on 11-11 and 11-12, the first two whole days armed)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Prediction (after, judged on 11-11 and 11-12, the first two whole days armed), scrolls sideways" style="--tw:590px" markdown="1">

| Measure | Before | Predicted after |
|---|---|---|
| Parked refs stamped a day | 133 (11-08), 155 (11-09) | under 60 |
| Landed a day | median 36 | 30 or more (no real fall) |
| Land pass rate a day | median 45% | 60% or more |
| Live retry lines | 77-110 | under 60 by 11-12 |
| Load a core, busy hours | 15-54 | under 10 most hours |

</div>


Why: today's sessions start work faster than one main gate (median 479 s) can land it; each extra change in flight
raises the chance the next land conflicts (18 of 65 conflicted today). Fewer agents trade starts for lands.

Revert rule (small and reversible, old path kept): "merge_on": false in ops/pool_adapt.json turns the merge signal
off (the old floor of 8 returns); "merge_cap": false in ops/dispatch.json <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the session cap, "load_line": false
the load line, "reserve_account": "none" the reserve. Revert if landed a day falls under 30 on both judged days, or
parked a day is not under 80 by 11-12.

## Split (Operator, 11-09 evening, after an Investor #41 c6754641345)

This task keeps tools/pool_adapt.py: the merge signal and the pool under 8, plus the load line, the merge cap on
new-task sessions and the reserve as functions there (agent_limits, new_left, reserve_account). A second Odalys agent
owns tools/dispatch.py and tools/personal_tick.sh (the merge-first switch) and wires those functions in. Both read the
lines from ops/merge_capacity.json.

Dry read on live files, 11-09 ~7:10 PM (scratch code, nothing armed): parked refs stamped in 24 h 154 (line 40), live
retry lines 101 (line 50), pass rate 64% of 11 lands in 3 h (line 70%): all three over, so the pool would step from
9 toward 2, one step per 20 minutes (about 140 minutes). Load 6.5 a core (line 10). Reserve account: b (resets last).
{% endraw %}

</div>
