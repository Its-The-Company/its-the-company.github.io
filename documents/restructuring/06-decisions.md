---
layout: "default"
title: "The Restructuring, phase 6: decisions and hand-over"
section: "documents"
description: "The Investors&#x27; decisions, numbered, with options and a recommendation each; the changes after &quot;approve&quot;; ideas set aside."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/06-decisions.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 23 · Fri Nov 13, 8:07 AM ET</span><span><code>documents/restructuring/06-decisions.md</code></span></div><h1>The Restructuring, phase 6: decisions and hand-over</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Commit read: f4edb334aa. Gathered from phases 1, 2, 3 and 5, [`07-documentation.md`](07-documentation.html) and the mock-ups. Nothing was measured; nothing takes effect until you answer. For #41: [`06-summary.md`](06-summary.html).

## Decisions

Answer by number; "approve the recommendations" takes them all. An item without options is the recommendation. In brackets, the source: P1.3 is phase 1, question 3; D, [`07-documentation.md`](07-documentation.html); M, the mock-ups.

**Scope and versions**

1. **Does 1.0 wait for the Builder?** (A) Yes: likely late March 2027 (early February to early June), fixed at the Builder's first phone proof. (B) No: the IDE and widgets ship 12-15, the Builder in 1.1. Recommend A; the release moves past Day 60. [P2.1, P5.1]
2. **Near Day 60 (12-20).** (A) Nothing. (B) The IDE and widgets to outside testers on TestFlight. (C) A store release. Recommend B. [P5.2]
3. **Pages.** (A) 1.0. (B) 1.1, as data our SwiftUI draws; 1.0 keeps the plain run screen. (C) Never. Recommend B. [P1.8, P2.4, P5.7]
4. **iMessage.** (A) 1.0. (B) After a Messages extension is measured on a phone; not before 1.2. (C) Drop. Recommend B. [P1.9, P2.4]
5. **The marketplace.** (A) 1.0: our own Gallery inside the app, and sharing by file; then our examples on the site; at 1.2 a live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> of other people's block documents, only on Apple's answer. (B) A live shelf in 1.0. Recommend A. [P1.1, P2.5, P5.7]
6. **You write to Apple** about guideline 4.7, the Mini Apps program and "storefront", once the foundations build is on TestFlight. We draft, you send. [P1.3, P5.4]
7. **Components and listings.** (A) A component is a source, a view or the pair: listed in the app as blocks, passed as Python only by file; our Gallery items offer their parts; no listing has an icon, rating or price. (B) Other people's Python listed in the app. (C) Whole projects only. Recommend A. [P1.4, P3.2, P3.7]
8. **Items shared with others carry text and system symbols only,** at first. [P3.8]
9. **Paid items and Pro.** (A) Nothing listed is sold, no creator is paid; all 12 premades are free, unmarked; Pro stays background refresh and themes (my reading of #142). (B) #87's seven Pro premades, marked. (C) Paid listings. Recommend A. [P1.2, P2.8, M]
10. **Set aside** the web IDE, the old-app compatibility layer, Shortcut Lab, and the 11-04 plan's AI key, Control Center button and Share extension. [P2.7, P5.7]
11. **Phase 2's keep, change or drop tables** (ten founder decisions, the ADRs) stand as listed under Changes, unless you name exceptions. [P2]

**Structure and safety**

12. **The Project is the unit:** one folder, one manifest that is the truth, one ID, before any public release. [P2.3, P3.1]
13. **Phone first:** the premades failure (T-3783) is closed before restructuring; each layer is proven on a phone before the next. [P2.2]
14. **Where Python runs for a widget.** (A) In the app; Python inside the widget gets one phone sitting and is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> without a pass. (B) That <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> keeps first call. Recommend A. It changes Tenet 1's 10-29 priority ("Python in the widget preferred"), whose wording is yours. [P1.7, P2.6]
15. **Outside code gets less reach than the person's own:** no keys, no other project's files, only what its manifest declares; its code shown before first run. [P1.6]
16. **Updates to an installed copy.** (A) None. (B) Offered, never silent. (C) Automatic. Recommend B. [P3.3]
17. **Navigation.** (A) The four approved tabs, three ways to start on Projects, one skippable first-run question. (B) Tabs by tool. (C) Tabs by audience. Recommend A. [P3.4, P3.5]
18. **Blocks and code.** (A) One-way convert. (B) Generated Python always on view; "Edit as code" detaches a file; hand-written sources and views join as custom blocks (1.25 weeks, estimated; views cut first). (C) Edit either side: 2.5 to 3 weeks more. Recommend B. [P3.6, P5.3]
19. **No server or account in 1.0.** At the live shelf: Sign in with Apple, to publish only; CloudKit first. [P1.10]
20. **iOS 27 features** are used where present, never required. [P1.11]

**Identity (gate 2)**

21. **Mission statement.** (A) Keep "a Python IDE and widget builder". (B) "pywidget lets people make, run and use Python-powered widgets and other small services on iPhone and iPad: write Python, build with blocks, or pick one ready-made." Recommend B. The store page says "community projects" only once a release has them. [P1.5, P2]
22. **Visual direction.** (A) Evolve Paper and Studio: approved colour and type, new arrangement. (B) Programmer-first: grey grounds, monospace titles, dense panes; departs from the approved look. (C) Creative-first: tiles, 12 new tints, rounded titles, larger type; the Builder and finished things first, code a tap away; departs too. Recommend A as the base, with C's Builder stage (the widget on top, the chosen block ringed), C's plain-words run card and the three start buttons B and C share. Why A still, with C final: no new look; no audience favoured; 7 projects a screen to C's 4; an item's Python shown before install, not a tap away. Round 2 adds first run, a Page, larger text, Increase Contrast, Tinted and Clear widgets, and Safari; Idris checks the sample Python and that iOS reports placed sizes (C's "added" line, recalled); he and Pernille size B's and C's run data. [M]

**People, money and upkeep**

23. **Reports and takedown notices:** you own the published address and its replies and register the DMCA agent; workers sort and draft. [P1.12]
24. **Age:** 13 or over; an age check gates the marketplace; no likes, comments or feeds. [P1.13]
25. **Bank and tax before the first beta; the name (#90) four weeks before submission.** [P5.5]
26. **Three to five people you choose try the Builder without knowing Python,** before the freeze. [P5.6]
27. **An iPad for the proofs.** (A) One you own. (B) Simulator only, said in each done-note. (C) Buy one, about $350 (recalled). Recommend A. [P5.8]
28. **Money (gate 3): nothing to approve today.** Each item returns as a request card when needed: the $99 renewal (2027-10-28); a domain at release, $10 to $20 a year; at 1.2, hosting at $0 to $25 a month and a $6 DMCA filing. [P5 s5]
29. **Documentation.** A plain page and a code-drawn diagram are a done condition of every app part, from the free, company-owned <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>; a changed explanation is flagged, a missing anchor blocks; public, under Documents; the step enters the Handbook. [P2.9, P3.9, D.1 to D.6]

## Changes after "approve"

- **ADR-001:** one clean revision: three audiences, the Builder in 1.0, the Project, three versions; the old text archived.
- **ADR-002:** kept; gains Page-only parts, a checker per output, the key tying a view to its block.
- **ADR-006:** <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> kept, stages re-dated, the component defined.
- **ADR-007:** one new text: Python in the app, one run queue; the in-widget lane parked unless its sitting passes.
- **ADR-008, the Builder,** before any Builder code. **A new ADR:** the manifest and its migration.
- **ADR-005,** and `gate-session-build` after its verdict: history. **ADR-010:** rules R5 and R6 retire with the manifest. **ADR-003, 004, 009:** unchanged.
- **[`ops/plans/pywidget/plan.md`](../pywidget/pywidget-plan.html):** a chair note replaces the 11-04 dates with phases A to E and their phone proofs; `ops/milestones.json` follows.
- **`ops/state.md`:** the Target, Stage and product lines.
- **`creative/approved.md`:** the chosen direction and mission statement, with your words and links.
- **Handbook:** the documentation step, by decision record. The charter's mission line and Tenet 1 are yours to edit; we send wording.
- **The board (input to T-4116).** The 14 feature lines stay: T-4180 is phase A; T-4181 to T-4192, phase B; T-4193 runs to release. New features, each done when seen on a phone:
  - Foundations: manifest, one ID, migration; the public `read()` and `draw()` contract; "touches" enforced and the outside-code notice; tab shell and first run; the Gallery's three choices.
  - The Builder: block format, catalog, compiler; premades as blocks; the block editor; code view and "Edit as code"; custom block; "Save as component" and sharing by file.
  - Set aside with reasons, never deleted: the in-widget lane beyond its sitting, and decision 10's items.
- Step D2 (T-4240): three of its diagrams are on main (15e820baff, 11-13).

## Maybe later

- Editing blocks and code either way.
- Other people's Python listed in the app; paid items; paying creators.
- Pages in a web view; a message card; Live Activities; push for widgets.
- Decision 10's six items; sync between devices.
- Projects sharing code without copying; a project map.

## Sources

Apple's pages, fetched 2026-11-13, saved under `research/inbound/apple/`. App Review: "at least 50% of submissions in less than 24 hours and 90% in less than 48 hours" (https://developer.apple.com/distribute/app-review/). "The Apple Developer Program annual fee is 99 USD" (https://developer.apple.com/support/enrollment/). The late-December slowdown and the iPad's price stay recalled.
{% endraw %}

</div>
