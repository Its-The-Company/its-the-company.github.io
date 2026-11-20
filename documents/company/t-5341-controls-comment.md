---
layout: "default"
title: "T 5341 controls comment"
section: "documents"
description: "Controls: what they would do to the 1.0 date (T-5341, Ines)"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5341-controls-comment.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/T-5341-controls-comment.md</code></span></div><h1>T 5341 controls comment</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Controls: what they would do to the 1.0 date (T-5341, Ines)**

Jeremy asked on Wed 2026-11-18 at 12:09 AM ET (#41) for Controls as part of the Widgets feature, sized first, with the version and the date effect reported before anything is built. Idris's plan is [`ops/plans/pywidget/controls.md`](../pywidget/controls.html) (nothing built, nothing on the board). This is that report.

**What Controls are.** A control is the small round button or switch that iOS 18 added to Control Center, the Lock Screen's two bottom corners and the Action button; pywidget would offer two, a "Run Python" button and a "Python Switch" (names are drafts), each running one function from the person's widget or opening its page.

**Size.** Idris sizes it at 14 days of his iOS build time, about 2.8 weeks (range 1.6 to 4.8), counted the way the whole timeline is counted: one engineer's build weeks, added end to end. Controls build on the widget buttons, so they can start only after the buttons pass their phone check; started earlier, they would build half of that work twice. Maren (about 3 days) and Pernille (about 1 day) work beside it and do not add to the date.

**The date today.** Likely Thu 2027-07-15, range Sun 2027-04-04 to Wed 2027-12-01 (`ops/milestones.json`, from `ops/plans/T-4266-release-range.py` after Idris's checks of Wed 2026-11-18 and Thu 2026-11-19). An estimate, not a promise: the firm date comes when the Builder first works on a phone.

**The three choices.**
- **A. Both controls in 1.0**, after the widget buttons' phone check: likely **Wed 2027-08-04** (20 days later), range Thu 2027-04-15 to Tue 2028-01-04.
- **B. The button only in 1.0**, the switch in 1.1 (about half a week less): likely **Sun 2027-08-01** (17 days later), range Mon 2027-04-12 to Fri 2027-12-31. The button covers "run my script from Control Center"; the switch needs a stored on/off value and a check that it tells the truth.
- **C. Controls in 1.1**: 1.0 stays at Thu 2027-07-15, range unchanged. Controls ship with 1.1's first iOS work.

**My recommendation: C.** Idris recommends A, and his plan is good; I disagree on the version and record it here. Three reasons. First, 1.0 is already 35 weeks out, and every week added is a week before the first dollar; a control is a second door to the same action the widget buttons already give. Second, the 2.8 weeks rest on widget buttons that are not built yet, so the figure cannot be checked against code the way Idris checked snap-to-layout and two-way editing, and both of those checks moved the figure. Third, the plan's first step is a one-day test of whether a control's action can run without opening the app on iOS 18 to 26; if it cannot, every control opens pywidget, against Apple's first stated practice for controls, and the figure falls. Learning that after 1.0 ships costs 1.0 nothing. If you want Controls in 1.0 anyway, B is the cheaper way in.

**What I need from you** (the plan's open questions, section 12).
1. The version: A, B or C.
2. Does an Investor have an iPhone 15 Pro or later, the models with the Action button? Without one, the Action button part ships tested only on the Simulator, and the report will say so. Needed now for A or B; for C, before 1.1's Controls work starts.

**The reply that settles it:** one letter, A, B or C, and "phone: yes" or "phone: no". On your answer I put Idris's build lines (C0 to C5) on the board under the version you chose; `ops/milestones.json` moves only if you choose A or B.
{% endraw %}

</div>
