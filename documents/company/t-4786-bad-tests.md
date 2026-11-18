---
layout: "default"
title: "T-4786: the tests that held a merge without the change being wrong"
section: "documents"
description: "Pernille, 11-17 8:00 PM ET. Answers an Investor on #41 (c6963972184, 6:23 PM; c6965124089, 7:26 PM) and the 17:19 ruling (a red must mean broken behaviour, never a bad test). Window: 11-10 00:00 to 11-17 19:45 ET."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4786-bad-tests.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4786-bad-tests.md</code></span></div><h1>T-4786: the tests that held a merge without the change being wrong</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 11-17 8:00 PM ET. Answers an Investor on #41 (c6963972184, 6:23 PM; c6965124089, 7:26 PM) and the 5:19 PM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>
(a red must mean broken behaviour, never a bad test). Window: 11-10 12:00 AM to 11-17 7:45 PM ET.

Sources, read-only: ops/metrics/main_gate.jsonl (`suite_red`, `fails`, `suite_deflake`, `quarantined` rows),
ops/metrics/land_xc.jsonl (MacBook land jobs), ops/metrics/xc.jsonl and its ops/runs/xcodebuild-*.log files,
ops/land_quarantine.txt, ops/xc_rerun_tests.txt, tests/heavy_slot_test.py, board notes, and Odalys's T-4787 cause
table (ops/plans/T-4787-red-causes.md, on main since 11-17 evening). T-4787 owns the
count of red lands by cause; this file does not recount it. It names the tests, their root cause and their fix.

Root-cause words used below: **timing** (a fixed sleep or a wall-clock bound), **load** (green alone, red at land load),
**shared state** (another run or an earlier row changes what the test reads), **environment** (the machine, Simulator or
checkout, not the code), **source text** (the test reads code instead of running it), **runner time-out** (the wait for
a result ran out; no verdict at all).

## Ranked by the lands each cost (most first)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Ranked by the lands each cost (most first), scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| # | test | lands held | root cause | state |
|---|------|-----------|------------|-------|
| 1 | Host suites cut at their time limit: personal_pool_test.sh (7 of its 9 reds), supervisor_test.sh (3), personal_off_test.sh (2), <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> host step at its 1,445-1,509 s limit (T-4227, 8 lane reds) | about 20 | runner time-out under load: the suite is long (supervisor median 544 s, personal_pool 238 s) and the limit is 360 s of work scaled by load (T-3888) | open: see "Next" |
| 2 | ProStoreTests/testAskToBuyDeclinedGrantsNothing | 5 xc lands on 11-10 (11 since 11-07) | environment: StoreKit's test session lists a deferred request as an entitlement with 5-6 Simulators at once | test reworked to judge the app's grant rule over what StoreKit listed; on ops/xc_rerun_tests.txt; no red since 11-10 8:12 AM |
| 3 | site_test.sh "App is a main page ... the seven diagrams" | 4 lane reds (T-4663, T-4669) | source text: a fixed count of diagrams | fixed by T-4756, f7403c95e5 (one diagram per declared part) |
| 4 | Browser page-load time-outs: site_live_test.py (3), site_t2940_test.py, site_t3201_test.py, lane b44 box rows | 6 | load: Playwright's 30,000 ms `goto`/`click` limit on a loaded host; green on the same tree | open |
| 5 | personal_land_test.sh ("not a git repository", "Could not access 'HEAD'", main_green row) | 4 (T-4115, T-4129, T-4718, T-4755) | environment: fixture runs git outside a repository; red on main too | quarantined, fix line T-4726 (Odalys) |
| 6 | disk_sweep_test.py t3691_holder_check_is_fast_on_a_big_temp_folder | 3 (T-3995, T-4560 x2) | timing: wall-clock bound, 2.3-5.8 s at load 50 | fixed earlier by T-4560: CPU time, not wall time; no red since |
| 7 | supervisor_test.sh "a passed close_by: session_end.py stops the work session" | 2 (T-3992, T-4665) + quarantined | shared state and load (same row red for two unrelated tasks) | quarantined, fix line T-3118; open |
| 8 | site_test.sh "nothing changed: no second commit" | 2 (T-4287, T-4488) | shared state (same row red for two unrelated tasks) | open |
| 9 | bridge test_runner.py test_swallow_ends_by_hard_stop_twice | 2 lanes (T-0622, T-3552) | load: a 1.95-5.0 s window on the hard stop | open |
| 10 | heavy_slot_test.py | 2 (T-4655, T-4749) | timing: a 1.5 s start race, then a 3 s `with_timeout` budget at load 60 | fixed: 5274377036 (race), 199951063a (T-4769, holders wait on go files); out of quarantine |
| 11 | UITestLaunchScanTests (lists UI tests that launch XCUIApplication directly) | 2 xc lands (T-4212, T-3764) | source text; it caught a real rule breach in each new UI test file | kept: the red named the offending file; listed so the rule is judged under T-4749's source-text review |
| 12 | `pywidget:widgets` host suite, green on the same tree | 2 (T-3848, T-4653) | unknown: the failing row was not kept | open; the cause was not captured |
| 13 | PromptDeskTests alert-timeout timing | 1 xc land (T-4662, J-20261117-1216-land-m3-53ed1c, 12:28 PM 11-17) | timing: slept to 3.0 s, then a 3.75 s upper bound on a real main-queue timer | **fixed now**, see "Fixed" |
| 14 | queue_check_test.py "each event's row holds its time, under 3 s" | 1 (T-4196) | timing: 3.5-4.7 s measured | open; check whether a later rewrite removed it |
| 15 | main_folder_guard_test.py | 1 (T-4665) | runner time-out: the test's own subprocess limit, 43.9 s | open |
| 16 | systls test_ten_mib_bodies_in_small_pieces_are_linear | 1 lane (T-4672) | timing: a speed test | open |
| 17 | Stale rows fixed in the test: board_tick_test.py fixture (T-4694), personal_land_product_test.sh mutant (T-4665), personal_pool_test.sh row (T-4665), lane_env_test.py (T-4677) | 4 | shared state: fixture or mutant out of date, red on main | fixed: 92521ed099, 5274377036; lane_env T-4725 open |
| 18 | ShortcutRecipeTests writing PNGs | 0 lands, 4 tasks' <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs | environment: wrote six PNGs into the checkout on every run | fixed by T-4758, 2bdcb20e18 (Idris): written only when PW_SHORTCUT_SHOTS_DIR names a folder |

