---
layout: "default"
title: "System audit, November 2026: why finished work merges slower than it is made"
section: "documents"
description: "What I would fundamentally change. The company runs as a push system that rewards activity: sessions started, allowance used, tasks ticked, tools built. I would run it as a pull system built around its one scarce step\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/system-audit-2026-11.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/system-audit-2026-11.md</code></span></div><h1>System audit, November 2026: why finished work merges slower than it is made</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent audit by Claude Fable 5.2, asked for by an Investor (#41 c6758883292; prompt in [`ops/plans/fable-audit-prompt.md`](fable-audit-prompt.html)). Run read-only on the Mac mini from 11:27 PM ET on Monday 2026-11-09 (Day 19); records read up to about 11:48 PM ET. Nothing was changed. This file is the only thing written.

**Evidence labels.** *Observed*: read in code, records or git. *Concluded*: follows from observed facts. *Hypothesis*: plausible, not yet tested. *Judgment*: my call.

**Words used.** *Main*: the main copy of the code. *Land*: merge a change onto main. *<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>*: a personal-account session slot working in its own copy. *<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span>*: a branch set aside after a failed land. *Mac tests*: the Python "host" checks. *iPhone tests*: the Xcode build-and-test step ("xc"), on the MacBook or the Mac mini. *Records*: the board, logs, memory notes and queue lists.

---

## 1. Diagnosis

The merge queue is a symptom. Four causes sit behind it, and they feed each other.

1. **Work is pushed in, not pulled.** The standing rules say never be idle and use the whole weekly allowance. Until about 7 PM on 11-09 no rule looked at the size of the backlog before starting work; the only brake was accidental (a lane slot cannot start while its own last branch has not landed). Two earlier proposals to <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> unfinished work were rejected on a simulator that could not reproduce the backlog it was judging.
2. **Main is one crowded place.** Product code, the tools that do the merging, and the company's records all share one history. It moved 508 times on 11-09, about every 3 minutes, and 8 in 10 of those moves were record-keeping. Each move can cancel test results that waiting work has earned, force a rebase, or conflict.
3. **The merge step spends four fifths of its time on tries that do not merge, and failed work goes to a parking lot, not back to its author.** Over four days, 80% of the merge step's time went to tries that did not land. Four separate retry routes, and an hourly tool that copies parked branches without removing the originals, turned about 180 stuck tasks into 600 to 1,400 saved branches.
4. **The company's main product has become its own machinery.** From 11-06 to 11-09, 62 of 1,993 changes on main touched the app. Each process problem is answered with a new tool, list or state. Those become the busiest files on main and add their own slow tests. On the night of 11-09 about twenty merge fixes were in flight at once in one shared folder, and they blocked each other.

For the app itself, the pacing step is the iPhone tests. That step is small and fragile (one MacBook, offline for 24 hours until 7:31 PM on 11-09, and one slot on the Mac mini), and it sat idle most of the time work was waiting for it.

**What should change:** start work only when it can merge; make main quiet, with one way in; replace the parking lot with one always-running merge train that sends failures back to their author; and put the app first again with the pipeline frozen. Section 10 gives the order and how each step is proved or disproved.

---

## 2. The system as it actually runs

### Map (Observed)

```
Investor messages (45 to 106 a day, most on #41)
      |  tools/inbox.py: one reply each, often new board lines
      v
ops/board.md   798 open lines, 754 KB. Any worker adds lines; no cap.
      |        Machines add lines too (retry and redo lines).
      |  tools/dispatch.py: seven ordering layers, 4 tasks per hand-out
      +-------------------------------+
      v                               v
Main session                     Lanes: 2 accounts x 3 slots, each in its own copy
Operator + 2 to 7 agents         one branch per session; finished tasks lifted
all in ~/itsthecompany           onto spare branches (personal/a38 ...)
      |                               |  "ready" marker
      | direct commit                 v
      | (pre-commit gate,        Land pass (tools/personal_land.sh), one at a time.
      |  tools/main_gate.py;     Started only by a lane's 5-minute tick, or between sessions.
      |  Operator exempt)        rebase -> Mac tests -> iPhone tests -> merge
      |                               |  red, conflict, or out of time
      v                               v
     main  <---- fast-forward ---  parked/<slot>/... branch + retry line
      |                            + hourly per-task copies + four retry routes
      v
push to GitHub (held while an unpushed commit touches an Investor-owned file)
      -> site rebuilt between sessions
```

### The life of a task, as the records show it


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The life of a task, as the records show it, scrolls sideways" style="--tw:739px" markdown="1">

| State | Stored in | Moves on by |
|---|---|---|
| To do | `ops/board.md` line | automatic hand-out (`dispatch.py`) |
| Handed out | `ops/runs/dispatch.log`, a claim file under `.git/personal-claims/` | automatic |
| Being built | a lane session (up to 8 agents) or a main-session agent | agent |
| Ready to land | marker in `.git/personal-ready/` | automatic, at the next land pass |
| Land attempt | `ops/runs/land_steps.jsonl` | automatic |
| Landed | main; board line ticked by the task ID in the commit subject | automatic |
| Waits | stays ready; tried at a later pass | automatic |
| Held, then parked | `refs/heads/parked/...`, a line in `ops/personal_retry.txt` | automatic hourly retry, or hand work |
| Redo | a new board line ("Retry finished work", or a P0 "do the work again") | agent |

</div>


