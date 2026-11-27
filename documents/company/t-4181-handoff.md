---
layout: "default"
title: "T-4181 handoff (Operator, from Idris&#x27;s report, 2026-11-26 ET, lane a)"
section: "documents"
description: "This session resumed the 11-25 parked branch (parked/a/20261125-233308-38972) and did not start over."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4181-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 37 · Fri Nov 27</span><span><code>ops/plans/T-4181-handoff.md</code></span></div><h1>T-4181 handoff (Operator, from Idris's report, 2026-11-26 ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
This session resumed the 11-25 <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch (parked/a/20261125-233308-38972) and did not start over.

## On the branch

- T-0972 9d56c0ef55, T-0696 81adbe496b, T-2260 f328df850c: the parked commits, cherry-picked onto main 43b99322cd.
- T-0700 00c00b9c47: the in-extension assertion now runs (1 run, 0 failed); samples in t0700-hang.jsonl.
- T-4404 c370633ea5: the parked uncommitted fix (158fe55b15) was read, went red with the fix removed and green with
  it, and has a new mutant in mutants-t1852.json.
- PyWidgetTests at c370633e: 2415 run, 0 failed, 2 skipped (J-20261126-0048-land-chk-a5ab71-4-265223).
- Review: Pernille, no blocking findings. Non-blocking: ExtensionLaneTests.swift:1859 now takes only the after-end
  exit, so the T-2260 count check rests on :1616; the 1 s hold at :1599 can expire under load (false red); the
  t0972 bench note says J-20261125-2221 passed after one retry, while the runner marks that job failed (exit 65).

## Not committed, and why

- T-4280: its rule is already on main (c76347c124). What is left is the Simulator and internal-build recording,
  T-4494 item 3, which needs the Investors' iPhone.
- T-1882: part (1) needs B5's fields.json. Nothing writes it yet and no open board line builds it.

## For the next session

- `plan` printed 29 unit filters for T-4404, but the runner takes at most 20 `-only-testing` filters; more send the
  run to the Mac mini, unbuilt, and nothing runs. Split them (20 + 9).

## Session 2026-11-26 03:xx ET (Idris, lane a3, from main f1ff0fdb7f)

- T-4405 f3aacaeffc: judge hands carryOut a closure that sets `ended` under the lock and calls exit once. Two
  mutants in Tests/mutants-t1852.json, both killed by hand (xc_mutants.py waits while the Mac mini is busy: exit 75).
- T-4406 17440be024: c's hold now ends on a flag set after b's turn returns; <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> 3 s. Mutant (no closedWriters
  check) killed.
- T-0793 a0973c1126, slice 1 only: App/Bridge/BackgroundRefresh.swift (read placed widgets, submit or cancel through
  a stub). Left on its line: BGTaskScheduler registration at launch, Info.plist keys (BGTaskSchedulerPermittedIdentifiers,
  UIBackgroundModes fetch), the run through WidgetWriter's pass, the 5.1 batch bound, 5.3 expiry handler, 7.2 loop
  breaker (status.json has no `background` field yet), `oom_guard`. Mutants 2 and 3 in Tests/mutants-t0793.json not run.
- No commit: T-4280 and T-1882 (unchanged from above); T-2021 needs a forced-lane Simulator bench of 40+ extension
  runs, not done; T-2044 not started as a commit: a drafted test (order of the gather naps against the runs instead
  of the 1.4 s clock bound) is in scratch T-4181-idris/t2044.py, unbuilt.
- The plan's build-for-testing runs the full unit suite on the MacBook (10-25 min with the queue); give a background
  xc.sh a 3600000 ms timeout.

## Settle and review, 2026-11-26 4:55 AM ET (Operator, lane a3)

- Main's T-2836 (3a71fc12c1) added `demoted:` to judge's carryOut call; the branch was settled onto main 322b5ed0e8
  keeping both. New hashes: T-4405 0c17be86bd, T-4406 68fcaad072, T-0793 slice 1 f1dce89d7d, note 3f6db36eee.
- Open, first thing next session: the mutant "guard-exit-leaves-ended-unset" in Tests/mutants-t1852.json no longer
  matches. Its find must end `        }, demoted: { $0.forEach(logReportDemotion) })\n` and its replace becomes
  `        WidgetLaneGuard.carryOut(decision, store: store, exit: exit, demoted: { $0.forEach(logReportDemotion) })\n`.
  Not committed: xc.sh refused for load (exit 75) for 20 minutes, so ExtensionLaneTests did not run at the settled tip.
- Review: Pernille 7fb1686fd5, nothing blocking; the stale mutant is its one non-blocking finding.

## Session 2026-11-26 8:16-9:10 AM ET (Idris, lane a2, from main d727ef2d05)

- fc1673810f (T-4181): the stale mutant "guard-exit-leaves-ended-unset" now matches (find ends with `demoted:`);
  applied and killed in J-20261126-0843-land-chk-a5ab71-1-558694.
- T-0793 ecc981092e, slice 2 only: Shared/RefreshBatch.swift, the 4.3 batch bound as a pure rule (Core; 8 tests, 8 of 8
  Core mutants killed in Core/mutants-t0793.json). Slice 1's mutants 2 and 3 in Tests/mutants-t0793.json: both killed
  by hand. Still left on its line: BGTaskScheduler registration at launch and the Submitting conformer, Info.plist keys
  (BGTaskSchedulerPermittedIdentifiers, UIBackgroundModes fetch), the run through WidgetWriter's pass calling
  RefreshBatch (T3 too) and a stored count of deferrals in a row, the 5.3 expiry handler, the 7.2 loop breaker
  (status.json `background`), `oom_guard`.
- T-2044 d158a596fd: the owed-widget wait test asserts the order of naps and runs, no 1.4 s bound; mutant 3 of
  bench/t2037-mutants.json killed. T-2046 14a2da6bf4: the early-ending test is ordered by turnsQueued and the nap
  (LaneSteps); mutants 1 and 2 killed. Neither re-run at a high load.
- Whole PyWidgetTests at 14a2da6b: 2511 run, 0 failed, 2 skipped (J-20261126-0829-land-chk-a5ab71-1-11dca8). Host 4388/0.
- No commit: T-4280 and T-1882 unchanged from above (nothing writes fields.json yet; RunLogExport's three strings for
  part 2 are already on main). T-2021: no bench records guard-to-clearMarker, and PYWIDGET_LANE_FORCED is only a
  compilation condition that no scheme sets; the p95 needs that harness built and a quiet runner (a busy host measures
  its queue). Not started.
- xc_mutants.py passes -collect-test-diagnostics, which keeps a run on the Mac mini (exit 75 when it is busy). By hand:
  plant, `xc.sh ... -only-testing:<test> test` through the runner, restore (scratch T-4181-idris/by_hand.py).

## Review, 2026-11-26 ET (Operator, lane a2)

- Pernille read d727ef2d05..51f461916a: nothing blocking. Non-blocking, for the next session:
  1. Mutant 2 of bench/t2037-mutants.json ("flag never resets") cannot be killed by the T-2046 test (one burst, `queued`
     never reaches 0); its <span title="A test written in advance. If it fires, we drop the idea.">kill</span> must come from the other two tests.
  2. ecc981092e's subject says "5.1"; the rule is ADR-007 4.3, and the note's "5.3 expiry handler" is 4.3 too.
  3. "queued-turn-runs-on-closed-lane" in Tests/mutants-t1852.json matches nothing (stale before this branch).
  4. `RefreshBatch.budget(.infinity)` gives 5, not 20: defensible, not covered by the ADR.

## Session 2026-11-26 12:05-2:30 PM ET (Idris, lane a2, from main 7eff1b673d)

- T-0793 37261505d9, slice 3 only: App/Bridge/BackgroundRefreshTask.swift. BGTaskScheduler as the Submitting conformer;
  `com.pywidget.refresh` registered in PyWidgetApp.init (the launches that write widgets); each firing sets its expiry
  handler first, reschedules, ends once (an expiry ends it at once, success false, and cancels the work); the scene
  entering the background reschedules under a background-task assertion. BackgroundRefresh.placedNow reads
  .lane-demoted.json for the (c) filter. project.yml and App/Info.plist: BGTaskSchedulerPermittedIdentifiers
  [com.pywidget.refresh] and UIBackgroundModes [fetch], held by BackgroundRefreshTaskTests against the built plist.
  4 new mutants in Tests/mutants-t0793.json, all killed by hand. Full unit suite with it 2557/0/2
  (J-20261126-1221-land-chk-a5ab71-1-0354fb); LaneWarmWindowTests 6/0 (the app launches with the registration).
  A firing runs no script yet. Still left on its line: the run through WidgetWriter's pass calling RefreshBatch (T3
  too) and a stored count of deferrals in a row, the second submit at the task's end (after that run), the ADR-007 4.3
  expiry marker (`expired`, `deferred`, `backgrounded`, `expired_runs`), the 7.2 loop breaker (status.json
  `background`), `oom_guard`. The Simulator never fires the task and refuses every submit: a real firing is T-0680's.
