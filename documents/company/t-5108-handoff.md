---
layout: "default"
title: "T-5108 handoff"
section: "documents"
description: "Stopped on the coordinator&#x27;s word (Evan on #325, 21:51 ET: pre-comparison work first). No app code was committed."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5108-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/T-5108-handoff.md</code></span></div><h1>T-5108 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Stopped on the coordinator's word (Evan on #325, 9:51 PM ET: pre-comparison work first). No app code was committed.

## 1. The verification job: waiting, not stuck
- `ops/lane-outbox/after-sync/b-1795309240351173000-26193.json` (the full-suite xc-test for T-5108) is on main and in
  the main checkout. `tools/personal_land.sh` after_sync replays after-sync/ on the supervisor's next LIVE=0 pass, once
  the waiting landings (22 `.landed` records in .git/personal-ready at 9:41 PM) are mapped to GitHub. main == origin/main
  (9d8ce6310c) at 9:41 PM, and drains ran at 5:37 PM, 6:48 PM and 7:42 PM, so it is queued behind them, not lost. No T-5108 job
  was in `tools/jobs.py list` yet. Do not queue a duplicate. The 2:09 AM daily full suite also runs testE.

## 2. The premade path still waits on StoreKit with no bound (found, fix written, not landed)
- "No view for this size" is our own placeholder entry (root nil), so the widget never got a timeline. That matches
  "ext 0x" on 11-20.
- After 4fad1da677, own widgets skip StoreKit. But `TreeDrawable.dependsOnPro` is true for every premade, free ones too,
  and `TreeProvider.drawable` then awaits `ProEntitlement.gates()` (Transaction.currentEntitlements) with no bound. A
  customer's first premade widget can hit the same fault. `WidgetChoiceQuery` and `WidgetPlacement` await it unbounded too
  (not touched).
- The fix (patch below): `ProEntitlement.timelineGates(timeout: 5 s)` races the read against a sleep (the same pattern
  as TesterPro.bounded). If StoreKit doesn't answer in time, it falls back to the bundled flag file with entitled false,
  so it never grants Pro on no answer, and reports `answered: false`. `drawable` returns that flag. A Pro card drawn
  without an answer rechecks after `minimumReload` (15 min), not after proRecheck (1 h).
- Tested: WidgetPlacementTests and FirstDrawCardTests ran 30 tests, 0 failures, on the runner (J-20261121-2144-land-chk-a5ab71-1-0769cd).
  Mutants: 4/4 KILLED (no-answer-grants, bound-60x-longer, provider-unbounded, card-ignores-answer); the specs are at the end.
- Not done: the full `-only-testing:PyWidgetTests` run, a reviewer (Commandment 13), the commit.

## Left
1. Apply the patch (`git apply`), `xcodegen generate`, run the full PyWidgetTests, commit as T-5108, send it for review.
2. Leave the T-5108 line unticked: it ticks itself when a MacBook job passes. No board note was added, because the stop came first.

