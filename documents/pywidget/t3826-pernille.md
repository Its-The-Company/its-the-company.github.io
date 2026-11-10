---
layout: "default"
title: "T-3835: review of T-3826 (Idris, 2efa9e46b): bound the awaits before a widget run and the wait on a pass"
section: "documents"
description: "On main? No. git merge-base --is-ancestor 2efa9e46b main is false (main at 9f4a3803a when checked). The commit is on parked/a/20261109-110112-75049 and personal/a57, and no commit on main mentions T-3826."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3826-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3826-pernille.md</code></span></div><h1>T-3835: review of T-3826 (Idris, 2efa9e46b): bound the awaits before a widget run and the wait on a pass</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Independent review (Commandment 13). Read only: no code changed, no Xcode run.
Read at 2efa9e46b: `pywidget/ios/App/Bridge/WidgetWriter.swift`, `pywidget/ios/Tests/WidgetStepTimeoutTests.swift`,
and what they call (`LaunchRunLog.swift`, `PyBridge.start`, `ProEntitlement`, `WidgetPlacement.swift`,
`RunLogRecorder.recordNotStarted`, `WidgetStatus.deferred`, `RunLogExport.reason`, `WidgetStateLock`).
Line numbers are at 2efa9e46b.

**On main?** No. `git merge-base --is-ancestor 2efa9e46b main` is false (main at 9f4a3803a when checked). The commit
is on `parked/a/20261109-110112-75049` and `personal/a57`, and no commit on main mentions T-3826.

**Verdict: PASS with findings.** The bound does what it claims. A step that never answers no longer holds its pass,
or every pass after it, for the life of the process, and the widget gets a row. The continuation in `within` is
resumed exactly once on every path. Two Medium findings remain, and both show up in the hang most likely to happen,
a StoreKit call that never answers. In that case every widget is still blank, now with a row each. A pass of N
widgets also waits 15 s per widget, so it runs past the 120 s pass limit and past any background window. Both
should land, or be accepted in a recorded decision, before the next TestFlight build.

Apple pages read for this review (signed out, one at a time, saved under `research/inbound/apple/developer.apple.com/`,
2026-11-09):
- CheckedContinuation (`documentation_swift_checkedcontinuation.md-fa33e5e1.html`): "You must call a resume method
  exactly once on every execution path throughout the program. Resuming from a continuation more than once is
  undefined behavior. Never resuming leaves the task in a suspended state indefinitely, and leaks any associated
  resources."
- Task.sleep(for:tolerance:clock:) (`documentation_swift_task_sleep_for_tolerance_clock_.md-81dac759.html`): signature
  `clock: C = .continuous`; "If the task is canceled before the time ends, this function throws `CancellationError`."
- ContinuousClock (`documentation_swift_continuousclock.md-b18bf6b0.html`): "always increments and does not stop
  incrementing while the system is asleep."
- beginBackgroundTask(withName:expirationHandler:)
  (`documentation_uikit_uiapplication_beginbackgroundtask_withname_expirationhandler_.md-f9fab205.html`): "Apps running
  background tasks have a finite amount of time in which to run them. (You can find out the maximum background time
  available using the `backgroundTimeRemaining` property.) ... the system <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the app."
Two of my requests returned 404 because I typed the wrong URL (`task/sleep(for:tolerance:)`, `uiapplication/begintask(...)`).
Neither was a refusal.

## The checks the board line asks for

