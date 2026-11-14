---
layout: "default"
title: "Review of T-1440: the refresh glyph&#x27;s tap (TreeRefreshButton)"
section: "documents"
description: "The rule matches state-spec s10 B2 and s3.3 as written. TreeRefreshButton.tap (Shared/TreeView.swift:631-641) returns .intent only in the extension with a non-empty id. It returns nothing in accessoryInline, nothing in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4418-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 24 · Sat Nov 14</span><span><code>pywidget/docs/reviews/t4418-pernille.md</code></span></div><h1>Review of T-1440: the refresh glyph's tap (TreeRefreshButton)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4418, Commandment 13). Author: Idris. Reviewed: 39ea7fc60d (Shared/TreeView.swift and three
test files). `git diff 39ea7fc60d 86b8f13140` is empty for those four files and for Shared/TreeTimeline.swift, so the
line numbers below hold on main at 86b8f13140. Shared/RefreshWidgetIntent.swift and Widget/PyWidget.swift changed
after the commit; I read them as they are on main. Gate: J-20261113-2347-land-m-51767b, green according to the board
line. I did not read its log. Reading only: no Xcode or Simulator run. Date: 2026-11-14.

## Verdict: PASS with notes

The rule matches state-spec s10 B2 and s3.3 as written. `TreeRefreshButton.tap` (`Shared/TreeView.swift:631-641`)
returns `.intent` only in the extension with a non-empty id. It returns nothing in accessoryInline, nothing in the app,
and nothing with no id. Under taps off it gives a `Link` on medium and up, and draws plain in systemSmall and on the
Lock Screen. The id cannot come from the script: `entry.widgetID` is set only by the provider, from the person's
configuration (`Widget/PyWidget.swift:10`, `:73`, `:79`, `:87`; `Shared/WidgetPlacement.swift:235`, `:247`), never
from `tree.json`'s `widget.id`. A script cannot make its glyph refresh another widget. The source scan cuts comments
(`Tests/PreviewQueueTests.swift:287-291`), so the doc comment at `TreeView.swift:618` does not count against
`wired.count == 1`.

What I could not pass by reading: the tap has never run in a widget host. Every test that renders runs in the app,
where `TreeHost.isExtension` is false (`Shared/TreeNodes.swift:291`). So every render test draws the `.none` branch, and
the Button-wrapped and Link-wrapped glyphs have never been drawn by anything. The Lock Screen tap that this commit
switches on is still an open check in the spec. M1 and M3 need a Simulator and phone run before the TestFlight build
that carries this. M2 is test work. The L items can follow.

## What I checked

1. **Missing id.** nil and "" both give `.none` in every family (test `:229-232`). The placeholder has no id
   (`PyWidget.swift:23-24`). The choose card, first-draw card and Pro card draw no tree, so there is no glyph. The
   `.missing` entry has an id but no root ("No view for this size"), so there is no glyph either. The first-render
   timeline carries the id, so a bundled premade tree's refresh is live and runs that premade. That is right.
2. **In the app.** `.none` for every family when `tapsOff` is nil. With taps off it is a `Link`, against the doc
   comment (L1).
