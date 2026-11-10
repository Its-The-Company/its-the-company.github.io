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

Last updated: 2026-11-10 10:06 AM ET, by the Fable session, at its hand-off (Fable's weekly limit; the reset was asked in #258).

- 44 code changes are on main since 12:51 AM (the log, with each commit and its test, is [`ops/plans/audit-implementation.md`](audit-implementation.html); the write-up for the Investors is [`ops/plans/audit-implementation-report.md`](audit-implementation-report.html)).
- The count of tasks waiting to merge is 59 (215 at 1:35 AM); 41 tasks merged on 11-10 by 9:24 AM, 24 of them app work. New work is held. Merges run by themselves. The reset rule runs hourly.
- The experiment entry with the baseline and the predictions is OPT-128 in `log/optimizations.md`, read on 11-13 and 11-17.

### In flight when this was written

1:50 PM: the Opus work session closed at its 3-hour line. Item 12 (T-3975 item 3) was not landed: Odalys's copy is at "/Volumes/Company SSD/company-scratch/T-3975-odalys/wt", her T-3975 board note says what is done and the land command; the next session finishes it from that copy (don't make a new one). Item 10 slice 1 landed 1:05 PM (0157ccd5b0). Item 9 37b62c8ec4 (after-number owed 11-11; baseline 12:30 PM: 65 arrived, 128 merged, 67% first try, 99 sent back). Item 0 e4c770e538; item 4 f372af7f9f. Item 23's overdue experiments are board line T-4013. Trap: a refused rm in a copy followed by `worktree --remove` deleted the refused files too; packets say skip --remove after any refused deletion.

Scratch copies the session made are linked worktrees and one clone under its scratch folder (`git worktree list` shows them: `wt`, `wg`, `h2`, `f2`, `p3`, `p237`, `oldwt`; the clone `x1`). Nothing in them is unmerged except as listed here. Remove each with `git worktree remove <path>` once `git -C <path> status --short` is empty or holds only what is on main; their branches (`fable/audit`, `fable/h2-home`, `fable/f2-flow`, `fable/x1-xcrerun`) are merged by content and can be deleted after `git cherry -v main <branch>` shows nothing main lacks.

## The list

Numbers match the list posted on #41 at 8:15 AM on 11-10 (comment 6768272273). Mark each line done with its commit.

**0. Home (the Investors' asks of 11-10, board lines T-4004, T-4005, T-4007): done**, 5aed12987d; the three list fixes e4c770e538 (T-4007 ticked); the strip/list counts, `live` and the six numbers done e688c5920d (10:46 AM); screenshots in `ops/site-checks/t4007-home/`. Left to do, in this order:
- The list's cards take their stage from the live status files and the Flow strip above takes its numbers from the record; at 9:21 AM they disagreed (the strip said 59 waiting to merge and 29 being built; the list's columns said 2 waiting, 1 and 1 in tests, 50 sent back, 0 being built). The strip's "waiting to merge" is the one count and includes work sent back; say so on the page, or make both read `tools/flow.py now()`.
- `flow.now()` rows carry `live` since 1ddc23b0bb: use it for "Being built" in the strip (29 there are old claims, not work in hand), and put `flow.daily()`'s six numbers on Home.
- The helper's own notes: the default sort puts held work second, so moving tasks can fold away; the stage chips lost their counts; "N done this session" was not restored; `/merge-queue.html` still builds, unlinked (remove it under item 24).
- Ask the Investors on #41 whether the restored list is what they wanted before polishing further.

