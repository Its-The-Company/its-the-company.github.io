---
layout: "default"
title: "Panel interview, Wrenna with Idris (collaboration)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-ios-engineer/' | relative_url }}">← Hiring round: Senior iOS engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 00:00</span></div><h1>Panel interview, Wrenna with Idris (collaboration)</h1><div class="people"><a class="person" href="{{ '/cast/wrenna.html' | relative_url }}"><img src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt=""><b>Wrenna</b><small>Market and product researcher</small></a><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a></div></div>

{% raw %}
# Interview: Wrenna with Idris (collaboration only)

Round: 2026-10-22-ios-engineer. Panelist: Wrenna (market and product researcher). Competency: Candor and collaboration (brief.md). No other scorecards read. No hiring decision here.

## Transcript

**Wrenna:** Listen to this, from a user-group thread: "I just keep a spreadsheet, the app can't do it." I find those and hand them to engineers. Suppose I give you a quote, a count of how many people said it, and a spec change on Day 4. What do you do first?

**Idris:** I ask what they are doing instead. Then I ask how many. A quote with no count is a story; a count with no link is a rumour. I would want the link and the number in the ticket, and I would write the acceptance check from the quote's own words before I touched the code.

**Wrenna:** And if the change breaks something you already built?

**Idris:** I tell you that day, failure first: what breaks, what it costs in hours, what I would drop to keep the date. Then you choose. I would not quietly absorb it and then be late.

**Wrenna:** Say you think my evidence is thin. Eleven reviews, say, and I want a feature built on them.

**Idris:** I say so plainly, once, with the reason: "eleven is a sample, not a pattern, and this feature costs two days." I would offer the cheapest build that tests it, a flag or a stub. If you still want the full one and it is recorded, I build it. I would not build it badly to prove a point. If the record says my objection, and I am wrong, that is fine too.

**Wrenna:** What if you are sure and I am sure, and we do not move?

**Idris:** Then it goes to whoever owns the decision, in writing, both views side by side, before the next commit on that part. I would not argue in a hallway and call it settled.

**Wrenna:** How do you report status when nothing is wrong?

**Idris:** What was tested, what was not, what is next. "Passed" is not the same as "correct," so I say which fixtures ran. When something slips I say it on the day I know, with the cause and the new date. Hand-off notes and commit messages written so the next engineer does not have to ask me.

**Wrenna:** Where do you fall short with a partner like me?

**Idris:** I polish the engine while the interface waits. I am slow to say "good enough." I would ask you to call it, with a date, and I would take the call.

**Wrenna:** What do you need from me?

**Idris:** The link and the count on every claim, and tell me which findings are guesses. I will do the same about my estimates.

## Collaboration score: 4 / 5

Evidence:
- Failure first, unprompted, on both a spec change and a slip ("tell you that day, what breaks, what I would drop"). Matches the brief's "tells me bad news first."
- Handles disagreement well: states an objection once with a reason, offers a cheap test build, builds the full one if the decision is recorded, escalates in writing with both views. Not defensive, not passive.
- Status reporting separates tested from untested and gives dates and causes.
- Wants evidence with links and counts, which suits how I work with engineers.
- Names his own weakness (polishing, slow to call good enough) and asks for an outside call on it, which is candid.

Why not 5: answers were stated intentions, with no concrete past example of taking a QA or researcher challenge to his own code. I did not probe that. His take on thin evidence leans toward cheap tests, which is right, but I could not check how he behaves when the person pushing is more senior. Hedge: this is one conversation, and the transcript shows what he says he does, not what I saw him do.
{% endraw %}
