---
layout: "default"
title: "T-4200: review of 2957d723e2 (Idris, T-4176: New File and the conflict copy never empty a same-named file)"
section: "documents"
description: "Verdict: PASS with findings (3 Low, no Medium or above). writeNew cannot replace a file: the decision is the kernel&#x27;s renamex_np(RENAME_EXCL), one call, with no check-then-create window. free now compares by nameKey\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4200-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4200-pernille.md</code></span></div><h1>T-4200: review of 2957d723e2 (Idris, T-4176: New File and the conflict copy never empty a same-named file)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12. Independent review (Commandment 13): I read the commit, the code around it and the
runner results, not the author's notes beyond the commit message. The finding it fixes (M1) is mine, from
[`pywidget/docs/reviews/t3718-pernille.md`](t3718-pernille.html).

Verdict: **PASS with findings (3 Low, no Medium or above).** `writeNew` cannot replace a file: the decision is the
kernel's `renamex_np(RENAME_EXCL)`, one call, with no check-then-create window. `free` now compares by `nameKey`,
which is the key I probed against APFS. New File, the conflict copy and the single-file `.py` import all write
through `writeNew`. The errors reach the screen as the house sentence.

## What was read

- `git show 2957d723e2`: `ProjectStore.swift` (+35 -11), `ProjectTransfer.swift` (+1 -3), `ProjectStoreTests.swift`
  (+62, 4 tests).
- Every writer under `pywidget/ios/App/Projects/` and every caller of `ProjectStore`'s write paths in `App/`.
- Runner results: red `J-20261112-1116-land-m-18d837` (commit 9a1bb71ec6, tests on the old code) and green
  `J-20261112-1128-land-m-495704`, via `tools/xc_route.py status` and the job's `result.json` on
  `origin/macbook-results`. The full xcodebuild log stays on the runner, so I saw only the kept lines.

## How it was checked (host only, no Xcode build, no Simulator)

All in scratch `T-4200-pernille/` on a case-insensitive APFS volume (`diskutil`: APFS; `x` then `X` exist as one).

1. **`writeNew`'s sequence in Python (ctypes).** `O_CREAT|O_EXCL` write to `.new-<uuid>`, then
   `renamex_np(tmp, name, RENAME_EXCL)`; on failure, unlink the staging file.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it was checked (host only, no Xcode build, no Simulator), scrolls sideways" style="--tw:649px" markdown="1">

   | Held (text "precious = 1") | New name | Result | Held text | Folder after |
   |---|---|---|---|---|
   | `αι.py` | `ᾳ.py` | EEXIST | kept | 1 file |
   | `𐐀.py` | `𐐨.py` | EEXIST | kept | 1 file |
   | `café.py` (NFC) | `café.py` (NFD) | EEXIST | kept | 1 file |
   | `main.py` | `MAIN.py` | EEXIST | kept | 1 file |
   | `ω`+U+0342+U+0345`.py` | `ῷ.py` | EEXIST | kept | 1 file |
   | `same.py` | `same.py` | EEXIST | kept | 1 file |
   | dangling link `link.py` | `link.py` | EEXIST | link kept | 1 item |
   | (none) | `fresh.py` | created | n/a | 1 file, right bytes |

</div>


2. **Race.** 300 rounds of 6 threads, each staging its own bytes and then calling `renamex_np(RENAME_EXCL)` at a
   barrier, onto six spellings APFS treats as one name (`αι`, `ᾳ`, `ΑΙ`, `ᾼ`, `α`+U+0345, `Α`+U+0345). Rounds with
   other than exactly one winner, wrong bytes, a stray file or an errno other than EEXIST: **0 of 300**. The check
   and the create are one kernel step, so there is no window to race.

3. **The old sequence on this Mac's Foundation** (a `swift` script run with `xcrun swift`, not a build): old `free`'s
   `caseInsensitiveCompare`, then `Data.write(.atomic)` of the empty text, with and without the app's protection
   option. For `ᾳ`/`αι` and `𐐨`/`𐐀`, each with `.py` and ` (conflict).py`: `caseInsensitiveCompare` says different
   and the held file is **emptied**, 4 of 4. The data loss in M1 is real on macOS Foundation, which is what an
   iPhone app on a Mac runs on.

## The checks the packet asked for

**writeNew cannot replace.** The bytes go to a fresh hidden name with `.withoutOverwriting` (O_EXCL), so the staging
write cannot land on anything either. The move is `renamex_np(RENAME_EXCL)` within one folder, so it is on one
volume and atomic. It refuses any name the volume's lookup matches, including case and normalisation variants and a
dangling link (table above). EEXIST becomes `.exists(name)` and the staging file is removed. Any other errno becomes
a `POSIXError`, and the staging file is removed then too. `errno` is read straight after the call, inside the
closure. `free` is now only advice that gives a better message; the guarantee does not depend on it.

**Every create path.** I went through the writers in `App/Projects/` and the store's callers in `App/`:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The checks the packet asked for, scrolls sideways" style="--tw:960px" markdown="1">

