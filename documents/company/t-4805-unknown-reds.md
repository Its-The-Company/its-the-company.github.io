---
layout: "default"
title: "T-4805: a cause for every failed merge"
section: "documents"
description: "Odalys, 11-18 7:15 PM ET. Answers an Investor on #41 c6965124089 (7:26 PM 11-17: &quot;Investigate all issues that failed due to an unknown reason \u2013 ensure that reasons are always captured, and resolve the root causes&quot;)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4805-unknown-reds.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/T-4805-unknown-reds.md</code></span></div><h1>T-4805: a cause for every failed merge</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 11-18 7:15 PM ET. Answers an Investor on #41 c6965124089 (7:26 PM 11-17: "Investigate all issues that failed due to an unknown reason – ensure that reasons are always captured, and resolve the root causes"). Starts from ops/plans/T-4787-red-causes.md: 134 red lands 11-10 to 11-17, 48 with no known cause (28 gate, 13 MacBook Xcode, 7 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>).

## First slice: the lanes' land (11-18, 7:15 PM ET)

The lane lander (tools/personal_land.sh) now writes a cause, the failing check and the kept log on the last row of every held land in ops/runs/land_steps.jsonl. Before, that row said only "held".


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: First slice: the lanes&#x27; land (11-18, 7:15 PM ET), scrolls sideways" style="--tw:404px" markdown="1">

