---
layout: "default"
title: "Keyword lists for Stripwise, Tallyproof, Beatcount (Day 2, 2026-10-22)"
section: "documents"
description: "Rules used. Title 30 characters, subtitle 30, keyword field 100, comma-separated, no spaces after commas. Apple indexes title, subtitle and keyword field together, so a word placed in the title or subtitle is not\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/keywords.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/keywords.md</code></span></div><h1>Keyword lists for Stripwise, Tallyproof, Beatcount (Day 2, 2026-10-22)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this first: the App Store does not publish search volume, and we use no paid tools. So this is a title-and-description count, not a traffic count. I ask "which words do the top results carry, and which words does nobody carry?" Gaps are the openings; crowded words are the price of entry.

**Method.** `tools/keyword_scan.py` (new) queries the iTunes Search API (US, public, no sign-up), top 25 per seed, and counts each term in the app title (trackName) and in the description. The API returns no subtitle, so subtitle counts are not available; titles stand in. Raw output: `research/keywords/scan-raw.md`. Seeds: "remove exif metadata", "strip photo location", "tally counter", "counter widget", "watch timegrapher", "watch accuracy".

**Rules used.** Title 30 characters, subtitle 30, keyword field 100, comma-separated, no spaces after commas. Apple indexes title, subtitle and keyword field together, so a word placed in the title or subtitle is not repeated in the keyword field. No competitor brand names in the field (Guideline 2.3.7 risk). Counts are of the top 25 results at 2026-10-22; they will drift.

## Stripwise

Seeds: https://itunes.apple.com/search?term=remove+exif+metadata&entity=software&country=us&limit=25 and https://itunes.apple.com/search?term=strip+photo+location&entity=software&country=us&limit=25


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Stripwise, scrolls sideways" style="--tw:1160px" markdown="1">

| Term | In titles (of 25) | In descriptions | Competitor titles carrying it (examples) | Read |
|---|---|---|---|---|
| exif | 20 | 21 | Exif Metadata; Photo Metadata EXIF Remover; Exif Cleaner: Remove Metadata | saturated; must be in title anyway |
| metadata | 21 | 25 | Exif Metadata; EXIF Metadata Editor & Remover | saturated |
| remover / remove | 13 / 17 | 5 / 22 | EXIF Metadata Editor & Remover; Metadata Remover - Photo EXIF | crowded, expected |
| photo | 7 | 24 | Photo Metadata EXIF Remover; Exif Viewer - Photo Metadata | moderate |
| gps | 2 | 21 | MetaClean: GPS & EXIF Remover; Photo Investigator: GPS & EXIF | open in titles, heavy in prose |
| location (seed 2) | 4 | 15 | MetaWipe - Location Remover | open <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, only MetaWipe names it |
| privacy | 1 | 12 to 17 | Repo: Photo Privacy | open in titles |
| clean | 4 | 16 | Exif Remover: Clean Metadata; MetaClean | moderate |
| strip / scrub / geotag / heic | 0-1 | 8 / 1 / 5 / 7 | EXIF Metadata Scrubber (scrub only) | no title carries them; our own words |
| verify / proof / receipt | not scanned as seeds | n/a | none seen in the 151 coded reviews' app titles | our differentiator; weak search term, strong copy term |

</div>


**Where the opening is.** Not "exif" (20 of 25 titles). The word nobody leads with is *location*: the iOS share-sheet toggle covers it, and the people who still wanted more (research/photo-metadata.md) type "remove location from photo", not "exif". Subtitle and field spend on location, GPS, privacy; the title keeps "EXIF" because searchers do type it.

**Title** (30 max): `Stripwise: Remove Photo EXIF` (28)

**Subtitle candidates** (30 max):
1. `Location & metadata remover` (27) - recommended; adds location, metadata, remover
2. `Strip GPS, verify it's gone` (27) - states the receipt; GPS in subtitle frees field space
3. `Proof your photo is clean` (25) - receipt-first, weakest for search

**Keyword field** (95 of 100): `gps,privacy,strip,clean,scrub,geotag,heic,jpeg,wipe,delete,hide,tags,image,verify,proof,cleaner`
Not repeated from title/subtitle: stripwise, remove, photo, exif, location, metadata, remover. If subtitle 2 is chosen, move `location` into the field and drop `gps`.

## Tallyproof

Seeds: https://itunes.apple.com/search?term=tally+counter&entity=software&country=us&limit=25 and https://itunes.apple.com/search?term=counter+widget&entity=software&country=us&limit=25


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Tallyproof, scrolls sideways" style="--tw:1111px" markdown="1">

