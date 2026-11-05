---
layout: "default"
title: "T-2583 re-review (T-2585): prompt placement, cc5c7c277"
section: "documents"
description: "Fix first (F1, F2), before T-0447 lands. The desk side is right and well tested. The presenter still has a gap: the one UIKit behaviour the commit itself found (a present queued behind a transition, landing later) is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2583-pernille-r2.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2583-pernille-r2.md</code></span></div><h1>T-2583 re-review (T-2585): prompt placement, cc5c7c277</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (C13): I read the commit, PromptDesk.swift and both test files on
main, bridge-contract.md rule 6, and Idris's evidence (pywidget/ios/bench/t2583-prompt-placement.txt), not the
author's reasoning. Earlier findings: pywidget/docs/reviews/t2576-pernille.md.

## Verdict

**Fix first (F1, F2), before T-0447 lands.** The desk side is right and well tested. The presenter still has a gap:
the one UIKit behaviour the commit itself found (a present queued behind a transition, landing later) is not handled
when the prompt is withdrawn, or when placement gives up, before it lands.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict, scrolls sideways" style="--tw:631px" markdown="1">

| T-2576 finding | Now |
|---|---|
| F1 (placement not checked) | Fixed for the desk: `.presented` only on `placed(true)`, refusal at once on `placed(false)`, timer from the call, busy while placing. New gap at the presenter (F1, F2 below). |
| F2 (tests that could not fail) | Fixed: busy, no-window, dropped placement, run end and timeout while placing (fake presenter); the run-end observer test was red with the observer loop deleted (evidence run 2). |
| F3 (calls stamped with the global run id) | Still open, not in scope; rule 3 still says "the run on the script thread". |

</div>


Contract rule 6 matches the code: one retry after the transition, refusal sent as soon as placement fails, the slot
held from the take, presented only once UIKit has it, timeout from the call.

## Findings

**F1 (Medium, fix first). A queued alert that lands after it was withdrawn stays on screen with nobody asking.**
pywidget/ios/App/Device/PromptDesk.swift:305 (`dismiss()`), :278, :287. Run 4 of the evidence shows UIKit queues a present behind a transition:
`presentingViewController` is nil right after `present` and set later. If the prompt is withdrawn in that window
(Stop, the script ending, a short timeout; the desk calls `dismiss()`), `dismiss()` finds `isBeingPresented` false
and `presentingViewController` nil, so it does nothing, and sets `alert = nil`. The waiting Task then sees
`alert !== a` and reports `placed(false)`, which the desk rightly ignores. Then UIKit lands the queued present: an alert
for a run that has ended, which rules 1 and 2 say never happens. A tap only closes it. The same happens after
`give(up:)` when the queued present was slower than the settle window: Python has already got "no window open" and the
alert still turns up. Fix: present a small `UIAlertController` subclass with a `withdrawn` flag; `dismiss()` and
`give(up:)` set it when the alert has not landed, and its `viewDidAppear` dismisses itself (no animation) when it is
set. Test (real UIKit, as in PromptPlacementTests): a sheet presented animated, `take`, then `runEnded` at once; after 2 s
no `UIAlertController` is anywhere in the root's presented chain.

**F2 (Medium, fix first; needs one Simulator run to confirm). The retry can present the same controller twice.**
pywidget/ios/App/Device/PromptDesk.swift:283, with the quiet test at :300. The retry runs when `presentingViewController` is still nil after
`settled` returns. `settled` returns after 4 quiet samples (about 120 ms) read from `top(in:)`, or at 800 ms. A queued
present that has not landed by then is presented again. UIKit raises NSInvalidArgumentException ("tried to present
modally a view controller that is already being presented") for a controller that is already being presented; whether
a queued, not-yet-started present counts is what the Simulator has to show. If it does, this is a crash. If it does
not, the second present is queued too and F1 happens. Fix: do not re-present the same instance. Either retry only when
`a.isBeingPresented` is false and no transition coordinator is live anywhere in the chain, or (better) drop the <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span>
retry and present from the live transition's `transitionCoordinator` completion (`animate(alongsideTransition:nil)`),
giving up only when there is nothing to wait on.

**F3 (Low, with F1). No test covers the queued path's endings.** The two sheet tests check only that the alert gets
there. Neither ends the run or times out while the present is queued, so F1 and F2 both stay green. The F1 test above
covers it.

## Checked and fine

- `placed(_:_:)` matches by token and ignores a second word; a late `placed(false)` from an earlier prompt cannot refuse a
  later one. The ok-false path cancels the timer and frees the desk before replying.
- `take` sets `shown` before calling the presenter, so a synchronous `placed` finds it. The re-check after placing
  closes the prompt when the run ended during the transition wait.
- `showing` hides a prompt still being placed, so nothing reads it as on screen early.
- The run-end observer is now covered by a real-bridge test with no Stop (script returns with a thread's prompt up).

## Runs

- Full suite, MacBook runner, J-20261105-0529-xc-test at 65a235126 (main at the time, carries cc5c7c277): **no verdict.**
  It built, then the Simulator would not start the test runner (testmanagerd socket missing), exit 65, 0 tests ran.
  Runner fault, not a test failure. Needs requeueing.
- PromptDesk mutants: spec pywidget/ios/bench/t2585-mutants.json (8 mutants, PromptDeskTests + PromptPlacementTests) in
  a clean export of cc5c7c277, local slot. **No verdict.** M1 timed out behind another <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s Xcode lock, so its "hang
  counts as noticed" is not a <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. I stopped the run there to stay within budget. What I expect, from reading the
  tests: M2 to M7 are killed. M8 (the old F1 code) is expected to survive, because the evidence says the Simulator never
  dropped a present. That is the stated limit of the real-UIKit tests, not a new gap.
{% endraw %}

</div>
