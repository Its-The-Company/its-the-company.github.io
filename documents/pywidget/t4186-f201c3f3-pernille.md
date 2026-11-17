---
layout: "default"
title: "Review of T-4186 at f201c3f3: a marked line&#x27;s number in the gutter (T-4256)"
section: "documents"
description: "The change is small and correct. gutterMarks breaks lines as Runestone does (CRLF one break, lone CR one break), binary-searches each mark&#x27;s first and last line, lets an error win in either order, and drops the same\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4186-f201c3f3-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4186-f201c3f3-pernille.md</code></span></div><h1>Review of T-4186 at f201c3f3: a marked line's number in the gutter (T-4256)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4613, Commandment 13). Author: Idris. One review for this merge of T-4186 ("The editor completes
code, shows errors and previews"); it covers T-4256. Reviewed: 2d041ba0d1 ("a marked line's number turns warning colour
(error: red) and semibold"): ios/scripts/editor/patches/runestone-0003-marked-line-numbers.patch,
ios/App/Editor/EditorMarks.swift (gutterMarks), ios/App/Editor/RunestoneEngine.swift (drawGutterMarks,
gutterMarkColor, EditorTheme.markedLineNumberFont), ios/Tests/Core/EditorMarksTests.swift (2 new tests),
ios/Tests/EditorGutterMarksTests.swift (4 tests), and the six shots in docs/screenshots/t4256/. Also read, for what
the code runs inside: ConsoleEditor.swift (drawMarks, the only setDiagnostics caller), EditorMarks.edited (marks move
with each edit), and the patched Runestone in Vendor/ (LayoutManager.updateLineNumberColors, GutterWidthService).
f201c3f3 itself is Idris's memory line and three <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox records: nothing app-facing. `git log --grep='^T-4256'`
finds only these two commits. Paths are under pywidget/ and line numbers are at f201c3f3. Date: 2026-11-17.

HEAD now (c53c383761): since f201c3f3 only c107cc80d1 (T-4663) touched the editor, in CompletionList.swift and
CompletionPopover.swift. No file of T-4256 changed, so the run below on HEAD is a run of this code.

What I ran:
- `xcodegen generate`, then `XC_LOCAL=1 XC_TASK=T-4613 tools/xc.sh -scheme PyWidget -destination 'platform=iOS
  Simulator,name=iPhone 17e' test -only-testing:PyWidgetTests/EditorGutterMarksTests
  -only-testing:PyWidgetTests/EditorMarksTests` on HEAD: 22 executed, 0 skipped, 0 failures, exit 0
  (ops/runs/xcodebuild-20261117-163102.log). My first try named a scheme "App" that does not exist (exit 65, nothing
  built); my mistake, not the commit's.
- Vendor/Runestone/PIN names `runestone-0003-marked-line-numbers.patch 633c4a8f257a`, the same sha256 prefix as the
  committed patch, so the vendored tree I built is the one the patch makes.
- Host benchmark of `gutterMarks` (the function copied verbatim into a scratch Swift file, one warning mid-file,
  20 calls each, Mac host): `-O` 0.29 ms at 500 lines, 1.81 ms at 5,000 lines, 10.25 ms at 20,000 lines; `-Onone`
  0.30 / 3.57 / 14.97 ms. No phone run, so no figure here is measured on a device.
- Looked at error-light.png and warning-dark.png: the number of the marked line is red / amber and heavier, the other
  numbers grey; matches the commit.

## Verdict: PASS with findings

The change is small and correct. `gutterMarks` breaks lines as Runestone does (CRLF one break, lone CR one break),
binary-searches each mark's first and last line, lets an error win in either order, and drops the same empty,
negative and past-the-end marks that `setDiagnostics` drops from the tint; the host tests pin each of those. The
patch keeps the mark in `layoutLineNumberView` and in `updateLineNumberColors`, so a caret on a marked line does not
repaint it grey; `lineIndex` is set on every layout, so recycled views carry the right index. Both setters skip an
equal value, so a lint answer that changes nothing does no layout. The semibold number may be a little wider than the
width Runestone measured with the regular font; it grows into the 8 pt leading gap (RunestoneEngine.gutterGap)
instead of truncating, and at 12-17 pt the difference is well under a point per digit.

