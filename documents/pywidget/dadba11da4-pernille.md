---
layout: "default"
title: "Review of dadba11da4: T-4554, state.json one commit per run under run.lock (slice)"
section: "documents"
description: "The primitive does what s7 asks of it on the host. run holds the flock on run.lock from before the snapshot to after the body (WidgetStateCommit.swift:275-295); the snapshot and the commit each take state.lock for a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/dadba11da4-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/dadba11da4-pernille.md</code></span></div><h1>Review of dadba11da4: T-4554, state.json one commit per run under run.lock (slice)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4604, Commandment 13). Author: Idris. Reviewed: dadba11da4 as a whole
(`pywidget/ios/Shared/WidgetStateCommit.swift` new, its Core symlink, `App/Projects/ProjectSendPlan.swift`,
`Tests/Core/WidgetStateCommitTests.swift`, `Tests/Core/ProjectSendPlanTests.swift`,
`pywidget/tests/state_commit/main.swift` and `test_state_commit_processes.py`), against the T-4554 board line's
Done-when and ADR-011 s7 "One handler per widget, across both processes (H2)" and s13 step 6a as accepted at
137c133087, with ADR-007 s8's dated line of 2026-11-15 and L5 s5.1's `pywidget.state/1` layout. Line numbers are at
dadba11da4. Date: 2026-11-17. Odalys's s5-delta review (9eccaddcbd) read as context only; where a finding of mine is
also hers I say so.

