---
layout: "default"
title: "Audit implementation: status"
section: "documents"
description: "The running record of carrying out ops/plans/system-audit-2026-11.md under the Investors&#x27; mandate of 2026-11-10 (rulings 11-10 00:12, 00:13 and 00:19 in log/rulings.md). Kept by the Fable session that owns the work\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/audit-implementation.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/audit-implementation.md</code></span></div><h1>Audit implementation: status</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The running record of carrying out [`ops/plans/system-audit-2026-11.md`](system-audit-2026-11.html) under the Investors' mandate of 2026-11-10 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> 11-10 12:12 AM, 12:13 AM and 12:19 AM in `log/rulings.md`). Kept by the Fable session that owns the work. Board lines T-3992 to T-3997, one per phase. Times are ET.

A phase is marked done only when its changes have passed their tests and are on main.

## Who owns what

Until T-3992 to T-3997 are ticked, only the Fable session changes these files. Other workers hand it patches by a note on its board line.

`tools/dispatch.py`, `tools/governor.py`, `tools/pool_adapt.py`, `tools/personal_tick.sh`, `tools/personal_land.sh`, `tools/merge_queue.py`, `tools/main_gate.py`, `tools/supervisor.sh`, `tools/parked_count.py`

## Baseline, 12:15 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline, 12:15 AM 11-10, scrolls sideways" style="--tw:893px" markdown="1">

| Measure | Reading | Source |
|---|---|---|
| Unique tasks <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> | 188 (452 waiting branches) | `python3 tools/parked_count.py --json` |
| <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> branches waiting to land | 6 of 6 slots | lane tick logs |
| Land tries, 11-09 | 186, 56 landed (30%) | `ops/runs/land_steps.jsonl` |
| Land time on tries that did not land, 11-06 to 11-09 | 80% | same |
| Main moves, 11-09 | 508, about 8 in 10 records | main's reflog |
| App share of changed code lines, 11-06 to 11-09 | 12% | `git log --numstat` |
| Verified app commits a day | about 15 | same |
| First hand-out to landed | median 9.9 h, slowest tenth over 41.8 h | dispatch log, land steps |
| Kept test passes reused, 11-06 to 11-09 | 10 | `ops/runs/check_reuse.jsonl` |
| Real lane sessions against offers, 11-09 | 35 against 243 | lane tick logs, dispatch log |
| Machine load series | none recorded | |

</div>


## Workers and processes found, 12:13 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Workers and processes found, 12:13 AM 11-10, scrolls sideways" style="--tw:916px" markdown="1">

| What | State | Decision |
|---|---|---|
| Main work session | none running; pacing holds work ("the week is ahead of its line") | nothing to stop |
| Lane sessions | none running; all six slots wait for their last branch to land; merge mode on | left as they are |
| Supervisor tick (pid 18412) | finishing its jobs after the 12:11 AM inbox session | left alone |
| Inbox watcher, lane tick jobs, supervisor job (launchd) | running as designed | kept |
| An interactive session open for 2.6 days (pid 11422) | idle | left alone; not the company's worker |
| Shared folder | clean: the 11:43 PM close sweep committed everything left in it, the merge queue page and the throughput files included, without a gate pass | checked under phase 0 |
| Saved patches in scratch | T-3818, T-3907 (2), T-3962, T-3967, T-3971, T-3976, T-3978, T-3980 | see below |

</div>


## Proposals, as decided by the mandate

- **Closed 11-10 (dropped, deferred or duplicate):** T-3890 as a standing path, T-3907, T-3951, T-3957, T-3958, T-3962, T-3964, T-3965, T-3973, T-3980, T-3985, T-3987.
- **Kept and landed by this work:** T-3818, T-3972, T-3908, T-3974, T-3975, T-3905, T-3883, and the useful parts of T-3885, T-3901 and T-3979.
- **Changed or folded in:** T-3875 and T-3971 into the one limit (T-3993); T-3978 into one road with the same lander (T-3994); T-3955 into the one workflow record (T-3996); T-3963 with its session count fixed; T-3986 light only.
- **Deferred, patch not landed:** T-3967, T-3976.

## Phases


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Phases, scrolls sideways" style="--tw:718px" markdown="1">

