---
layout: "default"
title: "The Restructuring, phase 5: timeline"
section: "documents"
description: "The order of work, the phone proof at each step, the Builder&#x27;s place in 1.0, a proposed 1.0, 1.1 and 1.2 with effort ranges, money items and the Investors&#x27; checks."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/05-timeline.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 35 · Wed Nov 25, 12:15 AM ET</span><span><code>documents/restructuring/05-timeline.md</code></span></div><h1>The Restructuring, phase 5: timeline</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Commit read: cc60253b04 (branch personal/b, 2026-11-12 11:40 PM ET). I built, ran and measured nothing. Every effort figure is an estimate; "mine" marks one that rests on my judgment alone.

*Dated line, 2026-11-15 6:34 AM ET (Ines, T-4467).* This is the plan of 11-12; the Investors have since answered most of its questions. Where an answer changes the text, an italic note says so and the old words stay, struck through where they no longer hold. The release is now likely early June 2027 (Sunday 2027-06-06 on the likely line), range mid March to early October 2027: this file's weeks, plus Pages in 1.0 (#272 A), two-way editing between blocks and code (#287 C) and snap-to-layout drag and drop (#300 A) (`ops/plans/T-4266-release-range.py`; `plan.md`, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 2026-11-15 6:34 AM). There are no outside testers (#295 B).

