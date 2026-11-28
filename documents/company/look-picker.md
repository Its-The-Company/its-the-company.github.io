---
layout: "default"
title: "Look picker: explore the new looks on the site (plan)"
section: "documents"
description: "Q1 How it works: one live page in the App tab: pick a look and a screen, then cycle colours, fonts, panel"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/look-picker.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/look-picker.md</code></span></div><h1>Look picker: explore the new looks on the site (plan)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Operator, 2026-11-26 9:4x PM ET. A plan for mockups and a site page, not an approval: Paper (light) and Studio (dark),
`creative/approved.md` item 9 (#291), stay the app's look until the Investors approve a direction (gate 2). Earlier
plan: [`ops/plans/new-look-directions.md`](new-look-directions.html) (the four directions, T-5856 to T-5861, in
`pywidget/docs/design/new-look/`).

## The ask
an Investor, #325 c7207915978 (9:11 PM ET 11-26, plan mode): Risograph and Swiss editorial are the favourites. More
Risograph mockups in neutral colours; try other fonts and UI design, a few options for each element; every mockup
viewable from the site; optionally an interactive picker in the App tab to explore looks, screens, fonts, colours and
panel shapes at once.

## What the answers decided (c7207991429, 9:17 PM ET)
- **Q1 How it works:** one live page in the App tab: pick a look and a screen, then cycle colours, fonts, panel
  shapes, light and dark.
- **Q2 Screens:** Gallery, Projects, the editor and Settings, plus the Builder and a Page (the screens 1.0 adds).
- **Q3 Risograph colours:** three neutral ink pairs (for example graphite and ochre, slate and rust, ink and sage).
  Note: also bold options, like the red in the Swiss design.
- **Q4 Which looks vary:** Swiss, Risograph and Blueprint all get the options in the picker.
- **Q5 When:** one design session beside the app work, like the Home page update; it takes no app slot.

## What the research found
- The mockups are drawn by code (`screens.py`, `kit.py`) as still PNGs, so new colours, fonts and panel shapes are
  cheap to add once the values are tokens.
- The site strips scripts from every mockup it publishes; only the site's own pages run a script. So the picker is a
  page of the site's own (a module in `tools/site/`, linked from the App page, `tools/site/how_it_works.py`), not a
  mockup dropped in.

## Steps (one board line each, Maren unless named)
1. **T-5922** Draw the new looks as live HTML, adding Pages: each screen of Swiss, Risograph and Blueprint written as
   standalone HTML whose colour, font and panel-shape values are CSS tokens; a new Page screen; today's PNGs come out
   unchanged. Reviewer Ines.
2. **T-5923** Add colour, font and panel-shape options to the three looks: Risograph's three neutral pairs plus two
   bold ones (one with a Swiss-style red); Swiss and Blueprint three or four palettes each, bold included; SF Pro and
   three or four SIL Open Font License families, each licence in `log/assets.md`; four panel shapes; every pair checked
   at 4.5:1 contrast. Reviewer Ines.
3. **T-5924** Build the look picker page at /app/looks/, linked from the App page: look, screen, light or dark,
   colours, font, panel shape, drawn live at phone size and usable on a phone; the choice kept in the address; the
   earlier still sets (watercolor included) and the moving wash shown too. Then a card on #325 linking it. Reviewer
   Odalys.
4. **T-5950** Add details to the picker: ideas from details.so (an Investor #325 c7232248391, 9:16 PM ET 11-27), read
   under the Investors' answer c7232337947 (9:24 PM ET 11-27: inspiration only; signed out, one page at a time, 5 s
   apart, at most 10 pages, no copy kept, nothing copied). Eight pages of the ten read (the terms, the Vault twice, and its button,
   page-transition, text-reveal, section-transition and UI-details lists), item names only; log and notes in
   `research/inbound/t5950-details/terms-check.md`. Added to /app/looks/ under a Details tab, each off until turned on
   and kept in the address as `details=<id>.<id>`: covers between screens (Shutter for Swiss and Blueprint, Columns
   for Swiss, Ink pass for Risograph, Grid cells for Blueprint), titles arriving (Rising title, Swiss; Drafted title,
   Blueprint; Ink settle, Risograph), button presses (Colour fill, Swiss and Risograph; Arrow reveal, Swiss and
   Blueprint) and panel touches (<span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">Lift</span> on press, Risograph and Blueprint; Halftone dots, Risograph). Each is shown only
   for the looks it fits, carries a one-line source note in the list under the picker, and is our own code; under
   Reduce Motion nothing moves. Left out, and why: scramble text (noise to a screen reader), gradient sweep, wave
   gradient and liquid glass (not print looks), slide text (needs a second copy of each label), ASCII cursor (no
   cursor on a phone), parallax images (the mockups hold no photographs). Explorations only: Paper and Studio stay
   the approved look (gate 2). Tested by tests/site_look_picker_test.py. Maren.

## Rules
- Code-drawn only; no AI-generated images, no stock, nothing traced (the bans; Commandment 6).
- Fonts only under a licence that allows it (SIL OFL), each listed with its licence; SF Pro is the viewer's own system
  font and is never shipped by the site.
- No outside requests from the page; Reduce Motion stops the wash; text at 4.5:1.
- Runs as one design session beside the app work; it takes none of main's app feature slots.

## Risks
- A font that fails contrast or licence checks is left out and named, not swapped silently.
- The page's size: fonts load only when picked.
- Changing `screens.py` could change today's PNGs; step 1's test holds them unchanged.

## What it leaves out
- Choosing a direction, and any change to the app's look: that is the Investors' approve (gate 2), and its answer
  becomes the next plan (tokens, then screens).
- Watercolor gets no new options (Q4); its still sets and the live wash stay viewable on the page.
{% endraw %}

</div>
