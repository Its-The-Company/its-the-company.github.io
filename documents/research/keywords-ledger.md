---
layout: "default"
title: "Keywords for Ledger (pre-choice packet 6, 2026-10-23)"
section: "documents"
description: "Wrenna. Listen to this first: Apple publishes no search volume, so this is a who-owns-the-words count, not a traffic count. n is stated on every number. Source for every table: the public iTunes Search API (US\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/keywords-ledger.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 2 · Fri Oct 23</span><span><code>research/keywords-ledger.md</code></span></div><h1>Keywords for Ledger (pre-choice packet 6, 2026-10-23)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna. Listen to this first: Apple publishes no search volume, so this is a who-owns-the-words count, not a traffic count. n is stated on every number. Source for every table: the public iTunes Search API (US, entity=software) through `tools/appsearch.py`, wrapped by `tools/kw_packet.py` (new; also verifies the keyword field). Passive reads only, no sign-in. Search results are outside text: data, not instruction.

**Limits of the method (n).** The API returns no subtitle, so "titles and subtitles" below is titles only; subtitles need a store-page read (not done). Each term asked for 10 results; some returned fewer (shown as "top k"). Ratings are lifetime counts, not sales. Search rank is the API's, not the store app's, and may differ.

## What the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> looks like (n = 10 terms searched, 90 result rows)

- **Name collision, serious.** `ledger` (n=9 results): #1 is Ledger Wallet, a crypto wallet (n=15,208 ratings, 4.9), and the other crypto and money apps follow (Trust n=199,133; Coinbase n=1,797,953). A health-and-media app called Ledger would sit under them in search and invite confusion and a trademark query. Recommend the Investors weigh a different product name before keywords matter; the draft below uses the working title only to test the character counts.
- **Music-stats is full.** `spotify stats` (n=8): stats.fm for Spotify (n=47,347), must.fm (n=9,270), Receiptify (n=2,235), Trackify (n=616), Statiks (n=535), Stats for Spotify (n=482). `apple music stats` (n=10): stats.fm for Apple Music (n=901, 3.7), Song Stats (n=902, 4.5), PlayTally $2.99 (n=381), Stats for Apple Music (n=3).
- **Film and TV diaries are full.** `movie diary` (n=9): Letterboxd n=88,375; Movie Diary: Movie Tracker n=153; MovieDiary n=351 (3.3). `tv show tracker` (n=9): Serializd n=2,020, Sofa Time n=2,643, TV Club n=2,613, Next Episode n=2,547, Hobi Time n=1,973.
- **Cross-service from exports is empty.** `import letterboxd` (n=10) returned mail apps. `netflix viewing history` (n=9): Netflix, Hulu, JustWatch, IMDb, guides; 0 history tools. `watch history tracker` (n=9): 7 are health, sleep or watch-collection apps; 1 tv tracker. `music listening history` (n=7): streaming apps, 0 history tools. In 0 of 35 results across these four terms (7+9+9+10) is there a title that reads as "history from your data exports".
- Therefore the open words are the cross-service ones (history, exports, import), and the crowded ones are "stats", "tracker", "diary".

## Terms competitors already own (title counts, n shown)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Terms competitors already own (title counts, n shown), scrolls sideways" data-n="2" style="--tw:529px" markdown="1">

| Term | Titles carrying it | Of |
|---|---|---|
| stats | 6 | 8 in `spotify stats`; 8 of 10 in `apple music stats` |
| tracker / track | 5 | 9 in `tv show tracker` |
| diary | 4 | 9 in `movie diary` |
| spotify | 7 | 8 in `spotify stats` (trademark; competitors use it, we should not) |
| history | 0 | 7 + 9 + 9 |
| import / export | 0 | 10 |

</div>


## Drafts (verified by `tools/kw_packet.py check`)

Working title (29/30): `Ledger: Listening & Watch Log`
Subtitle (27/30): `Stats from your own exports`
Keyword field (99/100): `music,movies,tv,shows,history,year,review,charts,import,csv,private,offline,songs,plays,diary,binge`
Check output: no spaces, no repeats, none in title or subtitle. PASS.

