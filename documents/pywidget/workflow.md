---
layout: "default"
title: "Infrastructure &gt; Workflow: diagrams drawn from the graph"
section: "documents"
description: "T-2307, Maren, 2026-11-04. Brief: an Investor on #41, c6647932583. Data: Odalys&#x27;s analysis (T-2306), ops/plans/workflow-analysis.md, and its graph ops/plans/workflow-graph.json (33 nodes, 46 edges after T-2322)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/workflow.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/design/site/workflow.md</code></span></div><h1>Infrastructure &gt; Workflow: diagrams drawn from the graph</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-2307, Maren, 2026-11-04. Brief: an Investor on #41, c6647932583. Data: Odalys's analysis (T-2306), [`ops/plans/workflow-analysis.md`](../company/workflow-analysis.html), and its graph `ops/plans/workflow-graph.json` (33 nodes, 46 edges after T-2322). Builder: T-2308 (Odalys).

Frames: `frames/workflow-1280-light`, `-1280-dark`, `-390-light`, `-390-dark`, SVG and PNG. Drawn by `draw_workflow.py`, which **reads the real graph**: every label, trigger and file:line in the frames comes from `workflow-graph.json` through the layout functions below. Only the live overlay, the counts and the change list are samples. `python3 draw_workflow.py --check`: 52 pairs, 0 fail (text 4.5:1, marks 3:1). Commandment 9: rectangles, lines, text and the code-drawn portraits; no generative tool.

## 1. Where this lives, and why

**Linked, not merged.** Workflow stays a reference page under Reports > Infrastructure (`/company/infrastructure.html`, first sub-tab), and it gains a live **Now** panel at the top. Task lifecycle (`/tasks/`) stays as T-2279 drew it, with one added line at its top: "Session now: Work session, 42 min · Workflow ›".

Why, in three sentences. Lifecycle answers "where is my task and what is it waiting on"; it changes every minute and is read per task. Workflow answers "why did the company do that next"; its map changes only when code changes and is read per rule. Merged, a phone reader would scroll past 33 nodes and 46 triggers before reaching the bottleneck bar, so each page links to the other at the point where the question changes: a running task on Workflow links to `/tasks/T-….html`, and the session line on Lifecycle links to the step on Workflow.

What each page holds, so nothing shows twice in full: Workflow shows each running task as one row (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, node, stage word). Lifecycle shows the stage track, the test runs and the waits. The Now panel has no stage tracks.

## 2. The page, top to bottom (frames)

1. Title, sub-tabs (Workflow, Techniques, Metrics, Experiments, Audits), one line saying what the page is for.
2. **Now** (live). Three lane cards: Main lane (session kind, model, minutes, the rule that picked it, who pays, end flag, chained ticks), Personal lanes (each account, each slot: its node and task, or why it is idle), API-key lanes (company credits running or not, personal keys). Each card links to its section. Then **Running tasks**: portrait, plain name, number badge, lane, node, stage chip, minutes, link to the task page. Then **Inputs this session read** (section 5).
3. **The whole flow**: one row per lane of phase chips with arrows; the phase holding the current step is filled accent. Each chip links to its section.
4. **What's changing**: one row per entry in `changes[]` (section 6), amber chip with status and task number, one plain sentence.
5. Sections 1 to 7: Every tick; The governor picks one (the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>); The three kinds of session; Inside a work session (with the keeper's end reasons); After the session; Personal lanes; API-key lanes. Each opens with one plain sentence on what runs it.

The current step carries a 3 px accent border and a "Now · 42 min" badge; steps already done this tick carry "✓ done 20:01" in `--ok`. Colour is never the only sign: the badge and the tick are words.

The Investor's three questions are answered where a reader meets them: inbox vs work at rule 7, why reports run alone at rule 3 (with T-2323's change), the CEO's daily step at section 4 (removed today, T-2322).

## 3. Node styles, one per `kind`


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. Node styles, one per kind, scrolls sideways" style="--tw:884px" markdown="1">

