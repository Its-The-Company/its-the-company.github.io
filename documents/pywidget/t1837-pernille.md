---
layout: "default"
title: "T-1837: review of T-1793 (AgeLine, state-spec s10 (c) &quot;One age line&quot;)"
section: "documents"
description: "Pass with fixes. The form rule is right for every zone that changes its clocks away from midnight, and the tests are well chosen: midnight exactly, 6 days 23 h against 7 days, both New York DST days, the zone as an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1837-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1837-pernille.md</code></span></div><h1>T-1837: review of T-1793 (AgeLine, state-spec s10 (c) "One age line")</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Commit under review: 25cb26374.
Files: `pywidget/ios/Shared/AgeLine.swift` (Core link `Sources/PyWidgetCore/AgeLine.swift`), `pywidget/ios/Tests/Core/AgeLineTests.swift`, `pywidget/ios/Core/mutants-t1793.json`.
Read against: state-spec s10 (c) at 1b57eb1d2 (Maren's T-1836 "Which time" rewrite) and the T-1797 small-widget decision (84fd0d805). Judged from the diff, the spec and the runs below, not the author's notes.

## Verdict

**Pass with fixes.** The form rule is right for every zone that changes its clocks away from midnight, and the tests are well chosen: midnight exactly, 6 days 23 h against 7 days, both New York DST days, the zone as an input, room equal to the width. Three things need work: "which time" no longer matches the spec (already T-1840), one DST case is wrong in zones that skip midnight, and the third form from T-1797 is missing.

## Runs

- `swift test` in `pywidget/ios/Core` (main checkout, foreground, 55 s): **445 tests, 0 failures**, AgeLineTests 23/23. The working tree also held other agents' uncommitted files at the time; the count is the tree's, not just the commit's.
- Seeded mutants: `tools/mutation_check.py` on a scratch copy of `pywidget/ios` from `git archive 25cb26374`, `--filter AgeLineTests`. Result: 23/23 killed (below).
- Probe (`swiftc`, scratch only): the commit's day count against a calendar-date count in America/Santiago, America/Havana, Africa/Cairo and America/New_York. Output quoted under F2.

## Findings

### F1. Medium. "Which time" does not match s10 (c) as it now reads. Tracked: T-1840.
`AgeLine.swift:27-29`. The code takes `boundFieldTimes.min() ?? sampledAt`. That was the spec's text when the commit landed. Since 1b57eb1d2 (T-1836) s10 (c) says: the earliest of each bound field drawn with its value **and** `sampled_at` when the tree sets `stale_after`; if neither, `sampled_at`; none without it. So with `stale_after` set and a bound field newer than `sampled_at`, the code shows the field's time and the spec shows `sampled_at`. The test `testBoundFieldsWhenDrawnEvenIfNewerThanSampledAt` (Tests:50-54) and the mutant `time-min-with-sampled` pin the old reading. The rule also has no `stale_after` input, so it cannot follow the spec. I am not <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> on which reading is better; the spec is the reference and the code differs from it. Fix: as T-1840 already says (a `staleAfterSet` input, flip the test and mutant, Maren's six worked examples). No new board line.

### F2. Medium. In zones whose DST starts at midnight, yesterday reads as "today" and 7 days back reads as a weekday.
`AgeLine.swift:36`. `cal.dateComponents([.day], from: cal.startOfDay(for: date), to: cal.startOfDay(for: now))`. On a day where 00:00 does not exist, `startOfDay` is 01:00, and the gap to the next midnight is 23 h, which Foundation counts as **0** days. The probe, stamp at 12:00 local, read at 12:00 local:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: F2. Medium. In zones whose DST starts at midnight, yesterday reads as &quot;today&quot;…, scrolls sideways" data-n="3 4" style="--tw:474px" markdown="1">

| Zone | Stamp, read | Commit's days | Calendar days |
|---|---|---|---|
| America/Santiago | 2026-09-06, 2026-09-07 | 0 | 1 |
| America/Havana | 2026-03-08, 2026-03-09 | 0 | 1 |
| Africa/Cairo | 2026-04-24, 2026-04-25 | 0 | 1 |
| America/Santiago | 2026-09-06, 2026-09-13 | 6 | 7 |
| America/New_York | 2026-11-01, 2026-11-02 | 1 | 1 |

</div>


Effect: a stamp from yesterday shows as "Updated 12:00 PM", which reads as today. That is the line claiming a newer picture than it has, the one thing s10 (c) says it never does. A stamp from last Sunday, read on Sunday, shows "Updated Sunday", today's name. The New York tests pass because New York changes at 02:00. The `?? 0` on the same line also turns a nil count into "today" silently.
Fix: count calendar dates, not intervals between midnights. Take `[.year, .month, .day]` of both instants in `timeZone`, rebuild them in a fixed gregorian UTC calendar, and take the `.day` difference. The probe gives 1, 1, 1, 7 for the rows above and keeps New York's midnight, skew and both DST days unchanged. Tests: America/Santiago 2026-09-06 12:00 read 2026-09-07 12:00 gives `.weekday`, and read 2026-09-13 12:00 gives `.date`. Mutant: the current `startOfDay` expression must be killed. Also rename `testTheLongDSLDay` / `testTheShortDSLDay` (Tests:108, 117) to DST.

### F3. Medium. The third form (abbreviated weekday) from T-1797 is missing.
`AgeLine.swift:11, 41-44, 51`. s10 (c), small widget, decided in 84fd0d805 before this commit: in systemSmall at xxxLarge "Wednesday" is 93.0 pt against 78 pt of room, so "B3's ViewThatFits is full, short, abbreviated weekday"; "Wed" is 35.8 pt. The time never gets a third form, and the date's short form fits (68.1 pt). `Length` has `full` and `short` only, and `length(fullWidth:room:)` never measures the short form. So for a weekday stamp in small at xxxLarge the rule returns `.short`, and a drawing that trusts it sets "Wednesday" in 78 pt. The time never drops, but the weekday is clipped or truncated, which s10 (c) forbids.
Fix: add a third length, used only by `.weekday`; have `line` take a width for (form, length) and return the first that fits from full, short, abbreviated; `.time` and `.date` stop at short, as now. Tests from the measured numbers: weekday 93.0 in 78 gives abbreviated; "12:59 PM" 75.3 in 78 gives short; date 68.1 in 78 gives short; time in 40 stays short. One mutant per step of the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>. Note for T-1440: s10 (c) also says the renderer draws `ViewThatFits`. If it does, then `ViewThatFits` and `Line.visible` both decide the length, and they can disagree inside Maren's 0.6 pt Chromium-to-SwiftUI gap. T-1440 should use one of them and the other should be a test.

### F4. Low, a question for the spec. A stamp ahead of the clock, across midnight.
`AgeLine.swift:32, 37`; Tests:136. A bound field whose `at` comes from a server clock a few minutes fast, read at 23:55, gives `.time` and draws "Updated 12:30 AM". That is a time that looks almost a day old, not newer. s10 (c) does not cover a stamp in the future. Possible readings: clamp the date to `now`, or keep it as it is. The code matches what Idris wrote; it is Maren's call. No change until she rules; I raise it in the reply rather than as a board line.

## What I checked and found right

- Today, from 00:01 to 23:59, and a stamp equal to now: `.time`. Midnight exactly: today. 23:59:59 read at 00:00: yesterday. A full day back: weekday.
- Six calendar days back is a weekday, seven is a date, counted in calendar days (6 d 23 h can be a date; Tests:92-100).
- Both New York DST days, the zone given separately from the calendar's own zone (Tokyo in the fixture, so a rule that ignores `timeZone` fails), and a year back.
- Room equal to the full width fits; 0.01 pt less does not. Short is the floor at 40 and 0 pt. VoiceOver is always full. `line` measures the form it will show.
- Foundation only, no SwiftUI or WidgetKit; no name clash in Shared; the Core symlink matches RunDetail.swift's.
- The rule returns date, form and length, never a string, so the 12- or 24-hour setting stays with `Text(date, style: .time)`.

## Mutants

`mutants-t1793.json` on the scratch copy of 25cb26374, `--filter AgeLineTests`: **23/23 killed**, 0 survived, 0 missing, 0 no-build (exit 0). <span title="A test written in advance. If it fires, we drop the idea.">Kills</span> ranged from 1 failure (`time-min-with-sampled`, `future-not-today`, `equal-room-short`, `line-uses-sampled-only`) to 11 (`zone-ignored`). Gaps the set cannot cover, because the code does not have them yet: F2 (no mutant can tell the startOfDay count from a calendar-date count, since no test uses a zone that skips midnight) and F3 (no third form).

## Board lines

- F2 and F3 go to Idris as one line, T-1859 (above "Lock in button").
- F1 is already T-1840. F4 is a question for Maren, raised in the reply.
{% endraw %}

</div>
