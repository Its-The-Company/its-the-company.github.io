---
layout: "default"
title: "T-1116 review: Xcode test runs routed to the MacBook runner (T-1878)"
section: "documents"
description: "Approve, with two Medium follow-ups. I found no path to a silent green. Every route outcome is 0 only when a result says passed. A queued run exits 75. A refusal exits 2. A router crash or a failed jobs.py create falls\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1116-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1116-pernille.md</code></span></div><h1>T-1116 review: Xcode test runs routed to the MacBook runner (T-1878)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Odalys. Commits: 1bde16490 (router, xc.sh totals, gates set XC_LOCAL=1) and 262aae3f6
(goldens carry the totals line; the land env list allows XC_LOCAL). Files read: tools/xc_route.py, the xc.sh, alpha_run.sh,
personal_land.sh and xc_mutants.py diffs, tests/xc_route_test.py output, and the parts of tools/jobs.py,
tools/lane_outbox.py, tools/macbook-runner/runner.py and kinds.json, tools/xc_wait.sh and tools/supervisor.sh that the
route depends on. No Xcode run and no Simulator was started.

Suite: `python3 tests/xc_route_test.py`: PASS 17, FAIL 0 (2026-11-04, one run).

## Verdict

Approve, with two Medium follow-ups. I found no path to a silent green. Every route outcome is 0 only when a result
says `passed`. A queued run exits 75. A refusal exits 2. A router crash or a failed `jobs.py create` falls back to the
local path, which still takes the machine lock. The land gate, alpha_run and xc_mutants set XC_LOCAL=1, so their 75
still means "busy" (personal_land.sh:804). The totals and failing names reach the result: at most 31 lines, printed
beside the exit line, inside the runner's 60-line tail. Nothing new leaves the machine (see Commandment 61 below).

## Checks asked for


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Checks asked for, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| Runner down | Not green, but not loud either: see M2 |
| Runner slow | `wait` returns 75 at `--max` and prints the state. Fine. |
| Malformed result | `result_for` gives `{"status": "unreadable"}`, so `state` exits 1. A malformed check-in is caught and reads as "not checked in". A result that is not a dict raises a traceback (exit 1). Loud. |
| Refused result (for example "commit is not on main") | exit 1, and `refused: <reasons>` is printed |
| Totals and failing names | xc.sh prints `xc.sh: tests:` and up to 30 `xc.sh: failed:` lines, then "... and N more". `tests_report` reads them first and falls back to parsing older jobs, and says so when it does. |
| Exit codes | 75 now also means "queued", beside "lock wait" and "disk wait": see L2 |
| One-local-Xcode rule | This change adds no bypass. XC_LOCAL=1 and every other LOCAL answer go on to the same lock. The router never starts xcodebuild. There is an older bypass through XC_LOCK_FILE: see L4. |
| Commandment 61 | Pass. The only thing that leaves the machine is the job file, which `jobs.py create` builds and `runner.validate_job` checks against the approved xc-test kind. Its fields: id, kind, command, commit, limits, created, created_by, purpose and task. `purpose` is fixed text plus at most 120 characters of the caller's `-only-testing` or `-skip-testing` arguments. `git fetch` only reads. |
| Loop on the MacBook | The runner's xc-test sets `XC_LOCK_FILE={CACHE}/xc.lock` (kinds.json:150), so `decide` keeps the run local there |

</div>


## Findings

**M1 (Medium): a job made in the main checkout pins a local commit that the supervisor's rebase can rewrite.**
`route` passes no `--commit`, so `jobs.py create` pins the local HEAD. The message tells the worker to commit the job
file with their work. Before it pushes, tools/supervisor.sh:152 runs `git pull --rebase --autostash` whenever origin has
moved, which happens on most pushes here with many agents. The rebase rewrites the pinned SHA. The job file still names
the old SHA, which never reaches origin, so the runner refuses it with "commit is not on main"
(runner.py:1594). The result is loud (`state` exits 1), but it arrives one push lag plus up to 2 min after the push, and
the worker has to queue the run again. The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> path already handles this: lane_outbox pins main's commit at replay.
Fix: when HEAD is not an ancestor of origin/main, either defer the pin until the push (as the outbox does) or refuse with
a line that says why. At the least, `route` should print that the job is at risk. A test should cover an ahead-of-origin
HEAD.