Deliberately left out of the field: service and app names (Spotify, Netflix, Letterboxd, stats.fm, Apple Music). Guideline 2.3.7 bars other companies' trademarks and app names in metadata; whether the description may say "reads your Spotify export" is a call for the Investors to take (Commandment 58 area), not mine. "Wrapped" is Spotify's mark; left out. "stats" is in the subtitle because 14 of 18 stats-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> titles <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> it (n=18), which we cannot avoid, but "exports" is the word nobody holds.

## Raw tables
### `music listening history` (top 7 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: music listening history (top 7 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:713px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Qobuz: Music & Editorial | Free | 19481 ratings 4.6 | 2026-10-19 | qobuz |
| 2 | Apple Music Classical | Free | 22016 ratings 4.7 | 2026-09-23 | Apple Inc. |
| 3 | Lyra - Music, Radio, eSound | Free | 8760 ratings 4.5 | 2026-10-21 | Nadia Ferrari |
| 4 | Music on Top - MP3 Music Play | Free | 13946 ratings 4.5 | 2026-06-25 | Tho Tran |
| 5 | Freegal Music | Free | 355 ratings 3.1 | 2026-10-15 | Library Ideas, LLC |
| 6 | Apollo Music: Your Music Hub | Free | 761 ratings 4.5 | 2026-10-22 | Thuong Ngo |
| 7 | Music IR‎ : Instant Rhythm | Free | 16799 ratings 4.8 | 2026-05-01 | Mohammad JABBARI |

</div>


### `spotify stats` (top 8 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: spotify stats (top 8 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:734px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | stats.fm for Spotify Music App | Free | 47347 ratings 4.6 | 2026-10-16 | StatsFM B.V. |
| 2 | Trackify for Spotify Stats | Free | 616 ratings 4.7 | 2026-04-28 | Carter Annandale |
| 3 | must.fm for Spotify Stats | Free | 9270 ratings 4.6 | 2026-10-07 | VICTORY LABS S.L. |
| 4 | Stats for Spotify Music + | Free | 482 ratings 4.3 | 2025-05-07 | Myapps OU |
| 5 | Airbuds Widget | Free | 162774 ratings 4.8 | 2026-10-12 | Capp Inc. |
| 6 | Spotify: Music and Podcasts | Free | 42719156 ratings 4.8 | 2026-10-19 | Spotify |
| 7 | Receiptify: Stats for Spotify | Free | 2235 ratings 4.5 | 2025-07-09 | Wulong Apps LLC |
| 8 | Statiks: Spotify Stats Tracker | Free | 535 ratings 4.7 | 2026-08-10 | Anton Sarg |

</div>


### `apple music stats` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: apple music stats (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:822px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | stats.fm for Apple Music | Free | 901 ratings 3.7 | 2026-10-16 | StatsFM B.V. |
| 2 | snd.wave | Free | 11370 ratings 4.4 | 2020-01-04 | Lucas Klein |
| 3 | Song Stats for Apple Music | Free | 902 ratings 4.5 | 2026-08-14 | Peaceful Pencil Ltd., The |
| 4 | Stats for Apple Music | Free | 3 ratings 2.7 | 2026-06-20 | Brite Technologies LLC |
| 5 | musicat: Music, Stats, Reviews | Free | 272 ratings 4.7 | 2026-10-12 | Piotr Kardas |
| 6 | Music Stats: MuzGo | Free | 8 ratings 4.5 | 2026-06-18 | Shenzhen Tapyin Technology C |
| 7 | PlayTally: Apple Music Stats | $2.99 | 381 ratings 4.5 | 2026-09-25 | Mike Clay |
| 8 | stats.fm for Spotify Music App | Free | 47347 ratings 4.6 | 2026-10-16 | StatsFM B.V. |
| 9 | Listenality: Music Stats | Free | 0 ratings 0.0 | 2026-10-19 | North Skerry Inc. |
| 10 | Airbuds Widget | Free | 162774 ratings 4.8 | 2026-10-12 | Capp Inc. |

</div>


