---
layout: "default"
title: "Delta review: L5 s5 after A1, A2 and the Q-T130 rulings (1.1 gate)"
section: "documents"
description: "Verdict. The delta does what the T-0108 review asked. Every row has a claim before it runs, every path ends in a commit or a counted attempt, the 3-run bound holds for a queue row and for a converted live row, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/l5-s5-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/L5-s5-review-odalys.md</code></span></div><h1>Delta review: L5 s5 after A1, A2 and the Q-T130 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span> (1.1 gate)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-10-26, task T-0131. Independent review (Commandment 13: hand-off with independent review). I did not write this text. This is the review that ADR-007 chair amendment 2 item 7 names as part of the gate. No edit to L5 or ADR-007; their owners make the changes.

**Read:** [`pywidget/docs/research/L5-interactivity.md`](l5-interactivity.html) at a4e09736: s5.0-s5.9 in full, plus s4.2, s10, s11 and s14 where they touch state. ADR-007 at the same commit: 5.1 (batch rule), 5.3 (expiration handler, stuck, recovery), 7.1, 7.2 (`expired`, `killed`, loop breaker), 7.5, chair amendment items 1-7 and chair amendment 2. My T-0108 review and Idris's replies ([`L5-state-review-odalys.md`](l5-state-review-odalys.html)).
**Measured:** nothing. This is a reading review. Every scenario below is a trace through the text as written, not a run. The proposed host model (S6) is how to turn these traces into tests.

**Verdict.** The delta does what the T-0108 review asked. Every row has a claim before it runs, every path ends in a commit or a counted attempt, the 3-run bound <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for a queue row and for a converted live row, and Ines's I1-I5 are the right invariants: each one names something a test can check. Four things still stop the gate, and none of them changes a name v1 writes:
- the live path reads its state at write-ahead time, so a second tap during a handler run ends in `conflict` (B1);
- moving a row to `failed.jsonl` is a commit across two files, with no order and no repair (B2);
- the `expired` give-back reads `status.json` `last_outcome`, which two ordinary paths overwrite before the drain looks (B3);
- "a live row whose process is gone" has no test, and a wrong guess runs a handler twice (B4).

**4 blockers, 6 should-fix, 6 nits.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:808px" markdown="1">

| # | Severity | Where | One line |
|---|---|---|---|
| B1 | Blocker | s5.3 para 2; s5.0 item 3; s4.2 27+ | Live snapshot taken at write-ahead: a tap during another handler run lands in `conflict` |
| B2 | Blocker | s5.6 Failure, Drain (`killed`); s5.3 `conflict`; s5.1 `failed.jsonl` | The move to `failed.jsonl` is two renames; one order loses the row, the other re-runs it |
| B3 | Blocker | s5.6 Drain (01:46 give-back); s5.8 I4; ADR-007 5.3 | Give-back keyed on `last_outcome`, which launch recovery and earlier rows overwrite |
| B4 | Blocker | s5.6 Drain, first sentence | "Process is gone" is undefined; the drain can claim a live row whose run is still queued |
| S1 | Should | s5.3 ok branches | Say that a result commit rewrites only `scopes.shared` and its own row |
| S2 | Should | s5.6 Drain, Failure | At most one run per row per batch; say what a failed retry does to `seq` order |
| S3 | Should | s5.4 | <span title="A measured fact that holds a grade below a letter, however good the rest is.">Caps</span> refuse taps only; a handler result over 64 KiB is outcome `error` |
| S4 | Should | s5.6 Drain (give-back); s5.3 last bullet | A row that is always cut by expiry has no bound between T1s |
| S5 | Should | s5.3 live error branch | The restore test fails on any commit, including the pending-only commits that A1 added |
| S6 | Should | s5.8 | Testability: end states, `tap_id` in the run log, named <span title="A test written in advance. If it fires, we drop the idea.">kill</span> points, and a host model |
| N1-N6 | Nit | various | Stale text, a reason name, the real `failed.jsonl` bound, the loop breaker, ADR item 6 wording |

</div>


## Blockers