- T-2047 ff3eebfd17: testATurnWithNobodyOwedLongerLeavesTheWaitToTheNext (x owed longest runs at once, y gives way
  to o from its first nap; ordered by LaneSteps). Its mutant (flag taken above `guard !older.isEmpty`) is in
  bench/t2037-mutants.json, killed by hand (y wrote; J-20261126-1320-land-chk-a5ab71-1-126920).
- T-2099 a801f7a7e3: ExtensionLaneTests' helper defaults `headroom` to Stub(.max); 0 only in the tests about 0.
  LaneGuard's promise of a `headroom=unknown` shipping row (nothing wrote it) is cut; only the gate build's row has
  the column. Its build job's suite: 2559 executed, 3 skipped, 0 failed; the third skip (not one of the two Gallery
  ones) is outside ExtensionLaneTests and did not recur in the whole-suite run below.
- No commit: T-4280 (rule on main since c76347c124; the proof is T-4494 item 3, the Investors' iPhone) and T-1882
  (part 1 still needs B5/T-0678 to write and read fields.json; no Swift or runtime code writes it at 7eff1b673d).
  T-2021: not started; it needs a forced-lane bench (PYWIDGET_LANE_FORCED is set by no scheme) and a quiet runner
  for 20+ warm and 20+ cold guard-to-clearMarker timings. MERGE POINT reached at minute 115.
- Each build-for-testing through the runner runs the whole unit suite (10-15 min); the plan's unit filters are
  then answered from that job. A hand mutant costs one build (about 8-10 min each).
- Whole PyWidgetTests at a801f7a7e3 (XC_TASK=T-4181): 2558 executed, 2 skipped (the two Gallery snapshot tests, as on
  main), 0 failed (J-20261126-1404-land-chk-a5ab71-1-048f8a).

## Pernille's review of the merge point (2026-11-26, Idris, lane a2)

- Blocking, fixed in the T-2047 follow-up commit: the test's `mayRun` gate on "x" never ran (ExtensionLane.turn asks
  `mayRun` of `pywidget.premade.` ids only), so y was not held until x's turn was queued; the mutant was killed only
  when y queued inside x's 50 ms run, flaky on a loaded runner. The test now holds x's run itself (the helper's new
  `hold` closure) until y's turn is queued, so the burst never empties between them. Mutant entry unchanged.
