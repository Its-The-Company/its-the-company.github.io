---
layout: "default"
title: "Issues page: compact rows, a page per issue, timing by drag"
section: "documents"
description: "Make Home &gt; Issues read like GitHub&#x27;s app: a short list that opens each issue on its own page, with timing set by dragging instead of buttons."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/issues-page-redesign.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/issues-page-redesign.md</code></span></div><h1>Issues page: compact rows, a page per issue, timing by drag</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Plan mode with an Investor on #41: asked 2026-11-08 10:22 (c6723293041), questions 10:23 (c6723305755), answers 10:26
(c6723335442). Written by the Operator. Investor-requested site work (outside the 5% site share; inside the site and
process push's scope, ops/plans/site-process-push.md).

## Goal
Make Home > Issues read like GitHub's app: a short list that opens each issue on its own page, with timing set by
dragging instead of buttons.

## What the answers decided
- **List rows:** title, a short description (the card's site "Ask:" line where there is one, else the body's first
  line), the deadline and the badges. Nothing expands in place.
- **Issue page (Q3 A):** its own page with the card, its options, the whole comment thread and a reply box, like
  GitHub's app. Opening it marks the issue read; "Mark Read" / "Mark Unread" go away.
- **Queues:** "Needs you" is renamed "Now". "Later" stays ordered soonest first.
- **Drop into Later (Q1 A):** Later is grouped by day (tomorrow, this week, next week, later); a drop on a group sets
  that day; a tap on the date fine-tunes it. Issues in Later can be dragged to another group or reordered.
- **Drop into Now (Q2 A):** the issue's deadline becomes now, so it stays in Now until answered. Dragging from Now to
  Later works the same as within Later.
- **No "Set Deadline" button.** Maren designs first.

## Steps (board lines)
1. **T-3581, Maren (design, P1):** the list row, the issue page and the drag interaction at 390 and 1280 px: drag on desktop,
   long-press drag on a phone, and a non-drag way to move an issue (keyboard and screen reader) on the issue page.
   Code-drawn mockups and a short spec in pywidget/docs/design/ or ops/plans/, as her past site specs are.
2. **T-3582, Odalys (site, P1, after 1):** the issue page and the compact list: the page, its thread and reply box (reusing
   chat.js's composer, with T-3357's focus fix), read on open, Mark Read removed, badge rules in issuecount.js kept
   in step. Tests and screenshots.
3. **T-3583, Odalys (site, P1, after 2, same files):** drag and drop between Now and Later and within Later's day groups, the
   tap-to-fine-tune date, the "Now" name, Set Deadline removed. Tests (a drop sets the right deadline; Now sets now;
   the badge counts follow) and screenshots.

## Risks
- Drag on phones is easy to trigger by accident while scrolling; the design must set a long-press threshold and the
  non-drag move.
- Deadlines set here are saved by the site, not on the GitHub card; the page already works this way (T-3249).
- needs.js is about 49 KB; the page split must stay within the site's js size budgets.

## Left out
- T-3417's Mark Read and Set Deadline parts are replaced by this plan; its badge colours (red past-due, blue new)
  stay.
- No change to how decision cards are answered or how the sweep closes issues.
{% endraw %}

</div>
