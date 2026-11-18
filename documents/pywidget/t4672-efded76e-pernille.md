---
layout: "default"
title: "Review of T-4672 at efded76e: the 1.0 showcase premades plan"
section: "documents"
description: "The set is well chosen. It answers #278 (21:55) and #41 (00:27) faithfully and keeps every premade out of the banned areas. Every data source goes through its terms before a fetch. But two things it says would ship as\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4672-efded76e-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4672-efded76e-pernille.md</code></span></div><h1>Review of T-4672 at efded76e: the 1.0 showcase premades plan</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4720, Commandment 13). Author: Ines. Reviewed: 76741f2d7b (the plan,
[`ops/plans/T-4672-showcase-premades.md`](../company/t-4672-showcase-premades.html), new, and [`pywidget/docs/design/premade-inputs.md`](premade-inputs.html) s0, new) and efded76e
(her event and memory), read with `git show efded76e:<path>`. The plan file is unchanged from efded76e to this
worktree's HEAD (71c29620a8); premade-inputs.md has changed since, by other lines, and I did not read those changes.
Date: 2026-11-17, 6:50 PM ET.

Disclosure: I own T-4673 (Day phases), which this plan specifies. H1 is about my own next build. I did not write
any of the plan.

No runs. The work is a plan and a docs section; nothing in it compiles or tests. Every claim below is checked against
the repo at efded76e: `log/rulings.md`, ADR-007, ADR-011, L2, L7, L11, L16, `creative/approved.md`,
`pywidget/widgets/premade/*.py` and `ops/board.md`.

## Verdict: PASS WITH FIXES

The set is well chosen. It answers #278 (9:55 PM) and #41 (12:27 AM) faithfully and keeps every premade out of the banned
areas. Every data source goes through its terms before a fetch. But two things it says would ship as untrue. The
Day phases refresh path in s4.3 does not exist (H1). The Pro screen's `free.all` row claims background refresh in
every build (H2). It also leaves out the later Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> that ranks the IDE and Builder above premades (M1).
None of this is code headed to TestFlight. H1 must be fixed before T-4673 starts its fetch. H2 must be fixed before
T-4715 puts the words in the app.

## What I checked, and found sound

1. **Investor words.** The #278 9:55 PM quote (c6936602056) and the #41 12:27 AM quote (c6939492685) match
   `log/rulings.md:2676` and `:2800` word for word. The plan's reading of the 9:43 PM answer (c6936377709) and of
   #291 item 9 matches their Effect lines. "34 St-Herald Sq" for "33rd st Herald Square" matches the 9:55 PM ruling's
   Effect line.
2. **Banned areas (Commandment 7).** None of the twelve touches finance, health or medical advice, legal, gambling,
   adult content, weapons or substances, children under 13, or politics. The plan names and excludes tickers,
   fitness trackers, dice and decision makers. I opened `habits.py` at efded76e: it ships no sample habits, so it
   has no health defaults. Steps and floors leaves the Gallery for the same reason. Flashcards uses the person's own
   deck and is not aimed at children.
3. **Licensing and terms (Commandments 6 and 58).**
   - MET Norway: L16 row 18 gives NLOD 2.0 / CC BY 4.0 with a credit line and an identifying User-Agent. The plan
     and T-4707 carry both, plus a re-read.
   - GitHub REST: Go (L16 row 23), with no token shipped.
   - MTA: unread, and the plan puts the reading first. It is one page at a time through `terms_guard.py`, the rule
     is added with a test, and the plan stops and asks if the terms need an account, cost money, forbid paid apps or
     forbid bundling the stop list. It names the route circles as the MTA's marks and draws plain letters instead.
   - Trademarks and generated art: "Pomodoro" is avoided as a trademark. Pattern of the day is code-drawn (C6).
   - No outside asset is added.
4. **Apple 4.4.** No tag or offer goes on a placed widget; the tag lives on the Gallery tile and the page.
   `row.buttons.l`'s "iPhone asks you to unlock first" matches ADR-011:16 and :72 [A3].
