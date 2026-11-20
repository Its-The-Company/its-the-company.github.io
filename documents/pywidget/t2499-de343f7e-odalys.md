---
layout: "default"
title: "Review of de343f7e: T-2499, the Settings restore footer survives the Pro push, pending scope in spec, Restore keeps its VoiceOver label"
section: "documents"
description: "Purchase state (Commandment 6): the footer that now survives the Pro push could, on this commit alone, sit stale under a purchase made on the Pro screen; that was Pernille&#x27;s M1, fixed by T-4635 and reviewed today, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2499-de343f7e-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t2499-de343f7e-odalys.md</code></span></div><h1>Review of de343f7e: T-2499, the Settings restore footer survives the Pro push, pending scope in spec, Restore keeps its VoiceOver label</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-4077, Commandment 13). Author: Idris. Reviewed: de343f7e24 as a whole (App/Settings/SettingsView.swift
+5/-1, UITests/SettingsUITests.swift +16, docs/design/ide/spec.md 10.2), judged as it stands at today's main c82e28961e.
Pernille's commit c7353bcaa3 records a PASS of this change on 11-16 (her M1 became T-4635), but no review file was
written; this is that file, written independently. I read her T-4635 review (docs/reviews/t4635-040e64c4-pernille.md)
so as not to repeat it. The author's memory files and board notes were not read. Also read, for what the change sits
in: SettingsProRowRule.swift (the `detail` and `footer` rules), App/Store/ProPaywallView.swift (its navigation bar
when pushed), and PyWidgetApp.swift:1162 (how the More menu pushes Settings). Since de343f7e, SettingsView.swift was
touched by T-4635 (d057115665, the entitled gate on the failure lines; `PW_RESTORE_HOLD_MS`), T-4688 (Developer mode)
and T-2500 (string table); none of them changed the three lines this commit added. Line numbers are at c82e28961e.
Paths are under pywidget/ios/ unless they start with docs/. Date: 2026-11-20.

## Tests run

- None run by me. The runner runs a UI-target filter only as the 65-minute full suite, so I read the results that
  already hold this change instead:
  - J-20261119-0757-xc-test at dba03420 (result committed 26f1dc3db0): 2,266 executed, 40 skipped, 1 failure,
    `complete: true`. The failure is WidgetKitCheckTests `testETokenOnTheHomeScreen`.
  - J-20261120-0227-xc-test, the daily full suite with the UI target, at ec63ed6c (result 742f3dc381): 2,301
    executed, 40 skipped, 2 failures, `complete: true`. Both failures are WidgetKitCheckTests
    (`testETokenOnTheHomeScreen`, `testTPremadeDrawsPaperInLightAndStudioGreyInDark`), not this change.
  - In both, no SettingsUITests test fails. The result files list only 16 of the 40 skipped names (alphabetical,
    cut at LauncherWindowsUITests), and the full logs stay on the runner, so the result alone cannot show that
    `testRestoreFooterSurvivesOpeningTheProScreen` ran rather than skipped. It has no skip path (the file's
    `XCTSkip`s are in the screenshot, live-title and text-size tests), so I read it as run and green in both.
- Direct evidence that it runs and passes: ops/runs/xcodebuild-20261112-155640.log (a local run of SettingsUITests
  among four UI classes, 11-12, after this commit): `testRestoreFooterSurvivesOpeningTheProScreen` started and
  passed in 18.2 s; SettingsUITests executed 10 with 4 skipped, 0 failures. The four skipped were the
  screenshot, live-title, text-size and xxxLarge tests, as expected.
- Swift mutants: none run (a planted mutant has nowhere to run: the runner takes only commits on main). Traced by
  reading:
  (a) the `.onDisappear { if case .finished = restore { restore = .idle } }` put back: pushing the Pro screen
  fires it on the covered Settings view, the footer is nil on return, and the wait at SettingsUITests.swift:198
  ("the footer was lost on the way back") times out. KILLED.
  (b) `.accessibilityLabel(t["link.restore"])` removed: T-2499's own test cannot see it (its label check at :199
  runs after the restore ended, when the visible title is "Restore purchase" anyway). Since T-4635,
  `testRestoreRunningStateShowsTheValueAndKeepsTheLabel` (:204-216) checks the label while the value reads
  "Restoring", when the visible title would be "Restoring". KILLED at today's main, by that test only.
  (c) `.accessibilityValue(...)` removed: the same T-4635 test's value wait (:212) times out. KILLED at main.
