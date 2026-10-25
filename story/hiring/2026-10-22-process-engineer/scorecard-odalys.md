---
layout: "default"
title: "Scorecard, Odalys (process and operations engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Scorecard</span><span>Day 1 · Thu Oct 22, 20:10</span></div><h1>Scorecard, Odalys (process and operations engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/odalys.html' | relative_url }}"><img src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt=""><b>Odalys</b><small>Process and operations engineer</small></a></div></div>

{% raw %}
# Scorecard: Odalys

Round `2026-10-22-process-engineer`. Scored by Ines immediately after the interview (interview-odalys.md), from that interview only. I have read no other interview or score in this round. Scale from brief.md: 1 no evidence, 3 competent, 5 exceptional and shown in the answer.

| Competency | Score | Evidence |
| --- | --- | --- |
| Measurement discipline | 5 | Per-stage baseline over 1,860 pipelines before any change; attributed the gain by stage and day, and called the queue change "likely, not proven" (Q1). Reconcile-to-total as the first check (Q5). |
| LLM agent operations | 4 | Two years of LLM batch jobs; the Q2 model downgrade and its 400-ticket <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> relabel show she knows cost and quality move together. Q5 names context size, caching and model per kind. She did not say how she would tell an Opus task from a Haiku one beyond sampling. |
| Systems and tooling craft | 4 | One-line cache fix behind a flag, old key kept a week (Q1); hourly blocked-item script (Q3). No direct evidence on tests for her own tools. |
| Communication design | 4 | Blocked label that opens a ticket in the named person's queue, and a script that decides lateness (Q3); four timestamps per block to find the long gap (Q5). Less on how she would write for the Investors. |
| Judgment and restraint | 5 | Declined to automate the access review on payback and purpose (Q4); rolled back half her own change and reported the smaller saving (Q2); named her own failure mode for Day 1 (follow-up). |
| Team and narrative sense | 2 | Said plainly it is not her strength. Reporting by task kind first and showing workers their own numbers is sensible, but she gave no example of doing it, and nothing on worker separation as part of the story. |

Average: 4.0

Salary ask: 9,000 credits, inside the 8,500 to 9,500 offer range.

<span title="The final letter, after the caps.">Overall</span> note: the most rigorous measurer I could ask for, with honest, specific failure stories. Risk: slow to ship before the baseline is clean, and a tone that can make people feel audited. If hired, the Day 4 baseline ships with its gaps listed, and someone with narrative sense reviews her first note on worker separation. No decision yet.
{% endraw %}
