---
layout: "default"
title: "One queue list on Home, in the real start order"
section: "documents"
description: "Home has one queue list, Queued, with its current styling, search and filters, showing tasks in the order they will really start. The second panel, the queue tree (T-4102, tools/site/queue_tree.py), goes. Evan saw lines\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/one-queue-list.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 25 · Sun Nov 15</span><span><code>ops/plans/one-queue-list.md</code></span></div><h1>One queue list on Home, in the real start order</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor, Plan mode, #41 c6898524021 (12:37 PM ET 11-15); questions c6898562843 (12:39 PM); answers
c6898956579 (1:10 PM ET 11-15). Plan written by the Operator, 2026-11-15.

## Goal

Home has one queue list, Queued, with its current styling, search and filters, showing tasks in the order they will
really start. The second panel, the queue tree (T-4102, tools/site/queue_tree.py), goes. Evan saw lines in the tree's
"Next" that sat low in Queued (T-3773): the two panels sort differently, and neither is the order the dispatcher uses.

## What the answers decided

- Q1 A: the list shows the real start order, the one tools/dispatch.py uses (`order_tasks`: merge-first list, Investor
  lines 48 h or older, the kind rule in ops/kind_first.json, app before process work, P0 to P3, board position). The
  dispatcher does not change to match the page.
- Q2 A: rows stay in start order; a toggle groups lines under what they belong to. Terms (tools/board_links.py,
  an Investor c6799650908): "part of T-X" makes a line a piece of umbrella X (a feature; no waiting, pieces start in
  any order and X closes when all have merged); "needs T-Y" makes it a child of Y (it cannot start until Y has
  merged). So each row shows its umbrella tag ("part of T-X"), and the toggle groups pieces under their umbrella
  (the umbrella row placed where its first piece starts). A child's dependency shows as what it waits on (Q3), never
  as nesting. Corrected 1:4x PM 11-15 after an Investor c6899253368 asked how parent and child work.
- Q3 A: lines that cannot start yet (an open "needs", a block, a wait) come after the startable ones, each saying what
  it waits on (tools/site/tasks_panel.py blockers() already reads the wait reason).
- Q4 A: the queue tree panel leaves Home; its search at any depth (ancestors open on a match) moves into Queued.

## Steps

1. One reader of the start order (Odalys, tools). `tools/dispatch.py` gains a function and `order --json` that return
   every open board line in the dispatcher's own order: startable lines first as `order_tasks` ranks them, then the
   rest, each with its umbrella ("part of") and what it waits on ("needs" and any other wait), from the typed Links field. Pure reading: no change to how work
   is dealt. A test pins that the order matches `order_tasks` on a fixture board and that a case like T-3773 (low
   priority but first by a rule) comes out where the dispatcher would start it.
2. Queued reads that order (Maren, site). Home's Queued list (tools/site/home_look.py) takes its rows and numbers from
   step 1's reader instead of its own sort; an umbrella tag on each piece's row; a "Group by feature" toggle (pieces
   under their umbrella); the waiting
   lines after the startable ones, each with its wait; the queue tree panel removed from Home and its any-depth search
   moved into Queued's search box. Screenshots at 390 and 1280. A site test fails if Home's order and the dispatcher's
   disagree.

## Risks

- The dispatcher's order depends on live inputs (claims, merge-first list, kind rule) that change by the minute; the
  page shows the order as of its build, and says so with its time.
- Personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> take lines by their own pins (Account:), so "start order" is the main dispatcher's order; a pinned
  line shows its account.
- Removing the tree removes its links-both-ways view; the parent tag and the grouping toggle keep the relationship.

## Leaves out

- Any change to how the dispatcher ranks work (Q1 B not chosen).
- Other pages that list tasks (This Session, Reports).
{% endraw %}

</div>