Since then on main: `WidgetStateCommit.swift`, `WidgetStateCommitTests.swift` and `ProjectSendPlan.swift` are
unchanged at HEAD (9bb5eba0fe). `tests/state_commit/main.swift` changed once (ed2bf9f860, T-4702, mine: the
helper's `state.lock` waits are 60 s, and a busy row not written prints as `other`). `ExtensionLane.swift` and
`lane.py`, both named as targets, are not touched by dadba11da4; their later changes (T-4656, T-1764 and others)
do not name `run.lock` or `WidgetStateCommit`. Nothing in the app or the extension calls `WidgetStateCommit.run`
at dadba11da4 or at HEAD (`git grep`), so nothing here runs on a phone yet.

## Tests run

All finished before this file was written; each result below is the line I read in the output.

- `run_host.py --both --timeout 1500 -v state_commit` (the widened G-L5-5 and the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> tests), foreground, at
  dadba11da4 (a `git archive` copy in my scratch folder) and at HEAD (the worktree): 3 tests OK on Python 3.9.6
  and 3.13.18 at both commits (about 11 s each). Each run prints a `ResourceWarning: unclosed file` (L2).
- `run_host.py --both --timeout 1500`, every suite (land:host as landing runs it), at dadba11da4 and at HEAD, run
  in the background with `-u` into scratch files under a machine load of about 110 on 8 cores, and waited for:
  at dadba11da4, `OK: 2 interpreters, 40 suites, 3518 tests, 0 failed suites`. At HEAD, 3.9.6 OK (21 suites,
  1845 tests); on 3.13.18 one suite failed, `widgets` (426 tests, 5 failures), all in
  `test_premade_sensor_timeout.TimeoutKeepsTheGoodTree.test_with_nothing_fresh_to_keep_it_says_so_and_nothing_false`
  (altitude, distance): the fake bridge's sensor wait ran past the run budget (2.4 to 2.6 s) and the run came back
  `interrupted`, not `ok`. That test and its files are not touched by T-4554. Rerun alone in the foreground,
  `run_host.py --python python3.13 widgets` at HEAD: PASS, 426 tests (load average then 598). I read it as a timing
  flake under load, not this commit; it is not a finding here. The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py tests are in the `bridge` suite: 294
  tests at dadba11da4 and 329 at HEAD, PASS on both interpreters at both commits.
- `swift test --filter 'WidgetStateCommitTests|ProjectSendPlanTests'` in `pywidget/ios/Core` (scratch build path),
  at dadba11da4 and at HEAD: 65 tests, 0 failures at both (WidgetStateCommitTests 19, ProjectSendPlanTests 46).
- Root `tests/run.sh`: none of its parts cover `pywidget/` (no `pywidget`, `state_commit` or `run_host` in it), so
  none applied.
- Probes: a host program built with `xcrun swiftc -swift-version 6` from `WidgetStateCommit.swift` at dadba11da4
  plus a scratch `main.swift` (nothing kept in the tree). Results in M1, M2, M3.
- Not run: Xcode (`tools/xc.sh`). The commit adds no app or extension caller, and the classes it changes ran
  under `swift test` above. No Simulator or device.

## Verdict: PASS with findings

The primitive does what s7 asks of it on the host. `run` holds the flock on `run.lock` from before the snapshot
to after the body (`WidgetStateCommit.swift:275-295`); the snapshot and the commit each take `state.lock` for a
short hold inside it (`:244-266`, `:298-310`); `(epoch, rev)` is checked once and a moved one is `conflict` with
nothing written (`:254-258`); `busy` runs after `run.lock`'s descriptor is closed, so the refusal row takes
`state.lock` alone (`:288-293`); the extension (`creates: false`) never makes `run.lock` and gets `noRunLock`
(`:28-29`, `:290`); `Hold` begins before the wait and ends after the release on every path (`:278-279`). Odalys's
F1 (a state past the read limit wedged the file) and F2 (`run.lock` missing from `runFileNames`) are fixed with
boundary tests (`WidgetStateCommitTests` `testAStateAtTheCapCommitsAndOneByteOverWritesNothing`;
`ProjectSendPlanTests.swift:314`). The two-process test commits 800 runs with no lost commit and a row for every
`busy`, and the kill tests leave a whole file with `count == rev`.

Three things should be fixed before step 6 (T-4556) builds on it, none of which reaches a person today because
nothing calls it: a commit can land on disk while it reports `writeFailed` (M1); the file reuses L5's format id
with a different layout (M2); and the API is synchronous while both run paths it must wrap are `async` (M3).

## Done-when, item by item (this is a slice)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Done-when, item by item (this is a slice), scrolls sideways" style="--tw:640px" markdown="1">

| Done-when item | At dadba11da4 |
|---|---|
| land:host | Green at dadba11da4 and HEAD (above) |
| Widened G-L5-5: two processes commit one widget many times, no lost commit, every refusal's `busy` row | Covered on the host, for the primitive: the row is the test helper's stand-in written under `state.lock` (`main.swift:23-31`), not `RunLogStore`'s `widget_action`/`busy` row from a caller, because no caller exists |
| A run's own tree, row and status written while it holds `run.lock` | Shown in one process with stand-ins (`WidgetStateCommitTests` :209); the real lane and app paths are unwired. Open, on T-4577 (Odalys F3) |
| A render's tree write succeeds during a handler run | Same: test thread and plain write (:233). Open, on T-4577 |
| Renders never take `run.lock` | True by construction (nothing but `run` opens it); no render code changed |
| Kill test: a killed holder frees `run.lock`, and the marker demotes | Frees it: covered (two tests). Demotes: not covered; the helper writes `ext.marker` itself (`main.swift:41-46`) and the test checks only that the file is there. The ExtensionLane test is on T-4577 |
| G-L5-1 (a) recorded | Open, on T-4577 |
| The app suspended mid-run is not killed | Open, on T-4577 (`Hold` exists; nothing backs it with a background task) |
| Odalys's review of the s5 delta written | Done (9eccaddcbd) |
| Lock order `run.lock`, `state.lock`, premade lock | Stated (`:8-10`) and true for the first two in code; the premade lock is not touched or tested here (Odalys F7, on T-4577) |

</div>


## Findings

### M1. A commit can be on disk while the run is told `writeFailed` (T-4760)

- Where: `WidgetStateFile.write` (`WidgetStateCommit.swift:140-161`): it renames the temp file in (`:156`), then
  compares a fresh decode of the file with itself (`:160`). `decode` re-parses the file and re-encodes the state
  (`:97-105`), and the state it is compared with was encoded once by `sortedObject` (`:114-118`, from `:245`).
  The comment on the outcome says the opposite of what happens (`:193`: "state.json is the file it was").
- Probe: a run committing `{"a": -0.0}` returns `ran(writeFailed)`, and `state.json` on disk is
  `{"epoch":"...","format":"pywidget.state\/1","rev":1,"state":{"a":0}}`. Cause, shown separately:
  `sortedObject({"a":-0.0})` is `{"a":-0}`, and `sortedObject` of that is `{"a":0}`, so the round trip is not at
  its fixed point after one pass. `{"a":-1e-400}` also encodes as `-0`. Python gives `-0.0` easily
  (`round(-0.04, 1)`), and `json.dumps` writes it as `-0.0`. Twelve other awkward values (0.1, 1e300, 5e-324,
  integers past 2^53 and past Int64, `/`, U+2028) committed and read back correctly.
- Effect once wired: the handler's state is committed and `rev` moves, but the caller is told nothing was written,
  so by s7 "Called" (b) it keeps the old tree and logs a failure. State and tree then disagree, and the person sees
  an error for a tap whose change was kept.
- Fix (Idris): compare the bytes read back with the bytes written (`data`), not a re-encoding; or encode to the
  fixed point before writing. And make the after-rename failure honest: if the read-back fails after the rename,
  the outcome must say the file changed, not `writeFailed`. A test with `-0.0` (top level and inside a list).

### M2. `pywidget.state/1` is written with a layout other than the one L5 defines under that id (T-4761)

- Where: `WidgetStateCommit.swift:59` and `:124`: `{"epoch", "format": "pywidget.state/1", "rev", "state": {...}}`.
  L5 s5.1 ([`pywidget/docs/research/L5-interactivity.md`](l5-interactivity.html), "`pywidget.state/1` as of 2026-10-26") defines the same
  id as `{"schema": "pywidget.state/1", "epoch", "rev", "next_seq", "scopes": {"shared": {...}}, "pending",
  "ops_log"}`. ADR-011 s7 and ADR-007 s8's dated line call the 1.0 file "the 1.0 part of L5 s5" under that id, and
  name what is left out (ops, `pending`, `failed.jsonl`), not a renamed key or a moved state object. The Python
  half already written against L5 (`pywidget/ios/App/Runtime/pywidget/widgets.py:27-36`, `SCOPES_LIMIT`) reads and
  <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> `scopes`, "the whole `scopes` value, braces in".
- Probe: a `state.json` in L5's layout (`schema`, `scopes.shared`, `rev` 4) gives `noSnapshot(unreadable)`: the
  handler never runs, and the file is never overwritten, so that widget's buttons stop for good.
- Effect: two layouts under one id. A 1.1 build cannot tell which it has from the id, and the 64 KiB cap is
  measured on a different object than the one L5 s5.4 and widgets.py name. Nothing writes `state.json` on a phone
  yet, so this is free to settle now and costly after the first TestFlight build that writes it.
- Fix (Idris, with the ADR owner's dated line): either write L5's subset (`schema`, `epoch`, `rev`,
  `scopes: {"shared": {...}}`, the cap on `scopes`), or give this layout its own id and put a dated line in L5 s5.1
  and ADR-007 s8 saying which id 1.0 writes and how 1.1 reads it. A test that pins the chosen keys.

### M3. `run` takes a synchronous body; both run paths it has to wrap are `async` (T-4762)

- Where: `run(... _ body: (Snapshot, Commit) throws -> R)` (`WidgetStateCommit.swift:275-277`); `Commit` is
  `@unchecked Sendable` on the claim that `done` "is touched only on the run's thread" (`:222`); the lock wait
  polls with `usleep` (`:32-35`). The extension's run is `async` (`ExtensionLane.swift:336` `turn`, `:684`
  `runInBridge`, which awaits the bridge and the record stream), and ADR-011 s4's intents run in `perform()`,
  which is `async`.
- Effect: step 6 cannot hold `run.lock` across an awaited handler run with this API except by blocking a
  cooperative-pool thread until the async work finishes, which can deadlock on a small pool (the extension's), and
  `usleep` for up to the 2.0 s budget blocks one too. And the `Commit` outlives the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>: probe, a `Commit` kept
  past the body: `run.lock` was free (another `flock` took it at once), and the late `commit` returned
  `committed(rev 1)`. The `rev` check still stops a lost update, but the one-handler rule (s7) no longer holds for
  that commit, and `done` is then touched off the run's thread.
- Fix (Idris): an `async` `run` whose body is `async`, waits that sleep with `Task.sleep` rather than `usleep`, and
  a `Commit` that refuses once the body has returned (a closed flag set before `run.lock` is let go), with a test
  for each. Better in this primitive, with its tests, than worked around in step 6.

### L1. No `fsync` of the folder after the rename

`WidgetStateFile.write` fsyncs the temp file but not `widgets/<id>/` after `rename` (`:154-156`). A power loss
after a reported commit can bring back the previous `state.json`, `rev` included. On APFS the window is small; an
`fsync` of the folder descriptor closes it. The commit message's "temp+fsync+rename" is accurate; this is the
step after it.

### L2. The process tests leave pipes open

`test_state_commit_processes.py:90-99`: the kill test reads `holder.stdout` and ends with `holder.wait()`, not
`communicate()`, so that pipe is never closed and every run prints `ResourceWarning: unclosed file` on both
interpreters. Harmless now; it is noise in the land log, where a real warning would hide. Close it in the
`finally`.

### L3. The mutant result in the commit message is not in the tree

"Mutants (run.lock per process) go red with conflicts" has no mutants file or results file beside the other
`mutants-t*.json` in `pywidget/ios/Core/`. Odalys reproduced it (her M1, M2), so the claim stands; a
`mutants-t4554.json` would let the next reader rerun it.

## What is good

- The extension can never make `run.lock` (`creates: false`, `noRunLock`), which is ADR-007 s8's rule, and a test
  holds it.
- `busy` runs outside `run.lock`, so the refused run's row cannot wait on the run that refused it; the tests count
  rows against refusals across two processes, and T-4702 later showed the one lost row under load was the test
  helper's own wait, not a race in `run`.
- The kill tests are real SIGKILLs at random points (40, seeded), and they check the file parses, `rev` never goes
  back, `count == rev`, and no `.tmp` survives the next commit.
- The commit message says plainly what was not run (xc.sh exit 75) and what moved to T-4577.
{% endraw %}

</div>
