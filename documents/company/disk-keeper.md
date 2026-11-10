---
layout: "default"
title: "T-3691: the disk keeper"
section: "documents"
description: "Investor an Investor #41 c6727216067 (16:14): &quot;Why don&#x27;t we have a more proactive system for managing storage space? Make this a top priority&quot;. The Operator&#x27;s reply c6727232490 promised: a check every few minutes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/disk-keeper.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/disk-keeper.md</code></span></div><h1>T-3691: the disk keeper</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor #41 c6727216067 (4:14 PM): "Why don't we have a more proactive system for managing storage
space? Make this a top priority". The Operator's reply c6727232490 promised: a check every few minutes, action at a
warning line around 30 GB, company output moved to the Company SSD, company test leftovers cleared, and a #41 post
only when it cannot get back over the line. This is that keeper. Code, no Claude (Tenet 7).

## 1. Why it fell to 9.5 GB (ops/metrics/disk.jsonl, n=26 rows 2:26-4:25 PM 11-08; `df` GB = KB / 1024^2)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Why it fell to 9.5 GB (ops/metrics/disk.jsonl, n=26 rows 14:26-16:25 11-08…, scrolls sideways" style="--tw:488px" markdown="1">

| When | Free | |
|---|---|---|
| 2:33 PM | 19.9 GB | after T-3433's relief |
| 3:37 PM | 14.3 GB | |
| 3:44 PM | 10.2 GB | 4.1 GB in 7 minutes |
| 3:50 PM | 9.5 GB | the gate closes (under 10) |
| 4:13 PM | 5.1 GB | the low point |
| 4:25 PM | 10.8 GB | T-3690 moving by hand (SSD free fell 28 GB) |

</div>


1. Nothing acted early enough on what was growing. 2:33 PM to 3:50 PM lost 10.4 GB in 77 minutes (about 140 MB a
   minute) while sessions ran. The only movers were disk_overflow.py (starts under 20 GB) and disk_ssd_moves.py
   (starts under 40 GB). Both have a narrow scope.
2. disk_overflow.py found nothing it may move, and disk_ssd_moves.py logged "nothing in scope to move" at 6.4 GB
   (4:07 PM). Their scope is finished task scratch plus DerivedData whose workspace is gone (overflow) or that has been
   idle 12 h (ssd_moves). Finished scratch was already on the SSD; most of it went at 14:2x (T-3433). Every live
   DerivedData folder had been used within 12 h.
3. The space sat where no tool was allowed to act:
   - the user temp folder: 30.31 GB, 19.58 GB of it older than 24 h, almost all company test and tool leftovers
     (ops/runs/t3433-disk.md section 3). disk_sweep.py's TEMP_PATTERNS knew only 4 prefixes. 59,747 pywidget-host-*
     folders were never looked at.
   - Simulator devices: 26.46 GB. Trimming them was refused as irreversible (T-2587). They stay.
4. The sweep runs only between sessions (supervisor step 1b, hourly). On 11-08 sessions ran most of the day, so it
   acted at 11:50 AM and 3:14 PM and not again before the low point (ops/metrics/sweep.jsonl rows).

## 2. What the keeper does (tools/disk_keeper.py `tick`)

Every 300 s. It runs as a jobs-loop job (`disk_keeper`). Until the loop is installed (T-3660; `jobs_loop.py status`
11-08 16:28: heartbeat none), it also runs from tools/supervisor.sh: each tick and each 5-minute keeper pass of a
long session. It is skipped there once the loop runs it (`moved disk_keeper`).

