---
layout: "default"
title: "Review of f57d1f89: T-4762, the run lock wraps an awaited Python run and a late commit is refused"
section: "documents"
description: "The fix does what M3 asked, and the questions of this review come out the right way."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4762-f57d1f89-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4762-f57d1f89-pernille.md</code></span></div><h1>Review of f57d1f89: T-4762, the run lock wraps an awaited Python run and a late commit is refused</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4945, Commandment 13). Author: Idris. Reviewed: f57d1f89ac as a whole (4 files:
`ios/Shared/WidgetStateCommit.swift`, `ios/Tests/Core/WidgetStateCommitTests.swift`, `tests/state_commit/main.swift`,
`docs/decisions/ADR-011-widget-actions.md`), against the T-4762 board line and my M3 in
`docs/reviews/dadba11da4-pernille.md`, with my review of the commit before it in the same file
(`docs/reviews/942e3aca8c-pernille.md`) for context. The author's memory and board notes were not read. Code
comments read as data. Paths are under pywidget/. Date: 2026-11-20.

f57d1f89ac is itself on main. 2db76d4f2a, the commit that carries the same subject, touches only the author's
memory file; its tree holds the four files byte for byte as f57d1f89ac does (same blob ids). At 859fb35a9c (main
when I started) the three code files are unchanged since f57d1f89ac; the ADR has one later line (T-5002, s7 (b)),
outside the lines cited. Line numbers below are at f57d1f89ac.

## Tests run

