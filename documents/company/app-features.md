---
layout: "default"
title: "The app queue as features (T-4116)"
section: "documents"
description: "Ines with Idris, 2026-11-12. Two sittings: lane a until 11:10 AM ET, where the session stopped at the usage limit, and lane b from 1:23 PM ET. Ask: Investor an Investor #41 c6814024711 (10:58 PM ET 11-11: the app is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/app-features.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/app-features.md</code></span></div><h1>The app queue as features (T-4116)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines with Idris, 2026-11-12. Two sittings: <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a until 11:10 AM ET, where the session stopped at the usage limit,
and lane b from 1:23 PM ET. Ask: Investor an Investor #41 c6814024711 (10:58 PM ET 11-11: the app is early in its
building, not in polish; restructure the app lines into bigger changes that run quicker and show the constructive
approach) and an Investor #41 c6814286499 (11:13 PM ET 11-11: build a way to merge tasks so fewer iPhone tests are
needed). Part of T-4092. It builds on ops/plans/task-process-redesign.md (T-4122), section 4.1.

The list is data: ops/plans/app-features.json. Its check is ops/plans/app-features-check.py, which reads the board
and the audit's ledger and fails on a judged line that sits in no feature, a line in two, a step that is no longer
open, and a target path that does not exist. Every count here is that script's output at 1:3x PM ET 11-12 unless a
line names another source. Sections 1 and 2 are its `--table` and `--md` output and go stale as steps finish; run
the script for the live list.

## 0. In five lines

1. **The open app lines are now 14 features.** 206 of the 300 open app lines sit inside a feature as its steps.
   Each feature has one owner, one reviewer, and a done condition a person can see on the iPhone.
2. **Nothing was deleted or reworded.** Every step keeps its ID, text and citations. It now names its feature in
   its Links field, so the board shows 14 pieces of the app being built and what is left in each.
3. **Proposal: a feature is built in long sessions with a commit per step.** Each step is checked on the Mac by
   the test classes its card names. No step has its own iPhone run, merge or review line.
4. **A session's end is the merge point: one review, one iPhone run, one merge.** A session takes ten steps at
   most. What it committed merges as one piece, and the next session starts at the first open step.
5. **187 of the 206 steps are code. As lines they are 187 merges. As features they are 27 at the fewest.** Three
   build lines (T-4194, T-4195, T-4196) make it run. Until T-4194 is on, by 11-18, steps run one at a time as
   today. Idris read the proposal against the build tools and corrected four points; they are marked in 3.2.

## 1. The 14 features


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. The 14 features, scrolls sideways" data-n="1 5 6 7" style="--tw:691px" markdown="1">

| # | Feature | Owner | Reviewer | P | Steps | Held |
|---|---|---|---|---|---|---|
| 2.1 | T-4180: Every premade widget draws on the iPhone | Idris | Pernille | P0 | 19 | 1 |
| 2.2 | T-4181: Widgets refresh on their own and by a tap | Idris | Pernille | P0 | 27 | 3 |
| 2.3 | T-4182: A failing widget says so and can recover | Idris | Pernille | P1 | 23 | 0 |
| 2.4 | T-4183: The Gallery shows, previews and opens every premade | Idris | Pernille | P1 | 12 | 0 |
| 2.5 | T-4184: A person's own script becomes a Home Screen widget | Idris | Pernille | P1 | 16 | 1 |
| 2.6 | T-4185: Launcher widgets open the apps a person chose | Idris | Pernille | P1 | 11 | 0 |
| 2.7 | T-4186: The editor completes code, shows errors and previews | Idris | Pernille | P1 | 12 | 3 |
| 2.8 | T-4187: Scripts run, ask questions and stop cleanly | Idris | Pernille | P1 | 11 | 1 |
| 2.9 | T-4188: Location, steps and notifications work in scripts and widgets | Idris | Odalys | P1 | 17 | 3 |
| 2.10 | T-4189: Scripts reach any https service through iOS | Pernille | Idris | P1 | 9 | 1 |
| 2.11 | T-4190: Settings and Pro: buy, restore, themes | Idris | Odalys | P1 | 18 | 1 |
| 2.12 | T-4191: VoiceOver and large text work on every screen | Idris | Maren | P2 | 6 | 0 |
| 2.13 | T-4192: Python in the app: smaller bundle, installable packages | Pernille | Odalys | P1 | 9 | 3 |
| 2.14 | T-4193: TestFlight builds and the App Store page are ready | Ines | Odalys | P1 | 16 | 7 |

</div>


