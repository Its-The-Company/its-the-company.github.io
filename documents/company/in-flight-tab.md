---
layout: "default"
title: "Plan: Home&#x27;s In flight tab, with Running, Simulator and Merging subtabs"
section: "documents"
description: "One place on Home that shows every task the company has picked up, at whatever stage it is, true to how the work really flows and easy to navigate. In flight is the default tab. Its subtabs filter it by stage group."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/in-flight-tab.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 14 · Wed Nov 4</span><span><code>ops/plans/in-flight-tab.md</code></span></div><h1>Plan: Home's In flight tab, with Running, Simulator and Merging subtabs</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor, Plan mode on #41: ask c6694237490 (3:02 PM 11-06), questions c6694425930, answers c6694984984
(3:39 PM). Investor-requested site work, outside the 5% site share (amendment 2026-11-04 8:45 PM). Builds on Maren's
Home spec ops/site-checks/t2480/spec.md and T-3095.

## Goal

One place on Home that shows every task the company has picked up, at whatever stage it is, true to how the work
really flows and easy to navigate. In flight is the default tab. Its subtabs filter it by stage group.

## What the answers decided

- **In flight (default):** every picked-up task, all stages, queues included, on the six-stage track.
- **Running = Coding + Review** (Q1 A): the stages where Claude is working. Running stays Claude-only (T-3009).
- **Simulator** (Q2, with Evan's note): the test queue, testing, and every merge check that waits for or holds a
  Simulator. A merge check sits in the same single runner queue as test runs (confirmed from the code, below), so
  while it waits for or holds a Simulator it shows **only under Simulator**, labelled "merge check" with its machine.
  It is not listed under Merging with a badge.
- **Merging:** the merge queue, the host-only merge checks, and the land itself.
- **A "Merge Testing" step** goes on a task's track between the merge queue and the land, **only for tasks
  whose merge needs it** (their change touches app code). Other tasks' tracks skip it.
- **A failed merge loops back on the same card:** the retry or fix line that a failed land creates adds a new Coding
  step to the original task's timeline. It is not shown as an unrelated new card.
- **The pipeline drawing is dropped** (Q3 A). The Simulator subtab, with its machine slots (MacBook runner slots and
  the Mac mini's Xcode slot) and test or merge labels, is where the shared Simulator shows. T-3076's redraw is
  replaced by this plan.

## How merge checks use the Simulator today (from the code, 11-06)

- tools/land_xc.py queues a land's Xcode check as a job for the MacBook runner. That is the same queue that
  tools/runner_queue.py's test runs use. tools/macbook-runner/runner.py job_order() runs jobs whose task is on the
  merge-first list first, then the rest oldest first.
- A land runs that check only when its diff touches app code. A host-only change skips the Simulator entirely
  ("its diff touches none of: ...").
- If the runner can't take the job (offline, refused, an old version), the check runs on the Mac mini's own Xcode
  slot instead (exit 3). It still holds a Simulator, just on the other machine.
- A failed land <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> the branch, and a "Retry finished work that could not be merged" line names the original task
  IDs. That link is how the loop-back Coding step finds its card.

## Stages chain as the work really goes (an Investor c6695632816, 4:08 PM)

Steps repeat and chain in any order the work takes. A track is the task's real history, not a fixed six-step bar.
For example: coding, test queue, testing, coding, test queue, testing, review, merge queue, test queue, merge testing,
(fail), coding, test queue, testing, review, merge queue, test queue, merge testing, merging.

- **Parked is its own step, in the Merging group.** A merge that fails, or that a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> couldn't finish, leaves the
  work on a parked branch. Once an hour the merge queue (tools/merge_queue.py) picks parked work onto the current
  main and re-runs the checks it needs. Work that passes gets a retry line, and a lane lands it with every check
  again. So parked work waits up to an hour before it re-enters the merge queue.
- **A failure goes back to Coding only when the code was at fault** (a red test or a conflict). A failure that
  wasn't the code's (a missing worktree, a check stopped at its time limit, the runner offline) goes Parked, then back
  to the merge queue, with no Coding step.
- **Held parked work leaves the flow.** Work on the merge queue's hold list (landed on main in another form, or sent
  to a person) shows as stopped, with its reason, not as waiting.
- **Review is optional.** It appears only on tasks that get an independent review (code headed for TestFlight or the
  App Store, Commandment 13, and the tasks whose line asks for one).
- **The merge-time test queue is the same single runner queue**, so on the track it reads "test queue" before Merge
  Testing, and while it waits the task shows under Simulator only (as decided above).

## The waits the timeline must record (an Investor c6695106661, 3:46 PM; T-3116)

The data step (2) reads tools/task_stages.py's per-task stages. c6695106661 asks for ten parts. Where each stands
(2026-11-08):

1. **Track order** Coding, Test queue, Testing, Review, Merge queue, Merging. Not changed. Two later Investor
   comments replaced it. c6695632816 (4:08 PM, above) makes the track the task's real history, in any order.
   c6704144871 (11-07, T-3219) set the stage chips to Coding, Review, Test queue, Testing, Merge queue, Merge
   testing, Parked, Merging. home_look.py follows both.
2. **Review split** into waiting for a reviewer and reviewing, so Running stays Claude-only: T-3698.
3. **Parked** is its own step, with the refusal's reason, split from Merging. Done in T-3116. A refused try with no
   fix commit is Parked until the retry's land starts (its first land step row), or stays open if never retried.
   Parked time still counts in the merge_queue bottleneck row. On the main checkout's records over 240 h (1,207
   tasks), the tasks shown as Merging went from 260 to 4. The other 256 are now Parked.
