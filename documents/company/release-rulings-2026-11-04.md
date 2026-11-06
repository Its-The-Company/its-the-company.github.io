---
layout: "default"
title: "Release rulings, 2026-11-04 (Ines, 21:30 ET)"
section: "documents"
description: "From Wrenna&#x27;s T-1761 draft (pywidget/docs/release/rejection-replies-draft.md, dcdf5aa0c). Every fact below I read at HEAD (6124c8b96) myself. Tenet 4, Commandments 6 and 13: nothing goes to App Review that the build\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/release-rulings-2026-11-04.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 15 · Thu Nov 5</span><span><code>ops/plans/release-rulings-2026-11-04.md</code></span></div><h1>Release <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>, 2026-11-04 (Ines, 21:30 ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
From Wrenna's T-1761 draft (pywidget/docs/release/rejection-replies-draft.md, dcdf5aa0c). Every fact below I read at HEAD (6124c8b96) myself. Tenet 4, Commandments 6 and 13: nothing goes to App Review that the build can't back. Internal TestFlight (T-2270) is not held by any of this; external testing and App Review are.

## R1. T-2309: "no code paths for features not described here" (review-notes-draft.md:39; replies 2.5.19-5, 2.3.1-4)

Checked: WidgetLane.extensionFlag is false outside a forced Debug build (Shared/LaneGuard.swift:13-17); Widget/PyWidget.swift:37 calls ExtensionLane.shared.refresh behind it; Shared/ExtensionLane.swift is 557 lines and only 527-557 sit under `#if PYWIDGET_LANE_FORCED && DEBUG`; the extension target compiles all of Shared/ (project.yml:329-331), which also holds Shared/Bridge/PyBridge.swift, pwbridge.c and PythonRuntime.swift, and links Python.xcframework (project.yml:341). Wrenna is right, and it is wider than the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> file: the Release widget extension carries an interpreter bridge.

**Ruling.** Compile it out, don't reword around it. The lane and everything in Shared/ that only the lane needs leave the Release widget extension (`#if DEBUG` or target excludes), and the Python link goes with them if nothing Release-reachable in the extension still needs it. The "no code paths" sentence stays in the notes only behind a <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G8</span> bracket that a Release-extension symbol check closes; if Python must stay linked there, the sentence becomes "Nothing is switched on at runtime or from a server." and the 2.5.19 reply says the same.

## R2. T-2310: the ctypes sentences (notes; replies 2.5.1-1, 2.5.1-2, 2.3.1-3, 4.7.2-2)

Checked: the denylist and the fail are build rules (ios/scripts/stdlib_cut.py:31, :280; ios/scripts/install_stdlib.sh:43-46 forces zip outside Debug, :88-97 runs the check in every mode); pywidget/tests/escape/cases.json:4 says a builtin or frozen `_ctypes` is outside the host check; T-0043 is open; no Release archive has had G8.

**Ruling.** Confirmed: those sentences stay out of the notes and the replies until T-0043's Simulator escape run and G8 on a Release archive both pass. A build rule is a promise about the next build, not a fact about the one we submit. Meanwhile the host check gets the part it can do without Xcode: refuse a Python binary that has `_ctypes` built in or frozen.

## R3. T-2311: G13 fired; the Pro premade in Shortcuts

Checked: the only App Shortcuts are Run Script, Run Script with Input and Refresh Widgets (App/Intents/RunScriptIntents.swift:207-215); no Open intent or project entity is on main; App/ProjectManifestReader.swift (T-1124, the host half of T-0449) is in the app target with no caller. G13's date, 2026-11-03 23:59, has passed.

**Ruling (a).** G13 fired by its own words, and I hold it to them. The T-0449 bracket, the held store sentence and the press-kit row come out; the feature is 1.1; code that serves only it leaves the Release app. No extension of the date.

Checked: ShortcutRun.source(for:in:) (RunScriptIntents.swift:101-113) returns a premade's bundled source for any premade id in the library and never asks ProGates.isPremadeLocked (Shared/ProFlags.swift:163). The library is the widgets folder (Shared/WidgetID.swift:230), which keeps a Pro premade after a refund or on a second device before restore. So a non-buyer runs Pro code from Shortcuts, and matrix row 40(a)'s "This script is part of Pro." is not in the code.

