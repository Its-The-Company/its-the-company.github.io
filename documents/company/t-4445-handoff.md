---
layout: "default"
title: "T-4445 handoff: what is left after slice 1"
section: "documents"
description: "tools/task_states.py: each state is a row in ops/metrics/task_states.jsonl (a record, out of git: tools/records.py, .gitignore), read by words (one line for the task&#x27;s packet), show and the daily sweep. It writes no\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4445-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 24 · Sat Nov 14</span><span><code>ops/plans/T-4445-handoff.md</code></span></div><h1>T-4445 handoff: what is left after slice 1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2, 2026-11-14. Slice 1 is 60d0c6faf0 on personal/a2. The line stays open: it is the one line for the
rest, so no second line was added.

## Done in slice 1

tools/task_states.py: each state is a row in ops/metrics/task_states.jsonl (a record, out of git: tools/records.py,
.gitignore), read by `words` (one line for the task's packet), `show` and the daily `sweep`. It writes no board line.
The model is the sent-back row (tools/sent_back.py).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Done in slice 1, scrolls sideways" style="--tw:1152px" markdown="1">

| State | Was | Now | Test (tests/task_states_test.py unless named) |
|---|---|---|---|
| <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch | "Personal account stopped and its work parked" | `parked` on each task the branch carries | Parked, 1 |
| stop naming no task | the same line | `stop` row (task "-"), listed once by `sweep` | Parked, 2 |
| refused record | "Main refused a record from a personal account" | `refused` row; stays in failed/; `sweep` lists once; `sweep --requeue` hands failed/ to the next drain | Refused, 2 |
| return count | "Look at work that keeps coming back" | `returns` with n; `clear` ends states | Returns, 2 |
| redo | a P0 "Redo ..." line beside the Investor line | the task's own line: one note and P0 (real board_tick, kept place) | Redo, 2 |
| needs recut | park_watch "Recut a parked change ..." | `recut` with ref, files, main commit; park_watch --apply sets it; --lines keeps the old path | Recut, 1; tests/park_watch_test.py 8 (5 checks) |
| review finding, unmerged | a new line per finding | `step` on the task's checklist, `step-done`; on merged work refused (exit 3): that one is a line with a card, By: "review of T-X" | Finding, 2 |
| review per landing | a [review] line per landed task with any floor | `review-line`: none unless app code (`--app 1`); one per feature (app-features.json steps or "part of" link) | Review, 3 |
| main red, flaky suite | lines | still lines (red_line, quarantine_line.apply) | StillLines, 2 |

</div>


Tests through tests/run.sh: task_states_test 16/0, park_watch_test 38/0 (33 before), records_test 18/0,
investor_age_test 60/0, main_green_test OK, quarantine_line_test OK, board_notes_readers_test 52/0.

## Left

1. **The land's writers (pipeline, rule 62).** ops/plans/t4445-personal_land.patch and
   ops/plans/t4445-personal_tick.patch, handed to the audit-implementation session by a note on T-3995.
   `git apply --check` passes on 60d0c6faf0 and `bash -n` passes on both patched files. Not run: their suites.
   What the patch does: look_line -> `task_states.py returns`; park_one -> `parked`; drain_records' "failed" lines ->
   `refused`; redo_lines -> `task_states.py redo` (investor_age redo-line is then unused; kept until the batch is in);
   review_line -> app code only (FLOOR_XC) and `review-line`'s one line per feature; after_sync_keep's review flag
   from FLOOR_XC only.
   **The same batch must turn around the suites that assert the old lines**, or they go red:
   tests/personal_land_test.sh, tests/personal_land_product_test.sh, tests/personal_parked_test.sh (20 matching
   lines by grep: "personal account ... stopped", "keeps coming back", "A lane record main refused", "by someone
   other than its author", "P0 redo"). Not done here: each suite took about 55 min under load the last time I ran
   them (T-4453), and they test the unpatched file until the batch lands.
   Idris's T-4194 wiring (ops/plans/feature-session-wiring.md) also edits beside review_line (1825) and the
   after-sync note (2277): apply the two together and read both hunks.
2. **The packet shows the states.** `task_states.py words --task T` is written; nothing calls it yet. The caller is
   tools/personal_tick.sh beside sent_back.py words (pipeline: a patch and a note), and Home's This Session
   (tools/site/session_page.py, not pipeline).
3. **The reset rule reads the return count.** tools/merge_reset.py acts on sent-back returns; it does not read
   `returns` rows yet. Decide with Ines whether "came back n times with no commit" counts toward the same reset, and
   add `clear` rows where merge_reset resets a task and where the land ticks it.
4. **The daily sweep runs `task_states.py sweep --requeue`.** Not wired. The queue check (tools/queue_check.py) is the
   daily run; one call there, or a supervisor step (pipeline: patch).
5. **The keepers' own runs stop after the check is on (T-4449):** board_stale's and `similar`'s supervisor steps,
   board_weekly, parked_lines, stale-deps, land_fold's fold. Not written. A patch to tools/supervisor.sh (and the
   jobs loop's entries, tools/jobs_loop.py, T-3314) that skips each while ops/queue_check.json says on; a note on
   T-3995. The readers of the old lines (board_weekly, parked_lines, the site) stay while old lines are open.
6. **board_tick add could refuse a finding line on open work** (By "review of T-X" with T-X open). Today `step`
   refuses the other way only. A rule in tools/board_card.py add_problems; T-4443's rules, so Ines reads it first.
7. **Before numbers, for the after:** the plan's table counts open lines on 11-14 (53 stopped, 47 refused, 18 look,
   11 redo, 66 of 77 review). Count the same kinds written per day for the 7 days before the batch lands, from
   the board and archive, so the after has a baseline. Not counted yet.

## Tick T-4445 when

The land patch and its turned-around suites have landed with the batch and are green: then every state's "no new
line" test covers the path that runs. The count in item 7, 7 days before and after, is the measure of the change, not
a condition of the tick.
{% endraw %}

</div>
