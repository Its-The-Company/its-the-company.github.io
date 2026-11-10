---
layout: "default"
title: "One coordinator: no gaps between sessions (T-3247)"
section: "documents"
description: "Tool: python3 tools/session_gaps.py --since 2026-11-04 (test: tests/session_gaps_test.py). It reads only ops/runs/supervisor.log (governor records, timed step lines, launchd retries) and the session streams in ops/runs\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/one-coordinator.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/one-coordinator.md</code></span></div><h1>One coordinator: no gaps between sessions (T-3247)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-07. Evan asked (#41, 4:11 AM) why there are gaps between sessions and whether discrete sessions are
needed at all. This plan measures the gaps from raw evidence and designs the change. It builds on
ops/plans/one-dispatcher.md (who runs each task) and ops/plans/sessions-main-vs-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.md (why one coordinator, plain
workers). The This Session chart (ops/plans/this-session.md, T-3295 to T-3297) draws this flow.

## The numbers

Tool: `python3 tools/session_gaps.py --since 2026-11-04` (test: tests/session_gaps_test.py). It reads only
ops/runs/supervisor.log (governor records, timed step lines, launchd retries) and the session streams in ops/runs and
ops/runs-archive, and reuses tools/changeover_gaps.py (T-2298) for each session's agents and wind-down. Window: main
account, 2026-11-04 12:00 AM to 2026-11-07 10:05 AM ET, 82.1 h; 61 work sessions, 20 inbox and report sessions.

"Seats" are the agent count the governor set for the session (its pool target: 12 on the LOCK IN day 11-05, 1 or 2
under Spread from 11-06). A seat-hour is one seat for one hour.

**Where the clock went** (n = 82.1 h)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The numbers, scrolls sideways" data-n="2 3" style="--tw:438px" markdown="1">

| | hours | share |
| --- | --- | --- |
| Work session, at least one agent running | 56.4 | 69% |
| Work session, the Operator alone (cold start, wind-down tail) | 7.7 | 9% |
| Inbox and report sessions | 0.5 | 1% |
| No session at all | 17.5 | 21% |

</div>


Gap from the last agent of one work session to the first agent of the next (n = 50 changeovers): median 14 min, 90th
percentile 73 min. Since 11-06 (n = 16): median 25 min, 90th percentile 76 min.

**The no-session hours, by cause** (each interval between two timed supervisor lines goes to one cause; untimed jobs
fall in the interval of the next timed line)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The numbers, scrolls sideways" data-n="2 3 4" style="--tw:518px" markdown="1">

| Cause | h | seat-h | intervals |
| --- | --- | --- | --- |
| The supervisor's lock held 11-05 3:09 PM to 6:56 PM by a stray disk_overflow run, so no tick ran (fixed in e6363723b, 6:49 PM) | 3.8 | 45.3 | 1 |
| After the session: metrics, board upkeep, runs archive, records backup, site build, git push | 4.1 | 23.3 | 399 |
| Land checks run inside the tick, one after another (personal_land.sh) | 3.7 | 21.7 | 65 |
| Before the session: merge queue, git sync, applier, xc route, disk sweep | 2.5 | 11.2 | 293 |
| Launchd's 15-minute wait for a tick that did not chain, then its pre-session jobs | 1.5 | 9.3 | 27 |
| Session start: meter, governor, dispatcher | 0.2 | 1.3 | 165 |
| Held on purpose: Spread pacing, an Investor pause, a plan limit | 1.6 | 9.8 | 13 |

</div>


By day: 11-04 3.0 h, 11-05 7.7 h (3.8 of it the held lock), 11-06 3.2 h, 11-07 3.5 h (to 10:05 AM).

**Inside work sessions**: 314.8 seat-h at target, 170.9 agent-h used. Empty: wind-down 93.1 seat-h (72.9 in sessions
that ended for a between-session job, 18.0 in sessions that closed themselves, 2.2 time and hours limits), cold start
(session start to first agent) 32.3, the rest 18.5 (under-filled mid-session).

