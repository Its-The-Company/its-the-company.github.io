---
layout: "default"
title: "pywidget app icon: three directions (v1)"
section: "documents"
description: "v1, 2026-10-26 (Maren, T-0099): redrawn in the approved appearances (#60, creative/approved.md item 2): every light icon in A Paper, every dark icon in B Studio, tinted in grey. Prompt and Trace no longer use the Studio\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/icon-readme.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/design/icon/README.md</code></span></div><h1>pywidget app icon: three directions (v1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**v1, 2026-10-26 (Maren, T-0099):** redrawn in the approved appearances (#60, creative/approved.md item 2): every light icon in A Paper, every dark icon in B Studio, tinted in grey. Prompt and Trace no longer use the Studio gradient in light. The 1024 px PNGs and the sheet now go to the design-previews branch (`draw_icons.py OUTDIR`; links in pywidget/docs/proposals/PROPOSAL-003-icon-and-screenshots.md); this folder keeps the SVG masters, the 60 px PNGs and qa.json. v1 checks: 9 renders, 0 faults; contrast lowest 6.77 light, 5.68 dark, 7.84 tinted; every 1024 PNG is RGB with no alpha. The proposal is the current text; the v0 notes below still <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> for meaning and risks, but their colour descriptions and file list are v0's.

Maren, 2026-10-25, 20:06 to 20:12 ET by `date`. Status: **proposal** (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). Nothing here is approved or shipped. Name-independent: no letters or words, so any name the Investors pick can sit under any of them.

Source: `draw_icons.py` (this folder). One function per direction draws the SVG geometry; the 1024 px and 60 px PNGs for light, dark and tinted all come from that one SVG, rasterised by headless Chromium. Colours come from `../tokens.json` (C13 v0). No image model, no stock art, no fonts, no traced shapes; the script asserts no `<text>` and no `<image>` in any SVG (Commandment 9).

```
python3 pywidget/docs/design/icon/draw_icons.py   # writes svg/, png/, sheet.png, qa.json
```


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:640px" markdown="1">

| File | What |
|---|---|
| `svg/{indent,prompt,trace}-{light,dark,tinted}.svg` | Vector masters, 1024 viewBox, full bleed (iOS applies the mask) |
| `png/...-1024.png`, `png/...-60.png` | 18 renders, square, unmasked |
| `sheet.png` | All three, masked, at 180 and 60 px; tinted also shown under two sample tints |
| `qa.json` | <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span>, smallest feature at 60 px, contrast per pair |

</div>


## Checks (qa.json, all 9 renders: 0 faults)

- Safe area: every mark corner sits at least 96 px inside the 1024 mask (rounded-rect stand-in, radius 229). Outside: 0.
- Smallest feature at 60 px: 3.4 px (Indent bars), 3.98 px (Prompt strokes), 3.52 px (Trace stroke). Floor 2 px.
- Contrast, mark against background, floor 3:1 (non-text): lowest 5.18 (white or the gradient's coral end, Prompt and Trace light). Gradients are checked at both stops.
- Weight: 1.1 MB for the 29 outputs (9 SVG, 18 PNG, sheet, qa.json). The gradient 1024s are the heavy ones (Prompt light 398 KB).

## Direction 1: Indent (from palette A, Paper)

Four lines of code drawn as bars: a line ending in a colon, an indented line, a deeper line that is a live toggle, a dedent. Python's structure is its indentation, and the colon opens a block; nobody else uses that shape as a mark. The innermost line being a switch says the thing we lead with (L7 section 6, item 1): your Python, as a control on the Home Screen.

- Light: ink bars on paper, ink-blue toggle. Dark: paper bars on near-black, the dark accent. Tinted: grey bars, the toggle brightest.
- At 60 px the colon merges into a nub; the stepped silhouette and the toggle still read.
- Risk: stepped bars alone are a "text alignment" glyph; the colon and the toggle are what make it ours. Keep both.

## Direction 2: Prompt (from palette B, Studio)

Python's interactive prompt, three open chevrons, then a block cursor waiting. Every Python user knows `>>>`; it is the interpreter's default prompt string, not a mark. Set on the Studio violet-to-coral gradient (light) or the Studio night surface with gradient chevrons (dark).

- The cursor is a block, not a bar, and sits one space away. My first draw used a thin bar close to the chevrons; it read as a media "skip to end" button, so I changed it.
- Strongest at 60 px of the three: the simplest silhouette.
- Risk: closest to the generic "terminal" family. It is not `>_` or `$`, but a person should compare it with the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> before C51 (see below).

## Direction 3: Trace (from palette B, Studio)

One parametric curve, x = cos 3t, y = sin 2t, and a dot for "now" on it. The icon is itself a plot drawn by a script, which is the product in one picture: your code draws what the widget shows.

- The only direction that is purely mathematical, and the one that photographs best.
- Weakest meaning at a glance: it does not say Python or widget. At 60 px the crossings close up slightly but the figure holds.
- Risk: closed Lissajous figures read as an orbit or atom. I also drew partial traces (the pen mid-stroke); they read as letters (e, a, Ø), so I dropped them.

## Recommendation

**Indent**, with Prompt as the fallback. Indent is the only one that says both halves of the product (Python code, a widget you can tap), and it pairs with the recommended design direction A. Prompt is the clearest at 60 px but only says "Python". Trace is the prettiest and says the least.

## What I kept out, and what is not checked

- No Python logo, no two interlocking shapes, no blue-and-yellow pair, no snake, no PSF mark (trademark, C6).
- No 2×2 grid of coloured tiles, no planet, no `>_` or `$`, no curly braces as the hero, no letter monogram: the shapes the rivals in L7 are most likely to use.
- **Not checked:** I have not seen the rivals' actual icons. L7 read the store through the Lookup API only, and apps.apple.com pages are refused by host (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>); I did not fetch any artwork. Before C51, a person should put the three beside the 18 L7 apps' icons (Pythonista 3, Pyto, Scriptable, a-Shell, Widgy, Widgetsmith, Juno, PythonIDE, Scripting, ScriptWidget, Color Widgets, Carnets and the rest) and say whether any is a look-alike.
- iOS 26 layered icons (Icon Composer, Liquid Glass): not drawn. Each direction splits into two layers cleanly (Indent: bars and toggle; Prompt: chevrons and cursor; Trace: curve and dot); do that after a pick.
- The mask is a rounded rectangle, not Apple's continuous-corner shape; Xcode applies the real one.
- Dark is drawn with its own background; Apple also accepts a transparent dark icon over its own gradient. Either can be generated from the same function.

## Open

- Investor pick (C51), after Ines reviews; she posts it to ops/questions.md.
- Shelf comparison by a person (above).
- Idris: an asset catalog with the three appearances from these PNGs, checked on the Simulator Home Screen in light, dark and tinted.
{% endraw %}

</div>
