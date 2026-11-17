---
layout: "default"
title: "T-4770: the 1.0 release, re-estimated with a measured rate (draft, not posted)"
section: "documents"
description: "Not usable as a ratio: ADR-001&#x27;s Day 17 submission and plan.md&#x27;s Day 55 were both overtaken by scope the Investors added (#270, #272, #287, #300, ADR-011), so their miss mixes pace with scope and cannot be read as a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4770-reestimate.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4770-reestimate.md</code></span></div><h1>T-4770: the 1.0 release, re-estimated with a measured rate (draft, not posted)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, Tue 2026-11-17, 5:20 PM ET. Answer to an Investor, #41 c6961475730 (4:26 PM): "Is this real? ... Is this delay also the result of just inaccurately predicting how long it takes for our system to build things?" The Operator's first answer (c6961595541) gave the per-phase weeks from `ops/plans/T-4266-release-range.py` and said they were uncalibrated. This draft calibrates them with what the company has measured, and lists what Idris must check before it is posted. Nothing here changes `ops/milestones.json` or `plan.md` yet. Script: `ops/plans/T-4770-release-estimate.py` (the old one untouched).

## 1. The short answer

- The July date was the old estimates added straight, with no calibration. Measured against the two estimates that have an outcome, the company has built **faster** than it estimated: 0.57 and 0.50 of the estimate. Applied to the same phase figures, the likely release moves from **Mon 2027-07-12 to Sat 2027-04-10 (Day 171)**; the range is **Thu 2027-02-04 to Fri 2027-11-26**. The worst line keeps the old figures whole, because no measured point says the company builds slower than it estimates.
- Yes, part of the July date was estimating error: the only phase measured inside the restructured plan (A) came in at 4 days against 1 week. But the ratio rests on **two points**, both small; it is a direction, not a precise number. The third point lands when phase B closes (its old likely end was 12-12; the measured line says about 12-01).
- The delay is also real, and most of it is scope the Investors added on 11-13 to 11-16: Pages, two-way editing, snap-to-layout, the widget tap choice, buttons and run-a-function add 15.75 slot weeks on the old figures (9.0 measured), against 14.5 for the Builder, Foundations and finishing the IDE together. Section 4 gives each feature's weeks.
- "The increased pace of work": not yet visible in the records. App-side work took 29% of the last 14 days' spend and 28% of the last 7 (section 2.3); the share is flat, not rising. The two measured points were made under this split, so they already carry today's process load. If the app share rises, the ratio should fall below 0.57; by how much, nobody has measured.

## 2. What was measured

### 2.1 Estimates with an outcome (the ratio actual / estimate)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2.1 Estimates with an outcome (the ratio actual / estimate), scrolls sideways" data-n="4" style="--tw:919px" markdown="1">

| Estimate | Where | Actual | Ratio |
| --- | --- | --- | --- |
| Phase A: 1 slot week (0.5 to 2) | `05-timeline.md` s1 (11-13) | 4 calendar days, Fri 11-13 to Mon 11-16, by the Investors' count (an Investor 11:37 PM 11-16; T-4689) | 0.57 |
| Freshness group: about 10 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> days (T-0675 3.5, T-0687 and T-0696 1, T-0678 1, T-0198 and T-0793 2) | `plan.md` "Why Day 55" (11-01) | The six tasks' app commits span 11-01 2:41 PM to 11-05 2:47 AM (`git log --all --grep`), lanes in parallel: 5 calendar days | 0.50 |

</div>


