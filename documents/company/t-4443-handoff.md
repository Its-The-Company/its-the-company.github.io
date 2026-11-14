---
layout: "default"
title: "T-4443 handoff: the card&#x27;s second slice (the five rules in the queue check)"
section: "documents"
description: "tests/board_notes_readers_test.py was red (51/1) on tools/land_group.py before slice 1; slice 1 did not touch it. The machine callers&#x27; conversion to a full card is T-4459."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4443-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 24 · Sat Nov 14</span><span><code>ops/plans/T-4443-handoff.md</code></span></div><h1>T-4443 handoff: the card's second slice (the five rules in the queue check)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Operator, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a, 2026-11-14 1:3x PM ET. Slice 1 is committed on personal/a and lands with that branch:
14f086c7d8 (the add takes the card and refuses a new open line without it: tools/board_card.py, tests/board_card_test.py
61/0, ops/board_card.json on) and 7d4c0d4c8a (the line note, event, memory). The line stays open for slice 2.

## What is left

The five card rules in tools/queue_check.py (they are the NO_CARD entries, near line 95, reported as "not evaluated"),
with their tests in tests/queue_check_test.py. Odalys's plan, from her note on the line:

- done_test (proof): a row in ops/runs/test-runs.jsonl where the suite ran and is not red, at a head that holds the
  line's newest own commit and is itself on main.
- until_ended (proof): the named line is ticked or archived, or the issue is in the closed list.
- until_passed, changed_under (`git log Base..main -- Targets`) and missing_slot (`board_card.missing` on the next 20
  lines due out): signals only.

Read the card through tools/board_card.py, not a second parser. Whether an app part's Done when must name its
documentation page waits on Restructuring decision 29: leave it undecided. Check against
documents/restructuring/06-decisions.md before landing (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 2026-11-13 9:53 PM).

## Not this task

tests/board_notes_readers_test.py was red (51/1) on tools/land_group.py before slice 1; slice 1 did not touch it.
The machine callers' conversion to a full card is T-4459.
{% endraw %}

</div>
