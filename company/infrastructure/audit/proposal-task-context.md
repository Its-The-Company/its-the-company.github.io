---
layout: "default"
title: "Proposal: task-scoped context in place of auto-loaded personal memory (OPS-6 part 3, OPT-032)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-task-context.md</code></span><span>2026-10-26</span></div><h1>Proposal: task-scoped context in place of auto-loaded personal memory (OPS-6 part 3, OPT-032)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-031">OPT-031</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-032">OPT-032</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-26 01:17 ET. Task T-0005 (#41 c6407113363 item 3). Status: **tool and tests in company code;
the switch is this diff to rules/build_agents.py, queued behind OPT-030.** Every number below comes from
ops/runs transcripts and git history through `tools/context_use.py`; nothing from memories or reports.

## 1. What a worker thread carries now

`python3 tools/context_use.py --since 2026-10-25T00:00` (353 persona threads, 2026-10-25 00:00 to 10-26 01:10 ET):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What a worker thread carries now, scrolls sideways" style="--tw:640px" markdown="1">

| Measure | Value |
|---|---|
| MEMORY.md auto-loaded at thread start, median | 17,513 B (about 12,000 tokens at 0.683 tok/char) |
| Keyed entries (carry a task ID, OPT id, issue, commit or path) sharing a key with the task's prompt or tool inputs | 8.4% |
| Bytes of those entries over all memory bytes | 5.8% |
| Model calls per thread, median | 16 |
| Memory carried in all threads (bytes x calls) | 84.0 M tokens |
| Tool calls before the first change (orientation), median | 9 (43,678 result chars) |
| Explicit context reads (agent-memory, archive.md, board, state, CLAUDE.md, rules/), median | 2 |

</div>


All 1,441 persona threads since 2026-10-22: used share 6.8%, 301 M tokens carried. The 5.8% is a floor: unkeyed
entries (identity, prose lessons) are never counted as used. Even so, at least about 90% of what each call
carries names nothing the task touches.

**Turn-limit stops are not a memory effect.** Since 10-25 00:00, 9 of 353 threads stopped at the turn limit, all
Pernille's (persona maxTurns 40; the other five say 150; OPT-031 fixes that). Those 9 had median 2 context reads,
the same as the rest; what differed was code orientation: 20 calls and 113 K chars before the first change, against
8 and 43 K. So the trial is sized on carry cost and orientation, not on limit stops.

Orientation moved with the phase: median per session 4 to 6.5 in the seven work sessions 10-24 22:46 to 10-25
06:36, then 11.5 to 16.5 in the five build sessions since 19:11 (mean 14.6, sd about 2.1). A before/after would
read that phase change as an effect; this runs as a switchback.

## 2. The trial

New arm (flag `task_context`): the persona has no `memory` key, so Claude Code does not auto-load MEMORY.md; the
prompt carries instead the worker's identity and standing lessons (`tools/task_context.py --core-only NAME`, cut to
4,096 B; today 802 B Wrenna to 4,053 B Ines, median about 1.6 KB) and tells the worker to start with
`python3 tools/task_context.py <T-ID> --worker NAME`: the board line, the files it names with their last 3
commits, the issue rulings it cites (amendments.md Effect lines), ADR titles and status lines, and the worker's own
memory entries that share a key with the line. Sample packets: T-0005 301 B, T-0056 2,375 B, T-0108 3,089 B.
Memory writing is unchanged (append a dated note), so the old arm loses nothing and the switch is reversible per
session. Old arm: as today.

One file changes: rules/build_agents.py (exact diff: log/audit/proposal-task-context.diff). It needs OPT-030's
`switchback_on` and `import re`, so it applies after that diff. The core rule is copied into build_agents.py, not
imported from tools/, so company code cannot change what a protected script emits; a parity test holds the two
equal. No change to ops/prompts/: the worker fetches its own packet.

## 3. Prediction, metric, window, revert

- Metric: per work session, median orientation calls (tool calls before the first change) in persona threads,
  `tools/context_use.py --rows` grouped by run and arm.
- Prediction: new arm at least 3 calls under old (from about 15 to 12 or fewer in the build phase), because the
  packet names the files and their latest commits that a worker now finds by search. Guard numbers reported beside
  it: memory carry tokens per thread (expected down by about 80%), turn-limit stops, repair commits per 100 commits
  (tools/shared_tree_incidents.py), red test runs.
- Window: 6 work sessions per arm (12, about one day) after OPT-030's switchback stops. With sd 2.1 a 3-call
  difference is near the edge of what 6 per arm detects; if the result is inside the noise, extend to 10 per arm
  once, then call it.
- Revert: `tools/switchback.py stop` (every session back on full memory) at once if a new-arm worker repeats a
  mistake a standing lesson or its memory recorded and the packet left out, or if turn-limit stops or repair
  commits on the new arm exceed the old arm's over the window. Keep only if orientation drops by 3 or more and no
  guard trips; otherwise record no_effect and stop.

## 4. Does it qualify for 12 h auto-apply (ruling 2026-10-26 00:39, #65)?

Yes, once its preconditions hold:
- Supervisor-revertible: yes, by `switchback.py stop`; the old arm is today's build.
- Tests on the exact diff: needed before posting. tests/context_trial_test.py covers the tool (41/0); the parity
  test of `memory_core` against `task_context.core` and a build test of both arms go in with the diff, after
  OPT-030's diff lands (this diff sits on top of it).
- Protected areas: touches none of Commandments 2, 6-11, 33-35, 42, 58, 59, investors/, rules/hooks/, the guard
  scripts, Claude Code settings or the applier.
- Investor words: unchanged; the rules and amendments block are emitted exactly as before. It removes only the
  auto-load of the worker's own notes.

So it goes out labelled "proposal" (not urgent; nothing waits on it) when OPT-030 stops, so the 12 h clock does not
run while its slot is taken.

## 5. Queue

`tools/switchback.py queue task_context OPT-032 --after OPT-030 --requires rules/build_agents.py
'TASK_CONTEXT_FLAG = "task_context"'` (ops/switchback-queue.json). When OPT-030 stops, `stop` starts this one, and
its arms wait until build_agents.py holds the flag.
{% endraw %}

</div>
