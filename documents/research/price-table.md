---
layout: "default"
title: "Competitor price and paywall table (Day 2, 2026-10-22)"
section: "documents"
description: "Query URL: https://itunes.apple.com/search?term=remove+exif+metadata&amp;entity=software&amp;country=us&amp;limit=8"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/price-table.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/price-table.md</code></span></div><h1>Competitor price and paywall table (Day 2, 2026-10-22)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this, before the tables: the numbers are only as good as how I got them. Method: US App Store, `tools/price_table.py` (new; iTunes Search API for price, rating count, average, last update; store page for the IAP list). Passive, public endpoints, no contact. 'Top 8' means the first eight results of the search term shown, which is search rank, not downloads.

**Caveats (counted, not hedged away).**
- Photo Investigator (1,400 ratings; $2.99/$4.99 unlocks, see research/photo-metadata.md) and Watch Tuner did not appear in their top-8 searches, so they are not in the tables; the reviewed comparison set for Stripwise is those two plus Exif Viewer.
- 'none listed' means the store page showed no IAP block to my parser. It is NOT proof of no IAP: tickIQ's page text says it 'includes one-time In-App Purchases and Subscriptions' yet no tiers parsed. Where I know better it is noted below. Tickscope's description says Pro is $4.99 once, no subscription.
- Some pages (Tally: Counter & Score Tracker, Tally: The Anything Tracker) list repeated or overlapping tiers; I print them as the page does. Treat those as 'subscription-heavy, exact tiers unverified'.
- Rating counts are lifetime US ratings (including the version the API reports). 'Last update' is currentVersionReleaseDate.

## Stripwise: query "remove exif metadata"

Query URL: https://itunes.apple.com/search?term=remove+exif+metadata&entity=software&country=us&limit=8


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Stripwise: query &quot;remove exif metadata&quot;, scrolls sideways" data-n="1" style="--tw:1214px" markdown="1">

| # | App | Upfront | IAP tiers (store page) | Ratings (avg) | Last update | Store page |
|---|---|---|---|---|---|---|
| 1 | Exif Metadata | Free | Exif Metadata Pro (lifetime) $19.99; Exif Metadata Pro (annual) $9.99; Exif Metadata Pro (monthly) $4.99 | 6060 (4.6) | 2026-05-03 | https://apps.apple.com/us/app/exif-metadata/id1455197364 |
| 2 | EXIF MetadataーMetadata Remover | Free | Monthly subscription $3.99; Yearly subscription $19.99; Yearly Subscription $9.99 | 2 (3.5) | 2025-04-08 | https://apps.apple.com/us/app/exif-metadata%E3%83%BCmetadata-remover/id1586282828 |
| 3 | Photo Metadata EXIF Remover | Free | none listed | 161 (4.1) | 2024-07-12 | https://apps.apple.com/us/app/photo-metadata-exif-remover/id1079710135 |
| 4 | EXIF Metadata Editor & Remover | Free | premium $19.99; premium $3.99 | 3 (4.7) | 2026-02-26 | https://apps.apple.com/us/app/exif-metadata-editor-remover/id6757008458 |
| 5 | Exif Metadata Remover Viewer | Free | Yearly Plan $24.99; Exif Viewer Pro $49.99; Monthly Plan $4.99 | 39 (4.5) | 2026-05-14 | https://apps.apple.com/us/app/exif-metadata-remover-viewer/id1560620976 |
| 6 | Exif Viewer - Photo Metadata | $2.99 | none listed | 714 (4.5) | 2025-02-07 | https://apps.apple.com/us/app/exif-viewer-photo-metadata/id1468747693 |
| 7 | EXIF Metadata viewer & remove | Free | 1 week: EXIF Metadata viewer $0.99; 1 month: EXIF Metadata editor $2.99; 1 year: EXIF Metadata editor $9.99 | 10 (4.2) | 2023-03-21 | https://apps.apple.com/us/app/exif-metadata-viewer-remove/id1627722665 |
| 8 | EXIF Metadata Studio: Editor | Free | EXIF Studio PRO Monthly $1.99; EXIF Studio PRO Lifetime $12.99; EXIF Studio PRO Yearly $7.99 | 3 (5.0) | 2026-08-22 | https://apps.apple.com/us/app/exif-metadata-studio-editor/id6751822045 |

</div>


**Read of the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.** Seven of eight are free with IAP; one is $2.99 upfront with no IAP (Exif Viewer, 714 ratings at 4.5, the only paid-once proof). Subscriptions dominate: 6 of 8 list a monthly, weekly or yearly tier. Lifetime tiers range $12.99 to $49.99 (Exif Metadata $19.99). Our planned $4.99 one-time unlock undercuts every lifetime tier and equals a single month at the top end. Only Exif Metadata has real volume (6,060); the rest are under 800, and four have fewer than 40 ratings, so the lane is a one-giant lane plus a long tail of thin newcomers. Four of the eight updated in 2026.

## Tallyproof: query "tally counter"

Query URL: https://itunes.apple.com/search?term=tally+counter&entity=software&country=us&limit=8


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Tallyproof: query &quot;tally counter&quot;, scrolls sideways" data-n="1 3" style="--tw:1203px" markdown="1">

