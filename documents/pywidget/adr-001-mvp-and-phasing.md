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
- Author: Ines. Inputs: [`documents/restructuring/02-audit.md`](../restructuring/02-audit.html) (the ADR table, row 001), `03-structure.md`, `05-timeline.md`, `06-decisions.md` with the Investors' answers; [`ops/plans/pywidget/plan.md`](pywidget-plan.html), chair notes of 2026-11-13 10:31 AM and 10:53 AM; ADR-002, ADR-006 and ADR-007 as changed the same day.
- What this text decides: scope and versions. Dates live in `plan.md` and `ops/milestones.json`; how Python runs, in ADR-007; the widget format, in ADR-002; sharing, in ADR-006.

## 1. What changed, and why a new text

r1 decided a programmer's product: an IDE first, widgets behind a cut line, the Builder in a later version, sharing later still. The Investors' product statement asks for three audiences served equally, with the Builder in 1.0. The Restructuring's audit found that r1's section 3 described the narrower product, and that nine appended rulings and three re-datings made it hard to build from (`02-audit.md`, ADR table). The Investors approved one clean revision with the old text archived (#280 A).

The answers this text rests on, all 2026-11-13 ET, an Investor:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What changed, and why a new text, scrolls sideways" style="--tw:909px" markdown="1">

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

</div>


Decisions 4, 5, 6, 8, 9, 10 and 15 to 28 were still open when this was written. Where a section below depends on one, it says "pending" with the issue number, and the company's recommendation is the working assumption until the answer comes. An answer that differs changes this text by a dated line.

## 2. The product: three audiences, one Project

**Three audiences, served equally** (`01-questions-and-limits.md` s5): each has its own first screen, a complete path to a finished thing without another audience's tools, and a share of every release.

- **Programmers:** a real editor and real Python. The code behind every Builder block and every Gallery item is visible and editable.
- **People who make without code:** a finished widget on the Home Screen without seeing code; errors that say what to change; editing the code is an offer, never a step.
- **People who use finished things:** pick a ready-made item in a few taps, with no account, and see who made it and what it can reach.

**The Project is the unit** (#281 A; `03-structure.md`). One folder, one manifest that is the truth, one ID that never changes. A Project holds Python, data and media, and feeds one or more outputs: a widget, a Page, a Shortcuts action, later others. Shared code sits in the same folder and is imported by each output. The widget library becomes a cache built from the Project, never a second source. A premade is a Project. The manifest and its migration get their own ADR (section 6); this text fixes none of its fields.

**One engine.** Python makes data; our SwiftUI draws it (ADR-002). Blocks compile to the same Python a programmer writes, through Python's own syntax tree (L17 s2). Whether a widget's Python runs in the widget or in the app is ADR-007's, by the size rule there.

## 3. Version 1.0

**The promise 1.0 proves.** Anyone can make a working widget or Page on iPhone and iPad, by writing Python, by building with blocks, or by picking one ready-made, and one Project serves all three ways.

**When.** Likely late April 2027 (Monday 2027-04-26 on the likely line), range late February to late July 2027. The firm date is fixed when the Builder first works on a phone (#270 A). Phases A to E and their phone proofs: `plan.md`, chair note 2026-11-13 10:53 AM. Nothing goes out near Day 60 (#271 A).

### 3.1 In 1.0


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.1 In 1.0, scrolls sideways" style="--tw:769px" markdown="1">

| Part | What 1.0 holds | Rests on |
| --- | --- | --- |
| Python runtime | Upstream CPython 3.15.1 for iOS, pinned with checksum and signature; the stdlib cut; the bundled pure-Python set (ADR-003); lazy imports on. iOS 18.0 floor; newer APIs behind `#available` | r1 Revised table (10-25 7:36 PM); ADR-003; ADR-007 |
| The IDE | Projects, the editor (ADR-004), a console with `input()`, stop and restart, inline errors, completion as ADR-004 allows, native prompts from scripts, the editor preview pane with "Run as widget" and the entry stepper, built-in docs and examples. iPhone and iPad | r1 3.1 C5; plan 11-04 item 5 |
| Widgets | The view tree (ADR-002) in every family the renderer supports, light and dark, every rendering mode. Python in the widget first, the app as fallback, by ADR-007's size rule; the editor shows each widget's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> with its measured memory and time (#283) | ADR-002; ADR-007 |
| 12 premades | All free, none marked Pro (plan 11-04 item 6). Each is a Project, and each opens as the person's own editable copy | plan 11-04; ADR-006 13.6 |
| The Project | One folder, one manifest, one ID, and a tested migration of existing projects, before any public release (#281 A) | section 6 |
| The Builder | The block format, catalog and compiler; premades as blocks; the block editor; a code view and "Edit as code"; a custom block; "Save as component" and sharing by file. The person picks from our premade components (#276) | ADR-008, written first (section 6); `06-decisions.md`, board list |
| Pages | A Project's full-screen output, drawn by the app from the view-tree format with Page-only parts (ADR-002, amendment of 11-13). A Page answers taps by calling Python on the app's one run queue (ADR-007 s4) | #272 A |
| Gallery | Our own premade Projects, widgets and components only, inside the app binary, with the three ways to use an item in `03-structure.md` | #276; ADR-006 S0 |
| Sharing by file | A Project, a Builder document or a component saved to Files or the share sheet, opened by the other person the way they open a `.py`. The app downloads and hosts nothing. Someone else's Python arrives only this way | ADR-006 (amended 11-13: S1b and the component) |
| Shortcuts | App Intents: Run Script, Run Script with Input, Refresh Widgets, and Open (r1's 10-27 Home Screen route, now opening a Project's Page or its plain run screen); the three Shortcut recipes in the Gallery (ADR-010) | r1 3.1 C7 and 10-27 ruling; ADR-010 |
| Device modules | clipboard, files, local notifications, http, location (When In Use), motion history, keychain | r1 3.1 C2 and its Revised rows |
| Pro | One purchase, $14.99 once (#87): background refresh of widgets, and the themes (B-staged, #142, read as 6a). The Pro screen lists only what the build has | plan 11-04 item 6 |
| Design | The approved look (`creative/approved.md` item 2) until decision 22 (#291, pending) is answered | creative/approved.md |
| Documentation | A plain page and a code-drawn diagram are part of every app part's Done; they live under the site's App page (#297) | decision 29 |
| Privacy | No account, no server, no analytics, no tracking in 1.0. Scripts and their output stay on the device and in folders the person chooses | r1 3.1 Privacy; decision 19 (#288, pending) |

</div>


### 3.2 Rules carried from r1 that still bind

- **Nothing hidden in a release build.** Unreleased capabilities are compiled out, never dormant behind a switch (guideline 2.5.19; r1 Revised table).
- **The IDE gets no widget-driven limits.** Scripts in the app use the full runtime (r1 s6; ADR-007).
- **Words.** A person's Projects are not "apps" or "mini apps" in any store text, review note or interface (r1 10-27 ruling, item 5). The manifest file is `pywidget.json` (r1 10-29 line). A widget shows its script's last run and is never called live (ADR-007 s10).
- **Storage, not battery,** among the premades; weather only as a Shortcut recipe, with no third-party weather source by default (r1 10-25 9:16 PM rulings).
- **Online pip** has no date until the reads in ADR-006 s10 and s12; install from file is not in 1.0 (plan 11-04).
- **Every 1.0 part has a row in the App Review readiness matrix** before submission (r1 s6).

### 3.3 Not in 1.0


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.3 Not in 1.0, scrolls sideways" style="--tw:930px" markdown="1">

| Item | Where it goes | Status |
| --- | --- | --- |
| Other people's block documents listed in the app (a live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>) | 1.2 at the earliest, only on Apple's written answer | pending decisions 5 and 6 (#274, #275) |
| Other people's Python listed in the app | No version until Apple answers | #276 ("for now"); ADR-006 S3b |
| iMessage | After a Messages extension is measured on a phone; not before 1.2 | pending decision 4 (#273) |
| Paid items, paying creators | Not planned | pending decision 9 (#278) |
| The web IDE and sync, the compatibility layer for the old app's scripts, Shortcut Lab, and the 11-04 plan's AI key, Control Center button and Share extension | "Maybe later" | pending decision 10 (#279) |
| Interactive widget buttons; advanced libraries (numpy, Pillow, matplotlib) | After 1.0 (plan 11-04, the 1.2 row) | dated when 1.0's date is firm |
| Debugger, formatter and r1's other 3.2 rows | After 1.0, as r1 3.2 placed them | unchanged |

</div>


## 4. The versions

Three versions are planned. Only 1.0 is fixed; 1.1 and 1.2 are working assumptions from the recommendations until their decisions are answered.

1. **1.0:** section 3.
2. **1.1:** fixes, whatever 1.0's fallbacks move out, the "maybe later" items the Investors bring back (decision 10, #279), and updates to installed items offered, never silent (decision 16, #285, pending).
3. **1.2:** a live shelf of other people's block documents, only if Apple says yes in writing (decisions 5 and 6); iMessage only after its phone measurement (decision 4); advanced libraries and widget buttons.

No version holds anything Apple's text rates High (other people's Python listed in the app) before Apple answers (ADR-006 13.2, S3b's gate).

## 5. Order of work, and what would make this fail

**Order** (#282 A; `plan.md` phases). A: the 12 premades draw on an Investor's iPhone, and one sitting reads the widget's memory. B: the IDE and widgets finished, beside A. C, after A's proof: the Project first, then the `read()` and `draw()` contract, permissions and the outside-code notice, the tab shell, the Gallery's three choices. D: the Builder, whose first phone proof fixes the date. Then Pages, then E, the release. Each phase ends with a phone proof on a TestFlight build in an Investor's hands.

**What would make this fail.**
- Phase A's cause is not found, and everything waits behind it (T-4180, T-3783).
- The Builder runs long: about 6.5 weeks on the Xcode slot and 3.5 beside it, 5 to 15 in all, an estimate (`05-timeline.md`).
- App Review refuses app-like Pages, or reads the Gallery as a storefront. Pages were taken on with that risk (#272); the review notes and ADR-006 13.2 carry the answer.
- Bank and tax details and the name (#90) stay open, so nothing can be sold or test-bought.

## 6. Records this depends on

- **ADR-008, the Builder:** written before any Builder code (`02-audit.md`; `06-decisions.md`). L17 is its draft. Not yet written.
- **A new ADR, the manifest and its migration** (#281 A). Not yet written.
- **ADR-002 and ADR-006** amended, and **ADR-007** rewritten as one text, on 2026-11-13 under the same approval (T-4272).
- **ADR-005:** history; its subject, the compatibility layer, is set aside (pending #279).
- **ADR-003, ADR-004, ADR-009:** unchanged.
- **ADR-010:** stands; its rules R5 and R6 retire with the manifest.

Ines, CEO
{% endraw %}

</div>
