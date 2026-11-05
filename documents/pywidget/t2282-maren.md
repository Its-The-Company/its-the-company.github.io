---
layout: "default"
title: "T-2282: Settings screen against the design"
section: "documents"
description: "Colours are sampled by script, not by eye (tools/png_sample.py; contrast is WCAG 2 relative luminance, the darkest or lightest ink in a box against the box&#x27;s most common colour). Coordinates are px in the 1170 x 2532\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2282-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2282-maren.md</code></span></div><h1>T-2282: Settings screen against the design</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-05. Build 47781357 (T-2225). Read from the four Simulator shots in `ops/site-checks/settings-T-2225/` (1170 x 2532 px, 3 px per pt): light, dark, and each after Restore with nothing bought. Compared with `pywidget/docs/design/ide/A-settings-phone.png` and `B-settings-phone.png` (frames 1 and 4), spec s5.10 (T-0657), `creative/approved.md` item 2 and `pywidget/docs/design/tokens.json`. No Simulator or build was run.

Colours are sampled by script, not by eye (`tools/png_sample.py`; contrast is WCAG 2 relative luminance, the darkest or lightest ink in a box against the box's most common colour). Coordinates are px in the 1170 x 2532 shots. Crops are in `pywidget/docs/reviews/t2282/`.

Not flagged, by design until their feature exists: the tour row (T-0193), Editor theme (T-0272), Support (T-0485), Privacy Policy (LegalLinks unset). Also not flagged: the back button and the missing tab bar. Settings is pushed from a toolbar because no build line exists for the tab bar yet (s5.11.2).

Result: **does not pass.** Three P2 and two P3 findings, each with a board line for Idris.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1 3" style="--tw:1129px" markdown="1">

| # | Board | Pri | What the shot shows | Design / rule | Where |
|---|---|---|---|---|---|
| F1 | T-2696 | P2 | In dark, the cards are #1C1C1E and the separators #38383B. These are the system grouped cell and separator. | B frame 1 has `bg.surface` #151926 and `line.hairline` #262C3E. Light matches only because the system cell and `bg.surface` are both #FFFFFF. Light separators are #E8E8E8 against #E3DFD6; you cannot see that difference, and the same fix covers it. | Card fill sampled at (1000,760) and (1000,1200). Separators are rows 636-639 and 1170-1173 at x 700. Crops: `t2282/f1-dark-card-shot.png` (shot), `t2282/f1-dark-card-design-B1.png` (design, #151926 sampled) |
| F2 | T-2697 | P2 | In light, the "About" header is #878688 on the canvas #F7F5F0, which is **3.33:1**. The text is about 17 pt semibold (ink rows 913-951). It is not large text, so the minimum is 4.5:1. Dark is 6.32:1. | s5.10.5 puts headers in `text.secondary`, and the spec QA's lowest ratio is 6.39:1. #5C5850 here would be 6.50:1. | Box (95-245, 905-965); after Restore, (95-245, 942-1000). Crop: `t2282/f2-about-header-light.png` |
| F3 | T-2698 | P2 | The large title "Settings" is SF Pro Bold, #000000 in light and #FFFFFF in dark. | Approved item 2 includes the display faces: New York in light and SF Pro Rounded in dark (A and B frame 1), in `text.primary` #1C1B19 / #EEF0F8. Nothing in `pywidget/ios/App` sets a navigation-title font, so every screen has the same gap. | Box (45-450, 330-430). Crops: `t2282/f3-title-light.png`, `t2282/f3-title-dark.png`, `t2282/f3-title-design-A1.png`, `t2282/f3-title-design-B1.png` |
| F4 | T-2699 | P3 | Restore purchase has no leading tile. Its title starts at x 100 px, while the Pro and Terms titles start at 226 and 224 px, so it sits 42 pt further left. The left edge looks broken in the first card the buyer reads. | A frames 1 to 4 draw a 30 pt `accent.soft` tile with a download glyph on Restore. Spec 10.1 drops only the chevron. | Restore ink (100-496, 710-756). Crops: `t2282/f4-restore-light.png`, `t2282/f4-restore-design-A1.png` |
| F5 | T-2700 | P3 | Large-text risk, worked out from measured widths. A still cannot show it. The Pro row keeps the title and the status on one line until AX1 (`isAccessibilitySize`, `SettingsView.swift:211`). At Large, the title is 98 pt and "Not purchased" is 110 pt, in about 261 pt of room. At xxxLarge (x1.35) they need about 292 pt, so the status wraps in the middle of the phrase before the stacked layout starts. The Ask to Buy status "Waiting for approval" is about 165 pt and is close to the limit even at Large. | s5.10.6 names `ViewThatFits`: use one line when it fits, otherwise put the status under the title. | Detail ink x 674-1003, title from x 226, chevron at x 1046, row y 520-580. Crop: `t2282/f5-pro-row-light.png` |

</div>


## Matches


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Matches, scrolls sideways" style="--tw:844px" markdown="1">

| Check | Shot (light / dark) | Design |
|---|---|---|
| Canvas | #F7F5F0 / #0A0C13 | `bg.canvas` A / B |
| Light card | #FFFFFF, margins 48 px = 16 pt | `bg.surface` A, margins 16 |
| Tile | #E4EBF8 / #2A2350, glyph #2350B0 / #A08BFF (6.16:1 / 5.25:1) | `accent.soft`, `accent` |
| Row titles | #1C1B19 / #EEF0F8 (17.21:1 / 14.95:1) | `text.primary` |
| Pro detail "Not purchased" | #5C5850 / #A9AFC5 (7.08:1 / 7.80:1) | `text.secondary` |
| Restore | accent #2350B0 / #A08BFF (7.38:1 / 6.18:1), no trailing mark | 10.1 row 2 |
| Restore found nothing | "No Pro purchase found for this Apple Account." under the Pro card, footnote, #5C5850 / #A9AFC5 (6.50:1 / 8.95:1); About moves down 36 px (12 pt) | frame 4 |
| Web arrow (Terms) | #6A665D / #8A91AA (5.72:1 / 5.44:1) | `text.tertiary` |
| Page foot | `set.appear` and "Version 0.1 (1)", centred footnote, #5C5850 / #A9AFC5 (6.50:1 / 8.95:1) | 10.1 page foot |
| Rows, glyphs | Pro (sparkles), Restore, About: Terms (doc, arrow), Acknowledgements (heart, chevron) | frame 1, minus the rows left out by design |

</div>


The code backs what a still cannot show. The footer is posted as a VoiceOver announcement (`SettingsView.swift:116`), and Restore is disabled with a spinner while it runs (:141-151). The spinner sits at the trailing edge, while frame 3 draws it leading. That is a system-standard placement, so it is not flagged.

## Accepted as built (Tenet 3; the spec now says so)

These come from the iOS 26 system `List`. Settings should follow Apple's conventions, so s5.10.5 now records them instead of asking the code to change:
- Rows are 60 pt (two-row cards are 360 px), not the 44 drawn. The spec says "at least 44", so this is within it.
- Cards use the system corner radius instead of 14 and have no outline. White on #F7F5F0 is the system grouped look.
- Group headers are title case ("About") instead of the eyebrow. Their colour still goes to `text.secondary` (F2).
- The disclosure chevron is the system's #C5C5C7 / #5A5A5E (1.72:1 / 2.48:1; crop `t2282/a1-chevron-arrow-light.png`). It is a standard `NavigationLink` mark, Increase Contrast darkens it, and it is not the only sign that a row opens something, so it stays. The web arrow keeps `text.tertiary`, because it is the only sign that a row leaves the app.
- The Pro glyph is `sparkles`, not the frames' lock. A lock next to "Active" would look locked.

Apple conventions met: Restore Purchases sits on the Settings screen next to the product (App Review 3.1.1), the large title is used, rows that open the web carry the up-right arrow, and the version is at the foot.
{% endraw %}

</div>
