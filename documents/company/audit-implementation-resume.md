---
layout: "default"
title: "Audit implementation: how to carry on"
section: "documents"
description: "This file is the hand-over for the work in ops/plans/system-audit-2026-11.md. An Investor&#x27;s instruction (an Investor, 2026-11-10 8:10 AM, log/rulings.md) says the work goes on until it is done or a usage limit is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/audit-implementation-resume.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/audit-implementation-resume.md</code></span></div><h1>Audit implementation: how to carry on</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
STATUS: open


This file is the hand-over for the work in [`ops/plans/system-audit-2026-11.md`](system-audit-2026-11.html). An Investor's instruction (an Investor, 2026-11-10 8:10 AM, `log/rulings.md`) says the work goes on until it is done or a usage limit is reached, and that it must be able to restart from the main thread (#41). While the first line above reads `STATUS: open`, a work session takes this file as its first job. When every item under "The list" is done or handed to the Investors, set the first line to `STATUS: done` and say so on #41.

Kept by whoever is doing the work. Update "Where it stands" each time something merges.

## Rules for this work

- **It is not held by the limit on new work.** The <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> above says so: it removes that limit's cause. Everything else about the limit stands.
- **Updates go to #41 as each change merges**, in plain English, 12-hour times taken from `date`, never estimated.
- **Every code change goes through the gate from its own copy.** Make a worktree or clone, change it there, run every test file that names the changed tool (`grep -l <tool> tests/*`), then from the main folder: `python3 tools/main_gate.py land --from <copy> --author '<Name> <email>' -m <message file> --task T-NNNN <path>...`. Never edit code in the main folder. One gate run at a time in the main folder; never run `tests/run.sh` there while one is in flight.
- **A guard or permission refusal stops that item** (T-0848). Report it on #41 and go to the next item.
- **Investor-owned files** (`CLAUDE.md`, `rules/`, `setup/`, `investors/`, `.github/`, the Claude Code settings) change only through the applier.
- **Helpers** work in their own copies, post status with `tools/worker_status.py`, and never commit to main; the coordinating session reviews and lands their patches.
- Edit a GitHub comment only by its ID (`gh api -X PATCH .../issues/comments/<id>`), never `--edit-last`.
- The session memory has the traps met so far: `gate-and-hub-file-traps.md`, `gh-edit-by-comment-id.md`.

## Where it stands

Last updated: 2026-11-10 8:20 AM ET, by the Fable session.

- 32 code changes are on main since 12:51 AM (the log, with each commit and its test, is [`ops/plans/audit-implementation.md`](audit-implementation.html); the write-up for the Investors is [`ops/plans/audit-implementation-report.md`](audit-implementation-report.html)).
- The count of tasks waiting to merge is 64 (215 at 1:35 AM). New work is held. Merges run by themselves. The reset rule runs hourly.
- The experiment entry with the baseline and the predictions is OPT-128 in `log/optimizations.md`, read on 11-13 and 11-17.

### In flight when this was written


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: In flight when this was written, scrolls sideways" style="--tw:960px" markdown="1">

| What | Where | State |
|---|---|---|
| Home: panels back at the top, one list of all tasks with the old styling, search, filters and sorting, "Needs you" off Home (board lines T-4004, T-4005, T-4007) | branch `fable/h2-home`, a worktree under the session's scratch folder | a helper agent is building it; if the session has ended, check the branch for a commit starting "T-4007 Fable:", run the Home suites, and land it |
| One automatic rerun of an iPhone test run that fails for no fault of the change | a clone under the session's scratch folder, branch `fable/x1-xcrerun` (fetch it into the main repository if it exists: `git fetch <clone path> fable/x1-xcrerun:fable/x1-xcrerun`) | a helper agent is measuring and building it |

</div>


A scratch folder under `/private/tmp` does not survive a restart of the Mac mini. If a branch above is missing, the item starts again from its description in "The list".

## The list

Numbers match the list posted on #41 at 8:15 AM on 11-10 (comment 6768272273). Mark each line done with its commit.

**A. One road to main**
- 3. Checking a change away from the main folder: **done**, 199e281191 (`main_gate.py check --from`, `land --from`).
- 4. The main session's own code through a separate copy: not started. The work prompt (`ops/prompts/work.md`) still lets agents edit the main folder. Change the packets and the prompt so each agent works in its own worktree and lands with `main_gate.py land --from`; then make the hook refuse a non-exempt commit of gate-scope files that did not come that way, with a way back.
- 5. Record files committed in batches by one recorder; no record files in work branches: not started. Measure first (`git log --format=%s --since=...` by subject); the biggest sources on 11-10 were the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records (three commits per apply in `tools/lane_outbox.py`), board ticks and notes, and the merge queue run. Batch first; a separate `records` branch later, if at all.
- 6. The merge tools change in one batch a day while the line is in use: not started. A handbook rule, and a note in the gate when a pipeline tool is changed.
- 7. Record "passed, not recorded": not started. `tools/main_gate.py` prints it and writes no row; write an event row so the waste can be counted.