- No phone run; nothing here is measured on a device.

## Verdict: PASS with findings

All four questions hold at today's main.

- The footer stays across a push and pop of the Pro screen. Settings keeps `restore` in `@State`
  (`SettingsView.swift:67`); a `NavigationLink` push keeps the view in the stack, so its state lives on, and with
  the `onDisappear` gone nothing clears it (`:138-139` says why). It ends with the visit because the More menu
  builds a new `SettingsView()` on each push (`PyWidgetApp.swift:1162`, `navigationDestination(isPresented:)`).
  The `onChange(of: row.footer)` announcement does not repeat on the way back, because the footer did not change.
- Restore's VoiceOver label is "Restore purchase" in every state. The label is fixed (`:173`); the running state
  is carried by the value (`:174`, "Restoring" while running, empty otherwise) and by `.disabled` (VoiceOver says
  "dimmed"). The row only exists while `showsRestore` is true, so there is no state where it shows another label.
- The spec says what the code does. 10.2's `purchasePending` "lasts one visit ... the next visit reads
  `e.settings.off` until the approval arrives as a grant" matches `SettingsProRowRule.detail` (entitled first, then
  pending, else `.notPurchased`) and the fresh view per push. "Set back to `.idle` when Settings is popped" is
  loose wording (nothing sets it; the state is discarded and the next visit starts at `.idle`), but the sentence
  goes on to say exactly that, and what a person sees is the same. Not a finding.
- The UI test fails when the footer change is undone (mutant a) and is free of timing races in the direction that
  matters: a slow push or pop makes it fail, never pass falsely. It is weaker than its neighbours in two small
  ways (L1).

Purchase state (Commandment 6): the footer that now survives the Pro push could, on this commit alone, sit stale
under a purchase made on the Pro screen; that was Pernille's M1, fixed by T-4635 and reviewed today, and her new
M1 there (an owned-Pro restore failure ends in silence) is on the board as T-5296. I add nothing to either.

## Findings

### L1 (Low): the new test neither waits for the Pro screen nor checks that the footer ends with the visit

- Where: `UITests/SettingsUITests.swift:187-200`.
- After `app.buttons["settings.pro"].tap()` the test taps the first navigation-bar button at once (`:197`). The
  file's other two Pro-push tests wait for the offer (`pro.buy`, `:151`, `:233`) before going back and for the
  Settings title after (`:158`, `:240`). Without those waits, a push that did not happen or was still moving when
  the tap landed takes "back" from Settings itself, and the run fails as "the footer was lost on the way back",
  which sends whoever reads it after the wrong cause. It cannot pass falsely, so this is about a clear red, not a
  wrong green.
- Its doc comment says the footer "ends when Settings is popped", and the spec says the same, but the test never
  pops Settings and opens it again. That half rests on the view being rebuilt per push; if `restore` ever moved to
  a longer-lived owner (ProStore, a scene model), the next visit would open on an old "couldn't restore" line and
  no test would notice.
- Fix: wait for `pro.buy` before going back and for `set.title` after; then pop Settings, reopen it from More, and
  assert `settings.pro.footer` does not exist.

## Checked and fine

- The removed `onDisappear` was the only reset of `restore`; T-4635 added none (its own review says the same).
- A restore still running when the Pro row is tapped finishes into the same `@State` and shows its footer on the
  way back; one running when Settings is popped writes to discarded state, which is harmless.
- The test's simulated error is set for `.appStoreSync` only, and setUp and tearDown clear transactions, so the
  person is not entitled and T-4635's entitled gate does not hide the failure footer this test waits for.
- ProPaywallView pushed (not as a sheet) has only the system back button in its bar (`ProPaywallView.swift:260-262`:
  the close button and hidden bar are sheet-only), so `buttons.element(boundBy: 0)` is the back button once the
  push has finished.
- The comment at `SettingsView.swift:9-12` and the 10.2 hook agree on the three facts the screen keeps.

## Board lines

- L1: "Make the restore footer test wait and reopen" (Idris, from T-4077).
{% endraw %}

</div>
