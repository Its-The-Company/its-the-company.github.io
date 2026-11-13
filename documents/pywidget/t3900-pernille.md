---
layout: "default"
title: "T-4238: review of T-3900 (Idris, 8624ba85ad): wait once per pass when a shared step hangs"
section: "documents"
description: "Verdict: PASS with notes. M2 is fixed where it hurt. A hung shared step (Pro check, Python start, launch log) is now waited once a pass, and every widget left in the pass gets its deferred row at once. The Pro gates are\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3900-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t3900-pernille.md</code></span></div><h1>T-4238: review of T-3900 (Idris, 8624ba85ad): wait once per pass when a shared step hangs</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12. Independent review (Commandment 13). I read the code only. I changed no code and
started no Xcode run. Read at 8624ba85ad (on main): `pywidget/ios/App/Bridge/WidgetWriter.swift`,
`pywidget/ios/Tests/WidgetStepTimeoutTests.swift`, and what they call: `PyBridge.start`, `enqueueBackground`,
`makeBusyTimer`, `expireQueued`, the stop <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>, the budget timer and `runPending` (with a2237bff00, T-4229);
`RunResultSink.collect`; `ProEntitlement.gates`; `mayWriteTimeline`; `BridgeLimits`. Line numbers are at 8624ba85ad.
I checked it against my review of T-3826, [`pywidget/docs/reviews/t3826-pernille.md`](t3826-pernille.html), M2 and L1.

**Verdict: PASS with notes.** M2 is fixed where it hurt. A hung shared step (Pro check, Python start, launch log) is
now waited once a pass, and every widget left in the pass gets its `deferred` row at once. The Pro gates are read once
inside a pass. The pass limit restarts on each widget's outcome, and every waiter counts from the pass, so L1 is fixed
too. I found no High or Medium finding. The five Lows below are a second StoreKit read the commit says is gone, a
slow-but-healthy start that now defers the whole pass, a let-go pass that can still write, a limit derived from the
wrong ceiling, and two claims with no test. None blocks the next TestFlight build. No finding is held.

## The claims, checked

1. **A hung shared step ends the pass at once: holds.** `pass.hung` is set at :301, :316 and :324. Every later id
   returns its `deferred` row at :297 before it waits on anything. The appRunPending check at :248 still runs first,
   so a console run's stand-down (T-0690) beats the deferred shortcut. A prune that hangs does not set `hung`. It
   costs one `stepLimit` once a pass, which is right: the launch log step then decides.
2. **The Pro gates and the prune are asked once per refresh: holds inside the pass, not per refresh.** `proCheck`
   (:380-385) reads `proGates` once and hands it to every id's `mayDraw`. That matches `mayWriteTimeline`
   (WidgetPlacement.swift:17), which is `gates(bundle: .main).mayDraw`. The prune runs on the first id that does not
   stand down (:292-295). `refreshPlaced` still makes a second StoreKit read before the pass (L1).
3. **The limit is 82 s from one widget's steps and restarts per widget: holds, with a mislabelled derivation (L4).**
   `PassClock.progressed()` runs after every id, stand-downs included (:253). `ended` (:629-643) counts from
   `clock.last`, not from its own arrival.
