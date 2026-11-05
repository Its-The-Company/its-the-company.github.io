---
layout: "default"
title: "Review t2581: upload tools, third round (F7 pin, F8 on-main, F9 test gaps)"
section: "documents"
description: "No Medium or higher finding. Nothing here blocks the second internal upload. F7, F8 and F5a do what the commit says. Four Lows and three Info notes follow. All of the Lows fail closed or need someone to set a test\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2581-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2581-pernille.md</code></span></div><h1>Review t2581: upload tools, third round (F7 pin, F8 on-main, F9 test gaps)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (independent, C13). Commit: d4933f9dd (Idris, T-2581). Board: T-2584. 2026-11-05.
Scope: tools/upload.sh, tools/testflight_ledger.py, tools/main-checkout.path, tests/upload_test.sh,
tests/testflight_ledger_test.py, tests/upload_mutants.json, tests/testflight_ledger_mutants.json. Host tools only, no
Xcode. upload.sh was never run with `--upload` against the real tool. The only `--upload` runs were the suite's own copy
with its stand-in xc.sh.

## Verdict

**No Medium or higher finding. Nothing here blocks the second internal upload.** F7, F8 and F5a do what the commit says.
Four Lows and three Info notes follow. All of the Lows fail closed or need someone to set a test variable on purpose.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:638px" markdown="1">

| Run | Result |
|---|---|
| `bash tests/upload_test.sh` | PASS 72 FAIL 0 |
| `python3 tests/testflight_ledger_test.py` | PASS 41 FAIL 0 |
| `tools/mutants.py tests/upload_mutants.json -- bash tests/upload_test.sh` | 12 of 12 killed |
| `tools/mutants.py tests/testflight_ledger_mutants.json -- python3 tests/testflight_ledger_test.py` | 5 of 5 killed |
| My mutants (scratch T-2584-pernille, u.json / l.json) | S3, S5 killed; S1, S2, S4 survived (below) |
| awk norm vs Python norm, 2968 strings (seeded random over `0-9 . space tab e + - x a b`, plus 10, 9, 010, 7e0, 0x7, +7, 1.0e1, inf, nan, 1.10, 1.01, .7, 7.) | 0 mismatches (macOS awk 20200816) |
| Pin probes: both tools, a copied tree, export only | table under F7 |

</div>


## The build-number compare (the "10" < "9" question)

It does not bite, because nothing orders build numbers. upload.sh:94 compares `norm($3) == norm(b)`, equality only.
testflight_ledger.py:117 is equality only too. The single `sorted(..., key=norm)` at testflight_ledger.py:142 only puts
the de-duplicated builds in display order. I measured awk directly: with `a=10 b=9`, `norm(a) < norm(b)` is **1** (text
order). So the danger is real, but only for code that has not been written yet: anyone who later adds a "newer than the
last upload" check must compare part by part as integers, and must not reuse these norm strings (see I1).

The F5a fix holds. With `return o ""`, `norm("7e0") == norm("7")` is 0 and `norm("1.0e1") == norm("10")` is 0. Take out
the `""` and mutant F5a' is killed. The fuzz finds awk and Python agreeing on every input, including sign, hex, exponent,
inf/nan and whitespace cases.

## F7: the pinned main checkout

Probes: the pin file was rewritten each time and PW_PINNED_MAIN unset. "passes" means the run got past the pin and was
then stopped by the scratch-root check, because my stand-in repo lives under the scratch root.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: F7: the pinned main checkout, scrolls sideways" style="--tw:709px" markdown="1">

| tools/main-checkout.path | upload.sh | testflight_ledger.py |
|---|---|---|
| exact path | passes | passes |
| missing folder (`/nonexistent/...`) | refused: "not a folder here" | refused: "not the pinned main" |
| another existing folder (stale) | refused | refused |
| blank first line, path on line 2 | refused: "no pinned" | refused: "no pinned" |
| `~/x` | refused | refused |
| symlink to the checkout | passes | passes |
| path + CRLF | **refused** | **passes** |
| path + trailing space | **refused** | **passes** |
| leading space + path | **refused** | **passes** |

</div>


With the file missing or stale, every case fails closed in both tools. Good. The tracked pin names a Mac mini path. The
MacBook runner runs as itsthecompany-runner with its own home folder, and kinds.json has no upload kind, so the path does
not exist there and nothing runs. Info only.

### L1 (Low): the two tools read the pin file differently

- upload.sh:66-68 takes `head -n 1` as it is. testflight_ledger.py:52 calls `.strip()`.
- Failing case: save tools/main-checkout.path with CRLF line endings, or with a trailing space. Every upload.sh run is
  then refused ("the pinned main checkout ... is not a folder here"), while `testflight_ledger.py check` still passes the
  pin. See the table above.
