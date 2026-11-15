---
layout: "default"
title: "Review of T-4468 slice 1: the premade settings Page (Swift)"
section: "documents"
description: "The Swift half is careful where it was asked to be careful: it writes only the owned keys, keeps every other key, never writes over a file it cannot parse, writes with a temp file and a rename, and prints decimals\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4468-slice1-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/t4468-slice1-pernille.md</code></span></div><h1>Review of T-4468 slice 1: the premade settings Page (Swift)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4468, Commandment 13), as the runtime owner of `_premade.py` and the catalog's `settings` shape
(c00ce27e15). Author: Idris. Reviewed: 23788b915a (App/Pages/PremadeSettings.swift, SettingsPage.swift,
PlacePicker.swift; Shared/Bridge/PyBridge.swift; App/Bridge/WidgetWriter.swift; the trigger files; both test files),
against pywidget/docs/design/premade-inputs.md (fe51858a60) and pywidget/widgets/premade/catalog.json. Line numbers are
at 23788b915a. Slice 2 (0803f09d43) has landed since; I checked its diff to these files: it adds routes, the city list
and Use Current Location and leaves every code path below as it was, so each finding stands on main. Reading only: no
Xcode, Simulator or phone run. Date: 2026-11-15.

## Verdict: FIX FIRST (H1 before any TestFlight build)

The Swift half is careful where it was asked to be careful: it writes only the owned keys, keeps every other key, never
writes over a file it cannot parse, writes with a temp file and a rename, and prints decimals short. The decoding covers
every kind and member in the catalog shape. What it cannot do alone is keep a person's change. The premades'
own Python saver (`Store.save`) writes back the whole file it read when its run started. A widget-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> run of GitHub or
Distance holds that copy for seconds, so a Page save made in that window is silently undone. The atomic rename prevents
torn reads; it does nothing about lost updates. That is data loss, and the fix is half mine (Python) and half Idris's
(Swift).

## Findings

### H1. A widget-lane run undoes a settings save (lost update across processes)

- Where: `pywidget/widgets/premade/_premade.py:233-241` (Store reads the whole file once, at open) and `:257-263`
  (`save()` writes the whole `self.data`); callers `github.py:105-121` (two `http.get` calls, `timeout=10` each,
  then `store.save()`) and `distance.py:82-111` (a location fix, then `keep_reading` saves, widget lane only);
  Swift side `App/Pages/PremadeSettings.swift:207-220` (read, change, rename, no lock).
- The failure: the extension starts a GitHub run and reads `{"repo": "a/b", "cache": ...}`. The person changes the
  repository on the Page, and the app writes `{"repo": "c/d", ...}`. Up to 20 s later the extension's run saves its
  new cache and writes `"repo": "a/b"` back. The app's `settings_saved` run may already have drawn c/d. The next
  timeline draws a/b again, and the Page shows a/b the next time it opens. Distance does the same to `places` and
  `units` while a fix is pending. The reverse also happens: an app write that lands between the extension's read and
  its rename drops that run's cache or kept reading. That costs one fetch, not a person's data. `onRunQueue` orders
  only the app's own runs. The commit's "covered only by the atomic rename" is not cover for this.
- The fix, two halves:
  1. Python (mine): `Store` records the keys a run `set()`. `save()` takes an exclusive `fcntl.flock` on a sidecar
     `premade.json.lock` in the same folder, reads the file again, applies only those keys, writes a temp file and
     renames it, then unlocks. The lock is held for the read, merge and rename, a few milliseconds, never across a
     fetch or a sensor wait. `fcntl` ships in the runtime (70,112 bytes, device slice). I still have to confirm it is
     on the widget lane's import list; if it is not, the lock goes through the wire.
  2. Swift (Idris, slice 2): `PremadeSettingsFile.write` takes the same `flock` around its read, change and rename.
     A file lock held in an App Group container when the process suspends gets the app killed (0xdead10cc). So keep
     the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> to that synchronous block and never across an `await`.
  - The other way out is to split the file: settings in `premade.json`, written only by the app, and history in
    `premade-cache.json`, written only by Python. One writer per file needs no lock. It does need a migration and a
    change to spec s2.3. I would take the lock now and keep the split for the phase C file layout.
- Test: a Core test that runs a simulated foreign writer (a closure handed in between the read and the rename)
  and shows that both keys survive. A host test in `pywidget/tests/widgets/` that saves a Store while another writer
  changed an owned key, and asserts the owned key keeps the other writer's value.

### M1. A save waits behind a run with no deadline

- Where: `Shared/Bridge/PyBridge.swift:601-610` (`onRunQueue`, `withCheckedContinuation`, no timeout);
  `SettingsPage.swift:161-171`.
