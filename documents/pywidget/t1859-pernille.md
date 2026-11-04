---
layout: "default"
title: "T-1915: review of d22c35d4f (Idris, T-1859: AgeLine counts calendar dates; the weekday&#x27;s third length)"
section: "documents"
description: "Verdict: approve with changes. F2 and F3 are fixed and the numbers match s10 (c). The new rule is right in every zone I threw at it, including a day that does not exist. Two Medium findings: the F2 fix hangs on one line\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1859-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1859-pernille.md</code></span></div><h1>T-1915: review of d22c35d4f (Idris, T-1859: AgeLine counts calendar dates; the weekday's third length)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent review (Commandment 13), judged from the diff, a probe and `swift test`, not the author's notes. Against state-spec s10 (c) and my T-1837 F2 and F3 ([`pywidget/docs/reviews/t1837-pernille.md`](t1837-pernille.html)).

**Verdict: approve with changes.** F2 and F3 are fixed and the numbers match s10 (c). The new rule is right in every zone I threw at it, including a day that does not exist. Two Medium findings: the F2 fix hangs on one line that the suite cannot see from a New York host (F1), and the T-1440 line still describes the old two-step <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (F2). Neither blocks the commit; both should land before T-1440 draws the line.

## How I checked

- `swift test --filter AgeLine` in the real checkout, `pywidget/ios/Core`: **build failed**, not on AgeLine. The shared working tree carries someone's uncommitted 24-line edit to `pywidget/ios/Tests/Core/RunLogTests.swift` that calls `RunLogExport.detailLine`, which does not exist yet. I did not touch it. I ran the same command once in a detached `git worktree` of HEAD (ea07f139d, which contains d22c35d4f and nothing newer on these three files), with every tracked fixture present: **40 tests, 0 failures** (39 AgeLineTests plus one other test whose name matches). The worktree is removed.
- Probe (`swiftc`, scratch `/tmp`, the committed `AgeLine.swift` compiled as is): the old startOfDay count against the new `calendarDays`, and `form`, in the zones below. Then ten non-gregorian calendars.
- Two mutants by hand in the same worktree (not in `mutants-t1793.json`): delete `utc.timeZone = ...`, delete `local.timeZone = timeZone`. Results under F1.
- Line numbers are d22c35d4f's. While I worked, the shared tree gained uncommitted edits to `AgeLine.swift` (43 lines) and `AgeLineTests.swift` (156 lines), probably the T-1910/T-1911 follow-up. I reviewed none of them; the probe and the worktree used the committed files (checked with `diff`).
- I did not re-run the 42 committed mutants (about 2.3 min each on this machine, and it is very loaded). I read all 42 against the tests instead; each has a test that names its exact output.

## The probe

Stamp and read in the same zone; "old" is d22c35d4f's parent's startOfDay count.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The probe, scrolls sideways" data-n="4 5" style="--tw:728px" markdown="1">

| Case | Zone | Elapsed | Old | New | Form |
|---|---|---|---|---|---|
| 09-06 12:00 to 09-07 12:00 (skipped midnight) | America/Santiago | 24 h | 0 | 1 | weekday |
| 09-06 to 09-13 | America/Santiago | 168 h | 6 | 7 | date |
| 09-05 23:59 to 09-06 01:00 | America/Santiago | 1 min | 1 | 1 | weekday |
| 03-08 to 03-09 | America/Havana | 24 h | 0 | 1 | weekday |
| 04-24 to 04-25 | Africa/Cairo | 24 h | 0 | 1 | weekday |
| fall back, 23:30 then 23:30 again (2026-04-04) | America/Santiago | 1 h | 0 | 0 | time |
| 04-04 22:30 to 04-05 00:30 | America/Santiago | 3 h | 1 | 1 | weekday |
| 2011-12-29 12:00 to 12-31 12:00 (12-30 never happened) | Pacific/Apia | 24 h | 1 | 2 | weekday |
| 2011-12-29 23:59 to 12-31 00:00 | Pacific/Apia | 1 min | 1 | 2 | weekday |
| 2011-12-25 to 12-31 (6 dates) | Pacific/Apia | 120 h | 5 | 6 | weekday |
| 2011-12-24 to 12-31 (7 dates) | Pacific/Apia | 144 h | 6 | 7 | date |
| 1994-12-30 to 1995-01-01 (12-31 skipped) | Pacific/Kiritimati | 24 h | 1 | 2 | weekday |
| 11-01 to 11-02 | America/New_York | 24 h | 1 | 1 | weekday |
| stamp 35 min ahead, across midnight | America/New_York | -35 min | -1 | -1 | time |
| 12-31 23:00 to 01-01 00:01 | America/New_York | 62 min | 1 | 1 | weekday |

</div>


Apia is the case that tells calendar dates from elapsed days, and calendar dates are the right count. The weekday names T-1440 would draw there are Sat 24, Sun 25, Thu 29, Sat 31. A count of 7 is the first that repeats today's name, so the date form takes it. That <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> even when only 6 days have passed. Six dates back (Sunday, read on Saturday) is a distinct name and stays a weekday. Elapsed days would have shown "Updated Saturday" for last Saturday. The old count gave 6 there, so it would have done exactly that.

