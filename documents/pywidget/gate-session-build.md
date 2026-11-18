---
layout: "default"
title: "The device gate session&#x27;s build: a Release switch with a record-only margin"
section: "documents"
description: "Not option B (measure G1-G3 through the margin rule). The only way a first run gets through the margin on a 30 MB phone is to give it a lastPeak no run measured. That is a made-up figure in the run that measures the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/gate-session-build.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/decisions/gate-session-build.md</code></span></div><h1>The device gate session's build: a Release switch with a record-only margin</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Status (Ines, 2026-11-13, T-4272): history at its verdict.** Under the Investors' approval of the Restructuring's keep, change or drop tables (Restructuring 11, #280 c6858665300, A, 11:22 AM ET 11-13; [`documents/restructuring/02-audit.md`](../restructuring/02-audit.html), ADR table: "Keep until the verdict, then history"), this record governs the internal gate build only, and becomes history when the phone sitting's <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line is written (T-4282, from T-0680; ADR-007 revision 2, s15). No verdict is in yet. Its <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> to G3 figures now feed ADR-007's size rule rather than deciding whether the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> exists.

Idris, 2026-11-04. Board T-1853, from Pernille's review of T-0675's Swift half, F4
(`docs/reviews/t0675-swift-pernille.md`). Applies to T-0680 (the device gate session, ADR-007 chair line 2026-10-29
8:03 AM item 5). This is an engineering decision inside T-0680's plan. The flag default stays with the chair line that
T-0680 ends with.

## The failure

As built, the session measures refusals, not runs:

- The lane can only be forced on in a Debug build (`Shared/LaneGuard.swift:11-18`, `PYWIDGET_LANE_FORCED && DEBUG`).
  T-0680 and item 5 call for Release. Debug overstates the Swift side's footprint and time, and G1-G3 are thresholds
  on the shipping build.
- Even in that build, `LaneMargin.firstRunNeed` is 2 x 21 MiB = 42 MiB, and the recalled C is 30 MB. A phone's
  `os_proc_available_memory()` in the extension cannot reach 42 MiB, so every first run is `oom_guard`, and the next
  process demotes it. No first run ever runs: G1 has no cold peak, G3 has no over-allocation, item 4 has no halt time.

## Decision: option A, a gate-session switch

**Not option B** (measure G1-G3 through the margin rule). The only way a first run gets through the margin on a
30 MB phone is to give it a `lastPeak` no run measured. That is a made-up figure in the run that measures the
figure. Raising C or lowering the multiple for the session amounts to the same thing. So B produces no honest G1.

**The switch.** A Swift compilation condition, `PYWIDGET_LANE_GATE`, valid in any configuration. The session uses it
in Release:

1. `WidgetLane.extensionFlag` is true under `PYWIDGET_LANE_GATE`, as it is under `PYWIDGET_LANE_FORCED && DEBUG`.
2. `LaneMargin` gets `recordOnly`, true only under `PYWIDGET_LANE_GATE`. With it, `ExtensionLane` still computes
   `allows(headroom:lastPeak:residue:)`, but a run it would refuse **runs anyway**. The run's row (the widget's
   `log/widgets/<id>/runs.jsonl`, T-1854) records `headroom` (bytes, or `unknown` for 0), `need` (bytes), `residue`
   (bytes) and `margin` = `fits` or `would_refuse`. A record-only build writes no refusal file, returns no
   `oom_guard`, and demotes nothing for memory.
3. Nothing else relaxes. The deadline and turn margins (T-1851, T-2033), the marker, demotion of a killed run
   (marker without `backgrounded`), the tamper and `grave_full` rules and the stuck path all behave as they ship.
   G3 tests exactly those paths.

**Why record-only gives the chair what it asked for.** Ines 2026-11-01 1:04 PM (5bb6692c): "Record any run that passes
the margin and dies, and any refusal of a run that fits." In the gate build, a `margin=fits` run that is killed is the
first case, and a `margin=would_refuse` run that finishes is the second. An enforcing margin can record only the first.

## How it never reaches anyone but internal testers

