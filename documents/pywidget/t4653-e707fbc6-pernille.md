---
layout: "default"
title: "Review of T-4653 at e707fbc6: a Shortcut&#x27;s Pro check asks the bundled gates first and bounds StoreKit"
section: "documents"
description: "The change does what M1 asked, and I found no way for it to grant Pro wrongly or to hang."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4653-e707fbc6-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4653-e707fbc6-pernille.md</code></span></div><h1>Review of T-4653 at e707fbc6: a Shortcut's Pro check asks the bundled gates first and bounds StoreKit</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4789, Commandment 13). Author: Idris. Reviewed: e707fbc622 (ios/App/Intents/RunScriptIntents.swift,
ios/Tests/ShortcutProGateTests.swift, ios/Tests/mutants-t2316.json, docs/how-it-works/purchases.md). Also read, for what
the change stands on: ios/App/Bridge/WidgetWriter.swift:82-87 (defaultStepLimit, 15 s) and 405-447 (`within`, the
writer's own bounded Pro check and bundledGates), ios/Shared/ProFlags.swift:123-188 (ProGates.isPremadeLocked),
ios/Shared/ProEntitlement.swift:50-80 (gates, current), ios/Shared/Bridge/BridgeLimits.swift:12 and
docs/design/bridge-contract.md:393 (S4, the Shortcut budget), and my own review of T-2316
(docs/reviews/t2316-744d96d1-pernille.md, M1 is what this change answers). Paths are under pywidget/. Line numbers are
at HEAD 49ba6bff8c; the four files' T-4653 content is unchanged there (purchases.md has gained other sections only).
Date: 2026-11-18.

## Verdict: PASS with findings

The change does what M1 asked, and I found no way for it to grant Pro wrongly or to hang.

- **No wrong grant.** `premadeMayRun` (RunScriptIntents.swift:122-129) returns early only when the bundled gates with
  `entitled: false` say the premade is not locked. `isPremadeLocked` is `premades.on && !free && !unlocked`
  (ProFlags.swift:163-172), and `entitled: false` makes `unlocked` false, so "not locked without Pro" implies "not
  locked with Pro": the early return can only let through what StoreKit would let through. In the product both reads
  use the same bundled flag file (`ProConfig.bundled()` at :108 and inside `ProEntitlement.gates()` at :112). The
  closed state (config nil) stops at :126 as `.proPremade` without a StoreKit read, as before. A file that names no
  product but turns a Pro row on is itself read as the closed state (ProFlags.swift:83), so "nothing for sale" never
  reaches :127 either. Every other path ends in `throw`, and `source` calls it before Python starts (:144, :177).
- **No hang.** The only unbounded await, `Transaction.currentEntitlements` (and the tester switch) inside
  `ProEntitlement.gates()`, now runs inside `WidgetWriter.within(limit, ...)` (:127). `within` resumes its continuation
  from a timer task as well as the body (WidgetWriter.swift:408-417), so the caller returns by `limit` even when the
  body ignores cancellation; the body is left behind, as on the widget path. The default limit is the writer's
  `defaultStepLimit` (:114), pinned by `testTheLimitIsTheWidgetWritersStepLimit`.
- **The right words.** No answer in time is `.proUnchecked` (:79, :91), never `.proPremade`, so a buyer is not told
  the purchase is gone. The new string is in the price and sales-word scan (ShortcutProGateTests.swift:233-240) and is
  marked DRAFT for Maren and Wrenna (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>).
- **The tests catch the mutants.** I ran the open one; it is killed (Run, below). By reading, the other three new
  mutants are each pinned by a named assertion: `unchecked-said-pro` by :186-187 (expects `.proUnchecked`),
  `bundled-not-first` by the ask count at :212, `second-limit` by :197. Idris's run recorded those three and the four
  older ones as killed (log/events.jsonl, 2026-11-17 3:19 PM); I did not rerun them.
- **purchases.md** matches the code for the two cases it describes, and its box fingerprint is current
  (`tools/site/how_it_works.py`: premadeMayRun, checked ef55c71f63c6, now ef55c71f63c6, ok). It leaves out the one case
  where nothing is asked at all, the closed state (L3).

What is left is time accounting around the new wait, not the gate (L1, L2), and one missing sentence in the page (L3).
None of these blocks TestFlight.

## Findings

High: none. Medium: none.

### L1. The Pro check's wait is not counted against the Shortcut's 20 s budget (T-4893)

- Where: `ios/App/Intents/RunScriptIntents.swift:114` (limit 15 s) and `:127` (the wait), then `:182`
  (`budget = BridgeLimits.shortcutBudgetSeconds`, 20 s, unchanged); the rule is `docs/design/bridge-contract.md:393` (S4).
- The failure: S4 set the Shortcut budget to 20 s so that a stuck verdict (budget plus the 5.0 s deadline) lands about
  5 s before the 30 s intent limit, with that margin for a cold launch. T-4653 puts up to 15 s of StoreKit wait in
  front of the budget, for every Pro premade. If StoreKit answers "Pro" after more than about 5 s and the premade then
  runs long, Shortcuts ends the intent at its own limit before our `timedOut` or `stuck` can be said. The person gets
  the system's error. The run is stopped by the cancel handler (:218-219), so nothing runs on.
- Why Low: it needs a slow StoreKit answer and a long premade together, and before T-4653 the same wait had no bound
  at all. It is a recorded rule no longer holding, so it should be fixed, not left to chance. My M1 asked for the
  writer's step limit without checking it against S4; that part is my miss.
- Fix: count the time spent before the run against the budget. Start a clock at the top of `run`; after `source` and
  Python's start, pass `budgetS = max(1, shortcutBudgetSeconds - elapsed)` (or shorten the Shortcut's own Pro limit so
  limit + budget + deadline stays under 30 s), and make `timedOut` say the number actually given. Test: a 300 ms
  StoreKit stand-in answering "entitled" leaves a queued request whose `budgetS` is below 20.

