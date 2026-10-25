---
layout: "default"
title: "Pitch 16: Wholepack, the week of dinners planned from your own recipes so every pack you buy gets used up (H177 C1, ruled B; B- after the H185 stress test)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 16</div><h1>Pitch 16: Wholepack, the week of dinners planned from your own recipes so every pack you buy gets used up (H177 C1, ruled B; B- after the H185 stress test)</h1><p class="lead"><code>pitches/PITCH-16.md</code>, as written, scrubbed for the public site.</p><p class="pc-src">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




> **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> changed, <span class="nw">2026-10-24</span> 19:26 ET (Odalys, H185 applied).** The letter is now **B-**, not B. Two of the four depth parts failed their pre-written lines (K185-D2): the ingredient parser, read the lowering way, got 392 of 442 generated lines fully right (88.7%, under 90%), and code-rendered receipt lines matched the right ingredient 73 of 253 times (28.9%, under 60%). <span title="How much room the idea has to grow. It moves the grade up or down a step or two.">Depth</span> falls from B to C+ and no longer <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>. Every <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, crowding and fit check came back not met. Section 15 has each line; research/hunt/H185.md 'H185 applied' has the counts.

Prepared Day 3 (<span class="nw">2026-10-24</span>) by Ines, from Wrenna's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> H177 (`research/hunt/H177.md`, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> G25b: new paid entrants winning this quarter, c5c46490), two <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> grades (Idris, `research/hunt/H177-grades-idris.md`, e6d9672f; Maren, `research/hunt/H177-grades-maren.md`, 365ad639) and my chair ruling (`research/hunt/rulings-v2.md`, 'H177 chair (Ines, 18:17)' rows, 089a756b). I did not author or grade the lane. Before any check was read I wrote what each could do to the letter (`research/hunt/H185.md`, 2b4078dd). **No check has landed yet; every one is printed open in section 13 with its move.** Mockups: `pitches/PITCH-16-mockups/` (mine, drawn by code). Issue: #52.

No decision is asked (amendment <span class="nw">2026-10-23</span> 17:33). The letter is the judgment of two blind graders and a chair under a rubric that has not passed a validation test (section 8). Every number is cited; the sales figures are arithmetic, not a forecast. Names and visuals are proposals under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>.

## 1. In plain English

**What it is.** A meal planner that plans around what the shop actually sells. You give it the dinners you already cook, pasted as text or shared from a recipe page. It reads the ingredient lines ("1/2 cup cream", "2 bell peppers", "1 (15 oz) can black beans"). From your receipts, photographed once and confirmed line by line, it learns the packs your store sells and what they cost: a 473 ml carton of cream, a 3-pack of peppers. Then it chooses the week's dinners so that the packs you buy get used up across the week: the recipe that opens the cream on Monday is paired with the one that empties it on Thursday, the three-pack of peppers goes into two dinners, the half onion is carried forward. The shopping list is priced in whole packs, which is what the till rings up, and it tells you which part-packs the week will leave over before you shop. Nothing is fetched from a shop; the prices are yours, from your receipts and your typing.

**One session.** You paste eight recipes you cook on rotation. You photograph last week's receipt and confirm each line: "GRN PEPR 3CT 2.99" is bell peppers, a pack of three. You say five dinners for four people. In a second the app shows the week: Monday chicken fajitas (opens six fresh packs), Tuesday black bean tacos (empties the peppers and the limes), Wednesday tofu curry (uses the open onions), Thursday frittata (uses the open cheddar and spinach), Friday chicken rice bowls (empties the chicken and the scallions). The till total reads $59.97; priced by the portion, the way other planners price it, the same week would read $37.94, a number no till will charge. You swap Wednesday for pasta and the total and the leftover line change. You tap "Make the list" and shop. (Every number here is the mockup's own generated instance, section 9.)

