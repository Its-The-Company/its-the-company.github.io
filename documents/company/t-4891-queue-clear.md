---
layout: "default"
title: "T-4891: the process and site merge queue, task by task"
section: "documents"
description: "python3 tools/merge_limit.py open --kind other on main at 03:16: exit 0, &quot;new process and site work may start: ... process and site 2 of 8&quot;. The queue was already under its limit when this task started."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4891-queue-clear.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-4891-queue-clear.md</code></span></div><h1>T-4891: the process and site merge queue, task by task</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-19 3:13-3:35 AM ET. Investor an Investor #325 c6978268102 (7:15 AM 11-18). Read-only on main
(`[local folder]` at abbc2ba27c); no limit raised, no check skipped, no ref touched.

## How it was counted

`tools/parked_count.py waiting()` (the one count `tools/merge_limit.py sample` records), called read-only on main's
checkout at 3:15 AM ET 11-19, plus the last recorded row in main's `ops/metrics/waiting.jsonl` (08:09:01Z):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it was counted, scrolls sideways" data-n="5" style="--tw:819px" markdown="1">

| When | Total | App (limit 20) | Process and site (limit 8) | Gate and scheduler (limit 1) |
|---|---|---|---|---|
| 11-18 6:48 AM to 7:51 AM ET (rows 11:48Z, 12:51Z) | 22-23 | 17-18 | **15-16** | 0 |
| 11-18 1:32 PM ET (row 18:32:59Z) | 20 | 17 | 4 | 0 |
| 11-19 3:09 AM ET (row 08:09:01Z) | 13 | 12 | **2** | 0 |
| 11-19 3:15 AM ET (read-only call) | 12 | 11 | **2** | 0 |

</div>


`python3 tools/merge_limit.py open --kind other` on main at 03:16: exit 0, "new process and site work may start:
... process and site 2 of 8". The queue was already under its limit when this task started.

What took it from 15 to 2 was code on main, not hand clearing:

- ddee40ca4e (T-4849, 1:31 PM ET 11-18): a task counts by its code; <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records (memory, lane outbox, task names,
  board, evidence) no longer make an app task count as process. The next row (18:32:59Z) fell from 17 to 4.
- 654bd07d14 (T-4903 parts 1-4, 12:40 PM ET) and d46fe15e44 (T-4903 parts 5-6 and the salvage gap, 7:24 PM ET): <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>
  refs judged by content, salvage-only refs and redo-claimed copies leave the count. The 02:23Z row read 2 total, 1
  process.

So the 15 of 11-18 are not listed one by one here: the count keeps only the last count's IDs
(`ops/runs/.waiting.json`), and most of them were app tasks counted twice for their records (T-4849's 12:0x note:
9 of 13). The rows below are the tasks counted now.

## Where each went

### In the process and site count (2 of 8)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: In the process and site count (2 of 8), scrolls sideways" style="--tw:1274px" markdown="1">

| Task | Owner | Cause | Action | Evidence |
|---|---|---|---|---|
| T-4871 two-way editing figure | Idris, P2 | Nothing wrong: in the merge line (marker a56, tip 9bf9ab6e29) 52 min at the count, rank 13 of 14, behind P1 and P0 lands while the lander (pid 66086, `personal_land.sh land-live`) runs. Counts as process: documents/restructuring/05-timeline.md, ops/milestones.json, ops/plans/T-4266-release-range.py, ops/drafts/t4871-325-comment.md. | Left in the line to land on its turn; no note. | `git cherry main 9bf9ab6e29`: 2 commits main lacks (e9ad46acf3 work, 9bf9ab6e29 tick). `git log 5de6c1feab..main` on its three code paths: empty, so no conflict. Its Done-when (the #325 comment) follows the land. |
| T-5000 transit count-downs | Maren, P1 | Held by main's red Xcode check (T-5046: `land_xc: ... not queued: main is red since c54b61c2c`, in ops/runs/personal-land-a53/a51/a3.log) until the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span>; Xcode jobs J-20261119-0310-land-a53/a51/a3 queued 3:10 AM ET. One patch waits as four copies. Counts as process because tests/showcase_relative_test.py is outside pywidget/. | Left in the line; note on its line (queued in ops/lane-outbox/b2-1795076331937196000-48291.json): four copies of one patch, the first land settles the rest, send no more. No ref archived: main lacks this content. | Same patch-id 01a83d6f93 for 63d914add4 (a53), d47beb8a1f (a51), ef0cffe6bc (a3) and edb728966a (parked/a3/20261119-013950-q67). |

</div>


### Process work the count hides as app (files read empty, counted "app unread")

The count gives a task whose marker holds nothing main lacks the app queue ("unknown is never room"). Three such
markers in the line are process or review work already on main:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Process work the count hides as app (files read empty, counted &quot;app unread&quot;), scrolls sideways" style="--tw:1330px" markdown="1">

| Task | Owner | Cause | Action | Evidence |
|---|---|---|---|---|
| T-5006 Lock In after midnight | Odalys, P0 | On main, line open: marker b40 (tip 0f1b935346) holds only a patch main has; no lane tick was queued with it. | Ticked with a done-note (queued in ops/lane-outbox/b2-1795076320561407000-45721.json; reaches the board when this branch lands). | ef89ec602b on main (2:34 AM ET); `git cherry main 0f1b935346`: '-'; tests/usage_mode_test.py 7/0 at abbc2ba27c; main's ops/lock_in.json: date 2026-11-19, mode midnight, at 05:00:45Z. |
| T-4919 runner cwd | Operator line, P0 | Fix on main (b8faaf4b8c, 12:34 AM ET); the line ticks itself (tools/runner_watch.py) when a later xc-test-launcher job passes, which has not happened yet. | Not ticked by hand: its Done-when is a passing job, not the commit. Rides marker b with T-4899. | `git cherry main bcb82e4e2c`: '-'. |
| T-4932 review of T-4782 | Pernille | Review on main (c0597eec5b, 2:00 AM ET), line open: no tick for it is queued in lane b3's commits (its T-4932 commit 3486fe5eab is '-' there) or in main's ops/lane-outbox. Marker b59 holds only that patch. | Sent back to Pernille with the cause: note on its line (queued in ops/lane-outbox/b2-1795076385428774000-64859.json). Not ticked here: a PASS with findings is the reviewer's to close. | `git cherry main d1289040da`: '-'. |

</div>


The other app-queue tasks (T-4835, T-4899, T-4916, T-4931, T-4933, T-4934, T-5002) are outside this kind and were
not settled here.

## Found, for T-4849 (not built here)

1. Retried lands make copies: T-5000's one patch holds three merge-line markers and a parked ref, so the MacBook was
   given three Xcode jobs for one change at 3:10 AM. The count is by task, so it does not inflate the number, but it
   triples the check cost and the queue length a person reads.
2. A marker whose commits main already has (b40, b59; T-4919 inside b) still sits in the line and counts as "app
   unread" until the lander reaches it. Counting such a marker as settled, not as unknown, would read the app queue
   3 lower now.
{% endraw %}

</div>
