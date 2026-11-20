---
layout: "default"
title: "T-5252: the target system, and the steps that trim toward it"
section: "documents"
description: "Since 11-13, main took 291 commits to pywidget/ and about as many to tools/ (219) and tests/ (248). tools/ holds 525 entries and about 200,000 lines. Only 152 of the app commits were code or tests; the rest were docs\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5252-target-system.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5252-target-system.md</code></span></div><h1>T-5252: the target system, and the steps that trim toward it</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-20, 1:30 AM ET. P0, asked by an Investor on #325 (c7032155472, 1:20 AM ET: "write the target page and
put the steps on the board"; c7032290657, 1:28 AM ET: "Do this immediately and stop all other work ... Make sure we
don't delete anything from the current system yet ... keep all necessary elements on the site's Home page that fit
with this newly-designed system"). The design is the Operator's three replies on #325 (c7031612058, c7032056187,
c7032177531). This page is the brief; the board lines "part of T-5252" are the checklist; the prompt for a Mac mini
session is [`ops/plans/T-5252-mac-mini-prompt.md`](t-5252-mac-mini-prompt.html). **Nothing here has started. The Investors choose how it runs.**

## Why

Since 11-13, main took 291 commits to `pywidget/` and about as many to `tools/` (219) and `tests/` (248).
`tools/` holds 525 entries and about 200,000 lines. Only 152 of the app commits were code or tests; the rest were
docs. On 11-19 only 9 app code commits reached main, because the road to main was jammed: one test slot, a
three-hour proposal check, and the MacBook runner idle while the Mac mini ran 76 Xcode runs (T-5234, T-5247).

The limit is how many Xcode and Simulator runs the two machines can do, not how many agents run. So the target is a
few sessions, Xcode kept busy on both machines, tests that give the same answer every time, and one merge script
simple enough to almost never need fixing.

## The keep-everything rule

**Nothing is deleted.** A part that leaves the system is *retired*: it is switched off or no longer called, then
moved with `git mv` to the same path under `retired/` (for example `tools/merge_queue.py` becomes
`retired/tools/merge_queue.py`, its suite `retired/tests/merge_queue_test.py`), so nothing imports or runs it by
accident and `tests/run.sh` no longer runs its suite. Each retired file gets one row in `retired/MANIFEST.tsv`: the
path, the step, the commit that switched it off, why, and how to bring it back.

- **To bring one back:** `git mv retired/<path> <path>`, `git revert <switch-off commit>`, reload its launchd job
  if it had one (the plist stays in `ops/launchd/`), and run its own suite. `tools/retire.sh <path> --restore` does
  the first two (step 2 writes it).
- Board lines are held or closed, never removed. Handbook rules are retired with `tools/ruling_record.py retire`,
  which keeps them in [`handbook/standing-retired.md`](standing-retired.html). Nothing in `log/`, `story/`, `reports/`, `ops/runs/` or
  `ops/metrics/` is touched.
- A real deletion, later, is a separate Investor decision.

## What stays


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What stays, scrolls sideways" style="--tw:853px" markdown="1">

