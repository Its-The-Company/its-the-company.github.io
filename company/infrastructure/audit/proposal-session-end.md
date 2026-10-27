---
layout: "default"
title: "Proposal: sessions end by the supervisor's session-end flag, not by \"about 30 turns\" (T-0133)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-session-end.md</code></span><span>2026-10-26</span></div><h1>Proposal: sessions end by the supervisor's session-end flag, not by "about 30 turns" (T-0133)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-032">OPT-032</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-033">OPT-033</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Draft by Odalys, 2026-10-26 01:27 ET, for the Operator to open as an issue labelled `proposal` (#65 ruling, item 1).
Asked by an Investor, #41 c6408771623 (01:14). This one proposal replaces the earlier draft
log/audit/proposal-close-rule.md (audit 2): its measurement is folded in below; that draft should not be opened.
Files changed by the diff: ops/prompts/work.md and setup/OPERATIONS.md.
Exact diff: log/audit/proposal-session-end.diff (`git apply --check` clean at HEAD, 2026-10-26 01:26); the issue body
carries it as its one ```diff block.

## Evidence

- Drains, 2026-10-25 00:00 to 10-26 01:30 ET (log/audit/drain-cost.md, `tools/drain_cost.py`, 17 streams, n=9
  drains, 8 not held by the budget): 1,875 idle agent-minutes (31.3 agent-hours) under the pool target of 8, from
  each session's last task start to the next session's first task. Median 161 agent-minutes per session end.
  67% between sessions (each about 15.5 min: the chain was blocked by failed pushes; fixed in company code, below),
  20% in tails, 9% in ramps.
- Mid-session stall (audit 2, `tools/audit_session.py --run 20261025-234823 --split 00:32`): 3.70 agent-hours under
  target in 33 minutes, 00:32-01:04, after the Operator read "about 30 turns" as a reason to close with seven P1
  lines runnable and the limits far off (five_hour 10% used, work_allowed true).
- The rule's unit can't be observed: Claude Code counted 4-10 turns for each of the last 8 work sessions; the
  Operator made 93-370 model calls per session on 10-24/25.
- The rule's reason (a long conversation re-sends its history) is small: Operator median call $0.040 in calls
  1-60, $0.069 after 120; the Operator thread was 8.9% of the 23:48 session's cost. Operator context at session
  end: 87k-288k tokens (368k in the session running now).

## What is already built (company code; no approval needed, Commandment 3)

- `tools/session_end.py`: the supervisor's keeper (every 5 min while a session runs) writes ops/session_end.json
  when (a) a between-session job waits: GitHub ahead of this copy (a pull is needed before any push goes), a file
  over 100 MB that only the drop step can clear (it refuses while a session runs), an allowlisted "approve" in the
  inbox since the session began, amendments.md changed since the session began, a report due (governor decide
  --dry-run), or ops/needs_repo.json (any worker may write it); (b) the Operator's context, read from the live
  stream's last main-thread usage, is past `context_tokens` (450,000); (c) the session has run more than `hours`
  (3). Settings: ops/session_end_config.json. A job that already ended a session is not flagged again for 12 h, so
  a job the between-session step can't clear never becomes a loop of short sessions.
- tools/supervisor.sh: the flag's baseline at session start and its cleanup after; the hard stop moves from 150 to
  210 minutes (3 h plus a 30-minute wind-down); step 13 chains the next session at once whenever a board line is
  runnable, after work, inbox and report sessions, even when a push failed or the session hit the time limit.
- Tests: tests/session_end_test.py (15/0), tests/supervisor_test.sh (153/0, 72 s, under the 240 s budget).

## Change (the diff)

ops/prompts/work.md, the "Stop when ..." sentence: replaced by the Investor's rule in his words, with the old
rule kept as the switchback's old arm. setup/OPERATIONS.md section 5 step 5: made to match. Which rule a session
gets: the old one while ops/run.json's switchback is `session_end` with arm `old`, or while no such switchback runs
and ops/session_end_config.json says `"rule": "old"` (now); the new one otherwise. Keeping the result is a
company edit of `"rule": "new"`; dropping it is the revert below.

## Switchback

- Flag `session_end`, experiment OPT-033 (next free id at 01:25; ledger entry written when it starts).
  One flag at a time: OPT-030 `amend_compact` is live and OPT-032 `task_context` is queued after it. Queue with
  `python3 tools/switchback.py queue session_end OPT-033 --after OPT-032 --requires ops/prompts/work.md
  "ops/session_end.json"`, so arms start only once this diff is in. Ines may put it ahead of OPT-032 (the
  Investor asked for it, P0); the metrics don't overlap (OPT-030/032 measure tokens per persona call), so the other
  path is a 2x2 by session pairs, which tools/switchback.py does not do yet.
- Metric: idle agent-minutes under the target per session hour, from a session's start to the next session's
  first task (tools/drain_cost.py rows plus each session's body), per arm.
- Prediction: the new arm at or under 50% of the old arm's median, and mean pool at or above 7 in the new arm.
- Window: n=6 work sessions per arm; once more to n=10 per arm if inside the noise.
- Revert rule (restore the old sentence, `"rule": "old"`): a report session misses its slot because a work session
  ran on; a session is stopped at the 210-minute limit twice; Operator cost per session hour above $15 (now $7.9)
  with no rise in tasks finished per session hour; or a loop of sessions shorter than 10 minutes.

## Does it qualify for the 12 h auto-apply (2026-10-26 00:39 ruling)?

No; it needs "approve". Auto-apply is off (ops/proposal_auto.json), and even on, ops/prompts/work.md mentions the
amendments ("copied verbatim into amendments.md"), which tools/apply_proposal.py excludes from the 12 h path, and
the sentence replaced is the Investors' own text. Tests on the exact diff: `git apply --check`; no test reads it.

Tests: tests/session_end_test.py, tests/supervisor_test.sh
{% endraw %}

</div>
