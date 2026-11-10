---
layout: "default"
title: "T-1032: a bundled, offline city list for saved places and Sunrise&#x27;s typed city"
section: "documents"
description: "What the list is for. Row 43 and the T-0063 ruling: a saved place comes from a fix the person takes or text they type, it stays on the device, and nothing is sent to Apple (no MapKit, no CLGeocoder). Row 27: Sunrise\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/t-1032-city-list.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/research/T-1032-city-list.md</code></span></div><h1>T-1032: a bundled, offline city list for saved places and Sunrise's typed city</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02, 4:47-4:52 PM ET. Board line T-1032 (Ines, T-0063 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling 2026-11-02 9:00 AM; matrix rows 27 and 43). Research only: nothing here is in the build, and no list goes in `log/assets.md` until one is chosen and lands.

What the list is for. Row 43 and the T-0063 ruling: a saved place comes from a fix the person takes or text they type, it stays on the device, and nothing is sent to Apple (no MapKit, no CLGeocoder). Row 27: Sunrise falls back to a city the person types. A bundled list turns typed text into coordinates (and a time zone) with no network call. The coordinates come from the list, not from Apple, so the DPLA Attachment 6 limits on stored Map Data (T-1030 review, P1) do not touch them.

## Method

- Pages were fetched once each through `tools/fetch_cite.py`, and data files through `tools/licence_fetch.py --save`. Both go through `tools/terms_guard.py`, which applies the live robots.txt and the terms list. Everything was signed out, with one data file per source. Copies are in scratch (`/private/tmp/company-scratch/T-1032-pernille/`), not in the repository.
- Before any further request, every candidate URL was checked with `terms_guard.reason()`. That call reads robots.txt and sends nothing to the URL itself.
- The archives were read in memory (`zipfile`, `tarfile`) with `python3 -I` (3.9.6, Apple M1 host) by scripts kept in a separate folder. Nothing was extracted or run, and the data was treated as data (Commandment 58).
- Byte counts are exact, from `len()` of the encoded text. "gzip9" means `gzip.compress(..., 9, mtime=0)`.

## Sources

### 1. Natural Earth, 1:10m Populated Places, version 5.1.2 (measured)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Natural Earth, 1:10m Populated Places, version 5.1.2 (measured), scrolls sideways" style="--tw:449px" markdown="1">

| Item | Value |
|---|---|
| Publisher | Natural Earth (NACIS) |
| Licence page | https://www.naturalearthdata.com/about/terms-of-use/, read 2026-11-02 4:48 PM ET |
| Licence, quoted | "All versions of Natural Earth raster + vector map data found on this website are in the public domain." "...invites you to use them for personal, educational, and commercial purposes. No permission is needed to use Natural Earth. Crediting the authors is unnecessary." The page also says names data for more than 20 languages came from Wikidata "under a CC0 (public domain) license". |
| Commercial use | Yes, stated on the page |
| Attribution | Not required. Credit text the page offers: "Made with Natural Earth." |
| Download page | https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/ ("Download populated places (2.68 MB) version 5.1.2"), read 2026-11-02 4:48 PM ET |
| File fetched | https://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip, 2026-11-02 4:48:47 PM ET, 2,811,199 bytes, sha256 `cd149186f03d2603e0410da399b980a4357d0ac32d3a2305a49ed3dffcc41d7b`. The page's own link (`www.naturalearthdata.com/http//...download/10m/cultural/...`) answered HTTP 406 to our client. naciscdn.org is the host that link points to, so this is still the publisher's file. |
| Rows | 7,342 |
| Countries | 225 ISO alpha-2 codes. Kosovo, Northern Cyprus and Somaliland (12 rows) carry `-99`, not a code. Compared with the 247 codes in tz `zone1970.tab`, the 22 codes with no row are all small territories: AI BL BQ CC CX GG IO JE MF MS NF NR NU PM PN SH SX TF TK UM VG WF. |
| Smallest place | POP_MAX 1 (Peter I Island, Antarctica). Outside Antarctica the smallest is 10 (Agapa RU, Andoas PE, Berenice EG). 10 rows have POP_MAX 0 and 40 rows are in Antarctica. Rows with POP_MAX of at least 1,000 / 5,000 / 15,000 / 100,000 / 1,000,000: 6,931 / 6,488 / 5,764 / 3,089 / 505. The publisher's description: "all admin-0 and many admin-1 capitals, major cities and towns, plus a sampling of smaller towns in sparsely inhabited regions". |
| Duplicate names | Case- and accent-folded, 197 names are shared by 453 rows (Springfield 5, Victoria 5, La Paz 4, Alexandria 4). Within one country, 63 name collisions remain (Springfield, Lancaster, Columbia and Albany in the US; Mercedes in AR). Adding admin-1 leaves exactly 1 collision. |
| Time zone | `TIMEZONE` is filled on 6,159 rows and has 320 distinct names. All 320 are Zone or Link names in tzdata 2026b, checked against the tarball below. 1,183 rows are empty. At build time, 394 of those can be filled from a country that has one zone and 365 more from an admin-1 that has one zone, which leaves 424 empty (mostly CA, RU, CN, US, AR, AU, AQ). |
| Other ids | GEONAMESID on 6,797 rows and WIKIDATAID on 7,192, so a later switch to another source can be matched row by row. |
| ASCII name | NAME differs from NAMEASCII on 779 rows, but only 135 still differ once accents are folded. The ASCII column is only needed on those 135. |

