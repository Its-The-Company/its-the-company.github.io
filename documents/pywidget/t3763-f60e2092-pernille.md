---
layout: "default"
title: "Review of f60e2092: T-3763, a widget tap opens the file the widget runs when two files declare its id"
section: "documents"
description: "When the widget&#x27;s own main.py (widgets/&lt;id&gt;/main.py in the App Group, the text the last send wrote) holds the bytes of one of the files that declare the id, the tap opens that file, whatever the Finder order and whether\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3763-f60e2092-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/reviews/t3763-f60e2092-pernille.md</code></span></div><h1>Review of f60e2092: T-3763, a widget tap opens the file the widget runs when two files declare its id</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4068, Commandment 13). Author: Idris. Reviewed: f60e209214 (WidgetTapRouting.swift,
WidgetTapRoutingTests.swift), checked against today's main (e9ab157a), where four later commits touch these files:
cb4bce57e4 (T-4515, a premade's focus row), 5874325758 (T-3765, the fixes for my first review's L1 and L2),
53c5f25f42 (T-0048, the Activity link), a16af47842 (T-4679, the launcher premades in the Gallery test). The author's
memory files and board notes were not read. Also read, for what the ranking depends on: WidgetScriptSave's send
(the bytes it writes as main.py, the one-folder-per-key rule, `.sent.json`), ProjectSendPlan.record,
ProjectStore.read, WidgetFolder.url, WidgetWriter.source and PyWidgetApp's `route(_:)`. Line numbers are at e9ab157a.
Paths are under pywidget/ios/. Date: 2026-11-20.

