---
layout: "default"
title: "Review of 98b2f149: T-4643, the gate build keeps its ladder in the widget lane and splits memory from time"
section: "documents"
description: "The route is the exemption I offered as (a), and it is built narrowly. ExtensionLane.swift:468 skips only the size move, and only when both guards hold: recordOnly (LaneGuard.swift:387-391, true only under\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4643-98b2f149-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4643-98b2f149-pernille.md</code></span></div><h1>Review of 98b2f149: T-4643, the gate build keeps its <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> in the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> and splits memory from time</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4931, Commandment 13). Author: Idris. Reviewed: 98b2f14988 as a whole (21 files: ExtensionLane.swift,
GatePremade.swift, gate_premade.py, _ladder.py, ladder1-12.py, ExtensionLaneTests, GatePremadeTests,
MeasurementExportTests, test_gate_premade.py, gate-session-build.md), against the T-4643 board line and my review of
T-4282 (docs/reviews/t4282-741d6b44-pernille.md, M1, M2, L1). The author's memory files were not read. Also read, for
what the exemption sits inside: ExtensionLane.turn and refused, LaneGuard.swift (LaneMargin.recordOnly,
LaneDemotions.remove and liftForNewText), project.yml's premade phases, scripts/premade_lanes.py and lane.py's deny
lists. Line numbers are at d79a2425ed, this branch's head; of the reviewed files only ExtensionLane.swift,
ExtensionLaneTests, test_gate_premade.py and gate-session-build.md changed since (T-4631, T-4644), none in the lines
cited. Paths are under pywidget/. Date: 2026-11-19.

## Tests run

- Host: `python3 -m unittest pywidget/tests/widgets/test_gate_premade.py`: 26 passed, 0 failed (worktree and a clean
  `git archive` copy of HEAD).
- Host: `python3 pywidget/tests/run_host.py widgets`: run four times while the machine was building. Three OK
  (455 tests, 0 failed suites); the first one said "FAILED: 1 suites, 455 tests, 1 failed suites", and I did not
  keep its output, so I cannot say which test. Two runs straight after it, kept, were green. I count it as a flaky
  timing test under load, not this commit's, but I have not proved that.