**Where work waits.**
- Ready branches wait for a land pass: on 11-09 the lane logs hold 403 "out of time, waits for the next tick" lines and 341 "another land is running" lines.
- The iPhone test queue: median wait 42 minutes on 11-09 (`ops/metrics/land_xc.jsonl`, n=11).
- Parked: 102 tasks in the land record never landed, median 43 hours after their first try.
- The shared folder's commit gate: a pass is thrown away when another worker has uncommitted edits ("passed, not recorded").
- The Investor-message hold (below), the disk gate and the Company SSD hanging (144 waits on 11-09).

**Where information is lost.**
- A parked branch does not show on its board line, and does not block a new claim: "an open line with an old parked attempt was 185 of 492 open lines on 11-08" (`tools/personal_claims.py:44-45`). Work is done twice: of 1,437 parked branches on the morning of 11-09, 694 held work that had since reached main another way (T-3827 note, `ops/board.md:119`).
- The reason a land failed does not travel to the worker who redoes it.
- "Passed, not recorded" gate results, worker refusals, and machine load over time are not stored.
- The hand-out log does not say whether a session started (section 3).

**Tightly coupled parts.**
- The land tool tests itself: `tools/personal_land.sh` (2,930 lines) changed in 69 commits in 9 days, and its own test took 5.9 hours of check time on 11-09 (T-3905 note).
- The app's Mac tests read all of `tools/`, so any tool change cancels every app branch's kept test pass (`tools/check_cache.py:17-22`).
- Every Mac-mini Xcode build, by a session or by the land, shares one lock (`tools/xc.sh:59-66`).

### Planned against actual (Observed)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Planned against actual (Observed), scrolls sideways" style="--tw:640px" markdown="1">

| Planned or documented | What the code and records show |
|---|---|
| "Finished work reaches main within minutes" ([`ops/plans/merge-flow.md`](merge-flow.html)) | Median 9.9 hours from first hand-out to landed; slowest tenth over 41.8 hours |
| A cap on unfinished work (merge-flow step 5) | Closed as "not built" (T-3086, T-3420) |
| "The pool is sized to what merges can absorb" (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, 11-06 11:24 PM) | Coded 11-09 6:53 PM, for the main session's agents only; overridden the same night |
| "One task per land" (land tool header) | Trains of 8 and 20, batches, stacks, spares |
| "A retry runs only what changed" (kept passes) | 10 reuses recorded in four days (`ops/runs/check_reuse.jsonl`) against 231 Mac-test runs inside lands |
| "Every source works in its own copy" ([`ops/plans/one-dispatcher.md`](one-dispatcher.html)) | The main session shares one folder; the fix (T-2719) has sat parked since 11-07 |
| `tools/pool_adapt.py` says its limits are "wired" into the dispatcher | `agent_limits`, `new_left`, `merge_sessions`, `reserve_account` have no caller |
| The "Now" part of Home updates within seconds | The feeding loop was not running at 11:41 PM; `ops/live.json` was 4 minutes old |
| This Session shows a live chart | The chart has never been switched on (section 8) |

</div>


---

## 3. Measurements and bottleneck analysis

All figures are Observed unless marked. Scripts were run once each, at low priority.

### What reaches main

Source: `git log main --first-parent --numstat`, classed by path (`pywidget/` outside its docs is "app").


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: What reaches main, scrolls sideways" data-n="2 3 4 5" style="--tw:348px" markdown="1">

| Day | Commits on main | Touch the app | Tools or site | Records only |
|---|---|---|---|---|
| 11-04 | 663 | 71 | 83 | 433 |
| 11-05 | 648 | 68 | 98 | 414 |
| 11-06 | 500 | 17 | 86 | 381 |
| 11-07 | 490 | 14 | 72 | 386 |
| 11-08 | 483 | 18 | 83 | 353 |
| 11-09 | 520 | 13 | 67 | 419 |

</div>


- 11-06 to 11-09: 1,993 commits. App 62 (3%), tools and site 308, records only 1,539 (77%), other 84.
- Leaving records out, the app is 14% of commits and 12% of changed code lines (11,235 app lines against 81,700 in tools and site). From 11-03 to 11-05 the app's share of changed code lines was 38%.
- The earlier, higher app numbers were mostly unverified: the gate's own audit on 11-07 found 4 of 149 product commits since 11-04 had an iPhone test pass (`ops/metrics/main_gate.jsonl`, the `audit` row). So about 15 verified app commits a day is the first honest reading of this system's app output.
- *Concluded:* the fall began on 11-06, the day lands began to require Mac and iPhone tests for app changes (`tools/suite_floor.py`, first commit 1:07 PM) and the day of the ruling "prioritize efficiency work ... schedule app work as needed" (11:24 PM). I did not separate the two causes.

### How main moves

Source: main's reflog. 11-09: 508 moves. 56 were lands; about 440 were direct commits (145 memory notes, about 134 record updates, 161 others).

Files committed most often since 11-06: `ops/board.md` 375, one worker's `MEMORY.md` 234 and its archive 150, `ops/personal_retry.txt` 99, `log/events.jsonl` 94, `ops/merge_queue_queued.txt` 88, `ops/merge_first.txt` 80.

Why it matters:
- A kept suite pass is keyed on the whole tree, so any commit on main cancels it (`tools/check_cache.py:23-25`).
- A kept Mac-test pass is keyed on `pywidget/` plus all of `tools/` (`:17-22`), and `tools/` takes 57 to 75 commits a day.
- 435 of 596 parked branches carry edits to record files, and 117 carry `ops/board.md`.

### The land step

Source: `ops/runs/land_steps.jsonl`, 717 attempts, 11-06 3:55 AM to 11-09 11:27 PM.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: The land step, scrolls sideways" data-n="2" style="--tw:653px" markdown="1">

