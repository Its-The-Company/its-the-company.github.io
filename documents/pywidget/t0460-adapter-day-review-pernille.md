---
layout: "default"
title: "T-0645: review of T-0460&#x27;s adapter day (2596a517)"
section: "documents"
description: "Verdict: patch 0001 is correct, small, and applies cleanly. It is the right fix. The key-row change works as described, but it inherits a marked-text bug and nothing tests it. The commit adds no tests for any of its\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0460-adapter-day-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0460-adapter-day-review-pernille.md</code></span></div><h1>T-0645: review of T-0460's adapter day (2596a517)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-29. Read: `git show 2596a517`, the follow-ups on the same files
(`git log 2596a517..HEAD`; for this review the ones that matter are 5ac90a05, which dropped the shipping warm-up, and
8102ffdc, which added patch 0002), ADR-004 s7, and Runestone at the pin (acc9ecb8). I did not read Idris's notes.

Verdict: patch 0001 is correct, small, and applies cleanly. It is the right fix. The key-row change works as described,
but it inherits a marked-text bug and nothing tests it. The commit adds no tests for any of its three changes.
Two Mediums, both for before the alpha commit. No High.

## Patch hygiene (done-criterion)

- A clean `fetch_editor.sh --tarballs` into `/tmp/t0645.1N0Gle/ios` with a fresh `PYWIDGET_CACHE` (copies of
  `fetch_editor.sh` and `scripts/editor/` only, nothing run from inside an archive) worked: all three tarball sha256s
  matched, and `PIN` names 0001 (`5f804af0bd52`) and 0002 (`90dcf8deb793`).
- 0001 applied alone to the pristine Runestone tarball with `patch -p1 --forward --fuzz=0 --dry-run`: no fuzz and no
  offset. The hunk sits at line 873 as written.
- `diff -rq` between the repository's `Vendor/Runestone` and the clean fetch: identical except Xcode's `.swiftpm/`.
  The alpha build links the patched source.

## Correctness of patch 0001 (no finding)

