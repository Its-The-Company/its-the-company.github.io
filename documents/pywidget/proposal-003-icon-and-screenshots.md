---
layout: "default"
title: "PROPOSAL-003: App icon and App Store screenshots"
section: "documents"
description: "All drawn by code; none comes from an image model (Commandment 9)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/proposal-003-icon-and-screenshots.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Proposal</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/proposals/PROPOSAL-003-icon-and-screenshots.md</code></span></div><h1>PROPOSAL-003: App icon and App Store screenshots</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **proposed. Creative approval by the Investors (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>).** Nothing here is approved or shipped. Asked in ops/questions.md, "For the next report: Creative approvals", item 11.
- Author: Maren (product and visual designer), 2026-10-26, 00:12 to 00:28 ET by `date`. Board line T-0099.
- Inside: the approved two appearances (creative/approved.md item 2, #60): light = A Paper, dark = B Studio. Every light picture here is A Paper; every dark one is B Studio. The icon and the screenshots are the parts item 2 sent back for their own approval.
- Inputs: release/store-page-draft.md (sections 3, 6, 7, 8), release/app-review-matrix.md (rows 31, 33, 34, 39, 44; section 1b, Apple's text), design/icon/README.md (v0 directions), design/ide/spec.md, design/widgets (premade trees), the 5 free / 7 Pro <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling (b8b4f0e4).
- Tags: [doc] a company file says it; [recall] my memory, unverified; [measured] a script printed it.

## Previews (design-previews branch, commit 5e73e4c8)

All drawn by code; none comes from an image model (Commandment 9).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Previews (design-previews branch, commit 5e73e4c8), scrolls sideways" style="--tw:407px" markdown="1">

| Picture | Link |
|---|---|
| Icon sheet: 3 directions x light, dark, tinted, on light and dark Home Screen fields, at 180 and 60 px | (private) |
| Icon masters, 1024 px, 9 files | (private) |
| Screenshot contact sheet: search-result view, both layouts, iPhone and iPad | (private) |
| Screenshots at upload size, layout Open (recommended): 7 iPhone, 2 iPad | (private) |

</div>


Source on main: pywidget/docs/design/icon/draw_icons.py (SVG masters, 60 px PNGs, qa.json) and pywidget/docs/design/store/draw_store.py (qa.json). To redraw: `python3 pywidget/docs/design/icon/draw_icons.py OUTDIR` then `python3 pywidget/docs/design/store/draw_store.py OUTDIR`.

## Part 1. The icon

Three directions from v0, redrawn in the approved pair. No letters, so any name fits under any of them.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Part 1. The icon, scrolls sideways" style="--tw:1006px" markdown="1">

| | Light (A Paper) | Dark (B Studio) | Tinted |
|---|---|---|---|
| **1 Indent** (recommended) | Ink bars on paper, ink-blue toggle | Pale bars on night, violet-to-coral toggle | Grey bars, toggle brightest |
| **2 Prompt** | Ink `>>>` on paper, ink-blue block cursor | Violet-to-coral `>>>` on night, pale cursor | Grey |
| **3 Trace** | Ink-blue 3:2 curve on paper, ink dot | Violet-to-coral curve on night, pale dot | Grey |

</div>


What each says. Indent: four lines of Python read as shapes (a line ending in a colon, an indent, a line that is a switch, a dedent); it is the only one that says both halves of the product, Python and a control on your Home Screen. Prompt: Python's interactive prompt; clearest at 60 px, but it says only "Python" and sits closest to generic terminal icons. Trace: a curve drawn by a formula; the prettiest, and it says the least.

Checks [measured, icon/qa.json, 9 renders, 0 faults]:
- Mark inside the safe area (96 px inside the 1024 mask): all 9.
- Smallest feature at 60 px: 3.4 px (Indent), 3.98 px (Prompt), 3.52 px (Trace); floor 2 px.
- Contrast, mark on background, floor 3:1: lowest 6.77 in light (all three), 5.68 in dark (Prompt chevron on the raised night), 7.84 tinted.
- 1024 px files are 1024 x 1024, PNG colour type 2 (RGB, no alpha channel), as the App Store icon needs [recall]. Sizes 18.6 KB to 134 KB.

Changed from v0: Prompt and Trace were drawn light on the Studio gradient. Under #60 the gradient belongs to dark only, so their light versions are now paper and ink. Indent dark moved from A's dark panel (not shipped) to B Studio with the gradient toggle.

**Recommendation: Indent**, Prompt as the fallback. In the light sheet it is the strongest silhouette after Prompt and the only one that reads as "code you can switch on". On a white App Store page the paper icon has a soft edge; at 60 px the stepped bars still read.

Not done, and owed before the icon ships:
1. <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">Shelf</span> comparison by a person: put the three beside the rivals' icons (the 18 apps in research L7). Our scripts may not fetch App Store artwork (#53). Same open item as v0.
2. iOS 26 layered icon (Icon Composer: separate layers so the system can draw its glass, clear and tinted versions) [recall]. Each direction splits cleanly into two layers (Indent: bars and toggle). Drawn after the pick.
3. Asset catalog and a Simulator check of the Home Screen in light, dark and tinted (Idris, after the pick).

## Part 2. The screenshot set

### 2.1 Sizes [recall; a person confirms in App Store Connect at upload]


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.1 Sizes [recall; a person confirms in App Store Connect at upload], scrolls sideways" style="--tw:1103px" markdown="1">

| Device set | Size (px) | <span title="How many people show, in their own words, that they want this.">Need</span> | Ours |
|---|---|---|---|
| iPhone 6.9-inch | 1320 x 2868 portrait (1290 x 2796 also taken) | Required for an iPhone app; Apple scales it down for smaller iPhones | 7 drawn (6 plus 1 optional) |
| iPad 13-inch | 2064 x 2752 portrait or 2752 x 2064 landscape | Required because v1 is universal (iPad) | 2 drawn, landscape |
| Per set | 1 to 10 screenshots, PNG or JPEG, no transparency | | Every file checked: exact size, RGB, no alpha [measured] |
| App preview video | optional, up to 3 | | None in v1 (a screen recording later, if wanted) |

</div>


Apple shows the first three iPhone screenshots in search results, three across at roughly 112 pt each [recall]. The contact sheet's top panel shows ours at that size.

### 2.2 What the shots must show and may not claim

From the store page draft and the review matrix [doc]:
- **Real app in use** (matrix row 33, 2.3). The pictures here are placeholders drawn from the IDE spec. The shipped set takes each screen from the Simulator and composes it in the same layout: `draw_store.py OUTDIR --capture DIR`, one PNG per shot id. The script refuses a capture with the wrong shape. Until the app runs, every preview carries a "PROPOSAL · placeholder UI" line that the capture run removes.
- **No price** in any screenshot (2.3.7), and no "free". Checked by script against each caption, together with rival names (matrix row 34), other platforms (2.3.10) and features not in v1: 0 matches [measured].
- **Pro** (2.3.2, row 44): a shot that shows a Pro premade must mark it "Pro". Every widget in this set is one of the five free premades (countdown, sunrise and sunset, steps, distance, altitude), so no shot needs the mark. The script fails if a Pro premade appears unmarked.
- **Only v1**: no interactive widgets, no Builder, no marketplace, no share extension, no weather widget (row 31: weather is a recipe), no plots unless gate <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span> (numpy and matplotlib) passes. The console shots show a table, not a plot, for that reason.
- **Gated shots**: any shot with widgets rests on G5 (Day 14 widget cut line); if widgets are cut, shots 2, 3 and 7 and iPad 1 come out and the set is 4 iPhone and 1 iPad.
- **Numbers are computed** from the data each screen draws: the widget times match the status-bar time, the console totals come from the sample rides, and the widget-code shot runs its own code through the widget serializer and draws the tree it returns, so the code on screen and the widget on screen cannot disagree.

### 2.3 The set (captions are drafts; Ines reviews the selling job)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2.3 The set (captions are drafts; Ines reviews the selling job), scrolls sideways" style="--tw:1259px" markdown="1">

| # | Screen | Appearance | Caption (two lines) | Gate | Store claim it shows |
|---|---|---|---|---|---|
| 1 | Editor with the sample script, after a run | light | Python® 3.15, / on your iPhone | V (ships 3.15) | CURRENT PYTHON; A REAL EDITOR |
| 2 | Home Screen with 5 free premades | dark | Your Python, / on your Home Screen | G5 | WIDGETS FROM YOUR CODE |
| 3 | A widget's source above its preview | light | Every widget is / Python you can edit | G5 | "each one Python you can open and change" |
| 4 | Console: run output and a table | dark | Run it, and see / what it made | none | RUN IT AND SEE IT |
| 5 | Traceback, your frames first | light | Errors that take / you to the line | none | "a traceback takes you to the failing line" |
| 6 | Native form from a script | dark | Native forms from / a few lines of code | none | "Native iOS screens from a few lines of Python" |
| 7 (optional) | Lock Screen with free premades | dark | And on your / Lock Screen | G5 | Lock Screen families |
| iPad 1 | Editor and widget preview, split | light | Write a widget and / watch it change | G5 | WIDGETS; iPad split |
| iPad 2 | Editor and console side by side | dark | Editor and console, / side by side | none | "On iPad: a sidebar, a split editor" |

</div>


Order: the first three answer "what is it" (Python, on the iPhone, and it makes widgets) before a buyer scrolls. Light and dark alternate so both approved appearances show in the first three. Caption face follows the appearance: New York in light, SF Pro Rounded in dark, at one size per set (118 px on iPhone, about 10 pt at search size; 104 px on iPad).

Caption contrast [measured, store/qa.json]: light 15.8 and 6.77 (accent line); dark 12.33 to 17.17 (first line) and 5.1 to 9.44 (gradient line, checked at both ends against the field and its glows). Floor 4.5. Screens inside: draw_ide's checks per text node, 0 clipped, 0 overlaps, 0 contrast fails in 9 shots x 2 layouts.

### 2.4 Two layouts

- **Option 1, Open (recommended).** The app screen as a rounded card on the appearance's own field; no device drawn. The screen is larger (2.64x on iPhone) so it reads at search size, and we draw no Apple hardware.
- **Option 2, Framed.** The same screen inside a drawn device outline with the Dynamic Island. More familiar, 5% smaller screen (2.51x), and it puts a drawing of Apple's hardware in our marketing, which is one more thing to check.

**Recommendation: Option 1, Open**, with the set and captions in 2.3, 6 iPhone shots plus shot 7 if there is room after G5, and 2 iPad shots.

### 2.5 Questions for a person (not decided here)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 2.5 Questions for a person (not decided here), scrolls sideways" data-n="1" style="--tw:680px" markdown="1">

| # | Question | Default until answered |
|---|---|---|
| S1 | Caption font licence. The previews set captions in New York and SF Pro Rounded, read from macOS under its licence, for proposals only (log/assets.md). Whether a shipped marketing image may carry text set in Apple's system fonts is a licence read. | Previews only. If the read says no, captions move to an openly licensed face (STIX Two Text is installed and SIL OFL; Inter or Source Serif 4 are OFL candidates), logged in log/assets.md first |
| S2 | "Python®" in caption 1: the same nominative-use question as store-page F1 | Kept with ®, as on the store page. If F1 says no, caption 1 becomes "Write and run code / on your iPhone" |
| S3 | Shot 6's sample form has an "Amount 84.50" bill field. It is not a price of the app, but 2.3.7 bars prices in screenshots | Kept; the swap is the long-list picker (IDE spec screen 5) |

</div>


## Found on the way (fixes owed outside this proposal)

1. The IDE spec's iPad widget preview has a "Send to Home Screen" link. An app cannot place a widget on the Home Screen. The screenshot leaves it out; the spec and draw_ide.py need the same fix (mine, next pass).
2. The IDE spec's project list shows "Weather card" and "Clean clipboard · Share sheet action". The first suggests a weather widget (row 31), the second a share extension (1.1 by ADR-001). No screenshot uses that screen; the spec rows need new sample names (mine, next pass).
3. A small widget with eyebrow, headline, a 46 pt number and a label overflows 158 pt. The QA caught it in shot 3; the snippet drops the eyebrow.

## What the Investors are asked

One reply covers both parts: the icon (Indent, Prompt or Trace) and the screenshot layout (Open or Framed), with the set and caption drafts in 2.3. Default until you choose: nothing ships. The build uses a plain placeholder icon in the Simulator and no screenshots are made. Needed before App Store Connect upload, after the membership is active (Day 7) and before submission.
{% endraw %}

</div>
