---
layout: "default"
title: "Review of T-5504 at f0e36ecc: the showcase plan names all three Pro features"
section: "documents"
description: "PASS with findings. What T-5504 set out to do is done and true: the three #278 features are named, #324&#x27;s reach is stated correctly, the refresh-button question was asked, option B names the refusals the kept set meets\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5539-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 35 · Wed Nov 25</span><span><code>pywidget/docs/reviews/t5539-pernille.md</code></span></div><h1>Review of T-5504 at f0e36ecc: the showcase plan names all three Pro features</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5539, Commandment 13). Author: Ines. Date: 2026-11-25. Copy at main 8f0ac61ed9.
Scope: the T-5504 commits up to f0e36ecc80, read with `git show`: d2f60c0c0f (Operator, records the Investors' #340 answer in
log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md and handbook/rules.md), 2ed67f18ec (Ines, ops/plans/T-4672-showcase-premades.md +47/-19 and
pywidget/docs/design/premade-inputs.md +12/-4) and f0e36ecc80 (Ines, her memory line and four <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox files: two board
notes, the tick, one event). Judged against the archived T-5504 line (log/board-archive.md:4728) and its Done when:
file "#324 settled only" in the plan; premade-inputs.md s0 names the same three Pro features.

What affects the app a tester would install: nothing. All of it is a plan, a design page, records and memory. Neither file
is bundled (project.yml names no ops/plans or premade-inputs.md file). The only app-relevant content is what the plan
tells the next builder, so I judged it for truth.

## What I checked

- The #278 quote ("Pro should expand the use of "advanced" Python libraries, Buttons in widgets, and Python running within
  the widget.") matches log/rulings.md:2637 and 06-decisions item 9 word for word. "#324 settled only the third" is true:
  the #324 Effect line (12:36 AM ET 11-18) covers only which runs count as Python running within the widget.
- Option B's list of lane refusals (plan :87-89): GitHub repository (`pywidget.keychain`, `pywidget.http`), Shortcuts
  launcher (`urllib.parse`) and Sky's `sun.py` (`pywidget.device.location`) against `test_the_bundled_premades` at
  f0e36ecc (pywidget/tests/bridge/test_lane.py:816-832). The test also lists altitude, distance, steps and storage as app
  lane, but the plan's s2 table has those four as "Goes", so for the set it keeps, "every lane refusal" is the three named.
  The line cite "820-834" lands on the dict at 819-832 (two lines off; harmless).
- The 06-decisions claim, "records this answer (T-4998, f3788781d6, 11-20)": the commit exists, and
  documents/restructuring/06-decisions.md item 9 holds the #324 answer. True.
- c6970133683 sits beside the link (plan and page). The 24-hour times became 12-hour in the lines the commit touches
  ("done 3:51 AM 11-18" agrees with the archive's 3:51 AM; "5:56 PM 11-21"). The deadline "Wednesday 11-25" is a Wednesday (11-21 was a Saturday).
- s9's fallback now says the Focus timer and Flashcards ship tagged even if their buttons only open PyWidget; that agrees
  with the #324 card and with #278's "Buttons in widgets" (s1). It does not contradict s5's "Goes" rows.
- Outbox: the board notes for T-4692 and T-0678 are in ops/board_notes/T-4692.md:3 and T-0678.md:15; the event is in
  log/events.jsonl:4844. The T-5504 tick reads true: it says the plan lists the three features and that #340 went to the
  Investors.

## Findings

### L1 (Low): the plan and the page still say #340 is open; the answer was already on main when they landed

d2f60c0c0f (the Investors' "A" on #340, 9:48 PM ET 11-21: a widget's refresh button is not a Pro button) is an ancestor
of 2ed67f18ec, because Ines wrote her commit at 9:44 PM, before the answer, and it landed after. So at f0e36ecc main's
own log/rulings.md answers the question that the plan, written the same night, says "waits on the Investors". Still so at
HEAD: ops/plans/T-4672-showcase-premades.md:65 ("waits on the Investors"), :252 ("not settled; it waits"), :593-599
("Asked of the Investors ... Waiting on it: T-4692's gate ... T-0678"); pywidget/docs/design/premade-inputs.md:57; and
06-decisions item 9 has no #340 text. The #340 Effect line names these files as affected, and the plan said its owner
writes the answer in "when it lands". Nobody has. The build side has the answer (T-5654 says "Refresh buttons are not Pro
(#340 A)"), so nothing is built wrong; but T-0678's note still says build without a Pro gate "until then", and a reader of
the plan alone is told a ruled question is open. Fix (Ines, docs only): write #340 A into plan s1 and s10 item 5, premade-inputs.md s0 and
06-decisions item 9; take "Waiting on it" out of s10 item 5. I did not file a board line (no board_tick in this task).

### Observation (no finding)

The quoted #278 sentence nests double quotes ("advanced" inside a quoted sentence) in the plan and the page. It reads
fine and is the Investors' exact text.

## Verdict

PASS with findings. What T-5504 set out to do is done and true: the three #278 features are named, #324's reach is
stated correctly, the refresh-button question was asked, option B names the refusals the kept set meets, and the stale
item 9 note was corrected. One Low: the plan was left saying a ruled question is open (L1). Nothing in it reaches the
app. It does not need to hold a TestFlight upload.
{% endraw %}

</div>
