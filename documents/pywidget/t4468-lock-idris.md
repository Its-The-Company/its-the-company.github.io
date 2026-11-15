---
layout: "default"
title: "Review of T-4468 H1, Python half: the premade file lock"
section: "documents"
description: "I looked for the ways this kind of code usually goes wrong and did not find them: a key the run never set cannot be written (dirty is only filled by set(), and every saving premade calls set(), never mutates store.data\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4468-lock-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/t4468-lock-idris.md</code></span></div><h1>Review of T-4468 H1, Python half: the premade file lock</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4532, Commandment 13), owner of the Swift writer of the same file. Author: Pernille. Reviewed:
30ea7b46f1 (`pywidget/widgets/premade/_premade_lock.py`, `_premade.py` `Store`, the five premades that set `k.SAVE`:
altitude, distance, github, steps, storage; `pywidget/tests/widgets/test_premade_store_lock.py`), against
[`pywidget/docs/design/premade-inputs.md`](premade-inputs.html) s2.3.1. Line numbers are at 30ea7b46f1. I read the code, then ran the test file
myself in a clean copy: `python3 -m unittest test_premade_store_lock`, 20 tests, OK (2.9 s). Date: 2026-11-15.

## Verdict: SHIP (no High, no Medium; four Lows, none blocks TestFlight)

The contract is kept clause by clause. I checked each one against the code, not the commit message:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict: SHIP (no High, no Medium; four Lows, none blocks TestFlight), scrolls sideways" style="--tw:804px" markdown="1">

| s2.3.1 clause | Where | Kept |
|---|---|---|
| Sidecar `premade.json.lock`, `O_RDWR \| O_CREAT`, `0600`, never deleted, never the data file | `_premade_lock.py:29`, `Store.LOCK` | yes |
| BSD `flock(LOCK_EX)`, not `fcntl`/`lockf`; released by `close` | `:70`, `:60` (in `finally`, on every path) | yes |
| Poll `LOCK_NB` every 10 ms for at most 2 s, then write nothing | `_take` `:63-75`, `LOCK_WAIT = 2.0` | yes, monotonic clock |
| Re-read under the lock; missing is `{}`; not a UTF-8 JSON object writes nothing | `:33-41` (`UnicodeDecodeError` is a `ValueError`) | yes |
| Merge only the keys the run `set()`; every other key as the file has it now | `:42-43`, `Store.set` adds to `dirty` | yes |
| Temp file in the same folder, rename over, then release | `:45-50`, `os.replace` inside the lock | yes |
| Hold only read, merge, write, rename | the lock is taken inside `save()` alone | yes |
| `.premade-*` orphans older than 60 s removed under the lock | `_sweep`, `:78-93` | yes |
| No unlocked whole-file write; <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> premades never load `fcntl` | `Store.save` returns False when `SAVE` is None; `WhoImportsIt` | yes |

</div>


I looked for the ways this kind of code usually goes wrong and did not find them: a key the run never set cannot be
written (`dirty` is only filled by `set()`, and every saving premade calls `set()`, never mutates `store.data` in place;
I read every `store.` call in the five); a failed lock or parse keeps `dirty`, so a second save in the same run still
writes it (tested); after a save `store.data` is the merged file, so a later `get()` sees the Page's keys too; the temp
file is unlinked on any exception during the write; the lock descriptor is non-inheritable (PEP 446). Distance and
Steps save through `keep_reading` (no `.save()` in their own text), and the test's saver scan counts that path, so all
five are covered. The only other Swift reader, `LaneDevice` (`files.shared`), only reads.

Lost update, the H1 case itself: `Lock.test_a_save_waits_for_a_writer_in_another_process_and_keeps_its_change` holds
the lock in a second process, changes `repo` while the run waits, and checks the final file holds both the foreign
`repo` and the run's `cache`. That last assertion proves the re-read regardless of timing. Good test.

## Findings, ranked

### L1. A save can raise instead of returning False (disk full, a protected file while the phone is locked)

