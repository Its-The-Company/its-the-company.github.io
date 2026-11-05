---
layout: "default"
title: "T-2566: re-review of the upload tool fixes (T-2563, T-2564, T-2565)"
section: "documents"
description: "Verdict: ship. The first --internal upload may go ahead. F1 to F6 from my t2413 review are closed, with tests, and the old demo cases now give the safe result. Five mutants survive. Two are an equivalent pair, and three\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2566-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2566-pernille.md</code></span></div><h1>T-2566: re-review of the upload tool fixes (T-2563, T-2564, T-2565)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent (Commandment 13): I read commit 2a86da9a2, the salvage b3fa43781 it
builds on (`git diff 71dfa93df 2a86da9a2` on the four files), and the code at HEAD. I did not read the author's notes
beyond the commit message.
Scope: `tools/upload.sh`, `tools/testflight_ledger.py`, `tests/upload_test.sh`, `tests/testflight_ledger_test.py`,
`ops/testflight-internal.tsv`. Host tools only: no Xcode, no archive, no upload.

**Verdict: ship. The first `--internal` upload may go ahead.** F1 to F6 from my t2413 review are closed, with
tests, and the old demo cases now give the safe result. Five mutants survive. Two are an equivalent pair, and three
are test gaps where the code is right. Two new findings, both Low: neither lets an internal-only build reach App
Review or makes the Investor ask false. They go on one P2 line (T-2581) and don't block anything.

Suites, run in the foreground on this Mac at 2a86da9a2: `bash tests/upload_test.sh` 64/0,
`python3 tests/testflight_ledger_test.py` 36/0. The ledger is tracked in HEAD with its header and a `commit` column.
Demo and mutants: scratch `T-2566-pernille/bin/demo.sh` (the real tools, a stand-in `xc.sh`, a stand-in main
repository with a GitHub origin in a temp folder) and `bin/mutants.py` (each mutant runs in its own copy of the
four files; the shared checkout is never edited). Outputs are in `demo.out` and `mutants.out` beside them.

## The t2413 findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The t2413 findings, scrolls sideways" style="--tw:960px" markdown="1">

| t2413 | Verdict | Evidence |
|---|---|---|
| F1 ledger in a clone or any repo; `check` open on a missing ledger | **Closed.** Both tools now need an `origin` on github.com/Its-The-Company/itsthecompany, a checkout outside the scratch roots, and the ledger tracked in HEAD. Demo A (a clone, local origin): exit 2, no xcodebuild call, no commit in the clone. E (an unrelated repo): exit 2, and `check` exits 2. E2 (GitHub origin, ledger not tracked): exit 2 from both tools. I (ledger file missing): `check` exits 2. A residual case is F7. | upload.sh:62-77, testflight_ledger.py:45-59; mutants O1-O3 and <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span>-T3 killed |
| F2 commit-and-verify code untested | **Closed.** My U1, U3 and U4 are killed. U5 (a failed append ignored) survives, and so does the new U2 (the row-in-HEAD proof made always true). Each is covered by the other half of the proof. I ran both together as one double mutant, and the read-only-ledger test <span title="A test written in advance. If it fires, we drop the idea.">kills</span> it. So this is an equivalent pair, not a gap. Demo G (read-only ledger) and H (held `index.lock`) both exit 3 with no export call. | upload.sh:158-172; tests "F2/U1".."F2/U5" |
| F3 upload from uncommitted code, no source commit recorded | **Closed.** With `--project --upload`, a modified tracked file or an untracked file is refused before the archive (B, B2: exit 2, no xcodebuild call). A tree that changes during the archive is refused before export. Every archive carries `PWSourceCommit` and every ledger row names it. `--archive --upload` needs a clean recorded commit: none, or a `-dirty` one, exits 2 (F, F2). The whole repository has to be clean. In practice that means the upload runs from a clean clone or a clean worktree, not from the shared checkout while <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> are editing. | upload.sh:86-109, 145-150; mutants F3a-F3g killed |
| F4 ask text for a build that never reached App Store Connect | **Closed.** `ask` needs a row with destination `upload` and result `exit 0`. Demo C (rows `started`, `exit 70`) and C3 (export-only run) exit 1 with the reason. C2 (a good upload) gives the text, now naming the source commit. | testflight_ledger.py:138-156; T4, T4b, T6 killed |
| F5 two build-number rules | **Closed.** Both tools use one rule: leading zeros and trailing `.0` parts are dropped. Demo D: `11.0`, `011` and `11.0.0` against a ledgered 11 are refused by `upload.sh` (exit 2) and by `check` (exit 1); `110` and `1.1` are distinct builds in both. The shell side has no test for leading zeros (F9). | upload.sh:80-85, testflight_ledger.py:88-94 |
| F6 "committed" inferred from an empty `git status` | **Closed.** The proof is now the exact row in `HEAD:ops/testflight-internal.tsv` and the file equal to HEAD. Demo J (ledger path git-ignored but tracked) commits both rows and exports. | upload.sh:169-172 |