| Day | Attempts | Landed | Time on tries that landed | Time on tries that did not |
|---|---|---|---|---|
| 11-06 | 171 | 66 (39%) | 2.2 h | 10.3 h |
| 11-07 | 133 | 56 (42%) | 0.7 h | 4.0 h |
| 11-08 | 227 | 88 (39%) | 2.1 h | 7.3 h |
| 11-09 | 186 | 56 (30%) | 3.1 h | 11.4 h |

</div>


Where the 33 hours on tries that did not land went, by how the try ended:


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: The land step, scrolls sideways" data-n="2" style="--tw:699px" markdown="1">

| Ended as | Hours | Note |
|---|---|---|
| Mac tests red | 11.3 | includes time-outs read as red |
| Waiting for the iPhone step after Mac tests passed | 10.4 | part is kept as a proof if main did not touch the branch's files |
| Mac tests cut short (time limit, main moved, session ended) | 6.2 | |
| iPhone tests red | 2.8 | |
| Waiting at the final merge | 2.1 | |
| Rebase conflict | 0.1 | 195 tries, seconds each |

</div>


Other readings:
- Per landed task: 64% landed on the first try; mean 1.9 tries; worst case 20.
- A Mac-test run inside a land: median 402 s, slowest tenth over 1,212 s. A lane land runs every Mac suite on two Python versions for any app change (`tools/personal_land.sh:1177-1183`, `:1329`). The main session's gate picks suites by what the change reaches.
- An Investor message under 30 minutes old makes every land pass do nothing (`tools/personal_land.sh:2812-2813`). On 11-09 the logs show passes turned away for this in 42 separate minutes, 30 of them after 7:00 PM, the hours the Investors were writing about the merge queue.
- Between sessions the supervisor cuts its land at 300 s (`tools/supervisor.sh:474`), shorter than one Mac-test run.
- One incident: on 11-08, 138 land tries were refused for "touches Investor-owned paths". 103 parked branches still carry those four files, all cut from main on the evening of 11-07.

### The iPhone test step

Source: `ops/metrics/land_xc.jsonl`, `ops/metrics/runner_health.jsonl`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: The iPhone test step, scrolls sideways" style="--tw:708px" markdown="1">

| Day | MacBook results: passed / failed / error | Runner idle while lanes waited (of minutes observed) |
|---|---|---|
| 11-06 | 1 / 15 / 0 | not recorded |
| 11-07 | 8 / 8 / 2 | 749 of 850 |
| 11-08 | 34 / 2 / 0 | 256 of 307 |
| 11-09 | 5 / 3 / 3 | 127 of 183 |

</div>


- A job runs 329 s at the median. The step is not short of compute; it is starved and fragile.
- During the outage (7:36 PM 11-08 to 7:31 PM 11-09) app work landed "one per account-hour: 6 xc lands" in about 18 hours, while 229 of 513 waiting parked branches needed this step (T-3862 note, `ops/board.md:416`).
- 100 of 142 pushes of main to GitHub failed on 11-09, 89 because an unpushed commit touched an Investor-owned file (`ops/runs/land_push.jsonl`). *Hypothesis:* this also delays MacBook jobs, which need pushed code. Not tested.

### Arrival, and a correction

- The figure "about 11 sessions an hour" (T-3963) counts `start` lines in `ops/runs/dispatch.log`. Those are offers, not sessions. The lane logs show 35 real lane sessions ending on 11-09 (33 on 11-08), median 54 minutes. Example: lane slot b2 was "started" at 12:19 PM, 12:24 PM, 12:30 PM and 12:34 AM on 11-09 while its log reads "its branch waits to land: no spare is free".
- On 11-09, 117 different tasks were offered 921 times. Since 11-05, 490 tasks were offered 2,570 times; 220 of them (45%) have landed.
- So "2.5 to 8.5 pieces an hour arrived" should be read this way: about 55 new change sets a day arrive (2.3 an hour), and the rest of the 8.5 is the same work coming round again after a failed land.
- Task creation: the highest task number rose by 220 to 650 a day from 11-03 to 11-09; 115 lines were ticked done on 11-09 and 139 on 11-08. Open lines by kind: tools 377, build 184, site 67, ops 40. Among them are 58 automatic "Retry finished work" lines and 21 "do the work again" lines.
- Investor messages: 95 on 11-09 (45 to 106 a day since 11-01), and 21 recorded rulings on 11-09 alone (`ops/inbox/messages.jsonl`, `log/rulings.md`). 256 open board lines cite an Investor comment.

### Queue size

- 596 branches under `parked/` at 11:35 PM: 286 touch the app, 214 tools or site, 56 records only. The median parked branch is 1,122 commits behind main.
- `ops/metrics/merge_queue.jsonl` entries: 267 (11-05) to 862 (11-06) to 1,543 (11-07) to 1,856 (11-09 6:21 AM), then 760 after 924 settled branches were archived.
- The hourly queue tool cuts one new branch per task from each parked branch and never deletes the original (no delete in `tools/merge_queue.py`). 219 of the 596 are such copies.

### Bottleneck analysis (Concluded)

- **Which stage has the most demand against capacity?** The land step, but because of its yield, not its speed. On 11-09 a try took 4.7 minutes on average and 30% of tries landed, so each landed change cost 15.6 minutes of the one land lock: at most 92 a day with no idle time. At 70% first-try success the same step carries about 210 a day. New work arrives at about 55 a day. The step is saturated by its own failures.
- **Where does work pile up?** Between "finished" and "on main". By Little's law, about 184 parked tasks at about 50 lands a day is a 3.7-day wait.
- **Is the system past sustainable capacity?** Yes for the Mac mini (session notes report load of 50 to 400 on 8 cores; 22 of 46 red gate rows on 11-09 were time-outs with no failed assertion). Yes for the land step at its present yield. No for iPhone-test compute, which is idle most of the time.
- **How much effort is coordination, waiting and rework?** 80% of land time goes to tries that do not land. 77% of main's commits are records. 4 of 5 hand-out lines repeat an earlier offer. 61% of open board lines are tools, site or ops.
- **Is it making work that need not exist yet?** Yes: 798 open lines against about 120 ticked a day, and the largest open kind is tools.
- **Is parallelism helping?** No, beyond a small number. Sessions, checks ahead, speculative gate runs (2,600 to 3,900 s each on 11-09) and Simulators share 8 cores. Under load, checks time out, the work is parked, and retries add more load. That loop is congestion collapse.

