---
layout: "default"
title: "Review of c0e4a0f0b7: Go to Line&#x27;s open-then-jump in ConsoleModel, and the export names the widget&#x27;s own project"
section: "documents"
description: "Safe to ship. openAt does what screens.md says in every case I could build by reading: a refused save, a gone file, a race, and a repeated request. The export header now names the widget&#x27;s own project, and the tests\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4193-c0e4a0f0-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4193-c0e4a0f0-odalys.md</code></span></div><h1>Review of c0e4a0f0b7: Go to Line's open-then-jump in ConsoleModel, and the export names the widget's own project</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-5440, Commandment 13). Author: Idris. Reviewed: c0e4a0f0b7 as a whole, the only app-code commit
of the T-4193 merge that landed at 504705b48e; this review also covers T-0337. The files: `App/PyWidgetApp.swift`
(`ConsoleModel.openAt(_:line:)` new at `:332-336`, ContentView's Activity destination `:1177` and `openFromActivity`
`:1225-1228`), `App/WidgetActivityView.swift` (`ActivityRequest.project`, `:26`), `Shared/RunLog/RunLogExport.swift`
(`:29`), `Tests/ConsoleEditorOpenTests.swift` (`ConsoleModelOpenAtTests`, `:141-213`), `Tests/Core/RunLogTests.swift`
(`:801-804`), `Tests/WidgetTapRoutingTests.swift` (`:288-292`) and `pywidget/docs/how-it-works/screens.md`. I checked
them against the findings they fix: T-5217 M1 (`docs/reviews/t4182-e20f8c3b-pernille.md`, "nothing fails if Go to
Line stops moving the caret") and T-4697 L1 (`docs/reviews/t4182-a98d0790-pernille.md`, "the export's header names
the editor's project"). I also read the code the change leans on: `openProjectFile`, `saveNow`/`save`,
`ConsoleEditor.Coordinator.lineRequested` and `show`, `RunestoneEngine.goToLine`, `WidgetTapRouting.scriptFile`,
`ProjectStore.projects`/`files(in:)`, the More menu's Activity button (`PyWidgetApp.swift:1145`) and
`Settings/DeveloperMode.swift:198`. 504705b48e itself adds five <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox land notes (T-0337, T-2097, T-4010,
T-4477, T-4286), each "nothing new"; I glanced at them and they hold no code. I read the code and the commit message,
not the author's memory or reasoning. None of the seven files has changed since: `git diff c0e4a0f0b7 HEAD` on them is
empty, and `git log c0e4a0f0b7..main` on them lists nothing, so line numbers hold at c0e4a0f0b7, at this branch
(cd98450219) and on main. Date: 2026-11-21.

## Tests run

Host only. The Mac mini is kept clear before the merge-road comparison (ops/state.md, top line), so no Xcode.

- `python3 tests/site_how_it_works_test.py`: 60 passed, 0 failed. Every anchor in how-it-works still resolves.
- The screens.md fingerprints, through `sitegen.how_it_works.check`: ContentView `c702a0832a61` and
  WidgetActivityView `a926289538c1`, both equal to the code now, so neither box is marked "the code changed".
- A mutant table, by reading (not run, see below). Each line says which of the five `ConsoleModelOpenAtTests` fail:
  - `goToLine(line)` removed from `openAt`: `:155`, `:167` and `:204` fail; `:177` and `:190` pass. That is the
    commit's "3 of 5".
  - The guard's path comparison removed, so a line is always asked: `:190` fails (a line asked in the file still open).
  - The `if` removed, so the file is always re-read: `:167` fails (`opens` grows).
  - `LineRequest`'s `id` dropped, so two equal lines compare equal: `:204` fails.
  - `openFromActivity` calls `model.openProjectFile(file)` instead of `openAt`: nothing fails (L1).
  - ContentView goes back to passing the editor's project to WidgetActivityView: nothing fails (L1).
  - The export's " (...)" kept for an empty project: `RunLogTests.swift:804` fails.
- Not run: `ConsoleModelOpenAtTests`, `RunLogExportTests` and `WidgetTapRoutingTests` (Xcode, the mini is held), and
  RunLogUITests. Also not run: whether the save-refused alert still shows when Activity is popped in the same turn
  (`openFromActivity` sets `activity = nil` and then `openAt` sets `saveProblem`). That needs a Simulator or a
  device. The commit's own evidence logs could not be re-read either (L4).

## What the fixes were meant to fix, and whether they do

- **T-5217 M1 (T-5272).** It is fixed at the model, which is the first of the two fixes Pernille's review named.
  Removing the jump now fails three tests. The one-line call from the view into the model is still unpinned (L1).
- **T-4697 L1 (T-4801).** Fixed. The header's project is now the folder of the widget's own file
  (`ActivityRequest.project`). Project files are flat: `files(in:)` lists only a project's own `.py` files, and
  `projects()` only the root's folders. So that folder is always the project, Recovered included. A widget with no
  file (`file == nil`) gets no brackets. A widget whose script is an example or a scratch text opened from the More
  menu has `projectFile == nil`, so it also gets no brackets, which is right.

## The cases asked about

- **The current file's save is refused.** `openProjectFile` returns at `guard saveNow()`. `projectFile` stays on the
  old file, so the guard in `openAt` fails and no line is asked. `save` sets `saveProblem` (the window's alert) and a
  console line. Correct, and `:190` pins it. One note on that test: its two models are not in `ConsoleModels.app`,
  so w1's save does not reach w2 through `fileSaved`. In the app it would, and w2 would take the new text if it had
  no edits yet. The refusal in the test is still a real refusal, so this does not weaken it.
- **The file was deleted or renamed.** `projectStore.read` throws, the console says "Couldn't open …", `projectFile`
  stays and no line is asked. Correct, but nothing pins this case; the refused save is the only failed open tested.
  If the gone file is the one already open, no open is tried and the line goes into the editor's own text of that
  same file. That is not a different file. Whether that text still matches the run is T-5273, which stays open.
- **Two requests race.** Everything here is on the main actor and `openProjectFile` reads synchronously, so two
  calls run one after the other and the last one wins. The editor's `show` queues texts (latest wins) and calls
  `lineRequested()` when an open ends. That function waits for `opening == nil` and `engine.text == model.source`, so
  the surviving request lands on the surviving file's text. If the second request's open fails, the first request
  (not yet applied) lands on the first file, which is still the one open. That is right.
- **The same request twice asks twice.** Each `goToLine` makes a new UUID, and the coordinator's `jumped` makes each
  request apply once. Two taps jump twice, both to the line asked; that is the intended behaviour. I found no path
  where one request is applied twice. One residue: `lineRequest` is never cleared, so a new Coordinator on the same
  model would apply the last request again, perhaps in another file. ConsoleEditor sits at a fixed place in
  ContentView's body and the model belongs to its window, so nothing builds a second Coordinator today. This is not
  a finding. Clearing the request when a file opens would close it for good.
- **ActivityRequest.project for a file outside any project.** The route never returns one: `scriptFile` searches
  only `projects()` × `files(in:)`. The menu passes `model.projectFile`, which only ever comes from a project. So the
  folder is always a project, or "" for nil. The stale case is L2.
- **The export's first line.** `"<app> activity: <id>"`, plus `" (<project>)"` only when the project is not empty.
  It matches the doc comment at `RunLogExport.swift:6`, screens.md, and the test at `RunLogTests.swift:804`.

## Findings

No must-fix and no should-fix.

### L1 (Low): the view's two wires into the fixed code are still unpinned

- Where: `App/PyWidgetApp.swift:1227` (`model.openAt(file, line: line)`) and `:1177` (`project: request.project`).
- Failure case: replace `:1227` with `model.openProjectFile(file)`. Every unit test passes. RunLogUITests' Go to
  Line check (`UITests/RunLogUITests.swift:224-232`) passes too, because the link path's `route` already opened
  main.py at `:1212` before Activity showed. It asserts only the main.py bar, so a person would land at the top of
  main.py with every test green. Likewise, put the editor's project back at `:1177` and nothing fails.
- The commit's Plain line says the test proves Go to Line "lands on the failing line". What the tests prove is
  smaller: the model asks for the line (ConsoleModelOpenAtTests), and a line asked during an open lands on the new
  text (ConsoleEditorOpenTests). The tap to the model to the caret is not proven end to end.
- Fix, when Xcode is free: have the RunLogUITests Go to Line step read the caret's line, as
  `UITests/EditorCaretUITests.swift` reads the caret. Pernille's review accepted the model move alone, so this is
  Low. Board line: none (Low).

### L2 (Low): the brackets are fixed when Activity opens, so a renamed or deleted project keeps its old name

- Where: `App/WidgetActivityView.swift:26`, and screens.md's "a widget that no project on the device declares any
  more gets no brackets".
- Failure case (iPad, two windows): window A shows Travel's widget Activity. Window B renames Travel to Trips, or
  deletes main.py. Export in A still writes `(Travel)`, because `request.file` is the URL found when the screen
  opened. Go to Line handles the same stale URL correctly: the read fails and the caret stays.
- Fix: say "when the screen opened" in screens.md, or work out the project again at Export. Board line: none (Low).

### L3 (Low): WidgetActivityView still takes the project apart from the request

- Where: `App/WidgetActivityView.swift:102` (`init(request:project: String = "")`) and
  `App/Settings/DeveloperMode.swift:198`.
- Failure case: Developer Mode's Activity builds `ActivityRequest(widget: id, failedOnly: false)` with no file and
  no project. Its export header has no brackets even when a project here declares the widget. Before this commit it
  wrote "()". Any future caller can pass a `project` that disagrees with `request.file`, which is the T-4697 L1 bug
  again in a new place.
- Fix: drop the parameter and read `request.project`, or make it the default. Board line: none (Low).

### L4 (Low): the commit's evidence logs are not on disk

- The commit cites `ops/runs/xcodebuild-20261121-113836.log` (the 3-of-5 red), `-114826.log` (unit filters 311/0)
  and `-115309.log` (RunLogUITests 2/0). None of the three is in `ops/runs/` of the main checkout, of lane a2 (which
  goes from 4:21 PM on), or of any other worktree in `git worktree list`. They were most likely pruned. The reports
  are built from these evidence links, so a reader cannot check them now. My mutant table agrees with "3 of 5". The
  green runs I could not re-read.
- Fix: none for this commit. For later ones, copy the cited log's summary lines into the board note when it lands.
  Board line: none (Low).

## T-0337

T-0337's work is not in this merge, and it needs none. T-0337 is Wrenna's research task: check the revenue memo's
five [recall] tags against Apple's public pages. Its rows are already on main as 8047d2f71c and a2830f3ad2. Its board
line reads 3 of 5 rows done (R1 corrected, R2 and R5 apple-page), with R3 and R4 still open. The merge's only T-0337
content is 504705b48e's lane-outbox note: a lane-a2 land re-check that found "nothing new". So this merge neither
lands nor covers any of T-0337's work. R3 and R4 stay open on its own line. The note adds to a run of identical land
reds that its board line already names: the land item keeps being offered for that ref.

## Verdict

**Safe to ship.** `openAt` does what screens.md says in every case I could build by reading: a refused save, a gone
file, a race, and a repeated request. The export header now names the widget's own project, and the tests catch
removal of the jump, of the guard, of the request's id and of the empty-project rule. L1-L4 are Low and get no board
lines. The Xcode and device runs above are not run, because the mini is held.
{% endraw %}

</div>