**M2 (Medium): nobody can see that the runner is down.** `route` queues without reading the runner's check-in. `state`
prints the check-in's `at` but never judges its age. `fetch` drops its return code, so a failed fetch leaves stale refs
and nothing says so. Nothing ever calls the job overdue. With the MacBook off, a worker sees "queued, 0 job(s) ahead;
runner idle at <yesterday>" on every look, for as long as they keep looking. That is not green, but it is not loud. Fix:
(a) `state` says "runner silent since <at> (N min)" when the check-in is older than about 3 poll intervals. (b) Once
`created` is more than push lag + LIMIT_S old, `state` returns 1 and calls the job overdue. (c) `fetch` prints a line
when a fetch fails. (d) `route` may fall back to the local path, under the lock, when the check-in is stale, if the
storage reason allows it. Odalys and Ines decide that. Tests for (a)-(c).

**L1 (Low): `state` trusts `status` alone.** `code = 0 if st == "passed"` ignores `exit`, and it ignores a totals line
that reports failures. The runner sets `status` from the exit code today, so this cannot happen now. But a result with
`status: passed` and `exit: 65`, or with `xc.sh: tests: ... 3 failures`, would read green. Fix: green only when
`status == "passed"`, `exit == 0`, and any own totals line reports 0 failures. Anything else exits 1 and names the
mismatch.

**L2 (Low): exit 75 now means three things, and the lane path has no dedup.** A caller cannot tell "queued, go read
`xc_route.py wait`" apart from "lock or disk busy, try again" by the exit code alone. tools/xc_wait.sh turns 75 into 1.
In the main checkout, `queued_job` stops a retry from adding a second job. In a lane, every call returns before that
check, so each `xc.sh ... test` adds another outbox record. A worker who retries on 75, as they have learned to for the
lock, lands N full-suite jobs of about 42 min each. Fix: dedup the lane outbox's xc-test records per branch, and put a
fixed stdout marker (`xc.sh: queued J-...` or `xc.sh: queued (lane)`) on the queued path, so a script can tell the cases
apart.

**L3 (Low): gaps in the tests.** The suite has no case for: an unreadable result, a refused result, a failing
`jobs.py create` (the fallback to the local path), the lane-outbox path, an ahead-of-origin HEAD (M1), a stale check-in
(M2), or `passed` with a non-zero exit (L1). Add them with the fixes. Seed mutants: delete the `"not pushed"` early stop
in `wait`; flip `QUEUED` to `LOCAL` in the create-failed branch.

**L4 (Low, older than this change): XC_LOCK_FILE escapes the machine lock on the Mac mini, even with lanes on.** xc.sh:46
takes `${XC_LOCK_FILE:-/tmp/itsthecompany-xcodebuild.lock}`, so any caller that sets it to a private path runs xcodebuild
beside another run. `decide` now names that case "the runner itself, or a fixture" and keeps it local. That is correct for
routing, but it marks the bypass as intended. Fix: with lanes on, refuse a non-machine XC_LOCK_FILE unless a runner or
fixture marker is set (for example, a runner-only env variable from kinds.json).

## Not findings

- The 30-name <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on `xc.sh: failed:` lines: the overflow line says how many more there are, and the full log stays on
  the MacBook.
- The route skips any run that names a Simulator by `id=`, or passes `-resultBundlePath` or TEST_RUNNER_*. These are all
  local readers, which is the right choice.
- The dirty check leaves out tools other than xc.sh and xc_verdict.py. The runner runs its own tools at the pinned
  commit, so an edit to the Mac mini's tools/xc_sim.py does not change a runner result.

## Re-review 2026-11-04 00:45 ET: the M1 and M2 fixes (T-1914)

Reviewer: Pernille. Author: Odalys. Commits: 799cb51c4 (T-1893, T-1894) and 4818b80d8 (busy runner gets the run's
limit). Files read: tools/xc_route.py, tests/xc_route_test.py. Also read the parts of runner.py (job loop, check-in),
kinds.json (xc-test pre/warm/argv/env), tools/xc.sh, pywidget/ios/project.yml, pywidget/ios/scripts and
tools/acknowledgements.py that decide what a runner job runs. No Xcode run and no Simulator. Two probes ran in temporary
folders on the suite's own fixture (setup, hand_job, post_result), with the script kept outside the repository.

Suite: `python3 tests/xc_route_test.py`: PASS 27, FAIL 0 (one run).

Verdict: approve, with two Medium follow-ups (T-1914 F1, F2) and three Lows. Both fixes do what M1 and M2 asked. An
unpushed pywidget/ change is refused. An unpushed ops-only commit pins origin/main. A silent runner is named. A job past
its allowance exits 1. A failed fetch is printed. The gaps are the path set M1 judges by, and an "overdue" that can be
read from a stale ref.

