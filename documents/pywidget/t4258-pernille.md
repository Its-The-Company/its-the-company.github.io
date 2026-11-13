---
layout: "default"
title: "Review: T-4258, T-4259, T-4260 (cad4c75e38, Idris)"
section: "documents"
description: "Verdict: PASS with notes. The list is pinned under the typed word, rows are 44 pt at the default size, and a SyntaxError is said as an error. Three Low findings, none blocking. The CompletionUITests run on the MacBook\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4258-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t4258-pernille.md</code></span></div><h1>Review: T-4258, T-4259, T-4260 (cad4c75e38, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-13, task T-4289 (Commandment 13, independent review). Read: `git show cad4c75e38`, the three
shots in `pywidget/docs/screenshots/t4258/`, the done-notes of T-4258, T-4259, T-4260, and Maren's
[`pywidget/docs/reviews/t2261-maren.md`](t2261-maren.html) findings 6, 7, 8.

**Verdict: PASS with notes.** The list is pinned under the typed word, rows are 44 pt at the default size, and a
SyntaxError is said as an error. Three Low findings, none blocking. The CompletionUITests run on the MacBook runner
asked for in the packet was not done (see "Runner run" below), so the UI class still has only Idris's local 6/0.

## What I checked and found right

- `CompletionList.originX` (CompletionList.swift:107): word start less 16, clamped 8 pt in on both sides; the host
  test's three cases (84, 8, 100) are right by hand.
- `CompletionPopover.render` (CompletionPopover.swift:152): x from `caretRect(at: list.anchor)`, falling back to the
  caret when the engine answers nil. `RunestoneEngine.caretRect(at:)` returns nil for an offset past the text
  (`position(from:offset:)` is nil there), so a stale anchor does not crash; it falls back.
- `list.anchor` is the word start taken when the request was made (`wordStart`, which stops at `.`), so after
  `math.c` the anchor is the `c`, and `math.co` keeps it. The UI test asserts x unchanged within 0.5 pt.
- Shot `placed-default-light.png` (1206 px wide, 3x): typed `c` and the row text `ceil` both start at about 79 pt;
  the list edge is at about 63 pt (16 pt inset); the first row is about 43 pt measured from the pixels, 44 by the
  test. Four whole rows and a fifth cut.
- `GatedEngine` forwards `caretRect(at:)` (ConsoleEditorOpenTests.swift:153).
- `EditorMarks.describe` is the old `EditorProblemsElement.describe` loop unchanged, with the error branch added;
  both callers' tests (EditorMarksTests, EditorToolingTests) cover one error among warnings, in text order.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1 3" style="--tw:760px" markdown="1">

| # | Where | Severity | Finding |
|---|---|---|---|
| L1 | `pywidget/ios/App/Editor/CompletionList.swift:103` | Low | `rowTextInset` is a constant 16, measured at the default size only (the UI test checks it only there, CompletionUITests.swift:148). The cell's margins are 12 (CompletionPopover.swift:302); the other 4 come from the cell's own layout, which is not fixed across sizes: in `placed-ax3-light.png` the row text sits about 21 pt in from the list's edge. At AX3 the list is clamped to 8 pt, so it does not show; at a larger non-AX size where the list is not clamped, the text would sit a few points right of the typed letter. Fix: take the inset from the laid-out cell, or assert it at one larger non-AX size too. |
| L2 | `pywidget/ios/UITests/CompletionUITests.swift:144`, `:147` | Low | The AX3 checks do not prove what the test name says. `> 66` passes on the scaled 44 alone (AX3 rows are about 95 pt in the shot), so nothing shows the fit branch (`max(row, ceil(fit))`, CompletionPopover.swift:280) is ever taken. And "the row clips its text" compares the label's frame to the row's; a label inside a fixed-height cell is laid out within it, so a truncated label passes too. Fix: compare the label's height with its text's full height (or check no ellipsis in the shot's row text), and add one case where the fit is taller than the scaled 44 (a long kind, or a size where the stacked label and kind exceed it). |
| L3 | `pywidget/ios/App/Editor/EditorMarks.swift:157` | Low | The new spoken string `"Line \(...), error: \(...)"` is not in `Localization/Localizable.xcstrings`. `python3 -I pywidget/tools/swift_strings_check.py` on main lists it among 14 missing keys (the warning form, `"Line \(...): \(...)"`, was already missing). The check exits 0, so nothing stops it; English reads the same today. Fix: add both keys. |

</div>


## Notes, no action

- N1. At the default size the fifth row is cut through its text (`cosh` in `placed-default-light.png`): the list is
  as tall as the room above the console. A cut row is the ordinary sign that a list scrolls; I would keep it.
- N2. At AX3 the list is clamped to 8 pt and placed above the line, so its text is not under the typed word. That
  is the clamp doing its job; the shot reads fine.
- N3. The packet also named "lighter marks (warnings 12 %, errors 9 %) and the gutter number of a marked line
  coloured and semibold". Neither is in cad4c75e38. The tints are `EditorMarks.tintAlpha`, landed in eab2ec4097
  (T-4256). I found no code colouring a marked line's gutter number in `pywidget/ios/App/Editor/`, and T-4256
  ("Lighten the marks and colour their line numbers") is still open on the board. I did not review either here, and
  I added no line for them: T-4256 already holds that work.

## Runner run

Asked: CompletionUITests on the MacBook runner. `tools/runner_queue.py --only-testing PyWidgetUITests/CompletionUITests`
refused (the runner carries only `PyWidgetTests` filters; the UI target needs `--full`). `XC_TASK=T-4289 tools/xc.sh
... -only-testing:PyWidgetUITests/CompletionUITests test` did not queue a job: it went past the route and waited on
the local Xcode lock, which the packet forbids for a suite. My step to stop that wait was refused by the classifier,
so the item stopped there (rule 5). The wait ended after 394.7 s and xcodebuild exited 66 at once: I had called it
from the repository root, which holds no Xcode project (`ops/runs/xcodebuild-20261113-120953.log`, 6 lines). So no
test ran here, and that wrong folder is my mistake. Not run; it needs either a `--full` runner job at a pushed commit containing
cad4c75e38 or the Operator's call.
{% endraw %}

</div>
