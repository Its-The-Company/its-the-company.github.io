---
layout: "default"
title: "T-4252: review of T-2261, the editor&#x27;s completion list and inline errors"
section: "documents"
description: "Verdict: PASS with notes. I found nothing that crashes, loses text or blocks the main thread. There is one Medium finding (VoiceOver), filed as T-4261, and seven Low ones. This work meets only part of T-2512, which must\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2261-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t2261-pernille.md</code></span></div><h1>T-4252: review of T-2261, the editor's completion list and inline errors</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Commits: fdc32bb387 (replace span, `edit(caret:)`), 32e92ab4e6
(CompletionList, CompletionController and CompletionPopover, the Swift cold/stuck/stopping answer, `PyBridge.isStopping`),
17393d231c (EditorProblemsElement, the 3.15.1 fallback names, CompletionUITests). Read: the three diffs whole, plus
`App/Editor/EditorTooling.swift`, `RunestoneEngine.swift`, `ConsoleEditor.swift`, `Shared/Bridge/PyBridge.swift`
(`stop`, run end), `pywidget/python/pywidget_tooling/editor.py` (`warm`, `_fallback_names`, `_complete_jedi`,
`_answer`) and the vendored Runestone it edits through (`Vendor/Runestone/.../TextInputView.swift`,
`TimedUndoManager.swift`). Code only; the design read is Maren's.

**Verdict: PASS with notes.** I found nothing that crashes, loses text or blocks the main thread. There is one Medium
finding (VoiceOver), filed as T-4261, and seven Low ones. This work meets only part of T-2512, which must stay open
(section 3).

## 1. Tests

- Host, Core package: `swift test --filter CompletionListTests` at 17393d231c: 11 tests, 0 failures.
- Host, editor.py (CPython 3.13; no jedi on the host path, so the fallback answers): for
  `"é = 1\r\n\U0001F600; pr"` at the end, `replace` is `{line 2, col 4, end_col 6}`, the span the Swift fixture
  test `testAcceptSpanCountsCRLFAndSurrogatePairs` asserts. For a lone `"\r"` ending (`"a = 1\rpr"`) editor.py puts
  the word on line 2 (relevant to L4).
- MacBook runner: `PyWidgetTests/EditorToolingTests` at 17393d23, job J-20261113-0907-xc-test (committed 9973fbd90c):
  passed, exit 0, 91.6 s: 11 tests, 0 skipped, 0 failures (the three accept-span tests, the cold test and the problems-element test among them).

## 2. The questions on the line

**Accept edits.** `CompletionList.refine` (CompletionList.swift:55-72) rewrites every visible row's `replace` to
`anchor..caret` in UTF-16, so an accept always writes the label over the whole typed word, case mismatch included
("PA" becomes "path"). Surrogate pairs: `isName` counts both halves of an astral letter as name units, so `wordStart`
never splits a pair. CRLF does not reach the span, because the word never crosses a line. Python's own span
(fdc32bb387, mapped by `PythonLineIndex`) is correct (host probe above), but in the app `refine` always overwrites it;
it matters only to `edit(caret:)` callers outside the list. **One undo step: no** (L1).

**When the list opens and closes.** It opens at once after a dot that follows a name, `)` or `]`, and 300 ms after a
name character. Numbers, comments and single-line strings do not ask (`trigger`, :106-126). It closes on typing past
the word, the caret leaving it (`selectionChanged`), Escape, the end of editing, an open, or an empty filter. Stale
answers are dropped by `asked` (CompletionPopover.swift:108). It does not close or move when the editor scrolls or the
container resizes (L3).

**Main-actor and bridge crossings in `ConsoleEditor.ask`.** `ask` is a `nonisolated static let` `@Sendable` async
closure. The targets build in Swift 6.0 mode without `NonisolatedNonsendingByDefault` (project.yml:8-9), so the call
at CompletionPopover.swift:107 leaves the main actor, and `EditorTooling.start()`, `complete()` and their `cond` and
`PyBridge.lock` reads run off it. Only `String` and the `Sendable` answer cross. The main actor never waits on the GIL.
`complete()` reads `isWarm`, `stuck` and `isStopping` once before `submit` (EditorTooling.swift:99-104), so a stop that
starts after that read still gets this one call (section 3).

**The Python contract.** Swift sends `text` and `offset`. editor.py lets the offset win (T-1128 F7) and answers
`replace` as (line, UTF-16 col, end_col), which Swift maps correctly. Swift's own answers add the reason `"stopping"`,
which editor.py's docstring does not list. The UI reads only `mode`, so nothing breaks (L7). After a dot, the Swift
cold list offers nothing, where editor.py's fallback offers a loaded module's members; the code documents this
(CompletionList.swift:155-157). Completions are now live while a script runs, so from this commit on users can see my
T-2262 M1 (jedi reads the live `sys.path` and cwd, and no `path` is sent); it is T-2513.

