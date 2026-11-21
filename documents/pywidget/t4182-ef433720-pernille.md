---
layout: "default"
title: "Review of ef433720a9: T-4182 (T-0048), the error card and the update card, with the error card&#x27;s tap to the failing line"
section: "documents"
description: "Safe to ship with should-fix. Nothing here crashes, loses data or risks App Review, and no traceback or message can reach any card. S1 (the tap&#x27;s line can belong to another file) and S2 (no reload after a failed app\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4182-ef433720-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4182-ef433720-pernille.md</code></span></div><h1>Review of ef433720a9: T-4182 (T-0048), the error card and the update card, with the error card's tap to the failing line</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5411, Commandment 13). Author: Idris. Reviewed: ef433720a9 as a whole, the only app-code commit
of the T-4182 merge at 317a3636 (`App/PyWidgetApp.swift`, `App/WidgetTapRouting.swift`, `Shared/StateCardView.swift`
new, `Shared/TreeTimeline.swift`, `Shared/TreeView.swift`, `Shared/WidgetPlacement.swift`, `Shared/WidgetStatus.swift`,
`Shared/WidgetTapLink.swift`, `Tests/StateCardTests.swift` new, `Widget/DebugDrawRecord.swift`, `Widget/PyWidget.swift`,
all under `pywidget/ios/`), and the evidence sheet `ops/runs/t0048-state-cards.png`. Spec read: state-spec s1 rows 1
and 3 and s3 ([`pywidget/docs/design/states/state-spec.md`](state-spec.html)), PROPOSAL-002 s5 (b) and (d). I read the code and the
commit message, not the author's memory or reasoning. Line numbers are ef433720a9's. Date: 2026-11-21.

317a363619 adds two <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox board notes only. The T-0048 note names 4d5422e117 (personal/b3); that commit has the
same patch-id as ef433720a9 (`git patch-id`: f55110bc42 for both), so the note describes what landed.

Later commits: `git log ef433720a9..main` on these files shows only c0e4a0f0b7 (T-0048, 11-21), which moves
`ContentView.openFromActivity`'s open-then-jump into `ConsoleModel.openAt(_:line:)` with its own tests. The new
`.fileLine` route (`PyWidgetApp.swift:1206`) still calls `openFromActivity`, so it now goes through `openAt`; nothing
below is changed by it.

## Tests run

Host only; no Xcode, no Simulator, no device (the Mac mini is held clear for the merge-road comparison, ops/state.md).

- `git patch-id` of 4d5422e117 and ef433720a9: equal (above).
- `state-tokens.json` at ef433720a9 read with Python: every key `StateCardWords.init?(data:)` asks for is there
  (`error.title`, `error.line`, `error.tap`, `error.inline`, `error.type_line`, `update.title`, `update.title_short`,
  `update.detail`, `update.tree`, `update.inline`, voiceover `error_card`, `update`); `priority` is
  `update, pro_card, error_card, error_badge, stale`, the order `decide` follows. `project.yml` bundles that file into
  both the app (line 164) and the extension (line 452), so the extension's cards have their words.
- The evidence sheet: both cards in all seven families, matching s3's table for the parts built; no exception type on
  small or any Lock Screen family; no traceback text anywhere. It is an ImageRenderer sheet, not a placed widget, as the
  commit says.
- Not run: StateCardTests and the rest of PyWidgetTests (need Xcode); a placed widget on a Home Screen or Lock Screen,
  and a real tap through `onOpenURL` (need a device or Simulator). S2 below is from reading the code, not from a device.

## What holds

- **Parser** (`WidgetTapLink.swift:86-95`). With no `view` item: exactly two items, one `widget` and one `line`; the
  line 1 to 7 ASCII digits and in 1...1,000,000; the id refused when its ASCII-lower-case key starts `pywidget.`
  (premades and every first-party id) or when `WidgetID.problem` refuses it. Negative, `+5`, `5.0`, empty, repeated,
  extra items, fragment, path, user and port are all refused (the last four by the shared guard at the top of
  `target(of:)`). `lineURL` (`:36`) refuses a premade's id and any line outside the range, so a premade's card keeps
  `url(for:)`. Leading zeros (`line=05`) read as 5; harmless.
- **Order** (`WidgetPlacement.swift:226-243`). Unknown version first, before the lock (`decide(document:)` is not
  reached); then the lock (`decide(document:)` returns `.proCard` for an absent tree of a locked premade); then, only
  for `.missing`, the error card; then first-draw and the bundled first render. That is s1's priority. A good tree with
  a failed run stays `.drawn` (row 4, badge).
- **What reaches a card.** `StateCard.Failure` holds only `line`, `errorType` and `file`; the traceback and the message
  have no field, so no view can draw them. The Lock Screen families draw the line only (`StateCardView.swift:160-182`);
  the type and the file's last path part only in the `default:` branch (medium, large, extra large). The pixel test
  (`StateCardTests.swift:236-238`) proves small and every Lock Screen family draw the same with and without type and file.
- **No badge over a card.** `TreeView.swift:121` adds `entry.stateCard == nil`; the medium slot's Link lives in that
  overlay, so it goes too. The pixel test with `badged: true` would fail if it came back.
- **Would the tests catch a break?** Mostly yes: update before the lock, lock before the error card, error card before
  first-draw, the outcome set (`Outcome.allCases`), the round trip and 12 bad links, the routing to `.fileLine`, the
  Lock Screen pixel rule. Gaps are L1 and L2.

## Findings

### S1. The tap opens the widget's main file at a line that may belong to another file

