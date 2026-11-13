---
layout: "default"
title: "Review of T-3814: the per-widget tree report in Export measurements (T-3817)"
section: "documents"
description: "FIXES NEEDED before build 5 goes to TestFlight: M1 and M2. The report itself is right and its core tests can fail. But the export now waits, with no limit, on the one WidgetKit call the hunt lists as a possible hang\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3814-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t3814-pernille.md</code></span></div><h1>Review of T-3814: the per-widget tree report in Export measurements (T-3817)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12. Independent review (Commandment 13; the author is Idris) of the patch
`/private/tmp/company-scratch/T-3814-idris/T-3814.patch` (not on main). Files: `Shared/TreePresence.swift` (new, with a
Core symlink), `App/Settings/MeasurementExport.swift`, `Tests/Core/TreePresenceTests.swift` (new),
`Tests/MeasurementExportTests.swift`. Background: M1 of [`pywidget/docs/reviews/build5-pernille.md`](build5-pernille.html) and the iPhone hunt,
`pywidget/docs/investigations/t3783-not-drawn.md`.

## Verdict

**FIXES NEEDED before build 5 goes to TestFlight: M1 and M2.** The report itself is right and its core tests can
fail. But the export now waits, with no limit, on the one WidgetKit call the hunt lists as a possible hang, and a
"no tree.json" read while the app's own pass is still running looks the same as one the pass never wrote. Both are
small fixes, given below. Privacy: no finding. Nothing is held back from this file.

## Does it still apply to main?

Yes, with no conflicts. On main's HEAD (6446f1b815) `git apply --check` is clean for all five paths. Neither
`MeasurementExport.swift` nor its test changed on main since the patch's base (e7145a908). What it calls
(`WidgetFolder.url(for:in:)`, `WidgetFolder.treeName`, `RunLogStore.widgets`, `WidgetWriter.treeKind`,
`ChooseWidgetIntent.widget`) is unchanged; `WidgetPlacement.swift` moved on main only in the gate premade's titles and
comments. One change on main does matter, though not as a text conflict: T-3826 landed `WidgetWriter.within(_:_:)` and
bounds the pass's own `currentConfigurations()`. The patch was written before that and does not use it (M1).

## What was run (host only; no Xcode build, no Simulator)

On an export of main's HEAD with the patch applied:

- `swift test --filter TreePresenceTests` (Core): **6 tests, 0 failures**.
- Four mutants of `TreePresence.swift`, one at a time, each run against the same tests:
  - (a) always set a row's `placed`, even when WidgetKit did not answer: **killed** (`testNoAnswerFromWidgetCenterIsSaid`).
  - (c) drop the kind filter: **killed** (`testPlacedListIsRawAndUnsetGetsNoTreeRow`).
  - (b) drop the de-duplication of placed ids: **survived** (L1).
  - (d) accept a plain file where the folder should be: **survived** (L2).
- `python3 -m unittest pywidget/tests/privacy/test_manifest_sources.py`: **5 tests, OK**. The new
  `attributesOfItem` date read is covered by C617.1, which both manifests already declare.

Logs: `/Volumes/Company SSD/company-scratch/T-3817-pernille/` (`t3817-swift.log`, `t3817-mut-{a,b,c,d}.log`; scratch,
may be swept). Not run: the new `MeasurementExportTests` case and the live `export()` path. Both need the app's unit
target or a device, and the Xcode slot was held this session. They must go green on the MacBook runner before the cut.

## Does it answer the hunt's question on a real phone?

Yes, once M1 and M2 are fixed. `TreeDrawable` picks the bundled first render or the first-draw card only when
`widgets/<id>/tree.json` does not exist, so a Countdown row reading "no tree.json" proves its face is not the app's
tree. A row reading "written" gives the file's size and modification time. To see which process wrote the file, match
that time against the `lane` field of a row in `runs-<id>.jsonl` from the same export. The report lists the other four
premades too ("no folder" against "no tree.json"), and that is the question T-3783 is really asking.

One thing the export cannot tell, and the #41 ask should say: it describes the files at the moment of the tap, which
is after this launch's own pass. It cannot show what the face looked like before the app was opened.

## Findings

### M1 (Medium, required) The export waits on WidgetCenter with no limit

`App/Settings/MeasurementExport.swift`, `export()`: `try? await WidgetCenter.shared.currentConfigurations()`.

Candidate 1 of the hunt names this exact call as a possible hang on the device. T-3826 bounded it in the pass for that
reason. Here it is unbounded and comes before `collect`. If it hangs, tapping Export measurements does nothing: no
share sheet, no error, and no way to get the files off the phone. That breaks the hunt's only route back from the
device in exactly the case it is meant to catch. `try?` also turns a thrown error into "did not answer", which drops
the error's text.