**B1. The live path's snapshot is taken at write-ahead, so a tap that arrives during another handler run ends in `conflict`.**
- Where: s5.3 para 2 ("The handler reads state in the same locked section as the claim, so `r` is the claim's `rev`"); s5.0 item 5 (the live write-ahead "is the claim for the first run"); s4.2 27+ (`RunRequest(..., widget: {id, state, ...})` built in `perform()`); s5.3 ok-moved branch ("If any commit in the window is not ops ... `failed.jsonl` with reason `conflict`"); s5.0 item 3 ("it never falls inside another run's window: one interpreter runs one handler at a time").
- Trace, iOS 27+, one widget with two handler Buttons:
  1. Tap A: write-ahead at rev 10 (ops + row, attempts 1). A's run starts at once with the state at rev 10.
  2. 0.5 s later, tap B: write-ahead at rev 11. B's state is read now, at rev 11. B's run is queued behind A (one interpreter).
  3. A returns `ok`: result commit at rev 12. This is a handler result, not ops, so it is not in `ops_log`.
  4. B runs and returns `ok`. Its window is 12..12. Commit 12 is not ops, so B moves to `failed.jsonl` with reason `conflict`. The handler ran, its result is discarded, and the widget shows a badge.
- The same happens to a live tap that waits behind a drain row (<span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> on app open, which is ordinary on the 18-26 `link` path) or behind a console run. Two taps within a handler's run time (default 2.0 s, s10) are ordinary use. Each one also adds a row toward the 100 that refuses every handler tap (Q-T130-2). Item 3's reasoning holds for a claim made right before a run (the queue path). It does not hold for a write-ahead, which is made when the tap arrives, on whatever thread `perform()` runs.
- Fix:
  - The snapshot `(epoch, r, scopes.shared)` is read under the lock at the moment the bridge run starts, for every run. For a queue row this is the claim's locked section, as now. For a live row's first run, it is a locked read with no commit, so "the live path needs no extra commit" still holds. The `RunRequest` carries that snapshot, not the state from `perform()`.
  - With one interpreter, no other handler result and no in-app Python write can then fall inside a run's window. Only other processes' commits can land there (extension taps, "Set Widget State", live write-aheads), plus the drain's pending-only commits (B4, S5). All of them are ops or touch no key.
  - So `ops_log` also records pending-only commits (claim, conversion, move to `failed`) as `{"rev": n, "ops": []}`. The rebase then steps over them, and `conflict` is left with one cause: a window longer than the 16-entry ring. Say that in s5.3, and fix the s5.0 item 3 sentence.

**B2. Moving a row to `failed.jsonl` is a commit across two files, with no order and no repair. One order loses the row; the other re-runs a handler after its result exists.**
- Where: s5.6 **Drain** ("move it to `failed.jsonl` with reason `killed` ... (one commit)") and **Failure of a queued row** ("the result commit moves it to `failed.jsonl`"); s5.3 ok-moved branch (`conflict`); s5.1 table (`failed.jsonl` written by the app with temp file plus `rename`; `state.json` written under `state.lock`). The move writes two files, and each has its own `rename`. "One commit" cannot be literally true. The T-0108 B2 finding was this same pattern between `state.json` and `actions.jsonl`.
- Kill between the two renames:
  - `state.json` first (row removed), then `failed.jsonl`: the row is in neither file. The tap is lost without a trace, which breaks the s5.8 rule that every `tap_id` ends in exactly one state.
  - `failed.jsonl` first, then `state.json`: the row is in both. For `killed`, `error` and `timeout` the next drain sees `attempts >= 3` and appends it again, so one `tap_id` ends in two `failed` rows. For `conflict` the row has `attempts` 1 or 2, so the next drain **claims it and runs the handler again**, after a result commit (the move) exists. That breaks I1.
