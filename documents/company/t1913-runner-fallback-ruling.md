---
layout: "default"
title: "T-1913 chair ruling: no local fallback when the MacBook runner is silent"
section: "documents"
description: "Option A. No automatic fallback. As built in 799cb51c4 and 4818b80d8: route warns &quot;runner silent since&quot;, status and wait name a silent runner, and a job past push lag + poll + the limit per job is called overdue with\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t1913-runner-fallback-ruling.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 14 · Wed Nov 4</span><span><code>ops/plans/t1913-runner-fallback-ruling.md</code></span></div><h1>T-1913 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling: no local fallback when the MacBook runner is silent</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-04 00:39 ET. Question from T-1894 (Odalys; pywidget/docs/reviews/t1116-pernille.md M2 (d)): when the MacBook runner's check-in is stale, should `tools/xc_route.py route` run the Xcode test here on the Mac mini, under the machine lock, instead of queuing it?

## Decision

Option A. No automatic fallback. As built in 799cb51c4 and 4818b80d8: `route` warns "runner silent since", `status` and `wait` name a silent runner, and a job past push lag + poll + the limit per job is called overdue with exit 1. Running here stays the worker's own choice with `XC_LOCAL=1`. This <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for one week, to 2026-11-11.

## Why

1. The Investors asked for it in plain words. an Investor, #41 c6589434651: "make sure the macbook runner is being leveraged for Xcode checks so we don't use more storage." Commandment 61 puts Simulator runs on the MacBook. An automatic fallback would quietly undo both on every night the MacBook sleeps.
2. This machine can't carry it. At 00:37 tonight the load average was 963 and free disk was 10.9 GB, down from 11.6 GB in eight minutes. Xcode has been stopped by disk here before (T-1001). B would put DerivedData back on the Mac mini for whole nights, which is when the runner goes quiet.
3. A stale check-in is not proof the runner is down. A failed results push looks the same, and then B runs the test twice, once on each machine.
4. The cost of A is real but bounded. Over 7 days, 5 silent gaps over 40 min, 34 h in all, nearly all of it in two gaps (19 h from 11-01 13:32, 12 h from 10-30 06:05). Those were the MacBook off or asleep, not short blips. A fallback would not shorten them; it would move a night of runs onto the weaker machine.
5. C (queue and run here both) doubles the cost on every job. Rejected.

## How workers use XC_LOCAL=1 while the runner is silent

Only when the run gates a push or a task due today, and only the narrowest test that answers it. `tools/xc.sh` still takes the machine lock and the disk gate; if the gate says no, the work waits for the runner. Nobody runs the full suite here because the queue is slow.

## Revert rule

Reopen B on 2026-11-11, or sooner, if either holds:
- more than 2 jobs go overdue in the week from 2026-11-04, counted by T-1918 (`xc_route.py overdue --since 2026-11-04`, built by Odalys from git history; without it the rule has no count, so T-1918 is due 2026-11-06), or
- a silent runner makes a P1 task miss its date.

If B is reopened, it comes with a fresh disk and load reading and a check that tells a failed push from a down runner. An Investor's word on storage or the runner overrides this rule either way.

## Follow-up

The two long gaps are the MacBook's power or sleep, which is the Investors' machine. The next report says how many hours the runner was silent and asks whether it can stay awake overnight. No other code changes from this ruling.
{% endraw %}

</div>
