---
layout: "default"
title: "App guide, part 5: Being built now"
section: "documents"
description: "What is being built now, with each task&#x27;s number and state."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-guide/' | relative_url }}">← App Guide</a><a href="{{ '/documents/pywidget/app-guide-05-being-built.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Guide</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/app-guide-05-being-built.md</code></span></div><h1>App guide, part 5: Being built now</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Part 5 of 10 of the pywidget app guide. The index, with the reading notes, is [app-guide.md](app-guide.html).

Status is taken from the task board on 2026-10-28; the dates were re-checked on 2026-10-30 against the board, the build plan and the milestones file. "Alpha" is Day 10 (2026-10-31); "freeze" is Day 21 (2026-11-11); "submit" is Day 25 (2026-11-15), or Day 28 (2026-11-18) if Python in the widget fails its device tests.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:1082px" markdown="1">

| What | What is missing | Task | Date |
| --- | --- | --- | --- |
| A tap puts a widget on the Home Screen | Built 2026-10-29 (T-0512, b0887819): placing a Python widget, changing what it shows, a tap on it, opening the app or Refresh Widgets makes the app run its script and write its picture. Left: the editor's save writes the widget's script and an unset Python widget has no script to run (T-0684, P0); the gallery's Add is T-0191 | T-0684 (P0) | 2026-11-02 |
| Premade widgets | Code exists; 6 are due for the alpha, 12 by the freeze. Their pictures come from a test that is still being corrected. | T-0191, T-0511 | Day 10 to Day 21 (2026-11-11) |
| Premade gallery | Not built | T-0191 | Days 16 to 20 (2026-11-06 to 2026-11-10) |
| Widget preview beside the editor | Not built | T-0192 | Version 1.1 |
| Projects and Files | Not built; floor: container projects and .py import and export, "open in place" to 1.1 if late | T-0355 | Freeze (Day 21) |
| Pro placement and refund handling | Free users must not see Pro widgets placed; refunds must lock them again | T-0051 | Freeze |
| Pop-up questions from scripts | The screen half (alerts, forms, lists, toast) is not built; the Python half is a separate task (T-0446) | T-0447 | Freeze (Day 21) |
| Home Screen scripts and the full-screen run screen | Designed (design notes for the run screen and the setup walkthrough); the app half is not built. Copy is a draft until one hand-run test | T-0449 | Freeze |
| Settings, with Acknowledgements and Pro moved in | Not built; the "more" menu stands in | T-0042 | Days 16 to 20 (2026-11-06 to 2026-11-10) |
| Editor: screen-reader, text-size and iPad checks | Not run | T-0460, T-0479 | Day 10; real device later |
| Editor: tappable error lines | Not built | T-0389 | Not dated |
| Shortcuts actions (Run Script) | Refresh Widgets is in the code, not measured on a phone from a background launch; Run Script was a stub and was wired for the alpha check A10; follow-ups open | T-0510 | Alpha |
| Background refresh (iOS runs the app briefly to update widgets) | Added 2026-10-30. Not built: this guide wrongly called it shipped. Moves to 1.1 if not in the main code by Day 21, or not seen running on a real iPhone by Day 24 (ADR-007, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-30 1:35 PM) | T-0793 | Day 21 (2026-11-11) |
| Editor themes in Pro | Designs approved (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>, 2026-10-28) and decided as part of Pro (#87, 2026-10-30); the theme picker is not built and the flag file has themes off | T-0272, T-0769 | Freeze (Day 21) |
| First-run tour | Not built | T-0193 | Freeze (Day 21) |
| App-rating request after a real success | Rule written; screen not built | T-0273, T-0346 | Not dated |
| Install from a file | Stretch goal; 1.1 if not done | T-0212 | Version 1.1 |
| Pictures not yet taken | iPad two-window view, premade widgets on the Home Screen, permission prompts, and every screen above | T-0556 | Not dated |
| Pro's real price in the build and the store | Decided: $14.99 once (#87). The test price list still says $0.99; the price in App Store Connect is set by the Investors' side | T-0769 | After the alpha commit (2026-10-31 12:00 PM) |
| Verdict on the alpha | A written pass or fail per check | T-0361 | 2026-10-31, 11:59 PM |
| Feature freeze | After this only fixes | | Day 21 (2026-11-11) |
| Widget cut line | The call on whether widgets ship in 1.0 | | Day 23 (2026-11-13) |
| Icon, screenshots, store page (need the Investors' approval) | Not part of this guide; the icon answer was wanted by 2026-11-02 | | Not re-dated since the plan moved (Day 15 was the earlier plan) |
| Submission to Apple (needs the Investors' approval) | | | Day 25 (2026-11-15), or Day 28 (2026-11-18) if Python in the widget fails its device tests |

</div>
{% endraw %}

</div>
