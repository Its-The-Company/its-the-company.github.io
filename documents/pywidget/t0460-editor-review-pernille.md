---
layout: "default"
title: "T-0476: review of 0020d29d (T-0460, editor G2/G3)"
section: "documents"
description: "Verdict: one High (a crash) and two Medium before any TestFlight build that carries the editor. The runtime patch itself is sound, and nothing in it is private Apple API. No retain cycles."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0460-editor-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/t0460-editor-review-pernille.md</code></span></div><h1>T-0476: review of 0020d29d (T-0460, editor <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span>/G3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-27. Commandment 13: I read the commit (`git show 0020d29d`), the vendored Runestone it leans on
(`pywidget/ios/Vendor/Runestone/.../TextView/Core/`), ADR-004 s7 and the run logs it cites. No later commit touches these
files. Line numbers are at 0020d29d.

**Verdict: one High (a crash) and two Medium before any TestFlight build that carries the editor.** The runtime patch
itself is sound, and nothing in it is private Apple API. No retain cycles.

## High

### H1. `EditorSpeech.announcement` crashes on a stale selection. `open()` on a used engine reaches it, VoiceOver or not.
- **Where.** `App/Editor/EditorKeyRow.swift:245` checks only `new` against the text length. `:252` clamps `old` for the
  line lookup, but `:258-259` then takes `substring(with: lo..<hi)` with the unclamped `old.location`.
- **How it is reached.** `RunestoneEngine.open` (`RunestoneEngine.swift:64-66`) calls `setState` first and `changed()`
  second. Runestone's `TextInputView.setState` (Vendor `TextInputView.swift:976-978`) clamps the old selection to the
  new text, and its `selectedRange` setter (`:630-637`) calls `textViewDidChangeSelection` straight away, before
  `changed()` raises `editedSinceSelection`. `selectionChanged()` (`RunestoneEngine.swift:128-133`) works out the
  announcement before it looks at `isVoiceOverRunning` (`:136`). So the crash hits every user.
- **Failure scenario.** Someone edits file A and taps at offset 500. The same engine then opens file B, a one-line file
  of 19 characters. `old` = (500,0) and `new` = (19,0) sit on the same line, so the code calls `substring` over
  (19, 481) and gets NSInvalidArgumentException. The Day 9 plan to "warm one engine at launch" is exactly the reused-engine path.
  Today every caller builds a new engine for each open (EditorBench, EditorCheck), so this is latent, one task away.
- **Proof.** I copied the function verbatim from 0020d29d into a host script (`xcrun swift`, Foundation's NSString):
  `-[__NSCFString substringWithRange:]: Range {19, 481} out of bounds; string length 19`.
- **Fix.**
  - In `announcement`, return nil when `NSMaxRange(old) > text.length`.
  - In `open`, raise the "edited" state before `setState`, and after it set `lastSelection = textView.selectedRange`.
  - Better still, replace the boolean with the selection expected after the edit (L1 below).
  - Tests: (1) unit, on one engine: open a long text, set the caret to 500, open a short one, expect no crash and no
    announcement; (2) `announcement` with `old` out of range returns nil.

## Medium

### M1. The accessory view's reload never fires, so connecting or removing a keyboard mid-edit leaves the wrong bar.
- **Where.** `RunestoneEngine.swift:105`: `if textView.isFirstResponder { textView.reloadInputViews() }`.
- **Why it is dead code.** Runestone's `TextView` is never first responder while editing; its internal `TextInputView` is.
  `TextView` does not override `isFirstResponder`, and its own `canBecomeFirstResponder` is
  `!textInputView.isFirstResponder` (Vendor `TextView.swift:339`). The commit knows this: `EditorCheck.swift:95` finds
  "first" by searching `subviews`.
- **Failure scenario.**
  - An iPad user is typing and attaches a Magic Keyboard. `GCKeyboardDidConnect` sets `accessoryView = nil`, but UIKit
    keeps showing its cached input views, so the key row stays as a bar at the bottom of the screen. <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> 4b says no
    bar with a hardware keyboard.
  - The reverse: a Bluetooth keyboard drops off an iPhone mid-edit, and the row does not come back until the user hides
    the keyboard and focuses again.
  - It also bites at launch. `GCKeyboard.coalesced` is often nil until `DidConnect` arrives, so an editor focused early
    can keep a stale row.
  - On device I expect a stale cached bar, but that part is unproven (the device check under T-0479 can show it). The dead branch is certain from the code.
- **Tests do not see it.** `testNoKeyRowWithAHardwareKeyboard` checks only the engine's stored property, and the editor
  is never first responder in that test.
- **Fix.**
  - Reload when the input host is first responder: `if textView.inputHost?.isFirstResponder == true { textView.reloadInputViews() }`.
    `TextView.reloadInputViews` forwards to the input view (Vendor `TextView.swift:833-835`).
  - Test: focus the engine in the test window, flip the injected flag, and assert the reload ran. Use a reload hook or
    counter, and check the test fails on the current line.

### M2. `press()` resends can hide a real dropped key, and ADR s7 describes the drops differently from the logs.
- **Where.** `UITests/EditorGateUITests.swift:155-168`. Every press may resend up to twice, and a resend never fails the
  test; it is only printed.
- **What the logs show.**
  - `ops/runs/xcodebuild-20261027-165050.log:6516-6587`. `testG3TwoEditorsTwoFiles` sent ⌘↑ and then "b" three times
    each to editor b after `b.tap()`. Neither reached it and the test failed. That is a focus hand-off between two
    editors, not "the first key after a relaunch".
  - `xcodebuild-20261027-165622.log:6274`. A ⌘↑ resend in `testG3ArrowsWordLineAndDocumentMoves`, the second key after
    the warm-up arrow went through.
  - Final run `170828`: 0 resends. I cannot tell what changed between the runs.
  - ADR s7 says "the first key after a relaunch inside one run, and now and then later". The logs say mid-test, after a
    focus change. A first-responder or focus bug in the app would look exactly like a Simulator drop, and the resend
    turns it green.
- **The ADR's safety claim is only partly true.** "A late event resent would apply twice, and the exact expectations
  would catch that." That <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for ⇥ and typing. It does not hold for ⌘Z/⇧⌘Z at the end of the undo stack (sample
  opens with no undo history), or for ⌘↑/⌘↓/⌘→ (idempotent): doubled, they still meet the expectation.
- **Also.** Each `state()` read waits up to 10 s for the label and costs about 1.2 s in these logs, so the "1.5 s" window
  holds one or two reads.
- **Fix.**
  - Allow a resend only for the warm-up key in `ipadEditor`. Any later key that changes nothing fails the test, or count
    resends and assert zero in `tearDown`, with the count attached.
  - Correct the ADR s7 bullet to match the logs.
  - Add to T-0479 (device check) on an iPad with a hardware keyboard: tap from one editor to the other, and confirm the
    first key after the switch lands. Repeat 10 times.

## Low

- **L1. `editedSinceSelection` is a one-shot boolean** (`RunestoneEngine.swift:120, 131`).
  - Any text change that is not followed by a selection callback leaves it set, and then the next real caret move is
    silent for VoiceOver. Example: IME commit, where `unmarkText` calls `textInputViewDidChange` with no selection
    callback (Vendor `TextInputView.swift:1730-1740`).
  - Fix with H1: in `changed()`, record `expectedSelection = textView.selectedRange`, and skip the announcement only when
    the new selection equals it.
- **L2. The runtime patch fails silently.**
  - If Runestone ever wraps or reorders its subviews, `inputHost` is nil and `init` returns at `:175`. The editor is then
    invisible to VoiceOver (the TextView is already `isAccessibilityElement = false`), with no log. The unit test does
    catch this (`XCTUnwrap`), which is good.
  - The four `class_addMethod` results are ignored (`:239-246`). If Runestone implements one selector itself without
    declaring the protocol, the answers come from two sources.
  - Fix: `assertionFailure` plus a `Logger` error in both places.
- **L3. Scope and idempotence of the patch: fine, recorded so nobody worries again.**
  - Guarded by `class_conformsToProtocol`, so it runs once per class. Every caller is on the main actor.
  - It uses `type(of: host)`, not a class-name string, so a Runestone rename does not break it.
  - If Runestone later conforms itself, ours is skipped and the `accessibilityFrame` equality in
    `testEditorIsOneSourceCodeElementWhoseValueIsTheText` would flag a difference.
  - It applies to every `TextInputView` in the process. Hosts not inside an `AccessibleTextView` answer
    NSNotFound/nil/.zero, which is harmless today because RunestoneEngine is the only user.
  - Type encodings match arm64 (`q`, `d`, the CGRect struct).
- **L4. `MainActor.assumeIsolated` in the four IMPs traps if the call ever comes off the main thread** (`:227-237`).
  UIKit delivers accessibility calls on the main thread, so I accept it. The cost is a crash rather than a wrong answer; I note it, nothing more.
- **L5. O(n) work per keystroke and per caret move, not measured.**
  - `changed()` copies the whole text into `accessibilityValue` (`:121`), and `selectionChanged` bridges the whole text
    again. `lineStarts` rescans the document on every reading-content call (`:251`).
  - Fine for widget-sized files. The Day 9 G1 re-measure runs on a commit that includes this, so it will show.
  - If it costs, set the value only while VoiceOver runs (`voiceOverStatusDidChangeNotification`) and take line starts
    from Runestone's line manager.
- **L6. Block observers are never removed** (`EditorCheck.swift:53, 71`; `EditorKeyRow.attach`, `:220`). The closures
  capture weakly, so nothing leaks but the tokens. The IDE screen must remove them; `attach` could return a token object
  that removes itself in `deinit`.
- **L7. Spoken strings are not localized, and some speak nothing.**
  - `EditorSpeech`'s "selected", "Unselected", "Blank" and "New line", and the key names, are plain literals (T-0477
    covers the user-facing text).
  - A move across a run of spaces (⌥→ over an indent) announces "    ", which VoiceOver speaks as nothing.
  - Possible double speech, where VoiceOver echoes the UITextInput move and we also announce it: add to T-0479.
