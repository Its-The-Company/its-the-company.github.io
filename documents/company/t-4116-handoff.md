---
layout: "default"
title: "T-4116 handoff at the second Fable pause (Ines, lane b, 11-12 1:4x PM ET)"
section: "documents"
description: "The pause (T-4128) fired right after the #41 post. The line stays unticked. Read this first; do not post again."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4116-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4116-handoff.md</code></span></div><h1>T-4116 handoff at the second Fable pause (Ines, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b, 11-12 1:4x PM ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The pause (T-4128) fired right after the #41 post. The line stays unticked. Read this first; do not post again.

## Done
- ops/plans/app-features.md: the 14 features, cards, checklists, the slicing proposal with Idris's four
  corrections, dates, risks. ops/plans/app-features.json and its check updated: 5 steps ticked since the first
  sitting left (T-3757, T-3798, T-3784, T-3565, T-2282), 5 new app lines joined under "added" (T-4199, T-4201,
  T-4202, T-4203, T-4205); 206 steps; the check passes (`--table` is new).
- Links: all 206 steps "part of" their feature (T-2296 and T-3814 with Idris's yes), the 14 feature lines
  unblocked, a first-trial note on T-4191: 221 records in ops/lane-outbox/, committed; they reach the board when
  this branch lands.
- Build lines T-4194, T-4195, T-4196 are on main's board (Links: part of T-4092), with Idris's dates.
- Posted on #41: (private)
  (the text is ops/plans/app-features-comment.md).

## In flight
- Nothing running.

## Next step
1. `python3 tools/events.py add --worker Ines ...`: the feature list and slicing change posted (comment URL above).
2. `python3 tools/board_tick.py note "T-4098" "..."`: the 76 open review lines have no ledger row yet, so "every
   app line has a row" (the T-4092 note of 2:37 AM 11-12) is true only for lines that are not reviews; the five app
   lines added 11-12 (T-4199, T-4201, T-4202, T-4203, T-4205) have no row either and sit in features by the step
   each comes from; recommendation: a review line on a step of a feature folds into the feature's one review.
3. Tick: `python3 tools/board_tick.py "[plan] T-4116" "(Ines+Idris, <last commit>; ws: <workstream>) Plain: ...
   Evidence: <the comment URL>."`
4. Last commit `git rm`s this file. Commit new ops/lane-outbox/b-*.json records by path, "T-4116: ".
5. Not done, for a person: T-4195 and T-4196 have no short name in ops/task-names.tsv (titles over 48 characters).

## Commits (personal/b, author Ines)
- c91a8794d1: the plan file, the list and its check.
- 62de36105c: the 221 lane records.
- this commit: the #41 comment text and this note.
{% endraw %}

</div>
