---
layout: "default"
title: "Merge fixes in impact order (T-3422)"
section: "documents"
description: "The shares (0.5, 0.25) and the default are guesses, stated as guesses. The after-reads below are what replaces them. T-3573 changed step 1 (prediction); the section &quot;Corrected scores&quot; below has the rule and the\u2026"
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
T-3573 changed step 1 (prediction); the section "Corrected scores" below has the rule and the before/after table.

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

## Suite order by failure history (T-3449, Odalys; merge-outside-practice row 12 is not on main or here)

Change: tools/suite_order.py orders suites by red rate in ops/runs/test-runs.jsonl (last 14 days; reds / rows that named the
suite), then shortest median seconds; unseen suites keep their order, after the reds. Used by personal_land.sh (before
tests/run.sh; run.sh now starts named Python suites in the order named), merge_queue.py run_checks (stops at first red) and
the gate's Gate.run (starts suites before host and xc). No Xcode. Unchanged: where a run stops or continues.

Measure: `python3 tools/suite_order.py --replay` replays every red row that named 2+ suites (n = 9 of 69 rows; the log has
6 days, 2026-11-02..08). Order chosen from rows before each run only. Sequential model: first red = seconds of the suites up
to and including the first red one; a suite's seconds = median wall_s of rows naming it alone (else the row's wall_s / suites).
- Seconds to first red, order as given: median 91, mean 156.
- Ordered: median 193, mean 193. Better 1, same 6, worse 2.
Reading: no win shown, a loss on two runs. 11-05 (3 suites all red; history put the 355 s one first) and 11-07 (12 site
suites; a past red, site_personal_test, led). Where several suites are red together the cheapest red should lead; the rank
sees only past rates. n = 9, so I did not tune it to these. Per-suite seconds are not logged (only wall_s), which makes the
time terms guesses. Next: log per-suite seconds and red in tests/run.sh, then re-read at n = 20 ordered red runs. Revert: remove the
suite_order lines in the three callers.

