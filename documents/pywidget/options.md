---
layout: "default"
title: "App launcher premade: options 1-6 (T-2536) and 7-10 (T-2552)"
section: "documents"
description: "Drawn by draw_launcher.py (HTML/CSS/SVG to PNG through headless Chromium; colours from ../tokens-app.json, the approved A Paper light card and B Studio dark card). App names (Inbox, Tunes, Atlas ...) are invented and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/options.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/design/launcher/options.md</code></span></div><h1>App launcher premade: options 1-6 (T-2536) and 7-10 (T-2552)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-05. **Proposal only (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).** A new premade's look is the Investors' choice. Asked on #41 (an Investor, c6652747463): a premade that launches apps, laid out freely instead of Apple's 4x6 grid, each tap area opening an app, badges a nice-to-have, "start with 6".

Drawn by `draw_launcher.py` (HTML/CSS/SVG to PNG through headless Chromium; colours from `../tokens-app.json`, the approved A Paper light card and B Studio dark card). App names (Inbox, Tunes, Atlas ...) are invented and the glyphs are plain geometry drawn by code. In the product each tile carries the symbol, colour and name the user picks. No real app icons, no AI art (Commandment 9).

Each sheet shows small 158x158, medium 338x158 and large 338x354 pt, light and dark. `overview.png` puts all ten side by side at medium; `overview-7-10.png` holds only the four from T-2552.

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


---

# 7 to 10: a launcher that also does another job (T-2552)

Maren, 2026-11-07. **Proposal only (Commandment 51); nothing is built until the Investors pick.** Asked on #41 (an Investor, c6653117254): "a few more options, with another widget function incorporated into the design. For example, a clock, weather display, transit widget, or some other function."

Same frame set and the same script (`draw_launcher.py`): small, medium, large, light and dark, placeholder apps, the approved A Paper and B Studio widget tokens. Every value on the frames is invented sample data (9:41 AM on Sat 7 Nov, a place called Harbour, a stop called Elm St). The weather symbols are circles, rays and one cloud path drawn in the script. 7 to 10 draw no badges: a count on another app's tile is not possible (section above), and these widgets already have a second job.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 7 to 10: a launcher that also does another job (T-2552), scrolls sideways" data-n="1" style="--tw:681px" markdown="1">

| # | Name | The other job | The idea | Sheet |
|---|---|---|---|---|
| 7 | Hours | Clock | A live clock with the apps for this part of the day. The script swaps the set at the hours it chooses (here 12:00 PM and 6:00 PM). Large adds two more time zones and the day as a strip. | `7-hours.png` |
| 8 | Forecast | Weather | The weather now and over the next hours, and the apps the script picks for it: "Dry now: Run, Atlas", "From 14:00: Read, Tunes". | `8-forecast.png` |
| 9 | Board | Transit | A departure board for your stop. Each row opens your transit app; your apps for the ride sit beside it. | `9-board.png` |
| 10 | Focus | Focus timer | A countdown for the current block (Write, 25 min) with that block's apps. Pause and Skip are buttons on the widget; the script sets the blocks. | `10-focus.png` |

</div>


## Where the data comes from (free sources only; no sign-up, no spend)

- **7 Hours: no data source.** The phone's clock and time zones. No network, no permission, no credit line.
- **8 Forecast: MET Norway Locationforecast**, the source L16 already cleared ([`pywidget/docs/research/L16-data-sources.md`](l16-data-sources.html)): free, no key, CC BY 4.0 and NLOD. Its conditions apply: a User-Agent naming the app, responses cached, and the credit line "Weather: MET Norway", which is drawn on every size. **Ceiling:** at real volume MET Norway asks for our own caching proxy. That is a server, which costs money, so it is the Investors' call before it is needed (L16). **WeatherKit** stays the better later source, but its free call allowance and its attribution rules for widgets are still unread (L16 browser list item 1), so I do not draw it as the source here. Open-Meteo's free tier is non-commercial, so it is out. Place: one the user types (no permission), or a location fix in the extension (When In Use; may be stale, L2).
- **9 Board: the public GTFS timetable of the user's transit agency.** Free to download. Each agency's feed has its own licence, which must be read before the app lists that agency. Many ask for a credit line, and some ask for a free key that the user gets themselves; the company signs up for nothing. A GTFS file is a zip of several megabytes, so the **app** downloads and reads it, not the widget, and keeps only the next departures for the user's stops in the shared App Group. Live delays (GTFS-realtime) are not shown: a widget could fetch them only once per budgeted reload (15 to 60 minutes), which is too old for a bus. So the board says "timetable" and never says "live".
- **10 Focus: no data source.** The script defines the blocks (name, minutes, apps). The current block and pause state live in the App Group.

## What a widget refresh allows (L2, L20; Apple's "Keeping a widget up to date")

