---
layout: "default"
title: "T-4437 handoff: what the order and the last refused rows still need"
section: "documents"
description: "Land lane b3 soon. Each queued move replays as board_tick move T-X --before T-Y on main&#x27;s board. If a target (T-2844, T-2076, T-1993, T-4226) or a moved line is ticked before the land, that record is refused, goes to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4437-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 24 · Sat Nov 14</span><span><code>ops/plans/T-4437-handoff.md</code></span></div><h1>T-4437 handoff: what the order and the last refused rows still need</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-14 2:15 PM ET. The line is not ticked. Commits on <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3: 83d147b7ab (the order), 4a209c4f66
(T-3675, T-4177's row), 3e6faec514 (the apply, the notes, the record), and the one that carries this file.

## Done

- The app-first order: 146 `board_tick move` records queued in ops/lane-outbox/ (b3-*), in plan order. 143 app
  lines move ahead of the first queued site, efficiency or other line of their priority (4 P0, 74 P1, 59 P2,
  6 P3). Record: ops/queue_audit/order-2026-11-14.json. Script: ops/plans/T-4437-order.py.
- T-3675 is ticked on evidence (ledger row tick, board tick queued). ops/plans/app-features-check.py exits 0.
- The T-4177 notice is archived (log/board-archive-open.md).
- Twelve notes on open lines: six name a <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> ref that holds their work (T-1069, T-0623, T-2260, T-2266,
  T-2409, T-2021), two give back a record that never reached main (T-4228, T-4276), four say what a refused row
  waits on and ask its owner (T-3705, T-3871, T-3879, T-4240).
- Every refused row has an end: ops/queue_audit/rows-2026-11-14-t4437.json (ops/plans/T-4437-ends.py checks it
  against the dry run: 19 refused, 13 active, 6 for want of code).
- T-4461 (Odalys) is on the board: the code for the six rows that are refused without being active.

## Left, in order

1. After lane b3 lands, check the order replayed. `python3 ops/plans/T-4437-order.py` must print moved 0 for each
   priority (a line that became ready since is new, not a miss). Look in ops/lane-outbox/failed/ for b3 move
   records: a line ticked between 2:03 PM and the land is refused there, and that is fine.
2. Four app lines stay behind because their move would raise an open parent's priority: T-2373 (parent T-0198, P2
   to P1), T-2987 and T-2989 (T-0272, P3 to P1; T-2988, P2 to P1), T-2988 (T-0272, P3 to P2). Decide in T-4105
   whether the parents take the higher priority (the T-4104 memo says priority is derived). Then move them with
   the script. Four more stay as active (R2): T-3877, T-2296, T-4256, T-3821; a rerun moves them once their rows
   say not active. Three stay behind their parent T-4186 (decisions 17, 18): T-4280, T-4281, T-4282.
3. The nine parked notices. tools/queue_apply.py reads tools/parked_lines.py itself: while that tool lists a
   notice as anything but "gone", the apply calls it active, whatever the ledger row says. So each closes by its
   own record, not by a row:
   - Never queued, nothing open in them: T-3855, T-4296, T-4299. They close when the merge queue reads the ref
     (Odalys): T-3855's commit of T-3679 was redone by a lane as T-3785 (f53be68c9a, ticks ad1d18cfc7), and the
     queue's own classify should read it as superseded. Do not write a <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> line saying "on main by hand" for it:
     that wording is what tools/parked_lines.py matches, and it would not be true. T-4296 (17 ledger rows brought
     over by T-4097's session on lane a3) and T-4299 (an earlier try at T-4097) carry my 11-13 note: do not retry.
   - Mine. T-3592: read why the classifier refused the restore of 938b373c0 on 11-05 (ops/merge_queue_hold.txt
     line 2 sends it to me under T-0848) and rule on it; until then the snapshot is named on four open lines, to
     read, not to restore.
   - Odalys. T-1248 and T-3593: tools/parked_lines.py reads 1 and 3 commits that would pick clean on main.
   - The merge line (the Operator, T-3995). T-4231, T-4297, T-4298 and the rewrite of T-4240: their refs wait to
     merge (tools/parked_count.py --json: T-4228, T-4240, T-4284, T-4444). When they land, two lost notes and the
     11-13 11:26 AM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (#296, Restructuring 27, not in log/rulings.md at HEAD) land with them.
4. Worker copies: T-3705 (T-3995-odalys/readers2), T-3879 (eight copies of Odalys's), T-3871 (T-3871-idris/wt,
   Idris's). When each owner says on the line that the copy landed or was cleared, restate the row with active
   false through tools/ledger_row.py and run the apply.
5. When T-4461 lands, run the dry run again. Done is: it refuses only lines that are active.

Land lane b3 soon. Each queued move replays as `board_tick move T-X --before T-Y` on main's board. If a target
(T-2844, T-2076, T-1993, T-4226) or a moved line is ticked before the land, that record is refused, goes to
ops/lane-outbox/failed/ and tools/personal_land.sh writes one board line for it; T-2076 is the target of 77 records.

## Seen, not this slice's

- Three lines have a ledger tick row and are still open on the board: T-3495, T-3680, T-3718.
- documents/restructuring/06-decisions.md does not mark decision 29 answered; log/rulings.md has the answer
  (2026-11-13 11:24 AM, #297).
- 23 lines have no ledger row (newer than the audit); the order neither moves them nor uses them as a target.
{% endraw %}

</div>
