---
layout: "default"
title: "The device gate session&#x27;s build: a Release switch with a record-only margin"
section: "documents"
description: "Not option B (measure G1-G3 through the margin rule). The only way a first run gets through the margin on a 30 MB phone is to give it a lastPeak no run measured. That is a made-up figure in the run that measures the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/gate-session-build.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/decisions/gate-session-build.md</code></span></div><h1>The device gate session's build: a Release switch with a record-only margin</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-04. Board T-1853, from Pernille's review of T-0675's Swift half, F4
(`docs/reviews/t0675-swift-pernille.md`). Applies to T-0680 (the device gate session, ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-10-29
08:03 item 5). This is an engineering decision inside T-0680's plan. The flag default stays with the chair line that
T-0680 ends with.

## The failure

As built, the session measures refusals, not runs:

- The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can only be forced on in a Debug build (`Shared/LaneGuard.swift:11-18`, `PYWIDGET_LANE_FORCED && DEBUG`).
  T-0680 and item 5 call for Release. Debug overstates the Swift side's footprint and time, and <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 are thresholds
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

**Why record-only gives the chair what it asked for.** Ines 2026-11-01 13:04 (5bb6692c): "Record any run that passes
the margin and dies, and any refusal of a run that fits." In the gate build, a `margin=fits` run that is killed is the
first case, and a `margin=would_refuse` run that finishes is the second. An enforcing margin can record only the first.

## How it never ships

Three layers. The first two are on main with this decision. The third comes with the Swift half.

1. **Host test** `pywidget/tests/widgets/test_lane_gate_flag.py` (19 tests, mutants in
   `pywidget/tests/widgets/mutants-t1853.json`). It scans `pywidget/ios` (project.yml, the .pbxproj, every
   .xcscheme, xcconfigs, scripts, sources; not Vendor/ or build/), `tools/` (xc.sh, upload.sh) and `.github/`.
   The condition may appear only:
   - in `#if`/`#elseif` lines or comments in Swift. `Package.swift` gets no exception: a `.define` there is caught.
   - in Markdown, in Python tests, and in the checker itself;
   - in `ios/scripts/gate_session_build.sh`, the one file allowed to put it on an xcodebuild line. That file may
     contain no `archive`, `-exportArchive` or `install` word.
   Planted trees prove that a scheme, project.yml, an xcconfig, upload.sh, a Package.swift define, a gate script that
   archives, and two offenders at once are all caught.
2. **Build-phase check** `pywidget/ios/scripts/check_lane_gate.py`, the same file the test drives. With the
   condition set, it fails an archive (`ACTION=install`) and any build with `PW_INTERNAL_TESTFLIGHT=YES` (T-2270's
   upload path). A plain build passes with a warning. This catches an archive line typed by hand, which no repository
   scan can see.
3. **Wiring (continuation).** check_lane_gate.py becomes a build phase on the app and widget targets in project.yml,
   next to check_legal_links.py. The project is regenerated, and the gate script is written, run once, and checked.

## The Swift half (T-2369)

- `WidgetLane.extensionFlag` and `LaneMargin.recordOnly` (`Shared/LaneGuard.swift`) read the condition. `ExtensionLane`
  takes `recordOnly` (default `LaneMargin.recordOnly`, so tests inject it), reads headroom, last peak and residue once,
  and refuses only when the margin says no and the build enforces.
- One change from item 2's wording: the row's `headroom` is its existing column (RunRow, chair line 2026-11-02 17:15),
  whole MiB rounded down, or `unknown` for 0. An int under that key reads back as MiB, so bytes there would be read as
  MiB. The exact figure goes under `headroom_bytes` (absent when unknown). `need` and `residue` are bytes, as decided.
  The keys appear only on a record-only build's run rows; the shipping rows are unchanged.
- `check_lane_gate.py` is a pre-build phase on PyWidget and PyWidgetExtension. `scripts/gate_session_build.sh` builds
  Release for the phone by default (own DerivedData, `build/dd-gate`). A Release build also stops at the legal links
  check until T-0485 sets the privacy URL, as every Release build does.

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
  widget shows during the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> is recorded with a screen recording.
- **The largest lane premade's cold peak above baseline** (chair line 5bb6692c) is read the same way as G1. It
  replaces `firstRunPeak` (21 MiB) in the flag-default chair line. `margin=would_refuse` rows that finished are listed
  there by count.

## Left open

- The Swift half and the wiring go on a [build] continuation line for the runner: the condition in LaneGuard,
  `recordOnly`, the row fields, tests red first (record-only runs a would-refuse run; the enforcing build refuses it;
  a kill still demotes), the build phase, and gate_session_build.sh. The fields go on the rows T-1854 (0e756d6cc) made the extension write.
  T-2271's rerun of that path comes first.
- No Swift was compiled for this decision. The host test passes on what is on main today.
{% endraw %}

</div>
