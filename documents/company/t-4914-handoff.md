---
layout: "default"
title: "T-4914 handoff: review of T-4907 (605597400d, Odalys), paused for #325 c7073921673"
section: "documents"
description: "git show 605597400d (tools/main_gate.py, tools/main_green.py, tests/main_green_test.py)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4914-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/T-4914-handoff.md</code></span></div><h1>T-4914 handoff: review of T-4907 (605597400d, Odalys), paused for #325 c7073921673</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-21 11:05 PM ET. Paused on the coordinator's word after an Investor's pause of standard-flow work
(an Investor #325 c7073921673). The review file pywidget/docs/reviews/t4907-pernille.md is **not written**, no fix
lines are filed, and T-4914 is **not ticked**. The findings below are what the next reader needs to finish.

## What I read

- `git show 605597400d` (tools/main_gate.py, tools/main_green.py, tests/main_green_test.py).
- Later changes on personal/a2 (f48ccc74bd): main_gate.py moved and grew (721 lines changed by other tasks), but
  `code_reads`, `suite_map`, `reached_suites` and `wanted_suites` are unchanged in substance (now main_gate.py
  1218-1318). main_green.py changed in one place only: T-4994 `joined_to()` after the add in `lands()` (line ~742).
- tests/run.sh's output (report lines print only after all suites end; RUN_PROGRESS writes one line per suite as it
  ends, run.sh:110-114, 218-221).

## Runs (host only, no Xcode)

- `python3 tests/main_green_test.py`: 33 tests, OK (183 s).
- Scratch scripts in `/Volumes/SANDISK SSD/company-scratch/T-4914-pernille/bin/` (replay.py, timeout_repro.py,
  flake_repro.py), run with `python3 -I  [local folder]`.

## Findings so far

1. **A time-out drops the results of suites that finished (confirmed; Odalys's own account is right).**
   main_green.py:698 returns on exit 124 before any owed suite is cleared or any red read; suite_on_main
   (main_green.py:575) does not set RUN_PROGRESS, and real run.sh in parallel mode prints no per-suite result until
   every suite ends, so a killed run's log holds nothing to keep. Repro (timeout_repro.py): app_test.sh passes, a
   300 s suite is cut at MAIN_GREEN_LAND_SECONDS=130; after the run `owed` is still
   `['app_test.sh', 'zslow_test.sh']`. Consequence: the same oldest 60 owed suites (sorted oldest first) are retried
   whole each run; if they take longer than `left` (main_green.py:684, at most 900 s, less after a long host check),
   nothing is ever cleared and no new red is ever named, and a red that finished before the cut is lost too.
   Fix to propose: pass RUN_PROGRESS to the lands run, keep each finished suite's pass or red, owe only the unrun.
   Severity: high (the after-land check can stall silently).

2. **A red already on main can be blamed on the land when it passes once at the good end (confirmed).**
   run_bisect checks the good end once (main_green.py:422-425); the lands' good end is the owed start
   (main_green.py:719), not a main the suite was seen passing on. Repro (flake_repro.py): a suite red on main from
   before the land, green only on its 3rd run; one harmless land (T-5554) is named: "NEW RED (P0 on T-5554):
   old_test.sh; first bad commit 6887f96f2 ... over 1 commits", a P0 line reserved. A deterministic old red is
   correctly not blamed (test_t4907_a_red_already_on_main_before_the_land_is_not_blamed_on_it passes). Fix to
   propose: check the good end twice (or the named commit red twice and its parent green twice) before a P0 line,
   or consult the known-red / flake record first. Severity: medium (a wrong P0 on an innocent author).

3. **The 4.6% is suite-seconds, not land wall time, and its replay is not in the repo.** No replay script or
   plan holds 614.6 -> 642.9 (searched ops/plans, tools, Odalys's memory: only her archive note). My replay
   (replay.py, the current floor, medians of ops/runs/test-runs.jsonl suite_s) over 261 first-parent main commits
   2026-11-11 12:00 AM..2026-11-18 4:12 PM touching tools/, tests/, site/: 696.1 -> 705.1 suite-s a land (+9.0, +1.3%),
   13 commits run more suites (matches her 13; 12 of them add personal_lane_test.py and personal_off_test.sh).
   186 suites had no timing (17.7 s median used), personal_lane_test.py among them, so her higher figure is plausible
   and mine is not a refutation. Wall-time note: run.sh runs every .sh suite in one serial <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (run.sh `( for n in
   $SH ...)`), so personal_off_test.sh (median 194.4 s, 1 sample) can add up to its whole length to those 12 lands'
   wall time. Also: suite_keys (main_gate.py:1325) now uses the deep map, so pass rows written before T-4907 stopped
   matching once (a one-off rerun cost not in the replay). Fix to propose: commit the replay as a tool and state the
   cost as suite-seconds with the window. Severity: low.

4. **Docstring disagrees with the code.** main_gate.py:1255 says the after-land reach is "within 48"; POST_MAX is 32
   (main_gate.py:1218, and the commit message says 32). Severity: low.

5. **No test covers the time-out path or a flaky good end** in tests/main_green_test.py (the T-4907 tests are
   lines 562-698). Both repro scripts above can be turned into red-first tests for findings 1 and 2.

## What is left

- Write pywidget/docs/reviews/t4907-pernille.md (style of t5000-45c94d08-pernille.md) with a "Verdict" section;
  my leaning: FAIL until finding 1 is fixed, finding 2 fixed or accepted on record.
- File fix lines (owner Odalys, from T-4914, naming the review file) for findings 1-4 with
  `python3 tools/board_tick.py id --reserve` and `add`; tick T-4914; commit with the outbox files.
- Not checked yet: whether held_passes (main_green.py ~598-616) can hold a pass whose key misses a deep-reached
  file; whether the host check's and the lands' board lines can both name one red.
{% endraw %}

</div>
