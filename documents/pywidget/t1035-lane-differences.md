---
layout: "default"
title: "T-1035: every difference between a lane and the main account"
section: "documents"
description: "State: stopped at the coordinator&#x27;s order, 14:55, on branch odalys/t1035-wip. Not ready for review, nothing of T-1035&#x27;s code is on main. The full suite at befa4957 is red in 3 of 249 suites, causes not read\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-lane-differences.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-lane-differences.md</code></span></div><h1>T-1035: every difference between a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> and the main account</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-02. an Investor's amendment of 11:37 and his 11:39 comment on #41: lanes have the main account's access, functionality and settings, and tasks route to each account equally. Default: a difference goes.

**State: stopped at the coordinator's order, 14:55, on branch `odalys/t1035-wip`. Not ready for review, nothing of T-1035's code is on main.** The full suite at befa4957 is red in 3 of 249 suites, causes not read: `memory_archive_undated_test.py`, `personal_lane_test.py` (its `test_no_running_path_names_the_lane`), `site_running_test.py` (its row on the board's open lines). Live paths still match 03e807d6 (T-1034). "Built" below means on the branch. The tick, menu, record and session-end rows were seen red against main's old tools at a10bd3f7. The land suites' T-1035 rows were not, apart from the two overrun rows.

## The table


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The table, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Difference | Where it lived | Verdict | Commit or proposal |
|---|---|---|---|---|
| 1 | Only `pywidget/` paths land | `LANE_LIST`, `check_lane` in `tools/personal_land.sh`; `lane.md` | Gone | Built. Rows in `tests/personal_land_test.sh` |
| 2 | No change to an existing test, fixture, `ios/scripts/` or `project.yml` | `check_tests`, `tools/personal_land.sh`; `lane.md` | Gone. A changed test still runs at landing, and a tool's own suite runs whatever the line named | Built. Rows in `tests/personal_land_product_test.sh` |
| 3 | Uncommitted `ops/` work wiped as noise | `NOISE_PATHS`, `tools/personal_land.sh` | Gone. The list names what a test run rewrites | Built |
| 4 | No board, events or `log/` writes | `lane.md` | Gone. Same commands, queued: `tools/lane_outbox.py`, in `board_tick.py`, `events.py`. Each call is one new file, committed on the branch, landed with the work, replayed on main under the board lock | Built. Rows in `tests/lane_outbox_test.py`, `tests/personal_parked_test.sh` |
| 5 | No worker memory | `lane.md` | Gone. Memory and `log/*` land as files, merged by `.gitattributes` (union) | Built, with a row for the merge. Unmeasured: whether a worker's memory path in a worktree is the worktree's or main's |
| 6 | No MacBook jobs | `lane.md`, `ops/jobs/` | Gone. `jobs.py create` queues, and the job is made on main after landing | Built |
| 7 | Landing needs a moment with no session | `may_land` in `tools/personal_land.sh`; `tools/session_end.py` | Gone. The tick runs `land-live` with a session up: one landing lock, no push, main's new commits rebased on, checks rerun if they touch the branch's files, a busy file is a wait. `session_end.py` ends a session for a branch only past `land_wait_minutes` (120, a choice with no measurement behind it) | Built |
| 8 | One slot takes the whole menu | `POOL * 2` in `tools/personal_tick.sh` | Gone. One batch to a session, and a slot takes its part of the account's share | Built |
| 9 | No equal routing | nothing existed | Gone. Share = (free lines + live claims) / (accounts at work + main). Main's share returns to the sum as lanes finish, so nothing waits on an idle account. `work.md` claims every line first | Built |
| 10 | `board.py lanes` offers some kinds | `lane_fits`, `LANE_KINDS`, `OFF_LANE_PATH` in `tools/board.py` | Gone. Every runnable line with an ID; "waiting on" text keeps a device-only line off every menu | Built. `tests/board_lanes_test.py` rewritten |
| 11 | Fable off | `COMPANY_FABLE_OK=false` in the tick | Gone under the same <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: on while the account is under half its week. Agents only; the session stays on Opus | Built. Unmeasured: whether a personal plan offers Fable |
| 12 | Five local tools missing: `CronCreate`, `CronDelete`, `CronList`, `ReportFindings`, `Workflow` | `ALLOWED_TOOLS`, `rules/personal_lane.py` | Gone by proposal | #135, approved |
| 13 | Skills and slash commands off | `DENIED_TOOLS`, `session_flags`, `rules/personal_lane.py` | **Kept, Commandment 2.** A session's list of skills holds the account's own content, and the start check can't pass a list nobody has seen; the meter run skips that check, so it proves nothing | None |
| 14 | No connectors; `DesignSync`, `PushNotification`, `RemoteTrigger`, Artifact tools off | `DENIED_TOOLS`, `REQUIRED_SETTINGS` | **Kept, Commandment 2.** They reach the account's own data | None |
| 15 | Start check, stream check, keeper, version list, stop on a trip | `rules/personal_lane.py` | **Kept, Commandment 2 and 6.** They enforce the ban and the Investors' switch | None |
| 16 | Three slots an account | `SLOTS` in the tick | **Kept, machine limit** (fork limit reached at pool 4, Pernille's Load). More slots also need more names in the protection lists | None |
| 17 | A protection item, detail held (Commandment 42) | An Investor-owned file | Gone by proposal | #135 |
| 18 | A protection item, detail held (Commandment 42) | An Investor-owned file | Gone by hand | #135 |
| 19 | Allow list ignored: account hasn't trusted the folder | The account's own settings | Goes by hand. 151 warning lines, 2 tool refusals in 42 ended sessions (log lines, both on b). Speed: can't be read from the logs | Same draft, by-hand step 2, optional |
| 20 | Long session in one slot blocks its account | Parent loop in the tick | Gone. An idle slot looks again every 900 s while another runs; requeue and the reading no longer need slot 1 | Built |
| 21 | No work saved during a session | Queue of 2 pools; a limit stop <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> everything | Gone in three parts. Smaller claims: one batch. A commit per task as its tests pass, in the prompt. A stop at the limit lands what is committed, with every check, and only half-work gets a parked name | Built. b3's case (12,978 s, 5 tasks) is the row to read |
| 22 | Blocking batches, no rolling pool | `lane.md`, tick prompt | **Kept.** A background agent can die when a lane session ends, and that lost work: 31 of 56 attempts by Odalys's count. Same agents, same pool, same tasks. The cost is speed: a batch waits for its slowest agent. It goes if a lane can wait the way a main session does. Pernille's M1 named a one-line setting for that; it is in no tool or prompt and not in the optimization log, so by the records it is untried. After T-1035 lands and the T-1029 gate reads clean, Odalys tries it. If the agents survive, this row is struck | None |
| 23 | Inbox and report sessions start on the main account | `tools/supervisor.sh` | **Kept for now; goes in T-1062, an Investor #41 c6585053396** | T-1062 |
| 24 | A lane doesn't push | `lane.md` | **Kept.** A main session's rejected push is left to the supervisor too. A lane's push would come ahead of the landing checks and the landing lock. Its work reaches GitHub on the same trip through land. No function lost | None |
| 25 | Works in a worktree, not the main checkout | `tools/personal_land.sh` | **Kept, machine limit.** Parallel writers need their own trees | None |
| 26 | Review line after landing | `review_line`, `tools/personal_land.sh` | **Kept, Commandment 13,** all accounts alike | None |
| 27 | One Xcode task, disk gate | `tools/xc.sh`, `tools/disk_free.py` | **Kept, machine limits,** all accounts alike. `land-live` waits up to 900 s for the lock | None |
| 28 | Spread or Lock In per account, meter holds | `rules/personal_lane.py` preflight | **Kept:** the Investors' own switch, 2026-10-31 | None |
| 29 | Device-only tasks | Board text | **Kept.** No one's, on any account | None |

</div>


Rows 22 and 24 keep what the brief's list doesn't name; each changes no access and refuses no task. All of 22, 23 and 24 go in the #41 reply, and the Investors may strike any.

## Why the land suite ran past 25 minutes

It took 139 s on clean code at 12:14 and was killed past 25 minutes on the T-1035 code. Measured on a run at a6afd180 with no edits: the suite stopped at the first row that lands with a session running, in one `land-live` process that kept forking.

The cause is one line. macOS's `/bin/bash` is 3.2, and 3.2 ends a `$(...)` at the first `)` of a `case` pattern inside it. So the line that finds the next ready branch ended early, ran the rest as text, and its result was never empty. The pass looped, logging a syntax error and dropping a marker that doesn't exist, until its 3000 s total (`LAND_LIVE_TOTAL_SECONDS`). In 61 s of that run: 1,116 syntax errors, 6,698 log lines. Every live row would do the same, and the suite's limit ends the run first. `bash -n` passes the file: only a run shows it.

It was not the 900 s Xcode wait, the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>'s first suspect: this suite has no Xcode step. The limit did not move. By reading, not measured: had it landed, a `land-live` pass would have spun for 50 minutes after its work finished, holding the landing lock and filling the log.

The fix is a small function, `next_ready`, so no `case` sits inside a substitution. The rows `a branch marked ready during a land goes in on the same pass` and `and the pass names no branch but the real ones` failed before the fix (199 pass, 2 fail) and pass after it. 160 s. The live rows now pass a 120 s total, so a loop like this costs a suite minutes, not its limit. `case` inside `$(...)` appears nowhere else in the tick or land (grep).

## What T-1034 changed in the same files

Commit 03e807d6 is on main. It is in no row above: the cool-down, the board line for a person, and M1 to M5 of [`pywidget/docs/reviews/t1029-pernille.md`](t1029-pernille.html).

## What the rows don't show

- Stand-in rows prove the tick's logic and the words a session is given, nothing about what the CLI does with them. No real session has run this code, and this job started none. The first real sessions after landing are the test.
- Run from a git worktree of the branch, not at main's tip. A suite that reads a file only the company folder has could read differently there, so the combined run at main's tip is the one that counts. It is still owed.
- No row covers: `requeue` under its small lock from any slot, the reading moving to slot 2 while slot 1 is busy, or a marker waiting past 120 minutes in a live supervisor run (`session_end.py` is tested alone).
- Rows that also pass on main's old tools are controls, not proof of a change: `a claim on a finished task doesn't count`, `lines the main account holds count in the sum`, `past half, off`.

## Before the code can land

0. Done 2026-11-02. The 3 reds at befa4957, by cause:
   - `personal_lane_test.py`: this branch's. The outbox's docstring named the tick's file, and the no-starter row allows no new tool to name it. Fixed in de18c8a5 by rewording the comment, not by widening the row's list.
   - `memory_archive_undated_test.py`: not this branch's. Its live-copy row reads a worker's memory file, which was over the archive target. It was red at main too (49 of 50) and went green there once the file was trimmed (50 of 50).
   - `site_running_test.py`: the worktree's, not the code's. Its title row reads `ops/agents.json`, which git ignores, and only the company folder has it. At main in the company folder it passes 34 of 34, and the branch changes neither `tools/site/` nor `tools/live_status.py`.
   With main's `tools/personal_land.sh` in place, the land suites go red where this branch changes landing: `personal_land_test.sh` 159 pass, 44 fail, and `personal_land_product_test.sh` 109 pass, 7 fail (the old "changes what checks it" refusal). With the branch's land: green.
   Full suite at de18c8a5, from the worktree: 247 of 249. The 2 reds are the memory and site rows above.
1. An independent review of the branch's fixed commit (Commandment 13).
2. All the copies go together, and they do: tick, land, `board.py`, `lane.md`, `work.md` and the record tools are one branch. A wider menu ahead of the new landing would queue work that can't land.
3. Every line a main session is running at that moment is claimed first (`python3 tools/personal_claims.py claim T-ID --owner operator`), because the menu then shows those lines to the lanes. A session started before the landing has the old `work.md` in its context, so it needs telling.
4. Main moves by the Investors' A on #113: commits copied one at a time onto main's tip in a separate working copy, suites run there, main moves only after they pass. T-0355's reflog shows its last step was `cherry-pick` commits on main.
5. #135 applies at the next gap between sessions. It needs nothing from this branch, and this branch needs nothing from it to land: without it a lane runs with the old tool list.

The `lanes ok` fields still on the board are harmless: the field is no longer read.
{% endraw %}

</div>
