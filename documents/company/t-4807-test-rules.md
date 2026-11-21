---
layout: "default"
title: "T-4807: rules for new tests"
section: "documents"
description: "Pernille, 11-17 9:35 PM ET. Answers an Investor on #41 (c6965124089, 7:26 PM 11-17: &quot;fix every bad test ... Consult real-world examples of how tests are designed and implemented. Fix the &#x27;big picture&#x27; causes&quot;) and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4807-test-rules.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/T-4807-test-rules.md</code></span></div><h1>T-4807: rules for new tests</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 11-17 9:35 PM ET. Answers an Investor on #41 (c6965124089, 7:26 PM 11-17: "fix every bad test ... Consult
real-world examples of how tests are designed and implemented. Fix the 'big picture' causes") and the 5:19 PM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>: a red
must mean broken behaviour. Each rule names the cause it answers in Odalys's table (ops/plans/T-4787-red-causes.md, 134
red lands 11-10 to 11-17: 46 bad test, 14 broken code, 26 other, 48 unknown) and in my ranked list
(ops/plans/T-4786-bad-tests.md). A reviewer (Commandment 13) refuses a new or changed test that breaks one of these
rules, the same as a product bug.

Sources, as published (cited from their text as I know it; none was fetched tonight, so none is saved in
research/inbound/):
- [<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>] Google Testing Blog, John Micco, "Flaky Tests at Google and How We Mitigate Them" (2016): about 1 in 7 of
  Google's tests showed some flakiness; a flaky result is quarantined with an owner and fixed, not rerun until green.
- [G2] Google Testing Blog, Jeff Listfield, "Where do our flaky tests come from?" (2017): flakiness grows with a test's
  size (binary size, memory) and with tools like WebDriver; small hermetic tests are the least flaky.
