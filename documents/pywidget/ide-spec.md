---
layout: "default"
title: "C5 IDE screens: build spec"
section: "documents"
description: "Direction. Layout, spacing, the type scale, radii, motion and every state are the token set A and B share, and they are what this spec fixes. Only colour, the display face (New York in A, SF Pro Rounded in B), the Run\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/ide-spec.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/design/ide/spec.md</code></span></div><h1>C5 IDE screens: build spec</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-25. Status: **proposal** (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). Nothing here is approved. Build structure and behaviour from this file; keep colours on system placeholders until the Investors pick a direction.

Source of every picture: `draw_ide.py` in this folder (HTML/CSS/SVG rendered by headless Chromium, colours from `../tokens.json`, no generative model). `python3 pywidget/docs/design/ide/draw_ide.py` redraws all sheets and `qa.json`.

## 0. What is drawn, and in which direction


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What is drawn, and in which direction, scrolls sideways" style="--tw:674px" markdown="1">

| Screen | iPhone sheet (390 pt) | iPad sheet (1180 × 820 pt) |
|---|---|---|
| 1 Project list | `A-projects-phone.png` | `A-projects-ipad.png` |
| 2 Editor and key row | `A-editor-phone.png` | `A-editor-ipad.png` |
| 3 Console and run states | `A-console-phone.png` | `A-console-ipad.png` |
| 4 Traceback | `A-traceback-phone.png` | `A-traceback-ipad.png` |
| 5 Native prompts | `A-prompts-phone.png` | `A-prompts-ipad.png` |
| 6 First-run tour | `A-tour-phone.png` | `A-tour-ipad.png` |
| 7 Pro | `A-pro-phone.png` | `A-pro-ipad.png` |
| 8 iPad sidebar and split | `A-ipad-phone.png` (phone equivalents) | `A-ipad-ipad.png` |

</div>


**Direction.** Layout, spacing, the type scale, radii, motion and every state are the token set A and B share, and they are what this spec fixes. Only colour, the display face (New York in A, SF Pro Rounded in B), the Run and primary fill (solid in A, gradient in B) and B's glass panels differ, and the same functions draw both. Committed: all 16 sheets in A (recommended in design-system-v0 s9) and the 8 iPhone sheets in B (`B-*-phone.png`). B's iPad sheets: `draw_ide.py --dir B`. Committing them would add about 5 MB of pictures that show nothing new.

**Appearances and sizes.** Every iPhone sheet has light and dark frames at the default Dynamic Type size (Large) and one frame at **AX3**. iPad sheets show light and dark at Large; the iPad AX3 frame is on sheet 8 (portrait).

## 1. QA (scripted, `qa.json`)

24 sheets, 98 frames. In every frame: 0 clipped text, 0 truncated text, 0 text over text, 0 text under 11 pt, 0 contrast fails. Contrast is computed per text node against its composited background: 4,611 nodes checked, lowest 4.62:1 (iPad editor). Another 35 sit on a gradient or glass and are skipped; their pairs are checked by hand from tokens: onAccent on accent.2 is 5.18 (B light) and 9.09 (B dark). onAccent on status.danger, used by the Stop pill, is 6.12 to 7.95, and on status.success 5.79 to 9.95. `check_tokens.py`: 336 pairs, 0 fails. The largest PNG is 976 KB. Sheets over 1 MB are redrawn at a lower scale (the scale is in `qa.json`).

Exempt by design: content behind a modal (`data-inactive`), disabled buttons, and content scrolling under floating chrome (tab bar, New button, run-status bar, HUD). Floating chrome needs a matching bottom `contentInset` so the last line can scroll clear.

## 2. Shared numbers

- Margins 16 (iPhone), 20 (iPad). Spacing steps 4, 8, 12, 16, 20, 24, 32. Rows at least 44 tall. Every hit target 44 × 44, even where the drawn control is smaller (Run pill 34, key 40 × 36, Stop chip 28).
- Radii: keys 10, cards 14, banners and strips 12, menus and floating bars 20 to 24 (pill), sheets 28 top corners, alerts 28.
- Type: the scale in tokens.json. AX3 values used in the frames are Apple's table as I recall it (body 40, headline 40, subheadline 36, footnote 33, caption 32, largeTitle 52). **Idris: confirm them in the Simulator** and correct `TYPE` in draw_ide.py if they differ.
- Clamps: editor code 32 pt, console code 32 pt, gutter 17 pt, key glyphs 22 pt. Nav bar titles, the tab bar and the keyboard do not scale; they use the system Large Content Viewer.
- AX1 and up: rows stack (`ViewThatFits`, or `dynamicTypeSize.isAccessibilitySize`), segmented filters become a menu button, file tabs become one file menu, editor soft-wraps with a hanging indent of the line's indent + 2 characters, and floating buttons drop their text label (icon only, label kept for VoiceOver).
- Tabular figures on every changing number: run times, elapsed, counts, line and column.