### L2. A Shortcut cancelled during the wait still starts Python (T-4893)

- Where: `ios/App/Intents/RunScriptIntents.swift:127` (`within` runs body and timer in unstructured tasks, so the
  intent's cancel does not end the wait) then `:177-187` (Python's start and `bridge.run`, with no cancellation check
  between them).
- The failure: when Shortcuts cancels the intent while StoreKit is slow, `premadeMayRun` still waits up to the full
  15 s, and if the answer is "Pro" the app starts Python, runs the launch pass and queues the premade, which the cancel
  handler then stops at once and logs as cancelled. That is a cold Python start and a run row for an intent that
  had already ended. It was the same before T-4653 (the unbounded read did not see the cancel either); the bound now
  makes the wait long enough to be worth a check.
- Fix: `if Task.isCancelled { throw CancellationError() }` right after `source(...)` (:177), before Python starts, and a
  test that cancels the intent's task during a 2 s StoreKit stand-in and finds no run started.

### L3. purchases.md says a free premade always runs, and leaves out the closed state (T-4894)

- Where: `docs/how-it-works/purchases.md:81` ("A free one runs at once, without asking the App Store. When the file
  holds the script back for Pro, the app asks the App Store").
- The failure: in the closed state (a flag file that cannot be trusted) every premade, free ones included, stops with
  "This script is part of Pro." without asking the App Store (RunScriptIntents.swift:126, ProFlags.swift:170). The
  page says nothing of it. It is the page the Investors read
  to know what the app does.
- Fix: one sentence for that case, written after T-4654 lands (it changes what the closed state says), and the
  box's fingerprint refreshed.

## Observations (no line)

- O1. `RunScriptIntents.swift:126` (locked even with Pro: throw without asking) has no test that it skips StoreKit. A
  mutant that deletes it would survive (by reading; not run). In the product it changes nothing: :126 fires only in
  the closed state, where `ProEntitlement.gates()` makes no StoreKit read and asks no tester switch (productID nil,
  ProEntitlement.swift:53, 72), so the answer is the same and immediate. I leave it.
- O2. `testStoreKitThatNeverAnswersEndsInUncheckedWithinTheLimit` does not use a provider that never answers: it
  answers "entitled" after 20 s. That is the right choice. With the bound dropped the test fails in 21 s instead of
  hanging the test runner, which may be what made the first `bound-dropped` run on 11-17 look hung. Its upper bound
  (limit + 8 s) leaves room under load.
- O3. The production `.app` path (bundled flag file plus real StoreKit) still has no test with no override; that is
  T-4654's L2 item, still open.

## Run

Scratch copy of main at 7c8421369b (`tools/scratch.py worktree T-4789`; the four files identical to e707fbc622),
local Simulator iPhone 17e (FCC3968B, iOS 27.0), XC_LOCAL=1, XC_TASK=T-4789. Logs are in the scratch copy's
ops/runs/ and go with it.

- Baseline, `-only-testing:PyWidgetTests/ShortcutProGateTests`: `xc.sh: tests: 10 executed, 0 skipped, 0 failures`,
  exit 0 (xcodebuild-20261118-073336.log). The two bounded tests took 0.516 s and 0.429 s.
- Mutant, `tools/xc_mutants.py` with only `bound-dropped` from mutants-t2316.json:
  `KILLED   bound-dropped  (4 failure lines)`, exit 0 (xcodebuild-20261118-073651.log). Only
  `testStoreKitThatNeverAnswersEndsInUncheckedWithinTheLimit` failed, in 20.849 s, on three assertions: the premade
  ran ("a premade ran while StoreKit had not answered"), a run started, and the wait was 20.03 s against the 8.5 s
  ceiling. The other nine passed. The source file was restored (scratch `git diff` empty).
- Not run: the full unit target, the other seven mutants.

Two earlier tries got no result and gave no verdict. One named a Simulator by a name whose latest runtime has no such
device (exit 70). The second ran in a scratch copy that disappeared from disk while it ran (exit 65 with no log). It
was made again, and the result above comes from that copy. The first copy, made 11-17 10:32 PM under this task, still held
a hand-planted `bound-dropped` edit from an earlier session when I found it; I put the file back before any run.
{% endraw %}

</div>
