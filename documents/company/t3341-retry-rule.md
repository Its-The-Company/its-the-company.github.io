---
layout: "default"
title: "T-3341: how often parked work retries landing, and where the 2:06 PM messages waited"
section: "documents"
description: "A retry is a land attempt naming a task whose previous attempt did not land. Owned-path refusals are counted apart: T-3751 (waiting to land on personal/b68) changes that refusal."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t3341-retry-rule.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/t3341-retry-rule.md</code></span></div><h1>T-3341: how often <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> work retries landing, and where the 2:06 PM messages waited</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-09. Asked by an Investor on #41 (c6711932759, 2:23 PM ET 11-07). Times are ET.

## 1. Retries (tools/retry_stats.py, tick logs 11-03 to 1:09 AM 11-09)

A retry is a land attempt naming a task whose previous attempt did not land. Owned-path refusals are counted apart:
T-3751 (waiting to land on personal/b68) changes that refusal.

1. Owned-path refusals: n=83 retries, 4 passed (5%). Retried with main unchanged: 0 of 41. Within 15 minutes:
   0 of 59. Retrying these is waste until T-3751 lands; nothing here changes them.
2. Every other cause: n=201 retries, 66 passed (33%). By cause: rebase conflict 36/85 (42%), a suite red 19/71 (27%),
   xcodebuild 3/11, worktree missing 3/15, out of time 3/5.
3. Main unchanged since the failure: 2 of 20 passed (10%). Main moved: 64 of 181 (35%).
4. What came before each pass (n=66): another commit naming the same task reached main first 32; main changed the
   branch's own files 26; main moved elsewhere and the work changed 4; same work, nothing relevant changed (flake or
   load) at most 4. So a pass is almost always main moving past the cause, not time passing.
5. By time since the failure: 15 min or less 4/43 (9%); 15-60 min 10/35 (29%); 1-3 h 14/38 (37%); 3-12 h 9/35 (26%);
   over 12 h 29/50 (58%). The hour is not the variable; the 15-minute row is low because main had not moved yet.
6. The hourly stamp: 334 "a retry waits" tick lines. In 149 (45%) the same slot then started no session at all
   (weekly limit 65, Spread pool 0 30, 5-hour hold 20, an owned file dirty 14, settings check 12, paused 5, other 3);
   in 180 (54%) a session started. In those 149 the stamp held the retry for a session that never came.

## 2. Rule

- Written, not landed: when the stamp held a retry back and the account's hold then starts no session (a preflight
  refusal or Spread's pool 0), the retry goes back to land in that tick, as a no-task tick's retry already does. A pause
  still holds it. It covers about 130 of the 149 idle waits (not the 14 with an owned file dirty). The patch is
  ops/plans/t3341-idle-retry.patch: tools/personal_tick.sh retry_if_idle, two "T-3341" rows in
  tests/personal_off_test.sh, and Home's Parked note (tools/site/home_look.py, one string: "once an hour, sooner when its
  account has no session to run"). Red first, n=1: on HEAD the weekly-limit row failed and the pause row passed. The
  green run after the change was refused by the auto-mode classifier (the command also stopped earlier runs of the
  suite by name), so the item stopped there; the live files were put back and nothing of it is committed. Left: run
  tests/personal_off_test.sh with the patch applied, then commit through main_gate.
- Proposed, not done (T-3768): retry a parked line only when main has moved since its last failure (row 3: 10% vs 35%),
  and for owned-path refusals only once T-3751 lands. That needs the main commit of each failure kept beside the retry
  line in tools/personal_land.sh, a larger change.

## 3. The 2:06 PM to 2:24 PM 11-07 messages (ops/inbox/latency.jsonl, ops/runs/personal-tick-{a,b}.log)

n=5 messages, sent 2:06-2:23 PM, first replies 3:13 PM and 3:24 PM, both by <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a3 (61-78 minutes).

1. Lanes a and a2 were free but held: every tick 2:03-3:05 PM said "no session: this account's 5-hour window is at 91%"
   (the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> is 90%). Nothing let a reply start past that hold.
2. Lanes b, b2, b3: "no session: this account's weekly limit is reached" 2:15-3:11 PM. The main account was at its
   weekly limit too.
3. Lane a3 was inside a task session that began 12:30 PM; it took the messages only near its end.

Fix: T-3346 (df68b6765, edc842026, landed 5:58 AM 11-08) lets a reply start on any account that is held but not out.
After it: n=36 messages from 6:00 AM 11-08 to 1:00 AM 11-09, median 86 s, max 573 s; 3 over 5 minutes (573 s, 390 s,
331 s). Those three are T-3769. T-3346's own board line is still open; its owner should tick it.

## After-read

- `python3 tools/retry_stats.py --since 2026-11-10`: the idle line ("no session this tick, so the held retry goes back to
  land") appears and the "next line no session" share of stamp waits falls toward 0. Owned-path rows after T-3751.
{% endraw %}

</div>
