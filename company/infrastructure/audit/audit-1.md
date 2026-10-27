---
layout: "default"
title: "Audit 1: where the company loses usage and hours (OPS-2)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/audit-1.md</code></span><span>2026-10-26</span></div><h1>Audit 1: where the company loses usage and hours (OPS-2)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-25 23:09 ET. Asked in #41 c6407113363 (item 3). Window: from the first transcript (2026-10-22 01:28 ET) to the request, 2026-10-25 22:49 ET.

Every number below comes from one command, and rebuilds byte for byte (checked twice with `cmp`):

    python3 tools/audit_losses.py --until 2026-10-25T22:49:00-04:00 --json ops/metrics/audit-1/audit.json

Raw output: `ops/metrics/audit-1/audit.txt` and `audit.json`. GitHub timestamps: `ops/metrics/audit-1/github.json` (numbers, logins, times and labels only; no titles or bodies). Test: `tests/audit_losses_test.py`, 40 checks; two deliberate mutations both failed it. Transcripts are read from ops/runs/ and ops/runs-archive/ (OPS-1 compresses there), so the figures still rebuild after archiving. The method is in the script's docstring. Sources: 147 transcripts (ops/runs/*.jsonl), ops/runs/supervisor.log, git (2,420 commits), GitHub (61 issues, 320 comments), and the usage meter. Reports, diaries, state.md text and memories were not used as evidence. Their sizes in git were measured, because their size is the cost.

Units. Usage is list-priced dollars from the transcripts (tools/governor.py prices). The meter puts this week at **$17.58 per 1% of the weekly limit** (0% to 19% between 03:04 and 22:09 today). Transcripts total $1,711.08. The meter's plan cost is $1,837.87 at 22:09, so the transcripts explain 93% of it (baseline gap 1). Tokens of a tool result = characters x R. R = 0.495 tokens per character, calibrated from the transcripts themselves (context growth after single-tool calls, n=5,799; Read results 0.42, Bash 0.49). Treat token figures as ±15%.

## The five largest losses

Ranked within each unit: hours first, then usage. Ranking dollars against hours would need a rate the evidence does not give.

### 1. Work waiting on Investor decisions: 390.5 task-hours

