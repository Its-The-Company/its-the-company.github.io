---
layout: "default"
title: "Audit implementation: status"
section: "documents"
description: "The running record of carrying out ops/plans/system-audit-2026-11.md under the Investors&#x27; mandate of 2026-11-10 (rulings 11-10 00:12, 00:13 and 00:19 in log/rulings.md). Kept by the Fable session that owns the work\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/audit-implementation.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 20 · Tue Nov 10</span><span><code>ops/plans/audit-implementation.md</code></span></div><h1>Audit implementation: status</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The running record of carrying out [`ops/plans/system-audit-2026-11.md`](system-audit-2026-11.html) under the Investors' mandate of 2026-11-10 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> 11-10 12:12 AM, 12:13 AM and 12:19 AM in `log/rulings.md`). Kept by the Fable session that owns the work. Board lines T-3992 to T-3997, one per phase. Times are ET.

A phase is marked done only when its changes have passed their tests and are on main.

## Who owns what

Until T-3992 to T-3997 are ticked, only the Fable session changes these files. Other workers hand it patches by a note on its board line.

`tools/dispatch.py`, `tools/governor.py`, `tools/pool_adapt.py`, `tools/personal_tick.sh`, `tools/personal_land.sh`, `tools/merge_queue.py`, `tools/main_gate.py`, `tools/supervisor.sh`, `tools/parked_count.py`

## Baseline, 12:15 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Baseline, 12:15 AM 11-10, scrolls sideways" style="--tw:893px" markdown="1">

| Measure | Reading | Source |
|---|---|---|
| Unique tasks <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> | 188 (452 waiting branches) | `python3 tools/parked_count.py --json` |
| <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> branches waiting to land | 6 of 6 slots | lane tick logs |
| Land tries, 11-09 | 186, 56 landed (30%) | `ops/runs/land_steps.jsonl` |
| Land time on tries that did not land, 11-06 to 11-09 | 80% | same |
| Main moves, 11-09 | 508, about 8 in 10 records | main's reflog |
| App share of changed code lines, 11-06 to 11-09 | 12% | `git log --numstat` |
| Verified app commits a day | about 15 | same |
| First hand-out to landed | median 9.9 h, slowest tenth over 41.8 h | dispatch log, land steps |
| Kept test passes reused, 11-06 to 11-09 | 10 | `ops/runs/check_reuse.jsonl` |
| Real lane sessions against offers, 11-09 | 35 against 243 | lane tick logs, dispatch log |
| Machine load series | none recorded | |

</div>


## Workers and processes found, 12:13 AM 11-10


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Workers and processes found, 12:13 AM 11-10, scrolls sideways" style="--tw:916px" markdown="1">

| What | State | Decision |
|---|---|---|
| Main work session | none running; pacing holds work ("the week is ahead of its line") | nothing to stop |
| Lane sessions | none running; all six slots wait for their last branch to land; merge mode on | left as they are |
| Supervisor tick (pid 18412) | finishing its jobs after the 12:11 AM inbox session | left alone |
| Inbox watcher, lane tick jobs, supervisor job (launchd) | running as designed | kept |
| An interactive session open for 2.6 days (pid 11422) | idle | left alone; not the company's worker |
| Shared folder | clean: the 11:43 PM close sweep committed everything left in it, the merge queue page and the throughput files included, without a gate pass | checked under phase 0 |
| Saved patches in scratch | T-3818, T-3907 (2), T-3962, T-3967, T-3971, T-3976, T-3978, T-3980 | see below |

</div>


## Proposals, as decided by the mandate

- **Closed 11-10 (dropped, deferred or duplicate):** T-3890 as a standing path, T-3907, T-3951, T-3957, T-3958, T-3962, T-3964, T-3965, T-3973, T-3980, T-3985, T-3987.
- **Kept and landed by this work:** T-3818, T-3972, T-3908, T-3974, T-3975, T-3905, T-3883, and the useful parts of T-3885, T-3901 and T-3979.
- **Changed or folded in:** T-3875 and T-3971 into the one limit (T-3993); T-3978 into one road with the same lander (T-3994); T-3955 into the one workflow record (T-3996); T-3963 with its session count fixed; T-3986 light only.
- **Deferred, patch not landed:** T-3967, T-3976.

