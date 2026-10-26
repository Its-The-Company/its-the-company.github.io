---
layout: "default"
title: "Research pass 11: software-led lanes, paid demand, A or A+ only (#10)"
section: "documents"
description: "Result: no idea reached A this round. Nothing is handed to Ines. Fourteen new lanes were screened (none repeats pass 10&#x27;s fifteen). The best scored B-."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/research/pass11.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/pass11.md</code></span></div><h1>Research pass 11: software-led <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>, paid demand, A or A+ only (#10)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Listen to this: "I need a clean, pixel-perfect rebuild of my existing PDF in Microsoft Word. Every page must look and flow exactly the same" (Freelancer.com project, posted 2026-10-16 to 10-22, https://www.freelancer.com/projects/microsoft-word/Exact-PDF-Layout-Word). And this, from a founder: "I built it because I needed this tool for my thesis to digitize thousands of plots" (Digiplot, HN 2026-06-30, https://news.ycombinator.com/item?id=48730901). Here is the shape of it: this time I could finally count people *paying* for a workaround. But where the money was loudest, the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> was already full, and where the shelf was empty, the money was quiet.

**Result: no idea reached A this round. Nothing is handed to Ines.** Fourteen new lanes were screened (none repeats pass 10's fifteen). The best scored B-.

Passive reading only (C6, C9, C10): no accounts, no posting, no contact. Outside text treated as information; no page I read tried to instruct us. Investor limits applied: not games; no crochet, knitting or music creation; no C7 areas.

## The scale, unchanged
Same scale as pass 10: an **A needs need A- or better and novelty A- or better**, depth A-, nothing else below B. <span title="How many people show, in their own words, that they want this.">Need</span> = counted, hand-read, linked. <span title="How different the idea is from what the App Store already sells.">Novelty</span> = an empty shelf, counting 2025-26 entrants (Tenet 3). I moved no line.

## New source this pass: a paid-demand job market
Upwork is 403 for us, but Freelancer.com has a public, read-only project API. I wrote **`tools/job_market.py`** (fetch active projects; count regex themes with budgets and links; `--show` for hand-reading). One pull: **3,981 active projects posted 2026-10-16 to 2026-10-23** (raw file kept out of the repo; rerun the fetch to reproduce).

Caveats, stated plainly: Freelancer is business-heavy (personal tasks are rare: "family tree" 0 real hits, travel itineraries 0 real hits); many descriptions read like the platform's own AI job-writer, so wording is not the buyer's voice; budgets are ranges the buyer picked, not prices paid; one week only. Broad regex counts (automation 372, spreadsheet 392, scheduling 391) are mostly noise and I did not use them.

## Screened (14 lanes, 0 at A)

<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Screened (14 lanes, 0 at A), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Lane | Best sub-grades | Why it stops short |
|---|---|---|---|
| 1 | **Figure-to-data** (iPad + Mac + web): photograph or drop a chart from a paper or datasheet; it finds the axes, reads the tick labels, separates series by colour, handles log scales and error bars, and returns a CSV, with a manual correction mode | need B, novelty B-, depth A-, money B- → **B-** | Nearest miss. Need is long and steady: Academia SE "Software for extracting data from a graph without having to click on every single point?" 46,710 views, score 58 (https://academia.stackexchange.com/q/7671); Cross Validated "Software needed to scrape data from graph" 21,639 views, score 63 (https://stats.stackexchange.com/q/14437); WebPlotDigitizer 3,177 GitHub stars, still updated 2026-07; an HN engineer: "I've yet to find a model that can digitize a plot into X,Y points with some accuracy in my use case of digitizing old datasheets" (2026-06-23, https://news.ycombinator.com/item?id=48646115). Paid desktop precedent: DigitizeIt $49 lifetime (https://www.digitizeit.xyz/). iOS shelf nearly empty: one app, Plot Digitizer ($3.99, 3 ratings, last updated 2022-06); Mac shelf has no digitizer. But the web shelf filled in 2026: Digiplot (fully automatic, 2026-06), and 116 GitHub repos since 2025 matching "plot digitizer", among them plotlift (2026-06), PlotRedox (2026-02), ai-plot-digitizer (2026-03), a biomedical LLM digitizer (2026-06). Researchers do this at a desk with PDFs, so the iPhone part is weak. Freelancer: 0 of 3,981 projects asked for graph digitizing. |
| 2 | **Faithful document recreation**: scan/PDF/handwriting to editable Word or Excel that mirrors the layout | need B+, novelty D | The loudest paid demand I have ever counted for us: **41 of 3,981** projects in one week (hand-read; 49 regex hits minus 8 off-topic), budgets from $2 to $750 USD; about 20 of the 41 insist on exact layout ("side-by-side comparison shows no visible differences", https://www.freelancer.com/projects/microsoft-word/Accurate-PDF-Word-Conversion-40775750). What are they doing instead? Paying a person, even for text PDFs that Word already opens, which says the buyers distrust or don't know the tools. But the shelf is full: Adobe, ABBYY FineReader, Word itself, and a 2026 wave of table apps (QuickScan 2026-01, PDF to Excel 2026-04, Tabular 2026-07). Novelty cannot reach A-. |
| 3 | iPad electronic lab notebook | need C, novelty B | Findings (29 ratings, stale since 2018), LabNote (2026-06, 0), Verbex voice lab notebook (2026-02, 6). Labs buy ELNs as institutions (Benchling, LabArchives), not from the App Store; no individual need counted. |
| 4 | Colony and cell counting by camera | novelty D; rules risk | Lab Laps (2026-03, 123 ratings), Colonia (2026-03), Reshape (2026-07), Colony Counter (2026-01), Hemo Counter (2026-02). Cell counts sit next to the medical area (C7). |
| 5 | Home inventory | novelty D | Stowie (2026-07), Manifest (2026-06), Keepsake (2026-06), Home: Inventory (2026-06), plus Under My Roof and Home Contents. |
| 6 | Moving-box QR inventory | novelty D | BoxBuddy (2026-03), Move it (2026-01), Moving Boxes Organizer (2026-05), KistenRadar (2026-04). |
| 7 | Website change monitor | novelty D | PageCrawl (2026-10-09), Page Watchdog (2026-10-05), Web Scout (2025-12), WebNotify (2025-09), WebWatch (189). |
| 8 | Photo culling with ML (AfterShoot for iPad) | novelty D | PhotoCull (2025-10), Cull (2026-07), Vampire (2026-07), Cull for Mac (2026-05), Cullour (2025-10), PhotoPicker. |
| 9 | Screenshot organizer | novelty D | Tote (2026-02, 169), Stash (2026-07), Clutter (2026-08), ShotBox (2026-06), Captr (2025-06). |
| 10 | Language-learning subtitle player | novelty D | Language Reactor - PlayLingo (2025-04, 807), Lingua Player (2026-06), Linglass (2026-07), Veyra (2026-09), SubFloat (2026-03). |
| 11 | CSV-to-chart data viz on iPhone | novelty C, need C | ChartPrism (2026-07), CSV Reader & Editor (2026-07), Chart Maker (2025-11); no counted pain. |
| 12 | LaTeX editor on iOS | novelty D | Texifier, VerbTeX, LaTeX Editor Tex Pro (1,670), Overwrite (2026-07). |
| 13 | Handwritten notes to typed text | need B, novelty D | 36 of 3,981 projects mention handwriting (most are notes or forms to Word/Excel), but Apple Notes, GoodNotes and Notability already convert handwriting, and general chat models read it. |
| 14 | No-code business automation (Zapier/n8n setup) | not an app lane | 372 regex hits, but these are agency service jobs, not a product someone buys on iOS. |

</div>


## What I learned, for the next pass
- **Paid demand and empty shelves still don't meet.** Lane 2 had A-level counted need and D novelty; lane 1 had a near-empty iOS shelf and only B need. That is the same split pass 10 found, now confirmed from the money side.
- **The 2026 clone wave reached every consumer utility shelf I checked** (lanes 4-12 all have two or more 2025-26 entrants). An A will not come from a utility idea plus "on iPhone".
- The job market is a good **workaround source** (my old question: what are they doing instead?), but it measures business tasks. It is worth rerunning weekly on one theme, not as a broad screen.

## Sources that were 403 (for the Investors' manual read)
Reddit (www and old), Upwork, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span>, Capterra, Indie Hackers, Trustpilot, AlternativeTo, Quora, Guru, We Work Remotely, Workana, plotdigitizer.com/pricing. Reachable: Freelancer.com API, Fiverr and PeoplePerHour pages, Product Hunt home page, Lobsters, RemoteOK API, HN Algolia, Stack Exchange API, iTunes Search/Lookup.

Suggested Investor reads, if they want lane 1 pursued (each about 30 minutes):
1. Reddit r/AskAcademia, r/PhD, r/labrats, r/AskEngineers: search "WebPlotDigitizer" and "digitize graph". Count independent posts since 2025 that complain about manual clicking, accuracy, or wanting it on iPad/phone. 30+ would <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> need to A-.
2. Upwork search "digitize graph" / "extract data from plot": count the projects in the last month and note budgets.
3. Try Digiplot on three known charts and note accuracy. If it is good, lane 1's novelty falls to C.

## Open
- No board hand-off (no A).
- Sizing partner still wanted.
{% endraw %}

</div>