- **Number.** 26 board tasks spent 390.5 task-hours marked `[b] (waiting on #N)`. 258.4 h of that (66%) waited on the six pitch decisions #7, #14, #15, #16, #17 and #20. On GitHub, 14 urgent questions waited a median of 20.3 h (sum 248.4 h, max 68.8 h on #29). 16 pitch issues stayed open a median of 72.5 h, because the product choice came in #41 and not in a pitch issue.
- **Source.** The board's git history (503 commits) via `ops_metrics.blocked_hours`, plus GitHub created_at times.
- **The company's own share.** Investor answer to company reply: median 0.35 h (n=9). Answer to the first commit naming the issue: median 0.54 h (n=6), max 15.29 h (#40). The wait itself is the Investors' time. It is reported here as a loss, not as a request (#23).
- **Experiment.** *Hypothesis:* the 15-hour outlier came from an answer that reached the inbox while nothing flipped its `[b]` line. If `requests_close.py sweep` unblocks every `[b]` line naming #N in the same inbox session the answer lands, no answer waits for a later session. *Metric:* hours from the Investor's answer to the first commit naming #N. *Predicted:* p90 at or under 0.5 h and no case over 2 h (now p90 0.64 h, max 15.29 h, n=6). *Window:* the next 8 answered questions. *Revert:* if any line is unblocked by an answer that did not settle it, or if 8 answers show no fall.

### 2. Calendar hours with no session running: 32.7 h of 94.3 h (35%)

- **Number.** Sessions covered 61.56 h of the 94.26 h span. The supervisor log gives the reason for each gap:
  - daily share spent: 15.93 h. Today's share was gone at 08:04, so nothing ran from 08:51 to 18:07.
  - between ticks, no reason logged: 11.25 h. Across all 99 gaps the median is 15.0 min.
  - git sync failed: 4.39 h. The chain needs a clean sync.
  - session failed or stopped: 0.70 h.
  - hold: 0.45 h.
- **Source.** Transcript first and last timestamps, merged into one timeline, plus supervisor.log lines inside each gap.
- **Designed vs observed.** supervisor.sh section 13 starts the next tick at once after a clean work session. That needs `SYNC_OK=1` and `RUN=work`. The log has 81 failed syncs and 127 "another run is in progress" lines. Observed, the common gap is the full 15-minute tick.
- **Experiment.** *Hypothesis:* most gaps with no logged reason are chains that ended on a failed sync or after an inbox session. Chaining whenever runnable work and budget remain will close them; a failed sync still alerts but no longer ends the chain. *Metric:* median gap between sessions when no hold reason is logged. *Predicted:* 15.0 min down to 3 min or less, which puts no-session time outside the daily share and holds under 3% of the span (now 16.6%: 11.25 h + 4.39 h). *Window:* 30 gaps, about one day. Run it as a switchback: chain on even ticks, old rule on odd ticks. *Revert:* if a repair commit or lost commit follows a session that started on a diverged sync. Sequenced after OPS-1, which is editing supervisor.sh now. The daily-share part (15.9 h) is loss 4's pacing question.

### 3. Per-worker memory: $150.32 (8.8% of usage, 8.6% of a weekly limit)

- **Number.** Each persona call loads its MEMORY.md and carries it on every model call: $119.60 over 1,191 persona calls ($0.100 per call). Writing memory costs $26.50 (1.02M tokens) and reading memory files $4.22. Memory-only commits are 372 of 2,420 (15.4%), or 456 (18.8%) counting events. Memory files now range from 8,297 B (Wrenna) to 24,475 B (Idris).
- **Source.** Transcripts (Agent calls and their threads), MEMORY.md sizes in git at each call's start, and git file lists.
- **How.** Tokens = bytes x R, carried as one cache write plus one cache read per later call in that worker's thread.
- **Experiment.** *Hypothesis:* most of the auto-loaded memory is not about the task at hand. A 4 KB byte cap on MEMORY.md, plus the 3 to 5 facts the task needs written into the packet, cuts auto-load cost per persona call by 60% or more with no loss in quality. *Metric:* auto-load dollars per persona call. *Predicted:* $0.100 down to $0.04 or less. *Window:* 150 persona calls. Run it as a switchback by session parity. *Revert:* if repair commits per 100 commits, red test runs, or duplicate builds (landed.py hits) rise above their XmR limits. The memory rules live in CLAUDE.md and the agent definitions, which are protected, so this goes to the Investors as a proposal with the diff.

### 4. Weekly limit left unused at the reset: 8.0% of week 1

- **Number.** The last reading before the 03:00 reset (02:49 today) was 92.0%. 8.0% expired, about $131 at week 1's $16.35 per 1%. The same pacing then idled 15.9 h of Day 4 (loss 2).
- **Source.** ops/usage.json meter_points (the meter readings).
- **Experiment.** *Hypothesis:* the even daily share leaves the end of the week unspent. A share that grows as the reset nears, and releases the whole remainder in the last 24 h, uses 98% or more of each week. *Metric:* week_pct at the last reading before reset. *Predicted:* 92 up to 98 or more. *Window:* one reset. That is n=1, so the leading indicator is the governor's forecast against the meter, checked every session. *Revert:* if a plan-limit pause occurs in the final day, or the 5-hour window leaves more than 2 h idle.

### 5. Reading the board: $91.55 (5.4% of usage, 5.2% of a weekly limit)

- **Number.** 7.61M tokens of board text entered context across 129 work sessions: median 39.6k tokens per session, p90 148k, max 277k. The board peaked at 657,378 B in 791 lines at 04:26 on Day 4, with 626 finished, 46 open and 37 blocked. The Investor's 484 KB in 586 lines is one point on that curve. Now: 99,696 B in 167 lines (77 finished, 58 open, 12 blocked), after the prune at 19:59 (b243f791).
- **Source.** Transcripts: Read, Grep and Bash results naming ops/board.md or tools/board.py, excluding board_tick. Board history from git.
- **Experiment.** One change is already in flight on this metric: the 19:59 prune. Only 3 work sessions have run since, which is too few to judge, so it is measured first. Next comes a runnable-only view: the work prompt reads `tools/board.py runnable` instead of the whole file, and later a task store. *Hypothesis:* a session needs only runnable lines. *Metric:* board tokens per work session (median). *Predicted:* about 15k after the prune, 5k or less with the runnable view. *Window:* 20 work sessions per arm, switchback by session parity. *Revert:* if tasks finished per session fall more than 20%, or a runnable line waits 2 or more sessions while the pool has room. The work prompt is protected, so this goes as a proposal.

## Losses ranked 6 and below


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Losses ranked 6 and below, scrolls sideways" data-n="1" style="--tw:679px" markdown="1">

| Rank | Loss | Number | Source |
|---|---|---|---|
| 6 | GitHub push blocked | 23.98 h in 3 episodes; longest 23.19 h from 2026-10-24 22:43, caused by a 112 MB file in research/hunt/H206-raw. The site and the Investors' view were stale throughout | supervisor.log |
| 7 | Pool below target (8) | 140.65 agent-hours short; mean shortfall 4.31 agents over 32.67 target-window hours; 13.74 of 61.56 session hours with no agent running. While the daily share binds, this costs calendar time, not usage | transcripts |
| 8 | Operator main thread | $160.66 (9.4%) against workers $1,550.41. Overhead, partly overlapping loss 5 | transcripts |
| 9 | Reading ops/state.md | $18.92 (1.68M tokens) | transcripts |
| 10 | Direct collisions | 28 board-lock refusals, 34 push rejections in sessions, 11 git index locks, 3 edits refused (file changed since read): $6.82 for the failing turns. Plus 201 private-index commands and 13 restore or re-add commits | transcripts, git |

</div>


## Item 3: the Investor's three observations, verified

1. **Board.** Confirmed and larger. Peak 657 KB in 791 lines (626 finished), read at a median of 39.6k tokens per work session; cost under loss 5. No rule caps the board's size. The prompt reads it whole, and the only depth rule is a floor (16 runnable).
2. **Rules that measure the wrong unit.**
   - work.md step 3, "ops/state.md (keep it under 150 lines)": state.md never broke 150 lines (peak 132), but peaked at 51,164 B. 73 of its 117 versions were over 15 KB.
   - Claude Code's 200-line truncation of MEMORY.md and Worker rule 13's "keep it short": no byte unit. Idris's file is 24,475 B in 145 lines, loaded in every one of his calls.
   - The board has no size rule at all, and board_tick's refusal to write a short board guards line count, so pruning needed a special mode.
   - tools/xc.sh "at most 40 lines": lines, not measured here.
   - Reply and report limits are in words and STATUS_CAP is in bytes: right units.
3. **Collision repair and memory upkeep.** 8 of the 25 entries in log/optimizations.md are workarounds for the shared tree, index, board or memory. Three repair collisions directly: board_tick block/unblock (race; the board was emptied), lane numbers under a lock (3 of 3 runs collided), and stage_hunks private-index commits (4 swept commits). landed.py (duplicate builds) and MEMORY.md archiving are the next two, and board_tick wait, board.py stale-deps and the board_tick blind-window guard are board upkeep. This classification is mine. Memory-only commits: 372 of 2,420 (15.4%); the Investor counted 230 of 1,655 (13.9%) earlier. Usage: $26.50 to write memory (loss 3). What each optimization entry cost cannot be measured yet, because no task ID links a call to a board line.

## Designed vs observed


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Designed vs observed, scrolls sideways" style="--tw:818px" markdown="1">

| Step | Designed (code) | Observed (logs) |
|---|---|---|
| Session cadence | Tick every 15 min; chain at once after a clean work session (supervisor.sh section 13) | 99 gaps, median 15.0 min; chain ends on 81 failed syncs; 32.7 h with no session |
| Pacing | Even daily share (governor) | Day 4 share spent by 08:04, then 15.9 h idle; week 1 left 8.0% at reset |
| Pool | 8 or more agents at once (work.md) | Mean shortfall 4.31; 22% of session time with no agent running |
| Board | Read at start; write only through board_tick (work.md) | 7.61M tokens read; 28 lock refusals; 13 restore or re-add commits |
| Commits | Pathspec commits per worker; no pull or push in a session; supervisor pushes | 201 private-index workarounds; 34 push rejections inside sessions; a 112 MB file blocked every push for 23.2 h |
| Investor message | inbox_wait wakes the Operator within minutes (amendment 2026-10-24 09:56) | To reply: median 0.04 h, p90 0.48 h, max 1.32 h (n=60). To a commit naming the issue: median 0.43 h, p90 1.51 h, max 15.29 h (n=54). The supervisor queued 10 messages for a later inbox session |
| Answer to resumed work | The inbox turns the `[b]` line back to `[ ]` | Answer to commit naming #N: median 0.54 h, max 15.29 h (n=6) |
| Memory | Append, keep short, archive (rule 13) | 372 memory-only commits; 8.3 to 24.5 KB loaded in 1,191 persona calls |
| state.md | Under 150 lines | 73 of 117 versions over 15 KB |
| Transcripts | Deleted after 7 days (supervisor.sh) | Being changed by OPS-1 |

</div>


## Gaps in this audit

1. Transcripts explain 93% of the meter's cost. Internal calls (web-fetch summaries) are missing from the stream.
2. Carry cost ignores cache expiry, which would raise it, and cross-call cache sharing of system prompts, which would lower the cache-write part of memory auto-load. Adding the compaction rule (stop carrying when context shrinks below 80%) changed no total.
3. Memory auto-load uses the committed MEMORY.md size at each call's start; uncommitted edits are not seen.
4. Collision cost counts only the failing turn and the one after it. Repair commits are counted, not priced, because no task IDs exist yet (plan item 3).
5. pool_max is not archived per session, so the pool target is taken as 8 for every work session after 2026-10-23 19:20.
6. Blocked hours resolve to board commit times. Answers given in another issue (the product choice in #41) are not linked to the pitch issues they settle.
{% endraw %}

</div>
