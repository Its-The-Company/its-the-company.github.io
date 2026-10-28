---
layout: "default"
title: "Measurement of OPT-027 and OPT-019 (T-0488, T-0487)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/measure-opt-019-027.md</code></span><span>2026-10-27</span></div><h1>Measurement of OPT-027 and OPT-019 (T-0488, T-0487)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-019">OPT-019</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-027">OPT-027</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-034">OPT-034</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-27 19:49 ET (`date`). Raw sources only: ops/runs and ops/runs-archive streams, ops/usage.json, git history of ops/board.md. Scripts below were run from the repo root (refusals.py from ops/runs); outputs pasted unedited.

## OPT-027: task-ID share of top-level worker-call cost

`python3 tools/metric_series.py` line: tagged_share n=127 centre 0.00272 limits [0, 0.010335]; after 2026-10-25T23:25 (OPT-027): n=15 mean 0.976673 SIGNAL up.

Pooled over the same 15 work sessions (pool.py, tools/metric_series.sessions + tools/ops_metrics.analyse_run):

```
sessions=15 calls=316 tagged_calls=294 cost=673.44 tagged_cost=633.50 share=0.9407 call_share=0.9304
('2026-10-25T23:48', 4.22, '[tools] OPS audit 2: losses in the 23:48 session')
('2026-10-25T23:48', 0.92, '[test] tests leak localhost files into the shared robots cache')
('2026-10-26T01:36', 1.25, '[plan] Ines rules on DPLA 3.3.1(B) findings')
('2026-10-26T01:36', 0.92, '[plan] Ines rules L5 s5.9 questions')
('2026-10-26T01:36', 1.03, '[tools] board owner parse after task ID')
('2026-10-26T19:38', 1.97, '[plan] Day 5 evening priorities')
('2026-10-26T19:38', 0.0, '[site] Lock in toggle then T-0177')
('2026-10-26T19:38', 3.85, '[ops] why no session ran 03:00-18:00')
('2026-10-26T19:38', 8.1, '[build] Lock in toggle then T-0177')
('2026-10-26T19:38', 1.4, '[plan] L5 s5.9 open questions Q-T227-1 Q-T226-1 Q-T235-1')
('2026-10-26T19:38', 1.86, '[design] IDE mockup dark card colours fix')
('2026-10-26T19:38', 2.28, '[test] evening green sweep of all suites')
('2026-10-26T19:38', 1.63, '[plan] revenue gap decision from launch plan')
('2026-10-26T19:38', 0.57, '[plan] L5 Q-T251-1 pending-only rows bound')
('2026-10-26T19:38', 1.34, '[tools] fetch_cite apple page lost on save')
('2026-10-26T19:38', 1.66, '[review] pkg_sandbox wrapper security review')
('2026-10-26T19:38', 1.07, '[plan] Q-T252-1 module contexts ruling')
('2026-10-26T22:05', 1.51, '[plan] board refill for alpha')
('2026-10-26T22:05', 1.71, '[tools] experiments check fix and auto_apply state')
('2026-10-26T22:05', 0.98, '[plan] report overhaul plan and board lines')
('2026-10-26T22:05', 0.68, '[design] report design references study')
('2026-10-27T00:02', 1.01, '[plan] Day 6 priorities and state trim')
```

Agent calls the hook refused in those 15 sessions (refusals.py; is_error tool results carrying model-guard's kind-tag text, with the refused call's description):

```
20261025-234823 ('Agent', '[site] T-0083 site IA 2 Issues/Overview')
20261025-234823 ('Agent', '[site] T-0084 Documents folders')
20261025-234823 ('Agent', '[ops] T-0004 OPS-5 ledger remainder')
20261026-013629 ('Agent', '[ops] T-0163 OPT-034 offline replay')
20261026-022551 ('Agent', 'ui module fixtures')
20261026-022551 ('Agent', 'scene and objc_util fixtures')
20261026-193827 ('Agent', '[site] Lock in toggle then T-0177')
20261026-193827 ('Agent', '[site] T-0203 Infrastructure workflow page')
20261026-220528 ('Agent', '[site] T-0313 Infrastructure diffs')
20261027-085911 ('Agent', '[decision] T-0430 Button/Toggle taps in v1')
20261027-102336 ('Agent', '[writing] T-0372 remaining decision cards')
20261027-102336 ('Agent', 'Haiku comprehension check on card')
```

