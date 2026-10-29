---
layout: "default"
title: "pywidget build plan (one page)"
section: "documents"
description: "Goal. Submit version 1.0 on Day 25 (2026-11-15), App Review quality, with the Investors&#x27; approval; Day 28 (2026-11-18) if the extension lane fails its device gates and bound fields are built (chair note 2026-10-29\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/pywidget-plan.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 4 · Sun Oct 25</span><span><code>ops/plans/pywidget/plan.md</code></span></div><h1>pywidget build plan (one page)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-10-25 19:27 ET. Scope and dated milestones: pywidget/docs/decisions/ADR-001-mvp-and-phasing.md. Money: pywidget/docs/proposals/PROPOSAL-001-v1-paid-tier.md (waiting for the Investors; needed by Day 12). Brief: ops/plans/pywidget/build-brief.md. Every task is a line under "## Build: pywidget" on ops/board.md.

**Goal.** Submit version 1.0 on Day 25 (2026-11-15), App Review quality, with the Investors' approval; Day 28 (2026-11-18) if the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fails its device gates and bound fields are built (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 2026-10-29 below; the Day 17 plan is kept in the table as history). v1 = the IDE (runtime, editor, console, projects, native prompts, Shortcuts) plus a narrow widget engine and 12 premade widgets, with one Pro purchase. Widget cut line on Day 14 (ADR-001 3.3).

## Milestones and owners


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Milestones and owners, scrolls sideways" data-n="1" style="--tw:769px" markdown="1">

| Day | Date | Milestone | Owner |
| --- | --- | --- | --- |
| 5 | 10-26 | L3 spike numbers; L1, L2, L6, L7, L13 drafts; C13 v0 | Idris, Wrenna, Odalys, Maren |
| 6 | 10-27 | ADR-002 execution architecture (Fable); ADR-003 packages; ADR-004 editor engine; L4 schema v1 | Idris (author), Odalys (review), Ines (chair) |
| 7 | 10-28 | Python runs in the app with console and `input()`; Apple membership due | Idris |
| 8 | 10-29 | Editor with highlighting; fixture widget renders; Run Script intent | Idris; Odalys (DSL package) |
| 9 | 10-30 | End to end: editor to home-screen widget; Pro in StoreKit testing | Idris |
| 10 | 10-31 | Alpha; 6 premade widgets; 10 example scripts; native-package go/no-go. Pass rules: ops/plans/pywidget/alpha-day10-checklist.md (T-0332) | Idris, Odalys, Maren |
| 11 | 11-01 | Review pack: readiness matrix, privacy drafts, store page draft | Wrenna |
| 12 | 11-02 | iPad; 12 premade widgets; accessibility pass; pricing answer; Paid Apps due | Idris, Maren; Investors |
| 13 | 11-03 | Feature freeze; TestFlight asked for if membership is active | Ines |
| 14 | 11-04 | Widget cut line applied | Ines (chair), Idris, Maren |
| 15 | 11-05 | Icon, screenshots, store page; creative approval asked (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>) | Maren, Wrenna |
| 16 | 11-06 | Release candidate; Fable whole-product review; submission approval asked | Ines, Idris |
| 17 | 11-07 | Submit (Investor approval) | Ines |

</div>


## Model per kind of work (Tenet 6)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Model per kind of work (Tenet 6), scrolls sideways" style="--tw:640px" markdown="1">

