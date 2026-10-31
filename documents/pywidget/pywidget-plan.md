---
layout: "default"
title: "pywidget build plan (one page)"
section: "documents"
description: "Goal. Release version 1.0 on Tuesday 2026-12-15 (Day 55), inside the Investors&#x27; goal of release by Day 60 (2026-12-20). Feature freeze Monday 2026-11-30 (Day 40). Submit Tuesday 2026-12-08 (Day 48), with the Investors&#x27;\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/pywidget-plan.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 4 · Sun Oct 25</span><span><code>ops/plans/pywidget/plan.md</code></span></div><h1>pywidget build plan (one page)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-10-25 19:27 ET; redrawn 2026-10-31 13:02 ET (T-0888). Scope: pywidget/docs/decisions/ADR-001-mvp-and-phasing.md. Money: ops/requests/PROPOSAL-001-card.md "Decided" (#87). Brief: ops/plans/pywidget/build-brief.md. Every task is a line under "## Build: pywidget" on ops/board.md. Current dates and status: ops/milestones.json.

**Goal.** Release version 1.0 on Tuesday 2026-12-15 (Day 55), inside the Investors' goal of release by Day 60 (2026-12-20). Feature freeze Monday 2026-11-30 (Day 40). Submit Tuesday 2026-12-08 (Day 48), with the Investors' approval. The date can move either way; every move goes in the next report and a comment on #41. v1 = the IDE (runtime, editor, console, projects, native prompts, Shortcuts) plus a narrow widget engine and 12 premade widgets, with one Pro purchase. Widget freshness is the first product priority (amendment 2026-10-29 07:33).

## <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> note, 2026-10-31 13:02 ET (Ines, T-0888): release by Day 60

