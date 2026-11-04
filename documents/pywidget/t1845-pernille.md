---
layout: "default"
title: "T-1845: review of T-1794 (Idris, 236f04d9f), RefreshOutcomeRule"
section: "documents"
description: "Approve with changes. For the inputs it takes, the rule matches the s10 (d) table and both bullets: a tap whose fetch fails writes error and badges, a scheduled reload whose fetch fails writes nothing, a failed or\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1845-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1845-pernille.md</code></span></div><h1>T-1845: review of T-1794 (Idris, 236f04d9f), RefreshOutcomeRule</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-03. Independent (Commandment 13): I judged from the diff, state-spec s10 (d) (`pywidget/docs/design/states/state-spec.md:300-309`), RunRow.swift, WidgetStatus.swift and WidgetWriter.swift. I did not read the author's notes.

## Verdict

**Approve with changes.** For the inputs it takes, the rule matches the s10 (d) table and both bullets: a tap whose fetch fails writes `error` and badges, a scheduled reload whose fetch fails writes nothing, a failed or timed-out script keeps its own word on every trigger, and the age line moves only on a clean run. The tests check every trigger, script and fetch combination, and they agree with `WidgetStatus.showsBadge` and T-1754's `WidgetFaceRule`. It can merge as it stands. F1 and F2 must land before T-0678 / B5 call the rule. Otherwise the tap that is supposed to show the badge will stay silent, or it will badge with no readable reason.

## Evidence (run by me)

- `swift test` in pywidget/ios/Core, run once in a clean scratch tree made with `git archive 236f04d9f` (pywidget/ios, tests, docs, python), because the shared checkout holds other agents' unbuilt edits to AgeLine and StaleEntryPlan: **432 tests, 0 failures**. All 9 RefreshOutcomeRuleTests passed. The commit message says 445. That count probably included suites that are uncommitted in the shared tree. This is not a defect, but the number cannot be checked at the commit.
- `mutants-t1794.json` in the same scratch tree, one mutant at a time, `swift test --filter RefreshOutcomeRuleTests`. Each `find` string matches exactly once. Results are in the Mutants line below.

## The two choices Idris asked about

**Trigger mapping (tap = `intent`; scheduled = `system`/`bg_refresh`; Shortcuts = `shortcut`; app run = `app_foreground`/`editor_save`).** This is correct against RunRow's words (`RunRow.swift:82-85`, L2 s3.3) and against T-1680's `refreshIntentTrigger = .shortcut` (`App/Bridge/WidgetWriter.swift:122-125`). The exhaustive switch (`RefreshOutcomeRule.swift:34-40`) and `testOnlyTheRefreshTapAsks` (tests:89-91) make it impossible to add a tap silently. Two caveats: nothing in the app writes `intent` yet (F1), and the spec says nothing about Shortcuts (F4).

**`error` as a failed forced fetch's word.** Agreed. `error` is in the Failed set (`RunRow.swift:70-74`) and badges through `showsBadge` (`WidgetStatus.swift:242-251`). The loop breaker counts only `killed`/`stuck` (`WidgetStatus.swift:275-282`), so a flaky network cannot demote a widget. A new outcome word would change ADR-007 7.2 in Python, Swift, the Failed set, `showsBadge` and the loop breaker, all to say what `error_type` can already say. What is missing is the `error_type` itself (F2).

**Whose word is needed:** Maren's on F3 and F4 (s10 is her spec, and the run-detail line in F2 is user-facing text). Ines's is **not** needed: neither choice changes an ADR word list, a product rule or a priority. It would be needed only if someone proposes a new outcome word instead of `error`.

## Findings

