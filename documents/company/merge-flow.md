---
layout: "default"
title: "Merge flow: the root cause of slow merging (plan, 2026-11-06)"
section: "documents"
description: "Finished work reaches main, green, within minutes, and the number of finished board tasks reaching main per day rises. Judged by evidence outside the land tool: GitHub&#x27;s push and merge timestamps, main_green.py&#x27;s record\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/merge-flow.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 16 · Fri Nov 6</span><span><code>ops/plans/merge-flow.md</code></span></div><h1>Merge flow: the root cause of slow merging (plan, 2026-11-06)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by an Investor, #41 c6687528036 (09:44 11-06, Plan mode); questions c6687558940; answers c6687614090 (09:48).

## Goal
Finished work reaches main, green, within minutes, and the number of finished board tasks reaching main per day rises.
Judged by evidence outside the land tool: GitHub's push and merge timestamps, main_green.py's record of main, and the
MacBook runner's result files. Scoreboard: DORA's lead time for changes and change failure rate.

## What the answers decided
- Q1 B: this runs now, beside T-3079 (parallel host and xc checks), as its own top-priority work.
- Q2 (Evan asked for the company's view): yes, a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on unfinished work per <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, but only if the replay (step 2)
  predicts more finished tasks reach main per day with it. Reason: Little's law (time to merge = work waiting / merge
  rate); with ~70 tasks waiting on 45 branches, starting more work only lengthens the wait, and every waiting branch
  makes conflicts with main likelier. The cap holds new starts, never running work, and lanes with nothing waiting are
  untouched.
- Q3 A: machine-written records (metrics, usage meters, dispatch and lane state) leave the code history; the site
  <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> reads them from disk.

## Steps (board lines)
1. Raw timelines (T-3082): rebuild every merge attempt since 2026-11-05 00:48 as a step-by-step timeline (ready,
   rebase, each suite start/end, result, exit code) from ops/runs/ logs, git (`log --first-parent`, reflog), GitHub
   push times and runner job results; per-test results with reruns at the same commit (flake rate per test); the
   conflicting files and lines of each conflict. Output: a value-stream map (waiting vs working per step), a
   cumulative-flow chart, work in progress against merge rate, flake rates, conflict sources. A tool in tools/, no
   Claude to rerun.
2. Replay simulator (T-3083), after 1: tools/ code that runs the real history under candidate policies (parallel
   checks, speculative batched checks with bisection, a cap on unfinished work per lane, records out of git, tests
   chosen from the import graph) and predicts finished tasks reaching main per day and time to merge for each.
   Every prediction is written in log/optimizations.md before the change ships.
3. Records out of git (T-3084): every file a machine rewrites on a timer leaves the repository's history (kept on
   disk, a stated folder, backed up by the supervisor), the site generator and every tool read it there, and lanes'
   branches stop carrying it. Can start now; it is wanted whatever the replay says.
4. Flaky tests (T-3085), after 1: quarantine each test whose flake rate at the same commit passes a stated line (it
   still runs and reports, it no longer blocks a merge), with an owner line to fix each one.
5. Cap unfinished work (T-3086), after 2, only if the replay predicts a gain: lanes start no new task while their
   waiting-to-merge count is at the cap the replay picks.
6. Judge (T-3087), after the shipped steps have n=30 attempts: compare each prediction with the measured result from
   GitHub, main_green and the runner; post prediction, result and any gap on #41.

## Risks
- Moving records out of git breaks readers that expect them in the repo (the site build, the GitHub watchdog, reports'
  facts). Step 3 lists every reader first and moves them in one change, with tests.
- A replay is only as good as its timelines; step 1 states what it could not reconstruct.
- A cap that is too low idles lanes; the replay sizes it, and step 6 checks it.

## Leaves out
- Rewriting the land tool from scratch, or a hosted merge queue (GitHub's needs Actions minutes and a paid plan for a
  private repository; nothing is bought).
- Any Investor-owned file.
{% endraw %}

</div>