| # | App | Upfront | IAP tiers (store page) | Ratings (avg) | Last update | Store page |
|---|---|---|---|---|---|---|
| 1 | Counter Tally Count | Free | Remove Ads $19.99 | 14015 (4.8) | 2026-10-20 | https://apps.apple.com/us/app/counter-tally-count/id1144352844 |
| 2 | Tally Counter | Free | none listed | 499 (4.4) | 2019-02-12 | https://apps.apple.com/us/app/tally-counter/id288732372 |
| 3 | Count That Now - Tally counter | Free | Ad Free $12.99 | 5494 (4.7) | 2024-09-07 | https://apps.apple.com/us/app/count-that-now-tally-counter/id955952873 |
| 4 | Tally • Quick Counter | Free | Tally Pro - Annual $9.99; Tally Pro - Lifetime $39.99 | 1787 (4.7) | 2026-10-10 | https://apps.apple.com/us/app/tally-quick-counter/id957912407 |
| 5 | Vivid Counter | Free | none listed | 150 (4.7) | 2020-01-30 | https://apps.apple.com/us/app/vivid-counter/id794889884 |
| 6 | Tally: Counter & Score Tracker | Free | Monthly plan $4.99; Tally Premium $29.99; Lifetime plan $9.99; Yearly plan $39.99; Weekly plan $2.99; Annual $29.99; Monthly plan $6.99; Small Tip $2.99; Lifetime $59.99; Monthly plan $4.99 | 1095 (4.6) | 2026-09-26 | https://apps.apple.com/us/app/tally-counter-score-tracker/id1412716242 |
| 7 | Tasbih Counter Lite: Dhikr App | Free | Remove Ads $8.99; Remove Ads $5.99 | 6815 (4.7) | 2026-02-02 | https://apps.apple.com/us/app/tasbih-counter-lite-dhikr-app/id1501329079 |
| 8 | Tally: The Anything Tracker | Free | One-Time Upgrade $6.99; Tally Premium - Yearly $29.99; Tally Premium - Yearly $59.99; Tally Premium - Yearly $29.99; Tally Premium - Yearly $59.99; Tally Premium - Yearly $29.99; Tally Growth Bundle: Monthly $2.99; Annual Subscription $14.99; Annual Subscription $14.99; Tally Growth Bundle: Yearly $18.99 | 4107 (4.4) | 2026-09-17 | https://apps.apple.com/us/app/tally-the-anything-tracker/id1090990601 |

</div>


**Read of the lane.** Free everywhere. Two incumbents are ad-funded with a pure remove-ads purchase (Counter Tally Count $19.99, 14,015 ratings; Count That Now $12.99, 5,494; Tasbih Counter $5.99/$8.99, 6,815). Three are subscription or lifetime upsells (Tally Quick Counter $9.99/yr or $39.99 lifetime; Tally: Counter & Score Tracker and Tally: The Anything Tracker with yearly $14.99 to $59.99). Our $2.99 one-time unlock is the cheapest anywhere in the table; the question is not price but whether a person who already has a free counter with 14K ratings will switch. Two are abandoned (last updates 2019 and 2020), which is where a stale-widget fix is least contested.

## Beatcount: query "watch timegrapher"

Query URL: https://itunes.apple.com/search?term=watch+timegrapher&entity=software&country=us&limit=8


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Beatcount: query &quot;watch timegrapher&quot;, scrolls sideways" data-n="1 3" style="--tw:1203px" markdown="1">

| # | App | Upfront | IAP tiers (store page) | Ratings (avg) | Last update | Store page |
|---|---|---|---|---|---|---|
| 1 | tickIQ: Measure, Track Watches | Free | none listed | 804 (4.6) | 2026-06-04 | https://apps.apple.com/us/app/tickiq-measure-track-watches/id6749871310 |
| 2 | Timegrapher — Watch Accuracy | Free | Timegrapher Pro $9.99 | 14 (4.9) | 2026-10-19 | https://apps.apple.com/us/app/timegrapher-watch-accuracy/id6788081843 |
| 3 | ChronoLog • Watch Accuracy | Free | Premium $5.99; Premium $6.99 | 228 (4.6) | 2026-10-20 | https://apps.apple.com/us/app/chronolog-watch-accuracy/id6452083510 |
| 4 | Timegrapher - watch accuracy | Free | Unlock full $5.99 | 46 (2.8) | 2024-03-15 | https://apps.apple.com/us/app/timegrapher-watch-accuracy/id6450460771 |
| 5 | Wrotate: Watch Timegrapher | Free | none listed | 34 (4.9) | 2026-10-12 | https://apps.apple.com/us/app/wrotate-watch-timegrapher/id6760091102 |
| 6 | Escapement: Watch Timegrapher | Free | Escapement Plus Monthly $0.99; Escapement Plus Annual $9.99 | 0 (0.0) | 2026-10-21 | https://apps.apple.com/us/app/escapement-watch-timegrapher/id6782130453 |
| 7 | Tickscope — Watch Accuracy | Free | Unlimited Measurements $4.99 | 24 (4.6) | 2026-10-20 | https://apps.apple.com/us/app/tickscope-watch-accuracy/id6761128998 |
| 8 | Isochron: Watch Accuracy | Free | Isochron Pro $9.99 | 0 (0.0) | 2026-09-09 | https://apps.apple.com/us/app/isochron-watch-accuracy/id6780989450 |

</div>


**Read of the lane.** Crowded and young: six of eight updated in the last six weeks, and five have 46 ratings or fewer (two have zero). Only tickIQ (804) has traction; ChronoLog has 228. Price points cluster at $4.99 to $9.99 one-time unlocks (Tickscope $4.99, Unlock full $5.99, ChronoLog $5.99/$6.99, Timegrapher Pro and Isochron Pro $9.99); two use cheap subscriptions (Escapement $0.99/mo, $9.99/yr). Our $4.99 one-time sits at the low end and matches Tickscope exactly. The rating of 2.8 on Timegrapher - watch accuracy (46 ratings) is the one visible dissatisfaction signal.

## Reproduce
`python3 tools/price_table.py "remove exif metadata"` (likewise the other two terms). Query URLs are above; each row ends with its store page.
{% endraw %}

</div>
