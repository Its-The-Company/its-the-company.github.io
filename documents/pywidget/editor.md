---
layout: "default"
title: "Launcher slot editor: Launcher Apps (T-3669, the design half of T-3664)"
section: "documents"
description: "Frames: editor-A-phone.png (A Paper, light) and editor-B-phone.png (B Studio, dark). Each has 12 iPhone frames at 390 pt. They are drawn by draw_editor.py with the Settings helpers and QA from ../ide/draw_ide.py. QA\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/editor.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/design/launcher/editor.md</code></span></div><h1>Launcher slot editor: Launcher Apps (T-3669, the design half of T-3664)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-08. Idris builds it in T-3664. **Unreleased**, like the launcher premades. It ships only after the
real-iPhone test (#192), and the Investors are told before it does (#41 c6653117254).

Frames: `editor-A-phone.png` (A Paper, light) and `editor-B-phone.png` (B Studio, dark). Each has 12 iPhone frames
at 390 pt. They are drawn by `draw_editor.py` with the Settings helpers and QA from `../ide/draw_ide.py`. QA results
are in `qa-editor.json`. App names and links in the frames are invented placeholders (Inbox, Tunes, Atlas, Lens, Run;
`example.com`). Glyphs are plain geometry standing in for the SF Symbols the person picks. No generative model.

**Inside approved work, no new creative identity.** The screens use the app's tokens and Settings components
(creative/approved.md item 2: "screens, states and widgets drawn from these tokens"). The twelve tile colours are
the ones the premades already use (`_launch.py` `HUES`), built on the Investors' order in T-2551. The editor adds no
colour, face or icon. The strings are DRAFT, like every other app string, since no copy guide is approved.

Sources: `ios/Shared/LauncherSlots.swift` and `ios/App/LauncherTapHandling.swift` (T-2551, 18e7e6118),
[`tap-path.md`](tap-path.html), [`options.md`](options.html), and Wrenna's [`pywidget/docs/research/app-launcher.md`](app-launcher.html) (s3: pick from a list, paste a
link, or run a Shortcut; s4: <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>; s6: the script names a slot, never a URL).

## 1. What iOS allows, and what that means for the screens

- **No list of installed apps.** iOS has no call that returns the apps on a phone. "Choose an App" is a list *we
  ship* of apps whose links are known. Each entry is shown only when `canOpenURL` says the app is there. That needs
  each entry's scheme in `LSApplicationQueriesSchemes`, which allows at most **25 entries** when built with the
  iOS 27 SDK (Apple, quoted in research s3). So the list holds at most 25 apps, and only apps with their own scheme:
  `canOpenURL` is always true for `https`, so it cannot tell whether an app that owns a web link is installed.
- **No app icons.** No public API returns another app's icon, and copying their artwork is out. Each app is a symbol
  and a colour the person picks.
- **No badges.** Nothing here shows or implies another app's unread count (research item 6).
- **Shortcuts reach every app.** The Shortcuts app's Open App action opens any app, including apps with no link.
  That is the honest answer to "my app isn't in the list and has no link". The `shortcuts://run-shortcut?name=` form
  is not documented on an Apple page (research s3). It is **unconfirmed** until #192 runs it.

## 2. Where it lives

- **Settings > Widgets > Launcher Apps** (frame 1). This is a new group, **Widgets**, placed between Help and
  About. Its one row has a tile, the title, and the count as detail ("5 apps", "1 app", "None"). It pushes the
  list.
- **The gate.** The group exists only in builds with the launcher turned on. That is a compile-time condition, like
  `PYWIDGET_LANE_GATE` in SettingsView (Idris names it; proposed: `PYWIDGET_LAUNCHER`). No App Store or external
  TestFlight build defines it until #192 passes and the Investors have been told.
- **From a widget tap** (frame 11). `LauncherTapHandling` opens the same edit sheet titled **Set Up App**, with the
  reason (`LauncherTap.Why`) in a card at the top. The `.badLink` case (the widget names no usable slot) keeps
  today's message-only sheet with Done, because there is no slot to fill.

