---
layout: "default"
title: "Review of T-5450 at 9decedf6: keep one coordinator session running from the supervisor"
section: "documents"
description: "FAIL. The supervisor half does what the line asks for in its mechanics. COORD=1 starts coordinator.md and restarts it when it exits, with no chain, no CHAIN_MAX and no clock stop. COORD=0 is today&#x27;s path (the off branch\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5450-9decedf6-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 32 · Sun Nov 22</span><span><code>pywidget/docs/reviews/t5450-9decedf6-pernille.md</code></span></div><h1>Review of T-5450 at 9decedf6: keep one coordinator session running from the supervisor</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (Commandment 13; the line names me, not the author). Author: Odalys. Reviewed: `git show 9decedf6fe`
-- tools/supervisor.sh` (+56/-3) and `tests/supervisor_test.sh` (+42/-1, the new `coord` group). Judged against the T-5450
line on the board: with COORD=1 the supervisor starts ops/prompts/coordinator.md and starts it again when it exits (no
chain, no CHAIN_MAX, no hours limit); the separate inbox and report sessions retire; COORD=0 is today's path unchanged.
Also read, for what the change relies on: `coord_state` and `cmd_coord` in tools/dispatch.py (:2147-2210), the
coordinator prompt (ops/prompts/coordinator.md, T-5449), RUN_SPECS, `session_budget`, `record` and `attribute` in
tools/governor.py, `check`, `run_of` and `report_notice` in tools/session_end.py, and the model guard's tag rule
(rules/hooks/model-guard.py:78). I did not read ops/board_notes/T-5450.md or the author's memory file before writing
this. Nothing after 9decedf6fe touches the two files (`git diff 9decedf6fe HEAD` is empty for both), so line numbers
are HEAD's. Date: 2026-11-21.

What I ran (scratch copies under my scratchpad; no tracked file edited):
- `python3 -I tools/dispatch.py coord` with COORD unset (ops/coord.json 0): "off: ops/coord.json coord 0", exit 1; with
  COORD=1: "on: COORD=1 in the environment", exit 0. About 0.3 s each, the whole cost the change adds to a COORD=0 tick.
- H1's check: tools/session_end.py's `check` from a `git archive` of HEAD, with its `jobs` stubbed to return a due
  morning report and the session's stream named as supervisor.sh:913 names it. Stream `-work.jsonl`: ops/report_due.json
  written. `-inbox.jsonl`: written. `-morning.jsonl`: not written ("no end reason").
- `SV_GROUPS=coord bash tests/run.sh supervisor_test.sh` in this worktree: PASS 13 FAIL 0 (138 s, after 46 minutes
  waiting for a heavy-run slot). That is the coord group plus the shared setup rows. I did not run the full 258-row
  suite again: the slot queue was over 45 minutes deep. The author's 258/0 is in the commit message, and nothing in
  the other groups changed apart from what the COORD=0 analysis below covers.

## What holds

- **The switch is fail-safe.** The coordinator starts only when tools/dispatch.py and ops/prompts/coordinator.md exist
  and `dispatch.py coord` exits 0 (supervisor.sh:774). A missing file, a crash or an unreadable ops/coord.json all read
  as off, and the "off: ..." text is captured, not logged.
- **COORD=0 is today's path.** With COORD_RUN=0 every changed line reduces to the old one: the receipt test
  (:794) is the old test, the dry-run text (:846) still says "session", `limit` is SESSION_SECONDS (:923), and 12d
  (:1359) is skipped, so step 13's chain is untouched. The only unconditional change is `unset COORD_SESSION` at the
  tick's start (:59), which no COORD=0 code reads. The first coord row proves a work tick still starts work.md with no
  coord line and no inherited COORD_SESSION.
- **Restart, no chain, no hours limit.** 12d (:1359-1371) sets CHAIN_RUN=0 and either execs the next tick or exits, so
  step 13 never runs for the coordinator. CHAIN_DEPTH is unset and no runnable-line test is made. `run_limited 0`
  means no watcher (:77-80), so SESSION_MINUTES cannot stop the coordinator, and session_end's hours flag stays off
  ("hours" is absent from ops/session_end_config.json). The guards against a hot loop are the right ones: a failed
  session after its retry, a mode that was not auto, a pause, and an end inside COORD_MIN_SECONDS do not restart at
  once. The lock is released before the exec, as step 13 does.
- **COORD_SESSION is scoped.** It is exported only around the session's `run_limited` and unset straight after it
  (:924-927). The keeper and the status loop are forked before it is set, so they never see it.

## Findings

### H1 (High): a report decision starts a coordinator that is never told the report is due, and the report is dropped after two tries

tools/supervisor.sh:771-781, :913, :935, with tools/session_end.py:385 and :392-393 and tools/governor.py:2764-2779.
RUN keeps the governor's kind, so a coordinator started for a morning, evening or weekly decision streams to
`ops/runs/<time>-morning.jsonl` and is recorded `--type morning`. session_end.py reads the kind from that stream name
(`run_of`), and to it a "morning" session *is* the report session: `own` is true and the due report is set to None, so
ops/report_due.json is never written (checked above: written for `-work` and `-inbox`, not for `-morning`). The
coordinator's only report trigger is that file (coordinator.md, **Start** and step 5; tools/inbox_wait.sh exits 2 on it).
Nothing in the prompt says a run.json with `run: morning` means "write the report", and the prompt it replaces
(morning.md) is no longer started. So the coordinator does its inbox and board work and never starts the report agent.
When it ends, `record` finds reports/last_report.txt unchanged: the first time it notes "retried at the next tick",
the governor decides "morning" again, and the second coordinator is again a "morning" session with no notice. On the
second try `record` sets last_morning_date (or last_evening_date) as if the report had been sent. The report is skipped
with no alert, which Commandment 37 does not allow. The board's "the separate report sessions retire" holds only if the
coordinator takes the report over, and on this path it cannot. The new row "a report decision (morning) starts the
coordinator" checks the model and turns, not that a report gets written. Fix: give the coordinator its own kind in the
stream name and the record (for example `-coord` and `--type coord`, with a RUN_SPECS entry), so session_end treats it
like a work session and writes the notice. Or keep the kind but tell session_end the session is the coordinator (it can
read `coord` from ops/run.json). Then add a row: a COORD=1 tick on a due morning report leaves ops/report_due.json up
while the session runs.

### M1 (Medium): the coordinator inherits budget <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> sized for a 15-turn reply or a Haiku report, and they end it with no hand-off

tools/supervisor.sh:776-778. The jq raises max_turns to 80 but keeps the decision's `max_budget_usd`. For inbox and
morning that is 5% of the day's share, for evening 15% and weekly 25% (tools/governor.py:130-137, `session_budget`
:1766-1789). The floors are $0.50, $1, $3 and $5 (:251-253). At today's share ($161.67 in the live ops/run.json) that is
about $8 for an inbox or morning start and $24 for an evening one. A work start gets the week's remainder ($211 now).
An Opus-high session that is meant to run for hours, waking every 90 minutes, will hit that cap. Turns are similar: 80
turns run out after roughly 8 to 16 wakes at a handful of turns each. A cap ends the session with no hand-off. The
prompt writes ops/coord_handoff.md only when ops/session_end.json says the context is full (coordinator.md step 6). So
each cap stop loses the open promises and plan-mode threads, and <span title="A test written in advance. If it fires, we drop the idea.">kills</span> a running report agent (its child). `record`
marks a cap as no retry (governor.py:2658, :2677), so 12d restarts it at once. While the governor's decision stays
"inbox" or a report kind, each restart gets the same small cap. Fix: under COORD_RUN=1 use a budget sized for the
coordinator, not for the decision's kind: the work spec's cap, or a `coord` entry in RUN_SPECS (which also fixes H1 and
M2). Tell the prompt how close it is to its turn and budget caps, or have the keeper raise session_end.json before a
cap, so that a cap stop still writes the hand-off.

### M2 (Medium): the coordinator's spend and state are filed under the decision's kind

tools/supervisor.sh:913, :935; tools/governor.py:2604-2611, attribute :2475-2490, caps :209. The comment at :770 says
RUN keeps the governor's kind "so the records ... read as today". They do not read as today. The coordinator's
main-thread spend goes to the session kind's category. A coordinator started for a report decision books its hours of
inbox, board and plan work as "reports", which the Handbook caps at 3% of the 7-day spend (now 1.58%). A few evening
starts would put reports over the cap and misstate where the usage went. A coordinator started for an inbox decision
sets last_inbox_at, and one started for a work decision on the bash_cap switchback's new arm gets
BASH_MAX_OUTPUT_LENGTH=8000 (:906-911) and its spend is filed as that arm's work session (OPS-5). Fix: the same separate
`coord` kind as H1 and M1. If the governor's kind must survive for report_facts, pass it as a separate field.

### L1 (Low): COORD=1 with the coordinator prompt or dispatch.py missing silently runs today's path

tools/supervisor.sh:774. The fail-safe is right for COORD=0. But when COORD=1 is in the environment and
ops/prompts/coordinator.md is gone (a bad merge, a rename), the tick starts work.md, inbox.md or morning.md with no log
line, so the change from one coordinator back to separate sessions goes unseen. Fix: when `dispatch.py coord` says on
and a file is missing, log one "coord: on but ... missing; today's path" line.

### L2 (Low): a non-numeric COORD_MIN_TURNS empties the decision

tools/supervisor.sh:776. `--argjson t "${COORD_MIN_TURNS:-80}"` fails on a non-number, and DECISION becomes "". MODEL
and the other fields read empty, and the tick fails as "missing prompt ops/prompts/". COORD_RUN is 1 by then, and
run.json would be empty. COORD_MIN_TURNS is also missing from the header's settings list (:22-27). Fix: document it and
check it is an integer (`case $t in ''|*[!0-9]*) t=80 ;; esac`).

### L3 (Low): 12d restarts after failures step 13 would not chain

tools/supervisor.sh:1361-1362. Step 13 chains only on exit 0, timed_out or credits_out (:1387). 12d restarts after any
non-retry end, including `limited` and `auth_failed`. The next tick's governor then decides (a limit queues), and
COORD_MIN_SECONDS keeps a fast failure from looping, so the harm is bounded. But a log-out now produces one more failed
tick at once. Fix, if it is not intended: skip the restart on `field auth_failed` and `field limited`, or say in the
comment why restarting on them is safe.

### L4 (Low): the tests miss the paths where the findings live

tests/supervisor_test.sh:870-909. The group covers a work decision, a morning decision, the restart, the 60-second
guard, the clock and COORD=0 for work. Missing:
- an inbox decision under COORD=1: coordinator.md started instead of inbox.md, and no receipt from :794;
- evening and weekly decisions;
- what the coordinator gets for `--max-budget-usd` (M1);
- a report notice while a report-started coordinator runs (H1);
- a failed coordinator (retry true twice) that is not restarted;
- `final` staying its own session (:773 leaves it out on purpose; nothing pins that);
- COORD=1 with coordinator.md absent (L1).

The COORD=0 row covers a work tick only. The other groups run with COORD unset and ops/coord.json at 0, so they cover
the rest of the off path implicitly.

## Verdict

FAIL. The supervisor half does what the line asks for in its mechanics. COORD=1 starts coordinator.md and restarts it
when it exits, with no chain, no CHAIN_MAX and no clock stop. COORD=0 is today's path (the off branch is fail-safe and
covered by the suite). But "the report sessions retire" is not safe yet: a report decision starts a coordinator that
session_end never tells about the report, and the governor counts the report done after two such sessions (H1). The
coordinator also runs on a report or inbox decision's budget and ends at that cap with no hand-off (M1). Both come from
one choice, keeping the governor's kind as the coordinator's run kind, and one fix answers H1, M1 and M2. COORD stays 0
on main, so nothing breaks today. But T-5453 must not switch COORD=1 until H1 is fixed and has a test row. The fix goes
on T-5450 itself (still open), as a note there. I filed no new line.
{% endraw %}

</div>
