---
layout: "default"
title: "C13 review: the &quot;Install Python packages&quot; phase (T-0409, review of e80c5d2d / T-0286, Idris)"
section: "documents"
description: "Verdict: pass with fixes. The phase does what it says and fails loudly on every input fault I put to it. One gate hole (a symlinked folder passes pkg_stage check) and three small guards go on the board as P2 (T-0421\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/app-packages-phase-t0409-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/app-packages-phase-t0409-odalys.md</code></span></div><h1>C13 review: the "Install Python packages" phase (T-0409, review of e80c5d2d / T-0286, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. Date: 2026-10-27 (Day 6). Seen: the diff only (install_packages.sh, the phase in project.yml,
AppPackagesLayoutTests.swift, the two measure rows in sizes.tsv). The commit message and board notes were not
used as evidence. e80c5d2d is not on main; its rebased copy ad34570d is, with an identical tree (`git diff
e80c5d2d ad34570d` is empty), so the runs below are on HEAD e73023d7 unless marked "at ad34570d".

**Verdict: pass with fixes.** The phase does what it says and fails loudly on every input fault I put to it.
One gate hole (a symlinked folder passes `pkg_stage check`) and three small guards go on the board as P2
(T-0421 Pernille, T-0422 Idris). None blocks the Day 10 alpha build.

## Runs (all through tools/xc.sh, foreground, one at a time; simulator iPhone 17e, iOS 27)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs (all through tools/xc.sh, foreground, one at a time; simulator iPhone 17e…, scrolls sideways" data-n="1" style="--tw:914px" markdown="1">

| # | Log (ops/runs/) | What | Result |
|---|---|---|---|
| 1 | xcodebuild-20261027-070028.log | Debug build, fresh derived data | BUILD SUCCEEDED; stage and check exit 0, 8 packages, 2056 files |
| 2 | xcodebuild-20261027-070110.log | PKG_SEED_DIR with ctypes/\_\_init\_\_.py | BUILD FAILED: `pkg_stage check: [4] app_packages: ctypes/__init__.py is on the L12 denylist` |
| 3 | xcodebuild-20261027-070132.log | Incremental, no seed; ctypes/ left from run 2 plus a planted oldpkg/ and oldpkg-1.0.dist-info/ in the built app | BUILD SUCCEEDED; both gone, 16 entries, 2056 files |
| 4 | xcodebuild-20261027-070151.log | PYWIDGET_WHEELS with the idna wheel missing | BUILD FAILED: `[2] idna: pinned wheel idna-3.20-py3-none-any.whl not in ...` |
| 5 | xcodebuild-20261027-070214.log | certifi wheel with one byte flipped (same size) | BUILD FAILED: `[2] certifi: sha256 differs from the pin` |
| 6 | xcodebuild-20261027-070235.log | PKG_SEED_DIR with `evilpkg -> /tmp/...` (symlinked folder) | **BUILD SUCCEEDED** (finding 1) |
| 7 | xcodebuild-20261027-070257.log | test on the run 6 app | Simulator refused the install (MIFileManager validateSymlinksInURLDoNotEscapeURL) at 07:03:17; xcodebuild then hung; killed at 07:13:11 (exit 143, T-0388 pattern) |
| 8 | xcodebuild-20261027-071331.log | Seed removed; rebuild + AppPackagesLayoutTests | TEST SUCCEEDED, 3 tests, 0 failures |
| 9 | xcodebuild-20261027-071423.log | Release, generic/platform=iOS, CODE_SIGNING_ALLOWED=NO, PKG_STAGE_DEBUG_BUILD=YES | BUILD SUCCEEDED; stage warnings: none |
| 10 | xcodebuild-20261027-071626.log | Same as 9, at ad34570d in a throwaway worktree | BUILD SUCCEEDED; 9 notice warnings (rows and MPL text came later, T-0408) |

</div>


Outside Xcode: `codesign --verify --strict` on the run 8 app passes, and CodeResources names app_packages/ 4112
times (2056 files x 2 tables). Stage run under `sandbox-exec (deny network*)`: exit 0, 2056 files, 2,500,579 B
(control: a socket connect in the same sandbox gets EPERM). Missing wheel folder, run direct: exit 1,
`FileNotFoundError` (finding 3).

## Checks asked for

1. **Idempotence, incremental builds, stale packages.** Pass. The phase deletes `$OUT` and `$APP/app_packages`
   and restages every build (`basedOnDependencyAnalysis: false`), so a package dropped from the manifest cannot
   linger. Run 3 shows it: a planted stale package and the run 2 seed both vanish. One nuance: a *failed* check
   build leaves the rejected app_packages in Products (run 2 left ctypes/ there) until the next build; a
   `test-without-building` in between would test it and fail, which is the right outcome. No change asked.
