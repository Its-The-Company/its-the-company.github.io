---
layout: "default"
title: "Fixes for the account and session drawbacks, and the unified-session question (T-4305)"
section: "documents"
description: "Recommendation: keep the shape, build one small thing, decide one thing, and do not build a unified session. Build the cost line for personal sessions (fix 4, T-4314). Decide the spillover guard change (#303; I\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4305-account-session-fixes.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/T-4305-account-session-fixes.md</code></span></div><h1>Fixes for the account and session drawbacks, and the unified-session question (T-4305)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-13, on account a (<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a2), part of the queue audit (T-4092). Asked by an Investor on #41 (c6861038070,
1:08 PM ET 11-13) in answer to the company's reply c6860917437, which lists the six drawbacks. Pipeline facts are from
Odalys's plans and the tools' own headers: [`one-coordinator.md`](one-coordinator.html), [`one-dispatcher.md`](one-dispatcher.html), `personal-subscription-lane.md`.
She did not review this memo. It builds on [`sessions-main-vs-lanes.md`](sessions-main-vs-lanes.html) and [`efficiency-review.md`](efficiency-review.html) (addendum A.1, A.2)
and does not repeat them.

**Recommendation: keep the shape, build one small thing, decide one thing, and do not build a unified session.**
Build the cost line for personal sessions (fix 4, T-4314). Decide the spillover guard change (#303; I recommend dropping
it). Leave landing as it is, with its re-read on 11-20. The start delay gets a small fix at low priority (T-4315).

Benefits every fix must keep: parallel accounts, separate limits, isolated branches, fast replies.

## How it was measured

`python3 ops/plans/T-4305-measure.py <main checkout>` (read-only, no Claude), plus the efficiency review's scripts
`T-4124-outbox-lag.py`, `T-4124-land-lag.py`, `T-4124-lane-sessions.py` and `tools/land_stats.py`, `tools/land_why.py`
on the main checkout's logs. "The week" is 11-05 to 11-12. "Since" is 12:00 AM 11-12 to 2:00 PM ET 11-13: 38 hours,
mostly audit and document work, so it shows direction, not a settled rate.

## The six drawbacks


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The six drawbacks, scrolls sideways" data-n="1" style="--tw:1640px" markdown="1">

