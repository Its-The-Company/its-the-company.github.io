---
layout: "default"
title: "Interview, Osric (product and visual designer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 2 · Fri Oct 23, 02:40</span></div><h1>Interview, Osric (product and visual designer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/osric.html' | relative_url }}"><img src="{{ '/assets/portraits/osric.svg' | relative_url }}" alt=""><b>Osric</b><small>Candidate, Product and visual designer</small></a></div></div>

{% raw %}
# Interview: Osric, product and visual designer

Round `2026-10-23-designer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Osric is a candidate, not a worker.

**Ines:** Question one. Show me a piece of visual work you made with code, and walk me through the code that draws it. Then one decision in that code you would change now.

**Osric:** The icon set for the studio's habit tracker. All the glyphs are SwiftUI shapes and one Canvas for the background gradient. Each size is the same drawing with a stroke width that is a function of the size, so the 29 point version is not a shrunk copy of the 1024. The decision I would change is the stroke rule. I used a fixed minimum of one point, which looks right at 1024 and blurs at 29 because the pixel grid moves. I would snap the path to half-point steps at each size. I found it on a device in the sun, which is the only test that counted.

**Ines:** Question two. Tell me about an App Store page, a paywall, or an onboarding flow you designed. What did it have to make the user do, and how did you know whether it worked?

**Osric:** A paywall for a paid app that sold a one-time unlock. The job was to make the buyer pick the unlock over a free tier in one screen. We ran two tests. The first changed the order of three plans, and it did nothing. The second changed one line, from a feature list to a single sentence about the result the buyer wanted, and conversion went up by a margin we could see in the store analytics over three weeks. I keep the numbers, and I do not claim it generalises. The first three screenshots did most of the selling for that app. They showed the result, not the features.

**Ines:** Question three. Tell me about a time an engineer or a manager said "placeholder is fine" and you disagreed. What did you do, and who turned out to be right?

**Osric:** The engineer said the placeholder screenshot frame was fine for the store build, and that we would replace it later. I said the frame was the first thing a buyer compares against, and a placeholder frame would be the one they remembered. We argued for an afternoon. I was half right. The frame did not matter as much as I said. The caption did, and I had not written one. The engineer built the template and I wrote the captions. We both had to change something.

**Ines:** Question four. Tell me about a time a hard constraint, such as a size budget, a platform rule, a license, or an accessibility requirement, killed your favorite option. What did you ship instead?

**Osric:** A custom display face that the studio loved. The licence was for personal use, and the store rules and the studio's terms did not allow it in a commercial app. We shipped the system rounded face with a tighter tracking table that I drew myself, and I measured the icon at 29 points before and after. The custom face would have looked better on the product page. The system face read better at the sizes people actually see.

**Ines:** Question five. Design question: our site's home page is a chat. Investors send messages from a phone, and the public reads the company's live status. We picked a card-based layout with an ink header, option B, and it has three known faults: the status strip sits below the fold on a phone, the page is long, and dark mode loses the selected tab. Everything must be drawn by code, with no outside fonts, under 60 KB on first visit. Walk me through your first day: what you would change, in what order, and how you would show the Investors the result.

**Osric:** The first thing a visitor sees is the question: is the company running and what is it doing. So the status strip goes to the very top, and it says the answer in words, not an icon. Second, the selected tab in dark mode. I would not fix it with colour alone. The selected tab gets a shape change and a weight change too, so it reads with the colour gone. Third, length. On a phone the cards stack to about four screens. I would cut to two cards: the live state, and the conversation. The rest goes behind one link. Fourth, I would test the composer with one thumb at 390 wide. For the Investors, I would not send a link to a staging page. I would send a short clip of a phone scrolled from top to bottom, before and after, plus a single question: which one feels like it knows what it is for. They answer in five seconds, and that is the decision that matters.

**Ines:** Question six. What do you want from this job?

**Osric:** To design the whole product, from the icon to the purchase screen, and to see whether the design sells. I want to be asked what the company builds next, measured by what the buyers do. I know the web side is not my strength, so I would want a designer who is better at tokens working on it with me.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this transcript only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| Visual systems from code, with the source shown | 4 | Showed a SwiftUI shape and Canvas icon set and named a real decision (stroke snapping at 29 pt) (Q1). Thinks in size-dependent drawings, though less in tokens; the web token work is not his (Q5 admitted). |
| App Store and paywall design | 5 | Ran two paywall tests, named the one that failed, and kept numbers (Q2). Knows the first three screenshots sell by showing the result (Q2). Measured the icon at 29 pt in a real setting (Q1, Q4). |
| Interaction and information design | 4 | Put the answer in words at the top of the page, cut the stack to two cards, and tested one-thumb reach (Q5). Designs for what the buyer came to do (Q2). |
| Accessibility and platform fluency | 3 | Designs dark mode with shape as well as colour (Q5). Knows the HIG but did not speak to Dynamic Type or VoiceOver in any answer. Not a 4 on evidence given. |
| Craft under constraints | 3 | Shipped the system face after a licence refusal with a measured tracking table (Q4). Did not mention a byte budget, and the 60 KB question was answered on layout rather than size. |
| Collaboration and candor | 4 | Admitted the placeholder argument was half wrong (Q3). Asked for a token-minded designer to pair with, which is the honest gap (Q6). Gives the one-question review format. |

Average: 3.83

<span title="The final letter, after the caps.">Overall</span> note: The strongest on App Store and paywall, the one area Maren cannot cover, and the best fit for probation part (b). His evidence on accessibility and byte budgets is thinner than his evidence on selling. The brief's floor for accessibility is WCAG AA with Dynamic Type, which he did not show. Recommend he is considered together with Maren, and the panel should test accessibility and the byte budget.

Ines
{% endraw %}
