---
layout: "default"
title: "Bottleneck watch (T-4817)"
section: "documents"
description: "Odalys, 11-17 ET. Investor an Investor #41 c6967047801 (9:20 PM: &quot;whenever the merge queue gets big or another bottleneck prevents productivity, a task should be automatically created that seeks for a &quot;big picture&quot;\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/bottleneck-watch.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/bottleneck-watch.md</code></span></div><h1>Bottleneck watch (T-4817)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 11-17 ET. Investor an Investor #41 c6967047801 (9:20 PM: "whenever the merge queue gets big or another bottleneck prevents productivity, a task should be automatically created that seeks for a "big picture" fix") and c6967619284 (9:55 PM: limits "calculated dynamically ... without creating unnecessary tasks for workflows that are already perfectly optimized", industry-standard methods, every signal on the Flow panel).

## What it does

`tools/bottleneck_watch.py check` (no Claude, stdlib) reads each signal in `ops/bottleneck_lines.json` from a record already kept, sets its limit from that signal's own history, and when the signal is past its limit for its `run` of buckets adds one P0 `[tools]` line through `tools/board_tick.py add --by tools/bottleneck_watch.py`: titled for the problem, with the value, the limit and its method, the trend and the records, asking for a root-cause fix. It puts the line on `ops/merge_first.txt` (merge-first) and, being `[tools]`, it counts in the process and site merge queue (`tools/merge_limit.py`). One open line per signal (state, plus a `bottleneck=<id>` tag on the line, so a lost state never duplicates). The limit is frozen when the line opens; the watcher ticks the line once every bucket of the last 24 hours is back within it. If a worker ticks the line and the signal is still past, a new line opens after 24 more hours past.

Records: `ops/metrics/bottleneck.jsonl` (one row of every signal's value, limit and line at most every 10 minutes, and one row per open and close); state in `.git/company-jobs/bottleneck_watch.json`. `status [--json]` prints every signal now. The Flow panel (T-4818) reads the config and the record.

## Methods

- **xmr**: individuals chart. Centre = mean of the baseline buckets, mRbar = mean moving range, limit = centre ± 2.66 mRbar (Wheeler's natural process limits). A `cap` (up) or `floor` (down) names a rule already in force (the merge limits, the pool's load line, the disk gate's resume line); the tighter bound wins, so a process that is steadily bad still opens a line. While the chart has under 8 baseline buckets, the rule in force alone is the limit; with no rule, nothing opens.
- **c_chart**: counts of rare events per day (Poisson): c̄ + 3√c̄, never under `min_limit` (1).
- **p_chart**: a share of trials per day: p̄ + 3√(p̄(1−p̄)/n) with n today's trials; no reading under `min_n` (5).
- **fixed**: a theory line; used once, for utilisation (Kingman: waits grow as u/(1−u), so past 0.85 they explode).
- Baseline: the 14 days or 168 hours before the current run. Run: day signals 1 bucket (a rolling 24 h), hour signals 2 (load and queues) or 3 (runner busy), so one noisy hour is never a task.

## Signals


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Signals, scrolls sideways" style="--tw:1101px" markdown="1">

| id | signal | limit method | record (written as it happens) |
|---|---|---|---|
| `waiting_app` | app tasks waiting to merge, hourly mean | xmr, <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> = merge limit app (20) | ops/metrics/waiting.jsonl `app` (tools/merge_limit.py sample) |
| `waiting_other` | process and site tasks waiting to merge | xmr, cap = merge limit other (8) | ops/metrics/waiting.jsonl `other` |
| `waiting_hub` | gate and scheduler changes waiting | xmr, cap = hub limit (1) | ops/metrics/waiting.jsonl `hub` |
| `finish_to_merge` | median minutes finished → merged, 24 h (DORA lead time) | xmr, cap 1440 (DORA high bound) | ops/metrics/flow.jsonl `waiting_to_merge` → `merged` |
| `merges_per_day` | task tries merged in 24 h (DORA deployment frequency) | xmr, lower limit | ops/metrics/flow.jsonl `merged` |
| `littles_wait` | Little's law W = L/λ: waiting tasks ÷ merges per hour (trailing 24 h), hours | xmr | ops/metrics/waiting.jsonl `n` + ops/metrics/flow.jsonl |
| `change_failure_rate` | red gate verdicts ÷ verdicts, 24 h (DORA) | p_chart | ops/metrics/main_gate.jsonl `red` / `passed` |
| `red_unknown_share` | gate suite reds whose row records no cause | p_chart | ops/metrics/main_gate.jsonl `suite_red` |
| `gate_timeouts` | gate suites that ran out of time, 24 h | c_chart | ops/metrics/main_gate.jsonl `suite_red` "timed out after" |
| `runner_queue_wait` | MacBook job wait queued → started, p90 minutes | xmr | ops/metrics/land_xc.jsonl `result` created/started |
| `xcode_lock_wait` | Mac mini Xcode lock wait, p90 minutes | xmr | ops/metrics/xc.jsonl `wait_s` |
| `runner_busy` | share of readings with the MacBook runner busy, hourly | fixed 0.85 (Kingman) | ops/metrics/machine.jsonl `runner.status` |
| `mini_load` | Mac mini load per core, hourly mean | xmr, cap = load line (10) | ops/metrics/machine.jsonl `load_per_core` |
| `mini_disk_free` | free GB on the internal disk, hourly mean | xmr lower, floor = disk gate resume (20) | ops/metrics/machine.jsonl `disk_free_gb` |
| `refusals` | gate refusals and workers' recorded refusals, 24 h | c_chart | ops/metrics/main_gate.jsonl, log/events.jsonl |

</div>


First read on real records, 11-17 10:5x PM ET (`status`): every signal within its limit except free disk (15.6 GB, two hours under the 20 GB resume line) and the process queue (10.7 waiting against 8, first hour of its per-queue history). Merge queue per-queue counts began at T-4814 tonight, so those three charts run on the rule in force until they have 8 hours.

## Not yet written as it happens (follow-up lines)

- **Idle <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> with work waiting.** Only text in ops/runs/dispatch.log; no row per tick of slots free and runnable tasks. Needs a row at its source (tools/dispatch.py, a hub file).
- **Failed lands by cause at the source.** The gate writes the failing rows but no cause field (bad test, broken code, time-out, runner, unknown, as in ops/plans/T-4787-red-causes.md); `red_unknown_share` reads the rows as written. A `cause` field belongs in tools/main_gate.py, which T-4806 is changing now.
- **Supervisor tick hook.** `check` is not yet run each tick: tools/supervisor.sh is a hub file and its suite has to run green beside the land; a separate line does it.
{% endraw %}

</div>
