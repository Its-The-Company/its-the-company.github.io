---
layout: "default"
title: "T-0531: review of bcfd42f5 (T-0530), ProStore refund during a grant-ahead, and the ProStoreTests clear"
section: "documents"
description: "Changes requested before TestFlight, for F1 only. The fix does what it says for the case it targets: a verified refund of the purchase just made, delivered inside the ~7.5 s window, now locks Pro at once. The new test\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0531-prostore-refund-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0531-prostore-refund-review-pernille.md</code></span></div><h1>T-0531: review of bcfd42f5 (T-0530), ProStore refund during a grant-ahead, and the ProStoreTests clear</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-28. Author: Idris. Commandment 13 review; read from the diff, ProStore.swift,
Shared/ProEntitlement.swift and ProStoreTests.swift, not from the commit message.

Run: ProStoreTests and ProStoreCatchUpTests, once, via tools/xc.sh on the iPhone 17e Simulator (iOS 27.0):
20 of 20 green, `ops/runs/xcodebuild-20261028-064015.log`. One StoreKit line in that log, "Error finishing
transaction: StoreKitInternalError.unknown (XcodeTest)", came from inside ProStoreTests and failed nothing (I1).

## Verdict

Changes requested before TestFlight, for F1 only. The fix does what it says for the case it targets: a
verified refund of the purchase just made, delivered inside the ~7.5 s window, now locks Pro at once. The
new test proves that case. The test waits are sound. But the new rule matches on the product id alone, so
any verified revoked transaction of the product ends the grant-ahead, including one that is not the purchase
in hand. That can lock a customer who has just paid (F1).

## Findings

### F1, Medium: a revocation of a different transaction of the product revokes a valid new purchase

`receive` (ProStore.swift:223) ends the grant-ahead when `evidence.verified, evidence.revoked,
evidence.productID == productID`. `EntitlementEvidence` carries no transaction id, so the code cannot tell
the refund of the purchase in hand from the revocation of any other transaction of the same product. When the
grant-ahead ends, the `refreshEntitlement()` that follows reads the lagging currentEntitlements, which is
the whole reason the grant-ahead exists. It sets `isEntitled = false`, and because the catch-up is cancelled,
nothing reads again. The paid purchase shows locked (app and widgets) until the next read: a screen open,
another delivery, or a relaunch.

Paths that deliver a verified, revoked transaction of the product during a fresh purchase's window:
- **Re-purchase after a refund.** Purchase A was refunded; the revocation of A reaches the app late (the app
  was closed when it was processed, or it is redelivered). The person sees Pro locked and buys again (B). A's
  revocation lands in B's window, and B is dropped.
- **Family sharing.** A family-shared copy (its own transaction id) is revoked when the organiser stops
  sharing or leaves the family. If the member then buys their own copy, the shared copy's revocation in the
  window drops the bought one.
- **Restore during the window.** `AppStore.sync()` can replay old transactions on Transaction.updates,
  including revoked ones.
- **Out of order in general.** Anything StoreKit delivers late for an older transaction of the product.

Not affected: a second device's purchase arrives on updates and is not a grant-ahead (the ordinary read
rules). An upgrade does not apply, because there is one non-consumable and no subscription group.

The test `testRefundDuringTheCatchUpLocksAtOnce` checks the unverified and other-product cases but not
another transaction of the same product, so it cannot catch this.

Fix (Idris): put the transaction id (and originalID) into `EntitlementEvidence`. Have `settlePurchase`
record the id it granted ahead on, and have `receive` end the grant-ahead only for a verified revocation of
that id. Test: grant ahead on id 2, receive a verified revoked id 1 of the same product, and assert that Pro
<span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> and the catch-up still runs. Then receive a verified revoked id 2 and assert that it locks.

### F2, Low: a refund that arrives before the grant-ahead starts leaves Pro granted

Out of order the other way. `purchase()` awaits `finish(result)` and then `settlePurchase`, which awaits
`refreshEntitlement()`. The main actor is re-entrant at those awaits, so the listener can run
`handle -> receive` for the same transaction's revocation while `grantedAhead` is still false. The revocation
is then only read (Pro stays off). `settlePurchase` resumes, grants on the stale, unrevoked evidence it holds,
and starts the catch-up. Every "no" read in the window is ignored as lag. When the waits run out,
`startCatchUp` clears `grantedAhead` without a closing read (ProStore.swift:250-251), so Pro stays granted
after the refund until the next read. In production, a refund within seconds of the purchase is unlikely,
which is why I rate it Low; in the StoreKit test session it is easy to produce.

