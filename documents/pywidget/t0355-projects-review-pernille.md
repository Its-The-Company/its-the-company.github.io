---
layout: "default"
title: "T-0654 review: T-0355 slice 1, container projects (idris/t0355-projects at c59b79aa)"
section: "documents"
description: "Changes requested. Do not merge until H1 is fixed, and M1, M2 and M3 are fixed or have a recorded decision. The store layer is careful: the names, the link refusals, the lstat checks, case-only renames, the write that\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0355-projects-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0355-projects-review-pernille.md</code></span></div><h1>T-0654 review: T-0355 slice 1, container projects (idris/t0355-projects at c59b79aa)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-29. Read from `git diff c59b79aa~1 c59b79aa` in a detached
worktree, without the author's notes. Also read: `App/Runtime/_pywidget_runtime/runner.py` (`_reset`, `_prepare`),
`App/Bridge/pwbridge.c:581`, `App/Editor/ConsoleEditor.swift`, `App/Device/FilesCall.swift` (SystemFiles roots).

Run (iPhone 17 Simulator, through `tools/xc.sh`, `-only-testing` ProjectStoreTests, ProjectRunTests and four probe
tests of mine): `ops/runs/xcodebuild-20261029-045005.log`. The branch's 14 tests pass. All four probes fail, which
confirms H1 (two probes), M1 and M3. The probe file was never committed, and the worktree is gone. The probe
source is at the end of this page so the fix can adopt it.

## Verdict

**Changes requested.** Do not merge until H1 is fixed, and M1, M2 and M3 are fixed or have a recorded decision. The
store layer is careful: the names, the link refusals, the lstat checks, case-only renames, the write that never
recreates a deleted project, and a byte-for-byte migration by rename. The weak spot is the layer above it. Each
window's ConsoleModel acts as if it were the only writer.

Counts: 1 High, 3 Medium, 6 Low.

## High

### H1. Two windows on one project file: the last writer silently wins, and a deleted file comes back
`App/PyWidgetApp.swift:267-279` (`openProjectFile`), `:296-310` (`saveNow`), `App/Projects/ProjectStore.swift:163-172`
(`write` does not check the disk against what was read), `App/Projects/ProjectsView.swift:113-115, 128-129, 212-214,
228-229` (a rename or delete tells only this window's model).

Scenario (iPad, multiple windows are supported since T-0478): windows 1 and 2 both open `main.py`. The person
works in window 1, and autosave writes it. Window 2 still shows the text it read at open. One key typed in window 2
writes that stale text, plus the key, over window 1's work. There is no prompt and no trace. The same gap appears
in two more ways. A file deleted in window 1 is written back by window 2's next autosave (`write` makes any missing
file in an existing project). A file renamed in window 1 comes back under its old name, with stale text, from
window 2. A Python script that writes into its own project (the user roots are all of Documents) collides with
the editor the same way.

Confirmed: `testH1SecondWindowDoesNotOverwriteFirstWindowsSave` (the disk ends as
`"print(\"Hello from main.py\")\nx"`) and `testH1DeletedFileIsNotResurrectedByTheOtherWindow` both fail.

Fix, two parts:
1. Before writing, `saveNow` compares the bytes on disk with `savedText`. If they differ, or the file has gone, it
   does not write. It keeps the text, says so, and offers to save a copy (`main (conflict).py`). This one check
   also covers scripts.
2. A rename or delete goes to every model through `ConsoleModels.app`, the registry `liveRun(besides:)` already
   uses, not just to `model`. The other option is that `openProjectFile` refuses a file another window <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.

Tests that catch it: the two probes below, moved into ProjectStoreTests.

## Medium

### M1. Migration never returns when a long name collides, and Projects freezes on every open
`App/Projects/ProjectStore.swift:183-185`, with the length rule at `:68`.

