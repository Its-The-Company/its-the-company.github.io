---
layout: "default"
title: "T-3230 board prune, first slice"
section: "documents"
description: "Start: 512 open lines parsed from ops/board.md (445 open, 68 blocked on the ask). Method: the sweep table ops/sweeps/2026-11-06-t3177.tsv (Opus, each row with commit and reason) applied through tools/board_tick.py to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/board-prune-t3230.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/board-prune-t3230.md</code></span></div><h1>T-3230 board prune, first slice</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Start: 512 open lines parsed from ops/board.md (445 open, 68 blocked on the ask). Method: the sweep table
ops/sweeps/2026-11-06-t3177.tsv (Opus, each row with commit and reason) applied through tools/board_tick.py to
every row still open; then automatic notices (retry, "keeps coming back", "main refused a record", "account
stopped") dropped when every task they name is ticked or off the board; two more ticks checked by hand.
Ticks queue in ops/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox/ and reach the board when this branch lands.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:634px" markdown="1">

| Result | Count | Detail |
|---|---|---|
| Ticked done (work on main) | 47 | 45 from the T-3177 table (one commit each), plus T-3120 (1dc528dfb), T-1902 (669e0f50d) |
| Dropped (obsolete or covered) | 44 | 19 from the table (withdrawn or merged into another line), 25 notices whose tasks are all closed |
| Kept | about 421 | includes 40 notices that name a still-open task, all lines waiting on #90, #138, #141, dated waits, and anything unsure |

</div>


Skipped by order: T-2999, T-3190, T-3191 (running), T-3230 itself.
Not done: lines 121 to 512 of the title list were not judged one by one; the product lines (build, test, fix) with
partial commits on main need a read of their text against the code. T-0848 stop: none hit.
Follow-up: board line added, "T-3230 rest".

## Slice 2 (T-3305, Odalys, 2026-11-07)

Method: each line read against its own text, then against main (git log by task ID, `git merge-base --is-ancestor`,
`git cherry main <parked branch>`). Ticks and notes go through tools/board_tick.py only; they queue in ops/lane-outbox/.
When unsure, kept.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Slice 2 (T-3305, Odalys, 2026-11-07), scrolls sideways" data-n="4 5" style="--tw:1085px" markdown="1">

| Part | Looked at | Ticked | Dropped | Kept |
|---|---|---|---|---|
| (b) blocked lines whose date passed | 28 (no "waiting on #N") | 2 (T-0039 610626945, T-1042 19d5907ac) | 0 | 26 |
| (c) notices naming an open task | 47 (retry, keeps-coming-back, main-refused) | 0 | 0 | 47 |
| (a) [build] [test] [fix] with commits on main | 107 found, 24 read in full | 5 (T-1294 92b062d47, T-1114 9540d1245, T-1113 4856490b7, T-3173 c3076b75e, T-2056 654bf72e6) | 0 | 102 |

</div>


Total: 7 ticked, 0 dropped. (b) and (a) overlap on T-0039 and T-1042, so 7 distinct lines.

Why (c) kept all: `git cherry main` shows every named <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch still holds commits main lacks (or the branch is gone,
leaving the line the only record); the 6 "main refused a record" lines keep the only pointer to a failed lane file.
Why (b) mostly kept: the dates passed but the work is not on main (no commits, or only plan/notice commits), or a
part is still owed (device run, review, Investor ask).
Kept on purpose despite a commit: T-2264 (B5 test owed), T-2583 (waits for Pernille's re-review), T-1882, T-1861, T-2046
(mutant under load owed), T-1677, T-2097 (device read owed), T-3279 (runner run owed), T-1289 (part b open).

Stopped at: the (a) lines whose own commit starts with the task ID were read down to T-2583 (24 of 107 read in full);
about 80 lines whose commits are only reviews or board notes are unread (they rarely mean done). T-0848 stop: none hit.
Skipped by order: T-3305, T-2888, T-3152, T-3145. A line added by mistake with ID T-0000 was closed as a duplicate.
Follow-up: board line T-3382.

## Slice 3 (T-3230, Odalys, 2026-11-13)

Method: each "P0 redo of ..." chain followed to its original line; work judged on main by `git log main --grep`, the
code itself, and `git cherry -v main <ref>` for every parked and refs/archive ref. Parked-account notices classified the
way tools/park_stats.py does: a ref's waiting commits are those main lacks by patch (ops/ and log/ only commits left
out), each owned by the first T-#### in its subject; "spent" = none waiting, "done another way" = every owning task
ticked. Nothing deleted; every ref stays readable. Board changes through tools/board_tick.py only.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Slice 3 (T-3230, Odalys, 2026-11-13), scrolls sideways" data-n="3" style="--tw:1200px" markdown="1">

| Part | Looked at | Ticked done | Dropped/closed | Kept |
|---|---|---|---|---|
| 1. redo chains | 14 redo lines + 9 originals | 4 | 11 | 5 (T-3412, T-3735, T-3753, T-3990, T-3856) |
| 2. "Personal account stopped" notices | 57 | 0 | 35 | 22 |
| 3. T-2456 | 1 | 0 | 1 (new line T-4249 carries its one live note) | 0 |
| 4. old P0/P1 lines | 8 read | 0 | 0 | 8 |
| Total | | 4 | 47 | 35 read and kept |

</div>


### 1. Redo chains

- T-3418 <- T-4166: ticked T-4166 (T-3418 landed 08487e8a7b and was ticked; tests/site_t3418_test.py).
- T-3961 <- T-4167: ticked T-4167 (T-3961 landed 9b36836379 and was ticked; tests/site_session_view_test.py).
- T-3430 <- T-4170: ticked both. 8762d8a55f on main (search by number, category chips, site_home_t3430 55 pass,
  ops/site-checks/t3430/home-filter-1280.png); the parked ref's T-3430 commit is on main by patch.
- T-3230 <- T-3326: T-3326 dropped, copy of this task; T-3230 stays the live line.
- T-3753 <- T-4168: T-4168 dropped; bce9259a40 on main, land+gate patch still held, T-3753 stays live.
- T-3990 <- T-4169: T-4169 dropped; nothing landed (parked ref holds a stop record only); T-3990 stays live.
- T-3412 <- T-3538 <- T-3676 <- T-3787, and its split T-3508 <- T-3786 <- T-3804: all six dropped into T-3412, which stays
  live with a note. Item 1 (personal.js clocks) done on main by T-3746 622f3ba06b. Not on main: tests/site_t3338_test.py
  (browser read), tools/site/clock.py (prose converter). Refs to read: refs/archive/parked/b2/20261109-145042-q38,
  refs/archive/parked/a/20261109-183043-batch2.
- T-3735 <- T-3833 <- T-3952: both redos dropped into T-3735 (note added). Home has no Blocked list on main; ref to read
  refs/archive/parked/a/20261109-201057-25638.
- T-3127 <- T-3856: kept. T-3127 is closed; T-3856 is the one live line (half in 7d5571f8a8, rest waits on a patch).
- Unsure: T-3412 and T-3735 are P1 while the redos were P0 (T-3200 makes redone Investor work P0); left at P1.

### 2. Parked-account notices

Closed, spent (every change already on main): T-3455, T-3469, T-3601, T-3638, T-3744, T-4130, T-3840 (T-3791 still open on
its own line).
Closed, done another way (every owning task ticked; ref kept): T-3453, T-3457, T-3458, T-3459, T-3460, T-3462, T-3463,
T-3473, T-3590, T-3596, T-3598, T-3599, T-3605, T-3608, T-3609, T-3621, T-3637, T-3640, T-3642, T-3643, T-3645, T-3646,
T-3647, T-3649, T-3796, T-3839.
Closed, carried on: T-4159 (drafts on main, df20e409ae, documents/restructuring/work/), T-4245 (account a carried on from
parked/a/20261113-044745-82382 at 7:24 AM 11-13, ops/board_notes/T-4127.md).
Kept, work waiting for an open task: T-3456, T-3471, T-3593, T-3594, T-3595, T-3597, T-3600, T-3606, T-3610, T-3614,
T-3615, T-3616, T-3618, T-3620, T-3644, T-3650, T-4177.
Kept, unsure (no code waiting by the heuristic, but a named task is open or the subject names it second): T-3470 (T-3025),
T-3592 (T-2040), T-3648 (T-3177), T-3832 (T-2296), T-4231 (T-4228, pinned to an account).

### 3. T-2456

Dropped: builds 2 to 5 went to TestFlight (ops/testflight-internal.tsv), Investors agreed to archive it (an Investor #41
c6811975662). Its last note (Operator 11-12: build once with the gate flag before the next cut; Pernille's L4 in
pywidget/docs/reviews/t3814-pernille.md) was on no other line, so it moved to new line T-4249 (Idris, P1).

### 4. Old P0/P1 lines, oldest first (read, all kept)

- T-1030, T-1248, T-1995, T-2447, T-2449: every ref they name still holds code for an open task (git cherry).
- T-2052 (P0, report on time): not met. report_lateness.py n=6 to 11-13 06:00: median 25.2 min late, max 227.6, 2 of 6
  within 15 min.
- T-1062: report half not on main (11-09 note stands).
- T-2076: unsure; site moved on since 11-04 and its parked code conflicts; needs its owner's read against the four
  questions, not a prune.

Skipped by order: T-4127, T-4161 and what they name, pinned lines, claimed T-0675/T-4240, lines waiting on #90/#138/#141.
Not reached: the rest of the P0/P1 lines before 11-06 (about 60, mostly [build] product lines, Idris).
T-0848 stop: none. Two board_tick format refusals (an ID with no gloss; an unlinked ID in a new line) were format checks,
fixed and re-run.

## Slice 4 (T-3230, Odalys, 2026-11-13)

Method: every open P0/P1 line with an ID before T-2930 (created before 11-06; IDs of 11-05 11:00 PM to 11-06 2:00 AM ET run
T-2918 to T-2927) listed by script from ops/board.md: 70, of which 4 were judged in slice 3 (T-1030, T-2052, T-1062,
T-2076) and 0 are pinned, claimed, waiting on #90/#138/#141 or named by T-4127/T-4161. Each of the 66 screened by its own
commits on main (`git log main`, subject starting with the ID) and by a mention in documents/restructuring/ (only T-0680,
which decides nothing for it); 36 read in full with their notes against main. Board changes through tools/board_tick.py.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Slice 4 (T-3230, Odalys, 2026-11-13), scrolls sideways" data-n="3 4" style="--tw:778px" markdown="1">

| Part | Looked at | Ticked | Dropped | Kept |
|---|---|---|---|---|
| P0/P1 before 11-06 | 66 screened, 36 read | 0 | 2 | 64 |
| P2 before 11-03 (IDs before T-1240) | 39 listed, 8 read | 0 | 0 | 39 |
| Six unsure from slice 3 | 6 | 0 | 0 | 6 (T-2076 settled as kept) |

</div>


Dropped:
- T-0067 (site additions page, last part Unrelated mode): its child T-0068 was archived 11-11 11:02 PM by the queue audit
  (log/board-archive-open.md) and the Investors agreed to archive this line (an Investor #41 c6811975662).
- T-0757 (hand-install a signed build on the Investors' iPhone): done another way, TestFlight internal builds since 11-06
  (ops/testflight-internal.tsv, build 2 exit 0 at 9:47 AM ET 11-06); the Investors reported on build 4 (#41 c6725543994).

Notes added, kept:
- T-2844: runner check-in 7:01 AM ET 11-13 shows runner_version 27, xc-build, build approved, nothing pending; the one
  build job on the MacBook is still owed (no build job in ops/jobs).
- T-2346: company half on main (fe1d08ad55, T-2484); tools/guard_base.py has no KEEPS_APPLIER_DIFFS, so the Investor
  guard change is still owed; T-3313 waits on it.
- T-2076: settled. #170 closed 11-04 with A on all six; Q1, Q2 on, Q3-Q6 off on main (tools/site/switches.py); Q6 built
  but off. Still wanted. T-2074 waits on Q6 (T-3336's tick named commits that never reached main by ancestry).

Kept after a read, why:
- Leads that did not hold: T-1677 (T-1732's "landed by" is another task written in lane a as T-1677), T-2583 (Pernille's
  re-review f02a4a694b says fix first), T-2196 (the main commit only adds the line; needs a phone), T-0299 (waits on
  T-0801 [b] and T-0802 open), T-2561 (xc_mutants.py still prints KILLED on a timeout), T-1069 and T-1422
  (tools/personal_land.sh still runs from the supervisor and still removes the xcodebuild logs).
- T-0191: its 3-and-9 split is superseded (T-2372) but T-2268 is defined as "the rest of T-0191's Done"; dropping it
  would drop that definition.
- No commits of their own on main (46 kept lines, nearly all Idris's app features: Shortcuts, editor, widget extension, gallery,
  premades, refresh): unbuilt, still in the plan; the Restructuring proposes but adopts nothing without "approve".
- Lines with partial commits (T-1440, T-0656, T-0657, T-0866, T-2268, T-2491, T-1643, T-2551, T-0956, T-0043, T-2296):
  their latest note says what is still owed, and the merge resets of 11-10 put their parked work back to 'to do'.
- Dated decisions: T-0795 (background refresh strike check at Day 24, 11-14), T-0793 behind it.
- Five parked-account notices (T-3470, T-3592, T-3648, T-3832, T-4231): every task they name (T-3025, T-2040, T-3177,
  T-2296, T-4228) is still open; no new evidence. T-4231 is also pinned to an account.
- P2 read: T-0352, T-0942, T-0960 (need an Investor-owned change), T-0781 (runner re-install), T-0479 (a device check;
  board_stale's "parked work on main" proves nothing for it), T-0851 (Investor ask c6539190636), T-1065, T-1066 (bugs
  still in the scripts' text per their lines; not re-checked line by line).

Remaining: 107 open lines older than the cutoffs: 68 P0/P1 before 11-06 (slice 3's 4 included) and 39 P2 before 11-03.
Most are unbuilt app work that is still wanted, so a prune cannot empty this set; the rest need their owners. T-3230 stays open; no #41 post. T-0848 stop: none.
{% endraw %}

</div>
