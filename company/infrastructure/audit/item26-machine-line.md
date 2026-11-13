---
layout: "default"
title: "Item 26: a busy-machine line for starting sessions (T-4265)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/item26-machine-line.md</code></span><span>2026-11-13</span></div><h1>Item 26: a busy-machine line for starting sessions (T-4265)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-11-13. Audit implementation item 26 (ops/plans/audit-implementation-resume.md), from T-3992.

**Decision: no new line.** For 72 h the machine readings do not show failures that a hold on new work or lane
sessions would have prevented. Holding them would cost a large share of starts. No code changed.

## Data

- Readings: ops/metrics/machine.jsonl, 3,956 rows, 11-10 10:28 AM to 11-13 10:27 AM ET, one a minute.
  `python3 tools/machine_load.py summary --hours 72`: load per core (1-minute load over 8 cores) median 0.70,
  p90 7.54, max 74.08. Memory pressure above normal in 16 rows. Runner offline in 229 rows.
- Joined to: land attempts in ops/runs/personal-tick-a/b.log (parsed by tools/pool_adapt.py's land_rows),
  ops/metrics/main_gate.jsonl (gate verdicts and host suites), ops/metrics/xc.jsonl (local xcodebuild),
  ops/metrics/pool.jsonl (the pool's steps), and session starts ("session on" lines in the tick logs, "work: work
  session" lines in ops/runs/supervisor.log). Each event gets the machine row nearest to it, within 3 minutes.
- Time share by load per core: up to 1, 59%; 1-2, 10%; 2-4, 11%; 4-8, 10%; over 8, 9%.

## Findings (n beside each)

1. **No time-outs.** Land time-outs (exit 124/143): 0 of 87 attempts. Local xcodebuild time-outs: 0 of 30 runs. The
   pool took 89 steps (50 floor, 33 hold, 6 up) and cut 0 times. Its existing load line, 10 a core on the 5-minute
   load, never caused a cut.
2. **Failed lands do not follow load.** Not landed: 9 of 87. Seven were rebase conflicts (ops/task-names.tsv,
   handbook/rules.md, a ledger). Two had red tests. By band, not landed out of attempts: up to 1, 2/18; 1-2, 0/8;
   2-4, 1/13; 4-8, 4/28; over 8, 2/20. Of the two red ones:
   personal/b44 failed at 9:56 AM 11-12 on two Playwright click time-outs of 30 s, at 21.9 a core. That is probably
   load. Its session started at 8:42 AM at 2.51 a core, so a start line would not have held it.
   personal/b40 failed at 7:36 AM 11-12 on a timing test in personal_off_test.sh, at 4.7 a core. That one is uncertain.
3. **Gate reds are not this machine's.** There were 13 gate reds, all exit 65. They are iOS test jobs on the MacBook
   runner (tools/land_xc.py), so the load here does not reach them. By band: up to 1, 6/35; over 8, 2/9.
4. **Host suite reds rise with load, but mostly not from it.** 34 reds of 1,308 suite runs. By band: up to 1,
   8/626 (1.3%); 1-2, 6/192 (3.1%); 2-4, 7/256 (2.7%); 4-8, 7/167 (4.2%); over 8, 6/101 (5.9%).
   The flake signature is the same suite on the same tree passing later. 11 reds show it, at a median 1.47 a core,
   and only 1 of them was above 8 (pywidget:widgets, 6:56 PM 11-12, 39.1 a core).
   Of the 6 reds above 8, at most 3 could be load: that widgets red, plus two supervisor_test.sh reds whose same
   change passed later on a moved main. The other 3 needed a code change.
5. **What makes the load.** Rows with an xcodebuild running (185): median 12.43 a core. Rows without one: median
   0.65, p90 6.18. With no xcodebuild, 0 suites gives a median of 0.43 and 3 or more gives 5.62. By sessions
   running: 0, 0.34; 1, 0.90; 2, 1.28; 3, 5.17; 4, 6.04; 5 or more, 6.52. The load comes from what sessions run
   minutes after they start, not from the start.
6. **A start line meets the spikes too early.** 77 starts: 60 lane at a median 2.55 a core, 17 work at a median
   0.47. Starts each line would have held: 2 a core, 37 of 77 (48%); 4 a core, 25 (32%); 8 a core, 13 (17%).
   There were 12 spike onsets above 20 a core (30 min apart):
   - 5 had no start in the 30 min before.
   - 5 followed only starts made at 2.51 a core or less, which pass any line.
   - 2 followed starts above 4 (2:10 AM 11-12, after starts at 8.57 and 7.39; 7:00 PM 11-12, after starts at 20.1
     and 18.6).
   The worst spike, 73.8 a core at 9:01 AM 11-12 with 7 suites and an xcodebuild running, followed three starts at
   8:42-8:43 AM, made at 2.51.
   Of the failures in 2 and 4, a line would have prevented at most one: the widgets red at 6:56 PM.
7. **Memory, processes, Simulators.**
   - Memory: pressure "warn" in 16 rows and "critical" in 0. Free memory never went below 32%. 6 of the 16 rows
     were at night with no session running.
   - Processes: the most was 1,255 of 2,666 (47%).
   - Simulators: at most 2 booted (47 rows). xcodebuild runs that missed the Simulator limit: 0 of 30. Simulators
     left running: 0.
   The 11-08 Simulator pile-up (three idle Simulators, 7.0 GB) came before these readings. It has been handled by
   tools/mem_free.py since T-3588.
   tools/dispatch.py machine_room() already holds a lane start on memory pressure warn or critical, on low RAM, and
   at 80% of the process limit less 100 a session. The tick logs record no start held by any of these in the 72 h.

## Why no line

- A line at 4 a core would hold a third of starts (25 of 77). It would reach 2 of 12 spikes and 1 likely load
  failure (the 6:56 PM widgets red).
- The two clearest load failures (b44's Playwright time-outs and the 9:01 AM spike) came after starts made at 2.51
  a core. No start-time reading sees them coming.
- Memory and processes already have start lines, and neither came close.
- Investor an Investor, 9:47 PM 11-12: no new infrastructure. A line that costs throughput and buys almost nothing
  does not meet that bar.

## When to read this again

Read the next 72 h of ops/metrics/machine.jsonl if any of these happens:

- a land or xcodebuild time-out (exit 124 or 143) (the pool already cuts on this);
- 3 or more host suite reds in a week with the flake signature above 8 a core;
- a "critical" memory pressure row;
- more than 2,000 processes.

If load does start to cost tests, the lever is per run, not per session. That means how many host suites or
Playwright runs go at once, because they make the load and they are what time out.
{% endraw %}

</div>