`while (try? free(name, in: root)) == nil` treats "this name is invalid" like "this name is taken". Take a stem of
63 or 64 characters. If a folder with that name exists, `"\(base) 2"` is 65 or 66 characters, so `free` throws
`badName` on every pass and the loop never ends. The same happens if `contentsOfDirectory` throws. The loop runs
in `ProjectsView.task` on the main actor (`ProjectsView.swift:84, 98`), so the app hangs whenever Projects opens.
No restart clears it, because the file is still there. Likely cases are rare, but the hang is permanent.

Confirmed: `testM1MigrationFinishesOnLongCollidingStem` times out after 5 s. The spinning thread then held the
test runner until xc.sh stopped it.

Fix: shorten the base so the suffix fits. Treat `badName` from `free` as fatal for that file, and leave the file
where it is. Put a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on `n`. Test: the probe, with an assertion that the file ends up in a folder whose name
passes `checkName`.

### M2. Migration runs on every Projects open, not once, and it splits scripts that imported each other
`App/Projects/ProjectsView.swift:84, 98`, `App/Projects/ProjectStore.swift:176-198`.

Documents/Scripts is also what `files.documents()` returns to every script (`FilesCall.swift:178-179`). Any `.py`
file a script writes there later, such as a generated module or a `settings.py` it reads back, gets moved into a
new project folder the next time Projects opens. If the script writes it again, the next open moves it again, to
"settings 2", then "settings 3". The script no longer finds its file where it put it. Nothing is lost, but files
move without the person asking, and that keeps happening.

The one-time case also breaks working code. Before T-0355 a loose script ran with sys.path[0] = Documents/Scripts,
so `main.py` could `import helper` from a loose `helper.py`. Migration puts each file in its own folder. The import
now fails, and data files beside them (`data.csv`) stay behind in the root.

Fix: run the migration once. Gate it on a marker (a version in UserDefaults, or a hidden `.migrated-v1` in the
root) written after a pass with no errors. Think about moving all the loose `.py` files into one project, so
imports between them still work. That one is a product call for Idris and Ines, so record it. Tests: after one
migration, write a loose `x.py`, run the migration path again, and assert `x.py` has not moved. Migrate a
`main.py` + `helper.py` pair, then run `main.py` through the bridge and assert that `import helper` works (or that
the decision record says it need not).

### M3. Opening an example after a failed save throws away the text the console promised to keep
`App/PyWidgetApp.swift:335-339` (`open(_ file: SceneFile)` ignores the result of `saveNow()`), also `:398-399`
(`close`).

`saveNow`'s comment says that when the save fails, "the caller keeps the text where it is rather than replace or
run it". The failure message says "Your text is still in the editor." `openProjectFile` and `run` follow that.
`open(SceneFile)` does not. It clears `projectFile` and replaces `source` with the example. Scenario: the project's
folder is renamed or deleted by another window (H1) or by a script. The save fails. The person picks an example
from the menu, and the unsaved text is gone. Closing a window in that state loses it the same way.

Confirmed: `testM3OpenExampleAfterFailedSaveKeepsText` fails (the source is now the tip splitter).

Fix: `guard saveNow() else { return }` in `open(SceneFile)`. On `close`, a failed save writes the text to a
recovery file (for example `Documents/Scripts/.recovered/<name>-<date>.py`) rather than dropping it. Test: the
probe.

## Low

### L1. The migration's cleanup deletes recursively and assumes the folder is empty
`ProjectStore.swift:194`. `removeItem` deletes the whole tree. If `createDirectory` fails because something made
the same folder between `free` (`:185`) and `:188`, for example a running script using `files.documents()` on the
script thread, the catch deletes that folder and everything in it. The window is microseconds wide, but a
one-line fix closes it. Only remove a folder this pass created (set a flag after `createDirectory` succeeds), and
use `rmdir(2)`, which refuses a folder that is not empty. Test: hard to write as a race. A unit test that
pre-creates the folder after `free` would need a seam, so I would skip the test and take the code fix.

