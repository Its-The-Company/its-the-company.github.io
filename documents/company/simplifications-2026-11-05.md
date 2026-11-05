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

## S3 result (Ines, 2026-11-05 14:47, T-2617): measured, list ruled, archive waits on a tool

**Not archived yet.** Neither tools/board_tick.py nor tools/board.py can move an open line ('- [ ]' or '- [b]') off the board with a pointer: board.py's archive modes move only finished lines and prose. The packet says to stop there rather than write the board from a script, so nothing left the board. The missing mode is lined for Odalys as T-2718 ("Archive open board lines and bring them back").

**Before (2026-11-05 14:46 ET, ops/board.md at ae7405d10 plus the working tree):** 571 open lines, 486,432 bytes. Of those, 287 are [tools], [site] or [ops] (253 / 21 / 13). The S3 row above said 461 lines and 412 KB; the board grew 110 lines and 74 KB since that row was written.

**After (Odalys, 2026-11-05 14:55 ET, T-2718, tools/board.py archive-open, commit 99fba693f):** the 25 left the board for log/board-archive-s3-2026-11-05.md, 25 lines and 12,262 bytes, each verbatim with its heading, date, reason and restore command; one pointer line (line 140) names the file and the IDs. The board had grown since 14:46, so the counts at the apply are: before 572 open lines, 500,022 bytes; after 547 open lines, 488,122 bytes (pointer included): 25 open lines (4.4%) and 11,900 bytes (2.4%) less. None was claimed, P0 or named by an open product line when the checks ran again under the board lock. Bring one back: `python3 tools/board.py restore-open <T-ID>` (dry run; add --apply).

**How the list was made.** Every open [tools], [site] or [ops] line, minus each of these (counts are for those 287 lines):
- younger than three days: an ID above T-1061, the highest ID on the board at its last commit before 2026-11-02 14:50 ET (177bd6b42, 13:28): 226 lines;
- P0: 1;
- Investor-requested by its own text (an Investor, #41, a from: ID or a comment ID): 26;
- claimed (tools/personal_claims.py list, 25 claims): 0 left after the cuts above;
- blocking a product line (its ID named in any open line that is not [tools], [site] or [ops]): 0 left after the cuts above;
- under a heading that records a specific Investor request (the site pictures, the app guide, the app guide in one place, the report overhaul): 7 more.

Two of my rulings set the list. Each can be argued, so they are written here:
1. The headings "Build: pywidget ..." and "Continuous operations improvement ..." record the Investors' general mandate, not a request for any one line under them. A line under them is not Investor-requested for that reason alone.
2. T-0885 and T-0898 stay on the board. They are dated reads (2026-11-07) that close the open optimization entries OPT-035 and OPT-062. Archiving them two days before they fall due would leave those trials with no verdict.

**The 25 to archive** (ID, kind, bytes, title):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: S3 result (Ines, 2026-11-05 14:47, T-2617): measured, list ruled, archive waits…, scrolls sideways" data-n="3" style="--tw:547px" markdown="1">

| ID | kind | bytes | title |
|---|---|---|---|
| T-0305 | ops | 501 | Measure the task store change when it applies |
| T-0169 | tools | 445 | Make old research scripts obey the fetch rules |
| T-0324 | tools | 796 | Narrow the Xcode sandbox profile from a deny log |
| T-0320 | tools | 359 | Add runner install tests and a stale check-in alarm |
| T-0344 | tools | 395 | Stop the runner running Xcode in the Mac mini account |
| T-0626 | tools | 635 | Find processes left running after a stopped session |
| T-0425 | tools | 472 | Add the no-diagnostics flag to test runs by default |
| T-0822 | tools | 670 | Put a time limit on stalled Xcode test runs |
| T-0839 | tools | 547 | Deny leftover local tools in the personal profile |
| T-0858 | tools | 1092 | Update the operations guide to match the amendments |
| T-0905 | ops | 403 | Read the model routing test at twenty runs per arm |
| T-0914 | tools | 533 | Run the core Swift tests when work lands |
| T-1049 | tools | 308 | Add the no-text rule with a closed word list |
| T-0071 | tools | 646 | Finish Odalys's probation measurement work |
| T-0078 | tools | 410 | Read the Claude Code changelog each week |
| T-0079 | tools | 505 | Review the message watcher after five days |
| T-0966 | tools | 418 | Retry finished work whose tests were red |
| T-0978 | tools | 929 | Read the personal wait numbers at ten samples |
| T-0991 | tools | 428 | Retry finished work whose tests were cut off |
| T-0999 | tools | 356 | Retry finished work that had no way to land |
| T-1008 | tools | 362 | Retry finished work that had no way to land again |
| T-1056 | tools | 202 | Look at a task that ended with no commit |
| T-1057 | tools | 432 | Retry finished work that named no check |
| T-1058 | tools | 211 | Look at a second task that ended with no commit |
| T-1060 | tools | 207 | Look at a third task that ended with no commit |

</div>


**What this means for S3.** The three-day rule is too small to fix the problem. Most of the board's [tools] weight is younger than three days: 226 of 287 lines. Getting the board down to the release path needs a second cut, and it should be by kind and priority (for example, P2 and P3 [tools] lines younger than three days that block no product line), not by age. That is my call to make once this first cut has run and been measured. I am not lining it before then.

**Pointer and restore.** When the mode runs, each archived line goes to log/board-archive-s3-2026-11-05.md under its heading. The archive records the date, the reason ("S3 cut, T-2617") and the command that restores it. One pointer line stays on the board naming the archive file and the IDs.
{% endraw %}

</div>