5. **Counts and records (Commandment 33).**
   - The set adds up: six new, two reworked and four kept make twelve. Of the twelve built premades, four stay,
     two are reworked and six go, also twelve.
   - Event `log/events.jsonl:4120` matches the commit, and the outbox file is the event as written.
   - The 13 board lines T-4703..T-4715 are s8 items 2 to 14, one each, as the event says.
   - L7's "Python with interactive widgets: 0" of 18 (L7:53) and Widgetsmith's 777,214 ratings
     (`L11-raw/lookup-us-2026-10-25.tsv:6`) are real. The two L2 figures are real too: 40 to 70 reloads and entries
     about 5 minutes apart (L2:15, :26).
   - ADR-011's W = 23 MB and P <= 11 MB match ADR-011:108.

## Findings

### H1. Day phases' refresh path in s4.3 is not how an app-lane widget refreshes

s4.3 puts the MTA fetch in PyWidget's app-lane run. It says the fetch "runs when PyWidget opens, on background refresh
(free under #278), and on a reload requested for 5 minutes before each transit phase and every 15 minutes inside one
... this plan asks for about 20". Neither of the last two happens at efded76e:
- A WidgetKit reload of an app-lane widget runs no Python. The extension builds the timeline from the last tree.
  App-lane widgets run only on T1 to T5 (ADR-007 s2 table and s3 item 7): the app opens, the refresh tap, a Shortcuts
  automation, or background refresh.
- Background refresh is not built. `git grep` at efded76e finds no `BGTaskScheduler.shared`, `.backgroundTask` or
  `UIBackgroundModes` in `pywidget/ios`. T-0793 (build it) and T-0795 (whether it stays in 1.0) are both `[b]`.
  Launch plan s8 row 23 cut the claim for this reason.

On a phone, then, the train times are as old as the last app open, and the 30-minute rule shows "No recent times"
for most of a commute. That is the Investors' own example widget, and the Simulator done-when in s4.7 would not
catch it. With the app in the foreground, every reload is free and fresh.

The reason s4.3 gives for keeping the fetch out of the widget, "a run inside the widget has no network wait (ADR-011
s4)", is not in ADR-011 s4. ADR-007 s2 gives `pywidget.net.get` to both processes. The widget lane forbids `urllib`
and `ssl`, not the network primitive. So the one path on which WidgetKit's own reloads fetch, the widget lane, was set
aside on a reason the sources don't give. Whether it fits is a measurement: one GTFS-rt fetch plus the pure-Python
decode inside the 2.0 s budget at P <= 11 MB. It also touches M2, because Python runs in the widget.

**Fix (T-4793, Ines, P1):** rewrite s4.3 and s9 with the real paths:
- the widget lane first, measured in T-4673;
- the app lane on app open, the refresh tap and a Shortcuts automation as the fallback;
- background refresh only once T-0793 lands.

Say which of these the Gallery page may claim, and note the change on T-4673.

### H2. `free.all` claims background refresh in every build

s7 shows each row "only if its feature is in that build", except `free.all`. That row lists "background refresh"
with "Shown when: always". Background refresh is not built and its 1.0 place is undecided (H1). A purchase screen
listing it as included would be a false claim (Commandment 6, consumer protection). The plan's own rule for s7 says
every line must be true of the build it ships in. T-4715 (Maren) takes these words into `PRO_STR` as written.

**Fix (T-4794, Ines, P1):** make background refresh in `free.all` depend on the build's flag, like the other rows.
Give the words without it, and tell T-4715.

### M1. The plan leaves out the later ruling that ranks the IDE and Builder above premades

The plan quotes #278 at 9:55 PM. It does not cite #41 c6938306456 (11:26 PM ET, `log/rulings.md:2644`): "I consider a
functional IDE and widget/Page builder to be higher priority over the actual pre-mades". That ruling's Effect line
says: "Premade work is sized to that role; where premade polish and IDE or Builder work compete, the IDE and Builder
go first." The plan also omits #41 c6938494530 (23:37: Developer mode next, as a priority).

