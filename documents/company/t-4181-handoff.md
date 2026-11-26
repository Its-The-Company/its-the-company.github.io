---
layout: "default"
title: "T-4181 handoff (Operator, from Idris&#x27;s report, 2026-11-26 ET, lane a)"
section: "documents"
description: "This session resumed the 11-25 parked branch (parked/a/20261125-233308-38972) and did not start over."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4181-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4181-handoff.md</code></span></div><h1>T-4181 handoff (Operator, from Idris's report, 2026-11-26 ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a)</h1></div>

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
{% endraw %}

</div>
