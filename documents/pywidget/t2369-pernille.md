---
layout: "default"
title: "T-2464: review of T-2369, the gate build&#x27;s switch (Swift half), Pernille, 2026-11-05"
section: "documents"
description: "Sound for what it switches; two Mediums before T-0680&#x27;s device session. The enforcing path is unchanged when recordOnly is false (ExtensionLane.swift:282), the shipping rows carry none of the new keys (the column is set\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2369-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2369-pernille.md</code></span></div><h1>T-2464: review of T-2369, the gate build's switch (Swift half), Pernille, 2026-11-05</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Independent review (Commandment 13) of Idris's commit 3f55ca3ff, read at current main, against
`docs/decisions/gate-session-build.md` (T-1853, including "The Swift half" and its headroom/headroom_bytes change).
Paths are under `pywidget/ios/` unless they say otherwise.

Read: `Shared/LaneGuard.swift` (WidgetLane.extensionFlag, LaneMargin, LaneRunFiles), `Shared/ExtensionLane.swift`
(turn(), marginFields, refused, logMarkerDemotion, runInBridge, LaneBench), `Shared/RunLog/RunLogRecorder.swift`
(WidgetRun.headroom), `Shared/RunLog/RunRow.swift` (the headroom column's read and write), `Shared/LaneRestBench.swift`
(header), the ten tests under `MARK: the gate build's record-only margin` in `Tests/ExtensionLaneTests.swift`,
`Tests/Core/LaneGuardTests.swift` (testTheMarginEnforcesInCode), `project.yml` (both <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> gate check phases),
`scripts/gate_session_build.sh`, `scripts/check_lane_gate.py`, `tools/upload.sh` (archive paths only),
`Tests/results-t2369.txt`. No Xcode run in this task.

## Verdict

**Sound for what it switches; two Mediums before T-0680's device session.** The enforcing path is unchanged when
`recordOnly` is false (ExtensionLane.swift:282), the shipping rows carry none of the new keys (the column is set only
when `figures` exists, :283-299), and the marker, deadlines, tamper reports and stuck path are untouched and tested.
Neither Medium can reach a shipped build with the flag off. F1 costs the session its most useful row; F2 is a gap in
the layer the decision says stops a hand-typed archive.

No finding is a security weakness, so nothing is held.

## Findings

### F1 (Medium): a killed run's row carries no margin verdict, so "passes the margin and dies" cannot be counted

`ExtensionLane.swift:283-299` computes `figures` before the run but attaches them only to `ran.log`, the row written
after the run returns. A run that jetsam <span title="A test written in advance. If it fires, we drop the idea.">kills</span> never returns. The next process finds the marker and writes the
`killed` row through `logMarkerDemotion` (:420-425), which has no figures. The marker itself is an empty file
(`LaneGuard.swift:340-343`), so nothing carries them across.

Scenario: in the gate session, <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span>'s over-allocation premade starts with headroom 25 MiB, against a need of 42 MiB, so
the verdict is `would_refuse`. Jetsam kills it. The next process writes `killed, lane_outcome=demoted, reason=marker`
with no `margin`, `headroom`, `need` or `residue`. The same happens to a first-run premade that `fits` and still dies.
The decision's "Why record-only" says "a `margin=fits` run that is killed is the first case" the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line
(5bb6692c) asks for. Today the rows cannot show that case: every kill looks the same. That kill is the one reading
that says the margin is too loose, and only a device session can produce it.

Fix: in a record-only build, write the figures into `ext.marker` before the run (one small JSON object; the marker is
already written there, :287). `logMarkerDemotion` then copies them onto the `killed` row. A shipping build keeps the
empty marker. Tests: a record-only run that goes stuck or is killed (marker left), then a later process, gives a
`killed` row with `margin` and the figures. An enforcing build's killed row has none.

### F2 (Medium): the build phase reads only SWIFT_ACTIVE_COMPILATION_CONDITIONS

`scripts/check_lane_gate.py:27-39` (`conditions`, `verdict`) splits `SWIFT_ACTIVE_COMPILATION_CONDITIONS` and nothing
else. The Swift compiler also takes the condition from `OTHER_SWIFT_FLAGS` (`-DPYWIDGET_LANE_GATE`, or `-D` and the name
as two words), and from an `-xcconfig` file outside the repository. Either way `#if PYWIDGET_LANE_GATE` compiles in,
and the phase sees nothing: no error, and not even the warning.

Scenario: `xcodebuild archive -scheme PyWidget ... OTHER_SWIFT_FLAGS='$(inherited) -DPYWIDGET_LANE_GATE'`, typed by
hand or pasted from the gate script with the setting renamed. The archive has the extension lane on and a margin that
only records. The phase passes it (`ACTION=install` is only checked once the condition is found). `tools/upload.sh
--archive` refuses an archive with no recorded clean commit for `--upload`, but Xcode's Organizer would not. The
decision ("How it never ships", item 2) says this layer "catches an archive line typed by hand". For this spelling it
does not. The repository scan (layer 1) does catch the name in any committed file, so this needs a line typed outside
the repository.

Fix, from the narrow fix to the complete one:
1. `verdict` also reads `OTHER_SWIFT_FLAGS` (both spellings), with host tests for each spelling, on an archive and on
   an internal build.
2. Better, check the product rather than the settings: under `#if PYWIDGET_LANE_GATE`, compile a used string (for
   example `PWLaneGateBuild`) into both binaries. Then a post-build phase fails `ACTION=install` and
   `PW_INTERNAL_TESTFLIGHT=YES` if the linked executable contains it, and upload.sh refuses an archive that does.
   That catches every way the condition can be set, because it reads what was actually compiled.

### F3 (Low): the gate build writes no lane bench, so G2's footprint cross-check has no source

`LaneBench`, the per-step `lane-bench.jsonl` with footprint and peak, is compiled only under
`PYWIDGET_LANE_FORCED && DEBUG` (ExtensionLane.swift:467-512 and :564). The gate build is Release, so it has none.
`LaneRestBench` does record in the gate build, but only once per process, at rest, before any lane decision
(LaneRestBench.swift:3-6). The decision's G2 asks for "`phys_footprint` from the session log as a cross-check" after
both runs, and nothing in the gate build writes that. Fix: give those `#if`s the same form as `extensionFlag`
(`(PYWIDGET_LANE_FORCED && DEBUG) || PYWIDGET_LANE_GATE`), or change G2's text. Widening them also gives F1 a footprint
trail up to the kill. If they are widened, `ExtensionBridgeTests` pins the `#if` text (T-2625) and needs the same
update.

### F4 (Low): the device branch of headroom 0 is never tested in record-only

`turn()` calls `LaneMargin.allows` with the build's `zeroIsUnknown` (:279), and `lane(...)` cannot inject it. So
`testARecordOnlyRunWithHeadroom0SaysUnknown` only ever runs the Simulator branch (`fits`). Its other branch, a
device's `would_refuse` at 0 that still runs, is asserted conditionally but never runs. That 0 is the reading T-2097
is waiting for on a phone. Also untested: the stuck row (`logWord: "stuck"`) carries the figures. Fix: pass
`zeroIsUnknown` through the lane's init, as `recordOnly` already is, and assert both branches and the stuck row.

### F5 (Low): check_lane_gate.py's scan allows any file with the gate script's name, and checks words as bare tokens

`check_lane_gate.py:60` matches `GATE_SCRIPT` by basename, so a `gate_session_build.sh` anywhere under the scanned
roots may carry the condition. The decision names only `ios/scripts/`. :63 compares whitespace-split tokens, so
`"archive"` in quotes is not seen. The build phase still stops an actual archive, which is why this is Low. Fix: match
the path relative to the root, and strip quotes before comparing words.

### Info

- Row rounding: `peak_mb` is rounded to the nearest MiB (ExtensionLane.swift:497), while `headroom` is rounded down
  (:362). Both are as decided. But a session note that compares the two columns by eye can show peak 10 against
  headroom 9 for figures of 9.6 and 9.99 MiB. Use `headroom_bytes` and `lane-peak` for G1.
- A Release gate build stops at the legal links check until T-0485, and the script cannot get past it (correctly).
  T-0680 depends on T-0485.

## Checked and correct

- `extensionFlag` and `recordOnly` are on only under the condition. `testTheMarginEnforcesInCode` and the existing
  flag test pin both to false in the test builds.
- `marginFields`: `margin`, `need` and `residue` are always present. `headroom_bytes` is absent for 0, where the column
  reads `unknown`. Otherwise the column holds whole MiB, rounded down. This matches RunRow's read, where an int is MiB
  (RunRow.swift:219-224). None of the new keys collides with `RunRow.keys`, and the columns win over `extra` on write
  (:235).
- Record-only writes no refusal file, returns no `oom_guard`, and ignores an earlier process's refusal. A completed run
  still clears that refusal. A marker still demotes ahead of the margin, and the deadline check still comes before it.
  The ten tests cover each of these, and seven of them were seen red first (`Tests/results-t2369.txt`).
- Both pre-build phases have `basedOnDependencyAnalysis: false`, so they run on every build. Script sandboxing is off
  (project.yml:13), so `python3 -I` can read the checker.
- `gate_session_build.sh` passes the condition as one quoted setting, forwards no caller arguments, uses its own
  DerivedData, and has no archive or export word.
{% endraw %}

</div>
