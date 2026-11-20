---
layout: "default"
title: "Review of 54a0c7cb: T-4516, PremadePageUITests, the premade settings routes on the Simulator"
section: "documents"
description: "The four tests prove the three routes the line names. Each route is checked by the thing a person would see. The Countdown row&#x27;s summary is read back after the pop, and since the row reads the premade&#x27;s file\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4516-54a0c7cb-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4516-54a0c7cb-pernille.md</code></span></div><h1>Review of 54a0c7cb: T-4516, PremadePageUITests, the premade settings routes on the Simulator</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4921, Commandment 13). Author: Idris. Reviewed: 54a0c7cbe9 as a whole (one new file,
`ios/UITests/PremadePageUITests.swift`, 226 lines, four tests) and 09feb52d4d (the runner job it queued), against the
T-4516 board line (as written at 54a0c7cbe9: the Countdown sheet row, the Page, an added event bringing the row back
reading "1 event"; the widget link `pywidget://w/pywidget.premade.sun` opening the Gallery with Sun's Page pushed and
Back landing on its sheet; Distance's Choose a Place showing Use Current Location with the Simulator's location set by
simctl, and Lisbon found offline) and my earlier reviews of the area (docs/reviews/t4183-0803f09d-pernille.md,
t4640-1afa9858-pernille.md). The author's memory and handoff notes were not read. Also read, for what the tests stand
on: GalleryView.swift (`show`, `GalleryDetailView`, the Page row and its summary), PyWidgetApp.swift `route`,
WidgetTapRouting.swift, PlacePicker.swift, SettingsPage.swift (the item sheet and `placeLabel`),
PremadeSettings.swift (`summaryText`, `SettingsKinds.place`), UITestLaunch.swift, WidgetKitCheckTests `seedPremade`,
tools/xc.sh's T-0532 block and the runner's job list. The test file has not changed since 54a0c7cbe9; line numbers
for app code are at dfa18cab80 (nothing under pywidget/ios changed between ec63ed6caf and it). Paths are under
pywidget/. Date: 2026-11-20.

## Tests run

- MacBook runner, J-20261120-0227-xc-test (the daily full suite with the UI target, at ec63ed6caf, which contains
  54a0c7cbe9), read with `python3 tools/xc_route.py wait`: 2,301 executed, 40 skipped, 2 failures, exit 65. The two
  failures are WidgetKitCheckTests/testETokenOnTheHomeScreen (the known token read, T-5047) and
  WidgetKitCheckTests/testTPremadeDrawsPaperInLightAndStudioGreyInDark (a dark-mode pixel share, line 574), neither
  in this class or the code it covers. No PremadePageUITests test is in the failed or skipped lists, and none can
  skip (no XCTSkip; only `setUpWithError` throws), so all four passed.
- The same holds in every earlier full-suite job whose commit contains 54a0c7cbe9 (checked with
  `git merge-base --is-ancestor`): J-20261118-0405, -0802, -2217, -2342, J-20261119-0210, -0757. That is seven
  runs, all four tests green each time, on one Simulator (udid 881FB861…, the same in every job). Six of these runs
  were done before I started, and I read their result files rather than rerunning them.
- I could not run the class on its own. A runner job's filter takes PyWidgetTests values only, so a
  `-only-testing:PyWidgetUITests/...` request queues the whole 60-minute suite. That is why 09feb52d's job was
  refused (ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox/failed/). Today's daily job already covers HEAD's code, so I did not queue another.
- Mutants: none run. I planted mutant A (below) in my scratch copy and asked through
  `XC_TASK=T-4921 tools/xc.sh ... test -only-testing:PyWidgetUITests/PremadePageUITests/testWidgetLink...`.
  The route refused it with exit 2: "not queued to the MacBook runner: 1 uncommitted path(s) the run reads ...
  the job runs HEAD without them". The runner only runs commits that are on main, and this review allows no local
  run (XC_LOCAL=1), so a UI-test mutant has no place to run. I reverted the mutant. The table below is traced from
  the code: each line names the assertion that would stop the test. None of it is measured.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:960px" markdown="1">