Fix: use main's helper, and say in the manifest which of the two happened:

```swift
let answer = await WidgetWriter.within(.seconds(5)) { () -> Result<[TreePresence.Placed], String> in
    do {
        return .success(try await WidgetCenter.shared.currentConfigurations().map { info in
            TreePresence.Placed(kind: info.kind, family: String(describing: info.family),
                                widgetID: info.widgetConfigurationIntent(of: ChooseWidgetIntent.self)?.widget?.id)
        })
    } catch { return .failure(String(describing: error)) }
}
// nil: "WidgetCenter did not answer within 5 s"; .failure(e): "WidgetCenter failed: <e>"; .success(list): as now.
```

`Result` needs an `Error` type, so wrap the string in a small error type, or let `report` take a reason string beside
`placed: nil`. Whichever you choose, the manifest's `"placed"` must keep the two reasons apart.

### M2 (Medium, required) "no tree.json" read while the pass is running looks like "never written"

Every return to the app starts a widget pass (T-0690). On the phone that pass can take many seconds, and since T-3826
it may wait up to 15 s on each step. A tester who opens the app and taps Export straight away can get "no tree.json"
for a widget the pass is about to write. The runs file cannot settle it either, because its row is written when the
run ends. The manifest says nothing about whether a pass was running.

Fix: add a top-level `"pass_in_flight"` to the manifest. Give it the ids of the pass running at the tap, or `[]`. One
actor-isolated getter on `WidgetPasses` does it (`inFlight?.ids`). Then the #41 ask can say "if pass_in_flight is not
empty, export again".

### L1 (Low) No test places the same id twice

Mutant (b) survived. On a phone the same widget id placed twice (Countdown in small and medium) is normal. Without the
de-duplication its row would be listed twice. The `trees()` helper already checks for repeats, so one more test that
places `premade.countdown` in two families would <span title="A test written in advance. If it fires, we drop the idea.">kill</span> this mutant.

### L2 (Low) A file where a widget's folder should be is not tested

Mutant (d) survived: dropping `isDir.boolValue` turns "no folder" into "no tree.json" when `widgets/<id>` is a file.
That is rare, but it is the exact distinction this report exists to draw. One test that writes a file named
`premade.clock` would cover it.

### L3 (Low) Two ways to read WidgetKit's list

`export()` maps `WidgetInfo` into ids with its own copy of the mapping in `WidgetWriter.placedNow()`. Neither copy can
be unit-tested, so if one changes they can drift and the report would describe a different set of placed widgets than
the one the pass ran. Suggest one function in `WidgetWriter` that returns the `[TreePresence.Placed]` list, used by
both (the pass maps it down to ids with `placedIDs`).

### L4 (Low) A second tap during the wait

`export()` is now a `Task` behind an await. A second tap while the first is waiting starts a second export. That
export's `collect` clears `measurements/`, which can delete files out from under the first share sheet. Disable the
row while an export is running (one `@State var busy`).

### Note: `TreePresence` is in the Release app and the extension

It sits in `Shared/` without a `PYWIDGET_LANE_GATE || DEBUG` guard, so the Release app and the widget extension both
compile it, with no caller. It only reads, and the privacy check passes, so it is harmless. Wrapping it in the same
guard as `MeasurementExport` would keep the shipped binary to what ships. The `#if` holds under `swift test`, which
builds Core in Debug.

## Privacy

What the export gains: placed widgets' kind, family and chosen widget id; for each widget folder, its id, the size of
`tree.json` and its modification time. Widget ids are already in the export as the names of the copied
`runs-<id>.jsonl` files. The folder list adds the ids of a tester's own widgets that have no runs file yet. Those are
names the tester chose, the same kind of data as before. No file contents, no location, no device identifiers beyond
the `device` and `system` fields already there.

The collector is compiled only into the gate build and Debug. It leaves the phone only when the tester shares it from
the share sheet, and the gate build reaches internal testers only. The App Store build's manifest (no collected data,
C617.1 for file dates) is unchanged and still true. No finding.

## Tests that can fail

The Core tests build a real `widgets/` folder and read the report back with nothing stubbed. Two of the four mutants
were killed and two survived (L1, L2). With the fix taken out, both new test files stop compiling (`collect(placed:)`,
`TreePresence`), and with only the manifest lines taken out, `XCTUnwrap(m["trees"])` fails. Neither M1 nor M2 has a test
today. M1's fix can be tested on the host with `within` and a body that never returns; M2's with a `WidgetPasses` whose
`run` waits on a continuation.

