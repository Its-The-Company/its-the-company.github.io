---
layout: "default"
title: "T-5252: hand-off of the pre-comparison work to the personal accounts (11-20, 11:05 AM ET)"
section: "documents"
description: "Odalys. The main account reached 96% of its week at 11:00 AM on 11-20 (it resets Sun 11-22 2:00 AM ET) and is kept for the Investor inbox and the reports. The Investors asked that the unfinished work be handed to a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5252-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5252-handoff.md</code></span></div><h1>T-5252: hand-off of the pre-comparison work to the personal accounts (11-20, 11:05 AM ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys. The main account reached 96% of its week at 11:00 AM on 11-20 (it resets Sun 11-22 2:00 AM ET) and is kept
for the Investor inbox and the reports. The Investors asked that the unfinished work be handed to a personal
account (Mac mini session, 11-20 about 11:00 AM; `log/rulings.md`). Everything below is saved as commits in scratch
copies; nothing is lost. The plan in force and why: [`ops/plans/T-5252-target-system.md`](t-5252-target-system.html), "The plan in force since
11-20 9:10 AM ET". **Deadline: all of it on main by Saturday 11-21 evening.** The comparison of the two merge roads
starts Sunday 2:00 AM (old road Sun, new Mon, old Tue, new Wed).

## Rules that hold for every job here

- Work in your own <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> checkout or a scratch copy; never edit code in the main folder.
- A copy's commits are in this repository: bring them in with `git cherry-pick <first>^..<tip>` (the shas below), or
  go on in the copy itself (`/Volumes/SANDISK SSD/company-scratch/<name>/wt`, the path holds a space).
- Commits by path, author `Odalys <(email withheld)>`. Delete nothing. No new tool files.
- Do not change the site's Home (`tools/site/pages.py` home(), `home_look.py`, `home_flow.py`, look.js, lanes.js,
  lockin.js, personal.js): Investors, 11-20 8:15 AM. Do not weaken a guard. A guard or hook refusal stops that item:
  report it on the task's board line.
- No Xcode, no real MacBook job, no real `storage_guard.py clean`, no run of the real tick, land or `tools/merge.sh`
  against live lanes, unless the job says so. Suites only by name through `bash tests/run.sh <suite> ...`, one call
  at a time. The machine is loaded: a time-out is not a red; run it again.
- The merge-road switch (`ops/merge_road.json`) stays "old". Nobody flips it before the Sunday baseline day is over
  and `tools/personal_land.sh road-check` passes.
- Standing reds on main before this work (do not chase them here): see the page's Progress, steps 1 and 2.

## Ahead of all other work, and no test run twice (Investors, 11-20 11:10 AM ET)

- T-5354 and T-5355 are first in `ops/merge_first.txt`: a personal account takes them before anything else, and
  takes them up again at once when its week resets (a: Sat 11-21 10:00 AM; b: Sat 2:00 PM) if they are not done.
- **Do not run again what has already passed for the same code.** What passed, and where:
  - Job 1: on main since 11:06 AM 11-20 (`aa851bf441`, merged by `tools/merge.sh`, its suites green). Nothing left.
  - Job 2: each of its ten suites green three times on tip `1f85a3a7ef` (`run1.log` to `run5.log` beside the copy).
    Only the landing's own check is left; do not re-run them by hand first.
  - Job 7: on the three commits as first written, green: `personal_land_test.sh` 461, `merge_queue_test.py` 140,
    `personal_pool_requeue_test.sh` 108, `personal_pool_test.sh` 61, `personal_pool_pause_test.sh` 57,
    `personal_off_test.sh` 138. After the review's fixes, run only the suites whose tool or rows you changed, then
    the hub list once at the end.
  - Jobs 3, 4, 5, 6: no suite has been run on their tips. Run each named suite once on plain main only if you need
    to tell a standing red from yours; `supervisor_test.sh` and `macbook_runner_update_test.py` have standing reds.
  - A suite that passed on a commit is not re-run after a rebase that did not touch its tool, its own file or
    `tests/run.sh`; the landing's check is the last word.