**Why sessions end** (n = 61): 35 for a between-session job (amendments.md changed 12, a proposal approved 11, GitHub
has commits the session must push 6, a lane waiting to land 3, a personal account's first task 2, a report due 1);
9 the runaway time limit; 8 closed themselves; 5 exit 1; 3 the hours limit; 1 an Investor pause. None ended for
context size.

**The Operator's cost**: 220 of 1,220 USD list price of session cost (18%) is the Operator's own turns; 10% of the
Operator's tokens (62.4M of 634.4M, n = 51 sessions) are spent before its first agent call.

**What this does not say**. Every account reached its weekly line before this week's reset: the main account read 96%
at 10:05 AM, personal a and b 100% (dispatch.log 10:05 AM, readings 12 h old). So this week the gaps did not waste allowance;
they delayed work, and lands. They waste allowance only in a week, or on a key, where usage expires unused. The seat
counts are the governor's targets, not proof that that many runnable, non-overlapping tasks were waiting. The personal
lanes have the same 15-minute tick and are not in this log; dispatch.log idle hours (T-2677's measure) cover them.

## The answer to "are discrete sessions needed?"

No, not for the work. A session ends today for three reasons, and none needs the workers to stop:

1. Jobs that must not run while a session works in the main checkout (sync, push, applier, amendment records, lands).
   They block because the session and the jobs share one checkout and one lock. Give each its own copy and lock, and
   they run beside the workers.
2. Limits (the runaway time limit, the 3-hour hours limit). They exist to bound one Operator's context and cost; with
   the Operator no longer the workers' parent, they bound only the Operator.
3. Context size. This one is real for the Operator, and it stays: the coordinator restarts from a handoff file, and
   the workers, separate processes, keep running.

## The design, in steps

Build order follows the merge-first rule (Investors 2026-11-05 11:35 PM): merge-path steps first. The amendment of
2026-11-05 1:07 AM asks for such a change to be built in one go: steps 1 to 3 go together once their prerequisites are on
main, then step 4 measures.

0. **On the board already.** T-3288 (main stays green, so continuous landing does not fail every lane at once; P0,
   first). T-2641 (cut the old personal split; running now). T-2677 (the dispatcher's own clock and slots). T-2719
   (main-plan work in its own worktrees, so nothing but the Operator touches the main checkout). T-2346 (apply approved
   changes without ending the session; the mid-session apply landed in T-2484). T-1422 (answer messages while work
   lands) is likely solved by step 1, since the land no longer holds the supervisor's lock.
1. **T-3300, merge-first: land outside the tick.** personal_land.sh runs as its own launchd job with its own lock,
   every 60 s and at once when a MacBook land job reports; it merges in its own worktree and moves main by
   fast-forward push only. Removes the 3.7 h (21.7 seat-h) of land checks from the critical path and lands work as soon
   as its tests pass, not at the next changeover.
2. **T-3301, merge-first: between-session jobs beside the workers.** One jobs loop with its own lock runs sync and push,
   the applier and amendment records, the merge queue, metrics, board upkeep, backups and the site build on their own
   cadence. session_end.py drops each (a) reason as its job moves. Removes 45.1 seat-h of no-session steps and the
   72.9 seat-h of wind-downs that the (a) ends caused, and, with one lock per job, the class of the 11-05 held lock
   (45.3 seat-h).
3. **T-3302: one coordinator session.** One Operator session, kept running by the keeper, holds the inbox, board,
   plans, review assignments and reports; it starts no build agents. Every worker is a plain session that
   tools/dispatch.py starts on any account (main plan, personal accounts, API keys) in its own worktree, one task each,
   landing through the merge queue; dispatch ticks at once when a worker exits. Chain, CHAIN_MAX, the hours limit and
   separate inbox and report sessions retire. Removes the 32.3 seat-h of cold starts and 20.2 of the other wind-downs.
   The old path stays one setting away (COORD=0) until step 4.
4. **T-3303: the 48-hour check.** tools/session_gaps.py on the new window beside these before numbers, plus
   dispatch.log idle hours, land_stats and tasks finished per day, n beside each. Keep it if machinery, wind-down and
   cold-start seat-h fall by half and the land rate does not drop; otherwise switch back and write what failed.

## What it should save

Since 11-04, at the governor's targets: 21.7 (step 1) + 163.3 (step 2; 118.0 without the 11-05 held lock, already fixed) +
52.5 (step 3) = 237.5 seat-h, against 170.9 agent-h used. Since 11-06 under Spread (1 or 2 seats): 27.9 seat-h against
49.7 used (5.2 h of 6.8 h with no session were machinery, not pacing). Wall clock: 15.9 h with no session that was not
on purpose, and most of the 7.7 h of Operator-alone time. Not saved: Spread holds (1.6 h), mid-session under-filling
(18.5 seat-h).

In usage this means: in a week where the allowance binds, as this one did, the same usage is spent sooner and work
lands hours earlier; in a week or on a key where usage would expire, it is up to that many more agent-hours. Real
tokens saved either way: most cold starts (10% of Operator tokens) and the Operator's turns spent waiting for agents
to drain (not measured here).

## What would make this fail

- Lands from a separate worktree racing a session's commit on main: the push is fast-forward only, so the loser
  rebases and tries again (the supervisor's retry, #125), and a red main still stops lands (T-3288).
- Two writers of ops/board.md at once (coordinator and jobs loop): every write goes through board_tick.py and its lock.
- A stuck job: each job has its own lock and time limit, so it holds only itself, never a worker start.
- The coordinator's context: a restart from the handoff file; workers are not its children.
- The Investor-owned files: amendment records keep their file-guard path (T-2346); nothing here edits rules/.
{% endraw %}

</div>
