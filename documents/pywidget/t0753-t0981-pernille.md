---
layout: "default"
title: "T-0981: review of T-0753 (a run of the old id never brings back a moved folder), Pernille, 2026-11-02"
section: "documents"
description: "Commit: f27f834f (Idris). Not mine. Line from my T-0752 re-review, M4."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0753-t0981-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0753-t0981-pernille.md</code></span></div><h1>T-0981: review of T-0753 (a run of the old id never brings back a moved folder), Pernille, 2026-11-02</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: **PASS**

Commit: f27f834f (Idris). Not mine. Line from my T-0752 re-review, M4.

What the line asked: a widget run of the old id that ends after send moved weather -> tide must not bring back
widgets/weather/ (tree.json, no main.py). Sink writes only into an existing folder for a user id and creates
only for a bundle premade, or the move waits for/drops the run; a test: send weather, hold its run, change id,
finish the run, no widgets/weather.

## What I checked

- `RunResultSink.finish` (`RunResultSink.swift:105-115`): `makesFolder(id)` decides; otherwise a missing folder
  gives `noTree("widget folder gone")`. If the move lands after that check, nothing below creates the folder:
  the lock open has no parent to create into and the atomic write has no directory, so it fails as `write failed`.
- Every production sink: the app's (`RunResultSink.app`, `WidgetWriter.swift:189`) and the extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s
  (`ExtensionLane.swift:87`) use `premadeFoldersOnly`; the only `makesFolder = true` left is the debug token hook
  in `WidgetRunView.sink` (new_widget, which no send writes) and the struct default for test callers. All three
  `sink.finish` call sites are covered.
- Lane widgets: `WidgetScriptSave` writes widgets/<id>/main.py first and mirrors to lane-scripts/<id>/ as its
  last step, so a lane widget always has its widgets/<id>/ before the extension writes a tree. No regression there.
- `WidgetMoveRaceTests.swift`: the line's own scenario (held run, id change, no weather folder, not listed, no
  reload, tide intact, tide's run writes), a premade control, and the sink rule alone. The commit says it fails
  against the old rule.

## Findings

- **L1 (Low, no action):** `premadeFoldersOnly` tests the prefix exactly, not by `WidgetID.key` (same note as my
  T-0967 review). A non-lower-case premade id gets no folder made and no tree; nothing produces one today.
- **L2 (Low, no action):** if the move lands during `Data.write(.atomic)` itself, the temporary file can end up in
  the moved folder (widgets/tide/) and the final rename fails. One stray temp file, no tree, no folder brought
  back. Not worth code.

## Not run

Swift tests need Xcode; Idris holds the slot. The commit reports PyWidgetTests 662 tests, 0 failures; I did not
rerun them.
{% endraw %}

</div>
