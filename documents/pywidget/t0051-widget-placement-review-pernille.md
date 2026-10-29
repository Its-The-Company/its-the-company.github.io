---
layout: "default"
title: "T-0582 review: bcff31bf (T-0051 slice 1, widget placement follows the Pro lock)"
section: "documents"
description: "Approve with fixes (F1 P2, F2 P3, F3 P3). The rules are right for the paths the tests cover: what the picker offers, the lock decision, purchase, refund and restore, and the timeline-write hook. F1 is a real gap in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0051-widget-placement-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0051-widget-placement-review-pernille.md</code></span></div><h1>T-0582 review: bcff31bf (T-0051 slice 1, widget placement follows the Pro lock)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28. I read it from `git show bcff31bf` and the files on main at
e509ddef. I did not read the commit message or the author's notes. I checked it against the ProGates rules in
Shared/ProFlags.swift and Shared/ProEntitlement.swift, and against the `pro_card` rows in state-tokens.json.
Run (iPhone 17e Simulator, through `tools/xc.sh`): `ops/runs/xcodebuild-20261028-164937.log`.
`PyWidgetTests/WidgetPlacementTests` passed (9 tests). I read the ProStoreTests `testT0051*` cases but did not rerun
them. I changed no code.

## Verdict

**Approve with fixes** (F1 P2, F2 P3, F3 P3). The rules are right for the paths the tests cover: what the picker
offers, the lock decision, purchase, refund and restore, and the timeline-write hook. F1 is a real gap in
"never lose the widget". It shows only when the bundled flag file is not trusted at run time, or when a later build
drops a premade or an own widget's folder disappears. It does not draw Pro content for free, so it does not <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>
TestFlight. It should land before the App Store.

Fix lines for Idris: T-0589 (F1, P2), T-0590 (F2, P3), T-0591 (F3, P3).

## What I checked and found sound

- **Widgets already placed keep working after the configuration change.** The kind stays `"PyTreeWidget"`
  (Widget/PyWidget.swift:87), so WidgetKit keeps them. They come back with `widget == nil`, and
  `TreeProvider.widgetID` maps that to `"new_widget"` (:42). That is the id the old StaticConfiguration drew, so
  nobody's Home Screen changes on update.
- **The lock is checked before the tree, on both ids** (`TreeDrawable.decide`). A folder whose tree.json says it
  is a different, locked premade still draws the Pro card. A locked premade with no tree yet draws the Pro card,
  not the error card.
- **Refund.** The picker drops Pro premades (`offered`, with `includeLocked: false`). A placed Pro premade still
  resolves (`includeLocked: true`), so the card can name it. `mayWriteTimeline` returns false for it and true for
  free premades and own widgets. ProStoreTests pins all of this against live StoreKit, with bounded waits.
- **Restore** brings the premades back from StoreKit's grant, not from a flag the app keeps. The test says
  honestly what SKTestSession cannot show (purchases made on another account).
- **App Review.**
  - The card carries no price, no "Buy", no "Unlock" and no "trial". WidgetPlacementTests checks the words
    against that list.
  - Tapping the card only opens the app, and the paywall and IAP stay in the app (3.1.1).
  - A free user's picker shows no locked content that they could not open.
- **Premade titles.** `premade-titles.json` uses the same rule as `Premade.title`, and
  `testBundledPremadeTitlesMatchThePremades` pins it. The build step writes into the bundle before signing, in
  both targets.

## Findings, by severity

### F1 (P2): a placed widget whose id no longer resolves silently turns into the New widget

- `WidgetChoices.resolve` (Shared/WidgetPlacement.swift:72-80) returns a premade only if the current flag file's
  `premadeOrder` lists it (:61, `gates.config?.premadeOrder ?? []`). It returns an own widget only if its folder
  is in the library (:79). Any other stored id is dropped.
