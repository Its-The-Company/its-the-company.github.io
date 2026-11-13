---
layout: "default"
title: "T-4196 handoff before the Fable limit (Operator, lane b, 11-12 ~19:4x ET)"
section: "documents"
description: "The pause (T-4128) fired again, after the tool&#x27;s tests passed (5-hour row about 90%). The line stays unticked. Read this first; it replaces the 11-12 lane-a2 note."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4196-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4196-handoff.md</code></span></div><h1>T-4196 handoff before the Fable limit (Operator, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b, 11-12 ~19:4x ET)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The pause (T-4128) fired again, after the tool's tests passed (5-hour row about 90%). The line stays unticked. Read
this first; it replaces the 11-12 lane-a2 note.

## Done
- tools/land_group.py: the shared iPhone run's rule as a standalone tool, with tests/land_group_test.py and
  tests/land_group_mutants.json (Idris, 5d7dd75a94). `tests/run.sh land_group_test.py`: PASS 122 FAIL 0; 35 of 35
  mutants killed. run.sh needs no listing for the new tool.
- Read-only refit on main's ledgers today: iPhone step on (7.62 against 6.14 alone), Mac host step off (4.88 against
  5.29).
- Land wiring patch built, not committed, in scratch:
  `/Volumes/SANDISK SSD/company-scratch/T-4196-idris/patch/T-4196-land.patch` (bare) and
  `T-4196-land.withheader.patch`. `bash -n` and `git apply --check` pass. The header copy's header claims a suite run
  that never happened: fix that before saving it.

## In flight
- Nothing running. `tests/run.sh --fast` was stopped at the pause (exit 130) before any suite reported: no result.

## Next step
1. Run `tests/run.sh --fast` once in the foreground; fix anything the new files broke.
2. Save the patch as ops/plans/T-4196-land.patch (not applied), with a true header. Note it on the audit session's
   open line (T-3995, or T-3992 per ops/plans/audit-implementation.md) with `python3 tools/board_tick.py note`
   (rule 62; personal_land.sh stays with that session). Say in the note: prequeue_all passes ids in ready_ids order,
   not the land's order. That is open for Odalys, who has not yet confirmed the land side.
3. Note T-4196 with what landed and what remains: the tools/land_xc.py slice (a member's check waits on a red group
   rather than holding), switching on, timing the first 20 grouped runs, a week's landed-per-slot-hour beside 6.00 by
   11-30. Do not tick the line.
4. Write Idris's memory as the rules say; commit by path with the task.
5. The last commit `git rm`s this file.

## Commits
- 5d7dd75a94 T-4196: tools/land_group.py with its tests (Idris), on personal/b.
- 52c7db08b3 / 567073303c: the earlier handoff note (lane a2), now replaced by this one.
{% endraw %}

</div>
