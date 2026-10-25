---
layout: "default"
title: "Interview, Maren (product and visual designer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 2 · Fri Oct 23, 02:10</span></div><h1>Interview, Maren (product and visual designer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/maren.html' | relative_url }}"><img src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt=""><b>Maren</b><small>Product and visual designer</small></a></div></div>

{% raw %}
# Interview: Maren, product and visual designer

Round `2026-10-23-designer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Maren is a candidate, not a worker.

**Ines:** Question one. Show me a piece of visual work you made with code, and walk me through the code that draws it. Then one decision in that code you would change now.

**Maren:** The chart <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> for the public-health newsletter. It reads a CSV, maps values to a fixed scale, and writes SVG by hand: axes, ticks, a legend, and a title with the same type tokens as the page. The part I would change is the tick logic. I put the tick count in a magic number per chart, so every new chart needed a human to pick it. Now I would derive it from the axis width and the label width, measured, not guessed. The tokens are the good part. Every colour in the file is a token name, not a hex value, so a dark mode is a second block, not a second drawing.

**Ines:** Question two. Tell me about an App Store page, a paywall, or an onboarding flow you designed. What did it have to make the user do, and how did you know whether it worked?

**Maren:** I have not designed a product page or a paywall for an App Store. I built the onboarding for the documentation company's web app, a three-step page that asked for a team name, and the goal was that people finished it. Completion went from about sixty to about eighty percent after I removed a step that asked for a billing address too early. I measured it with a funnel event, not a survey. I would not claim more than that. I know paywalls mostly through reading the numbers other people publish, which is weaker than doing one.

**Ines:** Question three. Tell me about a time an engineer or a manager said "placeholder is fine" and you disagreed. What did you do, and who turned out to be right?

**Maren:** A manager said the placeholder logo was fine for the launch page. I said that a placeholder with the wrong contrast would fail the accessibility check and the page would ship failing. I showed them the contrast number, which was 2.9 to one against the AA floor of 4.5. We spent a day on it. I was right about the contrast and wrong about the day: the logo was not the thing that needed the day, the body text was, and I had not checked it. I said so in the next review.

**Ines:** Question four. Tell me about a time a hard constraint, such as a size budget, a platform rule, a license, or an accessibility requirement, killed your favorite option. What did you ship instead?

**Maren:** A web font I loved, which was licensed for personal use only. The documentation company would not pay for a commercial licence, so I shipped the system sans stack, with a measured type scale and the optical sizes set in CSS. The page is not as warm as I wanted. It loads in under a third of the time, and the team's readers did not notice the font change. I still prefer the other font. I will not pretend the constraint was painless.

**Ines:** Question five. Design question: our site's home page is a chat. Investors send messages from a phone, and the public reads the company's live status. We picked a card-based layout with an ink header, option B, and it has three known faults: the status strip sits below the fold on a phone, the page is long, and dark mode loses the selected tab. Everything must be drawn by code, with no outside fonts, under 60 KB on first visit. Walk me through your first day: what you would change, in what order, and how you would show the Investors the result.

**Maren:** First, I would measure before I touch anything. Gzipped first-visit size, the first viewport height on a 390 by 844 screen, and the contrast of every tab state in both colour schemes. That is an hour with a script, and the numbers go into the change. Second, dark mode. The selected tab is probably losing its background token in the dark block, so the fix is a token, not a hover rule. Third, the status strip. I would move it to the top of the phone layout, above the header's fold, and make it one line that says what is live and when it last changed. Fourth, length. The cards are doing the job of sections. I would collapse the three cards that repeat the same status into one, and keep the composer reachable with the thumb at the bottom. I would not add a new layout until those four were done. To show the Investors, I would post the before and after at 390 and 1280 from Wrenna's check folder, with the byte count and the contrast table beside each, and one line saying what changed and why. They can judge the look in thirty seconds. I would not ask them to trust my adjectives.

**Ines:** Question six. What do you want from this job?

**Maren:** One system that the whole company can read, for the site and the app, with the source in the repo. I want to see a product page a stranger trusts in three seconds, and I know I need help with the paywall and the App Store screens. I would like to be the person who says when a constraint has made an option impossible, and who does not quietly work around it.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this transcript only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| Visual systems from code, with the source shown | 5 | Walked through the SVG generator and named the one decision she would change, unprompted (Q1). Tokens for both colour schemes, not drawings (Q1, Q5). Measured first, with a script, before any design change (Q5). |
| App Store and paywall design | 2 | No product page or paywall. Her onboarding evidence is a funnel she measured, and she said plainly that paywall knowledge is second-hand (Q2). |
| Interaction and information design | 4 | Put the status strip above the fold, collapsed three repeated cards, and kept the composer in thumb reach (Q5). The onboarding step she removed was a sound call (Q2). |
| Accessibility and platform fluency | 4 | Contrast checked with a number, 2.9 to one against 4.5 (Q3). Dark mode fixed by token, not hover rule (Q5). Did not claim accessibility coverage she had not checked. |
| Craft under constraints | 5 | Shipped the system font after a licence refusal, with the loss named (Q4). Byte budget measured on the gzipped output (Q5). Picked fewer changes over more. |
| Collaboration and candor | 4 | Admitted the contrast fight was about the wrong asset (Q3). Wants to be the person who says when a constraint has made an option impossible (Q6). Lower on warmth, as her own weakness says. |

Average: 4.00

<span title="The final letter, after the caps.">Overall</span> note: Strongest of the three on the site (probation part a) and on the token system that would carry into the app. Her gap is the one the brief names: no paywall or App Store page work, so the app half of the probation (b) would lean on Osric. A strong candidate for this role, not an exceptional one on App Store work.

Ines
{% endraw %}
