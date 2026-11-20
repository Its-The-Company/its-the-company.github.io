---
layout: "default"
title: "T-5257 (trim step 4): what Home reads today, and what each kept panel must be moved off"
section: "documents"
description: "Shared home_look functions other pages use, so they stay: stage_map, js_stages, merged_holds (live_stage); blocked_html (tasks_panel); CSS, running_rows, suites_words, FULL_MAX (session_page); name_of, people_of\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5257-home-map.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5257-home-map.md</code></span></div><h1>T-5257 (trim step 4): what Home reads today, and what each kept panel must be moved off</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-20, from a read-only map of `home()` (`tools/site/pages.py` 543-643), `home_look.home_html()`
(`tools/site/home_look.py` 3323-3765) and `home_flow.gather()` (`tools/site/home_flow.py` 597-623). Line numbers are
main's at `f56515588e`. "R" is a source the trim retires; "N" is one that stays. This is the working list for step 4;
nothing here has been changed yet.

## Found, and different from the target page

- **Three panels the page says stay are not on Home today.** "Needs you" and "Your requests open over 48 h" were taken
  off earlier (pages.py 570, T-4005; home_look 3745-3747, T-3950); only the old-request badge on Queued rows remains
  (`investor_age`, N). "Now (worker cards)" is built but only its hidden opening tag is emitted (pages.py 646-651).
  "Simulators" has no panel: Simulator figures show in the Machine panel and as card stages.
- **`lanes.js` cannot simply leave Home.** look.js redraws the In flight list from `S.lane`, which <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.js defines
  (home_look 934, 947; lanes.js 104), and /chat/ loads it too (pages.py 642).
- **`ops/metrics/flow.jsonl` is written by `tools/flow.py` (N), but from R inputs**: `.git/personal-ready` and
  `ops/runs/land_steps.jsonl` through `lifecycle.feed()`. After step 5 it needs `merge.sh`'s rows as its input.

## Data Home gathers that comes from R sources


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Data Home gathers that comes from R sources, scrolls sideways" style="--tw:860px" markdown="1">

| Where | What | R source |
|---|---|---|
| pages.py 579 | `lifecycle.read` keys `landing`, `mergeq`, `landing_now`, `held`, `parked`, `path`, `tries`, `hist`, `bottle`, `passes`, `gate`, `own_tests`, `merged` | `.git/personal-ready`, `land_order.py`, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> refs, `land_steps.jsonl`, `task_stages.py`, `main_gate.jsonl`, worker status |
| pages.py 580-586 | `task_names.fill` | `task_names_store.py` |
| pages.py 587-593 | `merge_page.collect` | `merge_page.py` |
| pages.py 605-610 | `merge_limit.status` | `merge_limit.py` |
| pages.py 626-627 | `personal.tile`, `personal.glance`, `lock_in_chip` | lanes, `ops/lock_in.json`, `usage_mode.py` |
| pages.py 630 | `home_look.read_order` | `dispatch.start_order()` |
| home_flow 218, 223, 389, 410 | `_limit`, `_waiting`, `_count_oldest`, `_count_ids` | `merge_limit.py`, `ops/metrics/waiting.jsonl` |
| home_flow 256 | `_tasks` | `queue_bars.py`; `task_queue_log.py` imports `governor` |
| home_flow 420 | `app_paths()` | `main_gate.FALLBACK_BASE` (a constant fallback exists, 74-75) |
| home_flow 567 | `_main_tests` | `personal-ready/main_green.json` (`main_green.py`) |
| home_flow 615 | `sent_back` | `sent_back.py` |

</div>


## Kept panels: what to re-source

- **At a glance (the six answers):** the waiting count and limit (`_limit`, `_waiting`, the spark at home_look 3084),
  the Work bubble's bottleneck figures (`life.bottle`, 3407-3408), "lanes paused" (`#lk-pz`, 3401-3402), main's tests
  (`_main_tests`). New sources: `merge.sh` rows for waiting and for main's tests; `xc.jsonl` and `xc_route.jsonl`.
- **Flow:** the charts (`chart_html` 3120-3126 -> `queue_charts.py`), the pool part (3141 -> `flow_pool`,
  `ops/metrics/pool.jsonl` from `pool_adapt.py`), the signals part (3155 -> `flow_signals`, `bottleneck.jsonl` from
  `bottleneck_watch.py`), the "As of" line (3197). "App changes on main by day" (`app_html` 3225-3235, `_main` 447)
  needs only `app_paths()` off `main_gate`.
