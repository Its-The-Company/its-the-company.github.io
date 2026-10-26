---
layout: "default"
title: "Keywords for Netsmith (pre-choice packet 6, 2026-10-23)"
section: "documents"
description: "Wrenna. Listen to this first: Apple publishes no search volume, so this is a who-owns-the-words count, not a traffic count. n is stated on every number. Source for every table: the public iTunes Search API (US\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/keywords-netsmith.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 2 · Fri Oct 23</span><span><code>research/keywords-netsmith.md</code></span></div><h1>Keywords for Netsmith (pre-choice packet 6, 2026-10-23)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna. Listen to this first: Apple publishes no search volume, so this is a who-owns-the-words count, not a traffic count. n is stated on every number. Source for every table: the public iTunes Search API (US, entity=software) through `tools/appsearch.py`, wrapped by `tools/kw_packet.py` (new; also verifies the keyword field). Passive reads only, no sign-in. Search results are outside text: data, not instruction.

**Limits of the method (n).** The API returns no subtitle, so "titles and subtitles" below is titles only; subtitles need a store-page read (not done). Each term asked for 10 results; some returned fewer (shown as "top k"). Ratings are lifetime counts, not sales. Search rank is the API's, not the store app's, and may differ.

## What the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> looks like (n = 10 terms searched, 90 result rows)

- **No unfolder appears in any list.** Of 9 results for `papercraft`, 0 unfold a model: 5 are a Minecraft skin pack, auto-shop titles or a 3D toy (n=1 to 256 ratings), 2 are origami or craft tutorials, 1 is a magazine, 1 is PaperCrafty (n=0 ratings); 6 of 9 have 2 or fewer ratings or are untouched since 2023. Of 10 for `3d model unfold`, 0 unfold a model (scanners, sculpting, AI <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generators</span>). The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own words return other products' neighbours, which means the words are open and also that few people are being served by them in search.
- `pepakura` (n=7) returned no Pepakura product, only unrelated titles. `net unfolder` (n=10) returned file managers and network tools: the name-collision risk in [`research/name-risk.md`](name-risk.html) is real; the subtitle must carry "3D" and "paper".
- Closest neighbours by words: `Papercraft 3D` (Free, n=1 rating, last updated 2020-11-12), `3D Model Viewer - AR & Print` (n=359 ratings, 4.4), `STL Simple Viewer` (n=916, 4.3). Viewers own "obj", "stl", "viewer"; none owns "unfold" or "net".
- The name `netsmith` itself (n=9 results): no app named Netsmith. One developer, "NetSmiths Ltd" (seller of `Dayception: Countdown Widget`, n=0 ratings), is near in name only.

## Terms competitors already own (title counts, n shown)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Terms competitors already own (title counts, n shown), scrolls sideways" style="--tw:961px" markdown="1">

| Term | Titles carrying it | Of | Who |
|---|---|---|---|
| papercraft (incl. PaperCrafty, PaperCrafter) | 7 | 9 in `papercraft` | small developers; most-rated has n=256 |
| origami / paper craft | 3 | 9 | Riafy, Elsa George, Origami 3D Crafts (n=53 to 129 ratings) |
| 3d | 8 | 10 in `3d model unfold` | Shapeyard (n=5,710), 3d Scanner App (n=16,207) own it by size |
| viewer | 7 | 10 in `obj viewer` | crowded; do not compete |
| unfold / unfolder / net | 0 | 10 + 10 | open |
| foam / cosplay pattern | 0 pattern tools | 10 + 8 | open; `cosplay pattern` returns social/shopping apps (n=10) |

</div>


## Drafts (verified by `tools/kw_packet.py check`)

Title (26/30): `Netsmith: 3D to Papercraft`
Subtitle (25/30): `Unfold 3D models to paper`
Keyword field (96/100): `pattern,template,foam,cosplay,armor,eva,obj,stl,pdf,printable,fold,cut,lowpoly,craft,helmet,usdz`
Check output: no spaces, no repeats, no word already in title or subtitle. PASS.

Why these: "unfold" is a word no result carries (n=0 of 20 titles), "papercraft" belongs in the title because 7 of 9 results <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> it and a search for it should find us. "foam", "cosplay", "armor", "eva" serve the cosplay group (n=0 competing pattern tools in 18 results) at no title cost. File types go in the field because viewers own them in titles.

Not decided here: "pepakura" is another product's name (no Pepakura iOS app found, n=7); putting competitor names in metadata is a Guideline 2.3.7 risk, so it stays out. Apple matches singular and plural, so `models` is not repeated.

