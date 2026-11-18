---
layout: "default"
title: "Review of T-4662 at 8ed2580a: the caret on a long line (tap and space-bar trackpad)"
section: "documents"
description: "PASS with findings. The tap and trackpad behaviour Idris claims is what the code does on unwrapped lines, the second-tap fix is sound, and the how-it-works change keeps both suites that name it green on the host\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4662-8ed2580a-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4662-8ed2580a-pernille.md</code></span></div><h1>Review of T-4662 at 8ed2580a: the caret on a long line (tap and space-bar trackpad)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4876, Commandment 13). Author: Idris. Reviewed: 8ed2580aa9 (ios/App/Editor/RunestoneEngine.swift,
ios/App/Editor/CodeEditorEngine.swift, ios/Tests/EditorCaretPlacementTests.swift, ios/UITests/EditorCaretUITests.swift,
docs/how-it-works/editor.md, tools/site/how_it_works.py, tests/site_how_it_works_test.py, tests/site_test.sh). Also read,
for what the change leans on: the vendored Runestone `TextInputView` floating-caret code (Vendor/Runestone/Sources/
Runestone/TextView/Core/TextInputView.swift:1202-1236), `StringView` (the text is an NSMutableString),
`TextView.contentOffsetForScrollingToVisibleRect` (the viewport convention), ConsoleEditor's `onSelectionChange`,
CompletionPopover `selectionChanged`, UITests/KeyboardHelper.swift, project.yml's schemes. Paths are under pywidget/
unless they start with tools/ or tests/. HEAD was 8ed2580aa9 when I read it. Date: 2026-11-18.

What I ran (code reading and host tests only; no Xcode build or Simulator run):
- `python3 tests/site_how_it_works_test.py` in my copy: 58 passed, 0 failed, exit 0. It checks Mermaid well-formedness
  for 8 diagrams, not 9: `editor-2` is never checked (L5).
- `tests/run.sh site_test.sh` in my copy (its throwaway repo, 92.4 s): all tests passed, exit 0, including
  `app_parts_drawn`, which now counts diagrams through `h.drawn('.')`.

## What holds

- The second-tap fix is right for what it targets. `pointAtTouchDown` (CodeEditorEngine.swift:76) maps the point read
  after the system's sideways slide back to the offset at touch-down, and `placeCaret` (RunestoneEngine.swift:466) puts
  the offset back only when the tapped caret was in the text columns at that offset. The `Viewport` uses the same
  convention as Runestone's own `contentOffsetForScrollingToVisibleRect` (left inset plus gutter hidden), so the two
  agree on what "on screen" means.
- A selection is left alone (double tap's word, a drag, shift-click with a pointer): the `selectedRange.length == 0`
  guard runs in the async block, after the system has acted.
- iPad with a pointer: a click arrives as an indirect-pointer touch, the recognizer takes it, and the system's pointer
  click already lands at a character, so `placeCaret` is a no-op or the same answer. Two-finger scrolling sends no
  touches and does not touch `tapOffsetX`. I see no new behaviour there; not run.
- Right-to-left text: the offset math is direction-free, and `closestPosition`/`caretRect` are Runestone's (CTLine),
  the same calls the system's tap uses. The gutter is pinned left whatever the layout direction (Runestone's
  `LayoutManager` puts it at `viewport.minX`), which is what `Viewport` assumes. Untested (L4), not wrong as written.
- Zoom: Runestone's TextView does not zoom, so content and host coordinates share one scale. Display Zoom only changes
  the point size of the screen. No issue.
