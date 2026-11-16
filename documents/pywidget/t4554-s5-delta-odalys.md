---
layout: "default"
title: "Review: the 1.0 part of L5 s5 (ADR-011 s7 H2, build step 6a) and its code"
section: "documents"
description: "Verdict: FIX FIRST. The core holds. One handler per widget across two processes, no lost commit, a busy refusal after the caller&#x27;s own wait, a killed holder freed, and the lock order in code are all as s7 says, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4554-s5-delta-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4554-s5-delta-odalys.md</code></span></div><h1>Review: the 1.0 part of L5 s5 (ADR-011 s7 H2, build step 6a) and its code</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-16, task T-4554. Independent review (Commandment 13; ADR-011 s13 step 6a, "Odalys's review of the L5 s5 delta written"). I read the spec and the files, not the author's notes. No file under review was edited; mutants were built from copies in scratch.

**Read:** ADR-011 s7 "One handler per widget, across both processes (H2)" and its four bullets; s13 step 6a and 6; s14 "Pernille's re-read" row H2; ADR-007 s8 dated line 2026-11-15 (T-4542). Code, uncommitted in the worktree on personal/a2 at 2145414c5d: `pywidget/ios/Shared/WidgetStateCommit.swift` (300 lines), `ios/Tests/Core/WidgetStateCommitTests.swift` (18 tests), `tests/state_commit/main.swift` and `test_state_commit_processes.py` (3 tests), `testAKilledRunLockHoldersMarkerDemotesAndRunLockIsFree` in `ios/Tests/ExtensionLaneTests.swift`. Relied-on code: `WidgetStateLock` (`LaneGuard.swift`), `RunLogStore.recordWidgetRun`, `RunResultSink`'s tree compare-and-replace, `WidgetStatusStore.update`, `ProjectSendPlan.runFileNames`.

**Ran:**
- `swift test --filter WidgetStateCommitTests` (Core, own scratch path): 18 tests, 0 failures, 1.9 s.
- `python3 tests/run_host.py state_commit -v`: 3 tests OK (800 commits across two processes; the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> test; 40 random SIGKILLs).
- Mutants of `WidgetStateCommit.swift`, built with the test's own `main.swift`, two processes of 300 runs (n = 600 runs each):
  - M1, `run.lock` never flocked: 541 committed, 59 `conflict`. The Python test fails on `other == []`. Right reason.
  - M2, M1 and the `rev` check removed: 600 committed, `rev` 600, `count` 357. 243 commits lost. The Python test fails on `count == len(revs)`. Right reason.
- One probe, finding 1.
- Not run: Xcode, the ExtensionLane test (needs the app target; another run holds Xcode), any device or Simulator.

**Verdict: FIX FIRST.** The core holds. One handler per widget across two processes, no lost commit, a `busy` refusal after the caller's own wait, a killed holder freed, and the lock order in code are all as s7 says, and the two-process tests fail when the lock or the check is removed. Two defects need a fix before step 6 builds on this (1: a state past 256 KiB wedges the widget for good; 2: `run.lock` is not in the send plan's reserved names, so a send can replace it). Two done-when items of step 6a are not met (4, 5) and two are met with stand-ins (3, 6). **1 high, 4 medium, 2 low.**

## What holds (checked, with the evidence)

- **One handler, two processes.** `run()` takes the flock on `run.lock` from before the snapshot to after the commit (`WidgetStateCommit.swift` 269-276); the commit checks `(epoch, rev)` once under `state.lock`. Mutants M1 and M2 above show the two tests catch each half separately.
- **No lost commit.** 800 runs, two processes, wait 2 ms: `rev` equals the commits counted, each rev once, `count` equals `rev`.
- **Refusal.** `.busy` calls `busy()` outside `run.lock`, so the row takes `state.lock` alone, which the holder leaves free (the Swift test writes the real `RunLogStore` row, trigger `widget_action`, outcome `busy`, and checks it waited its 0.2 s first).
- **Renders off `run.lock`.** True by construction: nothing but `run()` touches it. The test shows a `state.lock` hold takes under 0.25 s while a handler holds `run.lock`.
- **Lock order.** `run.lock`, then `state.lock`. `commit()` documents that the caller must not hold `state.lock`; if one did, the commit would time out (0.5 s), not deadlock. The row, tree and status writes inside `body` work (test `testARunsOwnTreeRowAndStatusAreWrittenWhileItHoldsRunLock`).
- **Killed holder.** SIGKILL of a process holding `run.lock`: the next run commits `rev` 1 at once. Random SIGKILLs (40, seed 4554): `state.json` always parses, `rev` never goes back, `count == rev`, the next run takes both locks, no `.tmp` is left.
- **The extension never makes `run.lock`.** `creates: false` returns `.noRunLock` and runs nothing (test).
- `Hold` ends after the lock is let go on the ran, busy and no-lock paths (two tests).

## Findings

**1. High. A state past about 256 KiB writes a `state.json` this code then refuses to read, and the widget's state is wedged for good.** `WidgetStateFile.read` rejects a file over `readLimit` (256 KiB); `write()` renames first and reads back after. Probe, one process, new folder: a 300,000-byte string in the state gives `writeFailed`; the next run gives `noSnapshot(.unreadable)`; the file on disk is 300,102 bytes, now the new one. At 200,000 bytes both commits succeed (n = 2 runs each size). The `.unreadable` rule ("never overwritten") then keeps it that way for every later run, and the `Committed.writeFailed` doc ("state.json is the file it was") is false on this path. Nothing in the delta or in the runtime <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> a state: no 64 KiB cap exists on the Python side yet (L5 s3.2 names one for 1.1). Fix: check the encoded size before the rename, return a new `tooLarge` and write nothing; decide the cap in the ADR (the 64 KiB of L5 s3.2 fits under the read limit); test the boundary on both sides. Also make `write()` leave the old file in place on a failed read-back, or say it does not.

