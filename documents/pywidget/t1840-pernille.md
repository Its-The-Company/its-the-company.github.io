---
layout: "default"
title: "Review T-1865: Idris&#x27;s c9a18c0cf (T-1840, AgeLine.time takes staleAfterSet)"
section: "documents"
description: "Verdict: approve with changes. The rule in AgeLine.time is the spec&#x27;s own one-liner (min(boundFieldTimes + (staleAfter != nil || boundFieldTimes.isEmpty ? [sampledAt] : []))) and all six worked examples come out as the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1840-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1840-pernille.md</code></span></div><h1>Review T-1865: Idris's c9a18c0cf (T-1840, AgeLine.time takes staleAfterSet)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent review (Commandment 13): judged from `git show c9a18c0cf` and
state-spec s10 (c) "Which time" as rewritten in 1b57eb1d2 (T-1836), not the author's notes.

**Verdict: approve with changes.** The rule in `AgeLine.time` is the spec's own one-liner
(`min(boundFieldTimes + (staleAfter != nil || boundFieldTimes.isEmpty ? [sampledAt] : []))`) and all six
worked examples come out as the table says. The changes are about what the tests cannot see: half of
"Which time" (which fields count, what "set" means) lives in a caller that does not exist yet.

## What I ran

- Scratch copy of `pywidget/ios` at c9a18c0cf (`git archive`, `cp -RL Core`), so Idris's parallel T-1859
  edits could not leak in. `swift test --filter AgeLine`: 31 tests, 0 failures.
- `tools/mutation_check.py` on the same scratch package, `--filter AgeLine`: committed
  `mutants-t1793.json` and five mutants of mine. Results in "Mutants" below.

## The six worked examples against the code (now 2:46 PM, medium 251 pt)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The six worked examples against the code (now 2:46 PM, medium 251 pt), scrolls sideways" data-n="1" style="--tw:1482px" markdown="1">

| # | Spec line | Inputs the test passes | `time()` by the code | Test asserts | Match |
|---|---|---|---|---|---|
| 1 | All bound, unset, script 9:02: "Updated 2:38 PM" | [2:41, 2:38], 9:02, false | scriptCounts false, min = 2:38 | 2:38, .time, full | yes |
| 2 | All script, 1:52, 45 min: "Updated 1:52 PM" | [], 1:52, true | 1:52 | 1:52, .time, full | yes |
| 3 | Mixed, clock on, 2:41 and 2:05, 30 min: "Updated 2:05 PM" | [2:41], 2:05, true | min(2:41, 2:05) = 2:05 | 2:05 | yes; the old rule gives 2:41, so this <span title="A test written in advance. If it fires, we drop the idea.">kills</span> T-1793's reading |
| 4 | Mixed, clock off, 2:41: "Updated 2:41 PM" | [2:41], 2:05, false | 2:41 | 2:41 | yes. The spec gives no `sampled_at` here; the test picks one older than the field, which is the choice that discriminates. Good |
| 5 | Stale bound field 1:40, bus 2:41, unset: "Updated 1:40 PM" | [2:41, 1:40], 2:30, false | 1:40 | 1:40 | yes, on the rule; see F1 for the field-selection half |
| 6 | Placeholder, `sampled_at` Mon 9:02, unset: "Updated Monday"; small xxxLarge "Mon" | [], 2026-11-02 9:02 (a Monday, checked), false | 9:02 Mon, .weekday | weekday full at 251; short at 78 | rule yes; see F1 and F2 |

</div>


Edge cases also covered: set with no `sampled_at` and fields (earliest field), set or unset with neither (nil, no
line), a field older than `sampled_at` under both settings. I found no input where the code and the spec
sentence disagree. The `line()` plumbing passes `staleAfterSet` through, and two committed mutants pin it.

## Findings

