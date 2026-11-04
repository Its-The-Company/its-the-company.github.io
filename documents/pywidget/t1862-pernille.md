---
layout: "default"
title: "T-1926: review of T-1862 (Idris, 3440ad7f1), RefreshOutcomeRule follow-ups"
section: "documents"
description: "Approve with changes. All three items land as asked. F2: fetchErrorType = &quot;FetchFailed&quot; is in the rule, Effect.errorType carries it only for a tap whose script ran and whose fetch failed, and the doc says the run writes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1862-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1862-pernille.md</code></span></div><h1>T-1926: review of T-1862 (Idris, 3440ad7f1), RefreshOutcomeRule follow-ups</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read against my T-1845 F2-F4 ([`pywidget/docs/reviews/t1845-pernille.md`](t1845-pernille.html)) and state-spec s10 (d) "Decisions, T-1863". Judged from the diff and the tests.

## Verdict

**Approve with changes.** All three items land as asked. F2: `fetchErrorType = "FetchFailed"` is in the rule, `Effect.errorType` carries it only for a tap whose script ran and whose fetch failed, and the doc says the run writes one row with `error` in place of `ok`. F3: `ageMoves` now reads "this run's time is offered to (c)", the table says "offered (c)", and the misnamed test is now `testAFailedFetchOffTheTapWritesNoRowAndKeepsTheOldTime`. F4: the note on `widget_action` and `control` sits on the switch. The "came back" vs "failed" paragraph matches T-1863 item 2 word for word. The new mutants are aimed well: no-type, wrong word, a script failure taking the fetch token, an off-tap run naming it, and a default token. One Medium for the reader of the token, one Low for T-1882. Neither blocks the merge. F1 must land before run detail keys on the token.

## Evidence (run by me)

- `swift test --filter 'RefreshOutcomeRuleTests|RendererL5Tests'` in `pywidget/ios/Core` at ea07f139d: RefreshOutcomeRuleTests 13/13, 0 failures.
- Mutants: I did not rerun them (the machine is loaded). I read all 22 entries in `Core/mutants-t1794.json`. Each one changes behaviour that a named test pins, and none of them only breaks the build.

## Findings

### F1. Medium. `FetchFailed` is also a name a user's exception can have, and run detail keys on the name alone
`RefreshOutcomeRule.swift:49-51`; state-spec s10 (d) Decision 3 (`o.fetch`: "error_type = RefreshOutcomeRule.fetchErrorType"). A script's `error_type` is its exception class's `__name__` (`App/Runtime/_pywidget_runtime/runner.py:1394`). A widget that fetches data can easily define `class FetchFailed(Exception)` and raise it. Its row is `error` with error_type `FetchFailed`, plus a file, a line and a traceback. If run detail matches on the string, it tells the person "The script ran fine, but new data did not arrive". It also hides the Traceback card and Go to Line, which Decision 3 drops for this row. That is false, and it hides a real bug in their code. The app's own tokens (`NoTree`, `InternalError`, `SystemExit`, `RunResultSink.swift:160-172`) already share this namespace, but none of them makes a claim this strong.
**Fix (Idris, T-1971):** give the rule one predicate that every reader uses, for example `static func isFetchFailure(errorType:file:traceback:) -> Bool`: the token, and no file and no traceback. Add a test that a row with `FetchFailed` and a file or line is not a fetch failure. Run detail (12.4/12.5) and T-1882 call the predicate, never `== fetchErrorType`. Another fix is a token no `class` statement can produce, such as one with a dot. That one needs no predicate, but it changes a string Maren's table names.

### F2. Low. The "one row, not two" promise has no test where it can break
`RefreshOutcomeRuleTests.swift`, `testATapWhoseFetchFailsLeavesErrorNotOkInStatus`. The test builds `WidgetStatus.error(WidgetStatus.ok(...))` itself, so it pins `WidgetStatus` and `showsBadge`, not the writer. The failure I raised in T-1845 F2 was B5 writing `ok` and then `error` (or `error` and then `ok`). That happens in B5's writer, and this rule cannot see it. The doc now states the promise, which is correct. The test that keeps it belongs with the writer.
**Fix (Idris, T-1972, with T-1882 / B5):** one test there: a refresh tap with an ok script and a failed forced fetch leaves exactly one run row, `outcome=error`, error_type from the rule, and status.json `last_outcome=error` with the badge showing.
{% endraw %}

</div>
