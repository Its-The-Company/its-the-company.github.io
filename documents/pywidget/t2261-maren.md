---
layout: "default"
title: "T-2261 design read: the completion list and the error marks"
section: "documents"
description: "Every fix below stays inside the approved look (tokens, faces, spec rows already drawn). Nothing here needs the Investors."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2261-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t2261-maren.md</code></span></div><h1>T-2261 design read: the completion list and the error marks</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-13 9:05 AM ET, task T-4253. Read: Idris's 32e92ab4e6 and 17393d231c, the four shots in
`pywidget/docs/screenshots/t2261/` (iPhone 17e, 1170 x 2532, light = A Paper, dark = B Studio), the IDE spec
([`pywidget/docs/design/ide/spec.md`](ide-spec.html) s3 table rows Completion, Lint label, Error lens; s3.3) and
`creative/approved.md` items 2 and 3. Design only; Pernille reads the code (T-4252).

Method. Sizes and colours were sampled from the PNGs with `tools/png_sample.py` (3 px = 1 pt), never by eye.
Contrast is WCAG 2 relative luminance, computed by script against `pywidget/docs/design/tokens.json` and the
colour assets the code names. Where a finding rests on reading the Swift rather than a shot, it says so.

Every fix below stays inside the approved look (tokens, faces, spec rows already drawn). Nothing here needs the
Investors.

## The known flaw: the half-typed word is marked while the list is open

Seen in `complete-light.png` and `complete-dark.png`: line 5 reads `pri`, the list offers `print`, and `pri`
already carries the amber mark (pyflakes "undefined name 'pri'"). The 0.8 s lint pause fired while the word was
still being typed. It tells the user they made a mistake in the half-second before they finish the word. It is
also said aloud: the problems element would read "2 problems", the second one the word under the caret.

**<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span>: fix.** The right behaviour, as one rule: *a mark never lands on the word the caret is in while it is
being typed.*

1. While the completion list is open, no new marks are drawn. The lint answer may arrive; it waits.
2. With the list closed, a mark whose range touches the caret (the identifier the caret sits in or at the end of)
   is held back until the caret leaves that word: a space, an operator or bracket, Return, or a caret move.
   Then it draws at the next pause, with no extra wait.
3. Marks elsewhere in the file are not affected (`valeu` on line 4 stays, as in the shots).
4. The problems element (VoiceOver) follows the same filter, so it never counts the held mark.

This is what Xcode and Swift Playgrounds do in practice, and it costs no new design: the marks, colours and words
stay as they are. Board: **T-4254**.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:1084px" markdown="1">

