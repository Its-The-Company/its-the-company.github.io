---
layout: "default"
title: "T-0759: review of 1a83993f (T-0758, caret test and the minimized keyboard)"
section: "documents"
description: "Verdict: the change does what it says. It does not make the test pass vacuously, and the mutant fails. But the test never compares the caret with the keyboard. In landscape a caret behind the keyboard passes. That gap\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0758-caret-keyboard-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 9 · Fri Oct 30</span><span><code>pywidget/docs/reviews/t0758-caret-keyboard-review-pernille.md</code></span></div><h1>T-0759: review of 1a83993f (T-0758, caret test and the minimized keyboard)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-30. Read: `git show 1a83993f`, board line T-0759,
`pywidget/ios/UITests/ConsoleEditorUITests.swift` around the test, the console screen's split
(`App/PyWidgetApp.swift` `ContentView`). Simulator: iPhone 17e.

Verdict: the change does what it says. It does not make the test pass vacuously, and the mutant
fails. But the test never compares the caret with the keyboard. In landscape a caret behind the
keyboard passes. That gap was there before this commit, and it is the bug this test exists for. One Medium, so no tick yet:
fix line T-0761 for Idris.

## Mutant

`.ignoresSafeArea(.keyboard)` on the console screen's VStack in `ContentView`, which turns off the
editor's keyboard inset. Only this test ran, through `tools/xc.sh`. Both runs were reverted, and
`git diff -- pywidget/ios` is empty.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Mutant, scrolls sideways" style="--tw:1234px" markdown="1">

| Run | Simulator state | Path taken | Result | Log |
|---|---|---|---|---|
| Mutant | warm (left un-minimized by the 02:23 suite) | keyboard up after the tap | **failed**: "the editor never settled above the keyboard" | ops/runs/xcodebuild-20261030-024811.log |
| Mutant | fresh boot | minimized, un-minimize step | **failed**, 3 failures: "stayed minimized", "changed the document" (app unresponsive about 33 s, snapshots retried), "never settled above the keyboard" | ops/runs/xcodebuild-20261030-025040.log |
| Clean | fresh boot | minimized, un-minimize step | passed | ops/runs/xcodebuild-20261030-025400.log |

</div>


For the fresh-boot runs I added two temporary `print` lines with the keyboard frame. They are reverted.
They give these frames: portrait keyboard (0, 560, 390, 226); landscape keyboard (75, 210, 694, 177).

## Findings

**M1 (Medium, pre-existing, not from this commit): no assertion ties the caret to the keyboard.**
`checkCaretInEditor` checks the caret against the editor's frame and the console. The only check on
keyboard avoidance is the portrait settle condition, "editor bottom < resting bottom". Under the
mutant, the landscape half had the caret at y 244 to 262 and the keyboard's top at y 210. The caret
was behind the keyboard, and the landscape `checkCaretInEditor` raised no failure. In portrait the
tap row (y 503) sits above the keyboard (560). So a portrait regression only gets caught if the
editor does not shrink at all. A partial inset passes: wrong frame, the ReplBar's height only, or
anything that leaves the editor's bottom between 560 and 591. So does a landscape-only regression.
Fix: in both orientations, assert `caretBottom <= keyboard.frame.minY` and `editor bottom <=
keyboard.frame.minY`, using the on-screen keyboard frame. The probe and XCUI frames share
coordinates: portrait 455 against 560, landscape app frame 844 x 390 against a probe top of 78. Then
rerun the mutant above. It should fail in landscape too, not only at the portrait settle.

**L1 (Low): "the caret ends where it was" is assumed, not checked.** This file's own T-0565 note
says the Simulator can drop the first hardware key after a launch. If Left drops, Right moves the
caret from the line's end to the start of the next line. "x" and DEL then leave the text unchanged,
so the guard passes with the caret one line lower. The later asserts never compare the caret with
the tapped line, so this cannot cause a false pass (a lower caret is harder to keep visible). The
comment overstates what happens, though. Either check caretTop is unchanged across the step, or
soften the comment.

**L2 (Low, info): the un-minimize step's edit scrolls the caret by itself.** Typing "x" and DEL is a
text change, and the engine reveals the selection on it. Then the keyboard rises, so the resize path
still runs after it. The test's docstring already says the caret checks pass with `revealSelection`
off, and EditorGateTests covers `revealSelection`. No new hole, but in the un-minimize path the
caret's position owes something to the edit as well as to the keyboard.

