---
layout: "default"
title: "T-2530: review of T-2518 (Idris, 0eb733cce), the badge kept through a memory refusal"
section: "documents"
description: "Approve. No work needed before TestFlight. The code is the chair line&#x27;s rule in one line, the tests pin each clause, and every number Idris reported reproduced exactly. Two Lows and two notes below; none needs a board\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2530-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2530-pernille.md</code></span></div><h1>T-2530: review of T-2518 (Idris, 0eb733cce), the badge kept through a memory refusal</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (Commandment 13): I read the diff, the tests, the mutant files and
ADR-007's <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line 2026-11-05 2:12 AM (a) and (c). I did not read Idris's notes beyond the results file the commit ships.
Host only: `swift test` in scratch `T-2530-pernille` (rsync -aL of pywidget/ios/Core at HEAD d9cad3f2e; WidgetStatus.swift
and WidgetStatusTests.swift unchanged since 0eb733cce). No Xcode, no Simulator.

## Verdict

**Approve. No work needed before TestFlight.** The code is the chair line's rule in one line, the tests pin each
clause, and every number Idris reported reproduced exactly. Two Lows and two notes below; none needs a board line.

## What I checked against the ruling


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked against the ruling, scrolls sideways" style="--tw:960px" markdown="1">

| Ruling | Code (pywidget/ios/Shared/WidgetStatus.swift) | Test (pywidget/ios/Tests/Core/WidgetStatusTests.swift) |
|---|---|---|
| (a) refusal with `failing_since` set reads as under way; `oom_guard_since = missingStatusSince(now)` | :209 `let underWay = old?.lastOutcome == nil \|\| old?.failingSince != nil`; :210 | `testRefusalAfterEachFailureKeepsTheBadgeAndTheFailure` (error, timeout, stuck, killed; also through encode/decode and a second refusal) |
| (a) `failing_since` and failure details kept, badge opens on the real traceback | :207 `carried(old)`, nothing cleared | same test, errorType/file/line/traceback/failingSince asserted; mutants `t2518-oomguard-clears-*` killed |
| (a) keyed on `failing_since`, not the last outcome (error, expired, refusal) | :209 | `testRefusalAfterErrorThenExpiredKeepsTheBadge`; mutant `t2518-keyed-on-last-outcome-failure` killed (1 failure, this test) |
| (a) only with a tree | `showsBadge` unchanged | `treeExists: false` asserted in both new badge tests |
| (a) after `ok`, first refusal unbadged (also after a healed error) | :209 false branch, `now` | `testFirstRefusalAfterOkStaysUnbadged` |
| (c) `old == nil` becomes `old?.lastOutcome == nil` | :209 | `testRefusalOnADeferredOnlyStatusBadges`; mutant `t2518-no-outcome-clause-reads-missing-only` killed (2 failures) |

</div>


The two updated tests are honest changes, not loosened ones: `testOomGuardWritesOnlyTheOutcomeAndItsStart` uses a
failing fixture, so (a) now applies to it; `testEveryOtherOutcomeClearsOomGuardSince` branches on the fixture's
`failingSince`. That second one derives its expectation from the same field the code reads, which on its own would
follow a regression where `expired` dropped `failing_since`; `testRefusalAfterErrorThenExpiredKeepsTheBadge` asserts
`x.failingSince == at(1)` directly, so the pair together is not circular.

Docstrings (:196-203, :245-248) say what the code does, including "after `expired` with no failure before it the first
refusal stays unbadged", which is right: `expired` keeps a `last_outcome` and has no `failing_since`.

## Reruns (scratch T-2530-pernille)

- `swift test --filter WidgetStatusTests`: 60 tests, 0 failures (Idris: 60/0).
- `tools/mutation_check.py <scratch>/core Core/mutants-t2518.json --filter WidgetStatusTests`: baseline 60 green,
  10/10 killed, failure counts identical to mutants-t2518-results.txt (2, 4, 22, 36, 1, 26, 24, 14, 5, 4).
- Same for Core/mutants-t1714.json: 16/16 killed.

## The three moved t1714 search strings

Each `find` occurs exactly once in WidgetStatus.swift (counted in the scratch copy):
`        if s.oomGuardSince == nil { s.oomGuardSince = underWay ? missingStatusSince(now) : now }\n`,
`if s.oomGuardSince == nil { s.oomGuardSince = underWay`, `underWay ? missingStatusSince(now) : now`.
They still mutate the intended code: the set line removed, the set-once guard removed, and the under-way branch forced
to `now`. To check they are not killed only by the new T-2518 tests, I ran the three alone with
`--filter WidgetStatusTests/testOomGuardOnAMissingStatusBadgesWithATree` (the T-1714 / 8:00 PM missing-status test):
3/3 killed (3, 2, 2 failures). The 8:00 PM behaviour they were written for still guards them.

## Findings

**L1 (Low, no fix asked). WidgetStatus.swift:209: an unknown or empty `last_outcome` reads as a fresh picture.**
`old?.lastOutcome == nil` is the chair line's exact token, but `decode` (:73) keeps any string, so a status.json
with `"last_outcome": ""` or an outcome name this build does not know is "an outcome present" here, while `showsBadge`
treats the same status as having no outcome (`status.outcome` nil). With a tree, its first refusal is unbadged.
No Release writer produces such a file (every write goes through these constructors), so this is a corrupt-file or
future-version case and costs one skipped reload without the badge, never a wrong badge. `old?.outcome == nil` would
close it; I do not ask for it, because it departs from the ruled token and the case is not reachable today. Recorded
so that the first new `Outcome` case added after v1 is read with this line in mind.

**L2 (Low, no fix asked). WidgetStatus.swift:74: an unreadable `failing_since` stamp is dropped, so a refusal
reads as fresh.** Same class as L1: only from a damaged file; the cost is one unbadged reload, and the traceback
still shows on the next real failure.

**N1 (note). The (c) test stays in memory.** `testRefusalOnADeferredOnlyStatusBadges` does not round-trip the
deferred-only status through `encoded()` / `decode`, as the (a) test does. Encoding a nil `last_outcome` omits the
key and decode reads it back as nil, so it holds today; a round-trip line would pin that. Optional, no board line.

**N2 (note, not this change).** The results file reports the whole-Core run at 549 tests, 2 failures, both fixture
lookups that walk up from the test file outside the repo tree. I did not rerun the whole suite (the packet scopes
WidgetStatusTests); those two are not WidgetStatus and were present before this commit.

## Board

No findings need work, so no new lines for Idris. T-2530 ticked.
{% endraw %}

</div>
