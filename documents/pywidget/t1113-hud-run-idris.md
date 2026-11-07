---
layout: "default"
title: "T-1113: HUDHitTestUITests, one run and one mutant"
section: "documents"
description: "From T-0983 L1 and L2 (t0517-t0983-pernille.md). &quot;Passed is not the same as correct&quot;: the test had no recorded run."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1113-hud-run-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1113-hud-run-idris.md</code></span></div><h1>T-1113: HUDHitTestUITests, one run and one mutant</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
From T-0983 L1 and L2 (t0517-t0983-pernille.md). "Passed is not the same as correct": the test had no recorded run.

**Where it ran.** The Mac mini, not the MacBook runner (the personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> cannot queue ops/jobs/). Simulator iPhone 17e, iOS 27.0, Debug, after `xcodegen generate`. Disk 43-45 GB free, so the 20 GB line was open. Each run waited for the Xcode lock (701 s and 115 s) first.

## L1, the clean run (green)

    cd pywidget/ios && xcodegen generate
    tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination 'platform=iOS Simulator,name=iPhone 17e' \
        ONLY_ACTIVE_ARCH=YES test -only-testing:PyWidgetUITests/HUDHitTestUITests

Result: `Test Suite 'HUDHitTestUITests' passed`, 1 test, 0 failures, 23.3 s, `** TEST SUCCEEDED **`, exit 0.
Log: ops/runs/xcodebuild-20261102-201832.log (9324 lines). The run did not fail on the `hasKeyboardFocus` read or on the HUD frame, the two risks the review named.

## The tap-gesture mutant (red)

Run in a scratch copy of pywidget/ (never in committed files). One line of App/ReplBar.swift, `HUDView.body`:

    -        .allowsHitTesting(false)
    +        .onTapGesture {}

Same command, run from the scratch copy's pywidget/ios. Result: 1 test, 1 failure, exit 65, `** TEST FAILED **`:

    HUDHitTestUITests.swift:43: error: XCTAssertEqual failed: ("Optional(false)") is not equal to ("Optional(true)")
    - a tap through the HUD must reach the editor

It fails at the editor-focus assertion, the place the commit described, and not earlier: the HUD was found, sat over the editor and clear of Run, and the tap landed on the HUD instead of the editor.
Log: ops/runs/xcodebuild-20261102-203931.log (9908 lines).

The scratch copy needed a `tools` symlink for the package-staging build phase (first mutant attempt, log 203406, failed on a missing tools/pkg_stage.py and says nothing about the test).

## L2, the item for T-0479's device VoiceOver checks

T-0479's list lives only on its board line (ops/board.md), outside what this lane may change. Text to add there:

> VoiceOver, Copy All: the "Copied N lines" HUD announcement is heard after the menu closes (the menu's close moves focus back to the "more" button and speaks its label, which can cut the announcement off). If it is cut off, post it after a short delay or as an attributed string with `.accessibilitySpeechQueueAnnouncement`.
{% endraw %}

</div>
