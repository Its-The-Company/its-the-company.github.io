---
layout: "default"
title: "T-3230 board prune, first slice"
section: "documents"
description: "Start: 512 open lines parsed from ops/board.md (445 open, 68 blocked on the ask). Method: the sweep table ops/sweeps/2026-11-06-t3177.tsv (Opus, each row with commit and reason) applied through tools/board_tick.py to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/board-prune-t3230.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/board-prune-t3230.md</code></span></div><h1>T-3230 board prune, first slice</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Start: 512 open lines parsed from ops/board.md (445 open, 68 blocked on the ask). Method: the sweep table
ops/sweeps/2026-11-06-t3177.tsv (Opus, each row with commit and reason) applied through tools/board_tick.py to
every row still open; then automatic notices (retry, "keeps coming back", "main refused a record", "account
stopped") dropped when every task they name is ticked or off the board; two more ticks checked by hand.
Ticks queue in ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox/ and reach the board when this branch lands.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:634px" markdown="1">

| Result | Count | Detail |
|---|---|---|
| Ticked done (work on main) | 47 | 45 from the T-3177 table (one commit each), plus T-3120 (1dc528dfb), T-1902 (669e0f50d) |
| Dropped (obsolete or covered) | 44 | 19 from the table (withdrawn or merged into another line), 25 notices whose tasks are all closed |
| Kept | about 421 | includes 40 notices that name a still-open task, all lines waiting on #90, #138, #141, dated waits, and anything unsure |

</div>


Skipped by order: T-2999, T-3190, T-3191 (running), T-3230 itself.
Not done: lines 121 to 512 of the title list were not judged one by one; the product lines (build, test, fix) with
partial commits on main need a read of their text against the code. T-0848 stop: none hit.
Follow-up: board line added, "T-3230 rest".

## Slice 2 (T-3305, Odalys, 2026-11-07)

Method: each line read against its own text, then against main (git log by task ID, `git merge-base --is-ancestor`,
`git cherry main <parked branch>`). Ticks and notes go through tools/board_tick.py only; they queue in ops/lane-outbox/.
When unsure, kept.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Slice 2 (T-3305, Odalys, 2026-11-07), scrolls sideways" data-n="4 5" style="--tw:1085px" markdown="1">

| Part | Looked at | Ticked | Dropped | Kept |
|---|---|---|---|---|
| (b) blocked lines whose date passed | 28 (no "waiting on #N") | 2 (T-0039 610626945, T-1042 19d5907ac) | 0 | 26 |
| (c) notices naming an open task | 47 (retry, keeps-coming-back, main-refused) | 0 | 0 | 47 |
| (a) [build] [test] [fix] with commits on main | 107 found, 24 read in full | 5 (T-1294 92b062d47, T-1114 9540d1245, T-1113 4856490b7, T-3173 c3076b75e, T-2056 654bf72e6) | 0 | 102 |

</div>


Total: 7 ticked, 0 dropped. (b) and (a) overlap on T-0039 and T-1042, so 7 distinct lines.

Why (c) kept all: `git cherry main` shows every named <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch still holds commits main lacks (or the branch is gone,
leaving the line the only record); the 6 "main refused a record" lines keep the only pointer to a failed lane file.
Why (b) mostly kept: the dates passed but the work is not on main (no commits, or only plan/notice commits), or a
part is still owed (device run, review, Investor ask).
Kept on purpose despite a commit: T-2264 (B5 test owed), T-2583 (waits for Pernille's re-review), T-1882, T-1861, T-2046
(mutant under load owed), T-1677, T-2097 (device read owed), T-3279 (runner run owed), T-1289 (part b open).

Stopped at: the (a) lines whose own commit starts with the task ID were read down to T-2583 (24 of 107 read in full);
about 80 lines whose commits are only reviews or board notes are unread (they rarely mean done). T-0848 stop: none hit.
Skipped by order: T-3305, T-2888, T-3152, T-3145. A line added by mistake with ID T-0000 was closed as a duplicate.
Follow-up: board line T-3382.
{% endraw %}

</div>
