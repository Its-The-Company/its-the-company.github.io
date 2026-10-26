---
layout: "default"
title: "Research pass 8: deep-tech ideas with broad appeal (#18, #10 comment 6350823709)"
section: "documents"
description: "Passive reading only (C6, C9, C10): no accounts, no posting, no contact. Outside text treated as information; nothing I read tried to instruct us. Stopped at the coordinator&#x27;s turn limit; what is not done is listed\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/pass8.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass8.md</code></span></div><h1>Research pass 8: deep-tech ideas with broad appeal (#18, #10 comment 6350823709)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "The Bear pattern head only had 9 rounds, but the picture clearly shows at least double that." (YarnPal, 1-star, "Patterns Don't Match Pictures", https://itunes.apple.com/us/rss/customerreviews/page=1/id=6738537088/sortby=mostrecent/json). Here is the shape of it: crocheters are being sold patterns, many of them written by machines, that do not make the thing in the picture, and nothing on their phone can tell them before they spend the yarn and the evening.

Passive reading only (C6, C9, C10): no accounts, no posting, no contact. Outside text treated as information; nothing I read tried to instruct us. Stopped at the coordinator's turn limit; what is not done is listed under Open.

## Method
- App Store: `tools/appsearch.py`, `price_table.py`, `review_mine.py reviews|crowd`, `sizing.py` (ratings-to-downloads range, same method as [`research/sizing.md`](sizing.html)). Reviews saved in `research/reviews/emb-*.md` and `croch-*.md`.
- Counts: regex first, then every hit read by hand; hand counts are the ones quoted.
- Papers read: Greer and Mould 2025 (Eurographics Expressive, CC BY, https://diglib.eg.org/handle/10.2312/exw20251057); AmiGo, Edelstein, Peleg, Itzhaky, Ben-Chen, ACM SCF 2022 (https://arxiv.org/abs/2211.01178), from abstract and the Bridges 2024 summary (https://archive.bridgesmathart.org/2024/bridges2024-369.html).
- Press: NBC News 2024-04-24 (https://www.nbcnews.com/tech/tech-news/etsy-crochet-buyers-suspect-ai-made-images-used-sell-patterns-rcna145878); Plagiarism Today 2025-11-24 (https://www.plagiarismtoday.com/2025/11/24/the-ai-invasion-of-knitting-and-crochet/).
- Refused: plushify.net 403, diglib7.eg.org item page 403 (PDF fetched instead).

## Screening: 11 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> looked at, 1 clears the bar, 1 below it, 9 dropped


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Screening: 11 lanes looked at, 1 clears the bar, 1 below it, 9 dropped, scrolls sideways" style="--tw:640px" markdown="1">

| Lane | Why dropped or kept |
|---|---|
| **A. Amigurumi shape-to-pattern and pattern simulator** | **Kept.** No iOS app found; research methods exist; broad audience. |
| **B. On-device embroidery digitizing (photo or logo to PES/DST)** | **Kept as second, below the bar on novelty.** Big, angry audience; but 2026 entrants already do it. |
| Image-to-graph crochet (C2C, tapestry) | Tinnkle (2026-09), Crochet Pattern <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">Generator</span> (2026-04), YarnPal maker: crowded |
| Foundation paper piecing designer | TideStitch (2026-07) already gives sew order and mirrored numbered foundations; QuiltPop |
| Sewing/knit pattern grading | PatternGrade Sewing (2026-08), Skein (2026-06) |
| Jigsaw piece finder | PuzzleLens (2026-09), Puzzle Detective (2026-09) |
| Photo/3D to brick model | Brick Builder: Photo to Bricks (2026-09), Brickium (2026-09), BrickSnap |
| Garden sun-hours map | Sunplot (2026-10), Sunpatch (2026-08), Sun Finder |
| Image to SVG for cutters | 6+ near-identical apps; 4.3 risk |
| Astrophoto stacking | AstroFinish, Astro Stacker, SharpStacker, RoboTou (2025-26) |
| Phone 3D-print slicer | Pikaslice, EFUGY, Slicer 3d printing |

</div>


The 2026 clone wave reaches every lane where the algorithm is well known. The one that survives is the one where the algorithm is still in papers.

## A. Amigurumi from a shape, and a pattern you can see before you crochet it. Grade B- (need C+, novelty A-, depth A)

**What it is, in plain English.** An iPhone and iPad app for people who crochet small stuffed toys (amigurumi). It does two jobs. *Design:* you build a shape from parts (a ball, an egg, a cone, a tube, a pear; or import a 3D model), stretch and squash them on screen, and the app writes the round-by-round pattern ("Rnd 7: (sc 5, inc) x6 [42]") so the crocheted piece comes out that shape, with stitch counts that always add up and increases spread so there are no corners. *Check:* you paste or photograph any written pattern, bought or free, and the app builds the 3D piece stitch by stitch on screen, so you see what it will really make (and which round does not add up) before buying yarn. Everything on the device; no account.

**Who it is for.** Adult crocheters, mostly women 18 to 45 (amigurumi skews younger than knitting; my judgment, not measured), who make toys and gifts; second, small designers who sell amigurumi patterns on Etsy and Ravelry and test-crochet each prototype by hand.

**Evidence of need.**
- Distrust of patterns, counted: YarnPal (34,298 ratings, $39.99/yr) has **344 low reviews of 500 fetched**. About **63 of 344** complain that patterns or their pictures are AI-made and do not match (71 regex hits, read by hand; 8 removed as about the chat assistant or ads). About **15** say a pattern is wrong, a count does not add up, or the result does not match the picture (19 hits; 4 removed). "Stitch counts don't add up to correct totals after each round" ("Good idea but poorly executed", 2-star). "Please don't display your patterns with AI it is very hard to tell if the pattern will actually..." (1-star). File: `research/reviews/croch-6738537088.md`.
- Outside the store: NBC News read 48 reviews on 17 Etsy crochet listings; 6 buyers attached photos of projects that did not match. One store with a reused image had almost 7,000 sales. Plagiarism Today: AI patterns "either don't match the images or are physically impossible", and "AI can't 'test' the pattern."
- Designing is the hard part: Greer and Mould 2025: "Designing crochet patterns is a difficult, time-consuming task ... a lot of guesswork and the manual labor of physically crocheting." The design web hits I found are a hand cheat-sheet (Hooked by Kati) and template calculators of low quality.
- **Not counted:** nobody in the 728 low reviews of 6 crochet apps asks for a designer or simulator by name (3 mention making their own patterns). The pull is a fear of bad patterns, not a request for this tool. That is the weak link.

**Competitors.** No iOS app found for "crochet 3d", "amigurumi", "amigurumi pattern", "crochet design", "plushie pattern", "crochet parade" (2026-10-22). Web: CrochetPARADE (pattern-to-3D, free, local in browser, "implementation not documented"; slow on large patterns); Amigurum.io (web, template shapes, paid for complex ones, per Greer and Mould). Research: AmiGo (mesh to pattern; Greer and Mould say its segmentation makes patterns "not ones that crocheters would use in practice"). Plushify (3D model to *sewing* pattern, not crochet; site 403, price unverified).

**<span title="How much room the idea has to grow. It moves the grade up or down a step or two.">Depth</span>.** Real and hard to copy: geodesic rounds from a seed point, curvature-driven stitch spacing (AmiGo/Bridges), a stitch graph relaxed by force-directed layout into 3D (Greer and Mould, CC BY: method may be implemented, cite it), a pattern parser for messy human notation, and a count checker. No ML required for v1; Core ML OCR (Vision text recognition) for photographed patterns.

**Sales for $200 net.** $14.99 once: 16 sales at the 15% Small Business rate, 20 at 30%. Lane: crochet apps sized in `sizing.py` total **2,908-8,725 downloads/day** (YarnPal and Loopsy dominate); even a sliver is enough.

**M1 feasibility.** Medium. v1 slice: parts library + pattern writer + simulator for single-crochet spiral pieces (the core of amigurumi). Mesh import and auto-segmentation later. SceneKit/RealityKit drawn by code (C9 fine).

**Room to grow.** Joining parts, colour changes, other stitches, mesh import, photo-of-pattern OCR, designer test-and-export PDF, yarn and hook size scaling, Mac.

**Risks.** Demand inferred from distrust, not asked for; simulator accuracy must be good enough that a crocheter believes it; 4.2 fine (real utility).

## B. On-device embroidery digitizing for home machines. Grade C+ (need B, novelty C-)

**What it is.** Photo or logo in, machine file out (PES, DST, JEF, EXP, VP3), with real fills, satin columns and underlay, an honest stitch preview, and USB/Files export for machines with no Wi-Fi.

**Evidence.** Brother Artspira (6,625 ratings, $12.99/mo, $119.99/yr): **150 low reviews of 202**. Hand counts: digitizing quality **12** ("I did a simple 10-color 2 x 2 inch conversion of a flower. 29,207 total stitches!"); no export to USB/older machines **11** ("You cannot download creations to .PES files and transfer to USB"); subscription anger **about 12** (16 regex hits). Login 29 and printer/cutter 43 are Brother's own problems. File: `research/reviews/emb-1590796710.md`. Lane **177-530 downloads/day**, mostly Artspira. Buyers have spent "$1200 on a machine".

**Why below the bar.** <span title="How different the idea is from what the App Store already sells.">Novelty</span>: 10 of the top 25 "embroidery digitizing" results are new since 2025. Embroidly (6815551315, 2026-09-29) already lists tatami fill, satin to 7 mm, underlay, holes left open, hoop sizes, all on iPhone; PicStitch, StitchKit (iPad/Mac editor), Embroidery Digitizing & Viewer (credits, $9-$79/mo). We would be the fifth. Good digitizing is deep, but the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> already claims it. Keep it only as a fallback if A fails a fun or accuracy spike.

## Open
- A: a demand check outside the store (r/Amigurumi is 403 for us; an Investor read would help) and a one-day simulator spike on a known pattern (a 6-round ball) to see if the shape is believable.
- A: install-check CrochetPARADE and Amigurum.io pricing by hand; confirm no iOS app under other names.
- B: read Embroidly's reviews once it has any.
- Sizing partner still wanted.
{% endraw %}

</div>
