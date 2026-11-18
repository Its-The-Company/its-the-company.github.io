---
layout: "default"
title: "Review of T-4190 at 72bff631: what landed since 8db4535c (T-2498, T-2500)"
section: "documents"
description: "The two fixes are small and are about tests and spec text matching what they claim."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4190-72bff631-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4190-72bff631-odalys.md</code></span></div><h1>Review of T-4190 at 72bff631: what landed since 8db4535c (T-2498, T-2500)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-4719, Commandment 13). Author of both steps: Idris. Reviewed: what landed for T-4190 from
8db4535c84 (my last read, pywidget/docs/reviews/t4190-8db4535c-odalys.md) up to 72bff631e5. 8db4535c is an
ancestor of 72bff631. Of the 273 commits between them, two belong to a step of T-4190 (by task ID, by "ws: T-4190",
and by the paths under App/Store, App/Settings, the Settings UI tests and ProStoreTests):

- 5ce9c22258 T-2498: red-first proof for the Ask to Buy and failed-restore Settings cases. Adds
  ios/Tests/mutants-t2498.json and ios/Tests/mutants-t2498-results.txt (8 lines). The two test cases it proves were
  already on main at a4f5d45cdd, before 8db4535c, and no review of them was on record, so I read them too.
- f85267f97e T-2500: the version line's Copy word from the string table (L3), spec s5.10 rows for the link rows
  (L4), and a strings drift test (L7). 5 files, 49 lines in, 7 out.

Read at 72bff631 with `git show`, not the working tree. Paths below are under pywidget/. ProStoreTests.swift and
App/Store/ are the same at 8db4535c and 72bff631. Date: 2026-11-17.

Tests:
- Ran `python3 -I -m unittest discover -s pywidget/tests -t pywidget/tests -p test_settings_strings.py` here: 2/2
  green. The four files it reads are the same here as at 72bff631.
- Ran the L3 check's regex (tests/test_settings_strings.py:36) on scratch copies of SettingsView.swift: it finds
  `Button("Copy"` and `Button("Widgets"`, and finds nothing for `Text("Widgets")` or `Button(String("Widgets"))`.
  That is finding L1.
- No Xcode run. The cited logs exist in <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2's ops/runs and agree with the commit messages:
  xcodebuild-20261116-212447.log runs 4 SettingsUITests, 4/0, both new cases included;
  xcodebuild-20261117-010637.log runs 20 UI tests, 0 failures, 6 skipped, with all 10 SettingsUITests cases listed.
  xcodebuild-20261116-231835.log and xcodebuild-20261117-010507.log are there too; I did not read them.

## Verdict: PASS with fixes

