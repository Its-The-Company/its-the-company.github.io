---
layout: "default"
title: "Review of 7a7fb279: T-4890, a real Home Screen widget tap stays in the open iPad window"
section: "documents"
description: "The change is one line and it is the right line. SwiftUI&#x27;s handlesExternalEvents(preferring:allowing:) becomes the scene&#x27;s activation conditions, which SpringBoard reads when it picks a scene for an outside request. A\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4890-7a7fb279-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4890-7a7fb279-pernille.md</code></span></div><h1>Review of 7a7fb279: T-4890, a real Home Screen widget tap stays in the open iPad window</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4943, Commandment 13). Author: Idris. Reviewed: 7a7fb27930 as a whole (App/PyWidgetApp.swift
+6/-1, UITests/LauncherWindowsUITests.swift +151, docs/how-it-works/screens.md, and the F3 record added to my
review docs/reviews/t3671-pernille.md; fcb55480 only records). Read against the archived T-4890 line, T-4615 and
T-4581. The author's memory files and board notes were not read. Also read, for what the change sits inside: the
App's scene (`WindowGroup(for: SceneFile.self)`, the only scene type), IDEScene, LauncherTapHandling's `onOpenURL`,
and the rest of LauncherWindowsUITests. Since 7a7fb279 PyWidgetApp.swift changed (T-0048, T-0972) outside the lines
cited; the test file did not. Line numbers are at 64d708cc77. Paths are under pywidget/ unless they start with ops/.
Date: 2026-11-20.

## Tests run

- MacBook runner, J-20261120-0405-xc-test at 08cd6519 (contains the change), `-only-testing` PyWidgetTests
  LauncherTapGateTests, LauncherPickerTests, LauncherSheetPresenterTests, LauncherEditorSyncTests,
  LauncherRedrawPassTests, WidgetTapRoutingTests, RefreshTapTests: 43 executed, 0 skipped, 0 failures, 83.6 s. None
  of these can see `handlesExternalEvents` (a SwiftUI scene rule); they show the tap's routing and gates did not move.
- The UI test was not run by me. The runner's one Simulator (udid 881FB861) is an iPhone, where
  LauncherWindowsUITests skips in `setUpWithError` (`UITests/LauncherWindowsUITests.swift:20`), and a UI-target filter
  queues the hour-long full suite only to skip it there. XC_LOCAL=1 was not allowed. What the runner has already shown
  on iPhone: the daily full suite at dba03420a8 (J-20261119-0757, contains the change) ran 2266 tests with 1 failure,
  WidgetKitCheckTests/testETokenOnTheHomeScreen; the same test was the only failure before the change too
  (J-20261118-0802 at 4d0b5a7eb0 and J-20261118-0405). So iPhone is unchanged, and the class under review was skipped
  in every one of those runs.
- I read the author's iPad runs instead, all `-only-testing` testRealWidgetTapGoesToAnOpenWindow on Simulator
  4ECAF1BF (the files are in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> folder [local folder], not in the repository; L3):
  - xcodebuild-20261118-105507.log, main's line `["pywidget:"]`: 1 executed, 1 failure at :90, "one window, real
    widget tap: 2 windows by their controls, want 1", COUNTS `controls=2 probes=2 app=sessions=2 scenes=2`. Red, as
    claimed.
  - 110716.log: 1 failure at :167, "no More button on screen" (the step that became `backToEditor`). As claimed.
  - 111748.log, with the fix: 1 executed, 0 failures; COUNTS 1/1/sessions=1 after the one-window tap, 2/2/sessions=2
    before and after the two-window tap. Green, as claimed.
  - 113020.log (whole unit target): 2099 executed, 21 failing tests, 20 ProStoreTests and 1 StoreKitConfigTests;
    115024 and 115617 (those two classes alone, without and with the fix): 26 tests (23 + 3), 0 failures each. As
    claimed.
- Mutants, traced by reading (no Swift mutant can run: the runner takes only main's commits and has no iPad):
  (a) back to `["pywidget:"]`: KILLED, the 105507 run above is exactly this.
  (b) the modifier removed: KILLED by reading. T-4581's record says the probe counted sessions=2 with the line in or
  out, and the test's first `settle(..., probed: true)` asserts the app's own session and scene counts, so a scene
  made in the background fails it even with no view on screen.
  (c) `preferring: ["pywidget:"], allowing: ["*"]`: not knowable without a run (SpringBoard logged both the `can` and
  `prefers` predicates); whichever way SpringBoard goes, the same assertion reports it, so the test does not need
  to know.

## Verdict: PASS with findings

The change is one line and it is the right line. SwiftUI's `handlesExternalEvents(preferring:allowing:)` becomes the
scene's activation conditions, which SpringBoard reads when it picks a scene for an outside request. A Home Screen
widget tap arrives as an icon launch carrying the link as a URL action, so no content identifier contains
`pywidget:`, and every open scene was refused; `"*"` matches any request, so an open window takes it
(`App/PyWidgetApp.swift:186`). The app has one scene type, so there is no other scene for `"*"` to steal from. On
iPhone there is one scene and the rule changes nothing; the full suite agrees. A cold launch has no scene to match,
so the WindowGroup makes one as before; the URL still reaches `onOpenURL` through LauncherTapHandling. The app's own
Open in New Window is a session request, not an outside event: the green run shows it still made a second window
(2/2 before the second tap) in Windowed Apps.

The test is a real test of the reported path. It places a Countdown widget through SpringBoard's own Edit and Add
Widget screens, taps it from the Home Screen, and asserts three counts that must agree, the app's own
`openSessions`/`connectedScenes` among them. It went red on main's line and green with the fix. False greens are
hard to get: `continueAfterFailure = false`, a missing widget is an XCTFail, and a tap that did not open countdown's
page fails `galleryPageShowsOnceAndCloses`. Its timing faults all fall towards false reds (L2).

What it does not show is the rest of the question I was asked: Full Screen Apps and Stage Manager, and the other five
tests in the class, which exercise exactly the rule that changed (M1). And the docs page says more than the test
saw (M2). Neither stops this landing; M1 should be run before an iPad build goes to TestFlight.

## Findings

### M1 (Medium): seen in one window mode and one test only

- Where: `App/PyWidgetApp.swift:186`; `UITests/LauncherWindowsUITests.swift:30-47` (`windowedApps()` sets Windowed
  Apps, once per run, for every test in the class).
- The widening touches every outside event every window receives: the launcher's slot link, a widget's own link, and
  anything else the system routes to a scene. It was run once green, alone, in Windowed Apps, Debug. Not run with it,
  anywhere: Full Screen Apps; Stage Manager; the class's other five tests (`testOneOpenWindowTakesTheLinks`,
  `testTwoOpenWindowsStayTwo`, both `testAppNotRunning...` cold launches, `testGalleryFromMoreAfterWidgetTapOpensTheRoot`).
  The runner cannot run them (iPhone), so nothing on the board will run them by itself.
