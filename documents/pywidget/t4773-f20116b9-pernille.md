---
layout: "default"
title: "Review of T-4773 at f20116b9: the rerun rule compares dates"
section: "documents"
description: "PASS. The formula is correct on every case I was asked to check (past ask, nil ask, clock set back, floor against cap, time zone) and on the non-finite date; the adapter calls it correctly; my M1 from t4181-bd131735 is\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4773-f20116b9-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4773-f20116b9-pernille.md</code></span></div><h1>Review of T-4773 at f20116b9: the rerun rule compares dates</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4910, Commandment 13). Author: Idris. Reviewed: f20116b93a against df9e1ef6839b:
Shared/LaneRerunRule.swift (`due`, `reruns(_:lastRun:now:)`), the TreeFile adapter in Shared/RefreshWidgetIntent.swift,
Tests/Core/LaneRerunRuleTests.swift (4 new tests), Tests/RefreshTapTests.swift (4 new tests), Tests/mutants-t4773.json
and -results.txt, docs/how-it-works/extension.md. Also read, for context: Shared/RefreshAsks.swift (`askDate`, `asks`),
Shared/TreeTimeline.swift (`TreeDate`, `reloadPolicy`), Widget/PyWidget.swift (the getTimeline call),
python/pywidget_ui/__init__.py (`iso`, `_aware`). Paths are under pywidget/ios/ unless they say otherwise. Line numbers are
at HEAD fbf1569bf2, where the four reviewed files are unchanged since f20116b93a. Date: 2026-11-18.

Closes: my M1 in pywidget/docs/reviews/t4181-bd131735-pernille.md (the ask read as an interval from `sampled_at`). Closed:
the TreeFile adapter now calls `reruns(tree, lastRun:, now:)`, and `due` never reads `sampled_at`.

Tests:
- Core, `swift test --filter LaneRerunRuleTests` in a scratch copy of Core/ (with Shared/, App/ and Tests/): 19 executed,
  0 failures. The scratch copy had to drop Tests/Core/LauncherEditorTests.swift: at HEAD the Core package's test target
  does not compile (`cannot find 'LauncherEditorGate' in scope`, LauncherEditorTests.swift:403, from fc31b49a8e T-4574).
  That is outside this change; noted for the Operator, not filed here.
- My own mutants, tools/mutation_check.py on that copy, LaneRerunRuleTests only: 4 of 5 KILLED. Killed: dropping the
  finite-date guard; `atEnd` with no entries asking from `lastRun + cap`; a nil ask read as the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>; the cap counted from
  the floor. SURVIVED: `now >= due` changed to `now > due` (L1).
- Simulator: not run. A local run of RefreshTapTests and LaneRerunRuleTests (XC_LOCAL=1, iPhone 17; the MacBook route refused it because another session has uncommitted files in this worktree) was stopped after 20 min with no xcodebuild log written; other sessions' runs held the machine's build lock. The 4 new RefreshTapTests are read, not run, by me.
- Not run: the author's 4 mutants (job J-20261118-1459-mut-t4773-idris-1..4; their results file says 4/4 KILLED, and the
  red-first job ran exactly the 4 new RefreshTapTests red against the old rule).

## The formula, case by case

`due = max(lastRun + floor, min(ask, lastRun + cap))`, floor 15 min (RefreshSchedule.swift:15), cap 24 h
(RefreshAsks.swift:12). Floor is under cap, so the answer always lies in [lastRun + 15 min, lastRun + 24 h].

- Ask in the past (before `lastRun + 15 min`, including a fixed 2020 date): the inner `min` keeps the ask, the outer
  `max` <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> it to the floor. Correct, and tested both in Core (`testPastAskIsTheFloorAndFarAskTheCap`) and through the
  file (`testFixedSampledAtIsDueAtTheFloor`). One consequence worth knowing, not a fault: a script that fixes
  `sampled_at` and sets `stale_after` now has a stale mark years back, so it is due at every floor. Before T-4773 it was
  due every `stale_after`. That is the absolute reading the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line asks for, and the app's own scheduler
  (`RefreshAsks.requested`) already reads it the same way.
- Nil ask (`never` with no stale mark): the floor. Unchanged from before T-4773. `missing`, `unreadable` and `atEnd`
  with no entries return `from` (= `lastRun`) from `askDate`, which `max` lifts to the floor; my R3 mutant shows the
  `from:` argument is pinned.
