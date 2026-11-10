---
layout: "default"
title: "T-2845: review of fbd927fa7 (T-1758, RefreshSchedule)"
section: "documents"
description: "Verdict: the rule is correct against 5.1 T2 and chair items 5 and 6 as written. The smallest ask wins, the floor is max(smallest, 900), an empty list or all-nil gives nil, NaN and +/-infinity are dropped, zero, -0.0\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2845-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2845-pernille.md</code></span></div><h1>T-2845: review of fbd927fa7 (T-1758, RefreshSchedule)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-05. Independent review (Commandment 13): I read the code and tests, not the author's reasoning.

**Read:** `pywidget/ios/Shared/RefreshSchedule.swift` (29 lines, symlinked into Core as `Sources/PyWidgetCore/RefreshSchedule.swift`), `pywidget/ios/Tests/Core/RefreshScheduleTests.swift` (9 tests), `Core/mutants-t1758.json` and its results file, against ADR-007 5.1 T2, 5.3 and the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-05 7:55 PM (T-2846), items 1, 2, 5 and 6. Target membership: `Shared` is a source of both `PyWidget` and `PyWidgetExtension` in `project.yml` (lines 145, 340), so the file builds in the app, where T-0793 needs it.

**Ran:**
- `swift test` in `pywidget/ios/Core` at HEAD f8fb59ae8: 589 tests, 0 failures.
- In a scratch copy of the same tree (`git archive HEAD pywidget`): `tools/mutation_check.py . mutants-t1758.json --filter RefreshScheduleTests` gave 13/13 killed, the same as the author's results file. Then four mutants of my own: 3 survived, 1 killed (below).
- A host probe (`swiftc` of the file plus a `main.swift`) for the edge inputs quoted below. Its output is in my scratch dir; every value quoted here comes from that run.

**Verdict: the rule is correct against 5.1 T2 and chair items 5 and 6 as written.** The smallest ask wins, the floor is `max(smallest, 900)`, an empty list or all-nil gives nil, NaN and +/-infinity are dropped, zero, -0.0, negatives, `-greatestFiniteMagnitude` and `leastNonzeroMagnitude` all get the floor. I found no wrong output for any input the chair line allows. One Medium (a hole in the tests on the long-interval side, which is exactly where T-2852's 24 h <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> will feed the rule) and four Lows.

## Medium

**M1. The suite never asks for more than 90 minutes, so a rule that drops or caps long asks passes all 9 tests.** `RefreshScheduleTests.swift:32-80`: the largest interval in any test is `mins(90)` (line 80). These mutants survived in the scratch copy:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Medium, scrolls sideways" style="--tw:832px" markdown="1">

| mutant | where | effect |
|---|---|---|
| `t2845-long-asks-dropped`: `.filter { $0.isFinite && $0 <= 2 * 3600 }` | `RefreshSchedule.swift:19` | `interval(requested: [86_400])` returns nil instead of 86 400: a widget that asks daily gets no background run at all |
| `t2845-capped-at-2h`: `return min(max(smallest, floor), 2 * 3600)` | `RefreshSchedule.swift:21` | `[86_400]` comes back as 7 200: the app wakes 12 times as often as asked |

</div>


Why this is Medium, not Low: chair item 1 sends every far-off ask to the rule as 24 h (86 400 s), and item 1 also has `atEnd` timelines that run to tonight asking hours ahead. That is the normal input for a daily or sun or calendar widget, and no test shows that it comes out unchanged. A later "sanity cap" in the rule (an easy edit to make while T-2852 adds its cap next door) would pass the suite. Failing input for the fix: `next([24 * 60])` must equal `at(24 * 60)`, and `next([nil, 24 * 60, 6 * 60])` must equal `at(6 * 60)`. Both tests together <span title="A test written in advance. If it fires, we drop the idea.">kill</span> both mutants. Board line T-2902 (Odalys).

## Low

**L1. Negative infinity is not tested.** `RefreshSchedule.swift:19` is right (`isFinite` drops -inf; the probe gives `[-inf]` -> nil, `[-inf, 1200]` -> 1200). But `testNonFiniteIsNotAnAsk` (lines 68-74) has only `.nan` and `.infinity`, so the mutant `t2845-neg-inf-kept` (`.filter { $0 < .infinity }`) survives. Under it `[-.infinity]` gives a date at the floor instead of nil. Chair item 5 says non-finite is not an ask, so this is a real but harmless departure: a passed date reads as "now" anyway. Fix: add `XCTAssertNil(S.nextBegin(requested: [-.infinity], lastRun: Self.last))`. It goes into T-2902 as a one-liner.

**L2. The rule has no ceiling, so a broken caller can produce a date that will not print, or one at infinity.** `RefreshSchedule.swift:19-27`. Probe: `interval(requested: [.greatestFiniteMagnitude])` is 1.797e308 (finite, so it counts as an ask). `nextBegin` from a 2027 date gives a `Date` whose `description` is the empty string. With `lastRun: Date(timeIntervalSinceReferenceDate: .greatestFiniteMagnitude)` it gives `timeIntervalSinceReferenceDate == +inf`: a finite ask produces a non-finite date, which is the case 5 says should not exist. `[1e12]` gives year 33715, past `Date.distantFuture`. Chair item 5 puts the 24 h cap in the caller (T-2852), so I am not asking for a change here. I want it written down: the 24 h cap is the only guard between a tree and `submit`. T-2852's cap mutant is the check, and I will hold that review to it. A one-line note in the docstring of `interval(requested:)` ("no upper bound; the caller caps at 24 h, chair 19:55 item 1") would stop someone removing the cap because they think the rule has one.

**L3. The floor holds only from the date the caller passes in.** `RefreshSchedule.swift:24-27`. `nextBegin` adds the interval to `lastRun`, and line 24's docstring says "the last run plus". If T-0793 passes the run's start time, which is what the name suggests, then after a 25 s batch `earliestBeginDate` is 875 s from the `submit` call, under the 15 minutes "from when we ask" in chair item 2. Line 7 already says "with the moment of that reschedule", so the file contradicts itself. T-2852 owns the rename to `from` and the docstrings, so no new line here. Note for T-0793's review: check that `from` is the `now` at `submit`, not a stored run date.

**L4. `static let floor` shadows Foundation's `floor(_:)` inside the enum.** `RefreshSchedule.swift:13`. Probe: an extension method on `RefreshSchedule` that calls `floor(x)` fails to compile ("use of 'floor' refers to instance method rather than global function"). Nothing calls it today. It is a trap for whoever adds rounding next (for example, whole seconds for a log line). A name like `minimumInterval` would avoid it. That rename also changes the `t1758-floor-*` mutants' find strings, so it belongs with T-2852's rename if Odalys wants it. Optional.

Also noted, no action: line 6, "may cancel a pending request", is softer than chair item 3, "No placed widget asks: cancel the pending request". T-2852's docstring pass is the place to fix it.

## Checked and fine

- Order does not matter (`min()`), and nil entries are skipped, not read as zero (`compactMap`). The tests pin both (mutants first/last/largest and nil-is-zero are killed).
- Boundary at exactly 900 s: `max` keeps it, `next([15]) == at(15)`, and my strict-floor mutant is killed.
- `-0.0` gives 900 (`max(-0.0, 900)`), and subnormals give the floor.
- `nextBegin` reaches no clock and no global state, and `identifier` matches 5.1 T2.
- Tests and their quotes match ADR-007 5.1 T2's wording.
{% endraw %}

</div>