Checked and fine:
- The busy branch can be reached. runner.py:1607 forces a `busy` check-in with the job id before every run, and an
  `idle` one after it. So a running job reads "running", and the LIMIT_S + 600 window covers a real run (2506 s
  measured, the limit 5400 s).
- LIMIT_S is the right number for every job ahead: xc-test is the only command in kinds.json (max_time_limit_s 5400).
- `j < jid` matches the runner's order. The runner takes job names in sorted order (runner.py:526).
- A dead runner does not read as plainly queued. "runner silent since" is added after 40 min idle or 100 min busy, and
  route prints it on queueing. The one exception is a runner with no checkin.json at all. That reads "not checked in"
  and never "silent", which is honest but quieter. I am noting it, not filing it.
- A real result always comes first: `state()` returns the result before it computes anything else. A pass or fail
  reported as overdue needs a stale ref, which is F2.

**F1 (Medium): "leave pywidget/ alone" is the wrong test. Unpushed changes to build-phase tools are pinned away.** The
runner unpacks the whole pinned commit with `git archive` and runs that commit's tools/xc.sh from pywidget/ios. The run
reads more than pywidget/, tools/xc.sh and tools/xc_verdict.py:
- Two build phases decide red or green: project.yml:321 runs tools/acknowledgements.py check, and
  scripts/install_packages.sh runs tools/pkg_stage.py stage and check.
- xc.sh runs tools/xc_lock.py, xc_sim.py, xc_idle_evidence.py, xc_helpers.py and personal_claims.py.

Probe: I committed a change to tools/acknowledgements.py, pkg_stage.py and xc_sim.py without pushing it, then asked for a
run. Route queued it (exit 75) pinned at origin/main, the commit without the change, and the note said "its unpushed
commits leave pywidget/ alone, so the job pins the same code". A green from that job would be read as proof of the
acknowledgements change.

The same gap applies to the dirty check. An uncommitted edit to acknowledgements.py or pkg_stage.py is not refused, and
the job tests HEAD without it. My T-1878 "Not findings" line on the dirty check was right for xc_sim.py (it only drives
the run) and wrong for those two (they decide red or green). That miss is mine, and this fix inherited it.

Fix: make DIRTY_PATHS the paths the run reads: pywidget/, tools/xc.sh plus tools/xc_*.py, tools/acknowledgements.py,
tools/pkg_stage.py and tools/personal_claims.py. Add a test that greps tools/xc.sh, pywidget/ios/project.yml and
pywidget/ios/scripts/*.sh for `tools/<name>` and fails when one of them is not covered. Then a new build phase cannot
quietly reopen the gap. Do not use all of tools/: ops-only tool commits are frequent, and they would all be refused for
15 min.

**F2 (Medium): a failed fetch of macbook-results turns a finished job into "overdue, queue it again" (exit 1).**
`wait()` prints the fetch lines, then `state()` judges the stale ref as if it were fresh.

Probe: a job 4421 min old with a stale check-in. Status read it as overdue. Then I posted a `passed` result to origin
and broke the remote. Status printed the two "could not fetch" lines and still said "overdue … Queue it again or run here
with XC_LOCAL=1", exit 1. A worker who follows that advice queues a second full suite for a pass. With load near 1000
tonight, a 120 s fetch timeout is the likely way in. This also inflates the overdue count that T-1913's revisit rule and
T-1918 depend on.

Fix: pass the fetch result into `state()`. When origin/macbook-results did not fetch, never return 1 "overdue": return
75 with "stale copy, cannot judge". Add a test: a result posted, then the fetch broken, gives exit 75 and not "overdue".

**L1 (Low): when local main has diverged, the note says "the same code" and it is not.** When origin/main has moved past
the merge-base with pywidget/ changes, the job tests origin/main's pywidget/, not HEAD's. That is the code that will
land after the rebase, so pinning it is right, but the note misstates it. Fix: when `base != origin/main`, say "origin/main's
code, N commits newer than your base". Add a test for a diverged HEAD.

**L2 (Low): the fetch line keeps the wrong stderr line.** It takes the last line, which for a missing remote is
"(and the repository exists.)". Keep the first `fatal:` line instead.

**L3 (Low): test gaps.** No test for an unpushed commit that touches only tools/xc.sh, which is in DIRTY_PATHS and
should be refused. No test for the silent side of the busy branch (a busy check-in older than LIMIT_S + 600 reads
silent). The mutant only proves the not-silent side.
{% endraw %}

</div>
