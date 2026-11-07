---
layout: "default"
title: "T-3170: review of T-3149, premade first renders (Idris, ee21e002f)"
section: "documents"
description: "Verdict: PASS. The first thing that broke was a test, not the fix: testF no longer proves anything about the placed path (F2). The product change does what the iPhone report needs. After the app&#x27;s first open every\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3149-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t3149-pernille.md</code></span></div><h1>T-3170: review of T-3149, premade first renders (Idris, ee21e002f)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS.** The first thing that broke was a test, not the fix: testF no longer proves anything about the placed
path (F2). The product change does what the iPhone report needs. After the app's first open every offered premade has
a tree.json, so a premade chosen later in Edit Widget draws instead of "No view for this size". No crash, data loss,
App Review or extension-budget problem. Findings: 0 High, 2 Medium, 4 Low. None blocks build 3, so none is a FAIL
finding and I added no board line. They are for Idris after build 3. This file replaces my first pass at
reviews/T-3170.md (16fa3328e). That pass reached the same findings. Each one is re-checked here at HEAD.

Read: ee21e002f and, at HEAD 922b09104, WidgetWriter.swift (`offeredPremades`, `passIDs`, `refreshPlaced`,
`refresh(_ ids:)`, `WidgetPasses`), RunResultSink.hasTree, TreeView.swift's card order, the 12 premade scripts'
`stale_after`, both new BridgeTests, testM and testF in WidgetKitCheckTests, and the evidence folder. No commit after
ee21e002f touches pywidget/ios/App, Shared or Extension (`git diff ee21e002f HEAD --stat`), so build 3 carries the
reviewed code. I did not read Idris's notes beyond the commit message.

## Runner checks

- **MacBook full suite, covering the reviewed commit:** J-20261107-0813-xc-test at dd99eefbf passed: 1493 executed,
  23 skipped, 0 failures, 2478 s. ee21e002f is an ancestor of dd99eefbf (`git merge-base --is-ancestor`). Between
  them, the product code and the two new BridgeTests are unchanged. `--full` includes the UI target. testM is on
  setUp's alpha-pack list and has no `XCTSkip` path, so it ran in that suite and passed. I queued nothing new.
- The earlier job at this commit, J-20261106-2159-xc-test (96d68c2e5), **failed: exit 65 after 61.6 s, with no test
  results kept.** That is a build or start failure, not a test verdict. The green suite above, at a later commit with
  the same product code, supersedes it.
- **Still owed, not run by me:** a Release Simulator run of testM and testF. The runner takes Debug only, and this
  task forbids local xcodebuild. Idris's Release evidence covers testF at build 2's source only.

## What I checked and found sound

- **Order and console Run.** `passIDs` puts the placed ids first, then the offered premades that have no tree
  (WidgetWriter.swift:127-134). `refresh(_ ids:)` checks `appRunPending` before each id (:193), so a console Run still
  waits behind at most one widget run, including the appended premades.
- **No duplicates.** An id that is both placed and offered runs once, in its placed slot (`seen = Set(placed)`,
  :128). An id repeated in `offered` also runs once. The first unit test pins both.
- **Pro.** `offeredPremades` calls `includeLocked: false` with the same `ProEntitlement.gates()` that `mayWrite` asks
  (:117-119). A locked Pro premade is never run. A tree left from an earlier entitlement never shows, because the Pro
  card draws ahead of any tree (TreeView.swift:71-73).
- **Permissions.** Unplaced premade runs are `.widget` runs. Sun, Distance and Altitude never raise a location
  prompt for a widget nobody placed. GitHub makes no request without a saved repo.
- **Extension budget.** Unchanged. The extension still reads one tree.json. The new work runs in the app process,
  one run at a time. Disk: Countdown's tree is 27,253 B, so all 12 premades fit in under 0.5 MB.
- **`hasTree`** (RunResultSink.swift:49) only checks that the file exists, and it returns false for an id that
  `WidgetFolder.url` rejects. `offered` comes only from the bundled flag list, so that branch is never reached.
- **The tests pin the bug.** The evidence shows `testT3149...` red under build 2's rule and green with the fix. Its
  second `refreshPlaced` returning `[:]` pins "a premade that has a tree is not run again while unplaced".

## Findings

1. **Medium. A premade chosen before the app's first open still shows "No view for this size."**
   WidgetWriter.swift:119-126, TreeView.swift:80. The fix needs one app open. A TestFlight tester who adds the widget
   and picks Countdown before opening the app sees the build-2 symptom, and the card's wording is wrong because
   nothing is wrong with the size. This is not a regression. The board line already asks Maren for copy. Two ways to
   close it: put each premade's default first render in the extension bundle and read it when widgets/<id>/tree.json
   is missing, or show a dedicated "Open PyWidget once" card. The first costs about 330 KB in the appex (12 x ~27 KB).
   Measure that against the appex and keep one copy, not a second in the app.
2. **Medium. testF no longer tests the placed path.** UITests/WidgetKitCheckTests.swift:304-337. testF deletes
   Countdown's tree, places Countdown, taps it, and waits for tree.json. Countdown is now also offered with no tree,
   so the app's pass writes that file either way. If `placedNow()` broke (WidgetCenter configurations, or decoding the
   intent), placed user widgets would stop updating and testF would stay green. The unit tests inject `placed`, so
   nothing on a real Home Screen covers that path any more. Fix: give Countdown a tree before the tap and assert the
   tap rewrites it (mtime or `sampled_at`), or switch testF to a user script, which is never offered.
3. **Low. A second activation during the first pass runs everything again.** WidgetWriter.swift:145 with :428-432.
   `ids` is built (including the `hasTree` reads) before the call waits on a pass in flight. Some activations land
   during first launch's long pass: a dismissed alert, Control Center, Face ID. Such an activation gets a different
   list, so it does not join the pass in flight. It then runs every placed widget again, plus the premades that pass
   A has just written. That roughly doubles the Python work on first launch. Fix: re-check `hasTree` inside the run
   closure, or build `ids` inside the pass.
4. **Low. The 30 s spacing is skipped once right after a first-render pass.** WidgetWriter.swift:433. The next
   activation's ids are the placed ids alone. They no longer equal `last.ids`, so the pass runs immediately. This
   happens once per new-tree event (first open, Pro gained, a new premade), but it breaks T-0690's rule. Fix: space
   on the placed part only.
5. **Low. testM's last assertion passes on the wrong card.** WidgetKitCheckTests.swift:371-373. "No 'No view' text,
   and some text" also passes when the widget shows the Choose card or the Pro card, for example when the Edit Widget
   choice did not stick. Assert Countdown's own text instead. With no events set, it draws "No events".
6. **Low. The doc comment overstates staleness, and a failing premade re-runs on every pass.** WidgetWriter.swift:125
   says "its own stale rule says when that render is old". Seven of the 12 premades set no `stale_after`: clocks,
   countdown, habits, progress, quote, shortcuts and sun. A first render can be days old when someone picks it, and it
   carries no stale mark. A placed widget behaves the same way when the app stays closed, so this is not new, but the
   comment should say so. Also, a premade whose run writes no tree (an error, `tree_too_large`, or a stuck run) stays
   "unrendered". It then runs on every pass that is not spaced out, including the Refresh Widgets intent's background
   run. No shipped premade does this today. Fix: allow one try per launch.

## Board

No line added: the verdict is PASS and no finding is a FAIL. On 11-06 the classifier refused my line for findings 2-6
(T-3186). Under T-0848 I have not added it again. The drafted line is at the end of reviews/T-3170.md.
{% endraw %}

</div>
