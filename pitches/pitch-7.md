---
layout: "default"
title: "Pitch 7: Seatsolve, a seating-plan solver for weddings and events"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 7 · round 2 of #10, pitch 2 of 3</div><h1>Pitch 7: Seatsolve, a seating-plan solver for weddings and events</h1><p class="lead"><code>pitches/PITCH-7.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (<span class="nw">2026-10-22</span>) by Ines, from Wrenna's pass 6 (`research/pass6.md`, idea A) plus my own store search and name checks today. Posted as a `pitch` issue as soon as formed, per #6. Pitches #7, #9, #11, #12, #14 and Pitch 6 (Partfix) stay stored; nothing is withdrawn. This is the second of three in the round the Investors asked for at 15:24 ET (no games; Netsmith-level algorithmic complexity; at least one meta pitch, which is Pitch 8).

## In plain English

**What it is.** Seatsolve works out where everyone sits. You type or paste your guest list (or import it from a spreadsheet), mark who must sit together (couples, families, "the Rivera table"), who must not (the divorced uncles, the two friends who fell out), who should be near the front or the exit, and what tables you have (round tables of ten, two long tables of twelve, a head table). You give the room's real size and drag the tables to where they will stand. Then the app solves the plan: every rule honoured where possible, the broken ones listed plainly, and the result shown as a to-scale floor plan. You can lock anyone you have already placed and re-solve around them, move people by hand and see which rules that breaks, keep two versions and compare them side by side, and print place cards, table lists for the caterer, and a floor plan for the venue. Everything stays on the phone; no account.

**One session, pictured.** Three weeks before the wedding, the couple has 120 guests, 49 couples and 22 singles, eleven tables, and a list of six pairs who must not share a table. They enter the rules in twenty minutes, tap Solve, and have a plan in under a second with zero rules broken. The groom's mother moves her sister to the front table; the app re-solves around that lock and reports that two cousins are now split, which the couple accept. They print 120 place cards and send the venue a PDF floor plan.

**Who it is for.** Couples planning their own wedding, 60 to 250 guests, mostly 25 to 40, in the last six weeks before the day; second, anyone running a gala, reunion, company dinner or large family event. Not professional planners in version 1 (they want multi-event and client sharing). Why they pay: the big wedding apps paywall seating after 15 guests ($14.99 at Zola), the dedicated planner charges $19.99 a month ("I'm planning my wedding, not running a business. I wouldn't pay more than $5"), and the people with the hardest lists are writing their own solvers in Python because no app solves for them. Seatsolve is one price, once, for one event. Demographics are my judgment from the reviews and the Hacker News thread, not measured.

---

