---
layout: "default"
title: "T-4010: This Session as a full flowchart (plan and mock-ups)"
section: "documents"
description: "T-4666 will not land. It left the board on 11-17 at 7:01 AM by an Investor&#x27;s ruling of 6:45 AM (#41 c6947112898): process changes not yet built return only at an Investor&#x27;s request\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4010-flowchart.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/T-4010-flowchart.md</code></span></div><h1>T-4010: This Session as a full flowchart (plan and mock-ups)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by Odalys, 2026-11-19, for board line T-4010 (Investor an Investor #41 c6769610237, 9:14 AM 11-10 ET). This is
the line's first step only: mock-ups for the Investors to choose from, and the plan behind them. Nothing on the live
site changes until they pick.

## What the Investors asked for (the line and log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md)

- A flowchart, starting at Investor messages or the Operator and ending at main at the bottom.
- A node for each running task at its stage: merging, waiting to merge, testing and where, waiting to test.
- The version of main each step runs under.
- Batched or combined steps, and tasks grouped into one test run, drawn so they are visible.
- Click a line between two nodes to read the messages passed along it: workers' status posts, the Operator's
  instructions, the Investors' messages.
- Completed tasks shown, with a toggle that hides them; the task queue shown; near real-time.
- It follows workflow changes from the code; technical where needed but human-readable.
- A complete redo: every table on the page today goes and none is carried over; no emojis (c6797513466, 11-11).
- Start rules: the audit implementation done (ops/plans/audit-implementation-resume.md reads STATUS: done, met), and
  built after the efficiency batch T-4666 lands or with its remaining fixes in mind (c6936208952, 11-16).

T-4666 will not land. It left the board on 11-17 at 7:01 AM by an Investor's ruling of 6:45 AM (#41 c6947112898):
process changes not yet built return only at an Investor's request (documents/process-changes-not-built.md). So the
chart is built "with its fixes in mind": it draws batching from what the code records today (feature sessions,
tools/feature_session.py, and their batch rows in ops/metrics/batch_size.jsonl), and because it reads the stage list and
the batch record from the code, a batch rule brought back later shows up on the chart without a redesign.

## The page today

/company/session.html is tools/site/session_page.py, the T-3996 page: stages as columns, workers as rows, each task's
history in a fold. The T-3297 flowchart of commit cbe8c4f191 (drawn for a coordinator that never ran) was removed by
T-3996; nothing of it is left. The redo replaces session_page.py's drawing whole. It keeps T-3996's one-source rule
(Investors 11-10: Home and This Session read the same records) and its honest gaps ("not recorded" where a record is
missing, never a guess).

## The three mock-ups

All in ops/plans/T-4010-mockups/, drawn by draw.py from fixture.py (made-up tasks T-9xxx, made-up times and commits;
the company's own worker characters; accounts by role label; no Investor named). Code-drawn HTML and SVG in the site's
own colour tokens, light and dark (creative/approved.md items 1 and 6). Open a.html, b.html or c.html in a browser;
screenshots are in shots/ (1280 light and dark, 390 light, and one with the message panel open).

- **A, Stage bands.** Top to bottom: where work comes from (Investor messages, Operator), the task queue and the
  dispatcher, then one band per stage (Building, Merge Queue, Testing, Simulator Queue, Simulator) with the task
  cards inside, a Sent Back box beside them, and main at the bottom with the finished tasks. Testing and the Simulator
  bands split into Mac mini and MacBook. A batch is a dashed blue outline round its tasks; a shared test run a dashed
  green one. Each card names the main it runs on, and an amber chip when main has moved since. The arrows between
  bands carry a "3 messages" button. It reads like the Home task list turned into a flow, works at 390 wide without
  sideways scrolling, and each new stage in the code is one more band.
- **B, One track per task.** Each task is a vertical line from its start square (filled: asked in an Investor
  message; hollow: put on the queue by the Operator) through the stage rows to the main bar. A ring marks where it is,
  with minutes there; a step the task does not need is left blank in its row (the 11-11 ruling's rule for skipped
  steps); a send-back curves back up to Building. Batches and shared test runs are outlines across tracks. Best for
  seeing each task's path and time at a glance; needs sideways scrolling at 390 and gets wide past about 20 tasks.
- **C, Who holds the work.** Boxes are the people and machines (Investors, Operator, task queue, dispatcher, each
  worker with their account, Merge Queue, Mac mini, MacBook, main); task chips sit in the box that holds them; arrows
  are the lines they talk on, each with its message count. Best for the "messages passed between them" part; the
  stage of a task is read from which box it is in, so the stages are less direct, and it needs sideways scrolling at
  390.

Recommendation: **A.** It is the closest reading of the request (top to bottom, a node per task at its stage, main
last), the only one that fits a phone without sideways scrolling, and the one that follows code changes most simply:
a band per stage in tools/flow.py. B's per-task path can live inside A: clicking a task in A opens its history (the
same panel B shows).

## What each node and line needs, and where it comes from

