---
layout: "default"
title: "T-4185 handoff"
section: "documents"
description: "Paused by Investor ruling: Evan, #325 c7067981085, Sat 2026-11-21 2:23 PM ET, &quot;Stop the app work until the comparison work is done&quot;. The step in hand was T-3847 (the launcher UI test opens the link through onOpenURL\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4185-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/T-4185-handoff.md</code></span></div><h1>T-4185 handoff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Paused by Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>: Evan, #325 c7067981085, Sat 2026-11-21 2:23 PM ET, "Stop the app work until the comparison
work is done". The step in hand was T-3847 (the launcher UI test opens the link through onOpenURL; the Debug
`-ui-launcher-url` hook goes; Pernille's t3666 review M1).

## Done

- Draft restored from refs/archive/<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/b2/20261116-224431-7201 onto personal/b2 (28b18df42e): the hook
  (`testURL`, `wasBackground`) is deleted from App/LauncherTapHandling.swift; both LauncherTapUITests tests go Home and
  open `pywidget://open?slot=x` with `XCUIDevice.shared.system.open` (Springboard's "Open" accepted if it asks);
  tap-path.md item 6 says so.
- Red run, against a temporary mutant: `show` put back on the old root `.sheet(item:)` path, as Pernille's M1 asks.
  Build ops/runs/xcodebuild-20261121-141431.log (exit 0). Test ops/runs/xcodebuild-20261121-141636.log, xc.jsonl row
  start 1795288598, exit 65: 2 tests, 1 failure, LauncherTapUITests.swift:74 "the Set Up App sheet did not show over
  the gallery's detail sheet". The app came forward from the link first, so the failure is the sheet, not the
  delivery. The gate-off test passed.
- Mutant removed (no `T3847-MUTANT` line left). Host suites on the final tree: `host_keep.py run --task T-3847`,
  21 suites, 1938 tests, 0 failed.

## In flight

Nothing. No Xcode run is going.

## Uncommitted (left in place, not reverted)

- pywidget/ios/App/LauncherTapHandling.swift
- pywidget/ios/UITests/LauncherTapUITests.swift
- pywidget/docs/design/launcher/tap-path.md

(handbook/rules.md and log/rulings.md also show as modified in this worktree. They are not mine, and I left them alone.)

Operator, 2:31 PM ET 11-21: the three files' draft is saved as refs/archive/parked/b2/20261121-1435-T-3847-paused
(9f90d8f0d3, a stash-style commit on 28b18df42e; its first parent is the base) and the worktree is clean again.
Restore with `git diff 9f90d8f0d3^1 9f90d8f0d3 | git apply`, then go on from Next step. (The rulings and Handbook
changes were the Operator's ruling record, committed as e120e384ba.)

## Next step (once the pause <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>)

From `python3 tools/feature_session.py plan T-4185 T-3847`, all with XC_LOCAL=1 XC_TASK=T-3847 via tools/xc.sh:
1. build-for-testing on the final tree (no green build of the mutant-free tree exists yet).
2. `-only-testing:PyWidgetTests/WidgetTapRoutingTests` test-without-building.
3. `-only-testing:PyWidgetUITests/LauncherTapUITests -only-testing:PyWidgetUITests/LauncherWindowsUITests`
   test-without-building: this is the green run.
4. Whole unit target once (`-only-testing:PyWidgetTests`).
5. One commit "T-3847 Idris: ..." with Plain/Evidence (the red row above plus the green row)/ws lines, the three files
   by path. Then `feature_session.py check T-4185 --worker Idris`.

## Commits

None for T-3847. Only this handoff.
{% endraw %}

</div>
