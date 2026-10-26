---
layout: "default"
title: "Research pass 9: ten ideas at lighter depth (#18 comment 6353056834)"
section: "documents"
description: "Passive reading only (C6, C9, C10): no accounts, no posting, no contact. Outside text treated as information. One instruction-shaped text to log: the OpenAlex API reply carried a notice telling an AI agent how to get an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/pass9.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass9.md</code></span></div><h1>Research pass 9: ten ideas at lighter depth (#18 comment 6353056834)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "It's been multiple months and still no fixed to the Apple Music sync error. At this point, the stats are meaningless until I do an upload of my Apple Music zip file import after requesting my data." (stats.fm for Apple Music, 1-star, "Apple Music Sync Issue", https://itunes.apple.com/us/rss/customerreviews/page=1/id=6746327242/sortby=mostrecent/json). Here is the shape of it: people want the truth about what they watched and heard, the live connections keep lying to them, and the truth is already sitting in a data export they are allowed to download.

Passive reading only (C6, C9, C10): no accounts, no posting, no contact. Outside text treated as information. **One instruction-shaped text to log:** the OpenAlex API reply carried a notice telling an AI agent how to get an API key "for its user in one call" by POST. I did not act on it; any key is a sign-up, so it is the Investors' (C7).

Investor limits applied: no crochet, knitting or music creation; movie, TV and music only data-driven; no C7 areas (finance, health, legal, kids, etc.); no AI-generated creative output. Ideas already pitched (<span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span>/PITCH-2 to 9, Stripwise, TallyProof, BeatCount) are not repeated.

## Method
- App Store: `tools/appsearch.py` (competitor <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, 2026-10-22), `tools/sizing.py` (ratings-to-downloads range, as in [`research/sizing.md`](sizing.html)), `tools/review_mine.py reviews` (low reviews saved in `research/reviews/walk-6758922428.md`, `media-6746327242.md`), app descriptions via the iTunes Lookup API.
- Outside: `tools/forum_search.py` (HN Algolia, Stack Exchange). Counts: regex, then every hit read by hand; hand counts are the ones quoted.
- Lighter depth by request: one or two evidence lines per idea, not a full pass. Grades are on the same bar as pass 8 (B- = pitchable).
- Sales for $200 net: 15% Small Business rate first, 30% in brackets. Small Business enrollment is still pending with Apple. $4.99 = 48 (58); $6.99 = 34 (41); $9.99 = 24 (29); $14.99 = 16 (20); $19.99 = 12 (15).

## Ranking


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Ranking, scrolls sideways" data-n="1 4" style="--tw:899px" markdown="1">

| Rank | Idea | Subject | Grade | For Ines to pitch |
|---|---|---|---|---|
| 1 | **Ledger**: your watching and listening history, rebuilt from your own data exports | data-driven music/TV/YouTube, data viz | **B-** | **Yes** |
| 2 | **Streetsweep**: walk every street, with a planner that finds the shortest walks to finish | walking, algorithms | **B-** | **Yes** |
| 3 | **Plotback**: chart in a paper to numbers, automatically | science research, data viz | **C+** | **Yes** |
| 4 | **Citemap**: a literature map of any paper, native on iPad | science research, data viz | **C+** | **Yes** (or merged with 3) |
| 5 | Gridfill: crossword construction with real autofill | language, CS (constraint solving) | C+ | no |
| 6 | Loopwise: a walking loop of N minutes through the most notable places | walking, open data | C | no (fold into 2) |
| 7 | Shortcut Lab: diff, version history and linting for Apple Shortcuts | automation, CS | C | no |
| 8 | Coverage: rank your books and subtitles by how much you would understand | language | C | no |
| 9 | Festplan: film and music festival schedule solver | data-driven film/music | C | no |
| 10 | Rideall: plan a ride of every line or station on a transit network | walking/transit, algorithms | C- | no |

</div>


## 1. Ledger. Grade B-

