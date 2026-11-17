---
layout: "default"
title: "Review of T-4282 at 741d6b44: the gate build&#x27;s size ladder and the export manifest&#x27;s ladder"
section: "documents"
description: "The code does what its commit says, and it is careful. Each rung holds its MiB a page at a time and keeps every chunk alive to the end, and a host child process proves the peak (ru_maxrss rises by at least 0.9 x 26\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4282-741d6b44-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4282-741d6b44-pernille.md</code></span></div><h1>Review of T-4282 at 741d6b44: the gate build's size <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> and the export manifest's ladder</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4541, Commandment 13). Author: Idris. Reviewed: 88ba326d54 ("size ladder for the gate build (7
rungs, 2-26 MiB, 0.10-1.50 s) and the export manifest's ladder"): widgets/gate/_ladder.py, widgets/gate/ladder1-7.py,
ios/scripts/gate_premade.py, ios/Shared/GatePremade.swift, ios/App/Settings/MeasurementExport.swift,
ios/Tests/GatePremadeTests.swift, ios/Tests/MeasurementExportTests.swift, tests/widgets/test_gate_premade.py. Also read,
for what the ladder runs inside: Shared/ExtensionLane.swift (turn, held record, size move), Shared/LaneGuard.swift
(LaneChoice, LaneMargin.need), Shared/Premades.swift, Shared/WidgetPlacement.swift, _premade.install. 741d6b44 itself
is Idris's memory line, four <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox records (board notes for T-4282, T-2943, T-3281 and his event) and the
T-4536 name in ops/task-names.tsv: nothing app-facing hides there. Paths are under pywidget/ and line numbers are at
741d6b44. Date: 2026-11-16.

Tests, all in a scratch copy of 741d6b44 (`git archive`):
- Host: `python3 -m unittest pywidget/tests/widgets/test_gate_premade.py`: 22 passed, 0 failed.
- Host, mine: each rung's real timeline provider (`widget.run_timeline`, `_premade.Store` on a temp folder), rungs 1 to
  7: 0.101, 0.253, 0.513, 0.759, 1.005, 1.268, 1.519 s of wall clock; `lane-held` read 2, 6, 10, 14, 18, 22, 26; policy
  `never` on every rung.
- Simulator, gate condition on (`SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) PYWIDGET_LANE_GATE`, Debug, iPhone
  Air, XC_LOCAL=1, `-only-testing` GatePremadeTests and MeasurementExportTests): 12 executed, 0 failed
  (ops/runs/xcodebuild-20261116-184954.log). This is the gate compile check the commit could not run (xc.sh 75): the
  app and the extension compile with the condition. The built bundle's Runtime/premade holds `_ladder.py`,
  `ladder1.py` to `ladder7.py` and `overrun.py`. My first try failed in the packages phase only because my scratch
  copy had no `tools/` (pkg_stage.py missing), not because of this commit.
- No phone run, so no figure here is measured on a device.

## Verdict: PASS with findings

The code does what its commit says, and it is careful. Each rung holds its MiB a page at a time and keeps every chunk
alive to the end, and a host child process proves the peak (ru_maxrss rises by at least 0.9 x 26 MiB). Each rung
records `lane-held` before every step, so a killed rung leaves the MiB it reached. The Python table, each rung file's
make() line and the Swift table are pinned to one another by tests. Nothing reaches a customer build:
gate_premade.py copies the eight files only when PYWIDGET_LANE_GATE is compiled in, and check_lane_gate.py fails that
condition on every archive except upload.sh --internal's. GatePremade.swift is wholly inside the condition,
MeasurementExport is compiled only in the gate build and Debug, and the row that passes the ladder is gate-only. The
underscore keeps `_ladder.py` out of `Premades.all()`. The manifest's new `ladder` key is a compile-time table (rung,
id, MiB, seconds) and holds no personal data.

What it does not yet do well is measure. The product's own size rule runs in the gate build too. With `never` as the
reload policy, each rung gets one run in the widget per install, and the rungs that would test run time are the
ones memory <span title="A test written in advance. If it fires, we drop the idea.">kills</span> first (M1, M2). Neither breaks a build or reaches a customer, so neither holds the code. Both
should be settled before T-4536 asks the Investors for a phone session, because that session is expensive to repeat.