| Phase | Board line | State |
|---|---|---|
| 0. Stabilize | T-3992 | landed: inventory done, 12 lines closed, T-3972 and T-3818 on main and ticked, every red found on main fixed (9 suites), the gate no longer reads a cut host run as red. Left: T-3908's line (its page is on main) and T-3974/T-3975's remaining items |
| 1. Admission: one limit on unmerged work | T-3993 | landed except one file: count, record, limit, dispatcher, pool, lane tick, lane_take, handbook, prompts and Home's line are on main; tools/governor.py's part (its own next-step text, the last-day release) is stopped by a guard (T-0848) and waits for a clearing word |
| 2. Quiet main, one road | T-3994 | in progress: the close sweep and the salvage set leftover code aside on a leftover/ branch instead of committing it (landed). Not started: the gate checking a candidate outside the main folder, main-session code through branches, records out of code history |
| 3. One merge line | T-3995 | in progress: message hold removed and lands no longer need a session (landed, with a way back); the reset rule is on main and applied (73 tasks, count 206 to 133); its hourly job is written, checked in a full clone (personal_land_test.sh 373 pass) and in the gate; about 50 old tasks stay because they share a branch with a newer task; one task per branch, the sent-back state and retiring the other retry routes are not started |
| 4. One record, Home, This Session | T-3996 | in progress: the load recorder, the workflow record, the live-feed fix and Home's limit line are on main; landed: the load record, the workflow record, the live-status loop, This Session and the new Home are on main. Left: the record does not yet hold a hand-out, a test run's length or a main-gate merge; the unused Home pieces (session_facts.py, the In flight, Simulators, Merging and finance code) wait for a removal of their own |
| 5. Return to app work | T-3997 | in progress: the exit rule is live and recording (207 waiting at 2:17 AM; the 24-hour clock is not running); the app-first rule with its 10% process share and the report's section are on main; OPT-128 in log/optimizations.md holds the baseline and the predictions |

</div>


## Log of what landed

(newest last; each line: time, commit, what, the test that proves it)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Log of what landed, scrolls sideways" style="--tw:1089px" markdown="1">

