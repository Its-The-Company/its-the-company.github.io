---
layout: "default"
title: "New look: watercolor (direction 1, T-5856), blueprint (direction 2, T-5857), risograph print (direction 3, T-5858) and Swiss editorial\u2026"
section: "documents"
description: "The wash is the same in every palette, and only the pigments change. Grounds stay near-white and near-black, so the wash carries the colour; the dark grounds are neutral, as #291 asked of Studio."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/new-look-readme.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/design/new-look/README.md</code></span></div><h1>New look: watercolor (direction 1, T-5856), blueprint (direction 2, T-5857), risograph print (direction 3, T-5858) and Swiss editorial…</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-26. **Mockups for the Investors to choose from, not an approval and not a change to the app.** Paper (light) and Studio (dark), `creative/approved.md` item 9 (#291), stay the app's look until the Investors approve a direction.

- **Directions on this page:** watercolor, sections 1 to 7; blueprint, [section 8](#8-direction-2-blueprint-t-5857); risograph print, [section 9](#9-direction-3-risograph-print-t-5858); Swiss editorial, [section 10](#10-direction-4-swiss-editorial-t-5859); the watercolor wash moving, [section 11](#11-the-wash-live-t-5860); **the four side by side, with costs and a recommendation, [section 12](#12-the-four-side-by-side-t-5861)**.
- **Asked by:** an Investor on #325 (c7162542094)), with his answers in c7162738460). The plan is [`ops/plans/new-look-directions.md`](../company/new-look-directions.html), and this page holds its steps 1 (watercolor), 2 (blueprint), 3 (risograph print), 4 (Swiss editorial), 5 (the live wash) and 6 (the comparison).
- **What it shows:** a watercolor wash drawn in code from one seed, Projects in three palettes, the full set in the strongest palette (warm), light and dark, and the Builder drawn in the blueprint editing language.
- **Where the wash sits:** in headers, project cards, Gallery tiles, the first run and the Builder stage. The editor and Settings stay calm. Text never sits on the wash except the large titles, and every run of text is measured against the pixels behind it (section 5).
- **Layout:** as item 9 has it. A is the base, with C's Builder stage (widget on top, chosen block ringed), C's plain-words run card and the three start buttons. Only the look changes; nothing moves. (The Swiss direction is the exception: it moves a few things by a few points onto its grid, named in section 10.)
- **Type:** SF Pro throughout, in both modes. Character comes from weight and size: titles are 34 pt heavy with tight tracking. Code is set in Menlo, not SF Mono (section 6).

## 1. Projects in three palettes

The wash is the same in every palette, and only the pigments change. Grounds stay near-white and near-black, so the wash carries the colour; the dark grounds are neutral, as #291 asked of Studio.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Projects in three palettes, scrolls sideways" data-n="2 3" style="--tw:431px" markdown="1">

| | Light | Dark |
|---|---|---|
| **Warm**: terracotta, ochre, rose and sage on warm paper |  |  |
| **Cool**: sky, teal, lilac and slate blue on cool white |  |  |
| **Muted**: sage, clay, slate and oat, low in colour |  |  |

</div>


## 2. The strongest palette: warm

- **Warm has the most personality in both modes.** Its terracotta accent is unlike iOS's standard blue, its wash still shows on the dark ground, and it carries on Paper's paper-and-ink feel without copying it.
- **Cool looks like a stock app.** Its accent sits close to the system blue, and system blue is a large part of the "vibe-coded" feel the Investors want to lose.
- **Muted is calm but goes flat.** In light mode the wash turns khaki, and in dark mode it nearly disappears, so the motif stops doing its job.
- **All three pass the contrast check.** The lowest text ratios are warm 4.90 (light) and 5.50 (dark), cool 5.32 and 6.65, and muted 4.98 and 6.34, so legibility doesn't decide between them.

The Investors may prefer another palette. `STRONGEST` in `watercolor.py` names the palette, and changing it redraws the whole set in that palette with one command.

## 3. The full set, warm


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. The full set, warm, scrolls sideways" data-n="2 3" style="--tw:431px" markdown="1">

| Screen | Light | Dark |
|---|---|---|
| **Projects**, with the three start buttons (With blocks, From the Gallery, With Python) |  |  |
| **First run**: no projects yet, and the three ways to start float on the wash |  |  |
| **Gallery**: each tile is a window onto the wash, with a ready-made widget on it |  |  |
| **Editor with its run card** (calm: no wash) |  |  |
| **Builder stage**: widget on top, and the chosen block (Big number) ringed both in the widget and in the list |  |  |
| **Settings** (calm: no wash) |  |  |

</div>


Widgets are drawn on a plain background, because a widget's background is the person's own choice; a frame around them is optional.

## 4. The Builder in the blueprint editing language

This is still the watercolor direction, but the Builder stage works like a drawing board. It has an 8 pt grid with a heavier line every 40 pt, and the widget sits on it at real size (338 × 158 pt). Each block has a dashed outline, and dimension lines give the widget's size and the chosen block's size and inset. The block list shows each block's measure (15 pt · semibold, 48 pt · semibold, 6 × 28.7 pt).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. The Builder in the blueprint editing language, scrolls sideways" data-n="1 2" style="--tw:111px" markdown="1">

| Light | Dark |
|---|---|
|  |  |

</div>


## 5. How it is drawn, and how to redraw it



The diagram above is drawn by the same command as the frames.

```
python3 pywidget/docs/design/new-look/draw.py            # every frame, the diagram and the contrast check
python3 pywidget/docs/design/new-look/draw.py gallery     # only frames whose name holds "gallery"
python3 pywidget/docs/design/new-look/draw.py blueprint-  # only the blueprint set (section 8)
python3 pywidget/docs/design/new-look/draw.py risograph-  # only the risograph set (section 9)
python3 pywidget/docs/design/new-look/draw.py swiss-      # only the Swiss set (section 10)
```

It needs Playwright with Chromium, as `../mockups/draw.py` does, and took about 44 seconds for all four directions on this Mac on 2026-11-26. Each direction goes into its own folder (`watercolor/`, `blueprint/`, `risograph/`, `swiss/`) with its own diagram and `contrast.tsv`.

- **Deterministic.** One seed (`SEED = 5856` in `wash.py`, mulberry32) draws one wash. Every crop of it comes from the seed and the window's name, and Chromium draws with the GPU off and an sRGB profile. Two runs give byte-identical PNGs; this was checked with `shasum` on all 20 output files (19 PNGs and `contrast.tsv`).
- **Contrast check.** Each frame is drawn twice: once for the PNG, and once with all text made transparent. Every run of text, 783 in all, is then measured against every pixel behind its box at 2x. The command prints the worst background for each text colour in each frame and exits 1 if any falls under 4.5:1 or any text is translucent. The full list is in `watercolor/contrast.tsv`, and every pair passes now. While I was drawing, the check caught four real faults: "Select" sitting on pigment, now in a calm capsule as iOS 26 bar buttons are; a ring crowding "Home"; "No projects yet" on the wash; and the status bar on a dark ochre pool.
- **Size.** 19 PNGs (18 frames at 786 × 1704, plus the diagram) come to about 4.2 MB, around 300 KB a frame.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 5. How it is drawn, and how to redraw it, scrolls sideways" style="--tw:755px" markdown="1">

| File | What it does | Reused by later directions |
|---|---|---|
| `kit.py` | page and fonts, icons drawn as SVG paths, `Look` (tokens plus a `motif()` hook), `render()` and the contrast check | yes, as it is |
| `screens.py` | Projects, the first run, the Gallery, the editor with its run card, the Builder (and its blueprint stage) and Settings, for any `Look` | yes, as it is |
| `wash.py` | the seeded wash: pools of pigment, layers deformed by midpoint displacement, crops ("windows") | watercolor, and step 5's live page, whose `wash.js` runs the same numbers in JavaScript (section 11) |
| `watercolor.py` | the three palettes, light and dark, and where the wash goes | watercolor only |
| `blueprint.py` | the blueprint direction (section 8): two prints, the drafting marks, its frames and its diagram | blueprint only |
| `risograph.py` | the risograph direction (section 9): paper and two inks, halftone, grain, proof marks, its frames and its diagram | risograph only |
| `swiss.py` | the Swiss editorial direction (section 10): the grid, the type, the red accent, its CSS, its frames and its diagram | Swiss only |
| `live.py` | checks the live page (section 11) in headless Chromium and draws its diagram | step 5 only |
| `compare.py` | the contact sheet of the four directions (section 12), from the Projects frames `draw.py` wrote | step 6 only |
| `draw.py` | the frame lists, the watercolor diagram and the command, one output folder per direction | add each new direction here |

</div>


**Adding a direction** (`blueprint.py`, `risograph.py` and `swiss.py` are worked examples): write a file with a `kit.Look` subclass that holds its tokens and a `motif()` returning that direction's backdrop (grid, halftone, nothing), then add its folder and frames to `DIRECTIONS` in `draw.py`. The screens, words, widgets, check and determinism come along unchanged.

## 6. What the rules held, and one font constraint

- **Code-drawn only.** Every shape is HTML, CSS or SVG written in these files and drawn by headless Chromium. There are no AI-generated images, no stock, nothing traced, and nothing taken from the inspiration images in `research/inbound/325/`, which set the mood only.
- **SF Pro and Menlo rest on the macOS licence, clause 2.E (Fonts).** It lets the fonts that come with macOS be used "to display and print content while running the Apple Software", and these frames are drawn that way: Chromium on this Mac reads the fonts in place from `/System/Library/Fonts`, and no font file is copied, embedded or shipped. The clause is in `/Library/Documentation/License.lpdf` on any Mac. Ines checked this reading in the T-5856 review.
- **SF Mono can't be used here, so code is set in Menlo.** The SF Mono on this Mac carries its own licence (the font's name table, ID 13). It says it may be used "solely in conjunction with Apple-branded applications" and not "to create, develop, display or otherwise distribute any content, documentation, artwork". Drawing mockups with it would break that, so code is set in Menlo, as the v0 mockups already are (`log/assets.md`, 2026-10-25).
  - In the app, SF Mono comes through the iOS system font API, which is allowed, so the shipped editor would use SF Mono.
  - Apple offers fonts separately on its developer site, and that download carries its own licence. I haven't read it. Taking it would mean accepting an agreement, so whether to do that is the Investors' decision.
- **Words.** The words are the app's own, taken from the #291 drawings (`documents/restructuring/04-mockups/a` and `c`) and the Settings and run-screen drawings in `../ide/`. "No projects yet" on the first run is new, written to the approved voice (item 8). All data is sample data.

## 7. Not in this step

- **Motion.** These are stills. The live wash is step 5, now [section 11](#11-the-wash-live-t-5860): one static page that draws this wash from the same seed, with a pause switch, and honours Reduce Motion.
- **High-contrast sets at 7:1.** The plan asks for 7:1 there. The check takes a minimum (`kit.report(..., minimum=7)`), but no high-contrast palettes are drawn yet.
- **iPad, the Activity screen, the Pro screen, the icon and the store page.**
- **The other directions.** Blueprint is step 2 (section 8) and risograph print step 3 (section 9); Swiss editorial is step 4 (section 10).

## 8. Direction 2: blueprint (T-5857)

Maren, 2026-11-26. Step 2 of the plan, from the same ask (#325 c7162542094), answers in c7162738460)). It shows the same screens as the watercolor set, light and dark, drawn by the same `screens.py` in the same type: SF Pro for text, Menlo for code (section 6).

### The fresh take: the app is the plan of what you build

The usual blueprint look puts white lines on a blue page over an ordinary app. This direction takes the Builder's own editing language (section 4) and makes it the language of the whole app. The motif is the set of drafting marks a Builder needs anyway, so nothing is decoration.

- **Two prints of one drawing.** Light is a whiteprint (blue ink on white) and dark is the blueprint (light ink on Prussian blue). The dark ground is blue on purpose. #291 asked Studio for a neutral dark, and this direction departs from that, for the Investors to judge.
- **Blue ink, and red pencil for the change.** Everything is drawn in blue ink. Only the one thing you are changing, the chosen block, gets red pencil: its ring in the widget, its ring in the list and its measures. That is how a drafter marks a change on a drawing.
- **Drawn, not lit.** There are no drop shadows. Every card, button, bar, field, widget, chosen segment and toggle knob is outlined with a hairline.
- **Titles lettered on guidelines.** On Projects and the Gallery, the large title sits on two faint lines, its <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> line and its baseline, with the screen's margins dashed beside it, the way a drafter letters a title block. The first run and Settings have plain titles: the first run's grid starts below its title, and Settings stays calm.
- **The widget on its plan.** Project cards and Gallery tiles put each widget on a sheet of grid with dash-dot centre lines and corner marks at its real outline.
- **Measures that are true.** On the Builder stage, the widget's size (338 × 158 pt), the chosen block's size (96 × 54) and its inset (14) come from the same numbers that lay the screen out.

### The set


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: The set, scrolls sideways" data-n="2 3" style="--tw:529px" markdown="1">

| Screen | Light (whiteprint) | Dark (blueprint) |
|---|---|---|
| **Projects**, with the three start buttons (With blocks, From the Gallery, With Python) |  |  |
| **First run**: no projects yet, and the three ways to start on the grid |  |  |
| **Gallery**: each tile shows the widget on its plan |  |  |
| **Editor with its run card** (calm: no grid) |  |  |
| **Builder stage**: widget on top on the 8 pt grid, measured, with the chosen block (Big number) in red pencil in the widget and in the list |  |  |
| **Settings** (calm: no grid) |  |  |

</div>


As in watercolor, widgets are drawn on a plain background, because a widget's background is the person's own choice. On the blue ground the plain dark-grey widget is the one neutral thing on screen.

### How it is drawn



The diagram above is drawn by the same command as the frames, in the blueprint look.

- **One new file.** `blueprint.py` holds the two prints (tokens) and a `kit.Look` whose `motif()` draws the grid, centre lines, corner marks and guidelines. `screens.py`, `kit.py` and the contrast check are shared with watercolor. Three small changes went into the shared code, and none of them changes a watercolor frame. A look may now set `--ring` (the red pencil) and `--seg` (the chosen segment, so in dark it reads lighter than its track, as in iOS); without them both fall back to the old colours. The diagram's boxes and arrows moved into `kit.py`, so both diagrams share them.
- **No seed.** Nothing is random, and every line sits on the 8 pt grid.
- **Deterministic.** Two full runs gave byte-identical files: `shasum` on all 34 outputs (watercolor and blueprint) matched.
- **Contrast check.** All 545 runs of blueprint text pass 4.5:1 against the real pixels behind them, grid lines included. The lowest are 5.92 in light (the red-pencil measures on white) and 5.92 in dark (the large titles where the grid crosses them). The full list is in `blueprint/contrast.tsv`.
- **Size.** 13 PNGs (12 frames and the diagram) come to about 2.1 MB. The grid compresses far better than the wash.
- **Code-drawn only.** Every line is SVG or CSS written in `blueprint.py` and `screens.py`. Nothing is AI-made, stock or traced, and nothing comes from the inspiration images in `research/inbound/325/`.

### Not in this step

- **Motion.** The plan's live page is for the wash (step 5). If blueprint is chosen, its motion would be the Builder's: dimension lines drawing in when a block is chosen, stopped by Reduce Motion. That is not drawn here.
- **A second palette, and the high-contrast sets at 7:1.**
- **The Swiss editorial set** (step 4, now section 10; risograph print is section 9) and the side-by-side comparison (step 6, now section 12).

## 9. Direction 3: risograph print (T-5858)

Maren, 2026-11-26. Step 3 of the plan, from an Investor's third direction (#325 c7162738460): "two inks overprinting, paper grain, halftone shading"). It shows the same screens as the other sets, light and dark, drawn by the same `screens.py` in the same type: SF Pro for text, Menlo for code (section 6).

### The idea: the app printed on a two-drum press

A risograph prints one ink per drum, and its inks are see-through, so where two inks cross they make a third colour. This direction keeps to that limit: the paper, two inks and what they make together.

- **Ink A is deep teal** (`#0F5E63`; printed on the paper, `#0F5B5E`). It is dark enough to carry words on its own (7.39:1 on the paper), so it sets secondary text, links and the filled buttons. It is nowhere near the system blue, and it is unlike the other two directions (terracotta, Prussian blue).
- **Ink B is fluorescent pink** (`#FF48B0`). It is the loudest ink a riso press is known for, and printed on the paper (`#FB46A6`) it reaches only 3.03:1, so in light mode it never sets a word. It does the shading, the shapes, and the one thing you are changing: the chosen block's ring (3.17:1 on a card, above the 3:1 a control's outline needs).
- **Together they make the main text.** Teal over pink is deep navy (`#0F1A41`, 15.91:1), so the words that matter most are printed in both inks. In light, pink over half-strength teal makes plum (`#853073`), the code's keyword colour.
- **Every printed colour is computed, not picked.** `mix()` in `risograph.py` multiplies the paper by each ink at its tint, as ink on paper mixes. Words, buttons, fields, hairlines, the ring and the dots all come from it. Only three things are not printed: the card stock (a brighter sheet in light, `#FFFDF9`), the widgets (the person's own) and the toggle's white knob.
- **Shading is halftone.** Discs and bands are filled with dots on a 4.5 pt cell, the teal screen at 15° and the pink at 75°, as a printer turns two screens so they don't moiré. Each dot's area is the tone it stands for.
- **Paper grain, kept sparse.** One SVG turbulence filter with a fixed seed (5858) puts flecks of fibre in the motif's windows only. An even grain everywhere cost about a megabyte a frame and sat behind words, so it is kept to the flecks.
- **One deliberate flaw.** The large titles are printed in both inks with the pink drum a hair out of register, so a thin teal and pink edge shows on each letter.
- **Printed, not lit.** There are no drop shadows. The cards and buttons that are shadowed in watercolor (start buttons, project cards, Gallery tiles, the run card, the tab bar, the Select button) have a hard 3 pt offset in a light pink tint instead, like a second printed layer. Widgets, the chosen segment and the toggle knob have a hairline only.
- **The Builder stage is a press proof.** The widget sits on the paper with registration marks in both inks, a hair apart, in two corners, and a colour bar under it: teal, half teal, pink, half pink, both.

### Dark: a screen reading, and how it stands with Studio

- **A riso press can't print this.** Its inks are translucent and vanish on black stock. The dark set is a screen reading of the same two inks, lightened to mint (`#5FD3C6`) and pink (`#FF7CC4`), and mixing as light does (screen) instead of as ink does. Both together give the main text a pale pink-white (`#FFEAF3`).
- **The ground keeps to #291.** The page is near-black (`#121212`) and the cards are neutral dark grey (`#1E1E1E`), as #291 asked of Studio ("plain black or dark grey"). It departs in two small ways, for the Investors to judge. The fields and hairlines carry a little mint (`#1D2B2A`, `#27413E`), and a pink accent is a strong hue on a dark set. The pink is not the violet #291 turned down, but item 9 doesn't approve a new Studio accent either.
- In dark, pink is light enough to carry words (8.42:1), so the code's keywords are pink there instead of plum.

### The set


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: The set, scrolls sideways" data-n="2 3" style="--tw:431px" markdown="1">

| Screen | Light | Dark |
|---|---|---|
| **Projects**, with the three start buttons (With blocks, From the Gallery, With Python) |  |  |
| **First run**: no projects yet, and the three ways to start over a pink and a teal disc |  |  |
| **Gallery**: each tile is a small print, with the widget on it |  |  |
| **Editor with its run card** (calm: flat paper, no dots, no grain) |  |  |
| **Builder stage**: widget on top on the proof, with the chosen block (Big number) ringed in pink in the widget and in the list |  |  |
| **Settings** (calm) |  |  |

</div>


As in the other sets, widgets are drawn on a plain background, because a widget's background is the person's own choice.

### How it is drawn



The diagram above is drawn by the same command as the frames, in the risograph look.

- **One new file.** `risograph.py` holds the paper and inks, `mix()`, the halftone, the grain filter, the proof marks and a `kit.Look` whose `motif()` places them. `screens.py`, `kit.py` and the check are shared. The only shared change in this step went in with the blueprint fixes: widgets, the chosen segment and the toggle knob read `--lift`, `--seg-shadow` and `--knob-shadow`, which fall back to the old shadows, so watercolor is unchanged.
- **Deterministic.** The shapes are fixed numbers, and the grain's seed is fixed. Two full runs gave byte-identical files: `shasum` on all 48 outputs (watercolor, blueprint and risograph) matched.
- **Legibility first.** In the twelve frames, no word but the large titles on Projects and the Gallery sits on dots or grain. I checked this run by run, not by eye: every other run of text in the frames has a flat colour as its worst background. All 484 runs of text in the twelve frames pass 4.5:1 against the real pixels behind them, and so do the diagram's 59. The lowest are 6.31 in light (teal words on a teal-tinted field) and 6.79 in dark (the plain widget's grey caption); the titles on the grain are 7.28 and 8.90. The full list is in `risograph/contrast.tsv`. While drawing, the check caught the first grain: it was dark enough to pull "9:41" and the titles under 4.5:1. The grain is now kept off the status bar and is much fainter. The header's two discs are kept off it too: since Ines's T-5858 review they sit below the status bar, so no dot is behind "9:41" or the signal and battery icons on Projects and the Gallery.
- **Size.** 13 PNGs (12 frames and the diagram) come to about 3.5 MB (3,535,232 bytes). Most of that is the dots; the grain costs about 70 KB on the busiest frames (Projects).
- **Code-drawn only.** Every dot, disc and mark is SVG or CSS written in `risograph.py` and `screens.py`. Nothing is AI-made, stock, scanned or traced, and nothing comes from the inspiration images in `research/inbound/325/`. The ink values are screen colours chosen to suggest riso inks, not matched to any maker's ink, and a real print would differ.

### Not in this step

- **Motion.** If risograph is chosen, its motion could be the press: a new card printing in its two inks, one after the other, stopped by Reduce Motion. That is not drawn here.
- **A second ink pair, and the high-contrast sets at 7:1.** `STOCK` in `risograph.py` holds the paper and inks, so another pair redraws the whole set with one command.
- **The Swiss editorial set** (step 4, now section 10) and the side-by-side comparison (step 6, now section 12).

## 10. Direction 4: Swiss editorial (T-5859)

Maren, 2026-11-26. Step 4 of the plan, from an Investor's fourth direction (#325 c7162738460): "strict grid, large type, one bold accent"). It shows the same screens as the other sets, light and dark, drawn by the same `screens.py` in the same type: SF Pro for text, Menlo for code (section 6).

### The idea: the app set like a well-made magazine page

Here the grid and the type do the work that shadows, tints and pictures do in the other sets.

- **One grid.** Four columns between 16 pt margins, with 10 pt gutters, make 82.75 pt a column on a 393 pt iPhone. Item 9's cards already sit on it: each is two columns and a gutter (175.5 pt). The large titles, "No projects yet", the section heads, the Settings group heads, the two rows above the Builder's block list and the words under each card and Gallery tile start on the 16 pt margin or on a column's edge. The search field, the Gallery's segmented control, the Blocks and Code control in the editor and the Builder, the With blocks button, the first run's three start buttons, the block list, the Settings groups, the run card and the Builder stage span all four columns (361 pt).
- **Where the grid stops.** The tab bar (iOS's own, 18 pt in), the editor's file tabs and code, the Builder's Small and Medium control, and the picture and words inside the first run's Moon card are not on a column. The grid is only across the screen: tops follow the shared layout, not a baseline grid.
- **Large type.** The large titles are 52 pt heavy with tight tracking (−1.9), set flush on the margin, where the other sets use 34 pt. "No projects yet" on the first run is 22 pt semibold (17 pt elsewhere). Every other size is the shared one.
- **One bold accent: signal red.** In light it is `#C8281D` (5.56:1 on white). In dark it is lighter, `#FF6B5B`, and the words on a red button are near-black (`#140404`, 7.16:1). Red marks these things only: a bar one column wide and 10 pt tall over the large title (Projects, the first run and the Gallery); the filled buttons (With blocks on Projects, Run, Get); the words of the other buttons and links (Select, See all, Add a block, Make it mine, Console, Add to Home Screen, Restore purchase, the back button); the icons in the start buttons, the block list and Settings; the chosen block's ring; a switch that is on; the tab you're on; and keywords and numbers in code. Everything else is black, greys and white.
- **No second hue.** "Finished" on the run card is in black (white in dark) with its check mark, not in green. Code is black, with strings in grey (`#595959`, 7.00:1 on white), so it has fewer colours than the other sets. The widgets keep their own colours (the sun stays yellow), because a widget is the person's own.
- **Rules, not shadows.** There are no drop shadows. Project cards, Gallery tiles and the first run's Moon card have no surface of their own: a 3 pt black rule on top, the widget on a flat grey field, and the words under it set flush on the column. Each section head (Recent, Widgets, ready to use, New in the Gallery) has a 2 pt rule above it, and the run card has a 3 pt rule on top of its hairline box.
- **Square for what the app draws, iOS's shapes for what iOS draws.** Cards, start buttons, icon chips, the block list, the Settings groups, the run card and the Builder stage are square. The tab bar, the search field, the segmented controls, the capsule buttons (Select, Run, Get, Make it mine, Console, Add to Home Screen), the switch and the widgets keep their own shapes. The chosen block's ring is square in the list and rounded inside the widget, where it follows the widget's corners.

### Where the motif goes

- **Headers** (Projects, the first run and the Gallery): the red bar over the title, and nothing else. The status bar stays clear.
- **Project cards, Gallery tiles and the Moon card:** the grey field under the black rule.
- **The first run:** the four columns drawn as grey bands, an empty page waiting for projects. They show above, between and below the three start buttons, never behind a word.
- **The Builder stage:** a flat grey field.
- **The editor and Settings stay calm:** no bar and no field. They share the square shapes, the editor's run card has its rule, and Settings has the 52 pt title.

### Dark, and how it stands with #291 and item 9

- **The ground keeps to #291.** The page is near-black (`#101010`), the fields and controls are neutral greys (`#1C1C1C`, `#222222`) and the hairlines `#333333`, as #291 asked of Studio ("plain black or dark grey"). No grey carries a hue.
- **Three departures, for the Investors to judge.**
  - **A red accent in both modes.** Red is not the violet #291 turned down, but item 9 doesn't approve a new accent either.
  - **Things move.** Item 9's layout is kept, but this direction moves some of it a few points to sit on the grid. The titles grow from 34 to 52 pt and move to the 16 pt margin, 8 pt higher. Section heads, group heads and the Builder's rows move to the 16 pt margin. The run card and the Builder stage narrow from 12 pt margins to 16. The words under cards lose their 12 pt inset. "No projects yet" grows to 22 pt and moves 6 pt lower.
  - **Cards lose their surface, and the app's own shapes lose their rounded corners.** That is the largest change from item 9's A, and the one most likely to read as "not iOS". The controls iOS draws keep their shapes for that reason.

### The set


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: The set, scrolls sideways" data-n="2 3" style="--tw:431px" markdown="1">

| Screen | Light | Dark |
|---|---|---|
| **Projects**, with the three start buttons (With blocks, From the Gallery, With Python) |  |  |
| **First run**: no projects yet, and the three ways to start over the four columns |  |  |
| **Gallery**: each tile is a grey field under a black rule, with the widget on it |  |  |
| **Editor with its run card** (calm) |  |  |
| **Builder stage**: widget on top on a grey field, with the chosen block (Big number) ringed in red in the widget and in the list |  |  |
| **Settings** (calm) |  |  |

</div>


### How it is drawn



The diagram above is drawn by the same command as the frames, in the Swiss look. It shows the grid at real size: the four columns, the margins and gutters measured, with the title's red bar and two cards set on it.

- **One new file.** `swiss.py` holds the grid, the two sets of tokens, a CSS block and a `kit.Look` whose `motif()` draws the bar, the fields and the first run's columns.
- **One shared change.** In `screens.py`, fourteen kinds of element (cards and the words under them, start buttons, chips, section heads, the run card, the Builder stage and so on, listed in its comments) carry class names, and a switch reads `--switch` (falling back to `--ok`). Only `swiss.py` has rules for them. The 48 earlier outputs (watercolor, blueprint and risograph PNGs and their `contrast.tsv`) were byte-identical before and after the change, checked with `shasum`.
- **No seed.** Nothing is random; every shape is placed by number.
- **Deterministic.** Two full runs gave byte-identical files: `shasum` on all 62 outputs (all four directions) matched.
- **Contrast check.** All 480 runs of text in the twelve frames pass 4.5:1 against the real pixels behind them, and so do the diagram's 55. The lowest are 4.92 in light and 5.69 in dark, both red words on a grey control (the tab you're on, Make it mine, Console, Add to Home Screen). The large titles sit on the plain ground (18.88 in light, 16.98 in dark). No word sits on the red bar, a grey field or the first run's columns: every run's worst background is a flat ground, control, button or widget colour. The full list is in `swiss/contrast.tsv`. While drawing, the check caught two faults, both in the diagram: the measures' labels sat on their own tick lines, and the sample title's box touched its red bar (3.40:1). Both were moved apart.
- **Size.** 13 PNGs (12 frames and the diagram) come to about 1.7 MB, the smallest of the four sets: flat colour compresses well.
- **Code-drawn only.** Every bar, rule and field is HTML or CSS written in `swiss.py` and `screens.py`. Nothing is AI-made, stock or traced, and nothing comes from the inspiration images in `research/inbound/325/`.

### Not in this step

- **Motion.** If Swiss is chosen, its motion could be the red bar moving to the next title on a tab change, stopped by Reduce Motion. That is not drawn here.
- **A second accent, and the high-contrast sets at 7:1.** `INKS` in `swiss.py` holds both modes, so another accent redraws the whole set with one command. The light red is 5.56:1 on white and 4.92:1 on the grey controls, so a 7:1 set would need a darker red.
- **The side-by-side comparison** (step 6, now section 12).

## 11. The wash, live (T-5860)

Maren, 2026-11-26. Step 5 of the plan: an Investor asked for stills plus one live page, so the wash can be judged moving on a phone (#325 c7162738460)). It is a proposal, like the rest of this page.

### What it is

- **One static page:** `documents/new-look/index.html` and its script `wash.js`. Together they are 18.6 KB, or 7.3 KB gzipped. There is no outside library, no network fetch, no build step, no image and no font file. The page sets its own Content-Security-Policy, which lets it load only its own script, and it has no inline script.
- **The same wash as the stills.** `wash.js` is `wash.py` in JavaScript: the same seed (5856), the same <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> (mulberry32), and the same pools, layers, crops and rounding, in the same order. It also has the same three palettes, light and dark. The page shows two windows: the Projects header (with the large title on it, as in the stills) and the field behind the first run. Each is the same crop as its still.
- **Slow and subtle.** Each of the 12 pools of pigment sways, turns and swells on its own waves of 50 to 90 seconds. At the widest a pool sways over 28 to 52 wash units (about 20 to 40 points on the phone), turns through 1.4° to 3.4° and swells by 2.4% to 5%. It never moves faster than about 3 points a second. The cycles come from a second seed, so the motion is the same on every phone. Every cycle starts at zero, so the first frame is the still.
- **Pause** stops the clock and keeps the frame, and the button then reads Play.
- **Reduce Motion** makes the page draw the first frame once and never start the clock. The Pause button is turned off, and the page says "Reduce Motion is on, so the wash stays still." If the setting changes while the page is open, the page follows it.
- **Light and dark** follow the phone's setting. A palette control (Warm, Cool, Muted) redraws the wash in any of the three palettes.
- **Battery.** The page draws at most 20 frames a second, at up to 2x (the stills' own scale). It skips a window that is off screen and draws nothing while the tab is hidden.
- **Legibility first.** No word sits on the wash except the large title, as in the stills. Section 5's contrast check, run on the page itself, measures every run of text against the real pixels behind it in all three palettes (warm, cool, muted), light and dark, at the first frame and at a moving one: twelve states, and all pass (below). Until T-5861 it measured warm only.

### Where the Investors can open it

**The page isn't on the site yet, and making it reachable needs a site change I didn't make.** The site's Documents section (`tools/site/documents.py`) publishes three things: `documents/*.md` at the top level, the hunt's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> notes and `documents/restructuring/`. It copies the restructuring folder's HTML mock-ups with every `` cut out. No rule reads `documents/new-look/`, and the restructuring rule would remove the script that draws the wash. The task said not to change a site tool, so I didn't.

- **Its address once published:** **https://its-the-company.github.io/documents/new-look/**. This needs one rule that copies `index.html` and `wash.js` as they are, scripts kept. The site's own policy (`script-src 'self'`) allows the page as it is, because it loads only its own file.
- **Until then:** from a copy of the repository, open `documents/new-look/index.html` in Safari. With the window narrowed (or Develop > Enter Responsive Design Mode at 390 wide), it shows as it would on an iPhone.

### On an iPhone-sized screen (390 pt)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: On an iPhone-sized screen (390 pt), scrolls sideways" data-n="1 2" style="--tw:132px" markdown="1">

| Light, moving | Dark, moving |
|---|---|
|  |  |

</div>


**Moving.** These are two frames 8 seconds apart in light. The drift is slow, so look at the edges of the ochre pool behind the title and the green pool in the field.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: On an iPhone-sized screen (390 pt), scrolls sideways" data-n="1 2" style="--tw:132px" markdown="1">

| A frame | 8 seconds later |
|---|---|
|  |  |

</div>


**Reduce Motion.** These are two frames 8 seconds apart with Reduce Motion on. They are identical, byte for byte, and both are the still's first frame.


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: On an iPhone-sized screen (390 pt), scrolls sideways" data-n="1 2" style="--tw:132px" markdown="1">

| A frame | 8 seconds later |
|---|---|
|  |  |

</div>


**First frame against the still.** On the left is the Projects header's wash drawn as the stills draw it (SVG, by `wash.window()`). On the right is the page's header canvas with the title hidden, both 393 pt wide at 2x.


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: On an iPhone-sized screen (390 pt), scrolls sideways" data-n="1 2" style="--tw:153px" markdown="1">

| The still's wash (SVG) | The page's first frame (canvas) |
|---|---|
|  |  |

</div>


### How it draws



The diagram above is drawn in code by `live.py`, in the watercolor look.

### How it was checked

```
python3 pywidget/docs/design/new-look/live.py     # about 90 seconds; exits 1 on any failure
```

`live.py` serves `documents/new-look/` on 127.0.0.1, so nothing leaves this Mac and the page runs under its own policy as the site would serve it. It drives headless Chromium (Playwright, already on this Mac; nothing was installed) at 390 × 844 pt, 2x, as a phone with touch. It writes `live/check.txt`, which on 2026-11-26 (the T-5861 run, with all three palettes measured) read:

```
live.py: the live wash page, checked in headless Chromium (Playwright)
ok   port: wash.js draws the same 12 pools, 336 layers, 107520 points as wash.py, point for point (12 pools equal)
ok   port: the crops match wash.crop() (largest difference 0.0e+00 wash units)
ok   port: the three palettes match watercolor.py, light and dark (14 tokens each)
ok   page: no script error and no CSP refusal in the console
ok   frame 0: the page's header against the still's (SVG) at 786 x 500 px: mean difference 0.18 of 255, 2.43% of pixels off by more than 2 (edge antialiasing), largest 15
ok   moving, light: 165 frames drawn in 8 s (clock 9.17 s); 10.3% of pixels changed, mean 1.56 of 255
ok   paused, light: 0 frames drawn in 8 s, largest pixel change 0, button reads 'Play'
ok   moving, dark: 166 frames drawn in 8 s (clock 9.52 s); 9.9% of pixels changed, mean 1.15 of 255
ok   paused, dark: 0 frames drawn in 8 s, largest pixel change 0, button reads 'Play'
ok   Reduce Motion, light: 0 frames drawn in 8 s after the first, largest pixel change 0, Pause disabled, status 'Reduce Motion is on, so the wash stays still.'
ok   Reduce Motion, dark: 0 frames drawn in 8 s after the first, largest pixel change 0, Pause disabled, status 'Reduce Motion is on, so the wash stays still.'
ok   contrast: 336 runs of text over twelve page states (three palettes, light and dark, first frame and moving), lowest 5.20:1 ('Pause', page-warm-light-frame0); lowest by palette warm 5.20, cool 5.32, muted 5.24
ok   diagram: 43 runs of text pass 4.5:1
```

- **What a browser on this Mac can't show:** a real iPhone. Safari on iOS hasn't run the page, so its frame rate and battery cost on a phone are not measured. The script uses only standard canvas and media queries that Safari supports. The first look on a real phone is a good next step.
- **Frame counts depend on how busy the Mac is.** In the first run (T-5860) the load average was about 160, and headless Chromium drew 63 to 98 frames in 8 seconds where the page asks for 160. In the T-5861 run above, with the load near 20 at its start, it drew 165 and 166. The clock moves at most 0.1 s a frame, so on a slow machine the wash moves more slowly but never jumps. The check asks only that it moves. The screenshots in this section are from the T-5861 run.
- **Why frame 0 is not byte-identical to the still.** Canvas and SVG smooth the edges of 336 overlapping layers a little differently. The mean difference is a fifth of one level in 255, and no pixel is off by more than 15 levels. Side by side, the two read the same (above).

### Not in this step

- **Publishing it on the site.** This needs a rule in `tools/site/documents.py` that copies the two files with the script kept. It should be its own board line, for whoever owns that file.
- **Motion in the app.** If watercolor is chosen, the app's wash would move as this page does, behind headers and cards only, stopped by Reduce Motion. Home Screen widgets would not move.
- **Motion for the other three directions.** Each direction's "Not in this step" says what its motion could be. None is drawn.

## 12. The four side by side (T-5861)

Maren, 2026-11-26. Step 6 of the plan: one card for the Investors with every set side by side, light and dark, the live page, what each direction costs to build and a recommendation. The card's words are in [`card.md`](card.html); the Operator posts it on #325, and nothing here is posted by me. Like the rest of this page, it proposes and changes nothing in the app.



The sheet above is drawn in code by `compare.py`. It sets the eight Projects frames that `draw.py` wrote at half size, each direction's light frame beside its dark one, with the direction's name and idea. It draws no new pixels of the frames themselves.

```
python3 pywidget/docs/design/new-look/compare.py     # compare/sheet.png and compare/contrast.tsv; exits 1 under 4.5:1
```

- **Contrast.** The sheet's own 21 runs of text pass kit's check: the lowest is 7.64:1 (the grey lines on the sheet's ground). The list is in `compare/contrast.tsv`.
- **Deterministic.** Two runs gave the same `sheet.png`, checked with `shasum`.
- **Size.** 1,156,733 bytes (1920 × 2532 px). Most of it is the two watercolor frames and the risograph dots.

### The comparison


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: The comparison, scrolls sideways" style="--tw:1526px" markdown="1">

| Direction | The idea | Where it departs from today's look | Cost, first guess (engineer-weeks) | Likely release (today Mon 2027-07-12) |
|---|---|---|---|---|
| **1. Watercolor, warm** (sections 1 to 7) | A wash of pigment from one seed behind headers, cards, Gallery tiles, the first run and the Builder stage; the editor and Settings calm | Colour lives in the wash; a terracotta accent unlike iOS's standard blue | 2.5 (1.5 to 4), with the Builder as a drawing board (section 4) | about Thu 2027-07-29 |
| ... and the wash moving (section 11) | The pools drift slowly, at most about 3 pt a second; Reduce Motion stops it | Motion behind headers and cards, nowhere else | +1 (0.5 to 2) | about Thu 2027-08-05 |
| **2. Blueprint** (section 8) | The app as the plan of what you build: whiteprint in light, blueprint in dark, grid, hairlines, red pencil on the chosen block, true measures | A blue dark ground where #291 asked Studio for a neutral one; no shadows | 2 (1.25 to 3.5) | about Mon 2027-07-26 |
| **3. Risograph print** (section 9) | Teal and fluorescent pink overprinting, halftone, sparse grain, titles a hair out of register | A loud pink accent; printed offsets in place of shadows | 2.5 (1.5 to 4) | about Thu 2027-07-29 |
| **4. Swiss editorial** (section 10) | Four-column grid, 52 pt titles, one red accent, rules not shadows | The only set that moves things (a few points, onto the grid); square cards; the most likely to read as "not iOS" | 1.5 (1 to 2.5) | about Thu 2027-07-22 |

</div>


### How the costs were sized, and how far to trust them

- **They are weeks of one engineer's work: my first guesses.** Idris, who would build the chosen direction, has not checked them. The next plan (tokens, then screens) sizes the chosen one properly, step by step, and its figure replaces these.
- **The unit is the plan's.** A week is one engineer's week of work, as [`documents/restructuring/05-timeline.md`](../restructuring/05-timeline.html) and [`ops/plans/pywidget/plan.md`](pywidget-plan.html) count it. The look's work sits on the plan's path for the interface, so each week of it is likely to move the release (Monday, July 12, 2027) by up to about a week: to about July 22 (Swiss), July 26 (blueprint), July 29 (risograph, or a still watercolor) or August 5 (moving watercolor). The dates add the likely figure to today's likely release in `ops/milestones.json` (Mon 2027-07-12); I did not run the release scripts, and the ranges would move the release by their own low and high ends.
- **What every figure covers.** One set of colours and type for light and dark, put into the app, and the motif drawn natively in SwiftUI where this page draws it. The screens themselves are already in the plan (phase C builds the tab shell and the Gallery on whichever look is approved), so only the look's own work is counted. Any overlap with phase C that would absorb part of it is not netted off.
- **What drives each figure.**
  - *Watercolor:* porting the seeded wash (12 pools, 336 layers, 107,520 points) to Swift, drawn once per size and kept, placed in five kinds of window; and the Builder's drawing board (grid, dashed outlines, dimension lines from the layout's own numbers). The motion is apart because it is the least known: a redraw on every frame, a frame cap, stopping off screen, Reduce Motion, and the battery cost, which nobody has measured on an iPhone (section 11).
  - *Blueprint:* the grid, centre lines, corner marks and title guidelines; hairline outlines in place of every shadow; dimension lines in the Builder.
  - *Risograph:* halftone screens and grain, which need a shader or images drawn once; the two-ink titles out of register, which mean a custom title; the colour mixing.
  - *Swiss:* the least drawing, but a 52 pt title is not iOS's own large title, so it needs a custom header that still collapses as the system's does, and the square shapes and moved spacing touch every screen.
- **Not counted in any:** the high-contrast sets at 7:1, iPad layouts, the icon and the store page, and motion for blueprint, risograph or Swiss (each set's "Not in this step" says what it could be).

### The live page, and the choice it needs

The live wash page (section 11) is not on the site, because `tools/site/documents.py` has no rule for `documents/new-look/` and strips scripts from mock-ups. The card offers the Investors the choice: reply "do it" and the company lets this one page run its script on the site (only the site's own pages, such as Home and the ideas library, run scripts today), so the page opens at https://its-the-company.github.io/documents/new-look/; or open `documents/new-look/index.html` from the repository in Safari on a Mac. The card shows the stills `live/live-light-390.png` and `live/live-dark-390.png` meanwhile.

### The recommendation

**Watercolor in the warm palette, with the Builder drawn as a measured drawing board (section 4); the wash still first, the drift added after it has run on a real iPhone.**

- It sheds the stock-app feel most: the terracotta accent is far from the system blue, and the wash gives each screen a personality the other three get from rules or ink.
- It keeps legibility first. Words sit on the wash only in the large titles, and every run of text passes 4.5:1 against the pixels behind it in all three palettes (sections 5 and 11).
- It answers both of an Investor's ideas in one look: the wash where people browse, the blueprint language where they build.
- Its risk is the motion's cost on a phone, which is unmeasured, so the drift waits for that measure. If the Investors want the cheapest change, Swiss is about a week less, at the price of looking least like an iPhone app.
{% endraw %}

</div>
