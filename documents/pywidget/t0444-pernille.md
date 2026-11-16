---
layout: "default"
title: "Review: T-0444, an inherited version goes in the footnote line (1f342fb236, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The Swift change does exactly what T-0431 L2 asked: a version that starts &quot;as in &quot; leaves the title and joins the row&#x27;s footnote (&quot;MIT License \u00b7 as in Jedi 0.19.2&quot;) and gets its own footnote\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0444-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t0444-pernille.md</code></span></div><h1>Review: T-0444, an inherited version goes in the footnote line (1f342fb236, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4031, 2026-11-16. Independent review (Commandment 13). I read the diff, the two files as they
stand on personal/a2 at 55f7702836 (neither has changed on main since 1f342fb236: `git diff 1f342fb236 main` on both
is empty), the T-0431 L2 finding the line came from (log/audit/2026-10-27-t0431-review.md), the bundled
Acknowledgements.json, tools/acknowledgements.py and the open line T-0623. Test runs: see "Tests" at the end.

**Verdict: PASS with findings.** The Swift change does exactly what T-0431 L2 asked: a version that starts "as in "
leaves the title and joins the row's footnote ("MIT License · as in Jedi 0.19.2") and gets its own footnote line on the
notice page. All 42 bundled entries come out right: the 18 inherited ones show the name alone, the 24 with a version of
their own are unchanged. No notice text, licence name or source link changed, so the attribution the licences require
is intact. Light and dark both read correctly (sheets looked at, below). One Medium on the registry side, which the
Swift rule now leans on, and three Lows on wording and tests. No FIX FIRST: nothing here blocks TestFlight.

## What I checked

**1. The parse (Acknowledgements.swift:31-43).** `inheritedVersion` is `version.hasPrefix("as in ")`, so:
- no version (`""`): title is the name, no trailing space (`!version.isEmpty`). Correct.
- own number or hash ("0.19.2", "2025.1.31", a 40-character commit): title is "name version", footnote the licence
  alone. Correct, and the commit says this is intended.
- "as installed", "as": not inherited, title "name version". Correct; the space after "in" is part of the marker.
- odd strings the data does not hold today: "as in " with nothing after it gives the footnote "MIT License · as in "
  (a dangling fragment); "As in X", " as in X" and "in Jedi 0.19.2" are not recognised and print after the name as
  before. None of these is in the bundle; M1 is what keeps it that way.
- `Text(verbatim:)` for the title and footnote is right: names like "HACL* (CPython's copy)" are never read as a
  localisation key or markdown.

**2. Every bundled entry.** 42 entries, 18 with "as in ..." (16 "as in CPython 3.15.1", 2 "as in Jedi 0.19.2"), all 18
also `part_of` a parent. `testNoBundledTitleCarriesAnInheritedVersion` walks all 42 against the real bundled file and
passed. The 5 entries whose own version is a 40-character commit (hacl-apache, runestone, tree-sitter-icu,
treesitterlanguages, tree-sitter-python) keep it after the name; see L3.

**3. Licence obligations.** The commit touches only the title and the line under it. The notice text, the licence
name, the "Offered under ...; used here under ..." election line, "Part of ..." and the source link render exactly as
before (NoticeBlock order unchanged apart from the one added line). The bundled file is still the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>'s,
byte-checked by the "Acknowledgements check" phase. Nothing an MIT, BSD, Apache or MPL notice requires is lost.

**4. Accessibility and appearance.** AckRow's VoiceOver label is still "name, licence" and its value is still
`entry.version`, so an inherited row reads "django-stubs (in Jedi), MIT License, as in Jedi 0.19.2": the same words
as the screen, in the same order. Colours are the existing textPrimary / textSecondary assets; nothing new to check
for contrast. The notice page's new line is in the secondary block like its neighbours. The UI test labels
(AcknowledgementsUITests: "certifi, Mozilla Public License 2.0") do not depend on the title, so they are unaffected.

**5. The tests (Tests/AcknowledgementsInheritedVersionTests.swift).** Four tests: the finding's own case from the
bundled file (django-stubs and Jedi), every bundled entry, synthetic versions, and an ImageRenderer sheet in light and
dark. The first two are real tests of the real data and would go red on a regression. The third covers the main
cases but not the edges in item 1 (L2). The fourth proves only that something drew (more than 8 colours); a dropped or
truncated footnote would pass it (L2). Its PNGs are the useful part; I wrote them out and looked at both.

## Findings