| kind | Box | Mark | Kind tag (words) |
| --- | --- | --- | --- |
| `start` | `--bg`, 1.5 px `--accent`, radius 18 | filled triangle | "starts" |
| `job` | `--bg`, 1 px `--line`, radius 8 | none | "script, no Claude" |
| `input` | `--bg`, 1 px `--muted` dashed 4 3, radius 8 | none | "input" |
| `decision` | `--bg`, 1 px `--line`, radius 8 | diamond outline, `--accent` | "decision in code" |
| `session` | `--accent-soft`, 1.5 px `--accent`, radius 10 | none | "Claude · <model>" in `--accent` on `--bg` |
| `step` | `--soft2`, no border, radius 6 | none | "the Operator" |
| `end` | `--grey-bg` pill, no box text but its label | none | drawn as an exit pill |

</div>


Inside every box: label 15/700 `--ink` (wraps), the node's `plain` 13 `--muted`, any change chip, then the code line `file:line` 11 mono `--muted`, right-aligned at the bottom. The kind tag sits top right; in a box under 400 px wide it moves to its own line under the label. The kind is always named in words, so a `job` box's faint `--line` border is not the only sign of its kind.

## 4. Edge styles and the layout rule

The page is laid out by rule. T-2308 implements these functions; `draw_workflow.py` is the reference (`spine`, `ladder`, `keeper`, `node`).

1. **Views.** Each section is a view: an ordered list of node ids in one lane (`views[]`, section 6). A node may appear in two views (`api_ready` is in 1 and 7).
2. **Spine.** The view's nodes form one column. Consecutive nodes are joined by a down arrow (1.5 px `--muted`). The edge's `trigger` is written beside the arrow in 12 `--ink`, with its `file:line`; an edge whose trigger is "always" gets no words and no code line (the target box already carries it).
3. **Exits.** An edge from a spine node to a node outside the view is an exit: at 1280 a right arrow from the box to a pill in a column 300 px to the right, the trigger above the arrow (wrapped at 270 px), the code line under the pill. To an `end` node the pill is grey with its label ("Branch <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>"); to a node in another section it is an accent-soft link pill ("→ 2. The governor picks one"). At 390 exits drop under their box behind a left rule, "if <trigger>", then the pill, then the code line.
4. **Incoming from another lane** (for example `p_land_live → lane_land`): a dashed arrow into the box, with a link pill "from 6. Personal lanes".
5. **Ladder.** Edges out of a `decision` that carry `order` are never drawn as a fan of arrows. They are rows, sorted by `order`, under the heading "first match wins": a number disc, the trigger, an optional `why` line in 13 `--muted`, the result pill, the code line and the count from `seen`. The row the governor picked this tick has an `--accent-soft` ground and a filled disc.
6. **End reasons.** Edges with `kind: end_reason` are rows under the keeper's box: trigger, "ended N sessions", change chip, code line.
7. **Back edges** (`chain → tick`) are exits whose pill links to section 1; no line runs back up the page.
8. **Change marks** (section 6): a node or edge named in `changes[]` gets an amber chip "<status> · T-NNNN". `remove` before it lands: the box is drawn with 1.5 px `--warm` dashes, label `--muted`, and the change's plain sentence in place of the node's. After it lands: the node is gone, and the edge that replaced it carries "Changed today · T-NNNN" for 7 days.

## 5. The live overlay and Investor messages

The site rebuilds every tick, so the overlay is written at build time from a small file and is never more than one tick old; the panel says "read 20:42". **Investor message text is never in the page.** An input of kind `message` carries only the issue number, the comment id and the time. The browser fetches the body with the reader's own token, through the same reader and stored token that Chat uses in `assets/app.js` (Commandment 42). Without a token the row shows "Text hidden · add your token in Chat to read it" (light frames); with one, the text appears in place (dark frames show that state with sample text). Mock names are "Investor A" and "Investor B"; the page uses the same names Chat shows.

## 6. Fields the build step needs (T-2308)