- The failure: work jobs queue behind every queued run, and a console run waiting on `input()` holds the script
  thread for as long as nobody answers. A long app-lane run does the same up to its budget, and a run that has not yet
  been marked stuck is not refused. Meanwhile the item sheet's Save does nothing visible (`:598`). A toggle or
  segmented control snaps back to its old value, because its binding reads `model.values`, and `values` changes only
  after the write returns (`:392`, `:424`, `:123`). If the app is killed in that window, the change the person made
  is gone, and nothing said it was not saved.
- The fix: after H1 the file lock orders the app's writes against its own runs as well, so the write can leave the
  script thread and run on a utility queue, with no wait behind runs. If it stays on the queue, give it a deadline
  (5 s) that ends in `.writeFailed` and `page.cantsave`. Either way the control should show the pending value at once
  (an optimistic `pending[key]` overlay over `values`) and fall back to the saved value only on a failure.
- Test: `onRunQueue` (or its replacement) with a held run returns `.writeFailed` within the deadline.

### M2. The item sheet stays open through two runs, and Save can be tapped twice

- Where: `SettingsPage.swift:118-128` (`save` awaits `afterSave`, the widget run, and then `refreshPreview`, the
  preview run, before it returns) and `:597-600` (Save is not disabled while a save is in flight).
- The failure: Save closes the sheet only after the write, the widget run and the preview run have all finished.
  That is seconds for GitHub or Distance, and the sheet gives no sign that it is busy. A second tap on a new item
  runs `put` again. With `unique` (Countdown, Distance, Habits) it is refused as a duplicate of the row just
  written, and the sheet says `page.cantsave` for a change that was saved. Without `unique` (Clocks, Shortcuts) the
  row is added twice.
- The fix: `save` returns when the write returns. The widget run and the preview go into a Task the model owns: one
  at a time, and a newer save cancels the older one's preview. Save is disabled, with a progress indicator, while
  `onSave` is in flight.

### M3. List edits are built from a stale copy, so a quick second edit undoes the first

- Where: `SettingsPage.swift:283-294`, `:363-381` (`put` and `delete` read `model.rows(field)`, which is `values` as
  of the last write that returned) and `:149-157`.
- The failure: someone swipes away row A and then row B before A's write returns, which is likely under M1's wait.
  The second change is computed from rows that still hold A, so the final list is [A, C] with A back. A delete and a
  move fail the same way. The index passed to `delete` comes from the rows the view drew, which may no longer be the
  rows `delete` reads.
