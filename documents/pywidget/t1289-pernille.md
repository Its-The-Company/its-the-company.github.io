---
layout: "default"
title: "Review: T-1289, the remaining number holds and the Text suffix line breaks (749a1ab8db, a703a964ae; Idris)"
section: "documents"
description: "The T-1289 lines are unchanged since a703a964ae. TreeView.swift and pywidget_ui have changed in other tasks since, so the line numbers below are for the files as they are now."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1289-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t1289-pernille.md</code></span></div><h1>Review: T-1289, the remaining number holds and the Text suffix line breaks (749a1ab8db, a703a964ae; Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4043, 2026-11-16. Independent review (Commandment 13): I read the diffs and the code as they
stand on personal/b2 (55f7702836), not the author's notes. The board line names 35481fb8; that commit only adds a
<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox record (T-3143 for T-1440's red template test). Scope is every commit whose message names T-1289:
- 749a1ab8db (Idris): `python/pywidget_ui/__init__.py` (`_suffix_problem`, the DSL and `validate`),
  `tests/dsl/schema_check.py` (`ecma_to_python`), `tests/dsl/test_checks.py`, `tests/dsl/test_semantic.py`.
- a703a964ae (Idris): `ios/Shared/TreeRules.swift` (`aspectRatio`, `imageScale`), the two call sites in
  `ios/Shared/TreeView.swift` and `ios/Shared/TreeNodes.swift`, `ios/Tests/Core/TreeRulesTests.swift`,
  `ios/Tests/TreeNodesTests.swift`, `ios/scripts/make_widgetkit_fixtures.py`, and the mutant files.
- 3cd54ca587 and 35481fb8b7 are lane-outbox records; nothing to review.

The T-1289 lines are unchanged since a703a964ae. TreeView.swift and pywidget_ui have changed in other tasks since, so
the line numbers below are for the files as they are now.

**Verdict: PASS with findings.** Both halves are correct and the tests check what they claim. In the extension,
`aspectRatio` and a bitmap's `scale` are now held at the only two call sites that hand them to SwiftUI. These were
the values that took the extension down. Nothing here would hurt a TestFlight build. There are three Low findings,
where what the DSL accepts and what the renderer draws do not match. Neither is a crash, data loss or an App Review
problem.

## What I checked

**1. TreeRules.aspectRatio (TreeRules.swift:54).** nil unless the value is finite and above zero, then held to
1/2000...2000 (`lengthLimit` is 2000.0). nil passed to SwiftUI's `aspectRatio(_:contentMode:)` means the view's own
ratio, which is the right answer for 0, negatives, NaN and inf. The bounds are finite and non-zero in both
directions, so a fill can no longer produce an inf or 0 dimension. The worst case is 20 pt x 40,000 pt, which is
finite. The call site (TreeView.swift:466) is the only place a ratio reaches SwiftUI. I grepped Shared, App, Widget
and Core for `["ratio"]` and `aspectRatio(`.

**2. TreeRules.imageScale (TreeRules.swift:61).** Exactly 1, 2 or 3, else 1. That matches the schema
(`imageSource` bitmap `scale: enum [1, 2, 3]`) and the DSL (`Image.bitmap` refuses anything else, :1125). The exact
comparison is safe: JSON `2` and `2.0` both decode to 2.0. TreeNodes.swift:520 is the only `UIImage(data:scale:)`.
The other two image paths (`systemName`, `named`) take no scale.

**3. Test quality (Swift).** `testAspectRatioIsFiniteAndAboveZeroOrNone` and `testAnImageScaleIsOneTwoOrThree` cover
every branch, including the exact values that trapped (1e308, 1e-308). The two render tests drive the real call
sites through `draw`. The aspect test checks the trap values in fill mode and also that a valid ratio of 4 still
lays out as 20 x 5. The bitmap test uses 0.5, the same fault without the trap: a 2 x 2 PNG must not cover (3, 3).
It also checks that scale 2 is kept. The committed mutant results show 6/6 Core mutants and 2/2 call-site mutants
killed. I did not re-run them.

**4. _suffix_problem (pywidget_ui:944) and validate (:2397).** The DSL now refuses LF, CR, U+2028, U+2029 and NEL.
`validate` checks a date Text's suffix as well, which closes the hand-edited-tree gap. `"\r\n"` is refused. VT and FF
pass, and Swift's text does break on them (L3). NEL is refused by the
DSL but accepted by the schema. The test (`test_semantic`) states this split explicitly, so it is a known stricter
rule, not a drift.

**5. ecma_to_python (schema_check.py:70).** Outside a class, an unescaped `.` becomes `[^\n\r  ]` and an
unescaped `$` becomes `\Z`. Escapes are copied as pairs before the class check, so `\]` inside a class and `\\.`
keep their meaning. `[]` and `[^]` are refused rather than misread. I translated all 13 patterns in the current
`viewtree.schema.json`. Each compiles. The `$` inside the URL classes stays a literal, and the `$` inside the timeZone
lookahead becomes `\Z`, as it should. `test_pattern_dot_is_ecma_dot` covers class, escape and alternation cases.

**6. Fixtures and files.** `forced_numbers` writes values the schema refuses into JSON after the DSL has built the
tree. `forced` exits if nothing matched, so a renamed key cannot quietly produce a no-op case. The mutant JSON and
results files sit in Core/ and Tests/, as for earlier tasks. Tests/ is a source of PyWidgetTests, so
`mutants-t1289.json` is copied into the test bundle only. It does not reach the app or the extension.

## Findings

**L1. The DSL still accepts the ratios the renderer now ignores.** `Node.aspect_ratio` (pywidget_ui:874) passes
`ratio` through `_num`, which takes any finite number. The schema takes any `number`. Since T-1289 the phone draws
`aspect_ratio(0)` or a negative ratio as "no ratio", and holds 1e-308 or 1e308 to 1/2000...2000. A script gets no
error and a different picture than it asked for. Fix: refuse ratio <= 0 in `aspect_ratio`, and add
`exclusiveMinimum: 0` to the schema's `aspectRatio.ratio`.

**L2. The renderer draws a Text suffix unchecked.** TreeView.swift:749-752 puts `content.suffix` into the Text
verbatim. The fixture script's own note says the extension checks no number it decodes, and the same holds for this
string. A tree written past `validate` with a line break or 200 characters in the suffix draws a two-line or
overlong live date. It does not crash. Fix: drop a suffix that breaks a line or runs past 64 characters, using the
same set as `_LINE_BREAKS`.

**L3. VT and FF still break the line.** `_LINE_BREAKS` lists NEL because Swift's Text breaks there. VT (U+000B) and
FF (U+000C) are mandatory breaks too (UAX #14 class BK). I checked this on this Mac: a CoreText frame lays out
`"a\u{0B}b"` and `"a\u{0C}b"` on 2 lines, the same as LF and NEL, while TAB stays on 1. I did not run it in a
widget extension, but SwiftUI's Text sets its lines with the same engine. ECMA's dot accepts both characters, so the
DSL, `validate` and the schema all pass a suffix of `"a\x0bb"`, and it draws on two lines. Fix: add `"\x0b"` and
`"\x0c"` to `_LINE_BREAKS` and to L2's Swift check, with test rows for both.

**Board line refused (Commandment 14).** I tried to add one line for L1-L3. `tools/board_tick.py add` refused it:
"a new open line needs a plain title: length: 19 words; a title has 3 to 10; length: 89 characters; at most 64". I
stopped there and did not reword it. The line I tried to add, for the Operator to log or re-add:

> [build] Title: Refuse an aspect ratio of zero or less in the DSL, and hold a Text suffix in the renderer \|
> Idris, P3, from T-4043 L1-L3 (pywidget/docs/reviews/t1289-pernille.md): see L1-L3 above. Done when: test:
> land:host, with DSL tests for L1 and L3 and a TreeNodesTests render test for L2. Targets:
> pywidget/python/pywidget_ui/__init__.py, pywidget/docs/design/viewtree.schema.json,
> pywidget/ios/Shared/TreeView.swift, pywidget/tests/dsl/test_semantic.py, pywidget/ios/Tests/TreeNodesTests.swift.
> Base: 55f7702836c3. (owner: Idris)

Re-added by the Operator, 2026-11-16, as T-4590 (title "Check widget sizes and label line breaks more strictly";
same body, Model: Opus medium).

## Runs

- Host, Python 3.9.6, in pywidget/tests/dsl: `python3 -m unittest test_checks test_semantic`: 55 tests, OK. Then
  `discover -p 'test_*.py'`: 314 tests, OK.
- `xcodegen generate` in pywidget/ios, then
  `XC_TASK=T-4043 tools/xc.sh -project pywidget/ios/PyWidget.xcodeproj -scheme PyWidget -destination 'platform=iOS
  Simulator,name=iPhone 18 Pro' test -only-testing:PyWidgetTests/TreeNodesTests -only-testing:PyWidgetTests/TreeRulesTests`:
  it ran here, not queued, exit 0. 64 tests executed, 0 failures, 0 skipped. All four T-1289 tests passed. Log:
  ops/runs/xcodebuild-20261116-114700.log. The working tree held another session's uncommitted edit to
  `ios/App/Projects/WidgetScriptSave.swift`, which is not part of T-1289 and not in these test classes.
{% endraw %}

</div>
