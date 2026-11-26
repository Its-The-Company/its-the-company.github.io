---
layout: "default"
title: "New look, direction 1: watercolor (T-5856)"
section: "documents"
description: "The wash is the same in every palette, and only the pigments change. Grounds stay near-white and near-black, so the wash carries the colour; the dark grounds are neutral, as #291 asked of Studio."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/new-look-readme.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/design/new-look/README.md</code></span></div><h1>New look, direction 1: watercolor (T-5856)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-26. **Mockups for the Investors to choose from, not an approval and not a change to the app.** Paper (light) and Studio (dark), `creative/approved.md` item 9 (#291), stay the app's look until the Investors approve a direction.

- **Asked by:** an Investor on #325 (c7162542094)), with his answers in c7162738460). The plan is [`ops/plans/new-look-directions.md`](../company/new-look-directions.html), and this page is its step 1.
- **What it shows:** a watercolor wash drawn in code from one seed, Projects in three palettes, the full set in the strongest palette (warm), light and dark, and the Builder drawn in the blueprint editing language.
- **Where the wash sits:** in headers, project cards, Gallery tiles, the first run and the Builder stage. The editor and Settings stay calm. Text never sits on the wash except the large titles, and every run of text is measured against the pixels behind it (section 5).
- **Layout:** as item 9 has it. A is the base, with C's Builder stage (widget on top, chosen block ringed), C's plain-words run card and the three start buttons. Only the look changes; nothing moves.
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

- **Warm has the most personality in both modes.** Its terracotta accent looks like nothing iOS ships with, its wash still shows on the dark ground, and it carries on Paper's paper-and-ink feel without copying it.
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
```

It needs Playwright with Chromium, as `../mockups/draw.py` does, and takes about 15 seconds.

- **Deterministic.** One seed (`SEED = 5856` in `wash.py`, mulberry32) draws one wash. Every crop of it comes from the seed and the window's name, and Chromium draws with the GPU off and an sRGB profile. Two runs give byte-identical PNGs; this was checked with `shasum` on all 20 output files (19 PNGs and `contrast.tsv`).
- **Contrast check.** Each frame is drawn twice: once for the PNG, and once with all text made transparent. Every run of text, 783 in all, is then measured against every pixel behind its box at 2x. The command prints the worst background for each text colour in each frame and exits 1 if any falls under 4.5:1 or any text is translucent. The full list is in `watercolor/contrast.tsv`, and every pair passes now. While I was drawing, the check caught four real faults: "Select" sitting on pigment, now in a calm capsule as iOS 26 bar buttons are; a ring crowding "Home"; "No projects yet" on the wash; and the status bar on a dark ochre pool.
- **Size.** 19 PNGs (18 frames at 786 × 1704, plus the diagram) come to about 4.2 MB, around 300 KB a frame.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 5. How it is drawn, and how to redraw it, scrolls sideways" style="--tw:755px" markdown="1">

| File | What it does | Reused by later directions |
|---|---|---|
| `kit.py` | page and fonts, icons drawn as SVG paths, `Look` (tokens plus a `motif()` hook), `render()` and the contrast check | yes, as it is |
| `screens.py` | Projects, the first run, the Gallery, the editor with its run card, the Builder (and its blueprint stage) and Settings, for any `Look` | yes, as it is |
| `wash.py` | the seeded wash: pools of pigment, layers deformed by midpoint displacement, crops ("windows") | watercolor, and step 5's live page, which can run the same numbers in JavaScript |
| `watercolor.py` | the three palettes, light and dark, and where the wash goes | watercolor only |
| `draw.py` | the frame list, the diagram and the command | add each new direction's frames here |

</div>


**Adding a direction** (blueprint, risograph, Swiss): write `blueprint.py` with a `kit.Look` subclass that holds its tokens and a `motif()` returning that direction's backdrop (grid, halftone, nothing), then add its frames to `draw.py`. The screens, words, widgets, check and determinism come along unchanged.

## 6. What the rules held, and one font constraint

- **Code-drawn only.** Every shape is HTML, CSS or SVG written in these files and drawn by headless Chromium. There are no AI-generated images, no stock, nothing traced, and nothing taken from the inspiration images in `research/inbound/325/`, which set the mood only.
- **SF Mono can't be used here, so code is set in Menlo.** The SF Mono on this Mac carries its own licence (the font's name table, ID 13). It says it may be used "solely in conjunction with Apple-branded applications" and not "to create, develop, display or otherwise distribute any content, documentation, artwork". Drawing mockups with it would break that, so code is set in Menlo, as the v0 mockups already are (`log/assets.md`, 2026-10-25).
  - In the app, SF Mono comes through the iOS system font API, which is allowed, so the shipped editor would use SF Mono.
  - Apple offers fonts separately on its developer site, and that download carries its own licence. I haven't read it. Taking it would mean accepting an agreement, so whether to do that is the Investors' decision.
- **Words.** The words are the app's own, taken from the #291 drawings (`documents/restructuring/04-mockups/a` and `c`) and the Settings and run-screen drawings in `../ide/`. "No projects yet" on the first run is new, written to the approved voice (item 8). All data is sample data.

## 7. Not in this step

- **Motion.** These are stills. The live wash comes in step 5: one static page that draws this wash from the same seed, with a pause switch, and honours Reduce Motion.
- **High-contrast sets at 7:1.** The plan asks for 7:1 there. The check takes a minimum (`kit.report(..., minimum=7)`), but no high-contrast palettes are drawn yet.
- **iPad, the Activity screen, the Pro screen, the icon and the store page.**
- **The other directions.** Blueprint, risograph and Swiss editorial are steps 2 to 4.
{% endraw %}

</div>
