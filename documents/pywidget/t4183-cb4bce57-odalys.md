---
layout: "default"
title: "Review of cb4bce57: T-4515, a Habits row&#x27;s tap opens its Page at that habit"
section: "documents"
description: "The link, the route and the match are right and narrow. WidgetTapLink.focus (Shared/WidgetTapLink.swift:98-107) reads a focus only from /habits/open, only one habit parameter, 1 to 64 bytes of ASCII letters, digits, _\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4183-cb4bce57-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4183-cb4bce57-odalys.md</code></span></div><h1>Review of cb4bce57: T-4515, a Habits row's tap opens its Page at that habit</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-5192, Commandment 13; the board line names Pernille and her file name, t4183-cb4bce57-pernille.md;
she was busy and I am equally independent of the author, so the file carries my name). Author: Idris. Reviewed:
cb4bce57e4 as a whole (9 files: WidgetTapLink.swift, WidgetTapRouting.swift, PyWidgetApp.swift, GalleryView.swift,
PremadeSettings.swift, SettingsPage.swift, WidgetTapLinkTests, WidgetTapRoutingTests, PremadeSettingsTests), against
the T-5192 line (premade-inputs.md s2.5 route 1) and ops/plans/T-4468-phone-check.md s5. The author's memory and board
notes were not read. Also read: habits.py `_slug`, `read` and `_url` (the links the widget writes), SettingsPageModel's
`init` and `load`, `listRows`, GalleryView's `show`, GalleryPush, ContentView's route. Against today's main: the
commits since (T-0048, T-0972, T-4890, T-4886, T-2296, T-3764, T-3765, T-4533, T-4681) change these files but none of
the lines this commit added; `git diff cb4bce57e4 HEAD` on the six source files shows no change to the focus path.
WidgetTapRouting's other changes (T-3765) are T-4068's to read and I did not. Line numbers are at today's main. Paths are
under pywidget/ios/. Date: 2026-11-20.

## Tests run

- MacBook runner, job J-20261120-0650-xc-test (`XC_TASK=T-5192 tools/xc.sh -project PyWidget.xcodeproj -scheme
  PyWidget ... test -only-testing:PyWidgetTests/WidgetTapLinkTests -only-testing:PyWidgetTests/PremadeSettingsTests
  -only-testing:PyWidgetTests/WidgetTapRoutingTests`), at main 9be9b9b0, which carries cb4bce57 unchanged in the
  focus path: passed, exit 0, 77.7 s, 67 executed, 0 skipped, 0 failures (runner log
  ops/runs/xcodebuild-20261120-065335.log on the runner; I read the job's summary through `xc_route.py status`, not
  the log, so I cannot list the cases by name). The three suites hold the five T-4515 cases.

- No phone run and no Simulator UI run: the scroll, the outline, Reduce Motion and VoiceOver are read from the code
  only (see M2).
- Swift mutants: not run. The MacBook runner runs only commits on main, so a mutant commit cannot go there, and this
  task does not run Simulator tests here. Traced from the code and the tests instead:
  (a) `focus(...)` without `parts[1] == "open"`: `.../habits/edit?habit=walk` and `.../habits/open/x?...` in
  `testAMalformedOrMisplacedFocusIsDroppedAndTheTapStillOpens` would fail. Killed by reading.
  (b) without `named.count == 1`: the `habit=a&habit=b` case fails. Killed.
  (c) without the byte filter: the `%20`, `%2F` and `%C3%A9` cases fail. Killed.
  (d) `1...64` widened to 65, or the lower bound dropped: the 65-`a` case and the `habit=` case fail. Killed.
  (e) PageFocus's slug pass without `$0[id] == nil`: "the slug of a row that has an id" fails. Killed.
  (f) PageFocus's two passes merged into one (first row that matches either way): no test has a no-id row before a
  row whose id equals that row's slug. Survives; harmless in practice (needs a hand-written id equal to another row's
  first word).
  (g) GalleryView `openFocus = r.focus` (not gated on `openWithPage`), GalleryDetailView without `focus = nil` on pop,
  and every line of `showFocus`: view code, no test reaches them. Survive.

## Verdict: PASS with findings

The link, the route and the match are right and narrow. `WidgetTapLink.focus` (`Shared/WidgetTapLink.swift:98-107`)
reads a focus only from `/habits/open`, only one `habit` parameter, 1 to 64 bytes of ASCII letters, digits, `_` and
`-`; anything else is dropped and the tap still opens the Page at the top, which is what s2.5 asks. The focus rides
`.gallery(name, focus:)`, `GalleryPush.fromTap`, `GalleryView.show` (dropped when the Page is not pushed, so a locked
premade carries none, `App/Gallery/GalleryView.swift:254`) and `GalleryDetailView` (dropped at the first pop, `:485`)
to `SettingsPage`. `PageFocus.of` (`App/Pages/PremadeSettings.swift:624`) matches by id first, then a row with no id
by habits.py's slug; I checked `slug` against `_slug` by hand (`split()`, `lower()`, `[^a-z0-9_-]` removed, "habit"
when empty) and it agrees, including the tests' "Café" and "日本". The anchor is the row's index in `model.rows(field)`,
the same array `listRows` draws from, so the outline lands on the matched row. The model loads in `init`
(`SettingsPage.swift:122`), so `state` and `values` are there when the Page's task runs. A deleted or unknown id gives
nil and the Page opens at the top with no message. Reduce Motion: the scroll is not animated and the outline is set
and cleared without animation (`:349-357`). VoiceOver: the row takes `@AccessibilityFocusState` (`:355`).