---

## 4. Ranked findings

**F1. The company is working mostly on itself.** *Confidence: high.*
- Evidence: the product-share table above. The CEO agent's own review on 11-08 said the same: "Product commits fell from about 106 a day ... to about 30", "we built more measurement than repair", and recommended a freeze on process work ([`ops/plans/efficiency-assessment-2026-11-08.md`](efficiency-assessment-2026-11-08.html)). `tools/` is 448 scripts and 118,000 lines after 19 days. The experiment ledger holds 124 entries, 51 with no verdict.
- Root cause: three standing instructions pull the same way. Process improvement is "permanent, continuous work" with at least one agent (ruling 10-25 10:49 PM). Efficiency work goes first and the app is "scheduled as needed" (11-06 11:24 PM). Since 9:10 PM on 11-09, only merge-queue work may start. Each was reasonable when given. Together they leave no protected room for the app.
- Impact: an Investor-reported app bug (only the Countdown widget draws on the iPhone, T-3783 and T-3364, reported 11-07) is still open as P0. `ops/milestones.json` was last updated on 11-04, when release had "about one day of slack".

**F2. Nothing ties starting work to merging it.** *Confidence: high.*
- Evidence: the governor sizes work to "use up" the weekly allowance and never reads the backlog (`tools/governor.py:671-711`, `:2086-2122`). Prompts say "Keep the pool full" (`ops/prompts/lane.md:5`); the handbook says "Use the whole allowance, every week" (`handbook/rules.md:107`) and "Every worker always has a runnable task" (`:392`). There is an idle alarm and no backlog alarm. Before 11-09 the only brake was a side effect: a lane slot whose last branch had not landed could not start, though the dispatcher kept offering it work. The first rule that reads the backlog and stops new lane work came into force at about 7 PM on 11-09 (T-3901).
- Why it was not fixed sooner: two replay studies concluded a cap "never landed more" (T-3086, T-3420). The second states that "the replay alone cannot produce the file's length: its own backlog ... is mean 2.4, max 14" while the real retry file held 86 to 141 lines (`ops/runs/t3420-backlog-gate.md`). A model that cannot produce the backlog cannot judge a backlog rule. It also holds test failures, time-outs and machine load fixed, which are the ways unfinished work does harm.

**F3. Main carries records, tools and product in one history, and almost everything commits to it directly.** *Confidence: high on the mechanism, medium on its share of the waste.*
- Evidence: section 3, "How main moves"; the cache keys; 10 kept-pass reuses in four days. Rebase conflicts in the lane logs (76 events): tools 19, records 17, app 13, site 8; the files named most are the merge tools, `ops/issue-cards.json` and `tools/site/home_look.py`.
- Root cause: the same files serve as live state for running tools and as versioned history. Main-session workers and the Operator commit straight to main from one shared folder; Operator-authored commits skip the gate (`tools/main_gate.py:84`).

**F4. The land step's unit of work and its failure path create the queue.** *Confidence: high.*
- Evidence: one session's branch holds several tasks; a failure parks the bundle; four routes retry it (the slot's hourly retry, the spare retry, the land's own feed, and the speculative gate); the queue tool copies per task and keeps the original. A single task traced end to end, T-1289: 12 land tries, about 2 hours of Mac tests, 8 parked branches, 11-06 to 11-09. Another, T-1764: 15 minutes of Mac tests on a branch whose iPhone tests had been red for two hours.
- Root cause: failed work leaves its author and becomes someone else's job. No rule ever closes it.

**F5. Checks are heavier than the change, and run on the machine that is busy making changes.** *Confidence: medium-high.*
- Evidence: all Mac suites on two Python versions for any app change in a lane; the land tool's own test at 18% of check time; time-outs read as red; no recorded load series.

**F6. The iPhone test step is a single fragile point for the app.** *Confidence: medium-high.* Evidence: the table in section 3.

**F7. The Investors' view is stale exactly when it matters, and their messages slow the thing they are asking about.** *Confidence: high.* Evidence: sections 7 and 8; the 30-minute hold.

**Hypotheses the evidence does not support as primary causes.**
- *Guards and refusals:* `ops/refusals.jsonl` holds 13 rows since 11-05, mostly deletions. They delay disk cleanup and single items. They are not a main cause of the backlog on the evidence available, and the record is incomplete.
- *Rebase conflicts as a time cost:* 0.1 hours. Their cost is that each one sends work back to the pile.
- *Queue ordering rules:* they add complexity (seven layers; 191 lines on the merge-first list; 96 lines at P0) and a little waste, but ordering a queue that should not exist is not the lever.

---

## 5. Audit of current proposals

Facts on each line come from the board, plans and git. Patches saved on the Company SSD were not read, so those entries rest on board notes.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 5. Audit of current proposals, scrolls sideways" style="--tw:989px" markdown="1">

