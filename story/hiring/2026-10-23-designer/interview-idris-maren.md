---
layout: "default"
title: "Panel, Maren (collaboration with Idris)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 2 · Fri Oct 23, 03:30</span></div><h1>Panel, Maren (collaboration with Idris)</h1><div class="people"><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a><a class="person" href="{{ '/cast/maren.html' | relative_url }}"><img src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt=""><b>Maren</b><small>Product and visual designer</small></a></div></div>

{% raw %}
# Panel: Maren, on collaboration

Round `2026-10-23-designer`. Panelist: Idris, senior iOS engineer, the hire's closest collaborator. Run separately from the CEO's interview, on collaboration only. Idris did not see Ines's scorecards before writing his own. Questions were put to Maren by Idris, in order.

**Idris:** Tell me about the last time a UI change of yours moved from your spec to an engineer's code. Where did it drift, and who caught it?

**Maren:** The status strip's spacing. I wrote the spec in tokens and the engineer wrote it in fixed points, so it looked right at 390 and wrong at 1280. I caught it in the screenshot check, the next morning, and the fix was a token in both places. I put a line in the spec that says which tokens are shared, so the next person does not have to find out.

**Idris:** A Swift view wants a platform default I would not write by hand. How would you argue for keeping the default?

**Maren:** I would ask what the default costs and what the custom version buys, and I would not argue from taste. If the default is a standard control with Dynamic Type and VoiceOver built in, I keep it and I say why in one sentence. I do not know SwiftUI well, so I would ask you what the default does at the largest size before I draw anything.

**Idris:** You will see code you cannot run in full on the Mac mini. How do you review it?

**Maren:** I read for the things I know: the tokens, the contrast values, the sizes, the states. I would say clearly which parts I could not check, and I would not approve what I did not read. If you wrote an animation I cannot test with reduced motion on, I would write that down as an open item and not pass it.

**Idris:** Give me a time you disagreed with an engineer and changed your mind.

**Maren:** A layout for the chat composer, where I wanted the send button on the top right. The engineer said the thumb cannot reach it at the size we target. I checked the reach zone on a phone model, and they were right. I moved the button, and I put the reach measurement in the design notes.

**Idris:** What would you need from me to do your best work on this team?

**Maren:** Early notice when a platform rule changes, a short list of what you are building this week, and a review on the first version rather than the last. I would also want you to tell me when I am over-designing. I am likely to do it, and you are the one who can see the build time.

## Scorecard

| Competency | Score | Evidence |
| --- | --- | --- |
| Collaboration and candor | 4 | Gave a specific drift and its fix, and wrote the shared tokens into the spec (Q1). Named what she could not check (Q3). |
| Working across the code boundary | 4 | Asked what the platform default does before drawing (Q2). Accepted an engineer's reach measurement and wrote it down (Q4). |
| Review habits | 4 | Reads for what she knows, and marks the rest as open items instead of approving (Q3). |

Average: 4.00

Idris's recommendation, in writing: Hire, with the condition that the App Store and paywall work is paired with Osric's review, and that she is asked for the reach and reduced-motion notes on every SwiftUI change. She does not over-talk and she does not claim what she has not done. I would work with her on a Day 8 review. I have no dissent.

Idris
{% endraw %}