| Mutant (app code) | Caught by | Traced verdict |
|---|---|---|
| A. `GalleryView.show`: `openWithPage = false` (the tap opens the sheet, not the Page) | `testWidgetLink…` :150 `page.sun` wait | killed |
| B. `route` `.gallery`: `gallery.fromMenu()` (the tap opens the Gallery root) | :150 | killed |
| C. `GalleryDetailView.init`: path `[pageRoute, pageRoute]` (the Page pushed twice) | :158 (Back lands on a Page, not the sheet's row) | killed |
| D. the Page row's summary not read again on pop (`.task(id: path.count)` dropped, GalleryView.swift:485) | `testCountdown…` :120 | killed |
| E. the item's Save keeps the event in memory but does not write the file | :120 (the summary is read from the file, GalleryView.swift:511-516) | killed |
| F. `PlacePicker`: the Use Current Location row never shown | `testDistanceChooseAPlace…` :189 | killed |
| G. `CityList.load` returns nil (no bundled list) | :199 | killed |
| H. `onCurrent` writes nothing (or the picker does not close) | `testDistanceUseCurrentLocation…` :217 / :219 | killed |
| I. the fix is not rounded (`scale` 1000 dropped) | none: the set position has two decimals and `placeLabel` prints `%.3f` | survives; PremadeSettingsTests:357 holds it |
| J. T-4640's cancel dropped from `.onDisappear` | none | survives; out of this line's scope, T-5035 (my t4640 review, L1) |

</div>


## Verdict: PASS with findings

The four tests prove the three routes the line names. Each route is checked by the thing a person would see. The
Countdown row's summary is read back after the pop, and since the row reads the premade's file
(`GalleryDetailView.summary`), this checks the save on disk as well as the push. The Sun link goes through
`XCUIDevice.system.open` from the Home Screen, the same way LauncherWindowsUITests does. The test asserts exactly one
`page.sun` (so a double push fails), then that Back lands on the row `gallery.page.sun`, which only Sun's sheet
carries. Choose a Place is checked by its row, its label and a Lisbon hit with no "No city starts with" line. The fix
test reads the Simulator's 53.27, -9.05 off the item's Place row. Every wait is a `waitForExistence`, a
`waitForNonExistence` or a predicate expectation with a stated timeout, and every failure message says what was
missing. All four were green in seven runner runs out of seven.

Two things keep this from a plain pass. The tests read and change whatever the runner's long-lived Simulator holds,
and they clean up only when they succeed (M1). One tap is made <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>, at the centre of the screen (L1).

## Findings

### M1 (Medium): the tests do not start from a known state, and a failure leaves its event behind

- Where: `UITests/PremadePageUITests.swift:20` (setUp sets only `continueAfterFailure`), `:86-90` (the expected
  summary is worked out from what the row already says), `:123-131` (the clean-up is the test's last steps), `:177`
  (the Distance tests fail if three places are saved).
- The runner keeps one Simulator from job to job: the same udid in all seven jobs above, never erased. `PW_FRESH_SCENES`
  clears only saved windows, not a premade's `scripts/<id>/premade.json`. So:
  1. The line asks for the row to come back reading "1 event". The test checks that only on a Simulator whose
     Countdown has no events. Otherwise it expects "n+1 events". WidgetKitCheckTests `seedPremade`
     (WidgetKitCheckTests.swift:1636-1652) writes Countdown's file with a "Launch day" event on the same
     Simulator. So on the runner, the string the line names can be the one path that is never shown (it is unit
     tested, PremadeSettingsTests:61).
  2. `continueAfterFailure = false` stops at the first failed assertion. If anything fails after Save (:109) and
     before the Delete (:130), the "UI nnnnnn" event stays in Countdown's file for every later job, and it shows
     up in the Gallery's Countdown well, where GalleryUITests takes the T-4183 evidence shots. Countdown keeps
     20 events (countdown.py:36). After 20 such failures, Add Event is full and this test fails every time.
  3. The two Distance tests fail outright ("Add Place is off") once Distance holds three places. That can happen
     through a person's use, or through a later test that saves places, and the class cannot recover from it.
- Why it matters: this class gates TestFlight for the settings Page. If it goes red because of state another test
  left, someone loses a day finding that out. If it stays green while checking a different string than the one
  the line asks for, it says less than it seems to.
- Fix: in `setUpWithError`, find the App Group the way WidgetKitCheckTests.appGroupFolder() does. Keep a copy of
  `scripts/pywidget.premade.countdown/premade.json` and `scripts/pywidget.premade.distance/premade.json` (or note
  that they are absent). Write each with an empty list, and put the copies back in `addTeardownBlock`, which runs
  even after a failure. Then the Countdown test can assert exactly "No events yet" before and "1 event" after, as
  the line says, and the in-test Delete steps can go or stay as a check of Delete.
- Board line: T-5269 (Idris, P2).

### L1 (Low): the Use Current Location test taps the middle of the screen

- Where: `:215` `app.tap()`, after `current.tap()`.
- It is there so the interruption monitor runs if the When In Use prompt appears. On the runner the prompt never
  appears, because xc.sh grants location first (T-0532). So the tap lands on whatever is at the centre at that
  moment. That is empty list space if the fix has not come yet. If the fix has come and the picker has closed, it
  is the Add Place item sheet. It hits nothing today on the iPhone 17e layout, but if the sheet gains a row, or the
  test runs on a smaller device, the tap can land on the Place row, Choose a Place opens again, and :217 fails.
- Fix: handle the prompt where it lives. Wait for `springboard.alerts.buttons["Allow While Using App"]`, with
  `XCUIApplication(bundleIdentifier: "com.apple.springboard")`, for a few seconds and tap it if it is there.
  Or tap an element known to be inert, such as the navigation bar title.

### L2 (Low): smaller points, one line

- The link test covers the app running in the background only. When a tap cold-launches the app, the request
  goes in through `ContentView`'s `.onAppear { route(widgetTap) }` (PyWidgetApp.swift:1173) instead of
  `onChange`. On the iPhone runner no test covers that, because LauncherWindowsUITests'
  `testAppNotRunningWidgetLinkOpensOneWindow` is iPad-only (it was skipped in today's job). Add a second link test
  that starts with `app.terminate()`.
- After Back, the link test checks for Sun's row, but not that `page.sun` is gone. One more line
  (`XCTAssertFalse(page.firstMatch.exists)`) would make "landed on the sheet" a statement about the Page as well.
- The comments claim more than the tests check. At :16-17, "rounded to about 110 m" cannot be seen, because the
  set position has two decimals and the row prints three (mutant I survives; the rounding is held by
  PremadeSettingsTests). At :160, "the sheet is not Sun's" is asserted with `gallery.well.systemSmall`, which every
  sheet has. Sun is proved by :157. And "offline" is reasoned from the code, not tested. :12-13 says so honestly.
- `sleep(2)` at :142 is a fixed wait before `system.open`. It is harmless here because every check after it waits
  on a condition, but `XCUIApplication(bundleIdentifier: "com.apple.springboard").wait(for: .runningForeground,
  timeout: 5)` says what it waits for.
- Board line: T-5270 (Idris, P3), with L1.

## Checked and fine

- Order: the four tests share no state with each other except what M1 describes. The Countdown test adapts to any
  count, and the two Distance tests leave nothing behind (Cancel, then Discard). Alphabetical order puts the
  Countdown test first. Run in any order, the class gives the same results, given M1's limits.
- Timing: there is no fixed wait except :142, and no wait shorter than what it waits for. The 30 s at :217 covers
  `sample(timeout: 15)` and the dismiss. Summary reads go through `XCTNSPredicateExpectation` (:72-76), not a
  one-off read.
- The `gallery.page.<id>` identifier does not collide with the wells' `gallery.page.<id>.<family>`: subscripting
  `descendants(matching: .any)[id]` matches the identifier exactly.
- The Sun route takes the locked check into account (`PremadePageRoute.pushesPage`, locked: false for Sun, a free
  premade), and Distance's row shows only where `showsRow` allows it. Both premades are free in this build, so the
  tests do not depend on Pro.
- The runner evidence for T-4516 (ops/runs/t4516-runner-result.txt) counts three passing jobs. There are seven, as
  listed above. The job results name failures and skips, not the tests that passed, so "passed" is inferred from
  "ran, cannot skip, not failed". I count that as sound for this class.

## Board lines

- T-5269 (M1): start the premade UI tests from known files and restore them after (Idris, P2).
- T-5270 (L1, L2): the blind tap, the cold-launch link, the Back check and the comments (Idris, P3).
- Both change the same file as T-5035, which asks for a UI test that holds a location fix (my t4640 review, L1).
  Whoever takes one should look at the others, so the class is rewritten once.
{% endraw %}

</div>
