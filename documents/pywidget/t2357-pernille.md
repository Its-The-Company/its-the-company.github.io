---
layout: "default"
title: "T-2357: review of 5de0ba1b2 (internal TestFlight flag for the Release legal links check)"
section: "documents"
description: "Verdict: blocked for anything past one internal build. The flag itself is strict by default and nothing in the project sets it. The weak point is everything after the archive. An --internal archive carries no mark, the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2357-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2357-pernille.md</code></span></div><h1>T-2357: review of 5de0ba1b2 (internal TestFlight flag for the Release legal links check)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent (Commandment 13): read the diff and the code, not the commit message or board notes.
Scope: `pywidget/ios/scripts/check_legal_links.py`, `tools/upload.sh --internal`, the ledger `ops/testflight-internal.tsv`,
`pywidget/tests/privacy/test_check_legal_links.py`, `tests/upload_test.sh`. Host tools only, no Xcode.

**Verdict: blocked for anything past one internal build.** The flag itself is strict by default and nothing in the
project sets it. The weak point is everything after the archive. An `--internal` archive carries no mark, the
ordinary `--archive ... --upload` path takes it with no question, and once the build is in App Store Connect nothing
the person clicking "add to external group" or "submit for review" can see says it is internal-only. The test that
claims to cover shell leakage doesn't test it (a surviving mutant). H1 and H2 must be fixed before this flag is used
for an upload. M1 and the Lows can ride along with H1.

## What I checked and found clean

- Default strict: `verdict()` (check_legal_links.py:58) accepts only the exact string `YES`. Missing, empty, `NO`,
  `yes` and `YES ` all fail, and the tests cover them. A Release archive without the flag still exits 1.
- No other source of the flag: `git grep` and a filesystem grep over `pywidget/ios` (`*.xcconfig`, `*.xcscheme`,
  `*.pbxproj`, `project.yml`) find nothing. `launchctl getenv PW_INTERNAL_TESTFLIGHT` is empty, so a GUI-launched
  Xcode on this Mac doesn't inherit it.
- Runner and CI: `tools/macbook-runner/kinds.json` has no kind that archives or uploads, and no kind carries an `env`.
  The runner builds job env from a fixed base plus the kind's own `env` (runner.py:1554-1557), so a job submitter
  can't inject the flag. There is no CI that archives.
- Shell leakage today: `unset PW_INTERNAL_TESTFLIGHT` (upload.sh:20) works. A demo stub that records the env
  xcodebuild would get printed `env=unset` on both calls when the caller exported `YES` (scratch `bin/demo.sh`, case 1).
- The flag goes on the archive line only (upload.sh:40, used on the archive call), never on the export.
  `--internal --archive` is refused (upload.sh:39).

## Findings

### H1 (High, blocking). An internal archive is unmarked and can be re-used for an upload with no check
upload.sh:45 names the `--internal` archive `upload-<ts>.xcarchive`, the same name as a strict one. Nothing is
written into the archive. The `--archive` branch (upload.sh:47) only checks that `Info.plist` exists.

Failure scenario, run in scratch (`bin/demo.sh`, case 3, real upload.sh with a stand-in xc.sh):
1. `upload.sh --project ... --internal` (export only, the safe default). The ledger gets
   `1.0  7  export  exit 0  internal TestFlight only`.
2. `upload.sh --archive ops/runs/upload-<ts>.xcarchive --upload` exits 0, writes `destination upload`, prints no
   warning and adds no ledger row.

Export first, then upload the same archive, is the natural two-step workflow. After step 2 the ledger says the build
was only exported, and it is wrong. Xcode Organizer's "Distribute App" on the same archive has the same gap.

Fix: after a successful `--internal` archive, put a marker in the archive (for example a `PWInternalTestFlightOnly`
key added to the `.xcarchive` Info.plist with PlistBuddy) and name it `upload-internal-<ts>.xcarchive`. `--archive`
then refuses a marked archive unless `--internal` is also given (so `--internal --archive` becomes allowed for marked
archives only), and refuses any archive whose CFBundleVersion appears in the ledger without `--internal`. Every
`--internal` run that has `--upload` writes its own ledger row. Add tests for each refusal.

