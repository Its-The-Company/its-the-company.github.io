---
layout: "default"
title: "How much more efficient are we? An honest assessment (2026-11-08)"
section: "documents"
description: "Plain terms. The company runs up to six lane slots (three per personal account) plus one main session. A slot is &quot;idle&quot; when it could run a session, work is waiting on the board, and nothing starts. Six slots for 24\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/efficiency-assessment-2026-11-08.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/efficiency-assessment-2026-11-08.md</code></span></div><h1>How much more efficient are we? An honest assessment (2026-11-08)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, CEO. Written 2026-11-08 17:54 ET, for an Investor, #41 c6728210641 (17:46): "Can you give honest feedback about
how successful these efforts have been so far, and predict how successful this will be by the EOD tomorrow ... Have you
actually implemented any changes that will genuinely increase the Company's efficiency? ... how much more efficiency can
we add (please quantify if possible)?"

## The short answer

- **Partly, and less than the effort put in.** One thing measurably improved: finished work reaches the shared code
  faster and more often per hour. The thing you are describing, hours where nothing runs while work waits, did **not**
  improve. Sunday (11-08) was the worst day measured: at least 66 of about 107 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> slot-hours sat idle (61%).
- **Much of the work was whack-a-mole.** The disk filled and was cleared four times in three days. Two fixes I marked
  "kept" on 11-06 (disk and "no spare free") were followed by the same stall on 11-08.
- **Half of the main session's spend since 11-03 went to process and tooling** ($936 of $1,816, 51.5%), against 35% on
  building, testing, review and design. Product commits fell from about 106 a day (11-03 to 11-05) to about 30 a day
  (11-06 to 11-08). Part of that drop is your 11-06 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> to put process first; the efficiency it bought has not yet
  paid for the time it took.
- **Headroom: about 25 to 30 lane slot-hours a day (roughly 20% more working time) is recoverable** from three causes:
  the disk filling, a stale usage reading, and memory pressure. That would mean roughly 20 to 30% more finished work a
  day, not double.
- **Forecast for end of Monday 11-09:** better than today, not yet "efficient". My central estimate is 20 to 35 idle
  slot-hours on Monday against 66 on Sunday, if the new disk keeper works on its first live night. Confidence about
  55%. The stale-reading idle (about 10 slot-hours a day) will still be there, because no fix for it exists yet.

## What I measured, and how

Plain terms. The company runs up to **six lane slots** (three per personal account) plus one main session. A slot is
"idle" when it could run a session, work is waiting on the board, and nothing starts. Six slots for 24 hours is 144
slot-hours a day.

Sources, all read with the company's own scripts and records (no Claude in any of them):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I measured, and how, scrolls sideways" style="--tw:631px" markdown="1">