Accessibility: the number changes weight as well as colour, so a mark is not shown by colour alone. The marked font
is built with the same UIFontMetrics scaling and 17 pt <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> as the plain gutter font, and the test checks equal point
size at Large and AX5. The contrast test covers all four themes in light, dark and both with Increase Contrast,
against the gutter colour, which is also the selected line's gutter colour (EditorTheme, selectedLinesGutterBackgroundColor
= gutterBackground), so the current-line case is covered too. The known Quill-light comment pair under 4.5:1 is held by
a strict XCTExpectFailure that will fail once Maren's token lands, which is how a known gap should be held.

Nothing here harms a TestFlight build: no new asset, no new dependency, the patch is in our tree and applied by
fetch_editor.sh with its hash in PIN, and a vendored tree without it fails to compile rather than ship wrong.

## Findings

### L1. Every redraw scans and copies the whole text, also when there are no marks (Low, performance)

- Where: `ios/App/Editor/EditorMarks.swift:146-158` (the loop over every UTF-16 unit to build all line starts);
  `ios/App/Editor/RunestoneEngine.swift:166` (`textView.text`, a fresh String of the whole document, after line 154
  already made one for `length`).
- When it runs: `ConsoleEditor.drawMarks` (ConsoleEditor.swift:178) calls `setDiagnostics` whenever `marks.shown`
  changes, and `EditorMarks.edited` (EditorMarks.swift:45) moves every mark after an edit. So with a mark below the
  caret, each keystroke runs the full scan, and the clearing call with `[]` scans the whole text to return nothing.
- Size: 1.8 ms at 5,000 lines and 10 ms at 20,000 lines on a Mac host with `-O`, before the text copy; a phone is
  slower. Widget scripts are short, so today this costs little, but it is linear in the file on the typing path for no
  gain: only the lines up to the last mark matter.
- Fix: return `[:]` when there are no diagnostics; stop the scan at the largest `NSMaxRange` of the marks; and make
  one `NSString` per `setDiagnostics` and pass it to both the length check and `gutterMarks` (or ask Runestone for the
  line of each mark, which it already indexes). The existing host tests then still hold, plus one for "no marks, no
  scan" if Idris wants it pinned.

### L2. The read-back test does not reach two of the patch's claims (Low, tests)

- Where: `ios/Tests/EditorGutterMarksTests.swift:107-151`, and the patch's second LayoutManager hunk
  (`updateLineNumberColors`, "the mark wins over the selected line's number colour").
- What is missing: the test never puts the text view in editing with the caret on a marked line, and runs in light
  only. So nothing fails if the selection hunk is dropped in a later Runestone rebase (the current line's number would
  then turn back to `currentLineNumber` while typing on it, which is exactly when the mark matters), or if
  `applyTheme` stops calling `drawGutterMarks` (the numbers would keep the old appearance's colour after a dark-mode or
  Increase Contrast switch). The commit says both happen; no test or shot shows either. The six shots are all of a
  resting editor.
- Fix: in the same test, make the editor first responder with the caret on line 1 and assert line 1 is still the
  warning colour; then set `window.overrideUserInterfaceStyle = .dark`, lay out, and assert line 1 is the dark warning
  colour from `gutterMarkColor(.warning, key)` for the new key. Prove it once with a mutant (drop the `if let
  markColor` branch in the vendored LayoutManager, or the `drawGutterMarks()` call in `applyTheme`), then restore.

## Notes (no work asked)

- Warning and error differ in the gutter by hue only; both are semibold. The weight says "a problem is here"; which
  kind is said by the tint's hue, the message on the line and the problems element ("Line n, error: ..."). That is
  what spec s3 asks for, so I leave it to Maren whether an error should differ in shape too (for red/amber colour
  blindness).
- Bold Text (Settings, Accessibility) is not in the shots or tests. With it on, the plain numbers may render heavier
  and narrow the weight difference; worth one look when the T-4186 evidence shots are taken.
- The Increase Contrast gap (code on the tint 6.38-7.92 against 7:1) is already left for Maren on the board, as the
  commit says.
{% endraw %}

</div>
