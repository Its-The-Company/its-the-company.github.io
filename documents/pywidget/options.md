---
layout: "default"
title: "App launcher premade: six options (T-2536)"
section: "documents"
description: "Drawn by draw_launcher.py (HTML/CSS/SVG to PNG through headless Chromium; colours from ../tokens-app.json, the approved A Paper light card and B Studio dark card). App names (Inbox, Tunes, Atlas ...) are invented and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/options.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/design/launcher/options.md</code></span></div><h1>App launcher premade: six options (T-2536)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-05. **Proposal only (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).** A new premade's look is the Investors' choice. Asked on #41 (an Investor, c6652747463): a premade that launches apps, laid out freely instead of Apple's 4x6 grid, each tap area opening an app, badges a nice-to-have, "start with 6".

Drawn by `draw_launcher.py` (HTML/CSS/SVG to PNG through headless Chromium; colours from `../tokens-app.json`, the approved A Paper light card and B Studio dark card). App names (Inbox, Tunes, Atlas ...) are invented and the glyphs are plain geometry drawn by code. In the product each tile carries the symbol, colour and name the user picks. No real app icons, no AI art (Commandment 9).

Each sheet shows small 158x158, medium 338x158 and large 338x354 pt, light and dark. `overview.png` puts all six side by side at medium.

## The options


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The options, scrolls sideways" data-n="1" style="--tw:886px" markdown="1">

| # | Name | One-line idea | What makes it pywidget's | Sheet |
|---|---|---|---|---|
| 1 | Pegboard | Tiles of any size and shape hang wherever the script puts them on a 12 pt dot grid; wide pills carry a line of live text. | The script returns position, size and shape per tile, and the text on each pill ("Lens 18:52", "Run 5 km today"). Layout can change by time of day. | `1-pegboard.png` |
| 2 | Dial | A 24-hour dial: each app sits at the hour you use it, and a hand points at now. | The script sets each app's hour; the widget redraws the hand on its timeline and names the app the hand points at. | `2-dial.png` |
| 3 | Mosaic | A treemap: tile area follows a number the script returns. | Weights are the script's (minutes used, steps, anything). The layout is computed by code, not arranged by hand. | `3-mosaic.png` |
| 4 | Now | One large tile for the app the script picks for this moment, with a line saying why, and a row of the rest. | The script chooses the hero and writes its reason ("Sunset 18:52, clear sky"). | `4-now.png` |
| 5 | Words | No icon grid: app names set as type, sized by the script, each word a tap area. | Type size per app comes from the script. Closest to a page you can read. | `5-words.png` |
| 6 | Prompt | A launch list in monospace, like the script that makes it, with one live note per app. | It looks like the code behind it: `launch.py`, the run time, one computed note per row. | `6-prompt.png` |

</div>


Tap targets per frame (small / medium / large): Pegboard 3/7/12, Dial 4/5/12, Mosaic 4/6/9, Now 4/7/9, Words 4/7/12, Prompt 4/8/12. All are inside Wrenna's proposed <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> of 4 / 8 / 16.

## QA (contrast and layout), from qa.json

- 552 colour pairs checked across the six sheets: 0 below floor. Text 4.5:1, glyphs, the dial hand and Prompt's `>` marker 3:1. Text on the dark gradient card is checked against both stops and the midpoint. Lowest text pair: 4.77:1 (white at 78% on the light end of the dark card). Lowest glyph pair: 3.1:1 (Prompt's marker on the dark card).
- No text clipped or outside its card, and no two tap areas overlap, in any frame.
- Smallest tap area (pt): Pegboard 44, Mosaic 40, Now 38, Dial 36, Words 30, Prompt 25. Apple's general figure is 44 pt. Wrenna marks it **uncertain** whether that figure applies to widgets.
- One thing the check does not cover: the red badge pill on the dark card is 2.75:1 against the card. The number inside it passes, at 4.5:1 or better.

## What each option needs from iOS, and what is unconfirmed

From Wrenna's note, [`pywidget/docs/research/app-launcher.md`](app-launcher.html) (T-2535):

- **All six: opening another app without pywidget flashing first. UNCONFIRMED.** On Apple's documented path (Link, widgetURL), a tap opens pywidget, which then opens the other app, and the user sees pywidget flash. Two launchers on the store say they open apps directly from iOS 17 on (OpenURLIntent). That is reported, not documented, and may work only for apps with universal links. It needs a device test before any of these options is promised.
- **All six, small size: more than one tap area in a small widget.** Apple's docs now allow it. **Unconfirmed** from which iOS version.
- **All six: the script names a saved slot, never a URL.** The user saves the apps in the app. A script can choose which ones show and what they say. A security change to L12 P5 (taps in a widget stay inside pywidget) goes to Idris and the reviewer first. Not decided.
- **Badges (drawn in 1, 3, 4, 5, 6): NOT POSSIBLE as app badges.** iOS gives no way to read another app's badge or unread count. The numbers drawn ("3", "12") can only be the script's own data, e.g. a count from a public API the user's script calls. Before anything ships, each badge needs a caption saying what it counts, so nobody takes it for the app's own unread count. Dial drops badges below 40 pt because they cover the glyph.
- **Dial** also needs timeline reloads to move the hand (WidgetKit timeline entries; a refresh budget applies). The hand is at most one entry behind.
- **Words and Prompt** have the smallest tap areas, 25 to 30 pt.

## Recommendation

**1 Pegboard.** It is the literal answer to the ask: apps placed freely, at sizes and shapes the script chooses, not Apple's grid. It is the only option with every tap area at 44 pt. Its pills give the script a place to say something ("Run 5 km today"), and Wrenna's research says that is the part no other launcher has. Second choice: **4 Now**, the most pywidget idea, but it is a picker, not a free layout. All six depend on the unconfirmed direct-launch test. If that test fails, every option flashes pywidget on each tap, and I would say the premade should wait rather than ship that way.
{% endraw %}

</div>