- Reads the internal disk's free space with `df` (disk_free.read_kb). At or over WARN_GB (30) it does nothing more.
- Under WARN_GB it runs these steps in order, each in its own process with a time limit, and reads df again after
  each one. It stops as soon as the disk is back over WARN_GB:
  1. `disk_ssd_moves.py run`: idle company DerivedData (12 h) and finished scratch, moved to the Company SSD.
  2. `disk_sweep.py run --internal-only --every 900`: internal finished scratch, the safe caches, and company temp
     leftovers (T-3684: the prefixes a company tool or test makes, older than 24 h, held by no process; the oldest
     20,000 a pass). While the disk is under 20 GB and the SSD has room, these are moved to the SSD hold rather than
     deleted. `--internal-only` skips reading the SSD's scratch (388 s for 379 folders on 11-08; it frees nothing
     here) and keeps its own stamp, so the hourly full sweep in the tick still runs.
- An episode starts when the disk falls under WARN_GB and ends when it is back over it. If both steps have run and
  the disk is still under the line, it posts one plain #41 note for that episode. The note gives the free space
  before and after, what each step did, and the Simulator size (measured, never touched), and says what an Investor
  can do. At most one note per episode, and at most one per 6 hours.
- One row per acting tick in ops/metrics/disk_keeper.jsonl.

## 3. Lines


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Lines, scrolls sideways" data-n="2" style="--tw:447px" markdown="1">

| Line | GB | Owner |
|---|---|---|
| WARN_GB | 30 | the keeper acts under it, and stops acting once back over it |
| RESUME_GB | 20 | the gate reopens (disk_free.py) |
| STOP_GB | 10 | the gate closes and the emergency opens (disk_free.py) |

</div>


30 GB leaves room at the fall rate measured in section 1. From 30 GB to the gate's 10 GB is 20 GB, about 140
minutes at 140 MB a minute and about 35 minutes at the worst 7-minute rate (about 570 MB a minute). The keeper runs every
5 minutes.

## 4. What it never touches

- The keeper deletes nothing and moves nothing itself; it only runs the two tools above. A static test checks that
  disk_keeper.py has no remove, rmtree, unlink, rename or move call.
- Simulator devices (T-2587 refusal; T-1703). It may only report their size.
- Any path in ops/refusals.jsonl (T-3682). Both tools read the record again before each item, and fail closed if it
  cannot be read.
- Scratch or temp folders that a live process holds (an open file, a working directory inside, or a command line
  naming it; lsof and ps, and if either fails nothing goes). T-3314: the sweep now applies this check to scratch as
  well as temp, so running it beside live sessions leaves their scratch alone.
- <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span> personal folders, open or held tasks, unknown folders, unpushed git work: the sweep's existing rules.
- Generic tmp*, TemporaryDirectory.*, and any prefix no company tool or test makes.
- A temp leftover holding a git worktree with uncommitted or untracked files (landcheck-*/wt, merge-queue-*/wt;
  T-3690 found 15 GB of these). A clean one goes: its commits live in the shared repository.
- Copying a folder with sparse files to the SSD (T-3690: ditto wrote 0.8 GB of Xcode cache out as about 40 GB).
  disk_ssd_moves.py skips such a folder; the sweep deletes a sparse temp leftover in place, as it would when the disk
  is not tight; move_verified.py skips it.
- Investor-owned files. The launchd install of the jobs loop is T-3660's. No settings change is needed.

## 5. After-read

`python3 tools/disk_keeper.py status` and ops/metrics/disk_keeper.jsonl after 24 h: how many ticks acted, the lowest
free figure, and whether the gate closed (disk_free rows with "seen_by": "gate" under 10 GB). Before number: 11-08,
gate closed 3:50-4:25 PM and lowest 5.1 GB.

## 6. Speed (measured 11-08, read only)

`disk_sweep.py plan` ran over 10 minutes and was stopped (T-3690 and here). The holder check took 56 ms an entry
(n=200) over 96,482 temp entries, and reading the SSD's scratch took 388 s. After the fixes, `plan --internal-only`
takes 82.8 s: one lookup per path, at most 20,000 temp entries a pass, and no SSD scratch. The plan's output is in
ops/runs/t3691-sweep-plan.md.
{% endraw %}

</div>