## 3. Components


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Components, scrolls sideways" style="--tw:624px" markdown="1">

| Component | Spec |
|---|---|
| Run pill | 34 tall, padding 11/14, `play` 15 + "Run" 15 semibold, `accent` fill (B: gradient). Running: morphs to Stop (`status.danger`, square icon, elapsed `m:ss`), standard 220 ms; Reduce Motion: crossfade 120 ms. ⌘R / ⌘. on iPad. |
| Status strip | min 36, radius 12, `bg.sunken`; icon 16 + word (semibold, state colour) + detail (secondary). Wraps at AX sizes. Six states in s4. |
| Run-status bar (editor, keyboard hidden) | Floating, 48 min, pill, 12 from the sides, 30 from the bottom. Same icon/word/detail as the strip, line and column on the right (hidden at AX), console button. Tap opens the console sheet. |
| Key row | `inputAccessoryView`, 44 tall, `key.bgAlt`. iPhone: Indent (46 wide) · scroller ( ) : = " [ ] { } # _ . , ' + - * / < > ! · Undo · Hide keyboard. Keys 40 × 36, gap 6. A 28-pt fade marks the scroller's edge. Long-press shows alternates above the key (`"` → `"` `'` `"""` `f"`; `(` → `()`; `[` → `[]`), slide to pick. iPad software keyboard: the full set without scrolling plus ← →. Hardware keyboard: no key row. |
| Completion | Popover under the caret, 282 wide, rows 32, selected row `accent.soft`, a one-line doc at the foot. Appears in 120 ms with no scale; never animates while typing. |
| Lint label | At the line's right: `F401 unused` in caption, warning colour on a 12 % warning tint. At AX: a lens line under the code line. Gutter number turns warning colour and bold. |
| Error lens | Under the failing line: 3 pt left rule `sx.error`, 9 % error tint, `xcircle` + "Type: message" (footnote semibold), then "Raised in …() · run N · Traceback" (caption; Traceback is a link). The line itself takes a 9 % error band. |
| Console sheet (iPhone) | Sheet with detents medium (code stays visible while running) and large (reading). Header: "Console", Clear, ⋯ (Runs log, Restart, Copy all). Strip. Output scroll. REPL bar pinned at the bottom. |
| REPL bar | 48 min, pill, `>>>` in accent mono. When `input()` waits it becomes the input field: accent 1.5 border, an `input()` chip, the text, and a send button (accent circle). Return also sends. |
| Output blocks | Run separator (caption, hairlines: "run 14 · 9:40"); stdout in console mono; tables and plots in cards (radius 14) with a caption label above ("console.table · 3 rows"). VoiceOver summaries as design-system-v0 s6. |
| Traceback card | Exception type (headline, danger) and message (body). "Your code · innermost first": one row per user frame (function, file and line, the code line highlighted); the frame nearest the error carries a "Start here" tag and a 8 % danger tint. Library frames fold into one row ("1 frame in the standard library (mean, statistics.py)"), which expands on tap. Actions: Go to line N (primary), Copy, Share. Structured / Raw switch: raw is exactly what CPython printed, selectable, with bundle paths shortened to `‹stdlib›/` and user paths made project-relative. |
| HUD | Floating capsule under the status bar, never blocks input. Progress: spinner + text + 4 pt bar. Done: tick + text, dismisses after 1.5 s (Reduce Motion: no slide). |
| Prompts | System components with our tint: `.alert` (destructive button in danger), alerts with a text or number field (keyboard type matches: `.decimalPad` for decimals), `.confirmationDialog` for 2 to 6 choices, a sheet with `Form` (Cancel / Done) for forms, and a searchable `List` sheet for long or multiple picks. At AX sizes the system stacks alert buttons. iPad: forms and lists as centred form sheets (540 wide), alerts centred. The calls under each frame are illustrations; the `pywidget.ui` API is Idris's. |

</div>


## 4. Run states


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. Run states, scrolls sideways" style="--tw:894px" markdown="1">

| State | Icon | Colour | Word | Detail |
|---|---|---|---|---|
| idle | ring | text.secondary | Not run yet | Run or ⌘R |
| running | dot (static under Reduce Motion) | accent | Running | elapsed · file; Stop chip on the right |
| waiting | keyboard | accent | Waiting for input | input() on line N |
| finished | check circle | status.success | Finished | duration · run N |
| failed | x circle | status.danger | Failed | ExceptionType · line N (tap: traceback) |
| stopped | square | text.secondary | Stopped | duration · KeyboardInterrupt, line N |

