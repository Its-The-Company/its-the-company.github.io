---
layout: "default"
title: "The 1.0 showcase premades: frames (T-4703)"
section: "documents"
description: "Drawn: all eight on the board line, in its order: Day phases (all four views), Focus timer, Next 24 hours, Sky, Overlap clocks, Site status, Flashcards, and GitHub&#x27;s star-history line. Not done: the review of Pernille&#x27;s\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/showcase.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/design/widgets/showcase.md</code></span></div><h1>The 1.0 showcase premades: frames (T-4703)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-17, 1:05 PM to 1:40 PM ET, and 2026-11-18 from 2:50 AM ET (sheets 06 to 11), by `date`. Transit's count-down taken out and relative text drawn as SwiftUI draws it on 2026-11-19 (T-5000, from Pernille's review T-4927 H1). The never-fetched frame, Focus timer's idle chart, the trees' sample time and two gaps fixed on 2026-11-26 (T-5001, from the same review's M1 and L1 to L4). Board line T-4703, from T-4672 (plan [`ops/plans/T-4672-showcase-premades.md`](../company/t-4672-showcase-premades.html) s2, s3 and s4.2; #278, an Investor 2026-11-16 9:55 PM ET).

**Status.** These frames are drawn inside approved items 2 and 9 (`creative/approved.md`): Paper in light, Studio in black and dark grey in dark, with the existing tokens, faces and widget vocabulary. Nothing in them adds a colour, face, icon or arrangement outside the guide. Ideas that would add one are listed under "Proposals (not used)" and are not drawn. The samples are made up for layout: the arrivals are not MTA data, the forecast is not MET Norway data, and the to-do items, places, sites, deck and star counts are invented.

**Drawn:** all eight on the board line, in its order: Day phases (all four views), Focus timer, Next 24 hours, Sky, Overlap clocks, Site status, Flashcards, and GitHub's star-history line. **Not done:** the review of Pernille's Day phases render, because it does not exist yet (see "Pernille's render").

## How the frames are made


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How the frames are made, scrolls sideways" style="--tw:512px" markdown="1">

| File | What |
|---|---|
| `premade.py` | The section "1.0 showcase premades (T-4703)" writes each view with `pywidget_ui`, using only viewtree v1 nodes. `python3 premade.py` writes `showcase/trees/NN-slug.json` and validates every document and every state variant, with 0 problems. A view with no fetched sample carries the sheet's own now as `sampled_at` (what `ui.Timeline` would fill in at that time), so every tree is the same from run to run; before T-5001, trees 02, 03, 05, 07, 08 and 10 carried the time the script ran. `tests/showcase_trees_test.py` checks this. The 12 v1 premades and their trees do not change. |
| `render.py --set showcase` | Draws the sheets into `showcase/*.jpg` (1x, JPEG q78, 4.0 MB for all eleven) and writes `showcase/qa.json`. It uses the same interpreter and QA as the 12 premades (README "How it is made"). Each sheet has its own "now", so relative text reads as it would at that time of day, in SwiftUI's own form: `Text(date, style: .relative)` under an hour is "39 min, 59 sec" and ticks every second, over an hour "2 hr, 54 min" (Pernille's SwiftUI probe, T-4927). A zero second unit is drawn under a day ("34 min, 0 sec") and dropped from a day up ("6 days", "1 mth"); past a month the units are calendar months and years counted from the date ("1 mth, 22 days" for 53 days ahead of Nov 26), and the offset style is one signed word unit ("−3 minutes" for 4 minutes ahead), as Maren's probe of 2026-11-26 drew them (T-5290, from Pernille's T-5216 L1 and L2; pinned in `tests/showcase_relative_test.py`). Every sheet measures that string. |
| Studio grey | With `--set showcase`, every hued value Studio supplies (grounds, lines, text greys, accent, the widget card gradient, Increase Contrast set) becomes the neutral grey of the same relative luminance. T-4680 did the same for the 04-mockups: canvas #0A0C13 becomes #0C0C0C, the card #5B33E6 to #1E1450 becomes #5A5A5A to #1F1F1F, and the accent #A08BFF becomes #9C9C9C. The status colours stay. `tokens.json` is not changed: item 9 records that "the tokens are not changed yet". |

</div>