**L3 (Low, info): CI runs the Simulator path, not the device path.** On a fresh boot (the full
suite at 02:23, and my clean run) the test takes the un-minimize branch. A user's tap that raises
the keyboard is only exercised when the Simulator happens to be warm. That is fine as long as M1's
asserts hold on both paths. The branch is printed but not recorded in the result.

Q2 answered: the step cannot pass vacuously. If no keyboard of real height appears, the 10 s
`wait` fails, as the fresh-boot mutant run shows. It cannot change the document either: the text
guard catches a dropped "x" or DEL. It can move the caret one line (L1). It also adds an undo step
and an edit, and no later assert reads either. The rotation check moving from `exists` to on-screen
height over 100 is an improvement: a minimized keyboard used to satisfy it.

## Re-review of 0101715f (T-0763, Idris's fix for M1)

Reviewer: Pernille, 2026-10-30. Read: `git show 0101715f`, `ConsoleEditorUITests.swift` (the wait,
settled, onScreenKeyboardHeight and settledKeyboard helpers, and the test), the probe
(`App/Editor/ConsoleEditor.swift` EditorLayoutProbe), `ContentView` and `ReplBar`, and the logs
025844 (fresh boot, clean), 030109 (mutant, warm), 030250 (bare suite), plus my own fresh-boot mutant
log 025040. No Simulator re-run: the logs support every claim. `git diff -- pywidget/ios` is empty.

Verdict: M1 is fixed. No High or Medium. Three Lows, none blocking.

**Check 1, coordinates: same space in both orientations.** The probe converts to the window
(`convert(_, to: nil)`, ConsoleEditor.swift:166-169). On iPhone the window is the screen, and XCUI
reports frames in the interface orientation. The logs tie the two together at shared edges. In
portrait the probe's editor bottom 455 equals the XCUI console's minY 455. In landscape the probe's
bottom 166 equals the console's minY 166, its width 750 equals the console's width, and the console's
maxY 210 equals the keyboard's minY 210 (030250:11378, :11401). The test is phone-only, so iPad
Stage Manager windows never reach it.

**Check 2, settledKeyboard (ConsoleEditorUITests.swift:156-165): no stale or off-screen pass, no
hang.** It needs three equal reads and more than 100 pt of keyboard on screen, so the minimized
frame (0, 861, ...) cannot satisfy it. `wait` is capped at 15 s, and if it times out it records a
failure, so a null or unsettled `f` cannot let the run go green. It comes after `settled(probe)`, so
the keyboard has already stopped moving. The whole test took 34 s in the bare suite and 79 s on the fresh-boot
path, and neither run failed.

**Check 3, mutant: killed in both orientations.** 030109 has four failures: the portrait settle, then
portrait "editor runs behind the keyboard" 591 > 560 (:8583), landscape "caret is behind the keyboard"
262 > 210 (:8607) and landscape editor 282 > 210 (:8608). Portrait has no caret failure because the
tapped line (503) sits above 560, and the editor assert catches it. That run took the warm path. The
fresh-boot path under the same mutant (my 025040, old code) laid out identically: portrait bottom 591,
landscape caret 244-262 and bottom 282 (025040:8584, :8602). So the new asserts fail on that path too.

**L1 (Low): in portrait the XCUI keyboard frame starts 17 pt below where the app's layout stops.**
Clean runs: the console (the last view above the keyboard, since ReplBar is empty with no
`input()` pending) ends at 455 + 88 = 543, but the keyboard element's minY is 560 (030250:11378). In
landscape they agree (210). So the new asserts at ConsoleEditorUITests.swift:176 and :178 leave a
17 pt band in portrait, 543 to 560, where a caret or editor bottom passes. That is less than one
line (18 pt). Today's layout sits 105 pt clear of it, and the mutant overshoots by 31 pt. Optional
hardening, if a regression ever lands in that band: have the probe report
`keyboardLayoutGuide.layoutFrame.minY` in window points, and assert against the smaller of the two.

**L2 (Low): settledKeyboard tests the height on a second snapshot, not on the `f` it returns**
(ConsoleEditorUITests.swift:162). If the frame changed between the two reads, the check would pass on
the new frame while returning the old one. It cannot happen here, because raiseOnScreenKeyboard
already required the keyboard up. `f.intersection(app.frame).height > 100` closes it in one read.

**L3 (Low, nit): line 133 is 148 characters**, longer than the rest of the file (one other line
reaches 124). The L1 comment from my first review is now accurate.

Tick T-0763 and T-0759.
{% endraw %}

</div>