| Work | Model, effort |
| --- | --- |
| Architecture decisions: ADR-002 execution architecture after the L3 numbers, the view-tree schema's versioning, the whole-product review before submission, any App Review rejection reply | Fable, high |
| Feature design, the IAP and paywall, data storage, concurrency, the Swift-Python bridge, code review before each TestFlight build, the store page, ADRs other than architecture, research that decides scope (L6, L11, L12), the hiring brief and decision | Opus, high |
| Code from a clear spec (DSL package, example scripts, premade widget code, renderer views), tests, research reading (L1, L2, L8, L9, L14, L19 desk work), CORRECTIONS upkeep, candidate slates and interviews | Sonnet, medium (Idris's Xcode lines stay Opus high: one build at a time is the bottleneck, so each one should land) |
| File chores, formatting, log digests | Haiku, low |

</div>


## Staffing

Five of six seats: Ines (CEO, chair, money, review pack sign-off), Idris (iOS: runtime embed, bridge, app, extension, StoreKit), Odalys (process and Python-side engineering: tooling, DSL package, CI, threat model), Maren (design system, IDE and widget design, premade widget designs, icon and screenshots), Wrenna (research: L6, L7, L11, data sources, privacy and review pack, store page).

**Decision: open one hiring round now, for a Python runtime engineer (band C, offer within the band per the brief).** Reason (Commandment 18, a recurring workload no current worker covers): everything between CPython and the user, written in Python and C, is unowned. Idris owns Swift and the one Xcode lane; Odalys is the process engineer and is covering Python-side code only because no one else can. The unowned work runs to <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> and beyond: the embedded-interpreter packaging and stdlib stripping, the Python half of the bridge, our device modules' Python API, the view DSL, jedi and pyflakes in the app, native wheels (L13), then the compatibility layer (L15) and Pyodide (L14). The board shows it: of the 33 build lines filed tonight, 6 are Python-side engineering (the view DSL package, in-app tooling, example scripts, premade widget code, the device-module API, the host test runner) held by Odalys and Idris only because nobody owns them. Probation task: the Python view DSL package (pywidget/widgets/pywidget_dsl) against the L4 schema, with tests. Seat 6 of 6; no further hire without the Investors.

Round lines are on the board, tagged [hiring]: brief on Opus (Ines), slate and interviews on Sonnet (Operator), panel with Idris, decision on Opus (Ines). Target: hired by Day 6 (2026-10-27). Until then Odalys <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the Python-side lines.

## Chair note, 2026-10-26 22:17 ET (Ines, T-0331): Xcode queue Day 6-10

Ruled in ops/plans/pywidget/xcode-queue-day6-10.md. Main slot order: T-0206 (running) + T-0161, T-0312a (input), T-0208, T-0052, T-0207 (now P0), T-0286, T-0041, T-0031, end to end, T-0051. The worktree slot takes checks and records only (T-0021, T-0024, T-0306, T-0039, T-0213 measurements, T-0321 after #83, device runs after membership). Nothing is planned on the MacBook until the Investors install the runner. Moved off Idris: T-0042 text (Odalys), T-0273 rule and T-0106 schema (Pernille), T-0259 (Wrenna). To 1.1: T-0212, T-0032, T-0044. The line that moves the alpha if late: T-0207, checkpoint Day 9 18:00.

## Chair note, 2026-10-29 08:03 ET (Ines, T-0671): widget freshness moves the dates

Investor rule (amendments.md, 2026-10-29 07:33): widget freshness beats a quick launch, Day 17 is flexible. Ruled in ADR-007's chair line of 2026-10-29 08:03: Python runs in the widget extension for `lane: widget` scripts (ADR-007 option c), built now behind the flag, the flag's default set from device numbers before the release candidate; the declared Swift steps (net fetch, location, steps) ship either way; bound fields are a specified contingency built only if the lane fails its gates. About 7 new days on Idris's lane. New milestones; rows above Day 9 stand.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Chair note, 2026-10-29 08:03 ET (Ines, T-0671): widget freshness moves the dates, scrolls sideways" style="--tw:760px" markdown="1">

| Day | Date | Milestone | Owner |
| --- | --- | --- | --- |
| 9 | 10-30 | T-0512 a tap writes the widget (the app lane, needed by every option); bound-fields names (T-0679) | Idris; Pernille |
| 10 | 10-31 | Alpha on what has landed (checklist T-0332's pass rules stand); lane Python half (T-0676) | Idris, Odalys, Maren; Pernille |
| 11-13 | 11-01 to 11-03 | Lane Swift half behind the flag (T-0675); `pywidget.net` (T-0677) | Idris, Pernille |
| 14-15 | 11-04 to 11-05 | Refresh intent in the lane (T-0678); review of the lane by someone other than its authors | Idris, Odalys |
| 16-20 | 11-06 to 11-10 | The 1.0 board that was planned for Days 8-13: editor completion, Settings, gallery, Pro purchase, iPad, accessibility; review pack and store page draft | Idris, Maren, Wrenna |
| 21 | 11-11 | Feature freeze; TestFlight asked for | Ines |
| 22-23 | 11-12 to 11-13 | Device gate session (T-0680, needs #100 by Day 21; else the release candidate waits day for day); widget cut line; flag default ruled | Idris, Ines, Maren |
| 24 | 11-14 | Release candidate; Fable whole-product review; submission approval asked | Ines, Idris |
| 25 | 11-15 | Submit (Investor approval). If the gates failed: bound fields built Days 23-25 (T-0682), submit Day 28 (11-18) | Ines |

</div>


Consequence, reported not decided: 1.0 is on sale around Day 27-28 at best, so the Mission's $200 by Day 30 cannot come from more than two or three selling days. Decision issues due Day 12 (#87, #90, #92, #98) keep their dates; they are needed before the freeze regardless.

## Rules that bind every line

Human checkpoints (brief section 0): no accounts, spending, contact with Apple or third parties, TestFlight or App Store submission, publishing, pricing, legal terms, or 2.1 changes without the Investors. PROPOSALs for any change to 2.1. One ADR per significant choice. Every outside library and asset logged with its licence (Commandments 4, 5, 9). Every visual drawn by code and approved before it ships (Commandments 9, 51). No scripted reads against a host's terms (Commandment 6); the GitHub hold (#53) stands until a ruling says otherwise.
{% endraw %}

</div>
