---
layout: "default"
title: "Review of T-4640 at 1afa9858: a location fix that arrives after Choose a Place is left is dropped"
section: "documents"
description: "The change does what M2 asked, in the way M2 suggested. The run lives in view state (CurrentFixRun). It is cancelled when the screen disappears, and every call back into the screen after an await comes after a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4640-1afa9858-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4640-1afa9858-pernille.md</code></span></div><h1>Review of T-4640 at 1afa9858: a location fix that arrives after Choose a Place is left is dropped</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4930, Commandment 13; privacy as Commandment 6 asks). Author: Idris. Reviewed: 1afa9858f7
(ios/App/Pages/PlacePicker.swift, ios/Tests/SettingsPageTests.swift, docs/how-it-works/screens.md). Also read, for what
the change leans on: ios/App/Device/LocationCall.swift (`LocationCall.Source`, `SystemLocationCore.sample` and its
delegate callbacks, `SystemLocation`), ios/App/Pages/SettingsPage.swift:606-626 and 820-834 (the two places that push
Choose a Place), ios/App/Pages/PremadeSettings.swift:472-480 and 658-673 (`fromFix` rounding, `CurrentPlaceRow`),
ios/UITests/PremadePageUITests.swift:186-220, the T-4640 board line, and my T-4540 review M2
(t4183-0803f09d-pernille.md), which this commit answers. Paths are under pywidget/ unless they start with tools/ or
ops/. None of the reviewed files changed between 1afa9858f7 and this branch's HEAD 46595ff397. Date: 2026-11-19.

What I ran:
- Xcode: nothing ran. `xcodegen generate` worked. `XC_LOCAL=1 tools/xc.sh ... -only-testing:PyWidgetTests/SettingsPageTests
  test` on iPhone 18 Pro (by id) twice, once in this worktree and once in a scratch worktree. Both waited for the
  machine's xcodebuild lock (load average 140 to 580). The first was stopped by my own 20-minute limit. The second ended
  with exit 75: "waited 1800.1s for the xcodebuild lock; <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> are on, so not running (T-0875)". No xcodebuild ran
  for this review.
- Runner: `tools/runner_queue.py --only-testing PyWidgetTests/SettingsPageTests --task T-4930 --commit 1afa9858f7`
  (1afa9858f7 is on origin/main). In a lane session that is written to ops/lane-outbox/ and becomes a MacBook job only
  when this branch lands. It has no result yet.
- A swiftc probe on the Mac (not the Simulator), in my scratch folder: the commit's `CurrentFixRun`, cut byte for byte
  from PlacePicker.swift, with stand-in types for `LocationCall` and `CurrentPlaceRow`, the test's `HeldFixSource`, and
  a main that does both halves of `testAFixThatArrivesAfterLeavingChooseAPlaceIsDropped` the same way.
  - Commit as is: GREEN (the left run is dropped, the run that stays lands). The same 30 times in a row at load ~500,
    so the test's two 150 ms sleeps held under this machine's worst load.
  - Mutant A, the `guard !Task.isCancelled` after `sample` removed: RED (the left run writes the draft and dismisses).
  - Mutant B, `cancel()` made empty: RED.
  - Mutant C, `.onDisappear` without `run.cancel()`: not run, because no test builds a `PlacePicker`. The test drives
    `CurrentFixRun` alone, so this mutant passes by construction (L1).
- `python3 -m unittest tests.site_how_it_works_test`: 58 passed. `tools/site/how_it_works.py`: PlacePicker's box is
  `ok` (checked e124c76d4f1b = now).

## Verdict: PASS with findings

The change does what M2 asked, in the way M2 suggested. The run lives in view state (`CurrentFixRun`). It is
cancelled when the screen disappears, and every call back into the screen after an `await` comes after a
`Task.isCancelled` check. The questions I was asked to check:

- Main actor and delegate callbacks. `CurrentFixRun` and its task are `@MainActor`. `SystemLocationCore` resumes its
  waiters from its delegate callbacks under `MainActor.assumeIsolated`, so the task wakes on the main actor. The
  checks are sound because nothing suspends between a `guard !Task.isCancelled` and the call that follows it, and
  `cancel()` runs on the main actor too. So a cancel cannot slip in between the check and `done`.
- Re-entering the picker. Each push is a new `PlacePicker` with its own `CurrentFixRun`. The old run was cancelled when
  the old screen disappeared. The app's one manager hands the same fix to every waiter (`resolveAll`), so the old run
  drops it and the new run uses it.
- A new request while one is pending. The row is disabled while `locating`. `start` cancels any earlier task, which
  covers a double tap in the moment before `locating` turns on. The permission prompt is modal.
- Authorization changes. A prompt answered after the screen has gone is dropped by the first check. A revocation
  during the wait ends in `.failed`, which shows `page.loc.nofix`, or is dropped if the screen has gone. That is
  unchanged from before.
- The manager released. `SystemLocationCore.shared` lives for the whole process, and the picker owns no manager. The
  test source's `sample` ignores cancellation just as the real one does, so the test models the real case.
