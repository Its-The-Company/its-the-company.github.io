---
layout: "default"
title: "T-0584 review: 5ac90a05 (T-0565 slice 1, the Console edits in the code editor engine)"
section: "documents"
description: "Approve with fixes (F1 P2, F2 P3, F3 P3). The binding between the engine and ConsoleModel.source is correct. I found no lost edit after the first open, no loop, and no crossing between windows. The fixes are a launch\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0565-console-editor-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0565-console-editor-review-pernille.md</code></span></div><h1>T-0584 review: 5ac90a05 (T-0565 slice 1, the Console edits in the code editor engine)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28. I read it from `git show 5ac90a05` and the files on main at
e509ddef. I did not read the commit message or the author's notes. I also read the vendored Runestone source in
`~/.cache/pywidget/editor-src/runestone` (TextInputView, TextViewState) and ADR-004 s7 (T-0460, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 7).
Run (iPhone 17e Simulator, through `tools/xc.sh`): `ops/runs/xcodebuild-20261028-164937.log`.
`PyWidgetUITests/ConsoleEditorUITests` passed (1 test, 19.5 s), and `PyWidgetTests/WidgetPlacementTests` ran in the
same run. Its select-all resend fired once: `T-0565 RESEND select-all attempt 1: 59 of 60`. I changed no code.

## Verdict

**Approve with fixes** (F1 P2, F2 P3, F3 P3). The binding between the engine and `ConsoleModel.source` is correct.
I found no lost edit after the first open, no loop, and no crossing between windows. The fixes are a launch cost
that nobody has measured in the configuration we ship, a small window at launch where typing is dropped, and a
test gap on the on-screen keyboard's delete key. None of them changes what a person sees in the common case, so
none of them <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> TestFlight. F1 needs numbers before the App Store.

Fix lines for Idris: T-0586 (F1, P2), T-0587 (F2, P3), T-0588 (F3, P3).

## What I checked and found sound

- **No loop.** Edits go from the engine to the model only when no open is in flight and the texts differ
  (ConsoleEditor.swift:45). Changes go from the model to the engine only when they differ (:24, :60).
  `open` cannot come back unequal: `TextViewState(text:)` keeps the string verbatim
  (`StringView(string: NSMutableString(string: text))`), and `setState` swaps it in without rewriting line
  endings. So the re-check after an open (:59-60) ends after at most one more open.
- **Every edit reaches the model.** In the vendored TextInputView, typing, `replace(_:withText:)` (find and replace),
  batch replace, Writing Tools replacements and committed marked text (IME) all end in `textInputViewDidChange`.
  That calls `RunestoneEngine.changed()` and then `onChange`. I found no edit path that would leave
  `model.source` stale, so Run never runs old text.
- **Windows.** Each scene gets its own `ConsoleModel` (SceneFile.swift:47-58), and each `ConsoleEditor` makes its
  own coordinator and engine. No two engines share a model, so typing in one window cannot reopen another.
- **Where "latest wins" matters.** `source` is set from outside only when a model is made (`ConsoleModel.open`,
  PyWidgetApp.swift:232, called from SceneFile.swift:52 before the view exists). In practice the queue only
  covers the first open. It is correct for that case and safe if a later slice adds "open example".
- **Example runs.** `BundledExamples.runSource` compares the editor text with the example text. Because open is
  verbatim, an unedited example still runs from the bundle file.

## Findings, by severity

### F1 (P2): the first engine is now built cold inside the first frame, and nobody has measured that

- `makeCoordinator` (ConsoleEditor.swift:12) builds a `RunestoneEngine` synchronously (:38) during the first
  layout of ContentView. That is before the first frame is committed. The normal-launch `EditorWarmup` is gone
  (PyWidgetApp.swift:45).
- ADR-004 s7 measured the warm-up's engine build at 72.9-166.8 ms on the main thread, on the Simulator. The first
  measure put the cold "engine+view" phase at 92-253 ms. That time used to come after the first frame. Now it
  comes before it, on every launch.
