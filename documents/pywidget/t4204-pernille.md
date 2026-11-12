---
layout: "default"
title: "T-4204 review: T-4198 as landed at 84505c1f81 (a failed background start prunes the run history)"
section: "documents"
description: "PASS. Nothing High or Medium. Two Lows, neither needs a change before TestFlight. The timed-out start Idris raised is real, matters for publishing the privacy policy (not for TestFlight), and is already on the board as\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4204-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4204-pernille.md</code></span></div><h1>T-4204 review: T-4198 as landed at 84505c1f81 (a failed background start prunes the run history)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12. Author: Idris. Read: the commit's five files, LaunchRunLog.swift whole,
WidgetWriter.run / step / notStarted / BackgroundHold, RunScriptIntents.swift ShortcutRun, RunLogStore.pruneAll,
every `bridge.start()` caller in App/, the privacy policy draft's two timing sentences and gate 2a (iii), and my own
pywidget/docs/reviews/t4178-pernille.md. No Xcode or Simulator run (packet); runner jobs read with `xc_route.py status`
and ops/metrics/main_gate.jsonl.

## Verdict

**PASS.** Nothing High or Medium. Two Lows, neither needs a change before TestFlight. The timed-out start Idris
raised is real, matters for publishing the privacy policy (not for TestFlight), and is already on the board as its
own fix line, T-4205 (prune when a background start times out); L2 below widens what that line has to cover.

## What holds, checked

- **The tested tree is the landed tree.** The green job J-20261112-1208-land-m2-46f06f ran commit 7cefbd791e
  (main_gate.jsonl `verdict`); `git diff 7cefbd791e 84505c1f81 -- pywidget/ios/` is empty. Green: 1671 executed,
  2 skipped, 0 failures. No later commit touches the five files.
- **Every failed background start reaches the prune.** The only background start roads are WidgetWriter.run
  (`case .failure`, WidgetWriter.swift:255-261) and ShortcutRun.run, now through `startPython`
  (RunScriptIntents.swift:132-142, called at :155-156). Both call `startFailed()` on any thrown error. The other
  three `start()` callers (PyWidgetApp.swift:641 console boot, WidgetRunView.swift:39, GalleryPreview.swift:94) are
  foreground with a scene, so `sceneBecameActive` covers them (PyWidgetApp.swift:121).
- **Once a day, and the claim is per process.** `pruneIfDue` (LaunchRunLog.swift:90-102) claims `lastPrune` under
  its unfair lock before the prune, so the first failed start in a process prunes, and a second within 24 h
  (from any of the three callers) gets nil. A fresh process has `lastPrune == nil`, so a background launch
  prunes on its first failed start: this matches "each time it starts". One side effect, harmless: a failed
  start followed by a good start in the same process prunes twice, because `afterStart`'s launch pass always prunes
  and does not consult `lastPrune`. The work is idempotent; it costs one more directory walk.
- **No recovery on a failed start.** `startFailed` never touches `pass`; the tests assert `pass.ran == false`.
  Right: the recovery needs the crash marker that only a started bridge has read.
