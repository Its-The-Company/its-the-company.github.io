---
layout: "default"
title: "Review of T-4911 at b9619aada9: land a finished copy after main moves on"
section: "documents"
description: "The road is the right road, and its refusals keep most stale content out. But at fbf1569bf2 a land can carry a stale file over main&#x27;s newer version once a settle is undone (H1), and the suites can run on a different\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4911-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4911-pernille.md</code></span></div><h1>Review of T-4911 at b9619aada9: land a finished copy after main moves on</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4916, Commandment 13). Author: Odalys. Reviewed: b9619aada9 (tools/main_gate.py:
`_differs`, `copy_state`, `_put_blob`, `bring_up`, `cmd_settle`, `copy_ready`, `_has_marks`, the `cmd_land` changes and
the `settle` parser; tests/main_gate_test.py's T-4911 rows; ops/prompts/work.md's copy road), read as it stands at
fbf1569bf2, the last commit to tools/main_gate.py (unchanged to <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> HEAD 7570f93ffd). The later commits to that file are
f34a429237 (T-4917: an untracked file equal to main's blob is not a change), 497ee0d7e6 (T-4805: `land_conflict` rows)
and fbf1569bf2 (T-4792: retest plan); none of them changes the logic below except T-4917, which I read with it. Line
numbers are in tools/main_gate.py at fbf1569bf2. Date: 2026-11-19.

What I ran: five fixture tests in a scratch folder (`tools/scratch.py new T-4916`), each a subclass of
tests/main_gate_test.py's `FromCopy` (throwaway repositories with a worktree copy and the real pre-commit hook, the
fake MacBook and the fake suite runner; no real land, no real main). All five did what each finding below says
(5 tests, OK, 44 s). The steps of each are in its finding so the fix can turn it into a fixture.

## What holds

- The model is right. Landing main's tip plus the named files, instead of asking every copy to bring its history up,
  removes the step that caused the 11-10 stash loss, and "changed" as "differs from where the copy left main and from
  main's tip" (`copy_state`, 656-685) is the right test: a named file the copy left alone, or one main already holds,
  never lands.
- A named file main changed since the copy left it is refused before anything runs, and nothing in the main folder
  moves (the fixture row `main_moved_in_a_named_path`, and my R4 and R1 setups before settle).
