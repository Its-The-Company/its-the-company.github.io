---
layout: "default"
title: "The Restructuring, phase 4: mock-ups, round 1"
section: "documents"
description: "Three style directions for the app, each drawn by code across the same five screens, in light and dark, on iPhone and iPad. Every one is a proposal; nothing is adopted until the Investors approve."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/04-mockups/' | relative_url }}">← Mock-ups</a><a href="{{ '/documents/restructuring/04-mockups/04-mockups-index.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Proposal, not approved</span><span>Day 23 · Fri Nov 13, 12:19 AM ET</span><span><code>documents/restructuring/04-mockups/index.md</code></span></div><h1>The Restructuring, phase 4: mock-ups, round 1</h1><p class="meta doc-notice"><b>Proposal, not approved: the mock-ups are options for the Investors to review. Nothing here is adopted until the Investors approve it.</b></p><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

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

How they differ: A keeps the approved look and moves the furniture. B is a programmer-first workbench, denser, with split panes. C is creative-first, roomier, built from tiles and cards.

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

## Direction C
{% endraw %}

</div>
