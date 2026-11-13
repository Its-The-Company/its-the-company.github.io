---
layout: "default"
title: "The Restructuring, phase 2: audit of the current plan"
section: "documents"
description: "What the present pywidget plan, its decisions and its board hold against the Investors&#x27; new product statement, and what to keep, change or drop."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/restructuring/' | relative_url }}">← The Restructuring</a><a href="{{ '/documents/restructuring/02-audit.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Restructuring</span><span>Day 22 · Thu Nov 12, 9:34 PM ET</span><span><code>documents/restructuring/02-audit.md</code></span></div><h1>The Restructuring, phase 2: audit of the current plan</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Model: claude-fable-5-2. Commit read: 765f0785d8 (branch personal/a, 2026-11-12 3:40 PM ET) for the plan, decisions and ADRs. The questions, the 2b fold and the last two sections were written at 21:1x ET from 2b as committed at d1f87bd7e4. App work keeps landing; anything later is not in this audit.

## Questions for the Investors, each with a recommendation

The later phases work from the recommendations, as working assumptions.

1. **Does the Builder in 1.0 move the release date?** Recommend: yes. The Builder stays in 1.0, as the statement says; phase 5 proposes the date.
2. **Close the phone failure (T-3783) before restructuring starts?** Recommend: yes.
3. **Make the Project the unit (one folder, one manifest, one ID) before public release?** Recommend: yes.
4. **Pages or iMessage in 1.0?** Recommend: neither. 1.0 keeps the plain run screen ruled in on 10-27; Pages come in 1.1 on the same view format; iMessage waits for a Messages extension measured on a phone.
5. **Keep ADR-006's order for sharing?** Recommend: yes. Our own premades in 1.0, Builder documents passed as files, an in-app listing later, other people's Python only on Apple's answer.
6. **Close the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> that runs Python inside the widget (ADR-007 option c) by a date?** Recommend: one device session; without a pass it is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>.
7. **Set aside the web IDE, the compatibility layer and Shortcut Lab?** Recommend: yes, as "maybe later".
8. **Browsing and installing free, Pro for power features only?** Recommend: yes.
9. **Is current documentation, with code-drawn diagrams, a done condition of every app part?** Recommend: yes; the tool is [`07-documentation.md`](07-documentation.html)'s question.

Phase 6 checks the mission statement against your answers and brings any new wording for "approve".

## What the plan, the state file and the board say

**The short answer.** The plan is a sound plan for a narrower product. It builds a Python IDE with widgets for programmers, and puts the Builder, sharing and everything for the other two audiences after 1.0. The product statement asks for three audiences served equally and the Builder in 1.0.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the plan, the state file and the board say, scrolls sideways" style="--tw:960px" markdown="1">

| The statement asks for | What the plan holds today | Where it says so |
| --- | --- | --- |
| Widgets from Python | In 1.0: 12 premades, a person's own widget, refresh on app open, by Shortcut and in the background (Pro) | [`ops/plans/pywidget/plan.md`](../pywidget/pywidget-plan.html), <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 11-04 |
| A Python IDE with testing and preview | In 1.0: editor, console, projects, native prompts, Shortcuts actions, a preview pane | ADR-001 3.1; plan 11-04 |
| The Builder in 1.0 | Version 1.1, target early March 2027; about 6.75 engineer-weeks, an estimate, ±50% | plan 11-04; L17-builder.md s5 |
| Pages | A start only: "Make App" was ruled into 1.0 on 10-27, a run screen showing a project's console and native prompts; custom screens were left for 1.1. No open feature line carries it | ADR-001 ruling 10-27 |
| A marketplace of projects and components | Staged. 1.0: a Gallery of our own premades. Later: a web page of readable code, Builder documents passed as files, then an in-app Explore tab for Builder documents ("1.3"). Other people's Python inside the app: no date, not planned | ADR-006 s13 |
| iMessage | Desk research only. A narrow "go" after 1.0; no prototype built | L19-imessage.md |
| A Project as a directory with Python, data and media | Not planned as such. A project holds `.py` files; a widget is a copy sent to a separate library under the name written in its code | ADR-006 13.6; ADR-010 |

</div>


**On a phone, by the records (I measured nothing).** Internal TestFlight builds 2 to 4 reached an Investor's iPhone between 11-06 and 11-08 (`ops/milestones.json`). On build 4 only Countdown draws. The other premades do not, and the cause was not found when the queue audit judged the line on 11-11 (ledger row T-3783; board T-4180, P0). The device test for running Python inside the widget (T-0680) has no verdict: a 16-hour partial reading had 3 of 4 cold starts over the 15 MiB target and could not read the two-widget case (milestones, T-3107). Bank and tax details are still owed, so nothing can be sold and no test purchase runs on a phone (`ops/state.md`). The name is not chosen (#90).

