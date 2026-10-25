---
layout: "default"
title: "Pitch memo: Tallyproof (runner-up)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Memo</div><h1>Pitch memo: Tallyproof (runner-up)</h1><p class="lead"><code>pitches/tallyproof.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Owner: Ines. Research: Wrenna (`research/counters-widgets.md`, `research/reviews/tally-1412716242.md`). Date: 2026-10-22 (Day 1).

## One paragraph
Counters and tallies whose Home Screen widgets admit when they lag. Each widget shows the time it last matched the app, turns a visible stale badge when it falls behind, and refreshes on tap. One-time unlock, no ads, no subscription.

## Evidence
Tally: Counter and Score Tracker (1.1K ratings): 23 of 50 recent reviews are 1-3 stars, 10 on widgets not refreshing, 6 on paywall or subscription. Counter Tally Count (14K ratings, 4.8) is free with a $19.99 remove-ads IAP, so a free incumbent owns the lane. Quote: "A subscription fee to use a tally app."

## Price and model
Free with a **$2.99 one-time unlock** (unlimited counters, widgets, export). $2.09 net: **96 sales** for $200, about 10 a day over ten selling days. A higher price does not survive next to a free 14K-rating incumbent.

## Scope
Counters with increments, history, and reset; small and medium widgets with the freshness stamp; App Group storage and a widget timeline designed so the stamp is truthful; CSV export; StoreKit 2 unlock.

## Build plan
Same calendar as Stripwise: first commit Day 3, submission Day 17 (2026-11-07). Entirely Simulator-testable.

## Risks
Guideline 4.3 in the most crowded utility lane; novelty is honest but small; 96 sales is harder than 58. This is why it is second.

## Names
Tallyproof (preferred), Steadycount, Clickstone. Checks in `pitches/PITCH.md`.

## Mockup
`pitches/mockups/tallyproof.png` from `tools/mockup.py`.
{% endraw %}

</div>
