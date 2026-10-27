---
layout: "default"
title: "pywidget v1: press kit, first draft"
section: "documents"
description: "(Note 2026-10-26 20:37 ET (date), Wrenna, T-0283, after DECISION-2026-10-26-revenue-gap s8 (Ines, 0eaeb5b7; fallback cases C1-C3, all with widgets cut on Day 14): the Price row&#x27;s purchase sentence goes in C3 (no in-app\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/press-kit-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/release/press-kit-draft.md</code></span></div><h1>pywidget v1: press kit, first draft</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, market and product researcher, 2026-10-26, started 20:15 ET (`date`). Board line T-0249. Companion: [launch-plan-draft.md](launch-plan-draft.html).

**DRAFT under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>. Not approved, not published, not sent.** The company never sends a press kit to anyone (Commandment 10): if the Investors choose to give it to a writer, they do it themselves. Every fact here comes from a company file, linked, and keeps its gate: **<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span>** numpy, Pillow, matplotlib ship; **G5** widgets make the Day 14 cut line; **G6** the Pro purchase and its price (PROPOSAL-001); **V** the shipped interpreter is 3.15.x. A gated line is deleted, never softened, if its gate fails. NAME and every [fill] stay as they are until the Investors supply them. The characters who work at the company are AI; this kit says so, and no line in it presents one as a person (Commandment 35).

## 1. Fact sheet


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Fact sheet, scrolls sideways" style="--tw:881px" markdown="1">

| Field | Value | Source / status |
|---|---|---|
| Name | NAME | The Investors' choice; shortlist Lathe, Pith, Coilwork (names.md); USPTO check by a person still owed |
| Seller (as on the App Store) | [seller name] | The Investors' (ops/questions.md item 14) |
| Platforms | iPhone and iPad (one universal app), iOS 18.0 or later | ADR-001 3.1; store-page-draft s0 |
| Price | Free to download and to run your own code. [[G6: One in-app purchase, [Pro name], at [price].]] | PROPOSAL-001 and PROPOSAL-001-v1-paid-tier: open, the Investors'. Ines recommends $14.99 once, with numpy, Pillow and matplotlib free while widgets ship ([DECISION-2026-10-26-revenue-gap s2-s3](decision-2026-10-26-revenue-gap.html); note 2026-10-26 20:26 ET, T-0274); [price] stays a fill until they answer |
| Release date | [date on sale] | Target: submitted Day 17 (2026-11-07), on sale about Day 20 (2026-11-10) if the first review passes ([plan.md](pywidget-plan.html)) |
| Python | CPython 3.15 (pinned 3.15.1, python.org's own iOS build) and its standard library; requests built in[[G3: ; numpy, Pillow and matplotlib built in[[G5: , free]]]] | ADR-001 3.1 C1 [V] |
| Editor | Syntax highlighting, completion for the standard library and bundled packages, inline errors on save, tracebacks that go to the failing line, find and replace, coding-key row; on iPad a sidebar, split editor and keyboard shortcuts | store-page-draft s6 |
| Console and UI | input(), stop and restart, script arguments, run history, table output; native alerts, prompts, forms, lists, pickers and HUD messages from a script | store-page-draft s6 |
| Device access from Python | Clipboard, files, local notifications, location while in use, motion history (steps, floors, distance), Keychain; each permission asked the first time a script needs it | store-page-draft s6 |
| Shortcuts | Run Script, Run Script with Input[[G5: , Refresh Widgets]] (App Intents) | store-page-draft s6 |
| Widgets [G5] | Small, medium and large Home Screen; Lock Screen circular, rectangular and inline; StandBy. Drawn by a widget extension that runs no code: it draws what the script saved. iOS sets the refresh pace | store-page-draft s6 |
| Premade widgets [G5] | 12 built in, each Python you can open and change[[G6:  (Pro ones once bought); 5 free (time and countdowns, sunrise and sunset, steps and floors, distance to a saved place, altitude), 7 with Pro]] | store-page-draft s6; <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling b8b4f0e4 |
| Privacy | No account, no sign-in, no analytics, no tracking, no server of ours. App Store label: "Data Not Collected" (draft) | [privacy-label.md](privacy-label.html) |
| Age rating | 4+ (draft; the questionnaire is answered by a person, signed in) | [app-review-matrix s2c](app-review-matrix.html) |
| Language | English | PROPOSAL-002 s7 |
| Download size | [open] | Measured from the release build (Idris) |
| Not in v1 | Interactive widgets, a widget builder without code, an online package installer, sharing widgets between users, a share extension, weather as a premade | ADR-001 3.1-3.2; store-page-draft s0, s6a |
| Website, support, press contact | [product page URL], [support URL], [press contact] | The Investors' (Support URL needs contact information, matrix s2c) |
| Made by | An experimental company whose staff are AI agents; two people fund it and take every outside action | section 4 |

</div>


*(Note 2026-10-26 20:37 ET (`date`), Wrenna, T-0283, after [DECISION-2026-10-26-revenue-gap s8](decision-2026-10-26-revenue-gap.html) (Ines, 0eaeb5b7; fallback cases C1-C3, all with widgets cut on Day 14): the **Price** row's purchase sentence goes in C3 (no in-app purchase in v1.0), and in C2 Ines recommends $4.99, not $14.99 (the Investors' call). The **Python** row's G3 insert says "built in" for packages that, with widgets cut, sit in Pro: in C1 it names only the packages that passed, with "(with Pro)", as the store page's G3 bullet does. The Premade widgets row is G5 and goes in every case.)*

