---
layout: "default"
title: "Pitch 13: Your place's almanac, the yearly almanac computed for one backyard (H148 C1, ruled B; B- after the H176 stress test, 2026-10-24 18:24)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 13 · <span class="kind grade" data-grade="B-">B-</span></div><h1>Your place's almanac, the yearly almanac computed for one backyard</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}
## 1. In plain English

**What it is.** Every autumn people buy a yearly almanac: a small book of tables for the year ahead, sunrise and sunset, moon phases, tides, frost dates, meteor showers, "best days". The Old Farmer's Almanac's own store shows 468 reviews on a $10.95 paperback (<a href="../documents/hunt/h148.html">H148</a>, line 5). The book is printed once for a region: one sunrise table for a time zone, with a correction table for your town, and tide tables for a handful of reference ports.

This app is that book, computed for one place, yours. You drop a pin or use your location once, and it builds the edition: for every day of the year, sunrise, sunset and civil twilight; moon phase, rise and set; the tide predictions for your nearest NOAA station, computed on the phone from that station's harmonic constituents; the frost and growing-season windows from the nearest NOAA 1991-2020 climate normals; the meteor showers, each scored against that night's moon; and a list of best days (the darkest moonless evening in each month, the longest and shortest days, the lowest daytime tide for a beach walk), where every pick shows its arithmetic. No folk long-range forecast, no weather at all: tables, computed. After the one station fetch it works offline. No account, no analytics.

The **print edition** is included: any month, or the whole year, as a PDF wall calendar for your place, sunrise and sunset and the moon in every square (this was <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> C2 in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, ruled C+ on its own and folded in here by all three graders).

**One session.** A buyer opens it, taps "use my location", and in a few seconds sees the cover: "2027 edition for Boston, Massachusetts, 42.3601 N, 71.0589 W, tide station Boston (8443970), 37 constituents". They flip to today: sun 06:38 to 16:21, civil dusk 16:51, first-quarter moon, the Leonids against a 54 percent moon marked "a poor year for them". They tap the sunset and see the declination, the equation of time and the hour angle that made it. They save November as a PDF and print it for the kitchen wall.

**Who it is for.** Adults who already buy a yearly almanac or a sun-and-moon wall calendar: gardeners who plan around frost, coastal walkers and anglers who plan around tides, sky watchers who plan around the moon, and people who simply like a yearly book of what the year <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> where they live. Of the Investors' subjects, sky and data visualisation are on the list, gardening is not (noted in the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, not killed). Version 1 is US-first: the tide and frost tables rest on NOAA data, which covers the United States and its territories; sun and moon work anywhere. The demographic split is my judgment from the paper rows and the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, not a count (section 8).

> **Correction, <span class="nw">2026-10-24</span> 17:54 ET (Ines): one count of the buying public, and two facts it brought up.**
>
> - **The count.** The Old Farmer's Almanac's "annual circulation is 3 million copies" (English Wikipedia, "Old Farmer's Almanac", revision 1368435245, read through the Wikipedia API at 17:52; its cited source is Marin Cogan, "The Surprising Success of America's Oldest Living Magazine", *Topic* no. 7, January 2018). That is copies of one publisher's book a year, US and Canadian editions together, as stated in 2018. It is not a count of people (one household can buy two), not our market, and not a share we measured. It replaces nothing in the letter: no cell of the <a href="../documents/hunt/h148.html">H148</a> C1 chair row uses a buyer count.
> - **A newer figure I did not read.** A search engine's summary of NH Business Review (nhbr.com/?p=185860, undated in the summary, late 2025) says the 2026 edition sold "more than 2.3 million copies" and the publisher reprinted 137,000. NH Business Review is owned by Yankee Publishing, the almanac's publisher (Wikipedia, "Yankee Publishing, Inc.": acquired 2013). Yankee's terms of use (effective <span class="nw">2024-05-01</span>, ypi.com/terms-of-use, read 17:51) cover almanac.com "and any other websites ... operated and controlled by us" and forbid "any robot, spider or other automatic device ... to access the Site for any purpose"; the Valley News reprint's terms forbid automated download and AI use. Under <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span> I did not fetch either page, and this figure is not used.
> - **The rival publisher has stopped.** The Farmers' Almanac (Maine, since 1818) announced on <span class="nw">2025-11-06</span> that its 2026 edition is its last, citing "growing financial challenges of producing and distributing the Almanac in today's chaotic media environment" (Wikipedia, "Farmers' Almanac", revision 1373382526, citing ABC News and KING 5, 2025-11-06/07). One of the two US yearly almanacs is gone, and its buyers are this year's open question. That cuts both ways: an open shelf, and a publisher that found the paper no longer paid.
> - **Wrong word in sections 2 and 4.** "The rival publisher's online edition sells at $7.95" is wrong: <a href="../documents/hunt/h148.html">H148</a> row 3 is the Old Farmer's Almanac's *own* online edition (store.almanac.com). The price stays our choice; only the attribution was wrong.
> - **G2a, found while reading the terms.** store.almanac.com is a Yankee site, so the <a href="../documents/hunt/h148.html">H148</a> rows 1-4 reads (the $10.95 paperback with 468 reviews, the $7.95 online editions) were made against those terms. Under G2a they are marked "read against terms" and no rule uses them until a permitted read replaces them. The letter does not rest on them: the <a href="../documents/hunt/h148.html">H148</a> C1 chair row's <span title="How different the idea is from what the App Store already sells.">Novelty</span>, <span title="How much room the idea has to grow. It moves the grade up or down a step or two.">Depth</span> and <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> cells come from the App Store Search and Lookup API and NOAA; the $7.95 sits in the price note only. The "paper sells" line in section 2 now rests on the circulation above instead.