</div>


Also checked and clean: refusals happen before any xcodebuild call. The ledger commit still uses a pathspec, so
other lanes' staged files are not swept in. Run from a personal lane's linked worktree, the ledger resolves to the
main checkout. The archive is still marked internal-only and named `upload-internal-*`.

## New findings

### F7 (Low). A clone of GitHub with a GitHub origin, outside the scratch root, is still taken as the main checkout
The identity test is the origin URL plus the scratch-root location. Demo A2: the same clone with
`remote set-url origin https://github.com/...` sitting in a temp folder. `upload.sh --internal --upload` from it
exits 0 and commits both rows in the clone, and `check --build 17` in main exits 0. Getting here takes a
GitHub clone placed outside the scratch root, which `tools/scratch.py` says not to do. Every lane today is a linked
worktree, and that case resolves correctly. Fix when convenient: name the main checkout once, as a pinned path the
tests can override, and require MAIN to equal it.

### F8 (Low). The recorded source commit may exist only in a throwaway clone
The refusal message says to "upload from a clean clone". Demo B3: a clean project whose HEAD is a local commit
in its own repo uploads with exit 0. The row names that commit, and `git cat-file -e` in main says main has never
seen it. When the scratch clone is swept, the commit is gone, which works against the point of F3. Symbols are
still uploaded, so crash reports stay readable. Fix when convenient: with `--upload`, require the commit to be known
to MAIN (`git -C "$MAIN" cat-file -e <hash>^{commit}`), or to be on a pushed branch.

### F9 (Low). Three tests no longer catch the mutation they were written for
- N1 (strict `--archive` of a marked archive accepted): survives. The test at tests/upload_test.sh:104-106 builds
  `plainmarked` with no `PWSourceCommit` and passes `--upload`, so the new F3 refusal fires first. Give that archive
  a clean hash, or drop `--upload`, so that only the mark refuses it.
- F5a (`upload.sh` stops stripping leading zeros): survives. There is no shell test for `07` against a ledgered `7`.
  `check` still refuses it.
- T1b (an unreadable ledger read as "no rows" by `testflight_ledger.py`): survives. That would make `check` fail open
  on a ledger that exists but can't be read. The code is right today. Add one test with an unreadable ledger.
- T7 (`testflight_ledger.py` accepting a linked worktree as `PW_MAIN_CHECKOUT`): survives. A lane's own worktree
  passes the origin and scratch-root tests, so this refusal is the only thing that stops it. Add the test that
  `upload.sh` already has.

Board: F7 to F9 on one P2 line, T-2581 (Idris). It doesn't gate any upload.

## For the first real run (not testable on host)
The archive step must leave the project tree unchanged, or F3's during-archive check will refuse every upload. If
an Xcode build phase writes a file that isn't ignored into the checkout, the first `--upload` stops before export
with "changed during the archive". That is the safe failure. Check the tree after the first archive.
{% endraw %}

</div>