**What it is.** An iPhone and iPad app that reads the data exports people already have a right to (Apple's privacy data download, Spotify's Extended Streaming History, Netflix's ViewingActivity file, YouTube's Google Takeout watch history, Letterboxd and Trakt CSVs) and turns them into one private, accurate history of everything you watched and heard, with rich charts: hours by year, binge and loop detection, how your taste moved, the shows you dropped and when. Everything on the device; no account; no streaming-service login.

**Who it is for.** Adults 18 to 40 who already use Spotify Wrapped, Apple Music Replay and stats apps, and want the same for all their services, all year, and accurate. Second: film diarists (Letterboxd users) and data-viz hobbyists.

**Evidence of need.**
- Counted: stats.fm for Apple Music (901 ratings, 3.7): **129 low reviews of 149 fetched**; about **50 of 129** say streams do not sync, are not counted, or are wrong (58 regex hits read by hand; about 8 removed as login, update-loop or paywall-only). "There are some songs that I will leave on replay for upwards of 20+ plays and the app will only count it as one play." "Importing history doesn't work." File: `research/reviews/media-6746327242.md`.
- Demand for listening stats is large: stats.fm for Spotify 47,341 ratings; must.fm 9,270. For Netflix viewing history and YouTube watch history I found **no stats app** in the store ("netflix viewing history stats", "youtube takeout", 2026-10-22).

**Price.** $6.99 once for all importers (34 sales; 41 at 30%); optional $2.99 yearly for new chart packs later. <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>: listening-stats apps alone are well past what we need.

**The hard part.** A parser per export format, each versioned and messy; entity resolution across services (the same song in Apple and Spotify exports, the same film on Netflix and Letterboxd: fuzzy title and duration matching, MusicKit catalog IDs and ISRCs where present); sessionizing play events into "listens" and "watches" with skips, loops and overlap handled; incremental updates from MusicKit recent plays between exports; a chart engine in Swift Charts. Room to grow for months: new sources (Disney+, Prime, Plex, podcasts, audiobooks), year-in-review cards drawn by code, comparisons with a friend's file, Mac app.

**Competitors.** stats.fm (Spotify and Apple Music, server-side, subscription; accepts Spotify history upload), must.fm, Last.fm. None found that is cross-service, on-device, or covers Netflix and YouTube.

**Risks.** Export formats change without notice; exports take days to arrive (the user waits once). Must not use Netflix or YouTube logos in screenshots (4.1 and trademark). Not finance, not health.

## 2. Streetsweep. Grade B-

**What it is.** Walk (or run) every street in your town, with a planner. Like the trackers, it records your walks and fills the streets in. Unlike them, it tells you the shortest set of walks from your door that would finish a neighbourhood, a 45-minute loop that covers the most new streets today, and re-plans when you stray. Offline, on-device, OpenStreetMap data.

**Who it is for.** Adult walkers and runners who like a long goal (the CityStrides and Wandrer crowd); retirees and dog walkers who walk daily and want variety.

