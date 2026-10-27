---
layout: "default"
title: "Trial: a git worktree per agent (OPS-6 part 1)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/trial-worktree.md</code></span><span>2026-10-26</span></div><h1>Trial: a git worktree per agent (OPS-6 part 1)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Idris, 2026-10-25 22:58-23:16 ET. Task OPS-6 from #41 (c6407113363 item 3; c6407181591, ops first).
Status: **prototype tested, not switched on.** The Operator prompt change goes to the Investors as a
proposal (#41 item 7). Every number below comes from git history, the HEAD reflog, ops/runs/
transcripts, the supervisor log, or a timed run. Nothing comes from memories or reports.

## 1. Evidence: what the shared tree costs now

Tool: `python3 tools/shared_tree_incidents.py [--since D --until D] [--json]` (test:
tests/shared_tree_incidents_test.py, 7/0; 4 of 4 single-site mutants caught). The class definitions
are frozen as of this entry and will not be changed to fit a result.

Window 2026-10-22 00:00 to 2026-10-26 00:00 ET, 2,429 commits:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Evidence: what the shared tree costs now, scrolls sideways" data-n="2" style="--tw:473px" markdown="1">

| Class | Count | What it is |
|---|---|---|
| repair | 10 | commits that put back what another commit lost: e87b8a27, 7bd19e56, dcc731b6, ada77afa, be6fe125, 61bde2b6, 47f70832, 277037ba, 50c2c821, dab5f386 |
| sweep | 6 | a worker's commit that changed another worker's memory without naming them: 8243bcb3, 37c654eb, 181b75e2 (deliberate P2 scrub, so a known false positive), 2459f841, 2bbb2e0a, 83cf2d25 (mine) |
| amend_x | 1 | an amend that rewrote another worker's commit: bec2d7e0 (Maren's file added to "Ines memory: ADR-007 chair line") |
| **incidents** | **17** | **0.70 per 100 commits** (by day: 0.00, 0.18, 1.26, 0.33) |
| private | 45 | commits made through stage_hunks --commit (the private-index workaround) |
| amend, all | 17 | amends in a shared tree: each one can land on a neighbour's commit |
| lockerr | 21 | transcript lines with a git lock failure (index.lock exists, cannot lock ref) |

</div>


Workaround cost in turns: **546 of 25,846 Bash calls (2.11%)** in the work transcripts are staging
workarounds (stage_hunks, update-index, hash-object, commit_rows, GIT_INDEX_FILE).

Workaround tooling, from git log subjects (counted by hand): 10 commits built locks and private
indexes because of the shared tree: 5303d233 and c7c6074f (board_tick), 52f32e49 and 38617bcb
(stage_hunks), 73cf34e4 (commit_rows), 332633d8 (inbox lock), 49ac6642 (memory_archive lock),
b243f791 (board.py through the board lock), 98a82e6a (red_team locks), 58d5b54c (the supervisor was
edited while it ran).

Limits: the count is a floor. The sweep rule sees only memory files, so it misses the sweeps that
carried board lines and lane files: 1a9b7fb9 (53 files, which caused four of the repairs), 940c49f,
11301816 and Ines's H161 board commit (named in the stage_hunks entry of log/optimizations.md). The
repair rule reads subjects only, so silent fixes are missed. No time cost per incident is measured yet.

Already in use: six worktrees exist outside this trial, made for mutation runs and one stale site
branch (/tmp/bimut/wt, /tmp/flake-wt, /tmp/odx/wt, /tmp/odx_mut_wt, ~/wt-idris-v2, the last one mine
from Day 2). Workers already reach for worktrees when they need isolation.

## 2. Design

1. **One worktree per Agent call.** The Operator runs `tools/agent_worktree.sh create <task-id>
   [--sparse]` and puts the path in the packet. The agent works and commits only there, on branch
   `agent/<task>-<stamp>`, with plain `git add` and `git commit`. No stage_hunks.
2. **Merge-back is done by the tool, never by the agent.** When the call returns, the Operator runs
   `merge <name>` and then `clean <name>`. Under one lock in the common git dir:
   - a dirty worktree is refused (6)
   - a branch that touches the Investors' paths is refused (5). The guard's PROTECTED list is
     relative to CLAUDE_PROJECT_DIR, so a worktree's rules/ is not protected by path, and this
     gate is what closes that hole.
   - a branch that touches shared-state files is refused (5)
   - if main has not moved, it fast-forwards. Otherwise it cherry-picks main..branch onto main
     inside the agent's worktree, so the shared index is never used.
   - the main tree is moved with a two-tree `git read-tree -m -u` (only the changed files; every
     other index entry, staged or not, stays as it is; it refuses rather than overwrite a local
     edit), then `git update-ref` with the old value as a compare-and-swap. A conflict (3) or a
     refusal (4) leaves main, the branch and the worktree as they were.
