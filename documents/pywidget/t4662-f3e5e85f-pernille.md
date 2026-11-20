---
layout: "default"
title: "Re-review of T-4662 at f3e5e85f: the answers to M1 and M2 (T-4887, T-4888)"
section: "documents"
description: "PASS with findings. Both answers do what the first review asked: the touch-down capture is under two gated unit tests that UIKit&#x27;s own path reaches (M1 there), and a wrapped tap&#x27;s vertical slide is taken back on both\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4662-f3e5e85f-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4662-f3e5e85f-pernille.md</code></span></div><h1>Re-review of T-4662 at f3e5e85f: the answers to M1 and M2 (T-4887, T-4888)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5298, Commandment 13). Author: Idris. First review: docs/reviews/t4662-8ed2580a-pernille.md
(T-4876, at 8ed2580aa9). Reviewed: `git diff 8ed2580aa9..f3e5e85f55` on ios/App/Editor/RunestoneEngine.swift,
ios/App/Editor/CodeEditorEngine.swift and ios/Tests/EditorCaretPlacementTests.swift (commits 4d0b5a7eb0 T-4887,
844ef71f3f T-4771/T-4783, f3e5e85f55 T-4888), plus ios/Tests/mutants-t4887.json, ios/Tests/mutants-t4888.json,
ops/runs/t4887-mutants.txt and ops/runs/t4888-mutants.txt. Also read, for what the restore meets: Runestone's
`KeyboardObserver` and `TextView.keyboardObserver(_:keyboardWillShowWithHeight:)`, and the editor's
`layoutSubviews` reveal on a height change (T-0611). Nothing after f3e5e85f55 touches the three files (the one later
editor commit, e20f8c3ba5 T-0048, changes ConsoleEditor.swift only). Paths are under pywidget/ unless they start with
ops/ or tools/. The 844ef71f3f hunks in the range (the gutter marks' one text copy) are T-4771's, not part of this
review. Date: 2026-11-20.

What I ran:
- EditorCaretPlacementTests, the whole class, on the MacBook runner: `XC_TASK=T-5298 tools/xc.sh test -only-testing:
  PyWidgetTests/EditorCaretPlacementTests` at 2d9c651f (same code in these files as f3e5e85f55), job
  J-20261120-0658-xc-test. Result: passed, exit 0,
  16 executed, 0 skipped, 0 failures, 1537.0 s (the class's 16 tests, including both T-4887 cases and the wrapped T-4888
  case). I did not re-run the mutants.
- A scratch `swiftc` probe outside the repository: `EditorCaretScroll` copied from CodeEditorEngine.swift at f3e5e85f55
  with my own main.swift (a 390 x 600 viewport, a caret 590...608 pt down, the bottom edge at 600). The x-only check
  of 8ed2580a says visible (`true`); the both-axes check of f3e5e85f says not visible (`false`). That is M1 below.

## What holds

- M1 of the first review is answered as asked. `exactTapped` now only reads the point and hands it to
  `tapEnded(atHostPoint:)` (RunestoneEngine.swift:469); the watcher's `touched` calls `noteTouchDown()` (:366, :459).
  `testTheTapsDelegateNotesTheTouchDown` reaches the touch-down through the tap's delegate, as UIKit does, so the
  wiring I said could break unseen (`touched` a no-op) is now red on the gate; the direct test covers the rest.
- The point mapping is right on both axes (CodeEditorEngine.swift:77). On an unwrapped line the system's tap slides
  sideways only, `offsetNow.y == before.y`, and the point is exactly what 8ed2580a computed. A vertical change between
  touch-down and touch-up on an unwrapped line (the keyboard rising on a first tap) is now taken back too, which is
  more correct, not less.
- Selections are still left alone: the `selectedRange.length == 0` guard (:485) runs before any restore, on the turn
  after the system acts, so a double tap's word (the second tap ends the single-tap recogniser again, but the guard
  returns nil), a drag, and a tap inside a selection that keeps it are all untouched. `testATapLeavesADoubleTapsWord
  SelectionAlone` still covers it.
- A deliberate scroll does not reach the restore. A pan's touch-down does note `tapOffset`, but the tap fails, so
  `tapEnded` never runs, and the next real tap's touch-down overwrites the stale value before it can be used. A tap
  that stops a deceleration notes the offset at the touch, and the scroll view stops there, so the restore moves the
  text by at most a frame's drift, back to where the finger stopped it.
- The keyboard on a first tap. Runestone scrolls the selection into view on keyboard-will-show, and the editor reveals
  the caret again when its height shrinks (`layoutSubviews`, T-0611). If the height has shrunk by the time the async
  restore runs, `isVisible` judges the old offset with the new height and refuses a restore that would put the caret
  under the keyboard; if it has not, the restore is harmless and the later reveal brings the caret up. Either way the
  caret ends on screen. Read, not run.
- The vertical restore never moves the caret off the row touched. It only ever puts back the offset the finger saw,
  and only when the placed caret (which is the character under the finger at that offset) was wholly on screen there,
  so after it the caret is under the finger by construction. When it does not fire, the caret is still on the right
  character (the point is mapped either way); only the text may stay slid (M1).
