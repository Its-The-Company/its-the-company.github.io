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

### 2.4 Choose a Place (frame 7)

Pushed from a `place` row. A search field (`page.place.search`), then CitySearch's hits for the typed text: prefix
match on the folded name, largest population first, at most 20, each labelled "name, admin-1, country"
(`CitySearch.swift`, unchanged). Empty field: no list, one footnote, `page.place.empty` (7,342 = the data rows of
`cities.tsv`, counted 2026-11-15). No hits: `page.place.none`. The search makes no network request and needs no
permission.

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
3. **The empty notice.** The seven notices already send the person to pywidget ("Add a countdown in pywidget.");
   route 1 is that tap. Their words do not change.

In phase C: the premade's project page lists its outputs (03-structure s1, "The project page"), the widget and the
settings Page. Route 1 then opens the project's Page directly; route 2 stays.

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
--strings`); where both have a string, they match.


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 5. Strings (DRAFT; no copy guide is approved), scrolls sideways" style="--tw:790px" markdown="1">

| ID | String | Where |
|---|---|---|
| `page.title.*` | Events · Place · Cities · Places · Habits · Repository · Shortcuts | Page title; Gallery row label |
| `page.preview` | How your widget looks now. | under the well |
| `page.local` | Places stay on this iPhone. | footer, Sun, Clocks, Distance |
| `page.unreadable` | pywidget couldn't read this widget's settings, so it changed nothing. | in place of the sections |
| `page.cantsave` | pywidget couldn't save this change. Try again. | under the section |
| `page.newer` | These settings come from a newer pywidget. Update the app to change them. | in place of the sections |
| `page.ax.well` | Preview of your widget | VoiceOver label of the well |
| `page.ax.row` | Opens its settings. | VoiceOver hint of a list row |
| `page.place.choose` | Choose a Place | place row before one is set; search screen title |
| `page.place.search` | City | search field placeholder |
| `page.place.empty` | Search 7,342 cities stored on this iPhone. What you type never leaves it. | empty search |
| `page.place.none` | No city starts with “{q}”. Try its English name. | no hits |
| `page.place.nozone` | No time zone known | dimmed hit, Clocks |
| `page.place.current` | Use Current Location | Distance's search screen |
| `page.loc.off` | Location is off for pywidget. | footer, with Open Settings |
| `page.cd.foot` | Medium shows the next three. Small and the Lock Screen show the one you choose. | Countdown footer |
| `page.cd.add` | Add Event | add row; sheet title |
| `page.cd.edit` | Edit Event | sheet title |
| `page.cd.past` | Choose a date that hasn’t passed. | refusal |
| `page.cd.dup` | You already have an event called “{name}”. | refusal |
| `page.cd.full` | Countdown keeps up to 20 events. Delete a past one to add another. | footer at the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> |
| `page.cd.short` | Shown on the Lock Screen line. Leave it empty to use the name. | Short Name footer |
| `page.cd.soonest` | The soonest | first option of Show on Small |
| `page.cd.ended` | Ended | detail of a past event |
| `page.sun.cur` | Uses where this iPhone was when pywidget was last open, or the place below when it has no location. | Sun footer |
| `page.cl.min` | A clock needs at least one city. | footer when one city is left |
| `page.cl.foot` | Small and the Lock Screen show the first three. | Clocks footer |
| `page.hb.del` | Delete “{name}”? Its check-ins are deleted too. | confirmation |
| `page.gh.bad` | Enter it as owner/name, like python/cpython. | refusal |
| `page.gh.foot` | Public repositories only. The widget asks GitHub for this repository’s numbers about every 15 minutes. | GitHub footer |
| `page.sc.foot` | Type the name exactly as it is in Shortcuts. pywidget can’t see your shortcuts to check it. | Shortcuts footer |
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
{% endraw %}

</div>
