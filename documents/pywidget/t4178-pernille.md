---
layout: "default"
title: "T-4178 review: T-3757 as landed at a42f0cc866 (unstarted run rows inside the background-task hold)"
section: "documents"
description: "PASS. Nothing High or Medium. One Low, for the record; it needs no change before TestFlight."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4178-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4178-pernille.md</code></span></div><h1>T-4178 review: T-3757 as landed at a42f0cc866 (unstarted run rows inside the background-task hold)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (not the author). Author: Idris. Date: 2026-11-12.
Scope: a42f0cc866's three files (App/Bridge/WidgetWriter.swift, Tests/WidgetRunReasonTests.swift,
Tests/WidgetStepTimeoutTests.swift), read against what they call: RunLogRecorder.recordNotStarted, RunLogStore's
bounded `state.lock` (Shared/LaneGuard.swift WidgetStateLock), BackgroundHold.app and BackgroundTask, PyBridge.start
and PyBridge.run, LaunchRunLog.afterStart. It closes M1 of pywidget/docs/reviews/t1677-pernille.md.
Method: `git show` of the commit and of the files at that hash (unchanged at main's HEAD 6521805448); the runner's
two jobs read with `tools/xc_route.py status`. No build or Simulator run of mine: the red and green runs are the
author's, and I read their results, not the logs on the runner.

## Verdict

**PASS.** Nothing High or Medium. One Low, for the record; it needs no change before TestFlight.

## What holds, checked

- **Every write under state.lock on the four not-started paths is inside the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>.** `notStarted`
  (WidgetWriter.swift:336-344) is the only writer on those paths, and its one call, `recorder.recordNotStarted`,
  is inside `hold("pywidget.widget-run") { ... }`. recordNotStarted (RunLogRecorder.swift:179-188) writes the row,
  makes a premade's folder and updates status.json in one `store.recordWidgetRun` call under the lock, so all of it
  is inside the body. The four roads in `run` all go through it: no script (:245), Python unavailable (:256),
  not queued (:273), and `timedOut` (:325-327) for Pro check (:241), Python start (:254) and launch log (:261).
  `placed` and `offered` time out to `[]` and write nothing, as before. The started-run row (`record`, :349-358)
  was already inside the hold at :284-291. No other App/ file calls `recordNotStarted`, `recordWidgetRun`,
  `recordLaneTurn` or `WidgetStateLock` directly; LaunchRunLog's launch pass and prune take their own holds.
- **Nothing awaits while holding the file lock.** BackgroundHold's body is a synchronous `() -> Void`
  (WidgetWriter.swift:412-418), so the compiler forbids an `await` inside it. The flock is `LOCK_NB` with a 0.5 s
  retry (LaneGuard.swift:300-310), so the body is bounded by that wait plus a few small file writes. BackgroundHold.app
  begins and ends the assertion through `MainActor.run` and runs the body off the main actor (Swift 6 mode,
  no NonisolatedNonsendingByDefault in project.yml), so iOS's expiration handler, which runs on the main thread,
  is never queued behind the body.
- **No new deadlock or race with the store's locks or the bridge queue.** No lock is held across any of the new
  suspension points: the unfair locks and NSLocks here are `withLock` scopes and cannot span an `await`. The not-queued
  path calls `enqueue` (PyBridge.run takes and releases `lock` synchronously, then throws) and only then awaits the
  hold. The default `enqueue` is `{ try $0.run($1) }`, the same call as before, with the same `newRunID()` taken first.
  The flock is the only cross-process lock, and its wait is bounded, so the extension's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> holding it costs at
  most 0.5 s and a missing row, not a hang.
- **Call order kept.** Every changed call site is a `return await ...`; the outcome string and trigger are the same,
  `.skipped(reason)` is still returned with no recorder (and now with no hold, which is right: nothing to write).
  `refresh(ids:)` still checks `appRunPending` before each id, after the previous id's row; `scriptSaved` still gets
  `runID == 0` and returns. The added suspension points are only on paths that are about to return.
- **The tests fail without the fix, and on the hold, not on something else.** Each of the 6 tests asserts
  `holds.all == ["begin pywidget.widget-run rows=0", "end rows=1"]`: a write with no hold gives `[]`, a write before
  the hold gives `rows=1` at begin, a write after it `rows=0` at end, a different hold name fails the begin line.
  The red job J-20261112-1025-land-m-459ec0 failed exactly those 6 tests, 18 failures, every one of them
  `("[]") is not equal to (...)` on the hold line, with the row assertions above it passing: the right failure for
  the old code. The green job J-20261112-1040-land-m-12729e: 1663 executed, 0 failures. The three tests in
  WidgetRunReasonTests loop over every free premade (5 each) and cover no script, not queued and Python
  unavailable; WidgetStepTimeoutTests covers the three timed-out steps, with a fresh HoldLog per test instance.
  The launch-pass test's own hold is a separate BackgroundHold, so it cannot write lines into the writer's log.

## Low

### L1. A timed-out row now needs the main actor, and the timeout tests' hold never touches it

- Where: WidgetWriter.swift:325-327 and :339 through BackgroundHold.app (:421-424); tests at
  WidgetStepTimeoutTests.swift:34-40 and WidgetWriterTests.swift:348-357.
- What: T-3826 made a step that never answers end in a `deferred` row so the pass always returns. That row is now
  written after two `MainActor.run` hops (begin and end the assertion). If a step ever hung *on the main thread*, the
  row and the refresh would wait for it. Today none does: Python's start runs on the script thread
  (PyBridge.swift:532-544), the Pro check and WidgetKit list are async calls, and the launch pass is a detached
  task. WidgetPasses' 120 s wait still bounds a pass. The started-run path has had the same dependency since T-1140.
- Why tests miss it: both test holds are `{ name, body in ... body() ... }` with no main-actor hop.
- Action: none for this line. If a future step does work on the main actor, give it a timeout test with the real
  BackgroundHold.app.

## Not in scope

The assertion's expiry while the body is mid-write (iOS ends it, the write finishes a few ms later outside it) is
the same for every hold in the app and is not changed by this commit. GalleryPreview and WidgetRunView call
`sink.finish` for previews outside any hold; I did not re-check them here.
{% endraw %}

</div>
