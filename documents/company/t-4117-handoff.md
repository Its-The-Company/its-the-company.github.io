---
layout: "default"
title: "T-4117 handoff"
section: "documents"
description: "Sixth stop, and the first that is not the Fable limit. All 100 IDs of group 1 (ops/queue_audit/t4097-remaining-2026-11-11.json) now have a ledger row. The apply (tools/queue_apply.py --apply) was read and is ready, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4117-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4117-handoff.md</code></span></div><h1>T-4117 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Sixth stop, and the first that is not the Fable limit. All 100 IDs of group 1
(ops/queue_audit/t4097-remaining-2026-11-11.json) now have a ledger row. The apply (`tools/queue_apply.py --apply`)
was read and is ready, and was NOT run: from this session it could not land (see "Why the apply did not run"). The
task is not ticked. Whoever resumes: read this, then `git log --grep=T-4117 main`, then go to "Next step".

Scratch: N="/Volumes/SANDISK SSD/company-scratch/T-4117-ines" (batch4.py as run; batch4-stale-1112.py the 11-12
draft, never run; drift_rows.py and supersede.py the superseding rows; precheck.py and readwould.py for the apply).

## Done

- Batches 1 to 3, 75 rows, as on main since 11-12 (2ab0ac371b, 25561c368a, 330a225ce0, 3d947f5320).
- Batch 4, the last 25 IDs (T-3460 to T-3555), every input re-read 2:25 to 2:37 PM 11-13: 15 removes, 2 keeps
  (T-3547, T-3549), 1 merge (T-3476 into T-3373, with a note on T-3373 through board_tick, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> outbox
  a2-1794598838263893000-11154), and 7 lines closed outside the audit, recorded with nothing applied (T-3460,
  T-3462, T-3463, T-3469, T-3473 by the T-3230 prune at 7:32 AM 11-13; T-3510, T-3512 by the merge reset of 2:55 AM 11-12).
- Seven superseding rows: T-3326, T-3453, T-3455, T-3457, T-3458, T-3459 (remove rows whose lines the T-3230 prune
  closed before any apply) now read as closed outside the audit, so `python3 "$N/drift100.py" "$N"` shows no DRIFT;
  and T-3230 itself, still a remove, with the facts of 11-13 (see Open points).
- What changed against the 11-12 draft, found on the re-read:
  - T-3549 (the 11-08 disk emergency) is a keep, not a tick. The rule I wrote beforehand fired: the keeper's log
    (ops/metrics/disk_keeper.jsonl in the main checkout) reads under 20 GB at every run since 11:10 AM 11-13, 29
    runs, the lowest 11.4 GB at 1:35 PM, 15.9 GB at 2:28 PM. The draft's note to T-3859 was dropped with the tick.
  - T-3507's branch is not gone, as the draft said: it is refs/heads/<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a/20261108-035525-89744 (3 commits not
    on HEAD). T-3510's branch is still refs/heads/parked/b3/20261108-035604-89744, not in the archive as its
    done-note says. Both rows say so and leave the refs to T-4099.
  - T-3470's reason: T-3326 is closed; T-3025 is the one open task it names.
