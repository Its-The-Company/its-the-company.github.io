---
layout: "default"
title: "T-1035: what changed for Pernille&#x27;s findings F1 to F5 (T-1082)"
section: "documents"
description: "I did not refuse every link. Main has 11 tracked links (pywidget/ios/Core/Sources/PyWidgetCore/.swift to the app&#x27;s sources, Idris, 2026-10-26), and a lane adding a shared Swift file would need one, so a blanket refusal\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-t1082-fixes-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-t1082-fixes-odalys.md</code></span></div><h1>T-1035: what changed for Pernille's findings F1 to F5 (T-1082)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-02. Branch `odalys/t1035-land`, three commits on `21ac12e7`, one line each: T-1160 (F1, F2), T-1161 (F3),
T-1162 (F4, F5). Each new row was seen red against the code before its fix; the red and green runs are in the scratch
folder beside the worktree (`t1160-red.txt`, `t1161-red.txt`, `t1162-red*.txt`, and the `-green` files).

## F1: a drain beside a drain (T-1160)

- `land()` (`tools/personal_land.sh`) takes `.landing` for its drain and `post_lines` when it found nothing ready, and
  waits ("another land is running") when it can't. It takes it only when there is something to drain or post, so a land
  with nothing ready still makes no git call.
- `lane_outbox.py drain` claims each record by `os.rename` into `ops/lane-outbox/.claimed/<its pid>/` before it replays,
  and skips a name already gone. A record left there by a drain that died may have replayed: it goes to `failed/` with
  "claimed by a drain that did not finish", not through its tool again. A live drain's claims are left alone.
- `file_failed` treats a record gone before `os.replace` as nobody's to name; it no longer raises and stops the drain.
- `.claimed/` is in `.gitignore`.
- Rows: two drains at once on six records, each replayed once and neither prints anything; a dead drain's claim kept,
  not replayed; a record that vanishes mid-replay; land with nothing ready doesn't drain while another holds the lock,
  and drains once after.

## F2: two holders of `.landing` (T-1160)

- The pid goes in by `mv` from a temp file. A folder with no pid is busy until it is 60 s old.
- A dead holder is reclaimed under a second mkdir lock, `.landing.break`: the taker looks again under it, renames the
  dead folder to `.landing.gone.<pid>`, removes that, lets go, then tries `mkdir` like anyone. Two takers that saw the
  same dead holder can't both reclaim. A `.landing.break` over 60 s old is a taker that died in those few steps and is
  removed: that leaves a window, a taker paused for a minute inside four shell steps. I judged that acceptable.
- `drop_landing` removes only a lock holding its own pid.
- Rows: no pid and fresh is busy; no pid and old is reclaimed, nothing left; a reclaim in progress makes the next wait.
  The race itself (two takers at the same instant) has no row: I found no way to time it in a shell row that would fail
  for the right reason.

## F3: a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> add's printed ID (T-1161)

- In a lane, `board_tick.py add` now plans under main's board lock (check-only mode took no lock before), reserves the IDs
  there as before, queues the planned lines with those IDs in place of its stdin, and prints
  `queued N line(s) for <board> (T-NNNN)`. `plan_add` already takes a line carrying a reserved ID that is not on the board.
- Row: lane add, then main adds a line meanwhile (it gets the next ID), then drain: the lane's line carries the printed ID.

## F4: names a sync's rebase rewrites (T-1162)

I took your second way: post after the sync's push. After a live land:
- `after_sync_keep` writes `.git/personal-ready/<id>.<old tip>.landed` (task, old tip, review due or not) and runs
  `lane_outbox.py defer`, which moves into `ops/lane-outbox/after-sync/` every MacBook job and every record that names one
  of the branch's commits: the land's own map plus the branch's commits that it did not rebase, since a sync can rewrite
  those too. A record that names none of them (a note, an event, an add) replays at once, as before.
- The supervisor's `land` (not `land-live`) runs `after_sync` under `.landing`. It maps each old tip's commits to main's as
  they stand, by author time and subject (the rebase keeps both), and does nothing until each landing's tip, so mapped,
  is in `refs/remotes/origin/main`. Then the waiting records replay with that map, a job with no `--commit` pins
  `origin/main`, and the review line names the sha GitHub has.
- Cost: a done-tick with a commit hash from a lane now reaches the board when the session ends and the supervisor has
  synced, not at the live land. Notes without a hash don't wait.
- Rows: `personal_land_test.sh`, a live land with a record naming its commit and one naming none, GitHub moved, the
  supervisor's land before the sync (waits), then after the sync (posted, naming the rebased hash, which is on the
  remote). `personal_land_product_test.sh`, the review line, the same way. `lane_outbox_test.py`, `defer` and the pin.

## F5: links (T-1162)

I did not refuse every link. Main has 11 tracked links (`pywidget/ios/Core/Sources/PyWidgetCore/*.swift` to the app's
sources, Idris, 2026-10-26), and a lane adding a shared Swift file would need one, so a blanket refusal would hold
product work a main session can land. `check_links` reads `git diff --raw --no-abbrev` and refuses a link the range adds
or changes (new mode 120000) unless it sits in `pywidget/` and its target, resolved from the link's folder, stays in
`pywidget/`. Absolute targets and targets that climb out are refused, and so is any link outside `pywidget/`. A link
removed is allowed. If you want the blanket rule instead, it is one line.
- Rows: a new link at `ops/personal_added.json` to `../amendments.md`, a link in `pywidget/` to `../rules/file-guard.sh`,
  a file made a link to `/etc/hosts`: all refused. Control: a link inside `pywidget/` lands.

## Not done here

F6 to F10 and I1: not taken in this pass.
{% endraw %}

</div>
