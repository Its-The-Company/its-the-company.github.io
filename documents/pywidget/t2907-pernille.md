---
layout: "default"
title: "T-2907: review of cf76c40c6 (T-2852, RefreshAsks) and 35e10d4fa (T-2902, RefreshSchedule tests)"
section: "documents"
description: "Verdict: pass. No High or Medium findings. Two Lows."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2907-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2907-pernille.md</code></span></div><h1>T-2907: review of cf76c40c6 (T-2852, RefreshAsks) and 35e10d4fa (T-2902, RefreshSchedule tests)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-05. Independent review (C13): I read the code and tests, not the author's reasoning. Held against the ADR-007 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-05 19:55 (items 1, 2, 5, 6) and my own t2845 review (M1, L1, L2, L3).

Read: `pywidget/ios/Shared/RefreshAsks.swift`, `pywidget/ios/Shared/RefreshSchedule.swift`, `pywidget/ios/Tests/Core/RefreshAsksTests.swift`, the T-2902 hunk of `RefreshScheduleTests.swift`, `mutants-t2852.json` and its results, and for the readings `TreeTimeline.swift:200-270`, `docs/design/viewtree.schema.json` (timeline) and `python/pywidget_ui/__init__.py:1525-1570`.

Ran:
- `swift test` in `pywidget/ios/Core`, main checkout at HEAD 0b5b102cf: **611 tests, 0 failures** (the board line's 608 was at the author's HEAD; three more tests have landed since).
- My own 9 mutants in a scratch copy (`git archive HEAD pywidget`), using `tools/mutation_check.py --filter RefreshAsksTests`: baseline 19 green, **7 killed, 1 survived, 1 equivalent** (my mistake, see the end). The mutant list and results are in scratch `T-2907-pernille/mutants-t2907.json` and `mutants-t2907-results.txt`.

Verdict: **pass.** No High or Medium findings. Two Lows.

## High

None.

## Medium

None.

## Low

**L1. No test for `never` with a stale mark that has already passed, so a rule that silences it passes all 19 tests.** `RefreshAsks.swift:56` (`guard let byPolicy else { return staleAt }`) is right. But `testNeverWithAStaleMarkAsksTheStaleMark` (`RefreshAsksTests.swift:76-78`) only uses a future mark (`stale: 2`), and `testPassedStaleMarkIsNegative` (line 81-83) only uses `.after`. Mutant `t2907-never-passed-stale-silent` (`return staleAt > from ? staleAt : nil`) **survives**. Failing input: `ask(tree(.never, stale: -1))` should be `-3600` (a passed ask, which gets the floor). Under the mutant it is `nil`, so a `never` widget that is already showing stale gets no background run until the app opens. That is the case the chair's "Why the stale mark asks" (Tenet 1) is about. Fix: add `XCTAssertEqual(ask(tree(.never, stale: -1)), -1 * Self.hour)` to line 77. No code change.

**L2 (carried from t2845 L2). The note that `RefreshSchedule` has no upper bound is still missing.** `RefreshSchedule.swift:17-19`. The substance of t2845 L2 is met. The 24 h <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> is in the caller (`RefreshAsks.swift:78`). It is pinned by `testAsksPastTwentyFourHoursReadAsTwentyFour`, including `.distantFuture` and a never-plus-stale ask at 30 h. Four cap mutants are killed (t2852-cap-*, and my `t2907-cap-24h-plus`). What is missing is the one-line docstring I asked for: `interval(requested: [1e12])` still returns `1e12` by design. Lines 9-10 now say each interval comes from `RefreshAsks.requested`, but nothing says the cap lives there. Someone reading `RefreshSchedule` alone would think the rule bounds the date. Fix: add "No upper bound: the caller caps at 24 h (`RefreshAsks.cap`, chair 2026-11-05 19:55 item 1)" to the `interval(requested:)` docstring.

## The four readings the author flagged