3. **The security guard.** With COMPANY_RUN=1, rules/hooks/security-guard.py refuses any command
   containing `git pull`, `git merge` or `git rebase`, local or not. The reason it gives is GitHub
   ("brings GitHub's changes in during a session"). The tool runs none of those three, never names
   a remote, and brings nothing from GitHub. A test greps the script for
   fetch/pull/push/remote/merge/rebase calls, and a planted fetch, push or remote line fails it.
   But the hook sees only `bash tools/agent_worktree.sh merge X`, not the git calls inside. So
   whether a local cherry-pick merge-back sits within that rule's intent is a question for the
   Investors, put in the proposal. Until they answer, the tool has run only on throwaway repos and
   a /tmp clone, never on the real main. A second route that needs no ruling: the supervisor runs
   merge-back between sessions, where it already syncs. That costs a session's latency on every
   landing.
4. **Shared state stays in the main tree.** That covers ops/board.md (board_tick already honours
   `BOARD=`; `agent_worktree.sh env` exports it with COMPANY_MAIN), log/events.jsonl, ops/state.md,
   ops/usage.json, ops/inbox/, ops/runs/ and .claude/agent-memory/. Agents write these through their
   locked tools at the main tree's path, and the Operator's session commit lands them, as the ops:
   commits do now. One code change is needed before the trial: tools/events.py takes its path from
   its own location, so it needs an env override (EVENTS=) or COMPANY_MAIN. 44 tools find ROOT that
   way. Only the shared-state writers matter here, and a grep lists them.
5. **../site** is built and published from the main tree only. A worktree's tools/site would write
   to `<worktree root>/site`, so QA builds in a worktree use their own output folder.
6. **Xcode.** DerivedData is per tree (pywidget/ios/build/dd). xc.sh still logs to the main tree's
   ops/runs. A new worktree needs the Vendor/python link (create makes it when main has one) and
   `xcodegen generate`, because the .xcodeproj is not tracked. Measured below: a cold build per new
   worktree costs about 40 s and 472 MB, and copying main's DerivedData copy-on-write does not help
   (Xcode rebuilds in full, because the paths are absolute). Once warm, an incremental build is the
   same as in the main tree. Rule: only one Xcode task runs at a time, so keep **one long-lived build
   worktree**, moved to the main tip at each build task's start, so its DerivedData stays warm. There
   are no SwiftPM packages in project.yml yet. When Runestone lands (ADR-004), pass
   `-clonedSourcePackagesDirPath` to one shared folder.