| Term | In titles (of 25) | In descriptions | Competitor titles (examples) | Read |
|---|---|---|---|---|
| tally / counter / count | 18 / 24 / 24 | 21 / 23 / 25 | Counter Tally Count; Tally Counter; Count That Now | saturated; 14K-rating incumbents own it |
| click / clicker | 4 / 1 | 7 / 3 | Tally Counter: Tap & Click; Tally Counter - Clicker | moderate |
| widget (seed 2) | 10 | 19 | Counter Widget 26; Tally Counter Widget; Countdown Widget & Counter | contested in the widget seed, absent (0) from tally-counter titles |
| tracker / score | 3 / 1 | 3 / 10 | Tally: Counter & Score Tracker | open |
| lock screen / home screen | 0 / 0 | 4 to 14 | none | in prose only; nobody titles it |
| habit / people | 0 | 11 / 4 | none | adjacent use cases, open in titles |
| stale | not scanned | n/a | none | our differentiator, a copy word not a search word |

</div>


**Where the opening is.** The head term "tally counter" is closed; the widget seed has ten titled widget apps, so we cannot win on "widget" alone either. Realistic wins are the long tail: "counter lock screen", "tap counter widget", "clicker". Honest caveat: this lane has the weakest discovery story of the three, as price-table.md already suggests.

**Title:** `Tallyproof: Counter Widget` (26)

**Subtitle candidates:**
1. `Tap counter that stays true` (27) - recommended; "tap" is new vs title
2. `Tally widgets that never lag` (27) - "widgets" repeats a title word, so it wastes subtitle space
3. `Count, clicker, lock screen` (27) - pure search, no story

**Keyword field** (95 of 100): `tally,count,clicker,lock screen,home screen,tracker,score,habit,people,tap,stale,sync,laps,reps`
Note: if subtitle 1 is chosen, drop `tap` from the field (4 characters saved).

## Beatcount

Seeds: https://itunes.apple.com/search?term=watch+timegrapher&entity=software&country=us&limit=25 and https://itunes.apple.com/search?term=watch+accuracy&entity=software&country=us&limit=25


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Beatcount, scrolls sideways" style="--tw:1209px" markdown="1">

| Term | In titles (of 25) | In descriptions | Competitor titles (examples) | Read |
|---|---|---|---|---|
| watch | 20 / 21 | 25 | tickIQ: Measure, Track Watches; ChronoLog - Watch Accuracy | saturated |
| timegrapher | 9 / 3 | 16 / 14 | Timegrapher - Watch Accuracy; Wrotate: Watch Timegrapher | contested but it IS the category word; must be in title |
| accuracy | 10 / 15 | 22 / 20 | Isochron: Watch Accuracy; Tickscope - Watch Accuracy | crowded |
| tick | 3 / 4 | 13 / 11 | TickTracer; Tickscope | moderate |
| tuner | 2 | 2 | Watch Tuner Timegrapher; Watch Tuner Lite | open |
| mechanical / beat / amplitude / timing | 0 | 20 / 15 / 14 / 7 | none | in prose only; title-open |
| rate / error / measure | 0-1 | 24 / 11 / 19 | Ratewell: Watch Timegrapher | open |
| confidence | not scanned | n/a | none seen | our differentiator, a copy word |

</div>


**Where the opening is.** The same pattern: category words are all taken, the technical vocabulary (mechanical, beat, amplitude, BPH) sits unused in titles, and hobbyists who own a mechanical watch do type those words. Eight of the 14 apps in the lane are new since 2025 (research/watch-accuracy.md), so rank is fluid.

**Title:** `Beatcount: Watch Timegrapher` (28)

**Subtitle candidates:**
1. `Accuracy you can trust` (22) - recommended; "accuracy" not in title, carries the confidence idea
2. `Rate with a confidence score` (28) - states the differentiator
3. `Mechanical watch accuracy` (25) - pure search

**Keyword field** (97 of 100): `mechanical,beat,rate,amplitude,tick,tuner,vintage,automatic,bph,beats per hour,measure,confidence`

## Limits, stated plainly
- No search-volume data: counts show competition, not demand. A term with zero titles may be empty because nobody searches it.
- Subtitles are not in the public API; I read titles only. A competitor's subtitle may already <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> a word I call open.
- Rankings are not checked (that needs a signed-in store session or a paid tool). Lengths were verified by script on 2026-10-22.
- Descriptions are not indexed by App Store search; they are a signal of what the competition talks about, not of what ranks.
{% endraw %}

</div>