s8 opens five P1 lines (T-4673, T-4703, T-4704, T-4705, T-4706) and puts 1 to 2 days per premade on my lane. It
then says "I have not moved the release range". The 9:55 PM ask for many complex premades stands, but the plan has to
show it was weighed against the later ruling.

**Fix (T-4795, Ines, P1):** cite both rulings in the plan. For each P1 line, say whether it competes with IDE,
Builder or Developer mode work. Where it does, place it after that work, or record a chair line saying why not.

### M2. The Pro tag test reads "Python running inside the widget" more widely than the set allows

s1 tags any premade that uses "Python running inside the widget", taking the phrase from #278 9:43 PM. But ADR-007 s3
item 4 starts every new or edited script in the widget lane, and Countdown, kept with no tag, ran there 69 times on
the phone (ADR-007 s3). Read literally, most of the eight untagged premades run Python in the widget and would carry
the tag. The plan clearly means the narrower reading, a handler that a button runs in the widget, but never says so.
T-4692 (the gate) and T-4714 (`pro-flags.json`) both need one stated reading. So does H1's widget-lane fetch.

**Fix (T-4796, Ines, P1):** state the reading in s1. Make it agree with T-4669's record of #278. If 06-decisions item
9 cannot settle it, it goes to the Investors with T-4669's open points.

### M3. Sky and the Night view claim an almanac that is not on the phone

s2 row 5 says "The company's almanac (H249, Meeus) works it all out on the phone". s4.2 takes Night's sunrise from
it, and T-4708 says "all from the company's almanac on the phone". At efded76e, H249 is Swift under
`research/hunt/H249-raw` and `pywidget.astro` does not exist. `sun.py:3-7` says so and uses the NOAA low-precision
equation, tested to within 3 minutes of USNO. Moon phase and twilight bands have no code in the app. Sky is
therefore a bridge or a port plus the premade, not a rework, and T-4708 is undersized.

**Fix (T-4797, Ines, P2):** say in s2, s4.2 and on T-4708 which source each figure comes from: H249 bridged as
`pywidget.astro`, or a Python port with USNO fixtures. Size that work. Keep Night's sunrise on `sun.py`'s `sun_times`
until then.

### M4. The themes proposal treats Graphite as an app theme that exists

s6 Proposal A makes "Paper, Studio and Graphite" the free prebuilt themes, "each with its light and dark designs".
`creative/approved.md` item 5 approves Graphite only as an editor (syntax) theme. Item 9 leaves "which other prebuilt
themes ship and how each looks" to their own proposals with previews. The plan holds Ember and Fern to that rule but
not Graphite. A proposal to the Investors should not present an undrawn app look as an existing one.

**Fix (T-4798, Ines, P2):** say that an app-wide Graphite is new and needs its own preview under item 9 before the
proposal goes out.

### L1. Two citations are wrong

- **Wrong gate.** The header reads "Commandment 4, gate 3: what we build and in what order is ours". Gate 3 is real
  money (CLAUDE.md, "The three gates"), and Commandment 4 is about free software. Build decisions fall under
  Commandment 1 and the "everything else" line. s1 test 4 and s4.4 step 4 cite gate 3 correctly for paid data.
- **Wrong source.** The Widgy review quote ("Widget refresh rate is too slow to be useful") is real. It comes from
  H186's review pull (`L11-raw/T0336-candidates.tsv:97`, `L14-raw/desk_hits.tsv:55`), not from L7 s2 and s3.

**Fix (T-4799, Ines, P3).**

### Info (no new line)

- s4.1: the plan says "a phase ends where the next begins", but the four start times can be set out of order. T-4673
  will order phases by clock time and test a wrap past midnight. That is my build, so it needs no line.
- s4.3's "about 20" reloads is fine for a widget that is viewed often. Under H1 it only matters for the widget-lane
  path.
- The plan says it used Wrenna's and Maren's views from their files. The board line asked for it to be planned with
  them. The plan says plainly that it read their files, and T-4703 puts Maren's frames before each build, so I raise
  no finding.
{% endraw %}

</div>
