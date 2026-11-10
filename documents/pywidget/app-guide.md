---
layout: "default"
title: "The pywidget app guide, version 1 (index)"
section: "documents"
description: "Index of the app guide, in ten parts: what the app is, every screen with a picture, how it works underneath, the limits, what is being built, the design choices, how the pictures are made in code, Lock Screen widgets\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide.md</code></span></div><h1>The pywidget app guide, version 1 (index)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Last updated: 2026-10-30 (claims re-checked against the repository at commit d8beb743 and the task board, T-0807); the screens and pictures describe the app as of commit d06a981f; the editor section (2.3) and the Console pictures describe the later commits 5ac90a05 and 210a1362, where the real code editor reached the main screen. "pywidget" is the placeholder name; the Investors have not chosen the real one, and the icon, the name and the store page are shown only in section 6, marked as waiting for the Investors.

This guide is for the Investors. Apart from section 7, which quotes the functions that draw the icons because the Investors asked for them, it has no code in it. Where a technical word is needed it is explained the first time. Every picture in sections 2 and 5 is a real screenshot of the app running on the iPhone Simulator (a program on the Mac that behaves like an iPhone; the clock in the pictures is the Mac's), in light mode and dark mode side by side. The pictures show only the app's own screens, with no personal data.

**How to read the marks.** "Built" means the screen exists and has a picture here. "Not built yet" means it does not exist; the part called "Being built now" gives each one its task number and date. Dates in this guide: alpha check (the first internal test, run by the team on a test build) Day 10, 2026-10-31; feature freeze (no new features after this) Day 21, 2026-11-11; submission to Apple Day 25, 2026-11-15, or Day 28, 2026-11-18, if Python in the widget fails its device tests.

## The parts

The guide is split into one document per section so a reader opens only the part needed. Section numbers in the text (for example "section 2.3") are the part numbers below.

1. [What pywidget is, and who it is for](app-guide-01-what-it-is.html): What the app is and who it is for, and what Pro unlocks.
2. [A tour of every screen, in the order a new person meets it](app-guide-02-screens.html): Every screen so far, in the order a new person meets it, with a picture of each.
3. [How it works underneath](app-guide-03-how-it-works.html): The Python inside the app, how a script becomes a Home Screen widget, device features, files and offline use.
4. [Limits and the decisions behind them](app-guide-04-limits.html): What the app cannot do, the decisions behind each limit, and how fresh a widget can be.
5. [Being built now](app-guide-05-being-built.html): What is being built now, with each task's number and state.
6. [Design choices](app-guide-06-design-choices.html): The icon, name and store page options, approved and waiting for the Investors.
7. [How the pictures are made in code](app-guide-07-pictures-in-code.html): How the icons and other pictures are drawn by code, with the functions quoted.
8. [Lock Screen widgets](app-guide-08-lock-screen.html): Lock Screen widgets: what Apple provides, what pywidget adds, limits, and all twelve premade widgets.
9. [What you can build](app-guide-09-what-you-can-build.html): What a script can do: refresh, memory and what it can reach.
10. [Open questions](app-guide-10-open-questions.html): Questions still open about the app.
{% endraw %}

</div>