**F1 (Medium, board T-1910): the field-selection half of "Which time" has no code and no test.** The doc comment says
`boundFieldTimes` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> only fields drawn with a value, and that the caller maps `stale_after` to a Bool. At
c9a18c0cf nothing outside the tests calls `AgeLine.time` or `AgeLine.line` (grep over `pywidget/ios`, Swift,
excluding Tests and AgeLine.swift: no hits). So:
- Example 6 is tested by passing `bound: []` by hand. That exercises the empty-fields fallback, not the
  placeholder rule. A renderer that passes the `at` of a field drawn as "--" (never fetched, cleared by
  `declared`, past `until`) passes all 31 tests and shows that field's time.
- Example 5 is the opposite boundary: `temp` past `max_age_s` but not past `until` is still drawn with its
  value and must stay in the list. Also untested, for the same reason.
- `stale_after` has `"minimum": 0` in `pywidget/docs/design/viewtree.schema.json`, so `stale_after: 0` is set.
  A caller that maps `(staleAfter ?? 0) > 0` drops the script clock on that tree. The spec says `!= nil`.

Fix, either way is fine by me: (a) `AgeLine` takes per-field records (`at`, drawn-with-value or the reason it
is a placeholder) plus `staleAfter: Double?`, filters itself, and the tests cover never fetched, cleared by
`declared`, past `until`, past `max_age_s` before `until`, and `stale_after: 0`; or (b) the same cases become
acceptance tests on T-1440's renderer, written into its board line now so they are not lost. (a) keeps the
whole rule in one host-testable place, which is where I would put it.

**F2 (Low, board T-1911): example 6's small-widget assertion and comment.** The comment says "Small at xxxLarge: 'Updated
Wednesday' is 107.9 pt in 78". In s10 (c) "Small widget, decided", 107.9 pt is "Updated Wednesday" at Large;
the xxxLarge full forms are 121.3 to 166.8 pt. The example's day is Monday, not Wednesday. The assertion
(`.short` in 78) holds for any of those widths, so the test is right; the comment cites the wrong measurement.
Separately, the spec says small at xxxLarge shows "Mon", the T-1797 third form (abbreviated weekday). `Length`
has only `full` and `short`, so the rule reports `.short` where the face draws a third form. That belongs to
T-1797 / T-1440, not T-1840, but no board line names it (grep "abbreviated weekday", "third form": none).
Either `Length` gains the third case for the weekday form, or the comment says the drawing owns it and T-1440's
line says so.

**No F3.** I went looking for a mutant gap on the `compactMap` step and the `line()` plumbing; the tests kill
every non-equivalent mutant I wrote (below).

## Mutants

- Committed `Core/mutants-t1793.json`: **29/29 KILLED** on the scratch copy at c9a18c0cf, which agrees with
  the commit message.
- Mine (`--filter AgeLine`, second scratch copy):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Mutants, scrolls sideways" style="--tw:902px" markdown="1">

| Mutant | Change | Result |
|---|---|---|
| p-count-lt-2 | script clock counts when fewer than 2 fields | KILLED (2) |
| p-line-negates | `line()` passes `!staleAfterSet` | KILLED (3) |
| p-nil-to-future | missing `sampled_at` becomes `.distantFuture`, not dropped | KILLED (3) |
| p-last-field | only the last field counts | KILLED (3) |
| p-sampled-only-if-older-than-first | with `stale_after` set, `sampled_at` counts only if older than the first field | SURVIVED, **equivalent**: `sampled_at` changes the minimum only when it is older than every field, so also older than the first. Not a test gap |

</div>


Tooling note, not a finding on this commit: my first run was killed by the 10-minute background limit and left
a committed mutant (`guard fullWidth(form) <= room else { return nil }`) planted in the scratch copy.
`mutation_check.py` puts the file back in a `finally`, and a SIGKILL skips it. That never touches the main
checkout if the tool is only pointed at scratch, as its docstring says, but whoever reruns in the same scratch
must restore it first. At about 2.3 minutes per mutant here, 29 mutants need a background timeout over an hour.

## Not in scope

T-1859 (my T-1837 F2 and F3) is being fixed by Idris on the same file in parallel; I did not re-review it here
and did not touch `AgeLine.swift` or its tests.
{% endraw %}

</div>
