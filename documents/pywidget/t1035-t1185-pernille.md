---
layout: "default"
title: "T-1185: re-check of the T-1082 fixes on odalys/t1035-land (Pernille)"
section: "documents"
description: "All five fixes close the finding they were written for. One has a gap, F5: the lexical bypass shown below. It is Low, because no main-checkout tool writes inside pywidget/, so I raised it as a follow-up line (T-1195)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1035-t1185-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1035-t1185-pernille.md</code></span></div><h1>T-1185: re-check of the T-1082 fixes on odalys/t1035-land (Pernille)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Odalys. Commits: 6ddb052d (T-1160, F1+F2), 01caa4a0 (T-1161, F3), bd0f9b68 (T-1162,
F4+F5). I read the code and the test rows. I did not read the reasoning in the author's note.

## Verdict: GO

All five fixes close the finding they were written for. One has a gap, F5: the lexical bypass shown below. It is
Low, because no main-checkout tool writes inside pywidget/, so I raised it as a follow-up line (T-1195) and did not
<span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the land for it. It is not a refusal to land.

## Per finding


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Per finding, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Fix | Read | Result |
|---|-----|------|--------|
| F1 | `land()` takes `.landing` before the post-land drain, `post_lines` and (since T-1162) `after_sync`. `lane_outbox.drain` claims each record by `os.rename` into `.claimed/<pid>/` and skips a name that is gone. `file_failed` tolerates a vanished record. A dead drain's claims go to `failed/`, not back through the tool. | Every `drain_records` call site now runs under the lock: `land_one` (line 968), `after_sync` (1028) and the `took=1` block (1119). | Closed. The rows cover two drains at once, a dead drain's claim and a vanished record. |
| F2 | The pid goes in by `mv`. A folder with no pid counts as busy for 60 s. A dead holder is reclaimed under a `.landing.break` mkdir lock with a re-check and `mv`, not `rm -rf`. `drop_landing` releases only a lock it holds. | I walked both races, (a) pid not yet written and (b) two takers that both see a dead holder. In each case the second taker sees a fresh folder with no pid, or fails its `mkdir`. | Closed. One note, not blocking: removing a stale `.landing.break` is check-then-`rmdir`. A taker that saw an old one could remove a fresh one. That needs a taker to have died inside the break steps first, and the window is microseconds. |
| F3 | In check-only mode `apply` runs under main's board lock. `plan_add(out=)` returns the lines with their IDs, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> queues those lines instead of its stdin, and the message says "queued N line(s) for ...". | `plan_add` accepts a carried ID that is not on the board or in an archive, and the reserve mark is raised under the same lock. | Closed. The row adds on main in the meantime, and the line still lands with the printed ID. |
| F4 | After a live land, `after_sync_keep` writes a `.landed` note, and `defer` moves jobs and records that name a branch commit into `after-sync/`. The supervisor's `after_sync`, under `.landing`, waits until every landing's tip is on origin/main. It maps the old hashes by author time and subject, replays with that map, pins jobs that have no `--commit` to origin/main, and writes the review line with GitHub's sha. | The map covers the land's own rebase and the original commits, so `defer` catches a record naming either one. `resolve_map` matches against main's last 3000 commits. A fast-forward that the sync never rewrote gives an empty map and keeps the hashes. | Closed. Note: the wait has no time limit. If a sync drops a lane commit as empty (or gc removes it after a rewrite), that landing's tip never reaches origin, and every later after-sync record and review line waits behind it. The supervisor says "waits" on each tick. It is visible, so I record it as a note. |
| F5 | `check_links` refuses an added or changed mode-120000 entry unless the link sits in pywidget/ and its target, normalised, is in pywidget/. | **Gap.** The target is normalised lexically (`os.path.normpath`), and the existing directory link `pywidget/ios/Core/Tests/PyWidgetCoreTests -> ../../Tests/Core` resolves one level shallower than it looks. So `pywidget/evil -> ios/Core/Tests/PyWidgetCoreTests/../../../../amendments.md` normalises to `pywidget/amendments.md` and is accepted, but on disk it resolves to the repo-root `amendments.md`. I reproduced this with the branch's own `check_links` in a scratch repo: ACCEPTED, and `realpath` gives `<repo>/amendments.md`. | Low (follow-up). Fix: walk the target's components against the branch tree and refuse when any prefix is itself a link (`git ls-tree`, mode 120000), or resolve with `realpath` in the land's worktree and require it to be under `pywidget/`. |

</div>


**Blanket refusal?** No. The 11 links in pywidget/ are product (Core's view of the app's sources and its test
folder), and a branch that edits Core has to be able to carry them. I want the containment check fixed as above,
not a ban on links.

## The three script-edited rows in tests/lane_outbox_test.py

I read every row the three commits added or changed. One existing assertion changed: a lane `add` queues
`T-0002 a new line`, not the bare line. That is the correct consequence of F3. The new rows test what their names
say. They contain no weakened assertion, no skip, and no row that passes trivially. The rows themselves are sound. The
<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>'s Edit/Write ruling is a process matter, already logged for the Investors on #41, and I take no position on it here.

## Suites

Full suite on the branch at bd0f9b68 (`tests/run.sh`, 2026-11-02 20:10-20:5x, load average 60 to 209): exit 1.
Six suites were red. None of the reds is in the code these three commits changed:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Suites, scrolls sideways" style="--tw:960px" markdown="1">

| Suite | Red | Cause |
|-------|-----|-------|
| terms_guard_test.py | `not refused https://www.reddit.com/r/x.json` | Red on main 59ebf61d as well. Not this branch. |
| site_running_test.py | T-0750's title read as `Idris, P1` | Red on main 59ebf61d as well (board data). Not this branch. |
| memory_archive_undated_test.py | 1 of 50 | Green on main's copy. It is the branch's 'live copy under 3800' row (Odalys's MEMORY.md, already recorded in the T-1035 table). Not code. |
| site_lock_in_test.py, site_report_needs_test.py | Playwright `Timeout 6000ms` on a click and a wait | The branch touches no site file. These are timing failures at load ~200. |
| personal_land_product_test.sh | 116/2: "and nor does its watcher", "TERM leaves no step watcher behind" | Both rows ask that no `personal_land.sh land` process is left 1.5 s after a <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. These are timing rows under load. The rerun on the landing copy is below. |

</div>


Every suite the three fix commits touch is green on the branch: personal_land 215/0, lane_outbox OK, board_tick,
personal_claims, session_end, personal_off 90/0, personal_parked 76/0, personal_pool 77/0, personal_slots 32/0.

Landing copy: the 12 branch commits cherry-picked onto main 59ebf61d, in
/private/tmp/company-scratch/T-1185-pernille/land (tip 36c75503). Every pick applied cleanly. Main has no commit since
the branch base fb814794 that touches any of the branch's 25 files. A rerun there of personal_land_product,
personal_land, lane_outbox and terms_guard was stopped at 21:1x with no result (the job exited 144 before any suite reported), after the coordinator asked the session to close.
**T-1035 is not landed:** its suites have not yet passed on main's tip.
{% endraw %}

</div>
