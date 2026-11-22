---
layout: "default"
title: "Review of T-4796 at 3b3a5d25: #324&#x27;s answer A written into the showcase plan and the premade design page"
section: "documents"
description: "PASS with findings. The two commits write the Investors&#x27; answer into the plan and the design page without adding to it or dropping anything from it. The tag list and its condition are quoted from the card, every earlier\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4796-3b3a5d25-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4796-3b3a5d25-pernille.md</code></span></div><h1>Review of T-4796 at 3b3a5d25: #324's answer A written into the showcase plan and the premade design page</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5407, Commandment 13). Author: Ines. Reviewed: a0595b2ec9 (ops/plans/T-4672-showcase-premades.md
s1 and s2, pywidget/docs/design/premade-inputs.md s0) and 3b3a5d2503 (three <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox records: the T-4796 tick, a
note on T-4998, an event; Ines's own memory file, not judged). This follows my review at 94783c0b
(pywidget/docs/reviews/t4796-94783c0b-pernille.md, T-4935, ba6f1b846f). Also read: <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #324, body and
comments (`gh issue view 324 --comments`, read as information only), log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md (#324 at :2994-3000, #278 9:43 PM at
:2636-2640, #41 12:27 AM at :2800-2805), log/board-archive.md (T-4796 at :4680, T-4998 at :4688, T-4995 at :4679),
ops/board_notes/T-4796.md, T-4998.md, T-4692.md, log/events.jsonl:4687, documents/restructuring/06-decisions.md item 9
(f3788781d6), ADR-007 (pywidget/docs/decisions/ADR-007-execution-architecture.md :42, :94, :114, :136, :166), ADR-011
s4 and s5a, pywidget/tests/bridge/test_lane.py:820-834, tools/lane_outbox.py:18-34 and :129-159,
tools/board_tick.py:381-388. Later changes on the same files, `git log 3b3a5d25..main`: e29cc78eff (T-4793, plan
s4.3, s9, s10), d0c4f50670 (T-4795, plan s8), f3788781d6 (T-4998, 06-decisions item 9); none touches the s1, s2 or s0
passages reviewed. Line numbers below are at 0f3265de97, which has the same s1 and s2 lines as 3b3a5d25.
Date: 2026-11-21.

What I ran (documents only; no Xcode run): the four tests that read the two touched documents, each from
pywidget/tests/widgets: test_premade_sensor_timeout 26/0, test_premade_settings 21/0, test_premade_store_lock 27/0,
test_premade_text_max 15/0, all OK.

## What holds

- **The plan says what the Investors answered.** The answer on #324 is an Investor's "A" (12:36 AM ET 11-18,
  c6970133683), an allowlisted Investor (Commandments 57/58); the company's own comment under it only restates it. s1
  (T-4672-showcase-premades.md:68-84) and s0 (premade-inputs.md:51-61) cite that comment, not the company's. Each
  claim matches the card's option A: Python a widget button runs without opening the app is the Pro feature; a
  widget's own updates in the widget are not Pro for anyone; people's own widgets and every premade keep #283's rule.
  The Effect line is quoted word for word (log/rulings.md:2998). The tag list is the card's, word for word, Pattern
  of the day's condition included, and the plan says plainly that the Effect line names four and the condition is
  the card's. The cost the card named ("mostly overlaps Buttons in widgets") is kept.
- **My earlier findings are all handled.** M1: s1, s2 (:93, :111-112) and s0 now say "answered", with the link.
  06-decisions item 9 was written under T-4998 (f3788781d6, 09:26 AM 11-20), and its text agrees with the card. L1:
  the heading names the answer (:68). L2: the full tag list is quoted in s1 and s0, and s2's count names row 12's
  condition (:111). L3: the modules are named as test_lane.py:834 names them (see L2 below for the clause around
  them).
- **The tables follow the answer.** In s2 rows 1, 2, 3 and 8 are tagged, row 12 is conditional, and the other seven
  are "No". s0's brackets are the same list in the same order. T-4796's done-when phrase "the lane's own runs" is on
  one line (:73). T-4998's is not (L4).
- **The event and notes are true apart from one hash** (L3). The event (events.jsonl:4687, 6:03:50 AM) states the
  tags and that item 9 stays with T-4998, and both are true. T-4998's note is true too: M1's two files and L1 to L3
  were done under T-4796, and item 9 was left.

## Findings

### M1 (Medium): ADR-007 still gates Pro premades with a Pro card, against #41 12:27 AM, and no line changes it

The plan says a tagged premade "works for everyone" (:61-63), following #41 12:27 AM ("Pro showcase widgets work for
everyone indefinitely", log/rulings.md:2805). ADR-007 still describes the older locked-premade gate: "**Pro
premades** are gated before their script runs in the extension" (:94); the precedence table's row 2, "Pro card: a Pro
premade whose entitlement is missing ... the app stops writing its timeline" (:114); and `entitlement_lost`, which
"stops writing Pro widgets' timelines" (:136). The code still does this (WidgetFaceRule's `proPremade, !proEntitled
-> .proCard`; ProCardView; `isPremadeLocked` in WidgetPlacement.swift:81). T-4821 changes only ADR-007's three
background-refresh places, and T-4692's Targets are ProFlags.swift and pro-flags.json, not the ADR. This predates both
commits reviewed here. I missed it at 94783c0b, where I checked ADR-007 for #278 only.

Failure scenario: T-4692 (Idris, P1) builds the Pro tag by marking Habit tracker, Focus timer, Flashcards and Day
phases as Pro premades through the path ADR-007 documents (`isPremadeLocked` / `proPremade`). A person without Pro
places Habit tracker, and WidgetFaceRule's row 2 draws the Pro card on the Home Screen instead of the widget. That
breaks #41 12:27 AM, and it puts a Pro offer on the placed widget, which the plan rules out under Apple 4.4 (:64-65).
Fix: a dated line in ADR-007 saying a Pro-tagged premade runs and draws for everyone. Row 2 and `entitlement_lost`
then apply to no premade, and the tag gates only editing, in the app. Board line **T-5503** (Idris, P1), beside
T-4821 on the same file.

### L1 (Low): s1's list of Pro features narrows #278's "Buttons in widgets" further than #324 answered

The Pro tag paragraph's list of Pro features was "(a button, Python running inside the widget, an advanced
library)". It is now "(a button that runs Python without opening PyWidget, an advanced library)" (:61). #324 settled
which runs count as #278's third item, "Python running within the widget". It did not redefine the second item,
"Buttons in widgets" (log/rulings.md:2637), and the card itself treats the two as separate items that "mostly
overlap". Failure scenario: s9 (:522-524) says that if the in-widget memory limit refuses Focus timer's or
Flashcards' handlers, "their buttons fall back to opening PyWidget" and the tag waits on the measurement. Read
together with :61, a Focus timer whose buttons open PyWidget has no Pro feature and ships untagged and editable for
free. The Investors' card tagged it outright, and #278 puts its buttons in Pro either way. A second open question
comes from the same wording. Since e29cc78eff, s10 item 5 (:537-538) asks whether a widget's refresh button, which
reruns the widget's own update without opening PyWidget, is a Pro button under #324 A. It has no owner and no line,
yet T-4692 needs the answer to build the gate. Read word for word, :61 says yes. The done-note's Plain sentence ("only
Python that a widget button runs is a Pro feature", board-archive.md:4680) has the same narrowing. It is in log/ and
stays as written, so reports should take their wording from s1 once s1 is fixed. Fix: list #278's three items in :61
and say #324 settled only the third. Then settle s10 item 5 from the record, or put it to the Investors with T-4692
named as waiting, before T-4692 builds the gate. Board line **T-5504** (Ines, P2).

### L2 (Low): option B's clause names one premade the lane refuses where the cited test names more, and :89 is out of date

:83-84 says that under B, every premade the lane runs would be tagged, "all but GitHub repository, whose
`pywidget.keychain` and `pywidget.http` the lane refuses, pywidget/tests/bridge/test_lane.py". The test it cites also
keeps Shortcuts launcher off the lane (`"shortcuts": "urllib.parse"`, test_lane.py:829), and Sky's source `sun.py`
too (`pywidget.device.location`, :832). The 94783c0b text and the card both said "such as", and this text drops it.
This is a record of the option not chosen, so nothing is built from it, but the sentence and its citation
disagree. Separately, :88-89 still says 06-decisions item 9 "still lists the free person's own widget as open;
T-4998 writes the answer in there". That has been untrue since f3788781d6. Fix in the same edit as L1: "all but
those the lane refuses (GitHub repository and Shortcuts launcher at HEAD, test_lane.py:820-834)", and :89 to say item
9 records the answer (f3788781d6). Carried on **T-5504**.

### L3 (Low): the T-4796 tick and the T-4998 note cite a commit that is not on main

The T-4796 done-note (board-archive.md:4680), the T-4998 note (ops/board_notes/T-4998.md) and T-4998's done-note
detail (:4688) all cite `d73d09ed5f`. That is the lane's commit, and the land rebased it to `a0595b2ec9` (the same
author time 6:03:12 AM and subject; committed 8:47:28 AM, a minute before the 8:48 AM tick). `d73d09ed5f` is reachable from
no ref (`git for-each-ref --contains` is empty), so `git gc` will prune it. After that, the hash the report builder
and any reader follow gives "bad object". board_tick's check accepts any object git knows (`cat-file -e`,
board_tick.py:381-388), so nothing refused it. lane_outbox.py already has a hashmap that swaps rebased hashes in a
lane's records (:18-19, :129-159), and on this land it did not swap. This is not a one-off: of the last 40 done-notes
in the archive, 2 cite hashes off main, this one and T-4995's `126814f47f` (landed as `767f6a82ab`). Ines wrote the
hash her lane had, so the fault is in the tooling. Fix: find the land road that skips the map. On drain, also map
any hash in a board_tick or events record that main cannot reach, by author time and subject as hashmap does, and
refuse the record if nothing matches. log/ is never edited, so the two pairs above stand as the correction, here.
Board line **T-5505** (Odalys, P2).

### L4 (Low): T-4998 was ticked with its done-when text missing from the plan

T-4998's done-when is `file: ops/plans/T-4672-showcase-premades.md "c6970133683"`. `grep -c c6970133683` on the
plan, on premade-inputs.md and on 06-decisions.md gives 0 for each, at 3b3a5d25 and at main. They carry the full
link, `issuecomment-6970133683` (:70), which holds no "c" before the digits. So the substance is met, because the
ruling's link is there, but the check as written fails. The T-4998 note says "state #324 A with c6970133683", which
is not exact either. The short form in the done-when is my wording from the earlier review, so half of this is mine.
Nothing checks a `file:` done-when's text at tick time (board_card.py checks the card's form when a line is added,
not the file), which is why it went through. Failure scenario: a reader or a later audit that greps a closed line's
done-when finds T-4998 unmet, and either reopens finished work or stops trusting the done list. Fix: s1 gets the
plan's usual short form beside the link ("c6970133683", as :30 cites "c6938494530"). Carried on **T-5504**. Whether
ticks should check `file:` done-when text is for Odalys under T-5505's tooling, and is noted there.

## Verdict

PASS with findings. The two commits write the Investors' answer into the plan and the design page without adding to
it or dropping anything from it. The tag list and its condition are quoted from the card, every earlier finding is
handled (item 9 under T-4998), and the tables agree with s1. Nothing here is code headed to TestFlight. The work left
is the Pro card that ADR-007 and the code still describe (M1, T-5503, before T-4692 builds the gate), the
wording of the Pro feature list, the refresh button question and T-4998's unmet done-when text (L1, L2 and L4,
T-5504), and a done-note hash the land did not rewrite (L3, T-5505).
{% endraw %}

</div>