- **L8. One test cannot fail.** In `testKeyTapsGoThroughTheTypingPath`, "a multi-character alternate is one undo step"
  passes even if the alternate went in as six separate inserts, because TimedUndoManager groups everything within 1 s.
  Spy on `insertTyped` (one call, whole string) instead.

## The points I was asked to weigh

- **App Review exposure: none found.**
  - `class_addMethod`, `class_addProtocol` and `imp_implementationWithBlock` are public, documented runtime API: declared
    `OBJC_EXPORT` with `OBJC_AVAILABLE(..., 2.0/4.3, ...)` in the iPhoneOS SDK's `usr/include/objc/runtime.h` (lines 723,
    778, 1565).
  - The selectors added are UIAccessibilityReadingContent's public protocol methods.
  - The class patched is Runestone's, compiled into our binary, not an Apple class. No code is downloaded or changed after
    review.
  - So Guideline 2.5.1 (public APIs) is met and 2.5.2 is not engaged.
- **Retain cycles: none.**
  - `AccessibleTextView.engine` is weak. The row holds the engine weakly and the engine holds the row; that is the
    intended direction.
  - Every `UIAction`, custom action, trait-change handler and observer closure captures `[weak ...]`.
- **Main-thread rules: kept.**
  - GC notifications arrive on `queue: .main` before `assumeIsolated`.
  - Announcements are posted from the delegate on main.
