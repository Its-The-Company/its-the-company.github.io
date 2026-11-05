---
layout: "default"
title: "T-2283: independent review of the Settings screen (T-0657 036c854f, T-2225 477813574)"
section: "documents"
description: "No blocker and no high finding. The Pro row and Restore draw exactly what SettingsProRowRule.row answers, with the facts the 10.2 hook names; RestoreOutcome maps case for case; no row is drawn for a feature or URL that\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2283-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2283-odalys.md</code></span></div><h1>T-2283: independent review of the Settings screen (T-0657 036c854f, T-2225 477813574)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-11-05. Independent review (Commandment 13): diffs, tests and spec only; the author's
reasoning not read beyond the commit messages' facts.

Read: `App/Settings/SettingsView.swift` (HEAD 477813574), `App/Settings/settings-strings.json`,
`scripts/export_settings_strings.py`, the `ProPaywallView.swift` and `PyWidgetApp.swift` hunks,
`UITests/SettingsUITests.swift`, the `Tests/EditorToolingTests.swift` hunk, against `App/SettingsProRowRule.swift`
(Core copy is a symlink, mode 120000), `App/LegalLinks.swift`, `App/Store/ProStore.swift` `restore()`, and IDE spec
`docs/design/ide/spec.md` s5.10 items 10.1, 10.2, 10.2 hook, 10.6.

## Verdict: ship to TestFlight

No blocker and no high finding. The Pro row and Restore draw exactly what `SettingsProRowRule.row` answers, with the
facts the 10.2 hook names; `RestoreOutcome` maps case for case; no row is drawn for a feature or URL that does not
exist. Two medium findings are test gaps on paths a tester can reach (Ask to Buy pending, a failed restore); they
should be closed before App Store submission, not before the first TestFlight build.

## Measurements behind the verdict


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements behind the verdict, scrolls sideways" data-n="1" style="--tw:774px" markdown="1">

| # | Check | Result | n |
|---|---|---|---|
| 1 | Local SettingsUITests at 477813574 (`ops/site-checks/settings-T-2225/SettingsUITests-run.log`) | 3 passed, 0 failed | 3 tests |
| 2 | Full suite, runner job J-20261104-2056-xc-test at 477813574 (`python3 tools/xc_route.py status ...`) | 1246 executed, 3 failing tests: BridgeTests, PremadesTests, ProjectsTransferUITests; none in this diff's files | 1246 |
| 3 | `export_settings_strings.py --check` today | exit 0, no drift | 17 strings |
| 4 | Every string id SettingsView reads, looked up in settings-strings.json then pro-strings.json | all present (14 own, 10 from s5.7) | 24 ids |
| 5 | Rule unit tests (`Tests/Core/SettingsProRowRuleTests.swift`) | 17 tests cover every 10.2 row and the four T-1103 decisions; mutants file `Core/mutants-t1103.json` | 17 |

</div>


## Pro row and Restore against SettingsProRowRule and s5.10 (F8)

- `SettingsView.swift:68-71` passes all five facts from the hook: `gates.sellsPro`, `entitlementRead`,
  `store.isEntitled`, `purchasePending`, `restore`. ProStore is `@Observable`, so a refund on `Transaction.updates`
  redraws the detail to `e.settings.off` (10.2 row 5).
- `:76` draws the group only while the rule shows it (C3: no group, no Restore). `:131-139` Pro row, value = detail
  (10.6 "pywidget Pro, Not purchased"). `:140-154` Restore: accent title, no chevron, disabled with spinner and
  `btn.restoring` while running. `:155-161` footer from `row.footer`; `:115-117` posts it as an announcement.
- `:41-52` `RestoreResult(RestoreOutcome)` case for case; `ProStore.restore()` uses `AppStore.sync()` as 10.1 asks,
  and a cancelled sign-in maps to no footer (decision 3).
- `:164-170` `runRestore` sets `entitlementRead = true` after the restore, so a restore that ran before the first
  read cannot leave an empty detail.
- `ProPaywallView.swift:266-270` reports `pending` only on a `.buying -> X` transition, so a restore or load on the
  Pro screen never sets it, as its doc comment says.

## No row for a feature or URL that does not exist (App Review 2.1, 2.5.19, 5.1.1(i))

