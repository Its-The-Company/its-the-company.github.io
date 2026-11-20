---
layout: "default"
title: "T-4781: retest a fixed red on what failed, not every test"
section: "documents"
description: "When a task&#x27;s last Xcode land check was red and the fix since is narrow, the next check runs only the red&#x27;s failing classes plus the classes of the files the fix touched. Before, it ran the whole PyWidgetTests unit\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4781-retest.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4781-retest.md</code></span></div><h1>T-4781: retest a fixed red on what failed, not every test</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-17. Investor an Investor #41 c6962666833, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 2026-11-17 5:19 PM (log/rulings.md).

## What changed

When a task's last Xcode land check was red and the fix since is narrow, the next check runs only the red's failing
classes plus the classes of the files the fix touched. Before, it ran the whole PyWidgetTests unit target again. The
rule is in `tools/land_retest.py` (its header has it in full). `tools/personal_land.sh` asks it once, just before the
Xcode step (`retest_plan`). `tools/land_xc.py check` takes the filters (`--only-testing`), within
`tools/runner_queue.py`'s filter limits (`filters`, now shared). The whole unit target still runs when:

- the fix touches shared code (the bridge, the runtime and Python, the core package, project.yml, build scripts,
  vendored code, any tools/ input such as xc.sh);
- the fix touches a file that no test class covers;
- main's app inputs (`tools/xc_inputs.py` key) changed since the task's last full run;
- the red named no failing test (a compile error, or a run cut short);
- the classes come to more than the runner's 20 filters.

With no red on the last try, the land runs as before. `LAND_RETEST=0` gives the old path. A narrowed pass is never
kept as a green for its tree or app key, so no other land reuses it. Main's own full run after the land still runs
the whole suite.

It reads only the records that already exist: `ops/metrics/land_xc.jsonl` (queued and result rows, matched by task
label) and the red job's `result.json` on macbook-results. There is no new record. A narrowed job's rows now carry
`only_testing`, so its effect can be counted.

## MacBook minutes per land, before and after

Method. Main checkout `ops/metrics/land_xc.jsonl`, 2026-11-05 2:57 PM to 11-17 17:27: 271 result rows, 263 with
seconds, 1862.3 MacBook minutes. 208 were green, 55 red, 8 could not run. A "land" here is a task with at least one
green land check: 174 tasks. That is a proxy, not a count of merges.

- **Before (measured): 10.70 MacBook min per land.** The personal_land.sh path (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> ids) used 844.0 min for 80
  tasks (10.55). The gate path (main_gate.py `m*`, merge_queue.py `g*`) used 1018 min for 101 tasks (10.08).
- **Retries after a red:** 41 rows (39 with seconds) used 277 min, 15% of all land minutes.
- **The rule replayed** (`land_retest.plan` on each retry, with the ledger as it stood when the retry was queued, on
  the main checkout's commits): 8 narrow, 28 full, 3 none (queued before the red came back). Reasons for full:
  19 main's app changed since the last full run, 7 the red named no failing test, 2 more than 20 classes.
- **Cost of a narrowed MacBook job (measured):** 68 xc-test jobs on macbook-results that ran under 400 tests took a
  median of 95 s (p90 226 s). The 443 full runs took a median of 420 s (p90 706 s).
- **After (estimate):** the 8 narrowed retries took 51.9 min as full runs. At 95 s each they would take 12.7 min.
  That is 39.2 min saved (2.1%), or **10.48 min per land** (10.58 if each took the p90).

**The honest part.** 7 of the 8 narrowable retries were gate lands (ids m, m2, m3). The gate is main_gate.py, and
this change does not wire it. On the path wired today (personal_land.sh), 1 of the 8 qualifies (T-2318, 300 s run
whose estimate is 95 s). That moves 10.55 to an estimated **10.51 min per land**, a 0.4% drop. Since 11-12, most
lands go through the gate.

## What's open

1. Wire the gate. Have main_gate.py's xc step ask `land_retest.py plan` and pass `--only-testing` to
   `land_xc.py check`, which already takes it. That is where 7 of the 8 were. This is a board line for Ines to
   place.
2. The freshness rule (main's app changed since the last full run) blocks 19 of the 28 full retries. It is the
   Investor's rule as given. Loosening it is not this task's call.
3. The quality number beside the cost (Ines's condition): count narrowed passes whose land was followed by a red
   main run. The data is the `only_testing` rows in land_xc.jsonl plus tools/runner_watch.py. It needs a week of
   rows. Today's count is 0, because nothing has run narrowed yet.
4. The minutes above are an estimate from a replay. The real figure comes from `only_testing` result rows once
   lands run.

## MacBook minutes per land after T-4792 (gate retests)

Odalys, 2026-11-19, T-4995. Same method and same proxy as above, on the main checkout's `ops/metrics/land_xc.jsonl`
(read 10:15 PM 11-19), from fbf1569bf2 (T-4792, on main 2026-11-18 11:18:35 PM, main's reflog) to the ledger's last row
(9:51 PM 11-19). **That is 22.5 hours, under the 24 asked for**, and a small sample. The check of the method: the same
script on 11-05 2:57 PM to 11-17 5:27 PM gives 271 results, 1862.3 min, 174 lands, 10.70, 844.0 and 1018 min as above.

- **After T-4792 (measured): 9.92 MacBook min per land** (10.70 before, 10.48 the replay's estimate). 11 result rows
  (11:39 PM 11-18 to 3:36 PM 11-19), all with seconds, 89.3 min; 10 green, 1 red, 0 could not run; 9 lands. Lane path
  5 checks, 41.7 min, 5 tasks (8.33); gate path 6 checks, 47.6 min, 4 tasks (11.90). Three lane jobs queued at
  9:05-9:08 PM (b2, b44, b56) had no result yet and are not counted.
- **Gate retries narrowed: 0.** One retry after a red in the window, a gate land: T-5047, red
  J-20261119-0909-land-m-417d66 (code 65, 457.4 s), then J-20261119-0931-land-m-236405, green, 454.3 s, whole unit
  target (its queued row has no `only_testing`; no row in land_xc.jsonl or main_gate.jsonl has one in the window).
  The rule replayed with the ledger as it stood at 9:31 AM (head 0c80ca5275, main 8f05c2b061) answers full: "no test
  class covers pywidget/docs/how-it-works/script-to-home-screen.md". It would be full without that file too:
  pywidget/ios/Widget/DebugDrawRecord.swift has no test class, and the other files reach far more than 20 classes.
  So the gate asked the right question and the right answer was the whole target.
- **Narrowed passes later found red by main's full run: none**, because there was no narrowed pass to check.
- **Why the figure fell anyway.** Retries were 1 of 11 checks (7.6 min, 8% of land minutes; 15% before), and there
  were 1.22 checks per land (1.56 before). Each check took longer, not shorter: median 458 s (414 s before). The fall is fewer
  reds, not T-4792, and 9 lands is too few to call it a trend.

Plain: In the 22.5 hours after the gate started retesting only what failed, the MacBook spent 9.92 minutes of tests
per finished land, down from 10.70. The new rule did not cause that: only one land needed a second try, and its fix
touched files no narrow test covers, so it rightly ran every test again. Nothing ran narrowed, so nothing narrowed
slipped a red past main. The real test of T-4792 needs more retries than one day gave.
{% endraw %}

</div>