## 3. Screen: Launcher Apps (the slot list)

Frames 2, 3, 4, 12. Pushed from Settings. Nav bar: back "Settings", title "Launcher Apps", trailing **Edit** and
**+** (44 x 44 pt, VoiceOver label "Add App"). Inset grouped list on `bg.canvas`, card `bg.surface` with a
`line.hairline` edge and 14 pt radius, 16 pt side margins. The Settings tab stays selected.

**Row** (minimum height 60 pt, padding 10/16):
- Tile: 36 pt, radius 26% (9 pt), filled with the slot's hue tile colour and its symbol in the hue's glyph colour
  at 62%. Hidden from VoiceOver and hidden at AX sizes.
- Name: body, one line at default sizes.
- Subtitle: footnote, `text.secondary`, one line at default sizes and truncated in the middle. What it says is
  worked out from the saved `url` and never stored:
  - the url equals a known-list entry's url: `App · {entry name}`;
  - it starts with `shortcuts://run-shortcut?name=`: `Shortcut · {decoded name}`;
  - otherwise: `Link · {where}`, where `{where}` is the host and path for http(s) and the whole link for anything
    else.
- Problem subtitles, in `status.warning` with the warning glyph: `.empty` "No link yet. Tap to choose one." and a
  url that fails `LauncherTarget.check`: "PyWidget doesn't open this link. Tap to change it." The editor never
  saves either. They come from files written elsewhere (an older build, a script), so the list must show them
  (frame 3, Lens).
- Chevron. Tapping the row opens **Edit App**.
- At AX sizes (frame 12), the tile hides and name and subtitle wrap. Nothing truncates.

**Footer:** "Your launcher widgets show these apps in this order. Each widget's script picks which ones to show."
At 16 apps (`MAX_SLOTS`, the large-size cap in research s4) the footer becomes the `list.full` string and + is
disabled.

**Order.** The list order is the file order, and `_launch.read_slots` hands the premades slots "in the person's
order". Reordering is a real feature, not decoration.
- **Edit** (frame 4) shows the delete circle before each row and the drag handle after it. Edit becomes **Done**.
  Standard `List` with `.onMove` and `.onDelete`; `EditButton` semantics.
- A move is written when the row is dropped.

**Delete.** Swipe left on a row deletes it at once, with full swipe allowed and no dialog, the same as Mail and
Reminders. The same applies to the delete circle in Edit. A slot deleted while a widget still names it makes that
widget's tap open Set Up App (`.unknown`), so no tap is ever dead.

**Empty** (frame 2): the list is replaced by three sample tiles (decorative, hidden from VoiceOver), the title
"No Apps Yet", the body, and a prominent **Add App** button (the accent capsule `btn-p`, at least 50 pt tall).
The + in the nav bar does the same thing. Edit is hidden while the list is empty.

**Cannot read or save** (not drawn):
- `slots.json` exists but cannot be read: the rows are replaced by `list.unreadable`, and + and Edit are disabled.
  Nothing is overwritten. The store's own rule already refuses to write over the person's other slots.
- No App Group: the same layout with `bad.nogroup`.

## 4. Screen: Add App / Edit App / Set Up App (one sheet)

Frames 5, 7, 8, 9, 11. One view with three titles: **Add App** (from + or the empty state), **Edit App** (a row
tap), **Set Up App** (a widget tap, `LauncherSetUpSheet` today, which this view replaces). Large detent only. The
header has **Cancel** (leading) and **Save** (trailing, semibold, shown greyed while disabled). The body scrolls
on `bg.canvas`, and its groups use the list's cards.

Top to bottom:

1. **Reason card** (Set Up App only): an info glyph and the `why.*` string, in subheadline. These replace today's
   "Paste the link that opens the app." lines, because the sheet now offers all three ways.
2. **Preview:** the tile at 60 pt and the name under it (caption 1, semibold), as a widget would show it. It is
   live and follows the name, symbol and colour. Hidden from VoiceOver.