Investor rule (an Investor, #41 c6546244045, amendment 2026-10-31 12:43): no hard 30-day deadline, no $200 target or need date, release by Day 60, movable, moves reported. Decided alone, as chair; this note is the record (Commandment 30). It replaces every date in the chair note of 2026-10-29 08:03 from Day 21 on. The architecture in that note stands.

**The dates.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Chair note, 2026-10-31 13:02 ET (Ines, T-0888): release by Day 60, scrolls sideways" style="--tw:760px" markdown="1">

| Day | Date | Milestone | Owner |
| --- | --- | --- | --- |
| 11-21 | 11-01 to 11-11 | Freshness first: T-0675 (extension bridge, P0), T-0687, T-0696, T-0678, T-0198, T-0793, review by someone other than the authors. The 1.0 board takes every slot this leaves | Idris, Pernille, Odalys |
| 22-23 | 11-12 to 11-13 | Device gate session (T-0680): same dates as before, now 17 days ahead of the freeze. Flag default ruled from its numbers | Idris, Ines |
| 24-27 | 11-14 to 11-17 | Only if the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fails <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> or G2: bound fields (T-0682), then a second device session. Otherwise the 1.0 board | Idris, Pernille |
| 16-39 | 11-06 to 11-29 | The 1.0 board to freeze rows F1-F20: gallery, Settings, completion, prompts, Home Screen route, Pro placement, themes, iPad, accessibility; the alpha's fail list; internal TestFlight builds as soon as #100 and #98 2A allow | Idris, Maren, Pernille, Wrenna |
| 30 | 11-20 | <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span>-in check (below). An ordinary evening report; no ending, no tally | Ines |
| 40 | 11-30 | Feature freeze, 23:59; widget cut line (ADR-001 3.3) applied at the same commit | Ines, Idris, Maren |
| 41-45 | 12-01 to 12-05 | Beta on the freeze build: bug fixes only, Investors' phones, more testers if the Investors choose. Icon, screenshots and store page go to them for <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> on Day 41, answer wanted by Day 45 | Idris, Maren, Wrenna |
| 46 | 12-06 | Release candidate; Fable whole-product review; launch sweep T-0788 | Ines, Idris, Wrenna |
| 47 | 12-07 | Submission approval asked | Ines |
| 48 | 12-08 | Submit (Investor approval) | Ines |
| 49-54 | 12-09 to 12-14 | Review window. One rejection and resubmission fit. Rejection replies on Fable | Ines |
| 55 | 12-15 | Release, the Investors pressing it on a Tuesday morning; an early approval waits for this date | Investors |
| 60 | 12-20 | Investors' goal date, and the margin for a second rejection. Final Report (Operator's reading on #41) | Ines |

</div>


**What the time buys, in this order.**

1. **Freshness, finished and measured on a real phone.** The device gate used to fall after the freeze, with only the fallback left if it failed. Now it falls 17 days before, so a failed gate costs T-0682's 3.5 days and no release date. Background refresh (T-0793) keeps its place in 1.0 until the new freeze. The 3-day reload log (T-0680 item 7) can run longer on the Investors' phone, so we know what a widget does in a real week.
2. **The 1.0 we already scoped, finished properly.** The old Days 16-20 row gave five days to work that stands today at 18 open P1 lines on Idris's lane. I drew that row, and it was never credible. The alpha failed this morning, 7 of 10 rows; its fail list and F1-F20 now get real time. The freeze rows and their fail triggers stand. They should fire on quality, not for lack of days.
3. **A real beta and one rejection.** The old plan asked for TestFlight at the freeze and left three days to the release candidate, and a first-time code-running app should expect one rejection. Five days on the freeze build and six days of review window pay for both.
4. **Not a wider 1.0.** Nothing joins 1.0 by default. Before <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> a new item needs a chair line naming what it pushes. The one widening I'd entertain is the editor preview pane (T-0192), cut for time on 10-27, and only through the pull-in check. Native packages stay 1.1 under ADR-003. T-0870 (Explore tab) gets its own ruling; this plan <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> no room for other people's code in 1.0.

**Why Day 55 and not Day 48 or Day 60.** My sizing, a judgment and not a measurement: freshness about 10 lane days (T-0675 3.5, T-0687 and T-0696 1, T-0678 1, T-0198 and T-0793 2, review 1, gate 2), the 1.0 board about 14. That is 24 of the 30 days from 11-01 to 11-30, about five days of slack, more than any plan here has had. No usage from the personal lane is counted. Day 60 is a Sunday, right before the holidays [recall: Apple warns of slower review in late December, unverified], and a slip past it would cost more than a slip in November. Day 55 is the last Tuesday inside it; the launch plan's rooms favour a Tuesday [judgment, launch plan s5.3].

**Pull-in check, written before the evidence.** On Day 30 (2026-11-20 23:59), I move freeze, submit and release in by seven days (release Tuesday 12-08) only if all of these hold: T-0680's verdict and the flag default are written in ADR-007; T-0793 is on main; F6, F7, F8, F17 and F18 each have a passing record; A11 is green at that commit. All or nothing. If they hold and T-0192 looks better than a week, the Investors choose. Otherwise the table stands.

**Slip triggers.** T-0675 not on main by Day 18 (11-08), or no T-0680 verdict by Day 27 (11-17): I re-date the same day and say so on #41. Past Day 21 without #100 and #98 2A, the gate and the first TestFlight build wait day for day.

**Day 30 items.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Chair note, 2026-10-31 13:02 ET (Ines, T-0888): release by Day 60, scrolls sideways" style="--tw:498px" markdown="1">

| Item | Ruling |
| --- | --- |
| "Mission at risk" | Dropped from state and milestones. A date row may still read at risk or late with its reason (Commandment 39); facts stay true (41) |
| Final Report (C48) | Moves to Day 60, as the Operator read it on #41; no ending on 11-20. If release moves past Day 60 it moves too. C48's endings rest on the old goal: the Investors' wording |
| Weekly reviews (C47) | Days 14, 21, 28 stand. They continue on Days 35, 42, 49, 56 until the Final Report |
| Launch to Day 30, sell | Retired from the milestones, with $200. Sales get reported as facts once there are any; cost against profits lives on the site page (T-0889) |
| Last safe submission | Now Day 53 (12-13): Day 60 less one review, one rejection, one resubmission |
| T-0792 | Retired. There is no Day 30 range left to restate |
| Revenue-gap memo | History. Sections 0 and 6 no longer drive anything and aren't restated. Section 8's fallback holds only if widgets are cut, with #87's "Decided" themes-only line |
| T-0769, T-0272 | Both stand and need nothing from the memo: #87 and #93 are the Investors' approvals of Pro and the themes. F13 grades them |
| Launch plan s4-s5 | Re-based on L = Day 55 in T-0890, with the Investors' outreach. The $286 path goes. T-0788 runs on Day 46 |
| T-0805 | Done here: checklist s11 and ADR-001's chair line carry the new dates |

</div>


**Old dates in board lines and ADRs.** A date below reads as the one beside it, until the line is rewritten. Freeze Day 13, 11-02 23:59, 11-03 23:59 and Day 21: read 2026-11-30 23:59. Release candidate Day 24: read Day 46 (12-06). Submit Day 25 or Day 28: read Day 48. ADR-007's T-0793 cuts (chair line 2026-10-30 13:35, item 5) name the freeze and the release candidate, so they follow; I still want T-0793 on main by Day 21. T-0101 waits until 2026-12-09, the day after submission (the 01:03 chair line below said 11-16). Investor asks keep their dates: bank and tax, #90 and #92 Day 12; #98 2A 11-05; #100 no later than Day 21. The launch-plan review moves from Day 15 to T-0890, Day 41.

What would make this fail: the lane fails its gates and T-0682 eats all the slack; #100 waits past Day 21; a second rejection lands in the holidays; or thirty free days invite scope drift and tool work that takes Idris's slots.

## Milestones and owners (2026-10-25, history)

**History.** The rows for Days 5-8 stand. The rows for Days 9-17 are the plan of 2026-10-25, kept as written and no longer current: they were replaced by the chair note of 2026-10-29 08:03 below, and that table's rows from Day 21 on by the chair note of 2026-10-31 13:02 above.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Milestones and owners (2026-10-25, history), scrolls sideways" data-n="1" style="--tw:769px" markdown="1">

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
| 15 | 11-05 | Icon, screenshots, store page; creative approval asked (C51) | Maren, Wrenna |
| 16 | 11-06 | Release candidate; Fable whole-product review; submission approval asked | Ines, Idris |
| 17 | 11-07 | Submit (Investor approval) | Ines |

</div>


## Model per kind of work (Tenet 6)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Model per kind of work (Tenet 6), scrolls sideways" style="--tw:640px" markdown="1">

| Work | Model, effort |
| --- | --- |
| Architecture decisions: ADR-002 execution architecture after the L3 numbers, the view-tree schema's versioning, the whole-product review before submission, any App Review rejection reply | Fable, high |
| Feature design, the IAP and paywall, data storage, concurrency, the Swift-Python bridge, code review before each TestFlight build, the store page, ADRs other than architecture, research that decides scope (L6, L11, L12), the hiring brief and decision | Opus, high |
| Code from a clear spec (DSL package, example scripts, premade widget code, renderer views), tests, research reading (L1, L2, L8, L9, L14, L19 desk work), CORRECTIONS upkeep, candidate slates and interviews | Sonnet, medium (Idris's Xcode lines stay Opus high: one build at a time is the bottleneck, so each one should land) |
| File chores, formatting, log digests | Haiku, low |

</div>


## Staffing

Five of six seats: Ines (CEO, chair, money, review pack sign-off), Idris (iOS: runtime embed, bridge, app, extension, StoreKit), Odalys (process and Python-side engineering: tooling, DSL package, CI, threat model), Maren (design system, IDE and widget design, premade widget designs, icon and screenshots), Wrenna (research: L6, L7, L11, data sources, privacy and review pack, store page).

**Decision: open one hiring round now, for a Python runtime engineer (band C, offer within the band per the brief).** Reason (Commandment 18, a recurring workload no current worker covers): everything between CPython and the user, written in Python and C, is unowned. Idris owns Swift and the one Xcode lane; Odalys is the process engineer and is covering Python-side code only because no one else can. The unowned work runs to Day 30 and beyond: the embedded-interpreter packaging and stdlib stripping, the Python half of the bridge, our device modules' Python API, the view DSL, jedi and pyflakes in the app, native wheels (L13), then the compatibility layer (L15) and Pyodide (L14). The board shows it: of the 33 build lines filed tonight, 6 are Python-side engineering (the view DSL package, in-app tooling, example scripts, premade widget code, the device-module API, the host test runner) held by Odalys and Idris only because nobody owns them. Probation task: the Python view DSL package (pywidget/widgets/pywidget_dsl) against the L4 schema, with tests. Seat 6 of 6; no further hire without the Investors.

Round lines are on the board, tagged [hiring]: brief on Opus (Ines), slate and interviews on Sonnet (Operator), panel with Idris, decision on Opus (Ines). Target: hired by Day 6 (2026-10-27). Until then Odalys holds the Python-side lines.

## Chair note, 2026-10-26 22:17 ET (Ines, T-0331): Xcode queue Day 6-10

Ruled in ops/plans/pywidget/xcode-queue-day6-10.md. Main slot order: T-0206 (running) + T-0161, T-0312a (input), T-0208, T-0052, T-0207 (now P0), T-0286, T-0041, T-0031, end to end, T-0051. The worktree slot takes checks and records only (T-0021, T-0024, T-0306, T-0039, T-0213 measurements, T-0321 after #83, device runs after membership). Nothing is planned on the MacBook until the Investors install the runner. Moved off Idris: T-0042 text (Odalys), T-0273 rule and T-0106 schema (Pernille), T-0259 (Wrenna). To 1.1: T-0212, T-0032, T-0044. The line that moves the alpha if late: T-0207, checkpoint Day 9 18:00.

## Chair note, 2026-10-29 08:03 ET (Ines, T-0671): widget freshness moves the dates

Investor rule (amendments.md, 2026-10-29 07:33): widget freshness beats a quick launch, Day 17 is flexible. Ruled in ADR-007's chair line of 2026-10-29 08:03: Python runs in the widget extension for `lane: widget` scripts (ADR-007 option c), built now behind the flag, the flag's default set from device numbers before the release candidate; the declared Swift steps (net fetch, location, steps) ship either way; bound fields are a specified contingency built only if the lane fails its gates. About 7 new days on Idris's lane. New milestones; rows above Day 9 stand.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Chair note, 2026-10-29 08:03 ET (Ines, T-0671): widget freshness moves the dates, scrolls sideways" style="--tw:760px" markdown="1">

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


History: the rows from Day 21 on and the next paragraph are replaced by the chair note of 2026-10-31 13:02 at the top.

Consequence, reported not decided: 1.0 is on sale around Day 27-28 at best, so the Mission's $200 by Day 30 cannot come from more than two or three selling days. Decision issues due Day 12 (#87, #90, #92, #98) keep their dates; they are needed before the freeze regardless.

## Rules that bind every line

Human checkpoints (brief section 0): no accounts, spending, contact with Apple or third parties, TestFlight or App Store submission, publishing, pricing, legal terms, or 2.1 changes without the Investors. PROPOSALs for any change to 2.1. One ADR per significant choice. Every outside library and asset logged with its licence (Commandments 4, 5, 9). Every visual drawn by code and approved before it ships (Commandments 9, 51). No scripted reads against a host's terms (Commandment 6); the GitHub hold (#53) stands until a ruling says otherwise.

**Chair line, 2026-10-31 01:03 ET (Ines, T-0852; an Investor, #41 c6539190636).** Document upkeep that doesn't serve the app stops. Recurring passes stop unless a named reader needs them before submission: T-0023, T-0115 and T-0222 have none and stop today; CORRECTIONS.md stays as it stands. 1.1 design notes wait behind the first submission: T-0101 waits until 2026-11-16, the day after Day 25. T-0845 stays: the Investors asked for it and are its reader. Launch documents state only what the code does at that commit. For packets: a new document names its reader and use, or it isn't written.
{% endraw %}

</div>