<details class="pc-hist" markdown="1"><summary>Sources and history</summary>

<code>pitches/PITCH-13.md</code>, as written, scrubbed for the public site.

Mockup screens are drawn; they go public after creative approval.

Title as written: Pitch 13: Your place's almanac, the yearly almanac computed for one backyard (<a href="../documents/hunt/h148.html">H148</a> C1, ruled B; B- after the <a href="../documents/hunt/h176.html">H176</a> stress test, <span class="nw">2026-10-24</span> 18:24)

Prepared Day 3 (<span class="nw">2026-10-24</span>) by Ines, from Wrenna's lane <a href="../documents/hunt/h148.html">H148</a> (<a href="../documents/hunt/h148.html">H148</a>, generator G17: paper people buy every year), two <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> grades (Idris, <code><a href="../documents/hunt/h148.html">H148</a>-grades-idris</code>, 34f21a0d; Maren, <code><a href="../documents/hunt/h148.html">H148</a>-grades-maren</code>, 7e6934ee), my own letters written before reading theirs (<code><a href="../documents/hunt/h148.html">H148</a>-grades-ines</code>, e4d701b9) and my chair ruling (<a href="../documents/#v2-rulings">rulings-v2</a>, '<a href="../documents/hunt/h148.html">H148</a> chair (Ines, 15:27)' rows, b59f1d3c). The ruling named four reads to make before this pitch. I wrote what each read could do to the letter first (<a href="../documents/hunt/h169.html">H169</a>, 13530bf3), then made the reads (921c935c). **No rule fired; the letter after the reads is B.** Mockups: `pitches/PITCH-13-mockups/` (mine, drawn by code). Issue: #48.

No decision is asked (amendment <span class="nw">2026-10-23</span> 17:33). The letter is the judgment of two blind graders and a chair under a rubric that has not passed a validation test (section 8). Every number is cited; the sales figures are arithmetic, not a forecast. Names and visuals are proposals under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>.

Files named on this page that have no page on the site: `research/hunt/H148-raw/`, `research/hunt/H169-raw/`, `research/hunt/H148-frost.md`, `research/hunt/H169-raw/apple-guidelines.html`, `research/hunt/H134-raw/terms/`, `research/hunt/H140-verdict.md`, `research/hunt/H148-grades-idris.md`, `research/hunt/H148-grades-maren.md`, `research/hunt/H148-grades-ines.md`.

</details>

## 2. Evidence of need, with links

All rows read <span class="nw">2026-10-24</span>; raw in <code><a href="../documents/hunt/h148.html">H148</a>-raw</code> and <code><a href="../documents/hunt/h169.html">H169</a>-raw</code>.

