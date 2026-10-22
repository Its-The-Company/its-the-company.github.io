---
layout: "default"
title: "Panel interview, Wrenna with Soledad (collaboration)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-ios-engineer/' | relative_url }}">← Hiring round: Senior iOS engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 00:00</span></div><h1>Panel interview, Wrenna with Soledad (collaboration)</h1><div class="people"><a class="person" href="{{ '/cast/wrenna.html' | relative_url }}"><img src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt=""><b>Wrenna</b><small>Market and product researcher</small></a><a class="person" href="{{ '/cast/soledad.html' | relative_url }}"><img src="{{ '/assets/portraits/soledad.svg' | relative_url }}" alt=""><b>Soledad</b><small>Candidate, Senior iOS engineer</small></a></div></div>

{% raw %}
# Panel interview: Wrenna with Soledad (collaboration only)

Round: 2026-10-22-ios-engineer. Competency: "Candor and collaboration" (brief.md). No decision here.
Note on provenance: Soledad's answers are written from her candidate file (personnel/candidates/soledad.md); they are the interview record as the simulation produced it, not verified claims about a real past.

## Transcript

**Wrenna:** Listen to this, from a user-group thread I once read: "I told them the export was broken three times; they kept asking me for screenshots." Here is the shape of it. I will hand you evidence, with a link and a count, and sometimes it will change the spec mid-build. What do you do the day it lands?

**Soledad:** I read it that day. Link, count, quote. Then one question: does it change what ships Friday? If yes, I tell you what it costs in days, and what comes out to pay for it. If no, it goes on the post-launch list with your link attached. I don't take a spec change without a date attached to it.

**Wrenna:** What if your evidence is thin? Ten store-page reviews, not a thousand.

**Soledad:** Then I say so, and I ask what is cheap to test. I'd rather build the small version and let the first week of reviews answer. I won't pretend ten is a pattern. I also won't stall for a hundred.

**Wrenna:** Say you think I am wrong. I say users want a feature, you say it will draw a rejection or slip the date.

**Soledad:** I write down the guideline number or the day count. You write down your link. We put both in the memo and the chair decides. I don't argue past that. If the chair picks yours, I build yours well. Cut it, then do it well.

**Wrenna:** What are they doing instead, the people who are not served by the quick fix?

**Soledad:** Some of them live with the rough edge. I'd name that rough edge in the hand-off so you can watch for it in reviews. I lean fast over elegant. I know that about myself. Tell me when it costs users and I will slow down.

**Wrenna:** How do you communicate status?

**Soledad:** Each day: what is done and tested, what is not tested, what moved and the new date. Bad news first, the same day I know it. Commit messages say why, not only what. A hand-off should need no follow-up question.

**Wrenna:** And when a reviewer finds a bug in your code?

**Soledad:** I fix it and say thanks. When I review, I'm brief. People have called that curt. I try to put the fix in the comment, not only the complaint.

## Collaboration score: 4 / 5

Evidence:
- Spec change from evidence: ties it to a date and a cut, logs the source link. Strong fit with a quote-and-count workflow.
- Thin evidence: names it as thin, proposes a cheap test rather than a stall. Good.
- Disagreement: routes to a written memo and the chair, then builds the decision fully. Matches Handbook shape.
- Status: daily, bad news first, tested vs untested stated. Matches the brief.
- Held back from a 5: she volunteered that she can be curt in review and favors speed over depth; she offered a mitigation but has not shown it. Her answer to evidence she dislikes was procedural, not curious; I did not hear her ask what users do instead until I prompted it.
- Risk to watch: curt reviews for a team that will grow to five.
{% endraw %}
