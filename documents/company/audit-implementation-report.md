---
layout: "default"
title: "Audit implementation: where it stands"
section: "documents"
description: "The company now stops starting work it cannot merge, merges without waiting for a session or a message, clears work that cannot merge instead of retrying it without end, and shows one true count on Home, This Session\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/audit-implementation-report.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/audit-implementation-report.md</code></span></div><h1>Audit implementation: where it stands</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written 5:42 AM ET on 2026-11-10 by the Fable session, for the Investors. It answers the ten points the mandate of 2026-11-10 asked for, and its closing question. The work is not finished: phases 2 and 3 have parts not started, and they are listed under point 10. The running log, with every commit and its test, is [`ops/plans/audit-implementation.md`](audit-implementation.html).

## The short answer

The company now stops starting work it cannot merge, merges without waiting for a session or a message, clears work that cannot merge instead of retrying it without end, and shows one true count on Home, This Session and the report. The count of tasks waiting to merge went from 215 to 96 in five hours.

The merge step itself is not faster yet. Tasks merge at about 4 an hour, the same as before. Most of the fall in the count came from the reset rule (112 tasks sent back to "to do"), not from more merging. Making each merge try cheaper and more likely to land is the main work left.

## 1. What changed

28 changes reached main through the merge gate between 12:51 AM and 5:21 AM.

- **One limit.** One count of unique tasks waiting to merge, taken every 10 minutes and kept as a record. No new work starts at 12 or more. The dispatcher, the main session's pool, the personal accounts, the handbook and both worker prompts read that one limit.
- **Idle is fine.** "Never idle", "use the whole allowance" and "every worker always has a task" are gone from the handbook and the prompts. The pace and the allowance are ceilings.
- **Merges without a session.** A merge no longer waits for an Investor message to be answered, and no longer needs a session to be running. The always-running watcher starts a merge pass whenever a branch waits and none is running.
- **The reset rule.** Work that has waited 48 hours, or was sent back twice, goes back to "to do" and its branches move to an archive. It runs hourly. Nothing is deleted and each reset can be undone.
- **No untested code through the cleanup.** The end-of-session cleanup commits records only. Code a session leaves unfinished is saved on a separate branch and listed at the start of the next session.
- **Less wasted checking.** A test run stopped at its time limit keeps what had already passed, in the merge gate and in the merge step. A test that runs out of time now stops the programs it started.
- **One record, two pages.** One append-only record of each task's changes of stage. Home and This Session are both drawn from it and from the one count. Machine load is recorded every minute.
- **App work first, when the queue is short.** When merge-queue-only mode ends by its own rule (under 20 for 24 hours), app work goes first and process work goes last while it is 10% or more of changed code lines.

## 2. Phases and their tests


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Phases and their tests, scrolls sideways" style="--tw:895px" markdown="1">

| Phase | State | Proof |
|---|---|---|
| 0. Stabilize | Done, with three test files left red (point 10) | T-3972 and T-3818 on main and ticked; rows fixed in 10 test files: 5 that this session's first change broke, 5 that were red before it |
| 1. One limit | Done except one file | Tests below, at and above the limit, with the count unreadable, with duplicate branches and with the mode on (`merge_limit_test.py` 55 rows, `personal_pool_test.sh` 108, `lane_take_test.py` 23). The scheduler's own part was cleared by an Investor at 4:40 AM and is in testing (point 10) |
| 2. Quiet main, one road | Part done | The cleanup's code road is closed (`session_salvage_test.py` 86 rows, 3 mutants). Three parts not started |
| 3. One merge line | Part done | No message hold, no session needed, the reset rule, the self-starting line, cut checks keeping passes (`personal_land_test.sh` 381 rows, `merge_reset_test.py` 110, `land_kick_test.py` 28). Three parts not started |
| 4. One record, Home, This Session | Done, with gaps in the record | `flow_test.py` 45 rows, `site_home_flow_test.py` 151, `site_session_view_test.py` 78, `machine_load_test.py` 60 |
| 5. Return to app work | Built, not yet in effect | The exit rule and the app-first order are on main (`kind_first_test.py` 24). The mode is still on: 96 is not under 20 |

