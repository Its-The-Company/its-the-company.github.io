---
layout: "default"
title: "Research pass 6: problem-solving apps with real algorithms, no games"
section: "documents"
description: "Here is the shape of it: B is the only one where the hard problem is the product and the market is large; it lives or dies on a dataset licence read, which is a day&#x27;s work and should come first. A and C are buildable\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/pass6.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass6.md</code></span></div><h1>Research pass 6: problem-solving apps with real algorithms, no games</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "Requirements for the Seating Chart Optimizer I made for planning my wedding party: * 120 guests: 49 couples and 22 singles * To be seated at 11-ish tables of 8, 10, 12 people each ... * Couples must be seated at the same table" (HN, 2024-01-02, https://news.ycombinator.com/item?id=38846503). Here is the shape of it: the people with the hardest problems are writing their own solvers, because the paid apps sell drag-and-drop and a subscription.

Brief: issue #10 comment (amendments.md, 2026-10-22 15:24 ET). No games. Utility or convenience apps with Netsmith-level algorithmic depth, or a hard problem AI can now solve where the answer is worth money. Stay outside Commandments 6-8. At least one idea with a meta component.

## Method and limits
- Passive reading only (C10). No one contacted, nothing posted.
- Competitor prices: `tools/price_table.py` (iTunes Search + store page IAP list, US, 2026-10-22). Sizing: `tools/sizing.py` (ratings-to-downloads range; rough, sizing partner still needed).
- Low-star reviews: `tools/review_mine.py reviews` (Apple RSS, up to 10 pages), saved under `research/reviews/` (files named below). Theme counts by `tools/theme_count.py`, then **hand-checked with `--show`**; where I removed false matches, the hand count is the one given.
- Forums: `tools/forum_search.py` (HN Algolia, Stack Exchange). Reddit and most hobby forums still return 403, so forum evidence is HN-heavy.
- Sales maths: Apple Small Business Program commission 15% (enrolment still pending with the Apple membership), so net = price x 0.85, before any VAT/sales-tax Apple withholds in some storefronts. $4.99 -> 48 sales; $9.99 -> 24; $14.99 -> 16; $19.99 -> 12.
- A pattern across every <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> today: 2026 has brought many new lookalike entrants with 0-3 ratings (seating, tile, sun hours, projector sewing, cut lists). That is a Guideline 4.3 and discoverability risk in every lane, and I note it per idea.
- Names below are working titles only; no name-risk check run.

## Screening: 10 ideas looked at, 4 kept


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Screening: 10 ideas looked at, 4 kept, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | Idea | Algorithmic core | Evidence found | Kept? |
|---|---|---|---|---|
| 1 | Seating-plan solver for weddings and events | constraint optimisation (together/apart/groups/table sizes), floor plan to scale | HN Show HN 132 pts, 106 comments; Zola 15 of 240 low reviews about paywalled seating; Seat Puzzle 7 of 19 on price | **Yes (A)** |
| 2 | Sheet-music scanner that you can correct, with transposition | on-device optical music recognition (CV), engraving, synthesis | 21/209 and 26/248 low reviews on accuracy; lane 112-337 downloads/day | **Yes (B)** |
| 3 | Cut-list and sheet-goods optimiser, one-time price, offline | 2-D guillotine nesting with kerf, grain per part, mixed thickness | 10 of 27 low reviews object to subscriptions | **Yes (C)** |
| 4 | Review Desk: review mining for app makers (meta) | on-device text clustering, theme counting with quotes | HN indie tool posts; our own tools; conflict of interest (mine) | **Yes (D, meta)** |
| 5 | Shift-rota auto-scheduler for small teams | constraint solver | Sked + Deputy: 181 low reviews, **0** ask for auto-generation (hand-checked: 1+3 regex hits, all about clock-outs/glitches) | No: no voiced need; wage/time data edges toward payroll |
| 6 | Room acoustics + speaker placement | sweep measurement, room-mode simulation | HouseCurve (1470695018) 263 ratings, $70 lifetime; 6 low reviews, none about placement; HN "Room EQ Wizard" 13 hits, desktop-happy | No: thin, and a calibrated-mic problem we cannot test |
| 7 | Projector sewing (project PDF patterns 1:1 onto fabric) | homography calibration, keystone | IntelliSew, Cutline new 2026 entrants; Sewsy 74 ratings, tip jar; SE crafts 0 threads | No: needs projector hardware we can't test; entrant wave |
| 8 | Tile layout planner (minimise cuts and slivers) | 2-D layout optimisation | Floor Covering (1058020868) 415 ratings: ad complaints, asks for hexagon, cutouts, 33% offset; 3 new 2026 entrants | Side note: real asks, but depth is modest; folds into C as a later lane |
| 9 | Sun-hours map for garden beds | sun-path geometry + horizon scan | 4 entrants in 2026 (Sunplot, Sunpatch, Sun Finder) all 0-7 ratings | No: crowded with fresh clones |
| 10 | Garment pattern drafting from body measurements | parametric geometry | DartSide (6468904118) 7 ratings, 1.4 avg: "completely useless if you want to do ... dart manipulation"; desktop Seamly2D free | No for now: one weak signal; worth a pass of its own |

