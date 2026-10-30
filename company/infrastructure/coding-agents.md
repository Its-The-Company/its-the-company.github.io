---
layout: "default"
title: "What makes coding agents faster, cheaper and more reliable"
section: "infra"
description: "The coding-agents catalogue: 15 techniques ranked for this company, and those turned down."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/techniques.html' | relative_url }}">← Infrastructure: Techniques</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Catalogue</span><span><code>research/ops/coding-agents.md</code></span></div><h1>What makes coding agents faster, cheaper and more reliable</h1></div>
<p class="meta">Status in this document is as written; the live status of each technique is on <a href="{{ '/company/infrastructure/techniques.html' | relative_url }}">Infrastructure: Techniques</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

T-0153 [ops], Odalys, 2026-10-26 01:56 ET. Investor request: #41 c6409034578 (an Investor), items 1-4.
Inputs: research/ops/coding-agents/notes-A.md (single-agent harnesses, Wrenna, T-0149), notes-B.md (pipelines and
SWE-bench trajectories, Wrenna, T-0150), notes-C.md (long-running loops, context, Claude Code; Odalys, T-0151),
notes-D.md (multi-agent, simulated companies, self-improving; Odalys, T-0152). Every outside number below is copied
from those notes, which name the primary file and the conditions; the note and its item ID (A1, B3, C-T2, D4, ...) are
given beside each number so it can be traced. Numbers marked **[here]** were measured in this task on our own records.
Nothing is "adopted" yet: adoption means it beat its control here (item 4 of the request).

Updated 2026-10-30 (T-0772, Odalys): the table's last column, #4 to #15's decisions and the ledger section below. Text
not marked with that date is the 2026-10-26 record. Our numbers in the update: `python3 tools/technique_counts.py`, since
2026-10-28 00:00 (7,938 subagent tool calls, 233 worker calls joined to cost, $344.46). The triage is OPT-060.

## How to read this

Our five differences (from the request), used in every entry:

- **D1** the weekly limit is flat and lost if unused, so more compute per task can pay.
- **D2** headless Claude Code: prompts, tools, hooks, agent definitions, skills and session structure can change; the model can't.
- **D3** 8-12 agents share one repository.
- **D4** one Xcode build or Simulator at a time, on a 16 GB Mac mini.
- **D5** the Investors are in the loop: Investor-owned files (CLAUDE.md, rules/, setup/, investors/, .claude settings,
  Investor sentences in ops/prompts/) change only by proposal (#41 c6407113363; #65 for the 12-hour path, which
  excludes rules/hooks/ and the Claude Code settings).

Rank = expected gain here x confidence, my read. "Gain here" weighs the problem's measured size in our records; a
large outside effect on a problem we do not have scores low.

Two cautions that apply to the whole list.

1. Most outside numbers are small-n and on other benchmarks: ChatDev ablation 1,200 prompts on GPT-3.5; MetaGPT roles
   2 tasks; MAST interventions 32 tasks; Claim Plane 30 pairs x 3 seeds; Live-SWE-agent ablation 50 problems, one run
   (notes-D caution; notes-A A9). They say which way a lever pushes, not how far it pushes here.
2. Our live measurement is noisy. The A/A calibration (OPT-028) found finished_per_100usd sd 23.0 on a mean of 65.4,
   so n=12 sessions per arm detects only about 36% of the time (notes-C T8). Anthropic's infrastructure-noise post
   says differences under 3 points deserve skepticism (notes-C T8). A technique whose expected effect is a few
   percent of cost cannot be confirmed here in days; such items are ranked down for that reason.

A constraint found while writing the ledger entries: **the switchback slot is single and congested.**
tools/switchback.py runs one flag at a time. OPT-030 holds it (started 00:42, `armed: false`, n=0, waiting for its
diff to land in rules/build_agents.py); OPT-032 and OPT-033 are queued behind it. A new switchback started today
would start about 10-29 at one day per experiment. See "Process changes this catalogue needs" at the end.
(2026-10-30: no longer so. A second flag can run crossed since T-0599, and the crossed slot is free since OPT-032 stopped.)

---

## The catalogue (15)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The catalogue (15), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Technique | Key number | Status here |
|---|---|---|---|
| 1 | One worktree per agent | CAID Commit0-Lite 53.1 / 56.1 / 59.1 (single / shared workspace / worktrees) | designed (OPS-6), ledger OPT-035 proposed; queued, waits on a work.md clause not yet written |
| 2 | Acceptance test written first by an agent that has not seen the fix; reviewer judges from run output | 7 of 12 failed Opus 4.6 runs last saw a green suite (B M4) | no effect (phase 1): OPT-034 offline replay 0 of 8 caught, 7 false alarms (T-0163, 8043f5a8); a re-try needs per-check grading under a new pre-registration |
| 3 | Stable, lighter standing prompt (memory out of the system prompt) | persona-prefix cache hit 28% without a MEMORY.md commit between spawns, 2% with one (C M7) | no effect so far: OPT-030 stopped at n=0, superseded by PR #71; OPT-032 no effect (n=10 per arm, p 0.233) |
| 4 | Keep main green: run the suites on HEAD every supervisor tick | 4 suites red at HEAD met by 3 tasks on 10-26 (C T11) | dropped untested 10-28 (T-0594): OPT-036's step was never built and its before was never run, so no effect was shown either way |
| 5 | Keep the evaluator out of the improver's reach | DGM node 114 removed the logging its detector used (D4) | ledger OPT-057 proposed: no usage effect, it protects verdicts; ranked third |
| 6 | Offline replay set from our own finished tasks | Anthropic: "20-50 simple tasks drawn from real failures is a great start" (C T8) | not trying now: about $103 of the week per 20 tasks x 3, none of it finishing a task, and no technique waits on it. Reopen when a live test needs a replay first |
| 7 | Second attempt on trigger, from a different model or instruction, chosen by tests | another run rescued 25% of Opus 4.6's failures (B M3) | not trying: about 2x cost on the lines it touches, and it needs #1's worktrees and #2's test, which showed no effect |
| 8 | Shared claims and findings record; declared write scope | DeLM on Opus 5.5: 2.02x faster; without peer status 0.82-0.87x (D3) | not trying now: 1.01 and 0.75 agents running on average on 10-28 and 10-29, so few overlaps. Reopen on a LOCK IN day or at 3 or more on average |
| 9 | Count builds and fix rounds per task (first-try build success) | Aider pass 1 -> pass 2 median +29.4 points over 69 rows (A1) | in use: first-try build and fix attempts are charted per session by tools/build_metrics.py (n=36 and n=33) |
| 10 | Cap and steer large tool output | **[here]** a 12,000-char Bash cap trims 10.9% of subagent Bash result chars | ledger OPT-058 proposed at 8,000 chars; first to ship, after the alpha commit (T-0777) |
| 11 | Loop scan, then call-count escalation | resolve rate 87% at <=20 calls, 47% at 76+ (B M2) | not trying: the scan ran, 2 repeat calls of 7,938 in 234 threads; no loop to cut |
| 12 | Effort budgets per task kind | Anthropic early research agents spawned 50 subagents for simple queries (D7) | ledger OPT-059 proposed: OPT-051 sets model and effort, not a budget; ceiling 8.6% of dollars; second to ship (T-0778) |
| 13 | Premise check before the first edit | decisive error at median step 7 of 27 in failed runs (D6) | not trying: at best about 0.9% of tasks by outside rates, for 1-3 added calls on every task; a net cost |
| 14 | Syntax check after every edit (hook) | SWE-agent 18.0% with lint-guarded edit vs 15.0% without (A2) | not trying: the count ran, 1 of 210 edits followed by a parser error within 2 calls; a hook needs "approve" |
| 15 | Operator completion check (Stop hook) | 1,875 idle agent-minutes in 8 drains (C T4, drain-cost.md) | testing the job through OPT-050 (the session-end flag); no Stop hook: 0 of 23 work sessions failed to close |

