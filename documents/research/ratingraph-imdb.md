---
layout: "default"
title: "How ratingraph.com gets IMDb data, and what Evan may do for his own widget (T-5439)"
section: "documents"
description: "Pages read (2026-11-21, 3:59 to 4:00 PM ET): the robots.txt (allows all), the home page, the privacy policy, and one show page (Black Clover). The site has no About, FAQ, Terms or Credits page; the footer links only\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/ratingraph-imdb.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 31 · Sat Nov 21</span><span><code>research/ratingraph-imdb.md</code></span></div><h1>How ratingraph.com gets IMDb data, and what Evan may do for his own widget (T-5439)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-21. For Investor Evan's 12:06 PM ET message on #325 (c7066210354). Every page, with its URL, fetch time and saved copy: research/inbound/t5439-ratingraph-imdb/SOURCES.md. This is a reading of published terms, not legal advice.

## 1. Which route ratingraph uses: no page says

- Pages read (2026-11-21, 3:59 to 4:00 PM ET): the robots.txt (allows all), the home page, the privacy policy, and one show page (Black Clover). The site has no About, FAQ, Terms or Credits page; the footer links only "Privacy policy" and a contact email.
- **The word IMDb appears on none of them** (counted by script over the saved HTML: 0 on the home page, 0 on the privacy page, 0 on the show page). So no ratingraph page names its source or a licence.
- What the pages show is consistent with IMDb's non-commercial datasets, but that is inference, not a citation. The show page gives each episode's rating and vote count, a 7-day "Trend" of new votes, "History (tracking since March 7, 2020)", and "amount of total votes may decrease due to periodic removal of fraudulent ones". The datasets page (company copy of 2026-10-25) offers `title.ratings.tsv.gz` (averageRating, numVotes) and `title.episode.tsv.gz`, "refreshed daily"; daily snapshots of those two files would produce such a history.
- The site serves ads (its home page preconnects to Google's ad hosts; the privacy page names advertisers) and publishes a public database of 39,386 shows and 319,688 movies. IMDb's non-commercial licence (below) forbids using the data to "create any kind of online/offline database of movie information (except for individual personal use)". So ratingraph either holds a commercial licence that it does not mention, or uses the data outside the published non-commercial terms. No page says which, and we cannot tell from outside.

## 2. IMDb's published routes

- **Non-commercial datasets.** developer.imdb.com/non-commercial-datasets/ now redirects to data.imdb.com; terms_guard refused the redirect (a host whose terms are unread), so today's copy was not read, and the item stopped there. The company's saved copy of the same page (2026-10-25, `research/hunt/H229-raw/terms/imdb-datasets`) says: "Subsets of IMDb data are available for access to customers for personal and non-commercial use. You can hold local copies of this data, and it is subject to our terms and conditions." Files at https://datasets.imdbws.com/, gzipped TSV, "refreshed daily".
- **Its licence** (help.imdb.com, "Can I use IMDb data in my software?", read 4:02 PM ET), the page the datasets page links as "Non-Commercial Licensing":
  - "Limited non-commercial use of IMDb data is allowed, provided the following conditions are met: You agree to all the terms of our copyright/conditions of use statement."
  - "IMDb reserves the right to withdraw permission to use the data at any time at our discretion."
  - "The data must be taken only from the datasets made available ... You may not use data mining, robots, screen scraping, or similar online data gathering and extraction tools on our website."
  - "The data can only be used for personal and non-commercial use and must not be altered/republished/resold/repurposed to create any kind of online/offline database of movie information (except for individual personal use)."
  - "Please refer to the copyright/license information enclosed in each file for further instructions and limitations on allowed usage."
  - "You must acknowledge the source of the data by including the following statement: Information courtesy of IMDb (https://www.imdb.com). Used with permission."
- **Commercial.** help.imdb.com "Content licensing" (4:02 PM ET): "customized" licensing packages for businesses including "mobile applications"; the content includes "user ratings". "Introducing the IMDb API!" (4:03 PM ET): "The IMDb API is powered by AWS Data Exchange", GraphQL, "To request a free trial, please visit IMDb's AWS Marketplace". Prices are not on either page. The developer.imdb.com pages redirect to data.imdb.com and were not read.
- **Not read:** IMDb's Conditions of Use (www.imdb.com/conditions; www.imdb.com's robots.txt disallows every path), which the licence says you must agree to; and the licence text "enclosed in each file" (reading it means downloading the dataset files, which this task did not do).

## 3. What Evan may do for a widget he builds for himself

- **Source that fits:** the non-commercial datasets at datasets.imdbws.com. The licence allows "personal and non-commercial use", and its database ban carves out "individual personal use", so a ratings widget on his own phone fits the published words.
- **Conditions:** take the data from the dataset files only, never by scraping imdb.com pages; show the line "Information courtesy of IMDb (https://www.imdb.com). Used with permission." in the widget or page; agree to the Conditions of Use (unread by us; Evan can read it in a browser); read the licence text inside the files; and IMDb can withdraw the permission at any time.
- **Sharing changes it.** Publishing the data, or a project that carries it, is "republished ... to create any kind of online/offline database", outside the carve-out. A premade in pywidget, or a project shared through the App Store app, would be the company's commercial use, which the non-commercial licence does not cover: that needs the commercial licence or the IMDb API (AWS Data Exchange). Sharing only code that downloads the files to each person's own device is not addressed by any page read; ask IMDb (the licence page offers a licensing contact) before relying on it.
- Practical note, not a terms point: the files are whole-catalogue downloads (file sizes not checked), so a widget would fetch them no more than daily, the stated refresh rate.

## Open

- Today's copy of the datasets page (data.imdb.com) and the Conditions of Use are unread by the company; both need a person's browser read or a <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> clearing data.imdb.com.
{% endraw %}

</div>
