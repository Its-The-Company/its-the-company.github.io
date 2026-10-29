---
layout: "default"
title: "T-0722: review of T-0355 slice 2 (.py and zip import and export), branch idris/t0355-projects at 8ed7cd87"
section: "documents"
description: "Fix M1 first, then merge after the alpha commit. The zip reader held against every hostile archive I threw at it: no path escaped the project, no bomb got past the caps, 300,000 damaged archives produced no crash. The\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0722-projects-slice2-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0722-projects-slice2-review-pernille.md</code></span></div><h1>T-0722: review of T-0355 slice 2 (.py and zip import and export), branch idris/t0355-projects at 8ed7cd87</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Read: `git diff 26a965b0 8ed7cd87` (MiniZip.swift, ProjectTransfer.swift,
ProjectsView.swift, the ProjectStore.swift change, ProjectTransferTests.swift, ProjectsTransferUITests.swift) and the
code it calls (ProjectStore.checkName/free/files(in:)/read, ConsoleModel.saveNow/everyModel, DevicePath). Not read:
the author's notes, reply or done-notes. Date: 2026-10-29.

## Verdict

**Fix M1 first, then merge after the alpha commit.** The zip reader held against every hostile archive I threw at
it: no path escaped the project, no bomb got past the <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>, 300,000 damaged archives produced no crash. The export
is a valid zip to `unzip`, Python's `zipfile` and `ditto`. The one Medium is not in the zip code: an upper-case
`.PY` file is imported and then hidden from the app. It is a small fix. The Lows can follow after the merge.

## What I ran

- Branch unit tests: `tools/xc.sh -project PyWidget.xcodeproj -scheme PyWidget -destination 'platform=iOS
  Simulator,name=iPhone 18 Pro' -only-testing:PyWidgetTests/ProjectTransferTests test`: 8 tests, 0 failures
  (log ops/runs/xcodebuild-20261029-153702.log in the worktree).
- A host harness that compiles the branch's own `MiniZip.swift`, `ProjectStore.swift` and `ProjectTransfer.swift`
  with a `SystemFiles` stub and `DevicePath` as copied from App/Device/DeviceSupport.swift, and runs each fixture
  through `MiniZip.entries` and `ProjectStore.importZip` in a fresh root, then lists everything outside the root.
  Fixtures come from a stdlib-only script that writes into a directory of its own. Nothing was run from inside an
  extracted archive. Files: `pywidget/docs/reviews/t0722-fixtures/` (make_fixtures.py, probe_main.swift,
  devicepath.swift).

Reproduce (from the branch's `pywidget/ios/App/Projects`):

```
python3 -I make_fixtures.py /tmp/t0722/fixtures
swiftc -O -o /tmp/t0722/probe MiniZip.swift ProjectStore.swift ProjectTransfer.swift probe_main.swift devicepath.swift
/tmp/t0722/probe probe /tmp/t0722/out /tmp/t0722/fixtures/*.zip
/tmp/t0722/probe fuzz /tmp/t0722/fixtures/seed.zip 200000
/tmp/t0722/probe importfile /tmp/t0722/out3
```

## Findings

### Medium

**M1. An upper-case `.PY` file is imported, then hidden. It is never listed, exported or deletable, and it blocks
its own name.** `importFile` and `importZip` accept the extension with `pathExtension.lowercased() == "py"`.
`ProjectStore.files(in:)` lists only `pathExtension == "py"` (case-sensitive). So the file is written to disk but
the app never shows it. `free()` compares names without case, so the hidden file still <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> its name.
- `upper_ext.zip` (`trip/MAIN.PY`, `trip/Helper.Py`): import succeeds, project "trip" is created with
  `files=0 skipped=[]`. Both files are on disk; the project shows empty.
- `upper_ext_mixed.zip` (`trip/main.py`, `trip/TOOL.PY`): `files=["main.py"]`, `TOOL.PY` is on disk and unlisted,
  and it is named neither in the result nor in the "Left out" notice.
- `probe importfile`: `importFile(named: "TOOL.PY")` wrote `TOOL.PY`; `files(in:)` lists `["main.py"]`; then
  New File "tool" fails with "There is already an item named “TOOL.PY”", a file the person cannot see.
- `exportZip` uses `files(in:)`, so these files never leave the device in a zip either.
Upper-case names are what DOS-era and some Windows zips carry, and UTType maps `.PY` to `public.python-script`,
so the picker offers such files. Fix: make the check one rule in one place. Either normalise the extension to `.py`
when importing (`MAIN.PY` -> `MAIN.py`), or have `files(in:)` match without case and keep the name. Add both
fixtures as tests. A zip whose only .py files are upper-case must never create an empty project.

### Low

**L1. A name collision inside an archive refuses the whole import, and the message asks for a choice the person
can't make.** `dup_case.zip` (`trip/Utils.py` + `trip/utils.py`), `dup_exact.zip` and `dup_nfc_nfd.zip` (NFC and
NFD `café.py`; the check does catch these as equal) all throw `Problem.exists`: "There is already an item named
“utils.py”. Choose another name." Refusing is safe (no overwrite, nothing left behind). But the copy should say
the archive holds two files whose names differ only in case, or keep both with " 2". Similarly, one non-UTF-8
entry aborts the whole import while every other kind of misfit is skipped and named. Choose one rule.

