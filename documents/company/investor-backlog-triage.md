---
layout: "default"
title: "Old Investor lines: one triage pass (T-3200)"
section: "documents"
description: "For Ines, in one pass (her board line, Model: Opus high). Written by Odalys, 2026-11-07 01:06 ET, from python3 -I tools/investor_age.py list on that board: 43 open lines whose source is an Investor message 48 h old or\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/investor-backlog-triage.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/investor-backlog-triage.md</code></span></div><h1>Old Investor lines: one triage pass (T-3200)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
For Ines, in one pass (her board line, Model: Opus high). Written by Odalys, 2026-11-07 1:06 AM ET, from
`python3 -I tools/investor_age.py list` on that board: 43 open lines whose source is an Investor message 48 h old or
more (34 runnable, 9 held). Investor an Investor, #41 c6702290350: "Proposed fixes should never be forgotten or
deprioritized for multiple days."

What the tool already does (T-3200): every runnable line below now starts next, behind only the merge-first list
(tools/kind_first.py tier 0.5, read by board.py, dispatch.py and personal_tick.sh), and Home and the reports' facts
list them with their age. So 34 lines now share the head of the queue; this pass decides which stay there.

For each row, write one decision in the last column:
- **do now**: it stays at the head; fix its owner or priority if they are wrong (a line with no owner is picked anyway).
- **merge into T-x**: the work is inside another open line; tick this one with a note naming that line.
- **ask once to drop**: the work no longer fits; list it in one comment to the Investors (all such rows together,
  one ask), and tick it only after their answer.

How to read the table: Age is from the first Investor message the line cites (Source). A line that cites an old
<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> as context before its own source reads older than it is; check the source before deciding. "time estimated"
means the inbox does not hold that comment and its time is interpolated from the comment IDs around it. Held lines
wait on an issue or a date; requests_close's sweep now clears a wait on a closed issue by itself.

Known gap, not in this table: a line that carries an Investor request on from another line ("T-1776 stage 3", T-2074,
T-2075, T-2076) and cites no Investor comment itself is not counted. The follow-up line on the board covers it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="1 4 5 9" style="--tw:1104px" markdown="1">