- AppIntents resolves a stored entity parameter through `entities(for:)`, so a dropped id reaches the provider
  as `widget == nil`. `TreeProvider.widgetID` then draws `"new_widget"` (Widget/PyWidget.swift:42). The person's
  widget shows a different widget's tree, with no card to explain it. Three cases:
  1. **Closed state** (flag file not trusted, `config == nil`). `ProGates.isPremadeLocked` says every premade is
     locked, so every placed premade, free or Pro, should draw the Pro card. Instead each one becomes the New
     widget.
  2. **A later build renames or removes a premade from `premadeOrder`.** Placed copies become the New widget.
  3. **An own widget's folder is deleted.** The widget shows the New widget instead of its missing card.
- This contradicts the comment on `resolve` ("instead of losing the widget") and <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> item 3.
- **Fix (T-0589):**
  - In `resolve`, return every stored id that passes `WidgetID.problem(id, firstParty: true)` as a premade. Take
    the kind from the gates, and the title from the titles table or the short name. Return every valid own id as
    own even when its folder is gone.
  - That is safe because `decide` already checks the lock on the id. Its result is the Pro card when locked and
    `.missing` when there is no tree.
  - Tests:
    - `resolve` with `ProGates(config: nil, ...)` returns a placed free premade and a placed Pro premade, and
      `decide` gives `.proCard` for both.
    - A premade id that is not in `premadeOrder` and an own id without a folder both still resolve.

### F2 (P3): the extension's half of the change has no test

- The claim that "widgets already placed are unchanged" rests on `TreeProvider.widgetID(ChooseWidgetIntent())`
  returning `"new_widget"`. That code is in the extension target only (Widget/PyWidget.swift:42), and no test
  reaches it.
- Nothing tests the mixed case either: an own configured id whose tree.json claims a locked premade. `decide`'s
  loop handles it, but nothing pins it.
- `ChooseWidgetIntent` sits in Shared, which the app target compiles too (project.yml:42). It may therefore be
  listed as a "Choose widget" action in the Shortcuts app, where it does nothing.
- **Fix (T-0590):**
  - Move the default-id rule into Shared as a pure function and unit-test it: nil gives `"new_widget"`, and a set
    id is returned as it is.
  - Add the mixed-case `decide` test.
  - Check the Shortcuts app on the Simulator. If "Choose widget" is listed, add `isDiscoverable = false`.
  - In the device recheck, place a widget on the build before this commit, install this one over it, and confirm
    the widget is still there.

### F3 (P3): the whole design words table ships to use four strings

- `state-tokens.json` is copied whole into both bundles (project.yml:56, :206). That is 7,828 bytes each, so
  15,656 bytes, to read four strings.
- The file is a design document: `$note`, `author`, `date`, and every state's copy.
- It makes the shipped binary change whenever a design edit touches any row, with no code review.
- The `pro_card` rows it ships are marked `PROPOSED (C51)`, and nothing stops a PROPOSED row reaching an archive
  build.
- **Fix (T-0591):**
  - Generate `pro-card-words.json` at build time, as `premade_titles.py` does. It holds only the `pro_card` copy
    and voiceover rows.
  - Make the archive build fail while `pro_card.$status` still says PROPOSED, unless Maren's approval is
    recorded.

## 2026-10-28: T-0603 re-review of bb37b9dd (T-0589, the fix for F1)

Reviewer: Pernille. Author: Idris. I read `git show bb37b9dd` and, on main at 65e6754c, Shared/WidgetPlacement.swift,
Shared/WidgetID.swift (`problem`, `key`), Shared/ProFlags.swift (`isPremadeLocked`), Shared/ProEntitlement.swift
(`mayDraw`) and Widget/PyWidget.swift (`TreeProvider`). I did not read the author's notes. No Xcode run: I checked
the two logs the line names. `xcodebuild-20261028-183522.log` shows 323 tests, 0 failures. `xcodebuild-20261028-183347.log`
(the bcff31bf rule put back) has the three new tests red: 5 failures at WidgetPlacementTests.swift:69, :86, :87, :104.
I changed no code.

### Verdict

**Approve.** F1 is fixed. There are no High or Medium findings, so I added no board lines. The three Lows below
can wait for later work.

### The cases the line asks about