</div>


Encodings measured on all 7,342 rows. The time zone is stored as an index into one `|`-joined table of 320 names (5,168 bytes) on line 1.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. Natural Earth, 1:10m Populated Places, version 5.1.2 (measured), scrolls sideways" style="--tw:508px" markdown="1">

| Layout | Raw bytes | gzip9 bytes |
|---|---:|---:|
| A: name, cc, lat, lon (2 dp), tz | 211,807 | 101,145 |
| B: A + ASCII name where it differs literally | 225,841 | 105,378 |
| C: B + population | 271,709 | 133,125 |
| C as compact JSON arrays | 389,838 | 142,318 |
| D: C + admin-1 on every row | 345,994 | 162,830 |
| E: C at 4 dp | 301,075 | 146,156 |
| **R (recommended): name, ASCII only where folding differs (135), cc, admin-1 only on the within-country duplicates (135 rows), lat, lon at 2 dp, tz index with tz filled at build (759 filled, 424 empty), population; rows sorted by population, largest first** | **276,639** | **132,930** |

</div>


Two decimal places put a point within about 1.1 km north-south, which is finer than a city's own extent. JSON costs 118,129 more raw bytes than tab-separated text for the same rows and buys nothing.

### 2. GeoNames, cities15000 / cities5000 (licence read; data not fetched)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2. GeoNames, cities15000 / cities5000 (licence read; data not fetched), scrolls sideways" style="--tw:449px" markdown="1">

| Item | Value |
|---|---|
| Publisher | GeoNames (geonames.org) |
| Licence pages | https://www.geonames.org/about.html and https://www.geonames.org/export/, both read 2026-11-02 4:47-4:48 PM ET |
| Licence, quoted | about.html: "available for download free of charge under a creative commons attribution license", linked to https://creativecommons.org/licenses/by/4.0/. export/: "cc-by licence (creative commons attribution license). You should give credit to GeoNames when using data or web services with a link or another reference to GeoNames. commercial usage is allowed 'as is'". |
| Commercial use | Yes, stated on the page |
| Attribution | Required: credit and a link to GeoNames. CC BY 4.0 also asks for the licence link and a note when the data has been changed. I did not fetch the legal code in this task, so read it before any notice ships. |
| Download | **Refused by terms_guard.** `download.geonames.org/robots.txt` has `Disallow: /` for `User-agent: *` (live copy read 2026-11-02 4:47 PM). The company's tools may not fetch any dump file or `readme.txt` from that host. This was the task's one guard refusal. Nothing was retried, and no mirror was used. |
| Coverage, bytes | **Not measured.** Without the file I have no row count, country count, smallest city or duplicate count to give, and I will not quote numbers I did not see. about.html says only that the whole database has "5.2 million populated places". |

</div>


The commercial API (`api.geonames.org`) needs an account, and Commandment 7 bars sign-ups. The SPARQL endpoint of another open source, Wikidata (CC0), is also out: `query.wikidata.org/robots.txt` disallows `/sparql`, found by the pre-check and never requested. SimpleMaps World Cities Basic was tried for its licence page, and `simplemaps.com/data/world-cities` answered HTTP 403, so it has no licence read and is not a candidate.

