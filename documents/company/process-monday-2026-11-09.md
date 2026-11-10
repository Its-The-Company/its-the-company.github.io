---
layout: "default"
title: "Monday 11-09: fix the three biggest stall causes, then back to the app"
section: "documents"
description: "Spend Monday on the causes that idled the most lane time (disk, the stale usage reading, main-session outages), prove each fix with the next day&#x27;s numbers, and return to the app on Tuesday 11-10 with process at its\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/process-monday-2026-11-09.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/process-monday-2026-11-09.md</code></span></div><h1>Monday 11-09: fix the three biggest stall causes, then back to the app</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Plan mode on #41: an Investor asked 2026-11-08 5:46 PM (c6728210641); Ines's assessment and questions 5:55 PM
(c6728313733, ops/plans/efficiency-assessment-2026-11-08.md); an Investor answered 6:08 PM (c6728454947). Written by the
Operator (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-b2). Either Investor decides alone (charter 57). The main session records Q3's approval as a <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>
(tools/ruling_record.py); a lane does not land rulings.

## Goal
Spend Monday on the causes that idled the most lane time (disk, the stale usage reading, main-session outages), prove
each fix with the next day's numbers, and return to the app on Tuesday 11-10 with process at its usual share.

## What the answers decided
- **Q1 B, the whole of Monday on process, as planned.** The push of ops/plans/site-process-push.md stays in force to
  11-09 11:59 PM. Inside it, the steps below go first.
- **Q2 B, after Monday, back to the usual small share.** From 11-10 12:00 AM Tenet 1's shares apply again: at most 10%
  of the week's usage on the company's own processes, at most 5% on the site. Nothing new needs building for this:
  the push ends at its date. Not chosen: the freeze (A).
- **Q3 A, a path for the company to erase unused Simulators.** This approves the route that T-3189 is waiting on: a
  company tool may erase (`simctl erase`: device kept, contents emptied) shut-down, stock Simulators that no running
  job uses, when the disk is low. It also <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the refusal record for those Simulator folders (the Simulator rows of
  ops/refusals.jsonl, T-3682/T-3683), which otherwise binds them. A classifier refusal inside a Claude session still stops an
  item (T-0848); the erase runs from the supervisor tick's disk keeper, a plain shell with no Claude, and cites
  c6728454947.

## Steps (board lines)
1. **T-3189 (Odalys, P0):** the disk keeper erases idle Simulators after its SSD moves and sweep, when the disk is
   still under 30 GB: stock, shut-down, not booted by any running job, never the runner's or a per-task device,
   largest first, one row each in ops/metrics/sim_trim.jsonl. The refusal tools learn an "Investor lift" row so the
   record stops binding those folders. About 26 GB on the disk today.
2. **T-3707 (Odalys, P0):** the stale usage reading. When the account's usage figure is too old, the dispatcher
   refreshes it before holding the slot. About 9 slot-hours a day idle on this today.
3. **T-3708 (Odalys, P0):** main-session outages. Trace the 11-07 4:19 PM to 11-08 2:47 AM "git sync failed" run
   (97 ticks, 10.5 hours), fix its cause, and alert the Operator after 3 failed main ticks in a row.
4. **T-3709 (Odalys, P1):** remove check worktrees when a land ends (15 GB left behind, ops/runs/t3690-disk.md).
   With T-3684 (temp folders and the test that leaves a folder per run), this stops the disk leaks at the source.
5. **Checks already on the board:** T-3696 (disk keeper after 24 hours, after 11-09 6:00 PM), T-3658 (memory fix,
   after 11-09 12:00 PM), T-3695 (land the branches refused for old copies of main commits).
6. **T-3710 (Ines, P1, on 11-10 morning):** measure Monday with the assessment's method (idle slot-hours by cause,
   lands, time to land) against its forecast of 20 to 35 idle slot-hours, and post the result on #41 in plain words.

## Risks
- A new stall cause appears, as one did on each of 11-05 to 11-08. Step 6 names it; it gets a line, not a new tool push.
- The keeper meets a folder it may not move and the disk gate closes overnight. Step 1 adds the largest source it may
  touch.
- Erasing a Simulator a job is about to use. Step 1 checks the booted list and running jobs first, and erase keeps the
  device and its udid, so destinations still resolve.

## Left out
- Memory pressure (about 3 slot-hours a day): T-3658 measures first; no change Monday.
- Fewer wasted land attempts (red tests, rebase conflicts): a larger job, not before the app is back on track.
- New measurement tools: none are added Monday.
{% endraw %}

</div>
