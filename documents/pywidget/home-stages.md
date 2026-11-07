---
layout: "default"
title: "Home around the task stages, and This Session"
section: "documents"
description: "T-2469, Maren, 2026-11-05. Brief: an Investor on #41, c6650882035 and c6651209360; T-2480 (c6651474906) folded in. Builder: Odalys. Replaces Home&#x27;s Running and Queued groups; the separate Task Lifecycle page from T-2279\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/home-stages.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/design/site/home-stages.md</code></span></div><h1>Home around the task stages, and This Session</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-2469, Maren, 2026-11-05. Brief: an Investor on #41, c6650882035 and c6651209360; T-2480 (c6651474906) folded in. Builder: Odalys. Replaces Home's Running and Queued groups; the separate Task Lifecycle page from T-2279 (df1fa5a7a) goes, its parts move here.

Frames (SVG and PNG, `frames/`): `home2-{1280,390}-{light,dark}` (all panels closed), `home2-usage-{1280,390}-{light,dark}` (Usage open), `session-{1280,390}-{light,dark}` (This Session). Drawn by `draw_home.py` and `draw_workflow.py`. `python3 draw_home.py --check`: 30 pairs, 0 fail (text 4.5:1, marks 3:1). Commandment 9: rectangles, lines, text and the code-drawn portraits; no generative tool. Every figure is a sample.

## Home, top to bottom

1. **This Session** strip (new). The session's path as chips: steps done (tick, accent-soft with accent edge), the current step (accent fill, minutes), the next (dashed muted). Model to the right. The whole strip opens This Session. **Lock In** sits here as one small outline button (T-2480); the Controls panel is gone.
2. **Bubbles**: Usage, Money and time, Machine, **Bottlenecks**. The Work bubble is removed (point 6). Bottlenecks is my call on point 7: its own bubble, opening T-2279's "Where the waiting went" panel unchanged except its title. Machine keeps memory and disks; its "Task lifecycle ›" link goes.
3. **Usage** open (T-2480): main account and each personal account (letters A, B, C on the site, as now) with a 5-hour and a weekly bar, pace tick, reset time; an account at its limit shows its bar in `--hot` and "<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> paused to HH:MM" in words. Then API credits: company credits and each personal key (key-a, key-b), green bars. Data: `ops/personal_meter/`.
4. **Team**, as approved.
5. **Running** with stage filter and sort. Default sort: last stage first, Merging > Merge queue > Review > Testing > Test queue > Coding; ties by minutes in stage, longest first. Filter chips: All (selected, ink fill) and one per stage with its count; each chip carries the stage's mark (blue dot for an active stage, dashed grey square for a queue). Sort control flips to first stage first. Each card: portraits, name, owners · model · minutes, number badge, one short note (Simulator and run, merge try, reviewer, queue position), and the six-stage track. 1280: labelled segments, done ones ticked. 390: unlabelled 10 px bars (done `--ok`, current blue or grey dashed, later outline) plus the stage chip, which says the stage in words.
6. **Queued**: not started, in start order, with Simulator and "waits on" chips.
7. Running shows 4 cards at 1280 and 3 at 390; Queued shows 4. "Show N more" expands in place and becomes "Show fewer"; the choice is kept in `localStorage`.
8. **Simulators** (bottom): one card per Simulator, so the Mac Mini's two appear apart, each with its device and its task (blue block). Then the **Simulator queue**, one list shared by all Simulators: the first free Simulator takes the next. Rows: order, clock, portrait, name, badge, minutes waiting.
9. **Merging** (bottom, its own panel): the change merging now (blue block, try count, last refusal) and the **Merge queue** under it.

The 1280 side column (Latest report, Needs you) stays beside Running and Queued.

## Active and queued

Blue (`--accent` on `--accent-soft`, solid edge, filled dot) means it is happening now: Coding, Testing, Review, Merging, a Simulator's task, the merge in progress. A queue (Test queue, Merge queue, the two queue panels) is grey: `--grey-bg` ground, 1 px dashed `--grey-fg` edge, a clock mark, text in `--grey-fg` (light 10.2:1, dark 10.3:1). Colour is never the only sign: the stage is always named, and "waiting N min" is in words.

## This Session (was Workflow)

A page opened from the strip, back link "‹ Home"; no longer a document under Reports > Infrastructure. No task list (the Now panel's Running tasks block is gone; it links "Tasks are on Home ›"). The path taken is live: every arrow between two steps done this tick, or into the current step, is 3 px `--accent`; the overview chips before the current one carry a tick and an accent edge, with accent arrows; the current step keeps its 3 px box and "Now · N min" badge; the governor's picked rule keeps its accent row. The live file is `ops/workflow-now.json` as in workflow.md section 6; `done[]` drives the path.

## Fields the build needs

- Per running task: `stage` (one of the six, from `ops/task-stages.json`), `stage_since`, `note` inputs (Simulator id and run number, merge try, reviewer, queue position).
- Per Simulator: `machine`, `n`, `device`, `task` or null.
- `sim_queue[]` and `merge_queue[]`: task, `since`, in order.
- Per account: `five_hour` and `week` percent and pace, `resets_at`, `paused_until`; per key: spent and limit.

## Approval

Inside the approved look (creative/approved.md item 6): bubbles, cards, `.idb`, chips, bars, the stage track. The grey dashed queue style is a new state of the number-badge grey, so I read it as needing no <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> request; the night of 2026-11-04/05 approvals (amendments, c6651295775) cover this redesign.
{% endraw %}

</div>