| # | Line | Age | Box | P | Owner | Title | Source | Decision (do now / merge into T-x / ask once to drop) |
|---|---|---|---|---|---|---|---|---|
| 1 | T-0073 | 12 d 3 h | held | P3 | Odalys | Test that a site with no terms page is unguessed | an Investor c6407113363, 2026-10-26T02:49 | |
| 2 | T-0074 | 12 d 3 h | held | P2 | - | Cache which hosts have been cleared for reading | an Investor c6407113363, 2026-10-26T02:49 | |
| 3 | T-0384 | 11 d 3 h | held | P1 | Maren | Land the design references study for the report | an Investor c6432739086, 2026-10-27T03:06 | |
| 4 | T-0380 | 11 d 2 h | held | P1 | Odalys | Add a fresh-reader check of the rendered report | an Investor c6432847087, 2026-10-27T03:15 | |
| 5 | T-0381 | 11 d 2 h | held | P1 | Odalys | Build the chosen report design with charts | an Investor c6432847087, 2026-10-27T03:15 | |
| 6 | T-0382 | 11 d 2 h | held | P2 | Odalys | Rebuild generated parts for the earlier reports | an Investor c6432847087, 2026-10-27T03:15 | |
| 7 | T-0635 | 9 d 2 h | open | P2 | Idris | Tint editor search matches amber | an Investor c6487099640, 2026-10-29T03:29 | |
| 8 | T-0637 | 9 d 1 h | held | P0 | - | Fix the MacBook Xcode test recipe | an Investor c6487877574, 2026-10-29T04:23 | |
| 9 | T-0675 | 8 d 18 h | open | P0 | Idris | Run Python widget scripts inside the widget extension | an Investor c6495534244, 2026-10-29T11:33 | |
| 10 | T-0757 | 8 d 1 h | open | P1 | - | Install a signed build on the Investors' iPhone | Investor c6515021324 (time estimated), 2026-10-30T04:31 | |
| 11 | T-0825 | 7 d 8 h | open | P1 | Odalys | Let work sessions run on an Investor's own account | an Investor c6533646392, 2026-10-30T21:17 | |
| 12 | T-0826 | 7 d 8 h | open | P1 | Odalys | Run both Claude accounts at the same time | an Investor c6533857293, 2026-10-30T21:29 | |
| 13 | T-0866 | 7 d 5 h | open | P1 | Idris | Tell people when a sibling file leaves widgets stale | an Investor c6536766504, 2026-10-31T00:51 | |
| 14 | T-0790 | 7 d 2 h | open | P1 | Idris | List saved scripts in the Shortcuts run picker | an Investor c6538547501, 2026-10-31T03:41 | |
| 15 | T-0851 | 7 d 1 h | open | P2 | Odalys | Split the app guide into one document per section | an Investor c6539190636, 2026-10-31T04:47 | |
| 16 | T-0828 | 6 d 15 h | open | P1 | - | Build the personal account session tools | an Investor c6544866658, 2026-10-31T14:43 | |
| 17 | T-0941 | 5 d 11 h | open | P1 | Odalys | Use the two personal API keys for sessions | an Investor c6561990461, 2026-11-01T18:21 | |
| 18 | T-1216 | 5 d 8 h | held | P2 | Ines | Ask Investors for App Store Connect contact details | an Investor c6564242390, 2026-11-01T21:37 | |
| 19 | T-0989 | 5 d 2 h | open | P1 | - | Switch a personal account off after a full shift | an Investor c6568339632, 2026-11-02T03:28 | |
| 20 | T-0990 | 5 d 2 h | open | P2 | - | Restyle the day count on Home to fit better | an Investor c6568339632, 2026-11-02T03:28 | |
| 21 | T-1062 | 4 d 11 h | open | P1 | Odalys | Run inbox and report sessions on any account | an Investor c6585053396, 2026-11-02T18:30 | |
| 22 | T-1005 | 4 d 7 h | open | P2 | Odalys | Sweep finished scratch folders on a standing rule | an Investor c6590744880, 2026-11-02T23:05 | |
| 23 | T-1428 | 3 d 14 h | held | P1 | Pernille | Correct the proposal for the package sandbox rules | an Investor c6607686429, 2026-11-03T15:20 | |
| 24 | T-1393 | 3 d 4 h | open | P3 | Pernille | Fix a rating test that leaves empty settings files | an Investor c6620116918, 2026-11-04T01:34 | |
| 25 | T-1776 | 3 d 3 h | open | P1 | Odalys | Rebuild the company site in four stages | an Investor c6621025992, 2026-11-04T02:37 | |
| 26 | T-1780 | 3 d 3 h | open | P2 | Odalys | Explain on the site when an approval no longer fits | an Investor c6621160239, 2026-11-04T02:47 | |
| 27 | T-1858 | 3 d 1 h | open | P1 | Odalys | Use the SSD as overflow space for the Mac mini | an Investor c6622403281, 2026-11-04T04:17 | |
| 28 | T-2052 | 2 d 17 h | open | P0 | Odalys | Make the scheduled report go out on time | an Investor c6630342664, 2026-11-04T12:15 | |
| 29 | T-2586 | 2 d 8 h | open | P1 | Odalys | Find why merges stop without a conflict and fix it | an Investor c6642304087, 2026-11-04T21:15 | |
| 30 | T-2467 | 2 d 8 h | open | P0 | Odalys | Finish the queue that merges finished work | an Investor c6642672872, 2026-11-04T21:33 | |
| 31 | T-2270 | 2 d 5 h | open | P0 | Idris | Let the first TestFlight build pass the privacy check | an Investor c6646784544, 2026-11-05T01:09 | |
| 32 | T-2330 | 2 d 4 h | open | P1 | Odalys | Report MacBook machine facts for the Machine page | an Investor c6647253735, 2026-11-05T01:39 | |
| 33 | T-2280 | 2 d 4 h | open | P2 | Odalys | Build the Machine bubble and Task Lifecycle page | an Investor c6647335197, 2026-11-05T01:45 | |
| 34 | T-2308 | 2 d 3 h | open | P1 | Odalys | Draw the flow diagrams from the code that drives it | an Investor c6647932583, 2026-11-05T02:22 | |
| 35 | T-2985 | 2 d 3 h | open | P3 | Odalys | Show "N questions waiting" on Chat thread rows | an Investor c6648213128, 2026-11-05T02:41 | |
| 36 | T-2344 | 2 d 3 h | open | P2 | Odalys | Build the Plan mode button and answers on the site | an Investor c6648213128, 2026-11-05T02:41 | |
| 37 | T-2346 | 2 d 3 h | open | P1 | Odalys | Apply approved changes without ending the work session | an Investor c6648227019, 2026-11-05T02:42 | |
| 38 | T-2372 | 2 d 3 h | open | P1 | Idris | Make all twelve premades free | an Investor c6648346528, 2026-11-05T02:50 | |
| 39 | T-2401 | 2 d 2 h | open | P1 | Odalys | Let Investors reorder queued tasks on Home | an Investor c6648649825, 2026-11-05T03:12 | |
| 40 | T-2419 | 2 d 2 h | open | P2 | - | Raise the parallel Simulator count by memory and storage | an Investor c6648996659, 2026-11-05T03:37 | |
| 41 | T-2469 | 2 d 0 h | open | P1 | Maren | Redesign Home around the task stages | an Investor c6650882035, 2026-11-05T05:53 | |
| 42 | T-2470 | 2 d 0 h | open | P1 | Odalys | One shared queue for all Simulator test work | an Investor c6650882035, 2026-11-05T05:53 | |
| 43 | T-2474 | 2 d 0 h | open | P2 | - | Bring back or retire the old Overview's dashboard tests | an Investor c6650882035, 2026-11-05T05:53 | |

