---
layout: "default"
title: "The Restructuring: summary for #41"
section: "documents"
description: "The Restructuring&#x27;s findings, recommendations and decisions, for pasting on #41."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/06-summary.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 23 · Fri Nov 13, 8:07 AM ET</span><span><code>documents/restructuring/06-summary.md</code></span></div><h1>The Restructuring: summary for #41</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Everything below this line is for pasting.

## The Restructuring: findings and decisions

**The short answer.** The engine is right; the shape around it is not. Today's plan builds a Python IDE with widgets, for programmers. Your statement asks for three audiences served equally and the Builder in 1.0. We recommend keeping how Python reaches a widget and rebuilding around it: one Project, one home with three ways to start, the Builder inside 1.0.

**Where the app stands.** This work measured nothing, and little is proven on a phone: by the records, only Countdown draws on the last TestFlight build, cause not found (T-3783). Built (code read, not run): widgets in six sizes, 12 premades, the editor. Not built: the Builder, Pages, any marketplace, iMessage, background refresh.

**What works most against the original vision,** most limiting first (detail in our 7:27 AM answer, c6852878736):

1. **Python can't draw a widget.** It hands data to drawing code built into our app, so every widget and every Builder block is made from parts we ship.
2. **Widgets don't run live.** About 40 to 70 refreshes a day, at the system's choosing (Apple's page); buttons, toggles and links only.
3. **Python may not fit inside a widget's small memory** (unmeasured on a phone). If not, a widget shows what the app last worked out.
4. **Nothing runs on a schedule.** Only a person's own Shortcuts automation gives a fixed time; push needs a server, which costs money.
5. **The marketplace is the riskiest part with Apple** (guideline 2.5.2, perhaps the mini-apps rules, 4.7); only Apple can say. iOS also keeps apps apart, not projects inside one app: downloaded code needs a wall we build and prove.

Python on iOS is also "embedded": only the compiled packages we ship, no starting other programs, no running unseen. Programmers who expect desktop Python feel that most.

**What we recommend.**

- **1.0:** the IDE; widgets and 12 premades; the Project; the Builder for widgets, with hand-written code as a custom block; a Gallery of our own items; sharing by file; Pro. Likely late March 2027, honest range early February to early June. These are estimates; our first submission date slipped from Day 17 to Day 48.
- **Near Day 60 (12-20):** the IDE and widgets go to outside testers on TestFlight, not to the store.
- **1.1:** Pages, about eight weeks after 1.0. **1.2:** a live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> of other people's block documents, only if Apple says yes in writing.
- **Not now:** iMessage (measure first), paid items, paying creators, other people's Python listed in the app, servers, accounts.
- **Order:** premades draw on a phone; IDE and widgets finished; foundations; the Builder; release. Each ends with a proof on your phone, eight to 1.0.

**The mock-ups.** Three directions, drawn by code: A evolves the approved Paper and Studio; B is a dense, programmer-first workbench; C is creative-first, with tiles, larger type and the Builder up front. We recommend A as the base, with C's Builder (the widget stays on top), C's plain-words run card and the three start buttons B and C share. C shows 4 projects a screen to A's 7. Nothing is adopted without your "approve".

**What we need from you.** [`documents/restructuring/06-decisions.md`](06-decisions.html) lists 29 decisions with options and a recommendation each. "Approve the recommendations" takes them all, or answer by number. The largest:

- **1:** 1.0 waits for the Builder, and the release moves past Day 60.
- **14:** Python runs in the app; Python inside the widget gets one phone sitting, then is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> unless it passes. This changes your 10-29 priority.
- **5, 6, 7 and 9:** the marketplace starts as our own free Gallery, and you write to Apple before any live shelf.
- **21 and 22** (identity, your "approve"): a wider mission statement, and the visual direction.

Also yours: bank and tax details (due 11-02; nothing can be sold or test-bought without them), the name (#90), and three to five people who don't code to try the Builder.

**Money.** Nothing to approve today. First costs, each a request card when due: a domain at release ($10 to $20 a year), Apple's $99 renewal on 2027-10-28, and at 1.2 hosting ($0 to $25 a month) and a $6 DMCA filing.

**After your approve** the company rewrites ADR-001 and ADR-007, writes the Builder's ADR before any Builder code, re-dates the plan and regroups the board by feature (T-4116). Every app part gets a plain page and a code-drawn diagram before it is done; the first three (T-4240) are on main.

**Read it all** on the site under Documents, or in `documents/restructuring/`.
{% endraw %}

</div>