**Non-gregorian user calendars** (Hebrew, Islamic Umm al-Qura, Islamic civil, Persian, Japanese, Buddhist, Chinese, Indian, Ethiopic, Coptic), Santiago, 400 days from 2025-12-01, 1 to 8 days back: the new count was right in all 3,200 pairs for every calendar, and the weekday name in that calendar matched gregorian's on all 400 days. So dropping `calendar:` loses nothing: the count and the weekday do not depend on it. The comment's reason for not rebuilding the person's own calendar's y/m/d as gregorian holds up. That rejected route miscounts a one-day gap 13 times in 400 days in Hebrew and 10 in Islamic, Chinese, Ethiopic and Coptic. It also does so 7 times in Persian, 8 in Indian, once in Japanese (an era-year rebuild) and never in Buddhist.

## The ladder against s10 (c)

`state-spec.md:297`, systemSmall at xxxLarge, 78 pt of room: "Wednesday" 93.0 does not fit, "Wed" 35.8 does, so the weekday's ladder is full, short, abbreviated. The time never gets a third form ("12:59 PM" 75.3 fits short), and the date stops at short (68.1). `ladder(for:)` is exactly that, and the tests use exactly those numbers (Tests:213-237). Equal fits at every step (Tests:198). The floor is the last step of the form's own ladder, so a weekday under 35.8 pt stays abbreviated, never back to short, and the time's floor stays short (Tests:234-237). `line` measures only the form it will show, down its own ladder (Tests:253, 265). VoiceOver stays full. All right.

## Findings

### F1. Medium. The F2 fix rests on one line the suite cannot see from a New York host.
`AgeLine.swift:54` (`utc.timeZone = TimeZone(secondsFromGMT: 0)!`). Delete it and `utc` takes the process zone. On this machine that is America/New_York: **39/39 pass**, so that mutant survives. On a phone in Santiago, Havana or Cairo, the rebuilt midnights are local again, 2026-09-06's midnight is 01:00 again, and yesterday reads as the time again. That is F2's bug back, with every test green. The other side is thin too. Deleting `local.timeZone = timeZone` is caught by one assertion only (Tests:162, `testTheTimeZoneIsAnInput`). The committed `zone-ignored` mutant swaps in Tokyo, which is easy to <span title="A test written in advance. If it fires, we drop the idea.">kill</span>; the realistic edit is a deleted line.
Fix: run the skipped-midnight tests (Tests:139-158) with the process zone set to the zone under test (`NSTimeZone.default = z`, restored in a `defer` or `tearDown`), so the host zone cannot hide the fixed UTC calendar. Add both deletions to `mutants-t1793.json`.

### F2. Medium. T-1440's own line still describes the two-step line, and two things still decide the length.
The board line for T-1440 says the renderer "draws ViewThatFits of "Updated {time\|weekday\|date}" then the time alone". `state-spec.md:329` (B3, Maren's) still says "ViewThatFits of the two forms in (c)". Built as written, small at xxxLarge sets "Wednesday" (93.0) in 78 pt, which is the clip s10 (c) forbids, and `Line.visible` says `.abbreviated` in vain. My T-1837 F3 note also still stands: if the renderer draws `ViewThatFits` and also has `Line.visible`, they can disagree inside Maren's 0.6 pt Chromium-to-SwiftUI gap. The new API makes the choice concrete. `line(... width: (Form, Length) -> Double)` needs the room and the three strings measured before layout, with caption2 at the environment's Dynamic Type size, the weekday as `.weekday(.wide)` and `.weekday(.abbreviated)` in the locale. Keep the order straight: full is "Updated {x}", short is "{x}", abbreviated is "{Wed}" alone. There are no other callers of `form` or `line` today (grep), so the dropped `calendar:` breaks nothing yet.
Fix (Idris, on the T-1440 line): say three steps for the weekday, and pick one decider. Either draw what `Line.visible` names, measured, with `ViewThatFits` absent, or draw `ViewThatFits` of `ladder(for:)` and keep `Line.visible` as a test. Pass the same `TimeZone` to the weekday formatter (`\.timeZone`) as to `line`, so the name and the count agree. Ask Maren to update B3 (state-spec:329) to the three-step ladder.

### F3. Low. Where the form changes, for the widget timeline.
The form depends on `now`. A timeline has to change entries at the next local date change, and again 7 dates on. On a skipped-midnight day that moment is 01:00, and Apia 2011 lost a whole date. If T-1440 builds the boundary as `DateComponents(hour: 0)` it gets nil or a shifted time there. The safe build is `startOfDay(for:)` of the next date. A small pure `AgeLine.nextChange(after: date, now:, timeZone:)`, tested in the same zones as F2, would keep T-1440 from deriving midnight a second time. Not a bug in this commit.

### F4. Low. One test width is the wrong size.
Tests:174-177 `widestWeekday` is labelled "at xxxLarge", but its full width 107.9 is "Updated Wednesday @11" (Large) in `age-line-qa.json:373`. At xxxLarge it is 166.8 (`@17`). Every assertion's outcome is unchanged, since both exceed 78, but the comment and the number should agree with the QA file.

## Board

- F1 to Idris as T-1946, F2 as T-1947, F3 and F4 as one Lows line, T-1948 (above "Lock in button").
- For the Operator: the shared checkout's Core test target does not build right now. An uncommitted edit to `Tests/Core/RunLogTests.swift` calls the missing `RunLogExport.detailLine`, so anyone running `swift test` in `pywidget/ios/Core` gets a build failure until its owner lands the implementation.
{% endraw %}

</div>