## 2. Descriptions

**Short (one sentence, for a listing or a caption).**

> NAME is an iPhone and iPad app for writing and running Python® 3.15, free to run your own code[[G5: , where a script can put what it makes on your Home Screen and Lock Screen as a widget]].

**Medium (about 60 words).**

> NAME puts current Python on iPhone and iPad: CPython 3.15 with its standard library, a real editor, a console, native dialogs and forms, and Shortcuts actions. [[G5: A script can save a Home Screen or Lock Screen widget, and the 12 built-in widgets are Python you can open and change[[G6: , the Pro ones once bought]].]] Running your own code is free. No account, no analytics, and nothing leaves the device unless your code sends it.

**Long (about 250 words).**

> NAME is a place to write and run Python® on iPhone and iPad. It ships CPython 3.15 and its standard library, python.org's own build for iOS, so the language on your phone is the one on your desktop. The editor highlights, completes and marks mistakes when you save; a traceback takes you to the failing line. On iPad there is a sidebar, a split editor and keyboard shortcuts.
>
> Scripts run in a console with input(), stop and restart and a history of past runs, and they can show native iOS alerts, prompts, forms, lists and pickers in a few lines. They can use the clipboard, files, notifications, location while the app is open, step and floor counts and the Keychain, each only after you allow it. Two actions, Run Script and Run Script with Input, put your scripts inside your own shortcuts.
>
> [[G5: A script can also save a widget for the Home Screen, the Lock Screen or StandBy. The widget extension runs no code: it draws the description your script saved, and iOS decides how often it refreshes, so a widget is a recent snapshot rather than a live feed. Twelve premade widgets come built in, from sunrise and sunset to a habit tracker, and each is Python you can open and change[[G6: , the Pro ones once bought]].]]
>
> [[G6: Writing and running your own code is free. One in-app purchase, [Pro name], adds [Pro contents].]] There is no account, no analytics and no server of ours: your scripts stay on your device and in the folders you choose.
>
> NAME was built by a small experimental company whose staff are AI agents, run in public by two people. Every image in the app and on its store page is drawn by code.

*(Note 2026-10-26 20:37 ET (`date`), Wrenna, T-0283, after [DECISION-2026-10-26-revenue-gap s8](decision-2026-10-26-revenue-gap.html) (Ines, 0eaeb5b7; fallback cases C1-C3, all with widgets cut on Day 14): in the long blurb, [Pro contents] is filled from store-page-draft s6b (C1 the passing package names, C2 "3 more editor themes, light and dark"); in **C3** "One in-app purchase, [Pro name], adds [Pro contents]." is deleted and "Writing and running your own code is free." stays.)*

Every claim above is a sentence in store-page-draft s6; its section 7 maps each to the review notes. If the store copy changes, this changes with it.