- [G3] Winters, Manshreck and Wright, *Software Engineering at Google* (O'Reilly, 2020), ch. 11 "Testing Overview" and
  ch. 14 "Larger Testing": test sizes (small: one process, no sleep, no network; medium: one machine, localhost only;
  large: anything), each with its own time limit; hermetic tests that own their data; "a test should fail only when
  the behaviour it checks is broken".
- [A1] Apple, XCTest documentation, "Asynchronous Tests and Expectations" and `XCTestExpectation` /
  `fulfillment(of:timeout:)`: wait for an event, never sleep; the timeout is a ceiling on a hang, not a measurement.
- [A2] Apple, Xcode Help, "Run tests in parallel" (test plans, parallel testing on clones of a Simulator): each test
  must run alone and in any order; nothing shared between test classes.
- [A3] Apple, StoreKit Testing in Xcode, `SKTestSession` (`clearTransactions()`, `resetToDefaultState()`): each test
  starts from a session state it set itself.
- [P1] Playwright documentation, "Auto-waiting" and `page.waitForTimeout` ("Discouraged: never wait for timeout in
  production. Tests that wait for time are inherently flaky"): wait for a locator or a condition.

## The rules


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The rules, scrolls sideways" data-n="1" style="--tw:774px" markdown="1">

| # | rule | the cause in T-4787 / T-4786 it answers | source |
|---|------|-------------------------------------------|--------|
| 1 | **No fixed sleep, no wall-clock bound.** Wait for the event itself (an expectation, a go file, a condition with `wait_for_function`, a polled state). A timeout is only a ceiling on a hang, at least 10x the normal time; it never decides a pass. A speed claim is checked by counting work (bytes per piece, calls, CPU time), never seconds. | "wall-clock assertion" (disk_sweep_test 3, queue_check_test 1, systls linear 1); timing (PromptDeskTests, heavy_slot_test, bridge hard stop 2) | G3, A1, P1 |
| 2 | **Own every resource: data, folders, ports, Simulator state, locks.** A test makes its own temporary repository, its own server on port 0, its own StoreKit session cleared in setUp, its own state files; it never reads another run's lock or file. | "test depends on a lock another run holds" (xc.sh lock, 1); "same failing row in two tasks" (site_test.sh 2, supervisor_test.sh 2, bridge 2); ProStoreTests under five Simulators (6) | G3, A2, A3 |
| 3 | **Run the code; never read its source text.** A rule about code is a lint or a build setting with its own owner, not a row in a behaviour suite. A test checks what the code does. | the 13 "broken code" reds that were checks reading source text or a table (T-4787 caveat); site_test.sh "the seven diagrams" (4) | G3 |
| 4 | **A local server is built for a browser's load.** Every browser test serves through a server with a backlog of 128 (`tools/site_shots.Server`, once T-4807's fix lands), never bare `http.server` (backlog 5: macOS resets the sixth connect at once, and a reset inside a route's fetch leaves the request unanswered until goto's 30 s runs out). Routes answer from fixtures in the test; a route that must fetch catches the error and fails the row. | browser page-load time-outs: site_t2940 "Page.goto: Timeout 30000ms" and "Route.fetch: connect ECONNRESET", site_t3201, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> box rows "Locator.click: Timeout 30000ms" (6) | P1, G2 |
| 5 | **Size the suite; keep it small.** A suite states its size (small, medium, large) and stays inside the time of its size at land load, not alone. A suite over 120 s of work is split by part, each with its own limit, so a cut names the part. Rows share setup only when it is read-only. Never raise a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> to make a suite fit. | host suites cut at their limit: personal_pool_test 7, supervisor_test 3, personal_off_test 2, lane host step 8 (about 20; T-4787 "other", 23 time-outs) | G2, G3 |
| 6 | **Fixtures and mutants move with the code.** A change that alters a tool's output updates its fixtures and mutants in the same commit; a test that is red on main is fixed or quarantined within the hour, not carried. | stale fixture or mutant, red on main (board_tick_test, personal_land_product_test, personal_pool_test row, lane_env_test, personal_land_test: 6) | G1 |
| 7 | **Every red keeps its failing row.** A suite prints the failing row's name and what it saw (the value, not only "false"); a runner keeps the first failing row, not only "stopped at the first red". A red with no row is a test bug. | "unknown" (48): no failed row kept (pywidget:* suites, site_live_test 11-17, gate logs that keep only the summary) | G1 |
| 8 | **A test that is not deterministic is quarantined with an owner and a fix line, never rerun until green.** The quarantine entry names the owner, the fix line and the date; it leaves when three runs at land load pass. A rerun list (ops/xc_rerun_tests.txt) is a quarantine with the same rules. | ProStoreTests on the rerun list since 11-07; known_red rows repeated (10) | G1 |
| 9 | **A new test compiles and passes at land load before it lands.** A new Swift test file goes through the MacBook runner (`tools/xc.sh test`) once; a new host suite runs once beside the land load (`tests/run.sh` inside a heavy slot), not only alone. | new test files that did not compile (AcknowledgementsUITests, LaunchRunLogTests, EditorToolingTests: 3); "green alone, red at land load" | A2, G2 |
| 10 | **UI tests launch the app the one way.** UI tests start the app through the shared launcher with its arguments (no direct `XCUIApplication()` launch), so Simulator state is set by the test. | UITestLaunchScanTests (2): it caught a real breach each time; the rule stays, as a lint, under rule 3 | A2 |

</div>


## How a reviewer applies them

- Read the test's waits first: any `sleep`, `wait_for_timeout`, `Thread.sleep`, `asyncAfter` with a fixed delay, or a
  bound on elapsed seconds is a FIX FIRST unless it is a ceiling on a hang (rule 1).
- Ask where every file, port, lock and Simulator state comes from (rule 2), and whether the suite's time at load is
  inside its size (rule 5).
- A reviewer may not <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> a rule; an exception is a recorded decision (Commandment 9) with the owner of the test.

## Where the fixes stand (T-4807, 11-17; slice 2 11-18)

- Rule 4: tools/site_shots.Server (listen queue 128) serves site_send_test.serve and the site suites built on it,
  site_t3201, site_t3016, site_personal, site_proposals, site_queued_order; site_live_test waits for the drawn count, not
  5 s. tests/site_server_backlog_test.py pins it in 0.3 s: 40 connects before the first accept, all kept, while a control
  with http.server's own queue must lose some (with the queue set back to 5, 34 of 40 were reset and it failed). Landed
  with slice 2 (11-18), together with the swipe fix below.
- Rule 1: PromptDeskTests (db804b4ac2), heavy_slot_test (199951063a), disk_sweep (T-4560) were fixed earlier; bridge
  hard stop, systls linear and queue_check 3 s rows are open.
- Rule 5: measured, not yet fixed. supervisor_test.sh runs 13 groups at once, each in its own copy; alone at load 10
  they took 60-418 s each (chain 418, guards 367, evidence 359, timelimit 338, failures 306, limits 303, reports 296,
  canary 290, metrics 232, salvage 202, accounting 194, queuecheck 104, lanestop 60). Thirteen parallel copies at once
  are themselves the load the suite then runs under. personal_pool_test.sh runs about 90 ticks of the real
  personal_tick.sh one after another.
- Rule 5, slice 3 (11-18): personal_pool_test.sh's reds were all time with no failed row: run alone at load 25-35 it
  passed all 197 rows in 690 s. One tick of the real personal_tick.sh took 7.5 s there, of which 5.6 s was CPU (about
  90 process starts), so the time is work, not a wait, and grows with the machine's load; no row waits on a fixed
  sleep (its waits end on an event: land-live, the pause file, a reading count, or a short limit the row sets
  itself). It is now three suites on one
  fixture, tools/test_personal_pool.sh, which each part names: personal_pool_test.sh (60 rows: pool, <span title="A numbered batch of planned work, with its own plan file.">refill</span>, retries,
  waits), personal_pool_requeue_test.sh (80: requeue, models, disk, merge limit, pins, Fable, cost) and
  personal_pool_pause_test.sh (57: pause, usage-limit end, feature sessions, chain mark): 123 s, 147 s and 181 s at
  load 5-18, each with its own limit. Every line of the old file is in one of the four. Left: personal_off_test.sh
  (median 372 s, the same shape) and cutting the tick's per-run process starts.
- site_swipe_test.py (T-4735, 11-18): stale, not a page fault. App (/app/, T-4240) became the top tab after Reports,
  so <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the Reports section's last subtab, leads on to App as swipe.js's order says; the test still called Pitches
  the last stop, and the rows after it followed from that. Rows now: Pitches -> App, App is the last stop, App back to
  Reports, Pitches back to Infrastructure. Rule 1 for a browser gesture, as done there: each gesture runs on
  Playwright's paused clock (`clock.install()`, `pause_at`, `run_for`), so a 120 ms swipe is 120 ms on the page's clock
  at any load; the check waits for the gesture's own last event (touchend, mouseup, keyup) on the window; what the page
  asked for is read from the Navigation API's navigate event, held, so "nothing happens" is no navigate event rather
  than an 800 ms sleep. Mutants: swipe.js's 600 ms limit cut to 119 ms turned 12 rows red; `.subtabs` dropped from its
  ignore list turned the subtabs row red.
- site_queued_order_test "live (a)" (11-18): asked the live board to list an umbrella row; on 11-18 none of the 30
  Queued rows was a feature's step and nothing was in flight, so it went red with no code change (rule 2: own the data).
  It now checks the rows that are there; that some exist and say their count is pinned on the suite's own boards.
- Rule 1 and rule 5, slice 4 (11-19): the tick's process starts per menu line, counted rather than timed. Counted with a
  logging stand-in for every command on PATH, one fixture tick (five-line menu, pool 4) started 322 processes; most
  were per menu line: done, tries, tried and tier read with a grep, cat or awk each (about 9 a line), the session menu's
  attempt check, and four for each line's Model note. tools/personal_tick.sh now reads every account's done, tries and
  tried lists and the tiers once a tick in one awk (menu_facts; cool_from does cool_left's sum from its counts), reads
  the Model notes of all lines in one awk, and matches the owned list and the attempts in the shell: 271 starts for
  the same tick, and on a 200-line board menu about 1,800 fewer a tick. A new row in personal_pool_test.sh counts grep,
  awk, cat, tail, tr, sed, head and sort starts for a one-line and a five-line menu: red before (68 and 115, about 12 a
  line), green after (42 and 58, 4 a line: the board line, waits_on's two greps, the board line again on the menu).
  model_note_fable_test.py found the block by a `done` line it no longer has, and now ends it at the guard's line.
  Left: personal_off_test.sh (median 372 s), board_line and waits_on per line, and the limit-cut row's 3 s session
  (PERSONAL_SESSION_SECONDS=3 in personal_pool_test.sh) races the stand-in's commit at high load (rule 1).
- Rule 5 and rule 1, slice 5 (11-19): personal_off_test.sh (median 372 s against a 360 s base, cut five times with no
  failed row, T-4787 rows 76, 77, 83, 89, 93) is three suites on one fixture, tools/test_personal_off.sh (the stand-ins,
  the test repository's template, fresh and the helpers; each part names it, so the gate runs all three when it
  changes): personal_off_test.sh (section 1 on this tree, the whole road, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branches, refusals, chat replies on a
  held account: 31 ticks), personal_off_hold_test.sh (meter and holder failures, holds, claims, the done and try lists,
  tiers, suites, worktree states, the lock, trips and their issue: 42 ticks) and personal_off_stop_test.sh (stops from
  beside the session, unclean ends, retries, lifts, the Investors' stops, account b: 49 ticks). At load 300-420 on 11-19
  (about 20 s a tick) they took 194 s, 494 s and 476 s, 52, 42 and 47 rows, all green; every line of the old file is in
  one of the four. Two waits that load could outrun went with it: the lock row's holder was `sleep 30` (dead before a
  slow tick read the lock) and is now a process that lives until the row <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it; launchd's stop polled 6 s for the
  session's keeper and now polls with a 120 s ceiling, with its own row if the keeper never came. Left: the limit-cut
  row's 3 s session in personal_pool_test.sh (rule 1), board_line and waits_on per line, supervisor_test groups.
- Rule 1 and rule 2, slice 6 (11-20): three rows a clock or the caller's environment decided.
  personal_pool_test.sh's limit-cut row (T-1192 cut) gave the session 3 s and a 1 s grace, and its last start was the
  limit itself, so at load the stand-in's commit, its take or its half-work came after the TERM and the row went red
  with the code right. Now the stand-in traps the limit's TERM on its first line and takes it only once its work is
  made (bash runs a trap after its foreground command ends), the grace is a 300 s ceiling and the last start is past
  the limit. Red first: with a 4 s pause put in the stand-in before its work, the old row failed 2 of 3 ("T-0001 left no
  commit"); the new row passed with a 4 s and a 20 s pause. supervisor_test.sh's close_by row (T-4787 rows 90 and 111,
  red in two tasks): the stand-in slept 8 s, so a keeper pass slower than that let the session end on its own before
  session_end.py's check sent SIGTERM, and the name probe read ps 1 s after its start. Now the session waits up to
  120 s for the SIGTERM (a ceiling, as the PAUSE row's) and the probe is read once its script has run. Red first: with
  a 10 s heartbeat in each keeper pass, the old row failed and the new one passed in the same run. The time limit row
  above it counted starts (= 1) to say "not retried", which the 3 s limit could reach before the stand-in counted; it
  now reads no retry line and at most one start. Rule 2, found on the way: tools/test_personal_pool.sh unsets the
  caller's ANTHROPIC_* (run from a lane on account b, whose session carries ANTHROPIC_DEFAULT_FABLE_MODEL, three
  T-4125/T-4161 rows in personal_pool_requeue_test.sh were red). supervisor_test.sh is not split: its base is its own
  (2x its passing median, 1364 s, T-4701), and its groups already run at once; split into suites they would run one
  after another in run.sh's shell lane, longer in all. Measured 11-20 at load 40-140: 249/0 in 1523 s, groups 242
  (lanestop) to 1346 s (chain), over its base and passed inside the load stretch; the cure is less work per group (each
  group's ticks start the real supervisor), not a split. The pool parts after the change: 61/0 258 s, 80/0 402 s, 57/0
  334 s at load 27-140. Left: board_line and waits_on per line in the tick; ProStoreTests
  ask-to-buy under five Simulators.
- Rule 8 and rule 2, slice 7 (11-21): ProStoreTests ask-to-buy under five Simulators (T-4787 rows 2, 11, 17-20; six
  reds, the most of any bad test). Its fix was T-4008 (Idris, 0dc00ac09b, 11-10): a pending request that StoreKit's
  test environment lists as bought ends skipped with what StoreKit listed, and the app's own part is still checked on
  every read. Measured from origin/macbook-results, jobs' started and finished times overlapped: 369 land checks from
  11-11 to 11-21, 58 of them with 4 to 6 jobs on the MacBook at once (25 with 6), and none named a ProStoreTests test
  failed or skipped (the 350 that ran tests each listed every skip by name); 11-07 to 11-10 had 19 such checks, and
  ops/metrics/xc_rerun.jsonl has no rerun at all. So the four ProStoreTests lines came off ops/xc_rerun_tests.txt, which
  is now empty. Two suites read main's list as their fixture: tests/xc_rerun_test.py copied it into its throwaway
  repository and required it to be non-empty, and tests/personal_land_test.sh's rerun rows copied it too. Each now
  writes its own one-line list (rule 2). Red first: on the emptied list the old xc_rerun_test.py failed 11 rows ("is
  not on the list") and stopped; the new one passes 61/0 on both the old list and the empty one. The old
  personal_land_test.sh failed its five T-3995 rows and only those (471/5, 479 s); the new one passes 476/0 (491 s),
  both through tests/run.sh at load 10-57. ProStoreTests.swift itself is unchanged, so no Xcode run was needed.
{% endraw %}

</div>