- **Say where it stands as you go.** When a job reaches main, and when one is stuck for more than an hour, queue a
  short plain note for the main thread (#325) through the lane's records (`tools/lane_outbox.py`), saying which job,
  the commit, and what is left on the list below. The main account's inbox session posts it.

## What must be true before the comparison starts (Sunday 11-22, 2:00 AM ET)

1. Jobs 2 to 7 on main, the merge-road switch still "old". (Job 1 is.)
2. The disk keeper's first deep cleanup has run by itself and the internal disk is over its 30 GB line.
3. One real pre-merge Xcode run from a lane went to the MacBook and is on record (job 6), or #325 says the routing
   is held out of both roads.
4. A second review of the switch's fixes says it is safe to switch on after a drain.
5. Main's app tests are green on the MacBook (`python3 tools/runner_watch.py status`: "red": null) on Saturday evening.
6. All three accounts signed in (the Investors confirm), and the Investors' answer on restarting the Mac mini.
7. No proposal waiting to be applied during the four days; none is applied until Thursday 2:00 AM.
8. At Sunday 2:00 AM: each account's meter reading recorded on the trim's page; the old road runs that day as it is.
9. At Monday 2:00 AM: `tools/personal_land.sh road-check` passes, the meters are recorded, then `ops/merge_road.json`
   goes to "merge.sh"; back to "old" on Tuesday 2:00 AM, to "merge.sh" on Wednesday 2:00 AM, to "old" on Thursday
   2:00 AM, the same check and reading each time. Thursday: the figures, both roads side by side, to the Investors.

## Jobs, smallest first

**1. Test fixes, tools that stay (T-5262).** Copy `T-5262a-odalys/wt`, 7 commits, tip `e54b9a36eb`, nothing
uncommitted. Each commit fixes one suite (board_notes_readers, composer, disk_sweep_temp, macbook_runner_update,
swift_strings_catalog, alpha_run, kind_first, live_meter: read `git log main..HEAD` there for which are done). Left:
get them on main. Its worker's final report was not received; read each commit message for what is proven.

**2. Test fixes, site (T-5262).** Copy `T-5262b-odalys/wt`, 6 commits, tip `1f85a3a7ef`, each suite green three
times in the copy: site_work, site_no_live, site_dashboard, site_lanes, site_t3396, site_type_scale,
site_session_chart, site_session_view, site_t3190, site_t4313. Left: get them on main; then run
`site_session_chart_test.py` and `site_session_view_test.py` once from the main folder (they failed only there).
Not fixed, on purpose: site_dash_probe (its subject left Home on 11-04: retire it with `tools/retire.sh`, step 9,
reason "tests the Overview dashboard removed 57bd3d0a45"); site_home_replace and site_personal (red only on Day 30);
site_task_names_shown and site_t3316 (real Home faults: they wait for the Home hold to <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>).

**3. Records round skips files gone from disk (T-5306).** Copy `T-5306-odalys/wt`, tip `b5aeda2a64` (WIP: red test
rows written in `tests/records_round_test.py`, the fix in `tools/records_round.py` not yet written). Left: the fix
(skip a path that no longer exists, say so, carry on), suite green, on main.

**4. The supervisor no longer breaks a live session's lock (T-5113).** Copy `T-5113b-odalys/wt`, tip `2b05ebac64`
(WIP: the fix in `tools/supervisor.sh` near the `-mmin +360` test and its rows in `tests/supervisor_test.sh` are
written; the suite has not been run). A lock is stale only when its process is gone or the pid was reused, never by
age alone. `supervisor_test.sh` is on `ops/land_quarantine.txt` as flaky (T-3118) and slow: run it on plain main
once to know which rows are red there. Left: suite, on main.

**5. The disk keeper runs the deep cleaner by itself (T-5041's urgent slice; <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 11-20 12:01 AM).** Copy
`T-5041-odalys/wt`, tip `744e278969` (WIP: the step in `tools/disk_keeper.py` and rows in
`tests/disk_keeper_test.py` are written, suites not yet run). The step: when the keeper's own steps leave the internal
disk under its line (`ops/disk.json`), run `tools/storage_guard.py clean --yes --keep-posters` as a subprocess with a
time limit, at most once per interval, record the command and GB before and after in
`ops/metrics/disk_keeper.jsonl`; a note is posted only when even that fails. Read the keeper's header on T-2587
(Simulator trimming from the keeper was refused once) and make sure the step does not repeat what was refused; if
it does, stop and say so. Left: suites (`disk_keeper_test.py storage_guard_test.py`), on main. **Do not run the
real cleaner from a session**: the keeper's next pass does it once the step is on main (the disk was at 24 GB at
10:05 AM, line 30, gate 10).

**6. Pre-merge Xcode runs go to the MacBook (T-5263 with T-5247 part 2), and T-4566.** Copy `T-5263-odalys/wt`,
2 commits, tip `80ed7ff2f0` (the second is "T-4566: WIP ..."). Design: [`ops/plans/T-5247-runner-pre-merge.md`](t-5247-runner-pre-merge.html)
section 4 (check refs as `tools/land_xc.py` already uses on `land/<id>`; the caller waits and falls back to the Mac
mini only when the runner is down; an old runner with a new caller must fall back, never hang or pass falsely).
T-4566: a test run that names a build setting the runner's job does not carry stays on the Mac mini. Read the two
commit messages for what is done and proven. Left: finish, touched suites green (`xc_route_test.py`,
`land_xc_test.py`, `xc_inputs_test.py`, `xc_rerun_test.py`, runner suites; `macbook_runner_update_test.py` has a
standing red row), a review by a worker who did not write it, then on main. **Real proof comes after it is on
main:** one real pre-merge run from a lane must show a row in `ops/metrics/land_xc.jsonl` and the route answer in
`ops/metrics/xc_route.jsonl`; if that cannot be shown by Saturday evening, say so on #325: both roads then go
without it.

**7. The merge-road switch, off (T-5256).** Copy `T-5256b-odalys/wt`, 3 commits, tip `19126bf1b7` (rebased on
main). Design: [`ops/plans/T-5256-merge-road-switch.md`](t-5256-merge-road-switch.html). An independent review found it safe to land switched off
and NOT safe to switch on. Its findings, all to be fixed in the copy before it lands (the review's words are in
the Mac mini session's record; the list):
- F1 `merge_now` must wait, uncounted, while `ops/paused` exists (the old road refuses to land in a pause).
- F2 the two roads must never take one branch across a flip: `merge_now` holds the old road's per-lane busy mark
  (`.git/personal-ready/.busy-<id>`, kept fresh) around the `merge.sh` run and waits if it or a live `.landing` is
  there; `land()` re-tests the road before each branch; and a new read-only `tools/personal_land.sh road-check`
  exits 0 only when no ready marker (lanes and spares), `.held`, live `.landing`, `.merge-road` lock or `.busy-*`
  exists and the lane outbox is empty, else lists what is in the way.
- F3 after a red is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>, its tasks come off the lane's done list (`$STATE/done`, as `requeue` does), or the
  hand-out never gives the work back.
- F4 the wait <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: keyed on the marker's `first` sha; exit 75, a held lock, the pause and "main folder dirty" or
  "would be overwritten" do not count; capped by time since the first counted wait (6 hours), not by tries.
- F5 a failed park: record the sent-back row if the parked name exists; if it does not, write `<id>.held` with the
  task, tip and reason so the tick's held path parks it.
- F6 at its start `merge_now` repairs its own marker (one with a `first` line) whose tip is not the branch tip.
- F9 a merge whose push failed sets `.git/personal-ready/.push_due` as the old road does.
- F10 the `.merge-road` lock gets a 3-hour age ceiling. F12: the `read ... < "$waits" 2>/dev/null` line prints an
  error on the first wait; test the file first.
- ROAD_WORDS: the session never runs `tools/merge.sh` itself, only `tools/merge.sh review`; the name is a worker's
  first name as in `personnel/registry.json`; untracked files under tools/, tests/, pywidget/ or rules/ make review
  refuse; an app change after the review needs the review again.
- In `tools/merge.sh` `xc_check` only: a failure to set up the editor's sources or of `xcodegen generate` returns
  75 (a wait), not a red.
- Each fix gets a row in the suites the copy already extends (`tests/personal_pool_requeue_test.sh`,
  `tests/personal_land_test.sh`, `tests/merge_queue_test.py`). Then: those three plus `merge_sh_test.sh`,
  `personal_pool_test.sh`, `personal_pool_pause_test.sh`, `personal_off_test.sh`, and once
  `personal_parked_test.sh personal_train_test.sh personal_slots_test.sh land_first_try_test.sh land_next_test.sh
  lane_records_round_test.sh`; a second review of the fixes by a worker who did not write them; then on main with
  the switch "old". Accepted for the test and left alone: a suite red on main too parks a branch on the new road;
  the old road's after-land steps (review board line, feature-step ticks) do not happen on the new one.

## How to put a finished job on main

By the old road, as any lane's work (the lane's ready mark and land): it is the road in force until the comparison.
`tools/merge.sh --task <ID>` from a scratch copy also works and was the plan for jobs 1 to 5, but on 11-20 its
suite check waited over an hour for a test slot; use whichever is free. Never both for one change.

## What the main session still owes

Board ticks for T-5256, T-5262, T-5263 when their work is on main; the Progress lines on the trim's page; the
Saturday evening check that main's app tests are green; the meters of all three accounts recorded at each 2:00 AM
flip; the Investors' two asks (sign-ins fresh, a restart of the Mac mini) are on #325 c7042399879.
{% endraw %}

</div>