</div>


## 3. Workers and processes

Nothing was stopped, killed or reassigned. At the start no main session and no personal-account session was running; the launchd jobs (the watcher, the two account timers, the supervisor) were left as they were. An interactive session open for 2.6 days was left alone.

This session used ten helper agents, each in its own isolated copy of the repository, never in the main folder. Their patches were reviewed and landed by this session through the gate.

## 4. Patches reused

- **T-3818** (Odalys, Nov 9): applied as written and landed. It had failed to land twice for reasons that were not its own.
- **T-3972**: built fresh to the board line's description.
- **T-3885, T-3966, T-3974, T-3975 item 1** (already on main): kept and built on. The dispatcher's merge-first hand-outs are theirs.
- Saved patches for T-3907, T-3962, T-3967, T-3971, T-3976, T-3978 and T-3980 were not applied: dropped, deferred or folded into the one limit, as the mandate decided.

## 5. Mechanisms removed

- The 30-minute hold on merging after an Investor message, and the rule that a merge needs a session.
- Three separate readings of the queue and nine helper functions that fed them (dispatcher and pool).
- The never-idle, fill-the-pool and use-the-whole-allowance instructions.
- The end-of-session cleanup as a way for code to reach main.
- The gate's habit of recording a timed-out test run as a failure.
- This Session's "coming soon" chart and its script. From Home: the two explainer lists, "Exact figures", the Simulators panel, the session facts, the In flight cards and the Latest report card.
- Twelve board lines closed as dropped, deferred or duplicate.

Not yet removed, though now unused: the old inbox-hold tool and the Home code for the removed panels.

## 6. The merge queue now


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 6. The merge queue now, scrolls sideways" style="--tw:923px" markdown="1">

| Measure | Before (Nov 9 or 12:15 AM) | Now (5:21 AM) |
|---|---|---|
| Unique tasks waiting to merge | 215 | 96 (5:41 AM) |
| <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span> branches | 615 (3:21 AM, before the first reset run) | 332 (5:41 AM) |
| Tasks reset to "to do" by the rule | 0 | 112 (290 branches archived, none deleted) |
| Tasks waiting over 48 hours | 136 | 31, each sharing a branch with a newer task or with a task whose board line is not open |
| Merge tries that landed | 57 of 188 on Nov 9 (30%) | 11 of 34 since 12:51 AM (32%) |
| Merge time spent on tries that landed | 24% on Nov 9 | 41% from 12:51 PM to 4:07 AM; 16% since (a small sample: 14 tries) |
| Tasks merged per hour | 3.5 on Nov 9 | 4.0 over the last 5 hours |
| New work | Held by merge-queue-only mode since 9:10 PM Nov 9, by three rules that counted differently | Held by the one limit: 96 is over 12; it stays in force after the mode ends |

</div>


The count is taken from one source, `ops/metrics/waiting.jsonl`, 25 readings so far.

## 7. The merge line

It runs by itself: 11 branches (21 tasks) merged since 12:51 AM with no session running. Passes now follow each other within seconds instead of waiting for a 15-minute timer. Each branch's checks took 13 to 25 minutes while this session's own test runs loaded the machine, and 8 to 9 minutes once they stopped.

It is still one branch at a time, with a full set of checks per branch, and a branch that carries several tasks still lands all or nothing.

## 8. Home and This Session

Both are on main and appear at the next site build. Pictures of each, at phone and desktop width, light and dark, are in `ops/site-checks/t3996-home/` and `ops/site-checks/t3996-session/`.

What they cannot show yet, and say so: the moment a task is handed to a worker, how long a test run took, a merge the main session makes itself, which build is installed on the Investors' iPhones, and what the next build waits on.

## 9. The three approvals

