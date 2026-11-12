---
layout: "default"
title: "Efficiency review: what the company built into its own process that slows it down (T-4124)"
section: "documents"
description: "Every number below is measured from a file in the repository or the main checkout&#x27;s records, and says where it came from and how. Where a number does not exist I say so in section 5 and give the cheapest way to get it\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/efficiency-review.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/efficiency-review.md</code></span></div><h1>Efficiency review: what the company built into its own process that slows it down (T-4124)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-12, 12:37 AM to 1:0x AM ET, on <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a (Fable). Investor ask: an Investor #41 c6814496533, 11:25 PM ET 11-11,
words in ops/plans/efficiency-review-prompt.md. Part of T-4092. I recommend; T-4122 (task process), T-4116 (app
regrouping), T-4100/T-4103 (Links field, queue-check sweep) build. No tool, prompt, rule or board line changed here.

Every number below is measured from a file in the repository or the main checkout's records, and says where it came
from and how. Where a number does not exist I say so in section 5 and give the cheapest way to get it. Nothing is
estimated as if measured. Token counts use k = 0.4166 tokens per character, the fit in ops/metrics/worker-start-tokens.md.

## 1. The shape of the week (the headline)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. The shape of the week (the headline), scrolls sideways" style="--tw:960px" markdown="1">

| Measure | Value | Source and method |
|---|---|---|
| Commits on the repository, 11-05 to 11-12 | 3,383 | `git log --since=2026-11-05 --oneline \| wc -l` |
| ... that touched pywidget/ (the app) | 282 (8%) | `git log --since=2026-11-05 --format=%H -- pywidget/` |
| ... that touched tools/ or tests/ | 520 (15%) | same, `-- tools/ tests/` |
| ... that touched ops/ | 2,129 (63%) | same, `-- ops/` |
| ... that changed only records (board, events, memory, metrics, runs, notes, outbox, state) | 2,024 (60%) | `git log --name-only`, every path under a record prefix; by author: Operator 784, Odalys 601, Idris 262, machine 166 |
| ... that touched a worker memory file | 580 (17%) | `-- .claude/agent-memory/` |
| ... that touched ops/board.md | 685 (20%) | `--name-only` filter |
| App share of commits, by window | 19.4% (11-02..05), 7.4% (11-05..07) | ops/metrics/dispatch_stats.json `pywidget_share` |
| Finished tasks, all time | 3,457; [tools] 1,150 (33%), [build] 508, [research] 381, [review] 320, [plan] 240, [site] 190 | `grep -c '^- \[x\]' log/board-archive.md`, by kind tag |
| Open tasks now | 682; [tools] 275 (40%), [build] 141, [review] 80, [site] 67, [ops] 40 | `grep -c '^- \[ \]' ops/board.md`, by kind tag |
| Tool and test code | 479 tool files, 128,898 lines; 523 test files, 115,656 lines | `ls tools \| wc -l; cat tools/*.py tools/*.sh \| wc -l`; same for tests/ |
| Board file | 489 KB; runnable view 248 KB (670 lines) | `wc -c ops/board.md`; `python3 tools/board.py open 400 \| wc -c` |

</div>


Reading: the process has become most of the work. Six of ten commits change nothing but records, and under one in
ten touches the app. The rest of this review is about why, with the cost of each cause.

## 2. Ranked: what can go or change

Ranked by measured cost today. Each item: what it is, the cost, what the change saves, what it risks, who does it.

### 2.1 Records committed one at a time onto main (highest cost)