`RunRow.swift:302-304` takes `file` and `line` from the innermost **user** frame, which can be any file under the
user roots: a sibling module the script imports (the script's folder is `sys.path[0]`, `runner.py:369`). The card's link
carries only the widget and the line (`StateCardView.swift:26-31`), and `WidgetTapRouting.swift:44-46` opens
`scriptFile(for: id)`, the file that declares the widget.

Failure case: `trip.py` declares `trip_card` and calls `helpers.parse()`; `helpers.py` raises `ValueError` at line 40.
The medium card says "ValueError in helpers.py", "Line 40"; the tap opens `trip.py` at line 40, an unrelated line, or
past its end if `trip.py` is shorter. The card's one promise, "the failing line", is wrong for every multi-file widget.

The Activity screen's Open button has the same gap (`ActivityList.swift:154` pairs the widget's file with the row's
line); it predates this commit, but the card makes it the widget's main tap. Fix: on `.scriptLine`, read the widget's
`status.json` in the app and jump to the line only when its `file` is the found file's name (or open that file in the
same project folder when it is there); otherwise open the widget's file without a line. Test: a status naming
`helpers.py` routes to `helpers.py` at the line, or to `trip.py` with no line, never `trip.py` at line 40.
Board: T-5481.

### S2. A failed app run does not reload the widget, so the error card can wait 30 minutes

The card appears only when WidgetKit next asks for a timeline. `RunResultSink.finish` returns before `reload(id)` for
any run that is not `ok` (`RunResultSink.swift:110`); `reload` is called only after a tree is written (`:129`, `:141`).
A never-drawn widget shows the first-draw card, whose timeline asks again after `firstDrawRecheck`, 30 minutes
(`WidgetPlacement.swift:256`).

Failure case: someone places `trip_card`, saves a script that raises at line 12, and the save run fails. `status.json`
says `error`, but nothing reloads the kind, so the widget keeps "Not drawn yet" for up to 30 minutes (longer if
WidgetKit's budget defers the ask). That is the moment the commit's plain sentence is about. A widget on the extension
lane does not have this problem, since it runs in `getTimeline` and then reads `status.json`. The badge on a drawn widget
has the same delay and is older than this commit.

Fix: when the app's sink or recorder writes a `status.json` whose outcome moves into a failure (from `ok`, from none,
or between failure and success), reload the tree kind once. Only reload on that change, so a widget that keeps failing
spends no budget. Test: with the sink's `reload` injected, a failing widget run on a never-drawn widget calls it once,
and a second identical failure does not call it again. Proving it on the Home Screen needs a device or Simulator (not
run here). Board: T-5482.

### L1. The order "error card before the bundled first render" has no test

`StateCardTests.decide` (`:54`) passes no `firstRender` and keeps `premadeSaved`'s default `true`, so the first-render
branch (`WidgetPlacement.swift:237`) never runs in these tests. If the status check moved below it, all 12 tests would
still pass, and a free premade whose first run failed would draw its bundled sample instead of the card. Add one case:
a never-drawn free premade with a bundled render and a failed status gives `.errorCard`.

### L2. The parser's own range check and the `view=activity` claim are not tested

`lineURL` refuses out-of-range lines itself (`WidgetTapLink.swift:37`) before it calls `target(of:)`. The only
too-large link in the bad list, `line=99999999`, is 8 digits and is refused by the length check. So if
`(1...lineLimit).contains(line)` were removed from `target(of:)` (`:92`), `pywidget://open?widget=trip_card&line=1000001`
would be accepted and no test would fail. Add `line=1000001` and `line=-5` to the bad list. The comment at
`StateCardTests.swift:154` says a `line` beside `view=activity` is covered, but the assertion has no `line`. Add
`...&view=activity&line=5`, expected `.activity("trip_card", failedOnly: false)`.

### L3. A line outside 1...lineLimit from status.json is still drawn

`decide` copies `status.line` as is (`WidgetPlacement.swift:234`). A `0`, a negative or a 10-digit line draws
"Line 0" or "Error, line 1234567890" (21 characters, over the 20 the inline test keeps). `lineURL` then drops the link,
and Activity ignores such lines (`ActivityList.swift:154`, `line > 0`). Keep the line only when it is in
1...`WidgetTapLink.lineLimit` and treat anything else as no line.

### L4. A tree version below the readable set reads as "Needs a newer PyWidget"

`TreeFile.read` treats any version not in `readableVersions` as `.unknownVersion` (`WidgetPlacement.swift:326`, `:329`),
including `0`, negatives, or v1 after a later renderer stops reading it. The card would then say a newer app is needed
when an older tree is the cause. This cannot happen today: the sink writes only schema-checked v1 trees and the set is
`[1]`. Use the update card only for `v > readableVersions.max()`, and treat anything lower as `.unreadable`.

### L5. Today View shows the medium card's exception type and file name while the phone is locked (spec question)

The spec only calls the Lock Screen public. But Home Screen-family widgets also show in the Today View, which can be
reached from a locked iPhone unless the person turns that off in Face ID & Passcode [recall; not checked on a device
here]. "ValueError in helpers.py" is not the message and is not personal data, so this is within spec. Still, adding
`.privacySensitive()` to the wide line (`StateCardView.swift:192`) would hide it while locked at no cost. Maren to rule.
No board line.

## Verdict

**Safe to ship with should-fix.** Nothing here crashes, loses data or risks App Review, and no traceback or message can
reach any card. S1 (the tap's line can belong to another file) and S2 (no reload after a failed app run) are both fix
lines for Idris: T-5481 and T-5482.
{% endraw %}

</div>