- Ask past the cap: `lastRun + 24 h`. Pinned (the author's cap mutant and my R5).
- Non-finite ask: the floor. `TreeDate` cannot decode to infinity, but `staleAt = sampledAt + stale_after` can overflow
  with a huge `stale_after`; the guard holds it, and an infinite stale mark is "never stale", which is no ask, so the
  floor is the consistent answer. Pinned (my R2).
- Clock skew: a last run after `now` runs at once (line 52), kept from T-4414 and pinned by the author's mutant 4. A
  last run far in the past (phone off for days) is past the 24 h cap, so it runs. The ask's dates come from the same
  phone clock as `lastRun`, so a skew moves both together.
- Time zone: none enters. `due` compares `Date`s, which are absolute. `TreeDate` (TreeTimeline.swift:36-45) parses ISO
  8601 with a zone or offset, and the Python side refuses a datetime with no time zone and writes UTC with `Z`
  (`_aware`, `iso`, pywidget_ui/__init__.py:415-432), so a local-time string with no zone never reaches the rule. A
  script that stamps local time as UTC on purpose (`.replace(tzinfo=timezone.utc)`) moves its ask by its UTC offset,
  at most 14 h, still inside the floor and cap; the old interval rule hid that only when the script mislabelled both
  dates the same way.
- Floor against cap: they never cross. The boundary itself (`now == due`) runs the script, which is right (a tap's
  reload at exactly 15 min should run), but nothing pins it (L1).

The adapter is right: no tree or one that does not decode goes to the floor-only `reruns(lastRun:minimumInterval:now:)`,
which answers the same as `due` would for `.missing`. The 4 RefreshTapTests give 10 min of slack each side of the ask,
so they do not depend on the Simulator's speed.

## Findings

### M1 (Medium): extension.md promises a 24 h limit and a 15 min rerun that nothing delivers -> T-5017

extension.md:62 (added in this commit) says "Two limits hold whatever the script asks: never sooner than 15 minutes after
the last run, and never later than 24 hours after it" and "A widget that asks for nothing ... runs again after the 15
minutes". `due` only answers when getTimeline is called; it does not make iOS call it. For a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> widget nothing does at
24 h:
- the extension hands WidgetKit the script's own policy with no upper bound (TreeTimeline.swift:262-267: `.after(d)` is
  `.after(max(d, now + 15 min))`, `.atEnd` and `.never` pass through; PyWidget.swift:85 sets `recheckWithin` only for a
  Pro premade), so `.after` three days on asks iOS for a reload in three days, and `.never` asks for none;
- with the switch on, a `lane: widget` widget is left out of the app's background refresh asks (RefreshAsks.swift:66),
  so the app's 24 h cap (`requested`) never applies to it either.
So a lane widget whose script asks for three days runs again in three days, unless some other reload happens to come
first, and a `never` widget runs again only when something else reloads it. The 15 min floor is a real limit (the rule
refuses sooner); the 24 h figure and the "runs again after the 15 minutes" sentence are not. Fix either way, and say
which in the commit: (a) make it true, by capping the lane path's WidgetKit `.after`/`.atEnd` at `lastRun + 24 h`
(chair line 2026-11-05 item 1 reads any ask past 24 h as 24 h) and leaving `.never` alone, with a planner test; or
(b) make the page say what happens: the widget is checked when iOS asks, a check never runs it sooner than 15 minutes
after the last run, and a check 24 hours on always runs it. Nothing is shown to testers on this page today, but it is a
how-it-works page and must not claim a limit the build does not keep.

### L1 (Low): the `now == due` boundary is unpinned, and getTimeline's comment still says `sampled_at` -> T-5018

- The `now > due` mutant survives LaneRerunRuleTests, and RefreshTapTests cannot catch it (real clock, 10 min slack).
  Add one assertion: `R.reruns(tree, lastRun: run, now: R.due(tree, lastRun: run))` is true, for an ask between the
  floor and the cap. Add the mutant to mutants-t4773.json.
- Widget/PyWidget.swift:40-41, the comment on the only caller of the rule, still says the script runs "only when
  tree.json's `sampled_at` is older than the widget's minimum interval". Since T-4414 the age is the last run, and since
  T-4773 the wait is the tree's ask as a date. Say that in one line.

## Verdict

PASS. The formula is correct on every case I was asked to check (past ask, nil ask, clock set back, floor against cap,
time zone) and on the non-finite date; the adapter calls it correctly; my M1 from t4181-bd131735 is closed. M1 here is a
documentation promise the build does not keep, which predates this change in code but was first written down in this
commit; it should be fixed before that page is next published or the lane switch reaches a tester build. L1 is a test and
a comment. Neither is a crash, data loss or a review risk.
{% endraw %}

</div>