What: every tick, note, memory write, event and metric row is its own commit on main (board_tick, events.py, memory
hand-backs, the supervisor's "lane records applied"). The land pipeline treats every move of main as a reason to
re-check or re-queue waiting work.

Cost (measured):
- 2,024 record-only commits in 7 days, 60% of all commits (section 1).
- Main moved 491 times in the day measured 11-08/09, "most of those small bookkeeping commits, not merges"
  (ops/runs/t3963-throughput.md, main moves = reflog entries).
- 45 of 129 failed land tries that day stopped at the first step on a newer main; 25-minute test runs were thrown away
  "mostly because the main copy changed under them", 3.4 hours of the day's 16.5 lock-hours (t3963, "Where the merge
  time goes").
- Record files are excluded from conflict counting in the land (ops/runs/<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>-groups.md method step 2), so these
  commits cause re-checks, not conflicts: 0 of 36 pre-check conflict rows name a memory, board or events file
  (`grep -i conflict` on the main checkout's ops/runs/land_prechecks.jsonl).

Saves: one records commit per supervisor tick (every 15 minutes, tools/supervisor.sh line 2) instead of ~290 a day
would cut main's moves by the record share (60% of 491, about 290 a day) and with them the re-checks they trigger: up
to 3.4 lock-hours a day on the measured day, and the first-step send-backs.
Risks: the board and events lag main by up to 15 minutes; a lane reading the board sees a tick late. The lane outbox
already queues ticks (T-1154 in my notes), so the mechanism exists.
Who: T-4122 (how a task line is kept) with Odalys; the supervisor's records step is Odalys's.

### 2.2 One task per board line for app work (T-4116)

What: app work is cut into 45-minute lines, one line per change, each with its own session, land check, merge try
and review line.

Cost (measured):
- 847 app tasks had commits under pywidget/ since 10-29; median 1 commit per task, 59% exactly one
  (`git log --since=2026-10-29 --format=%s -- pywidget/`, T-IDs counted).
- Each line pays a fresh session: first model call 24,298 tokens median (ops/metrics/worker-start-tokens.md, n=5
  after 11-08; 30,452 before), re-read on every later call. In the one session stream I parsed (main checkout
  ops/runs/20261111-221723-work.jsonl, 774 model calls), a worker thread made 96 calls (median of 5 threads), so the
  fixed start prompt alone is about 2.3M of a thread's 4.86M context tokens (median), 49%.
- Each line pays its own checks: host suites 280 s and the unit target 134-189 s in a worktree (tools/personal_land.sh
  header, n=1 each); a MacBook land job median 383 s (112 timed results, 12.8 hours in all, main checkout
  ops/metrics/land_xc.jsonl); 36 of 118 results failed and 6 errored (36% not green). Median 2 MacBook jobs per task
  (109 tasks, 298 jobs queued).
- Each line waits: being_built to merged median 30.9 h all time (n=608), 9.1 h for the 188 merged since 11-09
  (main checkout ops/metrics/flow.jsonl, first being_built to first merged per task).
- On 11-09, 268 sessions started for 2.29 new changes an hour: 0.21 new changes per session (t3963 rates table).
- Landing rate: 46% of land attempts landed 11-02..05, 24% then 36% in the two days after (dispatch_stats.json
  `landing.rate`).

Saves, per ten lines folded into one feature: nine session starts (about 9 x 2.3M fixed-prompt tokens re-read over a
thread's life, about 21M), nine land checks (about 9 x 10-15 min of Mac time), nine merge tries at a 24-46% rate, and
nine waits. The Xcode build happens once per feature session, then test-without-building.
Risks: a bigger diff to review and a red found at the end costs more to bisect; a commit per step (T-4116's proposal)
keeps each step bisectable. A feature session that runs long needs the stale-reading fix already in dispatch.py (T-3707).
Who: T-4116 (Ines with Idris) for the grouping; T-4122 for the line form.

### 2.3 Checks on work that then does not merge

What: every parked branch is checked (host suites, unit target, MacBook) before its merge; most checks are wasted.

Cost (measured):
- 12.9 of 16.5 lock-hours on the measured day went to checks on work that did not merge; the 47 that merged took
  3.4 hours in all (t3963 "Where the merge time goes").
- The main gate ran 1,493 suite passes in 4 days (ops/metrics/main_gate.jsonl, 11-07 to 11-12), 7.0 suites per
  change (213 distinct task+tree pairs); the app host suites take 287-680 s each (median per suite, 114 timed rows).
- 21 suite reds hit the 1,800 s limit, 10.5 hours in 4 days, 10 of them pywidget host suites (same file, `seconds`
  = 1800.1).
- Land lock idle 7.5 of 24 hours while work waited, 3.72 h of it holding for the head of the line's check
  (ops/runs/t3974-idle.md; fix written there).
- A 30-minute re-check gets thrown away when main moves (2.1 above).

Saves: checks once per batch (tools/park_batch.py exists) and a gate keyed on the batch cut the per-line checks by the
batch size; a 600 s suite limit instead of 1,800 s <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> a hung suite at a third of today's loss (10.5 h would have
been 3.5 h). T-3974's "take the next finished branch" fix recovers up to 3.7 idle hours a day.
Risks: a red batch needs a bisect; a shorter limit fails a slow but honest suite (the longest green app suite median
is 680 s, so 600 s is too tight for that one; 900 s fits every measured green).
Who: Odalys (T-4103 sweep, park_batch); T-4122 for the gate-per-batch design.

### 2.4 The Operator's own context

What: the company-account work session runs as one long thread that reads files itself and does much of the work in
its own context instead of handing it out.

Cost (measured, one session, main checkout ops/runs/20261111-221723-work.jsonl, 10:17 PM to 12:1x AM 11-11/12):
- 774 model calls read 79.6M context tokens; the Operator's own 269 calls at a median 136k context (max 196k) read
  35.6M, 45% of the session. Five worker threads read 24M between them.
- 372 Bash calls, 14 Reads, 5 Agent calls. Tool results into the Operator's context: 637 KB; the largest single read
  was a 34.6 KB plan file, then two 19 KB and 12 KB session logs.
- Work runs cost $26.70 each on list basis, $2,085 for 78 runs in 7 days (sum of total_cost_usd over
  ops/runs/*-work.json, 11-05 to 11-11); inbox, morning, evening and weekly runs together $64 over the whole project.
- The work prompt itself is 30,167 bytes (ops/prompts/work.md), about 12,600 tokens, read into every work session.

Saves: keeping the Operator thread thin (hand reading and building to workers; a packet is 1,250 tokens) and shorter
sessions would put each call at a worker's 25-87k context instead of 136k. On this session that is up to half the
company-account tokens. Trimming work.md's 27 numbered sections to what a session must know saves a fixed 12.6k per
start.
Risks: a thin Operator forgets; ops/state.md already carries state across sessions. Shorter sessions lose nothing
measurable: the done-to-next-start gap was median 8 minutes (n=6, ops/runs/t3980-baseline.md).
Who: T-4122 for the packet and prompt form; the Operator's prompt is company-owned (ops/prompts).

### 2.5 Machine-made retry, redo and "look" lines

What: a failed land, a stale flag or a send-back writes a new board line, each a new session later.

Cost (measured): 111 of 670 runnable lines mention a retry (`board.py open 400 \| grep -c retry`), 18 lines are
owned "Look"; flow.jsonl holds 430 sent_back and 210 reset events; 363 of 1,777 tasks (20%) needed two or more tries,
44 needed four or more.
Saves: a failed land that re-queues the same branch (the ledger's merge pointer, T-4100) instead of writing a line
removes the session a retry line costs (2.2 above, per line).
Risks: a real failure hides behind a silent re-queue; the sweep's log (T-4103) is the record.
Who: T-4092 ledger (Ines), T-4100/T-4103 (Odalys), T-4122 for the rule.

### 2.6 A review line for every change, app or not

What: changes get a separate [review] line and session.

Cost (measured): 320 finished [review] lines (9.3% of finished tasks), 134 of them on tools/, tests/ or site/ by
their text; 80 open now, 9 of them on the app (grep on log/board-archive.md and ops/board.md). Commandment 13 asks
for an independent review only of code headed to TestFlight or the App Store; the rest is "as your manager chooses".
Saves: no review sessions for tools and site changes (tests/run.sh is their guard): about four in ten review sessions
by the archive's ratio.
Risks: a tools regression that tests miss reaches main; the gate's suites (2.3) are the net.
Who: Ines (a Handbook note, no rule change); T-4122 for the line form.

### 2.7 Xcode runs: failed builds and one-test runs

Cost (measured, main checkout ops/metrics/xc.jsonl, 1,741 rows, 10-26 to 11-09): 48.8 build-hours; 585 runs exited
65, 568 of them with no test run (failed builds, 33% of all runs); of 930 test runs, 710 (76%) executed 5 tests or
fewer (median 1 test), each a full xcodebuild launch at a median 31 s plus Simulator setup (51 minutes summed);
6.2 hours waiting on the machine's lock. 1,327 of the runs (76%) were 10-26 to 10-29; since 11-05 the Mac mini runs
10-20 a day and the MacBook takes land checks (2.2).
Saves: one build per feature session then `test-without-building` for each step (2.2) removes the repeated launches;
a build that fails never reaches the Simulator, so the 33% is a worker habit (build before every test), not a tool.
Risks: none measured; xc.sh already keeps the log and the lock.
Who: T-4116 (feature sessions); Idris for the habit.

### 2.8 Simulator and lane disk

Cost (measured, `du -sm` per device under ~/Library/Developer/CoreSimulator/Devices, names from device.plist; use
counts from xc.jsonl `sim.use`): 32 GB in 15 devices. iPhone 17e 13.8 GB (105 runs), iPad Pro 11-inch 6.2 GB
(4 runs), iPhone 18 Pro 4.2 GB (28), T3783-idris 3.4 GB (a per-task clone, no run of its own recorded), pywidget-wk-check
2.8 GB (18), iPhone Air 2.4 GB (2), nine others at 18 MB each. Scratch: /private/tmp/company-scratch 19.9 GB in 114
items. Lanes: 189 worktrees under ~/company-personal (93 a, 96 b), each with a full tree; the six I sized are
2.19-2.24 GB each (lane a, a2, a3, b, b2, b3). Disk keeper: 200 runs, 3.4 hours of step time, net 18.4 GB freed
(ops/metrics/disk_keeper.jsonl).
Saves: deleting the four little-used devices (iPad Pro 11, T3783-idris, iPhone Air, pywidget-wk-check unless the
check needs it) frees about 15 GB of the 32; worktrees for slots that never run (three slots x two accounts are in
use; the rest serve park_batch's sparse checkouts) are the larger sum, not measured here (section 5).
Risks: a deleted device a test names fails until recreated (`xcrun simctl create` takes under a minute).
Who: Odalys (disk keeper); the Investors need not act.

### 2.9 Memory written and committed per task

Cost (measured): 580 commits in 7 days touch a worker memory file (17% of commits); each worker call reads its
MEMORY.md, 1,552 tokens median (worker-start-tokens.md), about 3% of a 96-call thread's context. Files are
3,495-4,048 bytes (`wc -c .claude/agent-memory/*/MEMORY.md`).
Saves: a memory write only when there is a lasting lesson (Rule 13 already says so) and committed with the task's
own commit, not alone, removes most of the 580 commits (they fold into 2.1).
Risks: a lesson lost when a worker skips the write; low, the lessons are also in done-notes.
Who: T-4122.

### 2.10 Process tools that serve the process

Cost (measured): section 1. 1,150 of 3,457 finished tasks and 275 of 682 open ones are [tools]; tools/ and tests/
are 245k lines; the app got 8% of the week's commits. Each tool also carries tests the gate runs (2.3).
Saves: a freeze on new process tools unless an Investor asks or a measured number names the saving, and the T-4092
ledger removing open [tools] lines that do not serve the app, cut the queue and the gate's suite count together.
Risks: a known slowdown stays unfixed; this review is the list to fix from.
Who: Ines (T-4092 ledger and this review); the Investors for the freeze if they want one.

### 2.11 Things measured and found cheap (stay)

- Hooks: four PreToolUse hooks (protect-records, security-guard, ssd_guard, main_folder_guard) at 0.01 s each, timed
  three runs each with a sample Bash input; 372 Bash calls a session is about 15 s. Nothing to save.
- Tool latency: `board.py lanes` 0.4 s, `board.py count` 0.1 s, `dispatch.py order` 2.2 s, `board_tick --help` 0.1 s.
- Lane slot idle: 75 minutes an hour on 11-05 (ops/metrics/opt104_slot_idle_xmr.json center), 2.9 after the OPT-104
  change at 9:00 PM 11-05 (change_at mean). Fixed.
- Dispatcher silent hours 11-06 10:00 PM to 11-07 9:00 AM: the weekly usage limit, not the process
  (dispatch_clean_48h.json silent_hours).
- Inbox, morning, evening, weekly runs: $64 all time against $6,742 for work runs (sum of total_cost_usd).

## 3. Direct answer 1: is passing tasks to named workers a useful structure, and the one-line slicing?

Yes to the structure; no to the slicing.

The hand-off itself is cheap and the alternative is dearer, by the one session measured (2.4): the Operator's own
calls ran at a median 136k context, a worker's at 25k to start and a median peak of 87k. A task done inside the
Operator's thread costs more per call than the same task in a fresh worker thread, and the Operator's thread already
takes 45% of a session's tokens while making 5 hand-offs and 372 Bash calls. The hand-off overhead is a 1,250-token
packet (worker-start-tokens.md), a done-note, and a median 8-minute gap from done to next start (t3980, n=6). No
worker ever spawned another (166 threads, 0 Agent calls, worker-start-tokens.md finding 1), so the structure is one
level deep. So: keep handing tasks to workers; make the Operator hand out more and read less.

What is wasteful is the slicing (2.2): a session start costs about 2.3M context tokens over a thread's life for the
fixed prompt alone, and a land check, a merge try and a wait go with every line; 59% of app tasks were one commit.
T-4116's feature umbrellas with a commit per step are the right change. The cost of a session is in its start and its
checks, not in who is named on it.

## 4. Direct answer 2: do names and personalities cost anything measurable?

They cost something, and it is small. The persona files are 1,941 to 4,381 bytes (17,469 for six,
`wc -c personnel/agents/*.md`), about 800 to 1,800 tokens: 3-7% of a worker's 24,298-token first call, and since the
first call is re-read on each of about 96 calls in a thread, about 2% of a worker thread's context tokens. Wall-clock
time: nothing measurable (the persona is text in a cached prompt). Simulator disk and Xcode runs: zero.

The parts of the "named worker" structure that cost more than the name are the memory file (1,552 tokens a call, 3%
of a thread, and 580 commits a week, 2.9) and the rules block (3,811-4,700 tokens with the persona). A nameless
worker would still need a role and rules, so the saving from dropping names alone is under 2% of worker tokens and
0% of time, disk and Xcode. Story upkeep is not a cost now: 0 commits under story/ in 7 days (51 diaries exist, none
this week). Claude Code's own base prompt is 16,500 tokens, 68% of the first call, and the company controls only its
tool list (the T-3423 proposal to drop the Agent tool from workers saves an estimated 2,000-3,300 a call, not yet
measured).

So: the names stay. If the Investors ever want the story gone, the saving to count is the per-task memory
write-and-commit, not the name.

## 5. What I could not measure, and the cheapest way

1. Lane sessions' own tokens (the lane Operator's share against its workers'): the lane streams sit in each account's
   state folder, refused by design. Cheapest: `tools/worker_start_tokens.py measure` already reads the company
   account's streams; point it at a copy the tick exports with only counts and sizes (no text) into ops/metrics/.
2. The sum of the 189 lane worktrees on disk: six sampled at 2.2 GB each; `du -sm ~/company-personal/*` over all
   189 did not finish inside this task's time. Cheapest: that command once, in the disk keeper's log.
3. The lane Operator's prompt cost: lane.md is 9,870 bytes (about 4,100 tokens) plus CLAUDE.md 7,992 bytes; the
   first-call size of a lane session is not in any readable record. Same fix as 1.
4. Hours lost to the 30-minute suite limit outside the main gate (the land's own runs): ops/runs/personal-land-*.log
   files hold it; a grep for "exit 143" with timestamps is the cheapest count.
5. The real usage of the plan accounts in dollars: the meters are the Investors'; list-basis cost is what the records
   hold ($6,742 for 326 work runs all time).
6. Simulator setup time per run before 11-08: `sim_setup_s` exists on 157 rows only.

## 6. Hand-offs

- T-4122 takes in: 2.1 (one records commit per tick), 2.2 (line form for feature umbrellas), 2.3 (gate per batch,
  suite limit 900 s), 2.4 (thin Operator, packet and prompt form), 2.5 (re-queue instead of a retry line), 2.6
  (review line only for app code), 2.9 (memory with the task's commit).
- T-4116: 2.2 and 2.7 (one build per feature session).
- Odalys: 2.3 (park_batch, T-3974 fix), 2.8 (devices and worktrees).
- Ines: 2.6 Handbook note, 2.10 through the T-4092 ledger.
{% endraw %}

</div>
