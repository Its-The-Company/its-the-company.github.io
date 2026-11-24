---
layout: "default"
title: "Premade inputs: one Page per premade (T-4468, design half)"
section: "documents"
description: "Frames: mockups/premade-inputs/premade-inputs-A-phone.png (A Paper, light) and -B-phone.png (B Studio, dark), ten iPhone frames each at 390 pt, drawn by mockups/premade-inputs/draw_premade_inputs.py with the helpers and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/premade-inputs.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/design/premade-inputs.md</code></span></div><h1>Premade inputs: one Page per premade (T-4468, design half)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-15. Idris builds it in T-4468; Pernille reviews the build (Commandment 13) and owns the small
premade changes in s6. Asked for by an Investor on #306 (4:55 PM ET 11-14, build 6 on his iPhone): "the user should be
able to select a location or create events for the other widgets. There is no UI to do this with (should be a Page
within the same project), or code to directly edit (widgets added from the Gallery should be customizable)". The
second half, code to edit, is T-0901 (Open source makes an editable copy) and is not designed here.

Frames: `mockups/premade-inputs/premade-inputs-A-phone.png` (A Paper, light) and `-B-phone.png` (B Studio, dark),
ten iPhone frames each at 390 pt, drawn by `mockups/premade-inputs/draw_premade_inputs.py` with the helpers and QA
of `ide/draw_ide.py`. QA results: `mockups/premade-inputs/qa.json`. The widget previews in the frames are **real
runs** of `pywidget/widgets/premade/countdown.py` and `sun.py` through the host runner (the tour fixtures'
`run_zone`), drawn by `widgets/render.py`; the city list is a search of the real `pywidget/ios/Data/cities.tsv`
with CitySearch's rules. Event names are invented placeholders (C42). Glyphs are render.py's plain-geometry stand-ins
for the SF Symbols named. No generative model.

**Inside approved work.** Screens drawn from the app's tokens and system components (creative/approved.md item 2:
"screens, states and widgets drawn from these tokens"). No new colour, face, icon or arrangement: the Page is an iOS
inset grouped form, with the same cards, rows, sheets and footers as Settings and the launcher editor
([`launcher/editor.md`](editor.html)). Strings are DRAFT, like every app string, since no copy guide is approved. The visual
direction question (#291, Restructuring 22) is open; this Page uses only parts all three of its options keep.

**The premades' colours (T-4681, Idris, 2026-11-19).** #291 was answered on 2026-11-16 at 10:42 PM ET
(creative/approved.md item 9): "For now, the pre-mades should use Paper/Studio as the default for light/dark mode",
with Studio plain black or dark grey, not purple. So every premade draws in Paper in light mode and in Studio's black
and dark greys in dark mode, on the Home Screen and in the Gallery's previews (the Lock Screen draws no colour of its
own: the system tints it). How it is built:

- The renderer chooses the theme from the widget's id: `pywidget.premade.<name>` takes Paper and Studio
  (`Premades.theme`, `TreeTheme.paperStudio` in `pywidget/ios/Shared/Premades.swift`); a person's own widget keeps
  the app's tokens, whose dark set is not changed yet (item 9: "the tokens are not changed yet").
- Paper is the tokens' light set as approved in item 2. Studio is the tokens' dark set with every value that has a
  hue drawn as the neutral grey of the same relative luminance, the rule Maren redrew the 04-mockups by in T-4680
  (render.py `greyed`): the card's gradient #5B33E6 to #1E1450 becomes #5A5A5A to #1F1F1F, the accent #A08BFF
  becomes #9C9C9C, the grounds and text their greys, so every contrast pair stays within 0.1 of the approved one.
  The status colours (success, warning, danger) keep their hue, as in the mockups. Increase Contrast is greyed the
  same way from its own dark set.
- A premade names only semantic tokens and the widget card, never a colour of its own (`_premade.THEME`), so the
  theme decides every colour it draws. `pywidget/tests/widgets/test_premade_theme.py` checks that over every view,
  family and state; `PremadeThemeTests` checks the colours each appearance resolves to.
- The Page's frames named at the top were drawn before this answer; their Studio is still the purple one.

## 0. The 1.0 showcase set (T-4672, Ines, 2026-11-17)

Dated line. From #278 (an Investor, 9:55 PM ET 11-16: the twelve built premades are not a limit and may not all ship;
1.0 ships many premades that show what Python and iOS widget features do together and demo what Pro unlocks) and the
Pro widgets <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> on #41 (12:27 AM ET 11-17: every premade works for everyone; a premade that uses a Pro feature is
tagged Pro, its inputs stay settable, its design, layout and code need Pro). The plan, with each premade's data
source, terms and Python and iOS features, is [`ops/plans/T-4672-showcase-premades.md`](../company/t-4672-showcase-premades.html).

**The three Pro features (#278; T-5504, Ines, 2026-11-21).** In an Investor's #278 words (9:43 PM ET 11-16): "Pro
should expand the use of "advanced" Python libraries, Buttons in widgets, and Python running within the widget." A
premade that uses any of the three carries the Pro tag. #324 settled only the third, below; it did not redefine
"Buttons in widgets". Whether a widget's refresh button is a Pro button waits on the Investors (<span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #340;
plan s10 item 5); no premade draws one (s9.3).

