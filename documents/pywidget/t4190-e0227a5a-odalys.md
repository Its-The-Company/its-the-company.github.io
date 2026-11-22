---
layout: "default"
title: "Review of T-4190 at e0227a5a: the Editor theme row&#x27;s gate (T-0657)"
section: "documents"
description: "The gate is the same rule as before, now in a function a unit test can call. The old condition at SettingsView.swift:81 was store.gates.sellsPro, store.gates.config?.themes.on == true, let themePicker; the new\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4190-e0227a5a-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4190-e0227a5a-odalys.md</code></span></div><h1>Review of T-4190 at e0227a5a: the Editor theme row's gate (T-0657)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-5473, Commandment 13). Author of the step: Idris. Reviewed: commit e0227a5a9b ("T-0657 Idris:
Settings theme row gate as SettingsView.showsThemeRow, pinned both ways in SettingsLookTests"), two files:
ios/App/Settings/SettingsView.swift (+7 -1) and ios/Tests/SettingsLookTests.swift (+27). Also read, at the same
commit: ios/Shared/ProFlags.swift (ProConfig.init?(data:), ProGates), ios/App/Settings/EditorThemePicker.swift (the
T-0272 picker, 52b931b10b), ios/UITests/SettingsUITests.swift, ios/Tests/WidgetPlacementTests.swift setUp,
runtime/pro-flags.json, the T-4190 card (ops/plans/app-features.md 2.11) and documents/restructuring/06-decisions.md
item 9. Both changed files are the same at e0227a5a and at this branch's HEAD (f9cddbf8c1). Paths below are under
pywidget/. Date: 2026-11-21.

