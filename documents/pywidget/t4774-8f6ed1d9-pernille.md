---
layout: "default"
title: "Review of 8f6ed1d9: T-4774, what one widget refresh tap costs the app"
section: "documents"
description: "The method is sound where it matters most. The peaks are the kernel&#x27;s own maxima (ri_lifetime_max_phys_footprint for a new process, ri_interval_max_phys_footprint after a reset 0.3 s before a warm tap), not a sampled\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4774-8f6ed1d9-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4774-8f6ed1d9-pernille.md</code></span></div><h1>Review of 8f6ed1d9: T-4774, what one widget refresh tap costs the app</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4941, Commandment 13). Author: Idris. Reviewed: 8f6ed1d95b as a whole (UITests/TapCostTests.swift,
scripts/tap_cost.sh, tap_cost_poll.py, tap_cost_summary.py, the six files in ios/bench/t4774-tap-cost/,
ops/plans/T-4774-tap-cost.md, docs/decisions/gate-session-build.md and docs/how-it-works/extension.md), and Odalys's
343a09fd39 (T-4884), which adds tap_cost.sh to tools/xc_sim.py's SIM_SCRIPTS so xc_sim never shuts the private
Simulator down mid-run; that one-word change is right. The board line names b81ede24, which only queues an event; the
work is 8f6ed1d95b. The author's memory files were not read. No app code changed. Since 8f6ed1d95b, extension.md's
section was extended by T-4772 (the testQ sentence); the T-4774 sentences are unchanged. Paths are under pywidget/
unless they start with ops/ or tools/. Date: 2026-11-20.

## Tests run

- By hand (a script of mine, not the author's): every figure in the plan's table and bullets, re-derived from the
  three committed taps.jsonl files and from the per-tap lines in the three summary.txt files. The 26.0 rows pool run 1
  and run 2, as the plan says. All table figures agree: 27.0 cold tap to row 3406 ms (3114-3560), app start to row
  3029 (2746-3104), peak 34.2 MiB (34.1-34.7); warm 426 ms (379-488), 33.3 MiB (33.1-33.8); 26.0 cold 1265 ms
  (1214-2273), 923 ms (880-1930), 48.5 MiB (45.2-50.8); warm 385 ms (328-436), 47.8 MiB (44.6-50.2). Also right:
  35 timed taps, each exactly one row with <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> `app`, trigger `intent`, outcome `ok`, token changed; one dropped tap
  of 24 on 26.0; warm rise over before-tap at most 0.1 MiB (27.0) and 3.9 MiB (26.0); rest 33.0-33.8 and 41.1-50.0 MiB;
  row `peak_mb` 31-33 and 41-47; outside peak minus row `peak_mb` 1.7-3.2 MiB (27.0) and 3.5-4.2 MiB (26.0), which is
  the plan's "2-4" once the row's whole-MiB rounding is allowed; `tap()` returns in 0.49-0.63 s; process start
  0.31-0.46 s after `tap()` was called; script `duration_ms` 19-25 cold, 2-6 warm. The row file's mtime sits 2-13 ms
  after the row's own `ts` in every tap, so "tap to row" is the row's time and not some later write.
- Host: `tap_cost_summary.py` on ios27.0-taps.jsonl with an empty poll file: runs, and prints the same tap-to-row
  lines as the committed summary (cold n=4 median 3405.5, warm n=8 median 426.0). The memory lines cannot be re-run:
  see M1.
- Host: `bash -n tap_cost.sh`: clean.
- Host: `tap_cost_poll.py`'s field indices and reset, by loading the script and reading my own process: after a
  300 MiB mmap spike that is freed, `fp` falls back to 14 MiB while `life` and `ival` hold 314; after
  `proc_reset_footprint_interval` (rc 0) `ival` is 14 again while `life` stays 314; a 50 MiB spike then reads
  `ival` 64. So indices 7, 28 and 33 of rusage_info_v4 are the footprint, lifetime peak and interval peak, and the
  reset does what the plan says. Watching a second process (a copy of /bin/sleep at `<udid>/PyWidget.app/PyWidget`)
  did not work here: my shell's sandbox answers ESRCH to proc_pidpath and proc_pid_rusage for any other pid, so the
  poller saw nothing. That is my sandbox, not the script; the committed runs show it worked on the Mac mini.
- UI test: not rerun. tap_cost.sh needs the poller on the same Mac as the Simulator, and xc.sh keeps TEST_RUNNER_*
  runs on this machine, so the only way to run it is a local xcodebuild, which this review was told not to do; the
  MacBook runner has no poller and the test skips without TAP_COST. The test's ability to fail is judged by reading
  (below).
- No phone run, so no figure here is measured on a device.

## Verdict: PASS with findings

The method is sound where it matters most. The peaks are the kernel's own maxima (`ri_lifetime_max_phys_footprint`
for a new process, `ri_interval_max_phys_footprint` after a reset 0.3 s before a warm tap), not a sampled maximum, so
the 10 ms poll period and the Python loop's real period do not bias them. The cold start time is the kernel's
`ri_proc_start_abstime`, and the 5 s re-ask of a pid that was still xpcproxy fixes the missed launches of the first
27.0 run, which the plan reports and leaves out of the table. "Cold" and "warm" are read from what happened
(`app_state_before == 1`), not from what the test meant, which is how the 26.0 dropped tap's successor is counted
correctly. The pooled medians, the outlier and the confound (17e on 27.0, 16e on 26.0) are all said in the plan.
Sample sizes are small (4 cold taps on 27.0, 8 on 26.0), but the memory ranges are tight (0.6 MiB on 27.0) and the
2 s launch gap between runtimes is far outside both runtimes' spread, so the headline figures stand at that size.