**What VoiceOver hears.** The rows are buttons labelled like "print, function", the selected one has `.selected`, and
the foot says "Basic suggestions". But nothing is announced when the list appears or when an accept writes (M1). The
problems element says "1 problem", "Line 4: undefined name 'valeu'" and is hidden while there are none. Its line count
is L4 and its place in the reading order is L5.

## 3. T-2512 (my T-2262 M2, M3, M4): what this work meets


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. T-2512 (my T-2262 M2, M3, M4): what this work meets, scrolls sideways" style="--tw:867px" markdown="1">

| Item | Met? | Where |
|---|---|---|
| M4: while `!isWarm`, `complete()` answers "cold" in Swift without queueing | Yes, tested (`testColdCompletionAnswersInSwiftWithoutQueueing`) | EditorTooling.swift:99-104 |
| M4: start warm() once the bridge is up and no run is live, not on the first lint | No: warm() starts on the first lint or the first completion ask, run live or not | ConsoleEditor.swift:142, :154 |
| M4: carry warm()'s result into `isWarm` | No: the job's result is ignored, so `warmDone = true` even when jedi is missing (harmless: editor.py then answers "unavailable", at one Python round trip per ask) | EditorTooling.swift:82-84 |
| M2: no completion queued while stuck | Yes (answers "stopping") | EditorTooling.swift:100 |
| M2: coalesce queued diagnostics; skip `submit` while stuck | No: `diagnostics()` is unchanged, so a stuck script still <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> the worker and every lint pause queues another job | EditorTooling.swift:119-124 |
| M3: start no editor call while a run is stopping | Completions only: `diagnostics`, `prime` and `warm` still start during a stop | EditorTooling.swift:111, :119 |
| M3: send the running call `Cancelled` on Stop | No | |

</div>


The commit title's "(T-2512 M4, M2, M3)" holds for completions only. T-2512 stays open for the rows marked No.

## 4. Findings

### Medium

**M1. VoiceOver is not told the list opened, so Return silently writes a word instead of a new line (T-4261).**
CompletionPopover.swift:110-112 and :125-144 (`render` adds the popover and posts nothing); RunestoneEngine.swift:265-272
(Return accepts while `isShowing`); CompletionPopover.swift:85-93 (`accept` writes and posts nothing). Failing case,
read from the code (not run with VoiceOver): a VoiceOver user types `pri`, pauses, and presses Return for a new line.
The list opened 300 ms in with no announcement, so Return accepts "print" and no newline is written. VoiceOver does
not say the word either: `RunestoneEngine.changed()` sets `editedSinceSelection` (:190), so the next selection
callback is skipped as typing. The user hears the keyboard's Return and believes a new line was made. Fix: when
`UIAccessibility.isVoiceOverRunning`, post `.announcement` when a list appears (for example "6 suggestions, print"; not
again while filtering) and after an accept ("print inserted"). Alternatively, do not let the software keyboard's Return
accept while VoiceOver runs (hardware Return and a double-tap on a row still accept). Add a unit test on the controller
for the announcement text.

### Low

**L1. The accept is not its own undo step.** CompletionPopover.swift:89 calls `RunestoneEngine.replace` (:112), which
goes to `TextInputView.replace(_: UITextRange, withText:)` (TextInputView.swift:1347-1353). That path does not call
`endUndoGrouping` before or after, so the replace joins the typing group that `TimedUndoManager` keeps open for 1 s
from its first edit (`endGroupingInterval = 1`, not reset per key). Failing case: type `os.` quickly, so the list
opens at once, tap "path" within that second, then Undo: the text goes back to before `o`, not to `os.`. The doc
comment at CompletionPopover.swift:16 says "one undo step". Fix: in `RunestoneEngine.replace` (or a dedicated accept
entry), call `textView.undoManager?.endUndoGrouping()` before and after the replace, as Runestone's own
system-replacement path does. Add a test that undoes once after an accept and reads the typed word back.

**L2. The on-screen Tab never accepts.** RunestoneEngine.swift:266 tests `text == "\t"`, but Runestone turns a typed
tab into the indent string before it asks the delegate (TextInputView.swift:1272; `indentStrategy` is
`.space(length: 4)`, RunestoneEngine.swift:56). So the key row's Indent writes four spaces and closes the list, and
only the hardware Tab (a key command) accepts. The `"\n"` test holds only because `lineEndings` is never set (Runestone
defaults to LF); setting it to CRLF later would break Return too. Fix: compare against
`textView.indentStrategy.string(indentLevel: 1)` and the line-ending symbol, or route the key row's Indent to
`completionKeys.accept()` while `isShowing`.

**L3. The list does not follow the text.** CompletionPopover.swift:125-144 places the popover once per keystroke, in
container coordinates. If the editor scrolls, the keyboard frame changes or the device rotates, the list stays over
unrelated lines until the next key. Fix: dismiss on the scroll view's scroll and on a container bounds change (or
re-render there).