- **Do the tests fail when the fix breaks?**
  - Yes for the element move and the run-time conformance: `host as? UIAccessibilityReadingContent` and `host.isAccessibilityElement`.
  - No for M1 (the reload) and for L8.
  - Partly for G3: the resend can turn a real drop green (M2).

## Re-review of faf86748 (T-0502)

Reviewer: Pernille, 2026-10-27. I read `git show faf86748`, Runestone's `TextInputView.setState`, `selectedRange` and
`safeSelectionRange` (Vendor `TextInputView.swift:949-979, 629-637, 1622-1627`), `TextView`'s `inputAccessoryView` setter
and `reloadInputViews` (Vendor `TextView.swift:318-329, 833-835`), and the old-code run `ops/runs/xcodebuild-20261027-200710.log`.

**Verdict: H1, M1 and M2 are fixed. No new High or Medium. Two Low, below. The editor no longer blocks a TestFlight build on my findings.**

### H1: fixed
- `announcement` now returns nil when `NSMaxRange(old)` passes the end. The old `min(old.location, text.length)` clamp
  is gone, and every `substring` after the guard is in range. No clamp is left in `EditorSpeech`.
- `open` sets `opening` around `setState`. Runestone fires the selection callback synchronously inside `setState`
  (`selectedRange` setter calls the delegate straight away), so the flag is live when the callback arrives. After
  `changed()`, `open` clears `editedSinceSelection` and sets `lastSelection` to the new caret. So the first real move
  after an open speaks, and it is measured from the right place.