## Re-review of 5278039080

Reviewer: Pernille, 2026-11-12, T-4171 (Commandment 13; the author is Idris). The landed commit `5278039080` (T-3814,
9:26 AM ET), read on main at `60dacf09a6`. Since the commit, only `WidgetWriter.swift` (T-3757, T-4198, T-4205, T-3852)
and `PreviewQueueTests.swift` changed in these files, and neither change touches the lines reviewed here. Line numbers
are main's at `60dacf09a6`.

### Verdict

**PASS with findings. Nothing here blocks the gate build going to internal TestFlight.** Every earlier finding is
fixed. The report now matches what the extension draws in every case a phone can reach without a symlink, and its host
tests kill all seven mutants I tried. There are four Low findings and two notes. None is a must-fix, so no board lines.

### The earlier findings

- **M1, fixed.** `MeasurementExport.readPlaced` (`App/Settings/MeasurementExport.swift:52-60`) reads WidgetKit's list
  through `WidgetWriter.within(.seconds(5))`. In "placed", a timeout reads "did not answer within 5.0 seconds" and an
  error reads "WidgetCenter failed: <error>". The two stay apart, and the export goes on either way.
  `testWidgetKitsListIsBoundedAndItsFailureIsSaid` holds a body that never returns. If the bound is taken out, that
  body never ends and the test's 5 s expectation fails.
- **M2, fixed.** `WidgetPasses.inFlightIDs` (`App/Bridge/WidgetWriter.swift:526`) goes into the manifest as
  `"pass_in_flight"`. It is read after the WidgetKit wait (`MeasurementExport.swift:171-172`), so a pass that started
  during the 5 s wait still counts. `testThePassInFlightIsInTheManifest` holds a real pass on a continuation and checks
  the ids during the pass, `[]` after it, and both in the manifest. See L3 for what this field does not cover.
- **L1, L2, fixed.** `testTheSameIDPlacedTwiceIsOneRow` and `testAFileWhereTheFolderShouldBeIsNoFolder` kill mutants
  b and d (below).
- **L3, fixed.** `WidgetWriter.placedConfigurations` (`WidgetWriter.swift:125`) is the one mapping. Both `placedNow`
  and the export use it.
- **L4, fixed.** `busy` guards `export()` and disables the row (`MeasurementExport.swift:147-168`). It goes false once
  the sheet is set, and the sheet then covers the row.
- **Note (Release and extension), not taken.** `Shared/TreePresence.swift` is still compiled into the Release app and
  the widget extension. `placedConfigurations` now returns `TreePresence.Placed`, so the type has to be in the Release
  app. Only `report` and `row` have no caller there. It reads and never writes, so this is harmless. I'm leaving it as
  a note.

### What was run

- Core, my own copy at `60dacf09a6`: `swift test --filter TreePresenceTests`, **9 tests, 0 failures**.
- Seven mutants of `Shared/TreePresence.swift`, one at a time, against the same tests. **All seven were killed:**
  (b) no de-duplication of placed ids (2 failures); (d) a file accepted as the folder (1); (e) every row marked
  placed (1); (f) a row's placed flag set when WidgetKit gave no answer (2); (g) placed ids listed again as folders
  (4); (h) the reason for no answer dropped (1); (i) the kind filter dropped (1).
- A host probe, not landed, on macOS Foundation (not the Simulator), comparing `TreePresence` against the extension's
  existence rule (`TreeFile.read`, `fm.fileExists`). Results are under L1.
- `pywidget/tests/privacy/test_manifest_sources.py` passed 5/5. `pywidget/tests/widgets/test_lane_gate_flag.py`
  passed 54/54.
- MacBook runner: see "Runner" at the end of this section.
- Not run: mutants of the app-target code (`readPlaced`, `inFlightIDs`, the row). The runner tests only commits on
  main, so there is no way to run a mutant there. I checked by reading that the two new MeasurementExportTests fail
  with the fix taken out, as described under M1 and M2 above.

### Findings

#### L1 (Low) A symlinked or non-file tree.json reads "written"

`Shared/TreePresence.swift:64`: `attributesOfItem` does not follow a symlink, and it does not check the item's type.
The extension decides whether there is a tree with `fileExists`, which does follow symlinks
(`Shared/WidgetPlacement.swift:269`). The probe's results:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: L1 (Low) A symlinked or non-file tree.json reads &quot;written&quot;, scrolls sideways" style="--tw:695px" markdown="1">