- Step 3's read, 2:45 to 2:52 PM 11-13. Dry run: "done 63, merge 5, refused merge 3, refused remove 37, remove 46,
  rewrite 1". 52 actions are ready: 51 of group 1 and T-3723 (a row of group 2, T-4197, written 11:43 AM today; the
  tool has no ID filter). I read each of the 52 against its line, its row and the 29 decisions of
  documents/restructuring/06-decisions.md (an Investor #41 c6854106654) with `python3 "$N/readwould.py" "$N" a b`: I
  stand behind all 52, none rests on a Restructuring decision, and no superseding keep was needed. Only T-3230's
  line changed since it was judged (its row is of today). The ready set:
  removes T-3069, T-3177, T-3182, T-3230, T-3259, T-3305, T-3306, T-3319, T-3320, T-3347, T-3351 to T-3355, T-3367,
  T-3369, T-3374, T-3377, T-3381 to T-3385, T-3387, T-3389, T-3391, T-3392, T-3394, T-3414, T-3415, T-3429, T-3445,
  T-3454, T-3464 to T-3468, T-3472, T-3507, T-3536, T-3540, T-3541, T-3555, T-3723;
  merges T-3313 into T-2346, T-3403 and T-3404 into T-2677, T-3413 into T-3250, T-3476 into T-3373; rewrite T-3211.
- Refused among the 100, left for T-4099 and T-4101: T-3065, T-3181, T-3456, T-3470, T-3471, T-3478, T-3485 (each
  "the ledger row says active": a parked record named it when the inventory was taken).

## Why the apply did not run

`queue_apply.py --apply` writes this worktree's ops/board.md, and the lane's branch then has to rebase onto main.
Main's board moved after this session started: the 2:29 PM close of the main work session put T-3365 and T-3371 on
[b] (the T-4305 records), and T-3351 to T-3355, T-3369, T-3476 and T-3374 sit on the lines beside them. A read-only
check, `python3 "$N/precheck.py" "$N"`, builds the board the apply would leave and merges it with main's by
`git merge-file`: 1 conflict (at T-3351 to T-3355 against T-3365). So the land would fail in ops/board.md and hold
back the ledger commits with it. I tried to bring main in with `git rebase main`: rules/hooks/security-guard.py
refused it ("this command brings GitHub's changes in during a session"). A refusal stops the item (Rule 14), so I
tried nothing else and left the apply for a session that starts on fresh main.

## Next step

1. As the session's first act (the lane sits on main then): `python3 "$N/precheck.py" "$N"`. Expected: summary as
   above, ready 52, outside group 1 only T-3723, CHANGED only T-3230, and "board merge against main: clean". A line
   that shows CHANGED: read it and its row again before going on. A merge that is not clean: do not apply, report it
   (the apply then belongs in the main checkout, under T-4101).
2. `python3 tools/queue_apply.py --apply` at once; commit ops/board.md, log/board-archive-open.md,
   ops/queue_audit/ledger.jsonl and the new ops/lane-outbox/a2-*.json files by path (the ledger has no union merge
   in .gitattributes: land soon).
3. Tick T-4117 through board_tick (true-done), one event with tools/events.py, memory, and a final commit that
   includes `git rm ops/plans/T-4117-handoff.md`.

If a day has passed, read the live numbers again first (T-3549's disk, T-3476's amendments_watch) and supersede a
row that no longer holds. `fable_pause.py check` says "no pause" all session on account a while Audit mode is on
(ops/audit_mode.json), so it is no guide to the limit.

## Open points (for the final report T-4105, the Operator, or me)

- The Mac mini's disk is under its 20 GB line since 11:10 AM 11-13 (numbers above). T-3549 and T-3859 stay open.
- Seven Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> are not in log/rulings.md on main (0abab709ba, 2:37 PM): the four of 11-12 (c6816236288,
  c6817072037, c6824162128, c6824284854) and three of 11-13: 1:35 PM c6861701678 (stop the audit on Evan's account;
  its record 8b6f01cb24 is on parked/a2/20261113-134424-88412), 1:46 PM c6861929949 (restart it) and 1:54 PM
  c6862096217 (the 1:15 PM ruling withdrawn, which main still shows in force; its record 18796b4029 is on
  personal/a3, whose land failed at 2:31 PM). Recording them is the Operator's (tools/ruling_record.py). The note
  on T-3373 names the five that amendments_watch.py shows from this lane.
- T-3230 (the board prune): my row removes it as retired by the audit and is ready. Odalys's record of this morning
  ends "T-3230 stays open"; the row records the disagreement and carries the prune's counts for the #41 report.
  Until the apply runs the line is open on the board: it should not be handed out again.
- T-4105's counts: 13 group 1 rows are "closed outside the audit" (11 by the T-3230 prune, 2 by the merge reset) and
  are not audit ticks; the prune and the audit judged the same notices on different rules.
- Branches still under refs/heads/parked whose lines are closed or leaving: T-3457, T-3507, T-3510 (for T-4099).
- queue_apply.py on a lane writes the lane's own board, so a main-side change next to an archived line fails the
  land; the outbox has no such record kind (for T-4100 and T-4101).
- Carried from before: T-3182's Lock In order of 11-06 was never recorded; T-3365 and T-3371 may clash with
  c6798394283 (both now wait on #303); T-3406 and T-3388 wait on a ruling of mine; T-3069's before and after for
  #41 was never sent; T-3233's done-note count (16) was never corrected to 15; the ledger's missing union merge.

## Commits

- On main: 2ab0ac371b, 25561c368a, 330a225ce0, 3d947f5320 (batches 1 to 3); earlier handoff notes and memory.
- This session, on personal/a2 (hashes as before the land's rebase): 16102e9f6c batch 4 (25 rows, the T-3373 note's
  outbox record); a9b66dcecf the seven superseding rows; then this note and my memory.
{% endraw %}

</div>