</div>


## Decisions (Ines, 2026-11-07 2:51 AM ET, T-3214)

The table above is the 1:06 AM snapshot (43 lines). Refreshed at 2:48 AM the list held 53: ten more lines had crossed 48 h
(T-0321, T-0008, T-0485, T-0820, T-1279, T-1281, T-2182, T-2480, T-2667, plus T-0680). All 53, plus T-2547 (crossed 48 h during the pass), are decided below, in
one pass. Totals: 27 do now (one of them held on the Investors' launcher pick), 20 merged or already done (ticked, each note names the line that holds the work), 7 asked
once to drop (#41 c6704112921, (private)
noted on each line, ticked only after the Investors answer). board_tick.py has no priority mode, so a priority change
is written as a note on the line ("P1 -> P0"); owners were already right except two lines with no owner field (noted).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Decisions (Ines, 2026-11-07 02:51 ET, T-3214), scrolls sideways" style="--tw:724px" markdown="1">

| Line | Decision | Why / where |
|---|---|---|
| T-0073 | ask once to drop | idea-hunt tool, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> by the Investors 10-25 |
| T-0074 | ask once to drop | idea-hunt tool, parked by the Investors 10-25 |
| T-0321 | merge into T-2456 | the first TestFlight build's Release checks replace this re-run |
| T-0384 | ask once to drop | study dropped by the Investors; only a P3 fetch_cite fix left |
| T-0380 | ask once to drop | October report redesign; reports are now a short daily update |
| T-0381 | ask once to drop | same |
| T-0382 | ask once to drop | same; rebuilding Reports 1-9 earns nothing |
| T-0635 | do now, Idris, P2 | approved creative (#95) |
| T-0637 | done (T-0642) | kinds.json fetch steps; xc-test jobs run on the MacBook |
| T-0675 | do now, Idris, P0 | the product's core <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> |
| T-0008 | merge into T-0680 | same device session measures cold start and memory |
| T-0680 | do now, Idris, P0 | #192 closed; device session |
| T-0757 | do now, Idris, P1 | owner noted (no owner field) |
| T-0825 | done (T-0828, T-0934) | personal lane runs |
| T-0826 | done (T-0828) | both accounts run at once, each to its limits |
| T-0866 | do now, Idris, P1 | slice 2 is T-1905 |
| T-0790 | do now, Idris, P1 | ruled: 1.0 lists every saved script (entity follows Projects, T-0843) |
| T-0851 | do now, Odalys, P2 | T-0849 done |
| T-0828 | done (T-0874 to T-0880) | slices and review done, lanes running |
| T-0941 | done (dispatcher) | keys run first while they hold money (tools/dispatch.py KEY_FIRST) |
| T-0485 | do now, Idris, P2 -> P1 | App Review reject without the links; Terms = Apple's standard licence |
| T-0820 | merge into T-1216 | option A chosen on #108; details asked nearer launch |
| T-1216 | do now on its date | waits until 11-17 as the Investors asked; Ines, P2 |
| T-0989 | merge into T-3191 | "until daily usage" Lock In mode replaces it |
| T-0990 | merge into T-2667 | old Home gone; day count settled in the new Home |
| T-1062 | do now, Odalys, P1 | check what the dispatcher left (reports on any account) |
| T-1005 | do now, Odalys, P2 | standing approval 11-07 1:09 AM answers its wait |
| T-1279 | done (409e0b326, #152) | tools/guard_base.py wired in the supervisor |
| T-1281 | merge into T-1279 | its card became #152, approved and applied |
| T-1428 | do now, Pernille, P1 | delete tools/pkg_sandbox.py, re-point the test |
| T-1393 | do now, Pernille, P3 | one parked Swift test file |
| T-1776 | merge into T-2072, T-2074, T-2075, T-2076 | the four stage lines (T-3215 makes them count) |
| T-1780 | ask once to drop | approvals now apply on their own |
| T-1858 | merge into T-2060/T-2061/T-2062 (done), T-2587 | SSD overflow rest |
| T-2052 | do now, Odalys, P0 | #164 closed; supervisor half can go |
| T-2586 | do now, Odalys, P1 -> P0 | merge-first standing rule |
| T-2467 | do now, Odalys, P0 | merge-first |
| T-2182 | done (faaff6ab7, #180; pins #197) | claims sweep in personal_tick.sh |
| T-2270 | do now, Idris, P0 | T-2702 landed; upload after T-2456 |
| T-2330 | merge into T-2470 | runner 13 landed; task-at-the-lock goes to the shared queue |
| T-2280 | merge into T-2667 | Task Lifecycle moved onto Home; Machine half is T-3201 |
| T-2308 | do now, Odalys, P1 | also builds This Session (from T-2469) |
| T-2985 | do now, Odalys, P3 | after T-2667; plan.js budget confirmed |
| T-2344 | do now, Odalys, P2 | plan.js budget confirmed: 6,144 B raw / 2,560 B gz |
| T-2346 | do now, Odalys, P1 -> P0 | left: session_end.py stops ending sessions on approve/amendment |
| T-2372 | do now, Idris, P1 | B-staged item 6 |
| T-2401 | do now, Odalys, P1 | Investor-requested site work |
| T-2419 | merge into T-2470 | Simulator count belongs to the shared queue |
| T-2469 | merge into T-2308 | Home built in T-2667; This Session left |
| T-2470 | do now, Odalys, P1 | carries T-2419 and T-2330's rest |
| T-2474 | do now, Odalys, P2 | owner noted (no owner field) |
| T-2480 | merge into T-2667 | built there (ddd44ec37) |
| T-2667 | do now, Odalys, P1 | carries T-2280, T-2480, T-0990 |
| T-2547 | do now on the Investors' pick | held on their launcher choice (#41 c6652979259, no pick yet); Idris+Maren, P2 |

</div>


Order until the weekly reset (11-08 2:00 AM): merge and process lines first (T-2467, T-2586, T-2346, T-2052, T-2470,
T-1062, T-1005), site next (T-2667, T-2308, T-2401, T-2344, T-2985, T-2474, T-0851), app lines as Idris's lane allows
(T-0675, T-0680, T-2270 first). Odalys holds 15 of the 26; that is the bottleneck, so the site lines may go to any
free lane that can take them.
{% endraw %}

</div>
