---
layout: "default"
title: "T-1692: exit-0 work sessions with no Operator session event"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/session-events-t1692.md</code></span><span>2026-11-03</span></div><h1>T-1692: exit-0 work sessions with no Operator session event</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-050">OPT-050</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-11-03. Watch item from T-1686 (OPT-050). Question: is "no Operator session event" (37 of 80) the
report's matching, or do sessions really close without the event?

## Method

Raw data: the `"type": "work"` run records in ops/runs/supervisor.log and every line of log/events.jsonl. A read-only
script (below) walks the records the way `tools/session_salvage.py report` does (window: previous record + 180 s to
this record + 180 s; the first record looks back 4 h) and sorts each record the report counted as "no event" by what
the events file holds near it. I also read a timeline of the first 18 records the report listed, with the Operator
events from the session's start to 3 h after its record, to check the sort by eye.

## Findings

1. The tool's share is 7 of 37 (n=80 records, 2026-10-27 6:40 PM to 2026-11-03 6:10 PM):
   - 3 closes written as worker `Operator` (capital O); the report matched `operator` only (11-02 1:05 PM, 11-02 11:59 PM, 11-03 1:01 AM);
   - 3 closes written as type `close`, not `session` (10-31 4:10 AM, 10-31 9:46 AM, 11-02 11:39 AM); each is a session summary;
   - 1 session of 0 minutes (11-03 12:52 AM, 0.26 USD) whose event came 3 to 15 minutes after its record.
2. The window is not the cause for short sessions. 14 of the 80 ran under 30 minutes; the report missed 6 of them,
   and only 1 of those 6 (12:52 AM above) has a session event the window dropped. The rest are case (1), or real (4).
3. The real count is 30 of 80 (37.5%): 26 sessions wrote other Operator events (message, decision, investor, report)
   but no session or close event; 4 wrote no Operator event at all (10-28 6:16 AM, 10-28 12:29 PM, 10-29 7:49 PM, 11-03 5:05 AM).
   In OPT-050's 40-session window: 19 by the tool, 17 real (2 were type `close`).
4. Before (2026-10-25 to 10-27 6:40 PM, n=25 records): the tool counts 7; 2 of them are worker `Operator`; 5 of 25 real.
   So the real rate rose from 5 of 25 (20%) to 30 of 80 (37.5%).
5. Where the close drops it: ops/prompts/work.md step 3 (Close) says only "the event log (python3 tools/events.py
   add ...)". It names no worker, no type and no summary for the session event, and no prompt has named
   `--type session` since the initial commit (`git log -S'--type session' -- ops/prompts/ setup/OPERATIONS.md` is
   empty). Any event meets the step as written; 26 of the 30 real misses wrote some other Operator event. That last
   link is an inference from the counts, not something a log records. Exit-0 sessions get no salvage event (only
   exit other than 0 does), so nothing backs the Operator up.

## Change made

tools/session_salvage.py report counts a worker `operator` in any case, type `session` or `close` (test 5a in
tests/session_salvage_test.py; suite 22 of 22). The report now reads 31 of 80 (30 real + the 12:52 AM one). Not
changed: the salvage's own "the Operator already wrote one" check (same predicate, around line 98), and the window.
Board line for the prompt step: T-1692 follow-up in ops/board.md.

## Script (read-only; run as `python3 -I classify.py ROOT SINCE UNTIL`)

```python
import collections, datetime as dt, json, os, re, sys
root, since, until = sys.argv[1:4]
ts = lambda s: dt.datetime.fromisoformat(s).timestamp()
ev = []
for l in open(os.path.join(root, "log", "events.jsonl"), encoding="utf-8"):
    try:
        e = json.loads(l); ev.append((ts(e["time"]), str(e.get("worker")), e.get("type")))
    except Exception:
        pass
recs = [json.loads(l) for l in open(os.path.join(root, "ops", "runs", "supervisor.log"), errors="replace")
        if l.startswith('{"at"') and '"type": "work"' in l]
rs = [r for r in recs if since <= r["at"] < until]
prev, out = None, collections.Counter()
for r in rs:
    at = ts(r["at"]); lo = prev + 180 if prev is not None else at - 4 * 3600
    win = [(w, ty) for t, w, ty in ev if lo < t <= at + 180]
    if ("operator", "session") in win: c = "a strict match"
    elif any(w.lower() == "operator" and ty == "session" for w, ty in win): c = "b worker 'Operator'"
    elif ("operator", "close") in win: c = "c type 'close'"
    elif any(lo - 180 < t <= lo and w.lower() == "operator" and ty == "session" for t, w, ty in ev): c = "d in prev..prev+180s"
    elif any(at + 180 < t <= at + 900 and w.lower() == "operator" and ty == "session" for t, w, ty in ev): c = "e 3-15 min late"
    elif any(w.lower() == "operator" for w, ty in win): c = "f Operator events, none session/close"
    else: c = "g no Operator event"
    out[c] += 1; prev = at
print(len(rs), sorted(out.items()))
```
{% endraw %}

</div>
