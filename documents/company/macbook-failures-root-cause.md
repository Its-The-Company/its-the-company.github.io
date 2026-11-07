---
layout: "default"
title: "MacBook test failures: root cause and the structural fix (T-3288)"
section: "documents"
description: "Of the 62 failed land checks, 59 (95%) failed on a red that main already carried, not on the lane&#x27;s change. Main-red spells from the introducing commit to the fix: 7.7 h (RunLog), 18.5 h (TreeTimeline), 9.3 h (T0750)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/macbook-failures-root-cause.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/macbook-failures-root-cause.md</code></span></div><h1>MacBook test failures: root cause and the structural fix (T-3288)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-07. Investor ask: an Investor #41 c6708273903 (09:35). Status: evidence and design done; the fix is
not built yet (see "What is left").

## 1. Evidence

Source: every result.json on origin/macbook-results finished 2026-11-04 00:00 ET to 2026-11-07 09:35 ET, read with
tools/runner_watch.py (records(), first_error()), each job's base from ops/metrics/land_xc.jsonl, each introducing
commit from git log. n = 146 finished jobs: 29 passed, 117 failed. Runner time on failed jobs: 945 min.
Scripts: company-scratch/T-3288-odalys/dump.py and classify.py (signature regexes below).

### Failure classes (n = 117)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Failure classes (n = 117), scrolls sideways" data-n="2 3 4" style="--tw:738px" markdown="1">

| Class | Jobs | Land checks among them | Runner min | Root cause |
|---|---|---|---|---|
| A. A main-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> commit put a red on main before any Xcode run | 79 | 59 | 510 | see 1.2 |
|    RunLogUITests.swift:134 compile error (b4632bfb6, 11-06 17:38; fixed 811b2f838 01:22) | 26 | 21 | 46 | |
|    TreeTimelineTests stale-after expectation (50f493ec1, 11-06 08:26; fixed 097bc9d0a 02:56) | 31 | 28 | 233 | |
|    testT0750ConsoleRunYieldsSaveRunsOnceQueued (b4632bfb6 changed the call it text-matches; fixed 097bc9d0a) | 9 | 8 | 102 | |
|    SettingsView.swift:24 main-actor compile error (036c854f7, 11-04 17:28; 477813574 20:56) | 6 | 0 | 4 | |
|    TreeNodesTests weekday zone (43be07d86, 11-05 13:42) | 4 | 2 | 49 | |
|    ExtensionLane.Ran not Equatable (0e756d6cc, 11-04 13:31) | 3 | 0 | 76 | |
| B. A worker's own follow-up job, red on its own commit already on main (no cascade) | 4 | 0 | 110 | same road as A |
| C. Nondeterministic tests (Files UI picker x3; notification authorization x3; a "two seconds later" timing test x2) | 8 | 1 | 277 | test design |
| D. Runner/Simulator environment (job folder permission on Theme.xcassets x5, 11-05 09:57-13:56; testmanagerd socket x3, 11-05 03:45-06:00) | 8 | 0 | 18 | runner; none since 11-05 14:00 |
| E. Mutants, meant to fail (13 -mut- jobs + 1 mutant queued as xc-test, 81d4a64d5) | 14 | 0 | 19 | by design |
| F. The gate worked: a lane's own red stopped before main (ProStoreTests, WidgetWriterTests), or a branch run (TreeNodes toggle x2) | 4 | 2 | 12 | by design |

</div>


Of the 62 failed land checks, 59 (95%) failed on a red that main already carried, not on the lane's change.
Main-red spells from the introducing commit to the fix: 7.7 h (RunLog), 18.5 h (TreeTimeline), 9.3 h (T0750).

### 1.2 How each bad commit reached main


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1.2 How each bad commit reached main, scrolls sideways" style="--tw:769px" markdown="1">

