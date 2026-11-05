---
layout: "default"
title: "Home&#x27;s Machine bubble and the Task lifecycle page"
section: "documents"
description: "T-2279, Maren, 2026-11-04. Brief: an Investor on #41, c6647253735. Data: Odalys, T-2278 (ops/machines.json, tools/task_stages.py). Builder: the next board line."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/machine-and-lifecycle.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/design/site/machine-and-lifecycle.md</code></span></div><h1>Home's Machine bubble and the Task lifecycle page</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-2279, Maren, 2026-11-04. Brief: an Investor on #41, c6647253735. Data: Odalys, T-2278 (`ops/machines.json`, `tools/task_stages.py`). Builder: the next board line.

Frames: `frames/machine-*`, `frames/lifecycle-*`, `frames/task-*`, at 390 and 1280 px, light and dark, PNG and SVG. Drawn by `draw_machine.py` from rectangles, lines, text and the code-drawn portraits, with `draw_site.py`'s tokens and helpers (Commandment 9: no generative tool). Every figure in a frame is a sample. `python3 draw_machine.py --check`: 42 pairs, all pass (text 4.5:1, marks 3:1).

## 1. Inside the approved look

Everything here uses the parts approved on #170 (creative/approved.md item 6): the bubbles and their panel, the card, the `.idb` number badge, the amber "waits on" chip, the drive pictures (Q4), the tokens. Three new marks are drawn from those same colours: a phone outline for a Simulator, a red or green dot for one test run, and a four-step stage track. The MacBook's disk is drawn as a laptop under the same rule as the drives: grey used, green free, red dashes at 10 GB. My reading is that these are new states in the same components, so no <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> request. If Ines reads the laptop or the stage track as a new element, they go to the Investors with these frames as previews.

No fifth tab. Task lifecycle is a page under Home (`/tasks/`, the Home tab stays marked), reached from the Machine panel, the Work panel and any task card. One task's status is `/tasks/T-1776.html`.

## 2. The Machine bubble (frames machine-*)

- **Closed:** three figures: tests running now (both machines), free disk on the Mac mini, free disk on the MacBook. At 390 the first two show.
- **Open:** one card per machine, side by side at 1280, stacked at 390. Each card, top to bottom:
  - name, and when it was last read ("read 1 min ago"; for the MacBook "checked in 4 min ago, on power");
  - **Memory:** free GB, total, memory pressure in a word, and a line of the last 5 hours;
  - **Disk:** each drive as its picture with free GB, and a line of free space over 5 hours with the 10 GB stop as red dashes;
  - **Simulators:** how many are booted, one filled phone each, an empty phone for each one there is room for; under it, each booted Simulator's name and the task using it; a line of the count over 5 hours;
  - **Test queue:** the job running now (task name, number, test or build, which Simulator, minutes), then "Next" with the waiting task numbers in order, a phone beside those that need a Simulator;
  - processes, against the 2,666 limit.
- A machine not heard from in 40 minutes shows "not heard from since 20:12" and no figures. A missing reading shows a dash, never a guess.
- "Task lifecycle ›" at the top right goes to the page.

## 3. The Task lifecycle page (frames lifecycle-*)

Top to bottom:

1. **Where the waiting went**, last 24 hours. One bar split by cause, then each cause with its hours and how many tasks it held up: Claude usage limits (blue), build slot or Simulator (amber), merging (dark grey), disk space (red), another task (dashed outline). This answers the Investors' question first: which part of the process slows us down.
2. **Test queues and merging.** One <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> each for the Mac mini, the MacBook and Merging: what is in it now, and what is next, in order. Merging shows the try count and the last refusal in plain words.
3. **Running.** One card per task: portraits, name, number, a Simulator chip if it needs one, and the stage track: Coding, Testing, Review, Merging. Done steps carry a tick, the current one is blue. Inside Testing, one dot per test run: red cross failed, green tick passed, dashed ring running. The words say the same ("2 failed, 1 running"), so colour is never the only sign.
4. **Queued**, in the order they will start. A task that waits on another queued task sits indented under it with a connector; one that waits on a running task carries the "waits on T-…" chip only. 5 rows, then "7 more".

