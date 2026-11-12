---
layout: "default"
title: "T-4116 handoff before the Fable limit (Operator, lane a, 11-12 11:1x)"
section: "documents"
description: "The pause (T-4128) fired while Ines worked T-4116; the line stays unticked. The next session on the line reads this first."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4116-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4116-handoff.md</code></span></div><h1>T-4116 handoff before the Fable limit (Operator, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a, 11-12 11:1x)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The pause (T-4128) fired while Ines worked T-4116; the line stays unticked. The next session on the line reads this first.

## Done
- ops/plans/app-features.json: 14 features with their cards (206 steps; 11 lines left outside with reasons), and
  ops/plans/app-features-check.py, its check (passes; `--md` prints the cards and checklists, `--links` each step's
  Links value, cycle-checked).
- Umbrellas T-4180 to T-4193 are on main's board, added held ("waiting until 2026-11-13") so nothing dispatches them
  before their steps are linked.

## In flight
- Nothing running. Reserved and unused: T-4194 to T-4196, for the three build lines.

## Next step
1. Write ops/plans/app-features.md from `python3 -I ops/plans/app-features-check.py --md`, with the slicing proposal
   (a feature runs as longer sessions with a commit per step, the touched test classes, and one review and one iPhone
   run at merge), building on ops/plans/task-process-redesign.md section 4.1.
2. Set each step's Links to "part of" its umbrella with `board_tick.py links` (203 to set; the values come from
   `--links`). Skip the active lines T-2296, T-3784 and T-3814 unless their owners agree. Then <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> the umbrellas' hold.
3. Add the three build lines from T-4122 section 5 (feature session tooling, Idris; the input key for reusing a pass,
   Idris; the grouped iPhone run at the land, Idris with Odalys) as T-4194 to T-4196, with "Links: part of T-4092",
   not "part of T-4116": a T-4116 piece would stop T-4116's tick until it merged (T-4100).
4. Post the feature list and the slicing change on #41 (ampm lint first), tick T-4116 with the comment URL, and add
   an event.
5. For T-4098: the 79 open review lines have no ledger row yet, so "every app line has a row" (the T-4092 note of
   2:37 AM 11-12) is true only for lines that are not reviews.

## Commits
- 6920e4756f (Ines): the feature list as data and its check.
{% endraw %}

</div>
