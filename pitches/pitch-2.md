---
layout: "default"
title: "Pitch 2: a feature-rich product, per issue #8"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← Pitches</a></div>
<div class="page-head"><div class="kicker">Pitch 2</div><h1>Pitch 2: a feature-rich product, per issue #8</h1><p class="lead"><code>pitches/PITCH-2.md</code>, as written, scrubbed for the public site.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}




Prepared Day 1 (2026-10-22) by Ines, from Wrenna's pass 4 (`research/pass4.md`) plus my own App Store checks today. Posted as a `pitch` issue as soon as formed, per #6. Pitch #7 (Stripwise, Tallyproof, Beatcount) stays open as the pivot or side-project option; nothing there is withdrawn.

## In plain English (added 2026-10-22, per #10)

**What it is.** Purlwright is an iPad and iPhone app for knitters who make or change their own patterns. A knitting pattern comes in two forms: a chart (a grid where each square is a symbol for one stitch) and written rows ("Row 1: k2, p2, k2tog, yo, k3"). Designers draw the chart and then type the written rows by hand, and that is where mistakes get in: wrong-side rows have to be read backwards with knits and purls swapped, and turning a flat pattern into one knitted in the round changes every second row. Purlwright treats each square as a real stitch, so it knows how many stitches each row uses and makes. You draw the chart; it checks every row adds up and points at the exact square that does not; it writes the written rows correctly for flat or in-the-round knitting; it can turn typed rows back into a chart; and it exports a clean PDF. Charts are saved automatically as ordinary files, so nothing vanishes on a restart.

**One session, pictured.** A knitter wants to put a lace motif she found, charted for flat knitting, onto a hat she knits in the round. She draws or types the twelve rows, flips the switch to "in the round", and Purlwright rewrites every row. It flags row 7 as one stitch short: a yarn-over is missing. She fixes the square, reads the corrected words beside the chart, and exports a PDF to print for her knitting bag. Two charts are free; the third asks for the $9.99 unlock.

**Who it is for.** Adult knitters at the intermediate-to-advanced end, most likely women 30 to 70 (my assumption from the hobby, not a measured figure), who design or adapt patterns rather than only follow them. The sharpest buyer is the small independent designer who sells PDF patterns on Ravelry, Etsy or similar: a wrong row in a sold pattern costs her refunds and reputation, and checking by hand takes hours. Why they pay: the current iOS chart editor charges $19.99 and has not been updated since January 2023; the big companion app is built for following patterns, not drawing them, and costs up to $29.99. Purlwright is $9.99 once and does the one job they now do by hand. The honest risk: this lane is small (18 to 55 US downloads a day, see the correction in this pitch).

---

**Corrected 2026-10-22 (Ines), after Wrenna's hand-read and sizing.** Lost work is 5 and size limits 4 in Knitting Chart's low reviews, not 10 and 11. The line "a discovery problem, not a market-size problem" was wrong; per day, the knitting-editor lane is 18-55 US downloads, and 29 sales is 5-16 percent of it. Knotty added to the Day 5 check. The recommendation stands, with the size risk stated plainly. Sources: `research/knitting.md`, `research/sizing.md`, `research/knitting-keywords.md`.

**Recommendation first.** Build candidate 1, **Purlwright**, a knitting chart editor built on a stitch model: every cell is a stitch with a stitch count, so the app validates the chart as you draw and writes correct row-by-row instructions for flat and in-the-round knitting, in both directions (chart to words, words to chart). One-time unlock at $9.99. Submit to App Review on Day 17 (2026-11-07). It needs 29 sales to reach $200 net.

**Why not pass 4's first choice.** Wrenna ranked the cross-stitch PDF chart keeper first on the strength of a named, absent competitor (Pattern Keeper is Android-only). I checked the store today under "cross stitch chart" rather than "cross stitch": seven iOS chart keepers have launched since May 2026, two in the last three months at $9.99 and $14.99, and two already advertise the exact features pass 4 called novel (vector symbol reading with the key; fractional stitches with an honest "cannot read this file" report). The need is real, but the gap is being filled by seven apps at once and none has won yet. That is a race, not an opening. Details in candidate 2.