**L4. "Line n" is wrong in a file with lone "\r" line endings.** ConsoleEditor.swift:227-240 counts only `"\n"`.
Python, editor.py (host probe, section 1), `PythonLineIndex` and Runestone's gutter all count a lone `"\r"` as a line
break, so a mark on line 2 of such a file is read as "Line 1". Fix: take the line from `PythonLineIndex(text)` (the
index the ranges were mapped with) instead of counting a second time.

**L5. Nothing checks where the problems element sits in VoiceOver's reading order.** ConsoleEditor.swift:176 adds it
at the container's origin, 1 pt, and the comment (:206) says VoiceOver reaches it "by swiping after the editor".
VoiceOver orders a container's elements by position, top-left first, so I expect it to come before the editor or tie
with it. No test checks this (the UI test reads the element by identifier). Fix: set the container's
`accessibilityElements` to `[editor, problems]` explicitly, and check the order in the Accessibility Inspector.
Placement itself is Maren's.

**L6. The UI test covers the tap path only.** CompletionUITests.swift:57 accepts by tap. Return, Tab, Escape, the
arrows and Undo after an accept have no test. "print" is in both the jedi and the fallback answer, so the test does
not show that jedi answered. Fix: add a hardware-keyboard Return accept and one Undo (L1), and assert a module member
after a dot (`math.ta` offers `tau`), which only jedi or a loaded module gives.

**L7. The contract text does not list "stopping".** EditorTooling.swift:23-29 and editor.py's docstring do not
mention the Swift-only reason `"stopping"`. Fix: add one line to `CompletionAnswer`'s comment.

## T-4261 re-check (M1), 2026-11-13

Reviewed eab2ec4097 (Idris): CompletionPopover.swift, ConsoleEditor.swift, RunestoneEngine.swift, EditorMarks.swift
(the announcement text), CompletionAnnouncementTests.swift. **Verdict: PASS with notes. M1 is met.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: T-4261 re-check (M1), 2026-11-13, scrolls sideways" style="--tw:769px" markdown="1">

| M1 asked | Met? | Where |
|---|---|---|
| Announce when the list appears ("N suggestions, first") | Yes | CompletionPopover.swift:156-161, only when `appearing` (popover had no superview) |
| Not again while filtering | Yes | refine, `move` and a fresh answer over an open list all `render()` with the popover already shown; a list that closed and reopens is new and is said again, which is right |
| After an accept ("print inserted") | Yes | CompletionPopover.swift:93, :101; Return, Tab, the key command and a row tap all go through `accept(row:)` |
| Nothing while VoiceOver is off | Yes | :108, `UIAccessibility.isVoiceOverRunning` guards the post |
| Return-accepts case | Yes, by reading | RunestoneEngine.swift:265-270 refuses the "\n" and runs `accept()` in a main-actor Task, which announces |
| Main actor | Yes | `CompletionController` is `@MainActor`; the Return Task is `@MainActor` |
| Unit test on the announcement text | Yes | CompletionAnnouncementTests (open once, filter adds nothing, accept adds "print inserted"); EditorMarksTests checks "1 suggestion" / "N suggestions" and nil for no rows |

</div>


**No double speech after an accept.** Traced in the vendored Runestone: `TextView.replace` goes to
`TextInputView.replace(_:withText:)` (TextInputView.swift:1347-1352), whose `replaceText` moves the caret to the end of
the inserted word (:1533) and fires `textInputViewDidChange` (so `changed()` sets `editedSinceSelection`) before
`textInputViewDidChangeSelection`, which the engine then skips as typing. The controller's following
`engine.selectedRange =` sets the same range, and Runestone's setter notifies only on a change (:53-54). So VoiceOver
hears "print inserted" and no caret announcement.

Run: host `swift test` of Core at eab2ec4097, EditorMarksTests 15/0 (tools/swift_test_head.py). I did not run the
Simulator suite: my copy has no generated Xcode project or Vendor tree. Idris's commit records CompletionAnnouncementTests
and five other suites 52/0 on a local iPhone 17e; I have not re-run that.

### Low

**N1. The test cannot see the post.** `announce` appends to `announced` before the VoiceOver check (:107-108), so
deleting the `UIAccessibility.post` line, or the `isVoiceOverRunning` guard, leaves CompletionAnnouncementTests green
(read, not run as a mutant). Removing either announcement call, or announcing on every render, does turn it red. Fix:
give the controller a `post: (String) -> Void` and a `voiceOverRunning: () -> Bool` (defaults: UIAccessibility), and
test both gate states.

**N2. Return itself is still untested.** The test calls `accept()` directly; the "\n" interception at
RunestoneEngine.swift:265-270 has no test (my L6 stays open).

**N3. Not heard on a device.** Nobody has listened with VoiceOver on: the accept announcement posts right after the
keyboard's own "Return" echo, and VoiceOver may cut one with the other. One manual listen on the next device build
would settle it.
{% endraw %}

</div>