Tests: none run by me. No Xcode runs this session (the Mac mini is kept clear, an Investor #325 c7048540099). One
full PyWidgetTests run in this worktree after the commit, ops/runs/xcodebuild-20261121-194447.log (untracked, not
mine), has `SettingsLookTests testThemeRowOnlyWhileThemesIsOnAProductIsSoldAndThePickerIsBuilt` passed. That run
ended 2185 tests, 1 failure, in FirstDrawCardTests:219, which is not Settings code. The commit message's own counts
(host 21 suites, unit 74/0, UI 24/0 with 5 skipped, SettingsUITests F8) are from a run I could not find in this
worktree, so they are **unverified** here, not contradicted.

## Verdict: PASS with findings

The gate is the same rule as before, now in a function a unit test can call. The old condition at
SettingsView.swift:81 was `store.gates.sellsPro, store.gates.config?.themes.on == true, let themePicker`; the new
`showsThemeRow` (:144-146) is `hasPicker && gates.sellsPro && gates.config?.themes.on == true`, with `hasPicker`
passed as `themePicker != nil` and the `let themePicker` binding kept. Every input gives the same answer as before,
so no Settings row changes: Pro and Restore (:77), Developer mode (:78-80), tour (:91), Launcher (:99), gate build
(:104), links and Acknowledgements and the foot (:109-122) are untouched.

Against the shipped flags: runtime/pro-flags.json has a product (`app.pywidget.pro`) and `themes.on: false`, so the
rule draws no Editor row in the build that ships. That agrees with SettingsUITests.swift:125 (`settings.theme` must
not exist) and with the card's Done-when, "Pro themes only once the Investors settle which themes are free".

Against the Pro <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (06-decisions.md item 9, an Investor 11-16 9:43 PM and the 9:55 PM follow-up c6936602056):
themes are not in Pro yet, and "several themes should be included in the free version". Today's picker holds only
Standard and the three Pro themes, so with the Pro row off there is nothing to choose and hiding the row is right
(s5.10.1). I2 notes what changes when the free themes are decided.

Does the test pin it both ways? Mostly yes. The fixture's parse is checked first (:106-109), so a broken fixture
cannot turn every case into the closed state and pass. True with product, flag and picker, bought or not
(:111-112); false with no picker (:113), flag off (:114), no product (:115), closed state (:116) and the shipped
file (:117). By hand, against each term: drop `hasPicker`, :113 fails; drop `themes.on`, :114 fails; always true,
:113-117 fail; always false, :111-112 fail; gate on `entitled`, :111 or :112 fails. The `sellsPro` term has no case
that can catch it (I1), and the shipped-file case cannot tell a read file from a missing one (L1).

The commit message's claims hold against the code: F8's rows are there as listed (Terms only while LegalLinks sets
its URL), the earlier proof was the UI test alone (SettingsUITests.swift:125), and the doc comments at
SettingsView.swift:142-143 and SettingsLookTests.swift:103-104 say what the code does. The picker shows Pro themes
locked until bought (EditorThemePicker.swift:49-51), as the test's comment says.

## Findings

### L1. The shipped-file case passes whether or not the test reads the shipped file

- Where: `ios/Tests/SettingsLookTests.swift:117-118`.
- Plain: the last check is meant to show the real flag file keeps the theme row hidden, but it also passes when the
  file is missing.
- The failure: `ProConfig.bundled()` returns nil when the bundle has no pro-flags.json or the file does not parse,
  and nil is the closed state, which also draws no row. So this assertion is green in both cases and its message
  ("the shipped pro-flags.json keeps themes off") is only true for one. Today it is a real read:
  WidgetPlacementTests.swift:28 unwraps `ProConfig.bundled()` in the same test target. But this test does not say so
  itself, and it would stay green if that ever changed.
- Fix: `let shipped = try XCTUnwrap(ProConfig.bundled(), "bundled pro-flags.json")`, then
  `XCTAssertFalse(shipped.themes.on)` as the reason, then the `showsThemeRow` check on it. The test becomes
  `throws`. Board line **T-5523** (Idris, P3).
- Test: the same test; it must stay green on the shipped file.

### L2. The Settings docs page lists the editor theme as a row the shipped build does not draw

- Where: `docs/how-it-works/screens.md:47` (SettingsView entry, checked at 37457b0b1cac).
- Plain: the page that explains the app's screens says Settings has an editor theme row, but today's build hides it.
- The page reads "Settings: the editor theme, Pro, ...". With the shipped flags `showsThemeRow` is false, so a
  reader of the page expects a row that is not there. Not caused by this commit, which keeps the old behaviour; it is
  the one place outside code that states the rule this commit pins.
- Fix: say the editor theme row shows only while Pro is for sale and the themes row of pro-flags.json is on (off
  today), and move the entry's `checked:` to the commit that fixes L1. Same board line, **T-5523**.

### I1. (Information, no work) The `sellsPro` term cannot be caught by any test, and does not need to be

- Where: `ios/App/Settings/SettingsView.swift:145`; `ios/Shared/ProFlags.swift:83`; test `:115`.
- Plain: one of the three conditions in the rule is already guaranteed by the flag file reader, so no test can
  show it working.
- ProConfig refuses a file with no product and any gate on (ProFlags.swift:83), and ProConfig has no other
  initializer, so no ProGates value has `themes.on` true without a product. Removing `gates.sellsPro &&` changes no
  answer, and :115 ("C3: nothing for sale") is the same case as :114 with the product removed. The subject's
  "pinned both ways" is true for the picker and the flag, which are the two terms that can be wrong. Keeping the
  term is fine: it says the s5.10.1 rule in words and guards a future reader change. No board line.

### I2. (Information, no work now) When the free themes are decided, this rule and its test must change

- Where: `ios/App/Settings/SettingsView.swift:142-146`; test `:115` and `:117-118`.
- Plain: the rule hides the theme row whenever Pro is not for sale; once some themes are free, people without Pro
  will need that row.
- The 11-16 9:55 PM follow-up on #278 says several themes are free and more may be Pro; which ones is still a
  proposal (ops/plans/T-4672-showcase-premades.md s6). When a free theme ships, the row must be drawn with no
  product and with the Pro themes row off, and `showsThemeRow`'s "C3 draws none" and :115 become wrong. That work
  sits with the open lines that turn the themes on (T-2987: turn on the approved Pro flags and themes; T-2988:
  finish the picker on the Pro screen). No new board line; whoever takes T-2987 should read this note.
{% endraw %}

</div>
