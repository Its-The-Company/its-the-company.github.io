---
layout: "default"
title: "How a line gets its priority when it enters the queue (T-4104, slice 10 of the queue audit)"
section: "documents"
description: "Do not write inherited priority onto lines. Derive it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4104-priority-at-entry.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4104-priority-at-entry.md</code></span></div><h1>How a line gets its priority when it enters the queue (T-4104, slice 10 of the queue audit)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
STATUS: open


Ines, 2026-11-13, 10:3x PM ET, on Jeremy's personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> (b). The ask: an Investor #41 c6806546659 (3:33 PM ET 11-11,
log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md): "ideas to improve how tasks are originally prioritized when placed in the queue (considering a
task's parent/child/umbrella status)". This memo proposes only. It changes no rule, no Handbook text, no tool and no
board line; T-4105's report carries it to the Investors. Everything was read at HEAD c4b4d62fba of personal/b.

## Recommendation

**Do not write inherited priority onto lines. Derive it.**

1. **One written number.** The author gives a line its own priority at entry, as today. No tool rewrites it for a
   link; an Investor's reorder (`board_tick.py move --prio`) stays the one path that does. A derived <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> ends by
   itself when the waiting line merges or is archived, the author's number stays readable so a wrong one shows,
   and the board is not edited when a link changes (R10).
2. **"needs" passes urgency up, in full.** A line's place in the queue is the best place held by itself or by any
   open line that waits on it. If a P0 line needs a P3 line, the P3 line stands at P0 until it merges. Needing an
   umbrella is needing all its pieces (tools/board_links.py), so the place goes on to those pieces.
3. **"part of" passes a floor, one level under.** A piece stands no lower than one level below its umbrella (P0
   umbrella: P1 at least). A level only, and not the full level: see the table.
4. **A child is never above its parent.** This follows from 2: the parent's place is at least the child's, and on a
   tie the parent goes first. It is the Investors' rule for manual moves (an Investor #41 c6709231564, 10:44 AM ET
   11-07; recorded on T-2401's ticked line and in tools/queue_order.py, not in log/rulings.md), applied to every
   line.
5. **A child enters at its own place when its parent merges** (c6799931210), with no bonus for having waited.

"Place" is the reader's whole sort key, not only the P-number: for dispatch, the merge-first list, the 48-hour
Investor rule, the group, the level and board order. A line's stale flag and account pin stay its own.

## What the links say today

`python3 tools/queue_inventory.py --summary`: 530 open lines (483 open, 47 blocked); P0 57, P1 277, P2 137, P3 59.
`python3 ops/plans/T-4104-priority-links.py` (kept beside this memo; `--examples` lists every line named below):

- Ledger: 724 IDs, 96 with links (62 "needs" only, 21 "part of" only, 13 both); 129 links, 99 with both ends open.
  These are the links slices 1 to 3 wrote. No row is from slice 4: T-4098 has added none at this HEAD.
- Board: 269 open lines carry the Links field (56 say "none"), 261 carry none; 236 links with both ends open.
- Together: 301 links between open lines, 78 "needs" and 223 "part of".
- "needs": the child is more urgent than its parent in 9 links, the same in 40, less in 29. In 14 the child sits
  above its parent in board order.
- "part of": the piece is less urgent than its umbrella in 139 links, the same in 82, more urgent in 2.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the links say today, scrolls sideways" data-n="2 3" style="--tw:466px" markdown="1">

| Rule | Lines lifted (of 530) | Lines standing at P0 |
|---|---|---|
| Today (own number only) | 0 | 57 |
| "needs" only | 10 | 59 |
| "needs" and a floor one level under (recommended) | 70 | 59 |
| "needs" and the full floor (a piece stands with its umbrella) | 141 | 108 |

</div>


The table sizes each rule on the 301 links together. The full floor nearly doubles P0, and P0 then means nothing.
Two feature umbrellas cause most of it: T-4181 (P0, 30 pieces, none of them P0) and T-4180 (P0, 15 pieces, 1 of
them P0). "One under" is my judgment, not a measurement; the table is there so the Investors can choose otherwise.

## Worked examples

1. **"needs", one step (ledger).** T-0299 (P0, keep real packages out until the sandbox is fixed) needs T-0801 and
   T-0802, both P3; T-0802 needs T-0801. 471 of the 530 lines carry a more urgent number than P3. Under the rule
   both stand at P0. If that looks wrong, the wrong number is T-0299's P0, and the rule shows it at entry.
2. **"needs" through an umbrella (board and ledger).** T-4202 (strip OpenSSL from the app) and T-4203 (test every
   https host on a device), both P1, need T-3401 (P2). The ledger has T-3821, T-3822 and T-4142 (P2) as pieces of
   T-3401. All four stand at P1.
