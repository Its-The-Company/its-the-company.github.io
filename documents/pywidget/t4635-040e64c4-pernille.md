---
layout: "default"
title: "Review of 040e64c4: T-4635, an entitled Settings drops the stale restore failure lines"
section: "documents"
description: "M1 of my T-2499 review is answered for every way Pro arrives that the Pro row shows as Active. The footer is computed from store.isEntitled on every render (SettingsView.swift:70-71, SettingsProRowRule.swift:88\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4635-040e64c4-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4635-040e64c4-pernille.md</code></span></div><h1>Review of 040e64c4: T-4635, an entitled Settings drops the stale restore failure lines</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4947, Commandment 13). Author: Idris. Reviewed: d057115665 and 040e64c499 as one change
(App/Settings/SettingsView.swift, App/SettingsProRowRule.swift, Tests/Core/SettingsProRowRuleTests.swift,
UITests/SettingsUITests.swift, docs/how-it-works/purchases.md, docs/design/ide/draw_settings.py, qa-settings.json,
spec.md and the three Settings PNGs), against the T-4635 board line and my review of T-2499
(docs/reviews, commit c7353bcaa3: M1, L1, L2). The author's memory files and board notes were not read. Also read,
for where the facts come from: ProStore.swift (`isEntitled`, `restore()`, `refreshEntitlement`, `setEntitled`, the
tester switch), Shared/ProEntitlement.swift (`EntitlementEvidence.grants`). Line numbers are at 040e64c4; since then
only 5d38a8a84e (T-4866) touched SettingsUITests.swift, outside the lines cited. Paths are under pywidget/ios/ unless
they start with docs/. Date: 2026-11-20.

## Tests run

- MacBook runner, `XC_TASK=T-4947 tools/xc.sh ... test -only-testing:PyWidgetTests/SettingsProRowRuleTests` at
  56dc41fd (which holds 040e64c4): job J-20261120-0518-xc-test. Result: passed, exit 0, 598 s;
  18 executed, 0 skipped, 0 failures: the class has 18 tests, so `testEntitledDropsTheNothingFoundAndFailedFooters` ran.
- The UI tests: a `-only-testing` filter on the UI target makes the runner queue the full suite (about 65 min), past
  this review's time. Two daily full-suite runs already hold this change, and I read their results instead:
  J-20261119-0757-xc-test at dba03420 (2,266 executed, 1 failure) and J-20261120-0227-xc-test at ec63ed6c (2,301
  executed, 2 failures). Every failure in both is WidgetKitCheckTests (`testETokenOnTheHomeScreen`,
  `testTPremadeDrawsPaperInLightAndStudioGreyInDark`), not this change. No SettingsUITests test is in either failing
  list. The skipped lists are cut at 17 of 40 names, so I cannot show from the result alone that the two new tests
  ran rather than skipped; neither has a skip path (the file's three `XCTSkip`s are in the screenshot and live-title
  tests), so I read them as run and green, twice.
- Swift mutants: none run. The runner runs only commits already on main, and XC_LOCAL is not allowed here, so a
  planted mutant has nowhere to run. Traced by reading instead:
  (a) rule 6 undone (`footer(facts.restore)` as on the parent): the Core test's `XCTAssertNil` for an entitled
  `.nothingToRestore` fails, and the UI purchase test's "footer gone" wait times out (the footer is `.failed`
  whatever `entitled` says). KILLED by both.
  (b) only `.nothingToRestore` gated, `.failed`/`.unavailable` left as before: the Core loop covers both, and the UI
  test uses a network failure. KILLED.
  (c) `.restored` gated too: the last Core assertion (`.restored` stays when entitled). KILLED.
  (d) the gate inverted (`entitled ? .failed : nil`): the `XCTAssertNotNil` half for the unentitled case. KILLED.
  (e) SettingsView passing `purchasePending` or a constant `false` for `entitled`: the Core test cannot see this
  (the rule is pure); the UI purchase test does. KILLED by the UI test only.
- No phone run; nothing here is measured on a device.

## Verdict: PASS with findings

M1 of my T-2499 review is answered for every way Pro arrives that the Pro row shows as Active. The footer is
computed from `store.isEntitled` on every render (`SettingsView.swift:70-71`, `SettingsProRowRule.swift:88, 98-104`),
and `isEntitled` is set by every road: a purchase on the Pro screen (`settlePurchase`, including the grant-ahead on
the transaction in hand), a restore there or here (`restore()` then `refreshEntitlement`), a Family Sharing copy
(`EntitlementEvidence.grants` takes any verified, unrevoked transaction for the product, family-shared ones included,
arriving through `Transaction.updates`), and Ask to Buy approved later. Once it is true, `ln.none` and
`set.restore.failed` go and `ln.restored` stays, which is true. A refund sets it false and the old line comes back;
that line is true again, so that is acceptable.

The tester switch does not clear the lines, and that is right: it is kept apart from `isEntitled` on purpose
(`ProStore.swift:68-70`), the Pro row reads `isEntitled` and so still says "Not purchased", and "No Pro purchase
found" next to "Not purchased" claims nothing false. No purchase state on this screen is misleading, and no payment
path is touched.

