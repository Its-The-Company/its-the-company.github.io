---
layout: "default"
title: "Task process redesign: one card, one checker, the feature as the unit (T-4122)"
section: "documents"
description: "What I read: the tools named in section 1, at the level of their own header text; ops/plans/queue-methods-research.md (T-4120, Wrenna); log/audit/t4092/ledger-patterns.md and ops/queue_audit/ledger.jsonl (T-4121 and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/task-process-redesign.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/task-process-redesign.md</code></span></div><h1>Task process redesign: one card, one checker, the feature as the unit (T-4122)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-12, 7:46 AM to 8:1x AM ET, on <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a3 (Fable). Ask: Investor an Investor #41 c6814286499 (11:13 PM ET
11-11: redesign how tasks are created and kept up to date; a big overhaul is allowed, one simple big change
preferred over many small fixes) and c6814695060 (no fixed 10% line for grouping; choose the size each time). Part
of T-4092. This file proposes. It changes no tool, prompt, rule, Handbook text or board line. T-4103 (Odalys) and
T-4116 (Ines with Idris) build to it; section 5 says who builds what.

What I read: the tools named in section 1, at the level of their own header text; ops/plans/queue-methods-research.md
(T-4120, Wrenna); log/audit/t4092/ledger-patterns.md and ops/queue_audit/ledger.jsonl (T-4121 and the audit);
ops/plans/queue-audit.md; ops/plans/efficiency-review.md (T-4124); and, in the main checkout, ops/metrics/land_xc.jsonl
and ops/runs/land_steps.jsonl, the two records audit item 11 used. Every count below names its command, file or
script. The group-size fit is ops/plans/task-process-redesign-fit.py; section 4 quotes its output as run at 7:5x AM.

## 0. The proposal in five lines

1. **A task carries a card.** Beside what a line has today: a done test, the files it targets, the commit it was
   written against, who or what made it, and, for work that is not the app, how long it stays. Code fills two of
   the five and checks the other three.
2. **One checker, in code, keeps every task current.** It runs at two moments: on each change (an add, a merge, a
   failed land, a tick), for the lines that change touches; and once a day, over the whole queue. It acts alone
   only on proof. What it cannot prove goes on one short list, and a model reads that list once a day.
3. **Nothing writes a new line about an old task.** A failed land, a conflict, a reset, a review finding on work
   that has not merged: each becomes a state or a note on the task it concerns.
4. **For app work the feature is the task.** Its steps are commits in one long session, checked on the Mac. The
   feature runs on the iPhone once, at its merge.
5. **App changes that wait at the land share one iPhone run.** The group's size is chosen each time from the last
   few verdicts and the measured cost of a red group, to land the most changes per hour.

Points 1 to 3 are one change seen from three sides: once a task says how to tell it is done and what it touches, a
program can keep it current, and the lines that exist only to chase other lines are not needed.

## 1. The map today

### 1.1 How a line is made: eight ways

