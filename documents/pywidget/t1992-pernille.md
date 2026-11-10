---
layout: "default"
title: "T-1992: review of T-1064 at cd15cd6e3 (Pernille)"
section: "documents"
description: "The first thing that broke was the word &quot;cut&quot;. The fix is right about what a cut does and wrong about what a cut is. It tests for two of the holder&#x27;s stop words and a TERM to the tick. The keeper doesn&#x27;t go through the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1992-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 16 · Fri Nov 6</span><span><code>pywidget/docs/reviews/t1992-pernille.md</code></span></div><h1>T-1992: review of T-1064 at cd15cd6e3 (Pernille)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Files read as they stand on `personal/b3` at 7cc45fb65: `tools/personal_tick.sh`, `tools/session_holder.py`, `keep` in
`rules/personal_lane.py`, `tests/personal_parked_test.sh`. Line numbers are that commit's. The account state folders and
streams were not read: sessions don't touch them. Figures come from `ops/runs/personal-tick-a.log` and
`personal-tick-b.log`, read up to 2026-11-06 3:29 AM ET.

## Verdict: F3 closed, F1 not closed; fixed here

The first thing that broke was the word "cut". The fix is right about what a cut does and wrong about what a cut is. It
tests for two of the holder's stop words and a TERM to the tick. The keeper doesn't go through the holder, so most cut
sessions were never stamped. T-1064's own claim holds for the sessions it recognises. Keep it; it needed one line more.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict: F3 closed, F1 not closed; fixed here, scrolls sideways" style="--tw:575px" markdown="1">

| Earlier finding | Status |
|---|---|
| F1 (a try given for being queued) | **Not closed by T-1064.** 15 of 173 tries were stamped. Non-clean ends are closed by this fix. Clean ends that never reached a task stay open as T-1993, which has not landed |
| F3 (old tries wake on one stamp) | **Closed.** `cool_left` and the look line both read `stamped`; `tries` now only ranks the menu (line 571), which is harmless. Mutants `wait_uses_tries` and `look_uses_tries` are killed by T-1064's own row |

</div>


## The count since T-1064 landed

75 sessions in the logs started after 1:15 AM on 2026-11-04, by which time cd15cd6e3 was on main.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The count since T-1064 landed, scrolls sideways" data-n="2 3 4 5" style="--tw:605px" markdown="1">

| How the session ended | Sessions | Tries charged | Stamped cut | Look lines |
|---|---:|---:|---:|---:|
| exit 143, "keeper: stopped, it sent the signal" | 15 | 67 | 0 | 5 |
| exit 143, keeper no word | 3 | 18 | 0 | 0 |
| exit 137, keeper no word | 1 | 12 | 0 | 0 |
| exit 1 | 7 | 29 | 0 | 1 |
| exit 0 | 45 | 32 | 0 | 6 |
| stopped by the told | 2 | 13 | 13 | 0 |
| stopped by the limit | 2 | 2 | 2 | 0 |
| **Total** | **75** | **173** | **15** | **12** |

</div>


## Findings

### H1 High, fixed: the keeper's stop is not a cut

Reproduced. `tools/personal_tick.sh:976`:

    CUT=""; { [ "$TERMED" = 1 ] \|\| [ "$STOPPED" = limit ] \|\| [ "$STOPPED" = told ]; } && CUT=" cut"

`keep` signals the session's pid itself (`rules/personal_lane.py:1023`). The holder only sees the session end, and writes
`stopped_by: null`. So `STOPPED` is empty, `TERMED` is 0, and the try is a real one. The tick knows better earlier in the
same run: line 941's comment says "The keeper's own signal shows only in the exit code", and line 912 logs "keeper: stopped".

Failing case, on the code as it stood: stand-in keeper sends TERM, `PERSONAL_LOOK_TRIES=1`. Log says exit 143 and
"keeper: stopped", the try has no stamp, one look line goes up. New row "the keeper's signal raises no look line".

Real cases: b 2026-11-05 10:25:05 PM (T-2027) and b 2026-11-04 7:59:27 PM (T-1854), a2 2026-11-04 8:49:56 AM (T-1117, T-1284,
T-1243). Those five lines went to the board at P1 from sessions something else ended. I can't say from the logs whether
those tasks needed a person anyway. The three uncounted stop words (`watcher`, `check`, `error`) fail the same way.