</div>


Not on the list: three xc lands red because a new test file did not compile (AcknowledgementsUITests, LaunchRunLogTests,
EditorToolingTests). The test was new and wrong, so the change was wrong; a compile error is broken code.

## Runner time-outs

Tonight's land job **J-20261117-1919-land-m4-23c537** (T-2296, Idris) returned no result within 540 s and main_gate
exited 75. What the records hold:

- ops/metrics/land_xc.jsonl has one row for it: `queued` at 7:19:26 PM. No `started` row, no `result` row, and no row
  saying the 540 s wait ran out. The only record of the exit 75 is the gate's stdout in the worker's session log
  (ops/runs/20261117-191001-work.jsonl).
- The job did run and **passed**: `python3 tools/xc_route.py status J-20261117-1919-land-m4-23c537` reads "passed,
  exit 0, 495.4 s, 2046 executed, 0 failures" (runner log xcodebuild-20261117-192116.log, started about 7:21 PM). Two
  minutes of queue plus a 495 s run is past the gate's 540 s. The next try was refused because main had moved, so
  nobody read the green result into land_xc.jsonl, and T-2296 queued again as m6 (7:34 PM) and m7 (7:54 PM): two more full
  runs for a change that had already passed.
- So the cause **was not captured** in any record a tool reads, and it is not a failure: one land job runs 440-610 s
  (tonight: 441, 492, 495, 608 s), the gate waits 540 s, and the runner takes one job at a time. Any land queued behind
  another job, or one whose own run is over 540 s, gets exit 75.
- This task's own land showed it end to end: J-20261117-1951-land-m5-062530 waited out at 540 s (exit 75), then passed
  in 492.4 s; the commit was then refused twice because main moved in files the app build reads during the 2-8 minutes
  of host suites and waiting (T-2296's Gallery land, 3a5c74b44e). The third try, J-20261117-2007-land-m5-19a643
  (441.3 s), landed. Three runner jobs for one test file.

The root cause is a wait budget shorter than one job, plus records that drop the wait's outcome. The fixes are in
hub tools that lanes run (tools/main_gate.py, tools/land_xc.py), so they go to their owners as notes, not edits from
here:
1. land_xc.py: write `started` when the runner checks in with a job, `waited_out` (job, queue position, the job ahead)
   when the 540 s wait ends, and `dropped` when a job is superseded or its ref is deleted, so every exit 75 has a row
   with its reason.
2. main_gate.py: size the wait from the queue (the jobs ahead times their median run, plus this job's median run), or
   say at queue time "N jobs ahead, about M min", so exit 75 is expected, not a surprise.
3. main_gate.py: when main moves during the wait, read the finished job before refusing, and requeue only if main moved
   in files the job's key reads. Tonight a passed job was thrown away twice. This overlaps T-4792 (lane b, retest what
   failed in the gate); its owner should decide.

## Fixed


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Fixed, scrolls sideways" style="--tw:1054px" markdown="1">

| test | root cause | fix | commit |
|------|-----------|-----|--------|
| PromptDeskTests (testAlertBudgetRunsOutIsDismissedAtItsTimeout, testATapAfterTheTimeoutSendsNothing, testATimeoutWhileItIsPlacedIsNotOverriddenByALatePlacement, testTheBridgePassesTheTimeoutAndTheAlertGoesAtIt, testStopWhileTheAlertIsUpTakesItDown) | timing: a fixed sleep to 3.0 s, then a 3.75 s bound on a main-queue timer | No fixed sleep: the alert is sampled on screen while waiting until the desk takes it down. The lower bound, never before Python stops waiting, stays exact. The upper bound allows main-queue lateness (one named constant, 2 s) and still catches an alert that stays up. The Stop bound is 5 s, against the 30 s timeout. db804b4ac2 (runner J-20261117-2007-land-m5-19a643: 2046 executed, 0 failures) |
| heavy_slot_test.py (earlier today, T-4769) | timing and load | holders wait on go files, not a 3 s budget | 199951063a |

</div>


Review owed (Commandment 13): the PromptDeskTests change is a test change headed for TestFlight builds; Idris owns the
prompt desk and should review it without my reasoning.

## Next (in order of lands saved)

1. Host suites cut at their limit (#1): split supervisor_test.sh and personal_pool_test.sh by part, so each part has its
   own median and limit and a cut names the part. Find which rows wait on fixed sleeps.
2. Browser page-load time-outs (#4): wait for the page's own ready marker with a deadline taken from the suite's load
   budget, not Playwright's flat 30 s, and keep the failing step in the row.
3. Shared-state rows (#7, #8): give each row its own temporary repository and supervisor state, not one shared fixture.
4. bridge hard stop window (#9), systls linear speed test (#16), queue_check 3 s row (#14): assert counts or order
   (bytes copied per piece, the stop path taken), not seconds.
5. Keep a failing row for every red (#12): the host runner should keep the first failing row, not only "stopped at the
   first red".
{% endraw %}

</div>
