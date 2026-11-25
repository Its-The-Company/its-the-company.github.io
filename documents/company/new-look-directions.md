---
layout: "default"
title: "New look for the app: four directions to mock up (plan)"
section: "documents"
description: "Where the motif lives: headers, Gallery tiles, project cards and first run; the editor and Settings stay calm. Subtle, or in matching colours, wherever that reads better: legibility first. Widget backgrounds are the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/new-look-directions.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 35 · Wed Nov 25</span><span><code>ops/plans/new-look-directions.md</code></span></div><h1>New look for the app: four directions to mock up (plan)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Operator, 2026-11-25 7:4x AM ET. A plan for mockups, not an approval: Paper (light) and Studio (dark), `creative/approved.md` item 9 (#291), stay in force until the Investors approve a direction (gate 2). Earlier brief: [`pywidget/docs/design/new-look-brief.md`](../pywidget/new-look-brief.html) (T-5602, #348).

## The ask
an Investor, #325 c7162542094 (7:33 AM ET 11-25, plan mode): a few mockups of alternative visual directions before the Investors commit to one. The look should shed the "vibe-coded app" feel and have a distinct personality: a chosen palette, consistent type and visual elements, and subtle motion. Two ideas: (1) a watercolor or gradient motif, with subtle motion, drawn in deterministic code and tried in several palettes; (2) a blueprint motif with a fresh take. The mockups show screens the final app will really have. The three inspiration images (`research/inbound/325/20261125T123331-*`) set the mood only: nothing is copied from them or used as an asset.

## What the answers decided (c7162738460, 7:42 AM ET)
- **Where the motif lives:** headers, Gallery tiles, project cards and first run; the editor and Settings stay calm. Subtle, or in matching colours, wherever that reads better: legibility first. Widget backgrounds are the person's own choice, so a widget frame is optional.
- **Type:** one family in both modes, SF Pro, with SF Mono for code; character comes from weight and size. (Today light uses New York and dark SF Pro Rounded; that split goes.)
- **Blueprint:** both readings: a full-app blueprint direction, and blueprint as the Builder's editing language (grid, dimension lines, measured blocks) drawn inside the watercolor direction.
- **Directions:** four: watercolor, blueprint, risograph print (two inks overprinting, paper grain, halftone shading), and Swiss editorial (strict grid, large type, one bold accent). More ideas welcome later.
- **Motion:** stills of every screen in light and dark, plus one static page that draws the watercolor wash live, so it can be judged moving on a phone.

## The frames (each direction)
Five screens, light and dark: Projects (home, with the three start buttons), the Gallery, the editor with its run card, the Builder stage (widget on top, chosen block ringed), and Settings. Watercolor also shows Projects in three palettes (warm, cool, muted), light and dark, before its full set. Real words from the app (the approved voice, item 8); no placeholder text.

## Steps (one board line each, Maren unless named)
1. Watercolor: the shared drawing code (deterministic: one seed, one wash), the three-palette Projects frames, then the full set in the strongest palette, plus the Builder drawn in the blueprint editing language.
2. Blueprint: the full-app set.
3. Risograph print: the full set.
4. Swiss editorial: the full set.
5. The live wash page: one static page that draws the watercolor wash in the browser from the same seed and palettes, with a pause switch and Reduce Motion honoured. Nothing on Home.
6. The comparison: one card on #325 with every set side by side, what each costs to build, and a recommendation. Its answer becomes the next plan (tokens, then screens).

## Rules for the work
- Code-drawn only (Python, as `pywidget/docs/design/mockups/draw.py` does): no AI-generated images, no stock, no traced shapes, nothing taken from the inspiration images.
- Fonts: SF Pro and SF Mono, used to mock up an Apple-platform app, as Apple's font licence allows.
- Contrast: text 4.5:1 on whatever sits behind it (7:1 in the high-contrast sets); the wash sits behind a calm surface, never directly behind body text or code.
- Motion in the app only: Home Screen widgets don't animate continuously, and Reduce Motion stops it.

## Risks
- Four directions at once is a lot of drawing: the steps run one after another, and the watercolor set (the Investors' first idea) comes first, so it can be posted on its own if the rest run long.
- The Builder isn't built yet; its frame follows the approved stage layout (#291) and the one-way <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (11-24).
- App work keeps its place: these lines take P1 like any Investor request and don't displace the layout work Evan put first (8:33 PM ET 11-24).

## Left out
Building any of it in the app; the icon, the name and the store page; new widget premade looks. Each comes after a direction is approved.
{% endraw %}

</div>