Two things do not stand as written: the memory figures can no longer be checked against their samples (M1), and one
sentence says the timing bounds what a person waits, which it does not (M2).

## Findings

### M1 (Medium): the samples behind every memory figure are gone, and the plan says they are kept

- Where: [`ops/plans/T-4774-tap-cost.md`](../company/t-4774-tap-cost.html), "Run logs" ("Kept in `/Volumes/SANDISK SSD/company-scratch/T-4774-idris/`
  ... Each run folder holds ... `poll.jsonl`"); the bench folder holds only taps.jsonl and summary.txt.
- The scratch folder was moved to `/Volumes/Company SSD/company-scratch/overflow/2026-11-18/T-4774-idris` at
  2026-11-18 6:56 AM (ops/metrics/overflow.jsonl, 789,244 KB) and deleted by the sweep at 7:38 AM (ops/metrics/sweep.jsonl).
  Neither path exists now. Every peak, rest, before-tap, "app start to row" and "tap to launch" figure comes from
  poll.jsonl, so the summary's per-tap lines are now the only record of them. I could check that the SUMMARY lines
  and the plan follow from those per-tap lines (they do), but not that the per-tap lines follow from the samples.
  The xcodebuild logs the plan names are gone from ops/runs/ too.
- Why it matters: the gate session compares the phone against 34.2 and 48.5 MiB, and the how-it-works page quotes
  them. A figure whose samples cannot be produced is a figure on trust, and the plan states a location that is false.
- Fix: commit each kept run's poll.jsonl (or a cut of it: the seen, reset and gone lines and each app pid's last
  line per tap window) beside the taps file, from a rerun of one runtime if needed, and correct the "Run logs"
  paragraph to say what was lost and when. The general hazard (bench evidence in scratch is swept) is T-4847's
  ground; this line is only about these figures.
- Board line: T-5278 (Idris, P2).

### M2 (Medium): "tap to row" is not an upper bound on what a person waits

