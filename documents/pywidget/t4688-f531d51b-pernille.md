---
layout: "default"
title: "Review of T-4688 at f531d51b: Developer mode in Settings (the tester Pro switch opens on an unread AppTransaction)"
section: "documents"
description: "The key question: is the compile condition alone enough to keep Pro out of App Review and App Store copies? It is not alone, and it does not need to be. Four things hold a flagged binary inside the company&#x27;s own\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4688-f531d51b-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4688-f531d51b-pernille.md</code></span></div><h1>Review of T-4688 at f531d51b: Developer mode in Settings (the tester Pro switch opens on an unread AppTransaction)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4852, Commandments 13 and 6). Author: Idris. Reviewed: f531d51b2c (ios/App/Settings/DeveloperMode.swift,
SettingsView.swift, settings-strings.json, ios/Shared/TesterPro.swift, ios/App/Store/ProStore.swift,
ios/Tests/TesterProTests.swift, ios/Tests/DeveloperModeTests.swift, docs/how-it-works/purchases.md and screens.md,
docs/design/ide/draw_settings.py). Also read, for the gate the change leans on: ios/project.yml (the four Debug-only
settings, the Tester Pro check phases), ios/scripts/check_tester_pro.py, tools/upload.sh, tools/testflight_ledger.py,
ops/testflight-internal.tsv, the committed ExportOptions.plist files in ops/runs/, Shared/ProEntitlement.swift and
Widget/PyWidget.swift (the extension's path), and Apple's saved page on internal testers
(research/inbound/apple/developer.apple.com/help_app-store-connect_test-a-beta-version_add-internal-testers-1d9a64bd.html,
https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers, fetched 2026-11-05 1:37 PM ET).
Paths are under pywidget/ unless they start with tools/, ops/ or tests/. None of the reviewed files changed between
f531d51b2c and this branch's HEAD 59d8ee6d45. Date: 2026-11-18.

Prior review: T-4093 H1 (my review of 6dc410c435), which put the switch behind the compile condition.

What I ran:
- `python3 -m unittest tests.tester_pro_flag_test`: 5 tests, OK. `python3 -m unittest test_tester_pro_flag` in
  pywidget/tests/widgets: 22 tests, OK. `bash tests/upload_test.sh`: PASS 159, FAIL 0.
- A swiftc probe on the Mac (not the Simulator, not the shared worktree): f531d51b2c's TesterPro.swift with a two-line
  main, compiled three ways. With `-DPYWIDGET_TESTER_PRO`: production=false sandbox=true xcode=true unknown=true. Without
  it (the stub every App Store build gets): all four false. A mutant with T-4093's old rule put back: unknown=false, which
  is the value `testOnlyAnAppStoreCopyClosesTheSwitch` now asserts true, so that test goes red on the old rule.
- `git show <commit>:tools/upload.sh` at the source commits of builds 5 (0e136fb167) and 7 (bb4b184e34): both hold the
  refusal "ExportOptions.plist lacks testFlightInternalTestingOnly=true for --internal". The two committed tester-build
  export plists (ops/runs/export-20261113-115546 and -203457, build 6) carry `testFlightInternalTestingOnly` true.
- Not run: any Xcode build or test. The unit target's 2062/0 is Idris's result (log/events.jsonl, 2026-11-18 1:26 AM), not
  mine. The Settings UI tests, the Simulator shot and the Release build check are still open on T-4688 (M1).

## Verdict: PASS with findings

The key question: is the compile condition alone enough to keep Pro out of App Review and App Store copies? It is not
alone, and it does not need to be. Four things hold a flagged binary inside the company's own TestFlight group, and
T-4688 changes none of them:

1. Only Debug sets PYWIDGET_TESTER_PRO (project.yml, on the app, the extension and the two test bundles). Release never
   names it, and the Tester Pro check phase fails any Release or archive build that carries it unless
   PW_INTERNAL_TESTFLIGHT=YES (check_tester_pro.py). No other tool in tools/, pywidget/tools or .github names the flag
   (tests/tester_pro_flag_test.py), and upload.sh is the only script that archives or exports.
2. upload.sh adds the flag only on `--project --internal --upload` (and on the gate build, which is internal too). It
   refuses an archive that holds TesterProMark's text on every other path, including an `--internal` export to a folder,
   and refuses an `--internal --upload` archive that does not hold it.
3. That export writes `testFlightInternalTestingOnly` true and reads it back before any xcodebuild call. Apple's own
   page says a build uploaded as TestFlight Internal Only "can only" go to internal tester groups: "you can't submit
   them for external testing or to customers". So App Store Connect itself refuses to send a flagged build to App Review,
   an external group or the App Store. Builds 5, 6 and 7, the three tester-switch builds in the ledger, went by this path.
4. ops/testflight-internal.tsv names every such build, and testflight_ledger.py check stops a review ask that names one.

App Review was never kept out by AppTransaction. App Review runs a sandbox copy (T-4093 H1), and `.sandbox` opened the
switch before T-4688 as it does now. Changing `.unknown` from closed to open adds no exposure to review at all. The only
copy it could add exposure to is an App Store customer's copy of a flagged binary whose AppTransaction read failed or
came late. Point 3 makes such a copy impossible: the binary cannot reach customers. So the second lock got weaker (it
now fails open), and that is the right trade. A lock that hid the switch from the company's own testers with nothing on
screen cost the testers builds 6 and 7 and kept no reviewer out. TesterPro.swift's rule 1 now says this plainly.

The extension follows the same rule through `ProEntitlement.gates` → `TesterPro.active`: it reads AppTransaction only
while the switch is on, and it now opens on `.unknown` as the app does. In a stub build `TesterPro.active()` returns
false without reading anything. Both behaviours are in the extension-path test (`(.unknown, true)`, `(.production,
false)`).

Tests: unknown-opens is covered at three levels: the rule (`testOnlyAnAppStoreCopyClosesTheSwitch`), the store
(`testUnreadableEnvironmentStillShowsTheSwitchInATesterBuild`: drawn, opens the gates, no purchase, one reload) and the
extension path. Production-closes is covered at the same three (`testProductionHides...`,
`testSwitchLeftOnIsInertInProduction`, the extension loop). The probe's mutant shows the rule test catches a revert.

Non-tester builds: nothing changed behaviour. SettingsView's old `if store.showsTesterSwitch { testerGroup }` was false
in every stub build. Its replacement is inside `#if PYWIDGET_TESTER_PRO`, and so are DeveloperMode.swift and
DeveloperModeTests. ProStore's change is a comment. `loadEnvironment()` still runs in Settings and in `start()`, and in a
stub build it gets `.unknown` from the stub without reading AppTransaction, as before. The new strings are data in
settings-strings.json, not code (N2).

Guideline 3.1.1 is met: an App Store copy has no way to Pro but the purchase. Guideline 2.3.1 (hidden features) does not
apply, because the code is not in the App Store binary. Nothing here blocks the next internal TestFlight build once M1's
checks are done.

## Findings

### M1. The screen and the App Store build check are not done yet (already open on T-4688; no new line)

- Where: T-4688's open items (ops/board_notes/T-4688.md): (1) the Simulator shot, (2) the Release build check, (4) the
  SettingsUITests run.
- Developer mode is now always drawn in Debug. SettingsUITests.shoot (UITests/SettingsUITests.swift:396-410) scrolls until
  the switch and the footer are both in the window, and the group is now taller (three new rows, This copy, Refresh and
  Run logs, and a longer footer). It may still pass, but nobody has seen it run. Per Commandment 1 (never ship anything
  untested), these must close before the build goes out.
- Precision for item (2): settings-strings.json ships in every build, so "Unlock Pro" and "Developer mode" will be in
  the Release app bundle as text. The check should read the two executables (PyWidget.app/PyWidget and
  PlugIns/PyWidgetExtension.appex/PyWidgetExtension). Neither should hold TesterProMark's text, "tester.pro.unlock" or a
  `DeveloperModeSection` symbol. A grep of the whole bundle for "Unlock Pro" would fail on the JSON and prove nothing.

### L1. Words left from T-4093 now say the opposite of the code (T-4857)

- Where: `ios/App/Store/ProStore.swift:71` ("`.unknown` (closed) until loadEnvironment() returns": in a tester build
  `.unknown` is open); `tools/testflight_ledger.py:4` ("App Store Connect cannot mark a build as internal-only": it can,
  upload.sh sets `testFlightInternalTestingOnly`, and Apple's saved page says such builds cannot go to external testing or
  customers. The whole gate rests on that fact, and this docstring denies it.); `ios/UITests/SettingsUITests.swift:233,
  396-409` and `ios/UITests/WidgetKitCheckTests.swift:649` ("Testers group", "Unlock Pro (testers)", "only in a TestFlight
  or Xcode copy"); `ios/Shared/TesterPro.swift:4` (the old name); `settings-strings.json:31` "Ran {count} widgets" reads
  "Ran 1 widgets" after one run.
- Fix: correct each line to the T-4688 rule and names. Give "set.dev.refreshed" a singular form, or reword it so it
  reads right for any count ("Widgets run: {count}. ..."), and keep draw_settings.py in step.

### L2. With the switch on, an AppTransaction read that never answers costs every widget timeline 10 seconds (T-4858)

- Where: `ios/Shared/TesterPro.swift:56` (readTimeout 10 s), `:151` (only a known answer is cached; `.unknown` is asked
  again next time); `ios/Widget/PyWidget.swift:31` (`ProEntitlement.gates()` in `drawable`, after the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s 4 s run).
- This is the path T-4688 is built for: a tester phone whose read is unverified or late. Before T-4688 it ended closed.
  Now it ends open, but in the extension it still waits the full 10 s, and it waits again on every timeline, because
  `.unknown` is never kept. In a lane-on build that is up to 14 s before the widget is drawn. That cuts into WidgetKit's
  time for the extension and may look to a tester like a hung widget. Tester builds only, so it is not a release risk.
  The commit also infers Evan's cause (the read came back `.unknown`) without a reading from his phone.
- Fix: in the extension, keep `.unknown` for a short while (for example, until the next timeline after 15 minutes), or
  use a shorter bound there (2 s), with a test beside `testEnvironmentReadIsBoundedAndUnknownIsAskedAgain`. On the next
  internal build, record what "This copy" says on Evan's phone in T-4688's notes, so the cause is a reading, not an
  inference.

### Notes (no work)

- N1. The one path the gates do not close: a person runs `xcodebuild archive` by hand with both PW_INTERNAL_TESTFLIGHT=YES
  and the flag, then uploads that archive through Organizer or Transporter without "TestFlight Internal Only". The
  pre-build check trusts PW_INTERNAL_TESTFLIGHT, and upload.sh's mark scan never sees an archive it did not export. This
  was true at T-4093 and is not widened by T-4688 (App Review's sandbox copy would have opened either way). It takes two
  deliberate steps against recorded procedure, so I do not ask for a guard. If the company ever uploads from anywhere but
  upload.sh, this needs a hard check first.
- N2. The App Store bundle carries the Developer mode strings in settings-strings.json, as it carried T-4093's. With no
  code behind them, they are not a hidden feature (Guideline 2.3.1), and App Review does not see them on screen. A build
  phase could drop the `set.dev.*` and `set.tester.*` keys from Release copies, but I would not spend a task on it.
- N3. iOS has its own "Developer Mode" (Settings > Privacy & Security), which an Xcode-installed copy needs turned on. A
  tester asked to "turn on Developer mode" may open the wrong one. The name is the Investor's word (#41), and only
  internal testers see it. Maren may want "Developer mode (PyWidget)" in the instructions sent with the build, not in the
  app.
- N4. Builds 5 and 7's ExportOptions.plist files are not in ops/runs/ in either checkout, so I could not read their
  internal-only key back. The ledger rows and upload.sh's refusal at their source commits show they could not have gone
  without it. App Store Connect's "Internal" badge on those builds is the Investors' to confirm if anyone needs it.
{% endraw %}

</div>