- Comment fixed: BackgroundRefreshTask.register() returns false for an identifier not in Info.plist; a second
  registration (or one after launch) raises and ends the app.
- Open, no code change yet (non-blocking):
  1. WidgetWriter.placedNow turns a WidgetKit error into [], so a background firing that hits one cancels the
     pending request (no placed widget asks). An expiry before the submit has the same effect. Either way background
     refresh stops until the app next goes to the background. Whoever takes the firing's run (T-0793 next slice)
     should tell "WidgetKit failed" apart from "nothing placed" and keep the request on the first.
  2. testPlacedNowWithNoAppGroupStillAsks does not kill the "demotion list is not read" mutant (with no group there
     is no list to read). testPlacedNowReadsTheDemotionListBesideTheWidgets is the test meant to kill it; a mutant
     entry for it should name that test, not this one. Not re-run by hand in this pass.
  3. (Pernille's re-review of 100d07129d) The test's hold on x's run lets go after 2 s. If y's refresh stalls more
     than 2 s before its turn is queued, x's run ends, the burst can empty, and the mutant would pass when it should
     fail. No test hangs on it; it is a weak spot in the kill, not a hang.
- Checks for the follow-up: whole PyWidgetTests 2558/0 (2 Gallery skips, as on main), J-20261126-1425-land-chk-a5ab71-4-12b081;
  host_keep --task T-2047 42 suites, 4422 tests, 0 failed; the mutant re-run against the reworked test failed it in
  2 of 2 runs (`-test-iterations 2`, "Iteration 1 of 2" and "2 of 2" both failed), y wrote instead of giving way
  (ExtensionLaneTests.swift:836, ops/runs/xcodebuild-20261126-143755.log). Correction: the 100d07129d commit message
  says "5 tries"; that is wrong, the run had 2 iterations and failed both.
  xc_mutants.py printed NOVERDICT (exit 65, "no failed test") for that run although the log lists the failing test:
  its failure parser misses this log. A tool bug, not looked into here.

## Re-review, 2026-11-26 ET (Operator, lane a2)

- Pernille re-read 100d07129d: nothing blocking. The mutant's find string still matches, and it is now killed by
  ordering (hold(x) keeps `queued` at 2 or more until y's turn is queued); the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> cannot deadlock (every wait capped
  at 2 s). Her two non-blocking points are in the open list above (the 2 of 2 record, the 2 s stall).

## Session 2026-11-26 8:27-10:30 PM ET (Idris, lane a2, from main bd6dc016d5)

- T-0793 5900c71724, slice 4 only: Shared/RefreshBatch.swift gains `run` (one ADR-007 4.3 batch over a run closure:
  clock asked before each start, a run saying stop ends it, a cancelled task starts nothing more) and `deferredInARow`
  (+1 for time, 0 when started, unchanged by a stop). Core 14/0; 6 new Core mutants, all killed (mutation_check.py in
  scratch). Pernille's open item 1 done: `BackgroundRefresh.placedNow(nil)` (WidgetKit threw) submits at the floor and
  cancels nothing. Item 2 done: the demotion-list mutant entry no longer names testPlacedNowWithNoAppGroupStillAsks.
  NOT RUN: the new App mutant "slice 4 no WidgetKit answer reads as nothing placed" in Tests/mutants-t0793.json (one
  build by hand). Still left on its line: WidgetWriter's pass calling `RefreshBatch.run` from the firing (rows
  `deferred` for the rest, `bg_refresh` trigger), where the counts are kept, the end's second submit, the 4.3 expiry
  marker, the 7.2 loop breaker, `oom_guard`.
