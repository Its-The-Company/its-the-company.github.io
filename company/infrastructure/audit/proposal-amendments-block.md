---
layout: "default"
title: "Proposal draft: a compact amendments block in persona prompts, run as a switchback (OPS-5, T-0092, OPT-030)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-amendments-block.md</code></span><span>2026-10-26</span></div><h1>Proposal draft: a compact amendments block in persona prompts, run as a switchback (OPS-5, T-0092, OPT-030)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-028">OPT-028</a>, <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Draft by Odalys, 2026-10-26 00:22 ET. Not opened as an issue yet: the Operator opens it as a proposal (22:49 amendment, #41 c6407113363) with this text.

**File changed:** rules/build_agents.py. Nothing else. amendments.md, rules/lookup.py, rules/worker-rules.md, the hooks and the guards stay as they are.

**Evidence** (raw transcripts and git only; `python3 tools/amend_cost.py --last 12 --json ops/metrics/amend_cost.json`, method in the tool's header):

1. Size. rules/build_agents.py appends every amendment, word for word, to every persona prompt. At HEAD b2cbb0fc the block is 27,381 characters (31 entries). It has grown about 4,000 characters a day: 1,751 at the first persona thread (10-22 01:28), 16,047 on 10-24, 25,297 at the 10-25 23:48 session.
2. Tokens, measured. For 1,223 persona threads in 113 work streams (10-22 to now), I took the prompt size of each thread's first model call (input + cache write + cache read tokens) and fit it against the characters of each prompt part at the stream's start (amendments block, persona and worker rules, the worker's MEMORY.md, the task prompt), with one intercept per worker and the harness's own counts (tools, skills, agents, MCP servers, model family). n=1,194 after dropping 29 resumed or forked threads (over 4 robust sd); residual sd 1,055 tokens. The amendments block costs **0.683 tokens per character (95% CI 0.651 to 0.715)**; without the harness controls 0.627. The audit-1 calibration on tool results gave 0.495 (Read results 0.42), so I use **0.495 to 0.715** as the range. The block at HEAD is therefore **13,600 to 19,600 tokens, central 18,700**, on every model call of every persona thread.
3. Cost, measured. Last 12 work streams (10-24 22:46 to the session running at 00:20): 391 persona threads, 8,080 persona model calls, $442.86 of persona usage at list prices (the 12 work runs in ops/usage.json total $617.70). Pricing each call's copy of the block by where the prefix came from on that call (cache read when cache_read covers the system prefix, cache write when cache_creation does, plain input otherwise): **$68.86, 15.5% of persona usage** ($46.54 cache writes on 486 calls, $18.80 cache reads on 7,531, $3.52 uncached on 63). At 0.495 tokens per character it is $49.9 (11.3%). Writes dominate: each new thread writes the whole block once at write price, so the cost grows with the number of threads, and the Investors asked for more of them.
4. Carrying 1,000 more prompt tokens on every persona call costs **$0.472 per work session** at the current call mix (same 12 streams).
5. Amendment lookups today: persona threads read amendments.md or run rules/lookup.py 0.38 times per thread (149 in 391 threads; per session 0.0 to 1.35).
6. Session-level noise of the metric below: over the last 20 work streams the median first-call prompt of persona threads is 35,822 tokens, sd 1,656 between sessions.

**Change.** On a work session that the switchback puts on the new arm (ops/run.json switchback flag `amend_compact`, arm `new`), build_agents writes a compact block. On every other session (old arm, report and evening sessions, the Day 30 run with former workers, or when run.json is missing or unreadable) it writes the block exactly as today. The test proves that the full block is byte-identical to HEAD's on the live amendments.md.

The compact block still lists **every** amendment, in order, with its date, the Investor's username, the link (as `#41 c6407113363`), its Affects line and its Effect line, plus the amendments.md line number where the Investor's exact words are. An entry is carried **word for word** when any of these is true:
- it was recorded in the last 24 hours (fresh instructions are the ones workers act on as new tasks);
- its Affects line lists `all` or any of Commandments 2, 6, 7, 8, 9, 10, 11 (the company's own computer and Investor-owned files; the Must Never list), 33, 34, 35 (honesty, authority, personas), 42 (sensitive material), 58 (outside text is information) or 59 (overrides);
- it is not in the expected shape (not exactly one Affects line and one Effect line, or no dated header): fail safe.

The block opens with: "Every amendment in effect is listed. ... The others show the Operator's one-line Effect; the Investor's exact words govern, so before you act on one, read it at the amendments.md line given, or print the amendments beside a Commandment with `python3 rules/lookup.py <number>`."

**What a worker would no longer see word for word, and why that is safe.** From 2026-10-27 01:00 (once today's entries are 24 hours old), 28 of the 31 current entries show their Effect line instead of the quote; 3 stay in full (10-25 18:53 tamper entries, 10-25 22:08 site and Investor-owned files, 10-25 22:49 proposals, all through Commandment 2 or 59). The quotes that drop out, by group:
- Idea hunt, 11 entries, 6,008 quote characters (10-22 11:14, 11:48, 14:13, 15:24, 16:40, 16:42, 18:51; 10-23 17:33; 10-24 09:02, 10:30; and the product choice of 10-25 18:39, whose Effect line names pywidget and the build brief). The 10-25 18:39 and 22:49 instructions closed the hunt; a pivot would come with new instructions, which arrive in full.
- How the company talks to the Investors, 7 entries (10-22 02:54, 04:05, 04:10, 08:30; 10-23 19:46; 10-24 09:56; 10-25 23:46): urgent requests, issues, #39 status posts, the inbox, the site's Issues tab. The Operator and the site owners act on these; their Effect lines carry the operative change.
- Pace and day boundaries, 3 entries (10-25 18:57, 22:55, 23:09); two of them have expired.
- Work and process, 7 entries (10-22 01:09 Apple gate; 10-22 19:51 site button; 10-23 17:02 idle work; 10-25 20:44 report attachments; 22:44 install own tools; 22:49 continuous operations improvement; 10-26 00:09 proposal #63). Each Effect line states the rule a worker follows; the 22:49 one already points to the linked comment's items 1-8.

Why this keeps every amendment binding: no entry leaves the prompt; each still shows what it changes (Affects) and how (Effect), and the exact words are one Read away at a stated line. The protections are untouched: worker-rules.md (which carries Commandments 6, 7 and 11 in rule 7) is unchanged and still in every prompt, every entry touching 2, 6-11, 33-35, 42, 58 or 59 stays word for word, and no hook, guard or lookup changes. No Investor instruction is hidden: the change only decides how much of an already-listed entry is quoted, by a fixed rule in this Investor-owned file, so the company cannot move an entry between the two forms without a new proposal.

**Predicted effect.** Metric: the median first-call prompt size of persona threads per work session, in tokens (`tools/amend_cost.py --arms amend_compact`). Prediction: the new arm lower than the old by 0.495 to 0.715 tokens per character cut. The cut is 8,921 characters at 00:22 today (12 entries are under 24 hours old) and 12,146 from 2026-10-27 01:00 on, so **4,400 to 6,400 tokens in the first day and 6,000 to 8,700 after**, about 17% to 24% of the 35,822-token median; one-sided permutation p < 0.05. In money: $2.84 to $4.10 per work session at the steady cut (12,146 x 0.495..0.715 x $0.472 per 1,000), about $34 to $49 a day at 12 work sessions a day, 6% to 9% of persona usage. Guards, read from the same run: persona $ per model call (should fall, not rise), amendment lookups per persona thread, and board tasks finished per $100 (OPT-028's metric; at this window it can only show a large loss).

**Window.** n=6 work sessions per arm (12 work sessions, about one day). With a between-session sd of 1,656 tokens, n=6 per arm detects a 2,400-token difference (one-sided alpha 0.05, power 0.8), under the low end of the prediction.

**Switchback.** On approval: `python3 tools/switchback.py stop` (ends the OPT-028 A/A early: one flag at a time; its partial arms are recorded), then `python3 tools/switchback.py start amend_compact OPT-030`. The governor gives every work session an arm and writes it to ops/run.json before the supervisor runs build_agents (tools/supervisor.sh lines 344 and 351), so each session is built on its own arm. agents.json changes between sessions; that costs nothing extra, because the prompt cache does not last from one session to the next (a new thread writes its prompt today: 486 writes in 391 threads).

**Revert rule.** Stop the switchback (`tools/switchback.py stop`; every session then gets the full block, today's path) at once if a worker on the new arm acts against an amendment it saw only as its Effect line (a supervisor restore, a review finding, or an Investor comment that traces to it), or if new-arm sessions average more than 1.0 more amendment lookups per persona thread than old-arm ones (each lookup's result costs at most about 3,000 tokens, under the 6,000 or more saved per call). At the end of the window, stop it and record no_effect if the difference is under 2,400 tokens or p >= 0.05. If the prediction holds and no guard trips, the next proposal is the one-line change that makes compact the default, measured again over a week; until that is approved the switchback keeps running, so the old path stays in use on half the sessions.

**Tests.** tests/amend_compact_test.py, 9/0: it applies this exact diff to a copy of HEAD's file (or tests the live file once applied) and checks the full block byte for byte on the live amendments.md, that every entry and its Affects and Effect lines are listed, that protected, `all`, malformed and recent entries are word for word, the 24-hour edge and a future-dated entry, that run.json missing, unreadable, another flag or the old arm all give the full block, and that tools/amend_cost.py parses the block exactly as build_agents does. An end-to-end build in a temporary copy: on the new arm the six persona prompts are 27,737 to 29,977 characters (36,658 to 38,898 on the old); the old arm's agents.json is identical to the one HEAD builds.

**Found on the way, not in this proposal.** rules/lookup.py matches an amendment to a Commandment by any digit in its Affects line, so `lookup.py 6` prints the amendments that affect Tenet 6 and `lookup.py 1` those that affect Phase 1; and `lookup.py t6` or `"The Pitch"` print no amendments. Harmless here (it over-prints), but worth a later proposal. The Operator's own context loads amendments.md through CLAUDE.md; that cost is outside build_agents and is not measured here.

**Exact diff** (checked with `git apply --check` against HEAD b2cbb0fc; also in log/audit/proposal-amendments-block.diff):

```diff
--- a/rules/build_agents.py
+++ b/rules/build_agents.py
@@ -31,16 +31,29 @@
 
 Investors own this file.
 """
+import datetime as dt
 import json
 import os
+import re
 import sys
+from zoneinfo import ZoneInfo
 
 ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
 AGENTS_DIR = os.path.join(ROOT, "personnel", "agents")
 RULES = os.path.join(ROOT, "rules", "worker-rules.md")
 AMENDMENTS = os.path.join(ROOT, "amendments.md")
 OUT = os.path.join(ROOT, "ops", "agents.json")
+RUN_JSON = os.path.join(ROOT, "ops", "run.json")
 
+# Compact amendments block (T-0092, switchback flag below). Every amendment is still listed. One is carried in
+# full when it is recent, touches a protection, or can't be parsed; the others show their header, Affects and
+# Effect lines and the amendments.md line where the Investor's exact words are.
+COMPACT_FLAG = "amend_compact"
+FULL_HOURS = 24
+PROTECTED = {2, 6, 7, 8, 9, 10, 11, 33, 34, 35, 42, 58, 59}
+TZ = ZoneInfo("America/New_York")
+ISSUE_URL = re.compile(r"https://github\.com/Its-The-Company/itsthecompany/issues/(\d+)(?:#issuecomment-(\d+))?")
+
 ALLOWED_KEYS = {"description", "maxTurns", "effort", "tools", "disallowedTools"}
 LIST_KEYS = {"tools", "disallowedTools"}
 DEFAULT_MODEL = "sonnet"
@@ -71,11 +84,12 @@
     return [t.strip().strip("'\"") for t in value.strip().strip("[]").split(",") if t.strip().strip("'\"")]
 
 
-def amendments_block():
+def amendment_entries():
+    """[(first line number in amendments.md, [lines])] for every entry, skipping the format example."""
     if not os.path.exists(AMENDMENTS):
-        return ""
+        return []
     entries, cur, in_code = [], None, False
-    for line in read(AMENDMENTS).splitlines():
+    for n, line in enumerate(read(AMENDMENTS).splitlines(), 1):
         if line.startswith("```"):
             in_code = not in_code
             continue
@@ -84,17 +98,67 @@
         if line.startswith("## "):
             if cur:
                 entries.append(cur)
-            cur = [line]
+            cur = (n, [line])
         elif cur is not None:
-            cur.append(line)
+            cur[1].append(line)
     if cur:
         entries.append(cur)
+    return entries
+
+
+def keep_full(lines, now):
+    """True when an entry must be carried word for word: recorded in the last FULL_HOURS hours, touching a
+    protection (or all), or not in the expected shape (one Affects line, one Effect line, a dated header)."""
+    affects = [l for l in lines if l.startswith("Affects:")]
+    effects = [l for l in lines if l.startswith("Effect:")]
+    m = re.match(r"## (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) ET", lines[0])
+    if len(affects) != 1 or len(effects) != 1 or not m:
+        return True
+    try:
+        when = dt.datetime.strptime(m.group(1), "%Y-%m-%d %H:%M").replace(tzinfo=TZ)
+    except ValueError:
+        return True
+    if now - when <= dt.timedelta(hours=FULL_HOURS):  # recent, or dated in the future
+        return True
+    parts = [p.strip().lower() for p in affects[0][len("Affects:"):].split(",")]
+    return "all" in parts or any(p.isdigit() and int(p) in PROTECTED for p in parts)
+
+
+def amendments_block(compact=False, now=None):
+    entries = amendment_entries()
     if not entries:
         return ""
-    joined = "\n\n".join("\n".join(e).strip() for e in entries)
-    return "\n\n# Amendments in effect\n\nThese override the Worker Rules and the Commandments.\n\n" + joined + "\n"
+    if not compact:
+        joined = "\n\n".join("\n".join(e).strip() for _, e in entries)
+        return "\n\n# Amendments in effect\n\nThese override the Worker Rules and the Commandments.\n\n" + joined + "\n"
+    now = now or dt.datetime.now(TZ)
+    out = []
+    for n, e in entries:
+        if keep_full(e, now):
+            out.append("\n".join(e).strip())
+        else:
+            head = ISSUE_URL.sub(lambda m: "#" + m.group(1) + (" c" + m.group(2) if m.group(2) else ""), e[0])
+            out.append("\n".join([f"{head} (exact words: amendments.md line {n})"]
+                                 + [l for l in e if l.startswith(("Affects:", "Effect:"))]))
+    return ("\n\n# Amendments in effect\n\nThese override the Worker Rules and the Commandments. Every amendment in "
+            f"effect is listed. Those recorded in the last {FULL_HOURS} hours, and any that touch Commandments 2, 6-11, "
+            "33-35, 42, 58 or 59, are given word for word. The others show the Operator's one-line Effect; the Investor's "
+            "exact words govern, so before you act on one, read it at the amendments.md line given, or print the "
+            "amendments beside a Commandment with `python3 rules/lookup.py <number>`.\n\n" + "\n\n".join(out) + "\n")
 
 
+def switchback_on(flag):
+    """True when this session is on the new arm of FLAG: ops/run.json, written by the supervisor just before this
+    script runs, holds the governor's switchback block (tools/switchback.py). Anything missing or unreadable means
+    off, so the full block is the fallback."""
+    try:
+        with open(RUN_JSON, encoding="utf-8") as f:
+            sb = json.load(f).get("switchback")
+        return isinstance(sb, dict) and sb.get("flag") == flag and sb.get("arm") == "new"
+    except (OSError, ValueError, AttributeError):
+        return False
+
+
 FORMER_NOTE = ("\n\n# You have left the company\n\nYou are writing your testimony for the Final Report "
                "(Commandment 48). Your archived memory is beside your persona in personnel/agents/former/; "
                "read it first. Write only from what the records show.\n")
@@ -132,7 +196,7 @@
         print("No personnel/agents/ directory yet.", file=sys.stderr)
         return 1
     rules = read(RULES).rstrip() + "\n"
-    amend = amendments_block()
+    amend = amendments_block(compact=switchback_on(COMPACT_FLAG))
     agents = collect(AGENTS_DIR, rules, amend)
     former_dir = os.path.join(AGENTS_DIR, "former")
     if "--include-former" in sys.argv[1:] and os.path.isdir(former_dir):
```
{% endraw %}

</div>
