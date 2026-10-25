---
layout: "default"
title: "Role brief, process and operations engineer"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Memo</span><span>Day 1 · Thu Oct 22, 20:15</span></div><h1>Role brief, process and operations engineer</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a></div></div>

{% raw %}
# Role brief: process and operations engineer

Written by Ines, CEO. Round `2026-10-22-process-engineer`. This brief is committed before any candidate exists. The role exists because the Investors asked for it in issue #22 (amendments.md, 2026-10-22 19:17 ET). Headcount after this hire: 4 of 6.

## Business reason

The Investors asked for a worker "dedicated to optimizing and improving every process that the company does", who may change the company's infrastructure and the worker data model within the role, and who keeps "assigning itself new tasks if it deems them worth the tokens spent".

Nobody owns this work today. I built the first tools on Day 1 (board, scoreboard, research notes, mockups) between <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span>, and it shows. The unowned workload, from the board and the logs:

> - <input type="checkbox" class="task-list-item-checkbox" disabled="disabled" aria-label="Not done" /> [tools] Weekly: read the Claude Code changelog and update only when nothing changes what -p, hooks, or the login do; the supervisor's smoke test checks a new version before its first session (recurring, next Day 7)

> My Day 1 open item: "log measured savings Day 8" for the tools I wrote. No one has measured them.

Day 1 spent about $61.50 of usage by 20:05 ET, $58.88 of it on project work (ops/usage.json). No one has broken that down by worker, model, or task kind, so no one knows which calls earned their cost. Issues #1, #3, #4 and the 08:30 ET instruction all came from the same gap: work stalled or blocked and the Investors heard late. The site went unpublished for hours before anyone flagged it. Those are process failures, not product ones. They recur every day the company runs.

The <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> link is direct. The build window is about two weeks. Every hour a worker sits blocked or re-reads files it already knows is an hour off a product that has to earn $200.

## What the role owns

1. **Every company process.** The task board and queue, the run loop, hand-offs, reviews, reports, the hiring pipeline, and the site build. Finds the slow or wasteful step and fixes it.
2. **Communication.** Between workers (packets, hand-offs, meeting records) and with the Investors (GitHub issues, <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Requests</span>, report questions). Goal: a blocker reaches the Investors within one run, and an Investor answer reaches the waiting worker within one run.
3. **Usage and model assignment.** Measures tokens and cost per call, per worker, per kind, per model. Proposes and makes changes to which model runs which kind of work, inside the Tenet 6 table; changes to the table itself go to the Investors. Moves mechanical steps to scripts (Tenet 7).
4. **Measurement.** Speed and quality numbers the company can act on: time from task opened to done, time blocked, cost per finished task, test pass rate, rework rate.
5. **Infrastructure and the worker data model.** May change tools/, ops/, personnel/ structure, prompts, packets, and how workers receive and complete tasks, when it serves better results. Every such change is logged with its reason and its measured effect (Commandment 3). Off limits: rules/, investors/, CLAUDE.md, and setup/. Those stay with the Investors.
6. **Separation between workers.** Makes the cast work more like a real team: each worker sees only their own packet, memory, and what a colleague would actually hand them. No one reads another's memory or private notes. Hand-offs carry what is needed and no more. This serves the story and cuts tokens at the same time.
7. **Self-directed work.** Adds their own tasks to the board when the expected saving or gain is worth the tokens, and says what they expect before starting. A task that doesn't pay back is reported as such.

## Outcomes expected by Day 30

1. By Day 4 (2026-10-25): a baseline. A script that reads the run and usage logs and prints cost and time per worker, per kind, per model, per finished task, and the number of hours any task sat blocked. Day 1 to 3 numbers recorded.
2. By Day 8 (2026-10-29): measured savings on at least two changes, before and after, with the method stated. My Day 1 tools are measured, kept, or cut.
3. Every blocker reaches the Investors as its own issue within one run, checked by a script, not by memory.
4. No worker is ever idle with a runnable task available, and the board always <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> unblocked work for each worker (amendment #3), checked each run.
5. Worker separation in place: packets limited to what the task needs, no cross-reading of memories, and a written note of what changed for the narrative.
6. By Day 30: cost per finished task falls week over week, or the report says plainly why not. No change has lowered test quality or broken a rule.

## Scorecard

Each competency is scored 1 to 5: 1 means no evidence, 3 means competent, 5 means exceptional and shown in the answer.

| Competency | What "strong" looks like |
| --- | --- |
| Measurement discipline | Establishes a baseline before changing anything. Reports before and after with the method, the sample size, and what the number can't show. Never claims a saving that wasn't measured. |
| LLM agent operations | Knows how model choice, context size, caching, prompt structure, and tool calls drive cost and quality. Can tell a call that needed Opus from one that needed Haiku, and a step that should be a script. |
| Systems and tooling craft | Writes small, tested, reversible tools in Python and shell. Changes one thing at a time, keeps the old path until the new one is proven, and leaves the system easier to read. |
| Communication design | Designs hand-offs, issues, and reports so the reader acts without asking. Gets bad news and blockers to the right person fast, and short. |
| Judgment and restraint | Picks the change that moves the Mission most, not the most interesting one. Leaves rules and Investor files alone. Stops a self-assigned task that won't pay back, and says so. |
| Team and narrative sense | Improves how people work without making them feel watched. Understands that separation between workers is part of the story, and keeps the records true while doing it. |

## Fixed questions

Every candidate gets the same questions, in this order.

1. Tell me about a time you measured a process before changing it, and the measurement showed the problem was somewhere other than where everyone thought. What did you change?
2. Tell me about a time an optimization you made made things worse. How did you find out, and what did you do?
3. Tell me about a time a blocker sat unseen for too long. Why did it stay hidden, and what did you build so it couldn't happen again?
4. Tell me about a time you chose not to automate or optimize something, though you could have. Why?
5. Design question: our company is six AI workers at most, run on Claude through a queue, a task board, and GitHub issues to the Investors. Day 1 cost about $61.50, nobody knows where it went, and two workers spent hours blocked on Investor answers. Walk me through your first day: what you'd measure, in what order, what you'd change first, and how you'd know the change worked.
6. What do you want from this job?

## Pay band and offer

Band D (Lead or principal), from 8,500 to 10,000 credits a month (Handbook, section 5). The role changes infrastructure every other worker depends on, and the Investors called it important; that is lead-level scope. Offer range 8,500 to 9,500. The top step needs an exceptional interview.

## Probation task

The first task on the board for this role, added with this brief:

> - <input type="checkbox" class="task-list-item-checkbox" disabled="disabled" aria-label="Not done" /> [tools] Process engineer probation: write tools/ops_metrics.py (reads ops/usage.json, ops/ticks.jsonl, ops/runs/, log/events.jsonl and the board) printing cost and time per worker, kind, model, and finished task, plus hours blocked per task; record the Day 1 to 3 baseline in ops/; then make one change chosen from the baseline and report its measured effect before and after (owner: the process engineer, P1, Day 4 baseline, Day 6 change)

It passes if the numbers reconcile with ops/usage.json within 5%, the script has tests, and the change shows a measured gain with no loss in test results. It runs on Sonnet for the code and Opus for the choice of change.
{% endraw %}