| widgets/<id>/tree.json | report | bytes | extension sees a file |
|---|---|---|---|
| dangling symlink | written | 22 (the link) | no, so it draws the bundled picture |
| symlink to a 2,000-byte file | written | 101 (the link) | yes |
| a folder | written | 64 | yes (unreadable) |
| empty file | written | 0 | yes (unreadable) |

</div>


The first row is the one misreading that matters: the report says "written" for a face that is the bundled picture.
Nothing in the app makes a symlink in `widgets/`. `WidgetFolder.url` refuses a symlinked folder, but it does not
refuse a symlinked file inside a folder. Fix: use the extension's own rule. Read `TreeFile.read(tree:)`'s verdict
(absent, no folder, unreadable, decoded) and add it to the row, with the size and time of
`url.resolvingSymlinksInPath()`. Then the report and the face cannot disagree. The extension does read the file to
decode it, but only the verdict leaves the phone.

#### L2 (Low) A failed listing of widgets/ looks like an empty one

`Shared/TreePresence.swift:46`: `try? contentsOfDirectory` turns any error into "no folders". Placed ids are still
checked one by one, so the hunt's own row is safe. A failed listing does drop the unplaced folders without saying so.
File protection is not the cause: the export runs with the phone unlocked in the foreground, and folder listings and
stat calls are metadata, which file protection does not lock. Suggest putting `"widgets_unlisted": "<error>"` in place
of the silent `[]` when the folder exists and the listing fails.

#### L3 (Low) "pass_in_flight" covers the foreground pass only

`WidgetPasses` stops counting a pass after 120 s (`WidgetWriter.swift:549-551`) even if its task is still running. A
pass that was let go is not in `pass_in_flight`, and neither are background-launch runs or the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own
writes. These are rare, and none is a pass "about to write in a second", which is what M2 was for. Still, the #41 ask
should say that `pass_in_flight: []` means "no foreground pass under 120 s old", and that a row's `modified` time
against `runs-<id>.jsonl` is the check for who wrote it.

#### L4 (Low) The new row code is compiled only by the gate build's archive

`GateMeasurementsRow.export()` (`MeasurementExport.swift:164-183`) sits under `#if PYWIDGET_LANE_GATE`. That flag is
set only by `scripts/gate_session_build.sh`, so no unit run or runner job compiles it. I read it and found nothing
that will fail to build: the `@MainActor` Task, `await` on the actor property, and implicit `self` in a struct are all
fine. The first compile, though, will be the upload. Before T-3814's build is cut, run the gate script's build step
locally (a build, not a test), or add a runner job that builds with the flag.

#### Note: a hung WidgetKit call leaves one task per tap

On a timeout, `within` (`WidgetWriter.swift:308-318`) returns nil but does not cancel the body's task. A
`currentConfigurations()` that never returns keeps one suspended task for each export tap. `busy` limits that to one
at a time, and a hung XPC call cannot be cancelled anyway. This is no leak worth fixing. The pass already works the
same way.

#### Note: main thread

The WidgetKit wait runs off the main thread (`within`'s tasks are unstructured and not isolated). `collect`, with
its file copies and the new per-widget stat calls, runs on the main actor, as `export()` did before. A few stat calls
per widget add nothing measurable.

### Privacy

No change from my first review, apart from two new fields. `pass_in_flight` holds widget ids, which are already in the
export. "placed" may now hold WidgetKit's error text, an `NSError` description with a domain and a code and no
personal data. No file contents leave the phone. The App Store build's privacy manifest is unchanged and still true.
No finding.

### Gate build only

`MeasurementExport`, `readPlaced`, `PlacedAnswer` and `placedLimit` are under `#if PYWIDGET_LANE_GATE || DEBUG`, and
the row is under `#if PYWIDGET_LANE_GATE` (`MeasurementExport.swift:10, 127`). In Release, the only additions are
`placedConfigurations`, which the pass already used through `placedNow`, the `inFlightIDs` getter and the unused
`TreePresence.report` (see the note above). `test_lane_gate_flag.py` passes.

### Runner

MacBook runner job `J-20261112-1744-xc-test` ran at `60dacf09a6` (main, with `5278039080` in it) on
MeasurementExportTests, BridgeTests, WidgetPassStallTests and WidgetStepTimeoutTests: **passed, 181 executed, 1
skipped, 0 failures**, 362.6 s. The one skip is `BridgeTests/testNotificationScheduleAndCancelThroughTheBridge`, which
is not code this commit touches. Log on the runner: `ops/runs/xcodebuild-20261112-180502.log`.
{% endraw %}

</div>
