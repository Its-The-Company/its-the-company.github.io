---
layout: "default"
title: "T-1694: review of 3130a21e5 (T-1679 / T-1682 / T-1683), answering t1678-pernille.md F1, F4, F5"
section: "documents"
description: "Verdict: sound with fixes. All three findings are closed on the core package. The one new defect: the PyBridge line that writes stuck into the marker has no test on any target, and the Simulator run (T-1693) would not\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1694-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1694-pernille.md</code></span></div><h1>T-1694: review of 3130a21e5 (T-1679 / T-1682 / T-1683), answering t1678-pernille.md F1, F4, F5</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-11-03.
I read the diff and the code it touches, not the author's board notes.

**Verdict: sound with fixes.** All three findings are closed on the core package. The one new defect: the PyBridge line that writes `stuck` into the marker has no test on any target, and the Simulator run (T-1693) would not catch it either as things stand.

## What I ran

- Host `swift test` on `pywidget/ios/Core`, from a scratch build path: **362 tests, 0 failures**. This matches the commit message.
- `tools/mutation_check.py` on a dereferenced scratch copy of the core package (`cp -RL`, 0 symlinks left) with `mutants-t1683.json`, `--filter RunLogRecorderTests`: **13 of 13 killed**. That includes my F5 mutants M1, M2 and M3.
- I did not run xc.sh, xcodebuild or a Simulator (disk gate). The PyBridge and WidgetWriterTests parts are review by reading only.

## Findings closed

- **F1 (stuck re-recorded as killed): closed.** `recover` now returns early when the widget already has a `stuck` row for the same `launchRunID` (`RunLogRecorder.swift:186`, `hasStuckRow`). With only the marker's `stuck` line, it writes one `stuck` row and `WidgetStatus.stuck`. The expiry re-check under the mutex still decides status.json. `noteForeground` keeps the `stuck` line, and the next `begin` starts a clean marker. Both are tested. Lock order in PyBridge is fine: `markStuck` drops `lock` before it takes `markerLock`, and the `markedRun == runID` check makes the line a no-op if the run has already returned and `end()` has run.
- **F4 (console rows for preview/Shortcut, path as id, `launch: ""`): closed.** The marker carries `context <raw>`. Recovery writes a console row only for `app` (`:180`), under `project(name)`, which is the last path component, and passes `launch` through as optional. A preview's marker is asserted to say `context preview` (WidgetWriterTests, Simulator). The spelled-out `"app"` is pinned to `RunRequest.Context.app.rawValue` there too. The id residual is P3-2 below.
- **F5 (mutex re-checks and prune survive mutation): closed.** The new `Hook` at `.row` lands an expiry after `prepare` and before the status write, which is the T-1169 window. M1, M2 and M3 die.

## New findings

### P2-1. The only writer of the marker's `stuck` line is untested on every target
`pywidget/ios/Shared/Bridge/PyBridge.swift:683` (`markerLock.withLock { if markedRun == runID { crashMarker.noteStuck() } }`).
- **Failure.** Every F1 test builds `LastRun(stuck: true)` by hand, or calls `CrashMarker.noteStuck()` directly. Nothing checks that a run which really goes stuck leaves `stuck` in the marker. If someone deletes line 683, the host suite still passes. So would the Simulator suite: the only marker assertion added on that side is the preview's `context` line. Today `hasStuckRow` hides the gap in the common case, because WidgetWriter writes the batch `stuck` row. It does not cover the case the line exists for: the person quits before the writer's row lands, or the run is not a widget run. That is product code going to TestFlight with no test that exercises it.
- **Fix.** In the existing stuck case in BridgeTests (the HoldGIL fixture), read the marker file while the bridge reports `stuck` and assert it <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a `stuck` line, its `run <id>`, and `context widget` or `context app`. Add the deletion of line 683 to the Xcode mutants for T-1693, so the Simulator run <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it.

### P3-1. A stuck `app` (console) run is still recovered as `killed`
`RunLogRecorder.swift:180-184`. The console branch ignores `last.stuck`. ADR-007 5.3 talks only about widgets, so this does not break the ADR. Still, a console script stuck in C, quit through 5.3's own remedy, shows as `killed` in the log. Passing `last.stuck ? stuck : killed` would make it match the widget path. Review note only.

### P3-2. Scratch console runs get a different id at recovery than live
`Examples.swift:20` names an unsaved editor run `main.py`. The live row uses `fileTitle ?? "console"` (`PyWidgetApp.swift:784`), so a scratch run is `console` while it is live and `main.py` after recovery. This gap is in my own F4 fix text ("last path component, matching `fileTitle`"), not in the implementation. The container path no longer leaks, which was the part that mattered. To close it, have the marker carry the console's display title (or none, giving `console`).

### P3-3. The console's launch line still says "possibly out of memory" after a stuck run
`CrashMarker.swift:67` (`LastRun.message`), shown by `takeCrashLine`. The marker now knows the run went stuck, but the line the person reads after quitting and reopening (5.3's remedy) still blames memory. It does this for every context, widget runs included. The copy belongs to Maren (contract s7), so this is a note for her, not a code fix.

### P3-4. Naming: `LaunchReport.recovery` is documented as "the killed row's decision"
`RunLogRecorder.swift:143`. A stuck-only recovery reports `.writeKilled` with `stuckRow = true`. The behaviour is correct. The doc comment should say "the recovered row's decision" before T-1677 wires `atLaunch` and someone reads `.writeKilled` as "a killed row was written".

## Board

- P2-1 goes to Idris as a board line (Opus high). I raise no P0 or P1.
{% endraw %}

</div>
