---
layout: "default"
title: "The Restructuring, phase 4: mock-ups, round 1"
section: "documents"
description: "Three style directions for the app, each drawn by code across the same five screens, in light and dark, on iPhone and iPad. Every one is a proposal; nothing is adopted until the Investors approve."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/04-mockups/' | relative_url }}">← Mock-ups</a><a href="{{ '/documents/restructuring/04-mockups/04-mockups-index.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Proposal, not approved</span><span>Day 23 · Fri Nov 13, 8:07 AM ET</span><span><code>documents/restructuring/04-mockups/index.md</code></span></div><h1>The Restructuring, phase 4: mock-ups, round 1</h1><p class="meta doc-notice"><b>Proposal, not approved: the mock-ups are options for the Investors to review. Nothing here is adopted until the Investors approve it.</b></p><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Proposal, not approved.** Nothing here changes the app or `creative/approved.md`. Round 2 waits for the Investors' pick.

## What to look at

Each direction draws the same five screens with the same sample project, a weather widget, so they can be compared screen by screen:

1. **Projects**, the home screen: what a person sees first and how they start.
2. **The editor**: writing Python with the result in view.
3. **The Builder**: the same widget made with blocks, and how blocks and Python sit together.
4. **The Gallery**, where a marketplace would live: finished things, starters and parts.
5. **The preview**: the widget itself, each size, light and dark.

Each screen is shown on iPhone at 390 wide and on iPad, in light and in dark. All three directions stand on `03-structure.md`; its nine questions have no Investor answer yet, so the drawings work from its recommendations. Project, Page, Builder and Gallery are placeholder names.

How they differ: A keeps the approved look and moves the furniture. B is a programmer-first workbench, denser, with split panes. C is creative-first, roomier, built from tiles and cards. A stays inside the approved Paper and Studio. B and C each depart from it, so picking either also means approving a new look.

**One limit on every "read by eye" below.** The frames of all three directions were read in Chromium 148. A script check on 11-13 shows that this browser does not load New York, SF Pro Rounded or the system monospace from the pages' font lists: it drew serif titles and numbers in Georgia, rounded ones in plain SF Pro, and code in Menlo. The system's WebKit, which Safari uses, loads the intended faces. To judge the type, open the pages in Safari on a Mac, iPhone or iPad. C has since been re-read in WebKit; its section says how far. A and B have not.

## Direction A: evolve what is approved

Model: claude-fable-5-2. Hand-written HTML and SVG: no images, no script, no outside assets, system fonts only. Four files, 22 frames, 115,729 B (30,647 B gzipped).

**What it is.** Paper in light and Studio in dark, unchanged, with the four approved tabs. Lists stay lists. Only the arrangement moves, so that a person who installs, a person who builds with blocks and a person who writes Python each find their thing without a mode or a tab of their own.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Direction A: evolve what is approved, scrolls sideways" style="--tw:697px" markdown="1">

| Screen | File | What to look at |
| --- | --- | --- |
| Projects | [a/1-projects.html](a/1-projects.html) | Each row's picture is the thing the project makes, drawn live. The line under the name says how it was made. New opens three ways to start. On iPad the list sits beside the project page, with "Used by" on every code row. |
| The editor | [a/2-editor-builder.html](a/2-editor-builder.html), first half | The Blocks and Code switch. The line above the file naming the outputs that use it. The preview resting at the bottom on iPhone, a column on iPad. |
| The Builder | [a/2-editor-builder.html](a/2-editor-builder.html), second half | Blocks are rows in the approved grouped list. The chosen block opens in place and shows its Python, read only. On iPad the Python sits beside the blocks and the chosen block's four lines are lit. |
| The Gallery | [a/3-gallery.html](a/3-gallery.html) | Three <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelves</span> in one list: Get a widget, Make a starter mine, Add a part. Each row says what the item touches. No price, rating or account. On iPad, one item's page with its code shown before install. |
| The preview | [a/4-preview.html](a/4-preview.html) | The switch offers exactly the project's outputs. Widgets at real size. One button, Add to Home Screen. On iPad both sizes in both appearances at once. |

</div>


**The 03 answers it assumes.** Question 4: four tabs, three ways to start under New. Question 6: generated Python on view and read only, "Edit as code" to detach, hand-written code as one block. Question 7: a Gallery item offers its parts. Question 3: a newer version is offered, never silent. Questions 1 and 2: files listed by path; parts are sources and views. Question 8: no picture from an item's author; the Gallery pictures are the app's own live drawing. Working assumptions: the Builder is in 1.0 on the widget; no prices, accounts or ratings; Pages come in 1.1, so the Forecast page is only a row marked "planned for 1.1". Questions 5 and 9 are not drawn.

