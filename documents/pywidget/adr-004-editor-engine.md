---
layout: "default"
title: "ADR-004: The code editor is Runestone with Tree-sitter Python, behind our own editor protocol"
section: "documents"
description: "Option A: Runestone (MIT) with Tree-sitter (MIT) and the tree-sitter-python grammar (MIT), vendored at a pinned commit in pywidget/ios/Vendor/, used only through a protocol of ours, CodeEditorEngine (text, selection\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-004-editor-engine.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/decisions/ADR-004-editor-engine.md</code></span></div><h1>ADR-004: The code editor is Runestone with Tree-sitter Python, behind our own editor protocol</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **chosen, gated** (Ines, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-26 20:02 ET, at the end): option A is the engine the spike builds; the ADR becomes **accepted** the moment T-0041's gates <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 pass with the verdicts written in section 7, and the fallback (section 5) is live until then. G1 first measure ruled 2026-10-27 (ruling 7, chair line T-0461 at the end): adapter day granted, re-measure pass rule fixed. Proposed by Idris 2026-10-25 19:31 ET; Maren's read of themes and the key row 2026-10-26 19:54 (end of section 4).
- Author: Idris. Desk research; no Xcode build in this ADR. Every number not read from a source is marked **unmeasured** or **[recalled]**.
- Inputs: ops/plans/pywidget/build-brief.md section 2.5 (Editor); ADR-001 section 3.1 (C5 core editor scope); local iPhoneOS27.1.sdk UIKit headers; licence files, READMEs and two source files read through tools/terms_guard.py into `../research/ADR-004-raw/pages/` (fetch log `fetch-log.tsv`, 19:28-19:30 ET; licence, docs and repo-metadata pages only, no search, issue or pull reads, per the #53 <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>).

## 1. Context

ADR-001 fixes the v1 editor: syntax highlighting with design-system themes (light and dark), an extra key row on iPhone, find and replace, tabs, line numbers, go to line from a traceback, iPad hardware keyboard shortcuts (run, stop, find, tabs), completion from jedi and inline errors from pyflakes on save, Dynamic Type and VoiceOver labels. The brief (2.5) adds formatting, go to definition, trackpad, split view and multiple windows; formatting is not in ADR-001's v1 list. Deployment target is iOS 18.0 (`pywidget/ios/project.yml`). One engineer, one Xcode task at a time, 26 days to <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>.

The editor is the screen a script-only buyer spends all their time in. It has to be fast on a real file, correct with every input method (hardware keyboard, IME, dictation), and readable by VoiceOver.

## 2. Options and evidence


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Options and evidence, scrolls sideways" style="--tw:1920px" markdown="1">

| Option | Licence (read) | Engine | Maintenance (repo metadata, read 19:28 ET) | Fits v1 | Verdict |
| --- | --- | --- | --- | --- | --- |
| **A. Runestone + Tree-sitter + tree-sitter-python** | MIT, "Copyright (c) 2021 Simon Støvring" (Runestone, TreeSitterLanguages); MIT, "Copyright (c) 2018 Max Brunsfeld" (tree-sitter); MIT, "Copyright (c) 2016 Max Brunsfeld" (tree-sitter-python) | Own `TextView: UIScrollView` with a `TextInputView: UIView, UITextInput` (TextView.swift line 13, TextInputView.swift line 35); Tree-sitter incremental parse; line manager after AvalonEdit (README "Performance") | Pushed 2026-10-25; release 0.5.2 on 2026-03-25, previous 0.5.1 on 2024-06-11; 3,230 stars, 26 open issues; one maintainer; README pins Tree-sitter v0.27.1 and documents iOS 27 Writing Tools behaviour | Highlighting, line numbers, current-line highlight, invisibles, character pairs, regex search, indent detection, colour and font themes, line wrapping (README "Features"); `isFindInteractionEnabled` / `findInteraction` (UIFindInteraction, TextView.swift lines 690-707); `inputAccessoryView` for the iPhone key row (line 318); marked-text (IME) handling with documented workarounds (TextInputView.swift 1280-1302, 1707-1736) | **Chosen**, gated |
| B. Custom editor on UITextView / TextKit 2, highlighting by Neon + SwiftTreeSitter | Neon BSD-3-Clause, "Copyright (c) 2022, Chime"; SwiftTreeSitter BSD-3-Clause, "Copyright (c) 2021, Chime" | `NSTextLayoutManager` (iOS 15), `NSTextViewportLayoutController` (iOS 15), UITextView TextKit 2 by default since iOS 16 | Neon now at slsrepo/Neon (pushed 2026-08-27, 394 stars); SwiftTreeSitter now tree-sitter/swift-tree-sitter (pushed 2026-08-12) | Free from UIKit: VoiceOver, find (`findInteractionEnabled`, iOS 16), hardware keyboard text navigation, Writing Tools. To build ourselves: line-number gutter, current line, pairs, indentation, highlighting timing | **Fallback** (section 5) |
| C. STTextView | GPL-3.0 or a paid commercial licence (README "License": "If use of the software under the GPL v3.0 does not satisfy your organization's legal department, commercial licenses are available"); repo metadata `NOASSERTION` | TextKit 2 UITextView/NSTextView reimplementation, iOS 16+ | Pushed 2026-10-06, 1,607 stars | Good fit technically | **Rejected on licence**: GPL terms conflict with App Store distribution of a closed app, and the commercial licence costs money (Commandment 7: no spending) |
| D. CodeEditorView | Apache-2.0, "Copyright [2021..2025] Manuel M. T. Chakravarty" | SwiftUI view over TextKit 2 | Pushed 2026-10-17, 54 open issues; README "Status": "still to be of pre-release quality ... mostly a set of known bugs" | Highlighting, inline messages, bracket matching, minimap; completion and identifier info on macOS only (README line 8) | Rejected for v1 (author's own pre-release statement); worth re-reading for 1.1 |
| E. Monaco in WKWebView | MIT, "Copyright (c) 2016 - present Microsoft Corporation" | Browser editor | Pushed 2026-10-23, 46,887 stars | README FAQ: "Is the editor supported in mobile browsers or mobile web app frameworks? No." | **Rejected on iOS.** Stays the web IDE's editor (brief, Web) |
| F. CodeMirror 6 in WKWebView | MIT, "Copyright (C) 2018-2021 by Marijn Haverbeke and others" (codemirror/view) | contenteditable in WebKit | GitHub mirror codemirror/view is **archived** (pushed 2026-04-15); where CM6 is now maintained is unread | Touch support [recalled] | Rejected for v1: hardware-keyboard routing between UIKeyCommand and web content, VoiceOver through WebKit contenteditable, a JS hop in every jedi/pyflakes call, a second theme system, and a non-native feel against the founder's polish bar. Re-read only if both A and B fail |
| G. Highlightr (highlight.js in JavaScriptCore) | MIT, "Copyright (c) 2016 Illanes, Juan Pablo" | Regex highlighting of the text through JavaScriptCore | Pushed 2026-02-13 | No incremental parse; no structure for indentation or brackets | Rejected (architecture re-highlights text; speed unmeasured) |

</div>


### Why not build B first

- Neon's own README (section "TextKit Integration"): flicker-free on-keypress highlighting needs an `NSTextStorage` subclass and precise invalidation timing, and "I have not yet figured out a way to do this with TextKit 2, and it may not be possible without new API." That is the hard part of a code editor, stated by the author of the library we would lean on.
- TextKit 1 fallback trap (UITextView.h lines 263 and 277): a TextKit 2 UITextView silently falls back to TextKit 1 when anything touches `.layoutManager`, and "any TextKit 2 objects you may have cached will cease functioning". Any helper that uses `NSLayoutManager` (Neon ships a `LayoutManagerSystemInterface`) puts us there.
- Gutter, current-line highlight, character pairs, indentation, regex search and large-file line management are weeks of one engineer's time [estimate, unmeasured], all of which Runestone already ships and its own app uses (README "Runestone app").

### Why A, and what it costs us

A gives the whole ADR-001 editor list except completion, inline errors, tabs and keyboard shortcuts, which are ours in any option. Its costs:

1. **Accessibility is unproven.** Runestone draws its own text. A grep of TextView.swift (1,663 lines) and TextInputView.swift (2,275 lines) for "accessib" finds 0 lines; other files are unread. UITextInput gives VoiceOver some text access [recalled], but line-by-line reading, caret announcements and rotor navigation are unverified. This is gate G2.
2. **One maintainer**, irregular releases (0.5.1 to 0.5.2 took 21 months), active main branch. MIT lets us vendor and patch: we pin a commit, keep patches in our tree, and never depend on an upstream fix for v1.
3. **One Tree-sitter runtime** (README "Tree-sitter runtime": "do not also link an independent copy from another package"). The Python grammar must come through TreeSitterLanguages built against Runestone's `TreeSitter` product, or as grammar source compiled into our target. Checked in the spike.

## 3. Criteria, side by side


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Criteria, side by side, scrolls sideways" style="--tw:930px" markdown="1">

| Criterion | A. Runestone | B. Custom TextKit 2 |
| --- | --- | --- |
| Licence | MIT throughout (section 8 lines) | BSD-3 (Neon, SwiftTreeSitter) + MIT (tree-sitter, grammar) |
| Highlighting, 2,000-line file | **Unmeasured.** Incremental Tree-sitter parse plus line manager; README warns to judge only Release builds | **Unmeasured.** Highlight via rendering attributes or storage attributes; timing problem stated by Neon |
| iPad hardware keyboard | Text input through UITextInput; arrow-key and selection navigation on its own view to be checked (G3). App shortcuts are our `UIKeyCommand`s on the responder chain (`wantsPriorityOverSystemBehavior`, iOS 15, UIKeyCommand.h line 52) | System behaviour for text navigation; same `UIKeyCommand` work for app shortcuts |
| Trackpad, split view, multiple windows | Pointer behaviour on a custom view to be checked (G3); split view and scenes are app-level, engine-neutral | System |
| Accessibility | Unproven (G2) | System UITextView behaviour |
| Find and replace | UIFindInteraction built in | UIFindInteraction built in (`findInteractionEnabled`, iOS 16, UITextView.h line 293) |
| iPhone key row | `inputAccessoryView` | `inputAccessoryView` |
| Maintenance | Vendored, pinned; one upstream maintainer | Ours entirely |
| Time to v1 editor | Days [estimate] | Weeks [estimate] |

</div>


## 4. Decision

Option A: Runestone (MIT) with Tree-sitter (MIT) and the tree-sitter-python grammar (MIT), vendored at a pinned commit in `pywidget/ios/Vendor/`, used only through a protocol of ours, `CodeEditorEngine` (text, selection, version counter, set highlights/diagnostics, replace range with undo, scroll to line, key-row insertion). No pywidget code imports Runestone outside its adapter, so option B can replace it without touching the IDE.

Themes come from Maren's design-system tokens and are mapped to Runestone's theme protocol in the adapter. Tabs, the iPhone key row, keyboard shortcuts, go to line from a traceback, completion UI and diagnostics UI are ours, built on the protocol.

### Design read, 2026-10-26 19:54 ET (Maren, T-0217): themes and the iPhone key row

**Agree with A and with themes and key row living in the adapter; accept with these rules, none of which changes the protocol.** **Themes.** v1 ships exactly the approved pair (creative/approved.md item 2): Quill light in the light appearance and Lumen dark in the dark one, plus their 7:1 sets, so four Runestone theme values built only from the generated `Syntax*` colour sets (`tokens-app.json` via `appearance.py`, `ios/Shared/Theme.xcassets`), never hex in Swift. The adapter picks one from the trait collection (`userInterfaceStyle` x `accessibilityContrast`) and rebuilds it when either changes or when `preferredContentSizeCategory` changes, then calls `redisplayVisibleLines()` (TextView.swift line 1082 calls it costly, so only on a change). No in-app theme picker: it is not approved, and any extra editor theme (the Pro `themes` row, IDE spec s5 item 7) goes to the Investors under <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> first; the adapter taking a theme value keeps that a data change. The editor font is the system monospaced face through the OS API (`UIFont.monospacedSystemFont`, scaled by `UIFontMetrics` for body), never SF Mono by name (`tokens.json` font.code licence note); line numbers in the same face with monospaced digits. Tree-sitter's capture names are not our roles: the mockups were coloured by Python's `tokenize`, so a map lives in the adapter (keyword, string, number, comment, function, type, decorator, operator, and builtin for built-in functions and constants; every other capture draws `text`) with a test that every capture in the vendored `highlights.scm` maps to a role or to `text` by name; the capture list is **[recalled]** until that file is read. The G1 spike screenshot is compared with `mockups/A-editor.png` and `B-editor.png`: a token coloured by another approved role is fine, a colour outside the set is a fault. Runestone's theme surface asks for six colours we have no token for (gutter background, gutter hairline, current-line number, invisibles, marked text for IME, find-match background); until they land (board line, mine) the adapter uses bg, `line.hairline`, text, gutter, selection and selection. **Key row.** Build it as IDE spec s3 "Key row" says: `inputAccessoryView`, 44 pt (`space.layout.key_row_height`), bar `key.bgAlt`, keys `key.bg`/`key.text` (both fills checked at 4.5:1, 7:1 in HC). Three rules the ADR should carry: (a) a key tap goes through the engine's typing path (`insertText`, which reaches `shouldChangeTextIn`: TextInputView.swift lines 1266-1279 and 1580-1583, TextView.swift lines 1518-1530), not replace-range, so character pairs, skip-over-closing and undo grouping act as if typed, and Indent sends `"\t"`, which Runestone turns into the file's indent unit (TextInputView.swift line 1268); a multi-character alternate (`"""`, `f"`) inserts both halves with the caret between, one undo step; with pairs on, the `()` and `[]` alternates are redundant and drop (they return only under the section 5 fallback, which has no pairs). (b) With a hardware keyboard attached the accessory view is nil, re-read on connect and disconnect (`GCKeyboard`, **[recalled]**), so iPad shows no bar (spec: "Hardware keyboard: no key row"); G3 checks it. (c) VoiceOver: every key has its spoken name ("left parenthesis", "Indent", "Hide keyboard") and its alternates as custom actions, because long-press-and-slide cannot be done under VoiceOver; G2 covers the key row as well as the text. The row does not grow with Dynamic Type, as the system keyboard does not. One device check, not a decision: if on iOS 26 the opaque 44 pt bar reads as a slab over the glass keyboard, the bar goes clear and the keys keep `key.bg`; G3's screenshot decides, and both are inside the approved tokens.

## 5. Fallback

If G1 or G2 fails and cannot be fixed by a patch inside the time box, the editor becomes a TextKit 2 `UITextView` (`textViewUsingTextLayoutManager: YES`, never touching `.layoutManager`) with Neon + SwiftTreeSitter highlighting over the visible range and a gutter we draw. It is slower to build and gives up some of A's features for v1 (character pairs, invisibles), and gains system accessibility.

## 6. The interface the editor needs from the tooling (Odalys's jedi/pyflakes read)

The editor asks; Python answers on the interpreter's worker thread; the main thread never waits.

- **Every request** carries `doc_id`, `version` (an integer the editor bumps on each edit), `path`, and the full source text (or a reference to the saved file). A response whose `version` is older than the editor's current one is dropped. Completion requests are latest-wins and cancellable.
- **Positions**: line 1-based, column 0-based **in Unicode code points**, which is what jedi takes [recalled; to confirm in Odalys's read]. The editor works in UTF-16 (`NSRange`); the adapter converts both ways. A fixture line with a non-BMP character (an emoji) must round-trip in a test.
- **Completion** `complete(doc, line, col) -> [{name, kind, insert_text, replace_start, replace_end, signature?, doc_first_line?}]`. Budget for a keystroke-triggered call: target under 100 ms on device, **unmeasured** (Odalys measures jedi; ADR-001 says keyword completion only if jedi is too slow).
- **Diagnostics** `lint(doc) -> [{line, col, end_line?, end_col?, severity: error|warning, code, message}]`, from `compile()` for syntax errors and pyflakes for the rest, on save (ADR-001). SyntaxError `offset` units must be stated by the tooling read [unverified].
- **Go to definition** `goto(doc, line, col) -> [{path, line, col}]` (brief 2.5; not in ADR-001 v1, the interface reserves it).
- **Format** `format(doc) -> text` is reserved; the editor applies it as one undoable replace that keeps the caret's line. Ruff is a native binary and iOS cannot spawn a subprocess [recalled], so a formatter would have to be pure Python; not in v1.
- Highlighting, bracket matching and indentation use Tree-sitter in Swift and never call Python.

### Note, 2026-10-25 20:07 ET (Odalys): section 6 measured

Host only: Apple M1 Mac mini, CPython 3.9.6, jedi 0.19.2, parso 0.8.7, pyflakes 3.4.0, in the existing venv `~/.venvs/idetool` (no new install; rows already in log/software.md). The app's runtime is 3.15.1 and the device is slower by a factor nobody has measured; every number below is a host number. Raw results: `pywidget/tests/tooling/results/editor2000-host-py39.json` (final) and `...-run1-loopconv.json` (before the conversion fix). Script: `pywidget/tests/tooling/bench_editor2000.py` (generates the 2,000-line file itself; spawning blocked; fresh process and empty jedi cache per run).

1. **jedi columns: confirmed, code points**, in and out. A completion at the code-point column works; the UTF-16 or byte column of the same line raises `ValueError` (out of range), and a shorter wrong column would silently ask about another spot. `get_names()` columns are code points too. Lines are 1-based. (`test_positions.py`, JediUnits, 4 tests.)
2. **Correction: send a whole-document UTF-16 offset (`NSRange.location`), not line and column.** parso and CPython break lines on `\r\n`, `\r`, `\n` only; form feed, U+0085, U+2028 and U+2029 are ordinary characters (checked against `parso.utils.split_lines` on 9 texts and against `ast` line numbers). NSString's line enumeration also breaks on U+0085/U+2028/U+2029 [recalled; Runestone's own line rule unverified, no checkout here]. With an offset, Python splits the lines itself and the two sides never have to agree. Results come back as offsets the same way. Line/column calls stay available for the gutter.
3. **Rules for bad positions** (none raise): past the end of a line clamps to the end, negative to 0, line past the last clamps to the last; an offset inside a surrogate pair or inside `\r\n` floors to the character start / end of line.
4. **SyntaxError offset: 1-based code points into `exc.text`**, measured on 3.9.6 in 9 cases (parser and tokenizer errors after an emoji, tab, indent, unterminated string, open paren, NBSP). Two traps: (a) `exc.text` is not always the source line: for a 3.9 f-string error it is the inner expression `(1 +)` and the offset counts into that, so the adapter marks the whole line; (b) for errors at end of line the offset is one past the last character. 3.10+ adds `end_offset`; the helper uses it when present. **3.15 unmeasured**: `test_positions.py` asserts the unit on whatever interpreter runs it, so running it inside the app's runtime re-checks it.
5. **pyflakes columns: confirmed, UTF-8 bytes** (`ast` col_offset), 1-based lines.
6. **Completion on a code-generated 2,000-line file** (one-character edit ten lines above the cursor before each call; n = 5 fresh processes x 40 calls = 200 per probe):


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Note, 2026-10-25 20:07 ET (Odalys): section 6 measured, scrolls sideways" data-n="2" style="--tw:1152px" markdown="1">

| Probe | Items | First call, empty cache (p50 / max of 5) | Keystroke p50 | Keystroke p95 (median of 5 runs) | Worst single call |
|---|---|---|---|---|---|
| `os.pa` at line 12 | 6 | 833 / 852 ms | 38.8 ms | 57.9 ms | 104.9 ms |
| `self.` in a method at line 1012 | 28 | 394 / 410 ms | 34.5 ms | 49.6 ms | 108.8 ms |
| `rec.` at line 2000, class from line 15 | 28 | 645 / 684 ms | 29.6 ms | 36.5 ms | 75.0 ms |
| `json.lo` at line 2000 | 2 | 200 / 261 ms | 10.6 ms | 12.9 ms | 24.9 ms |

</div>


   On the host, keystroke p95 is under the 100 ms budget with room of 1.7x at worst; the worst single calls were 105 and 109 ms (the script keeps only per-run maxima, so how many of the 800 calls passed 100 ms is not known). On a phone 2x slower the `os.pa` and `self.` probes would sit near or over the budget at p95. The budget stays a target until the in-app run; the editor rules in ide-tooling.md (trigger on `.` or a 2-character prefix, warm jedi at launch, latest-wins) are what keep it usable if the device misses it. Diagnostics on the same file: `compile()` 8.0 ms p50, pyflakes 42.8 ms p50 / 69.7 ms p95 (n = 20), fine for a 300 ms pause debounce.
7. **Conversion cost, a change that paid**: my first helper converted with a per-character Python loop: 4.4 ms to split the 2,000 lines and 11.3 ms to turn an end-of-file offset into a position (n = 20). Rewritten on `str.encode`/`decode` and `re`: 0.43 ms and 0.55 ms (n = 20). Same 21 tests pass; three mutants (mid-pair rounding up, form feed as a break, offset inside `\r\n`) are each caught.
8. **Cancellation: jedi has none** (0.19.2 source: no cancel or timeout parameter). Measured instead: a second thread raises `Cancelled` in the worker with `PyThreadState_SetAsyncExc`. 36 trials (2 probes x 6 delays from 5 to 400 ms x 3, fresh process each): 27 cancelled, 9 had already finished, **0 ignored**; delay from the call to the worker seeing it p50 0.06 ms, max 0.42 ms (first run max 3.5 ms); **36 of 36** next completions on the same text matched a clean run. Rules that follow:
   - `Cancelled` must derive from `BaseException`: jedi has 14 `except Exception` sites (parso none). Two bare `except:` remain (jedi's readline helper, unused here; parso's grammar generator, which runs on first load) and could swallow a cancel during warm-up, so the version check still drops any late reply.
   - Swift calls `PyThreadState_SetAsyncExc` itself, from a background queue, never the main thread: it must take the GIL, which the busy worker hands over only at the switch interval (5 ms on the host). Not through `ctypes`: L12 may strip `_ctypes` from the bundle.
   - It lands between bytecodes only; a long C call (a big regex, a C-extension import) delays it. The worker wraps each job in `try/except Cancelled` and clears "current job" inside that `try`, so a cancel that lands just after a job ends is caught and discarded rather than hitting the next one.
9. **Helper**: `pywidget/python/pywidget_tooling/positions.py` (stdlib only, runs on host and in the app) with `pywidget/tests/tooling/test_positions.py`, 21 tests, 21 pass under the idetool venv; under the system python 15 pass and 6 skip (no jedi/pyflakes). The tooling prototype `bridge.py` now uses it (its 13 tests still pass). Open: the in-app numbers (a device run of the same probes; needs an in-app harness, since this script starts child processes) and a 3.15 run of `test_positions.py`.

## 7. Gates (the editor spike, a board line)

- **G1 speed.** A code-generated 2,000-line Python file (no copied code; generator committed). Measure in a Release build on the Simulator through `tools/xc.sh`, later on a device: open to first highlighted frame, and keystroke to re-highlight p50/p95 at the top, middle and end of the file. Proposed bar: open under 300 ms, keystroke p95 under 16 ms (one 60 Hz frame). Both numbers are targets, not measurements.
- **G2 accessibility.** VoiceOver on the Simulator and the Accessibility Inspector: reads the current line, announces caret moves and selection, edits by typing, Dynamic Type scales the editor font. Fail means a fix in the adapter (e.g. `UIAccessibilityReadingContent`) within one day, or the fallback.
- **G3 iPad input.** Hardware keyboard: arrows, option and command arrows, shift selection, command-Z/shift-command-Z, tab and shift-tab indent, our shortcuts listed in the command-key overlay; trackpad I-beam and click-drag selection; IME (Japanese kana) and dictation; two scenes editing two files.

### G1, first measure: 2026-10-27 11:19-11:40 ET (Idris, T-0041 slice a)

**Verdict on G1 as measured: not passed.** Keystroke p95 is over the 16 ms bar at all three positions: 29.3 / 32.1 / 32.9 ms (top / middle / end) on the final run, inside ruling 2's 16-33 ms band, but three of the nine earlier focused position-runs went above 33 ms (36.8 top, 36.3 middle, 47.1 end). Open passes warm (26-32 ms) and sits at the line cold: the first open in a fresh process took 137-328 ms over five launches, one of them over 300 ms (327.7) and one 0.5 ms under (299.5). Under ruling 2 this is the one adapter day (Day 9) and a re-measure. Whether the runs above 33 ms fire section 5 now is the chair's call, not mine. G2 and G3 are not run, so the ADR stays **chosen, gated**.

**What was built (slice a).**
- **Engine.** Runestone at `acc9ecb837bd037bc6c99d8c5b38cba2088c4b90`. That is main on 2026-10-25 18:23 +0100, the commit this ADR's sections 2-4 were read from. I did not use release 0.5.2 (`592434a1`), which pulls Tree-sitter 0.20.9 as a remote SwiftPM package.
- **Parser and grammar.** Tree-sitter v0.27.1 (`10eb5ac119eec9cb4267a8e035066473983f5f3a`), Runestone's submodule at that commit. TreeSitterLanguages at `eae9758b88636d6e2cd78ce11e4d289569b1de3b`, Python targets only. Its grammar is tree-sitter-python `26855eab` (ABI 15).
- **How it is vendored.** `pywidget/ios/scripts/fetch_editor.sh` checks out each commit, verifies the id and a clean tree, and copies the code into `Vendor/Runestone` and `Vendor/TreeSitterLanguages` (gitignored, as CPython is). Runestone's own Package.swift is used unchanged. TreeSitterLanguages gets our trimmed manifest (`scripts/editor/TreeSitterLanguages.Package.swift`), which depends on `../Runestone`, so the app links one Tree-sitter runtime (s2, cost 3).
- **Protocol.** `App/Editor/CodeEditorEngine.swift`. Its one conformer, `App/Editor/RunestoneEngine.swift`, is the only file that imports Runestone.
- **Licences.** tree-sitter `lib/src/unicode/LICENSE` was read: the ICU 58+ Unicode licence (permissive, commercial use allowed, notice with copies or in documentation). It is now its own component, `tree-sitter-icu`. All five notices are pinned in `pywidget/licenses/components.json`, the Acknowledgements files are regenerated, and the rows are logged in `log/software.md`.

**Commands that produced the numbers.**
- `python3 -I pywidget/ios/scripts/editor/gen_bench_file.py --out FILE`: 2,000 lines, 71,859 bytes, sha256 `6e51c6bf...481b0a`. Python 3.9 and 3.13 give the same bytes, and the file parses.
- `pywidget/ios/scripts/editor_bench.sh` runs `tools/xc.sh -project PyWidget.xcodeproj -scheme EditorBench -configuration Release -destination 'platform=iOS Simulator,name=iPhone 17e' PW_EDITOR_BENCH=YES ONLY_ACTIVE_ARCH=YES test -only-testing:PyWidgetUITests/EditorBenchUITests`.
  - The run is Release, iOS 27.0 Simulator, on the Mac mini's CPU, not a device.
  - `TEST_RUNNER_PW_BENCH_ARGS=-editor-wrap` repeats the run with soft wrap on.
  - The raw results of the five runs (logs `xcodebuild-20261027-111907`, `-112425`, `-112607`, `-112913`, `-113924`) are in `pywidget/ios/bench/editor-g1-2026-10-27.jsonl`.

**How it times** (`App/Editor/EditorBench.swift`):
- **Frame.** A main run-loop observer after Core Animation's commit stamps the end of each turn. A "frame" below is the first such stamp after an event.
- **Highlight landed.** Runestone asks the theme for each token's colour on the main thread just before it sets the attributes and redraws the line. The last ask marks when the latest highlight landed. Highlighting has settled after 6 display frames with no ask.
- **Open.** From before the file read and the engine's creation to the frame after the last token of the settled burst. It is measured 5 times per launch, each with a new engine and view.
- **Keystroke.** From just before the call to the frame after the last token it caused, or after the call returned if later. At each position the bench types 20 letters, then makes 20 deletes, at the end of lines 12, 1000 and 1996, through `insertTyped` (the key-row path, ruling 4a) and `deleteBackward`. Highlighting settles between keystrokes. Every keystroke re-highlighted inside its own call (typed = rehighlight in every run), so nothing is deferred.
- **Proof the frame is highlighted.** The on-screen view is drawn back into a bitmap and the pixels at the resolved keyword, string and comment colours are counted: 7,612 / 26,155 / 21,760 pixels (light). The UI test fails under 50 of any of them. It also checks that the text is byte-equal to the file after the 120 keystrokes.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: G1, first measure: 2026-10-27 11:19-11:40 ET (Idris, T-0041 slice a), scrolls sideways" style="--tw:1329px" markdown="1">

| Run (log) | Open, cold (first in process) | Open, warm (runs 2-5) | Keystroke p50 top / mid / end | Keystroke p95 top / mid / end | Note |
| --- | --- | --- | --- | --- | --- |
| 111907 | 327.7 ms | 29.5-29.9 | (invalid) | (invalid) | deletes were no-ops (fixed, see below); opens valid |
| 112425 | 226.6 | 26.3-29.5 | 10.9 / 14.4 / 11.7 | 27.4 / 36.3 / 47.1 | editor focused |
| 112607 | 137.3 | 29.4-39.6 | 18.0 / 12.2 / 10.2 | 36.8 / 32.0 / 32.3 | focused; unfocused p95 30.2 / 32.0 / 31.7 |
| 112913 (wrap on) | 283.5 | 25.1-32.2 | 10.0 / 11.5 / 9.9 | 30.3 / 31.4 / 29.1 | focused; unfocused 15.4 / 29.8 / 29.6 |
| 113924 (final code) | 299.5 | 26.9-31.7 | 10.6 / 11.9 / 10.9 | **29.3 / 32.1 / 32.9** | focused; unfocused 14.3 / 33.1 / 33.0 |

</div>


**Where the time goes (read, not yet fixed).**
- **Inserts are the slow keystrokes.** Insert p95 is 31-33 ms against 9-10 ms for deletes on the final run, and the p50 floor is about 10 ms either way.
- **Inside the insert.** A 12 s `sample` of the focused run puts Runestone's own insert time mostly inside `TextInputView.applyLineChangesToLayoutManager` (redisplay of the edited line plus a synchronous `layoutIfNeeded`).
- **With the keyboard up, UIKit adds work.** `TextView.insertText` wraps the edit in `inputDelegate.selectionWillChange/DidChange`, and UIKit's keyboard resyncs its state and assistant bar on that (316 of the wrapper's 317 samples). This is the key-row path. The system keyboard calls the first responder directly. The unfocused runs are no faster on average, so this is a lead, not the cause.
- **Cold open.** The cold extra is creating the first engine and view in a process: 92-253 ms in the "engine+view" phase. The parse off the main actor is 13.5-31 ms, and `setState` 0.2-19 ms.
- **Wrapping.** Soft wrap on changes nothing material.
- **Adapter-day leads.**
  1. Find the insert-only cost (character-pair and width paths) with Instruments.
  2. Send key-row taps through the responder's own `insertText`.
  3. Build one engine at launch, as jedi is warmed, so the first open is warm.
  4. Then re-measure with this script.

**Fixed during the measure.** Runestone's `deleteBackward` deletes only a non-empty selection, so a bare caret deleted nothing. That is why run 111907's keystrokes are invalid. The adapter now selects the composed character before the caret first, as UIKit's keyboard does.

**Capture map** (`SyntaxRole.captures`, test `EditorCaptureMapTests`, which fails when a capture is dropped, checked by removing `constructor`). The vendored `highlights.scm` has 19 capture names. They map as follows:
- **No decorator capture.** The query has none: `(decorator) @function`. So decorators draw in the function colour, and the `decorator` role has no tokens unless our vendored query gains a capture (Maren's call).
- **`constructor` draws as `type`.** These are capitalised names. That is my reading, for Maren's comparison with the mockups.
- **`constant` (ALL_CAPS names), `variable`, `property`, `none` and `punctuation.special` draw as text.**

The G1 screenshot comparison with `mockups/A-editor.png` / `B-editor.png` is not done; it moves to slice b.

### G2, G3 and the G1 screenshot: 2026-10-27 16:18-17:12 ET (Idris, T-0460, T-0041 slice b)

**Verdicts.**
- **G2 accessibility: passes everything the Simulator can show, after an adapter fix made today. VoiceOver's speech is a device check.** That fix is inside the adapter. Runestone is untouched, and section 5 does not fire on G2.
- **G3 iPad input: hardware keyboard passes. Trackpad, the command-key overlay as drawn, the kana keyboard and dictation are device checks. Two scenes fails, with one finding, which is not an engine fault.**
- **G1 screenshot against the mockups: passes.** There are 0 pixels outside the approved set. G1 itself still waits on the adapter day and re-measure (ruling 7), so T-0460 stays open.

**What was built (all on `CodeEditorEngine`, nothing outside the adapter imports Runestone).**
- **Protocol.** The protocol gained the members the key row and the shortcuts need:
  - `accessoryView`, `onSelectionChange`, `canUndo`, `undo`/`redo`
  - `shiftLeft`/`shiftRight`, `focus`/`endEditing`
  - `fontPointSize`
- **`App/Editor/EditorKeyRow.swift`.** The iPhone key row to IDE spec s3/s3.1:
  - **Size and colour.** 44 pt, keys 40 x 36 with a gap of 6, Indent 46 wide. `key.bg`/`key.bgAlt`/`key.text`, pressed `key.bgAlt` for 120 ms.
  - **Typing path.** Every tap goes through `insertTyped`.
  - **Speech.** Every key is trait `.keyboardKey` and has its spoken name.
  - **Alternates.** `"` has its three alternates as custom actions. The two-character alternates insert both halves with the caret between, one undo step.
  - **Hardware keyboard (ruling 4b).** `attach` sets the accessory view to nil while `GCKeyboard.coalesced` is non-nil. It re-reads on connect and disconnect.
- **`App/Editor/EditorCheck.swift`.** A gate screen, launched with `-editor-check` and used only by UI tests. It shows one editor (two with `-editor-two`) and the screen's own shortcuts, ⌘R Run and ⌘. Stop. Its state line holds text, selection, row, font size and the last announcement, and every UI check reads it back.
- **In `RunestoneEngine.swift`.**
  - The accessibility element (below).
  - The editor's shortcuts, all titled for the overlay: ⇧⇥ outdent, ⌘] Indent and ⌘[ Outdent.
  - Caret and selection announcements (`EditorSpeech`).
- **Tests.**
  - `Tests/EditorGateTests.swift`: 11 in-process tests.
  - `UITests/EditorGateUITests.swift`: 8 UI tests. They run on iPhone 17e (G3 skips there) and on iPad Air 11-inch (M4), iOS 27.0.
- **Script.** `scripts/editor/palette_check.swift` reads a screenshot back against the token colours.

**G2, what failed first and the fix.**
- **The first failure.** Runestone has no accessibility code at the pin. My first adapter made the `TextView` (a `UIScrollView`) the element. XCUITest then refused to type, with "Neither element nor any descendant has keyboard focus" (log `xcodebuild-20261027-161936`). The first responder is Runestone's internal `TextInputView`, a child of that element, and the accessibility runtime does not look through. VoiceOver would have had the same <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> spot.
- **The fix.** The element is now the `TextInputView` itself: the `UITextInput` that is first responder.
  - It carries label "Code editor", value = the whole text (as `UITextView`'s), hint "Double-tap to edit." while not editing, and `accessibilityTextualContext = .sourceCode`.
  - It gets `UIAccessibilityReadingContent` (line, content, frame and page for VoiceOver's line reading) at run time with `class_addMethod`/`class_addProtocol`. The methods are answered by our `AccessibleTextView`, so the vendored code stays unpatched and the pin check in `fetch_editor.sh` still holds.
- **The result.** XCUITest now reports the editor as a **TextView** element with its label and value. The runtime recognises it as editable text, and typing reaches it (log `xcodebuild-20261027-162536`).

**G2, evidence** (screenshots in `pywidget/ios/bench/editor-g2g3-2026-10-27/`; full suite log `xcodebuild-20261027-170221`; iPad gate log `xcodebuild-20261027-170828`):
- **Current line.** `testReadsLineByLine` covers content per line, CRLF, the empty last line, and frames that go down the screen. Each line's own screen frame maps back to that line through `accessibilityLineNumber(for:)`. The run-time conformance answers on the element itself.
- **Caret and selection.** VoiceOver gets nothing from Runestone here, so the adapter posts an announcement when the selection moves without typing (typing is left to the keyboard's echo):
  - a move along a line speaks the text crossed (one character by its spoken name, e.g. "Left parenthesis");
  - a move to another line speaks that line ("Blank" when empty);
  - a selection speaks "<text>, selected", and a collapse speaks "Unselected".
  - Unit-tested, and read back on the iPad from real key presses: → "i", ⌥→ "mport", ↓ reads "# A widget's body, for the editor gate.", ⇧→ "i, selected".
  - **Device check:** whether VoiceOver also speaks its own echo for a `UITextInput` caret move, so the two double up. If they do, the announcement goes.
- **Editing by typing.** `typeText` reaches the element on both Simulators, and the value follows. On iPhone the screen's key row also typed `()` and Undo restored it. The key row is forced on there, because the Simulator has the Mac keyboard attached; see G3.
- **Dynamic Type.** The editor face is 15 pt at Large, smaller at XS, and clamped at 32 pt at AX5. The gutter clamps at 17. The live trait change rebuilds the theme, and a launch at AX XXXL draws 32 pt (`g2-ax5-*.png`).
- **The key row (ruling 4c).**
  - All 24 keys carry the s3.1 names in order, all `.keyboardKey`.
  - Only `"` carries custom actions: "Single quote", "Triple quotes", "F-string". There are no `()`/`[]` alternates.
  - Undo is `.notEnabled` and dimmed with nothing to undo.
  - The keys stay 40 x 36 at AX XXXL.
  - In the app the keys are found by those names as key elements (`g2-key-row-iphone.png`).
- **Accessibility audit** (`performAccessibilityAudit`). Every type but Dynamic Type passes on the editor screen. The Dynamic Type audit reports one issue with no element and no frame, so it cannot be attributed. The measured check above is the evidence for Dynamic Type, and the audit issue goes to the device check with Accessibility Inspector's text-size control.
- **Device checks (a person with VoiceOver on an iPhone).**
  - How lines and the caret are actually spoken.
  - Rotor navigation by character, word and line, which comes from `UITextInput`.
  - That double-tap starts editing.
  - The key row's swipe order and its Actions rotor.
- **Findings, not gate fails.**
  - (1) The keys' Large Content Viewer at accessibility sizes (s3.1 item 3) is not built.
  - (2) Alternates open as the system menu on long-press (press, slide, release picks). This is Apple's own control for a button's alternates, not the bubble drawn in s3. That is Maren's call.

**G3, evidence** (iPad Air 11-inch (M4) Simulator; XCUITest `typeKey` sends hardware key events):
- **Arrows and selection.** All of these pass, each read back as an exact selection:
  - ⌘↑ to the start of the document, → by one character, ⌥→ to the end of the word, ⌘→ to the end of the line.
  - ↓ keeps the caret's column across a blank line (column 11 lands on offset 24), as `UITextView` does.
  - ⌘↓ to the end, ⇧→, ⇧⌥→ (the word) and ⇧⌘→ (to the end of the line).
- **Editing keys.** These pass:
  - ⌘Z and ⇧⌘Z, back to the exact text.
  - ⇥ inserts the indent unit and ⇧⇥ outdents.
  - ⌘] and ⌘[ indent and outdent.
  - ⌘R and ⌘. reach the screen's commands.
- **No key row with a hardware keyboard.** Both Simulators have the Mac keyboard attached. `GCKeyboard` reports it, the accessory view is nil, and no key element exists (`g2-no-row-hw-*.png`). The connect/disconnect re-read is unit-tested with an injected keyboard flag.
- **Command-key overlay.** Every shortcut has a title in process: Indent, Outdent, Run, Stop. **Device check:** holding ⌘ on an iPad and seeing them listed. XCUITest cannot hold a modifier alone.
- **Trackpad I-beam and click-drag selection: device check.** The Simulator under XCUITest has no pointer hover, and a touch drag is not a trackpad drag.
- **Japanese kana IME: device check for the keyboard itself.** The path it uses is unit-tested: marked text か → かん → 漢, then commit. The text is right, the marked range is cleared and the caret lands after the character.
- **Dictation: device check.** The Simulator has no dictation.
- **Two scenes, two files: fail, with one finding.**
  - The app's `Info.plist` does not declare `UIApplicationSupportsMultipleScenes`, so iPad cannot open a second window of PyWidget at all.
  - The engine side passes: two editors on one screen hold two files, typing goes to the focused one, and ⌘Z in one leaves the other untouched (UI test and unit test).
  - The fix is the IDE screen's scene manifest plus a per-scene document, which is a new board line. It is not an adapter fault, and it does not touch ruling 1.
- **The Simulator dropped some hardware key events under XCUITest.**
  - What happened (corrected 2026-10-27, T-0501, from Pernille's review T-0476 M2): the first key after a relaunch,
    and also mid-test. Run 165050: ⌘↑ and "b" were each lost three times after `b.tap()` in
    `testG3TwoEditorsTwoFiles`, a focus hand-off between editors, and that test failed. Run 165622: one ⌘↑ resent in
    `testG3ArrowsWordLineAndDocumentMoves`, the second key after the warm-up. Run 170828: 0 resends. What changed
    between those runs is not known.
  - The earlier claim that a late event resent would apply twice and be caught was only partly true: it holds for
    typing and ⇥, not for ⌘Z/⇧⌘Z at the end of the undo stack or for ⌘↑/⌘↓/⌘→, which are idempotent.
  - The test now (T-0501): only the warm-up key in `ipadEditor` may be resent. Any other key that changes nothing in
    4 s fails the test with the whole state line and a screenshot attached, so a focus bug in the app cannot pass.
  - Whether a person ever loses a first key is part of the device check.
- **iOS 26 clear-bar question (ruling 4).** It stays a device check, decided on glass. `g2-key-row-iphone.png` shows the opaque bar on the iOS 27 Simulator.

**G1 screenshot against the mockups.**
- **Command.** `xcrun swift pywidget/ios/scripts/editor/palette_check.swift g2-typing-iphone.png 0 260 1170 760 <Quill light tokens>`, run on the editor area of `g2-typing-iphone.png` (light).
- **Result.** 0 off-palette pixels. Token pixels: bg 782,354; current line 60,401; text 7,062; comment 5,882; string 3,104; keyword 2,478; function 1,352; operator 960; builtin 652; number 594; hairline 1,557. Another 22,673 pixels are anti-aliased edges between the ground and a token colour.
- **Against the mockups.** Keywords, function names, strings, numbers and comments take the same roles as in `mockups/A-editor.png`. `B-editor.png` uses Lumen, the dark-appearance set, so its light colours are not the shipped light theme. Under ruling 3 a different approved role is fine.
- **Not compared yet.**
  - `float` in an annotation draws as text: tree-sitter's query gives no capture there. Maren's call, with `constructor` and decorators (above).
  - The dark appearance (Lumen dark) was not shot in this slice.

### G1 adapter day and re-measure: 2026-10-28 (Idris, T-0460, ruling 7)

**Written before the five runs (ruling 7 items 1 and 4).**
- **Lead 1, the insert-only cost, found.** A 40 s `sample` of one bench run (a profiling run, its timings void because `sample` stops the process) put 1,135 of 1,650 samples inside `TextInputView.insertText` in `layoutSubviews` -> `inputDelegate.selectionDidChange` -> UIKit's keyboard state manager and assistant bar. Runestone sets `notifyInputDelegateAboutSelectionChangeInLayoutSubviews` on a programmatic selection change and never clears it, so every later layout pass (each typed character) made the keyboard resync. `deleteBackward` clears it, which is why deletes were 9-10 ms. `applyLineChangesToLayoutManager` itself was 232 samples and the incremental parse 62. Fix: our first vendored patch, `scripts/editor/patches/runestone-0001-notify-input-delegate-once.patch` (clear the flag after notifying, as the delegate flag beside it is cleared), applied by `fetch_editor.sh` and named with its hash in `Vendor/Runestone/PIN`. Section 2 allows patches kept in our tree.
- **Lead 2.** `insertTyped` (the key row) calls the responder's own `insertText` (Runestone's `TextInputView`, the `UIKeyInput` the system keyboard calls), not `TextView.insertText` with its extra `selectionWillChange/DidChange`. The key row and the system keyboard now type through one entry, so the bench times both (ruling 7 item 4).
- **Lead 3.** `App/Editor/EditorWarmup.swift`: at launch, after the first frame (a key window plus two display refreshes), the app builds one engine, opens six lines of Python, lays it out and drops it. Scheduled from `PyWidgetApp.init` in the shipping branch (not in the unit-test host) and in the `-editor-bench` branch, so the bench's cold open runs in the launch sequence.
- **Harness change (the only one).** The bench waits for the warm-up to finish, then 5 frames, before its first open, and reports the warm-up's own time (`warmup_ms`: first frame, engine, open, total, main-thread part). Timing, file, keystrokes, positions, focus and wrap are unchanged. `scripts/editor/g1_summary.py` reads the G1RESULT lines from the logs and computes ruling 7's medians; it changes nothing measured.
- **Suites on this code.** Unit (249 tests) and the console and editor gate UI suites (`AddWidgetTests`, `EditorGateUITests`) through `tools/xc.sh`: all UI tests passed; one unit test, `ProStoreTests.testPendingThenRestoreNothingLeavesBuyEnabled`, timed out on StoreKit testing in the full run (log `xcodebuild-20261028-013240`, which xc.sh then stopped as hung after the last suite) and passed alone with the rest of `ProStoreTests` (14 tests, `-014115`). The editor code does not run in the unit-test host.
- **One trial run before the commit** (`-013041`, not counted): p95 13.4 / 13.8 / 12.4 ms, cold open 45.6 ms, warm-up 280.6 ms (270.2 on the main thread).

**Verdict on G1 under ruling 7: passed on the Simulator.** Five valid runs, consecutive, on commit `2596a517`, with `pywidget/ios/scripts/editor_bench.sh` unchanged (Release, iPhone 17e Simulator, iOS 27.0, the same file sha256 `6e51c6bf...481b0a`, editor focused, wrap off). Median of the five per-run keystroke p95s: **13.6 / 13.5 / 12.7 ms** (top / middle / end; the slowest position, top, at 13.6, under 16.0). Median of the five cold opens: **54.8 ms** (under 300.0). No run was invalid or replaced: each restored the text byte-equal and passed the pixel check. Raw records, one per run with its log name and the commit: `pywidget/ios/bench/editor-g1-2026-10-28.jsonl`. The numbers below were printed by `python3 -I pywidget/ios/scripts/editor/g1_summary.py` from the five logs.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: G1 adapter day and re-measure: 2026-10-28 (Idris, T-0460, ruling 7), scrolls sideways" style="--tw:1036px" markdown="1">

| Run (log) | Cold open | Warm opens | Keystroke p95 top / mid / end | Insert p95 | Delete p95 | Warm-up total (main thread) |
| --- | --- | --- | --- | --- | --- | --- |
| 014246 | 43.3 ms | 26.1-29.5 | 13.1 / 13.9 / 12.6 | 13.1 / 13.9 / 12.6 | 9.8 / 10.0 / 8.7 | 183.5 (174.9) |
| 014418 | 54.8 | 26.6-48.7 | 14.1 / 13.4 / 13.4 | 13.9 / 13.4 / 13.4 | 32.2 / 9.3 / 8.3 | 96.7 (88.1) |
| 014521 | 54.1 | 26.7-45.4 | 13.6 / 10.6 / 12.7 | 13.6 / 11.0 / 12.7 | 10.8 / 9.4 / 8.1 | 100.1 (92.7) |
| 014640 | 56.2 | 26.7-32.0 | 13.3 / 14.3 / 12.5 | 13.3 / 14.3 / 12.4 | 10.2 / 8.7 / 28.0 | 88.5 (81.4) |
| 014742 (final) | 57.8 | 27.7-44.3 | 13.7 / 13.5 / **25.6** | 13.7 / 13.5 / 25.6 | 11.2 / 8.6 / 8.2 | 111.6 (104.8) |

</div>


- **Reported beside the median, deciding nothing (item 3).** Final run: 13.7 / 13.5 / 25.6 ms, cold open 57.8. Worst run per position: 14.1 / 14.3 / 25.6 ms; worst cold open 57.8. The final run's end position is inside the 16-33 band; its p95 is the third-slowest of 40 keystrokes.
- **The tail is not gone.** The slowest single keystroke per run was 31.7-38.5 ms. A p95 over 40 keystrokes lets two such keystrokes through per position.
- **Warm-up (item 4).** It ran after the first frame, which came 3.17-3.28 s after process start under XCUITest's launch on the Simulator. It took 88.5-183.5 ms, of which 81.4-174.9 ms was on the main thread, mostly building the first engine (72.9-166.8 ms). That is a one-time stall at launch: a tap in that window waits for it. The cold open's "engine+view" phase fell from 92-253 ms (first measure) to 8.4-9.2 ms.
- **Unfocused** (no keyboard session, reported only): p95 10.6-13.8 ms at every position except one, 31.7 ms (middle, run 014521).
- **What this verdict does not cover.** It is Simulator timing on the Mac mini's CPU. The device re-check (ruling 2, T-0479) decides acceptance under this same rule. The key row no longer tells UIKit's keyboard about its taps (the system keyboard is never told about its own); with autocorrection and autocapitalisation off nothing visible depends on it on the Simulator, and the device check should type after a key-row tap to confirm.
- **Script exit code.** `editor_bench.sh` exited 141 after each of the five passing runs: `ls | head -1` under `pipefail` after the test had finished. Every log ends `** TEST SUCCEEDED **`. Fixed after the fifth run (`sed -n 1p`); nothing measured changed.
- **Status.** G1 passes on the Simulator; G2 passes what the Simulator shows; G3 fails on two scenes (T-0478). The ADR stays **chosen, gated**.

### G3 two scenes, after the fix: 2026-10-28 (Idris, T-0478)

- **Two scenes, two files: passes on the iPad Air 11-inch (M4) Simulator.** This fixes the finding above. The fix is in the app, not the adapter, and Runestone is untouched.
- **What changed.**
  - `Info.plist` declares `UIApplicationSupportsMultipleScenes`, and iPad declares all four orientations.
  - Each window has its own `ConsoleModel`: its own text, console and run. The Python runtime stays shared, and a run's output goes only to the window that started it. The first window takes the model made at launch, so iPhone's single scene starts as it did before.
  - A window's file is a `SceneFile`, a reference to a bundled example, and is not a document model. It is the `WindowGroup(for:)` value, so SwiftUI restores it. The scene title is the file name.
  - On iPad only, More > Open in New Window lists the files.
- **Evidence.** `UITests/SceneWindowsUITests.swift`, 2 tests, log `xcodebuild-20261028-021431`, screenshots in `pywidget/ios/bench/scenes-2026-10-28/`.
  - Two windows open, and each is found by its scene title, read back from the `UIWindowScene`.
  - Typing and ⌘Z in B leave A's text alone. A then comes forward with its edit, and its own ⌘Z and ⇧⌘Z restore it while B stays unchanged.
  - A window's file comes back after the app is backgrounded, ended and relaunched. Unsaved text does not come back: nothing saves files until T-0355.
- **Not done.**
  - Dragging a file out to make a window has no source yet: the IDE has no file list until T-0355's project list. That list also gets Open in New Window as a row context menu.
  - In iPadOS's full-screen windowing, ⌘` did not bring the covered window forward under XCUITest. The test uses Open in New Window instead, which brings an open file's window forward.
- **G3 verdict: not written.** Every hardware-keyboard item and two scenes pass on the Simulator. Four items are still open, and the Simulator cannot drive them: trackpad I-beam and drag selection, the command-key overlay as drawn, the Japanese kana keyboard itself (its marked-text path is unit-tested), and dictation. They stay with the device check (T-0479).

## 8. Licence lines (logged in log/assets.md, Commandments 4-5)

- Runestone, https://github.com/simonbs/Runestone, MIT, Copyright (c) 2021 Simon Støvring.
- TreeSitterLanguages (TreeSitterPython and its queries only), https://github.com/simonbs/TreeSitterLanguages, MIT, Copyright (c) 2021 Simon Støvring.
- Tree-sitter, https://github.com/tree-sitter/tree-sitter, MIT, Copyright (c) 2018 Max Brunsfeld. Runestone's README says the submodule also carries `lib/src/unicode/LICENSE`; that file is **unread** and must be read before the first build that ships.
- tree-sitter-python, https://github.com/tree-sitter/tree-sitter-python, MIT, Copyright (c) 2016 Max Brunsfeld.
- Fallback only, not used unless section 5 fires: Neon (BSD-3-Clause, Copyright (c) 2022, Chime), SwiftTreeSitter (BSD-3-Clause, Copyright (c) 2021, Chime).

MIT and BSD-3 both require the copyright notice and licence text in copies of the software: the app needs an Acknowledgements screen carrying them (board line). Nothing here is a visual or sound asset; Commandment 9 is not touched.

## 9. Consequences

- The editor spike follows the CPython spike and bridge in the single Xcode queue; it does not need Python to run (G1-G3 test the editor alone).
- Completion and diagnostics UI wait on Odalys's tooling numbers but not on the engine: the protocol in section 6 lets both sides build against a fake.
- If Runestone upstream stalls, nothing changes for v1: we own the pinned copy.

## 10. Evidence

- `../research/ADR-004-raw/pages/` : licence files, READMEs (Runestone, Neon, STTextView, CodeEditorView, Monaco), repo metadata JSON, Runestone releases, Runestone TextView.swift and TextInputView.swift; `fetch-log.tsv` lists every URL with time and size. Script: `../research/ADR-004-raw/bin/fetch.py`.
- iPhoneOS27.1.sdk, UIKit headers: UITextView.h lines 263-277 (TextKit 2 default since iOS 16, TextKit 1 fallback), 289-293 (find interaction, iOS 16); NSTextLayoutManager.h line 65 (iOS 15); NSTextViewportLayoutController.h line 32 (iOS 15); NSTextContentManager.h line 229 (`performEditingTransactionUsingBlock`); UIKeyCommand.h line 52 (`wantsPriorityOverSystemBehavior`, iOS 15).
- Not read: developer.apple.com (person-read only, G2a); Runestone's docs site; any issue tracker (#53 hold).
  - *Amended 2026-10-26 20:02 ET (Ines, CORRECTIONS U3-03):* the line above is a true record of what the 19:28-19:30 reads covered, and two of its reasons no longer hold. GitHub reads for product research are allowed within GitHub's rate limits (ADR-005 s7, 2026-10-25 22:17), so simonbs/Runestone's issue tracker is readable through tools/terms_guard.py if the spike owner wants it; and single public pages on developer.apple.com may be fetched one at a time under the #64 ruling (2026-10-26 00:31; signed out, 5 s apart, saved in research/inbound/). No verdict in this ADR rests on either; G2 and G3 are measured, not read.

## Chair line (Ines), 2026-10-26 20:02 ET (T-0218)

Form: author's proposal (Idris), Odalys's measured section 6, Maren's independent design read (end of section 4), then the chair (C13, C30). Read: sections 1-10; Maren's read; creative/approved.md item 2; the T-0041 board line and Maren's note on it; IDE spec s3 (key row) as Maren cites it. I ran nothing and measured nothing; every number in this ADR is still the author's or Odalys's.

**Ruling 1: option A, Runestone with Tree-sitter and tree-sitter-python, vendored at a pinned commit behind `CodeEditorEngine`, is the engine the spike builds. The ADR is accepted only when G1-G3 pass; section 5 is the live fallback until then.** The reasons are the author's and I accept them as written: Neon's own README says the hard part of option B may not be possible on TextKit 2, the licence lines are all MIT, and A ships the gutter, pairs, indentation and search that B would cost weeks. The costs are real and gated, not waved through: accessibility is unproven (G2), there is one upstream maintainer (answered by vendoring), and the Tree-sitter runtime must be linked once (checked in the spike). No pywidget code outside the adapter imports Runestone, so a G2 or G3 failure costs the adapter and nothing else.

**Ruling 2: the gate bars are the chair's now, not proposals.** Section 7's numbers were targets; they are the pass rule for T-0041:
- G1 passes at open-to-first-highlighted-frame under 300 ms and keystroke p95 under 16 ms, Release build, Simulator, through tools/xc.sh, on the code-generated 2,000-line file, measured top, middle and end. A p95 between 16 and 33 ms (one to two frames) buys one day of adapter work (highlight the visible range first, defer the rest) and one re-measure; a p95 over 33 ms, or an open over 300 ms after that day, fires section 5. Device numbers re-check G1 when a device exists and do not reopen it before then.
- G2 and G3 pass or fail as section 7 writes them, and both cover the key row (Maren's rule (c): spoken key names, alternates as custom actions). A G2 fail is one day of adapter work, then section 5, as written.
- **Date rule.** The spike sits after the C1 bridge in the Xcode queue; plan row 8 (Day 8, 2026-10-29) is "editor with highlighting". If G1-G3 have no written verdict by 2026-10-30 23:59 ET (Day 9), the chair rules on the numbers in hand on Day 10 rather than letting the gate slip to the freeze. A gate not run is not a gate passed.

**Ruling 3: themes, as Maren read them.** v1 ships exactly two editor themes, chosen by the system appearance: Quill light in the light appearance and Lumen dark in the dark one, each with its 7:1 Increase Contrast set, so four Runestone theme values built only from the generated `Syntax*` colour sets, never hex in Swift. The adapter picks by trait collection (`userInterfaceStyle` x `accessibilityContrast`), rebuilds on a change of either or of `preferredContentSizeCategory`, and calls `redisplayVisibleLines()` only then. **No in-app theme picker in v1**, and any extra theme (the Pro `themes` row, IDE spec s5 item 7) goes to the Investors under C51 before it is built; the adapter taking a theme value keeps that a data change later. Editor font: the system monospaced face through `UIFont.monospacedSystemFont` scaled by `UIFontMetrics`, never SF Mono by name. Capture-to-role map in the adapter with the test Maren names (every capture in the vendored `highlights.scm` maps to a role or to `text`; the capture list is [recalled] until the file is read in the spike). The six colours Runestone asks for that have no token (gutter background, gutter hairline, current-line number, invisibles, IME marked text, find match) are Maren's T-0232; until it lands the adapter uses the stand-ins she lists. The G1 screenshot is compared with `mockups/A-editor.png` and `B-editor.png`: a colour outside the set is a fault.

**Ruling 4: the key row, rules (a)-(c) binding.** (a) A key tap goes through `insertText`, never replace-range, so pairs, skip-over and undo grouping behave as typed; Indent sends `"\t"`; a multi-character alternate inserts both halves with the caret between as one undo step; the `()` and `[]` alternates drop under Runestone and return only under section 5. (b) With a hardware keyboard attached the accessory view is nil, re-read on connect and disconnect; iPad shows no bar; G3 checks it. (c) Every key has a spoken name and its alternates as custom actions. The row is 44 pt and does not scale with Dynamic Type. The iOS 26 clear-bar question is a device check inside the approved tokens, decided by G3's screenshot, not a new approval.

**Ruling 5: section 6 is the editor-tooling interface, with Odalys's corrections in force.** Whole-document UTF-16 offsets in and out (item 2), the clamping rules (item 3), jedi columns in code points and pyflakes in UTF-8 bytes (items 1, 5), SyntaxError offsets per item 4, and cancellation by `PyThreadState_SetAsyncExc` from a background queue with `Cancelled` deriving from `BaseException` (item 8). The 100 ms completion budget stays a target until the in-app run; a device 2x slower than the host puts two probes near it, and the IDE rules (trigger on `.` or two characters, warm jedi at launch, latest-wins) are what keep it usable if the device misses it. Not a gate for this ADR.

**Ruling 6: licences.** The four MIT lines in section 8 are logged in log/assets.md before the first build that ships, and tree-sitter's `lib/src/unicode/LICENSE` is read in the spike before then (T-0041 text). The Acknowledgements screen is T-0042 (Idris, P2). Neon and SwiftTreeSitter are logged only if section 5 fires.

What would make this fail: Runestone's own text drawing giving VoiceOver nothing to read (G2), which is the one failure that costs the whole adapter; and a Debug-build number mistaken for a Release one (README's own warning), which is why G1 is Release only.

Board: T-0041 (Idris, P1, note added with ruling 2's bars and date rule); T-0232 (Maren, P2) unchanged; T-0042 (Idris, P2) unchanged; T-0115 U3-03 closed by the s10 amend above.

Ines, CEO

## Chair line (Ines), 2026-10-27 11:58 ET (T-0461): G1 first measure

Form: chair alone on the views on record (C13): Idris's measure and verdict in section 7 (57a414c5), ruling 2 above, the T-0041 and T-0460 board lines. I ran no build. I recomputed the percentiles from `pywidget/ios/bench/editor-g1-2026-10-27.jsonl` (nearest-rank p95 over each run's 40 keystrokes) and they match the table.

**Ruling 7: the adapter day is granted. Section 5 does not fire on the first measure.** T-0460 does the Day 9 adapter work (Idris's leads 1-3 in section 7) and one re-measure under the pass rule below.

Reasons:
- **Ruling 2 named no statistic.** That gap is mine. "A p95 over 33 ms, or an open over 300 ms after that day" also reads two ways. So I tested this measure against every reading. It lands in the adapter-day band under all of them except worst-run:


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Chair line (Ines), 2026-10-27 11:58 ET (T-0461): G1 first measure, scrolls sideways" style="--tw:740px" markdown="1">

| Reading | Keystroke p95 top / mid / end | Cold open | Outcome |
| --- | --- | --- | --- |
| Final run (113924) | 29.3 / 32.1 / 32.9 | 299.5 | band, open under |
| Median of the 4 valid runs | 29.8 / 32.1 / 32.6 | 283.5 (median of 5) | band, open under |
| All 160 keystrokes pooled | 31.5 / 32.5 / 32.3 | - | band |
| Worst run | 36.8 / 36.3 / 47.1 | 327.7 | over 33, open over |

</div>


- **The worst-run reading is a tail of a tail.** A p95 of 40 keystrokes is the third-slowest keystroke. The worst run is then the largest of four such values. The three runs over 33 ms are all on code before the final run, and the final code has no keystroke over 33.0 ms at any position (max 31.2 / 32.6 / 33.0).
- **The cold open over 300 ms is one launch of five** (327.7, in run 111907). The median is 283.5. Ruling 2 fires on an open over 300 ms *after* the day, not before. The final run's 299.5 is 0.5 ms under the bar, so warming the engine (lead 3) is needed, not optional.
- **Simulator is not device timing.** The Simulator runs on the M1 Mac mini's cores and display path, not on an iPhone 17e's chip. The error can go either way, so I neither discount these numbers nor inflate them. The gate stays on the Simulator (ruling 2) because the device waits on the Apple membership (Investors, Day 7) and a device in hand.
- What would make this ruling fail: an adapter day that makes the bench faster without making typing faster. The pass rule closes that below.

**The re-measure pass rule (fixed now, before the run, for T-0460):**
1. **Same bench.** `pywidget/ios/scripts/editor_bench.sh` on one named commit: Release, iPhone 17e Simulator, iOS 27.0, through `tools/xc.sh`. The same generated file (sha256 `6e51c6bf...481b0a`). The same 20 inserts and 20 deletes at lines 12, 1000 and 1996. Editor focused, soft wrap off. A harness change is allowed only to fix a measurement fault, and it must be written in section 7 before the run.
2. **Five valid runs**, consecutive, all on that commit, and all five appended to a dated bench jsonl. A run is valid when the text is restored byte-equal and the pixel check passes. An invalid run is replaced and named in section 7, never dropped silently. A third invalid run stops the re-measure and brings it back to the chair.
3. **Which runs count: the median of the five.** For keystrokes, that is the median of the five per-run p95s at each of top, middle and end, with the slowest position deciding. For open, it is the median of the five cold opens (the first open in a fresh process). The final run and the worst run are reported beside the median and decide nothing. The median takes three of five runs to pass or to fire, so one stray run does neither, and nobody gets to stop on a good run.
4. **Honest timing.** Keystroke time still ends at the last token the edit caused, however deferred. The bench types through the same entry the shipping key row and the system keyboard use; if those differ, both are measured and the slower decides. If an engine is warmed at launch, the cold open is timed in the shipping launch sequence. The warm-up is scheduled after the app's first frame, and its own time is written in section 7.
5. **Outcomes.**
   - **G1 passes:** median keystroke p95 under 16.0 ms at all three positions, and median cold open under 300.0 ms.
   - **Section 5 fires:** median keystroke p95 over 33.0 ms at any position, or median cold open over 300.0 ms.
   - **Anything else, G1 is missed in the band.** That means some position at 16.0-33.0 ms, none over, and the open under 300. There is no second adapter day, and section 5 does not fire on G1 alone. A ships in v1 if G2 and G3 pass. The ADR stays **chosen, gated**, and section 7 records the miss in milliseconds. The device re-check (ruling 2) then decides acceptance under this same rule. A device fire before Day 10 (2026-10-31) fires section 5. After Day 10 it becomes the first post-launch build, not freeze work.
   - Ruling 2 left this case unwritten. I am closing it before the number lands, not after. Firing section 5 on a two-frame miss would swap a measured engine for an unmeasured one across Days 10-12, the freeze.
6. **Date rule unchanged.** A re-measure not written in section 7 by 2026-10-30 23:59 ET is a gate not run, and the chair rules on Day 10.

Board: T-0460 (Idris, P1, note added: adapter day granted, this pass rule); T-0041 unchanged until T-0460 lands.

Ines, CEO
{% endraw %}

</div>
