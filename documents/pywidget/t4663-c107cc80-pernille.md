---
layout: "default"
title: "Review of T-4663 at c107cc80: completion ignores letter case and small typos"
section: "documents"
description: "The change does what the Investor asked: case-insensitive matching, exact case first, typos of four letters or more, and the whole word replaced with the name&#x27;s own case. Ranking is deterministic and agrees with\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4663-c107cc80-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4663-c107cc80-pernille.md</code></span></div><h1>Review of T-4663 at c107cc80: completion ignores letter case and small typos</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4872, Commandment 13). Author: Idris. Reviewed: c107cc80d1 (ios/App/Editor/CompletionList.swift,
ios/App/Editor/CompletionPopover.swift, ios/Tests/Core/CompletionListTests.swift, ios/Tests/EditorToolingTests.swift,
docs/how-it-works/editor.md). Also read, for what the change leans on: python/pywidget_tooling/editor.py (`_complete_jedi`,
`_fallback_names`, `_fallback_complete`, MAX_ITEMS), App/Editor/EditorTooling.swift `complete` (which path answers when),
App/Editor/EditorMarks.swift (the VoiceOver strings). Paths are under pywidget/. None of these files changed between
c107cc80d1 and HEAD 49521cddbd. Date: 2026-11-18.

What I ran (code reading only, no Xcode build or Simulator: the slot is Idris's for T-4662):
- `_fallback_names` from editor.py on the host (Python 3.9, the repository's own file): "x = P" gives
  PendingDeprecationWarning, PermissionError, ProcessLookupError, and no print; "os.P" gives only upper-case names (M1).
- `dir()` of the larger stdlib modules on the host, counted by first letter in any case, to see whether a one-letter ask can
  reach MAX_ITEMS 200: the most is socket "i" 94, errno "e" 107, os "s" 54, builtins "s" 14 (L1).

## What holds

- Ranking is deterministic and is what editor.md says. `ranked` (CompletionList.swift:125-138) makes one pass and keeps the
  answer's order inside each group; jedi's answer is itself sorted (dunder and underscore names last, then by lower case),
  and the Swift cold list is sorted at :289-298. Exact-case prefix, then other-case prefix, then near matches; near rows only
  when no name starts with the word in any case and the word is not itself a name; at most 5.
- No regression for jedi rows. The old refine already matched them in lower case; the only change for them is that rows typed
  in the right case move up. After a dot the word is empty, every row is `.exactCase`, and the order is jedi's, as before.
- Accepting writes the whole word. `refine` (:75-80) sets every row's replace span to anchor..caret, and `edit(caret:)`
  writes the label over it, so "pirnt" and "Pri" both become "print", "__ini" becomes "__init__", and a non-ASCII name is
  written in UTF-16 without cutting a character (`wordStart` counts every non-ASCII unit as a name unit, and `hasPrefix` and
  `dropFirst` count Characters on both sides).
- Short words do not flood. Near matches need 4 letters (`nearMinLength`), so "i" and "x" get only prefix rows. "pirnt" finds
  print in both the jedi list and the cold list.
- Asking after the first letter gives a superset of the full-word ask on the jedi path: jedi's own filter is a
  case-insensitive prefix match, so every name the full word would match also starts with its first letter. Dunders after a
  dot: "obj.__" is now asked as "obj._"; single-underscore names come back too, but none of them starts with "__", so the
  rows the person sees are the same and in the same order.
- `match` cannot index out of range: the window is `k <= l.count`, and `max(1, n - 1)...(n + 1)` is never empty for n >= 4.
  `editDistance` is a correct optimal-string-alignment table.
- VoiceOver: the opening announcement ("N suggestions, first") and "print inserted" are unchanged and still right in count
  and name.

## Findings

### M1 (Medium): in Python's fallback answer the first-letter ask is matched case-sensitively, so "Pri" offers nothing

editor.py:320 keeps a fallback name only when `n.startswith(word)`. Since this change the word Python sees is just the first
letter (CompletionPopover.swift:125, CompletionList.swift:165-170), so when the warm worker falls back (reason "budget",
"error" or "unavailable", editor.py `_answer`), "x = Pri" is asked as "P" and the answer holds only PendingDeprecationWarning,
PermissionError and ProcessLookupError; `refine` then finds nothing for "Pri" and the list closes. After a dot, "os.Pa" loses
path the same way. It is not worse than before for that mode (a full-word "Pri" was also case-sensitive there), but it is now
the one place where editor.md's "Suggestions ignore letter case" is not true, and the first-letter ask makes each jedi call
build more rows, so a "budget" fallback is a little more likely than it was.
Fix: editor.py:320 `if n.lower().startswith(word.lower()) and n not in seen and n != word:`; with a mixed-case match,
`insert` at :334 must be `""` rather than `label[len(word):]` (as `_complete_jedi` does at :373-377). Test in
tests/tooling/test_editor.py: `_fallback_names("x = P", "x = P")` contains print, and "import os\nos.P" contains path.

### M2 (Medium): the per-keystroke match does near-match work on every row, even when it will be thrown away

`ranked` runs on every keystroke and every caret move (`refine`, main actor). For each row without a prefix match, `match`
(:110-120) builds two Character arrays (`word.lowercased()` is redone for every row), and for a word of 4 or more letters runs
the full OSA table up to 3 times, allocating a new row array for each letter (:149). The "same first letter" guard no longer
filters anything, because asking after the first letter means every row shares it. And the near results are discarded at
:137 whenever any prefix row exists, which is the usual case. My estimate (not measured): with a 200-row answer and a
20-letter word, about 200 x 3 x 20 x 21 = 250,000 Character comparisons and about 14,000 small allocations per keystroke,
which is a few milliseconds on an older iPhone in a Release build and more in Debug. That is not a hang, but a 120 Hz frame is
8 ms, and the cost grows with the square of the word's length, with no upper limit.
Fix: (1) build the lower-cased labels once in `CompletionList.init` (the answer does not change between keystrokes) and the
lower-cased word once per `ranked` call; (2) do the prefix pass first, and run the near pass only when both prefix groups are
empty and the word is not a name; (3) replace the table with a banded one-edit check (walk both strings to the first
mismatch, then compare the remainders for a substitution, insertion, deletion or swap): O(length), no allocation. Add a
`measure` test: 200 rows sharing a first letter, a 30-letter word.

### M3 (Medium): no test catches the popover asking at the caret again, or the jedi path with a one-letter ask

The typo feature on the warm path rests on one line, CompletionPopover.swift:125. If it went back to `self.ask(text,
caret)`, every test in the commit would still pass: `testAskOffsetIsAfterTheWordsFirstLetter` tests the helper, not that the
controller uses it, and the "pirnt" checks run against a hand-made answer or the Swift cold list. On the device, jedi asked
"pirnt" answers nothing and the list stays shut, which is exactly the bug the Investor reported. Nothing exercises jedi with
a one-letter ask either.
Fix: (a) a CompletionController test with a fake `ask` (the type takes one in init) that records the offset and checks it is
`askOffset` for "x = pirnt"; or, if building a controller in a unit test is too heavy, move "the offset to ask" into a
static that the controller calls and the test calls with the same text. (b) A host test in tests/tooling/test_editor.py,
warm: `complete` at the first-letter offset of "x = pirnt" contains print, and of "import os\nos.Pa" contains path.

### L1 (Low): one-letter asks can be cut by MAX_ITEMS 200

editor.py:368 keeps the first 200 of jedi's sorted answer. A full-word ask rarely got near that; a one-letter ask holds
every name with that letter. The largest stdlib counts I found are about 100 (errno "e", socket "i"), so this is far off for
now, but a module with a few hundred names on one letter, or a star import, would drop the later names, and they would be
missing from the list even when typed in full. Fix: in the popover, when the answer holds 200 rows and the word is longer
than one letter, ask again at the caret and put that answer's prefix rows first; or pass the whole word to editor.py and
apply the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> after a case-insensitive prefix filter in Python.

### L2 (Low): rules the tests do not pin

- The "word is itself a name" rule (`typedName`, :129 and :137): in `testNearMatchesStayFewAndOnlyWhenNothingStartsWithTheWord`
  the second assertion still passes without it, because "prints" and "printer" keep the prefix groups non-empty. Pin it with
  an answer of ["print", "pront"] and the word "print": the list must close.
- Dunder ranking: "__in" against an answer holding "_init" and "__init__" (only the dunder shows).
- A non-ASCII name written in its own case ("grö" over an answer with "Größe"), and `askOffset` on a word starting with a
  decomposed letter ("e" + U+0301): the current test uses a precomposed "é", where the composed-sequence call changes
  nothing.

### L3 (Low): VoiceOver hears nothing when the rows turn into typo guesses

The list announces itself only when it appears (CompletionPopover.swift:160-165). Typing on from "prin" to "prinx", the
rows change from names that start with the word to near matches and the list stays open, so a VoiceOver user is not told
that Return will now replace the word with a guess; before this change the list closed there. Fix: announce again when the
visible rows change from prefix rows to near rows, for example "Did you mean print", and say "pirnt replaced by print"
rather than "print inserted" when the accepted row did not start with the word (EditorMarks.swift:201-203).

### L4 (Low): Return accepts a near row without the person choosing it

A near row is selected by default, so Return at the end of a line replaces a word one letter away from a known name. A name
jedi knows is safe (the `typedName` rule), so this bites only names jedi cannot see, for example ones a script gets at run
time. VS Code behaves the same, so this is a product choice rather than a bug; worth a word with Maren. Option: with only
near rows showing, Return makes a new line and Tab or a tap accepts.

### L5 (Low): editor.md says "one small typo away" where the code means "starts with something one typo away"

`match` compares the word with the label's first n-1 to n+1 letters, so "prinx" matches every name starting with "prin", and
the first-letter check is case-insensitive. The near cap keeps the first 5 in the answer's order, not the closest. A
sentence in "Each name is matched" would make the page exact. I have not edited editor.md (Idris has it open for T-4662).

## Verdict: PASS with findings

The change does what the Investor asked: case-insensitive matching, exact case first, typos of four letters or more, and the
whole word replaced with the name's own case. Ranking is deterministic and agrees with editor.md. No High finding. Three
Mediums go to Idris as follow-ups: M1 (Python's fallback still matches case-sensitively), M2 (per-keystroke cost: cheap to
make bounded), M3 (the line that makes the warm path work has no test). None blocks TestFlight; M3 should land before the
next change to the popover.

## Addendum 2026-11-19 (T-4922): what changed since c107cc80, and whether the verdict holds

Read `git diff c107cc80d1 HEAD` over every file above. Three changed:
- python/pywidget_tooling/editor.py, 6bb220c5c1 (T-4873, Idris): M1's fix. `_fallback_names` now matches
  `n.lower().startswith(word.lower())`, and a row that does not extend the typed text as written gets insert "". The Swift
  side recomputes insert in `refine` (CompletionList.swift:78) anyway, so rows still replace the whole word. Re-ran my M1
  probe on the host: "x = P" now holds print, "os.P" holds path. M1 is closed. The list is still sorted case-sensitively
  before the MAX_ITEMS cut, which is L1 as written, not a new finding.
- App/Editor/EditorMarks.swift (T-4771, T-4783): gutter-mark drawing and line moves only; `typedWord`, `listOpen` and the
  completion VoiceOver strings are unchanged.
- docs/how-it-works/editor.md (T-4662, T-4892): adds the caret half of the page; the completion sections are unchanged.

Verdict holds: PASS with findings. M2 and M3 stay open as T-4874 and T-4875. No new finding.
{% endraw %}

</div>
