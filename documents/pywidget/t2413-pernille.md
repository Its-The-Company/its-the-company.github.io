---
layout: "default"
title: "T-2413: review of 8d7649481 (T-2370/T-2371, fixes for the t2357 review)"
section: "documents"
description: "Verdict: fix first. H1, M1, L1 and L2 are fixed and tested. H2 is only partly fixed. The ledger now has to sit in a &quot;main checkout&quot;, but the tools accept any git repository that isn&#x27;t a linked worktree. Run from a git\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2413-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2413-pernille.md</code></span></div><h1>T-2413: review of 8d7649481 (T-2370/T-2371, fixes for the t2357 review)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent (Commandment 13): I read the diff, the code at HEAD (no change to these
files since 8d7649481) and my t2357 review. I did not read the author's notes.
Scope: `tools/upload.sh`, `tools/testflight_ledger.py`, `tests/upload_test.sh`, `tests/testflight_ledger_test.py`,
`pywidget/tests/privacy/test_check_legal_links.py`. Host tools only, no Xcode.

**Verdict: fix first.** H1, M1, L1 and L2 are fixed and tested. H2 is only partly fixed. The ledger now has to sit
in a "main checkout", but the tools accept any git repository that isn't a linked worktree. Run from a git clone,
upload.sh commits the internal-only rows inside the clone. The submission check in the real repository then passes
that build. That is the H2 failure again, one level up. The new commit-and-verify code is also untested: five
mutants of it survive. Separately, nothing stops an upload built from uncommitted code. Fix F1 to F4 before the first
`--internal` upload. F5 and F6 can go in with them.

Tests run in the foreground on this Mac: `bash tests/upload_test.sh` 41/0, `python3 tests/testflight_ledger_test.py`
17/0, `python3 -m unittest pywidget/tests/privacy/test_check_legal_links.py` 11 OK.
Demos: scratch `T-2413-pernille/bin/demo.sh` runs the real tools with a stand-in xc.sh. Mutants are in
`bin/mutants.sh`.

## The t2357 findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The t2357 findings, scrolls sideways" style="--tw:881px" markdown="1">

| t2357 | Status | Where |
|---|---|---|
| H1 archive unmarked, re-usable | **Fixed.** `--internal` archives are named `upload-internal-<ts>` and marked `PWInternalTestFlightOnly` (upload.sh:69-70, 109-111). Without `--internal`, `--archive` refuses a marked archive, an `upload-internal-*` name, or a build in the ledger (upload.sh:74-81). A fresh strict archive of a build in the ledger is refused before export (upload.sh:113). `--internal --archive` takes marked archives only. Each refusal has a test and exits 2 with no xcodebuild call. | tests/upload_test.sh:75-95 |
| H2(a) ledger in the main repository, committed | **Partly.** Linked worktrees and copies outside git are refused, and rows are committed before and after the export. A clone, or any other git repo, is accepted as "main" (F1). The commit paths are untested (F2). | upload.sh:45-55, 116-134 |
| H2(b) Investor ask names the build, says internal only, links the ledger | **Fixed**, with F4: the text can be false. | testflight_ledger.py:104-113 |
| H2(c) submission check | **Tool present** (`check --build/--archive`, exits 1 or 2), but no line or tool calls it yet. Whichever line writes the App Review ask must run it. | testflight_ledger.py:80-101 |
| M1 shell leakage untested | **Fixed.** The stand-in records `${PW_INTERNAL_TESTFLIGHT-unset}` per call. A default run with `YES` exported, and an `--internal` run, both show `unset` on both calls. | tests/upload_test.sh:12, 59-69 |
| L1 near-miss truthy values | **Fixed.** `1`, `true`, `Yes` added. | test_check_legal_links.py:46-48 |
| L2 unknown build number | **Fixed.** `read_build` refuses an empty CFBundleVersion, both on `--archive` and after a fresh archive, before any row is written. | upload.sh:61-64, 108 |

</div>


Also checked and clean: exit codes (2 for refusals, 3 when the ledger can't be marked or committed, xcodebuild's own
code passed through otherwise). A failed archive exits before any row is written. A failed export writes its
`exit N` row after the `started` row, and that leaves the build blocked from any strict re-archive. That is the
safe direction. The ledger commit uses a pathspec, so other <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>' staged files in the shared checkout are not swept
in. Adding a key to the archive's top-level Info.plist doesn't touch anything signed.

