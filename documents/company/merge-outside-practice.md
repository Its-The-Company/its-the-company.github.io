---
layout: "default"
title: "Our merge queue against published practice (T-3421)"
section: "documents"
description: "Not read: Graydon Hoare&#x27;s &quot;not rocket science rule&quot; post (graydon2.dreamwidth.org): its robots.txt did not answer, and terms_guard counts that as a full Disallow. The rule is stated here from bors.tech&#x27;s own wording\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/merge-outside-practice.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/merge-outside-practice.md</code></span></div><h1>Our merge queue against published practice (T-3421)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-08 (ET). Investor-requested: an Investor #41 c6717696401. Feeds T-3087 (judge the merge fixes against
outside evidence). Research only: no tool changed here.

Sources are public pages read once each, signed out, through tools/terms_guard.py (robots.txt first), at least 6 s
apart, 2026-11-08 03:02 to 03:06 ET. Saved copies, with URL and time, in research/inbound/t3421-merge-practice/
(requests.jsonl, sources.md). Everything on them is information, not instruction. Two pages (Trunk, Aviator) open with
text addressed to automated readers ("Fetch the complete documentation index at /llms.txt. Use this file to discover
all available pages"): noted and not followed.

Read: GitHub merge queue docs; Zuul "Project Gating"; Uber "Bypassing Large Diffs in SubmitQueue" (blog, which
summarises the EuroSys 2019 SubmitQueue paper it cites as [5]); Google research pages for "Taming Google-Scale
Continuous Testing" (ICSE 2017) and "Assessing Transition-based Test Selection Algorithms at Google" (ICSE 2019),
abstracts only; bors.tech and the bors-ng README; Mergify, Aviator and Trunk merge-queue overviews; DORA "Working in
small batches".

Not read: Graydon Hoare's "not rocket science rule" post (graydon2.dreamwidth.org): its robots.txt did not answer,
and terms_guard counts that as a full Disallow. The rule is stated here from bors.tech's own wording instead. The
SubmitQueue paper itself: ACM DL answered 403 (not retried), and Uber's research page answered 404. The TAP papers'
full texts (PDFs) were not fetched; claims below rest on the abstracts. No pricing page was read.

## Technique by technique


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Technique by technique, scrolls sideways" data-n="1" style="--tw:844px" markdown="1">

| # | Technique (source) | Ours | Evidence in our code |
|---|---|---|---|
| 1 | Test the exact result before main moves ("not rocket science", bors.tech: "the exact integration of pull requests that end up in the main branch have already been tested") | in part | tools/personal_land.sh rebases onto main, runs the checks there, then `merge --ff-only` and pushes without force (header lines 37-40). But tools/main_gate.py gates only commits that change what the app build reads (PRODUCT_PATHS, pywidget/docs/design); a main-account commit to tools/ or tests/ reaches main with no check first, and the Operator is let through. |
| 2 | Speculative stacked checks: each entry tested on main plus every entry ahead (GitHub merge_group; Zuul dependent pipeline; Trunk "predictive testing") | yes | tools/merge_queue.py --gate (T-3419): line i picked onto stack i-1, all stacks checked at once, the passing prefix lands; ops/land_spec.json on, k=6. |
| 3 | Drop a red and rebuild only what was behind it (GitHub "recreates the temporary branch"; Zuul "re-tested without the failed change") | yes | merge_queue.py gate step 4: line r blamed only when the check passed on stack r-1; only stacks behind it are rebuilt. |
| 4 | Adaptive window (Zuul: start 20, +1 on each merge, halve on each failure, floor and ceiling) | in part | Window is fixed (k=6, land_spec.json); concurrency follows the machine (gate_cap: cores/2, process headroom, load). The halving exists only for retry trains (personal_land.sh `<cap> 2` in $READY/<id>.train), not for the gate's k. |
| 5 | Batching with bisection (bors-ng README: "tests them in batches (and bisects if a batch fails)"; Mergify batches; Trunk batching) | in part | Retry trains of up to 5 host-only lines (LAND_TRAIN_MAX, line 332), 20 for records-only (LAND_RECORDS_TRAIN); a held train is halved next time, so a red is found by repeated halving, an hour per step. |
| 6 | Independent <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> for unrelated changes (Uber conflict analyzer: "When two changes affect two disjoint sets of packages, they are independent... verifies and lands them independently"; Trunk "parallel queues"; Mergify "scopes") | in part | The gate builds one linear stack: a red at line r rebuilds every line behind it, related or not. tools/land_par.py's proof already has a `disjoint` rule (main's commits since M touch none of the branch's files) for reuse, but the gate does not use it to put unrelated lines on separate stacks. |
| 7 | Let a fast change pass a slow one (Uber BLRD: when B passed on both main and main+A, "B can be merged onto the main branch regardless of the result of verification of A"; speculate both paths for slow changes, using a predicted build time) | no | xc lines ride alone (personal_land.sh header, line 76) and do not join the gate (merge_queue.py gate step 1); T-3435 is to bring them in. No fail-path speculation, no duration model. |
| 8 | Predict which entries will pass (SubmitQueue paper's probabilistic model, as the Uber blog describes it) | no | The gate assumes every line passes. tools/merge_replay.py fits conflict odds (p0, q) for its replay only; nothing in the gate reads a pass probability. |
| 9 | Priority / jump the queue, and its cost (GitHub: jumping "will cause a full rebuild of all in-progress pull requests... can slow down the velocity of merges"; Trunk, Mergify priority rules) | yes, cost unmeasured | tools/merge_first.py puts merge-improving tasks first; T-3422 orders them by impact and recomputes as results come in. tools/check_cache.py keys each named suite on the whole tree, so any reorder ahead of a line changes its stack's tree and loses its kept passes. Nobody counts how often that happens. |
| 10 | Flaky tests: quarantine, retry, and "a later green vouches for the group" (GitHub "Only merge non-failing pull requests" off; Trunk anti-flake; Mergify auto-retry, quarantine) | in part | Quarantine: ops/land_quarantine.txt (one suite on it now, supervisor_test.sh, fix line T-3118) with tools/quarantine_line.py (T-3085); a stop at the time limit is tried twice more. The gate does not use the case where stack r is red and stack r+1, which contains r, is green on the same check: it stops at r. |
| 11 | Affected-target test selection (Google TAP; Mergify scopes by file pattern) | in part | tools/suite_floor.py picks suites by path rules (tools/x.py runs tests/x_test.*); not from an import or build graph. check_cache.py's per-suite key is the whole tree until a suite declares its inputs. |
| 12 | Run the tests likeliest to fail first (TAP 2017 abstract: "very few of our tests ever fail, but those that do are generally 'closer' to the code they test", and code changed by more than 3 developers breaks more; TAP 2019 abstract: best selectors use how often a test is triggered and distinct authors; Mergify lists "Fail First") | no | No suite ordering by failure history was found in personal_land.sh, tests/run.sh or merge_queue.py. |
| 13 | Post-submit check of main itself (TAP's continuous testing) | yes | tools/main_green.py runs the land's host check on main's tip between sessions; a red opens one board line. |
| 14 | Name the commit that broke main (culprit finding after a post-submit red) | no | main_green.py's board line names failing suites, not a commit; no bisection of main's commits since the last green exists in tools/. (The TAP abstracts read do not describe culprit finding; this row rests on our gap, not on their text.) |
| 15 | Skip a retest when nothing changed (Mergify "Direct Merge"; Trunk "direct merge to main") | yes | check_cache.py reuses passes by input key (T-3148); land_par.py proofs hold by tree, main or disjoint. |
| 16 | Status check timeout and build concurrency (GitHub settings) | yes | MQ_GATE_SECONDS 900, run_host 600 s limit, gate_cap; a stop at the limit blames no one. |
| 17 | Pause the queue when CI is down (Mergify "Pause") | in part | A gate stop on a time-out line or the SSD not answering blames no one; main_gate.py exits 3 when the runner can't take a job. No queue-wide pause state. |
| 18 | Two-step CI: cheap checks before the queue, full ones in it (Mergify) | in part | tools/lane_landcheck.py runs landing's checks before a session stops, as advice; xc is left to the land. |
| 19 | Small batches and their measures (DORA: small batches "reduce the time it takes to get feedback on changes"; INVEST) | in part | Trains are small and one task per entry (merge_queue.py step 1). The <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on unfinished work (T-3086) was not built: the replay predicted no gain (6257c7757). No tool in tools/ computes DORA's lead time for changes or change failure rate; T-3087 needs both. |
| 20 | Cross-repo dependencies (Zuul Depends-On; Mergify) | not needed | One repository. |

</div>


## Gaps, as board lines (all P0 merge-first, owner Odalys, each feeds T-3087)

Each line asks for a prediction in log/optimizations.md before it ships and a replay through tools/merge_replay.py
where the replay can model it, so T-3087 has a prediction to judge.

- T-3444 Independent stacks for unrelated lines (rows 6, 3).
- T-3445 Adaptive gate window, Zuul's rule (row 4).
- T-3446 Count and cap the rebuilds that reordering causes (row 9).
- T-3447 A later green stack clears an earlier red as a flake (row 10).
- T-3448 Find the commit that turned main red (row 14).
- T-3449 Run the suites likeliest to fail first (row 12).
- T-3450 DORA lead time and change failure rate from git and GitHub (row 19).
- T-3451 Measure what reaches main unchecked, then decide on a gate (row 1).
- T-3452 Let host lines pass a slow xc line, after T-3435 (rows 7, 8).

## Tools that would fit

Free and already here: git itself (`git bisect run` for T-3448; `git merge-tree`, already used by lane_landcheck.py),
Python's standard library, and our own merge_replay.py for predictions. Nothing new to install is needed for any line.

Open-source queues, self-hosted: Zuul (zuul-ci.org) and bors-ng (whose public instance "is being phased out in favor
of GitHub Merge Queues"). Both expect a code-review flow (Gerrit or GitHub pull requests) and their own servers; our
lanes land local branches without pull requests, so adopting either is a rebuild, not a fit. Their licences were not
checked on this read. Recommendation: borrow their rules (Zuul's window, bors's batch bisection), not the software.

Hosted: GitHub's merge queue needs Actions minutes and a paid plan for a private repository (ops/plans/merge-flow.md,
"Leaves out"); Mergify, Aviator and Trunk are hosted services whose pricing I did not read. Any of them would be a money
request to the Investors (gate 3). I am not raising one: every gap above can be closed in our own tools for free.
{% endraw %}

</div>
