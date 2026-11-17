---
layout: "default"
title: "Review: T-2691, the lane gate product check (T-4596)"
section: "documents"
description: "The phase does what the commit says. In any archive (ACTION=install, which is what Xcode&#x27;s Organizer runs), an executable holding LaneGateMark fails at the post-build phase on both targets, unless the build carries\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2691-review.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t2691-review.md</code></span></div><h1>Review: T-2691, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> gate product check (T-4596)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-16. Author: Idris. Commit under review: b74b006b91 (base bd85fb06cb64). It landed on main
as b810bba81a; `git range-diff` shows the patch unchanged, and nothing touched project.yml, check_lane_gate.py or
test_lane_gate_flag.py after it, so every line number below is HEAD of personal/b3 (c0e26ead25).

Verdict: PASS with findings

The phase does what the commit says. In any archive (ACTION=install, which is what Xcode's Organizer runs), an
executable holding LaneGateMark fails at the post-build phase on both targets, unless the build carries
PW_INTERNAL_TESTFLIGHT=YES. The phase declares its input, and it always runs. The three logs show what T-2691 claims.
There is one exception: the two `--archive` results are not in the logs the commit names. I re-ran both on the archives
that are still on disk, and they hold. Two Lows follow. One needs work (T-4626).

## What I checked, with evidence

1. **Both targets have the phase, after the link, on the real executable.**
   - pywidget/ios/project.yml:262-267 (PyWidget) and :485-490 (PyWidgetExtension), both under `postBuildScripts`.
   - After `xcodegen generate`, the generated project has both phases as `PBXShellScriptBuildPhase` with
     `alwaysOutOfDate = 1` and `inputPaths = ("$(TARGET_BUILD_DIR)/$(EXECUTABLE_PATH)")`, and no outputs.
   - On the app target, the phase comes after "Embed Foundation Extensions" and "Embed Frameworks".
   - On the extension target, the phase comes after "Frameworks". Each target's phase reads its own target's
     executable.
2. **It is not skipped by dependency analysis.**
   - `basedOnDependencyAnalysis: false` gives `alwaysOutOfDate = 1`, so the phase runs on every build.
   - Every evidence log has Xcode's note "Run script build phase 'Lane gate product check' will be run during every
     build" for both targets (e.g. 122015.log:17926 and :17934).
   - The declared input orders the phase after the link. In 122015.log, `Ld .../PyWidgetExtension.appex/PyWidgetExtension`
     is at line 4279 and the extension's product check is at 4283. `Ld .../PyWidget.app/PyWidget` is at 8371 and the
     app's product check is at 8395.
   - The path the phase reads is the path the linker wrote: UninstalledProducts for the appex, and
     InstallationBuildProductsLocation for the app.
   - Strip comes later (6125 and 17896). Strip removes symbols, not `__cstring` bytes. The final archive still holds
     the mark (item 4).
3. **The Organizer path.**
   - Organizer runs `xcodebuild archive` on the PyWidget scheme. The scheme's archive configuration is XcodeGen's
     default, Release. Every target in an archive gets ACTION=install: 122932.log shows `export ACTION\=install` in
     the extension's phases.
   - `_shipping()` (check_lane_gate.py:85-91) therefore returns "an archive", and `product_verdict()` (:124-141)
     exits 1 on a marked executable.
   - I also tried a **Debug** archive, because Debug builds put the code in `NAME.debug.dylib` behind a stub executable.
     That would hide the mark from a check that reads EXECUTABLE_PATH. It does not happen. In an archive, Xcode exports
     `ENABLE_DEBUG_DYLIB=NO` for the extension (my run, ops/runs/xcodebuild-20261116-161308.log:1094, ACTION=install
     at :925).
   - That Debug archive was also refused earlier, by the Tester Pro check: "PYWIDGET_TESTER_PRO is set on an archive",
     ARCHIVE FAILED, exit 65. The command was
     `XC_TASK=T-4596 tools/xc.sh -scheme PyWidget -configuration Debug -destination generic/platform=iOS archive` with
     the per-arch xcconfig. No gap here.
4. **The evidence logs.** They are in [local folder] Logs there are gitignored
   (.gitignore:8), so they are not in the repository.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, with evidence, scrolls sideways" style="--tw:724px" markdown="1">

   | Log | T-2691 claims | What the log shows |
   |---|---|---|
   | 121438 | Plain strict archive held by legal links | :6749 `error: legal links: LegalLinks.privacyPolicy has no https URL`, :6780 `ARCHIVE FAILED`. Confirmed. |
   | 122015 | Unmarked, PW_INTERNAL_TESTFLIGHT=YES: succeeded, both product phases ran; `--archive` exit 0 | Command line :2 has PW_INTERNAL_TESTFLIGHT=YES. Phases at :4283 (appex) and :8395 (app). `ARCHIVE SUCCEEDED` :17949. **No `--archive` run in the log** (L1). I re-ran it on `T-2691-idris/plain.xcarchive`: exit 0. |
   | 122932 | Per-arch condition from an outside -xcconfig, strict: failed at the extension's product phase | The xcconfig on disk sets only `SWIFT_ACTIVE_COMPILATION_CONDITIONS[arch=arm64] = $(inherited) PYWIDGET_LANE_GATE`. The pre-build "Lane gate check" (:838) passed silently, because a script environment does not resolve `[arch=]`. That is exactly the hole this phase closes. :4886 `error: .../PyWidgetExtension.appex/PyWidgetExtension was compiled with PYWIDGET_LANE_GATE ... on an archive`. The failed-commands list names the extension's product check. `ARCHIVE FAILED`. Confirmed. |
   | 123458 | Condition on, PW_INTERNAL_TESTFLIGHT=YES: succeeded, warning on both executables; `--archive` exit 1 naming both | Warning with the appex path at :4900 and with the app path at :8865 (the pre-build warnings are :1444 and :7385). `ARCHIVE SUCCEEDED`. **No `--archive` run in the log** (L1). I re-ran it on `T-2691-idris/gate-internal.xcarchive`: exit 1, naming `PyWidget.app/PyWidget` and `PlugIns/PyWidgetExtension.appex/PyWidgetExtension`. |

</div>


   No Xcode run shows the strict failure on the **app** executable, because 122932 stopped at the extension.
   123458:8865 shows the app's phase reading the real app executable and finding the mark, and the same function
   decides both targets. The host test covers the app's script text. This is not a finding, but nobody has seen it in
   Xcode.
5. **Tests.**
   - `python3 -m unittest pywidget/tests/widgets/test_lane_gate_flag.py`: Ran 57, OK. The 57 pass / 0 fail claim is
     confirmed.
   - I ran mutants on a scratch copy of project.yml against ProductPhaseTests (pywidget/tests/widgets/test_lane_gate_flag.py:246-286).
   - Killed, all 6: app phase without `inputFiles`; extension `basedOnDependencyAnalysis: true`; extension script
     `--product || true`; extension phase deleted; app script without `--product`; app input on `$(BUILT_PRODUCTS_DIR)`.
   - Survived: `runOnlyWhenInstalling: true` on the app phase. This is harmless for the guarantee: the phase still runs
     on ACTION=install. It only loses the warning on a plain marked build. I am not filing it.

## Findings

**L1, Low (records): the `--archive` results are cited to logs that do not contain them.**
- The T-2691 commit message gives "`--archive` exit 0 (log ops/runs/xcodebuild-20261116-122015.log)" and "`--archive` on
  the result exit 1, both executables named (xcodebuild-20261116-123458.log)".
- Neither log has a check_lane_gate.py `--archive` run. Both end at `** ARCHIVE SUCCEEDED **` plus Xcode's notes.
- The logs are also gitignored and exist only in the b2 worktree.
- The claims are true: I reproduced both, with the exit codes in the table above. The record now lives in this file.
- No board work. Author's note for next time: put a host check's output in a file that the commit names.

**L2, Low (the exemption is not pinned): T-4626, owner Idris.**
- The whole "fails unless internal" rule depends on PW_INTERNAL_TESTFLIGHT=YES being set only by `tools/upload.sh
  --internal`.
- check_lane_gate.py:87 trusts the value. So do check_tester_pro.py:43 and check_legal_links.py:58.
- Nothing checks where the value comes from. `scan()` (check_lane_gate.py:179) looks only for PYWIDGET_LANE_GATE, and no
  test reads project.yml, the schemes or an xcconfig for PW_INTERNAL_TESTFLIGHT.
- Today it appears in project.yml only in comments (:259, :482), so nothing is exposed now.
- But one `PW_INTERNAL_TESTFLIGHT: YES` in project.yml settings would let an Organizer archive with the lane mark, the
  tester Pro switch and no privacy link pass all three phases. That breaks the claim that an archive fails when made
  anywhere.
- This predates T-2691 (it comes from T-2851), but this is the commit whose claim rests on it.
- Fix, filed as T-4626: a scan or test that fails when any file but tools/upload.sh sets the switch, with a mutant that
  adds it to project.yml.

## Not reviewed

tools/upload.sh's own mark check (T-2662) and gate_session_build.sh. Neither is in this commit.
{% endraw %}

</div>