- Host mutants, each on the archive copy, test_gate_premade.py:
  (a) `plan` back to `ReloadPolicy.never()`: 1 failure (`test_each_rung_asks_for_a_reload_after_its_run`), KILLED;
  (b) `TIME_HOLD_MIB = 16`: 5 failures (the time-rung test, the Swift table, three rung files), KILLED;
  (c) `MEMORY_HOLDS_MIB` at 2 MiB steps: rung-file and table failures, KILLED;
  (d) `MEMORY_WORK_S = 1.00`: failures and errors, KILLED;
  (e) ExtensionLane.swift's `let keeps = recordOnly && ...` without `recordOnly`: 1 failure
  (`test_the_size_rule_would_move_the_rungs_so_the_gate_build_keeps_them`, which pins that line's text), KILLED.
- Simulator, product build (no gate condition), XC_LOCAL=1, iPhone Air iOS 27.0 by id, `-only-testing`
  ExtensionLaneTests, GatePremadeTests, MeasurementExportTests: 132 executed, 0 skipped, 0 failures
  (ops/runs/xcodebuild-20261118-235742.log). The five new T-4643 cases are among them and passed, including
  `testAnEnforcingLaneStillMovesAnExemptID` and `testOnlyTheGateBuildExemptsItsOwnPremades` (the set is empty here).
- Simulator, gate condition on (`SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) PYWIDGET_LANE_GATE`, the log's
  swiftc lines carry `-DPYWIDGET_LANE_GATE`), same device and filter: 132 executed, 0 skipped, 0 failures
  (ops/runs/xcodebuild-20261119-005304.log), with `testTheLadderIsInTheManifest` and GatePremadeTests' gate half.
  My first try at this run (11:50 PM) ended with exit 75: a waiter judged it stalled and took the lock, so it is no
  result; the rerun above is the one that counts.
- Swift mutant, on a scratch worktree of HEAD: `let keeps = keepsInLane.contains(id)` (the `recordOnly` guard
  dropped), product build, `-only-testing` ExtensionLaneTests: 120 executed, 2 failures, both in
  `testAnEnforcingLaneStillMovesAnExemptID` (ExtensionLaneTests.swift:1281, the list stayed empty), exit 65
  (log in the scratch copy's ops/runs/xcodebuild-20261119-010239.log). KILLED. The first try waited 1,800 s for the
  lock and exited 75: no result.
- No phone run, so no figure here is measured on a device.

## Verdict: PASS with findings

The route is the exemption I offered as (a), and it is built narrowly. `ExtensionLane.swift:468` skips only the size
move, and only when both guards hold: `recordOnly` (`LaneGuard.swift:387-391`, true only under PYWIDGET_LANE_GATE)
and the id in `keepsInLane`, whose default `sizeMoveExempt` (`ExtensionLane.swift:167-173`) is `GatePremade.ids`
under the same condition and `[]` otherwise. No production caller passes `keepsInLane`. So in a customer build the
set is empty and the flag is off: two independent locks, and the tests hold each one (the enforcing-lane case for
the flag, the `#else` assertion for the set, RepositoryTests for every GatePremade reference being inside the
condition). The row is written before the move (`:461`) and still carries `lane_reason`; the marker path (`:373`),
the refusal path (`refused`, `:555`) and `judge` are untouched, so a killed rung still moves, as the docs say.

The tables do what M2 and L1 asked. I redid the docstring's arithmetic: 23.0e6 and 25.2e6 bytes are 21.93 and
24.03 MiB; with R = 7-9 MiB the first <span title="A test written in advance. If it fires, we drop the idea.">kill</span> falls at a hold of 12.9-17.0 MiB, and the memory rungs are 1 MiB apart
from 12 to 18, so the band is covered in single steps. A time rung's peak is 11-13 MiB, so memory does not kill it on
the iPhone 15. The size rule's numbers are right too: a memory rung's 2 x (R + hold) is at least 34 MiB, a time rung's
22-26 MiB against W = 23, over from R = 8. Python and Swift tables agree and are pinned to each other; the manifest
carries `kind`. The reload is `after(now + 15 min)` and a test holds it. The docs page says what each rung measures
and how often, as the Done-when asks.

One sentence on that page is wrong in a way that would cost the phone session (L1).

## Findings

### L1 (Low): "remove it and place it again" does not read a killed rung again

- Where: `docs/decisions/gate-session-build.md:223-225` ("To read a killed rung again, remove it and place it
  again, or reinstall").
- A killed rung goes on `.lane-demoted.json` by its widget id (`ExtensionLane.swift:373`). Nothing in the app takes
  a premade off that list. `LaneDemotions.remove` (`LaneGuard.swift:243`) has no caller outside the tests, and
  `liftForNewText` (`LaneGuard.swift:275`) is called only from `WidgetScriptSave.swift:382`, a person saving script
  text, which a premade never has. Removing a widget from the Home Screen does not touch the list, and placing it
  again gives the same id. So a tester who follows this sentence gets app-lane rows for that rung and no new widget
  reading. Only deleting the app (which drops the App Group container) clears it; installing a new TestFlight build
  over the old one does not.
- Why it matters: T-4536's phone request is written from this page, and that session is expensive to repeat.
- Fix: say "delete the app and install it again" (and that an update over the top keeps the list), or give the gate
  build a way to <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> a gate premade's demotion. The first is enough.
- Also in the same table (`:183`): "the kill point, to within 1 MiB". That holds between 12 and 18 MiB; the end
  steps are 2 MiB (10 to 12, 18 to 20), as `_ladder.py:13` says ("1-2 MiB"). Make the two say the same.
- Board line: T-5061 (Idris, P2).

## Checked and fine

- No leak into the product build: above. `GatePremade.ids` is read only inside the condition, and the product
  Simulator run asserts `sizeMoveExempt == []`.
- The gate premades and T-4631's placement file: `premade_lanes.py` writes `lane-app.json` in "Install premades",
  before "Install gate premade" copies the rungs (project.yml:316, 323), so the rungs are never scanned. That is
  harmless: a premade not in the file starts in the widget lane, and the rungs import only `datetime`, `os`, `time`,
  `pywidget_ui` and `_premade`, none of them on NEVER, DENIED_SUBMODULES or APP_ONLY_SUBMODULES.
- A time rung stopped at the budget: its row says `time` and it stays (`testAGateRungOverTheTimeBudgetStays...`).
  A run that does not come back (`stuck`) leaves its marker and moves as `killed`, which the docs say.
- Two rungs in one warm process: the docs now say a later, smaller rung gets no peak on its row and that a fresh
  process measures it again. That is the honest reading of LaneFootprint.

## Board lines

- T-5061 (L1): the docs page's re-read step and the 1 MiB wording (Idris, P2).
{% endraw %}

</div>
