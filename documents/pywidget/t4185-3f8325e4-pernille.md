---
layout: "default"
title: "Review of T-4185 at 3f8325e4: launcher edits target the shown slot (T-5898), invisible marks (T-5904), checklist (T-5016)"
section: "documents"
description: "PASS, with three Low findings. Nothing here is a crash, data loss or App Review risk; every case below needs a slots.json or a link written by something other than the app&#x27;s own editor."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4185-3f8325e4-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/reviews/t4185-3f8325e4-pernille.md</code></span></div><h1>Review of T-4185 at 3f8325e4: launcher edits target the shown slot (T-5898), invisible marks (T-5904), checklist (T-5016)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (Commandment 13; I wrote none of this). Author: Idris (app code and docs); Operator (c38981c110).
Date: 2026-11-26. Diff: `git diff main...3f8325e41d` on personal/a.
Commits: 544154e484 T-5016 (editor.md s11c row 3), 4746a6c102 T-5898 (Shared/LauncherSlots.swift, LauncherSlotsTests,
how-it-works/launcher.md, launcher.svg, draw_launcher.py), 3f8325e41d T-5904 (LauncherSlots.swift `hidesInARow`,
LauncherEditorTests), c38981c110 (ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox, not app code). The brief named LauncherWindowsUITests; this diff has no
change to it.

## Verdict

PASS, with three Low findings. Nothing here is a crash, data loss or App Review risk; every case below needs a slots.json or
a link written by something other than the app's own editor.

## What I checked

- Host tests: `swift test --filter 'LauncherSlotsTests|LauncherEditorTests'` in pywidget/ios/Core at 3f8325e41d: 62 tests,
  0 failures.
- Red without the fix: 16 mutants of LauncherSlots.swift, one at a time, in a scratch export of the tree (`git archive`,
  /tmp, not this checkout). 14 killed: `target` reverted to "first with that id" in save(link) and in write(); reorder keyed
  on the first id again; reorder's shown map emptied; the NSDecimalNumber branch removed; the "Q" branch removed; no
  40 cut; the negative sign ignored in `hue(ofDigits:)`; each new mark (U+00AD, U+180E, U+2060, U+FFF9, U+FFFB) and U+2029
  dropped. Two survived (L2).
- Index against id after a reorder: `shown(raw)` gives each shown entry's place in `raw` inside the same `rewrite` lock, so
  the indices are the file's as read; `Dictionary(uniqueKeysWithValues:)` keys on places, which are unique. A shown id not
  in `ids` and every unshown entry go behind in their old order, as before. Edits fall back to the first entry with the id
  only when none has a name, and then name it, so it becomes the shown one. Correct.
- Hues against Python 3: `v % 12` for the test's nine values gives [8, 3, 4, 6, 6, 3, 6, 7, 8], the test's list. I also read
  what JSONSerialization returns for other shapes (L3).
- The 40 cut: Python's `name.strip()[:40]` cuts at code points with no second strip; the list now cuts at 40 scalars after
  the trim with no second trim. That can split a grapheme (an emoji ZWJ sequence, a letter and its combining mark), which is
  right: the list must show what the widget draws, and the widget splits it the same way.
- Docs: launcher.md's six anchors resolve with `how_it_works.resolve` and all six `checked:` fingerprints equal the code's
  now. The sentences agree with the code, apart from L3. `draw_launcher.py --check` says launcher.svg is current. The page is
  correctly said not to be one of PARTS yet.
- Licences (Commandment 6): no outside asset. launcher.svg comes from draw_launcher.py, which imports only os, sys,
  textwrap and xml.sax.saxutils and calls no model.
- editor.md row 3 now names T-5908, and that line is on the board (Maren, "Say where a tap outside a launcher's app boxes
  goes").

## Findings

### L1 (Low): other marks that draw nothing still show as a Shortcut name

pywidget/ios/Shared/LauncherSlots.swift:169. `hidesInARow` adds the marks the T-5904 line listed, but its own comment says
"the other marks that draw nothing in a row", and these still pass: U+2061-U+2064 (invisible operators; `Unicode.Scalar
.Properties` calls them format and default-ignorable, like U+2060), U+206A-U+206F, U+034F, the Hangul fillers U+115F,
U+1160, U+3164 and U+FFA0, U+180B-U+180D and U+180F, and U+17B4-U+17B5. So `shortcuts://run-shortcut?name=L%E2%81%A2og`
still shows "Shortcut · Log". The list in the board line came from my review of T-5268, so the gap is mine; the commit did
exactly what it was asked. Fix: refuse every scalar whose `properties.isDefaultIgnorableCodePoint` is true, except U+200C,
U+200D, the variation selectors (U+FE00-U+FE0F, U+E0100-U+E01EF) and the tag characters U+E0020-U+E007F (emoji and flag
sequences use them), and keep U+FFF9-U+FFFB, which are not default-ignorable. Add a Core case for U+2062 and U+3164.

### L2 (Low): the name-cut test cannot tell a scalar cut from a Character cut, or catch a second trim

pywidget/ios/Tests/Core/LauncherSlotsTests.swift:323. The test name is 39 "x" and a precomposed "é" (U+00E9), so 40 scalars
is also 40 Characters. A mutant cutting with `String(name.prefix(40))` (Characters) passed, and so did one adding a trim
after the cut. Fix: use `String(repeating: "x", count: 39) + "e\u{301}"` (the widget keeps "e" and drops the accent; a
Character cut keeps both) and add a name with a space at place 40 (`39 × "x" + " yz"`, shown as 39 "x" and a space).

### L3 (Low): the comment and the page give the wrong limits for big-number hues

pywidget/ios/Shared/LauncherSlots.swift:330 and pywidget/docs/how-it-works/launcher.md:23. The comment says a fraction "written
with 20 or more digits and '.0'" reads as a whole number. On this Mac, JSONSerialization returns an NSDecimalNumber, which
then reads as a whole number, for 17 or more significant digits: `12345678901234567.0` and `-1234567890123456789.0` do,
and so do exponent forms such as `123456789012345678e0` and `12345678901234567890E1`. Python calls all of these floats, so
the widget colours them by place and the list by value. The page leaves the fraction case out. Its "a longer one is rounded"
is too broad: `1234567890123456789012345678901234567890` (40 digits) came back exact, and 39 nines came back as
`…990`. Fix: say "17 or more significant digits, or an exponent" in the comment, and add one plain sentence about it to the
page. The code cannot tell which way the number was written, so the case stays a known difference.

## Observation (no finding, older than this change)

The trim differs by four characters. Python's `str.strip()` removes U+001C-U+001F; Swift's `.whitespacesAndNewlines` does not.
So a name "\u{1c}X" in another writer's file is drawn as "X" and listed as "\u{1c}X", and the cut moves by one. It came in
with the trim, not with T-5898. If someone fixes it, it belongs with the T-4576 read rule.
{% endraw %}

</div>