Nothing here holds TestFlight. Both steps do what their board lines asked, and the records are true where I could
check them:
- T-2498's three mutants are the three wirings the board line names. Each `find` string occurs exactly once at
  72bff631 (App/Settings/SettingsView.swift:151, App/Store/ProPaywallView.swift:270,
  App/Settings/SettingsView.swift:49), which tools/xc_mutants.py requires (:53). Every replacement compiles by type.
  "(2 failure lines)" is xc_mutants' count of `error: -[` and `' failed (` lines (:67), and a failed build reads
  NOBUILD, not KILLED (:13, :75). So 3/3 KILLED means each case failed on its assertion.
- The failed-restore case uses `SKTestSession.setSimulatedError(..., forAPI: .appStoreSync)`
  (UITests/SettingsUITests.swift:170), so the RestoreResult fallback the line allowed was not needed, as the commit
  says. In the 20-test run, testRestoreInSettingsReachesProIsActive passed after two cases that set that error, so
  the error does not carry into later tests (setUp resets the session at :18-21).
- The Ask to Buy case (:143-165) checks what the board line asked: the Pro row reads `set.pro.pending` after the
  buy and the back tap (:159), then `e.settings.on` after `approveAskToBuyTransaction` (:163-164). The pending flag
  it sets is reset by `resetToDefaultState()` in the next setUp (:19).
- T-2500 L3: SettingsView.swift:232 reads `t["set.copy"]`. The id is in SET_STR (docs/design/ide/draw_settings.py:65)
  and in the exported App/Settings/settings-strings.json:24, and `export_settings_strings.py --check` passes.
- T-2500 L7: tests/test_settings_strings.py runs in the host suites' "root" suite (tests/run_host.py:24, :213-218)
  and fails on drift, because the script compares the whole rendered JSON (ios/scripts/export_settings_strings.py:40-46).
- T-2500 L4: spec.md:455-457 now say each link row shows only while its URL is set. That matches the code:
  Support is not drawn (SettingsView.swift:16), and Privacy and Terms come from `LegalLinks.items()` (:140-141).
  spec.md:479 names scripts/check_legal_links.py, which runs as a pre-build phase (ios/project.yml:236-243).
- Neither board line was ticked at 72bff631. T-2500 still owes Maren's read of the spec words, as its commit says.

The two fixes are small and are about tests and spec text matching what they claim.

## Findings

### L1. The strings test claims to catch any typed visible word, but it only checks Button titles

- Where: `tests/test_settings_strings.py:6-7` (the docstring: "These tests fail ... when SettingsView types a
  visible word instead of reading it from the table (L3)") against the check at `:35-36`, which looks only for
  `Button("`. At 72bff631 `ios/App/Settings/SettingsView.swift:99` holds `Text("Widgets")`, a typed section header
  that is not in SET_STR, and the test passes.
- The failure: the next typed word in Settings (a header, a `Label`, a `Toggle`, a navigation title) passes the test
  that says it guards against exactly that. "Widgets" itself is behind `LauncherEditorGate.isOn`
  (SettingsView.swift:96). That is false in an App Store or external TestFlight build until #192
  (App/Launcher/LauncherEditor.swift:13-24), so nothing ships with it today. It ships the day the gate opens.
- Fix: put the header in SET_STR (for example `grp.widgets`), export it, and draw it with `header("grp.widgets")`
  like the other groups (SettingsView.swift:217-219). Widen the check to the SwiftUI initialisers that take a visible
  string literal (`Text("`, `Label("`, `Toggle("`, `Section("`, `.navigationTitle("`, `Button("`), or narrow the
  docstring to Button titles. The first is what L3 asked for.
- Test: the check fails on a scratch copy of SettingsView.swift holding `Text("Widgets")` and passes on the real
  file.
- Board: T-4790.

### L2. The spec says a Release archive fails without a privacy URL; the internal TestFlight archive does not

- Where: `docs/design/ide/spec.md:479` ("the Release archive fails until the privacy URL is an `https` URL with a
  host ... so no store build ships without the Privacy Policy row") against `ios/scripts/check_legal_links.py:14-21`.
  With `PW_INTERNAL_TESTFLIGHT=YES`, which only `tools/upload.sh --internal` sets, a Release archive gets a warning
  and exit 0.
- The failure: the sentence is true for every build that can reach App Review or an external group. But a reader
  of s5.10 would expect every TestFlight build to show the Privacy Policy row, and an internal build may not. That
  matters to anyone reading an internal build's Settings against the spec. This is spec text only. The code and
  the check are right.
- Fix: say in the row that an internal-only TestFlight archive (`upload.sh --internal`) passes with a warning and
  may have no Privacy Policy row. Fold it into Maren's read, which T-2500 still owes.
- Board: T-4791.

### I1. (Known, no new line) The Pro store test findings stand, and T-4782 carries them

- `ios/Tests/ProStoreTests.swift` and `ios/App/Store/` did not change between 8db4535c and 72bff631, so M1
  (`eventually` at :138-146 fails and goes on) and L1 (`bounded` at :80-94 fulfils after its deadline) from my
  8db4535c review stand as written. T-4782 (Idris, P1) carries both. T-3745, the timeout they bear on, is still
  open. I did not read Idris's T-4782 work in progress in this worktree.

### I2. (Information, no work) The T-2498 cases had no earlier review

- The two cases came in at a4f5d45cdd. This is the first read of them by someone other than their author. I found
  nothing in them to fix. One note for whoever extends them: the Ask to Buy case's negative check
  (`SettingsUITests.swift:155`, `waitForExistence(timeout: 5)` asserted false) always costs 5 s, and that is by design.
{% endraw %}

</div>
