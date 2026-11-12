---
layout: "default"
title: "T-4196 handoff before the Fable limit (Operator, lane a2, 11-12 3:4x PM ET)"
section: "documents"
description: "The pause (T-4128) fired during slice 1 (5-hour row at 66%). The line stays unticked; nothing is on the branch but this note. Read it first."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4196-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4196-handoff.md</code></span></div><h1>T-4196 handoff before the Fable limit (Operator, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, 11-12 3:4x PM ET)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The pause (T-4128) fired during slice 1 (5-hour row at 66%). The line stays unticked; nothing is on the branch
but this note. Read it first.

## Done
- Packet read and scoped: the land's pipeline files (personal_land.sh, merge_queue.py, main_gate.py, ...) stay
  with the audit-implementation session while T-3992/T-3995 are open (ops/state.md, rule 62), so slice 1 is a
  standalone tool plus tests, and the land wiring goes to that session as a patch by a note on its line.
- Idris drafted the tool, untested, in scratch (not committed):
  `/Volumes/SANDISK SSD/company-scratch/T-4196-idris/land_group.py`. It parses; nothing else was checked. It
  drafts: size from the last five verdicts with the fit's formulas (ops/plans/task-process-redesign-fit.py),
  group forming in order with Targets overlap kept apart, the halves for a red group, one rerun on a runner
  error (not a red), no split during runner_watch's hold, the daily switch per step (refit on the last 7 days;
  kept in the git folder's `personal-ready/land_group_switch.json`), and the group row for ops/metrics/land_xc.jsonl.
- Found: the stacked group job needs a small tools/land_xc.py change: a member's `check` must wait on a red
  group, not hold. That is a second slice. The personal_land.sh side is one call in `prequeue_all`.

## In flight
- Nothing running.

## Next step
1. Copy the scratch draft to tools/land_group.py (or rewrite it), read it against section 4.3 of
   ops/plans/task-process-redesign.md.
2. Write tests/land_group_test.py (size at 0/1/2 reds in five, the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> at six and at what waits, Targets overlap,
   halves, error rerun, hold, switch on/off on fixture records); run it through tests/run.sh; commit by path,
   "T-4196: ...", author Idris.
3. Save the land wiring as ops/plans/T-4196-land.patch (not applied) and note it on the audit session's open line
   (T-3992 or T-3995, per ops/plans/audit-implementation.md) with `python3 tools/board_tick.py note`.
4. Note T-4196 with what landed and what remains: the land_xc.py wait-on-red-group slice, switching on, timing
   the first 20 grouped runs, the week's landed-per-slot-hour beside 6.00 by 11-30. Do not tick the line.
5. The last commit `git rm`s this file.

## Commits
- None for the task. This note's own commit only ("T-4196: handoff before the Fable limit").
{% endraw %}

</div>
