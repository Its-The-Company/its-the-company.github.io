---
layout: "default"
title: "T-0600 and T-0609 review: the Console&#x27;s Runestone editor (158ac8da; 2f7428c8, eed16935, bb612974, 814f3953)"
section: "documents"
description: "Run (iPad Air 11-inch (M4) Simulator, through tools/xc.sh, the same pair that flaked once in ADR-004 s7): -only-testing:PyWidgetUITests/SceneWindowsUITests -only-testing:PyWidgetUITests/ConsoleEditorUITests. 7 tests, 0\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0600-t0609-console-editor-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0600-t0609-console-editor-review-pernille.md</code></span></div><h1>T-0600 and T-0609 review: the Console's Runestone editor (158ac8da; 2f7428c8, eed16935, bb612974, 814f3953)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28. I read the five diffs (`git show`) and the files on main at
6f0508ff: `App/Editor/ConsoleEditor.swift`, `RunestoneEngine.swift`, `EditorWarmup.swift` (FirstFrame),
`LaunchProbe.swift`, `App/PyWidgetApp.swift` (IDEScene, ContentView), `ConsoleTextView.swift`, the UI tests that
query "editor", and the vendored Runestone `TextView.swift` and `TextInputView.swift`. I read ADR-004 s7 for the
measured figures and Maren's shot review for the colour values. I did not read the author's notes or memory. I
changed no code.

Run (iPad Air 11-inch (M4) Simulator, through `tools/xc.sh`, the same pair that flaked once in ADR-004 s7):
`-only-testing:PyWidgetUITests/SceneWindowsUITests -only-testing:PyWidgetUITests/ConsoleEditorUITests`.
**7 tests, 0 failures, 151.9 s** (ConsoleEditorUITests 3 in 44.0 s, SceneWindowsUITests 4 in 108.0 s), no runner
restart. Log `ops/runs/xcodebuild-20261028-194449.log` (logs are git-ignored; the totals above are copied from it).
The `word_count.py` miss in `-174000.log` did not come back in this run. One green run does not prove it gone.

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdicts, scrolls sideways" style="--tw:739px" markdown="1">

| Group | Commit(s) | Verdict |
| --- | --- | --- |
| T-0600: engine after the first frame | 158ac8da (T-0586) | **Approve with fixes** (M1; L1, L2) |
| T-0609: AX soft wrap | 2f7428c8 (T-0604) | **Approve with fixes** (M2) |
| T-0609: token grounds, console 13 pt | eed16935 (T-0605) | **Approve** |
| T-0609: gutter and line <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitch</span> | bb612974 (T-0606) | **Approve** (T-0610 already covers the AX number placement) |
| T-0609: 2:1 split | 814f3953 (T-0607) | **Approve with fixes** (M3; L3) |

</div>


None of these crashes, loses typed text, or gives App Review a reason to reject. Nothing here <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the alpha
build. M3 is the one alpha testers will notice first, so I set it at P1. The other two Mediums are P2.

Fix lines for Idris: T-0611 (M3, P1), T-0612 (M1, P2), T-0613 (M2, P2).

## T-0600: 158ac8da, the engine after the first frame

### The coordinator's states, checked one by one

- **No engine yet** (`engine == nil`, from `makeUIView` until `build()`). `sourceChanged()` returns early
  (ConsoleEditor.swift:58) and `show` returns early (:82). Nothing is queued, and nothing has to be:
  `build()` opens `model.source` as it stands when it runs (:77). So a `SceneFile` or example that lands before
  the engine exists is not lost, and only the latest text is opened. Correct.
- **First open in flight** (`engine` set, `opening` set, view not in the container). An `updateUIView` in this
  span sees `model.source != engine.text`, because the engine is still empty, and calls `show`, which only sets
  `queued` (:83). When the open lands, `queued` is dropped if it equals the opened text (:98). So the routine
  SwiftUI updates during launch (console "ready", the run state) do not cause a second parse. `onChange` fires
  from inside `open` (RunestoneEngine.swift:96) while `opening` is still set, so the opened text is not echoed
  back into the model. Correct.
- **The view joins after the first open.** `addSubview` runs once, guarded by `superview == nil` (:89). The
  frame comes from `container.bounds` with flexible width and height, which also works if the bounds were still
  zero. The view is not in a window during the first open, so it cannot be first responder, and no key can reach
  the empty engine. That closes the first-open window that T-0587 (my T-0584 F2) describes. T-0587's
  "unit-test typing during a slowed open" half is still not done. Ines can close T-0587 or narrow it to that test.
- **Later opens, latest wins.** One open at a time, the newest request in `queued`, and a re-check against
  `model.source` after each open (:96-101). It ends after at most one more open (same argument as T-0584).
  Keys typed during a later open are still replaced by the file. A later open only follows a menu choice, so
  this is the narrow case T-0587 already holds.