*Dated line, 2026-11-24 (Idris, T-5819).* The Builder is one-way and strict for 1.0, in place of two-way editing (#287 C): an Investor, #325 c7142863083) and c7149027427) (option A), `log/rulings.md` 2026-11-24 7:55 PM. What it supports and what it does not: [`03-structure.md`](03-structure.html) s3. Phase D re-checked (section 2): 12.0 weeks on the slot (5.75 to 19.0), 0.75 less than with two-way editing, and 4.5 beside. On the likely line that would move the release 5 days earlier, from Saturday 2027-07-17 to **Monday 2027-07-12** (range 2027-04-04 to 2027-12-06). ~~No date is moved here: `ops/milestones.json` keeps 07-17 until the Investors have seen this on #325.~~ *11-25 (Ines, T-5819): moved. The Investors saw it on #325 (c7149640451), 8:31 PM ET 11-24) and raised no objection; `ops/milestones.json` now has Monday 2027-07-12, range 2027-04-04 to 2027-12-06.*

## Questions for the Investors, each with a recommendation

Phase 6 takes the recommendations as working assumptions.

1. **Does 1.0 wait for the Builder?** Recommend: yes. The likely release is late March 2027; the honest range is early February to early June. Fix a date when the Builder's first phone proof passes. *Answered A (#270, 11-13). Now likely early June 2027, range mid March to early October 2027 (dated line above).*
2. **What goes out near Day 60 (2026-12-20)?** (A) Nothing. (B) The IDE and widgets to outside testers on TestFlight. (C) The IDE and widgets on the store, the Builder after. Recommend B: App Review sees the app early and no release is spent. C breaks "launches in version 1.0" and leaves people's projects on a model about to be replaced. *Answered A (#271, 11-13): nothing goes out near Day 60; internal TestFlight builds for the Investors' phone proofs continue.*
3. **The custom block: sources and views, or sources only?** Recommend both, about 1.25 weeks. The view half is cut first if the Builder runs late.
4. **When do you write to Apple** (P1 Q3)? Recommend: when the foundations build is on TestFlight, so the letter names a build. The answer is needed before 1.2 is scoped.
5. **Bank and tax, and the name (#90): by when?** Recommend: bank and tax before the first beta, since no test purchase runs on a phone without them; the name four weeks before submission. *Answered: A (Restructuring 25; an Investor, 9:43 PM ET 11-16, (private)). Dated 11-17 (T-4668) from the current likely release in `ops/milestones.json` (Sunday 2027-07-11), not the card's mid-February estimate. Bank and tax: due **Sunday 2026-12-06**, the day before phase B's five days on phones (Monday 12-07 to Friday 12-11 on the likely line), which carry the first test purchase of Pro; there is no outside beta (#295 B), so the first beta that needs them is that internal one. The name (#90): due **Saturday 2027-05-29**, four weeks before submission on Saturday 2027-06-26 (phase E's five days of beta from Monday 06-21, then submit). Both move with their phase and the release (rows bank-tax, app-name and submit).*
6. ~~**Who tries the Builder without knowing Python?** Recommend: three to five people you choose, on TestFlight, before the freeze. Otherwise "no code" reaches the store untested.~~ *Answered B, against the recommendation (#295, 5:35 PM ET 11-14): no outside testers. The Builder's "no code" promise reaches the store tested only by the company; no tester list or try-this page is prepared for outside people.*
7. **Is 1.1 Pages, and 1.2 the live <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>?** *Answered: Pages are in 1.0 (#272 A, 11-13); the live shelf at 1.2 only on Apple's written answer (#274 A, 11-14); the six other items to "maybe later" (#279 A).* Recommend: yes. The 11-04 plan's other 1.1 items (your own AI key, a Control Center button, a Share extension) are phase 6's to place.
8. **An iPad for the proofs?** Recommend: one you own; otherwise section 5. *Answered B (#299, 6:27 PM ET 11-14): no iPad is bought for now; every iPad step runs in the Simulator, and each closing note says so.*

## Working assumptions and units

From the unanswered recommendations in [`01-questions-and-limits.md`](01-questions-and-limits.html) ("P1"), [`02-audit.md`](02-audit.html) ("P2") and [`03-structure.md`](03-structure.html) ("P3"); "(WA)" marks a line that leans on one.

- In 1.0: the Builder, for widgets; the Project as the unit; no live marketplace, account, server or paid item. Pages in 1.1. *(11-15: Pages are in 1.0, #272 A; no server or account, #288 A.)* Documentation is a done condition.
- **A week** is one engineer-week on the company's single Xcode slot (the Mac builds the app one job at a time), as [`ops/plans/pywidget/plan.md`](../pywidget/pywidget-plan.html) counts <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> days. Work that needs no Xcode runs beside it and adds no calendar time. I give no figure in sessions: nobody has measured sessions per app feature.
- **How far to trust the figures.** The Builder's come from [`pywidget/docs/research/L17-builder.md`](../pywidget/l17-builder.html) ("L17"), whose author puts ±50% on each. The first plan set submission for Day 17 ([`pywidget/docs/decisions/ADR-001-mvp-and-phasing.md`](../pywidget/adr-001-mvp-and-phasing.html)); it now stands at Day 48, at risk (`ops/milestones.json`): 2.8 times the first figure. I lean to the upper half of every range.

## 1. Phases, in order


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Phases, in order, scrolls sideways" style="--tw:1122px" markdown="1">

| Phase | Weeks on the slot | Needs | What a phone must show before the next phase |
| --- | --- | --- | --- |
| A. Prove what exists | 1 (0.5 to 2) | Nothing | All 12 premades draw on an Investor's iPhone, light and dark, every size, and after a restart (T-4180; T-3783 is open). One sitting reads the widget extension's memory (T-0680), or running Python inside the widget is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> |
| B. Finish the IDE and widgets | 3 (2.5 to 5) | A | Five days on phones: editor, console, Shortcuts action, refresh on open; background refresh seen firing, or cut; one test purchase of Pro |
| C. Foundations | 5 (3 to 8), mine | B; the mock-up direction approved | A project made on B's build opens on C's with its placed widget still drawing; a script asking for what its manifest lacks is refused; an imported file shows the outside-code notice; four tabs on iPhone and iPad |
| D. The Builder | 6.5, and 3.5 beside (5 to 15 in all). *11-15: 12.25 on the slot (7 to 19), 3.5 beside, with two-way editing (#287 C, 2.75: 2.5 to 4.5) and snap-to-layout drag and drop (#300 A, 3: 1.5 to 4.5)*. *11-18 (T-4870): 13.5 on the slot (7.5 to 21), the engineer's check putting snap at 4.25 (about 2 to 6.5)*. *11-19 (T-4871): 12.75 on the slot (6.25 to 19.75), 6.5 beside, the engineer's check putting two-way editing at 2.0 on the slot (1.25 to 3.25) and 3.0 beside (2.25 to 5)*. *11-24 (T-5819): 12.0 on the slot (5.75 to 19.0), 4.5 beside: one-way and strict in place of two-way editing, plus the component library (section 2)* | C; ADR-008 | Three proofs, in order (section 2) |
| E. Release 1.0 | 3 calendar weeks (2 to 4): five days of beta, six of review window, room for one rejection (`plan.md`) | D; name, store page, bank and tax | The release candidate, installed over the last beta, keeps every project; purchase and restore work |

</div>


- **B** is what the 11-04 plan meant to finish by its 11-30 freeze: 14 features, 108 open build lines (P2).
- **C**, in the order of [`work/02b-code-and-design.md`](02b-code-and-design.html) s4: the manifest, one ID and a tested migration, 1.5; the public `read()` and `draw()` contract, 0.25; router permissions and the notice, 1.0; the `ConsoleModel` split, the tab shell and the first-run question, 1.5; the Gallery's three choices, 0.5.

**Test points, in every phase.** (1) Python tests on the Mac. (2) The Simulator suite through `tools/xc.sh`. (3) Review by someone other than the author (Commandment 13). (4) The phone proof, on a TestFlight build in an Investor's hands. (5) The part's page and diagram current. No phase is done on (1) to (3) alone: that was the order the audit found wrong, and I had set it.

**Documentation (steps D1 and D2).** D1, the research, went final at 11:53 PM ET (9957342d3c). D2 builds the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> and the first seven diagrams ([`07-documentation.md`](07-documentation.html)): about one week, mine, beside A and B with no Xcode, and on main before C starts. From C on, every part begins with its "how it works" page and ends with its diagram on the site (WA): half a day a part, about 12 parts to 1.0. At E that page feeds the review notes.

## 2. When the Builder lands in 1.0

**Order.**

- Beside A and B, no Xcode: ADR-008 and the block document format first (P2), then the block catalog and the compiler in Python (L17 s2: 2.0 weeks).
- Beside C: the 12 premades rewritten as block documents, tested against what their Python draws today (1.0, mine).
- After C, on the slot: the block editor (L17 s3, 4.0); the read-only code view with "Edit as code" (L17 s4, 0.75); the custom block (1.25, below); "Save as component" and sharing by file (0.75, mine).

About 10 weeks in all, 6.5 on the slot; 5 to 15 at L17's ±50%. On the likely line the Builder holds the slot from mid-January to the end of February 2027. *11-15 (T-4467): with two-way editing (#287 C) and snap-to-layout drag and drop (#300 A) added, 12.25 weeks on the slot (7 to 19), and the Builder holds the slot from mid-January to Sunday 2027-04-11 on the likely line. The drag-and-drop figure is the designer's and has not been checked by the engineer who builds it.* *11-18 (T-4870): Idris, who builds it, checked it against the code (T-4285, `design/builder-dnd/README.md`): snap is 4.25 slot weeks, about 2 to 6.5, not 3.0, because nothing yet tells the editor which block drew which piece and no drag on a two-dimensional surface exists to reuse. Brought-in fonts, if the phone check passes, are 1.0, not 0.75, and are not counted. The Builder is 13.5 weeks on the slot (7.5 to 21); on today's likely line, with phase A closed and Developer mode in B, it holds the slot to Thursday 2027-05-06 instead of Tuesday 2027-04-27.* *11-19 (T-4871): Idris checked two-way editing (#287 C) against the code on main ((private)): 5.0 weeks of work in all (3.5 to 8.25), not 2.5 to 3.0, but 3.0 of it (2.25 to 5) is Python with no Xcode, so 2.0 on the slot (1.25 to 3.25), not 2.75. No Builder, catalog, compiler or block document exists on main yet. Beside the slot: the compiler's canonical output 0.25, the code-to-blocks parser 1.25 (23 node kinds and 42 modifiers in `pywidget_ui` to read back, by `ast` only), keeping block identity, value names and the person's comments across a code edit 0.75 (`ast` drops comments; a missing line on the card), the "why not blocks" messages 0.25, and property and hostile-input tests 0.5. On the slot: the unsupported line's mark and the way back to blocks 0.25 (`EditorMarks`, `goToLine` exist), the editor sync 1.25 (an editable code view, a reparse after the typing pause on `EditorTooling`'s worker, one undo step per block edit, selection both ways, which file wins on disk; `ProjectStore` lists `.py` files only), and the parser's goldens in the app's Python with the switch's UI tests 0.5. The 2.0 holds only if the parser is done beside C and the block editor's first weeks; each week it slips lands on the slot. The Builder is 12.75 weeks on the slot (6.25 to 19.75) and holds it to Saturday 2027-05-01 instead of Thursday 2027-05-06.*

*11-24 (T-5819): one way, strict, re-checked by Idris.* The Investors replaced two-way editing with a one-way Builder that owns its files (#325 c7142863083) and c7149027427); [`03-structure.md`](03-structure.html) s3 says what it supports and what it does not, and settles the lock as (b), "Edit by hand" with Undo). The weeks, against the code on main (still no Builder, catalog, compiler or block document; the code editor has no locked mode; `ProjectStore` admits `.py` names only):

- **Out:** all of two-way editing, 2.0 on the slot (1.25 to 3.25) and 3.0 beside, except the compiler's canonical output (0.25, beside), which the fingerprint needs: the same design file must always give the same bytes. The risk that the 2.0 held only if the parser was finished beside the slot goes with it.
- **In, on the slot, 1.25 (0.75 to 2.5):** the lock in the code editor, "Edit by hand", the banner's Undo and "Back to the Builder", 0.25 (0.25 to 0.5), on top of L17 s4's read-only code view and "Edit as code" (0.75), which it becomes; Builder files shown or hidden in a project's file list, with the design file as a second kind of file the project store admits, 0.25 (0.1 to 0.5); the Gallery's View, the Builder view read-only with "Save as component" on a selection, 0.25 (0.15 to 0.5); the component library in the Builder (built-in, the person's own, imported from their other projects, copied in on insert), 0.5 (0.25 to 1.0).
- **In, beside the slot, 0.75 (0.35 to 1.5):** the fingerprint in the manifest and the compile-again check when a project file comes from outside, 0.25 (0.1 to 0.5); the library's store, import from other projects and name clashes, with tests, 0.5 (0.25 to 1.0).
- **Not counted:** phase C's Gallery step (0.5) may shrink now that "Make it mine" and "Add to project" are gone; I have not checked it.

The Builder is **12.0 weeks on the slot (5.75 to 19.0)**, 0.75 less than with two-way editing, and 4.5 beside (6.5, less two-way's 3.0, plus 0.25 kept and 0.75 new). Two-way editing was 2.0 on the slot; one way, strict, with the library, is 1.25. Run through `ops/plans/T-4266-release-range.py` with 1.25 (0.75 to 2.5) in place of two-way's 2.0 (1.25 to 3.25) (run 11-24, the script itself unchanged): phase D would end Monday 2027-05-03, not Saturday 2027-05-08, and the release would fall **Monday 2027-07-12**, not Saturday 2027-07-17, Day 264, range 2027-04-04 to 2027-12-06. A small move inside the range. ~~`ops/milestones.json` is not moved by this step: the Operator puts it to the Investors on #325 first.~~ (T-5819) *11-25 (Ines, T-5819): moved. The Investors saw it on #325 (c7149640451), 8:31 PM ET 11-24) and raised no objection; `ops/milestones.json` now has Monday 2027-07-12, range 2027-04-04 to 2027-12-06.*

**Three phone proofs, in order.**

1. The compiler in the app's own Python: its expected outputs and the 15 hostile values (settings written to become code). L17's probe ran on a Mac's Python 3.9.6; the app carries 3.15.
2. Preview speed: a block change redraws on a phone within the bound ADR-008 sets. A miss means a second drawing path in Swift, about one more week (L17 s5).
3. The task: ~~a person who does not code makes a widget from a starter and places it (question 6)~~ *(11-15, #295 B: no outside testers)* on the iPhone, a worker who did not build the Builder makes a widget from a starter with blocks only, the code view never opened, and places it on the Home Screen; the Investors see it on their TestFlight build. VoiceOver completes every move without a drag.

**The custom block, sized** (P3's option d; mine, and nobody has prototyped it). In weeks:

- Reading and checking `component.json` (settings, types, defaults, sample data): 0.25, no Xcode.
- Compiling the block to one import and one call: 0.25, no Xcode. L17 s2 lets no user string become a Python name, so a file name passes a strict check or is refused, and hostile file names join the tests.
- The settings form, "New custom block", "Use this file as a block", and an error in the file landing on its block: 0.25, on the slot.
- The view half: 0.5, half on the slot. A block whose drawing the Builder cannot open; a tap in the preview selects the whole block; a check, by reading and never running, that the file still has the `draw()` the block expects.

Sources only: 0.75. Sources and views: 1.25, range 0.75 to 2.25. Editing either side freely costs 2.5 to 3.0 more (L17 s4) ~~and stays "maybe later"~~. *11-15: it is in 1.0 (#287 C, 4:51 PM ET 11-14); the custom block stays beside it.* *11-19 (T-4871): Idris's check against the code puts it at 5.0 in all (3.5 to 8.25), 2.0 of it on the slot (1.25 to 3.25); the parts are in the note above.* *11-24 (T-5819): out of 1.0 again; the Builder is one-way and strict (note above). The custom block stays: it is how a backend script in ordinary Python reaches the Builder.* One saving is not counted: a premade's fetching code becomes a custom block of our own, so the catalog needs no special data block per premade.

## 3. Where App Review can cost a week

A rejection costs about a week: read it, fix, rebuild, repeat the phone proof, resubmit, wait. Apple's own time over one review is a day or two [recalled, verify].

1. ~~**The first build for outside testers.**~~ *11-15: no outside-tester build is planned (#271 A, #295 B), so App Review's first look is the 1.0 submission.* [Apple, <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>] "When you add the first build of your app to a group, the build gets sent to App Review to make sure it follows the App Review Guidelines." It is App Review's first look at an app that runs code. A no costs days and no release. A yes there is not a yes at the store.
2. **The 1.0 submission.** The likeliest causes:
   - 2.5.2, rated medium for the IDE (P1 s3). Someone else's project file is outside code, opened on the person's own act; the notice, the viewable source and the review notes answer it.
   - 2.3: the store page and the notes must say what the app runs (P1 Q5). 2.5.19: nothing dormant in the binary (P3 s4).
   - Pro: a first In-App Purchase "must be submitted with a new app version" [Apple, T2], and it is untestable while bank and tax are missing. 4.4: no offer inside the widget.
3. **Late December.** Slower review around the holidays [recalled, verify; so does `plan.md`]: submit before 12-18 or after 01-02.
4. **1.1, Pages.** Rated high where a Page looks like an app (Agreement 3.3.1(B), guideline 3.2.2(i); P1 s3).
5. **1.2, the live shelf.** Rated high on 2.5.2 and 4.7. A rejection can cost the feature, so Apple's written answer comes first.

## 4. Proposed 1.0, 1.1 and 1.2


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Proposed 1.0, 1.1 and 1.2, scrolls sideways" data-n="1" style="--tw:1033px" markdown="1">

| Version | Holds | Slot weeks | Likely release |
| --- | --- | --- | --- |
| 1.0 | The IDE; widgets and 12 premades; the Project and four tabs; the Builder for widgets, with the custom block; the Gallery and its parts inside the app; sharing by file; the Shortcuts action; the run screen; Pro. *11-15: also Pages (#272 A), two-way editing (#287 C) and snap-to-layout drag and drop (#300 A)*. *11-24 (T-5819): one-way, strict Builder in place of two-way editing, with a component library for each person; the Gallery offers Get and View* | 15.5 (9 to 25), then E. *11-15: 29.25 with Pages and the two Builder additions (18 to 46), E included* | ~~Late March 2027 (early February to early June)~~ *Early June 2027 (mid March to early October)* |
| 1.1 | Pages, in the editor and the Builder: scrolling, lists, typed text, taps that call Python. Our examples as readable code on the site | 5, mine (3 to 8), then 2 of release | About eight weeks after 1.0, one of them for 1.0's fixes |
| 1.2 | If Apple allows: a live shelf of other people's block documents, with publishing, reports, removal and a staffed desk. If not: ~~blocks and code edited either way,~~ *(in 1.0 since #287 C; 11-24, T-5819: not in 1.0 after all, and not placed in a version)* and a message card if a phone measurement allows | 6, mine (4 to 10), then 2 of release | About eight weeks after 1.1, never before Apple's answer |

</div>


Pages, mine: the screen format's new parts, 1.0; taps and text reaching Python while a Page is open, 1.5; the Page screen, 1.0; Builder blocks, 1.0; proofs, 0.5. Phone proof: a Page answers a tap while a widget refresh waits on the same run queue.

**Where Day 60 falls.** Day 60 is Sunday 2026-12-20, a little over five weeks away. On the likely line it lands one week into C: the premades draw on a phone, the IDE and widgets are finished, the Project model is begun, and no Builder code has run on a phone. On the best line C is three-quarters done. On neither is the statement's 1.0 ready. The 12-15 release now planned (`ops/milestones.json`; every date from the freeze on is at risk) is question 2's option C.

## 5. Real money, and when each is first needed

Proposals only. Nothing is bought.

- **Apple Developer Program renewal:** 2027-10-28, a year after it became active (`ops/state.md`). $99 a year [recalled], about $8 a month. No free path to the store.
- **A domain for the support and privacy pages:** at E. $10 to $20 a year [search, P1 s4], under $2 a month. Free: the company's present site, if GitHub's terms allow that for a paid app [W, P1 R6]; the reading is yours.
- **An iPad for the proofs:** at C. Once, about $350 [recalled, verify]. Free: your own, or Simulator-only iPad proofs, said so in the done-notes.
- **Hosting for the live shelf:** at 1.2. $0 to $25 a month [search, P1 s4]. Free: CloudKit within its quota [recalled].
- **A DMCA agent:** before the shelf opens. $6 a filing, every three years [search, P1 s4].
- **Unpriced or free:** push for widgets, not before 1.2 (free: the system's budgeted reloads); documentation, $0 ([`07-documentation.md`](07-documentation.html)).

Free, but money waits on them: bank and tax details; the Small Business Program, 15% in place of 30% [Apple, P1 R4].

## 6. The Investors' checks, and when

- **Now:** phase 6's decisions; the mock-up direction (C's tab shell and every Builder screen wait on it); ~~bank and tax, due 11-02; the name, with its trademark search.~~ *11-17, #294 A (question 5): bank and tax by Sunday 2026-12-06, before phase B's phone test purchase of Pro; the name (#90), with its trademark search, by Saturday 2027-05-29, four weeks before submission on Saturday 2027-06-26.*
- **Every phase:** a phone sitting for each proof, eight to 1.0: install from TestFlight, follow a short list, send back screenshots or the app's exported measurements.
- **C and D:** the letter to Apple; ~~invitations to outside testers, since the company contacts nobody; the people who try the Builder.~~ *11-15, #295 B: no outside testers, so no invitations and no tester list.* The Builder's visual direction (#291), which its screens and the drag-and-drop redraw wait on.
- **E:** "approve" for the icon, screenshots and store page; your read of the privacy policy and terms; in App Store Connect: age rating, privacy labels, export compliance, review notes, submit, release; any reply to App Review (we draft, you send); the Small Business Program; EU trader status (T-0806).
- **1.2:** Sign in with Apple and CloudKit set up in the account; the DMCA agent; the published address and its replies (P1 Q12).

## 7. What is most likely to move

1. **A.** The cause is not found, so its size is a guess, and everything waits behind it.
2. **What only the Investors can do.** Bank and tax are ten days late, the name is open, and mock-ups repeat "until we approve".
3. **The block editor and its preview.** Dragging nested items is "fiddly" (L17 s3), and proof 3 can send the design back: 4.0 could be 6. A slow preview on a phone adds a week. *11-15: snap-to-layout drag and drop on the live widget (#300 A) and two-way editing (#287 C) are now in it; together they are the largest unchecked figures in 1.0.* *11-18: Idris checked the drag-and-drop figure against the code: 4.25, not 3 (T-4870); two-way editing is still unchecked.* *11-19: Idris checked two-way editing against the code: 5.0 weeks in all, 2.0 on the slot, not 2.75 (T-4871); it rests on the parser being done beside the slot.* *11-24 (T-5819): two-way editing is out; the one-way Builder and its component library are 1.25 on the slot (0.75 to 2.5), with no parser.*
4. **App Review.** One rejection is inside E; a second adds about a week.
5. **Usage limits.** This plan took six runs and five pauses in one day ([`00-plan.md`](00-plan.html)). The build draws on the same limits; no figure here allows for that.

## Sources, and what was measured

Measured: nothing. I fetched no page: T1 and T2 are the company's saved copies under `research/inbound/apple/developer.apple.com/`, read 11-12.

- T1 https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview, saved 2026-11-04.
- T2 https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase, saved 2026-11-02.
{% endraw %}

</div>
