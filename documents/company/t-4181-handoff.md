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

## Session 2026-11-27 12:19 AM-02:xx ET (Idris, lane a2, from main 48b783b922)

- Baseline at 48b783b9: PyWidgetTests 2662/0/2 (J-20261127-0020-land-chk-a5ab71-1-228b92).
- T-4589 839467f62b (finishes the step): the row's `deadline` mark compares `returned` (stamped right after the run)
  with `firstDue`; the two doc comments reworded (L2). testAJoinerLeavesTheRowOnItsFirstCallersDeadline (L1 a); both
  L1 mutants in Tests/mutants-t1852.json failed it by hand. L1 (b), an injectable upTo sleep, not done (optional).
  The stale mutant "queued-turn-runs-on-closed-lane" now matches (`await logClosed(id)`) and was killed. Unit 2663/0/2
  (J-20261127-0034-...-0695d5), LaneWarmWindowTests 6/0, host 4464/0.
- T-0793 23208589fb, slice 5 only: App/Bridge/BackgroundBatch.swift (the firing's filter, one RefreshBatch.run with
  WidgetWriter's 5 s budget, `deferred` rows with a reason, the deferral counts in widgets/.bg-deferred.json; a stuck
  run ends the batch); WidgetWriter.refreshBackground (`bg_refresh`, forced, joinable, counts: false);
  BackgroundRefreshTask.fire runs it between the start's and the end's reschedule. Unit 2668/0/2
  (J-20261127-0136-land-chk-a5ab71-3-502e3e), LaneWarmWindowTests 6/0 (J-20261127-0152-...-0118d4), host 4464/0.
  NOT RUN: its 5 mutants (Tests/mutants-t0793.json, "slice 5 ...") and the slice 4 one ("no WidgetKit answer reads as
  nothing placed"): first thing next session, by hand (scratch by_hand.py). Stale doc lines: RefreshBatch.swift's and
  BackgroundRefresh.swift's headers still say the pass is not wired. Left on the line: the 4.3 expiry marker, the 7.2
  loop breaker (status.json `background`), `oom_guard`. A real firing is T-0680's (the Simulator never fires one).
- No commit, unchanged reasons: T-4280 (proof is T-4494 item 3, the Investors' iPhone), T-1882 (part 1 needs B5/T-0678
  to write fields.json), T-2021 (needs the forced-lane Simulator bench, 20+ warm and 20+ cold, on a quiet runner),
  T-4433 (the Mac mini still has only iOS 26.0 and 27.0 runtimes; 18, 27.1, 27.2 and a phone are the Investors'),
  T-4435 (27.1/27.2 not installed).
- Still open: TreeView.swift:698-699's doc comment lacks the systemSmall exception (not touched: any Swift edit needs
  a build and the suite, and the session ran out).

## Pernille's review of slice 5, 2026-11-27 (Idris, lane a2)

- BLOCKING, NOT COMMITTED (3:06 AM ET: the build never started, Mac mini load 540; patch in scratch T-4181-idris/t0793-review-fix.patch): WidgetPasses runs the batch in
  an unstructured `Task {}`, so the firing's cancel never reached RefreshBatch.run's `Task.isCancelled` and an expired
  firing kept starting Python runs. BackgroundBatch.pass now wraps the pass in withTaskCancellationHandler; the cancel
  sets a lock-held `Stop` that the batch reads (RefreshBatch.run's new `stopped`) before each start. The pass's task
  itself is not cancelled, so a scene-active pass joined to it still gets its outcomes: the unrun ones come back
  skipped with their `deferred` row and keep `wants-run`, like the window's deferrals, and the background pass is
  `counts: false`, so the next activation's pass is not spaced out by it. Test:
  BackgroundBatchTests.testAnExpiryWhileARealPassRunsTheBatchStartsNoMoreWidgets. Stale headers of RefreshBatch.swift
  and BackgroundRefresh.swift fixed in the same commit.
- Open, non-blocking: (1) the 25 s clock starts at the batch, not the firing: the two WidgetKit reads before it and
  any wait behind an in-flight pass are uncounted. (2) A stand-down (console run waiting) sets that widget's count to
  0 though nothing ran. (3) The T-4589 joiner test's margins are 0.1-0.3 s (flaky on a loaded runner). (4) A firing
  cancelled while it waits behind another pass still waits that pass out (no Python start; the task has ended).

## Slice 5 taken off the branch, 2026-11-27 (Operator, lane a2)

- With Pernille's blocking finding unfixed and its fix untested, 23208589fb (T-0793 slice 5) is NOT on this branch:
  the branch holds T-4589 839467f62b and this note only. Restore, from main, in order (both in scratch
  T-4181-idris/): `git am t0793-slice5-23208589fb.patch`, then `git apply t0793-review-fix-from-425d683497.patch`
  (pywidget/ hunks; its handoff hunk is already in this file). Then build, show the new test red without the
  forwarding and green with it, run slice 5's 5 mutants and slice 4's one, the whole unit target, and Pernille re-reads.
- Pernille's review of 48b783b922..425d683497: nothing blocking on T-4589 (its joiner-test margins are open item 3 above).

## Session 2026-11-27 04:0x-5:30 AM ET (Idris, lane a2, from main 74a9479fa1)

- T-0793 08ab0da964, slice 5 with Pernille's blocking fix folded in (restored with `git apply` of both scratch patches,
  not `git am`, so nothing untested was committed). The new test
  BackgroundBatchTests.testAnExpiryWhileARealPassRunsTheBatchStartsNoMoreWidgets is red with the cancel forwarding
  removed ("run a", "run b", "run c"; J-20261127-0424-land-chk-a5ab71-2-15f7fa) and green with it. Mutants by hand
  (scratch by_hand.py, now honouring XC_TASK), each failed its named test: slice 5's 5 (J-20261127-0439-...-58b4eb,
  -0443-...-13e17f, -0447-...-136f7a, -0454-...-1148f9, -0458-...-30ebb2), slice 4's "no WidgetKit answer reads as
  nothing placed" (J-20261127-0434-...-34939c), and 2 new ones for the fix in Tests/mutants-t0793.json ("the expiry
  never reaches the pass's batch", "the batch ignores stopped"; J-...0424-...-15f7fa, J-20261127-0429-...-45d1f9).
  ADR-007 section numbers in T-0793's own doc comments moved to the renumbered ADR (8f3db3bcd5: triggers 4.1, not 5.1).
