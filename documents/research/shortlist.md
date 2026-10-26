---
layout: "default"
title: "Shortlist, third pass"
section: "documents"
description: "Ready for Fable: yes for candidate 1, with runners-up 2 and 3 graded honestly as weaker. More research is unlikely to change the top pick quickly; a sizing partner is still needed."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/shortlist.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/SHORTLIST.md</code></span></div><h1>Shortlist, third pass</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "A waste of $15. This app give inconsistent readings" (Watch Tuner, 1 star, https://apps.apple.com/us/app/id991367080?see-all=reviews). Here is the shape of it: niche technical <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> have paying users, but by October 2026 most are crowded with new free entrants.

## Third pass, what changed
- Apple's review RSS feed returned zero entries for every app on 2026-10-22, including ones that worked earlier. I added `review_mine.py web` (reads the ~10 reviews embedded in the store page) and `review_mine.py crowd` (counts recent entrants), plus `tools/forum_search.py` (Hacker News, Stack Exchange). Store-page samples are small; counts below are counts of those samples, not of a full feed.
- <span title="How many apps on the shelf already sell the same thing.">Crowding</span>, 9 niche lanes: 59 of the top results were released since 2025-01-01; 4 (7 percent) reached 50+ ratings (research/market-structure.md).
- ImageIO spike (Ines, spikes/imageio-strip/FINDINGS.md): JPEG strip is lossless and verified; HEIC has no lossless route (silent no-op, must re-encode). So "lossless HEIC" cannot be a headline. "Verify-after-strip receipt" can, because the spike itself proved the API reports success while leaving data in place.

## Ranked top 3 for the Fable synthesis
1. **Photo metadata stripper with a verify-after-strip receipt. Grade B-.** Evidence unchanged (151 hand-read 1-3 star reviews, two competitors; reliability and "said done, data still there" lead). Headline changes from lossless to proof: re-read the output and show the fields gone; lossless for JPEG, honest re-encode for HEIC with size shown. Price $2.99-$4.99 one time, 47-96 sales. Ready for synthesis.
2. **Counter with reliable widgets, one-time price. Grade B-.** Unchanged from pass two (10 of 23 low reviews on widgets not refreshing). Needs a distinctive angle against a free 14K-rating incumbent and 4.3.
3. **Acoustic watch timegrapher that shows its own confidence. Grade C+.** 7 of 11 low store-page reviews across 3 apps say readings are inconsistent or wrong (research/watch-accuracy.md); people pay ($1.99 plus IAP, tickIQ paid tiers). Against: most crowded lane checked (8 of 14 results new since 2025), signal-processing risk, needs real watches to validate. Testable on the Mac from recorded audio.

Wildcard, not ranked: a darkroom easel meter using the phone camera. One HN ask (https://news.ycombinator.com/item?id=49978595), hardware analysers about GBP 343-469 (unverified), no iOS app found that does it. Grade C, untestable in the Simulator. Film dev timers and turntable tools: set aside (saturated features; gyroscope not in Simulator).

## Verdict
Ready for Fable: yes for candidate 1, with runners-up 2 and 3 graded honestly as weaker. More research is unlikely to change the top pick quickly; a sizing partner is still needed.

---

# Shortlist, second pass (Wrenna, 2026-10-22)

Listen to this: "it saves the new image at about twice the original size of the photo. 4mb ends up around 8mb" (Photo Investigator, 3 star, https://itunes.apple.com/us/rss/customerreviews/page=1/id=571574618/sortby=mostrecent/json). Here is the shape of it: the one lane where I now have counted, linked, specific complaints is photo metadata.

## Method and limits
- Counts come from Apple's public review RSS feed (US storefront), coded by keyword in tools/review_mine.py. Only 7 of 18 apps pulled returned any reviews; small apps return none. Coded lists with every review are in research/reviews/. Keyword coding overlaps (a review can hit two themes) and is a first pass. Photo-metadata counts were then hand read (see candidate 1).
- Prices and IAP tiers are from App Store pages. Rating counts are a demand proxy only; I have no download data.
- Sizing is not my strength. Figures below are arithmetic, not a forecast.

## What $286 gross implies
Apple takes 30 percent (15 percent under the Small Business Program, not yet enrolled). $200 net needs about:

<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What $286 gross implies, scrolls sideways" data-n="2 3" style="--tw:202px" markdown="1">

| Price | Sales at 30% cut | Sales at 15% cut |
|---|---|---|
| $2.99 | 96 | 79 |
| $4.99 | 57 | 47 |
| $6.99 | 41 | 34 |

</div>

(Sales = 200 / (price x (1 - cut)), rounded up.) The larger problem is discovery, not count: 92 percent of utilities are free, so the question is whether 40-100 strangers find us.

## Ranking and evidence grade
Grades: A = counted reviews from 3+ competitors with a repeated specific gap; B = counted from 1-2 competitors; C = listings and anecdote only.

1. **Lossless photo metadata stripper, HEIC-safe, no batch <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, one-time price. Grade B- (lowered from B after hand reading).**
   - Hand read, 2026-10-22: all 80 Photo Investigator and all 71 Exif Metadata 1-3 star reviews (151). Exif Viewer and the other feeds returned zero reviews, so the grade rests on two competitors. Earlier keyword counts overstated several themes; corrected below (a review can sit in two themes; a few non-English or one-word reviews are uncoded).
   - Exif Metadata (6.1K ratings, 4.6; 71 of 100 fetched are 1-3 star): edit or remove fails, crashes, or stopped after an update 25 (7 say it worked before); ads 12; batch or one-at-a-time limits 5 (explicit 40-cap: 1, not 7); no video support 4; quality, HEIC or format loss 4 (HEIC: 1); metadata left behind or not saved 5; price, refund or card bait 6. Pro is $4.99/mo, $9.99/yr, $19.99 lifetime.
   - Photo Investigator (1.4K, 4.4; 80 of 150 are 1-3 star): paid but unlocked nothing, restore failed, or pay again 9; must pay before anything works 7; edits fail, freeze or do not save 10; GPS shows nothing for imported photos or "iOS does it" 4; file size inflates or cache grows 4 (size doubling: 2; HEIC edit fails: 1); bulk or background limits 2. One praise: "no other app I have used removes location and EXIF data as thoroughly".
   - Exif Viewer (714 ratings, 4.5): $2.99 upfront, no IAP, no RSS reviews; one store-page wish to keep the original format. Proof a one-time price survives, nothing more.
   - Honest reading: the loudest repeated gap is reliability and trust ("it said done, the data was still there"; "stopped working after update"), then paywall friction and ads. The lossless and HEIC angle is real but thin: about 8 of 151 reviews (HEIC 2, quality or size 6). It is a differentiator to prove, not a proven headline.
   - Sizing (arithmetic, not a forecast; ratings-to-downloads is an assumed 1-3 percent, I have no download data): 6.1K, 1.4K and 714 ratings imply roughly 200K-600K, 45K-140K and 25K-70K lifetime downloads. We need 47-96 paid sales. That is about 0.02-0.2 percent of one incumbent's implied downloads, so the question stays discovery, not market size. Sizing partner still needed to turn this into a unit forecast.
   - Risks: iOS share sheet has Apple's own location toggle; several new free entrants (3-12 ratings); lossless strip must be proven in a Simulator spike; 4.3 needs the lossless angle front and centre.
   - Three novelty angles versus incumbents (Tenet 3), each testable in the Simulator:
     1. Verify-after-strip receipt: re-read the saved file and show a before and after field list proving GPS, time and camera tags are gone, because incumbents say "done" while data remains (5 reviews) or fail silently.
     2. Byte-preserving strip: remove metadata segments without touching pixel data, HEIC and JPEG, and show original and new file size side by side; answers size doubling and quality loss.
     3. Share-first, no-library workflow: a Share Extension (strip, then return the clean file to the share sheet) with no copies left in Photos and no batch cap, answering "lost my photos", forced copies, the 40 cap and one-at-a-time.
2. **Honest one-time-price counter/log with reliable widgets. Grade B-.**
   - Tally: Counter and Score Tracker (1.1K): 23 of 50 are 1-3 star; widgets not refreshing 10, paywall 6, a $30/yr complaint. Counter Tally Count has 14K ratings and a $19.99 remove-ads only, so a free incumbent owns the lane.
   - Pro: specific, fixable widget bug and subscription anger. Con: free 14K-rating incumbent, 4.3-prone, low price ceiling ($2.99 means about 96 sales).
3. **Hobby/field logbook with free export (beekeeping first). Grade C, downgraded.**
   - BeePlus is $9.99 upfront with 876 ratings, so paying beekeepers exist. But the lane is crowding: 7 of 8 beekeeping results are free apps with 0-24 ratings and new IDs; aquarium and coffee-brew show the same pattern. Review feeds were empty, so I have no counted complaints. My first-pass export complaint remains a single Apiarist review.
4. **TV remote, one-time price. Grade B on the complaint, but not recommended.** TV Remote for Roku: 42 of 50 fetched are 1-3 star, 17 on paywall, up to $8.99 weekly and $49.99 tiers. The demand is large, but the free official Roku app has 6.3M ratings and we cannot test on real hardware.
5. **PDF toolkit. Grade C.** Free incumbents with 8-10K ratings (PDF Hero, PDF Gear); counted complaints are bugs and a charge complaint, no clean gap. Drop.

## Recommendation for the Fable synthesis (2-3)
1. **Lossless photo metadata stripper** (candidate 1 above). Strongest counted gap, a $2.99-$4.99 price that sits under the incumbents' lifetime and loyalty tiers, small build, Simulator-testable. Condition: a short spike showing ImageIO can drop EXIF/GPS from HEIC and JPEG without re-encoding.
2. **Reliable-widget counter** (candidate 2) as a fallback, but only with a distinctive angle, else 4.3 and the free incumbent <span title="A test written in advance. If it fires, we drop the idea.">kill</span> it.
3. **Beekeeping logbook** only if the Investors want a niche play; I would not lead with it on current evidence.

Set aside: battery widget (not buildable), shortcut converters, cut-list calculators, subscription trackers and cleaners (Commandments 7, 8), TV remote, PDF tools.

## Still open
- Hand read of all 151 photo-metadata reviews done (candidate 1). Other candidates' counts remain keyword-coded.
- <span title="How many people show, in their own words, that they want this.">Need</span> a sizing partner for ratings-to-sales conversion.
- App Store Connect and TestFlight are not available until Apple membership is active (due Day 7); this research needs neither.
{% endraw %}

</div>
