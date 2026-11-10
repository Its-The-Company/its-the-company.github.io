---
layout: "default"
title: "T-1030: parked lane work from the 08:09 stops, verdicts"
section: "documents"
description: "What I ran: nothing. No build, no test, no Simulator. &quot;Test seen&quot; means I read the test and it covers the ask. A landing&#x27;s host and xc are the first runs anyone can vouch for: neither branch carries an xc.jsonl row, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1030-parked-branches-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1030-parked-branches-idris.md</code></span></div><h1>T-1030: <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> work from the 8:09 AM stops, verdicts</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-02. Branches read: `parked/a3/20261102-080926-31395` (tip 2f2b53ae) and `parked/b2/20261102-081006-33065` (tip dc0070a1). Commandments 13, Tenet 4. Eleven of these tasks carry my name and the lane sessions wrote as me, so this is a triage, not a Commandment 13 review. The reviewer the Operator sends is that review.

**What I ran: nothing.** No build, no test, no Simulator. "Test seen" means I read the test and it covers the ask. A landing's host and xc are the first runs anyone can vouch for: neither branch carries an xc.jsonl row, and passed is not the same as correct, so a commit message saying a thing ran is a claim until land runs it. Reads outside git show/diff/log, both read-only: a grep of the iPhoneSimulator 27.1 SDK's UIKit files, and one `defaults read` (F7).

## Counts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Counts, scrolls sideways" data-n="2" style="--tw:699px" markdown="1">

| Verdict | Count | Tasks |
|---|---|---|
| (a) finished, tests seen, lands after review | 6 | T-0039, T-0063, T-0444, T-0590, T-0953, T-0974 |
| (b) half done, restarts from the branch | 3 | T-0588, T-0630, T-0749 |
| (c) nothing on the branch | 6 | T-0392, T-0553, T-0863, T-0044, T-0047, T-0591 |

</div>


## The two things that decide how this lands

**b2 cannot land as it stands, twice over.**

1. A retry is refused at the first check. The six ops commits under dc0070a1 (c619d2f5, b604b0ad, d5e3dc89, 14f0bc71, 986033b0, f35334e5) are twins of main's commits under other hashes (470b233a, 24a91ca5, cb46dc83, bf48bfca, 3236621a, 74c4ef03). `try_land` runs `check_lane "main...BR"`, a diff from the merge base, before any rebase, so it sees `ops/` and gives up with "paths outside the lane list". The twins' content matches main, and that doesn't help: the check comes first.
2. The tip does not compile, by reading (F1, F2). xc would be red for all of it, T-0953 and T-0974 included.

Never put `parked/b2/20261102-081006-33065` in ops/personal_retry.txt. It is the source for T-0630 and T-0749, and a retry deletes the name.

**a3 can land whole.** Every path is under `pywidget/`, every test-pattern path is a new file, and main's `pywidget/` has moved only by `docs/reviews/t1014-pernille.md` and `ios/scripts/mutants-t0675-host.json` since a3's base, so the rebase meets nothing. Land can't split a stack.

Retry line for a3, after review (it names T-0588 because those two files land with the stack, and the review line should cover them):

```
parked/a3/20261102-080926-31395 T-0039+T-0063+T-0444+T-0588+T-0590 host xc
```

Recut for b2 (company session, from a worktree on main; the patch form survives a3 landing first, because T-0444 and T-0974 touch separate hunks of Acknowledgements.swift):

```
git show dc0070a1 -- pywidget/ios/Shared/LaneGuard.swift pywidget/ios/App/Acknowledgements.swift \
  pywidget/ios/Tests/AcknowledgementsLicenseNamesTests.swift pywidget/ios/Tests/Core/LaneDemotionsLockWaitTests.swift \
  | git apply --index
```

Commit that as a new `parked/b2/<new name>`, then:

```
parked/b2/<new name> T-0953+T-0974 host xc
```

## Verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Verdicts, scrolls sideways" style="--tw:874px" markdown="1">

