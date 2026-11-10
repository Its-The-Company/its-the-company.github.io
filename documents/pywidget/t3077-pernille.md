---
layout: "default"
title: "T-3077 review: T-2054/T-2055 run evidence (fccfada22) and tools/land_mutants.py (6894c2607)"
section: "documents"
description: "The code holds. I found no order the evidence calls impossible that the code allows. The evidence does not meet its own gate, though. It says &quot;Ticks wait for six KILLED&quot;, and status shows five KILLED and one NOVERDICT\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3077-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t3077-pernille.md</code></span></div><h1>T-3077 review: T-2054/T-2055 run evidence (fccfada22) and tools/land_mutants.py (6894c2607)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-06. Independent review (Commandment 13): I read the evidence file, the code it cites at
main (f55ddb55c), the mutant files, the six mutant commits on land/idris-t2054, tools/land_mutants.py and its test,
and the runner results on origin/macbook-results. I compiled nothing and ran no Simulator. I ran
`python3 -I tests/land_mutants_test.py` (17 passed, 0 failed) and
`python3 tools/land_mutants.py status --id idris-t2054` (exit 1).

## Verdict: FAIL for TestFlight, for now

The code holds. I found no order the evidence calls impossible that the code allows. The evidence does not meet
its own gate, though. It says "Ticks wait for six KILLED", and status shows five KILLED and one NOVERDICT. The
mutant with no verdict is the one that removes the `rid != g_run_id` check (claim 6). Its build died in the stdlib
size check before a single test ran. This needs no code change. When a rerun of that one mutant comes back KILLED,
the verdict is PASS and nobody has to review again.

## Findings, by severity

### H1. Mutant 5 (done-run-only) has no verdict, so claim 6 has no <span title="A test written in advance. If it fires, we drop the idea.">kill</span> behind it (FAIL)

- `status`: `NOVERDICT J-20261106-0833-mut-idris-t2054-5 done-run-only (failed, exit 65, failing [])`.
- Result: origin/macbook-results:ops/jobs/J-20261106-0833-mut-idris-t2054-5/result.json, commit 1a2b80a1c, 50.7 s,
  `tests: None`. The summary reads `error: stdlib_cut.py check: python/lib 12,271,616 B on disk, manifest
  11,321,344 B (sim), +8.4%, outside 5%`, and install_stdlib.sh:97 exits 1. That happens at build time, before any
  test runs.
- The mutant's diff is the one line at pwbridge.c:350, `if (rid != atomic_load(&g_run_id)) return 0;` changed to
  `if (0) return 0;`. That diff has nothing to do with the stdlib, so this is a flaky build step, not a verdict.
- Why it matters: the check matters in exactly one case. A writer of A that wakes after a later run B has queued its
  `finished` gets past `pw_emit_live`, because then `g_done_run == B` (pwbridge.c:51-52, 720). Mutant 4 also kills
  `testParkedWriterOfAnEndedRunQueuesNothing`, but mutant 4 replaces all of emit_for_run, so its kill does not show
  that this one line is tested. The test itself is written for that case: it <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> the writer in A, runs B and ends
  it, then drains (BridgeSlice2Tests.swift:166-208). I expect a kill, but no run shows one yet.
- Fix (T-3097): Idris reruns mutant 5 alone, for example `land_mutants.py queue` with a new `--id` and only
  mutants-t2055.json at base 32388e712. I could not queue it myself: runner_queue.py takes only commits on
  origin/main, and land_mutants.py pushes a land ref, which I may not do.
- The size flake: this is the third time I have seen it (12.28 MB in T-0553, 12,349,440 B in T-1048, 12,271,616 B
  here). Jobs -4 at 9:46 AM and -6 at 10:02 AM unpacked the same cache with the same sha256 on the same Simulator slot and
  passed the same check. So something outside the tree changes python/lib by about 950 KB. Most likely it is
  `__pycache__`. That is T-1048's question, and I have added this case to it as a note. It is not a new line.

### M1. S5 still has a gap through `input()`: emit_json uses plain pw_emit (not claimed by the evidence; follow-up)

- br_request_line queues `input_request` (pwbridge.c:405) and `input_echo` (pwbridge.c:425) through emit_json, which
  calls `pw_emit` (pwbridge.c:335, 338). That path has neither the live check nor the current-run check.
- The contract says "The `finished` record is the last record of a run" (bridge-contract.md:223). Reading the code,
  a daemon thread of A that calls `input()` during the runner's tail, after `finished` and before pw_rt_run:722
  clears `g_run_id`, queues `input_request` for A after A's `finished`. The thread then stays parked. No code wakes a
  K_INPUT slot at run end: g_parked is only walked by post_slot, wake_pressure_waiters and pw_stop_step, and
  pw_stop_step refuses once `g_run_id != run_id` (pwbridge.c:254). If that late prompt still reaches the screen and
  gets answered, `pw_provide_line` matches the slot by its own run_id (pwbridge.c:220). The echo for A then goes out
  during B or between runs.
- Claim 5 says "write/emit" and claim 6 says "writer", so the evidence is accurate as written. The ordering rule
  T-2055 enforces is still open on this third path. Severity: medium. It takes a daemon thread calling `input()` in
  a tail of a few milliseconds. It causes no crash, no data loss, and nothing App Review would reject, so it does
  not block TestFlight. Board line T-3098 for Idris, P2.

