---
layout: "default"
title: "T-5070 handoff: gate and scheduler tasks waiting to merge"
section: "documents"
description: "Nothing was built. About 35 minutes went to reading and measuring; no fix of this signal&#x27;s own is small enough to ship tested in the time left without copying one of the process-merge lines (T-5131 to T-5134, T-5139 to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5070-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-5070-handoff.md</code></span></div><h1>T-5070 handoff: gate and scheduler tasks waiting to merge</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Nothing was built. About 35 minutes went to reading and measuring; no fix of this signal's own is small enough to ship
tested in the time left without copying one of the process-merge lines (T-5131 to T-5134, T-5139 to T-5143). This page is
what I found and what is left. Read-only: no tool, test or record was changed.

## What the signal is

waiting_hub (tools/bottleneck_watch.py, ops/bottleneck_lines.json): the hourly mean of "hub" in ops/metrics/waiting.jsonl,
which tools/parked_count.py waiting() writes through tools/merge_limit.py sample(). A task counts in hub while any commit
it carries that main lacks by patch touches HUB_FILES (main_gate.py, land_xc.py, personal_land.sh, merge_queue.py,
dispatch.py, governor.py, supervisor.sh). It is counted from its ready marker until it is on main. Its limit is an XmR
natural limit of the signal's own history, never above 1 (the hub admission limit).

## Numbers (live main checkout's waiting.jsonl, flow.jsonl, land_steps.jsonl; times UTC unless EST)

1. The count is 0 or 1 only (admission is one at a time). In 11-18 10:00 PM to 11-19 11:22 AM EST it read 1 in three runs:
   6:56-7:37 AM UTC (T-5006, 47 min waiting to merged), 8:40 AM-2:36 PM UTC (T-4961, then T-4850 and its copies), and
   3:39-4:11 PM UTC (T-4843, 30 min from ready to merged: 15 min for a turn, then a 15.6 min host check). The reading
   that opened this line (0.33 against 0.15) was that last, short wait.
2. The limit was 0.14-0.15 because the 28 hours it was built from were almost all zero (centre 0.05). A 0/1 count
   averaged by the hour on that base reads over its limit for any hub task that waits more than about 10 minutes of an
   hour. By 3:44 PM UTC the limit had risen to 0.43 (the history now has the episodes in it) and the reading was 0.17.
   I did not move or re-derive any limit.
3. Hub tasks wait about as long as every other process task: 7 hub tasks since 11-16 (flow.jsonl, first
   waiting_to_merge to merged): median 105.8 min, p90 213.6 min; the other 218 process and app tasks: median 86.6 min,
   p90 497.4 min. So this is not a separate cause: it is the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> route's (the one land lock, T-5131; a hub change's
   own check, because its files are the run-loop code, so supervisor_test.sh and personal_land_test.sh always run for it:
   T-5132; copies re-taking the lock, T-5133). T-4850 held the lock 49 min (b40, landed 7:44 AM EST), then its batch b2
   65 min (red, supervisor_test.sh) and b54 39 min (red, same suite): 2.5 h of lock for one hub task.
4. Hub order is already first: land_order.py ranks by merge_first score, age <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, board priority, then cost; T-4850,
   T-4961 and T-4843 were on that list. A hub-first rule would only cut the turn wait, not the lock held by a land
   already running or the 39-65 min checks, so I did not add one.

## Measurement questions (the board line asked)

- What counts as "gate and scheduler": the seven files above, by commits main lacks by patch (merge_limit.kinds_of).
  Records alone never count. That reading is right as a definition.
- Finished-but-landed copies: parked_count.waiting() puts a ready or batch marker's tasks in `line` with no landed test
  (only the held and <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs are cut by park_stats.landed_tasks), but kinds() reads each task's files from `git cherry
  main <tip>`, so a copy whose commits are all on main by patch has no files and counts as app (unknown), never hub.
  I could not prove from the records whether the 7:44 AM to 9:36 AM EST stretch of hub=1 was real unlanded T-4850 commits
  (b2 and b54 each ran a 39-65 min host check, which a fully landed copy would not) or a landed copy. The sample rows
  keep no task ids, so the history cannot say. That is the missing measurement: write the ids of the hub tasks into
  the waiting.jsonl row (field "hub_ids") so the next reading shows who. Small, not a hub file (tools/parked_count.py,
  tools/merge_limit.py), with tests/parked_count_test.py and tests/merge_limit_test.py. Not done.

## What is left

1. Do not clear anything by hand. The signal falls with the route: T-5139 (one personal slot lands through the gate,
   one task per check; the hub tasks are the ones to send first) and T-5131 item 4. Either finishes the hub wait to
   a check time (15-40 min), which is what the 0.43 limit allows.
2. Smallest piece this signal needs from those lines: hub-file lands only, through T-5139's route, behind its switch.
   Put a note on T-5139 saying so; a hub change is also T-5140's.
3. Add "hub_ids" (item above) first if a person wants the copy question settled with data.
4. Re-read the watcher after 11-20: the limit is a moving one, so the day's reading is the test, not this page.
{% endraw %}

</div>