## Findings

### F1 (High, fix first). The ledger can be committed to a clone or to any git repo, and the submission check then passes
upload.sh:45-55 and testflight_ledger.py:35-49 call a repo "main" when its git dir is its common dir. A clone passes
that test, and so does a `git init` folder. Demo case A: a clone of a stand-in main repository, then
`upload.sh --project ... --internal --upload` run from the clone with no `PW_MAIN_CHECKOUT`. The result is exit 0,
two `testflight-internal` commits inside the clone, no ledger in main, and `testflight_ledger.py check --build 7` in
main exits 0 ("not in ops/testflight-internal.tsv"). Case E does the same with `PW_MAIN_CHECKOUT` pointing at an
unrelated new repo. `tools/scratch.py` documents clones as a normal scratch kind, so this is the realistic way
to run the tool outside the shared checkout. Also, `rows()` (testflight_ledger.py:54) returns no rows when the
ledger file is missing, so `check` fails open in any checkout that lacks it. Today that is every checkout:
`ops/testflight-internal.tsv` is not tracked.

Fix: commit the ledger with its header row now. Both tools then require it to be tracked in HEAD of MAIN, refuse a
MAIN whose `origin` is a local path or that sits under the scratch root, and `check` exits 2 when the ledger is
missing. One test per refusal. Board: T-2563.

### F2 (Medium, fix first; with F1). The commit-and-verify code has no test that fails when it breaks
These mutants of upload.sh all pass the full suite (scratch `bin/mutants.sh`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: F2 (Medium, fix first; with F1). The commit-and-verify code has no test that…, scrolls sideways" data-n="1" style="--tw:444px" markdown="1">

| id | mutation | result |
|---|---|---|
| U1 | drop the `ledger_row started` call before the export (upload.sh:127-129) | survived |
| U2 | the commit check at upload.sh:126 always true | survived |
| U3 | ignore a failed result row after the export (upload.sh:134) | survived |
| U4 | stop retrying after one failed commit (upload.sh:123) | survived |
| U5 | ignore a failed append to the ledger (upload.sh:119) | survived |

</div>


U1 is the important one. The row written before the export is the only record if the run is killed partway through
an upload, and no test sees it go missing. Add tests for these cases: an `--internal` run whose export fails
(rows `started` then `exit N`, exit N), a held `index.lock` in MAIN (exit 3, no xcodebuild export call), and a
ledger file that can't be written. Board: T-2563.

### F3 (Medium, fix first). An upload can be built from uncommitted code, and nothing records which commit it came from
upload.sh:100-107 archives whatever is in the project's working tree. Demo case B: a modified tracked file and an
untracked file in the project's repo, then `--project ... --upload`, exits 0. Neither the archive nor the ledger
row names a commit. The resulting build can't be traced to source, and a TestFlight crash report then points
at code nobody has. Fix: with `--upload`, refuse when `git -C <project dir> status --porcelain` is non-empty, and
record HEAD's hash in the archive mark and in every ledger row. Board: T-2564.

### F4 (Medium, fix first). The Investor ask can say a build is in App Store Connect when it never got there
`ask` (testflight_ledger.py:104-113) accepts any row for the build. Demo case C: an `--internal --upload` whose
export exits 70 leaves rows `started` and `exit 70`. `ask --build 9` exits 0 and prints "Build 1.0 (9) is in App
Store Connect for TestFlight". The same happens for an export-only run. That text goes to the Investors and would
be false. Fix: require a row with destination `upload` and result `exit 0`, otherwise exit 1 with the reason.
Board: T-2565.

### F5 (Low). The two tools compare build numbers differently
upload.sh:60 compares in awk, where `7.0` and `7` both look numeric and compare equal, so the archive is refused.
testflight_ledger.py:65 compares strings, so `7.0` passes `check` (demo case D). The shell tool fails safe and the
submission check doesn't. Use one rule in both. Board: T-2565.

### F6 (Low). "Committed" is inferred from an empty `git status`
upload.sh:126 treats an empty `git status --porcelain -- ops/testflight-internal.tsv` as proof of a commit. The
output is also empty when the path is git-ignored or when `status` itself fails. Check the row's commit directly
(`git log -1` on the path changed, or `git diff --quiet HEAD --` plus `ls-files --error-unmatch`). Board: T-2565.

Re-review: T-2566 (Pernille), after T-2563 to T-2565.
{% endraw %}

</div>
