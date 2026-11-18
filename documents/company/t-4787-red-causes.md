---
layout: "default"
title: "T-4787: why lands went red, 11-10 to 11-17 (bad test, broken code, other, unknown)"
section: "documents"
description: "Odalys, 11-17 6:50 PM ET. Answers an Investor&#x27;s question on #41 at 6:23 PM ET on 11-17: &quot;How many failed merges are due to bad tests instead of actually broken code?&quot; Window: 11-10 12:00 AM ET to the last row each\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4787-red-causes.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4787-red-causes.md</code></span></div><h1>T-4787: why lands went red, 11-10 to 11-17 (bad test, broken code, other, unknown)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 11-17 6:50 PM ET. Answers an Investor's question on #41 at 6:23 PM ET on 11-17: "How many failed merges are due to bad tests instead of actually broken code?" Window: 11-10 12:00 AM ET to the last row each source holds at 6:44 PM ET on 11-17. Read-only: nothing here changes a tool or a record.

## The counts

134 red lands in the window (a land attempt whose check came back red, was killed by a time limit, or errored). Each is in the list below with its bucket and its evidence.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The counts, scrolls sideways" data-n="2 3" style="--tw:532px" markdown="1">

| bucket | reds | share | what is in it |
|---|---|---|---|
| bad test | 46 | 34% | the test, not the change, was the problem: it passed again on the same tree, it measured the clock or a page load, it was red on main too or quarantined, its own code did not build, its fixture was stale |
| broken code | 14 | 10% | a rule or check was right and the change's product or tool code broke it (see the caveat on how many of these read source text) |
| other | 26 | 19% | a suite or host step hit its time limit (23), or the MacBook runner errored (3) |
| unknown | 48 | 36% | the records show a red and a later green but not which side was changed to get there, or kept no failed row |

</div>


Of the reds where the records settle the cause (bad test plus broken code, 60), 46 are bad tests and 14 are broken code. That is a lower bound on each: the 48 unknown could fall either way, so the honest range for bad tests is 46 to 94 of 134 and for broken code 14 to 62 of 134.

Not counted as red: 38 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> lands held at the rebase step (a conflict with main, or the rebase stopped), and 10 repeated rows of a red already counted (the gate's "known red" rows). A conflict is a failed merge but not a failed check; if Evan wants them in the total, it is 172 failed lands and the bad-test share falls to 27%.

### By path


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: By path, scrolls sideways" data-n="2 3 4 5 6" style="--tw:622px" markdown="1">

| path | reds | bad test | broken code | other | unknown |
|---|---|---|---|---|---|
| merge gate, host suites (ops/metrics/main_gate.jsonl suite_red) | 77 | 24 | 12 | 13 | 28 |
| MacBook Xcode job (ops/metrics/land_xc.jsonl result failed or error) | 30 | 12 | 2 | 3 | 13 |
| lane landing, host step held (ops/runs/land_steps.jsonl) | 27 | 10 | 0 | 10 | 7 |

</div>


### Caveat on "broken code"

14 reds are in this bucket. Only 1 of them is plain broken product code (Shared/LaneRerunRule.swift did not compile, T-4414 at 12:08 AM on 11-14). The other 13 are checks that read source text or a table and named a line that broke a repo rule: the wording rule (4), the board-notes reader rule (4), the main-gate key table (2, red on main), the string catalog (1), a size budget (1, red on main), an Xcode architecture scan (1). I counted them as code because the row names the offending line and the fix has to change that line. T-4749 and T-4754 treat the same kind of test as a maintenance cost; both views hold: the check was right, and a check built on text breaks on any refactor. The fix for those is the T-4749 line, not a verdict on the change.

## Method

Sources, all read-only: ops/metrics/main_gate.jsonl (every host-suite red the merge gate recorded, `suite_red`), ops/metrics/land_xc.jsonl (every MacBook Xcode job result) with each failed job's result.json on origin/macbook-results (failing test names and compile errors), ops/runs/land_steps.jsonl (each lane land's steps and whether the step was held), the lane land logs and personal-tick logs they point to, the gate's red logs under the repo's .git/main-gate/red/ (11-13 onward), ops/land_quarantine.txt, ops/xc_rerun_tests.txt, ops/board.md notes, tools/test_health.py (its `reds` command and HAND list, which names four reds whose own fix commit blamed the test), and git log for the commits that landed in each red-to-green window.

A red land is one recorded failing check result: one `suite_red` row at the gate, one failed or errored Xcode job, one lane land whose host step ended held. A host step and an Xcode job of the same lane land are one row in each source, but the lane list in land_steps and the Xcode list in land_xc do not repeat each other (I kept lane xc holds out of the lane list). Rows the gate marks "known red" (the same tree rerun, not run again) are repeats and are not counted. The one task in both the gate list and the lane list is T-3150 (a gate red at 12:45 AM on 11-11, and one of 17 tasks in a lane train held at 1:51 AM on 11-10): different attempts, both kept.