| Road | Bad commits | Jobs failed |
|---|---|---|
| Direct commit on main in the Mac mini checkout (main account's session), Xcode run owed | 5 (b4632bfb6, 50f493ec1, 43be07d86, 036c854f7, 0e756d6cc) | 79 (+4 class B) |
| A lane land that skipped its xc check | 0 | 0 |
| A land check that passed on a stale base (land_xc holds() disjoint-files rule) | 0 | 0 |
| Gate-build code that never compiled (T-3105 F1, T-2676 L3) | 0 so far; latent, owned by T-3281 | 0 |

</div>


All five say so in their own messages: "App, unit and UI targets not built here yet (xc.sh 75, disk under 10 GB);
Simulator run via the runner job after push" (b4632bfb6); "Typecheck clean ... Simulator run on the MacBook: pending"
(50f493ec1); "Typecheck only; Simulator run owed" (43be07d86); "Not yet compiled: the local Xcode lock was held ...
the MacBook runner job is the first build" (036c854f7).

Scale of that road: product commits on origin/main since 11-04 (paths under pywidget/ios): 104. 97 direct
(committer not Operator), 6 through a lane land (committer Operator), 1 an Operator salvage commit (b3fa43781).
14 of the 97 direct ones say in their message that the Xcode/Simulator run is still owed (regex count; a floor, not
a ceiling: most messages say nothing either way).

## 2. Root cause

The company has two roads into main and only one is checked. Lane work lands through tools/personal_land.sh, which
runs the MacBook xc check on the change merged onto main. The main account's sessions commit straight onto main in
the Mac mini checkout, and the supervisor pushes it. They cannot test first: the Mac mini often cannot build (the
xcodebuild lock queue, disk under 10 GB, 16 GB of memory), and the MacBook runner accepts only commits already on
main or on a land/<id> ref, which only the lander pushes. So the main lane's Xcode check runs after the commit is on
main, by construction. Every land check then tests a lane on top of that main, so one unverified commit fails every
lane until a person fixes it. runner_watch.py (T-3213) sees the red after the fact; it limits the damage, it does not
prevent it.

Not root causes here: the runner (8 environment failures, none since 11-05 14:00), stale-base land checks (0), lanes
skipping xc (0). Flaky tests (8) are a real second problem, smaller, and mostly in UI tests that land checks do not run.

## 3. The structural fix: one gate for every road into main

Rule ("not rocket science"): a commit that changes what the app build reads may join main only if a MacBook build and
unit run of that exact content passed first. Product paths: pywidget/{ios,runtime,python,widgets,templates,packages,
examples}/, personal_land.sh's PRODUCT_PATHS, so the lanes and the main lane use one definition.

1. tools/main_gate.py check [--task T] [paths...]: builds the would-be commit (HEAD plus the working copy of the
   product paths given, default every changed one) with git plumbing, sends it to the MacBook through
   tools/land_xc.py check on land/m (lane id m; no account uses that letter), waits up to 9 min (exit 75: still
   queued, run it again), and on green writes a verdict keyed by the content of the product paths (sha256 of
   mode, blob, path for each file). Content key, not commit: an ops-only commit between check and commit keeps it.
2. tools/hooks/pre-commit (already core.hooksPath for every worktree): on branch main in the main checkout, when the
   staged tree changes a product path and the author is not Operator, refuse unless a green verdict holds for the
   staged content key; the refusal names the command. MAIN_GATE_SKIP=<reason> lets it through and writes a row.
   Any internal error lets the commit through and writes a row (the gate must never stop work by its own bug).
3. tools/main_gate.py audit --since D: for each product commit on main, did a passed MacBook job (land check, gate
   check or any job) test the same content key before the commit time? That is the metric, and it can be computed
   for the past, so the baseline comes from the same code.

Cost. MacBook: one unit job per main-lane product commit, 3-7 min; those commits already get a job, just after the
push. Removed: the cascaded land checks (59 in 3.5 days, about 380 runner min) and their land retries. Mac mini: git
plumbing and polling only, no xcodebuild, so it takes load off the 16 GB machine. Session time: about 5 min of wall
time per product commit, no tokens while waiting.

Known gaps (named, not hidden): git commit --no-verify, revert and cherry-pick skip pre-commit; the Operator's
salvage and step-12 commits are exempt (1 product salvage commit since 11-04). The audit counts all of them, so a gap
shows as a number. UI tests are compiled by the gate's build (build-for-testing builds UITests: 21 land checks
failed on the RunLogUITests compile error) but not run; UI reds stay with the post-push full suite and do not cascade,
since land checks run only PyWidgetTests.

Second-order items (separate lines, not this fix):
- Nondeterministic tests: when a job fails, rerun only the failing tests once in the same job; fail-then-pass is a
  flake row (test, commit) and the test goes on a quarantine list with an owner, rather than blocking lands.
- Gate configuration: T-3281 (Idris) gives the runner a route to build and run the gate configuration.
- Runner environment: classify the permission and testmanagerd failures as "infra" with one automatic retry.
- Salvage: a session's leftover product files go to a <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch, not main.

## 4. Measurement (to be written as an OPT entry when built)

- Hypothesis: with every product commit gated, main stops carrying unit/compile reds.
- Metrics: ops/metrics/runner_health.jsonl land_checks_failed_main_red and main_red_min per day (baseline 11-06:
  8 and 102 min; 11-07 to 09:10: 12 and 357 min); main_gate.py audit share of product commits verified before
  main (baseline to compute with the tool; by the evidence above, at most 6 of 104 since 11-04).
- Predicted: land checks failed on a main red under 1 a day; verified share above 90%.
- Window: 7 days after the hook is installed. Revert rule: if sessions wait more than 15 min median per product
  commit, or the gate refuses a commit that a passed check covered (a key bug), turn the hook off (one line in
  tools/hooks/pre-commit) and keep the audit.

## What is left (next session, T-3288)

Built: nothing yet. This document is the evidence and the design. Next, in order: tools/main_gate.py (check, hook,
audit) with a stdlib unittest; the pre-commit call; the audit's baseline row; the OPT entry; then the #41 reply.
{% endraw %}

</div>
