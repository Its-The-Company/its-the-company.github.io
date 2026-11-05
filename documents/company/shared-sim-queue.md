---
layout: "default"
title: "One shared queue for all Simulator test work (T-2470)"
section: "documents"
description: "Baseline figures to read before any claim of improvement (method in &quot;Measure afterwards&quot;): ops/metrics/xc.jsonl wait_s and seconds for test runs on the mini; ops/metrics/xc_route.jsonl plus job results for MacBook\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/shared-sim-queue.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 15 · Thu Nov 5</span><span><code>ops/plans/shared-sim-queue.md</code></span></div><h1>One shared queue for all Simulator test work (T-2470)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Asked by an Investor, #41 c6650882035. Owner: Odalys. Built in one go under the 01:07 amendment; measured afterwards.

## Baseline (what exists today)

1. Mac mini: every xcodebuild, build or test, waits on one machine lock (`/tmp/itsthecompany-xcodebuild.lock`,
   tools/xc_lock.py via tools/xc.sh). A test run holds the lock for its whole build plus its whole test pass, so a
   second caller waits for both, though only the build needs to be alone.
2. MacBook: tools/xc_route.py turns a PyWidget test run into one job file (tools/jobs.py); the runner takes the
   oldest job, archives the commit, builds and tests it in one go, then the next. One job = one build, even when
   two jobs pin the same commit. Runner 12 (#187, applied 11-05 01:29) runs each job on 3 Simulator copies.
3. The two machines never share work. A slow piece on one does not move to the other when it is free.
4. Per-Simulator memory: no measurement yet (T-2419 is still open). The design takes it as a setting
   (`SIMQ_SIM_MB`, default 2500 MB, a guess) and records free memory before and after each piece so the
   first runs measure it.

Baseline figures to read before any claim of improvement (method in "Measure afterwards"):
`ops/metrics/xc.jsonl` wait_s and seconds for test runs on the mini; `ops/metrics/xc_route.jsonl` plus job
results for MacBook turnaround (2506 s full suite, n=1; about 150 s unit-only).

## The design

One queue of **pieces**. A piece is either the build of one commit or one slice of that commit's tests.

- **Store.** `<git common dir>/simq/queue.json`, one JSON file under an flock (`queue.lock`), shared by the main
  checkout and every <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> worktree on the Mac mini. Small (finished runs older than 2 days are dropped).
- **Run.** `simq.py submit --commit SHA [--only-testing PyWidgetTests/Class ...] [--pieces N] [--ui]` makes one run:
  its test classes (from that commit's `pywidget/ios/Tests`, or the filter given) dealt into N pieces, balanced by
  each class's last measured seconds (equal weight when unmeasured). `--ui` adds the UI target as one piece.
- **Build once per commit.** On the mini a commit is built once (`build-for-testing`, through tools/xc.sh, so it
  still takes the machine lock: one build at a time). Its Products folder and `.xctestrun` are cloned (APFS `cp -c`)
  to `simq/builds/<sha>/`, so a later build in the shared DerivedData can't pull them away. Every run at that
  commit reuses it. The last 3 builds are kept.
- **<span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span>, not push.** A free slot calls `claim`: it takes the oldest pending test piece whose commit is built, or,
  if none and no build is running, that commit's build piece. A piece runs `test-without-building -xctestrun ...`
  through tools/xc.sh with the slot's own lock file (`XC_LOCK_FILE=simq/slot-N.lock`), so it never holds the
  machine lock and the verdict, hang stop and summary of xc.sh still apply. Each slot has its own Simulator
  (`itsthecompany-slot-N`).
- **Who drives the mini's slots.** Whoever is waiting. `simq.py run` submits and then works the queue (any run's
  pieces, not only its own) until its own run is done or `--max` seconds pass (exit 75, `simq.py run --resume R`).
  No daemon. Two waiting callers fill two slots; nobody waits on a whole test pass that is not theirs.
- **Mac mini limits.** Slots 1..`SIMQ_SLOTS` (default 2). Slot 1 always may run; slot k>1 only when free memory
  (vm_stat free + inactive + speculative) is at least `SIMQ_SIM_MB + SIMQ_RESERVE_MB` (2500 + 3000). One build at
  a time stays the machine lock's job.
- **The MacBook pulls by lending.** It reads git only, so it can't take a file lock. `simq.py lend`, run by the
  supervisor tick (which already commits and pushes the daily job), lends pieces when (a) the piece's commit is on
  origin/main (the MacBook tests only pushed commits), (b) the runner's check-in is not silent and no simq job of
  ours is still waiting there, and (c) the run's remaining local work is longer than the MacBook's turnaround
  (`SIMQ_LEND_MIN_S`, 600 s). It lends the tail half of the oldest run's pending pieces as one job (only_testing,
  up to 20 classes), so the runner builds once for them and its 3 Simulators share them. The pieces are leased to
  the job until push lag + poll + the job's limit; the job's result closes them; a lease that runs out puts them
  back in the queue (whoever finishes first wins; a late result is kept as evidence only).
- **Verdict.** `simq.py status|wait R-...`: green only when every piece is done with exit 0 and at least one test
  ran in total (same rule as xc.sh T-0440); 65 red; 75 not yet.

## What stays as it is until proven

- tools/xc.sh behaves exactly as before for every caller. `XC_SIMQ=1` sends a PyWidget `test` run into
  `simq.py run` instead; nothing sets it by default.
- tools/jobs.py stays the transport to the MacBook; tools/xc_route.py and tools/runner_queue.py keep working.
  They retire only after the measurement below shows the queue is faster and no less correct.

## Runner side (MacBook)

No runner change is needed for the first version: a lent piece is an ordinary xc-test job with only_testing.
Follow-up (runner 13, with T-2419): keep one build-for-testing per commit in the runner's work folder and run
later jobs at that commit with test-without-building; and choose the Simulator count from free memory. That is a
proposal through tools/apply_proposal.py (pre-approved by the 00:06 and 01:21 amendments; a classifier refusal
stops it, T-0848).

## Measure afterwards

1. Wall time from submit to verdict per run (`simq/history.jsonl`: one row per piece with machine, slot, seconds,
   wait before claim, free memory before and after), against xc.sh test runs' wait_s + seconds before 11-05.
2. Builds per commit (target 1 on the mini) against today's builds per commit (`xc.jsonl` rows sharing a HEAD).
3. Per-Simulator memory from the free-memory pairs (n per slot), replacing the 2500 MB guess.
4. Correctness: a run's executed/failure totals equal one xc.sh run's at the same commit (n=3 commits).
Read after 20 runs or 2026-11-08, whichever comes first (OPT line on the board).
{% endraw %}

</div>