3. **Families.** Inline gives `.none` through `look`. Circular and rectangular give `.intent`, which is the spec ("draw it
   where the author places it", B2). systemSmall under taps off gives `.none`. An unknown family string falls to
   `.circle` and `.intent`, which is harmless.
4. **Mutants.** The test <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the following: dropping the `look` guard (inline line `:234`), dropping `isEmpty`, dropping
   `isExtension`, dropping `!= "systemSmall"`, and swapping to RefreshWidgetsIntent (the exact-string scan). These
   survive: deleting `.environment(\.treeWidgetID, entry.widgetID)` (`TreeView.swift:114`), drawing `face` in the
   `.link` case (`:664`), and moving the `isExtension` guard above the taps-off branch. See M2 and L1.
5. **The timeline test** (`Tests/TreeTimelineTests.swift:61-75`). It is sound: UTC is given, there are no formatters,
   and the four arrays pin date, stale, synthetic and age turn. It does not cover the stale mark landing on a turn (L5).
6. **Security.** The intent's id goes through `RefreshTap.run` into the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, which T-0678 reviewed (T-0678.7). This
   commit adds no new input to it. There is no held finding.

## Findings

### M1. The Lock Screen refresh is switched on before the spec's unlock check is written

`Shared/TreeView.swift:633-640` gives `.intent` for accessoryCircular and accessoryRectangular. state-spec s10
(`state-spec.md:248`, "Idris confirms in the Simulator") makes rectangular's control conditional on three checks:
(1) a tap after unlock runs the intent once, (2) what a tap on a locked device does, and (3) the pending look. It
also says "If (1) fails on either runtime, rectangular falls back to R0." None is answered, and the Open line at
`:333` still lists them. The runtimes named there are iOS 18 and 26. The app now also meets iOS 27, where the intent
is pinned to the app process (`RefreshWidgetIntent.swift`, `allowedExecutionTargets .main`), so a Lock Screen tap
can start the app in the background while the phone is locked.
**Fix:** before TestFlight, run the three checks on the iOS 18, 26, 27.1 and 27.2 Simulators and on a phone, and write
the answers and runtimes into s10. Until they are written, return `.none` for the accessory families in `tap` (one
line, plus test `:226-232`). The glyph still draws, and the widget's own tap opens the app.

### M2. The wiring around the rule is not tested: two mutants survive

The tests call the static `tap` with an id they pass in. Nothing checks that the shipped view gets that id, or that
the `.link` case links. The first surviving mutant deletes `TreeView.swift:114` (`.environment(\.treeWidgetID,
entry.widgetID)`). Every glyph in every placed widget then silently takes no tap, and the suite stays green. The
schema test (`Tests/RefreshAgeRendererTests.swift:268`) does not catch it, because it passes `decoded.widget.id` and
not the entry's id. The second surviving mutant draws `face` in place of the `Link` at `:665`.
**Fix:** let the body take the host from the environment (a `treeIsExtension` key defaulting to
`TreeHost.isExtension`) and publish the chosen `Tap` as a preference. Add a test that hosts `TreeEntryView(entry:)`
with `widgetID = "clock"` and `treeIsExtension = true`, and reads back `.intent(widgetID: "clock")`. Add one with
`treeTapsOff` set on systemMedium that reads back `.link`. If a hosted preference read is not reliable in this suite,
use a source-scan pin like the T-0430 one: the `.environment(\.treeWidgetID, entry.widgetID)` line in
`TreeEntryView.body` and `Link(destination: url) { face }` in `TreeRefreshButton.body`.

### M3. The shipped glyph's layout has never been drawn, and T-4431 says runtimes differ

All renders run in the app, so `.none` is the only branch any test has drawn. `Button(intent:)` with
`.buttonStyle(.plain)` (`:663`) and `Link` (`:665`) both wrap the 44 pt `face`. Whether either one adds an inset,
changes the hit shape, tints the glyph in accented, or adds a pressed effect is the system's choice. Since T-4431
(2026-11-14) we know that iOS 27.1 and 27.2 Simulators lay the same view out differently. A wrapper that adds space on
one runtime moves the 44 pt area against the spec's 0-overlap QA (`refresh-qa.json`).
**Fix:** (a) with M2's environment key, add a render test that draws the glyph in all three branches in small,
medium and rectangular, full colour and accented, and asserts the glyph's pixel bounds are the same in each. Run it
on both 27.1 and 27.2. (b) A Simulator run, which I did not do: place a widget with `RefreshButton()` on 27.1 and
27.2, screenshot it, and tap it once. Record that the intent ran one run (one run row) and the glyph sits where
`states-refresh.png` puts it.

### L1. Taps off in the app draws a live Link

`tap` checks `tapsOff` before `isExtension` (`:634-638`), so in the app's previews a taps-off medium glyph is a
`Link`. The doc comment (`:621`, "In the app (previews), or with no id: no tap") says otherwise. The test covers only
`isExtension: true` (`:236`, `:240`). Nothing sets `treeTapsOff` yet, so nothing ships wrong today.
**Fix:** move the `isExtension` guard first, so both branches need it, and add the `isExtension: false` taps-off
case to the test.

### L2. The small and Lock Screen half of taps off is not built, and two things will collide when it is

The `.none` in systemSmall and on the Lock Screen relies on "the widget's own widgetURL is the route" (s3.3
Families). Nothing sets that `widgetURL`: `TreeEntryView` sets `treeTapsOff` nowhere and draws no `widgetURL`. When
it is wired, there are three problems. An author's own `widgetURL` modifier (`TreeView.swift:477-478`) and ours would
both be in the tree; I recall that Apple calls more than one `widgetURL` undefined, but I have not checked that page.
The `tapsOff` URL is not passed through `TreeRules.linkURL` as every other link is (`:262`). And s3.3's VoiceOver
value "Off" and its hint are missing (the copy is DRAFT <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>, so the words wait).
**Fix:** in the change that wires `failed_count`, set `treeTapsOff` and the widget-level `widgetURL` in one place in
`TreeEntryView`, through `TreeRules.linkURL`. Drop the author's `widgetURL` while taps are off. Add a test that
small with taps off has the failed-runs route as its widget URL.

### L3. A RefreshButton inside an author's Link nests two tap targets

The `Link` node (`TreeView.swift:200-203`) wraps its children. A `ui.RefreshButton()` inside `ui.Link(...)` becomes a
`Button(intent:)` inside a `Link` on medium and up. Which one takes the tap is not ours to define, and it can change
between runtimes. `ui.validate` accepts the nesting.
**Fix:** the `Link` case sets an environment flag, and `tap` returns `.none` under it. That is one rule for every tree,
including trees already written. Add a test for it. I will add a `ui.validate` warning on the Python side under B1 if
the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> wants one.

### L4. VoiceOver calls a dead glyph a button

`face` adds `.isButton` in every branch (`:689`). In the app, with no id, and in small under taps off, VoiceOver says
"Refresh, button", and a double-tap does not refresh.
**Fix:** drop the trait from `face`. `Button` and `Link` supply it themselves.

### L5. Two tests prove less than their names say

`testATreeWithARefreshButtonAndNoActionsDecodesAndTaps` (`:268-269`): its last assertion holds for any non-empty
string, whatever the tree holds. It checks `tap`, not the tree. Assert the planned node instead, which the test
already does at `:267`, and take the id from a planned `TreeWidgetEntry` with `widgetID` set, or drop "AndTaps" from
the name. The T-0430 scan's message (`Tests/PreviewQueueTests.swift:305`) still says "takes no tap in v1". Finally,
no test puts the stale mark on an age turn. The planner keeps one entry there (`Shared/TreeTimeline.swift:224-232`,
synthetic first, then `!out.contains`), which is right, and only a test would keep it right. Add `staleAfter: 2400`
to the new timeline test: minutes `[0, 40, 40 + 6 * 1440]`, synthetic `[false, true, false]`, stale
`[false, true, true]`.
{% endraw %}

</div>