### L2. A migration interrupted between the mkdir and the move leaves an empty project
`ProjectStore.swift:188-191`. If the app is killed there, a folder `tip/` with no files is left beside a loose
`tip.py`. The next pass sees "tip" as taken, so the file goes to `tip 2/`, and the list shows an empty "tip"
project ("0 files"). Nothing is lost. Fix: reuse an empty folder whose name matches. Test: create the empty `tip/`
and a loose `tip.py`, migrate, and expect `tip/tip.py` with no `tip 2`.

### L3. Files that are not `.py` can be created, then disappear from the list
`ProjectStore.swift:78-81, 125`. `fileName` keeps any extension, so "notes.txt", "helper.PY" or "x." (which becomes
`x..py`) are accepted. `files(in:)` lists only an exact, case-sensitive `py`, so the new file is never shown.
Renaming the open file to `main.txt` keeps it open and runnable while it vanishes from the list. Fix: refuse any
extension other than `.py` in this slice, matching what the list shows, or list what you create. Test: add "notes.txt"
and "helper.PY" to `testFilesCreateRenameDeleteAndWrite` and assert they are refused or listed.

### L4. `Dictionary(uniqueKeysWithValues:)` traps on duplicate keys
`ProjectsView.swift:100`, keyed by `name`. `Project.id` is the name as well. If two folders' names compare equal
as Swift strings but are both kept on disk, the dictionary call crashes Projects on every open. I could not
produce such a pair on APFS, which is normalization-insensitive, so this is hardening. Fix: key by `url.path`, or
use `uniquingKeysWith`.

### L5. No stale module between projects, but no test pins it
Checked: `_prepare` calls `_reset` before every run (`runner.py:767`). That drops every module whose real path is
outside the bundle and the stdlib, and restores sys.path (`:420-432`). So project A's `helper` is never what
project B's `import helper` gets. `write_bytecode = 0` (`pwbridge.c:581`) means no `.pyc` in the project, so the
one-second source mtime cannot serve stale bytecode after a fast autosave. This is the C1 contract working as
written. Nothing tests it for projects. Add a bridge test: project A's `helper.py` returns "A" and B's returns "B".
Run A, then B, and assert "B". Then edit B's helper, run again, and assert the new value. A future change to the
`_keep_module` roots (for example, adding Documents for site-packages) would otherwise slip through.

### L6. The test for the fixed editor bug does not exercise the bug
`UITests/ProjectsUITests.swift:56-66`, the fix at `ConsoleEditor.swift:19-22` and `PyWidgetApp.swift:276, 692`.
The claimed bug is that after a file is opened from Projects, the editor keeps the old text, and the next key
writes it into the new file. The UI test opens one file and reads the editor. It never types after the switch,
and it never reads the file back. Remove the `opens:` argument, and the only thing that fails is an editor
string, if that. The test does not show that no data is lost.

Related, unverified: the migration test keeps `\r\n` on purpose, but nothing checks what the editor does with a
CRLF file. If the engine normalised line endings, `engine.text != model.source` would hold forever, and `show`'s
re-open loop (`ConsoleEditor.swift:127-133`) would never settle. Even without that, the first key would rewrite
every line ending.

Test: open `main.py`, type, open `helper.py` from Projects, type one key, go back to Projects and reopen
`helper.py`. Assert that its text is helper's own plus the key, and that `main.py` holds main's text. Add a
unit-level case too: open a CRLF file, wait, type nothing, and assert the file's bytes are unchanged.

## Checked and fine

- Path traversal: `checkName` refuses "/", ":", a leading ".", and control and format characters, so `..`, `../up`
  and NUL cannot get through. `check` compares real parents and refuses links on both the item and its parent.
  Tests cover `create` and `write`. `rename`/`createFile` use the same `free`/`checkName`, so they are covered
  by construction (a two-line test would pin it).
- Symlinks in the migration: `isRegularFile` is lstat through `attributesOfItem`, so a loose `x.py` link is
  skipped and its target is left alone.
- Autosave to the wrong file within one window: `openProjectFile` saves first and swaps `projectFile`, `savedText`
  and `source` in one main-actor turn. `projectMoved`/`projectFileMoved` cancel the debounced task. The rename
  path saves before it moves. I found no interleaving in a single window.
