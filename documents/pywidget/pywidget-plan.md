---
layout: "default"
title: "pywidget build plan (one page)"
section: "documents"
description: "Goal (11-04, replaced by the chair notes of 2026-11-13 10:53 AM, 2026-11-15 6:34 AM, 2026-11-15 10:00 PM, 2026-11-15 10:15 PM and 2026-11-17 1:18 PM below; kept as written). Release version 1.0 on Tuesday 2026-12-15\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/pywidget-plan.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 4 · Sun Oct 25</span><span><code>ops/plans/pywidget/plan.md</code></span></div><h1>pywidget build plan (one page)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-10-25 7:27 PM ET; redrawn 2026-10-31 1:02 PM ET (T-0888). Scope: pywidget/docs/decisions/ADR-001-mvp-and-phasing.md. Money: ops/requests/PROPOSAL-001-card.md "Decided" (#87). Brief: ops/plans/pywidget/build-brief.md. Every task is a line under "## Build: pywidget" on ops/board.md. Current dates and status: ops/milestones.json.

**Goal (11-04, replaced by the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> notes of 2026-11-13 10:53 AM, 2026-11-15 6:34 AM, 2026-11-15 10:00 PM, 2026-11-15 10:15 PM and 2026-11-17 1:18 PM below; kept as written).** Release version 1.0 on Tuesday 2026-12-15 (Day 55), inside the Investors' goal of release by Day 60 (2026-12-20). Feature freeze Monday 2026-11-30 (Day 40). Submit Tuesday 2026-12-08 (Day 48), with the Investors' approval. The date can move either way; every move goes in the next report and a comment on #41. v1 = the IDE (runtime, editor, console, projects, native prompts, Shortcuts) plus a narrow widget engine and 12 premade widgets, with one Pro purchase. Widget freshness is the first product priority (amendment 2026-10-29 7:33 AM).

## Chair note, 2026-11-21 10:10 AM ET (Ines, T-4770): the release re-estimated from measured build speed; likely Thu 2027-07-15 stands

an Investor asked on #41 (c6961475730, 4:26 PM 11-17) whether the July date was estimating error. The answer, in [`ops/plans/T-4770-reestimate.md`](../company/t-4770-reestimate.html): mostly no. On the work measured to its end, the company has built at about its estimates or slower (two points only: phase A 0.57 by its done-line, near 1.4 with its review tail; the freshness group at least 1.7). The date comes from the scope added 11-13 to 11-16, not from pessimistic figures.

Two checks by Idris moved the line after 11-17 (07-12 below). Snap-to-layout went to 4.25 slot weeks (T-4870, 11-18: Wed 2027-07-21). Two-way editing went to 2.0 on the slot (T-4871, 11-19, abd01d6c48: **Thu 2027-07-15, Day 267, range 2027-04-04 to 2027-12-01**). `ops/milestones.json` carries that line. The measured-rate script (`ops/plans/T-4770-release-estimate.py`, with both checks) gives likely Fri 2027-07-16, one day later, range 2027-02-16 to 2027-12-04. The likely dates agree, so the milestones do not move. The script's earlier best end rests on phase A's 0.57 alone, which Idris puts near 1.4 with its tail, so the milestones keep the 04-04 best end.

Still not checked by Idris: Foundations (5 slot weeks, 3 to 8) and Pages (5, 3 to 8), both my figures from 05-timeline.md. His check is T-5432 (Idris, small). This is a small move under an Investor's rule (#325 c6977134306): it goes in the next report, not in its own comment.

## Chair note, 2026-11-17 1:18 PM ET (Ines, T-4689): phase A closed, Developer mode next, phase C may start beside B; the release moves 1 day