**Ruling (b).** A product bug, confirmed. P1 for Idris, ahead of T-2270's external stage: a locked premade throws a plain error with exactly row 40(a)'s words, and runs nothing.

## R4. T-2491 (T-2272 F1): does it gate the first internal TestFlight build? (2026-11-05 21:07 ET)

Checked at HEAD c0e24c66d: WidgetLane.extensionFlag is true only under (PYWIDGET_LANE_FORCED && DEBUG) \|\| PYWIDGET_LANE_GATE (Shared/LaneGuard.swift:16-20). project.yml sets neither (SWIFT_ACTIVE_COMPILATION_CONDITIONS is $(inherited) SWIFT_PACKAGE); only widgetkit_check.sh and gate_session_build.sh put them on an xcodebuild line, and check_lane_gate.py plus tools/upload.sh refuse an archive that carries the gate mark. The extension's one way in is Widget/PyWidget.swift:39, behind the flag. logClosed (ExtensionLane.swift:213, :230) and the LaneRunFiles writers (recordLate, record(refusal:), and writeMarker via WidgetLaneGuard.carryOut, ExtensionLane.swift:449) are all reached only from ExtensionLane. The app's one LaneRunFiles use is clearLastRun, which only removes.

**Ruling (A).** T-2491 does not gate the first internal TestFlight build: with the flag false its code never runs, so no folder can come back. This narrows Pernille's "not for TestFlight yet" to the internal build only, for that reason. It stays P1 and gates any build in which the flag can be on outside a gate session: the commit that gives extensionFlag a true default in Release, and so external testers and App Review if that commit comes first. T-2456's other gates (T-2486, T-2662, the full suite) are unchanged.

## R5. T-2628: does the Files import UI test gate the first internal TestFlight build? (2026-11-05 22:08 ET)

Read: J-20261105-2106-xc-test at 94cebc4c0, 1407 executed, 24 skipped, 2 failure lines, all in one test: ProjectsTransferUITests/testExportAndImportAFileAndAZipThroughFiles, ProjectsTransferUITests.swift:115 "imported beside the original" (+1 more); its full log stays on the MacBook, so there are no screenshots here. The same test, with the same :115 assertion, passed alone on the local Simulator at 478c01c58 (1 executed, 0 failures; ops/runs/T-2486-T-2456-local-478c01c58-20261105.txt, D). 478c01c58 is an ancestor of 94cebc4c0, and the only pywidget/ios difference between them is App/Runtime/pywidget/__init__.py and context.py: no Swift, nothing on the import path. The rename itself is unit-tested and passed in the same full suite: ProjectTransferTests :34-38 assert "main 2.py" and "TOOL 2.py" through ProjectStore.importFile, which names every import with freeName (ProjectTransfer.swift:84). Earlier full-suite runs failed this test at the picker step (:54).

What the failure is. Not a duplicate-rename bug: that logic is unit-tested green in the same run, and the end-to-end path passed at the same Swift. The red sits in the UI steps between the picker and the row: the importer allows several files, so a tap selects and Open must be pressed, and pick() presses Open only if it appears and is enabled within 2 s, then moves on silently. A late Open leaves the picker up and :115 times out. That fits a test-timing fault, but it is not proven: without the runner's screenshots I cannot exclude a real read refusal of the picked file on that Simulator (readPicked; the app would show the problem alert). So: most likely test timing, not proven.

**Ruling (A).** The internal-only build uploads now. Tenet 4 forbids submitting an untested build; this one is tested: 1406 of 1407 green on the full suite, and this test green alone at the same app code. Internal TestFlight goes only to the Investors' phones and is no submission to App Review. The build's notes ask the Investors to import a .py through Files into a project that already has a file of that name, and to say whether it arrives as "<name> 2.py". T-2628 stays a gate, unchanged, for external testers and App Review: it closes only with a green full-suite run of this test, or with the runner's screenshots proving a test fault and the test fixed (pick() should wait for Open to be enabled and assert the picker closed, not skip). If an Investor's import fails on a phone, it is a P1 product bug and the external stage waits for it. T-2456's other gates are met. -- Ines
{% endraw %}

</div>
