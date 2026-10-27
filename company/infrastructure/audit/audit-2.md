---
layout: "default"
title: "Audit 2: losses in the work session that started 2026-10-25 23:48"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/audit-2.md</code></span><span>2026-10-26</span></div><h1>Audit 2: losses in the work session that started 2026-10-25 23:48</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-029">OPT-029</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-031">OPT-031</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-26 01:18 ET. Continuous operations improvement (#41 c6407113363). Window: the session's first record
(23:48:25) to 01:05:00, when the Operator refilled the pool after the Investors asked why on #41 (01:04). The session
was still running when this was written; nothing after 01:05 is counted.

Every session number comes from one command and rebuilds byte for byte (checked with `cmp`):

    python3 tools/audit_session.py --run 20261025-234823 --split 00:32 --until 2026-10-26T01:05:00-04:00 \
        --json ops/metrics/audit-2/session.json

Raw output: `ops/metrics/audit-2/session.txt` and `session.json`. The tool is new (session-scoped; it reuses
tools/audit_losses.py's stream reader, prices and carry-cost method, so units match audit 1). Test:
tests/audit_session_test.py 16/0; three single-site mutations, all caught. Other sources, each named where used:
ops/runs/test-runs.jsonl, ops/runs/xcodebuild-*.log, ops/usage.json, git (85 commits d99f2856..HEAD), and
tools/inbox_latency.py --fetch (GitHub comment times). No report, diary, memory or state.md text was used as evidence.

Session totals: $113.66 list-priced (Operator $10.09, 8.9%), 51 top-level agent runs, 2,199 tool calls.
Usage and hours are ranked separately, as in audit 1.

## The five largest losses


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The five largest losses, scrolls sideways" data-n="1" style="--tw:776px" markdown="1">

| Rank | Loss | Unit | Number |
|---|---|---|---|
| 1 | Pool not refilled from 00:26 (the "about 30 turns" close rule) | hours | 3.70 agent-hours under target in 33 min |
| 2 | Pernille's calls stop at 40 turns and are resumed | usage | $5.24 (4.6% of the session) |
| 3 | Reading the board | usage | $2.01, 114,279 tokens |
| 4 | Shared working tree: git state reads, denials, relayed notices | usage | $1.97 carry, plus 2 classifier denials and 9 relayed notices |
| 5 | One Xcode task at a time | hours | 0.38 task-hours waiting for the slot; slot busy 47% of the time it was held |

</div>


### 1. The pool emptied while P1 work was runnable: 3.70 agent-hours

- **Number.** 23:48-00:32: mean 9.41 agents, $145.8/h. 00:32-01:05: mean 1.27 agents, all 33 minutes under 3,
  $14.1/h. Agent-hours under the target of 8: 3.70 in those 33 minutes against 0.87 in the 44 before. At the first
  window's rate (47 agent runs finished in 6.9 agent-hours), the gap is about 25 task runs not started.
- **Cause.** Limits did not stop it: run.json at 23:48 showed five_hour 10% (hold 90%), work_allowed true, $212 of
  the day's share left. The Operator started no board task after 00:21 and at 00:32 wrote its session note to close, under work.md's "Stop when ... you have
  used about 30 of your turns" (its own account on #41 at 01:05). It woke at 00:41, 00:43 and 00:46 for Investor
  messages and started only the two tasks those messages asked for (00:41 T-0092's
  OPT-030 start after #65's approval; 00:46 T-0127). Runnable P1 lines in that window: T-0112, T-0113,
  T-0116, T-0118, T-0122, T-0123, then T-0124 (first named in the stream between 00:14 and 00:41). The rule's unit
  cannot be observed: Claude Code counted 4 to 10 turns in each of the last 8 work sessions (ops/usage.json), while
  the Operator had made 151 model calls by 00:32. The rule's reason (a long thread re-sends its history) is real
  but small: the Operator's median call cost rose from $0.040 (calls 1-60) to $0.069 (after 120).
- **Detection.** The pool fell under 8 at 00:26 and under 3 at 00:32; the Investors asked at 01:04, 32 minutes
  later. No company check watches the
  pool during a session.
- **Change.** Proposal `log/audit/proposal-close-rule.md` with the exact diff (`proposal-close-rule.diff`, applies
  to HEAD): stop starting tasks only when nothing is runnable, when run.json's limits say stop, or 120 minutes
  into the session (the supervisor's hard stop is 150); refill on every wake until then. Same change in
  setup/OPERATIONS.md section 5 step 5.
- **Metric.** Agent-hours under target per session hour, minutes 0-110 (tools/audit_session.py). Predicted median
  at or under 1.0 while the board holds 8 or more runnable lines (this session 3.6). Window n=8 work sessions, xmr.
- **Revert.** A work session stopped by the 150-minute timeout, a report session that misses its slot, or Operator
  cost above $15 per session hour (now $7.9) with no rise in tasks finished.
- **Auto-apply (#65, 00:39 ruling)?** No: needs "approve". The sentence is the Investors' own text (initial commit
  2e170607, and setup/OPERATIONS.md), so condition 4 excludes it.

### 2. Turn-limit stops: $5.24, all Pernille

- **Number.** 6 stops in 5 tasks, every one Pernille's (T-0056, T-0020 twice, T-0055, T-0098, T-0049): 5 of her 5
  calls. Each resume came 4-31 s after the stop, so the loss is not idle time: the resumed agent rebuilds its
  context as a cache write of 73k-150k tokens, $0.59-$1.21 per resume, $4.92 in all, plus $0.32 of Operator calls.
  Three resumes told her to "commit the green subset", so part of each task moved to a later line. Since her hire:
  10 stops in 3 work sessions; 0 for every other persona.
- **Cause.** rules/build_agents.py gives a persona without a `maxTurns` line 40 turns. The other five persona files
  have said 150 since 2026-10-23 (19537e74); hers (written at her hire, e18174a7, 2026-10-25 20:00) has no line.
- **Change (made, company file).** `maxTurns: 150` in personnel/agents/pernille.md. New guard
  tests/persona_turns_test.py: every persona file must name maxTurns 150 or more (it fails on HEAD's pernille.md).
  The builder picks it up at the next tick. Ledger OPT-031.
- **Metric.** Turn-limit stops per Pernille task call. Predicted 0 over n=10 calls (before 6 in 5).
- **Revert.** A Pernille run past 100 model calls that ends with no commit, or her median $ per task call more than
  twice this session's with no fewer follow-up lines.
- **Open, not changed.** Her file also has no `effort` line, so she runs at medium where the other five say high.
  That is the persona owner's call (Ines); board line added.

### 3. Reading the board: $2.01

- **Number.** 114,279 tokens of board text entered context ($2.01 carry, audit 1's method). Audit 1 measured a
  median 39.6k tokens per work session; this one was nearly three times that, with 51 agent runs, most of which
  grep or tick the board.
- **Change.** None new. OPT-029 (board archive each tick, started 00:10, due 10-28) and the runnable-only view
  (audit 1, loss 5, a work.md proposal) already target it. This session is OPT-029's first data point.

### 4. Shared working tree: $1.97 plus friction

- **Number.** 194 `git status`/`git diff` calls (149,579 result tokens, $1.97 carry) and 30 private-index commits,
  in 2,199 tool calls. Two classifier denials, both on shared state: Pernille's `git checkout -- premade.py`
  while Maren's T-0090 was redrawing that file ([Irreversible Local Destruction], 00:07), and Idris rewriting
  ops/board.md from a script ([Modify Shared Resources], 00:24). One private-index patch failed on
  tools/site/documents.py (00:02; another task had committed a line in it). 9 Operator SendMessages went to running
  agents, most of them notices that another task had changed something they depended on.
  Repair commits in the session: 0 (audit 1: 10 in Days 1-4), so commit_paths is holding.
- **Cause.** Two concurrent tasks were given the same file: T-0020 (renames across pywidget_ui and the premades)
  and T-0090 (premade 8 redraw). work.md already says to group only tasks that touch different files; packets do
  not list their files, so the overlap is not checked.
- **Change.** No prompt change yet: the measured cost is small and Idris's worktree trial
  (log/audit/trial-worktree.md) is the structural fix. Next measurement: tools/shared_tree_incidents.py reads only
  a date in --since/--until (it counted 638 commits for this 77-minute window), so a session-scoped run needs a
  time-aware window first.

### 5. One Xcode task at a time: 0.38 task-hours

- **Number.** Two Idris tasks held the Xcode slot 23:51-00:29 (T-0057 to 00:21, T-0097 to 00:29). xcodebuild ran
  25 times for 1,067 s, 47% of the 38 minutes held. Xcode lines waiting while the slot was held: T-0097 6 min,
  T-0112 10 min, T-0116 7 min, so 23 task-minutes. After 00:29 the slot was empty with T-0112, T-0116 and T-0122
  (P1) runnable; that wait is loss 1's, and after 01:05 it is the Investors' order (process work first, #41 22:55).
- **Cause.** work.md: "at most one task at a time that builds with Xcode or runs the Simulator (16 GB)". No
  measurement backs the limit: memory pressure during builds has never been recorded.
- **Change (made, company file).** tools/xc.sh now writes one line per build to ops/metrics/xc.jsonl: seconds,
  exit, how many other xcodebuild processes ran at its start, swap used and free memory before and after. A
  failure there never changes the build's status (tests/xc_metrics_test.sh 5/0). After 20 builds, I propose (or
  not) a two-slot rule with the numbers. No ledger entry: this change collects evidence and predicts nothing.

## The Operator's candidates, verified

1. **Five agents hit the 40-turn limit.** Confirmed: 5 tasks, 6 stops, all Pernille; $5.24. Loss 2.
2. **Pool not refilled after about 00:40 under the 30-turn rule.** Confirmed, and earlier: the pool fell under 3
   at 00:32 (under 8 from 00:26); between 00:21 and 01:05 the Operator started only the two tasks Investor
   messages asked for. Loss 1.
3. **Investor-message-to-reply latency.** Not a loss in this session: 14 messages since 22:49, median 0.8 min to
   the reply, max 2.6 min (#64 at 00:31), all answered (tools/inbox_latency.py --fetch). The latency that cost
   time was detection (loss 1).
4. **Partial-commit collisions.** Confirmed as friction, small in dollars: 2 denials, 1 failed patch, 0 repair
   commits. Loss 4.
5. **Xcode serialisation.** Confirmed but smaller than it looked: 0.38 task-hours of waiting while the slot was
   busy. The 30 minutes the Operator saw was one task holding the slot, with xcodebuild running 47% of it. Loss 5.

## Ranked 6 and below


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Ranked 6 and below, scrolls sideways" data-n="1" style="--tw:791px" markdown="1">

| Rank | Loss | Number | Source |
|---|---|---|---|
| 6 | Red test runs | 12 of 28 runs red, 2,288 s of wall time in red runs. 3 were supervisor_test.sh past its 240 s limit (fixed 00:46, b21ae602); 5 named composer_test.py, other runs' red suites belong to files other tasks were editing. Not attributed per run, so not ranked | ops/runs/test-runs.jsonl |
| 7 | Writing memory | $0.76, 29,084 tokens | session.json reads |
| 8 | Model-guard refusals at 23:51 | 3 Agent calls refused for their kind tag ([site] twice, [ops] once) and re-sent within a minute; seconds, not dollars | stream |
| 9 | Reading ops/state.md | $0.27 | session.json reads |

</div>


## Changes in this audit


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Changes in this audit, scrolls sideways" style="--tw:1057px" markdown="1">

| Change | Where | Ledger | Tests |
|---|---|---|---|
| tools/audit_session.py, session-scoped loss audit | company | (measurement tool) | tests/audit_session_test.py 16/0 |
| Pernille maxTurns 150 | personnel/agents/pernille.md | OPT-031 | tests/persona_turns_test.py 6/0 |
| xc.sh build evidence line | tools/xc.sh | (evidence only) | tests/xc_metrics_test.sh 5/0 |
| Close rule by time and limits | ops/prompts/work.md, setup/OPERATIONS.md | proposal, needs approve | git apply --check |

</div>


## Correction, 2026-10-26 01:41 ET (Odalys, T-0141)

Section 4 said tools/shared_tree_incidents.py "counted 638 commits for this 77-minute window": the tool then read only
the date in --since/--until. It now takes ISO times (ops_metrics.ts, the parser audit_session.py uses; window
[since, until), committer time; tests/shared_tree_incidents_test.py 21/0, four mutations caught). Re-run on the
audit window:

    python3 tools/shared_tree_incidents.py --since 2026-10-25T23:48:25 --until 2026-10-26T01:05:00-04:00

Result: 78 commits (git log over the same bounds agrees: 78), repair 0, sweep 0, amend 0, amend_x 0, lockerr 0,
rate 0.0 per 100. The section's finding stands (repair commits in the session: 0); its denominator was wrong.
The intro's "85 commits d99f2856..HEAD" is a different range (to HEAD at writing time, after 01:05) and is not
changed. Two notes on the tool's frozen classes, not changed here (that needs a dated note in
log/audit/trial-worktree.md): "private" counts only stage_hunks reflog entries, so the window's 15 commit_paths
commits show as 0 (section 4's 30 private-index commits come from audit_session.py's tool calls); and the lock
regex also matches text that quotes it (a 01:09 line in this run quoted the lockerr definition). Both lock lines in
the run's transcript fall after 01:05. The reflog also holds 138 "pull --rebase --autostash" entries in the window.
{% endraw %}

</div>