- **A second iPad window.** Each window has its own coordinator, container and engine. `FirstFrame.wait()` is
  app-wide (EditorWarmup.swift:66-76): in a second window it returns after two refreshes, because a key window
  already exists. The second window's engine is built as that window appears (see L2). Nothing crosses between
  windows. The iPad run above is green.

### M1, Medium (P2): the probe stops the first-open clock before the text can be on screen

ConsoleEditor.swift:88 calls `LaunchProbe.openDone()` before the engine's view joins the container (:89-93).
Runestone typesets the visible lines when the view is laid out in the window, and that layout comes after the
stamp. If the view's traits change when it joins the window (dark mode, an AX text size), the trait handler
rebuilds the theme and the wrap layout (RunestoneEngine.swift:75-79). That work is outside the stamp too. The
stamp at the other end is late as well: `first_frame_ms` is taken one display refresh after the frame was
committed (EditorWarmup.swift:65-71), so the blank editor has been on screen for a refresh before the clock
starts.

**Failure scenario.** ADR-004 s7 says "the highlighted text appears when the first open lands, 83.3-195.2 ms
after the frame". The person's empty editor area actually lasts from the committed frame until the frame that
draws the text. That span is the reported one plus about two refreshes plus the in-window layout. The 300 ms bar
in s8.5 is a gate, and T-0479 will re-measure on the device with the same probe. The figure is probably still
under 300 ms (195.2 + ~40), but nobody has measured the span the ADR describes.

**Fix.** Stamp `openDone` after `addSubview` and `container.layoutIfNeeded()`, on the next display tick (or in a
`CATransaction` completion). Keep the current stamp as a second field (`first_open_parsed_ms`) so the five runs
in `launch-probe-2026-10-28.jsonl` stay comparable. Re-run `launch_probe.sh 'iPhone 17e' 5`, once at Large/light
and once at AX5/dark, and correct the s7 sentence.

### L1, Low: the blank span shows the wrong ground and no element