| Proposal | Aimed at | Verdict | Reason |
|---|---|---|---|
| T-3875 size agents to merges (landed) | F2 | **Change** | Right problem. Three signals stepping one size every 20 minutes, main session only, overridden the night it landed. Replace with one count (section 10, step 1). |
| T-3901 merge mode, T-3885 own-parked-first (landed) | F2, F4 | **Keep, simplify** | The first real backpressure. Thresholds (40 branches in 24 h, 50 retry lines) are far too loose. |
| T-3971 merge-only switch | F2 | **Combine** with the above | A third switch for one idea. It also edits the lane tick after the 10:17 PM "no changes to the personal sessions" ruling; the Investors should confirm. |
| T-3883 one task per branch (open, not on tonight's list) | F4 | **Promote** | The source fix for duplicate branches. |
| T-3890 merge in groups by file version | F4 symptom | **Drop as a standing path** | Its own numbers: 442 of 479 saved resolutions are duplicate copies. Use once for the drain. |
| T-3957 order merges by base commit | symptom | **Drop** | Refines the order of a queue that should not exist. |
| T-3958 parallel lands | capacity | **Drop** | More movers of main and more load on a saturated machine. A train gives the gain without either. |
| T-3962 "lever" tags, T-3965 never park merge fixes | priority | **Drop** | 65 tasks carry the "top" tag; a seventh ordering layer; jumping the queue cancels kept passes (the company's own [`merge-outside-practice.md`](merge-outside-practice.html), row 9). |
| T-3964 merge parked merge fixes first | F4 | **Done; stop** | 9 of its 13 tasks needed no merge. |
| T-3974 no idle merge step (landed), T-3975 stop losing check time | F4, F5 | **Keep** | Item 3 (skip checks when a result is already red) removes real waste. |
| T-3905 run the land tool's test only when needed (landed) | F5 | **Keep** | |
| T-3818 stop leftover test programs | F5 | **Keep; land first** | Its uncommitted edit in the shared folder is what blocks T-3907 and T-3962. |
| T-3907 Mac tests on the MacBook | F5 | **Defer** | It queues Mac tests behind iPhone tests on the app's scarcest machine. Test selection in the lane land saves similar time with no new job kind. Its plan and patch disagree on the default. |
| T-3978 own copy per worker | F3 | **Change** | Isolation is right. A second lander (`worker_land.py`) and a new branch namespace are not: run main-session workers through the lane path. T-2719 built the same thing on 11-07 and is still parked. |
| T-3979 worker status (slice 1 landed) | visibility | **Keep slice 1; drop leases** | Its own plan says leases are moot once workers have their own copies. |
| T-3980 worker brief and auto-stop | waste | **Defer** | Baseline is 2 repeat refusals a day and n=6. |
| T-3972 stop site tests rewriting tracked screenshots | F3 | **Keep, raise** | Tests that dirty the shared folder jam every gate. |
| T-3908 merge queue page (T-3951 duplicate) | visibility | **Keep; land; close T-3951** | The plainest merge view so far. Make its count the only count (section 7). |
| T-3955 record queue numbers every tick | measurement | **Combine** into one flow record | It lists five earlier measures of the same thing. |
| T-3961, T-3985, T-3986, T-3987 | Investors' view | **Section 8** | |
| T-3967 pause Simulators, T-3973 safety checks | CPU | **Defer T-3967; drop T-3973** | Evidence is three readings. T-3973's own draft found no check stops a Simulator. The <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> would block the iPhone step app merges need. |
| T-3976 storage on Home, T-3977 leftover copies | disk | **Keep T-3977; defer T-3976** | The disk gate is a real stall. A 12-minute reading for a panel is not urgent. |
| T-3963 lands against changes per hour | measurement | **Keep; fix** | Its session count is wrong (section 3). |

</div>


**Interactions to watch.** Five lines edit `tools/personal_land.sh` and five edit `tools/main_gate.py`, all at once. The night's proposals add about 11 scripts, 12 record files, 7 new states or tags, 9 switches, 5 timed jobs and 8 panels. That is F1 and F3 in action: the fixes for the queue are the largest single source of traffic in it.

**Earlier plans.** [`ops/plans/merge-flow.md`](merge-flow.html) (11-06) had the right diagnosis: Little's law, a cap, records out of git, test selection. Records-out was done for meters only; the cap was dropped on the replay. [`one-dispatcher.md`](one-dispatcher.html) and [`one-coordinator.md`](one-coordinator.html) are one step done of several. [`merge-outside-practice.md`](merge-outside-practice.html) lists 27 techniques, most marked "in part". The company knows the practices. What went wrong is that each was added as another layer on a moving base.

---

## 6. Opportunities not yet considered

1. **Count the app, not activity.** One daily number leads every report and Home: verified app changes on main. Process work is capped as a share of changed code lines (12% app today), not of spend.
2. **Records off the code history.** T-3084 did this for usage meters (`tools/records.py`). Extend it to the board, memory notes, queue lists and event log: one recorder commits them in a batch every 15 minutes, or to a separate `records` branch. Work branches may not carry record files. Evidence: 77% of main's commits; 435 of 596 parked branches. Drawback: tools that read these files from git history need a pass. Test: main moves under 150 a day; kept-pass reuse above 10 a day.
3. **One road to main.** No direct code commits. Main-session agents use the lane path. This removes the pre-commit gate route, "passed, not recorded", the close-of-session sweep, and the need for T-3978's second lander.
4. **A merge train as the only road.** One always-running loop takes ready one-task branches in order, stacks several, runs one Mac-test run and one iPhone-test run for the stack, and lands all or splits on red. The code already has trains, but as a fourth retry route that excludes iPhone-test branches. At 20 minutes a train and 3 changes a train, that is over 200 a day.
5. **Failures go back to the author.** A red change returns to the session that wrote it, with the reason, as that lane's next task (T-3885 already points this way). After two returns or 48 hours the task is reset to "to do" and the branch archived. This removes the parking lot, the retry file, the queued and hold ledgers, and the automatic retry and redo board lines.
6. **Decouple app tests from `tools/`.** The app's Mac suites read all of `tools/` (`check_cache.py:19-21`). Move the few checkers they need under `pywidget/` and key the pass on what is read. Tool changes then stop cancelling app passes.
7. **Checks before sessions on a busy machine.** When load is above a set line, start no session; never slow a check. Record load every minute (missing today).
8. **Freeze the pipeline while it is in use.** Land, dispatch and gate tools change in one batch a day, by one owner, landed while the queue is paused.
9. **A message never pauses merging.** Remove the 30-minute hold; the land step needs no session.
10. **Questions are not tasks.** With 95 messages in a day, a rule helps: a question gets an answer; only a request to do something adds a board line, and it joins the one ordered list unless marked urgent.

---

## 7. Home

### What it does today (Observed)

- Only the Team row, the usage bars and the "who is coding" part of In flight are live. Everything else is built between sessions: at 11:32 PM it was last built at 9:26 PM, and earlier gaps on 11-09 were 3.5 to 4 hours (site clone's log).
- The live feed's loop exits when it sees no session (`tools/live_status.py:1353`), and it is started before the session exists. At 11:41 PM no loop was running and the feed was about 4 minutes old.
- Three different counts of "parked" (In flight chip, Merging panel, merge-queue page), all frozen at the last build.
- No trend anywhere. `ops/metrics/merge_queue.jsonl` is read by no page.
- A 24-hour time reaches the Investors: `tools/site/home_look.py:357` formats with `'en-GB'` and drops "ET".
- Internal words on the page: "Rebasing onto current main", "Host checks", "lane", "retry line", "spare branch", a file name, and a raw data dump under "Exact figures".

The six questions:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: What it does today (Observed), scrolls sideways" style="--tw:624px" markdown="1">

| Question | Answered today? |
|---|---|
| What is the company doing now? | Partly; about 5 minutes old |
| How much is in progress, how much waits to merge? | No single number; three that disagree |
| Is the backlog growing or shrinking? | No |
| Where is the bottleneck? | Weakly; 24-hour sums, not rates |
| What is blocked, failing, or needs me? | "Needs you" is good; failures are buried |
| Is the product advancing? | No |

</div>


### Recommended Home

Six numbers matter: app changes merged today; changes waiting to merge, with the oldest one's age; merged per hour against arrived per hour; first-try merge rate; whether main passes its own tests; whether the iPhone test machine is online. Every live figure shows when it was updated.

```
+--------------------------------------------------------------------------+
| pywidget . Day 19 of 60 . 41 days to release                             |
| NOW   Merging is the limit: 184 changes wait, 3 merged in the last hour. |
|       Updated 11:42 PM ET (20 seconds ago)                               |
+--------------------------------------------------------------------------+
| NEEDS YOU (3)                                                            |
|   Approve deleting leftover copies (#255)            asked tonight       |
|   Star proposal (#254)                               asked tonight       |
|   Bank and tax details                               due Day 12          |
+--------------------------------------------------------------------------+
| FLOW, last 24 hours                                                      |
|   To do      Being built    WAITING TO MERGE     Being tested   On main  |
|    798           6          [ 184  growing ]          2         56 today |
|              2.3 an hour in  ------------------>  2.1 an hour out        |
|   Oldest waiting change: 4 days .  First-try merges: 30%                 |
|   [one 24-hour line chart: arrived, merged, waiting]                     |
+--------------------------------------------------------------------------+
| THE APP                                                                  |
|   App changes on main: 13 today . last 6 days: 71 68 17 14 18 13         |
|   On your iPhone: build 2 . Next: build 3, waiting on an upload          |
|   App problems you reported, still open: 2 (oldest 2 days)               |
|   Next milestone: device test, Nov 12-13                                 |
+--------------------------------------------------------------------------+
| STUCK OR FAILING  (shown only when true; these two are examples)         |
|   iPhone test machine offline since [time]                               |
|   Main copy failing its own tests since [time]                           |
+--------------------------------------------------------------------------+
| More >  Team . Usage . Machine and Simulators . Queued tasks . Reports   |
+--------------------------------------------------------------------------+
```

This is a layout example. Most figures are tonight's readings; "being built" and "being tested" are placeholders.

- **Remove from Home:** the two explainer lists in the Merging panel, "Exact figures", the Simulators panel, the session-facts block, the full column of old requests (keep a count and a link), and the This Session strip until its page works.
- **Redesign:** In flight and Merging become the one Flow strip, with one count from one source (T-3908's collector).
- **Keep:** Needs you; the Team row under "More".

---

## 8. This Session

### What it shows today (Observed)

- Nothing but "Coming: a live chart". The chart draws only when the feed carries `session.coord.active === true` (`tools/site/assets/session.js:216`), and nothing sets it: the coordinator it describes (T-3302) does not exist.
- The design is a fixed six-step track per task under a "Coordinator" box and "Workers" dots joined by decorative arrows. Its data file holds one row; every current row is mapped from land steps, so the first three steps would be empty. Finished rows carry no history. Retries are invisible because time is summed per step.
- It mixes four ideas: an organisation picture that is not real yet, account capacity, a per-task stage track, and (under the same name, T-2308) a wiring diagram of the whole system.

### Recommended model

One idea per view, and only what the records can support.

1. **Default view: stages as columns, workers as rows.** Each task is one line showing its plain title, the stage it is in, how long it has been there, and which try this is.
2. **On demand: one task's history as a timeline.** Every step with its start and length, each retry on its own line, and the reason it was sent back.
3. **No dependency graph.** Dependencies between tasks are not recorded anywhere, so a graph would be invented.
4. **The wiring diagram (T-2308) moves to a "How it works" page.**

```
THIS SESSION . started 9:33 PM ET . 6 workers . updated 11:42 PM (20 s ago)

           Handed   Being    Waiting    Mac     iPhone             Sent
           out      built    to merge   tests   tests    Merged    back
 Count       2        4         9         1       1        7         3
 Typical     -      54 min   2 h 10 m   7 min   6 min

 v Odalys (process)                                             3 tasks
     Stop leftover test programs failing merges
        o-----o=====O                Waiting to merge . 40 min . 8th try
     Never leave the merge step idle
        o-----o-----o-----o-----o-----O              Merged 11:24 PM
 > Idris (iPhone app)                                           2 tasks
 > Personal account A, slot 2                                   1 task

 [click a task]
   Stop leftover test programs failing merges (T-3818)
     9:05 AM   Handed to Odalys
     9:08 AM   Being built                               1 h 12 min
    10:20 AM   Mac tests: sent back (timed out; machine busy)   try 1
      ...
    10:43 PM   Mac tests: sent back (timed out)                 try 8
     Now       Waiting to merge
```

This is a layout example; the counts and clock times in it are invented.

- **Data:** one append-only record with one row per change of state (task, stage, time, worker, try number, reason). The pieces exist: the dispatch log, worker status (T-3979), land steps, iPhone-test results. Build the page from those; drop the coordinator switch.
- **Live updates:** counts and the current stage change in place; rows do not reorder while the page is open.

### The proposed changes, judged against this


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: The proposed changes, judged against this, scrolls sideways" style="--tw:582px" markdown="1">

| Line | Verdict |
|---|---|
| Fix the live loop (no line yet) | **First.** Nothing live is worth adding until the feed runs during sessions. |
| T-3986 near-live Home | **Keep**, counts only (300 to 500 bytes fit; per-task rows do not). Drop the 15-minute full rebuild during sessions: it adds load, and site tests dirty the shared folder. |
| T-3961 merge queue on This Session | **Combine:** it is the right-hand columns of the view above, not a separate panel. |
| T-3979 one line per worker | **Keep:** it is the "Being built" column. |
| T-3985 all messages | **Defer.** A fifth idea on the page, high volume, and a risk of showing what should stay private. At most, a task's messages inside its timeline. |
| T-3378 show main-session checks | **Keep.** T-3376, T-3377, T-3356 wait on a coordinator that does not exist: drop the dependency or the lines. |
| T-3987 slash commands | **Defer** lookups until the feed is live. **Drop** `/prio` and `/start`: one more way to jump the queue. |

</div>


---

## 9. Target operating model

**Flow.**
1. *Admission.* A task starts only when fewer than a fixed number of changes wait to merge, and the worker's last change has merged or been closed. Over the limit, lanes do not open sessions. Idle is acceptable.
2. *One ordered list.* (a) whatever blocks merging: main failing its tests, the test machine down; (b) changes sent back; (c) app problems the Investors reported; (d) the app plan, in order; (e) process work inside its share. No tags, tiers or levers.
3. *Build.* Every worker, main session or lane, works in its own copy on one branch per task, with no record files in it, and runs the selected Mac tests before handing in.
4. *Check and land.* One always-running tool owns main. It forms a train, runs the selected Mac tests once and the iPhone tests once, and lands or splits. It is not paused by messages and not cut by session boundaries.
5. *Failure.* A red change goes back to its author with the reason. Two returns or 48 hours resets the task and archives the branch.
6. *Overload.* At the limit: no new starts. iPhone test machine offline: app trains use the Mac mini's slot, sessions' Simulators pause, and a "needs you" card goes up at once. Main failing: everything stops but the fix. High load: no new sessions; checks keep running.
7. *Monitoring.* One flow record feeds Home, This Session and the daily scorecard.

**Who does what.**
- *Agents:* write code and tests, fix what is sent back, review.
- *Deterministic tools:* admission, ordering, the train, checks, the flow record, the site.
- *Investors:* the three gates; what the app should be; the process share; the standing rules on idleness and the allowance; bringing the MacBook back; any paid test machines.

**What goes away.** The `parked/` namespace; three of four retry routes; the retry file and the queued and hold ledgers; the merge-first list, lever tags and kind tiers; the direct-commit gate and "passed, not recorded"; the close-of-session sweep; the speculative gate; spare branches; automatic retry and redo board lines.

The charter is untouched: the three gates, the bans, and Investor-owned files changing only through the applier. Steps that alter standing Investor instructions are marked below.

---

## 10. Roadmap, and how each step is proved

### The order


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: The order, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Change | Expected result (a week after) | Shows it failed | Size, risk |
|---|---|---|---|---|
| 0 | **Land tonight's finished fixes one at a time; add no new merge tools.** | The shared folder is clean; gates stop jamming each other | Still two or more uncommitted merge patches in the folder after a day | Hours; none |
| 1 | **One cap on unmerged work.** One count in `tools/dispatch.py`: no new start while 12 or more tasks wait to merge; lanes do not open empty sessions. *Investors:* replace "never idle" and "use the whole allowance" with "idle is fine when merging is the limit". | Parked branches created under 30 a day (160 now). First-try lands at 60% or more (30 to 40%). Median hand-out to landed under 3 hours (9.9). | App changes on main under 10 a day for two days while the count is under the limit | A day; low. Uses less allowance. |
| 2 | **Quiet main, one road.** Records batched by one recorder or moved to a `records` branch; no record files in work branches; no direct code commits; pipeline tools change once a day. | Main moves under 150 a day (500). "Main moved" waits near zero. Kept-pass reuse above 10 a day (10 in four days). No conflicts in record files. | Main still moves over 300 times a day, or the site or a watcher breaks | 2 to 4 days; medium. Many tools read these files. Stage it: batch first, branch later. |
| 3 | **One train; failures back to the author.** Always-running loop; one task per branch (T-3883); one Mac run and one iPhone run per train; selected suites; skip on a known red (T-3975 item 3); "sent back" state; retire the other retry routes; remove the message hold. | Land time on tries that do not land under 30% (80%). Six or more lands an hour sustained in a drain. Tasks waiting over 48 hours: none. | Not-landed share stays over 50%, or trains split on red more than one time in three | 3 to 5 days, mostly deletion; medium. Do after step 2. |
| 4 | **App first; process to a fixed share.** *Investors:* end "merge-queue work only" on a stated test (under 20 tasks waiting for 24 hours), then app first with process at 10% of changed code lines. Close out the 51 open experiments. | App share of changed code lines 60% or more (12%). Verified app changes on main 40 or more a day (15). | App share under 30% a week after the queue test is met | A decision; low |

</div>


**Why this order.** Step 1 lowers load at once and costs a day. Step 2 removes the main reason passes expire, so step 3's train does not test against a base that moves every 3 minutes. Step 4 needs the queue short first, or app work will stack up behind the iPhone step again.

**Supporting.** Fix the live loop. Land T-3908 and T-3972. Record load every minute. Record "passed, not recorded". Refresh `ops/milestones.json` (last updated 11-04). Move running notes off board lines (the board is 754 KB; one line is 23 KB). Fix the 24-hour time at `home_look.py:357`.

**Longer term.** A second iPhone test machine or hosted Mac test machines if that step still limits the app after step 3 (real money: the Investors' gate). Recorded dependencies between tasks. Smaller tasks. A nightly full suite on both Python versions in place of per-land.

**Do not pursue.** Parallel lands (T-3958). Lever tags (T-3962, T-3965). Grouped merges as a standing path (T-3890). More ordering tiers. More queue recorders. A second lander. The Messages panel. Automatic Simulator holds. Any further replay verdicts on a cap.

### Measurement framework

Six numbers a day, from one flow record, kept apart:


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: Measurement framework, scrolls sideways" style="--tw:760px" markdown="1">

| Measure | Definition | 11-09 baseline |
|---|---|---|
| Produced | new change sets handed in | about 55 |
| Merged | tasks landed; app counted apart | 56 lands; 13 app commits |
| Time to merge | hand-out to on main, median and slowest tenth | 9.9 h; 41.8 h |
| Reworked | tries per landed task; send-backs; tasks done twice | 1.9 tries; 694 branches done another way |
| Failed checks | reds with a failed assertion, time-outs, machine faults, each apart | 46 red gate rows, 22 of them time-outs |
| Value to the app | verified app commits; TestFlight builds; Investor-reported app bugs closed | 13; build 2 on device; 2 open |

</div>


A shorter queue alone proves nothing. It must come with "closed without merging" and "done twice" counts, so dropped or hidden work shows.

Tested on history so far: the hand-out log shows the dispatcher offering work four to seven times more often than sessions could start (136 offers against 33 sessions on 11-08; 243 against 35 on 11-09), so a cap costs little real work. And in the three hours on 11-09 when new work was paused, lands rose from 2.1 to 3.7 an hour (n=11; weak, and confounded with the runner returning).

---

## 11. Open questions and evidence gaps

- **No load series exists.** Load figures (50 to 400) come from session notes. The link from load to time-outs is concluded from the red rows, not measured.
- **Lane session streams were not read** (they sit in personal profile folders, which are off limits). Working against waiting time inside a session is unmeasured.
- **Patches on the Company SSD were not read** (T-3907, T-3962, T-3965, T-3967, T-3971, T-3976, T-3978, T-3980).
- **"Passed, not recorded" and worker refusals are not stored**, so their cost is unknown. `ops/refusals.jsonl` holds 13 rows.
- **The fall in app commits on 11-06** has two candidate causes that I did not separate.
- **New change sets (55 a day) lean high**, and task-number growth is a proxy for tasks created.
- **Held pushes** (100 of 142 failed on 11-09): the effect on MacBook jobs is a hypothesis.
- **The live loop's failure** is inferred from code and file ages, not traced.
- **`ops/metrics/merge_queue.jsonl` is confounded by pruning.** The 596 branch count is mine at 11:35 PM; the prompt's 481 came from `tools/parked_count.py`, which I did not rerun.
- **No command of mine was refused.**
- **Starting figures checked.** About 2 lands an hour, the land lock's busy hours, main's moves and the rebase stops all hold within window differences. The session rate does not (section 3).

---

## The answer

**What I would fundamentally change.** The company runs as a push system that rewards activity: sessions started, allowance used, tasks ticked, tools built. I would run it as a pull system built around its one scarce step, a verified merge of app work, and stop spending the company on its own machinery.

**The three changes I would make first.**

1. **Start work only when it can merge.** One cap on unmerged work, and retire "never idle" and "use the whole allowance" as goals. Idle workers are cheap; parked work is not.
2. **Make main quiet, with one way in.** Records out of the code history, no direct commits, the merge tools frozen while in use. Main moves when a verified change lands, and at no other time.
3. **Replace the parking lot with one merge train, and put the app back first.** One always-running loop, one task per branch, one test run per train, failures back to their author. Then hold process work to a tenth and measure the company by app changes on main.
{% endraw %}

</div>
