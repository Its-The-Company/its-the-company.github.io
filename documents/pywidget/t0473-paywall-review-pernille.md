---
layout: "default"
title: "Review: T-0473 Pro paywall (commit 307297b1), T-0475"
section: "documents"
description: "Not ready for TestFlight until the three Medium findings are fixed. The core rule is right. Only a verified transaction for the flag file&#x27;s product grants Pro, and only while it is in currentEntitlements with no\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0473-paywall-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/t0473-paywall-review-pernille.md</code></span></div><h1>Review: T-0473 Pro paywall (commit 307297b1), T-0475</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-27. Author: Idris. Read-only review of the diff and the files it touches
(Commandment 13: code only, not the author's notes). Nothing was built; `scripts/export_pro_strings.py --check`
was run on the host and passed (53 strings match PRO_STR).

Scope: `Shared/ProFlags.swift`, `Shared/ProEntitlement.swift`, `App/Store/ProPaywallView.swift`,
`App/Store/ProStore.swift` (as changed), `Widget/PyWidget.swift` (TreeProvider), `scripts/export_pro_strings.py`,
and the tests that came with them. Paths below are under `pywidget/ios/`.

## Verdict

Not ready for TestFlight until the three Medium findings are fixed. The core rule is right. Only a verified
transaction for the flag file's product grants Pro, and only while it is in `currentEntitlements` with no
revocation. Verified transactions are finished. `Transaction.updates` is observed from launch, and
`Transaction.unfinished` is drained. The extension reads StoreKit itself, never the App Group. The price comes
only from `displayPrice`. Restore is on every screen. I found no path where Pro is granted without a verified
transaction. The problems are at the edges: the widget does not notice when the entitlement changes, the
pending state never clears, and a failed restore is shown as a failed purchase.

Counts: High 0, Medium 3, Low 4, Info 5.

## Findings

### M1 (Medium): widgets are not reloaded when the entitlement changes, so a refunded Pro premade keeps drawing
- Where: `App/Store/ProStore.swift:175` (`setEntitled`), `Widget/PyWidget.swift:56` and `:72-75`.
- Failure: The extension checks the grant only when WidgetKit asks for a timeline. Nothing in ProStore calls
  `WidgetCenter.reloadAllTimelines()` when `isEntitled` changes, and that call appears nowhere else in the
  StoreKit path (grep: only the run sink, the install view, the bench `-reload` and the refresh intent).
  (a) Refund or revocation: the Pro premade's timeline that was already built keeps drawing until it ends,
  however long the script's own reload policy makes it. The extension is never asked again before that.
  (b) Purchase: a Pro premade that was locked shows the error card until WidgetKit next spends budget on it.
  The person pays and their Home Screen still shows an error. (c) The locked case returns one entry dated now
  with `.atEnd`, so WidgetKit asks again as soon as its budget allows. Each request reads `currentEntitlements`
  again for an answer that cannot change until the app reloads the widget.
- Fix: In `setEntitled`, when the value actually changes, call an injectable reload, the same way as
  `RefreshWidgetsIntent.reload`, so tests can see it. That covers purchase, restore, refund and anything else
  that arrives on `updates`. In `TreeProvider`, <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> the policy of a Pro premade's timeline at about one hour
  (`.after(min(end, now + 3600))`). Then a revocation that arrives while the app is not running is picked up
  within the hour. For the locked case, use `.never`, or `.after` an hour, and let the app's reload wake it.
  Add a unit test that a change in `isEntitled` calls the reload exactly once.

### M2 (Medium): "Waiting for approval" never clears unless Pro is granted; a declined Ask to Buy leaves the buy button disabled until the app is killed
- Where: `App/Store/ProStore.swift:128-130` and `:175-178`; `App/Store/ProPaywallView.swift:96`, `:148-152`, `:183`.
- Failure: `.pending` sets `ProStore.shared.isPurchasePending = true`. Only `setEntitled(true)` clears it.
  When the organizer declines, StoreKit delivers no transaction, so the flag stays set for the life of the process.
  `shownPhase` returns `.pending` whenever the flag is set and no restore is running. `.pending.buys` is false,
  so the buy button stays disabled. Restore does not help: it finishes with `.none`, but `shownPhase` goes back
  to `.pending`. Closing and reopening the screen does not help either, because the store is a singleton.
  Only a relaunch clears it. Also, StoreKit's `.pending` is not only Ask to Buy. It also covers a payment that
  needs action, for example a bank confirmation. The line `ln.pending` tells an adult with no family that
  "The family organizer needs to approve this purchase."
- Fix: Do not keep pending as a sticky flag in the store. Show pending only from the screen's own last result,
  so reopening the screen gives `ready` with the price. Clear it when a restore ends in `.none` or `.restored`.
  Keep the buy button enabled in pending: StoreKit handles a repeat request. Ask Maren for a neutral pending
  line that is true for both causes. Add a model test: pending, then a restore that finds nothing, then the
  button can buy again.

### M3 (Medium): a failed restore says the purchase failed and offers "Try again · price", which starts a purchase
- Where: `App/Store/ProPaywallView.swift:117`, `:125`, `:131`, `:189`.
- Failure: `RestoreOutcome.failed` with a loaded product maps to `.failed`. The screen then shows "The App Store
  couldn't complete the purchase." over a button labelled "Try again · $X", and that button calls `buy()`.
  Think of someone who already paid, whose restore fails on a weak connection. They are told a purchase failed,
  and offered a priced button that opens the purchase sheet when what they wanted was a restore. StoreKit
  will still ask before charging, and it reports an owned non-consumable as already bought, so nobody is
  charged twice. But the screen misstates what happened and pushes toward paying. That is the consumer
  protection concern in Commandment 6, and the kind of misleading purchase flow App Review notices. On the
  purchased screen it goes the other way: `isEntitled` keeps `shownPhase` at `.restored`, `purchasedLine` is
  set to nil, and a failed restore shows nothing at all. The code comment at `:116` says this is known and
  open, but no board line tracks it.
- Fix: Add a `restoreFailed` phase. Its line needs a Maren string, for example "Couldn't reach the App Store.
  Try Restore again.". Its button keeps the plain `btn.ready` label with the price. On the purchased screen,
  set `purchasedLine` to that same line. Add a row for it to `testPurchaseAndRestoreOutcomesLandOnTheSpecStates`.

### L1 (Low): the purchased screen stays up after a refund while the screen is open
- Where: `App/Store/ProPaywallView.swift:102`, `:113`, `:148-151`.
- Failure: `.purchased` and `.restored` store `phase = .restored`. When the refund arrives on `updates`,
  `isEntitled` turns false, but `shownPhase` falls back to `phase`, which is still `.restored`. The screen keeps
  saying "Pro is active" while every gate is locked. `testBuyRestoreAndRefundThroughThePaywall` avoids this by
  leaving the screen and coming back before it checks.
- Fix: Derive the purchased state only from the store: `if store.isEntitled { .restored } else if phase ==
  .restored { .ready } ...`. Remove the step in the UI test that leaves and reopens the screen, or add a
  version without it.

### L2 (Low): entitlement reads can land out of order
- Where: `App/Store/ProStore.swift:157-163`, `:121-127`.
- Failure: `refreshEntitlement` suspends while it iterates. The listener, the drain of unfinished transactions,
  `purchase()` and the screen's `load()` can each have one running at the same time, and the one that finishes
  last wins even if it started first. Example: just after a purchase, a read that started before the
  transaction was finished lands after `setEntitled(true)` and sets it back to false. With M2's fix the
  screen would follow that false value. The app and the extension can also disagree for a moment: the app
  grants on the transaction in hand, while the extension waits for `currentEntitlements`.
- Fix: Give each read a sequence number and drop any result older than the newest one applied. Or run the
  reads one after another through a single task.

### L3 (Low): offline retry runs only once, right after the screen opens
- Where: `App/Store/ProPaywallView.swift:167-174`, `:234-238`, `:106`, `:114-118`.
- Failure: `.task` calls `retryWhileOffline()` once, after `load()`. If the screen reaches `.offline` later,
  from a purchase that returns `.unavailable` or a restore with no product, the screen still says "The price
  shows when you reconnect", but nothing retries.
- Fix: Drive the loop from the phase, for example `.task(id: model?.phase == .offline)`.

### L4 (Low): the extension gate trusts an id the tree file declares about itself, and the real path is untested
- Where: `Widget/PyWidget.swift:40`, `:56-60`; `Tests/ProPaywallTests.swift:152`.
- Failure: `mayDraw` keys on `doc.widget.id`, which is read from `tree.json` in the App Group. User Python
  can write that file (the same reason CONTRACT.md s2 gives for the entitlement). A script that writes a
  premade's tree under another id is drawn, so this gate stops only honest documents. That fits PROPOSAL-001
  s4, where people's own widgets are never gated, but it should be stated as such. The real enforcement is
  that the app will not run a locked premade's source. Also, `TreeProvider` still reads the stand-in
  `new_widget` folder, so no real premade tree reaches this gate yet, and the test covers `mayDraw` but not
  `drawableDocument()`.
- Fix: Add a comment in `ProEntitlement.swift` saying the gate covers the honest path only. Once widget
  configuration picks real ids, gate on the configured id (the folder) rather than the id the document
  declares, and add a test that runs `drawableDocument()` against a fixture folder.

### Info
- I1, `ProStore.swift:167-173`: unverified transactions are never finished. That is defensible and matches
  the comment. But a non-consumable whose purchase comes back unverified on every try leaves the person
  stuck on `.failed` with no explanation. Log it, and check how often it happens in TestFlight.
- I2, `ProPaywallView.swift:397`: there are no Terms or Privacy links. Guideline 3.1.2 asks for them on
  subscriptions, and this is a non-consumable, so they are not required on this screen. The App Store
  Connect privacy policy URL is still required, and that stays with the Investors.
- I3, `ProFlags.swift:190-213`: `OrderedKeys` does not skip a UTF-8 BOM. A file that starts with one falls back
  to sorted chip order without any error. The build-phase validator could reject a BOM, or the parser could
  skip one. I traced the escapes, nested objects and arrays, repeated keys and the `Set` comparison, and they
  are correct.
- I4, `ProPaywallView.swift:183`, `:403`: during `.loading`, Restore is enabled but `restore()` returns without
  doing anything. Disable it while loading, so a tap is never silently dropped.
- I5, `scripts/export_pro_strings.py:29`: `v[0]` assumes every PRO_STR value is a tuple. They all are today
  (53 of 53), but a plain string value would export only its first character. Assert the type. `--check` is
  run only by hand (README). Add it to the existing "Validate pro-flags.json" build phase or to the host test
  run so drift fails the build.

## What I checked and found sound
- The grant rule (`ProEntitlement.swift:34-37`) is shared by both targets. It is verified-only, matches the
  product id, and refuses a revoked transaction. When the flag file has no product, it returns false.
- `purchase()` finishes the transaction, and grants on the transaction in hand only when it is verified.
  `restore()` uses `AppStore.sync()`, runs only when the person taps Restore, and handles cancel.
- Buying twice is blocked: `phase = .buying` is set on the main actor before the first suspension.
- The price is never in a string. The buy button is disabled when there is no `displayPrice`, and the C6
  urgency check runs on the bundled file.
- The extension target bundles its own `pro-flags.json` and compiles `Shared/`. It never reads an
  entitlement snapshot from the App Group.

## Re-review: 0d5658e5 (T-0480..T-0482) and 8a5596bb (T-0484), T-0483

Reviewer: Pernille, 2026-10-27. Read-only: both diffs, the current `ProStore.swift`, `ProPaywallView.swift`,
`TreeTimeline.swift`, `PyWidget.swift`, `ProEntitlement.swift` and the new tests. Nothing was built or run.

### Verdict

M1, M2 and M3 are fixed as asked, and so are L1 and I4. Every new test would fail on the old code. The
state table <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>. The main actor is respected: `ProStore` and `PaywallModel` are `@MainActor`, and
`reloadWidgets` is a `@MainActor` closure called only from `setEntitled`. One new Medium (N1) comes from the
M1 fix itself. It is the purchase case of M1, narrowed but not closed. It goes to Idris as T-0486. I would not
send a TestFlight build until N1 is fixed or ruled acceptable.

### Per finding

- **M1: fixed, with N1 left open.** `setEntitled` returns early when nothing changes and calls the injected reload
  once per change (`ProStore.swift:185-189`). A drawn Pro premade's policy is capped at one hour from now:
  `.never` becomes `.after(cap)`, `.after` becomes `min(max(d, now+15m), cap)`, and `.atEnd` past the cap
  becomes `.after(cap)` (`TreeTimeline.swift:232-241`). The locked card now waits `.after(1 h)`, not `.atEnd`.
  `testEntitlementChangeReloadsWidgetsOnce` fails without the reload, and fails without the guard, because the
  same grant read twice would count 3. `testProPremadeTimelineIsBoundedToTheRecheck` fails without the cap.
  Gap: the wiring in `getTimeline` (`recheckWithin: pro ? proRecheck : nil`) and the `pro` classification in
  `drawable()` are not tested. A mutant that always passes `nil` keeps the suite green. This is the same gap
  as L4 and is folded into it.
- **M2: fixed.** `isPurchasePending` is gone. Pending is the screen's own phase. `.pending` buys and is not busy,
  and it shows the plain priced `btn.ready`. A restore from pending runs because `canRestore` is true, and it
  ends on `.none`. A new screen opens on `.ready`. `testPendingThenRestoreNothingLeavesBuyEnabled` fails on the
  old code in three places: the sticky flag, `pending.buys == false`, and the reopened screen. `ln.pending` no
  longer names a family organizer. It now reads Maren's final "The purchase is waiting for approval. Pro turns
  on by itself.", and `testPendingLineFitsEveryPendingCause` guards it.
- **M3: fixed.** `RestoreOutcome.failed` with a product maps to `.restoreFailed`. Its line is its own, its button
  is `btn.ready` and never "Try again", and on the offer screen it shows in `status.danger` (8a5596bb). On the
  purchased screen, `purchasedLine` is `ln.restoreFailed` in `text.secondary`. The new asserts in
  `ProPaywallTests` and `testFailedRestoreShowsItsOwnLineOnBothScreens` fail on the old mapping.
- **L1: fixed.** `shownPhase` takes the purchased state only from `store.isEntitled`. A stored `.restored` phase
  without the grant falls back to `.ready`, or to `.offline` when there is no product.
  `testRefundWhileThePurchasedScreenIsOpenReturnsToTheOffer` fails on the old code.
- **L2: open, and now visible.** Before L1 was fixed, a stale `false` landing after a purchase changed nothing
  on screen. Now it drops the screen from "Pro is active" back to the priced Buy, and it costs two extra widget
  reloads, one for the false and one for the true that follows. The window is still small, a read that started
  before the purchase and finished after it, so it stays Low. The fix is unchanged: give each read a sequence
  number, or run the reads one after another.
- **L3: open** (not in scope of these commits).
- **L4: open,** now also covering the untested `getTimeline` and `drawable()` wiring described under M1.
- **I4: fixed.** `canRestore` checks both `shownPhase.busy` and `phase.busy`, so Restore is disabled while
  loading and while a restore runs on the purchased screen.
- **I1, I2, I3, I5: unchanged.** I2 is now board line T-0485.

### New findings

#### N1 (Medium): a purchase can reload the widgets before the extension can see the grant, and the locked card then waits an hour
- Where: `App/Store/ProStore.swift:123-145` (`purchase()`), `:185-189`; `Widget/PyWidget.swift` `.locked` case;
  `Shared/TreeTimeline.swift:245` (`lockedPolicy`); `Shared/ProEntitlement.swift:42-47`.
- Failure: `purchase()` calls `handle(result)`, which reads `currentEntitlements`. The code's own comment says
  that read "can trail the purchase result by a moment". When it does, the read returns false, and
  `setEntitled(true)` then grants on the transaction in hand and fires the only reload. The extension answers
  that reload by reading `currentEntitlements` too, at a moment the app has just seen it lag. If it is still
  behind, the Pro premade gets the locked card with `.after(now + 1 h)`. Every later read in the app returns
  true, `isEntitled` is already true, and so nothing reloads again. The person has paid, the app says "Pro is
  active", and the Home Screen shows the error card for up to an hour, or longer, since `.after` is only a
  hint to WidgetKit. Before this change the locked card used `.atEnd` and recovered on its own. The new
  one-hour wait removed that recovery. This is M1(b) in a smaller window, and
  `testEntitlementChangeReloadsWidgetsOnce` counts reloads, not when they happen, so it cannot see it.
- Fix: when `purchase()` grants on the transaction in hand and the `currentEntitlements` read just before it
  did not, check again a few times over a few seconds, and reload once more on the first read that grants.
  For example, keep a flag "granted ahead of currentEntitlements", and have `refreshEntitlement` reload once
  and clear the flag when a read finally agrees. Add a test with an injected entitlement reader that lags one
  read, and assert two reloads. Optionally, shorten `lockedPolicy` to the 15-minute floor for the first
  timeline after a reload.

#### N2 (Low): a second failed Restore on the purchased screen is silent
- Where: `App/Store/ProPaywallView.swift:199`, `:261-264`, `:449`.
- Failure: `purchasedLine` is not cleared when a restore starts. When the same failure happens twice, the
  `onChange(of: purchasedLine)` announcement does not fire, and the visible line does not change. During the
  restore the purchased screen also shows no "Restoring…", only the Restore link disabled. A VoiceOver user
  who taps Restore again hears nothing.
- Fix: set `purchasedLine = nil` when the restore starts on the purchased screen, or announce the result in
  `restore()` itself.

Counts for this pass: Medium 1 new (N1), Low 1 new (N2); open from the first pass: L2, L3, L4, I1, I3, I5.
{% endraw %}

</div>