| Path | Before | Now |
|---|---|---|
| New File (`ProjectsView.commitName` → `createFile`) | `free` + `.atomic` write | `free` (nameKey) + `writeNew` |
| Conflict copy (`PyWidgetApp.saveCopy` → `ProjectStore.saveCopy`) | `free` + `.atomic` write | `free` + `writeNew`; `.exists` from either takes the next number |
| `.py` import (`importFiles` → `importFile`) | `freeName` + `.atomic` write | `freeName` + `writeNew` |
| New project (`create`) | `free` + `mkdir` + `main.py` | same: `mkdir` (no intermediates) fails on any existing name, and `main.py` goes into the folder it just made |
| Recovered project (in `saveCopy`) | `mkdir` | same, then `writeNew` |
| Zip import (`importZip`) | staging folder, `.withoutOverwriting` files, `moveItem` to a `freeName` | unchanged; `freeName` now keys by nameKey through `free` |
| Rename file or project (`move`) | `free` + `moveItem` | `free` (nameKey) + `moveItem`; nameKey-equal goes through `.rename-` |
| Editor save (`write(_:to:replacing:)`) | replaces, by design, after its own bytes check | unchanged |

</div>


`LaneMirror` and `WidgetScriptSave` write into the app's own `widgets/` staging folders, not a person's project, and
are outside this change. No path that makes a new file in a project still writes `.atomic` without a check.

**The key.** `nameKey` is unchanged since 229fa3e4f5 (`git log` on the file: 229fa3e4f5, then this commit), so it is
the key that agreed with APFS on all 51,306 pairs in my T-3718 probe. `free` keys both sides with it and skips
`current` by exact name, as before.

**Errors on screen.** `ProjectsView` shows `error.localizedDescription`. `Problem` is a `LocalizedError`, so a clash
reads "There is already an item named “αι.py”. Choose another name." From `free` that names the file already in
the list, not the one typed. That is the more useful of the two, and the test pins it. The conflict copy shows
"The copy wasn't saved either. …" only when 999 names are used up, or for a real I/O error. A rename errno other
than EEXIST shows Foundation's generic POSIX sentence. That is rare (EACCES, ENOTSUP) and acceptable.

**Which tests fail without the fix:**


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The checks the packet asked for, scrolls sideways" style="--tw:900px" markdown="1">

| Test | Old code (red run) | Guards |
|---|---|---|
| `testM1NewFileNeverEmpties…` | red: threw Cocoa 516, not `.exists("αι.py")` | `free`'s key, via the name in `.exists` |
| `testM1ConflictCopyNeverEmpties…` | red: Cocoa 516 on `𐐨 (conflict).py` | `free` or `writeNew` (either alone passes it) |
| `testM1WriteNewNeverReplacesAFile` | cannot compile (no `writeNew`) | RENAME_EXCL: with plain `rename` the file is replaced with "" and the test goes red; leaving the staging file also fails it |
| `testM1RenameToANameTheVolumeCalls…` | green, as Idris says | nothing yet; harmless |

</div>


Green run: 1,667 executed, 2 skipped, 0 failures.

## Findings

### L1 (Low): no test reaches `writeNew`'s own refusal of an equivalent name, or proves the callers use it

`testM1WriteNewNeverReplacesAFile` writes to the exact same name. With `free` fixed, both NewFile and ConflictCopy
are refused before `writeNew` runs. So reverting `createFile`, `importFile` or `saveCopy` to `write(_:to:)` leaves all
four tests green. Cheap repair: also call `store.writeNew("", to: p.url.appendingPathComponent("\u{1FB3}.py"))`
beside `αι.py` and expect `.exists` with the text kept. That is the one place the volume, not `free`, does the
refusing. Proving the callers route through `writeNew` needs a seam (a name check that can be told to say "free").
That is not worth adding for three call sites a reviewer can see. No line.

### L2 (Low): a crash between the staging write and the rename leaves a hidden `.new-<uuid>`

If the app is killed in that gap, the staging file stays in the project folder. `files(in:)` lists `.py` only, and
export and the Projects screen go through it, so the person never sees it. A script that lists its folder would.
`.rename-` and `.import-` already have the same shape and no sweep either. If a sweep is ever added, cover all
three prefixes. No line.

### L3 (Low, the record): the red run shows a refusal on the Simulator, not an emptied file

The commit message says "the file was emptied / Cocoa 516". The red run's kept lines show Cocoa 516 for both
failing tests: Foundation refused the old `.atomic` write. Its total of 3 failures fits only the held files keeping
their text there. On the runner's iOS Simulator, then, the old code gave a raw Cocoa error and did not lose data. On
this Mac's Foundation (check 3) the same calls empty the file, 4 of 4. My M1 table said "one file, now empty"
without saying which Foundation it came from. It came from the host, and I should have said so. The fix is right
on both: neither outcome depends on what Foundation does with an existing name any more. One thing I cannot explain
from the kept lines: the count also fits the Greek pair of the conflict-copy test passing on the old code there. The
Deseret pair alone makes that test red, so it still guards the fix. No line.

### Notes

- On an iPhone's case-sensitive volume, New File now refuses `ᾳ.py` beside `αι.py`, which there would be two files.
  `Main.py` beside `main.py` was already refused, so this is the same policy. It keeps a project the same on a phone, a
  Mac and in a zip.
- A `.py` import that loses a race after `freeName` now gets `.exists` rather than the next number. That needs
  another writer in the same folder in the same moment. Acceptable.
- `move` keying its temporary-name step by nameKey is consistency only: `rename(2)` onto the same file already
  worked, which is why the rename test is green on the old code.

T-4176 can be ticked: no finding is Medium or above.
{% endraw %}

</div>
