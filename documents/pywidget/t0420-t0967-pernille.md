---
layout: "default"
title: "T-0967: review of T-0420 (premade lookups by key), Pernille, 2026-11-02"
section: "documents"
description: "Commits read: the review line names aea6e19f (comments only, Idris). The code is the commit one minute earlier, 91666d70 (Idris, same task), so I read both. Neither is mine."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0420-t0967-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0420-t0967-pernille.md</code></span></div><h1>T-0967: review of T-0420 (premade lookups by key), Pernille, 2026-11-02</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: **PASS**

Commits read: the review line names aea6e19f (comments only, Idris). The code is the commit one minute earlier,
91666d70 (Idris, same task), so I read both. Neither is mine.

What the line asked (from my T-0416 review of e93d5f36): `Premades.named` and `forWidgetID` compare by
`WidgetID.key` (ASCII lower-case, contract s7) with a test, or write down that premade ids are exact.

## What I checked

- `pywidget/ios/Shared/Premades.swift:85-95`: both lookups now key both sides with `WidgetID.key`;
  `forWidgetID` keys the whole id before the prefix check, so `PYWIDGET.PREMADE.COUNTDOWN` finds countdown.
  `WidgetID.key` (`WidgetID.swift:65`) folds A-Z only, so U+0130, the Kelvin sign and full-width letters do not match.
- `pywidget/ios/Tests/PremadesKeyTests.swift`: mixed-case and upper-case ids, `named` both ways, misses stay nil,
  four non-ASCII folds stay nil. That is the case the line asked for, and more.
- Callers: `RunScriptIntents.swift:101` (gated first by `ScriptQuery.entities`), `PyBridge.swift:144`
  (bundle file names only), `WidgetWriter.swift:58`, and `Premades.laneEntry`, which still demands
  `premade.widgetID == id` exactly. The extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> runs only the exact lower-case id; correct and deliberate.
- aea6e19f: the two doc comments now say what the code does.

## Findings

- **L1 (Low, no action):** `WidgetWriter.source(for:)` (`WidgetWriter.swift:58`) and
  `RunResultSink.premadeFoldersOnly` still test `hasPrefix(WidgetID.premadePrefix)` exactly. A non-lower-case
  premade id falls to the user branch and gets no source. No caller can produce one today: every premade entity id
  is `Premade.widgetID`, built lower-case. If an id from outside (a stored widget configuration) ever reaches it in
  another case, it runs nothing, which is the safe failure. Noted so nobody cites "premade ids compare by key"
  for those two sites.

## Not run

Swift tests need Xcode; Idris holds the slot, so I ran none. The test file reads correct against the code.
{% endraw %}

</div>
