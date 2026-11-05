---
layout: "default"
title: "T-1989: review of 5b36a7808 (Idris, T-1882 part 2 and T-1971)"
section: "documents"
description: "Verdict: approve with changes. The three strings match item 3 word for word: o.fetch &quot;Could not get new data&quot;, t.tap &quot;From the widget&quot;, and d.fetch. d.big matches ide spec 12.12 (spec.md:829). T-1926 F1 landed the way I\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1989-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1989-pernille.md</code></span></div><h1>T-1989: review of 5b36a7808 (Idris, T-1882 part 2 and T-1971)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read only, no runs. Read against state-spec s10 (d) "Decisions, T-1863" items 2
and 3, and my T-1926 F1 ([`pywidget/docs/reviews/t1862-pernille.md`](t1862-pernille.html)). Judged from the diff, RunLogExportTests (in
`Tests/Core/RunLogTests.swift`), RefreshOutcomeRuleTests and `Core/mutants-t1882.json`. Neither source file has
changed since 5b36a7808.

Verdict: **approve with changes.** The three strings match item 3 word for word: `o.fetch` "Could not get new data",
`t.tap` "From the widget", and `d.fetch`. `d.big` matches ide spec 12.12 (spec.md:829). T-1926 F1 landed the way I
asked. There is one predicate, it checks the token and no file, no line and no traceback, and the export's
heading, reason and detail line all go through it. A user's `class FetchFailed(Exception)` with a user frame keeps
"FetchFailed, line 7" and gets no `d.fetch`. The `forcedFetchOK` doc follows item 2. I have two Lows. Neither one
blocks.

## Evidence (read by me, not run)

- `mutants-t1882.json`: 19 entries. A script checked that each `find` string occurs exactly once in its target
  file (both are symlinks from `Core/Sources/PyWidgetCore` into `Shared`), so none is MISSING. By reading, a named
  assertion <span title="A test written in advance. If it fires, we drop the idea.">kills</span> each one. Examples: `t1971-text-ignores-detail` is killed by `export.contains("... FetchFailed
  ...")` (RunLogTests.swift:851 test), `detail-big-none` by the `tree_too_large` assertion in the :826 test, and
  `t1971-export-any-outcome` by the `outcome: "ok"` row. I did not rerun the commit's 19/19 or its green run.

## Findings

**F1 Low: RefreshOutcomeRule.swift:35-37 and RunLogExport.swift:77-81. The shared check leaves out the outcome
and the trigger, so "one check" covers only half the rule.**
The rule writes the token only on an `error` row whose trigger is the refresh tap (`isRefreshTap`, :57-65;
`Effect` at :81). `RefreshOutcomeRule.isFetchFailure` checks neither condition. The `outcomeWord == .error` part
lives only in RunLogExport's wrapper. Both `reason` and `detailLine` default `detail` to nil, and nil reads as "no
traceback".
Failure case: some code with no user frame raises an exception named `FetchFailed`. That covers bundled premade
code, `internal` frames and anything outside `user_roots` (runner.py:928, `_kind`), because then
`RunRowOutcome.map` leaves `file` and `line` nil (RunRow.swift:300-303). The row is `bg_refresh` or `shortcut`, and its
detail is past the newest 100 (RunLogRetention.swift:9), or the caller never loads it, as an Activity list will
not. That row reads "Could not get new data" and "The script ran fine". No Python here defines `FetchFailed` today,
so this is not reachable now. It becomes reachable when the 12.4/12.5 screens call the rule's predicate directly
and leave out the wrapper's outcome test.
Fix: move the whole test into the rule. One option is `RefreshOutcomeRule.isFetchFailure(_ row: RunRow, traceback:
Bool)`: outcome `error`, the trigger parses and `isRefreshTap` is true, the token, no file, no line, no traceback.
RunLogExport then calls only that. Add a test that a `bg_refresh` row and a `shortcut` row, each carrying the token
and nothing else, are not fetch failures, and one mutant that drops the trigger test. A token that no `class`
statement can spell (one with a dot) would close the rest, but that changes the string in Maren's table.