**L2. Names not flagged UTF-8 are decoded as UTF-8 anyway.** `cp437_name.zip` (flag bit 11 clear, `caf\x82.py`)
imports as `caf�.py`. Two different CP437 names can then collapse to the same name and hit L1. Decode CP437 when
bit 11 is clear (zip spec 4.4.4), or skip the entry and name it.

**L3. Share and Export send what is on disk; another window's newest text can be missing.** The files list saves
every window once, in `.onAppear`, and its comment says every window saved its text when this list appeared. That
is true only at the moment it appears. The Projects list's own "Export as Zip" (context menu) saves no other
window at all (opening Projects saves only this window). Repro on iPad, two windows on the same project: in
window B, edit main.py; within the 600 ms autosave pause, in window A long-press the project and Export as Zip.
The zip holds the previous text. Also: if window B's autosave is paused after a refused save (T-0654 H1), its text
is never in an export, and nothing says so. Fix: run the save-every-window step in the export path itself, on the
main actor before the representation is built, in both screens, and say when a window still holds unsaved text.
I did not drive this on a device; it follows from the code paths above.

**L4. Reads of picked files run on the main thread, and the size limit can be read late.** `readPicked` is called
synchronously from the `fileImporter` callback. So the coordinated read (which can wait on a file provider
download), the inflate, the CRC and the writes all block the UI with no progress shown. On the Mac, the worst
case the caps allow (L5) took 0.62 s; a phone will be slower. The first size check reads attributes outside the
coordinator, where a not-yet-downloaded file can report 0, so the whole file is read before the limit applies.
`coordinate(... error: nil)` drops the coordinator's error, so a failure reads "“x.zip” isn't there any more."
Start/stop pairing of the security scope is correct (`defer`), and every read happens inside it.

**L5. Overlapping entries are not detected; the caps hold.** `overlap_1000x32k.zip` is 53,106 bytes: 1000 central
entries that all point to one local header. It imports as 1000 files and 32 MiB (a ratio of about 630:1).
`overlap_1000x33k.zip` is refused (`tooBig`). That is within the limits as designed. Refusing two entries that share
a local offset (or overlap) would close the shape entirely for a few lines.

**L6. Exports leave temporary folders.** Each `exportZip` makes `tmp/export-<UUID>/<name>.zip` and nothing removes
it. The transfer representation can be built more than once per share. Remove earlier export folders at the start
of the next export.

**L7. Export and import are not symmetric.** Export has no caps and no text check. A project file over 4 MiB, or
one that is not UTF-8 (both possible through `pywidget.files`), exports fine, and then its own zip will not import.
Either cap or warn on export, or document it.

