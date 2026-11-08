---
layout: "default"
title: "T-3312: the jobs loop is not installed yet (read 2026-11-08 12:30 ET)"
section: "documents"
description: "Why the line kept coming back (T-3461): the install is a main-session step (tools/install-launchd.sh --jobs), which a lane may not run, so every lane session had nothing to commit. The line is closed here; the install\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/jobs-loop-install-t3312.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/jobs-loop-install-t3312.md</code></span></div><h1>T-3312: the jobs loop is not installed yet (read 2026-11-08 12:30 ET)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Read only; nothing installed or loaded.

Findings (each with its sample):
1. `python3 tools/jobs_loop.py status` (n=13 jobs): "heartbeat none"; every job "last never". The loop has not run once.
2. ~/Library/LaunchAgents holds inboxwatch, personal-tick.a, personal-tick.b and supervisor (n=4). There is no com.company.jobs.plist; `launchctl list` shows no com.company.jobs.
3. ops/runs/jobs.log does not exist (n=0 lines), so there are no job failures and no sync merge commits to count.
4. ops/runs/supervisor.log (n=104,462 lines, last write 11-08 12:25) still runs the moved steps: "merge queue: skipped, the last run started under 3600 s ago" and "runner_watch: 199 results ..." at 11:54. They stay in the supervisor until the loop runs.
5. The 48 h read cannot be written. The before numbers for it are T-3301's (n=61 sessions: 6 ended for push; 4.1 h after-session and 2.5 h before-session upkeep). Today's session_gaps.py, 11-04 00:00 to 11-08 11:55 (not the after read): 76 work sessions, 107.9 h, no session 32.4 h (30%); after-session upkeep 11.3 h, before-session 5.0 h; 37 of 76 work sessions ended for a between-session job, 7 for the session's push. This is the same kind of before number, for the later comparison.

Why the line kept coming back (T-3461): the install is a main-session step (tools/install-launchd.sh --jobs), which a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> may not run, so every lane session had nothing to commit. The line is closed here; the install and the read are two new lines.

Off at once: ops/jobs_config.json {"enabled": false} or tools/install-launchd.sh --unjobs.
{% endraw %}

</div>