4. **Paused** for usage limits, PAUSE and lane stops (fills the usage row): T-3699.
5. **Blocked** for disk holds, Investor waits and other tasks (fills the disk and depends rows): T-3700.
6. **Lost session**, a claim that ends with no commit and is taken again: T-3701.
7. **xc.sh records its task** (0 of 1,737 rows in ops/metrics/xc.jsonl have one, 11-08): T-3702.
8. **A retry with no fix** adds another merge pass, and only a fix commit adds a Coding step. Done in T-3116, with
   part 3. Each land try is one Merging pass. With no land step row for a retry, its pass is recorded with no
   length (start = end).
9. **Machine change** when a merge check falls back from the MacBook to the Mac mini: T-3703.
10. **Live** after landing, done when the change is on the site or in TestFlight: T-3704.

## Steps (board lines)

1. **Design (Maren, T-3095, updated):** frames of In flight and its three subtabs at 390 and 1280, light and dark.
   They show the track with the conditional Merge Testing step, a loop-back Coding step after a failed
   merge, and the Simulator subtab's machine slots with "test" and "merge check" labels. The Operator posts the
   frames on #41.
2. **Data (Odalys):** one per-task timeline feed built without Claude. It joins the board's lines, lane claims, the
   runner's queued and finished jobs (ops/jobs, ops/metrics/land_xc.jsonl), the merge queue's state, and the retry
   lines (mapped back to their original task IDs) into each task's stage history. It includes which machine and
   which kind (test or merge check) every Simulator job is. Tests red first.
3. **Build (Odalys, after 1 and 2):** the In flight tab and subtabs on Home, from Maren's frames. They replace the
   Running list and the pipeline drawing (T-3076 closes as replaced). Show More (T-3094) and the Claude-only
   Running count (T-3009) stay. Site test green, screenshots at 390 and 1280, then one reply on #41.

## Risks

- Stage history is only as true as its sources. A land job's file never reaches main (land_xc.py), so the feed
  must read ops/metrics/land_xc.jsonl, not ops/jobs alone.
- Steps 2 and 3 touch the same Home files as T-3009, T-3094 and T-3016, so they run after those, in order.

## What it leaves out

- No change to how merging or the runner queue works. This is a view of the process, not a change to it.
- Done tasks stay where they are today (Home's done list), not in In flight.
{% endraw %}

</div>