**L8. Multi-file import errors don't always name the file.** `importFiles` joins `localizedDescription`s. The
`checkName` refusals ("Names can be at most 64 characters.") don't include the name, so with several files picked
the person can't tell which one failed. A name over 64 characters could be shortened with `fitted`, as conflict
copies are, instead of being refused.

**L9. Test gaps.** ProjectTransferTests covers MiniZip-written archives and one real `ditto` zip. It does not cover
lying central sizes, zip64 markers, truncation, overlapping entries, duplicate or case-colliding names,
backslash/RTL/empty names, symlink-mode entries, or upper-case extensions. The fixtures script makes all of them.
The UI test drives the files list's Share… and the Projects list's Export as Zip. It does not drive the files
list's toolbar More > Export as Zip.

## Probed and held (no finding)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Probed and held (no finding), scrolls sideways" style="--tw:916px" markdown="1">

| Probe | Fixture | Result |
|---|---|---|
| zip-slip `..` | `slip_dotdot_only.zip`, test `p/../../evil.py` | single `..` top is dropped, project "Imported Project"; deeper paths skipped; nothing outside the root |
| absolute path | `slip_abs.zip` | skipped and named; `/tmp/t0722-evil.py` not created |
| backslashes | `slip_backslash.zip`, `slip_top_backslash.zip` | skipped (leading full stop); never a path separator on iOS |
| local name differs from central | `name_local_differs.zip` | central name used (`ok.py`); local `../evil.py` ignored |
| symlink entry | `symlink.zip` (mode 0120777) | written as a regular file holding the link text; no link created |
| ratio bomb | `ratio_at_cap.zip` 4,191 B -> 4 MiB; `ratio_over_cap.zip` | at cap accepted, cap + 1 refused `tooBig` before inflating |
| many entries | `many_1001.zip`; `count_ffff.zip` | `tooBig`; `unsupported("zip64")` |
| zip64 size markers | `zip64_sizes.zip` | `unsupported("zip64")` |
| lying central sizes | `lie_central_small.zip`, `lie_central_big.zip`, `lie_csize_huge.zip` | `damaged`; the inflater cannot write past the claimed size |
| lying local sizes / data descriptors | `lie_local_only.zip`, `data_descriptor.zip` (Python streaming writer), the test's `ditto` zip | accepted correctly from central sizes |
| CRC mismatch | `crc_bad.zip` | `damaged` |
| empty deflate body, bzip2 | `deflate_empty_body.zip`, `method_bzip2.zip` | `damaged`; `unsupported("compression method 12")` |
| truncation and corruption | every truncation of `seed.zip`, then random 1-8 byte flips: 200,000 iterations; 100,000 on `data_descriptor.zip` | 0 crashes (33,914 and 21,956 accepted after CRC, the rest refused) |
| invisible and empty names | `rtl_override.zip` (U+202E), `empty_name.zip` | skipped and named |
| self-extractor prefix | `sfx_prepended.zip` | read correctly |
| export format | `probe export`, then `unzip -t`, `zipfile.testzip()`, `ditto -x -k` | all OK; UTF-8 flag set, Unix 0644, stored when deflate doesn't shrink |
| " 2" naming | `testExportThenImportRoundTripsEveryByte` | "trip 2" for the project, "main 2.py" for a file, compared without case |

</div>


**App Review and conventions.** The system document picker (`fileImporter`) and `ShareLink` only. There are no new
entitlements, no usage strings and no network fetch. The documents folder is not exposed to Files
(`UIFileSharingEnabled` is not set), so nothing hidden shows up there. Importing the person's own `.py` files into
an app that already runs typed Python adds no 2.5.2 exposure, because the code arrives by the person's choice, not
by download. Import Project… sits in a More menu and Export as Zip in the context menu and the More menu: ordinary
iOS placement. A successful import with nothing left out gives no confirmation beyond the new row. That is fine,
and matches Files.

## Re-review (T-0724): b47ad839 (T-0723), diff 8ed7cd87..b47ad839

