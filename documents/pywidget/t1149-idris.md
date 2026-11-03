---
layout: "default"
title: "T-1156: review of T-1149 (Odalys, a58b2cdd)"
section: "documents"
description: "The ledger feeds the rule what the rule&#x27;s header asks for, and the day counting is right. One P2 and three P3 findings, each with a fix line. None blocks the T-0273 wiring from starting; F1 should land before it ships."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1149-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1149-idris.md</code></span></div><h1>T-1156: review of T-1149 (Odalys, a58b2cdd)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-11-02. Independent review (C13) of RatingFactsLedger, RatingFactsStore and RatingFactsLedgerTests,
read from `git show a58b2cdd` against the header of `RatingRequestRule.swift` and the rating row of the revenue-gap
memo s3 ([`pywidget/docs/proposals/DECISION-2026-10-26-revenue-gap.md`](decision-2026-10-26-revenue-gap.html)). Not the author's notes. Host only:
`swift test` on the Core package in a detached scratch worktree at a58b2cdd (Swift 6.4), no Xcode, no Simulator.

## Verdict: PASS WITH FIXES

The ledger feeds the rule what the rule's header asks for, and the day counting is right. One P2 and three P3
findings, each with a fix line. None blocks the T-0273 wiring from starting; F1 should land before it ships.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:484px" markdown="1">

| Check | Result |
|---|---|
| `swift test --filter RatingFactsLedgerTests` | 23 tests, 0 failures |
| The author's mutants, `tools/mutation_check.py . mutants-t1149.json --filter RatingFactsLedgerTests` | 26 of 26 KILLED |
| Two mutants of mine (below), same command | 2 of 2 SURVIVED |
| A probe suite of mine, 5 tests printing what the ledger does (scratch only, not committed) | results below |

</div>


The scratch worktree was clean after the mutant runs (`git status` empty): every file was restored.

## Day counting across midnight and time zones: correct

- A day is the Gregorian calendar day in the zone passed with the run, fixed at the run's finish. The calendar is
  named, not `Calendar.current`, so a device set to the Buddhist or Japanese calendar keys the same way.
- 23:59 and 00:01 local are two days (test). Tokyo 23:50 and 00:10 are two days though both are 11-02 in UTC
  (test; the author's "day taken in UTC" mutant dies on it). A Tokyo day stays a Tokyo day after a move to Los
  Angeles (test).
- Probe P6, the Los Angeles fall-back night of 2026-11-01: 01:30 PDT and 01:30 PST are one day, 23:59 PST and 00:01
  the next morning are two. Correct.
- Probe P5: Tokyo 00:30 on 11-03 and, one minute later, Los Angeles 07:31 on 11-02 count as two days. That is
  decision 3 as written (the person's calendar as lived) and matches the rule's "local calendar days". Rare enough
  to accept; no finding.

## The unreadable-record choice

Decision 7 (unreadable = already asked, absent = fresh) is the right way round, and the tests pin garbage bytes, an
empty file, a newer version and the repair on the next update. The gap is in what counts as "absent": F1.

## Findings

**F1 (P2), a read that fails is treated as a fresh install, and the next update overwrites the real record.**
`RatingFactsStore.file` reads with `try? Data(contentsOf:)`, so any read error is `nil`, and `decode(nil)` is a
fresh ledger. `update` then writes it back. Probe P1: an asked record (sessionIndex 5) in a file set to mode 0200;
`load()` gives alreadyAsked false, sessionIndex 0; after one `update { sessionStarted() }` the file on disk <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>
alreadyAsked false, sessionIndex 1. The one request is forgotten and a second can be made. On the device the same
shape is the UserDefaults store read before first unlock (a prewarmed launch), which returns no data. iOS's own
yearly <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on the sheet limits the harm to a nag, not a rejection, but it is the case decision 7 exists to prevent.
Fix: T-1164.

**F2 (P3), the version check and its header disagree on older records.** Decision 7 says a record written by a
newer version is unreadable; `decode` requires `version == currentVersion`, so an older one is unreadable too.
Nothing pins either reading: my mutant `l.version <= currentVersion` survives. Today only version 1 exists, but the
first schema bump without a migration would mark every existing user as already asked. Fix: T-1165.

**F3 (P3), decode trusts the day list.** Probe P2: a record holding `["2026-11-02", "2026-11-02"]` decodes to
successfulRunDays 2. No test decodes more than `dayCap` days: my mutant deleting the decode's `prefix(dayCap)`
survives. Only a damaged but well-formed record reaches this. Fix: T-1166.

**F4 (P3), decision 5's wording and one test name say more than the code does.** "An error after successes means
no ask this session" (ledger decision 5; `testAnErrorAfterSuccessesMeansNoAskThisSessionButAskNext`). Probe P4:
success, error, success in one session gives shouldAsk true. The code follows the rule's decision 5 (`lastOutcome`
is the last thing to finish) and the memo's "never after an error"; the comment and test name should say so, and
a test should pin it. Fix: T-1167.

## Notes, no fix line

- `takeAsk()` spends the request in one step on one value (decision 6). Two `store.update` calls from different
  threads could both load before either writes; RatingFactsStore is not Sendable, so Swift 6 keeps it on one
  actor in practice. The T-0273 wiring should call it from the main actor only.
- A synthesized `Decodable` ignores the default values, so a record missing any key is unreadable. That is
  consistent with decision 7; it matters for F2's migration choice.
{% endraw %}

</div>
