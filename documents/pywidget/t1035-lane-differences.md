---
layout: "default"
title: "T-1035: every difference between a lane and the main account"
section: "documents"
description: "State: stopped on a guard refusal, nothing of T-1035&#x27;s code is on main. Live paths match 03e807d6 (T-1034): tick, land, board.py, lane.md. The refused step was mine: rows in a Bash heredoc, against Ines&#x27;s R2. &quot;Built&quot;\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-lane-differences.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-lane-differences.md</code></span></div><h1>T-1035: every difference between a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> and the main account</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-02. an Investor's amendment of 11:37 and his 11:39 comment on #41: lanes have the main account's access, functionality and settings, and tasks route to each account equally. Default: a difference goes.

**State: stopped on a guard refusal, nothing of T-1035's code is on main.** Live paths match 03e807d6 (T-1034): tick, land, `board.py`, `lane.md`. The refused step was mine: rows in a Bash heredoc, against Ines's R2. "Built" below means written and uncommitted, in the copies named at the end. Only the land suite was started on it, and it was killed at its 25-minute limit with no result, so none of it is tested. I did not restart it. No row of the tick's new behaviour has been seen red or green.

## The table


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The table, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Difference | Where it lived | Verdict | Commit or proposal |
|---|---|---|---|---|
| 1 | Only `pywidget/` paths land | `LANE_LIST`, `check_lane` in `tools/personal_land.sh`; `lane.md` | Gone | Built. Rows in `tests/personal_land_test.sh`, on disk |
| 2 | No change to an existing test, fixture, `ios/scripts/` or `project.yml` | `check_tests`, `tools/personal_land.sh`; `lane.md` | Gone. A changed test still runs at landing, and a tool's own suite runs whatever the line named | Built. Rows in `tests/personal_land_product_test.sh`, on disk |
| 3 | Uncommitted `ops/` work wiped as noise | `NOISE_PATHS`, `tools/personal_land.sh` | Gone. The list names what a test run rewrites | Built |
| 4 | No board, events or `log/` writes | `lane.md` | Gone. Same commands, queued: `tools/lane_outbox.py`, in `board_tick.py`, `events.py`. Each call is one new file, committed on the branch, landed with the work, replayed on main under the board lock | Built |
| 5 | No worker memory | `lane.md` | Gone. Memory and `log/*` land as files, merged by `.gitattributes` (union) | Built. Unmeasured: whether a worker's memory path in a worktree is the worktree's or main's |
| 6 | No MacBook jobs | `lane.md`, `ops/jobs/` | Gone. `jobs.py create` queues, and the job is made on main after landing | Built |
| 7 | Landing needs a moment with no session | `may_land` in `tools/personal_land.sh`; `tools/session_end.py` | Gone. The tick runs `land-live` with a session up: one landing lock, no push, main's new commits rebased on, checks rerun if they touch the branch's files, a busy file is a wait | Built. `session_end.py` backstop **not written** |
| 8 | One slot takes the whole menu | `POOL * 2` in `tools/personal_tick.sh` | Gone. One batch to a session, and a slot takes its part of the account's share | Built |
| 9 | No equal routing | nothing existed | Gone. Share = (free lines + live claims) / (accounts at work + main). Main's share returns to the sum as lanes finish, so nothing waits on an idle account | Built. `work.md` claim text **not written** |
| 10 | `board.py lanes` offers some kinds | `lane_fits`, `LANE_KINDS`, `OFF_LANE_PATH` in `tools/board.py` | Gone. Every runnable line with an ID; "waiting on" text keeps a device-only line off every menu | Built in `tools/.board.new`. `tests/board_lanes_test.py` **not rewritten** |
| 11 | Fable off | `COMPANY_FABLE_OK=false` in the tick | Gone under the same <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: on while the account is under half its week. Agents only; the session stays on Opus | Built. Unmeasured: whether a personal plan offers Fable |
| 12 | Five local tools missing: `CronCreate`, `CronDelete`, `CronList`, `ReportFindings`, `Workflow` | `ALLOWED_TOOLS`, `rules/personal_lane.py` | Gone by proposal | Draft, `ops/requests/T1035-LANE-ACCESS-issue.md` |
| 13 | Skills and slash commands off | `DENIED_TOOLS`, `session_flags`, `rules/personal_lane.py` | **Kept, Commandment 2.** A session's list of skills <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the account's own content, and the start check can't pass a list nobody has seen; the meter run skips that check, so it proves nothing | None |
| 14 | No connectors; `DesignSync`, `PushNotification`, `RemoteTrigger`, Artifact tools off | `DENIED_TOOLS`, `REQUIRED_SETTINGS` | **Kept, Commandment 2.** They reach the account's own data | None |
| 15 | Start check, stream check, keeper, version list, stop on a trip | `rules/personal_lane.py` | **Kept, Commandment 2 and 6.** They enforce the ban and the Investors' switch | None |
| 16 | Three slots an account | `SLOTS` in the tick | **Kept, machine limit** (fork limit reached at pool 4, Pernille's Load). More slots also need more names in the protection lists | None |
| 17 | A protection item, detail held (Commandment 42) | An Investor-owned file | Gone by proposal | #135 |
| 18 | A protection item, detail held (Commandment 42) | An Investor-owned file | Gone by hand | #135 |
| 19 | Allow list ignored: account hasn't trusted the folder | The account's own settings | Goes by hand. 151 warning lines, 2 tool refusals in 42 ended sessions (log lines, both on b). Speed: can't be read from the logs | Same draft, by-hand step 2, optional |
| 20 | Long session in one slot blocks its account | Parent loop in the tick | Gone. An idle slot looks again every 900 s while another runs; requeue and the reading no longer need slot 1 | Built |
| 21 | No work saved during a session | Queue of 2 pools; a limit stop <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> everything | Gone in three parts. Smaller claims: one batch. A commit per task as its tests pass, in the prompt. A stop at the limit lands what is committed, with every check, and only half-work gets a parked name | Built. b3's case (12,978 s, 5 tasks) is the row to read |
| 22 | Blocking batches, no rolling pool | `lane.md`, tick prompt | **Kept, Ines's T-1029 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> binds.** Not one of the reasons on the brief's list; it reopens only if the 10-session gate fails | None |
| 23 | Inbox and report sessions start on the main account | `tools/supervisor.sh` | **Kept, for Ines to rule.** They are supervisor runs, not board tasks, so routing doesn't reach them. Not on the brief's list | None |
| 24 | A lane doesn't push | `lane.md` | **Kept, no function lost.** Land or the next sync pushes. Not on the brief's list | None |
| 25 | Works in a worktree, not the main checkout | `tools/personal_land.sh` | **Kept, machine limit.** Parallel writers need their own trees | None |
| 26 | Review line after landing | `review_line`, `tools/personal_land.sh` | **Kept, Commandment 13,** all accounts alike | None |
| 27 | One Xcode task, disk gate | `tools/xc.sh`, `tools/disk_free.py` | **Kept, machine limits,** all accounts alike. `land-live` waits up to 900 s for the lock | None |
| 28 | Spread or Lock In per account, meter holds | `rules/personal_lane.py` preflight | **Kept:** the Investors' own switch, 2026-10-31 | None |
| 29 | Device-only tasks | Board text | **Kept.** No one's, on any account | None |

</div>


Three rows carry a reason the brief didn't list: 22, 23, 24. Each is stated, and the chair may strike it.

## What T-1034 changed in the same files

Commit 03e807d6 is on main. It is in no row above: the cool-down, the board line for a person, and M1 to M5 of [`pywidget/docs/reviews/t1029-pernille.md`](t1029-pernille.html).

## Before the code can land

1. A chair's ruling on the refusal. Text: `/private/tmp/company-scratch/T-1035-odalys/refusal-1.txt`.
2. Rows for the tick's new behaviour, seen red: pool, parked and slots suites, and a test of `tools/lane_outbox.py` and the queued commands.
3. The three "not written" items above, plus `tests/run.sh` unsetting `COMPANY_LANE`.
4. `personal_off_test.sh` and `personal_evidence_test.sh` read against the wider menu.
5. All copies swap together: a wider menu ahead of the new landing queues work that can't land. When they do, every line a main session is running must be claimed first, because the menu then shows those lines to the lanes.

Uncommitted: `tools/lane_outbox.py`, `tools/board_tick.py`, `tools/events.py`, `tools/jobs.py`, `.gitattributes`, four test suites with `# TEMP` lines to cut, and the copies `tools/.personal_tick.new`, `tools/.personal_land.new`, `tools/.board.new`, `ops/prompts/.lane.new`. `board_tick.py`, `events.py` and `jobs.py` behave as before unless `COMPANY_LANE` is set, and nothing sets it yet.
{% endraw %}

</div>
