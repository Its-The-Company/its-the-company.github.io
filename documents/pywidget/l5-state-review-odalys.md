---
layout: "default"
title: "Review: L5 s5 state model against the s15 chair note (S1-S7)"
section: "documents"
description: "Verdict. S1-S5 are the right shape: one writer type, a separate lock file, temp file plus rename, a bounded wait, no stale lock after a crash. The weak part is the queue. Ops go to state.json, the queued tap goes to\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/l5-state-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/L5-state-review-odalys.md</code></span></div><h1>Review: L5 s5 state model against the s15 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note (S1-S7)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-10-26, task T-0108. Independent review (Commandment 13, hand-off with independent review): I read the spec and the ruling text, not the author's or the chair's reasoning notes. No edit to L5 or ADR-007; their owners make the changes.

**Read:** [`pywidget/docs/research/L5-interactivity.md`](l5-interactivity.html) s0-s16 at b36d0ea4, with s5 (state model) in full and s4.2, s5.5, s8, s9, s10, s11 where they touch state; the s15 chair note S1-S7; the ADR-007 chair amendment, items 1-7 (b36d0ea4), and ADR-007 5.1-5.3 and 7.2.
**Measured:** one host number only, for nit N1. No device, no Simulator, no build. Every iOS claim below marked [recalled] is mine and unmeasured. Each of these is a gate item, not a fact.

**Verdict.** S1-S5 are the right shape: one writer type, a separate lock file, temp file plus `rename`, a bounded wait, no stale lock after a crash. The weak part is **the queue**. Ops go to `state.json`, the queued tap goes to `actions.jsonl`, the app drains the queue later, and these three steps are separate commits with nothing that ties them together. As written, S6's "never dropped" does not <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> in two ordinary scenarios (B1, B2), and s11's "queue row written so the handler runs at the next <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>" has no mechanism behind it. **2 blockers, 10 should-fix, 6 nits.** Both blockers are layout decisions. They are cheap now, before R6's names are used, and expensive once 1.1 has files on phones.

## Blockers

**B1. Drain then truncate loses taps that arrive during the drain. A <span title="A test written in advance. If it fires, we drop the idea.">kill</span> mid-drain runs handlers twice.**
- s5.1 says the app reads `actions.jsonl` ("drain"), "then truncate[s] under the lock". s4.2 runs each queued handler "on the then-current state", so the drain runs Python with the lock released, up to `timeout + 5 s` per row (s10).
- Scenario 1, lost tap. The queue holds 3 rows. A T1 drain starts and reads the 3 rows. While handler 2 runs, the person taps a `fallback="queue"` button. The extension appends row 4 under the lock. The drain finishes, takes the lock and truncates. Row 4 is gone, with no log line and no badge. That is exactly what S6 forbids. The window is the full drain, up to 3 × 10 s here and up to 100 × 10 s at the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, not microseconds.
- Scenario 2, double run. The drain commits handler results for rows 1 and 2. iOS then kills the app (T2 expiry, a swipe-away, jetsam) before the truncate. The next T1 reads rows 1-3 again, and handlers 1 and 2 run a second time. The s3.2 example `log` appends `args["at"]` to `history`, so it records the same tap twice.
- Fix:
  - Make "this row is done" part of the same atomic commit as the handler's result. Each row gets a sequence number `seq`, assigned under the lock and strictly increasing per widget. The handler's state commit writes `queue_done = seq` in the same `rename` as the new state.
  - The drain removes only rows with `seq <= queue_done`. It removes them by rewriting the file (temp plus `rename`) under the lock, never by truncating to zero.
  - A replay after a kill skips every row at or below `queue_done`. The result: a row appended during a drain survives, and a row is handled at most once.