**Recommendation first.** Seatsolve is buildable, wanted and priced by the market, and I do not recommend it ahead of Partfix (Pitch 6) because the gap closed this year. Wrenna's pass 7 store search (7 terms, <span class="nw">2026-10-22</span>) found 21 non-classroom seating-chart apps released 2025-09 to 2026-09 (I had counted eight; corrected), two of which already solve on device for a one-time price. We would be the twenty-second. If the Investors prefer the lower build risk, it is a sound choice: **Seatsolve Event, $14.99 one-time per event**; 20 sales reach $200 net at 30 percent, 16 at 15 percent; submit Day 17 (<span class="nw">2026-11-07</span>).

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          ██░░░  2   solvers on iOS exist since mid-2026; our edge is depth (lock-and-resolve, compare, room to scale, broken-rule report)
market need      ███░░  3   counted complaints about paywalls and price; a 132-point HN thread; a 3.4-10.2/day incumbent lane
profitability    ███░░  3   buyers pay $14.99-$139.99 today; one event per buyer, so no repeat sales
complexity       ███░░  3   the solver is a few days; the floor plan editor, printing and compare are the work; easy to copy
room to grow     ████░  4   venue templates, RSVP import, meal counts, multi-day events, planner tier, Mac
```

**Complexity, honestly.** Lower than Netsmith. The solver is constraint optimisation over at most a few hundred guests: a cost function (together, apart, near, table capacity, group balance), simulated annealing or a small local search, well under a second on device, deterministic given a seed so tests can assert results. Idris could have a tested solver by Day 5. The rest is a product: a floor-plan editor with tables to scale and rotation, the rule editor, a broken-rules report that explains itself, version compare, and three printable outputs. That is nine to twelve engineer-days of ordinary iOS work. It is easier to build and easier to copy than Partfix, which is why it rates 3.

What would make this fail: being invisible. The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> is small (3.4-10.2 downloads per day for the incumbent, by Wrenna's rough sizing), it is November (US wedding season peaks May to October; holiday parties and galas run November to December, uncounted), and 21 lookalikes launched in the last year (corrected from eight). A ninth needs a visible difference, and Guideline 4.3(b) says the same.

---

## Candidate: Seatsolve

Mockup: `pitches/mockups/seatsolve.png` (drawn by `tools/mockup.py`: tables are circles placed on a grid by code, seats are dots on each circle; the guest counts are the HN brief's 120 guests; no images).

### Evidence of need
- **People with hard lists write their own solvers.** HN "Show HN: Better Seater - Wedding seating chart optimizer" (https://news.ycombinator.com/item?id=38845650), 132 points, 106 comments. 38846503: "120 guests: 49 couples and 22 singles ... 11-ish tables of 8, 10, 12 ... Couples must be seated at the same table" (wrote his own). 38846964: built one for classroom placement, "people always ask me if I can modify it for wedding seating". 48453838 (<span class="nw">2026-06-08</span>): "a cute GUI on top of a simple constraint solver ... it helped me feel confident in the final result". Asks: lock hand-placed guests and optimise around them (38846762); compare versions (38846983). Wrenna's counts of the thread (21 keep-apart, 26 couples/groups) are regex scanned by eye, not hand-read; treat as approximate.
- **The big apps paywall seating.** Zola (852691916, 98,460 ratings), `research/reviews/seat-852691916.md`: 15 of 240 low-star reviews are about the seating chart, nearly all the $14.99 paywall after 15 guests. "If you were hoping to use this app to make your seating chart then I hope either your entire wedding is less than 15 people or you're okay with upgrading to premium."
- **The dedicated planner is priced like business software.** Wedding Seating Chart Planner (1080012173, 400 ratings, $19.99/month, $69.99-$129.99/year, $139.99 all access), `research/reviews/seat-1080012173.md`: 19 low-star reviews; price or billing 7 (hand count), cannot rotate tables or set the room to scale 5, items moving or vanishing 4. "I'm sorry, $20 a month? I can just use paper and sticky notes." "Deleted my seating chart the day before my wedding."
- **What they do instead:** sticky notes, spreadsheets, their own Python.
- **Store, checked today** (`tools/appsearch.py`, US, "wedding seating chart" and "seating chart solver"): Wedding Seating Chart Planner (400 ratings, 2016); Zola; The Knot; and these entrants, all 0-2 ratings: reSeated (2025-11), Seatbee (2026-05), SeatCraft (2026-07), Tablecharm (2026-07, "free to build and solve, one-time unlock covers one wedding", $29), Tablo (2026-08), plus Tablee (2026-08, $8.99 event unlock, solves on device) and Seatful (2026-09, $14.99 event pass) from Wrenna's price table, and Seated (2022, 7 ratings). **Correction (pass 7, `research/pass7.md`): 21 entrants in twelve months, not eight; two with a solver and a one-time price.** The eight above are the ones I listed by hand; the other thirteen include Table Zen, SnapSeat, SeatFlow, Placecard, ChartSeats, Seatly, Headtable and Seated: Event Seating Chart (6813048333, <span class="nw">2026-09-30</span>, an "event" positioning). Seatsy has the most ratings of the new ones (16). Nobody has won, and the field is crowded.

### The idea, and what is new
Seatsolve is a solver that shows its reasoning. Rules are first-class objects (together, apart, near, at this table, not at the back), each with a weight. Solve runs on device in under a second and returns a plan plus a report: which rules it honoured, which it could not, and why ("Rivera family (6) split across T4 and T5: no table of 6 free after the head table"). Lock any guest or table and re-solve around it. Keep versions and compare two side by side with the differences highlighted. The floor plan is to scale, tables rotate, and the venue gets a PDF of it. Outputs: place cards (sheet layouts for standard card stock, drawn by code), table lists by table and by guest, meal counts per table if meals are entered. Import from CSV. No account, no network.

New on iOS: the explained report of broken rules, lock-and-resolve, version compare, and meal counts in one app with a one-time price. Not new: solving on device for a one-time price (Tablecharm and Tablee since summer 2026), or seating charts as a category. I will say so in the review note rather than wait for 4.3(b).

### Names, checked <span class="nw">2026-10-22</span>
Checks: App Store via `tools/name_check.py` (iTunes Search, US), domains via DNS and whois, trademarks by web search only. A USPTO search is still needed.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-22&lt;/span&gt;, scrolls sideways" style="--tw:997px" markdown="1">

| Product name | App Store | .com | .app | Note |
|---|---|---|---|---|
| **Seatsolve** (preferred) | none; nearest Seat Escape, TickPick, Seat Alerts | registered | no DNS record; whois did not answer | says what it does |
| Seatwright | none | registered | no DNS record | safe, less plain |
| Tablewright | taken (Tablewright: SQLite Editor, PostgreSQL Editor) | registered | NS only | dropped |

</div>


Recommendation: Seatsolve by Lowtide Software, seatsolve.app if the registry confirms it.

### <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span>
- A tool with a real job (Commandment 8); weddings and events are not a banned area (7). Guest names are customer data and never leave the phone; no account; privacy label "Data Not Collected" (6).
- Buildable on one M1 Mac mini: a pure Swift `Seating` package (model, cost function, annealing with a seeded <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>, report) with XCTests asserting results on fixture lists; SwiftUI floor-plan editor; UIGraphicsPDFRenderer for cards, lists and plan; StoreKit testing in Xcode. Nothing needs App Store Connect before the membership is active.
- Every visual is drawn by code (9): tables, seats, cards, the icon (a circle of ten dots).
- Scope: a coherent slice App Review accepts: list, rules, solve, adjust, print.

### Roadmap after version 1
Venue templates and a shared floor-plan library; RSVP and meal import from the big planners' CSV exports; dietary flags on place cards; multi-day and multi-room events; escort-card and seating-board layouts; a planner tier with several events and client sharing; corporate dinners; iPad and Mac.

### Revenue plan
Free download: enter any number of guests, rules and tables, solve, see the floor plan and the report. **Seatsolve Event, $14.99 one-time**, unlocks one event's exports (place cards, table lists, floor plan PDF), version compare and CSV import. A second event is a second purchase (non-consumable per event is awkward; a consumable "event unlock" is the honest StoreKit shape, and I will check 3.1.1 on it before Day 10). No subscription, no ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 5" style="--tw:484px" markdown="1">

| Price | Net at 30% | Sales for $200 | Net at 15% (SBP) | Sales for $200 |
|---|---|---|---|---|
| $14.99 (plan) | $10.49 | 20 | $12.74 | 16 |
| $9.99 (fallback) | $6.99 | 29 | $8.49 | 24 |

</div>


Why $14.99: Zola's seating unlock is $14.99 and Seatful's event pass is $14.99, so the number is already in buyers' heads; Tablecharm asks $29 and Tablee $8.99, so we sit in the middle with the deeper product.

### Build plan (Day N = <span class="nw">2026-10-21</span> + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose. `Seating` package: model, CSV import, cost function, annealing with seed, XCTests on fixture lists (20, 120, 250 guests). |
| 4-6 | 10-25 to 10-27 | Rule editor, broken-rules report, lock-and-resolve, version compare. Solver tuned on the 250-guest fixture (target under one second). |
| 7-9 | 10-28 to 10-30 | Apple membership due Day 7. Floor-plan editor to scale with rotation; table shapes (round, long, head). |
| 10-12 | 10-31 to 11-02 | Place cards, table lists, floor plan PDF; StoreKit 2 event unlock tested with StoreKit testing; iPad layout. Code-drawn icon and screenshots, store copy, privacy label; creative approvals requested. Paid Apps Agreement, tax and banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Real-device pass through TestFlight; print a sheet of place cards (a human with a printer; I will ask in that day's report). Bug fixing only. |
| 16 | 11-06 | Submission build archived; review note lists the differences from the 21 entrants. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price decision Day 25. |

</div>


Cut list if behind on Day 12, in order: meal counts, CSV import (ship paste), version compare, table rotation. Never cut: the solver, the broken-rules report, lock-and-resolve, place cards and floor plan PDF.

Budget asked: one domain. Nothing else.

### Main risks
1. **Guideline 4.3(b), "indistinguishable from what's already widely available".** 21 entrants in twelve months (corrected from eight); risk is higher than first written. Mitigation: the explained report, lock-and-resolve and compare are visible in the free tier and named in the review note; if rejected, the appeal cites them.
2. **Season.** November is off-peak for US weddings. Pass 7 found no November <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>: 0 of 90 seating-app reviews and 0 of 106 Better Seater comments name a holiday party or gala, and reviews dated Nov-Dec are 7 of 90 (8%). The proxies lean against a lift. Non-wedding use is real (15 named occasions vs 12 weddings: birthdays, dinners, bar mitzvahs, fundraisers), but small parties, not galas. Galas are run by committees and planners with their own tools. I still do not know the November lane size; a Google Trends read by an Investor would settle it.
3. **One sale per buyer.** No repeat purchases, so <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> depends entirely on new buyers found by search in a lane of 3.4-10.2 downloads a day for the incumbent. Twenty sales in ten days is a large share of that.
4. **Data loss.** "Deleted my seating chart the day before my wedding" is the worst review in the lane. Mitigation: autosave on every change, versions kept, export always available for a paid event.
5. **Discovery.** Keywords: "wedding seating chart", "seating plan", "table plan", "seating chart maker", "event seating". The incumbents own the first; the Investors' reach is the only outreach (C10).
6. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe.

---

## Across all open pitches
Partfix (Pitch 6) first, with its Day 6 tripwire; Netsmith (#11) as the fallback; Seatsolve here if the Investors want the lowest build risk in this round and accept the crowding; Themecount (Pitch 8) as the meta option. #7, #9, #12 and #14 stay stored.

Decisions asked of the Investors: whether Seatsolve is a candidate or a stored option; the product name (Seatsolve, Seatwright) and company name (Lowtide Software). Open research (board): a hand read of the Better Seater thread beyond the regex counts; a count of November event-seating demand (galas, holiday parties); USPTO check for the names.
{% endraw %}

</div>