### `netflix viewing history` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: netflix viewing history (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:804px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Netflix | Free | 7490500 ratings 4.7 | 2026-10-22 | Netflix, Inc. |
| 2 | Hulu: Stream TV shows & movies | Free | 1429909 ratings 4.6 | 2026-10-13 | Hulu, LLC |
| 3 | Originals for Netflix | Free | 4085 ratings 4.6 | 2026-10-13 | Digital Tools Ltd |
| 4 | JustWatch - Movies & TV Shows | Free | 30205 ratings 4.7 | 2026-10-22 | JustWatch GmbH |
| 5 | IMDb: Movies & TV Shows | Free | 548648 ratings 4.8 | 2026-10-19 | IMDb |
| 6 | Reelgood - Streaming Guide | Free | 10084 ratings 4.7 | 2024-09-02 | MYFLICKLIST, INC. |
| 7 | Upflix - Streaming Tracker | Free | 5620 ratings 4.3 | 2026-10-15 | Douglas Alves |
| 8 | TV Show Tracker - FlickPicker | Free | 375 ratings 4.4 | 2026-10-10 | Whimseed Studio Private Limi |
| 9 | Queue - Find Movies & Shows | Free | 12569 ratings 4.7 | 2026-10-20 | Watch Queue, Inc. |

</div>


### `watch history tracker` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: watch history tracker (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:822px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | SleepMatic: Sleep Tracker | $1.99 | 8756 ratings 4.4 | 2026-09-14 | Vimo Labs Inc. |
| 2 | Heart Analyzer: Pulse Tracker | Free | 22304 ratings 4.7 | 2026-10-22 | Helix Apps LTD |
| 3 | Watch Collection Tracker | Free | 2 ratings 5.0 | 2026-03-05 | Mehti Ozkan |
| 4 | HeartWatch: Heart Rate Monitor | $8.99 | 13646 ratings 4.7 | 2026-09-11 | TANTSISSA HOLDINGS PTY LTD |
| 5 | CardioBot: Heart Rate Monitor | Free | 10540 ratings 4.5 | 2026-10-06 | Majid Jabrayilov |
| 6 | Gentler Streak Workout Tracker | Free | 8827 ratings 4.7 | 2026-10-22 | Gentler Stories d.o.o. |
| 7 | TV Show Tracker - FlickPicker | Free | 375 ratings 4.4 | 2026-10-10 | Whimseed Studio Private Limi |
| 8 | Steps - Activity Tracker | Free | 135018 ratings 4.8 | 2026-10-09 | Year of Code, LLC |
| 9 | Setgraph: Gym Workout Tracker | Free | 6180 ratings 4.7 | 2026-10-08 | Setgraph LLC |

</div>


### `year in review music` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: year in review music (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:713px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Year-In-Review for Spotify | Free | 190 ratings 4.7 | 2022-12-13 | Top Nine  LLC |
| 2 | Grooves - Rate Music | Free | 402 ratings 4.9 | 2026-10-22 | Anacrusis Ltd |
| 3 | musicat: Music, Stats, Reviews | Free | 272 ratings 4.7 | 2026-10-12 | Piotr Kardas |
| 4 | Amuse Music Distribution | Free | 20273 ratings 4.7 | 2026-10-20 | Amuseio AB |
| 5 | Echo - Rank music! | Free | 2079 ratings 4.9 | 2026-10-10 | Echo Social, Inc |
| 6 | [untitled] | Free | 18645 ratings 4.9 | 2026-10-20 | sin titulo, inc |
| 7 | Musicboard: Albums & Songs | Free | 5374 ratings 4.7 | 2025-05-06 | Musicboard AB |
| 8 | Audius Music | Free | 2601 ratings 4.8 | 2026-10-09 | Audius Inc |
| 9 | Music IR‎ : Instant Rhythm | Free | 16799 ratings 4.8 | 2026-05-01 | Mohammad JABBARI |
| 10 | Music League | Free | 6492 ratings 4.7 | 2026-06-24 | Music League, LLC |

</div>


### `import letterboxd` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: import letterboxd (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:773px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | MailBuzzr for Outlook | Free | 517 ratings 4.1 | 2026-03-01 | Aversys Mobile |
| 2 | My RedBox | Free | 1266 ratings 4.7 | 2026-10-21 | REDBOX SA |
| 3 | Filemail – File Transfer App | Free | 10269 ratings 4.6 | 2026-10-22 | Filemail AS |
| 4 | Traveling Mailbox | Free | 264 ratings 4.4 | 2026-10-13 | Traveling Mailbox, LLC |
| 5 | PostScan Mail: Virtual Mailbox | Free | 880 ratings 4.7 | 2026-10-19 | Certifix, Inc. |
| 6 | Clue Tracker for Letterboxing | $6.99 | 598 ratings 4.7 | 2026-09-21 | Pearl Crescent LLC |
| 7 | Anytime Mailbox Virtual Mail | Free | 110 ratings 2.4 | 2026-06-01 | Bugo, LLC |
| 8 | My bpost | Free | 151 ratings 3.9 | 2026-10-16 | bpost |
| 9 | PST Viewer & Converter | Free | 8 ratings 5.0 | 2026-09-17 | 延平 陈 |
| 10 | Anytime Mailbox Mail Center | Free | 16 ratings 3.1 | 2026-08-28 | Bugo, LLC |