Rules for each bucket, applied in order. Evidence stronger than the red row alone is what counts.
- Bad test: green on a rerun of the same tree with no change; a wall-clock assertion (`_is_fast`, `under 3 s`, a linearity speed test) or a browser page-load time-out; the same failing row in two different tasks (a change does not cause another task's red); red on main at the same time (main_probe, suite_main_red, ops/land_quarantine.txt); a red the tools/test_health.py HAND list names as the test's fault with its fix commit; a test file or UI test that does not compile or breaks the test-code rule; a landing commit that changed only a test file after the red; a test known to be flaky under parallel Simulators (ops/xc_rerun_tests.txt).
- Broken code: product or tool code that does not compile; a rule or architecture check whose red row names the offending product or tool line (and the rule is a real rule, not a clock).
- Other: a suite or host step killed by its time limit with no failed row (tools/test_health.py and main_gate load_only call it load), a lane host step that ran to its 25-minute limit, a MacBook runner error with no test result (job code 3, "tar timed out").
- Unknown: a red and a later green with nothing recording which side was changed (landed commits carry the whole task, not the fix), or no failed row kept (the gate keeps rows only for some suites; the host suites named pywidget:* keep none).

What I could not do: compare the red tree with the green tree file by file. One read of the repo's tree objects was refused by the security guard, so I stopped that step and did not try another way; classification rests on the rows, the logs, the notes and the commit log instead. That is why the unknown bucket is as large as it is.

Count by tools/test_health.py for the gate rows alone: it puts a red in the change's column by default and marks only reds with a recurring row, a timing row, a time-out or a hand entry as the test's. My gate column differs on purpose: its "change" column is a default, not proof, and I split it into proven code and unknown.

## Every red land

Path: gate, xc (Xcode job) or lane. Times are ET.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Every red land, scrolls sideways" data-n="1 3" style="--tw:1393px" markdown="1">

| # | when | path | task | check | bucket | kind | evidence |
|---|---|---|---|---|---|---|---|
| 1 | 11-10 12:46 AM | lane | T-3127 | personal/b52 | unknown | no rows kept | host step 277 s, no log row |
| 2 | 11-10 1:01 AM | xc | T-1732 | J-20261109-1938-land-a47-2703da | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 3 | 11-10 1:51 AM | lane | T-2327+T-1918+T-3388+... | personal/a | other | timeout | a 17-task train, host step 1503 s (the 25-minute limit) |
| 4 | 11-10 1:58 AM | gate | T-3995 | main_gate_test.py | unknown | consistency check on the gate (SrcOnly keys-to-c | no failed-row detail kept beyond the test name; green 4 min later, what changed is not in the records |
| 5 | 11-10 2:22 AM | xc | T-2491 | J-20261110-0105-land-b-070886 | bad test | test-only fix | BridgeTests/testWriterStandsDownWhileAConsoleRunHoldsPython; the landing commit 754d97edc1 changed only ExtensionLaneTests.swift |
| 6 | 11-10 2:28 AM | lane | T-3109+T-3306 | personal/a | bad test | test depends on a lock another run holds | rows: "xc.sh: waited 1.2s for the xcodebuild lock; not running without it" in two export cases |
| 7 | 11-10 2:35 AM | gate | T-3997 | report_flow_test.py | unknown | text of a generated report | green 12 min later after both tests/report_flow_test.py and tools/report_facts.py changed |
| 8 | 11-10 2:35 AM | gate | T-3997 | site_money_wording_test.py | broken code | wording rule named a <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> line | row names tools/site/merge_page.py:232 ("to go"); the rule bans that phrase in generators |
| 9 | 11-10 3:39 AM | gate | T-3996 | site_money_wording_test.py | broken code | wording rule named a generator line | row names tools/site/session_page.py:698 ("to go") |
| 10 | 11-10 3:39 AM | gate | T-3996 | site_work_test.py | unknown | page numbers differ | row shows (None, (650,114)); green 5 min later, fix side not in the records |
| 11 | 11-10 4:28 AM | xc | T-2098 | J-20261110-0207-land-a2-59a64f | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 12 | 11-10 5:04 AM | gate | T-3996 | site_s30_test.py | bad test | test file changed between red and green | "166 passed, 1 failed"; between red and green only tests/site_s30_test.py changed among the land's files (git log window, 5:04 to 5:14 AM) |
| 13 | 11-10 5:06 AM | lane | T-1732 | personal/a2 | unknown | no rows kept | host step 1247 s, no log row |
| 14 | 11-10 5:23 AM | lane | T-3027+T-2325+T-2331 | personal/b3 | unknown | no rows kept | host step 121 s, no log row |
| 15 | 11-10 5:43 AM | xc | T-0622 | J-20261110-0526-land-a3-094464 | other | runner error | job result code 3, no test result |
| 16 | 11-10 6:31 AM | gate | T-3993 | site_test.sh | unknown | page content assertion | row: T-2400 Progress holds the total cost; green 4 min later, fix side not in the records |
| 17 | 11-10 7:58 AM | xc | T-0622 | J-20261110-0739-land-a3-426593 | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 18 | 11-10 7:58 AM | xc | T-2857 | J-20261110-0740-land-a-015db4 | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 19 | 11-10 7:59 AM | xc | T-3762 | J-20261110-0739-land-b3-463525 | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 20 | 11-10 7:59 AM | xc | T-1732 | J-20261110-0739-land-a2-40ca21 | bad test | flaky under parallel Simulators | ProStoreTests/testAskToBuyDeclinedGrantsNothing listed in ops/xc_rerun_tests.txt (T-3995): red on branches that touch none of its paths; 5 Simulators at once |
| 21 | 11-10 8:12 AM | xc | T-0623 | J-20261110-0800-land-a-1133d5 | bad test | test file does not compile | UITests/AcknowledgementsUITests.swift:55 "invalid redeclaration of certifi"; no later green seen for this task |
| 22 | 11-10 9:33 AM | lane | T-0622 | personal/a3 | bad test | same failing test in two tasks | bridge test_swallow_ends_by_hard_stop_twice; red again for T-3552 (11-16 4:57 AM) |
| 23 | 11-10 11:10 AM | gate | T-3978 | xc_sim_test.py | unknown | registry check | "every script that drives a Simulator is one the tool knows" lists 5 scripts; whether the list or the scripts changed is not in the records |
| 24 | 11-10 7:15 PM | gate | T-3386 | site_timeline_test.py | unknown | page content assertion | row: the lead gives the day, days left, next deadline; green 19 min later, fix side not in the records |
| 25 | 11-10 8:50 PM | gate | T-4018 | supervisor_test.sh | other | timeout | "timed out after 1440 s", no failed row (tools/test_health.py: a time-out with no failed row is load) |
| 26 | 11-10 10:32 PM | gate | T-3995 | swift_strings_catalog_test.py | broken code | string catalog check named missing keys | row: missing-key 4, concat 2, verbatim 1, unused-key 1: app strings the catalog lacks |
| 27 | 11-10 11:03 PM | gate | T-3995 | supervisor_test.sh | other | timeout | "timed out after 373 s" against a flat 360 s base; the suite's median is 544 s (test_health.py header) |
| 28 | 11-11 12:08 AM | gate | T-4012 | personal_land_product_test.sh | unknown | registry check | "every folder under pywidget/ on main is floored"; folder not named in the row |
| 29 | 11-11 12:45 AM | gate | T-3150 | site_money_wording_test.py | broken code | wording rule named generator lines | row names tools/site/home_look.py:1227 and session_page.py:691; no later green seen for this task |
| 30 | 11-11 9:23 AM | gate | T-3996 | site_money_wording_test.py | broken code | wording rule named generator lines | row names home_look.py:1239 and session_page.py:691 |
| 31 | 11-11 2:40 PM | gate | T-3995 | disk_sweep_test.py | bad test | wall-clock assertion, green on the same tree | t3691_holder_check_is_fast 2.30 s; the same tree (7250c77d2a0f) passed on rerun |
| 32 | 11-11 2:53 PM | gate | T-3995 | site_live_test.py | unknown | no failed row kept | only "stopped at the first red" survives |
| 33 | 11-11 7:46 PM | gate | T-4095 | site_live_test.py | bad test | green on the same tree | same tree (0e6b29402f1b) passed on rerun; no change |
| 34 | 11-11 11:07 PM | gate | T-4115 | ssd_recover_test.py | unknown | state check with a clock value | row "healthy: identity cached {ident_at: ...}"; green 16 min later |
| 35 | 11-11 11:23 PM | gate | T-4115 | supervisor_test.sh | other | timeout | "timed out after 360 s"; suite median 544 s |
| 36 | 11-11 11:36 PM | gate | T-4115 | personal_land_test.sh | unknown | text-of-hook check | row: hook arm differs from HEAD's blob; green 8 min later |
| 37 | 11-12 1:32 AM | gate | T-4093 | pywidget:privacy | unknown | no failed row kept | host suite red with no row kept; green 3 min later |
| 38 | 11-12 4:12 AM | gate | T-4129 | board_notes_readers_test.py | broken code | convention check named a tool | row names tools/park_watch.py (raw read of ops/board.md) |
| 39 | 11-12 5:11 AM | gate | T-4093 | pywidget:widgets | unknown | no failed row kept | host suite red with no row kept |
| 40 | 11-12 6:38 AM | xc | T-4152 | J-20261112-0629-land-m-37c930 | unknown | behaviour test of the task | ExtensionLaneTests/testARecordOnlyKilledRowSaysHowFarTheDeadRunGot; green 10 min later (dad9db5b52 changed code and tests) |
| 41 | 11-12 7:36 AM | lane | T-3856 | personal/b40 | unknown | tick-script tests | rows about the launchd stop and the reading copy; fix side not in the records |
| 42 | 11-12 9:56 AM | lane | T-3418 | personal/b44 | bad test | browser time-out | "Locator.click: Timeout 30000ms exceeded" in two box rows |
| 43 | 11-12 10:34 AM | xc | T-3757 | J-20261112-1025-land-m-459ec0 | unknown | behaviour tests of the task | 5 failing tests (BridgeTests, WidgetStepTimeoutTests); green 17 min later (a42f0cc866 changed code and tests) |
| 44 | 11-12 10:51 AM | gate | T-3784 | pywidget:bridge | unknown | no failed row kept |  |
| 45 | 11-12 11:04 AM | xc | T-4176 | J-20261112-1056-land-m-28e007 | unknown | behaviour test of the task | ProjectStoreTests/testM1NewFile...; green 32 min later (2957d723e2 changed code and tests) |
| 46 | 11-12 11:10 AM | gate | T-3784 | pywidget:bridge | unknown | no failed row kept |  |
| 47 | 11-12 11:15 AM | xc | T-4176 | J-20261112-1106-land-m-5482cf | unknown | behaviour test of the task | same test |
| 48 | 11-12 11:25 AM | xc | T-4176 | J-20261112-1116-land-m-18d837 | unknown | behaviour tests of the task | ProjectStoreTests testM1ConflictCopy... and testM1NewFile... |
| 49 | 11-12 11:26 AM | gate | T-4162 | site_session_chart_test.py | unknown | page content assertion | row: last Investor reply time on Home's first line; green 4 min later |
| 50 | 11-12 11:51 AM | xc | T-4198 | J-20261112-1142-land-m-57e31d | unknown | behaviour test of the task | BridgeTests/testT4198AFailedPythonStartPrunesTheRunLogOnceADay |
| 51 | 11-12 12:08 PM | xc | T-4198 | J-20261112-1204-land-m2-145178 | bad test | test file does not compile | Tests/LaunchRunLogTests.swift:156 "reference to property killed requires explicit self" |
| 52 | 11-12 3:22 PM | xc | T-3852 | J-20261112-1515-land-m7-26c912 | unknown | source-scan rule | BridgeTests/testNoPreviewPathBypassesTheKey lists WidgetWriter.swift and LauncherEditor.swift; fix side not in the records |
| 53 | 11-12 3:25 PM | gate | T-4136 | site_test.sh | unknown | page content assertion | row: Home inlines its portraits as data URIs (request budget 6); green 12 min later |
| 54 | 11-12 5:23 PM | xc | T-4212 | J-20261112-1700-land-m-544f05 | bad test | UI test breaks a test rule | UITestLaunchScanTests lists WidgetKitCheckTests.swift:613 launching XCUIApplication directly: the offender is a UI test file |
| 55 | 11-12 6:56 PM | gate | T-3848 | pywidget:widgets | bad test | green on the same tree | same tree passed on rerun; no change |
| 56 | 11-12 9:56 PM | gate | T-4232 | site_build_unit_test.py | unknown | size-budget table | row prints the budget table, not which file broke it |
| 57 | 11-12 10:00 PM | gate | T-4232 | site_live_test.py | bad test | green on the same tree | same tree (c5d03debaf25) passed on rerun |
| 58 | 11-12 10:08 PM | gate | T-4232 | main_gate_test.py | broken code | convention check, red on main (code table out of | test_the_real_build_names_nothing_unkeyed found a build read missing from EXTRA_READS; fix was a code line in tools/main_gate.py (ops/board.md T-4092 Operator note 3:4x PM 11-12) |
| 59 | 11-12 10:16 PM | gate | T-4230 | main_gate_test.py | broken code | convention check, red on main (code table out of | same row, second task; same note |
| 60 | 11-12 10:22 PM | gate | T-4232 | site_t2940_test.py | bad test | browser time-out, green on the same tree | "Page.goto: Timeout 30000ms exceeded"; same tree passed on rerun |
| 61 | 11-12 11:15 PM | xc | T-3900 | J-20261112-2308-land-m2-07b96a | unknown | timing tests of the task | 3 WidgetStepTimeoutTests; the same tests were later made load-proof (T-4527, e88b9b22c2), but what failed here is not in the records |
| 62 | 11-12 11:48 PM | xc | T-3895 | J-20261112-2340-land-m3-5826c1 | unknown | behaviour test of the task | ExtensionLaneTests/testAStuckBridgeAtQueueingIsTheClosedLane; green 10 min later |
| 63 | 11-13 8:20 AM | xc | T-2261 | J-20261113-0815-land-m2-419989 | bad test | test file does not compile | Tests/EditorToolingTests.swift:104 "async property access in an autoclosure"; green 14 min later |
| 64 | 11-13 9:53 AM | xc | T-4258 | J-20261113-0951-land-m-29fac6 | unknown | test double vs protocol | Tests/ConsoleEditorOpenTests.swift: GatedEngine does not conform to CodeEditorEngine; the landing cad4c75e38 changed the protocol and the tests |
| 65 | 11-13 1:20 PM | gate | T-4287 | site_home_t4094_test.py | bad test | green on the same tree | same tree (e7339e7e48d8) passed on rerun |
| 66 | 11-13 1:35 PM | gate | T-4287 | site_test.sh | bad test | same failing row in two tasks | "nothing changed: no second commit" also red for T-4488 (11-15 5:01 AM); tools/test_health.py "recurring" |
| 67 | 11-13 11:04 PM | xc | T-0678 | J-20261113-2256-land-m-1662e6 | broken code | architecture rule named a product line | ExtensionBridgeTests/testNothingInTheExtensionStartsPython names Shared/RefreshWidgetIntent.swift:48 |
| 68 | 11-13 11:34 PM | gate | T-1440 | pywidget:bridge | unknown | no failed row kept |  |
| 69 | 11-14 12:08 AM | xc | T-4414 | J-20261114-0006-land-m-058157 | broken code | product code does not compile | Shared/LaneRerunRule.swift:16 "cannot find type Date in scope" |
| 70 | 11-14 12:12 AM | gate | T-4313 | home_now_line_test.py | unknown | page content assertion | row: "#53 and Apple at the top"; green 12 min later |
| 71 | 11-15 3:49 AM | gate | T-4466 | personal_pool_test.sh | other | timeout | "timed out after 392 s (limit 360 s ... stretched by load)" |
| 72 | 11-15 3:55 AM | gate | T-4466 | personal_pool_test.sh | other | timeout | "timed out after 361 s" |
| 73 | 11-15 4:19 AM | gate | T-4129 | personal_land_test.sh | unknown | state check | row: a skip tick with a red branch leaves no more dirty than one without; no later green seen |
| 74 | 11-15 5:01 AM | gate | T-4488 | site_test.sh | bad test | same failing row in two tasks | "nothing changed: no second commit" (see T-4287 11-13) |
| 75 | 11-15 5:31 AM | gate | T-4438 | personal_pool_test.sh | other | timeout | "timed out after 1440 s" |
| 76 | 11-15 8:06 AM | gate | T-4487 | personal_off_test.sh | other | timeout | "timed out after 581 s" against a 360 s base; suite median 372 s |
| 77 | 11-15 8:16 AM | gate | T-4487 | personal_off_test.sh | other | timeout | "timed out after 591 s" |
| 78 | 11-15 9:01 AM | xc | T-4504 | J-20261115-0850-land-m-34d1b7 | unknown | snapshot test with a mutant | PremadeSnapshotTests/testClocksSmallDrawsTheWidestPairWhole; green 10 min later, fix side not in the records |
| 79 | 11-15 9:44 AM | gate | T-4513 | site_t3201_test.py | bad test | browser time-out | "Page.goto: Timeout 30000ms exceeded"; a page-load time-out, not a content row |
| 80 | 11-15 12:23 PM | gate | T-4525 | pywidget:widgets | unknown | no failed row kept |  |
| 81 | 11-15 1:32 PM | gate | T-4511 | site_money_wording_test.py | unknown | page text rule | row: it says where the numbers come from and that no Claude made it; fix side not in the records |
| 82 | 11-15 1:38 PM | lane | T-4227 | personal/b40 | other | timeout | host step 1445-1506 s, at its limit; no row kept |
| 83 | 11-15 2:15 PM | lane | T-4227 | personal/b3 | other | timeout | host step at its limit; personal_off/personal_pool "timed out ... limit 360 s of work, stretched by load" |
| 84 | 11-15 2:38 PM | gate | T-4468 | pywidget:tooling | unknown | no failed row kept |  |
| 85 | 11-15 3:23 PM | lane | T-4227 | personal/b3 | other | timeout | host step 1445-1506 s, at its limit; no row kept |
| 86 | 11-15 3:28 PM | xc | T-4468 | J-20261115-1515-land-m-02afa1 | unknown | bundle contents check | PremadesTests/testTheBuiltAppHoldsTheTwelve...; green 10 min later, fix side not in the records |
| 87 | 11-15 4:47 PM | lane | T-4227 | personal/b3 | other | timeout | host step 1445-1506 s, at its limit; no row kept |
| 88 | 11-15 5:26 PM | lane | T-4227 | personal/b40 | other | timeout | host step 1445-1506 s, at its limit; no row kept |
| 89 | 11-15 6:01 PM | lane | T-4227 | personal/b40 | other | timeout | host step at its limit; personal_off/personal_pool "timed out ... limit 360 s of work, stretched by load" |
| 90 | 11-15 6:19 PM | gate | T-3992 | supervisor_test.sh | bad test | same failing row in two tasks | "a passed close_by: session_end.py stops the work session..." also red for T-4665 (11-16 11:32 PM); "recurring" |
| 91 | 11-15 7:01 PM | lane | T-4227 | personal/b40 | other | timeout | host step 1445-1506 s, at its limit; no row kept |
| 92 | 11-15 7:30 PM | gate | T-3992 | personal_pool_test.sh | other | timeout | "timed out after 370 s" |
| 93 | 11-15 8:12 PM | lane | T-4227 | personal/b3 | other | timeout | host step at its limit; personal_off/personal_pool "timed out ... limit 360 s of work, stretched by load" |
| 94 | 11-15 10:55 PM | gate | T-4560 | disk_sweep_test.py | bad test | wall-clock assertion | t3691_holder_check_is_fast 3.62 s |
| 95 | 11-15 10:56 PM | gate | T-4560 | disk_sweep_test.py | bad test | wall-clock assertion | t3691_holder_check_is_fast 5.78 s |
| 96 | 11-15 11:05 PM | gate | T-4560 | xc_sim_test.py | unknown | state check | row: two lanes at once, each run's Simulator goes down with it; green 22 min later |
| 97 | 11-16 12:07 AM | gate | T-4194 | personal_pool_test.sh | other | timeout | "timed out after 360 s" |
| 98 | 11-16 2:59 AM | gate | T-4194 | personal_pool_test.sh | other | timeout | "timed out after 893 s" |
| 99 | 11-16 3:24 AM | gate | T-4194 | personal_pool_test.sh | other | timeout | "timed out after 1408 s" |
| 100 | 11-16 4:57 AM | lane | T-3552 | personal/a45 | bad test | same failing test in two tasks | bridge test_swallow_ends_by_hard_stop_twice (see T-0622, 11-10) |
| 101 | 11-16 9:21 AM | xc | T-4554+T-4555+T-4564+... | J-20261116-0910-land-a2-3758b7 | other | runner error | "tar timed out", job code 3; fell back to a run on the Mac mini |
| 102 | 11-16 9:43 AM | gate | T-4584 | board_notes_readers_test.py | broken code | convention check named tools | row names queue_read.py, task_queue_log.py, xc_sim.py (raw reads of ops/board.md) |
| 103 | 11-16 10:05 AM | xc | T-3745+T-4256+T-4433+... | J-20261116-0910-land-b3-43d572 | other | runner error | "tar timed out", job code 3 |
| 104 | 11-16 1:41 PM | lane | T-4561+T-0678 | personal/b | bad test | green a minute later | bridge test_a_stop_after_the_users_code_does_not_escape_the_tail; the same tasks landed at 1:42 PM |
| 105 | 11-16 5:09 PM | lane | T-3976 | personal/a44 | unknown | disk-size rows | rows about SSD sizes (5 MB, 2 MB, 4 MB); landed 23 min later, fix side not in the records |
| 106 | 11-16 5:44 PM | gate | T-4196 | queue_check_test.py | bad test | wall-clock assertion | "each event's row holds its time, under 3 s": 3.5 to 4.7 s measured |
| 107 | 11-16 8:52 PM | gate | T-4655 | disk_makeup_test.py | unknown | state check | row: two drives, one row each; green 58 min later |
| 108 | 11-16 9:01 PM | lane | T-4617 | personal/a45 | unknown | no rows kept | host step 624 s, no log row |
| 109 | 11-16 9:50 PM | gate | T-4655 | heavy_slot_test.py | bad test | start-time race in the test | tools/test_health.py HAND list: a 1.5 s race for the gate to start, fixed in 5274377036 |
| 110 | 11-16 10:44 PM | gate | T-4665 | main_folder_guard_test.py | bad test | the test's own subprocess time-out | red log: Traceback in the test's subprocess.communicate after 43.9 s, all earlier rows PASS; green 48 min later |
| 111 | 11-16 11:32 PM | gate | T-4665 | supervisor_test.sh | bad test | same failing row in two tasks | same close_by row as T-3992 (11-15 6:19 PM); "recurring" |
| 112 | 11-17 12:05 AM | gate | T-4665 | personal_land_product_test.sh | bad test | stale mutant in the test | tools/test_health.py HAND list: the watcher mutant's sed pattern matched nothing after a refactor; 5274377036 |
| 113 | 11-17 12:39 AM | gate | T-4665 | personal_pool_test.sh | bad test | stale test row, red on main | HAND list: a row stale since 4f3e6ca6ce (T-4486), red on main; 5274377036 |
| 114 | 11-17 12:48 AM | gate | T-4665 | personal_pool_test.sh | other | timeout | "timed out after 483 s" |
| 115 | 11-17 1:41 AM | gate | T-4694 | board_notes_readers_test.py | broken code | convention check named a tool | row names tools/main_gate.py (raw read of ops/board.md) |
| 116 | 11-17 1:43 AM | gate | T-4694 | board_tick_test.py | bad test | stale fixture, red on main | HAND list: fixture cards red on main since T-4621; 92521ed099 |
| 117 | 11-17 2:59 AM | lane | T-4672 | personal/b40 | bad test | timing assertion | systls test_ten_mib_bodies_in_small_pieces_are_linear (a speed test) |
| 118 | 11-17 3:48 AM | gate | T-4677 | lane_env_test.py | bad test | red on main too | main_probe row 3:48 AM: the same row fails on main a0a0d97c1281; ops/board.md T-4725 |
| 119 | 11-17 7:12 AM | gate | T-4718 | personal_land_test.sh | bad test | red on main too, quarantined | ops/land_quarantine.txt entry (fix line T-4726) |
| 120 | 11-17 8:00 AM | lane | T-4663 | personal/a44 | bad test | a page test with a fixed count, fixed by a test  | site_test.sh row "T-4240: App is a main page ... the seven diagrams"; fixed in the test by T-4756 (f7403c95e5, 11:59 AM: one diagram per declared part, not a fixed seven); red for the editor task T-4663, whose files do not touch the page |
| 121 | 11-17 8:27 AM | lane | T-4663 | personal/a44 | bad test | a page test with a fixed count, fixed by a test  | site_test.sh row "T-4240: App is a main page ... the seven diagrams"; fixed in the test by T-4756 (f7403c95e5, 11:59 AM: one diagram per declared part, not a fixed seven); red for the editor task T-4663, whose files do not touch the page |
| 122 | 11-17 8:53 AM | lane | T-4663+T-4669 | personal/a2 | bad test | a page test with a fixed count, fixed by a test  | site_test.sh row "T-4240: App is a main page ... the seven diagrams"; fixed in the test by T-4756 (f7403c95e5, 11:59 AM: one diagram per declared part, not a fixed seven); red for the editor task T-4663, whose files do not touch the page |
| 123 | 11-17 9:01 AM | gate | T-4493 | pitches_test.py | unknown | test parse error on the page | red log: AttributeError at tests/pitches_test.py:61, the lead paragraph was not found; page or test, not in the records |
| 124 | 11-17 9:15 AM | lane | T-4663 | personal/a2 | bad test | a page test with a fixed count, fixed by a test  | site_test.sh row "T-4240: App is a main page ... the seven diagrams"; fixed in the test by T-4756 (f7403c95e5, 11:59 AM: one diagram per declared part, not a fixed seven); red for the editor task T-4663, whose files do not touch the page |
| 125 | 11-17 10:31 AM | lane | T-4663 | personal/a44 | other | timeout | host step 1509 s, at its limit |
| 126 | 11-17 11:18 AM | lane | T-4663 | personal/a2 | unknown | no rows kept | host step 200 s like the four above; log not kept |
| 127 | 11-17 11:42 AM | xc | T-3764 | J-20261117-1133-land-m2-10937f | bad test | UI test breaks a test rule | UITestLaunchScanTests lists LauncherWindowsUITests.swift:32 launching XCUIApplication directly: a UI test file |
| 128 | 11-17 11:45 AM | gate | T-4755 | personal_land_test.sh | bad test | red on main too, quarantined | same quarantine entry (T-4726) |
| 129 | 11-17 12:28 PM | xc | T-4662 | J-20261117-1216-land-m3-53ed1c | unknown | behaviour test of the task | PromptDeskTests/testTheBridgePassesTheTimeoutAndTheAlertGoesAtIt; no later xc green seen |
| 130 | 11-17 1:05 PM | gate | T-3564 | pywidget:widgets | unknown | no failed row kept |  |
| 131 | 11-17 4:06 PM | gate | T-4749 | site_build_unit_test.py | broken code | size budget exceeded, red on main | lanes.js 5,680 B raw over 5,632; fixed by trimming lanes.js without raising the limit (T-4730, 09eb93e1f3) |
| 132 | 11-17 4:40 PM | gate | T-4730 | site_live_test.py | unknown | no failed row kept | red log: "24 passed, 1 failed", the failed row is not kept |
| 133 | 11-17 5:41 PM | gate | T-4753 | board_notes_readers_test.py | broken code | convention check named a tool | row names tools/storage_guard.py (raw read of ops/board.md) |
| 134 | 11-17 6:06 PM | gate | T-4653 | pywidget:widgets | bad test | green on the same tree | same tree passed on rerun; no change |

</div>


## Bad-test list

Each bad test named once, with its red count in the window. The fix line for the whole class of tests that read source text is T-4749 (with its remainder T-4754), Pernille, open on the board. Lines found for single tests: T-4725 (lane_env_test.py) and T-4726 (personal_land_test.sh) are open from the nightly run; T-4769 (heavy_slot_test.py flipped in its 3 deflake runs) is ticked. No fix line was found for the others.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Bad-test list, scrolls sideways" data-n="2" style="--tw:1134px" markdown="1">

| test | reds | kind | first seen | fix line or note |
|---|---|---|---|---|
| ProStoreTests/testAskToBuyDeclinedGrantsNothing (MacBook Xcode) | 6 | flaky under parallel Simulators | 11-10 1:01 AM | ops/xc_rerun_tests.txt reruns it; the fix is the test passing with 5 Simulators at once (that file says so) |
| lane host: site_test.sh row "T-4240: App is a main page ... the seven diagrams" | 4 | a page test with a fixed count, fixed by a test change | 11-17 8:00 AM | none found |
| disk_sweep_test.py | 3 | wall-clock assertion; wall-clock assertion, green on the same tree | 11-11 2:40 PM | none found |
| site_live_test.py | 2 | green on the same tree | 11-11 7:46 PM | none found |
| UITestLaunchScanTests | 2 | UI test breaks a test rule | 11-12 5:23 PM | none found |
| pywidget:widgets | 2 | green on the same tree | 11-12 6:56 PM | none found |
| site_test.sh | 2 | same failing row in two tasks | 11-13 1:35 PM | none found |
| supervisor_test.sh | 2 | same failing row in two tasks | 11-15 6:19 PM | none found |
| personal_land_test.sh | 2 | red on main too, quarantined | 11-17 7:12 AM | T-4726 (quarantined) |
| BridgeTests/testWriterStandsDownWhileAConsoleRunHoldsPython (MacBook Xcode) | 1 | test-only fix | 11-10 2:22 AM | none found |
| lane host: rows: "xc.sh: waited 1.2s for the xcodebuild lock | 1 | test depends on a lock another run holds | 11-10 2:28 AM | none found |
| site_s30_test.py | 1 | test file changed between red and green | 11-10 5:04 AM | none found |
| UITests/AcknowledgementsUITests (MacBook Xcode) | 1 | test file does not compile | 11-10 8:12 AM | none found |
| lane host: bridge test_swallow_ends_by_hard_stop_twice | 1 | same failing test in two tasks | 11-10 9:33 AM | none found |
| lane host: "Locator.click: Timeout 30000ms exceeded" in two box rows | 1 | browser time-out | 11-12 9:56 AM | none found |
| Tests/LaunchRunLogTests.swift:156 "reference to property killed requires explici | 1 | test file does not compile | 11-12 12:08 PM | none found |
| site_t2940_test.py | 1 | browser time-out, green on the same tree | 11-12 10:22 PM | none found |
| Tests/EditorToolingTests.swift:104 "async property access in an autoclosure" | 1 | test file does not compile | 11-13 8:20 AM | none found |
| site_home_t4094_test.py | 1 | green on the same tree | 11-13 1:20 PM | none found |
| site_t3201_test.py | 1 | browser time-out | 11-15 9:44 AM | none found |
| lane host: bridge test_swallow_ends_by_hard_stop_twice (see T-0622, 11-10) | 1 | same failing test in two tasks | 11-16 4:57 AM | none found |
| lane host: bridge test_a_stop_after_the_users_code_does_not_escape_the_tail | 1 | green a minute later | 11-16 1:41 PM | none found |
| queue_check_test.py | 1 | wall-clock assertion | 11-16 5:44 PM | none found |
| heavy_slot_test.py | 1 | start-time race in the test | 11-16 9:50 PM | T-4769 (ticked) |
| main_folder_guard_test.py | 1 | the test's own subprocess time-out | 11-16 10:44 PM | none found |
| personal_land_product_test.sh | 1 | stale mutant in the test | 11-17 12:05 AM | none found |
| personal_pool_test.sh | 1 | stale test row, red on main | 11-17 12:39 AM | none found |
| board_tick_test.py | 1 | stale fixture, red on main | 11-17 1:43 AM | none found |
| lane host: systls test_ten_mib_bodies_in_small_pieces_are_linear (a speed test) | 1 | timing assertion | 11-17 2:59 AM | none found |
| lane_env_test.py | 1 | red on main too | 11-17 3:48 AM | T-4725 |

</div>


Source: this file; counts come from ops/metrics/main_gate.jsonl, ops/metrics/land_xc.jsonl and ops/runs/land_steps.jsonl as read at 6:44 PM ET on 11-17. A later land will add rows these counts do not include.
{% endraw %}

</div>
