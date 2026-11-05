---
layout: "default"
title: "Simplifications, 2026-11-05 (T-2472)"
section: "documents"
description: "Already lines, not repeated here: one dispatcher for every account (T-2471), one shared Simulator queue (T-2470), approvals only where the Investors said (T-2460), the merge queue for parked work (T-2467), answered\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/simplifications-2026-11-05.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 15 · Thu Nov 5</span><span><code>ops/plans/simplifications-2026-11-05.md</code></span></div><h1>Simplifications, 2026-11-05 (T-2472)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, written 2026-11-05 01:55 ET, for Investor an Investor #41 c6651078949 (amendment 2026-11-05 01:07): find the high-level changes that should make the company faster or simpler, from its most basic goals, and build each that should give a better system in one go. Results are measured afterwards from raw evidence.

Already lines, not repeated here: one dispatcher for every account (T-2471), one shared Simulator queue (T-2470), approvals only where the Investors said (T-2460), the merge queue for <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> work (T-2467), answered questions no longer hold rule folds (T-2476), Evan's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> and credit gaps (T-2479).

## The four goals

1. Ship pywidget (Dec 15 holds with about one day of slack, plan.md <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 11-04).
2. Use every account's usage before it resets.
3. Land finished work.
4. Answer the Investors.

## What the evidence says

- Most work is not the product. Since 11-01, 360 of 2,011 commits (18%) touch pywidget/ (git log). Open board lines: 214 [tools], 132 [build], 19 [fix], 19 [test], 17 [site] (ops/board.md, 461 open, 412 KB).
- Half of finished work does not land. 155 land attempts on 11-03 and 11-04, 75 landed (48%). Causes of the 80: 30 rebase conflicts, 19 tests red, 14 Investor-owned files changed on main while checks ran, 7 touched an Investor-owned path, 7 checks over their time limit, 2 xcodebuild failures (tools/land_stats.py). The land test alone (personal_land_test.sh) takes 311-474 s against a 360 s <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> (ops/runs/t1663-personal-land-timing.txt). Since 11-03 the lander logged 35 "out of time, waits for the next tick" and 14 "another land is running" (ops/runs/supervisor.log).
- A quarter of the board is machine-made. 118 of 461 open lines are the lander's own failure lines ("did not land", "stopped on", "keeps coming back"), and at 01:40 today the lander's new lines were refused by board_tick for lacking a title (supervisor.log), so some failures now go nowhere.
- The work loop waits on metrics. Each hour the tick chain rebuilds quality metrics (79 s) and metric series (64 s) before the next session starts (supervisor.log 01:25-01:27).
- Usage is left on the table. The main plan's 5-hour window read 2.0% at 01:40 with 58% of the week used and a reset on 11-08 (ops/live_meter_log.jsonl, supervisor.log); personal accounts added 49.1% of the plan's weekly limit this week. T-2471 and T-2479 own this.

## The changes


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The changes, scrolls sideways" data-n="1 3" style="--tw:1136px" markdown="1">

| # | Change | Goal | Why it should help | Cost | Line |
|---|--------|------|--------------------|------|------|
| S1 | Make finished work land on the first try: the land runs only the test suites its diff touches (plus the app build when pywidget/ changed); a suite already red on main does not block; when an Investor-owned file changes on main during checks, rebase and recheck once instead of failing; no failure line goes on the board until the same branch fails twice for the same cause, and then one line per branch, closed by the lander when it lands; the 118 existing machine lines fold into one line per branch. | 3, 2 | 52% of finished work fails to land, and each failure spends a session's usage twice. Of the 80 failures, 21 come from Investor-file churn and time limits, which are about the check, not the work; some of the 19 red ones were suites already red on main (T-2466). | One Odalys session in tools/personal_land.sh and its tests; risk: a smaller test set lets a real break through, held by the full suite still running on main after each land. | T-2486 |
| S2 | Product first in the pick order: the picker (T-2471's dispatcher) hands out pywidget [build], [fix], [test] and [review] lines before [tools], [site] and [ops] lines, unless one is P0, Investor-requested, or blocks a product line; it never gives two accounts tasks that touch the same files at once (the rebase conflicts logged are in pywidget/docs). | 1 | 82% of commits since 11-01 are not the product while Dec 15 has about one day of slack. | Small: one rule in the picker T-2471 is building. | T-2488 |
| S3 | Cut the board to work that ships: archive (never delete) every open [tools], [site] and [ops] line older than three days that is not P0, not Investor-requested and not blocking a product line, with a pointer line so any can come back. | 1, 4 | 461 open lines and 412 KB; workers and Investors cannot see the release path, and every session pays to read it. | One Ines session; reversible. | T-2487 |
| S4 | Rebuild metrics beside the work, not before it: quality metrics and metric series run in their own background job, so the next session starts without the 143 s wait. | 2 | About 2.4 minutes of every hour of the tick chain. | Small: one launchd job and the supervisor lines. | T-2489 |

</div>


## Considered and not lined

- Retire unused tools (368 in tools/, 329 tests): real sprawl, but a broad cut 40 days before release risks breaking checks, and T-2471's one dispatcher should retire most lane_* tools by itself. Revisit after T-2471.
- A short session starts with large context (a 0.08 h session ended at 78,830 tokens, supervisor.log 01:4x). Not lined until a session stream shows what fills it; most of it may be Investor-owned files.
- Shared state files (board, events) inside branches: the logged conflicts are in pywidget/docs, not ops/, so no change.

## Order

S1 (Odalys, after T-2467 (a)) and S3 (Ines) start now and in parallel; S2 goes into T-2471's dispatcher as it is built; S4 (Odalys) last. Each is built in one go and measured afterwards: S1 by tools/land_stats.py's land rate, S2 by the share of commits touching pywidget/, S3 by open lines and board bytes, S4 by the supervisor log's session start times.
{% endraw %}

</div>
