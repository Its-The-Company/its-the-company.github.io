---
layout: "default"
title: "T-2676: review of T-1294, test G skips a family the case tree does not claim (Idris, 92b062d4)"
section: "documents"
description: "Verdict: PASS. The first thing to break would have been the sweep, and it no longer does: PWZZ-inline-first at systemMedium is now skipped and printed, not counted as missed. The change is in the UI test target only\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1294-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t1294-pernille.md</code></span></div><h1>T-2676: review of T-1294, test G skips a family the case tree does not claim (Idris, 92b062d4)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: PASS.** The first thing to break would have been the sweep, and it no longer does: PWZZ-inline-first at
systemMedium is now skipped and printed, not counted as missed. The change is in the UI test target only
(pywidget/ios/UITests/WidgetKitCheckTests.swift); nothing in it reaches the app, the extension or a TestFlight build.
Findings: 0 High, 0 Medium, 3 Low. No FAIL finding, so no board line.

Read: `git show 92b062d4`, and at HEAD 3d84d4dfb, test G (WidgetKitCheckTests.swift:166-228), `families(_:)` (:1188),
`install`, `homeWidgets`, `placeTreeWidgets`, setUp's skip list (:24-33), TreeView.swift's "No view for this size"
branch (:76-80), `ViewTreeEntry.root(for:)` (TreeTimeline.swift:80) and the fixture builder
(pywidget/ios/scripts/make_widgetkit_fixtures.py:156-190). Since 92b062d4, main changed this file only in setUp's skip
list (T-3149) and the new testM, neither in test G. TreeTimeline.swift changed (T-1440 age entries) but
`root(for:)`, which decides "No view for this size", did not.

## Runner checks

- **Compiled:** MacBook full suite J-20261107-0813-xc-test at dd99eefbf passed: 1493 executed, 23 skipped, 0
  failures, 2478 s. 92b062d4 is an ancestor of dd99eefbf (`git merge-base --is-ancestor`). `--full` builds the UI
  target, so the change compiles at a commit after it.
- **Not run there:** test G itself. setUp skips it unless `TEST_RUNNER_WK_TREES` is set, it also needs
  `TEST_RUNNER_WK_FIXTURES`, and `tools/runner_queue.py` cannot pass either. It is one of that suite's skips. A
  narrower runner job would skip it the same way, so I queued none.
- The commit cites a PWZZ run at ops/runs/xcodebuild-20261104-213928.log. That log is not on this machine. I cannot
  confirm it. The 231-case sweep the original failure came from was not rerun after the change; the board line asked
  only for the PWZZ rerun.

## What I checked and found sound

- **The PWZZ case.** The fixture claims `["systemSmall", "accessoryInline"]` and gives a view for exactly those two.
  In the small phase, systemSmall is shot and must read "PWZZ" (the token is the whole Text), systemMedium is skipped.
  In the large phase both home families are unclaimed, so the case is skipped without an install. The lock phase is
  untouched and still installs and shoots every case.
- **Every other case.** `live_text_doc` claims all six families with one `view`, so `shot == families` and the loop
  is unchanged for them. No case lost coverage.
- **A misread is not a skip.** An empty `widget.families` fails with the tree's path (`XCTAssertFalse`), then skips
  the shot. With `continueAfterFailure = true` the sweep goes on and the test still fails.
- **Name clash.** `self.families(tree)` calls the helper, not the phase's local `families` array. The comment says so.

## Findings

1. **Low. WidgetKitCheckTests.swift:199-206. The skip test asks `widget.families`; the extension asks `views`.**
   The extension draws "No view for this size" when `root(for:)` (`views[family] ?? view`) is nil
   (TreeTimeline.swift:80, TreeView.swift:78-80). It never reads `widget.families`. The two agree for every fixture
   today. A later fixture with one `view` and fewer `families` would draw at a skipped family, and test G would not
   look. A fixture with a family in `families` but missing from `views` fails, which is correct. User impact: none;
   this is a test-only <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> spot. Fix when convenient: skip on "no `views[family]` and no `view` in any entry".
2. **Low. WidgetKitCheckTests.swift:200. A case folder without a readable tree.json now stops the sweep.** `try
   self.families(tree)` throws before `install`, and a throw ends test G at that case. Before, `install` asserted and
   the sweep moved on. The method's doc says "One crash does not stop the sweep". The builder always writes tree.json,
   so this only bites a broken fixture directory. User impact: none.
3. **Low. Evidence. Test G has no runner path.** The only run of the changed test is the author's, and its log is
   not in the repository. Until the runner can set `WK_TREES` and `WK_FIXTURES`, a regression in test G is caught only by
   a hand run of scripts/widgetkit_check.sh. User impact: none directly. The 231-case failure
   was found by such a hand run, not by a suite.
{% endraw %}

</div>