## Patch (against 4fefafaf80)
```diff
diff --git a/pywidget/ios/Shared/ProEntitlement.swift b/pywidget/ios/Shared/ProEntitlement.swift
index 2d08bd1300..bd94d364d1 100644
--- a/pywidget/ios/Shared/ProEntitlement.swift
+++ b/pywidget/ios/Shared/ProEntitlement.swift
@@ -77,6 +77,46 @@ enum ProEntitlement {
     static func gates(config: ProConfig?, purchased: Bool, testerActive: Bool) -> ProGates {
         ProGates(config: config, entitled: purchased || testerActive)
     }
+
+    /// T-5108: how long a widget's timeline waits for StoreKit. On a freshly booted device (the runner's Simulator,
+    /// 11-20) currentEntitlements had not answered before WidgetKit gave up on the timeline, and the widget kept the
+    /// placeholder's "No view for this size". Every premade asks, free ones too, so it was any first premade's fault.
+    static let timelineReadTimeout: Duration = .seconds(5)
+
+    /// The extension's gates, or, when `read` has no answer within `timeout`, the bundled flag file with nothing
+    /// entitled: a premade StoreKit did not grant in time is drawn as it is without Pro, never unlocked on no answer.
+    /// `answered` says which, so the timeline asks again soon (TreeDrawable.proCardTimeline). The read is left to
+    /// finish on its own.
+    static func timelineGates(timeout: Duration = timelineReadTimeout,
+                              fallback: ProConfig? = ProConfig.bundled(),
+                              read: @escaping @Sendable () async -> ProGates = { await gates() })
+        async -> (gates: ProGates, answered: Bool) {
+        let unanswered = (gates: ProGates(config: fallback, entitled: false), answered: false)
+        return await withCheckedContinuation { continuation in
+            let once = FirstAnswer(continuation)
+            Task { once.resume((gates: await read(), answered: true)) }
+            Task {
+                try? await Task.sleep(for: timeout)
+                once.resume(unanswered)
+            }
+        }
+    }
+}
+
+/// Resumes a continuation with the first answer only (ProEntitlement.timelineGates).
+private final class FirstAnswer: @unchecked Sendable {
+    private let lock = NSLock()
+    private var continuation: CheckedContinuation<(gates: ProGates, answered: Bool), Never>?
+
+    init(_ continuation: CheckedContinuation<(gates: ProGates, answered: Bool), Never>) { self.continuation = continuation }
+
+    func resume(_ value: (gates: ProGates, answered: Bool)) {
+        lock.lock()
+        let c = continuation
+        continuation = nil
+        lock.unlock()
+        c?.resume(returning: value)
+    }
 }
 
 extension ProGates {
diff --git a/pywidget/ios/Shared/WidgetPlacement.swift b/pywidget/ios/Shared/WidgetPlacement.swift
index 5743a76ab1..cc54174bf7 100644
--- a/pywidget/ios/Shared/WidgetPlacement.swift
+++ b/pywidget/ios/Shared/WidgetPlacement.swift
@@ -298,9 +298,12 @@ enum TreeDrawable: Sendable {
     }
 
     /// The Pro card's one-entry timeline: asked again after proRecheck (the app reloads every timeline on a purchase).
-    static func proCardTimeline(name: String, now: Date) -> Timeline<TreeWidgetEntry> {
+    /// T-5108: a card drawn because StoreKit did not answer in time (`answered` false, ProEntitlement.timelineGates)
+    /// may be a paid premade, so it is asked again after the shortest reload instead.
+    static func proCardTimeline(name: String, now: Date, answered: Bool = true) -> Timeline<TreeWidgetEntry> {
         Timeline(entries: [TreeWidgetEntry(date: now, root: nil, stale: false, synthetic: false, proCard: name)],
-                 policy: TreeTimelinePlanner.lockedPolicy(now: now))
+                 policy: answered ? TreeTimelinePlanner.lockedPolicy(now: now)
+                     : .after(now.addingTimeInterval(TreeTimelinePlanner.minimumReload)))
     }
 }
 
diff --git a/pywidget/ios/Tests/WidgetPlacementTests.swift b/pywidget/ios/Tests/WidgetPlacementTests.swift
index fac21cb8f9..408f7f90b0 100644
--- a/pywidget/ios/Tests/WidgetPlacementTests.swift
+++ b/pywidget/ios/Tests/WidgetPlacementTests.swift
@@ -65,6 +65,45 @@ final class WidgetPlacementTests: XCTestCase {
         }
     }
 
+    /// T-5108: a premade's timeline waits for StoreKit at most its bound, then decides as without Pro and says so; it
+    /// never grants on no answer. A StoreKit that answers in time is taken as it is, grant included.
+    func testAPremadeWaitsOnStoreKitOnlySoLong() async throws {
+        let config = try XCTUnwrap(self.config)
+        let start = ContinuousClock.now
+        let silent = await ProEntitlement.timelineGates(timeout: .milliseconds(300), fallback: config) {
+            try? await Task.sleep(for: .seconds(600))  // a StoreKit that never answers in the test's lifetime
+            return ProGates(config: config, entitled: true)
+        }
+        let waited = ContinuousClock.now - start
+        XCTAssertFalse(silent.answered)
+        XCTAssertEqual(silent.gates, ProGates(config: config, entitled: false), "no answer is never a grant")
+        XCTAssertLessThan(waited, .seconds(5), "waited \(waited) for a StoreKit that does not answer")
+        XCTAssertGreaterThanOrEqual(waited, .milliseconds(300), "gave up before its bound")
+        let quick = await ProEntitlement.timelineGates(timeout: .seconds(30), fallback: config) {
+            ProGates(config: config, entitled: true)
+        }
+        XCTAssertTrue(quick.answered)
+        XCTAssertEqual(quick.gates, ProGates(config: config, entitled: true))
+        XCTAssertEqual(ProEntitlement.timelineReadTimeout, .seconds(5))
+        // The provider takes the bounded read for every premade, and its Pro card carries the answer.
+        let provider = UITestLaunchScanTests.code(try XCTUnwrap(try WidgetKindsTests.extensionSources()["Widget/PyWidget.swift"]))
+        XCTAssertTrue(provider.contains("await ProEntitlement.timelineGates()"), "the premade path waits unbounded")
+        XCTAssertFalse(provider.contains("ProEntitlement.gates()"))
+        XCTAssertTrue(provider.contains("TreeDrawable.proCardTimeline(name: name, now: now, answered: answered)"))
+    }
+
+    /// T-5108: a Pro card drawn on no answer may be a paid premade, so it is asked again after the shortest reload, not
+    /// after the hour a StoreKit "no" waits.
+    func testAProCardDrawnOnNoAnswerRechecksSoon() {
+        let now = Date(timeIntervalSince1970: 1_800_000_000)
+        let unanswered = TreeDrawable.proCardTimeline(name: "Habit tracker", now: now, answered: false)
+        XCTAssertEqual(unanswered.entries.first?.proCard, "Habit tracker")
+        XCTAssertEqual(unanswered.policy, .after(now.addingTimeInterval(TreeTimelinePlanner.minimumReload)))
+        XCTAssertLessThan(TreeTimelinePlanner.minimumReload, TreeTimelinePlanner.proRecheck)
+        XCTAssertEqual(TreeDrawable.proCardTimeline(name: "Habit tracker", now: now, answered: true).policy,
+                       TreeTimelinePlanner.lockedPolicy(now: now))
+    }
+
     func testPickerListsOwnWidgetsAndFreePremadesWithoutPro() {
         let got = WidgetChoices.offered(libraryIDs: library, gates: ProGates(config: config, entitled: false),
                                         titles: PremadeTitles.bundled())
diff --git a/pywidget/ios/Widget/PyWidget.swift b/pywidget/ios/Widget/PyWidget.swift
index 002c611070..139feafb2b 100644
--- a/pywidget/ios/Widget/PyWidget.swift
+++ b/pywidget/ios/Widget/PyWidget.swift
@@ -29,16 +29,17 @@ struct TreeProvider: AppIntentTimelineProvider {
     /// T-0473 (CONTRACT.md s2): a Pro premade's tree is drawn only while StoreKit, asked from this
     /// extension, grants Pro by the bundled flag file; never from an App Group snapshot. T-0051: otherwise
     /// the Pro card (TreeDrawable.decide checks the lock before the tree).
-    static func drawable(_ id: String) async -> TreeDrawable {
+    /// `answered`: false when StoreKit had no answer in time and the decision was made without Pro (T-5108).
+    static func drawable(_ id: String) async -> (TreeDrawable, answered: Bool) {
         let file = tree(for: id)
         // T-5108: StoreKit is asked only when its answer can change what is drawn (TreeDrawable.dependsOnPro), so a
-        // person's own widget never waits on it.
-        let gates = TreeDrawable.dependsOnPro(widgetID: id, tree: file)
-            ? await ProEntitlement.gates() : ProGates(config: ProConfig.bundled(), entitled: false)
+        // person's own widget never waits on it; a premade waits at most ProEntitlement.timelineReadTimeout.
+        let (gates, answered) = TreeDrawable.dependsOnPro(widgetID: id, tree: file)
+            ? await ProEntitlement.timelineGates() : (ProGates(config: ProConfig.bundled(), entitled: false), true)
         // T-4441: one function, run by FirstRenderTests with the built appex's folder (TreeDrawable.inExtension).
-        return TreeDrawable.inExtension(widgetID: id, tree: file, gates: gates,
-                                        titles: PremadeTitles.bundled(), status: status(for: id),
-                                        firstRenders: FirstRender.folder(), scripts: WidgetFolder.appGroupScripts)
+        return (TreeDrawable.inExtension(widgetID: id, tree: file, gates: gates,
+                                         titles: PremadeTitles.bundled(), status: status(for: id),
+                                         firstRenders: FirstRender.folder(), scripts: WidgetFolder.appGroupScripts), answered)
     }
     /// T-0048: the widget's status.json, read without the lock (a write is a rename), for the error card; nil with no
     /// App Group, no file or a bad one, which never claims a failure.
@@ -76,7 +77,8 @@ struct TreeProvider: AppIntentTimelineProvider {
         if TreeDrawable.showsChooseCard(chosen: configuration.widget?.id, hookTree: { Self.document(for: Self.widgetID) != nil }) {
             return TreeDrawable.chooseCardTimeline(now: now)
         }
-        switch await Self.drawable(id) {
+        let (drawable, answered) = await Self.drawable(id)
+        switch drawable {
         case .firstDraw:
             // T-3279, T-3298: never drawn (no tree.json; a premade, or an own widget whose folder exists): the first-draw
             // card, named. A tree with no view for this family still draws the error line (T-0037).
@@ -110,7 +112,7 @@ struct TreeProvider: AppIntentTimelineProvider {
         case .proCard(let name):
             // The app reloads every timeline when Pro is bought (T-0480).
             // T-3671: the card names its widget, so its tap opens that premade's page (where Pro is offered).
-            let t = TreeDrawable.proCardTimeline(name: name, now: now)
+            let t = TreeDrawable.proCardTimeline(name: name, now: now, answered: answered)
             return Timeline(entries: t.entries.map { var e = $0; e.widgetID = id; return e }, policy: t.policy)
         case .drawn(let doc, let pro):
             let t = TreeTimelinePlanner.timeline(doc, family: family, now: now,
```