- The mutants fail for the right reasons, as far as the records show:
  - T-4888 (ops/runs/t4888-mutants.txt carries each failure's message): M1, `y` not taken back, fails on the caret
    (535 expected, 609 got, three rows down) and the pure test's point 60 pt low; M2, `y` lost at touch-down, fails on
    the caret (59: a short line far above, as `y - offsetNow.y + 0` predicts); M3, x restored only, places the right
    caret and fails on offset y (736.7, not 683.0: 53.7 pt is three 17.9 pt rows), which is the slide; M4 fails on
    "under the top inset" judged visible. Each is the assertion I would expect, and none is a set-up failure (the
    wrapped test's set-up asserts all say "set-up:", and none of the four messages is one). The control is green.
  - T-4887 (ops/runs/t4887-mutants.txt records counts only): M1a killed by the delegate test only, which is right
    (the direct test calls `noteTouchDown` itself); M1b, M2 and M3a leave the point unmapped, so the caret lands about
    ten characters right of 163 and both tests fail; M3b maps the point but restores nothing, so only the offset can
    fail. The counts fit those reasons; the messages are not recorded (L2).
- The wrapped test's set-up is careful where it needs to be: it lays the token out before it trusts a point on it,
  and it asserts the finger is inside the token, on the row it reads, and on screen, before it acts. A set-up that goes
  wrong fails red with "set-up:", it cannot pass by accident. The earlier red rounds (946, 1246) are recorded.

## Findings

### M1 (Medium): a second tap on a row partly off the top or bottom edge no longer puts the text back sideways

RunestoneEngine.swift:490-492 with CodeEditorEngine.swift:119-123. The restore is now all or nothing on one combined
check: the caret must be wholly inside the text columns at `before.x` and wholly between the top and bottom insets at
`before.y`. At 8ed2580a only the columns were checked. So on an unwrapped long line, a second tap on a row that is
partly hidden (the last row above the keyboard or the Console split, which at any scroll position other than an exact
row boundary is cut, or the first row under the top) goes like this: the system's tap puts its caret at the word's
far end and scrolls right (and down, to show the cut row); `placeCaret` puts the caret on the right character; the
both-axes check says "not visible" because the row was cut at `before.y`; nothing is restored, and the text stays
slid sideways under the finger. That is the reported second-tap bug back, on the rows people tap when they reach for
the end of what they can see. My probe shows the two checks disagree on exactly that rect (x-only `true`, both-axes
`false`). No test has a cut row: the unwrapped tests run at the top of the text, the wrapped test 200 pt down.

Fix: decide the two axes separately. Put `x` back when the caret's columns were on screen at `before.x` (8ed2580a's
rule); put `y` back only when its row was wholly on screen at `before.y`, and otherwise leave the system's vertical
scroll, which revealed the cut row. Test: the `secondTap` set-up with `contentOffset.y` set so line 1's caret rect
straddles the top of the visible rows (or a line straddling the bottom), then the slide to 1290; assert caret 163 and
offset x 1200. Mutant: the combined check as it is now; it must be red.

### L1 (Low): the end-to-end wrapped tap is still unseen

The first review's M2 fix asked for one EditorCaretUITests case at an accessibility text size tapping mid-token; it
was not added. The unit test applies the system's slide by hand (three rows, one direction, up). Whether the system's
tap on a wrapped token really slides vertically, by how much, and whether the restore then holds on a Simulator, nobody
has seen. Fix: add the UI case (`-UIPreferredContentSizeCategoryName UICTContentSizeCategoryAccessibilityL`, a tap in
the middle of a token wrapped over five rows, assert the caret's character and that the token's row is under the tap
point), or check it by hand on the TestFlight pass and record it. Already on the board as T-5093 (Idris, the UI case); no
new line.

### L2 (Low): the T-4887 run record has no failure messages

ops/runs/t4887-mutants.txt records "2 listed failing" per mutant but not which assertion failed, unlike the T-4888
record. A <span title="A test written in advance. If it fires, we drop the idea.">kill</span> by a set-up assertion or a crash would look the same. I read the code and the counts fit the right
reasons, but the record should show it. Fix: add the `xc.sh` why lines for M1a-M3b (they are on the runner's job
records), as t4888-mutants.txt does.

### L3 (Low): the restore can set an offset outside the scroll view's limits

RunestoneEngine.swift:492. `before` is whatever the offset was at touch-down. A tap while the text is still bouncing
back from a flick to the top or bottom (or sideways at a line's end) notes an offset past the limit, and `contentOffset
= before` puts the text back there, where it stays, with a gap above the first line, until the next scroll. This was
possible on x at 8ed2580a; on y it is much more common, since a flick to the top bounces. Fix: clamp the restored
offset to the limits (`Viewport` has `minX`/`maxX`; add `minY = -insetTop` and `maxY = max(contentHeight - height +
insetBottom, -insetTop)`), with a pure test.

### Not changed by these commits

The first review's L1 (the trackpad's last frame), L2 (main-thread cost while the space bar is held), L3 (two
VoiceOver announcements per tap) and L4 (no right-to-left or very long line test) are in code these commits did not
touch; they stand as written there.

## Verdict

PASS with findings. Both answers do what the first review asked: the touch-down capture is under two gated unit
tests that UIKit's own path reaches (M1 there), and a wrapped tap's vertical slide is taken back on both the point and
the offset (M2 there), with mutants that fail on the assertions I would expect. EditorCaretPlacementTests is green on
the runner (16/0). The vertical restore never pulls the caret off the row touched. One Medium goes to Idris before
TestFlight: M1, the combined visibility check means a second tap on a row cut by the top or bottom edge no longer puts
the text back sideways, which is the reported bug on those rows; decide the axes separately. The Lows can ride with it
or later; L1 is T-5093.
{% endraw %}

</div>
