---
layout: "default"
title: "T-1811 review: T-1754 WidgetFaceRule (Pernille, 825e6083d)"
section: "documents"
description: "Approve. The rule matches the spec on all five rows and on the order. The tests catch a wrong order and an off-by-one at the stale boundary. One test gap (finding 1) gets a board line for Pernille, P2. It does not block\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1811-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1811-odalys.md</code></span></div><h1>T-1811 review: T-1754 WidgetFaceRule (Pernille, 825e6083d)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-11-03 23:15 ET. Independent (Commandment 13): judged from the diff, state-spec s1 "Which state shows" (state-spec.md:12-30) and state-tokens.json `priority` (line 7) and `priority_note` (line 9). Author's done-note not used.

## Verdict

**Approve.** The rule matches the spec on all five rows and on the order. The tests catch a wrong order and an off-by-one at the stale boundary. One test gap (finding 1) gets a board line for Pernille, P2. It does not block T-1754.

## Measurements


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Measurements, scrolls sideways" data-n="1 4" style="--tw:725px" markdown="1">

| # | Run | Result | n |
|---|---|---|---|
| 1 | `swift test` in pywidget/ios/Core, main checkout, 22:42-22:50 | WidgetFaceRuleTests 15 passed, 0 failed. The whole run: 444 executed, 20 failures, all 20 in StaleEntryPlanTests. That suite is untracked work in progress by another agent (Shared/StaleEntryPlan.swift, Tests/Core/StaleEntryPlanTests.swift, `??` in git status), not part of 825e6083d | 444 |
| 2 | Scratch copy of Core at a15f3a2a8 (`git archive`, symlinks dereferenced, state-tokens.json placed above it at the same relative path), `swift test --filter WidgetFaceRuleTests` | 15 passed, 0 failed. So the <span title="A test written in advance. If it fires, we drop the idea.">kills</span> below are real kills | 15 |
| 3 | `tools/mutation_check.py . mutants-t1754.json --filter WidgetFaceRuleTests` on the scratch copy | 23 of 23 killed | 23 |
| 4 | My own 6 probe mutants, same tool and filter (scratch only, not committed) | 3 killed, 3 survived (see findings 1 and 2) | 6 |

</div>


I did not use the full scratch run as a baseline. Other suites (CitySearch, LinkRule, ProjectManifestReader) read fixtures above the package that the copy does not have, and XCTest stopped before it reached WidgetFaceRuleTests. Run 1 is the full-suite number.

## Spec check (WidgetFaceRule.swift)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Spec check (WidgetFaceRule.swift), scrolls sideways" data-n="3" style="--tw:699px" markdown="1">

| Spec row | Code | Match |
|---|---|---|
| 1 update: `version` not readable | :59 | yes |
| 2 Pro card: Pro premade, and the entitlement is missing or the file is missing | :60 (`proEntitled` false when the file is missing, :40) | yes |
| 3 error card: no good render, or `tree_too_large`; too-large variant | :61, `tooLarge` picks the variant | yes |
| 4 badge: newest run failed, a last good render exists | :62 (a good render is implied, because row 3 returns first) | yes |
| 5 stale: `stale_after` set and `now >= sampled_at + stale_after`; absent means never | :68-71 | yes |
| Order = `priority` [update, pro_card, error_card, error_badge, stale] | if-chain :59-63; `token` :21-30 | yes |

</div>


The tests catch a wrong order. Every adjacent swap is a seeded mutant and is killed (pro-below-update, error-card-below-pro, badge-above-error-card, stale-outranks-badge). `everything` (Tests:28-36) also kills any row moved to the top.

The tests catch a stale off-by-one. Boundary at exactly T (Tests:100), T - 1 ms (Tests:101), stale_after 0 (Tests:102-103). `>` for `>=` is killed. My probes at T + 1 s and T - 1 s were both killed. A nil `sampled_at` treated as distant past was killed by Tests:114.

## Findings

1. **Medium, test gap: an entitled Pro premade is never tested past row 2.** Tests:51 checks only that an entitled premade gives the plain render. No test gives an entitled premade a failure. Two of my probe mutants survive:
   - `if f.proPremade { return f.proEntitled ? .lastGoodRender : .proCard }` (WidgetFaceRule.swift:60). An entitled premade then never shows the error card, the badge or the clock.
   - `if f.newestRunFailed, !f.proPremade {` (WidgetFaceRule.swift:62). Premades then never badge. This is an easy misreading of `priority_note` ("no run is made, so there is nothing to badge"), which covers only the locked case.

   The code is correct today. The risk is in T-0048's wiring and in later edits: a paying user's broken premade would look healthy. **Fix:** one test in WidgetFaceRuleTests with `proPremade = true, proEntitled = true`. It should expect `.errorCard(tooLarge: false)` when there is no good render, `.errorBadge` when the newest run failed, and `.stale` at `now = staleAt`. Add both mutants above to mutants-t1754.json. Board line below.
2. **Low, test gap: row 1 is tested only with `stale_after` set.** The probe `if !f.versionReadable, f.staleAfter != nil {` (:59) survives, because the `facts()` default and `everything` both set `staleAfter`. The mutant is contrived. The fix is one assert: `face { $0.versionReadable = false; $0.staleAfter = nil } == .update` at Tests:46. It goes in the same board line as finding 1.
3. **Low, advisory, no board line: the defaults fail toward the plain render.** `Facts` defaults `versionReadable = true` and `goodRenderExists = true` (:37, :43). If a caller forgets a fact, it gets the quietest wrong face, not a card. That is fine for the tests' helper. When T-0048 (Idris) wires the provider, it should set all six state facts explicitly, and its review should check this.
4. **Info: the token test fails loudly when the docs are missing.** Tests:119-132 walks up from `#filePath` and fails, rather than skipping, when state-tokens.json is absent. That is the right choice. Any scratch copy used for mutants must place the file above the package, as I did in runs 2-4. Without it, every mutant "dies" on the token test alone.

Nothing in the diff touches Widget/. `WidgetFace` and `WidgetFaceRule` have no name clash in the app, the widget or Shared (grep, 23:00).
{% endraw %}

</div>