## Mutant specs (tools/xc_mutants.py)
```json
[
 {"name": "no-answer-grants", "file": "Shared/ProEntitlement.swift",
  "find": "let unanswered = (gates: ProGates(config: fallback, entitled: false), answered: false)",
  "replace": "let unanswered = (gates: ProGates(config: fallback, entitled: true), answered: false)",
  "tests": ["PyWidgetTests/WidgetPlacementTests/testAPremadeWaitsOnStoreKitOnlySoLong"]},
 {"name": "bound-60x-longer", "file": "Shared/ProEntitlement.swift",
  "find": "try? await Task.sleep(for: timeout)",
  "replace": "try? await Task.sleep(for: timeout * 60)",
  "tests": ["PyWidgetTests/WidgetPlacementTests/testAPremadeWaitsOnStoreKitOnlySoLong"]},
 {"name": "provider-unbounded", "file": "Widget/PyWidget.swift",
  "find": "? await ProEntitlement.timelineGates() : (ProGates(config: ProConfig.bundled(), entitled: false), true)",
  "replace": "? (await ProEntitlement.gates(), true) : (ProGates(config: ProConfig.bundled(), entitled: false), true)",
  "tests": ["PyWidgetTests/WidgetPlacementTests/testAPremadeWaitsOnStoreKitOnlySoLong"]},
 {"name": "card-ignores-answer", "file": "Shared/WidgetPlacement.swift",
  "find": "policy: answered ? TreeTimelinePlanner.lockedPolicy(now: now)",
  "replace": "policy: true ? TreeTimelinePlanner.lockedPolicy(now: now)",
  "tests": ["PyWidgetTests/WidgetPlacementTests/testAProCardDrawnOnNoAnswerRechecksSoon"]}
]
```
{% endraw %}

</div>
