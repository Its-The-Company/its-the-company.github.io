---
layout: "default"
title: "T-1029 review: c1694aed, 11215bdb, a353216e"
section: "documents"
description: "Verdict: the code does what the board line asks, and it stays in. One High: nothing bounds a task a lane can never finish, and that loop is live now. The first pool-8 session started at 09:39:01 with T-0032, T-0309\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1029-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1029-pernille.md</code></span></div><h1>T-1029 review: c1694aed, 11215bdb, a353216e</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02, Commandment 13. I did not write these. Odalys did.

**Verdict: the code does what the board line asks, and it stays in. One High: nothing bounds a task a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can never finish, and that loop is live now. The first pool-8 session started at 09:39:01 with T-0032, T-0309, T-0427 and T-0479 in its queue. Don't tick T-1029 until H1 has an answer.**

No <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch can be lost or overwritten by these changes that I could find. I found no landing check removed from `tools/personal_land.sh`; two are looser by what now reaches them (M5, M6).

## What I read and ran

Read: all of `tools/personal_tick.sh` and `tools/personal_land.sh`, `ops/prompts/lane.md`, the three diffs, `tests/personal_parked_test.sh`, the T-1029 rows of `tests/personal_pool_test.sh`, section 2 of `tests/personal_off_test.sh` at HEAD, `ops/runs/personal-tick-a.log` and `-b.log`.

Ran through `tests/run.sh`: `personal_parked_test.sh` PASS 47 FAIL 0; `personal_pool_test.sh` PASS 58 FAIL 0. Both are stand-ins: they prove the tick's logic and nothing about the CLI. Two plain-git trials in scratch: a two-commit `cherry-pick --no-commit` whose second commit conflicts leaves the tree clean after `resume_one`'s `--quit` and `reset --hard`, new files gone; a pick already on HEAD exits 0 with nothing changed, so the session is told "its work is in this worktree" when none is (Low).

Not run: `personal_off_test.sh`. `tests/personal_off_test.sh`, `tests/run.sh` and `tools/test_personal_lane.py` are being edited in the main checkout for T-1015 while I write. `personal_land_test.sh`: not run, one row changed and I read it. No state folder read; "on a done list" below is inferred from the logs.

## The brief, line by line


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The brief, line by line, scrolls sideways" style="--tw:640px" markdown="1">

| Asked | Result |
|---|---|
| Agents kept to the end by blocking batches | Words only. M1. One real session proves nothing: see "The three tasks". |
| No two-try limit | Gone. No reference left outside the tests. H1 is the bill. |
| Failed tasks go to the back, fresh ones not starved | Yes. `RANKED` sorts on all accounts' tries, then menu order. |
| An attempt on a parked name doesn't come back from main | Yes for what `keep` and `park` name from now on. The old unnamed left commits aren't read (L3). |
| The next attempt gets that branch | Yes, by cherry-pick, uncommitted, on main's commit. M3, M4. |
| A line waiting on a task costs no try | Yes. Live: T-0678, T-0696, T-0757, T-0976, T-1033 in the 09:38 log. |
| A tick with no task logs it | Yes. Live: `no task: 25 on the menu` at 09:40:57. |
| No-suite commits can land | Yes, going forward, on host plus the floor. M5. Branches already parked for it still need a retry line (L2). |
| Process count after a keeper stop | Yes, after every session. |
| PERSONAL_POOL 8, slots 3 | Yes. See Load. |

</div>


## High

**H1. A task a lane can't finish now runs forever.** The two-try limit was the only thing that stopped one. an Investor was right to want it gone, because it stopped good tasks too, but back of the line is only a limit while there is a front of the line. When the menu runs short, the back is the session. At 08:50 account a had nothing else, and the session was T-0309, T-0427 and T-0479 alone.

- Evidence it can't finish, not just that it hasn't: T-0427 must edit `pywidget/tests/bridge/fake_pwbridge.py` and un-skip an existing test, and `check_tests` refuses both, so it can't land from a lane even if a session does it perfectly. T-0479 needs a physical iPhone and iPad. `lane_fits` passes both: neither line names an off-lane path, and "after a device exists" has no T-ID for `waits_on`.
- Rate: launchd starts each account every 15 minutes, 96 starts a day, and a slot that ran 600 s or more starts again at once (19 of 39 logged sessions did). T-0427 and T-0479 read as Opus high: neither line has a Model note with an effort, so the regex misses it.
- What stops it: only the account's meter. OPT-067's hard limit is a person reading ten sessions later, and "a third of the sessions" won't trip when these tasks ride along with fresh ones, as they do at 09:39.
- It teaches nothing. The prompt tells the session to give its reason in its last message, and no log keeps that message. Every loop pays for the same answer and throws it away.
- A resumed variant: a bad attempt can't be escaped. `resume` puts the same half-work in the tree every time and says "carry on, don't start over". Only a person deleting the name lets the task start clean.

