---
layout: "default"
title: "T-1082: independent review of T-1035 (personal-account parity)"
section: "documents"
description: "The parity work is real, and most of it is right. The lane list and the test lock are gone, the menu is every runnable line, records go through a queue instead of hand edits, and Investor-owned paths are still refused\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-t1082-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-t1082-pernille.md</code></span></div><h1>T-1082: independent review of T-1035 (personal-account parity)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. Branch `odalys/t1035-land`, head `21ac12e7`, 9 commits on main `fb814794`, read in the worktree
`/private/tmp/company-scratch/T-1035-odalys/wt` (`git diff fb814794..21ac12e7`, 23 files). I read the code and the tests,
not the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line. The rule it must meet: enabled personal accounts get the main account's access, functionality and
settings, and tasks route to each account equally (amendment 2026-11-02 11:37). Commandment 2's personal-data ban and
Commandment 6 stand.

## Verdict: PASS with fixes

The parity work is real, and most of it is right. The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> list and the test lock are gone, the menu is every runnable
line, records go through a queue instead of hand edits, and Investor-owned paths are still refused against main's
`rules/file-guard.sh` list (`.claude/agents`, `.claude/hooks`, `rules/hooks` included). No commit is lost when a land fails:
every `give_up` and `put_back` path puts the worktree back to `TIP` and leaves main alone with a session running. I found
no way for a branch to land an Investor-owned *path*. It still must not land as it stands. Two things can answer a task
twice or make up an ID: F1, F2 and F3. F4 and F5 are cheap and belong in the same pass. Fix lines for Odalys: T-1160
(F1, F2), T-1161 (F3), T-1162 (F4, F5). F6 to F10 are notes for her to take or decline.

## Suites (run by me, foreground, in the worktree at 21ac12e7)

The 15 lane-related suites are green: `personal_land_test.sh` 203/0 (333 s), `personal_land_product_test.sh` 116/0,
`personal_pool_test.sh` 77/0, `personal_off_test.sh` 90/0, `personal_parked_test.sh` 76/0, `personal_slots_test.sh` 32/0,
`personal_claims_test.py` 107/0, `board_tick_test.py` 168/0, `session_end_test.py` 30/0, `personal_wait_test.py` 12/0,
and `lane_outbox_test.py`, `board_lanes_test.py` and `personal_lane_test.py` OK (3 skipped). That confirms the branch's
own claim for these suites.

**Not confirmed by me: the full 247 of 249.** Load average was 50 to 120 at the time. I started the full run twice, and
the session's background limit stopped both at 20 minutes, before `tests/run.sh` prints anything. The figure stands only
on Odalys's own two full runs in `ops/runs/test-runs.jsonl` (16:09 at de18c8a5, 16:31 at 21ac12e7: red
`memory_archive_undated_test.py` and `site_running_test.py`, 1216 s). Neither of those is about this branch.

No row exercises F1 to F5 below. Every suite here is single-landing, and none of them runs two lands or two drains at once.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:769px" markdown="1">