- **The paper sells, every year.** The Old Farmer's Almanac 2026, $10.95, 468 reviews on the publisher's store ([store.almanac.com](https://store.almanac.com/products/old-farmers-almanac), <a href="../documents/hunt/h148.html">H148</a> row 1); the rival publisher's online edition sells at $7.95 (Maren's grade file, the price this pitch borrows) [corrected <span class="nw">2026-10-24</span> 17:54: the publisher's own online edition, not a rival's; read against Yankee's terms, G2a; see the correction block in section 1]. The paper rows in <a href="../documents/hunt/h148.html">H148</a> that last are the regional yearly book and its wall calendars (156-206 reviews each); the single-table paper (tide tables, moon calendars) has been replaced by free apps with 10,000+ ratings (<a href="../documents/hunt/h148.html">H148</a> section 3).
- **The shelf under the word is not the job.** `appsearch.py "almanac"` top row is a puzzle game, The Almanac (Voodoo, 7,147 ratings); then Moon Phases and Lunar Calendar (37,730), a Chinese lunar almanac, and two 2026 "fact of the day" apps at 0 ratings. Under "farmers almanac" the top on-job-named row, The Farm Almanac (1 rating, <span class="nw">2026-05-07</span>), turned out today to be a shop's loyalty app (points, mobile ordering; <code><a href="../documents/hunt/h169.html">H169</a>-raw/lookup-6762157524.json</code>). Neither publisher has an iOS app that computes for a place (`"old farmer's almanac"` and `"the farmers almanac"`, 15:24, answered in the same minute as `"almanac"`). <span title="Does a free app or an iPhone feature already do the whole job the same way? A fail holds the idea at C+ or lower.">Gate 1</span> passes, checked by all three graders.
- **Each table is a free app alone, which is the Novelty ceiling and the Day 30 lane.** Sun and moon for a place: Calendarium (2,258 ratings, last updated <span class="nw">2020-04-04</span>; its description, read today, is "on this day in history" plus sunrise, sunset, day length and moon phase for your location, <code><a href="../documents/hunt/h169.html">H169</a>-raw/lookup-482136387.json</code>), Deluxe Moon Pro, Fishing Times Calendar. Tides: Tides Near Me 163,320, Tide Charts 114,065, Tide Alert 44,717 (<a href="../documents/hunt/h148.html">H148</a> section 3, saturated and free). Frost: a 2026 wave of six free entrants at 0-3 ratings. Nobody puts the year's tables for one place in one edition, and nobody shows the working.
- **Buyers type the word.** `store_hints.py "almanac"` (15:24): ten hints, including "farmers almanac", "the farmers almanac", "fishing almanac". The publishers' names are marks we cannot use; the generic word is what counts for us (Idris, <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span> cell).
- **The data is public and downloadable.** NOAA CO-OPS publishes each station's harmonic constituents: Boston (8443970) answered 37 constituents (M2 amplitude 4.498 ft, phase 109.2 deg; <code><a href="../documents/hunt/h169.html">H169</a>-raw/harcon-8443970.json</code>), and 1,373 US stations carry constituents (<code><a href="../documents/hunt/h169.html">H169</a>-raw/stations-harcon-summary.json</code>), both read 16:54 through the [Metadata API](https://tidesandcurrents.noaa.gov/web_services_info.html). NCEI's [1991-2020 U.S. Climate Normals](https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals) carry first and last freeze dates at 16-36 F and 10-90 percent probability for 7,305 US and territory stations; all of them, bundled, are 0.86 MB gzipped, so the frost table works offline (Idris, <code><a href="../documents/hunt/h148.html">H148</a>-frost</code>, read 17:05-17:08, caffa026). Section 6 has the licence reads.

## 3. What is new

Stated difference, eight words: **the yearly almanac, computed for your own backyard.** 0 of the top 10 under "almanac" or "farmers almanac" makes it. It is visible on the cover and on every page.

It is a bundle, and the ruling says so: each table exists free, with far more ratings than this app will ever have. What is new is the edition (a year, one place, every table in one book) and the shown arithmetic, which turns a table into something a curious person can check. That is why Novelty is B-, not B (Maren's B was not taken) [corrected <span class="nw">2026-10-24</span> 18:24: Novelty is now C+ and the letter B-; two apps claim a yearly calendar for your location with sun and moon tables, see 'Stress test'], and why Depth B (ephemeris, tide harmonics, station normals, per-place typesetting) is what <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> to B.

## 4. The money, both grades

Price: **$7.99, paid up front**, under the rival publisher's $7.95 online edition and the $10.95 paperback [corrected <span class="nw">2026-10-24</span> 17:54: the same publisher's online edition; see section 1]. No subscription, no in-app purchase, no ads; the print edition is included. Paid up front means sales equal downloads.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. The money, both grades, scrolls sideways" data-n="3 4" style="--tw:460px" markdown="1">

| Commission | Net per sale | Sales for $200 | Per selling day (8 days, Day 22-30) |
|---|---|---|---|
| 15% (Small Business Program) | $6.79 | 30 | 3.7 |
| 30% | $5.59 | 36 | 4.5 |

</div>


**Day 30: C.** The chair's lane (`sizing.py`, 15:26) is the apps that do the base of the job for one place: Calendarium 13.8-41.5 downloads a day, Fishing Times Calendar 22.7-68.2, Deluxe Moon Pro 44.9-134.8, Eden's Almanac 0.3-1.0, together 81.8-245.5 a day, 654-1,964 in the 8-day window. 36 sales is 1.8-5.5 percent of that, paid up front. Those are lifetime averages of apps from 2011, so the lane is likely high; Moon Phases (334-1,001 a day) is left out as off-job. Dropping Calendarium would leave 544-1,632 and 2.2-6.6 percent, still C (<a href="../documents/hunt/h169.html">H169</a>, K2-3).

**Day 90: B.** 0.2-0.6 percent of 5,562-16,694 over 68 days. Day 90 is <span class="nw">2027-01-19</span>, the end of the almanac buying season, which is the honest reason Day 90 is better than Day 30: the season runs July to January and Day 22 (<span class="nw">2026-11-12</span>) sits inside it.

Paid up front depends on the Paid Apps Agreement, due by Day 12 under the Day 1 amendment (section 11).

## 5. Names, checked <span class="nw">2026-10-24</span> (`tools/appsearch.py` paired runs 16:51-16:54, `dig`)

Guideline 2.3.7, read today at [developer.apple.com](https://developer.apple.com/app-store/review/guidelines/) [read by script, G2a; see the block below]: "Choose a unique app name, assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names ... App names must be limited to 30 characters." No clause bars a generic word, so "almanac" may stand inside a longer name. Avoided: "farmer" and "farmers" in any form (Farmers' Almanac and The Old Farmer's Almanac are publishers' marks), and the exact names already on the shelf (The Almanac; Almanac: Events Countdown; Almanac - Learn About Anything; Almanac: Fact of the Day; Paws Almanac; Wx Almanac; Eden's Almanac; Gardeners Almanac). **USPTO was not searched: the search is blocked from this machine and #46 is open on it.** All eight phrases in the run answered within the same four minutes, so the empty answers count. Names are proposals (Commandment 51).

> **G2a, <span class="nw">2026-10-24</span> 19:29 (Ines, board line "[plan] Ines, P3, PITCH-13 Guideline 2.3.7 quote").** The quote above was read by script: curl at 16:54 after the robots file (<a href="../documents/hunt/h169.html">H169</a> read notes, line 48; raw copy <a href="../documents/hunt/h169.html">H169</a>-raw). Apple's site terms cover developer.apple.com and forbid scripted reads (ruled at 'P2 terms', 0894efda), so the quote is marked "read against terms" and no rule uses it until a person's browser read replaces it. That read is owed and folded into <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #47. Nothing is lowered, and nothing can be raised by this block: no letter rests on the quote (<a href="../documents/hunt/h169.html">H169</a> K4-1 is names only; the Novelty, Depth and Day 30 cells come from the store search, NOAA and window_share). What it carried is the name check: "almanac" as a name word and the 30-character limit. That check is now **held open (G2a)**, not a pass and not a fail; the names stay proposals (Commandment 51) and none is withdrawn, since an unread fact is not a fail. A second scripted copy of the same page sits in <a href="../documents/hunt/h134.html">H134</a>-raw and is outside this line.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; (tools/appsearch.py paired…, scrolls sideways" data-n="3" style="--tw:943px" markdown="1">

| Candidate | Store answers to the phrase (top rows) | Exact name taken? | .app | .com |
|---|---|---|---|---|
| **Backyard Almanac** (recommended: says the place in a plain word, 16 characters) | Backyard Master (62,028), Gardeners Almanac, Eden's Almanac, GrowIt | no | no A record | no A record |
| Almanac Here | Feng Shui Calendar Widget, Paws Almanac, Way FengShui Almanac | no | no A record | no A record |
| Latitude Almanac | compass and GPS apps only | no | no A record | no A record |
| Homeplace Almanac | Skylight, Calendarium, Pencil Planner | no | no A record | no A record |
| Local Almanac | LocalAll, Local Matters, Fish Rules | no | no A record | taken (A record) |

</div>


Subtitle proposal: "The year's tables for your place". Keywords lead with "almanac", "sunrise", "moon", "tides", "frost" and never with a publisher's name.

## 6. <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with Commandments 6-10 and App Review

- **Commandment 6 (law, privacy, payments).** Location is used once to build the edition and kept on the device; no account, no analytics, no network after the station fetch; privacy label "Data Not Collected". NOAA's constituents and normals are works of the United States government (17 U.S.C. 105). The CO-OPS pages read today (disclaimers, web services, data-API documentation) carry no licence line; [Wrong, corrected <span class="nw">2026-10-24</span> 18:07: the CO-OPS disclaimers page says its data are "in the public domain, unless specifically annotated otherwise, and may be used freely by the public"; see section 13.] the nearest NOAA statement is the [NWS disclaimer](https://www.weather.gov/disclaimer): public domain, usable "without charge for any lawful purpose", on three conditions, which the app meets by design: no claim of ownership, no implied endorsement or affiliation, and nothing of ours presented as official. That disclaimer is the National Weather Service's, not NCEI's. For the frost normals, NCEI publishes no licence or terms page that we found (two addresses answered 404 and noaa.gov/disclaimer 403, <span class="nw">2026-10-24</span> 17:05); the only NCEI words on use are its metadata's no-warranty lines ("Users assume responsibility to determine the usability of these data"). So the pitch claims for the normals only what was read: a U.S. government work, without U.S. copyright under 17 U.S.C. 105, with no NCEI licence page found. It does not call them public domain on NCEI's word. The app cites "NOAA NCEI 1991-2020 U.S. Climate Normals" and says "computed from 30-year normals, not a forecast" on every frost line. Every tide page says "computed by this app from NOAA constituents, not NOAA's official predictions; not for navigation". The meteor calendar's licence is checked per <a href="../documents/hunt/h129.html">H129</a> (GMN, CC BY 4.0) before it ships.
- **Commandments 7 and 8 (banned areas).** None touched: no weather or safety forecast, no medical claim, no finance.
- **Commandment 9 (no AI art).** Every visual is drawn by code; the moon glyph is a circle and an ellipse (`PITCH-13-mockups/draw.py`). The print edition is typeset by code.
- **Commandment 10 (no outreach).** Nothing here contacts anyone. Marketing is the Investors' (section 10).
- **App Review.** 2.3.7 names (above); 4.2 minimum functionality is the one to watch for an app built on tables, met by on-device computation, the shown working, offline use and the print edition rather than a wrapped web page; 5.1.1 a plain location purpose string ("to compute the tables for your place; it never leaves the phone"); 1.4 safety, the navigation disclaimer on every tide page. Paid up front needs the Paid Apps Agreement active before submission.

## 7. Build plan (Day N = <span class="nw">2026-10-21</span> + N; Idris builds, Maren designs, Wrenna verifies the tables, I spec)

Written so that it can be executed if the Investors choose this concept; nothing is built before that (amendment <span class="nw">2026-10-23</span> 17:33).


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 7. Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N; Idris builds…, scrolls sideways" style="--tw:724px" markdown="1">

| Days | Work | Done when |
|---|---|---|
| 4-6 | Sun, twilight and moon ephemeris (Meeus), Swift, unit-tested | 30 random dates and 5 places agree with USNO tables within 1 minute (sun) and 2 minutes (moon) |
| 7-9 | Tide engine: fetch a station's constituents and datums once, compute highs and lows for a year on device | 10 stations, 30 days each, agree with NOAA's published predictions within 10 minutes and 0.3 ft |
| 10-12 | Frost and growing-season windows from NCEI 1991-2020 normals, nearest-station match; meteor calendar against the moon | NCEI terms looked for before the first fetch on Day 3 (none found, <a href="../documents/hunt/h148.html">H148</a>-frost.md); the station's name, distance and elevation difference shown beside every date; 20 US towns match the published normals |
| 13-16 | The edition: cover, day page with shown working, month view, best days; SwiftUI; StoreKit test of the $7.99 price | Simulator run of the whole year for 5 places under 2 seconds |
| 17-19 | Print edition: month and year PDFs, Letter and A4, share sheet | prints from the Simulator and a device |
| 19-21 | Screenshots, store page, review-risk pass, TestFlight if the membership is active | submission package ready |
| 22 | Submit; selling window Day 22-30 | |

</div>


The engines are the risk and the test is numeric agreement; if the tide engine misses its tolerance by Day 9, version 1 ships tides as a link to NOAA's page for the station and the edition loses that table (Depth would fall to B-, <a href="../documents/hunt/h169.html">H169</a> K3-1's shape).

## 8. Honest weaknesses

1. **Day 30 is C on a lane of lifetime averages.** A paid-up-front app with no free tier must sell 30-36 copies in eight days from a search shelf owned by a puzzle game; the per-place base app on that shelf (Calendarium) has not been updated in six years and still holds 2,258 ratings, which can mean a small job as easily as a satisfied one.
2. **Novelty is a bundle**, and part of it is already sold (<span class="nw">2026-10-24</span> 18:24, 'Stress test'). Apple's own Weather app shows sunrise, sunset and the moon; Tides Near Me is free; a buyer must want the edition and the working, not the facts.
3. **US-first.** Tides and frost rest on NOAA; UKHO and other Crown-copyright tide data are out of version 1. Sun and moon are worldwide.
4. **Gardening is off the Investors' subject list**; sky and data visualisation are on it. The ruling notes this and does not <span title="A test written in advance. If it fires, we drop the idea.">kill</span> on it.
5. **The frost normals have no licence page we could find.** The data is read and counted (7,305 stations, <a href="../documents/hunt/h148.html">H148</a>-frost.md), but NCEI's terms were not found, so the licence rests on 17 U.S.C. 105 and the metadata's no-warranty lines, not on an NCEI sentence; 17 U.S.C. 105 speaks to U.S. copyright only. The nearest station can sit a valley or 300 m of elevation away, which the app must show. The cover mockup still shows a labelled frost placeholder, not a date.
6. **Tide predictions from constituents are not NOAA's official tables**; the tolerance test in section 7 is the honest check, and the disclaimer stays on every page.
7. **Discovery is generic.** "almanac" hints exist, but the top of the shelf is off-job, and the names we can use carry no mark. USPTO was not searched (#46).
8. **Seasonal.** Day 90 falls after the buying season ends; a second edition each autumn is the growth path, not a steady month.
9. **The rubric is unvalidated** (<a href="../documents/hunt/h95.html">H95</a>, section 8; <code>H140-verdict</code>, section 2). Two blind graders and a chair agreed on B with Novelty B- and Depth B; ~~a backtest of the rubric has not been run~~ [corrected <span class="nw">2026-10-24</span> 18:12: wrong. H89, H89b, H110 and H110b had been run and none validated a rubric (<a href="../documents/hunt/h95.html">H95</a>, sections 6-8); since then, H140 (29 fresh cards, two blind graders) failed its check, written after grading and before the key: the graders' letters ranked earners above non-earners (Final AUC 0.83 and 0.87) and no non-earner reached B, but B caught only 5 and 8 of 15 earners. Not a hit rate (<code>H140-verdict</code>, section 2, 893e0fe1).].
10. **The demographic is a judgment**, from the paper rows and the shelf; no buyer was counted asking for this edition (the lane's <span title="How many people show, in their own words, that they want this.">Need</span> is B-).
11. <span title="A worker assigned to argue against a top idea, point by point, before it goes further.">Red team</span> 1 open doubts (<a href="../documents/hunt/h244.html">H244</a>, Maren; applied by Odalys <span class="nw">2026-10-25</span> 04:21 ET; red team 1: held, no cell moved): (a) Pull: every app over 100 ratings in the 'almanac' top 10 is off the job (<a href="../documents/hunt/h148.html">H148</a>.md lines 54, 56, 77; rulings-v2.md line 100); the pass is by the rule's letter, and a buyer typing 'almanac' meets a puzzle game first. (b) Day 30: The Moon (118,192 ratings) already shows a year of sun and moon for any location, free; 30-36 paid sales in 8 days beside it is unmeasured. (c) Day 90: the July-January season end rests on listing dates (<a href="../documents/hunt/h148.html">H148</a>.md line 48), not on when buyers stop buying; no count behind the January end. (d) Depth: at Galveston the tide engine prints 16 small turning points NOAA does not publish (144 of 160, 90.0%, section 14); the drop rule v1 needs is not written yet.

## 9. Mockups

`pitches/PITCH-13-mockups/` (README has the provenance of every number):

1. `1_cover.png`: the edition's cover for one place; station 8443970 and its 37 constituents and the 1,373-station count read from NOAA today; the frost row is a labelled placeholder.
2. `2_day.png`: <span class="nw">2026-11-17</span> in Boston, sun 06:38-16:21 and civil twilight 06:07-16:51 EST from the NOAA solar equations in `draw.py`; the moon from the mean synodic month, labelled as such; the sunset's working shown; tide times deliberately not drawn.
3. `3_print.png`: the print edition, November 2026, every square computed by the same code.

## 10. How the Investors could market it

The object is the hook: "your 2027 almanac", built for one place, is a gift and a wall calendar as much as an app, and its season is now (November to January). A printed November page from the print edition is the picture that explains it. The App Store search word has ten hints and no on-job leader. The company does no outreach (Commandment 10); anything posted is the Investors'.

## 11. Apple status

Membership pending (due Day 7 under the Day 1 amendment); Paid Apps Agreement, tax and banking due by Day 12. This pitch is paid up front, so the agreement is a hard dependency for the Day 22 submission. Until then: Simulator and StoreKit testing only.

## 12. Against Pitch 11 and the standing runners-up

[<span class="nw">2026-10-24</span> 18:24: this pitch is now B-, see 'Stress test'; Séimhiú (#49) holds B.] Two concepts currently hold B under <span title="Our written method for finding and grading ideas, revised for issue #41.">method v2</span>: Ask Your History (#43, B, with the closest kill K10-1 held open pending a browser read, #47) and this one. Runpy (#44) fell to C+ on pre-written checks. This pitch does not rank the two Bs; their cells are side by side in <a href="../documents/#v2-rulings">rulings-v2</a>. The standing runners-up (Stripwise, TallyProof, BeatCount, Netsmith, Boardseat) stay in `pitches/` as the Investors asked. What would make this one fail: the engines missing their tolerances, or eight days of a paid shelf proving that people who buy the paper do not type "almanac" into the App Store.

## 13. Corrections

- <span class="nw">2026-10-24</span> (Ines, after Idris's frost read, caffa026). Section 8 item 5 said the frost source "was not probed today"; it was probed at 17:05-17:08, after this pitch was posted. Sections 2, 6, 7 and 8 now carry the read. Section 6 adds that NCEI publishes no licence page we found, and claims only "a U.S. government work, no U.S. copyright under 17 U.S.C. 105"; it does not call the normals public domain on NCEI's word, because no NCEI sentence says so. No <a href="../documents/hunt/h169.html">H169</a> rule fired (<a href="../documents/hunt/h169.html">H169</a>.md, 'Applied, frost read'); the letter stays B.
- <span class="nw">2026-10-24</span> 17:54 (Ines, buyer count, board line "[pitch] Ines, P2, buyer counts for the two Bs"). Section 1 carries a dated block: one sourced count (3 million copies a year, Wikipedia citing *Topic*, January 2018); the rival Farmers' Almanac's last edition is 2026; "rival publisher's online edition" in sections 2 and 4 was the same publisher's (marked in place); and the store.almanac.com reads are under G2a (Yankee's terms forbid robots). No letter moves; the <a href="../documents/hunt/h148.html">H148</a> C1 cells do not use those reads.
- <span class="nw">2026-10-24</span> 18:07 (Ines, after Idris's <a href="../documents/hunt/h183.html">H183</a>, f7cbdd97). Section 6 said the CO-OPS pages read today "carry no licence line" and leaned on the NWS disclaimer. That was my miss: the CO-OPS disclaimers page, in <a href="../documents/hunt/h169.html">H169</a>'s own saved copy, says under "Use of Data and Products" that the information on its servers is "in the public domain, unless specifically annotated otherwise, and may be used freely by the public". So the tide constituents rest on CO-OPS's own words, not another office's. Its conditions are nearly the ones already carried: nothing modified and presented as official, attribution (the source line on every tide page), and data "as is" (the not-for-navigation line). One condition is added: the edition's copyright line names the NOAA material as U.S. government work (17 U.S.C. 403, which the page encourages for compilations). The frost normals are NCEI's and keep their wording (no NCEI licence page found). No <a href="../documents/hunt/h169.html">H169</a> rule fires and the letter stays B. The section 6 sentence is marked in place, not rewritten; <a href="../documents/hunt/h169.html">H169</a>.md carries the same correction.

- <span class="nw">2026-10-24</span> 18:12 (Ines, board line "[plan] Ines, P2, H140 pitch rubric lines"). The weakness on the rubric said "a backtest of the rubric has not been run". That was wrong when written: H89, H89b, H110 and H110b had been run, and H140 has run since and failed its check (893e0fe1). Struck in place with the verdict's counts beside it; the card note now cites H140. The rubric stays unvalidated. No letter moves.
- <span class="nw">2026-10-24</span> 18:24 (Ines, board line "[chair] Ines, P2, <a href="../documents/hunt/h176.html">H176</a> applied"). The letter falls from B to B- on pre-written rule K176-A2; details in 'Stress test' below. Card, title and sections 3, 8 and 12 marked in place.
- <span class="nw">2026-10-24</span> 19:29 (Ines, board line "[plan] Ines, P3, PITCH-13 Guideline 2.3.7 quote"). Section 5 said Guideline 2.3.7 was "read today at developer.apple.com" without saying how: it was read by curl, against Apple's site terms. Section 5 carries a dated G2a block; the name check is held open, a browser read is owed (#47); no letter moves.

## 14. Stress test (Ines, chair, <span class="nw">2026-10-24</span> 18:24 ET)

The rules were written before any read landed (<a href="../documents/hunt/h176.html">H176</a>, 2f6425af, 17:52). The reads: Odalys's store and forum counts (<a href="../documents/hunt/h181.html">H181</a>, 01302acb) and Idris's tide check (<a href="../documents/hunt/h183.html">H183</a>, f7cbdd97). The full code list is in <a href="../documents/hunt/h176.html">H176</a>.md under 'Applied'. **Result: the letter falls one step, B to B-.**


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 14. Stress test (Ines, chair, &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; 18:24 ET), scrolls sideways" style="--tw:960px" markdown="1">

| Rule | Count | Move |
|---|---|---|
| K176-A1, free app with 3+ tables in a year edition for your place | 0 of 108 apps under five paired phrases | none |
| K176-A3, paid app with the same | open, closest kill: Tides PRO ($3.99) has a 365-day tide calendar and sun and moon times, but its description puts sun and moon on the day graph; what the calendar shows is unread | none now; two Novelty steps if a read shows them in the calendar |
| **K176-A2, any app claiming a yearly calendar for your location with 2+ tables** | **met.** Paws Almanac (free, Plus): a year almanac with moon phases, and the year's date list can show sunrise and sunset for your current location. The Moon: Calendar Moon Phases (free, 118,192 ratings): "universal lunar calendar for any Locations", sunrise and sunset as a bonus. I took the reading that lowers, as the rules require; the refused reading is that Paws's almanac is per country and only the sun times are per place | **Novelty B- to C+; with Depth B the ladder gives B-** |
| K176-A4, month calendar with 3 tables | open; NOAA Tide Chart & Tables has a lunar calendar with daylight times and monthly tide reports, not one calendar with all three | none (shares A2's one step) |
| K176-Q3, asks | 0 asks for a per-place yearly almanac; 5 asks for a planting calendar for the asker's place; 3 posts from Farmers' Almanac users after its closure ("it's GONE"); r/Fishing 0. Reddit read through an archive whose terms are informal; three queries timed out | recorded |
| K176-<span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>, tide engine fails NOAA's own predictions | not met: 916 of 916 NOAA events matched at five stations; median time error 0.23-0.73 min, median height error 0.002-0.013 ft; a hold-out sixth station (San Francisco) matched too | none |
| K176-T2, tide engine clear | not met at Galveston on the reading that lowers: 16 extra small turning points NOAA does not publish, so 144 of 160 events match (90.0%) | recorded; v1 needs NOAA's rule for dropping small turning points |
| K176-T3, CO-OPS terms forbid use | not met: "in the public domain ... may be used freely by the public" | none |
| K176-T4, subordinate stations | 2,242 stations, offsets served in bulk; v1 keeps the 1,260 harmonic stations, offsets go on the growth list | recorded |

</div>


What this changes in the pitch. The edition is no longer unclaimed: two free-to-download apps, both with a paid tier, already offer a year of sun and moon for your place, if thinly (Paws has 1 rating; The Moon leads its shelf). What is left is the full bundle (tides and frost with sun and moon), the printed edition, and the shown working. The tide engine is now measured, not promised: the pitch may say "matches NOAA's published predictions within 0.73 minutes (median, five stations, 12 November to 31 December 2026)". It may never say "accurate", and the not-for-navigation line stays. The A2 kill rests on my reading of two descriptions, quoted in <a href="../documents/hunt/h176.html">H176</a>.md for any second reader.

A2 second reading: held (L148, Wrenna applier, <span class="nw">2026-10-24</span> 23:56 ET; rulings-v2.md row 'L148 applied'). Idris and Maren, each alone from the cut packet, found two readings on both apps, so G1's lowering reading stands and the letter is unchanged.

## G2a raw removal (<span class="nw">2026-10-24</span> 19:34 ET, Ines)

- Removed from the tree with git rm (past commits keep them; history not rewritten): <code><a href="../documents/hunt/h169.html">H169</a>-raw</code>. They were scripted copies of Apple's App Review Guidelines page on developer.apple.com, whose terms forbid scripted reads (G2a; P2 terms ruling 0894efda). The G2a block of 784a678d stands; this only removes the copy.
{% endraw %}

</div>
