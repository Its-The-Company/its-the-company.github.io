---
layout: "default"
title: "This Session flowchart (Plan mode, an Investor #41)"
section: "documents"
description: "A flowchart of how the company&#x27;s work runs, live, so the Investors see at a glance where every piece of work is."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/this-session.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/this-session.md</code></span></div><h1>This Session flowchart (Plan mode, an Investor #41)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by the Operator, 2026-11-07 10:1x ET, from Evan's Plan mode answers: c6708569654 (ask), c6708675175 and
c6708725795 (answers); company questions c6708703496 and the 09:59 block. Builds on ops/plans/sessions-main-vs-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.md,
ops/plans/one-dispatcher.md and ops/plans/one-coordinator.md (T-3247, being written now).

## The goal

A flowchart of how the company's work runs, live, so the Investors see at a glance where every piece of work is.

## What the answers decided


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the answers decided, scrolls sideways" style="--tw:442px" markdown="1">

| Question | Answer |
| --- | --- |
| Where it lives | Both: a simplified flowchart inside Home's This Session panel, linking to a full page with the whole chart. |
| How live | Re-read every 30 s with the token saved in the browser, as Chat does (Home's status already reads the live COMPANY_STATUS variable every 5 s; the chart uses that feed). |
| Which flow | The one-coordinator flow only: one coordinating session; each account (main plan, personal accounts, API keys) is drawn as a source of workers, not as its own lane. Today's per-account sessions are not drawn. |
| Priority | The coordinator steps are built first, at P1, right after the main-branch test gate (T-3288). |
| Path shown | The current step highlighted; steps already passed shaded, each with the time spent at it. |

</div>


## Steps

1. **Coordinator** (Odalys, P1, after T-3288): the steps in ops/plans/one-coordinator.md, on top of T-2641 (cut the old
   per-account split, running now), T-2677 (the dispatcher's own clock) and T-2719 (main work in its own copies).
2. **Step feed** (Odalys, P1, after step 1's first runnable slice): the coordinator writes each task's step changes
   (claimed, packet out, worker running on account X, tests queued, tests on the MacBook, landing, landed or failed, with
   start time) into the live status, so a chart needs no extra reads.
3. **Design** (Maren, P1, may start now from ops/plans/one-coordinator.md): frames for the simplified panel and the full
   page, light and dark, 390 and 1280 wide: one coordinator box, account sources feeding workers, the task path with the
   current step highlighted and passed steps shaded with time spent. Code-drawn (Commandment 9), inside the approved look.
4. **Build** (Odalys, P1, after 2 and 3): panel and full page from Maren's frames, reading the feed every 30 s with the
   token (public status.json for visitors), inside the site's byte budgets and the scrub (Commandment 42). The saved
   patch in scratch T-2667-odalys/this-session.patch is a starting point only where it fits the new flow. Built ahead
   of step 2 (T-3297): the chart turns on from the feed; the shape it reads is below. The saved patch was gone.

## The step feed: the exact shape (T-3296 builds to this; T-3297's chart reads it)

Written by Odalys, 2026-11-07, for T-3297. Maren's table (ops/site-checks/t3295/spec.md) is the source; this tightens it
where it was loose: the time format, totals, a step run twice or skipped, and the size. The chart (tools/site/assets/session.js,
sample in tests/site_session_chart_test.py) is built to it and needs no change when the feed starts.

Five keys join the existing `session` block of COMPANY_STATUS and status.json (`active`, `kind`, `started` stay):

```json
"session": {
  "coord": {"active": true, "started": 1794074520, "restarts": 1, "last_handoff": 1794083220},
  "sources": [{"label": "Main plan", "kind": "plan", "slots": 3, "until": null, "pct": 62}],
  "flow": [{"t": "T-3291", "name": "One badge for every failed widget status", "w": "Idris", "acct": "Personal a",
            "steps": [{"s": "claimed", "at": 1794092000}, {"s": "packet", "at": 1794092060}, {"s": "worker", "at": 1794092180}]}],
  "flow_n": 8,
  "done": [{"t": "T-3300", "name": "Land outside the tick", "w": "Odalys", "acct": "Main plan", "steps": [],
            "end": "failed", "end_at": 1794091000, "why": "merge check failed"}],
  "landed": 2, "failed": 1,
  "beside": [{"job": "Lands", "every": "every 60 s, and when a MacBook land reports", "last": 1794093780, "doing": "landing T-3291"}]
}
```

- **The switch.** The chart draws only while `coord.active` is the JSON value true. No `coord`, or false, is the coming
  state: T-3296 writes `coord` once the coordinator runs, and false or nothing under COORD=0.
- **Times** in these keys are whole Unix seconds (`started`, `last_handoff`, `until`, `at`, `end_at`, `last`). An ISO time
  costs 12 to 17 B more each, 700 B or more on the sample's 60 times.
- **`steps[]`** is in time order, one entry per entry into a step, `s` one of claimed, packet, worker, testq, macbook,
  landing. The last entry is the step now. A step the task skips has no entry (the chart shows it passed, with a dash).
  A task sent back (a red test, back to worker) gets a new entry: time at a step adds up, and steps past it show as
  ahead again.
- **`acct`** equals a `sources[].label`, set from the worker step on. A worker dot and a card's task IDs are the `flow`
  rows whose last step is worker with that `acct`. **`w`** is the worker's first name, as in `tasks.run`.
- **`until`** is when an account at a limit comes back, null otherwise; a past `until` reads as not at a limit.
- **`pct`** is week used, a number, in the variable only. **public_view(issues=False) must drop it from every source**
  (T-0944, Commandment 42). The chart also draws no percent from a public read, but that does not take it out of the file.
- **`done[]`** is newest first, the tasks finished since `coord.started`, `end` one of landed or failed, `why` plain words
  (failed only). **`landed` and `failed`** are the totals since `coord.started`, so the count stays right when `done` is cut.
- **`flow_n`** is the number of tasks in flight, needed only when `flow` was cut for size (the chart says how many
  didn't fit); left out, it is `flow`'s length. Cut from the end, nearest the start of the path.
- **`beside[]`**: `job` names each job; the row named exactly "Lands" is drawn on its own on Home, every other row
  counts as the jobs loop. `every` is plain words; Home shows the part before the first comma. `doing` is optional.
- **Scrub and size.** All text is written through the scrub (Commandment 42): `name` is the board's plain name, `why`
  and `doing` plain words with no paths, links or issue numbers, accounts by role label only. `public_full` passes only named keys, so
  these five need adding there. Measured: the sample (8 in flight, 3 finished, 5 accounts, 7 jobs) is 3,745 B compact.
  The variable already sits at its <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>: 7,541 of 7,680 B on 2026-11-07 15:19 with 11 trim steps applied (n=1, 24 personal
  rows), so the feed does not fit in today's 7,680 B without trimming In flight's rows. T-3296 decides how:
  my recommendation is to fit() everything else to today's cap, keep the feed outside fit() under its own cap of
  4,096 B (cut `done`, then `flow`), and raise the variable's limit to match (GitHub's limit is 48 KB; site-dashboard
  plan 4 set 8 KB, so the change is recorded there). status.json has room: 4,060 of 12,288 B in the same reading.

## Risks

- The coordinator is a large change to how sessions run; the chart must not wait on its last step. Step 2 ships with
  its first slice, and the chart draws what the feed carries.
- Until the coordinator is live, the chart would show a flow that isn't running yet; it goes on Home only once the
  coordinator runs (a short "coming" note before that).

## Left out

Today's per-account session view (Evan chose not to draw it), history beyond the current session, and any new tab.
{% endraw %}

</div>
