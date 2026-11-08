---
layout: "default"
title: "T-3411: review of 39a2bb3aa (T-3364, per-premade gallery and widget tests)"
section: "documents"
description: "If passIDs drops the id, out[id] is nil, and the same guard fails. A tree that does not decode, or that lacks one of the catalog&#x27;s families, fails at assertDraws (lines 17-26)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3411-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3411-pernille.md</code></span></div><h1>T-3411: review of 39a2bb3aa (T-3364, per-premade gallery and widget tests)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. This is a Commandment 13 review of Idris's commit 39a2bb3aa
(`pywidget/ios/Tests/PremadeFirstRenderTests.swift`, 93 lines, test-only). I read `git show 39a2bb3aa` and the code
the tests call: `GalleryPreview.swift`, `WidgetWriter.swift`, `RunResultSink.swift`, `PyBridge.swift`,
`WidgetPlacement.swift` and the premade sources. I did not queue any Xcode work, because the Mac mini's disk is under its
line (#228) and Idris holds the Xcode work for T-3550. I ran one host-only probe, described under F3. Line numbers below
are the test file as committed in 39a2bb3aa.

**Verdict: PASS with fixes.** Each of the 12 per-premade tests fails if a premade raises out of its run, in either
place:
- **Gallery:** the run ends `error`, `ok` is false at `GalleryPreview.swift:102`, and the run comes back `.failed`, so
  the check at line 38 fails.
- **Widget:** `RunResultSink.finish` returns `.noTree("error")` (`RunResultSink.swift:110-112`), the writer returns
  `.noTree`, and the `guard case .wrote` at line 48 fails.

If `passIDs` drops the id, `out[id]` is nil, and the same guard fails. A tree that does not decode, or that lacks one
of the catalog's families, fails at `assertDraws` (lines 17-26).

The tests still miss three real ways that only Countdown could end up drawn. The widget pass takes the offered list and
the Pro gate from the test itself (F1). The gallery path bypasses the model that decides which tiles run (F2). The
three sensor premades turn any exception into a notice card that "draws" for every family (F3, shown on the host).

One more fact matters here: the commit is not on main. It is on `personal/a89`, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> by T-3520, so the main suite
does not run these tests yet.

## Findings

**F1 (Medium) `PremadeFirstRenderTests.swift:45-47`, `:62-65`. Neither test runs the product's offered list or Pro
gate, so a pass that skips a premade stays green.**
Both tests set `w.offered` to the id under test (or to the whole <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>) and `w.placed` to `[]`. The writer comes from
`WidgetWriterTests.swift:29-31`, which passes `mayWrite: { _ in true }`. The app's pass does neither of those things:
- It asks `WidgetWriter.offeredPremades()` → `WidgetChoices.premades` (`WidgetPlacement.swift:59-67`). That list is
  `gates.config?.premadeOrder ?? []`, filtered by `isPremadeLocked`.
- It asks `ProEntitlement.mayWriteTimeline` before every run (`WidgetWriter.swift:209`).

Failure case 1: `pro-flags.json` fails to load, or its `premade_order` lists only countdown. The offered list is then
`[]` or just Countdown, the first-open pass writes no tree for Sun, Steps or the others, and all 13 tests stay green.

Failure case 2: a gate bug marks a free premade locked. `mayWrite` returns false, and the writer returns
`.skipped("locked")` for every premade except the placed one. The tests stay green here as well.

This is exactly the "only Countdown draws" shape. In the gate build, the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> runs Countdown itself.

The tests also pass `force: true`, while the scene pass sends `false` (`PyWidgetApp.swift:117`). With a fresh
`WidgetPasses()` the two behave the same on the first pass, but the spacing rule (`WidgetWriter.swift:435`) is never
run.

Fix: add one test that keeps the default `offered` and `mayWrite` rules on the bundle's `pro-flags.json` with no Pro
entitlement. It should assert that every free premade on the shelf ends `.wrote`. Add a second test asserting that
`WidgetChoices.premades(…, includeLocked: false)` equals the free shelf.

**F2 (Medium) `PremadeFirstRenderTests.swift:36-38`, `:71`. The gallery tests call `GalleryPreviewRun.run` directly,
so a tile that `GalleryModel.runAll` skips is never seen.**
The product's tiles run through `GalleryModel.runAll` (`GalleryPreview.swift:169-178`). For every premade whose
CAPABILITIES need Motion or Location, `runAll` hits `continue` while the grant is `notAsked`/`declined`, and the tile
rule also reads the Pro gate (`:163-166`). Neither test goes through the model.

Failure case 1: Sun, Steps, Distance and Altitude are held with Location and Motion not asked, which is T-3477's lead
for Sun. Those tiles show "Permission needed", and the tests stay green.

Failure case 2: `runAll` regresses so that it stops after the first entry, for example with `break` in place of
`continue`. Countdown is the only tile that runs, and the tests stay green.

`GalleryGrantNeed.grant` reads iOS directly, so the model needs a seam before it can be tested. Fix: inject the grant
reader into `GalleryModel` and add a test that runs `runAll` with every grant `.granted`. It should assert an outcome
for every shelf entry. A held tile should read `.notRun` with Permission needed.

**F3 (Medium) `PremadeFirstRenderTests.swift:16-26` against `steps.py:42`, `distance.py:58` and `altitude.py:35`. In
"draws", the three sensor premades can never fail on a raise inside their data path.**
`assertDraws` checks only that the tree decodes and holds a view for each family. Each of the three sensor premades
runs its whole read, including `from pywidget.device import ...`, inside `except Exception`, and then draws an
"unavailable"/"off" notice for every family. The Simulator has no pedometer or altimeter, so these three tests only
ever see the notice card.

Host proof: `/Volumes/Company SSD/company-scratch/T-3411-pernille/raise_probe.py` seeds an `AttributeError` into
`pedometer.today()` with the status `authorized`. `steps.read` returns `status = unavailable`, and `_premade.view`
builds a node for all 6 catalog families.

Failure case: a renamed field in `pywidget.device`, or `pywidget.device` itself failing to import in a stripped
Release stdlib, leaves Steps on "unavailable" for good. All three tests stay green.

Fix: run these three with a fake device handler that answers a known reading. That seam is `bridge.setDeviceHandler`,
added in 5914346c4. The tests should assert that the tree carries that value, such as a step count text, and not the
notice.

**F4 (Low) `PremadeFirstRenderTests.swift:24`. Only `entries.first` is checked.**
The extension draws the entry for the current date. Failure case: a premade with a multi-entry timeline (Clocks,
Countdown) drops `views[family]` from its later entries, and the widget shows "No view for this size" after the first
entry's date. The test stays green. Fix: check every entry.

**F5 (Low) `PremadeFirstRenderTests.swift:60`, `:75`. The first-open test passes with nothing in it, and it cannot go
red on the defect it names.**
If `GalleryEntry.shelf()` returns `[]` (catalog.json missing from the bundle, or failing to decode), then `ids` and
`tiles` are both empty, `allSatisfy` is true, and the loop over `ids` never runs. The test passes. The per-premade
tests do catch a missing catalog, so this is Low.

Failure case 2: on the Simulator every run takes under 0.6 s. Both loops are sequential (`WidgetWriter.refresh(_:)`
awaits each id, and the test awaits each preview), so a preview waits behind at most one widget run, and it never
reaches 2 s. The test is a smoke check, not a guard. The concurrent stalled-sensor test is already T-3552, and I did
not repeat it here.

Fix: assert `ids.count == Premades.all().count` and `tiles.count == ids.count`.

**F6 (Low) `PremadeFirstRenderTests.swift:81-92`. The 12 names are hard-coded.**
No test ties them to the shelf. Failure case: a 13th premade is added to `catalog.json` and the bundle, and it gets
no gallery test and no widget test. Fix: one shelf-driven test that runs `checkPremadeDrawsInBothPlaces` for every
`GalleryEntry.shelf()` id, or one that asserts the shelf equals the 12 names.

## The candidate (2 s preview budget counts queue time)

**Real, by code. Same defect as T-3552.**
- The busy timer starts at enqueue (`PyBridge.swift:661-668`).
- `scriptLoop` subtracts the time spent queued (`:900-906`).
- `GalleryModel` keeps the `.failed` outcome for the session. Only Try again reruns the tile (`GalleryPreview.swift:182-186`).

Because both loops are sequential, a preview ends `busy` only when the single widget run ahead of it runs past 2 s. A
stalled sensor call can do that, since the widget budget is 5.0 s. T-3552 already holds this case ("a preview behind a
4.5 s stalled widget run ends busy"), with the concurrent test and the queue rule.

**One distinct part, added to T-3552 as a note.** A preview that waited `w < 2 s` still starts, but with a budget of
only `2 - w` (`PyBridge.swift:906`). If its own run needs longer than that, which is likely for a cold first preview,
the budget stop interrupts it (`:989-1000`). It comes back not ok, so the tile is Failed for the session just the same.
No stall is needed for this. A widget run of 1.5 s on a cold device is enough. So a fix that only stops queued
previews from expiring `busy` still leaves this case. The queue rule should start a preview's budget when the preview
starts, or give it a floor.

## New lines

- T-3557 (Idris, P1): F1.
- T-3558 (Idris, P1): F2.
- T-3559 (Idris, P1): F3.
- T-3560 (Idris, P2): F4 to F6.
{% endraw %}

</div>