- Leaks. There is no lasting retain cycle. While a run waits, its task holds the screen's closures and `DismissAction`
  (CurrentFixRun -> task -> closures -> the view's state). That chain ends when `sample` returns, at most 15 s later,
  and `cancel()` drops the task handle at once.
- Privacy. Location is read only on the person's tap. Nothing in the picker stores the fix: `SystemLocationCore.sample`
  does not call `store`, and the fix reaches only `onCurrent`, which rounds it to about 110 m (`fromFix`) into the
  sheet's draft. A dropped fix goes nowhere. One thing does not stop when the person leaves: the one-shot request
  itself (N2).
- The test. It would fail on the old code: at the old commit there is no `CurrentFixRun`, and mutants A and B, which
  stand in for "no cancel", go red. The second half keeps the test from passing because nothing ever lands.

One gap is left, and it is the same failure M2 was about, with a smaller window: the cancel comes from
`onDisappear`, and SwiftUI calls that after the screen has started to go, not when the person acts (M1). M2's own
suggestion ("cancel it in `onDisappear`") left this gap, so part of M1 is my own miss from T-4540.

screens.md's new PlacePicker box says the right thing in plain words, and its fingerprint is current.

## Findings

### M1. Choosing a city (or tapping Back) while a fix is on its way can still put the fix over the city (T-5035)

- Where: `ios/App/Pages/PlacePicker.swift:95-96` (a city row runs `onChoose(hit)` and then `dismiss()`) and `:115`
  (the only cancel, in `.onDisappear`).
- The failure: the person taps Use Current Location, sees the spinner, types "Lis" and taps Lisbon. `onChoose` writes
  Lisbon into the draft, and `dismiss()` asks for the pop. The run is still live until SwiftUI calls `onDisappear`,
  which it does in a later update, not inside `dismiss()`. If the fix lands in that gap, `done` passes the
  `isCancelled` check. Then `onCurrent` writes the phone's position over Lisbon, and `dismiss()` runs a second time.
  The same gap opens on Back and on the edge swipe, where the pop starts before `onDisappear` comes. I did not measure
  how long the gap is or reproduce it (no Xcode run was possible, above). The order in the code is certain. Only the
  odds are small: a gap of part of a second against a wait of up to 15 s.
- Fix: in the city row's action, call `run.cancel()` (and set `locating = false`) before `onChoose(hit)`. For Back and
  the swipe, also cancel as soon as the screen stops being presented, for example
  `.onChange(of: isPresented) { if !$1 { run.cancel() } }` with `@Environment(\.isPresented)`, and keep `onDisappear`
  as the backstop. Pin the city path with a test: either a unit test of a small `choose(_:)` that cancels first, or a
  UI test that holds the fix.

### L1. The screen's wiring to `CurrentFixRun` is not under any test (same line, T-5035)

- Where: `ios/Tests/SettingsPageTests.swift` (the new test calls `run.cancel()` itself: "what onDisappear does").
- Mutant C (drop `run.cancel()` from `.onDisappear`) would pass every unit test, and M1's fix would too. The only test
  that opens Choose a Place, `PremadePageUITests.testDistanceUseCurrentLocationTakesTheSimulatorsFix`, checks that a
  fix lands, not that a late one is dropped. The commit names no UI test run for that file, though its `.onAppear`
  and `source` changed (N1).
- Fix: with M1, a test that goes through the view's own path: a UI test that sets the source to one that holds the
  fix (a launch argument the test build reads), opens Choose a Place, taps Use Current Location, goes Back, releases
  the fix and finds the row unchanged. Or keep the view logic in a model with `appear`, `disappear` and `choose`, and
  unit test that. Also run `testDistanceUseCurrentLocationTakesTheSimulatorsFix` once on this change.

### Notes (no work)

- N1. `.onAppear` now reads the status in a `Task` (`:114`), because `source.status()` is async. The row starts as
  `.take` and corrects itself one hop later. Before, the read was synchronous. On a phone where location is off, the
  first frame can show Use Current Location before it turns into `page.loc.off`. A tap in that moment on a phone never
  asked skips the prompt, finds `.ask`, and does nothing, so the person taps again. This is cosmetic. If M1's work
  touches the file anyway, a start value of `nil` (draw no row until the status is known) removes it.
- N2. `sample` cannot be cancelled, as M2 said and as the doc comment says. After the person leaves, CoreLocation
  still finishes its one-shot request, up to the 15 s timeout: the location arrow stays and the GPS works for a fix
  that is then dropped. Nothing is kept or sent, so this meets the privacy rule (location only when asked, nothing
  stored beyond need). The cleaner end would be a `withTaskCancellationHandler` in `SystemLocationCore.sample` that
  resolves the waiter with `.noFix`, and `stopUpdatingLocation()` when no waiter is left. The manager is shared with
  scripts' location calls, though, so the change belongs to the bridge's owners and needs its own tests. I would not
  spend a task on it for this screen.
- N3. `@State private var run = CurrentFixRun()` builds a throwaway `CurrentFixRun` each time the parent redraws the
  struct, and SwiftUI keeps the first one. That is harmless, because the class is empty until `start`.
{% endraw %}

</div>
