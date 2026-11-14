---
layout: "default"
title: "T-4099: the active read, the lane list, the merge line, and the link flags against dispatch"
section: "documents"
description: "400 lines are offered to the lanes, 3 more are claimed, 37 are held by their typed Links. By the ledger&#x27;s last row: 270 keep, 109 remove, 8 tick, 5 merge, 6 rewrite (5 applied), 2 with no row."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4099-flag-check.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 24 · Sat Nov 14</span><span><code>ops/plans/T-4099-flag-check.md</code></span></div><h1>T-4099: the active read, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> list, the merge line, and the link flags against dispatch</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by Ines, 2026-11-14 12:5x AM ET, lane a (personal/a at c3db19c527; main moved to 9ab6cbe2af during the
read). Slice 5 of the queue audit (T-4092, ops/plans/queue-audit.md). Every count below comes from a script kept
beside this file: `ops/plans/T-4099-active.py`, `ops/plans/T-4099-rows.py`, `ops/plans/T-4099-flags.py`. Their live
inputs were read between 12:39 PM and 12:46 AM. This note is a record, not a plan: nothing here keeps work open.

## 1. The lane list (`tools/board.py lanes`)

400 lines are offered to the lanes, 3 more are claimed, 37 are held by their typed Links. By the ledger's last row:
270 keep, 109 remove, 8 tick, 5 merge, 6 rewrite (5 applied), 2 with no row.

- 122 of the 400 are lines the audit has judged to leave the board (109 remove, 5 merge, 8 tick), not applied yet.
  A lane can still be handed any of them. On the whole board 128 open lines are judged to leave; after this slice
  6 of them are active (T-3705, T-3871, T-3879, T-4177, T-4297, T-4298), so the apply (T-4101) is free to take 122.
- 113 offered lines carry no priority (the list prints `P?`): the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>-work notices and the review lines the
  land writes. Dispatch reads them as P2.
- 18 offered lines are active now (a copy with unlanded files, or a ref on the merge line). The lane list leaves
  out claimed lines only, so a lane can be dealt a line whose work sits unlanded in another worker's copy.

## 2. The merge line, the parked records, the sent-back records

Read from the main checkout: `tools/parked_count.py` (4 tasks, 0 held markers, 4 waiting refs) and
`tools/sent_back.py queue` (4 tasks). They agree.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. The merge line, the parked records, the sent-back records, scrolls sideways" style="--tw:882px" markdown="1">

| ref | task it is filed under | lane, place | state |
|---|---|---|---|
| parked/a2/20261112-100216-61572 | T-3990 (with T-4149, T-3430) | a2, held | sent back 10:02 AM 11-12: rebase conflict in handbook/rules.md |
| parked/b2/20261112-101344-30912 | T-3996 | b2, place 2 | never sent back |
| parked/b/20261113-115317-78908 | T-4240 | b, place 1 | never sent back; what my stopped T-4197 session left |
| parked/b2/20261113-115817-53798 | T-4284 | b2, place 1 | never sent back; what my stopped T-4124 session left |

</div>


