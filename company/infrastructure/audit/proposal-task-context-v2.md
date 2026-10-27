---
layout: "default"
title: "Proposal task context v2"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-task-context-v2.md</code></span><span>2026-10-26</span></div><h1>Proposal task context v2</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-032">OPT-032</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**What this is, in plain English.** Every worker call today auto-loads that worker's whole notes file (MEMORY.md, median 19,680 B since 00:00 today) on every model call, though about 94% of it names nothing the task touches. This lets a switchback (half the work sessions, alternating) try the other way: on the new arm the worker gets only its identity and standing lessons (802 B to 4,053 B) and fetches a task packet for its board line with `tools/task_context.py`. The old arm is today's build, byte for byte. It is OPT-032, written at 01:17 today on top of OPT-030's diff; OPT-030 never applied and was stopped when you merged PR #71 (19:54), so this is the same change rebuilt against rules/build_agents.py as it stands on main at 6a12854c, with nothing of OPT-030 in it.

## Evidence (raw)

- `python3 tools/context_use.py --since 2026-10-26T00:00` (ops/runs transcripts, 142 persona threads, 00:00 to 20:10 ET): MEMORY.md at thread start median 19,680 B; keyed entries that share a key with the task 7.7%, used share of bytes 6.2%; 34.5 model calls per thread median; 70.3 M tokens of memory carried; orientation (tool calls before the first change) median 13.
- Per work session, median orientation: 20261025-234823 13.0 (50 threads), 20261026-013629 10 (25), 20261026-022551 16 (25), 20261026-193827 12.0 (46); mean 12.75, sd 2.5, n=4.
- Earlier window (10-25 00:00 to 10-26 01:10, 353 threads): memory median 17,513 B, used bytes 5.8%; full numbers in log/audit/proposal-task-context.md.
- Switchback state: ops/switchback.json holds `task_context` / OPT-032 since 19:57:31, waiting for `TASK_CONTEXT_FLAG = "task_context"` in rules/build_agents.py, so no session has an arm yet (n=0).

## Change

One file, rules/build_agents.py: `import re`; `RUN_JSON` and `switchback_on(flag)` (reads ops/run.json's switchback block; missing or unreadable means off); `TASK_CONTEXT_FLAG`, a note and `memory_core(slug)`, a copy of `tools/task_context.core` (copied, not imported, so company code cannot change what this script emits). In `collect()`, only when the session is on the new arm, for a current worker with a MEMORY.md: drop the `memory` key and append the note plus the core to the prompt. The worker rules and the amendments block are emitted exactly as now on both arms; former workers never switch.

## Tests on the exact diff

`git apply --check` clean against origin's rules/build_agents.py at 6a12854c (fetched with `gh api .../contents/rules/build_agents.py?ref=main`; identical to the local HEAD copy). New suite tests/task_context_build_test.py: 9/0 with the diff applied to a temporary copy, and 9/0 with the diff already applied (the live-file case). It checks the off arm byte-identical to today's build under 9 run.json states, the new arm changes only `memory` and the prompt tail, former workers unchanged, `memory_core` equal to `task_context.core` on every worker's MEMORY.md and past the 4 KiB cut; 4 seeded mutants killed. tests/context_trial_test.py covers the tool itself. It replaces tests/amend_compact_test.py (OPT-030's), keeping that suite's amend_cost parser test.

## Predicted effect, metric, window

Metric: per work session, median orientation calls in persona threads, by arm (`tools/context_use.py --rows`). Prediction: new arm at least 3 under old (now about 13); memory carried per thread down by about 80% (guard, reported beside). Window: 6 work sessions per arm; with sd 2.5 a 3-call gap is at the edge, so extend once to 10 per arm if inside the noise.

## Revert rule

