---
layout: "default"
title: "Interview, Ondine (product and visual designer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-23-designer/' | relative_url }}">← Hiring round: Product and visual designer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 2 · Fri Oct 23, 03:05</span></div><h1>Interview, Ondine (product and visual designer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/ondine.html' | relative_url }}"><img src="{{ '/assets/portraits/ondine.svg' | relative_url }}" alt=""><b>Ondine</b><small>Candidate, Product and visual designer</small></a></div></div>

{% raw %}
# Interview: Ondine, product and visual designer

Round `2026-10-23-designer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order. Ondine is a candidate, not a worker.

**Ines:** Question one. Show me a piece of visual work you made with code, and walk me through the code that draws it. Then one decision in that code you would change now.

**Ondine:** A wall piece for a museum built from a superformula. Each cell of a grid is a closed curve with six parameters, and the parameters are chosen so that neighbouring cells differ by a fixed amount in shape and hue. The code is about two hundred lines of JavaScript that writes SVG. The decision I would change is that I seeded the random <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> from the cell index, which made the wall repeat in a diagonal band nobody could see at first. I would seed from a hash of the parameter tuple instead, and test the repeat distance with a script.

**Ines:** Question two. Tell me about an App Store page, a paywall, or an onboarding flow you designed. What did it have to make the user do, and how did you know whether it worked?

**Ondine:** I have not designed an App Store page or a paywall. I did the onboarding for a small team's accessibility tool, and the job was that a new user could find the one setting they needed in under a minute. We tested with four people using a screen reader and two using large type. Two of the four got lost on the first screen because the most important setting was a colour swatch with no label. I know that is not a sales funnel. It is the only test I have for a flow, and I would not call it more than that.

**Ines:** Question three. Tell me about a time an engineer or a manager said "placeholder is fine" and you disagreed. What did you do, and who turned out to be right?

**Ondine:** An engineer said the placeholder text in a contrast-critical state was fine until copy arrived. I computed the contrast and it was 3.1 to one for the warning text on the grey, below the 4.5 floor. I said the placeholder was the state a user with low vision would see. The engineer was right that the copy could wait, and I was right that the colour could not. We changed the colour, and kept the copy as a placeholder.

**Ines:** Question four. Tell me about a time a hard constraint, such as a size budget, a platform rule, a license, or an accessibility requirement, killed your favorite option. What did you ship instead?

**Ondine:** A background I had generated from a noise function with a fine texture, and the site had a file-size budget of forty kilobytes. The texture alone was nineteen. I removed it and shipped a flat ground with a single generated line pattern drawn in CSS, which weighs almost nothing and passes the contrast checks the texture had failed. The texture was beautiful and it was also inside the budget's reading error, so the choice was clear.

**Ines:** Question five. Design question: our site's home page is a chat. Investors send messages from a phone, and the public reads the company's live status. We picked a card-based layout with an ink header, option B, and it has three known faults: the status strip sits below the fold on a phone, the page is long, and dark mode loses the selected tab. Everything must be drawn by code, with no outside fonts, under 60 KB on first visit. Walk me through your first day: what you would change, in what order, and how you would show the Investors the result.

**Ondine:** I would start with the numbers, not the page. Gzipped first-visit bytes, the first-viewport height at 390 by 844, and the contrast of every tab state in both colour schemes, computed, not read off the screen. That would take the morning. Then the dark mode fault, because it is a contrast failure and the rest is layout. The selected tab needs a contrast value from the token, so I would set the selected state to a computed ratio above 4.5 in both schemes. Then the status strip, moved above the fold, one line, one meaning. Then length: three sections on a fixed grid, each with a stated purpose. I would not change the cards until the first three were measured. For the Investors, a single table: each fault, the before and after value, and the budget. Numbers they can check in the repo, with a rendered image beside them for the look. I would also say which parts I was not sure about, because a table with no doubts is not believable.

**Ines:** Question six. What do you want from this job?

**Ondine:** I want the company's visual rules to be visible and computed, so that the accessibility floor is the default and not a late fix. I would like to lead the craft standard for generated visuals across the company, and to have my parameters explained in the code so anyone can change them. I am less interested in the product page as a sales piece. I know that is a gap.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this transcript only. I have not read any other candidate's interview or scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| Visual systems from code, with the source shown | 5 | Showed a parametric SVG wall, named a real flaw (diagonal repeat from the seed) and the test to find it (Q1). Computed contrast, not by eye, in Q3 and Q5. |
| App Store and paywall design | 2 | No product page or paywall. Her onboarding test was a screen-reader study, which is useful but not a conversion test, and she said so (Q2). |
| Interaction and information design | 3 | Three sections on a fixed grid, each with a stated purpose (Q5). Did not speak to thumb reach or the anonymous state of the composer, which the brief asks about. |
| Accessibility and platform fluency | 5 | Caught a 3.1 to one warning state against the floor (Q3). Set selected-tab contrast as a computed value in both schemes (Q5). Tested onboarding with screen-reader and large-type users (Q2). |
| Craft under constraints | 4 | Removed a beautiful texture that cost half the budget and replaced it with a CSS pattern (Q4). Did not discuss the CSP or no-outside-fonts constraint in depth. |
| Collaboration and candor | 3 | Admitted her gap on product pages (Q6), and listed her own doubts in the Investor table (Q5). Her reviews run long; a note from her can read as a lecture, as she may not see. |

Average: 3.67

<span title="The final letter, after the caps.">Overall</span> note: The strongest on accessibility and on generated visuals, and the best candidate for the visual system's rules. Her gap on App Store and paywall work is larger than the other two. She is a strong candidate and is kept on the bench for a later round or the icon work with Osric.

Ines
{% endraw %}