| # | Finding | Measured | Ruling | Board |
|---|---|---|---|---|
| 1 | The half-typed word is marked (above). | `pri` tinted in both shots | **Fix** | T-4254 |
| 2 | Every keystroke clears every mark in the file; they come back 0.8 s after typing stops. From the code (`RunestoneEngine.changed()`: "Runestone does not move them"), not visible in a still. While someone types, the `valeu` mark on line 4 blinks off and on with each word on line 5. A mark that blinks reads as an alert. | code reading; needs a recording to confirm | **Fix**: marks on lines the edit did not touch stay put, moved with the text; only the edited line's marks clear, and come back at the pause (subject to rule 2 above). | T-4255 |
| 3 | The mark's tint is the warning colour at 28 % (`diagnosticTint`, alpha 0.28). The spec says 12 % for a lint mark (s3, Lint label) and 9 % for an error (s3, Error lens). At 28 % several syntax colours fall under 4.5:1 on the tint. In the shot, the teal of a name on the tint is **4.28:1** (#0B6670 on #DECDB3). By script over every syntax role: Quill light on bg, comment 3.59, string 4.14, number 4.14; on the current line, down to 3.41; Lumen dark, comment 3.34, keyword 4.32. | light tint #DECDB3, dark #514234 (sampled) | **Fix**: warning marks at 12 %, error marks at 9 %, as specified. At those values every text role passes on the plain line (lowest: Quill light comment, 4.59:1 on the warning tint, 4.71:1 on the error tint; tints from the `StatusWarning` and `SyntaxError` assets the code uses). One pair stays under: the comment colour on the current line in Quill light (4.34 at 12 % warning, 4.43 at 9 % error). Pyflakes never marks a comment; a SyntaxError span can cross one. I move that comment colour one step under the approved floor rule (approved.md item 2) and list it in design-system-v0.md; that is mine, not Idris's. | T-4256 |
| 4 | The fill is the only sign of a problem. Against the page it is 1.50:1 (light) and 1.95:1 (dark) now, and 1.19 / 1.26 at the spec's 12 %: under the 3:1 a non-text cue needs. Its amber is also the hue of the approved search-match tint (#95: light #FAE6D4, dark #3B2602), 1.29:1 from the mark, so a search match and a problem look alike. | script | **Fix, inside the spec**: the gutter number of a line with a mark turns `status.warning` (error: `syntax.error`) and semibold, as s3's Lint label row already says. Gutter number on the gutter: 5.91:1 Quill light, 5.81 Lumen light, 11.36 / 11.75 dark. Same line as finding 3. | T-4256 |
| 5 | Sighted users get no words. The spec's lint label (the message as words at the line's right, caption, on the 12 % tint; s3.3 correction: "Undefined name", not `F401`) and its lens at AX sizes and on long lines are not built. Today the words exist only for VoiceOver. | shots | **Fix**: build s3.3 rows "Two or more messages, one line", "Label on a line too long", "Label at AX sizes, iPad" and the VoiceOver row (`va.lint`, `va.lint.n`, `va.lint.hint`). Each label becomes its own VoiceOver element. The summary element (finding 9) stays. | T-4257 |
| 6 | The list is pinned to the caret (`x = caret.minX - 12`), so it moves right one character width (about 9 pt) with every letter typed, and its text starts 32 pt right of the typed word: `pri` begins at 32 pt, `print` in the row at 64 pt. The spec says the list never animates while typing; a list that shifts on each keystroke breaks the same promise. | popover left 48 pt, row text 64 pt, word 32 pt | **Fix**: anchor at the typed word's start (`CompletionList`'s anchor), x = word start minus the row's text inset (16 pt), clamped 8 pt from the edges as now. The row's `print` then sits exactly under `pri` and the list holds still until it closes. | T-4258 |
| 7 | Row height is 49.7 pt (149 px), against the spec's 32. The 32 was drawn before rows were tappable. On iPhone, tapping a row is the main way to accept (no Tab key), so the floor is 44 pt, Apple's minimum target. 50 is 6 pt more than that on every row: 6 rows is 300 pt, in a space that is about 190 pt above the keyboard in these shots. | 149 px = 49.7 pt | **Fix**: rows 44 pt at the default size, scaling with Dynamic Type as now (and growing to fit their text at AX sizes). I amend the spec's 32 to 44 myself. | T-4259 |
| 8 | Spoken text, summary element: label "1 problem" / "N problems", value "Line 4: undefined name 'valeu'", joined by "; ". Plain, in text order, the line number matches the gutter. **Keep** the label and the warning value. But a SyntaxError reads the same way as a pyflakes guess ("Line 4: invalid syntax"). For a sighted user the colour says it will stop the run (red against amber); a VoiceOver user does not get that. | 17393d231c | **Fix (small)**: errors read "Line 4, error: <message>"; warnings stay as they are. | T-4260 |
| 9 | The summary element is a 1 pt view at the editor's top-left, reached by swiping past the editor. There is no announcement when the count changes. | code reading | **Keep.** An announcement after every typing pause would talk over the user. Swipe order is the right place for a summary. Look again once T-4257's per-line labels exist; at that point the element's frame should be the first marked line's gutter number, so the VoiceOver cursor lands somewhere that means something. | none |
| 10 | Popover chrome: width 281.7 pt (spec 282); 4 pt under the caret's line; 1 px border `line.hairline`; selected row `accent.soft` (A light #E4EBF8, B dark #2A2350, as in tokens.json); radius 10; no scale on appearing. Label on the selected row 14.37:1 light, 12.69:1 dark; the kind ("function", caption1, `text.secondary`) 5.91:1 light, 6.62:1 dark. | sampled | **Keep.** | none |
| 11 | The popover's edge against the page is faint: border 1.29:1 light, 1.35:1 dark; fill 1.16 / 1.30. | script | **Keep.** System menus and popovers have the same edge. The rows carry the meaning, and their text passes. | none |
| 12 | The amber hue for pyflakes marks and red only for SyntaxError. | asset names | **Keep.** Pyflakes guesses before the code runs; red stays for what will stop the run (SyntaxError, and the run's error lens). | none |
| 13 | A word that already matches a row exactly drops that row (`item.label != word`), so Return after a finished word makes a new line rather than accepting a no-op. | code reading | **Keep.** | none |

</div>


## States I need on screen before calling this done

None of these exist in the shots; I did not run the Simulator. Each is a still unless marked.

1. iPhone at AX3 (Larger Text, accessibility size 3), light: the list open with 5 or more rows, and a line carrying
   a mark. This tests row growth, width clamp, and the label giving way to the lens (finding 5).
2. iPad landscape with a hardware keyboard (no software keyboard), dark: the list open near the right edge, so the
   clamp shows; the selection moved to row 2 with the arrow keys.
3. The list flipped above the caret: a line in the last third of the editor with the keyboard up.
4. Fallback mode (cold), light: the foot "Basic suggestions" (`cmp.basic`).
5. Increase Contrast, light and dark, with a warning mark and a SyntaxError mark on the same screen.
6. A recording, about 5 s, light: type a new word on a line below an existing mark, pause, type on. This shows
   findings 1 and 2 before and after the fix.

## What I own from this read

- Amend spec s3's Completion row, rows 32 to 44 (finding 7), and move Quill light's comment colour one step for the
  current-line tint pair (finding 3). Both inside approved.md item 2; listed in design-system-v0.md.
- Read the six states above when Idris posts them.
{% endraw %}

</div>