3. **Name:** a field with label "Name" and placeholder "Shown on your widget". It is trimmed. It accepts at most
   **40 characters** (`read_slots` cuts at 40), and input past 40 is ignored without an error. Duplicate names
   are allowed, because ids keep slots apart.
4. **Opens:** a segmented control with three segments: **App \| Link \| Shortcut**.
   - Default: **App** for a new slot. For a saved slot it is the way its url was worked out to be (s3).
   - Switching segments keeps what was entered in each segment until the sheet closes. Save uses only the
     selected one.
   - **App:** a row "Choose an App" (accent) that pushes the chooser (s5). Once an app is chosen, the row shows
     its 30 pt tile and name. Footer `ed.app.foot`. Choosing an app fills Name if Name is empty or still holds the
     previous chosen app's name. It also sets the symbol and colour to the list entry's, unless the person has
     already changed them in this sheet.
   - **Link:** one field. Monospace once it has text. URL keyboard, no autocapitalisation, no autocorrect,
     submit label Done (today's field settings). Placeholder `music:// or https://…`. Footer `ed.link.foot`.
   - **Shortcut:** a field for the shortcut's name (placeholder "Name, exactly as in Shortcuts"), then a row
     **Open Shortcuts** with the "opens elsewhere" glyph, which opens `shortcuts://` so the person can make one.
     Footer `ed.sc.foot`. Saved as `shortcuts://run-shortcut?name=` plus the trimmed name, percent-encoded with
     `.urlQueryAllowed` minus `&+=?#`.
5. **Try It** (a row with the "opens elsewhere" glyph; hint `ax.try.hint`). It appears once the current way's
   input passes `LauncherTarget.check`. It opens the link at once through `openURL`, which leaves PyWidget. If the
   completion reports `false`, then on return `bad.tryfail` shows under the input. The check runs before Try It,
   so a refused link is never opened.
6. **On the Widget:**
   - **Symbol:** a row showing the current glyph, which pushes the symbol grid (s6).
   - **Colour:** twelve swatches in two rows of six. Each is a 30 pt circle in the hue's tile colour, with a 1 pt
     `line.strong` edge and a 10 pt centre dot in its glyph colour. Each sits in a 44 x 44 pt target. The chosen
     swatch has a 2 pt `accent` ring outside a 2 pt `bg.surface` gap. The group behaves as a single-choice picker
     (s8).
   - New slot defaults: the list entry's symbol and hue. Otherwise the symbol is `app` (`read_slots`' fallback)
     and the colour is the lowest hue index no saved slot uses, or the slot count mod 12 if all are used.
7. **In Scripts** (Edit App and Set Up App; Add App shows it once Name has text): the slot id in monospace, with a
   **Copy** button that copies the id. Footer `ed.script.foot`. The id cannot be edited (s7).
8. **Delete App** (Edit App, and Set Up App of a slot that is saved): a centred row in `status.danger`. It asks
   first with a confirmation dialog (frame 10): title `del.t`, message `del.b`, **Delete App** (destructive),
   **Cancel**. The sheet asks and the swipe does not, because in the sheet the person may be in the middle of an
   edit.

**Save** is enabled when the trimmed Name is not empty and the selected way has input (an app chosen, link text,
or a shortcut name). Tapping it:

1. Builds the url (App: the entry's url; Link: the trimmed text; Shortcut: as above).
2. Runs `LauncherTarget.check`. If it refuses: the refusal shows (s4.1), the sheet stays open, Save stays
   disabled until the input changes, and the refusal is announced to VoiceOver.
3. Writes the slot (s7): name, url, symbol, hue. A new slot goes at the end of the list.
4. Dismisses. On a new slot, the list scrolls to it, and VoiceOver focus goes to its row.
5. A store error shows in the same place as a refusal: `writeFailed` shows `bad.write`, `unreadableFile` shows
   `bad.unreadable`, no App Group shows `bad.nogroup`.

**Cancel**, or a swipe down, with no changes closes the sheet. With changes, a confirmation dialog offers
**Discard Changes** (destructive) and **Keep Editing**. Use `interactiveDismissDisabled` while there are changes.

### 4.1 Validation timing and the refusal messages

- The Link input is checked **when the field ends editing** (Return, or focus leaving) and **on Save**. It is never
  checked while the person types. The first change after a refusal clears the message.
- A refusal (frame 8) replaces the footer under the field: `status.danger` text, a warning glyph, and the field's
  card edge in `status.danger`. It is announced with `AccessibilityNotification.Announcement`.
- **One engineering change is asked for.** `LauncherTarget.check` returns only `nil`, so it cannot say *why*. Add
  `LauncherTarget.refusal(_:) -> Refusal?`, using the same rules in the same order, with `check` defined as
  `refusal == nil ? URL : nil`. That way the rules exist once. The messages by reason:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 4.1 Validation timing and the refusal messages, scrolls sideways" style="--tw:568px" markdown="1">

| Reason (in check's order) | ID |
|---|---|
| empty after trimming | (Save is disabled; no message) |
| over 2048 bytes | `bad.long` |
| space, control character, DEL, C1 or backslash | `bad.space` |
| no `:`, or not an RFC 3986 scheme | `bad.scheme` |
| `pywidget` | `bad.self` |
| `app-prefs`, `prefs` | `bad.settings` |
| `javascript`, `vbscript`, `file`, `data`, `blob`, `about` | `bad.kind`, `{scheme}` in lower case |
| `URL(string:)` refuses it, or its scheme differs | `bad.any` |
| `http`/`https` with no host | `bad.host` |

</div>


  If Idris keeps `check` as it is, every refusal shows `bad.any`. That is acceptable, but the person learns less.
- The Shortcut name is checked only on Save, through the built url. An over-long name gives `bad.long`.

## 5. Screen: Choose an App

Frame 6. Pushed inside the sheet. Back "Add App" (or "Edit App"), title "Choose an App". It has a search field, a
section **On This iPhone** (alphabetical, 52 pt rows: a 30 pt tile, the name, and a check on the current choice),
and footer `pick.foot`. When no list app is installed, the section is replaced by `pick.none`. Tapping a row
chooses it and pops back to the sheet.

**The list is data, not code.** It ships as a file in the app bundle (proposed `launcher-apps.json`; Idris names
it), with entries of `{name, url, symbol, hue}`. Only own-scheme urls are allowed, at most 25 entries, and each
scheme is also listed in Info.plist `LSApplicationQueriesSchemes`. A test should check that the two lists match.
**Wrenna owns its content.** She picks the apps and confirms each link on a device, because apps change their
schemes without notice (research s3). The frames show placeholders only.

## 6. Screen: Symbol (not drawn)

Pushed from the Symbol row. Title "Symbol". A grid of SF Symbols, six per row in 44 pt cells, with the chosen
symbol in an `accent` ring. The set ships in the same data file as the app list. The starting set is the twelve in
`_launch.py` `_SCENE`, plus `app`. The grid is not drawn because it is a standard grid of system symbols. Its
contents are unconfirmed, and Wrenna or Idris may grow the set.

## 7. What is written (for Idris)

- **File:** `launcher/slots.json` in the App Group (`LauncherSlotStore`), `{"format": 1, "slots": [...]}`. Each
  slot is `{"id", "name", "url", "symbol", "hue"}`. Keys the editor does not know are kept, as `save` already
  keeps them.
- **Store changes asked for:**
  1. `save` also writes `symbol` (String) and `hue` (Int 0-11).
  2. `delete(id)` is new.
  3. `move(fromOffsets:toOffset:)`, or `reorder(ids)`, is new.
  
  All of them keep the atomic write and the refusal to write over a file that cannot be read.
- **After every write** (save, delete, move): write each launcher premade's `slots` from the same list, without
  `url`, as tap-path.md asks. Then reload the launcher widgets' timelines. The order of these steps is Idris's call.
- **The id of a new slot** (frames 7, 9, the "In Scripts" row) comes from its name. Lower-case ASCII letters and
  digits are kept, and each run of other characters becomes one hyphen. The result is trimmed of hyphens and cut to
  32 characters. If nothing is left, it is `app`. If the id is taken, `-2`, `-3` and so on are added (cut to fit 32).
  It must match `LauncherLink.isSlotID`. `draw_editor.py` `slot_id()` is a reference implementation; examples are in
  `qa-editor.json` (`Tunes` -> `tunes-2` when `tunes` is taken, `音楽` -> `app`). **The id never changes after it
  is made.** A rename changes `name` only, so widgets and scripts that name the id keep working.
- **Set Up App for an `.unknown` id:** the id is the one the widget named (frame 11, "lens"). It is fixed and
  shown in In Scripts. Name starts empty.
- The editor never saves a slot with no url. `.empty` slots come only from other writers.

## 8. Accessibility

- **List row:** one element. Label "{name}, {subtitle}" (the warning text when there is one). Hint `ax.row.hint`.
  The tile is hidden. Actions: Delete, plus the standard move actions in Edit.
- **+ :** label "Add App". Edit/Done are standard.
- **Sheet:**
  - The preview is hidden.
  - Name field: label "Name".
  - The segmented control is a `Picker` labelled "Opens".
  - Link field: label "Link". Shortcut field: label "Shortcut name".
  - A refusal is announced and is also the field's accessibility hint until it clears.
  - Try It has hint `ax.try.hint`.
  - Symbol: label "Symbol", value the symbol's plain name.
  - Colour: a single-choice group labelled "Colour". Each swatch's label is its colour name (`HUE_NAMES`: Red,
    Green, Purple, Amber, Cyan, Pink, Lime, Blue, Orange, Teal, Magenta, Olive), and the chosen one has the
    selected trait.
  - Script name: label "Script name", value the id. Copy: label "Copy script name".
  - Delete App: destructive role.
- **Dynamic Type:** everything is text styles. At AX sizes, tiles hide and rows stack (frame 12). Nothing truncates
  at AX sizes. At default sizes only the list subtitle truncates (middle).
- **Targets:** every control is at least 44 x 44 pt, including the swatch cells, the +, and Copy.
- **Reduce Motion:** nothing here animates beyond the system's own push, sheet and list animations.

## 9. Sizes


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 9. Sizes, scrolls sideways" style="--tw:470px" markdown="1">

| Element | Size (pt) |
|---|---|
| list row | at least 60 high, padding 10 / 16, tile 36, gap 12 |
| chooser row | at least 52, tile 30 |
| sheet rows | at least 44 |
| preview tile | 60 |
| tile radius | 26% of side |
| glyph | 62% of tile |
| swatch | 30 circle in a 44 cell, 6 per row, centre dot 10 |
| card | radius 14, side margin 16; group header 22 above, 6 below |
| segmented control | about 32 high, 16 side margin |
| empty-state button | at least 50 high, at least 180 wide |
| sheet | large detent, 58 from the top in the frames |

</div>


## 10. Contrast and layout QA (`qa-editor.json`)

- **Text:** 189 text nodes per sheet, checked against their composited backgrounds by draw_ide.py's QA (4.5:1, or
  3:1 for large text): 0 fail, 0 skipped. Lowest: light 4.8:1, dark 5.6:1. Content behind a sheet or dialog, and
  the disabled Save, are exempt by design (as in the Settings sheets).
