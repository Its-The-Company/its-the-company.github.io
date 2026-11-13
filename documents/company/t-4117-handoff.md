---
layout: "default"
title: "T-4117 handoff"
section: "documents"
description: "Paused four times by tools/fable_pause.py check: 1:40 PM 11-12 on lane b3, 3:5x PM on a3, 9:2x PM on a2, and 11:07 AM 11-13 on lane a (the weekly Fable row at 85%, its fixed line). The task is three-quarters done and is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4117-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4117-handoff.md</code></span></div><h1>T-4117 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Paused four times by `tools/fable_pause.py check`: 1:40 PM 11-12 on <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3, 3:5x PM on a3, 9:2x PM on a2, and
11:07 AM 11-13 on lane a (the weekly Fable row at 85%, its fixed line). The task is three-quarters done and is not
ticked. Whoever resumes: read this, then `git log --grep=T-4117 main`, then the ledger's rows with slice 3 judged 11-12.

## Done

- 75 of the 100 IDs of ops/queue_audit/t4097-remaining-2026-11-11.json have a ledger row (T-3065 to T-3459), all on
  main. Batches 1 and 2 (50 IDs): 11 ticks, 11 keeps, 26 removes, 1 merge, 1 rewrite. Batch 3 (25 IDs, T-3385 to
  T-3459): 17 removes, 5 keeps, 3 merges; 3 notes (T-2677, T-3250, T-3131). The T-3331 done-note correction stands.
- Fourth session (11:05 AM to 11:08 AM 11-13, lane a): reads only, no ledger row, no outbox record, no repo file
  changed but this note. What it read is under In flight.

## In flight (batch 4, T-3460 to T-3555, 25 IDs: WRITTEN last night, NOT run, and now partly stale)

Scratch: N="/Volumes/SANDISK SSD/company-scratch/T-4117-ines" (batch4.py, recheck4.py, run_batch.py, drift100.py).
Do NOT run batch4.py as it stands. Read at 11:06 AM 11-13:

