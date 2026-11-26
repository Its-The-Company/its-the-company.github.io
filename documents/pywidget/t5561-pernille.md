---
layout: "default"
title: "Review of T-4183 at 14765044: the five page strings the build added, written into the design table"
section: "documents"
description: "PASS with findings. T-5193 did what it said: the five strings are in s5 exactly as the app shows them, with right &quot;Where&quot; entries and a true note after the second commit&#x27;s fix. Two Lows, both about the record&#x27;s wording\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5561-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 35 · Wed Nov 25</span><span><code>pywidget/docs/reviews/t5561-pernille.md</code></span></div><h1>Review of T-4183 at 14765044: the five page strings the build added, written into the design table</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-5561, Commandment 13). Author: Maren (both commits). Date: 2026-11-25. Copy at main 8f0ac61ed9.
Scope: the 11-21 landing of the T-4183 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, which is T-5193's two commits, 89b2f60952 and 14765044b4 (both change
pywidget/docs/design/premade-inputs.md; the first also adds a line to Maren's memory file). `git log --grep='^T-4183'` also
returns 3a5c74b44e (11-17, T-2296 Gallery work; a body line mentions the T-4183 handoff) and three Idris commits of 11-23
to 11-25 (1e858c5aa6, 902b324f88, 01f6660ee9). I did not read those: the first landed four days earlier, the
others are not ancestors of 14765044 and are not what the line names. Judged against the archived T-5193 line
(log/board-archive.md:4792) and its Done when: file "page.nocities" in premade-inputs.md; s5 carries all five.

What affects the app a tester would install: nothing. Both commits change a design page and a memory file. No Swift,
string catalog or test changed. The strings are already in the app as the build wrote them; this records them.

## What I checked

- Each of the five rows against the Swift at 14765044b4 (pywidget/ios/App/Pages/SettingsPage.swift:47-57), and the whole
  s5 table against `PageStrings` at HEAD with a script: 37 table rows carry an ID, 0 differ from the Swift text where
  both exist. The five: `page.dup` "You already have one called “{name}”.", `page.full` "This list is full. Delete one to add
  another.", `page.required` "This can’t be empty.", `page.nocities` "PyWidget couldn't read its city list. Reinstall PyWidget
  to get it back.", `page.loc.nofix` "PyWidget couldn't find where this iPhone is. Try again outside or near a window."
- The "Where" column against the code: `page.dup` is the refusal for every list but Countdown's events (SettingsPage.swift:233;
  events use `page.cd.dup`); `page.full` the footer when no <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>-specific line exists (:435); `page.required` the refusal for a
  required text field (:225; also the empty GitHub field, :601, which the row's wording covers); `page.nocities` replaces the
  search when the city list cannot be read (PlacePicker.swift:86); `page.loc.nofix` shows under Use Current Location
  (PlacePicker.swift:149). All true. The strings also match row 23 of pywidget/docs/design/copy-card-pending.md.
- Voice (creative/approved.md item 8: plain words, sentence case, short sentences, what happened then what to do, "PyWidget"
  not "the app", no exclamation marks): all five pass.
- The second commit's count fix: the table has four straight-apostrophe "couldn't" lines (`page.unreadable`, `page.cantsave`,
  `page.nocities`, `page.loc.nofix`) and curly "hasn’t" (`page.cd.past`) and "can’t" (`page.sc.foot`, `page.required`).
  "Four" is right now (the first commit said three).
- `draw_premade_inputs.py --strings` does not carry these five, so "where both have a string, they match" holds with nothing
  to compare.

## Findings

### L1 (Low): a tester reads two apostrophe styles in the app's Page strings

The app shows "can’t" (curly) in `page.required` and `page.sc.foot` and "couldn't" (straight) in four other lines (counting
apostrophes in s5 roughly, 11 straight to 6 curly, so neither is the table's norm). The voice rule is silent on typography. Maren saw it and kept it "as built", as her line said keep or
reword, so the commit is right to its line, but the table now records both styles as the copy. Fix (Maren, then Idris):
choose one (curly is the typographic mark), change the four "couldn't" lines in
SettingsPage.swift (:20, :21, :55, :57) and the table, and the string catalog if it mirrors them. No board line filed (no
board_tick in this task).

### L2 (Low): s5 says "This table is the full set" but nine Swift strings are not in it

`PageStrings` at HEAD holds 42 strings; nine (`page.name`, `page.time`, `page.edit`, `page.cancel`, `page.save`,
`page.delete`, `page.discard`, `page.keep`, `page.settings`) have no row. They are one-word labels (voice rule item 8 sends
those to Apple's conventions), so nothing is wrong in the app; the sentence is not true. Fix: say "the full set of sentences"
or add the nine rows (docs only, premade-inputs.md s5 intro, line 488).

## Verdict

PASS with findings. T-5193 did what it said: the five strings are in s5 exactly as the app shows them, with right "Where"
entries and a true note after the second commit's fix. Two Lows, both about the record's wording; L1 is also about what a
tester reads. Neither makes the landing wrong, and the landing changes nothing a tester installs.
{% endraw %}

</div>
