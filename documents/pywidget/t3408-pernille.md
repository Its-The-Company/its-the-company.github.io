---
layout: "default"
title: "Review: T-3408 retry onto a spare, trains of eight, retry_prune.py --sample (T-3545)"
section: "documents"
description: "PASS with fixes. The spare retry does what it says on the happy path, the cap of 8 is wired through train_cap and bisection unchanged, and --sample writes one line and moves nothing. The first thing that broke was the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3408-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3408-pernille.md</code></span></div><h1>Review: T-3408 retry onto a spare, trains of eight, retry_prune.py --sample (T-3545)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13, independent. Reviewed: Odalys 2101d203a, read at main adcd9a234.
Scope: tools/personal_tick.sh (retry-spare block), tools/personal_land.sh (retry_spare_one, LAND_TRAIN_MAX 8),
tools/retry_prune.py --sample, and their rows in tests/personal_off_test.sh, tests/personal_train_test.sh,
tests/retry_prune_test.py. Every probe ran in scratch (/private/tmp/company-scratch/T-3545-pernille) on a copy of the
train test's fixture, HOME moved into scratch; no live <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, retry queue, personal/* branch or SSD path was touched.

## Verdict

**PASS with fixes.** The spare retry does what it says on the happy path, the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> of 8 is wired through `train_cap` and
bisection unchanged, and `--sample` writes one line and moves nothing. The first thing that broke was the failure path:
when `retry_into` refuses after it has already moved the spare, the spare is never handed out again, and with a single
line the work drops out of the pipeline (F1). Separately, the train suite is red on main at HEAD (F2), which is not
this commit's doing but hides this commit's records rows. The race case could not be probed (refusal, below).

Counts: High 0, Medium 2, Low 2. One item not rated (refused probe).

## F1 (Medium): a refusal inside retry_into strands the spare; with one line the work leaves the pipeline

`retry_spare_one` says "A refusal (2): the land is behind, or no spare is free; nothing moved". But `retry_into` also
exits 2 (via `refuse`) after it has reset the spare's worktree onto the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> commit: "can't write the marker"
(mark_ready), "$wt can't go back to $before" (cherry-pick undo). The subshell's exit 2 lands in `unbusy "$sp"; return 1`,
nothing resets the spare, and the tick reads it as an ordinary refusal ("no retry onto a spare: ...").

Probe (p1.sh): train fixture, a directory planted at `.git/personal-ready/.a4.tmp` so the marker write fails, then
`personal_land.sh retry-spare a`, then the fault cleared and the same call again.

- Train of 3: rc=1, "refused: can't write the marker". personal/a4 is 3 commits ahead of main with no marker. The three
  parked names stay. Second call: a4 is passed over (spare_free wants nothing ahead of main) and the train goes to a5.
  a4 stays taken for good: nothing reclaims a spare that is ahead of main with no marker (header line 212, by design so
  no work is lost). Each leaked on-demand spare is a full checkout on the SSD.
- Single line: rc=1, same refusal, but `retry_into` deletes the parked name *before* `mark_ready` on the n=1 path. After
  the call: parked names 0, personal/a4 1 ahead with no marker, live retry lines that still resolve 0. Commit a2bc1b2 is
  contained only by personal/a4. Nothing will ever land it, and no line says so.

The n=1 ordering is older than T-3408 (the feed has it too), but T-3408 puts it on every tick that has a task. Before,
the tick's own retry ran into the slot's worktree, which the slot itself resets; a spare has no such owner.
Fix: on the n=1 path, `mark_ready` before `git branch -D`, as the train path already does. In `retry_spare_one`, when
`retry_into` fails and personal/$sp is ahead of main with no marker while every member name still resolves, reset the
spare to main before `unbusy`. Correct the "nothing moved" comment. Add a row to personal_off_test.sh that plants the
marker-write fault and asserts the spare is free afterwards and the line still live.

## F2 (Medium): tests/personal_train_test.sh is red on main; its fixture lacks tools/land_dupes.py

