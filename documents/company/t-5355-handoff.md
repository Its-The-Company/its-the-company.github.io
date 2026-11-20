---
layout: "default"
title: "T-5355: where it stopped (lane-b2, 11-20 about 3:45 PM ET)"
section: "documents"
description: "Four commits by Odalys, cherry-picked onto personal/b2 from the copy T-5263-odalys/wt (tip fd3cbbf9f4): T-5247 1a185e22e0, T-4566 80ed7ff2f0, ab51269db9, fd3cbbf9f4 (the review&#x27;s fixes). Reviewed by Idris (did not write\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5355-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5355-handoff.md</code></span></div><h1>T-5355: where it stopped (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-b2, 11-20 about 3:45 PM ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Read [`ops/plans/T-5252-handoff.md`](t-5252-handoff.html) first; its rules hold. This note says only what is done and what is left.

## Job 6 (pre-merge Xcode runs to the MacBook, T-5263 with T-5247 part 2, and T-4566): done, on lane-b2's branch

Four commits by Odalys, cherry-picked onto `personal/b2` from the copy `T-5263-odalys/wt` (tip `fd3cbbf9f4`):
T-5247 `1a185e22e0`, T-4566 `80ed7ff2f0`, `ab51269db9`, `fd3cbbf9f4` (the review's fixes). Reviewed by Idris (did not
write it): safe to land; his three should-fix findings are fixed in `fd3cbbf9f4` (merge.sh is a caller that stays on
the Mac mini; a job is overdue by its own limit; a failure after the push takes the ref and note back). Notes left
alone: `-xcconfig`/`-testPlan` with no XC_LOCAL go to the runner, which ignores them; a `ps` failure counts a gate
"unknown". Green: xc_route_test 107, land_xc_test 115 (on `fd3cbbf9f4`); xc_route_local_test 6, xc_inputs_test 87,
xc_rerun_test 60 (on `ab51269db9`; the review fixes touched neither). It lands with lane-b2's branch.
Left once it is on main: the one real pre-merge run from a lane, with a row in `ops/metrics/land_xc.jsonl` and the
route answer in `ops/metrics/xc_route.jsonl`; if that cannot be shown by Saturday evening, say so on #325.

## Job 7 (the merge-road switch, off, T-5256): not landed; the next session goes on from the copy

Copy `/Volumes/SANDISK SSD/company-scratch/T-5256b-odalys/wt`, 6 commits on main, tip `caa1489a61`, nothing
uncommitted. The first review's list is fixed: F1-F6, F9, F10, F12, ROAD_WORDS (`caa1489a61`), `land()` re-tests the
road and the read-only `personal_land.sh road-check` (`5ccbd4e431`), merge.sh `xc_check` setup failures are a wait,
75 (`20822db400`). `ops/merge_road.json` is "old".

Proven on `caa1489a61`: merge_sh_test 50/0, personal_land_test 474/0. personal_pool_requeue_test 124/3: the three red
rows (T-4125, T-4161) read a Fable model setting in that worker's environment; the run with it unset waited two hours
for a test slot and was stopped with no result. Not yet run: personal_pool_requeue_test (clean environment),
personal_pool_test, personal_pool_pause_test, personal_off_test, and once `personal_parked_test.sh
personal_train_test.sh personal_slots_test.sh land_first_try_test.sh land_next_test.sh lane_records_round_test.sh`.

Second review (Pernille, did not write it): **safe to land with the switch "old"; not safe to switch on**, for two:
- a broken `project.yml` waits for ever, since those waits are not counted toward the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>;
- the tick's held path drops the task and reason that `merge_red` wrote into `<id>.held`.

A guard refused Odalys's edit to `tools/personal_tick.sh` for those two ("this command changes the personal lane's
state"); per the hand-off rules that item stopped there and is on T-5355's board line. Left, in order:
1. The suites above, once each, from a clean environment: `env -u ANTHROPIC_DEFAULT_FABLE_MODEL bash tests/run.sh ...`
   (with it set, three T-4125 rows of personal_pool_requeue_test read red).
2. Cherry-pick `880417a8c0^..caa1489a61` onto the lane's branch and land it with the switch "old": the review says
   that is safe.
3. The two switch-on faults: fixed by a path the guard allows, or put to a person on the board line; then a review
   of those fixes by a worker who did not write them. Until both are fixed, `road-check` passing is not enough to
   flip the switch on Monday 2:00 AM.
{% endraw %}

</div>
