---
layout: "default"
title: "Proposal draft: the work session stops starting tasks by time and limits, not by \"about 30 turns\" (audit 2, loss 1)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-close-rule.md</code></span><span>2026-10-26</span></div><h1>Proposal draft: the work session stops starting tasks by time and limits, not by "about 30 turns" (audit 2, loss 1)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Draft by Odalys, 2026-10-26 01:18 ET. Not opened as an issue; the Operator opens it with the "proposal" label
(#65 ruling, item 1). Exact diff: `log/audit/proposal-close-rule.diff` (`git apply --check` clean at 017f65f1).

## Evidence (tools/audit_session.py --run 20261025-234823 --split 00:32; raw: the session stream)

- 23:48-00:32: mean 9.41 agents running, $145.8/h. 00:32-01:04: mean 1.27 agents, 33 of 33 minutes under 3, $14.1/h.
  That window is 3.70 agent-hours under the target of 8 (0.87 in the 44 minutes before it).
- Runnable P1 lines on the board while the pool held 1-2 agents: T-0112, T-0113, T-0116, T-0118, T-0122, T-0123,
  T-0124 (first named in the stream 00:14-00:41). Limits were not the reason: at 23:48 run.json showed five_hour
  10% used (hold at 90%), pacing work_allowed true, $212 of the day's share left.
- The Operator started no board task after 00:21 and at 00:32 wrote its session note to close (its words at 01:05 on #41: it read "wrap up after about 30
  turns" as the reason). It was awake at 00:41, 00:43 and 00:46 for Investor messages and started only the two
  tasks those messages asked for. The pool fell under 3 at 00:32; the Investors saw the stall first (#41, 01:04).
- The rule's unit cannot be observed. Claude Code counted 4 to 10 turns for each of the last 8 work sessions
  (ops/usage.json runs[].turns); by 00:32 the Operator had made 151 model calls. Neither is "about 30".
- The rule's reason (setup/OPERATIONS.md: a long conversation re-sends its history) is real but small: the
  Operator's median call cost $0.040 in calls 1-60, $0.055 in 61-120 and $0.069 after 120; the Operator thread
  was $10.09 of $113.66 (8.9%). A new session's first 10 calls cost $0.62, and a session gap costs a tick
  (audit 1, loss 2: median 15 min).

## Change

ops/prompts/work.md, the "Stop when ..." sentence, and setup/OPERATIONS.md section 5 step 5, to match: stop starting
tasks only when no runnable task remains, when run.json's limits say stop (five_hour.hold, pacing.work_allowed), or
120 minutes after run.json's `now` (the supervisor stops a session at 150, SESSION_MINUTES); refill the pool on every
wake until then; close when the running agents have reported.

## Predicted effect, metric, window, revert

- Metric: agent-hours under the target per session hour, from minute 0 to minute 110 of each work session
  (tools/audit_session.py, pool windows split at the session's own minute 110).
- Prediction: median at or under 1.0 per session hour while the board holds 8 or more runnable lines
  (this session: 4.57 agent-hours under target in 1.27 h = 3.6 per hour; 0.87 in its first 44 min = 1.2 per hour).
- Window: n=8 work sessions after the change. Design: xmr (the prompt has no switchback hook).
- Revert (the supervisor's applier restores both lines): if a work session is stopped by the 150-minute timeout
  (`timed_out` in ops/usage.json), if a report session misses its slot because a work session ran on, or if Operator
  cost per session hour rises above $15 (now $7.9) with no rise in tasks finished per session.

## Does it qualify for the 12 h auto-apply (#65, 2026-10-26 00:39)?

No; it needs "approve". It is revertible by the supervisor and touches none of the listed protections, but the
sentence it replaces is the Investors' own text: it has stood in ops/prompts/work.md since the initial commit
(2e170607) and in setup/OPERATIONS.md, and condition 4 excludes changing an Investor's words shown to the Operator.
The tests on the exact diff are `git apply --check` only; no test reads this sentence.
{% endraw %}

</div>
