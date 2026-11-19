---
layout: "default"
title: "T-4770: the 1.0 release, re-estimated with a measured rate (settled 11-17, Idris&#x27;s check folded in)"
section: "documents"
description: "Reconciled 11-18 (Ines, T-4770 redo on fresh main). Two things moved after this was written. T-4870 (11-18) put the uncalibrated model&#x27;s likely date at Wed 2027-07-21 (range 2027-04-13 to 2027-12-10) after Idris checked\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4770-reestimate.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4770-reestimate.md</code></span></div><h1>T-4770: the 1.0 release, re-estimated with a measured rate (settled 11-17, Idris's check folded in)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, Tue 2026-11-17, 5:20 PM ET; settled 5:30 PM ET after Idris's check (section 7, b98faf2800). Answer to an Investor, #41 c6961475730 (4:26 PM): "Is this real? ... Is this delay also the result of just inaccurately predicting how long it takes for our system to build things?" The Operator's first answer (c6961595541) gave the per-phase weeks from `ops/plans/T-4266-release-range.py` and said they were uncalibrated. This file checks them against what the company has measured. Script: `ops/plans/T-4770-release-estimate.py` (the old one untouched).

**Reconciled 11-18 (Ines, T-4770 redo on fresh main).** Two things moved after this was written. T-4870 (11-18) put the uncalibrated model's likely date at Wed 2027-07-21 (range 2027-04-13 to 2027-12-10) after Idris checked snap-to-layout at 4.25 slot weeks, not 3 (T-4285). This file's figures now carry that check (script: snap 4.25, 2 to 6.5), so the checked line below is **Tue 2027-07-27**, 6 days after T-4870's, in the same direction. T-4871 (two-way editing's week figure) is still open, so Idris's 3.5 here stands for now. **`ops/milestones.json` is not moved by this slice:** a 6-day move is under the two-week line (an Investor, #325 c6977134306), so it goes in the next report only, and the date is moved once, when T-4871 closes, not twice in a day. The measured ratio (section 2.1) is two data points only and is kept as a finding, not as an input to the likely line.

## 1. The short answer