- **Non-text (WCAG 1.4.11, 3:1):** each of the twelve hues' glyph on its tile, light and dark: 24 pairs, 0 below
  3:1. Lowest: light 5.61:1, dark 9.67:1.
- **Swatch fills are not held to 3:1 against the card.** The light tiles are pale by design. Each swatch carries a
  `line.strong` edge and its glyph-colour dot, and its name is its VoiceOver label, so colour alone never carries
  the choice. The selection ring is `accent` on `bg.surface`, the same pair as every accent control.
- **Layout:** no text clipped, truncated, overlapping, or under 11 pt in any frame. Sheets are 290,034 B (A) and
  292,702 B (B), under the 300 KB sheet cap.

## 11. Unconfirmed, and who settles it

- **#192:** whether a tap flashes PyWidget first. This decides whether any of this ships.
- **`shortcuts://run-shortcut?name=`:** works, matches the name exactly, and handles non-ASCII names. Needs a
  device; not documented on an Apple page.
- **The known-app list:** which apps, and each scheme confirmed on a device (Wrenna). At most 25, because of the
  iOS 27 SDK cap.
- **`openURL`'s completion reporting `false`** for a scheme no app claims (the Try It failure). This is expected
  from the UIKit docs but has not been seen on a device.
- **The AX3 type sizes** come from draw_ide.py's table. Idris confirms them in the Simulator, as for every screen.
- **All strings are DRAFT.** "Launcher Apps" and the Widgets group name are mine. The Investors see them in the
  report with these frames.