1. **`never` plus a stale mark asks the stale mark: agreed.** Item 1 says "a stale mark ... earlier than that asks the stale mark", and the chair's dissent paragraph turns down my reading (that `stale_after` is only a horizon) explicitly, citing Tenet 1. `never` still works as the author's way out (the chair's "What would make this fail" line), because `pywidget_ui` leaves `stale_after` out by default (`__init__.py:1530, 1545`: `None` means never stale), and the tree then has `staleAt` nil. The code matches: `RefreshAsks.swift:55-56`, tested at line 77 (future mark only, see L1).
2. **`atEnd` takes the latest entry date: agreed, and it matches the extension.** `entryDates.max()` (`RefreshAsks.swift:52`). The extension sorts entries (`TreeTimeline.swift:201`, `ordered`) and hands WidgetKit `planned.last?.date` (line 268), so the latest date is the "last date in the timeline's entries" that Apple reloads after. An unsorted tree gives the same answer on both sides. Pinned by line 38 (`[3, 1, 2]` -> 3 h), and the author's `t2852-atend-array-last` is killed.
3. **`atEnd` with no entries asks now: agreed, and a schema-valid tree can never reach it.** `viewtree.schema.json` has `timeline.entries` `minItems: 1`, so a validated `tree.json` never has zero entries. If one did, "now" is the same safe answer as `.unreadable`. My `t2907-atend-empty-asks-nothing` (`?? .distantFuture`) is killed.
4. **An unreadable demoted list makes every widget ask: agreed.** `RefreshAsks.swift:66`: `let demoted` fails on nil, so the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> filter does not apply. This matches `LaneDemotions.ids`'s contract ("nil as every widget demoted"), and a demoted widget is on the app lane, so it must ask. The worst case is one extra T2 wake at the floor. Pinned by line 129, and `t2852-unreadable-list-not-demoted` is killed.

## Against the chair line

- **Item 1:** every clause has a test: `after`, `atEnd` (last entry), `never`, the earlier stale mark, a later stale mark that loses, no tree, unreadable, `wants-run`, and the 24 h cap from the reschedule moment (lines 112-114 show the cap moves with `from`). Asks are absolute dates, so `sampled_at` cannot move the schedule. Right.
- **Item 2:** `lastRun` is renamed `from` in `RefreshSchedule.nextBegin`, and both files document it as "the `now` at `submit`" (`RefreshSchedule.swift:7-10, 26-27`; `RefreshAsks.swift:70-71`). This closes t2845 L3 on the Core side. Code cannot enforce it, so it stays a check for T-0793's review: the handler must pass the clock at `submit`, not a stored run date.
- **Item 5:** a passed ask stays negative and gets the floor (`testDefaultWidgetAsksAtTheFloor`, `testPassedStaleMarkIsNegative`). My `t2907-past-ask-zero` (clamp at 0) is killed.
- **Item 6:** the filter and the ask reader are one function with their own tests. The filter-dropped mutant is in the author's set and killed. `background=false` beats `wants-run` (my `t2907-wants-run-beats-background` is killed), and the lane filter needs both the flag and `lane: widget` (my `t2907-demoted-lists-ignored-for-unflagged` is killed).
- **T-2902 (t2845 M1, L1):** `testLongAsksAreKept`, `testLongAndShortAsksMixed` and `testNegativeInfinityIsNotAnAsk` do what I asked. The t2845 mutants long-asks-dropped, capped-at-2h and neg-inf-kept are killed (`mutants-t2902-results.txt`). Closed.

## Checked and fine

- `wants-run` asks now whatever the tree (`RefreshAsks.swift:44`). My `t2907-wantsrun-only-missing` is killed.
- A stale mark that has passed, on an `after` tree, still wins (`t2907-stale-only-if-future` is killed).
- Edge cases that cannot happen today: a `Date` at `-infinity` gives `min(-inf, cap) = -inf`, which `RefreshSchedule` drops as non-finite, so it asks nothing rather than "now". A NaN date gives NaN, and NaN is likewise not an ask. Tree dates are schema strings, so neither can come from a decoded `tree.json`. No change asked.
- Not a defect, and already in the chair's "What would make this fail": a widget with a short `stale_after` (or 0), or a default one-entry `atEnd` widget, asks at the floor at every reschedule. T-0680's reload log is the check for that.

## My error

`t2907-cap-from-epoch` was an equivalent mutant: I wrote both branches of its ternary as `cap`, so it changes nothing. Its "survived" means nothing and I do not count it.
{% endraw %}

</div>