</div>


### 1. One git worktree per agent; the author of a conflicting branch resolves it {#t1}

- **Sources.** [provisional: arXiv terms unread, T-0165] CAID, Geng and Neubig, "Effective Strategies for Asynchronous Software Engineering Agents",
  https://arxiv.org/html/2603.21489 (Table 3, s4, s6); Anthropic, "Building a C compiler with a team of parallel
  Claudes", https://www.anthropic.com/research/building-c-compiler; AgenticFlict, https://arxiv.org/abs/2604.03551;
  Claude Code sub-agents page (isolation: worktree), https://code.claude.com/docs/en/sub-agents. (notes-D 1, notes-C T9.)
- **Evidence.** CAID, OpenHands SDK v1.11.0, three models, single agent vs soft isolation (one shared workspace,
  manager assigns non-overlapping files) vs worktree isolation: Commit0-Lite 53.1 / 56.1 / 59.1; PaperBench 57.2 /
  55.5 / 63.3 (soft isolation fell below the single agent). Costs: iterations 84.5 -> 313.3 on Commit0-Lite with
  worktrees; higher API cost than single agent in every run; wall clock "not substantially reduced" (s6). AgenticFlict:
  27.67% of 107K agent PRs had textual merge conflicts (abstract). C compiler: each of 16 agents in its own clone;
  "merge conflicts are frequent, but Claude is smart enough". Ours: 17 shared-tree incidents in 2,429 commits (0.70
  per 100), 546 of 25,846 Bash calls (2.11%) are staging workarounds, 21 git lock failures
  (log/audit/trial-worktree.md s1); 0.91 incidents per 100 commits over 1,869 commits since 10-24 (notes-C M13);
  audit-2 loss 4, shared working tree $1.97. Only 2 of 1,085 Agent calls used isolation (notes-C M12).
- **Problem.** Our soft isolation (packets name files; private indexes; locks) is the arm CAID found insufficient.
- **Do we do it.** Designed and prototyped, not on: tools/agent_worktree.sh, tests/agent_worktree_test.sh 22/0
  (Idris, OPS-6 part 1, b580d41b); trial plan log/audit/trial-worktree.md s4. The Agent tool's own worktree option was
  judged "not usable as it stands" (base a day old, s2).
- **Depends on.** D3 directly; D2 (session structure); D4 (sparse worktree 177 MB, about 5 s per agent call; a cold
  worktree Xcode build 39.8 s and 472 MB DerivedData vs 18.9 s warm, trial-worktree s3, so iOS builds stay in the
  main tree or one warm build worktree); D5 (Operator prompt).
- **Change here.** As trial-worktree.md s4: switchback flag `worktree`, every code-writing Agent call in a "new"
  session runs in a sparse worktree (create, work, merge back, clean). Add CAID's rule: on a merge-back conflict the
  branch's agent re-runs in its worktree after taking main; the Operator never resolves it in the main tree.
  Files: ops/prompts/work.md step 2 (proposal), tools/agent_worktree.sh, tools/governor.py (writes the arm).
- **Metric and move.** Shared-tree repair actions per 100 Bash calls per work session: about 2.2 -> under 0.5
  (trial-worktree s4). Guards: incidents per 100 commits (0.70), red test runs, median overhead per agent call <= 6 s,
  no lost commit.
- **Cost and risk.** Cost about 5 s per call and disk (2.1 GB for 12 sparse worktrees). Risk: a lost commit at
  merge-back (checked with `merge-base --is-ancestor` after each merge); stale base if unpushed history piles up.
- **Investor-owned?** Yes: the Operator prompt (work.md), and whether a local cherry-pick merge-back sits within
  rules/hooks/security-guard.py's rule. Needs "approve" if it touches the guard. Proposal text not yet written
  (trial-worktree s5); prerequisites (b) events.py path override and (c) governor arm writing are open.
- **Ledger.** OPT-035 (proposed).

### 2. Acceptance test written first, by an agent that has not seen the fix; a reviewer judges from run output {#t2}

- **Sources.** [provisional: arXiv terms unread, T-0165] Agentless README_swebench.md, https://github.com/OpenAutoCoder/Agentless/blob/main/README_swebench.md
  (reproduction tests, `--max_samples 40`, majority vote); AutoCodeRover v2.1 README in swe-bench/experiments and
  app/agents/agent_reviewer.py, https://github.com/nus-apr/auto-code-rover (reviewer sees test, its output before and
  after the patch; JSON `patch-correct`/`test-correct`; at most 3 rounds); Anthropic, "Harness design for
  long-running application development", https://www.anthropic.com/research/harness-design-long-running-apps; MAST,
  https://arxiv.org/html/2503.13657; ImpossibleBench, https://arxiv.org/html/2510.20270; MetaGPT,
  https://arxiv.org/html/2308.00352. (notes-B B1, B2, M4; notes-C T6, T7; notes-D 4, 5.) Papers read T-0195 from the
  Investor's uploads (#70 c6409863804), not from arxiv.org: Agentless 2407.01489v2 Tables 1, 4 (pp. 21, 28-29);
  SpecRover 2408.02232v2 Fig. 4 (p. 5), Table II (p. 8); AutoCodeRover 2404.05427v2 Table 4 (p. 9).