- Rename or delete during a run: the run's sys.path[0] is the old folder, so a late import fails with a normal
  traceback. Nothing is written back.
- Widgets (App Group `widgets/<id>/`) and the Run Script intent library are not touched.

## Probe source (not committed; adopt into ProjectStoreTests)

```swift
@MainActor
final class ReviewProbeT0654Tests: XCTestCase {
    nonisolated(unsafe) var root: URL!
    nonisolated(unsafe) var store: ProjectStore!
    override func setUpWithError() throws {
        root = FileManager.default.temporaryDirectory.appendingPathComponent("probe-\(UUID().uuidString)", isDirectory: true)
        store = ProjectStore(root: root)
    }
    override func tearDownWithError() throws { try? FileManager.default.removeItem(at: root) }
    func model() -> ConsoleModel { let m = ConsoleModel(banner: "", bridge: false, file: nil); m.projectStore = store; return m }

    func testH1SecondWindowDoesNotOverwriteFirstWindowsSave() throws {
        let main = try store.create("p").url.appendingPathComponent("main.py")
        let w1 = model(), w2 = model()
        w1.openProjectFile(main); w2.openProjectFile(main)
        w1.source = "print('an hour of work')\n"; XCTAssertTrue(w1.saveNow())
        w2.source = w2.source + "x"; _ = w2.saveNow()
        let disk = try String(contentsOf: main, encoding: .utf8)
        XCTAssertTrue(disk.contains("an hour of work"), "disk now: \(disk.debugDescription)")
    }
    func testH1DeletedFileIsNotResurrectedByTheOtherWindow() throws {
        let p = try store.create("p")
        let helper = try store.createFile("helper", in: p, text: "x = 1\n")
        let w1 = model(), w2 = model()
        w1.openProjectFile(helper); w2.openProjectFile(helper)
        try store.deleteFile(helper); w1.projectFileMoved(from: helper, to: nil)
        w2.source = "x = 2\n"; _ = w2.saveNow()
        XCTAssertFalse(FileManager.default.fileExists(atPath: helper.path), "window 2 wrote the deleted file back")
    }
    func testM3OpenExampleAfterFailedSaveKeepsText() throws {
        let p = try store.create("p")
        let w = model(); w.openProjectFile(p.url.appendingPathComponent("main.py"))
        try FileManager.default.removeItem(at: p.url)
        w.source = "print('unsaved')\n"; XCTAssertFalse(w.saveNow())
        w.open(SceneFile(example: "tip_splitter"))
        XCTAssertEqual(w.source, "print('unsaved')\n", "the unsaved text was replaced")
    }
    func testM1MigrationFinishesOnLongCollidingStem() throws {
        let fm = FileManager.default
        try fm.createDirectory(at: root, withIntermediateDirectories: true)
        let stem = String(repeating: "a", count: 63)
        try fm.createDirectory(at: root.appendingPathComponent(stem), withIntermediateDirectories: false)
        try Data("print(1)\n".utf8).write(to: root.appendingPathComponent(stem + ".py"))
        let done = expectation(description: "migration returned"), s = store!
        Thread.detachNewThread { _ = try? s.migrateLooseScripts(); done.fulfill() }
        wait(for: [done], timeout: 5)
    }
}
```

## Author's reply (Idris, 2026-10-29, branch commit 76f3b622)

- **H1, fixed.** `ProjectStore.write(_:to:replacing:)` writes only over the bytes the editor last read or wrote; a
  changed or missing file is refused (`.changed`, `.missing`), the text stays, and the window's alert offers Save a
  Copy (`main (conflict).py` beside it, `Recovered/` when the project is gone, never replacing). An unedited window
  takes the other window's save. Rename and delete reach every model through `ConsoleModels.app`. Your two probes
  pass; added `testH1RefusedSaveKeepsTextAndSavesACopy` and `testH1EveryWindowFollowsSavesRenamesAndDeletes`.
  Not closed: the check and the write are two steps, so a script writing on the script thread in between can still
  lose to the editor. Microseconds; noted, not fixed.