Everything comes from a record the code already writes, read through the reader that owns it, so a change in the
workflow's code changes the chart. Where no record exists yet, the gap is named and the build slice that closes it.

- **Stages (the bands, B's rows).** tools/flow.py STAGES, WORDS and LINE, drawn in that order, leaving out the end
  states (merged, reset, archived) and old with_author. A stage added to flow.py becomes a band with no page change.
  The Investors' names (Building, Merge Queue, Testing, Simulator Queue, Simulator, Sent Back) come from the same map
  Home uses (session_page.py and home_flow.py today), moved to one place in slice 1.
- **Each task's node.** flow.now(): its stage, since when, its retry, its worker; flow.rows_of() for its history (the
  click). Title: the board's Title slot as flow rows carry it. Account: tools/flow.py handouts() (the dispatcher's
  hand-out rows, ops/metrics/handout.jsonl).
- **Where it is tested.** The flow row's check.where (mini or macbook). Simulator Queue rows exist from 11-12.
- **The main it runs on.** ops/metrics/main_gate.jsonl verdict and red rows carry base (the main commit the land was
  tested on) and commit, by task and job. Gap: flow rows do not carry base. Slice 1 joins them by task and job (or adds
  a base field to flow rows where the land writes them); "main moved since" is base against main's tip at read time.
  A worker's own build step names no main today; the card says "not recorded" there.
- **Batches.** ops/metrics/batch_size.jsonl rows of event batch: feature, tasks, size, where. Today that record holds 2
  batch rows (since 11-19), both of size 1, so the live chart would draw no batch outline yet; it draws one whenever a
  row lists two or more tasks.
- **Grouped test runs.** One main_gate job that tests more than one task. Gap: verdict rows name one task each and no
  record yet ties two tasks to one run; the group outline is drawn from batch rows at a merge point (one land for the
  batch's tasks) and otherwise not drawn. Said on the page as a gap until a record holds it.
- **Investor messages (top node).** ops/inbox/messages.jsonl (tools/inbox.py): count since the session started, the
  last one's time; the text only to a reader with an Investor's token, as Chat does.
- **The Operator (top node).** The work session's start and state: agents_now and session_facts, as Home reads them.
- **Task queue.** tools/site/tasks_panel.py queued_items(), the same list Home's Queued card reads; the first few by
  name, the rest as a count. Queue moves: ops/metrics/queue_order.jsonl (tools/queue_order.py).
- **Dispatcher and accounts.** flow.handouts() and the account limits Home already shows; percent used is dropped
  from the public copy (Commandment 42 scrub, as the T-3296 feed did).
- **Messages on each line.** Operator instructions to a task: ops/runs/workers/<task>.notes.jsonl
  (tools/worker_status.py). Workers' status: ops/runs/workers/<task>.json holds only the latest step, overwritten.
  Gap: slice 3 adds an append-only step log (one row per status post) so a line can show what passed, not just the
  last word. The tools' own notes (hand-out, land, verdict, send-back with its reason): flow rows' why and
  main_gate rows. Investor messages: the inbox record above. Each line shows the messages whose task crossed that
  line in this session; text is scrubbed and, beyond counts, token-only.
- **main and the finished tasks.** flow rows whose outcome is merged or archived since the session started; main's
  versions this session from one git log of main. The "Show finished tasks" toggle hides them in the page, no reload.
- **Near real time.** Built pages are static; the live part rides the COMPANY_STATUS variable read every 30 seconds
  with the token (the T-3296 path in ops/plans/this-session.md, under its own 4,096 B <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>): task ids, stage keys,
  since, where, base, batch. The page redraws positions from it; names and history come from the built page.

## Build slices, after the Investors pick

1. **One reader.** tools/site/session_graph.py gather(): the nodes and lines above as one plain dict, each source in
   its own try (a failed source blanks its own part). Joins main_gate base onto flow rows. Test with a fixture record:
   tests/session_graph_test.py, including a stage added to a test copy of STAGES appearing as a band.
2. **Draw the chosen option.** session_page.py's tables and columns go; the page is drawn from gather(), whole without
   script. Home's This Session link stays. Checks: no table element on the page (a test), no emoji (a test), times
   12-hour, screenshots at 390 and 1280, light and dark, inside the site's byte budgets.
3. **Messages on the lines.** The append-only status log (tools/worker_status.py writes a row per post), the panel
   that lists a line's messages, token-gated text.
4. **Live.** The compact feed in live_status, the 30-second redraw, the finished-tasks toggle kept across redraws.

Each slice lands on its own; the old page stays until slice 2 is checked. Slices 1 and 3 change tools/, so each runs
tests/run.sh. Slice 2 is site code, not headed to TestFlight, so Commandment 10 review is not required; I would still
ask Maren to look at the drawn page against the chosen mock-up.

## Not in this step

No live page, no change to tools/ or the site. The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> ref 16f4d87e3f holds only test-fixture values over
ops/usage_mode.json; nothing in it is brought over.
{% endraw %}

</div>