- T-4433 878fa7ebee, slice only: Lock Screen glyphs take no tap (`look == .circle` guard); tests updated; s10 has
  the runtime table, every cell open. Left: the three checks. The Mac mini has iOS 26.0 (iPhone 17) and 27.0 only, so
  the 26 column needs a local gate-<span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span> Lock Screen UI run; 18, 27.1, 27.2 and the phone are the Investors'.
- T-4436 (this commit): L1 (isExtension before taps off), L3 (`treeInLink` set by a linking Link, no tap inside),
  L4 (no `.isButton` on the face, source pin), L5 (planned-entry tap hosted, T-0430 scan message, stale mark on an age
  turn). L2 has nothing to change until taps off is wired; its fix is written on `treeTapsOff`'s doc comment.
- No commit: T-4280, T-1882, T-2021 (unchanged reasons above). T-4435: (a) is on main for 27.1 and 27.0; 27.2 is
  not installed and the Mac mini has no 27.1 device now, and (b) is a SpringBoard run on those runtimes.
- Whole PyWidgetTests at the tip's tree (XC_TASK=T-4181): 2654 executed, 2 skipped (Gallery), 0 failed
  (J-20261126-2209-land-chk-a5ab71-3-3154ff).
- Still open from before: the stale mutant "queued-turn-runs-on-closed-lane" in Tests/mutants-t1852.json, the
  ecc981092e "5.1" wording (4.3), not touched this session.
- 2026-11-26 11:40 PM (Idris): Pernille's T-4436 L3 block fixed in c24b4f1 (a T-4181 review-fix commit, 3.2 item 7): systemSmall keeps the glyph's tap inside an
  author's Link (s3.3). Red without the fix J-20261126-2255-land-chk-a5ab71-1-201d5b (systemSmall only), green and whole
  PyWidgetTests 2654/0 J-20261126-2259-land-chk-a5ab71-1-029ae5 (same tree as the tip), UI LaneWarmWindowTests 6/0
  J-20261126-2319-land-chk-a5ab71-2-43ac30, host 4464/0. The Operator folded the fix and its handoff line into that one
  T-4181 commit (same tree), so check shows no fault. Pernille's second read: nothing blocking; low, for the next
  session: TreeView.swift:698-699's doc comment has no systemSmall exception.
{% endraw %}

</div>