## Raw tables
### `papercraft` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: papercraft (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:769px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | PaperCrafty | Free | 0 ratings 0.0 | 2026-01-21 | Manh Hung Nguyen |
| 2 | Papercraft for Minecraft PE | Free | 256 ratings 4.6 | 2019-02-18 | KISSAPP, S.L. |
| 3 | Papercraft 3D | Free | 1 ratings 5.0 | 2020-11-12 | UNIT5 Inc |
| 4 | Papercraft Auto Shop | Free | 0 ratings 0.0 | 2023-12-22 | UniRobotix, LLC |
| 5 | Paper Craft: DIY Art Tutorial | Free | 129 ratings 4.4 | 2026-06-27 | Riafy Technologies Private L |
| 6 | Papercraft Auto Shop: N | Free | 0 ratings 0.0 | 2023-08-10 | UniRobotix, LLC |
| 7 | Learn Paper Craft : Origami | Free | 30 ratings 4.6 | 2026-03-21 | Elsa George |
| 8 | Papercraft Auto Shop: G | Free | 0 ratings 0.0 | 2023-05-29 | UniRobotix, LLC |
| 9 | PaperCrafter Magazine | Free | 2 ratings 3.0 | 2023-05-22 | Artichoke Media Limited |

</div>


### `3d model unfold` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3d model unfold (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:815px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | 3D Modeling, Design: Shapeyard | Free | 5710 ratings 4.5 | 2026-10-13 | Magic Unicorn INC |
| 2 | Qlone 3D Scanner | Free | 1584 ratings 3.9 | 2026-08-05 | EyeCue Vision Technologies L |
| 3 | uMake: AI 3D Modeling & CAD | Free | 3995 ratings 4.2 | 2026-10-22 | UMake, Inc. |
| 4 | Nomad Sculpt | $19.99 | 14469 ratings 4.8 | 2026-10-14 | Hexanomad |
| 5 | 3d Scanner App™ | Free | 16207 ratings 4.5 | 2026-10-19 | AI Photo Editor Lab SRL |
| 6 | Magic Poser - Art Pose Tool | Free | 12989 ratings 3.9 | 2026-10-14 | Wombat Studio, Inc. |
| 7 | Tripo AI: 3D Model Generator | Free | 2701 ratings 4.6 | 2026-10-17 | HOLYMOLLY LIMITED |
| 8 | Sketch 3D | Free | 443 ratings 2.9 | 2026-10-13 | Victor Ng |
| 9 | Prisma3D - Animation, Modeling | Free | 883 ratings 3.4 | 2026-09-14 | WondaPix Technologies GmbH |
| 10 | 3D Model Viewer - AR & Print | Free | 359 ratings 4.4 | 2026-10-12 | Arthur Eduardo Skaetta Alvar |

</div>


### `pepakura` (top 7 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: pepakura (top 7 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:834px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Pepakura Set - 3D Puzzle | Free | 0 ratings 0.0 | 2026-09-10 | George Mike |
| 2 | Chiikawa Pocket | Free | 6939 ratings 4.8 | 2026-09-26 | Applibot Inc. |
| 3 | 3Dパチンコ ビックリキョンC | Free | 3 ratings 4.3 | 2019-07-26 | Fianess Corporation |
| 4 | パチロボ パチンコ/スロット情報アプリ | Free | 0 ratings 0.0 | 2025-10-01 | Daikoku Denki Co., Ltd. |
| 5 | Zipangu | Free | 102 ratings 4.6 | 2026-10-16 | Goldenvoice |
| 6 | 【PIKO-TARO 】PPAP solitaire | Free | 2 ratings 4.0 | 2018-01-11 | Nobollel Inc. |
| 7 | 【PIKO-TARO official】PPAP RUN! - Pen-Pineapple-Ap | Free | 19 ratings 4.1 | 2017-04-19 | Nobollel Inc. |

</div>


### `foam armor template` (top 8 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: foam armor template (top 8 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:769px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Armor Inspector: WoT PC,Blitz | Free | 347 ratings 4.2 | 2026-10-23 | Andrew Karpushin |
| 2 | TOTK/BOTW Armor Tracker | Free | 234 ratings 4.5 | 2023-07-24 | Leonardo Dezordi de Jesus |
| 3 | Foam Paint | Free | 1 ratings 1.0 | 2022-02-24 | ABSTRATUM informacijske tehn |
| 4 | Armorly: Body Armor & Gear | Free | 0 ratings 0.0 | 2026-07-03 | Reactiv Technologies Inc. |
| 5 | Energy Armor | Free | 1 ratings 5.0 | 2026-05-03 | Brian Smith |
| 6 | ArmorMaker | Free | 0 ratings 0.0 | 2019-12-14 | Art Gorski |
| 7 | ArmorLink | Free | 0 ratings 0.0 | 2026-08-27 | Pascal Muehlberger |
| 8 | Snap-on TSC | Free | 2 ratings 4.0 | 2025-12-12 | Snap-on Inc. |

