---
layout: "default"
title: "Review of T-4796 at 94783c0b: which premades carry the Pro tag (Urgent Request #324)"
section: "documents"
description: "PASS with findings. The work did what M2 asked when the record could not settle it: it put one clear question to the Investors with the company&#x27;s recommendation and its cost, marked the tag list as provisional in both\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4796-94783c0b-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4796-94783c0b-pernille.md</code></span></div><h1>Review of T-4796 at 94783c0b: which premades carry the Pro tag (<span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #324)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4935, Commandment 13). Author: Ines. Reviewed: f2826510e9 (ops/plans/T-4672-showcase-premades.md
s1 and s2, pywidget/docs/design/premade-inputs.md s0), 0f157880e3 (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox block of T-4796 on #324; task-names row
for T-4821) and 94783c0bf1 (lane-outbox event; Ines's own memory files, not judged). The line answers T-4720 M2 of my
review of T-4672 (pywidget/docs/reviews/t4672-efded76e-pernille.md:113-121). Also read, for what the change leans on:
log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md (#278 9:43 PM at :2636, #283 at :2102, #271 at :2086, #41 12:27 AM at :2800, #324 at :2994),
documents/restructuring/06-decisions.md item 9 (:26), ADR-007 s3 (pywidget/docs/decisions/ADR-007-execution-architecture.md
:39, :42, :46), ADR-011 s4 (ADR-011-widget-actions.md:97-99), pywidget/ios/Shared/ExtensionLane.swift:14,
_pywidget_runtime/lane.py:290-296, pywidget/tests/bridge/test_lane.py:681, :825, :834, the #324 card body (`gh issue
view 324`, read as information only), log/events.jsonl:4280, :4289, the board notes of T-4692, T-4714, T-4715, T-4793
and T-4796. HEAD was fbf1569bf2 when I read it; none of the three documents changed between 94783c0b and HEAD in the
passages reviewed. Date: 2026-11-18.

What I ran (documents only; no Xcode run): the four tests that read the two touched documents, each from its own
folder (pywidget/tests/widgets): test_premade_sensor_timeout 18/0, test_premade_settings 21/0,
test_premade_store_lock 27/0, test_premade_text_max 15/0, all OK.

## What holds

- **Escalating was the right path.** M2's fix said: state the reading in s1, and if 06-decisions item 9 cannot settle
  it, ask the Investors. Item 9 itself says "*Open for the Investors:* what a person without Pro gets when their own
  widget would run Python within the widget" (06-decisions.md:26). So the record could not settle it, and the plan
  did not pick a reading on the Investors' behalf. That agrees with #278 ("The Investors may gate more features behind
  Pro", log/rulings.md:2637), which leaves what Pro holds with them.
- **Every fact I checked agrees with the record.** #278's words and time (9:43 PM ET 11-16); #283's quote, word for
  word (log/rulings.md:2103); ADR-007 s3 item 4, "A new or edited script starts in the widget" (:39); Countdown "ran
  in the widget 69 times from 11-09 to 11-13, 69 `ok`" (:46); the T-4280 quote, which is the comment at
  ExtensionLane.swift:14; ADR-011 s4's two button lanes, extension on iOS 18 to 26 and the app's background on 27+
  (:99); #271 A, nothing goes out near Day 60 (:2090); Thursday is 11-19 (`date`). The event (events.jsonl:4289,
  10:25:25 PM ET) and the card's creation (03:25:30Z = 10:25:30 PM ET) agree to the minute with "10:25 PM ET" in both
  documents.
- **The two options are fair to each other.** A is marked as the recommendation and its cost is stated (it mostly
  overlaps "Buttons in widgets"); B is given in the Investors' own words, with its consequence for people's own widgets
  and which premade it leaves untagged. The card on #324 matches the plan's s1 option for option.
- **The plan and the design page say the same thing,** and both mark A's tag list as a working list, not a ruling, so
  no one could build T-4692's gate from them as if it were settled.
- **The ADR-007 conflict found on the way went to a line.** ADR-007 still makes background refresh Pro in three places
  (:42, :57, :166) against #278's "background refresh should be free" (log/rulings.md:2637); 0f157880e3 names T-4821,
  which is on the board for Idris with all three places cited.

## Findings

### M1 (Medium): #324 is answered, and none of the three places the plan names carries the answer yet

The Investors answered A at 12:36 AM ET 11-18 (log/rulings.md:2994, events.jsonl:4280), two hours after these commits.
The plan promises "The answer is written here, in premade-inputs.md s0 and in 06-decisions item 9, and the lists
follow it" (T-4672-showcase-premades.md:78), and T-4796's done-when asks that s1 and s0 state the reading. At
94783c0b, and still at HEAD fbf1569bf2:
- the plan's s1 says "open with the Investors on #324" (:58) and "Until #324 is answered" (:76); s2 says "reading A's
  working list until #324 is answered" (:84) and "Under reading A (s1, open on #324)" (:101);
- premade-inputs.md s0 says "open with the Investors" (:31) and "reading A's working list until #324 is answered"
  (:39, :42);
- 06-decisions.md item 9 still lists the free person's own widget as "*Open for the Investors*" (:26).

What was committed was right at 10:27 PM; it is not the finished state the line asks for. T-4692 (Idris, P1) builds
the tag list and the gate from these pages, so they should say "answered" before it starts. Board line **T-4998**
(Ines, P1) carries M1 with L1 to L3.

### L1 (Low): s1's heading reads as the opposite of the answer

The heading is "**Which runs count: the lane's own runs**" (T-4672-showcase-premades.md:58), which looks written to
carry the done-when phrase. Read as a heading, it says the lane's own runs count; under A, which the Investors chose,
they are exactly the runs that do not. Fix with M1: name the answer in the heading (for example "Which runs count:
Python a widget button runs (A, #324)").

### L2 (Low): the recorded tag list drops the card's conditional premade

The #324 card lists A's tags as "Habit tracker, Focus timer, Flashcards, Day phases once it has buttons (and Pattern
of the day only if it uses an advanced library)". The ruling's Effect line (log/rulings.md:2998) and the Operator's
notes on T-4692, T-4714, T-4715, T-4793 and T-4796 list the four and drop the parenthesis. Not Ines's commits, and
not a contradiction (#278 puts advanced libraries in Pro anyway), but the plan's row 12 (:99) keeps the condition, and
T-4692 will read whichever list it finds first. log/ is never edited; when M1 writes the answer in, quote the card's
list in full so s1, s2 row 12 and s0 agree.

### L3 (Low): why GitHub repository stays in the app is named one step removed

Plan :73 says GitHub repository is refused because "its `http.client` and `ssl` are off the lane's list". The lane's
rule names `pywidget.keychain` first and then `pywidget.http` (test_lane.py:825, :834); `ssl` and `http.client` are
what `pywidget.http` loads (lane.py:296). True in substance, but the first name is the keychain. This sits in option
B's paragraph, which A's answer makes history; if M1 keeps B as a one-line record of what was not chosen, name the
modules as test_lane.py does or drop the clause.

## Verdict

PASS with findings. The work did what M2 asked when the record could not settle it: it put one clear question to the
Investors with the company's recommendation and its cost, marked the tag list as provisional in both documents, and
every fact it cites agrees with log/ and the code. The answer has since come (A, 12:36 AM 11-18), and none of the
three places the plan promised to update says so yet; T-4998 (Ines, P1) writes it in, ideally before T-4692 builds
the tag list.
{% endraw %}

</div>
