---
layout: "default"
title: "Review of T-2316 at 744d96d1: Shortcuts ask ProGates before a premade runs (R3, matrix row 40(a))"
section: "documents"
description: "The gate is in the right place and it holds on HEAD. Both Shortcut intents (Run Script, Run Script with Input) go through ShortcutRun.run, which asks source(for:in:) before Python starts. A premade id is resolved by\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2316-744d96d1-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t2316-744d96d1-pernille.md</code></span></div><h1>Review of T-2316 at 744d96d1: Shortcuts ask ProGates before a premade runs (R3, matrix row 40(a))</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4024, Commandment 13). Author: Idris. Reviewed: 0e3126a7a3 (the change:
ios/App/Intents/RunScriptIntents.swift, ios/Tests/ShortcutProGateTests.swift, ios/Tests/mutants-t2316.json),
e374edbbfc (ios/Tests/mutants-t2316-results.txt), e0c9ef4163 (board) and 744d96d16a (the author's memory only; nothing
app-facing). Also read, for what the gate stands on and every other way an App Intent reaches Python:
Shared/ProFlags.swift (ProGates.isPremadeLocked), Shared/ProEntitlement.swift (gates, current, mayDraw),
Shared/Premades.swift (forWidgetID, laneEntry), Shared/WidgetID.swift (key, problem, WidgetFolder.url, WidgetLibrary.ids),
Shared/RefreshWidgetIntent.swift, Shared/RefreshWidgetsIntent.swift, Shared/WidgetPlacement.swift (ChooseWidgetIntent),
Shared/ExtensionLane.swift:347, 782, App/Bridge/WidgetWriter.swift:103-115, 400-420, 705-720. Paths are under
pywidget/. Line numbers are at HEAD ce68534814; the gate's lines (RunScriptIntents.swift:96-130) and the test file are
byte-identical at 744d96d1. Date: 2026-11-16.

Prior review: none. 744d96d16a names a review line T-2516 for me; no T-2516 is on ops/board.md, in any archive or in
docs/reviews/, so that review was never queued (the queue audit found the same, ops/queue_audit/ledger.jsonl, T-4024
rows). This is the first read.

Tests:
- Simulator, local (XC_LOCAL=1, iPhone 17 Pro, HEAD ce68534814, `-only-testing:PyWidgetTests/ShortcutProGateTests`):
  6 executed, 0 skipped, 0 failures (ops/runs/xcodebuild-20261116-195701.log).
- The same request without XC_LOCAL was queued as a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> job (ops/lane-outbox/b3-1794875769912258000-55766.json); it
  runs on main when this branch lands. Nothing ran from it here.
- Not rerun: the author's mutants (4/4 killed, mutants-t2316-results.txt) and the full unit target.

## Verdict: PASS with findings

The gate is in the right place and it holds on HEAD. Both Shortcut intents (Run Script, Run Script with Input) go
through `ShortcutRun.run`, which asks `source(for:in:)` before Python starts. A premade id is resolved by
`Premades.forWidgetID`, which compares by `WidgetID.key`, and the gate is asked of `premade.name`, the bundle's own file
name. So a case-varied folder such as `PyWidget.Premade.Quote`, which `WidgetFolder.url` accepts and an own script could
create in the App Group, still meets the gate. A locked premade throws before the folder's main.py is considered, so
it cannot fall through to a planted copy. The test file plants one to check that. The gates come from
`ProEntitlement.gates()`, the bundled flag file and StoreKit read now, not ProStore's cached flag. So a refund counts
at once and a cold background launch does not lock a buyer out. The error text has no price, no sales word and no
link, and a test scans every intent error for those. That is what App Review 3.1.1 and 4.4 want here.

I found no other App Intent path that runs a Pro premade without a gate:
- Refresh Widgets: `WidgetWriter.proCheck` (WidgetWriter.swift:409-420) asks `mayDraw` for every premade id.
- The per-widget refresh tap (`RefreshWidgetIntent`, added after T-2316; `isDiscoverable` false, so not in Shortcuts):
  in the app it goes through `refreshButton` and the same `proCheck`. In the extension it goes through
  `ExtensionLane` (ExtensionLane.swift:347, `mayRun` = `mayWriteTimeline`).
- A case-varied premade id on the widget paths: `mayDraw` and the lane test the prefix by case, but neither of them
  will then run a premade. `WidgetWriter.source` (WidgetWriter.swift:103-115) refuses a non-exact first-party id
  (`WidgetID.problem`), and `laneEntry` requires `premade.widgetID == id`. Both run nothing.
- `ChooseWidgetIntent` only lists and draws; its draw asks `mayDraw`.

On HEAD, `run` now prunes the run log before the gate (T-4205), which is harmless on the locked path. `isPremadeLocked`
gained exemptions for the gate build's and the launcher's premades, both inside compile conditions that the default
configuration does not set (project.yml:306), and neither set is sold.

What the change does not do well is wait. The Shortcut's Pro check reads StoreKit with no time limit. The widget writer
was given a limit for exactly this read (M1). There is also one message that is false in the closed state, and the tests
pin it (L1).

## Findings

