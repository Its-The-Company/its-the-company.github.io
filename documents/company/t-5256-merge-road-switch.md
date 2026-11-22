---
layout: "default"
title: "T-5256: a switch that sends the lanes&#x27; ready work through tools/merge.sh (design only, nothing built)"
section: "documents"
description: "ops/merge_road.json &#123;&quot;road&quot;: &quot;old&quot; | &quot;merge.sh&quot;&#125;; missing, unreadable or anything else means old. About 60 lines in three tools, about 120 lines of new test cases, no change to supervisor.sh, dispatch.py, merge.sh, the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5256-merge-road-switch.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5256-merge-road-switch.md</code></span></div><h1>T-5256: a switch that sends the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>' ready work through tools/merge.sh (design only, nothing built)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-20, from a read-only study of `tools/personal_tick.sh`, `tools/personal_land.sh`,
`tools/supervisor.sh` and `tools/merge_queue.py` at main `0c13f227cd`. For the Investors' test of the new merge road
with no work done twice (`log/rulings.md` 11-20 9:00 AM). **Not started: it waits on the Investors' choice between the
full trim, a smaller plan, and the current system (asked in the Mac mini session, 11-20 about 9:05 AM).**

## The switch

`ops/merge_road.json` `{"road": "old" | "merge.sh"}`; missing, unreadable or anything else means old. About 60
lines in three tools, about 120 lines of new test cases, no change to `supervisor.sh`, `dispatch.py`, `merge.sh`, the
site or any guard. Flip back: set "old"; a waiting ready marker is picked up by the old land as it is.

1. `tools/personal_land.sh` (about 10 lines): a `road_new` test near line 474; in `land()` after `order_ids` (3486)
   it lands no branch when the road is merge.sh, skips the retry feed (3515) and `spec_kick` (3594), and keeps the
   drains, `post_lines`, `after_sync` and `personal_total`; in the dispatch `case` (3631-3640) `retry`,
   `retry-spare`, `handoff`, `lift` and `spec` exit 2. The tick already treats each of those refusals as a no-op
   (865-876, 896, 820-821, 1316-1320, 1595).
2. `tools/merge_queue.py` (about 4 lines): at the top of `main()` (568) it returns 0 with one line when the road is
   merge.sh (covers `supervisor.sh` 230 and 931, `jobs_loop.py` 112).
3. `tools/personal_tick.sh` (about 45 lines): `land_now` (232) calls a new `merge_now` when the road is merge.sh.
   `merge_now`, on the slot's own ready marker: read its task and tests; `personal_land.sh setup`; nothing new on
   the branch: reset and drop the marker; else run the main folder's `tools/merge.sh --task <id>` in the lane's
   worktree, output kept in `ops/runs/merge-road-<lane>.log`.
   - exit 0: write the old-to-new hash map (`lane_outbox.py hashmap`), drop the marker, say "landed", then
     `personal_land.sh land-live`, which now only drains the lane's records and posts lines;
   - exit 1 with a "RED at" line: drop the marker, `personal_land.sh park` with the red line as the reason, a
     `sent_back.py record` row, say "not landed". The lane's next session gets the commits back with "Why it came
     back" through the existing own-first hand-out. Nothing is retried or queued by a machine, but a `parked/` name
     is made: the least-change way to tell the next session. A strict no-<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> version needs a new session-start path
     (60 to 100 more lines).
   - any other end (75; 2 "main folder dirty"; 1 "main moved"): rewrite the marker with the new tip, say "waits";
     the next tick tries again.
   A `ROAD_WORDS` paragraph beside `PAUSE_WORDS` (1228), only when the road is merge.sh, tells the session to get its
   app change read by a worker who wrote none of it and to run `tools/merge.sh review --by <Name>` before it stops.
   `ops/prompts/lane.md` is untouched.

## What the study found about lanes today

