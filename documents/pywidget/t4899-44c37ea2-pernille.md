---
layout: "default"
title: "Review of 44c37ea2: T-4899, a MacBook job for testETokenOnTheHomeScreen alone"
section: "documents"
description: "The commit&#x27;s whole content is one job, and that job could never run. The runner takes only PyWidgetTests[/...] filters (tools/macbook-runner/runner.py:189), and both tools/jobs.py (:24 at 44c37ea2&#x27;s parent) and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4899-44c37ea2-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4899-44c37ea2-pernille.md</code></span></div><h1>Review of 44c37ea2: T-4899, a MacBook job for testETokenOnTheHomeScreen alone</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5219, Commandment 13). Author: Idris. Reviewed: 44c37ea273 as a whole, one file,
ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox/b-1795065326944202000-91736.json (a queued `jobs.py create`). Read against T-4899's board line and
ops/board_notes/T-4899.md. Also read, for what the job was meant to confirm and what became of it: the other T-4899
commits (`git log --all --grep T-4899`: 48d014e012, the setWidget change the job was to confirm; 6a22dfd42d and its
main copy 70dcd00ca2, the lane check in tools/jobs.py; the two board-note commits), T-4962's c54b61c2c2, the job
check in tools/macbook-runner/runner.py, tools/jobs.py, tools/xc_route.py's filter rules, tools/runner_watch.py's
tick rule, and the results on origin/macbook-results (read with git show). The author's memory files were not read.
Line numbers are at main 30399cb5b5 unless a commit is named. Date: 2026-11-21.

## Tests run