- **The likely release is Tue 2027-07-27 (Day 279); the range is Sun 2027-02-21 (Day 123) to Fri 2027-12-24 (Day 429).** Against the uncalibrated line of 11-16 (Mon 2027-07-12) that is 15 days later, and against T-4870's 07-21 it is 6 days later. This is the script's checked line: Idris's figures for phase B, the ADR-011 steps, the Builder and snap-to-layout (4.25, T-4870), at a ratio of 1.0 (likely), 0.57 (best) and 1.0 on the worst figures (worst).
- **Is the July date estimating error? Mostly no.** My draft said the company built faster than it estimated (0.57 and 0.50) and moved the likely date to April. The 0.50 was wrong: I measured the freshness group from its first commit to its last, but the group is not closed (four of its six tasks open, T-0793 blocked, T-0678's review FIX FIRST today), so its ratio is at least 1.7 and rising. Phase A's 0.57 counts its done-line; with its review findings, now in phase B, A is about 10 days against 7, near 1.4 (Idris, s7 Q5). On the work measured to its end, the company builds at about its estimates or slower. The July date comes from scope, not from pessimistic figures.
- **Where the weeks go (section 4):** the scope added on 11-13 to 11-16 (Pages, two-way editing, snap-to-layout, the widget tap choice, buttons and run-a-function, Developer mode) adds 17.99 weeks on the checked line, against 15 for the Builder core, Foundations and finishing the IDE. The Builder phase alone is 14.25 weeks.
- **"The increased pace of work":** not yet in the records. App-side work took 29% of the last 14 days' spend and 28% of the last 7 (section 2.3), flat. The 11-17 6:45 AM <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (process work only on an Investor's ask) should show in next week's split; a faster pace then shows as a lower ratio at the next phase close, and the date moves in.
- **The one-slot assumption:** the slot is now 2 general + 1 gate (T-4655), but the machine's load, not the slot count, is the limit: 13 builds that started beside another ran a median 144 s against 33 s solo (section 3). Pairing app builds saves little until load falls. Running C's non-slot work beside B (the manifest ADR, Maren's frames, the Python mirror of step 1) would pull the date in about 1 week (0.5 to 1.5, Idris s7 Q4); not in the script.
- **Limits:** one measured point below 1.0 and one above it, both small. This is a direction. A firm date still comes when the Builder first works on a phone (#270 A, #272 A). Next point: phase B's close; Idris commits to **Wed 2026-12-16** for B's Mac items, and the phone items close at the first Investor phone session after that.

## 2. What was measured

### 2.1 Estimates with an outcome (the ratio actual / estimate)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2.1 Estimates with an outcome (the ratio actual / estimate), scrolls sideways" style="--tw:1108px" markdown="1">

| Estimate | Where | Actual | Ratio |
| --- | --- | --- | --- |
| Phase A: 1 slot week (0.5 to 2) | `05-timeline.md` s1 (11-13) | 4 calendar days, Fri 11-13 to Mon 11-16, by the Investors' count (an Investor 11:37 PM 11-16; T-4689) | 0.57 |
| Freshness group: about 10 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> days (T-0675 3.5, T-0687 and T-0696 1, T-0678 1, T-0198 and T-0793 2) | `plan.md` "Why Day 55" (11-01) | The six tasks' app commits span 11-01 2:41 PM to 11-05 2:47 AM (`git log --all --grep`), lanes in parallel: 5 calendar days | ~~0.50~~ at least 1.7, open (s7) |

</div>


Not usable as a ratio: ADR-001's Day 17 submission and `plan.md`'s Day 55 were both overtaken by scope the Investors added (#270, #272, #287, #300, ADR-011), so their miss mixes pace with scope and cannot be read as a pace error alone. `05-timeline.md` already recorded Day 17 to Day 48 as "2.8 times the first figure"; that figure is scope and pace together.

Lines (after Idris's check, s7): likely 1.0, best 0.57, worst 1.0 on the worst figures. **Correction:** the freshness group's 0.50 above is wrong. The group is not closed (T-0198, T-0678, T-0687, T-0696 open; T-0793 blocked; T-0678's commits run to 11-17), so first-to-last commit counted the start of the work, not its end; its ratio is at least 17 days / 10 = 1.7 and rising. Phase A's 0.57 counts its done-line; with its review tail (now in B) it is near 1.4. Phase E (five days of beta, the review window, one rejection) is Apple's calendar and keeps its 3 weeks (2 to 4) at every ratio.

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


The app share is flat (30% to 28%), and app-side spend fell in dollars ($726 to $508). "Not spending most of the app's usage on process improvements" has not yet happened in the records; the 11-17 6:45 AM ruling (103 process lines archived, process work only on an Investor's ask) should show in next week's table. Personal accounts' 592 runs ($3,720 at plan rates) are outside this reconciliation.

## 3. The one-Xcode-slot assumption, on facts

- The slot is no longer one: `tools/heavy_slot.py size` gives 2 general + 1 gate (8 cores // 2, less one booted Simulator) since T-4655 (11-16).
- The machine, not the slot count, is the limit when it is busy. `tools/machine_load.py summary --hours 336` (9,765 rows, 11-10 to 11-17): load per core median 1.31, p90 17.49, max 127.5 on 8 cores; memory pressure above normal in 1,526 rows (16% of minutes); `mem_free.jsonl` saw swap at 34.4 GB on 11-16 before idle Simulators were shut. xcodebuild was running in 1,340 of the 9,765 minutes (14%).
- Two app builds at once: in `xc.jsonl`, the 13 runs that started with another xcodebuild running took a median 144 s against 33 s for the 1,733 solo runs (exits 0 and 65). 13 rows, and the two sets may differ in what they ran, so this is a warning, not a measure: a second concurrent build runs several times slower on a loaded machine, and the saving from pairing builds is near zero until load falls. The old plan's "one engineer-week on the slot" is wrong in a different way: the slot was used 35.7 hours in its busiest week and 2.7 in a quiet one; the weeks are a unit of engineer attention, not of machine time.
- The MacBook runner runs the land checks (59 on 11-16, 12 of them failed because the runner ended, `runner_health.jsonl`), may run Simulators and a personal lane's pre-merge checks (rulings, [`handbook/rules.md`](rules.html)), and was idle while work waited for 165 minutes on 11-16 and 61 on 11-17. Development builds (`tools/xc.sh` on a worker's lane) stay on the Mac mini. What moving more test runs to the runner would save: the Mac mini's 14% xcodebuild minutes and the load that slows every session; not a figure in weeks, because no phase figure is in machine hours.

## 4. The re-estimate (checked line, `ops/plans/T-4770-release-estimate.py`, start Tue 2026-11-17)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. The re-estimate (checked line, ops/plans/T-4770-release-estimate.py, start…, scrolls sideways" style="--tw:1123px" markdown="1">

| Phase | Old likely (best to worst), weeks | Checked likely (best to worst) | Checked end | Old end |
| --- | --- | --- | --- | --- |
| B: finish the IDE and widgets, Developer mode | 3.6 (2.9 to 6) | 4.1 (1.65 to 7) | Wed 2026-12-16 (Day 56) | Sat 2026-12-12 |
| C: Foundations, widget tap choice | 7.2 (4.2 to 11.2) | 7.14 (2.53 to 11.57) | Thu 2027-02-04 (Day 106) | Mon 2027-02-01 |
| D: the Builder, two-way editing, snap-to-layout | 12.25 (7 to 19) | 14.25 (4.84 to 22.5) | Fri 2027-05-14 (Day 205) | Tue 2027-04-27 |
| Pages, run-a-function and buttons | 7.8 (4.4 to 13.2) | 7.5 (2.64 to 12.29) | Tue 2027-07-06 (Day 258) | Mon 2027-06-21 |
| E: release (Apple's calendar, no ratio) | 3 (2 to 4) | 3 (2 to 4) | **Tue 2027-07-27 (Day 279)** | Mon 2027-07-12 |

</div>


Whole: 35.99 weeks (13.67 to 57.36): likely Tue 2027-07-27, best Sun 2027-02-21 (Day 123), worst Fri 2027-12-24 (Day 429). Old line: 33.85 weeks, Mon 2027-07-12 (2027-04-10 to 2027-11-26). Sensitivity of the likely date to the ratio: 0.5 gives 2027-04-02; 0.57 gives 2027-04-19; 0.75 gives 2027-05-30; 1.5 gives 2027-11-19.

**For the Investors to choose (scope is theirs; this is the arithmetic, not a recommendation).** Each feature's weeks on the checked line, and the likely release if it were cut or moved to 1.1, the rest unchanged:

1. The Builder with the custom block (D): 6.5 weeks (2.28 to 10); without it Fri 2027-06-11. It is the 1.0 promise (#270 A), so cutting it changes what 1.0 is.
2. Foundations: Project, manifest, four tabs (C): 5 (1.71 to 8); without it Tue 2027-06-22. Not re-checked by Idris; most of 1.0 stands on it.
3. Pages in the editor and the Builder (#272 A): 5 (1.71 to 8); without it Tue 2027-06-22. Not re-checked.
4. Two-way editing, blocks and code (#287 C): 3.5 (1.42 to 6); without it Fri 2027-07-02.
5. Finish the IDE and widgets (B core): 3.5 (1.42 to 6); without it Fri 2027-07-02. Already under way and top priority.
6. Snap-to-layout drag and drop (#300 A): 4.25 (1.14 to 6.5; Idris's code check, T-4870); without it Sun 2027-06-27.
7. Run-a-function and widget buttons (ADR-011 steps 4, 6a, 6, 9, 10): 2.5 (0.93 to 4.29); without it Fri 2027-07-09.
8. Widget tap choice (ADR-011 steps 1, 2, 3, 8): 2.14 (0.82 to 3.57); without it Mon 2027-07-12.
9. Developer mode (T-4688, B): 0.6 (0.23 to 1); without it Fri 2027-07-23. Being built now; B's phone proof tests Pro through it.

Moving 4, 6 and 7 together (two-way editing, snap-to-layout, run-a-function and buttons) saves 10.25 weeks on the likely line, to about Sun 2027-05-16. That sum is mine, not the script's (35.99 less 10.25 weeks, from 11-17).

## 5. Limits, stated plainly

1. Two measured points, one below 1.0 (phase A, 0.57 by its done-line) and one above (the freshness group, at least 1.7 and open). The two points are not enough for a rate (a direction at most), so the likely line takes 1.0 between them; the best line is phase A's ratio; the worst line uses Idris's worst figures, 1.6 to 1.9 times the likely ones.
2. The figures multiplied are estimates: Idris's for B, the ADR-011 steps and the Builder (s7); the CEO's for Foundations and Pages (05-timeline.md s1, s4), not re-checked.
3. 157 landed app tasks have actuals but no per-task estimates; xc.jsonl tags tasks only from 11-08. The task process redesign (T-4122) should put an estimate on each card, so the next measurement rests on tens of tasks, not two.
4. The usage split is my grouping of `ops_metrics.py`'s kinds (site counted as process).
5. The concurrent-build figure rests on 13 rows and compares unlike runs.
6. Phases are sequential; C beside B (about 1 week, Idris s7 Q4) is not modelled.
7. an Investor, 5:04 PM (#41 c6962306629): economical, not top priority, "little by little". This slice is the whole of it: no further research. The next step is one point per phase close, starting with B.

## 6. What Idris checked

His check is section 7; each answer is folded in above, with snap-to-layout as he later checked it in code (T-4870, 4.25). Not done in this slice, on purpose: moving `ops/milestones.json`, `plan.md` and `ops/state.md` (6 days, under the two-week line; moved once when T-4871 closes), and any post on #41 (full) or #325. Open: T-4871 (two-way editing's 3.5 here, 2.75 on the card); Foundations and Pages are the CEO's figures, not yet checked by Idris.

## 7. Idris's check (11-17)

Idris, Tue 2026-11-17, from the board lines named below, ADR-011 s13 and `git log`; no Xcode run, no new research. Figures are calendar days (the company works all seven; the script's weeks are 7 days, and phase A's 0.57 is 4/7). The script now carries these figures: `ops/plans/T-4770-release-estimate.py`, Ines's draft figures kept beside as the old line.

**The ratio first, because it changes the answer.** The freshness group is not closed. Of its six tasks, T-0198, T-0678, T-0687 and T-0696 are open on the board, T-0793 is blocked, and T-0678's commits run to today (T-4612's review, FIX FIRST). Measuring from first to last commit counted the start of the work, not its end. Its ratio is at least 17 days / 10 = 1.7 and still rising, not 0.50. That leaves one point below 1.0 (phase A) and one above it, so I do not take 0.57 as the likely line. The script now runs likely 1.0 on my figures, best 0.57 (phase A), and worst 1.0 on the worst figures, which are 1.6 to 1.9 times the likely ones and so cover the freshness point.

1. **Phase B.** 24 days likely (17 to 42) for the core, against 3 weeks (2.5 to 5); Developer mode 4 days (3 to 7), Ines's 0.6 week kept. B is 4.1 weeks, not 2.05. What is left: the refresh tap's review findings T-4772, T-4773, T-4436 and the Lock Screen and glyph runs T-4433 and T-4435 (about 9 days). Phase A's review tail now sits in B: T-4494, T-4630 to T-4633, T-4656 to T-4658 (about 6). The web widget: T-0687 (b) with T-4750 and T-4751, and T-0696 (about 3). The editor leftovers: T-4662 (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>), T-3280's UI runs and T-3821 (about 3). Developer mode, T-4688 (4). T-4775 (P3) goes after 1.0.
   - **<span title="How many people show, in their own words, that they want this.">Need</span> the Xcode slot:** T-4772, T-4773, T-4433 (Simulator part), T-4435, T-4436, T-4630 to T-4633, T-4494, T-0696, T-4750, T-4662, T-3280 and T-4688.
   - **No slot:** T-4656 to T-4658 and T-4751 (Python and host tests), and Pernille's five open reviews of T-4181 (T-4609, T-4612, T-4696, T-4699, T-4759).
   - **Need an Investor's phone, not the slot:** T-2097 and T-2196 (the code is on main since b3131df07; they wait for a phone session), T-4774, the phone half of T-4433, and "with Pro, a widget left alone refreshes by itself" (T-0793, blocked). These come in one phone session, and B's end depends on its date.
2. **ADR-011 steps** (likely, best, worst, days). Tap choice: step 1 is 3 (2, 5), step 2 is 3 (2, 5) after the manifest ADR, step 3 is 5 (3, 8), and step 8 is 4 (3, 7) after Maren's step 7. Total 15 (10 to 25) = 2.14 weeks, against Ines's 2.2 (1.2 to 3.2). Run-a-function and buttons: step 4 is 4 (3, 6), step 6a is 5 (3, 9) with Odalys's review, step 6 is 6 (4, 10), step 9 is 2 (1, 4) on a phone, and step 10 is half a day of my input, beside Maren and Ines. Total 17.5 (11.5 to 30) = 2.5 weeks, against 2.8 (1.4 to 5.2). Step 5 is Pernille's and runs beside.
3. **The Builder.** 0.57 does not apply. It is new interface work with drag and drop and a code round trip, unlike phase A or the freshness tasks, and it is the phase most likely to come in at or above its figure. The core stays at 6.5 weeks, but its best rises from 3 to 4, since 3 is half the likely figure and nothing measured supports it. Two-way editing goes to 3.5 (2.5 to 6), from 2.75: reading arbitrary Python back into blocks is where the time goes. Snap-to-layout stays at 3, with the range 2 to 5.
4. **C beside B.** Partly. Most of C's interface steps are mine (T-4548, T-4549, T-4552, T-4557), so a second lane splits one engineer's attention rather than adding any. Section 3 shows that a second concurrent build runs several times slower while the machine is loaded. Three things can run beside B without the slot: the manifest ADR (writing), Maren's T-4555 frames, and the Python mirror of step 1 if Pernille takes it. That moves C's end about 1 week earlier on the likely line (0.5 to 1.5). It is not modeled in the script.
5. **Phase A.** 4 days is the Investors' count of its done-line (proof complete, 11-16), and I accept that count. The work behind it did not end on 11-16. Its review findings are the B lines in Q1, about 6 more days. With them, A is about 10 days against 7, a ratio near 1.4. So 0.57 is not my number for the company's pace. I cannot give A's slot hours: `xc.jsonl` rows are not tagged per phase.
6. **Phase-B end.** I will not commit to Tue 12-01. I commit to **Wed 2026-12-16** (the script's B end on my figures) for everything in B that runs on the Mac. The phone items close at the first Investor phone session after that, and B's end moves to that session's date if it comes later.

**What the script prints now (with snap-to-layout at 4.25, T-4870):** likely **Tue 2027-07-27 (Day 279)**, range **Sun 2027-02-21 (Day 123) to Fri 2027-12-24 (Day 429)**. Idris's own printout on 11-17, with snap at 3, was Sun 2027-07-18 (2027-02-21 to 2027-12-13). Ines's draft line was Sat 2027-04-10 (2027-02-04 to 2027-11-26), and the old line was Mon 2027-07-12. Phase ends on the likely line: B Wed 12-16, C Thu 2027-02-04, D Fri 2027-05-14, Pages Tue 2027-07-06. If C's interface work runs beside B (Q4), the likely date comes about a week earlier. So my answer to an Investor's question is no. The July date is not mostly estimating error. On the work measured to its end, the company has built at about its estimates or slower. The date moved because of the added scope (section 4's per-feature table, now in the script's output) and the share of usage spent on process work (section 2.3). Sections 1 and 4 above carry his figures; his snap-to-layout 3 (2 to 5) was replaced on 11-18 by his own code check, 4.25 (2 to 6.5), T-4870.
{% endraw %}

</div>
