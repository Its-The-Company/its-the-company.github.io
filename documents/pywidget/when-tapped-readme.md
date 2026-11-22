---
layout: "default"
title: "When tapped: the widget action setting (ADR-011 step 7, T-4555)"
section: "documents"
description: "Drawn by code: draw_when_tapped.py writes the eight PNGs and qa.json (HTML/CSS/SVG coloured from ../tokens.json, rasterised by headless Chromium; helpers and QA from ../ide/draw_ide.py, the Set Up App sheet from\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/when-tapped-readme.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/design/when-tapped/README.md</code></span></div><h1>When tapped: the widget action setting (ADR-011 step 7, T-4555)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-16. Frames for ADR-011 section 9 (the setting), section 8 (fallback notices) and section 5a (the Set Up App sheet for a stored `app` action), as accepted at 137c133087. Build spec for Idris's step 8. Drawn inside the approved look (`creative/approved.md` item 2): A Paper is the light appearance, B Studio the dark, one frame per screen in each. **Every string is DRAFT** (no copy guide is approved, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>). Nothing here changes the name, icon, visual direction or voice.

Drawn by code: `draw_when_tapped.py` writes the eight PNGs and `qa.json` (HTML/CSS/SVG coloured from `../tokens.json`, rasterised by headless Chromium; helpers and QA from `../ide/draw_ide.py`, the Set Up App sheet from `../launcher/draw_editor.py`). No image model, no copied asset (C6). Glyphs are drawn stand-ins for SF Symbols. Project, widget, function and app names are invented placeholders; `example.com` is the reserved example domain.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:631px" markdown="1">

| Sheet | Frames | What |
|---|---|---|
| `{A,B}-when-tapped-setting.png` | 1-13, 35 | the widget's settings, the picker, each second choice and its empty state |
| `{A,B}-when-tapped-link.png` | 14-19 | the link field, its three errors, the saved row |
| `{A,B}-when-tapped-notices.png` | 20-27 | notices N1-N6; Set Up App's two reasons |
| `{A,B}-when-tapped-access.png` | 28-34 | VoiceOver order and labels; AX3 |

</div>