- **Closed state** (`config == nil`). `resolve` (WidgetPlacement.swift:78-82) keeps every `pywidget.premade.*` id that
  passes `problem(firstParty: true)`. `decide` (:152) then calls `mayDraw`, and `isPremadeLocked` returns true with no
  config, so every placed premade, free or Pro, entitled or not, draws the Pro card. That holds with and without a
  tree. `testClosedStatePlacedPremadesResolveAndDrawTheProCard` pins it with `entitled: true`, which is the hard
  case.
- **Unlisted premade.** It resolves under its short name. Without Pro it is locked (`freePremades[name] != true`),
  so it gets the Pro card. With Pro and no tree it gets `.missing`. Both are tested. With Pro and a tree still on
  disk, see L1.
- **Folderless own id.** It resolves as own. `document(for:)` returns nil, so `decide` gives `.missing` and the
  provider shows the error card under the widget's own id, not the New widget. This is tested.
- **Ids still dropped.** These are ids that fail `problem`: empty, too long, bad characters, a leading dot,
  `index.json`, `pywidget.<other>`, and any case variant of `pywidget.` (`problem` compares by `key`, which is
  ASCII lower-case). None of them can be stored by this build. `offered` (:53, :62) only ever offers own ids that
  pass `problem`, plus `premadePrefix + name`. Dropping them is right. A case variant of the *name*
  (`pywidget.premade.Habits`) is not dropped. It resolves, and it fails closed: `freePremades` is an exact-key
  lookup, so it is locked without Pro.
- **Pro content without Pro.** I found no path through a resolved id. Every resolved premade id goes through
  `mayDraw` on the configured id and on the tree's own `widget.id` before any tree is drawn. Own ids cannot carry
  the premade prefix in any case, because `problem` rejects them. `pro` on `.drawn` (:157) still bounds the
  timeline whenever either id is a Pro premade.

### Findings

#### L1 (Low): with Pro, an unlisted premade with an old tree.json draws its last render indefinitely

- WidgetPlacement.swift:152 with ProEntitlement.swift:74-77. After a build drops a premade from `premadeOrder`, a
  Pro user's placed copy passes `mayDraw` (unlocked). If `widgets/pywidget.premade.<name>/tree.json` is still in
  the App Group, `decide` returns `.drawn`. Nothing writes that tree again, so the widget shows the old render, and
  after `stale_after` the stale state, for as long as it stays placed.
- This is not a Pro leak, because the person has Pro. But it is untested, and it is a different result from the
  `.missing` the new test pins for the no-tree case.
- **Fix:** decide which result is wanted and pin it with a test. If `.missing` is wanted, have the app's premade
  writer remove output folders for premades that are no longer listed.

#### L2 (Low): `entities(for:)` asks StoreKit for a value the entity throws away

- WidgetPlacement.swift:122 awaits `ProEntitlement.gates()`, which walks `Transaction.currentEntitlements`.
  `resolve` uses it only for `kind`, and only through `ProGates(config:, entitled: false)` (:76). It needs the
  config, not the entitlement. `WidgetChoiceEntity.init` (:97-100) then drops `kind` anyway.
- The extension makes this StoreKit call on every parameter resolution, and calls StoreKit again in
  `TreeProvider.drawable`. That costs time inside the extension's budget and buys nothing.
- **Fix:** pass `ProGates(config: ProConfig.bundled(), entitled: false)` in `entities(for:)`, or drop `gates` from
  `resolve` if `kind` has no reader there.

#### L3 (Low): `mayDraw` tests the premade prefix case-sensitively, while `problem` does not

- ProEntitlement.swift:75 uses `hasPrefix(WidgetID.premadePrefix)`, but WidgetID.swift:90 compares by `key`. If a
  tree.json carries `widget.id` `PyWidget.premade.habits`, `mayDraw` returns true for it.
  `ViewTreeDocument` (TreeTimeline.swift:128) does not validate `widget.id` on decode.
- `resolve` never produces such an id, and the Python side rejects it. So this is defence in depth, not a path
  that is open today.
- **Fix:** in `mayDraw`, compare `WidgetID.key(widgetID)` against the prefix, and treat any case variant of the
  prefix as locked. Add one test.
{% endraw %}

</div>