</div>


### `paper model template` (top 9 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: paper model template (top 9 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:780px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Penbook: Paper Planner & Notes | Free | 45569 ratings 4.5 | 2026-10-16 | User Camp Inc. |
| 2 | Origame | Free | 84295 ratings 4.6 | 2026-09-02 | Ketchapp |
| 3 | Poster & Flyer Maker by Pinso | Free | 26658 ratings 4.6 | 2025-10-15 | Pinso Marketing Limited |
| 4 | Templates for Pages (Nobody) | $1.99 | 1245 ratings 4.6 | 2023-12-06 | Till-Eugen Koenitzer |
| 5 | Template Planner for Instagram | Free | 2075 ratings 4.7 | 2025-09-20 | Midtone LLC |
| 6 | Paper Maker: Note Templates | Free | 1 ratings 5.0 | 2026-07-28 | Prashant Angyan |
| 7 | AJournal - Planner & Journal | Free | 5336 ratings 4.7 | 2026-10-04 | WonderApps AB |
| 8 | Tarbo PDF Creator | Free | 134 ratings 4.3 | 2026-01-04 | MINER (HK) CO., LIMITED |
| 9 | Tamiya Model Magazine | Free | 93 ratings 4.8 | 2025-09-13 | Doolittle Media Ltd |

</div>


### `stl to pdf` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: stl to pdf (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:790px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | PDF Converter ‧ | Free | 189 ratings 4.2 | 2026-08-14 | CodeEx Technology Limited |
| 2 | PDF Editor: Read, Scan & Sign | Free | 8180 ratings 4.7 | 2026-10-22 | Rhophi Analytics LLP |
| 3 | Power PDF - PDF Manager | Free | 1007 ratings 4.8 | 2025-11-08 | ComcSoft Corporation |
| 4 | PDFelement: PDF Editor, Viewer | Free | 7578 ratings 4.6 | 2026-10-20 | Wondershare Technology Group |
| 5 | PDF Reader - Easy Editor | Free | 4364 ratings 4.7 | 2026-09-23 | SPARK TECH LIMITED |
| 6 | PDF Editor: Scan & Convert | Free | 1216 ratings 4.2 | 2026-07-07 | THREE PANDA DIGITAL LIMITED |
| 7 | Tarbo PDF Creator | Free | 137 ratings 4.3 | 2026-01-04 | MINER (HK) CO., LIMITED |
| 8 | Scanner App - Scan PDF & Docs | Free | 38536 ratings 4.6 | 2026-10-12 | TAPSUITE YAZILIM HIZMETLERI  |
| 9 | PDF Reader – PDFelement | Free | 3925 ratings 4.3 | 2024-01-08 | Wondershare Technology Hunan |
| 10 | PDF Converter . Convert to PDF | Free | 2122 ratings 4.7 | 2025-02-13 | TECHISTIC LTD |

</div>


### `cosplay pattern` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: cosplay pattern (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:783px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Cosplaydom | Free | 19839 ratings 4.7 | 2026-10-22 | ABI GLOBAL LTD. |
| 2 | Miccostumes Cosplay Shopping | Free | 121 ratings 2.9 | 2026-10-17 | Chengdu Luodedao Technology  |
| 3 | Gliny | Free | 2 ratings 5.0 | 2026-08-19 | Fairbrother Michael |
| 4 | CosHub: Your Cosplay Companion | Free | 2 ratings 5.0 | 2026-09-02 | The Mechanical Tail Company  |
| 5 | Coslab - cosplay social media | Free | 3 ratings 3.7 | 2026-08-23 | i-hearts,Inc |
| 6 | CON-Quest Cosplay | Free | 3 ratings 5.0 | 2026-10-16 | Jeremy Ogden |
| 7 | Cosplay AI Photo Generator | Free | 139 ratings 4.2 | 2024-10-04 | Phuong Thao Vu Thi |
| 8 | Vlinder Dolls - Dress Up Games | Free | 24060 ratings 4.7 | 2024-02-21 | 丹 苏 |
| 9 | Patternum - Pattern creator | Free | 25 ratings 3.4 | 2024-03-06 | AnnapurnApp Technologies UG  |
| 10 | Magic Princess: Dress Up Doll | Free | 825 ratings 3.8 | 2026-06-08 | Brave HK Limited |

