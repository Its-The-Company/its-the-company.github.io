---
layout: "default"
title: "T-0696 handoff"
section: "documents"
description: "Not finished: no table, nothing in the C2 doc changed, NetFetch.Limits.widgetExtension left alone. Not ticked."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-0696-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 26 · Mon Nov 16</span><span><code>ops/plans/T-0696-handoff.md</code></span></div><h1>T-0696 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Not finished: no table, nothing in the C2 doc changed, `NetFetch.Limits.widgetExtension` left alone. Not ticked.

## Where the work is

- Patch: `/Volumes/SANDISK SSD/company-scratch/T-0696-idris/t0696-wip.patch` (6 files, applies to origin/main c629f78f8b),
  and the same files applied in the scratch worktree `/Volumes/SANDISK SSD/company-scratch/T-0696-idris/wt`
  (Vendor/python is a symlink to the main checkout's; Runestone fetched).
  - `ios/Shared/Bridge/LaneNetPeak.swift` (forced <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> Debug build only): a net call whose path is `/t0696/body/...` resets
    `ri_interval_max_phys_footprint` when it reaches Swift (after `malloc_zone_pressure_relief`, as the app test does);
    the script's next call `/t0696/mark/<token>` reads the interval peak. Lines go to `lane-net-peak.jsonl` in the App Group.
  - `ios/Shared/Bridge/LaneDevice.swift`: three lines, the hook, `#if PYWIDGET_LANE_FORCED && DEBUG`.
  - `ios/UITests/ExtensionMemoryTests.swift`: places one `lane: widget` script, then per sample rewrites main.py, <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the
    extension's processes, launches the app with `-reload` (PyWidgetApp's bench_widget.sh hook) and waits for the lines;
    writes one JSON line per sample (footprint at call, interval peak, lane baseline at enter, lane-peak, lifetime peak).
    Uses WidgetKitCheckTests' helpers through an instance; does not edit that file.
  - `docs/reviews/t0696-evidence/`: `server.py` (HTTPS on the Mac's 127.0.0.1, Content-Length, 16 KiB writes),
    `run-ext.sh` (private Simulator `pywidget-t0696`, throwaway CA from scripts/make_test_tls.sh added with
    `simctl keychain add-root-cert`, forced build in scratch dd), `summarize.py`.
- Real HTTPS, not a URLProtocol stub: the first request in each process pays for URLSession and the TLS stack inside
  the interval, which is what T-0691 left out.

## What ran

1. Build of the forced lane with the patch: compiled, test started (run of 3:25 PM, log in the scratch wt's ops/runs/).
2. The extension answered device calls on main: the setup run's `net.get` reached the Mac server over HTTPS
   (server.log 3:30:10 PM, `/t0696/body/61/0/SETUP` and `/mark/SETUP`) and LaneNetPeak wrote both lines,
   `reset_ok: true`, process PyWidgetExtension, first run in pid 93613.
3. The two measured samples (ascii, binary) were MISSING: killing the extension and launching the app did not make
   WidgetKit run the widget again. Fixed in the patch by launching with `-reload`; that rerun (smoke2) waited on the
   machine's Xcode lock behind three other lanes and was stopped before xcodebuild started. Untested.

One real reading, n = 1, empty body, Debug forced build on the iPhone 17e Simulator (iOS 27.0), not a result for the table:
footprint at the lane run's enter 17.96 MiB (the lane's baseline), at the call 23.69 MiB, interval peak to the mark
24.14 MiB, lane-peak 12,271,640 bytes (11.70 MiB) above baseline, process lifetime peak at return 29.63 MiB.
So in this build the absolute footprint is over 15 before `net.get` starts; the target is read on lane-peak
(LaneFootprint: lifetime peak above the process's first reading), and the table should give both.

## Next

1. `cd <scratch wt> && OUT=<scratch>/smoke.jsonl XC_TASK=T-0696 bash pywidget/docs/reviews/t0696-evidence/run-ext.sh
   "/Volumes/SANDISK SSD/company-scratch/T-0696-idris" 1 "ascii binary"`: two samples, check `cold: true`, outcome
   `ok 262144` / `PyWidgetError`, lane_peak_mib present.
2. Full run: rounds 6, all six bodies (36 samples, about 15 s each plus the build), OUT = evidence `ext.jsonl`;
   `python3 summarize.py`. Then C2 s6a "Memory per call": replace the app-host table with the extension's
   (keep the app-host numbers as the earlier column), or lower `NetFetch.Limits.widgetExtension` if net.get's own
   share pushes lane-peak past 15 MB, with NetFetchTests green.
3. Copy the patch's files into the worktree, run -only-testing:PyWidgetTests once (LaneDevice.swift is app code),
   commit by path, tick the board line.

Cleanup: the private Simulator pywidget-t0696 is shut down, not deleted (run-ext.sh reuses it; T0696_KEEP unset deletes it at the end).
{% endraw %}

</div>