## 11a. As built (T-3664 model, Idris, 2026-11-08; T-3688 screens, 2026-11-12)

- **Gate:** `LauncherEditorGate.isOn` (`ios/App/Launcher/LauncherEditor.swift`): on in a build given
  `PYWIDGET_LAUNCHER`; in a Debug build only when launched with the `PW_LAUNCHER` environment variable (the UI test;
  `reset` also removes slots.json first). Release builds without the flag draw no Widgets group. The tap path
  (T-2551) was never gated by a flag: no shipped widget makes a `pywidget://open` link, so nothing reaches it.
- **Refusals:** `LauncherTarget.refusal(_:)` in `ios/Shared/LauncherSlots.swift`; `check` reads the same rules.
  `.unparsable` shows `bad.any`. On iOS 17+ `URL(string:)` percent-encodes rather than refuses, so it rarely fires.
- **Store:** `save(Edit)` (name, url, symbol, hue), `delete(id)`, `reorder(ids)`, the 16 cap (`.full`). Every
  write, the tap path's too, holds `launcher/slots.lock` (WidgetStateLock's bounded flock); a held lock is `.busy`
  and shows `bad.write`.
- **Known-app list:** `ios/App/Launcher/launcher-apps.json`, `{"format": 1, "symbols": [...], "apps": [{name, url,
  symbol, hue}]}`. The two entries (Music `music://`, Shortcuts `shortcuts://`) are **placeholders**, schemes not
  confirmed on a device; Wrenna fills it. `LSApplicationQueriesSchemes` is set in project.yml, and a Core test
  checks the two lists match. The Symbol grid's set is the file's `symbols`.
- **Set Up App** is presented by UIKit (`LauncherSheetPresenter`, T-3666), so it shows over any open sheet; the sheet
  closes through the presenter, not SwiftUI's dismiss. A slot to fill opens the editor's sheet in Set Up mode; no slot
  named (`.badLink`) or an unreadable slots.json (`.unreadable`, T-3663 L1) keeps the message-only sheet with Done,
  since nothing can be saved. The reason text keeps the id `launcher.setup.message` the tap path's UI tests read.