**Where it departs from Paper and Studio.** In colour and type, nowhere: every solid colour is a value in `pywidget/docs/design/tokens.css`, checked by script. In arrangement, against the ten approved drawings:

- Projects: a live picture replaces the glyph tile, the chips move up to the name line, and the filter order changes.
- The editor: the Blocks and Code switch takes the title's place; the "Used by" line and the resting preview are new.
- iPad: the left column lists Outputs, Code, Touches and Runs in place of the file tree; the preview column gains two switches and loses the second check card.
- The Builder, the Gallery shelves, the item page and the project page have no approved drawing. They are new screens made from approved parts.
- One new part: a quiet pill (`accent.soft` fill, `accent` text) for Get, Add and Make it mine.
- Not from a token: the soft shadow (near `e2`, not exact) and the widget's number at 46 px, read off the approved drawing.

**Measured, and not.** Contrast by script: 62 colour pairs, 31 in each appearance. One failed 4.5:1, the line numbers on lit lines in Studio at 4.19:1; they now take the approved current-line-number colour, 12.01:1. Rendered in Chromium 148 only: 22 of 22 frames read by eye, no console errors, no sideways scroll at 390. Not opened in Safari or Firefox. Text fit was judged on the renders, not by script. Nothing ran on a device.

**Open.**

