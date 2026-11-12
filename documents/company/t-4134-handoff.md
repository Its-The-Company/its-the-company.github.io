---
layout: "default"
title: "T-4134 handoff: Operator activity records (paused by an Investor #41 c6825558715)"
section: "documents"
description: "/Volumes/SANDISK SSD/company-scratch/T-4134-odalys/"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4134-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4134-handoff.md</code></span></div><h1>T-4134 handoff: Operator activity records (paused by an Investor #41 c6825558715)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3, 2026-11-12 9:03 AM. Paused before commit: account b was restricted to audit and restructuring work.
Nothing of T-4134's code is on any branch. The worktree changes were reverted; the files are in scratch.

## Where the work is

`/Volumes/SANDISK SSD/company-scratch/T-4134-odalys/`
- `operator_activity.py` goes to tools/. It writes one record per running Operator session to the main checkout's
  ops/operator-activity/ (main.json, then a.json, b3.json and so on). It writes a file only when the content changes
  and removes it when the session ends. The docstring gives the record format and the activity rules: inbox claim,
  then "Landing lane X" (a land that is the session's own child process), then report, then
  "Work session – N tasks", then "Inbox session". No model calls. Only first names or usernames go in a record,
  never message text.
- `operator_activity_test.py` goes to tests/.
- `hooks-and-gitignore.diff`: `git apply` it. It hooks tools/inbox.py (take, hold, done, release) and
  tools/lane_take.py (a claim won, or --done) into `operator_activity.note()`. It also adds
  `ops/operator-activity/*.json` and `*.tmp` to .gitignore. Also commit an empty `ops/operator-activity/.keep`.
  Without that folder the hooks write nothing, which keeps test copies clean.

## Measured state

1. tests/operator_activity_test.py ran 28 PASS, 0 FAIL (n=1 run). It was red first in two runs. With the tool
   missing, the import check failed. With the tool present but no hooks, the 2 hook checks failed.
2. The full tests/run.sh was **not finished**. I stopped it at about 10 minutes when the pause arrived, and no
   result was read. Run it before landing.
3. I ran one read-only scan of the live records at 8:5x AM (0.21 s, ps included). It found main
   "Work session – 2 tasks" (opus high, plan), plus b, b2 and b3, each with the right task counts. One fix came from
   that scan. The tick logs "session on" up to 1 s after the stream is stamped, so the scan allows a line up to 60 s
   after the holder's start.

## Next (main account)

1. Restore the files and apply the diff, then add `ops/operator-activity/.keep`.
2. Run `tests/run.sh` in full. Commit by path with the message "T-4134: ...".
3. Known gap: session start and end. I did not touch supervisor.sh and personal_tick.sh (the audit session owns
   them). The end is covered: both scripts already run `inbox.py release`, and the hook clears the ended session's
   record. The start is covered by the session's first `inbox.py take`. A report session may not call take, though.
   T-4136 should call `operator_activity.refresh()` from live_status's 5-second loop, which writes only on change.
   Put that as a note on T-4136's line.
4. The main session's task count is a count of the live claims owned by "operator" that it made since it started.
   The main session does not release a claim when a task finishes, so this reads as tasks taken on in the session.
{% endraw %}

</div>
