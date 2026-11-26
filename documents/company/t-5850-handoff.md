---
layout: "default"
title: "T-5850 handoff"
section: "documents"
description: "Committed on personal/b2: e036cda87c (the target, the lane&#x27;s Swift side, tests, mutants file), 2cbd111d64 (extension.md and its diagram), and this note. Not pushed, not merged."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5850-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 35 · Wed Nov 25</span><span><code>ops/plans/T-5850-handoff.md</code></span></div><h1>T-5850 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Committed on personal/b2: e036cda87c (the target, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s Swift side, tests, mutants file), 2cbd111d64 (extension.md and
its diagram), and this note. Not pushed, not merged.

## Done and green
- Items 1-4 of the task: `PyWidgetLocationExtension` (bundle id `app.pywidget.widget.location`, folder WidgetLocation/,
  Info.plist with NSWidgetWantsLocation and Maren's existing location string, Privacy/WidgetLocation/PrivacyInfo.xcprivacy,
  entitlements with group.app.pywidget, WidgetBundle `PyLocationWidgets` with kind `PyLocationWidget`, CoreLocationSource in
  WidgetLocation/ only). The provider installs the route at start; per timeline it runs `LocationRefresh.refresh` and then
  `ExtensionLane.shared.refresh` through `LocationWidgets.step` (Shared/LocationWidgets.swift): the guard always, a fix and a run
  only for an id in the app's record (`location-widgets.json` in the App Group, written at each send: `.location` puts the id
  in, any other answer or none takes it out, a rename retires the old id). The picker lists only those ids.
  The app embeds it. Widget/PyWidget.swift: `TreeProvider.drawn(chosen:family:width:)` is now static and shared; the kind and
  `@main` are `#if !PYWIDGET_LOCATION_EXTENSION` (the target sets it through OTHER_SWIFT_FLAGS, so the tester Pro line stays
  the one every target has).
- Swift side of the lane: SendLaneScan passes `location_lane=True`; `SendLane.Lane.location`; LaneMirror mirrors it as
  `.widget`; WidgetWriter reloads the new kind too (WidgetWriter.locationKind).
- Tests: PyWidgetTests whole target at e036cda87c's tree, XC_LOCAL=here, 2345 run, 0 failures, 2 skipped
  (GalleryModesSnapshotTests, as on main). New: ExtensionLinkTests x3, LocationWidgetsTests x9, SendLaneTests rows,
  LaneMirrorTests x1. Host: host_keep 21 suites, 2076 tests, 0 failed (privacy, tester Pro and lane gate tests now cover the
  new target); tests/run.sh site_how_it_works_test.py passes (61).
- Mutants (pywidget/ios/scripts/mutants-t5850.json): 5 of 5 killed, including a planted `import CoreLocation` in
  Shared/AgeLine.swift (red in ExtensionLinkTests/testPyWidgetExtensionNeverLinksCoreLocation, the built-binary read, and in the
  source scan).

## Left
1. Item 5, the Simulator run of a location widget on the new kind: NOT done. It needs a UI test in WidgetKitCheckTests (place
   "Python location widget" from the gallery, set it in Edit Widget to a script that imports pywidget.device.location, with
   `xcrun simctl privacy ... grant location` and `simctl location set`), run with WK_LANE=1 (the lane flag is what lets the
   provider ask for a fix at all; see below). That is a long runner job: queue it with `python3 tools/jobs.py create`. Model it
   on testKLaneRunsInTheExtension / testUSentProjectRunsInTheExtension. Also check the new appex's own crash reports
   (widgetkit_check.sh greps `PyWidgetExtension-` only).
2. Review (Commandment 13): Odalys or another non-author, on e036cda87c and 2cbd111d64.
3. The Investors register `app.pywidget.widget.location` before an iPhone or TestFlight build (Simulator does not need it).
4. Maren: the gallery name "Python location widget", its description and the picker's "Choose a location widget" are DRAFT
   words of mine (marked in WidgetLocation/LocationWidget.swift); the purchase string is hers, unchanged.
5. For Pernille/Ines: `WidgetLane.extensionFlag` is false in every Release build, so the location provider asks for no fix and
   runs no script there; the kind would show in the gallery of a build where the lane is off. Decide whether the kind ships
   behind the same flag (a compile-out like TreeProvider's lane call) before it goes to TestFlight. Location premades stay in
   the app (`lane-app.json`), as the decision says.
6. T-0053 part 4 (footprint of the second extension against ADR-007 s6, Wrenna's two checks) follows the Simulator run.

## Lessons
- A new target needs `xcodegen generate` again after a new test file, or the file is not in the test target (8 of my tests
  silently did not run the first time; the suite count showed it).
- `OTHER_SWIFT_FLAGS` is the place for a per-target condition when a test pins `SWIFT_ACTIVE_COMPILATION_CONDITIONS`.

## Review (Odalys, 11-25)
Verdict: pass on 964f9cb9df, e036cda87c, 2cbd111d64 (record by `tools/merge.sh review`). Non-blocking, for the next slice:
- WidgetLocation/LocationWidget.swift:86-100: the provider's own wiring is not host-tested, only the helper and the source text.
- WidgetActivityView.swift:52 and TreePresence still count only the PyTreeWidget kind.
- Deleting a project clears neither location-widgets.json nor the mirror (no removal path exists today).
- Tests/LaneMirrorTests.swift:187: an old doc comment now sits above the new test.
{% endraw %}

</div>