`tools/switchback.py stop` (every session back on today's build, no code change needed) at once if a new-arm worker repeats a mistake its standing lessons or memory recorded and the packet left out, or if turn-limit stops or repair commits per 100 commits on the new arm exceed the old arm's over the window. Keep only if orientation drops by 3 or more with no guard tripped; otherwise no_effect and stop.

Auto-apply: no. By #65 item 2 it would qualify (supervisor-revertible by switchback, tested on the exact diff, no protected Commandment, no Investor words changed), but tools/apply_proposal.py treats rules/build_agents.py as a file that carries what workers are shown of your words and sends it to **approve**. It needs your approve; nothing waits on it.

Tests: tests/task_context_build_test.py, tests/context_trial_test.py

```diff
diff --git a/rules/build_agents.py b/rules/build_agents.py
--- a/rules/build_agents.py
+++ b/rules/build_agents.py
@@ -33,6 +33,7 @@
 """
 import json
 import os
+import re
 import sys
 
 ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
@@ -40,6 +41,7 @@
 RULES = os.path.join(ROOT, "rules", "worker-rules.md")
 AMENDMENTS = os.path.join(ROOT, "amendments.md")
 OUT = os.path.join(ROOT, "ops", "agents.json")
+RUN_JSON = os.path.join(ROOT, "ops", "run.json")
 
 ALLOWED_KEYS = {"description", "maxTurns", "effort", "tools", "disallowedTools"}
 LIST_KEYS = {"tools", "disallowedTools"}
@@ -100,6 +102,70 @@
                "read it first. Write only from what the records show.\n")
 
 
+def switchback_on(flag):
+    """True when this session is on the new arm of FLAG: ops/run.json, written by the supervisor just before this
+    script runs, holds the governor's switchback block (tools/switchback.py on()). Anything missing or unreadable
+    means off, so today's build is the fallback."""
+    try:
+        with open(RUN_JSON, encoding="utf-8") as f:
+            sb = json.load(f).get("switchback")
+        return isinstance(sb, dict) and sb.get("flag") == flag and sb.get("arm") == "new"
+    except (OSError, ValueError, AttributeError):
+        return False
+
+
+# Task-scoped context (OPT-032, switchback flag below). On the new arm a worker's MEMORY.md is not auto-loaded;
+# the prompt carries its identity and standing lessons, and the worker fetches its task packet itself.
+TASK_CONTEXT_FLAG = "task_context"
+TASK_CORE_MAX = 4096
+TASK_DATED = re.compile(r"^- \d{4}-\d{2}-\d{2}")
+TASK_KEY = re.compile(r"\bT-\d{4}\b|\bOPT-\d{3}\b|\bH\d{2,3}\b|\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,10}\b"
+                      r"|moved to (?:an? |the )?archive")
+TASK_CONTEXT_NOTE = (
+    "\n\n# Your memory in this session (switchback task_context, OPT-032)\n\n"
+    "Your MEMORY.md is not loaded this session. What it keeps of you is below: identity and standing lessons. "
+    "Your first call is `python3 tools/task_context.py <your task ID> --worker {slug}`: the board line, the files it "
+    "names with their latest commits, the rulings it cites, and your memory entries on that task. Read "
+    ".claude/agent-memory/{slug}/MEMORY.md or archive.md only if that packet leaves a question it should answer. "
+    "At the end, append your dated note to MEMORY.md as Worker Rule 13 says.\n\n{core}")
+
+
+def memory_core(slug):
+    """Identity (entries before the first '## ' heading with no task key and no date) and the '## Standing lessons'
+    section of the worker's MEMORY.md, cut to TASK_CORE_MAX bytes. Same output as tools/task_context.core
+    (tests/task_context_build_test.py holds them equal); copied, not imported, so company code cannot change what
+    this protected script emits. None when the file is missing or yields nothing."""
+    try:
+        with open(os.path.join(ROOT, ".claude", "agent-memory", slug, "MEMORY.md"), encoding="utf-8") as f:
+            text = f.read()
+    except OSError:
+        return None
+    ident, lessons, mode = [], [], "ident"
+    for line in text.splitlines():
+        if line.startswith("## "):
+            mode = "lessons" if "standing lessons" in line.lower() else "skip"
+            if mode == "lessons":
+                lessons.append(line)
+            continue
+        if mode == "ident":
+            ident.append(line)
+        elif mode in ("lessons", "dated"):
+            if TASK_DATED.match(line) or (mode == "dated" and line.startswith("  ")):
+                mode = "dated"
+                continue
+            mode = "lessons"
+            lessons.append(line)
+    ident = [e for e in re.split(r"\n(?=- )", "\n".join(ident)) if not TASK_KEY.search(e) and not TASK_DATED.match(e)]
+    out = ("\n".join(ident).strip() + "\n\n" + "\n".join(lessons).strip()).strip() + "\n"
+    if not out.strip():
+        return None
+    b = out.encode("utf-8")
+    if len(b) > TASK_CORE_MAX:
+        keep = b[:TASK_CORE_MAX].decode("utf-8", "ignore").rsplit("\n", 1)[0]
+        out = keep + f"\n\n(cut at {TASK_CORE_MAX} B of {len(b)} B; run tools/task_context.py for the rest)\n"
+    return out
+
+
 def collect(directory, rules, amend, former=False):
     agents = {}
     for name in sorted(os.listdir(directory)):
@@ -123,6 +189,10 @@
         for key in sorted(ALLOWED_KEYS - {"description", "maxTurns"}):
             if key in meta:
                 entry[key] = as_list(meta[key]) if key in LIST_KEYS else meta[key]
+        core = memory_core(slug) if not former and switchback_on(TASK_CONTEXT_FLAG) else None
+        if core:
+            entry.pop("memory", None)
+            entry["prompt"] += TASK_CONTEXT_NOTE.format(slug=slug, core=core)
         agents[slug] = entry
     return agents
 
```
{% endraw %}

</div>
