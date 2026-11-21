---
layout: "default"
title: "T-5355: where it stopped (lane-b2, 11-20 about 3:45 PM ET)"
section: "documents"
description: "Uncommitted in [local folder] (a copy of the diff is in /Volumes/SANDISK SSD/company-scratch/T-5355-odalys/t5355-fault1-v2.patch; apply with git apply): fault 1, second try, after Pernille&#x27;s review."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5355-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5355-handoff.md</code></span></div><h1>T-5355: where it stopped (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-b2, 11-20 about 3:45 PM ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
## Where it stands, 8:00 PM ET 11-20 (Odalys, lane b, branch `personal/b`): read this part first

**Committed on `personal/b`, not yet on main:**
- Job 7's six commits, cherry-picked from the copy with no conflicts: `748479ee19`..`54d3198ba0`.
- `09b4188d02`, switch-on fault 1, first try: a broken `project.yml` is a red. Pernille's second review says it does
  **not** close the fault (below). The uncommitted fix replaces its rule; the commit stays in the history.
- `cfcc3f6e1e`, switch-on fault 2: the held path keeps the task, reason and checks that `merge_red` wrote into
  `<id>.held`, and it writes the sent-back row that merge_red could not write. Pernille: this closes the fault.
  **A person should confirm where it lives.** The guard refused Odalys's edit to `tools/personal_tick.sh`, so the fix
  sits in `tools/personal_land.sh` `park_one` instead. personal_tick.sh is unchanged. Someone should say whether
  park_one is the right home for it, and that it is not a way around the guard.

**Suites run this session, each once, `env -u ANTHROPIC_DEFAULT_FABLE_MODEL`, all green:**
- personal_pool_requeue_test 127/0. Run on the working tree with the fault-2 change, before fault 1's second try.
- merge_sh_test 52/0 (on `09b4188d02`).
- personal_land_test 476/0 (on `cfcc3f6e1e`).
- personal_pool_test 61/0 (it reads neither merge.sh nor the requeue suite).

**Uncommitted in `[local folder]`** (a copy of the diff is in `/Volumes/SANDISK SSD/company-scratch/T-5355-odalys/t5355-fault1-v2.patch`; apply with `git apply`):
fault 1, second try, after Pernille's review.
- Her MUST-FIX: a change that broke its own `fetch_editor.sh` or editor patches still got an uncounted 75 and
  waited for ever.
- Her SHOULD-FIX: the project.yml and deletion rule turned a disk or Vendor failure into a red.
- What changed, as she suggested: in `xc_check` every setup failure (the editor's sources, xcodegen missing,
  `xcodegen generate`) returns 76. `check()` then ends merge.sh with **exit 3**, saying "<check> could not be set up
  here (exit 3) ...". The tick already counts any exit but 75 toward its 6-hour <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, so personal_tick.sh needs no
  change. The project.yml and deletion rule is gone.
- Rows in `tests/merge_sh_test.sh`: the stand-in xcodegen now fails only on a project.yml that says "broken". There
  are rows for a broken project.yml and a broken fetch_editor.sh (each exit 3), a control on a good project.yml (a
  red at the unit tests), and a 75 from the Xcode run itself (still 75).
- Rows in `tests/personal_pool_requeue_test.sh` take the same exit-3 line, word for word: it is a counted wait, and
  past six hours it goes back to its author.
- Why it is not committed (no suite has passed on it): its merge_sh_test run waited for a test slot from about 7:37 PM, was stopped with no
  result at the 10-minute limit, and 8:00 PM came first.

**Pernille's review of the two fixes (she wrote neither):**
- Fix 2, `cfcc3f6e1e`: closes its fault.
- Fix 1, `09b4188d02`: does not fully close it.
  - MUST-FIX, merge.sh 186-187: a change that breaks its own `fetch_editor.sh` or editor patches still gets an
    uncounted 75 and waits for ever. merge_sh_test 235-239 asserted that wait.
  - SHOULD-FIX, merge.sh 194-195: a disk or Vendor failure made any project.yml change a red, and the deletion
    clause covered every file under pywidget/ios.
  - Her suggestion, which the uncommitted fix follows: count the setup waits toward the 6-hour cap, rather than
    judging by what the change touches.
  - Her note: the old rows proved only the classification, because the stub xcodegen failed whatever the file said.

**The uncommitted diff, to redo it if the patch is lost** (`git diff` in the lane, 138 lines):
- `tools/merge.sh`:
  - header Exit line: adds "3 a check's setup could not finish here (a wait a lane's tick counts, T-5355)";
  - `check()`: after the `75` line, `code 76` gives `end 3 wait "$name" "$name could not be set up here (exit 3):
    nothing merged; run it again (a lane's tick counts this wait toward its cap)"`;
  - `xc_check`: the `fetch_editor.sh` failure returns 76 (was 75); a new `command -v xcodegen` check returns 76;
    a failed `xcodegen generate` returns 76. The project.yml and `--diff-filter=D` red block from `09b4188d02` is
    removed.
- `tests/merge_sh_test.sh`: the T-5256/T-5355 block at the end is rewritten.
  - The stub xcodegen fails only when `project.yml` contains "broken".
  - Rows: a broken project.yml gives exit 3, wait, cause app-unit-tests, and the exact line; a broken
    fetch_editor.sh gives exit 3 with xcodegen not reached; a control on a good project.yml is a red (exit 1); and
    `xc_code` 75 from the Xcode run is still 75.
- `tests/personal_pool_requeue_test.sh`, after the F4 control row: `merge_says 3` with the same exact line. It is a
  counted wait ("waiting since", the waits file written), and with the waits file six hours old it is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> with
  "the last: app-unit-tests could not be set up here" in the reason.

**Next, in order:**
1. merge_sh_test, then personal_pool_requeue_test (for its two new rows). Commit the three files by path once both
   are green.
2. Pernille re-reviews the second try.
3. personal_pool_pause_test, personal_off_test, then the once-list below.
4. Land with the switch "old".

The two faults still block switching it on until a person confirms fault 2's home and the second try of fault 1 has
been reviewed.

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
- a broken `project.yml` waits for ever, since those waits are not counted toward the cap;
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
