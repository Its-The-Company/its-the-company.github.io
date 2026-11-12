---
layout: "default"
title: "T-4073: review of T-3762 as landed (3e4f858209, board tick ad0b9d3a)"
section: "documents"
description: "Verdict: PASS with Low findings. No finding of Medium or above, so no new board lines. Nothing in this change holds TestFlight."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4073-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4073-pernille.md</code></span></div><h1>T-4073: review of T-3762 as landed (3e4f858209, board tick ad0b9d3a)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. 2026-11-12. Reading, git and reasoning only: no Xcode build, no Simulator run, no Swift test run (packet rule).

**Verdict: PASS with Low findings.** No finding of Medium or above, so no new board lines. Nothing in this change holds TestFlight.

## What it does

The finding from T-3692 was F1: ContentView kept `galleryOpen` after the Gallery was popped. `navigationDestination(isPresented:)` builds a fresh `GalleryView` on each push, so its `@State opened` starts as nil. `onAppear { show(openRequest) }` then replayed the old tap's request, and every later More > Gallery reopened that premade's page.

The fix is `GalleryPush` (pywidget/ios/App/Gallery/GalleryView.swift), which keeps the pushed flag and the request together:

- `shown = false` (Back, or `route(.file)` / `route(.projects)`) drops the request.
- `fromMenu()` pushes with no request.
- `fromTap(name)` pushes with a new `GalleryOpenRequest`, which has a new UUID, so a second tap on the same widget is not equal to the first and reopens the page.

ContentView (pywidget/ios/App/PyWidgetApp.swift) swaps `showGallery` and `galleryOpen` for one `@State gallery` and calls the three entry points.

## Main's HEAD

`git diff 3e4f858209 HEAD` on the four code and test files has one hunk in PyWidgetApp.swift, from 656217e42b and 3b9f6e7a90 (`TesterProMark.announce()` and a string interpolation in the save alert). Neither touches the Gallery lines. **HEAD holds the code as reviewed.**

## Correctness

Each path through the change:

- **Tap, Done, Back, More > Gallery** (the bug): Back writes `shown = false` and the request is dropped. `fromMenu()` pushes a new GalleryView whose `openRequest` is nil, so `show(nil)` returns at its guard. Fixed.
- **Tap while the Gallery is already pushed** (from More or from an earlier tap): `fromTap` swaps the request while `pushed` stays true. `onChange(of: openRequest)` fires and `show` opens the page, because the UUID differs from `opened`. This is unchanged from T-3671.
- **Pop animation**: during the pop the destination closure may run again with `request == nil`. `onChange` then calls `show(nil)`, which returns. Nothing flashes and nothing reopens.
- **Tap routed to a file or to Projects while the Gallery is pushed**: `shown = false` pops the Gallery and drops the request. A later More > Gallery opens the root (covered by `testTapRoutedElsewhereDropsTheRequest`).
- **Several windows** (iPad): each ContentView has its own `@State GalleryPush`, so a tap routed to one window cannot leak its request into another.
- **<span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">Shelf</span> timing**: `show` reads `model.shelf` on `onAppear`. `GalleryModel.init` fills `shelf` synchronously (GalleryPreview.swift, `shelf = GalleryEntry.shelf(bundle:)`), so a request is not used up against an empty shelf.

## Concurrency and file locks

None. All state is SwiftUI `@State` on the main actor. `route(_:)` runs from ContentView's handling of `widgetTap`, also on the main actor. The change adds no file I/O and no locks. The existing `model.saveNow()` before the push is unchanged.

## Privacy

None. The request carries a premade's bundled name and a UUID made in memory. Nothing is logged, stored or sent.

## Would the tests fail without the change?

- **GalleryPushTests (5, host).** Without the change these do not compile, because the type is absent. That proves little by itself, so I checked them against mutants by reading:
  - Remove `if !newValue { request = nil }` from the `shown` setter: tests 1 and 4 go red.
  - Remove `request = nil` from `fromMenu()`: test 2 goes red.
  - Drop the UUID from `GalleryOpenRequest`: test 3 goes red, because its `XCTAssertNotEqual` compares two same-name requests.
  - So each line of the type is pinned. They do not pin ContentView's wiring.
- **LauncherWindowsUITests.testGalleryFromMoreAfterWidgetTapOpensTheRoot.** This test pins the wiring. Reading the old ContentView confirms it must go red there: the More menu set `showGallery = true` with `galleryOpen` still set, and the fresh GalleryView's `onAppear` reopened the page, so `gallery.done` exists and the last assertion fails. The commit message reports that red run with that exact message. See L1 for the logs.

## Findings

**L1 (Low): the cited run logs cannot be checked.** The commit names `ops/runs/xcodebuild-20261109-031228.log` (green), `-032012.log` (red) and `-030230.log` (1529 executed). `ops/runs/*.log` is gitignored, and none of the three is on this host, because the run was in personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3. The red result agrees with my reading above, so I accept it. Even so, the next suite run on the MacBook runner should include this UI test so the result is on record before external TestFlight.

**L2 (Low): the UI test covers only the iPad.** LauncherWindowsUITests runs on iPad Pro 11, and the iPhone path (large title, `modeSwitch` in the content) is never driven. The logic does not depend on size class, so the risk is small. Separately, `navigationBars["Gallery"].buttons.firstMatch` assumes Back is the bar's first button. A future toolbar button on the Gallery's leading side would make the test tap the wrong thing. `navigationBars["Gallery"].buttons.element(boundBy: 0)` is no better; a Back identified by its label would be.

**L3 (Low, bookkeeping): the tick has the wrong workstream and a stale commit hash.** The lane-outbox tick (ad0b9d3a) files the work under `ws: build`, but this is Gallery and editor UI, so `widgets` or `editor` fits. It also cites b98a79966, the lane's pre-landing hash. The commit on main is 3e4f858209.

**Nit: the `Equatable` on `GalleryPush` has no user.** Nothing compares two GalleryPush values. It is harmless and can stay.

## Board

No Medium or above, so no new lines.
{% endraw %}

</div>
