---
layout: "default"
title: "Every worker its own copy of the code (T-3978, folds in T-2719)"
section: "documents"
description: "The main session&#x27;s workers shared the main checkout. One worker&#x27;s uncommitted edit made another&#x27;s gate say &quot;passed, not recorded&quot;, or a commit carried a stranger&#x27;s file, or a hook refused because main moved mid-check\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/worker-copies.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/worker-copies.md</code></span></div><h1>Every worker its own copy of the code (T-3978, folds in T-2719)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Asked by an Investor #41 c6757983354 (10:17 PM 11-09) and c6758049770 (end to end; delete a copy when its
last task is done; a routine sweep). Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 22:17: the personal-account sessions do not change; this is for
the main session's workers only.

## Why

The main session's workers shared the main checkout. One worker's uncommitted edit made another's gate say "passed, not
recorded", or a commit carried a stranger's file, or a hook refused because main moved mid-check (11-09: T-3818, T-3863,
T-3963, T-3908). A copy per worker removes the shared working tree: a change sits in its own copy until
`main_gate.py land --from` has checked it there and commits exactly its files on main.

## The design, end to end (one road, 2026-11-10)

The 11-09 slice built a second lander (tools/worker_land.py) and a `work/` branch per copy. The Investors' mandate of
11-10 (#41 c6759690460) and the audit's "one road to main" (T-3994) replaced both: there is one lander,
`main_gate.py land --from`, and no new branch namespace. worker_land.py was never landed and is retired. What it did
that `land --from` lacks, and why none of it goes into main_gate.py:

- rebase on main: a copy is brought up by its worker (`git -C "$W" stash; git -C "$W" checkout --detach main;
  git -C "$W" stash pop`), and `land --from` already keeps a check when main moved in none of the named files;
- its own ledger (worker_land.jsonl): main_gate.jsonl already has a row per check, refusal and land, and
  `main_gate.py unrecorded` counts the wasted runs;
- stacked copies (`--from work/<other>`): with no branches there is nothing to stack on; a task that needs another's
  unlanded change waits for it to land, then makes its copy;
- `--remove` after a land: that is `scratch.py worktree ... --remove`, below.

1. **Start.** At dispatch: `W="$(python3 tools/scratch.py worktree <task> --worker <Name>)"`. It makes the scratch
   folder (`scratch.py new`, OWNER.json), then `git worktree add --detach "$D/wt" main`, and prints `$D/wt`.
   WORKTREE.json in the folder lists every task that needs the copy (`--for T-xxxx` adds one). Run twice: the same path.
2. **Work.** The worker edits and runs its tests in `$W` only, in the foreground. The main folder is the Operator's:
   board, records, inbox.
3. **Land.** From the main folder: `python3 tools/main_gate.py land --from "$W" --author 'Name <email>' -m MSGFILE
   --task <task> <paths...>`. The copy must differ from main's HEAD only in those paths. It checks in the copy and
   commits exactly those files on main. Exit 75, or "main changed ... during the check": bring the copy up (above)
   and land again. Never pull, merge or rebase in the main folder.
4. **Remove.** `python3 tools/scratch.py worktree <task> --worker <Name> --remove` after the land. The copy goes when
   (a) no refusal on record covers it, (b) everything it changed since it left main is on main by content (each path
   holds on main's tip, or held in a commit on main since, exactly the copy's content; this covers what `git cherry`
   sees and the uncommitted files `land --from` takes), (c) no other task in its record is live, and (d) it holds
   landed work or its own task is finished. A fresh copy of a live task stays. Removal is `git worktree remove`
   (`--force` only after (b) passed; ignored files such as build output go with it). The scratch folder and its
   OWNER.json stay; they are scratch's.
5. **Sweep.** `python3 tools/scratch.py sweep` (dry run) and `sweep --apply`: rule 4 over every linked worktree of
   main that sits in a scratch folder (`<place>/<T-NNNN-name>/<dir>`), made by the tool or by hand. A copy with work
   main lacks is never removed; it is listed with its paths. Worktrees outside the scratch places are never touched,
   and `git worktree prune` is never run (a copy on an unmounted SSD is not a gone one).

Built and landed in this slice (T-3978, 11-10): 1, 4, 5, the packet paragraph below and ops/prompts/work.md. Tests:
tests/worker_copies_test.py, written red first.

## Next (not built)

- **The hook (Investor-owned; through the applier).** Refuse, in the main folder, a non-exempt commit whose staged
  files are in the gate's scope unless `land --from` made it. It needs: (1) `land --from` to mark its own commit,
  e.g. an environment variable such as MAIN_GATE_FROM=<copy> on its `git commit` call (main_gate.py, company-owned);
  (2) the pre-commit path (`main_gate.py hook`, wherever the Investors' settings call it) to refuse gate-scope files
  without that mark, record authors (EXEMPT_AUTHORS) and records-only commits passing as now; (3) a way back the
  Investors control: a flag file or setting that turns the refusal off, with a ledger row each time it is used; (4)
  optionally a PreToolUse guard refusing Edit/Write by a worker on gate-scope paths under the main folder. The mark
  is a guardrail, not a lock: a worker could set it by hand; the ledger row from `land --from` shows the difference.
- **Operator wiring.** Run `scratch.py sweep --apply` once per pass (tools/supervisor.sh), after its dry run has
  been read once by a person: the first dry run on 11-10 is in the T-3978 board note.
- **Measure (task item 5).** Before, gate ledger ops/metrics/main_gate.jsonl, 24 h to 11-09 ~10:45 PM (n = 366 rows):
  `refused` 2, `host_refused` 4, `suite_refused` 14, `suite_red` 28, `suite_pass` 312. "Passed, not recorded" had no
  row then; `main_gate.py unrecorded` counts it now. After: the same query, and `unrecorded`, for the 48 h after
  every packet carries the paragraph below.

## The paragraph for every worker packet

> **Your copy of the code.** Make your own copy and work only there, never in the main folder:
> `W="$(python3 tools/scratch.py worktree <task> --worker <Name>)"` (quote "$W"; the path has a space). Edit and run
> your tests there, in the foreground: every test file that names a tool you changed (`grep -l <tool> tests/*`).
> Land from the main folder: `python3 tools/main_gate.py land --from "$W" --author '<Name> <<name>@itsthecompany.local>'
> -m <msgfile> --task <task> <paths...>`; the copy must differ from main's HEAD only in those paths. One gate run at a
> time. If main moved in your files, bring the copy up (`git -C "$W" stash; git -C "$W" checkout --detach main;
> git -C "$W" stash pop`) and land again; never pull, merge or rebase in the main folder. After it lands, run
> `python3 tools/scratch.py worktree <task> --worker <Name> --remove`; it keeps a copy that still holds work main
> lacks and says which files. Board notes and ticks go through `python3 tools/board_tick.py` from the main folder.
{% endraw %}

</div>