Where the 300 open app lines are (the script's default output):

- 206 are steps of a feature: 201 that the audit judged keep or rewrite, and 5 written today after the audit had
  judged the app queue (T-4199, T-4201, T-4202, T-4203, T-4205). Each of the five comes from a step of a feature
  and sits in that feature; the reason is in the JSON under "added".
- 11 are listed outside a feature, each with its reason (section 4).
- 5 the audit marked remove or merge (T-0067, T-2267, T-2456, T-2496, T-3675). T-4101 applies those.
- 76 are review lines the audit has not judged yet (T-4098), and 2 are plan lines: this one and T-4124.

Of the 206 steps: 136 build, 27 fix, 22 test, 7 release, 5 plan, 4 research, 2 docs, 1 runtime, 1 ios, 1 design.
24 are held. 43 belong to a worker who is not the feature's owner (section 3.2, point 8).

Between the two sittings five steps were finished and ticked (T-3757, T-3798, T-3784, T-3565, T-2282) and left the
list, and the five new lines above joined it. The total stayed at 206.

Features that share a Target (one path equal to, or inside, the other). Such a pair is not built at the same time;
every other pair can be built side by side:

- T-4181 and T-4189: `pywidget/ios/App/Runtime/_pywidget_runtime`
- T-4182 and T-4186: `pywidget/ios/Shared/RunLog/TracebackFold.swift`
- T-4183 and T-4187: `pywidget/examples/tip_splitter.py`
- T-4186 and T-4188: `pywidget/ios/App/Runtime/pywidget`
- T-4186 and T-4189: `pywidget/ios/App/Runtime/pywidget`
- T-4187 and T-4188: `pywidget/ios/App/Device/PromptDesk.swift`
- T-4188 and T-4189: `pywidget/ios/App/Runtime/pywidget`
- T-4190 and T-4191: `pywidget/ios/App/Store/ProPaywallView.swift`

## 2. Each feature's card and checklist

The card is what T-4122 asks every task to carry: a done test, the files it targets, the commit it was written
against, and who made it. For a feature the done test is `seen:`, what a person sees on the device, with the
evidence that shows it. "Test classes for a step" are the classes a session runs after a step that touched that
area. A session takes a feature's open steps P0 first, then in the order listed.

### 2.1 T-4180: Every premade widget draws on the iPhone

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P0.
- **Done when:** `seen:` on the iPhone, each of the twelve premades, placed on the Home Screen, draws its own content in light and dark in every size it offers, the Lock Screen sizes included; a premade placed before the app was ever opened draws too.
- **Seen on:** the iPhone 17e Simulator, then the next TestFlight build on the Investors' iPhone, where the fault was seen.
- **Evidence:** one Home Screen screenshot per premade in light and in dark, kept under pywidget/app-guide-shots/.
- **Targets:** `pywidget/ios/Shared/TreeView.swift`, `pywidget/ios/Shared/TreeNodes.swift`, `pywidget/ios/Shared/TreeTimeline.swift`, `pywidget/ios/Shared/TreeRules.swift`, `pywidget/ios/Shared/Premades.swift`, `pywidget/ios/Shared/FirstRender.swift`, `pywidget/ios/Widget/PyWidget.swift`, `pywidget/ios/App/Bridge/WidgetWriter.swift`.
- **Test classes for a step:** PremadeFirstRenderTests, PremadeSnapshotTests, PremadesTests, TreeNodesTests, TreeTimelineTests, FirstRenderTests, WidgetStepTimeoutTests, WidgetKitCheckTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 19 lines, 1 of them held.

- T-3783 [build] Idris, P0, open: Keep finding why only Countdown draws on the iPhone
- T-3814 [build] Idris, P0, open: Keep the bundled Countdown picture from hiding the bug
- T-4088 [fix] Idris, P0, open: Fix the refused MacBook test job of the iPhone hunt
- T-3279 [build] Idris, P1, open: Draw a premade picked before the first app open
- T-3280 [test] Idris, P2, open: Test the placed widget path in the premade suite again
- T-3560 [test] Idris, P2, open: Tighten the per-premade first-render tests
- T-3899 [fix] Idris, P1, open: Let free widgets draw when the store check hangs
- T-3900 [fix] Idris, P1, open: Wait once per refresh when a shared step hangs
- T-0306 [build] Idris, P2, open: Check the gallery trees in every widget family
- T-0024 [build] Idris, P2, open: Check Lock Screen corner clipping in the Simulator
- T-0472 [build] Idris, P2, open: Fix the stale clock size on Lock Screen widgets
- T-1100 [build] Idris, P2, open: Dim the Toggle track in stripped color modes
- T-1011 [test] Idris, P1, open: Make the Toggle widget test actually check something
- T-0590 [test] Idris, P3, held: Test the widget extension's default widget choice
- T-1925 [build] Idris, P2, open: Run the renderer tests and add a snapshot test
- T-1284 [test] Idris, P2, open: Test that unsafe links in tree views draw no link
- T-1181 [fix] Idris, P2, open: Fix a held finding from the Pernille review
- T-0245 [build] Pernille, P3, open: <span title="A measured fact that holds a grade below a letter, however good the rest is.">Cap</span> the size of widget view trees
- T-1290 [build] Idris, P2, open: Stop test runs rewriting time-based snapshot images

### 2.2 T-4181: Widgets refresh on their own and by a tap

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P0.
- **Done when:** `seen:` on the iPhone, tapping the refresh button on a placed widget reruns its script without opening the app, and the widget shows the new value with its age line; a widget that reads the web does the same; with Pro, a widget left alone refreshes by itself.
- **Seen on:** the iPhone 17e Simulator; time and memory inside the widget are then measured on the Investors' iPhone with the internal gate build.
- **Evidence:** a screen recording of the tap and the new value, and the measured time and memory figures.
- **Targets:** `pywidget/ios/Shared/ExtensionLane.swift`, `pywidget/ios/Shared/RefreshAsks.swift`, `pywidget/ios/Shared/RefreshOutcomeRule.swift`, `pywidget/ios/Shared/RefreshSchedule.swift`, `pywidget/ios/Shared/RefreshWidgetsIntent.swift`, `pywidget/ios/Shared/AgeLine.swift`, `pywidget/ios/Shared/PythonRuntime.swift`, `pywidget/ios/App/Runtime/_pywidget_runtime`.
- **Test classes for a step:** ExtensionLaneTests, ExtensionBridgeTests, ExtensionRuntimeTests, RefreshAgeRendererTests, LaneRestBenchTests, LaneWarmWindowTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 27 lines, 3 of them held.

- T-0675 [build] Idris, P0, open: Run Python widget scripts inside the widget extension
- T-0678 [build] Idris, P1, open: Run the refresh button inside the widget extension
- T-0972 [build] Idris, P1, open: Decide how a script's refresh path is chosen on send
- T-1440 [build] Idris, P1, open: Add a refresh control and age line to widgets
- T-1441 [build] Pernille, P1, held: Show the age line in premade widgets and gallery
- T-1457 [build] Idris, P2, open: Match the corner glyphs to the app's accent colors
- T-1833 [build] Pernille, P2, open: Stop a refresh button counting as a tap control
- T-1882 [build] Idris, P2, open: Count a fetch as good when the data arrived
- T-1972 [build] Idris, P2, open: Test that one refresh tap writes only one row
- T-2912 [test] Odalys, P3, open: Two small follow-ups from the refresh-ask review
- T-0682 [build] Idris, P1, open: Fetch bound field data inside widget timelines
- T-0687 [build] Idris, P1, open: Run network fetches inside the extension on the Simulator
- T-0696 [build] Idris, P1, open: Measure peak memory for fetches in the extension
- T-0700 [build] Idris, P3, open: Use one check for being in the extension
- T-2260 [fix] Idris, P1, open: Make closed widget turns draw their timeline
- T-0793 [build] Idris, P1, held: Add background refresh for widgets in version 1.0
- T-0795 [plan] Ines, P1, held: Decide whether background refresh stays in 1.0
- T-2373 [build] Idris, P1, open: Gate background refresh behind Pro, not premades
- T-2317 [release] Idris, P2, open: Compile the widget refresh code out of Release
- T-2021 [build] Idris, P2, open: Measure the widget time budget before setting it
- T-2097 [build] Idris, P1, open: Read free memory in the widget extension on a device
- T-2044 [build] Idris, P2, open: Widen the timing margin of a flaky widget test
- T-2046 [build] Idris, P3, open: Make an early-ending widget test less timing-sensitive
- T-2047 [build] Idris, P3, open: Add a missing test for the widget turn order
- T-2099 [build] Idris, P3, open: Tidy the widget test defaults for memory headroom
- T-0956 [build] Pernille, P1, open: Replay the widget tests with the shipped Python layout
- T-1033 [fix] Pernille, P2, open: Rewrite four stale tests after the lock fix

### 2.3 T-4182: A failing widget says so and can recover

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, a widget whose script fails shows the red badge on the Home Screen; its Activity screen lists each run with its time, result and error; after one good run in the app, the person's say-so <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the mark and the widget draws again; run history older than 14 days is gone.
- **Seen on:** the iPhone 17e Simulator.
- **Evidence:** screenshots of the badged widget, the Activity screen and the widget after the say-so.
- **Targets:** `pywidget/ios/Shared/LaneGuard.swift`, `pywidget/ios/Shared/WidgetStatus.swift`, `pywidget/ios/Shared/RunLog`, `pywidget/ios/Shared/Bridge/WidgetRunLog.swift`, `pywidget/ios/App/Bridge/LaunchRunLog.swift`, `pywidget/ios/App/WidgetRunView.swift`.
- **Test classes for a step:** WidgetRunReasonTests, LaunchRunLogTests, CardMarksTests, WidgetWriterTests, ShortcutRunLogTests, RunLogUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 23 lines, 0 of them held.

- T-0048 [plan] Idris, P1, open: Add the per-widget Activity screen and Run as widget
- T-1764 [build] Idris, P1, open: Write each widget run record when the run ends
- T-3895 [build] Idris, P1, open: Record widget runs that never start in the extension
- T-1765 [build] Idris, P1, open: Stop a file from forging expired run records
- T-1766 [docs] Pernille, P2, open: Document the forging risk in the widget runtime header
- T-1643 [build] Idris, P1, open: Let a person's say-so lift a widget demotion
- T-3791 [build] Idris, P1, open: Add the say-so button that lifts a widget demotion
- T-3792 [build] Idris, P2, open: Show a lifted widget running again in test L
- T-3291 [build] Idris, P1, open: Mark failed widgets with the red badge
- T-3282 [build] Idris, P1, open: Cap how much of the run marker the widget reads
- T-3310 [build] Idris, P2, open: Cap the demotion list read in the widget
- T-2836 [build] Idris, P2, open: Give a report demotion its demoted mark and row
- T-2841 [build] Idris, P3, open: Pin the two open cases of the memory-skip badge gap
- T-2232 [build] Idris, P2, open: Make the peak memory figure mean one thing
- T-0198 [build] Idris, P2, open: Record expired runs in the widget status file
- T-2491 [build] Idris, P1, open: Stop the stuck extension from recreating deleted widget folders
- T-2492 [build] Idris, P2, open: Record a widget <span title="A test written in advance. If it fires, we drop the idea.">kill</span> after it returns to the extension
- T-2493 [build] Idris, P2, open: Keep locked premades out of the run log
- T-2497 [build] Idris, P3, open: Fix the stuck-row test that cannot fail
- T-1677 [build] Idris, P1, open: Finish recording the last run report at launch
- T-3758 [fix] Idris, P1, open: Prune run history while the app stays open
- T-4205 [fix] Idris, P2, open: Prune run history when a background start times out
- T-3294 [test] Idris, P3, open: Close four small holes in the widget safety tests

### 2.4 T-4183: The Gallery shows, previews and opens every premade

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, the Gallery lists all twelve premades, all free, each with a live preview in light and dark; a premade's page swipes through every size; Open source makes an editable copy; the bundled examples and the Shortcut recipes open from it; the tour's third page changes the countdown's date.
- **Seen on:** the iPhone 17e Simulator, and the iPad Simulator for the two-column layout.
- **Evidence:** screenshots of the Gallery and one premade page in light and dark, kept under pywidget/app-guide-shots/.
- **Targets:** `pywidget/ios/App/Gallery`, `pywidget/ios/App/GalleryTileRule.swift`, `pywidget/ios/App/Examples.swift`, `pywidget/examples`, `pywidget/widgets`.
- **Test classes for a step:** GalleryFaceTests, GalleryModelRunAllTests, GalleryModesSnapshotTests, GalleryPagerTests, GalleryPreviewTests, GalleryPushTests, ExamplesBundleTests, GalleryUITests, ExamplesUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 12 lines, 0 of them held.

- T-0191 [build] Idris, P1, open: Build the gallery screen and its preview route
- T-2268 [build] Idris, P1, open: Finish the gallery screens and pictures
- T-2296 [build] Idris, P1, open; a session is on it now: Finish the gallery pager, iPad layout and detail foot
- T-0193 [build] Idris, P2, open: Build page three of the first-run tour
- T-0811 [build] Idris, P1, open: Give the bundled examples an iPhone entry point
- T-0901 [build] Idris, P1, open: Open a free premade as an editable copy
- T-3440 [build] Idris, P2, open: Offer the Shortcut recipes in the Gallery as copies
- T-2372 [build] Idris, P1, open: Make all twelve premades free
- T-2723 [test] Idris, P2, open: Run the new earthquakes example in the Simulator
- T-2409 [release] Wrenna, P2, open: Check the USGS earthquake feed before building on it
- T-4139 [fix] Idris, P2, open: Check the gallery well's clipped left edge
- T-4148 [fix] Operator, P0, open: Fix a MacBook test job that failed

### 2.5 T-4184: A person's own script becomes a Home Screen widget

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, a script with a helper file, saved as a widget and placed, draws the script's output; after the helper file changes the widget updates or says it is out of date; the Shortcuts app's Run Script action lists every saved script and runs one.
- **Seen on:** the iPhone 17e Simulator.
- **Evidence:** a screen recording from the editor to the placed widget, and a screenshot of the Shortcuts picker.
- **Targets:** `pywidget/ios/App/Projects`, `pywidget/ios/App/Intents`, `pywidget/ios/App/WidgetInstallView.swift`, `pywidget/ios/Shared/WidgetPlacement.swift`.
- **Test classes for a step:** WidgetScriptSaveTests, WidgetScriptSavedPlacementTests, ProjectStoreTests, ProjectTransferTests, WidgetCardTests, AppIntentsTests, ShortcutRecipeTests, PreviewQueueTests, ProjectsUITests, AddWidgetTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 16 lines, 1 of them held.

- T-0906 [build] Idris, P1, open: Fix project send failures on a full disk
- T-1905 [build] Idris, P1, open: Send project files in one safe swap
- T-0866 [build] Idris, P1, open: Tell people when a sibling file leaves widgets stale
- T-0976 [build] Idris, P1, open: Ignore a run that started before the send
- T-0749 [build] Idris, P2, held: Copy a project's sibling files when saving a widget
- T-2154 [build] Idris, P3, open: Stop a project folder colliding with the main script
- T-2155 [docs] Idris, P3, open: Note that old project copies stay after a rename
- T-0725 [build] Idris, P3, open: Fix small faults in project export
- T-1242 [fix] Idris, P3, open: Fix two project note faults found in review
- T-0892 [test] Idris, P1, open: Make the first-widget flow test start clean
- T-0893 [build] Idris, P3, open: Fix three small widget card faults
- T-0561 [build] Idris, P2, open: Align the widget run scan test with its done rule
- T-1652 [fix] Idris, P2, open: Fix two UI tests that fail only in full runs
- T-0790 [build] Idris, P1, open: List saved scripts in the Shortcuts run picker
- T-0510 [build] Idris, P2, open: Save widget scripts where Shortcuts expects them
- T-0032 [build] Idris, P1, open: Probe what the Shortcuts share sheet hands the app

### 2.6 T-4185: Launcher widgets open the apps a person chose

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, each of the six launcher widgets on the Home Screen opens the chosen app from each slot with one tap; in Settings, under Widgets, Launcher Apps, a person adds, reorders and removes apps and the widget follows.
- **Seen on:** the iPhone 17e Simulator; the real tap is then checked on the TestFlight build on a phone and an iPad, in the Investors' hands.
- **Evidence:** a screen recording of a tap opening the chosen app and of the editor changing a slot.
- **Targets:** `pywidget/ios/App/Launcher`, `pywidget/ios/App/LauncherTapHandling.swift`, `pywidget/ios/App/WidgetTapRouting.swift`, `pywidget/ios/Shared/LauncherSlots.swift`, `pywidget/ios/Shared/LauncherPremadeSlots.swift`, `pywidget/ios/Shared/WidgetTapLink.swift`, `pywidget/ios/scripts/debug_url_scheme.sh`.
- **Test classes for a step:** WidgetTapRoutingTests, LauncherTapUITests, LauncherWindowsUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 11 lines, 0 of them held.

- T-2551 [build] Pernille, P1, open: Build all six app launcher premades
- T-3664 [build] Idris, P1, open: Let people choose the app behind each launcher slot
- T-3688 [build] Idris, P1, open: Build the launcher editor screens and their UI test
- T-3674 [research] Wrenna, P2, open: Fill the launcher's list of known apps
- T-3852 [build] Idris, P2, open: Call the launcher slot writer from the editor, reload widgets
- T-3847 [fix] Idris, P2, open: Test the launcher link through the real URL entry point
- T-3848 [fix] Idris, P2, open: Keep a second launcher tap from dropping a script's prompt
- T-3849 [test] Pernille, P2, open: Rerun the launcher sheet UI test on its own commit
- T-3764 [build] Idris, P1, open: Make the iPad window test fail without the fix
- T-3765 [build] Idris, P1, open: Check a real widget tap on the TestFlight build
- T-3766 [build] Idris, P1, open: Let the Debug scheme step remove only its own entry

### 2.7 T-4186: The editor completes code, shows errors and previews

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, typing a module name and a dot lists completions; a mistake is marked on its line with its message; the preview pane draws the unsaved script as a widget; a failed run shows a folded traceback and tapping a frame opens that line; search matches are amber.
- **Seen on:** the iPhone 17e Simulator.
- **Evidence:** screenshots of the completion list, an inline error, the preview pane and the folded traceback, in light and dark.
- **Targets:** `pywidget/ios/App/Editor`, `pywidget/ios/Shared/RunLog/TracebackFold.swift`, `pywidget/ios/App/Runtime/pywidget`.
- **Test classes for a step:** EditorToolingTests, EditorGateTests, EditorCaptureMapTests, ConsoleEditorOpenTests, ConsoleEditorUITests, EditorGateUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 12 lines, 3 of them held.

- T-0656 [build] Idris, P1, open: Add completions and inline errors to the editor
- T-2261 [build] Idris, P1, open: Build and test the editor completion changes
- T-2512 [build] Idris, P1, open: Editor checks never wait behind a stuck script or Stop
- T-2513 [runtime] Idris, P2, open: Completion sees the same modules during a run
- T-2869 [build] Idris, P1, open: Test completion with the stdlib as compiled-only files
- T-2870 [build] Idris, P2, open: Close the small gaps left in the completion import guard
- T-0192 [build] Idris, P1, open: Add the editor preview pane
- T-0389 [build] Idris, P1, open: Show a folded traceback with tappable frames
- T-0635 [build] Idris, P2, open: Tint editor search matches amber
- T-0630 [build] Idris, P3, held: Add alternates to the quote key in the key row
- T-0588 [test] Idris, P3, held: Test the on-screen keyboard's delete key
- T-0863 [test] Idris, P2, held: Fix a 2,000-line file picture test failing palette check

### 2.8 T-4187: Scripts run, ask questions and stop cleanly

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Pernille. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, the tip splitter example asks for the bill and the tip with native prompts and prints the split; Stop ends a script that loops forever and the next run starts; no prompt appears after its run has ended.
- **Seen on:** the iPhone 17e Simulator.
- **Evidence:** a screen recording of the tip splitter and of Stop on a looping script.
- **Targets:** `pywidget/ios/Shared/Bridge/PyBridge.swift`, `pywidget/ios/Shared/Bridge/pwbridge.c`, `pywidget/ios/App/Device/PromptDesk.swift`, `pywidget/ios/App/PromptsCodec.swift`, `pywidget/ios/App/ReplBar.swift`, `pywidget/tests/bridge`, `pywidget/examples/tip_splitter.py`.
- **Test classes for a step:** BridgeTests, BridgeSlice2Tests, BridgeFixtureTests, PromptDeskTests, PromptPlacementTests, ConsoleModelsTests, InputHoldUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 11 lines, 1 of them held.

- T-0447 [build] Idris, P1, open: Show native prompts when a script asks the user
- T-0458 [build] Pernille, P2, open: Make the tip splitter use native prompts
- T-2583 [build] Idris, P1, open: Prompt alerts never vanish unseen when UIKit drops them
- T-3098 [fix] Idris, P2, open: Keep input prompts from following a finished run
- T-2947 [fix] Idris, P2, open: Keep input records from following a run's end
- T-2057 [fix] Idris, P2, open: Fix four small faults in the run bridge
- T-2487 [fix] Idris, P3, open: Bridge test hooks and forged finished
- T-2266 [test] Idris, P1, open: Run the stuck-signal tests on the MacBook
- T-2717 [fix] Idris, P3, open: Close two small Restart races around the stuck mark
- T-0518 [build] Idris, P3, open: Draw the idle console input bar when ready
- T-0392 [build] Pernille, P3, held: Move test sources into fixture files

### 2.9 T-4188: Location, steps and notifications work in scripts and widgets

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Odalys. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, after Allow, the distance premade shows the distance to a saved place; with location off it says so in plain words; the steps premade shows today's count, or a plain line where the device has no sensor; a notification a script schedules arrives once; a slow sensor never leaves another widget blank.
- **Seen on:** the iPhone 17e Simulator; the time zone read inside the widget needs a real iPhone.
- **Evidence:** screenshots of the distance and steps premades in each state, and of the delivered notification.
- **Targets:** `pywidget/ios/App/Device`, `pywidget/ios/Shared/Bridge/LaneDevice.swift`, `pywidget/ios/Shared/Bridge/DeviceSupport.swift`, `pywidget/ios/Shared/ZoneProbe.swift`, `pywidget/ios/Privacy`, `pywidget/ios/App/Runtime/pywidget`.
- **Test classes for a step:** DeviceModulesTests, DeviceModulesSlice2Tests, LocationAuthorizationChangeTests, LocationCacheFollowUpTests, PremadeSensorStallTests, ZoneProbeTests, BridgeTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 17 lines, 3 of them held.

- T-0053 [build] Idris, P2, open: Fix widget extension location updates
- T-0063 [build] Idris, P3, held: Add a location-off state to the distance premade
- T-0047 [build] no owner, P3, held: Add the privacy strings for location and motion
- T-0046 [research] no owner, P3, held: Read Apple pages to confirm 24 device API facts
- T-3564 [build] Idris, P2, open: Stop other errors saying a sensor is missing
- T-4201 [fix] Idris, P2, open: Keep today's sensor reading after a timeout
- T-3552 [test] Idris, P1, open: Test gallery and widget runs together with a stalled sensor
- T-3554 [build] Idris, P2, open: Tidy the time reserve's edge cases and docs
- T-3716 [test] Idris, P2, open: Find why the Simulator location test now fails
- T-4089 [fix] Odalys, P0, open: Fix the location bridge test that failed on the MacBook
- T-1241 [fix] Idris, P3, open: Fix the backup mark on the location cache
- T-0550 [build] Idris, P3, open: Verify file bookmarks by reading the target back
- T-0703 [test] Pernille, P3, open: Read time zone data in the extension on a phone
- T-0543 [build] Idris, P3, open: Add limits to notification scheduling
- T-1671 [fix] Idris, P3, open: Fix the notification thread type check order
- T-1672 [fix] Idris, P2, open: Fix the per-run notification cap resetting
- T-2027 [build] Idris, P2, open: Re-run the notification test on a fresh Simulator

### 2.10 T-4189: Scripts reach any https service through iOS

- **Owner:** Pernille. **Reviewer (Commandment 13, once per merge):** Idris. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, a script calls a public https service with a request body and with a picture download, and its widget draws the answer; the same call written with Python's own urllib works; the app build holds no OpenSSL and its build check says so.
- **Seen on:** the iPhone 17e Simulator.
- **Evidence:** a screenshot of the widget drawing the fetched answer, and the build check's output.
- **Targets:** `pywidget/ios/Shared/NetFetch.swift`, `pywidget/ios/Shared/Bridge/NetCall.swift`, `pywidget/ios/App/Runtime/_pywidget_runtime`, `pywidget/ios/App/Runtime/pywidget`, `tools/openssl_gate.py`, `pywidget/ios/project.yml`.
- **Test classes for a step:** NetFetchTests, NetFetchCharsetTests, HTTPDeviceTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 9 lines, 1 of them held.

- T-3400 [build] Pernille, P1, open: Send Python's https through iOS and drop the OpenSSL modules
- T-3401 [build] Idris, P2, open: Add a general web request call and an OpenSSL check
- T-4202 [build] Pernille, P1, open: Strip OpenSSL from the app with system https
- T-4203 [build] Pernille, P1, open: Device test of every https host we call
- T-3820 [build] Idris, P2, open: Add the general web request call to the app
- T-3821 [build] Idris, P2, open: Pass large web bodies through a file
- T-3822 [build] Idris, P2, open: Turn on the OpenSSL check in the app build
- T-4142 [fix] Idris, P2, open: Make the OpenSSL check fail on unreadable files
- T-3399 [release] Idris, P1, held: Add the Investors' encryption answer to the app's settings

### 2.11 T-4190: Settings and Pro: buy, restore, themes

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Odalys. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, Settings matches the design in light and dark; the Pro screen shows the approved words and price; a test purchase unlocks the editor themes and background refresh, Restore brings them back, and Ask to Buy shows waiting for approval; Acknowledgements lists every bundled package; the rating request appears once after a real success.
- **Seen on:** the iPhone 17e Simulator with the StoreKit test file.
- **Evidence:** screenshots of Settings, the Pro screen before and after the test purchase, the theme picker and Acknowledgements.
- **Targets:** `pywidget/ios/App/Settings`, `pywidget/ios/App/Store`, `pywidget/ios/App/SettingsProRowRule.swift`, `pywidget/ios/Shared/ProFlags.swift`, `pywidget/ios/Shared/ProEntitlement.swift`, `pywidget/ios/Shared/ProCardView.swift`, `pywidget/ios/App/Acknowledgements.swift`, `pywidget/ios/App/RatingRequestRule.swift`, `pywidget/ios/StoreKit`.
- **Test classes for a step:** ProPaywallTests, ProStoreTests, ProFlagsContractTests, SettingsLookTests, ThemeTests, EditorThemeCatalogTests, AcknowledgementsTests, ProPaywallUITests, SettingsUITests, AcknowledgementsUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 18 lines, 1 of them held.

- T-0657 [build] Idris, P1, open: Build the Settings screen
- T-4199 [build] Idris, P2, open: Retake the Settings shots with the Testers group
- T-2498 [test] Idris, P2, open: Test the waiting-for-approval and failed-restore Settings rows
- T-2500 [build] Idris, P3, open: Settings cleanups: Copy string, spec words, strings check
- T-2914 [build] Idris, P3, open: Close the hairline gap in the About card
- T-0272 [build] Idris, P3, open: Add a theme picker to Settings
- T-2987 [build] Idris, P1, open: Turn on the approved Pro flags and themes
- T-2988 [build] Idris, P2, open: Finish the editor theme picker on the Pro screen
- T-2989 [test] Idris, P1, open: Add the theme picker UI test for the freeze row
- T-2458 [build] Idris, P2, open: Compile and picture the new Pro screen words
- T-2549 [build] Idris, P2, open: Picture the Pro screen and finish its word changes
- T-0861 [build] Idris, P1, open: Fix three red paywall pictures for the alpha
- T-2040 [fix] Idris, P2, open: Investigate a paywall UI test that failed once
- T-3745 [test] Idris, P1, open: Stop the Pro store test timing out
- T-0591 [build] Idris, P3, held: Ship only the Pro card words in the app bundles
- T-0042 [build] Idris, P2, open: Add an Acknowledgements screen for vendored packages
- T-0623 [build] Idris, P3, open: Fix the licence wording in Acknowledgements rows
- T-0273 [build] Idris, P2, open: Ask for an App Store rating after a real success

### 2.12 T-4191: VoiceOver and large text work on every screen

- **Owner:** Idris. **Reviewer (Commandment 13, once per merge):** Maren. **Priority:** P2.
- **Done when:** `seen:` on the iPhone, with VoiceOver on, every screen reads its controls by name and in order; at the largest text size nothing is cut off in the Gallery, the editor, the console, Settings, the Pro screen and the widget card.
- **Seen on:** the iPhone 17e Simulator for text size; VoiceOver needs a real iPhone, in the Investors' hands.
- **Evidence:** screenshots of each screen at the largest text size, and a screen recording with VoiceOver on.
- **Targets:** `pywidget/docs/design/ide/a11y-labels.json`, `pywidget/ios/App/ConsoleTextView.swift`, `pywidget/ios/App/NavigationTitleAppearance.swift`, `pywidget/ios/App/Store/ProPaywallView.swift`.
- **Test classes for a step:** ChooseCardLockVoiceOverTests, HUDAnnouncementTests, SystemStringsTests, WidgetCardTests, ProPaywallUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 6 lines, 0 of them held.

- T-1117 [build] Idris, P2, open: Make the app's spoken labels read correctly for VoiceOver
- T-0479 [build] Idris, P2, open: Check VoiceOver and text size on a real iPhone
- T-1445 [build] Idris, P2, open: Make navigation bars readable at large text sizes
- T-1444 [build] Idris, P2, open: Make the Pro footer and button fit large text
- T-0894 [test] Idris, P2, open: Check the widget card at large text sizes
- T-1243 [fix] Idris, P3, open: Fix a should-fix accessibility point in the copy message

### 2.13 T-4192: Python in the app: smaller bundle, installable packages

- **Owner:** Pernille. **Reviewer (Commandment 13, once per merge):** Odalys. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, the release build starts Python and runs a script; a person picks a package file in Files, the app installs it and a script imports it; a refused package shows its reason in plain words; the app's size is the figure the store page states.
- **Seen on:** the iPhone 17e Simulator with a Release build.
- **Evidence:** a screen recording of a package install and import, and the measured bundle size.
- **Targets:** `pywidget/ios/scripts/install_stdlib.sh`, `pywidget/ios/scripts/install_packages.sh`, `pywidget/ios/scripts/make_stdlib_zip.py`, `pywidget/ios/scripts/stdlib_cut.py`, `pywidget/packages`, `tools/pkg_sandbox.py`.
- **Test classes for a step:** AppPackagesLayoutTests, PackageSmokeTests, ExtensionRuntimeTests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 9 lines, 3 of them held.

- T-0299 [build] Pernille, P0, open: Keep real packages out until the sandbox is fixed
- T-0801 [build] Pernille, P3, held: Block Mach lookups by default in the package sandbox
- T-0043 [ios] Idris, P1, open: Strip unneeded Python modules from the release bundle
- T-0213 [build] Idris, P2, open: Measure the Python bundle options on the Simulator
- T-0212 [build] Idris, P2, open: Let people install a package file in the app
- T-0422 [build] Idris, P2, open: Tighten the package install script checks
- T-0631 [build] Pernille, P3, held: Test that package folders are counted as bundled
- T-0289 [build] Pernille, P3, open: Build the widget state module for scripts
- T-0553 [test] Idris, P3, held: Find why a stdlib size check failed once

### 2.14 T-4193: TestFlight builds and the App Store page are ready

- **Owner:** Ines. **Reviewer (Commandment 13, once per merge):** Odalys. **Priority:** P1.
- **Done when:** `seen:` on the iPhone, a build installed from TestFlight opens to the Gallery and a placed widget draws; each build's What to Test note lists what it adds and fixes; the store page draft shows its name, captions, pictures and privacy answers with nothing marked open.
- **Seen on:** the Investors' iPhone, from TestFlight.
- **Evidence:** the Investors' word or screenshot on #41, the build's row in ops/testflight-internal.tsv, and the store page draft.
- **Targets:** `tools/upload.sh`, `pywidget/ios/scripts/gate_session_build.sh`, `pywidget/docs/release`, `ops/testflight-internal.tsv`, `pywidget/app-guide-shots`.
- **Test classes for a step:** MeasurementExportTests, SettingsUITests.
- **Base:** `a42f0cc866`. **By:** Ines, T-4116 (Investor an Investor #41 c6814024711; an Investor #41 c6814286499).
- **Checklist:** 16 lines, 7 of them held.

- T-2943 [build] Idris, P1, open: Send up the gate build and confirm it stays internal
- T-2691 [build] Idris, P1, open: Check every archive for the phone test marker, Organizer too
- T-3281 [build] Idris, P1, open: Run the gate build's Settings row once
- T-2612 [build] Idris, P3, open: Tidy the upload pin reading edge cases
- T-3081 [release] Idris, P2, open: Add the Python frameworks' debug symbols to test builds
- T-3350 [release] Idris, P1, open: Describe each TestFlight build in detail
- T-0757 [build] Idris, P1, open: Install a signed build on the Investors' iPhone
- T-0556 [test] Idris, P2, open: Take the app pictures that were missing
- T-0261 [design] Maren, P3, open: Apply the chosen store caption wording
- T-0045 [research] Person, P2, held: Search trademarks and domains for three product names
- T-0337 [research] Wrenna, P2, held: Confirm the revenue memo's facts from Apple pages
- T-0771 [release] Odalys, P2, held: Ask Investors for the Pro purchase setup
- T-1119 [plan] Ines, P2, held: Investors answer two App Store Connect questions
- T-1216 [plan] Ines, P2, held: Ask Investors for App Store Connect contact details
- T-1154 [plan] Ines, P2, held: Ask the Investors to approve PyWidget's voice
- T-0788 [release] Wrenna, P1, held: Do the final sweep of launch posts and press kit

## 3. How app work is sliced: the proposal

### 3.1 Today

App work is cut into lines of about 45 minutes. Each line has its own session, its own Mac checks, its own iPhone
run at the merge, its own merge try and its own review line. What that costs, as measured in
ops/plans/efficiency-review.md 2.2 and ops/plans/task-process-redesign.md 4.3:

- 847 app tasks had commits since 10-29, with a median of one commit each.
- A task queued a median of 2 MacBook jobs (109 tasks). Of the 118 iPhone results with a verdict from 11-06 to
  11-12, 37 were red (31%). A pass takes 384 s.
- Built to merged took a median 9.1 hours for the 188 tasks merged since 11-09.
- Every line starts a fresh session that reads the same start prompt again: a median 24,298 tokens at the first
  call (5 sessions).

The work is not that small. The 206 steps describe 14 things a person can see the app do. The slicing made each
one look like 6 to 27 unrelated repairs.

### 3.2 Proposed: the feature session

Idris read my first draft of this section against the build and merge tools (the headers of tools/xc.sh,
tools/xc_route.py and tools/personal_land.sh) and corrected four points. They are marked with his name. One of
them corrects my own T-4122 text, section 4.1: "one build, then test-without-building" is wrong for a step that
changes Swift.

1. **The feature is the task.** On the board, in dispatch and at the merge the unit is the feature line. Its steps
   stay on the board as its checklist and are not handed out one by one.
2. **One worker, one long session.** A session takes one worker's open steps of one feature: P0 first, then in
   the order listed, skipping a step that is held or whose "needs" is still open.
3. **One full build, then a commit per step.** After each step the session runs the Mac host checks, and the test
   classes the card names for the files that step touched. A step that changed Swift gets an incremental build
   first; without it the test run would pass against the old build (Idris). Then it commits: one step, one commit,
   the step's ID in the subject. These builds and test runs happen on the Mac mini under its one Xcode lock. The
   MacBook only runs commits that are already on main (Idris; tools/xc_route.py says the same).
4. **The session's end is the merge point.** The session ends when the done condition can be shown, when its
   block or its usage ends, or when ten steps are on the branch. Then the branch merges as one piece: one review,
   one iPhone run, one merge. The steps that merged tick from their commits. The next session starts from main at
   the first open step, so a session that is cut short loses nothing it committed. My first draft kept one branch
   for a feature across sessions. Idris pointed out that the merge step takes an account's branch at every session
   end, so a kept branch would need a change to the merge tools. This form needs none. The ten is a bound I chose;
   the counts in 3.4 decide whether it moves.
5. **One review for the merge.** The card's reviewer, who is not the author, reads the step commits without the
   author's reasoning (Commandment 13). The merge step already writes one review line for a branch that carries
   several tasks (T-4061 covers eight). No step gets a review line of its own.
6. **A red at the merge is found inside the feature.** `git bisect` over the step commits with the failing test
   class, in the feature's next session, by local builds. Not a series of merge runs.
7. **A review finding is a note on the feature**, fixed as a commit in its next session, not a new line (T-4122,
   3.5). A finding that would hold a TestFlight build is fixed before the feature is ticked.
8. **One owner answers for the feature; each worker runs their own steps.** 43 of the 206 steps belong to someone
   who is not the feature's owner: a runtime step by Pernille inside one of Idris's features, a design read by
   Maren, store words by Wrenna. Another worker cannot commit onto the owner's branch (Idris). So that worker's
   code steps of the feature are their own session with its own merge, and the owner's next session starts from
   main with them in it. A read or a wording check is a note on the feature.
9. **A held step does not hold a merge.** It holds the tick. 24 steps are held. A held step that belongs to
   version 1.1 leaves the feature by a recorded decision, not by silence.
10. **The owner ticks the feature when the `seen:` condition has its evidence**: the screenshot or recording the
    card names. Six cards name a real iPhone (T-4180, T-4181, T-4185, T-4188, T-4191, T-4193). The company has the
    Simulator only. Those features merge on Simulator evidence, and only their tick waits for the TestFlight build
    in the Investors' hands.
11. **Order, and how many at once.** The two P0 features first (T-4180, T-4181). Two features that share a Target
    (section 1) go one behind the other. Feature sessions on different lanes still share the one Xcode lock for
    every build and test run, so they wait on each other there (Idris). Start with two app feature sessions at a
    time and read the lock wait each run records (ops/metrics/xc.jsonl) before allowing a third. The two is a
    bound I chose.
12. **What stays line-sized.** A crash, a data loss or an App Review reject found on a TestFlight build runs
    alone, P0, as today, and shares a grouped iPhone run at the merge (T-4122, 4.3). Tools, site and research
    lines do not change.

### 3.3 What it should save

Arithmetic on the list, not a measurement. 187 of the 206 steps are code. As lines, each is a session, a merge try
and a review line: 187 of each. With a merge at most every ten steps the 14 features need 27 merges at the fewest.
Sessions will end early, and other workers' steps merge on their own, so I expect more; twice that is 54.

iPhone runs are the part that depends on reds. Today a passing change draws 1.5 iPhone results (124 results for 81
passes). At that rate 187 lines are about 280 runs, and 27 to 54 merges are about 40 to 80: 3.5 to 7 times
fewer. Idris expects a merge of ten steps to go red more often than a line's 31%, and puts the saving at 2 to 4.6
times. I agree with the direction. If a feature merge draws three results, twice today's rate, 27 to 54 merges are
about 80 to 160 runs, 1.7 to 3.5 times fewer. The real rate is the first thing counted.

The full Xcode build happens once a session, and a Swift step pays an incremental build, not a full one.

### 3.4 What gets counted, from the first feature merge

- iPhone results per step merged (ops/metrics/land_xc.jsonl; today 1.5 per passing change).
- The red share at feature merges, beside the 31% for lines.
- Hours from a session's first step commit to its merge (ops/metrics/flow.jsonl; today a median 9.1 for a line).
- How often a step that was green in its session is the cause of a red at the merge, and how long the bisect took.
- Seconds waited at the Xcode lock per run, with two feature sessions at once (ops/metrics/xc.jsonl).
- Review findings per step, before and after, to see whether one larger review reads worse.

T-4194 writes the counts into this file after its first week.

### 3.5 The first trial, and until then

First trial: T-4191, VoiceOver and large text. It has six steps, one owner and a fixed done condition. Idris chose
it over the two P0 features: T-4181 has 27 steps, the wrong size for a trial, and the open bug hunt in T-4180 adds
steps as it runs. T-4180 is second. I leaned to a P0 feature first and he is right: the P0 steps lose nothing,
because they keep running as lines until the feature session exists.

The links are set now, so the board already shows the 14 features and their steps. Nothing about a running session
changes today.

## 4. Lines left outside a feature, and why

- T-3877: merge work, active in Idris's copy: recutting <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> tasks onto main. Each recut task sits in its own feature.
- T-2538: merge work: five parked fixes. Four of them are open lines inside features (T-0273, T-1972, T-1181, T-0198); the fifth is a tool fix.
- T-3773: a process decision of mine (how review findings reach the board), not app building.
- T-3370: a site file (tools/site/assets/issuecount.js); the inventory files it under the app by its kind tag.
- T-0449: version 1.1 by my <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> on its line; T-4101 moves it out of the 1.0 queue.
- T-3345: closes when T-0449 leaves the 1.0 queue.
- T-0044: a trial for after 1.0 (marketplace Python in a web view), held.
- T-0101: a design note for version 1.1 (online packages), held.
- T-0902: a precedent check for after 1.0, held.
- T-2377: the version 1.1 plan, held.
- T-2378: the plan for 1.2 and later, held.

The 76 open review lines are not placed. T-4098 judges them. My recommendation to that slice: a review line on a
step of a feature folds into that feature's one review at its merge.

## 5. On the board now, and what comes next

- **The 14 feature lines**, T-4180 to T-4193, were added in the first sitting and held for a day, so that no
  session would take one before its steps were linked. The <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> is lifted now. A feature line is not handed out
  while one of its steps is open (tools/board_links.py, held_by).
- **All 206 steps name their feature** in their Links field: "part of" the feature, with any "needs" the step
  already had kept. They were set through `tools/board_tick.py links` from the script's `--links` output, and none
  was refused. Two steps, T-2296 and T-3814, have sessions on them; Idris, their owner, agreed to the link.
- **These changes are queued.** This sitting ran on lane b, where a change to an existing board line waits in the
  lane's outbox and reaches the board when the branch merges: the 206 links, the 14 lifted holds and the notes.
  New lines are written to the board at once.
- **Three build lines** are on the board, part of T-4092, each with its design and its done condition:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. On the board now, and what comes next, scrolls sideways" style="--tw:867px" markdown="1">

| Line | What | Who | Date |
|---|---|---|---|
| T-4194 | The feature session (3.2) | Idris | on by Wednesday 11-18; first feature merged by Friday 11-20; a week's counts by 11-27 |
| T-4195 | An iPhone pass is reused when the app's inputs are unchanged (T-4122, 4.2) | Idris | Thursday 11-19 |
| T-4196 | App changes waiting to merge share one iPhone run (T-4122, 4.3) | Idris with Odalys | on by Monday 11-23; measured to 11-30 |

</div>


- **The dates are Idris's**, and mine to hold or move in the open. My draft had 11-16, 11-17 and 11-18. He could
  not hold them: the parts that touch the merge tools wait on the audit-implementation session's one batch a day
  (rule 62). T-4122 said the grouped iPhone run would be on by 11-18. It is now 11-23, so its measured week ends
  on the freeze day, 11-30.
- **Not done here.** The five lines the audit marked remove or merge wait for T-4101. The 76 review lines wait
  for T-4098. T-4195 and T-4196 have no short name in ops/task-names.tsv, because their titles are over 48
  characters; the site shows the title.

## 6. What would make this fail, and what is not measured

- **It arrives late.** The feature session is on by 11-18 and the freeze is 11-30. That is twelve days of use
  before the freeze. The grouping on the board helps from today; the faster running does not.
- **Larger merges go red more often.** A red at the merge then costs a bisect. Guard: the card's test classes
  after every step, and the bound of ten steps. Not measured yet: how often a change that was green in its session
  goes red at the merge. T-4194 counts it, and it decides the ten.
- **Feature sessions wait on each other at the one Xcode lock.** Every per-step build and test run is local.
  Guard: two app feature sessions at a time until the lock wait is read.
- **One larger review is a worse review.** Guard: the reviewer reads commit by commit, and each commit is one
  step, the size of today's line; ten steps is one sitting. Count: findings per step, before and after.
- **A session stops in the middle of a feature.** It happened to this task at 11:10 AM today. Guard: the session's
  end is a merge point, so what was committed merges and the next session starts at the first open step.
- **The card's test classes miss a break somewhere else.** Guard: the whole suite still runs on the iPhone
  Simulator at every merge, and main's own green check stands behind it.
- **Six done conditions need a real iPhone.** Those ticks wait on a TestFlight build and a look by the Investors.
  The merges do not wait.
- **A feature is the wrong size.** T-4181 has 27 steps and T-4191 has six. Guard: a feature is split by a recorded
  decision when its first merge shows two done conditions inside it.
- **A P0 fix waits behind slower work in its feature.** Guard: a session takes P0 steps first, and a crash, a data
  loss or an App Review reject runs alone.
- **The 27 is arithmetic.** No feature has merged this way yet. The first week's counts replace it.
- **The merge tools have one owner for now** (the audit-implementation session, rule 62). T-4194, T-4195 and
  T-4196 wait on its daily batch for the parts that touch them. Odalys has not yet confirmed her side of T-4196.
{% endraw %}

</div>
