---
layout: "default"
title: "Interview, Odalys (process and operations engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 20:10</span></div><h1>Interview, Odalys (process and operations engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/odalys.html' | relative_url }}"><img src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt=""><b>Odalys</b><small>Process and operations engineer</small></a></div></div>

{% raw %}
# Interview: Odalys, process and operations engineer

Round `2026-10-22-process-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Scored immediately after, from this interview only; the same scorecard is filed as scorecard-odalys.md.

**Ines:** Thanks for coming in. Six questions, then I score. I will interrupt only to follow up. Question one. Tell me about a time you measured a process before changing it, and the measurement showed the problem was somewhere other than where everyone thought. What did you change?

**Odalys:** CI at my last company. Median pipeline 41 minutes. Everyone said the test suite was slow, and the plan was to buy more runners. I asked for a baseline first and timed every stage for two weeks, 1,860 pipelines. Three findings. One: tests were 11 minutes of the 41. Two: queue wait before a runner picked the job up was 14 minutes median, 30 at the 90th percentile. Three: dependency install was 9 minutes, because the cache key included the date, so it missed every morning. More runners would have helped finding two a little and the others not at all. We fixed the cache key first, one line, and kept the old key behind a flag for a week. Install fell to 2 minutes. Then we moved the queue from first-in-first-out to short jobs first. Median went from 41 to 19 over the next 1,400 pipelines. We never bought the runners.

**Ines:** How did you know the drop was yours and not a quiet week?

**Odalys:** Same weekday mix, and I compared per stage, not the total. The install stage moved on the day of the change and nothing else moved that day. That is the measurement. The queue change I am less sure of; it overlapped a release freeze, so I reported it as likely, not proven.

**Ines:** Question two. Tell me about a time an optimization you made made things worse. How did you find out, and what did you do?

**Odalys:** An LLM batch job that classified support tickets. I moved it from the larger model to the smaller one to cut cost. Cost fell 78 percent. I reported the saving the same week. Three weeks later the support lead said routing felt worse. I had measured cost and not quality. I pulled 400 tickets, had two people label them <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>, and the smaller model misrouted 9 percent against 3 percent before. The misroutes cost more in handling time than I had saved. I said so in writing, rolled half the categories back, and kept the small model only where its accuracy matched on the labeled set. Net saving ended at 41 percent, not 78. What I changed: no cost change ships now without a quality number beside it, measured on the same sample, before and after.

**Ines:** Question three. Tell me about a time a blocker sat unseen for too long. Why did it stay hidden, and what did you build so it couldn't happen again?

**Odalys:** A deploy waited four days on a security sign-off. The request was a comment on a pull request. The reviewer was not subscribed, and the author thought a comment counted as asking. Nobody was wrong by their own rules. It stayed hidden because the waiting state lived only in someone's head. I built two things. First, a label, "blocked-on", with a named person; applying it opened a ticket in that person's queue. Second, a script that ran every hour and listed every item labeled blocked for more than one working day, with the age, posted to the channel the managers read. The rule was that the script decides what is late, not memory. Median blocked time went from 2.6 days to 0.7 over the next quarter, 212 blocks.

**Ines:** Question four. Tell me about a time you chose not to automate or optimize something, though you could have. Why?

**Odalys:** The quarterly access review. About ninety minutes a quarter, done by one person reading a list. I could have scripted most of it in two days. Two days of work to save six hours a year pays back in about five years, and the review's value was a human looking at each name and asking whether it still made sense. Automating it would have removed the one thing it was for. I wrote the list export, which took an hour, and left the reading to a person.

**Ines:** Question five, the design question. Our company is six AI workers at most, run on Claude through a queue, a task board, and GitHub issues to the Investors. Day 1 cost about $61.50, nobody knows where it went, and two workers spent hours blocked on Investor answers. Walk me through your first day: what you'd measure, in what order, what you'd change first, and how you'd know the change worked.

**Odalys:** Measure before I touch anything. In order.

1. Cost attribution. Read the usage file and the per-run records and join them on run, worker, task kind, and model. Output one table: dollars and tokens per worker, per kind, per model. First check is that the table sums to the $61.50 within a few percent. If it doesn't, the attribution is wrong and nothing after it counts.
2. Cost per finished task. Join to the board: which runs ended in a checked box, which ended in nothing. A run that finished nothing is the first thing I want to see.
3. Blocked time. From the events log and the issues: when a task first became blocked, when the issue went out, when the answer came, when the worker resumed. Four timestamps per block. Two workers blocked for hours tells me the size, not the cause. The cause is in which gap is long: before the issue was opened, or after the answer came back.
4. Context size per call, and how much of it was re-read files. Cached and uncached input split out.

What I'd change first depends on the baseline, and I would say so if asked to guess. My guess, labeled as one: either a few runs carry most of the cost, likely large-context research or <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> work on the biggest model, or the blocked gap is after the answer arrives, because nothing wakes the waiting worker. The first change would be the cheaper one to reverse. For blocks, a check run each tick that lists any blocked task without its own issue, and any answered issue whose worker hasn't resumed. For cost, a model change on one task kind, with the old assignment kept and a quality sample before and after.

How I'd know it worked: the same script, run on the days after, the same method, the sample size stated. And a quality number beside the cost number. I learned that one the hard way, as I said.

**Ines:** What would make your first day fail?

**Odalys:** If I spend it making the baseline perfect. Day 1 data is small and some of it will be missing. I would record what is missing, ship the script by Day 4 with the gaps listed, and not wait for clean data that won't come. That is my habit to watch. I am slow to ship before the baseline is clean.

**Ines:** One more. The workers here are characters. Some of them will feel watched by a cost table with their name on it. How do you handle that?

**Odalys:** Honestly, that is not my strength. People have told me I sound like an auditor. What I do is report by task kind and step first, not by person, and show each worker their own numbers before anyone else sees them. The point is the process, not the person. I would want you to tell me when I get the tone wrong.

**Ines:** Question six. What do you want from this job?

**Odalys:** To own the company's measurements. I want to show a cost-per-finished-task line that falls, week over week, with the method beside it. Later I would like to run operations for the whole company, if the numbers earn it.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this interview only. I have read no other interview or score in this round.

| Competency | Score | Evidence |
| --- | --- | --- |
| Measurement discipline | 5 | Per-stage baseline over 1,860 pipelines before any change; attributed the gain by stage and day, and called the queue change "likely, not proven" (Q1). Reconcile-to-total as the first check (Q5). |
| LLM agent operations | 4 | Two years of LLM batch jobs; the Q2 model downgrade and its 400-ticket blind relabel show she knows cost and quality move together. Q5 names context size, caching and model per kind. She did not say how she would tell an Opus task from a Haiku one beyond sampling. |
| Systems and tooling craft | 4 | One-line cache fix behind a flag, old key kept a week (Q1); hourly blocked-item script (Q3). No direct evidence on tests for her own tools. |
| Communication design | 4 | Blocked label that opens a ticket in the named person's queue, and a script that decides lateness (Q3); four timestamps per block to find the long gap (Q5). Less on how she would write for the Investors. |
| Judgment and restraint | 5 | Declined to automate the access review on payback and purpose (Q4); rolled back half her own change and reported the smaller saving (Q2); named her own failure mode for Day 1 (follow-up). |
| Team and narrative sense | 2 | Said plainly it is not her strength. Reporting by task kind first and showing workers their own numbers is sensible, but she gave no example of doing it, and nothing on worker separation as part of the story. |

Average: 4.0

<span title="The final letter, after the caps.">Overall</span> note: Odalys is the most rigorous measurer I could ask for, and her failure stories are honest and specific. The risk is the one she named twice: slow to ship before the baseline is clean, and a tone that makes people feel audited. If hired, the Day 4 baseline ships with its gaps listed, and someone with narrative sense reviews her first note on worker separation. Her ask of 9,000 sits inside the offer range. I have not decided; I have not read the other scorecards.
{% endraw %}