</div>


Runs log (⋯ → Runs): one row per run with the same icon and word, run number and duration, kept 14 days.

## 5. Screen notes

1. **Projects.** Large title (display face), search, filter (All, Scripts, Widgets, Shortcuts), Pinned and Recent cards. Rows show a type tile (38, radius 10), name, one line of detail, and badges. iCloud: a not-downloaded row shows a download glyph and downloads on open. A conflict banner ("2 versions of util.py … Nothing was overwritten. Review") sits above the lists. The New button opens a menu: New script, New widget, New folder, Open a folder…, Import .py or .zip…, Start from an example. Empty state: three actions, no illustration.
2. **Editor.** Nav: back, project name, Run, ⋯. File tabs as chips, 30 tall. Gutter right-aligned, current line `sx.currentLine`. Find and replace is the system find interaction: every match on `sx.selection`, the current match outlined in accent, "2 of 4".
3. **Console.** Running opens the sheet at medium and streams output. Reading uses the large detent. `input()` raises the keyboard under the REPL bar.
4. **Traceback.** The screens show a real traceback. Host CPython 3.9.6 ran the sample at draw time; 3.15 adds `^` markers under the failing expression, which the raw view must keep. "Go to line" opens the editor with the error lens.
5. **Prompts.** As s3.
6. **Tour.** Four pages, with Skip on pages 1 to 3. 1: Python on this iPhone (a two-line script, its run and output). 2: your script can ask (a native prompt). 3: the live edit of the free countdown premade. Changing the date redraws the preview as the user types (PROPOSAL-002 s1.3). 4: how to add a widget (iOS adds widgets from the Home Screen; three steps), then "Start writing" or "Open an example". At AX sizes the visual hides and the text and button grow. Shown once; available later in Settings. iPad: a centred page sheet, 560 × 700.
7. **Pro.** One non-consumable. The rows come from the flag file, one row per enabled entitlement: `premades`, `themes`, `packages` (PROPOSAL-001 option 3 shows all three; option 2 shows only premades plus the grid of the 9). A row appears only if its feature ships in that build; nothing "coming soon". An "Always free" box lists what is never gated. Under the button: "One-time purchase through the App Store." Restore purchase, Terms and Privacy links. Close is always visible. The price comes from `product.displayPrice`; `[price]` in the frames is a placeholder, and the price is the Investors' call. At AX sizes the body scrolls and the button and its line stay pinned. States (button + one line): loading, ready, buying, pending (Ask to Buy), failed, offline, restored, none found. Purchased screen: "Pro is active", Open the Gallery, Done. No timers, counts or urgency wording (Commandment 6).
8. **iPad.** `NavigationSplitView`: a floating sidebar (290) with Library, the project tree and Locations; the editor; and a resizable right pane (340 to 430) holding the console or the widget preview (family and mode switches, entry stepper, network-off switch; no "Send to Home Screen": iOS gives an app no way to place a widget, the person adds it from the Home Screen). Divider: 9 wide with a 4 × 44 handle; double-tap resets. The sidebar collapses with ⌃⌘S. Holding ⌘ shows the shortcut list (two columns). Portrait: the console becomes a bottom split. On iPhone the sidebar is the Projects tab and the right pane is the console sheet.

   *Note, 2026-10-26 01:25 ET (Maren, T-0119, from PROPOSAL-003 "Found on the way" 1-2).* "Send to Home Screen" is gone from the preview pane. Sample rows: "Weather card" is now `trip_countdown` (weather is a Shortcut recipe, not a v1 widget: ADR-001 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>, no MET Norway) and "Clean clipboard" reads "Run Script with Input" (a v1 App Intent), not "Share sheet action" (a share extension is 1.1). Changed in `draw_ide.py`; the four affected sheets (A-projects and A-ipad, phone and iPad) are redrawn on design-previews `ide/` (67c22ebc), QA 0 issues. The PNGs in this folder still show the old rows until the IDE screens are redrawn in the approved look.

## 6. Open

- AX3 sizes are recalled, not read from Apple (developer.apple.com is person-read only); Simulator check by Idris.
- iOS 26 alert, sheet and tab bar shapes are drawn as I understand them; the system draws the real ones and wins.
- Copy uses the working name "pywidget"; the name is the Investors' call.
- Direction A or B: the Investors' pick (C51). Nothing here ships until it is approved.
{% endraw %}

</div>
