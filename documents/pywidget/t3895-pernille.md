---
layout: "default"
title: "Review: T-3895, extension-lane turns that never start (8b567d1a86)"
section: "documents"
description: "The four ruled start failures each write exactly one row: error, type InternalError, lane_outcome=start_failed, the right reason, and start_error where the bridge has text. Each also writes an error status.json through\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3895-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t3895-pernille.md</code></span></div><h1>Review: T-3895, extension-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> turns that never start (8b567d1a86)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4242, Commandment 13). Author: Idris. Read on 2026-11-13 at commit 8b567d1a86. ExtensionLane.swift and RunLogRecorder.swift are unchanged on main since then.

Against: ADR-007 Amendment 4 (Maren, T-2574) items 1-3 and 6, and ide/spec.md 12.4 (rows 722, 822, 897).

Evidence read, not re-run:
- Red: J-20261112-2328-land-m2-13bdd6. 1707 executed, 2 failing: `testNoRuntimeConfigIsAStartFailedRowAndAnErrorStatus` (:1540) and `testAMarkerThatCannotBeWrittenIsAStartFailedRow` (:1557). Both fail with `[]` where `["error"]` was expected, so before the fix these turns wrote no row.
- Green: J-20261112-2349-land-m3-40302d. 1711 executed, 0 failures, 2 skipped (the usual GalleryModesSnapshotTests pair).

## Verdict: PASS with notes

The four ruled start failures each write exactly one row: `error`, type `InternalError`, `lane_outcome=start_failed`, the right `reason`, and `start_error` where the bridge has text. Each also writes an error status.json through `recordLaneTurn` (the one store writer, in one hold of state.lock). No turn demotes. A stuck bridge at queueing is the closed lane. One Medium finding is outside the diff: the app's copy for these rows (item 7) was ruled onto this work and has no board line. The Low findings are test reach and wording.

## What I checked

**One row per exit.** I traced every exit from `turn()` (ExtensionLane.swift:333-420):
- `notInLane` and `locked` write no row, as before.
- `demoted`, `late` and `refused` write their own rows, as before.
- `no marker` (:385) writes `logStartFailed(.noMarker)` and returns before the run.
- After the run, `ran.start` (:396) writes either the start-failed row or `logClosed`.
- `ran.log` writes the run's own row.

`ran.start` and `ran.log` are never both set. The only constructors are `Ran.startFailed`/`notQueued` (log nil) and runInBridge's run exits (start nil). So no turn writes two rows. A caller that joins a turn in flight, or answers at its deadline, writes nothing of its own. The <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> says "one lane row per turn", and that holds. The one exit with no row, `held record` (:377), is outside the four reasons; see L3.

**runInBridge's exits.**
- :656 `config == nil` gives `noConfig`.
- :668 `bridge.start` threw gives `python(error)`.
- :680 `bridge.run` threw gives `notQueued(error)`, or `bridgeStuck` for `BridgeError.stuck`.

`bridge.start` can only rethrow `startResult` (PyBridge.swift:542-555), so it never throws `.stuck`. `bridge.run` throws only `startResult`, `.stuck` or `.notStarted` (PyBridge.swift:578-580). Everything that can be thrown is covered.

**Status.** `WidgetStatus.error(old, Failure(errorType: "InternalError"), now:)` goes through `failed(old, ...)`, so `failing_since` keeps the streak's start. `testEachFailedTurnIsARowAndTheStreakKeepsItsStart` shows that the start is kept and that the next lane `ok` clears it. Nothing has a file, a line or a detail file (`recordWidgetRun(row, output: [], finished: nil)`).

**No demotion (item 5).** `ran.stuck` is false on every start failure, so the marker is cleared (:393). No path to `demotions.add`. The tests assert both.

**Stuck bridge (item 6).** `.bridgeStuck` has no `reason`, so `logStartFailed` would write nothing. Instead :397-399 sets `closed` and calls `logClosed`, which writes `deferred`, `lane_outcome=closed`, once per widget, and skips any widget whose own run went stuck here. When the turn ends, `endsNow()` in `refresh` ends the process once nothing is in flight, as for T-1852. The marker is cleared, which is right: this widget's script never ran, so the next process must not demote it. One change in behaviour: before this commit the throw left the lane open. In practice the lane is already closed by then, because only a stuck run in this process makes `isStuck` true, and that run's turn closed it. So this path is a defensive path, and it does the right thing.