Reviewer: Pernille, 2026-10-29. Read the diff (ProjectStore.swift, ProjectTransfer.swift, ProjectsView.swift,
ProjectTransferTests.swift) and the code it calls (`free`, `freeName`, `files(in:)`, `move`, the New File and
Rename alert, `renameProjectFile`) before the author's message. Not read: Idris's notes.

### Verdict

**M1 is closed. Fix R1 (a regression from the L1 fix) and the typed-name rule (R2), then merge after the alpha
commit.** L1, L6 and L8 are fixed as asked, except L8's "shorten an over-64 name", which stays in T-0725.

### What I ran

- The 33 fixtures through the branch's own MiniZip.swift, ProjectStore.swift and ProjectTransfer.swift, same
  harness as above (`probe_main.swift` has to be copied to `main.swift` before `swiftc`; the reproduce block
  above missed that). Every fixture: nothing outside the root, `hidden=[]`.
- `probe importfile`: `TOOL.PY` is written `TOOL.py` and listed; New File "tool" is refused with
  "There is already an item named “TOOL.py”", a file the person can now see.
- New: `t0722-fixtures/make_collisions.py` (archives whose entries all share one name), timed.
- Branch tests through `tools/xc.sh`, iPhone 18 Pro Simulator, `ProjectTransferTests` + `ProjectStoreTests`:
  27 tests, 0 failures (worktree log ops/runs/xcodebuild-20261029-160926.log).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I ran, scrolls sideways" data-n="1" style="--tw:996px" markdown="1">

| Finding | Fixture / check | At 8ed7cd87 | At b47ad839 |
|---|---|---|---|
| M1 | `upper_ext.zip` | project "trip", 0 files, both on disk | `Helper.py`, `MAIN.py`, listed, exported |
| M1 | `upper_ext_mixed.zip` | `TOOL.PY` on disk, unlisted, unnamed | `main.py`, `TOOL.py` |
| M1 | `probe importfile` | `TOOL.PY` hidden, blocks "tool" | `TOOL.py` listed; the refusal names it |
| L1 | `dup_case.zip`, `dup_exact.zip`, `dup_nfc_nfd.zip` | whole import refused | both kept, second " 2" |
| L1 | non-UTF-8 entry (test `latin1.py`) | whole import refused | skipped and named, rest imported |
| L6 | `testExportRemovesOldExportFolders` | folders piled up | older than 10 min removed, newer kept, nothing else touched |
| L8 | `testImportFileRefusalsNameTheFile` | "Names can be at most 64 characters." | every refusal names the file |
| held | the other 26 fixtures | | unchanged: same results as the table above |

</div>


### R1 (Medium): naming collisions inside one archive take cubic time on the main thread. Fix before merge

`importZip` now gives each entry `freeName(name, in: staging)`. `freeName` tries " 2", " 3", … and each try calls
`free`, which lists the staging folder and compares every name. With n entries of one name that is about n³/6
comparisons, and the import runs on the main thread (L4). On this Mac, `-O`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: R1 (Medium): naming collisions inside one archive take cubic time on the main…, scrolls sideways" style="--tw:624px" markdown="1">

| entries named `trip/a.py` | zip size | import |
|---|---|---|
| 100 | 9,822 B | 0.74 s |
| 200 | 19,622 B | 5.02 s |
| 400 | 39,222 B | 36.28 s |
| 1000 (at the 1000-entry cap) | 98,022 B | minutes (by n³, about 9 min), then refused: the 1000th copy finds no name |
| 999 | 97,924 B | run stopped at the 10-minute limit with 682 files written; the hidden `.import-` folder stayed |

</div>


The 1000 and 999 archives ran one after the other in a single 10-minute run, so I give no exact time for 1000.
A phone is slower. The person sees a frozen app and has to force-quit, and the hidden `.import-` folder stays in the
projects folder (`children` skips hidden files, so it is never listed, only stored). At 8ed7cd87 the same archive was refused at once (`Problem.exists`), so T-0723
introduced this. Also: the 1000th copy finds no free name (`freeName` stops at 999), so the whole import is refused after
all that work. `long_upper.zip` (61 `A`s `.PY` beside 61 `a`s `.py`) held: the second came in as a 64-character
`aaa… 2.py`, shortened by `fitted`.
Fix: pick names in memory before writing: keep a `Set` of the names already taken in this archive, keyed by the same
equality `free` uses (case-insensitive and canonical, so `café` NFC = NFD). Each candidate is then one lookup. Skip
and name an entry that needs more than " 999". Test: `same_1000.zip` imports in under a second in the Simulator and
`same_999.zip` keeps every file.

