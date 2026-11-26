---
layout: "default"
title: "Review of T-5021 at 5a3948f9: the gate build&#x27;s test run now includes the ladder&#x27;s other two checks"
section: "documents"
description: "PASS. The change does what the line asks: the two tests the T-4934 review found running only by hand are now in --test, and the page names them and says what each holds. One Low (L1): the with-condition count cannot be\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5540-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 35 · Wed Nov 25</span><span><code>pywidget/docs/reviews/t5540-pernille.md</code></span></div><h1>Review of T-5021 at 5a3948f9: the gate build's test run now includes the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>'s other two checks</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5540, Commandment 13). Author: Idris. Date: 2026-11-25. Copy at main 8f0ac61ed9.
Scope: the T-5021 commits up to 5a3948f95a: bd1ad4a4fd (pywidget/ios/scripts/gate_session_build.sh +6/-2 and
pywidget/docs/decisions/gate-session-build.md +7/-1) and 5a3948f95a (one <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox file: a queued `xc-test` job for
PyWidgetTests). Judged against the archived T-5021 line (log/board-archive.md:5030) and its Done when: test land:xc; the
page names both tests among those that hold the ladder. Read as well: ExtensionLaneTests.swift:1296-1303 and
WidgetPlacementTests.swift (pywidget/ios/Tests/) at bd1ad4a4fd, GatePremade.swift:41-45, the job record
J-20261121-2243-xc-test-2 on origin/macbook-results.

What affects the app a tester would install: nothing. `gate_session_build.sh --test` is a build-and-test script run by hand
before a gate upload, and the page is a decision record. No Swift, string or resource changed.

## What I checked

- The script: `bash -n` passes. `--test` still sets XC_LOCAL=1 and the gate condition, and adds
  `-only-testing:PyWidgetTests/ExtensionLaneTests/testOnlyTheGateBuildExemptsItsOwnPremades` and
  `-only-testing:PyWidgetTests/WidgetPlacementTests`. The names exist as spelled (test at ExtensionLaneTests.swift:1296;
  class at WidgetPlacementTests.swift:8). The usage comment (:14-19) says what they check.
- The page (gate-session-build.md:200-215): "Five tests" is the three that were there plus these two, each bullet's
  with-condition and without-condition behaviour matches the test bodies: `sizeMoveExempt` equals `GatePremade.names`
  as premade ids with `ladder12` in it, or is empty (:1297-1302); the picker's gate tail is checked with Pro, without Pro
  and with the Pro table missing (`testPickerListsOwn...`, `testPickerAddsPro...`, `testClosedStateOffersOwnWidgetsOnly`
  using `Self.gateTail`), and `testBundledPremadeTitlesMatchThePremades` checks `GatePremade.titles` (:192-203). The
  cross-reference "see How often below" resolves (:217). `GatePremade.ids` (GatePremade.swift:45) is what the How-often
  paragraph calls the set; the new bullet's "`GatePremade.names` as premade ids" is the same set.
- The queued job: J-20261121-2243-xc-test-2 (task T-5021, only PyWidgetTests) ran on the MacBook runner at
  8f0cdb5d34 (a descendant of bd1ad4a4fd), status passed, 2185 executed, 0 failing, 2 skipped. That is the plain half
  (no gate condition), so it shows the two tests compile and pass without the condition; their with-condition half is
  what the commit message's own run covers.

## Findings

### L1 (Low): the commit's "31 tests, 0 failures" cannot be checked from main

The log it cites, ops/runs/xcodebuild-20261121-210940.log, is not tracked (ops/runs holds only dispatch files), so the figure
rests on Idris's word. By grep the six selected sets hold 2 (GatePremadeTests) + 17 (WidgetPlacementTests) + 11
(MeasurementExportTests) + 1 + 1 (the Settings UI test) = 32 `func test` lines; one may be skipped or compiled out, which
is plausible but not shown. This does not make the change wrong: the with-condition run is the thing that proves the
exemption, and no one but the lane that ran it has seen it. Fix, when convenient: the next gate upload's `--test` run
(T-2943) will show the real count; record it in that line's done-note.

## Verdict

PASS. The change does what the line asks: the two tests the T-4934 review found running only by hand are now in
`--test`, and the page names them and says what each holds. One Low (L1): the with-condition count cannot be read from main.
Nothing here reaches the app a tester installs; it should not hold the upload, and it makes the gate upload's pre-check
stronger.
{% endraw %}

</div>