| Task | Verdict | Evidence | What's left, or the finding |
|---|---|---|---|
| T-0039 | (a) | a3 e0a01015. deltas doc, `Tests/GalleryModesSnapshotTests.swift`, measure.json, 14 sheets. Run evidence: 370 rows in measure.json. I recounted D1 from the file: label read 14 of 14 full colour, 0 of 24 stripped, clear-light 1.18:1, grounds 0.843 and 0.354, placeholder 0. All agree with the doc | Scripted part done. Four checks stay open and the doc says so: clear on a light wallpaper, Lock Screen on light, accented groups, StandBy. They need a hand on a Home Screen. Maren reads the deltas. Flex sizes are from memory, marked as such. Structural test always on; the measured run is flagged and writes nothing without it |
| T-0063 | (a) | a3 2f2b53ae, unreviewed, read hunk by hunk. `App/Places/*`, More menu entry, `_premade.py`, altitude, distance, steps, `Tests/SavedPlaces*Tests.swift`, `tests/widgets/test_location_states.py`. Run evidence: partial, the Python test's own note says the Swift bridge test found the naive-time bug. No final green on record | Complete against the line: declined and restricted states, typed place, only the button asks, nothing written over an unread file. The usage strings it needs are on main. Carries a real bug fix (F3). F4 before TestFlight, F5 and F6 for the review |
| T-0444 | (a) | a3 4cefcd61. `AckEntry.title`, `inheritedVersion`, `rowFootnote`; AckRow and NoticeBlock; `Tests/AcknowledgementsInheritedVersionTests.swift`. All four ids and the 18 "as in" entries are in the bundled file. Run evidence: none | Done asks for a list sheet. The test renders one and checks it isn't flat, but no PNG is on the branch and no eye has seen it. One run with `TEST_RUNNER_ACK_SHEET_DIR` gives the note its evidence link |
| T-0590 | (a) | a3 2f2b53ae, unreviewed. `DefaultWidgetID` in Shared, `isDiscoverable = false`, PyWidget.swift, `Tests/WidgetDefaultIDTests.swift`. Helpers named by the test all exist on main. Run evidence: the code comment says "measured true by default" | Three of four items done. Left: the device recheck, a widget placed before bcff31bf survives the update. No lane can do that, so the line stays open for that item |
| T-0953 | (a), via the recut | b2 dc0070a1, unreviewed. `LaneDemotions.add` uses a new `WidgetStateLock.with(file:wait:)`, `lockWait` 1.0, NSLock removed, `Tests/Core/LaneDemotionsLockWaitTests.swift`. Existing `testAddWaitsForTheFileLock` (0.3 s hold) and `testConcurrentAddsLoseNoID` stay inside the bound by reading. Static test and mutants that name LaneGuard.swift unaffected. Run evidence: none | Sound. F8 and F9 are small. Not landable from this branch |
| T-0974 | (a), via the recut | b2 dc0070a1, unreviewed. Three names in `LicenseName.names`, `Tests/AcknowledgementsLicenseNamesTests.swift`. Bundled entries found for all three ids. Run evidence: none; land's xc is the Swift acknowledgement run T-0903 could not do | Done as the line asks. F10: a fourth raw id stays |
| T-0588 | (b) | a3 676b9b64 (Sonnet). `UITests/ConsoleDeleteKeyUITests.swift`, `UITests/ZZDeleteControlUITests.swift`. Run evidence: none, and land runs no UI test | Both files written, never shown green. Left: drop the header's manual `defaults write` and raise the keyboard the way T-0758 does (`raiseOnScreenKeyboard`, ConsoleEditorUITests.swift:134), so the test runs in a plain whole-suite run; then one UI run with caret and selection read back; then the done-note. As written it fails on a Simulator with the keyboard attached, and A11a counts that. It arrives on main with a3, so the restart is from main after a3 lands. To keep it off main until then, cut a3 without 676b9b64 |
| T-0630 | (b) | b2 dc0070a1, unreviewed: `App/Editor/EditorKeyRow.swift`, `UITests/EditorKeyRowUITests.swift`. An earlier try is on `parked/b2/20261102-054559-60264` (02b85d24, T-1020), mixed with other tasks, with `UITests/KeyRowLargeContentUITests.swift` (three tests) | Parts (a), (b), (c) are drawn. Left: F1 and F2 first; take the three UI tests from 02b85d24 (its `var shot` has the same capture error); the AX XXXL screenshots and the iPad row; menu speech on the T-0479 device list; F11, F12. Don't redo the row: dc0070a1 is the later version, 02b85d24 only gives the tests. The lane has now written this twice |
| T-0749 | (b) | b2 dc0070a1: `Tests/WidgetProjectFilesTests.swift` only. No product code in the commit. Main copies .py files only (`WidgetScriptSave.siblings(of:)`, line 302; ProjectStore.swift:173), so all three tests are red on main by reading | T-0844 already covers the sibling .py half. The test is the spec for the rest. Left: copy every regular project file except main.py and the widget folder's own names (tree.json, state.lock, ext.marker, lane-peak, lane-refused, status.json, any case); the same in LaneMirror for `lane-scripts/<id>/`; keep T-0881's check, stage, commit and size limits; correct the header at lines 20-24 and 38-40. Do it with T-0866, same function. Lesson from my T-0675 mirror bug: grep who else writes the folder first |
| T-0392 | (c) | No hunk on a3 | Nothing started. A lane can't land it: it edits existing `tests/bridge/test_runner.py` and `Tests/BridgeTests.swift`, and check_tests refuses that. Company session, not the requeue |
| T-0553 | (c) | No hunk on a3 | Nothing started. The fix sits in `ios/scripts/install_stdlib.sh` or project.yml, both refused to a lane, and done is three erase-and-run cycles. Company session |
| T-0863 | (c) | No hunk on b2 | Nothing started. The test is in existing `UITests/EditorGateUITests.swift`, refused to a lane. Company session |
| T-0044 | (c) | No hunk on b2 | Nothing started. T-0331 gave it class 1.1 and no slot. Back only when Ines gives it one |
| T-0047 | (c) | No hunk on b2 | Nothing started, and mostly no longer needed: NSLocationWhenInUse, NSLocationTemporary and NSMotion are on main (project.yml:99-102, App/Info.plist), and T-0036 took the stat() entry. Only NSLocalNetworkUsageDescription is missing, with Maren's copy, in project.yml, refused to a lane. Line wants trimming to that |
| T-0591 | (c) | No hunk on b2 | Nothing started. It needs project.yml lines 56 and 214 and a build script, both refused to a lane. Company session |

