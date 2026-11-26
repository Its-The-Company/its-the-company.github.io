---
layout: "default"
title: "T-4182 handoff (lane a2, 2026-11-26, Idris)"
section: "documents"
description: "Rewritten at the end of the 4:40 PM ET session (branch personal/a2 from main 1f08000445). Pernille reviews once at the merge point. Earlier steps on main: T-2497, T-3294, T-4800 (ticked); T-3291&#x27;s slice a315e05d1e is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4182-handoff.md</code></span></div><h1>T-4182 handoff (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, 2026-11-26, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Rewritten at the end of the 4:40 PM ET session (branch personal/a2 from main 1f08000445). Pernille reviews once at the
merge point. Earlier steps on main: T-2497, T-3294, T-4800 (ticked); T-3291's slice a315e05d1e is main's 605f376561;
T-4802 is main's 2113fee266 (`feature_session.py landed T-4182` gives its tick).

- On this branch: no step commit. Only this note and one queued event (ops/lane-outbox, the question for Maren below).
  No app code changed. The session's first build-for-testing at 1f080004 ran on the MacBook runner as a whole-target
  test: 2608 executed, 2 skipped, 0 failed (J-20261126-1644-land-chk-a5ab71-2-202789).
- MERGE POINT: no (0 of 5 steps). The next session takes T-3792 first again.

## Open, in the packet's order

1. **T-3792, no commit: test L still never ran.** Seven tries this session (about 4:54 PM to 6:07 PM), all exit 75 at the
   T-5865 gate, nothing ran: one found another xcodebuild test going here, one a 5-min load of 100, and five a 1-min
   load of 131 to 209 at the gate's look, though the 1-min read 7 to 39 just before each try started. With no run of
   mine going the load also read 120 and 170 (5:45 PM, 5:58 PM), so other sessions burst too; but five of five spikes
   within seconds of a launch is a pattern. Not proven either way: whether something in widgetkit_check.sh or xc.sh's
   route step (before the gate looks) raises the load itself. Odalys could sample the load through one try.
   That makes 11 tries over 3 sessions with no result: this test is not getting a turn on the Mac mini.
   Ask the Operator for a quiet slot, or have Odalys say whether a WK_LANE run may go to the MacBook runner.
   - Ready: company-scratch/T-4182-idris/wt (detached at a315e05d1e, t3792-session2.diff applied, xcodegen done;
     the diff still applies cleanly to main 1f08000445). The Simulator pywidget-wk-check is left booted.
   - `company-scratch/T-4182-idris/run_l.sh` retries while the 1-min load is under 30 and the 5-min under 38 with no
     xcodebuild going (`pgrep -x`; `pgrep -f "xcodebuild.* test"` matches the loop's own text and never fires).
   - Green: `git apply` t3792-session2.diff on the branch, commit with t3792-commit.txt, and rewrite its "still red"
     paragraph from the new result. The T-4773 note stands: no warm second run can come under LaneRerunRule's 15 min
     floor when the app launches seconds after the cold run, so the warm-run assertion may be stale, not the lane.
2. **T-3291, no commit.**
   1. <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> question for Ines (event 2026-11-26 1:25 PM), still unanswered: s11 row 6 (`expired` with `failing_since`
      keeps the badge) against ADR-007 2026-10-26 2:40 AM item 1. If she rules for s11, flip that case in
      WidgetStatus.showsBadge and the two tests that pin it (WidgetBadgeTests, WidgetStatusTests).
   2. Simulator check: dark large slot contrast (3.86:1 drawn) and accessoryCircular clipping (s8 item 2); needs a
      placed widget (UITests/WidgetKitCheckTests has the placing steps). Not run: the same load gate.
   4. state-spec s11's "At HEAD the no-tree case draws No view for this size" sentence is stale. It is Maren's spec, so
      I did not edit it; a question to her is queued (ops/lane-outbox, reaches the log when this branch lands).
3. **T-2232, no commit:** waits on Ines (event 2026-11-26 1:25 PM). ADR-007 r2 s3 item 5 still records no answer on
   whether the app row's `peak_mb` becomes the estimate or stays the lifetime peak. <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">Parked</span> patch
   refs/archive/parked/b3/20261109-152815-recut contradicts r2.
4. **T-4801, nothing left to build:** fixed on main in c0e4a0f0b7 (ActivityRequest.project, AppShell passes
   request.project, WidgetTapRoutingTests.testTheActivityRequestNamesTheWidgetsOwnProject, screens.md export header).
   Odalys's review t4193-c0e4a0f0 calls it fixed. Its line needs its tick with that evidence, by whoever may tick it.
5. **T-5272, nothing left to build:** also fixed on main in c0e4a0f0b7. ConsoleModel.openAt(_:line:) is what
   AppShell.openFromActivity calls; ConsoleModelOpenAtTests (5, in ConsoleEditorOpenTests.swift) covers another file
   open, the open file not read again, no line, a refused save, the same request twice. Red first: 3 of 5 failed with
   the goToLine call removed (ops/runs/xcodebuild-20261121-113836.log). screens.md:129 says what Go to Line opens. It
   needs its tick with that evidence, as T-4801.

## Next step

T-3792 test L in a quiet slot (or on the runner if Odalys allows). Then T-3291 item 2 on the same booted Simulator.
{% endraw %}

</div>