- Impact: fail closed in the uploader. It costs an upload slot and never lets a wrong checkout through.
- Fix: give both tools one rule. In upload.sh, strip a trailing CR and surrounding spaces and tabs before the `cd`. For
  example `PIN="${PIN%$'\r'}"`, then trim with parameter expansion. Or make Python stop stripping and refuse anything
  that is not the exact line. Add one CRLF case to each suite.

### L2 (Low, test gap): no test takes the pin from the file, which is the production path

- Every passing run in both suites pins with PW_PINNED_MAIN. The file is only exercised when it is absent.
  upload_test.sh:171-172 asserts only `rc 2`, not why. testflight_ledger_test.py:90-91 checks `"pinned" in out`, which
  "no pinned" and "is not the pinned" both match.
- Failing case: mutant S2 (upload.sh:66 reads `$PWD/tools/main-checkout.path` in place of `$ROOT/...`) survives. So does
  mutant S4 (testflight_ledger.py reads `tools/main-checkout.path` relative to the working directory).
- Fix: in upload_test.sh, write `$W/tools/main-checkout.path` naming `$M`, unset PW_PINNED_MAIN, run from another
  directory, and expect a pass. Name another folder and expect "is not the pinned". For the missing file, assert "no
  pinned main checkout" in stderr. Do the same in testflight_ledger_test.py with the copied tool. Add S2 and S4 to the two
  mutant files.

### L3 (Low): PW_PINNED_MAIN <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> the pin in production

- upload.sh:66 and testflight_ledger.py:48 honour the variable on every run, not only in tests.
- Failing case: from a GitHub-origin clone outside the scratch root,
  `PW_PINNED_MAIN=$clone PW_MAIN_CHECKOUT=$clone tools/upload.sh --archive A --internal` gets past the pin. That is the
  pre-F7 behaviour. upload_test.sh:131/133 sets exactly this pair, and those runs are stopped only by the origin check.
- Impact: it takes two variables set on purpose. F7's threat is an accident (a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> running from a clone), so this is Low.
- Fix: drop the override. The tests already copy upload.sh into `$W/tools`, so let them write `$W/tools/main-checkout.path`
  (and the clone's own copy) instead of exporting PW_PINNED_MAIN. The Python suite can write the file beside its copied
  tool the same way. This also closes L2.

## F8: --upload only from a commit on main

Covered as claimed. The --project path checks before the archive, and upload.sh:161 still holds the tree to the same
hash afterwards. The --archive path checks PWSourceCommit. Both are refused for a side commit and for a commit main does
not have (upload_test.sh:173-183). I did not run a mutant with the merge-base arguments swapped. Reading the code, the side-commit case and the happy path
would both catch it.

### L4 (Low): "on main" means the Mac mini's local main, pushed or not

- upload.sh:103 asks `merge-base --is-ancestor "$1" refs/heads/main` in MAIN.
- Failing case, measured: at review time `git rev-list --count origin/main..main` = **7**, and origin/main was 8 minutes
  old. A clean clone taken now has a HEAD that is on local main but not on GitHub, and the upload is accepted. If that
  push is rejected and main is recut (the recut route is cherry-pick, T-2204), the ledger row's commit is no longer on
  any branch. That is the loss F8 set out to prevent.
- Impact: it needs a rejected push followed by a recut. The commit object stays in the Mac mini's store either way.
- Fix, either of:
  - Require `refs/remotes/origin/main` as of the last fetch. That needs no network in the tool. The refusal text says
    "push first, then upload".
  - Keep local main and write down in the usage text that the Operator pushes before uploading.

  I would take the first for strict (App Review) uploads and accept the second for internal ones.

## Info

- **I1.** If a monotonic build-number check is ever added (App Store Connect rejects a CFBundleVersion that is not higher
  than the last one), compare part by part as integers. `norm()` output ordered as text puts "10" before "9" (measured
  above).
- **I2.** Mutant S1 (`refs/heads/main` replaced by `HEAD` in on_main) survives. It is equivalent while the main checkout
  sits on main, which it always does. No action.
- **I3.** The T-2456 board line says the Operator uploads "from a clean export". tools/clean_export.sh writes a
  `git archive` tree with no .git, which `--upload` refuses (src_state = unknown, T-2564). The export's own
  tools/upload.sh finds no MAIN either. ops/state.md has it right: use a clean **git clone** of a commit on main
  (Vendor/ and PyWidget.xcodeproj are gitignored, so copying Vendor in and running xcodegen leaves it clean). Run the
  main checkout's tools/upload.sh against it, or set `PW_MAIN_CHECKOUT=[local folder]`. The clone's own
  copy resolves MAIN to the clone, and F7 refuses it. Fail closed, but it would cost the slot. Worth fixing that wording
  before the second upload.

## Board

Idris gets one P3 line covering L1 to L4 and I3. None of them blocks the second internal upload.
{% endraw %}

</div>
