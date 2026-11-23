---
layout: "default"
title: "Review: T-3847, the launcher UI test opens its link through onOpenURL (T-4185)"
section: "documents"
description: "Verdict: approve. M1 is met. Three Lows, none blocking."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3847-a6b76bfd-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 32 · Sun Nov 22</span><span><code>pywidget/docs/reviews/t3847-a6b76bfd-pernille.md</code></span></div><h1>Review: T-3847, the launcher UI test opens its link through onOpenURL (T-4185)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-22. Commandment 13, independent; pre-release standard (#192). Reviewed: Idris a6b76bfdd1
(App/LauncherTapHandling.swift, UITests/LauncherTapUITests.swift, docs/design/launcher/tap-path.md), the whole
`git diff 915c973091..HEAD -- pywidget/` on personal/b3. It answers my t3666-pernille.md M1 (task T-3680).

**Verdict: approve.** M1 is met. Three Lows, none blocking.

## Against M1

- **Hook gone.** `testURL`, `wasBackground` and the `#if DEBUG` lines in `onChange` are deleted
  (LauncherTapHandling.swift:35-40). `git grep ui-launcher-url` finds it only in reviews, plans and board text. No
  Debug-only code is left in the file, so there is nothing to leak into Release. The scheme is still registered only
  in Debug (project.yml:388, scripts/debug_url_scheme.sh, unchanged here).
- **Real entry point.** Both tests go Home and call `XCUIDevice.shared.system.open(pywidget://open?slot=x)`
  (LauncherTapUITests.swift:25-32), so the link reaches the window's `onOpenURL` (LauncherTapHandling.swift:37).
- **Red run is real.** <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b2 ops/runs/xcodebuild-20261121-141636.log (xc.jsonl start 1795288598, exit 65,
  `-only-testing:PyWidgetUITests/LauncherTapUITests`, iPhone 17e). The gallery test logs "Opening default application
  for URL pywidget://open?slot=x" at 16.70 s, no Springboard prompt, the app comes forward, and then it fails at :74
  "the Set Up App sheet did not show over the gallery's detail sheet". So the failure is the sheet, not the delivery.
  The gate-off test passed. The three files at the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> draft 9f90d8f0d3 are byte-identical to a6b76bfdd1.
- **Green.** origin/macbook-results J-20261122-2143-land-chk-a5ab71-2-495654: commit 42c2f9ac, exit 0, status passed,
  8 executed, 6 skipped, 0 failures. That fits 2 LauncherTapUITests plus LauncherWindowsUITests' 6 (iPad only). The
  unit job J-20261122-2133-...-11907c at 34798eda: 2187 executed, 0 failures. Both pre-merge commits have the same
  pywidget/ tree as a6b76bfdd1 (`git diff --stat` empty).
- **No fixed sleeps.** Every wait is a bounded `waitForExistence` or `wait(for:)`.
- **tap-path.md item 6** (lines 30-33) matches the code.

## Findings

**L1. The gate-off test's red was shown on the old path only** (LauncherTapUITests.swift:34-36). The text "this one was
red with the gate in `handle` removed" is T-4215's run, made through the hook. Nobody has rerun it through
`system.open`. It can still fail: :31 shows that the system delivered the link to this app, and the sibling test
shows that the same steps reach `onOpenURL`. Also, the gate lives in `LauncherTapRoute.tap` (LauncherTapHandling.swift:72),
not in `handle`. Doc wording only. Not blocking.

**L2. The Springboard prompt wait is 2 s** (LauncherTapUITests.swift:30). If an "Open" prompt comes later than that, the
test fails after 20 s at :31. That is not a fixed sleep, and LauncherWindowsUITests.swift:102 does the same, but
`tapFromHome` now copies `tap` (LauncherWindowsUITests.swift:98-104). Moving one shared helper into UITestLaunch.swift
would keep them from drifting apart. Not blocking.

**L3. The evidence paths are not lane-qualified.** The commit body cites ops/runs/xcodebuild-20261121-14*.log, but those
logs are in lane b2, not b3. The green job's log (ops/runs/xcodebuild-20261122-214557.log) is not on this machine,
and result.json gives counts but no test names, so I could not read which 8 tests ran. The counts agree with the
claim. Not blocking.
{% endraw %}

</div>
