---
layout: "default"
title: "Review: T-1839, the Release-only &quot;Privacy manifest scan&quot; phase (T-3349)"
section: "documents"
description: "The phase does what the commit says. In the generated project it runs after both embed phases and after the stdlib install. pipefail keeps the scanner&#x27;s exit status, Debug skips the phase, and the scanner&#x27;s API list\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1839-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t1839-odalys.md</code></span></div><h1>Review: T-1839, the Release-only "Privacy manifest scan" phase (T-3349)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-3349, Commandment 13; T-4059 is merged into this line, so this is the only review). Author: Idris.
Commit under review: 52377587aa (landed at 451a4c61e8; Idris's original c96207ef8). Files: `pywidget/ios/project.yml`
(the new phase), `tests/privacy_scan_phase_test.py` (new), and `pywidget/ios/scripts/privacy_scan.py --release` (the
scanner that the phase calls, from T-0036/T-2120, not changed by this commit). Nothing touched the phase's text, the test
or the scanner between 52377587aa and HEAD 6d1515837f (`git diff` is empty for all three), so the line numbers below are
HEAD's. Date: 2026-11-16.

Verdict: PASS with findings

The phase does what the commit says. In the generated project it runs after both embed phases and after the stdlib
install. pipefail keeps the scanner's exit status, Debug skips the phase, and the scanner's API list matches Apple's page.
A real Release device build got through the phase: 54 bundles, 0 problems. One Medium needs work (T-4637). It is in the
scanner, not in this diff, but this commit is what turns the scanner into a release gate. Not run: an archive. Signing
belongs to the Investors, and I did not try it.

## What I checked, with evidence


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, with evidence, scrolls sideways" data-n="1" style="--tw:767px" markdown="1">

| # | Check | Result | n |
|---|---|---|---|
| 1 | `python3 tests/privacy_scan_phase_test.py` | PASS 13 FAIL 0 | 13 checks |
| 2 | Mutants of project.yml run through the test (`PRIVACY_PHASE_YML`) | 6 of 6 red (table below) | 6 |
| 3 | Phase order in the generated `project.pbxproj` (`xcodegen generate`, PyWidget target `buildPhases`) | after `Embed Foundation Extensions`, `Embed Frameworks` and `Install Python standard library`/`packages`; before `Acknowledgements check` | 1 target |
| 4 | Release device build: `XC_TASK=T-3349 tools/xc.sh -project pywidget/ios/PyWidget.xcodeproj -scheme PyWidget -configuration Release -destination 'generic/platform=iOS' CODE_SIGNING_ALLOWED=NO PW_EDITOR_BENCH=YES build` | exit 0; log `ops/runs/xcodebuild-20261116-165510.log` line 15727: `privacy_scan: 54 bundles, 0 problems, 2 warnings` | 1 build |
| 5 | Debug skip in a real build | `privacy_scan: skipped (Debug build)` in `ops/runs/xcodebuild-20261116-153644.log` | 1 build |
| 6 | Scanner API list against Apple's NSPrivacyAccessedAPIType page, saved 2026-11-04 10:48 AM ET (`research/inbound/apple/developer.apple.com/tutorials_data_documentation_bundleresources_app-privacy-configuration_nsprivacyaccessedap-2e90d4ba.json`) | all 5 categories match API for API, including getattrlist/fgetattrlist/getattrlistat under both FileTimestamp and DiskSpace, and getattrlistbulk under FileTimestamp only | 26 APIs |
| 7 | Mach-O files the scanner skips (`python/`, `app_packages/`) in the built app | 0 `.so`/`.dylib` in either | 1 app |
| 8 | Scanner run with a broken `nm` | passes a bundle that should fail (M1) | 1 fixture |

</div>


Mutants (each a copy of project.yml in the scratch folder, test re-run against it):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I checked, with evidence, scrolls sideways" style="--tw:421px" markdown="1">

| Mutant | Test result |
|---|---|
| no `set -o pipefail` | FAIL 2 |
| no Debug guard (`if false`) | FAIL 1 |
| no `--release` | FAIL 2 |
| always skip (`if true`) | FAIL 5 |
| `\|\| true` after the scan | FAIL 4 |
| phase moved before `Install Python standard library` | FAIL 1 |

</div>


Checklist from the board line:
- **Phase order after the embed phases**: holds. The 1st-4th `buildPhases` are the pre-build checks and Sources,
  then come Resources, CopyFiles, Frameworks, `Embed Foundation Extensions`, `Embed Frameworks`, then the post-build
  scripts. The scan is 2nd to last. The `.appex` and every Python framework are in place, and the frameworks are
  already re-signed by `install_stdlib.sh`, when the scan runs. The test covers only the part that project.yml decides
  (after every `Install` phase); see L1.
- **pipefail**: `set -o pipefail` (project.yml:406) comes before the only pipeline, the pipeline is the script's last
  command, and `shell: /bin/bash` is set. The pipefail and `|| true` mutants are red.
- **Debug skip**: `[ "$CONFIGURATION" != Release ]` (project.yml:402). The project has two configurations, Debug and
  Release, so the guard's exact match on "Release" loses nothing. It is seen in a real Debug log (check 5).
- **ITMS-91053 coverage**: each Mach-O is checked against its own bundle's manifest, which is Apple's per-bundle rule.
  App: FileTimestamp and UserDefaults used and declared. Python.framework: FileTimestamp, DiskSpace and SystemBootTime
  used and declared. Extension: declares FileTimestamp and UserDefaults, and its Release binary imports neither (the
  two warnings; over-declaring is a warning by design). No manifest carries `[unconfirmed]` any more (grep of
  `pywidget/ios/Privacy/`: 0 of 6 files). The gap is M1.
- **Archive run**: not run. Signing is the Investors'. Partial evidence: `CODESIGNING_FOLDER_PATH` is the same variable
  that the `Acknowledgements check` reads in archives. A plain device build without overrides stops at signing
  (`xcodebuild-20261116-165133.log`: App Groups profile, ad hoc not allowed for iOS 27.1). The real archive check stays
  open on the board line until signing allows it.

## Findings

**M1, Medium (fails open): the scanner reads a failed `nm` as "no symbols", so the Release gate passes. T-4637, owner
Idris.**
- Where: `pywidget/ios/scripts/privacy_scan.py:82`: `subprocess.run(["xcrun", "nm", "-u", "-j", path],
  capture_output=True, text=True).stdout.split()`. Nothing checks the return code, and stderr is swallowed.
- Repro: the test's own fixture (an executable that calls `stat()` and `NSUserDefaults`), with the app manifest stripped
  of `NSPrivacyAccessedAPITypes`. A working `nm` gives rc 1, `uses FileTimestamp (stat)` and `uses UserDefaults`. With a
  stand-in `xcrun` first on PATH that exits 72, the result is rc 0 and `privacy_scan: 2 bundles, 0 problems, 2
  warnings`. Only the selector scan of the raw bytes still runs, and it finds neither API.
- Inside Xcode, `xcrun nm` normally works, which is why this is not High. But this commit's claim is "a Release build
  (and so an archive) fails when a bundle calls a required-reason API it does not declare". If the tool cannot run
  (a toolchain switch, a `DEVELOPER_DIR` from the caller's environment, a file `nm` cannot read), the gate is green
  and Apple's ITMS-91053 mail would be the first sign.
- Fix: a non-zero `nm` exit becomes a problem line (`<bundle>: nm failed on <file>: <stderr tail>`), so the run exits 1.
  Test: the fake-`xcrun` case above, red before and green after.

**L1, Low (test reaches only half the order claim): the embed-phase order is xcodegen's placement, and no test checks
it.**
- `tests/privacy_scan_phase_test.py:96` checks that the phase comes after every `Install` phase in project.yml.
  "After the embed phases" (the comment at project.yml:395 and the commit message) holds only because xcodegen puts
  every `postBuildScripts` entry after the copy-file phases. I saw that in the generated pbxproj (check 3), but nothing
  pins it.
- Fix, folded into T-4637: one check that reads `buildPhases` from a generated `PyWidget.xcodeproj` when one is there
  and skips, saying so, when it is not.

**L2, Low (records): the scanner still says its API list is "[recalled] ... not read".**
- `privacy_scan.py:20` and `:25`. Apple's NSPrivacyAccessedAPIType page was saved on 2026-11-04 with the API names in
  it, and the list matches it exactly (check 6). The docstring now understates what is known and points a reader to a
  re-check that is done.
- Fix, folded into T-4637: cite the saved page and its date in place of "[recalled]".

**L3, Low (records): the commit's Release build log is not in this worktree.** The message cites
`xcodebuild-20261104-203207`. `ops/runs/` logs are gitignored, and this one is not here. My own build (check 4)
reproduces the claimed "54 bundles, 0 problems", so the record now lives in this file. No board work.

## Note outside this commit

A Release build without `PW_EDITOR_BENCH=YES` stops at the `Legal links check` pre-build phase (no https privacy policy
URL; `ops/runs/xcodebuild-20261116-165205.log`) before the scan is reached. That is T-0497's gate working as written. It
means an archive today fails there first, and the scan has only been run in an editor-bench Release build.

## Not reviewed

`install_stdlib.sh`'s re-signing and the framework manifests' reason codes. Each reason was checked only as present, not
as the right one for its use. Neither is in this commit.
{% endraw %}

</div>
