---
layout: "default"
title: "One dispatcher for every account (T-2471)"
section: "documents"
description: "One program, tools/dispatch.py, decides for every task that needs Claude which account runs it and when. It looks at what each account has left and when that runs out, sends the next task to the account that would\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/one-dispatcher.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 15 · Thu Nov 5</span><span><code>ops/plans/one-dispatcher.md</code></span></div><h1>One dispatcher for every account (T-2471)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div><p class="meta">Mockup screens are drawn; they go public after creative approval.</p></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Ines. Builder: Odalys (build line T-2529). Written 2026-11-05 2:33 AM ET.
Asked by: an Investor #41 c6651007804 (1:02 AM 11-05). Built and run in one go, measured afterwards: amendment 2026-11-05 1:07 AM
(c6651078949). Approvals it needs are given in advance: amendment 2026-11-05 1:21 AM (c6651295775); guard and classifier
refusals still stop an item (T-0848). Folds in T-2488 (simplifications S2: app work first).

## Recommendation

One program, `tools/dispatch.py`, decides for every task that needs Claude which account runs it and when. It looks at
what each account has left and when that runs out, sends the next task to the account that would otherwise lose the most,
and starts it in that account's own sign-in and its own copy of the code. Everything finished lands through the merge
queue (T-2216, e804cc683). It replaces three things that each decide part of this today and disagree:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Recommendation, scrolls sideways" style="--tw:960px" markdown="1">

| Today | What it does | Goes |
| --- | --- | --- |
| tools/personal_tick.sh `take_now`, PERSONAL_EQUAL (T-1035) | splits the menu equally over the accounts at work | removed; the tick keeps only its session runner |
| tools/governor.py `api_pick`, `api_now_base` (T-1063, T-1230) | moves the main account's work onto API credits | removed; the dispatcher picks the source |
| PERSONAL_SLOTS clamp 1-3 (personal_tick.sh lines 123-124) and one work session at a time on the main account | <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> sessions by a fixed number | replaced by room-based concurrency, below |

</div>


What stays as it is: the Investors' switch for each personal account, PAUSE, the plan limits, an account's trip and its
auto-<span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> (T-2151), the Fable cap, the billing-mismatch alert, the runaway limit, the Investor-owned path look, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>
preflight, the keeper (session_holder.py), and the merge queue. The Operator keeps the inbox, the reports and the board in
the main checkout; those sessions are not dispatched tasks.

## Sources


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Sources, scrolls sideways" style="--tw:1166px" markdown="1">