- Unit tests, MacBook runner: `tools/runner_queue.py --only-testing PyWidgetTests/WidgetStateCommitTests`
  (XC_TASK=T-4945), job J-20261120-0603-xc-test at 859fb35a: passed, exit 0, 81.9 s; 31 executed, 0 skipped,
  0 failures (the file's 31 cases; ops/runs/xcodebuild-20261120-060656.log on the runner). The job file landed as
  0e3487abb7 so the runner could take it.
- Host harness, in my copy at 859fb35a: `python3 -m unittest discover -s pywidget/tests/state_commit -p 'test_*.py'`:
  3 tests, OK, 147 s (load average 79-105). The two-process commit test, the <span title="A test written in advance. If it fires, we drop the idea.">kill</span>-holding-run.lock test and the
  random-kill test all go through the async `run` now.
- Harness mutant, same copy, put back with `git checkout`: `run` takes a fresh `run.lock.<uuid>` file each call (the
  lock removed in effect): 2 failures (`test_two_processes_commit_one_widget_many_times_and_lose_none`, commits
  reported "other" for conflicts; `test_a_process_killed_holding_run_lock_frees_it_and_leaves_its_marker`, a second
  process committed while the first held the lock). KILLED.
- Host probe (a scratch `swiftc -O -swift-version 6` program built from WidgetStateCommit.swift and a main.swift of
  my own, outside the repository, nothing kept), three cases, each run 3 times on the reviewed file:
  - P1, a commit mid-write when the body returns (the read-back hook sleeps 300 ms inside `replace` and checks
    run.lock from another descriptor): `committed rev 1`, run.lock held during the write. 3 of 3.
  - P2, a commit past its first check, waiting on a held state.lock, when the body returns: `late`, no state.json.
    3 of 3.
  - P3, a body that never returns and ignores cancellation (a Python thread the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> could not stop), task
    cancelled: run.lock still held 1 s after the cancel. 3 of 3. That is the code doing what it says; see M2.
- Swift mutants of the ordering, built into the same probe (the runner takes only main commits, so they could not
  run in WidgetStateCommitTests there; XC_LOCAL is outside this task):
  - (A) the `closed ?` check inside `write`'s state.lock hold removed (`:392`): P2 `committed rev 1`, state.json
    written after the run ended. 2 of 2. P1 unchanged.
  - (B) `commit.close()` moved from the body's `defer` (`:447`) to after `awaiting` returns, so after run.lock's
    descriptor is closed: P1 run.lock **free** during the commit's write. 2 of 2. P2 unchanged.
  - Both survive WidgetStateCommitTests by reading: the only late-commit test (`:540-562`) starts its straggler after
    `run` has returned (the `go` gate opens after it), so the first check (`:371`) refuses it in both mutants, and no
    test has a commit in flight when the body returns. See M1.
- No phone or Simulator run of my own beyond the runner job; nothing here is measured on a device.

## Verdict: PASS with findings

The fix does what M3 asked, and the questions of this review come out the right way.

Two runs cannot interleave. `run` (`:433-458`) takes run.lock through `WidgetFileLock.awaiting` (`:50-61`), a fresh
descriptor per call, so two runs in one process contend as two processes do; the snapshot is read inside the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>;
the one `Commit` checks `(epoch, rev)` once under state.lock. The runner's 300-run two-runner test and the
harness's two-process and random-kill tests are green, and the harness goes red with the lock taken out.

A commit cannot be doubled or land after its run. `commit` (`:369-380`) marks `started` under the Commit's lock, so a
second call is `alreadyCommitted`. `close` (`:383`) and the write's closed check (`:392`) take the same NSLock, and
the check and the whole `replace` (read, temp, fsync, rename, read-back) sit inside it, so a commit is either
finished before `close` returns or refused `late`; the `defer` at `:447` runs inside `awaiting`'s body, before
`awaiting`'s own `defer { close(fd) }`, so `close` happens before run.lock is let go. P1 and P2 show both halves. A
late commit is reported truthfully: `late`, nothing written, `done` stays nil.

No deadlock. Lock order is run.lock, state.lock, then the Commit's NSLock, and nothing takes a flock while holding
the NSLock; `close` takes only the NSLock. A caller that wrongly holds state.lock while it commits waits
`stateWait` and gets `stateLockTimeout`, not a hang. Every flock wait is bounded by its budget and stops at once on
cancellation (`:58`); the cancel test covers run.lock, and the snapshot and commit waits share the same loop. A killed
process frees both locks (the harness kill tests). The wait no longer holds a thread: test (b) is a timing bound,
but its limit (four budgets, 1.0 s) sits well clear of a sleeping wait (about one budget) and of a blocking one
(eight budgets, one per core-wide batch).

What is not yet proven is the ordering itself (M1), and what is not bounded is a body that never returns (M2).

## Findings

### M1 (Medium): the two ordering claims of the fix have no test that fails without them

- Where: `WidgetStateCommit.swift:392` (closed check inside the state.lock hold), `:447` (`close` before run.lock is
  let go); `WidgetStateCommitTests.swift:540-562`.
- The doc comment (`:336-340`) and ADR-011 s7 say a commit already writing when the body returns finishes first,
  inside run.lock, and one still waiting for state.lock finds the run closed. Both are true (P1, P2). But mutant (A)
  and mutant (B) above each break one of them and leave all 31 cases green, because the late-commit test only ever
  starts its straggler after the run is over. The task's Done-when asked that a late commit be refused; the two
  windows where lateness is decided are exactly the ones untested. This is the code the button drawing and
  app-suspension steps will build on; a later edit that moves the `defer` out of the closure, or drops the inner
  check as redundant, would pass review on green tests.
- Fix: two WidgetStateCommitTests cases built as P1 and P2: (1) the read-back hook (`readBack` already exists for
  tests) blocks inside the write until the body has returned, and records whether run.lock is held from another
  descriptor: committed, held; (2) the body holds state.lock on its own descriptor, starts a commit in a detached
  task, waits until it is polling, returns, then lets state.lock go: `late`, no state.json. Ordering by gates and
  the hook, not by sleeps where it can be helped (case 2 needs "the commit is past its first check"; if no hook
  says so, a sleep only makes the test weaker, never wrong). Board: T-5303.

### M2 (Medium): nothing bounds a run's hold when the handler never comes back

- Where: `WidgetStateCommit.swift:426-458` (`run`), ADR-011 s7 ("The window is at most 2.0 s in the widget ...
  and the action's `timeout` plus ADR-007's kill ladder in the app").
- `wait` bounds only the wait for run.lock. The body is awaited to the end, so a body that awaits the interpreter
  thread directly holds run.lock for the life of the process, and cancelling its task does not help, since a
  Python run on its own thread does not see Swift cancellation (P3). ADR-007's ladder ends in `stuck`: a run the
  ladder could not stop. s7's window holds only if the body returns at the ladder's deadline and leaves the
  interpreter thread behind; then the run's Commit is closed and the straggler's commit is refused `late`, which is
  what this fix makes safe. Neither `run`'s doc comment nor the ADR line says the body must do that, and no test has
  a body that outlives its budget. In the app a held run.lock refuses every tap on that widget, from both
  processes, until the app is ended; held over a suspension it is the 0xdead10cc case s4 names.
- There is no caller yet (T-4762's line: "before the button drawing and app-suspension steps wire it"), so this is
  not a shipped bug; it is the contract those steps will be written against.
- Fix: either give `run` a body deadline (race the body against it, and on expiry close the Commit, let run.lock go
  and return a `stuck`-like outcome), or write the rule into `run`'s doc and s7 and make the wiring steps' Done-when
  carry a hung-handler test. Board: T-5304.

### L1-L3 (Low), one board line, T-5305

- L1: a run cancelled while it waits (`:452-453`) writes no row and calls no `busy`, by design (ADR s7 new line).
  The person's tap then leaves nothing, where s7 says a refused run is "never silently dropped". Say in s7 what a
  cancelled tap leaves (a `cancelled` row, or why none is right).
- L2: `awaiting` measures its budget with `Date()` (`:55-57`), a wall clock; a clock step during the wait stretches
  or cuts it. `ContinuousClock` (or `DispatchTime`) does not move. The synchronous `with` has the same line from
  before this commit.
- L3: `close` (`:383`) waits on the Commit's NSLock for a write in progress, fsync included, on the caller's
  thread, which is the main actor's if the caller runs there (`body` runs in the caller's isolation). P1 held it
  300 ms with a slow read-back. Say so in `run`'s doc, or keep callers off the main actor.

## Checked and fine

- Cancellation before the lock: the first `flock` try comes before any sleep, so a cancelled task still takes a
  free lock and runs; a busy one returns `.cancelled` at once. The body then runs under a cancelled task, which is
  the caller's to check.
- `Hold`: begins before the wait, ends after run.lock is let go on every path (the `defer` in `run` is registered
  before `awaiting` and runs after it returns); tested on the run, busy and no-lock paths.
- `Commit` is `@unchecked Sendable` with `started`, `closed`, `result` and `_readBack` touched only under its lock;
  `write` reads `_readBack` directly inside the lock, not the locking getter, so it does not deadlock on itself.
- A cancelled commit (`.cancelled`) has set `started`, so a retry in the same run is `alreadyCommitted`; nothing was
  written either time and both outcomes say so.
- The harness's `hold` helper now sleeps with `Task.sleep` and is killed holding the lock; the kill tests still free
  it, so a process killed mid-await releases run.lock as one killed mid-`sleep` did.
- ADR-011 s7's new line matches the code (async run and body, sleeping waits, `cancelled` not `busy`, `late`, an
  in-flight commit finishing first).

## Board lines

- T-5303 (M1): two ordering tests for the commit and `close` (Idris, P2).
- T-5304 (M2): bound the run lock hold when a handler never returns (Idris, P2).
- T-5305 (L1-L3): cancelled tap row, a steady wait clock, `close` on the caller's thread (Idris, P3).
{% endraw %}

</div>