- VoiceOver focus: VoiceOver's single tap never reaches the app, and its double-tap activation was already a tap at the
  element's activation point that moved the caret to a word boundary; now it lands on the character there. Focus is
  untouched (the element is still `inputHost`, unchanged). One side effect: a tap now makes two selection changes
  (the system's, then ours), so `selectionChanged` can post two announcements and the first is stale; the second
  interrupts it. Low (L3).
- UI tests: no fixed sleeps. Every wait is a predicate (`wait`, `waitForExistence`); the press durations are gesture
  parameters. The keyboard tip is handled; the run is on a private Simulator through the runner. The 6...16 column
  window for 90 pt is tied to the 15 pt face at the default text size, which the runner's Simulator has.
- Mutants the tests do catch: the original word-end tap (first tap column at the string's end), the second-tap slide
  (EditorCaretUITests red on that mutant, per the commit), no offset restore (the second tap would land ~90 columns on),
  the trackpad not reaching the end, `floatingCaretCenter` losing Runestone's view name (the unit test asserts it is
  non-nil).

## Findings

### M1 (Medium): the touch-down capture, the heart of the second-tap fix, is tested only by a UI test the gate does not run

RunestoneEngine.swift:364 (`tapWatcher.touched` stores `contentOffset.x` when the finger lands) and :447-459
(`exactTapped` hands it to `pointAtTouchDown`). The land gate runs the PyWidgetTests unit bundle only; EditorCaretUITests
ran once on Idris's private Simulator. The unit tests check `pointAtTouchDown` as pure arithmetic and `placeCaret` with
the right offset handed in by the test, so these mutants stay green on the gate: `touched` set to a no-op; the offset read
inside `exactTapped` (at touch-up, after the slide, which is the bug Idris found); `before` dropped from the call. The
next refactor of this wiring can bring the 12-characters-left bug back with every gated test green.

Fix: split `exactTapped` into an internal `noteTouchDown()` (what `touched` calls) and `tapEnded(atHostPoint:)` (the
rest, including the async hop), and add one unit test to EditorCaretPlacementTests: `noteTouchDown()` at offset 1200;
set `contentOffset.x = 1290` and the selection to 170 (the system's slide and word end); call `tapEnded` with the point
read at the new offset (`p.x + 90`); await one main-queue turn; assert caret 163 and offset 1200. It must be red with
`touched` a no-op.

### M2 (Medium): wrapped lines are corrected sideways only; a vertical slide by the system's tap is not undone

RunestoneEngine.swift:364, :454 and :472-474; CodeEditorEngine.swift:76. Only `contentOffset.x` is captured, mapped and
restored. With wrapping on (every accessibility text size, RunestoneEngine.swift:256, and `fixedWrap`), a long token
(a long string literal, a URL) is broken across several rows. The system's tap snaps to the token's nearer end, which can
be several rows away, and Runestone scrolls that caret into view, here vertically, with the keyboard up and room for
only a few rows. `g.location(in: host)` is read after that scroll, so `y` is off by the slide and the caret goes to
another row; the restore puts back `x` only, so the text has slid under the finger. That is the reported bug on the y
axis, for the people who use the largest text. I worked this out from the code; no test runs wrapped, so it is neither
seen nor ruled out.

Fix: capture the whole `contentOffset` (CGPoint) at touch-down; `pointAtTouchDown` subtracts both axes; `placeCaret`
restores both when the tapped caret was visible at the old offset (`isVisible` gains a vertical check against
`adjustedContentInset.top/bottom`). Add the unit test above in a `RunestoneEngine(lineWrapping: true)` variant with
`contentOffset.y` slid by a few rows, and one EditorCaretUITests case launched at an accessibility text size
(`-UIPreferredContentSizeCategoryName UICTContentSizeCategoryAccessibilityL`) tapping mid-token.

### L1 (Low): `floatingCursorEnded`'s final follow never runs

RunestoneEngine.swift:497. Runestone's `endFloatingCursor` removes the FloatingCaretView and sets it to nil before it
calls the delegate (Vendor/.../TextInputView.swift:1230-1235), so `floatingCaretCenter` is nil and
`followFloatingCaret()` returns nil at once. A move inside the last frame before the finger <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> is lost (the caret is
one display-link tick behind). Small in practice, but the comment says otherwise. Fix: keep the floating caret's last
seen centre in `tick` and, in `floatingCursorEnded`, place at that if it differs from `floatingLast`; or remove the call
and say why. A unit test: `updateFloatingCursor`, then `endFloatingCursor` with no tick, then assert the selection.

### L2 (Low): main-thread cost while the space bar is held, and per tap

RunestoneEngine.swift:488-529 and :220. The display link ticks at the full refresh rate (120 Hz on ProMotion) for the
whole hold, and each tick scans every subview of the input host with `String(describing: type(of:))`, even when the
caret has not moved. Each move then sets `selectedRange`, and `selectionChanged` builds `textView.text as NSString`
before it knows VoiceOver is running: Runestone keeps an NSMutableString, so that is a copy of the whole document per
move (plus `engine.text` again in `CompletionPopover.selectionChanged` while a list shows). Before this change that ran
once per caret move; now it runs per trackpad frame and twice per tap. Fine for a few-KB script; measurable on a large
file. Fix: find the FloatingCaretView once in `floatingCursorBegan` and keep it weakly; set
`link.preferredFrameRateRange` to 30-60; in `selectionChanged`, return before building the text unless
`UIAccessibility.isVoiceOverRunning`.

### L3 (Low): one tap, two VoiceOver announcements

RunestoneEngine.swift:215-227 with :456-459. The system's word-end caret is announced, then ours. Fix: when `exactTapped`
is about to move the caret, mark the system's selection change as "edited" (`editedSinceSelection`-style flag) so only
the final caret is spoken; check with VoiceOver on a device during the TestFlight pass.

### L4 (Low): no test for right-to-left text, Dynamic Type sizes or a very long line

EditorCaretPlacementTests uses ASCII lines of 300 and 200 characters at the default size. Add: a line with a Hebrew or
Arabic string literal (assert `placeCaret` at a point inside the run returns an index whose `caretRect` is within one
character width of the point); a 5,000-character line (assert the tap and `offsetX(revealing:)` at its end, and time
`placeCaret`). `floatingMargin` (RunestoneEngine.swift:486) is 20 pt, "about two characters of the 15 pt face", but the
face scales with Dynamic Type up to 32 pt below the accessibility sizes (RunestoneEngine.swift:704), so at xxxLarge it is
about 1.5 characters: derive it from the theme font's advance (2 x the width of "0").
Also on very long lines: the trackpad only scrolls as far as the floating caret has gone past the edge, with no
autoscroll at the edge, so the slides needed grow with the line (the UI test allows up to ten 250 pt slides for 120
characters). It reaches the end, as claimed; a line of thousands of characters will take many slides. A product call
for Idris and Maren, not a defect.

### L5 (Low): the site test never checks diagram 9's Mermaid source

tests/site_how_it_works_test.py:58. The slug pattern `wf-src-([a-z-]+)` does not match `editor-2`, so the
well-formedness check runs for 8 diagrams (my run prints 8 "mermaid" lines) while line 52 counts 9. Fix: `[a-z0-9-]+`, and
assert the number of slugs checked equals `len(H.drawn(ROOT))`. Related: `drawn()` (tools/site/how_it_works.py:367) and
`build()` (:716) split only the `editor` part, so a `diagram:` line in any other part would be parsed and silently not
drawn; either split every part or refuse `diagram:` outside editor.md in the test.

## Verdict

PASS with findings. The tap and trackpad behaviour Idris claims is what the code does on unwrapped lines, the second-tap
fix is sound, and the how-it-works change keeps both suites that name it green on the host
(site_how_it_works_test.py 58/0, site_test.sh all passed). Two Medium findings go to Idris before
TestFlight: M1 (put the touch-down capture under a gated unit test, or the second-tap bug can return unseen) and M2 (the
same slide on the vertical axis for wrapped lines at accessibility text sizes). The Lows can ride with them or later.
{% endraw %}

</div>
