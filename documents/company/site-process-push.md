---
layout: "default"
title: "Site and process push to Monday 11-09, then the app"
section: "documents"
description: "Finish the site and process work that pays back before the 11-30 freeze. Keep the Simulators busy with app work in the meantime. Return the company to the app by Tuesday 11-10, and say what that does to the release date."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/site-process-push.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/site-process-push.md</code></span></div><h1>Site and process push to Monday 11-09, then the app</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Plan mode with an Investor on #41: asked 2026-11-07 9:25 PM (c6716149093), questions 9:27 PM (c6716173503), answers 9:39 PM
(c6716280761). Written by the Operator (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-b2). Either Investor decides alone (charter 57). This changes the standing
rule of 11-06 8:01 PM (an Investor c6700015760), which put site and process first only until the 11-08 2:00 AM reset. The
main session copies the answer into amendments.md and folds it (charter 59).

## Goal
Finish the site and process work that pays back before the 11-30 freeze. Keep the Simulators busy with app work in the
meantime. Return the company to the app by Tuesday 11-10, and say what that does to the release date.

## What the answers decided
- **Scope (Q1 B):** the pipeline fixes, meaning the MacBook runner, the merge queue, landing, pushes and the main gate,
  plus every Investor-asked site and process line ("Investor ..." in its source). Every other open [site], [tools] and
  [ops] line is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> until the push ends. A parked line keeps its text and its priority.
- **End (Q2 B):** end of Monday 2026-11-09 (11:59 PM ET). Whatever is left then shares time with the app.
- **<span title="A measured fact that holds a grade below a letter, however good the rest is.">Cap</span> (Q3 A):** until the push ends, a new [tools], [ops] or [site] line is added only for a blocker, a guard, or an
  Investor's ask.
- **App share (Q4 B):** app tasks ([build], [fix], [test], [ios], land:xc) take the Mac mini's Xcode slot and the MacBook
  runner whenever either is free. They never wait for the push to end.

## Steps (board lines)
1. **Unblock first (existing lines, merge-first):** T-3362 and T-3363 (pushes and lane lands, held since 5:19 PM 11-07),
   then T-3360 and T-3361.
2. **T-3383 (Odalys, P0):** the dispatcher applies the push. Lines in scope go before other lines until 11-09 11:59 PM, and
   app lines go whenever Xcode or the MacBook is free.
3. **T-3384 (Ines, P0):** mark each open site and process line as in scope or parked, together with T-3230's prune.
4. **T-3385 (Odalys, P1):** the board tool warns about new site and process lines outside the cap, and the report counts
   them.
5. **T-3386 (Ines, P1, on 11-10):** re-date the milestones after the push and report the effect on release (12-15
   target, 12-20 goal) on #41 and in the next report.
6. **T-3387 (Odalys, P2, on 11-14):** measure whether the pipeline fixes won back main-account time. The estimate was
   about 3 h a day of the 8.9 h of upkeep, waits and checks on 11-07, from `tools/session_gaps.py`.

## How the work goes faster
- Group site asks by page, so one task, one test run and one landing cover several asks.
- Fix whatever stops all landing before anything else (step 1).
- Prune stale lines (T-3230), so the menus offer fewer dead lines.

## Risks
- The estimates are judgments. The 1 to 2 days on release and the 3 h a day won back are not measured. Steps 5 and 6
  check them.
- Steps 2 and 4 are process lines themselves. They are inside the cap because they carry an Investor's ask.
- If pushes stay held past Sunday morning, the push has less than two days of landing. Step 5 says so.

## Left out
- Parked lines aren't deleted. They come back after 11-09 and share time with the app.
- No change to Commandments 6, 7 and 11, or to the gates.
{% endraw %}

</div>
