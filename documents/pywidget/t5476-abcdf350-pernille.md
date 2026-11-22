---
layout: "default"
title: "Review of T-5476 at abcdf350: the split build and test pair checked on the MacBook runner"
section: "documents"
description: "PASS with findings. What the board line describes is what the code does, and the main risks hold: no red build-for-testing is kept as green; a kept green answers only filters it covers; a kept red answers only the same\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5476-abcdf350-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 32 · Sun Nov 22</span><span><code>pywidget/docs/reviews/t5476-abcdf350-pernille.md</code></span></div><h1>Review of T-5476 at abcdf350: the split build and test pair checked on the MacBook runner</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5550, Commandment 13). Author: Odalys. Reviewed: `git show abcdf35078`, that is tools/xc_route.py
(+102/-6: `SPLIT`, `PAIR_KEEP`, `tests_ran`, `pair_path`, `pair_kept`, `pair_keep`, and the changes to `premerge`) and
tests/xc_route_test.py (+106: `t5476_split_pair`). abcdf35078 itself is not in this branch's history; it landed as
780e15df97, and the two patches are identical (diffed). Nothing after 780e15df97 touches tools/xc_route.py,
tests/xc_route_test.py or tools/feature_session.py (HEAD 390f0cb759). Judged against the T-5550 board line (the
behaviour described there) and against tools/feature_session.py `bisect_lines` (0 green, 1 bad, 125 skip, 255 stop).
Also read, for what the change relies on: `decide`, `only_testing`, `covers`, `check_extra`, `route`, `state` and
`tests_report` in tools/xc_route.py; `premerge`, `_premerge`'s result loop, `result_code` and `snapshot` in
tools/land_xc.py; `result_for` in tools/jobs.py; `tests_block` and the result writer in tools/macbook-runner/runner.py;
the test-verdict and summary block of tools/xc.sh (:400-455); `xc_cmd`, `step_plan` and the bisect caller (:982-991) in
tools/feature_session.py. Line numbers are HEAD's. Date: 2026-11-22.

What I ran (no Xcode; no tracked file edited):
- `python3 tests/xc_route_test.py` at HEAD: PASS 131 FAIL 0 in 125 s. All 12 T-5476 rows print ok. The 9 rows over the
  commit's 122 are T-5477's (3e5999c631, which landed first; 9 "ok T-5477" lines in the output).