2. **Failure modes.** Pass. Missing wheel and bad sha256 fail the stage step with code 2, the problem line
   printed, and app_packages untouched (stage fails before the copy). `set -Eeuo pipefail` plus the ERR trap
   catch a missing `CODESIGNING_FOLDER_PATH`/`DERIVED_FILE_DIR` (unbound) and a missing STDLIB_MODE file.
   Weak spot: a never-fetched wheel folder exits 1 ("usage") with a Python traceback text and no remedy
   (finding 3).
3. **Nothing runs from an extracted archive; network blocked.** Pass. Wheels are read as bytes, size and sha256
   checked before unpacking (`return None # never unpack bytes that are not the pinned ones`); pkg_verify.unpack
   refuses unsafe names, symlink members, duplicates and escapes, into a `tempfile.mkdtemp` outside the repo.
   Python runs with `-I`, so neither the cwd nor any unpacked folder is on sys.path. pkg_stage imports no network
   module and runs identically with the network denied. Staged bytes are then written to DerivedData
   (pywidget/ios/build/, gitignored, inside the repo tree): written, never built, imported or run.
4. **Ordering against "Acknowledgements check" (367abe7c).** The order is right. Log order (run 1): Install
   Python packages, Validate pro-flags.json, Acknowledgements check, then CopySwiftLibs and CodeSign.
   `pkg_stage check` is the only gate that binds the bytes in app_packages to the stage report. The
   acknowledgements tool decides what ships from manifest.toml and the phase's PKG_TIERS default
   (`pkg_ships`, `PKG_TIERS:-` regex); it never walks app_packages. So a LICENSE seeded into app_packages
   (065040.log) can only be caught by the packages phase, and `[2] ... no pinned wheel staged it` is the right
   class: the file has no provenance. The ack check's reasoning assumes app_packages equals the manifest, which
   is true only after `pkg_stage check` passes, so it must run after it. Cost: a build with two independent
   faults reports one per run. Acceptable.
   Coupling to keep in mind: acknowledgements.py parses `PKG_TIERS:-pure` out of install_packages.sh by regex and
   falls back to {pure, native} if the text changes shape. Do not reword that line without running the ack tool.
5. **Size rows reproducible?** The pure-set row, yes, to the byte: 2,500,579 B from `pkg_stage measure` on the
   run 9 app (twice), on the run 10 app, and from the stage stand-in in runs 1, 9 and 10. The whole-app row, only
   to its stated precision: at ad34570d (run 10) the whole .app zips to 15,024,316 B against the row's
   15,024,455 B (139 B, 0.001%); both are 15.024 MB. At HEAD it is 15,067,760 B, of which 43,010 B is the
   Acknowledgements/ files T-0412 added; the other 434 B are the later Premades.swift and runner.py changes plus
   build-to-build variance (not separated). The row should say
   that whole-app bytes move by about 10^2 B between builds of the same tree (finding 4). Also: run 9 staged with
   no notice warnings, so PKG_STAGE_DEBUG_BUILD=YES is no longer needed for a Release measure.

## Findings

1. **P2, T-0421 Pernille (tools/pkg_stage.py check).** A symlinked *folder* in app_packages passes the check
   and the build succeeds (run 6). `os.walk` lists a folder symlink in `dirs` and does not follow it; only file
   symlinks in `fs` are refused. In run 6 the link pointed outside the bundle and the simulator installer refused
   it (run 7); a link to a folder inside the bundle would install. Stage writes only regular files, so today only
   PKG_SEED_DIR or a later write can produce one; the gate still claims to refuse symlinks. Fix: refuse any
   `os.path.islink` among `dirs` too, and add a seeded-symlink-folder case to the stage tests.
2. **P2, T-0422 Idris (install_packages.sh).** `PKG_STAGE_DEBUG_BUILD=YES` is honoured on any action, including
   an archive (`ACTION=install`), where it turns the licence-notice gate into warnings. The archive-mode ack
   check is a second net, but the first gate should not have an off switch in a shipping build. Refuse it when
   `ACTION=install`, as PKG_SEED_DIR is refused outside Debug.
3. **P2, T-0422 Idris (install_packages.sh).** No wheel folder (a fresh machine, pkg_fetch never run) gives
   `pkg_stage stage exited 1 (1 usage ...)` and a FileNotFoundError. Check `[ -d "$WHEELS" ]` first and say
   "run tools/pkg_fetch.py".
4. **P2, T-0422 Idris (sizes.tsv).** Add to the whole-app row that its bytes vary by about 10^2 B between builds
   of the same tree (139 B in this review) and are compared at MB precision; the pure-set delta is exact.

Notes, no line: the script comment says the stdlib strip check runs "after the last write", but CopySwiftLibs
runs after the phase (run 1 order). It copies only Swift runtime libraries, never under python/ or
app_packages/, so the claim <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for those two; reword it to say so when the file is next touched. The layout test checks the denylist at the top path component only;
nested names are caught by the RECORD comparison instead. Both fine as they are.

## Clean-up

Seeds and wheel copies removed (pywidget/ios/build/t0409-seed-*, /tmp/t0409-*); the worktree at ad34570d removed;
run 8 left the dd-t0409 app clean. No pywidget/ios source changed.
{% endraw %}

</div>