- The reason given for dropping the warm-up is right: a warm-up would build a second engine that nothing shows.
  What changes is the number <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> reports. Its cold-open median of 54.8 ms was measured after a warm-up. The bench
  still schedules one under `-editor-bench` (PyWidgetApp.swift:38).
- So the G1 verdict now describes a launch the app no longer has. Its numbers no longer describe the
  Console's first open, which is the only cold open in the shipped app and the first thing a person sees.
- The ADR's own first-measure numbers set the worst case: 253 ms (engine+view) + 31 ms (parse) + 19 ms
  (setState) = 303 ms. G1's bar is 300 ms.
- **Fix (T-0586):**
  - Measure the configuration we ship, five runs: process start to first frame, before and after this commit,
    plus the Console's first open, with no warm-up. Use the bench with its warm-up off for this case. Repeat on
    the device in the T-0479 recheck.
  - Write the numbers and the dropped warm-up into ADR-004 s7 under ruling 7. That ruling's lead 3 was a chair
    item, and only a recorded decision counts.
  - If either number is over its bar, keep the build after the first frame. One way: `makeUIView` returns a
    container, and the engine goes into it after `FirstFrame.wait()`.

### F2 (P3): typing during the first open is dropped without a sign

- While `opening != nil`, `onChange` does not write to the model (ConsoleEditor.swift:45), and the engine still
  shows its previous text. At launch that is an empty, editable view.
- A key typed in that window (parse 13.5-31 ms, plus the cold Tree-sitter load) goes into the empty text. Then
  `setState` replaces it with the file. The keystroke is lost, and nothing on screen says so.
- The window is short, and it occurs only at launch. That is why this is P3.
- **Fix (T-0587):** keep the engine view from taking input until the first open lands. For example, set
  `isUserInteractionEnabled` to false in `makeUIView` and set it back in `show`'s completion. Add a unit test
  that types through `insertTyped` during a slowed open and checks that the result is the file, with no stray
  character.

### F3 (P3): typed DEL tests the hardware Backspace, not the delete key iPhone users press

- Does typing `"\u{7F}"` really test backspace? Mostly, yes. XCTest turns U+007F into the keyboard's delete key
  event, and UIKit sends that to `UIKeyInput.deleteBackward` on Runestone's TextInputView.
- The assertions compare the resulting text (EditorGateUITests.swift:274-283, ConsoleEditorUITests.swift:37). A
  DEL inserted as a literal character would fail them.
- My run also deleted one character at a bare caret: 59 of 60, when the first ⌘A was dropped. That is the case
  Runestone does not handle by itself, and it passed.
- What it does not test:
  - **The on-screen keyboard's delete key.** That is how an iPhone user without a keyboard deletes, and nothing
    tests it. The key row has no delete key, so no test of `RunestoneEngine.deleteBackward` reaches the Console.
  - **Backspace on iPhone.** `testG3BackspaceAndSelectAll` is skipped on iPhone (`ipadEditor`,
    EditorGateUITests.swift:222). On the iPhone destination, the Console test's use of DEL depends on a check
    that only runs on iPad.
  - **The control run.** The comment's evidence that `typeKey(.delete)` reaches no responder is
    `ZZDeleteControlUITests` (ops/runs/xcodebuild-20261028-155852.log). That test is not in the repository, so
    nobody can rerun it after the next Xcode update.
- **Fix (T-0588):**
  - Commit the control test, skipped unless an environment flag is set, so the claim can be checked again.
  - Add one Console UI test that deletes with `app.keys["delete"]` on the on-screen keyboard. On the Simulator,
    turn the hardware keyboard off first (`ConnectHardwareKeyboard`). The test should delete one character at a
    caret and a selection, and check the text.

## Notes (no fix line)

- **Cost per keystroke.** Each keystroke compares the whole text in `updateUIView` (:24) and in `onChange` (:45),
  and `changed()` copies the whole text into the accessibility value. That is three full-text copies per key. It
  is fine at today's file sizes. If a 2,000-line file shows keystroke lag on the device, look here first.
- **For Maren's T-0583 screenshots.** In `docs/guide/shots/console-default-light.png`, the code starts right
  against the gutter divider, with no inset. That is Maren's call against the mockups, not a code defect.
{% endraw %}

</div>
