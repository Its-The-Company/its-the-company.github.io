---
layout: "default"
title: "T-2840: review of 078a61512 (T-2263, one shared check for a failed refresh)"
section: "documents"
description: "My T-1989 F1 (t1989-pernille.md:25) is closed. RefreshOutcomeRule.isFetchFailure(_ row:, traceback:) (RefreshOutcomeRule.swift:39-43) now holds all six conditions: outcome error, a known trigger that isRefreshTap\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2840-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2840-pernille.md</code></span></div><h1>T-2840: review of 078a61512 (T-2263, one shared check for a failed refresh)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Independent review (C13), judged from `git show 078a61512` and the tree at that
commit, not the author's notes. Host only: no Xcode, no Simulator.

## Verdict: PASS

My T-1989 F1 ([`t1989-pernille.md`](t1989-pernille.html):25) is closed. `RefreshOutcomeRule.isFetchFailure(_ row:, traceback:)`
(RefreshOutcomeRule.swift:39-43) now holds all six conditions: outcome `error`, a known trigger that `isRefreshTap`
accepts, error_type `FetchFailed`, no file, no line, no traceback. The old `(errorType:file:line:traceback:)` half
is gone, so nothing can call it any more.

## What I checked

**Callers.** `grep` over `pywidget/ios/App`, `Shared` and the widget targets, tests excluded: the only reads of
`fetchErrorType`, `isFetchFailure`, `isRefreshTap` or `knownTrigger` are the rule itself and
`RunLogExport.isFetchFailure` (RunLogExport.swift:77-78). That wrapper now only works out `traceback` from the
detail (`error` or `syntax` present) and hands over the whole row. Its two readers, `reason` (:93) and
`detailLine` (:115), both go through it. No other Swift compares `errorType` with the token, and no Python defines
it. No production code calls `RefreshOutcomeRule.effect` yet (B5 is not wired), so for now the reader is the only
side of the rule in the app.

**Edge rows**, traced by hand through :40-42 and tested:
- `bg_refresh` or `shortcut` with the token, no file or line, detail nil: `isRefreshTap` false, so not a fetch.
  The reason is "FetchFailed" and there is no detail line (RefreshOutcomeRuleTests :217-218, :230-231;
  RunLogTests :880-885).
- No trigger: `knownTrigger` nil, `.map` nil, `== true` false, so not a fetch (:219).
- Unknown trigger word (`wrist`): `RunTrigger(rawValue:)` nil, so not a fetch (:220).
- Token plus a traceback: false (:202). Token plus a kept detail with only a SyntaxError: false (the existing
  `t1971-export-ignores-syntax` <span title="A test written in advance. If it fires, we drop the idea.">kill</span>).
- Every `RunTrigger` case: the result equals `isRefreshTap(trigger)` (:221-224). `isRefreshTap` is an exhaustive
  switch, so adding a trigger does not build until someone places it.
- The row `effect` writes for a tap whose fetch failed reads back as a fetch (:226-229). This ties the reader to
  the writer's table, not to a hand-built row.

**Tests rerun** on a scratch copy of the tree at 078a61512 (`git archive`, company scratch T-2840-pernille):
- `swift test --skip testParseSpeed` in `pywidget/ios/Core`: 569 tests, 0 failures. This matches Idris's count.
  The first run failed only because I had exported `pywidget/ios` without `pywidget/tests`, so PromptsCodecTests
  could not find its fixtures. Exporting the full `pywidget/` fixed it. That was my setup, not the commit.
- `tools/mutation_check.py <copy>/Core <json> --filter "RefreshOutcomeRuleTests|RunLogExportTests"`:
  - mutants-t2263.json: 6 of 6 killed.
  - mutants-t1882.json: 19 of 19 killed.
  - My own seven (scratch `mutants-t2840.json`): 7 of 7 killed, each with BASELINE 20 green. Each mutant
    takes one condition out of the rule or loosens it:
    drop the token check (2 failures); `outcomeWord != .ok` (1); `shortcut` counted as the tap (8);
    `bg_refresh` counted as the tap (10); the export checks the token only (20); the export ignores a kept
    `error` (4); a row with no trigger counts as the tap (1). The two single-failure kills each rest on one assert
    (`row(outcome: "timeout")` at :206, `row(nil)` at :219), but each of those asserts is exact for its case.

## Findings

No High. No Medium.

**L1 Low: RefreshOutcomeRule.swift:38. The doc comment says the 12.4/12.5 screens call this check, but no screen
calls it yet.** No App or widget source calls `RunLogExport.reason`, `detailLine` or `isFetchFailure`. The comment
describes a future reader as if it already exists.
Failure case: when the Activity list (12.4) or run detail (12.5) lands, its author reads "the screens call this"
and assumes the wiring is done. They might then write `row.errorType == "FetchFailed"` in a view. The rule says it
must never be written that way, and nothing would catch it.
No board line: this is a comment, and the fix belongs to whoever lands 12.4/12.5. They should call
`RunLogExport.reason`/`detailLine` and add a test through the screen's own model. I will check it when those land.

**L2 Low (residual, documented in the commit, no fix asked): RefreshOutcomeRule.swift:36-37.** An `intent` row
can carry the token with no user frame: bundled premade code or `internal` frames raising their own `FetchFailed`.
Once its detail is past the newest 100, the row still reads as a fetch. The outcome and the trigger now narrow
this to the refresh tap alone, and that is as far as the row's fields can go. Closing it fully needs the writer
(B5) to mark the row it writes, for example with its own key. That is a schema question for when B5 is wired, not
a defect in this commit.

## Not a finding

`t2263-export-own-trigger-ok` (mutants-t2263.json:7) rewrites the call into an expression that only compiles
because of the text left after the `find`. I read the patched line: it is a valid token-only check with the
traceback negated. It is a fair mutant, and it was killed with 9 failures.
{% endraw %}

</div>
