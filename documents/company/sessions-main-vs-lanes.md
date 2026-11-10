---
layout: "default"
title: "Main session and personal sessions: how they differ (for an Investor #41 c6702025982)"
section: "documents"
description: "Yes for the accounts: each account&#x27;s allowance is separate and expires at its own reset, so an account with no session running is usage lost. No for the coordination: every extra session carries a second Operator, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/sessions-main-vs-lanes.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 16 · Fri Nov 6</span><span><code>ops/plans/sessions-main-vs-lanes.md</code></span></div><h1>Main session and personal sessions: how they differ (for an Investor #41 c6702025982)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by the Operator, 2026-11-06 23:1x ET, from the code and board as they stand. A plan follows once the Plan mode
questions on #41 are answered.

## The differences


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The differences, scrolls sideways" style="--tw:825px" markdown="1">

| | Main session | Personal sessions ("<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>") |
| --- | --- | --- |
| Account and limits | The company's Claude Max plan: its weekly limit, its 5-hour window, the Fable <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. The governor paces it (Spread spreads the day; tonight that means 2 agents). | Each Investor's own subscription, with its own 5-hour and weekly meters (ops/personal_meter/). One account reaching a limit stops only its own lane. |
| How many at once | One work session at a time. | Up to 3 sessions per account (PERSONAL_SLOTS in tools/personal_tick.sh); tools/dispatch.py (since 11-05) picks which account runs each task. |
| Where the code goes | Works in the main checkout and commits straight to main; the supervisor pushes between sessions. | Works in its own copy (a git worktree on personal/<letter>). Finished work has to *land*: its tests rerun on current main, then it merges. |
| How work lands | No queue. | The merge queue. This is the largest measured loss: 9 of 11 lands failed in the 3 hours before 10:00 PM tonight (ops/run.json pool_reason), and T-3102 found 25 land jobs waiting, the oldest about 24 hours. |
| Jobs only it does | Records Investor rule changes in amendments.md; ends for between-session jobs (pushes, the applier for approved changes, folds); writes due reports inside the session. | Can't write amendments (it says so and leaves it to the main session); takes tasks one claim at a time (tools/lane_take.py). |
| Investor messages | Answers them. | Answers them too, since 2026-11-04 (one claim per message, so no double replies). |
| Each session's own cost | One Operator: its context, the inbox, board reads, packets. | The same overhead again for every lane session: each has its own Operator besides its workers. |
| On Home today | This Session follows only this session. | Their tasks show under In Flight; the sessions themselves don't. |

</div>


## Does running more than one session make sense?

Yes for the *accounts*: each account's allowance is separate and expires at its own reset, so an account with no session
running is usage lost. No for the *coordination*: every extra session carries a second Operator, and every lane's work
has to merge back through a queue that currently fails most lands. The efficient shape is one coordinator that keeps the
inbox, the board and the plans, and plain workers on every account that each run one task and land it through one
reliable merge path. ops/plans/one-dispatcher.md already started down this road (T-2529 built tools/dispatch.py; T-2641,
T-2677 and T-2719 are its remaining steps).
{% endraw %}

</div>