| # | Sev | Where (branch line) | What fails |
|---|---|---|---|
| F1 | Medium | `tools/personal_land.sh:994` (`land()`), `:744` (`drain_records`), `tools/lane_outbox.py:146-163` | `drain_records` runs outside `.landing` whenever `land` finds no ready branch. The supervisor's `land` runs its drain unlocked on every tick. A `land-live` that is part-way through its drain when the session ends still has its records listed. Each record replays in its own subprocess, up to 120 s each, so the supervisor's drain can overlap it. Both walk the same `*.json` list, and a record either one opened before the other unlinked it replays twice: a second board line, a second event, a second MacBook job. If the file is gone by the failure branch, `os.replace` at `lane_outbox.py:162` raises `FileNotFoundError` outside the `try`, and the rest of the drain stops. **Fix:** take `.landing` around every drain, not just a land. In `drain`, claim each record with an atomic `os.rename` into `ops/lane-outbox/.claimed/` before it replays, and skip a name that is already gone. |
| F2 | Medium | `tools/personal_land.sh:465-474` (`take_landing`) | There are two races in the lock. (a) It runs `mkdir`, then writes the pid in a second step. A second taker that arrives between the two reads an empty pid, takes the lock for a dead holder, removes it with `rm -rf` and takes it, so both <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> it. (b) Two takers can both see a really dead holder. Both remove it with `rm -rf` and then `mkdir`, and the second removal deletes the first one's fresh lock. Either way two lands run at once: two rebases and two ff-merges on main, plus F1. The window is small. Three slots on each of two accounts all call `land_now` at the end of a session, so it gets tried often. **Fix:** write the pid to a temp file and `mv` it into the folder before the lock counts as taken. Treat an empty pid as busy until the folder is over 60 s old. Reclaim by `mv`, not `rm -rf`: rename the stale folder to a unique name, then `mkdir`. |
| F3 | Medium | `tools/board_tick.py:770-779`, `:926-929` | In a lane, `board_tick.py add` runs `plan_a` in check-only mode. That still calls `raise_reserved` on **main's** `.ids` mark, and it prints `added 1 line(s) to <main board> (T-NNNN)` before `queued in ...`. The stdin that gets queued is the original one, with no IDs. At replay, `plan_add` hands out IDs again from a reserve that is now higher, so the line lands as a different ID. The ID the worker was shown is burned and points at nothing. A worker who slices a task and commits `T-NNNN: ...` for the slice gets a commit that names no line. The tick's `NAMED` and the `attempts` reading are then wrong too. **Fix:** in check-only mode, queue the planned new lines *with* their IDs. `plan_add` accepts a line that carries an ID that is reserved and not yet on the board. Make the message say "queued", not "added". Add a row: lane add, then drain, then the line on main carries the printed ID. |
| F4 | Medium | `tools/personal_land.sh:913` (no push in live mode), `:731-738` (`review_line`), `lane_outbox.py` `hashmap`/`swap`, `tools/supervisor.sh:150-165` | A live land merges with no push and leaves the push to "the next sync". That sync is `git pull --rebase --autostash` (and `-X ours` on a conflict). If origin has moved, it rewrites every unpushed commit, and Investor edits on GitHub move origin (`7384b41a` today). The lane's commits then get new hashes. The review line `read T-x at <sha>`, every hash `drain` swapped into a board note or event, and a queued job's `--commit` all name commits that are no longer on main. A reviewer can't find the commit, and the MacBook runner can't check it out. Before this branch, land pushed at once, so this didn't happen. **Fix:** name the landed work in a form that survives a rebase. Either write the review line with the task ID and the commit subjects, or post it from the supervisor's land *after* its sync has pushed (`later`), resolving the hash then. Make the job's `--commit` default to main's HEAD at the post-sync drain. |
| F5 | Medium | `tools/personal_land.sh:504-524` (`check_owned`) | `check_owned` reads the names of changed paths. Since this branch, a lane can land anything outside the owned list, symlinks included (mode 120000). Example: a branch replaces `ops/personal_added.json`, or any file a main-checkout tool writes, with a symlink to `../amendments.md`. The next write by that tool goes through the link into an Investor-owned file, and no guard sees the path. Under `LANE_LIST=(pywidget)` this had a much smaller surface. **Fix:** refuse a branch that adds or changes a symlink. `git diff --raw` shows mode `120000`, which gives a one-line check, and a main session has no need to land symlinks either. |
| F6 | Low | `tools/personal_tick.sh:485-487` | Fable on the lane is gated on the account's *whole* week being under 50%. Main gates on Fable spend against `fable_budget`, and also on `fable_blocked_until` (`governor.py:833-842`). The lane reads neither of these, nor `investor_queue`'s `fable_paused`. `COMPANY_FABLE_OK` also turns true after `preflight` has judged the session with it false, against the comment at line 186 that the environment is "set now so that preflight judges what the session will really have". The <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> it applies is a fair proxy, since there is no per-account Fable meter. Set it before `preflight`, and say in the table that it is a proxy. |
| F7 | Low | `tools/personal_land.sh:825-850`, `:807` (`put_back`) | When a live merge is refused because the session has a file the branch changes open (dirty), the branch is put back and green checks are thrown away. Every slot's next tick reruns the full checks, which can include 900 s of waiting for Xcode plus the unit target, and holds the Mac mini's Xcode lock against the session's own workers. **Fix:** before running checks, compare the branch's changed paths with `git status --porcelain` in the main checkout. If they overlap, wait without testing. |
| F8 | Low | `.gitattributes:3-5` | `merge=union` on memory and `log/*.md` keeps both sides of a conflicting hunk. Case: main trims a memory file (archives lines) while a lane appends to the same file. The rebase then puts the trimmed lines back, and the 4 KB cap (Commandment 13) breaks silently. The attribute also applies to the supervisor's own `pull --rebase`, not only to lanes. **Unmeasured:** my scratch-repo probe of this was refused by the security guard (see below), so this is from git's documented union behaviour. Keep union for the append-only `log/*.jsonl` only, or add a row that pins the memory case. |
| F9 | Low | `tools/personal_tick.sh:689-692` | A branch that holds only records, from a session whose tasks left no commit, is marked ready under `QUEUE[0]`. That same task is also counted a try and its claim is given back. A later "did not land" line then names a task that was never done. Use a neutral name for a records-only marker. |
| F10 | Low | `tools/personal_tick.sh:191`, `:349`, `:710` | `land_now` runs `land-live` in the slot's own tick, under its tick lock. That can last up to `LAND_LIVE_TOTAL_SECONDS` 3000 plus one 1500 s branch, and the slot starts no session in that time. This is not a fault, but slower than the table says. A `TERM` to the tick in that time holds the branch with a board line (`on_term`), where it used to wait. |
| I1 | Info | `tools/personal_land.sh:37-41` | A lane can now change `tools/personal_land.sh` and `tests/`, which includes its own gate and the suite that passes it. The check that refuses owned paths is main's copy only for the land that changes it. After that the next land runs the branch's copy. A main session can do the same, and the Investors accepted the lane's security risks (2026-11-01 10:59), so this is not a fix line. It should be in the Limits paragraph in those words. |

</div>


Checked and found sound:
- bash 3.2: `/bin/bash -n` passes on both scripts. `next_ready` is the right fix for the `case`-inside-`$(...)` bug, and no other `case` sits inside a substitution.
- A branch that fails after a live rebase goes back to `TIP` (`give_up` with `MOVED=1`, `put_back`). Main is never reset with a session running.
- Tick and land don't share a worktree: a slot with a marker starts no session (`personal_tick.sh:349`).
- `lane_id` refuses the main checkout (where `.git` is a folder), and `tests/run.sh` unsets `COMPANY_LANE`, so suites never queue.
- `land_now` strips the session's own environment names (`ENV_OFF`). Nothing from the account's profile reaches a land.
- A replayed record can reach only `board_tick`, `events` or `jobs`, from main, with `BOARD` removed. No record names a path of its own.

## Guard refusal (T-0848)

At about 16:55, a probe of F8 was refused by `rules/hooks/security-guard.py`: `git rebase` in a throwaway `git init` repo in my
scratch folder, read as "brings GitHub's changes in during a session". I stopped that item there and used no other route.
F8 stays unmeasured. To log: the guard reads any `rebase` as a pull, even in a repo with no remote.
{% endraw %}

</div>