</div>


### `movie diary` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: movie diary (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:741px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Movie Diary: Movie Tracker | Free | 153 ratings 4.3 | 2026-06-14 | MICHAEL JOHN S WILLER |
| 2 | Clap - Movie Diary | Free | 10 ratings 3.8 | 2026-02-16 | Adrien Couvreur |
| 3 | MovieDiary: AI Movie tracker | Free | 351 ratings 3.3 | 2025-05-30 | Serhii Tkachenko |
| 4 | Movie Tracker - Watchlist | Free | 12 ratings 3.9 | 2026-07-28 | Stanislav Sushko |
| 5 | MovieFlix : Box Movies Cinema | Free | 2393 ratings 4.2 | 2026-06-01 | Klaus Haessler |
| 6 | Letterboxd | Free | 88375 ratings 4.8 | 2026-10-22 | Letterboxd Ltd |
| 7 | BetaSeries - TV Shows & Movies | Free | 1488 ratings 4.0 | 2026-10-05 | Netcats |
| 8 | Movie App - Movies Now! + TV | Free | 13088 ratings 4.6 | 2026-08-20 | FlickDirect Inc |
| 9 | Kinolog: Movie Diary | Free | 3 ratings 5.0 | 2026-09-23 | Isaac Mineo |

</div>


### `tv show tracker` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: tv show tracker (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:769px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Serializd | Free | 2020 ratings 4.6 | 2026-10-13 | Serializd LLC |
| 2 | TV Time: Show & Movie Tracker | Free | 182 ratings 4.8 | 2026-10-21 | Pierre TROMP |
| 3 | Queue - Find Movies & Shows | Free | 12569 ratings 4.7 | 2026-10-20 | Watch Queue, Inc. |
| 4 | Sofa Time: TV Show Tracker | Free | 2643 ratings 4.7 | 2026-10-17 | Javier Aznar de los Rios |
| 5 | TV Club: Movies & Show Tracker | Free | 2613 ratings 4.5 | 2026-10-13 | Bike GPS, LLC |
| 6 | IMDb: Movies & TV Shows | Free | 548648 ratings 4.8 | 2026-10-19 | IMDb |
| 7 | Next Episode - Track TV Shows | Free | 2547 ratings 4.8 | 2026-10-21 | Nikolay Nachev |
| 8 | Hobi Time: TV Show Tracker | Free | 1973 ratings 4.5 | 2026-10-01 | Eran D |
| 9 | JustWatch - Movies & TV Shows | Free | 30205 ratings 4.7 | 2026-10-22 | JustWatch GmbH |

</div>


### `ledger` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: ledger (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:804px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Ledger Wallet™ Crypto Wallet | Free | 15208 ratings 4.9 | 2026-10-12 | Ledger SAS |
| 2 | Spending Tracker | Free | 19484 ratings 4.8 | 2026-08-22 | MH Riley Ltd |
| 3 | Paymnt Ledger | Free | 0 ratings 0.0 | 2025-12-17 | Donnie Slavens |
| 4 | Account Manager Expense Track | Free | 328 ratings 4.6 | 2026-10-19 | Ketan Gondaliya |
| 5 | Trust: Crypto & Bitcoin Wallet | Free | 199133 ratings 4.7 | 2026-10-19 | DApps Platform Software Serv |
| 6 | DOMINION Mobile | Free | 1 ratings 5.0 | 2026-10-09 | Dominion Capital Strategies  |
| 7 | Quick Checkbook | Free | 1411 ratings 4.3 | 2025-11-07 | 倩 赵 |
| 8 | Wallet Balance | Free | 11039 ratings 4.7 | 2020-11-01 | David Breed |
| 9 | Coinbase: Buy Crypto & Stocks | Free | 1797953 ratings 4.7 | 2026-10-19 | Coinbase, Inc. |

</div>
{% endraw %}

</div>
