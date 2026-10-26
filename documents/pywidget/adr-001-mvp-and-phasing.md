---
layout: "default"
title: "ADR-001: Version 1 scope and phasing"
section: "documents"
description: "The promise v1 proves. You can write and run real Python on iPhone and iPad in a polished, current environment, and the same Python can put a beautiful widget on your home screen."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/adr-001-mvp-and-phasing.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/decisions/ADR-001-mvp-and-phasing.md</code></span></div><h1>ADR-001: Version 1 scope and phasing</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: accepted by the CEO, 2026-10-25 19:27 ET. Changes to founder decisions (brief 2.1) are not made here; they are in PROPOSAL-001 and wait for the Investors.
- Author: Ines (CEO). Review: Idris reads it for engineering feasibility when the L3 spike lands; ADR-002 (execution architecture) may move the widget cut line, never the IDE scope.
- Inputs: ops/plans/pywidget/build-brief.md (sections 0, 2.1, 2.3, 2.5, 5 L10, 6); ops/plans/apple-day7.md; <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span>/PITCH-12.md and research/hunt/H134.md, H150.md, H154.md (the Runpy evidence).

## 1. Context

The Investors chose the product at 18:39 ET on 2026-10-25 (#41 c6404397645). The brief is honest about its size: it is three to five products (L10). Read as written, it is a Python IDE, a widget engine, a block builder, a compatibility layer for another app's scripts, a web IDE with sync, a moderated code marketplace with billing, Shortcut Lab, and a possible iMessage extension.

What we have: 26 days to <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> (2026-11-20). One iOS engineer (Idris) and one Xcode task at a time on the Mac mini. Apple membership pending, due Day 7 (2026-10-28); Paid Apps Agreement, tax and banking due Day 12 (2026-11-02). Day 20 (2026-11-10) is the last safe submission day (ops/plans/apple-day7.md). Nothing is built yet; the CPython embed spike (L3/L13) started tonight.

What would make this fail: trying to ship the brief. A code-running app gets a careful first review; one rejection costs about a week; a version 1 that tries to carry widgets, blocks, compatibility and a marketplace at once will be late, rough, or both, and the founder's quality bar ("very aesthetic and polished") rules out rough.

## 2. Options considered


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Options considered, scrolls sideways" style="--tw:1600px" markdown="1">

| Option | What v1 <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> | By Day 17-20 | Earns by Day 30 | Verdict |
| --- | --- | --- | --- | --- |
| A. The brief's Phase 1 as written | C1, C2, full C5, C4 with every family and interactivity, C7 basics, about 10 widgets and 10 scripts | Not at review quality. C5 alone (editor, REPL, debugger, packages, iPad multi-window) is weeks; C4 is blocked by L1-L5 | Nothing (billing is Phase 4) | Rejected |
| B. IDE only | C1, C5 core, C7 Run Script | Yes, with margin | Nothing under 2.1 (base app free, no marketplace to pay for) | Rejected as the plan; kept as the fallback if widgets miss the cut line |
| C. IDE core plus a narrow widget engine, with a paid tier whose v1 content is the premade library | C1, C5 core, C2 subset, C4 static widgets rendered from a view tree, C7 Run Script, 12 premade widgets, C12 one Pro unlock | Yes if the widget engine stays narrow (section 3) and Python never has to run in the widget extension for v1 | Yes, inside 2.1 (section 5; pricing is the Investors' call) | **Chosen** |
| D. Option C with the paid tier also carrying IDE power features | As C | As C | More, and it survives a widget slip | Recommended to the Investors in PROPOSAL-001; departs from 2.1, so not assumed |

</div>


## 3. Decision: version 1.0

**The promise v1 proves.** You can write and run real Python on iPhone and iPad in a polished, current environment, and the same Python can put a beautiful widget on your home screen.

**IDE pillar first** (brief 2.3: "the IDE must be usable and shippable for script-only users, even if widgets slip"). The IDE scope is fixed; the widget scope has a cut line.

### 3.1 In version 1.0

C1 Python runtime
- Upstream CPython for iOS (PEP 730; version per the spike, 3.13 or later), no fork. Standard library. Pure-Python packages bundled in the binary per the L13 policy ADR (candidates: requests and its pure-Python dependencies, jedi, pyflakes). Native packages (Pillow, NumPy) only if ADR-003 shows prebuilt iOS wheels working by Day 10; otherwise 1.1.
- Swift-Python bridge: run a file or a string, stream stdout and stderr, `input()`, stop (interrupt), restart, tracebacks with file and line.

C5 Python IDE, core (brief 2.5)
- Projects: folders and multi-file projects in the app container and in a user-chosen Files or iCloud Drive folder (open in place); import and export `.py` and zip.
- Editor: syntax highlighting with design-system themes (light and dark), an extra key row on iPhone, find and replace, tabs, line numbers, go to line from a traceback; hardware keyboard shortcuts on iPad (run, stop, find, tabs).
- Completion for the standard library, bundled packages and our modules (jedi in the embedded interpreter, if Odalys's tooling read shows it is fast enough; else keyword and module-member completion only).
- Inline errors from pyflakes on save.
- Run in the foreground with a console: `input()`, stop, restart, script arguments, a log of past runs, plain-text and table output.
- Native UI from scripts, modern API only: alerts, text and number prompts, forms, lists, pickers, HUD (`pywidget.ui`, name provisional).
- Built-in docs for our modules; 10 example scripts and a short first-run tour.
- iPhone and iPad, universal; iPad gets a sidebar and editor split. Dynamic Type, VoiceOver labels, light and dark throughout.

C2 device modules, subset
- clipboard, files, notifications (local), http (through the standard library and requests), location (when in use), motion history (pedometer steps, floors, distance from CMPedometer), keychain (the user's own secrets).
- Not in v1: HealthKit, contacts, photos, calendar and reminders (each adds a permission screen, a privacy-label line and review questions; they come in 1.1 and 1.2).

C7 Shortcuts
- App Intents: Run Script, Run Script with Input (returns the script's output), Refresh Widgets; an AppShortcutsProvider so they show with no setup.

C4 widget engine, narrow (behind the cut line in 3.3)
- A Python view DSL that mirrors widget-safe SwiftUI: stacks, text (including date styles that tick without code), SF Symbols, gauges, progress views, shapes, gradients, container background. Serialised to a versioned JSON view tree (L4) and drawn by one SwiftUI interpreter in the widget extension.
- Families: small, medium, large, and the Lock Screen accessory families (circular, rectangular, inline). Full-color and accented rendering modes handled by the renderer.
- Execution, default unless ADR-002 says otherwise: Python runs in the main app (foreground, background refresh, or the Refresh Widgets intent from a Shortcuts automation) and writes a timeline of view trees to the App Group; the extension only renders (L3 option b). This keeps the extension inside its memory limit whatever the spike measures, and keeps the IDE's runtime full-size.
- The time model is explicit in the API (`sampled_at`, `stale_after`), so no widget promises live data (L1).
- No interactive buttons in v1 (L5 is 1.1).

C11 premade library
- 12 first-party widgets, written in our own Python DSL and shipped inside the binary, source viewable and editable by the user: time and countdowns, sunrise and sunset, steps and floors (motion history), distance to a saved place, altitude, a habit tracker, a Shortcuts launcher, battery and storage, calendar-free day progress, a quote of the day from a bundled public-domain list, world clocks, a GitHub repository status widget (official public API, user's own token in the Keychain). Weather only if a data source with commercial-use terms and no cost is found (Wrenna's data-source line); WeatherKit needs the membership.

C12 billing
- One in-app purchase, "Pro", StoreKit 2, tested with a StoreKit configuration file in Xcode until App Store Connect exists. Contents and price per section 5 and the Investors' answer.

C13 design system
- Maren's v0 tokens, type, color, editor themes and widget templates, applied to every screen and every premade widget. Design is a deliverable with review screenshots, not a finishing pass.

Privacy
- No account, no server, no analytics, no tracking. Scripts and widgets stay on the device and in the user's chosen folders. The privacy label and policy are drafted against the fact that the user's own code can make network requests (Wrenna's privacy line).

### 3.2 Not in version 1.0, and where it goes


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.2 Not in version 1.0, and where it goes, scrolls sideways" style="--tw:1047px" markdown="1">

| Item | Component | Moves to | Why |
| --- | --- | --- | --- |
| Debugger (breakpoints, stepping, variables) | C5 | 1.1 (Day 30-40) | bdb in an embedded interpreter with a UI is a week of work by itself |
| Formatter | C5 | 1.1 | Ruff is native code; Black is large; neither is needed to prove the promise |
| Share sheet / Action extension "Run Python on this" | C5, C7 | 1.1 | A second extension with its own memory limit; v1.1 hands off to the main app |
| Compatibility modules for the abandoned app's scripts (console, dialogs, clipboard first) | C3 | 1.1 at the earliest | Needs the human legal review of API compatibility first (brief L15, a human checkpoint) and a corpus <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> under our GitHub hold (#53) |
| Interactive widgets, Control Center controls, Live Activities | C4 | 1.1 | L5 and L1 work; v1 widgets are static timelines |
| HealthKit, contacts, photos, calendar, reminders modules | C2 | 1.1-1.2 | Review and privacy weight; each needs its own permission flow |
| Package browser and pure-Python installs | C5, L13 | 1.2, after an App Review read | 2.5.2 risk; v1 ships a fixed bundled set |
| Block builder (Builder mode) | C6 | 1.2 (Phase 2) | Founder decision kept; blocked by L4 and L17 |
| Web IDE and sync | C8, C9 | Phase 3 | Needs a backend or CloudKit decision and the L14 fidelity work |
| Marketplace, publishing, community widgets | C10 | Phase 4, in a later update with its own review notes | L6 (2.5.2, 4.7), L11, L12, L16 are blocking; staged release is the brief's own option (c) |
| Shortcut Lab (flow view, history, diff, lint) | C7 | Phase 5 | L9: no supported access to the user's shortcuts library |
| iMessage extension | C14 | Phase 6, only on an L19 "go" and Investor approval | Human checkpoint |
| Apple Watch, Mac, visionOS, CarPlay, StandBy-specific layouts | surfaces | Not before Day 30 | Proposed in the L18 proposal |

</div>


### 3.3 The widget cut line

On **Day 14 (2026-11-04)**, the cut date in ops/plans/apple-day7.md, the widget engine is in v1.0 only if: (a) at least 8 of the 12 premade widgets render correctly in every family they claim, in light and dark, full-color and accented; (b) a user-written widget goes from the editor to the home screen in the Simulator; (c) Maren's review screenshots pass. If not, v1.0 ships IDE-only, the widget extension is removed from the build, and widgets ship in 1.1. Recorded here so the call on Day 14 is not made under pressure.

If widgets are cut, the Pro tier has no v1 content under the 2.1 reading in section 5, which is the main reason PROPOSAL-001 exists.

## 4. Milestones (Day 5 to Day 20)

Owners in ops/plans/pywidget/plan.md. All builds Simulator-only until membership is active. TestFlight and App Store submission are human checkpoints: the company asks, the Investors approve.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. Milestones (Day 5 to Day 20), scrolls sideways" style="--tw:795px" markdown="1">

| Day | Date | Milestone | Done means |
| --- | --- | --- | --- |
| 5 | 2026-10-26 | Spike numbers; research drafts | L3 cold start and memory in app and extension; L1, L2, L6, L7, L13 drafts; C13 v0 |
| 6 | 2026-10-27 | Architecture decided | ADR-002 execution architecture (Fable); ADR-003 package policy; ADR-004 editor engine; L4 view-tree schema v1 |
| 7 | 2026-10-28 | Runs Python | App, widget extension and App Group in pywidget/ios; a script runs with console and `input()`; Apple membership due |
| 8 | 2026-10-29 | Edits and renders | Editor with highlighting and key row; a fixture view tree renders in the extension; Run Script intent |
| 9 | 2026-10-30 | End to end | A Python widget written in the editor reaches the home screen; Pro purchase works in StoreKit testing |
| 10 | 2026-10-31 | Alpha | Projects and Files, device modules, 6 premade widgets, 10 example scripts; native-package go/no-go |
| 11 | 2026-11-01 | Review pack v1 | App Review readiness matrix, privacy policy and label drafts, store page draft |
| 12 | 2026-11-02 | Paid Apps due; iPad | iPad layout and shortcuts; 12 premade widgets; accessibility pass; Investors' pricing answer needed |
| 13 | 2026-11-03 | Feature freeze | No new features; bug list only; TestFlight build asked for if membership is active |
| 14 | 2026-11-04 | Cut date | Widget cut line applied (3.3); device pass on TestFlight if the Investors approved it |
| 15 | 2026-11-05 | Store assets | Code-drawn icon and screenshots, store page and review notes; creative approval asked (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>) |
| 16 | 2026-11-06 | Release candidate | Fable whole-product review; regression; Investors asked to approve submission |
| 17 | 2026-11-07 | Submit | Submitted, with Investor approval |
| 18-20 | 2026-11-08 to 11-10 | Review window | Rejection replies on Fable; Day 20 is the last safe resubmission |
| 20-30 | 2026-11-10 to 11-20 | Selling; 1.1 | Bug fixes first; then the 1.1 list |

</div>


## 5. Money (summary; details in PROPOSAL-001)

As written, 2.1 makes the base app free and charges a paid tier to publish and to access marketplace widgets, and the marketplace is Phase 4. So v1 as the brief phases it earns nothing by Day 30.

The closest reading that stays inside 2.1: the first-party premade widgets are, in 2.1's own words, "offered there too" (in the marketplace). In v1 the marketplace exists only as its first-party <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>, inside the app binary: Pro unlocks the premade library, and later the same Pro tier adds publishing and community widgets when Phase 4 ships. The base app stays free and complete for anyone writing their own Python and their own widgets. Whether premade widgets are free or paid is one of the brief's open L18 questions, so this is a resolution of an open question, not a change; pricing stays the Investors' call (brief section 0).

PROPOSAL-001 recommends adding IDE power features to Pro, because the counted paying buyer we have (the Runpy evidence) pays for a Python environment, not for widgets, and because a widget slip would otherwise leave nothing to sell.

## 6. Consequences

- C12 billing moves from Phase 4 to v1 (one non-consumable, no server). Phase order otherwise as the brief, with C3 moved behind the legal checkpoint.
- The repo tree stays as the Operator set it: pywidget/ with docs/{research,decisions,proposals,design}, ios/, web/, widgets/, tests/. Added: pywidget/examples/ (example scripts), pywidget/docs/release/ (review matrix, privacy drafts, store page). No backend/ until Phase 3.
- Every v1 feature must appear in the App Review readiness matrix before Day 15.
- The IDE gets no widget-driven limits: scripts in the app use the full runtime (brief 1.1a).

## 7. Risks


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7. Risks, scrolls sideways" style="--tw:1054px" markdown="1">

| Risk | Likelihood | What it costs | Mitigation |
| --- | --- | --- | --- |
| App Review on a code-running app (2.5.2) | Medium | A week per rejection; past Day 30 | User's own code only, fully viewable and editable; no downloaded code, no pip, no gallery in v1; precedent Pythonista, Pyto, Juno, a-Shell, Scriptable; matrix and notes by Day 11; submit Day 17 |
| Apple membership after Day 7 | Medium | No TestFlight device pass; later product setup | Simulator and StoreKit testing until then; ops/plans/apple-day7.md cut dates |
| CPython embed or bridge harder than expected | Medium | The whole schedule | Upstream builds, BeeWare support; spike first; the hire in plan.md |
| Widget engine misses Day 14 | Medium | Pro has no v1 content under 2.1 | Cut line 3.3; PROPOSAL-001 |
| One Xcode task at a time | High | Serialises the iOS build | Python-side work (DSL, tooling, examples, premade widget code) is testable in host Python and runs in parallel |
| Sales: a free app, zero ratings, about 10 selling days | High | Day 30 target | Pro priced and scoped by the Investors; store page on Opus; the Investors' own reach (the company does no outreach) |
| Polish below the founder's bar | Medium | Rejection by the founder, poor conversion | Design first (C13 v0 before screens), review screenshots per milestone, Maren signs off each screen |
| Platform facts in the brief are stale | Medium | Rework | Every L-doc checks Apple's current docs; contradictions in pywidget/docs/research/CORRECTIONS.md |
| Incumbent Python app updates | Low | Weakens the switcher story | The IDE stands on its own; widgets are the second reason to buy |

</div>


## 8. Evidence

- Brief sections 2.3, 2.5, 5 L10 (scope), 6 (dependencies).
- Runpy: pitches/PITCH-12.md (incumbent $9.99 paid up front, 1,528 US ratings, last update 2023-04-27; 11 of 11 2026 low reviews on 3.4; Day 30 ruled C on the paid <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>), research/hunt/H154.md (0 of 27 2026 forum posts asking where to move scripts; the stranded buyer is not counted asking).
- ops/plans/apple-day7.md (Day 14 cut date, Day 20 last safe submission).

## Revised, 2026-10-25 19:36 ET (Ines)

Tonight's research landed after the 19:27 acceptance. These facts change the text above; where they conflict, this section wins. Scope and the cut date do not change.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Revised, 2026-10-25 19:36 ET (Ines), scrolls sideways" style="--tw:1280px" markdown="1">

| Section | Was | Now | Source |
| --- | --- | --- | --- |
| 3.1 C1 | "version per the spike, 3.13 or later" | CPython **3.15.1**, upstream python.org iOS XCframework, pinned with checksum and signature. Native wheels are cp315 or abi3, built by us with cibuildwheel; BeeWare's mobile-forge cannot build 3.15 | pywidget/ios/scripts/fetch_python.sh; L13 s1-s2; CORRECTIONS (Odalys) |
| 3.1 (new) | No deployment floor stated | **iOS 18.0** floor; iOS 26 and 27 APIs behind `#available`. Clears numpy's iOS 17.0 wheel tag. Install share unread; reviewed each WWDC | L9 s2.1; L13 s2; PROPOSAL-002 s4 |
| 3.1 C1 native packages | Pillow, NumPy "only if ADR-003 shows prebuilt iOS wheels working by Day 10" | Same Day 10 gate, but the wheels are built here, order numpy, Pillow, matplotlib (Agg). The primary audience (PROPOSAL-002 s1) raises their priority | L13 s3 |
| 3.1 C4 and 3.3 (a) | "Full-color and accented rendering modes" | Rendering modes are exactly full color, accented and **vibrant** (Lock Screen, StandBy). The iOS 18 tinted and iOS 26 clear looks arrive as accented. The cut line checks all three; there is no glass API on iOS | L4 s7; CORRECTIONS (Idris) |
| 3.1 C4 families | small, medium, large, accessory three | Plus `systemExtraLarge` on iPad in the renderer (premades claim it only where designs pass). `systemExtraLargePortrait` (iOS 27) goes to 1.1 | L4 s7; PROPOSAL-002 s2 |
| 3.1 C2 location and the "distance to a saved place" premade | location (when in use) | Under When-In-Use a widget gets a fix only if it was seen in the last few minutes. v1 stays When-In-Use (no Always prompt in a first review); that premade shows `sampled_at`, and PWL003 warns users | CORRECTIONS (Idris, L1); L2 s3.2 |
| 3.1 C11 weather | "only if a data source with commercial-use terms and no cost is found" | Zero-cost route found: Apple Weather through the user's own Shortcut feeding Run Script with Input. It ships as an example recipe, not a premade (it needs the user to build an automation) | L16 |
| PROPOSAL-001 s6 and 3.1 C12 flags | "every Pro gate behind a flag" | Guideline 2.5.19 (2026-10-16) bars hidden or dormant features. Unreleased capabilities (marketplace, online pip, sync, iMessage) are **compiled out** of release builds; the Pro contents are a build setting fixed before submission, visible in the app and the store text, never a remote switch | CORRECTIONS (Wrenna, L6); L10 s4 |
| 3.2 formatter | "Black is large" | Black ships a pure-Python wheel and can be bundled; still 1.1, and a candidate Pro power feature | L13 s3 |
| 3.2 C3 compatibility | 1.1 at the earliest | Unchanged, and note: an objc_util-style bridge (ctypes) for local scripts and in-process marketplace code exclude each other (L12 Q1). Decided before Phase 4 | L12; CORRECTIONS (Odalys) |
| 7 Risks | "Incumbent Python app updates: Low" | Replaced by **"Juno adds widgets: Medium"**. Juno is maintained (Python 3.13, App Intents, native pickers, 2026-10-20) and is the main threat to the IDE pillar; Pythonista, Pyto and Scriptable are stale. Mitigation: free to run, Python 3.15, Lock Screen and StandBy widgets, Pro carrying IDE power features (PROPOSAL-001 option 3) | L7 s1; CORRECTIONS (Wrenna) |
| 3.2 surfaces row | "Proposed in the L18 proposal" | See PROPOSAL-002 s2: Control Center Run Script control is a dated stretch (Day 12), else first in 1.1 | PROPOSAL-002 |

</div>


## Chair rulings, 2026-10-25 19:57 ET (Ines): marketplace staging and L12 Q1

Full text, reasons and risks: pywidget/docs/decisions/ADR-006-marketplace-staging.md. Where they conflict with the text above, ADR-006 wins. Scope, cut line and dates in sections 3.3 and 4 do not change.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Chair rulings, 2026-10-25 19:57 ET (Ines): marketplace staging and L12 Q1, scrolls sideways" style="--tw:960px" markdown="1">

| Section | Was | Now |
| --- | --- | --- |
| 3.2 Marketplace row | "Phase 4, in a later update" | Staged: S0 v1.0 has no gallery of others' code (premades compiled in, export to `.py`, marketplace code compiled out); S1 first-party web gallery after v1 approval (publishing needs the Investors); S2 community web gallery not before Day 30; S3 in-app marketplace in Phase 4 only after the person's guideline read, L12 Q4 and Apple's answer if the Investors choose to ask. No Day 30 revenue rests on any stage, so no new PROPOSAL under brief rule 4; PROPOSAL-001 carries the money question |
| 3.2 Package row | "Package browser and pure-Python installs: 1.2" | Install from file (pure-Python `any` wheels only) is a v1 stretch: in only if landed by Day 13 and rated Low or Low-Medium in the readiness matrix, else 1.1. Online pip: 1.1, on the person's read of 2.5.2 and 3.3.1(B) and a PyPI index ruling; compiled out of release builds until then |
| 3.2 C3 row, and the Revised table's L12 Q1 line | "Decided before Phase 4" | Decided: marketplace Python never runs in the app's process (M1 struck); Builder documents first, Pyodide in a WKWebView only after its spike. objc_util stays out of v1 and needs the L15 legal review, a 2.5.1 reading and its own ADR before any later release |

</div>


## Note, 2026-10-25 20:15 ET (Idris): numbering of the execution-architecture ADR

Where this document says "ADR-002 (execution architecture)" (header, 3.1 C4, milestone row 6), read **ADR-007**: pywidget/docs/decisions/ADR-007-execution-architecture.md (proposed 20:12). ADR-002 is the widget view tree; ADR-003 stays reserved for packages (plan.md row 6). ADR-007 confirms this document's option-(b) default from the L3 spike's numbers and does not move the widget cut line.

## Chair rulings, 2026-10-25 21:16 ET (Ines): battery premade and MET Norway weather

Settles CORRECTIONS U1-11 and U1-12. Scope list in 3.1 changes as below; the cut line (3.3: 8 of 12 render correctly, Day 14) does not.
- **Battery and storage becomes "Storage" in v1.** C2 has no battery call, and with `_ctypes` stripped (ADR-006 s4) Python cannot reach UIDevice. Under option (b) any battery read would come from the app's last run, often hours old, beside Apple's own live Batteries widget; a stale battery number loses that comparison on sight. Storage needs no new API (`shutil.disk_usage` from the stdlib). Battery goes to 1.1 with a C2 module and the same freshness question C2-Q1 answered for location. Still 12 premades. Maren's R3 ("battery in extension") is dropped for v1.
- **No MET Norway in 1.0.** The 19:36 Revised row stands and is now the ruling: weather ships as the example Shortcut recipe through Run Script with Input (a v1 intent), not as a premade. A premade calling api.met.no by default would send the user's coordinates and IP to a third party, break the privacy drafts' "no weather source" condition, and need a policy line, a credit line and at scale a proxy (a server: Investors). Day 30 rests on Pro, not weather. A user's own script may call any weather API through `pywidget.http`; that is their choice, not ours. MET Norway returns for 1.1 only with Wrenna's privacy-label read.
{% endraw %}

</div>
