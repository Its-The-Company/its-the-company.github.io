---
layout: "default"
title: "L17 \u2014 Builder for 1.2: editor engine and the blocks-to-code relationship"
section: "documents"
description: "No user test with non-coders was possible: recruiting people is outreach (C10). Section 7 Q1 asks for it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l17-builder.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/research/L17-builder.md</code></span></div><h1>L17 — Builder for 1.2: editor engine and the blocks-to-code relationship</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>: L17 (brief Section 5, blocking C6). Board: T-0018 (P3). Author: Idris. Written 2026-10-26 00:11 ET. Status: desk research for a builder ADR (proposed number ADR-008, unused today). Not a decision: the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> rules.

Read for this: build brief s2.1, s4 and L17 text; L4-view-dsl.md (s0, s2, s8, s9, s14 <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G18</span>); viewtree.schema.json and manifest.schema.json as committed; pywidget_ui API.md (library 0.3.0) and the names reviews (s7-s8 rulings); bridge-contract.md v4 (b25dc911) s3, s7 and the `widget_tree` record; `_pywidget_runtime/widget_tree.py` `parse_request`; ADR-001 3.2 (Builder in 1.2); ADR-006 s2 (S3), s4 (compiler rule), s10.3 (1.2.1); ADR-007 s2, s4, s5.1, s8.3; Maren's C5 IDE spec (design/ide/spec.md s2, s5.6, s5.8); L6 primary rows; L7 s3 (differentiator 2).

Sources and tags. App Review text is quoted from the Investors' print of the guidelines page (#59, `/private/tmp/i59pdf/`, 56 pages, read with `tools/pdftext.swift` today; page numbers are the print's). Blockly facts are from its own repository files, fetched through `terms_guard` and saved in `L17-raw/pages/`. The injection probe is `L17-raw/bin/inject_probe.py`, output `L17-raw/inject_probe.out` (host CPython 3.9.6, not the app's 3.15.1). Anything not read today is **[recalled]**. Effort figures are my estimates, unmeasured, and I would put ±50% on each.

No user test with non-coders was possible: recruiting people is outreach (C10). Section 7 Q1 asks for it.

## 0. What v1 already decides for the Builder

These are fixed by documents already accepted. The Builder has to fit them, not reopen them.

1. **One format.** Builder blocks compile to the same `pywidget_ui` Python, which produces the same view tree (ADR-002, L4 s0 item 2). There is no Builder-only tree and no Builder-only renderer.
2. **Python runs in the app, the extension only renders** (ADR-007 s4). A Builder widget is a Python widget at run time: same triggers <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>-T4, same budgets, same `widget_tree` record (contract s7), same `tree.json`.
3. **The compiler never splices strings** (ADR-006 s4): "Block values are data. The compiler builds Python from the AST or with literal encoding (`repr`-safe constants); no string from a document is ever spliced into source." The ADR carries this with an injection test.
4. **Nothing marketplace-shaped ships before S3** (ADR-006 s2). The 1.2 Builder has no gallery, no import of other people's documents and no dormant path for either (2.5.19, p. 21: "Don't include any hidden, dormant, or undocumented features in your app").
5. **The manifest already reserves the kind.** `manifest.schema.json` has `kind: builder_document` and allows a `.json` entry. One gap there (section 6, V3).
6. **The IDE screens already have the preview pane.** Maren's iPad layout (spec s5.8) puts the widget preview, with family and mode switches and an entry stepper, in the resizable right pane; on iPhone the right pane is a sheet. Tour page 3 (s5.6) already does a live edit of a premade with the preview redrawing as the user types. The Builder reuses both.
7. **The product claim.** L7 s3 differentiator 2 reads: "Start with blocks, open the Python behind them, keep editing either way." "Either way" is a round-trip claim. Section 4 says what the store text may say for each option.

## 1. The two questions

**Q-E (editor engine).** Native SwiftUI, or a web block editor (in practice Blockly) in a `WKWebView`?

**Q-R (code relationship).** (a) one-way eject; (c) hybrid: read-only code view until eject; (b) round trip over an AST subset.

They are mostly independent. The engine decides look, accessibility, iPad and web reuse; the relationship decides the compiler, the parser and what the store may promise. One part is shared by every option and is costed once: the block catalog and the compiler.

## 2. The shared core: catalog and compiler (every option needs it)

**Where the compiler runs: in Python, built from `ast` nodes.** The app has CPython on the device (ADR-007), and the web IDE has Pyodide (brief, web stack), so one compiler written in Python serves both, and the round-trip parser, if built, is the same module reading `ast.parse` output. A compiler in Swift would be a second implementation for the web and a third for the parser.

**Why `ast` and not text templates: the probe.** `inject_probe.py` builds `ui.Text(<value>)` as an `ast.Call` with `ast.Constant(value)`, unparses it, parses it back, and checks that the module still has exactly one statement and the literal comes back equal. 15 of 15 hostile values passed, among them `"); import os; os.system("x`, `'''`, `"""`, a raw `\n`, `\r`, U+2028, NUL, form feed, a lone surrogate, `{x}` and `a" + __import__("os").getcwd() + "b`. `ast.unparse` writes every constant through `repr`, so a value cannot become code. That is ADR-006's rule satisfied by construction, not by escaping.

**Where it still can splice: comments and names.** Comments are not in the AST. The probe's second half writes a block title into a header comment: with a raw newline in the title, `ast.parse` finds **2** statements (the title's second line ran as code); with every non-printable character replaced (`str.isprintable`), it finds 1. Identifiers are the other door. Rules for the spec:
- Comment text: replace every character that is not `isprintable()` with a space, <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> at 80 characters. Test: the injection set above as block titles; the module's statement count must not change.
- Identifiers: the compiler invents them (`value_1`, `value_2`); the user's name for a value lives only in a sanitized comment and in the block document. No user string ever becomes a `Name`, `attr` or keyword.
- `ast.unparse` output can change between CPython minors **[recalled]**; golden files are pinned per bundled runtime, and a runtime update regenerates them in the same commit.

