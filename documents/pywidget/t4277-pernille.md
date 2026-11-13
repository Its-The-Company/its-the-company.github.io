---
layout: "default"
title: "Review of T-4277: the pass reads the Pro gates once"
section: "documents"
description: "The fix does what my T-3899 M1 asked. refreshPlaced reads the gates once, before the pass (WidgetWriter.swift:178, through gates(_:) at :415). On a StoreKit hang it waits stepLimit once, takes bundledGates with\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4277-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/reviews/t4277-pernille.md</code></span></div><h1>Review of T-4277: the pass reads the Pro gates once</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4300, Commandment 13). Author: Idris. Reviewed: 0fdaa5ab96 (WidgetWriter.swift and five
test files). `git diff 0fdaa5ab96 ddb4e1c7c5` is empty for every file it touched and for Shared/ProEntitlement.swift
and Shared/ProFlags.swift, so the line numbers below hold on main at ddb4e1c7c5.
Gate: J-20261113-1238-land-m-27f5ae, passed, 1748 executed, 2 skipped, 0 failures (xc_route status; the log is on
the runner and I did not read it). Date: 2026-11-13.

## Verdict: PASS with notes

The fix does what my T-3899 M1 asked. `refreshPlaced` reads the gates once, before the pass (`WidgetWriter.swift:178`,
through `gates(_:)` at `:415`). On a StoreKit hang it waits `stepLimit` once, takes `bundledGates` with
`entitled: false`, and the offered list is the free <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>. So an unplaced free premade still gets its first tree,
and the same read decides each id's check. The second 15 s wait is gone. On a hang the Refresh Widgets intent
(`refreshIntent`, `:189`) used to wait 30 s and now waits 15 s. L1, L2 and L3 from t3899 are done as suggested.
No Pro premade can run or draw without Pro because of this change. Two findings need small work (L1, L3 below).
Neither blocks TestFlight.

## What I checked

1. **"Own widgets no longer wait": can a Pro-only feature get through without Pro? No.** The early return at
   `:406` (`guard id.hasPrefix(WidgetID.premadePrefix) else { return true }`) is the first line of
   `ProGates.mayDraw` (`Shared/ProEntitlement.swift:85-86`). For every id, the answer is the one the gates would
   have given. The only other Pro gates are `themeState` (the editor only) and `isPackageLocked`. Outside tests,
   `isPackageLocked` has no caller yet: the importer gate is "ADR-003, later" (`Shared/ProFlags.swift:20`). The
   extension also never trusts the writer. It decides each draw from its own StoreKit read
   (`Widget/PyWidget.swift:28`, `TreeDrawable.decide(... gates: await ProEntitlement.gates())`), so a tree the app
   writes cannot unlock a Pro premade. See L2 for the case where this stops being true.

2. **A gate read once per pass, going stale over a long pass.** Inside one pass, nothing changed. T-3900 already
   kept the gates in `PassSteps` for the whole pass, and every pass starts from a new read. A purchase made while
   a pass is running leaves that pass with the old answer, as before. The next pass reads again. What is new is
   *when* the read happens. Before, the per-id check read the gates lazily, at the first premade, after
   `WidgetPasses.pass` had started the run. Now the read happens before `passes.pass`, and `passes.pass` can wait
   behind another pass that has different ids (`:649-651`). That wait can last as long as the whole other pass.
   Filed as L1.

3. **A purchase made mid-pass.** When the purchase lands while pass A is running, the next activation reads
   gates that now grant Pro. Its offered list then includes the newly unlocked Pro premades that have no tree, so
   its ids differ from A's. It waits for A, then runs with fresh gates. The case that goes wrong is the queued
   pass in L1.

