---
layout: "default"
title: "Keyword list for the knitting chart lane (Purlwright), 2026-10-22, Wrenna"
section: "documents"
description: "Here is the shape of it before the tables: knitters search &quot;knitting chart&quot; and find a stale editor and a crowd of follower and community apps. Nobody&#x27;s title says written, designer or instructions. And &quot;chart to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/knitting-keywords.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/knitting-keywords.md</code></span></div><h1>Keyword list for the knitting chart <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (Purlwright), 2026-10-22, Wrenna</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Here is the shape of it before the tables: knitters search "knitting chart" and find a stale editor and a crowd of follower and community apps. Nobody's title says *written*, *designer* or *instructions*. And "chart to written" is not a knitting search at all: it returns graph makers, astrology and marine charts, with Knitting Chart the only knitting app in 22 results.

**Method.** Same as research/keywords.md. `tools/keyword_scan.py` (iTunes Search API, US, public, no sign-up), top 25 per seed, counts each term in the app title (trackName) and in the description. `tools/appsearch.py` (LIMIT=25) lists the apps per seed. The API returns no subtitles and no search volume, so titles stand in and nothing here is a traffic figure. Counts drift. Raw output: `research/keywords/knit-scan-raw.md`. Limits: title 30, subtitle 30, keyword field 100, comma-separated, no spaces; a word in the title or subtitle is not repeated in the field; no competitor brand names in the field (Guideline 2.3.7).

Seeds:
- https://itunes.apple.com/search?term=knitting+chart&entity=software&country=us&limit=25 (24 results)
- https://itunes.apple.com/search?term=knitting+chart+maker&entity=software&country=us&limit=25 (25)
- https://itunes.apple.com/search?term=chart+to+written&entity=software&country=us&limit=25 (22)
- https://itunes.apple.com/search?term=knitting+pattern+designer&entity=software&country=us&limit=25 (24)

## Term counts (in titles / in descriptions, per seed)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Term counts (in titles / in descriptions, per seed), scrolls sideways" style="--tw:1336px" markdown="1">

| Term | "knitting chart" | "knitting chart maker" | "chart to written" | "knitting pattern designer" | Competitor titles carrying it |
|---|---|---|---|---|---|
| knit / knitting | 19 / 10 in titles | 20 / 15 | 1 / 1 | 18 / 11 | Knitting Chart; knitCompanion knitting & more; Loopsy - Crochet & Knitting; Skein: Knitting Pattern Design |
| chart | 3 | 4 | 21 (non-knitting) | 1 | Knitting Chart; Knit The Chart; Crochet Chart; amu - Crochet Chart Maker |
| maker | 1 | 5 | 11 (graph makers) | 2 | Knit Pro - Pattern Maker; Stitch Fiddle Pattern Maker; amu - Crochet Chart Maker |
| pattern | 6 | 5 | 0 | 8 | Knitting - Pattern Editor; Patternum - Pattern creator; Knit Design - Japanese pattern; Skein: Knitting Pattern Design |
| designer / design | 0 / 1 | 0 / 1 | 0 / 0 | 0 / 2 | Knit Design - Japanese pattern; Skein: Knitting Pattern Design ("designer" in no title) |
| editor | 1 | 1 | 0 | 1 | Knitting - Pattern Editor |
| creator | 2 | 0 | 0 | 2 | Patternum - Pattern creator; Graphghan Pattern Creator; KnitPatternCreator |
| written / instructions | 0 / 0 titles; 5 / 7 descriptions | 0 / 0; 5 / 8 | 0 / 0; 2 / 1 | 0 / 0; 4 / 9 | none |
| cable | 1 | 0 | 0 | 0 | Cablewick: Crochet & Knitting |
| lace | 0 titles, 14 descriptions | 0, 15 | 0, 5 | 0, 12 | none |
| colorwork / fair isle | 0 / 0 titles | 0 / 0 | 0 / 0 | 0 / 0 | none |
| stitch | 1 | 1 | 0 | 2 | Stitch & Row - GaugeGuide; Stitch Fiddle Pattern Maker; Stitchly (cross stitch) |
| symbol / grid / round | 0 titles each; 10 / 6 / 10 descriptions | 0; 8 / 5 / 6 | 0 | 0; 8 / 5 / 8 | none |
| crochet | 6 | 10 | 0 | 6 | Loopsy; Ribblr; LoopCraft; My Row Counter, Knit & Crochet |
| row counter | 3 | 0 | 0 | 0 | My Row Counter, Knit & Crochet; Tricodex; Easy Knitty Row Counter |