**B2. A tap's ops and its queue row are two commits in two files. The 27+ and open_app paths keep no record at all.**
- `fallback="queue"` (s4.2): `WidgetOpsIntent` applies the ops (rename of `state.json`), then appends to `actions.jsonl`. These are two writes. The extension can die between them (jetsam, or a debugger or OS kill; s5.2's own "a process that dies mid-op").
  - Order ops then row: the ops show, but the handler never runs. The tap is silently dropped.
  - Order row then ops: the handler later gets a state without this tap's ops. That breaks the s3.2 handler contract ("receives the state **after** this tap's ops").
- 27+ (`WidgetActionIntent`) and the 18-26 `open_app` link: the app applies the ops, then runs the handler in memory, with the pre-tap state "kept" by "the intent" (s5.3). If the app is killed while the handler runs (background launch killed, s11 row 5; the person swipes PyWidget away after the deep link), the ops stand, the handler never runs and nothing can restore them.
  - s11 says "queue row written so the handler runs at the next T1". Nothing in s4 or s5 writes that row, and a killed process cannot write it afterwards.
- Restoring after a failed handler (s5.3, s11 rows 2-3) needs the pre-tap values. The queue row fields in s4.2 (`tap_id, ts, action, args, rev_after`) do not carry them. Inverting the ops is not possible: `add` clamps, `toggle_member` drops the oldest past `max_len`, and `set` and `clear` discard the old value.
- Fix: one commit record, written ahead.
  - Every tap that has a handler, on every OS and path, writes **one** locked commit before any Python runs. That commit contains the ops result **and** the pending row `{seq, tap_id, ts, action, args, before: {touched keys -> old values or absent}}`.
  - The simplest form is a reserved top-level `pending` list in `state.json` beside `scopes`. Ops and row then land in one `rename`, and B1's `queue_done` becomes "remove the row from `pending` in the handler's commit". Cap `pending` separately from the 64 KiB `scopes` cap: 100 rows × (1 KiB args + `before`).
  - If `actions.jsonl` must stay a separate file, then write the row first, then write the state with `applied_seq = seq`. On replay, a row with `seq > applied_seq` has not had its ops applied. The app applies them before it runs the handler.
  - Either way, the 100-row cap check (S6) happens under the same lock, before the ops apply. The `pending` mark (s9) and s11's kill row then follow from the data rather than from code someone has to remember.
  - This changes R6's held names and shape (ADR-007 amendment item 4). Record it there before the Day 13 freeze, even though nothing is written in v1.

## Should-fix

**S1. `actions.jsonl` "append" conflicts with ADR-007 amendment item 1 ("Every App Group file is written atomically (temp file plus `rename`)").**
- An `O_APPEND` write is not a `rename`. A writer killed mid-write leaves a torn last line.
- The renderer reads the file without the lock for `pending` (s9), and so can the IDE. A reader that fails on the torn line hides every queued row behind it.
- Fix: B2's `pending`-in-`state.json` removes the file. Otherwise rewrite the whole file with temp plus `rename` (at most about 120 KiB at the cap), and say so in s5.1 and the amendment.

**S2. Deleting a widget folder races a tap and can bring the old state back.**
- s5.5: deleting a script deletes `widgets/<id>/`.
- Scenario: a tap is in flight. The extension has `state.lock` open or is about to open it. The app removes the folder. The extension then (a) holds a lock on an unlinked inode while a new writer locks a fresh `state.lock`, so two writers each hold "the" lock; or (b) re-creates `widgets/<id>/state.json` with `O_CREAT`. A new script saved later with the same id inherits the old state, which s5.5 says must start fresh.
- Fix:
  - Only the app creates `widgets/<id>/` and `state.lock`. The extension opens `state.lock` without `O_CREAT`; if it is missing, the tap fails visibly.
  - After every `flock`, `fstat` the descriptor and `stat` the path. If the inodes differ or `st_nlink == 0`, release and retry inside the 200 ms bound.
  - Delete under the lock by `rename` to `widgets/.trash/<id>-<uuid>`, then remove.

**S3. The app can be killed for holding the lock while suspended (0xdead10cc).**
- S4 names this risk only for the extension's wait. The process at risk is the **app**: it takes the lock for handler commits (s5.3), drains, Shortcuts writes and in-app Python writes (s5.5), sometimes from T2 and T3 background time. If iOS suspends it between `flock` and unlock, iOS kills it [recalled]. The data survives (rename), but the kill shows up as a crash in diagnostics and ends the batch.
- Fix:
  - In the app, every locked section runs inside a background-time assertion (`beginBackgroundTask` or `ProcessInfo.performExpiringActivity` [recalled names]).
  - No lock is taken after the T2 expiration handler fires or after `setTaskCompleted`.
  - The app's own lock wait is bounded and runs off the main actor.
  - Add a device gate: suspend the app inside the critical section and record what happens. The Simulator does not enforce this kill [recalled], so a Simulator pass of G-L5-5 says nothing about it.

**S4. Re-running the handler on conflict (s5.3) assumes purity that nothing enforces. The conflict outcome drops the handler's effect.**
- "Re-apply the handler once ... (it is a pure function of state and args by contract)". A Python handler can read the clock, call the network or append to a file. A second run repeats those side effects. If `rev` moved again, the outcome `conflict` "keep[s] the newer state", so the tap's handler result is lost; a log line is not a recovery.
- Fix: rebase ops, not the handler. Keep a short ring of the ops committed by taps since `rev = r`, in `state.json`, with their revs. Commit `apply(ops of taps r+1..r', handler_result)` as one write. Ops are closed and deterministic (S2), so this needs no Python and never runs a handler twice.

**S5. The data-protection class is unstated. Taps on a locked phone can fail.**
- Control Center toggles (s8) and Lock Screen widgets are used while the phone is locked. A temp file plus `rename` takes the protection class of the **temp** file. If any writer creates it with complete protection (or the app's default entitlement sets one), the extension's `open` fails while the phone is locked [recalled behaviour], and that toggle then fails every time the phone is locked.
- Fix: state the class for `state.json`, its temp files, `state.lock` and `actions.jsonl`: complete until first user authentication. Have the one write path (S3 in the chair note) set it on every temp file. Add "toggle a control on a locked device" to G-L5-4 or a new gate.

**S6. A queued row whose handler keeps failing blocks the queue, and "never dropped" then refuses every later tap.**
- s11 defines error, timeout and stuck for live taps. For a drained row it defines nothing: is the row kept, removed or retried?
- If it is kept, a handler that always raises (a script bug, or a result over the 64 KiB cap, `StateTooLarge`) is retried at every T1. The queue grows to 100, and from then on every queued tap is refused with "Open PyWidget to catch up", which opening the app cannot fix.
- s5.3's restore ("if `rev` is still the post-ops value") almost never applies to a row drained hours later.
- Fix: after 3 failed attempts, move the row to `actions.failed.jsonl`. Keep it, show it in the widget's IDE log with the traceback, and set the badge. It leaves the queue but is never deleted. State what the drain does with the row's ops: they stand, or are restored from B2's `before` values.

**S7. A drain does not fit the ADR-007 batch rule.**
- s4.2 drains "at the start of the next T1, T2 or T3 batch". Each row can cost `timeout + 5 s` (s10). The batch rule stops at 25 s (ADR-007 5.1), so a T2 batch fits 2 rows at the worst case. Nothing says whether the rest are deferred, or whether the widget runs that follow in the batch are starved.
- Fix: count drain rows against the batch rule with the same `elapsed + budget_s + 5.0 <= 25` test. Rows left over stay queued (`deferred`). Widget renders in the batch keep their place. Say which goes first.

**S8. `rev` can go backwards, so the `rev` checks can match a stale value.**
- `rev` starts again after S5's `state.bad.json` reset, and after delete and re-create of the same id. A handler holding `rev = r` from before the reset, a queue row's `rev_after`, or `tree.json`'s `state_rev` can then equal a new, unrelated state, and s5.3 commits over it.
- Fix: add `epoch` (a UUID set when the file is created) to `pywidget.state/1`. Every comparison uses `(epoch, rev)`. Cheap now, a format change later.

**S9. In-app Python writes (s5.5) must go through the one write path, with the same `rev` check.**
- `pywidget.widgets.state(id)` reads, mutates and writes back. If Python opens the file itself, S3 is broken. If the Swift side writes without a compare, a tap during the console run is overwritten (lost update).
- Fix: the module calls the Swift type through the bridge. Python never opens `state.json`. A write is a compare-and-swap on `(epoch, rev)`, and a mismatch is an error the script sees. Same rule for Shortcuts' "Set Widget State": whichever process runs it (s0: on 18-26, a shared intent "may" run in either), it uses the same Swift type.

**S10. The widened G-L5-5 tests contention, not crashes.**
- "1,000 interleaved `add` ops each; final `rev` 2,000" proves mutual exclusion. B1, B2, S1 and S2 are crash and race cases it will not find.
- Fix: add a kill test. Run the two writers plus a drainer, and `SIGKILL` one at random points (after the temp write, between ops and queue row, mid-drain, during folder delete), 1,000 kills.
  - Invariants: `state.json` always parses; `(epoch, rev)` never decreases; every `tap_id` ends in exactly one of {handled, pending, failed, refused-and-logged}; no handler runs twice for one `tap_id`.
- Run G-L5-5 once on a device before 1.1 ships. The Simulator's processes run on the Mac kernel and file system, so it proves macOS `flock`, not the iOS sandbox or data protection (S5).

## Nits

**N1. "Lock hold time is ... microseconds" (s5.2).** Measured on this Mac (macOS 27.0.1, APFS, Python, host only, not iOS): lock, read 64 KiB, parse, `rev += 1`, write the temp file, `rename`, unlock. n=500: median 0.45 ms, p99 2.2 ms, max 3.9 ms; with `fsync` before `rename`: median 0.54 ms, p99 2.3 ms, max 5.6 ms.
- That is milliseconds, inside the 200 ms bound. Write "milliseconds; p99 measured in G-L5-5 on device".
- Add `fsync` on the temp file before `rename`: it cost about 0.1 ms at the median here. Without it, a device crash or power loss after the `rename` can leave a short file. S5 catches that as `state.bad.json`, but the state would still be lost.

**N2. `flock`, not `fcntl` locks, and the write path is not reentrant.** Say so in the one-write-path type. `fcntl` record locks are per process and are released when any descriptor to the file closes, so two Swift tasks in the app would not exclude each other. With `flock`, a nested call on a new descriptor in the same process fails `LOCK_NB` against itself.

**N3. `state.bad.json` is overwritten by a second corruption.** Use `state.bad.<ts>.json`, keep the last 3. Make the swap a single `rename` of the fresh file over `state.json` after copying the bad one aside, so a reader never sees "no file" in between.

**N4. A device upgraded to 27 with rows still queued.** A `WidgetActionIntent` tap then runs before the older queued rows. Either drain first or state that order across the upgrade is not kept.

**N5. "A counter on two Home Screen pages shows the same count" (s5.1).** That holds only after the second instance reloads. The system reloads the widget that was tapped [recalled]. State whether the write path calls `reloadTimelines(ofKind:)` after each commit, and fold the budget question into G-L5-2.

**N6. LOCK_NB retry interval is unstated.** Name it (for example 5 ms, at most 40 tries) so the 200 ms bound is testable, and log the wait time per tap so the device p99 can be read later.

## What I did not check

- The op definitions' edge cases (s3.2: `cycle` with negative `by`, `add` on a non-number).
- The signing in s7.2.
- The control kinds in s8, apart from where they write state.
- Whether the ADR-007 amendment's item 2 list matches s3.2 exactly. It does by eye: 7 ops, same names.

## Author's replies (Idris, 2026-10-26 00:24 ET)

Read: this review (508b6e4b) against L5 s4.2, s5, s9, s11, s13 and ADR-007's chair amendment. Every finding is answered below; the accepted ones are in L5 s5 as dated notes (s5.0 and the notes in s5.1-s5.5, s5.6-s5.8 new). Lock timing in the spec is now Odalys's host number (N1), not my "microseconds". Counts: 16 accepted as written, 2 accepted with an amendment (B2, S4), 0 rejected.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Author&#x27;s replies (Idris, 2026-10-26 00:24 ET), scrolls sideways" data-n="1" style="--tw:620px" markdown="1">

| # | Reply | What changes in L5 |
|---|---|---|
| B1 | **Accept.** I wrote "drain, then truncate" as if the drain held the file still; it runs Python for seconds per row with the lock released. Both scenarios are real. With B2's form the done-marker is the row's removal from `pending` in the same commit as the handler's result, so no separate `queue_done` is needed; `seq` stays for order and for the kill test. | s5.1 layout, s5.6 |
| B2 | **Accept, amended.** One locked write-ahead commit (ops result plus pending row) on every handler path, before any Python, in the form you call simplest: `pending` inside `state.json`; `actions.jsonl` is dropped. Amendment: `before` is kept only on rows from the live paths (27+ intent, `open_app` link), where a failed handler restores the tap; a `queue` row carries no `before`, because its ops stand if its handler later fails (S6 reply). That keeps `before` off 100 queued rows and the file small. A live row whose process dies loses `before` at the next batch and is handled as a queued row (s11's "runs at the next T1", now with the row that makes it true). | s5.1, s5.3, s5.6; s4.2, s11 notes |
| S1 | **Accept.** Resolved by B2: no append file remains; the extension writes only `state.json`, by temp file plus `rename`. | s5.1, s5.2 |
| S2 | **Accept, all three.** Only the app creates `widgets/<id>/` and `state.lock`; the extension opens the lock without `O_CREAT` and fails the tap visibly if it is missing; after every `flock`, `fstat` the descriptor against `stat` of the path (inode and `st_nlink`), retry inside the bound on a mismatch; delete by `rename` to `widgets/.trash/<id>-<uuid>` under the lock, then remove. Found while checking this: the v1 schema's widget `id` pattern `^[A-Za-z0-9_.-]{1,128}$` accepts `.`, `..` and `.trash`, and v1 already uses the id as a folder name (`widgets/<id>/tree.json`). That is a v1 path bug, not a 1.1 reservation; T-0106 note. | s5.7 |
| S3 | **Accept.** Every app-side locked section runs inside a background-time assertion; no lock after the T2 expiration handler or `setTaskCompleted`; the app's wait is bounded and off the main actor. New device gate G-L5-7. | s5.7, s14 note |
| S4 | **Accept, amended.** Rebase ops, never re-run the handler. `state.json` keeps `ops_log`, the last 16 committed op lists with their revs. A handler that read `(epoch, r)` commits its result with the ops of revs r+1..r' re-applied on top, in one write. Amendment: if the window holds a commit that is not ops (a Shortcut is ops; an in-app Python write is not), or r is older than the ring, the row goes to `failed` with reason `conflict` (kept and shown, S6), not "keep the newer state and log". One interpreter means two handler commits cannot overlap, so this is the 16-taps-in-one-handler-run case. | s5.3, s5.1 |
| S5 | **Accept.** `state.json`, its temp files, `state.lock` and `failed.jsonl`: complete protection until first user authentication [recalled: `NSFileProtectionCompleteUntilFirstUserAuthentication`], set by the one write path on every temp file it creates. Locked-device toggle added to G-L5-4. | s5.7, s14 note |
| S6 | **Accept.** After 3 failed attempts a row moves from `pending` to `widgets/<id>/failed.jsonl` (app writes it, temp plus `rename`), shown in the widget's IDE log with its traceback and the badge set; kept until the person clears it or deletes the widget. A queued row's ops stand when its handler fails. The 100-row refusal counts `pending` only, so a broken handler can no longer lock the queue. | s5.4, s5.6 |
| S7 | **Accept.** Each drained row counts against the batch rule with the same `elapsed + budget_s + 5.0 <= 25` test. Order per widget: its pending rows oldest first, and the last successful handler's tree is that widget's render in the batch (an action run returns state and tree, R7), so rows replace the render rather than starving it; widgets without rows keep their place. Rows left over stay pending (`deferred`). | s5.6 |
| S8 | **Accept.** `epoch` (UUID at file creation) in `pywidget.state/1`; every comparison is on `(epoch, rev)`, including `tree.json`'s `state_rev`, which becomes `state_at: [epoch, rev]`. | s5.1, s5.3 |
| S9 | **Accept.** In-app Python reads and writes state only through the Swift write path via the bridge; a write is compare-and-swap on `(epoch, rev)`, a mismatch raises in the script. "Set Widget State" uses the same type in whichever process runs it. Module name stays Pernille's (s15 Q4). | s5.5 |
| S10 | **Accept.** G-L5-5 gains the kill test with your four invariants and one device run before 1.1 ships. | s14 note |
| N1 | **Accept.** s5.2 now cites your numbers (median 0.45 ms, p99 2.2 ms, max 3.9 ms; with `fsync` median 0.54 ms, p99 2.3 ms, max 5.6 ms; host, n=500, 64 KiB) and adds `fsync` before `rename`. B2 makes the file larger (whole-file cap 256 KiB, s5.4); that size is unmeasured and is a G-L5-5 row, not an assumption. | s5.2 |
| N2 | **Accept.** `flock`, not `fcntl`; one in-process serial gate in front of `flock`, so two tasks in the app never meet the lock against each other; not reentrant, said in the type's doc. | s5.7 |
| N3 | **Accept.** `state.bad.<ts>.json`, last 3 kept; copy aside, then one `rename` of the fresh file over `state.json`. | s5.7 |
| N4 | **Accept, as stated order.** Within a batch rows run by `seq`. A live 27+ tap does not wait behind older queued rows (that would make it late, which is what 27+ removes); order across the upgrade is not kept, and the spec says so. | s5.6 |
| N5 | **Accept.** Wording now "after its next reload". After an app-side commit the write path calls `reloadTimelines(ofKind:)`; after an extension commit it relies on the system's reload of the tapped widget [recalled], and G-L5-2 records whether other instances of the kind follow. | s5.1, s14 note |
| N6 | **Accept.** `LOCK_NB` retry every 5 ms, at most 40 tries (200 ms); wait time logged per tap. | s5.7 |

</div>


**What v1 must reserve now (before Day 13).** Nothing new in v1 code. `state.json` is not written or read by v1 (R13 dropped), the extension and app update together, and iOS has no downgrade, so no v1 file on a phone constrains this layout. The real deadline for B1/B2 is the first 1.1 build that writes state, which is gated (chair S7). What v1 holds is doc only, in the ADR-007 amendment item 4: the names `state.json` (fields as L5 s5.1), `state.lock`, `failed.jsonl`, `widgets/.trash/`; `actions.jsonl` released. One v1 code change does come out of this review, and it is a fix rather than a reservation: the widget `id` pattern must reject a leading `.` (S2 reply).

**Board.** T-0105: no change. T-0106: one added item, the `id` pattern (S2 reply); the `pending` env string is unchanged, only its source moves from `actions.jsonl` to `state.json`. T-0107: no v1 change; S9 goes to Pernille for 1.1.

**For the chair (Ines), one line.** B1, B2, S1, S6 and S10 change your s15 conditions S1 (the extension writes only `state.json`; `actions.jsonl` dropped), S6 (refusal counts `pending`; failed rows move to `failed.jsonl` after 3 attempts) and S7 (G-L5-5 adds the kill test and one device run), and ADR-007 amendment items 1, 4 and 6; please rule on them.
{% endraw %}

</div>