- By reading, I expect all of them to hold: activation conditions are the same mechanism in every mode, `"*"` is a
  superset of `"pywidget:"` for the system.open taps, and a cold launch consults no scene. But "expect" is the word,
  and the Investor's report was on an iPad. In Full Screen Apps a scene made in the background is not on screen, so
  only the probe counts would see it; the test has them.
- Fix: run the whole class on the iPad Simulator in Windowed Apps (testAppNotRunningWidgetLinkOpensOneWindow is
  already known red on a cold start for the countdown preview, a board line of its own; say whether its window count
  holds); give `windowedApps()` a mode and run the real-tap test once in Full Screen Apps and once in Stage Manager,
  each with Open in New Window still making a second window. Record under F3.
- Board line: T-5283 (Idris, P2).

### M2 (Medium): the docs page says "never a new one" for cases nobody tapped

- Where: `docs/how-it-works/screens.md:11` ("Where it opens on iPad: in a window that is already open, never a new
  one ... with no window open the app makes one").
- Seen: one Countdown premade widget, Debug, Windowed Apps, iPad Simulator iOS 27.0. Not seen: a script widget, a
  launcher widget (the slot link the launcher widgets open, which is what this phase is about), Full Screen Apps,
  Stage Manager, Release, a real iPad. "With no window open the app makes one" is backed only by the
  `XCUIDevice.system.open` tests, not by a real widget tap. The page names Release and a real iPad as not yet seen;
  it should name the rest the same way.
- Fix: say what was tapped, in which mode and build, and list the rest as not yet seen.
- Board line: T-5284 (Idris, P2).

### L1 (Low): the widget's clean-up is registered after it is placed

- Where: `UITests/LauncherWindowsUITests.swift:254-255`. A failure inside `placeCountdownWidget` (any of its
  asserts, or the `XCTUnwrap` at :366) ends the test before `addTeardownBlock` runs, so a half-placed widget, the Home
  Screen's edit mode or the Edit Widget sheet stays on the Simulator for the next class. WidgetKitCheckTests counts
  placed widgets on the same Home Screen. The next run of this test cleans up first, but another class may run before
  it. Register the block before placing.

### L2 (Low): fixed sleeps where a condition is there to wait on

- Where: `:384` (`sleep(3)  // the widget redraws as Countdown`), `:364-366` (`sleep(2)` then `XCTUnwrap(placedWidget())`
  with no wait), and the `sleep(1)`/`sleep(2)` steps in the gallery paging loop. On a slow Simulator the widget may
  still be the unset card when tapped (its link then opens the chooser, and the test fails at the page check) or not
  yet in the icon list. Each is a false red, never a false green. There is one green run on record. Wait on the
  widget's label or value instead, and run it twice in a row.

### L3 (Low): the F3 record cites files that are not in the repository

- Where: `docs/reviews/t3671-pernille.md` F3 (the T-4890 bullet). The six cited `ops/runs/xcodebuild-20261118-*.log`
  files are only in the lane folder above; main's ops/runs has none of them. The SpringBoard lines given as the cause
  ("Scene is not suitable for primary role", with the `can=`/`prefers=` predicates) are in none of them (0 hits in
  105507.log); they came from the Simulator's system log, which was not kept. The cause is plausible and the fix
  confirms it, but the record should carry its own evidence: a short excerpt of the SpringBoard lines and the COUNTS
  lines beside the review.
- Board line for L1-L3: T-5285 (Idris, P3).

## Checked and fine

- No other scene in the app for `"*"` to pull requests into: the debug check views (`-widget-install`, `-theme-check`
  and the rest) are branches inside the same WindowGroup, launched only by tests.
- The F3 record I was handed is accurate on every count I could check (red message, probe counts, green counts, the
  110716 attempt, 21 failing unit tests by class, 26/0 for the two classes alone); only its file paths fail (L3).
- T-4581's Done-when (red with the line removed, green with it, recorded under F3) is now met by this work; its owner
  can tick it.
- Release (T-4615) is untouched by this review, and the page says so.

## Board lines

- T-5283 (M1): check widget taps in every iPad window mode (Idris, P2).
- T-5284 (M2): say only what was seen about iPad taps (Idris, P2).
- T-5285 (L1, L2, L3): tidy the real widget tap test's smaller points (Idris, P3).
{% endraw %}

</div>