Fix, in order, none of which brings a last try back:
1. **Now, no code:** a company session puts "waiting on" in the T-0427, T-0479 and T-0032 lines. `STUCK` in `lanes_view` drops them from the menu. T-0427 "blocked on a company session (edits a fixture)"; T-0479 and T-0032 "waiting on a device". The Operator should read T-0032's line first: it asks for "a device or Simulator", and its two sessions lasted 14 and 15 s with no agent.
2. **In the tick:** a cool-down, not a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. A task with two or more tries runs again only after a wait that grows with its tries, read from a time beside the tries list. A queue of nothing but such tasks starts no session. The task stays on the menu and always comes back.
3. **Once a task hits a few tries, one board line** saying a person should look, once per task. That is what the old last-try line did, without the stop.
4. **The reason reaches a log.** A fixed form in the last message, `T-0427 STOPPED: <one of a few set words>`, read by `personal_stream_shape.py` as fixed words. That touches the no-text rule on that path, so it goes to the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>.

Row needed: the tick with one failing task on the menu, N ticks, count sessions.

## Medium

**M1. Blocking batches cover agents. The cut lines name more than agents.** Of the 8 "Background tasks still running" lines, 5 name shells or monitors beside the subagents: "Run the whole PyWidgetTests unit target", "Wait for mutant runs to finish", "host suites finished". `lane.md` says nothing about a worker's own background shells, and a blocking agent can start one and return. At 08:50, under the blocking rule, the shape shows `system/background_tasks_changed=2`, so something still went to the background; b's 07:49 session had 114. Every cut line also prints the switch: `Set CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0 to wait indefinitely`. That name is in no file in `tools/`, `rules/`, `ops/plans/`, `ops/prompts/` or OPT-067. One export at `personal_tick.sh:75` would cover agents, shells and monitors, and the keeper and the 13,500 s limit still bound the session. I haven't tried it, and the cost is a hung shell holding a slot. Odalys should try it on one session and say so in OPT-067 either way, because it confounds the read. Also add "long commands in the foreground" to `lane.md`.

**M2. A landed retry isn't done.** `retry` writes nothing to the done list. T-0063, T-0590, T-0953 and T-0974 logged "left no commit" and have no commit since except the T-1030 recuts, so by the log they are not done. Today they are `[b]` for T-1030, which is all that keeps them off the menu. <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">Lift</span> the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> before their lines are ticked and they run again from main, over work already landed, each with no commit to make: H1 again. Tick those four when the recuts land; don't unblock them. `retry` should add its tasks to the done list.

**M3. One commit holds every left task's work, and one task takes all of it.** `keep` makes one commit naming all left tasks. The session that resumes it may hold only some of them, and the rest of the half-work sits in its tree, unnamed in the prompt, while up to eight agents build and test there. The 11 left commits on parked names run 1 to 15 files. "Commit by path" doesn't help on a shared file: the half-made hunk goes in with the good one, under the wrong task, and that is OPT-067's own revert condition. Fix: the CARRY text names every task on the commit, and a resumed attempt that fails twice goes to "told" mode, tree clean. Row needed.

**M4. `attempts` believes every ID in a subject.** Reproduced by hand on today's refs: 55 rows, 20 tasks on the live menu. 9 of the 20 are only named by someone else's review: `T-0979: review of T-0750 at 0f94ba37` makes T-0750 an attempt, and likewise T-0753, T-0420, T-0907, T-0426, T-0517, T-0551, T-0668, T-0537. The 07:53 `pull --rebase` adds `ops:` commits from the old main, so `ops: personal account b stopped on T-0703` is an "attempt". By the logs these tasks are on done lists, so nothing fires today. A requeue turns it on: the session gets a review file in its tree and "carry on from it". Fix: a normal commit counts for its first ID only; every ID counts only on a `parked:` subject. Row needed.

**M5. The floor has a hole that no-suite now reaches.** `floor` gives `docs/` nothing, and `project.yml:50` and `:56` bundle `docs/design/viewtree.schema.json` and `docs/design/states/state-tokens.json` into the app. A no-suite line that changes them lands on host alone: no Xcode run, no review line. Before T-1029 that branch stopped for a person; a line naming `land:host` already had this hole. T-0309 edits that schema. Fix: `pywidget/docs/design/*` runs host and xc, and adds the review line. `tests/personal_land_product_test.sh:159` lists `docs` as exempt, so change it there too. I did not trace whether `pywidget/licenses` ships.