### M1. The Shortcut's Pro check waits on StoreKit with no time limit (T-4653)

- Where: `ios/App/Intents/RunScriptIntents.swift:103-106` -> `ios/Shared/ProEntitlement.swift:51-61` (`for await` over
  `Transaction.currentEntitlements`, unbounded), called from `RunScriptIntents.swift:121` for every premade id, free
  ones included.
- The failure: the company has already seen StoreKit fail to answer. That is why the widget writer bounds this same
  read: `stepLimit` and `bundledGates` (WidgetWriter.swift:56, 86, 400-420; T-3899, T-3900, T-4277), and
  FirstOpenPassTests fails a 30 s non-answer. The Shortcut path has no such bound. When StoreKit hangs, a Shortcut that
  names any premade waits until Shortcuts' own time limit ends the intent. The person gets the system's error, not
  ours, and no row explains it. Whether the `for await` even notices that cancel is up to StoreKit. A free premade
  waits too, although the bundled flag file alone already says it may run (ProFlags.swift:170).
- Why it matters: it is a buyer's Shortcut that fails, with no cause given, on the path T-2316 exists to make right.
  It is no gate bypass: nothing runs while the read hangs.
- Fix: ask the bundled gates first and go to StoreKit only when they lock the premade. Bound that read with the
  writer's step limit. On no answer, throw a distinct, true error ("couldn't check Pro just now, try again"; <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> copy,
  DRAFT), never `.proPremade`, which would tell a buyer that the purchase is gone. The seam needs a gates provider, not
  only a `ProGates` value. Tests: a provider that never returns ends with the new error within the limit and starts no
  run; a free premade runs without asking the provider.

### L1. In the closed state a free premade is called "part of Pro" (T-4654)

- Where: `ios/Shared/ProFlags.swift:170` (`guard let c = config else { return true }`: the closed state locks every
  premade) with `ios/App/Intents/RunScriptIntents.swift:86`; pinned by `ios/Tests/ShortcutProGateTests.swift:112-121`,
  which expects `.proPremade` for Countdown, a free premade.
- The failure: in the closed state nothing is for sale (`productID` is nil), yet the Shortcut tells the person that
  Countdown "is part of Pro". The person cannot buy Pro, and Countdown is not part of it. If Restructuring decision 9 is
  answered A (T-2372 empties the locked set), the closed state becomes the only time this error can appear, and every
  time it appears it is untrue.
- Fix: when `gates.sellsPro` is false, throw a separate error that says the script can't run in this copy of PyWidget,
  with copy from Maren, DRAFT (C51). Change the closed-state test to expect it.

### L2. Two of the change's own claims have no test (T-4654)

- Where: `ios/App/Intents/RunScriptIntents.swift:114-115` ("so a case-varied id cannot slip past it") and 103-106 (the
  production path, no override).
- The failure: every test uses lower-case ids and `gatesOverride`. A mutant that asks the gate with
  `String(id.dropFirst(prefix.count))` would survive all six tests (by reading; I did not run
  either mutant). It fails safe for a Pro premade (an unknown name is
  locked), but it locks a free premade that has a case-varied id. A mutant that returns
  `ProGates(config: ProConfig.bundled(), entitled: true)` from `gates()` unlocks every Pro premade in the product, and
  it would also survive: `override-ignored` only checks that the override is read.
- Fix: a test over `PyWidget.Premade.<Free>` and `PyWidget.Premade.<Pro>` folders. Add one bounded test of `gates()`
  with no override under the unit tests' StoreKit (no purchase): a Pro premade throws, as ProStoreTests.swift:600-630
  does for the extension's path. Add both mutants to mutants-t2316.json.

## Observations (no line)

- O1. An own script can run a premade's file. `<bundle>/Runtime` is on sys.path (Shared/Bridge/PyBridge.swift:49), the
  premades are installed in `Runtime/premade` (project.yml:289-298), and the runner has no finder that refuses them.
  An own script that execs or `runpy`s the bundled file therefore runs a Pro premade's code through the own-script path,
  in Shortcuts and everywhere else, without the gate. This lies outside T-2316's diff, and decision 9 (A) would make
  it moot. I put a note on T-2372 so that a B answer opens a line, not lose it here.
- O2. The Shortcuts picker (`ScriptQuery`, RunScriptIntents.swift:36-55) lists locked premades. A free person can choose
  one and learns that it is locked only at run time. This is no App Review risk, and the gallery shows locked premades
  too. Maren's call if it should change.

## Run

Local Simulator, iPhone 17 Pro (6DC42940), XC_LOCAL=1, HEAD ce68534814: `xc.sh: tests: 6 executed, 0 skipped, 0 failures`,
exit 0, full log ops/runs/xcodebuild-20261116-195701.log. The run before it never reached xcodebuild, and this one stalled at the
same step at first. Both hung inside xc.sh's pre-build `xcrun simctl listapps` on that Simulator, which has no timeout (xc.sh header, T-3002 list).
The first was stopped by my session's 10-minute limit with no log. On the second I ended the hung `simctl listapps`
after 10 min 20 s (my own process), and the run went on to the result above. Nothing else was touched.
{% endraw %}

</div>