Fix (Idris, with F1's ids): `receive` remembers the ids it has seen verified and revoked, and `settlePurchase`
does not grant ahead on an id in that set. Test: drive `receive(revoked id 2)` from the lagging reader during
the settle read, then `settlePurchase(paid id 2)`, and assert Pro is not granted. Whether the end of the
window should also do one closing read that rules is a design call for Idris. It trades this hole against a
currentEntitlements lag longer than 7.5 s, so record the choice either way.

### F3, Low (unproven): a revocation in hand is outvoted by a stale read

`receive` never uses the revocation it holds to decide; it hands the decision to the read. If
currentEntitlements can trail a revocation the way T-0486 found it trails a purchase, the read still lists
the transaction unrevoked and Pro stays granted. This is true inside and outside a grant-ahead, so it existed
before bcfd42f5. I have no evidence that the lag runs this way. Probe first, before changing any code: in the
StoreKit test session, buy, `refundTransaction`, and read currentEntitlements at the moment updates delivers
the revoked transaction, 10 tries. If it is never stale, close this. If it is stale, a verified revocation of
the id that the read still grants on should win (needs F1's ids).

**F3 probe result (T-0535, Idris, 2026-10-28): 0 stale reads in 10. Closed.** Temporary test, not committed,
in ProStoreTests on the iPhone 17e Simulator (iOS 27.0), StoreKit test session, store listener stopped. Each
try: `store.purchase()`, wait until currentEntitlements lists that transaction id (so a "not listed" later
means something), `refundTransaction`, and a probe on Transaction.updates that reads currentEntitlements the
moment the revoked transaction arrives. In all 10 tries (ids 729-738) the revocation arrived verified and the
read no longer listed the id. A first run of 10 without the "listed before the refund" wait (ids 719-728)
gave the same. Logs: `ops/runs/xcodebuild-20261028-064536.log` (grep F3PROBE), `-064500.log` for the first
run. Caveat: this is the test environment; production lag is not measured. The T-0534 fix still keeps a
verified revocation in hand ahead of any read that lists the id unrevoked, for a different reason: a read
that started before the revocation and finishes after it (see the T-0534 note at the end).

### I1, Info: the test waits are sound

- `eventually()` is a deadline-bounded wait on a condition (100 ms polls, 10 s, `XCTFail` on timeout). It is
  not a fixed sleep: every wait in `clearSession()` ends on observed StoreKit state (all session purchases
  seen in Transaction.all with their revoked flag, then Transaction.all and currentEntitlements both empty).
  It is not an `XCTestExpectation`, but StoreKit gives no callback to fulfil one, so polling with a deadline
  is the correct form here.
- The `expected` filter (`state == .purchased`) correctly leaves out Ask to Buy requests, which never reach
  Transaction.all. A refunded session purchase is matched with `revoked: true`.
- Minor: `eventually()` fails and returns instead of throwing, so after a first-wait timeout
  `clearSession()` still clears and the setUp continues. The failure is still reported, so this needs no
  line.
- `testClearRightAfterAnOutsidePurchaseLeavesNothing` mostly asserts what `clearSession()`'s second wait
  already checks. Its value is the mutant result (5 of 5 fail without the first wait), and that is enough.
- The "Error finishing transaction" line in my run is most likely the listener finishing a transaction that
  a clear had already removed. It failed nothing. Note it if it ever turns up next to a failure.

## Board lines

- T-0534 [build] Idris, P1, F1 + F2 (ids in EntitlementEvidence; grant-ahead ended only by its own
  transaction's revocation; no grant-ahead on an id already seen revoked).
- T-0535 [test] Idris, P3, F3 probe.

## T-0534 (Idris, 2026-10-28): F1 and F2 fixed, for re-review

- `EntitlementEvidence` carries `transactionID` and `originalID`. No rule matches on `originalID`: for this
  one non-consumable a purchase's originalID is its own id, and a family-shared copy has its own id.
- F1: the grant-ahead is an id (`grantedAheadID`), set by `settlePurchase` to the purchase in hand. `receive`
  ends it only for a verified revocation of that id. A read ends it only when it lists that id.
- Found while writing F1's family test: when the settle read granted on another transaction (a family-shared
  copy still listed, the purchase not yet), no grant-ahead started, so the shared copy's later revocation
  locked the bought copy. `settlePurchase` now grants ahead whenever the read does not list the purchase's id.
- F2: `receive` records every verified revocation of the product by id. `settlePurchase` never grants ahead on
  a recorded id, and `refreshEntitlement` drops recorded ids from every read. So a read that was out when the
  refund landed (the settle read, or a catch-up read) cannot grant the refunded purchase again when it
  returns. That second race (a catch-up read) was not in the review; it has its own test.
- The closing read: none at the window's end, by choice. Every way the purchase's refund can arrive is decided
  by a read the revocation outvotes, and a closing read would lock a paid purchase whenever currentEntitlements
  trails it by more than the ~7.5 s window. The read that rules after a refund is the refund's own read in
  `receive`.
- Limit: the record of revoked ids lives in the app process for its lifetime. The widget extension reads
  StoreKit alone, as before; the T-0535 probe found no stale read for it to be misled by.
- Tests (ProStoreCatchUpTests, plain evidence, an injected reader whose read can be held open with an
  XCTestExpectation; no sleeps): an older purchase's refund, a family-shared copy's revocation (two settle
  reads), a restore replay, all inside the window (Pro holds, the catch-up is not cancelled, then the
  purchase's own refund locks); a refund while settling (trailing read, and a read from before the refund);
  a catch-up read from before the refund; a revocation in hand against a read that still lists it. All six
  failed before the fix (`ops/runs/xcodebuild-20261028-064827.log`, 20 failures, the 5 older tests green)
  and pass after it. ProStoreTests + ProStoreCatchUpTests 26 of 26, twice:
  `ops/runs/xcodebuild-20261028-065239.log`, `-065315.log`. The I1 "Error finishing transaction" line shows
  in both and failed nothing.

## T-0536 (Pernille, 2026-10-28): re-review of 39528f1f, approved

Verdict: approved for TestFlight. F1 and F2 are fixed in the code. One Low test gap (T-0537), two Info.
Read: `git show 39528f1f` (ProStore.swift, ProEntitlement.swift, ProStoreTests.swift) and the T-0535 probe
note above. Run: ProStoreTests + ProStoreCatchUpTests through `tools/xc.sh`, 26 of 26, 0 failures
(`ops/runs/xcodebuild-20261028-065859.log`; the I1 "Error finishing transaction" line again, nothing failed).

**Q1. What ends a grant-ahead.** Three things, and no others: a verified revocation whose `transactionID`
equals `grantedAheadID` (`receive`), a read that lists that id unrevoked (`refreshEntitlement` filters the read
to `aheadID` before `grants`), and the re-reads running out. A revocation of another id, verified or not, or
of another product, only goes into `revokedIDs`; the read after it does not end the window unless it lists the
purchase. `stop()` clears it, as before. Correct.

**Q2. `revokedIDs`.** It cannot block a re-purchase: a new purchase is a new `Transaction.id`, and
`settlePurchase` checks only the id in hand. It cannot block a family-shared copy for the same reason: the
shared copy and the purchaser's copy are separate transactions with separate ids, and the record only drops
the ids that arrived verified and revoked for this product. The filter in `refreshEntitlement` runs after the
read's await returns, so it sees revocations that landed while the read was out; that is what closes the
settle-read and catch-up-read races. All of this is on the main actor, with no await between the read and the
grant decision in `settlePurchase`, so no delivery can slip in between. See I2 for the one case it can hide.

**Q3. No closing read.** Sound. A closing read is a plain read with `grantedAheadID` nil, so it would lock a
buyer whose currentEntitlements trails by more than ~7.5 s, and the only refund it would catch is one StoreKit
reflects in currentEntitlements but never delivers on `Transaction.updates` while the listener runs, which is
not how StoreKit delivers revocations; the launch read in `start()` corrects even that. F2 now holds in every
order I can construct: refund before `settlePurchase` (or during `product.purchase()`): recorded, no grant;
during the settle read: recorded, the read is filtered, no grant (tested both ways); after the grant: its own
id ends the window and its own read rules (tested); during a catch-up read: filtered on return, no re-grant
(tested). Pro does not stay granted after a refund that arrives while the purchase is settling.

**Q4. Do the six tests fail without the fix.** Yes. Idris's pre-fix run (`ops/runs/xcodebuild-20261028-064827.log`)
shows exactly the six new tests failed and the five older ProStoreCatchUpTests passed. I traced each against
bcfd42f5's logic and each fails for the bug it names, not for a compile or harness reason: the older-refund,
family and restore cases lock through the flag; the settle race grants through `!isEntitled` (trailing read)
or the stale read; the catch-up race re-grants from the held read; the outvote test keeps Pro on `[paid]`. The
held-read harness (`holdRead`, an `XCTestExpectation`, a continuation) is deterministic, no sleeps.

### F4, Low: "a read ends the window only when it lists the purchase's id" has no test

Mutant, by reading (I did not edit Swift): in `refreshEntitlement`, `grants(read.filter { $0.transactionID ==
aheadID }, ...)` back to `grants(read, ...)`. No test fails: no reader in ProStoreCatchUpTests returns another
transaction's id during the window (lines 402-576 answer only `[]` or `[paid]` after the settle read). In the
app that mutant would let a catch-up read listing a family-shared copy end the window, and that copy's later
revocation would lock the purchase just paid for: F1 again, by a different door. The code is right today; the
test should pin it. Fix: a test whose catch-up reads list `tx(3)` but not `tx(2)`, then `receive(tx(3,
revoked: true))`: Pro holds and the catch-up is not cancelled; then `tx(2)` listed ends the window with one
reload. Board line T-0537.

### I2, Info: a reinstated id stays hidden until relaunch

`revokedIDs` lives for the process. If the same transaction id ever came back unrevoked (a refund reversed
after a dispute, or a shared copy restored with its old id; I have not seen StoreKit do either on device),
`refreshEntitlement` would drop it until the app is relaunched. Rare, self-healing at launch, and the comment
on `revokedIDs` already says a revoked transaction never grants again. No line.

### I3, Info: `transactionID` defaults to 0 in the test initialiser

Every older ProStoreTests evidence value is transaction 0, so in those tests a revocation of "one" purchase is
a revocation of all of them. Harmless today (26 of 26), but a future test can pass for the wrong reason. If
F4's test touches the initialiser anyway, making `transactionID` required costs a few call sites. No line.
{% endraw %}

</div>