**F2 Low: RefreshOutcomeRule.swift:67-73. The `forcedFetchOK` doc does not split every fetch.json state. A widget
with both a URL and a sensor can miss its badge.**
bound-fields s5 step 5 runs the fetch and the `steps` query in parallel and writes one fetch.json, and its `error`
field holds one code (s4, bound-fields.md:120). The doc says true for "a 2xx JSON body ... or a sensor field was
refused", and false "only when" `error` is one of the six network codes "and gave no body".
Failure case: someone taps Refresh, the device is offline, and Motion access is off. The URL gives no body and
the sensor is refused. If the writer stores `no_permission`, the doc's "false only when" makes this true. The tap
then writes no failed row and shows no badge, though nothing new came back. A sensor-only widget refused on a tap
has no body either, so neither of the doc's clauses names it. State-spec item 2 has the same wording, so this is
a gap in the spec, not a slip in the doc.
Fix (Idris, with Maren for item 2's wording, before B5): key the Bool on the clocks, not the code. True when this
attempt moved `fetched_at` (`attempted_at == fetched_at`). False when the widget declares a `url`, the attempt ran,
and `fetched_at` did not move. Nil when the widget has no `url` (a sensor-only tap makes no forced fetch). The code
list stays as the explanation. B5's test adds the offline-plus-`no_permission` tap: one `error` row and the badge.

## Not findings

- No screen calls `detailLine` or the predicate yet. Outside the tests, the only callers are inside
  RunLogExport.swift. The board line's "run detail shows `d.fetch`" will be true once 12.5's run detail exists and
  passes the row's kept detail. The export does not print `d.fetch` or `d.big`, which matches 12.12.
- ide spec 12.4.1 (spec.md:724) still lists `intent` as "never written at HEAD", and 12.12 has no rows for
  `o.fetch`, `t.tap` or `d.fetch`. That belongs to Maren and goes with the next <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> batch. Idris has nothing to do
  here.
- All the strings stay DRAFT (C51), and the code says so at each one.

## Addendum, 2026-11-05: landed on main, and checked against the fields.json <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>

The review above was written 2026-11-04 on the b2 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (54536df98, <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/b2/20261105-014709-q6) and never reached
main. This commit lands it unchanged above this line, so its two mentions of `fetch.json` stay as written (reviews
are records, ruling T-2461 s1). T-2461 (ops/decisions/2026-11-05-t2461-bound-fields-names.md): the file is
`data/<id>/fields.json`, schema `pywidget.fields`. f48bf7cdc (mine) applied it to the docs and to the four comments
in RefreshOutcomeRule.swift. That is the only change to the reviewed files since 5b36a7808, comments only, in
place, so every file:line above still holds at HEAD.

Ruling check, read at HEAD: **nothing in 5b36a7808 disagrees with it.**

- No code identifier, test, fixture or mutant names the file or the schema. `grep -i 'fetch\.json|pywidget\.fetch'`
  over pywidget/ios and pywidget/runtime finds nothing; outside reviews, proposals and ADR-007's held 574 entry,
  main has no `fetch.json`.
- `fetchErrorType` / `"FetchFailed"`, `isFetchFailure`, `forcedFetchOK` and the copy keys `o.fetch` and `d.fetch`
  name the forced network fetch, the event, not the file. The ruling keeps the fetch bookkeeping (`attempted_at`,
  `fetched_at`, `error`) as a thing inside fields.json and keeps the manifest key `fetch`. No rename is due.
- The user-visible strings ("Could not get new data", "From the widget", "The script ran fine, but new data did not
  arrive. ...", d.big) name no file. Nothing for Maren here.
- F2's board line T-2264 says fields.json, not fetch.json, so the fix lands with the right name.
{% endraw %}

</div>
