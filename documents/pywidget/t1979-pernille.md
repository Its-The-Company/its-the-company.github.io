---
layout: "default"
title: "T-1979 review: Odalys&#x27;s T-1919, T-1920, T-1921 (commit 93b7dae4d)"
section: "documents"
description: "Approve with changes. The code does what the line asks: run paths come from the project, a failed fetch never reads overdue, the newer-code note and git&#x27;s fatal: line are there. The first thing that broke was not the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1979-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1979-pernille.md</code></span></div><h1>T-1979 review: Odalys's T-1919, T-1920, T-1921 (commit 93b7dae4d)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Scope: `tools/xc_route.py` and `tests/xc_route_test.py` as committed in 93b7dae4d,
read in a detached worktree at that commit (not main, where T-2303 may be splitting a helper out). The board line said
to append to t1116-pernille.md; the Operator's packet named this file, so the review is here.

Disclosure: `git show --stat` printed the commit message (Odalys's summary) before I read the diff. I read it; the
findings below come from the diff, the tests and my own mutants.

## Verdict

**Approve with changes.** The code does what the line asks: run paths come from the project, a failed fetch never
reads overdue, the newer-code note and git's fatal: line are there. The first thing that broke was not the code, it
was the suite: 6 of my 9 mutants pass 40/40. Two of them are the exact claims T-1919 and T-1920 make. One real bug in
the refusal text. Nothing here pins the wrong commit today.

## Runs

- `python3 tests/xc_route_test.py` at 93b7dae4d: PASS 40 FAIL 0 (about 50 s).
- `run_paths()` on the real repo at 93b7dae4d: 26 paths, as the commit says.
- Mutants (scratch `mut.py`, one edit each to xc_route.py, suite rerun, file restored):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs, scrolls sideways" data-n="1" style="--tw:706px" markdown="1">

| Mutant | Edit | Suite |
|---|---|---|
| M1 | drop the `from x import y` rule (:137) | 40/40, survives (equivalent on the real repo today: same 26) |
| M2 | delete the main-stale early `unknown` return (:357-358) | 40/40, survives |
| M3 | `main_stale` never true (:356) | 40/40, survives |
| M4 | route reads the check-in on a stale copy (:227) | 40/40, survives |
| M5 | a failed `git diff` counts as "no change" and pins (:210) | 40/40, survives |
| M6 | an absent macbook-results branch counts as a failed fetch (:275) | 39/1, killed |
| M7 | docstrings count as references (:139) | 40/40, survives; run_paths goes from 26 to 111 |
| M8 | drop the bare-name rule (`"jobs.py"`, :141) | 40/40, survives; run_paths loses 7, among them tools/appshell_shots.sh and tools/xc_wait.sh |
| M9 | drop project.yml as a seed | 37/3, killed |

</div>


## Findings

**F1, Medium: the suite does not hold the run-path set: tests/xc_route_test.py:319-331.** The real-repo check is a
lower bound on tools *named directly* in xc.sh, project.yml and scripts/*.sh, plus an 8-name `must` set. Nothing
follows the chain, and nothing <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> it from above. M8 drops seven paths the tool itself says the run reads (the
under-include side, the one that pins the wrong code) and passes. M7 balloons the set to 111 (every board, site and
supervisor tool becomes a refusal) and passes. The commit's "a comment or docstring is not a reference" is tested for
shell comments only. Fix: fake-repo fixtures, one per rule: a bare `"x.py"` string, a docstring-only mention, `import x`,
`from x import y`, a two-hop chain (a.sh names b.py, b.py imports c). Plus an upper bound on the real repo (say 40
paths, so a docstring regression shows).

**F2, Medium: T-1920's "not pushed stands only on a fresh origin/main" is untested: tools/xc_route.py:356-358.** M2
and M3 both pass. With them, a failed origin/main fetch plus a job file missing from the *stale* copy prints "not
pushed... Nothing moves until the push", and `wait` returns at once on "not pushed" (:399), which is the misleading
answer the line set out to remove. Fix: one case where the main fetch fails and the job is pushed on origin but not in
the local copy: expect "unknown, fetch failed", 75, and `wait` keeps polling. In the same line: a route case on a
broken fetch with a silent check-in, expecting no "runner silent" line (M4), and one where `git diff` fails, expecting
a refusal (M5).

**F3, Low (real bug): the refusal misnames the first dirty path: tools/xc_route.py:195.** `git()` strips stdout (:69),
so a worktree-only change (`" M path"`, the usual case) loses its leading space and `ln[3:]` cuts a letter.
Reproduced at 93b7dae4d: with tools/acknowledgements.py edited, the list is `['ools/acknowledgements.py']`. That is the
path T-1919 says refusals now name. Fix: `git status --porcelain -z` without the strip, or `git diff --name-only HEAD`
plus `git ls-files --others --exclude-standard`, and a test that checks the named path.

**F4, Low: a failed diff reads "the same code": tools/xc_route.py:220.** `(git(...) or "")` turns a failed
`git diff` into an empty list, and the note then says "the same code". The pin is still a commit on main, so nothing is
mis-tested, but the note is a claim we didn't check. Say "unknown" when `git` returns None. Same board line as F3.

Notes, no fix asked:
- `main_stale` matches fetch()'s message text ("origin/main " at :356 against :280). If one of them is reworded, the
  check breaks and nothing fails. Passing the failed ref names, not lines, would be sturdier. Leave it until someone
  touches fetch().
- "unknown" and "queued" share exit 75. Callers that branch on the code can't tell them apart. Fine for a person
  reading the line; worth a word in the module docstring.

## The board line's question: over-including 26 paths, is that the right side?

Yes. An extra path costs one refusal, and the refusal tells the worker to commit or set XC_LOCAL=1. A missing path
costs a runner verdict on code the worker didn't have, and that is the failure this guard exists to stop. What the 26
cost: tools/events.py, tools/inbox.py, tools/scratch.py and tools/urgent.py come in through disk_free.py, and they
are among the most-edited tools in the repo, so an uncommitted edit to any of them now refuses a runner job. Today's
main checkout has none of them dirty. I'd keep the safe side. Once F3 is fixed, a worker can see which file caused the
refusal. The real risk is the other side: as M8 shows, nothing stops the set from shrinking (F1).
{% endraw %}

</div>