Why this file is written now: my commit c0e26ead25 (11-16) says I reviewed this commit, PASS with findings, but it
carried only <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> outbox files, and no review file reached main or any branch. That 11-16 review's findings survive
in two places I can point to: T-3765's commit message (5874325758, "T-4068 L1" and "L2", both fixed) and board line
T-4638 ("finding L3", the scan's cost on the main thread, open). This file is a new review against today's code,
not a recovered copy; its finding numbers are new and do not reuse L1-L3.

## Tests run

- Simulator, MacBook runner only (no local run): `XC_TASK=T-4068 tools/xc.sh -project PyWidget.xcodeproj -scheme
  PyWidget -destination 'platform=iOS Simulator,name=iPhone 16' -only-testing:PyWidgetTests/WidgetTapRoutingTests
  test`, queued as J-20261120-0645-xc-test at e9ab157a (job file committed in 3a67e841dc).
  Result: 15 executed, 0 skipped, 0 failures, exit 0 (runner log ops/runs/xcodebuild-20261120-064958.log, on
  the MacBook). All fifteen WidgetTapRoutingTests cases, the five T-3763 ones and the three T-3765 ones among them.
- Two earlier tries of the same command from the repository root ran here, not on the runner (xc_route answers
  "local" when not run from pywidget/ios), and stopped in xcodebuild before building anything: exit 66 (no
  project) and exit 70 (no destination). No result; listed so the logs (ops/runs/xcodebuild-20261120-064344.log,
  -064401.log) are explained.
- Swift mutants were not run. The runner runs committed jobs at origin/main, so a mutant would have to be pushed;
  I traced each from the code and the tests instead (below). No phone run.

## Verdict: PASS with findings

When the widget's own main.py (widgets/<id>/main.py in the App Group, the text the last send wrote) holds the bytes
of one of the files that declare the id, the tap opens that file, whatever the Finder order and whether or not it is
a copy. That is the common case, and it is exact: the send writes `Data(text.utf8)` of the editor's text as main.py
(WidgetScriptSave.swift:309, 333-336) and the routing compares `Data(text.utf8)` of ProjectStore.read's String
(WidgetTapRouting.swift:69-71), the same decode on both sides. One folder per key (WidgetScriptSave.swift:290) means
only one main.py can match; the spelling loop (:79) reads the tap's spelling first, then each declared one, which
is right on the device's case-sensitive disk and is now tested through the `readSent` seam (:64). Links are not
followed (:122, and WidgetFolder.url refuses a linked folder), matching WidgetWriter.source, so the routing reads
exactly the file a run would.

So "always the file the widget runs, never the other one" holds while main.py matches a file. It does not hold in
one case: when no file's bytes equal main.py (the running file was edited and its send refused, or the app was
stopped before the boundary's send) and two non-copy files in different projects declare the id, the tap opens the
Finder-first one, which may be the other file (L1). An edit there is sent over the widget at the next boundary.
That case needs two original files with one id and a stale main.py, so I rate it Low, not a blocker.

Renamed, deleted, unreadable, traced:
- Renamed file or project: still found; the scan reads every .py and main.py still matches its bytes.
- Renamed widget id (the declared id changed, the placed widget still has the old one): no file declares the old
  id, so Projects. A case-only change is matched by `WidgetID.key` and the spelling loop. Fine.
- Deleted file, nothing else declares the id: Projects (tested, :93-95). Only a Recovered or conflict copy left:
  opened only if its bytes equal main.py, else Projects (tested, :164-177). Fine.
- Unreadable file (a non-UTF-8 .py, or one ProjectStore.check refuses): `try? store.read` skips it silently (:69),
  so the tap opens the next candidate or Projects. The running file cannot be non-UTF-8 at send time (it was
  sent from the editor's String), so this mostly matters for a file that became unreadable later. Not tested (L2).

Do the tests fail when the choice is undone (traced, each against the test that would see it):
- Step 1 dropped (the main.py match): testTheFileWhoseBytesEqualMainPyIsOpened expects Zeta's file. Killed.
- Step 2 dropped (copies not ranked down): testAConflictCopyThatSortsFirstIsNotOpened; the copy wins, then the last
  line returns nil, so the tap is Projects, not clock.py. Killed.
- The last line returning `best.file` always: the Recovered test expects Projects first. Killed. Returning only
  `!best.copy ? best.file : nil`: the last assertion of the bytes test (the copy holds the sent text). Killed.
- sentScript returning nil (main.py ignored): the bytes test. Killed.
- Spelling order or the `where sent == nil` stop: testADeclaredSpellingFindsMainPy... pins the exact reads. Killed.
- isCopy loosened (any digits, any suffix): testWhatCountsAsACopy and testEverySaveCopyNameCountsAsACopy. Killed.
- `DevicePath.isSymlink` dropped from sentScript: survives, as an equivalent mutant. The `isRegularFile` check
  that follows reads the link itself, so the link is still refused: a scratch `swift` probe outside the repo
  printed `isRegularFile false, isSymbolicLink true` for a link to a regular .py. Belt and braces; no finding.
- Project and file-name comparisons swapped in `pick` (:89-92), or either replaced by a plain `<`: survives. No test
  has two originals whose project order and file order disagree (every two-original test uses clock.py in both
  projects). Only the tie-break order among originals is at stake, which is cosmetic once L1 is fixed (L2).

Timing: none of the fifteen tests waits, sleeps, reads a clock or runs work off the main thread. Each test gets its
own UUID-named temporary root and widgets/ folder, so parallel runs do not collide. Two things depend on the
environment and are stated as such: the Finder order of "clock (conflict).py" before "clock.py" (asserted as a
precondition at :137, using localizedStandardCompare under the Simulator's locale) and the Mac's case-folding temp
folder (the reason for the seam test). No flakiness expected. The scan's cost on the main thread is board line
T-4638 and is not repeated here.

## Findings

### L1 (Low): with main.py stale, two original files in different projects are ranked by Finder order only

- Where: `App/WidgetTapRouting.swift:84-96` (`pick`), reached when `sent` matches no candidate.
- When main.py's bytes equal no file (a refused send after an edit, or the app stopped before the boundary), and two
  non-copy files in different projects declare the id (WidgetScriptSave.swift:9 allows this by design: "the later
  save wins"), the tap opens the Finder-first file. If that is not the one last sent, the person edits the other
  file and the next boundary sends it over the widget. Both files survive, so nothing is lost, but the tap opens
  the wrong file.
- The send already records which file it was: `.sent.json` in widgets/<id>/ holds `widget`, the source file's name
  in its project (ProjectSendPlan.swift:127-129, WidgetScriptSave.swift:339-341). It does not hold the project.
- Fix: between step 1 and step 2, prefer the candidate whose file name equals `.sent.json`'s `widget` (it settles
  the case whenever the two files have different names); or have the send record the project as well and match
  both. Add a test with two originals, a stale main.py and a `.sent.json` naming the later one.
- Board line: T-5314 (Idris, P2), shared with L2.
- Fixed (T-5314, Idris, 2026-11-25): `pick` gains a step between the copy rule and Finder order. `scriptFile` reads
  widgets/<id>/.sent.json (WidgetScriptSave.lastSent, the same spellings as main.py) and ranks each original by
  `named(_:by:)`: 2 when its name is the record's `widget` and its size and times are still the ones listed (the
  file last sent, whatever its project), 1 for the name alone (edited since), else 0. A copy always ranks 0, so the
  record never outranks the copy rule, and main.py's bytes still come first. Tests:
  `testAStaleMainPyOpensTheFileLastSent` (different names; two clock.py told apart by the listed size and times;
  neither listed falls back to Finder order) and `testARecordNeverOutranksTheCopyRule`.

### L2 (Low): two cases the tests do not reach

- An unreadable candidate: no test puts a non-UTF-8 .py beside the widget's file. Add one that shows it is skipped
  and the readable file (or Projects) opens.
- The tie-break order among originals: no test has two originals where project order and file-name order disagree,
  so swapping the two comparisons at :89-92 passes. Add one (Alpha/zeta.py and Beta/alpha.py, no main.py: Alpha's
  file opens).
- Board line: the same line as L1.
- Fixed (T-5314): `testANonUTF8FileIsSkipped` (a non-UTF-8 clock.py holding the id's bytes is skipped: Projects
  alone, the readable file beside it) and `testProjectOrderComesBeforeFileOrder` (Alpha/zeta.py and Beta/alpha.py:
  Alpha's opens).

## Checked and fine

- The earlier review's L1 and L2 are fixed on main by T-3765 (5874325758): the `readSent` seam with an exact-case
  test, the path-bytes tie-break pinned in both input orders, the symlink cases, and ASCII-only copy digits.
- The Activity link (T-0048, :40-41) uses the same ranking, and a nil file opens the Activity screen over the window
  as it is; a copy-only id therefore never puts a copy under the Activity screen. Tested (:99-110).
- Premade taps (T-4515) do not reach the scan.
- No new outside asset, no network, no generative content (Commandment 6 does not arise).

## Board lines

- T-5314 (L1, L2): the stale-main.py tie and the two missing tests (Idris, P2).
- The scan's cost: T-4638, already on the board.
{% endraw %}

</div>
