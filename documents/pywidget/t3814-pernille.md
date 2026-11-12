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
{% endraw %}

</div>