**2. Medium. `run.lock` is not in `ProjectSendPlan.runFileNames`, and `state.json` is.** That list (`App/Projects/ProjectSendPlan.swift` 113-116) is the set of names a send never copies, never removes and refuses. `run.lock` is not hidden, so a project with a top-level file `run.lock` is copied into `widgets/<id>/`. If the copy replaces the file by rename, a running handler holds the old inode and the next run locks the new one: two handlers at once, which is the one thing s7 forbids. A removal from an older record can delete it too, and the extension then silently draws the link form. Fix: add `WidgetRunLock.fileName` to `runFileNames` and a case beside the existing `state.lock` one. (`actions.json` has the same gap; it is step 5's, but check it there.)

**3. Medium. Step 6a's "a run's own tree, row and status written while it holds `run.lock`" and "a render's tree write succeeding during a handler run" are shown with stand-ins.** Both tests write `tree.json` with a plain `Data.write` inside `WidgetStateLock.with`, not through `RunResultSink`'s compare-and-replace, and the "render" is the test thread, not `getTimeline`. `RunLogStore` and `WidgetStatusStore` are real. Nothing in the app or the extension calls `WidgetStateCommit.run` yet (grep: only the test files), so "renders never take `run.lock`" holds only because no render code was written. Not a fault of the delta, but the done-when is not met by tests of the real paths. Step 6 needs the same two tests through the sink and the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s render, in its done-when.

**4. Medium. "The app suspended mid-run is not killed" (ADR-011 s4, s11 risk row, 6a done-when) is not covered, and `Hold` cannot express the expiry.** `Hold.begin` returns only an `end` closure. iOS calls a background task's expiration handler when time runs out; the closure has no way to tell the run to stop and drop `run.lock` before the suspension, and the app's run window is the action's `timeout` plus the kill <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>, far over the 2.0 s of the extension. No test suspends anything, and none could on the host. Fix: give `begin` an `onExpire` the run uses to abort and release (or state in the ADR that the app run is bounded below the assertion's time, with the figure), and add the Simulator or device row to 6a's done-when as its own line.

**5. Medium. The 6a done-when "G-L5-1 (a) recorded" has no evidence in the tree.** No record of the process name in `perform()` for the extension-only intent (L5 s13, Simulator). Also open: whether `flock` holds across the App Group on a phone. The Python test's header says so (G-L5-5's device row), which is honest. Both stay on 6a's list, unticked.

**6. Low. The kill chain is shown link by link, not end to end.** The Python test's marker is written by the helper by hand; it proves a killed process leaves a file it wrote itself. The Swift test writes a marker and shows `demoted`, which the existing marker tests show without `run.lock`; its new lines are only `make` and a `run` that commits. No test has the lane run under `run.lock`, is killed, and then is demoted, because the lane does not take `run.lock` yet (see 3). Also, the widened G-L5-5 text (L5 s5.8) names 1,000 kills and kill points between the temp write and the rename, mid-run and during folder delete; this test makes 40 kills at random times and does not mark which point each hit. State in the 6a record that 40 stands for the 1.0 part, or raise it; the cost of 1,000 is not measured, and I have not timed it.

**7. Low. The lock waits are not inside one budget, and the premade lock is not tested.** `wait` covers `run.lock` only; the snapshot (up to 0.5 s) and the commit (up to 0.5 s) each wait on `state.lock` on top, then the tree, row and status holds. The extension's 2.0 s (s4) must count these; the doc comment says "inside its own budget" without saying so. No test exercises the premade lock's place in the order, nor the inverted order. Neither is a fault today because nothing takes the premade lock inside `run()`; add a note to step 6's done-when. The `.missing` case also merges any `open` failure (a full descriptor table, a permission fault) with "no file"; for the extension that draws the link form, which is safe, but the cause is not logged.

## 6a done-when, line by line


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 6a done-when, line by line, scrolls sideways" style="--tw:640px" markdown="1">

| Done-when item | Status |
|---|---|
| Widened G-L5-5, two processes, many commits, no lost commit, every refusal's `busy` row | Met, one caveat: across processes the row is a stand-in file written under `state.lock` (`main.swift` 25-31); the real `RunLogStore` row is shown in one process only (finding 3) |
| A run's own tree, row, status written while it holds `run.lock` | Partly: row and status real, tree a stand-in (3) |
| A render's tree write succeeds during a handler run | Partly: stand-in render and tree (3) |
| Kill test: killed holder frees `run.lock`, marker demotes | Met link by link; not end to end (6) |
| G-L5-1 (a) recorded | Not met (5) |
| The app suspended mid-run is not killed | Not met (4) |
| Odalys's review written | This file |

</div>


## Order I would take

Fix 1 and 2 now (small, both in files under review or one line in the send plan). Carry 3, 4, 5, 6, 7 into step 6's done-when by name, so the wiring is judged against the real sink and lane. I do not need to see the delta again for 1 and 2 if the two boundary tests (state at the cap and one byte over; a send with a top-level `run.lock`) are in the diff. Nothing here touches the 1.1 queue; the 1.0 delta carries none of my 10-26 blockers B1-B2, because there is no queue.
{% endraw %}

</div>