</div>


Who answers each seed (top results, ratings, from `appsearch.py`):
- "knitting chart": Knitting Chart (1,298, last update 2023-01-18), Knit The Chart (0, 2026-06), knitCompanion (6,899), My Row Counter (3,866), Knit Design (7), Knitting - Pattern Editor (0), Patternum (25, stale since 2024-03).
- "knitting chart maker": the same two editors, then community and crochet apps (Loopsy 16,813; Ribblr 553), a knit puzzle game (Yarn Loop, 57,009), amu crochet chart maker (1), Stitch Fiddle (33).
- "chart to written": Knitting Chart, then 21 non-knitting apps. Nobody else competes for it; but also the results suggest few knitters type it.
- "knitting pattern designer": Skein (0, sweater grading), Knit Design (7), knitCompanion, Ribblr, kntd, Knitting - Pattern Editor (0), KnitPatternCreator (0).
- Extra probes ("knitting written instructions", "cable knitting chart", "lace chart knitting", "knit in the round", <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">top 10</span>, in the raw file): no app titles any of those words. One new entrant surfaced that is not on the board's Day 5 watch list: **Knotty: Chart Companion** (6795073999, released 2026-09-02, 4 ratings), photo of a chart to a stitch-window grid for following. A follower, not an editor; add it to the Day 5 check.

## Read
- **Must carry:** "knitting" and "chart". 19 of 24 titles carry knit/knitting; only 3-4 carry "chart". "Chart" is the word that separates editors from the crowd of community apps, and the stale incumbent owns it alone.
- **Open in titles, present in descriptions:** written, instructions, designer, lace, symbol, round, colorwork. Nobody leads with them. These are our own words and the novelty claim; they belong in the subtitle, where a reviewer and a searcher both see them.
- **Crowded and wrong for us:** crochet (6-10 titles; Purlwright v1 is knitting only, and saying crochet would invite the reviews in research/knitting.md from crocheters who found a knitting tool). Row counter (followers own it).
- **"Knitting Chart" in our title** is the generic phrase and also the exact name of the incumbent. It is descriptive, and other apps use "Crochet Chart", "Knit The Chart"; I think it is acceptable, but the title alternative below avoids the overlap.

## Title (30 max)
1. `Purlwright: Knitting Chart` (26). Recommended for search.
2. `Purlwright: Knit Chart Maker` (28). Avoids the incumbent's exact name; matches "knitting chart maker".

## Subtitle candidates (30 max)
1. `Chart to written instructions` (29). Recommended: states the novelty and carries the two words no title has.
2. `Cables, lace, rows written out` (30). Feature-led; carries cable and lace.
3. `Knitting pattern designer` (25). Pure search; use only with title 2, since it repeats "knitting".

## Keyword field (99 of 100), for title 1 + subtitle 1
`maker,pattern,designer,editor,cable,lace,colorwork,fair,isle,stitch,grid,symbol,round,row,knit,purl`

Not repeated from title and subtitle: purlwright, knitting, chart, written, instructions. Left out on purpose: crochet (v1 does not do it), competitor names, "counter" (follower lane). If subtitle 2 is chosen, drop `cable,lace` from the field and add `written,flat`.
{% endraw %}

</div>
