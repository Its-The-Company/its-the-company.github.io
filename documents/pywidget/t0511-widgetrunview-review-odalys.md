---
layout: "default"
title: "T-0511 (a): review of 56d5e7d7, App/WidgetRunView.swift"
section: "documents"
description: "No High finding. The view is not reachable by a person, it cannot corrupt a tree.json, and it has no crash path. The two Medium findings are about the Release binary carrying test hooks and the hook&#x27;s place once T-0512\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0511-widgetrunview-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0511-widgetrunview-review-odalys.md</code></span></div><h1>T-0511 (a): review of 56d5e7d7, App/WidgetRunView.swift</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. 2026-10-28 10:00 ET. Independent review (Commandment 13): I read the commit and the code at
HEAD 777f40e0, not the author's notes. Read-only: no Swift changed, no build run.

Files read: App/WidgetRunView.swift (unchanged since 56d5e7d7), App/PyWidgetApp.swift, App/Bridge/RunResultSink.swift,
App/Bridge/PyBridge.swift (run, records, lastRecordSeq, runInfo), App/Bridge/BridgeLimits.swift, App/Info.plist,
App/Intents/RunScriptIntents.swift, App/WidgetInstallView.swift, Widget/PyWidget.swift (TreeProvider),
Tests/PreviewQueueTests.swift (no-bypass scan), UITests/WidgetKitCheckTests.swift (testETokenOnTheHomeScreen),
project.yml (schemes), tools/alpha_rows.tsv (A4b, A5b), scripts/editor_bench.sh.

## Verdict: approve with fixes

No High finding. The view is not reachable by a person, it cannot corrupt a tree.json, and it has no crash path.
The two Medium findings are about the Release binary carrying test hooks and the hook's place once T-0512 lands.
Neither blocks the Day 10 alpha.

## The checks asked for

1. Reachable in a release build? No, not by a person. `-widget-run` and `PW_WIDGET_SOURCE` reach
   `ProcessInfo` only from Xcode, `xcrun devicectl`/`simctl`, or XCUITest. Info.plist has no `CFBundleURLTypes`,
   the app has no `onOpenURL` or `onContinueUserActivity`, and the intents (RunScriptIntents.swift, `openAppWhenRun =
   false`) never set launch arguments. A tap on the icon, a widget, or a Shortcut cannot open this screen.
2. What it writes: one file, `widgets/new_widget/tree.json` in the App Group, through `RunResultSink.appGroup`
   (RunResultSink.swift:84-90). The tree is checked against viewtree.schema.json first (`validate`, :82), the id is a
   constant and goes through `WidgetFolder.url` (:85), and the write is `.atomic` (:88). A failed run, a bad tree
   or a refused id writes nothing, so the widget keeps its last good tree. It can replace a real `new_widget` tree,
   which is by design (it is the folder TreeProvider draws, Widget/PyWidget.swift:40) and only on a developer or
   test install. It cannot leave a half-written or invalid file.
3. Crash paths: none found. No force unwraps or `try!`; an empty source (:28), a Python start failure (:29) and a
   refused queue (:37-38) each return a "failed: ..." label. A run with no tree, an error, or an invalid tree ends
   in `.noTree` (:55-56). `String(decoding:as:)` (:47) does not trap on bad UTF-8.
4. Threading: correct, see L1 for one cost. Under Swift 6 the struct is main-actor isolated (View conformance),
   so `run` runs on the main actor; PyBridge is lock-guarded and has no `DispatchQueue.main.sync`, so the
   `consumerQueue.sync` in `lastRecordSeq` (PyBridge.swift:619) cannot deadlock. Subscribing from `lastRecordSeq`
   before `run` is queued, with the replay buffer, means no record of the run is missed (:31-32).
5. `#if DEBUG`: see M1. The UI tests run in Debug, so compiling it out breaks nothing measured today.
6. App Review: nothing a reviewer can reach or see. The code runs Python the person supplies (no download), and
   no screen exposes it. M1 removes the remaining question of a hidden code path in the shipped binary.

## Findings

### Medium

