---
layout: "default"
title: "Review of T-4257 at b076f0ea: problem words beside the marked line, the +N and the lens"
section: "documents"
description: "PASS with findings. The step does what the board line and s3.3 ask at the default size and at AX3 on the phone. The first mark&#x27;s code reads as words, the &quot;+N&quot; and the heading appear for two or more marks, the lens goes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4257-b076f0ea-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 34 · Tue Nov 24</span><span><code>pywidget/docs/reviews/t4257-b076f0ea-pernille.md</code></span></div><h1>Review of T-4257 at b076f0ea: problem words beside the marked line, the +N and the lens</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4186, Commandment 13). Author: Idris. Reviewed: `git diff main...HEAD -- pywidget` (base
8bf7ec550f, one commit b076f0ea7b), that is the new pywidget/ios/App/Editor/LintLabelsView.swift (+279), and
EditorMarks.swift (+112: `EditorDiagnostic.code`, `LintLabels`), EditorTooling.swift (+3: `code` read from the answer),
ConsoleEditor.swift (+10: the overlay built, fed and added), Localizable.xcstrings (+55: five keys),
Tests/Core/EditorMarksTests.swift (+63: `LintLabelsTests`, 5 tests) and UITests/CompletionUITests.swift (+51: two UI
tests). Each file read in full where it changed, and the commit message. Judged against the T-4257 board line (s3.3's
label at the line's right, code as words, caption, 12 % tint; the +N and lens for two or more; the lens on long lines,
at AX sizes and iPad; va.lint per label; Done: one label read by a UI test, shots at default and AX3, phone and iPad)
and against IDE spec s3.3 (pywidget/docs/design/ide/spec.md:157-171) and the copy card s4
(pywidget/docs/design/copy-card-pending.md:62-64). Also read, for what the change relies on: `caretRect(at:)`,
`applyWrap`, `setDiagnostics`, `gutterMarkColor` and `diagnosticTint` in RunestoneEngine.swift; Runestone 0.5.2's
`LayoutManager` gutter frame (Vendor/Runestone/.../LayoutManager.swift:332) and `caretRect(for:)`; `EditorSlot` and the
Pro themes in EditorThemeChoice.swift; `diagnostics()` in pywidget/python/pywidget_tooling/editor.py:700-728; the
colour sets StatusWarning, SyntaxError, SyntaxBg and SyntaxCurrentLine. Line numbers are HEAD's. Date: 2026-11-24.

What I ran (no Xcode; no tracked file edited but this one):
- `python3 pywidget/tools/swift_strings_check.py`: 2 findings, both GalleryView.swift:510/512 `Text(verbatim:)`,
  neither in this change. 206 catalog keys.
- `python3 tests/swift_strings_catalog_test.py`: PASS 17 FAIL 0.
- A host probe: `EditorDiagnostic` and `LintLabels` copied out of EditorMarks.swift with a stub `tintAlpha`, built with
  swiftc in /tmp. CR-only breaks, a blank line, a mark on the CR of a CRLF, UTF-16 surrogates before a mark, and five
  marks on one line all group and range correctly ("+4", "5 messages on line 1"). `words` on every pyflakes class I
  tried reads well except `FStringMissingPlaceholders` (L3).
- WCAG contrast of the label's words on its own 12 % (warning) or 9 % (error) tint, from the colour sets: warning
  light 4.98:1 (4.70 on the current-line fill), dark 9.31, light high-contrast 6.68; error light 5.46 (5.15 on the
  current line), dark 6.68, both high-contrast sets 6.91 and 7.92. All pass 4.5:1 for caption text. This is the free
  pair only; the Pro themes I did not compute (L4).
- I did not run LintLabelsTests or the two UI tests (a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree queues xc.sh tests until landing), so the commit's
  runner figures (J-20261124-1554 52/0, J-20261124-1631 12/0, J-20261124-1521 2286 with the one BridgeTests red) are
  its own and I did not see those results. The iPhone and iPad runs and the shots by eye are owed to later.

## What holds

- **The words and the grouping are right.** `LintLabels.lines` (EditorMarks.swift:279-311) drops the same marks
  `setDiagnostics` drops (outside the text or empty), counts CRLF as one break as Runestone does, puts a mark on the
  line it starts on, and orders by column then arrival, which is the module's order (editor.py sorts by line, col).
  `label` is the first mark's code as words in sentence case, never a flake8 code; `more` and `heading` appear only for
  two or more. The host tests would go red on the obvious breaks: CRLF counted twice (lines 3 and 5, not 2 and 4), the
  column sort removed, the AX branch of `place` removed, or the error branch of `spoken` removed.