3. **The floor (board field; the ledger has no row for the feature lines).** T-4180 (P0, every premade draws on
   the iPhone) has 15 open pieces: 1 P0, 2 P1, 10 P2, 2 P3. It cannot be ticked while one is open. One level under
   puts the 12 at P1, ahead of the 137 P2 lines. The full floor would make 14 more P0 lines from this one umbrella.
4. **Board order (board and ledger).** T-1440 (P1, line 15) needs T-0678 (P1, line 235): the parent sits 220 lines
   behind its child. Under the rule T-0678 takes line 15's place. tools/queue_order.py already does this by hand
   when an Investor moves a line.

## Edge cases

- **Cycles.** `board_tick.py add` and `links` refuse them, and the board's fields hold none. The ledger's links
  hold two: T-0678 needs T-1440 while T-1440 needs T-0678; and T-2296 is a piece of T-0191 and needs T-2268, which
  needs T-0191. Both are mine, from slice 2: I wrote an ID the line names as a link. They are T-4098's to correct.
  The derivation runs to a fixed point, so a cycle ends: every member gets its best level. Flag, never fix alone.
- **A line with no links.** Its place is its own number. "Links: none" is an answer; no field at all (261 lines)
  is not. Priority is never guessed from free text.
- **Investor-cited lines.** The citation stays on its own line (R3) and is never copied to a parent. Its rank
  passes up like any other: what an Investor's line waits on stands with it. Dispatch has a one-step form of this
  (a line that a product line waits on joins group 0), but it does not fire when work is handed out: held lines
  are dropped before the order is worked out. `python3 ops/plans/T-4104-priority-links.py --dispatch-check` runs
  two made-up lines through both paths: group 0 on the whole menu, group 2 on the hand-out path.
- **Merge-improving work** (c6756912112, c6729576810). The merge-first list sits above every level and passes up
  the same way, or a listed line waits behind ordinary work. Of 208 listed IDs, 16 are open and 2 need an open
  line that is not listed: T-3365 needs T-3371, and T-4112 needs T-4101. The merge queue uses the task queue's
  priority (c6743771068), so a finished parent would merge at its lifted place too.
- **A blocked or dated parent.** A lift changes a line's place, never its box: T-0801 still waits until 2026-11-16.
- **A parent removed, not merged.** None today: the 14 "needs" links whose target is no longer open point at 8
  lines, all ticked. But `add` accepts a "needs" to any ID on the board or in log/board-archive*.md, so one to a
  line archived open with a reason would pass and hold nothing (`--archived-check`, a made-up line: no refusal,
  held by nothing).

## Who does what

**At entry: `board_tick.py add` and the links library** (slice 6, T-4100, ticked 8:13 PM ET 11-13: the Links
field, the refusals and the <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> are built; no priority step is in it).

- Keep today's refusals: no Links field, an ID named with no link, a cycle, an unknown ID.
- Print what the new line does: its derived place, the floor its umbrella gives it, and each line it lifts with
  the old and new level ("lifts T-0801 from P3 to P0"). A notice, never a refusal: the author's number stands.
- Refuse a "needs" on a line that was archived open, with the reason.
- One function for the derived place, in tools/board_links.py beside `held_by`. Three readers order the queue
  today, each on its own key: `dispatch.py order_tasks`, `board.py ranked_row` and the site's
  `tasks_panel.queued_items`. All three would call it. Those are pipeline files; the change is their owner's.

**Standing: the queue-check sweep** (slice 9, T-4103; no commit carries its code at this HEAD). For priority it
edits nothing, because nothing inherited is written. It checks and flags:

- a cycle among open lines; an open line with no Links field; a "needs" whose target left the board unmerged;
- every line standing at P0 by a lift (2 today, T-0801 and T-0802), for a person, since P0 means do first;
- a piece more urgent than its umbrella (2 today: T-0299 in T-4192, T-4089 in T-4188), for the umbrella's owner;
- and in each evaluation it records every line whose derived place differs from its own number, and who lifts it
  (70 today under the recommended rule), so growth is seen.

## What would make this fail

- A wrong number spreads through "needs" (example 1). The notice at entry and the P0 flag are the guard.
- Missing links: 261 of 530 open lines carry no field, and the rule is only as good as the links.
- The three readers drift apart. One function, with a test that each calls it.

## Left undecided

- Which feature umbrella a new app line enters under is T-4228's ground (group new app tasks into features). Part
  of it waits on Restructuring decision 17 and waits on Restructuring decision 18, as the ledger rows for T-4194,
  T-4195, T-4196 and T-4228 say.
- Which pieces T-4190 (Settings and Pro) holds: waits on Restructuring decision 9. The rule does not depend on it;
  the piece list does.
- Whether the floor later becomes the full one. I would look again once each feature's pieces are only what its
  "Done when" needs. Any rule or Handbook change that follows goes to the Investors through the usual route.
{% endraw %}

</div>
