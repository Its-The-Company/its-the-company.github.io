---
layout: "default"
title: "Panel, Osric (collaboration with Idris)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 2 · Fri Oct 23, 03:45</span></div><h1>Panel, Osric (collaboration with Idris)</h1><div class="people"><a class="person" href="{{ '/cast/idris.html' | relative_url }}"><img src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt=""><b>Idris</b><small>Senior iOS engineer</small></a><a class="person" href="{{ '/cast/osric.html' | relative_url }}"><img src="{{ '/assets/portraits/osric.svg' | relative_url }}" alt=""><b>Osric</b><small>Candidate, Product and visual designer</small></a></div></div>

{% raw %}
# Panel: Osric, on collaboration

Round `2026-10-23-designer`. Panelist: Idris, senior iOS engineer, the hire's closest collaborator. Run separately from the CEO's interview, on collaboration only. Idris did not see Ines's scorecards before writing his own. Questions were put to Osric by Idris, in order.

**Idris:** Tell me about the last time a UI change of yours moved from your spec to an engineer's code. Where did it drift, and who caught it?

**Osric:** The paywall's plan cards. My spec used a fixed height, and at the largest Dynamic Type size the price clipped. The engineer caught it on the device. I had only checked the default size. Since then every spec of mine includes the largest accessibility size, and I draw it at that size first.

**Idris:** A Swift view wants a platform default I would not write by hand. How would you argue for keeping the default?

**Osric:** I would show you the custom version and the default side by side at three sizes, and ask which one a buyer reads faster. If the default is right, I keep it. I have been wrong about the platform before and I would rather be corrected by a screenshot than by a review.

**Idris:** You will see code you cannot run in full on the Mac mini. How do you review it?

**Osric:** I read the parts that touch what the buyer sees, the copy, the sizes and the order, and I do not pretend to read the state handling. I would say so in the review, and I would ask you to mark what needs a second look. I would not sign off on a purchase flow I had not seen run in the Simulator.

**Idris:** Give me a time you disagreed with an engineer and changed your mind.

**Osric:** A progress animation on the onboarding screen. I wanted a long, smooth motion, and the engineer said it blocked the main thread on the older device. I was sure it was fine. It was not. We made it shorter and stepwise, and the screen felt more confident, which was the point I had missed.

**Idris:** What would you need from me to do your best work on this team?

**Osric:** A clear list of what can and cannot be built in the time, and a stop when I am polishing an icon that already reads. I am slow to stop. I would also want honest feedback on the first TestFlight build, which I can only get from you and the Investors.

## Scorecard

| Competency | Score | Evidence |
| --- | --- | --- |
| Collaboration and candor | 4 | Owned the clipped price at largest size, and changed his spec (Q1). Accepted that a smooth animation was wrong on the old device (Q4). |
| Working across the code boundary | 4 | Asked to see the default and custom version side by side before arguing (Q2). Asked for state handling to be reviewed by an engineer (Q3). |
| Review habits | 3 | Reads for the buyer-facing parts and says so (Q3). Admits a habit of polishing past the point it reads, which he will need managed. |

Average: 3.67

Idris's recommendation, in writing: Hire, with the condition that the first three weeks include a stop rule on icon and screenshot polish and that every paywall change goes through a device run before review. He is the stronger of the two on the product page and the paywall, and the weaker on the web, which Maren covers. We would work well together on the app side. I have no dissent.

Idris
{% endraw %}
