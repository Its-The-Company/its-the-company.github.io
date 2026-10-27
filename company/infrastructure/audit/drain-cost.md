---
layout: "default"
title: "What session drains cost (T-0133, #41 c6408771623)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/drain-cost.md</code></span><span>2026-10-26</span></div><h1>What session drains cost (T-0133, #41 c6408771623)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Measured by Odalys, 2026-10-26 01:20-01:27 ET. Tool: `tools/drain_cost.py --since 2026-10-25T00:00 --until 2026-10-26T01:30`
(raw rows: `log/audit/drain-cost.json`). Evidence: 17 session streams in ops/runs (task_started / task_notification
records of every `local_agent` task) and the governor's decisions in ops/runs/supervisor.log.

Definition (the Investor's): a drain runs from the last task a work session started to the next work session's first
task. Idle agent-minutes = the integral of max(0, 8 - agents running) over that window; 8 is the floor in
ops/prompts/work.md. Split: tail (last start -> session end), gap (end -> next session start), ramp (start -> first
task). One gap (07:18 -> 19:11 on 10-25) was the governor holding work for the day's budget share; it is counted
apart, because no session-end rule wins those minutes back.

## Results (n = 9 drains, 8 not held)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Results (n = 9 drains, 8 not held), scrolls sideways" data-n="4" style="--tw:614px" markdown="1">

| part | wall min (not held) | idle agent-min (not held) | share |
|---|---|---|---|
| tail | 64.7 | 375.9 | 20% |
| gap | 157.3 | 1,258.0 | 67% |
| ramp | 22.2 | 176.9 | 9% |
| held drain's tail + ramp | 8.2 | 64.6 | 3% |
| **all, not held** | | **1,875.4 (31.3 agent-hours)** | |

</div>


Per drain (idle agent-min, attributable): 149.3, 160.6, 205.3, 343.3, 64.6, 142.5, 314.6, 436.6, 58.6.
Median 160.6 agent-min (2.7 agent-hours) per session end. Including the budget-held day gap: 7,576.6.

## Findings

1. The largest part is between sessions, not inside them (n=8). Every gap without an inbox session was 15.4-15.5
   minutes: the next session waited for the 15-minute launchd tick. The chain that should start it at once
   (supervisor step 13) required a clean git sync, and every push failed from 2026-10-24 22:43 (a 112 MB file in the
   unpushed commits from 04:40 on 10-25; plain push failures before that). Last chain: 2026-10-24 20:12. Two gaps
   were about 31 minutes because a short inbox session sat between two work sessions and does not chain either.
2. Tails: median 2.6 min, but 13.7, 12.9 and 24.0 min in three sessions (21:03 session: 154 idle agent-min while
   it waited on its last agents).
3. Mid-session stalls are outside this definition and larger: audit 2 measured 3.70 agent-hours under target in
   the 33 minutes 00:32-01:04 of the session that started 23:48, after the Operator decided to close on "about 30
   turns" (`tools/audit_session.py --run 20261025-234823 --split 00:32`; log/audit/proposal-close-rule.md).
4. The Operator's context at session end, 2026-10-24/25 work sessions: 87k-288k tokens; the current session was at
   368k at 01:22. None near the 1M window.

## Fix already made (company code, Commandment 3; tests/supervisor_test.sh 153/0, 72 s)

tools/supervisor.sh step 13: a failed push no longer stops the chain; a session stopped at the time limit chains;
report and inbox sessions chain like work sessions; no runnable board line, no chain (logged). This recovers the
15.5-minute gaps in both arms of the switchback, so the switchback below measures the prompt rule on top of it.
{% endraw %}

</div>