### R2 (product <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>): `notes.txt` typed as a file name

The question as put to me was about an *imported* `notes.txt`. That does not happen. `importFile` and `importZip`
check `isPyName` before `pyName`, so a picked `notes.txt` is refused with its name, and one in a zip is skipped and
named (`testImportFileRefusalsNameTheFile`). The `.txt.py` case is only a name typed into New File or Rename:
`createFile("notes.txt")` writes `notes.txt.py` (the branch's own test asserts this).

Ruling:
1. **Import: refuse or skip, and name the file. Right as it is.** A project holds Python files; the app should not
   rename a file the person chose to fit that.
2. **Stored names end in exactly `.py`. Right.** It is the only rule that keeps "on disk" equal to "listed". It also
   fixes a slice-1 bug: a typed `v1.2` or `my.widget` used to be stored as is and hidden. Those should keep
   getting `.py` added.
3. **A typed name whose extension is another known file type: refuse it, don't append.** Silently turning
   `notes.txt` into `notes.txt.py` is wrong. The person asked for a text file, gets a Python file with a name
   they did not type, and Run treats it as code. Apple's own apps do not change an extension the person typed
   without saying so: the Mac save panel asks first. A project can't hold a `.txt`, so asking "keep .txt?" has
   no good answer; refusing does. Rule: if the typed extension (not `py` in any case) maps to a declared system type
   (`UTType(filenameExtension:)` is non-nil and not dynamic: txt, json, csv, md, png, …), refuse it in New File
   and Rename: “notes.txt” isn't a Python file name. Files in a project end in .py. Anything else (`v1.2`,
   `data.v2`, `my.widget`) gets `.py` added, as now. Add one message line to the New File and Rename alerts:
   "Python files end in .py; it's added for you." Test: `notes.txt`, `config.JSON`, `photo.png` refused;
   `v1.2` -> `v1.2.py`; `MAIN.PY` -> `MAIN.py`. Line T-0726 (Idris, P1, Opus high), with R1.

### Probed and held (no finding)

- The `.py` rule has one source: `fileName` (New File, Rename) and both imports call `pyName`. `files(in:)` still
  lists exact `.py`, which is now all any route writes. Rename `main.py` to `Main.PY` goes through `move`'s
  case-only path and lands as `Main.py`.
- `importFile` checks `checkName` on the `.py` name and puts the picked name in the message. The size and UTF-8
  refusals name the stored name (`TOOL.py` for a picked `TOOL.PY`), which is close enough.
- `removeOldExports` touches only `export-` folders in tmp, uses the folder's modification date, and ignores
  errors. If a share sheet stays open past 10 minutes and the person starts a second export, the first file can
  be removed under the first sheet. That is rare, and the sheet fails without data loss. No finding.
- The archive-level "nothing to import" message now names the archive. The "Left out" notice says ".py text
  files", which matches the non-UTF-8 skip.

## Re-review (T-0728): 6dface5e (T-0726), diff b47ad839..6dface5e

Reviewer: Pernille, 2026-10-29. Read the diff and its tests before the author's notes.

### Verdict

**R1 and R2 are fixed. Merge after the alpha commit.** One new Low below. It has no board line and can go in with
T-0725 if Idris is in the file anyway.

### What I ran

- My Python-built `make_collisions.py` archives through the same host harness, built from the 6dface5e sources
  (`-O`, wall time including process start):


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: What I ran, scrolls sideways" style="--tw:679px" markdown="1">

