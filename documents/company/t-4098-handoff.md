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
STATUS: open


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
{% endraw %}

</div>