**M6. A finished task's stray edit used to hold the branch.** `keep -` puts it on a name with no task and no board line, and the branch lands without it. The `stray` row pins that as intended. Before, a tracked edit held the branch at land with a line. If a session commits half a change, the checks are all that stands between that and main, and the other half sits on a name `attempts` never reads. Fix: a stray left beside a finished task gets a board line, and the task's ID in the subject.

**M7. A retry lands the left commit too.** `park` puts the `parked: ... on T-B` commit on the same name as T-A's finished commits, and the board line tells a person to retry the name as T-A. `retry_one` then lands T-B's half-work under T-A's checks and deletes T-B's attempt. T-B may meanwhile have resumed from that name. It predates T-1029; "no line, the lane takes it again" is what makes the double landing possible. The T-1030 recut carries such a commit (756f5739), read and accepted there. Fix: the park line names what else is on the branch, or `retry` refuses a `parked:` commit naming a task the line doesn't.

## Low

- **L1.** Five lines in `.git/personal-ready/*.line` say "No lane takes it again": T-1015, T-0032, T-0309, T-0427, T-0479. That is now false, and land will post them. Delete those five before the next land. The other three are real stops.
- **L2.** "No-suite can land" is forward only. `parked/b/20261102-084136-20620` (T-0198, T-0213, T-0273, T-0510, T-0556, on done lists) and the review-only branches still need a retry line naming `host`, with `main..ref` read first: that one carries three `ops:` commits from the old main, which `check_lane` will refuse. And `park()` still writes `<checks>` for a no-suite end when it should write `host`.
- **L3.** 11 names hold left commits with no task in the subject, from before this fix. T-0749, T-0863, T-0044, T-0047, T-0591, T-0630: their 07:52 work is on dc0070a1. Nothing finds it, so those tasks start from main when their hold lifts.
- **L4.** Each failed resumed session adds a parked name, none is pruned, and with no last try that doesn't stop. 23 today, after a3's retry. Small so far: the 11 left commits run 29 to 1,514 changed lines.
- **L5.** `pull --rebase` at 07:53 rewrote main under running lanes. That is why b2's 08:10 end reads "its commits name none of its tasks": the "ahead" commits were main's own. OPT-067's count of lost attempts holds some of this. `NAMED` also reads IDs from those commits, so one could mark a queued task done.
- **L6.** `put_back` says "another task holds the Xcode lock" for any exit 75, and xc.sh also exits 75 at the disk gate. Each pass reruns host, about 280 s under `ops/.lock`.

## The live retries

**a3:** the tick took it at 09:43:28 ("a parked branch goes back to land"). The name is gone and the marker `a3` is up. It had not landed at 09:46. The disk gate sits after the retry in the tick, so it can't block this. If it goes red, `give_up` makes a new name and a new board line. No session can reach those tasks meanwhile: all four are `[b]`.

**b2: it won't fire.** Account b is refused on the stray profile item (the card in `ops/requests/lane-b-stray-item-card.md`). A refused account gets slot 1 alone, and `retry_one` only reads lines for its own slot's name, so `parked/b2/20261102-t1030-recut` waits on the Investors. b3's 07:54 session is also still running: no end line, its claude processes 1 h 48 old at 09:43, so the b parent stays up and no new b tick starts. If T-0953 and T-0974 shouldn't wait, a company session renames the branch to `parked/a2/20261102-t1030-recut` and changes the retry line to match; nothing in the branch knows its slot. T-1033 waits on T-0953 and the tick reads that correctly.

The name is safe either way. Nothing deletes a parked name but `retry` and a person, and `resume` only reads. The two parked-name rules that matter hold: `git branch` refuses an existing name, and `keep` and `park` name the work before any reset.

## tests/personal_off_test.sh section 2: the four rows, at HEAD

Read, not run, on the fixture as `tools/board.py lanes` really reads it (I ran that one call in scratch): **all four board lines are on the menu**, because T-0995's `lane_fits` takes T-0009 and T-0003 as well.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: tests/personal_off_test.sh section 2: the four rows, at HEAD, scrolls sideways" style="--tw:640px" markdown="1">