QA (`qa.json`, re-run 2026-11-17 after Pernille's review, T-4765): 70 frames, 0 clipped, 0 truncated, 0 overlapping, 0 under 11 pt, 0 contrast fails; lowest text contrast 5.72:1 (A) and 5.6:1 (B). Every sheet is under 300 KB (largest 298,159 B, `A-when-tapped-access`).

## 1. The widget's settings (frames 1, 2, 19, 30)

Pushed from the project page: Projects › project › Outputs › the widget's row. Inline title is the output's name. A caption line ("Widget · views/today.py") sits above the groups.
- **When tapped**: one row, title left, the current choice right in `text.secondary`, chevron. Choice words: "Opens its Page", "Opens {Page name}", "Opens its code", "Opens Projects", "Opens {host}", "Opens {app}", "Runs {function}". With nothing stored the row shows the default's words.
- **A stored `app` action whose slot is gone**: the choice reads "App not set up" in `status.warning` with the warning glyph (frame 2). Colour never alone: the words carry it.
- **Buttons**: header, then one row per button **name**, in depth-first draw order, titled by the first drawn instance's text (the name, in its own words, when it has none: "help", "check"). Sub-lines in footnote, one each, in this priority: "Not in the widget" (`text.tertiary`; a stored action for a name the tree no longer draws, still tappable), "{n} buttons" (a name drawn more than once), "Not shown in {family}: {<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>} buttons at most" (the smallest family whose cap drops it). No Buttons section when the tree draws none. Toggles and Refresh are never listed.
- Rows are 44 pt at least; separators are hairlines inside the card, so the card's fill carries the grouping (design-system s2.2).

## 2. The picker (frames 3-7, 31)

Pushed, titled "When tapped" (a button's picker is titled by its row title). Four inset groups, so each footer sits under its own choices:
1. The default row alone: "Default: opens its Page" (premade) or "Default: opens its code" (script widget). A button's default names the script's own action ("Default: runs check", "Default: opens example.com").
2. Open its Page (hidden when the project has no Page, frame 6), Open its code, Open Projects.
3. Open a web page, Open an app (hidden until the launcher path ships, frame 4). Footer: "PyWidget opens first, then the page or app."
4. Run a function. Footer, the tap's picker: "A tap on the widget opens PyWidget to run it. To run it without opening PyWidget, use a button." A button's picker: "Runs in the widget when it can. If it can't, PyWidget opens to run it." (new words; section 4's behaviour).

One checkmark, in a **leading** 22 pt column, so a chosen row can still show its chevron and its second choice ("Run a function … add_glass"). Rows that need a second choice (Page, code, web page, app, function) push; Default and Open Projects apply on tap. A button name drawn more than once gets the line "Applies to all 5 buttons named check" above the list (frame 7).

A choice applies when the row (or the pushed list's row) is chosen and the person goes back; no Done. The Web page screen is the one exception: Save.

## 3. Second choices (frames 8-13, 32)

- **Run a function**: the widget's own declared functions, in monospace, one check. Footer "From @widget.action in this widget's script." Empty: "This widget has no functions yet. Add one with @widget.action in its script." (frame 9).
- **Open an app**: saved slots with their tile (30 pt, hidden at AX sizes) and name; a sub-line says where else the slot is used ("Also in 2 launcher widgets and 1 script"). Then "Add an app" in its own group, which opens the launcher editor's Add App. Empty: only "Add an app" (frame 11).
- **Open its Page**: the project's Pages. **Open its code**: the project's `.py` files, the widget's own file first with "The file this widget runs"; long paths truncate in the **middle**, one line, at every size (frames 13, 32).

## 4. The Web page field (frames 14-19, 33)

Pushed from "Open a web page"; back, title "Web page", **Save** trailing, disabled (`text.tertiary`) until the field passes section 5's check. One field, monospace once it has text, clear button, keyboard `.URL`, no autocorrect, no capitals, submit label Done. Placeholder "example.com".
- Typed without a scheme: a line under the field, "Saves as https://example.com/train-times" (new words); Save on (frame 15).
- Errors under the field, one at a time, in `status.danger` with the warning glyph, the field's edge in `status.danger`: "Links start with https://." (frame 16), "This isn't a web address." (17), "This link is too long (2,048 characters at most)." (18). Each is posted to VoiceOver when it appears.
- When an error shows: the scheme error as soon as the text before `://` is complete and is not `https` (never while the text is still a prefix of `https://`); the bad-character error at once; the no-host error when editing ends or Save is tapped. Save stays off while any error stands.
- Back without Save keeps the previous choice. After Save the row reads the host only: "Opens example.com" (frame 19).

## 5. Fallback notices (frames 20-25, 34)

One notice above the screen that opened, pinned under the navigation bar, 12 pt from the screen edges: `bg.raised`, `line.strong` edge, radius 20, one soft shadow (e3, the popover elevation, in both appearances). Info glyph, the text in subheadline, and:
- **Close**: an X in a 28 pt circle inside a 44 x 44 pt target, VoiceOver label "Close".
- **Change** on N1, N2, N3 only: a secondary pill, 44 pt tall, that opens that widget's settings.
- No timer. It stays until Close or until the person leaves that screen. Posted to VoiceOver as an announcement when it appears. It slides down 220 ms; under Reduce Motion it fades in 120 ms.
- At AX sizes it grows down; nothing truncates; Close keeps its 44 pt target (frame 34).

Which screen is under it: N1 over the premade's default screen; N2-N5 over the script widget's default (its code); N6 over Projects, today's route.

## 6. Set Up App, for a stored `app` action (frames 26, 27)

The launcher's sheet ([`../launcher/editor.md`](editor.html) s4), two reasons changed for a tap that came from a stored action; the launcher's own taps keep theirs:
- `.badLink` (frame 26): the message-only sheet with Done. Reason: "This widget's tap doesn't name a saved app, so there is nothing to open. Choose another app in the widget's settings." Below it a **Change** row in `accent` that opens the widget's settings, as the notices' Change does.
- A removed slot (frame 27): the fill sheet in Set Up mode, the slot id fixed ("music-2"). Reason: "The app this widget opened was removed from your saved apps. Choose the app it opens." (the second sentence is the `.unknown` reason's own).

## 7. VoiceOver (frames 28, 29)

Order is top to bottom, back button first. A row reads as one element, "{title}, {choice}" ("When tapped, Opens its code"); a Buttons row adds its count ("check, Runs check, 5 buttons") or its sub-line. Hint on When tapped and Buttons rows: "Changes what happens when you tap it." The checked picker row has the Selected trait. Footers are read after their group. The tile on an app row and every glyph are hidden from VoiceOver.

## 8. Text size (frames 30-34)

Dynamic Type to AX5. From AX1 up (`dynamicTypeSize.isAccessibilitySize`, with `ViewThatFits` as a second guard) a row stacks its title above its choice, tiles hide, chevrons **stay** on rows that push (the push-or-apply cue; Idris's F11), and nothing truncates except file paths (middle, one line; VoiceOver reads the full path).

## 9. Choices made here, beyond the ADR's words

- The app's name is written **PyWidget**, as the app shows it (`CFBundleDisplayName` and every shipped string); the ADR's lower-case spelling in s8 and s9 is prose.
- 25 strings are new words, not the ADR's: the rows whose Source is `new, DRAFT` in the table below are the list. `l.app.used` ("Also in {where}") is one of them: the ADR gives the behaviour (s5a), not these words.
- Back labels too long for the bar read "Back", as iOS shortens them.

## Idris's build notes answered (2026-11-16)

Two independent reads by Idris, neither shown this README's reasoning: **F** (read of the frames and this README) and **E** (an earlier read of the frames and the ADR only, which also came back). No BLOCKER in either. Frames changed for the notes: 4 (footer), 27 (symbol), 29 (hint and field label), 30-34 (chevrons stay), and a new **35** (a stored function that is gone). Everything else is answered in words here.

**F1, E4 (pushed rows; what is stored).** Pushing a second list changes nothing; only choosing a row in it applies, and Back without a choice keeps the old one. Choosing the file the widget runs stores `{"do": "code"}` with no `file` (so it follows the widget if its file changes) and reads "Opens its code"; any other file stores `file` and reads "Opens {last path part}" (new `c.code.n`). A Page always stores its id ("Opens Log"), except a premade's own settings Page, stored with none.
**F2 (Save and the no-host error).** One rule: Save is on exactly when the field passes s5's check. Errors show at once, except the no-host one, which waits for editing to end. So Save is off with no reason shown only while the field is empty or still a prefix of `https://`. `exam` is a valid single-label host, so Save is on.
**F3, E14, E11 (unit, case, schemes).** The cap counts the stored form (after `https://` is added and the host is in `xn--` form), which is ASCII, so bytes and characters are the same and the words stay "characters". Scheme and host are lower-cased silently on save; `HTTPS://` is accepted. Text with `://` takes its scheme from before it. Without `://`, `name:` followed by anything but digits is a scheme (`tel:x`, `mailto:x` give "Links start with https://."), and `localhost:3000` is a host with a port. The Return key is labelled Done: it saves when Save is on, otherwise it ends editing and shows the error.
**F4 (newlines).** Pasted text is trimmed at both ends. A newline inside it is a bad character ("This isn't a web address."). If a vertical-axis field makes Return insert a newline on the Simulator, use a single-line field that scrolls. Frame 33 draws the field that way (one line, clipped at its edge); frame 18's wrap and "…" are only the drawing's, so the whole long link can be read.
**F5, E12 (IDN shown as typed).** The action keeps no second field (s1 refuses unknown fields), and there is no public decoder. In 1.0 the Web page field shows what the person typed while they are on it; the row shows the stored host, `xn--` form included. This narrows s5's "shown to the person as typed" to the field. Proposed to Idris as an ADR-011 s5 wording change; nothing is decided here.
**F6, E18 (Buttons rows' data; drops).** They are read from the widget's last `tree.json`, across its entries and families (the same read as step 3's defaults). Names are listed in depth-first order of the largest family drawn. Caps grow with size, so a name dropped in Medium is dropped in Small too. The sub-line names each family that drops every instance, smallest first ("Not shown in Small", "Not shown in Small or Medium", new `ws.drop.2`). A family that drops only some instances gives "Not all shown in Small" (new `ws.drop.some`). A premade's caption is "Widget · {premade name}". The detail screen's existing top (preview, families) is T-4476's and is not drawn here; these two parts sit under it.
**F7, E6 (where else an app is used).** The counts are read from the caches the app already has: launcher widgets' slots, other widgets' `actions.json`, and every last tree's `p.open` for script defaults (no source scan). This widget's own place is never counted. Words: "Also in" plus the parts joined by commas and "and", with plural forms in the String Catalog (new `l.app.used.l`, `.s`, `.c`). This is Idris's, app side.
**F8, E6, E7 (Add an app; Change).** Add an app presents the launcher editor's Add App sheet (editor.md frame 5). On Save the new slot is chosen and checked; Cancel changes nothing. Change (on a notice, or in frame 26's sheet) closes the notice or sheet and sets the Projects tab's path to that project, then that widget's settings, replacing the path that was there. The editor saves on leaving as it does today; if it does not, that is a QUESTION back to Idris before step 8. In frame 27 Save writes the slot under its fixed id, `music-2` (editor.md s7, Set Up App for `.unknown`), so the stored action works again.
**F9, E8, E9 (notice: overlay or inset).** It is an overlay: pinned under the navigation bar (or the status bar on a large-title screen, frame 25), over the content, which does not move. Height is capped at 50% of the screen; past that its text scrolls inside it, and Close and Change stay visible. The notice belongs to the destination view and closes when that view disappears (pop, push or tab switch). Posting the announcement after the screen change settles is accepted; checking the speech on a device belongs to step 3's "seen".
**F10 (hint on Buttons rows).** The README was right; frame 29 now gives the hint on every Buttons row, the "drawn 5 times" rows included (T-4765).
**F11, E15 (chevrons at AX; custom rows).** Custom rows (a Button plus path navigation and a drawn chevron) are accepted. Chevrons now stay at AX sizes on rows that push (frames 30-31 redrawn, s8 updated). The checkmark scales with `@ScaledMetric`.
**F12 (testing VoiceOver).** Agreed: test labels, hints and traits; the speech order is the system's.
**F13 (PyWidget; the s5a sentence).** Kept as written (s9 above).
**F14 (ghost text in frame 27, dark).** It is the Projects screen behind, seen through B's glass sheet in the drawing. Do not copy it; the system sheet draws its own material.
**E1 (premade: code and functions).** Premades are projects in phase C (ADR-011 s10), so "Open its code" stays. "Run a function" is hidden for a premade that declares none; frame 9's empty state is only for a person's script widget, where it teaches.
**E2 (a stored item that is gone).** It is kept first in its list, checked, with a warning line ("Not in this widget's script"; "Not in this project" for a Page or file) until another is chosen (new frame 35, new `l.stale.*`). The settings row keeps its words.
**E3 (where the functions come from).** From the widget's last render's `actions`, the same source N2 uses. A widget that has never rendered shows "PyWidget lists this widget's functions after it is drawn once. Run it, or place it on your Home Screen." (new `l.run.wait`; not drawn). If Pernille's runtime can list declarations without a render, that replaces it; that is her call.
**E5 (footer with Open an app hidden).** Fixed in frame 4: "PyWidget opens first, then the page."
**E10.** Same as F9. **E13.** Taken: the field's label is "Web address" (new `f.ax`, frame 29). **E16.** Same as F11. **E17.** The frames use SF Pro read from the system fonts; the line breaks will differ a little in the app. Back labels are the system's in the build. **E19.** Not drawn here: the import summary (L6, words in ADR s9; it belongs to step 2's import sheet). Reduce Motion is in s5 above. Increase Contrast comes from the asset catalog's high-contrast sets with no code.

## T-4602 findings answered (2026-11-17, T-4765)

Pernille's review of cb989fd1c8 ([`../../reviews/cb989fd1c8-pernille.md`](cb989fd1c8-pernille.html)), PASS with findings. The script was rerun and `qa.json` regenerated; the QA line above is that run's.
- **M1 (frame 30 said chevrons hide).** Fixed: the caption reads "title above choice; chevrons stay on rows that push", matching s8 and F11.
- **M2 (frame 29 against the README).** Fixed, all three: both "drawn 5 times" rows end with the hint "Changes what happens when you tap it."; the picker's list starts "Today, Back button" (it is pushed from the widget's settings, titled Today); the link field's list starts "Back, Back button". `ax.row.n`'s note in the table now says the hint follows it.
- **L1 (13 new strings; `l.app.used`).** Fixed: `l.app.used` is marked new words, and s9 now gives the count from the table, 25 (the 24 Pernille counted plus `l.app.used`), with the table as the list. The QA line's missing full stop is added.
- **L2 (frame 33 wrapped the URL).** Frame 33 is redrawn as one line that scrolls, as F4 says, with the caption "keyboard down; one line that scrolls (F4)". F4's sentence now names frame 33 and keeps frame 18's wrap as the drawing's only.
- **L3 (Idris's reads not recorded).** Idris's to commit, not this task's.
- **Info (`qa.json` bytes).** Seen again: `A-when-tapped-notices` and `A-when-tapped-setting` came back a few bytes different though their frames did not change, and `B-when-tapped-notices` matches Pernille's rerun (292,676 B). Compare the QA fields, not the bytes.

## Strings (DRAFT, C51)

Printed by `python3 draw_when_tapped.py --strings`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Strings (DRAFT, C51), scrolls sideways" style="--tw:884px" markdown="1">

| ID | String | Where | Source |
|---|---|---|---|
| `ws.tapped` | When tapped | row title in the widget's settings; the picker's title | ADR-011, DRAFT |
| `ws.buttons` | Buttons | section header; no section when the tree draws no button | ADR-011, DRAFT |
| `ws.count` | {n} buttons | sub-line on a Buttons row whose name is drawn more than once (H1) | ADR-011, DRAFT |
| `ws.gone` | Not in the widget | sub-line on a Buttons row whose name the tree no longer draws (s8 last paragraph) | ADR-011, DRAFT |
| `ws.drop` | Not shown in {family}: {cap} buttons at most | sub-line on a Buttons row a family's cap drops (s3) | new, DRAFT |
| `ws.drop.2` | Not shown in {family} or {family2} | sub-line when two families drop every instance of the name; Idris's notes E18 | new, DRAFT |
| `ws.drop.some` | Not all shown in {family} | sub-line when a family drops some instances of the name; Idris's notes F6 | new, DRAFT |
| `ws.app.unset` | App not set up | choice text, warning colour, when a stored app action's slot is gone (s5a) | ADR-011, DRAFT |
| `c.page` | Opens its Page | row choice: page with no page id, or the only Page | ADR-011, DRAFT |
| `c.page.n` | Opens {page} | row choice: page naming a Page | new, DRAFT |
| `c.code` | Opens its code | row choice: code with no file (the file the widget runs) | ADR-011, DRAFT |
| `c.code.n` | Opens {file} | row choice: code with a chosen file; its last path part; Idris's notes F1 | new, DRAFT |
| `c.home` | Opens Projects | row choice: home | ADR-011, DRAFT |
| `c.link` | Opens {host} | row choice: link; host only | ADR-011, DRAFT |
| `c.app` | Opens {app} | row choice: app; the slot's name | ADR-011, DRAFT |
| `c.run` | Runs {fn} | row choice: run | ADR-011, DRAFT |
| `p.def.page` | Default: opens its Page | picker's first row, a premade | ADR-011, DRAFT |
| `p.def.code` | Default: opens its code | picker's first row, a person's script widget | ADR-011, DRAFT |
| `p.def.run` | Default: runs {fn} | a button picker's first row when the script's own default runs a function | new, DRAFT |
| `p.def.link` | Default: opens {host} | a button picker's first row when the script's default is ui.Open.link | new, DRAFT |
| `p.page` | Open its Page | choice; hidden when the project has no Page | ADR-011, DRAFT |
| `p.code` | Open its code | choice | ADR-011, DRAFT |
| `p.home` | Open Projects | choice | ADR-011, DRAFT |
| `p.link` | Open a web page | choice | ADR-011, DRAFT |
| `p.app` | Open an app | choice; hidden until the launcher path ships (s5a) | ADR-011, DRAFT |
| `p.run` | Run a function | choice | ADR-011, DRAFT |
| `p.foot.hop` | PyWidget opens first, then the page or app. | footer under Open a web page and Open an app (M4) | ADR-011, DRAFT |
| `p.foot.run` | A tap on the widget opens PyWidget to run it. To run it without opening PyWidget, use a button. | footer under Run a function, the tap's picker (M4) | ADR-011, DRAFT |
| `p.foot.run.btn` | Runs in the widget when it can. If it can’t, PyWidget opens to run it. | footer under Run a function, a button's picker; (s4) | new, DRAFT |
| `p.applies` | Applies to all {n} buttons named {name} | line above a button picker's list when the name is drawn more than once (H1) | ADR-011, DRAFT |
| `l.run.foot` | From @widget.action in this widget’s script. | footer under the function list | new, DRAFT |
| `l.run.none` | This widget has no functions yet. Add one with @widget.action in its script. | function list, empty (M8) | ADR-011, DRAFT |
| `l.run.wait` | PyWidget lists this widget’s functions after it is drawn once. Run it, or place it on your Home Screen. | function list when the widget has never rendered; Idris's notes E3 | new, DRAFT |
| `l.stale.run` | Not in this widget’s script | sub-line, warning colour, on a stored function the last render no longer declares (N2); Idris's notes E2 | new, DRAFT |
| `l.stale.page` | Not in this project | sub-line, warning colour, on a stored Page that is gone (N1) | new, DRAFT |
| `l.stale.file` | Not in this project | sub-line, warning colour, on a stored file that is gone (N6) | new, DRAFT |
| `l.app.add` | Add an app | row under the saved apps; opens the launcher editor's Add App | ADR-011, DRAFT |
| `l.app.used` | Also in {where} | sub-line on a saved app row: where else the slot is used (s5a); {where} joins the parts below with commas and 'and', this widget's own place not counted; the ADR gives the behaviour (s5a), not the words | new, DRAFT |
| `l.app.used.l` | {n} launcher widgets | part of {where}; plural forms in the String Catalog ('1 launcher widget') | new, DRAFT |
| `l.app.used.s` | {n} widget settings | part of {where}: other stored app actions; plural forms | new, DRAFT |
| `l.app.used.c` | {n} scripts | part of {where}: scripts whose ui.Open.app default names the slot; plural forms | new, DRAFT |
| `l.app.foot` | Your saved apps are shared with your launcher widgets. | footer under the app list | new, DRAFT |
| `l.page.foot` | Pages in this project. | footer under the Page list | new, DRAFT |
| `l.code.this` | The file this widget runs | sub-line on the widget's own file in the Code list | new, DRAFT |
| `f.title` | Web page | the link screen's title | new, DRAFT |
| `f.save` | Save | trailing nav button; disabled until the field passes s5 | ADR-011, DRAFT |
| `f.ph` | example.com | placeholder | ADR-011, DRAFT |
| `f.will` | Saves as {url} | line under the field when https:// will be added | new, DRAFT |
| `f.e.scheme` | Links start with https://. | error: any other scheme, http included (M6) | ADR-011, DRAFT |
| `f.e.web` | This isn’t a web address. | error: no host, or bad characters (M6) | ADR-011, DRAFT |
| `f.e.long` | This link is too long (2,048 characters at most). | error: over 2,048 bytes (M6) | ADR-011, DRAFT |
| `f.ax` | Web address | the field's VoiceOver label; Idris's notes E13 | new, DRAFT |
| `f.foot` | PyWidget opens first, then the page. | footer under the field; the picker footer's words for one case | new, DRAFT |
| `n.close` | Close | the notice's X, VoiceOver label | ADR-011, DRAFT |
| `n.change` | Change | the notice's button on N1 to N3; opens the widget's settings | ADR-011, DRAFT |
| `n1` | The Page this widget opens was removed, so PyWidget opened its usual screen instead. Choose what it opens in the widget’s settings. | N1 | ADR-011, DRAFT |
| `n2` | Nothing ran: “{fn}” isn’t in this widget’s script any more. Choose another in the widget’s settings. | N2 | ADR-011, DRAFT |
| `n3` | PyWidget can’t open the link saved for this widget. Set a new one in the widget’s settings. | N3 | ADR-011, DRAFT |
| `n4` | Nothing ran: this widget changed since it was last drawn. It’s up to date now, so tap it again. | N4 | ADR-011, DRAFT |
| `n5` | Nothing ran: this link didn’t come from one of your widgets. | N5 | ADR-011, DRAFT |
| `n6` | “{file}” isn’t in the project any more, so PyWidget opened Projects. | N6, only when the person chose the file | ADR-011, DRAFT |
| `su.badlink` | This widget’s tap doesn’t name a saved app, so there is nothing to open. Choose another app in the widget’s settings. | LauncherSlotSheet.why .badLink for a stored app action; the launcher's own taps keep theirs | ADR-011, DRAFT |
| `su.removed` | The app this widget opened was removed from your saved apps. Choose the app it opens. | why .unknown for a stored app action whose slot is gone; second sentence added, the .unknown reason's own | ADR-011, DRAFT |
| `su.done` | Done | the message-only sheet's trailing button (today's) | ADR-011, DRAFT |
| `ax.row` | {title}, {choice} | label of a row in the widget's settings | ADR-011, DRAFT |
| `ax.row.n` | {title}, {choice}, {n} buttons | label of a Buttons row drawn more than once; ax.hint.row follows it, as on every Buttons row | ADR-011, DRAFT |
| `ax.hint.row` | Changes what happens when you tap it. | hint on the When tapped row and every Buttons row | new, DRAFT |
| `ax.sel` | Selected | trait on the checked picker row (read by iOS) | ADR-011, DRAFT |

</div>
{% endraw %}

</div>