4. **Evidence: holds.** J-20261112-2244-land-m-0061d2 is red on the old code: 3 tests, the Pro check pass took 3.16 s
   against 0.6 s. Its Python test failed for the wrong reason (premade ids, so "no script" before Python's start).
   The commit says so and corrected the test. J-20261112-2308-land-m2-07b96a is red with the corrected tests: Pro
   check 3.19 s, Python start 3.19 s, and the slow pass returned `[:]`. J-20261112-2258-land-m2-5857de is green:
   1705 executed, 0 failures, 2 skipped. The gate's land note says J-...-2258 "passed this content
   (c17cf66b5be0)", so the green run had the corrected tests even though it ran before the 2308 red run.

## What I looked for and did not find

- **Overlapping passes cut short while healthy.** A widget's bounded worst case is the prune (first id only), the Pro
  check, Python's start and the launch log at 15 s each. Then the run: its queue wait counts against its 5 s budget
  (PyBridge.swift busy timer and doRun's `budget - waited`), the budget timer stops it, and the ladder marks it stuck
  5 s after that (PyBridge.swift:702). That is about 70 s plus the sink's hold, under 82 s. A healthy pass is no
  longer let go mid-work. I checked the console-run case too. A console Run tapped during a widget's steps puts the
  widget's run behind it. The busy timer ends that run `busy` after 5 s, so it cannot run past the limit.
- **Interaction with a2237bff00 (T-4229).** None new. `runPending` now sees a run between dequeue and start, and
  `refresh(_ ids:)` reads it before every id (:248), ahead of the `hung` shortcut. The window between that check and
  `enqueue` (up to the three 15 s steps) is older than both commits. The busy timer bounds it, as above.
- **Task-local leaks between passes.** Each pass has its own `PassClock` (:618-619). The tasks `within` leaves behind
  inherit the clock of the pass that made them, so a let-go pass can only move its own clock.
- **Release.** Nothing new is DEBUG-only. `PassClock` uses `OSAllocatedUnfairLock` and `@TaskLocal`, both already in
  use in this file. `WidgetPasses.wait` is a static computed from shipped constants. The behaviour is the same in a
  Release `-O` build. A run would confirm it, but nothing here needs one.
- **Stale gates within a pass.** The gates are read at the pass's first id and used for the rest, at most about a
  minute. A refund in that minute still stops writes from the next pass on. The contract asks for that, not more.

## Findings

### L1 (Low): `refreshPlaced` still reads the Pro gates twice, and a hung StoreKit costs two step limits a refresh

- **Where:** WidgetWriter.swift:169 (`offered` step, which calls `offeredPremades` at :140-142, another
  `ProEntitlement.gates()`), then :384 (the pass's own read). The doc comment at :51-53 says "a pass makes one
  StoreKit read".
- **Failure:** The scene-active pass and the Refresh Widgets intent both go through `refreshPlaced`. With StoreKit
  hung, the offered step waits 15 s and returns `[]`. The pass then waits a second 15 s on its own gates read. That
  leaves two StoreKit reads behind per refresh, not one, and the intent spends 30 s (45 s with a hung prune) before
  it writes its first row in a background window we have not measured. M2's fix asked for this ("That also halves
  the StoreKit reads, because the offered step reads the same gates"). The cost no longer grows with N, which is why
  this is Low.
- **Why the test misses it:** `testT3900TheProGatesAreReadOncePerPass` (Tests:248) uses the `writer` helper, which
  sets `w.offered = { [] }` (Tests:43). The second read never runs, so "one StoreKit read for the pass" is counted on
  `proGates` alone.
- **Fix:** Read the gates once in `refreshPlaced` and use them for both `offeredPremades(gates:)` and the pass. Or
  seed `PassSteps.hung = "Pro check"` when the offered step timed out. Test: count the `proGates` calls through
  `refreshPlaced` with `offered` using the default path.

### L2 (Low): a slow but healthy Python start or Pro check now defers the whole pass, not one widget

- **Where:** WidgetWriter.swift:297 with :314-317 (Python start) and :300-302 (Pro check).
- **Failure:** `PyBridge.start` (PyBridge.swift:542-555) adds a second caller to `startWaiters` while a start is in
  flight. Before T-3900, if a start took 16 s, widget 1 got a deferred row at 15 s and widget 2 ran at 16 s. Now
  widgets 2 to N all get `deferred` without asking, although Python is up. That pass still sets `last` (:622), so an
  unforced pass is spaced 30 s after it and the Home Screen stays stale until then. A StoreKit answer at 16 s is also
  thrown away for the rest of the pass. I do not have a measured cold start on a device, so I cannot say how often a
  start passes 15 s. The step limit was chosen to be generous, so this should be rare.
- **Fix:** Before the `hung` shortcut, look again without waiting. For Python start, ask the bridge whether it has
  a start result (a non-blocking read of `startResult`). For the Pro check, keep the left-behind step's task and use
  its value if it has answered since. Clear `hung` when it has.

### L3 (Low): a let-go pass is not cancelled and can still write rows after the next pass starts

- **Where:** WidgetWriter.swift:629-643 (`ended` lets go but never cancels `task`), :247-254 (the loop checks no
  cancellation), :636.
- **Failure:** Healthy passes are no longer let go, so this needs a step that is not bounded to hang. Two can: a
  `collect` (RunResultSink.swift:73) whose `finished` record never comes, and the sink's hold. If that step later
  returns, the old pass writes the rest of its rows and queues the rest of its runs beside the new pass, with the
  gates it read before. Runs coalesce in the bridge queue and `RunClaims` keeps one row per run id, so the damage is
  duplicate `deferred` rows and wasted runs, not two writers on one tree. Also, a let-go is not recorded anywhere. A
  waiter whose `within` fires just after the old pass progresses again recomputes `left > 0` (:632) and keeps waiting
  on the pass that was let go, while a new pass is in flight.
- **Fix:** On let-go, `task.cancel()`, and have `refresh(_ ids:)` end at the top of the loop when `Task.isCancelled`.
  Leave the remaining ids without a row; the next pass runs them. In `ended`, break once `inFlight?.task != task`.

### L4 (Low): the 82 s is derived from the wrong run ceiling

- **Where:** WidgetWriter.swift:589-593.
- **Failure:** The comment says the run's ceiling is "its budget and the hard stop" (5 + 2 s). A widget run is
  bounded by its budget, 5 s including its queue wait, and then by the stuck mark 5 s after the budget stop begins
  (PyBridge.swift:702, `stopDeadlineSeconds`). That is 10 s, not 7 s. The hard stop at 2 s comes inside those 5 s.
  The fifth `stepLimit` is said to cover "the sink's write in its <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>", but the hold is not bounded by `stepLimit`.
  The real worst case, about 70 s plus the hold, still fits under 82 s, so nothing breaks today. The next person to
  shorten `stepLimit` or lengthen the budget will trust a sum that is wrong.
- **Fix:** Derive it from the widget budget (`budgetS` at :333) plus `stopDeadlineSeconds`, and say plainly that the
  hold is unbounded and the fifth slot is its margin. Add a static test that `WidgetPasses.wait` is at least
  4 x `stepLimit` + budget + `stopDeadlineSeconds`.

### L5 (Low): two of the commit's claims have no test

- **Where:** Tests/WidgetStepTimeoutTests.swift:274-287 and :289-302.
- **Gap:** The claim that every waiter counts from the pass, not its own arrival (t3826 L1), is not tested.
  `testAPassThatNeverEndsIsLetGoAndTheNextPassesRun` joins at almost the moment the pass starts, so it would pass
  under either rule. A pass that makes progress and then hangs is also not tested. That is the case where `ended`'s
  loop (:631-634) has to re-wait and then let go.
- **Fix:** (a) Start a hung pass and join it at 200 ms with `wait` 300 ms. Assert that the joiner returns by about
  300 ms, not 500 ms. (b) Run two ids where the first answers at once and the second hangs. Assert that the pass is
  let go about `wait` after the first outcome.

## Held

None. Nothing in this commit describes an exploitable weakness.

## Fix lines

None added. There is no High or Medium finding. The Lows are for Idris to take or decline in a recorded decision.
{% endraw %}

</div>
