---
layout: "default"
title: "Review: T-1972, the run-log writer applies RefreshOutcomeRule (46ab7f75c3, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The writer change is correct and small: recordWidgetRun rewrites the run once, at its top (let run = run.logged), so the row, the status.json write and the expired check all see the same\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1972-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t1972-pernille.md</code></span></div><h1>Review: T-1972, the run-log writer applies RefreshOutcomeRule (46ab7f75c3, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4046, 2026-11-16. Independent review (Commandment 13). I read the diff (RunLogRecorder.swift,
RunLogRecorderTests.swift, Core/mutants-t1972.json), the two files as they stand on personal/a2 at ae837fe79e,
Shared/RefreshOutcomeRule.swift, RunRowOutcome.map (RunRow.swift), RunLogStore.recordWidgetRun, WidgetStatus.ok/error,
every caller that sets `WidgetRun.forcedFetchOK`, and the board lines T-1972, T-1882 and T-2538. Test runs: see
"Tests" at the end.

**Verdict: PASS with findings.** The writer change is correct and small: `recordWidgetRun` rewrites the run once, at
its top (`let run = run.logged`), so the row, the status.json write and the expired check all see the same word. A
refresh tap whose script ran ok and whose forced fetch failed is written as one `error` row with error_type
`FetchFailed` and no file, line or traceback; status.json says `error` and the badge shows; every other run passes
through unchanged. The author's 8 mutants all die. Two Lows and one note on the board's state; nothing blocks
TestFlight. The rule is dormant in the shipped app until B5 sets its input (see "Not this commit's").

## What I checked

**1. `WidgetRun.logged` (RunLogRecorder.swift:80-88).** Walked every row of RefreshOutcomeRule's table:
- `ok`, fetch nil or true, any trigger: `effect.failedRow` nil, returns self. Row and status `ok`. Correct.
- `ok`, fetch false, the tap (`intent`): becomes `error` / `FetchFailed`. Correct.
- `ok`, fetch false, any other trigger: `failedRow` nil, stays `ok` (the stale mark covers it). Correct.
- `error` / `timeout`, any fetch: `failedRow == script` and `errorType` nil, so it returns self and the script's own
  error_type survives. Correct. (`failed != script` is redundant beside `let type = effect.errorType`; harmless.)
- Swift-only words (`deferred`, `killed`, `busy`, ...), an unknown word, or a nil trigger: `effect` is nil or the
  guard fails, returns self. Correct.

**2. What the rewritten run writes.** `RunRowOutcome.map("error", "FetchFailed", ok-payload)` keeps the given
error_type, finds no `syntax` or `error` object in a `status: ok` payload, so file and line stay nil; duration still
comes from the payload. The detail file is the run's own output and payload, with no traceback, so
`RefreshOutcomeRule.isFetchFailure` and RunLogExport read the row as the fetch, not a user exception.
`WidgetStatus.error` does not touch the last good time, which matches the rule's "age line unchanged" for this row.

**3. The expired rule still wins.** `prepare` runs after `logged`, so a tap the T2 handler expired is still written
`expired` with error_type, file and line cleared, and status.json is left as the handler wrote it.

**4. Both <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.** The extension lane hands its WidgetRun to the same `recordWidgetRun`, and
ExtensionLaneTests/testATapsFailedFetchInTheLaneBadgesAndAReloadsDoesNot shows one `FetchFailed` row and the badge
for a tap, none for a reload. Ran it (below).

**5. Since 46ab7f75c3.** Three later commits touch RunLogRecorder.swift (T-4205 prune flag, T-3895 lane-turn
error_type, T-4280 `lane-moved` extra in `row`). None touches `logged` or the order in `recordWidgetRun`; the T-1972
code is on main unchanged. Nothing has superseded it.

**6. The tests and the mutants.** The two new tests pin the whole promise: one row, its outcome, error_type, no
file or line, no traceback, `isFetchFailure`, status.json's word and error_type, the badge on and then off on the
next good tap, and the scheduled run that stays `ok`; and the failed or timed-out script that keeps its own word. All
8 mutants in Core/mutants-t1972.json die (results under "Tests"). I added one of my own, which survived: L1.

## Findings