`save()` returns False for a busy lock or an unreadable file, as its docstring says, but any other `OSError` raises out
of it: `os.makedirs` (`:28`), `os.open` of the sidecar (`:29`), the temp file's open, write or `os.replace`. The callers
(`github.py:124`, `altitude.py:68`, `storage.py:68`, `keep_reading`) do not catch it, so the run ends in an error where
the contract says "the run's history waits for its next run". This was already true of the temp file before 30ea7b46f1;
the sidecar adds one more place. Suggested: catch `OSError` around the body and return False, with a test (a read-only
folder, as the Swift test `testWriteFailureLeavesTheFileAsItWas` does). Not a data-loss path: nothing is written.

### L2. No fsync before the rename, on both halves (mine too)

Neither writer flushes the temp file before renaming it over `premade.json`. After a power loss in that window the
file could be empty or short, and the contract then forbids either writer to touch it again (`page.unreadable` on the
Page; the run writes nothing). The person's settings for that one premade would be stuck until reset. iOS rarely loses
power abruptly, and `Data.write(.atomic)` before H1 did the same. A shared decision for s2.3.1 (`os.fsync` /
`F_FULLFSYNC` on the temp file, or a recovery path for an empty file), not a change to one side. After TestFlight.

### L3. The saver scan finds savers by their text

`WhoImportsIt.test_every_premade_that_saves_installs_the_locked_save` looks for `.save()` or `keep_reading(` without
`save=False`. A premade that saves through some other helper would be missed. The failure is safe (with `SAVE` unset
nothing is written, so history waits, never a setting lost), and the fresh-interpreter test pins today's five. Note
only.

### L4. The "save waits" assertion is a timing check

`time.sleep(0.3)` then `assertTrue(t.is_alive())`: on a loaded host the thread may not have reached `_take` yet, and
the check passes without proving the wait. It cannot fail wrongly, and the final file assertion carries the proof (the
lost-update paragraph above). Note only.

### Note, not a finding: 0xdead10cc

Python holds the lock only inside `save()`, milliseconds, synchronous. Widget runs in the app hold a
`BackgroundTask` (`WidgetWriter.swift:546`), and the Page's write runs while the person is on the Page, so neither
holder should be suspended mid-hold. The Swift half keeps the same shape (below).

## s2.3.2, the travelled phone: does not block TestFlight

The open case (a phone moved more than 11 hours east or west of where an all-day event was picked reads its stamp as
the next or previous day) is a display boundary that is off by one day for a rare traveller. It loses no data, crashes
nothing, and both halves agree with each other, so the widget and the Page never contradict one another. Nothing in it
is an App Review matter. It should be decided before the App Store release (reading the date written in the stamp, as
the spec says, changed on both sides at once), not before an internal TestFlight build.

## The Swift half (T-4532, same commit as this review)

`PremadeSettingsFile.write` (`pywidget/ios/App/Pages/PremadeSettings.swift`) now keeps the same contract: it creates
the folder, opens `premade.json.lock` (`O_RDWR | O_CREAT | O_CLOEXEC`, `0600`), polls `flock(LOCK_EX | LOCK_NB)` every
10 ms for at most 2 s (`.writeFailed`, nothing written, when it runs out), then reads the file again, merges the owned
keys, writes `.page-<UUID>` in the same folder and `rename`s it over, and closes the descriptor, all inside one
synchronous call with no `await`. Its temp prefix is not `.premade-`, so Python's orphan sweep never takes it.

Core tests (`PremadeSettingsTests`, 4 new, 37 in the class, green under `swift test`):
`testAForeignWriterBetweenReadAndRenameWaitsAndBothChangesStay` (a foreign writer started between the Page's read and
its rename, through its own descriptor in this process as a Python run in the app takes it, cannot write until the Page
lets go, and then both changes stay), `testAWriteReadsTheFileAgainUnderTheLockNotACopyFromBefore`,
`testALockNotFreeInTimeWritesNothing` (byte for byte), `testTheLockFileStaysAndNoTempFileIsLeft`. With the `flock` loop
removed as a mutant, the first three failed (9 assertions, the first "the foreign writer saved while the Page held
the lock between its read and its rename"); the fourth checks what is left in the folder and passes either way.
{% endraw %}

</div>