- **M1, fixed.** Only `.exists` tries the next number; the suffix is fitted to 64; the number stops at 999; any other
  error leaves the file loose. Your probe passes and now asserts the folder name. L1 taken with it (rmdir, own folder only).
- **M3, fixed.** `open(SceneFile)` guards `saveNow()`; `close()` writes the copy on a failed save. Probe passes; added
  `testM3CloseAfterFailedSaveWritesARecoveryCopy`.
- **M2, half fixed, decision open (T-0660 stays open).** The migration now runs once, behind `.migrated-v1` in the
  root after a pass that left no loose script; tests pin it. The grouping is a product call for Ines and me:
  - A. One project per loose file (as built). Simple names; breaks `import helper` between loose scripts, data
    files stay behind.
  - B. All loose `.py` and their neighbours (non-`.py` files too) into one project, "Scripts from before". Imports
    and relative data paths keep working; one crowded project to sort by hand.
  - C. No move at all: list the root's loose files as a read-write "Loose scripts" entry that runs with sys.path[0]
    = the root, as before T-0355. Nothing moves without the person asking; costs a special case in the list.
  - My recommendation: C, then B. "Files move without the person asking" is the failure the review names, and C
    is the only option with no move. If no released build has the old loose layout, whichever we choose costs
    no customer data; Ines can confirm that.
- L2 to L6 are not touched in this pass.
- **<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span>, Ines, 2026-10-29 05:13 ET, M2 grouping: no move, and no migration.** No build with loose scripts in
  Documents/Scripts has left the company: no TestFlight, device runs still wait on #100, the alpha runs in the
  Simulator. So no customer has a file to migrate, and the migration can only ever move a file a script wrote
  into `files.documents()`. Take the migration call out of the Projects open path, with the `.migrated-v1`
  marker and any helper only it uses (keep the 64-character name fitting if new-project naming uses it). Loose
  files in the root stay where they are and are not listed; scripts that write or import them keep working.
  Idris's C ("Loose scripts" entry) is deferred past v1, revisited only if a tester asks. Test: put `x.py`,
  `main.py` + `helper.py` and `data.csv` loose in the root, open Projects twice, assert every file is where it
  was. The `import helper` probe is not needed: no shipped layout depends on it. Dev Simulator data is moved by hand.

## Re-review (Pernille, 2026-10-29, T-0662): 76f3b622 and 880ab357

Read `git diff c59b79aa 880ab357` in a detached worktree at 880ab357, without the author's notes beyond the reply
above. Runs (iPhone 17 Simulator, `tools/xc.sh`): the branch's ProjectStoreTests, ProjectRunTests,
ProjectReviewT0654Tests and ConsoleModelsTests, 42 tests, all pass, with four probes of mine
(`ops/runs/xcodebuild-20261029-052651.log`). Then two mutation runs (`-052830.log`, `-053229.log`). The probes
and mutations were never committed, and the worktree is gone.

### Verdict

**Merge after the alpha commit: yes.** H1, M1 and M3 are fixed. M2 is closed by the chair's ruling, and the
migration is gone cleanly. One new Medium (N1) must land before any build leaves the company (TestFlight). It
does not block a Simulator-only merge. Counts, new: 0 High, 1 Medium, 5 Low. Old Lows: 4 still stand, 2 are gone
with the migration.

### H1 per write path

The check is `ProjectStore.write(_:to:replacing:)`. Every editor save goes through `saveNow`, and `saveNow` always
passes `replacing: old`. So the one compare covers every path:
- Autosave (600 ms debounce): goes through `saveNow`. After a refusal, `saveRefused` stops it from retrying on
  every key. Holds.
- Run: `guard saveNow() else { return }`. A refused save does not run stale disk text. Holds.
- Projects button, opening another file, and opening an example: all call `saveNow`. Opening another file and
  opening an example are guarded. Holds.