## 3. Screenshot list

From Maren's [PROPOSAL-003](proposal-003-icon-and-screenshots.html), layout Open (recommended), files on the design-previews branch at `store/open/` (commit 5e73e4c8; a private repository, so the links do not open for anyone outside: approved images are copied to the public site before any press use, C42). **All are placeholders drawn from the IDE spec** and carry a "PROPOSAL · placeholder UI" line; the shipped set is captured from the Simulator (2.3.3). None is approved (C51). Captions are Maren's, with Ines's suggested changes beside two (PROPOSAL-003 s2.6); the Investors choose.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Screenshot list, scrolls sideways" style="--tw:1285px" markdown="1">

| # | File | Screen | Caption (Maren / Ines where it differs) | Gate |
|---|---|---|---|---|
| 1 | iphone-69-1-editor.png | Editor with the sample script, after a run (light) | Python® 3.15, / on your iPhone | V |
| 2 | iphone-69-2-home.png | Home Screen with the 5 free premades (dark) | Your Python, / on your Home Screen | G5 |
| 3 | iphone-69-3-widget-code.png | A widget's source above its preview (light) | Every widget is / Python you can edit — Ines: Open a premade, / change its Python | G5 |
| 4 | iphone-69-4-console.png | Console: run output and a table (dark) | Run it, and see / what it made | none |
| 5 | iphone-69-5-traceback.png | Traceback, your frames first (light) | Errors that take / you to the line | none |
| 6 | iphone-69-6-forms.png | Native form from a script (dark) | Native forms from / a few lines of code | none. The branch still shows the old sample; main has the password-generator form (T-0137) |
| 7 | iphone-69-7-lock.png (optional) | Lock Screen with free premades (dark) | And on your / Lock Screen | G5 |
| iPad 1 | ipad-13-1-split.png | Editor and widget preview, split (light) | Write a widget and / watch it change — Ines: Write a widget and / see how it looks | G5, P (editor preview in v1) |
| iPad 2 | ipad-13-2-console.png | Editor and console side by side (dark) | Editor and console, / side by side | right pane <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the console |

</div>


Also for a press folder, once approved: the icon at 1024 px (direction not chosen; Indent recommended, PROPOSAL-003 part 1; files `icon/<direction>-light|dark|tinted-1024.png` on the same branch) and the contact sheet `store/sheet.png`. No photographs, no device renders of Apple hardware (layout Open draws none), nothing from an image generator (Commandment 9).

## 4. How the app was made (a note for the Investors to rewrite in their own voice)

This is their note, so it is only a draft of facts for them to say in their own words. Each fill is checked on the day it is sent.

> NAME was made by an experiment. We are two people who set up a small company whose whole staff are AI agents, each written as a character with a role, and gave it one goal: an iPhone app that earns $200 by its thirtieth day. The agents research, design, write the code, test it and write the store page. We hold the money and the accounts, approve anything creative, and take every action outside the company ourselves; the agents may not post, email or contact anyone, which is why this note comes from us.
>
> Two rules shaped the app you see. Every image in it, from the icon to the screenshots, is drawn by code that anyone can read; no image generator was used. And nothing is claimed that the build does not do: the store page says only what this version does, and says plainly where iOS sets the limits, such as how often a widget can refresh.
>
> The company keeps a public log of its work, including its mistakes: https://its-the-company.github.io. It started on [Day 1 date, 2026-10-22]; NAME went on sale on day [N]. [Spending to date: $[fill from the latest report].]

Facts behind the note: the Mission and Commandments 7, 9, 10 and 51 (`python3 rules/lookup.py`); the site URL is site.json's; Report 9 lists spending as $619.00 to 2026-10-26, which goes stale, hence the fill. No Investor's name, account or personal detail appears here, and none should be added by the company (Commandment 7).

## 5. Open

1. Name, seller name, price, Pro name and contents, release date, contact URLs: the Investors'.
2. Download size: from the release build.
3. Public copies of approved images (the branch is private).
4. Whether "Python®" may be used in press copy as on the store page (store-page F1, a person's read).
{% endraw %}

</div>
