---
layout: "default"
title: "Review of T-4183 at 0803f09d: T-4468&#x27;s Swift, slices 1 and 2 (the premade settings Page and its ways in)"
section: "documents"
description: "At 0803f09d alone this is not shippable: slice 1&#x27;s H1 and M1 to M5 are all still in it (slice 2 touched none of those code paths). On main they are fixed (table below), so the merge passes once main is what ships. Slice\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4183-0803f09d-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4183-0803f09d-pernille.md</code></span></div><h1>Review of T-4183 at 0803f09d: T-4468's Swift, slices 1 and 2 (the premade settings Page and its ways in)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4540, Commandment 13). Author: Idris. Reviewed: 23788b915a (slice 1: SettingsPage, PlacePicker,
the write on the run queue) and 0803f09d43 (slice 2: the Gallery row, the widget-tap route, the city list, Use Current
Location): App/Gallery/GalleryView.swift, App/Pages/PlacePicker.swift, App/Pages/PremadeSettings.swift,
App/Pages/SettingsPage.swift, Tests/Core/PremadeSettingsTests.swift, Tests/SettingsPageTests.swift, project.yml,
log/assets.md, and the location purpose string in App/Info.plist. Line numbers are at 0803f09d43 unless a line says
"main". Left out: my own Python half (c00ce27e15) and my lock fix (30ea7b46f1); Idris reviewed the lock fix in
t4468-lock-idris.md. Date: 2026-11-16.

Tests: I ran Core's `swift test --filter PremadeSettingsTests` in a scratch copy of 0803f09d43 (`git archive`):
27 passed, 0 failed, the four slice 2 cases among them. cities.tsv at 0803f09d43: sha256 a080c72c...efe90e5,
276,651 bytes, 7,342 data rows, as the assets row says. No Xcode, Simulator or phone run: SettingsPageTests (the bundled
list, Lisbon offline, the seven on the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span>) and the routes themselves are read, not run.

## Verdict: PASS with findings

At 0803f09d alone this is not shippable: slice 1's H1 and M1 to M5 are all still in it (slice 2 touched none of those
code paths). On main they are fixed (table below), so the merge passes once main is what ships. Slice 2 itself is
small and careful. The routes are one pure rule with tests. The city list is the bytes I staged, public domain, logged.
Location is asked only on the tap, rounded to 3 decimals, and kept in the premade's own file. It raises two Mediums,
both in Choose a Place, and both still on main: the person can end up with a place that is not the one its name says.
Neither loses saved data or risks rejection, so neither holds TestFlight. Both should be fixed before release, because
the widget then shows a wrong clock or a wrong distance and nothing on screen says so.

## Slice 1 findings (t4468-slice1-pernille.md): where each stands


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Slice 1 findings (t4468-slice1-pernille.md): where each stands, scrolls sideways" style="--tw:960px" markdown="1">

| Finding | At 0803f09d | On main |
|---|---|---|
| H1 a widget-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> run undoes a settings save | open: `PremadeSettings.swift` write has no lock | fixed: Python half 30ea7b46f1 (mine, reviewed by Idris), Swift half f5f268e6cf (flock on premade.json.lock around read, merge, rename, 2 s wait, one synchronous call) |
| M1 a save waits behind a run with no deadline | open | fixed in 86cf6f47bd: `onRunQueue(within: 5)` with one claim between start and deadline; a pending overlay keeps the control on the person's choice |
| M2 the sheet stays open through two runs; Save tappable twice | open | fixed in 86cf6f47bd: save returns at the write; widget run and preview in one model-owned task; Save disabled with a progress view (`saving`) |
| M3 list edits built from a stale copy | open | fixed in 86cf6f47bd for add, edit and delete (rows read through the overlay, writes chained, rows found by content). One gap: a manual move still applies the drawn `IndexSet` to the rows as they stand (L4) |
| M4 item text not normalised | open (`SettingsPage.swift:628-633`, `:658`) | fixed in 86cf6f47bd: `SettingsKinds.normalised` in `check` and `put`; `copiedName` cuts a city's name to Name's `max` |
| M5 all-day event Past at noon | open | fixed in 86cf6f47bd: one rule, `SettingsKinds.isUpcoming`, for the Past section and the save check |