T-3490 re-measure (Odalys, 2026-11-08 12:10 ET): the log now has 42 red rows naming 2+ suites (was 9). `suite_order.py --replay`:
seconds to first red, as given median 122, mean 264; ordered median 92, mean 209; better 21, same 16, worse 5. So the order
is faster on the larger sample, and tools/suite_order.py stays in personal_land.sh, tests/run.sh and merge_queue.py. Caveats:
per-suite seconds are still estimated from wall_s for these rows, and rows after 03:47 on 11-08 already ran in the ordered
order, so "as given" is not independent. tests/run.sh now writes `suite_s` (each suite's own seconds) per row; re-read when
20 red multi-suite rows carry it.

## Corrected scores (T-3573, Odalys, 2026-11-08)

Why: the 08:19 tick (ops/metrics/merge_impact.jsonl row 4) ranked T-3300 first at 702.5 lands a day from OPT-121.
Two faults: OPT-121 is T-3419's experiment and only names T-3300 in its source; and the per-hour pattern paired "at
least 30 lower 7 days on" (retry lines) with "before 0.73" (a share of trains held), then x24. an Investor asked what
the scores mean (#41 c6722332170). Rule now (tools/merge_first.py reading, own_task, score_map):

1. A prediction scores only its experiment's own task: a `task:` field, else the first ID in `source:`. OPT-121 ->
   T-3419, OPT-122 -> T-3408, OPT-115 and OPT-117 -> T-3069. Other IDs in a source get nothing from it.
2. Every form is read inside one clause (text between ";"). A land rate needs "lands/landed per (an) hour" in that
   clause, and "at least N lower/fewer" is never a rate.
3. Lines cleared are named as lines. "from A to under B" -> (A - B) / window days; "at least N lower D days on" -> N /
   the longer of D and the window (OPT-122's 12-h level drop is 30 over its 7-day window, not 60 a day). A line leaves
   the live list by a land or a prune. When the prediction counts prunes (drops, repeats, same-patches, retry-record),
   lines x 0.25 (PRUNED_SHARE). That 0.25 is a judgment: in retry_queue.jsonl 1326 lines were pruned in 44 ticks
   (11-05 12:08 to 11-08 09:46), none of them a land; OPT-115's own text says landed attempts a day "do not fall", so
   its lands figure may be near 0. 0.25 credits only the retries a pruned line no longer spends.
4. Each method starts with its kind. Measured: a figure read from the logs. Predicted: an experiment's own number.
   Guessed: anything with a judgment share or factor in it (the estimate shares 0.5 and 0.25, the read score 0.5, the
   default 1, PRUNED_SHARE, and the after-read factors x0.5 missed and x0.25 undone).

Today no score is measured or predicted: all 36 open lines are guessed. T-3419 (no open board line)
would score 4.3 predicted; T-3069 takes the larger of OPT-115 (10.4 guessed) and OPT-117 (6.7 predicted lands). The
first measured numbers come with the after-reads (OPT-115 and OPT-117 by 11-09, OPT-121 and OPT-122 by 11-15).

Ranking at 2026-11-08 10:18 ET (`merge_first.py rank`, live 133, xc 58; before = the code at a6b8ffb05, same inputs).
T-3300 is ticked and no longer ranked; at 08:19 it led with 702.5.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Corrected scores (T-3573, Odalys, 2026-11-08), scrolls sideways" data-n="4 5" style="--tw:933px" markdown="1">

| Now | ID | Was | Before | After | Kind and method (after) |
|---|---|---|---|---|---|
| 1 | T-3361 | 1 | 66.5 | 66.5 | guessed: blocker share 0.5 x 133 live retry lines |
| 2 | T-3448 | 2 | 66.5 | 66.5 | guessed: blocker share 0.5 x 133 live retry lines |
| 3 | T-2586 | 4 | 33.2 | 33.2 | guessed: queue share 0.25 x 133 live retry lines |
| 4 | T-3341 | 36 | 0 | 33.2 | guessed: queue share 0.25 x 133 (was OPT-122, T-3408's experiment, misread as (30 - 145) x 24, floored at 0) |
| 5 | T-3420 | 5 | 33.2 | 33.2 | guessed: queue share 0.25 x 133 live retry lines |
| 6 | T-3431 | 6 | 29 | 29 | guessed: xc share 0.5 x 58 live xc retry lines |
| 7 | T-3452 | 7 | 29 | 29 | guessed: xc share 0.5 x 58 live xc retry lines |
| 8 | T-3568 | 8 | 29 | 29 | guessed: xc share 0.5 x 58 live xc retry lines |
| 9 | T-3069 | 3 | 41.5 | 10.4 | guessed: OPT-115 41.5 lines cleared a day, prunes included, x0.25 |
| 10-29 | T-1069, T-2208, T-2719, T-2950, T-2958, T-3301, T-3312, T-3313, T-3315, T-3332, T-3365, T-3383, T-3445, T-3446, T-3447, T-3451, T-3490, T-3569, T-3570, T-3573 | 9-28 | 1 | 1 | guessed: default 1 |
| 30-36 | T-2953, T-3087, T-3211, T-3320, T-3352, T-3444, T-3450 | 29-35 | 0.5 | 0.5 | guessed: read, lands nothing itself |

</div>


What did not change: the estimate classes, their shares and the default (T-3422). The top two are still guesses at
66.5 each; that is half the live retry list, and it is a judgment, not a measurement. The test of the whole ranking
is still the Spearman read at n=10 after-reads (How it is judged).

Tests: tests/merge_first_test.py T-3573 rows (today's OPT-121, OPT-115 and OPT-122 texts: T-3419 4.3, T-3300 and
T-3341 nothing, OPT-115 discounted and named, OPT-117 still read as a land rate, each method's kind).
{% endraw %}

</div>
