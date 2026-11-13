---
layout: "default"
title: "efficiency review addendum comment"
section: "documents"
description: "T-4124 efficiency review, addendum (Ines, Fable on account b, 11:27 to 11:50 AM ET 11-13). It adds to the 11-12 review (c6815886776) and does not replace it. Full text: the dated section at the end of\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/efficiency-review-addendum-comment.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 23 · Fri Nov 13</span><span><code>ops/plans/efficiency-review-addendum-comment.md</code></span></div><h1>efficiency review addendum comment</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-4124 efficiency review, addendum (Ines, Fable on account b, 11:27 AM to 11:50 AM ET 11-13). It adds to the 11-12 review (c6815886776) and does not replace it. Full text: the dated section at the end of ops/plans/efficiency-review.md. Every count names its script; the seven scripts are ops/plans/T-4124-*.py. "The week" is 11-05 to 11-12. "Since" is 12:00 AM 11-12 to 11:30 AM 11-13: a day and a half, mostly plans and documents, so its numbers show direction, not a settled rate.

**Three corrections to my 11-12 numbers, first.**
1. Record-only commits were 53% of the week (1,805 of 3,400), not 60%. I did not keep the first filter as a script. The other rows reproduce. The ranking does not change.
2. A thin Operator saves less than the "up to half" I wrote. That was tokens read in one session. By cost, the usage ledger puts the Operator's own share at 13.5% of the week's measured work runs.
3. I wrote that 21 test suites hit the 30-minute limit and lost 10.5 hours. I misread the file: it was one run, cut once, written on 18 rows. The loss was 30 minutes. I withdraw the 900-second limit I recommended; it would have failed a run that passed honestly at 1,279 seconds. A note on T-4103 says not to build it.

**1. The faster path for a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s board changes and records** (your 1:55 AM 11-12 ask)

Today a lane's tick, note, hold or event waits in a queue on its branch and is replayed on main when the branch lands. New lines already go to main at once (since 3:07 AM 11-07, your #211 ask).