| cause | when |
|---|---|
| conflict | the rebase onto main conflicted or stopped |
| time-out | exit 124 or 143, or a time limit |
| runner | the MacBook job or its runner |
| leftover | a test's process outlived the tests |
| red | a check failed; whether the test or the change is to blame is settled later (land_fix's comparison with main, tools/test_health.py) |
| rule | a land rule refused it (owned path, link, marker, worktree, push) |
| unknown | none of these; the tick log then says "held with no known cause, a fault of the lander (T-4805)" |

</div>


The check is every suite the kept log calls red (tests/run.sh's Red: line and the host's FAIL, TIMEOUT, EMPTY, MISSING lines), or the step (rebase, host, xc, push) when the log names none. Tests: four rows in tests/personal_land_test.sh part 7.

## The 7 lane unknowns, read again

T-4787 put 5 of the 7 lane unknowns down as "no rows kept". That was my mistake: 4 of them had kept logs under ops/runs/personal-land-<lane>-<time>.log, which I did not open.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The 7 lane unknowns, read again, scrolls sideways" data-n="1 3" style="--tw:1200px" markdown="1">

| T-4787 # | when | lane | kept log | what it shows | cause now |
|---|---|---|---|---|---|
| 1 | 11-10 12:46 AM | b52 | none for that time (b52's kept logs are from 11-08 and 11-09) | nothing | unknown (no log) |
| 13 | 11-10 5:06 AM | a2 | personal-land-a2-20261110-050639.log | bridge test_stop_still_reaches_atexit: ('interrupted', None) != ('exit', 3) | red (test or code not settled) |
| 14 | 11-10 5:23 AM | b3 | personal-land-b3-20261110-052315.log | xc_route_test.py "the real project's run paths stay bounded" | red (test or code not settled) |
| 41 | 11-12 7:36 AM | b40 | personal-land-b40-20261112-073612.log | personal_off_test.sh "launchd's stop reaches the session through the tick" (T-4787 named these rows already) | red (test or code not settled) |
| 105 | 11-16 5:09 PM | a44 | not opened in this slice | rows about SSD sizes (named in T-4787) | red (test or code not settled) |
| 108 | 11-16 9:01 PM | a45 | personal-land-a45-20261116-210144.log | lane_landcheck_test.py, 4 errors in 501.8 s; the same suite on main passed in 108.7 s | probably load (4.6 times main's time); the error rows are not kept |
| 126 | 11-17 11:18 AM | a2 | personal-land-a2-20261117-111805.log | site_test.sh "T-4240: App is a main page ... the seven diagrams" | bad test (the same row as T-4787 #120-124, fixed in the test by T-4756) |

</div>


So of the 7 lane unknowns, 1 moves to bad test (#126), 1 is probably load (#108), 1 stays unknown with no log (#1), and 4 are a red check whose side (test or code) the records still do not settle; 2 of those 4 (#13, #14) had no failing check named before.

## Second slice: the merge gate and the merge queue (11-18, 8:30 PM ET)

The merge gate (tools/main_gate.py) now writes a cause, the failing check and the kept log on every red or refused row in ops/metrics/main_gate.jsonl, in the same words as the lanes:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Second slice: the merge gate and the merge queue (11-18, 8:30 PM ET), scrolls sideways" style="--tw:1194px" markdown="1">

| row | cause | check | log |
|---|---|---|---|
| a tests/ suite red (suite_red) | bad test when main's tip is red in the same rows; time-out when only a time limit stopped it; else red | the suite | .git/main-gate/red/ (as before) |
| a host suite red (pywidget:*) | red; time-out (TIMEOUT); runner (no line, or EMPTY) | pywidget:&lt;suite&gt; | the run's output, kept for the first time; its red lines are on the row |
| an Xcode red (red) | time-out on exit 124 or 143; else red | the job | origin/macbook-results:ops/jobs/&lt;job&gt;/result.json (xc here: its log kept) |
| the hook refused (refused, host_refused, suite_refused) | rule | xc, or the suites with no pass | none: nothing ran |
| main changed a named file (land_conflict, new) | conflict | settle | none |

</div>


A red or refused row written without a cause gets "unknown", and the gate prints that this is its own fault. The merge queue (tools/merge_queue.py) puts the same cause, check and log on its red entries, and keeps the failing check's output as ops/runs/merge-queue-red-&lt;time&gt;-&lt;check&gt;.log; before, it threw that output away. Tests: tests/main_gate_test.py class CausesT4805 and tests/merge_queue_known_red_test.py.

## The 13 Xcode unknowns, read again

Method: for each red job, the failing tests in its result.json, the next green job for the same task, and what changed between the two commits in the task's own files (main's own moves set aside). Read-only; nothing was refused.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: The 13 Xcode unknowns, read again, scrolls sideways" data-n="1" style="--tw:1125px" markdown="1">

| T-4787 # | when | task | failing test(s) | what changed red to green | cause now |
|---|---|---|---|---|---|
| 40 | 11-12 6:38 AM | T-4152 | ExtensionLaneTests/testARecordOnlyKilledRowSaysHowFarTheDeadRunGot | the test only (an exact value became NotNil) | bad test |
| 43 | 11-12 10:34 AM | T-3757 | 3 BridgeTests, 3 WidgetStepTimeoutTests | App/Bridge/WidgetWriter.swift only | code |
| 45 | 11-12 11:04 AM | T-4176 | ProjectStoreTests/testM1NewFile... | editing the test did not fix it; the product fix (ProjectStore.writeNew) did | code |
| 47 | 11-12 11:15 AM | T-4176 | the same test | as #45 | code |
| 48 | 11-12 11:25 AM | T-4176 | testM1ConflictCopy..., testM1NewFile... | ProjectStore.swift, ProjectTransfer.swift | code |
| 50 | 11-12 11:51 AM | T-4198 | BridgeTests/testT4198AFailedPythonStartPrunesTheRunLogOnceADay | the test came without its product code; the green added it | code |
| 52 | 11-12 3:22 PM | T-3852 | BridgeTests/testNoPreviewPathBypassesTheKey | the test's allowed-files list only | bad test (a list in a test) |
| 61 | 11-12 11:15 PM | T-3900 | 3 WidgetStepTimeoutTests (3.19 s, not under 0.6 s) | nothing: the same files passed 9 min earlier and landed unchanged | bad test (clock) |
| 62 | 11-12 11:48 PM | T-3895 | ExtensionLaneTests/testAStuckBridgeAtQueueingIsTheClosedLane | the test only (read the wrong field) | bad test |
| 64 | 11-13 9:53 AM | T-4258 | build: GatedEngine does not conform to CodeEditorEngine | one line in a test stand-in, after the change added a protocol method | code (see note) |
| 78 | 11-15 9:01 AM | T-4504 | PremadeSnapshotTests/testClocksSmallDrawsTheWidestPairWhole | the test's deliberately broken copy only | bad test |
| 86 | 11-15 3:28 PM | T-4468 | PremadesTests/testTheBuiltAppHoldsTheTwelve... | the test's list of files in the app only | bad test (a list in a test) |
| 129 | 11-17 12:28 PM | T-4662 | PromptDeskTests/testTheBridgePassesTheTimeoutAndTheAlertGoesAtIt | not the task's test; T-4786 later fixed the test's fixed sleep | bad test |

</div>


7 move to bad test, 6 to code. Note on #64: T-4787's rule calls a test that does not build a bad test; here the change altered a protocol and missed a test stand-in, so I count it as the change's. By the strict rule it is 8 and 5.

## The 28 gate unknowns, read again

Same method on the gate's rows: each suite_red row, the next pass of the same suite for the same task, and what changed in between; where nothing changed, whether the suite's content key was the same (the same inputs passed later). The kept red logs from before 11-15 are gone (the gate keeps 40).


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: The 28 gate unknowns, read again, scrolls sideways" data-n="1" style="--tw:973px" markdown="1">

| T-4787 # | task | check | what changed red to green | cause now |
|---|---|---|---|---|
| 4 | T-3995 | main_gate_test.py | the test only | bad test |
| 7 | T-3997 | report_flow_test.py | nothing (same key passed 12 min later; a live count in the row) | bad test |
| 10 | T-3996 | site_work_test.py | the test (its comment: the row was red on main) | bad test |
| 16 | T-3993 | site_test.sh | the test only | bad test |
| 23 | T-3978 | xc_sim_test.py | tools/xc_sim.py on main gained 2 scripts; the task never touched it | code (main's, not the change's) |
| 24 | T-3386 | site_timeline_test.py | the test only | bad test |
| 28 | T-4012 | personal_land_product_test.sh | tools/personal_land.sh's floor missed pywidget/tools | code |
| 32 | T-3995 | site_live_test.py | nothing (same key passed later); no failed row kept | not the change: bad test or time-out |
| 34 | T-4115 | ssd_recover_test.py | nothing (same key; a clock value in the row) | bad test |
| 36 | T-4115 | personal_land_test.sh | the test only | bad test |
| 37 | T-4093 | pywidget:privacy | both privacy manifests gained Apple's reason | code |
| 39 | T-4093 | pywidget:widgets | a test file only | bad test |
| 44 | T-3784 | pywidget:bridge | the test wrote .pyc files where macOS blocks it; fixed in the test | bad test |
| 46 | T-3784 | pywidget:bridge | nothing (same key passed 6 min later) | bad test |
| 49 | T-4162 | site_session_chart_test.py | nothing (same key) | bad test |
| 53 | T-4136 | site_test.sh | tools/site/ops_look.py now inlines the portraits; the rule was right | code |
| 56 | T-4232 | site_build_unit_test.py | the test raised its own size budget | bad test |
| 68 | T-1440 | pywidget:bridge | nothing (same key); no output kept | not the change: bad test or time-out |
| 70 | T-4313 | home_now_line_test.py | the test only | bad test |
| 73 | T-4129 | personal_land_test.sh | T-4485 fixed this fixture's timing in the test | bad test |
| 80 | T-4525 | pywidget:widgets | nothing (same key) | not the change: bad test or time-out |
| 81 | T-4511 | site_money_wording_test.py | the test only | bad test |
| 84 | T-4468 | pywidget:tooling | both test and code changed, no failed row kept | unknown (leans code) |
| 96 | T-4560 | xc_sim_test.py | nothing (same key; a timing state check) | bad test |
| 107 | T-4655 | disk_makeup_test.py | the test only | bad test |
| 123 | T-4493 | pitches_test.py | the page dropped its lead on purpose; the test followed | bad test |
| 130 | T-3564 | pywidget:widgets | nothing in the task; main moved | not the change: bad test or time-out |
| 132 | T-4730 | site_live_test.py | the test only | bad test |

</div>


19 move to bad test, 4 to code, 4 are not the change but cannot be split between a bad test and a time-out (no output was kept: the gap this slice closes), 1 stays unknown. Caveat: "the test only" follows T-4787's rule; some of those (#56, #123) are tests catching up with a deliberate change, so a bad test here means the test had to change, not that the change was blameless.

## The recount by cause (134 red lands, 11-10 to 11-17)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: The recount by cause (134 red lands, 11-10 to 11-17), scrolls sideways" data-n="2 3" style="--tw:684px" markdown="1">

| cause | T-4787 (11-17) | now | moved by |
|---|---|---|---|
| bad test | 46 | 73 | 1 lane, 7 Xcode, 19 gate |
| code | 14 | 24 | 6 Xcode, 4 gate |
| time-out | 23 | 24 | 1 lane (#108, probably load) |
| runner | 3 | 3 | |
| not the change, bad test or time-out | 0 | 4 | 4 gate host suites with no output kept |
| red, test or code not settled | 0 | 4 | 4 lane reds with a named failing check |
| unknown | 48 | 2 | lane #1 (no log), gate #84 |

</div>


Bad tests are 73 of 134 (54%), code 24 (18%). The 38 lane lands held at the rebase step are conflicts, not reds, and stay outside the 134 as before.

## Still owed

- The 4 lane reds whose side is not settled (#13, #14, #41, #105): the same red-to-green read on the lane branches.
- A week of the new rows: count reds by cause from ops/metrics/main_gate.jsonl, ops/runs/land_steps.jsonl and the merge queue's record, and check that "unknown" stays at zero.
{% endraw %}

</div>