**Additions to `ops/plans/workflow-graph.json`:**


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 6. Fields the build step needs (T-2308), scrolls sideways" style="--tw:960px" markdown="1">

| Field | What it is | Used for |
| --- | --- | --- |
| `views[]`: `id`, `num`, `title`, `sub`, `lane`, `nodes[]` | each section and its node order | the spine; links "→ 2. …" |
| `nodes[].model` | for `session` nodes, the model and effort read from the governor's specs (workflow.py's `model_table` already reads them) | the kind tag |
| `nodes[].phase` | which overview chip the node belongs to | "The whole flow" and the current phase |
| `edges[].id` | stable id (keeper's end reasons share `from` and `to`) | change targets, counts |
| `edges[].why` | optional plain sentence for a split that needs a reason (rules 3, 7, 9) | ladder note |
| `edges[].seen`: `n`, `unit` (`sessions` or `ticks`), `window_days` | from `tools/workflow_stats.py` | counts; a dash when absent |
| missing exits | `p_menu` and `p_share` stop the tick with exit 0 (`personal_tick.sh:563`, `:667`), and `chain` waits when it does not chain (`supervisor.sh:774`); add them as edges to `end` nodes `p_idle` "Nothing to do this tick" and `wait` "Wait for the next tick" | the frames already draw them (`MISSING` in the script) |
| `changes[]`: `task`, `status` (`planned`, `trying`, `needs`, `landed`), `effect` (`remove`, `add`, `modify`), `node` or `edge` id, `plain`, `landed_at` | the changes the analysis put on the board; status read from the board line | "What's changing" and the marks |

</div>


**Live file** (say `ops/workflow-now.json`, written by the supervisor at each step, no Claude):


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 6. Fields the build step needs (T-2308), scrolls sideways" style="--tw:640px" markdown="1">

| Field | What it is |
| --- | --- |
| `at` | when written |
| `main`: `run` (`work`, `inbox`, `report`, `queue`, `hold`, `none`), `node`, `rule` (the ladder order that picked it), `since`, `model`, `billing` (`plan`, `api-company`, `api-<letter>`), `end_flag` (`code`, plain words, `close_by`) or `null`, `chain_depth` | Main lane card, the Now badge, the picked ladder row |
| `done[]`: `node`, `at` | steps finished this tick |
| `personal[]`: `account` (letter), `enabled`, `stop_until`, `slots[]`: `slot`, `node`, `task`, `since`, `idle_reason` | Personal lanes card; the badge on the personal spine |
| `api`: `company` (`running`, `ready`, `off`), `personal_keys[]`: `letter`, `offered` | API-key lanes card |
| `tasks[]`: `id`, `name` (stored plain name), `owners[]`, `lane`, `node`, `stage` (from `ops/task-stages.json`), `since` | Running tasks |
| `inputs[]`: `kind` (`message`, `board`, `rules`, `meter`, `claims`, `facts`), `label`, `at`, `value` (plain words), and for a message `issue`, `comment_id`, never the body | Inputs |

</div>


A field the writer cannot read is `null` and the page shows a dash, never a guess.

## 7. Bytes and the test

Today the Workflow page is 49,433 B gzipped, plus Mermaid at 746,473 B gzipped (`mermaid.tiny.js`). The new diagrams are inline SVG built by the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>, so Mermaid goes. The frames themselves are about 15.4 KB gzipped each, portraits included. Budget: the Workflow page at most 60,000 B gzipped, with no new script except the message reader Chat already has (at most 2,048 B added to `app.js`). T-2308's test: every node and edge in the graph appears in the page (by id), and `tools/workflow_graph.py --check` already fails when the code moves.

## 8. Approval

Inside the approved look (creative/approved.md item 6): the tokens, the card, `.idb`, the number badge, the amber chip, the link pill. The node kinds, the ladder rows and the dashed "removed" box are new states of those parts, so I read this as needing no <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> request. If Ines reads the ladder or the node boxes as a new element, they go to the Investors with these frames as previews.
{% endraw %}

</div>