1. **"Idle is fine when merging is the limit."** In force in the handbook, the prompts, the dispatcher, the pool and the personal accounts. The main session's scheduler file is the last place; its change is written, its tests pass, and it is in a wider test run before the gate (point 10).
2. **Merge-queue-only mode ends under 20 for 24 hours.** In force. Unique task IDs, one source, a continuous record; a gap or an unreadable count resets the clock. The clock is not running: the count is 96. When it ends, app work goes first with process work at about 10%. Visible on Home and in the report.
3. **An Investor message never holds a merge.** In force since 12:51 AM, with tests. The safety checks and the protected-file rules are unchanged.

## 10. What is left, and what blocks it

**Asked of an Investor, and answered at 4:40 AM by an Investor:**
- **The scheduler's part of approval 1.** A safety check refused a command of mine at 1:11 AM, and the company's rule is that the item then stops. "go ahead with the scheduler tests" cleared it. The two test files are updated and pass (220 and 45 rows). While testing I found and fixed a fault in my own change: with the limit closed and nothing for a worker to do, a waiting Investor message would have opened no session. It now always gets its short reply session. The change goes to the gate after a run of every test file that names the scheduler.
- **Proposal #237.** Approved again at 4:41 AM and applied again by the company's own tool at 5:34 AM. One guard test row depends on it.

**Not started:**
- The gate checking a change outside the main folder, so a change is not live before it passes.
- The main session's own code going through branches and the same merge step.
- Record commits out of code history.
- One task per branch.
- A "sent back" state that returns a failed change to its author, and the end of the other retry routes.
- The app's own test suites keeping partial results when cut.
- Recording hand-outs, test-run lengths and main-session merges in the workflow record.
- Closing the experiments this work replaces; removing the unused code named in point 5.

**Found red on main and not fixed:** the guard tests (two rows expect Investor settings as they used to be; a third depended on #237, now applied again), the blob-drop tests (4 rows, not yet read), and one row that checks five other test files. The merge tool's own tests fail on four rows when run from a personal account's folder.

## This session's own mistakes

Each was corrected and is described in [`ops/plans/audit-implementation.md`](audit-implementation.html).

- My first change left five test files red that the gate had not asked for. A 17-task branch was turned away twice before the repair.
- My hourly reset step made one test file fail when two of its runs straddled a minute.
- I edited a script while it was running, and I ran the test runner beside a gate run. Each stopped a landing; nothing wrong was committed.
- I overwrote an old comment on #41 with an edit command and restored it from GitHub's history within a minute.
- I wrote clock times a few minutes ahead of the real time four times, and corrected them.

## The closing question

*Is this engineering system now better at turning the work it produces into verified, useful software than it was before the audit, and what concrete evidence proves that it is?*

**Better at not making the problem worse: yes, and proven.** One limit now holds new work wherever a session could start it, and it stays after merge-queue-only mode ends. Before, the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> was a temporary mode read through three rules that counted the queue differently, and on Nov 9 the personal accounts ran 35 sessions into a queue of about 200.

**Better at merging unattended: yes, and proven.** 21 tasks merged with no session running. Before, nothing merged between sessions, and a message from an Investor stopped merging for up to 30 minutes.

**Better at telling the truth: yes, and proven.** Eight test files were red on main without anyone knowing; five are fixed and three are listed. (Five more went red from my own first change and were repaired within 70 minutes.) Home showed three queue numbers that disagreed; it shows one. This Session showed nothing; it shows every task's path.

**Better at merging faster: not yet proven.** About 4 tasks an hour merge now, against 3.5 on Nov 9. A third of merge tries land, as before. The count fell from 215 to 96 mostly because 112 tasks that could not merge were cleared, which is honest progress but is not throughput.

**Better at shipping the app: not yet.** That starts when the count has stayed under 20 for 24 hours. At tonight's rate, with the reset rule clearing what cannot merge, that is days away, not hours. The measures to watch are in `log/optimizations.md`, entry OPT-128, read on Nov 13 and Nov 17.
{% endraw %}

</div>
