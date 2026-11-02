---
layout: "default"
title: "T-1046: review of T-1034 at 03e807d6 (Pernille)"
section: "documents"
description: "Keep T-1034 on main. It does what its commit says, and cooling beats the loop it replaced. Nothing here loses work or reaches the app. The trouble is what goes into the count. The first thing that broke is the word\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1034-t1046-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1034-t1046-pernille.md</code></span></div><h1>T-1046: review of T-1034 at 03e807d6 (Pernille)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Files read: `tools/personal_tick.sh`, `tools/personal_land.sh`, `ops/prompts/lane.md`, the new rows in
`tests/personal_parked_test.sh`, `tests/personal_pool_test.sh`, `tests/personal_land_product_test.sh`. Line numbers are
main at 8fe22254.

## Verdict: GO, with F1 as a P1 fix

Keep T-1034 on main. It does what its commit says, and cooling beats the loop it replaced. Nothing here loses work or
reaches the app. The trouble is what goes into the count. The first thing that broke is the word "try": the tick hands
one out for sitting in a queue, and T-1034 now spends that number on waits and on P1 lines for a person.

Every finding below is **by reading, unreproduced**. The scenarios were not run: that effect was dropped under T-0848.
The figures come from `ops/runs/personal-tick-a.log`, `ops/runs/personal-tick-b.log` and `git log`, read up to 13:52 ET.
The account state folders were not read, so try counts are worked out from the logs (see "Cool-offs today").

## Findings, by severity

### F1 High: a try is given for being queued, not for being tried

By reading, unreproduced. `tools/personal_tick.sh:594-607`.

The loop runs after every session end and looks at none of `$STOPPED`, `$CODE`, `$TERMED` or how far the session got.
Line 561's TERM trap falls through to it as well. Each uncommitted queued task gets a line in `tries` and a stamp in
`tried`. Only a requeue takes a try away (line 343), so they never decay, and at eight tries the wait is the full 24 h.

Failing cases from today's logs:

- Limit cut: b3, 07:54 to 11:39, `exit 143, stopped by the limit`. All 5 queued tasks got a try at 11:40:22-23. Two of
  them, T-0632 and T-0701, were then finished by account a at 13:48, so they were never tasks no <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can finish.
- Self-ended and too short to have reached them: b, 01:21:35 to 01:22:28, exit 0, 50 s, 5 turns, 8 queued, 8 tries.
- Today overall: 99 "left no commit" lines from 28 sessions started. About 28 of the 99 came from sessions that ended on
  a non-zero exit or the limit. The rest came from sessions that ended by themselves, so a check on the exit code alone
  won't close this.

Effect: the look line says a person should look at a task that may never have been started. Seven of them are waiting
in `.git/personal-ready` to go on the board at P1.

The fix must not open the hole T-1034 closed. A task that <span title="A test written in advance. If it fires, we drop the idea.">kills</span> its own session has to go on cooling, so a cut can't
simply count for nothing. Test: a limit cut and a TERM raise no look line, and a task that cuts its session every time
still cools.

### F2 Medium: a mention still counts as done

By reading, unreproduced. `tools/personal_tick.sh:591`.

M4 fixed this for `attempts` (`tools/personal_land.sh:310-325`). Line 591 still takes every ID anywhere in a subject.

Failing case: queue `T-0100 T-0200`, one commit `T-0100: review of T-0200 at abc123`, nothing for T-0200. T-0200 goes on
the done list at line 597, and line 384 reads that list for every account, so it gets no try, no look line and no
second start. Its board line stays open with nobody coming. That is silent, which is why it ranks above F3.

No case today: the subjects on the 2026-11-02 <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branches and on `personal/a` and `personal/a3` that name a second
ID don't name one queued in the same session. Landed commits were not checked. Lanes do write this shape, though:
`T-0983: review of T-0517 (08099f72) passes` is one.

Don't fix it with "first ID only". `ceee6428 T-0953, T-0974: bounded wait...` is a real commit for two tasks. Take the
IDs before the first colon. See F7.

### F3 Medium: old tries with no time count the moment one stamped try arrives

By reading, unreproduced. `tools/personal_tick.sh:355-371`, comment at 358.

The comment says a try with no time beside it doesn't cool. True only while a task has no stamp at all. `tries()` counts
every line and `cool_left` takes the newest stamp, so one stamped try wakes all the old ones.

Failing case, today: each of the nine tasks in "Cool-offs today" has exactly one stamped try, 13:48:48-49. With stamped
tries alone none of them would have reached two, so none would cool and none would have a look line. T-0309 went from
no wait to 2 h on its first stamped try. The test row "tries from before this fix" covers no stamp only. It runs out as
old tries are requeued, but nothing ages them out.

### F4 Medium-low: requeue clears one account while the readers read all

By reading, unreproduced, and narrower than first reported. `tools/personal_tick.sh:343-347`, 352.

Each account clears its own lists on its own slot 1, so with both on, both get there. The comment at 336 means that. But
`done` (384), `tries` (355), `tried` (367) and `resumed` (503) are read across accounts, and line 334 exits before the
requeue whenever the branch waits to land.

Failing case: account b is off (line 93 exits before any of this) with T in b's `done`. A requeue on main clears a's
lists, and line 384 still skips T until b comes back on. With both on it only delays: a followed b by 39 minutes on
today's 22-task requeue (07:49, 08:28) and by 4 minutes at 00:04.