| archive | at b47ad839 | at 6dface5e | result |
|---|---|---|---|
| same_100 | 0.74 s | 0.19 s | 100 files, `a.py`, `a 2.py` … `a 100.py` |
| same_200 | 5.02 s | 0.07 s | 200 files |
| same_400 | 36.28 s | 0.11 s | 400 files |
| same_999 | stopped at 10 min | 0.24 s | 999 files, `a 999.py` holds `x=1\n`, nothing skipped |
| same_1000 | minutes, then refused | 0.25 s | 999 files, `trip/a.py` skipped and named, no `a 1000.py` |

</div>


  `hidden=[]` and nothing outside the root for all five.
- The 33 fixtures, built from both b47ad839 and 6dface5e: the outputs are byte-identical, and all 33 have
  `outside=[] hidden=[]`. `dup_case`, `dup_exact` and `dup_nfc_nfd` still keep both files, the second as " 2".
- Branch tests through `tools/xc.sh`, iPhone 18 Pro Simulator, `ProjectTransferTests` + `ProjectStoreTests`:
  30 tests, 0 failures. Simulator: same_999 in 0.297 s, same_1000 in 0.283 s (worktree log
  ops/runs/xcodebuild-20261029-162022.log).
- `nameKey` against `caseInsensitiveCompare` and against APFS itself (write the first name, then the second with
  `.withoutOverwriting`): 53 chosen pairs (ß/SS, ﬁ/fi, ς/σ, İ/i, Kelvin K, Ohm Ω, ǅ/ǆ, full-width letters, Cherokee,
  Georgian, Deseret, NFC/NFD) and 38,529 random case and decomposition pairs. Harness:
  /tmp/t0728/key/main.swift, not kept.
- `UTType(filenameExtension:)` on the host for 57 plausible typed extensions.

### R1: fixed

`archiveNames` picks the names in memory. It keeps one Set of `nameKey` values and one next number per base name,
skips anything past `copiesMax`, and writes to staging with `.withoutOverwriting`. A literal `a 2.py` in the archive
pushes the next `a.py` on to ` 3`, and his test checks that. 1000 copies are named in under a second on the host and
in the Simulator.

### R2: matches the ruling

The rule matches the ruling: refused only when the extension is not `py` in any case and `UTType` is non-nil and not
dynamic. The message is the ruling's exact text, “notes.txt” isn't a Python file name. Files in a project end in
.py. The New File and Rename alert has the line "Python files end in .py; it's added for you." His test covers
notes.txt, config.JSON and photo.png (each refused in both New File and Rename, nothing written), `v1.2`,
`my.widget`, ` data.v2 ` and `MAIN2.PY`.
Held, no finding: the system's type list also declares `config`, `cfg`, `log`, `app` and `y`, so `my.config` and
`pos.y` are refused while `pos.x` becomes `pos.x.py`. That follows the ruling, and the refusal names the file, so the
person can type it without the dot.

### Low (new): `nameKey` is not exactly `free`'s equality

The board line says `nameKey` must equal `caseInsensitiveCompare`. It mostly does. The exceptions all involve
U+0345, the Greek iota subscript, whose case fold moves it out of canonical order:

- 397 random pairs: `nameKey` equal, `caseInsensitiveCompare` different, APFS equal (`ᾳ`/`αι`, `𐐀`/`𐐨`).
  APFS agrees with `nameKey` here, so the only effect is a " 2" that was needed anyway.
- 10 random pairs: `nameKey` different, `caseInsensitiveCompare` equal and APFS equal (`ῷ` U+1FF7 against
  `Ω` + U+0342 + U+0345). Two such entries in one archive both pass the Set, the second write fails
  `.withoutOverwriting`, staging is removed, and the whole import is refused with the system's "already exists"
  error. No data is lost, and it needs polytonic Greek names that differ in both case and decomposition. That
  is Low.
- 1 pair the other way (`nameKey` equal, APFS different): harmless " 2".

Fix if it is cheap: when a staging write fails because the file exists, try the next number rather than
refusing. Or build the key as NFD, then fold, then NFC. Test: `ῷ.py` and `ῼ͂.py` (decomposed) in one archive
both come in.
{% endraw %}

</div>
