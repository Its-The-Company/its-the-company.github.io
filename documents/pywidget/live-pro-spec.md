---
layout: "default"
title: "Live with Pro: the gallery chip and the free user&#x27;s widget (T-2374 a)"
section: "documents"
description: "Those whose widget refreshes from the internet in the background (the T-0793 path, which runs only while entitled). Of the 12, that is GitHub repository today. The drawing reads LIVE in the script; the build reads its\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/live-pro-spec.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/design/live-pro/spec.md</code></span></div><h1>Live with Pro: the gallery chip and the free user's widget (T-2374 a)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-04. Status: **build spec for layout; every string DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>** (to the Investors on Day 41 with the store page). Source: plan.md <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 2026-11-04 10:03 PM ET, item 6, read as 6a: every premade is free; a widget that keeps itself fresh from the internet in the background is Pro. Look: inside creative/approved.md item 2 (A Paper light, B Studio dark, their tokens); the chip reuses the Pro chip's anatomy and colour pair. No new identity element, so no separate C51 preview beyond the words.

Files (this folder): `draw_live_pro.py` (draws both sheets, writes `qa.json`; imports `../ide/draw_gallery.py`, whose previews are the real premade trees drawn by `../widgets/render.py`; headless Chromium, no image model), `A-livepro-phone.png` (light, 205,118 B), `B-livepro-phone.png` (dark, 249,388 B). QA: 0 clipped, 0 truncated, 0 text overlaps, 0 under 11 pt, 0 contrast fails on both sheets; the widget's Pro word, `text.secondary` on `bg.surface`, is 7.08:1 light and 8.03:1 dark (computed in the script, floor 4.5:1). The script refuses a string with a price, currency, "buy", "unlock", "trial", "subscribe", "upgrade", "offer" or "get pro".

## 1. Which premades carry it

Those whose widget refreshes from the internet in the background (the T-0793 path, which runs only while entitled). Of the 12, that is **GitHub repository** today. The drawing reads `LIVE` in the script; the build reads its own flag (T-2372), never this file. Open for Ines: Storage and the 60-minute premade also say "background refresh" in premade.py's data column, but from the phone, not the internet. If background refresh of local data is also Pro, they get the chip too; the chair note says "from the internet", so they are drawn without it.

## 2. Gallery tile (iPhone 390 pt, iPad the same tile)

- 6a has no Pro premade, so the tier chips go: no "Free" chip on every tile (a chip on all 12 says nothing). One section, "Premades" (`sec.all`, already in s5.9's table).
- A tile in `LIVE` carries one chip after the name: refresh glyph (two-stroke circular arrow, 11 pt) + **"Live with Pro"**, `key.text` on `key.bgAlt`, the Pro chip's pair. Once Pro is active it reads **"Live"**. Nothing else on the tile changes: caption "Live preview on your data.", "Open source" stays (the premade is free; T-0901).
- The offer lives in the app: the detail sheet's Pro row (s5.9) and the Pro screen. The chip itself is not a button.
- VoiceOver: "{name}, {family} widget. Live with Pro. Live preview."

## 3. A free user's placed widget (Home Screen and Lock Screen)

- The widget runs and shows its own last render: the premade is free, and it updates when the app opens or a Shortcut runs. Its age line ("as of 1:52 PM" in the tree; s10c's "Updated" words when that lands) already says how old the picture is, and the stale clock appears in the corner slot after `stale_after`, as on any widget.
- **The Pro state is one word.** "Pro", caption 11 pt semibold, `text.secondary`, right-aligned in an 18 pt strip under the content: the widget's content area gives up 18 pt of height, so the word never sits over data and never takes the corner slot. No glyph, no capsule (a capsule reads as a button), no verb, no price, no offer, no link (Apple 4.4: extensions "may not include marketing, advertising, or in-app purchases").
- **Lock Screen.** Rectangular: "Pro" at top right, white 1.0 (vibrant). Circular and inline: none; no room for it without cutting data, and the gallery and the app already say it.
- **Tap:** opens the app on the premade's detail sheet, as today; opening the app also refreshes the widget, free.
- **Pro active:** no word, no strip; the widget has its full height.
- VoiceOver: "{name}. Updated {time}. Pro. Double-tap to open in pywidget."
- The widget never shows the "Needs Pro" card (state-spec s3.2): that card is for a Pro premade whose entitlement is gone, and 1.0 has none. The card stays as code for the empty locked set (T-2316).

## 4. Strings (`draw_live_pro.py --strings`; all DRAFT C51)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. Strings (draw_live_pro.py --strings; all DRAFT C51), scrolls sideways" style="--tw:832px" markdown="1">

| ID | String | Where | C51 |
|---|---|---|---|
| `chip.live` | Live with Pro | gallery tile chip, free user, premade in LIVE | DRAFT |
| `chip.live.on` | Live | the same chip once Pro is active | DRAFT |
| `w.pro` | Pro | free user's placed widget, trailing end of the bottom row; plain text, no glyph, no verb | DRAFT |
| `vo.tile` | {name}, {family} widget. Live with Pro. Live preview. | VoiceOver, gallery tile, free user | DRAFT |
| `vo.w` | {name}. Updated {time}. Pro. Double-tap to open in pywidget. | VoiceOver, free user's widget | DRAFT |

</div>


## 5. Not drawn here

- Large and extra large: GitHub repository ships small, medium and rectangular only, so no premade in `LIVE` has them. The strip rule is the same at every size.
- Accented and vibrant Home Screen modes: the word takes the system's text treatment like the age line; draw them if a second `LIVE` premade has a large family.
- (b) PRO_STR: Wrenna's words (T-2375 s4-s5) were not in the repo at 2026-11-04 when this was drawn; a continuation line holds it. Done in T-2405: PRO_STR (ide/draw_ide.py) carries `e.live` "Live with Pro", `e.live.on` "Live" and `e.pro` "Pro" for every premade that declares background refresh (Ruling below), plus the 1.0 Pro screen keys `h.refresh`, `row.refresh.*`, `done.refresh`, `free.all`; the premade and package keys are marked RETIRING until T-2372/T-2373 change the flag-file rows.

## Ruling

Ines, 2026-11-04 10:18 PM ET (T-2408). **Background refresh is Pro whatever the data comes from, so every premade whose widget refreshes in the background carries "Live with Pro": GitHub repository, Storage and the 60-minute premade alike.** Why: the T-2373 gate checks background refresh, not the network, and the chip must name exactly what the gate stops; a free user's Storage widget that holds still with no chip would be the one dishonest case. "From the internet" in the chair note described the reason people want it, not a second rule; a gate that asked whether a script touched the network would be a guess. Apple 4.4 is unchanged: the chip lives in the app's gallery, and the widget itself shows only the plain word "Pro", no price, no offer.
{% endraw %}

</div>