4. **Do the test writers' proGates stubs hide the live StoreKit path? No.** `BridgeTests.writer`
   (`WidgetWriterTests.swift:29-34`) now sets bundled gates without Pro, and `WidgetStepTimeoutTests.writer`
   (`:44-45`) sets `config: nil`. Neither leaves `refreshPlaced` calling live StoreKit by accident. The product's
   own path is still covered: `FirstOpenPassTests.swift:57-59` builds a `WidgetWriter` with every default (live
   `proGates`, the product's `offered`, `mayWrite` nil) and runs `refreshPlaced`, and `:87` calls
   `offeredPremades(gates: await ProEntitlement.gates())`. I also checked every other `refreshPlaced` and
   `refreshIntent` call in Tests/. Each one goes through one of the two stubbed writers, or overrides
   `offered` and `mayWrite` itself.

5. **The new test.** `testT4277TheOfferedPremadesComeFromThePassesOneStoreKitRead` checks both directions. On a
   hang: one read, Countdown written and read back, Clocks neither offered nor written. With StoreKit answering
   Pro: one read, and both premades written. Idris's commit says it was red on 952958e1e1 and green after. I did
   not run it red myself. It reads the shipping pro-flags.json, so it will fail loudly (not pass silently) if
   Countdown or Clocks changes tier.

## Findings

**L1 (Low; needs work; line from T-4300, owner Idris). The per-id gates can now be stale by a whole other
pass.** `WidgetWriter.swift:176-180`: `read` is taken before `passes.pass(ids, ...)`. That call waits for any pass
in flight (`:649`), and only then starts the run that uses `read`. Suppose pass B is asked for while pass A
(different ids) is running, and the person buys Pro during that wait. B then runs every placed Pro premade as
`.skipped("locked")` and writes no tree for any of them. Usually the post-purchase activation C has different ids
(new offered Pro premades with no tree), so it runs after B with fresh gates and the end state is correct, just
late. If C's ids equal B's (every Pro premade already placed or already rendered), C finds B in flight and takes
B's stale outcomes through `join` (`:651`). After that, `spacing` skips unforced passes for 30 s. A refund during
the wait goes the other way: B runs and writes a Pro premade once after Pro has gone. That is harmless for drawing
(point 1), but it is a Python run the person no longer pays for. Before this change, the per-id read came after
the wait. Suggestion: use `read` for the run only when the pass started without waiting. WidgetPasses knows this,
and could hand a flag to `run` or start the closure with the instant it began. Otherwise, start the run from a new
`PassSteps()`. Keep the hung case as it is (`gatesUnanswered`, no second wait); that is where M1's saving lives.
Test: a pass queued behind a held pass, with `proGates` flipping to `entitled: true` during the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. The queued
pass should write the Pro premade.

**L2 (Low; optional, no line). The early return restates `mayDraw`'s rule.** `:406` and
`ProEntitlement.swift:86` are two copies of "only premades are gated". This is correct today. When the ADR-003
package gate lands, an own widget that imports a Pro native package will be gated by something other than the
premade prefix. The early return will then skip the read silently, and `pass.gates` will be nil for a pass of own
widgets only. A shared predicate (for example a static `ProGates.isGated(widgetID:)` used by both) would make the
next person change both together.

**L3 (Low; needs a test; line from T-4300, owner Idris). No test pins t3899 L1.** Every hung-gates test passes
premade ids (`WidgetStepTimeoutTests.ten` at `:173` is `pywidget.premade.t3900_*`). Remove the early return at
`:406` and the suite stays green. An editor save of an own widget then waits 15 s on a hung StoreKit again. Suggested test:
`scriptSaved` (or `refresh(_ id:)`) for a non-premade id, with `mayWrite = nil` and a `proGates` that never
answers. It should return within `stepLimit` with `hang.callers == 0`.

**L4 (Low; nit, no line). An older doc comment names the wrong product gate.** `FirstOpenPassTests.swift:7-8`
says these tests keep "`mayWrite` (ProEntitlement.mayWriteTimeline)". The app's writer has `mayWrite` nil and uses
`proGates` through `proCheck`; `mayWriteTimeline` is the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s hook (`Shared/ExtensionLane.swift:214`).
This predates T-4277, which edited the line next to it.

## Not run

I ran no tests. The land job's numbers above are from `xc_route status`. Everything in this review comes from
reading the code at 0fdaa5ab96 and ddb4e1c7c5. The stale read in L1 is reasoned from `WidgetPasses.pass`. I did
not reproduce it.
{% endraw %}

</div>
