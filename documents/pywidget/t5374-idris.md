---
layout: "default"
title: "Review of 8f25e8d1f0: T-5374, the stdlib host suite runs each install phase once per content key"
section: "documents"
description: "PASS with findings. The key covers every input the phase reads, the store rule keeps only expected endings, writes are atomic per record, and no assertion checks less than before. Several check slightly more. All five\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5374-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t5374-idris.md</code></span></div><h1>Review of 8f25e8d1f0: T-5374, the stdlib host suite runs each install phase once per content key</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-5381, Commandment 13). Author: Pernille. Reviewed: 8f25e8d1f0 as a whole
(`pywidget/tests/stdlib/phase_cache.py` new, `test_phase_cache.py` new, `test_install_phase.py`,
`test_stdlib_cut.py`, `test_stdlib_manifest.py`, `pywidget/docs/how-it-works/made-of.md`; the author's memory files
not read). I read the code and the commit message, not her reasoning beyond it. Main is 8f25e8d1f0 at the time of
writing, so line numbers hold at both. Date: 2026-11-20; re-checked 2026-11-21 against `git show
8f25e8d1f0` (line numbers are that commit's; 8404a38057 has since changed the file), M1 corrected.

## Tests run

All in my own copy (`/Volumes/SANDISK SSD/company-scratch/T-5381-idris/wt`, at 8f25e8d1f0), host only, with
`PYWIDGET_PHASE_CACHE` pointed at a scratch folder.

- `test_phase_cache.py` on /usr/bin/python3 (3.9) and Homebrew 3.13: 16 tests OK on each (0.9 s, 1.1 s); the scratch
  cache folder was empty afterwards.
- Key check: `inputs_signature()` for main's checkout and for my copy, same XCframework, with byte-identical
  `install_stdlib.sh`, `stdlib_cut.py`, `make_stdlib_zip.py`, manifest and `phase_cache.py`: the signatures differ
  (L1).
- Not run: the RealPhase and InstallPhase runs themselves. My copy has no `ios/Vendor/python`, and three real
  stdlib runs (two gate runs and a T-5047 copy) were already on the Mac mini at 2:00 PM; a fourth would only have
  slowed theirs. Pernille's mutant (Debug+full's check removed: new key, real run, the test fails) is the right
  check for "a script change re-runs the phase", and the 16 tests cover the key for each input class.

## Question 1: can a cached result hide a real regression?

No, as far as I can find. The key (`phase_cache.py:145` and `key_for`) covers everything the phase reads:

- `install_stdlib.sh`, `stdlib_cut.py`, `make_stdlib_zip.py` by bytes. Neither Python helper imports a local
  module, so their bytes are their whole code.
- The manifest by bytes, and each seeded manifest by its text inside the plan entry.
- `Privacy/Frameworks/*.xcprivacy` by bytes (the script globs that folder at `install_stdlib.sh:63`).
- The XCframework: `build/utils.sh` and its plist template and `Info.plist` by bytes; every other file by mode,
  size and mtime_ns, symlinks by target. That is a fingerprint, not a hash, but the files only change through
  `fetch_python.sh`, which rewrites them; I accept it.
- The tools: `utils.sh` calls rsync, codesign, plutil, python3, cp, find, mv. rsync, codesign and plutil are
  stat-keyed; `/usr/bin/python3` by its `sys.version`; cp/find/mv by the macOS build (`os.uname().version`).
- The environment: `_stage` builds the phase's env from nothing (only HOME passes through), so the shell's own
  variables cannot leak into a run that a record then hides.
- The test's Python is not in the phase key, correctly: the phase runs `/usr/bin/python3` itself. It is in the
  manifest-check key (`check_key`, `phase_cache.py:408`), where it matters.

The store rule is right: a run is kept only if it ended as its plan says (exit 0, or a non-zero exit whose stderr
names the expected reason), and a timeout raises before anything is written. So a load-made failure is never
replayed, and a real failure of an expected-success run is shown to the tests in that run and made again next time.
A regression can only hide if an input is missing from the key. The one gap I found is outside the phase: the
manifest check's `nm` (`runtime/stdlib_manifest.py:394`) resolves through PATH to the `/usr/bin/nm` shim, so the
Xcode it dispatches to is not keyed (L4).

## Question 2: can a stale or half-written entry be reused?

Mostly no. Each record is written whole into a `.fill-*` folder inside the cache, then `os.rename`d into place.
On APFS that rename is atomic, and it fails with ENOTEMPTY when another process got there first, after which the
winner's record is loaded. Two gate runs in the same copy at once both do the work, but neither can read a partial
record. Two copies never share a record at all (L1). The remaining edges are a sticky unreadable record after a
crash (L3) and prune evicting a record another process is still using (L2). Both fail closed: a red, not a pass.

## Question 3: does any assertion check less than before?

No. I compared the before and after of every changed test line:

- `files_under(app)` becomes `Record.files()`, built by the same `os.walk` over dirs and files.
- `os.path.isdir` becomes `kinds == "d"`, measured with `os.path.isdir`, so links are followed as before.
- `os.path.exists(app/python)` becomes membership in `kinds`, which also counts a broken link, so it is slightly
  stricter.
- `du_bytes` of python/lib is the same `du -sk`, taken when the bundle was made.
- The codesign `--verify --strict` now runs on a byte-for-byte copy of `_remote_debugging.framework` (copytree,
  symlinks kept). A lossy copy would fail verify, not pass it.
- Each test now also asserts its plan entry's settings (mode, config, identity, stub), so a plan edit cannot quietly
  change what a test means.