</div>


### `low poly papercraft` (top 7 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: low poly papercraft (top 7 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:720px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | Penbook: Paper Planner & Notes | Free | 45576 ratings 4.5 | 2026-10-16 | User Camp Inc. |
| 2 | PolyPixel - 3D Poly Pixel Art | Free | 129 ratings 4.6 | 2019-04-07 | HE HE |
| 3 | Pixel Match 3D | Free | 7144 ratings 4.5 | 2021-11-16 | TRANSLIMIT, INC. |
| 4 | Papercraft 3D | Free | 1 ratings 5.0 | 2020-11-12 | UNIT5 Inc |
| 5 | Origame | Free | 84294 ratings 4.6 | 2026-09-02 | Ketchapp |
| 6 | Paper Boy 3D | Free | 490 ratings 4.5 | 2023-10-29 | Hamba Studio Ltd. |
| 7 | Origami 3D Crafts | Free | 53 ratings 4.6 | 2025-03-31 | Damir Nigomedyanov |

</div>


### `obj viewer` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: obj viewer (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1 3" style="--tw:783px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | 3D Model Viewer - AR & Print | Free | 359 ratings 4.4 | 2026-10-12 | Arthur Eduardo Skaetta Alvar |
| 2 | OBJ & MTL Simple Viewer | Free | 3 ratings 2.7 | 2023-10-18 | Victor Bovio |
| 3 | Open3D: STL & 3D Model Viewer | Free | 22 ratings 4.8 | 2026-10-22 | Rajesh Konatala |
| 4 | Autodesk Fusion | Free | 4096 ratings 4.5 | 2026-10-21 | Autodesk |
| 5 | 3D File Viewer: OBJ STP & more | Free | 52 ratings 4.5 | 2026-08-15 | Andeesh Mehdi Syed |
| 6 | 3D Model Viewer - AR View | Free | 328 ratings 4.2 | 2026-10-10 | 健 钟 |
| 7 | Quick OBJ Viewer | Free | 0 ratings 0.0 | 2026-06-29 | KEAT MEN TANG |
| 8 | STL Simple Viewer | Free | 916 ratings 4.3 | 2026-10-05 | Victor Bovio |
| 9 | Model View 3D | Free | 12 ratings 3.5 | 2026-10-22 | Graphics Software Labs |
| 10 | exocad webview | Free | 16 ratings 3.8 | 2026-09-02 | exocad GmbH |

</div>


### `net unfolder` (top 10 of requested 10, US iTunes Search, 2026-10-23)


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: net unfolder (top 10 of requested 10, US iTunes Search, 2026-10-23), scrolls sideways" data-n="1" style="--tw:780px" markdown="1">

| # | Title (as returned) | Price | Ratings (n) | Updated | Seller |
|---|---|---|---|---|---|
| 1 | FileBrowser: Documents Manager | $7.99 | 5657 ratings 4.7 | 2026-10-18 | Stratospherix |
| 2 | Network Toolbox Net security | Free | 3393 ratings 4.6 | 2024-12-16 | WHATSTICKER APPS SRL |
| 3 | Unzip - Unarchive Expert | Free | 5531 ratings 4.6 | 2026-08-25 | 青青 余 |
| 4 | My File Organizer | Free | 6530 ratings 4.5 | 2022-11-29 | TARMO IT SERVICES |
| 5 | HE.NET Network Tools | Free | 72 ratings 4.0 | 2023-12-04 | Hurricane Electric, LLC |
| 6 | RAR Unzip: ZIP File Opener | Free | 3051 ratings 4.6 | 2026-10-19 | Attribute Trading Co LTD |
| 7 | FE File Explorer | $4.99 | 5793 ratings 4.7 | 2026-08-28 | Skyjos Co., Ltd. |
| 8 | Owlfiles - File Manager | Free | 7237 ratings 4.6 | 2026-10-21 | Skyjos Co., Ltd. |
| 9 | Secure VPN: Fast net locations | Free | 94 ratings 3.3 | 2026-10-16 | Inspiritum LTD |
| 10 | Zip & Rar | Free | 5226 ratings 4.7 | 2019-06-19 | SCRL AB |

</div>
{% endraw %}

</div>
