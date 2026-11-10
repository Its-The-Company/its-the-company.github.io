---
layout: "default"
title: "T-1035 on T-1186: independent review of the merge (T-1082)"
section: "documents"
description: "PASS. No blocking finding. Two notes and one held item below; none needs a change before landing."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-merge-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-merge-pernille.md</code></span></div><h1>T-1035 on T-1186: independent review of the merge (T-1082)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Odalys. Read: `git diff 853cbb8b 4773760c` (12 commits, 25 files, +1644 -351), the code,
not the author's notes. The 12 picks themselves had my T-1082 pass with fixes and the T-1185 GO on T-1160 to T-1162;
this read is of the whole range again, with weight on what is new: the reconciliation of T-1035's land-live with
T-1186's spare handoff in `tools/personal_land.sh` and `tools/personal_tick.sh` (f3482442, a8e9c21f).

## Verdict

PASS. No blocking finding. Two notes and one held item below; none needs a change before landing.

## The board line's differences, one by one


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The board line&#x27;s differences, one by one, scrolls sideways" style="--tw:640px" markdown="1">

| Difference the line names | In the code now |
|---|---|
| A <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> lands only `pywidget/` paths | Gone. `LANE_LIST` and `check_lane` removed; every path not Investor-owned lands. |
| A lane can't change an existing test, fixture, `project.yml` | Gone. `check_tests` and `folded_on_main` removed. A changed `tools/x` or `tests/x_test.*` now also runs suite x (`suite_of`, `SUITE_FLOOR`), whatever the marker named. |
| A lane can't change `tools/`, `ops/` | Gone. `NOISE_PATHS` narrowed from all of `ops/` to the files only tools and test runs write; board ticks, events and MacBook jobs queue in `ops/lane-outbox/` and replay on main through the real tools (allow-list of three tools, argv as a list, no shell). |
| One slot takes the whole menu | Gone. `take_now` gives each account ceil((free + live claims) / accounts at work, main counted) and splits the account's room across its idle slots; the queue is one batch, not two pools. `board.py lanes` offers every runnable line with an ID. |

</div>


What still differs and lives in `rules/` (Investor-owned): rows 12 and 17 go by proposal #135 (approved), 18 by hand;
rows 13, 14 and 15 (skills and slash commands off, connectors off, the start and stream checks) are kept under
Commandment 2, in `rules/personal_lane.py`. Those three are the personal-data ban itself; I would not strike them.
Rows 22 to 24 (blocking batches, inbox and report sessions on the main account until T-1062, no push from a lane) are
in `tools/` and `ops/prompts/`, not `rules/`, each with its reason in the table. They are the Investors' to strike.

## Commandment 2: the personal-data ban

Holds. Nothing in the range touches `rules/personal_lane.py`, the start check, the stream check or the keeper. The
landing a tick starts (`land_now`) runs with every name in the lane's own environment unset (`ENV_OFF`, built from the
same `.env` the session gets), and a land's host and Xcode checks still start from `env -i`. `tests/run.sh` unsets
`COMPANY_LANE`, so a suite never queues records. The Investor-owned list a branch is checked against is read from
main (`git show refs/heads/main:rules/file-guard.sh`), never from the branch, before and after each rebase, including
the extra rebase inside `live_merge`. New: a symbolic link a branch adds lands only inside `pywidget/` and pointing
inside it (`check_links`, mode 120000).

## Commandment 13: review before landing

Holds, as before, for all accounts alike. A branch that changes product paths gets its review line, and nothing
lane-landed goes to TestFlight with that line open. A live landing (session running) is not pushed; its review line
waits for `after_sync` and names the commit as GitHub has it, and a commit gone by the time it runs still gets a line
("its sha could not be found"), so no line is lost.

## Notes (not blocking)

N1. The merge's locks are consistent. `.landing` is taken once per pass (both `land` and `land-live`, every drain),
`.busy-<id>` per branch in both loops and in the handoff. The live loop's `next_ready` adds a busy branch to `tried`
before skipping it, so it can't spin. A dead `.landing` holder is reclaimed under `.landing.break`.

N2. `live_merge` lands without rerunning checks when main's new commits touch none of the branch's files. That is the
stated design and the same exposure as a second worker's commit; the header's Limits says so.

H1. One item held in my scratch folder (Commandment 42). Low severity, inside what the Investors accepted on #41
(2026-11-01 10:59 AM and 12:58 PM). It is for Odalys, as its own line.

## Landing

Copied onto main 65c413f7 by cherry-pick, all 12 clean, on scratch branch pernille/t1035-land-main; the only file
both sides changed is `tests/run.sh` (main's T-1202 suite-name check and the branch's `COMPANY_LANE` unset, in separate
hunks). Green there: lane_outbox 107/0, board_lanes, personal_claims, session_end 30/0, board_tick, run_names 13/0,
personal_land 229/0, personal_slots 35/0. Then, in one run of 802 s:
personal_land_product 118/0, personal_off 90/0, personal_parked 76/0, personal_pool 77/0; personal_lane_test.py 2 red,
the two Inert pin rows Odalys found red on main 000e11d9 too (not rechecked on main by me). Main then moved to 22b8cafa (10 commits, none on these 25 files), and the
security guard refused the rebase of the scratch branch onto it, so main was not moved. The T-1035 board line has where
this stands.
{% endraw %}

</div>
