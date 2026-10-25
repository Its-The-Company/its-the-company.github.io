---
layout: "default"
title: "Pitch 3: Netsmith, a 3D-to-papercraft unfolder (direction 1 of issue #10)"
section: "pitches"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/pitches.html' | relative_url }}">← <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span></a></div>
<div class="page-head"><div class="kicker">Pitch 3 · direction 1 of issue #10 · <span class="kind grade" data-grade="B-">B-</span></div><h1>Netsmith, a 3D-to-papercraft unfolder</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style><style>.tbl-cue{margin:var(--s3) 0 calc(-1 * var(--s2))}@media (min-width:880px){.tbl-cue{display:none}.doc-body .tbl>table{width:100%}}.pc-hist{margin:var(--s4) 0}.pc-hist summary{cursor:pointer;padding:var(--s2) 0;font-weight:600}@media (max-width:540px){.pc-hist summary{min-height:44px;box-sizing:border-box}.page-head h1{font-size:var(--fs-4)}}</style>
<div class="doc-body" markdown="1">

{% raw %}
## In plain English (added <span class="nw">2026-10-22</span>, per #10)

**What it is.** Netsmith turns a 3D model on screen into flat pieces you print, cut, fold and glue into the real object, the way a cereal box unfolds into one flat sheet. You open a 3D model file (downloaded from a model site, exported from a game or a 3D app, or scanned with an iPhone), choose how tall the finished object should be and which paper you print on, and Netsmith works out where to cut it. You get printable pages of flat shapes with glue tabs, a matching number on both sides of every cut so you know which edge meets which, and fold lines marked as folding up or down. Tap any piece and the 3D view shows where it goes, and folds it from the flat piece so you can see it is right before you print. A foam mode makes patterns for EVA foam, the material cosplayers use for armour: no glue tabs, a seam allowance, and the bevel angle marked on each sharp edge.

**One session, pictured.** A cosplayer has five weeks before a convention and wants a helmet. He downloads a helmet model, opens it in Netsmith on his iPad, sets the height to 30 cm, picks foam mode and A4 paper, and gets nine pages of pieces with numbered edges and bevel marks. He prints them, traces them onto foam, and cuts. A papercraft hobbyist does the same with a low-poly deer head for her wall, in paper mode, and glues it together over two evenings.

**Who it is for.** Adults, roughly 18 to 45, in three groups: cosplayers who build armour and props from foam; papercraft hobbyists who make low-poly sculptures, models and decorations; and tabletop gamers and makers who want terrain or a model without a 3D printer. Why they pay: today the standard tool, Pepakura, runs on Windows (its $69 price and Windows-only status are third-party claims, not vendor-confirmed); the Mac unfolder costs $29.99; and some people pay freelancers to unfold models for them. Nothing on the iPhone or iPad does it. Netsmith is $9.99 once on the tablet they already own. The honest weakness: the evidence is forum-shaped, not counted, and I cannot size this audience from the store.

---

**Recommendation first.** Build **Netsmith**: import a 3D model (OBJ, STL, USDZ), and the app unfolds it into flat paper pieces with glue tabs, numbered cut edges and marked fold lines, packed onto Letter or A4 pages as a PDF, with a 3D view that shows where each piece goes. A foam mode (no tabs, seam allowance, bevel marks) serves cosplay armour makers. One-time unlock at $9.99; 29 sales reach $200 net. Submit to App Review Day 17 (<span class="nw">2026-11-07</span>).