- `python3 "$N/recheck4.py" "$N"` prints "same 18 of 25", not 23. Odalys's board prune (T-3230 slice 3,
  ops/plans/board-prune-t3230.md, section 2) ticked five of batch 4's <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> notices at 7:32 AM 11-13 with "no commit":
  T-3460, T-3462, T-3463, T-3473 ("done another way: every owning task ticked; ref kept") and T-3469 ("spent: every
  change already on main"). They sit in log/board-archive.md (archived 10:17 AM, f7ec65c309). batch4.py still calls
  them removes: re-judge each as a closed row, the way T-3510 and T-3512 are written there (verdict tick,
  closed=True, nothing applied, flags 'closed outside the audit (T-3230 prune 7:32 AM 11-13)' and 'not an audit tick:
  leave out of the audit tick count (T-4105)'), evidence log/board-archive.md and the prune record.
  run_batch.py takes "active" from the stale inventory (is_active True for these five): give it an override so
  their rows say active false.
- T-3470 and T-3471 are open and unchanged; the prune kept both (T-3470 "unsure", for T-3025; T-3471 "work waiting
  for an open task"). T-3470's reason must change: T-3326 is no longer open (the prune closed it 7:29 AM 11-13 as a
  copy of T-3230). Re-read T-3025 and T-3306 before writing either row, and say what the prune found.
- Live inputs re-read 11:07 AM (scratch claims4.txt, status4.txt, parked4.txt): claims name T-3783 (operator) and
  T-4117 (lane a) only; no live workers; parked_lines.py has 39 lines (72 last night), of batch 4 only T-3470,
  T-3471, T-3478 and T-3485, each "gone: ref gone".
- NOT re-read yet (14 hours old, re-read before the run): T-3549's disk numbers in ops/metrics/disk_keeper.jsonl
  (a keeper run under 20 GB after 11-09 7:38 PM makes it a keep, not a tick) and the times in its done-note and in
  the T-3859 note; T-3476's reads (amendments_watch.py and ruling_record.py check on this lane, the times in the
  T-3373 note; the 4 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> of 11-12 are still unrecorded and stay the Operator's); the subjects of the five look
  lines (T-3464 to T-3468: T-3127, T-3302, T-3296, T-3362, T-3363) and of the four refused-record notices (T-3472,
  T-3536, T-3540, T-3555); the line numbers cited for T-3541 and T-3547; T-3252 and the archive refs for T-3478,
  T-3485, T-3507.
- NOT started: the Restructuring check (an Investor #41 c6854106654). Read documents/restructuring/06-decisions.md
  (11 KB) and, for each of the 25 rows, ask whether its direction relies on a decision there; if so the row is a
  keep with nothing applied, its reason and a flag saying 'waits on Restructuring decision N', left undecided.
  Likely candidates: T-3541 (session end), T-3547 (land checks), T-3476, and the rows resting on T-4012's retired
  retry route.

Six rows already in the ledger drifted the same way (found with `python3 "$N/drift100.py" "$N"`): T-3326 (remove,
batch 2) and T-3453, T-3455, T-3457, T-3458, T-3459 (removes, batch 3) are remove rows with nothing applied whose
lines the T-3230 prune ticked at 7:29 AM and 7:32 AM 11-13. queue_apply will refuse them ("no open line has this ID").
My intent: one superseding row each, in the closed form above, so the ledger's last row agrees with the board
(run_batch.py refuses an ID that has a row; a short script as 330a225ce0's did for T-3331).

## Next step

1. Fix batch4.py as In flight says (five closed rows, T-3470, the re-reads, the Restructuring check), then
   `python3 "$N/run_batch.py" "$N" "$N/batch4.py" --check`, then without --check. Outbox files on this lane are
   ops/lane-outbox/a-*.json. Commit ops/queue_audit/ledger.jsonl and the new outbox files by path at once (the
   ledger has no union merge in .gitattributes: land soon).
2. The six superseding rows; commit the ledger.
3. `python3 tools/queue_apply.py` as a dry run, read every action, then --apply for what I stand behind; commit
   ops/board.md, log/board-archive-open.md, the ledger and any new outbox files by path. Expected refusals, left
   for T-4101: the active parked notices still open (T-3065, T-3181, T-3456, T-3470, T-3471, T-3478, T-3485).
4. Tick T-4117 through board_tick (true-done), one event with tools/events.py, memory, and a final commit that
   includes `git rm ops/plans/T-4117-handoff.md`.

Open points the rows carry for the final report (T-4105) or for me: the T-3230 prune and the audit judged the same
parked notices on different rules (the prune ticked what the audit calls a remove), so T-4105's counts need the
closed rows left out; T-3182's Lock In order of 11-06 was never recorded; T-3365 and T-3371 may clash with
c6798394283; T-3406 and T-3388 wait on a ruling of mine; T-3069's before and after for #41 was never sent;
T-3233's done-note count (16) was never corrected to 15; the 4 unrecorded rulings of 11-12 (c6816236288,
c6817072037, c6824162128, c6824284854: the Operator's, tools/ruling_record.py); the ledger's missing union merge.

## Commits (hashes as on main)

- 2ab0ac371b batch 1: 25 rows (8 ticks, 8 keeps, 8 removes, 1 rewrite), 3 notes and 8 tick records
- 25561c368a batch 2: 25 rows (3 ticks, 3 keeps, 18 removes, 1 merge), 3 tick records
- 330a225ce0 T-3331's done-note corrected before landing, superseding row
- 3d947f5320 batch 3: 25 rows (17 removes, 5 keeps, 3 merges), 3 notes
- 5dff682ce7, ae32dfdf0d, f9e1d1ff73 handoff notes; c1f21f0664, 784a368224 memory
- (fourth session, lane a, 11-13) no new rows; this note only
{% endraw %}

</div>
