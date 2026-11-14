---
layout: "default"
title: "Review of T-0678: the rerun rule and the refresh button intent"
section: "documents"
description: "The rule itself is small and right as arithmetic: reruns (Shared/LaneRerunRule.swift:14-17) and minimumInterval (:24-27) do what the board line and the 11-05 chair line say, the coalescing in ExtensionLane\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0678-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t0678-pernille.md</code></span></div><h1>Review of T-0678: the rerun rule and the refresh button intent</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-0678.7, Commandment 13). Author: Idris. Reviewed: 0ae1c2d2d2 (LaneRerunRule, its Core test,
mutants-t0678, mutants-t1861 results) and 2b1cbd1634 (getTimeline's call, RefreshWidgetIntent, RefreshTapRule,
WidgetWriter's installAppWriter, the ExtensionBridgeTests guard, RefreshTapTests, the UI test). `git diff 2b1cbd1634
1e5a1aa1d8` is empty for Shared/, Widget/, Tests/, App/PyWidgetApp.swift and App/Bridge/WidgetWriter.swift, so the
line numbers below hold on main's HEAD. Read-only: no build, no test run, no Xcode (Idris holds the slot for T-1440).
I found no main_gate row for either commit and did not read a gate log. Date: 2026-11-13.

## Verdict: FIX FIRST (one High, three Medium)

The rule itself is small and right as arithmetic: `reruns` (`Shared/LaneRerunRule.swift:14-17`) and `minimumInterval`
(`:24-27`) do what the board line and the 11-05 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line say, the coalescing in ExtensionLane (`inFlight[id]`,
`Shared/ExtensionLane.swift:268-293`) keeps a reload that lands while the tap's run is still going from starting a
second run, and I agree with the iOS 27 `.main` pin. What breaks is the input. The rule measures the age of
`sampled_at`, and `sampled_at` is not the run's time. The DSL documents it as "when the data was read"
(`python/pywidget_ui/__init__.py:1523`), and shipped premades already pass a reading's own time (widgets/premade/steps.py:201,
altitude.py:160). Those run in the app, not the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, but for any `lane: widget` script written the same way, "one run per tap" and "never under 15 min" are both false.

## The rule's edges


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The rule&#x27;s edges, scrolls sideways" style="--tw:960px" markdown="1">

| Edge | What happens at HEAD | OK? |
|---|---|---|
| No tree.json, or one that does not decode (a missing `sampled_at` fails the decode, `TreeTimeline.swift:106`) | `file.document` nil, reruns (`RefreshWidgetIntent.swift:76`) | Yes, but see H1: an undecodable tree reruns on every reload, the tap's own reload included |
| `sampled_at` past the clock | reruns (`:15`), as 11-01 item 1 asks; the run's new tree heals it if the script uses the clock | Yes for the clock; no for a script that hard-codes a future date (reruns every reload, forever) |
| Floor vs a larger ask | `max(floor, min(ask - sampled_at, cap))`; under the floor, at 0, and negative all give the floor; `never` gives the floor | Yes (tests at LaneRerunRuleTests `testAskUnderTheFloorGetsTheFloor`, `testWidgetsOwnLargerAskWins`) |
| 24 h <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> | `min(..., RefreshAsks.cap)`; a 7-day ask reads 24 h | Yes |
| NaN / infinite interval | reruns (`isFinite` in the guard), killed mutant | Yes |
| At the interval exactly | reruns (`>=`), killed mutant | Yes |
| `wants-run` | `askDate(..., wantsRun: false, ...)` hard-codes false | Today nothing writes `wants-run`, so no effect; see L4 |

</div>


## One run per tap

- Success, extension, script uses the clock: the tap's run writes a tree seconds old; the post-intent reload finds it
  under the interval and draws it. One run. If the tap's turn hits the 4 s deadline, the reload's `refresh(id)` joins
  `inFlight[id]` and starts nothing. One run.
- Success, app (iOS 27+): `refreshButton` writes the tree; the extension's reload, lane flag on, finds it fresh. One run.
- **Script sets `sampled_at` to its data's time (H1).** The tree the tap just wrote is already older than the
  floor, so the reload runs the script again: two runs per tap, and on iOS 27 the second is in the other process.
- **The tap's run fails (M1).** A script error, `late`, `oom_guard`, `demoted` or a refused gate writes no tree, so
  the reload finds the old tree past the floor and runs again: two runs per tap in exactly the case most likely to
  fail again, each up to 4 s in a memory-capped extension.

No test drives a tap and then the provider. RefreshTapTests writes a fresh tree by hand (`writeTree`), which is the
assumption under test, and the UI test passes on a double run too: a new token appears either way.

## The iOS 27 `.main` pin: I agree

ADR-007 r1 8:03 AM item 2 says `allowedExecutionTargets` "may pin it to `.main`" and leaves the call open; the board
line hands it to the T-0449 rules. T-0449's rule is an OS split for its Open intent (`.foreground` on 26, the old
switch before), and Idris applies the same split with `.background`, so the app does not come forward. T-0449 itself
is up for dropping from 1.0 (T-3345), so that rule is a precedent, not a constraint. Reasons I agree: on iOS 27 the
app is the only process that can run every widget (lane or not, with the lane flag on or off, and it ships off,
`ExtensionBridgeTests.swift:35`); the app has the memory a numpy- or Pillow-class widget needs, which no widget
extension gives; there is no 4 s deadline; and 10-30 item 1 already planned for the app as the second writer
on 27+. Two conditions: the whole iOS 27 path hangs on one line nobody tests (M3), and the cost of a cold background
launch plus interpreter start per tap is unmeasured; I want that number from a device before the button ships.

## Tests and mutants

Slice 1's six mutants are all killed, and dropping the dead `minimumInterval > 0` clause was right. Slice 2 has no
mutants file. By reading:

- RefreshTapRule: dropping either ternary, or testing `laneFlag` for `inExtension`, is killed by RefreshTapRuleTests.
- `minimumInterval`: dropping the floor, dropping the cap, `wantsRun: true`, and a different no-ask value are killed.
- **Survive (L1):** in the TreeFile adapter (`RefreshWidgetIntent.swift:76-84`, app target, not Core) swapping
  `.atEnd` and `.never`, `entryDates: []`, and `staleAt: nil` all survive: every RefreshTapTests tree has one entry
  at `sampled_at` and no `stale_after`, which makes all of them equal to the floor.
- **Survive (M3):** deleting `RefreshTap.installAppWriter()` from `PyWidgetApp.swift:62`. Unit tests run with
  `writesWidgets` false and inject `appOverride`, so nothing sees the install. On iOS 27 every tap would be
  `reloadOnly` and no test would fail.

The T-1861 mutants: three killed. The results header says xc_mutants.py ran them with XC_LOCAL=1, which the tool
sets itself; the session rule says suites go to the runner. A note for whoever owns xc_mutants.py, not a finding here.

## The ExtensionBridgeTests guard

Not weakened. The exemption (`ExtensionBridgeTests.swift:24`, a line containing `if WidgetLane.extensionFlag`) is
unchanged. The provider is still pinned to one `ExtensionLane.shared` and to its exact line, now with the rule in it.
The new file is pinned the same way: one `ExtensionLane.shared`, exact line. The doc comment's claim "the one such
line is getTimeline's" became "two", and the test pins both. The weakness that was already there is L3: the
exemption is by line text, so a third file could add a flag-tested Python entry and pass.

## Findings

**H1. The rerun rule measures the data's age, not the run's.** `RefreshWidgetIntent.swift:84`, `LaneRerunRule.swift:14`.
`sampled_at` is author-set by design. A lane script that passes its source's time (an API's observation time, a
reading's time, as the steps and altitude premades do) writes a tree that is already past the floor, so every WidgetKit
reload runs Python (the 11-05 "never under 15 min" floor does not hold for it) and every tap costs two runs. A
script with a fixed or future `sampled_at` reruns on every reload, forever. Fix: measure the age of the last run for
this id, not `sampled_at`. The code already has two candidates: tree.json's modification date (RunResultSink reads it as
`landed`, `Shared/Bridge/RunResultSink.swift:133`), or better, the time of the id's last run row in any lane, which also covers M1.
Keep the past-the-clock guard on whatever time is used. Test: a tree with `sampled_at` an hour back, written now, does not rerun.

**M1. A failed tap run is followed by a second run.** Same lines. No tree is written on failure, so the post-intent
reload reruns. If H1 is fixed with the last run row's time (outcome ignored), this closes with it; test both.

**M2. On iOS 18-26 the button can do nothing, and looks live.** `RefreshTapRule.swift:23`. In the extension with the
lane flag off (the shipping default) every tap is `reloadOnly`; with the flag on, a widget that is not
`lane: widget` gets nothing from `ExtensionLane.refresh`. L5 s0 shows no way to reach the app from a widget
tap on 18-26 without opening it, and `LiveActivityIntent` was rightly rejected (2.5.4). So what the person sees
is a product call for T-1440's renderer: hide the button, draw it disabled, or make it a link that opens the app on
18-26 when nothing can run. Today `ui.RefreshButton()` is drawn on any widget. Decide with Ines and Maren.

**M3. The iOS 27 path is one untested line.** `PyWidgetApp.swift:62`. Pin it: a source check in the same style
as ExtensionBridgeTests that the launch installs `RefreshTap.installAppWriter()` beside `WidgetRefresh`'s, or an
app-hosted test that `RefreshTap.run` answers `.app` with no override.

**L1. The TreeFile adapter's mapping is untested** (mutants above). Add an `atEnd` tree with a last entry 30 min on, a
`never` tree with a stale mark 20 min on, and an `after` tree with an earlier stale mark, each read through TreeFile.

**L2. The UI test does not count runs.** `testQRefreshTapRunsInTheExtension` would pass on two runs. Count lane rows
for the id across the tap (exactly one more). It also skips on every machine the company has, so the board's Done
("a Simulator test on an iOS 18 runtime") is not met yet; that is a note on T-0678, not code.

**L3. The extension guard's exemption is by line text** (pre-existing). Assert that the files holding exempted entries
are exactly `Widget/PyWidget.swift` and `Shared/RefreshWidgetIntent.swift`.

**L4. `wants-run` is ignored.** `LaneRerunRule.swift:25`. Nothing writes it today. When something does, getTimeline
should run a widget that wants a run whatever its age. One line in the comment until then, so the next writer finds it.

## Not checked

Device behaviour of any kind; which process iOS 18-26 actually picks for this intent; the T-1440 Button wiring; gate
results for either commit.
{% endraw %}

</div>