## Phases


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Phases, scrolls sideways" style="--tw:718px" markdown="1">

| Phase | Board line | State |
|---|---|---|
| 0. Stabilize | T-3992 | in progress: inventory done, 12 lines closed, reds on main being fixed; T-3818 and T-3972 next |
| 1. Admission: one limit on unmerged work | T-3993 | in progress: count, record, limit, dispatcher and pool landed; the governor's part stopped by a guard (T-0848); wording and lane path in testing |
| 2. Quiet main, one road | T-3994 | not started |
| 3. One merge line | T-3995 | in progress: message hold removed and lands no longer need a session (landed); the rest not started |
| 4. One record, Home, This Session | T-3996 | in progress: the load recorder, the workflow record and the live-feed fix are being built in isolated copies |
| 5. Return to app work | T-3997 | in progress: the exit rule is live and recording (215 waiting at 1:35 AM; the 24-hour clock is not running) |

</div>


## Log of what landed

(newest last; each line: time, commit, what, the test that proves it)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Log of what landed, scrolls sideways" style="--tw:842px" markdown="1">

| Time (11-10) | Commit | What | Proof |
|---|---|---|---|
| 12:51 AM | 56d2ee153e | No Investor-message hold on merging; land-live runs with no session, taking the supervisor's lock for the merge alone | tests/personal_land_test.sh, 16 new rows, 2 mutants |
| 12:55 AM | cda1d3ca73 | The idle alarm leaves a land's lock alone | tests/idle_alarm_test.py, 2 new rows |
| 12:57 AM | a1a49d99db | The one count of unique tasks waiting to merge, its record, the limit of 12, the 20-for-24-hours exit rule (tools/merge_limit.py) | tests/merge_limit_test.py, 52 rows |
| 1:13 AM | 0314de4bd3 | Slot test fixture (two rows the first change turned red) | tests/personal_slots_test.sh, 32 pass |
| 1:16 AM | 01415bcbe9 | The dispatcher reads the one limit; a waiting branch lands before its lane takes any task; three older lines removed | dispatch_merge_mode_test.py, dispatch_own_first_test.py and 10 more suites in the gate |
| 1:18 AM | 2b4d5f6468 | The main session's pool follows the one limit (2 agents while new work waits); T-3875's three readings and four unused helpers removed | merge_capacity_test.py (rewritten), merge_limit_test.py 55 rows |

</div>


## What went wrong, and what it shows

- **The first change left suites red that the gate did not ask for.** tools/personal_land.sh is named by so many suites that the main gate maps only personal_land_test.sh to it. 56d2ee153e turned rows red in personal_slots_test.sh (2), personal_off_test.sh (18), personal_parked_test.sh (17) and site_lanes_test.py (the pinned lane rules). Found by running every suite that names the land tool; fixed with a way back (LAND_LIVE_ALWAYS=0, or the file ops/land_session_only) that those suites pin.
- **Older reds on main, found the same way:** personal_train_test.sh, 3 rows since T-3659 (11-08 12:47 PM; its fixture lacked tools/land_dupes.py); personal_land_product_test.sh, 2 rows (a mutant whose pattern T-3974 left matching nothing at 11:24 PM 11-09, and the Vendor links row). No routine run of all of tests/ exists, so a red in a suite the gate does not map stays unseen.
- **Code in the main folder is live before its gate ends.** The lane ticks run tools from the main folder's working files, so a candidate placed there for the gate was run by a tick 19 seconds later (the dispatcher change, 1:13 AM). It had passed its suites in the isolated copy first. The fix belongs to phase 2 (the gate checks a candidate that is not in the main folder).
- **The close sweep landed 841 lines of code with no gate pass** (0a7568c844, 11:43 PM 11-09: the merge queue page, the throughput tool and two tests, as "ops: work run"). Phase 2 removes that road.
- **One item stopped by a guard (T-0848), 1:11 AM:** the records guard refused a command that edited tests/governor_test.sh and tests/pacing_test.sh and ran them. The governor's part of "idle is fine" waits on those two files; asked on #41 (c6760458993).
{% endraw %}

</div>
