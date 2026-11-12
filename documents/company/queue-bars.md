---
layout: "default"
title: "Queue bars on Home: the task and merge queues as colour-coded stacks"
section: "documents"
description: "At a glance on Home: how full each queue is against the line where it becomes the bottleneck, what kind of work fills it, and which of it can start now. Built with the Task Queue graph (T-4110), after the queue audit\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/queue-bars.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 21 · Wed Nov 11</span><span><code>ops/plans/queue-bars.md</code></span></div><h1>Queue bars on Home: the task and merge queues as colour-coded stacks</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by an Investor in Plan mode, #41 c6812501312 (9:22 PM ET 11-11); questions c6812516017; answers c6812636932
(9:31 PM ET). Written by the Operator, 2026-11-11.

## Goal

At a glance on Home: how full each queue is against the line where it becomes the bottleneck, what kind of work fills
it, and which of it can start now. Built with the Task Queue graph (T-4110), after the queue audit (T-4092).

## What the answers decided

- Colours: four categories, App, Site, Efficiency, Other (Q1 A): the queue audit's categories
  (tools/queue_inventory.py, ops/plans/queue-audit.md "Categories"), one colour each, inside the approved site look.
- Full length (Q2 A): the task queue's line is about 3 days of work at the recent finishing rate, recomputed daily:
  3 x the median of tasks finished per day over the last 7 days. The merge queue keeps its strict 12 (the Operator's
  recommendation, below), the same number tools/merge_limit.py enforces, so the bar and the rule never disagree.
- Dependencies (Q3 B): ready tasks (every "needs" link merged) solid, waiting ones faded after them; a tap on a slice
  lists its tasks nested under their umbrellas ("part of" links, T-4100).
- Place (Q4 A): two horizontal bars, one per queue, in the same bubble as the two graphs (Merge Queue, T-4110 Task
  Queue).
- When (Q5 A): with the Task Queue graph, after the audit.

Merge queue line, recommendation: keep 12. It is the Investors' rule for when new work stops (2026-11-10), so a bar
that reaches its end exactly when the rule bites says the true thing; a throughput-based line would show "not full"
while the company is already holding new work. If the rule's number changes, the bar follows tools/merge_limit.py.

## Steps

1. Data (code, no model): one function in tools/flow.py (or beside it) that returns, for each queue, the count by
   category and by ready/waiting, each task's umbrella chain, and the full line (task queue: 3 x median finished per
   day over 7 days, recomputed once a day and kept in ops/metrics/; merge queue: merge_limit's limit). Tests on
   fixtures. Needs T-4100's links on the board (the audit's apply, T-4101).
2. Home (site): the two bars in the graphs' bubble; slices in the four colours, faded tails for waiting tasks, the full
   line marked; a tap on a slice opens its tasks nested under umbrellas, same component as T-4102's nested queue;
   390 and 1280 screenshots; the standing few-words rule (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 9:09 PM 11-11). Built with T-4110.

## Risks

- Until the audit links every task, "waiting" reads only the old "after T-" wording; build step 1 after T-4101.
- Category colours must stay within creative/approved.md; no new visual direction.
- A median over 7 days moves after a slow day; the line is recomputed daily, not live, so it does not jitter.

## Left out

- Per-worker or per-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> slices (the categories answer what kind of work, not who).
- Any limit enforced by the task queue line: it is a picture, not a rule, unless the Investors make it one.
{% endraw %}

</div>
