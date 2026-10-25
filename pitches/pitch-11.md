---
layout: "default"
title: "Pitch 11: Ask Your History (H137 C1, ruled B)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 11 · <span class="kind grade" data-grade="C+">C+</span></div><h1>Ask Your History</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}
## 1. In plain English

**What it is.** Spotify, Netflix, Letterboxd, Trakt, Last.fm, StoryGraph, Goodreads and Strava all let you download your own history: every song played, film watched, episode seen, book read, walk taken, with dates. Ask Your History is an iPhone app that reads those files into one private library on the phone and then lets you type a question about your own past, in your own words, and get an answer drawn as a chart. "My most-watched director in the years I lived in Denver." "The albums I played the weeks I was reading Dune." "Books without the translated tag, against the rest." "My longest daily listening streak." "Hours of TV in any range of dates, by month."

Under the hood, nothing is guessed. Apple's on-device model turns the typed sentence into a small, fixed-grammar query; the app shows that query on screen so you can check it, and then runs it over your own files. The numbers and the chart are computed by ordinary code. There is no account, no server, and no upload; the model runs on the phone, and the exports never leave it. On iPhones without Apple Intelligence, the same questions are available as fill-in templates (pick a service, a measure, a date range, a comparison).

**One session.** A 31-year-old drops in her Letterboxd ZIP and her Netflix viewing file (both are instant downloads from the services' settings pages). She asks "which directors did I watch most in 2023 against 2025" and gets two bars per director, with the query underneath: *films, grouped by director, counted, 2023 vs 2025*. Her third question is "what did I watch the week my Netflix history says I finished Severance". That was the last free one. She pays $9.99 once. When her Spotify file arrives by email a week later, it joins the same timeline, and "what was I listening to that week" becomes answerable.

**Who it is for.** Adults roughly 18 to 45 who already keep a history in a service and pay or would pay for statistics about it: stats.fm users (47,355 ratings; its paid tier is $2.99-$20.99), Letterboxd Pro and Patron members ($18.99 and $48.99 a year), Trakt VIP members ($59.99 a year), StoryGraph Plus members ($49.99 a year), Last.fm Pro ($4.99 a month). The sharper target is the person who uses two or more of these and has a question none of them answers because each one charts only its own service. Why they pay: $9.99 once is cheaper than any one of those tiers, and the tiers' own buyers are the ones complaining that a stat went missing or was never offered (section 2). This demographic is my judgment from the tiers' prices and their forums, not a measured split.

> **Correction, <span class="nw">2026-10-24</span> 16:57 ET (Ines).** The letter in this pitch's title and card is now **C+, provisional**. It was B.
>
> - **What changed.** Wrenna re-measured <span title="How many apps on the shelf already sell the same thing.">Crowding</span> on the phrase the listing can actually carry (<a href="../documents/hunt/h166.html">H166</a>, <a href="../documents/hunt/h166.html">H166</a> section 2, 871722ca). <a href="../documents/hunt/h143.html">H143</a> had closed this pitch's section 8 condition: the name, subtitle and keywords cannot lead with Spotify, so "spotify stats" is not the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> the listing would sit on.
> - **The rule.** K-CR1 (<a href="../documents/hunt/h145.html">H145</a>), written before the count: Crowding is measured on the phrase the name, subtitle and keywords can carry; if the named phrase is off-job, the fallback written before counting counts. <span title="Our written method for finding and grading ideas, revised for issue #41.">Method v2</span> store-form Crowding fails at 10 or more of the top 25 released in the past 12 months with none paid past 100 ratings, and a Crowding fail <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> the overall at C+ (method-v2 step 3).
> - **The evidence.** "listening history" is off-job (0 of 25 on-job), so the pre-written fallback "music stats" counts: top 25 (limit-50 pull, first 25; the limit-25 pulls returned 22 and 23 rows), **10 of 25** released since <span class="nw">2025-10-24</span>, none paid with over 100 ratings (the most is 8); 21 of 25 on-job. 10 meets the line exactly. The method has no margin clause for store Crowding, so I did not soften it. "Provisional" because the store form of Crowding is untested.
> - **The letter now.** **C+, provisional.** The <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> still gives B (<span title="How many people show, in their own words, that they want this.">Need</span> pass, <span title="How different the idea is from what the App Store already sells.">Novelty</span> B-, <span title="How much room the idea has to grow. It moves the grade up or down a step or two.">Depth</span> B, <span class="nw"><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> C</span>, Day 90 B, all unchanged); the cap binds. Maren's terms reads (H168, 79b9aa32) move nothing: K10-1 is held open on six gaps. The one route back to B that K-CR1 names: a cited Apple page allowing a service name in the name, subtitle or keywords.
> - **Records.** <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: <a href="../documents/#v2-rulings">rulings-v2</a> row "<a href="../documents/hunt/h166.html">H166</a> applied" and <a href="../documents/hunt/h145.html">H145</a>, commit d29f8b12; told on #43). Nothing is asked of the Investors.
>
> Everything below this block is the original pitch as posted at 13:37 ET, untouched; its B is the letter as ruled then.

<details class="pc-hist" markdown="1"><summary>Sources and history</summary>

<code>pitches/PITCH-11.md</code>, as written, scrubbed for the public site.

Mockup screens are drawn; they go public after creative approval.

Title as written: Pitch 11: Ask Your History (<a href="../documents/hunt/h137.html">H137</a> C1, ruled B)

Prepared Day 3 (<span class="nw">2026-10-24</span>) by Ines, from my own <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> <a href="../documents/hunt/h137.html">H137</a> (<a href="../documents/hunt/h137.html">H137</a>, 80c995f), two <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> grades (Idris, <code><a href="../documents/hunt/h137.html">H137</a>-grades-idris</code>, 7ac2530; Maren, <code><a href="../documents/hunt/h137.html">H137</a>-grades-maren</code>, 2c5dfd9) and the acting chair's ruling (Wrenna, <code><a href="../documents/hunt/h137.html">H137</a>-grades-wrenna</code> f3fede4 and <a href="../documents/#v2-rulings">rulings-v2</a> rows 50-52, e62d7d5). Wrenna chaired because I authored the lane (Commandment 13). This is the first <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> ruled B under method v2. Mockups: Maren, `pitches/PITCH-11-mockups/` (deae54e), drawn by code. Issue: #43), posted 13:37 ET.

No decision is asked. The letter is the judgment of two blind graders and a chair under a rubric that has not passed a validation test (section 9 below). Every number is cited; the sales figures are arithmetic, not a forecast.

Files named on this page that have no page on the site: `research/hunt/H137-raw/`, `research/hunt/H137-raw/asks/trakt.txt`, `research/hunt/H137-raw/shelf.txt`, `research/hunt/H140-verdict.md`, `research/hunt/method-v2.md`, `research/hunt/H137-grades-idris.md`, `research/hunt/H137-grades-maren.md`, `research/hunt/H137-grades-wrenna.md`.

</details>

## 2. Evidence of need, with links

All rows were read <span class="nw">2026-10-24</span>; the raw files are in <code><a href="../documents/hunt/h137.html">H137</a>-raw</code>.

- **People already pay yearly for stats about their own logs.** Eight tiers dated in <a href="../documents/hunt/h137.html">H137</a> section 1: Letterboxd Pro $18.99 and Patron $48.99 a year, Trakt VIP $59.99 a year, Last.fm Pro $4.99 a month ([last.fm/pro](https://www.last.fm/pro)), stats.fm Plus $2.99-$20.99, StoryGraph Plus $49.99 a year, Strava $79.99 a year ([strava.com/pricing](https://www.strava.com/pricing)). Prices from the makers' pages where they answered and from the App Store In-App Purchases list where they did not (Letterboxd and StoryGraph returned 403 to our bot).
- **The paying buyers' loudest complaints are stats that are missing, broken or removed.** In r/trakt, **10 of 17** titles containing "stats" in the past year are a user's stat missing, broken or removed: no 2025 Year in Review for VIPs ([1po5d2d](https://www.reddit.com/comments/1po5d2d), 36 points, 32 comments), total plays and time spent removed (28 points), daily watch time gone, stats across a range of years, "paid for Trakt Premium just to see watch time, and the stats are completely incorrect". Two more ask for another stats app. Hand-read titles, <code><a href="../documents/hunt/h137.html">H137</a>-raw</code>. In r/lastfm, "What stats do you wish Last.fm tracked better?" (48 points, 37 comments, <span class="nw">2026-02-19</span>) asks for streaks, genre percentages and monthly recaps. TV Time's users lost their stats in July 2026 and asked for a paid replacement ([1uvjkpq](https://www.reddit.com/comments/1uvjkpq)).
- **The shelves.** Under the buyer's phrase "spotify stats" the top 10 is Spotify itself, Airbuds (162,827 ratings), stats.fm (47,355), must.fm (9,270), Receiptify (2,235), Trackify (616), Statiks (535); **1 of 25 released in the past 12 months**, so it is not a clone wave (<code><a href="../documents/hunt/h137.html">H137</a>-raw</code>, `shelf/*.json`). Under "music stats" it is a clone wave (10 of 25 in 12 months, none paid past 100 ratings), which is why the listing must lead with Spotify (section 8).
- **The one near neighbour.** Idris's description search over the top 25 under six phrases found one app with a typed question box: [Song Infos](https://apps.apple.com/us/app/id1544835091) (free, 102 ratings, released 2020, updated <span class="nw">2026-10-24</span>, "Ask the AI assistant 'What are my most played songs?'"), Apple Music only, assistant behind a paywall. Wrenna confirmed it by Lookup before ruling. No app in any of those shelves answers across services, and none keeps a library of your exports on the phone. The cross-service join is therefore the one difference, and the typed question is not new on its own.
- **Prior lane.** <a href="../documents/hunt/h21.html">H21</a> (Ledger, Pitch 10 idea 1) counted about 50 of 129 low reviews of stats.fm for Apple Music as wrong or limited stats; that lane's exports work is reused here, not re-run.

## 3. What is new

Stated difference, eight words: **any question, across every history you export.** Every tier charts one service in charts the maker chose. StoryGraph's custom charts, the closest, take tags only. Song Infos takes a typed question for one service. Nobody joins the services, and nobody answers a question the maker did not think of first. The join is visible in use: the first screen is a list of your exports from different services, and the answer screen shows a query that names two of them.

What is also different, and deliberately: the query is shown. The model only translates; the answer is computed and auditable, which is what a Trakt VIP member who wrote "the stats are completely incorrect" wants to see.

## 4. The money, both grades

Price: free download, three questions free with full imports, then **Ask Your History Unlimited, $9.99**, a one-time non-consumable. No subscription, no ads.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4. The money, both grades, scrolls sideways" data-n="3 4" style="--tw:560px" markdown="1">

| Commission | Net per sale | Sales for $200 | Per selling day (8 days, Day 22-30) |
|---|---|---|---|
| 30% (plan, until the Small Business Program is active) | $6.99 | **29** | 3.6 |
| 15% (Small Business Program, enrollment pending) | $8.49 | 24 | 3.0 |

</div>


Free-plus-unlock arithmetic (Wrenna's <a href="../documents/hunt/h115.html">H115</a> ruling, `rulings-v2.md` row 37: unlocks are 2%-5% of downloads):

- 29 unlocks at 30% commission need **580-1,450 downloads** in the window (24 at 15%: 480-1,200).
- Lane per-day (Idris, from the shelf JSON): the on-job apps under "spotify stats" sum to **30.3 ratings a day** lifetime (stats.fm 20.90, must.fm 6.70, Receiptify 1.39, Trackify 0.67, Stats for Spotify Music+ 0.40, Statiks 0.23, two under 0.05). At 33-100 downloads per rating: 1,000-3,030 downloads a day across the lane.
- **Day 30** (launch Day 22, <span class="nw">2026-11-12</span>; 8 selling days to Day 30, <span class="nw">2026-11-20</span>): the lane sees 8,000-24,200 downloads. 580-1,450 is **2.4%-18%** of the lane (at 15%: 2.0%-15%). On the company's scale (under 1% B, 1-3% B-, 3-12% C, 12-25% C-, 25%+ D) that is **C**, straddling C-. The chair ruled C.
- **Day 90** (68 days to <span class="nw">2027-01-19</span>): 68,000-206,000 lane downloads; 580-1,450 is 0.28%-2.1% (at 15%: 0.23%-1.8%). **B**, straddling B-. The chair ruled B.
- **The honest check line** (Maren): a new entrant does not get stats.fm's downloads. At 1% of the lane, 79-239 downloads in 8 days give **1.6-12 unlocks**, short of 29 at every point. Reaching $200 by Day 30 needs roughly 2.4% of the lane's downloads at a 5% conversion, or 18% at 2%. That is a stretch, and it is the first concept in the hunt where the Day 30 arithmetic lands above D on a counted lane.

What would make it fail by Day 30: the Spotify file. It is requested from Spotify and arrives later (all three graders recall "up to 30 days"; Spotify's support page read today confirms the Download your data tool and did not show the delivery time, <code><a href="../documents/hunt/h137.html">H137</a>-raw/terms/spotify.html</code>). The lead import for Crowding is Spotify, and a buyer on Day 22 may not have the file by Day 30. The three free questions therefore run on Letterboxd, Netflix, Goodreads or StoryGraph, which download instantly, and the store page says so.

## 5. Names, checked <span class="nw">2026-10-24</span> (`tools/appsearch.py`, whois, DNS)


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; (tools/appsearch.py…, scrolls sideways" style="--tw:1067px" markdown="1">

| Name | App Store (US) | .com | .app | Trademark |
|---|---|---|---|---|
| **Askback** (preferred) | no app of that name; the top results are cashback apps | registered 2008 (GoDaddy), no DNS record | registered (DNS record) | not checked |
| Backcatalog | re-run 14:06 ET: no app of that name (the one-word query returned no rows while "back catalog", run in the same minute, returned Libib, Discogs, iCollect, so the API was answering); the two-word shelf is collection inventories, which reads as a different job | registered 2000 (Tucows) | registered (DNS record) | not checked |
| askbackapp.com | | whois "No match": available | | |

</div>


Rejected: Hindsight (Hindsight - Time Tracker, 396 ratings, and five more), Lookback (a "Lookback" released <span class="nw">2026-10-08</span>, and three more). A USPTO search needs a browser session the company does not have; the Investors can run it in a minute if a name goes forward. "Ask Your History" stays the working title.

## 6. <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with Commandments 6-10

- **Privacy and law (6).** The user's exports are the user's own data, taken with each service's own tool: Spotify's Download your data tool ([support page](https://support.spotify.com/us/article/data-rights-and-privacy-settings/)), Netflix's Viewing activity "Download all" CSV ([help page](https://help.netflix.com/en/node/101917)), Strava's bulk export ([support page](https://support.strava.com/hc/en-us/articles/216918437-Exporting-your-Data-and-Bulk-Export), dated September 14, 2026), Letterboxd's ZIP of CSVs and Goodreads' CSV (both from <a href="../documents/hunt/h21.html">H21</a>; Letterboxd's public page read today documents the import format only, and Goodreads' help page returned 404). Files stay on the phone; no account, no server, no analytics. Privacy label: Data Not Collected. Payment through StoreKit only.
- **Trakt and Last.fm by username are not in version 1.** Trakt's [terms](https://trakt.tv/terms) grant the member personal, non-commercial use; its API terms for a paid client render by script and are unread. Last.fm's [API terms](https://www.last.fm/api/tos) say a commercial user should "drop us a line prior to use"; that is contact only the Investors make (10). Both are version 1.1 after the Investors decide.
- **Film metadata is the unsettled licence.** Letterboxd and Netflix rows carry titles, not directors. TMDB's [API terms](https://www.themoviedb.org/api-terms-of-use), read today: "Commercial Use Requires a Commercial Agreement", so TMDB is out unless the Investors sign one. Wikidata's structured data is [CC0](https://www.wikidata.org/wiki/Wikidata:Licensing), read today, and carries directors; whether it matches enough of a Letterboxd diary is unmeasured. Plan: a dated Wikidata snapshot shipped inside the app, coverage measured on Day 6; until measured, director questions are not promised on the store page.
- **Subjects (7).** Film, TV, music and books as data, on the Investors' list. Walks are a log only: distance, place, date. No fitness or health reading, no advice. Nothing medical, financial, legal, gambling, adult, weapons, under-13, or political. The on-device model writes a query, never advice.
- **One useful job (8).** It answers questions about your own files.
- **No AI art or audio (9).** Charts, icon and screenshots are drawn by code; the mockups already are (`pitches/PITCH-11-mockups/draw.py`). The model produces a query string, not an image or sound.
- **No outreach (10).** We post nothing and contact nobody. Marketing is the Investors' (section 10).
- **App Review.** Guideline 4.3 risk is low: 1 of 25 new entrants in 12 months under the buyer's phrase, and the question box plus the cross-service library is visible in a screenshot. Service names appear as plain descriptive text only ("works with your Spotify export"); Apple's trademark rule for third-party names in titles and keywords gets a read on Day 13 (Maren). Foundation Models usage is on-device and needs no disclosure beyond the privacy label.

## 7. Build plan (Day N = <span class="nw">2026-10-21</span> + N; Idris builds, Maren designs, I spec)


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 7. Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N; Idris builds…, scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Pitch posted. Nothing is built until the Investors choose. |
| 4-6 | 10-25 to 10-27 | If chosen: project; parsers for Letterboxd ZIP, Netflix CSV, Spotify extended JSON, Goodreads and StoryGraph CSV, Strava archive, against code-generated fixture exports; each service's current export read once and the file names and menu paths in Maren's mockups corrected. Wikidata director coverage measured on a fixture diary. Foundation Models on the Simulator confirmed or ruled out on Day 4. |
| 7 | 10-28 | Apple membership due. Time-indexed store and cross-service title matching; the fixed query grammar and the 30 question shapes written as templates first (the no-model path). |
| 8-10 | 10-29 to 10-31 | Question-to-query on Foundation Models, query shown on screen; a scoring harness runs the 30 questions on fixtures against hand-written queries. Charts by Swift Charts. |
| 11-12 | 11-01 to 11-02 | Three-question meter and the $9.99 unlock in StoreKit testing. Paid Apps Agreement, tax and banking due Day 12. |
| 13-14 | 11-03 to 11-04 | Code-drawn icon and screenshots, store copy, privacy label, trademark rule read; creative approvals requested in the report. |
| 15-16 | 11-05 to 11-06 | TestFlight device pass: an Apple Intelligence phone and a phone without it; real exports if any Investor offers their own (their choice; files never enter the repository). Bug fixing only. |
| 17 | 11-07 | Submission candidate archived; App Review notes written. |
| 18 | 11-08 | Submit to App Review. |
| 19-21 | 11-09 to 11-11 | Review; any rejection answered within hours. |
| 22-30 | 11-12 to 11-20 | Selling days. Price fallback decision ($6.99) on Day 26 if under pace. |

</div>


A membership slip past Day 7 moves nothing before Day 15; a slip past Day 10 moves submission a day per day lost, and the report will say so. Budget asked: one domain, if a name goes forward. No other spend, no sign-ups in version 1.

## 8. Honest weaknesses

1. **Nobody was counted typing a question.** Every ask in the lane is for a named chart (Trakt's year in review, Last.fm's genre percentages). Whether people type questions rather than scroll charts is untested. Song Infos has offered an assistant since at least 2020 without passing 102 ratings, so the question box alone has not sold.
2. **The cross-service buyer is not counted.** The join is the whole difference, and no forum count says how many people <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> two or more exports and want them together.
3. **Crowding holds only on "spotify stats."** Under "music stats" the shelf is a clone wave and the concept would be capped at C+. The listing must lead with Spotify, and Spotify's file is the one that arrives late.
4. **The buyer does work first.** Exports before value; a free tier that feels empty until the files are in.
5. **The licence is unsettled.** TMDB is out for commercial use; Wikidata's coverage is unmeasured. Director questions are a promise we cannot yet make.
6. **Apple Intelligence hardware.** The model path runs only on supported iPhones; the rest get templates. Whether Foundation Models runs on our Simulator is checked Day 4; if not, the model path tests on a device only, after the membership is active.
7. **The rubric is unvalidated.** [Corrected <span class="nw">2026-10-24</span> 18:12, see the correction at the end of this file.] H140 (29 fresh cards, two blind graders) failed its check, written after grading and before the key: the graders' letters ranked earners above non-earners (Final AUC 0.83 and 0.87) and no non-earner reached B, but B caught only 5 and 8 of 15 earners. Not a hit rate (<code>H140-verdict</code>, section 2, 893e0fe1). Before H140 (text as posted): Method v2 and v3 failed their pre-registered backtests (<a href="../documents/hunt/h95.html">H95</a> sections 6-8); the computed <span title="The final letter, after the caps.">Overall</span> was dropped and this letter is a chair's judgment with both grade files open. Earlier rubrics missed every earner in the backtest. B here means "the best-argued concept so far", not a tested predictor of $200.
8. **Grader leaks, as disclosed.** Idris saw the author's letters in a commit subject before grading (five cells marked not independent, weighed as one grader's). Wrenna's task packet named both graders' novelty facts before her blind letters. The author's prose leans were visible to all three. The author is the CEO, which is why Wrenna chaired.
9. **Day 30 is a stretch.** By the lane's 1% line the expected unlocks are 1.6-12, not 29. The C is on the shelf's downloads, not a new entrant's.
10. **The mockups use invented data.** File names and menu paths on screen 1 are unverified against the services' current settings (Maren's README); a parser pass on Day 4 corrects them before any screenshot.

## 9. Mockups

Three first screens by Maren, drawn by `pitches/PITCH-11-mockups/draw.py` (Commandment 9; neutral placeholder style, not approved creative, <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). Every count and the chart on screen 2 come from running the shown query on a seeded invented sample, so the explanation on screen 3 matches the chart.

- Import: `pitches/PITCH-11-mockups/1_import.png`
- Ask (two services, two date ranges): `pitches/PITCH-11-mockups/2_ask.png`
- How it was computed: `pitches/PITCH-11-mockups/3_computed.png`

## 10. How the Investors could market it

All contact is theirs (Commandment 10); we prepare a launch kit (copy, code-drawn screenshots, a one-paragraph answer to "why not just a chat app") by Day 16.

- The threads where the pain is counted: r/trakt (the missing 2025 Year in Review thread), r/lastfm's "stats you wish" thread, r/Letterboxd, r/TheStoryGraph, r/TVTime's stranded users.
- The hook is a question with a surprising answer, posted as a screenshot with the query visible.
- Timing: Spotify Wrapped lands in early December, after Day 30. That season is the natural moment for "ask your whole year across every service" and helps Day 90, not Day 30. Day 30 rests on keywords ("spotify stats", "letterboxd stats", "trakt stats", "watch history") and the Investors' own reach.

## 11. Against the standing runners-up

Letters from `python3 tools/gradebook.py top` and the rulings rows; v1 rows carry v1 cells.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 11. Against the standing runners-up, scrolls sideways" data-n="2 3 4" data-o="2" style="--tw:932px" markdown="1">

| Concept | Overall | Novelty | Depth | Day 30 | Where it stands against Ask Your History |
|---|---|---|---|---|---|
| **Ask Your History** (<a href="../documents/hunt/h137.html">H137</a>, v2) | **B** | B- | B | C | Ladder B with no cap binding; the only concept whose Day 30 computed above D on a counted lane |
| Netsmith (#11, Pitch 3, v1) | B- | B- | A | not sized | Deeper build (A), same novelty letter, no counted demand; outside the Investors' later subject list |
| Meteor catcher (<a href="../documents/hunt/h113.html">H113</a>, v2) | B- | B | B | C (cap) | Higher novelty, held at B- by the pre-written <a href="../documents/hunt/h124.html">H124</a> family rules until a device night; the Leonids inside Day 30 are 1-3 an hour |
| True-north sky finder (<a href="../documents/hunt/h103.html">H103</a>, v2) | B- | B- | A | B-/C | Held at B- by the <a href="../documents/hunt/h124.html">H124</a> rules (no <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>, no <span title="A test written in advance. If it fires, we drop the idea.">kill</span> fired); Day 30 reads better than ours on its lane |
| This Spot Through Time (<a href="../documents/hunt/h115.html">H115</a>, v2) | B- | B- | B | D | Same cells as ours except <span class="nw">Day 30 D</span>, which caps it |
| True Bearing theodolite (<a href="../documents/hunt/h127.html">H127</a>, v2) | B- | B- | B | D | Same cells, <span class="nw">Day 30 D</span> caps it; a lift is pre-written (Theodolite +4 US ratings by <span class="nw">2026-11-07</span>) |
| Keyed master-key designer (<a href="../documents/hunt/h98.html">H98</a>, v2) | B- | B- | B | D | Same cells, <span class="nw">Day 30 D</span>: 1-3 downloads a day in its lane |
| Cycle listener (<a href="../documents/hunt/h41.html">H41</a>), circuit sim and Anki client (<a href="../documents/hunt/h1.html">H1</a>) | B- | v1 | v1 | v1 | v1 grades; v2 inputs and blind grades are on the board (<a href="../documents/hunt/h135.html">H135</a> line 4) |
| **Ledger** (<a href="../documents/hunt/h21.html">H21</a>, Pitch 10 idea 1, v1) | B- | C+ | B- | not sized | See below |

</div>


**Ledger overlaps this pitch's TV half.** Ledger was Netflix CSV plus Trakt plus Letterboxd into one watch-time ledger with charts the services already draw (its Novelty C+). Ask Your History takes the same three sources as inputs and replaces the fixed charts with a typed question; <a href="../documents/hunt/h137.html">H137</a>'s C2, "watch time for any range of dates", is exactly Ledger's job and becomes this app's first question set rather than a second product. What Ledger had that version 1 here does not promise: Trakt by API (an Investor sign-up) and the runtime join for watch hours (needs the metadata licence in section 6). Choosing this does not retire Ledger; it absorbs it.

## 12. Apple status

Membership pending, due Day 7 (<span class="nw">2026-10-28</span>). Paid Apps Agreement, tax and banking due Day 12 (<span class="nw">2026-11-02</span>). Everything in the plan before Day 15 runs on the Simulator and StoreKit testing.

---

No decision is asked; this is here for whenever you choose.

## <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span> note (<span class="nw">2026-10-24</span> 17:45 ET, Ines)

Appended, not rewritten. Under G2a (method-v2) prices read off apps.apple.com in-app purchase lists are read against terms and feed no rule. In 'People already pay yearly' above, Letterboxd Pro and Patron, Trakt VIP and the stats.fm Plus range came from App Store IAP lists (<a href="../documents/hunt/h137.html">H137</a> section 1, <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>, T2, T4); Last.fm Pro came from last.fm/pro and stands. The claim that people pay yearly for stats on their own logs now rests on Last.fm alone until a person's browser read or the services' own pages (read against their terms first) confirm the others. The grade (C+, d29f8b12) does not move: it was set by K-CR1, not by these prices. PITCH-12 and PITCH-13 were checked: PITCH-12's $9.99 Pythonista price is the Lookup price; PITCH-13's rival prices come from the publisher's site; neither reads an IAP list.

## Correction, <span class="nw">2026-10-24</span> 18:12 ET (Ines): the rubric line after H140

Board line "[plan] Ines, P2, H140 pitch rubric lines". H140 (<code>H140-verdict</code>, 893e0fe1) failed its check, so the rubric stays unvalidated. The card note's citation now names H140 instead of <a href="../documents/hunt/h95.html">H95</a>.md section 8, and section 8, item 7 carries the verdict's counts first, with the earlier text kept after it. No letter moves. Nothing is asked of the Investors.

## P2 terms note (<span class="nw">2026-10-24</span> 18:56 ET, Ines)

Appended, not rewritten. On <span class="nw">2026-10-24</span> at 18:53 G2a was extended to developer.apple.com (<a href="../documents/#v2-rulings">rulings-v2</a>, 'P2 terms'): its Terms of Use are Apple's site terms, which forbid robots. <a href="../documents/hunt/h142.html">H142</a> read Apple's Foundation Models documentation by script, so its cells (platforms, device and region need, unavailable reasons, the 4,096-token window, guided generation) are held, lowering only, until a person reads those pages in a browser. In this pitch that touches section 1's sentence that the model turns a typed sentence into a small, fixed-grammar query, the plan's days 8-10, and weakness 6.

The letter stands (rulings-v2, 'P2 terms check'). Depth rests on our own 60-question set (grammar 54 of 60, templates 50 of 60), and the templates answer without the model on any device. What is now unchecked: that Apple's model can be held to our grammar. Until a person's read, take section 1's model sentence as the plan, not a checked fact.
{% endraw %}

</div>
