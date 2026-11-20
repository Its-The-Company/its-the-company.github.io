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

**Corrected by the Investors, 11-20 9:01 AM ET** (`log/rulings.md`). The first paragraph above is not evidence
against the old system: from 11-08, and again from 11-17, the Investors' <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> put process work first, so the
split between `pywidget/` and `tools/` commits shows what was asked for. The old road also carried a lot in that
week: 29, 21, 43, 99, 58, 45 and 109 branches reached main on the seven days (`ops/runs/land_steps.jsonl`, rows
"landed"). Whether the trimmed system is faster is **not proven**. It is judged by one comparison: both systems
doing app work only, over equal whole days, on the measures below. The old system's app-only days began with the
freeze (11-20 2:11 AM); the trim's own heavy test runs stay off the machine while they are counted. The switch
to the new merge road waits for that baseline.

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

**One area session for each area that has ready app work and usage left on its account, plus today's short
Investor-message and report sessions** (they touch no app files). The three areas below are the starting split. Each area session works in its own worktree, uses subagents inside itself, and merges with
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

**The number of sessions follows signals, not a fixed count or a timer** (Investors, Mac mini session, 11-20
1:51 AM ET). The rule is checked whenever one of its signals changes, by whatever starts the sessions (the cut-down
`supervisor.sh` after step 6):
- *Start* a session for each area that has ready app work and usage left on its account. Reads: the board's
  startable app lines whose Targets fall in the area's paths (`tools/board.py lanes`); the account's meter
  (`ops/usage.json`, `ops/live_meter.json`).
- *Add* a session when ready app work waits while an Xcode machine sits idle. Reads: the same ready lines; the
  Mac mini's Xcode lock (`tools/xc_lock.py`, `ops/metrics/xc.jsonl`) and the MacBook runner's check-ins
  (`runner.status` in `ops/metrics/machine.jsonl`, `tools/runner_busy.py`).
- *Drop* a session when sessions spend more time waiting on Xcode or merges than working. Reads: `wait_s` against
  run time in `ops/metrics/xc.jsonl` and `xc_route.jsonl`; the wait column of `merge.sh`'s rows; each session's
  working time from its note in `ops/sessions/<area>.md`.

