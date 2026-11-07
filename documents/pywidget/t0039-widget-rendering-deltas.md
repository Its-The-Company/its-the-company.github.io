---
layout: "default"
title: "T-0039: gallery templates against design-system-v0 section 8, rendered"
section: "documents"
description: "Severity: Major = content a user would lose in a mode they will see; Minor = a rule bent, content kept; Open = the answer depends on the system and needs the Home Screen; None = matches."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0039-widget-rendering-deltas.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/design/t0039-widget-rendering-deltas.md</code></span></div><h1>T-0039: gallery templates against design-system-v0 section 8, rendered</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-02, for Maren. A check, not a fix: no tree, token or renderer was changed. A is checked in Light (Paper), B in Dark (Studio, card starting at `#5B33E6`), as #60 kept them.

## What was rendered, and what could not be

- **Source.** The 15 gallery trees (`docs/design/widgets/gallery/trees/*.json`, first timeline entry), 37 family views, drawn by Renderer.v1 (`TreeEntryView`, what the widget extension hands WidgetKit) through `ImageRenderer` in the iOS 27.0 Simulator (iPhone 18 Pro). Test: `pywidget/ios/Tests/GalleryModesSnapshotTests.swift`.
- **Sizes.** s8.1's sizes (158×158, 338×158, 338×354, 715×338, 72×72, 160×72, inline 210×20), plus full colour at the smallest and largest iPhone sizes for the Home Screen families (148, 170; 321×148, 364×170; 321×324, 364×382). Those flex sizes are from my memory of Apple's widget size table, not fetched for this task.
- **Modes.** Home Screen: full colour, accented, vibrant (StandBy), clear over a light wallpaper, clear over a dark wallpaper. Lock Screen families: vibrant over a dark and a light wallpaper. 370 panels.
- **Measured per panel** (`t0039-gallery-modes/measure.json`): pixels drawn, Vision's reading of the text, words that read in full colour but not in the mode, any ellipsis, ground luminance, brightest ink, and the best contrast that leaves.
- **What this cannot show.** `ImageRenderer` draws what our views emit for a rendering mode (white at the s8.3 <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> when colour is stripped). It does not run the system's own recolouring: the two accented tint groups, the vibrant material, the iOS 26+ clear glass, StandBy's red night tint. Grounds in those columns are render.py's flat stand-ins, and clear is drawn as accented. The Simulator can't be put into the Tinted or Clear Home Screen style from the command line (`simctl ui` sets only appearance, Increase Contrast and text size), and a widget can't be placed on its Home Screen or Lock Screen without someone working the Simulator by hand. So **every system-recoloured result below is marked "needs the Home Screen"**. I have not guessed at those.
- **Vision noise, discarded.** Live timer texts (the moon's "22 min, 27/28 sec"), "1:52 PM" read as "52PM", the month header "M T W" read joined or apart, and heatmap squares read as letters. These were checked one by one against the readings and are not deltas.

Sheets (one per family and appearance; rows are designs, columns are modes then flex sizes; 256-colour PNGs, illustration only, every number above is from the full-depth render):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What was rendered, and what could not be, scrolls sideways" data-n="2 3" style="--tw:275px" markdown="1">

| Family | A Light | B Dark |
|---|---|---|
| systemSmall | A | B |
| systemMedium | A | B |
| systemLarge | A | B |
| systemExtraLarge | A | B |
| accessoryCircular | A | B |
| accessoryRectangular | A | B |
| accessoryInline | A | B |

</div>


Severity: **Major** = content a user would lose in a mode they will see; **Minor** = a rule bent, content kept; **Open** = the answer depends on the system and needs the Home Screen; **None** = matches.

## The deltas


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The deltas, scrolls sideways" data-n="1" style="--tw:1645px" markdown="1">

| # | Where | s8 says | Renders | Delta | Severity |
|---|---|---|---|---|---|
| D1 | 08-month, today cell "26" (systemLarge, systemExtraLarge); 14-reading, "32%" in the book bar (systemMedium). A and B | s8.3 item 2: "Never a level that only colour separates." | The mark (`accent`, accentable) goes to white 1.0 and its label (`text.onAccent`, default group) goes to white 1.0: a blank white disc and a blank white bar in vibrant and clear. Vision reads the label in 14 of 14 full-colour panels and in 0 of 24 stripped ones (16 month, 8 reading; the one stray "26" was the header date split across two lines) | Text erased when colour is stripped. In accented the system tints the disc and bar and the label stays in the default group, so it may still read there: needs the Home Screen. The Pause pill already has the fix pattern (s8.4 row 18, `When renderingMode`) | **Major** (vibrant, clear); Open (accented) |
| D2 | Clear over a light wallpaper, every Home Screen family. A | s8.2: content rendered light; "check legibility over a light and a dark wallpaper" | On the stand-in (`#E9E4DC` under white 0.30, luminance 0.84): text 1.0 at **1.18:1**, text 0.66 at 1.11:1, quiet marks 0.36 at 1.06:1. Vision still reads most words at 3x, losing "sonder", "61", "of", "lit" | White content is invisible on the stand-in. The real answer is the system's adaptive glass, which `ImageRenderer` can't draw | **Open, needs the Home Screen; first on the list** |
| D3 | Clear over a light wallpaper, every Home Screen family. B | as D2 | On the stand-in (same wallpaper under rgb(28,28,34) 0.34, luminance 0.35): text 1.0 at **2.60:1**, 0.66 at 1.95:1, 0.36 at 1.47:1 | Under 4.5:1 at both text levels on the stand-in | **Open, needs the Home Screen** |
| D4 | Lock Screen over a light wallpaper (all 14 accessory views). A and B identical once colour is stripped | s8.2 vibrant: white at the ladder, luminance only, over the wallpaper | On render.py's `lock_light` `#9A9590`: text 1.0 at 2.97:1, 0.66 at 2.15:1 | Under 4.5:1 on the stand-in. The system's vibrant material decides the real figure | **Open, needs the Lock Screen** |
| D5 | Clear over a dark wallpaper. A | s8.2, s8.3 item 2 | Stand-in (`#0F1014` under white 0.30): text 1.0 at 7.14:1, **0.66 at 4.19:1**, 0.36 at 2.35:1 | Secondary text under 4.5:1 on A's glass stand-in. B on its stand-in: 18.37 / 8.39 / 3.34, all clear | Minor on the stand-in; Open on the device |
| D6 | Accent groups | s8.3 item 3, s8.2 accented: the hero and its mark take `.widgetAccentable()` | `check_widget_modes.py` logic over the gallery trees: literal 0, gradient 0, colour-only 0, serif 0, cardbg 0; **4 system-family views with no accentable node**: 03-endpoints/systemMedium, 15-script_output/systemMedium, systemLarge, systemExtraLarge | In accented these four have no tinted group at all | Minor |
| D7 | 03-endpoints, systemMedium at 321×148. A and B | s8.1: flex to the container | Third host cut in the middle: "status.exam....net/v2/ping". Fine at 338 and 364 | Truncation at the smallest iPhone | Minor |
| D8 | 14-reading, systemMedium at 321×148. A and B | s8.1 | Last line cut: "About November 18, 20... at 38 a day". The year is lost | Truncation at the smallest iPhone | Minor |
| D9 | 05-word, systemLarge at 321×324. A and B | s8.1 | The 1x sheet draws the compact layout, with the definition cut to one line ("from dry gr..."). The 2x and 3x measured renders of the same panel draw both lines in full | The layout sits on its fit boundary, so which one a 375-pt phone shows is a device question | Minor; Open on the device |
| D10 | accessoryRectangular: 03-endpoints, 04-pinned_note. A and B, both wallpapers | s8.1: 3 lines; title with symbol, one value line, one sparkline or progress | Endpoints line 2 cut mid-host ("status.exam....net/v2/ping"); the note's body ends "Ticket in the glov..." | Content cut on the Lock Screen at 160×72 | Minor |
| D11 | 15-script_output, the script path (medium, large, XL) | s8.1 | Head-truncated at every size ("...home/backup/backup_photos.py"; "...me/" at 321, "...ipts/home/" at 364) | Probably intended (the file name survives); listed so it's a decision | None if intended |

</div>


## Per family and mode

"Matches" means: every claimed view draws, nothing is cut that full colour shows, the stripped panel keeps every word full colour has (apart from D1), and no placeholder. Contrast figures in the stripped columns are the s8.3 ladder (text 1.0 / 0.66) on the stand-in ground. Full-colour text contrast is not re-measured here: s2.0 (4.77:1 worst on B's card) stands, and Vision read every full-colour word in all 37 views at s8.1 size.

### Template A, Light (Paper)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Template A, Light (Paper), scrolls sideways" style="--tw:1558px" markdown="1">

| Family (views) | Full colour | Accented | Vibrant (StandBy) | Clear, light wallpaper | Clear, dark wallpaper | Flex sizes |
|---|---|---|---|---|---|---|
| systemSmall (8) | Matches | Matches; text 17.08 / 8.02:1; tint groups need the Home Screen | Matches; 21 / 8.86:1; night red tint needs StandBy | D2: 1.18 / 1.11:1 | D5: 7.14 / 4.19:1 | Matches at 148 and 170 |
| systemMedium (9) | Matches (D11) | D1 (14-reading), D6 (03, 15); otherwise as small | D1 | D1, D2 | D1, D5 | D7, D8 at 321×148; 364×170 matches |
| systemLarge (4) | Matches (D11) | D1 (08-month), D6 (15) | D1 | D1, D2 | D1, D5 | D9 at 321×324; 364×382 matches |
| systemExtraLarge (2) | Matches | D1 (08-month), D6 (15) | D1 | D1, D2 | D1, D5 | (iPad, one size) |
| accessoryCircular (4) | n/a | n/a | Dark wallpaper 15.17 / 7.41:1; light wallpaper D4 | n/a | n/a | n/a |
| accessoryRectangular (7) | n/a | n/a | D10; light wallpaper D4 | n/a | n/a | n/a |
| accessoryInline (3) | n/a | n/a | Matches, all under 20 characters, system font; light wallpaper D4 | n/a | n/a | n/a |

</div>


### Template B, Dark (Studio)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Template B, Dark (Studio), scrolls sideways" style="--tw:1693px" markdown="1">

| Family (views) | Full colour (card `#5B33E6` to `#1E1450`) | Accented | Vibrant (StandBy) | Clear, light wallpaper | Clear, dark wallpaper | Flex sizes |
|---|---|---|---|---|---|---|
| systemSmall (8) | Matches; rounded hero numerals (s8.3 item 1) | Matches; 17.08 / 8.02:1; tint groups need the Home Screen | Matches; 21 / 8.86:1; night red tint needs StandBy | D3: 2.60 / 1.95:1 | Matches; 18.37 / 8.39:1 | Matches at 148 and 170 |
| systemMedium (9) | Matches (D11) | D1, D6 | D1 | D1, D3 | D1 | D7, D8 at 321×148 |
| systemLarge (4) | Matches (D11) | D1, D6 | D1 | D1, D3 | D1 | D9 at 321×324 |
| systemExtraLarge (2) | Matches | D1, D6 | D1 | D1, D3 | D1 | (iPad, one size) |
| accessoryCircular (4) | n/a | n/a | As A: the card is removed, so the Lock Screen draws the same for A and B | n/a | n/a | n/a |
| accessoryRectangular (7) | n/a | n/a | As A (D10, D4) | n/a | n/a | n/a |
| accessoryInline (3) | n/a | n/a | As A | n/a | n/a | n/a |

</div>


s8.3 for B, item by item: (1) the rounded hero numeral survives every mode: **matches**. (2) The ladder draws at 1.0 / 0.66 / 0.36 / 0.24 / 0.18 as listed, but D1 is a pair the ladder doesn't separate: **delta D1**. (3) Accent groups: **D6**. (4) Nothing carries meaning by hue: status marks keep their symbols (endpoints ✓ / ✕, script exit ✓): **matches**. (5) Every paint is a token: literal 0: **matches**.

## What only the Home Screen can answer (the open checks, in the order the board asked)

1. Clear over a light wallpaper, A, then B (D2, D3): legibility of white content on the system's adaptive glass.
2. Lock Screen vibrant over a light wallpaper (D4).
3. Accented: whether the two tint groups make D1's labels readable, and how D6's four views look with no accent group.
4. StandBy at night (red tint), and D9 on a 375-pt phone.

These need a person at a device or at the Simulator's Home Screen. The Tinted and Clear styles can't be set by a script, and the extension's output can't be placed on the Home Screen without someone doing it by hand.

## Re-running

```
cd pywidget/ios && xcodegen generate
TEST_RUNNER_T0039_DUMP=1 ../../tools/xc.sh -scheme PyWidget -destination 'platform=iOS Simulator,name=iPhone 18 Pro' \
  test -only-testing:PyWidgetTests/GalleryModesSnapshotTests
```

Without `TEST_RUNNER_T0039_DUMP=1` the two measured tests skip and write nothing. Only the structural test runs: 15 designs, schema-valid, only drawn nodes and modifiers, and a view and a size for every claimed family. The run takes about 3.5 minutes and rewrites `t0039-gallery-modes/`.
{% endraw %}

</div>