Not usable as a ratio: ADR-001's Day 17 submission and `plan.md`'s Day 55 were both overtaken by scope the Investors added (#270, #272, #287, #300, ADR-011), so their miss mixes pace with scope and cannot be read as a pace error alone. `05-timeline.md` already recorded Day 17 to Day 48 as "2.8 times the first figure"; that figure is scope and pace together.

Lines: likely 0.57, best 0.50, worst 1.00. Spread of the measured points: 0.50 to 0.57, on two points. Phase E (five days of beta, the review window, one rejection) is Apple's calendar and keeps its 3 weeks (2 to 4) at every ratio.

### 2.2 Actuals without an estimate

- 157 app tasks ([build] 152, [fix] 5, [ios] 1 since 10-25, `git log`) landed, by week: 102 (10-26 to 11-01), 46 (11-02 to 11-08), 8 (11-09 to 11-15), 1 (11-16 on). None had an estimate on the board (grep of `ops/board.md` and `log/board-archive*.md` for estimate / slot day / working day: 0 lines), so they give throughput, not a ratio. 140 of them are one-commit tasks (span 0 days); the calendar span of a task is not a usable measure here.
- Xcode slot time (`ops/metrics/xc.jsonl`, 1,789 runs since 10-26, 51.4 slot hours in all): 35.7 h in the week of 10-26, 12.9 h in the week of 11-02, 2.7 h in the week of 11-09; its rows carry a task ID only from 11-08 (17 tasks tagged), so per-task slot time exists for almost nothing that had an estimate. The slot was busiest in the week the most app tasks landed and nearly idle in the weeks usage went to process work: the slot's capacity was not the limit in those weeks; where usage went was.

### 2.3 Usage: app against process, last 14 days (`tools/ops_metrics.py --since 2026-11-03`, and `--since 2026-11-10`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.3 Usage: app against process, last 14 days (tools/ops_metrics.py --since…, scrolls sideways" style="--tw:1044px" markdown="1">

| Window | Total | App-side (build, review, design, release, test) | Process-side (tools, operations, site, ops) |
| --- | --- | --- | --- |
| 11-03 to 11-17 (14 days) | $4,206 | $1,234, 29% | $2,822, 67% |
| 11-10 to 11-17 (7 days) | $1,788 | $508, 28% | $1,230, 69% |
| 11-03 to 11-10 (prior 7, `--until 2026-11-10T00:00`) | $2,405 | $725, 30% | $1,592, 66% |

</div>


The app share is flat (30% to 28%), and app-side spend fell in dollars ($726 to $508). "Not spending most of the app's usage on process improvements" has not yet happened in the records; the 11-17 6:45 AM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (103 process lines archived, process work only on an Investor's ask) should show in next week's table. Personal accounts' 592 runs ($3,720 at plan rates) are outside this reconciliation.

## 3. The one-Xcode-slot assumption, on facts

- The slot is no longer one: `tools/heavy_slot.py size` gives 2 general + 1 gate (8 cores // 2, less one booted Simulator) since T-4655 (11-16).
- The machine, not the slot count, is the limit when it is busy. `tools/machine_load.py summary --hours 336` (9,765 rows, 11-10 to 11-17): load per core median 1.31, p90 17.49, max 127.5 on 8 cores; memory pressure above normal in 1,526 rows (16% of minutes); `mem_free.jsonl` saw swap at 34.4 GB on 11-16 before idle Simulators were shut. xcodebuild was running in 1,340 of the 9,765 minutes (14%).
- Two app builds at once: in `xc.jsonl`, the 13 runs that started with another xcodebuild running took a median 144 s against 33 s for the 1,733 solo runs (exits 0 and 65). 13 rows, and the two sets may differ in what they ran, so this is a warning, not a measure: a second concurrent build runs several times slower on a loaded machine, and the saving from pairing builds is near zero until load falls. The old plan's "one engineer-week on the slot" is wrong in a different way: the slot was used 35.7 hours in its busiest week and 2.7 in a quiet one; the weeks are a unit of engineer attention, not of machine time.
- The MacBook runner runs the land checks (59 on 11-16, 12 of them failed because the runner ended, `runner_health.jsonl`), may run Simulators and a personal lane's pre-merge checks (rulings, [`handbook/rules.md`](rules.html)), and was idle while work waited for 165 minutes on 11-16 and 61 on 11-17. Development builds (`tools/xc.sh` on a worker's lane) stay on the Mac mini. What moving more test runs to the runner would save: the Mac mini's 14% xcodebuild minutes and the load that slows every session; not a figure in weeks, because no phase figure is in machine hours.

## 4. The re-estimate (from `ops/plans/T-4770-release-estimate.py`, start Tue 2026-11-17)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. The re-estimate (from ops/plans/T-4770-release-estimate.py, start Tue…, scrolls sideways" style="--tw:1165px" markdown="1">

| Phase | Old likely (best to worst), slot weeks | Measured likely (best to worst) | Measured end | Old end |
| --- | --- | --- | --- | --- |
| B: finish the IDE and widgets, Developer mode | 3.6 (2.9 to 6) | 2.05 (1.45 to 6) | Tue 2026-12-01 (Day 41) | Sat 2026-12-12 |
| C: Foundations, widget tap choice | 7.2 (4.2 to 11.2) | 4.1 (2.1 to 11.2) | Wed 2026-12-30 (Day 70) | Mon 2027-02-01 |
| D: the Builder, two-way editing, snap-to-layout | 12.25 (7 to 19) | 6.98 (3.5 to 19) | Wed 2027-02-17 (Day 119) | Tue 2027-04-27 |
| Pages, run-a-function and buttons | 7.8 (4.4 to 13.2) | 4.45 (2.2 to 13.2) | Sat 2027-03-20 (Day 150) | Mon 2027-06-21 |
| E: release (Apple's calendar, no ratio) | 3 (2 to 4) | 3 (2 to 4) | **Sat 2027-04-10 (Day 171)** | Mon 2027-07-12 |

</div>


Whole: 20.58 weeks (11.25 to 53.4): likely Sat 2027-04-10, best Thu 2027-02-04 (Day 106), worst Fri 2027-11-26 (Day 401). Sensitivity of the likely date to the ratio: 0.50 gives 2027-03-26; 0.75 gives 2027-05-19; 1.0 gives the old 2027-07-12; 1.5 gives 2027-10-28.

Per feature, weeks on the measured line and the likely release without it (the Investors decide scope; this is the arithmetic, not a recommendation):


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. The re-estimate (from ops/plans/T-4770-release-estimate.py, start Tue…, scrolls sideways" style="--tw:837px" markdown="1">

| Feature | Phase | Measured weeks (best to worst) | Likely release without it |
| --- | --- | --- | --- |
| The Builder with the custom block | D | 3.7 (1.5 to 10) | Mon 2027-03-15 |
| Foundations: Project, manifest, four tabs | C | 2.85 (1.5 to 8) | Sun 2027-03-21 |
| Pages in the editor and the Builder (#272 A) | Pages | 2.85 (1.5 to 8) | Sun 2027-03-21 |
| Finish the IDE and widgets | B | 1.71 (1.25 to 5) | Mon 2027-03-29 |
| Snap-to-layout drag and drop (#300 A) | D | 1.71 (0.75 to 4.5) | Mon 2027-03-29 |
| Run-a-function and widget buttons (ADR-011) | Pages | 1.6 (0.7 to 5.2) | Tue 2027-03-30 |
| Two-way editing, blocks and code (#287 C) | D | 1.57 (1.25 to 4.5) | Tue 2027-03-30 |
| Widget tap choice (ADR-011) | C | 1.25 (0.6 to 3.2) | Thu 2027-04-01 |
| Developer mode (T-4688) | B | 0.34 (0.2 to 1) | Thu 2027-04-08 |

</div>


The three largest are the Builder, Foundations and Pages. Of the 1.0 scope, the Builder core, Foundations and finishing the IDE were in 1.0 from the start (8.26 measured weeks); the 11-13 to 11-16 additions (Pages, two-way editing, snap-to-layout, tap choice, buttons, Developer mode) add 9.32 measured weeks.

## 5. Limits, stated plainly

1. Two calibration points, both under one week of work, both inside two weeks of each other. A ratio from two points is a direction. The best and likely lines are 0.07 apart because the points are; the worst line is a judgment (keep the old figures), not a measurement.
2. The phase figures being multiplied are the same uncalibrated figures as before: the CEO's for B, C, Pages, Dev mode and the ADR-011 steps; L17's (+/-50%) and the designer's for the Builder. A ratio measured on A and the freshness group is applied to the Builder, which is unlike either.
3. Per-task actuals exist for 157 landed app tasks but no per-task estimates; xc.jsonl tags tasks only from 11-08. The company cannot yet say how long "a task of size X" takes. The task process redesign (T-4122) should put an estimate on each card so the next measurement rests on tens of tasks, not two.
4. The usage split comes from `ops_metrics.py`'s by-kind table; "app-side" and "process-side" are my grouping of its kinds (site counted as process, since the site is not the app).
7. an Investor, 5:04 PM (#41 c6962306629): this estimate "should be economical with usage and isn't a top priority ... figure it out little by little". So this draft is the whole of this slice; the next small step is Idris's check (section 6), and after that one point per phase close, not a research project. This slice cost about $7 of usage.
5. The concurrent-build figure rests on 13 rows and compares unlike runs.
6. Everything is in calendar weeks of sequential phases; nothing counts C's interface work starting beside B (allowed by #282 A), which would pull dates in.

## 6. What Idris must check before this is posted (he builds the phases; his check is the next step, a separate call)

1. Phase B's 3 weeks (2.5 to 5) and Developer mode's 3 working days (2 to 5): is 2.05 measured weeks for B credible against the B tasks on the board (T-2097, T-2196, T-4181's remainder, T-4688, the phone proof)? Which B items need the slot and which do not?
2. The ADR-011 step figures (tap: 1, 2, 3, 8; run and buttons: 4, 6a, 6, 9, 10), mine and never his: confirm or replace each (likely, best, worst) in working days.
3. The Builder: L17's 6.5 (3 to 10), two-way editing 2.75 (2.5 to 4.5), snap-to-layout 3 (1.5 to 4.5): does a 0.57 ratio apply to Builder work, or is it the one phase likely to come in at or above its figure?
4. Whether phase C's interface work can run beside B on another lane without slot contention, given section 3's load figures; if yes, by how many weeks C's end moves.
5. The phase A actual: 4 calendar days by the Investors' count. His view of what A's work actually took in working days on the slot, so the 0.57 is his number too or corrected.
6. Whether the measured line's phase-B end (Tue 12-01) is one he will commit to as the next milestone, or what date he will.

After his check: post the answer on #41, update `ops/milestones.json` (phases B to release, each with "measured line, T-4770") and `05-timeline.md`'s rows, and record the ratio and its two points in the decision log so the next phase close adds a third point.
{% endraw %}

</div>