The flag is set in the `selectedTextRange` setter (UIKit's path, `TextInputView.swift:71` at the pin) and, in
`selectAll` and undo, on purpose (`:910`, `:1700`). Upstream clears it only in `deleteBackward` (`:1320`). With the
patch it is cleared before the delegate is called (vendored `TextInputView.swift:879`). So a re-entrant
`selectedTextRange` set from inside `selectionDidChange` still arms the next pass, the same order as the delegate
flag beside it. After one notification, the state is the one upstream already has after every backspace. The Korean
workaround is unchanged, because `deleteBackward` still clears the flag before the layout pass. Undo grouping is not
touched: `TimedUndoManager` grouping does not read this flag.

Measured with a scratch unit test (not committed; code in M2): move the caret through `selectedTextRange`, then type 5
characters with a layout pass after each. Patched: 1 selection notification in total. With line 879 removed from
`Vendor/`: 11. So the patch does what the ADR says, and a test can see it. Logs:
`ops/runs/xcodebuild-20261029-022220.log` (patched) and `-022341.log` (mutant). I restored `Vendor/` from the clean
fetch afterwards; `diff -rq` is clean.

## Findings

### M1 (Medium): a key-row tap during IME composition deletes the composed text
`pywidget/ios/App/Editor/RunestoneEngine.swift:110-116` (`insertTyped`).
`TextInputView.insertText` replaces `markedRange ?? selectedRange`, which is upstream behaviour for the keyboard's own
commit. When the key row calls it while kana is marked, it overwrites the composition. Scratch test: `"x = \n"`,
caret at 4, `setMarkedText("か")`, tap Left parenthesis. Result: `"x = ()\n"`. The か is gone and undo gives back
`"x = \n"`, so it cannot be recovered. The old path (`TextView.insertText`) calls the same `TextInputView.insertText`,
so this is older than 2596a517. 2596a517 makes it worse, though: the keyboard is no longer told anything, so it can
still think it is composing. On iPhone the key row sits over the Japanese kana keyboard, which is a <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span> item. It loses
what the person typed, so it counts as data loss under the Mission and should not wait.
Fix: in `insertTyped`, when `(host as? UITextInput)?.markedTextRange != nil`, call `unmarkText()` first. That commits
the kana and notifies the keyboard, and the key-row text then goes in after it. Add a test that asserts
`"x = か()\n"` and one undo step for the parenthesis pair.

### M2 (Medium): reverting any of the three changes leaves every test green
- Patch 0001 has no test. Only the G1 bench would notice, and the bench is not a pass/fail suite. A Runestone bump
  or re-vendor that loses the patch would ship the 29-33 ms keystrokes again without a red test.
- `testKeyTapsGoThroughTheTypingPath` (`pywidget/ios/Tests/EditorGateTests.swift:271`) checks only the text and the
  caret, and it passes on either path. `insertTyped` also falls back silently to the old path if `inputHost`
  (`RunestoneEngine.swift:320`, the first `UITextInput` subview) stops matching. Scratch test: the host path sends 0
  selection notifications per tap and `TextView.insertText` sends 1, so that difference can be asserted.
- The warm-up is timed and not asserted, and since 5ac90a05 it runs only under `-editor-bench`. No test is needed
  for it in the alpha.

Add the two tests below to `EditorGateTests` (a `UITextInputDelegate` spy that counts `selectionWillChange`; it needs
an `@available(iOS 18.4, *)` `conversationContext(_:didChange:)` stub to compile against the iOS 27.1 SDK). Then show
each one red against its mutant: line 879 removed from `Vendor/`, and `insertTyped` going back to `textView.insertText`.

```swift
// patch 0001: one notification per selection change, none per keystroke
input.inputDelegate = spy
input.selectedTextRange = input.textRange(from: p, to: p); input.setNeedsLayout(); input.layoutIfNeeded()
XCTAssertEqual(spy.sel, 1)
for c in ["x", "y", "z", "w", "v"] { e.insertTyped(c); input.setNeedsLayout(); input.layoutIfNeeded() }
XCTAssertEqual(spy.sel, 1)          // 11 with the patch reverted
// key row: the responder's own insertText, no extra resync
spy.sel = 0; e.insertTyped("x"); XCTAssertEqual(spy.sel, 0)   // 1 through TextView.insertText
```

### L1 (Low): the bench still warms up by default; the app does not
`pywidget/ios/App/PyWidgetApp.swift:43`. `-editor-bench` schedules `EditorWarmup` unless
`-editor-bench-no-warmup` is passed. The shipping launch has had no warm-up since 5ac90a05. ADR-004 s7 already says
that the 54.8 ms median describes a launch the app no longer has. But a device re-measure (T-0479) that uses the
default arguments would repeat that mistake. Make no-warmup the bench default, or retire `EditorWarmup`. Its
header comment (`EditorWarmup.swift:6`, "The app builds one engine at launch") is now stale.

### L2 (Low): nothing checks at build time that `Vendor/` carries the patches in the tree
`pywidget/ios/scripts/fetch_editor.sh:93-97`; `tools/alpha_run.sh:175-179` only records `PIN`. A `Vendor/` fetched
before a patch was added builds without complaint. Today it is correct (checked above). A pre-build phase could
compare `Vendor/Runestone/PIN`'s patch lines with `shasum` of `scripts/editor/patches/runestone-*.patch` and fail on
a mismatch. That would be about 10 lines.

### L3 (Low): key-row taps no longer keep the keyboard in sync
`RunestoneEngine.swift:110-116`. UITextInput expects the input delegate to be told about changes the keyboard did not
make. Key-row taps are such changes. Skipping the notification makes the keyboard behave as it does for its own keys.
That costs nothing with autocorrection, autocapitalisation, smart punctuation and spell checking off, but
`inlinePredictionType` is not set and stays at the default. M1's fix covers the case people can see. The device
check (T-0479) should type after a key-row tap with the kana keyboard and with inline predictions on, as s7 already
asks.

### L4 (Low): the patch file has no header
`pywidget/ios/scripts/editor/patches/runestone-0001-notify-input-delegate-once.patch:1`. The reasoning is in a code
comment, but the patch file has no `From:`/`Subject:` and does not name the upstream issue. If someone offers it
upstream, or rebases it on a Runestone bump, they start from the diff alone. Add a short header above the `---`
line; `patch` ignores leading text.

## Main-thread rules (no finding)
`EditorWarmup` and `FirstFrame` are `@MainActor`. The parse runs in `Task.detached` and `setState` runs back on the
main actor. The display link is added to `.main`/`.common` and invalidated in `stop()`, which ends the retain cycle
on its target. `Ticker.next` is never awaited twice at once. In a background launch the display link does not fire
until the app comes to the foreground, so no CPU is used.

## Re-review (T-0652): bece101c (T-0650 M1, T-0651 M2)

Reviewer: Pernille. 2026-10-29. Read from `git show bece101c`, the vendored `unmarkText`, and the logs grepped
(`ops/runs/xcodebuild-20261029-022836`, `-023257`, `-023344`, `-023532`, `-023646`). No Xcode run of my own.

**Verdict: M1 closed. M2 closed. No new High or Medium. Two Lows.**

### M1: closed
- `insertTyped` calls `unmarkText()` on the input host when `markedTextRange != nil`, then `insertText`. In
  `TextInputView.unmarkText` (Vendor, line 1734) the characters stay, `markedRange` goes to nil, the keyboard gets one
  selection notification, and the editor gets `textInputViewDidChange`. So `insertText` then replaces the plain
  selection, which sits after the kana. The notification fires only while composing, so the L3 point (a key-row tap
  tells the keyboard nothing) still <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for ordinary taps.
- The test asserts `"x = か()\n"`, caret 6, `markedTextRange == nil`, and one `undo()` back to `"x = か\n"`. Red before
  the fix (`-022836`: `"x = ()\n"`, caret 5), green after (`-023257`, `-023646`).
- Undo grouping: the test closes Runestone's typing group with `endUndoGrouping()` before the tap, which is the case
  with a pause. Idris says undo restored the kana there even before the fix, so the pause case proves the text, the
  caret and the pair as one step, not the undo grouping by itself. Without a pause, kana and pair share one group and
  one undo takes both back. That loses nothing the person did not undo on purpose, so I accept it.
- **L5 (Low): no test for the tap with no pause.** A second case without the `endUndoGrouping()` line would pin that
  the text is still `"x = か()\n"` and that undo leaves no stray marked range. Not needed before the alpha.
- **L6 (Low): the fallback branch of `insertTyped` (`textView.insertText`) does not unmark.** It runs only when
  `inputHost` is not a `UITextInput`, which `testKeyRowTapSendsNoSelectionNotification` now makes red. Fine as is.

### M2: closed
- Patch 0001 mutant (line 879 removed from Vendor): `-023344` shows `testPatch0001Notifies...` red with 11 (the number
  I measured), and `testKeyRowTapSendsNoSelectionNotification` red with 2 as well. The key-row test fails for both
  mutants because the patched flag also arms extra notifications there. The tests do not tell the two mutants apart
  by name alone, but each mutant turns at least one test red, and the failure text (11 against 2) tells you which.
- `insertTyped` through `textView.insertText` mutant: `-023532` shows the key-row test red (2 for two taps) and the
  patch test red (6). Both mutants are killed. The first run, `-022836`, had the key-row test counting 1 before Idris
  added the line that spends the armed notification, and the final test does that. Good.
- Vendor restored: his message says `fetch_editor.sh --tarballs` and `diff -rq` clean. Green after: `-023646`, 19/19
  editor and 341/341 unit.
- Warm-up: no test, as agreed in M2.
{% endraw %}

</div>