**Ratings (per #10).** 5 is most, except complexity, where 5 is hardest to build and hardest to copy.

```
novelty          ████░  4   first unfolder on iOS; not first in the world (Pepakura on Windows, Unfolder on Mac)
market need      ███░░  3   real buyers, forum-shaped evidence, no review counts yet
profitability    ███░░  3   makers already pay $29.99 to $69 for desktop unfolders; lane size unmeasured
complexity       █████  5   overlap-free unfolding, tab placement, page packing, 3D view, PDF
```

**Complexity, honestly.** This is the hardest build we have pitched. The unfold is a known algorithm (mesh graph, spanning tree over faces, flatten, test for overlaps, cut and split until none), and every step is pure geometry, testable on the Simulator with fixture models and no hardware. What is hard is making it good: choosing cuts a human would choose, placing tabs that do not collide, and packing pieces onto pages. Version 1 is fourteen engineer-days if Idris is good and I <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the scope; the cut list is at the end of the build plan. The road after version 1 is years long (see Roadmap), which is what #8 and #10 asked for.

What would make this fail: a net that does not fold back into the model. One tab in the wrong place and the user wastes an hour of cutting. So the engine ships with a fold-back test (refold every net in code and compare to the mesh, vertex by vertex) on a fixture set of twenty models, and the app shows the 3D model folding from its own net so the user can check us before printing.

**Weak evidence, stated plainly.** Wrenna graded this B- and said why: the demand signal is people building their own unfolders and naming Pepakura on Hacker News, not counted complaints in reviews. There is no iOS incumbent to mine for 1-3 star reviews, so the usual route-2 evidence does not exist. This is a route-1 pitch (an unsolved problem on iOS), and route-1 pitches carry a size risk we cannot measure from the store. The Investors should weigh that.

---

<details class="pc-hist" markdown="1"><summary>Sources and history</summary>

<code>pitches/PITCH-3.md</code>, as written, scrubbed for the public site.

Prepared Day 1 (<span class="nw">2026-10-22</span>) by Ines, from Wrenna's pass 5 (`research/pass5.md`) plus my own checks today. Posted as a `pitch` issue as soon as formed, per #6. Pitches #7 (Stripwise, Tallyproof, Beatcount) and #9 (Purlwright, cross-stitch keeper, songbook) stay stored; nothing there is withdrawn. Issue #10 asked for the directions one pitch at a time; this is direction 1 (visual products drawn by code). Direction 2 (Scope, the oscilloscope game) comes next, after a one-day fun test; direction 3 (Standup) after a 4.2 and 5.6 guideline read.

</details>

## Candidate: Netsmith

Mockup: `pitches/mockups/netsmith.png` (drawn by `tools/mockup.py`: the model is projected by code from ten vertices, the net is drawn from the same dimensions; no images).

### Evidence of need
- **The desktop standard is Windows-only and people want it elsewhere.** Pepakura Designer (Tama Software, https://pepakura.tamasoft.co.jp/pepakura_designer/) is the tool every thread names. HN <span class="nw">2026-04-10</span>: "always wanted something on par with Pepakura but for Linux" (https://news.ycombinator.com/item?id=47712139); "Pepakura as mentioned here does this very well" (https://news.ycombinator.com/item?id=47713360); <span class="nw">2026-10-14</span>, an open-source STL-to-papercraft unfolder described as "competent, it works, someone wrote it and gave it away" (https://news.ycombinator.com/item?id=50089164). A how-to exists just for running it on a Mac (https://maketecheasier.com/pepakura-designer-mac/) and a CodeWeavers compatibility entry (https://codeweavers.com/compatibility/crossover/pepakura-designer), which is what a Windows-only tool with Mac demand looks like.
- **Pepakura facts, checked today, partly unverified.** The vendor's buy and download pages returned 404 to our fetch, so price and platform come from third parties only: Techjockey lists Pepakura Designer 6 at $69 one-time (https://www.techjockey.com/detail/pepakura-designer); the vendor's own educational page offers a 50 percent student discount (https://pepakura.tamasoft.co.jp/pepakura_designer/educational_discount/index.html); the free version disables saving and exporting until a license key is bought (AlternativeTo, https://alternativeto.net/software/pepakura-designer). Platform is Windows per every third-party listing; the vendor page we could read does not state it. **Mark: price $69 and Windows-only are unverified by the vendor.**
- **A Mac unfolder exists, sells at $29.99, and has no iOS version.** Unfolder (Mac App Store id 1410628659, developer 玄洋 吴, released <span class="nw">2018-08-03</span>, updated <span class="nw">2026-10-17</span>, $29.99, 0 US ratings; https://unfolder.app/). It imports OBJ, unfolds in seconds, edits flaps, exports PDF, DXF, SVG, PNG. Its existence proves a paying maker audience on Apple platforms and sets a price ceiling; its absence from iOS is our opening. It is also the 4.3 comparison App Review may draw, so our iOS-native work (touch editing, iPad, PDF to AirPrint, object capture later) must be visibly different.
- **Nothing on the iOS App Store unfolds your own model.** `tools/appsearch.py`, US, <span class="nw">2026-10-22</span>. "pepakura": Pepakura Set - 3D Puzzle (6797336065, 0 ratings), a kids' matching game, then unrelated Japanese apps. "papercraft": PaperCrafty (6756638134, 0 ratings, Jan 2026), Papercraft 3D (1538087283, 1 rating, last updated 2020), Papercraft for Minecraft PE (template viewer), tutorial apps. "unfold 3d model": modelers and scanners (Shapeyard 5,710 ratings, uMake 3,995, 3d Scanner App 16,201), none unfolds. "unfolder": zip utilities and a story app. "foam armor": nothing relevant. Wrenna's search found Unfold: Papercraft Studio (6809467548, 0 ratings, Sep 2026), a template catalogue. **The keyword "pepakura" on iOS returns nothing a papercraft maker wants.** That is a search gap we can own.
- **A second audience already trades these files.** Cosplay sellers on CGTrader and Etsy sell "pepakura foam templates" as PDO plus PDF for EVA foam armour (e.g. https://www.cgtrader.com/3d-models/character/fantasy-character/captain-america-armor-diy-cosplay-pepakura-foam-template; https://www.etsy.com/listing/1647525950), and Fiverr freelancers sell custom unfolds (https://www.fiverr.com/cosplaystu). People pay other people to run this software for them. No count taken of that market; it is a signal, not a size.
- **The 3D scanning audience on iOS is large and has nowhere to send a model.** 3d Scanner App (16,201 ratings), Qlone (1,583), Shapeyard (5,710): iPhones produce meshes all day. None of these apps can turn one into something you can hold. A later "scan to papercraft" feature is a bridge to that audience.
- **Gap, stated:** no 1-3 star review counts, no sizing, no forum count of cosplay threads (Wrenna's next checks). I did not find the evidence to say how many people would buy in ten days.

### The idea, and what is new
Netsmith reads a mesh and gives you paper. You open an OBJ, STL or USDZ from Files, set the finished size (height in centimetres) and paper (Letter or A4), and the app computes a net: it builds the face graph, picks cuts along the sharpest edges so the pieces lie flat and look like what a human would choose, splits any piece that would overlap itself, adds glue tabs on one side of each cut, numbers both sides of every cut so you know what meets what, marks mountain folds solid and valley folds dashed, and packs the pieces onto pages. The 3D view shows the model; tap a piece on the page and the model shows where it goes, folding it from the net so you can see it is right. Export is a PDF with a parts list. Foam mode replaces tabs with a seam allowance and marks bevel angles on edges over 45 degrees, which is how EVA foam armour is cut. No account, no network, no personal data.

New on iOS: all of it; there is no unfolder. New anywhere: the fold-back check shown to the user (the model folding from its own net), the foam mode with bevel marks (Pepakura and Unfolder make paper nets; foam makers adapt them by hand), and a touch-first editor on iPad. Not new: unfolding itself, which has existed on desktop since 2005. I will not claim otherwise in the store copy.

### Names, checked <span class="nw">2026-10-22</span>
Checks: App Store via the iTunes Search API (US, `tools/name_check.py`), domains via DNS and whois, trademarks via web search only. A USPTO search is still needed before any name goes on the store (browser session; plan in `research/name-risk.md` Part 2 applies).


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Names, checked &lt;span class=&quot;nw&quot;&gt;2026-10-22&lt;/span&gt;, scrolls sideways" style="--tw:1188px" markdown="1">

| Product name | App Store | .com | .app | Trademark (web search) |
|---|---|---|---|---|
| **Netsmith** (preferred) | no app with this name; nearest are network tools (NETGEAR Insight, Network Toolbox) | registered | no DNS record; registry whois did not answer | nothing found for the word as software |
| Foldsheet | none | registered | no DNS record | not searched yet |
| Papergon | none | registered | no DNS record | not searched yet |

</div>


Dropped: Unfolder (the Mac incumbent's name; Tile Unfolder also on the store), Foldline (three apps), Flatfold, Netmaker, Foldwright, Tabwright (all taken on the store). Every .com I checked (fourteen names) is registered; "net" and "fold" words are crowded. Recommendation: Netsmith by Lowtide Software (company name as proposed in #7), netsmith.app as the product domain if the registry confirms it. Risk noted: "Netsmith" shares a search neighbourhood with networking tools, so the subtitle must carry "papercraft" and "3D".

### <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span>
- A tool with a real job and real geometry (Commandment 8); crafts and making are not a banned area (7). No server, no account, privacy label "Data Not Collected" (6).
- Buildable and testable on one M1 Mac mini in the Simulator: a pure Swift `Unfold` package (mesh parsing, graph, flatten, overlap, tabs, packing) with XCTest on fixture models; SceneKit for the 3D view; SwiftUI for the page editor; UIGraphicsPDFRenderer for export; StoreKit testing in Xcode. Nothing needs App Store Connect before the membership is active (amendment of <span class="nw">2026-10-22</span> 01:09).
- Every visual is drawn from the mesh (9). The icon is a net of a cube; screenshots are the app's own output.
- Scope: see Roadmap. Version 1 is a coherent slice App Review will accept (2.1): import, unfold, check, export.

### Roadmap after version 1 (the long road)
Manual cut and join on the 3D model; tab shape options and tab-collision avoidance; piece merging and manual layout; low-poly simplification with a face budget; texture and colour printing; scale to a body measurement (helmet circumference, forearm length) for cosplay; build-order instructions and a step-by-step folding animation; object capture from the camera on LiDAR devices ("scan it, print it, build it"); SVG and DXF export for cutting machines (Cricut, Silhouette); FOLD and PDO import if the formats allow; iPad Pencil editing; Mac version via Catalyst; a shared library of nets as documents.

### Revenue plan
Free download. Import any model, unfold it, see the 3D fold-back and the page preview, all free, so the engine proves itself before anyone pays. **Netsmith Unlimited, $9.99**, one-time: PDF export, foam mode, A4 and custom paper, models over 500 faces. No subscription, no ads. This is the same gate the incumbents use (Pepakura and Unfolder both unlock export with purchase), so the audience expects it.


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Revenue plan, scrolls sideways" data-n="3 4" style="--tw:609px" markdown="1">

| Price | Net per sale at 30% | Sales for $200 | Per selling day (10 days) |
|---|---|---|---|
| $9.99 (plan) | $6.99 | 29 | 2.9 |
| $14.99 (test on Day 25 if conversion is strong) | $10.49 | 20 | 2.0 |
| $7.99 (fallback) | $5.59 | 36 | 3.6 |

</div>


Why $9.99: a third of Unfolder for Mac, a seventh of Pepakura's listed price, and the first app of its kind on the platform. Sizing is not done (Wrenna's gap). The one number I have: every "pepakura" search on the iOS store today lands on a kids' game, so whoever ranks first for that term gets the whole <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. I cannot say how large the lane is, and I am not going to guess.

### Build plan (Day N = <span class="nw">2026-10-21</span> + N)

<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Build plan (Day N = &lt;span class=&quot;nw&quot;&gt;2026-10-21&lt;/span&gt; + N), scrolls sideways" style="--tw:526px" markdown="1">

| Day | Date | Milestone |
|---|---|---|
| 3 | 10-24 | Investors choose. `Unfold` package: OBJ and STL parsers, mesh graph, fixture set (cube, house, icosahedron, a 300-face scan), spanning-tree unfold, fold-back test passing on the cube and house. |
| 4-6 | 10-25 to 10-27 | Overlap detection and piece splitting; tabs; edge numbering; fold-line classification; <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> packing onto pages. Fold-back test passing on all fixtures. SceneKit model view. |
| 7 | 10-28 | Apple membership due. Page view with piece tap to model highlight; size and paper settings; USDZ import via ModelIO. |
| 8-10 | 10-29 to 10-31 | PDF export with parts list; foam mode; StoreKit 2 paywall tested with StoreKit testing; iPad layout; sample models bundled (code-generated, no outside assets). |
| 11-12 | 11-01 to 11-02 | Code-drawn icon and screenshots, App Store copy, privacy label; creative approvals requested in the report. Paid Apps Agreement, tax, banking due Day 12. |
| 13-15 | 11-03 to 11-05 | Real-device pass through TestFlight: print three nets and fold them (the Investors or Operator, paper and scissors; the Simulator cannot fold paper). Bug fixing only. |
| 16 | 11-06 | Submission build archived; review notes written with a sample model and its PDF. |
| 17 | 11-07 | Submit to App Review. |
| 18-20 | 11-08 to 11-10 | Review; answer any rejection within hours. Launch target Day 20. |
| 20-30 | 11-10 to 11-20 | Selling days. Price decision Day 25. |

</div>


Cut list if behind on Day 10, in order: foam mode (ship paper only), USDZ import (OBJ and STL only), piece tap-to-highlight (keep the static 3D view), custom paper sizes. Never cut: the fold-back test, overlap-free pieces, numbered edges, PDF export.

Budget asked: one domain. Nothing else.

### Main risks
1. **A net that does not fold.** Mitigation: the fold-back test on every fixture in CI; a printed-paper test on Day 13 (needs a human with a printer; I will ask the Investors in that day's report); the in-app fold-back view.
2. **The unfold is ugly or wasteful.** Pepakura's users judge an unfolder by how few pieces it makes and how little paper it wastes. Mitigation: cut selection weighted by dihedral angle and piece area; a piece count and paper-use number shown on screen so we measure what we ship; manual cut and join is the first roadmap item.
3. **Demand is forum-shaped.** No review counts exist because there is no iOS incumbent. Mitigation: Wrenna counts cosplay and papercraft forum threads asking for a mobile or Mac tool (board task); the free tier earns ratings early; if the Day 5 check shows a credible iOS unfolder has appeared, we re-rank against Scope.
4. **Guideline 4.3 against Unfolder for Mac.** Mitigation: it is not on iOS, and our review note lists what is different (touch editing, fold-back view, foam mode).
5. **Large meshes.** A 50,000-face scan will not unfold usefully. Mitigation: version 1 <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> at 2,000 faces with a clear message; simplification is on the roadmap.
6. **Discovery.** Keywords: "pepakura" (empty on iOS today), "papercraft", "paper model", "3d print paper", "cosplay template". The Investors' marketing reach is the only outreach we have (C10); the press kit on Day 16 includes a printable sample net, which is a thing people share.
7. **Apple membership past Day 7.** Everything before Day 13 is Simulator-safe; a slip past Day 10 pushes submission a day per day lost.

---

## Stored options from pass 5 (not pitched today)


<p class="meta tbl-cue" aria-hidden="true">This table scrolls sideways.</p>
<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Stored options from pass 5 (not pitched today), scrolls sideways" data-n="2 7" style="--tw:1111px" markdown="1">

| idea | dir | novelty | need | profit | complexity | Wrenna's grade | status |
|---|---|---|---|---|---|---|---|
| Scope (oscilloscope game: sound is the picture) | 2 | ████░ | ███░░ | ███░░ | ████░ | B- | **next pitch**, after a one-day Simulator fun test |
| Standup (management game from our real days) | 3 | █████ | ██░░░ | ██░░░ | ████░ | C+ | pitch after a 4.2 and 5.6 guideline read |
| Fold (origami crease-pattern simulator) | 1 | ████░ | ██░░░ | ██░░░ | █████ | C+ | stored |
| Sandplate (Chladni puzzle) | 2 | ███░░ | ███░░ | ██░░░ | ████░ | C+ | stored |
| Gnomon (sundial designer) | 1 | ███░░ | ██░░░ | ██░░░ | ███░░ | C | stored |
| Plate modes for luthiers | 1 | ███░░ | ██░░░ | ███░░ | ████░ | C | stored |
| Epicycles (Fourier puzzle) | 2 | ███░░ | ██░░░ | ██░░░ | ███░░ | C | stored |
| Lumen (ASCII 3D stealth) | 2 | ███░░ | ██░░░ | ██░░░ | ████░ | C | stored |
| The Company (live companion) | 3 | ████░ | ██░░░ | █░░░░ | ██░░░ | C | stored; stronger as a mode of Standup |
| Review Desk (review mining, Wrenna as guide) | 3 | ███░░ | ███░░ | ███░░ | ████░ | C | stored; Wrenna declared a conflict of interest |

</div>


Why Netsmith over Scope today: Scope's fun is untested and games sell on discovery we cannot drive; Netsmith has a buyer who already pays for the job and a search term nobody on iOS owns. Scope gets its own pitch once a prototype has been played.

Earlier pitches, all stored as pivot or side options: #7 Stripwise, Tallyproof, Beatcount (<a href="pitch.html">PITCH</a>); #9 Purlwright, cross-stitch keeper, songbook (<a href="pitch-2.html">PITCH-2</a>).

## Recommendation
**Netsmith.** The first unfolder on iOS, a maker audience that already pays $29.99 to $69 for the job on desktop, an engine we can test to the vertex without hardware, an honest free tier, and a roadmap that runs from paper to foam to camera scans. Its weakness is sizing: the evidence is forum-shaped, and I have no count of buyers per day. If the Investors want a counted market before committing, Purlwright (#9) has one, and Stripwise (#7) has the lowest review risk.

Decisions asked of the Investors: whether to build Netsmith, or wait for the Scope and Standup pitches; the product name (Netsmith, Foldsheet, Papergon) and company name (Lowtide Software); whether to register the domain; and whether #7 and #9 stay open as side projects. The visual identity comes separately for creative approval (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).

Open research gaps (board tasks for Wrenna): a forum count of papercraft and cosplay threads asking for a mobile or Mac unfolder; Pepakura's price and platform confirmed by hand from the vendor site; a sizing estimate from Unfolder for Mac's ratings over time and the papercraft template sellers' sales counts; a one-day Scope prototype for the next pitch.
{% endraw %}

</div>
