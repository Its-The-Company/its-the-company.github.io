---
layout: "default"
title: "Review of T-4181 at e22f24e6: a project sent from the editor runs in the widget extension (T-0972, test U)"
section: "documents"
description: "PASS with findings. Test U does what T-0972&#x27;s Done asks: a new project typed and sent from the editor lands in widgets/&lt;id&gt;/ and lane-scripts/&lt;id&gt;/, and with the app closed and the app&#x27;s own run cleared, the placed\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-e22f24e6-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4181-e22f24e6-pernille.md</code></span></div><h1>Review of T-4181 at e22f24e6: a project sent from the editor runs in the widget extension (T-0972, test U)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5405, Commandment 13). Author: Idris. Reviewed: `git show e22f24e6e3 -- pywidget`, that is
ios/UITests/WidgetKitCheckTests.swift (new `testUSentProjectRunsInTheExtension`, +124), ios/scripts/widgetkit_check.sh
(+2/-1), ios/bench/t0972-send-extension.txt and ios/bench/t0972-sent-in-extension.png. Judged against T-0972's Done
on the board ("a Simulator send of a new project reaches scripts/<id>/ and runs in the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> with the flag forced on";
the folder the extension reads is lane-scripts/<id>/). Also read, for what the test relies on:
ios/App/Projects/WidgetScriptSave.swift (`sendDeciding`, the mirror plan in the commit), ios/App/Projects/LaneMirror.swift
(`plan`), ios/App/Projects/SendLaneScan.swift, ios/Shared/ExtensionLane.swift (`refresh`, `takeTurn`, `runInBridge`,
`LaneEntry.resolve`, `LaneBench`), ios/App/Runtime/_pywidget_runtime/lane.py (ALLOWED, IMPLIED, DENIED_SUBMODULES,
`send_lane`, the finder), and the test helpers `typeIntoMainPy`, `setWidget`, `readOffTheWidget`, `benchLines`. Nothing
after e22f24e6e3 touches the test file, the send code or ExtensionLane.swift. Paths are under pywidget/. Line numbers
are the test file's at e22f24e6e3 (the same at main 02daf0949c). Date: 2026-11-21.

What I ran:
- No Simulator run: no Xcode on the Mac mini (Investors' #325), and this is a read review. The run I judge is the one
  the evidence file records (1 test, 0 failures, 222.6 s, iPhone 17e Simulator, iOS 27.0, forced Debug build).
- `bash -n ios/scripts/widgetkit_check.sh`: clean. The script's diff is two comment lines (the WK_LANE note names test
  U beside test K); no command, variable or default changed, so no other WidgetKit check behaves differently.
- Looked at t0972-sent-in-extension.png: a small PyWidget widget on the Home Screen reading PWFCNUXY, the token the
  evidence file gives for the extension's run.

## What holds

- The extension run can only be the mirror's. `LaneEntry.resolve` (ExtensionLane.swift:804) reads lane-scripts/<id>/
  and its pywidget.json alone, with no fallback to widgets/<id>/; with no mirror `refresh` returns `.notInLane` and
  writes nothing. So a lane-bench line whose process is PyWidgetExtension (`LaneBench` exists only in a
  PYWIDGET_LANE_FORCED Debug build) plus a run row with `lane == "widget"` (RunLogRecorder.laneWidget) for this id
  means the extension ran the mirrored script, with the flag forced. A non-forced build writes no bench line and goes
  red; it cannot pass by accident.
- The app is out of the way when that happens. The test ends the app (asserts `.notRunning`, :1449 and :1485), removes
  widgets/<id>/tree.json and log/widgets/<id>/ (:1453), and checks no extension line exists for the fresh id before
  the widget is placed (:1463). After that, only the extension can write a tree or a row for the id, and the token is
  drawn from the clock in microseconds, so a new one each run. Vision reads that same token off the placed widget.
- The order of writes does not let the wait exit early on a half-written run: in `takeTurn` the tree is written by `sink.finish` in
  `runInBridge` (ExtensionLane.swift:765) and the row after `run` returns (:462), so once a widget-lane row is there an `ok` run's tree is too.
- The refused half proves the send's scan is live. `LaneMirror.plan` (LaneMirror.swift:74) removes the mirror only when
  the project's manifest types a lane other than widget, or the scan answered `app`. The new project's manifest put it
  in the lane (the clean send mirrored and ran), so the mirror going after `import pywidget.prompts` comes from
  `send_lane` in the app's Python (pywidget.prompts is in DENIED_SUBMODULES). The wait at :1496-1498 needs both the new
  text in widgets/<id>/main.py and the mirror gone, and both are asserted after it; neither is vacuous.
