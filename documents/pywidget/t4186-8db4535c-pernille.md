---
layout: "default"
title: "Review of T-4186 at 8db4535c: a marked line&#x27;s number in the gutter (T-4256)"
section: "documents"
description: "The drawing is right for a resting editor. gutterMarks breaks lines as Runestone does (CRLF one break, a lone CR one break), binary-searches each mark&#x27;s first and last line, lets an error win in either order, and drops\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4186-8db4535c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4186-8db4535c-pernille.md</code></span></div><h1>Review of T-4186 at 8db4535c: a marked line's number in the gutter (T-4256)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4608, Commandment 13). Author: Idris. One review for this merge of T-4186 ("The editor completes
code, shows errors and previews"); it covers T-4256. Reviewed: 2d041ba0d1 ("a marked line's number turns warning colour
(error: red) and semibold") and f201c3f3ef (records only: Idris's memory line and three <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox files, nothing
app-facing). Files: ios/scripts/editor/patches/runestone-0003-marked-line-numbers.patch, ios/App/Editor/EditorMarks.swift
(gutterMarks), ios/App/Editor/RunestoneEngine.swift (drawGutterMarks, gutterMarkColor, EditorTheme.markedLineNumberFont),
ios/Tests/Core/EditorMarksTests.swift (2 new tests), ios/Tests/EditorGutterMarksTests.swift (4 tests). Also read, for
what the code runs inside: ConsoleEditor.swift (drawMarks, the only setDiagnostics caller; the onChange hook) and
EditorMarks.edited / edit / moved. Paths are under pywidget/; line numbers are at 8db4535c. Date: 2026-11-17.

An earlier review of the same step at f201c3f3 (T-4613, on an unlanded branch, commit 2765ab2d2f) filed two Low
findings; both are board line T-4771 and are not filed again here (see "Already on the board").

## What changed between f201c3f3 and 8db4535c

`git diff f201c3f3ef 8db4535c84 -- ios/App/Editor ios/Shared/RunLog/TracebackFold.swift ios/App/Runtime/pywidget
ios/Tests`: seven test files of other features (ProjectSendPlanTests, ViewTreeSchemaCheckTests, WidgetStateCommitTests,
FontProbeTests, PreviewQueueTests, RefreshAgeRendererTests, WidgetActionRequestTests). Nothing in App/Editor, the
traceback fold or the runtime package; no T-4256 file. After 8db4535c, up to the HEAD I ran on (68efb435c2), only
CompletionList.swift and CompletionPopover.swift changed in App/Editor, so the run below is a run of this code.

## What I ran

- `xcodegen generate`, then from pywidget/ios `XC_LOCAL=1 XC_TASK=T-4608 tools/xc.sh -project PyWidget.xcodeproj
  -scheme PyWidget -destination 'platform=iOS Simulator,name=iPhone 17e' test
  -only-testing:PyWidgetTests/EditorGutterMarksTests -only-testing:PyWidgetTests/EditorMarksTests`: 22 executed,
  0 skipped, 0 failures, exit 0 (ops/runs/xcodebuild-20261117-172657.log). My first try ran from the repo root and
  found no project (exit 66, nothing built): my mistake, not the commit's.
- A host probe of finding M1: the real EditorMarks.swift compiled with a two-function stub of CompletionList (isName,
  wordStart copied verbatim) and an empty EditorCompletion, `swiftc -O`, Mac host. Output quoted under M1.

## Verdict: PASS with findings

The drawing is right for a resting editor. `gutterMarks` breaks lines as Runestone does (CRLF one break, a lone CR one
break), binary-searches each mark's first and last line, lets an error win in either order, and drops the same empty,
negative and past-the-end marks `setDiagnostics` drops from the tint; the host tests pin each. The patch applies the
mark in `layoutLineNumberView` and again in `updateLineNumberColors`, so a caret on a marked line does not repaint the
number grey; `lineIndex` is set on every layout, so a recycled number view carries the right index. Both setters skip
an equal value. A semibold number wider than the width Runestone measured grows into the leading gap instead of
truncating.

