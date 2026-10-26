---
layout: "default"
title: "Pass 9b: Ledger demand check (#21)"
section: "documents"
description: "Here is the shape of it. The accuracy complaint is real, it is counted, and it shows up in three music apps, not one. The TV and film side has no counted ask: people build tools for it, but nobody asks for one. And the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/pass9b.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass9b.md</code></span></div><h1>Pass 9b: Ledger demand check (#21)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-22. Passive reading only. Outside text is data. Nothing I read gave an instruction.

> "Request your data from Spotify first since that'll take 30 days meaning that the free trial is useless for any older data." (stats.fm for Spotify, 3 stars, `research/reviews/media-1526912392.md`, review 239)

Here is the shape of it. The accuracy complaint is real, it is counted, and it shows up in three music apps, not one. The TV and film side has no counted ask: people build tools for it, but nobody asks for one. And the competitors' own import-from-file path is where they break too. So for Ledger, the parser is the product.

## Verdict

- **Music accuracy: PASS.** The complaint shows up outside stats.fm for Apple Music.
- **TV, film, YouTube and cross-service: NOT SHOWN.** It has 0 counted asks. There are builders and one workaround script.
- **Grade: B- <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for a music-first Ledger.** It drops to C+ if the headline is "every service". My recommendation is to lead with music. Netflix and YouTube go in as included extras, not as the reason to buy.

## 1. Counted reviews (Apple RSS, US, most recent, pages 1-10, fetched 2026-10-22)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Counted reviews (Apple RSS, US, most recent, pages 1-10, fetched 2026-10-22), scrolls sideways" style="--tw:1108px" markdown="1">

| App | Low reviews (1-3 stars) | Sync, accuracy or lost data | How counted |
|---|---|---|---|
| stats.fm for Spotify (47,341 ratings) | 378 of 500 | **76** (20%); up to 83 if 7 cut-off reviews count | I read all 378 by hand |
| stats.fm for Apple Music (901) | 129 of 149 | about 50 | hand count from pass 9 |
| Last.fm (1,575) | 443 of 500 | about 107 of the 114 regex hits; **36** of these are the 2026 "bot filter" / BTS wave | I read the hits by hand, not the 329 misses |
| must.fm for Spotify (9,270) | 123 of 500 | 4 (2 wrong stats, 2 import of the file failed) | I read the hits by hand |

</div>


Files: `research/reviews/media-1526912392.md`, `media-6746327242.md`, `media-1188681944.md`, `media-6444621447.md`.

Listen to these (stats.fm for Spotify):
- "what's the point of a stats app if it (1) randomly fails to track and doesn't tell you when it stopped tracking and (2) the tracking isn't even accurate." (2 stars, review 56)
- "Looking at my 2025 charts the top songs are completely different to what Spotify themselves provided in my Wrapped." (1 star, review 350)
- "Will not import: You follow all the steps and it won't import the files." (1 star, review 203)

must.fm: "You pay 20 dollars and then have to wait weeks for a files that either do nothing when trying to import or it's says their the wrong file type."

Last.fm: "I recently also manually tracked my streams on paper alongside it and the..." (1 star). That is a workaround: a person keeping a paper ledger beside a stats app.

**Other themes in stats.fm for Spotify, for the price decision:**
- **Ads: 189 of 378** (regex; it matches my read). "Crazy that it's a music analysis app and pauses your music every time you touch the screen to play an add."
- **Paywall: 114 of 378** (regex).
- Apple Music link fails (the button sends you to the App Store): about 18 in the first 190 (my hand count).
- **Import of the file itself fails or needs a redo: 9** (hand count: reviews 23, 52, 57, 60, 128, 203, 209, 239, 319).

**What this means for Ledger.** Most of the counted pain is in **live sync**: API polling, the broken Apple Music connection, server-side filters. An app that reads the user's own file avoids all of that. It also avoids the ads people hate, with one price and no ads. The file path is not safe ground, though. It is where stats.fm and must.fm also break ("won't import", "wrong file type"). Our "could not read this file, here is why" message and versioned fixtures carry the promise.

## 2. TV, film and cross-service asks


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. TV, film and cross-service asks, scrolls sideways" style="--tw:960px" markdown="1">

