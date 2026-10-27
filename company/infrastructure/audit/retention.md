---
layout: "default"
title: "Transcript retention: measured figures and projected disk use (OPS-1)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/retention.md</code></span><span>2026-10-26</span></div><h1>Transcript retention: measured figures and projected disk use (OPS-1)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-25 23:03 ET. From the Investor's #41 request (c6407113363, 22:49), item 1: keep every transcript, compressed, on the Mac mini for the whole experiment, out of git and off the site.

## What changed
- Before: `tools/supervisor.sh` ran `find ops/runs -name '*.jsonl' -mtime +7 -exec rm` after every session. Nothing had been deleted yet: the oldest stream is from 2026-10-22 01:28, under 4 days old.
- After: the same place in the tick runs `tools/runs_archive.py archive --hours 48` (env `RUNS_ARCHIVE_HOURS`). It compresses each finished, dated stream older than 48 h into `ops/runs-archive/<name>.jsonl.gz` and deletes nothing. `meter.jsonl` is never touched, because every tick rewrites it.
- Before the original is removed, each file is checked four ways: it is not open in any process (lsof; a running session holds its stream open); it is compressed to a `.tmp`, fsynced, read back and SHA-256-compared; its size and mtime have not changed since the start; and the archive takes the original's mtime, so MB per day can still be measured.
- Method: zstd when the binary is on PATH, otherwise gzip. zstd is not installed on this Mac and I did not install it (no entry in log/software.md). The reasons are below.
- Out of git: `.gitignore` gains `ops/runs-archive/`. Off the site: no file under tools/site reads ops/runs or ops/runs-archive.
- Readers: `governor.find_run` and `governor.read_text` follow a record's old `ops/runs/<name>.jsonl` path to its `.gz` or `.zst`, and `governor.read_run` uses them. `ops_metrics.stream_path` resolves through `find_run`. Tests: tests/runs_archive_test.py 22/0; supervisor 118/0 (5 new checks); governor and ops_metrics green.
- No files were moved by hand tonight. The dry run (22:54) would compress 94 streams, 192.6 MB. The first real pass happens at the next session's end.

## Measured figures
1. ops/runs now: 599 MiB by `du -sh` (613,088 KiB), 427 entries. Of these, 146 streams are .jsonl (610.9 MB decimal, one of them the session running now), 141 are .json results (0.7 MB), 138 are .log files (8.8 MB), and there is 1 other file.
2. Compression ratio on all finished streams (n=141, 602.2 MB): gzip -6 brings them to 313.4 MB, **1.92x**, in 14.9 s (about 40 MB/s).
3. A random sample (n=12, 21.3 MB, seed 41): gzip -6 2.5x, gzip -9 2.5x (no gain), xz -6 3.0x but at 7 MB/s. Small streams compress better than the corpus as a whole.
4. Why the ratio is low: in the largest stream (20261024-201259-work.jsonl, 105.5 MB), 85% of the bytes are base64 image data in tool results (screenshots), and base64 barely compresses. User-type events are 95.5 MB of that file.
5. MB per day, by file mtime (streams only, raw / gzip):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measured figures, scrolls sideways" data-n="2" style="--tw:506px" markdown="1">

| Day | Streams | Raw MB | gzip MB |
|---|---|---|---|
| 2026-10-22 (from 01:28) | 45 | 32.7 | 15.4 |
| 2026-10-23 | 51 | 161.1 | 85.0 |
| 2026-10-24 | 33 | 319.5 | 175.4 |
| 2026-10-25 (to 23:00) | 18 | 97.4 | 37.7 (finished only) |

</div>


   Mean over 3.90 elapsed days: **156.7 MB/day raw, 81.6 MB/day gzip**. The peak day (10-24) was 319.5 raw and 175.4 gzip.
6. Free disk (`df -h /`): 106 GiB available of 228 GiB (111.5 GB decimal), 11% used.

## Projection (archive plus up to 48 h of live streams)
The starting point is about 318 MB of gzip for the streams written so far. Day 30 is the end of 2026-11-20 (26.0 days from now); Day 60 is the end of 2026-12-20 (56.0 days).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Projection (archive plus up to 48 h of live streams), scrolls sideways" data-n="4" style="--tw:547px" markdown="1">

| Rate | Day 30 | Day 60 | Share of free disk at Day 60 |
|---|---|---|---|
| Mean, gzip (81.6 MB/day) | 2.4 GB | 4.9 GB | 4% |
| Every day at the 10-24 peak, gzip (175.4 MB/day) | 4.9 GB | 10.2 GB | 9% |
| For comparison: kept but not compressed, mean | 4.7 GB | 9.4 GB | 8% |
| For comparison: kept but not compressed, peak | 8.9 GB | 18.5 GB | 17% |

</div>


On top of that come the live 48 h window (about 0.3 GB at the mean, 0.65 GB at the peak) and the .log files (about 2 MB/day, never deleted before either). Even the worst row leaves over 90 GB free at Day 60. **Disk is not the constraint.**

## Gaps and choices
- Why not zstd: it is not installed. The system Python (3.9.6) has no stdlib zstd reader, so every reader would need the binary on launchd's PATH. gzip is stdlib on both sides. If disk ever matters, xz (stdlib `lzma`, sample 3.0x vs 2.5x) is the next step and needs no install.
- `tools/worker_idle.py` and `tools/live_status.py` glob `ops/runs/*-work.jsonl`. live_status reads only the running session, so archiving changes nothing for it. worker_idle's history would lose streams older than 48 h. It is not changed in this task and is listed as open.
- The trend is rising: 10-24 carried 10x the volume of 10-22. That is why the peak row is in the table.
- Re-measure with `python3 tools/runs_archive.py measure`, which prints live and archived bytes per day and free disk.
{% endraw %}

</div>