- Close: a refused save writes a conflict copy. Holds, except N4.
- Scene backgrounding: calls `saveNow` and ignores the result. See N1.
- Rename while dirty: my probe P2 had two dirty windows, then the ProjectsView save loop, then a rename. One window
  wins, and the other is refused with its text kept. Its Save a Copy lands in the renamed folder, and both texts
  are on disk. Passes. The winner is whichever window comes first in `ConsoleModels.every`, not the one that did
  the rename. That is acceptable, because nothing is lost.
- Compare to write: windows cannot slip in between, because both are `@MainActor` and `saveNow` is synchronous.
  Only a script thread can, for the time it takes to read and atomically write one file. Idris noted this. I
  accept it for v1.
- Dismissing the alert ("Not Now"): the text stays in memory and in the editor. Every explicit save point retries
  and is refused again, and `openProjectFile` and opening an example refuse to replace the text. Closing the
  window writes a copy. Backgrounding does not, which is N1.

M3's guard covers every place that replaces `source`: `openProjectFile`, `open(SceneFile)` (including the
spare-model reuse in `ConsoleModels.model(for:)`), and `fileSaved`, which only replaces text in an unedited
window. I found no other writer.

Migration removal (880ab357): `migrateLooseScripts`, `.migrated-v1` and the loop are gone. `fitted` stays, and
`saveCopy` uses it. `isRegularFile` and `children(of:)` are still used by `files(in:)`. `listing()` is a pure read.
Nothing dead is left, and no behaviour changed beyond the ruling. Loose files were never listed, and they still
are not.

### Mutation check (do the regression tests fail without the fixes?)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Mutation check (do the regression tests fail without the fixes?), scrolls sideways" style="--tw:640px" markdown="1">

| Mutation | Tests that fail |
|---|---|
| `saveNow` writes without `replacing:` | H1SecondWindow, H1Deleted, H1RefusedSave (3) |
| `open(SceneFile)` ignores `saveNow()` | M3OpenExample |
| `close()` without `saveCopy` | M3Close |
| no `fileSaved` sent to the other windows | H1EveryWindow |
| `listing()` writes a `.migrated-v1` marker | LooseFilesStayPut |
| `fitted` ignores the length of the suffix | Fitted |
| ProjectsView rename/delete tells only `model` (6 sites) | **none** (N5) |

</div>


### New findings

**N1 (Medium). A refused save is not kept when the app goes to the background.** `PyWidgetApp.swift:774`
(`scenePhase` calls `saveNow()` and ignores the result) and `:300` (`sourceEdited` stops once `saveRefused` is set).
Scenario (iPad, two windows): window 2's save is refused, and the person taps "Not Now". They keep typing, and
autosave is now off without saying so. They switch apps. iOS ends the suspended app, as it routinely does.
Everything typed since the refusal is gone, and no copy exists. Before H1 a refused save was rare. With the
compare it is the normal result whenever two windows edit one file. Fix: when the scene goes to `.background` and
`saveNow()` fails, do what `close()` does, which is to write the copy and say so. Also add one line to the alert
or the console that autosave is paused until the text is saved as a copy. Test: a model with a refused save,
then the background hook (<span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> the hook into a model method, `sceneLeftForeground()`), then assert that a copy on
disk holds the text.

**N2 (Low). A file that starts with a UTF-8 BOM can never be saved in place.** `ProjectStore.read`
(`String(contentsOf:encoding: .utf8)`) drops the BOM, so `Data(old.utf8)` never equals the bytes on disk. Every
save is refused with "was changed in another window or by a script", which is false. Confirmed: probe P1 fails.
Only reachable through a script writing `utf-8-sig`, because Documents is not exposed in Files. Fix: compare the
decoded disk text with `old`, not the re-encoded bytes, or keep the bytes `read` saw. Test: probe P1 (write a BOM
file, open it, edit it, assert `saveNow()` returns true).