- `settle`'s clean case is right: a three-way `git merge-file` with the version the copy started from as base lays
  main's change in and keeps the copy's (R1's first step: `A = 10 ... D = 40`).
- Main moving during the check is caught twice: `cmd_land` refuses when a named file moved (`theirs`, 2371), and for
  every other file the pre-commit hook asks again for a pass of the committed content (the fixture
  `a_refused_landing_whose_files_cannot_be_put_back` shows the hook refusing `site_test.sh` after main moved a file
  it reads, and the folder put back).
- The land copies the named files from the copy's folder at commit time (2419-2430), not the blobs that were
  checked. An edit in the copy during the check therefore lands unchecked unless a key catches it; the hook's keys
  cover every gated and suite-read path, so I found no case past it. Writing the checked tree's blobs would make that
  hold by construction; not filed.

## Findings

### H1 (High): a settle record outlives the settled content, so a stale file lands over main's newer version (copy_state 676-683, cmd_settle 757)

`settle` records `settled[path] = main's tip` in the copy's git folder, keyed by path alone. From then on `copy_state`
asks only whether main changed the file *since that tip*, never whether the copy's file still holds what settle laid
in. Anything that brings the pre-settle content back passes as settled. The most natural one is the worker starting
over after a messy settle: `git checkout -- <file>` in the copy.

R1: the copy leaves main at `A = 1 / B = 2 / C = 3 / D = 4` and commits `A = 10`; main commits `D = 40`. `settle`
lays it in cleanly (exit 0). The worker runs `git -C COPY checkout -- tools/site/personal.py`. `land` exits 0 and main
now holds `A = 10 ... D = 4`: main's `D = 40` is gone, with no refusal and no word in the output. The same happens
after a settle with clash marks, when the worker throws the marked file away and redoes the change by hand.

Fix: a settled path is settled only while the copy's file still holds main's change. Record with the path the blob
id settle wrote (or the copy's pre-settle blob), and at land treat the file as settled only when a three-way merge of
the copy's file with main's change from base to `since` changes nothing; otherwise refuse it by name as a clash. A
fixture with R1's steps must fail before the fix. Line T-5051.

### H2 (High): the suites can run on main's older tip while the pass rows and the land are for the newer one (copy_ready 2044, cmd_check 2128)

`copy_state` reads main's HEAD (H1) and `bring_up` writes H1's content into the copy; then `cmd_check` calls
`candidate_tree`, which reads HEAD again (2128, then 772) and builds the key on whatever it is now. A commit that
lands on main between the two reads (several git commands over the whole copy, then the file writes) leaves the copy's
folder at H1 while the pass rows are keyed on H2 plus the change. The suites never ran H2's content, but the rows say
they did, the hook finds them, and the land goes in.

R5: the copy commits `tools/site/personal.py`. I wrapped `bring_up` so that its second call (the one `cmd_check`
makes) is followed by a main commit of `tools/site/lanes.py` `L = 2`, standing in for a lane's land in that window.
`site_test.sh` (which reads lanes.py) ran in the copy and saw `L = 1`; `land` exited 0, main holds `L = 2`, and the
ledger has a `site_test.sh` pass row for that content. The timing is simulated; the window is real and the lanes land
often.

Fix: build the candidate on the head `copy_ready` refreshed the copy to (pass `st["head"]` through to
`candidate_tree`), not on a second read of HEAD. Main moving after that is the case `cmd_land` and the hook already
handle. A fixture with R5's steps. Line T-5052.

### M1 (Medium): after a red or a 75, the gate refuses the files it wrote itself once main moves them again (copy_state 669-671, bring_up 706-714)

T-4917 fixed this for a file main *added*; it remains for a file main *changed*. `bring_up` writes H1's version of a
file the copy did not touch. When main changes that file again (H2), the copy's file differs from the base and from
H2, so it counts as the copy's own unnamed change. The next land is refused for a file the worker never opened, with
the advice "Name them, or put them back in the copy", and the copy now holds an old version of it.

R2: the copy commits `tools/site/personal.py`; main commits `tools/governor.py` `G = 7`. The first land is red (exit
1) after `bring_up` wrote `G = 7` into the copy. Main commits `G = 8`. The second land: exit 2, "the copy changed files
that were not named: tools/governor.py". This is the ordinary road after any red, and after every 75, whose message
says "run this again (it builds on main's new tip)". Outside what the gate reads the same file is neither refused nor
refreshed, so the suites read H1's version of it (see L2).

Fix: `bring_up` records the path and blob it wrote, in the copy's git folder beside the settle record, and
`copy_state` counts a file whose content still equals that blob as untouched (so it is `behind` and refreshed again).
Fixture: R2's steps. Line T-4957 (Odalys, open since 11-18, the same work found while landing T-4903; noted there);
T-5053, which I added before I saw it, closes with it.

### M2 (Medium): a file added on both sides, or changed on one side and deleted on the other, has no road to main (cmd_settle 739-743)

`settle` sends these to "settle it by hand ... then run settle again", but it never records them, so running it again
says the same thing, and `land` keeps refusing the path as a clash (no settle record, and the path is in main's
change). The only way through is to make the copy's file equal to main's tip, which drops the change.

R3: the copy commits a new `tools/site/newone.py` (`X = 1`); main adds the same path (`Y = 1`). `settle` exits 1
twice, the worker writing `X = 1 / Y = 1` by hand in between, and `land` exits 2 naming the file both times.

Fix: for these cases `settle` records the path against main's tip once the worker's file exists and carries no marks
(or takes a flag saying the hand settle is done), so H1's check applies to it like any settled file. Fixture: R3's
steps. Line T-5054.

### L1 (Low): a refusal names at most eight clashing paths and does not say there are more (copy_ready 2033-2037; cmd_land 2376-2377)

The clash refusal joins `st["clash"][:8]` and its `settle` command line takes the same eight, with no "and N more";
the settle-marks refusal (2039) and the main-folder refusals (2042, 2382) do the same, and the `land_conflict` row (2302) cuts
its `why` at 300 characters. The worker settles eight, lands, is refused again for the rest.

R4: eleven named files, all changed on main since the copy left it. The refusal names m00 to m07 and omits m08, m09,
m10 without a sign. Fix: name every path (or the first eight and "and N more", with the settle command carrying all
of them), and put the full list in the row's `files`. Line T-5055.

### L2 (Low): a copy's unnamed change outside the gate's paths stays in the copy while its suites run (copy_ready 2023-2027)

The unnamed-change refusal looks only inside `gated + SUITE_SCOPE + pywidget/tests`; `bring_up` refreshes only files
the copy did not touch. A copy whose commits or working files change, for example, ops/prompts/work.md without naming
it runs its suites on that version, which does not land, and some suites read such files from the repository
(tests/supervisor_sync_cause_test.sh:124 greps `$ROOT/ops/prompts/work.md`). Before T-4911 the same files were ignored
the same way; now that a copy with many commits lands as one, it matters more. From reading, not run. Fix: name the
unnamed changed files outside the gate's paths when the land starts, and either refuse when a chosen suite names one,
or put main's content for them in the copy for the run and the copy's back after. Line T-5056.

## Verdict: FAIL

The road is the right road, and its refusals keep most stale content out. But at fbf1569bf2 a land can carry a stale
file over main's newer version once a settle is undone (H1), and the suites can run on a different tree from the one
their passes are recorded for and that lands (H2). Both were shown in fixture repositories. M1 makes the road refuse
itself after every red that main overtakes, and M2 leaves two kinds of conflict with no way to land. Fix H1 and H2
before more lanes depend on `settle`; M1 soon after, since it blocks ordinary retries.
{% endraw %}

</div>
