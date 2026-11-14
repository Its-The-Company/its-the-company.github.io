---
layout: "default"
title: "T-4098 handoff: the nine rows the links step could not write"
section: "documents"
description: "T-4408 judged group 2 of the unaudited lines on lane b2 and landed on main at 22:44 (bfaf4d567d), after lane b&#x27;s copy was cut (cd090dcbe7). Lane b&#x27;s ledger holds no rows for those 42 IDs, and tools/ledger_row.py fills\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4098-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4098-handoff.md</code></span></div><h1>T-4098 handoff: the nine rows the links step could not write</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
STATUS: done


Written by Ines, 2026-11-13 23:1x ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b (personal/b), after commit e865a24a87.

## Why these are left

T-4408 judged group 2 of the unaudited lines on lane b2 and landed on main at 10:44 PM (bfaf4d567d), after lane b's
copy was cut (cd090dcbe7). Lane b's ledger holds no rows for those 42 IDs, and `tools/ledger_row.py` fills "prev"
from the copy it runs in, so a row written here would have forked each ID against T-4408's row. A lane cannot
bring main in. So the rows below wait for a copy that holds main's ledger.

## What is done (so it is not redone)

- Every open line has a row: 530 open lines, 488 rows in lane b's copy and the other 42 on main.
- Links and flags: `ops/plans/T-4098-links.py` (method in its docstring), record
  `ops/queue_audit/links-2026-11-13.json`, hand-set links with reasons in `ops/plans/T-4098-links-hand.json`.
  233 rows written; a second run proposes nothing; no cycle.

## What is left, in order

1. Flags on group 2. Build the held-files input (`python3 ops/plans/T-4098-held-files.py HELD.json <this copy>
   <main checkout>`, about 5 minutes), then run `python3 ops/plans/T-4098-links.py --held HELD.json --rows
   ROWS.jsonl`. At 23:0x 11-13 it proposed one row from main's ledger: T-3823 (keep; flag 1, needs T-4142, which
   is open). Dry-run, then write ROWS.jsonl through `python3 tools/ledger_row.py`.
2. Feature links on eight kept review lines of group 2 whose rows name no feature: T-4022, T-4024, T-4031, T-4032,
   T-4040, T-4043, T-4048, T-4049. Method, as for T-3349, T-4063, T-4067, T-4068, T-4077 and T-4082: find the
   reviewed change (`git log <hash on the line> --grep <reviewed ID>`), match its app files against the features'
   Targets in `ops/plans/app-features.json`, read the row's own flags first (several already say "by subject it
   sits with T-41xx"), and add the ID to `ops/plans/T-4098-links-hand.json` with its reason. Then step 1's run
   writes the rows.
3. Check: a rerun proposes nothing, "cycle" is null, "file_order_late" is empty.

Rows only. No board change: the Links fields reach the board at the apply (T-4101).

## Not part of this, but found here

- `ops/plans/app-features-check.py` reports 34 faults: lines judged keep since the feature list was written (11-12)
  are in no feature of `ops/plans/app-features.json`. That is the list's to fix (T-4116's file), not the ledger's.
- The three site keeps of group 2 (T-3906, T-3996, T-4010) carry no link wording: their empty links are right.
- T-3428 is ticked (log/board-archive.md) and needs no row; T-3425 has its row (remove, R4, T-4407).

## Done, 2026-11-14 1:29 AM ET (Ines, T-4412, lane a2: personal/a2 at e764b8bf77, which holds main's ledger)

19 rows, all keep, written through `tools/ledger_row.py`, each naming the one row before it. A rerun of
`ops/plans/T-4098-links.py` proposes nothing, on this copy's board and on main's working board; "cycle" is null and
"file_order_late" is empty. Record: `ops/queue_audit/links-2026-11-14.json`. Script: `ops/plans/T-4412-rows.py`.

- Step 1: T-3823 carries flag 1 (needs T-4142, an open line on both boards).
- Step 2: the eight review lines are part of the feature T-4413 placed them in (`ops/plans/app-features.json`
  "placed"), each checked against its commit's files and its row's own flags: T-4022, T-4024 and T-4040 in T-4184,
  T-4032 and T-4049 in T-4181, T-4031 in T-4190, T-4043 in T-4180, T-4048 in T-4186. Reasons are in
  `ops/plans/T-4098-links-hand.json`.
- Ten more rows, because the board and the merge line moved after 23:0x 11-13: T-4101 and T-4123 (their needs on
  T-4097, T-4098 and T-4099 lapsed), T-4105 (T-4104 lapsed), T-3365, T-3379 and T-4318 (flag 3 no longer names
  T-4097's ref, which is not among the four refs that wait now, its line being ticked; T-4318's flag 2 lapsed with
  it), and T-4415, T-4416, T-4417, T-4418 (flag 2, raised now because their first rows are T-4099's; each read
  here, none is a dependency, the read is on the row).
- The board was read from the main checkout's working files, not this copy's HEAD: T-4099 and T-4413 are ticked
  there and no commit held that yet. The two readings differ in T-4101 and T-4123 only (needs T-4099 or not).

## Left, and not this note's

- 13 lines placed in a feature by T-4413 have no feature in their ledger row: T-2629, T-2938, T-4239, T-4244,
  T-4256, T-4257, T-4290, T-4291, T-4292, T-4302, T-4311, T-4312, and T-3823 (its row says part of T-3401). The
  script proposes none of them: it converts a line's wording, and these lines do not say it. For the board,
  `ops/plans/app-features-check.py --links` prints the value of every step (20 still to set).
- `ops/plans/app-features-check.py` shows 4 faults, before these rows and after: T-4415, T-4416, T-4417 and T-4418
  were judged keep by T-4099 after the list was written and sit in no feature. Each line's own field says part of
  T-4181. That is the list's to fix, as on 11-13.
- Five open lines have no row: T-4411, T-4419, T-4420, T-4421, and T-4412 itself.
{% endraw %}

</div>