- **No lock or hold ordering problem, and no prune inside a write.** The prune's body is synchronous
  (`store.pruneAll` inside `BackgroundHold`), so no lock spans an `await`. pruneAll takes one flock at a time
  (each widget's state.lock, then console.lock, then widget locks again for the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>), never nested. In
  WidgetWriter the error row's hold (`pywidget.widget-run`, notStarted at :340-346) has ended before the prune's
  hold (`pywidget.run-log-prune`) begins, so the two assertions do not nest and the row is never written under the
  prune. A concurrent writer (the extension's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, a console run, the next widget in `refresh(ids:)` while a
  prune left behind by a 15 s step timeout is still going) meets the same bounded LOCK_NB flock
  (LaneGuard.swift:305): one waits at most 0.5 s and the prune reports that widget `busy`. That is the same
  behaviour the launch pass and the activation prune have had since T-1677/T-3758. Python is not running on
  either road (the start failed), so no run of this process is mid-write. The just-written error row cannot be
  pruned: it is seconds old.
- **My T-4178 findings still hold.** BackgroundHold.app hops to the main actor to begin and end the assertion
  (my T-4178 L1). On the widget road the prune sits inside `step(...)`, so a busy main actor costs at most the 15 s
  step and the refresh still returns. On the Shortcut road `startFailed` is awaited without a bound; in a
  background intent launch the main actor is idle, and pruneAll's own waits are bounded (0.5 s per busy lock), so
  this is acceptable. Shortcuts cancelling the intent does not interrupt the prune (an awaited detached task),
  which is what we want: it finishes inside its own assertion.
- **The tests fail without the fix, for the right reason.** The red job J-20261112-1142-land-m-57e31d ran commit
  f5dd212c88 (the new WidgetWriter test on the old code): 1668 executed, 4 failures, all in
  `testT4198AFailedPythonStartPrunesTheRunLogOnceADay`, the first at WidgetWriterTests.swift:466, "the failed
  start pruned the row past 14 days". The four asserts that fail on old code are :466 (old row still there),
  :468 (no prune hold), :474 (second refresh: 0 prune holds, not 2) and :475 (two old rows, not one). The three
  LaunchRunLogTests do not compile on old code (no `startFailed`, no `ShortcutRun.startPython`), which is why the
  green job has 3 more tests. Reading the mutants against them:
  - `startFailed` a no-op: red in all four new tests (the red job proves the widget one).
  - `startFailed` not claiming `lastPrune` (prunes every time): red, `again` non-nil and :474/:475.
  - `startFailed` running `afterStart` (the recovery) instead: red, `pass.ran` asserted false.
  - prune outside a <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, or in the wrong hold name: red on the hold-log assertions.
  - Shortcut road calling `afterStart` on failure, or not calling `startFailed`: red in the Shortcut test.
  - prune before the error row instead of after: green, and correctly so; the order does not change the result.

## Low

### L1. The Shortcut road's wiring to `LaunchRunLog.app` is not under test

- Where: RunScriptIntents.swift:155-156, `launchLog: bridge === PyBridge.shared ? LaunchRunLog.app : nil`.
- What: the test drives `ShortcutRun.startPython` with its own `LaunchRunLog`. A mutant that passes `nil` in
  `ShortcutRun.run` stays green, so the Shortcut road could lose both the launch pass and the failed-start prune
  without a red test. The same was true of the `afterStart` call there since T-1677; this commit did not make it
  worse and made the logic itself testable.
- Action: none before TestFlight. If `ShortcutRun.run` ever gets an injectable bridge start, add one test through
  `run` with the shared bridge.

### L2. Background launches that never try to start Python make no check either (wider than the timeout)

- Where: WidgetWriter.run's early returns before the start, :240-246 (Pro check timed out, `locked`, no script),
  its `case nil` start timeout at :254, and ShortcutRun.run's throws before `startPython` (no library, no such
  script, the source read).
- What: the draft says runs older than 14 days "are deleted at a check pywidget makes each time it starts". After
  this commit that is true of every background start that finishes, failed or not. It is not true of a
  background launch whose start times out and that makes no later start (Idris's case, now T-4205), nor of one that
  ends before any start: a tap on a locked premade after Pro lapses, a widget or Shortcut whose script was deleted.
  The data never leaves the device, and the draft's next sentence already says rows can outstay 14 days "until the
  next check", so a person is not misled about where the data is or that it can stay. But "each time it starts"
  reads as every launch, and these launches are launches.
- Does it matter: not for TestFlight (no policy ships with it). It does matter for publishing, because the policy
  states retention as fact and gate 2a (iii) already holds publishing on T-4205.
- Action: under T-4205, either (a) prune when due at the top of both background roads, before any early return
  (`startFailed`'s body does not need a started bridge; it needs only the App Group, and it is one assertion),
  which makes the sentence true of every background launch with one change instead of one per branch; or (b) keep
  the code and have Wrenna word the sentence to the code ("each time it runs or tries to run a script"). I prefer
  (a): one call, and the policy can stay plain. I have noted this on T-4205.

## Not in scope

A process iOS keeps suspended for days and wakes only in the background never prunes again (start succeeds at once,
the launch pass is already done, there is no activation). The draft's "pywidget does not wake up just to make this
check" and "while it stays running, when you switch back" sentences already describe that honestly; this commit
does not change it.
{% endraw %}

</div>