| What | Source |
|---|---|
| Idle slot-hours by cause | ops/runs/dispatch.log (the dispatcher's own reason on every tick; starts 11-05 09:38) |
| Lane minutes lost to "no spare is free" | `python3 tools/spare_idle.py --since "2026-11-03 00:00"` |
| Landed / not landed, causes, time to land | `python3 tools/land_stats.py --since 2026-11-03` and `--timing` |
| Main-session spend by kind | `python3 tools/ops_metrics.py --since 2026-11-03` |
| Main-session outages | ops/runs/launchd.log ("failed tick"), ops/metrics/idle_alarm.jsonl |
| Disk free over time | ops/metrics/disk.jsonl; ops/runs/t3433-disk.md; ops/runs/t3690-disk.md |
| Redone work | ops/metrics/t3321-already-done.json (since 11-01) |
| Process changes and their verdicts | `python3 tools/experiments.py list` (the experiment ledger) |
| Product vs tool commits | `git log` per day on pywidget/ + packages/ versus tools/ + tests/ + ops/decisions/ |

</div>


Method for idle slot-hours: for each dispatcher tick, the free slots it did not start, times the time to that account's
next tick, <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 30 minutes; the reason is the one the dispatcher logged on that tick. This is a **lower bound**:
gaps over 30 minutes are not counted, and a start that was then refused counts as busy. The T-3585 count of the
03:24 to 10:50 window this morning (41.6 of 44.6 slot-hours idle) is higher than this method gives for the same hours,
for exactly those reasons.

## Day by day


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Day by day, scrolls sideways" data-n="2 3 4 5 7 8" style="--tw:1334px" markdown="1">

| Day | Landed | Attempts | Land rate | Lands per hour | Finished to on main: median / slowest 10% (min) | Product commits | Tool commits | Idle slot-hours (lower bound) | "No spare free" (min) |
|---|---|---|---|---|---|---|---|---|---|
| 11-03 | 49 | 109 | 45% | 2.04 | 8 / 127 | 86 | 61 | not logged | 1,025 |
| 11-04 | 26 | 46 | 56% | 1.08 | 6 / 44 | 118 | 87 | not logged | 92 |
| 11-05 | 21 | 76 | 28% | 0.88 | 8 / 343 | 113 | 110 | 12.2 (from 13:05) | 1,993 |
| 11-06 | 57 | 172 | 33% | 2.38 | 25 / 204 | 23 | 91 | 33.0 | 120 |
| 11-07 | 36 | 48 | 75% | 1.50 | 13 / 493 | 31 | 63 | 16.5, plus 6.6 h with no dispatcher tick | 0 |
| 11-08 (to 17:48) | 68 | 237 | 29% | 3.88 | 12 / 1,006 | 36 | 75 | 65.8 | 684 |

</div>


What the table says:

- **Landing got faster per hour** (about 1.3 lands an hour 11-03 to 11-05; 2.5 an hour 11-06 to 11-08, 3.9 today).
  This is real. But many of today's landings were process work, not app work.
- **The slow tail got worse.** The slowest tenth of finished work took 2 hours to reach main on 11-03 and 17 hours
  today. That is your "stuck for hours" experience, in numbers.
- **The land rate has no trend** (28% to 75%). On average a finished piece of work needs 2.7 attempts to land
  (688 attempts, 257 landed since 11-03). Main causes since 11-03: touched an Investor-owned file 145 (138 of them
  this morning, from one staged bundle), tests red 103, rebase conflicts 86.
- **Redone work** (since 11-01): 11 tasks were built again after they were already built elsewhere: 14.0 lane hours
  and 3.6 main-session hours ($15).

## Where the idle time went (11-05 13:05 to 11-08 17:48, 127.5 slot-hours at least)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Where the idle time went (11-05 13:05 to 11-08 17:48, 127.5 slot-hours at least), scrolls sideways" data-n="2 3" style="--tw:786px" markdown="1">

| Cause | Slot-hours | Per day | Recoverable? |
|---|---|---|---|
| Disk gate (internal disk under 10 GB; lanes stop until 20 GB) | 43.8 | ~14 | Yes. It is the largest. |
| Free slot, no start: the waiting tasks overlap files already in use, or start limits | 35.5 | ~11 | Partly. Some of it is correct (two tasks may not edit one file at once). |
| Usage reading stale: the account's usage figure is too old, so the dispatcher will not start | 29.0 | ~9 | Yes. Present every day; no fix exists on the board. |
| Account at its 5-hour or weekly limit, or out of credits | 9.5 | ~3 | No. That is the plan's real limit. |
| Memory pressure | 8.4 | ~3 | Partly. |
| Account error or lane stopped after a failure | 1.3 | ~0.4 | Small. |

</div>


Outside the lanes, the **main session was down 10.5 hours** from 11-07 16:19 to 11-08 02:47: 97 ticks in a row failed
with "git sync failed". The alarm noted 640 minutes with no session. I have not traced its cause; it is not in the
events log. On 11-06 seven main work sessions were killed (exit 137 or 143), and on 11-06 to 11-08 the main tick held
its lock 17 to 36 minutes before any session nine times (ops/metrics/idle_alarm.jsonl).

## What shipped, and what it did

**Measured effect, positive**
- Landing throughput (the landing and merge-queue changes, for example OPT-101 and OPT-102): lands per hour roughly
  doubled, as above. I cannot split the gain between single changes. Median time from finished to on main stays 6 to 25 minutes.
- Clearing the staged Investor-owned files from the main checkout (an Operator action after T-3585, 10:52 today):
  135 land refusals for "touches an Investor-owned path" before 10:00, 3 from 12:00 to 18:00, and 62 landings in
  those afternoon hours.

**Shipped, but the stall came back**
- Disk. OPT-071 was marked "kept" on 11-06. On 11-08 the disk gate held every lane 03:39 to 08:54 and again
  13:34 to about 16:54. T-3433 freed 11.6 GB at about 14:25; by 16:17 the disk was down to 5.4 GB again. T-3690 freed
  it to 24.7 GB at 16:54; by 17:41 it was 18.6 GB. **The disk is filling at about 8 GB an hour under load**, so the gate
  closes again around 18:45 tonight unless the keeper acts. The leaks are known (ops/runs/t3690-disk.md): check
  worktrees left behind after landing (15 GB), temp-folder leftovers (11.9 GB), one test leaving 49,034 folders, and
  Simulators (26 GB, which no company tool may erase).
- "No spare free". OPT-104 was marked "kept" on 11-06 (120 minutes that day, 0 on 11-07). It was 684 minutes on 11-08.
- The idle alarm (T-3589). It now tells you when slots sit idle (posted 12:01 and 14:34 today). Its two automatic fixes
  both ran and found nothing to do ("found none it may move"; "found none"). It reports; it did not fix.

**Shipped, not measured yet**
- The disk keeper (T-3691, landed 7cfae1072 at 17:30). It runs from each supervisor tick when the disk is under
  30 GB. It has not yet run live. Tonight is its first test.
- The experiment ledger holds 121 changes: 23 kept, 13 no effect, 7 reverted, 19 not experiments, 6 proposed and
  **53 still in flight with no verdict**. Many of the in-flight ones measure our own process.

**No change at all**
- The stale usage reading (29 slot-hours), memory pressure (8.4), and the cause of the 10.5-hour main-session outage.

## Where the effort failed

1. **We treated symptoms.** Each disk fill got a cleanup; the cleanup worked for under two hours. The leaks that <span title="A numbered batch of planned work, with its own plan file.">refill</span>
   it were found only today.
2. **We declared victory early.** Two "kept" verdicts on 11-06 were followed by the same stall on 11-08. That was my
   call as chair; I should have asked for a second bad day's data first.
3. **We built more measurement than repair.** 53 open experiments and $547 of "tools" spend since 11-03, while the
   three largest idle causes got no lasting fix; the stale reading still has no board line.
4. **Nobody was woken.** Overnight stalls ran 5 to 10 hours before anyone acted. The alarm now posts after 60 minutes,
   but a post on #41 at 3 a.m. still waits for morning.

## Forecast for end of Monday 11-09


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Forecast for end of Monday 11-09, scrolls sideways" style="--tw:826px" markdown="1">

| Cause | Sunday 11-08 | Monday 11-09 expected | Why |
|---|---|---|---|
| Disk gate | 37.1 | 0 to 15 | The keeper has never run live. If it holds the disk over 20 GB tonight, near 0. If not, it repeats. |
| Usage reading stale | 12.4 | 8 to 12 | No fix exists. |
| Memory pressure | 7.8 | 3 to 8 | No change. |
| File overlap / start limits | 7.5 | 5 to 10 | No change. |
| **Total idle (lower bound)** | **65.8 in 17.8 h** | **20 to 35 in 24 h** | |

</div>


- **Confidence about 55%** for the 20 to 35 range. It rests almost entirely on the keeper's first night.
- **About 50%** that Monday has no stall that holds every lane for over two hours. Every day from 11-05 to 11-08 had
  at least one, each from a different cause.
- It will **feel** better than Sunday if the disk holds. It will not yet be the system you want: about 10 to 15
  slot-hours a day will still idle on the stale reading and memory, and the slow tail of landing (hours, not minutes)
  will remain until rebase conflicts and red tests fall.

## How much more efficiency is there

Today lanes run roughly 70% of the time they could (lower bound on idle: about 42 slot-hours a day across 11-06 to
11-08, of 144). Recoverable, per day:


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: How much more efficiency is there, scrolls sideways" style="--tw:960px" markdown="1">

| Change | Slot-hours a day | Confidence |
|---|---|---|
| 1. Disk: prove the keeper tonight, then stop the two leaks at source (check worktrees removed when a land ends; the test that leaves a folder per run) | ~14 | High that it is recoverable; medium that it is done by Monday night |
| 2. Usage reading: when the reading is stale, refresh it before holding the slot | ~9 | Medium; the cause is not yet read |
| 3. Main-session outages: an alert to the Operator when the main tick fails 3 times in a row, and the 11-07 sync failure traced | 10.5 hours of main session once; unknown frequency | Medium |
| Memory pressure (measure one slot under "warn" before loosening) | ~2 to 3 | Low |

</div>


Together that is about **25 to 30 slot-hours a day, roughly 20% more working time**, so lanes would run about 85 to 90%
of the time. Because 2.7 attempts are needed per landing, more running time turns into roughly **20 to 30% more landed
work a day**, not more. The next gain after that is fewer wasted attempts (red tests and rebase conflicts: 189 of 431
failed attempts since 11-03), which is a separate and larger job I would not start before the app is back on track.

## What would make this fail

- The keeper meets something it may not move (open folders, Simulators) and the disk closes again overnight.
- We keep adding process tools after Monday instead of fixing these three causes and stopping.
- A new cause appears, as one has each day.

## Limits of these numbers

- The dispatcher log starts 11-05 09:38; 11-03 and 11-04 have no idle-by-cause figure.
- Idle slot-hours are a lower bound (method above).
- Lane spend in dollars is not readable here (lane streams sit in the personal profiles); spend figures are the main
  session's only.
- "Product commits" counts commits, not value; it is a direction, not a measure of progress.
- I could not count board tasks finished per day reliably from the board's history (rewrites re-add lines), so I used
  landings instead.
{% endraw %}

</div>