1. **The left-behind task in `within` (WidgetWriter.swift:295-305): no double resume and no dropped continuation.
   Holds.** The continuation is stored under the lock (:298) before either task exists. `answer` (:299-301) takes it
   out and sets it to nil inside `withLock`, then resumes it outside the lock, so only the first caller resumes it and
   the lock is never held across `resume`. Both tasks always call `answer`. The body task calls it when the body
   returns. The timer task (:302) calls it when the sleep ends, and also when `timer.cancel()` makes the sleep throw
   `CancellationError` (Apple's sleep page), because `try?` swallows that error. Nothing cancels the timer except a
   body that has already answered, so the continuation is always resumed, at the latest after `limit`. The order
   "body first, then the timer" runs on every ordinary step in the 18 writer tests. If the nil-out were lost, those
   tests would resume twice. The other order, "timer first, then a late body", is not tested (L4). What is left
   behind on a timeout is the body's own task. For each step:
   - **Python start:** this costs one <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> waiter. `PyBridge.start` (Shared/Bridge/PyBridge.swift:532-545) appends
     each call to `startWaiters` and runs init once, on its own `python-script` thread. A later call joins the start
     that is already running, and every waiter is resumed when it ends.
   - **Launch log:** no new work. `LaunchRunLog.afterStart` (LaunchRunLog.swift:54-70) keeps one `Task.detached`, and
     every caller awaits that same task.
   - **Pro check:** a new StoreKit read on every call (M2).
   - **Placed widgets:** one WidgetCenter call per pass.
   No body blocks a thread. Each one suspends, so a left-behind body does not hold a cooperative-pool thread.
2. **The 15 s and 120 s values against iOS's background time.** Taken one at a time, 15 s is generous where we have
   numbers. Python starts in 63-146 ms on device (docs/reviews/t2014-pernille.md:52;
   docs/investigations/t3783-not-drawn.md:91 at 2efa9e46b). Apple publishes no number for background time,
   only "a finite amount of time" and `backgroundTimeRemaining`. The only figure in the repository is "about 30 s",
   marked [recalled] and unverified (docs/decisions/ADR-007-execution-architecture.md:558). The values fail when they
   add up. The step limit applies once per widget, and the 120 s pass limit is not derived from it (M2). Both limits
   also run on the continuous clock, so they count time the app spends suspended (L5).
3. **A pass that is let go keeps running beside the next one.** This is mostly safe. Two passes that refresh the same
   widget meet in the bridge, which hands the second request the pending run's handle with the same run id
   (App/Bridge/README.md:39), and `RunClaims` (WidgetWriter.swift:376-390) logs that run once. Each pass still checks
   `appRunPending` before every id (:215). It does cost something. When both passes waited on the same run, both call
   `sink.finish`, so the tree is written twice and WidgetKit is asked to reload twice. The pass that was let go never
   sets `last`, so the next unforced activation is not spaced out. Under M2 this overlap becomes the normal state.
4. **The reason text.** It is acceptable. The Run log's reason column turns every `deferred` row into "Waited for the
   next run" (Shared/RunLog/RunLogExport.swift:102), so "timed out: launch log" stays in runs.jsonl for diagnosis and
   is never shown on screen. `deferred` is the right outcome word. RunOutcomeWord has no `skipped`, and 7.2 uses
   `deferred` for "not started, the next pass runs it". `WidgetStatus.deferred` (Shared/WidgetStatus.swift:195-200)
   writes no outcome, only `deferred_since`. So a timed-out step does not overwrite the widget's last outcome or badge.
   It also does not reverse T-1677's order when the launch pass writes `killed` later.

## Findings

### M1 (Medium): when the Pro check hangs, widgets that need no Pro are still held back

- **Where:** WidgetWriter.swift:231-234. `mayWrite` is `ProEntitlement.mayWriteTimeline`
  (Shared/WidgetPlacement.swift:17-18), which awaits `gates()`, and so `Transaction.currentEntitlements`
  (Shared/ProEntitlement.swift:52-61), before it asks `mayDraw`. `mayDraw` returns true for any id that is not a
  premade (ProEntitlement.swift:74-75: "the person's own widgets are never gated").
- **Failure:** StoreKit's entitlements sequence never finishes. This is one of the hangs the T-3826 line names (the
  Pro check, through `ProEntitlement.gates`). The "offered premades" step times out first, because it also reads the
  gates. Then every widget's Pro check times out after 15 s and is written `deferred`, "timed out: Pro check". That
  includes the person's own scripts and the free premades, and none of them needs the answer. The pass ends and the
  rows are written, but every widget is still blank for as long as StoreKit hangs. For this hang the title's promise
  ("a stuck step no longer silences every widget") is not met.
- **Fix:** When the Pro check times out, decide with the gates that need no StoreKit, built from the bundled
  `ProConfig` with `entitled: false`. A widget that `mayDraw` there (any user widget, any free premade) runs. A Pro
  premade gets the `deferred` row as now, never `locked`, so a buyer is not shown as locked out because StoreKit was
  slow. The writer needs a seam for the gates as well as `mayWrite`. Test: a gates call that never answers, a user
  widget and a Pro premade. The user widget runs, and the Pro premade is `deferred` "timed out: Pro check".

### M2 (Medium): the timeouts add up per widget, so a hung shared step outlasts the pass limit

- **Where:** the per-id loop at WidgetWriter.swift:212-218 runs `run` (:228-253) for each id, and each id waits out
  `stepLimit` again for the Pro check (:231), Python start (:241) and the launch log (:251). The pass limit is
  `WidgetPasses.wait = 120 s` (:498).
- **Failure:** The hangs that matter are shared by the whole pass: StoreKit, Python's one start, and the one launch
  pass. A pass of N widgets therefore takes about N x 15 s, plus 15 s for the offered step when StoreKit is the hang.
  The first pass after install runs the placed ids and every offered premade with no tree. There are 13 `.py` files in
  `App/Runtime/premade/`, so N is about 12. At N >= 8 the pass is let go at 120 s while it is still writing deferred
  rows, and the next activation starts a second pass beside it (check 3). The Pro check makes a fresh StoreKit read on
  each call, so every pass leaves N more StoreKit tasks behind. A Refresh Widgets intent (trigger `shortcut`, run in
  the background) has "a finite amount of time" (Apple). Two widgets already take 30 s, the only figure we hold, so the
  system ends the intent before the pass finishes.