At 390 the cause figures are 2 across, lanes stack their parts, and the run dots move under the name.

## 4. One task's status (frames task-*)

Opens from any task on Home or this page. Number, start time, name, owner and model, Simulator chip; "Now:" in one sentence; the stage track; a time strip (coding grey, each test run red, green or dashed, waits underneath in their cause colour, with times); then each step as a line ("20:53 Test run 1 on the Mac mini: 3 of 40 failed"); then merging.

## 5. Fields the design needs

For Odalys's JSON. Times are ISO with offset; sizes in GB with one decimal. A field the collector cannot read is `null`, and the page shows a dash.

**`ops/machines.json`** (now), `machines`: one entry each for `mini` and `macbook`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 5. Fields the design needs, scrolls sideways" style="--tw:960px" markdown="1">

| Field | What it is | Shown as |
| --- | --- | --- |
| `id`, `name` | `mini` / `macbook`, "Mac mini" / "MacBook" | card title |
| `read_at` | when this reading was taken (MacBook: last check-in) | "read 1 min ago"; over 40 min, "not heard from" |
| `power` | MacBook only: `ac` or `battery`, and `battery_pct` | "on power" |
| `ram.free_gb`, `ram.total_gb`, `ram.pressure` | free memory, total, `normal` / `warn` / `critical` | Memory |
| `disks[]`: `name`, `free_gb`, `total_gb`, `mounted` | Mac mini internal, Company SSD; MacBook internal | drive pictures |
| `stop_gb`, `resume_gb` | where runs stop and restart (10, 20) | red dashes |
| `processes`, `process_limit` | count and 2,666 | Processes line |
| `sims_booted[]`: `name`, `task` | each booted Simulator and the task using it (`null` if none) | phones and list |
| `sim_room` | how many more fit by free memory; leave `null` if there is no honest estimate, and only the booted phones are drawn | empty phones, "room for 1 more" |
| `xc.now`: `task`, `action`, `sim`, `since` | the job holding the build slot | Test queue "now" |
| `xc.queue[]`: `task`, `action`, `needs_sim`, `queued_at` | waiting jobs in order | "Next" |

</div>


**History, for the 5-hour lines:** one line per machine per tick in `ops/metrics/machines.jsonl`: `at`, `id`, `ram_free_gb`, `disk_free_gb` (the drive the runs stop on), `sims_booted`, `xc_queue`. The page reads the last 5 hours (20 ticks at 15 minutes).

**`tools/task_stages.py` output** (say `ops/task-stages.json`), `tasks[]`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 5. Fields the design needs, scrolls sideways" style="--tw:640px" markdown="1">

| Field | What it is |
| --- | --- |
| `id`, `name`, `owners[]`, `model` | task number, its stored plain name (four-sections.md section 8), workers |
| `state` | `running`, `queued`, `landed` |
| `queue_pos` | order among queued tasks |
| `needs_sim` | does it run tests on a Simulator |
| `waits_on[]` | task numbers it waits for |
| `stage` | `coding`, `testing`, `review`, `merging`, `landed` |
| `machine` | `mini`, `macbook` or `null` |
| `stages[]`: `stage`, `start`, `end` | each stretch, in order (coding can come back after a failed test) |
| `tests[]`: `at`, `machine`, `result` (`red`, `green`, `running`), `failed`, `executed`, `job` | each test run |
| `waits[]`: `cause`, `start`, `end`, `note` | `cause` is one of `usage`, `slot`, `disk`, `merge`, `depends` |
| `merge`: `tries`, `refusals[]` (`at`, `why` in plain words) | merging |

</div>


And `bottlenecks`: `window_h` (24), `by_cause[]`: `cause`, `hours`, `tasks`. `depends` (waiting on another task) is the one cause T-2278 does not list; it comes from `waits_on` and the board, and if it costs too much it can be left out and the bar has four parts.

## 6. For the builder

Generated at build time, no script needed to read it; the time lines and bars are SVG drawn by the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>. Clicking a task is a link. Measure each changed page's gzipped bytes before and after. Check at 390 and 1280, light and dark, against these frames.
{% endraw %}

</div>
