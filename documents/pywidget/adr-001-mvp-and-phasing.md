---
layout: "default"
title: "ADR-001: Version 1.0 scope, and the versions after it (revision 2)"
section: "documents"
description: "r1 decided a programmer&#x27;s product: an IDE first, widgets behind a cut line, the Builder in a later version, sharing later still. The Investors&#x27; product statement asks for three audiences served equally, with the Builder\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-001-mvp-and-phasing.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/decisions/ADR-001-mvp-and-phasing.md</code></span></div><h1>ADR-001: Version 1.0 scope, and the versions after it (revision 2)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **accepted, revision 2** (Ines, CEO, 2026-11-13, T-4272). Written after the Investors approved the Restructuring's keep, change or drop tables (Restructuring 11, an Investor, #280 c6858665300, A, 11:22 AM ET 11-13). It replaces revision 1 (accepted 2026-10-25 7:27 PM ET, with nine <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> and three re-datings appended through 2026-10-31), which is archived word for word at `archive/ADR-001-r1-2026-10-25-to-10-31.md`. Where the two differ, this text wins. "r1" below means that archived text.
- Dated line, 2026-11-15 2:14 AM ET (Ines, T-4465): decisions 4, 5, 10, 15, 16 and 26 were answered on 11-14 (an Investor, 5:23 to 5:39 PM ET; rows added to section 1). Sections 3.1, 3.3, 4, 5 and 6 follow them. Dates and the reasons for the six set-aside items: `plan.md`, chair note 2026-11-15.
- Dated line, 2026-11-15 6:34 AM ET (Ines, T-4467): decisions 8, 17, 18, 19, 20, 21, 23 and 24 and the Builder's drag-and-drop card (#300) were answered on 11-14 (an Investor, 4:51 to 5:42 PM ET; rows added to section 1). Sections 2, 3, 3.1, 3.3, 4, 5 and 6 follow them. Two-way editing (#287 C) and snap-to-layout drag and drop (#300 A) move the likely release to early June 2027 (`plan.md`, chair note 2026-11-15 6:34 AM).
- Dated line, 2026-11-15 10:00 PM ET (Ines, T-4543): widget actions are 1.0 work. an Investor asked that a person choose what a widget tap does, designed so buttons reuse it (#41 c6905224905), 8:59 PM), then "Add buttons to 1.0!" (#41 c6905386313), 9:11 PM); both in `log/rulings.md`. Interactive widget buttons leave the 1.2 row (sections 3.3 and 4) for section 3.1's new Widget actions row; the design is ADR-011 (proposed). The tap choice goes in phase C, the buttons and run-a-function in the Pages phase; the likely release moves from Sunday 2027-06-06 to Thursday 2027-07-08, about 4.5 weeks (`plan.md`, chair note 2026-11-15 10:00 PM).
- Dated line, 2026-11-24 (Idris, T-5819): the Builder is one-way and strict for 1.0, replacing two-way editing (#287 C): an Investor, #325 c7142863083) and c7149027427) (option A), `log/rulings.md` 2026-11-24 7:55 PM; row added to section 1. Sections 2, 3.1, 5 and 6 follow it. What the Builder supports and does not: [`documents/restructuring/03-structure.md`](../restructuring/03-structure.html) s3. Phase D's weeks: `05-timeline.md` s2; no date moves here.
- Author: Ines. Inputs: [`documents/restructuring/02-audit.md`](../restructuring/02-audit.html) (the ADR table, row 001), `03-structure.md`, `05-timeline.md`, `06-decisions.md` with the Investors' answers; [`ops/plans/pywidget/plan.md`](pywidget-plan.html), chair notes of 2026-11-13 10:31 AM and 10:53 AM; ADR-002, ADR-006 and ADR-007 as changed the same day.
- What this text decides: scope and versions. Dates live in `plan.md` and `ops/milestones.json`; how Python runs, in ADR-007; the widget format, in ADR-002; sharing, in ADR-006.

## 1. What changed, and why a new text

r1 decided a programmer's product: an IDE first, widgets behind a cut line, the Builder in a later version, sharing later still. The Investors' product statement asks for three audiences served equally, with the Builder in 1.0. The Restructuring's audit found that r1's section 3 described the narrower product, and that nine appended rulings and three re-datings made it hard to build from (`02-audit.md`, ADR table). The Investors approved one clean revision with the old text archived (#280 A).

The answers this text rests on, all 2026-11-13 ET, an Investor:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What changed, and why a new text, scrolls sideways" style="--tw:944px" markdown="1">

| Decision | Answer | Link |
| --- | --- | --- |
| 1. Does 1.0 wait for the Builder? | A: yes; the firm date is fixed at the Builder's first phone proof | #270 c6857711513, 10:41 AM |
| 2. Near Day 60 (12-20) | A: nothing goes out; internal TestFlight builds for phone proofs continue | #271 c6857734527, 10:42 AM |
| 3. Pages | A: in 1.0, with App Review's higher risk for app-like Pages taken on | #272 c6857855411, 10:47 AM |
| 7. Components and listings | A "for now": the Gallery holds only our premade Projects, widgets and components; the Builder lets a person pick from premade components; sharing Python is to be looked at for a future build | #276 c6857924837, 10:50 AM |
| 11. The keep, change or drop tables | A | #280 c6858665300, 11:22 AM |
| 12. The Project is the unit | A: first in phase C, with a tested move of existing projects | #281 c6857762837, 10:43 AM |
| 13. Phone first | A: the premades failure is closed first; every phase ends with a phone proof; phase B continues beside the fix | #282 c6857295904, 10:23 AM; c6857553642, 10:34 AM |
| 14. Where a widget's Python runs | In the widget first, unless proven impossible; a widget too large for it runs in the app, shown and measured during development | #283 c6857824620, 10:46 AM; ADR-007 |
| 29. Documentation | A, with a change: the app's workflow diagrams and documentation get their own place on the site, a new main page, App | #297 c6858715463, 11:24 AM |
| 4. iMessage (11-14) | B: no Messages part in 1.0; considered only after a Messages extension is measured on a phone, not before 1.2 | #273 c6885131684, 5:23 PM 11-14 |
| 10. Six items set aside (11-14) | A: all six to "maybe later", each with its reason, none deleted | #279 c6885141527, 5:24 PM 11-14 |
| 26. Outside testers (11-14) | B, against the recommendation: no outside testers; "no code" reaches the store tested only by the company | #295 c6885275925, 5:35 PM 11-14 |
| 5. The marketplace (11-14) | A: in stages; 1.0 our own Gallery and sharing by file, then our examples on the site, at 1.2 a live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> only on Apple's written answer | #274 c6885292665, 5:37 PM 11-14 |
| 15. Outside code's reach (11-14) | A: none of the person's saved keys, no other project's files, only what its project file declares; its code shown before first run | #284 c6885304072, 5:38 PM 11-14 |
| 16. Updates to an installed copy (11-14) | B: offered, never silent; a file the person changed is kept unless they say otherwise | #285 c6885317294, 5:39 PM 11-14 |
| 18. Blocks and code (11-14) | C, against the recommendation: blocks and written code can both be edited freely, each kept in step with the other, in 1.0; about 2.5 to 3 weeks more. *Replaced 11-24 by the row "Builder one way, strict"* | #287 c6884749815, 4:51 PM 11-14 |
| 21. Mission statement (11-14) | B: the new statement (section 2) | #290 c6884802614, 4:56 PM 11-14 |
| 17. Navigation (11-14) | A: the four approved tabs, Projects as home; three ways to start on Projects; one first-run question that can be skipped | #286 c6884824220, 4:58 PM 11-14 |
| 20. iOS 27 features (11-14) | A: used where a phone has them, never required; who can install the app does not change | #289 c6884835911, 4:59 PM 11-14 |
| Builder drag and drop (11-14) | A, snap to layout: pieces snap into rows, columns and layers on the live widget, with handles for size and spacing and a style panel; every move also possible without dragging (VoiceOver actions, the list as a second way in); about 3 more weeks (1.5 to 4.5); brought-in fonts wait on a one-day phone check | #300 c6885108538, 5:21 PM 11-14 |
| Builder one way, strict (11-24) | Replaces 18 C. The Builder owns its files: blocks write the code, and code never goes back into blocks. In the code editor a Builder file is highlighted and locked; "Edit by hand (turns off the Builder for this project)" after a warning, with Undo (T-5819 settled this over staying locked). Builder files can be shown or hidden in a project's file list. Component settings are edited in the Builder; backend scripts stay ordinary Python. Each person has a component library: built-in, their own, imported from their other projects. Gallery items offer Get and View only (View: the files and the Builder view, read-only, parts saved as components); "Make it mine" and "Add to project" dropped. No read-back of hand edits in 1.0 | #325 c7142863083, 2:58 PM 11-24; c7149027427, option A |
| 8. Pictures in shared items (11-14) | A: items shared with other people carry text and Apple's system symbols only, at first; a person's own projects may hold any pictures | #277 c6885282942, 5:36 PM 11-14 |
| 19. Server and account (11-14) | A: none in 1.0; at the live shelf (1.2), Sign in with Apple only to publish, CloudKit first | #288 c6885326341, 5:40 PM 11-14 |
| 23. Reports and takedowns (11-14) | B: decided when 1.2 is scoped; the live shelf cannot open until then | #292 c6885342790, 5:41 PM 11-14 |
| 24. Age (11-14) | A: the terms say 13 or over; Apple's Declared Age Range check gates the marketplace; no likes, comments or feeds | #293 c6885351357, 5:42 PM 11-14 |
| Widget tap choice (11-15) | The person chooses what each widget's tap does (its Page, its code, pywidget's home, a link, or a Python function), as one action model that buttons reuse | #41 c6905224905, 8:59 PM 11-15 |
| Widget buttons (11-15) | "Add buttons to 1.0!": interactive widget buttons are in 1.0, not 1.2 | #41 c6905386313, 9:11 PM 11-15 |

</div>


Decisions 4, 5, 6, 8, 9, 10 and 15 to 28 were still open when this was written (*11-15: 4, 5, 10, 15, 16 and 26 are now answered, rows above; at 6:34 AM, 8, 17, 18, 19, 20, 21, 23 and 24 too. Still open: 6, 9, 22, 25 and 28*). Where a section below depends on one, it says "pending" with the issue number, and the company's recommendation is the working assumption until the answer comes. An answer that differs changes this text by a dated line.

## 2. The product: three audiences, one Project

**The mission statement** (#290 B; `creative/approved.md` item 7): "pywidget lets people make, run and use Python-powered widgets and other small services on iPhone and iPad: write Python, build with blocks, or pick one ready-made." The store page says "community projects" only once a release has them.

**Three audiences, served equally** (`01-questions-and-limits.md` s5): each has its own first screen, a complete path to a finished thing without another audience's tools, and a share of every release.

- **Programmers:** a real editor and real Python. The code behind every Builder block and every Gallery item is visible and editable. *(11-24, T-5819: a Builder file is visible and locked; editing it by hand turns the Builder off for that project, with Undo. A Gallery item's code is editable in the copy Get makes.)*
- **People who make without code:** a finished widget on the Home Screen without seeing code; errors that say what to change; editing the code is an offer, never a step.
- **People who use finished things:** pick a ready-made item in a few taps, with no account, and see who made it and what it can reach.

**The Project is the unit** (#281 A; `03-structure.md`). One folder, one manifest that is the truth, one ID that never changes. A Project holds Python, data and media, and feeds one or more outputs: a widget, a Page, a Shortcuts action, later others. Shared code sits in the same folder and is imported by each output. The widget library becomes a cache built from the Project, never a second source. A premade is a Project. The manifest and its migration get their own ADR (section 6); this text fixes none of its fields.

**One engine.** Python makes data; our SwiftUI draws it (ADR-002). Blocks compile to the same Python a programmer writes, through Python's own syntax tree (L17 s2). Whether a widget's Python runs in the widget or in the app is ADR-007's, by the size rule there.

## 3. Version 1.0

**The promise 1.0 proves.** Anyone can make a working widget or Page on iPhone and iPad, by writing Python, by building with blocks, or by picking one ready-made, and one Project serves all three ways.

**When.** Likely early July 2027 (Thursday 2027-07-08 on the likely line), range early April to late November 2027 (*11-15 10:00 PM, T-4543: was early June, Sunday 2027-06-06, range mid March to early October; the widget tap choice and buttons added about 4.5 weeks. 11-15, T-4467: was late April, Monday 2027-04-26, range late February to late July; two-way editing and snap-to-layout drag and drop added about 6 weeks*). The firm date is fixed when the Builder first works on a phone (#270 A). Phases A to E and their phone proofs: `plan.md`, chair note 2026-11-13 10:53 AM. Nothing goes out near Day 60 (#271 A).

### 3.1 In 1.0


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.1 In 1.0, scrolls sideways" style="--tw:804px" markdown="1">

| Part | What 1.0 holds | Rests on |
| --- | --- | --- |
| Python runtime | Upstream CPython 3.15.1 for iOS, pinned with checksum and signature; the stdlib cut; the bundled pure-Python set (ADR-003); lazy imports on. iOS 18.0 floor; newer APIs behind `#available` | r1 Revised table (10-25 7:36 PM); ADR-003; ADR-007 |
| The IDE | Projects, the editor (ADR-004), a console with `input()`, stop and restart, inline errors, completion as ADR-004 allows, native prompts from scripts, the editor preview pane with "Run as widget" and the entry stepper, built-in docs and examples. iPhone and iPad | r1 3.1 C5; plan 11-04 item 5 |
| Widgets | The view tree (ADR-002) in every family the renderer supports, light and dark, every rendering mode. Python in the widget first, the app as fallback, by ADR-007's size rule; the editor shows each widget's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> with its measured memory and time (#283) | ADR-002; ADR-007 |
| 12 premades | All free, none marked Pro (plan 11-04 item 6). Each is a Project, and each opens as the person's own editable copy | plan 11-04; ADR-006 13.6 |
| The Project | One folder, one manifest, one ID, and a tested migration of existing projects, before any public release (#281 A). Version fields per #285 B; an app update never changes a person's copy silently, and a file they changed is kept | section 6 |
| The Builder | The block format, catalog and compiler; premades as blocks; the block editor, editing on the live widget by drag and drop that snaps pieces into rows, columns and layers, with handles for size and spacing and a style panel, every move also possible without dragging (#300 A); ~~blocks and written code each editable, kept in step with the other (#287 C);~~ *one way, strict (11-24): the Builder owns its files, shown locked in the code editor, and "Edit by hand" turns it off for that project, with Undo; no read-back of hand edits;* a custom block; "Save as component" and sharing by file. The person picks from our premade components (#276). *11-24: from a component library of their own, too: built-in, saved by them, and imported from their other projects.* Brought-in fonts only if the one-day phone check passes | ADR-008, written first (section 6); `06-decisions.md`, board list; #287 C; #300 A |
| Widget actions | Each widget's tap, and each button its tree draws, carries one action the person chooses on the project's page: open its Page, its code, pywidget's home, a web link (https only), another app through the launcher's path, or run one of the widget's declared Python functions. Nothing chosen keeps today's route. A button that runs a function runs inside the widget on iOS 18 to 26 when the widget's lane and time allow, and in pywidget otherwise; on iOS 27, in pywidget in the background. Links that run code are signed. Buttons are inactive while the phone is locked (Apple's rule). Opening another app ships only under the launcher's own condition (#192) | #41 c6905224905 and c6905386313 (11-15); ADR-011 (proposed); ADR-007 s3 and s5 |
| Pages | A Project's full-screen output, drawn by the app from the view-tree format with Page-only parts (ADR-002, amendment of 11-13). A Page answers taps by calling Python on the app's one run queue (ADR-007 s4) | #272 A |
| Gallery | Our own premade Projects, widgets and components only, inside the app binary, with the three ways to use an item in `03-structure.md`. The marketplace's first stage; no server, sign-in or reports desk | #276; #274 A; ADR-006 S0 |
| Sharing by file | A Project, a Builder document or a component saved to Files or the share sheet, opened by the other person the way they open a `.py`. The app downloads and hosts nothing. Someone else's Python arrives only this way, with less reach than the person's own: none of their saved keys, no other project's files, only what its project file declares, and its code shown before it first runs | ADR-006 (amended 11-13: S1b and the component); #284 A |
| Shortcuts | App Intents: Run Script, Run Script with Input, Refresh Widgets, and Open (r1's 10-27 Home Screen route, now opening a Project's Page or its plain run screen); the three Shortcut recipes in the Gallery (ADR-010) | r1 3.1 C7 and 10-27 ruling; ADR-010 |
| Device modules | clipboard, files, local notifications, http, location (When In Use), motion history, keychain | r1 3.1 C2 and its Revised rows |
| Pro | One purchase, $14.99 once (#87): background refresh of widgets, and the themes (B-staged, #142, read as 6a). The Pro screen lists only what the build has | plan 11-04 item 6 |
| Design | The approved look (`creative/approved.md` item 2) until decision 22 (#291, pending) is answered. The four approved tabs, Projects as home, three ways to start on Projects, one first-run question that can be skipped (#286 A). iOS 27 features used where a phone has them, never required; the iOS 18.0 floor stays (#289 A) | creative/approved.md; #286 A; #289 A |
| Documentation | A plain page and a code-drawn diagram are part of every app part's Done; they live under the site's App page (#297) | decision 29 |
| Privacy | No account, no server, no analytics, no tracking in 1.0. Scripts and their output stay on the device and in folders the person chooses | r1 3.1 Privacy; decision 19 (#288 A) |
| Shared items and age | Items shared with other people carry text and Apple's system symbols only, at first; a person's own Projects may hold any pictures (#277 A). The terms say 13 or over; the company does not build for children under 13 (#293 A) | #277 A; #293 A |

</div>


### 3.2 Rules carried from r1 that still bind

- **Nothing hidden in a release build.** Unreleased capabilities are compiled out, never dormant behind a switch (guideline 2.5.19; r1 Revised table).
- **The IDE gets no widget-driven limits.** Scripts in the app use the full runtime (r1 s6; ADR-007).
- **Words.** A person's Projects are not "apps" or "mini apps" in any store text, review note or interface (r1 10-27 ruling, item 5). The manifest file is `pywidget.json` (r1 10-29 line). A widget shows its script's last run and is never called live (ADR-007 s10).
- **Storage, not battery,** among the premades; weather only as a Shortcut recipe, with no third-party weather source by default (r1 10-25 9:16 PM rulings).
- **Online pip** has no date until the reads in ADR-006 s10 and s12; install from file is not in 1.0 (plan 11-04).
- **Every 1.0 part has a row in the App Review readiness matrix** before submission (r1 s6).

### 3.3 Not in 1.0


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.3 Not in 1.0, scrolls sideways" style="--tw:960px" markdown="1">

| Item | Where it goes | Status |
| --- | --- | --- |
| Other people's block documents listed in the app (a live shelf) | 1.2 at the earliest, only on Apple's written answer. Sign in with Apple only to publish, CloudKit first (#288 A); Apple's Declared Age Range check gates it, with no likes, comments or feeds (#293 A); who owns the reports address, takedown replies and the DMCA registration is decided when 1.2 is scoped, and the shelf cannot open before (#292 B) | answered: #274 A, #288 A, #292 B, #293 A; the letter to Apple is decision 6 (#275) |
| Other people's Python listed in the app | No version until Apple answers | #276 ("for now"); ADR-006 S3b |
| iMessage | After a Messages extension is measured on a phone; not before 1.2 | answered: #273 B |
| Paid items, paying creators | Not planned | pending decision 9 (#278) |
| The web IDE and sync, the compatibility layer for the old app's scripts, Shortcut Lab, and the 11-04 plan's AI key, Control Center button and Share extension | "Maybe later", each with its reason (`plan.md`, chair note 2026-11-15) | answered: #279 A |
| Advanced libraries (numpy, Pillow, matplotlib) | After 1.0 (plan 11-04, the 1.2 row) | dated when 1.0's date is firm (*11-15 10:00 PM, T-4543: interactive widget buttons left this row for 3.1, #41 c6905386313*) |
| Debugger, formatter and r1's other 3.2 rows | After 1.0, as r1 3.2 placed them | unchanged |

</div>


## 4. The versions

Three versions are planned. Only 1.0 is fixed; 1.1 and 1.2 are working assumptions from the recommendations until their decisions are answered (*11-15: decisions 4, 5, 10 and 16 are answered and placed below*).

1. **1.0:** section 3.
2. **1.1:** fixes, whatever 1.0's fallbacks move out, any "maybe later" item the Investors bring back by name (#279 A), and the screen that offers a newer version of an installed item, never silent, keeping a file the person changed (#285 B; the version fields it reads are in 1.0, section 6). No Messages part (#273 B).
3. **1.2:** a live shelf of other people's block projects, only if Apple says yes in writing (#274 A; decision 6), with Sign in with Apple to publish and CloudKit first (#288 A), the age check (#293 A), and the reports and takedown owner decided first (#292 B); a Messages extension considered only after it is measured on a phone (#273 B); advanced libraries (*widget buttons moved to 1.0 on 11-15, #41 c6905386313*).

No version holds anything Apple's text rates High (other people's Python listed in the app) before Apple answers (ADR-006 13.2, S3b's gate).

## 5. Order of work, and what would make this fail

**Order** (#282 A; `plan.md` phases). A: the 12 premades draw on an Investor's iPhone, and one sitting reads the widget's memory. B: the IDE and widgets finished, beside A. C, after A's proof: the Project first, then the `read()` and `draw()` contract, permissions and the outside-code notice, the tab shell, the Gallery's three choices *(11-24: two, Get and View, T-5819)*. D: the Builder, whose first phone proof fixes the date. Then Pages, then E, the release. Widget actions (ADR-011) sit in two places: the tap choice in C, after the manifest it is stored in; running a function from a tap or a button, and the buttons, in the Pages phase, beside the Page's own tap-to-Python path (`plan.md`, chair note 2026-11-15 10:00 PM). Each phase ends with a phone proof on a TestFlight build in an Investor's hands.

**What would make this fail.**
- Phase A's cause is not found, and everything waits behind it (T-4180, T-3783).
- The Builder runs long: about 12.25 weeks on the Xcode slot (7 to 19) and 3.5 beside it, an estimate (`05-timeline.md`; with #287 C's two-way editing and #300 A's drag and drop, `plan.md` chair note 2026-11-15 6:34 AM). The drag-and-drop weeks are the designer's, not yet checked by the engineer who builds them, and two-way editing has no prototype. *(Since checked: 13.5 on the slot after the drag-and-drop check, 12.75 after the two-way check; 11-24, T-5819: one way, strict, 12.0 on the slot (5.75 to 19.0) and 4.5 beside, `05-timeline.md` s2.)*
- Widget buttons run long: about 4.6 weeks on the slot with the tap choice (2.7 to 8.4), my estimate per ADR-011 build step, not yet checked by Idris. A function run inside the widget must fit its small memory (23 MB free at rest on the iPhone 15 so far, T-4282) and its 2-second budget; when it doesn't, the button opens pywidget and runs there, so buttons ship either way, but visibly.
- App Review refuses app-like Pages, or reads the Gallery as a storefront. Pages were taken on with that risk (#272); the review notes and ADR-006 13.2 carry the answer.
- Bank and tax details and the name (#90) stay open, so nothing can be sold or test-bought.
- The Builder's "no code" promise is tested only by the company (#295 B), so a failure in the hands of people who don't write Python is first seen in store reviews. The third phone proof is held to its words: blocks only, the code view never opened, VoiceOver finishing every move.

## 6. Records this depends on

- **ADR-008, the Builder:** written before any Builder code (`02-audit.md`; `06-decisions.md`). L17 is its draft. Not yet written; the first step of the Builder feature (T-4477). It must carry two answers of 11-14 and one of 11-16:
  - ~~**Blocks and code (#287 C).**~~ *11-24: replaced by the one-way, strict Builder (#325, row in section 1; `03-structure.md` s3). ADR-008 says what a locked Builder file looks like in the code editor, the warning and its "Edit by hand", Undo and "Back to the Builder", the fingerprint, and the component library.* ~~Both sides editable freely, each kept in step with the other. L17 s4's option (b): written code the Builder has no block for (a loop, say) stays code only, a rule people meet by surprise, so ADR-008 says what the person sees then.~~ The custom block stays beside it.
  - **Drag and drop (#300 A).** Snap to layout on the live widget: rows, columns and layers, handles for size and spacing, a style panel; every move also possible without dragging, by VoiceOver actions and the list as a second way in. Brought-in fonts only after the one-day phone check. The screens are redrawn with the visual direction once #291 is answered (`design/builder-dnd/README.md`).
  - **Themes (#291, an Investor 10:42 PM ET 11-16; added by Maren, T-4680).** Many prebuilt themes ship with a project, Paper and Studio among them; people customize fonts, sizes and colours as finely as they like, and design light and dark mode separately. Studio is plain black or dark grey, not purple. ADR-008 says where the theme editor sits and how a block's style reads the chosen theme. For now the premades use Paper in light and Studio in dark (T-4681). `creative/approved.md` item 9.
- **A new ADR, the manifest and its migration** (#281 A). Not yet written; the first step of the Foundations feature (T-4476). It must carry two answers of 11-14:
  - **Outside code's reach (#284 A).** Code from a project file someone else made gets none of the person's saved keys, no other project's files, and only what its project file declares; its code is shown to the person before it first runs. Phase C builds the permission check and that notice. No outside code runs in the app before then.
  - **Updates (#285 B).** When the maker of a Gallery project improves it, the app offers the newer version and the person chooses. Never silent; a file the person changed is kept unless they say otherwise. The version fields are designed to this in phase C. In 1.0 the maker is always the company (#276), and an app update never changes a person's copy; the offer screen is 1.1 (section 4).
- **ADR-002 and ADR-006** amended, and **ADR-007** rewritten as one text, on 2026-11-13 under the same approval (T-4272).
- **ADR-005:** history; its subject, the compatibility layer, is set aside (#279 A).
- **ADR-003, ADR-004, ADR-009:** unchanged.
- **ADR-010:** stands; its rules R5 and R6 retire with the manifest.
- **ADR-011, widget actions:** proposed (Idris, T-4542); its build steps start when it is accepted after Pernille's and Maren's reviews. Its actions are stored in the manifest of phase C.

Ines, CEO
{% endraw %}

</div>