### H2 (High, blocking). App Store Connect cannot tell an internal-only build apart, and the ledger may never be seen
After upload, any build can be added to an external group or picked for App Review by whoever is signed in to App
Store Connect (the Investors; the company can't sign in). The only record is the ledger.
- upload.sh:82 writes it to `$ROOT/ops/testflight-internal.tsv`, where `$ROOT` is the checkout the script runs from.
  Run from a scratch export (the way the T-2356 line says the unit suite was run), the ledger lands in scratch and is
  deleted with it.
- Nothing commits it, and nothing the Investors read names the build. upload.sh:83 also prints the fixed path
  `ops/testflight-internal.tsv` even when the ledger went somewhere else.

Failure scenario: build 1.0 (7) goes to internal testers. Later the Investors submit for review and pick (7), the only
build in the list. The app has no in-app privacy policy link, so App Review rejects under 5.1.1(i). That costs a
review cycle at minimum.

Fix:
- (a) Always write the ledger to the main repository, not `$ROOT` of a scratch copy, or refuse `--internal` outside
  the main checkout, and commit the row with the upload.
- (b) The GitHub ask that hands the build to the Investors (T-2356) names version and build number, says "internal
  group only: never an external group, never App Review", and links the ledger.
- (c) The App Review submission step (whichever line submits) checks that the chosen build is not in the ledger and
  was archived without the flag.

### M1 (Medium; fix with H1). The "even from the shell" test doesn't test the shell
tests/upload_test.sh:34 checks `xc_argv` for the flag, but the stand-in xc.sh (tests/upload_test.sh:6) records only
argv. An exported variable reaches xcodebuild through the environment, never argv, and the script phase reads
the environment. Mutants that survive the full suite:
- S1: delete `unset PW_INTERNAL_TESTFLIGHT` (upload.sh:20). It survives. With it, the demo shows `env=YES` on both
  xcodebuild calls of a *default* run, and no ledger row. That is a flag-on build with no record, which is the worst
  case this change exists to prevent.
- S6: `export PW_INTERNAL_TESTFLIGHT=YES` alongside XFLAG. It survives, and the flag would then reach the export too.

Fix: have the stand-in record `${PW_INTERNAL_TESTFLIGHT-unset}` per call and assert `unset` on both calls of the
default run, and on the export call of `--internal`.

### L1 (Low). Near-miss truthy values untested
P3 (`in ("YES", "1", "true")`) survives. Add `"1"`, `"true"`, `"Yes"` to the off-by-default subtests in
test_check_legal_links.py:44-45 so the exact-match rule is pinned.

### L2 (Low). Ledger row with an unknown build number
upload.sh:79-82 writes `?` when PlistBuddy can't read CFBundleVersion. A row with `?` can't be matched to an App Store
Connect build. With `--internal`, refuse to upload (or fail loudly) when the build number is unreadable.

## Mutants (scratch `/Volumes/Company SSD/company-scratch/T-2357-pernille/bin/mutants.sh`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Mutants (scratch /Volumes/Company…, scrolls sideways" style="--tw:538px" markdown="1">

| id | mutation | result |
|---|---|---|
| S0, P0 | baseline (whitespace) | pass, as expected |
| S1 | drop `unset PW_INTERNAL_TESTFLIGHT` | **survived** (M1) |
| S2 | XFLAG always set | killed |
| S3 | allow `--internal --archive` | killed |
| S4 | ledger written on every run | killed |
| S5 | flag on the export line too | killed |
| S6 | also `export` the flag | **survived** (M1) |
| P1 | strip whitespace before compare | killed |
| P2 | flag defaults to YES | killed |
| P3 | accept YES/1/true | **survived** (L1) |
| P4 | pass silently, no warning | killed |
| P5 | editor bench flag lets an archive through | killed |

</div>


The check script's logic is pinned well. The gaps are in upload.sh's environment handling and in what happens to the
archive and the build after the check has run.
{% endraw %}

</div>