**Evidence of need.**
- The trackers are new and growing fast: Sidewalk (2026-05) 942 ratings, implied **191-574 downloads/day**; Stomped (2026-04) 29-88/day; WalkMap (2026-07) 8-25/day (`sizing.py`, 2026-10-22). None of their descriptions mentions planning or optimizing a route (read 2026-10-22: Sidewalk, WalkMap, Stomped).
- "It didn't optimize my route" (HN, 2025-04-24, on CityStrides, https://news.ycombinator.com/item?id=43785417).
- Not counted for: Sidewalk has only 9 low reviews of 37 fetched; **0 of 9** ask for routes; 6 of 9 are tracking, performance or storage failures and 2 are update loops (`research/reviews/walk-6758922428.md`). So the planner is my inference from the forum, not a review count; reliable tracking is the counted pain.

**Price.** Free tracker; $9.99 once for the planner (24 sales; 29 at 30%).

**The hard part.** Map-matching GPS traces to street segments (hidden-Markov map matching, Newson and Krumm 2009); defining "a street done" robustly; the rural postman problem on the walking graph (cover a chosen set of edges with the least walking) and its budgeted, prize-collecting form for "best 45 minutes"; all on an iPhone with OSM extracts. Room to grow: hills avoided, loops ending at a café or a bus stop, cycling, shared city challenges, Loopwise (idea 6) as a mode.

**Competitors.** Sidewalk, Stomped, WalkMap, CityWalker (all 2025-26, free), CityStrides and Wandrer (web, linked to Strava). We would be the fifth tracker: the planner must be the headline, or 4.3 risk rises.

## 3. Plotback. Grade C+

**What it is.** Point the camera at a chart in a printed paper, or open a PDF, and get the numbers back as a table: axes found and calibrated automatically (including log scales), tick labels read, each series separated by colour or marker, error bars kept, exported to CSV or Numbers. On iPad and Mac as well as iPhone.

**Who it is for.** Graduate students, researchers, engineers, and data journalists who need the data behind a published figure for a meta-analysis or comparison.

**Evidence of need.**
- The free standard went paid: "WebPlotDigitizer ... recently released new versions that stopped being open source but moved to be a paid software, requiring login" (HN 2024-06-05, https://news.ycombinator.com/item?id=40584132).
- People keep building automatic versions for themselves: "I built it because I needed this tool for my thesis to digitize thousands of..." (HN 2026-06-30, https://news.ycombinator.com/item?id=48730901); graph2table (HN 2025-05-12, https://news.ycombinator.com/item?id=43962700). Both web.
- iOS shelf: one app, Plot Digitizer ($3.99, 3 ratings, last update 2022). Searches "digitize graph", "graph to csv", "chart to data" show chart *makers*, not readers.

**Price.** $14.99 once (16 sales; 20 at 30%); this audience pays for tools.

**The hard part.** Axis and tick detection (Hough lines plus Vision OCR), robust calibration, series separation by colour clustering and marker template matching, curve tracing through overlaps, sub-pixel accuracy reporting so a researcher can trust and cite it. Room to grow: bar and box plots, heatmaps with colour bars, batch figures from a whole PDF, uncertainty report.

**Why C+.** <span title="How many people show, in their own words, that they want this.">Need</span> is real but the work happens at a desk on PDFs; iPhone demand unproven, and the old iOS app's 3 ratings in six years is a warning. Strong if paired with idea 4 as one research companion.

## 4. Citemap. Grade C+

**What it is.** Open a paper (DOI, title, or the PDF itself) and see its neighbourhood as a map: what it cites, what cites it, which papers are central, clusters by topic, and "what is new near my papers since last week". Native on iPad and iPhone, built on OpenAlex's open catalogue (CC0 data).

**Who it is for.** Graduate students and researchers starting a literature review; science-curious readers.

**Evidence of need.** Connected Papers, Litmaps, ResearchRabbit and an open-source clone (Show HN 2024-04-11, https://news.ycombinator.com/item?id=39998274) show the idea is wanted; all are web. No native iOS literature map found ("citation graph", "connected papers", "litmaps", "research papers map", 2026-10-22); nearest are R Discovery (feed, 924 ratings) and alphaXiv (2026-07, reader).

**Price.** $9.99 once, or $14.99 with Plotback merged (24 or 16 sales).

**The hard part.** Co-citation and bibliographic-coupling similarity, graph layout that stays readable at 200 nodes, topic clustering, reference extraction from a PDF on-device, incremental alerts. Room to grow: Zotero sync, figure digitizing (idea 3), reading lists.

**Blocker to note.** OpenAlex now asks for an API key: the anonymous budget is "$0.10" a day shared per IP, a free key gives "$1/day" (api.openalex.org reply, 2026-10-22). A company key is a sign-up for the Investors; per-user keys add friction. Usage cost per map is not yet measured.

## 5. Gridfill. Grade C+

**What it is.** An iPad app for writing crosswords: draw the grid, place theme answers, and let autofill finish the rest from scored word lists, with the rules constructors care about (symmetry, no unchecked squares, word quality), then export to .puz and PDF. The clues stay the constructor's own; no generated puzzles.

**Who.** Hobby and indie crossword constructors, many of them adults who submit to newspapers or sell puzzle packs.

**Evidence.** Thin shelf: Cruciverbalist (33 ratings, 2022) offers word suggestions; others are maker toys or "AI Crossword Puzzle Maker" (2026). Serious construction lives on desktop (Crossfire, Crossword Compiler) and the web; HN gave 0 hits for "crossword construction software" since 2022; puzzling.SE mentions desktop tools (https://puzzling.stackexchange.com/q/49719#49731). Demand not counted yet.

**Price / hard part.** $19.99 once (12 sales). Autofill is a constraint-satisfaction search with arc consistency, good ordering heuristics and quality scoring; word-list licences decide it (to read).

## 6. Loopwise. Grade C

A walking loop of a chosen length from where you stand that passes the most notable places (Wikidata, Wikipedia extracts, OSM historic tags), offline, with real text, no generated narration. The hard part is the orienteering problem on a walking graph. Shelf: GPSmyCity (1,262 ratings), VoiceMap, TravelStorys, and a 2025-26 wave of "AI walking tour" apps (Routes 596 ratings, CityTour AI, FreeAIWalkingTour, AI TourMate). Crowded and slop-adjacent; better as a mode inside Streetsweep. $4.99.

## 7. Shortcut Lab. Grade C

Import your Apple Shortcuts, see them as a readable flow, keep version history, diff two versions, and flag common bugs (unused variables, unhandled empty results). For Shortcuts power users. Shelf: Jellycuts (57 ratings, a scripting language), Toolbox Pro and Logger for Shortcuts ($4.99, 27 ratings). Technical risk to verify first: shared shortcut files are signed archives since iOS 15, and reading them on-device may not be allowed. No counted demand. $9.99.

## 8. Coverage. Grade C

Import an EPUB, article or subtitle file you own; the app lemmatizes it, compares it with the words you know, and ranks your library by how much of it you would understand (Hu and Nation's 98% figure, cited at https://languagelearning.stackexchange.com/q/449#452), then pre-teaches the twenty words that unlock a chapter. Below the bar on novelty: LingQ already shows the share of new words per lesson, and Migaku and Language Reactor do in-video work. $9.99.

## 9. Festplan. Grade C

For film and music festival-goers: rank what you want to see, and the solver builds the best schedule given screening times, venue walking times and sold-out shows, re-planning live. Official festival apps list events but do not optimize (Sundance 1,185 ratings; TCM, Telluride). The hard part is less the solver (interval scheduling with travel times) than getting each festival's schedule in, which is a per-festival chore; seasonal demand. $4.99.

## 10. Rideall. Grade C-

Plan a ride of every line or every station on a subway or rail network in the least time, from public GTFS timetables (the "subway challenge" hobby). Time-dependent route covering is genuinely hard. No app found ("subway every station challenge"), but the audience is very small. $4.99.

## Dropped before writing up
- Bookshelf-photo cataloguing: Shelf Scanner (263 ratings), Bookshelf Scanner, Bookshelf Scanner: Spines (2026): crowded.
- Cave survey: CaveDiveMap, Cave 09 (2026, 0 ratings); audience too small for the store.
- Handwritten notebook indexing: Apple Notes already searches scanned documents; Rocketbook.

## Notes for Ines
- Ledger and Streetsweep have the clearest market; Ledger is the only one with a counted pain (about 50 of 129 low reviews).
- Plotback and Citemap are stronger together, as one research companion for papers on iPad, than either alone.
- Apple status (amendment 2026-10-22): membership still pending; nothing here needs App Store Connect before launch work.

## Open
- Ledger: get a real Apple privacy export, a Spotify Extended History and a Netflix file (Investor-owned accounts, by their choice) to check the formats; count stats.fm for Spotify low reviews.
- Streetsweep: mine CityStrides' and Stomped's reviews for route requests; spike rural-postman on an OSM extract.
- Citemap: OpenAlex key is an Investor sign-up; measure cost per map.
- Sizing partner still wanted.
{% endraw %}

</div>