### M1 Medium, fixed: a session that dies on an error is not a verdict either

Reproduced. `tools/personal_tick.sh:976`, same line.

Exit 1 sessions end on `is_error=True` or at `num_turns=0`, with agents still out: b3 2026-11-04 11:15:34 PM, 2251 s in, 8
tries and a look line for T-2021. The tick's own line 1025 calls this "did not end clean" and <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> the branch, but
charges every task a real try. Three such ends fell on account b within nine minutes (11:15 PM to 11:24 PM). That looks like an
account-wide cause, but the streams that would say so are not mine to read, so this is unconfirmed.

Failing case: `ctl/exit` 1, `PERSONAL_LOOK_TRIES=1`, two ticks: a line, and no stamp. New rows "a session that dies on
exit 1" and "and it still cools".

**The fix:** `[ "$TERMED" = 1 ] || [ -n "$STOPPED" ] || [ "$CODE" != 0 ]`. That is the complement of T-1993's own test for
a clean end, less its last-line check, which line 1023 only computes later. A task that <span title="A test written in advance. If it fires, we drop the idea.">kills</span> its session still cools.
That was the hole F1 said not to open.

### L1 Low, open as T-2972: a task that always cuts never reaches a person

By design, and my own design: F1 asked for it. `tools/personal_tick.sh:988`. Failing case: the row "a task cut at the
limit every time still cools, and no person is asked". Cuts never count, so no number of them raises a line; from eight
tries it runs once in 24 h, for up to a full session limit, and only the log says so. T-1034 exists so that a task no <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can finish doesn't go unseen. H1's fix widens
this class. A bigger count of cuts may need its own line, but cuts also land on tasks that are innocent, so that's a
decision for the owner of the line, not a change I'd slip in here.

### L2 Low, fixed: two suites read the lane's own dispatch variable

Found by running them. `tests/personal_pool_test.sh` and `tests/personal_off_test.sh` don't unset `DISPATCH_TASKS`, so
inside a dispatched lane they go 82 and 58 red, the tick finding no line for the lane's own task IDs.
`tests/personal_parked_test.sh:16` already unsets it. Added to both; rerun inside this lane with the variable set, both green.

## Checked and sound

- **Unstamped older tries:** count for neither wait nor line, on any mix. Lines from before T-1064 have two fields and read
  as real tries, as its commit says. They can't be told from real ones, so the old mis-stamps, and the 126 non-clean tries
  in this table, stand until a requeue. The state folders are not a session's to rewrite.
- **The awk match:** `$1 == t` is a whole-field string compare in the macOS awk, so T-0001 doesn't match T-00011 or
  T-0001a; `$2` stays the time on a line with a third field; a missing `$3` reads as not cut; no `tried` file prints 0. No
  row covered the match: added one. My first version of that row let the mutant survive, because it gave T-0001 no stamp
  of its own; corrected, and the mutant dies.
- **A look line after a mix:** two real, two cuts, one real gives a line that says 3. One real, three cuts, one real gives
  none. Real tries past the mark with no line yet, then a cut: none. The `[ -z "$CUT" ]` guard had no row: a mutant
  dropping it passes all 89 rows of T-1064's suite as it stood, and dies on the new one.
- **Requeue:** by reading, `grep -v "^$t "` takes a stamped cut line with the rest.
- **No other reader of `tried`:** only `tools/personal_tick.sh` and its tests parse it, so the third field breaks nothing.

## Evidence

`tests/personal_parked_test.sh`: 7 new rows, 96 pass, 0 fail (89 before). Against the old line, three of them fail. Seeded
mutants on the changed lines: 10 of 10 killed, all in scratch copies under `/tmp`.
`tests/site_lanes_test.py`: the sentence now names an error too, DIGEST moved, 46 pass. `tests/personal_pool_test.sh` and
`tests/personal_off_test.sh`: 110 and 103 pass, 0 fail. Nothing was run against a live account.

The fix needs its own review: T-2971.
{% endraw %}

</div>