- Sessions commit by path with the worker's first name as author (`ops/prompts/lane.md` 11). Board ticks and
  events travel as files in `ops/lane-outbox/` and are replayed in the main folder after a land, so lane branches
  never carry `ops/board.md` or `log/events.jsonl` (0 of 148 lane commits in main's last 400).
- The worktree is clean at ready (`keep_left`, `personal_land.sh` 589-604).
- Lanes run their checks at the same time on the new road; the old road ran one land at a time. A 3-line lock in
  `merge_now` restores that if the load asks for it.
- Protections of the old road `merge.sh` does not have: the symlink refusal (`check_links`, 1114), the owned-paths
  note, duplicate-commit handling in the rebase (`land_dupes`, 2347), the quarantine list, load-aware time-outs
  (a time-out reads as a red).
- Nothing on the site raises when the old road's records stop: the readers catch a missing or stale file. Figures
  go stale. Not checked: whether an alarm fires on "no land for N hours".

## Open risks, ranked

1. The review is checked after the Xcode run, so a missing record wastes a run: a 4-line pre-check in `merge_now`
   (app files changed and nothing under `ops/reviews` on the branch: red at once) removes that. Any app commit after
   the review, or a rebase over a main that changed the same app file, needs a new review.
2. A session's tasks merge as one piece (no <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>): one red sends all of them back.
3. The red return uses a parked name; `resume` puts the commits back uncommitted, so the fix's author may differ.
4. `merge_now` tells a red from a wait by `merge.sh`'s words; a repeating non-red stop loops as a wait with no <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>.
5. The lost protections above; parallel load.

## Cut-over, if chosen

Drain (no ready, held or landing marker, an empty outbox; `personal/b3` holds app code with no review record and
would be red at review on the new road, so the old road finishes it first); land the edits with the road "old";
flip; first a docs or tools task on one slot, then an app task; verify a row in `ops/metrics/merge.jsonl`, "landed"
in the tick's log, the marker gone, the outbox drained, no new row in `ops/runs/land_steps.jsonl`.

**The lanes are stopped today** by `ops/lane_stops.json` rule r3 (an Investor, #325 c7039523975, 7:27 AM 11-20:
the personal accounts start no new work while the trim runs). Any test, on either road, needs that lifted first.

## Progress

- 2026-11-22 1:10 AM ET, Odalys: **ready for the swap; the switch stays "old".** On main: the switch, off
  (`614c350473..a58eb025f7`, review findings F1-F12 and ROAD_WORDS fixed), the review pre-check in `merge_now`
  (open risk 1), the time cap on waits (risk 4), `road-check` (the drain look), both switch-on fault fixes
  (`ac0f9f795d`, `4828911555`), Pernille's three pre-switch notes (`99365e8c9d`, reviewed) and her two low notes on
  that (`f4db056758`, re-review `5110e2b314`: safe). Fault 2's home was confirmed on #325 (c7067153738). The 99 suites
  that name `tools/merge.sh`, `personal_land.sh`, `merge_queue.py` or `personal_tick.sh`, one run at main
  `25d12cbdb2`: 97 green (merge_sh 55, personal_land 476, merge_queue 140, personal_pool_requeue 129,
  personal_parked 96, supervisor 258), 2 red and not this switch's: `personal_land_product_test.sh` "past its tries
  it is red" (red on main's nightly since 11-19, on T-5262's list), `land_parallel_test.sh`, a wall-clock row (12 s of
  checks took 13 s at load 66; 26/1 again at load 108; it has flickered on the nightly since 11-16; a T-5262 matter). No pre-comparison gap found, so nothing new
  was built. **Left for the comparison:** the swap (Monday 2:00 AM: `road-check` clear, the meter readings, then
  "merge.sh"; back and forth on the days in [`ops/plans/T-5252-handoff.md`](t-5252-handoff.html)), and the 10 merges through `merge.sh`
  with main green after each, which are "Step 3 done" on [`ops/plans/T-5252-target-system.md`](t-5252-target-system.html). The heading's
  "design only, nothing built" is from 11-20 and no longer true.
{% endraw %}

</div>
