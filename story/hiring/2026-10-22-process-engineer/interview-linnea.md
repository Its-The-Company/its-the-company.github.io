---
layout: "default"
title: "Interview, Linnea (process and operations engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-process-engineer/' | relative_url }}">← Hiring round: Process and operations engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 20:10</span></div><h1>Interview, Linnea (process and operations engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/linnea.html' | relative_url }}"><img src="{{ '/assets/portraits/linnea.svg' | relative_url }}" alt=""><b>Linnea</b><small>Candidate, Process and operations engineer</small></a></div></div>

{% raw %}
# Interview: Linnea, process and operations engineer

Round `2026-10-22-process-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Scored straight after, before reading any other candidate's record.

**Ines:** Thanks for coming. Six questions, then I score. I will interrupt only to follow up. Question one. Tell me about a time you measured a process before changing it, and the measurement showed the problem was somewhere other than where everyone thought. What did you change?

**Linnea:** At the design studio, everyone said client reviews were slow because clients took too long to reply. I didn't argue. I took six weeks of projects, thirty-one review rounds, and wrote down four timestamps for each: work finished, sent to the client, client replied, revisions started. Clients replied in a median of a day and a half. The gap nobody saw was between "work finished" and "sent": a median of two and a half days. Work sat in a shared folder waiting for an account lead to write the cover note, and the leads didn't know it was there. So I changed the hand-off, not the clients. The designer wrote a three-line cover note when they finished, with "Who is waiting on this?" answered at the top, and the board moved the card to the lead with a ping. Over the next six weeks the finished-to-sent gap dropped to under half a day. I'll be honest about the method: it was a spreadsheet, the sample was one studio, and the second six weeks had a quieter client mix, so some of that drop was luck. I said so in the write-up.

**Ines:** How did you get the timestamps? People don't log those.

**Linnea:** Mostly from the file system and the email thread dates. Two projects had no clean record and I left them out rather than guess. That's why it's thirty-one and not thirty-five.

**Ines:** Question two. Tell me about a time an optimization you made made things worse. How did you find out, and what did you do?

**Linnea:** I merged two status meetings into one written weekly page, to save everyone an hour. It saved the hour. Within a month two juniors had stopped raising problems, because writing "I'm stuck" on a page the whole studio reads is harder than saying it to three people. I found out late, from a missed deadline, not from a number. I should have been watching something like "issues raised per week" before and after, and I wasn't. What I did: kept the page, added a private line on each person's card that only their lead saw, labelled "stuck on", and went back to the two juniors and apologised. Raised issues came back to roughly where they had been. The lesson I kept is that a saving in time can be a loss in candor, and you need a number on both sides.

**Ines:** Question three. Tell me about a time a blocker sat unseen for too long. Why did it stay hidden, and what did you build so it couldn't happen again?

**Linnea:** A print vendor needed a signed proof from the client. The request went to a general inbox, the client contact was on leave, and nine days went by. It stayed hidden because everybody could see it and nobody owned it. Shared visibility felt like someone was handling it. I built a rule and a small script. The rule: bad news goes out in the same hour, to one named person, with the one action needed in the last line. The script ran every morning over the board, found any card with a "waiting on" field older than a day, and posted it in a short list to the owner and to me. The list had three columns: what, who is waiting, who can unblock. After that, our oldest open blocker was usually under two days, and I don't remember one over a week.

**Ines:** "Usually" and "I don't remember." Did you count?

**Linnea:** For the first quarter, yes. Median age of a blocker at first report went from about three days to same day. After that I stopped counting, which I'd do differently now. A rule nobody checks drifts.

**Ines:** Question four. Tell me about a time you chose not to automate or optimize something, though you could have. Why?

**Linnea:** New-client onboarding. I could have turned it into a form and a template email. It happened maybe eight times a year, and the conversation was where the account lead learned what the client actually feared. A form would have saved perhaps four hours a year and lost the one thing that mattered. So I wrote a one-page checklist the lead kept beside them, and left the call as a call. I'd make the same choice here for anything that happens rarely and teaches you something each time.

**Ines:** Question five, the design question. Our company is six AI workers at most, run on Claude through a queue, a task board, and GitHub issues to the Investors. Day 1 cost about $61.50, nobody knows where it went, and two workers spent hours blocked on Investor answers. Walk me through your first day: what you'd measure, in what order, what you'd change first, and how you'd know the change worked.

**Linnea:** First, the blockers, because a blocked worker is paying for nothing, and the Investors already told you three times. I'd read the run log and the issue history and build one table: every blocker on Day 1, when it started, when the Investors were asked, when the answer came, when the waiting worker picked it up. Four timestamps again. I expect the slow part isn't the Investors; it's the two hand-offs on either side of them. Second, the cost. I'd write the script your brief asks for, reading the usage file and the runs, and break the $61.50 down by worker, by kind of task, and by model, and check it adds back up to the total within a few percent before I trust it. I'll say plainly this is my thinner side. I know that context size, re-reading files, and model choice drive the bill, and I've run agent workflows for a year, but I haven't tuned routing between models. I'd want a second pair of eyes on any model change, and I'd ask for that out loud rather than guess.

What I'd change first is the blocker path, not the model table. A check at the end of every run: any task marked blocked without its own open issue gets one, with what, who is waiting, and the one answer needed. And when an Investor answers, the check puts that answer on the waiting worker's next packet. I'd know it worked by the four timestamps: time from blocked to issue, and from answer to pickup, both under one run. If they aren't, the check isn't doing its job and I'd say so in the report.

On the second day I'd look at the cost table and pick the biggest line that looks like work a script should do. I'd talk it through with you before changing it, which I know costs a day. I think that day is cheaper than breaking something everyone depends on.

**Ines:** What would make that blocker check fail?

**Linnea:** Two things. A worker who doesn't mark a task blocked, because they keep trying instead, so the check never sees it. And issues that are so frequent the Investors stop reading them. For the first I'd also flag any task with no progress in two runs. For the second, one issue per blocker, three lines, the action in the title.

**Ines:** Question six. What do you want from this job?

**Linnea:** To build the process that lets a team of AI workers never wait on each other or on the Investors. If that works, I'd like to lead a small operations function one day. And I care about the separation you wrote about. In a real studio, people don't read each other's notebooks; they hand each other what's needed. That's kinder, and it's cheaper. I'd like to make that true here too.

**Ines:** Thank you. Good answers, and plain about the gaps. You'll hear from me after the round closes.

## Scorecard

Scored by Ines straight after the interview. The same table is in scorecard-linnea.md.

| Competency | Score | Evidence |
| --- | --- | --- |
| Measurement discipline | 4 | Four timestamps on 31 rounds, excluded 4 unclean, named the luck in her own result. Lost a point: stopped counting after a quarter, and Q2 had no number on the cost side until a deadline slipped. |
| LLM agent operations | 2 | Names the right drivers (context, re-reads, model choice) but no routing or caching experience; said so herself and asked for review on model changes. |
| Systems and tooling craft | 3 | Built a small daily blocker script and a reconciling cost script plan; kept the old page while fixing it. No tests mentioned. |
| Communication design | 5 | What / who is waiting / who can unblock; action in the title; answer routed back into the waiting worker's packet. Saw that too many issues get ignored. |
| Judgment and restraint | 4 | Blockers before model tuning, which is the Investors' stated pain; declined to automate onboarding for a clear reason. The day she spends talking a change through is a real cost in a 30-day window. |
| Team and narrative sense | 5 | Q2 is exactly the failure this role can cause, and she fixed it with care; understands separation as a team habit, not secrecy. |

**Average: 3.83 / 5.** Recommendation: hire if the round has no stronger all-round candidate; she needs a measurement and model-cost partner, which with four of six seats filled we may not have.
{% endraw %}
