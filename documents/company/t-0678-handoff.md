---
layout: "default"
title: "T-0678 handoff"
section: "documents"
description: "No code committed for this step: the Done test now runs, and it fails for a product reason that needs a person&#x27;s answer."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-0678-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 26 · Mon Nov 16</span><span><code>ops/plans/T-0678-handoff.md</code></span></div><h1>T-0678 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
No code committed for this step: the Done test now runs, and it fails for a product reason that needs a person's answer.

## What ran

An iOS 26.0 runtime (23A343) is now on the Mac mini, so testQRefreshTapRunsInTheExtension ran for the first time, on a
private Simulator (iPhone 16e, iOS 26.0; iPhone 17e cannot be made on 26.0), forced <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> build
(SWIFT_ACTIVE_COMPILATION_CONDITIONS PYWIDGET_LANE_FORCED, Debug), four runs 10:18-11:04 PM ET:

1. The extension placed and drew the lane script (tree.json written, app not running). The tap failed in the test:
   iOS 26.0 exposes Button(intent:) as a Button inside a Button, both "Refresh" (fix: firstMatch).
2. The token regex `T[0-9]+` also matches tree.json's ISO dates ("...T03:..."), so before and after read the same
   whatever the tap did (fix: draw and match "TOK<n>"). The test as on main could never have passed or failed honestly.
3. With both fixes: **the tap ran, in the app, not in the extension.** Log line:
   `T-0678 TAP rows in any lane +1 ["app/intent/error"] app state 3` (3 = runningBackground); no new lane row, no
   new token. (ops/runs/xcodebuild-20261116-224433.log, not in git.)
4. Same with `supportedModes` declared from iOS 27 only (an experiment, reverted): `["app/intent/error"] app state 3`
   (ops/runs/xcodebuild-20261116-225820.log). So the mode is not what moves it; iOS 26.0 launches the app in the
   background for this widget button intent.

The app's run wrote `error`, most likely because the test seeds lane-scripts/<id>/ only, not scripts/<id>/ (not checked).

## For Ines and Pernille

