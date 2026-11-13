---
layout: "default"
title: "Review of T-3899: free widgets draw when the store check hangs"
section: "documents"
description: "The fix does what T-3835 M1 asked. When StoreKit does not answer within stepLimit, the pass takes bundledGates (the shipped flag file, entitled: false) once. A widget those gates let draw runs. A widget they hold back\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3899-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t3899-pernille.md</code></span></div><h1>Review of T-3899: free widgets draw when the store check hangs</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4268, Commandment 13). Author: Idris. Reviewed: 6e0c3c505c, which landed on main as
fd35425b23 (the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> re-hashed it; `git diff 6e0c3c505c HEAD` is empty for both files it touched).
Gate: J-20261113-1043-land-m-4579a7, passed, 1744 executed, 2 skipped, 0 failures (xc_route status).
Date: 2026-11-13.

## Verdict: PASS with notes

The fix does what T-3835 M1 asked. When StoreKit does not answer within `stepLimit`, the pass takes
`bundledGates` (the shipped flag file, `entitled: false`) once. A widget those gates let draw runs. A widget they
hold back gets the `deferred` "timed out: Pro check" row and is never `locked`, and the next pass asks StoreKit
again because `PassSteps` is new each pass. The one finding that needs work is M1 (Idris's point b). It does not
block the fix: in the case it covers, the widget is not drawn yet but nothing is lost.

## What I checked

- `WidgetWriter.swift:387-399` (`proCheck`). StoreKit is read once a pass. On a timeout `gates` is set to the
  bundled gates and `gatesUnanswered` to true, so later ids do not wait again (the test checks `hang.callers == 1`).
  `return may || !pass.gatesUnanswered ? may : nil` parses as `(may || !unanswered) ? may : nil`, because `?:` binds
  loosest. Answered gates: `may` as before (false stays `locked`). Unanswered: true runs, false is nil (`deferred`).
  Correct.
- `WidgetWriter.swift:305`. A Pro premade's nil no longer sets `pass.hung`, so ids after it in the pass still run.
  The test's order `[own, pro, free]` puts the free premade after the deferred Pro one, so this path is covered.
- Closed state. If `pro-flags.json` cannot be read, `ProConfig.bundled()` is nil and `isPremadeLocked` holds back
  every premade (`ProFlags.swift:170`). On a hang, every premade is then deferred and own widgets run. That is the
  safe side.
- The test at `WidgetWriterTests.swift:393` uses the shipped flag file and the default `bundledGates`, so it runs
  the app's own path. I checked these mutants by reading the code (none were run): `entitled: true` in
  `bundledGates` would write the Pro premade's tree (asserted absent); returning `may` instead of nil would give
  `skipped("locked")` (asserted `timed out: Pro check`); dropping `gatesUnanswered` caching would ask StoreKit
  again (asserted once). Each would turn the test red.
- `testT3900TheProGatesAreReadOncePerPass` (`WidgetStepTimeoutTests.swift:248`) is still green on the new path.
  Its ten ids are unlisted premades (`t3900_N`), and unlisted means Pro, so the bundled gates defer them.

## Idris's two points

(a) **A test's own per-widget gate that times out still ends the whole pass: acceptable.** `mayWrite` is set
nowhere in `App/` or `Shared/`, only in `Tests/`. The shipping path never takes this branch
(`WidgetWriter.swift:388-392`). Keeping it means the T-3900 step-timeout tests that hang `mayWrite`
(`WidgetStepTimeoutTests.swift:97, 129, 196`) still test the row, the prune and the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. The doc comment at
`WidgetWriter.swift:383` says the seam differs from the app, which is enough. No change needed.

(b) **An offered-premades step that times out still skips free premades with no tree yet: not acceptable as it
stands.** Filed as M1 below.

## Findings

**M1 (Medium; needs work; line from T-4268, owner Idris). On a StoreKit hang, the offered list is empty, so
free premades that are not placed get no first tree.** `WidgetWriter.swift:143-144`: `offeredPremades()` reads
StoreKit itself (`ProEntitlement.gates()`, which also covers AppTransaction for the tester switch). It does not
use the pass's gates. On a hang, `step("offered premades")` (`:172`) waits 15 s and returns `[]`. So `passIDs`
pre-renders no unplaced premade, free ones included. A placed free premade still runs, because it comes from the
placed list. But a Countdown chosen later in Edit Widget, with the app closed, draws "No view for this size" until
a pass in which StoreKit answers. That is the T-3149 bug again, for this case. It also costs a second 15 s wait
before the first widget runs, and a second StoreKit read in the pass. So T-3900's "StoreKit is asked once a pass"
does not hold for `refreshPlaced`.
Fix: on a timeout, the offered list should be what `bundledGates` offers
(`WidgetChoices.premades(gates: bundledGates(), titles: [:], includeLocked: false)`, the free premades). Better:
read the gates once before the pass and use them for both the offered list and `proCheck`. That removes the second
read and the second wait.
Test: `refreshPlaced` with a `proGates` that never answers and nothing placed. The free premade with no tree gets
its tree, a Pro premade gets none, and StoreKit is asked once.

**L1 (Low; optional). An own widget still waits on StoreKit.** `WidgetWriter.swift:393-396`: the first id of a
pass reads the gates even when it is not a premade, and `mayDraw` returns true for such an id without looking at
them (`ProEntitlement.swift:85-88`). With StoreKit hung, a pass of own widgets only, or an editor save
(`refresh(_ id:)`, a pass of its own), waits 15 s for an answer it does not use. Suggestion: return true for a
non-premade id before reading the gates.

**L2 (Low; optional). One test's doc comment is now wrong.** `WidgetStepTimeoutTests.swift:246-247` still says "a
read that never answers ends the pass as above". It no longer does. The ten ids are deferred one by one, because
the bundled gates hold back unlisted premades. Suggested wording: "...and a read that never answers is waited
once; the bundled gates then defer these unlisted (Pro) premades."

**L3 (Low; nit). The return relies on operator precedence.** At `WidgetWriter.swift:398`, the line is correct, but
a reader has to know that `?:` binds looser than `||`. Parentheses, or an `if`, would make it plain.

## Not run

I made no new test run. Nothing changed in these files after the gate (above), and that job's result is the
evidence. The mutants above are reasoning only; none were run.
{% endraw %}

</div>