**The areas follow the work, not the other way round** (an Investor #325 c7032478115, 1:40 AM ET 11-20). The table is
the starting split. The areas are re-cut whenever the ready app work on the board shifts (the same ready-line count
as above, per area): an area with no ready work hands its session to the area with the most, and areas split or
merge as the work needs.
- *A feature that fits no area* goes to the area that owns most of the files it touches. That session owns it end
  to end and changes another area's files in small separate merges, with a board line naming the area it touched.
- *Work that needs another area's work* says so on its line ("needs T-X"). The owning area does that piece first.
  The waiting session takes other ready work in the meantime; it never sits idle on a dependency.

**Accounts.** The main account has about twice the usage of each personal account. It runs the trim session,
because the trim is the one long continuous job and it runs in the main checkout. After the trim, it runs the
Builder area, the critical path to the firm date (the Builder working on a phone). The two personal accounts run
the other areas. Once the trim is done, any account with usage to spare (its meter) goes to the area with the most
ready app work.

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

**How a step is confirmed** (Investors, Mac mini session, 11-20 1:51 AM ET). No step waits a fixed number of hours
or days. A step is confirmed when its check passes on the real traffic it changes, and its Progress line names the
events that confirmed it. Where a step below still says "for 24 hours", "for 48 hours" or "a week", read:
- step 1: the next hand-out ticks of each account give out no process line, and the next reading of a signal past
  its limit opens no line (`ops/runs/dispatch.log`, the watcher's own output);
- step 3: the next real app merges through `merge.sh`, main's app tests green after each (its rows);
- step 5: every merge through `merge.sh` since the step keeps its commits on main (`merge-base --is-ancestor`),
  checked at each later step;
- step 6: the next heartbeats arrive on time, the next Investor message is answered once, and the next morning and
  evening reports build and pass `report_check.py`;
- step 7: the next report built from the trimmed board passes `report_check.py`.

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

Same commands before and after, over windows of equal length. "Before" is 11-13 to 11-19 (7 days); "after" starts
when step 6 is confirmed and is compared with the same number of days of "before", day for day, as soon as there
are whole days to compare; the full 7 days are reported when they exist.


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

- **Standing rulings the freeze touches** (step 1): an Investor 11-17 9:20 PM (a bottleneck automatically opens a
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

## Order changed by the Investors, 11-20 8:15 AM ET: prove it first, Home untouched

"Hold off on any major changes to Home! We still haven't seen proof that the trimmed system is better, so do not
rebuild anything until the system is finished and tested." (typed into the Mac mini session; `log/rulings.md`;
#325 c7040483268). What Home reads is listed in [`ops/plans/T-5257-home-map.md`](t-5257-home-map.html). So:

- **Step 4 is on hold**, and with it every retirement of something Home reads: the old landing layer (step 5), the
  pool, lanes and hand-out (step 6), `task_stages.py`, `task_names_store.py`, `board_stale.py` (step 7), the
  dashboards and their records (step 8). They stay switched on and in place.
- **What goes on, beside the old system:** step 3 (real merges through `tools/merge.sh` while the old road runs),
  step 9 (tests that give the same answer every time), step 10 (pre-merge Xcode runs on the MacBook), and the
  parts of steps 5 to 8 nothing on Home or in a report reads, each checked against the map first.
- **The proof:** the page's measures, old road against new over the same days: the wait from ready to main and main's
  app tests green after a merge (`ops/metrics/merge.jsonl` against `ops/runs/land_steps.jsonl`), app code commits
  on main a day. The Investors see those figures, then decide on Home and on the rest of the retiring.

## Progress

Each step, when its check passes, adds one line here: "Step N done:" with the date, the commit and the evidence.

**Step 1 done:** 2026-11-20 4:25 AM ET, commits `6962df81d2` (the switch's code and tests), `f37c9f7dcf` and
`0088a16bc8` (`ops/trim_freeze.json` on; site lines held too), `c70a36fccf` (the main-folder guard's pass for the
trim session, on the Investors' word, #325 c7032785128). Retired nothing.
- *Evidence.* Lines the hand-out lists as startable: 398 before the switch, 220 after, none of kind tools, process,
  ops or site and none naming `tools/` or `tests/` (`python3 tools/dispatch.py order`). The "before" column
  re-run from the page's commands: 152 app code commits (15, 4, 24, 23, 37, 40, 9), 83 app lines done
  (14, 8, 16, 5, 14, 19, 7); `tools/` 522 entries (the page's 525 was counted earlier), about 200,000 lines.
- *Events that confirmed it.* 27 hand-out ticks from 2:11 to 4:22 AM (13 of account a, 14 of b,
  `ops/runs/dispatch.log`) gave out no process line. They gave out no app line either: every free slot was
  held by its own branch waiting to land or by the machine's load, the old road's jam, not the freeze (9 tasks
  started in the four hours before). No tool-opened process line was added to the board after the switch
  (`git diff f37c9f7dcf 3f28d35d4d -- ops/board.md`).
- *Tests.* `tests/run.sh --fast` did not pass, and did not pass before the trim: 34 of 576 suites red at
  `0088a16bc8`. Of those, 28 are red at `7af07ff3da`, the commit before step 1's code (same suites, scratch copy);
  2 passed on a re-run (`personal_land_test.sh`, `site_t4293_test.py`); 4 (`kind_first_test.py`,
  `live_meter_test.py`, `site_session_chart_test.py`, `site_session_view_test.py`) are red in the main folder and
  green in a scratch copy of the same commit `3f28d35d4d`, so they read the main folder's live files. None is red
  because of step 1. The guard suites are green (`guard_test.sh`, `main_folder_guard_test.py` 85 of 85). The 32
  standing reds are step 9's work; until then a step's test check is "no suite red that was green at the commit
  before the step, same folder".
- *Restore.* `"on": false` in `ops/trim_freeze.json`; remove `.git/main-folder-pass.json`.

**Step 2 done:** 2026-11-20 6:31 AM ET, commits `f52b8ee152` (`tools/retire.sh` and its suite, 24 of 24),
`b4ea7ffbd9` (99 tools and 38 of their suite files moved to `retired/`, 137 renames, one row each in
`retired/MANIFEST.tsv`), `4f89e3b078` (the restore drill's rows), `bcee46e391` (one test fix).
- *Evidence.* `tools/` went from 522 entries to 424 (about 13,200 lines moved). `git grep` at `4f89e3b078` for each
  retired tool's name in `tools/`, `tests/`, `rules/`, `setup/`, `handbook/`, `ops/launchd`, `ops/prompts`,
  `personnel/agents`, `.github`, `CLAUDE.md` and the settings finds only test fixture data, no caller. Restore
  drill: `js_size.py` and `fit_words.py` restored with `retire.sh --restore`, run (the first printed its table,
  the second's suite passed 15 of 15), and retired again.
- *Fewer than the page's "about 180", on purpose.* 135 tools have no caller. 36 of them are still named by
  another suite (the terms guard's and the store-refusal tests among them) and wait for the step that settles
  those suites; `storage_guard.py`, 7 tools that read the app and 31 on the keep list stay.
- *Events that confirmed it.* The fast run at `8286528389`: 539 suites, 38 red against 34 after step 1. Seven were
  newly red. One was this step's: `disk_sweep_test.py` asks that every temp-folder name the sweep cleans has a
  maker, and `fit_words.py`'s had moved; the check reads `retired/` too now (`bcee46e391`). The other six passed
  on a re-run with it (7 of 7 green at `fcf13dd375`); the first run overlapped a load of over 800. The guard suites
  were green in both. The next real events: the inbox answered an Investor's 6:06 AM message once (#325), and the
  morning report (Report 56) was built at 6:21 AM, both after the retire.
- *Pace.* A fast run takes about two hours, so from here the next step starts while the last step's run finishes;
  a red it finds that was green before the step is fixed, or the step restored, before that step is ticked.
- *Restore.* `tools/retire.sh --restore <path>` for any row of `tools/retire.sh --list`.
{% endraw %}

</div>
