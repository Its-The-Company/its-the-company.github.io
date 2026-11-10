---
layout: "default"
title: "Live worker status (T-3979, then T-3980)"
section: "documents"
description: "On 11-09 the Operator learned only at hand-back that a worker had left uncommitted files in the main checkout (T-3908, T-3963), hit a refusal (T-3967), or was holding a long test run while load passed 60. Each of those\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/worker-status.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/worker-status.md</code></span></div><h1>Live worker status (T-3979, then T-3980)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Investor ask: an Investor #41 c6758090371 (10:25 PM 11-09). Tool: `tools/worker_status.py`; test: `tests/worker_status_test.py` (40 checks, red first).

## Why

On 11-09 the Operator learned only at hand-back that a worker had left uncommitted files in the main checkout (T-3908, T-3963), hit a refusal (T-3967), or was holding a long test run while load passed 60. Each of those was known to the worker minutes or hours earlier. The status file moves that knowledge to the moment it happens.

## Paragraph for every packet

Paste this into each task packet, with the task id filled in:

> **Status.** Post your status at each step, so the Operator sees it while you work: `python3 tools/worker_status.py set T-NNNN --worker <Name> --step "<what you are doing now>"`. At the start add `--files <paths you will edit>` and `--eta <minutes>`. Add `--tests running` before a test or gate run and `--tests idle` after it. If you are stuck or waiting, add `--blocked "<on what>"`; clear it with `--blocked ""`. Read what `set` prints: a NOTE is for you, from the Operator or another worker. If `set` exits 3 (STOP), stop at once: save your diff to scratch, report, and do nothing else. After a refusal or a "passed, not recorded" result, post it with `--blocked`. When you hand back, run `python3 tools/worker_status.py done T-NNNN` as your last step before the report.

## What the Operator runs

- `python3 tools/worker_status.py list`: one line per live worker: task, worker, minutes since last post, step, tests running or idle, eta (and "overdue"), number of files claimed, BLOCKED, STOP, the latest refusal for the task (ops/refusals.jsonl), and the latest gate problem (ops/metrics/main_gate.jsonl) since the status began.
- `list --stale 20`: workers quiet over 20 minutes.
- `list --conflicts`: paths claimed by two or more live tasks; check before a packet goes out.
- `list --json`: the same rows for the Home panel.
- `note T-NNNN "text"`: the worker's next `set` prints it once. `stop T-NNNN --why "text"`: its next `set` exits 3.
- `done` appends a row to `ops/runs/workers/done.jsonl` (a waiter can wake on it).

All files live in `ops/runs/workers/` and are git-ignored (its own `.gitignore`): live state, like `.dispatch-land.json`.

## Limits, measured or known

1. **"Passed, not recorded" is not in any record.** `tools/main_gate.py check` only prints it (lines 807 and 1146 on 11-09); it writes no row. What is recorded is the later commit refusal (`suite_refused` / `host_refused` with author and files, no task id). `list` matches those by worker name plus overlapping files. So the Operator sees it when the worker tries to commit, not at the check. Until then the packet paragraph asks the worker to post it with `--blocked`. Fix for whoever holds main_gate.py: write a `suite_unrecorded` row (task, files, suite) where it prints that line; `list` would read it with one added event name.
2. **Refusals show only once the refusal hook has recorded them** in ops/refusals.jsonl with a task id. Rows without a task id do not show.
3. Status is only as fresh as the worker's last `set`. `--stale` is the check on that.
4. Nothing is measured yet. Baseline to take before calling this an improvement (T-3980 item 6): over one night, the minutes from a worker's first refusal, dirty-main file, or unrecorded pass to the Operator knowing it. Today that equals time-to-hand-back.

## Next slice

- **(3) Leases.** `--files` is already the claim and `list --conflicts` already shows overlaps (tested). Left: `set` warns at once when a path it claims is held by another live task, and `list --conflicts` also lists paths dirty in the main checkout (`git status --porcelain`) with no live claim. That second list is the T-3908/T-3963 case. Stays useful until T-3978's per-worker copies make it moot.
- **(5) This Session on Home.** Read `worker_status.py list --json` and show one plain line per worker ("Odalys is running the tests for T-3979, 12 minutes in; blocked on nothing"). Show BLOCKED, STOP and REFUSED in words, and never show file paths or refusal text publicly (check what live_status.py already strips).
- **T-3980** builds on this file format: `worker_brief.py` reads the same status files and leases; its notes and stop use `note` / `stop` as built here.
{% endraw %}

</div>
