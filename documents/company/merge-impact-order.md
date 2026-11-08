---
layout: "default"
title: "Merge fixes in impact order (T-3422)"
section: "documents"
description: "The shares (0.5, 0.25) and the default are guesses, stated as guesses. The after-reads below are what replaces them."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/merge-impact-order.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/merge-impact-order.md</code></span></div><h1>Merge fixes in impact order (T-3422)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. Source: Investor an Investor, #41 c6717736981 (00:28 2026-11-08), a standing rule in amendments.md:
hand out the highest-impact process and merge fixes first. No Claude in the loop (Tenet 7).

## Before

- tools/dispatch.py order_tasks: strong stale flag last, then merge-first, old Investor lines, process-first, group,
  priority, board order. Inside merge-first, ties fell to those later keys: a P0 status display went ahead of a P1
  fix that unblocks every land.
- tools/merge_first.py order (tools/merge_queue.py, the tools/personal_land.sh retry order): merge-first lines first,
  then the file's own order. ops/merge_first.txt has no impact order.
- At build time (2026-11-08 02:17 ET): 87 IDs on the list, 28 of them open on the board; 1 of the 28 (T-3069) has an
  experiment in log/optimizations.md whose prediction is a number.

## The score

One unit: extra lands a day. For each open listed line, the first of these that applies (tools/merge_first.py
score_map):

1. Prediction. Every experiment block whose `source:` names the ID. Forms read: "at least X ... (before Y)" about lands
   an hour, (X - Y) x 24; "from A ... to under B" about retry lines, (A - B) over the window's days (due - started,
   2 when missing), each retired line counted as one attempt saved; "N land-minutes saved a day", N / 6.7 (host check
   median 401.5 s, OPT-102 before, n=32). The largest, after scaling: an after-read that missed (verdict says
   "missed") x0.5; reverted, stopped or no effect x0.25; met or in flight x1. When an after-read lands, its verdict is
   in the ledger, so the next call reads the scaled number.
2. Stated. An `impact=N` token on the line in ops/merge_first.txt (a person's figure, or a tools/merge_replay.py read
   written there). merge_replay's policies today map to closed tasks (T-3079, T-3084, T-3086, OPT-099), so it scores
   no open line yet.
3. Estimate, from the line's title and the live retry queue (ops/personal_retry.txt, non-comment lines), read fresh:
   - a read, check, judge, audit, confirm or measure title: 0.5 (it lands nothing itself);
   - a blocker title (lands stop, main red, unblock, stops/fails every land) or a body that says it unblocks the merge
     queue or the lands: 0.5 x live lines;
   - an xc title (xc, MacBook, Simulator, Xcode): 0.5 x live lines with an xc check;
   - a queue title (retry, backlog, conflict, rebase, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>, parallel, at once, faster, batch): 0.25 x live lines.
4. Default: 1.0.

The shares (0.5, 0.25) and the default are guesses, stated as guesses. The after-reads below are what replaces them.

## Where it is used

- tools/dispatch.py order_tasks: right after "not merge-first", the key is minus the score; the old keys break ties.
  `dispatch.py order` shows `first(<score>)`. Each task carries `impact` (score, method).
- tools/merge_first.py order(): merge-first items by score, highest first, stable among equals. tools/merge_queue.py
  (merge_first.order) and tools/personal_land.sh retry_one and its feed (`merge_first.py order --field 2`) follow it
  with no change of their own (T-3419 works in those files now). A joined label takes its best listed ID's score.
- The T-3090 sync (supervisor tick, `merge_first.py sync --commit`): after the list update it ranks the open listed
  lines and appends one line to ops/metrics/merge_impact.jsonl (time, live and xc retry lines, <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">top 10</span> with method).
- `python3 tools/merge_first.py rank [--json]`: the ranking now, with the method beside each score.
- Every call reads the ledger, board and retry file again (about 0.1 s under python3 -I), so each tick's order
  sees that tick's queue. Any error in scoring gives no scores: the T-2904 order, never a failed hand-out or land.

## Not covered

- The MacBook runner (tools/macbook-runner/runner.py) reads main's ops/merge_first.txt as a set and keeps created order
  among merge-first jobs. Hook for it: `merge_first.py rank --json`, or score_map(); the runner change is its own task.
- tools/merge_queue.py passes ids(its ROOT) but the scores come from merge_first's ROOT (MF_ROOT or the checkout); in
  production they are the same checkout.

## How it is judged

- Rank agreement: at each after-read of a scored line, the measured effect against its score. After n=10 reads,
  Spearman rank correlation of score and measured gain; under 0.3 means the estimate classes are noise and the
  shares go back to a flat default.
- Queue: live retry lines (ops/metrics/retry_queue.jsonl live_after) and lands a day, 7 days before and after, read
  beside OPT-117 and the T-3419 read; this change only reorders, so its own effect is the time to the first land of
  the top-ranked fixes against their board age, not a separate lands number.

Tests: tests/merge_first_test.py (T-3422 rows), tests/dispatch_test.py (test_merge_first_ranked_by_impact,
test_merge_first_impact_default_and_failure), tests/merge_first_auto_test.py unchanged and green.
{% endraw %}

</div>
