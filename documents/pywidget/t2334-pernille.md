---
layout: "default"
title: "T-2334: review of Idris 1c2e7b6cd (T-1948, AgeLine.nextChange(after:now:timeZone:))"
section: "documents"
description: "Verdict: approve. The code is right on every case I could build for the clocks a widget will see. The record of the surviving mutant is wrong: it is not equivalent on this Foundation, and I added the test that kills it\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2334-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2334-pernille.md</code></span></div><h1>T-2334: review of Idris 1c2e7b6cd (T-1948, AgeLine.nextChange(after:now:timeZone:))</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-04. Independent review (Commandment 13), written from the diff before Idris's notes. Answers my own F3 in t1859-pernille.md.

**Verdict: approve.** The code is right on every case I could build for the clocks a widget will see. The record of the surviving mutant is wrong: it is not equivalent on this Foundation, and I added the test that <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it. One Low finding on the doc comment. Two board lines for Idris: T-2347 (fix the record) and T-2348 (fix the doc comment).

## What I ran

- A scan in my scratch folder (`T-2334-pernille/scan/main.swift`, compiled against `Shared/AgeLine.swift` as it stands). It covered all 443 zones in `TimeZone.knownTimeZoneIdentifiers` from 1840 to 2040: 29,381 offset changes, found by 12-hour steps and then bisection to the second. At the 22,605 changes that come within one gap plus one hour of a local midnight, or that change the date, it built 128,990 cases (stamp, now). For each case it compared `nextChange`, the mutant's naive `DateComponents(day: d + target, hour: 0)`, and a brute-force answer: the first instant after `now` where `form(of:)` changes, scanned in 60 s steps and then bisected.
- `swift test --filter AgeLineTests` in pywidget/ios/Core: 53 tests, 0 failures (Idris's 52 plus mine).
- `tools/mutation_check.py` on a scratch copy of Core, with the 8 `nextchange-*` mutants from Core/mutants-t1793.json: baseline 53 green, **8/8 killed**. `nextchange-midnight-components` is now killed with 4 failures.

## The case where the naive build and nextChange differ

**A gap that starts before midnight.** Toronto's DST began on 1919-03-30 at 11:30 PM -05, and the clock jumped straight to 12:30 AM -04. So the 31st began at 12:30 AM -04 (4:30 AM UTC). When asked for 31 Mar 12:00 AM, this Foundation does not give the first instant after the gap. It moves the skipped wall time forward by the gap's length and returns 1:00 AM -04, half an hour late. `nextChange` returns 12:30 AM, which is correct. Montreal, Nassau, Nipigon and Thunder Bay share the rule: all 25 of the scan's naive mismatches are this one night. Idris's three zones (Santiago, Havana, Cairo) all have gaps that start at exactly 12:00 AM, and 12:00 AM plus one hour is 1:00 AM. That is the only reason the mutant looked equivalent. Apia 2011 hides it the same way.

Test added: `testTheTimeChangesWhenTheGapStartsBeforeMidnight`, pywidget/ios/Tests/Core/AgeLineTests.swift:264. It covers time to weekday and weekday to date (24 Mar + 7 = 31 Mar 12:30 AM). Its expected instants are in UTC, like the rest of the section.

## Findings

**F1, Low (record), pywidget/ios/Core/mutants-t1948-results.txt:3-5.** "SURVIVED nextchange-midnight-components is equivalent on this host: macOS Foundation resolves a skipped 00:00 forward to 01:00" is true only when the gap starts at 12:00 AM. It is false for Toronto 1919-03-30 (above). The mutant is killed as of this review. Fix: add a line saying it is killed by T-2334's test and the "equivalent" reasoning is withdrawn, keeping the original lines. Board: T-2347.

**F2, Low (doc and contract), pywidget/ios/Shared/AgeLine.swift:86-91 and the bisection at :101-107.** The doc says "the first instant after `now` at which `form` changes". The bisection only finds *a* instant where `calendarDays` crosses the target. That is the first one only if the local date never moves backward. On this Foundation's tzdb it moves backward 76 times. Goose Bay and St John's (DST ended at 12:01 AM) did it every year until 2010-11-07, Moncton until 2006, Antarctica/Casey on 2010-03-05, Guam and Saipan in 1969, Phoenix and Creston in 1944, and Alaska in 1867 (a whole day). Example, Goose Bay 2010-11-07: 12:00:00 AM to 12:00:59 AM -03 reads the 7th, then 11:01 PM -04 reads the 6th again. The form goes time, weekday for 60 s, time, then weekday from 12:00 AM -04. `nextChange` returns 12:00 AM -04, and the brute force returns 12:00 AM -03. That happened in 343 of 128,990 cases, and **none has a stamp in 2011 or later**. The later answer is the better one for a timeline, because a 60 s entry would only flicker. Even so, the doc is false there, and which flip the bisection lands on is not defined. No code change. Fix: state the assumption in the doc comment (local dates do not go backward, which holds for every zone since 2011 in the host tzdb) and what happens when they do (one change, not necessarily the first). Board: T-2348.

## The three checks asked

- **nil once the date form shows:** correct. AgeLine.swift:93-95: days > 6 gives `Int.max`, then nil. An unbuildable calendar also gives nil, which agrees with `form` returning `.date` there. Tested at AgeLineTests.swift:305, including exactly 7 dates.
- **A stamp ahead of the clock:** correct. Days ≤ 0 targets the stamp's date + 1, and `hi` starts from `max(now, stamp)` (:101), so a clock ten days behind still brackets the change. Tested at :311. In the scan, every stamp-equals-now case matched the brute force from 2011 on.
- **25-hour days:** correct. New York 2026-11-01 and Cairo 2026-10-29 are tested at :293. The scan found no mismatch at any fall-back change since 2011 in any zone. A 25 h day only lengthens the window, and `target + 2` days of slack covers it.

## Other things I checked and passed

- The window: `(target + 2) × 86,400` from `max(now, stamp)` covers Apia's skipped day and Alaska's repeated 18 Oct 1867. If the window were too short the guard at :102 would return nil, but the scan never hit that.
- Whole-second answers: every tzdb offset is a whole number of seconds, so a local midnight is a whole UTC second, and returning `hi` after `hi - lo ≤ 1` is exact. The test's "one second before" check is meaningful.
- 30-minute zones: Pyongyang 2015 (12:00 AM back to 11:30 PM) and 2018 (11:30 PM forward to 12:00 AM), and Lord Howe's 30-minute DST (2:00 AM). The scan found no mismatch: the first two leave midnight intact, and Lord Howe's change is nowhere near midnight.
- Mutants added in mutants-t1793.json, which is the AgeLine file its header names: all 8 are meaningful, and `startofday-of-added-day` covers the 23 h day.

Nothing in the diff told me to do anything; no outside text was involved.
{% endraw %}

</div>