- **The app:** only `app_paths()`.
- **Bottlenecks:** `bottle_body` 2892 (`task_stages.py`), `merge_line_html` 2800, `held_tests_html` 2861
  (`merge_page.py`). Rebuilt on Xcode wait per machine, runner idle while the mini ran Xcode, merges waiting or red.
- **Stuck or failing (`home_flow.stuck` 640-669):** `count` (waiting) and `main_tests`; the runner and watcher parts
  are already N.
- **Usage:** `_spread_words` 2243 reads `tools/governor.py`.
- **All tasks (home_look 3414-3729):** the order (`read_order`, dispatch), `flight_rows` 2123 and `stage_map` 1321
  (lane and gate stages), `retry_queue` 2058 and `back_card` 2017 (`sent_back`), `add_passes` 1890
  (`main_gate.jsonl`), the feature grouping (3603-3614, `queue_tree.py`), `merge_words` 1990. Target: the board with
  three stages, to do, in progress, merged.
- **Progress, Reports link, timeline, Machine, Operators & Direct, Blocked or waiting:** N throughout.

## Retired from Home: where they are drawn, and who else uses them


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Retired from Home: where they are drawn, and who else uses them, scrolls sideways" style="--tw:930px" markdown="1">

| Item | Home code | Also used by |
|---|---|---|
| Limit on unmerged work | pages.py 605-610; home_look `now_html` 3021-3078, `limit_html` 1216-1265 | `session_page.py` (367, 383), `tools/home_live_shots.py` |
| Retry Queue | home_look 2017-2120, 3509-3542, 3717-3723, 3749-3753 | `session_page.py` (591, 975, 1139) |
| Merge-line states | pages.py 587-593; home_look 1990-2014, 2123-2156, 2800-2883 | `live_stage.py` 300-305 (status.json's `ln`) |
| Lanes view | script tags pages.py 633, 642; `tools/site/assets/lanes.js` | look.js In flight; /chat/ now.js; `tools/site/lanes.py` only by `infra.py` 386 |
| Queue charts and tree | home_look 3084-3129, 3213; 47, 3465, 3603-3614, 3648 | no other page |
| Lock In chip, Mode bubble and controls | pages.py 711-746; home_look 2323-2379, 3754; `assets/lockin.js` | live_status's `lock_in` field (build.py 338) |
| Personal-lane tiles | pages.py 626, 633; home_look 2373, 3401-3402, 2295-2296; `assets/personal.js` | `personal.account_words` and `OWNERS` are used widely: keep the module |

</div>


Shared `home_look` functions other pages use, so they stay: `stage_map`, `js_stages`, `merged_holds` (live_stage);
`blocked_html` (tasks_panel); `CSS`, `running_rows`, `suites_words`, `FULL_MAX` (session_page); `name_of`,
`people_of` (task_names); `run_card`, `level`, `_span`, `JS` (ops_look).

## Suites that assert on a retired item (each needs changing with the panel it covers)

`site_home_flow_test.py`, `site_limit_line_test.py`, `site_home_tasks_all_test.py`, `site_home_t4094_test.py`,
`site_home_t3986_test.py`, `site_parked_t3756_test.py`, `site_parked_landed_t4677_test.py`, `site_merge_queue_test.py`,
`site_merging_test.py`, `site_queue_tree_test.py`, `site_queued_order_test.py`, `site_s30_test.py`,
`site_home_replace_test.py`, `site_t2940_test.py`, `site_lock_in_test.py`, `site_personal_test.py`,
`site_t4320_test.py`, `site_t3318_test.py`, `site_home_t4308_test.py`, `site_flow_signals_test.py`,
`site_build_unit_test.py`, `site_chat_only_test.py`, `site_test.sh`, `site_t3219_test.py`, `site_t3284_test.py`,
`site_t4293_test.py`, `site_t3996_simq_test.py`, `site_session_view_test.py`, `site_session_chart_test.py`,
`task_queue_chart_test.py`. That is 30 suites; the This Session page shares `merge_limit`, `sent_back` and the
Lock In script with Home, so it moves in the same step or keeps a copy of what it reads.

## How to check the step

- Build without publishing: `python3 -I tools/site_build.py --out <empty dir> --no-gh`. No record of how long a build
  takes was found.
- Screenshots: `python3 tools/home_live_shots.py OUT --src <built dir>` (390 and 1280 px; it compares against
  `merge_limit.py status`, so it changes in this step too) or `tools/home_block_shot.py` for one section.
{% endraw %}

</div>
