---
layout: "default"
title: "Plan: a hung SSD never holds the Xcode slot again"
section: "documents"
description: "A hang of the Company SSD costs minutes, not hours: no build freezes on it, no frozen build keeps the Mac mini&#x27;s one Xcode slot, and the drive is brought back without a person where that is possible."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/ssd-hang-and-stuck-slot.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 16 · Fri Nov 6</span><span><code>ops/plans/ssd-hang-and-stuck-slot.md</code></span></div><h1>Plan: a hung SSD never holds the Xcode slot again</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by an Investor in Plan mode, #41 c6684978381 (07:37 11-06); questions c6685008504; answers c6685030830 (07:40).

## Goal
A hang of the Company SSD costs minutes, not hours: no build freezes on it, no frozen build keeps the Mac mini's one
Xcode slot, and the drive is brought back without a person where that is possible.

## What the answers decided
- **Q1 A:** no signing or upload on the MacBook for now. Signing stays on the Mac mini. Revisit if uploads become weekly
  or more (count them in ops/metrics/xc.jsonl priority=release rows at the <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> pull-in check).
- **Q2 A:** build working files (DerivedData, .xcresult) go on the internal disk only; the SSD keeps cold storage
  (archives, old caches, finished scratch). The Xcode lock frees a holder that shows no progress for 10 minutes.
- **Q3 A:** when the SSD stops answering, the company force-ejects and remounts it with diskutil, and turns off disk
  sleep for it; if that fails, one emergency issue asks the Investors (as #203).

## Cause, as found (07:4x 11-06)
Since T-2060 (11-05) tools/xc.sh puts DerivedData on "/Volumes/Company SSD/company-big/". When the SSD hangs, a build
sits in open() in an uninterruptible wait; <span title="A test written in advance. If it fires, we drop the idea.">kill</span> -9 does not end it, so it holds the lock (tools/xc_lock.py) until the
drive answers or the Mac restarts. <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> a's T-2044 test (pids 74475, 43632, 43663, since 02:43) is that case.
Why the drive hangs is not known yet: T-2587 step (b) reads the system log for it.

## Steps (board lines)
1. **Internal build files** (T-3013, Odalys, P0): xc.sh's default DerivedData goes back to the internal disk; the SSD path is
   used only for cold copies. Disk gate stays 10/20 GB; a sweep of internal DerivedData older than its task keeps room
   (internal: 12 GB free at 07:3x). Tests in tests/.
2. **Lock frees a stalled holder** (T-3014, Odalys, P0): xc_lock.py records the holder's pid and log path; a waiter that sees
   the log not grow for 10 minutes, or the holder's files on a drive that does not answer, records the holder as
   stalled (ops/metrics/xc.jsonl), and takes a fresh lock without needing to kill it (a kill was refused by the
   classifier on 11-06; T-0848). The stalled run's result is never counted. Tests with a fake stalled holder.
3. **SSD recovery** (T-3015, Odalys, P1): tools/ssd_recover.py, run by the supervisor when tools/scratch.py ssd_answers() is
   false: bounded `diskutil unmount force` / `diskutil eject`, then mount; `pmset -a disksleep 0`; each step under a
   timeout, logged; on failure, or if the volume comes back locked, one emergency issue. Never a read of the SSD
   itself while it hangs.
4. **Root cause** (T-2587, Odalys, P1): T-2587 step (b), already on the board: `log show` for the disk and USB around each hang
   (11-05 ~05:25, 11-06 ~04:00), disk sleep, Spotlight, power; the finding goes on #41.

## Risks
- Internal space: build files back on a 228 GB disk with ~12 GB free. Step 1's sweep must hold the 20 GB line, or
  builds wait (exit 75), which is a wait, not a failure.
- A frozen process stays until restart even after its lock is freed; it may keep a Simulator. Tests run on the
  MacBook runner, so the local Simulator matters only for builds.
- A force eject while a write is in flight could lose that write; only cold copies live on the SSD after step 1.

## Left out
- Signing and upload on the MacBook (Q1 A).
- Restarting the Mac mini on its own (Q3 B not chosen).
{% endraw %}

</div>