| # | Drawback, measured | Fix that keeps every benefit | Measured gain | Cost | Waits on the Restructuring? |
|---|---|---|---|---|---|
| 1 | **Work waits to land.** Since: a lane's commit reaches main in a median 10 min a landing (95 landings; 22 min with code, n=30; 15 over an hour); a queued record in 23 min (62 landings). The week: 9.9 h and 5.1 h. 76 of 85 land attempts passed (89%; 7 code conflicts, 2 red). A land's own run: median 0.2 min on 11-12. | **Build nothing.** A finished task already lands at once, mid-session (T-1192) and at the session's end with no wait for the clock (T-0951). The lag is the queue's length. Keep the queue short (new work stops at 12 tasks waiting to merge, T-3993) and re-read on 11-20 (T-4283). The trigger stands: a median over one hour on two days running sends notes and holds to main at once (A.1 option 2). | None to take at today's lag. The trigger would save the notes' lag (194 min a note in the week). | None. | **Partly.** The lag returns when app work returns at volume. Which app features exist waits on decisions 9, 17 and 18. The re-read does not wait. |
| 2 | **No spillover.** The main account sat at 100% of its week for 13.7 h (12:18 PM 11-07 to the 2:00 AM reset on 11-08). In the week, at least 11.1 h with the main account out and a personal account with room (80 of the 168 h had no fresh reading). In those 13.7 h, 46 of 47 answered Investor messages were answered by lane sessions (median 65 to 137 s on five lanes, 1,040 s on a3), and the 9 main work runs were billed to API credits. Each account read 100% at its last weekly reset. | **Already on the board, stopped at the guard:** T-3371 then T-3365 (an Investor "A" on #222, 11-07): the supervisor may start the main session on any account. The first guard change (#225) reverted itself on 11-08. | Small today. Lanes already take the board's tasks and the replies when the main account is out. A lane can now record a <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (T-3426), which was the stuck work T-3365 names. When every account uses its whole week, moving the main session adds no work. What still waits: the reports (T-1062 has them, open) and the main session itself. | A loosened security guard (the Investors' file), a second way to start a session on a personal account, half-built patches on archived refs. | No. **Needs the Investors: <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #303.** I recommend dropping it. |
| 3 | **Every session starts cold.** On the main account a work session spends, before its first hand-off, a median 14 Operator calls, 1.6 min and $0.74 at list price: 1.9% of those runs' cost (59 streams, the week); since: 30 calls, 3.2 min, $1.20, 2.3% (10 streams). The first call writes a median 25,000 to 40,000 tokens to the cache and reads 11,000 from it. Starts: 78 main work runs and 221 lane sessions in the week; 9 and 65 since. A lane's start cost is not recorded (row 4). A lane reads the 10.1 KB lane prompt, not the 30.4 KB work prompt. | **Fewer starts, not warmer ones; nothing new.** A session takes its next task from its menu instead of ending (exists). Main sessions already run longer (mean 84 min in the week, 168 since). Trim the work prompt inside T-4122's prompt form. Not: resuming an old session, which carries its whole context forward; the Operator's context (median 136,000 tokens, efficiency review 2.4) is the larger cost. | At most the 1.9% to 2.3% above on the main account. On the lanes: unknown until fix 4. | None new. | **Partly.** One session per app feature (T-4122) cuts starts for app work; new feature lines wait on decisions 9, 17 and 18. |
| 4 | **Personal sessions' cost isn't recorded.** 221 lane sessions, 205 h and 54,267 model replies in the week; 65 sessions since. No cost, no token count, no Operator share. The main account's 78 work runs (109 h) are fully costed ($2,200). | **One counts-only line** from the tool that already prints each lane session's counts (`tools/personal_stream_shape.py`): the stream's cost and token totals and the lane Operator's share of replies. Numbers only, nothing of a stream's text. **T-4314.** | About two thirds of the week's session hours (205 of 314) go from unknown to measured. It also sizes row 3 and the Operator's share on the lanes, which the unified-session question turns on. | One line in an existing tool and its test. No new part. | No. |
| 5 | **Up to 15 minutes' start delay.** A lane's tick runs every 15.7 min (median). From a slot's session end to its next start with nothing but the clock between: median 9.1 min (n=19, since), 11.0 (n=6, the week). With its own branch landing first: 25.9 min (n=21), 13.2 (n=178). Held by a limit, pause or stop: 251 min (n=18), 155 (n=33). The main account already starts its next tick at once; its 9.7 min between sessions (n=8) is upkeep jobs, not the clock. | **Give the lane tick what the main one has:** when a lane session ends and work waits, the same tick asks the dispatcher again at once, bounded as the supervisor's chain is. Same job, no new launchd job, no sign-in. **T-4315.** The larger form, the dispatcher's own 5-minute clock (T-2677), stays where it is: it needs an Investor to load a new job. | About 9 min a start in the back-to-back case (19 of 59 gaps since). No extra work in a week where every account reaches its limit: it is waiting time, and the limit is the far larger wait. | A change to one pipeline file (`tools/personal_tick.sh`), for the audit session. A chain can loop, so it carries a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. | No. |
| 6 | **Coordination machinery.** Replies: 416 in the week and 129 since, none answered twice. Claims: 463 messages claimed in the week, 1 changed holder; 129 since, 4 changed. Reply time, median: main 69 s and 64 s; account a 92 and 102 s; account b 86 and 79 s. Files in use, since: 310 hold lines on 24 tasks, a task held a median 22.5 min. The week: 13,566 hold lines on 360 tasks, median 341 min, 7,299 of them on one shared retry file during the merge backlog. | **Keep it.** With sessions in parallel, one claim a message and one holder a file are what prevent double replies and conflicts, and the records show they work. Removing either gives up fast replies or parallel accounts. The backlog's holds went with the backlog. | None to take. | Its upkeep: four pipeline files of 1,400 to 3,100 lines each. | No. |

</div>


## One unified session for all accounts: no

**It is not possible as asked.** A Claude Code session signs in from one configuration folder, chosen when it starts:
"give each account its own configuration directory. When you start `claude`, set the `CLAUDE_CONFIG_DIR` environment
variable to the directory for the account you want to use" and "a session with a different `CLAUDE_CONFIG_DIR` reads a
different entry" (code.claude.com/docs/en/authentication.md, fetched 2026-11-13). Workers inside a session cannot
change that: "Subagents work within a single session" and each "sends its own requests, which count toward the same
usage limits as your main conversation" (code.claude.com/docs/en/sub-agents.md, fetched 2026-11-13). The fields a
worker definition accepts name a model, tools, effort and the like; none names an account. Our records agree: a lane session's
log is one stream with its workers' replies inside it (account a, 1:44 PM ET 11-13: 37 Fable and 81 Opus replies in
one session), and this task ran as a worker inside account a's session, on account a's limit.

