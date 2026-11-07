---
layout: "default"
title: "T-3105: review of T-2851, the internal-only gate build and Export measurements (Idris, 46ab6c49a)"
section: "documents"
description: "Verdict: PASS. The upload path does what the decision doc says and no more. A gate-marked archive leaves this Mac only by upload.sh --internal --upload. On that path the export plist reads back\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2851-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t2851-pernille.md</code></span></div><h1>T-3105: review of T-2851, the internal-only gate build and Export measurements (Idris, 46ab6c49a)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS.** The upload path does what the decision doc says and no more. A gate-marked archive leaves this Mac
only by `upload.sh --internal --upload`. On that path the export plist reads back `testFlightInternalTestingOnly=true`,
and ledger rows are committed before and after the export. Every other path still refuses it. Findings: 0 High,
1 Medium, 3 Low. None blocks T-3106. F1 is the one I would not leave unrecorded: the gate build's Settings row has
never been compiled. T-3106's archive will be its first compile. F1 has a P1 board line for Idris (T-3281).

Read: `git show 46ab6c49a` in full (14 files). Also at that commit: tools/upload.sh:60-244,
check_lane_gate.py (`_shipping`, `verdict`, `product_verdict`, `_offending_lines`), gate_session_build.sh,
MeasurementExport.swift, SettingsView.swift's list, RunLogStore.swift (paths, append, prune), LaneRestBench's writer
path, and tools/testflight_ledger.py `check`. Since 46ab6c49a, main has changed none of the files in scope.

## Runner and host checks

- **Full suite:** MacBook J-20261107-0813-xc-test at dd99eefbf passed: 1493 executed, 23 skipped, 0 failures.
  46ab6c49a is an ancestor of dd99eefbf (`git merge-base --is-ancestor`), so that run covers this commit, including the
  UI target. That pays the board line's "owed before PASS".
- **Targeted:** I queued J-20261107-0925-xc-test (PyWidgetTests/MeasurementExportTests at dd99eefbf). Its job file
  is committed with this review and runs after the next push. The full suite already covers it, so the verdict does
  not wait on it.
- **Host, rerun by me:** tests/upload_test.sh PASS 115 / FAIL 0; test_lane_gate_flag.py 55 tests OK.

## What I checked and found sound

- **upload.sh gate paths.** `--gate-session` is checked before the ledger is resolved and before any xcodebuild call.
  It needs `--project`, `--internal` and `--upload` (:67-70), and its regex allows one condition only. The setting
  reaches only the archive line, as one argument, next to `PW_INTERNAL_TESTFLIGHT=YES` (:140-141, :188). The export
  line gets neither. After the archive:
  - :214 keeps T-2662's refusal word for word without `--internal`.
  - :215 refuses a folder export.
  - :216 refuses a `--gate-session` archive that comes out unmarked. Any condition other than the gate's dies there,
    so the loose `[A-Z_]+` costs nothing.

  On `--archive`, `--internal` takes only an archive with `PWInternalTestFlightOnly` (:150), and only upload.sh sets
  that. `--upload` also takes only a clean commit on origin/main (:147-148).
- **Ledger.** The gate note goes in column 6, and `testflight_ledger.py check` matches on column 3, so a gate build
  number still stops a submission. Both rows are committed and read back before and after the export (:233-241).
- **check_lane_gate.py.** `_shipping` (:85-91) returns None first for `PW_INTERNAL_TESTFLIGHT=YES`. An archive with
  the condition and without that value still fails, and so does an unreadable response file. The value is exactly
  `YES`, and upload.sh unsets it from the caller's shell. The gate-script rule moved above the FLAG filter. Now every
  line is checked for archive words, and every non-comment line that runs upload.sh must carry both flags (:166-178).
  The script's one such line does.
- **gate_session_build.sh.** `--testflight` execs upload.sh with the one setting. Any other argument exits 2, and the
  plain path is unchanged.