`bash tests/run.sh personal_train_test.sh` at adcd9a234: **PASS 23 FAIL 3**. Red rows: "seven lines of records go in one
train, past five", "it lands whole, with no suite run", "the first code line ends a records train". Cause: 12dcda648
(T-3659, after T-3408) made retry_prune.py `import land_dupes`. The fixture copies retry_prune.py but not land_dupes.py,
so `records_line` (`retry_prune.py --records-only`) dies on ImportError, reads as "not records", and records lines
become a code train of 8 that tries to run host checks.
Seeded proof: the same suite with `"$SRC/tools/land_dupes.py"` added to make_template's `cp` line: **PASS 26 FAIL 0**.
Not T-3408's defect, but T-3408's records rows sit in this suite, and any land that names it goes red on main.
Fix: add land_dupes.py to the fixture's copy list. (tests/retry_prune_test.py is not affected; it runs the real tools/.)

## F3 (Low): the T-3408 row "LAND_RECORDS_TRAIN at the code cap" cannot fail on the thing it names

With LAND_TRAIN_MAX=5 and LAND_RECORDS_TRAIN=5 a records train and a code train both take 5, so `member` count 5 holds
either way. Proven by the red run above: records detection was broken and this row still PASSed. Assert that the train
is a code train (for example, that a code line after the records joins it) rather than a count.

## F4 (Low): `retry_prune.py --sample ""` silently takes no sample

`if a.sample:` treats an empty reason as absent. Probe in the p1 scratch repo: `--sample ""` printed the report line
("would drop 3 of 3 lines"), rc 0, and wrote no line to ops/metrics/retry_queue.jsonl; `--sample why` wrote one. A
"before" reading taken with an empty reason is lost with no error. Use `if a.sample is not None:`, or refuse an empty one.

## Not rated: a tick retry racing the land feed for the same line (refused probe)

The probe (two `retry-spare a` at once over a train of 8, the same `pick_spare` + `retry_into` pair `feed_retries` runs,
15 trials) was refused by the security-guard hook before it ran: the command reset copies of a scratch
`$HOME/company-personal` and the hook reads that text as the Investors' folder. Per the refusal rule the item stops
there; I did not reword it. What I can say from the code, unproven: nothing serialises a tick's `retry-spare` against
a land-live feed for the same account (no landing lock, no per-account busy), so both can mark the same commits on two
spares. The header already accepts that, and whichever lands first makes the other "already in main". T-3408 makes it
more frequent (every tick with a task, not once an hour). A member name deleted by the other mover between `show-ref`
and `rev-parse` would write a `member <name>` line with no commit, which `train_restore` cannot put back. Someone with
a probe the hook allows should confirm or clear this.

## What I checked and found sound

- `retry_spare_one`'s slot filter (`[a-z]|[a-z][23]`) matches the feed's; its letter for `pick_spare` is the account's.
- The tick's RETRY_TASKS awk uses `parked/$LID/` with the slash, so slot a never reads a2's lines.
- On success the tick adds the retry's tasks to `$STATE/done` and drops them from CANDS, so the session does not take
  a task that is waiting to land. The hourly stamp is skipped only when a spare took the retry.
- LAND_TRAIN_MAX 8: `train_cap` and bisection (8 to 4 to 2 to 1) need no change. The new rows (eight taken, ninth
  waits; LAND_TRAIN_MAX=5 as before) pass in both runs. Not checked: whether the union of eight lines' checks still fits
  LAND_TEST_SECONDS (1500 s in land-live); a timeout reads as red and bisects. Worth a look at the first week's land logs.
- `--sample` changes no ref and no file but the series (test rows pass; confirmed in scratch).

## Probes

Scratch scripts: /private/tmp/company-scratch/T-3545-pernille/probe/fix.sh, p1.sh (F1), and the seeded copy of the train
suite under kit/ (F2). Outputs: train_run.txt (23/3 at HEAD), train_seeded.txt (26/0 with land_dupes.py).
{% endraw %}

</div>