- **Fix:** Let a timed-out step that the whole pass shares end the pass's remaining widgets at once, each with its
  `deferred` row naming the step. Keep a memo per pass, or ask for the gates once per pass and hand them to every id's
  `mayDraw`. That also halves the StoreKit reads, because the offered step reads the same gates. Then the pass limit
  can be derived instead of picked. Either reset it on progress (each widget's outcome restarts the clock), or set it
  to at least one `stepLimit` per shared step plus N x the per-run ceiling (`BridgeLimits.stopDeadlineSeconds` 5 s +
  `hardStopSeconds` 2 s). Test: ten placed ids, a Pro check that never answers, and `stepLimit` 300 ms. The pass
  returns in under 2 x `stepLimit` with ten `deferred` rows.

### L1 (Low): the pass limit is counted from each waiter, not from the pass

- **Where:** WidgetWriter.swift:514-516 and :527-529 (WidgetPasses).
- **Failure:** A caller that joins a hung pass at t = 119 s waits on its own 120 s, until t = 239 s, although the pass
  was let go at t = 120 s and a caller arriving at t = 121 s has already started a fresh pass. A refresh-button tap
  (`refreshButton`) can wait almost twice `wait`. The doc comment (:489) says "no wait on a pass is longer than
  `wait`". That is true for each wait, but not for the wait the caller actually sees.
- **Fix:** Stamp the deadline when the pass starts (`inFlight` carries `until = now() + wait`). Every waiter waits
  until that instant, so all of them are released together when the pass is let go.

### L2 (Low): `within` ignores its caller's cancellation and never cancels the body it leaves behind

- **Where:** WidgetWriter.swift:295-305.
- **Failure:** `withCheckedContinuation` does not respond to cancellation, and both tasks are unstructured, so they
  do not inherit it. An intent the system cancels still sits out the full 15 s on each step. A body that would honour
  cancellation (a WidgetCenter or URLSession await) keeps running after the timeout as well, because nothing cancels
  it.
- **Fix:** Wrap the wait in `withTaskCancellationHandler(onCancel: { answer(nil) })`, with its own reason
  ("cancelled: <step>"). Keep the body's `Task` and call `cancel()` on it when the timer wins. A StoreKit call that
  ignores cancellation loses nothing by being cancelled.

### L3 (Low): the timed-out row is written outside a background-task assertion

- **Where:** WidgetWriter.swift:316-317 calls `notStarted` (:324-328). That goes to `RunLogRecorder.recordNotStarted`
  (Shared/RunLog/RunLogRecorder.swift:161-169), which takes `widgets/<id>/state.lock` and writes runs.jsonl and
  status.json in the App Group, with no `hold`.
- **Failure:** T-1140's rule is that App Group writes after a run happen inside the assertion (0xdead10cc, T-0737 L3).
  `notStarted` already broke that rule for "no script" and "not queued" (T-3393). This commit adds three more call
  sites, and they run at the riskiest moment: after a 15 s wait, in a background intent, close to the system's limit.
  If the app is suspended while it holds the flock, the system kills it. The window is milliseconds, so this is Low.
- **Fix:** Write the `timedOut` row inside `hold("pywidget.widget-run")`, and bound the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> with `within`, because
  the hold itself awaits the main actor.

### L4 (Low): gaps in the tests and the evidence

- **Where:** pywidget/ios/Tests/WidgetStepTimeoutTests.swift.
- **Gaps:**
  - (a) No test lets a body answer after the limit. `Hang` never releases, so the timer-first, late-body path in
    `answer` (`c` already nil) never runs. Add a `release()` to `Hang` that is called after the timeout. Assert one
    return value and no second resume.
  - (b) Every test runs one widget, which is why M2 does not show. Add the ten-widget test from M2.
  - (c) The `Hang` tasks stay suspended for the rest of the test process (the task frame keeps `Hang` alive). Release
    them in a teardown block.
  - (d) The cited logs exist, but outside the repository, in the personal worktree
    `[local folder]`:
    - the red run, `xcodebuild-20261109-095932.log`, where all six tests fail on the 5 s expectation;
    - `xcodebuild-20261109-101430.log`, 18/18;
    - `xcodebuild-20261109-102856.log`, 1531 tests, 3 skipped, 0 failures.
    The board line names `ops/runs/xcodebuild-20261109-102856.log`, and that path is not in main's checkout. Commit the
    three logs, or their summaries, with the fix.

### L5 (Low): time spent suspended counts as a hang

- **Where:** WidgetWriter.swift:302 (`Task.sleep(for:)`) and the pass wait (:528).
- **Failure:** `Task.sleep(for:)` sleeps on `.continuous` (Apple's sleep page), and ContinuousClock "does not stop
  incrementing while the system is asleep". Neither clock stops while this one app is suspended. Take a step in flight
  when iOS suspends the app at the end of a background intent. When the app resumes minutes later, its timer is
  overdue and the body is ready, and whichever task runs first wins. A step that never hung can then be written
  "timed out: <step>", and a pass that was suspended mid-run is let go.
- **Fix:** On a timeout, check whether the app went to the background during the wait (the bridge already tracks
  `inBackground`) and wait one more `limit` before giving up, or write "timed out while suspended" so the rows can tell
  the two cases apart.

## What I did not check

I made no Xcode run (another task holds Xcode) and no device run. The findings come from reading the code at
2efa9e46b and the four Apple pages above. I did not look at whether StoreKit's sequence really hangs on iOS 27.2. M1
and M2 hold whichever step hangs.
{% endraw %}

</div>