**Complexity, honestly (per #6).** Purlwright is medium-high. The engine (stitch model, validation, written output, parser) is pure logic, testable to the last case on the Simulator with no hardware and no third-party files. The editor is the labour: a zoomable grid, symbol palette, selection, undo, repeats. Version 1 is twelve engineer-days if the engineer is good; the cut list if we run late is at the end of the build plan. The road after version 1 is years long (cables, lace, colourwork, grading, sync, Mac), which is what #8 asked for.

What would make this fail: a wrong written row. The whole pitch is "the words are right". One public mistake and we are the incumbent. So the engine ships with a test per published chart-reading rule, and the app shows chart and words side by side so the user can check us.

---

## Candidate 1: Purlwright (recommended)

Mockup: `pitches/mockups/purlwright.png` (drawn by `tools/mockup.py` from coordinates; no images).

### Evidence of need
- **The incumbent is stale and gets the core job wrong.** Knitting Chart (1,298 ratings, Pro $19.99, last updated 2023-01-18 per the store API today): 78 of 131 fetched reviews are 1-3 star. Counts (`research/pass4.md`): subscription or price 31; crash or bug 23. Hand-read counts (`research/knitting.md`, corrected 2026-10-22): lost work 5 and size limits 4 (this memo first said 10 and 11; those were regex counts that also matched "I am so lost with this app" and "deleted after downloading"); export or print 6; written instructions wanted, wrong or failing 3. Across all 178 low reviews in the lane, the job Purlwright is built around is named by 3. That is thin. It is a missing-thing signal, not a loud complaint, and I am treating it as such. Quote: "Written instructions do not work correctly for right side/wrong side when switching from flat to in the round. They read from left to right instead of right to left, but knits and purls are not reversed." (1 star). Quote: "my primary goal is to have a tool to write my own charts. Symbols available are very limited. I cannot find any cable symbols." (3 star). Quote: "after my phone restarted, there was nothing saved" (3 star). File: `research/reviews/knit-1251317736.md`. Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1251317736/sortby=mostrecent/json
- **The big app is for following, not designing, and is resented on price and sync.** knitCompanion (6,899 ratings, tiers to $29.99): 94 of 342 low; price 29; sync or device 29; complexity 17; lost 12. Quote: "The only reason I even tried it was to put charts together. It is so not worth the [price]." File: `research/reviews/knit-1058142783-rss.md`.
- **The rules we must get right are public and simple to state, hard to get right in code.** Flat: RS rows read right to left, WS rows read left to right with knits and purls swapped. In the round: every row reads as RS. Converting a flat pattern to the round by hand is "error-prone", which is exactly a job for software. Sources: https://www.dummies.com/article/home-auto-hobbies/crafts/knitting-crocheting/how-to-read-knitting-charts-in-the-round-170898/ , https://kelbournewoolens.com/tips-and-tricks/working-from-charts , https://knotions.com/tutorial-read-knitting-chart/
- **Designers split work across devices because no iPad tool is trusted for complex charts** (Knitcharts on iPad for simple, Stitchmastery on Mac for complex): https://www.crazypatterns.net/en/forum/topic/177523/knitting-fonts-for-excel
- **Crowding, checked today with `tools/appsearch.py`.** "knitting chart" top results: Knitting Chart (2017, stale), Knit The Chart (2026-06, 0 ratings, a counter plus editor), Knitting - Pattern Editor (2026-01, 0 ratings, grid and symbols plus a community feed), Skein (2026-06, 0 ratings, sweater grading, not charts), Patternum (25 ratings at 3.4, stale since 2024). None advertises written instructions from a chart, let alone validated ones. Wrenna's keyword scan found one more: Knotty: Chart Companion (6795073999, released 2026-09-02, free, 4 ratings), a chart follower (photo of a chart to a stitch window), not an editor. Day 5 check (2026-10-26): rating counts for Knit The Chart, Knitting - Pattern Editor, Skein and Knotty, alongside the cross-stitch seven below. The free web tool Stitch Fiddle does charts in a browser; its iOS app (33 ratings, 3.7) is a photo-to-cross-stitch converter, not a knitting editor.
- **People pay here.** Knitting Chart Pro $19.99; knitCompanion to $29.99; My Row Counter $9.99-$12.99 a year; Ravit $6.99 up front with 6,024 ratings. Loopsy, a 2025 crochet-and-knitting app, reached 16,813 ratings in seventeen months: the audience is large and on iOS.

### The idea, and what is new
Purlwright is a chart editor for knitters who design or adapt patterns. You draw on a grid with the standard symbol set; the app knows that a cell is not a picture but a stitch with a count (k2tog takes two, makes one; yo takes none, makes one; a 2/2 cable takes four, makes four). From that one fact it can do three things no iOS app does: check every row (stitch counts in and out, cable crossings balanced, repeats that divide evenly) and say plainly where the chart is wrong; write correct instructions for flat and for in-the-round, with WS rows reversed and reordered; and read written rows back into a chart. Flat-to-round conversion is one switch. Projects are plain documents in the user's Files folder, autosaved with versions, so nothing disappears on a restart. One-time price, no account, no network.

### Names, checked 2026-10-22
Checks: App Store via the iTunes Search API (US, `tools/name_check.py`), domains via whois and DNS, trademarks via web search only. A USPTO search is still needed before any name goes on the store (browser session; plan in `research/name-risk.md` Part 2 applies, with these terms).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked 2026-10-22, scrolls sideways" style="--tw:1144px" markdown="1">

| Product name | App Store | .com | .app | Trademark (web search) |
|---|---|---|---|---|
| **Purlwright** (preferred) | no app with this name | whois "not found" (available today) | no DNS record; registry whois did not answer | nothing found for the word |
| Rowsmith | none | registered (NS only, no site) | no DNS record; unverified | not searched yet |
| Stitchscript | none | registered, resolves | no DNS record; unverified | not searched yet |

</div>


Dropped: Chartwright (an app "ChartWright" exists), Knitwright (.com taken, a knitwear brand name risk). Company name: **Lowtide Software**, as proposed in #7 (lowtidesoftware.com was unregistered on 2026-10-22). Recommendation: Purlwright by Lowtide Software, purlwright.com as the product domain.

### Fit
- A tool with a real job and deep domain rules (Commandment 8). Crafts are not a banned area (7). No server, no account, no personal data; privacy label "Data Not Collected" (6).
- Entirely buildable and testable on one M1 Mac mini in the Simulator: SwiftUI Canvas for the grid, a pure Swift engine package with XCTest, document-based app over Files, PDF export via UIGraphicsPDFRenderer, StoreKit testing in Xcode. Nothing needs App Store Connect before Day 7 (amendment of 2026-10-22 01:09).
- Icon, symbols, screenshots: all drawn by code (9). Knitting symbols are geometric glyphs by nature.
- Scope: see the roadmap. Version 1 is a coherent slice App Review will accept (2.1): draw, validate, write, export.

### Roadmap after version 1 (the long road #8 asked for)
Cables with crossing validation (2/2, 3/3, twisted); lace with multi-row decreases; stitch repeats and mirrored repeats; colourwork (fair isle and intarsia with float lengths); custom symbols; Japanese symbol set; multiple sizes with grading; gauge and yardage; row tracker mode for knitting from your own chart; chart import from PDF; iCloud sync; Apple Pencil; Mac version via Catalyst or native; shareable pattern documents.

### Revenue plan
Free download. Two charts, every symbol, full written output and validation free, so the engine proves itself before anyone pays. **Purlwright Unlimited, $9.99**, one-time: unlimited charts, PDF and image export, repeats and sizes. No subscription, no ads.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 4" style="--tw:530px" markdown="1">

| Price | Net per sale at 30% | Sales for $200 | Per selling day (10 days) |
|---|---|---|---|
| $9.99 (plan) | $6.99 | 29 | 2.9 |
| $7.99 (fallback, decide Day 25) | $5.59 | 36 | 3.6 |

</div>


Why $9.99: half of Knitting Chart Pro, a third of knitCompanion, and the lane's loudest complaint is price for tools that crash.

Sizing (corrected 2026-10-22, `research/sizing.md`). This memo first said "29 sales is a discovery problem, not a market-size problem". That was written from lifetime totals, and it was wrong. Read per day, the whole US knitting-editor lane implies 18-55 downloads a day (1-3 percent of downloaders leave a rating; US ratings only; lifetime averages, mostly one stale app's history). That is 182-545 downloads in ten selling days. Twenty-nine sales would be 5-16 percent of every download in the lane, even if we took all of them. So in month one, size is a constraint as well as discovery. Two things soften it, neither proven: the knitting audience is larger than its editor lane (knitCompanion alone implies 73-219 a day, people who already hold charts), and a better app can grow a lane rather than split it. The cross-stitch pivot lane is about three times larger (59-178 a day). That does not change why it is runner-up (crowding), but the Investors should weigh it.

### Build plan (Day N = 2026-10-21 + N)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = 2026-10-21 + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose. Engine package `StitchModel`: stitch definitions with counts, row validation, written output for flat and round, with tests for every rule cited above. |
| 4-6 | 10-25 to 10-27 | Grid editor on SwiftUI Canvas: 40 CYC-standard symbols drawn by code, tap and drag to place, select, fill, add and delete rows and columns, undo. Document model saved to Files with autosave and versions. |
| 7 | 10-28 | Apple membership due. Validation panel and written-instructions view side by side; flat/round switch. |
| 8-10 | 10-29 to 10-31 | Written-to-chart parser; repeats; PDF and PNG export; StoreKit 2 paywall (two-chart meter) tested with StoreKit testing; iPad layout. |
| 11-12 | 11-01 to 11-02 | Code-drawn icon and screenshots, App Store copy, privacy label; creative approvals requested in the report. Paid Apps Agreement, tax, banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Real-device pass through TestFlight: iPad with Pencil, large charts (200 x 200), export sizes. Bug fixing only. |
| 16 | 11-06 | Submission build archived; review notes written. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price fallback decision Day 25. |

</div>


Cut list if behind on Day 10, in order: written-to-chart parser (ship chart-to-written only), PNG export before PDF, 24 symbols instead of 40. Never cut: validation, correct WS reversal, autosave.

Budget asked: one domain. Nothing else.

### Main risks
1. **A wrong written row.** Mitigation: one test per published rule; a "check me" view showing chart and words together; a Day 13 review of twenty generated patterns against the rules by a second reader (Soledad on the bench, or Wrenna).
2. **Knitting expertise for cables and lace edge cases.** Mitigation: version 1 ships the standard set and validates counts; exotic symbols are custom with user-declared counts, so the engine stays honest about what it knows.
3. **Guideline 4.3.** Three new chart editors in 2026, none with ratings. Mitigation: the engine is a demonstrable difference; the review note shows a chart and its generated rows.
4. **Discovery and lane size in ten days.** The lane is small (see Sizing): 29 sales needs 5-16 percent of its US download flow. Keywords: "knitting chart" and "knitting chart maker" are searched; "chart to written" is not a knitting search (`research/knitting-keywords.md`), so it belongs in the subtitle as a promise, not as a keyword bet. The free tier earns ratings early; press kit ready Day 16 for the Investors. If the Day 5 check or the first selling days show the lane cannot carry it, the $7.99 fallback does not fix size; reaching knitCompanion's chart followers does.
5. **Editor polish on iPad.** I underrate visual polish in drafts; the Day 11 screenshots get a second eye before approval.
6. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe; a slip past Day 10 pushes submission a day per day lost.

---

## Candidate 2: cross-stitch PDF chart keeper (runner-up, not for month one)

Pass 4's first choice. Evidence is in `research/pass4.md` section 1: Markup R-XP (3,064 ratings, $19.99 a year) with 82 of 233 fetched reviews low, 26 blaming a redesign, 24 symbol or PDF recognition failures, 7 lost progress ("destroyed tracking of 350 hours and 21,000 stitches"). Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1559524491/sortby=mostrecent/json

**What I found today that changes the ranking.** iTunes Search, US, "cross stitch chart" and "threadmark", 2026-10-22:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Candidate 2: cross-stitch PDF chart keeper (runner-up, not for month one), scrolls sideways" data-n="4" style="--tw:829px" markdown="1">

| App | Released | Price | Ratings | Claims |
|---|---|---|---|---|
| StitchSnap | 2026-05-18 | free + IAP | 1 | photo to chart |
| Purl: Pattern Tracker | 2026-06-29 | free + IAP | 2 | PDF marking, thread stash |
| Stitchwork | 2026-07-06 | 3 free, then one-time | 7 | per-stitch iCloud merge sync, "never loses a stitch" |
| StitchGrid | 2026-07-16 | $14.99 | 0 | reads vector shapes and text, reads the key with DMC numbers |
| Crossie | 2026-07-23 | free + IAP | 7 | maker plus keeper |
| Uzora | 2026-08-26 | free + IAP | 2 | half and quarter stitches, parking, "tells you honestly" when a file cannot be read |
| Threadmark | 2026-10-20 | $9.99 | 0 | PDF grid alignment, marks, backup export |

</div>


Pass 4's novelty (vector symbol extraction with a confidence report; fractional stitches; progress kept safe) is already on the store in pieces across StitchGrid, Uzora, and Stitchwork. The market will pick one of seven over the next months; we would be the eighth, with a Guideline 4.3 note to write against seven. What is still unclaimed: backstitch overlay and an open progress format. That is a feature, not a product.

**Keep it as a pivot.** It stays the right product if, by Day 5, none of the seven has passed 20 ratings and a vector-PDF spike on code-generated charts works. The same Day 5 check records the knitting entrants (Knit The Chart, Knitting - Pattern Editor, Skein, Knotty 6795073999); if any of them passes 20 ratings, candidate 1's crowding line is rewritten. Names, pricing ($9.99, 29 sales), roadmap and first slice are in `research/pass4.md`. Name checks done today (none on the store; all .com registered): Chartmark, Gridstitch, Needlemark, Crosschart, Stitchledger, Keepstitch, Aidamark.

## Candidate 3: gig-safe songbook (third)

Pass 4 section 3. OnSong (5,662 ratings, $29.99-$59.99 a year): 335 of 500 fetched reviews low, 68 subscription, 16 library lost before a gig. Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1330350343/sortby=mostrecent/json. Novelty: plain ChordPro files in the user's folder as the source of truth, snapshots, and a gig mode that freezes everything. Price $7.99, 36 sales. Why third: SongbookPro ($5.99 one-time, 2,732 ratings, liked) already owns "one-time and reliable", and page-turn pedals need hardware we lack. Deep roadmap, but the opening is narrower than it looks.

---

## Recommendation and runners-up

1. **Purlwright.** Recommended. A stale incumbent that gets the core job wrong, a lane with no validated chart-to-written tool, an engine we can test completely without hardware or outside files, a price the lane will accept, and a roadmap measured in years.
2. **Cross-stitch chart keeper.** Runner-up and pivot. Real anger at the incumbent, but seven new rivals in five months, two of them selling pass 4's novelty already.
3. **Songbook.** Third. SongbookPro holds the slot.

Decisions asked of the Investors: the candidate; the product name (Purlwright, Rowsmith, Stitchscript) and company name (Lowtide Software); whether to register the domain; and, if Purlwright, whether to close #7 or keep Stripwise as the side project. The visual identity comes separately for creative approval (Commandment 51).

Open research gaps (board tasks for Wrenna): hand-coded reads of the knitting reviews for "written", "cables", "export", "lost"; keyword list for the knitting lane; a watch on the seven cross-stitch entrants' rating counts; sizing for both lanes.
{% endraw %}

</div>
