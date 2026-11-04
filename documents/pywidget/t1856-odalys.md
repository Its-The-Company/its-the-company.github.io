---
layout: "default"
title: "T-1856 review: T-1755 StaleEntryPlan (Pernille, 03475fa46)"
section: "documents"
description: "Approve. The rule adds exactly one stale entry at T, none when stale_after is absent, and its flags are WidgetFaceRule.isStale at the moment each entry is drawn. It gives the same entries as the shipped planner in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1856-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1856-odalys.md</code></span></div><h1>T-1856 review: T-1755 StaleEntryPlan (Pernille, 03475fa46)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-11-04. Independent (Commandment 13): judged from the diff, state-spec s1 "Stale needs its own timeline entry" and "Absent `stale_after` means never stale" (state-spec.md:26-28), `TreeTimelinePlanner.entries` (Shared/TreeTimeline.swift:198-215) and `WidgetFaceRule.isStale` (Shared/WidgetFaceRule.swift:68-71). Author's notes not used. Host only; no xcodebuild, no Simulator.

## Verdict

**Approve.** The rule adds exactly one stale entry at T, none when `stale_after` is absent, and its flags are `WidgetFaceRule.isStale` at the moment each entry is drawn. It gives the same entries as the shipped planner in 200,000 random cases, ties included. One Low test gap (finding 1) gets a board line for Pernille. It does not block T-1755.

## Measurements


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements, scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| # | Run | Result | n |
|---|---|---|---|
| 1 | Scratch copy of pywidget at 03475fa46 (`git archive`, Core copied with symlinks dereferenced), `swift test --filter StaleEntryPlanTests` | 13 passed, 0 failed | 13 |
| 2 | `tools/mutation_check.py <scratch Core> mutants-t1755.json --filter StaleEntryPlanTests` | baseline 13 green; 21 of 21 killed | 21 |
| 3 | My 7 boundary mutants, same tool and filter (scratch only, not committed) | 6 killed, 1 survived (finding 1); source file restored byte for byte after the run | 7 |
| 4 | Differential, `swiftc` over StaleEntryPlan.swift + WidgetFaceRule.swift + a date-only transcription of `TreeTimelinePlanner.entries` (scratch `diff/main.swift`): integer minutes, 0-5 entries in 0..80, sampled_at -5..20, stale_after nil (1 in 6) or -10..70 min, now -10..90 | 0 planner mismatches, 0 `isStale` mismatches, 0 plans with more than one synthetic entry, 0 synthetic or stale entries with `stale_after` absent. Of the cases: 7,868 had duplicate dates, 52,065 had a synthetic entry | 200,000 |

</div>


The full Core suite was not rerun; the review scope is the one suite. Run 4 is a transcription, not the shipped planner: TreeTimeline.swift is not in the Core package (it needs WidgetKit), so it cannot be called on the host.

## Spec and planner check


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Spec and planner check, scrolls sideways" style="--tw:938px" markdown="1">

| Case | Code | Test | Match |
|---|---|---|---|
| One synthetic entry at T, between entries, clones the one before | StaleEntryPlan.swift:43-44 | Tests:30-35 | yes |
| T after the timeline's end: synthetic last; `.atEnd` asks at T | :43-44, :51 | Tests:38-44 | yes |
| T before the next refresh, only the current entry left | :43 | Tests:47-49, 79-81 | yes |
| T before the first entry, all entries ahead: each stale, no synthetic | :36, :43 (no `before`) | Tests:53-55 | yes |
| T at or before now: current entry stale from the start, no synthetic | :36, `t > now` :43 | Tests:58-60, 77 | yes |
| Entry exactly at T is stale and is the stale entry (`>=`) | :36, `contains` :43 | Tests:70-73 | yes |
| Past dates: only the newest past entry kept, drawn from now | :31-32, `max(d, now)` :36 | Tests:58-60, 66 | yes |
| Absent `stale_after`: no synthetic, no flag | :36 (isStale nil), :39 | Tests:63-67 | yes |
| Ties: first in document order kept (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G6</span>), as `ordered` | :26-30 | Tests:91-95 | yes |
| Planner's `t > kept[0].date` and force unwrap replaced by `lastIndex` | :41-43 | run 4 | equivalent (also argued in :41-42) |

</div>


`sampledAt` is non-optional here while `isStale` takes `Date?`; that matches `ViewTreeTimeline.sampledAt`, which the decoder requires (TreeTimeline.swift:106). Not a finding.

## Findings

1. **Low, test gap: a synthetic entry when sampled_at is ahead of now is never tested.** Mutant o6, `guard let staleAfter, staleAfter > 0 else { return out }` (StaleEntryPlan.swift:39), survives. The flags are unchanged, but with `stale_after` 0 and `sampled_at` later than the extension's clock, the mark at T is lost and waits for the next reload. That is the failure s1 exists to prevent. Tests:84-87 says "stale from sampled_at on" but only tests now equal to sampled_at. Fix: one test, `plan([-10, 10], now: -5, staleAfter: 0)` expects `[e(-10, 0, stale: false), e(0, 0, stale: true, synthetic: true), e(10, 1, stale: true)]`, and o6 added to mutants-t1755.json. Board line T-2147.

2. **Info: two copies of the rule until T-0048.** The shipped planner still uses its own closure and a hard-coded `stale: true` (TreeTimeline.swift:205, 210), not this rule or `isStale`. They agree today (run 4). The host tests cover the shipped path only once T-0048 makes `entries` call `StaleEntryPlan.plan`. No fix line; noted for T-0048.

## My mutants (run 3)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: My mutants (run 3), scrolls sideways" data-n="1" style="--tw:536px" markdown="1">

| Name | Change | Result |
|---|---|---|
| o1 | current entry `<= now` to `< now` (:32) | killed (1) |
| o2 | T one second late (:40) | killed (16) |
| o3 | clock side one second early, `max(d, now + 1)` (:36) | killed (1) |
| o4 | synthetic gated on the first entry instead of now (:43) | killed (4) |
| o5 | no synthetic after the last entry (:43) | killed (3) |
| o6 | `stale_after` 0 gives no synthetic (:39) | **survived** (finding 1) |
| o7 | synthetic only before the next refresh (:43) | killed (8) |

</div>
{% endraw %}

</div>
