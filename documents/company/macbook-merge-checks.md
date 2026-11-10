---
layout: "default"
title: "Merge checks on the MacBook (T-3907, slice 1 design)"
section: "documents"
description: "Baseline (ops/metrics/main_gate.jsonl, pywidget host runs on the mini, 11-09 00:49-19:04, n=13): median 306 s, p90 1,241 s. The mini was loaded through those runs. Expected on the MacBook at quiet speed: about half\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/macbook-merge-checks.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/macbook-merge-checks.md</code></span></div><h1>Merge checks on the MacBook (T-3907, slice 1 design)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Source: Investor an Investor, #251 c6755404626 (11-09 7:34 PM, "Move forward with B and C ... Start
working on the ability to merge work using the macbook immediately"); the Operator's design reply c6755425492; Wrenna's
Option A, ops/plans/merge-compute-options.md section 2. Status 11-09 7:5x PM: design on main; runner patch green in scratch (not landed).

## What moves, what stays

- **Stays on the Mac mini:** every git step. Rebase, the merge decision, the commit, the push, the suite keys and the
  `suite_pass` / `suite_red` rows in ops/metrics/main_gate.jsonl. The MacBook only runs tests and posts a result.
- **Moves to the MacBook (slice 1):** the app's Python host suites, `pywidget/tests/run_host.py --both <suites>`,
  sent by `tools/main_gate.py check`. These are the "pywidget:<suite>" rows.
- **Moves later (slice 2):** the `tests/` suites (`tests/run.sh <suites>`), after one trial job shows they run in the
  sandbox (see "Sandbox fit"). Then `tools/personal_land.sh` and `tools/park_batch.py` call the same route.
- **Never moves:** browser suites that need Chromium, until Chromium is a pinned, checksummed `fetch` step.

## The new job kind

Kind `host`, two commands in `tools/macbook-runner/kinds.json` (one approval covers both):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The new job kind, scrolls sideways" style="--tw:735px" markdown="1">

| command | cwd | argv | limit |
|---|---|---|---|
| `host-py` | repo root | `/usr/bin/python3 -I pywidget/tests/run_host.py --both <suites>` | 1800 s (main_gate HOST_RUN_S) |
| `host-tests` | repo root | `/bin/bash tests/run.sh <suites>` | 3600 s (main_gate SUITE_RUN_S) |

</div>


- A job may carry `suites`: 1 to 80 names, each `[A-Za-z0-9_][A-Za-z0-9_.-]*` with up to 3 `/` parts (no leading
  `-`, so no flag can be smuggled in, and no `..` part). The runner appends them to argv only for a command that says
  `"suites_at_end": true`, the way `only_testing` works for xc-test (T-1846). No free argv.
- A `pre` step makes `{JOB}/home`; `env` sets `HOME={JOB}/home`. TMPDIR is already `{JOB}/tmp/`.
- The result gets a `suites` block read from the output: per-suite verdict for `run_host` (PASS, FAIL, TIMEOUT,
  EMPTY, XCODE), the `MISSING python ...` lines, or for `run.sh` its last line (all passed, or the red list).
- No `{SIM}`: a host job boots no Simulator and takes no Xcode lock, so it can run beside xc jobs.

## Sandbox fit


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Sandbox fit, scrolls sideways" style="--tw:790px" markdown="1">

| constraint | what it means | slice 1 answer |
|---|---|---|
| no network | a test that reaches out fails | host suites are offline today; a failure here is red on the MacBook and goes to the mini only if the mini passes it (see risks) |
| no `/tmp` | `mktemp` in /tmp is denied | TMPDIR is the job's own folder; run.sh already prefers `$TMPDIR`; a test hard-coding `/tmp` will show up in the trial job |
| HOME closed | the runner account's home is denied | HOME=`{JOB}/home` |
| not a git checkout | the job folder is a `git archive` copy, no `.git` | run_host.py needs none; `tests/run.sh` suites that call git on the repo itself may need one: trial first (slice 2) |
| Chromium | 42 browser tests | stay on the mini |
| same Python | `--both` uses `/usr/bin/python3` (3.9) and Homebrew `python@3.13` | if 3.13 is missing on the MacBook, run_host prints `MISSING`; main_gate treats that as "the runner can't" and runs on the mini, never as red |