| Part | Files | Why it stays |
|---|---|---|
| Guards and records | `rules/hooks/` (security-guard, protect-records, model-guard, config-guard, session-canary), `rules/file-guard.sh`, `rules/posture.sh`, `tools/ssd_guard.py`, `tools/main_folder_guard.py`, `tools/hooks/pre-commit`, `tools/terms_guard.py` with `robots_*` and `terms_*`, `tools/records.py`, `events.py`, `ruling_record.py`, `ledger_row.py`, `refusals.py`, `tamper_note.py`, `privacy_prepublish_grep.py`, `memory_archive.py`; `log/`, `story/`, `reports/` | They keep the bans, the three gates and true records. The trim changes none of them except to drop a mention of a retired tool. |
| Investor inbox and receipts | `tools/inbox.py`, `inbox_watch.py` (launchd), `inbox_route.py`, `urgent.py`, `investor_queue.py`, `requests_close.py`, `apply_proposal.py` (the applier), `tools/heartbeat.sh` with `.github/workflows/watchdog.yml` and `rules/watchdog.sh` | Every Investor message gets one reply and is recorded; Investor-owned files change only through the applier; the watchdog still opens an Emergency if the Mac goes quiet. |
| Xcode on both machines | `tools/xc.sh`, `xc_route.py`, `xc_lock.py`, `xc_sim.py`, `xc_results.py`, `xc_verdict.py`, `xc_helpers.py`, `jobs.py`, `jobs_loop.py`, `land_xc.py` (becomes T-5247 part 2's check-ref road), `tools/macbook-runner/`, `runner_busy.py`, `heavy_slot.py`, `upload.sh`, `testflight_ledger.py` | A run goes to whichever machine is free; the Mac mini runs it itself only when the runner is down (T-5236, T-5247). |
| The tests | `pywidget/ios/Tests`, `pywidget/ios/UITests`, `pywidget/tests`; `tests/run.sh` with the guard suites (`guard_test.sh` and the rest) and the suites of every tool that stays | The tests are the judge for every merge, so they must be trusted (step 9). |
| One merge script | `tools/merge.sh` (new, step 3) | Takes over from the landing, retry, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> and queue layer (about 86 files, 37,000 lines), which is retired, not deleted. |
| Handoff | `ops/board.md` through `tools/board.py` and `board_tick.py`, `ops/state.md`, one note per area session `ops/sessions/<area>.md` (new), worker memory, `tools/session_end.py` | A session ends at its usage limit; the next one starts from what is written. |
| Site and reports | `tools/site_build.py`, `tools/site/`, `report_check.py`, `report_facts.py`, `site_publish.sh`; the Home panels below | Part III of the Handbook, and the Investors follow progress on Home. |
| Product tools | `pkg_*`, `openssl_gate.py`, `py_imports.py` and any tool that reads or builds `pywidget/` | They are app work, not process. |

</div>


## Sessions and app areas

**Three area sessions to start, one per area, plus today's short Investor-message and report sessions** (they touch
no app files). Each area session works in its own worktree, uses subagents inside itself, and merges with
`tools/merge.sh`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Sessions and app areas, scrolls sideways" style="--tw:753px" markdown="1">

| Area | Owner | Paths it owns |
|---|---|---|
| Builder and editor | Idris | `pywidget/ios/App/Editor`, `App/Projects`, `App/Gallery`, `pywidget/ios/Core`, their tests and docs |
| Widgets, Pages and the phone | Maren, with Idris reviewing | `pywidget/ios/Widget`, `App/Pages`, `App/Device`, `App/Settings`, `StoreKit`, `Shared` (but not Bridge or RunLog), `pywidget/widgets`, `templates`, `examples` |
| Python runtime and packages | Pernille | `App/Runtime`, `App/Bridge`, `Shared/Bridge`, `Shared/RunLog`, `Vendor`, `python-stubs`, `pywidget/python`, `runtime`, `packages`, `licenses` |

</div>


Shared files (`project.yml`, `Localization`, shared test helpers, `Acknowledgements`, `Privacy`) are changed by
whoever needs them and merged on their own. Odalys runs the trim. Wrenna's research is done inside the area that
needs it.

**The number moves on evidence, not taste.** After two days: go to two sessions if area sessions waited on Xcode for
more than a quarter of their working time; go to four if both machines were idle for more than a quarter of the
day while sessions had app work ready.