**L1 (Low): no writer test holds a tap with no forced fetch to `ok`.**
Every tap in RunLogRecorderTests sets `forcedFetchOK` to true or false. A recorder that coerced nil to false
(`forcedFetchOK: forcedFetchOK ?? false` in `logged`) passes all 54 recorder tests: every tap on a widget that
declares no `url` would then be written `error` / `FetchFailed` and badge although no fetch was made. RefreshOutcomeRuleTests
pins nil in the rule, but not at the writer, which is where B5 will hand it in. Fix: one more case in
testARefreshTapWithAFailedFetchWritesOneErrorRowAndShowsTheBadge (an `intent` tap, `ok`, `forcedFetchOK` nil: row
`ok`, no badge), and the mutant `nil-fetch-read-as-failed` added to Core/mutants-t1972.json. Board: a note on T-1882,
whose B5 part sets the Bool and owes the writer tests.

**L2 (Low): the new `forcedFetchOK` doc names a file that no longer exists.**
RunLogRecorder.swift:71 says "B5 sets it from this attempt's fetch.json". The file is `fields.json` (Ines's T-2461
<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>), and RefreshOutcomeRule.swift's own doc was corrected to fields.json's clocks in T-2264; this comment
reintroduces the old name and the "error code" reading T-2264 removed. Fix: "from fields.json's `fetched_at`, through
`RefreshOutcomeRule.forcedFetchOK(declaresURL:fetchedAtBefore:fetchedAtAfter:)`". Board: in the same T-1882 note.

**Board note (not a code defect): T-1972 is landed but the board says otherwise.**
46ab7f75c3 reached main on 2026-11-09 (committer date). The 11-10 merge reset then put T-1972 back to "to do" as
unmerged, and T-2538 still lists "T-1972 run-log RefreshOutcomeRule 3225daf7c" as a <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> fix to land. Whoever picks
either up would redo merged work. Board: a note on T-1972 and on T-2538 saying it is on main; Idris ticks T-1972.

## Not this commit's, but say it plainly

No production code sets `WidgetRun.forcedFetchOK`. The only setters are RunLogRecorderTests and the ExtensionLaneTests
harness. So in the shipped app every run reaches `logged` with nil and is written as it came: a refresh tap whose
fetch fails still writes `ok` and shows no badge. The commit's "first production caller" is accurate (the writer calls
the rule) but the input is not wired. That wiring is B5, T-1882 part (1), already open; no new line.

## Tests

1. `xcodegen generate` in pywidget/ios. `XC_TASK=T-4046 tools/xc.sh test -only-testing:PyWidgetTests/RunLogRecorderTests`
   from the worktree root as briefed: exit 64, xcodebuild wants `-scheme` with xc.sh's `-derivedDataPath`. Nothing ran.
2. `XC_TASK=T-4046 tools/xc.sh -project pywidget/ios/PyWidget.xcodeproj -scheme PyWidget -destination
   'platform=iOS Simulator,name=iPhone 18 Pro' -only-testing:PyWidgetTests/RunLogRecorderTests
   -only-testing:PyWidgetTests/ExtensionLaneTests/testATapsFailedFetchInTheLaneBadgesAndAReloadsDoesNot test`:
   first try exit 75 (a waiter took the stalled lock; not counted, ops/runs/xcodebuild-20261116-145654.log). Second
   try, about 3:08 PM ET: **exit 0, 57 executed, 0 failures** (56 RunLogRecorderTests, 1 ExtensionLaneTests)
   (ops/runs/xcodebuild-20261116-150240.log).
3. Mutants: `tools/mutation_check.py` on a scratch copy of the Core package (symlinks resolved, outside the repo),
   Core/mutants-t1972.json plus my probe, `--filter 'RunLogRecorderTests/test(?!EveryPremades)'`. The two
   EveryPremades tests read the bundled premade folder by path, which a scratch copy does not have (they fail there
   for that reason only, and pass in run 2). Baseline 54 green; 8 of 8 author mutants KILLED (rule-not-applied 8
   failures, row-and-status-disagree 3, outcome-kept-ok 8, error-type-dropped 3, every-trigger-is-tap 2,
   fetch-always-failed 5, failed-script-rewritten 1, type-from-rule-ignored 3); probe `review-nil-fetch-read-as-failed`
   SURVIVED (L1).
{% endraw %}

</div>
