---
layout: "default"
title: "Proposal: a cap on open board lines per workstream (T-1900, Odalys, 2026-11-05)"
section: "documents"
description: "Before: 421 898 bytes, 446 open, 90 waiting (2026-11-05, after the archive). Measure the same three numbers one week after the cap lands (wc -c ops/board.md; grep -c &#x27;^\\s- \\[ \\]&#x27;; grep -c &#x27;^\\s- \\[b\\]&#x27;). Revert rule: if\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/board-cap.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 15 · Thu Nov 5</span><span><code>ops/plans/board-cap.md</code></span></div><h1>Proposal: a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on open board lines per workstream (T-1900, Odalys, 2026-11-05)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Status: proposal for Ines. Nothing here is enforced yet.

## Baseline (ops/board.md, 2026-11-05 ~6:00 AM ET)

- 446 982 bytes before this task's archive pass, 421 898 after (28 ticked lines moved; n = 1 pass).
- 446 open ('- [ ]') and 90 waiting ('- [b]') lines. Ticked lines were 25 KB of it; open and waiting lines are 411 KB.
- The archive is not the leak: since 2026-11-04 the supervisor's step 12a archived 22 times and logged no skip
  (ops/runs/supervisor.log). The 28 ticked lines left this morning were ticked after the 5:18 AM pass.
- Open + waiting lines by kind tag (the board's workstream tag), lines / KB:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline (ops/board.md, 2026-11-05 ~06:00 ET), scrolls sideways" data-n="2 3" style="--tw:495px" markdown="1">

| tag | lines | KB | of which auto "did not land / retry" |
|---|---|---|---|
| tools | 231 | 132 | 106 (45 KB) |
| build | 167 | 168 | 0 |
| test | 26 | 19 | 0 |
| fix | 21 | 12 | 0 |
| site | 20 | 14 | 0 |
| plan | 17 | 17 | 0 |
| ops | 15 | 7 | 0 |
| 11 other tags | 39 | 26 | 0 |

</div>


- Line length: median 573 bytes, 90th percentile 1 314 bytes (n = 536).
- `python3 tools/board.py similar` finds 27 groups of likely duplicate open lines (25 share the same set of named
  task IDs, 2 the same file:line target). Many are siblings from one review (F1, F2, ...), so a person decides.

## Proposal

1. Cap: at most 40 open + waiting lines per kind tag. Two tags are over: tools (231) and build (167). Over the cap,
   board_tick.py add warns (does not refuse) and names the tag's oldest five lines to merge, wait or drop.
2. Auto lines: one open "did not land / retry" line per <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, not one per attempt. A new attempt edits the lane's
   line (board_tick.py note) instead of adding one. Expected: 106 lines -> at most one per lane (about 12), about
   40 KB less.
3. Line length: a new line over 600 bytes is warned; the detail goes to the file the line links.
4. Weekly, a person reads ops/runs/board-similar.log (written each supervisor tick) and merges what is truly the
   same task. The tool never closes a line on a guess.

## How to read the result

Before: 421 898 bytes, 446 open, 90 waiting (2026-11-05, after the archive). Measure the same three numbers one week
after the cap lands (`wc -c ops/board.md`; `grep -c '^\s*- \[ \]'`; `grep -c '^\s*- \[b\]'`). Revert rule: if the
board is not under 300 KB in a week with the cap in place, the cap is not the lever; drop the warning.
{% endraw %}

</div>