**Which runs count for the Pro tag: Python a widget button runs (A, #324; T-4796, Ines, 2026-11-20).** The Investors
answered "A" on Urgent Request #324 (an Investor, 12:36 AM ET 11-18, c6970133683,
(private) log/rulings.md, entry of
12:36 AM ET 11-18). "Python running within the widget" in Pro (#278, 9:43 PM ET 11-16) is Python a button on the widget runs
without opening PyWidget (ADR-011 s4). In the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, the lane's own runs (a widget's own updates, the timeline
runs ADR-007 s3 places in the widget whenever they fit) are not Pro for anyone: every widget, premades included, keeps
running in the widget first (#283, 10:46 AM ET 11-13), as Countdown did 69 times on the phone, free and untagged.
Tagged, in the words of the card the Investors answered: "Habit tracker, Focus timer, Flashcards, Day phases once it
has buttons (and Pattern of the day only if it uses an advanced library)"; the other eight are untagged. The plan's s1
carries the same passage, and the brackets below follow it.

**The new set, in build order** (Pro tag in brackets, #324 A):

1. **Day phases** (`day_phases.py`, new, T-4673; Pro once Today's three has Done buttons): morning trains, a day
   view, evening trains, a night view, by time of day. Defaults: downtown B and D from 125 St, 6:00 to 10:00 AM;
   uptown B and D from 34 St-Herald Sq, 5:00 to 9:00 PM. Its Page needs two new field kinds, `time` and `stop`
   (plan s4.5); the MTA's terms are read before any fetch (plan s4.4).
2. **Habit tracker** (kept; Pro): gains Done today (s9 below).
3. **Focus timer** (new; Pro): start, pause and skip buttons that run Python in the widget.
4. **Next 24 hours** (new; no tag): a temperature and rain chart for a saved place, MET Norway data (L16).
5. **Sky** (rework of Sunrise and sunset, s3.2; no tag): the sun's arc, twilight, moon phase.
6. **Overlap clocks** (rework of World clocks, s3.3; no tag): working hours across zones and the shared hours.
7. **Site status** (new; no tag): up or down and a 24-hour strip for sites the person names.
8. **Flashcards** (new; Pro): Show answer, Again and Got it buttons, Leitner boxes run in the widget.
9. **GitHub repository** (kept, s3.6; no tag): adds a star-history line.
10. **Shortcuts launcher** (kept, s3.7; no tag).
11. **Countdown** (kept, s3.1; no tag).
12. **Pattern of the day** (new, last, conditional; Pro only if it uses an advanced library that ships in 1.0).

**How Day phases refreshes (T-4793, Ines, 2026-11-21; plan s4.3).** The view changes at each phase start from
timeline entries, with no run. The train times come from the widget lane first. When iOS reloads the widget, its
script fetches and decodes the MTA feed inside the widget, at most once every 15 minutes, free for everyone (#324 A).
That holds only if four things are true: the fetch plus decode fits 2.0 s at P <= 11 MB, measured in T-4673; the feed
fits the extension's 256 KiB cap; `pywidget.net.get` can return the binary feed intact (at HEAD it returns text only);
and the lane is on in the store build (at HEAD it is on only in Debug and gate builds). Otherwise Day phases runs in
the app lane. It then fetches when PyWidget opens, when a Shortcuts automation runs Refresh Widgets, or on a refresh
tap (its face has none). An iOS reload then only redraws the saved times. Background refresh counts only once T-0793
is built and kept in 1.0. The widget always shows "Updated" with the time, and "No recent times. Open PyWidget to
update." after 30 minutes. Its Gallery page claims only what the build does, with no refresh figure and never "live"
(ADR-007 s10).

**Leaving the Gallery** (code and tests stay in the repo): Day progress (folds into Day phases), Steps and floors,
Distance to a saved place (s3.4), Altitude, Storage, Quote of the day. Sections 3 and 9 below describe the built
premades as designed; the reworked ones get their Page fields in their own build lines. No Pro tag or offer is ever
drawn on a placed widget (Apple 4.4); the tag lives on the Gallery tile and the premade's page.

## 1. The reading, and what is built now

- **"A Page within the same project."** In phase C a premade is a project ([`documents/restructuring/03-structure.md`](../restructuring/03-structure.html)
  s1: "A premade is a project"), and a Page is one of a project's outputs (#272: Pages in 1.0; #281: the Project
  first in phase C). A premade added from the Gallery has no project today. So this build makes each premade's
  settings screen **in the shape of that Page**: one screen per premade, drawn from a declaration the premade
  carries, writing the premade's own file, reached from the premade's widget and its Gallery page. In phase C the
  same declaration becomes the project's `settings`, the same screen becomes the project's settings Page, and
  nothing is rebuilt (s2.6).
- **One screen, seven declarations.** Idris builds one SwiftUI view, `SettingsPage`, and one place picker. Each
  premade declares its fields (s4); the screen draws them. No premade gets its own Swift screen.
- **The person's own data only.** Each Page collects what that premade reads and nothing more (s2.8).

## 2. The shared Page

### 2.1 Anatomy (frames 2, 3, 6, 8)

Top to bottom, pushed inside the Gallery's detail sheet (s2.5), large detent:

1. **Nav bar.** Back button with the premade's name; the title is the Page's label (`page.title.*`: "Events",
   "Place", "Cities", "Places", "Habits", "Repository", "Shortcuts"). No Save: the Page saves as it goes (s2.3).
2. **Preview well.** 358 × 194 on iPhone (the Gallery tile well), radius 16, `bg.sunken`. It shows the premade's
   `page_family` (Countdown Medium, Sun Small, Clocks Medium, Distance Medium, Habits Medium, GitHub Small,
   Shortcuts Medium) from a **preview** run of the saved file (ADR-007 s5.2: the tree goes to the screen only).
   Under it one caption line, footnote, secondary: `page.preview`.
3. **Sections** from the declaration (s4), each a card (radius 14, `bg.surface`, hairline) with an eyebrow header
   and a footnote footer. Rows 44 pt minimum; list rows 52 pt with a 30 pt symbol tile.
4. **A privacy footer where the data is a place:** `page.local` (Sun, Clocks, Distance).

Margins 16; 22 above an eyebrow, 6 below it, 6 above a footer. Accent only on the one add row, links and selection
(design-system-v0 s2.2). Danger colour only with the warning glyph and words.

### 2.2 Field kinds

Seven kinds cover all seven premades. Each maps one to one onto a phase C component setting (s2.6).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2.2 Field kinds, scrolls sideways" style="--tw:1044px" markdown="1">

| Kind | Control | Writes | Rules |
|---|---|---|---|
| `text` | a TextField row; label left, value right; at AX sizes the label stacks above | a string | trimmed; no line breaks (a pasted one becomes a space); NFC; `max` counted in characters (grapheme clusters), typing stops at `max`; `required` blocks Save while empty; `format` names a normaliser and check (s3.6, s3.7) |
| `toggle` | a system Toggle row | `true`, or the key removed | removed when off, so the premade's own default holds |
| `choice` | a segmented control under an eyebrow (two or three options) | the option's value | the premade's default shows selected when the key is absent |
| `date` | a compact DatePicker row, and a "Time" toggle row that adds a time picker | ISO 8601 with the device zone's offset, plus `all_day` | date only: the picked date at 12:00 PM in the device zone (the tour's picker rule, `tests/fixtures/tour/make_tour_fixtures.py`) and `"all_day": true` (s6, Pernille item 1). With a time: that local time |
| `symbol` | a row that pushes a 4-column grid of the premade's options | an SF Symbol name | only names in `options`; the first is the default |
| `place` | a row that pushes **Choose a Place** (s2.4) | `{"name", "lat", "lon"}`, and `"zone"` when `zone: true` | lat and lon as `cities.tsv` gives them (2 decimals, about 1 km); a current location is rounded to 3 decimals (about 110 m) before it is written |
| `list` | a card of rows (symbol tile, name, detail, chevron) and an accent "Add …" row last; tap a row for its edit sheet; swipe to delete; Edit in the nav bar to reorder where `order: "manual"` | a JSON array of item objects | `min`, `max`; at `max` the add row is disabled and the footer says why; `unique` names a key compared case- and accent-folded; without `order: "manual"` the Page sorts by the key named in `sort` |

</div>


Two helper kinds sit inside these: `pick` (a menu row whose options are one list's items, writing an item's key;
Countdown's pinned event) and `days` (Habits' week of check-ins, s3.5).

**Edit sheet for a list item** (frames 4, 5). The launcher editor's sheet ([`launcher/editor.md`](editor.html) s4): Cancel, title
("Add Event" or "Edit Event"), Save, disabled until every required field is valid. Fields in declaration order.
Checks run when a field ends editing and again on Save; a refusal is one line under its card, `status.danger` text
with the warning glyph, `role=alert`, and the card's edge turns `status.danger`. The edit sheet of a saved item ends
with a destructive "Delete …" row; it asks first only when the item carries history (Habits). Cancel or a swipe down
on a sheet with changes asks Discard Changes or Keep Editing.

### 2.3 Saving, and how a change reaches the placed widget

The Page has no Save button, like iOS Settings: a toggle or choice saves when it changes; a list saves on its edit
sheet's Save, on delete, and when Edit ends after a reorder; a lone `text` field saves when it ends editing and passes
its check.

Each save, in this order:

1. **Write.** Read `premade.json` from the premade's App Group folder (`files.shared(script_id)`, the folder
   `_premade.Store` opens); replace only the keys the Page owns (s4.2); keep every other key (the GitHub cache, a
   sensor's kept reading); write a temp file and rename it, as `Store.save` does. The write is queued on **the run
   queue**, behind any run of the same premade, so a widget run that saves its cache never interleaves with it
   (ADR-007, one queue). A file that exists and does not parse is never overwritten: the Page shows
   `page.unreadable` and saves nothing.
2. **Run.** Queue a widget run of that premade (`WidgetWriter.refresh([id], trigger:)` with a new trigger,
   `.settingsSaved`), the way `launcherSlotsChanged` re-runs launchers after a slot edit (T-4218). It writes
   `tree.json`, then `WidgetCenter.reloadTimelines(ofKind:)`.
3. **Preview.** Rerun the well's preview once the write lands. While it runs, the well keeps the last tree (Gallery
   s5.9 9.4, "Rerun over a live tile"): no spinner unless there is no tree at all.

Every placed copy of a premade shows the same settings: there is one file per premade (`files.shared` is keyed by the
premade's id, not by the placed widget). That is today's model and this build keeps it (s7 item 3).

A save that fails (no App Group, disk full) leaves the file as it was, shows `page.cantsave` under the section, and
puts the control back to the saved value.

#### 2.3.1 The file lock both writers take (T-4468 H1; Python half landed, Swift half next)

Two processes write `premade.json`: the Page (Swift) and the premade's own run (Python, `_premade.Store.save`, done
by `_premade_lock.save`). The run queue orders only the app's own runs, and a widget run holds the copy it read for
seconds (a fetch, a sensor wait), so whole-file writes lose updates. Every writer of `premade.json` follows this
contract:

- **Lock file.** `premade.json.lock` in the same folder as `premade.json` (the folder `files.shared(script_id)` answers).
  Open it with `O_RDWR | O_CREAT`, mode `0600`. Never delete it, and never lock `premade.json` itself: the rename
  replaces that inode, so a lock on it locks the old file.
- **Lock kind.** BSD `flock(fd, LOCK_EX)` on that descriptor, exclusive, whole file. Not `fcntl(F_SETLK)` or `lockf`:
  those POSIX record locks belong to the process, and the app process holds both the Page's writer and the app's
  Python runs, so they would not exclude each other. `flock` belongs to the open file description, so two opens in one
  process exclude, as two processes do. Release by `close(fd)` (or `flock(fd, LOCK_UN)` then close).
- **Waiting.** Poll `LOCK_EX | LOCK_NB` (Python: every 10 ms, for at most 2 s). A writer that cannot get it in its
  deadline writes nothing (Swift: `.writeFailed`, `page.cantsave`; Python: the run's history waits for its next run).
- **Under the lock, in this order:** read `premade.json` again; if it is missing, start from `{}`; if it exists and is
  not a UTF-8 JSON object, write nothing and stop. Merge: for each key the writer owns, set it to the writer's value
  (or remove it, as the Page removes `pinned`); every other key keeps the value the file has **now**, not the one the
  writer read earlier. The Page owns its s4.2 keys; a Python run owns exactly the keys it `set()` during the run.
  Write a temp file in the same folder, rename it over `premade.json`, then release.
- **Hold.** Only the read, merge, write and rename: milliseconds. Never across a fetch, a sensor wait or an `await`.
  An app suspended while it holds a file lock in the App Group container is killed (`0xdead10cc`), so the Swift
  writer takes and releases the lock inside one synchronous block.
- **Temp files.** Python names its temp file `.premade-<16 hex>`. A `.premade-*` file older than 60 s, seen while
  holding the lock, belongs to a killed writer; Python removes it. The Swift writer may use any other name.
- **The widget lane.** `fcntl` is not on the lane's import list (`lane.py` `ALLOWED`), and the lane premades import
  `_premade`, which passes the lane's scan. So the locked save is its own file, `_premade_lock.py`; each premade that
  saves (Altitude, Distance, GitHub, Steps, Storage) imports it and sets `k.SAVE = _premade_lock.save`. Without it
  `Store.save()` writes nothing, never an unlocked whole file. No lane premade saves today (Countdown, Habits,
  Quote only read). A lane premade that must save needs `fcntl` added to `ALLOWED` first (70,112 bytes on the device
  slice, already shipped), a lane decision.

**Dated line, Maren, 2026-11-17 (T-4763, from T-4601 H1, `reviews/359a4e52fb-pernille.md`).** A key with two writers
merges by operation, never by value. The merge above sets each owned key to the writer's own copy, and that copy was
read before the lock. With one writer per key nothing is lost. With two, whichever saves last wins, silently (Pernille's
scratch run: a Done today mark lost and a rename kept). So for a key with two writers, each writer brings the change it
made (an operation), takes the lock, re-reads the file, and applies that change to the value it has just read. It never
sets the key to the copy it read earlier. In 1.0 exactly one key has two writers: Habits' `habits`, written by the
Page and by the Done today button (s9.2 gives both operations). For that key this replaces s2.3 step 1's "replace the
keys the Page owns" and s4.2's whole-list write. Every other key keeps one writer and the by-key merge. A second writer
for any other key needs its operation written here first. `habits.py` never `set()`s `habits`, so the Python by-key
save never touches that key. Test: s9.4.

**Dated line, Maren, 2026-11-18 (T-4763, checked against the code).** Restated so it cannot be misread: a key with two
writers merges by operation under the lock, never by value. The Swift half named in this heading has landed:
`PremadeSettingsFile.write` (T-4532) takes this lock in the app. The operation writer, `PremadeFileOp.apply`, and the
lock code it shares live in `Shared/` so that the widget extension can build them (s9.2).

Tests: `pywidget/tests/widgets/test_premade_store_lock.py` (a writer in another process holding the lock, a holder in
this process, an unreadable file, keys the run did not set, no locked save installed, orphan temp files, and which
premades import `_premade_lock`).

#### 2.3.2 When an all-day event stops being upcoming (T-4468 M5)

One rule for the widget and the Page. A timed event is upcoming while now is before its `at`. An event with
`all_day: true` (stamped 12:00 PM of the picked day in the zone it was picked in) belongs to the local day, in the phone's
zone now, that contains its stamp, and stays upcoming until the next local midnight after that day began: a calendar
day added, not `+ 86,400` seconds, which is an hour wrong on the two days a year the clocks change.

- Swift owns the Page's half: `SettingsKinds.isUpcoming` (Idris, 86cf6f47bd), used by the Past section and the save
  check: `calendar.startOfDay(for: at)`, then `date(byAdding: .day, value: 1, ...)`.
- Python owns the widget's half: `countdown.py` `_end` (`local_midnight(at, tz, 1)`), since c00ce27e15. The same
  boundary; nothing in Python changed for M5. Tests: `AllDay` in `test_premade_settings.py` (11:59 PM and midnight,
  a 25-hour day, a timeline entry at the boundary, a phone in another zone).
- Open, both sides together or neither: a phone that has moved more than 11 hours east or west of where the event was
  picked reads its stamp as the next or the previous day. Reading the date written in the stamp instead would fix it;
  it is a change to this rule, not to one side.
- Decided (Pernille, T-4533, 2026-11-17; from Idris's review t4468-lock-idris.md): fixed before the App Store
  release, not before TestFlight. The rule becomes: an all-day event's day is the date written in its stamp (the
  `YYYY-MM-DD` before the `T`, which the Page writes in the zone it was picked in), and it is upcoming until the
  phone's local midnight that ends that date, in the phone's zone now. Both halves in one commit, never one alone:
  `SettingsKinds.isUpcoming` and countdown.py's `_start`/`_end` and day count, with tests for a phone 12 hours east
  and 12 hours west (the event shows on its own date in both) beside the existing `AllDay` cases. Work: T-4835
  (the date in an all-day stamp).
  Why not before TestFlight: it loses no data, crashes nothing, App Review does not see it, and the two halves agree
  with each other today. Why before the App Store: a countdown that names the wrong day to a traveller is a visible
  wrong answer to a paying user, on the one widget whose whole job is the date.

### 2.4 Choose a Place (frame 7)

Pushed from a `place` row. A search field (`page.place.search`), then CitySearch's hits for the typed text: prefix
match on the folded name, largest population first, at most 20, each labelled "name, admin-1, country"
(`CitySearch.swift`, unchanged). Empty field: no list, one footnote, `page.place.empty` (7,342 = the data rows of
`cities.tsv`, counted 2026-11-15). No hits: `page.place.none`. The search makes no network request and needs no
permission.

The bundled city list was built from Natural Earth 5.1.2 and **tzdata 2026f** (line 1 of `cities.tsv`; rebuilt on
2026f by T-5262 on 2026-11-22, the zone table unchanged from 2026b). The host tests hold line 1 to this name, not to
the build machine's current tzdata, so a macOS time zone update does not turn main red; rebuild with
`pywidget/tools/city_list.py` and change this name together.

Where the premade allows it, a **current location** is offered:
- Sun: it is the `use_current` toggle on the Page itself, not a row here (s3.2).
- Distance: a row "Use Current Location" above the hits saves the last When In Use fix as a place, rounded (s2.2).
  When location has never been asked, tapping it raises the system prompt (that tap only; 5.1.1); when it is off,
  the row reads `page.loc.off` with an Open Settings link and does nothing else.
- Clocks: none (a clock needs a zone, and the phone already shows its own).

Clocks needs a zone: a hit with no zone in `cities.tsv` (for example Lisburn, United Kingdom) is dimmed with
`page.place.nozone` and cannot be chosen.

Choosing a hit returns with the place filled, and puts the city's name in the item's Name field when that field is
still empty (the person may change it: "Home", "Mum's").

### 2.5 Where the Page is reached from

Now (before phase C):
1. **The placed widget.** A tap on any of the seven opens the app at the Gallery with that premade's detail sheet
   and its Page pushed on top (T-3671's route, plus one push). Habits rows already link to
   `pywidget://widget/habits/open?habit=<id>`: that opens the Page scrolled to that habit, its row outlined in
   `accent` for 1.5 s (Reduce Motion: the outline appears without movement). Shortcuts tiles keep running their
   shortcut; only the widget's background and its "Edit in pywidget" label open the Page.
2. **The Gallery detail sheet** (frame 1). A new card under the family chips: one row, the Page's label and a summary
   (`page.sum.*`), chevron; it pushes the Page. It shows only where the detail sheet shows Add widget (`mayAdd`,
   Gallery 9.4 hook), so a locked premade has no Page.
3. **The empty notice.** The seven notices already send the person to pywidget ("Add a countdown in PyWidget.");
   route 1 is that tap. Their words do not change.

In phase C: the premade's project page lists its outputs (03-structure s1, "The project page"), the widget and the
settings Page. Route 1 then opens the project's Page directly; route 2 stays.

Route 1 is the widget's **default action** in ADR-011 (T-4542, proposed): from phase C a person may choose another
action for the widget's tap and its buttons on the project page; with nothing chosen, route 1 stays exactly as above.

### 2.6 How it becomes an ordinary Page in phase C, unchanged


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.6 How it becomes an ordinary Page in phase C, unchanged, scrolls sideways" style="--tw:960px" markdown="1">

| Now | Phase C | What moves |
|---|---|---|
| `SETTINGS` in the premade's `.py`, copied into `catalog.json` | the component's `component.json` "settings with types and defaults" (03-structure s1) | the same JSON |
| `premade.json` in `files.shared(id)` | the project's settings file, read by its source's `read(settings)` | the tested move of existing projects (#281 A) carries the file |
| `SettingsPage(schema:, file:)`, drawn by SwiftUI | the project's `settings` output, kind `page`, drawn by the same view (a Python Page is another output kind) | nothing |
| reached from the widget and the Gallery | reached from the project page too | one more entry |

</div>


So the view belongs in `pywidget/ios/App/Pages/` (T-4478's new folder) now, not under Gallery. The seven field kinds
are the start of the settings vocabulary a person's own project can declare later; a kind added for one premade is
added for everyone.

### 2.7 Accessibility

- VoiceOver order: back, title, the preview well (one element; label `page.ax.well`, value = the premade's own
  VoiceOver string from the tree, as in the Gallery well), then each section's header, rows and footer. List rows
  read "{name}, {detail}", hint `page.ax.row`. The add row is a button. Show on Small's value is the chosen event.
- Dynamic Type: all text scales; at AX1 and up label and value rows stack (`.hz` rule, ide/spec.md s2), symbol tiles
  hide, nothing truncates; the preview well keeps its point size (the system sizes widgets). Frame 10.
- Increase Contrast: the HC token sets, as everywhere. Reduce Motion: no movement in the Habits outline or the well's
  redraw (a 120 ms crossfade).
- Every error is words with a glyph, never colour alone.

### 2.8 Privacy: only what each premade needs

- No calendar, contacts, photos or Shortcuts library access: Countdown takes typed events, Shortcuts typed names.
- Places come from the bundled city list (no network) or one When In Use fix the person asks for, rounded to about
  110 m. They are written only to the premade's file in the App Group, which stays on the device (no sync in 1.0).
  Sun's `use_current` reads the app's last fix at run time and stores nothing new.
- GitHub sends only the repository's name to api.github.com, as the premade already does. No token field in this
  build (s3.6).
- Nothing typed on a Page is logged or sent. If the Activity log records a save, it records "Settings saved" and the
  premade's name only.

## 3. The seven

Limits follow what each premade's draw actually shows (the slices in its code), so nothing saved is silently
invisible. Character limits are design widths; Pernille's render test checks each at its `max` (s6).

### 3.1 Countdown (`countdown.py`; frames 1 to 5, 10)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.1 Countdown (countdown.py; frames 1 to 5, 10), scrolls sideways" style="--tw:755px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Events | `list`, sorted by `at`, `max` 20 (upcoming and past together), `unique` name | Upcoming in date order; past events in a second card, "Past", detail `page.cd.ended`, swipe to delete |
| · Name | `text`, required, `max` 28 | unique among events (`pinned` names an event by its name): `page.cd.dup` |
| · Date | `date` | later than now on Save (`page.cd.past`); Time off by default |
| · Symbol | `symbol`: calendar, airplane, star.fill, house.fill, flag.fill, book.fill, car.fill, figure.walk | default calendar |
| · Short Name | `text`, `max` 12, optional | the Lock Screen inline line; footer `page.cd.short` |
| Show on Small | `pick` from Events by name; first option `page.cd.soonest` | writes `pinned`, or removes it for The soonest; follows a rename; removed when its event is deleted |

</div>


Footer under Events: `page.cd.foot`. Empty (frame 2): the well shows the premade's own "No events" notice (the truth,
not sample data); the Events card holds only the add row. Refusals: a past date, a duplicate name; at 20,
`page.cd.full`. On add the app writes `set_at` (now), so the bar starts when the event was made; changing the date
writes a new `set_at`.

### 3.2 Sunrise and sunset (`sun.py`; frames 6 to 9)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 3.2 Sunrise and sunset (sun.py; frames 6 to 9), scrolls sideways" style="--tw:718px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Use Current Location | `toggle` → `use_current` | turning it on asks When In Use if never asked (that tap only); refused or off: the toggle goes back off and the footer shows `page.loc.off` with Open Settings (frame 9) |
| Place | `place` (no zone) → `place` | the place used when there is no fix; reads `page.place.choose` until set |
| · Name on Widget | inside the place: `text`, `max` 24 | the city's name by default |

</div>


Footer under the toggle: `page.sun.cur`. Empty (frame 6): the well shows the premade's own "No place set". Polar day
and night are the premade's own states and need nothing here.

### 3.3 World clocks (`clocks.py`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 3.3 World clocks (clocks.py), scrolls sideways" style="--tw:659px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Cities | `list`, `order: manual`, `min` 1, `max` 4 | the premade reads the first four, and an empty list falls back to its defaults, so the last city cannot be deleted (no delete action; footer `page.cl.min`) |
| · City | `place`, `zone: true` | writes `zone`, the IANA name from `cities.tsv` line 1; a hit with no zone cannot be chosen |
| · Name | `text`, required, `max` 32 (`NAME_MAX`) | the city's name by default |

</div>


When the file has no `cities`, the Page lists the four defaults as real rows (London, Tokyo, Sydney, Los Angeles),
which is what the widget shows. The first edit writes all four plus the change. Footer `page.cl.foot`.

### 3.4 Distance to a saved place (`distance.py`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3.4 Distance to a saved place (distance.py), scrolls sideways" style="--tw:724px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Places | `list`, `order: manual`, `max` 3 | the premade reads the first three |
| · Place | `place`, with Use Current Location (s2.4) | |
| · Name | `text`, required, `max` 20, unique | "Home", "Work" |
| · Symbol | `symbol`: mappin, house.fill, building.2.fill, briefcase.fill, cart.fill, figure.walk, tram.fill, star.fill | default mappin |
| Units | `choice`: `metric` "Kilometres", `imperial` "Miles" | when absent, the Page shows the device's measurement system and writes it with the first save |

</div>


The premade measures from a fix, so when location is not allowed the Page shows the Gallery's permission line above
the Places card (`st.perm.loc` with Allow, or `st.off.loc` with Open Settings; Gallery 9.4 rows 3 and 4). Places
still save.

### 3.5 Habit tracker (`habits.py`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 3.5 Habit tracker (habits.py), scrolls sideways" style="--tw:741px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Habits | `list`, `order: manual`, `max` 6 (Large shows six) | |
| · Name | `text`, required, `max` 24, unique | |
| · Check-ins | `days` → `done` | each row shows this week's seven dots, Monday first (the premade's `DAY_LETTERS`); today and the six days before are tappable, each a 44 pt target; VoiceOver per dot "Tuesday 10 November, done", adjustable |
| · id | written once by the app on add | `"h"` and 8 lowercase hex digits, never shown, never changed; the widget's links use it |

</div>


Deleting a habit asks first (`page.hb.del`). Renaming keeps the id and every check-in.

### 3.6 GitHub repository (`github.py`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 3.6 GitHub repository (github.py), scrolls sideways" style="--tw:662px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Repository | `text`, `format: github-repo` → `repo` | accepts `owner/name` or a pasted `https://github.com/owner/name` (any further path and a `.git` end are dropped); owner 1 to 39 letters, digits and hyphens, not starting with a hyphen; name 1 to 100 letters, digits, `.`, `_`, `-`, not `.` or `..`; refusal `page.gh.bad` |

</div>


Footer `page.gh.foot`. Saving asks nothing of GitHub; the widget run does, as today. "Not found" is the premade's
state after its run (private or gone) and shows in the well; the field does not guess. No token field: public
repositories need none, and a token is a secret the Page would have to hold (s7 item 4).

### 3.7 Shortcuts launcher (`shortcuts.py`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 3.7 Shortcuts launcher (shortcuts.py), scrolls sideways" style="--tw:727px" markdown="1">

| Field | Kind | Limits and checks |
|---|---|---|
| Shortcuts | `list`, `order: manual`, `max` 8 (Large shows eight) | |
| · Name | `text`, required, `max` 40 | exactly as in the Shortcuts app; iOS gives no list of a person's shortcuts, so it cannot be checked; footer `page.sc.foot` |
| · Symbol | `symbol`: bolt.fill, house.fill, car.fill, cup.and.saucer.fill, moon.fill, music.note, timer, star.fill | default bolt.fill |

</div>


The edit sheet has the launcher editor's Try It row, which runs the shortcut through the tile's own link
(`pywidget://run?shortcut=`), so the person sees whether the name is right, and an Open Shortcuts row.

## 4. The data shape (what Idris and Pernille build to)

### 4.1 The declaration each premade carries

A literal dict `SETTINGS` in each of the seven modules, read without running anything (`ast.literal_eval`) by
`pywidget/tools/premade_catalog.py` into that premade's entry of `catalog.json`, which the app already bundles and
decodes (`GalleryEntry`). Countdown's, in full:

```json
"settings": {
  "v": 1,
  "title": "Events",
  "page_family": "systemMedium",
  "summary": {"list": "events", "one": "1 event", "many": "{n} events", "none": "No events yet"},
  "sections": [
    {"key": "events", "kind": "list", "label": "Events", "add": "Add Event", "max": 20, "unique": "name",
     "sort": "at", "past_section": true, "footer": "page.cd.foot",
     "item": [
       {"key": "name", "kind": "text", "label": "Name", "required": true, "max": 28},
       {"key": "at", "kind": "date", "label": "Date", "after_now": true, "stamp": "set_at"},
       {"key": "symbol", "kind": "symbol", "label": "Symbol",
        "options": ["calendar", "airplane", "star.fill", "house.fill", "flag.fill", "book.fill", "car.fill", "figure.walk"]},
       {"key": "short", "kind": "text", "label": "Short Name", "max": 12, "footer": "page.cd.short"}]},
    {"key": "pinned", "kind": "pick", "label": "Show on Small", "from": "events", "by": "name", "none": "page.cd.soonest"}]
}
```

Sun's:

```json
"settings": {
  "v": 1, "title": "Place", "page_family": "systemSmall",
  "summary": {"key": "place", "field": "name", "none": "No place yet"},
  "sections": [
    {"key": "use_current", "kind": "toggle", "label": "Use Current Location", "permission": "location.when_in_use",
     "footer": "page.sun.cur"},
    {"key": "place", "kind": "place", "label": "Place", "zone": false, "name_max": 24, "footer": "page.local"}]
}
```

The other five follow s3 with the same keys. `"v"` is the declaration's format; the Page refuses a higher one it does
not know (`page.newer`), as the manifest reader refuses `newer_version`.

### 4.2 What each Page writes to `premade.json`

Keys the Page owns; every other key is left as found. These are the keys each premade already reads (its module
docstring), plus Countdown's `all_day` and the Habits `id` rule.


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 4.2 What each Page writes to premade.json, scrolls sideways" style="--tw:557px" markdown="1">

| Premade | Keys | Example |
|---|---|---|
| Countdown | `events`, `pinned` | `{"events": [{"name": "Lisbon trip", "at": "2026-12-18T12:00:00-05:00", "all_day": true, "symbol": "airplane", "set_at": "2026-11-15T09:41:00-05:00"}], "pinned": "Lisbon trip"}` |
| Sun | `use_current`, `place` | `{"place": {"name": "Lisbon", "lat": 38.72, "lon": -9.15}}` |
| Clocks | `cities` | `{"cities": [{"name": "Lisbon", "zone": "Europe/Lisbon"}, {"name": "Tokyo", "zone": "Asia/Tokyo"}]}` |
| Distance | `places`, `units` | `{"places": [{"name": "Home", "symbol": "house.fill", "lat": 40.713, "lon": -74.006}], "units": "imperial"}` |
| Habits | `habits` | `{"habits": [{"id": "h3f9a0c21", "name": "Read", "done": ["2026-11-14", "2026-11-15"]}]}` |
| GitHub | `repo` | `{"repo": "python/cpython"}` |
| Shortcuts | `shortcuts` | `{"shortcuts": [{"name": "Morning run", "symbol": "figure.walk"}]}` |

</div>


## 5. Strings (DRAFT; no copy guide is approved)

This table is the full set. The strings the frames draw are the drawing script's own table (`draw_premade_inputs.py
--strings`); where both have a string, they match. T-5193 (Maren): the five rows from `page.dup` to `page.loc.nofix` were written
by the build (Idris, T-4468); each follows the voice rule (approved.md section 8) and is kept word for word. Apostrophes are
mixed already (straight in the four "couldn't" lines, curly in "hasn’t", "can’t"); the table copies the Swift exactly.


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 5. Strings (DRAFT; no copy guide is approved), scrolls sideways" style="--tw:790px" markdown="1">

| ID | String | Where |
|---|---|---|
| `page.title.*` | Events · Place · Cities · Places · Habits · Repository · Shortcuts | Page title; Gallery row label |
| `page.preview` | How your widget looks now. | under the well |
| `page.local` | Places stay on this iPhone. | footer, Sun, Clocks, Distance |
| `page.unreadable` | PyWidget couldn't read this widget's settings, so it changed nothing. | in place of the sections |
| `page.cantsave` | PyWidget couldn't save this change. Try again. | under the section |
| `page.newer` | These settings come from a newer PyWidget. Update PyWidget to change them. | in place of the sections |
| `page.ax.well` | Preview of your widget | VoiceOver label of the well |
| `page.ax.row` | Opens its settings. | VoiceOver hint of a list row |
| `page.place.choose` | Choose a Place | place row before one is set; search screen title |
| `page.place.search` | City | search field placeholder |
| `page.place.empty` | Search 7,342 cities stored on this iPhone. What you type never leaves it. | empty search |
| `page.place.none` | No city starts with “{q}”. Try its English name. | no hits |
| `page.place.nozone` | No time zone known | dimmed hit, Clocks |
| `page.place.current` | Use Current Location | Distance's search screen |
| `page.loc.off` | Location is off for PyWidget. | footer, with Open Settings |
| `page.cd.foot` | Medium shows the next three. Small and the Lock Screen show the one you choose. | Countdown footer |
| `page.cd.add` | Add Event | add row; sheet title |
| `page.cd.edit` | Edit Event | sheet title |
| `page.cd.past` | Choose a date that hasn’t passed. | refusal |
| `page.cd.dup` | You already have an event called “{name}”. | refusal |
| `page.cd.full` | Countdown keeps up to 20 events. Delete a past one to add another. | footer at the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> |
| `page.cd.short` | Shown on the Lock Screen line. Leave it empty to use the name. | Short Name footer |
| `page.cd.soonest` | The soonest | first option of Show on Small |
| `page.cd.ended` | Ended | detail of a past event |
| `page.sun.cur` | Uses where this iPhone was when PyWidget was last open, or the place below when it has no location. | Sun footer |
| `page.cl.min` | A clock needs at least one city. | footer when one city is left |
| `page.cl.foot` | Small and the Lock Screen show the first three. | Clocks footer |
| `page.hb.del` | Delete “{name}”? Its check-ins are deleted too. | confirmation |
| `page.gh.bad` | Enter it as owner/name, like python/cpython. | refusal |
| `page.gh.foot` | Public repositories only. The widget asks GitHub for this repository’s numbers about every 15 minutes. | GitHub footer |
| `page.sc.foot` | Type the name exactly as it is in Shortcuts. PyWidget can’t see your shortcuts to check it. | Shortcuts footer |
| `page.dup` | You already have one called “{name}”. | refusal; a list other than Countdown's events |
| `page.full` | This list is full. Delete one to add another. | footer at a list's cap, where no cap-specific line exists |
| `page.required` | This can’t be empty. | refusal, a required text field |
| `page.nocities` | PyWidget couldn't read its city list. Reinstall PyWidget to get it back. | in place of the search, when the city list cannot be read |
| `page.loc.nofix` | PyWidget couldn't find where this iPhone is. Try again outside or near a window. | Use Current Location, when no fix comes |
| `page.sum.*` | “{n} events”, “No events yet”, the place's name, “{n} cities”, “No places yet”, “{n} habits”, the repository, “{n} shortcuts” | Gallery row detail |

</div>


## 6. Build notes

For Idris (Swift):
1. `SettingsPage` and `PlacePicker` in `pywidget/ios/App/Pages/` (s2.6), decoding `GalleryEntry.settings`; a pure
   test per field kind's write (`swift test`, like CitySearchTests), including "keeps the keys it does not own" and
   "never overwrites a file it cannot parse".
2. The write on the run queue, then `WidgetWriter.refresh` with `.settingsSaved` (s2.3).
3. The Gallery detail row and the widget-tap route (s2.5). CitySearch reused unchanged; `cities.tsv` built into the
   app (CitySearch.swift's header: nothing builds it in yet).
4. Done when (the board line): on the iPhone, Countdown's event and Sun's place set from the app show on the placed
   widgets, and each of the other five takes its input the same way.

For Pernille (Python, small):
1. Countdown reads `all_day`: true drops the clock from `_when` ("Today", "Tomorrow") and keeps the event upcoming
   until the end of its local day, with no under-a-day timer. Without it a date-only event says "Today, 12:00 PM",
   a time nobody chose.
2. `SETTINGS` in the seven modules, and `premade_catalog.py` copying it into `catalog.json`.
3. A render test per premade with each text field at its `max`, in every family the premade claims. **Found while
   drawing:** in Countdown's Medium right column, render.py draws "Half marathon" (13 characters) as "Half mar…"
   and "126 days" as "126 da…", and the two text boxes overlap (the only QA issues in the sheets, frames 1, 3 and
   10). render.py does not apply `minimum_scale_factor`, so SwiftUI may shrink the name instead; the day count must
   never be the part that is cut. A 28-character name will not fit that column at any scale. Either the day count
   gets layout priority in `countdown.py` (my recommendation), or Name's `max` drops; the test decides which.

## 7. Open items (company decisions; none needs the Investors)

1. **The reading in s1.** The Page lives with the premade's Gallery entry and widget until phase C makes premades
   projects. If the Investors meant an entry in the Projects list now, their words will say so.
2. **Copy.** Every string is DRAFT, with the rest of the app's strings.
3. **One file per premade.** Two placed Countdowns show the same events. Settings per placed copy need the widget's
   configuration to carry a settings id; phase C's project model is the place to decide it (Ines, Idris).
4. **GitHub token.** Private repositories need the person's token in the Keychain; a secure field is a later step,
   reviewed on its own.
5. **Measured, not judged.** The character limits in s3 are design widths until s6 item 3 measures them.

## 8. Frames and QA


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: 8. Frames and QA, scrolls sideways" data-n="1" style="--tw:559px" markdown="1">

| # | Frame | Shows |
|---|---|---|
| 1 | Gallery detail, Countdown | the new Events row under the family chips (route 2) |
| 2 | Events, empty | the well's real "No events" notice; only the add row |
| 3 | Events, saved | upcoming in date order, one past, Show on Small |
| 4 | Add Event | name, date, Time off, symbol, short name; Save on |
| 5 | Add Event, refused | a past date; Save off; the alert line |
| 6 | Place, empty | Sun's real "No place set"; toggle off; Choose a Place |
| 7 | Choose a Place | "Lis": real hits from cities.tsv, population order |
| 8 | Place, Lisbon | the well's real Lisbon sunrise and sunset |
| 9 | Place, location off | toggle off, the footer with Open Settings |
| 10 | Events at AX3 | rows stack, tiles hide, nothing truncates |

</div>


`qa.json` holds draw_ide.py's per-frame checks (clipped, truncated, overlapping, under 11 pt, and text contrast per
node against its composited background, 4.5:1, 3:1 large). Content behind a sheet and the disabled Save are exempt by
design, as in the launcher editor. Result, 2026-11-15: 10 frames per sheet, 6 issues per sheet, all the Countdown
widget overlap in s6 (Pernille item 3), none in the Page itself; lowest text contrast 5.49:1 (A) and 6.37:1 (B).
Dates in the frames are drawn in one English format; the build uses the system's date styles.

## 9. Buttons in 1.0 (T-4558)

**2026-11-18 (T-4764, Maren, from `reviews/359a4e52fb-pernille.md` L1).** This section covers the built twelve. s0
(T-4672) supersedes its 1.0 count: "one premade gains a button" and "the other eleven gain none" below were true when
written; s0 now plans Focus timer, Flashcards and Day phases with buttons, and six of the eleven leave the Gallery. The
slot figure in s9.4 is Habits' alone. Each new premade's buttons are counted against s3's caps in its own build line.

**Dated line, Maren, 2026-11-16 6:30 AM ET, with Ines's limits (ADR-011 s13 step 10, accepted at 137c133087; plan.md
chair note 2026-11-15 10:00 PM).** One premade gains a button in 1.0: **Habit tracker**, a **Done today** button per
habit shown. The other eleven gain none. Every count sits inside ADR-011 s3's caps, and the build fits the 1 slot day
(0.5 to 2) plan.md gives step 10 (s9.4). The launcher premades (`widgets/premade/launcher/`, built, not released) are
not among the twelve; their tiles are `Link`s through the launcher path, which s3 does not count, and nothing changes.

**2026-11-17 (T-4763):** the slot figure above no longer holds. The mark became an operation with its own result
channel (s9.2), and s9.4 now puts it at 1.5 (1 to 2.5) slot days.

### 9.1 The test each premade had to pass

1. **It does more than open pywidget.** Apple: "An interaction with a button or toggle should do more than open the
   app" (ADR-011 [A3]). Opening a Page, a link or an app is the tap's job, or a `Link`. So a premade's button runs one
   of its own declared functions.
2. **It can run inside the widget.** On iOS 18 to 26 an in-widget run has no location fix, no motion reading, no
   network wait and no keyboard, in one 2.0 s budget (ADR-011 s4). A button that needs any of those opens pywidget
   on every tap, which is the tap again.
3. **A person would do it from the Home Screen, often.** Daily, not once at setup.
4. **It fits.** Each counted button has a 44 x 44 pt hit area with 12 pt to the next (ADR-011 s3), measured on the
   smallest iOS 18 phone (375 x 667 pt; 16 pt widget margins: Small 116 x 116 usable, Medium 289 x 116, Large
   289 x 292).

No premade draws a `Button`, `Toggle` or `RefreshButton` today (`grep` of `widgets/premade/*.py`, 2026-11-16), so the
habit buttons are the only counted instances in any premade.

### 9.2 Habit tracker: Done today

**What it does.** A tap marks today done for that habit; on a habit already done today, a tap takes today's mark off,
so a slip of the thumb is undone with a second tap. It is a `Button`, not a `Toggle`, because `Toggle` stays inert in
1.0 (ADR-011 s7 item 5). The background tap is unchanged: the Page, focused on the habit (s2.5, T-4515). The week's
other days are still set in the Page.

**The action.** `@widget.action("check", timeout=0.5)` in `habits.py`, one name for every row (one setting, separate
taps; ADR-011 s7 item 2). Each drawn instance carries `args` of numbers only (ADR-011 s1):


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: 9.2 Habit tracker: Done today, scrolls sideways" style="--tw:724px" markdown="1">

| arg | value | why |
|---|---|---|
| `habit` | the habit's `id` read as a number: `"h1a2b3c4d"` -> `0x1a2b3c4d` (at most 4,294,967,295, exact in JSON) | names the habit, not its row, so a reorder in the Page between draw and tap cannot mark the wrong one |
| `day` | the local day drawn, as days since 1970-01-01 | a tap just after midnight marks the day the person saw |
| `done` | 1 to mark, 0 to unmark: the opposite of what the button showed | a repeated or stale tap does what the person saw, never a <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> flip |

</div>


The handler treats `args` as untrusted (ADR-011 s7, L2): an unknown `habit`, a `day` outside today and the six days
before (the Page's own limit, s3.5) or any other value changes nothing. Only a habit whose `id` came from
the file draws a button; any other keeps its `Link`. `habits.py` `read()` cannot tell the two apart as it stands: it
writes `str(h.get("id") or _slug(str(h["name"])))`, so a file from before the Page (no `id`) still gets an id, the
slug of the name's first word, and `draw()` would put a button on it with a made-up id. A slug can also take the
stored id's own shape: a first word `h1a2b3c4d` gives the id `h1a2b3c4d`. So `read()` sets `"stored": True` on a habit
only when the file's entry has an `id` that is a string of `h` and 8 lower-case hex digits (the form the Page writes,
s4.1), and `False` otherwise, and `draw()` draws a button only where `stored` is true. The slug stays as the habit's
`id` for the row's `Link` URL (`_url`). T-4705's handler cases add a pre-Page habit (no `id`) and one whose name's first
word is `h` plus 8 hex digits: neither draws a button. The tree's `v` covers the `args`, so a tap on a widget drawn
before a change is N4 (ADR-011 s8), not a wrong mark.

**Per family, against s3's caps.** Area figures in this table are estimates from the type sizes at the default text size
(subheadline 20 pt line, footnote 18, headline 22), worked in one script on 2026-11-16; larger text sizes follow the
table, under "When the text grows". Pernille's render test and Idris's step-6 screenshots measure them.


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: 9.2 Habit tracker: Done today, scrolls sideways" style="--tw:898px" markdown="1">

| Family | Buttons / cap | Layout with buttons | <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> (usable 375 pt phone) |
|---|---|---|---|
| `systemSmall` | 1 / 2 | the one habit; the button at the trailing end of the streak line; the streak number drops from 44 to 34 pt; "day streak" moves under it; the "Habit" eyebrow goes | height 109 of 116; width at a 3-digit streak 113 of 116 (3 pt spare: the render test at "365" decides; if it fails, the number drops to 30 pt) |
| `systemMedium` | 3 / 4 | three columns instead of three rows: name (footnote, up to two lines), the week's dots at 9 pt, the button under them; the "This week" head goes | three stacked rows need 156 of 116 pt, so rows are impossible. Columns 88 pt wide: dots 84; height 101 of 116; 56 pt between hit areas |
| `systemLarge` | 6 / 8 | two columns of three cells: name above (subheadline, one line), dots at 9 pt and the button beside them; the head becomes one line; the letters row, the "Best streak" footer and the "Tap a habit to log" hint go | six stacked rows need 324 of 292 pt, so rows are impossible. Cells 138 pt wide (row 133), 68 tall; grid 228, with the head 264 of 292 |
| `accessoryCircular` | 0 / 0 | unchanged (the gauge) | cap is 0 |

</div>


In every cell and column the name and dots stay a `Link` to the Page with the habit's focus; links are not counted
(ADR-011 s3). These are my layouts; their frames, in Paper and Studio, are drawn before the build (s9.4).

**When the text grows (T-4764, from review M2).** Every text in these layouts is a text style, so it grows with Dynamic
Type. The 44 pt hit areas do not, and neither do the dots: they are circles drawn in points. So the rule is that text
gives way and the button never does. A button keeps its whole 44 x 44 pt hit area, 12 pt from the next button and
inside the widget, at every text size. A layout that cannot keep that is not squeezed: it is replaced by the next step.
Inside the approved look (creative/approved.md): the steps use the same type styles, the same 9 pt dots and the same
button, and nothing is added to the identity. In this order, in every family:
1. **The head, eyebrow and hint lines go** (what the cell says anyway: "This week", "Tap a habit to log").
2. **The name goes from two lines to one**, then scales to 0.8 for width (`minimum_scale_factor`, never under 11 pt: the
   floor ADR-011 s3 sets for a button's label), then ends in an ellipsis. The full name is still read by VoiceOver, on
   the `Link` and in the button's label.
3. **The cell changes shape and fewer habits show.** Medium's three columns become two, drawn as Large's cell. Large's
   three rows become one column of two, from AX3. The Page still holds every habit; the widget
   shows the first ones, as now.
4. **The dots do not shrink.** They do not grow with the text, so there is nothing for them to give back. Review M2
   offered "the dots shrink" as one order; 84 pt of dots in an 88 pt column is already the smallest the 9 pt design
   allows, and a smaller dot is a new look.

Where each step starts (estimates from Apple's Dynamic Type table as I recall it, footnote 13 / 19 / 44 pt and
subheadline 15 / 21 / 49 pt at Large / xxxLarge / AX5; not measured: Idris checks in the Simulator, and the render test
and screenshots at the largest text size measure):


<div class="tbl" role="region" tabindex="0" aria-label="Table 15: 9.2 Habit tracker: Done today, scrolls sideways" style="--tw:1280px" markdown="1">

| Text size | Medium (116 pt tall, 289 wide) | Large (292 pt tall) | Small (116 pt tall) |
|---|---|---|---|
| Large to xLarge (the default range) | the table above: three columns, name up to two lines | the table above: two columns of three, head on one line | the table above |
| xxLarge to xxxLarge | step 2: name on one line, because two lines need 117 of 116 pt at xxxLarge; 91 of 116; the name shows about 11 characters at 0.8 scale, so a 13-character name ends in an ellipsis | step 1: the head goes (it would need 296 of 292); cells 76 tall, grid 252 of 292; the name shows its 13 characters | the streak number is 30 pt (the existing fallback) because "day streak" grows from 18 to 26 pt of line and 109 would become 117 of 116; now 112 of 116 |
| AX1 to AX5, only if a widget draws them (below) | step 3: two columns, 140 pt each, the first two habits; a cell is name above (one line), dots 84 and button 44 beside it, 136 of 140; height 78 at AX1 to 106 of 116 at AX5 | AX1 and AX2: cells 82 and 88 tall, grid 270 and 288 of 292. AX3 to AX5: one column of two habits, cells 96 to 113 tall, 204 to 238 of 292, because a name in a 138 pt cell shows only 7 to 9 characters | as the row above |

</div>


Which AX sizes a widget draws is not settled. ADR-011 s3 says widgets take Large to AX5 (Apple, [A4]); the renderer's
clamp at xxxLarge (design-system-v0 s3.2; API.md A5, proposed; `viewtree.schema.json`) says no widget sees an
accessibility size. The steps hold either way: the AX row applies only if the clamp does not. The largest text size a
widget draws at is xxxLarge while the clamp holds and AX5 if it does not, and s9.4's frames and screenshots are taken
there. The tiers are `When("dynamicTypeSize", [...])` branches, each a whole layout (API.md, `When`), so Pernille builds
them in `habits.py` and the render test reads each branch.

**How it reads.** The button is a symbol only, drawn at 28 pt in its 44 pt hit area: `circle` when not done,
`checkmark.circle.fill` in the accent when done (the dots' fill, `widget_accentable`). Its VoiceOver label (DRAFT, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>):
"Mark Reading done today" when not done; "Undo Reading for today" when done (the habit's own name in place of
"Reading"). Words stay about the person's own log (done, not done, streak); nothing says what a habit is good for or
gives health advice (Commandment 7). The redraw adds no transition (ADR-011 s3). On a locked phone the button waits
for unlock (ADR-011 [A3]); Habits has no Lock Screen family with a button.

**Where the mark is written.** Check-ins live in `premade.json` under `habits[].done`, written today only by the Page
(s3.5). Habits runs in the widget lane, where `Store.save()` writes nothing because `fcntl` is not on the lane's import
list (s2.3.1). The handler's mark must reach that same file, or the widget and the Page disagree. With the button,
`habits` has two writers, so it merges by operation (s2.3.1, dated line 2026-11-17). Each copy of the list is read
seconds before its writer saves: the run's copy at the run's read, and the Page's when it opened. Neither copy is ever
written back whole. (Revised 2026-11-17, T-4763, from T-4601 H1 and M1. The 2026-11-16 text had route B return the
whole changed list. Under s2.3.1's by-key merge that loses a mark or a Page edit, whichever saved first, with no error.
Checked against the code on 2026-11-18. Four corrections, all below: the channel's gate is a slot `widget_tree.emit`
opens, because the handler runs outside `ui._first_party()`; the request rule is checked in `emit`, because
`validate(doc)` never sees the request; the render's own read reapplies the operation; and the writer moves to `Shared/`
so the extension can build it.)

*The mark is an operation.* The handler never returns the list. After its checks it yields one operation, made of the
same three numbers as its `args`:
`{"key": "habits", "op": "mark", "habit": 439041101, "day": 20774, "done": 1}` (habit `h1a2b3c4d`, 2026-11-17).
The handler hands it over with `ui._premade_op(op)` (the result channel, below) and returns `None`, so the state stays
`{}`. It never puts the list, or `premade_file`, in the state: that would be committed to `state.json` and read by the
next run in place of the file (`_premade.open_store`, `FILE_KEY`).

*The render in the same run draws the mark.* The render does not see the handler's copy: `install()`'s timeline
provider calls `read(now, open_store(widget.id, state))`, which opens the file again. So `_premade.open_store`
applies the run's pending operation (if its `key` is one the opened store holds) to the store's data in memory, with
`_premade.apply_op(data, op)`, and never through `Store.set`, so the store is not dirty and no save writes it. Until
the commit the file still lacks the mark; the tree drawn from the marked copy is the one committed with it.

*The operation, exactly* (one pure function on each side: `_premade.apply_op` in Python, `PremadeFileOp.apply` in
Swift; both test against the same cases, s9.4). The habit is the one whose stored `id` equals `"h"` plus `habit` as
8 lower-case hex digits (`"h%08x"`). The date is 1970-01-01 plus `day` days in the Gregorian calendar with no time
zone (Python `dt.date(1970, 1, 1) + dt.timedelta(days=day)`; Swift: UTC calendar), written `YYYY-MM-DD`. For
`done: 1` that date is appended to the habit's `done` if missing, and for `done: 0` every copy of it is removed. Nothing
else in the file changes: not the order of habits or of other dates, the name, the habit's other days, or the other
habits and keys. Applying the operation twice gives the same file as applying it once, because `done` is the state the
person chose, not a flip. If no habit has that id (the Page deleted it after the draw), or nothing would change, the
file is not written and no error is raised. The run's tree and state still commit, and a `.settingsSaved` refresh
(s2.3 step 2) is queued so the tree catches up.

*The Page applies its own edit per habit id.* `habits` is the one list in 1.0 with an `id` rule (s4.1;
`SettingsField.id` is non-nil only there). For such a list, `SettingsPageModel.putRow`, `deleteRow` and `moveRows`
(`App/Pages/SettingsPage.swift`) stop sending the whole list through `saveList`. Each turns its edit into operations and
hands them to `PremadeFileOp.apply(_:folder:wait:)`, which re-reads the file under the lock and applies them, habit by
habit, in one hold:
- a rename (the sheet's `name` differs from `edit.original`'s) sets that id's `name`;
- check-ins: the dates in the sheet's `done` and not in `edit.original`'s are `mark` with `done: 1`, the dates in the
  original and not in the sheet are `mark` with `done: 0`, the same operation as the button's. Only the days the person
  toggled in this sheet are applied;
- an add appends the new row with its new id, and does nothing if the id is already there;
- a delete removes the id, and does nothing if it is already gone;
- a reorder puts the ids in the Page's order, with any id the Page did not have kept after them in the file's order.

The row being edited is found by its `id`, never by value. Today `putRow` and `deleteRow` look the original up with
`rows.firstIndex(of:)` and write nothing if it is gone (review M3). After a reload has brought in a mark, the original
held by an open sheet no longer equals the row, so a by-value lookup would refuse the rename. By id, it goes through.
Habits this edit did not touch keep the file's value. So a mark and a rename made from copies read before either
saved are both kept, in either order. A mark and a Page toggle of the same habit and day are two target states, and
the later save's state stands: that is what the person did last, not a silent loss. Countdown's `events` and the other
lists keep their single writer and the whole-key write.

*The Page reloads when a widget run commits.* `PremadeFileOp.apply` posts one Darwin notification after a rename that
changed the file: `app.pywidget.premade.changed`, no payload. The name is spelled once in `Shared/`, never built from
`Bundle.main`, because the extension's bundle id differs from the app's. Python never posts: the lane refuses `ctypes`
(`lane.py`), and the keys Python saves by key are keys no Page edits. Under route A, the Swift run code posts it after
the action run returns. An open Page (`SettingsPageModel`) calls `load()` when the notification arrives and when its
scene becomes active. Today `load()` runs only in `init`. An open edit sheet keeps its fields and its `edit.original`.
Its Save is applied per id as above, so the reload neither throws the edit away nor overwrites the mark. A widget can
be tapped while pywidget is in front, from Notification Center or the Today view, so foreground alone is not enough.

*The result channel* (ADR-011 s7 has none: a handler returns state, and a premade's state is `{}` in 1.0). In 1.0 the
channel is first-party only and carries one operation per run:
- **Python.** `pywidget_ui._premade_op(op)`, private and not in API.md's public rows. It works only while a slot is
  open, and only once per slot. `widget_tree.emit` opens the slot around `run_handler` when the request
  `is_first_party` and carries an `action`, and closes it when the handler returns or raises. Any other call raises,
  which fails the handler, so nothing is written (ADR-011 s7 (b)). The gate is the slot, not `ui._first_party()`:
  the runner enters `_first_party()` only around the module's own execution (`runner.py`, `_go`), and the handler runs
  later, in `records.finish`'s tree step, outside it. The runner's `_clear_first_party()`, at the start of every run,
  also empties the slot, because `pywidget_ui` stays loaded across runs. If the handler succeeds, `emit` takes the
  operation from the slot and passes it through `build` to `Widget.document(timeline, state=state, premade_op=op)`,
  which writes it at the document's top level as `premade_op`. The document's `state` is unchanged. A host test reads
  it with `ui._take_premade_op()` after `Widget.run_action`; `run_action` still returns the state.
- **Checked in four places.** (1) At the call: a dict with keys exactly `key`, `op`, `habit`, `day`, `done`; `habit`
  an integer from 0 to 4,294,967,295; `day` an integer; `done` 0 or 1. (2) In the document: `validate(doc)` checks the
  same shape and that `widget.id` starts `pywidget.premade.`. `validate` sees only the document, so the request rule,
  `premade_op` only with `first_party: true` and an `action`, is checked in `widget_tree.emit`, which has the request.
  (3) In Swift, decoding the result in the action run's body before `Commit.commit`: the same shape again, the widget id
  `pywidget.premade.habits`, and the `(key, op)` pair on a fixed Swift allow-list with one row in 1.0. Anything else
  ends the run as `error`, and nothing is written: state, tree and file all stay as they were. (4) In the writer: the
  id lookup above.
- **Committed** inside `run.lock`, in ADR-011 s7's lock order: `run.lock`, then `state.lock`, then
  `premade.json.lock`. No writer takes them in another order; the Page and Python take only `premade.json.lock`.
  `WidgetStateCommit.Commit.commit` (`Shared/WidgetStateCommit.swift`) gains an optional `before: () -> Bool`. It is
  called inside its `state.lock` hold, after the `rev` check and before `state.json` is written. For a run with a
  `premade_op`, `before` runs `PremadeFileOp.apply`. If `before` returns false, nothing is written and the commit
  answers a new case, `.premadeBusy`. The tree's compare-and-replace follows in its own hold, as now. The file goes
  first because it is the record. If `state.json`'s write then fails, the mark stands and the next run draws it: a
  premade's state is `{}`, so nothing is lost. In the extension, `apply`'s wait is cut to what is left of the run's
  2.0 s budget, and `.premadeBusy` is the run's `busy` row (ADR-011 s7). The extension finds the file's folder as
  `ExtensionLane` does for a premade's scripts folder (`WidgetFolder.sharedScripts` in the App Group).
- **Contract lines.** bridge-contract.md gains v5.12 (the document's `premade_op`, request unchanged, `contract: 5`
  kept because it is additive in one bundle). ADR-011 s7 gains a dated line that a first-party handler may yield one
  premade operation. Both are Pernille's to write at step 5.

The same Swift writer, `PremadeFileOp.apply`, serves the Page, the extension on iOS 18 to 26 and the app's run on
iOS 27. It lives in a new `Shared/PremadeFileOp.swift`. The Page's locked writer, `PremadeSettingsFile.write`, and its
`read` and `locked` sit in `App/Pages/PremadeSettings.swift`, which the extension target does not compile
(`project.yml`: `PyWidgetExtension` takes `Widget` and `Shared`). So `read`, `locked`, `lockName`, `lockWait` and
`tempPrefix` move to `Shared/` with it, and the Page keeps calling them there. Two ways to get the mark into the file, Pernille's and Idris's to choose at
the step-5 and step-6 reviews:
- **B, recommended:** the channel and the Swift writer above. No lane change.
- **A:** `fcntl` joins the lane's `ALLOWED` (70,112 bytes, already on the device slice). The handler applies the same
  operation itself through a new operation save in `_premade_lock` (`_premade_lock.apply(folder, op)`, using
  `_premade.apply_op` under the lock), not the by-key `save`. This is a lane decision.
  The file is written before the commit, outside s7 (b)'s "writes nothing", and the Page still needs the per-id edit
  and the reload.

Not chosen: keeping the button's marks in the widget's `state.json`. Two stores of one person's check-ins would show
different weeks in the widget and the Page.

### 9.3 The eleven without a button


<div class="tbl" role="region" tabindex="0" aria-label="Table 16: 9.3 The eleven without a button, scrolls sideways" style="--tw:839px" markdown="1">

| Premade | Why not in 1.0 | What would change it |
|---|---|---|
| Countdown | adding or renaming an event needs typing (the Page); choosing the event Small shows is a setting, not a daily act | none planned |
| Sunrise and sunset | shows a figure; nothing to act on | none |
| Steps and floors | the reading comes from Motion & Fitness; a button could only refresh, which is ADR-007's `RefreshButton`: not person-settable, and it would spend a cap for a reading the app already updates | none in 1.0 |
| Distance to a saved place | needs a location fix, which a widget run here does not get ("while PyWidget is open"); every tap would open pywidget, the tap's job | none |
| Altitude | the same: a fix while pywidget is open | none |
| Shortcuts launcher | its tiles are `Link`s that run a shortcut through pywidget, which iOS must bring forward to open Shortcuts; links are not buttons and stay uncounted | none |
| Storage | shows a figure | none |
| Day progress | shows the clock | none |
| Quote of the day | its caption promises one quote a day, and its list is not picked yet (`PERSON_PICKED = False`: three layout samples). "Another quote" over three samples would show the same lines | first candidate after 1.0, once the L16 list is picked |
| World clocks | shows times | none |
| GitHub repository | a refresh is a network fetch, and GitHub is not a lane premade (it saves its cache through `_premade_lock`, s2.3.1), so the button would open pywidget on every tap | none |

</div>


### 9.4 Build cost, for Idris (Commandment 13 reviewer)

After ADR-011 steps 4, 5, 6a and 6 (the generic path: signing, the Python run, the state commit, drawing). Nothing
here adds a Swift view; the habit button is an ordinary drawn `Button`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 17: 9.4 Build cost, for Idris (Commandment 13 reviewer), scrolls sideways" style="--tw:1044px" markdown="1">

| Part | Who | Size | On the slot |
|---|---|---|---|
| Frames for Small, Medium and Large in Paper and Studio, hit areas outlined, VoiceOver order; and Medium and Large at the largest text size (s9.2, "When the text grows"), hit areas outlined (no frames are drawn yet; no script draws them, so each is drawn by code when this row starts) | Maren | 0.5 day, plus 0.25 for the two larger frames | no, beside it, before the build |
| `habits.py`: the `check` handler, the three layouts, the docstring's "no widget buttons in v1" line; host tests (mark, unmark, unknown `habit`, `day` out of range, a failed handler writes nothing); render tests at name `max` 13 and a 3-digit streak; trees, first renders and `catalog.json` re-run | Pernille | 0.5 day | no, beside it, as plan.md counts her step 5 |
| The result channel's Python half (s9.2): `ui._premade_op` and its slot, opened by `widget_tree.emit` around `run_handler` for a first-party action run and emptied by `_clear_first_party()`; `premade_op` through `build` and `Widget.document`, its shape in `validate(doc)` and its request rule in `emit`; `ui._take_premade_op()` for host tests; `_premade.apply_op` and `open_store`'s in-memory apply for the same run's render; bridge-contract v5.12 and the ADR-011 s7 dated line; tests (refused with no slot, in a non-first-party or non-action run, twice, with a bad shape; a handler that raises after the call yields none; the render after a mark draws it; the store is not dirty after it) | Pernille | 0.5 (0.25 to 1) | no, beside it as step 5 work; it must land before Idris's next row starts |
| The extension's writer (s9.2): `Shared/PremadeFileOp.swift` with `apply`, and `PremadeSettingsFile`'s `read`, `locked` and their constants moved from `App/Pages/` to `Shared/` so the extension builds them; the lock wait cut to the run's budget; decoding and checking `premade_op` in the action run's body; `Commit.commit`'s `before` and `.premadeBusy`; the Page's per-id `putRow`, `deleteRow` and `moveRows` for an `id` list, finding the row by id; the Darwin notification after a changing rename, and `load()` on it and on scene active; tests as below | Idris | 1 (0.5 to 1.5) | yes |
| On the iPhone (iOS 26): a lane Habits widget's button marks today without opening pywidget; Habits' measured T against `timeout` 0.5 + T <= 2.0 s; a locked-phone tap; a tap from the Today view with the Page open, whose rows show the mark; screenshots of the three sizes with hit areas outlined, and Medium and Large again at the largest text size, each button's whole 44 pt area inside the widget | Idris | 0.5 (0.25 to 1) | yes |
| **Total on the slot** | | **1.5 (1 to 2.5)**; plan.md's 1 (0.5 to 2) no longer holds | |

</div>


**The test (replaces "a mark and a Page save in the same second both survive", which a whole-list writer could pass by
timing).** A mark and a rename, each made from a copy read before the other wrote, are both kept. Shape, from
Pernille's `lost_mark.py`: two writers read the same file; the widget writer marks today on `h0000abcd`; the Page
renames `h0000abcd` from `Read` to `Reading`; both commit, mark first and then the other order. Each order must end
with the name `Reading` **and** today in `done`. The same test also covers: a Page toggle of another day of that habit
alongside the mark, both kept; a Page delete before the mark, where the mark writes nothing and no error is raised; the
operation applied twice, giving the same file; the second writer in another process holding the lock (s2.3.1's
cases); and an edit sheet opened before a mark, saved after the Page reloaded, which keeps both the rename and the mark
(the by-id lookup). Idris's Swift tests, run through `tools/xc.sh`. `_premade.apply_op` and `PremadeFileOp.apply` read
the same cases from one file, `pywidget/tests/fixtures/premade_ops.json` (before, operation, after), so the two sides
cannot drift. Pernille's host test runs the Python order of the same shape with `lost_mark.py`'s two copies.

**Does 1 slot day hold? No.** The old 0.5 for the commit assumed reusing a writer as it stood. The operation writer,
the Page's per-id save and its reload, and the result check are new Swift, and they need to reach the extension as
well as the app. The likely figure is 1.5 slot days, with a range of 1 to 2.5. Changing plan.md's step 10 row is
Ines's. Checked on 2026-11-18, the figure stands. The Page's locked writer has landed (`PremadeSettingsFile.write`,
T-4532), so the lock itself is not new. Moving it to `Shared/`, the `Commit.commit` hook and the by-id lookup are each
small, and they sit inside Idris's range. ADR-011 step 6's action commit has no caller yet (`WidgetStateCommit.run` is
used only by its tests), and this row starts after it, as the table's head says. What would push it to 2.5: route A
instead of B; step 6 landing without a place for the body to read the document before the commit; the Python channel
landing late; or Habits' T above 1.5 s, so its buttons fall back to links that open pywidget (it still works,
visibly; ADR-011 s4). `LauncherPremadeSlots.write` still takes no lock (T-4570), but it writes launcher folders, not
Habits', so it does not hold this up.

The board line is Idris's to add when T-4558 is ticked (the board line says so). A draft he can take or change:
`[build] Habit tracker's Done today button \| Idris with Pernille, step of T-4478, after ADR-011 steps 4, 5, 6a, 6:
premade-inputs.md s9. Done when: tests: the handler cases in s9.4, and a mark and a rename from copies read before
the other wrote, both kept, in both orders; seen: on the iPhone (iOS 26) a lane Habits widget marks today without pywidget opening, and Small, Medium
and Large screenshots with hit areas outlined, plus Medium and Large at the largest text size.`

### 9.5 Open

1. **Route A or B** (s9.2): Pernille and Idris, at the step-5 and step-6 reviews. I recommend B. Either way the mark
   is an operation, and the Page saves `habits` per id (s2.3.1, 2026-11-17).
2. **The `entry()` lint and `accessibility_label`.** ADR-011 s3 has the lint print "Button 'x' has no text" when a
   label has no text. The habit button's label is a symbol with an `accessibility_label`; the lint should count that
   as text. Pernille's, in step 5.
3. **Name length.** s3.5 above says Name `max` 24; `habits.py` `SETTINGS` has 13 (measured, c00ce27e15). The layouts
   here use 13. s3.5 is the stale one; I correct it with the frames.
4. **Strings** are DRAFT, like every app string, until a copy guide is approved (C51).
5. **Which text sizes a widget draws** (s9.2, "When the text grows"): ADR-011 s3 says Large to AX5, the renderer's
   clamp says xxxLarge. Idris checks in the Simulator; the AX row of the table is built only if the clamp <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span>.
{% endraw %}

</div>