Every one writes through tools/board_tick.py, the board's one locked writer. That part is sound and stays.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1.1 How a line is made: eight ways, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Maker | What it writes | Checked at entry |
|---|---|---|---|
| 1 | A person or session: `board_tick.py add` | Lines from Investor messages (the inbox prompt), plan steps (plan mode: one line a step), follow-ups a worker finds, review findings, report follow-ups, overdue experiments | ID given; Title slot (title_check.py); Links field (T-4100, since 12:1x AM 11-12); a warning, never a refusal, on lines sharing key terms (T-3202) |
| 2 | tools/personal_land.sh (the land and a lane's stop) | Fixed notices: "Check finished work before it ships" (a [review] line for each landed product task), "Personal account stopped and its work <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>", "Main refused a record from a personal account", "Look at work that keeps coming back". Its "did not land" notice and retry line are retired (T-4011, landed 11-10; T-4012, landed 11-11): a failed land now writes a row in tools/sent_back.py's ledger and no line | `--links-warn`: problems are printed, the line goes on |
| 3 | tools/land_fold.py `fold` | One "Retry finished work that could not be merged" line a branch, from two or more old notices | the same |
| 4 | tools/main_green.py `--board` | One line while main's host check is red | the same; one open line at a time |
| 5 | tools/runner_watch.py | "main is red" at P0; a line for a failed MacBook job | the same |
| 6 | tools/park_watch.py | "Recut a parked change that now conflicts" (built, not wired) | carries "Links: none" |
| 7 | tools/quarantine_line.py `--apply` | A fix line for each suite that proves flaky | the plain add |
| 8 | tools/investor_age.py (called by the land) | A P0 "Redo ..." line for each Investor-sourced task whose branch did not land on a conflict | the plain add |

</div>


### 1.2 How a line is kept: eighteen ways


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1.2 How a line is kept: eighteen ways, scrolls sideways" data-n="1" style="--tw:914px" markdown="1">

| # | Keeper | What it does to a line | Runs |
|---|---|---|---|
| 1 | board_tick.py modes | tick, note, block, unblock, wait, answered, title, owner, move, links, runnable | by hand and by the tools below |
| 2 | tools/board_notes.py | moves long running notes to ops/board_notes/T-NNNN.md | supervisor, lane tick, land |
| 3 | tools/requests_close.py sweep | unblocks lines whose issue was answered | lane tick, prompts |
| 4 | tools/board_stale.py | flags lines already ticked, archived, on main, or done under another ID; closes the first two and landed retry lines; notes the rest | supervisor |
| 5 | tools/board.py `similar` | lists likely duplicates; changes nothing | supervisor |
| 6 | tools/board.py `stale-deps`, board_tick `runnable` | finds waits that have been met | by hand |
| 7 | tools/board_weekly.py | closes ticked, byte-equal and moot lines; folds notices | by hand |
| 8 | tools/parked_lines.py | closes "did not land" lines whose work is settled | by hand |
| 9 | tools/retry_prune.py | prunes the retry file of settled work | the land |
| 10 | tools/merge_reset.py | after two returns or 48 hours: branch to the archive, task back to "to do", a note, retry lines closed | supervisor |
| 11 | tools/land_fold.py `landed` | closes a retry line when its tasks land | the land |
| 12 | tools/investor_age.py `list` | puts Investor lines 48 hours old at the head of the queue | every queue reader |
| 13 | tools/queue_order.py | an Investor's reorder, parents first | by hand |
| 14 | ops/merge_first.txt (tools/merge_first.py) | the tasks that land first | every queue reader |
| 15 | tools/board.py `tick --committed` | moves ticked lines to log/board-archive.md | supervisor |
| 16 | tools/board.py `archive-open`, `restore-open` | moves open lines to log/board-archive-open.md with a reason, and back | by hand, queue_apply |
| 17 | tools/queue_inventory.py, the ledger, tools/queue_apply.py | the audit: a row a line, then remove, merge or rewrite | by hand (T-4092) |
| 18 | tools/dispatch.py | reads board_stale's flags and puts such lines last; reads pins and Links | each dispatch |

</div>


Planned on top of these: the queue-check sweep (T-4103), dispatch waiting on "needs" only and the nested Home view
(T-4100 next slice, T-4102), priority at entry (T-4104), and feature-sized app work (T-4116).

### 1.3 What the map shows

- **A line is prose with four slots.** Box and kind tag, ID, Title, owner and priority, and since last night a
  Links field (19 of 684 open lines carry it; `grep -c` on ops/board.md at HEAD). Everything else a keeper needs it
  fishes out of free text with a pattern. One open line says "Done when".
- **Four keepers each decide "is this work already on main" in their own way**: board_stale (the patch applies
  in reverse; or author, time and subject), board_weekly ("moot"), parked_lines (patch-id, a <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> line, an empty
  pick), retry_prune (`git cherry`; author, time and subject). No keeper records what it evaluated and left alone,
  so every pass starts from nothing.
- **Six of the eighteen run only by hand** (6, 7, 8, 13, 16, 17). The audit is the largest case: 805 open lines
  to be read one at a time by a model (383 judged so far), because nothing standing had kept them true.
- **Seven of the eight makers are programs, and four of them (2, 3, 6, 8) write lines about other work.** 208 of
  the 684 open lines (30%) carry one of the land's fixed titles: 66 "Check finished work before it ships", 53
  "Personal account stopped and its work parked", 47 "Main refused a record from a personal account", 18 "Look at
  work that keeps coming back", 13 "Retry finished work that could not be merged", 11 "Redo ..." (`grep` on the
  open lines' Title slot at HEAD). Such lines age badly: the audit changed machine-added lines 58% of the time
  (14 of 24) and removed 40% of lines with retry or redo wording (17 of 43) (ledger-patterns.md). The Investors'
  11-10 rule says "no new redo tasks" (quoted in tools/merge_reset.py's header); the land still calls
  investor_age.py's redo line.
- **Volume.** The highest task ID on the board went from T-2454 to T-4124 between midnight 11-05 and midnight
  11-12: 1,670 IDs issued in 7 days, 239 a day (`git show <commit>:ops/board.md`). 684 lines are open at HEAD: 264 [tools], 141 [build],
  77 [review], 61 [site].
- **App work is one line a change** (T-4116): 847 app tasks since 10-29, median one commit each, each with its own
  session, land check, merge try and review line (efficiency-review.md 2.2).

## 2. Benchmark

### 2.1 Against the published methods (T-4120)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.1 Against the published methods (T-4120), scrolls sideways" style="--tw:1280px" markdown="1">

| Method (source in queue-methods-research.md) | Today | Gap | In the design |
|---|---|---|---|
| A triage gate at entry (Kubernetes KEP-1553, VS Code) | add checks form: ID, Title, Links | nothing asks whether the line is new, checkable or still true | the card and the entry check (3.1, 3.2) |
| Duplicates closed by a bot with a pointer (VS Code) | `similar` reports; only the audit's apply merges with a pointer | no standing merge | the entry check refuses an exact twin; near twins go to the daily reading (3.2, 3.3) |
| Stale rules with exemptions (actions/stale, Kubernetes lifecycle) | board_stale finds finished work; nothing ages a line | a reason that passed is never noticed | the "Until" field, app lines exempt (3.1, 3.3) |
| Refine only the head of the queue (Scrum Guide) | none standing | the audit had to read everything | the daily reading takes the flagged lines and the head (3.3) |
| Two-level sizing: a feature is planned and checked, small steps inside it (Scrum Guide, DORA) | one line a change | every step pays a session, a land and an iPhone run | the feature is the task (4.1) |
| A cheap check first, group what passed (Google TAP, Chromium dry run) | Mac host checks run first, but they do not test the Swift app | the iPhone red share is what is left after them | the feature session runs the touched test classes before it queues (4.1) |
| Reuse a pass whose inputs are unchanged (Chromium) | tools/check_cache.py for host suites; nothing for the iPhone run | reruns after a rebase that touched no app file | a pass kept by the app's input key (4.2) |
| Batch with bisection, sized from the failure history (bors-ng; Bavand and Rigby) | none; item 11 tried a fixed 4 on paper and it lost | no size rule | the fitted size (4.3) |
| Stop the stage when nearly everything fails (Mergify pause) | runner_watch holds lands when two tasks fail on one error at one base | none | kept as it is |
| Speculative queues (GitHub, GitLab, Zuul, Uber) | merge_queue.py `--gate` for host checks | does not fit one Xcode slot | not used for the iPhone |

</div>


### 2.2 Against the audit's ledger (T-4121 first pass, 301 lines; the ledger at HEAD, 383 IDs)

Verdicts at HEAD, last row per ID (`ops/queue_audit/ledger.jsonl`, counted by script): 248 keep, 56 tick, 67 remove,
8 merge, 4 rewrite. So 135 of 383 lines (35%) were wrong on the board when read, and 56 (15%) were finished work
still shown as open.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2.2 Against the audit&#x27;s ledger (T-4121 first pass, 301 lines; the ledger at…, scrolls sideways" style="--tw:960px" markdown="1">

| Pattern in the ledger | What it says about today | In the design |
|---|---|---|
| A commit led by the line's ID finds 90% of the ticks but is right only 40% of the time (38 of 94) | code can see that work landed, not that the task is done | the done test makes it exact: commit on main and test passes |
| Removes are non-app lines: 62% of them (66 of 106) against 1% of app lines (1 of 195); 75% when idle 7 days (47 of 63) | process and site lines outlive their reason | "Until" on every non-app line; app lines never expire |
| Blocked non-app lines were removed 89% (24 of 27) | a wait hides a dead line | flagged daily |
| Machine-added lines changed 58%; retry or redo wording removed 40% | lines about lines rot | states, not lines (3.5) |
| Lines with three or more notes were kept 76% (72 of 95) | activity is a sign of life | a note resets a line's cooldown |
| Title overlap finds merges at 3% to 6% precision | words do not show a shared objective | twins are sought inside one umbrella or one set of target files, and a model judges |
| A named file missing predicts nothing (35%, the base rate) | a path in prose is not a link to code | Targets and Base turn drift into a diff |
| "Data a line does not carry": done test, targets, base commit, expiry, typed links, who added it, its umbrella | the judge had to rebuild each from prose | these are the card |

</div>


## 3. The design: the card and the checker

### 3.1 What a task carries when it is created

The store does not change: ops/board.md, written only by board_tick.py, with notes in ops/board_notes/. The card
is five more slots on the line, added the way Title and Links were. An add without them is refused with the reason.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 3.1 What a task carries when it is created, scrolls sideways" style="--tw:1280px" markdown="1">

| Slot | Who fills it | Form | What code does with it |
|---|---|---|---|
| Kept: kind, ID, Title, owner, priority, Links, Investor source | as today | as today | as today; priority at entry is T-4104 |
| **Done when** | the author | one of four: `test:` a test or suite by name; `file:` a path that must exist, with optional text it must hold; `posted:` a link the done-note must carry; `seen:` what a person sees on the device, with the screenshot or recording that shows it | `test:` and `file:` are checked by code. `posted:` and `seen:` are checked for their evidence and ticked by the worker, as today |
| **Targets** | the author; code checks each path exists at Base or is marked new | paths or folders, the narrowest that is true | says whether the task touches the app's inputs (so whether it needs an iPhone run), which waiting changes hold the same files, and what changed under it since Base |
| **Base** | code | main's commit at the add | drift becomes `git log Base..main -- Targets` |
| **By** | code | the worker, the tool, "review of T-X", or the Investor comment | exact provenance in place of wording |
| **Until** | the author, on non-app lines only | a date, or `while T-X open`, or `while #N open` | a condition that ends archives the line with its reason, restorable; a date that passes flags it |

</div>


A feature (4.1) uses the same card: its "Done when" is the `seen:` kind, the on-device condition a person can
check, and its steps sit as a checklist in its notes record with their old IDs, text and citations.

### 3.2 The sweep on each change

It runs inside the event, on the lines the event names by ID, Links or Targets. It never reads the whole board and
never calls a model. Every rule is a proof, so its accuracy is the accuracy of the proof.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3.2 The sweep on each change, scrolls sideways" style="--tw:1278px" markdown="1">

| Event | What code checks | What it does alone | What it flags |
|---|---|---|---|
| A line is added | the card is complete and well formed; an open line with the same done test, or the same umbrella and the same targets | refuses a bad card; refuses an exact twin, naming it; accepts the rest | a near twin (same umbrella or shared targets, and titles that overlap): accepted, but not handed out until the day's reading, unless P0 |
| A commit led by the task's ID reaches main | the task's done test; its open pieces; the lines that need it; the lines whose targets the merge changed | ticks the task when the test passes and no piece is open, with a done-note built from the commit; frees the lines that waited on it; counts "changed under" on the others | work on main but the test fails or is missing |
| A land fails | returns and age | the state "sent back" with the cause (tools/sent_back.py, built 11-10); after two returns or 48 hours, back to "to do" and the branch archived (merge_reset.py, built) | nothing |
| A waiting branch stops merging cleanly | the files | writes the state "needs recut" with the files on the task | nothing |
| A task is ticked | its umbrella; notices that name it | closes the notices; ticks an umbrella whose pieces are all done and whose own done test has its evidence | nothing |
| An issue is answered | the lines waiting on it | unblocks them (requests_close.py, built) | nothing |

</div>


Cost: a few git and file reads per event, no tokens. The comparable tools today take 0.1 s to 2.2 s
(efficiency-review.md 2.11). The checker's own time goes in its log, so the number is measured from day one.

### 3.3 The sweep once a day

One run between sessions, over every open line, in three steps.

1. **Proof rules again, over the whole queue**, to catch what an event missed: done test passes with the commit on
   main; the line's own ID already ticked or archived; a notice whose every commit is on main; an "Until"
   condition that ended; waits that are all met. These act alone.
2. **Signals, which only flag.** Each is a pattern the ledger measured, none strong enough to act on:
   work on main with no passing done test (a tick 40% of the time; 57% with two notes or fewer, 30 of 53); a
   non-app line with no commit of its own (removed 70%, 57 of 81); a non-app line idle 7 days (75%); a blocked
   non-app line (89%); an "Until" date that passed; a near twin inside one umbrella or one set of targets; targets
   that other tasks' commits changed since Base (new, unproven); and a missing card slot on any of the next 20
   lines due to be handed out.
3. **Cooldown.** Each line gets a fingerprint: its text, its card, the state of the lines it links to, the last
   commit on its targets, its note count. A line whose fingerprint is unchanged since it was last evaluated is
   skipped. A line that was flagged, read and kept is not flagged again until its fingerprint changes. Running the
   sweep twice does nothing the second time.

Safeguards, the audit's own (queue-audit.md R2, R3): a line with a claim, a worker status, a copy holding unlanded
files or a parked record is never changed, only noted, with its owner named. A P0 line or one that cites an
Investor is never removed, merged or rewritten by the sweep alone: such a verdict goes on a short list for me, and I
apply it or not, on the record. An umbrella is never ticked while a piece is open (board_tick already refuses).

Every evaluation is one row in a log beside the audit's ledger (the same row shape: ID, rule, inputs, result,
what was done), so the audit and the sweep read as one history and any act can be traced and undone
(`board.py restore-open` brings an archived line back).

### 3.4 Where a model is used, and only there

Once a day, one call, on the flagged lines only: each line with the evidence code already gathered (the commits
that name it, what changed under its targets, the state of its links). The output is a verdict row per line (keep,
tick, remove, merge into, rewrite) with a reason, applied by tools/queue_apply.py under the refusals it already has.
I propose a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> of 40 lines a day, P0 and the head of the queue first; the rest wait a day. At a median 609 bytes a
line that is a reading about the size of one worker's first call (24,298 tokens); this is an estimate, and the
real number is in the first dry run. Nothing else in the task process calls a model: not the entry check, not
the sweep on each change, not the daily proof rules, not the grouping.

The test before it is switched on (T-4103 already plans a dry run I read): replay the checker on the board as it
stood before the audit (commit 21641e9fae, the snapshot T-4121 used) and compare with the ledger's 383 verdicts.
The bar I propose: no act-alone rule touches a line the audit kept, and the flags find at least 9 in 10 of the
lines the audit changed (the crude rule "has its own commit, or is not app" already finds 90%, 107 of 119, by
flagging 175 lines; the checker should match that with fewer flags). The old lines have no cards, so this tests
the proofs and the signals; the card's effect shows only on new lines.

### 3.5 States in place of new lines


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 3.5 States in place of new lines, scrolls sideways" style="--tw:640px" markdown="1">

| Today | Under the design |
|---|---|
| A failed land: a sent-back row since 11-10 (T-4011) and no line since 11-11 (T-4012); 13 old "Retry" lines are still open | Kept as built. It is the model for every row below: the task shows "sent back: cause", and two returns or 48 hours reset it |
| A stopped account writes "Personal account stopped and its work parked" (53 open) | The parked branch is a state on the tasks it carries. A stop whose commits name no task is a row in the lane's own log, which the daily sweep reads |
| A record main refused writes a line (47 open) | The record stays in the outbox's failed folder. The daily sweep applies those that now pass and lists the rest once |
| "Look at work that keeps coming back" (18 open) | The task shows its return count; the reset rule above is what acts on it |
| investor_age writes a P0 "Redo" line (11 open) | The task itself is reset and moved to P0 with a note; no second line |
| park_watch writes a "Recut" line (not wired yet) | The task shows "needs recut" with the files; its owner's next session starts there |
| A review writes a new line for each finding | A finding on work that has not merged is a step on that task's checklist. Only a defect in merged work becomes a line, with a card, By: "review of T-X", part of the same feature |
| The land writes a [review] line for each landed product task (66 of the 77 open [review] lines) | One review per feature merge, for app code headed to TestFlight (Commandment 13). Tools and site changes rest on tests/run.sh and the gate (efficiency-review.md 2.6; the Handbook note is mine, outside this task) |
| A report follow-up becomes a line | It enters like any other line, with a card and By: "report" |
| "main is red" and a flaky suite's fix line | These stay. They are new work, not lines about lines. They get a card like any other (done when the check is green again) |

</div>


When the checker is on, these keepers have nothing left to do and their separate runs can stop: board_stale's and
`similar`'s supervisor steps (their proofs move into the checker, called, not rewritten), board_weekly, parked_lines,
`stale-deps`, land_fold's fold, and the land's notice and review lines. That is the simplification: eight makers
become three (a person, main red, a flaky suite), and eighteen keepers become the writer, the checker and the
archive.

### 3.6 What comes in from the efficiency review (T-4124)

- **2.1, one records commit per supervisor tick.** Ticks, notes, events, metrics and memory are written at once
  but committed together, once per 15-minute tick. The checker's writes ride in the same commit. Before: 2,024
  record-only commits in 7 days. The board on main can lag by up to 15 minutes.
- **2.2, the line form for a feature.** Section 4.1.
- **2.3, checks per batch, suite limit 900 s.** Section 4.3: the group is the batch, and a shorter red run is what
  makes a group cheaper to fail.
  *Withdrawn by Ines, 11-13: the 900 s limit is not to be built; the host-run limit stays at 1,800 s. Checks per
  batch stands. See efficiency-review.md A.0 item 3.*
- **2.4, a thin Operator.** The card is the packet. The Operator hands a worker the card and the rules that apply,
  and adds only what code cannot know; it does not read the task's files into its own thread to write a packet.
  Trimming ops/prompts/work.md (30,167 bytes) is a separate change to a company-owned prompt, not made here.
- **2.5, re-queue instead of a retry line.** Section 3.5.
- **2.6, a review line only for app code.** Section 3.5.
- **2.9, memory with the task's commit.** A worker writes memory only for a lasting lesson, and the file goes in
  the task's own commit, never alone. Before: 580 commits in 7 days touched a memory file.

## 4. The design: grouping, so fewer iPhone runs are needed

"The iPhone run" is the land's PyWidgetTests suite on the iPhone 17e Simulator, run on the MacBook. Three layers,
largest first.

### 4.1 The feature is the unit that runs on the iPhone (T-4116)

A feature is one task with one owner and an on-device done condition. It is built in longer sessions, one build
then test-without-building, a commit per step. Each step is checked by the Mac host checks and, in the session, by
the test classes for the area it touched. The feature merges as one piece, is reviewed once, and runs on the iPhone
once at its merge. A red at the end is found by `git bisect` over the feature's own step commits, inside its
session, not by land runs.

Measured base: 92 tasks drew the 118 iPhone verdicts of 11-06 to 11-12, 32 of them more than one (fit script,
section 1 of its output). Each ten lines folded into one feature remove nine land checks, nine merge tries and nine session starts
(efficiency-review.md 2.2). This is the big cut and it needs no arithmetic.

### 4.2 A pass is reused when the app's inputs did not change

An iPhone pass is kept under a key made from the files the app build reads. A rebase that touches none of them
reuses the pass. Code only; tools/check_cache.py already does this for the host suites. How many runs it saves is
not counted: the record holds the branch tip, not the app's input key (3 tips have more than one result).

### 4.3 App changes waiting at the land share one iPhone run, at a size chosen each time

What the records say (`python3 -I ops/plans/task-process-redesign-fit.py <land_xc.jsonl> --host <land_steps.jsonl>`,
main checkout's files, 7:5x AM 11-12):

- **iPhone step:** 124 results 11-06 to 11-12; 6 are runner errors with no run time and no verdict, left out. Of
  the 118 with a verdict, 81 passed and 37 failed (31.4%). A pass takes 384 s, a red 339 s (medians). Reds clump:
  a red follows a red 62% of the time and follows a pass 18%. By day the red share ran 94%, 50%, 6%, 38%, 24%,
  0%, 17%.
- **Nothing waits at the MacBook.** 106 of the 118 runs started with no other run behind them. The land takes one
  branch at a time and queues its iPhone run, so the waiting is upstream, in the merge line (211 tasks on 11-10 by
  merge_reset.py's header; built to merged took a median 9.1 hours for the 188 merged since 11-09,
  efficiency-review.md 2.2). So a group has to be formed by the land, from the branches waiting there. Grouping at
  the MacBook's own queue changes nothing (6.00 landed per slot-hour alone, 5.85 to 6.36 grouped).
- **Mac host step** (item 11's series, now 234 results): 26.5% red; a pass takes 405 s, a red 748 s. A red host
  run takes nearly twice as long as a pass.

The rule. For a group of size k at red share p the script computes the expected changes landed per hour of the
slot: k times (1 - p) changes, over the time of one group run plus, when the group is red, the runs needed to
settle it by halves (run the first half; a green half lands; a half known red and of size one needs no run), each
priced at the step's own measured pass and red times. The size is the k that makes that largest, never more than
what is waiting, never more than six (a bound I chose, so that one red group cannot cost a long run of settling). p is the red
share of the last five verdicts; five did best on this record, and the script prints windows of 5, 10 and 20 so
the choice can be looked at again as the record grows. Fitted for the iPhone step:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 4.3 App changes waiting at the land share one iPhone run, at a size chosen each…, scrolls sideways" data-n="2 3 4 5 6 7 8 9 10 11" style="--tw:747px" markdown="1">

| Red share | 2% | 5% | 8% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|---|---|
| Best size | 6 | 6 | 6 | 5 | 5 | 3 | 3 | 2 | 2 | 1 |
| Landed per slot-hour at that size | 38.4 | 26.1 | 19.7 | 17.0 | 12.8 | 10.4 | 8.8 | 7.6 | 6.7 | 5.9 |
| Landed per slot-hour alone | 9.2 | 9.0 | 8.7 | 8.5 | 8.1 | 7.7 | 7.2 | 6.8 | 6.4 | 5.9 |

</div>


With a window of five the rule reads in plain words: no red in the last five, up to six together; one red, three;
two or more, one at a time. Size one becomes best at a red share of 39.6%. There is no 10% line in it.

What it would have done, replaying the 118 recorded outcomes in their order on one slot with the line never empty:


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 4.3 App changes waiting at the land share one iPhone run, at a size chosen each…, scrolls sideways" data-n="2 3 4 5 6 7 8" style="--tw:717px" markdown="1">

| Policy | Runs | Slot hours | Landed per slot-hour | Mean wait for a verdict, min | Red groups | Extra runs per red group | Extra minutes per red group |
|---|---|---|---|---|---|---|---|
| Alone (as recorded) | 118 | 13.5 | 6.00 | 376 | 0 | 0 | 0 |
| Always 2 | 102 | 11.9 | 6.83 | 369 | 24 | 1.8 | 11.3 |
| Always 4 | 100 | 12.1 | 6.69 | 405 | 17 | 4.1 | 28.5 |
| Always 6 | 103 | 12.9 | 6.28 | 432 | 12 | 6.9 | 49.8 |
| Chosen from the last 5 verdicts | 90 | 10.8 | 7.50 | 314 | 6 | 5.0 | 37.5 |
| Chosen from the last 10 | 95 | 11.9 | 6.79 | 336 | 11 | 3.0 | 25.4 |
| Chosen from the last 20 | 90 | 11.1 | 7.32 | 318 | 8 | 3.4 | 29.4 |

</div>


So on this record the chosen size lands 13% to 25% more changes per slot-hour than one at a time, in 90 to 95
runs against 118, with a shorter mean wait. The measured cost of a failed group is the three right-hand columns.
The fixed sizes shown give 5% to 14%, and a longer wait at four and six. If a grouped run takes 10% longer for each extra member
(`--extra 0.10`; no grouped run has been timed), the chosen size gives 5% to 14% and fixed sizes of four and six
lose to alone.

The host step, same rule, its own times: every policy lost on the replay (5.23 landed per slot-hour alone, 4.07 to
5.14 grouped). That is item 11's finding again, and the long red run is the likely cause. So the rule carries
its own switch. Each day the daily sweep reruns the fit on the last 7 days of each step's record; a step is grouped
only while its replay beats one at a time. Today that turns the iPhone step on and leaves the host step alone. A
900 s suite limit (efficiency-review.md 2.3; 21 suite reds hit the 1,800 s limit in 4 days) shortens the red host
run, and the next day's fit decides again.

*Withdrawn by Ines, 11-13: no 900 s limit. The "21 suite reds" were one host run cut once and written on 18 rows; a
900 s limit would have failed a run that passed at 1,279 s. The daily fit still decides the host step. See
efficiency-review.md A.0 item 3.*

Three more rules, all from the record:
- A runner error (6 of 124) reruns the group once. It is not a red and is not split.
- The stop rule is the one runner_watch has: two tasks failing on the same first error at the same base hold the
  lands until main is green. No group is split during a hold.
- Changes whose Targets overlap do not share a group; they go one behind the other.

One point for the builder to settle with a week's numbers: the group's members can keep separate host checks on
main (cheaper; main_green.py is the net for two changes that break each other), or be stacked in order (safer; a
member that is dropped reruns the host step of those behind it). I recommend the stack, counting those reruns.

### 4.4 How the three layers add up, and where they do not

They draw on the same pool. When features are the unit there are far fewer app merges, so the line at the land
is short and the group in 4.3 has less to group. The feature is the large lever. The fitted group matters for the
single fixes that remain and for the days before features are in use. I am not multiplying the savings together.

## 5. Who builds what


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 5. Who builds what, scrolls sideways" style="--tw:937px" markdown="1">

| Part | Who | Notes |
|---|---|---|
| The card's slots in board_tick add, with refusals (3.1) | T-4103, Odalys | the Links field was added the same way last night |
| The checker: the sweep on each change and once a day, the fingerprint, the log, the daily reading and its cap (3.2 to 3.4) | T-4103, Odalys | the existing proofs are called, not rewritten |
| States in place of lines; the old keepers' runs stopped (3.5) | T-4103, Odalys | T-4012 already retires the retry routes |
| One records commit per tick; memory with the task's commit (3.6) | T-4103, Odalys | |
| The replay test against the ledger, then the dry run on the real queue | T-4103, Odalys; I read both | switched on after T-4101, as planned |
| The daily refit of the group size, written where the land reads it (4.3) | T-4103, Odalys | the script exists; it becomes a job of the daily sweep |
| The feature list: 10 to 15 features, each with its card and its checklist (4.1) | T-4116, Ines with Idris | its own task; posted on #41 |
| The feature session: one build, a commit per step, the touched test classes; one review and one iPhone run per feature merge (4.1) | T-4116, Idris | |
| The app's input key for reusing a pass (4.2); the grouped iPhone run at the land (4.3) | T-4116, Idris, with Odalys for the land | first two counts in section 7 |

</div>


Where a part touches a pipeline tool (dispatch.py, personal_land.sh, merge_queue.py, main_gate.py, supervisor.sh
and the others rule 62 lists), the patch goes to the audit-implementation session by a note on its line while
T-3992, T-3995 and T-3996 are open (ops/state.md), and lands in the day's one batch (rule 62).

Target dates, mine to hold or move in the open: the card and the replay test by Saturday 11-14; the dry run read
and the sweep on by Monday 11-16; features in use as T-4116's list is accepted; the grouped iPhone run on by
Wednesday 11-18 and measured for a week, to 11-25, before the freeze on 11-30.

*Moved by Ines, 11-13 (efficiency-review.md A.6): the card and the replay test by Monday 11-16; the dry run read and
the sweep on by Wednesday 11-18; the grouped iPhone run on by Friday 11-20 and measured to 11-27. No freeze date
follows: Restructuring decisions 1 and 2 were answered A on 11-13.*

## 6. What it should change, and how each is counted


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 6. What it should change, and how each is counted, scrolls sideways" style="--tw:960px" markdown="1">

| Measure | Before | After is counted by |
|---|---|---|
| Finished work still shown open | 56 of 383 judged lines (15%) | the daily log: lines whose done test passes and are open after the run; target none |
| Lines about other work | 208 of 684 open lines (30%) under the land's six fixed titles | open lines whose By is a tool; only main-red and flaky-suite lines remain |
| New lines a day | 239 a day, 11-05 to 11-12 | the same count by ID |
| Lines a model must read to keep the queue true | 805 for the audit (383 read so far) | the daily reading's row count; cap 40 a day |
| iPhone runs per change landed | 124 results for 81 passes, 1.5 | land_xc.jsonl, the same script |
| Changes landed per iPhone slot-hour | 6.00 | the same script; 6.8 is the low end of the fit |
| Record-only commits | 2,024 in 7 days | `git log`, the review's own filter; at one a tick, at most 672 |

</div>


## 7. What would make this fail, and what I could not measure

- **Done tests written to pass.** "file: exists" proves little. The guard: a feature's done test is on-device
  evidence a reviewer sees; code ticks only steps and plain tool work. The log shows the share of each kind.
- **Cards as ceremony.** A target of "pywidget/" passes the check and says nothing. The entry check should refuse a
  top-level folder; the daily reading flags the head of the queue for thin cards.
- **The fit is small.** 118 verdicts over 7 days, clumped. The window moved the gain between 13% and 25%. Every
  recorded red is taken as that change's own fault, which is wrong on a day when main or the runner was the cause.
  The daily switch is the guard: the rule must beat one at a time on the last 7 days or it is off.
- **A grouped run's real length is not measured.** The fit assumes the longest member's time. Time the first 20.
- **Two numbers T-4120 asked for are still not counted**: how often a change that was green in its own session
  goes red at the land, and how much of the 384 s is the build. The first decides how low the red share can go;
  the second decides whether running only the touched test classes is cheap. Both are code-only counts, for T-4116.
- **The daily reading's size at steady state is unknown** until the dry run.
- **The pipeline has one owner for now.** The grouped land waits on the audit-implementation session.
- **The Restructuring (T-4127) runs on account a and may cover the same ground.** I did not read its prompt in
  this task. If it changes the store or the board's form, the card moves with it; the checker's rules do not
  depend on where the slots live.

Not proposed: a new store for tasks, new stages on Home, a change to any rule or Handbook text, or a priority rule
(T-4104 has that).
{% endraw %}

</div>
