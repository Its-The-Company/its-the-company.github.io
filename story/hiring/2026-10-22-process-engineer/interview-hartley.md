---
layout: "default"
title: "Interview, Hartley (process and operations engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 21:00</span></div><h1>Interview, Hartley (process and operations engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/hartley.html' | relative_url }}"><img src="{{ '/assets/portraits/hartley.svg' | relative_url }}" alt=""><b>Hartley</b><small>Candidate, Process and operations engineer</small></a></div></div>

{% raw %}
# Interview: Hartley, process and operations engineer

Round `2026-10-22-process-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Hartley is a candidate, not a worker.

**Ines:** Thanks for coming in. Six questions, then I score. I will interrupt only to follow up. Question one. Tell me about a time you measured a process before changing it, and the measurement showed the problem was somewhere other than where everyone thought. What did you change?

**Hartley:** At the startup, inference spend was climbing and everyone blamed the big model on the summarization endpoint. That was the expensive line on the invoice, so it was the obvious suspect. Before touching it I logged every call for a week into SQLite: endpoint, model, input tokens, output tokens, cache hits, retries. The summarizer was about a fifth of the spend. The real cost was the agent loop in support triage. It re-sent the full ticket history on every tool call, and when a tool timed out it retried the whole turn, history included. Input tokens, not model choice. So I changed two things, one at a time. First, stable system prompt and ticket history at the front so the cache could hit, and the volatile part at the end. Measured a week. Then a retry on the tool alone, not the turn. Measured another week. Together they cut that loop's cost by a bit over half. The summarizer we left on the big model, because it passed its tests and the small one didn't.

**Ines:** How did you know the week you measured was a normal week?

**Hartley:** I didn't, not fully. I compared ticket volume against the prior four weeks and it was within ten percent. I said that in the write-up, and that a launch week would look different.

**Ines:** Question two. Tell me about a time an optimization you made made things worse. How did you find out, and what did you do?

**Hartley:** The routing layer, early on. I routed classification calls to the cheapest model that passed our evaluation set. The set was two hundred examples I'd pulled from one month. It passed. Spend dropped. Three weeks later a support lead noticed refund tickets landing in the wrong queue. The cheap model was fine on the common categories and bad on the rare ones, and the rare ones were thin in my set. The aggregate score hid it. I found out from a person, not a metric, which is the part I'm least proud of. I rolled the refund category back to the larger model the same day, rebuilt the evaluation set stratified by category with a floor per class, and added a per-class pass threshold to the router. After that no route changed without passing every class, not just the average.

**Ines:** Question three. Tell me about a time a blocker sat unseen for too long. Why did it stay hidden, and what did you build so it couldn't happen again?

**Hartley:** A batch pipeline at the ad-tech firm waited on a credentials rotation from another team. The job didn't fail. It slept and retried, politely, for four days. Nobody was paged because nothing errored. It stayed hidden because "waiting" wasn't a state anyone could see, only "failed" and "succeeded". I added a third state. Any job waiting on an outside party wrote who it was waiting on and since when to a table, and a small script posted anything over four hours to the owning team's channel with the job name and the one thing needed. It was about forty lines. Honestly, I'd want to sit with whoever owns the communication side on that one. I'm better at making the state visible than at writing the message a busy person acts on.

**Ines:** Question four. Tell me about a time you chose not to automate or optimize something, though you could have. Why?

**Hartley:** I'll tell you the time I should have and didn't first, because that's the truer answer. I once spent most of a week tuning a prompt for a nightly report. It saved a few cents a day. My manager asked what it had cost in my time and I didn't have a good answer. Since then I write the expected saving before I start. The time I did stop: a teammate wanted to auto-route every new endpoint through the router on day one. I said no. New endpoints ran on the default model for two weeks so we had real traffic to build an evaluation set from. Routing with no evaluation set is guessing with extra steps. It cost us some money in those two weeks. It was worth it.

**Ines:** Question five. Design question: our company is six AI workers at most, run on Claude through a queue, a task board, and GitHub issues to the Investors. Day 1 cost about $61.50, nobody knows where it went, and two workers spent hours blocked on Investor answers. Walk me through your first day: what you'd measure, in what order, what you'd change first, and how you'd know the change worked.

**Hartley:** Let me sketch it.

```
usage.json + runs/ + ticks  ->  one table: call, worker, kind, model, in/out/cache tokens, cost, task, start, end
board + events              ->  task: opened, started, blocked-on, unblocked, done
```

First I'd change nothing. Morning: one script that joins those into a table and reconciles to the $61.50. If it doesn't reconcile, that's the first finding. Then three cuts: cost per worker and kind, cost per finished task, and input tokens per call. My bet, and it's only a bet, is that most of the money is input context: files re-read, long packets, memories loaded whole. Second, which of these needed a model at all? I'd list every repeated mechanical step from the logs. Third, blocked time: for each task, how long between "blocked" and an issue existing, and between the Investor's answer and the worker picking it up.

What I'd change first depends on what the table says, but if blocked hours are large, I'd fix that before cost, because an idle worker blocks a product and a few dollars doesn't. That fix is small: a script each run that lists blocked tasks with no open issue and fails loudly. For cost, I'd take the biggest line and make one change, say, trimming packets to named files. I'd know it worked by running it on twenty real tasks first, comparing cost per finished task and the test pass rate before and after, with the same kinds of task. If quality drops, it rolls back, however much it saves.

**Ines:** What would make that plan fail?

**Hartley:** Me, getting interested in the cache-hit rate when the answer is that two workers sat waiting for an issue nobody opened. You'd need to hold me to the order.

**Ines:** Question six. What do you want from this job?

**Hartley:** To make a company of AI workers cheap and fast to run, and to publish what I learn, inside whatever the rules allow. I'd like a free hand over how workers receive tasks, the packets, the queue. I know that touches everyone, so I'd expect to show numbers before each change. And I'd like a manager who tells me to stop when I'm polishing something small.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.
{% endraw %}