### L1. "the two skips are DeviceModules tests (XCTSkip there only)" is not quite right (not shown)

- J-20261106-0314-xc-test: BridgeTests ran 122 with 2 skipped (that holds). The summary does not name the two.
  NetFetchTests.swift is also an `extension BridgeTests`, and it also has an XCTSkip. So "DeviceModules only" is not
  shown. The part that matters does hold: BridgeTests.swift and BridgeSlice2Tests.swift have no XCTSkip, so none of
  the four tests can be a skip. A wording fix, not a finding against the code.

### L2. land_mutants.py: the KILLED rule is sound; two edges the test does not exercise

KILLED requires `status == "failed"` and at least one listed test among `tests.failing`
(land_mutants.py:153-163). The runner's statuses are `passed`, `failed`, `timeout`, `error` and `refused`
(runner.py:1656-1675, 1836, 1883, 1963). Only a real nonzero xcodebuild exit gives `failed`. A timeout, an infra
error or a refusal is NOVERDICT. A build failure is `failed` with an empty `failing` list, so it is also NOVERDICT,
and job -5 shows that working. So KILLED means a listed test failed in a run that finished. That is what the rule
should mean. Two edges:
- A listed test that is a whole class (`PyWidgetTests/BridgeTests`) matches any failing method in it
  (`f.startswith(n + "/")`, :160). A flaky neighbour would then count as a kill. Every listed test in both mutant
  files names one method, so this batch is not affected. It is worth a docstring line.
- `verdict` does not compare `result.json`'s `commit` with the ledger's. I compared them by hand: all six match
  (c226d5620, 1d26c024d, 845f15a35, 2c332dd0b, 1a2b80a1c, ee536d016). The job ids contain the minute, so a collision
  would take two queues in the same minute with the same `--id`.
- tests/land_mutants_test.py covers PENDING, KILLED, NOVERDICT for a red with no listed failure, and SURVIVED. It
  does not cover a `timeout` or `error` result. The code sends both to NOVERDICT. A test should pin that.

None of these blocks TestFlight. The tool is a test aid and does not ship.

## Claims checked


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Claims checked, scrolls sideways" style="--tw:937px" markdown="1">

| Claim | Result | Evidence |
|---|---|---|
| Green: J-0722 whole suite at 20bb48251, 1444 executed / 24 skipped / 0 failures | holds | result.json: passed, exit 0, executed 1444, skipped 24, failing [] |
| Shared/Bridge, BridgeTests.swift, BridgeSlice2Tests.swift identical to 32388e712 | holds | `git diff --stat` 20bb48251, 68d9f123d and HEAD against 32388e712 on those paths: empty |
| J-0314 BridgeTests 122 executed, 2 skipped, 0 failures | holds | summary: "Suite 'BridgeTests' ... Executed 122 tests, with 2 tests skipped and 0 failures" (job runs 3 classes, 281 total) |
| The two skips are not the four tests | holds (L1 on the wording) | no XCTSkip in BridgeTests.swift or BridgeSlice2Tests.swift |
| Each mutant changes one line; each restore's tree equals the base's | holds | `git diff` per mutant: one line (mutant 3 adds one line); all six restore trees are f2058d49a = 32388e712^{tree} |
| 1. `finished, stuck` impossible | holds | markStuck emits under `lock` with `live: true` (PyBridge.swift:756, 844); emit_rec refuses `run_id == g_done_run` and gives out seq under g_qlock (pwbridge.c:50-53); g_done_run is set by the runner's `finished` (:52) or at run end before Swift's internal_error `finished` (:720, PyBridge.swift:987) |
| 2. `finished, unstuck` with no `stuck` impossible | holds | `unstuck` only if `stuckSent` (PyBridge.swift:996-998); `stuckSent` set only from the accepted emit (:756), reset per run (:995) |
| 3. `unstuck, stuck` impossible | holds | markStuck guards `currentRun == runID` under `lock` (:748); doRun clears `currentRun` and reads `stuckSent` in one `lock` region (:991-997) before `unstuck` (:998); the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> for a run that ended is not installed (:721-726) |
| 4. two `stuck` for one run impossible | holds | `!isStuck` under `lock` (:748); `isStuck` is reset only at :995 |
| 5. Python write/emit of A after A's `finished` impossible | holds as worded (M1 for `input()`) | br_write :389 and br_emit :487 go through emit_for_run, then pw_emit_live under g_qlock (:348-351) |
| 6. a parked writer of A that wakes in B or between runs is dropped | holds by reading; not shown by run (H1) | `rid` read at :374 before the park; :350 drops `rid != g_run_id` |
| Lock order `lock -> g_qlock` only; nothing waits on the GIL under `lock` | holds for markStuck/doRun | emit_rec calls out only after unlocking (:58-62); pw_records_drain calls `fn` after unlocking (:90-94). I did not audit every `lock.withLock` site |
| Six verdicts | 5 KILLED, 1 NOVERDICT | `status --id idris-t2054` exit 1; results -1..-6 above. Kills: -1 BridgeTests.swift:347; -2 :347 and :383; -3 :370-374; -4 :299 and BridgeSlice2Tests.swift:206; -6 :299 |

</div>
{% endraw %}

</div>