## Findings

### M1. Each rung gets one widget run per install; "a few refreshes" only add app-lane rows

- Where: `widgets/gate/_ladder.py:114-115` (`ReloadPolicy.never()`); `ios/Shared/ExtensionLane.swift:400-404, 432-433`
  (the size move runs "in every lane build, the gate build's too"); `ios/Shared/LaneGuard.swift:359, 381-385,
  445-446` (move to the app when 2 x (peak - residue) > W = 23 MiB).
- The failure: a rung's peak above baseline is its <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> plus the interpreter's and renderer's own share. Countdown's
  whole cold peak is 9 MiB (#231), so even rung 2 (6 MiB) is near 2 x 15 = 30 MiB of need, over W. From rung 2 up,
  every rung that survives its first widget run is moved to the app lane, and that move is permanent for a premade:
  no text to save, no live <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> (T-4632; and T-4630's badge marks each moved rung as an error). The killed rungs move
  as well (`killed`). So per install each rung yields exactly one widget-lane row. After that, every run is an
  app-lane row. `never` means WidgetKit does not reload on its own, so runs come only from placement and from
  opening the app. T-4536's step "leave each placed through a few refreshes" will therefore add no widget data, and
  "two rungs side by side once for <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span>" works only if both rungs are fresh (never run before on that install).
- Why it matters: the per-rung figures that set the widget's memory budget are one sample each, taken in whatever
  process state the placement order left. A rung run after a larger one in the same process gets a nil peak
  (LaneFootprint keeps only a peak the run raised itself). The reading would then have no widget figure for that rung
  and no way to get another without a reinstall.
- Fix (either is fine, said before T-2943's upload): (a) in the record-only build, leave GatePremade's names out of the
  size move. The row still records `lane_reason` as the judge would have said it, so the rungs keep running in the
  widget, and `plan` asks for `after(now + 15 min)`. Or (b) keep the product rule. Then T-4536's steps say plainly:
  one widget run per rung per install, place the rungs one at a time in a fresh extension process (or in a fixed
  order, smallest first), G2 with two never-run rungs, and expect the error badge on moved rungs. Test for (a): a
  gate-build ExtensionLaneTests case where a rung whose need is over W stays off `.lane-demoted.json` and its row
  carries the reason.

### M2. Time and memory rise together, so the slow rungs die of memory before their time says anything

- Where: `widgets/gate/_ladder.py:11-14, 33-41`; `tests/widgets/test_gate_premade.py:288-298`.
- The failure: the docstring and the test compare each rung's hold with the 23.0-25.2 free at rest. They leave out the
  interpreter's own share. If most of Countdown's 9 MiB cold peak is the runtime and renderer (Countdown holds very
  little), the rungs' peaks are about 11, 15, 19, 23, 27, 31 and 35 MiB. The first kill then lands at rung 4 or 5 on
  the iPhone 15, and earlier on an older phone. Rungs 5 to 7 (1.00, 1.25 and 1.50 s of work) are the only ones near
  the 2.0 s budget, and they are the ones memory kills. A killed row has no duration. So the ladder gives no
  in-widget run time above about 0.75 s, and the first-run figure and the store default T-4282 is to set both need
  run time.
- Fix: split the two axes. Keep memory rungs with a short fixed work time, and add time rungs with a small fixed hold
  (say 4 MiB at 1.00, 1.50 and 1.90 s). Or make the time column of the existing table independent of the hold.
  Correct the docstring's arithmetic to count the interpreter.

### L1. 4 MiB steps cross the whole free-at-rest band in one step

- Where: `widgets/gate/_ladder.py:33-41`.
- The band the budget has to be set inside is 2.2 MB wide (23.0-25.2 at rest on the iPhone 15). With 4 MiB between
  rungs, a phone's answer is "between rung n and rung n+1", which is no tighter than #231 already gave. Rungs at
  2 MiB (or 1 MiB) spacing between 10 and 20 MiB held would place the kill point to within 1-2 MiB. Fold into M2's
  redesign.

### L2. The gate-condition Swift test checks only overrun.py in the bundle, and the gate path never runs GatePremadeTests

- Where: `ios/Tests/GatePremadeTests.swift:26, 33, 41-44`; `ios/scripts/gate_session_build.sh` `--test` (runs
  SettingsUITests' gated half and MeasurementExportTests only).
- Under the condition, `onDisk` and `LaneEntry.resolve` are asserted for `overrun` alone. The new tail assertion reads
  `GatePremade.names`, a Swift table, and `WidgetChoices.premades` lists names without looking at the bundle. So a gate
  build whose phase failed to copy `_ladder.py` or a rung would still pass. In that build, a placed rung resolves to no
  entry and draws nothing. The host test covers the copy, but not the built bundle. Also, `gate_session_build.sh
  --test` does not run GatePremadeTests at all, so its gate half runs only when someone puts the condition on by
  hand (as I did for this review).
- Fix: in the gate half, assert that every `GatePremade.names` entry is in `Premades.all()`, that `_ladder.py` is in
  the folder, and that `LaneEntry.resolve` answers for one rung. Add
  `-only-testing:PyWidgetTests/GatePremadeTests` to `--test`.

### L3. A host test's name promises read and draw, and it calls neither

- Where: `tests/widgets/test_gate_premade.py:384-391`.
- `test_read_draws_what_it_did_and_a_preview_writes_nothing` calls `climb` with a MemoryStore's `None` folder. It
  never calls the rung's `read`, `draw`, `describe` or the provider, so `data["ms"]`, the tree and its schema are
  untested on the host. (I ran all seven providers myself; they work.) Fix: run `ladder1.widget.run_timeline` on a
  temp `Store` and check the tree with `doc_errors`, as the premade suites do.

### L4. Board text names a commit that will never be on main, and T-4536's privacy sentence is slightly too wide

- Where: the T-2943 note in 741d6b44 (`ops/lane-outbox/a-1794779389387710000-12108.json`), the T-4282 note and
  T-4536's line all cite cdfacacc4c, the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch's commit. It is not on main; what landed is 88ba326d54. T-2943's
  check "once it is on origin/main" can never come true as written.
- T-4536 is to tell the Investors the export carries "device model, iOS version, run rows and memory figures, no
  personal data". The manifest and file names also carry each placed widget's id (`placed`, `trees`,
  `runs-<id>.jsonl`). For a person's own script, that id is the name they chose. That is not personal data in the
  usual sense, but the request should say it ("and the names of your own widgets") so the description is exact.
  The ladder adds nothing here.
- Fix: replace cdfacacc4c with 88ba326d54 in the T-2943 and T-4536 text, and add the clause to T-4536.

## Checked and fine

- Customer builds: covered above. `ProFlags.swift:165` never sells a gate name, and `PremadeTitles` reads gate titles
  inside the condition only. The non-gate halves of both Swift tests assert no rung and no `_ladder.py`.
- Title parsing: `Premade.title`'s pattern `make\(\s*"<name>"` matches `_ladder.make("ladder1", ...)`, and the picker
  uses GatePremade.titles anyway. `make` refuses a file whose name or title disagrees with the table
  (`_ladder.py:91-92`).
- Held record: `ExtensionLane.clearHeld` keys on the premade prefix, not on `overrun`, so every rung's record is
  cleared before its run and read onto its `killed` row.
- Memory: `bytearray(MIB)` then one byte per 4 KiB (four per 16 KiB arm64 page) puts every page in the footprint,
  and the read passes keep them there. Compression cannot hide it from jetsam either way, because
  phys_footprint counts compressed pages.
- Export: `ladder` is `[]` in every other caller, and a test pins "an empty list, not a missing key".

## Board lines

- T-4643 (M1, M2, L1): the ladder measures each rung once and loses its slow rungs to memory; settle before T-2943's
  upload (Idris, P1).
- T-4644 (L2, L3, L4): gate tests, stale hash, T-4536 wording (Idris, P2).
{% endraw %}

</div>
