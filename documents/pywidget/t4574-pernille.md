---
layout: "default"
title: "Review of T-4574 at 2d6e6763a2: LSApplicationQueriesSchemes only in builds that can show the launcher editor"
section: "documents"
description: "PASS with findings. The phase answers the key question correctly on every path I traced: upload.sh --project and --internal archives are Release without PYWIDGET_LAUNCHER and carry no list, a Debug or launcher archive\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4574-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4574-pernille.md</code></span></div><h1>Review of T-4574 at 2d6e6763a2: LSApplicationQueriesSchemes only in builds that can show the launcher editor</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4861, Commandments 6, 13 and 14). Author: Idris. Reviewed: 2d6e6763a2 (ios/App/Info.plist,
ios/project.yml's info block and its "Launcher query schemes (launcher builds only)" phase,
ios/scripts/launcher_query_schemes.py, ios/App/Launcher/LauncherEditor.swift LauncherEditorGate.canBeOn,
ios/Tests/Core/LauncherEditorTests.swift testTheBuiltPlistCarriesTheBundledListOnlyInALauncherBuild,
tests/widgets/test_launcher_query_schemes.py, launcher-apps.json's note). Also read, for the archive paths: ios/project.yml's
configs, schemes and the phases around the new one (Register pywidget scheme, Install probe font, Privacy manifest scan),
ios/scripts/check_lane_gate.py `conditions` (the condition reader the script reuses), ios/scripts/debug_url_scheme.sh (the
pattern it follows), and tools/upload.sh (its archive checks, lines 237-261 at HEAD 401a575241). Paths are under pywidget/
unless they start with tools/ or ops/. Date: 2026-11-18.

Where the change is: 2d6e6763a2 is not on main. It sits on personal/b2; the same diff, rebased at 4:01 AM ET, is
fe0ff36f01 on personal/b54 (I compared the two diffs line by line for ios/ and tests/: identical). Main at 401a575241
still has the twelve schemes in App/Info.plist and in project.yml, so every build from main, a Release archive included,
still lists them. The T-4574 line is open on the board, so this is Idris's to land, not a new finding; I name it so nobody
reads this review as "fixed on main".

What I ran (code reading only; no Xcode build, no Simulator, as the task said):

- `python3 -m unittest pywidget/tests/widgets/test_launcher_query_schemes.py` on a `git archive` of 2d6e6763a2's pywidget/
  tree: 5 tests, OK.
- The script, `/usr/bin/python3 -I`, with `env -i`, on scratch binary plists:
  1. CONFIGURATION=Debug, conditions `PYWIDGET_TESTER_PRO` (no DEBUG): adds the list, though canBeOn is false there (L1).
  2. CONFIGURATION=Release, conditions `DEBUG`: no list, though canBeOn is true there (L1).
  3. Release + PYWIDGET_LAUNCHER, twice: list added once; second run writes nothing (mtime unchanged). Idempotent.
  4. Release, OTHER_SWIFT_FLAGS `@/nonexistent/flags.resp`: no list (a launcher build whose condition hides in an
     unreadable response file would lose it; the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> gate fails such a build on an archive, this script stays quiet).
  5. Release, OTHER_SWIFT_FLAGS `@<file holding -DPYWIDGET_LAUNCHER>`: list added. (A response file path with a space is
     split by `_words` and read as unreadable; same reader as the lane gate, so not this change's to fix.)
  6. A truncated plist: `error: ... Invalid file`, exit 1. 7. A read-only plist holding a stale list in Release:
     `error: ... Permission denied`, exit 1, the list stays and the build fails. 8. No TARGET_BUILD_DIR: exit 1.
     Failure handling is right: every failure fails the phase (`set -e`), with an `error:` line Xcode lists.

## The key question: can any path ship the list without the launcher, or a launcher build lose it?

Once T-4574 is on main: no shipping path I can find puts the list in a build that cannot show the editor.

- tools/upload.sh --project (with or without --internal, with --gate-session): always `-configuration Release`. The script
  sees CONFIGURATION=Release and no PYWIDGET_LAUNCHER, so it removes any key; App/Info.plist no longer has one to remove.
  If a --gate-session condition named PYWIDGET_LAUNCHER, the archive would get the list, and upload.sh refuses it on every
  path anyway (LauncherMark, tools/upload.sh:258-261, T-4219).
- tools/upload.sh --archive with an Organizer archive: the PyWidget scheme's Archive action is XcodeGen's default,
  Release, so no list. A Debug archive (the one build with canBeOn true and no launcher reachable, since PW_LAUNCHER cannot
  be set on a TestFlight install) carries PYWIDGET_TESTER_PRO, so upload.sh refuses it except by --internal --upload, and
  --internal with --archive takes only an archive upload.sh itself marked, which is Release. Refused.
- Xcode Organizer's own Distribute (no upload.sh): a Release archive has no list. A launcher archive made there has the list
  and the launcher together, which is consistent for this question; that Organizer bypasses T-4219 is known and outside
  this change.
- Incremental builds: the phase has `basedOnDependencyAnalysis: false` (project.yml:386-391), so it runs on every build and
  removes a stale list. Debug and Release write to different product folders, so a list from Debug never reaches a Release
  product. A condition switched off in the same folder: the key is removed, the plist changes, and Xcode re-signs.
- Which plist, and signing order: the script edits only `$TARGET_BUILD_DIR/$INFOPLIST_PATH`, the built product's plist (in
  an archive that is the installation products folder, the same bundle CODESIGNING_FOLDER_PATH names for the privacy scan).
  The built plist is a declared input (project.yml:390-391), so the phase runs after ProcessInfoPlistFile, the T-3667
  lesson; it is a post-build phase and Xcode signs after every phase, so the edit is sealed into the signature. User script
  sandboxing is off in this project (project.yml:13), so the undeclared write is allowed. Good design point: if the input
  ordering were ever lost, the failure in Release is safe (ProcessInfoPlistFile writes a source plist with no key).
