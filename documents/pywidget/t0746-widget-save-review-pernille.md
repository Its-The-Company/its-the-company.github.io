---
layout: "default"
title: "T-0746: review of a29b3e5d, the editor&#x27;s save to widgets/&lt;id&gt;/main.py"
section: "documents"
description: "One High and three Mediums. The atomic write, the refusal order, &quot;refused project save writes nothing&quot; and &quot;scriptSaved once per writing save&quot; all hold, and the tests for those would fail on the bugs they name. The High\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0746-widget-save-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0746-widget-save-review-pernille.md</code></span></div><h1>T-0746: review of a29b3e5d, the editor's save to widgets/&lt;id&gt;/main.py</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-29. Commit a29b3e5d on idris/t0355-projects (T-0684 a, freeze row F19).
Files: `App/Projects/WidgetScriptSave.swift`, `App/PyWidgetApp.swift` (ConsoleModel.saveNow, widgetSave),
`Tests/WidgetScriptSaveTests.swift`, ADR-007 s5.1 placement-limit note. I read the diff and the code it calls
(`Shared/WidgetID.swift`, `App/Device/DeviceSupport.swift`, `App/Editor/RunestoneEngine.swift`,
`Shared/WidgetPlacement.swift`, the runner's sys.path setup) on the branch, and `App/Bridge/WidgetWriter.swift` and
`RunResultSink.swift` on main. I did not build or run anything. I checked the regex against the cases below with
Python `re`, which reads this pattern the same way ICU does (`/tmp` script, not committed).

The first thing that breaks is not the write. The write is fine. It is the mapping meeting autosave.

## Verdict: fix first

One High and three Mediums. The atomic write, the refusal order, "refused project save writes nothing" and
"scriptSaved once per writing save" all <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, and the tests for those would fail on the bugs they name. The High
puts permanent junk widgets into the Home Screen picker during ordinary typing, starting with the first thing the held-id
message tells a new user to do.

## High

**H1. Autosave turns every pause while typing an id into a permanent widget, and an id change leaves the old
main.py live.** `WidgetScriptSave.swift:52-76` maps whatever literal the text holds at save time;
`PyWidgetApp.swift:301` saves after a 600 ms pause; `PyWidgetApp.swift:322` sends every save through it. The editor
pairs quotes (`RunestoneEngine.swift:431`, `"` inserts `""`), so the literal is closed after one keystroke.
Concrete failure: new project from the template, the console says "give Widget() an id of its own"
(`WidgetScriptSave.swift:55`), the person selects `new_widget` and types `weather`, pausing once after `wea`. The
saves make `widgets/wea/main.py`, then `widgets/weather/main.py`. With the merge line in place each one also starts
a widget run (`WidgetWriter.scriptSaved` -> `refresh`, main `WidgetWriter.swift:99,116`), so `wea` gets a tree.json too.
`widgets/wea/` now:
- is listed by `WidgetLibrary.ids()` and so offered in the widget's edit sheet (`WidgetPlacement.swift:110,117`)
  and the Shortcuts script list (`RunScriptIntents.swift:31,38`);
- holds a key, so a later `Wea` or `WEA` id is refused as "You already have a widget called wea";
- is never removed: deleting the project (`PyWidgetApp.swift:449`) does not touch widgets/, and I found no UI that
  deletes a widget folder.

The deliberate case is the same bug: rename `weather` to `tide` and the widget placed as `weather` keeps running the
old script on every <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> with no message anywhere. The doc comment (`WidgetScriptSave.swift:8-11`) lists two projects
sharing an id but not this case, and no test changes the id between saves.
Fix direction (owner's choice): write the widget only on an explicit boundary (Run, leaving the file, scene to
background) rather than every autosave, or keep the id last written for this project file and, when it changes, ask
or remove the previous folder if this file made it. The fix needs a test that saves `wea` then `weather` and checks
what is left in widgets/.

## Medium

**M1. A `Widget("...")` inside a docstring or string literal is taken as the id.**
`WidgetScriptSave.swift:38-40`: the only guard is "no `#` before it on the line". Checked:
`"""Usage:\n    ui.Widget("demo")\n"""\nw = ui.Widget("weather")` gives `demo`;
`s = "Widget('fake')"` on a line before the real call gives `fake`. Failure: the script that declares `weather` is
written to `widgets/demo/main.py` and run as widget `demo` (the sink writes to the request's id, main
`RunResultSink.swift:85`), so the placed `weather` widget never changes and a `demo` widget appears in the picker
(compounds H1). The test comment at `WidgetScriptSaveTests.swift:50` says a docstring mention is not a literal, but
that holds only because the template writes `Widget()` with no quote. Add the docstring and string cases to
`testDeclaredIDForms`. Skipping lines inside triple-quoted strings and string literals with a small tokenizer pass is
enough, or ask the runtime for the id instead of guessing it in Swift.

**M2. Only the saved file is copied, so a multi-file widget project works in the console and fails as a widget.**
`WidgetScriptSave.swift:64,72` writes the one file's text to `widgets/<id>/main.py`. Projects hold several files
(`ProjectStore.swift:178` createFile), and a console run puts the script's folder on sys.path
(`_pywidget_runtime/runner.py:808,814`). Failure: `main.py` does `import helpers` (or opens `data.json`) from its
project. Run in the console, it draws. As a widget, it raises ModuleNotFoundError, because `widgets/weather/` has no
`helpers.py`, and the Home Screen shows nothing new (main `RunResultSink.swift:80-81`, noTree). Saving `helpers.py`
never refreshes the widget either. At minimum, say so in the console when a widget script imports or opens a project
sibling; otherwise copy the project's files, or run the widget from the project folder. Needs a test either way.

**M3. After the merge, every autosave of a widget script starts a widget run, placed or not.**
`PyWidgetApp.swift:352` starts `scriptSaved` on each writing save. On main, `scriptSaved` -> `refresh(_ id:)`
(`WidgetWriter.swift:99,116`) runs Python with budget `stopDeadlineSeconds` (5 s) and does not check
`appRunPending`. The stand-down is only in the multi-id `refresh(_ ids:)`, line 110. Failure: the person types,
pauses 600 ms, taps Run. The console run waits behind the widget run already on the script thread, up to the budget
plus the stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (T-0690's "at most the widget run already started", line 105). The same happens for an id that is placed
nowhere, and for each H1 intermediate id. Debounce the call (the same boundary as H1's fix), or skip ids that
`WidgetWriter.placedNow()` does not list, then add a test that a burst of saves makes one call.

## Low

**L1. The refusal line is said once per window, not per file.** `PyWidgetApp.swift:354-356`: the line starts with
`url.lastPathComponent`, which is `main.py` for every project, and `openProjectFile` (`:279`) does not reset
`lastWidgetRefusal`. Failure: two projects from the template, opened one after the other in the same window. The
second is never told why its widget isn't written. Reset it when a file opens, or put the project name in the key.

**L2. "A refusal writes nothing" is not quite true.** `WidgetScriptSave.swift:60` (`WidgetLibrary.save`) creates
`widgets/<id>/` before the main.py checks (`:65,:68`) and the write (`:72`). If the write fails (disk full, or a
protection-class error), the empty folder stays and shows in the picker as a widget with no script (main
`WidgetWriter.source` returns nil, "no script"). Remove the folder on a failed write if this call made it, or change the
comment at `:16`.

**L3. False negatives from the same pattern.** `C = "#fff"; w = ui.Widget("real")` on one line and
`ui.Widget(  # id\n    "real")` both give nil (checked), so these scripts are silently not widgets. They are rare, but if
M1's fix tokenizes, these come out right at no extra cost.

**L4. Tests and constants.** `testLinkedMainPyIsRefused` (`WidgetScriptSaveTests.swift:145`) still passes with the
`isSymlink` check (`WidgetScriptSave.swift:65`) deleted: `.isRegularFileKey` is false on a link, so `:68` refuses
it too, only with a different message. Assert the message if the link wording matters. `heldID` (`:36`) duplicates
main's `WidgetWriter.unsetWidgetID` (`WidgetWriter.swift:35`). At the merge, one should be defined from the other,
so the hold and the extension's unset id cannot drift.

## What holds

- Refused project save: `widgetSave` is called only after `projectStore.write` succeeds (`PyWidgetApp.swift:318-322`).
  `testRefusedSaveWritesNothing` fails if it moves above the write or into the catch.
- Refusal order: held id first, then the library (`pywidget.` prefix by `.user` origin, key clash against
  `ids()` before `createDirectory`, symlinked folder by `WidgetFolder.url`), then the link and file-type checks. No
  refused id makes a folder. `testRefusedWidgetIDsWriteNoWidget` checks this and the say-once rule (count 3), and it
  fails without the dedupe.
- Atomic write: `.atomic` plus `completeFileProtectionUntilFirstUserAuthentication`, which the extension and a
  background run can read after first unlock. `testWriteIsAtomicReplace` holds a reader on the old inode, so an
  in-place truncate-and-write mutant fails it. No temp file is left behind (`:83`).
- scriptSaved once: one Task per writing save, none on a no-change save, a refusal or a plain script. The tests
  cover all four.
- Merge line: `@Sendable (String) async -> Void = { await WidgetWriter.app.scriptSaved($0) }` will compile. It is a
  single-expression closure whose `Outcome` result is dropped into a Void context, `scriptSaved` is
  `@discardableResult`, `WidgetWriter` is a Sendable struct with a nonisolated static `app`, and the closure
  captures nothing. It behaves as the commit assumes. `WidgetWriter.source(for:)` reads exactly
  `widgets/<id>/main.py`, a regular file and not a link, which is what this save writes. The run goes through the
  Pro gate and the queue keyed `widget:<id>`, and the sink writes `tree.json` and reloads. Inference, not built.
- ADR-007 s5.1 note: correct. iOS gives the app no placement callback, the extension runs no Python, and the
  editor's save covers only an edited script, not a newly placed widget.

## Re-review of 87b09744 (T-0752)

Reviewer: Pernille, 2026-10-29. Commit 87b09744 on idris/t0355-projects (T-0747 for H1, T-0748 for M1). I read the
diff, the `saveNow` callers, `WidgetID`/`WidgetFolder`/`WidgetLibrary` on the branch, and main's `WidgetWriter.run`
and `RunResultSink` (where a widget run's tree lands). I ran `WidgetScriptSaveTests` in the worktree through
tools/xc.sh: 11/11 passed (ops/runs/xcodebuild-20261029-192510.log in the worktree). I also copied `declaredID`
into a scratch Swift file and ran it on 21 more inputs (`/tmp/t0752/scan.swift`, not committed).

The first thing that breaks now is not the editor. It is a widget run that was already queued for the old id.

### Verdict: merge after the alpha commit

H1 and M1 are closed. There is one new Medium (M4), a race on a path this fix opened, plus six Lows. M4 sits on
main's sink, so it is fixed at the merge with main, alongside T-0750.

**H1: closed.** The 600 ms timer now calls `pauseSave`, which writes only the project file. Every other `saveNow`
caller is a boundary: opening a file (`:280`), an example (`:510`), Run (`:550`), close (`:574`), the scene leaving
`.active` (`:398`), rename and delete for every model (`:471`, `:486`), the Projects button and `ProjectsView.onAppear`.
I found no other way out of the editor that leaves typed text behind: the toolbar's other buttons keep you in the
editor, and opening a new window starts a different scene. `testTypingPausesMakeNoWidget` goes through the real
timer, and a mutant where the pause sends would fail it. On the move: `owned` checks `made` and compares the exact
bytes of a regular, non-link main.py. A pywidget. id or a bad id is refused by `WidgetID.problem` before anything
moves, and a key clash with a third widget is refused before anything moves too. RENAME_EXCL means a move never
lands on top of an existing folder. A widget already using the new id gets the remove branch. A case-only change
renames the folder in place, which works on the Simulator's case-insensitive disk and on the device's case-sensitive
one. When the scene goes `.inactive` (Control Center, a system alert), it can send a half-typed id. The next boundary
moves that folder to the real id, as long as the editor still holds its in-memory record of what it sent.
Crash or <span title="A test written in advance. If it fires, we drop the idea.">kill</span> after typing: the project file is safe, because `pauseSave` wrote it. Only the widget copy can be
stale. See L5.

**M1: closed.** The scan handles every case in my review, plus: a `#` inside a string before the call, `\"` and
`\'` escapes, raw strings ending in an escaped backslash, an escaped quote inside a triple-quoted string, CRLF, a
backslash-newline inside a string, an unterminated string (one-line strings stop at the newline, triple-quoted ones
at end of text), f-strings (a `Widget(` inside `{}` is not taken), PEP 701 nested quotes, `MyWidget`, `class Widget(Base)`,
`x.Widget ('sp')`, `id = 'k'`, and `b''`, `u''` and `'''x'''` ids (nil). All came out right. The scan returns `""` for
`Widget('')`, but `WidgetID.problem` then refuses it as empty, so nothing is written. Leftovers are in L9.

### Medium

**M4. A widget run already queued for the old id puts the moved folder back.** `WidgetWriter.run` (main,
`WidgetWriter.swift`) reads `widgets/<id>/main.py` *before* it queues the run. `RunResultSink` (main `:87-88`) then
calls `createDirectory` for `widgets/<id>/` before it writes tree.json. As I read it, Run's `widgetSave` starts the
`scriptSaved` Task only after `run()` has queued the console run. That puts the widget run behind the console run.
Failure: the id is `weather`, and the person taps Run on a script that waits on `input()` or animates. While that
run is live, they change the id to `tide` and tap Projects (or leave the app). `send` moves `weather` to `tide` and
the console says a placed weather widget "has no script". Then the console run ends, and the queued `weather`
run runs the old text. The sink recreates `widgets/weather/` with a tree.json and no main.py. That folder is listed by
`ids()`, offered in Edit Widget and Shortcuts, and holds the `weather` key. Nothing removes it. A placed weather
widget keeps the old drawing, which contradicts the console line. The same happens whenever a widget run for the old
id is still going (a cold interpreter start) at the moment of the move. This is H1's second half back again, through
a race. It is no worse than before this commit, but the fix claims it is closed. Fix direction (owner's choice): for
a user id, the sink writes tree.json only into a folder that already exists (it creates the folder only for a bundle
premade). Or the move waits for, or drops, the old id's pending run. Test: send `weather`, hold its run, change the
id to `tide`, let the run finish, and check that `widgets/weather` does not exist. This lands at the merge with main.

### Low

**L5. After a crash between a pause and a boundary, the widget stays on the old script, and Run does not fix it.**
`openProjectFile` sets `widgetText = text` (the text read from disk), so a boundary only sends text typed *since the
file opened*. Failure: type, pause (the project file is saved), then the app crashes before any boundary. On relaunch
the file opens with the new text, Run sends nothing, and the widget runs the old script until the next keystroke.
Nothing says so. This is rare: leaving the app is a boundary, so a background kill or a swipe-away is covered.
Seed `widgetText` with nil, or with the bytes now in `widgets/<declaredID>/main.py`, so the first boundary after
opening compares against the widget and not against the file.

**L6. A refused send still counts as sent.** `save(widget:)` sets `widgetText = text` before `widgetSave`. So a
transient refusal ("couldn't be moved", "The widget folder isn't available.", a failed write) is not retried by the
next Run. The only retry is after the next edit. Set `widgetText` only after an outcome that is not `.refused`.

**L7. A refusal after the move leaves the record pointing at a folder that has gone.** The move or remove happens
before `library.save`, the main.py link and file checks, and the write. If any of those refuses, `send` returns
`last` unchanged. Remove branch: the old folder is gone and nothing was written. Move branch: the folder sits at the
new id with the old text, and the next send marks it `made: false`, so a later id change leaves it. Reaching this
takes a link or a directory named main.py in the target folder, or a full disk. Return the new id's `Sent` once the
move is done, or check the target's main.py before moving.

**L8. The remove branch overwrites another widget's script, and the console line does not say so.** The overwrite
itself is the documented rule (when two projects share an id, the later save wins). But the console line names only
the old id ("Its widget wea went with it"). The person is not told that `tide`'s main.py now holds this script. It
also covers a duplicated project: two files with identical bytes both pass the `owned` byte check, so A's id
change moves the folder that B also feeds. B is not told, and it does not resend until B is edited. A line like
"The widget tide had a script of its own; it now runs this one" is enough (copy DRAFT, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>).

**L9. Scan leftovers.** `ui.Widget(  # id\n    "real")` still gives nil: `skipSpace` does not skip a comment, so
half of my old L3 is still open. `Widget("wea" "ther")` and `Widget("wea" + s)` give `wea`, while the runtime id is
`weather` or something computed. The script is still written to `wea` and the sink writes to the request's id, so the
widget works, but under an id the script does not declare. Both are rare.

**L10. Test gap.** `testIDChangeMovesTheFolderThisEditorMade` uses a `Calls` stub that writes no tree. So M4's
race cannot show up in it, and no test covers a refusal after a move (L7). Add both with the M4 fix.

### The accepted items

None of them needs to go above Low.
- The in-memory record after relaunch: Low. Note that the record also resets when you open a *different* file
  (`openProjectFile` clears `widgetSent` when the path changes). So A, then B, then back to A, then an id change
  leaves A's old folder. That is wider than "after relaunch", but the console says so and nothing runs the wrong
  script.
- Deleting a project leaves its widget folder: Low. Not new, and the folder holds the script the widget runs.
- T-0750 stays as filed (P2). This commit shrinks it: sends happen only at boundaries, and Run's widget run now
  queues behind the console run instead of ahead of it. Whoever fixes it at the merge should fix M4 in the same
  pass, because both are about widget runs for an id that is no longer current.
{% endraw %}

</div>