- Where: [`ops/plans/T-4774-tap-cost.md`](../company/t-4774-tap-cost.html), "How it was measured" ("So this figure is an upper bound on what a person
  waits"), and the bullet "the widget's token changed each time".
- A person waits until the widget on the Home Screen shows the new drawing. That comes after the row: the app writes
  tree.json (18 ms before the row in the first 27.0 tap) and WidgetKit must then reload and draw the timeline. The
  test never looks at the screen for it: `token()` (TapCostTests.swift, `treeText`) reads tree.json in the App Group,
  not the widget's label. So the figure overcounts by part of `tap()`'s 0.5-0.6 s and undercounts by the reload and
  redraw, which is unmeasured; it is neither bound. On a warm tap the row lands before `tap()` returns (426 ms
  against 565 ms median), which shows how much of the overcount is real, but the redraw side is still unknown.
- Why it matters: "0.4 s warm, 1.3-3.4 s cold" will be read as what the user feels; the redraw may add to it.
- Fix: say "from the call to tap() to the app's run row; the widget's redraw after it is not measured", and say the
  token is the drawing file's, not the screen's. Better: take the time to the new value on screen, as T-4772's testQ
  already waits for it, so the docs can give a figure a person sees.
- Board line: T-5279 (Idris, P2).

### L1 (Low): the test fails only when no row appears

- Where: `UITests/TapCostTests.swift`, the last assertion; `scripts/tap_cost_summary.py`.
- The only per-tap assertion is `misses == 0`. A tap whose row says another lane, another trigger or outcome
  `error`, or whose token did not change, passes, and the run is then measuring something else (traced by reading:
  a refresh that ran in the widget writes a row, so the test is green). The summary also drops silently a cold tap
  with no single new pid and a warm tap with no reset before it; only a smaller n shows it. All 35 committed taps were
  fine (my derivation above), so no figure is wrong; the next run could be without anyone noticing.
- Fix: assert lane `app`, trigger `intent`, outcome `ok` and `token_changed` per tap, and have the summary print a
  SUMMARY line for every tap it could not measure.

### L2 (Low): small slips in the plan and the how-it-works page

- Plan: warm taps came "5.6-9.2 s" after the tap before; the files give 5.59-8.74 s (27.0 5.68-8.74, 26.0 5.59-7.40).
  "Each about 4.8 s after the row of the tap before": the files give 5.08-5.15 s (the home-widget query and the 0.3 s
  reset wait come after the 4.5 s of sleeps).
- extension.md: "Almost all of that is the app and Python starting": on 26.0 about 0.34 s of 1.26 s comes before the
  app process exists, and nothing splits app start from Python start (the plan says so itself). "Until the system
  ends it": the runs saw the app in the background for at most about 9 s, not until it ended. The page gives the
  memory figures without "Debug build", which the plan says.
- Fix: correct the two numbers; "most of that is the system starting the app and Python"; "for at least the next
  9 s"; add "Debug build" to the sentence.

### L3 (Low): the scripts' loose ends

- `tap_cost_poll.py`, the reset block: `for pid, kind in seen.items(): ... else:` is a for-else with no `break`, so a
  `reset-request` line is written after every reset, not only when no app was live. Harmless to the summary (it reads
  only `reset` lines with `ok`), misleading to a reader of the file. Make it an `if not any(...)`.
- `tap_cost.sh` has no `trap`: an interrupted run leaves the poller looping (it stops only on the stop file) and the
  private t4774-* Simulator undeleted. Add `trap 'touch "$OUT/stop"; xcrun simctl delete "$DEV"' EXIT`.
- The poller decides a pid once (after the 5 s window); a pid reused later by a new app process would be missed.
  Unlikely within a 3-minute run; worth a comment.

L1-L3 share one board line: T-5280 (Idris, P3).

## Checked and fine

- What a "tap" is: XCUITest's tap on the widget's `Refresh` button found by name (`button_by_name` true on all 36
  taps, so the coordinate fallback never ran), on a private Simulator so the shared one's Home Screen is untouched.
- The poll's timing: irrelevant to the peaks and the start time (kernel figures); only `rest_mb` and `before_mb` are
  sampled values, and the plan uses them only for "holds 33-50 MiB" and the warm rise.
- The reset lands before the tap: the test writes the file, waits 0.3 s, then reads state, rows and the widget
  before tapping, and the summary takes only a reset in the 2 s before `t_call`. Every warm tap had one; one 26.0 warm
  tap shows `same_pid: false` because its window, the run's last, runs to the poll's end and catches a later pid; its
  peak is read from the reset's pid, so it is right.
- Flakiness: the test skips without TAP_COST, so it never runs in a normal UI suite; when it does run it failed once,
  correctly, on the dropped tap (26.0 run 1).
- gate-session-build.md's item asks the phone for what the phone can give (`peak_mb` from Export measurements, called
  a lower bound) and says the phone has no tap-to-row method yet. It claims nothing the numbers do not support.
- T-4884: `tap_cost.sh` in SIM_SCRIPTS, nothing else changed.

## Board lines

- T-5278 (M1): keep the tap-cost samples that the memory figures came from (Idris, P2).
- T-5279 (M2): say what tap-to-row leaves out, or time the redraw (Idris, P2).
- T-5280 (L1-L3): tap-cost test assertions, plan figures, script loose ends (Idris, P3).
{% endraw %}

</div>