RefreshTapRule's premise for iOS 18-26 ("in the extension a lane: widget script runs there") does not hold on the
iOS 26.0 Simulator: the system runs RefreshWidgetIntent in the app process, launched in the background. On 26 every
tap therefore costs an app launch (memory, the cold-launch cost Pernille's review left unmeasured), as on 27. Choices:
accept app-side taps on 26 (the button works there, as it does on 27, if the app writer runs that widget; RefreshTapRule
and its doc change), or find what makes WidgetKit run it in the extension (intent only in the extension target on
18-26 is not possible with one binary; needs Apple's documented rule, read under the #64 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>). iOS 18 itself is still
unmeasured: Xcode 27.1 offers no iOS 18 runtime.

## The test changes (not committed; apply with git apply)

```diff
diff --git a/pywidget/ios/UITests/WidgetKitCheckTests.swift b/pywidget/ios/UITests/WidgetKitCheckTests.swift
index 6d984d2a90..2ee0e03532 100644
--- a/pywidget/ios/UITests/WidgetKitCheckTests.swift
+++ b/pywidget/ios/UITests/WidgetKitCheckTests.swift
@@ -1277,34 +1277,41 @@ final class WidgetKitCheckTests: XCTestCase {
     /// extension with the app closed; one tap on the button, and tree.json must carry a new token and a later
     /// `sampled_at`, with the app still not running. iOS 18-26 only: there the intent runs in the extension; on iOS 27+
     /// it is pinned to the app process (RefreshWidgetIntent.allowedExecutionTargets), so "without the app" is not the
-    /// claim. Needs T-1440's Button(intent:) for the tap to reach the intent. Skipped where no iOS 18-26 runtime runs it:
-    /// the Mac mini has iOS 27.0/27.1 only, and the MacBook runner takes its newest runtime (runner.py _simulator).
+    /// claim. Needs T-1440's Button(intent:) for the tap to reach the intent. Skipped on iOS 27+: Xcode 27.1 offers no
+    /// iOS 18 runtime, so it runs on the Mac mini's iOS 26.0 runtime, on its own Simulator, with the lane forced
+    /// (WK_LANE's build). The MacBook runner takes its newest runtime (runner.py _simulator), so it skips there.
+    /// T-4417 L2 (t0678-pernille): the id's lane rows are counted across the tap, so a tap that costs two runs fails.
     func testQRefreshTapRunsInTheExtension() throws {
         let v = ProcessInfo.processInfo.operatingSystemVersion
         try XCTSkipUnless((18...26).contains(v.majorVersion),
-                          "T-0678: needs an iOS 18-26 runtime, this Simulator is iOS \(v.majorVersion).\(v.minorVersion); none is installed")
+                          "T-0678: needs an iOS 18-26 runtime, this Simulator is iOS \(v.majorVersion).\(v.minorVersion)")
         let id = "tap_" + Self.freshToken().lowercased()
         let group = try XCTUnwrap(Self.appGroupFolder(), "no group.app.pywidget folder on this Simulator")
         let script = group.appendingPathComponent("lane-scripts/\(id)", isDirectory: true)
         let folder = group.appendingPathComponent("widgets/\(id)", isDirectory: true)
+        let logFolder = group.appendingPathComponent("log/widgets/\(id)", isDirectory: true)
         addTeardownBlock { @MainActor in
             try? self.removeTreeWidgets()
-            for url in [script, folder] { try? FileManager.default.removeItem(at: url) }
+            for url in [script, folder, logFolder] { try? FileManager.default.removeItem(at: url) }
         }
         let app = XCUIApplication.pywidget()
         app.launch()
         XCTAssertTrue(app.wait(for: .runningForeground, timeout: 15), "the app did not launch")
         app.terminate()
+        // T-4417 L2: the id's lane rows (RunLogStore's log/widgets/<id>/runs.jsonl), so a tap that runs twice fails.
+        func rows() -> [[String: Any]] { Self.benchLines(logFolder.appendingPathComponent("runs.jsonl")) }
+        func laneRows() -> [[String: Any]] { rows().filter { $0["lane"] as? String == "widget" } }
         try FileManager.default.createDirectory(at: script, withIntermediateDirectories: true)
         try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
         let manifest = #"{"schema": "pywidget.app", "name": "Tap check", "entry": "main.py", "lane": "widget"}"#
         try Data(manifest.utf8).write(to: script.appendingPathComponent("pywidget.json"))
-        // A new token every run: the nanosecond clock, so two runs never draw the same text.
+        // A new token every run: the nanosecond clock, so two runs never draw the same text. "TOK", not "T": a bare T
+        // and digits also matches tree.json's ISO dates (sampled_at "...T03:..."), which read the same before and after.
         let code = """
         import time
         import pywidget_ui as ui
         widget = ui.Widget("\(id)", name="Tap check", families=["systemSmall"])
-        widget.render(lambda ctx: ui.VStack(ui.Spacer(), ui.Text("T%d" % (time.time_ns() % 1000000007)), ui.Spacer(), ui.RefreshButton()))
+        widget.render(lambda ctx: ui.VStack(ui.Spacer(), ui.Text("TOK%d" % (time.time_ns() % 1000000007)), ui.Spacer(), ui.RefreshButton()))
         """
         try Data(code.utf8).write(to: script.appendingPathComponent("main.py"))
 
@@ -1317,24 +1324,35 @@ final class WidgetKitCheckTests: XCTestCase {
         try setWidget(placed, to: id)
         let tree = folder.appendingPathComponent("tree.json")
         func treeText() -> String { String(decoding: (try? Data(contentsOf: tree)) ?? Data(), as: UTF8.self) }
-        func token(_ text: String) -> String? { text.range(of: #"T[0-9]+"#, options: .regularExpression).map { String(text[$0]) } }
+        func token(_ text: String) -> String? { text.range(of: #"TOK[0-9]+"#, options: .regularExpression).map { String(text[$0]) } }
         var wait = Date().addingTimeInterval(40)
         while token(treeText()) == nil, Date() < wait { usleep(250_000) }
         let before = try XCTUnwrap(token(treeText()), "the extension wrote no tree.json for \(id)")
         XCTAssertEqual(app.state, .notRunning, "the app ran before the tap")
+        sleep(3)  // a reload WidgetKit makes after the placement settles before the count
+        let rowsBefore = laneRows().count
+        let allBefore = rows().count
 
         // The button, by its VoiceOver name where the Home Screen exposes it, else its 44 pt area at the bottom centre,
         // inside the widget's 16 pt content margin (TreeRefreshButton.tap).
-        let button = placed.buttons["Refresh"]
+        // iOS 26.0 exposes Button(intent:) as a Button inside a Button, both "Refresh": the outer one (firstMatch).
+        let button = placed.buttons["Refresh"].firstMatch
         if button.exists { button.tap() } else {
             placed.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5)).withOffset(CGVector(dx: 0, dy: placed.frame.height / 2 - 38)).tap()
         }
         wait = Date().addingTimeInterval(30)
         while token(treeText()) == before, Date() < wait { usleep(250_000) }
         let after = token(treeText())
-        print("T-0678 TAP \(id) before=\(before) after=\(after ?? "nil")")
+        // The reload WidgetKit makes after the intent is where a second run would come from (LaneRerunRule keeps it out).
+        sleep(10)
+        let tapRows = Array(laneRows().dropFirst(rowsBefore))
+        let anyRows = Array(rows().dropFirst(allBefore))
+        print("T-0678 TAP rows in any lane +\(anyRows.count) \(anyRows.map { "\($0["lane"] ?? "?")/\($0["trigger"] ?? "?")/\($0["outcome"] ?? "?")" }) app state \(app.state.rawValue)")
+        print("T-0678 TAP \(id) before=\(before) after=\(after ?? "nil") lane rows \(rowsBefore) -> +\(tapRows.count) \(tapRows.map { "\($0["trigger"] ?? "?")/\($0["outcome"] ?? "?")" })")
         XCTAssertNotNil(after)
         XCTAssertNotEqual(after, before, "the tap wrote no new token")
+        XCTAssertEqual(tapRows.count, 1, "one run per tap")
+        XCTAssertEqual(tapRows.first?["trigger"] as? String, "intent", "the tap's row says intent (B5)")
         XCTAssertEqual(app.state, .notRunning, "the tap launched the app")
     }
 
```
{% endraw %}

</div>