an Investor ruled at 11:37 PM ET 11-16 (11:37 PM ET, #41 c6938494530; log/rulings.md 2026-11-16 11:37 PM, in the Handbook's standing instructions). Recorded as chair; this note is the record.

- **Phase A is done (11-16).** The premades proof counts as complete: the free premades were seen drawing on Jeremy's iPhone (build 6, #306), and the Simulator tests count for the Pro premades, which no phone can test until Developer mode exists. T-4678 ticks the premade feature line and frees its steps. Not done in phase A: reading the widget extension's memory on a phone (T-0680). It moves into phase B, whose lines T-2097 and T-2196 (part of T-4181) already carry it, and is read at B's phone proof.
- **Phase B stays first.** Nothing below takes the Xcode slot from it.
- **Developer mode is built next (T-4688, Idris), inside phase B.** It extends T-4093's tester switch (Settings > Testers, `Shared/TesterPro.swift`); it does not add a second path. It must appear only in Debug and TestFlight builds, never in an App Store build, so no customer unlocks Pro without paying. B's phone proof tests Pro through it. My size: 3 slot days (2 to 5), not yet checked by Idris; his first note replaces it.
- **Phase C may start now, beside B.** #282 A held C and D behind phase A's proof; that hold is <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span>. C's interface work (the tab shell and the Gallery, on the visual direction chosen on #291: A with C's three parts, 10:42 PM 11-16) starts where it does not take the slot from B or Developer mode; if it would, it waits, as the ruling allows. C's start is 11-17. Its end is still counted the cautious way, after B on the slot. Overlap that really happens pulls the dates in, and I report it when I see it. Phase D still starts after C.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Chair note, 2026-11-17 1:18 PM ET (Ines, T-4689): phase A closed, Developer…, scrolls sideways" style="--tw:1043px" markdown="1">

| Date (likely line) | Was | Now | Why |
| --- | --- | --- | --- |
| Phase A | Fri 2026-11-20 | **Mon 2026-11-16, done** | Investors' count, 4 days in place of 1 week |
| Phase B ends | Fri 2026-12-11 | Sat 2026-12-12 (Day 52) | A 3 days early, Developer mode +4.2 calendar days: net +1.2 |
| Bank and tax due | Sun 2026-12-06 | Mon 2026-12-07 | The day before B's five days on phones (Tue 12-08 to Sat 12-12) |
| Phase C | Mon 2026-12-14 to Sat 2027-01-30 | Tue 2026-11-17 to Mon 2027-02-01 | Starts beside B; end +2 days after rounding |
| Phase D ends | Mon 2027-04-26 | Tue 2027-04-27 | Follows C |
| Pages end | Sun 2027-06-20 | Mon 2027-06-21 | Follows D |
| Name (#90) | Sat 2027-05-29 | Sun 2027-05-30 | Submission less four weeks |
| Submission | Sat 2027-06-26 | Sun 2027-06-27 | Five days of beta from Tue 06-22 |
| **Release 1.0** | Sun 2027-07-11 | **Mon 2027-07-12 (Day 264)** | Still likely July 2027; range now 2027-04-10 to 2027-11-26 (was 04-06 to 11-29) |
| Final Report (Commandment 48) | 2027-07-11 | 2027-07-12 | Moves with the release |

</div>


Script: `ops/plans/T-4266-release-range.py`, its new last line (A at its actual 4 days, Developer mode 3 days on the slot). Dates: `ops/milestones.json`. Reported on #41 the same day.

What would make this fail: Developer mode is bigger than 3 days (the reset to first launch touches user data and needs care), or the App Store build check is weak and Pro can be unlocked by a customer, which App Review would reject (guideline 3.1.1: Pro is unlocked only by in-app purchase); C's interface work, run beside B, slows B's merges while main is held at the merge limit. If B slips, everything after it slips, and I say so that day.

## Chair note, 2026-11-17 8:01 AM ET (Ines, T-4668): bank, tax and name dates

an Investor answered Restructuring 25 with **A** (9:43 PM ET 11-16, #294 c6936383204; log/rulings.md): bank and tax before the first beta, the name (#90) four weeks before submission. Dated from the current likely release in `ops/milestones.json` (Sunday 2027-07-11), not the card's mid-February estimate. Recorded as chair; this note is the record.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Chair note, 2026-11-17 8:01 AM ET (Ines, T-4668): bank, tax and name dates, scrolls sideways" style="--tw:1087px" markdown="1">

| What | Due (likely line) | Dated from | Who |
| --- | --- | --- | --- |
| Bank and tax in App Store Connect | **Sun 2026-12-06** (Day 46) | Phase B's five days on phones, Mon 12-07 to Fri 12-11, which carry the first test purchase of Pro. No outside beta exists (#295 B), so this internal one is the first that needs them | Investors |
| The app's public name (#90) | **Sat 2027-05-29** (Day 220) | Submission less four weeks | Investors (creative identity); Wrenna's research, T-4693 |
| Submission of 1.0 | Sat 2027-06-26 (Day 248) | Phase E: five days of beta from Mon 06-21, then submit; 15 days left for review and one rejection | Investors submit |

</div>


Each date moves with its phase and the release; each move goes on #41 that day. The Day 12 date for bank and tax (11-02) was missed and stays recorded as late (`paid-apps` row). Rows: `bank-tax`, `app-name`, `submit`. Timeline: [`documents/restructuring/05-timeline.md`](../restructuring/05-timeline.html) question 5 and s6.

What would make this fail: bank and tax are still not entered on 12-06, so phase B's purchase proof waits and T-0771 (the Pro purchase setup) with it; the name slips past 05-29 and the store page, support email and screenshots wait behind it.

## Chair note, 2026-11-15 10:15 PM ET (Ines, T-4551): ADR-011 as accepted, and the release moves 3 more days

ADR-011 was accepted at 10:05 PM (Idris, 137c133087; Pernille's re-read and Maren's review answered in its s14). The answers added work to four of the steps I sized at 10:00 PM, inside their ranges: step 3 (the fallback notice read by VoiceOver, with Close and Change), step 8 (the setting's default row, link errors, per-name rows), step 6a (a second lock, `run.lock`, held for the whole run) and step 6 (the drawing rules and hit-area screenshots). I add half a slot day to each on the likely line; best and worst stay. ADR-011 s13 gives no time figures, so these are still my figures, not Idris's; his sizing of the steps (T-4552 to T-4559) replaces them when it comes. Recorded as chair; this note is the record.

- The tap choice in phase C: 2.2 weeks (1.2 to 3.2), was 2. Run-a-function and buttons in Pages: 2.8 weeks (1.4 to 5.2), was 2.6.
- The release: from Thursday 2027-07-08 to Sunday 2027-07-11 (Day 263), 3 days later. Range unchanged, 2027-04-06 to 2027-11-29.
- Phase C ends Saturday 2027-01-30, was Friday 2027-01-29. Phase D ends Monday 2027-04-26, was Sunday 2027-04-25. Pages end Sunday 2027-06-20, was Thursday 2027-06-17. The Final Report moves with the release, to 2027-07-11 (Commandment 48).
- Script: `ops/plans/T-4266-release-range.py`, its new last line. Dates: `ops/milestones.json`. The 10:00 PM note's tables below keep their figures as written.

What would make this fail: the same as at 10:00 PM. Idris's sizing comes in higher; each move goes on #41 that night.

## Chair note, 2026-11-15 10:00 PM ET (Ines, T-4543): widget taps and buttons in 1.0, and the release moves about 4.5 weeks

an Investor asked twice on #41 tonight. At 8:59 PM (c6905224905): a person chooses what a widget's tap does (its Page, its code, pywidget's home, a link, or a Python function), designed so buttons reuse it. At 9:11 PM (c6905386313): "Add buttons to 1.0!". Both are in `log/rulings.md`. The design is ADR-011 (Idris, proposed; Pernille's re-read at 42677816c5 leaves two one-sentence fixes, H1 and H2; Maren's review of sections 3, 8 and 9 is open). ADR-001 moves buttons from the 1.2 row to 1.0 by its dated line of tonight. Recorded as chair; this note is the record.

**Where they sit in the phase order.** Two places, by what each step needs first:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Chair note, 2026-11-15 10:00 PM ET (Ines, T-4543): widget taps and buttons in…, scrolls sideways" style="--tw:1249px" markdown="1">

| ADR-011 step (s13) | Who | Phase, feature | Slot days (range) | Needs first |
| --- | --- | --- | --- | --- |
| 1. Read one action value strictly | Idris | C, T-4476 | 2 (1 to 3) | ADR-011 accepted |
| 2. Store tap and button actions in the manifest | Idris | C, T-4476 | 2 (1 to 3) | the manifest ADR (T-4476's first step) |
| 3. Route a widget tap by its chosen action | Idris | C, T-4476 | 3 (2 to 5) | 1, 2; H1's fix; Maren's notices (s8) |
| 7. Draw the When tapped setting | Maren | C, beside the slot | not on the slot | her s9 review |
| 8. Build the When tapped setting | Idris | C, T-4476 | 3 (2 to 5) | 7 |
| 5. Python contract and action run | Pernille | Pages, beside the slot | not on the slot (about a week) | ADR-011 accepted |
| 4. Sign the links that run a function | Idris | Pages, T-4478 | 2 (1 to 4) | H1's fix |
| 6a. One state commit across app and widget | Idris | Pages, T-4478 | 4 (2 to 8) | H2's fix; Odalys reviews the s5 delta |
| 6. Draw buttons as links or intents | Idris | Pages, T-4478 | 5 (3 to 10) | 4, 5, 6a; Maren's <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> (s3) |
| 9. Check widget buttons on phones | Idris | Pages, T-4478 | 1 (0.5 to 2) | 6; an Investor phone |
| 10. Choose and build the premades' buttons | Maren with Ines; Idris builds | Pages, T-4478 | 1 (0.5 to 2) | 6; Maren's caps (s3) |

</div>


Why there. The tap choice is stored in the project manifest, which phase C makes, so it cannot come earlier, and it is the cheaper half. Running a function from a tap or a button, and the buttons themselves, go with Pages because a Page's tap and a widget's button call Python the same way, through the app's one run queue; building them together keeps one path. They stay after the Builder so they do not delay the Builder's first phone proof, which fixes the firm date (#270 A). Later also gives the in-widget memory figure time to settle: 23 to 25 MB free at rest on an iPhone 15 so far (T-4282); the Investors' size-<span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> export is still to come (T-4536).

**The release.** Likely early July 2027: Thursday 2027-07-08 on the likely line, Day 260. Range early April to late November 2027 (2027-04-06 to 2027-11-29). The 11-13 method, unchanged, with two figures added on the slot: the tap choice, 2 weeks (1.2 to 3.2), and running a function and the buttons, 2.6 weeks (1.4 to 5.2). They are my figures, step by step from ADR-011 s13, not yet checked by Idris, who builds them. Pernille's and Maren's steps run beside the slot and are not counted, as the method counts the Builder. Possible overlap with the Pages work is not netted off. Script: `ops/plans/T-4266-release-range.py`.

**What moved, and by how much.**
- The release: from Sunday 2027-06-06 to Thursday 2027-07-08, 32 days, about 4.5 weeks later. The best end moves 18 days (2027-03-19 to 2027-04-06), the worst 59 days (2027-10-01 to 2027-11-29).
- Of the 4.5 weeks, the tap choice (8:59 PM) is 2 and the buttons with run-a-function (9:11 PM) are 2.6. The buttons cost more because a button that runs Python inside the widget, without opening pywidget, runs in the widget's small memory and a 2-second budget, and a second Python (the widget's beside the app's) must never lose a tap's result. That needs its own state commit and <span title="A test written in advance. If it fires, we drop the idea.">kill</span> tests (step 6a). A button that opens something has none of that cost.
- Phase C: ends Friday 2027-01-29, was 2027-01-15. Phase D, the Builder: ends Sunday 2027-04-25, was 2027-04-11. Pages: ends Thursday 2027-06-17, was 2027-05-16. The Final Report moves with the release, to 2027-07-08 (Commandment 48).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Chair note, 2026-11-15 10:00 PM ET (Ines, T-4543): widget taps and buttons in…, scrolls sideways" style="--tw:816px" markdown="1">

| Phase | Weeks (range) | Likely end |
| --- | --- | --- |
| A. Prove what exists | 1 (0.5 to 2) | Fri 2026-11-20, unchanged |
| B. Finish the IDE and widgets, beside A | 3 (2.5 to 5) | Fri 2026-12-11, unchanged |
| C. Foundations, with the widget tap choice | 7 (4.2 to 11.2) | Fri 2027-01-29 |
| D. The Builder | 12.25 on the slot (7 to 19), 3.5 beside | Sun 2027-04-25 |
| Pages, with run-a-function and widget buttons | 7.6 (4.4 to 13.2) | Thu 2027-06-17 |
| E. Release 1.0 | 3 calendar (2 to 4) | **Thu 2027-07-08** |

</div>


**A cheaper choice, not taken.** On iOS 18 to 26, a button that runs a function could always open pywidget to run it, and run in the background only on iOS 27. That drops step 6a and part of step 6, about a week, but on today's phones every such button would open the app, which is what Apple says a button should do more than. I keep the full design; the Investors can choose the cheaper one.

**Board.** Steps 1, 2 and 5 are on the board now, as steps of T-4476 and T-4478, each starting when ADR-011 is accepted. The rest wait for the open review points: 3, 4, 6a and 6 on Pernille's H1 and H2, 3 on Maren's notices, 6 and 10 on her caps, 7 and 8 on her setting review, and 9 on step 6.

What would make this fail: Idris's check of my figures comes in higher; the in-widget memory on an older phone is far below 23 MB, so fewer buttons run in the widget (the design holds; the feel changes); taps on one widget often collide (`busy`), which shortens the in-widget budget or needs 1.1's queue. Each moves the likely line, and each move goes in that day's report and on #41.

## Chair note, 2026-11-15 6:34 AM ET (Ines, T-4467): ten more answers of 11-14, and the release re-worked

an Investor answered ten more items on Saturday 11-14, between 4:34 and 5:42 PM ET. Each answer is one letter; quoted from `log/rulings.md`, where each has its link. Recorded as chair; this note is the record. Phases A, B and C keep their dates. Phase D, Pages, the release and the Final Report move later.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Chair note, 2026-11-15 6:34 AM ET (Ines, T-4467): ten more answers of 11-14…, scrolls sideways" style="--tw:960px" markdown="1">

| Item | His answer | What it means for the plan |
| --- | --- | --- |
| #303, the main session on a personal account | "A" (4:34 PM) | Kept. Operations, not the app: Odalys writes the security-guard change as its own card (T-3371), then the dispatcher half (T-3365). No product date moves |
| 18. Blocks and code (#287) | "C" (4:51 PM), against our recommendation B | Blocks and written code can both be edited, each kept in step with the other, in 1.0. About 2.75 more weeks on the slot (2.5 to 4.5). The custom block stays |
| 21. Mission statement (#290) | "B" (4:56 PM) | "pywidget lets people make, run and use Python-powered widgets and other small services on iPhone and iPad: write Python, build with blocks, or pick one ready-made." In `creative/approved.md` item 7; the charter's Mission line goes by proposal #309, which needs their approve |
| 17. Navigation (#286) | "A" (4:58 PM) | The four approved tabs, Projects as home, three ways to start on Projects, one first-run question that can be skipped. Phase C's tab shell, as planned |
| 20. iOS 27 features (#289) | "A" (4:59 PM) | Used where a phone has them, never required; the minimum iOS does not change |
| Builder drag and drop (#300) | "A" (5:21 PM) | Snap to layout on the live widget, handles and a style panel, every move also possible without dragging. About 3 more weeks on the slot (1.5 to 4.5). Brought-in fonts wait on the one-day phone check and are not counted |
| 8. Pictures in shared items (#277) | "A" (5:36 PM) | Items shared with other people carry text and system symbols only, at first; a person's own projects hold any pictures. Phase C's project format |
| 19. No server or account (#288) | "A" (5:40 PM) | None in 1.0. At the live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> (1.2), Sign in with Apple only to publish, CloudKit first |
| 23. Reports and takedowns (#292) | "B" (5:41 PM) | Decided when 1.2 is scoped; the live shelf cannot open until then. On the 1.2 line (T-2378) |
| 24. Age (#293) | "A" (5:42 PM) | Terms say 13 or over; Apple's Declared Age Range check gates the marketplace; no likes, comments or feeds |

</div>


**The release, re-worked.** Likely early June 2027: Sunday 2027-06-06 on the likely line, Day 228. Range mid March to early October 2027 (2027-03-19 to 2027-10-01). The 11-13 method, unchanged and still counted from 11-13, with two Builder figures added on the slot: two-way editing, 2.75 weeks (2.5 to 4.5), and snap-to-layout drag and drop, 3 weeks (1.5 to 4.5). Script: `ops/plans/T-4266-release-range.py`.

**What moved, and by how much.**
- The release: from Monday 2027-04-26 to Sunday 2027-06-06, 41 days, about 6 weeks later. The best end moves 4 weeks (2027-02-19 to 2027-03-19), the worst 9 weeks (2027-07-30 to 2027-10-01).
- Phase D, the Builder: ends Sunday 2027-04-11, was Monday 2027-03-01. 12.25 weeks on the slot (7 to 19), 3.5 beside it. Now **at risk**: the drag-and-drop figures are Maren's and Idris has not checked them, and the Builder's screens wait on the visual direction (#291, open).
- Pages: Sunday 2027-05-16, was Monday 2027-04-05.
- The Final Report moves with the release, to 2027-06-06 (Commandment 48).


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Chair note, 2026-11-15 6:34 AM ET (Ines, T-4467): ten more answers of 11-14…, scrolls sideways" style="--tw:816px" markdown="1">

| Phase | Weeks (range) | Likely end |
| --- | --- | --- |
| A. Prove what exists | 1 (0.5 to 2) | Fri 2026-11-20, unchanged |
| B. Finish the IDE and widgets, beside A | 3 (2.5 to 5) | Fri 2026-12-11, unchanged |
| C. Foundations | 5 (3 to 8) | Fri 2027-01-15, unchanged |
| D. The Builder: compiler, block editor with snap-to-layout drag and drop, two-way editing, custom block, "Save as component" | 12.25 on the slot (7 to 19), 3.5 beside | Sun 2027-04-11 |
| Pages | 5 (3 to 8) | Sun 2027-05-16 |
| E. Release 1.0 | 3 calendar (2 to 4) | **Sun 2027-06-06** |

</div>


**#287 C is against our recommendation, and I say what it costs.** We recommended B: the Python always on view, read-only, with "Edit as code" and the custom block, and two-way editing left for later. C costs about 2.75 more weeks, and it brings one rule people meet by surprise: a piece of written code the Builder has no block for (a loop, say) stays code only. ADR-008 must say what the person sees then, before any Builder code. Nothing else in 1.0 is cut to pay for it; the date takes the weeks.

**Waiting.** Maren redraws the chosen drag-and-drop option with #291's direction, as #300's card said; #291 is not answered, so the redraw waits on it (noted on T-4467). ADR-008 is not written yet: it is the Builder feature's first step (T-4477) and must carry #287 C and #300 A (ADR-001 section 6).

What would make this fail: the drag-and-drop weeks were never checked by the engineer who builds them; two-way editing is the costliest part of the Builder and has no prototype; #291 stays open and the Builder's screens cannot start. Each moves the likely line, and each move goes in that day's report and on #41.

## Chair note, 2026-11-15 2:14 AM ET (Ines, T-4465): six answers of 11-14, and the versions after 1.0

an Investor answered six Restructuring items on Saturday 11-14, between 5:23 and 5:39 PM ET. Each answer is one letter; quoted from the issue comments. Recorded as chair; this note is the record. Nothing in phases A and B changes. Where the 11-13 10:53 AM note below said "what follows waits on decisions 4, 5 and 10", this note is what follows.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Chair note, 2026-11-15 2:14 AM ET (Ines, T-4465): six answers of 11-14, and the…, scrolls sideways" style="--tw:830px" markdown="1">

| Item | His answer | What it means for the plan |
| --- | --- | --- |
| 4. iMessage | "B" (#273 c6885131684, 5:23 PM) | No Messages part in 1.0 or 1.1. One is considered only after a Messages extension has been measured on a phone, and not before 1.2. Measured first, then decided |
| 10. Six items set aside | "A" (#279 c6885141527, 5:24 PM) | The six go to "Maybe later" below, each with its reason. None is deleted. The one open board line that planned one of them is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> by a note naming #279, not ticked |
| 26. Outside testers for the Builder | "B" (#295 c6885275925, 5:35 PM) | No outside testers. The Builder's third phone proof has no tester list and no try-this page; the company makes it and the Investors see it on their TestFlight build |
| 5. The marketplace | "A" (#274 c6885292665, 5:37 PM) | In stages: 1.0, our own Gallery inside the app and sharing by file; then our examples on the site; at 1.2, a live shelf of other people's block projects, only if Apple's written answer allows it |
| 15. Outside code's reach | "A" (#284 c6885304072, 5:38 PM) | Code from a project file someone else made gets none of the person's saved keys, no other project's files, only what its project file declares, and its code is shown before it first runs |
| 16. Updates to an installed copy | "B" (#285 c6885317294, 5:39 PM) | Offered, never silent: the app offers the newer version and the person chooses; a file the person changed is kept unless they say otherwise |

</div>


**#295 B is against our recommendation, and I say what that costs.** We recommended A, three to five people who don't write Python trying the Builder before the freeze, because it is the one test of the "no code" promise. With B, that promise reaches App Review and the store tested only by the company. The third proof stays and is held to its words: on the iPhone, a widget made from a starter with blocks only, the code view never opened, placed on the Home Screen, and VoiceOver finishing every move without a drag. The worker who makes it is one who did not build the Builder. Phase D's row below reads this way from today.

**The marketplace, stage by stage (#274 A).** 1.0 holds only the company's own pre-made Projects, widgets and components (#276), inside the app, and sharing by file. It has no server, sign-in or reports desk for a shelf. Then the company's examples on the site (T-0050, the web gallery of premades, stays). At 1.2, a live shelf only on Apple's written answer; the letter to Apple is decision 6 (#275).

**Outside code and updates (#284 A, #285 B)** are built in phase C, the Foundations feature (T-4476): the permission check and the notice from #284, the project file's version fields from #285. The manifest ADR, the first step of that feature, carries both; ADR-001 section 6 lists them until it is written. No outside code runs in the app before phase C. In 1.0 the Gallery holds only our own items, so the maker of a Gallery project is always the company. Scope call (mine): 1.0 carries the version fields and the rule, so an app update never changes a person's copy and a file they changed is kept; the screen that offers a newer version is 1.1. It is the cheaper half, and nothing in 1.0 needs the offer while every item is ours.

**The 1.0 features now on the board.** The Restructuring added three to the 14: Foundations (T-4476, phase C), the Builder (T-4477, phase D) and Pages (T-4478). The company's #41 reply of 11-14 (Operator, c6885677727) said that #279 was the last thing they waited on, so writing them became part of this task. That makes 17 for 1.0. Their steps are added as lines when each starts.

**The versions after 1.0** (replaces the 11-04 note's "After 1.0" table, kept below as history):


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: Chair note, 2026-11-15 2:14 AM ET (Ines, T-4465): six answers of 11-14, and the…, scrolls sideways" data-n="1" style="--tw:713px" markdown="1">

| Version | Holds | Waits on |
| --- | --- | --- |
| 1.0 | Phases A to E: the IDE, widgets, the 12 free premades, the Project, the Builder, Pages, our own Gallery, sharing by file, Pro (background refresh and themes) | Phase A's phone proof; the Builder's first phone proof fixes the date (#270 A) |
| 1.1 | Fixes; whatever 1.0's fallbacks move out; the screen that offers a newer version of an installed item, never silent (#285 B); any "maybe later" item the Investors bring back by name. No Messages part (#273 B) | Their answers as they come |
| 1.2 | A live shelf of other people's block projects, only on Apple's written answer (#274 A, decision 6); a Messages extension considered, after it is measured on a phone (#273 B); advanced libraries and widget buttons, as ADR-001 section 4 has them (*11-15 10:00 PM, T-4543: widget buttons moved to 1.0, #41 c6905386313; chair note above*) | Apple's answer; the phone measurement |

</div>


**Maybe later (#279 A).** Kept with a reason each, never deleted. Any comes back when the Investors name it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: Chair note, 2026-11-15 2:14 AM ET (Ines, T-4465): six answers of 11-14, and the…, scrolls sideways" style="--tw:640px" markdown="1">

| Item | Reason it waits |
| --- | --- |
| The web code editor, and sync between devices | Not in the product statement. It needs a server or CloudKit's web token, and 1.0 has no server or account. The site keeps our readable examples instead (`02-audit.md`, row 6) |
| The compatibility layer for the old Python app's scripts | Not in the product statement; it serves the users of an abandoned app, none of the three audiences. ADR-005, its rules for collecting old scripts, becomes history (`02-audit.md`) |
| Shortcut Lab | Not in the product statement. Its diff and flow view read Apple's undocumented shortcut file format, "feasible but fragile" (`L9-shortcuts.md`). Shortcuts stay in 1.0 through the Run Script actions and the three recipes (ADR-010) |
| Your own AI key | Not in the product statement. 1.5 to 2 weeks (T-0845 note, an estimate) that would come off the Builder's slot, and it needs a person's read of the AI provider's terms and a question to App Review first (11-04 note, the 1.1 row) |
| A Control Center button | Not in the product statement. A new system surface to build, test on a phone and take through review, not sized, and every week of it comes from the Builder |
| A Share extension | Not in the product statement. 1.0's sharing by file already brings another person's Project in through Files and the share sheet, so 1.0 needs no extension to receive one. Its probe (T-0032) is parked under #279 |

</div>


The Restructuring's other "maybe later" items stand as `06-decisions.md` lists them.

**Records.** All six are marked answered in [`documents/restructuring/06-decisions.md`](../restructuring/06-decisions.html) (they were not yet marked when this note was written). ADR-001's scope follows in the same commit. `log/rulings.md` held no entry for these six at commit 471e13e76f, though the replies on the issues say they are recorded there; the answers above are quoted from the issues. `05-timeline.md` still names outside testers in its question 6, proof 3 and section 6; it is T-4467's to change, and I noted it there.

What would make this fail: the Builder's "no code" promise fails in the hands of people who don't write Python, and we learn it from store reviews, not a tester; App Review reads the Gallery as a storefront even without a shelf; Apple never answers, and 1.2 has no shelf.

## Chair note, 2026-11-13 10:53 AM ET (Ines, T-4266): 1.0 waits for the Builder; the plan re-dated to phases A to E

an Investor answered Restructuring 01 with **A** (10:41 AM ET 11-13, #270 c6857711513): version 1.0 waits for the Builder. He answered 02 with **A** (10:42 AM, #271 c6857734527): nothing goes out near Day 60. He answered 03 with **A** (10:47 AM, #272 c6857855411): Pages are in 1.0. Rulings in log/rulings.md, effects in the Handbook. Recorded as chair; this note is the record. It replaces every date in this plan from Day 23 on: the 11-04 note's freeze (11-30), beta, submit (12-08), Dec 15 release and "1.1 early March", and the 10-31 note's Day 60 goal. There is no store release on Day 60 (2026-12-20). Dates and status: `ops/milestones.json`.

**The phases** ([`documents/restructuring/05-timeline.md`](../restructuring/05-timeline.html) s1; weeks on the single Xcode slot; dates on the likely line, counted from 11-13):


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: Chair note, 2026-11-13 10:53 AM ET (Ines, T-4266): 1.0 waits for the Builder…, scrolls sideways" style="--tw:1082px" markdown="1">

| Phase | What a phone must show to close it | Weeks (range) | Likely end |
| --- | --- | --- | --- |
| A. Prove what exists | All 12 premades draw on an Investor's iPhone (T-4180, T-3783); one sitting reads the widget extension's memory (T-0680). Python in the widget stays first priority unless proven impossible (#283, T-4267) | 1 (0.5 to 2) | Fri 11-20 |
| B. Finish the IDE and widgets (T-4181 to T-4192), beside A | Five days on phones on an **internal** TestFlight build: editor, console, Shortcuts action, refresh; background refresh seen firing or cut; one test purchase of Pro (needs bank and tax). No outside-tester build (#271 A) | 3 (2.5 to 5) | Fri 12-11 |
| C. Foundations, after A's proof (#282 A) | The Project first (one folder, one manifest, one ID, a tested migration; #281 A), then the read() and draw() contract, permissions and the outside-code notice, the tab shell, the Gallery's three choices | 5 (3 to 8) | Fri 2027-01-15 |
| D. The Builder | Three proofs in order: the compiler in the app's own Python, preview speed, a non-coder makes and places a widget (*11-15, #295 B: made by the company, seen on the Investors' TestFlight build; no outside testers, no tester list or try-this page; chair note above*). **The firm release date is fixed at the first of these** (#270) | 6.5 on the slot, 3.5 beside (5 to 15 in all) | Mon 2027-03-01 |
| Pages (#272 A) | A Page answers a tap while a widget refresh waits on the same run queue | 5 (3 to 8) | Mon 2027-04-05 |
| E. Release 1.0 | The release candidate over the last beta keeps every project; purchase and restore work | 3 calendar (2 to 4) | **Mon 2027-04-26** |

</div>


**The release.** *(11-15: re-worked to likely early June 2027, range mid March to early October 2027, for #287 C and #300 A; chair note T-4467 above.)* Likely late April 2027; range late February to late July 2027. How it is built: 05-timeline.md's own figures, its own method. 1.0's 15.5 slot weeks (9 to 25), plus Pages' 5 (3 to 8), plus phase E's 3 calendar weeks (2 to 4), counted from 11-13; best adds every low end, worst every high end. The same sum without Pages gives the 10:41 AM answer's late March (early February to early June), so the method reproduces it. Script: `ops/plans/T-4266-release-range.py`. The worst end assumes every phase runs long together, so the range is wide on purpose; the timeline leans to the upper half of every range, and so do I.

**Near Day 60.** Nothing goes out (#271 A): no outside testers, no store release. Internal TestFlight builds for the Investors' phone proofs continue. The Final Report moves with the release (Commandment 48). The charter's Mission line still reads "by Day 60, 2026-12-20"; it is the Investors' text, so the company sent new wording as a proposal through the applier. The `release-goal` row stays in the milestones, marked late, until the Mission line changes.

**What stands.** The 11-04 note's Pro (background refresh and themes, every premade free) and the #282 chair note above. The 11-04 table's 1.1 and 1.2 are replaced: the Builder and Pages are in 1.0, and what follows waits on decisions 4, 5 and 10 (*answered 11-14; the versions are in the 11-15 chair note above*). T-3386 (re-date the milestones) is covered by this note.

What would make this fail: phase A's cause is not found and everything waits behind it; bank and tax and the name stay open; the block editor runs long; a second App Review rejection. Each moves the likely line, and each move goes in that day's report and on #41.

## Chair note, 2026-10-31 1:02 PM ET (Ines, T-0888): release by Day 60

Investor rule (an Investor, #41 c6546244045, amendment 2026-10-31 12:43 PM): no hard 30-day deadline, no $200 target or need date, release by Day 60, movable, moves reported. Decided alone, as chair; this note is the record (Commandment 30). It replaces every date in the chair note of 2026-10-29 8:03 AM from Day 21 on. The architecture in that note stands.

**The dates.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: Chair note, 2026-10-31 13:02 ET (Ines, T-0888): release by Day 60, scrolls sideways" style="--tw:760px" markdown="1">

| Day | Date | Milestone | Owner |
| --- | --- | --- | --- |
| 11-21 | 11-01 to 11-11 | Freshness first: T-0675 (extension bridge, P0), T-0687, T-0696, T-0678, T-0198, T-0793, review by someone other than the authors. The 1.0 board takes every slot this leaves | Idris, Pernille, Odalys |
| 22-23 | 11-12 to 11-13 | Device gate session (T-0680): same dates as before, now 17 days ahead of the freeze. Flag default ruled from its numbers | Idris, Ines |
| 24-27 | 11-14 to 11-17 | Only if the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> fails <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> or G2: bound fields (T-0682), then a second device session. Otherwise the 1.0 board | Idris, Pernille |
| 16-39 | 11-06 to 11-29 | The 1.0 board to freeze rows F1-F20: gallery, Settings, completion, prompts, Home Screen route, Pro placement, themes, iPad, accessibility; the alpha's fail list; internal TestFlight builds as soon as #100 and #98 2A allow | Idris, Maren, Pernille, Wrenna |
| 30 | 11-20 | <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span>-in check (below). An ordinary evening report; no ending, no tally | Ines |
| 40 | 11-30 | Feature freeze, 11:59 PM; widget cut line (ADR-001 3.3) applied at the same commit | Ines, Idris, Maren |
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
4. **Not a wider 1.0.** Nothing joins 1.0 by default. Before <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> a new item needs a chair line naming what it pushes. The one widening I'd entertain is the editor preview pane (T-0192), cut for time on 10-27, and only through the pull-in check. Native packages stay 1.1 under ADR-003. T-0870 (Explore tab) gets its own ruling; this plan holds no room for other people's code in 1.0.

**Why Day 55 and not Day 48 or Day 60.** My sizing, a judgment and not a measurement: freshness about 10 lane days (T-0675 3.5, T-0687 and T-0696 1, T-0678 1, T-0198 and T-0793 2, review 1, gate 2), the 1.0 board about 14. That is 24 of the 30 days from 11-01 to 11-30, about five days of slack, more than any plan here has had. No usage from the personal lane is counted. Day 60 is a Sunday, right before the holidays [recall: Apple warns of slower review in late December, unverified], and a slip past it would cost more than a slip in November. Day 55 is the last Tuesday inside it; the launch plan's rooms favour a Tuesday [judgment, launch plan s5.3].

**Pull-in check, written before the evidence.** On Day 30 (2026-11-20 11:59 PM), I move freeze, submit and release in by seven days (release Tuesday 12-08) only if all of these hold: T-0680's verdict and the flag default are written in ADR-007; T-0793 is on main; F6, F7, F8, F17 and F18 each have a passing record; A11 is green at that commit. All or nothing. If they hold and T-0192 looks better than a week, the Investors choose. Otherwise the table stands.

**Slip triggers.** T-0675 not on main by Day 18 (11-08), or no T-0680 verdict by Day 27 (11-17): I re-date the same day and say so on #41. Past Day 21 without #100 and #98 2A, the gate and the first TestFlight build wait day for day.

**Day 30 items.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: Chair note, 2026-10-31 13:02 ET (Ines, T-0888): release by Day 60, scrolls sideways" style="--tw:498px" markdown="1">

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


**Old dates in board lines and ADRs.** A date below reads as the one beside it, until the line is rewritten. Freeze Day 13, 11-02 11:59 PM, 11-03 11:59 PM and Day 21: read 2026-11-30 11:59 PM. Release candidate Day 24: read Day 46 (12-06). Submit Day 25 or Day 28: read Day 48. ADR-007's T-0793 cuts (chair line 2026-10-30 1:35 PM, item 5) name the freeze and the release candidate, so they follow; I still want T-0793 on main by Day 21. T-0101 waits until 2026-12-09, the day after submission (the 1:03 AM chair line below said 11-16). Investor asks keep their dates: bank and tax, #90 and #92 Day 12; #98 2A 11-05; #100 no later than Day 21. The launch-plan review moves from Day 15 to T-0890, Day 41.

What would make this fail: the lane fails its gates and T-0682 eats all the slack; #100 waits past Day 21; a second rejection lands in the holidays; or thirty free days invite scope drift and tool work that takes Idris's slots.

## Milestones and owners (2026-10-25, history)

**History.** The rows for Days 5-8 stand. The rows for Days 9-17 are the plan of 2026-10-25, kept as written and no longer current: they were replaced by the chair note of 2026-10-29 8:03 AM below, and that table's rows from Day 21 on by the chair note of 2026-10-31 1:02 PM above.


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: Milestones and owners (2026-10-25, history), scrolls sideways" data-n="1" style="--tw:769px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: Model per kind of work (Tenet 6), scrolls sideways" style="--tw:640px" markdown="1">

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

## Chair note, 2026-10-26 10:17 PM ET (Ines, T-0331): Xcode queue Day 6-10

Ruled in ops/plans/pywidget/xcode-queue-day6-10.md. Main slot order: T-0206 (running) + T-0161, T-0312a (input), T-0208, T-0052, T-0207 (now P0), T-0286, T-0041, T-0031, end to end, T-0051. The worktree slot takes checks and records only (T-0021, T-0024, T-0306, T-0039, T-0213 measurements, T-0321 after #83, device runs after membership). Nothing is planned on the MacBook until the Investors install the runner. Moved off Idris: T-0042 text (Odalys), T-0273 rule and T-0106 schema (Pernille), T-0259 (Wrenna). To 1.1: T-0212, T-0032, T-0044. The line that moves the alpha if late: T-0207, checkpoint Day 9 6:00 PM.

## Chair note, 2026-10-29 8:03 AM ET (Ines, T-0671): widget freshness moves the dates

Investor rule (amendments.md, 2026-10-29 7:33 AM): widget freshness beats a quick launch, Day 17 is flexible. Ruled in ADR-007's chair line of 2026-10-29 08:03: Python runs in the widget extension for `lane: widget` scripts (ADR-007 option c), built now behind the flag, the flag's default set from device numbers before the release candidate; the declared Swift steps (net fetch, location, steps) ship either way; bound fields are a specified contingency built only if the lane fails its gates. About 7 new days on Idris's lane. New milestones; rows above Day 9 stand.


<div class="tbl" role="region" tabindex="0" aria-label="Table 15: Chair note, 2026-10-29 08:03 ET (Ines, T-0671): widget freshness moves the dates, scrolls sideways" style="--tw:760px" markdown="1">

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


History: the rows from Day 21 on and the next paragraph are replaced by the chair note of 2026-10-31 1:02 PM at the top.

Consequence, reported not decided: 1.0 is on sale around Day 27-28 at best, so the Mission's $200 by Day 30 cannot come from more than two or three selling days. Decision issues due Day 12 (#87, #90, #92, #98) keep their dates; they are needed before the freeze regardless.

## Rules that bind every line

Human checkpoints (brief section 0): no accounts, spending, contact with Apple or third parties, TestFlight or App Store submission, publishing, pricing, legal terms, or 2.1 changes without the Investors. PROPOSALs for any change to 2.1. One ADR per significant choice. Every outside library and asset logged with its licence (Commandments 4, 5, 9). Every visual drawn by code and approved before it ships (Commandments 9, 51). No scripted reads against a host's terms (Commandment 6); the GitHub hold (#53) stands until a ruling says otherwise.

**Chair line, 2026-10-31 1:03 AM ET (Ines, T-0852; an Investor, #41 c6539190636).** Document upkeep that doesn't serve the app stops. Recurring passes stop unless a named reader needs them before submission: T-0023, T-0115 and T-0222 have none and stop today; CORRECTIONS.md stays as it stands. 1.1 design notes wait behind the first submission: T-0101 waits until 2026-11-16, the day after Day 25. T-0845 stays: the Investors asked for it and are its reader. Launch documents state only what the code does at that commit. For packets: a new document names its reader and use, or it isn't written.

## Chair note, 2026-11-03 9:09 PM ET (Ines, board <span title="A numbered batch of planned work, with its own plan file.">refill</span>): Xcode slot order after T-1728

One Xcode task at a time on the Mac mini, and the MacBook gate J-20261103-2015-xc-test is still running. From 11-04, [ops] stays at 10% and [site] at 5% (#41 c6619795358). So Idris's slot goes to freshness first, as the 10-31 chair note's row for 11-01 to 11-11 says, and everything that can run without Xcode moves off his lane.

**Idris's next three, in order, after T-1728:**

1. **T-0675, item 7.** P0, and the slip trigger is T-0675 on main by 11-08. Item 6 (T-1643) waits on T-1140.
2. **T-0678**, the Refresh button intent. T-1440 follows it on the same lane.
3. **T-0687 (a)**, `net.get` inside the extension, with T-0696's peak measurement in the same run.

Not next: T-0198's host half landed (186e9027); its T2 call rides with T-0793, which is blocked. T-1140 waits on T-0866's status.json writer. A red result from the gate changes this order only if it blocks a landing; then that fix goes first, and I say so on the board.

**Off the slot tonight (T-1754 to T-1762).** These are host-only or need no build. Pure rules in the Core package go to Pernille and Odalys: which widget state shows, where the stale entry goes, the traceback fold, and the refresh schedule. Their Xcode wiring stays inside T-0048, T-0389 and T-0793. Pernille also gets a test that the bundled files open clean in the editor. Maren specs the iPhone examples entry before T-0811. Wrenna drafts the support Q&A, the rejection replies and the review-notes scope map from saved sources. No hiring: the gap is the Xcode slot, not hands (Commandment 18).

**Second batch, 10:16 PM (T-1792 to T-1801).** Same rule: no Xcode, no Simulator, each under about 90 minutes. Run order, freshness first: T-1792 (Idris reviews T-1439, the refresh button and age line DSL), T-1793 (age line rule) and T-1794 (what a refresh clears) as pure rules in Core for T-1440 and T-0678; T-1795 (premades declare stale_after) and T-1796 (lane list against the scan) for Pernille; T-1797 (small age line, measured) and T-1798 (Activity words for every outcome) for Maren; T-1799 (freshness claims against saved Apple pages) and T-1800 (privacy label against HEAD) for Wrenna; T-1801 (Idris reviews T-0309's Python half before T-1786). Still no hiring.

## Chair note, 2026-11-03 10:22 PM ET (Ines, T-1802): the runner job folders on the Mac mini

**Ruling: not needed; they go only through the Investors.** Read only, nothing tried. There are six folders under ~/t0351-runner-work/jobs, not five, about 12.7 GB by du, not 10.5. Each is one runner_profile_compare.py run (T-0351, T-0369, T-1201, T-1207). Five left their result row in ops/metrics/runner-profile-compare.jsonl, committed (status, counts, failing test names, log tail); 11b82eb7 stopped mid-download and has no row and nothing to keep. No open line reads them: T-1703 makes its own device set on the SSD, and T-1466 and T-1652 cite the committed rows. Any folder comes back by rerunning its commit.

**Route.** Odalys's rm -rf was refused, so under T-0848 and Commandment 2 the company's part ends there: no rewording, no other tool, no split, no standing sweep, and no new cleanup flag in the compare tool aimed at these six. The one legitimate route is a request: action card ops/requests/t1802-disk-card.md (recommend A: an Investor runs the delete; B: they name the route; C: no). The Operator posts it. Default: nothing is deleted. Until there is an answer, the Mac mini's Xcode gate stays shut and Idris's slot waits for the MacBook runner. The 9:09 PM order stands.

## Chair note, 2026-11-04 10:03 PM ET (Ines, T-2354): version 1.0 re-planned around B-staged (#142)

Investor an Investor chose **B-staged** on #142 (c6648346528, 2026-11-04 9:50 PM) from the costing card of 2026-11-03 2:49 PM. Decided alone, as chair; this note is the record (Commandment 30). The dates in the 2026-10-31 note stand; this note changes what 1.0 holds and what comes after it.

**Reading of the answer.** "B-staged" came without "6a" or "6b". The card recommended B-staged with 6a, so 6a is the plan: the internet is free in scripts, the editor and every premade; a widget that keeps itself fresh from the internet in the background is Pro. One word from the Investors switches it to 6b (Pro = themes only). Said plainly on #142.

**Version 1.0, release Tuesday 2026-12-15 (holds).**


<div class="tbl" role="region" tabindex="0" aria-label="Table 16: Chair note, 2026-11-04 22:03 ET (Ines, T-2354): version 1.0 re-planned around…, scrolls sideways" style="--tw:1129px" markdown="1">

| Item | What 1.0 holds | Lines | Cost |
| --- | --- | --- | --- |
| 3, internet | Internet from Python is the draw. Store text and first-run tour lead with it; two or three examples use public data, each source's terms read first (Apple 5.2.2, Commandment 6). "Live" means "keeps itself fresh through the day" (Apple gives a widget 40 to 70 refreshes a day), never second by second. Offline behaviour stays | T-2375 (Wrenna), Maren half a day | 1 to 2 days, none of Idris's |
| 5, previews | Back in 1.0 without the pull-in check: the editor preview pane (T-0192 part A), "Run as widget" and the step-through of planned updates (T-0048). Maren brings the iPad screenshot back | T-0192, T-0048 (Idris), T-2374 (Maren) | 2.5 Idris days, 0.5 Maren |
| 6, all premades free (6a) | All 12 premades free; no Pro premade in 1.0. Replaces #107's 5 free and 7 Pro and PROPOSAL-002 s6's 3 and 9. Pro in 1.0 = background refresh of a widget (the extension lane's T-0793 path runs only while entitled; a free user's internet widget updates when the app opens or a Shortcut runs) plus the themes (#93). A premade that uses background refresh carries a badge along the lines of "Live with Pro"; a free user's badged widget shows a plain "Pro" state, no offer, no price (Apple 4.4); no Pro feature may need a permission (5.1.1(ii)). Pro stays $14.99 one-time (#87). The Pro screen lists only what the build has: advanced libraries are 1.2 and remixing others' work is later, so neither is on it. Opening a premade as your own editable copy stays free (T-0901). T-2316 stands: the entitlement check on a Shortcut run of a locked premade stays as code and the locked set is empty in 1.0; external TestFlight still waits on it (T-2311) | T-2372 (Idris, gallery and placement), T-2373 (Idris, Pro check on background refresh), T-2374 (Maren, badge and PRO_STR), T-2375 (Wrenna, Pro screen and store copy) | 2.5 Idris days, 1 Maren, in Wrenna's 2 |
| 8, integrations | Shortcuts are the bridge, as Apple allows (2.5.1, 2.5.2): three ready-made Shortcut recipes that pass another app's data into a script whose widget shows it. Store text says "works with your apps through Shortcuts", never "integrates other apps' widgets". The Control Center button stays 1.1 | T-2376 (Pernille with Wrenna) | 1 day, none of Idris's |
| Small website | Card item 2(a): the free premades and examples as readable code with copy and download buttons; no accounts, no server, no link that makes the app fetch code. Built by Day 46 (12-06); published only after the Investors' OK at 1.0's approval | T-0050 (Odalys, now P1, Maren's layout) | 2 days, none of Idris's |

</div>


**Fallbacks, written before the evidence.** If the 11-12/13 device test fails and T-0682's 3.5 days run, the slack is gone: the update step-through (T-0048's stepper) moves to 1.1 first, then the preview pane; the release date does not move, and I say so in that day's report. If T-0795's cut check removes background refresh from 1.0, T-2373 is superseded and Pro falls to 6b (themes only, #87's fallback); every premade stays free either way.

**After 1.0.** *(History: replaced by the 11-13 note, and by the 11-15 note's versions and "Maybe later".)*


<div class="tbl" role="region" tabindex="0" aria-label="Table 17: Chair note, 2026-11-04 22:03 ET (Ines, T-2354): version 1.0 re-planned around…, scrolls sideways" style="--tw:960px" markdown="1">

| Version | Holds | Needs from the Investors first |
| --- | --- | --- |
| 1.1, target early March 2027 (about 9 weeks of iOS work after 12-15) | The drag-and-drop Builder (L17, about 6.75 weeks); building with your own AI key (T-0845 note, 1.5 to 2 weeks); Control Center button; install from file; Share extension; whatever the fallbacks above moved | A person's read of OpenAI's terms; whether to ask App Review the AI question before 1.1 is submitted |
| 1.2 | "See my projects" on the web (CloudKit JS, 2 to 4 weeks); widget buttons (about 2 weeks); advanced libraries numpy, Pillow, matplotlib (ADR-003; #79's settings rule applied first, then Pernille 3 to 5 days) | The CloudKit web token; any hosting cost |
| Later, after Apple is asked | Sharing and remixing other people's work (ADR-006, T-0902), in whatever form Apple allows | Asking Apple (outreach is theirs); who staffs moderation; the legal terms for shared content |

</div>


**Date effect.** 1.0 gains about 4 of Idris's days (previews 2.5, all-free gallery and the Pro check 1.5) against the 5 days of slack in the 10-31 note; about one day is left. The site and copy work falls outside his lane. Dec 15 holds. The pull-in check (Day 30) stays as written, but with one day of slack it has no room to move release in by seven days; I expect the table to stand and will report the check anyway. Nothing B-staged moved out of 1.0 gets built for 1.0: Builder, AI keys, web projects, buttons, advanced libraries, sharing.

What would make this fail: the device test fails and the previews go again; background refresh misses 1.0 and Pro at launch is themes only; a free app with a thin Pro sells little, which is the price of a clean first submission.

## Chair note, 2026-11-13 10:31 AM ET (Ines, T-4264): phone first (Restructuring 13, #282)

an Investor answered Restructuring decision 13 with **A** (10:23 AM ET 11-13, #282 c6857295904; log/rulings.md 2026-11-13 10:23 AM; the Handbook's standing instructions). Recorded as chair; this note is the record. Phases A to E are those of [`documents/restructuring/05-timeline.md`](../restructuring/05-timeline.html) section 1.

- **Phase A first.** Phases C (foundations) and D (the Builder) start only after phase A's phone proof passes: all 12 premades draw on an Investor's iPhone (T-4180, closing the premades phone failure T-3783). No restructuring work starts before then.
- **Every phase's done condition includes test point 4** of `05-timeline.md`: the phone proof, on a TestFlight build in an Investor's hands. Tests on the Mac, the Simulator suite and review (points 1 to 3) do not close a phase alone. Each phone sitting is still asked for on its own.
- **Phase B continues beside the fix.** an Investor answered the Operator's follow-up (#282 c6857389786) with "B continues" (10:34 AM ET 11-13, #282 c6857553642; log/rulings.md 2026-11-13 10:34 AM): phase B (T-4181 to T-4192, finishing the existing IDE and widgets) runs alongside phase A; only phases C and D wait for phase A's phone proof.

The 11-04 dates above are not re-dated here; that waits on decisions 1 and 2 (#270, #271). What would make this fail: the premades proof needs a device export (#231, due about 11-15) and an Investor's sitting; if either slips, C and D slip with it, and I say so in that day's report.
{% endraw %}

</div>