**The board.** 170 open lines sit under "Build: pywidget"; 108 are build lines. On 11-12 they were grouped under 14 feature lines (T-4180 to T-4193), each with a done condition a person can see on a phone. The queue audit judged 280 app lines: 221 keep, 47 already done, 7 merge, 4 rewrite, 1 remove. All 14 features are IDE and widget features. None is a Builder, Page or sharing feature. Counts: `documents/restructuring/work/02a-counts.py`.

**The dates.** Release Tuesday 2026-12-15, freeze 11-30, submit 12-08. Six milestones, freeze to release, are each marked "at risk" in `ops/milestones.json` (as of 11-10). The one day of slack left on 11-04 is used.

## Where the app stands (from 2b)

Pernille read the code, the app guide and the design files ([`documents/restructuring/work/02b-code-and-design.md`](02b-code-and-design.html), cited below as 2b). She built and ran nothing.

**Built (code read):** widgets in six sizes with 12 premades; the IDE; Gallery previews; flat projects with zip import and export. **Not built:** Pages, the Builder, any marketplace, iMessage, background refresh, the first-run tour. The app guide (10-30) is behind the code (2b s1).

1. **Nothing is proven on a phone.** The one device record is the failure above (T-3783, open). Every figure in `bench/` is a Simulator figure. Close T-3783 before restructuring (2b s5).
2. **A project is three copies with five identities.** The folder of `.py` files; a copy in the widget library, made when saved text contains `Widget("<id>")`; a second copy for the extension. No assets, no subfolders. Her fix is item 1 of the next section: one folder, one `pywidget.json` listing outputs and permissions, one UUID that every other identity derives from. The file exists with id, name and entry, and only the tests compile its Swift reader. No migration is written. Points 3 and 4 need this first (2b s2, s4).
3. **The component boundary exists, in private.** Each premade splits `read()` (data) from `draw()` (view) (`pywidget/widgets/premade/_premade.py`). Make that contract public. A Builder document is then component names and settings, no code, which is what ADR-006's first marketplace stage may list (2b s4).
4. **Imported code has no trust model.** Zip import checks names, size and UTF-8, and gives no warning. The device router answers any call from any script. The banner for outside code is unbuilt [company research: `pywidget/docs/research/L12-security.md` 8.1] (2b s5).
5. **Extension memory has Simulator figures only.** Python in the extension holds about 27 MB after its runs, with no limit enforced. The 30 MB ceiling is [recalled, verify]; no number was found on Apple's pages ([`work/01a-platform-limits.md`](01a-platform-limits.html)). No phone and no Messages extension is measured (2b s5).
6. **The approved layout is unbuilt.** The app opens on a code editor in one navigation stack. The four tabs with Projects as home (`creative/approved.md` item 2) exist only as drawings; colour and type match. Split `ConsoleModel` before building the tab shell (2b s3, s4).

## Is the app positioned to reach the goal

**Partly. The engine is right. The shape around it is not.**

What is right, and should not be rebuilt:

- **Python makes data, Swift draws it** (ADR-002). This is the only way Python reaches a widget [company research: [`work/01a-platform-limits.md`](01a-platform-limits.html) s1, quoting Apple]. It is also what makes a Builder, a Page and a message card possible from the same code.
- **Python runs in the app; the widget only draws** (ADR-007 option b). No memory ceiling to fight, and the IDE keeps the full runtime.
- **No stranger's Python in our process** (ADR-006 s4), and no hidden features in a release build (guideline 2.5.19, as quoted in ADR-001's Revised table).
- **The Builder compiles to readable Python through Python's own syntax tree, never by pasting text** (L17 s2). A probe passed 15 of 15 hostile values on the host Python; it has not run in the app.

What an expert would do differently:

1. **Make the Project the unit, with one manifest.** The statement's Project holds Python, data and media, and feeds several outputs; today's is three copies (above). So: one folder, one stable ID, one manifest that lists the outputs (widget, Page, Shortcut action, later a message card), each naming the function that draws it. Shared code sits in the same folder and is imported by each output. The widget library becomes a cache built from the project, never a second source. Do this before any public release: today there is no installed base to migrate.
2. **One description format for every screen Python makes.** A Page is the widget tree plus parts a widget may not have: scrolling, lists, text entry, taps that call Python. A checker says which nodes each output allows. The Builder then needs one catalog of blocks, not one per output.
3. **Split reading data from drawing,** as the premades do (above): a "source" returns data, a "view" draws it. Sources are what people will reuse, and what a Builder data block wraps.
4. **Declare what a project touches.** A capabilities list in the manifest, checked where Python calls into Swift. It is the base of any safe sharing later, and a person reading a downloaded project sees what it can reach.
5. **Navigation by what a person wants, not by tool.** Three doors on one home: Make with blocks, Write Python, Browse. Underneath, the same Project.
6. **Prove each layer on a phone before building on it.** The records show the opposite order: three weeks of rules and tests for a widget lane with no phone verdict, while the premades do not draw on the one phone we have. I set that order. The 11-12 feature lines correct it; keep the rule.