- **MeasurementExport.collect.** File paths match the writers: `lane-rest.jsonl` at the App Group root
  (LaneRestBench.swift:75) and `log/widgets/<id>/runs.jsonl`. `lane-bench.jsonl` is FORCED+DEBUG only, so leaving it
  out is right. Prunes are atomic rewrites (RunLogStore.swift:272, :295), so a copy is never half a prune. The folder is
  cleared first (stale-file test). A file that fails is named, and the others still go. A missing App Group is said.
  The six unit tests use the real writers and read the shared copies.
- **Row containment.** The row, its words and the share sheet are under `#if PYWIDGET_LANE_GATE` only. The collector is
  under `PYWIDGET_LANE_GATE || DEBUG`, so a plain Release build carries neither, and RowTests hold that. The plain half
  of the UI test passed in the full suite.

## Findings

1. **pywidget/ios/App/Settings/MeasurementExport.swift:97-141, SettingsView.swift:94-98,
   UITests/SettingsUITests.swift:59-71. Medium.** The gate-only code has never been compiled or run in any build on
   record. That code is `GateMeasurementsRow`, `ActivitySheet`, the Settings section, and the gated half of
   `testExportMeasurementsRowOnlyInTheGateBuild`. None of the 25 xcodebuild logs here from 11-06 and 11-07 has the
   condition. The cited build-for-testing (xcodebuild-20261106-151815.log) was plain: 0 hits. `runner_queue.py` cannot
   carry the condition, and T-2943 says no gate archive has been made. What breaks: the code reads correctly to me
   (`SettingsRowLabel(title:glyph:detail:trailing:)`, `.settingsRow()`, `WidgetFolder.appGroup` all match). But
   T-3106's archive will be the first compile. If that fails, it fails loud, before upload, and costs Saturday's
   promise. If the share sheet does not present on the phone, the Investors find out on day 1. The measurements stay
   in the App Group, so a fixed build can still send them, but that costs a TestFlight round. Fix: one gate-conditioned
   Simulator run of the UI test's gated half before the upload, through gate_session_build.sh (the one file that may
   name the condition) or a runner route that can reach it. Until that exists, run gate_session_build.sh's own Debug
   compile check before `--testflight`.
2. **pywidget/ios/scripts/gate_session_build.sh:11-12. Low.** The comment says to run it "from a clean clone ... with a
   new build number; upload.sh refuses anything else". Two parts of that are wrong:
   - A clone is refused at upload.sh:92 unless `PW_MAIN_CHECKOUT` names the main checkout. It also has no
     PyWidget.xcodeproj (ignored, pywidget/ios/.gitignore:4) until xcodegen runs, so it fails at :135.
   - upload.sh does not refuse a reused build number on `--internal`. Only the strict path checks the ledger (:155,
     :200), and App Store Connect is what rejects a duplicate.

   What breaks: T-3106's operator follows the comment, hits two refusals, and loses time. A clean <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree at a
   commit on origin/main works with neither step. Say that, or name both steps.
3. **MeasurementExport.swift:132-139. Low.** `collect` runs on the main actor, from the button action. It does two reads
   and one write of each file, up to 1 MiB a widget (RunLogRetention). A phone with many widgets hangs Settings for the
   copy. That is fine for three internal testers. Move it off the main actor if the row ever outlives the gate build.
4. **MeasurementExport.swift:78. Low.** `rows` counts newline bytes. The collector takes no `state.lock`, and appends
   are O_APPEND (RunLogStore.swift:11), so a row being written at the moment of export is copied torn and is not
   counted. The manifest does not say this happened. A reader of T-3107 should drop an unterminated last line rather
   than trust `rows` blindly. No change needed unless the counts are used as evidence.

## Not checked

- Apple's side: whether App Store Connect shows the build internal-only. As the decision doc says, the Investors read
  that page after T-3106.
- Organizer with both settings typed by hand. This is a known human path, as stated in "What is left", and the code
  under review does not change it.
{% endraw %}

</div>
