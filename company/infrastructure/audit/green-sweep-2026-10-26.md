---
layout: "default"
title: "Evening green sweep, 2026-10-26 (T-0257, Odalys)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/green-sweep-2026-10-26.md</code></span><span>2026-10-26</span></div><h1>Evening green sweep, 2026-10-26 (T-0257, Odalys)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-034">OPT-034</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Tree: clean worktree `/tmp/sweep-2013` at HEAD a298a637, made 20:13 ET, removed at the end. No Xcode run (Idris held the slot).
Runs, all in the foreground:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:724px" markdown="1">

| Run | Started | Result |
|---|---|---|
| `python3 pywidget/tests/run_host.py --both` | 20:13 | green: 2 interpreters (3.9.6, 3.13.18), 24 suites, 1180 tests, 0 failed |
| `bash tests/run.sh` (every suite, default -j) | 20:14 | 166 suites, 2 red: site_dashboard_test.py (76/2), wiki_views_pv_test.py (26/1); 453 s wall |
| OPT-034 pair2 replay test (copied into tests/ of the worktree) | 20:24 | 52/1, the "#53 hold seed" case |

</div>


Not run: `tests/site_funnel_test.py.new` (not a suite by name; the runner skips it).

## Red tests

1. **tests/wiki_views_pv_test.py, B2 "real robots: 2 pageviews requests, none to /w/"** (n=1 check of 27).
   - Cause: test-only. Part B fakes `urllib.request.urlopen` but used the shared live-robots cache under `$TMPDIR/itsthecompany-robots-live`. terms_guard reads live robots.txt before any URL (ruling robots-recheck-2026-10-25 04:58). With today's wikimedia.org record in the shared cache there are 2 requests and the test passes; without it there are 3 (robots.txt first) and it fails. So the result depended on the day and on what else had run.
   - Earlier commits: the same, by cache state. With no record, it fails from 54405461 to HEAD. Archived copies of d5a1ba63, fdb6903b and 54405461 passed once a record existed.
   - Owner: Odalys (tool and test are mine). **Fixed** in bce06d03: Part B now uses `tg.use_live_dir(mkdtemp)`, and B2 expects exactly one robots.txt read, then 2 pageviews requests, none to /w/. 27/0 twice in the main tree and in the worktree, plus `tests/run.sh wiki_views_pv_test.py` green.
   - My own fault during the sweep: replaying archived pre-a091b467 tools (before the "fake reader never writes the shared cache" guard) wrote a fake 404 record `https_wikimedia.org.json` (20:22:51) into the shared cache. A 404 robots record means "allow all" for that host until ET midnight. I removed it at 20:24. It was the only cache file written since 20:00 apart from files.pythonhosted.org at 20:09, which is not mine. Lesson: run old-commit replays with their own `TMPDIR`.

2. **tests/site_dashboard_test.py, case_counts phone 390 and desktop 1280** (n=2 checks of 78).
   - Cause: a product fault, not the test. `tools/site/build.py` applies `live_status.board_count` only `if public_status`. `ops/live.json` is git-ignored, so a tree without it (a clean worktree or a fresh clone) writes `status.json` as `{}`. The Now panel then reads "Queue: 0 ready, 0 waiting or blocked", while the strip and Company > Work read "46 ready, 45 waiting or blocked". The live site is not affected while the Mac mini has `ops/live.json`.
   - Proof: green (78/0) with the main tree's `ops/live.json` copied into the worktree. Red without it at a298a637, and at 37480aed (Maren's last change to the test).
   - Owner: Odalys, P2, board line **T-0278**. Not fixed here: `tools/site/build.py` has another worker's uncommitted edits in the main tree.

3. **OPT-034 pair2 replay, "superseded: #53 hold seed flagged outside ADR-005, not #530"** (n=1 check of 53; it had no owner since 0ed1a6bc/af78d7ba).
   - Cause: the test's expectation is out of date; the tool is right. The test was written from T-0088's board line and expects a bare "the #53 hold on reads" to be flagged. T-0110 (a7a773ee, CORRECTIONS U3-07) limits the #53 seed to clauses that name a GitHub read.
   - Earlier commits: passes at b2ac6a64 (T-0088); fails at a7a773ee, at af78d7ba~1 and at HEAD.
   - Owner: Odalys, P3, board line **T-0279**: a note beside research/ops/replay/opt-034/results.json. The test stays unedited because it is the closed experiment's evidence.

## Totals

- Suites run: 166 under tests/ plus 24 host suite-runs (12 suites on 2 interpreters).
- Red at a298a637: 3 checks in 2 suites, plus 1 in the replay test.
- Fixed: 1 (test-only, mine). Board lines: 2 (T-0278 P2, T-0279 P3), both Odalys.
{% endraw %}

</div>