Measured lag, from a record's write to its replay on main (main's git history; the write time is in each record's file name):
- The week: median 5.1 hours a landing; a quarter over 33 hours (196 landings, 577 records).
- Since 11-12: median 21 minutes a landing; a quarter over 73 minutes; longest 21.4 hours (59 landings, 362 records).
- Any other file a lane commits, from its commit to main (main's reflog): median 9.9 hours a landing in the week, 71.2 hours where the landing carried app code; 9 minutes since.
- Still waiting: 227 records on lane or <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branches have never reached main, 163 of them older than 7 days. They belong to the parked work the queue audit is judging.

The lag is the wait in the land queue, not the records. With a backed-up queue, records waited hours to days. With a short queue, minutes. Measured harm: 49 of 988 records (5%) were refused by main or were ticks main already had.

Options, ranked:
- **Recommended: build nothing, and keep the land queue short.** What exists covers a short queue. Saves: nothing to build, test or keep. Risk: the lag comes back with the queue when app work returns at volume. Guard: I re-run the two scripts on 11-20 (T-4283).
- If the median passes one hour a landing on two days running: let notes and holds go to main at once, as new lines already do. Same tool, same lock, no new part. Saves the notes' lag (median 194 minutes a note in the week, 26 since). Risk: a note on main about work still on a branch.
- Not ticks at once. Main would show work as done before it is on main.
- Not a separate channel for records. It is new machinery in two pipeline files; your 11:01 AM "no special infrastructure" applies.

**2. Usage outside the workers ("No task ID")**

The company account, measured (ops/usage.json, 400 runs, 10-23 to 11:21 AM 11-13, list-price basis):
- Inbox runs: 81, $26.69. Morning, evening and weekly reports: 41, $37.82. Nothing to save.
- The Operator's own share of work runs: 13.3% over 258 measured runs ($930.23 of $6,987.23); 13.5% in the week; 16.7% since 11-12 (10 runs).
- All "No task ID" use in the ledger: $1,023.52, 14.2%.
- A work run cost $33.54 on average in the week and $47.16 since; the Operator's part of it $4.54, then $7.88.

The personal accounts, counted but not costed (the lane tick logs): 221 lane sessions, 205 hours and 54,267 model replies in the week; 58 sessions and 30 hours since. No readable record holds their cost, their tokens or their Operator's share. The plan meters at 11:30 AM: account a's week at 95%, account b's at 70%, the company account's at 90%. Since 11-12, 128 of the 151 ticks that started no lane session were stopped by a usage limit, not by the process.

Typed sessions leave no record of their own. The meter check (tools/unowned_usage.py) flags 14 stretches, all from 12:22 AM to 8:55 AM on 11-10: 134 points of the company account's 5-hour meter with $0 in the ledger. It cannot say whose use it was. That is about $420 at the ledger's own estimate of a 5-hour window: an estimate, not a measurement. The record for typed sessions (#266, T-4222) waits on the settings commit at the Mac mini.

An offer, not built: the tool that already prints each lane session's counts into the tick log could print one more counts-only line (cost, token totals, the Operator's share of replies). It would turn the largest block of usage from unknown to measured. Say so and it goes on the board.

**3. The ten items of 11-12, a day and a half on** (the week, then since)

1. Records committed one at a time: **open**. Designed in T-4122; the build, T-4103, waits on T-4100. Record-only commits 53.1%, then 39.0% (258 a day, then 167). The drop is the mix of work, not a change in how records are committed.
2. One task per line for app work: **under way**. 14 feature lines, 194 step lines linked to one. The launcher feature (T-4185) is the first trial: 15 steps ticked, reviewed in 2 group reviews. The feature-session tools were unblocked at 11:29 AM today, on this lane's branch. No count of sessions per feature yet; T-4223 reads a week on 11-19.
3. Checks on work that does not merge: **partly**. Gate suites per change 7.0, then 5.6. MacBook land checks not green 26%, then 25%. T-3974 is still open.
4. The Operator's own context: **open**, and smaller than I said (correction 2). The work prompt grew from 30,167 to 30,419 bytes.
5. Retry, redo and "look" lines: **partly**, by the audit's removals. Retry lines 111 of 670, now 72 of 564. Send-backs 59 a day, then 30.
6. A review line for every change: **open**. Open review lines 80, now 76. The Handbook note is mine and not written.
7. Xcode runs: **open**; waits for the feature session. Failed builds with no test run: 7 of 28 runs, then 12 of 32.
8. Simulator and disk: **worse**. Simulator devices 32 GB, now 38.6 GB. Scratch 19.9 GB, now 28.1 GB. 16.7 GB free on the internal disk at 11:43 AM; the disk guard closes at 10 GB (ops/disk.json).
9. Memory committed per task: **open**. 84 memory commits a day, then 61.
10. Process tools that serve the process: **under way** through the audit. Open lines 682, now 584; open [tools] lines 275, now 217. No freeze has been called; it is still yours.

Nothing built since 11-12 accounts for the better numbers. The plans exist; the builds wait on T-4100 and T-4103.

New, ranked into the list:
- After item 4: the personal accounts carry most of the sessions and none of the cost record (section 2).
- Inside item 8: the disk. It is the item most likely to stop work this week. Odalys's open disk lines hold it.
- Last: the records' lag (section 1). Minutes today.

**4. What relies on a Restructuring decision**

- Which new feature lines exist. The tab shell and first run **wait on Restructuring decision 17**. The Builder's block editor, code view and custom block **wait on Restructuring decision 18**. What Settings and Pro (T-4190) must hold **waits on Restructuring decision 9**. All left undecided. The 14 feature lines stand (decision 11, answered).
- Withdrawn: my 11-12 line to delete the iPad Simulator device. Decision 27, answered at 11:26 AM today, makes the Simulator the iPad proof for now. The devices left to delete hold 5.2 GB, not the "about 15 GB" I wrote.
- A freeze on process tools would not touch the documentation step of decision 29 (answered at 11:24 AM today).

**Dates.** T-4122's targets rested on a freeze on 11-30 that decisions 1 and 2 removed. I move them: the card and its replay test by Monday 11-16; the sweep on by Wednesday 11-18; the grouped iPhone run on by Friday 11-20 and measured to 11-27. What would make these fail: the weekly limits on the personal accounts, and the disk.

**Not measured:** a lane session's cost and its Operator's share; a typed session's cost; the effect of the land fixes of 11-10 to 11-12 apart from the mix of work.
{% endraw %}

</div>