**M1. Test hooks ship in the Release and TestFlight binary.**
App/PyWidgetApp.swift:31-33 and :68-70; App/WidgetRunView.swift:11-61; the sibling App/WidgetInstallView.swift
(`-widget-install`, PyWidgetApp.swift:65-67).
Failure scenario: today, none a person can trigger (check 1). The risk is what the binary carries: a code path
that runs any script from the environment and writes the one widget folder the extension draws, plus
WidgetInstallView, which deletes `widgets/new_widget/` whole (`try? fm.removeItem(at: dir)`, main.py included)
before copying a fixture. After T-0512 that folder is a person's real widget. A future change that forwards
arguments (a URL scheme, a debug menu, a Shortcut parameter) would make both reachable, and nothing in Release
would stop it.
Fix: wrap the `-widget-run` and `-widget-install` branches (init and body) and both view files in `#if DEBUG`.
What it would break, checked: A4b and A5b (tools/alpha_rows.tsv:23, :25) run through the PyWidget scheme's test
action, which is Debug (project.yml:292-302); the PreviewQueueTests scan reads source text, so its allowlists are
unchanged. The only Release test run is the EditorBench scheme (scripts/editor_bench.sh:16), which needs
`-editor-bench`, so leave that branch (and `-theme-check`, `-editor-check`, `-stale-check`, which write nothing)
as they are or guard them in a later line. Note for the record: A4b proves the Debug build, as it already does.
Same line: the comment at PyWidgetApp.swift:34 ("Python is not started") is false for `-widget-run`, which starts
Python in WidgetRunView; and because `bridge = false` there, `setDeviceHandler(DeviceRouter.handle)` never runs,
so a token script that calls a device API gets Unsupported, unlike the product. Correct the comment and say so.

**M2. The no-bypass allowlist and T-0512's done condition now disagree.**
Tests/PreviewQueueTests.swift:203 allows exactly `["App/WidgetRunView.swift"]` to build a `.widget` run. T-0512's
done condition says that test "allows this path and the preview queue only".
Failure scenario: T-0512 lands its write path, the scan then finds two files, and either the allowlist quietly
grows to keep the hook (the scan stops meaning "only the product writes widgets") or the hook is deleted and A4b
(the token test, alpha_rows.tsv:23) loses its runner on the eve of the freeze.
Fix: decide it inside T-0512, not after. Preferred: once F19's hook-free UI test is green, point A4b at that test
and delete WidgetRunView (and its `-widget-run` branch); the allowlist then names T-0512's file only. If the hook
must stay for A4b, keep it under `#if DEBUG` (M1) and let the allowlist name it with that reason.

### Low

**L1. Validation, the file write and the read-back run on the main thread.** WidgetRunView.swift:48-51.
`sink.finish` validates a tree of up to 512 KiB against the schema and writes it on the main actor; :51 reads it
back. Harmless for a test screen. Failure scenario: T-0512 copies this shape into the product's foreground
refresh, and a large tree costs a visible hitch on every app open. Fix (guidance for T-0512, no line): run
`finish` off the main actor (a detached task or the bridge's queue) and hop back for the UI.

**L2. The run budget is the stop deadline.** WidgetRunView.swift:35 passes `BridgeLimits.stopDeadlineSeconds`
(5.0 s, the stuck deadline after a stop) as `budgetS`. There is no widget budget constant. A run that hits it is
stopped and may take up to 5 s more before it is declared stuck, about 10 s in all. Fine for the token script.
Fix: T-0512 should add a named widget budget to BridgeLimits (and to `_pywidget_runtime.limits`) and use it here.

**L3. Every window runs the script.** PyWidgetApp.swift:68-70 sits inside `WindowGroup(for: SceneFile.self)`. On
iPad, a restored second window, or a scene reconnect that re-creates the view, starts another `.task` and another
run. Writes are atomic, so the result is extra runs, not a bad file. Fix: none needed if M1 lands; otherwise run
once per process (a static flag).

**L4. Records and stdout are kept whole.** WidgetRunView.swift:40-44 appends every record of the run with no <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>;
a script that prints in a loop for its 5 s budget grows memory. The Shortcut path caps stdout at 1 MiB
(`shortcutMaxStdoutBytes`). Fix: none for a test hook; if it stays, keep only the stdout prefix the test reads.

Not a finding: a run that never finishes leaves the label at "running"; testETokenOnTheHomeScreen has its own
30 s deadline and fails with the label shown, so the hang is bounded.

## Board

M1 and M2 each have a `[build] Idris` line before "## Chat copy button". L1 and L2 are guidance for T-0512's
author and reviewer; L3 and L4 need no work if M1 lands.
{% endraw %}

</div>