```python
# pool.py
import sys, os
sys.path.insert(0, "tools")
import metric_series as ms
rows, _ = ms.sessions(".", streams=True)
import ops_metrics as om
workers = om.known_workers(".")
tc=tot=0.0; n=nt=0; ns=0; untagged=[]
for x in rows:
    if x["label"] < "2026-10-25T23:25" or x["type"] != "work": continue
    try: parts, tops, cov, _ = om.analyse_run(".", x["rec"], workers)
    except Exception as e: print("unreadable", x["label"], e); continue
    if cov <= 0: print("no stream", x["label"]); continue
    ns += 1
    for t in tops:
        n += 1; tot += t["cost"]
        if t.get("task"): nt += 1; tc += t["cost"]
        else: untagged.append((x["label"], round(t["cost"],2), (t.get("desc") or t.get("description") or "")[:70]))
print(f"sessions={ns} calls={n} tagged_calls={nt} cost={tot:.2f} tagged_cost={tc:.2f} share={tc/tot:.4f} call_share={nt/n:.4f}")
for u in untagged: print(u)
```

```python
# refusals.py (run in ops/runs with the 15 session streams as arguments)
import json, sys
for f in sys.argv[1:]:
    uses = {}; 
    for line in open(f):
        try: o = json.loads(line)
        except Exception: continue
        msg = o.get("message") or {}
        cont = msg.get("content") if isinstance(msg, dict) else None
        if not isinstance(cont, list): continue
        for b in cont:
            if not isinstance(b, dict): continue
            if b.get("type") == "tool_use":
                uses[b.get("id")] = (b.get("name"), (b.get("input") or {}).get("description"))
            if b.get("type") == "tool_result" and b.get("is_error") and "Start the description with the kind of work" in json.dumps(b):
                print(f[:15], uses.get(b.get("tool_use_id")))
```

## OPT-019: board.py stale-deps

Every `python3 tools/board.py stale-deps` run in any stream since 2026-10-24 19:33 (sd_runs.py; timestamps UTC; lines listed = 'line N:' rows in the recorded output, a lower bound where the caller piped through tail or cut):

```
20261027-181343	2026-10-27T23:48	0	
20261024-201259	2026-10-25T00:13	2	
20261025-030435	2026-10-25T07:07	4	
20261025-030435	2026-10-25T07:18	5	
20261025-040020	2026-10-25T08:00	8	
20261025-040020	2026-10-25T08:02	8	
20261025-040020	2026-10-25T08:10	1	
20261025-053724	2026-10-25T09:37	2	
20261025-063608	2026-10-25T10:36	2	
invocations 9 sessions 6 lines listed (sum, with repeats) 32
```

Fate of each distinct listed line: the first commit after its first listing that ticks, holds ([b]) or adds 'runnable now' to it (fate.py over git log -p of ops/board.md; times UTC):

```
2026-10-25T00:13 | Ines, P2, T1 triage, then chair, for H177, H1 | held [b] 4faf02d4 2026-10-25T02:43
2026-10-25T00:13 | Ines, P3, refill 22 falsifier score (end of D | held [b] db7092f3 2026-10-25T08:12
2026-10-25T07:07 | Odalys, P2, refill 26 red team applied (after | ticked 398c3b0f 2026-10-25T07:15
2026-10-25T07:07 | Ines, P2, T1 triage for H219, H220 and H221 a | ticked 1446a1fc 2026-10-25T07:14
2026-10-25T07:07 | Wrenna, P2, acting chair T1 triage for H222 ( | ticked 1446a1fc 2026-10-25T07:14
2026-10-25T07:07 | Wrenna, P3, plain-English who-for rows for ev | ticked 1446a1fc 2026-10-25T07:14
2026-10-25T07:18 | Ines, P1, v2 grading pass as H113-H121 land ( | ticked db7092f3 2026-10-25T08:12
2026-10-25T07:18 | Ines, P3, refill 23 falsifier score (end of D | held [b] db7092f3 2026-10-25T08:12
2026-10-25T07:18 | Ines, P2, T1 triage for H207, H208, H209 and  | ticked 67f6a5a5 2026-10-25T07:44
2026-10-25T08:00 | Ines, P2, T1 triage for H225, H226, H227, H22 | ticked db7092f3 2026-10-25T08:12
2026-10-25T08:00 | Wrenna, P2, acting chair T1 triage for H228 ( | ticked db7092f3 2026-10-25T08:12
2026-10-25T08:00 | Odalys, P2, L27 rules applied (after H230 and | ticked db7092f3 2026-10-25T08:12
2026-10-25T08:00 | Odalys, P2, R28-1 applied (after H235; G9: ne | ticked db7092f3 2026-10-25T08:12
2026-10-25T09:37 | Odalys, P2, R31-1 applied for H250 and H251,  | ticked 6246095e 2026-10-25T10:03
2026-10-25T10:36 | Odalys, P2, R32-1 applied (after H258; refill | ticked 66ff5453 2026-10-25T11:04
```