- No Gallery row carries a price or a Pro mark. The approved Pro purchase holds 7 of the premades (#87); phase 2's question 8 recommends that installing stays free. I could not tell from the two how a Pro premade should look on a shelf, so I drew neither. That is an Investor decision, not a layout choice.
- The sample Python and its module names are placeholders, not the app's API. Idris should read both samples before round 2.
- The phase 4 brief asks for one file per screen. This round is <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at four files a direction, so the editor and the Builder share one.
- Not drawn: the first-run question, a Page, the Add to Home Screen steps, the outside-code notice, Docs, Settings, the Increase Contrast sets, larger text sizes.

## Direction B: a programmer-first workbench

Model: claude-fable-5-2. Hand-written HTML and SVG: no images, no script, no outside assets, system fonts only. Four files, 20 frames (ten drawings, each shown in light and in dark), 112,791 B (32,135 B gzipped).

**What it is.** A denser app that puts the code and the facts about the code first. Names are written the way the files name them, in the system monospace. Lists become two-line rows and tables with hairlines, not cards. On iPad the screen is split into panes that stay side by side. The person's widget is the one warm thing on every screen: it is drawn exactly as approved, so the tool goes quiet and the product does not. A person who only installs widgets still sees pictures of widgets and one-tap ways to start.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Direction B: a programmer-first workbench, scrolls sideways" style="--tw:697px" markdown="1">

| Screen | File | What to look at |
| --- | --- | --- |
| Projects | [b/1-projects.html](b/1-projects.html) | 11 projects in view at 390 wide, two lines each, each with a small live picture of what it makes. The three ways to start are one row of three buttons, not a menu. A failed run names its line. On iPad, three panes: the list, the project page as four tables (Outputs, Code, Touches, From) with "used by" on every code row and the offered update, and the widget with the data the code returned and the time it took. |
| The editor | [b/2-editor-builder.html](b/2-editor-builder.html), first half | 24 lines of code at 13 pt, the console and the resting preview on one iPhone screen. The line under the title naming the outputs that use the file. A warning drawn as a squiggle and words. On iPad, five panes that stay put (tree, code, console, preview, data and last runs) and a bottom line with the keyboard shortcuts. |
| The Builder | [b/2-editor-builder.html](b/2-editor-builder.html), second half | Blocks as an outline, indented the way the Python is, each row saying which lines it writes. On iPhone the chosen block's two lines of Python sit under the list, read only. On iPad the whole generated file sits beside the outline with those lines lit, and the block is outlined on the widget. "Edit as code" is one button. Hand-written Python is one block. The catalog describes each block in plain words. |
| The Gallery | [b/3-gallery.html](b/3-gallery.html) | Ten items in three shelves named for the act: get a widget, make a starter mine, add a part. Sizes, version and what the item touches on every row. On iPad the item reads like a package page: both sizes, what it touches, a short table of facts, its whole Python before install, and its two parts, each with "Add to project". No price, rating or account. |
| The preview | [b/4-preview.html](b/4-preview.html) | The widget at real size in both approved appearances at once, unchanged by B. The data and the timing under it. One filled button, Add to Home Screen. On iPad a grid of four drawings, two sizes by two appearances, and four counted checks. |

</div>


**Where it departs from Paper and Studio.** B is not inside `creative/approved.md` item 2.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Direction B: a programmer-first workbench, scrolls sideways" style="--tw:1044px" markdown="1">

| | Approved | B changes | B keeps |
| --- | --- | --- | --- |
| Palette | Warm paper grounds (#F7F5F0). Navy grounds (#0A0C13), glass panels, a violet-to-coral gradient button. | Neutral grey grounds (#F3F4F6 light, #0D0E10 dark), flat panes, a solid button in both, no glass and no gradient in the app's own chrome. | The accent (#2350B0, #A08BFF), the status colours, the Quill and Lumen code colours, the widget card. |
| Type | New York titles in light, SF Pro Rounded in dark, SF Pro rows, 34 pt screen titles. | The system monospace for titles, names, numbers and state; 20 pt screen titles; SF Pro only for prose. | The display faces on the widget itself, the 11 pt floor, Dynamic Type, no bundled font. |
| Density | One thing per 44 pt row or card, 17 pt row titles, 16 pt margins. | Two lines in each 44 pt row, 12 pt margins, tables in place of cards, editor code at 13 pt by default (design system v0 says 15). | 44 pt touch targets, the four tabs, the system's bars and sheets, state as a shape and a word. |

</div>


In arrangement B also goes past the ten approved drawings: the approved iPad screen has three columns, B has three to five panes and a status line at the bottom; lists lose their cards; the Builder, the Gallery shelves, the item page and the project page have no approved drawing at all.

**The 03 answers it assumes.** Question 4: four tabs, three ways to start on Projects (drawn as three buttons, one tap fewer than a New menu). Question 6: the generated Python always on view and read only, "Edit as code" to detach, hand-written code as one custom block. Question 7: an item offers its parts, on a Parts shelf and on the item's page. Question 3: a newer version is offered, never silent, and a changed file is kept. Questions 1 and 2: the manifest is named, files are listed by path, a one-file project sits in the list beside the tidy ones, and parts are sources and views. Question 8: no picture from an item's author; every picture is the app's own live drawing. Question 5: the first-run answer could also set Projects to rows or to pictures; that is B's own addition and is not drawn. Working assumptions: the Builder is in 1.0 on the widget; Pages come in 1.1, so the forecast page is listed dimmed and marked "in 1.1"; every Gallery item is ours and ships in the app; no prices, accounts or ratings.

**Measured, and not.** Contrast by a scratch script: 163 pairs (B's text and state colours on each of its grounds, the code colours on the editor, current-line and selection grounds, both appearances). One sat on the line, the dark tertiary grey on `accent.soft` at 4.50:1; it moved from #8A909B to #9097A2 and its worst pair is now 4.9:1. 0 under 4.5:1. The widget card's colours are the approved values and were not rechecked. Rendered in Chromium 148 only: 20 frames, no console errors, no sideways scroll at 390 on any of the four pages. I read 17 of the 20 frames by eye, every drawing in at least one appearance. Text fit was judged on the renders, not by script. Not opened in Safari or Firefox, where the system monospace may be a different, wider face. Nothing ran on a device.

**Open.**

- The contrast script is in a scratch folder, not in the repo. If B is picked, it goes into `pywidget/docs/design/` with B's colours as tokens before round 2.
- B asks the app for facts it may not keep today: the data a run returned, the time of each step, the last five runs, the lines each block writes, and the four counted checks under the preview. The numbers drawn are sample content. Idris and Pernille should say which exist and what the others cost.
- Body prose is 12 to 15 pt here and Apple's default body is 17. Larger text sizes and the Increase Contrast sets are not drawn; two lines in a 44 pt row will not hold at the largest sizes, so rows must stack there.
- 13 pt code is B's default, against 15 in design system v0. A person's own setting still wins.
- Not drawn, as in A: a Pro mark or a price on a Gallery row (an Investor decision), the first-run question, a Page, the Add to Home Screen steps, the outside-code notice, Docs, Settings, Tinted and Clear widgets.
- The sample Python and its module names are placeholders, not the app's API. The block names in the catalog are placeholders too.
- B is dense on purpose. The risk is the one I am known for: correct and a little cold. The pictures, the plain-word hints in the catalog and the one filled button per screen are there for the person who only wants a widget; whether that is enough is for Ines and the Investors to judge against C.

## Direction C: creative-first, tiles and cards

Model: claude-fable-5-2. Hand-written HTML and SVG: no images, no script, no outside assets, system fonts only. Four files, 22 frames (eleven drawings, each shown in light and in dark), 131,167 B (36,343 B gzipped).

**What it is.** A roomier app that opens on making and on finished things. The person's projects are large tinted tiles, each holding a live picture of the thing the project makes. The Builder comes before the editor, the widget stays on the screen at every step, and a run is told in plain words. The programmer is one tap from the code everywhere: "Write Python" on the first screen, and one round code button on every project tile, on the chosen block, on every widget in the Gallery and on the preview.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Direction C: creative-first, tiles and cards, scrolls sideways" style="--tw:697px" markdown="1">

| Screen | File | What to look at |
| --- | --- | --- |
| Projects | [c/1-projects.html](c/1-projects.html) | The first third of the screen is for starting: a large "Make a widget" card that opens the Builder, with "Ready-made" and "Write Python" as tiles under it. Then the person's things as tinted tiles, each with a live picture at 77% of real size. On iPad a tile is as wide as what it makes. The cost: 4 projects on the first iPhone screen, where A shows 7 rows and B shows 11. |
| The editor | [c/2-builder-editor.html](c/2-builder-editor.html), second half | The approved editor, Quill and Lumen at 15 px, on a rounded card. Files are pills, and the line under them names the outputs that use the open file. The widget floats over the code as a live picture, 98 by 98 px. 11 lines of code are drawn, where B shows 24. On iPad the columns are the Builder's, so the Blocks and Code switch moves nothing. |
| The Builder | [c/2-builder-editor.html](c/2-builder-editor.html), first half | The widget sits on a stage at the top, at real size, while the blocks scroll under it. Blocks are cards tinted by kind. Choosing one rings its part of the widget and opens its settings in place. On iPhone the Python is one tap away. On iPad it sits under the stage, read only, with the block's three lines lit and "Edit as code" beside it. |
| The Gallery | [c/3-gallery.html](c/3-gallery.html) | Three shelves named for the act: Ready to use, Make it your own, Parts for a project. Every picture is the app's own live drawing, and the line under each name says what the item touches. Get is the one filled button; the round button beside it opens the item's Python before install. On iPad the item opens beside the shelves, with Get, Make it mine and Add to project. The cost: 4 whole items on the iPhone screen, where A shows 5 and B shows 10, and one tap to read the code, where A and B show it on the item's page. |
| The preview | [c/4-preview.html](c/4-preview.html) | A stage that stands in for a Home Screen, with both sizes on it at real size. One switch for the look: Light, Dark, Tinted, Clear. The last run is a card in plain words, three steps and a tick; the timing stays in the console. The title is a menu of exactly the project's outputs. On iPad the stage is drawn twice, once in each look. A third pair of frames shows the run card updating, up to date and failed. |

</div>


**Where it departs from Paper and Studio.** C departs from the approved look. It is not inside `creative/approved.md` item 2, and nothing in it is adopted without the Investors' "approve".


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Direction C: creative-first, tiles and cards, scrolls sideways" style="--tw:1082px" markdown="1">

| | Approved | C changes | C keeps |
| --- | --- | --- | --- |
| Palette | Warm paper grounds in light. Navy grounds, glass panels and a violet-to-coral gradient in dark. | Six tile tints in each appearance (sky, mint, sun, rose, lilac, sand): 12 new tokens, in no token file. Flat tiles and cards; no glass panels. | Every ground, line, text, accent and status colour by value, the Quill and Lumen code colours, the widget card, and the gradient on each screen's main card or button in dark. |
| Type | New York titles in light, SF Pro Rounded in dark. Sizes 34, 28, 22, 17, 15, 13, 12, 11. | SF Pro Rounded titles in both appearances, so Paper's serif titles go. Sizes one step up: 40, 30, 24, 20, 19, 17, 15, 13. | System fonts only. Inside a widget, the approved faces and sizes. Code at the approved 15. |
| Shape and room | Grouped lists, one thing to a row. | Tiles and cards with 28 px corners and 12 px gaps in place of lists. Fewer things on a screen, each larger. | The widget's 22 px corner. 28 px is the largest step of the approved corner scale; its use on every tile is new. |
| Arrangement | Four tabs, a New button, the editor from edge to edge, a file tree. | A start card in place of New. A code button on every tile. On iPhone, inside a tool, one large button in place of the tab bar. The editor on a rounded card, files as pills and cards. | The four tabs. Light and dark follow the system; no theme switch. |

</div>


The Builder, the stage, the run card, the Gallery tab's shelves and the item's page have no approved drawing at all; the approved "gallery" drawing is the sheet of widgets. Not from a token, as in A: the soft shadow under a widget in light, and the widget's number at 46 px.

**The 03 answers it assumes.** Question 4: four tabs; the three ways to start are a card and two tiles on Projects, one tap each, with no New menu. Question 6: the generated Python is read only with "Edit as code", and hand-written code is one block. On iPad it is on view; on iPhone it is one tap away, which is less than the recommendation's "always on view". Question 7: an item offers its parts, on a Parts shelf and as "Add to project" on its page. Question 3: a newer version is offered, never installed for the person. Questions 1 and 2: files are listed with their folders, the manifest among them, and parts are sources and views. Question 8: no picture from an item's author. Questions 5 and 9 are not drawn. Working assumptions, as in A and B: the Builder in 1.0 on the widget; Pages in 1.1, so the Forecast page is listed and marked "planned for 1.1"; every Gallery item the company's own; no prices, accounts or ratings.

C also leaves 03's own sketches in five places. On iPhone the tab bar is hidden inside a tool, and the preview is a floating picture or a stage that opens as a whole screen, not a sheet pulled up from the bottom. On iPad the Python sits under the stage, not beside the blocks. 03's project page is not drawn as a screen of its own. The item's page shows blocks, keeps the code one tap away, and names no licence, because none is chosen.

**Measured, and not.**

- The `<style>` block and the shared drawings are the same, byte for byte, in all four files.
- Contrast, one run across the four files: 1,200 pieces of drawn text, 79 colour pairs (38 light, 41 dark), and the pages' own 6. 0 under 4.5:1. The lowest is 4.77:1, the approved label on the approved dark widget card. The lowest of C's own is 5.49:1, secondary text on the lilac tint in light. Two scripts, written separately, agree.
- C's six text colours on its six tints, both appearances: 5 of 72 pairs are under 4.5:1. They are tertiary text on rose (4.46:1) and lilac (4.43:1) in light and on mint (4.30:1) and sun (4.25:1) in dark, and success green on lilac in light (4.48:1). None of the five is used for text in any of the four files: text on a tint is primary or secondary only. Tertiary grey does sit on tints as a drawn mark, the drag grip on a block card and the waiting ring on the run card, at 4.25:1 or more, where a mark needs 3:1.
- By script, 48 of the 59 solid colours in the files are values in `pywidget/docs/design/tokens.css`. The other 11 are tints; the twelfth tint, lilac in dark, has the value of Studio's `accent.soft`.
- Nothing C draws itself is under 13 px, apart from the system's tab labels at 11. Inside the small pictures a widget's own text shrinks with it, to 6.7 px at the smallest.
- Rendered in Chromium 148: 22 frames, no console errors, no sideways scroll at 390 on any of the four pages. 22 of 22 frames were read by eye as they were drawn, and all 22 again on the final files. Text fit was judged on the renders, not by script.
- That Chromium does not draw C's type: the rounded titles and the widget's dark numbers came out in plain SF Pro, and the widget's light numbers in Georgia. So the files were also drawn by Quick Look on macOS 27.0.1, which uses the system's WebKit and loads the intended faces: 17 of 22 frames read there, every drawing in at least one appearance, and no text ran out of its place. Not opened in Safari itself or in Firefox. Nothing ran on a device.

**Open.**

- No Gallery tile carries a price or a Pro mark, as in A and B: how a Pro premade looks on a shelf is an Investor decision (#87; phase 2's question 8).
- The sample Python, its module names, the file names and the block names are placeholders, not the app's API. Idris should read the samples before round 2.
- The run card's three steps are sample content. Whether the app can tell the steps apart today, name the one that failed, and say which result the widget still shows is for Idris and Pernille to size. B's preview asks for the same facts as numbers.
- "Small · added" and "Medium · not added yet" assume the app can ask iOS which sizes a person has placed. I recall that it can; I did not check it this round.
- The 12 tints have no tokens, and the contrast scripts are in a scratch folder, not in the repo. If C is picked, both go into `pywidget/docs/design/` before round 2, with the rule the tint check gives: no tertiary text on a tint, and no success green on lilac.
- These are drawn sizes, not touch sizes: the round code button is 32 px across and the pill buttons are 36 to 40 px high. A build must give each a 44 pt touch area.
- Not drawn: Tinted and Clear widgets (named on the switch only), a Page, the first-run question, the Add to Home Screen steps, the outside-code notice, Docs, Settings, larger text sizes, the Increase Contrast sets. Secondary text on a tint is 5.49:1 to 6.76:1 today, under the 7:1 those sets need.
- C is roomy on purpose. The price is counted in the table above: fewer things on a screen, and one more tap to the Python on iPhone. Whether a person who writes code accepts that is for Ines and the Investors to judge against B.
{% endraw %}

</div>
