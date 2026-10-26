---
layout: "default"
title: "Research: market-structure"
section: "documents"
description: "Utilities: 92% of 8,504 tracked apps are free; 1,261 (~15%) offer IAP; #1 top paid is HotSchedules (4.6 stars, 67.1K ratings). Paid-upfront is a small slice. Page gives no median price or subscription share."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/market-structure.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/market-structure.md</code></span></div><h1>Research: market-structure</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
## 2026-10-22 01:31 ET
- Source: https://www.apppricinglab.com/reports/UTILITIES
- Finding: Utilities: 92% of 8,504 tracked apps are free; 1,261 (~15%) offer IAP; #1 top paid is HotSchedules (4.6 stars, 67.1K ratings). Paid-upfront is a small slice. Page gives no median price or subscription share.

## 2026-10-22 01:31 ET
- Source: https://marlvel.ai/rankings/us/ios/utilities-grossing/2026-03-18
- Finding: Cleanup: Phone Storage Cleaner was #1 US Utilities top grossing on 2026-03-18; top paid #1 was Shadowrocket (2026-03-09). Grossing led by subscription cleaner apps: saturated, risky <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.

## 2026-10-22 01:34 ET
- Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1018655661/sortby=mostrecent/json
- Finding: Method note: Apple public RSS feed (itunes.apple.com/us/rss/customerreviews/page=N/id=ID/sortby=mostrecent/json) works but returns zero entries for most small apps and <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> near 50 per page-set; 7 of 18 pulled apps returned data. Search API gives price and rating count. Script: tools/review_mine.py; per-app lists in research/reviews/.

## 2026-10-22 02:17 ET
- Source: https://itunes.apple.com/search?term=film+developing+timer&entity=software&country=us&limit=15
- Finding: <span title="How many apps on the shelf already sell the same thing.">Crowding</span> across 9 niche lanes (tools/review_mine.py crowd, top 11-15 results each): 59 apps released since 2025-01-01; 4 of them (7 percent) reached 50+ ratings. Lanes: timegrapher 8 new, turntable speed 2, film dev timer 5, film log 5, sstv 9, spoke tension 6, POTA logger 6, pickleball scorer 8, exif remover 7. Feature-level novelty in niche utilities is mostly gone by Oct 2026; discovery, trust and a mechanism nobody ships are what separate.
{% endraw %}

</div>
