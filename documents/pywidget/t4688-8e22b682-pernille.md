---
layout: "default"
title: "Review of T-4688 at 8e22b682: Developer mode&#x27;s Reset to first launch and the App Store product check"
section: "documents"
description: "No High finding. Nothing in this commit lets a customer unlock Pro without paying, and Reset to first launch cannot touch a purchase."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4688-8e22b682-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4688-8e22b682-pernille.md</code></span></div><h1>Review of T-4688 at 8e22b682: Developer mode's Reset to first launch and the App Store product check</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4864, Commandments 6, 13 and 14). Author: Idris. Reviewed: 8e22b68221 (ios/App/Settings/DeveloperMode.swift,
settings-strings.json, ios/scripts/check_tester_pro.py, ios/project.yml's two "Tester Pro product check" phases,
ios/Tests/DeveloperModeTests.swift, ios/UITests/SettingsUITests.swift testDeveloperModeToolsInADebugBuild,
tests/widgets/test_tester_pro_flag.py, docs/how-it-works/purchases.md, ops/site-checks/t4688/). Also read, for what the
reset reaches: App/Device/KeychainCall.swift (the only Keychain writer in App, Shared and Widget), Shared/TesterPro.swift,
Shared/RefreshWidgetsIntent.swift, App/Settings/SettingsView.swift, ios/scripts/check_lane_gate.py (the condition reader the
check reuses), and the run logs ops/runs/xcodebuild-20261118-014102.log, -014804.log, -020624.log. Paths are under
pywidget/ unless they start with tools/ or ops/. None of the reviewed code changed between 8e22b68221 and HEAD 04830681b4.
Date: 2026-11-18.

Prior review: mine of the first part, docs/reviews/t4688-f531d51b-pernille.md (its M1 asked for this reset and this check).

What I ran:
- `python3 -m unittest pywidget/tests/widgets/test_tester_pro_flag.py` at HEAD: 30 tests, OK.
- Six mutants of check_tester_pro.py and DeveloperMode.swift on a `git archive` copy of 8e22b68221 in /tmp (the repository's
  files untouched; the copy lacks Probe/fonts, so test_debug_conditions_install_the_font fails there in every run, mutant or
  not, and is left out below):
  1. product_verdict always passes: 3 ProductTests fail. Caught.
  2. needles_in keeps no overlap between 1 MiB pieces: the boundary case fails. Caught.
  3. the .debug.dylib beside a stub is not read: its test fails. Caught.
  4. "settings.dev.reset" dropped from NEEDLES: test_binary_mode_lists_and_exits fails. Caught, by chance (L1).
  5. an `#else` branch in DeveloperMode.swift that draws a `DeveloperModeSection` with Unlock Pro on: all pass. Missed (L2).
  6. "settings.dev.refresh" and "tester.pro.unlock" dropped from NEEDLES: all pass. Missed (L1).
- Read the Xcode logs the commit leans on (no new Xcode build of mine): DeveloperModeTests 4 of 4 passed in -014102;
  testDeveloperModeToolsInADebugBuild passed (44.8 s) in -014804, beside testProRowAtXXXLargeWithPendingForReview, which
  failed there on XCUITest's 128-character identifier limit (M1).

## Verdict: PASS with findings

No High finding. Nothing in this commit lets a customer unlock Pro without paying, and Reset to first launch cannot
touch a purchase.

Reset to first launch, checked against the brief:
- Erases only the app's own places. `DeveloperReset.app` is Documents, Application Support, Caches and tmp of this app's
  home (testTheAppsPlacesAreItsOwnContainers holds all four under NSHomeDirectory()), the App Group folder
  `group.app.pywidget` except its Library, the App Group's settings, the app's own settings domain, and the Keychain
  service `pywidget.secrets`. The delete query uses the same class, service and data-protection keychain that KeychainCall
  writes with, and names no access group, so it reaches only the app's own groups. KeychainCall is the only Keychain
  writer in App, Shared and Widget. testResetErasesOnlyTheAppsOwnPlaces proves that a second service's item and a file
  beside the given folders survive.
- Never calls StoreKit. DeveloperMode.swift imports Security and SwiftUI, not StoreKit; the reset's only other call is
  `RefreshWidgetsIntent.reload`, which is `WidgetCenter.shared.reloadAllTimelines()`. No Transaction, AppStore.sync or
  finish anywhere on the path. Pro after the reset is what StoreKit says on the next launch.
- Asks first: a `confirmationDialog` with a destructive "Erase and Close"; the UI test fails if the dialog's button does
  not appear before it taps.
- Exits afterwards: `exit(0)` 0.5 s after the erase; the UI test waits for `.notRunning`, relaunches, and finds Unlock Pro
  off.
- It exists only in flagged builds: the whole of DeveloperMode.swift is inside `#if PYWIDGET_TESTER_PRO`, and so is
  SettingsView's call (both held by test_developer_mode_is_inside_the_condition).