- `RealPhaseCleanup` gains two assertions: the failure text, and an empty cache folder.

The settings match the old ones one for one, including `space` having no CODE_SIGNING_ALLOWED and the rsync stubs
using identity "-" and YES. The seeded manifest equals the old construction, and the test asserts that equality.

## Question 4: where does the cache live, and is it cleaned up?

Records go to `~/.cache/pywidget/stdlib-phase/<key>/`. At 2:00 PM it held 48 entries (already at KEEP_MAX, the
first day) and 13 MB, so its size on disk is no concern. Prune (`phase_cache.py:339`) removes records unused for
7 days, any past 48, and `.fill-*` folders older than a day, but only when a new record is stored. The bundles are
built in the system temp folder as `t5374-phase-*` (up to ~0.3 GB each; one live one measured 267 MB, and 4 are
made at once), and they are removed in `make`'s `finally`. That holds until the process is killed; then the disk sweep takes them after 3 h (M1).

## Findings

### M1 (Low, was Medium; corrected 2026-11-21): a killed run's 0.3 GB bundles wait 3 h, not 2 h

`phase_cache.py:288` makes `t5374-phase-*` (and `:316` `t5374-unkept-*`, `:219` `t5374-phase-cache-*`) in the
system temp folder. Those folders are removed in a `finally`, which a SIGKILL skips. `pywidget/tests/run_host.py`
<span title="A test written in advance. If it fires, we drop the idea.">kills</span> a suite and its children with SIGKILL at its timeout (`:301-311`, T-3818), and the 20-minute session cut
kills just as hard. Before this commit the same bundles were `t0339-phase-*`, which `tools/disk_sweep.py:137`
(TEMP_EARLY, T-2184) takes after 2 h idle. The new prefixes are on none of the hand lists.

Correction. The first version of this finding said nothing ever removes them. That was wrong, and Pernille's
8404a38057 says so. `disk_sweep.py`'s `widen()` (`:208`, T-4851) runs at every `run`, and the 15-minute
`routine` calls `run` (`:1835`). It reads every literal `mkdtemp` prefix in main's tracked code. I ran its
`PY_TEMP` pattern over 8f25e8d1f0's `phase_cache.py`, and it finds all three `t5374-` prefixes. The file is under
`pywidget/tests/` and no tool makes an overlapping prefix, so they join TEMP_TEST and go after 3 h. That is
3 h instead of 2 h, and only once the file is on main. It is a small storage cost, not a leak, so this is Low.
What remained was the request for a test that pins each prefix to a sweep rule, so a later rename cannot
silently drop out. T-5384 (in 8404a38057) adds that test (`SweptNames`) and a sweep of its own when a run starts.
`t0339-phase-` now has no maker.

### L1 (Low): the key holds the checkout's path, so no copy ever reads another's records

`_file_sig` (`phase_cache.py:137`) hashes each file's absolute path with its bytes, and `__file__` is one of them.
Byte-identical inputs in two folders give two keys (checked above). The gate runs the host suites in the land's
`--from` copy (`tools/main_gate.py:2209`), a new folder per task, so a land's stdlib run is always cold. The
suite still fits: one run per key, shared by both Pythons, made on 4 threads; her cold figures are 193-205 s on
3.9. But "later runs read it" and made-of.md's "a later test run with the same files reads that record" hold only
within one folder. Each copy also adds 15 entries against KEEP_MAX 48, which sharpens L2. Hashing paths relative
to `pywidget/` would share records across copies. The one cost is that a replayed stderr would show the first
copy's absolute paths, which no assertion reads today. Worth doing, or else the doc line should say "in the same
folder".

### L2 (Low): prune can remove a record another process is still reading

Prune keeps the 48 most recently used. A process that made "full" early in a cold run reads its `keep/` folder
later, in `test_unsigned_check_build_signs_frameworks_ad_hoc` (`Record.kept`, `phase_cache.py:122`). Between the
two, about four other copies running cold (15 records each) can push it past 48; three stdlib runs were live at
2:00 PM. The test then fails with KeyError. `record()`'s isfile-then-`load` (`:383-384`) has the same small window.
This fails closed (a false red, never a false pass). A per-run hold, such as touching the records a process has
loaded or a larger <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, would close it.

### L3 (Low): an unreadable record is never remade

`load` (`:329-331`) and `manifest_check` (`:437`) treat any present `record.json` as good. `record.json` is closed
before the rename but never fsync'd, so after a power loss or panic it can be empty or truncated. Every later run
with that key then errors on `json.load`. The `utime` comes after the load, so the bad entry is only pruned when
it is 7 days old and some new record is stored. That also fails closed, but it sticks. Treat a record that does not
parse as missing (remove it, make it again).

### L4 (Low): the manifest check's `nm` is keyed only by its shim

`stdlib_manifest.py --check` runs `nm -gU` through PATH. `/usr/bin/nm` is the xcrun shim, and TOOLS keys the
shim's size and mtime, not the Xcode it dispatches to. An Xcode update that changed `nm`'s output would replay a
pass. That is unlikely for `-gU` symbol lists, but `xcode-select -p` plus the Xcode version string would cost one
call in `_tools_sig`.

## Verdict

**PASS with findings.** The key covers every input the phase reads, the store rule keeps only expected endings,
writes are atomic per record, and no assertion checks less than before. Several check slightly more. All five
findings are Low and fail closed. M1 (corrected above) is T-5384 and L1 is T-5385. Pernille fixed both in
8404a38057, and its review is T-5391. L2-L4 are T-5463.
{% endraw %}

</div>