**How the Builder fits 1.0.** Blocks, an inspector, and a read-only view of the generated Python, on the widget output only (L17's recommended E1 with option c). The compiler is Python and can be built and tested without Xcode, beside the iOS work.

**How the marketplace fits later without a rewrite.** Four things must be true before it: the manifest carries origin, version, licence and capabilities; capabilities are enforced; Builder documents are a stable, versioned format; an installed item is always the person's own editable copy. None needs an account or a server.

## Founder decisions (brief section 2.1): keep, change or drop

Proposals. Nothing changes until the Investors approve.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Founder decisions (brief section 2.1): keep, change or drop, scrolls sideways" data-n="1" style="--tw:921px" markdown="1">

| # | Founder decision | Proposal | Reason |
| --- | --- | --- | --- |
| 1 | The IDE is a full, standalone part of the product | Keep, re-centre | It is the programmer's third of the product, and it is what exists. The brief's "two pillars, equal weight" becomes three audiences, equal weight |
| 2 | Two build modes on one engine (Code and Builder) | Keep; move the Builder into 1.0 | This is the statement's core. One engine holds: blocks compile to the same Python a programmer writes (ADR-002; L17 s0) |
| 3 | Python is the widget language | Keep, widen | Python is the language of every output. It produces a description of the screen as data; fixed Swift code in the app draws it |
| 4 | Fully customizable widgets, other apps, device hardware | Keep as already corrected | The research narrowed the words: readings are sampled, never live; other apps are reached through Shortcuts only (L1-live-sensors.md; CORRECTIONS.md; plan 11-04, item 8) |
| 5 | The app can create Shortcuts and run any Python | Change the words | The app offers actions and ready recipes to Shortcuts; it cannot write into a person's Shortcuts library [company research: brief L9, ADR-010]. "Any Python" is bounded: native packages run only if we bundle them [company research: L13-packages.md] |
| 6 | A website to develop widget code from a computer | Set aside | Not in the product statement. Keep the small site of readable examples (plan 11-04). The web IDE and sync go to "maybe later" |
| 7 | A marketplace where users publish widgets, our premades there too | Keep the goal, change the form | An in-app store of other people's Python is rated High risk (L6-app-review.md s3; ADR-006 13.2). Staged: our premades, sharing by file, Builder documents in the app, other people's Python only on Apple's answer |
| 8 | Free base; a paid tier to publish, promote and access others' widgets | Change | The Investors have already changed it twice (#87, approved 10-30: Pro, $14.99 once; #142, as I read a bare "B-staged": Pro is background refresh and themes). Charging to access others' work puts a wall in front of the third audience. Proposal: browsing and installing are free; Pro holds power features (PROPOSAL-001-pricing part 1; the marketplace half has had no answer) |
| 9 | An expansive premade library | Keep at 12 | Premades now do three jobs: the consumer's <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, the Builder's starting points, the programmer's examples. Twelve that work beat 25 that half work |
| 10 | Polish | Keep | The two approved appearances, Paper and Studio, stay (`creative/approved.md` item 2) |

</div>


Two brief items sit outside 2.1 and outside the statement: the compatibility layer for the abandoned Python app's scripts (C3) and Shortcut Lab (Phase 5). Proposal: set both aside. ADR-005 then becomes history.

## ADRs: keep, change or drop

An ADR is the written record of one architecture decision. Proposals again.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: ADRs: keep, change or drop, scrolls sideways" style="--tw:1159px" markdown="1">

| ADR | What it decides | Proposal | Reason |
| --- | --- | --- | --- |
| 001, scope and phasing | 1.0 is the IDE first with narrow widgets; Builder and sharing later | Change: rewrite | Section 3 describes the programmer's product. The new text: three audiences, the Builder in 1.0, the project model in scope. Nine appended rulings and three re-datings make it hard to read. One clean revision; the old text archived |
| 002, view tree | Python produces a versioned description of the widget as data (JSON); Swift draws it | Keep, extend | The best decision in the set. One format serves widgets and previews, and a Builder can write to it. Extend it to Pages: scrolling, lists and text entry as added node types that only the app may draw. Land the reserved key that ties a drawn view to its block or code line (L17 s6, V1) |
| 003, packages | A bundled pure-Python set; native packages later | Keep | Unaffected. Its status line wants tidying |
| 004, editor | The Runestone editor behind our own interface | Keep | Unaffected. Its phone re-check (T-0479) is still open |
| 005, compatibility corpus | Rules for collecting the old app's scripts | History | Its subject leaves the product if C3 is set aside |
| 006, marketplace staging | No stranger's Python in the app's own process; Builder documents first; ask Apple before any server work | Keep the rulings, change the stages | These rulings are what let a marketplace arrive later without a rewrite. Changes: stages re-dated against the new 1.0; passing a Builder document as a file (stage S1b) arrives with the Builder; "component" gets a definition that survives 13.3 (see below) |
| 007, execution | Python runs in the app; the widget process only draws (option b); a lane that runs Python inside the widget (option c) sits behind a switch | Keep (b); close (c) by a date; rewrite as one text | Option (b) is right and suits Pages too. The lane has had first call on the one Xcode slot since 10-29 and has no phone verdict. At 31,724 words with 24 appended rulings, it is not a text anyone can build from. Add one rule: a single run queue serves widgets, previews, Pages and Shortcuts, in a stated order |
| 008, reserved, unwritten | The Builder | Write it first | Nothing of the Builder is built before it exists. L17 is its draft |
| 009, system TLS | https goes through iOS; the bundled OpenSSL is dropped | Keep | Unaffected: a smaller app and a simpler export answer |
| 010, Shortcut recipes | Three recipes in the Gallery as editable copies | Keep; remove its cause | Rules R5 and R6 exist because a widget's identity is a name typed in its code. A project manifest removes the need |
| gate-session-build | How the device test build measures memory | Keep until the verdict, then history | It serves one session |

</div>


**What a component is, so that ADR-006 still holds.** The statement's example is copying "only the Python code that fetches the local weather". Apple's rule bars apps that "download, install, or execute code which introduces or changes features or functionality of the app" [from the saved guidelines, 2.5.2, as quoted in ADR-006 13.2]. So a component shared inside the app is a block or a group of blocks: data that our own compiler, already in the reviewed app, turns into Python on the person's device. A component written as free Python travels as a file the person brings in themselves, until Apple answers.

## More intuitive, and room for the Builder

**More intuitive.** Proposals; phase 3 draws them.

- **Open on Projects, not on an editor:** the three doors above.
- **Show it before it ships.** A live preview beside the editor and the Builder, in each widget size, light and dark. Today only the Gallery previews (2b s1).
- **One word per thing.** The code and the drawings speak of scripts, projects, widgets and recipes. A person should see a Project and its outputs.
- **A project page says what it makes and what it touches,** read from the manifest.
- **Every premade has "Make it mine",** which opens it in the Builder as the same blocks.

**Room for the Builder,** in build order (steps 2 to 5 are 2b s4): (1) close T-3783; (2) the manifest and one identity, with a tested migration; (3) the public `read()` and `draw()` contract; (4) permissions checked at the router; (5) split `ConsoleModel`, then the tab shell; (6) ADR-008 and a versioned Builder document format, before any Builder code. Pages and a message card are then new outputs in the manifest.

**Documentation as a design step** (Investors, #41 c6837559986 and c6837583046, 11-12). Each app part gets a plain-English page and a diagram when it is designed, and the part is not done until both are current. The diagrams (screens, the Python run, the path from script to Home Screen, storage, the extension, purchases) are drawn by code from the code, regenerated when the code changes, and shown on the site. No AI images. Tool licences are checked under Commandment 6; a paid service waits for "approve". The research and the choice of tool are step D1's, in [`documents/restructuring/07-documentation.md`](07-documentation.html).

## Risks, ranked

1. **Nothing is proven on a phone.** Only Countdown draws there, cause not found (T-3783, open), and Python inside the widget has no phone verdict (T-0680). *Reduce:* close T-3783 before any restructuring; then a phone record for each layer before the next is built on it.
2. **The Builder in 1.0 does not fit 12-15.** About 6.75 engineer-weeks, ±50%, an estimate (L17 s5). The dates from freeze to release are already at risk and the slack is used. *Reduce:* the Investors choose date or scope (question 1); the first Builder makes widgets only; ADR-008 comes first; the compiler is built off the Xcode slot.
3. **App Review refuses shared runnable code.** Guideline 2.5.2 and agreement clause 3.3.1(B) are rated high for marketplace downloads and for paid, app-like Pages [company research: `work/01b-review-and-marketplace.md`]. *Reduce:* 1.0 lists only our own premades; components travel as blocks; Apple is asked before any server work (ADR-006).
4. **Imported code has no trust model** (2b s5). *Reduce:* the outside-code banner on zip import now; manifest permissions and the router check before any sharing is advertised.
5. **The project model changes under 170 open lines, with no migration written.** *Reduce:* do it before public release; one tested migration; the board regrouped by feature (T-4116).
6. **Extension memory is unmeasured on a phone** (2b s5). *Reduce:* one device session before Python in the widget or iMessage is promised.
7. **Nothing can be sold yet:** bank and tax details, and the name (above). *Reduce:* both are the Investors'; phase 5 dates each.
{% endraw %}

</div>
