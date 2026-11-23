---
layout: "default"
title: "T-4772: a refresh tap on the iOS 27.0 and 26.0 Simulators"
section: "documents"
description: "WidgetKitCheckTests.testQRefreshTapRunsInTheExtension as on main (9496e859fa on; this copy at 33b203aef0), run on the Mac mini through pywidget/ios/scripts/widgetkit_check.sh with\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4772-tap-runs.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 33 · Mon Nov 23</span><span><code>ops/plans/T-4772-tap-runs.md</code></span></div><h1>T-4772: a refresh tap on the iOS 27.0 and 26.0 Simulators</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
`WidgetKitCheckTests.testQRefreshTapRunsInTheExtension` as on main (9496e859fa on; this copy at 33b203aef0), run on
the Mac mini through `pywidget/ios/scripts/widgetkit_check.sh` with `WK_ONLY=testQRefreshTapRunsInTheExtension`.
Plain Debug build, no <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> flag. The full xcodebuild logs are not in git (ops/runs is swept); the lines below are
copied from them as printed.

## iOS 27.0 (iPhone 17e, "pywidget-wk-check", 24A434): passed

Log ops/runs/xcodebuild-20261123-011535.log, 1:15 AM ET, 1 executed, 0 failures, 119.2 s.

```
T-4772 TAP iOS 27.0.0 tap_pwtphley before=PWMHCYMU after=PWWNATWF rows in any lane +1 ["app/intent/ok"] ran in the app; app state before 1, seen after the tap [3], now 3; button by name true
```

## iOS 26.0 (iPhone 16e, "pywidget-wk-check-26", 23A343): passed on the second run

The harness makes its device on iOS 27.0 only, so for this run its device name and runtime were changed in the copy
(NAME=pywidget-wk-check-26, iPhone-16e on iOS-26-0; iPhone 17e cannot be made on 26.0) and put back after; that edit
is not committed. The device was new.

- First run, log ops/runs/xcodebuild-20261123-012419.log, 1:24 AM ET: failed before the tap, while placing the widget:
  `WidgetKitCheckTests.swift:2268` (addTreeWidget: the Home Screen's "Add Widget" button did not appear), 29.5 s.
  A new Simulator's first UI run is known to stall like this.
- Second run, log ops/runs/xcodebuild-20261123-012845.log, 1:28 AM ET: 1 executed, 0 failures, 342.7 s.

```
T-4772 TAP iOS 26.0.0 tap_pwexaxam before=PWTRMCVY after=PWFHCYWK rows in any lane +1 ["app/intent/ok"] ran in the app; app state before 1, seen after the tap [3], now 3; button by name true
```

## What the runs show

On both runtimes one tap on the widget's Refresh button, with the app closed (state 1, not running), put a new token
in tree.json and on the widget's pixels (Vision read), wrote exactly one run row in any lane, `app/intent/ok`, and the
app was seen only in the background (state 3), never in the foreground (4). The process that ran the tap is the app's,
started in the background. iOS 18-25 and phones are not measured (T-5522).

## Left for a reviewed change

The comments in pywidget/ios/Shared/RefreshWidgetIntent.swift (lines 7-12) and RefreshTapRule.swift (lines 4-6) still
say that on iOS 18-26 a tap may run in the extension, with no word that both measured runtimes ran it in the app.
T-4415's decision (Idris with Ines and Maren, 2026-11-21, 6b15afb2f7) accepted the app-side tap, which is the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>
the line waited for. The correction is app code, so it needs a review record by another worker (tools/merge.sh step 3)
and is not in this change.
{% endraw %}

</div>
