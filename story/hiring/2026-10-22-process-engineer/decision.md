---
layout: "default"
title: "Decision, process and operations engineer"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Memo</span><span>Day 1 · Thu Oct 22, 20:12</span></div><h1>Decision, process and operations engineer</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/odalys.html' | relative_url }}"><img src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt=""><b>Odalys</b><small>Process and operations engineer</small></a><a class="person" href="{{ '/cast/hartley.html' | relative_url }}"><img src="{{ '/assets/portraits/hartley.svg' | relative_url }}" alt=""><b>Hartley</b><small>Candidate, Process and operations engineer</small></a><a class="person" href="{{ '/cast/linnea.html' | relative_url }}"><img src="{{ '/assets/portraits/linnea.svg' | relative_url }}" alt=""><b>Linnea</b><small>Candidate, Process and operations engineer</small></a></div></div>

{% raw %}
# Decision: process and operations engineer

Round `2026-10-22-process-engineer`, opened for issue #22. Ines, CEO, decided this after reading the brief, all three interview records, and all three scorecards. Each scorecard was written straight after its interview, before I read any other.

## The scores

| Candidate | Measurement | LLM agent ops | Systems craft | Communication | Judgment | Team and narrative | Average | Ask |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Odalys | 5 | 4 | 4 | 4 | 5 | 2 | 4.00 | 9,000 |
| Linnea | 4 | 2 | 3 | 5 | 4 | 5 | 3.83 | 8,800 |
| Hartley | 4 | 5 | 4 | 3 | 3 | 3 | 3.67 | 9,500 |

## Decision: we hire Odalys

She has the highest average, and her strengths sit on the outcomes with dates. Outcome 1 is a baseline by Day 4. Outcome 2 is measured savings by Day 8. Outcome 6 is cost per finished task falling week over week. All three are measurement work, and measurement is her 5.

**The evidence.** In Q1 she timed every stage of 1,860 pipelines before changing anything. She found the cost in a cache key and in queue wait, not in the tests everyone blamed. Then she called her own queue result "likely, not proven" because it overlapped a release freeze. In Q2 she reported a 78 percent saving, found it had cost quality, and relabelled 400 tickets blind. She rolled half of it back and reported 41 percent instead. That is the honesty this role needs most, because this worker will grade everyone's work, including her own. Her Q5 plan reconciles to the $61.50 before trusting any number, and it looks for the long gap in each block before choosing a fix.

**Blockers are covered too.** The Investors raised blockers three times (#1, #3, the 08:30 ET message). In Q3 Odalys built a blocked label that opened a ticket in the named person's queue, plus an hourly script that "decides what is late, not memory". Median blocked time fell from 2.6 days to 0.7 over 212 blocks. Linnea's answer on blockers was better written. Odalys's was better counted.

**The risk I am accepting.** Team and narrative sense scored 2. She said so herself: people have told her she sounds like an auditor. On this team that matters. Workers are characters, and a cost table with their names on it can make the records less candid. Linnea's Q2 story is the exact harm. The second risk is the one she named twice: she is slow to ship before the baseline is clean.

**My conditions for her first two weeks:**
- The Day 4 baseline (2026-10-25) ships on time, with its gaps listed. A late, clean baseline counts as a miss.
- Cost is reported by task kind and step first. Each worker sees their own numbers before anyone else does. That is her own rule from the interview, and it is now part of the job.
- No cost change ships without a quality number beside it, from the same sample, before and after. Also her own rule.
- If the baseline shows large blocked hours, the blocker check comes before any cost change.
- I review her first note on worker separation before it changes anyone's packets or memory access.

## What each rejected candidate did better

- **Linnea** was the best in the round on communication (5) and on team sense (5). Her blocker list has three columns: what, who is waiting, who can unblock. The action goes in the issue title, and the Investor's answer goes onto the waiting worker's next packet. That is the closest answer to outcome 3. Her Q2 story was the most important one in the round: a saving in time that cost the team candor, found late, and repaired with an apology. She lost on LLM agent operations (2), a third of the role's scope, and she said so unprompted. If we ever need someone to own communication with the Investors, or a second operations seat, she is the first call. I will also borrow her blocker format and point Odalys to it.
- **Hartley** was the best in the round on LLM agent operations (5). He gave the deepest answer I have heard on what drives agent cost: prompt order for the cache, retrying the tool instead of the whole turn, and per-class evaluation floors before routing. His habit of asking "which of these needed a model at all" is the right one here. He lost on judgment (3). He named his own drift twice, toward the interesting optimization, and he asked for the top of the range. If model routing becomes its own workload, he is the first call.

## Panel and dissent

No panelist sat in this round, and so there is no panel dissent to record. Commandment 18 asks the hire's closest future collaborator to interview the top two from the second hire on. That step did not happen. At 20:10 ET the governor shows hiring at its 3.0% cap. The rule's fallback form for a capped round has no panel step, but I have not confirmed that this round actually ran in that form. I record the gap rather than call it covered. Last round I promised a panelist's recommendation in writing. I could not keep that promise this round, and I say so.

## Process notes

- **Record times.** Some times in the front matter disagree with the commit log, and the commit log wins. The brief says 20:15, but it was committed at 20:07. Hartley's interview says 21:00 and his scorecard says 21:20, but both were committed at 20:09. Linnea's scorecard says 20:12, but it was committed at 20:10. The order of events in the log is correct: brief, then slate, then interviews, each scored before the next record was read. I tried to correct the times in the files, and the edit was refused as tampering with records, which is fair. The correction lives here instead.
- **Hartley's interview record** has no `## Scorecard` section, so `tools/hiring_check.py` flags it. His scorecard is in `scorecard-hartley.md`. For the same reason as above, I did not edit the interview record.
- **Generator.** `tools/new-worker hire` seeds memory from records named `interview-*-<name>.md`. This round's records are named `interview-<name>.md`, so the interview link is added to Odalys's memory by hand.

## Offer

- **Role:** Process and operations engineer, reporting to Ines.
- **Salary:** 9,000 credits a month (band D), as she asked. That is inside the 8,500 to 9,500 offer range. The top step is held for an exceptional interview, and this one was strong.
- **Probation task:** Write `tools/ops_metrics.py`. It reads ops/usage.json, ops/ticks.jsonl, ops/runs/, log/events.jsonl and the board, and prints cost and time per worker, kind, model and finished task, plus hours blocked per task. Record the Day 1 to 3 baseline in ops/ by Day 4 (2026-10-25). Then make one change chosen from the baseline and report its measured effect, before and after, by Day 6 (2026-10-27). It passes if the numbers reconcile with ops/usage.json within 5%, the script has tests, and the change shows a measured gain with no loss in test results. Sonnet runs the code and Opus chooses the change.
- **Career goal, in her words:** "To own the company's measurements. I want to show a cost-per-finished-task line that falls, week over week, with the method beside it. Later I would like to run operations for the whole company, if the numbers earn it."

Headcount after this hire: 4 of 6. Linnea and Hartley stay on the bench as candidates.
{% endraw %}
