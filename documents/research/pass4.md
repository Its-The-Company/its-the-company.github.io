---
layout: "default"
title: "Research pass 4: deeper products"
section: "documents"
description: "Candidate 1 best fits depth and scope: a real technical core (vector PDF parsing), a named, absent competitor (Pattern Keeper is Android-only), counted anger at the iOS incumbent, and an audience that already pays about\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/pass4.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass4.md</code></span></div><h1>Research pass 4: deeper products</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Prompted by the Investors' instruction in issue #8: depth, scope, and room to grow now weigh most. Stripwise, TallyProof and BeatCount stay in <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span>/ as pivot or side options.

Listen to this: "Symbol detection is extremely inconsistent rendering the app as useless. It can't be trusted. Going back to Pattern Keeper." (Markup R-XP, 1 star, https://itunes.apple.com/us/rss/customerreviews/page=1/id=1559524491/sortby=mostrecent/json)

Here is the shape of it: the deep <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> are craft and performance tools, where people keep a project open for months, pay real money, and lose work when the app changes under them. Their complaints are about trust in a long-lived document, not about missing buttons.

## Method and limits
- Apple's review RSS feed worked again today. 1-3 star reviews for 20 apps saved in `research/reviews/` (xstitch-, song-, knit-, gen-, quilt-, cut-, astro-, chess-, garden-). Counts by `tools/theme_count.py` (new this pass), regex per lane. Where I say "strict", I tightened the pattern and read the hits; other counts are keyword first passes and overlap.
- Prices from store pages via `tools/price_table.py`; crowding via `review_mine.py crowd` (top 25 US results, released since 2025-01-01).
- Coordinator stopped collection at this point. Not done: hand-reading every review, Pattern Keeper reviews (Play store, not fetched), Threadmark (a new iOS "Cross Stitch PDF" app, details not read), sizing.
- Net at Apple's 30 percent cut. Sales for $200 = 200 / (price x 0.7), rounded up.

## Ranking (depth and scope first)

### 1. Cross-stitch PDF chart keeper for iPad and iPhone (Pattern Keeper's job, on iOS). Evidence grade B.
**Evidence.**
- Markup R-XP (3,064 ratings, $9.99 full or $19.99/yr): 82 of 233 fetched reviews are 1-3 star. Strict counts: a redesign or update broke it 26; symbol, grid, colour or PDF recognition fails 24; subscription anger 20; progress lost 7 ("Recent upgrade destroyed tracking of 350 hours and 21,000 stitches of work"); Pattern Keeper named as the alternative 4 ("I will have to wait until Pattern Keeper finally comes out with an iOS version"). File: research/reviews/xstitch-1559524491.md. Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1559524491/sortby=mostrecent/json
- Stitchly (2,291 ratings, $39.99-$75 one time) is a pattern maker, not a keeper: 48 of 212 low; recognition/import 11; "I saw this app recommended as an iOS alternative to Pattern Keeper ... if you're looking for PK's functionality, you're not gonna find it here." File: research/reviews/xstitch-1467867656.md.
- Pattern Keeper itself: Android only (no App Store result for "pattern keeper cross stitch", 2026-10-22), 100K+ Play downloads, one-time charge about $9 ($8.49-$9.99), still labelled beta: "works great with some charts but will not work with others. Backstitches and fractional stitches are not supported." https://play.google.com/store/apps/details?id=app.patternkeeper.android
- Designers sell "Pattern Keeper compatible" PDFs as a feature, and publish workarounds for split symbols and backstitch: https://www.koolerdesign.com/chartdownloadbysubject ; review roundup with Pattern Keeper listed only under Android: https://lordlibidan.com/whats-the-best-mark-up-app-for-cross-stitch-patterns/
- <span title="How many apps on the shelf already sell the same thing.">Crowding</span>: "cross stitch" top 25 has 4 new since 2025; most results are colour-by-number games, not keepers.

**What they are doing instead.** Paying a yearly fee for an app that misreads charts, printing and highlighting by hand, or keeping an Android tablet for Pattern Keeper.

**<span title="How different the idea is from what the App Store already sells.">Novelty</span>.** Read the PDF's vector and font layer (symbols are glyphs in designer PDFs), not a photo: exact symbol and legend extraction, with a confidence report that shows which symbols it is unsure of before you start stitching. Fractional stitches and backstitch from day one, the two things Pattern Keeper says it cannot do. Progress stored separately from the chart, versioned, and exportable, so no update can wipe 350 hours.

**Competitor pricing.** Markup R-XP $9.99 or $19.99/yr; Pattern Keeper about $9 one time (Android); Stitchly $39.99-$75; Cross Stitch Journal $5.99; Stitchwork $12.99.

**Roadmap (14).** Vector PDF import with page stitching into one continuous chart; legend parsing with DMC/Anchor/Cosmo numbers; symbol highlight; mark single, row, 10x10 block, and lasso; parking marks for threads; fractional stitches; backstitch overlay; stats (today, total, per thread, time estimate); thread inventory and shopping list; progress export and import (open format); iCloud sync across iPad and iPhone; Apple Pencil marking with palm rejection; raster fallback for scanned charts with manual grid; full-stitch-only safe mode; design-your-own editor later; Mac version.

**First slice (Day 17-20).** Import a vector PDF, detect grid and legend, show the continuous chart, highlight a symbol, mark stitches, stats, and progress saved and exported. Full stitches only, with a clear notice; fractional and backstitch in the first update.

**Path to $200.** Free import and one chart; one-time unlock $9.99 (net $6.99, 29 sales) or $7.99 (net $5.59, 36 sales). The audience already pays about $9 one time on Android and hates subscriptions.

**Risks.** PDF variety (designers use different software; fixtures must be code-generated, we cannot ship purchased charts); Threadmark is a new direct entrant (not yet read); needs iPad-quality UI.

### 2. Knitting chart designer that writes the instructions (chart to written, both directions). Evidence grade B-.
**Evidence.**
- Knitting Chart (1,298 ratings, Pro $19.99): 78 of 131 low. Subscription or price 31; crash or bug 23; size limits 11; lost work 10 ("after my phone restarted, there was nothing saved"). The core job fails: "Written instructions do not work correctly for right side/wrong side when switching from flat to in the round ... knits and purls are not reversed." File: research/reviews/knit-1251317736.md. Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1251317736/sortby=mostrecent/json
- knitCompanion (6,899 ratings, $29.99 tiers): 94 of 342 low. Price 29; sync or device 29 ("The app once purchased is ONLY on that device"); complexity 17; lost 12. File: research/reviews/knit-1058142783-rss.md.
- Desktop users split work: Knitcharts on iPad for simple, Stitchmastery on Mac for complex (forum, 2023): https://www.crazypatterns.net/en/forum/topic/177523/knitting-fonts-for-excel
- Crowding: "knitting chart" 8 of 24 new since 2025, only 1 reached 50 ratings.

**Novelty.** A stitch model, not a picture: each cell is a stitch with a stitch count, so the app validates the chart (stitch counts per row, cable crossings), generates correct written rows for flat and in-the-round (RS/WS reversal handled), and parses written rows back into a chart.

**Competitor pricing.** Knitting Chart Pro $19.99; knitCompanion $29.99; Knitting iCharts $2.99; My Row Counter $9.99-$12.99/yr.

**Roadmap (12).** Symbol library (CYC standard and Japanese); cables and lace with stitch-count checks; repeats; flat and in-the-round; chart to written and written to chart; colourwork; sizes and grading; gauge calculator; PDF and image export; row tracker mode; iCloud sync; Mac version.

**First slice.** Grid editor with 40 standard symbols, flat and round, validation, written instructions, PDF export.

**Path to $200.** One-time $9.99 (29 sales) against $19.99-$29.99 incumbents.

**Risks.** Correctness is everything; knitting expertise needed for test cases; a strong free web tool (Stitch Fiddle) exists.

### 3. Gig-safe songbook: ChordPro charts and setlists that cannot vanish on stage. Evidence grade B.
**Evidence.**
- OnSong 2026 (5,662 ratings, $3.99-$5.99/mo, $29.99-$59.99/yr): 335 of 500 fetched reviews are 1-3 star. Strict counts: subscription 68; library or songs lost 16 ("I lost my 800 songs for a gig and even had a backup, but did not work"; "it wiped out my songs right as i was supposed to play a wedding"); failure during a gig or service 7; pedal 7. Broad: crash/bug 85, support 61. File: research/reviews/song-1330350343.md. Source: https://itunes.apple.com/us/rss/customerreviews/page=1/id=1330350343/sortby=mostrecent/json
- SongbookPro (2,732 ratings, $5.99 one time) is the existing one-time answer and is liked: 48 of 500 low. File: research/reviews/song-1475370014.md.
- Outside: MobileSheets forum user leaving OnSong on price: https://www.zubersoft.com/mobilesheets/forum/thread-9349.html ; Trustpilot complaints: https://ca.trustpilot.com/review/onsongapp.com
- Crowding: "setlist" 9 of 24 new since 2025, 1 at 50+ ratings.

**Novelty.** Plain-text ChordPro files in the user's own folder as the source of truth (nothing locked in a database), automatic versioned snapshots, and a "gig mode" that freezes the setlist offline and refuses updates, sync and prompts until the show ends.

**Competitor pricing.** OnSong $29.99-$59.99/yr; SongbookPro $5.99; Songs $24.99; SongSheet Pro $59.99/yr or $129.99 lifetime.

**Roadmap (12).** ChordPro parse and render; transpose and capo; Nashville numbers; setlists; autoscroll; Bluetooth page-turn pedals; MIDI program changes; PDF charts with annotations; band sharing by file; metronome and count-in; lyrics-only projector view; Mac version.

**First slice.** Import ChordPro and text, transpose, setlists, gig mode, pedal page turn, snapshots.

**Path to $200.** $7.99 one time (36 sales).

**Risks.** SongbookPro already owns "one-time and reliable"; our edge must be the file-based, can't-lose-it design. Songs are user content only (we ship no lyrics).

### 4. Private, offline GEDCOM family-tree viewer and editor. Evidence grade C+.
**Evidence.**
- GedView ($4.99, 30 ratings): 28 of 102 low; GEDCOM import or file fails 15; crash 8 ("I could not access a 1.1MB or larger gedcom file"; "no tree view, just a list view"). File: research/reviews/gen-314845375.md.
- Quick Family Tree (817 ratings): 143 of 392 low; broad counts chart or view 39, lost data 26, sync 19 (not hand read). File: research/reviews/gen-1447075049.md.
- People pay: MobileFamilyTree 11 is $14.99 up front with 659 ratings. Giants are free but cloud-bound (FamilySearch, 504K ratings).

**Novelty.** Full-fidelity GEDCOM 5.5.1 and 7 round-trip (never drops a field, with a diff report on export), large files, on-device only.

**Roadmap (10+).** Import and export; pedigree, descendant, fan and hourglass charts; person editor; sources and citations; duplicate finder and merge; place normalisation; timeline; printable PDF charts; media links; iCloud; Mac version.

**Path to $200.** $9.99 one time (29 sales) or $14.99 (20 sales).

**Risks.** Evidence thinner; FamilySearch is free and loved; GEDCOM test files must be code-generated (no real family data).

### 5. Quilt designer with honest yardage. Evidence grade C.
- Quiltler 2 (202 ratings, 3.7; up to $44.99/yr): 26 of 70 low; account or sign-in 13, clunky 12, paywall 9 ("Quilters need a quilt app for easy quilt designing; this isn't it."). Quilt Geek calculator: 8 of 16 low, mostly trial or subscription traps. Files: research/reviews/quilt-1495594391.md, quilt-6499062474.md.
- The desktop standard, EQ8, does not run on iPad (retailer listing): https://www.sewingpartsonline.com/products/electric-quilt-8-quilt-design-software
- Roadmap is long (blocks, layouts, sashing, borders, fabric swatches drawn by code, yardage, cutting charts, piecing order, print). Small review base; I would want another pass before pitching it.

## Set aside this pass
- Cut-list optimizer: subscription anger is real (SheetCut 15 of 25 low; "the second sheet was $4.99 a month"), but 15 of 24 results are new since 2025 and one-time offline rivals exist (Boardcut $12.99, Carpenter Pro). research/reviews/cut-*.md.
- Astronomy observing planner: PhotoPills ($10.99) low reviews are price and learning curve; Observer Pro is dated. New planners keep arriving (SkyWindow, AstroTool). Weak on gap.
- Chess openings (Chessbook, 2,142 ratings at 4.9): no repeated complaint. Garden planners: data fetched (research/reviews/garden-*.md), not coded.

## Verdict
Candidate 1 best fits depth and scope: a real technical core (vector PDF parsing), a named, absent competitor (Pattern Keeper is Android-only), counted anger at the iOS incumbent, and an audience that already pays about $9 once. A sizing partner is still needed; next step would be reading Threadmark and a PDF-parsing spike on code-generated charts.
{% endraw %}

</div>