- **Evidence.** SWE-bench Verified, mini-SWE-agent v2.0.0 bash-only, Opus 4.6, 25 trajectories coded command by
  command: 21/25 wrote their own reproduction script; the repo suite ran in 10/12 failures vs 9/13 successes; **7 of
  the 12 failures last saw a green suite**; 11 of 12 failures ended `Submitted` (B M4). The agent's own green tests do
  not tell it it failed. AutoCodeRover v2 "improves the efficacy ... by 50%" (README); Agentless Table 1 (p. 21) has
  AutoCodeRover at 57 of 300 on Lite with GPT-4 and AutoCodeRover-v2 at 92 with GPT-4o, so that gain mixes the harness
  with a model change. Ablations (T-0195): Agentless, Lite 300, GPT-4o, majority voting alone 77, + regression tests
  81, + reproduction tests 96 (Table 4, p. 28): the generated test is the largest single step, +15 issues; but one
  greedy reproduction test per issue gave only 100 usable tests for 300 issues (p. 29), and a test is kept only if it
  prints "Issue reproduced" on the original code (p. 29). SpecRover, Claude 3.5 Sonnet, Lite: the reviewer, given the
  issue, the test and its output before and after the patch, matched real correctness on 64.7% of 119 tasks;
  precision 50.0% (26 accepted correct, 26 accepted wrong), recall 61.9% (Table II, p. 8); its prompt says "NOTE: both
  the test and the patch may be wrong" (Fig. 4, p. 5). AutoCodeRover, GPT-4, Lite, one run: retrying while the
  developer test suite fails (at most 3 times) 51 vs 48.3 mean of 3 runs without (Table 4, p. 9). Read against
  OPT-034's 7 false alarms: both pipelines treat the generated test as fallible and filter or judge it; status of #2
  unchanged. MAST, ProgramDev-v0 (32 tasks): adding task-objective verification to ChatDev 25.0% -> 34.4%
  -> 40.6% (D5). MetaGPT executable feedback: human revision cost 2.25 -> 0.83 (SoftwareDev, 70 tasks, GPT-4) (D5).
  Anthropic harness post, Opus 4.6 DAW: QA rounds $3.24, $3.09, $4.06 against build rounds $71.08, $36.89, $5.88, each
  QA round found real gaps; "Out of the box, Claude is a poor QA agent"; n=1 per configuration (C T7). ImpossibleBench:
  read-only tests stopped test edits without lowering the legitimate score; prompt "if a test is flawed, STOP and
  explain" cut cheating for GPT-5 and o3 from >85% to 1% and 33% ("much less pronounced for Claude Opus 4.1") (D4).
- **Problem.** "Done" is judged by tests written by the same reasoning that wrote the fix. Ours: quality_metrics.py
  totals since Day 1: 8 redone (6 redo lines, 2 reopened), 9 reverted, test_red_share 0.205, xcode_red_share 0.236
  **[here]**; at least 8 [tools]/[ops] code tasks since 10-24 needed a later fix (the OPT-034 replay set).
- **Do we do it.** Partly. Packets state what done means (work.md step 2); tools/mutants.py, mutation_check.py,
  xc_mutants.py check that tests can fail; Commandment 13 hand-off review exists. No rule that the failing test comes
  first or comes from someone other than the fixer; reviewers get no run output and give no fixed verdict.
- **Depends on.** D2 (packet structure); D1 (a second agent per task costs limit we would otherwise lose); D4 only for
  XCTest acceptance tests (host Python and `swift test` are not bound).