**B. One merge line**
- 8. One task per branch (T-3883): not started. `park` in `tools/personal_land.sh` puts every commit of a lane's branch under one <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> name; split by the task ID in each commit subject. The lane's own branch carrying many tasks (17 at 1:21 AM on 11-10) is the same problem at the source: a lane should hand in one task at a time.
- 9. A "sent back to its author" state: not started. `merge_work()` in `tools/dispatch.py` already gives a lane its own parked work first ("fix", "own"); what is missing is the reason travelling with it and a stage of its own in the workflow record.
- 10. Retire the other retry routes (the retry file, the queued and hold lists, the automatic retry and redo board lines): after 9.
- 11. One Mac run and one iPhone run for a group of changes: not started. The speculative gate (`tools/merge_queue.py --gate`, lanes g10 to g14) is the existing piece; it excludes nothing by design but ran three stacked checks of one bad branch on 11-10.
- 12. Likeliest-red suites first and stop at the first red; skip a check already known red (T-3975 item 3): not started. `tools/suite_order.py` orders; the stop is missing.
- 13. Per-suite keeping for the app's host suites: not started. The helper's notes are in the commit message of 009baddbfe.
- 14. The app's tests read all of `tools/` (`tools/check_cache.py` lines 19 to 21): not started. Move the few checkers they need under `pywidget/`.
- Also done here: the false "main is red" (73eeb81bdb), the reset rule covering IDs with no board line (4288a4ba93), the unused inbox-hold tool removed (bd2da53fcf).

**C. Seeing clearly**
- 15. The six daily numbers at the top of every report: not started. `tools/report_facts.py flow_lines()` has four of them; add produced, reworked and failed checks by cause, from `tools/flow.py`.
- 16. The record's gaps: not started. Hand-outs (the dispatcher writes no row), test-run lengths (`ops/runs/land_steps.jsonl` has the seconds; `lifecycle.feed()` drops them), merges through the main gate (read `ops/metrics/main_gate.jsonl` "passed" rows and main's log), resets (`ops/metrics/merge_reset.jsonl`).
- 17. A nightly run of every test file with the reds listed on Home: not started. Run it in a full clone, never in the main folder, at a quiet hour; one row per suite in a record; Home's "Stuck or failing" reads it.
- 18. Still red on main: `tests/guard_test.sh` (two rows expect Investor settings as they were: 1 agent at once, a $10 reserve; make the rows read the files instead of pinning old values), `tests/drop_blob_test.py` (4 rows, not yet read), `tests/lane_env_test.py` (1 row naming five suites). `tests/personal_land_test.sh` part 9 fails from a linked worktree ("not a git repository").
- 19. `ops/milestones.json` was last updated 11-04: refresh from the records; Home's "next milestone" reads it.
- 20. Running notes off board lines (`ops/board.md` is over 750 KB; one line is 23 KB): not started.
- 21. The session count in T-3963's lands-against-changes measure is wrong (it counts offers, not sessions): not started.
- 22. Worker status lines on This Session, and a check that helpers post them (`tools/worker_status.py`, T-3979 slice 1): not started.

**D. Closing out**
- 23. Close the open experiments this work replaces (OPT-098, OPT-115, OPT-117, OPT-127, OPT-079 at least; `python3 tools/experiments.py due` lists them all), each with a plain result line: not started.
- 24. Remove code nothing uses: after the Home restore, whatever of the old Home is still unused; `tools/site/session_facts.py` if still unused; tests of the three old queue readings.
- 25. "A question is not a task" in the reply session's prompt (`ops/prompts/inbox.md`); it is in `ops/prompts/lane.md` already: not started.
- 26. Holding new sessions on a busy machine: not to be set until `ops/metrics/machine.jsonl` holds a few days (it started 2:06 AM on 11-10). Then read `python3 tools/machine_load.py summary --hours 72` and propose a line.

**Not for the company to decide:** a second iPhone test machine (real money). **Not to do:** the audit's "do not pursue" list.

## If the session stops at a usage limit

1. The stopping session opens an urgent issue for the Investors with these steps and posts its last state here.
2. An Investor applies the Fable reset at claude.ai (Settings, Usage, Limit resets), or waits for the weekly reset.
3. An Investor writes "resume the audit work" on #41.
4. The reply session checks that the first line of this file reads `STATUS: open` and answers when the next work session can start. If the week's pace is what holds sessions, Lock In on the site lets one start.
5. The next work session reads this file first and carries on from "The list", top to bottom, landing each change through the gate and posting on #41.
{% endraw %}

</div>
