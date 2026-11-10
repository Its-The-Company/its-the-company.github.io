---
layout: "default"
title: "T-3107: the first phone export, read against G1-G3 (partial; not the three-day reading)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/2026-11-08-t3107-phone-numbers.md</code></span><span>2026-11-08</span></div><h1>T-3107: the first phone export, read against G1-G3 (partial; not the three-day reading)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Pernille, 2026-11-08 12:2x ET. Rules: ADR-007 (G1 tiny cold peak + B <= 0.5 C, n >= 6; G2 two widgets in one warm
extension <= 0.6 C; G3 a deliberate over-allocation lands as `killed` -> lane `app`), read as
pywidget/docs/decisions/gate-session-build.md "How G1-G3 get their numbers in the gate build" says.

**What this is.** T-3107 waits for three days of the gate build on the Investors' phones and an export sent for it.
That has not happened. What exists is one export Jeremy attached on #227 (the blank-widgets question) at 8:04 AM ET
11-08, from build 3, about 16 hours after build 3's first lane run on his phone. It is real data, so it is read here,
and every result below is marked partial. The T-3107 line stays open.

Source: research/inbound/227/20261108T130651-manifest-3.json, ...130654-lane-rest.jsonl-3,
...130652-runs-pywidget.premade.countdown.jsonl-3 (committed in f865be125). Scripts:
company-scratch/T-3107-pernille/read.py and g.py, run with `python3 -I` on those paths. Row and launch UUIDs and exact
times are left out of this note on purpose.

## 1. Manifest first


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Manifest first, scrolls sideways" style="--tw:655px" markdown="1">

| Field | Value | Reading |
|---|---|---|
| app version / build | 0.1 (3) | the gate build T-3106 uploaded (cdd8cb483) |
| device | iPhone15,4 (iPhone 15) | not the oldest supported phone T-0680 names; C may be lower there |
| system | iOS 27.2 | |
| lane_flag | true | the extension lane is on |
| record_only | true | the margin only records; nothing was refused by design |
| missing / failed | [] / [] | the export itself is whole: 2 files copied, 2,041 B (6 rows) and 22,514 B (69 rows) |

</div>


Only one widget has a runs file: countdown. habits and quote are also on the lane allowlist
(pywidget/widgets/premade/lane.json) and Jeremy says every widget was active, but neither wrote a single row. That is
the #227 / T-3393 problem, and it is why G2 cannot be read (below).

## 2. Memory at rest (lane-rest.jsonl, 6 rows, 6 extension processes)

- **C = 30.00 MiB** on every row (footprint + os_proc_available_memory). This is the system's figure, not item 2's
  allocation ramp, which this build does not run. It matches the 30 the margin code assumes.
- **Footprint at rest 4.92-5.19 MiB**, read 0.1-1.2 s after process start.
- os_proc_available_memory was non-zero on every row.

## 3. Runs (runs-pywidget.premade.countdown.jsonl, 69 rows)

- 31 app-lane rows (11-06 to 11-08; the 11-06 ones are build 2): 30 `ok`, median 85 ms, max 146 ms; **1 `timeout`
  in the app lane lasting 6,734,233 ms (1 h 52 min), `backgrounded: true`, TimeoutError**, 11-07 evening ET. Not a lane
  figure; passed to T-3393 as a fact, not a cause.
- 38 widget-lane rows, all `ok`, all trigger `system`, in 4 extension processes (4, 4, 6 and 24 runs). Duration median
  22 ms, 90th percentile 37 ms, max 45 ms.
- **Kills: 0.** No `killed` row. **Refusals: 0**, as record-only means. **`margin=would_refuse`: 4 of 38**, and they are
  exactly the 4 cold first runs.
- Refresh spacing: the 4 processes started about 1 h 18 min, 31 min and 13 h 50 min apart; the long gap is overnight,
  with no widget-lane run in it. Within a process, runs came 0 s to 5 min 47 s apart. 16 hours is too short to say anything
  about cadence over days.

## 4. Against the rules

**G1 (cold peak + B <= 15 MiB, n >= 6): not decided, n = 4, and 3 of the 4 are over.** Countdown is an allowlisted lane
premade. B is taken as C minus the headroom the first run read (the margin reads both at the same moment):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Against the rules, scrolls sideways" data-n="1 2 3 5" style="--tw:320px" markdown="1">

| Cold process | peak above B (row, whole MiB) | B (MiB) | peak + B | <= 15? |
|---|---|---|---|---|
| 1 | 10 | 5.31 | 15.31 | no |
| 2 | 9 | 4.95 | 13.95 | yes |
| 3 | 9 | 7.88 | 16.88 | no |
| 4 | 9 | 7.88 | 16.88 | no |

</div>


The peak is rounded to whole MiB, so each sum is +/- 0.5 MiB. Processes 3 and 4 read exactly the same headroom
(23,198,096 B); I cannot say why from the export. B is higher there (7.88 against about 5 MiB at rest), so the baseline
moves with what the process did before the lane's first run.

**The shipping margin would have refused every cold start on this phone: 4 of 4.** The need was 42.00 MiB on the
first one (no peak yet, the 21 MiB first-run figure x 2), then 28.97, 30.13 and 23.66 MiB, against 22.12-25.05 MiB of
headroom. The later needs come from a warm run's peak (12-15 MiB above B), doubled, with no residue to take off in a
cold process. With record-only off, countdown would not have run in the extension from cold on this phone.

**G2 (two widgets, one warm process, <= 18 MiB): not measurable.** Only one lane widget ran. One signal, and it is
not G2: countdown alone left the process at 18.02-18.99 MiB (C minus the last run's headroom) after 4-24 warm runs,
already over 0.6 C. In the 24-run process the residue grew from 8.36 to 11.11 MiB.

**G3 (over-allocation -> `killed` -> lane `app`): not measurable.** No kill happened, and the debug over-allocation
premade the decision names does not exist in the repo (no premade, no Swift or Python that allocates past C). No
export from a TestFlight build can read G3 until one is built into the gate build.

## 5. What the three-day reading still needs

1. An export after three days of a gate build (build 3 or 4) with countdown **and** quote or habits on the Home
   Screen, from each Investor phone that has it. G1 then reaches n >= 6.
2. Quote or habits actually running in the lane on the phone (T-3393), or G2 stays unreadable.
3. The G3 over-allocation premade in the gate build, and one placement of it with a screen recording.
4. The company promised on #192 (1:09 AM 11-06) to post these steps on #41 once the build was on TestFlight. They were
   not posted; the build 3 and build 4 posts mention the Export row but not the three days.
{% endraw %}

</div>