Each sheet shows every family the view claims in full colour light and dark, accented light and dark (sample tint #5AA9C8), and iOS 26 clear in both appearances over a light and a dark wallpaper. The Lock Screen families are shown vibrant in both appearances over two wallpapers. Every state is drawn in light and in dark. No image model, stock art or photo is used. SF Symbols are stand-in glyphs. A symbol with no stand-in shows as a dotted rounded square; in these sheets that is `arrow.counterclockwise`, `checklist` (Today's inline), `checkmark`, `cloud.rain`, `eye`, `play.fill`, `rectangle.on.rectangle`, `sunrise.fill`, `thermometer.high`, `thermometer.low`, `tram.fill` and `umbrella`. (`timer` has a stand-in, so it is not on the list; T-5001.) The tree names the real symbol, and `tests/showcase_trees_test.py` keeps this list equal to what render.py draws.

## Day phases

Plan s4. Families: systemSmall, systemMedium, systemLarge, accessoryRectangular, accessoryInline. StandBy is the system's scaled small widget, and this renderer does not draw it (see "Not drawn").

### Transit (Morning and Evening)



- **Header.** The station and direction in plain words: "125 St, downtown" (medium and large) and "34 St-Herald Sq, uptown" in the evening. Small uses the station's short name ("125 St", "Herald Sq") at footnote semibold, with the direction in caption2. The top row ends 12 pt short of the trailing edge for the corner slot (header rule, README).
- **Route letters.** Plain bold letters in `text.primary`, carrying `.widgetAccentable()`. There is no circle, disc or route colour (plan s3, s4.4; Commandment 6).
- **Rows.** The letter, then the next arrivals as clock times. The first is semibold in primary and the rest are in secondary. Medium shows three arrivals per line, small two, and large three at 22 pt. Rectangular shows the first two per line. Inline reads "B 7:42, D 7:44". VoiceOver reads clock times only: "125 St, downtown. B at 7:42 AM, then 7:49 and 7:58. D at 7:44 AM, then 7:53 and 8:01."
- **No count-down (T-5000).** The first draw had "in 4 min" under the first arrival, as relative date text. That is not what iOS draws. `Text(date, style: .relative)` reads "3 min, 59 sec" and ticks every second, so it cut every count-down in all eight large panels once the real string was measured. After the train leaves it counts up again, so a gone train reads "in 1 min, 5 sec" until the next entry, up to 5 minutes later (entries are at least about 5 minutes apart, L2, plan s4.3). Timer text (`Text(timerInterval:countsDown:)`) stops at "0:00", but "0:00" for a train that left four minutes ago still tells someone to run for it. iOS has no self-updating text that says "in 4 min" and stops, so no count-down here can stay true between entries. A clock time can: 7:42 is still 7:42 when the entry is late, and the next entry drops it. Plan s4.2 and s2 row 1 ("ticking 'in 4 min'") need this change too (for Ines and Pernille).
- **Clock times carry no AM or PM** ("7:42", as the plan writes them). At 17 pt "7:42 AM" three times did not fit a medium row: the first QA run cut all six. An arrival is minutes away, so the half of the day is never in doubt.
- **Footer.** "Updated 7:31 AM" always. The states show a credit line, with placeholder words, set beside it in medium, because the MTA's terms are unread (s4.4). It fits in medium at caption2, truncating at the tail. If the terms ask for a longer line, the Updated time keeps its place and the credit line yields.
- **States.** Evening, in medium and small. "No B times right now" in medium, and "No times now" in small, where the full sentence does not fit at 126 pt. The credit-line variant.

### Today (Day)



- Today's three as plain rows with a 6 pt accent dot. They are not rings or checkboxes, because the rows do nothing in T-4673 (Done buttons come in s4.6, T-4712). A long item truncates at the tail (declared).
- The workday bar is a `ProgressView` with a time interval, from 10:00 AM to 5:00 PM, and ticks alone. Under it is "Evening trains in 2 hr, 54 min" (relative, as SwiftUI draws it half a second after 2:05 PM). It stays true only because the Evening entry at 5:00 PM replaces the view when the count reaches zero; a relative text with no entry at its date counts up. VoiceOver says "Evening trains from 5:00 PM", which does not go stale. Small says "in 2 hr, 54 min" after a tram glyph because the words do not fit at 126 pt. Large adds the bar's two ends, a Divider, and one line naming the evening stop.
- State: Today's three not set, which reads "Add today's three on the Page."

### Night



- Tomorrow's date, then sunrise (7:21 AM on the sample Wednesday at 125 St, from the NOAA low-precision form in `premade.py`; the app uses the H249 almanac) in the display face at 32, 34 or 56 pt, then "Downtown B and D from 6:00 AM". It has few words and no network.

### No recent times



- The data is 41 minutes old (more than 30). The view reads "No recent times." and "Open PyWidget to update." and keeps the Updated line. The stale clock in the corner slot (state-spec s2) is measured on the QA card page, which is not saved as an image. This sheet does not draw it. A tap opens PyWidget (`widgetURL`; `pywidget://open` stands in for the app's own link).
- State: never fetched. The same words show with no Updated line. The view leaves `ui.Updated()` out by a state flag (`never_fetched`), not by a missing `sampled_at`: `ui.Timeline` fills a missing `sampled_at` with the clock, so the first draw of this frame said "Updated 2:34 PM" (the time the script ran) under "No recent times", a freshness the premade does not have (T-5001, from Pernille's T-4927 M1). The build takes the same flag.

### Pernille's render, reviewed against these frames

**There is nothing to review yet.** As of 1:35 PM ET on 11-17, and again at 3:32 AM ET on 11-18, T-4673 is open on the board, and `pywidget/widgets/premade/day_phases.py` exists on no branch (`git log --all` for the path is empty) and in no worktree. When it lands, check these points against the frames:

1. Route letters are plain letters in a token colour, with no circles.
2. Arrivals are clock times, with no count-down: no relative text (it counts up once the train has gone) and no timer text (it holds "0:00" for a gone train), in every family. The VoiceOver label has clock times only. Inline is "B 7:42, D 7:44". (T-5000, from T-4927 H1.)
3. Medium fits three arrivals per line. If the build keeps "AM", it does not fit (see above).
4. "Updated" is in the bottom row, never the top. The credit line yields to it.
5. "No B times right now" appears per line, and nothing is guessed.
6. The no-recent-times words appear after 30 minutes, and a tap opens PyWidget. Never fetched shows no Updated line, left out by a state flag (T-5001).
7. Night has no network.
8. The Simulator check (Idris) decides clear and vibrant on a light wallpaper. Those modes fail contrast here for the same reason as the 12 premades (README "Re-render").

### Gaps in the plan found while drawing (for Pernille and Ines)

1. **Large, "adds a third arrival".** s4.2 gives medium three arrivals already, so large cannot add a third. I drew large with three arrivals, each with its own count-down, plus the next phase's start. If a fourth arrival was meant, it fits.
2. **The inline text goes stale.** "B 4 min, D 6 min" was a plain string. Settled in T-5000: the inline shows the first clock time ("B 7:42, D 7:44"), which stays true, as do the other families.
3. **The short name.** Small needs a short station name. "34 St-Herald Sq, uptown" does not fit at 126 pt. s4.2 says "abbreviated by the name's `max`", but the Page (s4.5, T-4704) has no short-name field, so the stop list must carry one, or the Page must.
4. **"Evening trains in ..." assumes Evening is a Transit phase.** If a person gives Evening the Today or Night view, or if Weekdays only is on and it is a Saturday, the line should name the next phase in plain words ("Night view at 9:00 PM") or drop. The plan does not say which.
5. **The credit line's wording and length** wait for the terms (s4.4). Medium has room for one caption2 line beside "Updated".
6. **StandBy.** s4.2 asks Night to read in StandBy. These frames cannot show that (see "Not drawn"), so the Simulator check covers it.
7. **Next 24 hours on the Lock Screen.** L16's condition is the credit line "on the widget". The rectangular widget has three lines and no room for it. Wrenna or Ines should say whether the Lock Screen families need it (and so need to drop a line), or whether the credit on the system families and in PyWidget is enough.
8. **The driest window when several tie** (for example, a dry day with one shower). The frames pick the sooner. The plan does not say.
9. **Site status "down" thresholds.** The frames show a single "Down" (no answer, or an error). A "slow" state (the build line tests it) has no mark in the strip yet. If the build wants one, it would be a third bar height, not a new colour.
10. **Night after midnight.** Night runs from 9:00 PM to 6:00 AM, and the frame at 10:20 PM says "Tomorrow, Wednesday October 28". From 12:00 PM to 6:00 AM that is wrong: the sunrise is this morning's. The plan does not say what the words are then ("This morning", or the date alone). Pernille takes it in the Day phases build (T-4927 L3 a).
11. **Focus timer's task name has no input.** Medium and large show a task name ("Draft the notes"), and plan s2 row 3 has none. Either the plan adds it as a Page field, or the frames drop the line (and medium and large each gain a line of room). For Ines (T-4927 L3 b).

## Focus timer



Plan s2 row 3, Pro. Never called "Pomodoro" (a trademark). Families: systemSmall, systemMedium, systemLarge, accessoryRectangular, accessoryInline.

- **The countdown** is timer text in the display face (34 pt, or 56 in large) with a `ProgressView` timer bar. Both tick alone, so one entry covers a block.
- **Buttons.** The Gallery 09 pill (T-0429 <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>): Pause and Skip while a block runs, Resume when paused, and Start alone when nothing runs, since there is nothing to skip then. Each is a `Button` with a declared action (`start`, `pause`, `resume`, `skip`). The handlers are the build's. The Lock Screen draws no buttons.
- **Today's blocks** are bars, one per block, with height by minutes and the running block in primary, the way Steps draws today. They appear in medium (34 pt) and large (56 pt) with "4 blocks, 1 hr 47 min". Small has no chart.
- **States:** paused, which shows "7 of 25 min" and the bar held at 0.28, and no block running, in medium and small. With no block running the chart draws the three blocks done and none in primary, matching its words ("3 blocks, 1 hr 40 min"); the first draw had a fourth bar in primary as if a block were running (T-5001, from T-4927 L1).

## Next 24 hours



Plan s2 row 4, free. MET Norway (L16: Go with conditions). Families: systemSmall, systemMedium, systemLarge, accessoryRectangular, accessoryInline. The forecast is a made-up sample, not MET Norway data.

- **The chart.** Temperature is an accent line (Altitude's profile line), with a dot at now. Rain is bars in `line.strong` under it (Steps' past bars). The driest two-hour window is an `accent.soft` band behind both (Altitude's area fill), and it is named in words above the chart: "Driest 5–7 PM". The band never carries the meaning alone.
- **The credit line** "Data from MET Norway" is on every system family at caption2, bottom left, with "Updated" at bottom right in medium and large. In small the credit takes the bottom row and there is no Updated line, because both do not fit at 126 pt. The stale clock in the corner still says when it is old. Lock Screen families carry no credit line (see gap 7).
- **Units.** The sample is in °F and inches, as a US person would see it. MET Norway sends °C and mm, and the build converts by the person's locale.
- **Large** adds High, Low and Rain rows ("0.37 in, most 8–10 PM"). **Inline** is "58°, rain from 8 PM", or "dry all day".
- **State:** dry all day, in medium and small. The band is not drawn, and the words say "Dry all day".

## Sky



Plan s2 row 5, free, the rework of Sunrise and sunset. Families: systemSmall, systemMedium, systemLarge, accessoryCircular, accessoryRectangular, accessoryInline (Sun's families plus Large).

- **The arc** runs from dawn to dusk across the width. Sun's arc (a `bg.sunken` track, with the travelled part and the dot in `status.warning`) rises between sunrise and sunset. Civil twilight is an `accent.soft` band under the horizon at each end.
- **The moon** is drawn with Path, with no image or symbol: a `line.strong` ring for the limb and the lit part in `status.warning`, the colour Sun already uses for the sun's light. The first draw used `text.primary` for the lit part, which made a full moon a black disc in light. A `bg.sunken` dark disc measured 2.70:1 under the amber in dark, so it became a ring.
- **Daylight gained.** On the sample day (Oct 27) the day is shorter, so it reads "2 min 29 s less than yesterday" (medium) and "...shorter than yesterday" (large). The plan's word "gained" is the spring case.
- **The count-down to the next event** ("in 2 hr, 18 min") is relative text, which counts up once its date has passed. The 15-minute entries are too far apart to replace it in time, so the build needs an entry at each event (dawn, sunrise, sunset, dusk) as well (T-5000).
- **Before sunrise** the hero switches to Sunrise. This is shown in the morning state, in medium and small. Large adds Dawn, Sunrise, Sunset and Dusk, the moon at 40 pt with its name and percent lit, and the next full moon (or the next new moon when it is full now).
- The sample uses the NOAA sun equation and a mean synodic month. Which almanac the app uses is T-4797's.

## Overlap clocks



Plan s2 row 6, free, the rework of World clocks. Families: systemSmall, systemMedium, accessoryRectangular, accessoryInline (World clocks' families). Places: New York (you), London and Berlin, 9 to 5 each. London is on GMT and New York on EDT on Oct 27.

- **One bar per place** on your 24-hour axis (12 AM to 12 AM, your time). Working hours are `line.strong` and the hours all share are accent, set side by side with a 1 pt gap, never stacked. Stacking measured 2.32:1 (accent on grey) in light and 1.07:1 in dark. A hairline marks the day's extent, and now is two short `text.primary` stubs above and below the bar, never across a cell.
- **Words first.** "Shared hours / 9:00 AM–12:00 PM, in 39 min, 59 sec" (relative, ticks every second; the per-minute entries replace it before it can count up), "Shared now / to 12:00 PM", or "No shared hour / None today".
- Medium adds an axis (12 AM, 6 AM, 12 PM, 6 PM) under the bars. Small has bars but no axis.
- **States:** shared now, and no shared hour (London, Berlin and Tokyo), each in medium and small.

## Site status



Plan s2 row 7, free. Families: systemSmall, systemMedium, systemLarge, accessoryRectangular, accessoryInline. The addresses are on the reserved example domains (RFC 2606), not real sites.

- **Up or down** is a symbol in its status colour (`checkmark.circle.fill`, `xmark.octagon.fill`, as GitHub's CI line), and "Down" is a word in the time column. The summary line names the site when one is down.
- **The 24-hour strip.** One mark per hour. Up is a short `line.strong` bar, down a full-height `status.danger` bar (taller, so it reads by shape as well as colour, and it is in the accent group), and no reading a short `bg.sunken` bar. A green strip was not used: colour on every healthy hour would be noise.
- Medium fits four sites on one line each. Large puts the strip full width under each name, with "Down since 12:00 PM".
- **States:** all up, in medium and small, and a site just added with one hour of history.

## Flashcards



Plan s2 row 8, Pro. Families: systemSmall, systemMedium, systemLarge, accessoryRectangular, accessoryInline. The deck is a made-up Spanish sample.

- **The card** is in the display face (24, 28 or 40 pt). The buttons are Focus timer's pills (Gallery 09): "Show answer" (prominent) on the front, then "Again" (soft) and "Got it" (prominent). Each is a `Button` with a declared action (`show`, `again`, `got_it`). Small drops the button symbols and uses caption to fit at 126 pt.
- **Large** adds the Leitner box, the count answered today and a progress bar.
- **The Lock Screen** draws no buttons, as with Focus timer: rectangular shows the deck, the count due, the front and "Tap to answer".
- **States:** answer shown (medium, small, large), nothing due ("Next card at 6:00 PM"), and no cards yet ("Add cards on the Page").

## GitHub repository: the star-history line



Plan s2 row 9, free, and T-4713. Families: systemSmall, systemMedium, accessoryRectangular. Only Medium changes, and Small and rectangular are v1 as drawn.

- **The line** is the last 30 days of the premade's own star counts, drawn as an accent line on an `accent.soft` area (Altitude's profile) with "Stars, 30 days" and "+62". A day with no fetch breaks the line and the area. It does not join across.
- To make room, medium drops v1's Forks and Pushed rows and keeps open issues and CI.
- **States:** four days with no fetch (a gap), first fetch ("Star history starts with the next fetch."), and CI failing.

## QA (`showcase/qa.json`)

Each sheet's own check: truncation, text or graphics outside the widget, text in the 16 pt margin, text over text, and text under 11 pt. The card page measures marks at 3:1 and text contrast in light, dark, lightHC and darkHC.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: QA (showcase/qa.json), scrolls sideways" data-n="2" style="--tw:1128px" markdown="1">

| Sheet | Widget renders | Layout faults | Full colour text, worst (light / dark) | Marks on the card, worst (light / dark) |
|---|---|---|---|---|
| 01 Day phases, Transit | 42 | 0 | 7.08 / 5.46 | 7.08 / 5.24 |
| 02 Day phases, Today | 36 | 0 (1 declared tail truncation) | 7.08 / 5.31 | 7.08 / 3.58 |
| 03 Day phases, Night | 32 | 0 | 7.08 / 5.38 | 7.08 / 6.09 |
| 04 Day phases, No recent times | 34 | 0 | 7.08 / 6.34 | 7.08 / 5.24 |
| 05 Focus timer | 40 | 0 | 7.08 / 5.31 | 3.18 / 4.67 |
| 06 Next 24 hours | 36 | 0 | 7.08 / 5.46 | 3.18 / 3.81 |
| 07 Sky | 40 | 0 | 7.08 / 5.24 | 3.18 / 4.23 |
| 08 Overlap clocks | 32 | 0 | 7.08 / 5.92 | 3.18 / 4.85 |
| 09 Site status | 38 | 0 | 7.08 / 6.43 | 3.18 / 3.66 |
| 10 Flashcards | 42 | 0 | 7.08 / 5.38 | 7.08 / 4.90 |
| 11 GitHub star history | 26 | 0 | 7.08 / 5.53 | 5.79 / 5.47 |

</div>


That is 398 renders and 0 faults (sheets 01 to 05: 184; 06 to 11: 214). Card text faults: 0. Graphics faults: 0. The first runs found faults on four of the five sheets, all fixed in the designs, not hidden:

- In Transit, "7:42 AM" was cut six times in medium; this became the AM/PM call above.
- In Transit large, the count-down cut in all eight panels once render.py drew SwiftUI's real string ("in 3 min, 59 sec"; Pernille's T-4927 check). The count-down was taken out (T-5000, above), not shortened. Sheets 02, 07 and 08 were redrawn with the real relative strings and still have 0 faults.
- In Transit small, the letter overlapped the times, and "Herald Sq uptown" was cut. The station name dropped to footnote.
- Today's "Evening trains in ..." line was pushed out of medium and into the margin in small.
- Night medium was too tall. The "Sunrise" label row was folded beside the time.
- Focus timer: small was too tall (the task line was dropped there), and an hour axis under the large chart was dropped, since the bars are blocks, not hours.
- Next 24 hours: large was too tall, so the chart went from 118 to 92 pt.
- Sky: the daylight line was cut in small, medium and large (28 faults). The marks failed in dark (see the moon above), and large was too tall.
- Overlap clocks: the medium axis was cut and sat in the margin. Small was cut ("Working hours do not meet"). Stacked bars failed 3:1 in all four card modes.
- Site status: small spilled out of the widget, and medium sat in the margin.
- Flashcards: small's "Again" and "Got it" sat in the margin. "the window" now holds one line and scales.

Accented, clear and vibrant numbers are in `qa.json` for each mode. They are this renderer's approximation of the system and fail on light wallpapers as the 12 premades do (README). Full colour is our paint, and it passes.

**Not drawn.** StandBy, Dynamic Type above the default, and the Increase Contrast frames as images (they are measured on the card page, not saved). Also not drawn: the real SF Symbols, and SwiftUI's own layout. Idris's Simulator snapshots are the check that counts.

## Proposals (not used; each would need its own <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> approval)

- **Route colours.** Showing the B and D in their route colour (orange) or in a circle would be the MTA's marks and a new colour. It waits for the terms (s4.4) and then for a C51 approval. The frames use plain letters.
- **A moon glyph of our own.** Sky's moon is drawn from the lit fraction, which needs no new asset. A drawn moon icon for the Gallery or the app would be a new icon, so it would need its own approval.
- **Studio's grey values as tokens.** The greys above are computed, not tokens. Writing them into `tokens.json` belongs with the theme work (item 9's "specifics later"), not to this line.

## Left

- When T-4673 lands, review Pernille's render against the points listed under "Pernille's render". That is the only part of T-4703 still open.
- T-4766 (the other six) is the same work as sheets 06 to 11. It can close as done by this commit.
{% endraw %}

</div>
