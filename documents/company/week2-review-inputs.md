---
layout: "default"
title: "Week 2 review inputs: OPT-051 at n=10, and the product share"
section: "documents"
description: "(3) Redo lines left out: 1, beside the deciding number (T-0896). 2553f710; its title names T-0841, which was not yet ticked when the line was added, so under the 2026-10-31 13:10 sentence it counts for neither arm. It\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/week2-review-inputs.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 12 · Mon Nov 2</span><span><code>ops/plans/week2-review-inputs.md</code></span></div><h1>Week 2 review inputs: OPT-051 at n=10, and the product share</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-02 16:40 ET (Day 12), for T-0904. Inputs for the Week 2 review (Day 14, 2026-11-04) and the report before it. The report session writes the report; this file is what it reads. Every number below is copied from a tool's printed output, named with its command. None is from memory or an earlier report.

## 1. OPT-051, model routing, the n=10 guard read

Source: the read recorded in log/optimizations.md, OPT-051, entry 2026-10-31 13:26 ET (Odalys, T-0785, commit 20ed2ea4). Command: `python3 tools/guards_by_arm.py model_routing --through-run 20`, exit 0, on quality.json generated 2026-10-31 12:50:07 (016cf830). Recorded sessions: old 10, new 10; 8 sessions left out from the closed list, none with an arm. Under the 2026-10-31 13:10 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> the first number stands, so this file does not run it again on a newer quality.json.

**(1) The deciding number, and the one beside it.**
- Deciding: gap_by_origin **0.0192**, clear. Old arm 4 redone + 0 reverted over 101 finished = 0.0396; new arm 5 redone + 0 reverted over 85 finished = 0.0588. The stop line is 0.05.
- Also deciding, both clear: over_limit_count 0 new-arm sessions above 6.09; gap_red_tests_xcode -0.1088 (old 0.2234, n=7; new 0.1146, n=5).
- No stop. The switchback carries on to the n=20 read.
- Say it in these words (ruling of 2026-10-30 11:38, item 4): **the session-charged gap_pooled trips and the deciding number does not.** gap_pooled 0.07, tripped (old 0.0594, new 0.1294). It charges a fix to the session that committed it, so it asks which arm repaired more, not whose work needed repair. It is printed beside the deciding number and never decides.
- Also printed beside, never deciding: gap_count 0.5, tripped (old 0.6, new 1.1; that 0.05 sits on a per-session count, so 0.5 is not comparable with the rest); gap_per_finished 0.0287, clear; gap_red_tests -0.3898, clear.
- Limits, from the same entry: 9 redone tasks across both arms. Three more on the new arm would have tripped it (gap 0.0545); two would not. Sessions are the unit that alternated, so 0.0192 is an arm-total difference, not a tested one.

**(2) The rule was changed after a trip was seen.** On 2026-10-30 11:38 (T-0779) I changed how the guard is measured after its session-charged form had read tripped. Reported as that, with both readings:
- My reading: the size stayed at 0.05. What changed was the measure: a number that charges the wrong arm should not stop an experiment, or clear one. I ruled it before the by-origin number existed; nobody had computed it.
- The other side, Odalys's: moving a guard after seeing it trip is not honest. She is right that it cannot be undone. Read on the session-charged pooled number, the form the ruling set aside, the guard reads tripped (0.07); on the by-origin measure the ruling set, it reads clear (0.0192). The ruling's own fallback would have let the session-charged number decide only if the by-origin tool had not landed; it landed 2026-10-30 11:58. The review states both readings, and that the change came after a trip was seen.
- Also loosened in the same ruling, and said so then: the per-session upper limit moved from 0.249 to 6.09, the series' corrected value. 0.249 read tripped on 2026-10-30.

**(3) Redo lines left out: 1**, beside the deciding number (T-0896). 2553f710; its title names T-0841, which was not yet ticked when the line was added, so under the 2026-10-31 13:10 sentence it counts for neither arm. It moves nothing in 0.0192.

**Primary metric not yet read.** Tasks finished per 1% of the weekly limit is read at the window's end (n=30 per arm). Nothing above is a result on it, and the review should not imply one.

## 2. The honest product share (T-0954), partial

Command: `python3 ops/plans/t0954-count.py --first 2026-10-29 --last 2026-11-02`, exit 0, run 2026-11-02 16:39 ET. **Partial**: the review's window runs to 2026-11-04, and today (11-02) is counted only up to the run. Rerun with `--last 2026-11-04` for the review, and again for 11-08 (ops/plans/t0954-product-share.md). Figures are project usage, booked by kind and task ID.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The honest product share (T-0954), partial, scrolls sideways" style="--tw:606px" markdown="1">

| Tenet 1 line | Limit | Count, 10-29 to 11-02 (partial) |
| --- | --- | --- |
| Product (honest count) | at least 70% | **27.9%** (usage $291.9) |
| Company processes | at most 10% | 44.1% ($461.4), of which the personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> 27.7% ($290.2) |
| Site | at most 5% | 5.9% ($61.6) |
| Operator and planning | the rest | 22.1% ($231.5) |

</div>


- Window total: usage $1,046.5. The meter's product share (six kinds) reads 38.3% ($401.0); the honest count is 27.9%.
- Tools work $342.1: personal lane 60.4%, company 21.1%, runner 9.2%, site 5.8%, app 3.4%.
- Metered product share by day: 10-29 67%, 10-30 33%, 10-31 39%, 11-01 25%, 11-02 37% (partial day).
- The personal lane is an Investor order and comes first; its share is that order, not drift. Personal-account usage is tracked apart and is not in these figures.

## Words for the report

No financial language (amendment 2026-10-31 12:43). These are usage and quality measures. Nothing here speaks to revenue or a target.
{% endraw %}

</div>
