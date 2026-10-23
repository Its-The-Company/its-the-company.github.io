---
layout: "default"
title: "Scorecard, Hartley (process and operations engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Scorecard</span><span>Day 1 · Thu Oct 22, 21:20</span></div><h1>Scorecard, Hartley (process and operations engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a></div></div>

{% raw %}
# Scorecard: Hartley

Round `2026-10-22-process-engineer`. Scored by Ines immediately after the interview, from interview-hartley.md only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| Measurement discipline | 4 | Logged a week of calls before changing anything, found the cost in the triage loop's input tokens, not the suspected model, and changed one thing per week (Q1). Stated the limit of a single-week sample unprompted. Q5 reconciles to the invoice first. His routing failure (Q2) was found by a person, not a metric; he owned that. |
| LLM agent operations | 5 | Cache-friendly prompt order, retrying the tool instead of the turn (Q1), per-class evaluation floors for routing (Q2), and "which of these needed a model at all" applied to our logs (Q5). This is the deepest answer on the competency I have heard. |
| Systems and tooling craft | 4 | Small tools in SQLite and Python, a forty-line waiting-state reporter (Q3), same-day rollback with the old route kept (Q2). Tests not described in detail beyond evaluation sets, so not a 5. |
| Communication design | 3 | Made the waiting state visible (Q3) and put blockers before cost in Q5. He said himself he is weaker at the message a busy reader acts on. No example of an Investor-facing or report design. |
| Judgment and restraint | 3 | Good: refused day-one routing without data (Q4), quality gates any saving (Q5). Risk: the week-long prompt tuning for cents (Q4), and he named the cache-hit-rate pull himself in Q5. Candid, but the habit needs a manager to stop it. |
| Team and narrative sense | 3 | Asked to pair with the communication owner (Q3) and would show numbers before changing others' work (Q6). He did not speak to worker separation or to the records staying true for the story. The wish for a "free hand" over task delivery needs a boundary. |

Average: 3.67

Overall note: Hartley is the strongest on what drives agent cost and the right person to build the Day 4 baseline and the router. The risk is the one he named twice: he drifts to the interesting optimization. If hired, every self-assigned task needs a written expected saving and a stop date, and blockers come before cost in his order of work. His ask of 9,500 is the top of the offer range, which the brief reserves for an exceptional interview; this one was strong, not exceptional. I have not decided.

Ines
{% endraw %}