Colours and accessibility: warning is `status.warning` and error the theme's `syntax.error`, resolved per key, so light,
dark and Increase Contrast each get their own value; the contrast test covers all four themes in all four appearances
against the gutter (also the current line's gutter colour), at 4.5:1 and 7:1 with Increase Contrast. The number changes
weight as well as colour, so a mark is not shown by colour alone; the marked font uses the same UIFontMetrics scaling and
17 pt <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> as the plain one, checked at Large and AX5. The known Quill-light comment pair under 4.5:1 on the current line
is held by a strict XCTExpectFailure, which will fail once Maren's token lands.

Test strength, by mutant (reasoned, not run): dropping the error-wins guard, the CR branch, the range filter or the
marked font each fails a test. Dropping the `updateLineNumberColors` hunk or applyTheme's `drawGutterMarks()` survives
(T-4771). The new M1 survives too: no test edits the text after marks are drawn.

Nothing here harms a TestFlight build: no new asset or dependency, the patch is in our tree and applied by
fetch_editor.sh, and a vendored tree without it fails to compile rather than ship wrong.

## Findings

### M1. After a same-length edit that adds or removes a line break, the gutter marks the wrong line, until the marks change (Medium, correctness)

- Where: `ios/App/Editor/ConsoleEditor.swift:176` (`guard let engine, marks.shown != drawnMarks else { return }`),
  with `ios/App/Editor/EditorMarks.swift:125-134` (`moved`: a mark after the edit moves by the length change) and
  `ios/App/Editor/RunestoneEngine.swift:164-167` (line indexes are computed only when `setDiagnostics` runs).
- What happens: the gutter mark is keyed by line index, but the marks are compared by UTF-16 range. An edit that swaps
  one character for a line break (select a space and press Return), or the reverse (select a line break and type a
  space), or a paste of the same length with a different number of breaks, leaves every mark below it at the same
  offset. `shown` is unchanged, so `drawMarks` returns at line 176 and `setDiagnostics` is not called: the tint stays on
  the right text (it is drawn by range) but the coloured, semibold number stays on the old line index, one line off.
  The next lint answer usually has the same ranges, so `shown` is still equal and nothing redraws: the wrong number
  stays until some other change moves the marks. The problems element is updated in the same skipped call
  (line 179), so VoiceOver also keeps saying the old "Line n"; that part predates T-4256 (T-4254/T-4260) but has the
  same cause and the same fix.
- Probe (real EditorMarks code, host): text `s = '''a b'''\nprint(valeu)\n`, a warning on `valeu`; replace the space
  between `a` and `b` with a line break (valid Python, same length):
  ```
  before: gutter [1: warning]
  shown unchanged after edit (drawMarks skips setDiagnostics): true
  lint answer for the new text is the same range: true
  gutter still drawn: [1: warning]  correct for new text: [2: warning]
  ```
- Fix (Idris's choice of shape): redraw when the lines of the shown marks changed, not only their ranges. For
  example, `EditorMarks.edited` reports that the replaced and the new span hold a different number of line breaks while
  a mark lies after them, and `drawMarks` then calls `setDiagnostics` and `problems.update` even with `shown` equal; or
  `drawMarks` keeps the last `gutterMarks` result and compares that (cheap once T-4771 stops the scan at the last
  mark). Test: a host test in EditorMarksTests for the same-length line-break edit, and an engine or ConsoleEditor test
  that types it and reads back the number label as `testTheGutterDrawsTheMarkedNumbers` does; prove it with the
  current guard as the mutant.

## Already on the board (T-4771, from T-4613 L1 and L2)

- L1: every redraw scans and copies the whole text, also with no marks (EditorMarks.swift:146-158,
  RunestoneEngine.swift:166).
- L2: the read-back test runs in light only and never in editing, so the selection hunk of runestone-0003 and
  applyTheme's redraw are untested.

## Notes (no work asked)

- Warning and error differ in the gutter by hue only (both semibold); the kind is also said by the tint's hue, the
  message and the problems element ("Line n, error: ..."). That is what spec s3 asks; whether an error should also
  differ in shape (red/amber colour blindness) is Maren's call.
- Bold Text is not in the shots or tests; with it on, the plain numbers render heavier and the weight difference
  narrows. Worth one look when the T-4186 evidence shots are taken.
- The Increase Contrast gap (code on the tint 6.38-7.92 against 7:1) is left for Maren on the board, as the commit says.
{% endraw %}

</div>