- Tour (`:85`): drawn only when a `showTour` closure is passed; no caller passes one (`PyWidgetApp.swift:1070`).
- Editor theme (`:77`): needs `sellsPro`, `themes.on` and a `themePicker`; none passed.
- Support: not drawn; no support URL exists (T-0485).
- Privacy Policy and Terms (`:92-100`, `:122-124`): only items `LegalLinks.items()` returns, each https with a host.
  Today Terms (Apple's Standard EULA, Investors #98 4A) is drawn and Privacy is not (`LegalLinks.privacyPolicy` nil).
  The Release-configuration Legal links check (`project.yml:222-227`) already fails an archive with no privacy URL,
  so a store build cannot reach a reviewer without the in-app privacy link; the row appears by itself once the URL
  is set, and the UI test follows the constant (`SettingsUITests.swift:97-98`).
- Acknowledgements and the version foot exist. No dead row found.

## Do the tests fail when a row or the restore result is wrong?

Yes for: Restore missing or mislabelled (`SettingsUITests.swift:66-68`); restored footer and Active detail
(`:71-73`); the purchased Pro screen's words (`:75-79`); nothing-to-restore footer and an unchanged detail
(`:87-91`); Terms and Privacy drawn exactly while their URL is set (`:97-98`); Acknowledgements and a filled
version line (`:99-108`). The rule itself is pinned by its 17 unit tests and mutants.

No for the two paths below.

## Findings

### Medium

M1. The Ask to Buy path added in this diff has no test at any level. `ProPaywallView.swift:266-270`
(`onPurchaseSettled`) and `SettingsView.swift:133` (`purchasePending = $0`) are new code going to TestFlight; if the
transition guard or the wiring is wrong, Settings reads "Not purchased" while a purchase waits for a parent's
approval, and nothing fails. Fix: a SettingsUITests case with `session.askToBuyEnabled = true`: Settings, Pro row,
buy, back; expect the Pro row's value `set.pro.pending`; then `session.approveAskToBuyTransaction` and expect
`e.settings.on`.

M2. A failed restore is never driven through the screen. `set.restore.failed` (10.2 Offline row) is checked only
in the rule's unit tests; a wrong mapping in `SettingsView.swift:41-52` or a failure that leaves the row disabled
would pass. Fix: a SettingsUITests case that makes `AppStore.sync()` fail in the SKTestSession (StoreKitTest's
simulated-error API for App Store sync, where the Simulator's iOS has it) and expects footer `set.restore.failed`,
Restore enabled again, detail unchanged. If the API is not available on the test Simulator, a unit test of
`RestoreResult.init(_:)` for all five outcomes is the fallback and should say so.

### Low

L1. `SettingsView.swift:118`: `.onDisappear` also fires when the Pro row pushes the Pro screen, so the restore
footer is gone on the way back. 10.2 says it clears "when Settings is left"; pushing a child is arguably not
leaving. Either keep it and write the reading into the 10.2 hook line, or clear only when Settings is popped.

L2. `SettingsView.swift:65`: `purchasePending` is `@State` on a view the More menu recreates on each push
(`PyWidgetApp.swift:1070`), so the pending detail lasts one visit; the next visit reads "Not purchased" until the
approval arrives as a grant. "Not purchased" is true, so not misleading; record the one-visit scope in the 10.2
hook, or keep the flag for the session.

L3. `SettingsView.swift:191`: the context-menu title "Copy" is the one string not read from a string table (the
file header says all copy comes from them). Use a table id.

L4. Spec 10.1 still says Support and Privacy Policy show "always" and 10.2 says a Release unit test fails on an empty
URL; the build hides the rows and gates only the privacy URL (`check_legal_links.py`). The code is the right
behaviour for App Review; the spec should say "while its URL is set" so the next reader does not "fix" it.

L5. 10.6: while restoring, the spec puts `btn.restoring` in the value; `SettingsView.swift:145` swaps the label
instead, so VoiceOver reads "Restoring..." with no "Restore purchase". Set the label to `link.restore` and the
value to `btn.restoring` while running.

L6. `SettingsUITests.swift:95-99` checks the rows without scrolling; on a short screen with large text an
off-screen List cell is absent and the test fails falsely (it cannot pass falsely). Note only; scroll to each row
if it ever flakes.

L7. `export_settings_strings.py --check` is run by nothing; drift between SET_STR and the app's JSON is caught only
when someone runs it. Add it to the existing Python test run (pywidget/tests).

### Notes, no action

- `EditorToolingTests.swift` hunk: awaits hoisted out of `XCTUnwrap`'s autoclosure; behaviour unchanged.
- The More menu now has both Settings and the older Pro and Acknowledgements entries, by design until the tab bar
  lands (T-0657 commit message).
- The theme row's detail is always `set.theme.default`; harmless while the row is not drawn, but T-0272 must pass the
  chosen theme.

## Board lines added for Idris

- T-2498 (P2): M1 + M2, the two missing SettingsUITests cases.
- T-2499 (P3): L1, L2, L5, the restore footer, pending scope and VoiceOver label.
- T-2500 (P3): L3, L4, L7, the Copy string, the spec words, the strings drift check.
- L6 is a note only; no line.
{% endraw %}

</div>