**A. One road to main**
- 3. Checking a change away from the main folder: **done**, 199e281191 (`main_gate.py check --from`, `land --from`).
- 3b. Two faults of that road, met in its first hour and fixed in 424019ef2e: main gaining commits during the check, and a new tool landing with its new suite. Known limit: `land --from` wants the copy to differ from main's HEAD in the named files alone, so two unrelated changes in one copy land together or from two copies.
- 3c. A refused landing now checks that the main folder really was put back (bfe8dcda8f; its message says 104 tests, 103 ran). At 10:00 AM three test files of a refused landing stayed in the main folder until put back by hand.
- 4. Every worker's own copy: **done**, f372af7f9f (`tools/scratch.py worktree <task> --worker <Name>`, `--remove`, `sweep [--apply]`; tools/worker_copies.py; the packet paragraph in `ops/prompts/work.md`). worker_land.py dropped (one road: `land --from`). Left: the hook that refuses a main-folder commit of gate-scope files (Investor-owned settings: a proposal through the applier; needs in ops/plans/worker-copies.md), and `sweep --apply` on a schedule in the supervisor (Investor-owned? tools/supervisor.sh is company code; check). First dry run: 41 copies, 5 removable, 25 with unlanded work.
- 5. Record files committed in batches by one recorder; no record files in work branches: not started. Measure first (`git log --format=%s --since=...` by subject); the biggest sources on 11-10 were the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records (three commits per apply in `tools/lane_outbox.py`), board ticks and notes, and the merge queue run. Batch first; a separate `records` branch later, if at all.
- 6. The merge tools change in one batch a day while the line is in use: not started. A handbook rule, and a note in the gate when a pipeline tool is changed.
- 7. Record "passed, not recorded": **done**, be1668eaf6 (`suite_unrecorded` rows; `python3 tools/main_gate.py unrecorded --days 7`).

**B. One merge line**
- 8. One task per branch (T-3883): **measured, no change made**. Of 249 merge tries on 11-10, 239 carried one task (10 carried more, 3 of those landed); `tools/merge_queue.py` already re-cuts every <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch into one entry a task each hour. 47 old parked branches still carry several tasks, most of them already merged another way. What is left, if it is ever worth it: a lane's first try at session end carries whatever its branch holds. Original note: `park` in `tools/personal_land.sh` puts every commit of a lane's branch under one parked name; split by the task ID in each commit subject. The lane's own branch carrying many tasks (17 at 1:21 AM on 11-10) is the same problem at the source: a lane should hand in one task at a time.
- 9. A "sent back to its author" state: **done**, 37b62c8ec4 (T-4011): `tools/sent_back.py` ledger (ops/metrics/sent_back.jsonl, out of git), the reason in the lane packet ("Why it came back"), `with_author` stage in tools/flow.py; closing rule is merge_reset.py as it was. After-number owed 11-11.
- 10. Retire the other retry routes: slice 1 **done**, 0157ccd5b0 (T-4012 open, noted): the spare's retry of another lane's lines (retry_other) is gone. Kept until T-4011's after-number shows the send-back landing work (it made 0 fix hand-outs by 1:05 PM): the retry file, the hourly re-pick and the queued and hold ledgers (the only route landing parked work: 133 lines added, 36 own retries on 11-10). Ready: removing the automatic "Retry finished work" board line, patch at SSD scratch T-4012-slice2-board-line.patch (four land suites still assert it). Kept for good: the P0 redo line (Investor ruling T-3200); ops/personal_requeue.txt (a person restarting a task, not a retry route).
- 11. One Mac run and one iPhone run for a group of changes: not started. The speculative gate (`tools/merge_queue.py --gate`, lanes g10 to g14) is the existing piece; it excludes nothing by design but ran three stacked checks of one bad branch on 11-10.
- 12. Likeliest-red suites first and stop at the first red; skip a check already known red (T-3975 item 3): in hand, Odalys, 1:15 PM 11-10. `tools/suite_order.py` orders; the stop is missing.
- 13. Per-suite keeping for the app's host suites: not started. The helper's notes are in the commit message of 009baddbfe.
- 14. The app's tests read all of `tools/` (`tools/check_cache.py` lines 19 to 21): not started. Move the few checkers they need under `pywidget/`.
- 2 (from the first list). One rerun for a red iPhone run that is probably not the change's fault: **done**, 49ff572448. Not covered: the merge gate's own iPhone checks (`tools/merge_queue.py`, `tools/main_gate.py` call `tools/land_xc.py` themselves). The cure is the store tests passing with 5 Simulators at once, or the runner giving them one at a time: T-4008 on the board.
- Also done here: the false "main is red" (73eeb81bdb), the reset rule covering IDs with no board line (4288a4ba93), the unused inbox-hold tool removed (bd2da53fcf).

