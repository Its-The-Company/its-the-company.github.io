---
layout: "default"
title: "T-3451: what reaches main without a check first"
section: "documents"
description: "Baseline window: 2026-11-01 to 2026-11-08 12:xx ET, main first-parent line, n = 3775 commits."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t3451-main-unchecked.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/t3451-main-unchecked.md</code></span></div><h1>T-3451: what reaches main without a check first</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Baseline window: 2026-11-01 to 2026-11-08 12:xx ET, main first-parent line, n = 3775 commits.

Method. Git cannot say "this commit came through tools/personal_land.sh"; the land markers (.git/personal-ready/*.landed) keep
only 4 tips still on main. So the proxy is the committer identity: a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s land keeps the worker's or Operator's
committer address (odalys@company, operator@company, ...); a commit made in the main folder carries the main account's
noreply address. Direct = main-account committer (1717 of 3775, 45%); land = the rest (2058). The proxy can mislabel
a lane commit the main account re-committed, so read direct as an upper bound.

Counts (commits touching the group; a commit can touch several):
- product (pywidget/, project.yml): 409 direct, 124 land. Authors of direct: Idris 154, Pernille 124, Maren 46, Wrenna 31, Odalys 30, Ines 19, other 5.
  tools/main_gate.py audit --since 2026-11-01: 13 of 298 gated commits had a passed MacBook job before main (4.4%); the hook
  went live 11-07 10:38 ET, and from 11-07 20:00 the share is 7 of 9 (direct 4 of 4).
- tools/ : 251 direct, 228 land. Direct: Odalys 213, Idris 15, itsthecompany 9, Pernille 5, Ines 5, Wrenna 3, Operator 1.
- tests/ : 247 direct, 220 land. Direct: Odalys 217, Idris 14, itsthecompany 9, Wrenna 3, Pernille 2, Ines 2.
- tools or tests together: 279 direct, 252 land. No hook covers these; main_green.py checks main's tip afterwards.

Reds traced. tools/main_green.py: 0 reds since 11-01 that I can find (no "Make main's own tests pass again" line in
ops/board.md history or the board archives since 11-01; its 10 kept logs are all green; main_restore.jsonl does not exist
yet, T-3448 has not seen a live red). Sample is small: the board keeps ticked lines only until archived, so this is "found none", not proof of none.
One red of main by a direct commit is on record: eab3728af (11-04, product, Idris's slice, main-account committer), named in T-3630;
it predates the hook and is a product path, which the hook now gates.

Decision. The counts show no red from tools/ or tests/ direct commits, so no extension of the hook's host check is proposed.
Re-count when OPT-119's read (11-14) comes in, and again if main_restore.jsonl gets a row.

## Re-count, 2026-11-09 06:45 ET (Odalys)

Window: 2026-11-01 00:00 to main 31c4589b1 (11-09 06:32), first-parent, n = 4313 commits. Read-only: git log, the
main_green record, the supervisor log. Counting script kept in scratch (T-3451-odalys/count.py), not a tool.

Road, by committer identity (git keeps no "came through the land" mark): the land rebases with the Operator identity, so
committer Operator with another author = land (677); a worker committer address = a lane branch fast-forwarded by the
land (619); Operator author and committer = the supervisor's and lander's own commits (1256, hook-exempt); the main
folder's account = direct (1696); GitHub web = Investors' commits (65). A green main_gate verdict counts only where the
hook covered that path at the commit's time: product from 74f5a5670 (11-07 10:38), tools/ tests/ site/ from dc36d3896
(11-09 05:22).

Commits that reached main with no check first, by path group (a commit can touch several):
- tools/: 291. Odalys 222, Operator 28, Idris 15, itsthecompany 10, Pernille 5, Ines 5, Wrenna 3, Investors 3.
- tests/: 272. Odalys 226, Operator 15, Idris 14, itsthecompany 10, Wrenna 3, Pernille 2, Ines 2.
- pywidget/: 421: 412 direct before the product hook went live, 9 Operator's own. (1 direct after it, hook-covered.)
- site: 0 outside the land.
- ops/: 2030 and other: 830 (direct, Operator and GitHub web); no hook covers them and none is meant to.
- Direct tools/ or tests/ commits since the T-3795 hook went live: 0 (one hour of data).

Reds from tools/main_green.py since 11-01 (it started 11-06): 1 of 23 completed checks (22 green, 174 skipped; ops/runs/supervisor.log).
T-3715, main 81d978ece, 11-08 18:19: widgets (3.9.6), 2 subtests of test_premade_sensor_timeout, 'interrupted' != 'ok'.
Attribution method: (1) main_green's own bisect (main_restore.jsonl): undecided, the suite passes alone at 81d978ece;
(2) inputs: the 61 commits since the last green 7ee9259e8 changed no file under pywidget/tests/widgets or
pywidget/docs/design/widgets; (3) the next check, fa8933296, was green with only Swift changes between (nothing the
Python suite reads). So the red traces to no commit: a timing flake under load. Reds traced to untested commits: 0 of 1.

Not a main_green red, noted for completeness: T-3720 (personal_land_test red on main, 11-08) came from 6a1e026cd, a land
commit (tested in its lane), not an untested one.

Decision. Still no red from an untested tools/ or tests/ commit, so no proposal. Main-account commits to tools/ and
tests/ are now covered by the hook (T-3795); the open gap is Operator's own commits (28 tools/, 15 tests/ in the
window: salvages, applied proposals, work-run records), which the hook exempts. Re-count when main_restore.jsonl names
a commit, or at 11-16.
{% endraw %}

</div>