**The only workaround is a session that starts the other accounts' sessions**, each a separate Claude Code process on
its own folder. Three things are wrong with it:

1. *It is refused today, on purpose.* The Investor-owned guard refuses a session that points Claude Code at another
   profile, and a lane does not start unless the guard refuses exactly that (`rules/personal_lane.py`, `guard_cases`).
   T-3365 stopped at the same wall on 11-07.
2. *It keeps four of the six drawbacks.* The started sessions are still separate sessions: each starts cold, works on
   its own branch, lands through the same queue and needs the same file claims, and its cost is still unrecorded
   (drawbacks 3, 1, 6 and 4). Only the inbox claims go.
3. *It puts a model where a script is.* Today a script with no Claude (the dispatcher and each account's tick) decides
   which account runs which task. A session doing that job spends one account's allowance to do it, and when that
   account is out, every account stops. The main account was out for 13.7 hours last week. That is drawback 2 made
   total: a single point of failure.

**What it would gain, measured where we can:** one Operator in place of one per session. On the main account the
Operator's own share is 13.5% of a work run's cost in the week and 16.7% since (addendum A.2). On the personal
accounts it is not recorded (fix 4). Replies from a warm session are faster: the main account's median is 64 to 69 s
against 79 to 102 s on the lanes.

**What it would cost besides the three points:** context. The Operator already runs at a median 136,000 tokens of
context for one session's workers; one session holding three accounts and up to seven sessions' reports would end
for size more often, and each restart is a cold start for everything. The one-session lock (`ops/.lock`) would hold
every account's upkeep behind it.

**The useful part of the idea is already written down, and it is not one session.** [`ops/plans/one-coordinator.md`](one-coordinator.html)
(Odalys, 11-07; T-3302) keeps one coordinator for the inbox, the board, plans and reports, and has the dispatcher, a
script, start plain worker sessions on every account. The queue audit kept T-3302 with a flag: its before numbers are
from 11-04 to 11-07 and must be re-measured before anyone builds it. Its largest measured losses were upkeep jobs between
sessions and land checks inside the tick (its steps 1 and 2), not the lack of a coordinator. I would not build it now. The re-measure belongs after the audit, with fix 4's
numbers in hand.

## What goes on the board

- **T-4314** (new, Odalys, P1): the counts-only cost line for lane sessions.
- **T-4315** (new, Odalys, P2): a lane's next session starts at once when one ends and work waits.
- **T-3371, T-3365**: wait on Urgent Request #303.
- **T-4283** (the 11-20 re-read): a note to run `T-4305-measure.py` as well, so the spillover hours and the start gaps
  are read again with the landing lag.
- Nothing new for rows 1, 3 and 6.

## What relies on a Restructuring decision

The Restructuring's 29 decisions are about the app, not about accounts or sessions, so no fix here is one of them and
none waits on one to be built. Two measurements depend on which app work exists: the landing lag under app work at
volume (row 1) and starts per app feature (row 3). Both wait on decisions 9, 17 and 18 (c6854106654).

## Not measured

A lane session's cost and its start cost (fix 4 closes it). Whether the better landing numbers since 11-12 come from
the land fixes or the mix of work (the addendum says the same). The meters have no fresh reading for 80 of the week's
168 hours, so the spillover hours are a floor.
{% endraw %}

</div>