</div>


Raw price tables for 1-3 and 6-10 were printed by `tools/price_table.py` with the search terms "seating chart wedding", "sheet music scanner", "cut list optimizer", "shift schedule maker", "room acoustics", "speaker placement", "projector sewing", "tile layout", "sun hours garden", "sewing pattern drafting".

---

## A. Seatsolve (working title): a seating-plan solver for weddings and events. Grade C+.

**What it is, in plain English.** You type or import your guest list, mark who must sit together (couples, families, "the Rivera family (4)") and who must not (the divorced uncles), give the room's real size and your tables, and the app works out a seating plan that keeps the most people happy. You can lock anyone you have already placed and re-solve around them, drag people by hand, compare two versions side by side, and print place cards, table lists and a to-scale floor plan for the venue. Everything stays on the phone; no account.

**Who it is for.** Couples planning a wedding with 60-250 guests, usually the bride or groom aged 25-40, in the 2-6 weeks before the day; second, people running a family event, a gala dinner or a reunion. Not professional planners in v1.

**Evidence of need.**
- HN, "Show HN: Better Seater - Wedding seating chart optimizer" (https://news.ycombinator.com/item?id=38845650), 132 points, 106 comments, read via the HN API. 21 comments mention keep-apart or conflict rules, 26 mention couples/families/groups (regex, scanned by eye). People who wrote their own: 38846503 (own optimiser, 120 guests), 38846964 (built one for classroom placement; "people always ask me if I can modify it for wedding seating"), 48453838 (2026-06-08: "a cute GUI on top of a simple constraint solver ... it helped me feel confident in the final result"). Feature asks: lock hand-placed guests and optimise around them (38846762); compare versions (38846983).
- Zola (852691916), `research/reviews/seat-852691916.md`: 15 of 240 low reviews are about the seating chart, nearly all about the $14.99 paywall after 15 guests. "If you were hoping to use this app to make your seating chart then I hope either your entire wedding is less than 15 people or you're okay with upgrading to premium."
- Wedding Seating Chart Planner / Seat Puzzle (1080012173), `research/reviews/seat-1080012173.md`: 19 low reviews; price or billing 7 (hand count), can't rotate tables or set room size to scale 5, items reappearing or moving 4. "I'm sorry, $20 a month? I can just use paper and sticky notes. I'm planning my wedding, not running a business. I wouldn't pay more than $5." "Deleted my seating chart the day before my wedding."
- What they are doing instead: sticky notes, spreadsheets, their own Python.

**Competitors and prices (US, 2026-10-22).** Wedding Seating Chart Planner: $19.99/month, $69.99-$129.99/year, $139.99 all access; 400 ratings, 3.4-10.2 downloads/day. Zola: seating chart $14.99. Seatful (2026-09): Event Pass $14.99, Pro $39.99/month. Tablee (2026-08): event unlock $8.99, solver on device. Tablecharm (2026-07): "Free to build and solve. A one-time unlock covers one wedding", $29. Web: Better Seater (HN), Seatplan.io (HN 46487945).

**Honest read.** The gap I hoped for (no solver on iOS) closed this summer: Tablecharm and Tablee already solve on device for a one-time price. They have 0-2 ratings, so nobody has won yet, but we would be the fourth near-identical entrant: real 4.3 risk. Our edge would have to be depth: room to scale with rotation, lock-and-resolve, version compare, venue printouts, meal counts.

**Sales for $200 net.** $14.99 per event -> 16 sales.

**M1 feasibility.** High. Simulated annealing or a small CP search over 250 guests runs in well under a second on device; the floor plan is drawn by code; no network. 2-3 weeks to a tested v1. Guest names are customer data kept on the phone only (privacy label: data not collected).

**Room to grow.** Venue templates, catering exports, RSVP import, multi-day events, corporate dinners, planner tier, Mac.

```
novelty        [##---] 2
need/downloads [###--] 3
profitability  [###--] 3
complexity     [###--] 3
```

---

## B. Partfix (working title): a sheet-music scanner you can correct, with transposition. Grade C+ (demand B, feasibility C).

**What it is, in plain English.** Photograph a printed page of music. The app reads the notes (optical music recognition, done on the phone), redraws them cleanly, and plays them back. Where it guesses wrong, you tap the note and fix it, and it learns nothing it shouldn't: it just shows you every low-confidence note in yellow so you check those first. Then it transposes the part for your instrument (B-flat trumpet, E-flat sax, F horn, or a new key for a singer) and exports clean PDF and MusicXML.

**Who it is for.** Amateur and semi-pro musicians who play from paper: community band and orchestra players, choir singers learning a part, jazz players at jam sessions with a different-key instrument, church musicians, music teachers preparing adult ensemble parts. Mostly adults 30-70.

**Evidence of need.** This is the clearest "hard problem AI can now solve, and people pay for it" in the pass.
- Sheet Music Scanner (884984324), `research/reviews/omr-884984324.md`: 209 low reviews. Accuracy 21 (hand-checked with `--show`; every hit is a real accuracy complaint), subscription or price 37, editing/correcting 24, playback 16. "Pretty amazing but not good enough ... there were enough mistakes that I spent hours going back and fixing things manually." "Not bad, no way to correct mistakes ... there's no way to tell it 'hey that's wrong'."
- PlayScore 2 (1449591118), `research/reviews/omr-1449591118.md`: 248 low reviews. Accuracy 26 (hand-checked), playback 38, multi-page 25, subscription 30, crashes 9. "Accuracy problems ... especially not being able to edit it or see where" ; "Inherently Flawed: As with any OCR app, there will be mistakes. And since this app is for playback of the music with no editing functionality, you're going to have to put up with the mistakes."
- Transposition was asked for directly in only 3-4 reviews per app (honest: low count), but HN 48644574 (2026-06-23): "replace a stack of jazz 'Real Books' at jam sessions ... it would be great to transpose on the fly for e.g. Bb or [Eb]". HN 44834171: "It's orders of magnitude harder than text OCR ... general-purpose LLMs totally fail at it."
- What they are doing instead: re-entering notes by hand into Dorico/MuseScore ("It would be faster for me to enter the notes into Dorico than to fix all of the egregious errors").

**Competitors and prices.** Sheet Music Scanner: one-time tiers $4.99-$34.99; 6,483 ratings, 48-144 downloads/day. PlayScore 2: $6.99/month, $59.99/year; 4,752 ratings, 56-168/day. Halbestunde: $19.99-$59.99/year. Sheets Music Scanner & Reader: $49.99/year. Newzik, MuseScore (scan inside larger suites). Web: Soundslice scanning. **This is the biggest lane in the pass by far** (lane total 112-337 downloads/day across the sized apps).

**Sales for $200 net.** $14.99 one-time -> 16 sales; $9.99 -> 24.

**M1 feasibility.** Low to medium, the hardest of the four. v1 must be narrow: printed, single-staff parts (band parts, lead-sheet melodies, choir lines), one page at a time. Needs a trained symbol detector (Create ML object detection runs on the M1) plus classical staff-line detection (Vision/Accelerate). **Training data licences are unverified and decide this idea:** I believe MUSCIMA++ is non-commercial (CC BY-NC-SA), which would rule it out; DeepScores and camera-PrIMuS need their licences read before any use (C5). Engraving needs a music font (Bravura is SIL OFL, to confirm). Playback must be synthesised by code (C9 allows it; no sampled or AI audio). Risk: shipping below incumbents' accuracy in 30 days. If it works, it is the hardest to clone: the moat is real.

**Room to grow.** Multi-staff piano, choir SATB part extraction, handwriting, page-turn by camera, setlists, practice loops, iPad Pencil correction, Mac.

```
novelty        [###--] 3
need/downloads [#####] 5
profitability  [####-] 4
complexity     [#####] 5
```

---

## C. Panelyard (working title): a cut-list optimiser you buy once, that works offline. Grade C+.

**What it is, in plain English.** You list the parts you need for a build (or describe a cabinet and let the app break it into parts), say what sheets and boards you own or can buy, and the app lays out the cuts so you waste the least plywood: saw kerf counted, grain direction per part, different thicknesses in one project, offcuts saved to an inventory for the next job. It prints cutting diagrams and part labels, works with no signal on a job site, and costs one price, once.

**Who it is for.** Hobby woodworkers and home renovators (mostly 30-70) building <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelves</span>, cabinets and furniture from sheet goods; second, small cabinet shops and contractors pricing jobs on site.

**Evidence of need.** Saved reviews of three apps (`research/reviews/cut-1544888549.md`, `cut-1629462860.md`, `cut-6465744401.md`): 27 low reviews; **10 object to subscription or price** (hand count from 12 regex hits; removed a login complaint and a spinning-purchase complaint), 5 to number entry, 3 to grain or thickness settings, 1 to needing a network.
- "You can't buy a limited non-commercial use version! ... I would pay for a 1-2 project version! But as a hobbyist it's just not worth the recurring cost!" (SheetCut, 1544888549)
- "The app requires a network connection to calculate/nest pieces. Very frustrating when I was trying to work with my client at their remote location ... $50.00 a year is a lot."
- "You can't set sheet thicknesses for projects with different sheetgoods. Grain orientation should be selectable per piece- not per project."
- HN 50098076 (2026-10-15): a hobbyist relies only on cutlistoptimizer.com and finds CAD tools "beside the point for _most_ wood working projects".

**Competitors and prices.** CutList Optimizer (6465744401): $4.99/month, $39.99/year, 120 ratings, 3.6-10.7/day, "combines AI with advanced optimization algorithms". SheetCut: $4.99/month, $49.99/year. SmartCut (1579298749): **$1.99 one-time** premium, per-part grain lock, kerf: this already answers part of the gap. Web: cutlistoptimizer.com; HN Show HNs Cut List Studio, ShopSpec. Eight near-lookalikes in the top 8 for "cut list optimizer": heavy 4.3 risk.

**Sales for $200 net.** $19.99 once -> 12 sales; $9.99 -> 24.

**M1 feasibility.** High. Guillotine and MaxRects heuristics with local search, all on device; diagrams drawn by code; PDF via PDFKit. 2-3 weeks. The parametric cabinet-to-parts step is where depth lives.

**Room to grow.** Cabinet designer, edge banding totals, offcut inventory, 1-D lumber lists, tile layout (screen #8: hexagons, cutouts, 33% offset) as a sister mode, CNC export.

```
novelty        [##---] 2
need/downloads [###--] 3
profitability  [###--] 3
complexity     [####-] 4
```

---

## D. Review Desk: review mining for app makers, built in public on our own reviews (meta). Grade C+.

**Conflict of interest, first:** this is my own career goal turned into a product (my quote-and-count method). I flagged it in pass 5 (3C, grade C). Weigh my enthusiasm down accordingly.

**What it is, in plain English.** An iPad and Mac app for people who make apps. Enter any App Store app (yours or a competitor's); it pulls the public reviews, groups the complaints into themes on the device, counts them, and lets you read every review behind every count before you trust it. Each finding exports as a line with its count, its quotes and their links. For your own app, it tracks how a theme rises or falls version by version.

**The meta part.** The product reflects its own making: the company uses it on its own app, publishes the counts on the site, and every Review Desk release note names the counted complaint (with links) that caused the change. Its first worked example is the company's own launch; its method is the one the company's researcher used to choose the product. The app's story is the record of how it decided what to build.

**Who it is for.** Indie iOS developers and two-to-ten-person app studios, mostly 25-45, who read reviews by hand today; second, product managers and UX researchers at small software firms.

**Evidence of need.** Weaker than A-C and partly from inside our walls.
- Inside: `tools/review_mine.py` and `tools/theme_count.py` are used every day here, and my hand counts corrected my own regex counts twice (research/knitting.md: lost 10 -> 5, size 11 -> 4; this pass, cut-list 12 -> 10, Seat Puzzle 8 -> 7). Uncorrected keyword counting is the common mistake this tool would prevent.
- HN 45989976 (2025-11-20): "AppReview AI, a Mac + iPad app to analyze App Store reviews privately and offline ... as an indie developer, reading hundreds of reviews from competitor apps was slow, noisy, and hard to ext[ract]". HN 37480763 (37 pts): reading a $2M/month app's strategy through its reviews.
- Count of developers asking for this, outside our walls: not taken. Honest gap.

**Competitors and prices.** Web dashboards Appbot and AppFollow (pricing page not readable today; unverified), AppTweak; Mac/iOS: Starry (review monitor, 4 ratings), Helm for App Store Connect (39 ratings), AppReview AI (store listing not found by search). Pricing for devs is usually monthly; one-time is a differentiator.

**Sales for $200 net.** $19.99 once -> 12 sales.

**M1 feasibility.** High for the parts we already run (port two Python tools to Swift; NaturalLanguage sentence embeddings for clustering on device). Real risk: Apple's public review RSS returned zero entries for a whole pass earlier today (research third pass), so competitor mining is fragile; your own app's reviews can come from the App Store Connect API with the developer's own key. Guideline 5.2 on using Apple's public review data needs a read before building.

**Room to grow.** Version trend charts, competitor comparison, keyword-gap reading, reply drafting by hand, Play Store, team sharing.

**Fallback meta if the Investors prefer no conflict:** A's first-run tutorial could seat the company's own workers, built from the real meeting records. That is lighter meta, a garnish rather than the product's story.

```
novelty        [###--] 3
need/downloads [##---] 2
profitability  [###--] 3
complexity     [####-] 4
```

---

## Summary


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Summary, scrolls sideways" data-n="1 5" style="--tw:1124px" markdown="1">

| Rank | Idea | Grade | Price idea | Sales for $200 | M1 feasibility | Biggest risk |
|---|---|---|---|---|---|---|
| 1 | B. Partfix (correctable sheet-music scanner + transpose) | C+ (demand B) | $14.99 once | 16 | low-medium | training-data licences; accuracy in 30 days |
| 2 | A. Seatsolve (seating solver) | C+ | $14.99 per event | 16 | high | three 2026 solver entrants; 4.3 |
| 3 | C. Panelyard (cut-list optimiser, one-time, offline) | C+ | $19.99 once | 12 | high | crowded lookalikes; SmartCut $1.99 one-time |
| 4 | D. Review Desk (meta) | C+ | $19.99 once | 12 | high | my conflict; RSS fragility; no outside count |

</div>


Here is the shape of it: B is the only one where the hard problem is the product and the market is large; it lives or dies on a dataset licence read, which is a day's work and should come first. A and C are buildable and wanted, but in 2026 everybody else built them too. D is the meta pick and the one I would most like to be true, which is why I graded it with a heavy hand.

Open: verify OMR dataset and font licences (B); name checks; a sizing partner for real unit estimates; Guideline 5.2 read (D); hand-read Better Seater thread beyond the regex counts (A).
{% endraw %}

</div>
