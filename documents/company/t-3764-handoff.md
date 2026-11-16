---
layout: "default"
title: "T-3764 handoff: the iPad window test does not go red without the fix"
section: "documents"
description: "What the green means: settle() waits and then asserts counts(app) == &quot;sessions=n scenes=n&quot;. A missing probe (nil) or any other count would fail. So after the launcher link and after the widget link, the app itself\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-3764-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 26 · Mon Nov 16</span><span><code>ops/plans/T-3764-handoff.md</code></span></div><h1>T-3764 handoff: the iPad window test does not go red without the fix</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-16, 9:05 AM ET. Line: T-3764 (T-3692 F3, pywidget/docs/reviews/t3671-pernille.md). Not ticked: the red
run, which is the line's point, does not reproduce. Nothing of the probe or the test is committed (the packet says to
commit nothing half-made). The working copy is kept in scratch, below.

## What was built (uncommitted, kept)

- `SceneCounts` Debug probe (App/SceneFile.swift, `-ui-scene-probe`): an accessibility value
  "sessions=<UIApplication.openSessions.count> scenes=<connectedScenes.count>", read when the tree is read.
- App/PyWidgetApp.swift: `.background(SceneCounts())` under `#if DEBUG`, next to SceneTitle.
- UITests/LauncherWindowsUITests.swift: `windowedApps()` sets Settings > Multitasking & Gestures > Windowed Apps once per
  run (the screenshot shows it selected); `settle()` also asserts `counts(app) == "sessions=n scenes=n"`;
  `galleryPageShowsOnceAndCloses` steps through the Events settings Page that T-4468 now pushes first.
- Diff: `/Volumes/SANDISK SSD/company-scratch/T-3764-idris/t3764-probe-and-test.diff` (146 lines, taken with the
  handlesExternalEvents line already restored, so it has the probe and the test changes only).

## Runs (Mac mini, Simulator "T3764 iPad", iPad Pro 13-inch, iOS 27.0, id 25AF538D-F031-4BA6-BEA3-6AD607C6C558)

All with the `.handlesExternalEvents(preferring: ["pywidget:"], allowing: ["pywidget:"])` line REMOVED:

1. 7:53 AM ET, ops/runs/xcodebuild-20261116-075154.log, result bundle
   `~/Library/Developer/Xcode/CompanyDerivedData/ios-c2f7c498/Logs/Test/Test-PyWidget-2026.11.16_07-53-30--0500.xcresult`.
   All five tests ran. 4 passed, 1 failed. testOneOpenWindowTakesTheLinks and testTwoOpenWindowsStayTwo passed. The one
   failure, testAppNotRunningWidgetLinkOpensOneWindow at :134 ("the page is not countdown's"), is not about windows; see
   below. The line's state for this run is inferred, not watched: the saved with-line copy is from 7:51:50 AM and the
   run started at 7:51:54 AM. So I ran it again:
2. 8:53 AM ET, ops/runs/xcodebuild-20261116-085300.log, result bundle
   `.../Logs/Test/Test-PyWidget-2026.11.16_08-53-39--0500.xcresult`. Only the two probed tests ran, after I checked that
   the line was absent (grep count 0). **2 executed, 0 failures.**

What the green means: `settle()` waits and then asserts `counts(app) == "sessions=n scenes=n"`. A missing probe (nil) or
any other count would fail. So after the launcher link and after the widget link, the app itself counted exactly 1
session and 1 scene (one window), and exactly 2 and 2 (two windows), with no handlesExternalEvents at all. Screenshots
(scratch red1/, red2/) show Windowed Apps selected and one IDE window filling the screen.

## What this says

On iOS 27.0, in Windowed Apps, a URL opened through `XCUIDevice.shared.system.open` (LaunchServices, the Debug-only
scheme) goes to the open scene even without the modifier. The test, with the probe, still cannot show the fix was
needed. That is F3's finding, now measured with session counts and not only views. Not settled:

- Whether a real WidgetKit tap (widgetURL from a Home Screen widget) routes differently from `system.open`. That is the
  path the T-3667 bug was reported on, and F4's open point too. A UI test that adds the countdown widget to the iPad
  Home Screen and taps it is the next thing that could go red. -> T-4581.
- Whether iPadOS 26 behaves differently from 27.0. Only 27.0 runtimes are installed here.

Keep the line in either way: Apple's routing rule (research/inbound/apple, 2026-11-08) makes it the documented way to
send these links to an open window. This run only shows that the default did not misroute in this setup.

## Found on the way

- testAppNotRunningWidgetLinkOpensOneWindow fails on the iPad, with the line in or out (also the 7:35 AM run,
  ops/runs/xcodebuild-20261116-073507.log). When the widget link cold-starts the app, countdown's sheet says "The
  preview didn't run.", so there is no `gallery.well.systemMedium`. A warm app shows the preview. It may be a real
  cold-start bug in the preview on a link launch. -> T-4582.
- This worktree's Vendor/Runestone was a symlink to the main checkout's copy, which lacks patch runestone-0003, so the
  build failed (RunestoneEngine.swift:166, `lineNumberMarks`). I replaced the symlink with a local copy plus 0003 (PIN
  lists 0001-0003). The tarball cache had no Runestone tarball for `fetch_editor.sh --offline`.

## Left

Decide T-3764: close it as "measured, no red under system.open" with the probe and test landed (diff above, reviewed
by someone else), or hold it for T-4581's real-tap test. PyWidgetTests was not run in this session, because nothing app-side
is committed.
{% endraw %}

</div>