A frequently viewed widget gets about 40 to 70 reloads a day, 15 to 60 minutes apart. Timeline entries planned in advance are not reloads; Apple asks for entries at least about 5 minutes apart. Text and progress views driven by a date move on their own, with no reload and without the app running.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: What a widget refresh allows (L2, L20; Apple&#x27;s &quot;Keeping a widget up to date&quot;), scrolls sideways" style="--tw:1054px" markdown="1">

| # | Stays live with no reload | Changes on planned entries (no fetch) | Needs a budgeted reload |
|---|---|---|---|
| 7 Hours | The time, to the minute: `Text(.currentDate, format:)` (iOS 18; in the iOS 27.1 SDK; the app targets iOS 18.0). The other time zones use the same view with their time zone. Fallback since iOS 14: `Text(midnight, style: .timer)`, which shows the seconds as well. | The app set at 6:00 AM, 12:00 PM and 18:00: three entries from one script run. | None, beyond one run a day. |
| 8 Forecast | Nothing about the weather. "Checked 09:30" says how old it is. | The hour columns: one fetch returns the hourly forecast, so the script plans an entry per hour and the "now" column moves on without a fetch. | The weather itself: one fetch per reload, so what is shown can be up to one reload old (15 to 60 min). The script's choice of apps follows each fetch. |
| 9 Board | The minutes to each departure count down by themselves: the iOS 18 offset format (`SystemFormatStyle.DateOffset`, minutes only, in the SDK), or `Text(departure, style: .relative)`, which also shows seconds. | One entry per departure, from the timetable the app stored, so the next bus replaces the one that left. | Only a new timetable, which the app fetches when opened or in background refresh (when iOS allows). No live delays. |
| 10 Focus | The countdown and the ring: `Text(timerInterval:)` and `ProgressView(timerInterval:)`. | The next block at each block's end. | None. Pause and Skip are `Button(intent:)`: a tap runs in the extension, and the reload after it is not charged to the budget (Apple, L2). |

</div>


Unconfirmed until a phone test (the #192 session): that `Text(.currentDate, format:)` keeps time on a locked Home Screen, and that the circular style of `ProgressView(timerInterval:)` draws in a widget (fallback: a straight bar). The Simulator <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the refresh limits, so it cannot settle either (L2).

## Tap areas

Smallest tap area in every frame of 7 to 10: 44 pt (qa.json). No two overlap. Count per frame (small / medium / large), all inside Wrenna's caps of 4 / 8 / 16:

- **7 Hours** 2 / 6 / 8. Apps only; the clock is not a tap area. Small: two 64x56 tiles. Medium: six 44 pt circles. Large: four 60 pt tiles (now) and four 44 pt circles (next set).
- **8 Forecast** 2 / 5 / 9. Medium and large: the whole weather block is one tap area (140x134 and 314x146) that opens the weather app the user saved. Medium: four 79x44 pills. Large: eight 48 pt tiles.
- **9 Board** 3 / 6 / 9. Each departure row (46 pt tall, full width) opens the transit app the user saved. Small: one row and two 64x56 tiles. Medium: two rows and four 44 pt circles. Large: four rows and five 44 pt circles.
- **10 Focus** 3 / 4 / 6. Small and medium: the ring itself is the Pause button (74 and 124 pt). Large: Pause (68x44) and Skip (66x44) as buttons, the ring only shows; four 56 pt tiles.

The same caveats as 1 to 6 apply to all four: the direct-launch test (does a tap flash pywidget first?) and more than one tap area in a small widget. A row or block that opens "your transit app" or "your weather app" is a saved slot like every other tile, never a URL from the script.

## QA (contrast and layout), from qa.json

794 colour pairs checked on the four new sheets, 0 below floor. Text 4.5:1; glyphs, weather symbols, rain bars, the now hand and the timer ring 3:1; text on the dark gradient checked against both stops and the midpoint. Lowest text pair 4.77:1 (white at 78% on the light end of the dark card); lowest symbol pair 3.1:1 (the accent on the dark card: the now hand, the timer ring and the rain bars). No text clipped or outside its card. Sheets 1 to 6 are redrawn byte-identical.

## Recommendation

**7 Hours.** It needs nothing: no network, no permission, no credit line, no server ceiling. The time stays live without spending the refresh budget, it works on every phone from the moment it is added, and the script's part (which apps, when) is the thing you see change. It also replaces two widgets on a Home Screen with one. Second: **10 Focus**, live in the same way and the only one with buttons, but a timer is a narrower habit. 8 Forecast and 9 Board are good widgets that carry real limits: Forecast's weather is up to one reload old and has the MET Norway proxy question at scale; Board needs each city's feed and licence, and shows the timetable only.
{% endraw %}

</div>