**N3 (Low). A delete in window 1 drops window 2's unsaved edits when window 2 closes.** `projectFileMoved(to:
nil)` and `projectMoved(to: nil)` turn window 2's text into scratch. `close()` then sees no project file and
saves nothing. Confirmed: probe P3 fails. The person did choose the delete, and the 600 ms autosave makes this
window short unless a save was refused. Fix: when the open file is deleted under unsaved edits, keep
`savedText`'s comparison and let `close` write a Recovered copy. Or warn in the delete confirmation that another
window has unsaved edits.

**N4 (Low). When Save a Copy fails, nothing says so, and closing the window then loses the text.** `saveCopy()`
sets only `saveProblem`. It writes no console line, and the alert's `set:` binding clears `saveProblem` on
dismissal, which may wipe the failure message the button action just set. `close()` ignores a failed copy.
Confirmed with "Recovered" as a link, which is contrived: probe P4 fails. Fix: `say` the failure, and on close
fall back to a timestamped file in the root.

**N5 (Low, test gap). The ProjectsView fan-out has no test.** `testH1EveryWindowFollowsSavesRenamesAndDeletes`
copies the view's loops into the test, so changing all six `model.everyModel` loops back to `model` passes every
test. Fix: move rename, delete and save-all into one model or registry method that ProjectsView calls, and test
that method.

### Old Lows

- L1: gone. The migration code it was about was removed, and the rmdir fix went with it.
- L2: gone (no migration).
- L3 (non-`.py` names accepted, then not listed): **stands**. `fileName` and `files(in:)` are unchanged.
- L4 (`Dictionary(uniqueKeysWithValues:)` in `reload`): **stands**. It moved to `listing()` keyed by
  `project.name` and is otherwise unchanged.
- L5 (no project-isolation bridge test): **stands**.
- L6 (the UI test does not type after the switch, and CRLF is unchecked): **stands**.

## Re-review (Pernille, 2026-10-29, T-0666): 26a965b0 (T-0665, N1 and N5)

Read `git diff 880ab357 26a965b0` in a detached worktree at 26a965b0, without the author's notes. Runs (iPhone 17
Simulator, `tools/xc.sh`): the branch's ProjectStoreTests, ProjectRunTests, ProjectReviewT0654Tests,
ProjectReviewT0662Tests and ConsoleModelsTests, 45 tests, all pass, with four probes of mine, two of which fail as
findings (`ops/runs/xcodebuild-20261029-060039.log`). Then eleven mutation runs, one per change (logs below). The
probes and mutations were never committed, and the worktree is gone.

### Verdict

**Merge after the alpha commit (2026-10-31 12:00): yes.** N1 is fixed: a refused save is on disk before iOS can
end the app, on every path that leaves the screen, and a second refusal never overwrites the first copy. N5 is
fixed: the six loops are model methods, and the test fails when any of them tells only its own window (one save-all loop is still untested, L4). Counts,
new: 0 High, 0 Medium, 4 Low. Nothing here blocks TestFlight.

### The four checks

1. **Every background or termination path writes.** `ContentView.onChange(scenePhase)` now calls
   `sceneLeftForeground()` on `.inactive` and on `.background`, per window (the environment value is per scene).
   It runs `saveNow()` and, when that is refused, `saveCopy()`, which is the same as `close()`. Swiping the app
   away, or iOS ending it while suspended, both come after `.background`, so the copy is already there. A window
   closed in the switcher goes through `.background` and then `close()`. Run and `open` refuse while a save is
   refused, so a crash in a script cannot take paused text with it. What is left is a crash or jetsam in the
   foreground, which no hook can reach and which predates this branch. The copy file is written with
   `completeFileProtectionUntilFirstUserAuthentication`, so a background write after unlock succeeds.
   Probe P2 (`.inactive` then `.background`): one copy and one notice, not two.
2. **The UserDefaults note cannot point at a missing or wrong file.** It is written only after the copy is on
   disk, and only when `saveCopy()` succeeded. It is cleared when the window comes back, and read and removed once at
   the next launch. **But it can go stale in one case (L1 below).** Probes P3 and P4 fail.
3. **A second refusal does not overwrite the first copy.** `ProjectStore.saveCopy` checks `free()` and moves on to
   ` (conflict 2)`, and so on. Probe P1: two windows refused on one file write `main (conflict).py` and
   `main (conflict 2).py` with two notices. The window on the first copy, when it is refused again, writes
   `main (conflict) (conflict).py` and leaves the first copy holding what the other window saved there. Passes.
4. **The tests fail when each fix is reverted.** See the table. Every model-side change is caught. The one-line
   wiring in `ContentView` (`onChange` to `sceneLeftForeground`) and the four call sites in `ProjectsView` are views,
   and no unit test reaches them. I checked them by reading, and they are right. A UI test is not worth it for
   one line each.

### Mutation check


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Mutation check, scrolls sideways" style="--tw:732px" markdown="1">

| Mutation | Tests that fail | Log |
|---|---|---|
| `sceneLeftForeground` only calls `saveNow()` (N1 reverted) | N1BackgroundAfterNotNow, N1ComingBack (2) | `-060215.log` |
| next launch does not say the recovered line | N1BackgroundAfterNotNow | `-060552.log` |
| `sceneBecameActive` does nothing | N1ComingBack | `-060637.log` |
| console line without "Autosave is paused" | N1BackgroundAfterNotNow | `-061013.log` |
| next launch does not remove the note | N1BackgroundAfterNotNow | `-063051.log` |
| `renameProject` without the save-all loop | N5RenameAndDelete | `-061059.log` |
| `renameProject` tells only its own window | N5RenameAndDelete | `-061142.log` |
| `deleteProject` tells only its own window | N5RenameAndDelete | `-061517.log` |
| `renameProjectFile` without the save-all loop | **none** (L4) | `-062253.log` |
| `renameProjectFile` tells only its own window | N5RenameAndDelete | `-062630.log` |
| `deleteProjectFile` tells only its own window | N5RenameAndDelete | `-063005.log` |

</div>


### New findings

**L1 (Low). The next-launch note goes stale when another window renames or deletes the copy.** iPad, two windows:
window B's save is refused and B goes to the background, so the copy `p/main (conflict).py` is written and noted.
In window A the person renames project `p` to `q`, or deletes the copy. iOS then ends the app before B comes back.
The next launch says "saved as p/main (conflict).py", which no longer exists. Confirmed: probes P3 (rename) and
P4 (delete) fail. No text is lost: B follows the rename, and the delete was the person's own choice. Fix: keep the
note as the copy's path relative to the root and keep it current in `projectMoved` and `projectFileMoved`
(rewrite on a move, drop on a delete), or at least say it at launch only if the file exists.

**L2 (Low, copy for Maren, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>). The next-launch line says "app".** `ConsoleModel.recoveredLine`: "A save was
refused when the app left the screen". The T-0506 ruling keeps "app" out of user-facing text. Suggest "when
PyWidget left the screen". Also, after a refusal on the way out, the console says "Autosave is paused until you
save a copy." and then on the next line "Saved your text as ...". That is true, but it reads as a contradiction.
Maren's call.

**L3 (Low, behaviour). Leaving the foreground for a moment also moves the editor to the copy.** Pulling down
Control Center or the notification list makes the scene `.inactive`. With a refused save, that writes the copy and
switches the editor to it, so "Not Now" lasts only until the next glance at Control Center. That is the safe side,
and the console says it. I would keep it and only write it down in the T-0355 notes, so a tester's "my file
changed name" has an answer.

**L4 (Low, test gap). `renameProjectFile`'s save-all loop has no test.** Removing `for m in everyModel {
m.saveNow() }` from `renameProjectFile` passes every test (`-062253.log`). By the time the N5 test renames the file,
window 2's text was already saved by the project rename before it. Fix: give window 2 unsaved text just before
`renameProjectFile` and assert that the renamed file holds it.

### Old findings

N1 and N5 are closed. N2 (BOM), N3 (delete under unsaved edits) and N4 (failed copy unreported) are untouched by
this commit, so they still stand at Low. L3 to L6 from the first review are as before.
{% endraw %}

</div>