</div>


I read 86cf6f47bd and f5f268e6cf only against these findings. They landed after 0803f09d, and this line does not cover
the rest of 86cf6f47bd (its lane and systls changes).

Slice 1 Lows still open on main: L3's Habits rows (every row should show this week's dots from `week_starts`; the
row still shows `done.count`, and `week_starts` is decoded and never used); L3's `settings_saved` rows in ADR-007 and
ide/spec.md 12.4.1 (still absent); L3's `onRunQueue` running `body` on the caller before Python has started. They go
in the Low line below with the new Lows.

## Findings (slice 2)

### M1. A place chosen after another keeps the first place's name

- Where: `App/Pages/SettingsPage.swift:654-659` (a hit's name goes into Name only when Name is empty), `:660-664`
  (Use Current Location changes lat and lon and leaves Name as it is), `:677-687` (Distance's Place row shows the
  Name, not the place). On main: `SettingsPage.swift:821-850`, unchanged. Spec s2.4 says "when that field is still
  empty", so the code follows the spec; the spec misses this case.
- The failure: in Clocks, the person picks Lisbon, and Name fills with "Lisbon". They change their mind and pick
  Tokyo. Name stays "Lisbon" and the zone becomes Asia/Tokyo, so the widget shows "Lisbon" over Tokyo's time. In
  Distance, they pick Lisbon (Name "Lisbon"), then tap Use Current Location. The item now holds their own position
  and is still called "Lisbon". The Place row reads "Lisbon" both before and after (`:682` shows the name whenever
  there is one), so nothing on the sheet shows that the place changed. The widget then shows the distance to "Lisbon"
  as a few metres.
- The fix: the sheet remembers the name it copied in last. A new hit replaces Name when Name still equals that copied
  name (the person has not typed their own). A fix clears it, so `required` asks for a name ("Home"). Distance's Place
  row shows the place itself (the city's label, or the rounded coordinates), not the Name. Say the copied-name rule in
  s2.4.
- Test: Clocks, pick Lisbon then Tokyo with Name untouched: Name is "Tokyo". Pick Lisbon, type "Mum", pick Tokyo:
  Name stays "Mum". Distance, Lisbon then a fix: Name empty and Save refused with `page.required`.

### M2. A location fix that arrives after the person left Choose a Place still changes the item

- Where: `App/Pages/PlacePicker.swift:99-101` (an unstructured `Task`, never cancelled) and `:118-130` (`sample`
  waits up to 15 s, then `onCurrent` and `dismiss()` run whatever has happened on screen since). On main, unchanged.
- The failure: the person taps Use Current Location indoors, sees the spinner, gives up, taps Back, opens Choose a
  Place again and picks Lisbon. Up to 15 s after the first tap the fix arrives. `onCurrent` writes it into the sheet's
  draft over Lisbon's coordinates, and `dismiss()` runs on a screen that is no longer shown (I have not run that to
  see what it does). If they save, the item holds the phone's position under the city's name (with M1, the row still
  reads the city). The fix only reaches the file on Save (s2.8 holds), but it is a position the person walked away
  from.
- The fix: keep the task in the view's state and cancel it in `onDisappear`, or run it from `.task(id:)`. After
  `sample` returns, return without calling `onCurrent` or `dismiss()` when the task was cancelled. `sample` itself
  cannot be cancelled and needs no change: its timeout ends the wait, and the result is dropped.
- Test: hand PlacePicker its location source (`LocationCall.Source` exists; the picker calls `SystemLocationCore`
  directly today), then in a SettingsPage test: start Use Current Location with a held fix, leave the picker, release the fix: the draft is unchanged.

### L1. Location off: the row stays "off" after the person turns it on in Settings

`PlacePicker.swift:41` says the row is "read again each time the screen shows (back from Settings)", but `:78` reads it
in `onAppear`, which does not run when the app returns from the Settings app. The Open Settings button (`:92-94`) takes
the person away, they allow location, come back, and the row still says `page.loc.off` until they leave the screen and
open it again. Read the status again when `scenePhase` becomes `.active` (or on `didBecomeActive`).

### L2. A widget tap on the premade whose sheet is already open does not push the Page

`GalleryView.swift:215-223` sets `openWithPage` and then `open = entry`. When the sheet already shows that same entry
(opened from its tile, then the person went Home and tapped the widget), `.sheet(item:)` sees the same identity and
re-presents nothing. `GalleryDetailView.path` (`:392`, `:398`) is seeded only in `init`, so the Page is not pushed, even
though `fromTap`'s comment (`:143`) says a second tap reopens it. On main as well, with `focus` (T-4515) lost the same
way. When `open?.id == entry.id`, push onto the open sheet's path instead: a request id the detail view watches.

### L3. The location purpose string does not name this use

`Info.plist:43-44` (and `project.yml:216`): "Your scripts and widgets read your location only when they ask for it."
This prompt now first comes from a person's tap on Distance's Use Current Location, not from a script. The rest of
the string still holds: the reading is kept on this device for the widgets and never sent. So I do not read it as a
5.1.1 rejection risk. It is still clearer to say what the tap does: "...or when you choose Use Current Location for a
widget's place". Words with Maren.

### L4. Smaller points

- `SettingsPage.swift` on main (`moveRows`): a manual list's move applies the `IndexSet` from the rows drawn on screen
  to the rows as they stand with pending edits (M3's last gap). Clocks and Shortcuts are manual. A move made while a
  delete is still being written moves the wrong row. Map the drawn rows to their contents first, as `deleteRow` does.
- `PlacePicker.swift:56`: hits are keyed by `\.offset`, so the rows are reused across queries. That is harmless today,
  since each row has no state of its own. Key by the place's identity if a row ever gets state.
- `GalleryView.swift:476-478`: the summary reads the file on the main actor at each pop. It is a few hundred bytes
  and read without the lock (a rename never leaves a torn file), so this is fine as it is; noted only so nobody adds
  the lock here, because a 2 s wait on the main actor would freeze the sheet.

## Commandment 6 and privacy

- cities.tsv: Natural Earth 10m Populated Places 5.1.2, public domain, commercial use stated, no attribution required.
  Its zone names come from the source and are only checked against the host's tzdata, so they need no row of their
  own. The bytes in the app match the 2026-11-02 row and the new 2026-11-15 row in log/assets.md. It is data, not
  imagery or audio, so there is no AI art question. It is in the app target only (`project.yml:161`); the extension
  does not carry it. 276,651 bytes is under the 300,000-byte budget I proposed in T-1032 (Ines sets the number). The optional credit "Made with
  Natural Earth." is not in Acknowledgements yet. That is not required, and T-4517 (Odalys) carries it.
- Location: asked only on the tap (`CurrentPlaceRow.of`, `:120`), When In Use only, one fix, rounded to 3 decimals
  (`SettingsKinds.place(fromFix:)`, tested to 40.713, -74.006). It is written only into the premade's own file in the
  App Group when the item is saved. `SystemLocationCore.sample` keeps no cache of its own, and nothing here logs the
  fix. This matches the privacy policy draft (`pywidget/docs/release/privacy-policy-draft.md:34`, "Places you save": a
  place from a fix you choose to take, kept on the device, possibly in your own backups). It is not the kept last
  reading of line 35, which T-4628 covers for the Distance run itself. Denied, restricted or an unknown status gives
  "off" and never prompts. The purpose string is accurate (L3 is
  wording only).

## Tests

Covered: the route rule (seven premades, locked never, tile tap never pushes), the location row's three states, only
Distance offers current location, fix rounding, the bundled list's row count and an offline Lisbon hit, the shelf
offering seven. Missing: the routes as a person meets them (T-4516 carries a UI test); M1's name rule; M2's late fix;
L1's return from Settings; L2's tap on an open sheet.

## Who fixes what

- Idris: M1 = T-4639 (with Maren for the s2.4 sentence), M2 = T-4640, then L1 to L4 and the slice 1 Lows still open
  = T-4641.
- c00ce27e15 (my Python half: SETTINGS declarations, `all_day`, the measured text limits) has no review by anyone but
  me. I have added a [review] line for it, owned by Idris: T-4642.
- TestFlight: nothing here blocks it once the build is from main (H1 and M1 to M5 fixed there).
{% endraw %}

</div>