**M1 (Medium): nothing checks an inherited version, and the Swift rule now depends on its exact form.**
Every "as in CPython 3.15.1" and "as in Jedi 0.19.2" in pywidget/licenses/components.json is typed by hand. The
generator checks a component's own version against manifest.toml or its `version_from` file
(tools/acknowledgements.py:423-435), and nothing at all about these 18 (no "as in" anywhere in the tool). On the next
CPython or Jedi bump, the parent row will say the new version, 18 rows will still say the old one, and the check
passes: the Acknowledgements screen states something untrue about what we ship. The same check also guards T-0444's
parse: "As in", "in CPython 3.15.1" or a bare "as in " would pass the generator and print after the name again.
Separately, the bundled Acknowledgements.txt is written by the same tool with `f"{group}: {name} {version}"`
(tools/acknowledgements.py:555), so it still reads "django-stubs (in Jedi) as in Jedi 0.19.2" (Acknowledgements.txt
:1789), the very wording T-0444 took off the screen. Fix: in tools/acknowledgements.py, a version starting "as in "
must equal "as in <name> <version>" of an ancestor (bundle.of / part_of) that has a version of its own; a part with no
version of its own must use that form; and the .txt heading moves the inherited version to the line under it, as the
app does. A test in tests/acknowledgements_test.py for a stale and a misspelled one. Owner: Odalys (the registry and
generator). Board: new line, "Check the inherited versions in the licence list".

**L1 (Low): a part's notice page names its parent three times, and T-0623 will change the same row.**
The django-stubs page reads "django-stubs (in Jedi)", then "MIT License", "as in Jedi 0.19.2", "Part of Jedi" (sheet
below). "as in Jedi 0.19.2" alone on a line is a fragment; "Part of Jedi 0.19.2" would say both things once. The open
line T-0623 (Idris) plans a "Part of <parent name>" second line on the row for every part_of entry, which is all 18
inherited rows, so it would replace or collide with T-0444's row footnote. Fix: settle the part wording once, inside
T-0623, for row and page together; Maren passes it. Board: a note on T-0623, not a new line.

**L2 (Low): the tests miss the edges and cannot see a lost footnote.**
`testOnlyTheAsInPrefixMoves` has no case for a bare "as in " or a capitalised "As in"; nothing checks the VoiceOver
label and value of an inherited row; and `testTheRowsRenderAsASheet` passes as long as the image has more than 8
colours. Fix: add those cases, and assert the row's accessibility value, when T-0623 changes the row. Board: in the
same T-0623 note.

**L3 (Low): five titles carry a 40-character commit hash.**
"Runestone acc9ecb837bd037bc6c99d8c5b38cba2088c4b90" is the row title, and VoiceOver reads all 40 characters as the
value. Same class as T-0431 L2: not a version a person reads. Out of T-0444's scope (its commit keeps hashes on
purpose, and its synthetic test uses a 7-character one). Fix: a short form (12 characters) on the row, the full hash on
the notice page. Board: in the same T-0623 note.

## Tests

1. `xcodegen generate` in pywidget/ios. The first test build failed in RunestoneEngine.swift (no member
   `lineNumberMarks`): this worktree's gitignored Vendor/Runestone was older than patch runestone-0003. I re-ran
   `scripts/fetch_editor.sh` (from the cached clone) and the build went through. Not a T-0444 fault.
2. `XC_TASK=T-4031 XC_LOCAL=1 tools/xc.sh -project pywidget/ios/PyWidget.xcodeproj -scheme PyWidget -destination
   'platform=iOS Simulator,name=iPhone 18 Pro' -only-testing:PyWidgetTests/AcknowledgementsInheritedVersionTests
   -only-testing:PyWidgetTests/AcknowledgementsTests -only-testing:PyWidgetTests/AcknowledgementsLicenseNamesTests
   test`, 2026-11-16 about 12:05 PM ET: **exit 0, 22 executed, 0 failures**, all 4 inherited-version tests passed
   (ops/runs/xcodebuild-20261116-115722.log).
3. The same with `TEST_RUNNER_ACK_SHEET_DIR` set and only AcknowledgementsInheritedVersionTests, about 12:15 PM ET:
   exit 0, 4 executed, 0 failures (ops/runs/xcodebuild-20261116-120728.log). I looked at both PNGs: rows and the
   django-stubs notice block read correctly in light and dark, the link is tinted in both, nothing truncated. They are
   scratch output, not committed.
4. Not run: AcknowledgementsUITests (no label they check changed) and NoticeTextTests (notice text untouched).
{% endraw %}

</div>