- Fix:
  - Fixed order, both under `state.lock`: write `failed.jsonl` (temp, `fsync`, `rename`), then commit `state.json` without the row.
  - Make the move idempotent. Before appending, the app checks `failed.jsonl` for the row's `tap_id`. At the start of each drain, any `pending` row whose `tap_id` is already in `failed.jsonl` is removed from `pending` with no claim and no run. That one repair rule makes I1 hold through a kill at either point.
  - Keep `failed_count` in `state.json` (written in the same commit that removes the row; set again from the file's line count at each drain, and when the person clears rows in the IDE, under the lock). The extension's full check (s5.4, order of checks) then reads the file it already holds the lock on. It does not have to parse up to 100 rows of 4 KiB tracebacks inside the 200 ms bound, or read a second file that s5.7 never gives it.
  - Say in s5.4 that clearing rows in the IDE takes `state.lock`.
  - Add both kill points to the s5.8 kill list.

**B3. The `expired` give-back reads `status.json` `last_outcome`. Two ordinary paths overwrite it before the drain looks, so I4 fails as specified.**
- Where: s5.6 **Drain**, the 01:46 addition ("if the row's `run_id` is the run that the widget's `status.json` records as `expired`"); s5.8 I4; ADR-007 5.3 (expiration handler writes `last_outcome=expired`; recovery at launch "records the stuck widget as `stuck`"); ADR-007 7.2 `killed` row (a launch with the crash marker writes outcome `killed`).
- Path 1, expired and then killed while suspended (I4's second sentence). T2 expires row 17's run, and the handler writes `last_outcome=expired, run_id=X`. iOS kills the suspended app. At the next launch the crash marker is found with `backgrounded`, and 7.2 writes outcome `killed` for run X. That overwrites `expired`. The T1 drain finds no `expired` record, so the attempt counts. ADR-007 7.2 already excludes this case from the loop breaker ("A `killed` with `backgrounded` that followed an `expired` is not counted"). The give-back does not see it, because the fact it reads is gone.
- Path 2, an earlier row of the same widget. Row 16 failed once (`error`, attempts 1, stays in `pending`), and row 17's run expired. At the next drain row 16 runs first (`seq` order) and fails again, so `last_outcome=error`. When row 17 is reached, the record names another outcome, and the attempt counts. Three such T2 cycles put a healthy row 17 in `failed` as `killed`: the outcome Q-T130-1 was ruled to prevent.
- The chair's "errors go the safe way" holds: the count rises and the row is shown. But I4 cannot pass the kill test, and the gate needs I4.
- Fix (lands in T-0158's ADR-007 edit, which waits on this review):
  - The expiration handler appends the run's `run_id` to a short list in `status.json`, `expired_runs` (last 8). Other outcome writes carry the list over unchanged. Launch recovery for a marker whose `run_id` is in `expired_runs` keeps it there, and records `killed` only for the Activity row, as 7.2 already does.
  - The drain's test becomes "the row's `run_id` is in `expired_runs`". Entries are keyed by `run_id`, so a stale entry is harmless, and no clear step is needed.

**B4. "A live row whose process is gone" has no test. Under a wrong reading, the drain claims and runs a live row whose own run is still queued.**
- Where: s5.6 **Drain**, first sentence ("turns any `intent` or `link` row whose process is gone into a queue row"); s5.3 last bullet ("A live row whose process is gone is first turned into a `queue` row").
- Trace, 18-26 `link`: the link opens the app, and the write-ahead lands (row 20, attempts 1). The scene becomes active, so T1 starts (ADR-007 5.1), and the T1 drain starts before the link's handler gets the interpreter. Nothing in the row says which process owns it.
  - If the drain treats "not running now" as gone, it converts row 20, claims it (attempts 2) and runs it. Then the link's queued run also runs. That is two runs, and both result commits try to remove the row. The 27+ case is the same when the person opens the app while a background intent's run is queued.
- Fix: every live row carries `launch_id`, a UUID made once per process launch. "Gone" means `launch_id` differs from this process's. The drain skips live rows of its own launch; their intent or link owns them. This is one field in the row, written in the write-ahead commit. Add the case to the kill test: a live row of the current launch must never be claimed by a drain.

## Should-fix

**S1. Say what a result commit writes.** s5.3 ok branches: "write the handler's state ... and remove its row". The handler's snapshot includes `pending`, `next_seq` and `ops_log` from time `r`. If an implementation writes the snapshot document back, every row added during the run is dropped, which is the T-0108 B1 loss again. Fix: one sentence in s5.3. Every result commit reads the current file under the lock, replaces `scopes.shared` (rebased) and removes its own row by `seq`. `pending`, `next_seq` and `ops_log` are always the current file's.

**S2. At most one run per row per batch, and what a retry does to order.** s5.6 **Drain** ("for each row in order") and **Failure of a queued row**. If a queue row fails with `attempts` < 3, no commit is made, and the row stays first in `pending`. The text does not say whether the same drain moves on or picks it up again. A loop that drains "while `pending` is non-empty" would spend all 3 attempts in one batch. Fix:
- The drain takes a snapshot of the `seq` list at its start and runs each row at most once per batch.
- s5.6 **Order** adds one sentence: a row that failed and is retried later runs after rows with a higher `seq` that succeeded in between, so handler order is `seq` order only for first runs.

**S3. Caps refuse taps, never internal commits; and say what a handler result over 64 KiB is.** s5.4. The claim (adds `run_id`), the conversion, the move and the result commit all rewrite `state.json`. As worded ("binds every tap"), the caps apply to taps only, but s5.4's first sentence ("a write over the cap fails the action with `StateTooLarge`") reads as every write. A refused claim would leave a row that can never run. Fix:
- Say that claim, conversion, move and give-back commits are never refused by a size cap.
- A handler result whose `scopes` exceed 64 KiB is outcome `error` (`StateTooLarge`) for that run. It counts like any error (s5.6), and the claimed attempt stands.
- Also say that the 256 KiB test is on the file as it would be written (with the new row and its `before`), not on the file as read.

**S4. A row that is always cut by expiry has no bound between T1s.** s5.6 **Drain** give-back; Ines's 01:46 reasoning ("T1 has no expiry, so on the next T1 a slow handler either finishes or meets its own `timeout`"). That bound waits for a T1. A person who does not open the app for days gets a T2 every 15 minutes or more. Each one runs this widget's rows first (s5.6 **Batch rule**), the run is cut, the batch ends, and the other widgets get `deferred`. Nothing is lost and no file grows, but one slow row can hold every T2 until the next T1, and every widget keeps a stale clock. Fix, in the chair's own reasoning: a row whose last run was given back (its `run_id` is in `expired_runs`, B3) is skipped on T2 and T3 and runs on T1 only. This needs no new field and one test case (I4 with T2s only: the row stays `pending`, the other widgets render).

**S5. The live restore test now fails on commits that touch no key.** s5.3 error branch: "if `(epoch, rev)` is still the row's `(epoch, rev_after)`, restore each key in `before`". Since A1, a drain's claims, conversions and moves all move `rev`. A live Toggle whose handler fails while any drain is active no longer snaps back (L4 s6's promise); it keeps its state with a badge. Fix, with B1's `ops_log` form: restore when every commit after `rev_after` is in `ops_log` and none of their ops touches a key in `before`. Pending-only commits (`ops: []`) and taps on other keys do not block the restore.

**S6. Testability: the invariants need observable end states, and the state machine needs a host model before Swift.** s5.8.
- End states. s5.8 says every `tap_id` ends in "handled, pending, failed, refused-and-logged". s5.3 has two more: a live row restored, and a live row removed with a badge because `rev` moved. Neither leaves a row anywhere. I1 already lists "restored". Add both to the list, and log them.
- `tap_id` in the run log. ADR-007 7.5's `log/runs.jsonl` row has `run_id`, not `tap_id`. Add `tap_id` (and `seq`) to the run row for handler runs. The kill test can then classify each tap from files, and the person can trace a tap from the widget to its traceback. The v1 log reader must ignore unknown keys (amendment item 5 covers unknown values only). Today that is a one-line check, but it has to be true by Day 13 (2026-11-03).
- Where a refusal is logged. The extension writes only `state.json`, `wants-run` and `location/last.json`, so "refused-and-logged" needs a named `os_log` subsystem and category, readable with `log show` on the host and the Simulator.
- Counting runs. I1-I4 count runs, including runs that died. The test handler appends `tap_id, run_id` to a test-only journal and calls `fsync` as its first statement. Runs are counted from that journal, never from the system under test.
- Kill points to add to the list (after temp write, before `rename`, mid-drain, during delete): between the `failed.jsonl` and `state.json` renames (B2); between the expiry write to `status.json` and suspension (B3); during launch recovery; between a live write-ahead and its run start (B4).
- Host model first. The whole state machine is a pure step function over three documents (`state.json`, `failed.jsonl`, `status.json`), driven by these events: tap(path, ops), run start, result(outcome), expire, kill(point), launch, drain, clear failed. A model of about 200 lines that is run with random event sequences on the host checks I1-I5 in seconds. It would have found B1-B4 before this review did. Then the Swift type runs the same event sequences in `swift test` on macOS: `flock` and `rename` on APFS behave the same in the host directory and the Simulator's App Group container [recalled]. The 1,000-kill Simulator run then only has to prove the two-process part. Proposed as a G-L5-5 row: "model and Swift type agree on N = 10,000 random sequences, I1-I5 hold".

## Nits

**N1. s5.4, first paragraph:** "`actions.jsonl` at most 100 rows" survives unstruck. s5.1 struck the file. Strike the clause or point to the `pending` cap.

**N2. A row whose three runs were all `stuck` moves with reason `killed`.** s5.6 **Drain**. ADR-007 7.2's `killed` copy says "iOS closed PyWidget in the background" or "possibly out of memory". Neither is true for a handler stuck in a C call. Fix: the reason is the last counted outcome (`stuck` or `killed`), and `stuck` is added to amendment 2 item 6's reason list (T-0158).

**N3. The real bound on `failed.jsonl`.** Q-T130-2's "bounded by 100 plus `pending`, and the 256 KiB cap bounds `pending`" is true, but loose in rows. In practice `pending` holds at most 100 queue rows plus one converted row per process kill. So the file holds about 200 rows, up to about 1 MiB with 4 KiB tracebacks plus 1 KiB args (arithmetic, not measured). Say that number in s5.4 so the IDE's failed-rows view is built to page, not to load everything at once.

**N4. The loop breaker and the drain.** ADR-007 7.2 sets `background=false` after 2 background `killed` or `stuck` outcomes, and the widget then "runs only on T1". s5.6 does not say whether a T2 or T3 drain still runs that widget's rows. It should skip them, so a handler that kills the process is not given its third run in the background. One sentence in s5.6 **Batch rule**.

**N5. s10 and s11 lag s5.** s10 "Queue: 100 taps per widget" says nothing of the `failed.jsonl` refusal of every handler tap. s11 "Handler `timeout` / `interrupted`: restored as above" is false for a `queue` row, whose ops stand (s5.6). s11 has no row for the full-file refusal or for `conflict`.

**N6. ADR-007 amendment 2 item 6 wording (T-0158):** "At 3 attempts, the row moves to `failed.jsonl` (reason `error`, `timeout`, `killed` or `conflict`)". `conflict` moves at once, not at 3. Suggested: "A row moves to `failed.jsonl` after 3 counted runs (reason `error`, `timeout`, `killed` or `stuck`), or at once on `conflict`."

## What holds (checked, no finding)

- The 3-run bound. A queue row is claimed 0→1→2→3 and moves at the next drain; that is 3 runs. A live row runs once at attempts 1, is converted, and is claimed 2 and 3; that is 3 runs. An `error` or `timeout` at attempts 3 moves in the result commit, with no extra run. A deferred row is not claimed. The A1 trace is correct.
- Every handler tap still makes one write-ahead commit before Python, on every path (s5.6), so T-0108 B1 and B2 stay fixed.
- The Q-T130-2 bound. Once `failed.jsonl` holds 100 rows, no new handler row can be written, because the check is under the lock, before the ops (s5.4 order of checks). Only rows already in `pending` can follow (N3 for the number).
- The give-back costs no commit: the corrected count rides on the claim. Once B3's record survives, the ruling is sound. A lost record makes the attempt count, so the error goes the visible way.
- ADR-007 alignment. `expired` does not count, in both counters (7.2 loop breaker, s5 attempts), and s5.7 still takes no lock after expiry. The `status.json` write is the app's usual atomic rename. The remaining gaps are B3 (the fact is overwritten) and the item 6 text (N2, N6), both in T-0158's scope.
- Day 13 (2026-11-03). None of B1-B4 or S1-S6 changes a name or shape that v1 writes. `launch_id`, `failed_count`, the empty `ops_log` entries and `expired_runs` are new fields in files that only 1.1 writes, or, for `expired_runs`, in `status.json`, which the app and the extension read from the same bundle. The one v1 item is S6's: the run-log reader ignores unknown keys. That costs a line and a fixture, and it should go on the Day 13 list now.

## What I did not check

s5.7's iOS claims (0xdead10cc, data protection classes, background assertions) beyond the T-0108 review: they are still [recalled] and stay gate items G-L5-4, G-L5-5 and G-L5-7. s7 link signing. s8 controls. The renderer side of `pending` (s9).
{% endraw %}

</div>