**C. Seeing clearly**
- 15. The six daily numbers at the top of every report: **done**, 1ddc23b0bb (`python3 -I tools/flow.py daily`; `tools/report_facts.py` leads its flow section with them). Not yet on Home.
- 16. The record's gaps: **done**, 1ddc23b0bb (hand-outs from now on in `ops/metrics/handout.jsonl`, test-run seconds, time-outs apart, gate merges, resets, closed board lines). Left open: a claim that was released or aged out has no row, so 95 tasks still read "being built" with `live` false (`flow.now()` rows carry `live`; pages must use it); hand-outs inside a main session are not recorded; `flow.py check` still differs from the one count by 18 and 28 tasks (one cause: the merge queue's file still lists T-0443, merged 11-08).
- 17. A nightly run of every test file with the reds listed on Home: not started. Run it in a full clone, never in the main folder, at a quiet hour; one row per suite in a record; Home's "Stuck or failing" reads it.
- 18. Red on main: `tests/guard_test.sh` and `tests/lane_env_test.py` **done**, 23cbae142e; `tests/personal_land_test.sh` (two real-tick rows my 6:35 AM scheduler change broke, in every folder) **done**, 49ff572448. Still red: `tests/drop_blob_test.py` (4 rows, the "diverged tick" ones): it <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> functions out of `tools/supervisor.sh` to run them alone, and the lifted piece now calls functions it does not lift (`watch_amendments`, `amend_hold`, `git_logged`, `sync_repo`: "command not found"). The supervisor is not shown wrong; the test's way of lifting is stale.
- 18b. Proposal #237 (it closes the retired amendments file to new entries) was undone twice by the applier's false alarm (fixed in be1668eaf6) and no longer fitted main after 23cbae142e. **Posted again as #257** at 9:27 AM on 11-10, brought up to main, its three test files green in a copy. It waits for one Investor "approve" on #257; the applier does the rest. If main's `tests/guard_test.sh` changes near the row "a changed opening text is restored" before then, the diff must be cut again the same way (`git cherry-pick -n 413186a6c9`, take the proposal's two lines for that row).
- 19. `ops/milestones.json` was last updated 11-04: refresh from the records; Home's "next milestone" reads it.
- 20. Running notes off board lines (`ops/board.md` is over 750 KB; one line is 23 KB): not started.
- 21. The session count in T-3963's lands-against-changes measure is wrong (it counts offers, not sessions): not started.
- 22. Worker status lines on This Session, and a check that helpers post them (`tools/worker_status.py`, T-3979 slice 1): not started.

**D. Closing out**
- 23. Close the open experiments this work replaces (OPT-098, OPT-115, OPT-117, OPT-127, OPT-079 at least; `python3 tools/experiments.py due` lists 52 lines), each with a plain result line: not started. Each entry's `result`, `verdict` and `evidence` fields in `log/optimizations.md` need a measured value or an honest "cannot be read: the reset rule, the one limit and the false main-red alarm all fell inside its window"; `python3 tools/experiments.py check` validates, and already reports one error not of this work (OPT-114 used twice; the later entry should be OPT-129).
- 24. Remove code nothing uses: after the Home restore, whatever of the old Home is still unused; `tools/site/session_facts.py` if still unused; tests of the three old queue readings.
- 25. "A question is not a task" in the reply session's prompt: **done**, b45263e592.
- 26. Holding new sessions on a busy machine: not to be set until `ops/metrics/machine.jsonl` holds a few days (it started 2:06 AM on 11-10). Then read `python3 tools/machine_load.py summary --hours 72` and propose a line.

**Not for the company to decide:** a second iPhone test machine (real money). **Not to do:** the audit's "do not pursue" list.

## If the session stops at a usage limit

1. The stopping session opens an urgent issue for the Investors with these steps (done: #258) and posts its last state here.
2. An Investor applies the one-time Fable reset on the account (asked in urgent issue #258, opened 9:29 AM on 11-10), or waits for the weekly reset.
3. An Investor writes "resume the audit work" on #41.
4. The reply session checks that the first line of this file reads `STATUS: open` and answers when the next work session can start. If the week's pace is what holds sessions, Lock In on the site lets one start.
5. The next work session reads this file first and carries on from "The list", top to bottom, landing each change through the gate and posting on #41.
{% endraw %}

</div>