</div>


## Expected check time

Baseline (ops/metrics/main_gate.jsonl, pywidget host runs on the mini, 11-09 12:49 AM-7:04 PM, n=13): median 306 s,
p90 1,241 s. The mini was loaded through those runs. Expected on the MacBook at quiet speed: about half
(Wrenna's 2x, her estimate, not measured), so about 150 s median. That is a guess; the first ten jobs give the number.
The real cost is the queue wait: today a runner poll that is running Xcode jobs holds its lock until they finish (an
xc-test batch can take up to 90 min), so a host job queued behind it waits. Slice 1 therefore waits at most
`HOST_REMOTE_WAIT_S` (proposed 600 s) for a result and then runs the suites on the mini as today.

## The fallback

`main_gate check` sends host suites to the MacBook only when all hold: the switch is on, the runner's last check-in is
under 2 h old, its `runner_version` is 28 or later, and its `approved_kinds` list `host`. Otherwise, and whenever the
job is refused, errors, times out, reports a MISSING interpreter, or has no result in the wait, the suites run on the
mini exactly as now (`run_host`). A job given up on has its `land/h...` ref deleted so it never runs stale. Red from the
MacBook is red: no second run on the mini to overturn it.

## The switch

`MAIN_GATE_HOST_REMOTE` in tools/main_gate.py, default `off`. It stays off until the Investors approve kind `host`. We
turn it on in a one-line commit after the approval and one green trial job, and turn it off the same way.

## Update 11-09 7:4x PM: no Investor step (standing <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>)

an Investor, #251 c6755547646, 7:43 PM (log/rulings.md): "I auto-approve any job that is suggested. Consider this a
standing rule". So kind `host` needs no `approve-kind`. Next step: add `host` to runner.py `SEEDED_KINDS` (as runner 18
did for `build`, T-1847), so the runner switches it on itself once, logs `kinds-seeded`, and the check-in lists it in
`approved_kinds`; every such switch is named in the next report. `unapprove-kind host` stays the Investors' off switch.
The section below is kept as written before the ruling; it applies only if the ruling is withdrawn.

## What the Investors do, once (superseded by the ruling above)

When runner 28 reaches the MacBook (it updates itself; nothing to install), the runner keeps its old command list and
opens a GitHub issue "MacBook runner: approve job kind host". Approve it one of two ways:

- reply "approve" on that issue (the runner applies it on its next poll), or
- in the runner account on the MacBook, in Terminal:
  `python3 ~/itsthecompany-runner/bin/runner.py approve-kind host`

What it allows: the MacBook may run the company's Python and website tests, in the same sandbox as the Xcode tests
(no network, no access to your files). To take it back: `unapprove-kind host`. If `brew list python@3.13` says it is
not installed in the runner's Homebrew, the host suites stay on the mini until it is (`brew install python@3.13`,
free); we will say so in the report if the first job shows MISSING. We tell the Investors in the report when runner
28 is on main, and the runner's issue appears within one poll of the update.

## Risks

1. **Fragile machine carries more.** The runner was silent about 23 h this week and failed 20 of 34 jobs on 11-05
   (ops/metrics/runner_health.jsonl). Mitigation: the mini fallback above; nothing waits on the MacBook longer than
   the wait limit.
2. **Queue behind Xcode.** One poll runs its jobs to the end under one lock. Slice 2: run host jobs in their own
   <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> beside xc jobs (they use no Simulator).
3. **Different results on two machines.** A test that passes on the mini and fails on the MacBook (network, /tmp,
   git) blocks a merge. The trial job before the switch goes on finds these; each one is fixed in the test.
4. **Self-update.** Runner 28 changes runner.py; a failed self-test rolls back by itself and that version is not
   tried again. Tests are red first and green before VERSION rises.
5. **Load on the laptop.** Wrenna's estimate is 12 to 16 h a day of checks if all of them move. Slice 1 moves only
   the host suites; the runner's own memory and Simulator holds still apply.

## Slices

1. This note; kind `host` and runner support with tests red first; main_gate route behind the switch (off).
2. Trial job by hand; `host-tests` route; personal_land.sh and park_batch.py use the same route; host lane beside xc.
3. Switch on after the approval; measure a week: lands per hour, mini load, check seconds, fallback count.
{% endraw %}

</div>