### F1. Medium. The tap's trigger `intent` has no writer, and the one refresh intent writes `shortcut`
`RefreshOutcomeRule.swift:30-36`. The rule's whole tap branch depends on the widget's refresh button writing `RunTrigger.intent`. Today no app code writes `.intent`; only `Tests/WidgetWriterTests.swift:367` does. The only refresh intent, `RefreshWidgetsIntent`, goes through `refreshIntent()` with `.shortcut` (`WidgetWriter.swift:125-129`). T-0430's test also forbids any widget button from constructing it (`Tests/PreviewQueueTests.swift:260-262`). Suppose B2/T-0678 wires `pywidget.refresh` the easy way, by reusing `refreshIntent()` or a `force: true` pass with the default trigger. Then every tap writes `shortcut`, and this rule silences exactly the case s10 (d) says must answer. No test anywhere would fail.
**Fix (T-1861, Idris, with T-0678):** the refresh button's intent passes `trigger: .intent`. Add one test in T-0678 asserting that a button refresh writes `intent` rows. Name that test in the doc comment at `RefreshOutcomeRule.swift:30-33`.

### F2. Medium. A failed fetch's row has no named `error_type`, and the one-row-or-two question is open
`RefreshOutcomeRule.swift:17-18, 21, 49`. "The caller sets" `error_type`, so B5 will invent one. The row is an `error` whose script succeeded: there is no file, no line and no traceback. Run detail and the badge's tap-through show `error_type`, so the person sees whatever string B5 picked. The doc at :21 ("its ok row is the run log's own") also does not say whether a tap with an ok script and a failed fetch writes one `error` row instead of `ok`, or `ok` and then `error`. The badge test (tests:118-120) assumes the run's status ends as `error`. If B5 writes `error` and then `ok`, the badge clears and the tap goes silent again.
**Fix (T-1862, Idris):** name the token in the rule, for example `static let fetchErrorType = "FetchFailed"`, and add one test that it is what the rule hands the row writer. In the doc, state that the run's single row and status.json carry this word in place of `ok`. Maren writes the run-detail line for the token (T-1863).

### F3. Low. Spec row 3 is unreachable on a tap; the test named for it covers the scheduled case
`RefreshOutcomeRule.swift:15, 48-49`; tests:50-58. s10 (d)'s table sits under "After the tap", and row 3 ("Bound field missed but the script ran": no badge, that field's old time) is separate from row 2's "forced fetch failed". The rule reads row 3 as "fetch failed, not a tap". On a tap, row 3 cannot happen: `false` gives row 2 (badge) and `true` gives row 1 (`ageMoves: true`). That includes a forced fetch that succeeds while one bound field still misses. B3's rule (c), oldest shown time, will still draw that field's old time, so the face is right and only the `ageMoves` claim is wrong. `testABoundFieldMissedWhileTheScriptRanWritesNoneAndKeepsItsTime` feeds the same `(.ok, false)` input as the scheduled test for every trigger except the tap, so its name promises row 3 but it checks the bullet.
**Fix:** Maren says whether row 3 can happen on a tap (a partial fetch) and what it shows (T-1863). Idris documents `ageMoves` as "this run's time is offered to (c)" rather than "the age line shows the new time", and renames the test to the input it covers (T-1862).

### F4. Low. Shortcuts and the reserved words people tap are silent by the reviewer's reading, not the spec's
`RefreshOutcomeRule.swift:31-33, 37-38`. s10 (d) names only the tap and scheduled reloads. A person who runs "Refresh Widgets" through Siri or a Shortcuts tap is also asking "is this current?". An automation is not, and the row cannot tell the two apart (both write `shortcut`). Silent is the safer default: unattended automations add no badge noise, the stale mark covers the gap, and it agrees with T-1680. But it should be a sentence in the spec. `control` and `widget_action` are reserved words for things a person taps, and they are already placed as silent. When they come out of reserve, the exhaustive switch will not make anyone reconsider them.
**Fix:** Maren adds one line to s10 (d) on Shortcuts (T-1863). Idris adds a note at :37-38 that the reserved words people tap are silent until their own lines decide them (T-1862).

### Nit (no line)
`forcedFetchOK: false` reads as a double negative at call sites. A three-case enum (`none`, `ok`, `failed`) would read better. It is a matter of taste, so I accept the `Bool?` with its doc.

## Mutants

16/16 killed, no compile-error <span title="A test written in advance. If it fires, we drop the idea.">kills</span>. The tests pin every row of the table, the badge derivation and every trigger's placement.
{% endraw %}

</div>