- T-4181 93e2233980: TreeRefreshButton's doc comment now states the systemSmall exception inside an author's Link
  (Pernille's low on c24b4f1). Comment only.
- Checks at the tip's tree: PyWidgetTests 2679 run, 0 failed, 2 skipped (Gallery), result.json complete
  (J-20261127-0503-land-chk-a5ab71-2-2372c0); LaneWarmWindowTests 6/0 (J-20261127-0520-land-chk-a5ab71-2-31291c);
  host 4468/0.
- The ecc981092e "5.1" wording stands only in that commit's subject (not editable); no doc comment says "5.1 batch
  bound". Still open, outside T-0793: about 12 other doc comments and test strings cite the pre-8f3db3bcd5 numbers
  (ADR-007 5.1 for triggers, 5.3 for stuck runs): WidgetWriter.swift:232, WidgetWriterTests.swift:1078,
  TreeTimelineTests.swift:200, RunLogRecorderTests.swift:273, RefreshScheduleTests.swift:8, WidgetStatus.swift:425,
  RefreshSchedule.swift:3, TreeTimeline.swift:209, CrashMarker.swift:35, RunLogRecorder.swift:10 and :325,
  RunRow.swift:293. One sweep commit by whoever owns those lines.
- No commit, reasons rechecked at 74a9479fa1: T-4280 (proof is T-4494 item 3, the Investors' iPhone); T-1882 (no Swift
  or runtime code writes fields.json yet); T-2021 (no scheme sets PYWIDGET_LANE_FORCED; needs the forced-lane bench
  on a quiet runner); T-4433 and T-4435 (the Mac mini still has only iOS 26.0 and 27.0 runtimes).
- Next: Pernille re-reads 08ab0da964 and 93e2233980. Then T-0793's next slice, the ADR-007 4.3 expiry marker
  (`expired`, `deferred`, `backgrounded`, `expired_runs`), then the 7.2 loop breaker and `oom_guard`. Her slice 5
  non-blocking points (1), (2), (4) above stay open. MERGE POINT not reached: 5 of 6 steps wait on things a session
  lacks.

## Pernille's re-review, 2026-11-27 ET (Operator, lane a2)

- Pernille read main...57356ba4e4: nothing blocking. The expiry's cancel sets Stop and RefreshBatch.run reads
  `stopped()` before each start; a joiner awaits the uncancelled pass task and gets the stopped outcomes; the new test
  is red without `stop.set()` or `stopped()`; the other 14 mutant finds in Tests/mutants-t0793.json match once each.
- Open, non-blocking, for the next slice:
  1. Tests/mutants-t0793.json:44 names testAFiringSetsItsExpiryThenReschedulesThenEndsOnceWithSuccess, since renamed
     (...RunsReschedules...); the entry's other test still kills the mutant.
  2. An expiry during the running widget's prune, Pro check or Python start (each up to 15 s) still starts Python:
     check `stopped` just before the start too (the closure at WidgetWriter.swift:280). "No Python start after an
     expiry" above is too broad until then.
  3. No test that a joiner gets the stopped outcomes.
  4. BackgroundRefreshTask.swift:36 is over the line width.
  Her slice 5 points (1), (2), (4) stay open.

## Session 2026-11-27 06:3x-07:5x ET (Idris, lane a2, from f037ca091d, one records commit behind main 7e333bbdb3)

- Baseline at f037ca09: PyWidgetTests 2710/0/2 (J-20261127-0649-land-chk-a5ab71-6-1522fd).
- T-0793 780eff7acd, slice 6 only: the 4.3 expiry marker for the run in flight. BackgroundBatch.Stop knows the batch's
  run in flight (began/ended, from the writer's `queued`); the firing's cancel hands it to WidgetWriter.expire, which
  lists it first (WidgetStatusStore.recordExpiry: `last_outcome` expired, `expired_runs`, this process's list), then
  `stopExpired`: PyBridge.noteExpired (`backgrounded` on that run's marker and RunInfo only; a firing has no scene, so
  the scene's line never came) and the stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>. The sink's existing listed check then writes the row `expired`. A
  run queued after the cancel is expired as it is queued. Pernille's re-review items 1-4 done: the mutant entry names
  the renamed test; the writer asks the stop just before it queues (an expiry during prune, Pro check or Python start
  queues nothing; stopped `deferred` row); a joiner test (WidgetPasses.waiting, tests only); the line width.
  Checks: unit 2716/0/2 (J-20261127-0719-land-chk-a5ab71-5-5985b0, same tree as the tip), LaneWarmWindowTests 6/0
  (J-20261127-0747-...-012467), host 4470/0. 8 new mutants, all failed their tests (J-...0733-...-14939f,
  J-...0737-...-1920a1, J-...0740-...-58b951; scratch by_hand_multi.py, batches in s6-batches.json).
- Known, documented on Stop: a run that returns after its last check and before `ended` can still be listed; status.json
  then says `expired` over its own outcome (no badge; row and tree stand). The expiry's reschedule is the start's
  submit, which stays pending (fire's doc comment). Not fixed, existing: an expiry before `fire` stores its work task
  would cancel nothing (iOS gives ~30 s, so not seen).
- Not started: the 7.2 loop breaker. It needs a design call first: LoopBreaker.decide exists in Shared/WidgetStatus.swift
  with no caller; where `background` is written (the sink and launch recovery both write rows) and who reads it (the
  firing's filter, T3 `shortcut` runs, the extension's `system` runs?) are not settled by ADR-007 7.2. Then `oom_guard`.
- No commit, rechecked: T-4280 (proof is T-4494 item 3, the Investors' iPhone); T-1882 (nothing writes fields.json yet);
  T-2021 (no scheme sets PYWIDGET_LANE_FORCED; needs the forced-lane bench on a quiet runner); T-4433 and T-4435
  (this Mac has only iOS 26.0 and 27.0 runtimes). MERGE POINT: no (1 of 6 steps; the other 5 wait on the above).
- Next: Pernille reviews 780eff7acd. Her slice 5 points (1), (2), (4) stay open.

## Pernille's review of slice 6, 2026-11-27 ET (Operator, lane a2)

- Pernille read 780eff7acd and b7ccc16a15: nothing blocking; review record f4640fca19. The 8 new mutants each match
  once and name a test that kills them; ADR-007 4.3 and 7.2 cited correctly.
- Open, non-blocking, for the next slice:
  1. Five new lines over 120 characters: BackgroundBatch.swift:10, WidgetWriter.swift's `waiting` doc comment, and
     three lines in BackgroundBatchTests.swift.
  2. If noteExpired runs while the run is still queued and the run then starts before stop(), its crash marker never
     says `backgrounded` (recovery still finds it in expired_runs). Low.
  3. From slice 5: a firing that joins a pass already running never expires that pass's run in flight. Low.
- Next on T-0793: the 7.2 loop breaker needs a design call on where status.json `background` is written and read.

## Session 2026-11-27 8:53-10:10 AM ET (Idris, lane a2, from main 15288f6d7b)

- Baseline at 15288f6d: PyWidgetTests 2730/0/2 (J-20261127-0853-land-chk-a5ab71-5-358476).
- T-0793 17e8665241, slice 7 only: the 7.2 loop breaker. The design call is a dated line in ADR-007 7.2 (for Pernille's
  review): RunLogRecorder applies LoopBreaker.decide in the hold of every widget row it writes (run, lane turn, not
  started, launch recovery), after the row's status write, from the newest 64 KiB of runs.jsonl
  (RunLogStore.recentRows); status.json `background` is written only as `false` and removed on a <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> `ok`. T2 reads
  it through BackgroundRefresh.widgets, so RefreshAsks.asks keeps the widget out of the firing and the ask.
  testFourForgedExpiryKillsDemote now expects the fourth forged kill's `background=false` (the file otherwise
  unchanged; three kills write nothing). 8 mutants in Tests/mutants-t0793.json, all failed their tests by hand
  (scratch by_hand_multi.py, s7-batches.json; J-20261127-0936-...-384bb9, -0946-...-486d26, -0952-...-58856d,
  -0956-...-07feb8). Checks: PyWidgetTests 2738/0/3 at the tip's tree (J-20261127-0936-land-chk-a5ab71-3-09ca0b;
  the third skip is ProStoreTests/testAskToBuyDeclinedGrantsNothing, not in this change), LaneWarmWindowTests 6/0
  (J-20261127-0959-land-chk-a5ab71-1-1985e6), host 4494/0.
- Known limits, written in the code and the ADR line: a streak running back past 64 KiB counts short (no demotion);
  history from before this build counts only once the next counted row arrives.
- Left on T-0793: T3's batch (Refresh Widgets from Shortcuts) and the extension's `system` runs do not read
  `background` yet (each needs its own ADR line), then `oom_guard`. A real firing is T-0680's.
- No commit, rechecked at 15288f6d: T-4280 (proof is T-4494 item 3, the Investors' iPhone); T-1882 (no Swift or runtime
  code writes fields.json); T-2021 (no scheme sets PYWIDGET_LANE_FORCED; needs the forced-lane bench on a quiet
  runner); T-4433 and T-4435 (this Mac still has only iOS 26.0 and 27.0 runtimes).
- Core `swift test` does not build at 15288f6d (WidgetBadge.swift: `SentStale` not in the package); not mine, not
  touched. Pernille's slice 6 lows (1)-(3) and slice 5 points (1), (2), (4) stay open.
- Next: Pernille reviews 17e8665241.

## Session 2026-11-27 10:15-11:10 AM ET (Idris, lane a2, Pernille's review of 17e8665241)

- Blocking fixed in 299c8913fa (a new commit, not an amend): a firing picked its widgets before the launch pass
  (afterStart, inside each widget's refresh) recorded the last launch's kill, so a second kill demoted the widget only
  after the pick and it ran a third time. Now, on bg_refresh, WidgetWriter.refresh reads `background` again
  (BackgroundRefresh.background) after the launch-log step and before queueing, and skips a demoted widget with no row.
  The pin is BackgroundBatchTests.testASecondKillTheLaunchPassFindsKeepsTheWidgetOutOfThatFiring. With the mutant it is
  red: rows [killed, killed, deferred], a run queued. Green in J-20261127-1035-land-chk-a5ab71-1-550a73.
- Her lows: (2) taken: RunLogRecorderTests.testARunThatNeverStartedChecksTheLoopBreaker plus a mutant. (3) and (4) are
  now worded correctly in the ADR line and RunLogRecorder.applyLoopBreaker. A lost restore write waits for the next T1
  `ok`, and old history counts at the next row of any kind. The behaviour itself is unchanged. (1) stays open: a
  `leavesStatus` row still counts in the next row's streak.
- The mutant "wants-run is not read" had been stale since 17e8665241. It is repointed. All three mutants failed their
  tests together, with the sources restored and their hashes checked (J-20261127-1039-land-chk-a5ab71-1-3665b0).
- Checks: host 4494/0, LaneWarmWindowTests 6/0 (J-...1043-...28a142), PyWidgetTests at 299c8913 2740/0/2
  (J-20261127-1047-land-chk-a5ab71-1-3793ec).
- Check: "FAULT T-0793 is in 2 commits (17e8665241, 299c8913fa)". Folding them is the Operator's call, since I was told
  not to amend or rebase.
- Next: Pernille re-reviews 299c8913fa.

## Fold and re-review, 2026-11-27 11:20 AM ET (Operator, lane a2)

- Folded with an identical tree: 17e8665241 and 299c8913fa are now one commit, 5231410274 (T-0793 slice 7, the
  loop breaker with its fix; the message keeps both parts). The handoff commits 00118b1fe4 and 46553fe325 are now
  3926fabeb6. The hashes in the two sections above are from before the fold.
- `check`: MERGE POINT: yes (hand-in time, 134 minutes), so no further step started this session.
- Pernille re-reviewed 15288f6d7b..3926fabeb6: blocking none. Lows still open: (1) in the race the firing's ids now
  cover every placed widget, so a scene-active pass can join it, and the demoted widget comes back skipped and misses
  its T1 run that activation (WidgetWriter.swift:860 against :475); (2) `leavesStatus` rows still count in the next
  row's streak.
- Still left on T-0793: T3's batch and the extension's `system` runs read `background`; `oom_guard`.

## Session 2026-11-27 12:2x-13:3x ET (Idris, lane a2, from main db8652ae3f)

- Baseline at db8652ae: PyWidgetTests 2762/0/2 (J-20261127-1224-land-chk-a5ab71-2-49e8d2).
- T-0793 924ce8613e, slice 8 only: T3 reads `background`. WidgetWriter.readsBackground(trigger) is the loop breaker's
  own background side (`bg_refresh`, `shortcut`); the slice 7 fix's re-read after the launch-log step asks it, so the
  Refresh Widgets intent skips a demoted widget with no row. A tap (`intent`) and T1 still run it. ADR-007 7.2 dated
  line for slice 8 (for Pernille). Test BackgroundBatchTests.testT3LeavesOutAWidgetTheLoopBreakerTookOffButATapAndT1StillRunIt;
  2 new mutants killed by hand (J-20261127-1256-...-00b969, J-20261127-1301-...-034dc7); the slice 7 fix mutant's find
  follows the new line (not re-run). Unit 2763/0/2 (J-20261127-1238-land-chk-a5ab71-1-20941d), LaneWarmWindowTests 6/0
  (J-20261127-1251-...-1367b5), host 4524/0.
- T-4181 (this commit): Pernille's slice 6 low (1), line widths, comments and test wraps only; also two of slice 8's
  own lines. Unit 2763/0/2 at this tree (J-20261127-1307-land-chk-a5ab71-1-455c9f). Older over-width lines in
  BackgroundBatchTests.swift (slice 5) left as they are.
- Not started, needs a design call first (and a second T-0793 commit in one branch is a check FAULT, so it is the next
  session's):
  1. The extension's `system` runs reading `background`. Finding: for a `lane: widget` widget, every path that sets
     `background=false` from extension runs already moves it out of the lane (a marker is `killed`, demoted at once; a
     run past the 2.0 s budget is a time move). The case left is two kills of a lane widget in the app on `shortcut`
     (T3 runs every placed widget): then the extension's own runs are not the loop. Whether the extension should still
     skip it ("runs only on T1") is for Pernille and Ines; my lean is no code, an ADR line saying why.
  2. `oom_guard` for the app's background batch (ADR-007 6: margin per widget at its start, refusal `oom_guard`, no
     badge, the batch goes on). Open: the app records no per-widget peak above baseline (`peak_mb` is the lifetime peak,
     only when a run raised it), so the need is 2 x 13.4 MB for every widget until one is kept; and "no badge" against
     7.2's oom_guard_since rule (a background refusal must not start the 60 s badge clock).
- No commit, rechecked at db8652ae: T-4280 (proof is T-4494 item 3, the Investors' iPhone); T-1882 (nothing writes
  fields.json); T-2021 (no scheme sets PYWIDGET_LANE_FORCED; needs the forced-lane bench on a quiet runner); T-4433 and
  T-4435 (the Mac mini has only iOS 26.0 and 27.0 runtimes; 18, 27.1, 27.2 and a phone are the Investors').
- Next: Pernille reviews 924ce8613e and this commit.
- Pernille's review of 924ce8613e and a1b4a81516 (11-27, lane a2): none blocking. Non-blocking, for the next session:
  1. (Low, her 11-27 Low 1, now wider) T3's ids always match T1's, so a scene-active pass that joins a T3 pass gets
     the demoted widget back as skipped (WidgetWriter.swift:873), and T3's `last` spaces a T1 within 30 s (:875):
     Shortcut-then-open misses the T1 restore on that activation. The test uses a fresh WidgetPasses each time, so it
     cannot see this. Fix it, or say it on the ADR-007 line.
  2. Add the T3 test to the slice-7 fix mutant's `tests` (Tests/mutants-t0793.json:290) and re-run that mutant: it was
     not re-run after its find changed.
{% endraw %}

</div>