### F5 Low: requeue leaves `looked`

By reading, unreproduced. `tools/personal_tick.sh:343-347`, 605.

T-1034 added `resumed` and `tried` to the requeue but not `looked`. A requeued task that fails three more times raises
no line. Fix or write down that "once per task" means once ever.

### F6 Low: the told branch gives the wrong reason and drops the warning

By reading, unreproduced. `tools/personal_tick.sh:507-514`.

When `AGAIN=1`, the text says the work "doesn't fit on main as it stands", which was not tested and isn't why. It also
leaves out `$ALSO`, so a worker told to read `git show` of a shared commit isn't told that part of it belongs to another
task.

### F7 Low: `attempts` credits only the first of two leading IDs

By reading, unreproduced. `tools/personal_land.sh:320`.

`T-0953, T-0974: ...` counts for T-0953 alone, so a parked commit of that shape never comes back to T-0974. Same fix as
F2. The two readers should share one rule.

## Cool-offs today

**Nine tasks, all from one session.** Account a, 13:23:04 to 13:48:45, exit 0, 12 queued, 2 finished, is the only session
that has ended on T-1034's code: it landed at 12:19, and a running tick keeps the file it started with. No tick has read
the menu since, so neither log <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a "cooling" line yet: a's last line is "its branch waits to land" at 13:49:15,
which exits at line 334.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Cool-offs today, scrolls sideways" data-n="2" style="--tw:622px" markdown="1">

| Task | Tries | Wait | Back at | A cut session among its tries |
|---|---|---|---|---|
| T-0631 | 2 | 30 min | 14:18 | yes: b3 limit, 11:40 |
| T-0702 | 2 | 30 min | 14:18 | yes: b3 limit, 11:40 |
| T-0769 | 3 | 1 h | 14:48 | yes: b exit 143, 00:15 |
| T-0866 | 3 | 1 h | 14:48 | yes: b exit 143, 00:15 |
| T-0892 | 3 | 1 h | 14:48 | yes: b exit 143, 00:15 |
| T-0906 | 3 | 1 h | 14:48 | yes: b exit 143, 00:15 |
| T-0511 | 3 | 1 h | 14:48 | no |
| T-0622 | 3 | 1 h | 14:48 | no, but one try is the 50 s session in F1 |
| T-0309 | 4 | 2 h | 15:48 | no |

</div>


Tries are counted from the logs since each task's last requeue on both accounts. The check on that: T-1042 comes to one
try, T-0631 and T-0702 to two, the other seven to three or more, and the log shows look lines for exactly those seven.

Reading finding 1 narrowly, as cut sessions only: two tasks are cooling that otherwise wouldn't be (T-0631, T-0702), and
four more got a longer wait and a look line they would not have had. Read in full, all nine came through that loop. The
logs can't say whether the 13:03 and 13:48 sessions, both exit 0, reached them.

## The Investors' question

Cool-offs are not why personal-account work isn't landing. They began at 13:48 and have not yet held back a session.

- The 28 stop commits today are real, from `git log --since='2026-11-02 00:00'`: 19 "stopped on", naming 32 IDs, and 9
  plain. Written as `--since=2026-11-02` the command returns 0, because git fills in the current clock time. They come
  from `park_one` (`tools/personal_land.sh:393`), not from the try loop.
- Account b has started no session since 07:54. Its ticks log "no session" 14 times, 08:10 to 13:45, for a profile check.
- Account a's 13:03 branch (T-0043, T-0449, T-0464, T-0790, T-0891) was parked at 13:22 as "did not land". Its land log
  ends on Xcode exit 65. T-1051 and T-1052 say the same of a and a3.
- 11 left commits on today's parked branches carry no task ID, all from ticks that started before 11215bdb (09:22). They
  can't come back through `attempts`, and neither log has ever said "carries on from" or "is told about", so M3 has not
  run outside tests. b3's limit-cut work, 578 lines in `4a0860a1`, is one of them.

## Cases no test covers yet

Seeded mutants: 17 of 24 killed. They ran on a 21-row cut of the suite (T-1034's rows), so I checked the rest by grep:
no `tests/personal_*_test.sh` sets `PERSONAL_COOL_MAX` or reads `looked` or `resumed`. `tests/personal_parked_test.sh`
has 68 rows; the 68-pass result is the brief's, and no file in the scratch `out` folder shows it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Cases no test covers yet, scrolls sideways" style="--tw:456px" markdown="1">

| Survivor | Case to add |
|---|---|
| `no_cap` | at eight tries the wait is 86,400 s, not 115,200 s |
| `no_cap_loop` | same row; equivalent below about 50 tries, when the doubling would overflow |
| `looked_own_acct` | a look line raised on a, the next try on b raises no second line |
| `resumed_own_acct` | two resumes on a, the third attempt on b starts clean |
| `retry_multi_task` | a retry of `T-1+T-2` puts both IDs on the done list as two lines |
| `default_cool` | unset `PERSONAL_COOL_SECONDS` waits 1800 s at two tries; every suite exports it |
| `look_text` | the board line's exact words |

</div>


Rows that T-1034 has and that hold: cooling, doubling, the once-per-task line, M2, M3, M4 and M5.

## Passed on reading

`cool_left` arithmetic and <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. Cooling tasks don't ride with fresh ones. `look_line` validates both arguments before
`later`. M1's text. M5's floor case in `personal_land.sh:535`. Nothing here describes a protection gap.
{% endraw %}

</div>
