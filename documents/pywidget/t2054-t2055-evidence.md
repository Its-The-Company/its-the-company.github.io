---
layout: "default"
title: "T-2054 / T-2055 evidence: stuck order and late Python records (T-2049 M1, M2)"
section: "documents"
description: "The four tests: testRunStillEndingAtTheStuckDeadlineSendsNoStuck, testTailHeldPastTheDeadlineIsStuckAlthoughItsStuckWasRefused (T-2054), testNothingFromPythonFollowsTheRunsFinished\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2054-t2055-evidence.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t2054-t2055-evidence.md</code></span></div><h1>T-2054 / T-2055 evidence: stuck order and late Python records (T-2049 M1, M2)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-06. The code is f7ca2d3bd (both fixes; account b's <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> 061822052 is the same pwbridge.c, tests,
mutants-t2055.json and contract rows, all already on main), amended by 2a6ae60bb (T-2486, Pernille's T-2265 H1).
Tests: 654bf72e6. Pernille reviewed f7ca2d3bd (t2265-pernille.md) and 2a6ae60bb (t2486-pernille.md) by reading.
Nothing in Shared/Bridge or the Bridge tests changed since; this file adds run evidence only.

## Green on the MacBook runner

- J-20261106-0722-xc-test at 20bb48251, whole PyWidgetTests: 1444 executed, 24 skipped, 0 failures; BridgeTests
  passed. Shared/Bridge, BridgeTests.swift and BridgeSlice2Tests.swift are byte-identical to main 32388e712.
- J-20261106-0314-xc-test at 68d9f123d, BridgeTests (122 executed, 2 skipped, 0 failures); the two skips are
  DeviceModules tests (XCTSkip there only), not the four below.

The four tests: `testRunStillEndingAtTheStuckDeadlineSendsNoStuck`,
`testTailHeldPastTheDeadlineIsStuckAlthoughItsStuckWasRefused` (T-2054), `testNothingFromPythonFollowsTheRunsFinished`,
`testParkedWriterOfAnEndedRunQueuesNothing` (T-2055, in BridgeSlice2Tests.swift, an extension of BridgeTests).

## Mutants on the MacBook runner

The local Xcode slot is held (#203), so tools/land_mutants.py (6894c2607) built one commit per mutant on base
32388e712 and pushed them to land/idris-t2054 (tip 7a6e78011), one job each. Verdicts:
`python3 tools/land_mutants.py status --id idris-t2054`.

Pending at 09:01: all six queued (J-20261106-0833-mut-idris-t2054-1 to -6: -1..-3 are mutants-t2054.json,
-4..-6 mutants-t2055.json); the runner has said "waiting busy (load > 1 per core)" since 8:45 AM and started none.
Ticks wait for six KILLED. Each mutant commit was checked by diff to change one line only, and each restore commit's
tree equals the base's.

## Orders now impossible, and why

Run A's records, in seq order (one counter under `g_qlock`).

T-2054 (PyBridge.swift markStuck, doRun's end):
1. `finished, stuck`: impossible. `stuck` goes through `pw_emit_live`, which refuses under `g_qlock` once A's
   `finished` is queued (`g_done_run == A`), and seq is handed out under the same lock.
2. `finished, unstuck` with no `stuck`: impossible. doRun sends `unstuck` only when `stuckSent`, which is set only
   when the live `stuck` was accepted.
3. `unstuck, stuck`: impossible. markStuck checks `currentRun == A` and emits under `lock`; doRun sets
   `currentRun = 0` and reads `stuckSent` under `lock` before it emits `unstuck`. If doRun's region is first, markStuck
   returns; if markStuck's is first, its `stuck` already has its seq.
4. Two `stuck` for one run: impossible (`!isStuck` under `lock`).
Still possible, and intended: `stuck, finished, unstuck` (the bridge is stuck until the native call returns).
A refused `stuck` still marks the bridge stuck (T-2486); its banner not clearing is T-2716, not here.

T-2055 (pwbridge.c emit_for_run, br_write, br_emit):
5. A Python `write`/`emit` (not `finished`) of A after A's `finished`: impossible. The live check is under `g_qlock`.
6. A writer parked under back-pressure in A that wakes during run B or between runs: its bytes are dropped. `rid` is
   read before the park, and after the GIL is back `rid != g_run_id` (0 or B; `g_run_id` changes only under the GIL).
   They are never stamped B, and never follow A's `finished`.
Still possible: a write that starts between runs is run 0, as before; a daemon thread of A that starts a new write
while B is live is stamped B. C cannot tell whose thread it is; that is outside M2 and not claimed here.
Lock order is `lock -> g_qlock` only; `g_qlock` never calls out, and nothing waits on the GIL under `lock`.

## Mutant 5 rerun (T-3097, 2026-11-06)

T-3077 H1: J-20261106-0833-mut-idris-t2054-5 (done-run-only) had no verdict; its build stopped at the stdlib size
check (+8.4%, T-1048) before any test ran. Rerun alone from mutants-t2055.json on base 32388e712, land/idris-t3097:
- J-20261106-1318-mut-idris-t3097-2, commit fd6e85cdd (pwbridge.c:350 `if (0) return 0;`): KILLED, 81.9 s, 1 executed,
  1 failing: `BridgeTests/testParkedWriterOfAnEndedRunQueuesNothing`, BridgeSlice2Tests.swift:206,
  `("[PyWidget.Record.Kind.stdout]") is not equal to ("[]") - nothing of A's after A's finished (S5)`.
  That is the case the line exists for: A's parked writer woke after B's run and its stdout got through.
- Same batch, -1 write-plain: KILLED again (2 listed failing). -3 emit-plain: queued.
Six of six mutants now have a <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. `python3 tools/land_mutants.py status --id idris-t3097`.

T-1048 cause (same evidence run): APFS over-allocates a zip streamed by zipfile when other writers share the disk;
reproduced 16/16 with 8 concurrent writers, 0/16 when the same zip is written in one write. Board note on T-1048.
{% endraw %}

</div>