**The areas follow the work, not the other way round** (an Investor #325 c7032478115, 1:40 AM ET 11-20). The table is
the starting split. At each two-day check the areas are re-cut by where the ready app work on the board is: an
area with no ready work hands its session to the area with the most, and an area can be split or merged.
- *A feature that fits no area* goes to the area that owns most of the files it touches. That session owns it end
  to end and changes another area's files in small separate merges, with a board line naming the area it touched.
- *Work that needs another area's work* says so on its line ("needs T-X"). The owning area does that piece first.
  The waiting session takes other ready work in the meantime; it never sits idle on a dependency.

**Accounts.** The main account has about twice the usage of each personal account. It runs the trim session,
because the trim is the one long continuous job and it runs in the main checkout. After the trim, it runs the
Builder area, the critical path to the firm date (the Builder working on a phone). The two personal accounts run
the other two areas.

## The Home page during and after the trim

No Home panel goes blank. Before a step retires a tool that a panel reads, that panel is switched to its new
source or retired with a one-line note on Home saying where the figure went. The Home builder is `home()` in
`tools/site/pages.py` with `tools/site/home_look.py` and `tools/site/home_flow.py`.

**Stay (they fit the new system):**


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The Home page during and after the trim, scrolls sideways" style="--tw:640px" markdown="1">

| Panel | Source after the trim |
|---|---|
| At a glance (the six answers, `home_flow.py`) | Same, with "waiting to merge" read from `merge.sh` rows |
| Flow, with "App changes on main" by day | Same; app changes counted as code and tests only, the measure below |
| The app (milestone, newest build) | Same (`ops/milestones.json`, `testflight_ledger.py`) |
| Bottlenecks | Rebuilt on the new limits: Xcode wait on each machine (`xc.jsonl`, `xc_route.jsonl`), runner idle while the mini ran Xcode (`runner_busy.py`), merges waiting or red (`merge.sh` rows) |
| Simulators, widened to Xcode on both machines | `xc.jsonl`, the runner's check-ins |
| Stuck or failing | Main's app tests red, heartbeat late, runner down |
| Needs you, and Your requests open over 48 h | Same (`investor_age.py`, the inbox) |
| Now (worker cards) | One card per area session and its current line |
| Usage | Same |
| All tasks | The board, with three stages: to do, in progress, merged |
| Progress, Reports link, timeline | Same |

</div>


**Retired from Home (their source is retired):** the limit on unmerged work (`merge_limit.py`), the Retry Queue
(sent back), the merge-line states per task (`merge_page.py`, replaced by `merge.sh` rows), the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> view
(`lanes.js`, `site/lanes.py`), the queue charts (`queue_charts.py`, `queue_tree.py`), the Lock In chip and the
personal-lane tiles (pool controls). Each goes to `retired/` like any tool and comes back the same way.

## Frozen while the trim runs

- **No new process features.** No new tool in `tools/`, no new process suite, no new `[tools]` or `[measure]` line,
  except the steps below and fixes to something broken (a fault that stops merging, loses data, or breaks a guard).
- **The 151 open `[tools]` and 11 `[measure]` lines are held.** Lines whose targets a step retires are closed by
  that step as "held by T-5252 step N" and archived, so they can be reopened.
- **Tools stop opening process lines** (`bottleneck_watch.py`, `nightly_suites.py`, the gates' red lines).
- **The queue's process work is paused; app work goes on.** Nothing lands into files being retired.
- **Never frozen:** the guards and their tests, the Investor inbox, the heartbeat, the reports and Home, and
  sections 6, 7 and 11. The guard suites pass after every step; a step that would weaken a ban or a gate stops.

## The steps

Each is one board line: steps 1 to 12 are T-5254 to T-5265, in order. "Restore" for every retire step is the
keep-everything rule above, plus what the step names. Step 10 is the same work as T-5247's part 2: whichever
line runs it closes both.

1. **Freeze and record the baseline.** Switch off the process kinds in the hand-out and line-opening in
   `bottleneck_watch.py`, `nightly_suites.py`, `main_gate.py`; hold the open process lines. Retires nothing.
   Risk: low; a real fault could wait (fixes of broken things stay allowed). Check: no new tool-opened process line
   for 24 hours; the "before" column below confirmed. Restore: switch the kinds back on.
2. **Write the retire tool, and retire the scripts nothing calls.** `tools/retire.sh` (move, manifest row,
   `--restore`) and `retired/MANIFEST.tsv`. Then about 180 entries with no caller in any tool, hook, launchd job,
   Handbook rule or agent file: one-off research pulls (`as_*`, `discourse_*`, `se_*`, `forum_*`, `hn_*` and
   similar), screenshot scripts (`*_shots.py`), one-off measurements (`meteor_*`, `*_rate.py`, `*_stats.py` with no
   reader) and stale copies (`*.py.new`), with their tests. Product tools stay. Risk: low. Check: `tests/run.sh
   --fast` and the guard suites green; a grep at HEAD finds no caller; one tool restored and run as a drill.
3. **Write the one merge script, beside the old road.** `tools/merge.sh`, about 200 lines: in the session's
   worktree, fetch main, rebase the branch on it, run the checks (the app's unit tests through `xc.sh` on whichever
   machine is free; the guard suites; the host suites the diff touches), confirm app code has a review record by
   someone other than its author, then fast-forward main under one lock and push. Red stops and reports; nothing is
   retried, parked or queued. It writes one row per merge (wait, checks, result). Risk: high, it is the road to
   main. Check: reviewed by someone other than its author; run in "say only" mode on 5 real app branches while the
   old road still lands them, with the same verdicts; then 10 real merges with main's app tests green after each.
4. **Move Home to its new sources** (after 3). The panels in the Home section above: re-source the ones that stay,
   retire the ones that go, each with its note. Risk: medium; the Investors could lose sight of a figure. Check:
   the site builds; every staying panel shows a figure from its new source; a screenshot of Home before and after
   in the step's evidence. Restore: revert the step's commits.
5. **Retire the old landing, retry and queue layer** (after 4). `personal_land.sh` (3,651 lines), `merge_queue.py`
   (1,959), `main_gate.py` (3,113), `lane_landcheck.py`, `land_*` except `land_xc.py` (15 files), `park*` and
   `parked_*` (12), `merge_*` (9, with `merge_first.py` and `merge_limit.py`), `queue_*` (8), `retry_*`,
   `known_red.py`, `main_green.py`, `switchback.py`, `push_to_verdict.py`, `check_cache.py`, `run_queue.sh`,
   `suite_limit.py`, `suite_floor.py`, `suite_order.py`, and their suites. About 86 files, 37,000 lines. Risk:
   high; a branch parked today could be stranded. Check: every parked ref and `land/*` ref is merged by `merge.sh`
   or listed for its owner first, and no ref is deleted; `tests/run.sh --fast` green; a week of merges loses no
   commit (`merge-base --is-ancestor`). Restore: also re-point the sessions at `personal_land.sh`.
6. **Replace the pool and lanes with the area sessions** (after 5). Retire `dispatch.py` (2,100 lines),
   `governor.py`, `pool_adapt.py`, `personal_tick.sh` and `personal_*`, `lane_*` (14, `lane_outbox.py` last),
   `feature_session.py` (1,223), `feature_place.py`, `feature_record.py`, `step_feed.py`, `worker_*`, `idle_*`,
   `session_holder.py`, `usage_mode.py`, `account_pace.py`, `fable_pause.py`, `limit_end.py`, `quiet_night.py`,
   `stall_watch.py`, `bottleneck_watch.py`, `hunt*`, `backtest_*`, `gradebook.py`, `experiments.py`. Cut
   `supervisor.sh` (1,323 lines; the old one kept as `retired/tools/supervisor.sh`) to three jobs: the heartbeat,
   the inbox, and starting each area session that is not running and has usage left. About 79 files, 36,000 lines.
   Risk: high; an Investor message could go unanswered or the heartbeat lapse. Check: heartbeat fresh every 15
   minutes for 48 hours; every Investor message answered once; exactly the planned area sessions running; guard
   suites green. Restore: also reload the `personal-tick` launchd jobs from `ops/launchd/`.
7. **Trim the board to a list and a handoff** (after 6). Keep `board.py` and `board_tick.py`; retire what served
   the pool: `board_growth.py`, `board_bytes.py`, `board_stale.py`, `board_weekly.py`, `board_stage_mine.py`,
   `kind_first.py`, `line_pin.py`, `task_names_store.py`, `task_stages.py`, `task_states.py`, `task_queue_log.py`.
   Add `ops/sessions/<area>.md`. Risk: medium; reports are built from done-notes. Check: `board_tick.py` add and
   tick work; the morning report builds and passes `report_check.py`; a new area session resumes from its note.
8. **Retire the dashboards Home no longer reads.** Keep `ops/metrics/xc.jsonl`, `xc_route.jsonl`, `machine.jsonl`,
   `runner_busy.py`, `home_flow.py`, `done_series.py` and the merge script's rows. Retire `dora.py`, `workflow_*`,
   `scoreboard.py`, `metric_series.py`, `ops_metrics.py`, `quality_metrics.py` and the rest of that group with no
   Home or report reader (about 30 files, 7,000 lines). Risk: low to medium; a report section could lose its source.
   Check: site builds; Home unchanged from step 4; the report still holds every part the Handbook asks.
9. **Make the tests trustworthy.** Each test on the 21-line quarantine list and in `known_red` is fixed, or retired
   with a reason; mutation runs move from every land to one nightly run on the MacBook (`xc_mutants.py` stays).
   Risk: medium; a retired test can hide a bug. Check: `merge.sh`'s checks run 3 times on one main commit give the
   same answer 3 times, on both machines.
10. **Finish Xcode routing (T-5247 part 2).** Pre-merge runs go to the runner through check refs; the Mac mini runs
    one only when the runner is down. This is the one piece built, not cut. Risk: medium (runner version bump).
    Check: local runs that only needed a commit on main near 0; the runner's idle hours while the mini ran Xcode
    fall. Restore: the runner's previous VERSION.
11. **Bring the Handbook and the proposals in line** (after 6). Retire or amend Handbook rules that name retired
    tools (rule 62's tool list, the lane and queue rules) with `tools/ruling_record.py`; send the Investor-owned
    changes listed below as proposals. Risk: low. Check: `rules/lookup.py --search` finds no retired tool named as
    live; each proposal answered.
12. **Measure after, and report.** Fill the "after" column, write the result into this page and the board, and
    let the Investors decide the session number and whether anything in `retired/` is ever deleted. Risk: none.
    Check: the table is filled from the same commands.

## How app work reaching main is measured

Same commands before and after, over 7 days each. "Before" is 11-13 to 11-19; "after" is the 7 days after step 6.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: How app work reaching main is measured, scrolls sideways" style="--tw:916px" markdown="1">

| Measure | Command (on main) | Before |
|---|---|---|
| App code commits on main | `git log main --since D1 --until D2 --oneline -- pywidget/ios pywidget/widgets pywidget/python pywidget/tests pywidget/runtime pywidget/packages \| wc -l` | 152 (a day: 15, 4, 24, 23, 37, 40, 9) |
| App lines done (`[build]`, `[fix]`) | done-notes in `log/board-archive.md` by date | 83 (14, 8, 16, 5, 14, 19, 7) |
| Wait from branch ready to main | `merge.sh` rows | not on record for the old road; partial in `ops/runs/land_steps.jsonl` |
| Main's app tests green after a merge | `merge.sh` rows | not on record |
| Live process size | `ls tools \| wc -l`; lines in `tools/` (retired files counted apart) | 525 entries, about 200,000 lines |

</div>


Target, an estimate to be checked: app code commits at or above the before week's median day (23) on most days,
no red merge left on main, and the live `tools/` at about half its size. The same figures show on Home (Flow and
Bottlenecks) while the trim runs.

## What needs the Investors' word

- **Standing <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> the freeze touches** (step 1): an Investor 11-17 9:20 PM (a bottleneck automatically opens a
  big-picture fix task), 11-18 8:22 PM (tool-opened lines grouped), and the 11-08 12:23 AM and 12:28 AM rulings on process
  tasks first. The freeze pauses the first and leaves the others idle. Sending the prompt below counts as that word
  only if the Investors say so; otherwise the session asks first.
- **Investor-owned files** (as proposals through the applier, or by the Investors' own session):
  - Step 6: `rules/personal_lane.py`, `rules/supervisor-keychain.sh`, `rules/build_agents.py`,
    `rules/hooks/security-guard.py` (names `supervisor.sh` and the governor), `setup/OPERATIONS.md` (45 mentions
    of the governor), `setup/INVESTORS.md`, `setup/SITE.md`.
  - Step 11: any wording in `rules/worker-rules.md` about lanes and the queue.
  - No step changes `.github/`, `investors/`, the charter or `.claude/settings.json`; the two company hooks it
    names (`ssd_guard.py`, `main_folder_guard.py`) stay.
- **The applier's own check** runs the whole `tests/run.sh --fast` (up to three hours, T-5234). In the Investors'
  own session they can make these changes directly with their word.

Nothing on this page weakens sections 6, 7 or 11, the bans or the gates. The guards stay as they are, nothing is
deleted, and the merge script adds a review check and retires no test of a guard.

## Progress

Each step, when its check passes, adds one line here: "Step N done:" with the date, the commit and the evidence.
{% endraw %}

</div>
