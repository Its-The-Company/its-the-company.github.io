---
layout: "default"
title: "Monday 11-09 measured against the forecast (T-3710)"
section: "documents"
description: "Ines, CEO. Written Thursday 11-12, 5:35 AM ET, two days later than the plan&#x27;s &quot;11-10 morning&quot;. Step 6 of ops/plans/process-monday-2026-11-09.md, for an Investor #41 c6728210641 and an Investor c6728454947. Method: the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-3710-monday-measure.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/T-3710-monday-measure.md</code></span></div><h1>Monday 11-09 measured against the forecast (T-3710)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, CEO. Written Thursday 11-12, 5:35 AM ET, two days later than the plan's "11-10 morning". Step 6 of
ops/plans/process-monday-2026-11-09.md, for an Investor #41 c6728210641 and an Investor c6728454947. Method: the one in
ops/plans/efficiency-assessment-2026-11-08.md, re-run by ops/plans/T-3710-idle-by-cause.py (kept this time).

## The answer

- **Idle <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> time landed inside the forecast: 25.7 idle slot-hours against 20 to 35.** That is 18% of 144
  slot-hours, against at least 61% on Sunday. Lanes ran about 82% of the day.
- **The forecast was right on the total for partly wrong reasons.** The disk did worse than forecast (17.0 against
  0 to 15). The stale usage reading did far better (0 against 8 to 12), because Odalys's fix landed after midnight
  and I had written that no fix existed.
- **One stall held every lane for over two hours**, as I gave even odds it would: the disk gate, 12:24 PM to about
  4:27 PM.
- **Landing got worse.** 49 landed (77 on Sunday), 2.05 an hour (3.83), and the median finished piece of work waited
  8 hours to reach main (12.6 minutes on Sunday).

## Idle slot-hours by cause


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Idle slot-hours by cause, scrolls sideways" data-n="3" style="--tw:983px" markdown="1">

| Cause | Sunday 11-08 to 5:48 PM, published | Sunday, same span, this script | Monday forecast | Monday 11-09 measured |
|---|---|---|---|---|
| Disk gate | 37.1 | 37.1 | 0 to 15 | **17.0** (52 ticks) |
| Usage reading stale | 12.4 | 12.4 | 8 to 12 | **0** |
| Memory pressure | 7.8 | 8.0 | 3 to 8 | **0** |
| File overlap / start limits | 7.5 | 2.4 | 5 to 10 | **7.3** (35 ticks) |
| Slot held for <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> work (merge-first "own first" hold) | not a cause then | 0 | not forecast | **1.2** (9 ticks) |
| Account at its limit | 1.0 | 1.0 | not forecast | **0.2** (3 ticks) |
| **Total (lower bound)** | **65.8 in 17.8 h** | **60.9** | **20 to 35 in 24 h** | **25.7 in 24 h** (438 ticks) |

</div>


What happened per cause:
- **Disk.** The keeper (T-3691) held the disk overnight: the gate never closed before noon, and the lowest point before noon was
  11.2 GB at 9:40 AM. From noon it ran every few minutes and found "nothing in scope to move"; the disk fell to
  5.6 GB at 12:21 PM and the gate held every lane until the Operator deleted the eight folders named on #246 at
  about 4:26 PM (19.4 to 27.6 GB). The keeper did not end this stall; a person did.
- **Stale reading.** T-3707 (0c0ec9a916, 12:29 AM) and T-3711 (cc632a2267, 1:02 AM), both Odalys: a slot with a stale
  reading now starts once to take a reading instead of idling. No tick on Monday held a lane on a stale reading.
- **Memory.** No tick on Monday named memory pressure. No change was made; I cannot say why it went away.
- **Overlap / start limits.** Inside the forecast. Most of it is correct (two tasks may not edit one file at once).
- **Parked-work hold.** New on Monday with the merge-first <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (an Investor #41 c6743771068, 10:22 AM): a slot waits
  while its own parked branches wait to land. Small, and by design.

## Lands and time to land

`python3 tools/land_stats.py --since 2026-11-03 [--timing]` on the lane tick logs, as on 11-08.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Lands and time to land, scrolls sideways" style="--tw:961px" markdown="1">

| | Sunday 11-08 to 5:48 PM | Sunday whole day | Monday 11-09 |
|---|---|---|---|
| Landed / attempts | 68 / 237 | 77 / 251 | **49 / 84 (58%)** |
| Lands per hour | 3.83 | 3.21 | **2.05** |
| Finished to on main, median / slowest 10% (min) | 12.6 / 1,006 | 14.7 / 1,006 | **480 / 2,163** |
| "Out of time, waits for the next tick" lines | 96 | 115 | **411** |
| Main causes of not landing | Investor-owned path 138 | | rebase conflicts 20, tests red 6, xcodebuild 5 |

</div>


- Read with the supervisor's log too (its land started on Monday), Monday is 57 landed of 94; Sunday 88 of 267.
- `python3 tools/land_idle.py --end "2026-11-10 00:00"`: the land lock sat idle 8.5 of 24 hours while work waited,
  3.9 of them waiting on the next branch's checks ("head's check").
- Fewer attempts failed (58% landed, 31% on Sunday), but far fewer were made, and each waited longer. Part of the
  8-hour median is old parked work finally landing, which counts its whole wait; it is still waiting.

## New stall causes

None that the board does not already hold. Disk: T-3859 (move what is not needed off the disk), T-3696 (check the
keeper after 24 hours), T-3189, T-3684. Slow landing and the idle land lock: T-3974, T-3995, T-4006. The parked-work
hold: T-3834 and T-3995. Under ops/plans/audit-implementation.md the audit (T-3992 to T-3997) owns pipeline changes,
so this file proposes none.

## Method notes and limits

- Idle slot-hours are a lower bound, as on 11-08: a start the slot then refused counts as busy, and gaps over
  30 minutes are not counted (Monday had none). Starts refused by the slots' own ticks on Monday, timed the same way:
  about 5.7 slot-hours on "Spread" pacing (40 refusals, the weekly budget line) and 2.3 on task cool-downs. Added,
  Monday is about 33.7, still inside the range.
- **The 11-08 figure does not reproduce exactly.** This script gives 60.9 for the published 65.8: disk, stale reading
  and the limit agree, memory is 8.0 against 7.8, and file overlap is 2.4 against 7.5. I did not keep the 11-08 script
  and cannot find the 5.1. That is my miss. Monday is compared on the same script both ways: 60.9 to 25.7.
- From 2:00 PM, merge-first slots started 425 times with no board task, only to land waiting work. The method counts
  them busy. They are the ruling working, not idle time, but they are not building either.
- The main session is outside this count. Monday: 2 failed main ticks, four alarm spells (22 to 44 minutes) where a main tick
  held its lock before any session, and 2 sessions killed (exit 137).
- Sources: ops/runs/dispatch.log, ops/runs/personal-tick-{a,b}.log, ops/runs/supervisor.log, ops/metrics/disk.jsonl,
  ops/metrics/disk_keeper.jsonl, ops/metrics/idle_alarm.jsonl, log/events.jsonl, all in the main checkout, read on
  11-12.
{% endraw %}

</div>
