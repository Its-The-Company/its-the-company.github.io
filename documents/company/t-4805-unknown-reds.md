---
layout: "default"
title: "T-4805: a cause for every failed merge (first slice)"
section: "documents"
description: "Odalys, 11-18 7:15 PM ET. Answers an Investor on #41 c6965124089 (7:26 PM 11-17: &quot;Investigate all issues that failed due to an unknown reason \u2013 ensure that reasons are always captured, and resolve the root causes&quot;)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4805-unknown-reds.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/T-4805-unknown-reds.md</code></span></div><h1>T-4805: a cause for every failed merge (first slice)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 11-18 7:15 PM ET. Answers an Investor on #41 c6965124089 (7:26 PM 11-17: "Investigate all issues that failed due to an unknown reason – ensure that reasons are always captured, and resolve the root causes"). Starts from ops/plans/T-4787-red-causes.md: 134 red lands 11-10 to 11-17, 48 with no known cause (28 gate, 13 MacBook Xcode, 7 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>).

## What this slice changes

The lane lander (tools/personal_land.sh) now writes a cause, the failing check and the kept log on the last row of every held land in ops/runs/land_steps.jsonl. Before, that row said only "held".


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What this slice changes, scrolls sideways" style="--tw:404px" markdown="1">

| cause | when |
|---|---|
| conflict | the rebase onto main conflicted or stopped |
| time-out | exit 124 or 143, or a time limit |
| runner | the MacBook job or its runner |
| leftover | a test's process outlived the tests |
| red | a check failed; whether the test or the change is to blame is settled later (land_fix's comparison with main, tools/test_health.py) |
| rule | a land rule refused it (owned path, link, marker, worktree, push) |
| unknown | none of these; the tick log then says "held with no known cause, a fault of the lander (T-4805)" |

</div>


The check is every suite the kept log calls red (tests/run.sh's Red: line and the host's FAIL, TIMEOUT, EMPTY, MISSING lines), or the step (rebase, host, xc, push) when the log names none. Tests: four rows in tests/personal_land_test.sh part 7.

## The 7 lane unknowns, read again

T-4787 put 5 of the 7 lane unknowns down as "no rows kept". That was my mistake: 4 of them had kept logs under ops/runs/personal-land-<lane>-<time>.log, which I did not open.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The 7 lane unknowns, read again, scrolls sideways" data-n="1 3" style="--tw:1200px" markdown="1">

| T-4787 # | when | lane | kept log | what it shows | cause now |
|---|---|---|---|---|---|
| 1 | 11-10 12:46 AM | b52 | none for that time (b52's kept logs are from 11-08 and 11-09) | nothing | unknown (no log) |
| 13 | 11-10 5:06 AM | a2 | personal-land-a2-20261110-050639.log | bridge test_stop_still_reaches_atexit: ('interrupted', None) != ('exit', 3) | red (test or code not settled) |
| 14 | 11-10 5:23 AM | b3 | personal-land-b3-20261110-052315.log | xc_route_test.py "the real project's run paths stay bounded" | red (test or code not settled) |
| 41 | 11-12 7:36 AM | b40 | personal-land-b40-20261112-073612.log | personal_off_test.sh "launchd's stop reaches the session through the tick" (T-4787 named these rows already) | red (test or code not settled) |
| 105 | 11-16 5:09 PM | a44 | not opened in this slice | rows about SSD sizes (named in T-4787) | red (test or code not settled) |
| 108 | 11-16 9:01 PM | a45 | personal-land-a45-20261116-210144.log | lane_landcheck_test.py, 4 errors in 501.8 s; the same suite on main passed in 108.7 s | probably load (4.6 times main's time); the error rows are not kept |
| 126 | 11-17 11:18 AM | a2 | personal-land-a2-20261117-111805.log | site_test.sh "T-4240: App is a main page ... the seven diagrams" | bad test (the same row as T-4787 #120-124, fixed in the test by T-4756) |

</div>


So of the 7 lane unknowns, 1 moves to bad test (#126), 1 is probably load (#108), 1 stays unknown with no log (#1), and 4 are a red check whose side (test or code) the records still do not settle; 2 of those 4 (#13, #14) had no failing check named before.

## Still owed (not in this slice)

- The 28 gate unknowns: the gate's red record (tools/main_gate.py, a hub tool and not this line's target) keeps no failed row for the pywidget:* host suites and some others. It needs the same cause, check and log fields; a follow-up line.
- The 13 MacBook Xcode unknowns: each failed job's result.json names the tests; whether the fix was the test or the code needs the red and green trees compared file by file, which T-4787 could not do.
- tools/merge_queue.py's red rows: not changed in this slice.
- The recount by cause and the post on #325 wait for the gate's slice; no new counts are posted from this slice alone.
{% endraw %}

</div>
