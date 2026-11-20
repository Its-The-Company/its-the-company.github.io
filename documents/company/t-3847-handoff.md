---
layout: "default"
title: "T-3847 handoff (Idris, 2026-11-20): launcher UI test through the real URL entry point"
section: "documents"
description: "Paused, not committed: the Investors asked for the Mac mini to be kept clear of Xcode and Simulator runs until the pre-comparison work is done (an Investor, #325, about 2:25 PM ET 11-20). The code is in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-3847-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-3847-handoff.md</code></span></div><h1>T-3847 handoff (Idris, 2026-11-20): launcher UI test through the real URL entry point</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Paused, not committed: the Investors asked for the Mac mini to be kept clear of Xcode and Simulator runs until the
pre-comparison work is done (an Investor, #325, about 2:25 PM ET 11-20). The code is in `T-3847-handoff.patch` next to
this note. Pernille's finding: pywidget/docs/reviews/t3666-pernille.md, M1.

## What the patch does (3 files, from the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> draft 2f30fd4053, unchanged)

- `pywidget/ios/UITests/LauncherTapUITests.swift`: both tests open `pywidget://open?slot=x` the way a widget tap
  does, from the Home Screen via `XCUIDevice.shared.system.open` (the Debug build registers the scheme,
  scripts/debug_url_scheme.sh), so the link arrives through the window's `onOpenURL`. No `-ui-launcher-url`.
- `pywidget/ios/App/LauncherTapHandling.swift`: the DEBUG hook is deleted (`testURL`, `wasBackground`, the two
  scenePhase lines); `onChange(of: scenePhase)` now only calls `openPending()`.
- [`pywidget/docs/design/launcher/tap-path.md`](../pywidget/tap-path.html) item 6: describes the new path and drops the launch-argument text.

## Runs on 11-20, all iPhone 17e, XC_LOCAL=1 (logs in this worktree's ops/runs/)

- Red, seen: test change applied, hook still in place, and the presenter mutated to present from the root controller
  (the old one-sheet path). `testSetUpSheetShowsOverTheGalleryDetailSheet` failed at LauncherTapUITests.swift:74,
  "the Set Up App sheet did not show over the gallery's detail sheet"; the gate-off test passed.
  xcodebuild-20261120-114730.log (2 run, 1 failure). Two runs before it (112931, 113552) never started: the
  Simulator refused the test runner ("Busy, Application failed preflight checks") while a PyWidget app process
  left from an earlier run was still alive; `simctl terminate` of that app cleared it.
- With the mutant reverted and the hook deleted, every check `feature_session.py plan T-4185 T-3847` printed:
  build-for-testing green (131404); WidgetTapRoutingTests 15/0 (132513); LauncherTapUITests +
  LauncherWindowsUITests 8 run, 0 failures, 6 skipped (132757; the 6 are the iPad window tests, which skip on
  iPhone by design); whole PyWidgetTests 2164 run, 0 failures, 2 skipped (125339).
- Host suites: the first `host_keep.py run` was red in 2 suites, `bridge` and `stdlib` on 3.13 (machine load
  about 160). Rerun alone: `bridge` passed on 3.13; `stdlib` passed on /usr/bin/python3 (78 tests); `stdlib` on 3.13
  hit the 600 s limit (the install_stdlib.sh rsync), then passed with `--timeout 1800` (78 tests, 432 s). Those
  reruns were run with run_host.py directly, so host_keep kept no pass for them.

## What is left

1. Apply the patch: `git apply ops/plans/T-3847-handoff.patch` (from the repository root; the three files had not
   changed on main since 2f30fd4053^ when this note was written).
2. Once the freeze <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>, run `python3 tools/feature_session.py plan T-4185 T-3847` and every check it prints again
   on the commit's tree (the runs above are on the same content, but no commit carried them). The host step keeps
   the passes that are still valid for that content.
3. One commit "T-3847 Idris: ..." with Plain/Evidence/ws lines, then `python3 tools/feature_session.py check T-4185
   --worker Idris`. Pernille reviews at the merge (Commandment 13). Not ticked.
{% endraw %}

</div>
