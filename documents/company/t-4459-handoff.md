---
layout: "default"
title: "T-4459 handoff: what is left after slice 1"
section: "documents"
description: "The writer the tools share is in tools/board_card.py: write, known_targets, until_in. The add checks every line as before; no rule changed."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4459-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 24 · Sat Nov 14</span><span><code>ops/plans/T-4459-handoff.md</code></span></div><h1>T-4459 handoff: what is left after slice 1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a, 2026-11-14. Slice 1 is 9cedb1bd87 on personal/a. The line stays open: it is the one line for the
rest, so no second line was added.

## Done in slice 1


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Done in slice 1, scrolls sideways" style="--tw:944px" markdown="1">

| Tool | Before | Now |
|---|---|---|
| tools/main_green.py ("main is red") | no card, no Links, `--links-warn` | card and `Links: none`; no warn flag when the red names a file on main |
| tools/quarantine_line.py (flaky suite's fix line) | no card, no Links, `--links-warn` | `Links: none` always; card and no warn flag when the suite is a file on main |
| tools/land_group.py board_targets | own split; returned `path (new)` as a path | reads `board_card.targets_of`; the mark is dropped |
| tools/taskstore.py add | `plan_add` with no card rule | `--by`, `--card-warn` and the switch, as `board_tick.py add` |

</div>


The writer the tools share is in tools/board_card.py: `write`, `known_targets`, `until_in`. The add checks every
line as before; no rule changed.

Tests, through tests/run.sh: board_card_test 80/0 (61 before), queue_check_test 78/0, land_group_test 122/0,
taskstore_test 68/0, main_green_test OK, quarantine_line_test OK, board_notes_readers_test 52/0 (51/1 before: it was
red on land_group.py reading the board raw with no reason given; the reason is listed now).

## Left

1. **The card rule has no answer for a fault that names no file.** A tool that finds a red main or a flaky suite
   does not always know which file the fix changes. `Targets: none` would say the task changes no file, which is
   false, and a top-level folder is refused. Today such a line goes on without a card through `--card-warn`
   (main_green.py `red_line`, quarantine_line.py `add_flags`), so a red main is never left unsaid.
   Sample: the board and its archives hold one main_green line, and it named "widgets (3.9.6)", a host suite by
   name (1 of 1). ops/land_quarantine.txt holds one entry, a file under tests/ (1 of 1 has a file).
   That is two lines. It is not a rate.
   Options, not decided:
   - a. A map from each land host suite name to its folder, kept beside the land's suite list, so the tool can
     always name a path. No rule change. Cost: the map must follow the suite list.
   - b. A third Targets value for tools only (`--by tools/x.py`), meaning "not known at the add", which the queue
     check then reports as a missing slot until a person fills it. A rule change in tools/board_card.py (T-4443's
     rules), so it needs Ines's read.
   - c. Leave these lines to `--card-warn` for good and count them in the daily sweep.
2. **tools/runner_watch.py** (two [fix] lines, P0): neither names a file, so both sit in case 1. It keeps
   `--links-warn`. Its lines also name T-3213 with no link; write it as "from T-3213" and add `Links: none` when it
   is converted.
3. **tools/land_fold.py and tools/park_watch.py**: lines about lines. Left to the states work (plan 3.5: the fold
   stops, the recut becomes a state on the task). Their flags stay until then.
4. **tools/personal_land.sh**: ops/plans/T-4459-personal_land.patch, handed to the audit session by a note on
   T-3995. It passes `--by tools/personal_land.sh` and keeps `--links-warn` (its review, redo and waiting lines are
   lines about lines, plan 3.5). `bash -n` passes and `git apply --check` passes on 9cedb1bd87. Its suites were not
   run here.
5. The two Until lengths (7 days for main red, 14 for a flaky suite) are guesses. A date that passes only flags the
   line. Measure how long such lines stay open once there are more than two of them.

## Tick T-4459 when

tests/board_card_test.py shows main_green, quarantine_line and runner_watch each passing an add with no warn flag
in both cases (a named file, and none), and the personal_land.sh patch has landed with the batch.
{% endraw %}

</div>