`container` (:36) has no background, so for those 83-195 ms the editor area shows the screen's `bg.canvas`
(after T-0605: #0A0C13 dark, #F7F5F0 light). Then it switches to `bg.editor` (#0E1120, #FCFBF8) with the gutter.
The step is small (1.04:1), but it is the first thing on the screen to change. VoiceOver finds no element there,
and a tap in that area does nothing. **Fix:** give `container` the editor ground (the same dynamic colour
`EditorTheme` resolves for `.syntaxBg`, or the asset), so only the text arrives.

### L2, Low: `start()` holds the coordinator and waits on any window

The Task in `start()` (:51-54) captures `self` strongly. A window closed before the first frame still builds an
engine (~50 ms of main thread) for a coordinator nobody holds. In a second iPad window the wait is two refreshes
long, not "after this window's first frame", so that window still pays for the build while it appears. Both are
harmless today. **Fix:** `[weak self]` with a guard. Optionally, wait until `container.window` is set and a
refresh has passed.

## T-0609: 2f7428c8 (T-0604), soft wrap at AX sizes

**What holds.** `applyWrap` runs at init and in the trait handler that was already registered for the text size
(RunestoneEngine.swift:72, :75-79, :187-190), and it sets the property only on a change. The vendored setter
(TextInputView.swift:474-486) invalidates lines and re-lays out. It does not touch the selection (an NSRange into
the text) or the first responder, so **the caret's position in the text and the selection are kept**, and the
keyboard stays up. The <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> bench still passes a fixed `Bool`. The probe view exists only with
`-ui-editor-probe`. The two UI tests are sound for what they test.

### M2, Medium (P2): the live toggle is untested and keeps a stale scroll offset

Both UI tests set the text size with a launch argument, so the live path ("AX on and off while editing") never
runs in a test. Reading that path: after the content size changes, vendored TextView.swift:1349-1355 puts back the
old `contentOffset`, and nothing scrolls to the caret after the toggle.

**Failure scenario** (from the code, not reproduced). At Large, a person scrolls right along a long line
(`contentOffset.x` about 200 pt), raises the text size to AX1 from Control Center while editing, and comes back.
Wrap turns on and the content width becomes the view's width, but the offset stays at 200 pt. The gutter and the
first 200 pt of every line sit off the left edge until they drag. Wrapping also makes the lines above the caret
taller, so the caret's line can now be below the visible area. They type and see nothing move. Going back down to
Large is the reverse: the caret can end up off to the side.

**Fix.** In `applyWrap`, after a change: when wrap turns on, clamp `contentOffset.x` to `-contentInset.left`.
While editing, scroll the selection into view (`textView.scrollRangeToVisible(textView.selectedRange)`). Add a
hosted unit test that sets `textView.traitOverrides.preferredContentSizeCategory` from Large to AX1 and back on a
live, first-responder engine with a selection. It should assert that `selectedRange` is unchanged, the engine is
still first responder, `contentOffset.x` is within the content, and the caret's rect is inside the visible rect.

## T-0609: eed16935 (T-0605), token grounds and the console face

Approve. The screen and the placeholder sit on `bg.canvas` and the console on `bg.console`
(`ConsoleTextView` is `.clear`, ConsoleTextView.swift:19, so the ground shows). The rule is one device pixel and
hidden from VoiceOver. The console face is 13 pt on `.subheadline`, with the 32 pt clamp kept (:12, :42). The
"truncation" identifier moved inside a VStack and kept its value.

## T-0609: bb612974 (T-0606), gutter and pitch

Approve. The 8/8/8 gaps and the multiplier are set once at init. The multiplier is a ratio computed from the
15 pt face, and Runestone applies it to the scaled face, so the pitch scales with Dynamic Type as the comment says.
The UI test numbers moved by exactly the 18 pt of new gaps (571 to 589). The AX line-number placement is T-0610.

## T-0609: 814f3953 (T-0607), the 2:1 split

**What holds.** `split` is total and monotone. The new unit test covers editor + console = h, editor >= console,
and negative heights. A GeometryReader between the banner and the frames line gives the editor and console the
height between them. With no keyboard, rotation on iPad is fine: iPad Air 11 in landscape leaves about 600 pt,
which splits about 400/200. Split View and Stage Manager windows keep the rule. Maren's re-check measured 0.666
on all four shot sizes.

### M3, Medium (P1): with the keyboard up, the editor shrinks under the caret

PyWidgetApp.swift:542-546 and :556-576. ContentView avoids the keyboard (no `.ignoresSafeArea(.keyboard)`), so
the GeometryReader shrinks when the keyboard comes up, and below 320 pt the rule shares the height evenly.

**Failure scenario** (arithmetic and code reading, not reproduced). iPhone 17e in portrait, `tip_splitter`
open. Without the keyboard the editor is about 410 pt, roughly 18 lines at the 22 pt pitch. The person taps
line 12, about 264 pt down. Runestone scrolls the caret into view for that tap (TextView.swift:1496-1499), but
that happens before the keyboard rises. The keyboard and key row (about 380 pt) shrink the shared height below
320 pt, and the editor gets about 135 pt, roughly 6 lines. The vendored TextView has no keyboard or frame-change
handling, and neither does ConsoleEditor, so the caret's line is now below the editor's bottom edge, behind the
console. They type <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> in the screen's main flow. The editor also drops below the 160 pt it had before this
commit, while half the height goes to the console. iPhone landscape is allowed (Info.plist lists orientations only
for `~ipad`), and there the keyboard leaves under 100 pt, so the editor gets 1-2 lines. iPad with the software
keyboard in landscape also falls below 320 pt.

**Fix.** Let `split` know whether the editor is editing (`split(_:editing:)`). While it is, the console gets a
small floor (for example 88 pt, enough for the last two output lines) and the editor gets the rest. When the
editor's frame changes during editing, scroll the selection into view: a `revealSelection()` on
`CodeEditorEngine`, called from the container's `layoutSubviews`, or from the engine when its bounds height
changes. Unit-test `split(h, editing: true)`. Add a UI test on iPhone that taps a line in the lower half of the
editor and, once the keyboard is up, checks that the caret's line is still inside the editor's frame.

### L3, Low: the truncation note eats a fixed console

The note now sits inside a console of fixed height (:567-576). At AX5 the caption runs 2-3 lines, which can fill
most of a 135-160 pt console and leave the output a sliver. **Fix:** <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> the note at one line with a tail
truncation and the full text in its accessibility label. Or keep it outside the split, as the banner is.

## UI test identifiers

None of the five commits moved one. For each commit I compared the `accessibilityIdentifier` values on its removed
and added lines. 158ac8da: "editor" moved from the returned view to `engine.view`. That is the same element the
tests query, because `AccessibleTextView` forwards the identifier to Runestone's input view. eed16935 and
814f3953 each only moved "truncation" (same value). 2f7428c8 added "editor.layout", and only behind
`-ui-editor-probe`. bb612974 changed no identifiers. Every test that looks for "editor" waits for it
(`waitForExistence`, 10-30 s), so the later engine does not make them race.

## Fix lines

Added before "## Home" for Idris: **T-0611** (M3, P1), **T-0612** (M1, P2), **T-0613** (M2, P2). L1 and L2 are
optional items on T-0612, and L3 is an optional item on T-0611. They are not separate lines.
{% endraw %}

</div>