7. **Sparse by default.** `--sparse` leaves out research/hunt/*-raw/ and ops/site-checks/. Those are
   1.25 GB of the 1.38 GB tracked tree. Lanes that need raw data take a full checkout.
8. **The Agent tool's `isolation: "worktree"`, checked with one probe call** (agent abb05e38, read-only):
   - It made `.claude/worktrees/agent-<id>` inside the repo (excluded in .git/info/exclude) on
     branch `worktree-agent-<id>`, as a full 1.1 GB checkout with no Vendor link. It was removed
     automatically because nothing changed.
   - It was based on **origin/main = 2e4251f9 (2026-10-24 20:12), 780 commits behind local
     main**. Pushes have been refused since then: the supervisor log says "a commit to push holds a
     file over GitHub's 100 MB limit" (#54).
   - Claude Code's own check refused a compound command with git calls in it.
     CLAUDE_PROJECT_DIR was empty in the agent's shell; I did not check whether the hooks still ran.
   - Merge-back is left to the caller.
   - **Verdict: not usable as it stands.** An agent on a base a day old is a correctness failure.
     Look again if the base can be set to local HEAD; I have not checked whether a setting does that.

## 3. Prototype measurements

tools/agent_worktree.sh (create, env, merge, clean, list); tests/agent_worktree_test.sh, 22/0. The
test covers: fast-forward; the neighbour's staged and unstaged edits kept; a replay when main has
moved, with linear history; a conflict that changes nothing; refusals for the Investors' paths, the
board and memory; a dirty worktree; a local edit in the main tree; a redundant replay; clean, and
clean refusing unmerged work; sparse create; lock timeout; no remote calls.

On a /tmp clone of the repo at 2416ec28 (12,701 tracked files, 1.38 GB). Load average 17-20 from
other sessions during the build runs, so the build times carry noise:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Prototype measurements, scrolls sideways" style="--tw:639px" markdown="1">

| Step | Full checkout | Sparse |
|---|---|---|
| create (3 runs, ms) | 3730, 3770, 3962 | 2159, 2128, 2185 |
| disk per worktree | 1,379,660 KB, 12,701 files | 177,380 KB, 2,543 files |
| merge-back (ms) | 2060 (ff), 558, 508 (replayed) | 2128, 2394, 2598 (replayed) |
| clean (ms) | 1410, 1329, 1853 | 391, 412, 456 |
| 12 parallel agents, disk | 16.6 GB | 2.1 GB (107 GB free) |

</div>


Sparse overhead per agent call: about 2.2 s create, 2.1-2.6 s merge-back and 0.4 s clean, so about
5 s in all.

PyWidget build, Simulator iPhone 17e, `tools/xc.sh ... -derivedDataPath build/dd build`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. Prototype measurements, scrolls sideways" style="--tw:816px" markdown="1">

| Build | Main tree | Worktree |
|---|---|---|
| first build | 18.9 s (warm DerivedData) | **39.8 s cold, 472 MB DerivedData** |
| no-op | 8.6 s | 14.8 s |
| one file touched (alternated main, worktree, main, worktree) | 21.7, 19.5 s | 21.3, 17.9 s |
| seeded with a copy-on-write copy of main's DerivedData | n/a | 35.4 s (2,065-line log: a full rebuild) |

</div>


## 4. The experiment

- **Hypothesis.** A worktree per agent removes the shared index and the shared working copy, so
  staging workarounds and git lock failures mostly go away. Merge-back refusals do not replace them
  one for one, and nothing gets worse on quality.
- **The one metric.** Shared-tree repair actions per 100 Bash calls in a work session. That is
  staging-workaround calls (the regex in section 1), plus git lock failures, plus merge-back
  conflicts and refusals (exits 3, 4 and 6, logged by the Operator), plus repair commits. Computed
  per session from the transcript and the tool's output. Baseline 2.11 + 0.08 = about 2.2.
- **Predicted size.** Below 0.5 per 100 in worktree sessions, down by 75% or more. Merge-back
  conflicts predicted at 1 in 20 merges or fewer.
- **Guards, which must not get worse.** Incidents per 100 commits (0.70 now); red test runs;
  wall-clock overhead per agent call, median 6 s or less; and no lost commit.
- **Window, set by sample size.** About 101 Bash calls per work session (25,846 over 255
  sessions). With 6 sessions per arm (about 600 calls each), the control expects about 13 actions
  and the prediction 3 or fewer, which a one-sided Poisson test separates. So: 12 alternating work
  sessions, about one day at the current cadence.
- **Switchback.** The governor marks each work session A (shared tree, as now) or B (worktree),
  alternating, and writes the arm into the run record, so the Day 4-5 phase cannot pose as the
  effect. Within a session every Agent call uses the same arm. Nothing mixes.
- **Revert rule.** Stop at once and switch back if any merge-back loses a commit (a branch commit
  missing from main: checked after each merge with `merge-base --is-ancestor`), if the guard refuses
  the tool, or if free disk falls under 20 GB. After 12 sessions, revert and record "no effect" if
  B is not below A at p < 0.05, or if the median overhead goes over 6 s. Otherwise keep it, and
  watch the metric on its XmR chart.
- **Not in flight yet.** It waits on (a) the Investors' answer to the proposal: the Operator
  prompt change, and whether local cherry-pick merge-back is within security-guard's rule, or the
  supervisor should run it; (b) the events.py path override; (c) the governor writing the arm.
  Nothing else is in flight on this metric.

## 5. Open
- The proposal text (the exact Operator prompt diff) goes to the Investors through #41 item 7. Odalys
  holds OPS-6 parts 2 and 3: the task store, and task-scoped context.
- Clean the stale ~/wt-idris-v2 (mine) once its branch is checked as landed.
- The 780 unpushed commits (#54 blob) are outside this trial, but they also make the Agent tool's
  worktree base stale.
{% endraw %}

</div>
