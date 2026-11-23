---
layout: "default"
title: "T-5620: the drain look at the three later flips"
section: "documents"
description: "Odalys, Sun 11-22 7:45 PM ET, revised 8:25 PM ET for the Investor ruling of 7:04 PM ET, and Mon 11-23 1:30 AM ET for the moved start. Board line T-5620 (from T-5431). Reviewer: Idris."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5620-drain-look.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 33 · Mon Nov 23</span><span><code>ops/plans/T-5620-drain-look.md</code></span></div><h1>T-5620: the drain look at the three later flips</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, Sun 11-22 7:45 PM ET, revised 8:25 PM ET for the Investor <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of 7:04 PM ET, and Mon 11-23 1:30 AM ET
for the moved start. Board line T-5620 (from
T-5431). Reviewer: Idris.

## The question

Each flip of `ops/merge_road.json` in the comparison ([`ops/plans/T-5252-target-system.md`](t-5252-target-system.html), "The comparison began")
needs the drain look first: `tools/personal_land.sh road-check`, clear, then the flip. The flips left:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The question, scrolls sideways" style="--tw:366px" markdown="1">

| Flip | When | To |
| --- | --- | --- |
| end of day 1 | Mon 11-23 9:33 PM ET | "old" |
| end of day 2 | Tue 11-24 9:33 PM ET | "merge.sh" |
| end of day 3 | Wed 11-25 9:33 PM ET | "old" |

</div>


(Thu 11-26 9:33 PM ET ends day 4; the switch stays "old", so there is no flip and no look.) The times moved from 7:02 PM
ET with the comparison's official start (an Investor #325 c7089960090, 9:28 PM ET 11-22: S = Sun 11-22 9:33 PM ET,
[`ops/plans/T-5252-target-system.md`](t-5252-target-system.html)); that file holds the times, and this table follows it.

Until T-5620, `personal_land.sh` refused every command inside a Claude Code session (its `CLAUDECODE` check),
`road-check` included. At the start, Sun 11-22, Jeremy ran it in Terminal at 6:48 PM ET.

## The ruling

Investor ruling 2026-11-22 7:04 PM ET (an Investor, #325 comment c7088040339; `log/rulings.md`, the Handbook's Standing
instructions): for every later switch of `ops/merge_road.json` the company runs the drain check
(`tools/personal_land.sh road-check`, read-only) itself, inside a session, instead of asking an Investor to paste it
into the Terminal; the land commands keep their in-session refusal.

## What changed

1. `tools/personal_land.sh`: inside a session, `road-check` alone (no other argument) runs; every other command,
   `road-check` with anything after it included, is refused as before (exit 2, "refused inside a session").
   `road-check` writes, moves and takes nothing (T-5256's tests pin that, and now the same rows run with
   `CLAUDECODE=1`).
2. `tools/land_job.py`: each pass runs `land-live` with `LAND_AFTER_SYNC_LIVE=1`, so the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> records and landing notes
   that wait for GitHub (`ops/lane-outbox/after-sync/`, `.git/personal-ready/*.landed`) replay once their commits are
   on GitHub, with a session running or not. On 11-22 three such records (lane b's MacBook job requests of 5:31 PM ET)
   waited from 5:31 PM to 7:01 PM ET, because only the supervisor's land, between sessions, replayed them. Those
   records are things in the way of `road-check`; now a pass a minute drains them.
3. The draft of 7:45 PM ET also had the land job save a road-check look to a file for the session to read. With the
   ruling the session runs the check itself, so that copy is dropped: one look, the real one, at the moment of the
   flip. A saved copy would be up to a minute old and is a second answer that can disagree.
4. `ops/prompts/coordinator.md`: the flip steps below, and `ops/session_end.json` read at every wake (any reason ends
   the session).

## At each flip (coordinator, in its session, in the main checkout)

1. About 9:31 PM ET: `python3 tools/land_job.py kick` (the next pass runs at once and replays what is on GitHub).
2. From 9:32 PM ET: `bash tools/personal_land.sh road-check`.
   - 0, "road-check: clear": flip `ops/merge_road.json` and commit it by path. Record the look's time (12-hour ET)
     and its lines with the flip, as Sun's start recorded Jeremy's.
   - 1: wait. Each land job pass replays the records that wait for GitHub and drains the rest. Look again each
     minute. A thing that does not drain (a held branch, a busy mark) goes to its owner as a board line; the flip
     waits for it, and this page records the late flip time.
   - 2 "refused inside a session": the main checkout does not have T-5620 yet. Do not reword or work around it
     (Commandment 14); ask an Investor for the Terminal look, as on Sun 11-22.

The look cannot rule out work that arrives in the seconds between the look and the flip. T-5256's F2 guards cover
that case (each road re-tests the switch before it moves a branch). The look's job is to keep the day counts clean.

## Not yet proven

- T-5620 has to land on main before Mon 11-23 9:33 PM ET; until then the session's `road-check` is refused and the
  flip falls back to a Terminal paste. The land job takes the new `land_job.py` at its first pass after the land (each
  pass is a fresh `land_job.py pass`), so no restart.
- Tests: `tests/personal_land_test.sh` (the real after_sync under the switch: waits while its commits are not on
  GitHub, replays once, a second pass replays nothing, with a session and without one; `road-check` in a session gives
  the same answer and moves nothing; eight other commands stay refused) and `tests/land_job_test.py` (a pass sets the
  switch, whatever the caller's environment, and runs no look). The first real proof is the first after-sync record
  that replays while a coordinator runs, and Mon's in-session look.
{% endraw %}

</div>