| Row | By reading |
|---|---|
| 353 "counts a try, not done" | Passes. |
| 354 "no board line" | Passes. |
| 356 "next tick takes the next task first" (assertion unchanged, label new) | **Fails.** The first tick queued all four, so all have one try. The second says `session on T-0009 T-0001 ...`, not `session on T-0002`. |
| 359 "no suite lands on host" | **Fails.** Three on the menu, a queue over one, and the stand-in commits `work` with no ID, so the tick parks "its commits name none of its tasks". |
| 365 "`land:nope` lands on host" | **Fails.** Same cause. |

</div>


The cause predates T-1029: section 2 has been stale since T-0985 and T-0995. At HEAD `tick()` doesn't set `PERSONAL_SLOTS`, so each tick runs the 150 s stagger. Rows 271-272, 278, 281, 325, 336 and 339 fail the same way. T-1015's working copy adds `PERSONAL_SLOTS=1`; it doesn't touch the fixture or the `work` subject. Fix for T-1015: make T-0009 and T-0003 lane-unfit (a `[tools]` kind, say), have the stand-in commit name a queued ID, and delete row 356, because the pool suite already covers that order.

## Load

The first thing that broke was fork, and at pool 4. `personal-tick-a.log` lines 509-510, between 08:09:24 and 08:28:07: `fork: Resource temporarily unavailable`, twice, in the tick itself. OPT-067's revert rule says back to 4 "if the machine refuses a fork". It already had, before the doubling and before T-1014 reached main. T-1014 may have fixed the cause. Nobody has shown that yet.

Readings at 09:32, with no session on account a: 1,457 of 2,666 processes, swap 3.19 of 4 GB, load 7.4 to 8.9. OPT-067's 1,472 was not a quiet baseline either. So about 1,200 processes of room, and swap is nearly gone before pool 8 starts.

Disk worries me more. 18 GB free at 09:34, the gate opened by 09:38, 16 GB at 09:44. `tools/disk_free.py` measured 257 MB a minute at pool 4 and says the 10 GB between its lines lasts 18 to 40 minutes. A session of 15 tasks runs far longer: 8 tasks took 3,086 s on b. The gate only stops what would start. So a session opened at the line will meet the stop line mid-run, xc.sh will refuse with 75, and the prompt tells agents to commit nothing untested. That gives no commit, a try, and H1. Please log free disk beside the process line, so the read of ten sessions can see it.

Three more, by reading:
- **One worktree, eight agents.** "Same files go in different batches" doesn't stop one agent's half-written Swift breaking another's build in that tree. At pool 8 I expect more no-commit tasks from this, not fewer. The guard already in OPT-067 (47%) is the right read.
- **One Xcode lock.** xc.sh waits 1,800 s for it and a run takes 134 to 289 s, so about 6 to 13 runs fit in that wait. Land waits only 60 s, and a3 is waiting for that lock now. Sessions can starve landings.
- **One slot took the whole menu.** At 09:39 slot a queued 15 tasks and a2 logged "no task". So far pool 8 has meant 8 agents, not 24.

I would keep 8 for the read, since the Investors asked for it and the rule to go back is written down. I'd take "the machine refused a fork" as live, and go back to 4 at the first repeat.

## The three tasks: T-0309, T-0427, T-0479

From the logs:
- **a, 08:50:51 to 08:59:35:** exit 0, keeper sent no signal, last event `result`, 9 turns, 520 s, 4 `task_started`, 4 `task_notification`. No cut line. So not cut off. At 520 s it couldn't have been: the ceiling is ten minutes after the last turn. It says nothing for or against blocking batches.
- **Worktree clean both times:** at 09:15 a's tick found nothing to park, and b's 08:41 name holds five commits and no left commit. Nothing was lost. Whatever ran changed no file that stayed.
- **Whether b's agents reached them:** can't tell. No cut line in any log names these three. At a, something ran: 4 tasks started, 43 assistant events, so short agents that looked and reported.
- **Why they stopped:** not in any log. The reason is in the session's last message, and the tick keeps only the shape.

What the board lines add, which is inference: T-0427 can't land (fixture and existing test). T-0479 needs a real device. T-0309 is a schema row plus Swift renderer cases plus a Simulator snapshot, with API rows held for two reviewers; I can't say which part stopped it, and it is my own line, so I'll read it myself. All three end the way `lane.md` line 19 tells a session to end: no commit and a line in the last message.

## Rows missing

One failing task over N ticks (H1); a subject that names another task (M4); a two-task left commit resumed by one task (M3); a retry that lands and the task's next tick (M2); a stray beside a finished task getting its line (M6).
{% endraw %}

</div>
