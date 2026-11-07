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
{% endraw %}

</div>