Crafted links. Any app, or a page in Safari after iOS asks, can open `pywidget://widget/habits/open?habit=<anything>`;
a person's own script widget can write the same link. What it can do: close Pro and Settings, save the editor
(`model.saveNow()`, as every Gallery tap already did), open the Habits Page, and scroll to and outline one of the
person's own habits. It cannot name another premade's row (`focusParameter` has only `habits`, and the name must be
`habits` exactly), cannot reach a file or path (the id is only compared with saved values, never used to build a
path or a query), writes nothing, and shows nothing the person's own Page does not already show. An id longer than
64 bytes or with any other character is dropped before it reaches the app's state. I found no way for the link to
open anything but one of the person's own habits, or the Page's top.

Two things keep it from doing what the line says in every case: a second tap while the Page is already up does
nothing (M1), and none of the scroll, the outline, Reduce Motion or VoiceOver is tested anywhere, while the phone
check as written cannot show the scroll (M2).

## Findings

### M1 (Medium): a second Habits row tap, with the Habits sheet still up, does not move to the new habit

- Where: `App/Gallery/GalleryView.swift:247-256` (`show`), `:238-241` (`.sheet(item: $open)`), `:430-436`
  (`GalleryDetailView.init`).
- A person taps Walk on the widget: the Gallery's sheet opens with the Habits Page at Walk. They go to the Home Screen
  and tap Read. ContentView routes again; GalleryView is still on the stack, so `show` runs with the new request and
  sets `open = entry`, the same habits entry (same `id`). `sheet(item:)` does not present again for the same identity,
  and `GalleryDetailView`'s `@State path` and `@State focus` keep their first values (a new `init`'s
  `State(initialValue:)` is ignored for a view already shown). So the Page stays where it was and Read is never
  scrolled to or outlined. If the person had popped back to the sheet's summary first, the Page is not pushed again
  either (this half came with T-4468 slice 2; the new focus makes it the common case).
- Why it matters: checking off one habit, going home and tapping another is the ordinary use of this widget.
- Fix: give the sheet's content the request's identity, e.g. `GalleryDetailView(...).id(opened)`, so each tap builds
  it again with `startOnPage` and `focus`; or dismiss and present again when `open?.id == entry?.id`. <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span> the choice
  into something a test can reach, and add a step to s5 (below).

### M2 (Medium): the scroll, outline, Reduce Motion and VoiceOver have no test, and s5 cannot show the scroll

- Where: `App/Pages/SettingsPage.swift:343-358` (`showFocus`), [`ops/plans/T-4468-phone-check.md`](../company/t-4468-phone-check.html) s5 steps 4-5.
- The tests cover the parser, the route and `PageFocus.of`, all well. Everything after that is view code no test
  reaches (mutant (g) above). The phone check is the only place it will be seen, and s5 as written has one habit
  (Walk), which is on screen at the top already, so "scrolled to Walk" passes whether or not the scroll works. It
  does not turn on Reduce Motion or VoiceOver, delete a habit, tap from a cold start (where the fixed 350 ms wait at
  `:348` is most likely to be too short for the sheet and its pushed Page), or tap a second habit (M1).
- Why it matters: the line asks for Reduce Motion and VoiceOver handled; today that is true only by reading. Nothing
  untested ships (Commandment 1).
- Fix: extend s5: add enough habits that the tapped one is below the fold on a Large widget, tap the last one from a
  cold start and from the background; tap a second one with the Page up; turn on Reduce Motion and check there is no
  scrolling movement; turn on VoiceOver and check it reads the tapped row; delete a habit and tap its row on the
  widget before it redraws (Page at the top, no message). A UI test that opens the link with several habits and
  checks the row is hittable and outlined would hold the scroll without a phone.

### L1 (Low): small edges, one line between them

- Two habits with no id whose names share a first word ("Walk dog", "Walk cat") both link as `walk` (habits.py
  `_slug`), so a tap on the second outlines the first (`PremadeSettings.swift:624-638`, first match). Only rows written
  before the Page gave ids; giving such rows an id on the Page's first load would end it.
- habits.py links a row by slug when its id is falsy (`h.get("id") or _slug(...)`), so a hand-written `"id": ""`
  links as the slug, but `PageFocus.of`'s slug pass needs the id key absent (`== nil`), so that row opens the Page at
  the top. A non-string id is the same. Hand-edited files only.
- `showFocus` sets `focusShown = true` before its waits (`SettingsPage.swift:346`); if the task is cancelled during
  the 1.5 s wait, `outlined` is never cleared, and if during the 350 ms wait, the focus is never shown. I found no
  path today that cancels it without also destroying the Page; clearing `outlined` in a `defer` would close it.
{% endraw %}

</div>