The three holds carry the chair's reason in the line: H177-H180 (4faf02d4, Operator 10-24 22:43 ET, and db7092f3, Ines 04:12 'stale-deps checked by hand ... score after 20:00 ET today, not before'); refill 22 score (db7092f3: 'H194 has no T1 row yet'); refill 23 score (db7092f3: waiting until 2026-10-28, a Day 6 score date). Board at 19:49 ET: 138 open lines, 0 with an 'after Hnnn' clause, 34 with 'after T-nnnn'; stale-deps lists 0.

```python
# sd_runs.py (argv: repo root, first stream stem)
import json, sys, gzip, os, re
root = sys.argv[1]; since = sys.argv[2]  # e.g. 20261024-1933
RUN = re.compile(r"(^|[;&|\s])python3\s+(\S*/)?tools/board\.py\s+stale-deps")
rows = []; ALL = []
for d in ("ops/runs", "ops/runs-archive"):
    p = os.path.join(root, d)
    for f in sorted(os.listdir(p)):
        if not re.match(r"\d{8}-\d{6}-\w+\.jsonl(\.gz)?$", f) or f[:13] < since[:13]: continue
        op = gzip.open if f.endswith(".gz") else open
        uses = {}
        for line in op(os.path.join(p, f), "rt"):
            if "stale-deps" not in line: continue
            try: o = json.loads(line)
            except Exception: continue
            m = o.get("message"); c = m.get("content") if isinstance(m, dict) else None
            if not isinstance(c, list): continue
            for b in c:
                if not isinstance(b, dict): continue
                if b.get("type") == "tool_use" and b.get("name") == "Bash" and RUN.search((b.get("input") or {}).get("command", "")):
                    uses[b["id"]] = o.get("timestamp", "")
                elif b.get("type") == "tool_result" and b.get("tool_use_id") in uses:
                    t = b.get("content"); t = t if isinstance(t, str) else " ".join(x.get("text", "") for x in t if isinstance(x, dict))
                    listed = re.findall(r"^line (\d+): (.{0,70})", t, re.M); ALL.extend((uses[b["tool_use_id"]][:16], x[1]) for x in listed)
                    rows.append((f[:15], uses[b["tool_use_id"]][:16], len(listed), "nothing" if not listed and ("nothing" in t.lower() or "Exit code 1" in t) else ""))
for r in rows: print(*r, sep="\t")
print("invocations", len(rows), "sessions", len({r[0] for r in rows}), "lines listed (sum, with repeats)", sum(r[2] for r in rows))
import json as J; J.dump(ALL, open("/tmp/odx/listed.json","w"))
```

```python
# fate.py
import json, subprocess, re, datetime as dt
a = json.load(open("/tmp/odx/listed.json")); first = {}
for t, x in a: first.setdefault(x, t)
log = subprocess.run(["git","-C","[local folder]","log","--since=2026-10-24 19:33","--reverse","--format=@@C %h %aI","-U0","-p","--","ops/board.md"],capture_output=True,text=True).stdout
commits=[]; cur=None
for ln in log.splitlines():
    if ln.startswith("@@C "): h, d = ln[4:].split(" "); cur=[h, dt.datetime.fromisoformat(d).astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M"), [], []]; commits.append(cur)
    elif cur and ln.startswith("-- ["): cur[2].append(ln[1:])
    elif cur and ln.startswith("+- ["): cur[3].append(ln[1:])
def core(s): return re.sub(r"^- \[.\] \[\w+\] (T-\d+ )?", "", s)
res = {}
for x, t in first.items():
    key = x[:60]
    out = "no change after listing"
    for h, d, rem, add in commits:
        if d < t: continue
        r = [l for l in rem if core(l).startswith(key)]
        n = [l for l in add if core(l).startswith(key)]
        if not r and not n: continue
        if r and not n: out = f"removed {h} {d}"; break
        a1 = n[0]; r1 = r[0] if r else ""
        if a1.startswith("- [x]"): out = f"ticked {h} {d}"; break
        if "runnable now" in a1 and "runnable now" not in r1: out = f"re-marked runnable {h} {d}"; break
        if a1.startswith("- [b]") and not r1.startswith("- [b]"): out = f"held [b] {h} {d}"; break
        out = f"edited (note) {h} {d}: " + a1[len(r1):][:90] if a1.startswith(r1) else f"edited {h} {d}"
        # keep walking past notes
        continue
    res[x] = out
    print(t, "|", x[:45], "|", out[:160])
```
{% endraw %}

</div>
