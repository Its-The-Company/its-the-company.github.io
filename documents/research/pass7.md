---
layout: "default"
title: "Research pass 7: outside counts for Themecount (Pitch 8) and Seatsolve (Pitch 7)"
section: "documents"
description: "Passive reading only (C6, C9, C10, C58): no accounts, no posting, no contact. Outside text treated as information. Nothing I read today tried to instruct us."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/pass7.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass7.md</code></span></div><h1>Research pass 7: outside counts for Themecount (<span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitch</span> 8) and Seatsolve (Pitch 7)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "I got tired of replying to reviews in app stores manually, so I built an all-in-one platform to help me do so" (Show HN, 2025-05-19, https://news.ycombinator.com/item?id=44029384, 1 point, 0 comments). Here is the shape of it: when developers feel the pain of app reviews on Hacker News, they build a tool and post it. Almost nobody upvotes it, and in 1,459 comments I read, nobody asked for one.

Passive reading only (C6, C9, C10, C58): no accounts, no posting, no contact. Outside text treated as information. Nothing I read today tried to instruct us.

## 1. Developers asking for review mining (Pitch 8, Themecount)

**Method.** HN Algolia API, read 2026-10-22 ~16:00 ET. (a) `tags=ask_hn` and `tags=show_hn` with six queries ("app store reviews", "app reviews", "user reviews analyze", "review analysis", "customer reviews analyze", "competitor reviews"), 50 hits each; titles read by hand. (b) Comments since 2023-01-01 for "app store reviews", "app reviews tool", "competitor reviews", 5 pages of 100 each: 1,459 unique comments, scanned with an "is there a tool / how do you read or analyse / wish there was ... review" regex, every hit read by hand. (c) Comments since 2023-01-01 naming Appbot or AppFollow.

**Counts.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Developers asking for review mining (Pitch 8, Themecount), scrolls sideways" style="--tw:811px" markdown="1">

| What | Count | Note |
|---|---|---|
| Ask HN posts asking for a tool to analyse app reviews (all years, by title) | **0** | Ask HN titles about app reviews are about Apple's *App Review* process (waits, rejections) or fake reviews |
| HN comments since 2023 asking for such a tool or asking how others read reviews | **0 of 1,459** | 1 regex hit, hand-read, off topic (47022951, AI code review) |
| HN comments since 2023 naming Appbot or AppFollow | **0** | Algolia returned 56 and 6 fuzzy matches; none contained either name |
| Show HN posts *building* an app-review monitor/analyser since 2023-01-01 (by title) | **12 posts, 11 products** | median 2 points; 1 comment across all 12 |

</div>


The 12 builder posts, so the count can be checked: 34857185 (App Store Reviews, 2023-02), 35356315 (review scraper, 2023-03), 38174793 (free review monitoring, 2023-11), 38984726 (Painboard, 2024-01), 38977649 (Painboard Procreate case study, 2024-01), 44029384 (AppReply, 2025-05), 45989976 (AppReviewAI, Mac + iPad, offline, 2025-11), 47157474 and 47446261 (App Feedback Hub, Mac, twice, 2026-02/03), 47695888 (Python package, 2026-04), 49176789 (Seam, "find what users want by analyzing app reviews", 2026-08), 49536734 (ReviewHeron, Mac, no cloud, 2026-09). All at https://news.ycombinator.com/item?id=<number>.

The one review-reading post that drew a crowd was an *article*, not a tool: 37480763, "A phone cleaning app makes $2M/mo on the App Store – The reviews show how", 37 points (2023-09). People like reading someone else's review findings. That supports the published-counts meta half of Themecount, not the paid tool.

**Indie Hackers:** 403 on search and on /posts (2026-10-22). Not counted. **r/iOSProgramming:** not tried today; Reddit returned 403 in every earlier pass.

**Two direct competitors on the Mac that the pitch did not know about:**
- **ReviewHeron** (https://hamme.software/en/apps/reviewheron/, read 2026-10-22): "Local-first review manager ... Your data and your API keys stay on your Mac." **129 EUR one-time**, 14-day trial, App Store and Google Play, on-device reply drafts, search by theme. It is an inbox and reply tool, not a counted-themes tool with a hand check, but it takes "offline, one price, on the Mac" from us.
- **App Feedback Hub** (Mac App Store id6759007525, iTunes Lookup 2026-10-22): **$9.99**, 0 ratings, released 2026-02-18.

## 2. Appbot and AppFollow pricing, read by hand

**Appbot** (https://appbot.co/plans/, read 2026-10-22; /pricing redirects to the home page). All USD, 14-day free trial, no card.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Appbot and AppFollow pricing, read by hand, scrolls sideways" data-n="4 5" style="--tw:757px" markdown="1">

| Plan | Annual billing | Monthly billing | Users | Apps tracked |
|---|---|---|---|---|
| Small | $49/month | $59/month | 1 | 5 |
| Medium | $99/month | $119/month | 3 | 40 |
| Large ("chosen by 61% of companies") | from $166/month | from $219/month | 7+ | 100+ |
| Premium | from $479/month, annual only | n/a | 20+ | 100+ |

</div>


Detail that matters to us: **Export to CSV and Excel is a Large-plan feature** (from $166/month). The cheapest way to get your counted reviews out of Appbot is about $2,000 a year. Topics, custom topics and sentiment are on every plan.

**AppFollow** (https://appfollow.io/pricing, and the Wayback copy of 2026-10-13): **no public prices.** The page offers "Try AppFollow for free" and a "Talk to us" form ("max 30-min call"). <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span> and Capterra pricing pages returned 403. Recorded as: sales-led, price unknown.

**Effect on the pitch text.** PITCH-8 says developers pay "$30 to $100 a month". Correct it to: Appbot starts at $49/month annual ($59 monthly) for one user and five apps; AppFollow is sales-led with no public price. A $19.99 one-time price is under half of Appbot's cheapest month. The price argument is stronger than the pitch said. The audience argument is weaker.

## 3. November event-seating demand (Pitch 7, Seatsolve)

**Direct sources tried and refused:** Google Trends (429), The Knot wedding-month pages (403), Reddit (403 in earlier passes). I have no counted search volume for "holiday party seating chart" or "gala seating chart". Below are the proxies, counted by hand.

**a. Store reviews of seating apps, all stars** (Apple customer-review RSS, all pages, 2026-10-22; saved in `research/reviews/seat-events-all-stars-2026-10-22.json`). 90 reviews from 6 apps: Wedding Seating Chart Planner 1080012173 (36), Seated 1601137387 (21), Wedding Planner - Seat Maker 6748284141 (17), Seating-Chart 1168889153 (10), Table Tailor 1615013728 (5), Seatsy 6754024790 (1). Dates 2016-09 to 2026-09.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. November event-seating demand (Pitch 7, Seatsolve), scrolls sideways" style="--tw:640px" markdown="1">

| Occasion named in the review (hand-read) | Reviews |
|---|---|
| Wedding | 12 |
| Birthday party | 5 (one says "small party", 1168889153, 2019-08-28) |
| Dinner party or group dinner | 4 |
| Professional event planner using it for work | 4-5 |
| Bar mitzvah | 2 |
| Corporate events / mixers | 2 |
| Fundraising events (closest to a gala) | 1 |
| Fashion show | 1 |
| **Holiday party, Christmas party, gala** | **0** |

</div>


Listen to this: "A superb tool for seated events! ... especially for fundraising events. What a delight to be able to share proposed plans with committee members" (Seated, 2022-01-18). And: "Seat maker really helped me with the planning of my dinner party" (Seat Maker, 2025-07-25). Non-wedding use is real: named non-wedding occasions (15 reviews) outnumber weddings (12) in this sample. But they are small parties, birthdays and dinners, not holiday parties or galas.

Review months, all 90: Jan 10, Feb 9, Mar 5, Apr 8, May 4, Jun 6, Jul 16, Aug 7, Sep 14, Oct 4, **Nov 3, Dec 4**. November and December <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> 7 of 90 (8%), below the even share of 15%. A review date is not an event date, and the RSS sample is small, so this is weak. It does not show a November rise.

**b. The Better Seater thread** (https://news.ycombinator.com/item?id=38845650, 106 comments, all read by keyword then by hand). Non-wedding needs: 38846516 (tried to write a general "banquet hall/dinner/wedding" solver), 38846964 (classroom placement), 38851619 ("We would use this in a corporate environment, for networking dinners etc."), and one piece of advice to sell to hotel group-events planners (38853535). **Holiday party or gala: 0 of 106.**

**c. Who runs galas.** Store search "gala seating" returns organisation-branded attendee apps (Valero Holiday Gala 6469605777, RMHF Gala 6813494205), not planning tools. Galas are run by committees and paid planners with their own tools. That buyer is the "planner tier" the pitch leaves out of version 1.

**d. The field is more crowded than the pitch says.** A broader store search today (7 terms: event seating chart, seating chart maker, table planner, gala seating, party seating chart, banquet seating, seating plan) found **21 non-classroom seating-chart apps released between 2025-09 and 2026-09**. PITCH-7 counted eight. Among them: Table Zen, Wedding Seating Chart Maker 6753326000, SnapSeat, Seatsy (16 ratings, the most of the new ones), reSeated, SeatFlow, Seatbee, Placecard, SeatCraft, ChartSeats, Tablecharm, Seatly (two apps of that name), Seating Chart - Table Planner, Tablee, Wedding Seating Chart: Compare, Seatful, The Best Tables, Headtable, and Seated: Event Seating Chart (6813048333, 2026-09-30, an "event" positioning). Three more are classroom tools (SeatMaker, SeatMyClass, sekigae sensei). Raw search files were not kept. This list is from the iTunes Search API run at about 16:05 ET.

**Reading.** People do seat parties, dinners, bar mitzvahs and fundraisers with these apps, so "events" is a fair second audience. I found no counted evidence of a November holiday-party or gala <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>. The direct sources (Trends, The Knot) refused us, and the proxies show none (0 of 90 reviews, 0 of 106 comments). The pitch's own line stands: "I do not know the November <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> size." I would add: the proxies lean against a November lift, not toward it.

## 4. Effect on the scores (one line each)

- **Seatsolve (Pitch 7):** market need stays 3 for weddings, but nothing supports a November holiday or gala lift (0 of 196 mentions). <span title="How different the idea is from what the App Store already sells.">Novelty</span> stays 2 at best: the 2025-09 to 2026-09 entrant count is 21, not 8, so 4.3(b) risk goes up.
- **Themecount (Pitch 8):** market need stays 2 and is now counted: 0 askers in 1,459 HN comments and 0 Ask HN posts, against 12 builder posts with a median of 2 points. Novelty drops from 3 to 2: ReviewHeron (129 EUR one-time, local Mac) and App Feedback Hub ($9.99 Mac) already hold offline, one price, on the Mac. Profitability stays 3: Appbot is $49-$59/month minimum and exports only from $166/month, so $19.99 once is a real price edge.

My conflict of interest on Themecount stands (declared in passes 5 and 6). These counts go against my own wish, and I am reporting them as counted.

## Open
- Indie Hackers and r/iOSProgramming are still unread (403). That needs a source the Investors can open, or it stays a gap.
- November lane size: a Google Trends read by an Investor ("seating chart" US, 5 years, month by month) would settle in a minute what I cannot fetch.
- ReviewHeron and AppReviewAI: read the full feature pages before any Themecount build decision.
{% endraw %}

</div>