When Pro is not owned, a real failure still shows: `entitled ? nil : ...` returns the failure for every unentitled
case, and the Core test's `XCTAssertNotNil` half holds that.

The "and only then" half is not quite met (M1). The Lows of the T-4635 line are done: L1 (the running state is now
tested by its value, with the label held) and L2 (the comments no longer claim a reset on leaving Settings).

## Findings

### M1 (Medium): a restore that fails while Pro is already owned now ends in silence

- Where: `App/SettingsProRowRule.swift:102, 104`; `App/Settings/SettingsView.swift:135-137`.
- The rule drops the failure lines whenever `entitled` is true, not when the entitlement arrived after the
  restore result. So a person who already has Pro (bought, family-shared, restored earlier) and taps Restore
  offline, or when the App Store errors, sees the spinner and then nothing: no footer, and because `onChange(of:
  row.footer)` posts only a non-nil footer, VoiceOver announces nothing either. Before this change they got
  "couldn't restore". The rule file's own rule 4 says a tap that ends in silence is worse than a failure line.
- The docs say the narrower thing: spec.md 10.2 "A purchase made there clears the ... lines", purchases.md "If the
  person buys Pro on the Pro screen meanwhile, the ... lines go". The code does more than that.
- Why it matters: Restore is the App Review-required control (Guideline 3.1.1), and an owned-Pro person tapping it
  on a new phone with bad signal is the case where an answer matters most. No false purchase claim results, which
  is why this is Medium and not High.
- Fix: clear only results that predate the grant. Either set `restore = .idle` in an `onChange(of:
  store.isEntitled)` going false to true when `restore` is `.finished(.nothingToRestore \| .failed \| .unavailable)`
  (and drop rule 6), or carry the entitlement at the moment of the result in `.finished` and gate on "not entitled
  then, entitled now". Core test: entitled before the restore, result `.failed`, footer `.failed`; the existing UI
  purchase test stays as the other half.

### L1 (Low): the running-state test reads a 6 s clock with a 5 s wait

- Where: `UITests/SettingsUITests.swift:206, 212-214`.
- The app holds the running state for 6 s from the moment `runRestore` starts; the test waits up to 5 s for the
  value and then checks the label and `isEnabled` with no wait. On a loaded runner (both daily runs above took over an
  hour) a tap that lands late plus a slow wait can put those two reads past the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, and the test then fails on
  `isEnabled` with nothing wrong in the app. It passed twice; the margin is about a second.
- Fix: hold far longer than any wait (for example 30 s) and keep the footer wait's timeout above it, or end the
  hold on a signal the test controls.

### L2 (Low): the regenerated Acknowledgements frame lists four runtime parts twice, under Editor

- Where: `docs/design/ide/A-settings-phone.png` frame 7 (and `qa-settings.json`, which now has two OpenSSL rows);
  `docs/design/ide/draw_settings.py:101-121`.
- `ack_rows` takes the Python group from log/software.md and every log/assets.md row whose text says
  "acknowledgement" into the Editor group. The assets rows for OpenSSL 3.5.9, XZ Utils liblzma 5.6.4 and Zstandard
  1.5.7 (and the CPython XCframework) now match, so the sheet shows "OpenSSL 3.5.9", "xz 5.6.4", "zstd 1.5.7" under
  Python and again, by their longer names, under Editor. This regeneration picked it up; the code did not cause it,
  and the app's own list is built elsewhere. A sheet that a designer or a reviewer reads as the Acknowledgements
  spec should not show a licence twice under the wrong heading.
- Fix: skip assets rows already covered by the software row's static libraries, or give them their own group.

### L3 (Low): a test hook reads the environment in every build

- Where: `App/Settings/SettingsView.swift:190-193` (`PW_RESTORE_HOLD_MS`).
- It cannot be set by a customer and does nothing when unset, so it is harmless in a shipped build, but it is test
  scaffolding in the Release binary. Wrapping it in `#if DEBUG` (UI tests run Debug) keeps it out.

## Checked and fine

- The two UI tests are red on the parent by reading: on de343f7e24's rule the footer stays `.failed` after the
  purchase, so the `exists == false` wait times out (the T-4635 Done-when).
- `testRestoreFooterClearsAfterAPurchaseFromSettings` asserts the footer present before the purchase, so its
  "gone" is not vacuous; the simulated error is set for `.appStoreSync` only, so the purchase itself goes through;
  `disableDialogs` and `clearTransactions` in setUp and tearDown keep the purchase from leaking into other tests.
- `testRestoreRunningStateShowsTheValueAndKeepsTheLabel` checks the value is not "Restoring" before the tap and
  after the result, so a value stuck on would fail it.
- spec.md 10.2, purchases.md and frame 4's caption say a purchase clears the lines and "restored" stays, which the
  code does (M1 is about what else it clears). The comments in both Swift files now match the code: nothing resets
  `restore`; it ends with the view.
- The rule stays pure and in Core; `entitled` was already a fact, so no new input was added.

## Board lines

- M1: "Keep Restore's failure line when Pro was owned" (Idris, from T-4947).
- L1-L3: "Restore test hold and sheet duplicates" (Idris, from T-4947).
{% endraw %}

</div>
