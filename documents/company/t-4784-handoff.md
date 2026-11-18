---
layout: "default"
title: "T-4784 handoff (2026-11-17 23:59, lane a3)"
section: "documents"
description: "Paused: the Mac mini&#x27;s disk is under tools/xc.sh&#x27;s 20 GB line (11 GB free after its clean), so the new test has not run. Nothing for T-4784 is committed except Idris&#x27;s memory and a note event."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4784-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 28 · Wed Nov 18</span><span><code>ops/plans/T-4784-handoff.md</code></span></div><h1>T-4784 handoff (2026-11-17 11:59 PM, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Paused: the Mac mini's disk is under tools/xc.sh's 20 GB line (11 GB free after its clean), so the new test has not run. Nothing for T-4784 is committed except Idris's memory and a note event.

- The board line asks for a source-scan pin. The pre-commit hook refuses that (tools/test_health.py lint; standing <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> an Investor #41 c6951158380, T-4753: no new source-text tests). A first version that read Shared/TreeView.swift went green 54/0 (ops/runs/xcodebuild-20261117-233756.log) and red on the mutant (ops/runs/xcodebuild-20261117-234144.log), but it can't be committed.
- Its replacement is uncommitted in this worktree (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> with the branch): `testTheRefreshGlyphWrappersKeepTheirStyle` in pywidget/ios/Tests/RefreshAgeRendererTests.swift. It checks the static type of `TreeRefreshButton.Drawn.body` (Button with `.buttonStyle(.plain)`, Link with nothing added) and uses Mirror to check each tap's branch. The pixel test's doc comment and message are narrowed to frame, inset and ink.
- Left: with 20 GB free, run `XC_TASK=T-4784 tools/xc.sh` on `-only-testing:PyWidgetTests/TreeNodesTests` (green), then again with `.buttonStyle(.plain)` deleted from TreeView.swift:689 (the new test red), restore TreeView.swift, run the full PyWidgetTests, and commit the test file as "T-4784: ...".
{% endraw %}

</div>