The App Store product check, checked against the brief:
- It runs after the link in both the app and the extension (postBuildScripts, executable as input, no dependency
  analysis). It fails an archive or a Release build that is not upload.sh --internal's when the executable or its
  .debug.dylib holds any needle, and it fails closed when it finds no executable. All five needles are over 15 UTF-8
  bytes, so Swift stores them as bytes, and none is in settings-strings.json (a test holds that). Mutants 1 to 3 prove the
  tests bite.
- The evidence (ops/site-checks/t4688/release-check.txt) is honest about its limits: the Release device build read clean
  with --binary in both executables, the Debug .debug.dylib holds all five needles, and the in-build phase itself was
  exempted on that run by PW_INTERNAL_TESTFLIGHT=YES (see L3).
- The fallback `TesterPro` in a build without the condition is closed on every call, so even a missed needle could not
  open Pro: the needles guard against a build-setting slip, not against a second way to Pro.

## Findings

### M1. testProRowAtXXXLargeWithPendingForReview has no green run since it went red on the footer's length

ops/runs/xcodebuild-20261118-014804.log: the test failed with "string identifier ... exceeds maximum length of 128
characters" on the old `set.tester.foot` (166 characters). The commit shortens it to 125 characters, which is under the
limit, but no run after the change is on record, and Idris's own T-4688 note says so ("Not run:
testProRowAtXXXLargeWithPendingForReview after the footer fix"). A test last seen red does not go to TestFlight on a
character count. I tried to queue the two Settings UI tests on the runner from this review (XC_TASK=T-4864); xc.sh
declined because HEAD 04830681 was not yet on origin/main (exit 2), and a suite may not run locally. Line below: run it
once on the runner and record the result. Medium, not High: the failing query is in the test, not in the app, and the
footer shows only in Debug and internal builds.

Also on the footer: the shortened words drop "in Xcode and internal TestFlight builds". That is copy, and Maren owns it.
A note for her, no line.

### L1. Nothing pins the needle list

test_each_needle_fails_a_release_build_and_an_archive loops over `check.NEEDLES` itself, so a needle removed from the
tuple simply is not tested. Mutant 6 removed two (the extension then rests on the mark alone) and every test passed;
mutant 4 was caught only because test_binary_mode_lists_and_exits happens to write "settings.dev.reset". Fix: a test that
NEEDLES equals the expected five, and that each needle other than the mark is found inside the `#if PYWIDGET_TESTER_PRO`
block of DeveloperMode.swift or TesterPro.swift, so a renamed identifier fails the host suite instead of quietly leaving
the check with fewer needles.

### L2. The host test allows an `#else` in DeveloperMode.swift

test_developer_mode_is_inside_the_condition checks the first line, the last `#endif` and that there is one `#endif`; an
`#else` branch before it passes (mutant 5 added a `DeveloperModeSection` whose Unlock Pro toggle is always on). In a
Release build the product check would still fail that one, because the type name is a needle, so this is not a hole a
customer can reach. But the host test is the cheap early catch and should also hold "no `#else`, no `#elseif`".

### L3. The product phase has not yet run its read inside a real archive or Release build

The only Release build on record (ops/runs/xcodebuild-20261118-020624.log) carried PW_INTERNAL_TESTFLIGHT=YES, because
T-0485's legal-links check refuses a Release build while LegalLinks has no privacy-policy URL. That setting exempts the
phase, so its read was done by hand (`--binary`, and `--product` with CONFIGURATION=Release set in the shell). The phase
fails closed on a missing executable, so the risk is a false red on the first App Store archive, not a false pass. When
that archive is built, its log should show `PhaseScriptExecution Tester\ Pro\ product\ check` for both targets. This is
on the L1/L2 line as a note; no separate line.

### Notes (no work)

- The group's settings are cleared by removing every key in `dictionaryRepresentation()`, which also lists the global
  and registration domains' keys. Removing those from the suite is harmless (it touches only the suite's own domain);
  `removePersistentDomain(forName: suite)` would say the same thing exactly.
- `removePersistentDomain(forName: bundleIdentifier)` also drops a per-app language chosen in iOS Settings. A reinstall
  does the same, so it fits "first launch".
- Not reached, by design or because they cannot be: the widget extension's own container (only a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-gate build writes
  there, CrashMarker), Library/Saved Application State (iPad scene restoration), and the App Group's Library/Caches.
  purchases.md's "everything the app keeps on the device" is a little wider than that; it does not mislead a tester.
- The 0.5 s between the erase and `exit(0)` leaves a window in which live code (an open editor scene on iPad, a defaults
  write) could put something back. Not seen; the UI test checks the switch only. If a tester reports leftovers, look here
  first.
- purchases.md's new section matches the code, and its anchor (DeveloperReset) is right.
{% endraw %}

</div>