One record was sent back (T-3990's); the other three have never been tried. The last two refs hold no work of the
task they are filed under that main lacks: they hold <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>-record commits and a lane-records commit. The question
whether they land or are set aside is on T-3995 for the Operator.

Not read: `tools/parked_lines.py` from the main checkout. The security guard refused it twice from this lane
session ("changes the personal lane's state"; it reads the main checkout's copy of the tool as outside code). The
item stopped there (Commandment 14). So each notice line's own record state stands as read on 11-13, and
the 38 rows below rest on the merge line's read, not on that tool. A main-session read is on the board.

## 3. The active lines

The inventory counted 91 active lines on 11-11. In the ledger 69 IDs have carried an active row at some time, and
56 open lines still carried an active last row when this slice began (43 remove, 13 keep). Read again against the claims, the worker statuses (none
live), the worker-copy sweep (51 copies kept) and the merge line:

- 38 parked-work notices judged remove are read not active: no claim, no copy, and their ref is not one of the 4
  that wait. The archive moves the line only; the ref stays and the archive keeps the line's text.
- 5 removes stay active: T-4177, T-4297, T-4298 (their refs wait on the merge line), T-3871 and T-3879 (worker
  copies with unlanded files; Odalys is asked on both lines).
- 3 rows are read active now: T-3705 (remove; a copy holds its notes file unlanded), T-3821 (keep; Idris's copy
  holds three unlanded Swift files), T-4240 (rewrite; its ref is at place 1 on lane b).
- 13 keeps stand as judged. Three of their copies hold nothing unlanded now (T-3877, and the not-active T-3764 and
  T-3823): left as they are, since a keep is not applied.
- 4 first rows (keep) for lines written since the groups: T-4415, T-4416, T-4417, T-4418. No row on purpose for
  T-4411 and T-4414 (their work landed on main during the read) and T-4412, T-4413 (the audit's own lines).

After the rows: 21 open lines have an active last row (14 keep, 6 remove, 1 rewrite), by owner Odalys 13, Idris 4,
the Operator 2, Ines 2.

## 4. The three link flags against dispatch's checks

Dispatch (`tools/dispatch.py` at c3db19c527; main's later change does not touch these checks) holds a line three
ways: its typed Links (`board.py lanes`, `board_links.held_by`: a `needs` still open); its wording
(`WAITS_RE`: after, once, until, needs, waits on T-X, while T-X is open); and files (`first_overlap`: its paths
against the paths of running work only).

**Flag 1** (needs an open line): 79 flags on 65 lines; 74 targets still open, 5 lapsed (T-4101 and T-4123 on
T-4097 and T-4098, T-4105 on T-4104).
- Agree: 48. Dispatch holds the same line for the same target (all 48 by wording, 29 of them by typed Links too).
- Disagree: 26 needs on 25 lines. Dispatch does not hold them: 19 of the needs sit on 18 lines offered to lanes
  today, 6 on blocked lines, 1 on a line off the list. The ledger's link was set by reading the line; the board
  has no field or wording for it. The offered ones: T-0696, T-0703, T-0811, T-0861, T-2196, T-2296, T-2409, T-2549 (two),
  T-3302, T-3303, T-3388, T-3767, T-3791, T-3792, T-3856, T-3959, T-3960, T-4279.
- The other way: 14 holds by wording that carry no flag 1. 13 the ledger does not call a need (T-0012 on T-0046,
  T-0053 on T-0011, T-0680 on T-0793, T-0866 on T-1905, T-1033 on T-1030, T-1457 on T-0472, T-2268 on T-1440,
  T-3815 on three lines, T-3877 on two, T-4103 on T-4101). One it does: T-3823 on T-4142, whose flag is T-4412's
  to write. 16 umbrellas are held by their own open pieces, which is the design and wants no flag.
- What follows: the apply writes the ledger's links to the board, and from then dispatch waits on `needs` only.
  The 26 then hold and the 13 let go. Both lists should be read once more in the apply's dry run: a wrong `needs`
  on a long-lived line (T-3995, T-3992, T-0680, T-0191) takes a runnable line off the lanes for weeks.

**Flag 2** (a follow-up of an open line, no link): 6, each read. None needs a new link. T-4318 lapsed (T-4097 is
ticked). T-2989 is a real dependency already carried through T-2988. T-2196, T-4142, T-4146 and T-4282 do not
depend on the parent's line. Dispatch agrees: it holds none of the six by a wait, and holds T-2989, T-4142, T-4146
and T-4282 only while the parent runs, because they share its files. Each row carries the read.

**Flag 3** (a file the line names is held by a ref waiting to merge): 15 lines. Dispatch holds none of them for
that reason. They disagree by design, in three ways, and one flag has lapsed:
- Dispatch's file check reads running work only. A ref waiting to merge holds no file in its eyes; it limits
  waiting work per lane (a lane with a waiting ref takes its own first), not per file. 9 lines name
  tools/site/home_look.py, tools/flow.py or tools/site/lifecycle.py, held by T-3996's ref; 8 of the 9 are offered.
- handbook/rules.md is outside dispatch's path pattern (`PATH_RE` knows pywidget, tools, ops, site, tests, docs and
  five more folders, not handbook). Three lines name it (T-3365, T-3379, T-4318) and three waiting refs hold it. It
  is the file T-3990's ref was sent back on.
- ops/plans files are evidence paths to dispatch and never hold (T-4283, T-4304, T-4314).
- One holder no longer waits: T-4097's ref (the line is ticked).

Three of the 15 would be held today for other files (T-4129, T-4283, T-4314), by chance of what is claimed.
{% endraw %}

</div>
