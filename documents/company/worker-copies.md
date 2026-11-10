---
layout: "default"
title: "Every worker its own copy of the code (T-3978, folds in T-2719)"
section: "documents"
description: "The main session&#x27;s workers shared the main checkout. One worker&#x27;s uncommitted edit made another&#x27;s gate say &quot;passed, not recorded&quot;, or a commit carried a stranger&#x27;s file, or a hook refused because main moved mid-check\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/worker-copies.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/worker-copies.md</code></span></div><h1>Every worker its own copy of the code (T-3978, folds in T-2719)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Asked by an Investor #41 c6757983354 (10:17 PM 11-09) and c6758049770 (end to end; delete a copy when its
last task is done; a routine sweep). Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 22:17: the personal-account sessions do not change; this is for
the main session's workers only.

## Why

The main session's workers shared the main checkout. One worker's uncommitted edit made another's gate say "passed, not
recorded", or a commit carried a stranger's file, or a hook refused because main moved mid-check (11-09: T-3818, T-3863,
T-3963, T-3908). A copy per worker removes the shared working tree; only main's ref is shared, and a fast-forward
moves it atomically.

## The design, end to end

1. **Start.** The Operator makes the copy when the packet goes out:
   `python3 tools/scratch.py worktree <task> --worker <Name>` prints `<place>/<task>-<name>/code`, a git worktree on
   branch `work/<task>-<name>` from main. `<place>` is `/Volumes/SANDISK SSD/company-worktrees` while that volume
   answers, else scratch's own place. `WORKTREE.json` beside `code/` records task, worker, branch, base, start commit
   and every task that uses the copy (`--for T-xxxx` adds one).
2. **Stacked.** A task that builds on another's unlanded change starts from that branch:
   `... worktree <task> --worker <Name> --from work/<other>`. It never shares the other's folder. It cannot land
   before its base (exit 7); once the base is on main it rebases like any branch, and git drops the base's commits by
   patch.
3. **Work.** The worker edits, runs its tests and commits in its copy only. The main checkout is the Operator's:
   board, records, inbox.
4. **Land.** `python3 tools/worker_land.py <task> --worker <Name>`: rebase on main (seconds), main_gate's checks
   in the copy on exactly the branch's files, then a fast-forward of main. If main moved during the check in none of
   the branch's files, the checks stand (the land-live rule); if it moved in them, one more check, then land.
   Exit codes: 0 landed or nothing to land, 1 red, 2 refused before any check (dirty copy, Investor-owned path, no
   copy), 3 gate runner offline, 4 rebase conflict, 5 the main checkout refused the fast-forward (it names the
   files), 6 main moved in its files twice, 7 waits for its stacked base, 75 gate still waiting. One row per
   attempt in `ops/metrics/worker_land.jsonl`.
5. **Wait as itself, never <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>.** Nothing the land meets puts the work on a parked/ ref (T-3965). A branch that
   can't land at once stays as `work/<task>-<name>` in its copy. Exit 1 and 4 go back to the worker (fix, commit,
   land again). 3, 5, 6, 7 and 75 wait: the Operator runs the same command again on its next pass, merge-first
   tasks first (ops/merge_first.txt). The copy stays while its branch holds anything main lacks.
6. **Remove.** After a land, `worker_land.py ... --remove` or
   `python3 tools/scratch.py worktree <task> --worker <Name> --remove` removes the worktree, the branch and the record
   when nothing in it is uncommitted, its branch holds nothing main lacks, and every task in its record is finished
   on the board (or is its own task and its branch landed). Otherwise it stays and says why.
7. **Sweep.** `python3 tools/scratch.py sweep` (dry run) and `sweep --apply` apply the same rule to every copy: no
   live task, nothing unlanded, nothing uncommitted, no refusal on record. That catches copies whose removal was
   missed.

Built in this slice: 1, 2, 4, 6, 7, and the never-parked part of 5. Tests: tests/worker_copies_test.py (32 checks)
and tests/worker_land_test.py (38 checks). Both were red before the code.

## Next slice (not built)

- **Operator wiring.** At dispatch, make the copy and put its path in the packet. On each pass, run the land again for
  every copy whose last `worker_land.jsonl` row is a wait code (3, 5, 6, 7, 75), merge-first first, then
  `scratch.py sweep --apply`. That is tools/supervisor.sh or dispatch.py, which this task did not touch.
- **Live status.** When a copy is removed (worker_land --remove, scratch.py --remove, the sweep), call
  `python3 tools/worker_status.py done <task>` (T-3979, on main since 175026c43b; not in this slice's base).
- **The merge queue.** tools/merge_queue.py takes parked/ and <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> refs. A `work/` branch should join it as itself
  (with `--branch work/...`) only if a wait lasts past one pass. For now the retry above is the queue.
- **Measure (task item 5).** Before, gate ledger ops/metrics/main_gate.jsonl, 24 h to 11-09 ~10:45 PM (n = 366 rows):
  `refused` 2, `host_refused` 4, `suite_refused` 14, `suite_red` 28, `suite_pass` 312. "Passed, not recorded" is
  printed but never written as a row, so it has no before count. Add a row for it in main_gate.py (its owner's
  task). After: the same query 48 h after the Operator wiring, plus `worker_land.jsonl` results by code.

## The paragraph for every worker packet

> **Your copy of the code.** Work only in your own copy: `<copy path>` (branch `work/<task>-<name>`), never in the main
> checkout. Edit, test and commit there, as yourself. Quote the path; it has spaces. When your tests are green and
> your work is committed, land it with `python3 tools/worker_land.py <task> --worker <Name> --remove`. It rebases
> on main, runs the gate's checks in your copy, and moves main. Exit 0 is landed. 1 (red) or 4 (conflict): fix it
> in your copy, commit, and run it again. 3, 5, 6, 7 or 75: it is waiting, not failed; say so in your reply and the
> Operator retries it. Nothing is parked. Never pull, merge, rebase or push in the main checkout, and never edit files
> there. If your task builds on another's unlanded branch, the Operator made your copy `--from` that branch, and it
> lands after that one. Board notes and ticks still go through `python3 tools/board_tick.py` from the main checkout.
{% endraw %}

</div>