- I tried to run the same test at abcdf35078 and at its parent, from git archive copies in the T-5550 scratch folder,
  to check the 122/0 and the red-first claim. The first attempt failed on a missing pywidget/ios/project.yml in the
  copy. The second attempt, which also extracted that file, was refused by the security-guard hook ("this command
  starts Claude Code outside the governor"). Under Commandment 14 that item stopped there. **I did not confirm the
  122/0, the red-first 8/9 or the 7 hand mutants.**
- A read of every xc-test result.json on the results branch (8bcaef60e2, 162 xc-test results) to check how
  `tests_ran` sorts real results: 85 passed with a tests block, all `tests_ran`; 40 failed with tests that ran; 28
  failed with no tests block (each one I opened, J-20261106-2159, -1739, -1749 and J-20261105-0902, is a build
  failure, `** TEST FAILED **`, exit 65); 3 of those 28 are exit 124 hangs; 1 passed with no block; 6 error, 2 refused. No real
  result has a tests block with 0 executed and 0 failing.

## What holds

- **The XC_LOCAL unset path is unchanged.** With no XC_LOCAL, `decide` still sends build-for-testing and
  test-without-building to "not a test or build run" (:216-217), and `premerge` returns at once because `why` is not
  "XC_LOCAL=1" (:567-568). `XC_LOCAL=here` likewise (the test's last row). For XC_LOCAL=1 and any action other than the
  pair, `split` is None, `targs == args`, and the only new code that runs is two extra row keys gated on `split`.
- **Only a run whose tests ran turns green.** `tests_ran` (:505-509) needs a tests block with executed > 0 or
  failing_count > 0. runner.py writes that block only from xc.sh's last "xc.sh: tests:" line or its xc_verdict JSON,
  and it skips lines before the last "runner warm-up" line, so a warm-up step's tests do not count for the job
  (runner.py:596-635). A build failure gets no block (xc.sh prints the line only with totals or test names,
  xc.sh:440-449). The 28 real build failures above all read as not ran. A 75 or 143 is never turned green (:626). An
  exit 0 counts as ran (:629). That is safe, because `result_code` gives 0 only for status passed, exit 0 and 0 failures
  (land_xc.py:536-542 with xc_route.py `state`).
- **A filtered unit job still compiles the UI test target.** J-20261106-1749-xc-test (only_testing four PyWidgetTests
  classes) failed on an error in UITests/RunLogUITests.swift. So the build step's PyWidgetTests job covers the whole
  test build, and a commit that breaks only UI test code is still a build red, which bisect reads as 125.
- **The kept record answers only what it covers.** `pair_kept` (:517-533) returns a green kept job only when its filters
  `covers` the request's. A request with no filter is never covered, because the build step always has a list, at
  least `UNIT_ONLY` (:579-580). A red kept job is returned only when the sorted filters are equal, so a red under
  PyWidgetTests is never a red for PyWidgetTests/ThemeTests. The kept red's code is the job's own test exit (65 for a
  test red), which bisect maps to 1.
- **The key is the right tree.** `tree` is `<snapshot commit>^{tree}` (:600). `snapshot` is HEAD, or HEAD plus the run
  paths' uncommitted and untracked files written through a private index (land_xc.py:981-1003). So the key is exactly
  what the runner was sent. A dirty worktree gives its own tree. A different tree misses and asks its own job. A tree
  that changes only outside the run paths also misses, which costs a job and gives no wrong verdict. A record with the
  same tree is the same content.
- **Races only lose records.** `pair_keep` reads, changes and writes without a lock, but writes through a per-pid temp
  file and `os.replace` (:551-556), so a reader never sees a half-written file. Two writers at once can drop each
  other's record; the test step then asks its own job. A missing, unreadable or non-dict store, or `tree` None, gives
  None (:524-528, :541-542).
- **Bisect, build step:** green whenever tests ran, red with the job's exit when none ran, so 125 means "does not
  build" for every result that reaches `tests_ran`. **Test step, kept path:** the kept 0 or 65 gives bisect 0 or 1.

## Findings

### M1 (Medium): a test-without-building that asks its own job reads that job's build failure as a test red, which bisect reads as bad

tools/xc_route.py:626-633; tools/feature_session.py:597-598. The `tests_ran` check applies only when `split ==
"build-for-testing"`. A test-without-building with no kept answer sends a full xc-test job, which builds again on the
runner (the commit says so), and its exit is used as it comes. A build failure in that job is exit 65 with no tests run
(as in the 28 results above), and the bisect script maps `t = 65` to `exit 1`, bad. Run locally, test-without-building
cannot fail to build. This path is not rare. It is the normal path whenever the bisect's or the plan's filters include
PyWidgetUITests (never covered by the kept PyWidgetTests job), whenever the kept job was red and the filters differ, and
whenever the record was lost or evicted. Within one bisect step the tree is the one the build step just built green.
So a build failure here does not come from the commit but from the runner. J-20261105-0902-xc-test is a real example:
Theme.xcassets "you don't have permission to view it", exit 65, no tests block. One such failure marks a good commit
bad, and `git bisect` then names the wrong first-bad commit. It gives no warning. Fix: for `split ==
"test-without-building"` on its own job, a nonzero code with `tests_ran` False is not a test verdict. Return it as a stop
(a code bisect maps to 255; feature_session's `exit 255` branch already takes anything other than 0 and 65), or let the
run fall back here. Add a test row with a red result and no tests block for test-without-building. Filed as T-5571.

### M2 (Medium): a build step whose unit run hangs reads as "does not build" (125)

tools/xc_route.py:626 with tools/feature_session.py:596; tools/land_xc.py:542-544. The build step now also runs the
unit target with a 1200 s limit (`CHECK_UNIT_S`). A run the runner stops at its limit is code 143. The code passes 143
through unchanged, as the commit says, but bisect's build line maps every code except 0, 75 and 124 to 125. So a hang
in any unit test is recorded as "this commit does not build". Locally the build step builds and runs no tests, and a
hung test run later gives xc.sh 124, which bisect maps to 255, stop. A bisect of a hang regression therefore skips
every bad commit and ends with no answer. The hangs in the result read above were exit 124 inside a failed result,
which `result_code` maps to 1. Such a result reaches `tests_ran` and, if no totals were printed, is also a build red.
Fix: in bisect_lines, map 143 like 124 (`exit 255`), or give the build step an exit for "tests did not finish" that the
script stops on. Add a row for a timeout result on build-for-testing. Filed as T-5572.

### L1 (Low): a kept answer has no age or runner bound

tools/xc_route.py:517-533, :536-556. A kept record is used for every later test-without-building at that tree with
covered filters, from any worktree (the store is in git's common folder), until 20 newer trees push it out. There is no
time limit and no check of the runner version or Xcode. A flaky red kept for some filters is therefore served again for
the same filters, and a re-run under XC_LOCAL=1 cannot get a fresh verdict. The printed line names the kept job, so a
reader can see it. Fix, when convenient: drop a record older than a session (a few hours, from `at`), and give a way to
bypass it (for example XC_PAIR_FRESH=1). Filed with L2 as one board line; board_tick joined it to T-5571 as a note (ops/board_notes/T-5571.md), since it has the same Targets and Done when.

### L2 (Low): the test rows miss the paths M1 and M2 run through

tests/xc_route_test.py:483-588. There is no row for a 143 or 75 build-for-testing (nothing kept, exit passed through),
none for a red own-job test-without-building with no tests block (M1), none for a red result whose tests block shows 0
executed and 0 failing, none for the XC_LOCAL unset build-for-testing (the code path is unchanged, checked by reading),
and none for a corrupt or non-dict split-pair.json. Fix: add those rows with T-5571 and T-5572. Filed with L1 (the T-5571 note).

### Observations (not findings)

- A test host that crashes before its first test case would, by the code, give a failed result with no executed or
  failing count. The build step would then read it as a build red and bisect would skip. I found no such real result
  (no tests block with 0 executed and 0 failing among the 162), so I file nothing.
- When a bisect's filters are UI tests, each step runs PyWidgetTests once in the build step and then builds again for
  the UI job. That is about 90-136 s of extra unit run per step (`BUILD_EXPECTED_S` comment), and the unit red is
  thrown away. It costs time and gives no wrong verdict. Passing the bisect's filters to build-for-testing would let the
  kept job answer the test step.

## Verdict

PASS with findings. What the board line describes is what the code does, and the main risks hold: no red
build-for-testing is kept as green; a kept green answers only filters it covers; a kept red answers only the same
filters; the key is the exact tree the runner was sent; races only lose records; the unset and `here` paths are
unchanged. The test passes at HEAD, 131/0 (122 plus T-5477's 9). Two Mediums are bisect-semantics gaps the new path
opens. A runner build failure on a test step's own job reads as bad (M1, T-5571), and a hung unit run on the build step
reads as skip (M2, T-5572). Both are small fixes and should land before a bisect is trusted on the comparison day. The
Lows ride as a note on T-5571. I could not confirm the commit's 122/0, red-first and hand-mutant figures at abcdf35078 itself: the
copy run was refused by the security-guard hook.
{% endraw %}

</div>
