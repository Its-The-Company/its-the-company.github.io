---
layout: "default"
title: "Review of T-4181 at 9fe16e65: the refresh button&#x27;s look by lane (T-4415) and the send line&#x27;s words (T-0972)"
section: "documents"
description: "Safe to land as it stands, with two Medium fixes before the refresh tap goes to TestFlight. The code in the landing is a test and a comment, both correct, and the test pins the renderer&#x27;s real behaviour for the line&#x27;s\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-9fe16e65-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4181-9fe16e65-pernille.md</code></span></div><h1>Review of T-4181 at 9fe16e65: the refresh button's look by <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (T-4415) and the send line's words (T-0972)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5456, Commandment 13). Author: Idris. Date: 2026-11-21.

The landing is `10a2a5f228..9fe16e655b` on main, four commits, all Idris, landed from lane a
(parent 10a2a5f228 is the Operator's 2:32 PM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> record; the next commit, 0074419c74, is a separate T-4185 handoff):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:498px" markdown="1">

| commit | task | what it changes |
|---|---|---|
| f12068573b | T-5397 | one outbox note (board note for #325 c7067306411) |
| 6b15afb2f7 | T-4415 | ios/Tests/RefreshAgeRendererTests.swift +69 (new `testTheRefreshGlyphIsLiveWhateverTheLane`), one outbox note |
| 1156e09928 | T-0972 | ios/App/Runtime/_pywidget_runtime/lane.py, comment only (+2/-1); Idris's memory; two outbox records |
| 9fe16e655b | T-5431 | one outbox note (the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> breach, written by the lane) |

</div>


9fe16e655b itself carries no app code; the app changes are 6b15afb2f7 (a test) and 1156e09928 (a comment). No app
source file changed in the landing.

**T-2097: nothing in it.** No commit touches ExtensionLane.swift, T-0680's bench, `os_proc_available_memory` or
`available_mb`. The only mention is T-5431's note that lane a was offered T-2097 and did not start it (claim released,
also 169111378f, an earlier separate commit). This review covers T-2097 in the sense the board line asks: there is
nothing of T-2097's to check here, and nothing in this landing moves its (c) flag.

Read for what the test relies on: Shared/TreeView.swift (`TreeRefreshButton`, `tap`, `Drawn`), Shared/RefreshTapRule.swift,
Shared/RefreshWidgetIntent.swift (`RefreshTap`, `Host`, `run`), Shared/LaneGuard.swift (`extensionFlag`), the test
helpers `chosenTaps` and `render`; the board lines T-4415, T-0972, T-0678; docs/reviews/t0678-pernille.md M2;
ops/plans/T-0678-handoff.md; ops/board_notes/T-4415.md, T-0678.md, T-5431.md; log/decisions.md; ios/project.yml.
Paths are under pywidget/ unless they start with ops/ or log/.

## What I ran

- No Simulator or Xcode run (Mac mini held clear, an Investor #325). The runs I judge are the author's:
  ops/runs/xcodebuild-20261121-133121.log (unit plan, 193 run, 0 failed; line 382: the new test passed in 0.188 s)
  and -134522.log (193/0, after the lane.py comment). Both were built on lane commits 068f1eca97 and b6831fe736; their
  `pywidget` patch-ids equal main's 6b15afb2f7 and 1156e09928, and `git diff 068f1eca97 6b15afb2f7 -- pywidget/ios` and
  `git diff b6831fe736 9fe16e655b -- pywidget` are empty, so the tree tested is main's tree at 9fe16e65.
- lane.py: `ast.dump` of the file at 6b15afb2f7 and at 1156e09928 is identical, so the change is a comment and
  nothing else. Host suites `python3 -m unittest discover -s pywidget/tests/bridge -p <file>`: test_lane.py 69,
  test_lane_reset.py 9, test_lane_lazy.py 14, test_lane_reset_rereview.py 11, test_lane_lazy_review.py 11; all OK.
- Outbox: the five `ops/lane-outbox/a-*.json` files of the landing are gone from main, and each record is on main
  (T-5397 and T-0972 notes, the T-4415 note, the 1:47:19 PM decision event, T-5431's note with main's hashes).

## What holds

- The test pins what the renderer does today. `TreeRefreshButton.tap` (TreeView.swift:655) reads the family, the
  entry's id, taps-off and `treeIsExtension` from the environment, and nothing about lanes; `Drawn.face` reads the
  family, card, theme and rendering mode. So "no app code changed: the renderer already did this" is true, and the
  test's three cases (lane on with a lane widget, lane off, a widget the lane does not run) all draw the same pixels
  and the same `.intent(widgetID:)` in five families. The pixel reference `looks` is drawn under the default host and
  each case under its own, so a face that read `RefreshTap.host` would differ and go red.
- The mutant the commit names is real: a `tap` returning `.none` when `RefreshTap.host.laneFlag` is off fails the
  lane-off case in each family. A direct read of `WidgetLane.extensionFlag` (false in the unit build) would also go red.
- The in-app and in-extension halves assert `RefreshTapRule`'s answers through `RefreshTap.run`, with an app writer
  stand-in and a lane stand-in, including the gap A accepts (lane off: `.reloadOnly`, nothing runs; not a lane widget:
  `.extensionLane`, the lane runs nothing). That pins the rule as it is, which is what a choice of A should pin.
- T-0972's lane.py change is a comment: no word of `MESSAGES[CODE_SEND]` changed, and the host suites pass.

## Findings

No High.

### M1 (Medium): the two sign-offs are recorded only in the author's words

T-4415's Done is "the choice recorded", and its line asks for the pick with Ines and Maren; T-0972's line says Maren
reviews the send line's words. In the landing, Ines's and Maren's views and Maren's approval appear only in Idris's
commit messages, his board notes, one event he wrote (log/events.jsonl, 2026-11-21T13:47:19, type decision) and the
test's doc comment. I found no record from Ines or Maren: nothing in their memory, no review file, no note under
their name, no entry in log/decisions.md, no memo. Idris's
note also says Ines asked that the docs say the button refreshes only a `lane: widget` script, and that he did not take
it; a recorded dissent belongs in the record with her name, not only in his summary. Under Commandment 30 the choice
counts once it is written in a meeting record, memo or the decision log, and a design sign-off should be in the
designer's own words. I am not saying the sessions did not happen; I am saying the record is one person's account.
Fix: a log/decisions.md entry for T-4415 (who, when, the three views as each gave it, the evidence, the revisit
trigger, Ines's documentation ask and its answer), with Ines and Maren each confirming their view in their own note
on the line, and Maren's note on T-0972 that she approved the words as written. Filed as its own line.

### M2 (Medium): A stands on one Simulator observation whose app run failed, and on a ruling still open

Decision A answers my T-0678 M2 ("on iOS 18-26 the button can do nothing, and looks live") with "on the iOS 26.0 and 27
Simulators the tap's intent ran in the app, which runs any widget". The evidence for 26 is the T-0678 handoff: one
private Simulator (iPhone 16e, iOS 26.0, Debug, lane forced), where the tap's run in the app wrote `error`
(`["app/intent/error"] app state 3`, step 3), cause "most likely" the test seeding, not checked. So no run yet shows
a tap in the app on 26 producing a fresh value, which is T-4181's own Done. The handoff's question (accept app-side
taps on 26) was put to Ines and me; I found no ruling on it, and Idris's own 11-19 note on T-4415 said A also waits on
it. The deployment target is iOS 18.0 (ios/project.yml), iOS 18-25 are not measured at all, and no phone has been read
on any version; the revisit trigger ("if an iOS 18 runtime or device shows the extension taking the tap") has no line
that produces that measurement, so as written it would never fire. A is the right default for the renderer, because
the renderer cannot know which process takes the tap; but what it ships with is a live button that, where the
extension takes the tap and the flag is off (the shipping default), reloads the old tree only.
Fix: before a TestFlight build carries the refresh tap, (a) rerun the 26.0 tap with scripts/<id>/ seeded and record an
`ok` app-side run and a new value (Simulator, so after the Mac mini hold <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>), and (b) add to T-0680's device
session one tap on a placed widget with the lane flag off, recording which process ran the intent and on which iOS;
if the extension took it, T-4415 reopens for B or C as its decision says. Filed as its own line; it also needs Ines's
ruling on the T-0678 handoff, which I note on T-0678.

### L1 (Low): the "not lane: widget" case is a stand-in closure, and the doc comment claims more

The third case differs from the first only in the lane closure (`laneRunsIt: false`); no script or manifest with or
without `lane: widget` exists for "clock" in any case. So the doc comment's "Fails if `tap` or the face reads ... the
widget's lane" is not checked: a face that read the widget's manifest from the App Group would see none in all three
cases and stay green. Today nothing in TreeView.swift reads a lane, so nothing is wrong now. Fix, with the next T-4415
step: either say in the comment that the widget's lane is simulated by the lane stand-in, or add a source check that
Shared/TreeView.swift names none of `WidgetLane`, `RefreshTap`, `LaneGuard` or `lane-scripts`. Not filed; rides with
T-4415.

### L2 (Low): the app half is close to the rule's own test

The in-app assertion runs `RefreshTap.run` with `inExtension: false` and an `appOverride`, so it can only answer `.app`
and call the override; it pins `RefreshTapRule.run`'s first branch, which RefreshTapRule's own tests already pin. It
does no harm and documents the accepted path. Nothing to do; noted so nobody reads it as evidence that the app's writer
runs a non-lane widget on a device.

## Process

The Xcode runs behind this landing were made on the Mac mini under the pre-comparison hold; T-5431's note already
records that as a breach. I judged the work on its merits and add no finding for it.

## Verdict

Safe to land as it stands, with two Medium fixes before the refresh tap goes to TestFlight. The code in the landing is a
test and a comment, both correct, and the test pins the renderer's real behaviour for the line's three cases. Nothing
in it touches T-2097. T-4415's choice matches what its line allows (A is "hide it, draw it disabled, or open the app"
answered with "none of them, keep it live"), but the record of who chose it is one person's (M1), and the premise that
answers my T-0678 M2 rests on one Simulator run whose app-side run failed, with iOS 18-25 and every phone unmeasured
(M2). T-4415 should stay open until M1's record exists; M2 is a gate on the TestFlight build, not on this merge.
{% endraw %}

</div>
