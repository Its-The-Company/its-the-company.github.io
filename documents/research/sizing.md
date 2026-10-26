---
layout: "default"
title: "Sizing, both lanes (2026-10-22, Wrenna)"
section: "documents"
description: "The assumption (same as pass 1, research/SHORTLIST.md). Between 1 and 3 percent of people who download an app leave a rating. So implied downloads = ratings / 0.03 (low) to ratings / 0.01 (high). I have no download data\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/sizing.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/sizing.md</code></span></div><h1>Sizing, both <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> (2026-10-22, Wrenna)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Arithmetic, not a forecast. Sizing is not my strength; I lean on a partner for unit forecasts and still have none, so every number here is a range with its assumption in plain view.

**The assumption (same as pass 1, research/SHORTLIST.md).** Between 1 and 3 percent of people who download an app leave a rating. So implied downloads = ratings / 0.03 (low) to ratings / 0.01 (high). I have no download data for any iOS app to check this against. Implied per day is the lifetime average (implied downloads / days since release), which overstates a stale app's flow today and understates a new app that is growing.

**Other limits.** Ratings are the US storefront count from the iTunes Lookup API, so these are US downloads only. Lane membership was decided by reading each app's description: Knit Pro (lessons), X-Stitch App and X-Stitch Tracker (journal and inventory), StitchSnap (photo to chart) and Knotty (a chart follower) are not editors or keepers and are shown only as adjacent. The target: 29 sales at $9.99 (net $6.99) in about 10 selling days (<span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">PITCH</span>-2), so 2.9 sales a day.

Made with `tools/sizing.py` (new, stdlib; `--low 0.01 --high 0.03 --asof 2026-10-22 ID ...`). Sources:
- Knitting editors: https://itunes.apple.com/lookup?country=us&id=1251317736,1536002920,6759521479,6742430934,6770867819,6755318203
- Cross-stitch keepers: https://itunes.apple.com/lookup?country=us&id=1559524491,1610306306,6783042962,6789885520,6797248350,6823774059,6780980650,6780495568
- Adjacent: https://itunes.apple.com/lookup?country=us&id=1058142783,6795073999,6766639867,906882968,1601194384
- Pattern Keeper (Android): https://play.google.com/store/apps/details?id=app.patternkeeper.android


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:1798px" markdown="1">

| Lane or app | Apps counted (US ratings) | US ratings | Implied lifetime downloads | Implied per day | Implied in 10 selling days | 29 sales as a share of that flow |
|---|---|---|---|---|---|---|
| **Knitting chart editors (Purlwright lane)** | Knitting Chart 1,298; Stitch Fiddle 33; Patternum 25; Knit Design 7; Knit The Chart 0; Knitting - Pattern Editor 0 | 1,363 | 45,433-136,300 | 18.2-54.5 | 182-545 | 5.3%-15.9% |
| ...of which Knitting Chart alone (stale since 2023-01-18) | 1 | 1,298 | 43,267-129,800 | 12.8-38.4 | 128-384 | 7.6%-22.7% |
| **Cross-stitch chart keepers (pivot lane)** | Markup R-XP 3,064; Cross Stitch Chart 63; Stitchwork 7; Crossie 7; Uzora 2; Purl 2; StitchGrid 0; Threadmark 0 | 3,145 | 104,833-314,500 | 59.4-178.1 | 594-1,781 | 1.6%-4.9% |
| ...of which Markup R-XP alone | 1 | 3,064 | 102,133-306,400 | 51.7-155.0 | 517-1,550 | 1.9%-5.6% |
| Adjacent: knitCompanion (follows charts, does not design) | 1 | 6,899 | 229,967-689,900 | 73.1-219.2 | 731-2,192 | 1.3%-4.0% |
| Adjacent: Pattern Keeper, Android only, observed not implied | 1 | not shown on the page | 315,748 installs (Play page data; displayed "100K+") | n/a (release date not read) | n/a | n/a |

</div>


## Here is the shape of it
- **Knitting editors are the smaller lane by about three times.** Their whole US flow, at the lifetime average, is 18-55 downloads a day, most of it a stale app's history. To make 29 sales in 10 days, Purlwright would need 5-16 percent of *every* download in the lane to become a paying customer of ours, even if we took all of them. That is a demanding number. The pitch's line "29 sales is a discovery problem, not a market-size problem" was written from lifetime totals; on a per-day reading, size is also a constraint for the knitting lane in month one.
- **Cross-stitch keepers have about three times the flow** (59-178 a day, mostly Markup R-XP), and Pattern Keeper's 315,748 Android installs at about $9 one-time are the only real download figure in either lane. The pitch moved this lane to runner-up for crowding (seven new entrants), not for size; this table does not change that reason, but it does show the pivot lane is the bigger pool.
- **The knitting audience is larger than its editor lane.** knitCompanion alone implies 73-219 downloads a day, and those people already <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> charts. Whether they would pay for a designer is unproven; the hand-read reviews (research/knitting.md) show 3 of 178 asking for chart-to-written directly.

## What would change these numbers
1. One real ratio from any app we can see both counts for. Pattern Keeper's Play page shows installs but no rating count in what I fetched; if a later read shows its rating count, that gives an Android ratings-to-installs ratio to test the 1-3 percent.
2. A sizing partner to turn flow into a unit forecast with a conversion rate we can defend. I have not invented one here.
3. Day 5 (2026-10-26) rating counts for the new entrants (board task). One adjacent signal now: X-Stitch Tracker (an inventory app, not a keeper) reached 21 ratings in 56 days, so new cross-stitch apps can gather ratings quickly.
{% endraw %}

</div>