- The widget extension gets no key, which is right: the app's Choose an App (LauncherEditor.swift:824) is the only
  canOpenURL caller.
- A launcher build losing it: only through an unreadable response file (probe 4) or a non-Debug configuration carrying
  DEBUG (L1); in a Debug unit-test run the XCTest fails if the list is missing, so the common case is covered.

## Findings

### M1 (Medium): nothing checks a real Release product or archive for the key; the XCTest's "no key" branch never runs

LauncherEditorTests.swift:382 asserts the key is absent only when `canBeOn` is false, which needs a non-Debug unit-test
run. The unit tests build only in Debug (project.yml's schemes: "the unit tests use @testable and build only in Debug"),
so that branch is dead code; the Release half of T-4574's "Done when" ("a plain Release build's Info.plist holding no
LSApplicationQueriesSchemes") is proved only by the script's own test on synthetic environments, never on a built app.
The commit message reports the Debug unit run only, and its log (ops/runs/xcodebuild-20261118-024917.log) is not in this
checkout (run logs are gitignored), so I could not read it. The design is sound, which is why this is Medium and not High;
but this is a privacy declaration App Review reads, and a cheap mechanical check belongs where archives leave the machine.

Fix: in tools/upload.sh, next to the LauncherMark check (after line 261), refuse any archive whose app or appex Info.plist
holds LSApplicationQueriesSchemes, on every path. Launcher archives are already refused, so any archive holding the key
is a regression, and the rule needs no exception. Add a case to tests/upload_test.sh (an archive fixture with the key is
refused, one without passes). Then build Release once on the runner (`XC_TASK=... tools/xc.sh build ... -configuration
Release`) and record `PlistBuddy -c "Print :LSApplicationQueriesSchemes"` failing on the product in T-4574's done-note.
Either half closes the gap; the upload.sh check is the one that keeps it closed.

### L1 (Low): the script decides "Debug" by configuration name, the gate by the DEBUG condition

launcher_query_schemes.py:35-36 uses `env.get("CONFIGURATION") == "Debug"`; canBeOn is `#if PYWIDGET_LAUNCHER || DEBUG`
(LauncherEditor.swift). Probes 1 and 2 show the two disagree when the conditions are overridden without `$(inherited)` or
DEBUG is added to Release. No path ships either today (the project has only Debug and Release, and upload.sh's
--gate-session requires `$(inherited)`), so Low. Fix: `return bool({FLAG, "DEBUG"} & set(check_lane_gate.conditions(env)))`,
which mirrors the Swift line exactly, plus the two probe cases in test_launcher_query_schemes.py's LAUNCHERS and RELEASE.
Update the docstring (line 8) to match.

### L2 (Low): the rewrite is not atomic

launcher_query_schemes.py:55-56 opens the built plist with `"wb"` (truncating it) and then dumps. A failure in between (a
full disk on the scratch SSD) leaves a truncated Info.plist; the build fails, and the next incremental build may fail on
probe 6's "Invalid file" until a clean build. Fix: dump to `path + ".tmp"` in the same folder and `os.replace` it.

### L3 (Low): the repository test does not hold the phase's input line

test_launcher_query_schemes.py:84 checks that the phase calls the script, not that it keeps
`inputFiles: [$(TARGET_BUILD_DIR)/$(INFOPLIST_PATH)]`. Losing it would make Debug lose the list (the XCTest would catch
that in a Debug run) and is safe in Release, so Low. Fix: assert the phase block (from its `- name:` to the next) holds
that input line, as cheaply as the existing string check.

## Notes, not findings

- SCHEMES is a second copy of launcher-apps.json's schemes. Two tests hold them equal (the Python one at build-free cost,
  the XCTest on the built plist), which is enough; reading the JSON at build time would remove the copy, not needed now.
- plistlib rewrites the built plist with sorted keys and keeps its format (binary stays binary). Harmless.
- The Debug build keeps the list though the editor shows only with PW_LAUNCHER. Debug builds do not ship (above), and the
  UI tests need it, so this is the right line.

## Verdict

PASS with findings. The phase answers the key question correctly on every path I traced: upload.sh --project and
--internal archives are Release without PYWIDGET_LAUNCHER and carry no list, a Debug or launcher archive is refused by
upload.sh's existing marks, a stale list is removed on every build, the edit is to the built plist before signing, and a
launcher build gets the list. The script fails the build on every error I could produce and is idempotent. One Medium
for Idris: put a mechanical check on archives (tools/upload.sh) so the Release half is enforced on a real product, not
only on synthetic environments. Three Lows can ride with it. Before any of that counts, T-4574 itself has to land: it is
not on main, and main's Release builds still list the twelve schemes.
{% endraw %}

</div>
