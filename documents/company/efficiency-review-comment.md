---
layout: "default"
title: "efficiency review comment"
section: "documents"
description: "T-4124 efficiency review (Ines, Fable on account a, 12:37 AM to 1:0x AM ET 11-12). Full review, with the source and method of every number: ops/plans/efficiency-review.md."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/efficiency-review-comment.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/efficiency-review-comment.md</code></span></div><h1>efficiency review comment</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-4124 efficiency review (Ines, Fable on account a, 12:37 AM to 1:0x AM ET 11-12). Full review, with the source and method of every number: ops/plans/efficiency-review.md.

**The shape of the week.** 3,383 commits 11-05 to 11-12: 282 (8%) touched the app, 520 (15%) tools and tests, 2,129 (63%) ops/. 2,024 (60%) changed only records (board, events, worker memory, metrics, run logs). Of 3,457 finished tasks, 1,150 are [tools]; of 682 open, 275 are. The process has become most of the work.

**Ranked: what can go or change**

1. **Records committed one at a time onto main.** 60% of commits are record-only; main moved 491 times on 11-08/09, mostly bookkeeping; 3.4 of 16.5 lock-hours that day were test runs thrown away because main moved under them. Change: one records commit per supervisor tick (every 15 minutes) instead of about 290 a day. Saves up to 3.4 lock-hours a day. Risk: the board lags by up to 15 minutes. T-4122 with Odalys.

2. **One task per board line for app work.** 847 app tasks since 10-29, median 1 commit, 59% exactly one. Each line pays a fresh session (first call 24,298 tokens, re-read on about 96 calls, about 2.3M of a thread's 4.86M context tokens), its own checks (host suites 280 s, unit target 134-189 s, MacBook land job median 383 s with 36% not green), a merge try at a 24-46% landing rate, and a wait (built to merged median 30.9 h all time, 9.1 h since 11-09). Change: feature umbrellas with a commit per step (T-4116). Saves per ten lines folded: nine session starts, nine land checks, nine merge tries, nine waits. Risk: a red at the end of a bigger diff; the commit per step keeps it bisectable.

3. **Checks on work that then does not merge.** 12.9 of 16.5 lock-hours on the measured day; the main gate ran 1,493 suite passes in 4 days, 7 suites per change, app host suites 287-680 s each; 21 suite reds hit the 1,800 s limit, 10.5 hours lost in 4 days. Change: check once per batch, gate on the batch, suite limit 900 s, and T-3974's take-the-next-finished fix. Risk: a red batch needs a bisect. Odalys and T-4122.

4. **The Operator's own context.** One 2-hour work session: 774 model calls read 79.6M context tokens; the Operator's own 269 calls at a median 136k context read 35.6M (45%), five worker threads 24M between them; 372 Bash calls, 5 hand-offs. Work runs cost $26.70 each on list basis, $2,085 for 78 runs in 7 days. The work prompt is 30 KB, about 12,600 tokens a session. Change: a thin Operator that hands out reading and building (a packet is 1,250 tokens) and a trimmed prompt. Saves up to half the company-account tokens of a session like this one. Risk: a forgetful Operator; ops/state.md carries state. T-4122.

5. **Machine-made retry, redo and "look" lines.** 111 of 670 runnable lines mention a retry; 18 are owned "Look"; 430 send-backs and 210 resets; 20% of 1,777 tasks needed two or more tries. Change: re-queue the same branch through the ledger's merge pointer instead of writing a line. T-4092, T-4100/T-4103, T-4122.

6. **A review line for every change.** 320 finished [review] lines, 134 on tools, tests or site, which Commandment 13 does not require; 80 open, 9 on the app. Change: review sessions only for app code headed to TestFlight; tests guard the rest. Saves about four in ten review sessions. Ines, T-4122.

7. **Xcode runs.** 1,741 runs, 48.8 build-hours; 33% were failed builds with no test run; 76% of test runs executed 5 tests or fewer (median 1), each a full launch; 6.2 hours waiting on the lock. Change: one build per feature session, then test-without-building per step. T-4116, Idris.

8. **Simulator and <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> disk.** 32 GB in 15 devices; four little-used ones (iPad Pro 11-inch, 4 runs; a per-task clone; iPhone Air, 2 runs; a check device) hold about 15 GB. Scratch 19.9 GB. 189 lane worktrees, the six sampled at 2.2 GB each. Change: delete those devices and the worktrees no slot uses. Odalys.

9. **Memory written and committed per task.** 580 commits in 7 days touch a worker memory file (17%); each call reads 1,552 tokens of memory (3% of a thread). Change: write only a lasting lesson, with the task's own commit. T-4122.

10. **Process tools that serve the process.** See the shape above. Change: a freeze on new process tools unless an Investor asks or a measured number names the saving; the T-4092 ledger removes open [tools] lines that do not serve the app. The freeze is yours to call.

Measured and found cheap, so they stay: the per-call hooks (0.01 s each), tool latency (under 2.2 s), lane slot idle (fixed 9:00 PM ET 11-05), the silent hours of 11-06/07 (the weekly limit, not the process).

**Direct answer 1: is passing tasks to named workers useful, and the slicing?** Yes to the structure, no to the slicing. In the session measured, the Operator's own calls ran at a median 136k context; a worker's start at 25k with a median peak of 87k. Work done inside the Operator's thread costs more per call than the same work in a fresh worker, and the Operator already takes 45% of a session's tokens with 5 hand-offs. The hand-off overhead is a 1,250-token packet, a done-note, and a median 8-minute gap from done to next start (n=6). Keep the hand-off; make the Operator hand out more and read less. The waste is the slicing: a session start costs about 2.3M context tokens over a thread's life for the fixed prompt alone, plus a check, a merge try and a wait per line. T-4116's umbrellas are the right change.

**Direct answer 2: do names and personalities cost anything measurable?** A little, and it is small. The six persona files are 1,941 to 4,381 bytes, about 800 to 1,800 tokens: 3-7% of a worker's first call, about 2% of a thread's context tokens because the first call is re-read on every later call. Wall-clock time: nothing measurable. Simulator disk and Xcode runs: zero. The memory file (3% of a thread, 580 commits a week) and the rules block (3,811-4,700 tokens) cost more than the name, and a nameless worker still needs a role and rules, so dropping names saves under 2% of worker tokens and 0% of the other three. Claude Code's own base prompt is 16,500 tokens, 68% of a first call, and only its tool list is ours to cut. The names stay.

**Not measured, and the cheapest way:** the lane sessions' own tokens (their streams sit in the account folders, refused by design; export counts and sizes only); the sum of 189 worktrees on disk (one `du` in the disk keeper's log); real plan usage in dollars (your meters).

T-4122 takes in items 1, 2 (line form), 3 (gate per batch), 4, 5, 6 and 9; T-4116 items 2 and 7; Odalys 3 and 8; Ines 6 and 10. A note on T-4122's line (queued from lane a, on the board when this branch lands) points to the file.
{% endraw %}

</div>