- The text is typed key by key in the editor and sent by the Projects button, as a person does; `typeIntoMainPy`
  asserts the editor holds exactly what was typed, and both sends assert widgets/<id>/main.py equals it.
- The recorded red is real and in the right place: a first run with `import time` failed at the mirror assertion,
  which matches lane.py (time is in IMPLIED, allowed in the finder for `_datetime`'s sake, refused by the scan of a
  person's own import). The script now uses datetime, which is on ALLOWED.
- The test skips without WK_LANE (:1392), so the plain WidgetKit run and the land check are unchanged.

## Findings

No High or Medium.

### L1 (Low): the evidence says the clean send's scan said widget; the test did not see that

bench/t0972-send-extension.txt:7 says the mirror was written because "the send's scan said widget". The test cannot
tell that apart from no answer: when the scan gives nothing within `SendLaneScan.sendWait` (0.2 s; Python not started,
a stuck run), `plan` decides by the manifest alone and mirrors the same text (SendLaneScan.swift doc, LaneMirror.swift:74).
The refused half shows the scanner was live in that build, so the conclusion is likely right, but the sentence states
an observation that was not made. Fix: reword to "the clean send mirrored (no import kept it in the app)", or make it
true by checking the console after the clean send carries no CODE_SEND line and the refused one does (L2).

### L2 (Low): the refused half does not wait for Python, and does not read the console line

:1426-1427 and :1491-1492 wait up to 20 s for "ready" in the console but never assert it. If Python is slow after the
relaunch, the refused send gets no scan answer, keeps the mirror, and the test fails 30 s later as "lane-scripts/<id>/
outlived a refused send", which blames the product for a start-up delay. The same half also leaves out the one console
line naming the import (T-0972's "one line names the import and says the widget updates when the app runs"); the
evidence says SendLaneTests and ConsoleModel's tests cover it, which is fine for the words, but on the real UI path it
is the only direct sign that `send_lane` answered. Fix: assert "ready" after each wait, and after the refused send
assert the console holds "pywidget.prompts" (the CODE_SEND line), which also closes L1's gap.

### L3 (Low): `XCTAssertNotEqual(after, before)` is vacuous when the app's own run is slow

:1445-1447 give the app's in-app run 10 s to write a token, then take whatever is there. If it was not there, `before`
is nil and :1483 passes for any token. The proof does not rest on it (the tree is removed at :1453 and the app is
closed, so any token after is the extension's), but the assertion and its message claim more than they check, and the
evidence file reports "the app's own run drew PWWUKKTR" as a step. Fix: `XCTAssertNotNil(before, ...)` after :1447, or
drop the comparison and say in the comment that the removal is the proof.

### L4 (Low): one green run, hand-started, and a little left behind

The test is WK_LANE-only, so nothing reruns it; the evidence is one green run, and the 40 s window after `setWidget`
(:1472) is the extension's reload on an iOS 27.0 Simulator under whatever load the Mac had. That is fine as evidence
for T-0972's Done, but a regression in the real send-to-extension path will be seen only when someone reruns it by hand.
Teardown removes widgets/<id>/, the mirror and the run log, but leaves the id's lane-bench.jsonl lines, any
.lane-demoted.json entry the run's size rule wrote, and the uitest-send-<token> projects folder (the other UI tests
leave theirs too). Ids are fresh each run, so none of it can colour a later run. Fix, when convenient: put test U in
whatever lane run the TestFlight pass already makes with WK_LANE=1 (beside test K), and record a second green there.

## Verdict

PASS with findings. Test U does what T-0972's Done asks: a new project typed and sent from the editor lands in
widgets/<id>/ and lane-scripts/<id>/, and with the app closed and the app's own run cleared, the placed widget is run
by PyWidgetExtension from the mirror (a bench line from the extension, a widget-lane `ok` row, a new token in tree.json
and on the widget's pixels). A resend with a refused import stands and removes the mirror, which only the app's scan
can have done. The script change is comment-only. No Medium or higher, so no new board lines; the four Lows (evidence
wording, an unasserted ready wait and the console line, one vacuous comparison, a single hand-started run) can ride
with Idris's next T-0972 step.
{% endraw %}

</div>