T-2851 changes this section. an Investor chose TestFlight over a phone sitting (#192 c6673876442), so the gate build now
has one way off a Mac: internal TestFlight, through `scripts/gate_session_build.sh --testflight`, which runs
`tools/upload.sh --project ... --internal --upload --gate-session SETTING`. Before T-2851 the rule was "never archive
it". It is now "never archive it but this way".

**What stops a gate build reaching external testers or App Review, plainly:**

1. **App Store Connect, and only App Store Connect, holds the line after the upload.** `--internal` writes
   `testFlightInternalTestingOnly` = true into ExportOptions.plist, and upload.sh reads it back before any xcodebuild
   call (T-2702). `xcodebuild -help` says of the key: "When enabled, this build cannot be distributed via external
   TestFlight or the App Store." App Review is on the App Store's side of that line. No gate build reaches Apple from
   upload.sh without the key: the mark on the binary makes it refuse every other path (layer 3). What has been seen of
   the key so far is that sentence, not the screen; see "What is left".
2. **The ledger.** Every gate upload commits two rows to `ops/testflight-internal.tsv` naming the build, with "gate
   session build" in the note. `tools/testflight_ledger.py check` is the submission step before any App Review or
   external group ask, and it stops on that build number. It is a step someone must run, not a wall.

Nothing on the phone or in the binary refuses external testers by itself: once a build were in an external group, it
would run. That is why the upload is the place that decides.

**The layers on this Mac.** Each still holds, with T-2851's change stated.

1. **Host test** `pywidget/tests/widgets/test_lane_gate_flag.py` (mutants in `pywidget/tests/widgets/mutants-t1853.json`,
   `mutants-t2662.json`, `mutants-t2851.json`). It scans `pywidget/ios` (project.yml, the .pbxproj, every .xcscheme,
   xcconfigs, scripts, sources; not Vendor/ or build/), `tools/` (xc.sh, upload.sh) and `.github/`. The condition may
   appear only:
   - in `#if`/`#elseif` lines or comments in Swift. `Package.swift` gets no exception: a `.define` there is caught.
   - in Markdown, in Python tests, and in the checker itself;
   - in `ios/scripts/gate_session_build.sh`, the one file allowed to name it. That file may contain no `archive`,
     `-exportArchive` or `install` word, and (T-2851) any line that runs upload.sh must carry both `--internal` and
     `--upload`. upload.sh itself still may not name the condition: it takes it from the gate script as `--gate-session`.
   Planted trees prove that a scheme, project.yml, an xcconfig, upload.sh, a Package.swift define, a gate script that
   archives, a gate script that runs upload.sh without either word, and two offenders at once are all caught.
2. **Build-phase check** `pywidget/ios/scripts/check_lane_gate.py`, the same file the test drives, a pre-build phase on
   the app and the extension. With the condition set, it fails an archive (`ACTION=install`), unless the line carries
   `PW_INTERNAL_TESTFLIGHT=YES`, which upload.sh sets only for `--internal` and clears from the caller's shell. T-2851
   turned this rule over: that setting used to fail the build, and is now the one pass. So an archive line typed by hand
   with the condition still fails, but one typed with both settings does not (see "What is left" below).
3. **upload.sh reads what was compiled.** A gate build holds `LaneGateMark` in both executables (T-2662), however the
   condition was set. On every archive it exports:
   - marked, no `--internal`: refused, in T-2662's words, before any export call or ledger row. Unchanged.
   - marked, `--internal` with no `--upload`: refused. An .ipa in a folder can go by Transporter or Organizer, and nothing
     has shown the internal-only key would stay with it (T-2702's note), so a gate build gets no such .ipa.
   - marked, `--archive --internal --upload`: only an archive upload.sh itself marked `PWInternalTestFlightOnly`.
   - `--gate-session` needs `--project`, `--internal` and `--upload`, takes exactly one condition, and refuses an archive
     that comes out unmarked: asked for is not compiled.

**What is left, stated so nobody assumes otherwise:**

- **T-2691 is open.** The `--product` post-build phase is not in project.yml, so an Organizer archive gets layer 2 but
  not a read of its binary. `product_verdict` already follows T-2851's rule, so T-2691 needs no change of rule.
- **Organizer with both settings typed by hand.** Layer 3 is the only check that reads the binary, and Organizer never
  runs upload.sh. Someone who sets the condition and `PW_INTERNAL_TESTFLIGHT=YES` in Xcode by hand, archives, and uploads
  through Organizer with internal-only unticked gets past every layer on this Mac. T-2691 would not stop it either. The
  company's uploads go through upload.sh; this is a human path, and it needs a person doing all three on purpose.
- **Apple's key is unproven end to end.** Whether App Store Connect shows the build internal-only has to be read there,
  by the Investors (T-2702's note: "App Store Connect must show the build internal before any group gets it"). The first
  gate upload's check is that page. The first upload is T-2456, after #200.
- **`LaneGateMark`'s text still says "never archive or upload this build".** That is now loose, and kept on purpose:
  changing the text would let any archive that holds the old words pass upload.sh as a plain build.

## Export measurements (T-2851)

Settings gets one row in this build, "Export measurements", above About. It runs `MeasurementExport.collect`
(`App/Settings/MeasurementExport.swift`) and opens the share sheet with:

- `lane-rest.jsonl` (LaneRestBench, T-2097);
- every widget's `runs.jsonl`, as `runs-<id>.jsonl` (every widget's own file has the same name), killed rows and their
  margin figures included (T-2661). Rows are kept 14 days or 1 MiB a widget (RunLogRetention), so three days fit;
- `manifest.json`: app version and build, phone model, system, time, whether the lane is on and the margin record-only,
  and what was copied (bytes, rows), missing, or failed, so a thin export can be told from a thin session.

Files are copied whole and read back. **The row cannot leak by these rules, held by `RowTests`:** the row, its title
and its share sheet are inside `#if PYWIDGET_LANE_GATE`; the collector is inside `#if PYWIDGET_LANE_GATE || DEBUG`, so the
unit target tests it on every run and a plain Release build does not hold it; the title is in no string file, because
those are copied into every build. `SettingsUITests.testExportMeasurementsRowOnlyInTheGateBuild` is the same test both
ways: run plainly it proves the row absent, and with the condition on the xcodebuild line it proves the row drawn and the
share sheet open.

## The Swift half (T-2369)

- `WidgetLane.extensionFlag` and `LaneMargin.recordOnly` (`Shared/LaneGuard.swift`) read the condition. `ExtensionLane`
  takes `recordOnly` (default `LaneMargin.recordOnly`, so tests inject it), reads headroom, last peak and residue once,
  and refuses only when the margin says no and the build enforces.
- One change from item 2's wording: the row's `headroom` is its existing column (RunRow, chair line 2026-11-02 5:15 PM),
  whole MiB rounded down, or `unknown` for 0. An int under that key reads back as MiB, so bytes there would be read as
  MiB. The exact figure goes under `headroom_bytes` (absent when unknown). `need` and `residue` are bytes, as decided.
  The keys appear only on a record-only build's run rows; the shipping rows are unchanged.
- `check_lane_gate.py` is a pre-build phase on PyWidget and PyWidgetExtension. `scripts/gate_session_build.sh` builds
  Release for the phone by default (own DerivedData, `build/dd-gate`). A Release build also stops at the legal links
  check until T-0485 sets the privacy URL, as every Release build does; `--testflight` does not, because
  `PW_INTERNAL_TESTFLIGHT=YES` turns that check into a warning, as on every internal build.

## How G1-G3 get their numbers in the gate build

The order is T-0680's: item 2 first, so C and B exist before any lane run.

- **C** comes from item 2's allocation ramp in the extension (Release, gate build, the oldest phone). It replaces the
  recalled 30 MB everywhere it is quoted. **B** is the render baseline: `LaneFootprint`'s baseline, the footprint
  at the first reading, before the process's first lane run.
- **G1**: the allowlisted tiny premade on a cold process (extension killed, then a reload). Its peak above baseline
  comes from the run row, plus B, against 0.5 C, n >= 6. Each row also carries `headroom`, `need` and `margin`. That
  shows directly whether the shipping margin would have let this run start on this phone.
- **G2**: two lane widgets in one warm process. After both runs, the footprint goes against 0.6 C, from the second
  row's `residue` + B (and `phys_footprint` from the session log as a cross-check).
- **G3**: a deliberate over-allocation premade (a debug premade, never in the catalog) runs past C. The row it
  should have written is missing, the marker stays, and the next process demotes it. That shows up as `killed` ->
  lane `app`, with the cached tree and the badge, and the Activity row (the extension writes those rows since T-1854, 0e756d6cc; that path's Simulator rerun is T-2271). What the
  widget shows during the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> is recorded with a screen recording. T-3657: the premade is `overrun`
  (widgets/gate/overrun.py, "Memory overrun (gate)" in the picker): 64 MiB in 1 MiB steps, each page written.
  scripts/gate_premade.py puts it in Runtime/premade and on lane.json in the gate build only; Shared/GatePremade.swift
  (inside the condition) has the picker offer it, never locked. It is in no catalog or flag file.
- **The largest lane premade's cold peak above baseline** (chair line 5bb6692c) is read the same way as G1. It
  replaces `firstRunPeak` (21 MiB) in the flag-default chair line. `margin=would_refuse` rows that finished are listed
  there by count.
- **A refresh tap's cost in the app** (T-4774, Pernille's M2 in the T-4181 review): on iOS 26 and 27 a tap starts
  the app in the background. On the phone, with one own widget with the refresh button placed: 3 cold taps (app
  swiped away first) and 3 warm taps (within 10 s of the tap before). For each tap, the intent row's `peak_mb` from
  Export measurements (`runs-<id>.jsonl`, lane `app`, trigger `intent`) and the time from the tap to that row. On the
  Simulator `peak_mb` read 2-4 MiB under the process's peak, so it is a lower bound. The tap-to-row time has no
  measured phone method yet; the session records how it was taken. The Simulator figures to compare against are in
  [`ops/plans/T-4774-tap-cost.md`](../company/t-4774-tap-cost.html) (cold peak footprint 34.2 MiB on iOS 27.0 and 48.5 MiB on 26.0).

## The size <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>: what each rung measures and how often (T-4282, T-4643)

The gate build also carries twelve premades named `ladder1` to `ladder12` (widgets/gate/_ladder.py, one file per rung).
They are installed and offered like `overrun`, and never ship: same build phase, same condition, no catalog or flag
file. Each rung holds a set number of MiB, writing every page, then keeps the CPU busy over that memory for a set
time. Before each 1 MiB step it writes how far it got, so a rung the system kills leaves `held_mib` on its `killed`
row. Pernille's review of T-4282 (docs/reviews/t4282-741d6b44-pernille.md, M1, M2, L1) found that the first version
measured each rung once per install, and that memory killed its slow rungs before their time was read. T-4643 changed
both.

**What each rung measures.** The table splits the two axes, so one never hides the other:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The size ladder: what each rung measures and how often (T-4282, T-4643), scrolls sideways" style="--tw:912px" markdown="1">

| Rungs | Kind | Holds | Works | Measures |
|---|---|---|---|---|
| 1-9 | memory | 10, 12, 13, 14, 15, 16, 17, 18, 20 MiB | 0.10 s each | the kill point, to within 1 MiB |
| 10-12 | time | 4 MiB each | 1.00, 1.50, 1.90 s | how much of the 2 s budget a script gets |

</div>


The arithmetic uses the iPhone 15's figures (#231). The phone has 23.0-25.2 MB free at rest, which is 21.9-24.0 MiB.
A rung's peak above baseline is its <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> plus R, the runtime's own share (interpreter, renderer, tree). Countdown's
whole cold peak is 9 MiB and Countdown itself holds very little, so we take R as 7-9 MiB. The first kill should then
come at a hold between 21.9 - 9 = 12.9 MiB and 24.0 - 7 = 17.0 MiB. The memory rungs are 1 MiB apart from 12 to 18
MiB, so they cover that band in single steps. Rung 1 (peak about 17-19 MiB) fits on that phone. Rung 9 (about 27-29
MiB) is past the most it ever has free. If no memory rung dies, R is under about 4 MiB, which is a reading too, and
`overrun` (64 MiB) still finds the kill. A time rung peaks at 4 + R, about 11-13 MiB, so memory leaves it alone on
any phone with more than 13 MiB free. Its row therefore carries a duration. The 1.90 s rung's work alone fits the
lane's 2 s budget; whether the run as a whole does depends on how long the runtime takes to start, and that is what
the rung is there to show.

The export's manifest lists each rung under `ladder` with `rung`, `id`, `kind`, `hold_mib` and `work_s`, so a
reader can put each `runs-<id>.jsonl` beside what that rung was asked to do.

**What holds the ladder in the gate build (T-4644, review L2, L3).** Three tests:

- `GatePremadeTests` (Swift; `gate_session_build.sh --test` runs it with the condition on): every name in
  `GatePremade.names` is a premade the built bundle has (`Premades.all()`), `_ladder.py` is in `Runtime/premade/`, and
  `LaneEntry.resolve` answers `<name>.py` for `overrun` and each rung. The picker's names come from a Swift table, so
  only the bundle check can see a build phase that failed to copy a rung. Without the condition the same test asserts
  that none of them is there.
- `tests/widgets/test_gate_premade.py` (host): the shipping files name no rung, and the copy script puts them in.
- The same file runs `ladder1`'s provider on a temp `Store`: the climb (the MiB it holds, the time it works), the tree
  checked with `doc_errors`, its text and the record it leaves in the folder.

**How often.** In this build, every placed rung runs in the widget on every reload, not once per install:

- The product's size rule (ADR-007 s3, `LaneChoice.judge`) would move almost every rung to the app after its first
  widget run. A memory rung's 2 x (R + hold) is 34 MiB or more, against W = 23 MiB. A time rung's is 22-26 MiB, over
  W once R is 8 MiB or more, and a time rung that runs past 2 s moves for time. In the record-only gate build,
  `ExtensionLane` leaves GatePremade's names out of that move (`ExtensionLane.sizeMoveExempt`, which is
  `GatePremade.ids` under the condition and empty in every other build; it is read only when `recordOnly` is on).
  The rule still judges every run, and the row still says `lane_reason` (`memory`, `time` or `fits`). Only the
  move is skipped: no `.lane-demoted.json` entry, no moved reason and no badge.
- Each rung's timeline asks for a reload 15 minutes after its run (`ReloadPolicy.after`, `RELOAD_MINUTES`). It used
  to ask for `never`. WidgetKit decides when a reload actually happens, so 15 minutes is the shortest gap, not a
  promise. Each reload adds one more widget-lane row for that rung.
- A rung that the system kills still moves to the app on the next call (`killed`, with `held_mib`), exactly as
  `overrun` does. The kill is the reading, and running a known kill again every 15 minutes would only end the
  extension process over and over. To read a killed rung again, remove it and place it again, or reinstall.
- Two rungs in one warm process: `LaneFootprint` keeps only a peak the run raised itself. A rung that runs after a
  larger one in the same process gets no peak on its row, only its duration and its margin figures. A later reload
  in a fresh process measures it again.

We chose this route over the review's other option (keep the rule and write the phone request around one widget run
per rung per install). With the exemption, each rung gives several samples from one install, and the phone steps do
not depend on placement order. The exemption cannot reach a customer: it needs both the compile condition (which
check_lane_gate.py refuses on every archive except the internal one) and `recordOnly`, and ExtensionLaneTests hold
that an enforcing lane still moves the same id. Tests: test_gate_premade.LadderTests (the two tables, the
arithmetic above, the reload policy, the Swift table) and ExtensionLaneTests' T-4643 cases (a rung over W stays off
`.lane-demoted.json` and its rows say `memory`; the same for `time`; an enforcing lane moves the id; a killed rung
still moves).

## Left open

- The Swift half and the wiring go on a [build] continuation line for the runner: the condition in LaneGuard,
  `recordOnly`, the row fields, tests red first (record-only runs a would-refuse run; the enforcing build refuses it;
  a kill still demotes), the build phase, and gate_session_build.sh. The fields go on the rows T-1854 (0e756d6cc) made the extension write.
  T-2271's rerun of that path comes first.
- No Swift was compiled for this decision. The host test passes on what is on main today.
{% endraw %}

</div>
