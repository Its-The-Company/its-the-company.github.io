---
layout: "default"
title: "T-4774: what one refresh tap costs the app"
section: "documents"
description: "From Pernille&#x27;s M2 in her review of T-4181 at bd131735 (T-4612): on iOS 26 and 27 every widget refresh tap is a background launch of the app, then a Python start and the script, and nobody had the figure. These are\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4774-tap-cost.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/T-4774-tap-cost.md</code></span></div><h1>T-4774: what one refresh tap costs the app</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
From Pernille's M2 in her review of T-4181 at bd131735 (T-4612): on iOS 26 and 27 every widget refresh tap is a
background launch of the app, then a Python start and the script, and nobody had the figure. These are Simulator
figures, measured on 2026-11-17 between 5:33 PM and 6:12 PM ET. The phone's figure is still owed (below).

## The figures

A Debug build, one own widget placed small: `pywidget_ui`, one Text and the refresh button (the script itself runs in
19-25 ms cold and 2-6 ms warm, by its run row's `duration_ms`). **Cold** means the app was not running when the tap
came (the test had ended it). **Warm** means the app was still in the background from the tap before, called 5.6-9.2 s earlier.
MiB = 2^20 bytes. Median, with the range in brackets.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The figures, scrolls sideways" data-n="2" style="--tw:736px" markdown="1">

| Runtime (Simulator) | Taps | Tap to row | App start to row | App peak footprint |
|---|---|---|---|---|
| iOS 27.0, iPhone 17e, cold | 4 | 3406 ms (3114-3560) | 3029 ms (2746-3104) | 34.2 MiB (34.1-34.7) |
| iOS 27.0, iPhone 17e, warm | 8 | 426 ms (379-488) | (no launch) | 33.3 MiB (33.1-33.8) |
| iOS 26.0, iPhone 16e, cold | 8 | 1265 ms (1214-2273) | 923 ms (880-1930) | 48.5 MiB (45.2-50.8) |
| iOS 26.0, iPhone 16e, warm | 15 | 385 ms (328-436) | (no launch) | 47.8 MiB (44.6-50.2) |

</div>


In short, the peak footprint per tap: cold 34.2 MiB on 27.0 and 48.5 MiB on 26.0; warm 33.3 MiB on 27.0 and 47.8 MiB
on 26.0. A warm tap raises the app's footprint by at most 0.1 MiB on 27.0 and 3.9 MiB on 26.0 over what it held just
before the tap. The warm peak is mostly what the app already holds from its cold tap.

- **Every one of the 35 timed taps ran in the app** (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> `app`, trigger `intent`, outcome `ok`, exactly one row per
  tap), never in the widget, and the widget's token changed each time. After a tap the app stays in the background
  holding 33.0-33.8 MiB (27.0) or 41.1-50.0 MiB (26.0). It was still there at every warm tap, 5.6-9.2 s after the tap before.
- **One tap of 24 on iOS 26.0 did nothing**: the first tap of run 1 (the first after the widget was placed and the app
  ended) wrote no row in 40 s and did not start the app. The next tap, meant to be warm, launched it cold and is
  counted as cold above (the 2273 ms and 1930 ms maxima). Run 2 on 26.0 and both runs on 27.0 had no dropped tap. It
  happened once and the cause is not known.
- **27.0 takes about 2 s longer than 26.0 to start the app**, with the same script time. Not explained: the two
  Simulators are different models (17e is not offered on 26.0), and nothing here splits the launch into its parts.
- The run row's own `peak_mb` (the app's lifetime peak at the end of the run, rounded) reads 31-33 on 27.0 and 41-47 on
  26.0 for the cold taps. That is 2-4 MiB under the process's peak read from outside, because the app goes on using
  memory after the row is written. On a phone, `peak_mb` is a lower bound.

## How it was measured

Nothing in the app was changed. `pywidget/ios/scripts/tap_cost.sh` makes a private Simulator, runs
`UITests/TapCostTests.swift` (`WidgetKitCheckTests/testTTapCostInTheApp`) through `tools/xc.sh`, and beside it
`scripts/tap_cost_poll.py`. That reads the app's `proc_pid_rusage` from the Mac every 10 ms (on the Simulator the app
is a Mac process).

- The test places the widget, opens the app once (its launch pass writes the first tree), then runs 4 rounds: end
  the app, one tap (cold), then two more taps (warm), each about 4.8 s after the row of the tap before. It waits for the tap's row in `log/widgets/<id>/runs.jsonl`.
- **Tap to row**: the row file's modification time minus the moment the test called `tap()`. XCUITest's `tap()`
  takes 0.49-0.63 s to return, and the event reaches the Home Screen somewhere inside that time. So this figure is an
  upper bound on what a person waits.
- **App start to row** (cold only): the same row time minus the app process's start time from the kernel. It is a
  lower bound: it leaves out the system's part between the tap and the launch (about 0.31-0.46 s after `tap()` was
  called).
- **Peak footprint**: cold, `ri_lifetime_max_phys_footprint` of the new process at the next tap (launch, run and the
  seconds after). Warm: `ri_interval_max_phys_footprint` after the poller reset the interval
  (`proc_reset_footprint_interval`) just before the tap, so the peak covers that tap alone.
- Debug build, not Release, on the Simulator, with a Mac's memory. These are not phone figures.

## Run logs

Kept in `/Volumes/SANDISK SSD/company-scratch/T-4774-idris/` (the scratch folder). Each run folder holds `taps.jsonl`
(the test's lines), `poll.jsonl` (the host samples), `summary.txt` and `xc.txt`. The full xcodebuild logs are copied
beside them from `ops/runs/`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Run logs, scrolls sideways" style="--tw:917px" markdown="1">

| Run | Folder | xcodebuild log | Used |
|---|---|---|---|
| iOS 27.0 run 1 | `ios27-run1/` | `xcodebuild-20261117-173315.log` | Timing only (cold 3530-4014 ms, warm 403-508 ms). The poller missed 3 of 4 launches because it judged a pid before it exec'd into the app (fixed). Not in the table. |
| iOS 27.0 run 2 | `ios27-run2/` | `xcodebuild-20261117-174340.log` | The 27.0 rows |
| iOS 26.0 run 1 | `ios26-run1/` | `xcodebuild-20261117-174948.log` | The 26.0 rows. The test failed on the dropped tap (11 of 12 taps wrote a row). |
| iOS 26.0 install failure | `ios26-failed-install/` | `xcodebuild-20261117-180053.log` | Nothing ran: xc.sh's pre-install xcodebuild was killed (signal 9) and the app never installed |
| iOS 26.0 run 2 | `ios26-run2/` | `xcodebuild-20261117-180310.log` | The 26.0 rows |

</div>


Small copies in git: `pywidget/ios/bench/t4774-tap-cost/` (each kept run's `taps.jsonl` and `summary.txt`).

## The phone's figure

Owed in the gate build's session: [`pywidget/docs/decisions/gate-session-build.md`](../pywidget/gate-session-build.html), "How <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3 get their numbers in
the gate build", item "A refresh tap's cost in the app". That needs the Apple membership and a phone, as every gate
measurement does.

## Open

- The phone figure (above).
- Why 27.0 starts the app about 2 s slower than 26.0. A Simulator log of one cold tap, read for where the 3 s go,
  would answer it.
- The dropped first tap on 26.0: seen once, not reproduced.
- iOS 18: no runtime on the Mac mini (Xcode 27.1 offers none), so it is unmeasured.
{% endraw %}

</div>