### 3. IANA tz database, `zone1970.tab` in tzdata 2026b (measured, fallback only)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 3. IANA tz database, zone1970.tab in tzdata 2026b (measured, fallback only), scrolls sideways" style="--tw:640px" markdown="1">

| Item | Value |
|---|---|
| Publisher | IANA. Page https://www.iana.org/time-zones, read 2026-11-02 4:49 PM ET (latest release listed: 2026f, 2026-10-27) |
| File fetched | https://data.iana.org/time-zones/releases/tzdata2026b.tar.gz, 2026-11-02 4:49:08 PM ET, 473,703 bytes, sha256 `114543d9f19a6bfeb5bca43686aea173d38755a3db1f2eec112647ae92c6f544`. I picked 2026b to match this Mac's `/usr/share/zoneinfo/+VERSION`. 2026f is newer and should be used if this source is ever chosen. |
| Licence, quoted from LICENSE in the tarball | "Unless specified below, all files in the tz code and data (including this LICENSE file) are in the public domain." The BSD exception covers only date.c, newstrftime.3 and strftime.c, which are code, not data. |
| Commercial use and attribution | Public domain, so both are fine and no credit is required |
| Coverage | 312 rows (one city per zone), 247 country codes, no duplicate city names. Bergen, for example, is absent because Oslo stands for Europe/Oslo. |
| Bytes | 17,601 raw, 8,642 gzip9, as published |

</div>


This source is too thin for "type your city". It is useful only as a last resort, a "nearest zone city" when a typed name is not in source 1.

## Recommendation

**Ship Natural Earth 10m Populated Places 5.1.2 in layout R, as a plain UTF-8 tab-separated file: 276,639 bytes on the device.** I propose a **300,000-byte budget for the list as installed**, which leaves 23,361 bytes (8%) of headroom for a newer Natural Earth version. Ines sets the number.

- **Why not gzip in the bundle.** The IPA is a zip and deflates the file anyway. I measured gzip9 at 132,930 bytes, which approximates what R adds to the download, but I did not measure it in an actual IPA. Gzipping it ourselves would save about 144 KB installed. In exchange it adds a decompression step: Apple's Compression framework handles raw deflate, not the gzip header. 144 KB is not worth that code at our installed size. If Ines wants the smallest possible list, layout A gzipped is 101,145 bytes, but it loses population ranking, ASCII matching and admin-1 disambiguation.
- **Licence.** Public domain, commercial use stated, no attribution required. It is data, not imagery, so Commandments 5 and 9 raise nothing. When it lands, it gets one line in `log/assets.md` with the URL, version, sha256 and licence above.
- **Coverage, honestly.** 7,342 places in 225 countries, with 1,578 rows under a population of 15,000. Many small towns are not in it. For Sunrise that matters little: at 45°N, 1° of longitude is about 79 km and moves sunrise by 4 minutes, so a listed city 25 km away east or west is off by about 1.3 minutes. For distance to a saved place, a typed city is a city-level point, so a precise saved place still comes from a fix the person takes.
- **Lookup on a phone: not measured.** On the host (M1, CPython 3.9.6), parsing the raw file takes 19.4 ms, and a folded prefix scan that stops at 20 hits takes 3.4 ms a query on average (worst case: a scan of all 7,342 rows). The folded names total 67,069 bytes. At that size a linear scan needs no index. The same check should run on a device once Idris places the lookup (Swift picker or Python).
- **UI rule from the duplicates.** Show "name, country" on every suggestion, and admin-1 on the 135 rows that carry it.
- **Later option, not now.** GeoNames cities15000 or cities5000 would cover more towns, but the company's tools may not fetch it (robots.txt). If the Investors want it, they would have to download it themselves. That is their call, and I am not raising it as a request from this task. It would also need the attribution below.

## Attribution text

For the recommended Natural Earth list, none is required. Optional, in Acknowledgements, using the publisher's suggested wording:

> City list: Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com. Public domain.

If GeoNames is ever used (required; check against the CC BY 4.0 legal code before shipping):

> City list: GeoNames (https://www.geonames.org), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Fields reduced and time zones filled by pywidget.

## Open

- The lookup cost on a phone, measured where the lookup ends up.
- 424 rows with no time zone after the build-time fill. They can fall back to the device's own zone, or the row can be dropped. Rows lost if dropped: 424.
- Whether the shipped list should be 2026f-checked: the tz names were checked against 2026b, the version on this Mac.
{% endraw %}

</div>