- **The code is carried end to end.** EditorTooling.swift:437 reads `code` from the answer; editor.py writes it on
  every pyflakes item (`type(m).__name__`), on syntax items and on "Internal". `EditorDiagnostic.code` defaults to "",
  so every other caller still builds, and `words("")` falls back to the message.
- **Touches pass to the editor except on a label or a shown lens.** `hitTest` returns nil for the overlay itself
  (LintLabelsView.swift:47-50); hidden chips and lenses are skipped by UIKit's own hit-test. The UI test's first tap on
  the editor (CompletionUITests.swift:178) goes through the bare overlay to the text. The 44 pt target is
  `point(inside:)` widened round the chip (:217-219), which UIKit's hit-test honours.
- **Vertical scroll, size and wrap follow.** Positions come from `caretRect(at:)`, which is in the text view's content
  space (RunestoneEngine.swift:241-245), converted with `convert(_:from: scroll)`, which takes the scroll offset. The
  overlay lays out again on the scroll view's offset, size and bounds (KVO, :36-40) and on its own frame
  (autoresizing). Wrapping is on only from AX1 (RunestoneEngine.swift:258), where `place` always answers `.lens`, so the
  "end x minus start x" width is never read on a wrapped line.
- **The tap is fixed as the commit says.** `.touchUpInside` (:65), and `accessibilityActivate` sends the same event
  (:211-214); the lens is announced with `.layoutChanged` when it opens (:93).
- **VoiceOver strings at the default size.** `va.lint`, `va.lint.n` and `va.lint.hint` match the approved copy word for
  word; the catalog's five keys have translator comments that name their s3.3 id. The UI test reads `va.lint` on the
  real label (CompletionUITests.swift:190).
- **The lens closes when the line's marks go.** `update` drops `opened` when its line is no longer among the lines
  (:55), so the T-4254 rule that an edit on the line clears its marks also closes the lens, as s3.3 asks.
- **Order over the completion popover.** The popover is added to the container when it appears
  (CompletionPopover.swift:146), so it draws above the overlay and its lens.

## Findings

### M1 (Medium, not blocking): a shown lens swallows every touch on the lines it covers

`LintLens` keeps user interaction on (LintLabelsView.swift:224-242), so `hitTest` (:47-50) returns it, and a touch there
does nothing. At AX1 and up, and on a line too long for its label, the lens shows whenever the caret is on the marked
line (:126-128), on an opaque ground over the line or lines below (two or three at AX3 with a long message). That is
the common case for someone typing: they pause, the line is marked again with the caret still on it, and the next line
is now dead to a tap. A tap there places no caret, and a drag that starts there does not scroll, because the overlay is
the scroll view's sibling, not its child. The way out is to tap some other line first. The tapped-open lens at the
default size does the same, but there the person opened it themselves. Fix: `isUserInteractionEnabled = false` on the
lens, so the tap reaches the editor, moves the caret and hides the lens. A tap on the lens could also close it, as s3.3's
"tap again" does for the label. Add a UI test that taps the line under a shown lens and reads the caret.

### M2 (Medium, not blocking): the lens is drawn under the line even when there is no room under it

`lens.frame.y = endHere.maxY + 2` (:134) with no check against the overlay's height. The overlay clips to its bounds
(:31), the editor has no bottom overscroll (no `contentInset` or overscroll set in App/Editor), and the split shrinks the
editor to the height the keyboard leaves. So the lens of the file's last line, and of any line at the editor's bottom
edge, is cut off or not seen at all. Typing at the end of a file, with the caret kept just in view above the keyboard,
is exactly that case. At AX sizes the lens is the only place the message is drawn. Fix: when the lens would not fit
below, draw it above the line (or add a bottom content inset while it shows). The UI test's script is short, so it never
reaches this.

### M3 (Medium, not blocking): sideways scroll carries the labels over the line numbers