| Source | Meter it reads (no new reading is taken for the dispatcher) | What expires | Eligible when |
| --- | --- | --- | --- |
| main plan | ops/usage.json `meter_points` (session_pct, week_pct, fable_pct and resets), budgets from `governor.py calibrate` | 5-hour window; week | 5-hour under the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> (90%), week under 100% less the governor's reserve, no rate-limit pause |
| personal account a, b, ... | ops/personal_meter/<id>.json (pct, resets), from the account's own tick reading | 5-hour window; week | its Investor switch on, not tripped, a reading under 70 minutes old, 5-hour under 90%, week under 100% |
| company API key | `governor.py api_status` (month cycle, weekly cap, reserve) | credits at the cycle's end | api_overflow on, key in the Keychain, room for one session (T-1230's gate) |
| key-a, key-b | `governor.py key_status` (balance, today's spend) | nothing, but the Investors said use them first (amendment 2026-11-04 10:32 PM) | key on, room for one session; never past what the key holds |

</div>


A source with a meter that is missing, stale or unreadable is not eligible. It fails closed and the log says why.

## The pick, per task

1. **Order the tasks** (T-2488, S2). From the runnable lines (`board.py lanes`, widened to every account): first P0,
   Investor-requested lines, and lines that block a product line; then pywidget work ([build], [fix], [test], [review]
   touching pywidget/); then [tools], [site], [ops]. Inside each group: priority, fewest tries, board order.
2. **Hold back overlaps.** A task whose named paths overlap a task already running waits for it. 31 of the 81 lane
   lands that failed since 11-01 were rebase conflicts (land_stats, 11-03 to 11-05).
3. **Filter sources for this task.** A line with Model: Fable goes only to a plan source with a Fable reading under its
   cap, never an API key. A line that needs the Simulator (land:xc, tools/xc.sh) also takes a place in the shared
   Simulator queue.
4. **Score each eligible source** by what it would lose: `left_usd / hours_until_it_expires`.
   - Plan sources: left = week room in dollars (week budget x (100 - week_pct) / 100); hours = until the week resets.
     The 5-hour window is a gate (room to start), not the score, unless it resets before the week does and its own
     loss rate is higher; then that is the score.
   - Personal accounts have no dollar budget yet: the main plan's calibrated budget per percent is used for each until
     two readings in one window calibrate its own (the same method as `calibrate`).
   - Company API credits: left = month room; hours = until the cycle ends.
   - key-a, key-b: scored first while they hold money (the Investors' "use these credits ASAP"); hours = 1.
   The highest score takes the task. A tie goes to a plan source, then the company key.
5. **Room for one more.** A source takes another session at once only while its room, less what its running sessions
   are expected to spend (the median work session cost in ops/usage.json `runs`), still pays for one session. On top,
   one machine cap, DISPATCH_MAX (start at 6; ten Simulators hit the process limit on T-1029), and one worktree per
   running session. A source with nothing to do is never held for a share: nothing waits on an account that isn't
   running.
6. **Start it.** The dispatcher claims the task (personal_claims.py) and starts the runner for that source and slot with
   the task list. It never starts anything inside a session.

## Runners

- **One session runner** for every source: the session half of today's personal_tick.sh (lock, preflight, claim, keeper,
  stream checks, run row, mark ready to land), given ` <slot> <tasks>`. It keeps each source's own sign-in: a
  personal account's own profile; the main plan's login; an API key through rules/api-settings.json and the Keychain as
  the supervisor does now (never in the environment, never Fable).
- **Every source works in its own copy of the code**: personal accounts in their worktrees as now; the main plan's
  work sessions move to worktrees of their own (company-personal/m, m2, ...), and API-key sessions likewise (k, k2).
  The main checkout is left to the Operator. All work lands through tools/merge_queue.py and personal_land.sh.
- **One launchd job** (`com.company.dispatch`, every 5 minutes, and at once when a session ends) runs `dispatch.py
  tick`. The two personal-tick jobs stop starting sessions; each account's 15-minute reading stays.
- The supervisor keeps the Operator's sessions (inbox, reports, board, sync, meter). For their billing it asks
  `dispatch.py pick --kind operator` (main plan or an API source, never a personal account), which replaces api_pick
  there too. T-2479's chain-at-once when credits run out becomes: the dispatcher picks again at once.

## Logs (raw evidence for the measure)

- ops/runs/dispatch.log: one line per decision: time, task, source chosen, each source's score or the reason it was not
  eligible.
- ops/metrics/dispatch_meters.jsonl: one row per reading the dispatcher used: source id, 5-hour and week percent, reset
  times. Percents and times only; no account details (rule 7).

## Build (one go, Odalys)

1. tools/dispatch.py with `tick`, `pick`, `explain` (each source's score now, or why it is not eligible), and tests/dispatch_test.py:
   ordering, overlap hold, Fable never on a key, personal off means never picked, stale meter means not eligible, key
   first, loss-rate pick, room-based concurrency, DISPATCH_MAX.
2. personal_tick.sh: cut `take_now`, PERSONAL_EQUAL and the slot loop; keep the session runner and the reading;
   generalise it to any source. Update tests/personal_* that test the cut parts (delete only what tests removed code).
3. governor.py: remove api_pick and api_now_base from the work path; keep meters, record, budgets, key_status,
   api_status. tools/supervisor.sh: work sessions go to the dispatcher; Operator sessions ask `pick`.
4. launchd: the dispatch job; the personal-tick jobs keep their reading only. Old plists archived, not deleted.
5. Anything in rules/ (rules/personal_lane.py, the lane flags) goes as a proposal under the 1:21 AM advance approval.
6. tools/dispatch_stats.py (below). Take the "before" numbers first, then switch on, all in the same session.

Uncommitted edits by other tasks sit in tools/supervisor.sh and tools/xc.sh in the personal/a worktree; build on main
and land through the queue.

## What would make this fail

- A bad meter sends everything to one account. Fail closed per source, and `explain` shows why each was passed over.
- More sessions at once means more rebase conflicts. The overlap hold is the first answer; if the land rate over the
  last 20 attempts falls under 40%, the dispatcher halves DISPATCH_MAX and logs it.
- One program is now a single point of stop. A running session keeps working its claimed task; launchd restarts the
  job; a dispatcher that fails three ticks in a row posts once to the supervisor's alert path. Rollback is one revert.
- Moving main-plan work into worktrees adds a land step. If the main plan's land rate is under 60% at the 48-hour
  check, its work sessions return to the main checkout by one setting.
- Lane a lost nine hours (4:27 PM 11-04 to 1:27 AM 11-05) to one refusal (profile stray, fixed in f15f0cc959). The
  dispatcher logs "eligible source, room, no session" hours, so the next such gap shows the same hour.

## How before and after are measured

tools/dispatch_stats.py reads only raw files and writes ops/metrics/dispatch_stats.json. Before: 2026-11-02 12:00 AM ET to
the switch-on time. After: the 7 days after it, read at +24 hours and +7 days.

1. **Share of each account's usage used before reset.** For each source and window, the last reading before the reset
   time changes. Main plan: ops/usage.json `meter_points` (week and 5-hour). Personal accounts: ops/personal_meter/<id>.json
   for before (one snapshot a window, so the before number is thin; said so in the result), dispatch_meters.jsonl after.
   API: dollars spent over dollars available, from ops/usage.json `api_days` and `api_key_days` and investors/billing.json.
   Report the mean share and how many windows ended under 80%.
2. **Tasks finished per day.** Board lines that turn from "- [ ]" to "- [x]" per ET day, from `git log -p` of
   ops/board.md on main, split product and other (S2's measure: the share of commits touching pywidget/).
3. **Landing rate.** tools/land_stats.py per day: landed over attempts and task sets; plus merge-queue drops. Before:
   11-03 to 11-05, 156 attempts, 75 landed (48%); 138 task sets, 74 landed.
4. **Idle hours.** Hours an eligible source had room and ran no session (dispatch.log after; for before, the tick logs'
   gaps).

The result goes on #41 at +24 hours and +7 days, the numbers as measured, good or bad.
{% endraw %}

</div>