- **Can the guard mask a real wrong caret?** No. It changes nothing about the caret; it only decides whether to speak.
  It returns nil in two cases. (1) `new` past the end: Runestone's `safeSelectionRange` <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> every selection, so a
  wrong `new` from Runestone would be a Runestone bug, and silence is the right answer. (2) `old` past the end: the
  text shrank without our bookkeeping seeing it. A stale `old` that is still in range would give a wrong announcement,
  and the guard does not hide that. The second half of the new engine test catches it for the open path: it asserts
  the exact text crossed by the first move after the open.
- **Do the tests fail on 0020d29d?** Yes, from the run log on the old code: `testCaretAndSelectionAnnouncements` threw
  NSInvalidArgumentException at `EditorGateTests.swift:106`. `testOpeningAShortFileOnAUsedEngineSaysNothingAndDoesNotCrash`
  crashed the runner ("Restarting after unexpected exit"; the Range {19, 481} message is in `ops/runs/20261027-181343-work.jsonl`).

### M1: fixed, and the VoiceOver post with it
- Both checks now ask `textView.inputHost?.isFirstResponder`. That matches the vendor: `TextView.reloadInputViews`
  forwards to `TextInputView`, and the `inputAccessoryView` setter only stores the view and never reloads, so the
  counter is not inflated.
- `testHardwareKeyboardSwapReloadsTheFocusedEditor` failed on the old line (old-code log `:6084` and `:6107`, "0" reloads
  where 1 and 2 were expected). It asserts that the editor really took focus first, so it cannot pass vacuously.
- The VoiceOver announcement post is reachable now for the first time. VoiceOver users will hear our announcements, so
  whether they double VoiceOver's own echo goes from theoretical to shipped. T-0479 already lists that check, and it
  has to run before the editor goes out. No host test can cover the post (it needs VoiceOver running), so that is fine.

### M2: fixed
- `press()` resends only the warm-up key (`warmUp: true` in `ipadEditor`). Any other key that changes nothing in 4 s
  fails, with the state line and a `lost-key` screenshot attached. A 4 s window holds about three state reads at 1.2 s each.
- ADR-004 s7 now matches the three logs I cited (165050, 165622, 170828), says plainly that nobody knows what changed,
  and withdraws the "doubled keys would be caught" claim for ⌘Z/⇧⌘Z and ⌘↑/⌘↓/⌘→. The T-0479 line has the
  editor-to-editor switch check, 10 times.

### New Low
- **R1. Nothing tests the `opening` flag on its own.** In today's Runestone, `setState` fires the callback only when the
  capped selection differs from the old one. That only happens when the old selection runs past the new end, and the
  guard already returns nil in that case. If you delete `opening = true`, every test still passes. I accept it as
  defence in depth for a later Runestone that moves the caret on `setState`. Say so in its comment, or drop it.
  L1 (the expected-selection field) is still open.
- **R2. `press()` reads the label twice per poll**: once inside `state(app, i)`, then again as `label.label`. If the key
  lands between the two reads, the test fails with "changed the state line but not its text, selection or command",
  and the key was fine. The same can happen between `beforeLine` and `before`. This fails loudly and can never pass a
  bad key, so it is a flake risk, not a hole. The fix is to parse `now` from the same string that is compared with
  `beforeLine`. In three iPad runs (24/24) it did not happen.
{% endraw %}

</div>
