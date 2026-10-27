---
layout: "default"
title: "Renderer.v1 design read (T-0385)"
section: "documents"
description: "104 premade x family x appearance rows (12 premades): 54 pass, 20 fail, 30 stand-in. The extra sheets add 7 rows (5 pass, 2 stand-in). Button and Toggle: not built (no premade tree uses them)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/renderer-v1-deltas.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/design/widgets/renderer-v1-deltas.md</code></span></div><h1>Renderer.v1 design read (T-0385)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-27 02:29-02:45 ET by `date`. Read-only: no Swift, Python or token changed.

## Summary

104 premade x family x appearance rows (12 premades): **54 pass, 20 fail, 30 stand-in.** The extra sheets add 7 rows (5 pass, 2 stand-in). Button and Toggle: not built (no premade tree uses them).

What I read: the 24 sheets in `ops/site-checks/renderer-v1/` (made at 020c333d, refreshed at bf5bce68 and 7e5531d9), `ops/site-checks/stale-slot/` (fc5864e1), `ops/site-checks/widget-card/` (last drawn at 020c333d). I judged them against approved items 1-2 in creative/approved.md (#60: light = A Paper, dark = B Studio; mockups `A-gallery.png` and `B-gallery.png` at 82e8066a) and design-system-v0 section 8. Where a cause was not clear from the picture I checked it in the tree JSON, in `TreeNodes.swift` / `TreePaint.swift`, or by reading pixels from the PNGs (WCAG contrast). One row covers every mode drawn for that family: full colour, accented and vibrant for system families; vibrant for accessories.

Six fails, ranked by how visible they are to a user:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Summary, scrolls sideways" data-n="1" style="--tw:1332px" markdown="1">

| Rank | Fail | Rows | Breaks | Fix owner |
|---|---|---|---|---|
| F1 | **Black grounds on the dark card.** `bg.sunken` and `accent.soft` have no on-card token. On the violet card they draw B's off-card values: `#06070C` for bar tracks, the sun's remaining arc, the storage ring track, shortcut tiles and the day-clock dial, and `#2A2350` for the altitude area and the shortcut icon tile. Measured against the card behind them: 1.32 (shortcut tile), 1.37-1.70 (bar tracks), 1.4 (sun arc), 2.44 (ring), 1.07-1.44 (altitude fill). They look like black holes in the card. The approved B gallery draws a light translucent track on the card. | 11: 02 S/M dark, 03 S/L dark, 05 M dark, 07 S/M/L dark, 08 S/M dark, 11 M dark | 8.4 row 7: the on-card map covers text, `line.strong` and `accent` only. B mockup card track (item 2). | Maren: two token rows (`widget.onCard.ground` for `bg.sunken`, `widget.onCard.soft` for `accent.soft`, white at low alpha as in the mockup). Idris: add both to `TreePaint.onCard`; `TreeBarStyle`'s track goes through it already. Maren: render.py `ONCARD`. |
| F2 | **World clocks: blank dials when colour is stripped, and night and day swapped in dark.** Night dials fill with `text.primary` and draw their hands in `bg.surface`. Both are 1.0 in accented and vibrant, so three of the four dials are plain white discs with no hands. In dark full colour, `text.primary` is white and `bg.sunken` is black, so the night dials turn white and the day dial (Los Angeles) turns black. | 2: 11 M light, 11 M dark | 8.3 item 2 (levels are separated by luminance; dial and hands share one level). 8.4 row 10 already listed this as known and open for clear mode; the sheets show it in accented and vibrant too. | Maren: the tree (`premade.py`). The renderer follows the spec here. |
| F3 | **Labels truncate in list rows and tiles.** Countdown medium shows "Launch…" and "Lisbon t…" (subheadline, 22 pt icon frame). Shortcuts medium and large show "Clean clipb…", "Commute h…" and "Rename ph…" (footnote semibold, 28 pt icon frame, 10 pt padding, about 95 pt left for text). render.py fits all of them, so its QA ("0 truncations") misses what SwiftUI's text sizes do. | 6: 01 M light/dark, 07 M light/dark, 07 L light/dark | widgets/README.md QA rule (truncated text is a fault); 8.1 content rule | Maren: the trees (narrower icon frames, shorter labels or a 0.85 minimum scale) and render.py's text widths. Idris: none. |
| F4 | **GitHub medium "Last push" wraps** to two lines ("13 hr, / 23 min"), so that row is taller than the others. The relative date Text has no `lineLimit`. | 2: 12 M light/dark | widgets/README.md (long relative dates were fixed in the designs); 8.1 content rule | Maren: the tree (`lineLimit(1)` and a shorter label). |
| F5 | **Steps medium, dark full colour: today's bar stands out by hue only.** `widget.onCard.accent` #B0A3FD against the past bars (`widget.onCard.track`, white 0.56): 1.13:1. In light the same pair is 2.32:1. | 1: 03 M dark | B gallery rule "Every widget is readable in grey first. Accent marks state, never the only cue."; 8.3 item 4 | Maren: the tree or token (today's mark on the card takes `widget.onCard.primary`). |
| F6 | **Storage medium ring sits in the margin.** The 8 pt stroke is centred on a frame that is inset 16 pt, so the ring's outer edge is 12 pt from the card edge, top and left. | 2: 08 M light/dark | 8.1 (16 pt content margins) | Maren: the tree (shrink the ring radius by half the line width). |

