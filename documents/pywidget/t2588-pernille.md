---
layout: "default"
title: "Review t2588: upload tools, fourth round (pin read, origin/main)"
section: "documents"
description: "No Medium or higher finding. Nothing here blocks the next internal upload. L1 to L4 of review t2581 are fixed as the commit says. Both tools read only the file, take its first line and trim spaces, tabs and CR at both\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2588-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2588-pernille.md</code></span></div><h1>Review t2588: upload tools, fourth round (pin read, origin/main)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (independent, C13). Commit: 8fef5efa2 (Idris, T-2588). Board: T-2606. 2026-11-05.
Scope: tools/upload.sh, tools/testflight_ledger.py, tests/upload_test.sh, tests/testflight_ledger_test.py,
tests/upload_mutants.json, tests/testflight_ledger_mutants.json. Host tools only. No Xcode, and no real upload: the
only `--upload` runs were the suite's own copy with its stand-in xc.sh.

## Verdict

**No Medium or higher finding. Nothing here blocks the next internal upload.** L1 to L4 of review t2581 are fixed as the
commit says. Both tools read only the file, take its first line and trim spaces, tabs and CR at both ends.
PW_PINNED_MAIN is gone from both tools; it is still named in the tests, but only to show it does nothing. `--upload`
takes only a commit that `refs/remotes/origin/main` contains. Five Lows follow. Every one of them either fails closed
or needs a pin file nobody writes today. The tracked pin is an absolute path with one line and no stray bytes.

## Reproduced

- `bash tests/upload_test.sh`: PASS 80, FAIL 0. `python3 tests/testflight_ledger_test.py`: PASS 47, FAIL 0.
- `python3 tools/mutants.py tests/upload_mutants.json -- bash tests/upload_test.sh`: 17 of 17 killed.
- `python3 tools/mutants.py tests/testflight_ledger_mutants.json -- python3 tests/testflight_ledger_test.py`: 9 of 9 killed.
- Six extra mutants of mine (listed in L5; they were kept in scratch and not committed): 3 of 6 killed.
- Exit codes: every pin refusal and every origin/main refusal exits 2 in both tools, before any xcodebuild call
  (`calls` = 0 in the suite). The messages name the file, or the commit and `origin/main`.

## Findings

### L1 (Low): a relative pin is resolved against the caller's working directory
- upload.sh:74 (`cd "$PIN"`), testflight_ledger.py:58 (`os.path.realpath(pin)`).
- Neither tool refuses a pin that does not start with `/`. So whether a run passes depends on where it was started.
  Probe: a ledger copy with pin `.` and PW_MAIN_CHECKOUT set to the main checkout gives exit 0 started from the main
  checkout. Started from /tmp, it gives exit 2 ("is not the pinned main checkout /private/tmp").
- If a relative pin were ever committed, a clone started from its own top would pass as the main checkout, so this can
  fail open. The tracked pin is absolute, so nothing is wrong today. upload.sh also hands the pin to `cd` without
  `--`, so a pin starting with `-` is read as an option. That fails closed.
- Fix: in both tools, refuse a pin that does not start with `/` (exit 2, "the pin must be an absolute path"), and use
  `cd -- "$PIN"`.

### L2 (Low): "beside the script" means two places
- upload.sh:71 reads `$ROOT/tools/main-checkout.path`, with ROOT = `$(dirname "$0")/..`.
  testflight_ledger.py:52 reads `dirname(__file__)/main-checkout.path`.
- These agree only while the tool sits in a folder named `tools`. Probe: both tools copied to `x/sub/`, with the pin
  file in `x/sub/`. The ledger tool passes (exit 0). upload.sh refuses ("no pinned main checkout", exit 2) because it
  looks in `x/tools/`. upload.sh's usage text says "beside this script".
- Fails closed. Fix: read `"$(dirname "$0")/main-checkout.path"` in upload.sh, or document that it reads `../tools/`.

### L3 (Low): a NUL byte in the pin splits the "same rule"
- upload.sh:71 vs testflight_ledger.py:53.
- macOS bash 3.2 drops NUL bytes from `$(...)` without a warning. Python keeps them. Probe: a pin of
  `[local folder]<NUL>company`. upload.sh passes the pin and goes on to the archive check. The ledger tool
  refuses it (exit 2).
- Both still end up at the real main checkout, so the only harm is that the two tools disagree on the same file.
- Fix: refuse a first line that contains a NUL byte, in both tools. In bash, compare the byte count of `head -n 1`
  with and without `tr -d '\0'`.

### L4 (Low): origin/main is only as fresh as the main checkout's last fetch or push
- upload.sh:110. The limit is written down at upload.sh:6-8.
- Behind: a commit pushed from another clone or from the GitHub web UI, with no fetch in the main checkout since. The
  upload is refused with "push first", which is wrong advice, because it was pushed. The same refusal comes when
  `refs/remotes/origin/main` does not exist at all.
- Ahead: after a force-push or recut of main on GitHub with no fetch since, a commit that GitHub no longer has still
  passes. That is the case L4 was meant to stop, through the other door.
- Both are rare here, because the merge queue pushes from the main checkout and that updates the tracking ref.
- Fix: make the refusal message say "push, or `git -C <main> fetch origin main`, then upload". If a network call is
  ever allowed in this tool, check the commit against `git ls-remote origin refs/heads/main` before the export.

### L5 (Low): three claims have no test that fails without them
My extra mutants, each run in its own copy by tools/mutants.py:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: L5 (Low): three claims have no test that fails without them, scrolls sideways" data-n="1" style="--tw:470px" markdown="1">

| Mutant | Change | Result |
|---|---|---|
| X1 | upload.sh:71 `head -n 1` changed to `cat` (reads the whole file) | SURVIVED |
| X2 | upload.sh:74 pin no longer resolved (`PIN_P="$PIN"`) | killed |
| X3 | upload.sh:72 trailing trim removed | killed |
| Y1 | ledger:53 whole file read with newlines removed, not the first line | SURVIVED |
| Y2 | ledger:58 `return pin`, not `realpath(pin)` | SURVIVED |
| Y3 | ledger:53 `strip` changed to `rstrip` (leading trim removed) | killed |

</div>


- The "first line" rule is not tested in either suite: every pin the tests write is one line. With X1 or Y1 applied, a
  pin file with a second line (a comment, say) would be refused. That fails closed, but it is the rule the commit
  claims.
- The ledger suite never pins through a symlink. Y2 fails closed too: a symlinked pin would be refused, not passed.
- Fix: add a two-line pin case (`$M\n# note`) and a symlinked pin case to both suites. Add X1, Y1 and Y2 to the
  mutants files.

## Checked and fine
- A missing pin file is refused with exit 2 in both tools (tested in both suites). A file of only spaces and tabs
  trims to empty in bash (I probed it) and is refused. From reading the code: an empty pin file, a directory in its
  place, or an unreadable one all give an empty pin (`head` fails, or Python raises OSError), so each is refused with
  exit 2.
- A symlinked pin or a symlinked main checkout resolves in both tools (`pwd -P`, `realpath`), and X2 shows upload.sh's
  side is tested.
- Detached HEAD: only the commit counts. A detached HEAD at a commit on origin/main passes, and one off it is refused.
  The hash is held to 40 or 64 hex characters before `on_main`, so it can never be read as an option. A commit on
  local main that was not pushed is refused, and the suite checks this through the `--archive` path. The `--project`
  path goes through the same `on_main`, and the F8 `--project` mutant is killed.
- The ancestry check names `refs/remotes/origin/main` in full, so a local branch called `origin/main` cannot stand in
  for it.
{% endraw %}

</div>