- **After each write (T-3852, 2026-11-12):** the editor and Set Up App write through `LauncherSlotStore.editor`. Where
  the gate is on, a save, delete or reorder that changed slots.json then writes every installed launcher premade's
  `slots` (`LauncherSlotSync`, `ios/Shared/LauncherPremadeSlots.swift`). If any premade file changed, it reloads the
  tree widget's kind (`PyTreeWidget`, the kind a premade draws in), never every widget. A new link alone changes
  no premade, so it asks for no reload. "Installed" means a bundled premade named `launcher-...`. **No build installs
  one yet**: "Install premades" copies `widgets/premade/*.py`, not `launcher/`, so today the sync writes nothing (an
  app test, `LauncherEditorSyncTests`, fails when that changes, at #192's release step). Not yet tested: a real
  launcher widget redrawing after a reload.
- **One writer at a time (T-4211, 2026-11-12):** the line above once named a premade run writing premade.json at the
  same moment as a save. None does: a launcher premade's run reads its file through `_premade.Store` and never calls
  `save()` (only altitude, github, storage and `keep_reading` do). The race that was real was two saves (the editor's
  and Set Up App's, or two processes): each copied slots.json into the premades after letting go of
  launcher/slots.lock, so the one that read first could write older slots over newer. The copy now happens under that
  lock and the reload after it (`LauncherSlotSyncTests.testTwoSavesThatCrossLeaveEveryPremadeWithTheNewerSlots`
  interleaves the two). A launcher premade whose Python saved its file would write back the `slots` it read, so it
  would need that lock first.
- **Still unconfirmed:** `shortcuts://run-shortcut?name=` (s11) is kept as Maren drew it, untested on a device.

## 12. Strings

Printed from `draw_editor.py` (`--strings`), so the frames and this table cannot drift. `{…}` is filled in at run
time. Typographic quotes and apostrophes are as they ship.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 12. Strings, scrolls sideways" style="--tw:769px" markdown="1">

| ID | String | Where |
|---|---|---|
| `set.grp.widgets` | Widgets | Settings group header, above About; the group exists only in builds with the launcher on |
| `set.launcher` | Launcher Apps | Settings row; the list screen's title |
| `set.launcher.n` | {n} apps | Settings row detail, n >= 2; '1 app' for one; 'None' for zero |
| `list.add` | Add App | toolbar + button's label (VoiceOver) and the empty state's button |
| `list.foot` | Your launcher widgets show these apps in this order. Each widget’s script picks which ones to show. | list footer |
| `list.full` | A launcher shows up to 16 apps. Delete one to add another. | list footer at 16 apps; Add App disabled |
| `list.empty.t` | No Apps Yet | empty state title |
| `list.empty.b` | Add the apps your launcher widgets open. Choose one from a list, paste its link, or use a Shortcut. | empty state body |
| `row.app` | App · {name} | row subtitle when the link is a list entry's |
| `row.link` | Link · {where} | row subtitle for a pasted link: host and path for web links, else the link, middle-truncated |
| `row.shortcut` | Shortcut · {name} | row subtitle for shortcuts://run-shortcut?name= |
| `row.empty` | No link yet. Tap to choose one. | row subtitle, warning colour: saved with no url |
| `row.refused` | PyWidget doesn’t open this link. Tap to change it. | row subtitle, warning colour: url fails LauncherTarget.check |
| `ax.row.hint` | Opens this app’s settings. | VoiceOver hint on each list row |
| `ed.add` | Add App | sheet title, new slot |
| `ed.edit` | Edit App | sheet title, saved slot |
| `ed.setup` | Set Up App | sheet title from a widget tap (LauncherSetUpSheet today) |
| `ed.name` | Name | field label |
| `ed.name.ph` | Shown on your widget | Name placeholder |
| `ed.opens` | Opens | section header above the segmented control |
| `ed.seg.app` | App | segment 1: choose from the list |
| `ed.seg.link` | Link | segment 2: paste a link |
| `ed.seg.shortcut` | Shortcut | segment 3: run a Shortcut |
| `ed.choose` | Choose an App | row in App, before one is chosen; the list screen's title |
| `ed.app.foot` | Apps PyWidget knows how to open, when they’re on this iPhone. | App footer |
| `ed.link.ph` | music:// or https://… | Link placeholder (LauncherSetUpSheet's today) |
| `ed.link.foot` | An app’s own link, a web address, or a link copied from an app’s Share menu. | Link footer |
| `ed.sc.ph` | Name, exactly as in Shortcuts | Shortcut field placeholder |
| `ed.sc.foot` | Runs the shortcut in the Shortcuts app. Its Open App action can open any app, even one with no link. | Shortcut footer |
| `ed.sc.open` | Open Shortcuts | row under the Shortcut field: opens shortcuts:// so the person can make one |
| `ed.try` | Try It | row: opens the checked link now, leaving PyWidget |
| `ax.try.hint` | Leaves PyWidget and opens the link, to check that it works. | VoiceOver hint on Try It |
| `ed.look` | On the Widget | section header |
| `ed.symbol` | Symbol | row; pushes the symbol grid |
| `ed.colour` | Colour | row label above the twelve swatches |
| `ax.swatch` | {colour} | VoiceOver label per swatch (Red, Green ...); the chosen one adds the Selected trait |
| `ed.script` | In Scripts | section header |
| `ed.copy` | Copy | button beside the script name |
| `ed.script.foot` | Your launcher’s script uses this name for this app. It stays the same if you rename the app. | In Scripts footer |
| `ed.delete` | Delete App | button at the foot, Edit App and Set Up App of a saved slot only; also the dialog's button |
| `del.t` | Delete “{name}”? | confirmation dialog title |
| `del.b` | Widgets that show it will ask you to set it up again. | confirmation dialog message |
| `cancel` | Cancel | sheet and dialog |
| `discard` | Discard Changes | dialog button: Cancel (or a swipe down) on a sheet with changes; destructive |
| `keep` | Keep Editing | dialog's cancel button, beside Discard Changes |
| `list.unreadable` | PyWidget couldn’t read your saved apps. Nothing has been changed. | list, in place of the rows, when slots.json exists but can't be read; Add App off |
| `save` | Save | sheet |
| `pick.search` | Search | search field on Choose an App |
| `pick.head` | On This iPhone | section header on Choose an App |
| `pick.foot` | PyWidget can’t see every app on your iPhone. If yours isn’t here, paste its link or use a Shortcut. | Choose an App footer |
| `pick.none` | None of the apps PyWidget knows are on this iPhone. Paste a link or use a Shortcut instead. | Choose an App, no matches |
| `sym.title` | Symbol | symbol grid title |
| `bad.scheme` | Add the start of the link, like https:// or music://. | no scheme, or a scheme that isn't one |
| `bad.space` | A link can’t have spaces or line breaks inside it. Check it and paste it again. | space, control character, DEL, C1 or backslash |
| `bad.long` | This link is too long to save. | over 2048 bytes |
| `bad.self` | This link would open PyWidget again. Use the other app’s link. | pywidget: |
| `bad.settings` | PyWidget can’t open pages of the Settings app from a widget. | app-prefs:, prefs: |
| `bad.kind` | PyWidget doesn’t open {scheme}: links. Use an app’s link, a web address, or a Shortcut. | javascript, vbscript, file, data, blob, about |
| `bad.host` | This web address has no site in it. Check the part after {scheme}://. | http(s) with no host |
| `bad.any` | That link can’t be opened from a widget. Use an app’s link, a web address, or a Shortcut’s link. | fallback (today's string) |
| `bad.tryfail` | No app opened this link. The app may not be on this iPhone, or the link may be wrong. | after Try It, openURL reported false |
| `bad.write` | PyWidget couldn’t save this app. Try again. | writeFailed (today's string, 'link' -> 'app') |
| `bad.unreadable` | PyWidget couldn’t read your saved apps, so it saved nothing. Your apps are unchanged. | unreadableFile |
| `bad.nogroup` | PyWidget can’t save apps on this device. | no App Group (today's string) |
| `why.unknown` | “{name}” isn’t set up in PyWidget yet. Choose the app it opens. | Set Up App banner, .unknown |
| `why.empty` | “{name}” has no link yet. Choose the app it opens. | banner, .empty |
| `why.refused` | PyWidget doesn’t open links like the one saved for “{name}”. Choose a different one. | banner, .refused |
| `why.didNotOpen` | No app opened the link saved for “{name}”. The app may have been removed, or its link may have changed. Choose it again. | banner, .didNotOpen |

</div>
{% endraw %}

</div>