- `python3 tools/xc_route.py status` for J-20261118-0802-xc-test (the line's failure), J-20261118-2217-xc-test,
  J-20261120-0227-xc-test and J-20261121-0209-xc-test; results below.
- The queued job, rebuilt exactly as the replay would build it and passed to the runner's own `validate_job`
  (runner.py imported, stand-in commit): refused, `only_testing values must look like PyWidgetTests[/Class[/method]],
  not 'PyWidgetUITests/WidgetKitCheckTests/testETokenOnTheHomeScree'`.
- tools/jobs.py `check()` at main, on the same argv: refused with the same reason; on `PyWidgetTests/ThemeTests`:
  accepted. So the lane check added since (6a22dfd42d / 70dcd00ca2) refuses this job at once, as its note says.
- `python3 tests/lane_outbox_test.py` at main: 45 tests, OK (99.8 s).
- No Xcode build: the commit changes no code, and the runner cannot run one UI test alone.

## What happened to the job

- The outbox record was replayed on main and refused. It sits in ops/lane-outbox/failed/ (moved there by the records
  round bcf0498156, 11-19 8:17 PM). No ops/jobs/ file was ever made, so `xc_route.py status` has no job to show and
  origin/macbook-results has no result for it.
- J-20261118-0802 at 4d0b5a7eb0 (the line's job): failed, exit 65, one failure, WidgetKitCheckTests.swift:302 at that
  commit, token not read, Vision read the "Choose a widget" card. As the board line says.
- J-20261118-2217 (before c54b61c2c2): failed at :1731 at its commit, "no token_pwhcclpr row in the widget's
  choices", as 48d014e012's message says.
- J-20261120-0227, the daily full suite at ec63ed6caf (it contains c54b61c2c2 and 48d014e012): failed, exit 65,
  2 failures. testETokenOnTheHomeScreen got past setWidget and failed at the same assertion, now
  `UITests/WidgetKitCheckTests.swift:323`, reading "No view for this size" (T-5047's card); the other failure is
  testTPremadeDrawsPaperInLightAndStudioGreyInDark (:574). The author's 11-21 note is right on all of this.
- J-20261121-0209, the next daily: exit 124 after 1843 s, no test list kept. No reading of the test since 11-20.

## Verdict: FAIL

The commit's whole content is one job, and that job could never run. The runner takes only `PyWidgetTests[/...]`
filters (`tools/macbook-runner/runner.py:189`), and both tools/jobs.py (:24 at 44c37ea2's parent) and
tools/xc_route.py (:47 at the parent: "Any other filter (-skip-testing, the UI test target) queues the full suite";
:439, "the UI target runs in the daily") already said so when it was written. A re-run alone was also never the
answer: the failure needed code, and got it in T-4962 (b7d07e38b8, then c54b61c2c2's wait for the row); 48d014e012
only reworded the failure message. The confirm this job was for still has to be done, and it has to be done by a
job that can close the line (M1). Nothing in the commit needs reverting: the record is already retired as failed.

## Findings

### H1 (High): the queued job is one the runner refuses

- Where: ops/lane-outbox/b-1795065326944202000-91736.json (now ops/lane-outbox/failed/), argv `--only-testing
  PyWidgetUITests/WidgetKitCheckTests/testETokenOnTheHomeScreen`; refused by `runner.py:189` ONLY_TESTING_RE.
- Effect: the P0 line T-4899 stood two days with no confirm on the way (11-19 12:15 AM to the author's note on 11-21),
  and the subject line says a job for this test exists.
- Already fixed in the tooling: 6a22dfd42d / 70dcd00ca2 make a lane's `jobs.py create` check the job before it is
  queued; I reproduced the refusal and the test file passes (above). The confirm itself is M1's line.

### M1 (Medium): no job the author or the daily queues can tick T-4899

- Where: `tools/runner_watch.py:322` (`key_of`: a job's task, else its command and filter) and `:693-700` (a line
  ticks when a later passing job has the same key). The state file holds J-20261118-0802's key as `T-4892`, that
  job's own task, not T-4899.
- So the board line's "it ticks itself when one does" holds only for a later passing job carrying task T-4892. The
  job 44c37ea2 queued carried `--task T-4899`, and the daily full suite carries no task (key `xc-test|`); neither would
  have ticked the line even green. The 11-21 note's "this line can only tick after T-5047" is a true precondition but
  not enough.
- Fix: once T-5047 lands, queue one unfiltered xc-test (UI tests run only unfiltered) with the failed job's own task,
  or tick T-4899 by hand, citing a passing full suite that contains 48d014e012 and T-5047's fix, with
  testETokenOnTheHomeScreen in its executed tests.
- Board line: T-5501 (Idris, P1).

### L1 (Low): 48d014e012's message claims more than its diff does

- Where: 48d014e012 changes four lines, the XCTUnwrap message (now `UITests/WidgetKitCheckTests.swift:1941`). Its
  message says "setWidget now polls up to 20 s for a hittable row and swipes to one listed below or above the fold
  (at most 6 swipes)". The poll came from c54b61c2c2 (T-4962), and it swipes up once, only when a row is listed
  (`:1928-1933`, one `scrolled` flag); nothing swipes down, and there is no 6. 44c37ea2's purpose text repeats the
  claim. Commits are not rewritten; this review is the correcting record. No line.

## Checked and fine

- The outbox record's format is right for a lane `jobs` call (tool, argv, stdin), and the rest of its argv
  (command xc-test, by, task, purpose) is valid; only the filter fails.
- The board line's facts agree with the result file: exit 65, :302 at 4d0b5a7eb0, the token and the Vision read.
- T-5465 is not part of this failure. It was found while doing T-4899's lane check: tests/runner_queue_test.py
  :408-411 anchors mutants on `"    paths = run_paths()\n"`, and since fcc5de5a3e (T-5247) tools/xc_route.py:505 holds
  the same text indented 8 spaces, ahead of :570. Confirmed by reading; its line is right.
- :302 and :323 are the same assertion; T-5047 added the diagnostic in front of it, so the board line's :302 is the
  line at the failing commit, not a stale claim.

## Board lines

- T-5501 (M1, carries H1's confirm): confirm the token test fix with a job that can close its line (Idris, P1).
{% endraw %}

</div>