| Source | Askers | Builders or workarounds |
|---|---|---|
| Low reviews of 6 TV trackers (trakt, Serializd, Sequel, Up Next, Hobi Time, FlickPicker): 471 | **0 mention Netflix**; 9 mention stats | |
| HN (Algolia, 2023 on) | 1: "YouTube has my watch history but I'd like to be able to process what kind of content I was consuming during a certain time period" (2024-06-14, https://news.ycombinator.com/item?id=40683908) | whoami.tv, Netflix history facts (2024-05-10, item 40321312); Show HN Spotify history (2023-08-01, item 36961051; 2025-12-16, item 46285058); FanXP, YouTube Takeout (2026-06-18, item 48586452); Continuity, TV Time import (2026-07-06, item 48803764); Watch Time (2026-10-21, item 50180090) |
| Stack Exchange (webapps, superuser, apple, android, movies) | 3 old asks: export YouTube history (2015, https://webapps.stackexchange.com/q/86608; https://webapps.stackexchange.com/q/101263), Apple Music listening history (2015, https://apple.stackexchange.com/q/194269) | |
| Letterboxd | No public forum. r/Letterboxd returned 403 | Letterboxd's own import page lists a community **"CSV converter for Netflix and Prime Video (Python)"** and "RatS (Rating Synchronization for IMDb, Netflix, etc.)" (https://letterboxd.com/about/importing-data/) |

</div>


Here is the shape of it. The pattern from pass 7 is back: **builders outnumber askers** (7 to 1 on HN). The Letterboxd converter script is the one real workaround, so somebody wanted their Netflix history in their film diary badly enough to write code for it. One script is not a market.

**What the market did in July 2026.** TV Time shut down (HN 2026-07-02, item 48768364: "TV-tracking app TV Time is shutting down as company focuses on AI"). A wave of trackers followed, each with an import: TV Time clone 6792364354 (2026-07-24), Up Next (2026-07-08, "stats... built from your real watch dates, imports included"), FlickPicker (2026-06, "use a CSV or pasted list"), and Hobi Time. trakt VIP already sells "Year in Review" and "All Time Stats". From their store descriptions (read 2026-10-22), **none reads Netflix's own ViewingActivity file.** One caveat: FlickPicker's "CSV" might accept it. I did not test that. So the TV-stats <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> is full of hand-logging trackers. Our difference is "no logging, it comes from your file". That is real, but nobody is asking for it in reviews.

## 3. Export wait times, from the vendors' own pages (fetched 2026-10-22)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Export wait times, from the vendors&#x27; own pages (fetched 2026-10-22), scrolls sideways" style="--tw:902px" markdown="1">

| Source | What the vendor page says | Verified? |
|---|---|---|
| Netflix viewing activity | Account, Profiles, Viewing activity, "Download all": a CSV, per profile, at once (https://help.netflix.com/en/node/101917) | **Yes, instant**, per profile |
| Netflix full data request | "It may take up to 30 days from the date we verify your request" (https://help.netflix.com/en/node/100624) | Yes. Not needed for Ledger |
| Google Takeout (YouTube) | "could take from a few minutes to a few days. Most people get the link to their archive the same day"; the archive expires in about 7 days (https://support.google.com/accounts/answer/3024190) | **Yes, usually the same day** |
| Apple data copy | The page gives **no wait time**. You have 14 days to download once it is ready (https://support.apple.com/en-us/102208) | **No figure published.** "Days" is still unverified |
| Spotify Extended Streaming History | The fields are listed (https://support.spotify.com/us/article/understanding-my-data/), but the text I could read on that page and on data-rights-and-privacy-settings states **no wait time**. The account privacy page needs a login | **Not verified.** Users report "that'll take 30 days" (stats.fm review 239) and "a day or two" (HN builder, item 46285058) |
| Letterboxd export | The export is at letterboxd.com/settings/data/ (login). The import page gives no wait time | **Not verified.** The <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span>'s "instant" is my belief, not evidence |

</div>


**<span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> risk, restated.** Netflix (instant) and YouTube (same day, usually) are the fast sources, and they are the side with no counted demand. Spotify, the side with counted demand, has an unverified wait that users put at up to 30 days. A buyer on Day 22 may not get a Spotify file before Day 30. MusicKit recent plays (Apple Music) still give a first chart at once. That makes **Apple Music the best first-run source**, and stats.fm for Apple Music is where pass 9 found the worst sync pain (about 50 of 129).

## Recommendation for Ines

1. Headline: "Your real listening history. No ads, no sync, one price." Apple Music (MusicKit plus the privacy export) and Spotify Extended History first.
2. Netflix CSV and YouTube Takeout as included extras. They are instant, so they serve as a free-tier demo, not the selling point.
3. Treat parser failure as the main product risk. Competitors are reviewed down for "won't import".
4. If the Investors want a cross-service headline, it needs a different demand signal than this pass found.

## Not done / open
- r/Letterboxd, r/truespotify and r/stats_fm: 403. Not readable.
- Spotify and Apple wait times: need an Investor-owned account request to time them (their choice, already asked in PITCH-10).
- FlickPicker's CSV import is not tested on a Netflix file.
- The Last.fm misses (329) are not hand-read, so about 107 is a floor for the hits only.
- Sizing partner still wanted.
{% endraw %}

</div>