- The fix: keep one ordered edit stream in the model. Each list edit applies to the pending rows (M1's overlay) at
  once, and the write carries the result. The more robust form is to hand the queued body a transform, so it reads
  the file's current list and applies the edit to that, by row identity (the `id` rule, or name plus index), not by
  a bare index.
- Test: two `delete`s issued before the first write returns leave both rows deleted.

### M4. A list item's text is saved without being normalised, so `required`, `unique` and `max` can be bypassed

- Where: `SettingsPage.swift:626-631` (the binding stores the raw text: not trimmed, not NFC, `\r`, U+2028 and
  U+0085 kept; `onSubmit` cleans it, but tapping Save does not submit), `:346-360` (`check` reads the raw row),
  `:363-373` (`put` does not normalise), and `:656` (a picked city's name is copied in uncut).
- The failure: "   " passes `required` and draws a blank name. "Mum " is not a duplicate of "Mum". A Distance place
  picked from the city list gets the city's name uncut: "San Francisco" is 13 characters against `max` 10. A Clocks
  city does the same: "Rio de Janeiro" is 14 against 11. The limits I measured in render.py (c00ce27e15) stop
  holding as soon as the Page writes. `clocks.py:77` cuts at its own `NAME_MAX` (32), not at 11.
- The fix: in `put`, run every `text` item field through `SettingsKinds.text(_, max:)`, and drop the key when the
  result is empty. Have `check` read the normalised row, and cut the copied city name with the same call.
- Test: `put` with " Mum\n" next to "Mum" is refused as a duplicate, and a 14-character city name is saved cut to 11.

### M5. An all-day Countdown event goes to Past at noon on its own day

- Where: `SettingsPage.swift:285-287` (`isPast` compares the stamp, which is noon in the zone for a date-only event,
  with now). Compare `:352-354` (`check` keeps an all-day event upcoming through its day) and countdown.py, which
  reads `all_day` (spec s6 item 1).
- The failure: at 12:01 PM on the day of the event the Page lists it under "Past" with `page.cd.ended`, while the
  widget still shows it as today's.
- The fix: one shared rule, `SettingsKinds.isUpcoming(row, now:)`, in Core and tested, used by both `isPast` and
  `check`.

### L1. `parseStamp` reads less than `parse_time`

`PremadeSettings.swift:316-319` uses `ISO8601DateFormatter` with its default options. Python's `parse_time`
(`_premade.py:208-217`) also accepts fractional seconds and naive text (as UTC). An event with either kind of stamp
gets an empty detail on the Page, sorts last, and cannot be saved after an edit until its date is picked again
(`check` returns `page.cd.past`). Parse fractional seconds, then a naive stamp as UTC.

### L2. `SettingsValue.any` can crash on a huge decimal

`PremadeSettings.swift:58`: `NSDecimalNumber(string:)` returns NaN past its exponent range (about 1e127). JSONSerialization
then raises an Objective-C exception, which Swift cannot catch. No owned value is that large today (lat and lon are
bounded), but the value round-trips whatever the file held. Fall back to the Double when the decimal is NaN.

### L3. Smaller points

- `PremadeSettings.swift:363`: `put` ignores `IDRule.hex`. Habits declares 8, and the default `randomHex(8)` happens to
  match. Pass `rule.hex`.
- `SettingsPage.swift:380`: `delete` passes `rows[index]["name"]` to the pick, but `put` uses `field.unique ?? "name"`
  (`:372`). The pick matches by `pick.by`. Use `by` in both places.
- Habits against spec s3 (line 241): every list row should show this week's seven dots, Monday first
  (`week_starts`), with today and the six days before tappable. Instead the row's detail is `done.count`
  (`SettingsPage.swift:339`), which counts all history. DaysRow (`:681-706`) appears only in the sheet, shows the last
  seven days rather than the week, and ignores `week_starts`.
- `SettingsPage.swift:496-501`: Sun's place name is saved only on Return. If the person edits the name and taps Back,
  the edit is lost. Commit when focus ends, as `TextRow` does.
- `PremadeSettings.swift:256`: `raw.contains("github.com")` is case-sensitive, so "GitHub.com/o/n/tree/main" is
  refused. A `?tab=` or `#readme` suffix is refused too. Cut both before the check.
- `PyBridge.swift:602-606`: before Python has started, `body` runs on the caller. A `start()` racing it can run a
  premade alongside the write. H1's lock closes this window as well.
- Python side, mine: a `Store` that read an unparseable file saves `{}` plus its own keys over it (`_premade.py:241`),
  which breaks the promise the Swift half keeps. H1's re-read under the lock fixes it: an unparseable file is not
  written. Orphaned `.premade-*` temp files from a killed run are never removed.
- The trigger on the Python side: `settings_saved` never reaches Python. It is a run-log row word only. No Python
  reader checks trigger names, and RunLogExport and the loop breaker place it (foreground, silent on refresh). The
  ADR-007 row-key list and ide/spec.md 12.4.1 still list only `editor_save` as the added trigger. Add
  `settings_saved` there.

## Decoding: what I checked against the catalog shape

Every field kind (text, toggle, choice, date, symbol, place, list, pick, days) and every member that settings_problems()
allows decodes: `max`, `required`, `format`, `min`, `order`, `unique`, `sort`, `add`, `item`, `past_section`, `id`,
`min_footer`, `delete_asks`, `try`, `zone`, `flat`, `coords`, `current`, `name_max`, `options` (strings or
{value, label}), `from`, `by`, `none`, `after_now`, `stamp`, `days`, `week_starts`, `permission`, `default` (string or
rows). A `v` above 1 shows `page.newer` and writes nothing. `testTheRealCatalogDecodesSevenDeclarationsAtVersion1`
decodes the shipped catalog, so a shape change on my side fails a Swift test. `week_starts` is decoded and then not
used (see L3, Habits).

## Tests

Covered: owned-keys-only, unparseable never written, a failed write leaves the file, kinds' values, sorting, `max` and
`unique` and `min`, id on add, pick follows a rename, days window, write then run then preview, and work waiting
behind a queued run. Missing: a second writer between the read and the rename (H1); a held or stuck run against a
save (M1); two list edits in flight (M3); item text normalisation (M4); an all-day event on its own day (M5); a
Python-side round trip of a Swift-written file (whole numbers as ints, short decimals, non-ASCII, sorted keys) read
by `Store`.

## Who fixes what

- Idris, slice 2: H1's Swift lock, M1, M2, M3, M4, M5, then the L items.
- Pernille: H1's Python half (`Store` dirty keys, the lock, the re-read and merge) and the unparseable-file case in
  L3, with host tests. A board line of its own under T-4468.
- TestFlight waits for H1 (both halves) and M1 to M4.
{% endraw %}

</div>