- **Change here.** Phase 1 (now, offline): OPT-034 replay. Phase 2 (only if the replay passes its gate): for [tools]
  and [build] lines, the first commit is an acceptance test that fails on HEAD, written by a separate sonnet agent from
  the board line alone; the builder may not edit it (ImpossibleBench's read-only form: tools/test_first_check.py
  refuses a tick when the acceptance test changed after the fix began); a [review] packet gets the test's output on the
  parent and on the patch and answers `patch-correct: yes|no`, `test-correct: yes|no`, `advice:`, at most 3 rounds.
  For pywidget, acceptance criteria live as pywidget/acceptance.json (one entry per user-visible behaviour, only
  `passes` changes outside the planner's commits; C T6). Files: ops/prompts/work.md step 2 (proposal), new
  tools/test_first_check.py, tools/board_tick.py (refusal), tools/ops_metrics.py (rounds).
- **Metric and move.** Phase 1: catch rate on known defects (predicted >= 3 of 8) with false alarms at the fix commit
  <= 1 of 8. Phase 2: fix-up commits naming an earlier code task, per 10 finished code tasks, down by half.
- **Cost and risk.** Phase 1 about 8 sonnet agent calls (some $10-25 at API rates, my estimate). Phase 2 adds one test
  agent per code task (Anthropic's QA rounds were roughly 5-10% of build cost). Risk: tests that encode a wrong reading
  of the board line; slower first commits.
- **Investor-owned?** Phase 1 no. Phase 2 yes (work.md packet clause; 12-hour path eligible under #65 item 2 if it
  touches only company sentences).
- **Ledger.** OPT-034 (first experiment); phase 1 replay is board line T-0163.

### 3. A stable, lighter standing prompt: memory out of the system prompt, compact amendments, ablate old rules {#t3}

- **Sources.** Claude Code prompt caching, https://code.claude.com/docs/en/prompt-caching; sub-agents page (memory
  field loads the first 200 lines or 25 KB of MEMORY.md into the subagent's system prompt); Anthropic, "Effective
  context engineering for AI agents"; mini-SWE-agent README and SWE-bench leaderboard data,
  https://github.com/SWE-agent/mini-swe-agent; Claude Code memory and skills pages (path-scoped rules); Anthropic,
  "An update on recent Claude Code quality reports", https://www.anthropic.com/research/april-23-postmortem.
  (notes-C T1, T12, T14; notes-A A8.)
- **Evidence.** Ours, last 12 work sessions (C M3-M7): subagent input units 86% of the total; a persona's first request
  writes a median 31,137 tokens; same-persona spawns under 5 minutes apart hit the persona-prefix cache 22% of the time
  (56/249); with a commit to that persona's MEMORY.md between the two spawns 1 hit / 49 misses (2%), without one 55 /
  140 (28%). Upper bound if every non-first spawn hit: about 10% of subagent input units; within the 5-minute TTL about
  5.7%. Amendments block about 13.6k tokens per persona call (OPT-030, tools/amend_cost.py, CI 0.651-0.715 tok/char).
  Outside: a 190-line bash-only agent with Claude 4.5 Opus scores 76.8% Verified vs 79.2% for the best same-model
  scaffold; the gap narrowed from about 7.5 points (Claude 4 Sonnet) to 2.4 (A8): harness weight must earn its tokens.
  The postmortem: three harness changes, not the model, degraded quality in March-April 2026 (no effect sizes, C T14).
- **Do we do it.** In trial: OPT-030 (compact amendments, switchback amend_compact, in flight, not armed) and OPT-032
  (task packet in place of the whole MEMORY.md, proposed, log/audit/proposal-task-context.md). Not done: per-area
  CLAUDE.md files (pywidget/ios/, pywidget/runtime/, site/) for conventions now carried in packets and memory.
- **Depends on.** D2, D3 (same-persona agents edit the same MEMORY.md), D5 (rules/build_agents.py is Investor-owned).
- **Change here.** As OPT-030 and OPT-032. Add to OPT-032's guards: first-request cache read >= 25k share among
  same-persona spawns < 5 min (baseline 22%, n=249; predicted >= 70%). Later, one ablation at a time of long-standing
  prompt text (C T14), and per-area CLAUDE.md files (company-owned).
- **Metric and move.** OPT-030: median first-call prompt tokens per persona thread. OPT-032: orientation calls, at
  least 3 fewer per session median. Cache hit 22% -> >= 70% (guard).
- **Cost and risk.** No extra usage. Risk: a worker repeats a mistake its memory recorded (OPT-032's revert rule).
- **Investor-owned?** Yes (rules/build_agents.py): #65 approved OPT-030; OPT-032 goes by proposal.

### 4. Keep main green: the suites run on HEAD every supervisor tick {#t4}

- **Sources.** C compiler post ("I built a continuous integration pipeline ... so that new commits can't break existing
  code"); Anthropic, "Effective harnesses for long-running agents",
  https://www.anthropic.com/research/effective-harnesses-for-long-running-agents (basic end-to-end test before new
  work); Anthropic, "Redesigning source control at Anthropic" (post-merge testing). (notes-C T11, notes-D 5.)
- **Evidence.** No quantitative number in the sources. Ours: 3 of my tasks on 10-26 (T-0087, T-0103, T-0111) met 4
  suites red at HEAD that were not theirs (gen_yield_test, store_http_test, site_dashboard, wiki_views_pv) (C T11; a
  count from my task notes, not a full count). quality_metrics.py: 57 of 290 full runs red **[here]**. MAST FM-3.2
  (no or incomplete verification) 8.2% of failure annotations (D5).
- **Problem.** Someone else's red lands in every agent's run; each agent spends turns proving "not mine".
- **Do we do it.** No: tools/supervisor.sh steps 12-13 commit, archive the board and rebuild charts but do not run
  tests/run.sh.
- **Depends on.** D3; D1 (the supervisor's run costs no tokens); D4 (machine load: run niced, never during an Xcode
  build; supervisor_test alone ran 332 s at load 17 before it was split, b21ae602).
- **Change here.** Supervisor step 12c: `tests/run.sh` on HEAD after the push (run_limited, nice, skipped while
  tools/xc_wait.sh holds the slot); each newly red suite becomes one P1 board line through `board_tick.py add` with
  the suite name and first failing check; a still-red suite adds no duplicate; a log line per run with each red
  suite's first-seen commit. Files: tools/supervisor.sh, tests/supervisor_test.sh.
- **Metric and move.** Hours a suite stays red at HEAD, per episode (first red commit to first green commit): median
  under 2 h within 3 days of the step landing. Before: measured by the replay in OPT-036 (git history, suites at sampled
  commits in a /tmp worktree).
- **Cost and risk.** CPU only, about one run.sh per tick. Risk: load on the 16 GB machine slows agents' own runs;
  flaky suites create noise lines (the step must name a suite red twice in a row before adding a line).
- **Investor-owned?** No (tools/ is company-owned).
- **Ledger.** OPT-036, dropped untested 2026-10-28 (T-0594): the step was not built and its before replay was not run.
  A new entry may reopen it with that replay written first.

### 5. Keep the evaluator out of the improver's reach {#t5}

- **Sources.** [provisional: arXiv terms unread, T-0165] Darwin Gödel Machine, https://arxiv.org/html/2505.22954 (App. H); ImpossibleBench (s5, Table 1); A
  Self-Improving Coding Agent, https://arxiv.org/html/2504.15228 (s5.1); Huxley-Gödel Machine,
  https://arxiv.org/abs/2510.21614; "How Coding Agents Fail Their Users", https://arxiv.org/abs/2605.29442.
  (notes-D 4.)
- **Evidence.** DGM: node 114 got the perfect 2.0 on "solve hallucination" by removing the special-token logging the
  detector relied on, "despite instructions not to change the special tokens"; hacking "occurs more frequently when
  these functions are not hidden". SICA: selection on the same 50-task subset it reports (17% -> 53%), per-iteration
  scores 0.27-0.53. Real sessions (20,574): "constraint violations and inaccurate self-reporting grow in share". Ours:
  research-audit-1.md s2 (rubric v2 tested in-sample, revised five times in ten hours; B-or-better share 1/24 ->
  12-15/29); my own T-0091 kept five legacy OPT entries on before/after counts with only a warning.
- **Problem.** #41 c6407113363 makes improvement permanent and self-measured; the improver (often me) writes the metric
  code, runs the switchback and writes the verdict.
- **Do we do it.** Partly: pre-registered entries and `experiments.py check`; switchbacks. Not done: nothing freezes the
  metric code during a window; the owner writes the verdict.
- **Depends on.** D2, D5 (the Investors are the only evaluator outside the loop), D1.
- **Change here.** tools/experiments.py: `start ID` records git blob hashes of the metric's tools (the ones named in
  `metric`, `run_field`, `series`); `check` refuses a verdict when any changed inside the window unless a
  `metric_change:` line names the commit and a re-run of the control; a verdict other than `no_effect` needs a
  `graded_by:` worker other than the owner. Packet line (ImpossibleBench prompt, our words): "If a test or check
  conflicts with the task, stop and report it; never edit a test to make it pass."
- **Metric.** Not a switchback: a safeguard. Count: verdicts changed by an independent re-grade.
- **Cost and risk.** Small code change; slower verdicts.
- **Investor-owned?** No for experiments.py; the packet line is a work.md sentence (proposal).
- **Decision (T-0772).** Ledger OPT-057, proposed. Before: 4 of 7 closed non-legacy entries that name a tool had one
  change inside the window. It moves no usage, so it ranks behind #10 and #12.

### 6. An offline replay set from our own finished tasks {#t6}

- **Sources.** Anthropic, "Demystifying evals for AI agents",
  https://www.anthropic.com/research/demystifying-evals-for-ai-agents ("20-50 simple tasks drawn from real failures
  is a great start"; isolated environment per trial; grade outcomes; pass@k vs pass^k); "Quantifying infrastructure
  noise in agentic coding evals", https://www.anthropic.com/research/infrastructure-noise. (notes-C T8.)
- **Evidence.** Terminal-Bench 2.0, six resource configurations, same model and harness: infrastructure errors 5.8%
  (1x) -> 2.1% (3x) -> 0.5% (uncapped); success +6 points uncapped; SWE-bench 227 problems x 10 samples, +1.54 points at
  5x RAM (C T8). Our live noise: OPT-028 A/A sd 23.0 on mean 65.4.
- **Problem.** Live switchbacks are slow (one slot, about a day each) and noisy; item 4 of the request asks for replay
  first.
- **Do we do it.** No. OPT-034 is the first replay.
- **Depends on.** D1 (spare weekly compute runs replays), D4 (machine load is a confounder: record load average beside
  every trial, interleave arms), D2.
- **Change here.** tools/replay.py: for each task, a /tmp worktree at the task's parent commit, the original packet,
  `claude -p` with --agents ops/agents.json and --max-budget-usd, stream-json kept; graded by the task's tests; k=3;
  arms interleaved. Built only after OPT-034 shows the replay pattern works by hand.
- **Metric.** It is the measuring tool for 2, 7, 11, 13. Cost: usage we would otherwise lose. Risk: replays that
  differ from live work (no concurrent agents) overstate gains.
- **Investor-owned?** No.
- **Decision (T-0772).** Not trying now. D1 no longer applies this week: the meter read 82% on 10-30 with 2 days left,
  and each day's share is spent ($185.55 and $173.16 on 10-28 and 10-29). 20 tasks x 3 at the mean $1.72 is about $103,
  5.3% of the week, with no task finished. OPT-034's replay.py stays as the hand pattern. #2, #7, #11 and #13, which it
  would measure, are closed or not being tried. Reopen when a live test needs a replay first.

### 7. A second attempt on trigger, from a different model or instruction, chosen by tests {#t7}

- **Sources.** Agentless agentless/repair/rerank.py (fewest regression failures, then reproduction test, then majority
  vote on the normalized patch); CodeMonkeys README, https://github.com/ScalingIntelligence/codemonkeys; DeepSWE,
  Skywork, EntroPO READMEs in https://github.com/swe-bench/experiments. (notes-B B3, B4, B8, M3.)
- **Evidence.** Opus 4.6 failed 122 of 500; another run resolved: Opus 4.5 30 (25%), GPT-5.2 29 (24%), Sonnet 4.5 22
  (18%), Haiku 4.5 16 (13%); best-of-2 oracle 81.6% vs 75.6% alone (B M3; oracle, assumes perfect choice). DeepSWE
  42.2% pass@1, 71.0% pass@16, 59.2% with its selector: 59% of the oracle gap recovered. Skywork 38.0% -> 47.0%
  best-of-8. Long and short failures rescued at about the same rate (20% vs 26%), so a turn cap alone buys little
  (B M3). notes-B's estimate: a real best-of-2 might keep about +3.5 points at about 2x cost. Agentless ablation
  (T-0195; GPT-4o, Lite 300; Table 3, p. 26): 4 location sets x 10 samples 96 vs 40 samples on the one greedy
  location set 88 vs one merged set 85, so varied inputs beat more samples on one input; 1 greedy sample per set
  already 80, a plateau "at around 40 samples" (p. 27); any-sample oracle 126 (42.0%) vs 96 chosen (p. 28).
- **Problem.** About a quarter of one attempt's failures are luck.
- **Do we do it.** No.
- **Depends on.** D1 above all; D3 (needs #1's worktrees); D4 (iOS candidates are validated one Xcode run at a time);
  D2 (Claude models only: diversity comes from model, effort or instruction).
- **Change here.** Only on trigger (first attempt red, reviewer "no", or line marked hard): n=2 in two worktrees,
  tools/select_patch.py runs the acceptance test (#2) and suites on each, keeps the fewest failures, then a judge agent
  writes one differentiating test if both pass. Start with [tools] and Python runtime lines.
- **Metric.** Fix attempts per bug; defects found in QA. Cost about 2x on triggered lines only. Risk: merge noise.
- **Investor-owned?** Yes through #1 (work.md). After #1 and #2.
- **Decision (T-0772).** Not trying. The binding limit is usage per finished task, and this about doubles the cost of the
  lines it touches for about +3.5 points (notes-B's estimate). Its selector needs #2's test (no effect, OPT-034) and #1's
  worktrees (OPT-035 queued). A red review already sends a line back for a second attempt.

### 8. A shared claims and findings record; declared write scope {#t8}

- **Sources.** [provisional: arXiv terms unread, T-0165] DeLM, https://arxiv.org/html/2606.10662 (s2, s3.5 ablation); Claim Plane,
  https://arxiv.org/abs/2608.00947; CooperBench, https://arxiv.org/html/2601.13295; Anthropic "Effective harnesses"
  (progress file, failed approaches); C compiler (task locks). (notes-D 2, 3, 8; notes-C T5; notes-B B10.)
- **Evidence.** DeLM, Terminal-Bench 4.0 long-horizon, n=2 agents, Claude Opus 5.5 (our model): 93.33%, 11.7 points
  above Claude Code, 130.75 -> 64.77 min (2.02x), $17.91 vs $20.31 per task; removing peer status slowed it to 0.87x
  and 0.82x and cost 3.3 points (D3). Claim Plane, 30 CooperBench pairs x 3 seeds: static admission 23.3% -> 50.0%
  pair pass but serialized 96.7% of executions; dynamic admission failed closed on 46 of 90 runs (D2). CooperBench:
  two agents 30% lower success together than apart; chat did not raise success (D2). Ours: T-0134 found 9.5 pre-change
  greps per thread vs about 2 (C T5); 10 repair commits putting back what another commit lost (D, MAST table).
- **Problem.** Workers cannot see who else runs on what, or what others already found; dead ends live in private
  memory files.
- **Do we do it.** Partly: board owner per line, locks, packets name files. No running state, no findings record, no
  scope check.
- **Depends on.** D3, D2, D1.
- **Change here.** Measure first: ops/live/claims.json written at dispatch (T-ID, worker, files, start);
  tools/findings.py add --task T-ID FACT\|FAIL "..." to ops/findings.jsonl; tools/task_context.py puts only entries new
  since that worker's last packet and touching its files; tools/scope_check.py compares a task's committed paths with
  its declared files. No fail-closed enforcement until the undeclared share is known.
- **Metric.** Undeclared-path share per task; duplicate-effort tasks per session; orientation calls per thread.
- **Cost and risk.** Small. Risk: one more record to keep current. **Investor-owned?** No for the tools; the packet
  use rides on OPT-032 or a work.md line.
- **Decision (T-0772).** Not trying now. The gain is shown for agents running at once, and spreading the day leaves few:
  1.01 and 0.75 on average on 10-28 and 10-29 (ops_metrics.py --pace). OPT-032 (task packets) showed no effect on
  orientation calls, and swept board lines fell from 87 in 10 of 34 worker commits on 10-26 to 4 in 2 of 34 on 10-28
  (OPT-053). Reopen on a LOCK IN day or at 3 or more agents on average.

### 9. Count builds and fix rounds per task (the Investors' first-try build success) {#t9}

- **Sources.** [provisional: arXiv terms unread, T-0165] Aider benchmark/benchmark.py (`--tries` default 2, test output as the next message) and
  polyglot_leaderboard.yml, https://github.com/Aider-AI/aider; MetaGPT executable feedback; AutoCodeRover 3-round cap.
  (notes-A A1; notes-C T13; notes-D 5.)
- **Evidence.** Aider polyglot, 69 rows, 223-225 exercises each: pass_rate_1 -> pass_rate_2 median +29.4 points (min
  +2.7, max +52.4); claude-opus-4-20250514 no thinking 32.9 -> 70.7 (A1).
- **Problem and status.** The loop itself we already run: agents re-run tests until green, work.md escalates a model
  row after two failed attempts on sonnet or one on opus. What is missing is the count: ops/metrics/xc.jsonl (21
  builds) has exit status but no task ID; tests/run.sh logs no task ID. So first-try build success and fix attempts per
  bug, two of the Investors' four build metrics, cannot be computed per task.
- **Depends on.** D4 (Xcode runs serialize), D2.
- **Change here.** tools/xc.sh and tests/run.sh write the task ID (env `TASK_ID`, set from the Agent description by
  the packet) and exit status per run; tools/ops_metrics.py reports builds per task and first-try success by kind.
- **Metric.** Instrumentation, not a switchback. Cost: minutes. **Investor-owned?** No (the packet line naming
  TASK_ID is a work.md sentence; until then, match runs to tasks by thread).
- **Decision (T-0772).** Already does the job. tools/build_metrics.py matches runs to tasks by the Agent description in
  the stream, so TASK_ID was not needed. Charts: first_try_build (n=36 sessions, centre 0.69), fix_attempts (n=33, centre
  1.57). review_defects has 4 points, the last on 10-26: a gap in the four build metrics, not in this technique.

### 10. Cap and steer large tool output {#t10}

- **Sources.** [provisional: arXiv terms unread, T-0165] SWE-agent paper, https://arxiv.org/html/2405.15793 (Table 3); Anthropic "Writing effective tools for
  agents"; Claude Code costs and env-vars pages (BASH_MAX_OUTPUT_LENGTH default 30,000 chars); C compiler post.
  (notes-A A3; notes-C T2, T10; notes-D 9.)
- **Evidence.** SWE-agent, Lite 300, GPT-4 Turbo: file viewer 100 lines 18.0% vs full file 12.7%; summarized search
  18.0% vs iterative 12.0% (A3). Concise tool responses used "~1/3 of the tokens" (C T2). Ours: reads are 61% of
  subagent input units; 55% of result chars come from results over 8k (C M2, M8). **[here]** run_calls.py, subagent
  Bash calls since 2026-10-25 00:00 ET (150 streams, n=8,485): largest result 29,937 chars (the 30,000 default already
  binds); a 12,000 cap would cut 481 calls (5.7%) and 2,741,808 of 25,046,718 result chars (10.9%); an 8,000 cap 909
  calls and 21.7%; 218 of the 481 over-12k results (45%) were followed in the same thread by a call with the same
  command word and under half the size (a crude "narrowed anyway" count; same word is not same intent).
- **Why parked (2026-10-26).** Bash results are part of the 61%; a 12k cap would move total subagent input by a few
  percent at most (my estimate, not measured), below what n=12 sessions per arm can detect (A/A, intro). Kept for the day
  the switchback slot is free, or folded into #3's ablations.
- **Decision (T-0772).** Ledger OPT-058, first to ship (T-0777). The slot is free. An 8,000 cap removes 17.7% of Bash
  result chars (572 of 7,205 calls), about -10% of subagent dollars by estimate. Read per worker call: n=490 per arm.
- **Investor-owned?** No if exported in tools/supervisor.sh; yes via .claude/settings.json.

### 11. Loop scan over our transcripts, then call-count escalation {#t11}

- **Sources.** [provisional: arXiv terms unread, T-0165] OpenHands stuck_detector.py, https://github.com/OpenHands/software-agent-sdk; SWE-agent s5.2; SWE-bench
  per-instance data. (notes-A A6, A7; notes-B B9, M2.)
- **Evidence.** No measured effect of a stuck detector anywhere read (A6). Resolve rate by calls, Opus 4.6: 87% at
  0-20, 73% at 21-35, 68% at 36-50, 54% at 51-75, 47% at 76+ (B M2). SWE-agent: resolved median $1.21 and 12 steps vs
  unresolved mean $2.52 and 21 steps (A7). Ours: all 9 turn-limit stops 10-25 to 10-26 were Pernille's maxTurns 40,
  fixed by OPT-031: no loop problem is shown yet.
- **Change here.** tools/stuck_scan.py replays OpenHands' five patterns over ops/runs (identical command + identical
  error 3+ times in a thread); only if hits explain real losses, a hook (rules/hooks/, "approve") nudges or a high call
  count triggers #2's review or #7's second attempt.
- **Metric.** Turn-limit stops; cost per failed task. **Investor-owned?** The scan no; a hook yes.
- **Decision (T-0772).** Not trying. The scan ran as tools/technique_counts.py: 0 identical failures 3 or more times in a
  thread, 1 run of the same input 3 or more times in a row, 2 repeat calls of 7,938, 234 threads. OPT-031 closed the
  turn-limit stops. Reopen if a turn-limit stop returns.

### 12. Effort budgets per task kind {#t12}

- **Sources.** [provisional: arXiv terms unread, T-0165] Anthropic, "How we built our multi-agent research system",
  https://www.anthropic.com/research/multi-agent-research-system; SWE-agent s5.2; mini-SWE-agent limits. (notes-D 7;
  notes-A A7.)
- **Evidence.** Anthropic research eval: Opus 4 lead + Sonnet 4 subagents beat single Opus 4 by 90.2%; token usage
  explains 80% of BrowseComp variance; early versions spawned 50 subagents for simple queries; budgets in the prompt
  fixed it (D7). SWE-agent: 93.0% of resolved runs submitted before the budget vs 69.0% of all (A7).
- **Change here.** A table in the packet template by kind (turns, tool calls), set from tools/ops_metrics.py medians
  per kind; persona maxTurns stays the hard cap. **Metric.** Cost per finished task by kind, turn-limit stops.
  **Investor-owned?** work.md (proposal). Low here: we are not over-spawning.
- **Decision (T-0772).** Ledger OPT-059, second to ship (T-0778). Checked against OPT-051: it sets model and effort, not
  how far a thread runs, so it does not do this job. 52 of 233 worker calls ran past their kind's P75. Stopping all of them
  there would save at most 8.6% of dollars, before continuation costs.

### 13. Premise check before the first edit {#t13}

- **Sources.** [provisional: arXiv terms unread, T-0165] "Failure as a Process", https://arxiv.org/html/2607.09510; "The Working Set of a Coding Agent",
  https://arxiv.org/abs/2608.16630; ChatDev, https://arxiv.org/html/2307.07924. (notes-D 6.)
- **Evidence.** 1,794 Terminal-Bench trajectories, 7 models: failed runs median 27 steps, decisive error median step
  7; 57.9% of decisive errors epistemic, false premise alone 30.7%; prefix monitor recall at best 28.8% (D6). ChatDev
  without "ask for specifics": quality 0.3953 -> 0.3094 (SRDD, GPT-3.5). Ours: 22 wrong claims in the pywidget brief
  (research-audit-1 s1.6).
- **Change here.** Packet line: "Before the first edit, list the 1-3 facts the change depends on and the command or
  file line that confirmed each." **Metric.** Share of tasks with a rework commit within 24 h. **Investor-owned?**
  work.md (proposal). Replayable in #6.
- **Decision (T-0772).** Not trying. Redo events are 23 per 218 finished tasks (10.5%, 10-28 and 10-29). Outside rates
  (false premise 30.7%, monitor recall 28.8%, another benchmark) leave about 0.9% of tasks. The line adds 1-3 calls to a
  median thread of 30. Reopen if the redo share passes 15%.

### 14. Syntax check after every edit {#t14}

- **Sources.** [provisional: arXiv terms unread, T-0165] SWE-agent Table 3, App. B; Aider unified-diffs write-up and polyglot data. (notes-A A2.)
- **Evidence.** SWE-agent, Lite 300, GPT-4 Turbo: lint-guarded edit 18.0% vs plain edit 15.0% vs none 10.3%; 51.7% of
  trajectories had 1+ failed edits (A2). But Claude rows in the Aider polyglot data are 93.3-99.6% well-formed (A2), so the gap is likely
  small for us.
- **Change here.** First count, from ops/runs, Edit/Write results followed by a syntax error; only then a PostToolUse
  hook (py_compile, bash -n, plutil, json, `swiftc -parse` without the Xcode slot). **Investor-owned?** Yes:
  rules/hooks/ and settings, "approve" only.
- **Decision (T-0772).** Not trying. The count ran: 1 of 210 Edit or Write calls was followed by a parser error within
  2 calls. Nothing here is worth an "approve".

### 15. Operator completion check (Stop hook) {#t15}

- **Sources.** Claude Code /goal and hooks pages, https://code.claude.com/docs/en/goal,
  https://code.claude.com/docs/en/hooks; Ralph loop, https://ghuntley.com/ralph/. (notes-C T4.)
- **Evidence.** None quantitative. Ours: 1,875 idle agent-minutes over 8 drains, 67% between sessions
  (log/audit/drain-cost.md); the chain gate was fixed in T-0133 (dc2594b8) and proposal #68 changes the close rule.
- **Change here.** Only if drains persist after #68 and T-0133: a command Stop hook that blocks while runnable tasks
  exist and the pool is under target. **Investor-owned?** Yes (settings).
- **Decision (T-0772).** The job is done another way: OPT-050 (in flight) ends each session on ops/session_end.json, and
  OPT-033 was kept by Investor instruction. 0 of 23 work sessions since 10-27 18:40 failed to close themselves. Idle
  minutes under a target of 8 no longer measure a loss: the spread pool is the Investors' pace and the day's share is spent.
  No Stop hook.

---

## Rejected (with the reason) {#rejected}

- **History window / observation masking** (A4; Complexity Trap: masking cut instance cost 9.8-57.1% on SWE-bench
  Verified, but lowered Gemini 2.5 Flash thinking 40.4 -> 36.4): Claude Code manages context; we cannot install a
  history processor (D2); 0 compactions in 40 sessions (C M11); our threads are short.
- **LLM-summarizing condenser** (A5; OpenHands "up to 2x" cost cut is second-hand, the post was unread for terms):
  Claude Code compacts; no problem to solve.
- **Auto-compaction tuning, context resets** (C R2): 0 compactions in 40 sessions.
- **Subagent cache TTL 1 hour** (C R1): 1h writes cost 2x base vs 1.25x; within-thread writes are 28.6M of 38.8M;
  net loss on API ratios.
- **Tool-creation reminder every step** (A9; Live-SWE-agent 62.0% -> 76.0% on 50 problems, one run): the prompt form
  is already Tenet 7; the per-step form needs a hook and would grow a shared 250-file tools/ with throwaway scripts (D3).
  Revisit with #6 replays.
- **Ranked repo map / tool index** (A10): no measured number anywhere; small repo.
- **Architect/editor split** (A11): +3.1 points = 4 of 133 for Sonnet + Sonnet (2024 models); our Fable/Opus planning
  and packets are already this shape.
- **One worked example in the prompt** (A13): 1.7 points on 300 with GPT-4 Turbo.
- **Localize-then-repair pipeline, AST search, spectrum fault localization** (B5, B6, B7): ablations read T-0195,
  status unchanged. Agentless, GPT-4o, Lite (Table 2, p. 25): true file found by prompting 78.67%, embeddings 70.33%,
  both 81.67%; class/function step from a skeleton 58.33% at $0.02 vs whole file 53.67% at $0.15; edit lines straight
  from files 47.00% at $0.18 vs 50.67% at $0.06 through the middle step. AutoCodeRover, GPT-4, one run, developer test
  suite given: SBFL's top 5 methods 61 vs 51 without (Table 4, p. 9). AST search has no on/off run; against a
  SWE-agent replication it alone solved 32; for the 9 it missed, the main reason was search APIs it lacked (p. 8). Still not
  chosen: our repo is small; free agents already explore at Opus 4.6 median 23 calls (B M1); SBFL needs a failing
  test that covers the bug, which is #2's open problem.
- **Environment setup out of agent turns** (B11): mostly done (xc.sh, run.sh, named commands); 6% of commands in
  SWE-bench trajectories, not measured here.
- **Trained verifier, RL, fine-tuning, MCTS, population search over agents** (B12, B13; DGM about USD 22,000 a run):
  the model is fixed (D2); one live system.
- **Free agent-to-agent chat** (CooperBench: no success gain, up to 20% of steps on communication): use #8's written
  record instead.
- **Decentralized dispatcher** (DeLM's no-planner design): independent agents amplify errors 17.2x vs centralized 4.4x
  (Scaling, D); our Operator also carries Investor order.
- **Asynchronous LLM overseer** (SICA): prefix monitors reach at best 28.8% recall (FailProc); deterministic stops
  first.
- **Agent teams, --bare, disabling git instructions, durable session resume, standing monitor agents** (C R3-R7):
  more tokens, needs an API key, small gain, or no measured loss.
- **Fewer parallel agents on coupled work** (D8; CAID worse at 8 than 4 on Commit0-Lite): the 8-12 pool is the
  Investors' (D5); the transferable part is a dispatch habit (fill the pool across clusters, report when fewer
  independent clusters exist), kept as a note under #8, not a technique to test.
- **Already ours, nothing to adopt:** native tool calls (A R1), edit formats (A R2, fixed by Claude Code), event log
  (A R3, ops/runs and log/events.jsonl), cache marks (A R4), one task per agent with a fresh context (C T3), escalate
  after failed attempts (C T13), Claude Code version pin and smoke test (C T14), roles and SOPs (D 10).

## The ledger entries from this catalogue

The Techniques page reads this section. A line starting with OPT IDs ties them to a technique, and its status comes from
the ledger. With no ID, "Not trying" or "Already does the job" records the decision (T-0772).

- **OPT-034** (#2) offline replay: 0 of 8 caught, so no live phase; no effect.
- **OPT-035** (#1) worktree switchback, transcribed from trial-worktree.md s4; proposed, queued.
- **OPT-036** (#4) suites on HEAD each tick; dropped untested 2026-10-28 (T-0594).
- **OPT-030, OPT-032** (#3) OPT-030 stopped at n=0, superseded; OPT-032 no effect.
- **OPT-057** (#5) metric code held still during a window; proposed.
- **Not trying** (#6): costs usage and finishes no task; no technique waits on it.
- **Not trying** (#7): about 2x cost on the lines it touches; needs #1 and #2.
- **Not trying** (#8): under 1.1 agents at once on average; reopen on a LOCK IN day.
- **Already does the job** (#9): the first_try_build and fix_attempts charts.
- **OPT-058** (#10) Bash output cap of 8,000 chars; proposed; first to ship, T-0777.
- **Not trying** (#11): the scan found 2 repeat calls of 7,938.
- **OPT-059** (#12) tool-call budget per kind; proposed; second to ship, T-0778.
- **Not trying** (#13): a net cost at the rates we have.
- **Not trying** (#14): 1 of 210 edits followed by a parser error.
- **OPT-050** (#15) the session-end flag does the Stop hook's job; in flight.

## Process changes this catalogue needs (not techniques)

1. **The switchback slot.** One flag at a time, OPT-030 holding it unarmed since 00:42. Proposal for tools/switchback.py
   (company-owned): concurrent flags on disjoint metrics, each with its own arm sequence from a seeded shuffle, so arms
   are independent rather than in lockstep; and a rule that an unarmed flag older than 6 h yields the slot. Without
   it, #1 starts about 10-29. (2026-10-30: crossed flags exist, T-0599; one crossed slot. T-0777 adds an alternating arm
   rule, because a second crossed4 flag would sit in lockstep with OPT-051.)
2. **Task-level A/B.** Techniques #2, #7, #13 act per task, not per session. A per-task arm (T-ID parity, assigned at
   dispatch) gives about 4x the sample of a per-session arm. Needs a `design: task_ab:<flag>` form in
   tools/experiments.py and the compare step to read arms from task records.
3. **#5 before verdicts.** The metric-code freeze in experiments.py should land before OPT-034's live phase is graded.

## Ablation tables and provisional re-check (T-0195, Wrenna, 2026-10-26 02:38-02:43 ET)

Source: three PDFs an Investor uploaded to research/inbound/70/ (#70 c6409863804, 02:37), read with `git show` from
origin/main into a fresh /tmp folder, text by tools/pdftext.swift; no arxiv.org request was made. Page numbers are
the PDFs' own. The Agentless file is a browser print of arxiv.org/html/2407.01489v2 (59 pages, CC BY 4.0 on p. 1),
so its pages are the print's; Table 4's cost column is cut off in the print and not used. The PDFs are not
committed here (the supervisor sync brings them) and no paper text beyond short quotes and numbers is copied.

Numbers used above: #2 (Agentless Table 4, SpecRover Table II and Fig. 4, AutoCodeRover Table 4), #7 (Agentless
Table 3), the B5-B7 rejected line (Agentless Table 2, AutoCodeRover Table 4 and p. 8). Models: Agentless GPT-4o
(gpt-4o-2024-05-13, p. 17); AutoCodeRover GPT-4 (gpt-4-0125-preview, p. 7); SpecRover Claude 3.5 Sonnet, GPT-4o only
on API error, temperature 0 (p. 6). All on SWE-bench Lite (300), 2024 models.

Provisional sources (fa7e7452), checked against these papers:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Ablation tables and provisional re-check (T-0195, Wrenna, 2026-10-26…, scrolls sideways" style="--tw:944px" markdown="1">

| Source | Verdict | What the papers show |
|---|---|---|
| S1 SWE-agent | partly confirmed; rest stays provisional | The default-configuration row behind A2, A3 and the history comparison, 18.0% on Lite with GPT-4, is printed by others as 54 of 300, 18.00%: Agentless Table 1 (p. 21, $2.51 per issue) and SpecRover Table I (p. 7). The ablation rows (15.0, 12.7, 12.0, 15.7, 10.3, 16.3, 11.0, 7.33) are in none of the three. Caution: AutoCodeRover Table 2 (p. 8) prints SWE-agent at 17.00% (51), an earlier figure. |
| S9 OpenHands SDK, S12 Complexity Trap, S13 Live-SWE-agent | left provisional | Not among the uploads and not cited by them. |
| notes-D, 18 rows | left provisional | None is among the uploads. |
| Catalogue Sources tags (1, 2, 5, 8, 9, 10, 11, 12, 13, 14) | tags kept | #2 now also rests on the three papers, but its MAST, ImpossibleBench and MetaGPT numbers are still arXiv-only. No tag removed (ruling item 4: one tag per row, no rewrites). |
| README numbers in #2 and B5 (not provisional, checked anyway) | one reading corrected | Agentless 1.0 "82 fixes (27.3%) ... $0.34" matches SpecRover Table I (p. 7); the paper's later version reports 96 (32.00%) at $0.70 (Table 1, p. 21). AutoCodeRover v2's "50%" is 57 to 92 on Lite with the model changed from GPT-4 to GPT-4o (Agentless Table 1, p. 21): not a harness-only effect, corrected in #2. |

</div>


Catalogue status changes: none. #2 stays "no effect (phase 1)"; the papers' tests and reviewers fail often too
(SpecRover precision 50.0%; Agentless had a usable test for 100 of 300 issues from one sample), which is what OPT-034
met. #7 stays "waits on #1". B5-B7 stay not chosen, now on our reasons rather than on a missing table.

## Gaps

- Closed T-0195: the Agentless (2407.01489) and AutoCodeRover (2404.05427, 2408.02232) ablation tables, read from
  the Investor's uploads; see "Ablation tables and provisional re-check". Still unread: CodeMonkeys' Figures 5-6
  (notes-B), and every provisional arXiv-only source not among the three uploads.
- The OpenHands condensation post (terms unread) and a 2026 literature search for single-agent harnesses (notes-A).
- Whether the plan's weekly meter weights cache reads and writes as the API does (notes-C): untested; it changes the
  size of every cost estimate above that uses "input units".
{% endraw %}

</div>