The chip's x is `right - size.width - offsetX` (:107-108, :123): fixed in content space at the screen's width, so it
moves left as the text scrolls sideways. Runestone pins the gutter to the viewport (LayoutManager.swift:332:
`gutterContainerView.frame.x = viewport.minX`), and the overlay sits above the whole engine view, gutter included. Once
the scroll passes about the code width less the label (about 230 pt on a 390 pt phone with a 100 pt label), every inline
label is drawn over the line numbers. On an iPhone any line over about 37 characters makes the file scroll sideways, so
this is common. The commit says the labels follow scroll; vertically they do, sideways they do not. Fix: hide, or clip
at the code's left edge, a chip whose x falls inside the gutter.

### L1 (Low): at AX sizes VoiceOver hears no `va.lint`

The chip that carries `va.lint` and its hint is hidden at AX1 and up (:121). The lens's label is the heading and
messages only (:262), with no severity and no line, and it exists only while the caret is on the line. s3.3's VoiceOver
row names `va.lint` with no exception for AX. `editor.problems` still says "Line 4: ...", so nothing is lost outright.
Fix: give the lens `LintLabels.spoken` as its label when no chip is drawn.

### L2 (Low): strings outside the approved seven

- `Error, {label}, line {line}. {message}` (EditorMarks.swift:332) is new copy, in the approved voice (rule 51 needs no
  approval for that), but s3.3 and the copy card s4 do not list it. Maren should add it to the card.
- `va.lint.n` says "warnings" when the line's marks include an error (:328). Mixed lines are rare, since a SyntaxError
  stops pyflakes, but "Internal" is an error on line 1 (editor.py:726).
- `lint.more` "+%lld" (:315) is not in the catalog. The check skips it (no letters to translate), and the commit's
  "five keys" is accurate. Noted so the catalog is complete when Xcode adds it.

### L3 (Low): two codes read badly as words

`words("FStringMissingPlaceholders")` gives "Fstring missing placeholders" (two capitals in a row are joined), and the
"Internal" item (editor.py:726) labels its line "Internal". Small; Maren's call on both.

### L4 (Low): the lens ground and the error colour are the free pair's under a Pro theme

The lens's opaque ground is `.syntaxBg` (:231), and `color(.error)` is the asset "SyntaxError" (:142), whatever theme is
drawn. The gutter number uses the theme's own error colour (RunestoneEngine.swift:173-175), so under Ember, Fern or
Graphite the lens is a different ground from the editor, and an error chip is a different red from its line number. The
squiggle tint already uses the free pair (RunestoneEngine.swift:178-181), so the chip follows the existing tint, but the
opaque lens is a visible patch. Fix: take the ground and the error colour from `EditorTheme.resolve(_, key)`.

### L5 (Low): what the tests leave unproved

- `place` is tested only as arithmetic (EditorMarksTests.swift, last test). Nothing runs the long-line lens path at the
  default size, nor the `end.minX - start.minX` measurement it rests on.
- The "+N", the divider and the lens heading are checked on the host only. No UI test draws two marks on a line.
- There is no UI test for any of M1-M3: a tap under a shown lens, a marked last line with the keyboard up, or a sideways
  scroll.
- The iPad half of the Done line (shots on iPad) is not done, as the commit says. The commit also says the lens does not
  close on an edit by itself. That holds in practice, because the edit clears the marks. An edit on another line before
  this one also closes it, because `Line` equality includes the shifted range (:55). That is harmless.

### Observations (not findings)

- `layoutSubviews` asks two caret rects for every marked line on every scroll tick, on screen or not. With
  `EditorMarks.shown` this is small for real files; I did not measure it.
- The 44 pt target reaches about 13 pt into the lines above and below at the right edge, so a tap there opens the lens
  instead of placing the caret. s3.3 asks for the 44 pt target, so this is by design.
- The commit's claims match the code, except "follows scroll" sideways (M3).

## Verdict

PASS with findings. The step does what the board line and s3.3 ask at the default size and at AX3 on the phone. The
first mark's code reads as words, the "+N" and the heading appear for two or more marks, the lens goes under the line
and toggles on a tap and on VoiceOver's activate, the approved strings are word for word with comments, and the label's
contrast passes on the free pair. Touches go to the editor everywhere but a label or a shown lens. None of the findings
is a crash, data loss or a review rejection. M1 (a shown lens eats taps on the lines under it) and M2 (no room under
the last line) should be fixed before this editor goes to TestFlight, since both hit an AX user while typing. M3 is
visual but common on a phone. I did not run the unit or UI tests. The iPhone and iPad runs and the shots by eye are
owed to later.

Verdict: pass
{% endraw %}

</div>
