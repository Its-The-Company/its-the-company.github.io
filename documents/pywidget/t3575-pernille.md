---
layout: "default"
title: "T-3575: review of 18ab65d65 (Idris, T-3572): a premade&#x27;s failed first run writes its Run log row"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. The change does what its line says: a premade&#x27;s widgets/&lt;id&gt;/ is made before the hold, so a failed first run, in either lane, writes its row, its detail and status.json. A user\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3575-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3575-pernille.md</code></span></div><h1>T-3575: review of 18ab65d65 (Idris, T-3572): a premade's failed first run writes its Run log row</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13, before build 4 (T-3574). Investor bug #41.
Read: pywidget/ios/Shared/RunLog/RunLogStore.swift (the change and `recordWidgetRun` around it),
pywidget/ios/Tests/Core/RunLogRecorderTests.swift (the two new tests), and the folder readers listed below.

**Verdict: PASS with findings.** Nothing High. The change does what its line says: a premade's
`widgets/<id>/` is made before the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>, so a failed first run, in either <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, writes its row, its detail
and status.json. A user id's missing folder is still not made. The rule is the sink's own
(`RunResultSink.premadeFoldersOnly`, Shared/Bridge/RunResultSink.swift:42): the same prefix and the same
`createDirectory` call. So no folder can appear that a good tree would not have made anyway.

## Runs

- Runner job J-20261108-0912-xc-test at 24b4a2b9c (the d3d39da37 tree plus the job file):
  `PyWidgetTests/RunLogRecorderTests`, `LocationAuthorizationChangeTests`, `RefreshOutcomeRuleTests`:
  72 executed, 0 skipped, 0 failures, exit 0 (ops/runs/xcodebuild-20261108-091533.log).
- Host, pywidget/ios/Core: `swift test --filter "RunLogRecorderTests|RefreshOutcomeRuleTests"`: 71 tests, 0 failures.
- Mutants (tools/mutation_check.py, scratch copy at HEAD, `--filter RunLogRecorderTests`, baseline 52 green):
  - `if false` (no premade folder): KILLED, 132 failures.
  - `if true` (every id's folder made): KILLED, 3 failures (the user-id test holds T-0753's half).
  - folder made in log/widgets/ in place of widgets/: KILLED, 132 failures.

## What I checked and found sound

- Who reads `widgets/` by listing it. An empty premade folder is already a state the sink can leave
  (a folder made, then a tree refused by the schema check), so these were not new, but I read them:
  - `WidgetChoices.offered` (Shared/WidgetPlacement.swift:52) drops first-party ids from the library, so
    the folder adds no row to the picker.
  - `TreeFile.neverDrawn` (Shared/WidgetPlacement.swift:251): `.noFolder` for a premade and `.absent`
    both give `true`, so the home-screen card is still the first-draw card, as before the change.
  - `WidgetWriter.passIDs` (App/Bridge/WidgetWriter.swift:129) keys on tree.json, not the folder, so a
    premade with a folder and no tree is still run by the next pass.
- The test reads the premade list from widgets/premade/*.py, so a premade added later is covered. It
  checks the folder is made for the log and that no tree.json is invented.

## Findings

**L1 (Low). The home screen still says "waiting" for a premade the log knows has failed.**
pywidget/ios/Shared/WidgetPlacement.swift:191-194 and :251-254. After this change a premade whose first run
failed has a row and a status.json with `last_outcome: error`, but `decide` still returns `.firstDraw`,
because the first-draw card reads only tree.json. Failure case: on Jeremy's phone, Steps fails its first
run with ViewTreeError. Settings > Run log now shows the error, but the placed widget keeps the first-draw
card, which says Steps is waiting to draw, for as long as the run keeps failing. The two surfaces disagree.
This was the same before 18ab65d65 and does not block build 4. It belongs with T-3364/T-3393 and Maren's
first-draw card: should a premade that has a status.json error show the error card in place of first-draw?

**I1 (Info). The comment says "not in the core package".**
RunLogStore.swift:77. `RunResultSink` is not in Core, so the rule is written twice: once as a closure, once
as `hasPrefix` here. If the premade rule ever changes (for example, to "premade in the bundle"), both places
must change. One shared `WidgetID.isPremade(_:)` in Core would keep them in step. Optional.
{% endraw %}

</div>