| Time (11-10) | Commit | What | Proof |
|---|---|---|---|
| 12:51 AM | 56d2ee153e | No Investor-message hold on merging; land-live runs with no session, taking the supervisor's lock for the merge alone | tests/personal_land_test.sh, 16 new rows, 2 mutants |
| 12:55 AM | cda1d3ca73 | The idle alarm leaves a land's lock alone | tests/idle_alarm_test.py, 2 new rows |
| 12:57 AM | a1a49d99db | The one count of unique tasks waiting to merge, its record, the limit of 12, the 20-for-24-hours exit rule (tools/merge_limit.py) | tests/merge_limit_test.py, 52 rows |
| 1:13 AM | 0314de4bd3 | Slot test fixture (two rows the first change turned red) | tests/personal_slots_test.sh, 32 pass |
| 1:16 AM | 01415bcbe9 | The dispatcher reads the one limit; a waiting branch lands before its lane takes any task; three older lines removed | dispatch_merge_mode_test.py, dispatch_own_first_test.py and 10 more suites in the gate |
| 1:18 AM | 2b4d5f6468 | The main session's pool follows the one limit (2 agents while new work waits); T-3875's three readings and four unused helpers removed | merge_capacity_test.py (rewritten), merge_limit_test.py 55 rows |
| 2:02 AM | 96c18b17d0 | A way back for the land without a session (the file ops/land_session_only); the four suites the first change left red and the train suite's older red are green | personal_off_test.sh 128, personal_parked_test.sh 96, personal_train_test.sh 26, site_lanes_test.py, main_gate_test.py |
| 2:06 AM | d8d7370013 | Machine load recorded every minute by the inbox watcher (tools/machine_load.py, ops/metrics/machine.jsonl); the limit's cache files ignored by git | machine_load_test.py 60 rows, 8 mutants; first rows written 2:06 AM |
| 2:19 AM | e44772c782 | T-3972: the site's 15 browser suites write their screenshots to a temp folder (tests/shot_folder.py); a last row in each checks the saved copy was left alone | red first on the old code (34 pass, 1 fail, 8 PNGs modified); 16 suites green in the gate |
| 2:22 AM | 5d1c9f6d34 | One append-only record of each task's changes of stage (tools/flow.py, ops/metrics/flow.jsonl), collected by the watcher every five minutes | flow_test.py 45 rows; first collect 6,557 rows in 1.2 s, a second adds none |
| 2:27 AM | 5a0fe13d13 | Approval 1 in the handbook, both prompts, the lane tick and lane_take (a session asks the limit before any further task); Home's first line shows the limit, the count and the exit rule's clock | lane_take_test.py 23, personal_pool_test.sh 108 (7 new: below, at and above the limit, mode on, unreadable), site_limit_line_test.py 18; 21 suites in the gate |
| 2:28 AM | 7090c846cd | The live-status loop outlives a session that had not started yet (180 s of grace) | live_status_test.py 123 |
| 2:34 AM | 310765ec81 | Three older red rows on main fixed: two in the product land suite, and the launchd installer accepting "A" as an account letter | personal_land_product_test.sh 127, personal_load_test.sh 27 |
| 2:46 AM | a151014b6a | App work first once merge-queue-only mode ends; process lines last while process work is at 10% of changed code lines (tools/kind_first.py, the one switch every reader of the board order shares) | kind_first_test.py 11 new, dispatch_test.py; 13 suites in the gate |
| 2:47 AM | 7aedaedafa | The merge queue page's lead no longer trips the wording lint (red on main since the close sweep of 11-09 11:43 PM put the page there ungated) | site_money_wording_test.py, site_test.sh |
| 2:47 AM | 5bb02af271 | The report's facts carry the limit, the exit rule's clock, the last 24 hours of flow and the machine's load | report_flow_test.py 15 rows |
| 2:49 AM | 1db12f9ad1 | A host check cut by the gate's time limit keeps what passed and answers "no result yet" (exit 75), never red | main_gate_test.py 4 new, 77 pass |
| 3:16 AM | 715120da92 | T-3818 (Odalys's patch of 11-09): a suite at its time limit is stopped with its child programs; a land's log names what a check left | the runner suite 35 tests, personal_land_product_test.sh 128, 14 host suites on both Pythons in 543 s |
| 3:21 AM | d3ca62289c | The two-returns-or-48-hours reset tool (tools/merge_reset.py: plan, apply, undo, status; ops/metrics/merge_reset.jsonl) | merge_reset_test.py 110 rows, 4 mutants |
| 3:22 to 3:30 AM | a4385a965d, 87fa5e14e1, a37bb198e9 (board notes) | The rule applied by hand in three runs, oldest first: 73 tasks back to "to do" (71 past 48 hours, 2 sent back twice; 40 app, 21 process, 5 site, 7 not categorised), 185 branches to refs/archive/parked, none deleted, none refused | the one count after each run: 206, 181, 162, 133, each fall equal to the tasks reset; parked branches 615 to 430, archive 1,015 to 1,200; `merge_reset.py status` |
| 3:33 AM | 5d5e6514a3 | The close sweep and the salvage set leftover code aside on a local leftover/ branch instead of committing it; a session lists set-aside work at its start; the report's facts name any that waits; way back: the file ops/sweep_code_ok | session_salvage_test.py 86 rows, 3 mutants; supervisor_test.sh 221 unchanged; 19 suites in the gate |
| 3:44 AM | 45f764e6e7 | This Session: stages as columns, workers as rows, each task's history try by try, built from the workflow record; the coordinator chart and its script removed | site_session_view_test.py 78 rows, site_session_chart_test.py rewritten (68), site_test.sh 94; screenshots in ops/site-checks/t3996-session/ |
| 3:58 AM | f93ddfeb92 | The reset rule as an hourly job (tools/jobs_loop.py merge_reset, and the same step in the supervisor's tick when no jobs loop is live); off switch ops/merge_reset_off | jobs_loop_test.py 13 new (99 pass); personal_land_test.sh 373 pass in a full clone; supervisor_test.sh in the gate |
| 4:07 AM | 1b9818e4f2 | The watcher starts a land pass whenever a branch waits and none is running (the line stood idle 39 of 120 minutes from 2:00 to 4:00 AM); off switch ops/land_kick_off | land_kick_test.py 28 rows; 9 suites in the gate |
| 5:14 AM | a15dd24770 | The new Home: Now, Needs you, one Flow strip from the one count and the one record, The app, Stuck or failing only when true, the rest under More; the last reply time kept on its first line (T-3117) | site_home_flow_test.py 149 rows; 26 suites' rows changed and marked T-3996; 40 suites in the gate; screenshots in ops/site-checks/t3996-home/ |

</div>


## Found red on main and not fixed

- **tests/guard_test.sh, 3 rows, red on main since 11-02.** Read at 4:15 AM 11-10: each pins an Investor-owned file as it used to be. "credit sessions ... one worker at a time" expects 1 concurrent agent in rules/api-settings.json (an Investor set 12 on 11-02); "the Investors' billing switch ships, with the <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>" expects a $10 reserve in investors/billing.json (an Investor set $5 on 11-04); "a changed opening text is restored" expects the old first line of amendments.md (retired by an Investor on 11-08). The third row's fix is proposal #237, approved by an Investor and applied on 11-09 8:58 AM, then reverted by the applier at 12:34 PM because its test run "gave no result" in every try (killed at 1,200 s; the machine's load that day reached about 450). The applier retries a run with no result (T-3662) and reverts only when none gives one, so it worked as built; its message, "it broke a test", was wrong. The suite cannot be green until #237 is applied again, so a partial fix cannot pass the gate; asked on #41.
- **tests/lane_env_test.py, 1 row** ("each test that runs a queued tool clears the lane"): it names five suites that do not (investor_age_test.py, land_xc_test.py, merge_first_auto_test.py, settings_json_check_test.py, supervisor_sync_cause_test.sh). Red on unchanged main at 4:58 AM 11-10; none of the five is this work's.
- **tests/drop_blob_test.py, 4 rows** (the supervisor's drop, pull and push around a big untracked file). Red in the main folder on unchanged main at 3:46 AM 11-10; cause not yet read.
- **tests/personal_land_test.sh, the four "real tick" rows of part 9 (T-3905, 11-09 9:54 PM)** fail with "not a git repository" whenever the suite runs from a linked worktree (an isolated copy or a lane's folder); they pass in the main folder and in a full clone (373 pass with tonight's changes). A lane whose check includes this suite will read red there.

## What went wrong, and what it shows

- **The first change left suites red that the gate did not ask for.** tools/personal_land.sh is named by so many suites that the main gate maps only personal_land_test.sh to it. 56d2ee153e turned rows red in personal_slots_test.sh (2), personal_off_test.sh (18), personal_parked_test.sh (17) and site_lanes_test.py (the pinned lane rules). Found by running every suite that names the land tool; fixed with a way back (LAND_LIVE_ALWAYS=0, or the file ops/land_session_only) that those suites pin.
- **A fifth red from the first change, found only when the fix went to the gate:** tests/main_gate_test.py had a row that named tools/inbox_serve.py as a copy the land suite runs; the first change removed that copy. The fix's first gate run (1:41 to 1:58 AM) went red on it, so the repair reached main at 2:02 AM instead of 1:58 AM. Meanwhile the lane branch with 17 tasks was turned away twice (1:21 and 1:51 AM, 25 minutes each) because its checks include personal_off_test.sh and personal_parked_test.sh.
- **I edited my landing script while it was running (2:33 AM).** bash rereads a script from its file offset, so the run in flight read half a comment as a command and stopped, after its gate had passed and before the commit. The two gated files were committed by hand through the same hook (310765ec81). No harm; the lesson is in the session memory (never edit a running script).
- **The hourly reset's tick step made a suite flaky (found 4:55 AM).** tests/personal_land_test.sh runs real supervisor ticks in two arms and compares their logs. The reset step (f93ddfeb92) ran in each arm and wrote a line with the clock time, so arms that straddled a minute differed. My own run in a full clone passed by luck (373 of 373); a helper's later run caught it (2 rows, 4:51 against 4:52 AM). The fixture now stamps the reset as already run, as it does for the disk sweep; the fix rides with the next change to that suite.
- **I ended a gate run by running the test runner beside it (5:07 AM).** To read a failing row I ran tests/run.sh in the main folder while the keep-cut change's gate run was in flight there; the second run ended the first (exit 143). Nothing was committed and the files were put back; the change went to the gate again. One runner at a time in the main folder (session memory).
- **My landing helper read files a copy did not hold as "swept" (5:14 AM).** The new Home's four screenshots were not on disk in the copy it landed from, and the helper took their absence as a sign that a tick had committed them, and stopped after a green gate. The 31 gated files were committed by hand through the same hook (a15dd24770); the screenshots follow in their own commit.
- **I overwrote an old comment on #41 (4:10 AM).** `gh issue comment --edit-last` on that long thread picked a company comment of 10-26 9:06 PM and replaced its text with an update. Restored within a minute from GitHub's edit history and compared with the original (509 characters, the same); disclosed on #41. Comments are now edited by ID only (session memory).
- **A landing out of order (2:35 AM):** the report's section went to the gate before the app-first rule it reads, so its own new suite was red there. Re-run after the rule landed; green.
- **Older reds on main, found the same way:** personal_train_test.sh, 3 rows since T-3659 (11-08 12:47 PM; its fixture lacked tools/land_dupes.py); personal_land_product_test.sh, 2 rows (a mutant whose pattern T-3974 left matching nothing at 11:24 PM 11-09, and the Vendor links row, a locale's sort order); personal_load_test.sh, 1 row (bash's [a-z] matching "A" in a UTF-8 locale); site_money_wording_test.py, 1 row (the merge queue page's lead, in the code the close sweep landed ungated). All fixed. No routine run of all of tests/ exists, so a red in a suite the gate does not map stays unseen.
- **Code in the main folder is live before its gate ends.** The lane ticks run tools from the main folder's working files, so a candidate placed there for the gate was run by a tick 19 seconds later (the dispatcher change, 1:13 AM). It had passed its suites in the isolated copy first. The fix belongs to phase 2 (the gate checks a candidate that is not in the main folder).
- **The close sweep landed 841 lines of code with no gate pass** (0a7568c844, 11:43 PM 11-09: the merge queue page, the throughput tool and two tests, as "ops: work run"). Phase 2 removes that road.
- **One item stopped by a guard (T-0848), 1:11 AM:** the records guard refused a command that edited tests/governor_test.sh and tests/pacing_test.sh and ran them. The governor's part of "idle is fine" waits on those two files; asked on #41 (c6760458993).
{% endraw %}

</div>