**Who it is for.** Adults who cook dinners at home for a household on a budget, from recipes they already use, and shop a week at a time. These are the buyers of this quarter's meal-planner wave: TapCook (6769601354, released <span class="nw">2026-07-17</span>, 4,983 ratings, 50.33 a day, Food and Drink grossing #3 on <span class="nw">2026-10-24</span>), mise (3,681 ratings, 27.07 a day), Potto (2,314, 17.27 a day), NeatEat and Whipp (`research/hunt/H177.md`, lines 21-33). Their low reviews say two things: the price at the till is not the price on the screen ("it recommends portions of items, for instance 1 pepper at Aldi, and prices that, not the cost of the 3 pepper package", TapCook us #8; "the budget only accounts for 1/4 cup of cream, you can't buy 1/4 cup of cream", Potto us #22; "I copy and pasted in Instacart came out to $248" against $116 quoted, TapCook us #26), and the subscription is the loudest complaint of all ("$6.99 a week is crazy! That's nearly $400 a year", Potto us #92; price, paywall or trial billing in 41 of TapCook's 97 low reviews). Some of them cook their own rotation ("I have recipes that I use as a constant rotation", TapCook us #42). Of the Investors' subjects (amendment <span class="nw">2026-10-22</span> 18:51), cooking is not on the list; the nearest is organisation, a planned week and a list. The ruling noted this and did not <span title="A test written in advance. If it fires, we drop the idea.">kill</span> on it. This is not a product about what to eat; it is a product about what to buy, and it makes no claim of the kind Commandment 7 bars (section 6).

## 2. Evidence of need, with links

<span title="How many people show, in their own words, that they want this.">Need</span> is not a cell of the v2 rubric; it is the Why, and I state it as it was counted, not louder. All counts are from `research/hunt/H177.md` (lines 43-45) over the 1-3 star reviews since <span class="nw">2026-05-01</span> of the shelf's entrants (`research/hunt/H177-raw/rev/`).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Evidence of need, with links, scrolls sideways" style="--tw:937px" markdown="1">

| What buyers ask for | Count | Where |
|---|---|---|
| The price form: subscription, paywall, trial billing | 41 of 97 | TapCook low reviews, hand-coded in full |
| Prices wrong at the store | 6 of 97 | TapCook |
| Pack size (the portion priced, not the pack) | 3 of 97 TapCook + 1 of 345 (mise, Potto, NeatEat by keyword, rows read by hand) = **4 of 442** | TapCook us #8, #19, #76; Potto us #22 |
| Add my own recipes | 3 of 97 + 0 of 345 = **3 of 442** | TapCook us #14, #35, #42 |
| Same meals on repeat; set-up answered then ignored | 24 of 97 (TapCook); mise #64, #131, #150; Potto #3, #34; NeatEat us #32 | |
| No Canada, no postal codes | 11 of 97 | TapCook ca #87-#97 |

</div>


**The loud ask is the price, not the pack feature.** Four reviews in 442 name the pack problem; forty-one in ninety-seven name the subscription. This pitch leads on paying once and on a list whose total is what the till charges, and treats whole-pack planning as the method that makes the total honest, not as a demanded feature. H185 read (b) (Wrenna: the uncoded Whipp and MyRecipes dumps, and a seeded 90-post forum sample from r/EatCheapAndHealthy, r/MealPrepSunday and r/Frugal) will add its counts here under rule Q185-1..3; until then the pitch may not say that buyers write about the leftover half-pack, and it does not.

## 3. What is new

The chair ruling's difference line: **"Your recipes, planned so every pack empties."** On the shelf as read on <span class="nw">2026-10-24</span> (`rulings-v2.md`, H177 chair C1 <span title="How different the idea is from what the App Store already sells.">Novelty</span> cell):

- 0 of the top 10 under "meal planner" plans by pack; 4 of 10 claim "food waste" (mise, Meal Planner & Weekly Menu, MealPrepPro, Eat This Much), and ReciMe and Plan to Eat import your recipes. The goal is claimed, the method is not.
- Under "budget meal planner", Budget Bites (#8, 2 ratings, <span class="nw">2026-02-13</span>, $2.99 a month) builds a week "to maximize ingredient overlap" on its own 500 recipes, without pack sizes. Grovi (#10) prices an imported recipe at your store. MealBoard (#10 under "meal planner") tracks prices per store and marks leftovers.
- Nobody prices whole packs or carries the part-pack forward on the user's own recipes, and the list shows it as a new output: the pack ledger.

One top-10 app has the overlap half, so Novelty is B-, not B; the rest of the difference is visible in a screenshot, so not C+. The closest move is one more top-10 planner showing pack sizes or overlap on the user's recipes, or Budget Bites adding import (K185-A1). Read (a) is pre-written to find exactly that (section 13).

## 4. The money, both grades

The mission's line is $200 net by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> (<span class="nw">2026-11-20</span>). Day 22 (<span class="nw">2026-11-12</span>) is the build line, so the selling window is 8 days. Net is 70 percent of price at Apple's standard rate (the Small Business Program's 85 percent waits on membership; I use 70).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. The money, both grades, scrolls sideways" style="--tw:1514px" markdown="1">

| Route | Price | Sales for $200 net | A day over 8 days | What the lane says | Cell |
|---|---|---|---|---|---|
| Paid up front (the author's route; anchored on Paprika Recipe Manager 3, 1303222868, $4.99, 54,116 ratings, the shelf's pay-once <span title="A paid app on the shelf that sells nearly the same thing. Its price and ratings are our yardstick.">comparator</span>) | $4.99 | 58 | 7.25 | 0.0%-0.2% of the "meal planner" and "budget meal planner" lanes (both graders, with and without ReciMe and Tasty); 0.4%-1.3% of Paprika's own lifetime rate (552-1,658 downloads a day) | <span class="nw">Day 30 B-</span> (Maren; Idris B; the author C, provisional) |
| Free download, one-time unlock (held beside the paid route by the ruling) | $4.99 | 58 unlocks | 7.25; at a 2%-5% unlock rate, 145-363 downloads a day | 1.2%-10.7% of the lane (Maren) | same cell |

</div>


The ruling put Day 30 at the middle line, not the best: every number is sizing's lifetime average on a shelf of free downloads into subscriptions, no paid-up-front entrant earns on Food and Drink this quarter (H177: 4 of 43 earners at one rating a day were paid, all Music), and H173 (paid newcomers' window rate) gave no verdict. Day 30 never lifts the <span title="The final letter, after the caps.">Overall</span>. Which route is printed as the one to build is decided by H185 rules K185-C2..C4 on Maren's two Paprika reads (the second on or after <span class="nw">2026-10-28</span>), not by a preference and not by the Investors.

Day 90 B (Maren, Idris): the shelf grows weekly, the engine does not change, and the obvious next features are the ones buyers already ask for: Canada and postal codes (TapCook 11 of 97), several stores, a freezer, household sharing, a Mac app.

Overall **B** (ladder: Novelty B- up one for Depth B, the same in all three rows; no <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> binds: <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span>, <span title="Does a free app or an iPhone feature already do the whole job the same way? A fail holds the idea at C+ or lower.">Gate 1</span> and <span title="How many apps on the shelf already sell the same thing.">Crowding</span> pass, Day 30 not D, Why names "helpful"). Robust to Depth B- (still up one). Leaks, weighed in the ruling: both graders saw the author's ladder before grading; the B rests on the Novelty and Depth cells, each carried by named top-10 reads the author's row did not <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>.

## 5. Names, checked <span class="nw">2026-10-24</span> (`tools/appsearch.py` LIMIT=8, one run 18:58:56-18:58:59 ET; `dig`)

Guideline 2.3.7: a unique name, keywords that describe the app, no trademarked terms or popular app names packed into metadata, 30 characters. Every phrase in the run answered within the same minute ("tillwise" returned no app while "meal planner" answered at 18:58), so the empty answer counts as checked. **USPTO was not searched: the search needs a browser and is blocked from this machine (#46 is open on it).** Names are proposals (Commandment 51).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 5. Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; (tools/appsearch.py…, scrolls sideways" style="--tw:1146px" markdown="1">

| Candidate | Store answers to the phrase (top rows) | Exact name taken? | .app | .com |
|---|---|---|---|---|
| **Wholepack** (recommended: the pack, whole; 9 characters; the subtitle carries the job) | "wholepack": Whole Foods Market (320029256), HelloPackage, Whole Eats ($2.99, 7,798 r), Temoorst, QuickPack, three packaging suppliers; "whole pack": Smash Hit, Pupport, Lambus, Packs, Instagram, Simple Lists +, Roamer. No app named Wholepack | no | no A record | A record (taken) |
| Tillwise (second: the price at the till) | none: "tillwise" returned no app | no | no A record | no A record |
| Packwise (dropped) | PackWise (6812045733, <span class="nw">2026-09-15</span>), PackWise - Travel Packing List (6776995070), PackWise - AI Packing List (6762514036), AI Packing List - Packwise (6757388863), Packwise Flow Link (6788299800) | yes, five | A record | A record |
| Pack Planner (dropped) | Pack Planner (1534201357, 2020), Pack Planner: AI Family Hub (6776625761), TrailBound Pack Planner (6758329120); the phrase is a packing-list shelf | yes | not checked | not checked |
| Use It Up (dropped) | Use It Up: Pantry Recipes (6775112024, <span class="nw">2026-06-18</span>), Use It Up: A Recipe Database (1636287829), Hitpan! Use It Up (6817191069, <span class="nw">2026-10-13</span>), Use It Up - Regularity Tracker | yes, and two are on-job recipe apps | not checked | not checked |

</div>


**Under 2.3.7.** "Whole Foods Market" is a retailer's mark and sits first on the "wholepack" shelf because of the word "whole"; Wholepack is one word, not a retailer's name, and no app carries it. The mark's registered classes are unchecked by us (USPTO, #46); if the Investors' read finds a conflict, Tillwise is the fallback with both domains free. "Use It Up" is out: two on-job recipe apps carry it (one released <span class="nw">2026-10-13</span>); they are shelf facts for read (a)'s "use up ingredients" phrase, not coded here. Subtitle proposal: "Your recipes, by the pack" (25 characters). Keywords lead with "meal planner", "grocery list", "weekly dinners", "budget", "shopping list", "recipes", "pantry", "receipts", "pack size", "food waste" and never with another app's or publisher's name (TapCook, mise, Potto, Paprika, ReciMe, Budget Bites stay out).

## 6. <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with Commandments 6-10 and App Review

- **Commandment 7, the line this <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concept</span> lives next to.** No screen, listing, keyword or name makes a nutrition, diet, calorie, weight or health claim, and the app takes no diet, allergen or medical input (the ruling; H185 K185-E1, E2). Planning dinners from the user's own recipes, packs and prices is a shopping job, not advice about what to eat. The importer discards the schema.org `nutrition` and `suitableForDiet` fields and never stores or shows them (K185-E4). Allergen filtering stays out of v1 for the same reason. Scripted check at commit: `python3 tools/fit_words.py pitches/PITCH-16.md pitches/PITCH-16-mockups/draw.py pitches/PITCH-16-mockups/README.md`; the only hits are the exclusion sentences in this section, the count is in the board note, and Maren's re-read (read e) may add words.
- **Prices (K185-E3).** Every price comes from the user's receipts or typing. No retailer site, API, price feed, loyalty account or delivery service is read, now or in the roadmap. The mockups' prices are typed in `draw.py` and are not any store's.
- **Recipe import (K185-E4).** Pasted text, or the JSON-LD of a page the user opens and shares to the app through the share sheet. The app never crawls or fetches pages on a schedule. Whether reading a shared page's JSON-LD sits within a recipe site's terms is a question for counsel: an Investor item under Upcoming needs (G7), not a kill and not a clear.
- **Receipts (K185-E5).** Photos and their text stay on the phone; nothing is uploaded; no account. Real receipts for testing after membership are the Investors' to approve and must carry no personal details into the repo.
- **Commandment 6 and 9.** No generated image or sound anywhere; the mockups are SVG drawn by code from typed data. Any unit or density table's licence is read before a value is used (read d, G2); if the source is a food database, only weights and measures are taken, never any other field.
- **App Review.** Guideline 4.3 (spam): the pack ledger and whole-pack list are a new output, not a reskin of a planner. 5.1.1: a camera permission string that says receipts are read on the phone; no data leaves it. 2.3.7 as in section 5. 3.1.1: a paid app, or a free app with one non-consumable unlock through StoreKit; no subscription. 1.4.1 does not apply: nothing here is advice about food safety or diet, and the app does not say so.
- **Unknowns for the Investors' list (not asks for a decision):** counsel's view on shared-page JSON-LD; approval of real receipts for device testing; the USPTO read for Wholepack.

## 7. Build plan (Day N = <span class="nw">2026-10-21</span> + N; Idris builds, Maren designs, Wrenna verifies, I spec)

Idris's read (d) lands first and fixes the engineer-days per part; the dates below are my plan from the ruling's v1 slice and move with his numbers, not the other way round.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7. Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N; Idris builds…, scrolls sideways" style="--tw:526px" markdown="1">

| Days | Dates | What |
|---|---|---|
| 4-5 | 10-25 to 10-26 | Read (d): parser on 300 generated lines, unit table with its licence, exact optimiser against greedy on 100 seeded weeks, Vision on 20 code-rendered receipts. Spec and screens drafted from the mockups. Reads (a), (b), (c) first Paprika read land; Odalys applies H185 (section 13). |
| 6-9 | 10-27 to 10-30 | Xcode project. Paste and share-sheet import, parser, unit table, manual pack table (typed packs and prices), StoreKit configuration. Membership due Day 7 (10-28); Paprika's second read. |
| 10-13 | 10-31 to 11-03 | The optimiser (people, nights, spoil window, carry-forward), the week screen, the list in whole packs with the leftover line. Paid Apps Agreement, tax and banking due Day 12 (11-02). |
| 14-17 | 11-04 to 11-07 | Receipts as the assisted confirm-each-line step (Vision on the Simulator from rendered receipts; a real device and approved receipts after membership). Tests: parser forms, optimiser planted zero-waste weeks, receipt abbreviations. |
| 18 | 11-08 | Feature freeze. Everything after this is bugs, copy and screenshots. |
| 19-21 | 11-09 to 11-11 | Product page, screenshots from the Simulator, keywords, review notes; submit on Day 19 so a rejection has a round-trip before Day 22. |
| 22-30 | 11-12 to 11-20 | On sale, 8 days. Day 30 is read on net proceeds, not downloads. |

</div>


**What would make this fail.** The parser on real pasted recipes (not the generated forms) under 90 percent, which turns import into typing; receipts that Vision cannot read on a phone in a kitchen, which leaves a typed pack table and the Depth cell at C+ (K185-D2); a $4.99 paid app on a shelf of free downloads reaching nobody in 8 days (the 0.0%-0.2% line), which is why the unlock route is held beside it; and a top-10 planner that adds pack sizes before Day 22 (K185-A1). Each has a pre-written rule and a date.

## 8. Honest weaknesses

- **The rubric is unvalidated.** H140's backtest failed its pre-registered pass rule (`research/hunt/H140-verdict.md`, section 2): the rubric's letters have not been shown to separate earners from non-earners. B is a judgment under that rubric, not a measurement.
- **Need is thin by count.** Pack size: 4 of 442 low reviews. Own recipes: 3 of 442. The loud ask is the price form, and a cheaper price form is not a feature a screenshot sells. Read (b)'s forum sample will say whether anyone outside app reviews writes about the problem; the rule for what the pitch may then say is already written (Q185-1, Q185-2).
- **Every Day 30 number is a lifetime average on someone else's shelf.** No paid-up-front newcomer earns on Food and Drink this quarter. The paid route's own test is Paprika's measured four-day rate (K185-C4); if that line reaches D, the route becomes the unlock and Day 30 is read there alone.
- **Receipts are provisional.** Code-rendered receipts flatter Vision, as H176 said of scans. Real receipts wait for a device after membership (due <span class="nw">2026-10-28</span>) and for receipts the Investors approve. v1 ships with the typed pack table as the floor.
- **The exact optimiser may not beat the greedy sort by much.** In the mockup's own generated instance (one week, 56 candidates) the exact week's objective is $68.12 against the greedy sort's $69.40: a $1.28 difference. Read (d)'s 100 seeded weeks decide (pass: median leftover cut 25 percent or more, exact better in 70 percent or more); one instance proves nothing.
- **Many meal-planner buyers come to the shelf for reasons Commandment 7 keeps us out of.** Read (b) codes those rows H and sets them aside; this app never serves them, which narrows the buyer.
- **Cooking is not on the Investors' subject list.** Noted in the ruling, not killed; the nearest listed subject is organisation.
- **Shelf facts not yet coded.** Use It Up: Pantry Recipes (6775112024, <span class="nw">2026-06-18</span>) and Hitpan! Use It Up (6817191069, <span class="nw">2026-10-13</span>), seen on the names search; Budget Bites' overlap claim; Grovi's store price; MealBoard's per-store prices. Read (a) codes each by its Lookup description, and K185-A1..A3 apply.
- **Canada and the UK are not v1.** The pack sizes and units are whatever the user's receipts say, so nothing is US-only in the engine, but the parser's generated forms are US-English and metric; a Canadian or British receipt is untested.

## 9. Mockups

`pitches/PITCH-16-mockups/` (README has the provenance of every number):

1. `1_week.png`: the chosen week, Monday to Friday, with one computed note per dinner (which open pack it empties or uses) and the till total, the pack count and the fresh part-packs left over.
2. `2_list.png`: the list priced in whole packs, "uses 5 of 6" under each line, the whole-pack total and the by-the-portion figure beside it.
3. `3_receipt.png`: a receipt rendered by the script from the same list, matched line by line, with one line that is not on the list flagged for the user and a line saying the photo stays on the phone.

Everything on the screens is computed by `draw.py` from a typed catalogue of 30 ingredients (pack size, an illustrative price that is not any store's, a spoil window) and 8 typed recipes: an exact search over the 56 five-of-eight weeks chose the week; the greedy sort and the five cheapest recipes are printed in the README for comparison. No image file, photograph or generative model is used (Commandment 9). The text strings in the script pass the Commandment 7 word check (section 6).

## 10. How the Investors could market it

The picture is the list: the same week priced two ways, $59.97 at the till against $37.94 by the portion, with "the till charges packs, not portions" under it. The product page leads with "pays once" against the shelf's $6.99-$9.99 a week, which is the complaint in 41 of 97 TapCook low reviews. The company does no outreach (Commandment 10); anything posted is the Investors'.

## 11. Apple status

Membership pending (due Day 7, <span class="nw">2026-10-28</span>); Paid Apps Agreement, tax and banking due Day 12 (<span class="nw">2026-11-02</span>). Until membership is active: Simulator and Xcode StoreKit testing only, no App Store Connect or TestFlight in the plan (amendment <span class="nw">2026-10-22</span> 01:09). Receipt reading on a real device waits on membership and on receipts the Investors approve.

## 12. Against the standing pitches

By the cells as ruled: Pitch 13 is B- (H148 C1 after H176); Pitch 14 holds B (H163 C1: Novelty B-, Depth B-); Pitch 15 is B (H172 C2: Novelty B-, Depth B-, <span class="nw">Day 30 C</span>, Day 90 B-). Pitch 16 is B with Novelty B-, Depth B, <span class="nw">Day 30 B-</span>, Day 90 B: the strongest Depth and Day 30 cells among the Bs, on the thinnest counted need (4 of 442) and on a Day 30 cell set at the middle line of unmeasured numbers. It is the only one whose buyer is a current wave (50 ratings a day on the leader), and the only one whose closest kill is a single description change by a two-rating app. The ordering is the rubric's, and the rubric is unvalidated.

## 13. H185 checks (posted open; applied <span class="nw">2026-10-24</span> 19:26 ET in section 15; rules written before any read, `research/hunt/H185.md`, 2b4078dd)

Posting is allowed by H185 R4: after the rules commit, with every check printed open. Odalys applies each as it lands (G9: neither the author nor the rules' writer applies), with a dated "Stress test" block here and a dated comment on the issue. If the applied letter falls below the posted B, the issue gets a dated correction in its first line. R1: no read lifts the letter; B is the ceiling of this round.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 13. H185 checks (posted open; applied &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; 19:26…, scrolls sideways" style="--tw:1381px" markdown="1">

| Code | Check | Move if met | Read | Status |
|---|---|---|---|---|
| K185-A1 | Any top-10 app under "budget meal planner" or "meal planner" (Budget Bites re-read) coded K (pack-aware) or 2 (two of own recipes, pack-aware, use-up) | Novelty one step down, Overall one step down (B-) | a (Odalys, Maren re-code) | open |
| K185-A2 | Any top-10 app of the four phrases coded W (all three parts); if free and keeps the plan, Gate 1 fails | Novelty two steps down; cap C+ if free and keeps | a | open |
| K185-A3 | Three or more distinct apps released since <span class="nw">2025-10-24</span> across the four top 25s coded K, 2 or W | Novelty one step down (one step with A1), Overall B- | a | open |
| K185-A4 | Under "budget meal planner" 10 or more of the top 25 since <span class="nw">2025-10-24</span> and none paid with over 100 ratings (or the same under "food waste meal planner" if on-job) | Crowding fails, cap C+ | a | open |
| Q185-1..3 | Forum and review counts for pack waste and till total (recorded, no letter move; they fix what section 2 may say) | wording only | b (Wrenna, Odalys re-code) | open |
| Q185-4 | Any app a post names as planning by package is coded by its own description under A1..A3 | as A1..A3 | b, a | open |
| K185-C1 | H173 no verdict at writing; a later applied verdict re-runs the Day 30 lines | C3 read on the re-run | c (Maren) | open |
| K185-C2 | Paprika under $4.99 in us at either read | lines re-run at that price, C3 read | c | open |
| K185-C3 | After any re-run, the middle Day 30 midpoint at D | <span class="nw">Day 30 D</span>, cap B- | c | open |
| K185-C4 | Paprika's measured four-day rate gives D on the paid route | route becomes the unlock; D there is cap B- | c, second read on or after <span class="nw">2026-10-28</span> | open |
| K185-D1 | Exactly one of parser, unit table, optimiser, receipts fails | Depth one step down, no Overall move | d (Idris) | open |
| K185-D2 | Two or more parts fail | Depth C+, Overall B- | d | open |
| K185-D3 | Optimiser fails and greedy would ship, receipts failed or unsettled | D2 applies | d | open |
| K185-E1 | A Commandment 7 word outside the exclusion sentences | removed before posting; Fit kill if unavoidable | my scripted run at commit; e (Maren) | open (one stray hit at the first commit, in this table's own E2 row, reworded; see section 14; Maren's re-read pending) |
| K185-E2 | An input of the kind the rule bars on any screen, setting or import field (the rule's own words are in H185 section 9) | out of v1; Fit kill if the plan needs it | e | open |
| K185-E3 | A retailer site, API, feed, loyalty account or delivery service as a price source | removed; Fit kill if the plan needs it | e, d | open |
| K185-E4, E5 | Import is paste or shared-page JSON-LD only, the two barred fields dropped; receipts stay on the phone; the terms question and real receipts are Investor items | listed under needs, no move | e | open |
| R1 | No read lifts the letter | ceiling B | all | standing |

</div>


## 14. Corrections

- **<span class="nw">2026-10-24</span> 19:09 ET (Ines).** The scripted K185-E1 check at the first commit (4c6a203c) printed 14 hits: 11 in section 6's exclusion sentences, allowed by the rule, and 3 on one line outside sections 6 and 8: section 13's own K185-E2 row, which quoted the rule's words. Under E1 as written that row had to be reworded before posting, and I posted with it in place and wrote "0 stray hits" in the E1 row and in the board note. Both were wrong by that one row. The row is reworded in this commit, the E1 row now says so, and the same words in `research/hunt/checks.tsv` (outside E1's scope, changed for consistency) are reworded. No letter moves; Maren's read (e) still applies to the posted text.

## 15. Stress test, <span class="nw">2026-10-24</span> 19:26 ET (Odalys, H185 applied)

Applied by someone who wrote neither H177 nor H185 (G9). Moves run from the chair ruling (Novelty B-, Depth B, Overall B). Counts, files and the reading refused on each line: research/hunt/H185.md, "H185 applied" (c02237a7); ruling row: research/hunt/rulings-v2.md "H185 applied (Odalys, 19:26): H177 C1".


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 15. Stress test, &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; 19:26 ET (Odalys, H185…, scrolls sideways" style="--tw:776px" markdown="1">

| Code | Result | Count |
|---|---|---|
| K185-A1 | not met | 0 of 20 top-10 rows (17 apps) under "budget meal planner" and "meal planner" coded pack-aware or two parts, by either coder; Budget Bites (#8) still one part (use-up) |
| K185-A2 | not met | 0 of 40 top-10 rows (32 apps) of the four phrases coded with all three parts |
| K185-A3 | not met | 1 of 32 apps released since <span class="nw">2025-10-24</span> is pack-aware: Mealbird (6794577462; food waste meal planner #20, 130 ratings, <span class="nw">2026-08-06</span>); 3 needed |
| K185-A4 | not met | "budget meal planner" 13 of 25 new, but 6 new paid apps have over 100 ratings (TapCook 4,983, mise 3,681); "food waste meal planner" 10 of 25 new, 3 paid over 100 |
| G4 (read a) | codes count | blind re-code agrees on the one pack-aware row and on 10 of 10 sampled (seed 185); 9 rows outside the sample differ on own recipes only |
| Q185-1, Q185-2 | neither met | forum pack waste and pack asks: 7 of 76 posts (9.2%) with the set-aside rows kept, 7 of 54 (13.0%) without; the lower applies; re-code agreement 7 of 10 (8 needed). This section prints the count; section 2's wording does not change |
| Q185-3 | recorded | H177 plus read b, 494 review rows: pack size 5, store price wrong or till total 10, own recipes 3; price form 12 in read b |
| Q185-4 | not met | PlateJoy is named for shared ingredients; it is in no top 10 and is not a new entrant, so A1 to A3 cannot apply |
| K185-C1 | not met | no H173 verdict applied |
| K185-C2 | open until <span class="nw">2026-10-28</span> | Paprika read 1: $4.99 (not under); read 2 due on or after <span class="nw">2026-10-28</span> |
| K185-C3 | open | no re-run yet; today's middle midpoint 0.85%, worst end 8.5%, not D |
| K185-C4 | open until <span class="nw">2026-10-28</span> (closest kill left) | needs Paprika read 2; caps at B-, so it cannot lower the letter further |
| K185-D1 | not met | replaced by D2 |
| K185-D2 | **met** | parser fails (392 of 442 all-fields-exact, 88.7%; ten stress shapes 0 of 5; reading refused: hold-out bench only, 372 of 372); receipts fail on matching (73 of 253, 28.9%; prices 98.0%); unit table passes (43 ingredients, CC0); optimiser passes (spoiled waste cut 71.4% against the overlap greedy, 200 of 200 better, 0.69 s max) |
| K185-D3 | not met | the optimiser passes |
| K185-E1 | not met | 7 hits, all in section 6's exclusion sentence; one stray word by the lowering reading: the forum name in section 2 (line 44) contains one of the barred words. Reword it; Fit is not clear until then |
| K185-E2 | not met | no screen, setting or field takes an input of the kind the rule bars |
| K185-E3 | not met | no retailer, feed or delivery price source named; three lines to add: who types the shipped pack table, drop schema.org estimatedCost on import, postal codes and several stores take prices only from that store's receipts |
| K185-E4, E5 | as written | the terms question and real receipts are on the Investor list (section 6) |
| Not in the rules | recorded | the week mockup opens raw chicken Monday and finishes it Friday against its own 3-day window (read e S-1); spoil windows say how long food keeps, which no section 9 rule covers; passed to the chair |

</div>


Result: **B-** (ladder: Novelty B-, Depth C+ does not step up; no cap binds). The weaknesses this adds: the parser breaks on common recipe shapes it was not written for ("3 cups plus 2 tablespoons", "a cup of", "1 14-oz can"), and naming receipt items needs real receipts to learn from. Read c's second Paprika read is the only rule still open; it cannot take the letter below B-.

## 16. Stress test, <span class="nw">2026-10-24</span> 19:52 ET (Odalys, <span title="A numbered batch of planned work, with its own plan file.">refill</span> 23 applied)

Applied by someone who wrote neither H177 nor the rules (G9). Rules: `research/hunt/refill-23.md` sections 5 and 6; one line per code with its count in section 8 there. Reads: Maren's pack-size read (`research/hunt/H201.md`, 9cb6d8f4) and Idris's web and desktop read (`research/hunt/H202.md`, ff521c0c). Section 5 cannot move a letter, and section 6 moved none. **Result: the letter stays B-.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 16. Stress test, &lt;span class=&quot;nw&quot;&gt;2026-10-24&lt;/span&gt; 19:52 ET (Odalys, refill 23…, scrolls sideways" style="--tw:874px" markdown="1">

| Code | Result | Count | Move |
|---|---|---|---|
| K201-P, a licensed first week | **met** | USDA FoodData Central is CC0 ("No permission is needed for their use"); 40 of 40 fixed ingredients have 3 or more parsable pack sizes (28,640 products parsed); 34 of 40 with the six rows the reader flagged as running high dropped | the line below |
| K201-K1 | not met | licence allows bundling; 40 of 40 parse | none |
| K202-1, a web or desktop tool doing all of it | not met | 0 of 15 coded; search text only, maker pages unread (G2); closest: Meal Matcher, own recipes and pack-exact planning unconfirmed, no receipt part seen | none |
| K202-2, partial tools | met | 10 PART: Grocy (pack-to-unit factor and price typed by hand; leftover stays in stock but no plan carries it into a dinner), a third-party receipt importer for Grocy, Mealie, RecipeSage, the Pantry plugin for Obsidian, Plan to Eat, Gourmet Recipe Manager (recipe import and lists), and Meal Matcher, NourishGrid, Meal2Shop (store prices, own recipes unconfirmed) | this line; no move |

</div>


**The first week plans from USDA pack sizes, then from your receipts.** The shipped pack table (the K185-E3 question "who types it") can come from USDA's Branded Foods label data: US sizes only (99.3% of rows), shown as sizes, never brand names (CC0 does not clear trademarks). Loose produce is thin: bell peppers have 7 parsed products, green onions 10. About 15% of the reader's 200 sampled products were mixes or flavoured items, so the table needs a hand-check before it ships. Attribution to FoodData Central goes on the licence screen; telling USDA about the app is outside contact (Commandment 10) and is the Investors' call.

What the web read adds. The parts exist apart (Grocy's pack factors, recipe importers, store-price planners), and a 2024 Wageningen paper plans meals from retail pack sizes; no tool found joins the user's recipes, receipt-learned packs and a carried part-pack. "No tool found" is a read of search text, not of the tools' own pages.
{% endraw %}

</div>