</div>


Not judged anywhere, and not counted as fails: accent groups (the sheets show the extension's white output, 8.4 row 13); timer and date frames (ImageRenderer does not run timers, so countdown medium shows "0:00" and day progress shows a full bar beside "59%"); time zone. Sun small and medium format 22:00Z as "10:00 PM", which is UTC, while the strings on the accessories say "6:00 PM" (written in ET). That is a mismatch in the sheet's test setup. On a device both come from the same zone.

## Table

Key: S small, M medium, L large, circ accessoryCircular, rect accessoryRectangular. "Stand-in" means the panel is captioned as render.py's version of a system view, so it cannot be judged as the system's drawing. Where everything outside the stand-in passes, the row stays "stand-in"; a fail outside the stand-in would win.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Table, scrolls sideways" data-n="1" style="--tw:756px" markdown="1">

| # | Premade | Family | Appearance | Verdict | Reason |
|---|---|---|---|---|---|
| 1 | 01 Countdown | S | light | stand-in | Timer ProgressView. The rest matches A: New York 53 medium, two text levels, ink-blue bar on the white card. |
| 2 | 01 Countdown | S | dark | stand-in | Timer ProgressView. Its black track is the stand-in's (shipped bars show the same, F1). Rounded 53 semibold, gradient card, white text. |
| 3 | 01 Countdown | M | light | fail | F3: "Launch…" and "Lisbon t…" truncate. The 0:00 hero is a timer frame and is not judged. |
| 4 | 01 Countdown | M | dark | fail | F3: same truncation. |
| 5 | 01 Countdown | circ | light | stand-in | AccessoryWidgetBackground. New York 53 inside the ring. |
| 6 | 01 Countdown | circ | dark | stand-in | AccessoryWidgetBackground. Rounded 53. |
| 7 | 01 Countdown | rect | light | stand-in | Timer ProgressView. Title, symbol and value line fit in 3 lines. |
| 8 | 01 Countdown | rect | dark | stand-in | Timer ProgressView. |
| 9 | 01 Countdown | inline | light | pass | Symbol plus 17 characters, system font. |
| 10 | 01 Countdown | inline | dark | pass | Same. |
| 11 | 02 Sun | S | light | pass | New York time hero; when stripped, the arc's past part is 1.0 and its future part 0.24. The sheet's time zone is not judged. |
| 12 | 02 Sun | S | dark | fail | F1: the remaining arc is `bg.sunken` #06070C, 1.4:1 on the card. |
| 13 | 02 Sun | M | light | pass | Hero left, arc right, sunrise and dusk times aligned; 16 pt margins <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. |
| 14 | 02 Sun | M | dark | fail | F1: same black arc. |
| 15 | 02 Sun | circ | light | stand-in | AccessoryWidgetBackground. The "6:00" label is white in vibrant (fixed in bf5bce68). |
| 16 | 02 Sun | circ | dark | stand-in | AccessoryWidgetBackground. |
| 17 | 02 Sun | rect | light | pass | Title, time and relative time, then a white track with a dot. |
| 18 | 02 Sun | rect | dark | pass | Same. |
| 19 | 02 Sun | inline | light | pass | "Sunset 6:00 PM", 14 characters. |
| 20 | 02 Sun | inline | dark | pass | Same. |
| 21 | 03 Steps | S | light | pass | New York 7,842; ink-blue bar on a `bg.sunken` track; "as of" kept. |
| 22 | 03 Steps | S | dark | fail | F1: bar track #06070C, 1.37-1.44:1 on the card. |
| 23 | 03 Steps | M | light | pass | Today's bar in ink-blue against `line.strong` past bars, 2.32:1; goal line drawn. |
| 24 | 03 Steps | M | dark | fail | F5: today's bar against past bars is 1.13:1 (hue only). |
| 25 | 03 Steps | L | light | pass | Header and hero, bar, hourly chart, week row; goal days are filled checks with bold values, other days are rings. |
| 26 | 03 Steps | L | dark | fail | F1: bar track #06070C, 1.70:1. The week row and chart pass. |
| 27 | 03 Steps | circ | light | stand-in | AccessoryWidgetBackground. |
| 28 | 03 Steps | circ | dark | stand-in | AccessoryWidgetBackground. |
| 29 | 03 Steps | rect | light | stand-in | Capacity Gauge. |
| 30 | 03 Steps | rect | dark | stand-in | Capacity Gauge. |
| 31 | 03 Steps | inline | light | pass | "7,842 steps" with a symbol. |
| 32 | 03 Steps | inline | dark | pass | Same. |
| 33 | 04 Distance | S | light | pass | New York 2.1 mi; the arrow at 214 degrees points south-west, which matches "Southwest of you" (checked at 4x). |
| 34 | 04 Distance | S | dark | pass | Rounded 2.1; arrow in `widget.onCard.accent`. |
| 35 | 04 Distance | M | light | pass | Three rows; bearings at 214, 8 and 92 degrees drawn correctly; values in tabular semibold. |
| 36 | 04 Distance | M | dark | pass | Same on the card. |
| 37 | 04 Distance | rect | light | pass | Three lines: place, value, "as of". |
| 38 | 04 Distance | rect | dark | pass | Same. |
| 39 | 04 Distance | inline | light | pass | "Home 2.1 mi". |
| 40 | 04 Distance | inline | dark | pass | Same. |
| 41 | 05 Altitude | S | light | pass | New York 342 ft, ± line, sparkline inside the margins. |
| 42 | 05 Altitude | S | dark | pass | Lavender sparkline on the card, no fill. |
| 43 | 05 Altitude | M | light | pass | `accent.soft` area under an ink line, end dot; 0.18 ground when stripped. |
| 44 | 05 Altitude | M | dark | fail | F1: the `accent.soft` area is #2A2350, 1.07-1.44:1, and reads as a shadow on the card, not a tint of the line. |
| 45 | 05 Altitude | circ | light | stand-in | AccessoryWidgetBackground. |
| 46 | 05 Altitude | circ | dark | stand-in | AccessoryWidgetBackground. |
| 47 | 05 Altitude | rect | light | pass | Title, value and accuracy, "as of". |
| 48 | 05 Altitude | rect | dark | pass | Same. |
| 49 | 06 Habits | S | light | pass | Done days filled, missed days ringed (`widget.onCard.track` #959085); the rings carry the meaning, not the colour. |
| 50 | 06 Habits | S | dark | pass | #B0A3FD fills, white 0.56 rings. |
| 51 | 06 Habits | M | light | pass | Three rows; today's ring is heavier; New York 15 of 21. |
| 52 | 06 Habits | M | dark | pass | Same on the card. |
| 53 | 06 Habits | L | light | pass | Day header, six rows, footer under a hairline; 16 pt margins hold. |
| 54 | 06 Habits | L | dark | pass | Same. |
| 55 | 06 Habits | circ | light | stand-in | AccessoryWidgetBackground. |
| 56 | 06 Habits | circ | dark | stand-in | AccessoryWidgetBackground. |
| 57 | 07 Shortcuts | S | light | pass | `accent.soft` icon tile, name and caption at the foot. |
| 58 | 07 Shortcuts | S | dark | fail | F1: the icon tile is #2A2350 on the card (dark patch). Least visible of the F1 rows. |
| 59 | 07 Shortcuts | M | light | fail | F3: "Clean clipb…" and "Commute h…". |
| 60 | 07 Shortcuts | M | dark | fail | F1: the tiles are #06070C, 1.32:1. F3: same truncation. |
| 61 | 07 Shortcuts | L | light | fail | F3: "Clean clipb…", "Commute h…" and "Rename ph…". |
| 62 | 07 Shortcuts | L | dark | fail | F1: eight black tiles, the most visible F1 case. F3: same truncation. |
| 63 | 07 Shortcuts | circ | light | stand-in | AccessoryWidgetBackground. |
| 64 | 07 Shortcuts | circ | dark | stand-in | AccessoryWidgetBackground. |
| 65 | 08 Storage | S | light | pass | New York 58 GB free, bar, "70 GB used" and "of 128". |
| 66 | 08 Storage | S | dark | fail | F1: bar track #06070C on the card. |
| 67 | 08 Storage | M | light | fail | F6: the ring's outer edge is 12 pt from the card edge. |
| 68 | 08 Storage | M | dark | fail | F1: ring track #06070C, 2.44:1. F6: same margin. |
| 69 | 08 Storage | circ | light | stand-in | AccessoryWidgetBackground. |
| 70 | 08 Storage | circ | dark | stand-in | AccessoryWidgetBackground. |
| 71 | 08 Storage | rect | light | stand-in | Capacity Gauge. |
| 72 | 08 Storage | rect | dark | stand-in | Capacity Gauge. |
| 73 | 09 Day progress | S | light | stand-in | Timer ProgressView (the full bar beside "59%" is a timer frame). New York 59%. |
| 74 | 09 Day progress | S | dark | stand-in | Timer ProgressView. Rounded 59%. |
| 75 | 09 Day progress | M | light | stand-in | Timer ProgressViews; labels and percentages aligned. |
| 76 | 09 Day progress | M | dark | stand-in | Timer ProgressViews (their black tracks are the stand-in's, as in row 2). |
| 77 | 09 Day progress | circ | light | stand-in | AccessoryWidgetBackground. |
| 78 | 09 Day progress | circ | dark | stand-in | AccessoryWidgetBackground. |
| 79 | 09 Day progress | rect | light | stand-in | Timer ProgressView. |
| 80 | 09 Day progress | rect | dark | stand-in | Timer ProgressView. |
| 81 | 09 Day progress | inline | light | pass | "Day 59% · Year 82%", 18 characters. |
| 82 | 09 Day progress | inline | dark | pass | Same. |
| 83 | 10 Quote | S | light | pass | Quote in New York, accent quote mark, author at the foot. |
| 84 | 10 Quote | S | dark | pass | Quote in rounded (display face for dark), quote mark in `widget.onCard.accent`. |
| 85 | 10 Quote | M | light | pass | Eyebrow at the right, two-line quote, author and source. |
| 86 | 10 Quote | M | dark | pass | Same. |
| 87 | 10 Quote | L | light | pass | Seven lines without truncation; hairline above the author. |
| 88 | 10 Quote | L | dark | pass | Same. |
| 89 | 10 Quote | rect | light | pass | Two lines of quote and the author. |
| 90 | 10 Quote | rect | dark | pass | Same. |
| 91 | 11 Clocks | S | light | pass | Three rows, New York times, offsets in secondary. |
| 92 | 11 Clocks | S | dark | pass | Rounded times on the card. |
| 93 | 11 Clocks | M | light | fail | F2: accented and vibrant show three blank white dials. |
| 94 | 11 Clocks | M | dark | fail | F2: blank dials when stripped, and in full colour the night dials are white and the day dial black. |
| 95 | 11 Clocks | rect | light | pass | Three cities and times in 3 lines. |
| 96 | 11 Clocks | rect | dark | pass | Same. |
| 97 | 11 Clocks | inline | light | pass | "London 6:05 PM" with a globe. |
| 98 | 11 Clocks | inline | dark | pass | Same. |
| 99 | 12 GitHub | S | light | pass | New York 1,284 with a star; "CI passing" is an icon plus a word. |
| 100 | 12 GitHub | S | dark | pass | Same on the card. |
| 101 | 12 GitHub | M | light | fail | F4: "Last push" wraps to two lines. |
| 102 | 12 GitHub | M | dark | fail | F4: same. |
| 103 | 12 GitHub | rect | light | pass | Repository, counts, CI state in 3 lines. |
| 104 | 12 GitHub | rect | dark | pass | Same. |

</div>


### The other sheets


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The other sheets, scrolls sideways" data-n="1" style="--tw:730px" markdown="1">

| # | Sheet | Verdict | Reason |
|---|---|---|---|
| X1 | stale-slot/stale-light.png | pass | The stale clock mark shows only after `stale_after`; text.secondary glyph on the white card; no halo is needed. |
| X2 | stale-slot/stale-dark.png | pass | The glyph's halo is the card's own gradient (fc5864e1), so no old violet disc shows. |
| X3 | stale-slot/stale-dark-hc.png | pass | The darkHC card starts at #511ED6, as in 2.0. |
| X4 | widget-card/card-light.png, countdown | stand-in | Timer ProgressView (caption predates the stand-in labels). Clear over a light wallpaper is not judged: the system's glass is not drawn (T-0039 device check). |
| X5 | widget-card/card-light.png, clocks | pass | New York times; full colour, accented, vibrant and clear over a dark wallpaper all read. |
| X6 | widget-card/card-dark.png, countdown | stand-in | Timer ProgressView (black track as in row 2). |
| X7 | widget-card/card-dark.png, clocks | pass | Rounded times; rows and hairlines on the card. |
| X8 | Button, Toggle | not built | T-0365 remainder (after T-0208). No premade tree uses them; the approved galleries' habits "Today" button is an L5 item. |

</div>


Open note on X1-X3: the stale glyph is centred 14 pt in, which is inside the 16 pt content margin. I accept it as slot chrome, not content. fc5864e1 says the margins on a placed Home Screen widget are not checked yet, so this gets a second look on the device check.

## Open questions (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>)

None of these fails needs a new identity decision. The F1 token values come from the approved B mockup's translucent card track, and the F2 to F6 fixes rearrange approved tokens inside the trees. When they land, each one is listed in design-system-v0 section 8.4 for the next report, as item 2 asks.

## Lesson

render.py's text widths are narrower than SwiftUI's. Its "0 truncations" QA passed text that the real renderer cuts (F3). Until render.py measures text the way SwiftUI does, truncation is judged on the Simulator sheets.
{% endraw %}

</div>