**`cut` (:540-546).** If byte `limit` is a UTF-8 continuation byte (`10xxxxxx`), it steps back to the scalar's lead byte and cuts before that byte. So it never splits a scalar and never goes over the limit. `limit 0` gives "". It can split a grapheme (a base letter and its combining mark), and that is fine for a log field. `testTheStartErrorIsCutTo200Bytes` puts byte 200 inside an `é` and gets 199 bytes. That is right.

**Release.** None of the new code is behind `#if`. The only DEBUG lines in runInBridge are the `PYWIDGET_LANE_FORCED && DEBUG` bench lines, which were there before. In Release, `RuntimeInfo.problem` is a warning and not a start failure (PyBridge.swift:981-985), so the `python` reason means a real init failure. The gate build's `recordOnly` paths are unchanged, apart from the mutant's find text in mutants-t2661.json, which matches the new guard (:385).

**Privacy.** No script source reaches `start_error`. `no_config` and `no_marker` carry nothing. `not_queued` carries `notStarted` or `internalError(...)`. See L1 for `python`.

## Findings

### M1 (Medium): item 7's row and detail copy has no owner
- Where: RunLogExport.swift:90; ide/spec.md:722, :822, :897.
- Amendment 4's board note gave "7's reason switch" to T-2496 (Idris). T-2496 is ticked as merged into T-3895. T-3895's done-note says that `o.nostart` has no reason switch in the app yet. No open line carries it.
- Today these rows read "Internal error" (RunLogExport.swift:90), not spec 12.4's `o.nostart` "Could not start". The detail is missing `d.nostart`, and nothing checks that `act.open` is hidden for a failing status with no line.
- This is the explanation a person would see for a widget that has stopped updating. Ruled work should not drop off the board.
- Fix line added, owner Idris.

### L1 (Low): `start_error` for `python` is free text from Python, not "our enum's text"
- Where: ExtensionLane.swift:668; PyBridge.swift:973, :992.
- `"\(error)"` on `BridgeError.initFailed(stage:message:)` carries one of two things: the bootstrap's `error` string, or `dup_exc` text from pwbridge.c. That is a Python exception message.
- The bootstrap runs no user script, so no script text gets in. But the message can hold absolute container paths, the app bundle, or the App Group `lane-scripts` root that is passed in as `userRoots`.
- That is not personal data, and 200 bytes bounds it. But the Amendment's "it is our enum's text, never user data" is stronger than the code.
- Suggested: say "the bridge's error text, which may include container paths" in the Amendment (Maren), or strip absolute paths before the cut.

### L2 (Low): the `python` and `not_queued` exits in runInBridge are not proven by a test
- Where: ExtensionLane.swift:668, :680; ExtensionLaneTests.swift:1562, :1611.
- Those tests hand the lane a `Ran` built with the same factories runInBridge calls. That proves the lane's handling, not the exits themselves. If either `catch` were reverted to the old `Ran(outcome: .noTree(...))`, every test would stay green.
- The reason given (one shared, started bridge in the host) is real: CPython will not init twice in one process.
- A cheap guard: two mutants (one per catch) in the T-2661 mutant file pattern, aimed at the two tests that would catch them if `run` went through a small bridge seam. Or accept it as it is, recorded here.
- The red run shows 2 of the 6 new tests red. The other 4 use `Ran.startFailed`/`notQueued`, which do not exist on the old code, so they could not have been red against it.

### L3 (Low): `held record` (gate build only) is still a turn with no row
- Where: ExtensionLane.swift:377.
- With `recordOnly` and `clearHeld` failing, the turn returns `.noTree("held record")` and writes no row and no status. That is the same silent shape, but only in the gate build (T-4152 postdates the Amendment), so Release is not affected.
- Note it for the chair. If it should be a fifth reason, it is a one-line `logStartFailed` with a new case.

### L4 (Low): the `no_marker` test skips the status entirely
- Where: ExtensionLaneTests.swift:1557.
- `status: false` skips every status assertion, including that no wrong status (for example `ok` or `deferred`) was written. Item 3 accepts the status being lost here, not it being wrong.
- Asserting `status("w") == nil`, or the status from before the turn, would close that gap.

No High findings. Nothing exploitable; nothing held back from this file.
{% endraw %}

</div>