**The catalog is one table.** One row per block: schema name, Python constructor, inspector fields and their types, the block's label (Maren's copy), canonical modifier position. The palette, the inspector, the compiler, the parser (if any) and the tests all read it. I did the same for L4's schema and serializer enums and tested that they agree; it is the cheapest guard against drift between four consumers.

**Catalog shape (sketch; the full catalog is the ADR's deliverable).**


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The shared core: catalog and compiler (every option needs it), scrolls sideways" style="--tw:960px" markdown="1">

| Block group | Compiles to | Non-coder exposure |
|---|---|---|
| Layout: Vertical, Horizontal, Layered stack, Spacer, Divider, Group | `ui.VStack`/`HStack`/`ZStack`/`Spacer`/`Divider`/`Group` | All |
| Content: Text (string, date/timer, number), SF Symbol, Gauge, Progress, the five shapes and `ContainerRelativeShape` | the matching nodes (L4 s2-s4) | All; bitmap and custom fonts hidden |
| Look (inspector rows, not blocks): padding, frame, background, foreground, font, corner clip, shadow, opacity | modifiers in a fixed canonical order | Order hidden; an "Advanced: order" list for the rest |
| Per-family and mode variants | `ui.When("family", ...)` / `renderingMode` / `stale` | As a "Show on" switch per block |
| Data (values): widget state, current date, the C2 device modules, one HTTP JSON field | statements in `render(ctx)` before the `return` | All, each with its permission note |
| Recipes: ring, sparkline, bar chart | calls to a public recipe module (open: section 7 Q4) | All; raw `Path` hidden |
| Interactivity (when L5 ships): Button, Toggle with a named action | `@w.action` handlers | After 1.1 |

</div>


Modifiers as inspector rows, not stackable blocks, is the main UX choice inside the catalog: SwiftUI's order matters (padding then background differs from background then padding, L4 s1), and a non-coder should not have to know it. The compiler writes modifiers in the canonical order; an explicit order is an advanced setting.

**Preview runs the compiled Python.** The Builder preview is a `context: .widget` run of the generated file with sample state, rendered by the same SwiftUI renderer the extension uses. What you see is what runs. Cost, Simulator only: tiny script 14.3 ms median, 26.5 max, in the app (ADR-007 s2); `pywidget_ui` import time is **unmeasured**, and nothing is measured on a device. The interpreter is shared, so a preview waits behind a console run or a T1 sweep (ADR-007 s5.1). The fallback, if a device measurement says the preview lags: lower blocks to a tree in Swift for the instant redraw and confirm it with the Python run. That is a second code path; it needs an equality test (Swift-lowered tree byte-equal to the Python tree for every catalog fixture) and is not the default.

**Errors map back to blocks.** `ViewTreeError` carries `.filename` and `.lineno` (API.md), tracebacks carry user frames with lines (contract s8), and the compiler keeps a line-to-block map, so an error lands on the block that caused it.

Shared core effort: catalog, compiler, golden and injection tests, document format and its version field: **2.0 engineer-weeks** (Pernille for the compiler, me for the tests and the Swift side).

## 3. Q-E: editor engine


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Q-E: editor engine, scrolls sideways" style="--tw:1600px" markdown="1">

| | E1 Native SwiftUI, structured list | E2 Native SwiftUI, free 2D canvas | E3 Blockly in a bundled `WKWebView` | E4 Template form only (no blocks) |
|---|---|---|---|---|
| What it is | A vertical list of blocks, nesting by indentation, like the Shortcuts editor; palette sheet; inspector for the selected block; live preview in Maren's right pane / sheet | Scratch-style blocks placed anywhere on a pannable canvas | Google's block library, now maintained by the Raspberry Pi Foundation (its `package.json`: `"author": "Raspberry Pi Foundation"`), Apache-2.0 (`LICENSE`), custom blocks for our catalog | Pick a premade or template, edit its fields; the tour's live edit grown up |
| Effort beyond the core (ew) | 4.0: list editor with drag reorder, move-into and undo 2.0; inspector and data blocks 1.0; preview, errors, line map 0.5; VoiceOver, Dynamic Type and iPad pass 0.5 | 7-9: hit-testing, snapping, zoom and pan, overlap rules, then all of E1's accessibility work again on a harder base | 5.0-7.0: block definitions for the catalog 1.5; theme to our tokens, dark mode, text scaling 1.0; Swift-JS message bridge and the native preview beside it 1.0; touch and 390-pt width 1.0-1.5; VoiceOver audit in the web view 0.5-1.5 (unknown); bundling, CSP, licence record 0.5 | 1.5 |
| Total with core (ew) | **6.0** | 9-11 | 7.0-9.0 | 3.5 |
| Main risks | Drag and drop of nested items in SwiftUI is fiddly (`draggable`/`dropDestination`, iOS 16+ **[recalled]**); mitigated because every move is also a menu action | Cramped on a 390-pt phone; accessibility is a research project; no gain the list does not give | Two UI stacks on one screen; tokens re-implemented in CSS; the look is not native next to Maren's screens; Blockly's touch behaviour on an iPhone-width web view and VoiceOver touch gestures inside `WKWebView` are **unverified**; keyboard and `UIKeyCommand` focus contention on iPad **[recalled]** | Not "drag-and-drop blocks" (brief 2.1, a founder decision): would need a PROPOSAL; no on-ramp to code |
| App Review | Low. Blocks compile to Python the bundled interpreter runs; the document is the user's own, on the same footing as their scripts (L6 row "User scripts", Low) | Low, same | Low, on conditions: Blockly is bundled and loaded from the app (never from a server), a strict CSP with no network, nothing fetched. 2.5.2 (p. 18) bars apps that "download, install, or execute code which introduces or changes features or functionality of the app"; a remote script tag would be exactly that. 4.2 (p. 33): "Your app should include features, content, and UI that elevate it beyond a repackaged website" (small risk, rest of app native). 4.7 (p. 39) is about "software that is not embedded in the binary"; a bundled editor is embedded, so 4.7 does not reach it | Low |
| Accessibility | Native VoiceOver with custom actions (Move up, Move down, Move into, Delete, Duplicate) so no task needs a drag; Dynamic Type through the token scale and Maren's AX rules (spec s2: rows stack at AX1+); Switch and Voice Control from labels | Poor without a full alternative path | Blockly's README (read today): "it is fully usable with the keyboard alone. Blockly is also accessible to screenreader users by default", with VPAT reports against WCAG 2.2 AA. These are browser claims for keyboard users; its keyboard-navigation plugin README says screen-reader support was to come "incrementally in Q3 of 2025". Touch VoiceOver in a `WKWebView`, Dynamic Type reflow and Reduce Motion are not covered by either claim: **unverified** | Native forms, best of all |
| iPad | Fits spec s5.8 as drawn: sidebar palette, block list in the editor column, preview in the right pane; hardware keyboard commands and pointer drag come with UIKit/SwiftUI | Good with a pointer, weak with touch | Good with pointer and keyboard (Blockly is built for it); split-view resizing needs the workspace to relayout | Fine |
| Web IDE reuse | The UI is rewritten for the web if a web Builder is ever wanted (about 3 ew); the compiler is shared through Pyodide | Same | The same editor runs on the web nearly free (about 1 ew) | Little to reuse |
| <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with "very aesthetic and polished" (brief) | Highest: one design system, one renderer, real SwiftUI preview | Medium | Lowest: a themed web canvas next to native screens | High but limited |

</div>


E3's one strong point is the web. The brief's definition of done does not ask for a Builder on the web ("The web IDE can edit, preview and sync a widget", s4), and the web IDE already shows the compiled Python. If the Investors want a web Builder before 1.3, E3's numbers move closer; that is open question Q2.

## 4. Q-R: blocks and code


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. Q-R: blocks and code, scrolls sideways" style="--tw:1194px" markdown="1">

| | (a) One-way eject | (c) Hybrid: read-only code view, eject, revert | (b) Round trip over an AST subset |
|---|---|---|---|
| What the user gets | A Builder widget; "Convert to code" turns it into a Python file for good | A live read-only code view beside the blocks (the line map highlights the selected block's lines); "Edit as code" ejects; the `.blocks.json` is kept, and "Back to blocks" offers to discard code edits after a diff | Edit either side. A hand edit inside the subset reopens in blocks; outside it, the Builder names the first line it cannot represent and keeps the file as code |
| Effort beyond the core (ew) | 0.25 | 0.75: code view with the line map 0.25; eject and revert with a diff 0.25; reopen check 0.25 (the file's hash equals the hash the Builder wrote, so an untouched file reopens exactly) | 2.5-3.0 on top of (c): a parser driven by the catalog table; canonical-order rules for modifiers; a property test (random documents: `parse(compile(d)) == d` and `compile(parse(compile(d))) == compile(d)`); the "why not blocks" message per construct |
| Risks | Dead end for a user who ejected by accident | A user who tweaks one literal in code loses blocks unless they revert. Low technical risk | The subset rule is a contract users meet by surprise: one helper function or loop and the file is code only. Comments a user adds are lost on reopen unless the parser keeps them. Highest test burden |
| ADR-006 compiler rule | Met by the core | Met | The parser is new input handling: it reads only `ast` nodes and accepts constants, never evaluates anything (`ast.literal_eval`-class values only) |
| Store text it supports (L7 s3) | "Start with blocks, then switch to Python." | "Start with blocks and see the Python behind them; switch to code when you want." | "Keep editing either way", for files that stay in the subset, said in those words |

</div>


**What changed from my L4 s9 note.** L4 s9 (2026-10-25) proposed automatic round trip for Builder-written files that still parse to the subset, as part of the first Builder. Having costed it, I would not put it in the first Builder release: it is the most expensive line here (2.5-3 ew) and the one most likely to surprise a user. The hash-gated reopen in (c) covers the case L4 cared about most (a file the Builder wrote and nobody touched) exactly, for 0.25 ew.

## 5. Recommendation

1. **E1 + (c) for 1.2: native SwiftUI structured block list, hybrid code relationship with hash-gated reopen and an explicit revert.** About **6.75 engineer-weeks** with the shared core (6.0 + 0.75), unmeasured, one iOS engineer plus Pernille on the compiler. Reasons, in order of weight:
   - One renderer, one design system, one look: the preview is the extension's own SwiftUI renderer, and Maren's iPad pane already exists. E3 puts a themed web canvas inside native screens and needs a message bridge to show a native preview beside it.
   - Accessibility I can verify with tools we have (Accessibility Inspector, XCUITest with VoiceOver actions), where E3's VoiceOver touch behaviour in a web view is unverified and its published claims cover keyboard browsers.
   - App Review exposure is Low for both engines; E1 removes the conditions (bundling, CSP, no remote script) instead of managing them.
   - E3 wins only on web reuse, which nothing in the brief's definition of done asks for.
2. **The compiler is Python, built from `ast` nodes,** shared with the web through Pyodide, with the comment and identifier rules in section 2 and the injection set from `inject_probe.py` as a permanent test (ADR-006 s4).
3. **(b) round trip is the first follow-up, not part of 1.2,** opened only if 1.2's own numbers show people ejecting and reverting. Until then the store text says "see the Python behind them; switch to code when you want", not "either way". Wrenna and Maren own those words; I flag it to them.
4. **E4 stays what v1 already has** (premade configuration and the tour's live edit). It is the floor if 1.2 slips, not a substitute for the founder's blocks.

What would make this wrong: a device measurement where the Python-run preview lags (then the Swift lowering fallback in section 2, +1 ew); or the Investors wanting a Builder on the web before 1.3 (then E3's reuse matters, Q2).

## 6. What v1 must reserve so 1.2 does not break it

Ordered by cost of getting it wrong. None needs a change from me; each names its owner.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. What v1 must reserve so 1.2 does not break it, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Reservation | Why 1.2 needs it | Owner, when |
|---|---|---|---|
| V1 | `viewtree.schema.json` `$defs/node` never gains `additionalProperties: false`, and the node key **`k`** is reserved (string, at most 64 characters, a source location such as `"widget.py:14"`). Renderers ignore it. Renderer.v1's fixture suite includes a node with `k` and with an unknown key and must render both identically to the same node without them | Tap a view in the preview, select its block (and, in Code mode, jump to its line). The DSL already records the call site in `Node._site`; 1.2 only emits it as `k` on preview runs | Me (Renderer.v1 test, when the renderer task starts); Pernille (one sentence in L4 s1 and a schema `description`) |
| V2 | **`tree.json` is a per-device cache and is never synced** (C8 sync, iCloud, export). A project moves between devices as Python plus `*.blocks.json`, and each device runs it with its own library | The schema's `t` and `m` lists are closed enums, while L4 s8 promises that an unknown node falls back to `alt`. Inside one build that is harmless (app and extension ship together). It becomes a crash-or-refuse case only when a tree written by a newer build reaches an older one. Never syncing trees removes the case instead of loosening validation | Ines (rule in the sync ADR); me (state it in L4 s8) |
| V3 | `manifest.schema.json` `runtime` has `additionalProperties: false` with `python`, `api`, `view_tree`. Add an optional **`blocks`** (block catalog major) now, or 1.2 needs `manifest_version: 2` | A Builder document must say which catalog it was written against, the same way a widget says `view_tree` | The manifest's owner (L12), before the v1 freeze |
| V4 | A public **minimum-version check** in `pywidget_ui` 1.0 (name for the names review, for example `ui.require("1.2")`), raising a `ViewTreeError` a non-coder can read | Builder 1.2 output opened on a 1.0 install (an iPad on 1.2, a phone not yet updated) otherwise fails with an `AttributeError` on the first new constructor | Pernille and Maren (name and message), before the freeze |
| V5 | **G18** (L4 s14): declare the timeline with literal keyword data on `Widget(...)` (dates rule, policy, `stale_after`), not only with a free-form hook | Blocks compile to literals, and a future parser reads literals back; a callback is code the Builder cannot represent | Pernille (G18 is hers), input to her choice |
| V6 | 1.0's project code **keeps files it does not know** (`*.blocks.json`) on save, rename, duplicate, zip export and restore, and lists them as plain files | 1.2 stores the block document beside the `.py`; a 1.0 install that drops it loses the user's blocks | The IDE project-model task (C5), a test in its suite |
| V7 | `ViewTreeError.filename` / `.lineno` and traceback user frames stay public and stable | The line-to-block map hangs on them | Already true (API.md, contract s8); keep it through the freeze |

</div>


Not a reservation: a preview flag on `RunRequest.widget`. `parse_request` in `widget_tree.py` refuses unknown keys today, which is right; app and runtime ship in one build, so 1.2 adds the key on both halves together (a contract v5 row), with no effect on 1.0.

## 7. Open questions


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7. Open questions, scrolls sideways" data-n="1" style="--tw:935px" markdown="1">

| # | Question | For | Blocks |
|---|---|---|---|
| Q1 | **User test with non-coders** (brief L17: "User-test with non-coders if possible"; s4: a good-looking widget "in under 5 minutes"). The company cannot recruit people (C10). Would the Investors, or people they choose, try a Simulator recording now and a TestFlight build once the membership is active? Until then the proxy is Maren's heuristic walkthrough and a scripted XCUITest timing of the five-minute task, which measures the UI, not people | Investors (human checkpoint) | The 5-minute claim, not the build |
| Q2 | Is a Builder on the web wanted before 1.3? If yes, E3's web reuse (about 2 ew saved) is worth re-costing | Investors via Ines | Q-E only |
| Q3 | Modifiers as inspector rows in canonical order (my lean, section 2), or as stackable blocks? | Maren | Catalog |
| Q4 | Should the premades' drawing helpers (ring, sparkline, bars) be a **public** recipe module in 1.0, so the Builder compiles to readable calls instead of raw `Path` commands? L4 s9 said "one block = one node or one modifier, no helper layer"; recipes are the exception I would make, because generated `Path` commands are not readable | Pernille, Maren; Ines if it touches the freeze | Readability of generated code |
| Q5 | Are Builder documents 1.2.1 creator content (p. 7: "content within the app itself and are treated as user-generated content by App Review")? It matters only for S3 sharing, not for 1.2 | Wrenna (L12 Q4) | Nothing in 1.2 |
| Q6 | Python-run preview latency on a device, with `pywidget_ui` imported, and behind a T1 sweep | Me, first device session | Choice of preview path |
| Q7 | Data blocks and C2: which device modules get blocks in 1.2, given each adds a permission prompt and a privacy-label line (ADR-001 s3)? | Ines, with C2 | Catalog size |

</div>


## 8. Evidence

- `L17-raw/bin/inject_probe.py`, `L17-raw/inject_probe.out`: 15/15 hostile values stay one literal in one statement; the naive comment splice gives 2 statements, the `isprintable` filter 1. Host CPython 3.9.6.
- `L17-raw/pages/`: `blockly-license.html` (Apache License 2.0), `blockly-pkg.html` (`"license": "Apache-2.0"`, `"author": "Raspberry Pi Foundation"`), `blockly-readme.html` (the accessibility paragraph quoted in section 3), `kbexp-readme.html` (the "Q3 of 2025" screen-reader line). URLs in `L17-raw/list.txt`; fetched 2026-10-26 through `tools/fetch_cite.py`.
- App Review quotes, from the #59 print: 2.5.2 p. 18; 2.5.19 p. 21; 4.2 p. 33; 4.7 p. 39; 1.2.1 p. 7.
- Blockly would need a `log/software.md` row and its NOTICE handling if E3 were chosen; not added, since nothing is installed.
{% endraw %}

</div>