</div>


On the (c) rows: nothing was lost, so nothing is redone. But ops/personal_requeue.txt would only start five of the six on a lane that can't land them. A held branch, a board line, and usage spent. I'd route T-0392, T-0553, T-0863, T-0047 and T-0591 to company sessions and leave T-0044 for its slot.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Findings, scrolls sideways" data-n="1" style="--tw:1211px" markdown="1">

| # | Severity | Where | Failure | Check or fix |
|---|---|---|---|---|
| F1 | Blocks | dc0070a1, EditorKeyRow.swift, `UIMenu(preferredElementOrder: .automatic, children:)` | No such initializer. The string occurs nowhere in the SDK's UIKit files; UIMenu's Swift inits take `preferredElementSize`. The order lives on the button. So the session never built this state | `b.preferredMenuElementOrder = .automatic` on the UIButton (UIButton.h:108); plain `UIMenu(children:)` |
| F2 | Blocks | dc0070a1, EditorKeyRowUITests.swift, `whileHolding(app, after: 2.0, { dump = "" })` | Mutates a captured `var` in an `@Sendable` closure, an error in Swift 6 mode (project.yml:8). The closure is unfinished scaffolding, and `keep` is never called | Replace the file with the 02b85d24 tests (their `var shot` needs the same care) |
| F3 | Good news, High value | a3 2f2b53ae, `_premade.local_aware` and its three callers | `_wire.py:220` returns `datetime.fromtimestamp(v)`, naive. The note says a time-styled Text refuses that, so every distance, altitude and steps run with a real fix drew a ViewTreeError in the app. Fixed for the premades, tested in `NaiveReadings`. This is a reason to land a3 soon | The source is unfixed: any person's script that shows `r.sampled_at` in a time-styled Text fails the same way. New line for Pernille: decide whether `want_time` hands back an aware datetime. Same shape at http.py:405, :432 |
| F4 | Must fix before TestFlight | SavedPlaces.swift `Copy.footer`, "Your places stay on this iPhone" | True of the saved list, not of the lookup: `MKLocalSearch` sends the typed text to Apple. A person who reads that line believes nothing left the phone. I have written that apology once. `docs/release/privacy-label.md` item 6 doesn't cover it either | Say what happens ("Looking up a place sends what you type to Apple Maps. Saved places stay on this iPhone."), DRAFT for Maren; Wrenna adds it to the label and policy. Doesn't block landing: the app isn't on TestFlight with this yet |
| F5 | Medium | SavedPlacesBridgeTests | The bridge test feeds distance.py through `premade_file`, a stand-in. Nothing runs the real path: PlacesFile writes `scripts/<id>/premade.json`, a real run reads it through `files.shared` | One test that writes through `PlacesFile.save` and runs the premade with no stand-in. Reads the bytes back, end to end |
| F6 | Low | Places copy | "iPhone" in three strings on an iPad build (`Copy.footer`, `Copy.restricted`, `LOCATION_STATES["restricted"]`); "Distance needs your location to show yours" reads oddly. All DRAFT | Maren |
| F7 | Medium | Simulator setting | ConsoleDeleteKeyUITests' header tells a person to set `ConnectHardwareKeyboard` false, a machine-wide default. It reads 0 on this Mac today. T-0758's note says this Simulator has the Mac's keyboard attached, and testG2 and the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span> hardware tests depend on that state. No record says who set it or when, so I can't say this session did | Check before trusting the next whole-suite counts. T-0588's restart removes the instruction |
| F8 | Low | LaneDemotionsLockWaitTests `testCallersAtOnceDoNotQueueBehindTheHeldLock` | A timing assert (under 2 s) on a machine that ran ten Simulators this morning. It can fail for the wrong reason | Watch it at land; widen it if it flakes |
| F9 | Low | LaneGuard.swift | The removed comment held T-0737 L3's rule: call `add` only from the extension or inside a background-task assertion. The bound shortens the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>; it doesn't end the 0xdead10cc risk | Keep that sentence on `add` |
| F10 | Low | `LicenseName.names` | `Unicode-DFS-2016` still shows raw on the Acknowledgements screen (tree-sitter-icu, in the bundled file). Same bug, not named on the line. Also "dtoa License": SPDX's full name is, from my memory, "David M. Gay dtoa License". Not checked | One more line in the table; Wrenna confirms the name |
| F11 | Medium | dc0070a1 `buildPad` | 26 keys share the bar: about 24.5 pt on a 744-pt iPad, about 8 pt in a 320-pt window. The spec says keys 40 x 36. `layout` is chosen by idiom at init, not by width | A floor on key width with the scroller back below it, or Maren rules. No iPad test exists on the branch |
| F12 | Medium | dc0070a1 `init(layout:)` default, `type(_:)` | The default follows the idiom, so on an iPad Simulator existing `testKeyRowNamesTraitsAndAlternates` gets the arrow keys and fails, and a lane can't edit that test. ← → step one UTF-16 unit, so an emoji can be split | Default `.phone`, call sites pass the idiom. Step with `rangeOfComposedCharacterSequence`, one test |

</div>

</content>
{% endraw %}

</div>
