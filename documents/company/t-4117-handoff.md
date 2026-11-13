---
layout: "default"
title: "T-4117 handoff"
section: "documents"
description: "Paused three times by tools/fable_pause.py check: 1:40 PM on lane b3 (5-hour row at 50%), 3:5x PM on lane a3 (5-hour row at 66%), and 9:2x PM on lane a2 (5-hour row at 57%, 10.3 min to its limit). The task is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4117-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4117-handoff.md</code></span></div><h1>T-4117 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Paused three times by `tools/fable_pause.py check`: 1:40 PM on <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3 (5-hour row at 50%), 3:5x PM on lane a3
(5-hour row at 66%), and 9:2x PM on lane a2 (5-hour row at 57%, 10.3 min to its limit). The task is three-quarters done and is not ticked. Whoever resumes: read this, then
`git log --grep=T-4117`, then the ledger's rows with slice 3 judged 11-12.

## Done

- 75 of the 100 IDs of ops/queue_audit/t4097-remaining-2026-11-11.json have a ledger row (T-3065 to T-3459).
  Batches 1 and 2 (50 IDs): 11 ticks, 11 keeps, 26 removes, 1 merge, 1 rewrite. Their 11 ticks read [x] on main's
  live board (checked 3:38 PM). Batch 3 (25 IDs, T-3385 to T-3459): 17 removes, 5 keeps, 3 merges; 3 notes queued
  in this lane's outbox (T-2677, T-3250, T-3131: ops/lane-outbox/a3-17945160797*.json and two more).
- run_batch.py in the scratch folder takes `PREFIX={'T-ID': 'longer prefix'}` from a batch file; the outbox it
  writes is this lane's (a3), nothing in the scripts names b3.
- Batch 3's evidence was re-read 3:37 to 3:42 PM: no line of the last 50 changed on main's board since 1:24 PM,
  claims name none of them, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> records are unchanged (scratch: claims2.txt, status2.txt, parked2.txt).
- The T-3331 done-note correction of the first session stands (50eaaf8dc2).

## In flight (third session, lane a2, paused 9:2x PM 11-12 by fable_pause: 5-hour row at 57%, 10 min to its limit)

Batch 4 (the last 25 IDs, T-3460 to T-3555) is WRITTEN and checked, NOT run: no ledger row, no outbox record yet.
`/Volumes/SANDISK SSD/company-scratch/T-4117-ines/batch4.py` passed `run_batch.py ... --check` at 9:2x PM
(25 rows: 20 removes, 1 merge, 1 keep, 3 ticks of which T-3510 and T-3512 are closed rows; 1 tick record T-3549;
2 notes, on T-3373 and T-3859). Evidence was re-read 9:05 to 9:20 PM on lane a2 (COMPANY_LANE=a2, so the outbox
files will be ops/lane-outbox/a2-*.json; no script names a lane): the 23 open lines read as at 1:24 PM, no claim
or worker status names one, parked_lines.py reads as at 3:40 PM (scratch: parked3.txt, recheck4.py).

What moved since 3:55 PM, already in batch4.py (re-read the numbers if hours pass):
- T-3549: free disk fell from 28.9 GB (3:05 PM) to 22.6 GB (8:58 PM), low 20.7 GB at 7:27 PM; still no keeper run
  under 20 GB after 11-09 7:38 PM (308 runs). Still a tick; the done-note says the margin is thin and a note goes to
  T-3859. If a keeper run reads under 20 GB before the tick, make it a keep instead.
- T-3476: tools/amendments_watch.py is RED when run on lane a2 (it was green on a3: the watch reads the checkout's
  own reflog). 4 Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> of 11-12 are in neither log/rulings.md nor the Handbook on main: 1:13 AM
  c6816236288, 2:01 AM c6817072037, 7:54 AM c6824162128, 7:59 AM c6824284854. Their record commits never landed:
  2c59a5bee0 and 7172a0b0f4 on parked/a2/20261112-025304-26533, 1555476a7b and 01e294cb2b on
  parked/a2/20261112-100216-61572. The note on T-3373 carries this; re-recording is the Operator's
  (tools/ruling_record.py). Reported to the Operator in this session's reply.
- T-3510, T-3512 closed rows: ops/metrics/merge_reset.jsonl is not in this checkout; the rows cite
  log/board-archive.md only and carry the flag "not an audit tick" for T-4105's count.

## Next step

1. `N="/Volumes/SANDISK SSD/company-scratch/T-4117-ines"`; `python3 "$N/recheck4.py" "$N"` (expect "same 23 of
   25"), `python3 "$N/run_batch.py" "$N" "$N/batch4.py" --check`, then without --check; commit
   ops/queue_audit/ledger.jsonl and the new ops/lane-outbox/<this lane>-*.json by path.
2. `python3 tools/queue_apply.py` as a dry run (pass --claims/--status/--copies/--parked from the scratch folder if
   the sweep hangs), read every action, then --apply; commit ops/board.md, log/board-archive-open.md, the ledger and
   any new ops/lane-outbox/<this lane>-*.json by path (as 1f5dbfe42b did for T-4097). Expected refusals, left for
   T-4101: the active parked notices (T-3065, T-3181, T-3453, T-3455 to T-3459, and batch 4's T-3460, T-3462,
   T-3463, T-3469, T-3470, T-3471, T-3473, T-3478, T-3485).
3. Tick T-4117 through board_tick (true-done), one event with tools/events.py, memory, and a final commit that
   includes `git rm ops/plans/T-4117-handoff.md`.

Land soon after step 1: ops/queue_audit/ledger.jsonl has no union merge in .gitattributes, so a lane that appends
after another lane's rows reached main is parked on a rebase conflict (T-4118's a2 branch was, 11:11 AM: T-4197).

Open points the rows carry for the final report (T-4105) or for me: T-3182's Lock In order of 11-06 was never
recorded in amendments.md or log/rulings.md; T-3365 and T-3371 may clash with c6798394283 (main account only);
T-3406 and T-3388 wait on a ruling of mine; T-3069's before and after for #41 was never sent; T-3233's done-note
count (16) was never corrected to 15; T-3510 and T-3512 are tick rows the audit did not tick; the 4 unrecorded
rulings above; the ledger's missing union merge.

## Commits

- 2a8685a730 batch 1: 25 rows (8 ticks, 8 keeps, 8 removes, 1 rewrite), 3 notes and 8 tick records
- 5d9e2b074c batch 2: 25 rows (3 ticks, 3 keeps, 18 removes, 1 merge), 3 tick records
- 50eaaf8dc2 T-3331's done-note corrected before landing, superseding row
- 1b9b83f2c6 batch 3: 25 rows (17 removes, 5 keeps, 3 merges), 3 notes in the a3 outbox
- (third session, lane a2) no new rows; this note only
{% endraw %}

</div>
