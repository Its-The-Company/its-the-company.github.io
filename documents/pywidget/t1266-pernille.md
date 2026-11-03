---
layout: "default"
title: "Review: T-1266 (widgetURL goes through TreeRules.linkURL), commit 55a42d03"
section: "documents"
description: "Verdict: pass with notes. F1 is closed: the widgetURL path at pywidget/ios/Shared/TreeView.swift:414 now has a test that sees it, the control is real, and every E5 refused row goes through it. One Low finding (F1 below)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1266-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1266-pernille.md</code></span></div><h1>Review: T-1266 (widgetURL goes through TreeRules.linkURL), commit 55a42d03</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-1282). Author: Idris. Judged from `git show 55a42d03` and my own runs, not the author's notes.
Scope: `testRefusedDestinationsSetNoWidgetURL` and `urlsInBody` in `pywidget/ios/Tests/TreeNodesTests.swift:359-385`,
and `pywidget/ios/Tests/mutants-t1266.json` (S5, S6). It answers my F1 / S5 in [`t1178-t1180-pernille.md`](t1178-t1180-pernille.html).

**Verdict: pass with notes.** F1 is closed: the widgetURL path at `pywidget/ios/Shared/TreeView.swift:414` now has a
test that sees it, the control is real, and every E5 refused row goes through it. One Low finding (F1 below) is against
the older Link test from T-1178, not this commit; it becomes T-1284 for Idris, and it does not <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> TestFlight.

## What I ran

Scratch copy (`git archive HEAD pywidget tools`; nothing under `pywidget/` or `tools/` changed between 55a42d03 and
HEAD f0b44c0d4), Vendor symlinked, `xcodegen generate`, own `-derivedDataPath`, iPhone 17e (iOS 27.1 Simulator).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:640px" markdown="1">

| Run | Result |
|---|---|
| `tools/xc.sh ... test -only-testing:PyWidgetTests/TreeNodesTests` | 28 tests, 0 failures |
| `tools/xc_mutants.py` on `mutants-t1266.json`, S5 (widgetURL via `URL(string:)`) | KILLED: 15 failures, all in `testRefusedDestinationsSetNoWidgetURL` (1 at :380, 14 at :382); `testRefusedDestinationsDrawNoLink` passed |
| same, S6 (Link branch via `URL(string:)`) | KILLED: 1 failure, `testRefusedDestinationsDrawNoLink` at :356 (https://example.com); the new test passed |
| My probe P1: widgetURL modifier dropped (valid url, nothing set) | KILLED: 1 failure, the control at :379 (`[]` is not `[pywidget://run?x=1]`) |
| My probe P2: widgetURL with a case-<span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> scheme check (`URL(string:)`, `scheme.lowercased() == "pywidget"`) | KILLED: 8 failures at :382 (PYWIDGET://, pywidget:/, newline, backslash, four non-ASCII rows) |
| My probe P3: the same case-blind check in the Link branch (`TreeView.swift:162`) | **SURVIVED** both tests (F1 below) |

</div>


So S5 dies by the intended test only, and S6 dies. The probe file is in my scratch, not committed; its three
find/replace pairs are written out above.

## The test, checked

- **It observes the widgetURL path.** `urlsInBody` walks `TreeNodeView(node:).body` with Mirror and collects every
  `URL` value. P1 shows the walk does see through `AnyView` storage: take the modifier away and the control fails. If a
  later SDK hides AnyView's storage from Mirror, the control fails loudly; it cannot turn into a silent pass.
- **The control is meaningful.** `Set(...) == [pywidget://run?x=1]` (:379). The set is right here: the modifier holds
  the URL twice (S5's failure lines show each URL two times), and the set still pins it to exactly that one URL, so a
  stray second destination would fail it.
- **The refused assertions compare the full array to `[]`** (:380, :382), so one stray URL anywhere fails, not just a
  widgetURL one. That is the strict reading, and the node is a bare Text, so nothing else carries a URL.
- **Every refused row is covered.** The loop at :381 runs all 35 rows of E5 `urls_refused` in
  `pywidget/tests/escape/cases.json` (the only refused-url list in the repo) plus https://example.com at :380. On this
  Foundation 20 of the 35 rows are nil from `URL(string:)` already, so only 14 of them separate S5; the other rows still
  bind against a looser rule, as P2 shows.

## Findings

**F1 (Low, against T-1178's test, not this commit). The Link branch is checked through the body for one url only.**
`pywidget/ios/Tests/TreeNodesTests.swift:347-349` loops E5 through the static `TreeNodeView.url`, and the body walk
(`linkDestinations`, :355-356) draws only `pywidget://run?x=1` and `https://example.com`. A Link branch at
`pywidget/ios/Shared/TreeView.swift:162` that skips `Self.url` but keeps a scheme check (my P3) passes both tests, and
S6 dies on a single assertion (:356). The widgetURL path is now held more tightly than Link. Fix: in
`testRefusedDestinationsDrawNoLink`, also assert `linkDestinations(link(url)) == []` for every E5 row, and add P3 to
`mutants-t1266.json` showing it die. Line T-1284 for Idris. It is a test gap with today's code correct, so it does not
hold TestFlight.

Notes, no fix asked:

- N1. `testRefusedDestinationsSetNoWidgetURL` has no guard of its own on `e5Refused.count`; it relies on the `>= 30`
  assert at :346 in the sibling test. Both run in the same suite, and the mutants file lists both tests, so an empty E5
  list still fails the run.
- N2. `xc.sh` warned that two other Simulators were up during my run (iPhone 18 Pro, and one named T0553 Idris, each
  running PyWidget). That did not change the verdicts; it is for the Operator's sweep.
{% endraw %}

</div>
