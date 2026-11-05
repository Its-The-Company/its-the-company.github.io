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


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What is drawn, and in which direction, scrolls sideways" style="--tw:960px" markdown="1">

| Screen | iPhone sheet (390 pt) | iPad sheet (1180 × 820 pt) |
|---|---|---|
| 1 Project list | `A-projects-phone.png` | `A-projects-ipad.png` |
| 2 Editor and key row | `A-editor-phone.png` | `A-editor-ipad.png` |
| 3 Console and run states | `A-console-phone.png` | `A-console-ipad.png` |
| 4 Traceback | `A-traceback-phone.png` | `A-traceback-ipad.png` |
| 5 Native prompts | `A-prompts-phone.png` | `A-prompts-ipad.png` |
| 6 First-run tour | `A-tour-phone.png` | `A-tour-ipad.png` |
| 7 Pro | `A-pro-phone.png`, `A-proentry-phone.png` (B: `B-pro-phone.png`, `B-proentry-phone.png`) | `A-pro-ipad.png` |
| 8 iPad sidebar and split | `A-ipad-phone.png` (phone equivalents) | `A-ipad-ipad.png` |
| 9 Gallery (s5.9, `draw_gallery.py`) | `A-gallery-phone.png` (B: `B-gallery-phone.png`) | `A-gallery-ipad.png` |
| 10 Settings (s5.10, `draw_settings.py`) | `A-settings-phone.png` (B: `B-settings-phone.png`) | `A-settings-ipad.png` |
| 11 Projects as containers (s5.11, `draw_projects.py`) | `A-parts-phone.png` (B: `B-parts-phone.png`) | `A-parts-ipad.png` (B: `B-parts-ipad.png`) |
| 12 Activity (s5.12, `draw_activity.py`) | `A-activity-phone.png` (B: `B-activity-phone.png`) | `A-activity-ipad.png` (B: `B-activity-ipad.png`) |

</div>


**Direction.** Layout, spacing, the type scale, radii, motion and every state are the token set A and B share, and they are what this spec fixes. Only colour, the display face (New York in A, SF Pro Rounded in B), the Run and primary fill (solid in A, gradient in B) and B's glass panels differ, and the same functions draw both. Committed: all 16 sheets in A (recommended in design-system-v0 s9) and the 8 iPhone sheets in B (`B-*-phone.png`). B's iPad sheets: `draw_ide.py --dir B`. Committing them would add about 5 MB of pictures that show nothing new.

**Appearances and sizes.** Every iPhone sheet has light and dark frames at the default Dynamic Type size (Large) and one frame at **AX3**. iPad sheets show light and dark at Large; the iPad AX3 frame is on sheet 8 (portrait).

## 1. QA (scripted, `qa.json`)

24 sheets, 98 frames. In every frame: 0 clipped text, 0 truncated text, 0 text over text, 0 text under 11 pt, 0 contrast fails. Contrast is computed per text node against its composited background: 4,611 nodes checked, lowest 4.62:1 (iPad editor). Another 35 sit on a gradient or glass and are skipped; their pairs are checked by hand from tokens: onAccent on accent.2 is 5.18 (B light) and 9.09 (B dark). onAccent on status.danger, used by the Stop pill, is 6.12 to 7.95, and on status.success 5.79 to 9.95. `check_tokens.py`: 336 pairs, 0 fails. The largest PNG is 976 KB. Sheets over 1 MB are redrawn at a lower scale (the scale is in `qa.json`). *From 2026-10-26 (T-0333):* every sheet `draw_ide.py` redraws is an 8-bit palette PNG under 300 KB (`tools/png_small.py`; the full-colour screenshot stays in a temp folder), checked to decode in Chromium at its stated size; the Pro sheets are the first (198-300 KB). **Widget card in the sheets (T-0256):** the countdown card on tour pages 3 and 4 and in the iPad preview pane is the renderer's card, not the B accent gradient: paint by the frame's scheme from `tokens-app.json` (light `widget.card.*` solid white with the 1 px sheet hairline; dark 150deg `#5B33E6` to `#1E1450`, no outline), text `widget.onCard.primary`/`.secondary`, display New York 500 light, SF Pro Rounded 600 dark (design-system-v0 s8.4 rows 1-7, 12). Its text on the dark gradient is skipped by the DOM check; by hand on the start stop, the lighter end: primary 6.86:1, secondary 4.77:1.

Exempt by design: content behind a modal (`data-inactive`), disabled buttons, and content scrolling under floating chrome (tab bar, New button, run-status bar, HUD). Floating chrome needs a matching bottom `contentInset` so the last line can scroll clear.

## 2. Shared numbers

- Margins 16 (iPhone), 20 (iPad). Spacing steps 4, 8, 12, 16, 20, 24, 32. Rows at least 44 tall. Every hit target 44 × 44, even where the drawn control is smaller (Run pill 34, key 40 × 36, Stop chip 28).
- Radii: keys 10, cards 14, banners and strips 12, menus and floating bars 20 to 24 (pill), sheets 28 top corners, alerts 28.
- Type: the scale in tokens.json. The AX3 and xxxLarge sizes in the frames are Apple's iOS tables, read on 2026-11-04 07:44 ET (T-1443) from the HIG typography page's Markdown copy, https://developer.apple.com/design/human-interface-guidelines/typography.md, saved as `research/inbound/apple/developer.apple.com/design_human-interface-guidelines_typography.md-ac22ffc4.html` (sections "#### xxxLarge" and "#### AX3"). Size / leading in points:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Shared numbers, scrolls sideways" style="--tw:374px" markdown="1">

  | Style | Large | xxxLarge | AX3 |
  |---|---|---|---|
  | Large Title | 34 / 41 | 40 / 48 | 52 / 61 |
  | Title 1 | 28 / 34 | 34 / 41 | 48 / 57 |
  | Title 2 | 22 / 28 | 28 / 34 | 44 / 52 |
  | Title 3 | 20 / 25 | 26 / 32 | 43 / 51 |
  | Headline, Body | 17 / 22 | 23 / 29 | 40 / 48 |
  | Callout | 16 / 21 | 22 / 28 | 38 / 46 |
  | Subhead | 15 / 20 | 21 / 28 | 36 / 43 |
  | Footnote | 13 / 18 | 19 / 24 | 33 / 40 |
  | Caption 1 | 12 / 16 | 18 / 23 | 32 / 39 |
  | Caption 2 | 11 / 13 | 17 / 22 | 29 / 35 |

</div>


  Against the recalled values (T-1437), AX3 Title 1, 2 and 3 were wrong (43, 39, 37; Apple 48, 44, 43), and eight leadings were 1 to 7 pt off (AX3 Title 1-3, Callout, Caption 1 and 2; xxxLarge Large Title and Subhead). Every other size matched. `TYPE` and `TYPE_XXXL` in draw_ide.py now carry Apple's numbers; code, console code, gutter and key glyphs are ours, derived as before. All sheets were redrawn on 2026-11-04 (main and `--ax`); the scripted QA counts did not change.
- Clamps: editor code 32 pt, console code 32 pt, gutter 17 pt, key glyphs 22 pt. Nav bar titles, the tab bar and the keyboard do not scale; they use the system Large Content Viewer.
- AX1 and up: rows stack (`ViewThatFits`, or `dynamicTypeSize.isAccessibilitySize`), segmented filters become a menu button, file tabs become one file menu, editor soft-wraps flush left (1.0: no hanging indent, vendored Runestone 0.5.2 has none; T-0583 review, Maren 2026-10-28), and floating buttons drop their text label (icon only, label kept for VoiceOver).
- Tabular figures on every changing number: run times, elapsed, counts, line and column.

### 2.1 Dynamic Type per 1.0 screen (T-1437)

Sheets: `ide/A-ax-<screen>-phone.png` (A Paper, light) and `ide/B-ax-<screen>-phone.png` (B Studio, dark), each screen at xxxLarge (no AX layout) and AX3 (AX layout), drawn by `python3 draw_ide.py --ax`; scripted QA in `ide/qa-ax.json`. Sizes are Apple's (s2 table, read 2026-11-04, T-1443). Large Content Viewer (LCV) = the system's long-press magnifier for bars that do not scale.

The projects and Pro rows were read from the sheets by eye; the other seven rows give the s2 rules the code draws plus the scripted QA count, not an eye check of every frame. Ines or Idris: open the sheet before building from a row.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.1 Dynamic Type per 1.0 screen (T-1437), scrolls sideways" style="--tw:1678px" markdown="1">

| Screen | Wraps | Truncates | Stacks (AX1 and up) | Large Content Viewer | QA (xxxL / AX3) |
|---|---|---|---|---|---|
| editor | code soft-wraps flush left; code 20 pt at xxxL, clamps 32 at AX3; gutter 16, then 17 | nothing in the code; file tab names in the tab strip | file tabs become one file menu; run pill drops its label | nav bar, tab bar, key row (keys clamp 22) | 0 / 0 |
| console | output lines wrap; console code 18 pt at xxxL, 31 at AX3 | nothing | header actions drop labels, icon only | nav bar, sheet grabber | 0 / 0 |
| traceback | message and frame lines wrap in full | nothing; the exception name never truncates | Structured / Raw toggle stays two segments | nav bar | 0 / 0 |
| settings | row titles and values wrap | nothing | value moves under the title | nav bar, tab bar | 0 / 0 |
| Pro | headline, row text, the line under the button | nothing; the button wraps to two lines at AX3 and the price stays whole (C6) | links move into the scrolling body at AX3; only the button and its line stay pinned | close button | 1 / 0 in A, 2 / 0 in B: at xxxL the body scrolls under the pinned footer, which is about two-fifths of the screen (B2) |
| projects | names and dates wrap | at xxxL the four-segment filter truncates "Lock S..." (B1) | filter becomes "Showing: All" menu; part tiles go under the date; New drops its label | tab bar | 1 / 0 (the truncation) |
| Activity | reason and time wrap | nothing | filter is a menu; time over reason (layout drawn for AX5 in draw_activity.py) | nav bar | 0 / 0 |
| prompts | alert title and message wrap; form labels wrap | nothing | alert buttons stack at AX3; form rows put the field under its label | sheet nav bar | 0 / 0 |
| tour | title and body wrap | nothing | the visual hides at AX3; text and button grow; Skip stays | none | 0 / 0 |

</div>


Contrast (T-1437, 2026-11-03): `check_tokens.py --themes themes-pro/themes.json` checked 1,936 pairs (app light, dark and both Increase Contrast sets, 205 each; Pro themes Ember, Fern, Graphite, 65 a set), 0 fails; closest app pair line.strong on bg.raised in darkHC at 3.00 (min 3.0). Rendered frames: lowest text contrast 4.80 (A prompts). No token changed, no hue question for the Investors.

Build lines proposed for Idris (Ines places them; not on the board):

- **B1 Projects filter.** Use the "Showing:" menu whenever the four segments do not fit (`ViewThatFits` over the segmented `Picker` and the menu), not only at `isAccessibilitySize`. Check: xxxLarge on a 390 pt phone shows the menu and no "..." segment.
- **B2 Pro footer.** From `.xxxLarge` up, pin only the buy button and its line; Restore, Terms and Privacy move to the end of the scrolling body (as at AX3). Check: at xxxLarge the pinned footer is under a third of the screen and every link is reachable by scroll.
- **B3 Pro button.** The label has no line limit and no scale-down; it wraps. Check: AX3 shows "[price]" whole.
- **B4 Bars.** Nav titles, the tab bar, the key row and the close button keep their size and set `accessibilityShowsLargeContentViewer`. Check: long-press on a tab at AX3 shows the viewer.

## 3. Components


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 3. Components, scrolls sideways" style="--tw:624px" markdown="1">

| Component | Spec |
|---|---|
| Run pill | 34 tall, padding 11/14, `play` 15 + "Run" 15 semibold, `accent` fill (B: gradient). Running: morphs to Stop (`status.danger`, square icon, elapsed `m:ss`), standard 220 ms; Reduce Motion: crossfade 120 ms. ⌘R / ⌘. on iPad. |
| Status strip | min 36, radius 12, `bg.sunken`; icon 16 + word (semibold, state colour) + detail (secondary). Wraps at AX sizes. Six states in s4. |
| Run-status bar (editor, keyboard hidden) | Floating, 48 min, pill, 12 from the sides, 30 from the bottom. Same icon/word/detail as the strip, line and column on the right (hidden at AX), console button. Tap opens the console sheet. |
| Key row | `inputAccessoryView`, 44 tall, bar `key.bgAlt`, keys `key.bg`/`key.text`. iPhone: Indent (46 wide) · scroller ( ) : = " [ ] { } # _ . , ' + - * / < > ! · Undo · Hide keyboard. Keys 40 × 36, gap 6. A 28-pt fade marks the scroller's edge. Long-press shows alternates above the key, slide to pick. iPad software keyboard: the full set without scrolling plus ← →. Hardware keyboard: no key row. Rules in s3.1 (ADR-004 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 4). |
| Completion | Popover under the caret, 282 wide, rows 32, selected row `accent.soft`, a one-line doc at the foot. Appears in 120 ms with no scale; never animates while typing. |
| Lint label | At the line's right: `F401 unused` in caption, warning colour on a 12 % warning tint. At AX: a lens line under the code line. Gutter number turns warning colour and bold. |
| Error lens | Under the failing line: 3 pt left rule `sx.error`, 9 % error tint, `xcircle` + "Type: message" (footnote semibold), then "Raised in …() · run N · Traceback" (caption; Traceback is a link). The line itself takes a 9 % error band. |
| Console sheet (iPhone) | Sheet with detents medium (code stays visible while running) and large (reading). Header: "Console", Clear, ⋯ (Runs log, Restart, Copy all). Strip. Output scroll. REPL bar pinned at the bottom. |
| REPL bar | 48 min, pill, `>>>` in accent mono. When `input()` waits it becomes the input field: accent 1.5 border, an `input()` chip, the text, and a send button (accent circle). Return also sends. |
| Output blocks | Run separator (caption, hairlines: "run 14 · 9:40"); stdout in console mono; tables and plots in cards (radius 14) with a caption label above ("console.table · 3 rows"). VoiceOver summaries as design-system-v0 s6. |
| Traceback card | Exception type (headline, danger) and message (body). "Your code · innermost first": one row per user frame (function, file and line, the code line highlighted); the frame nearest the error carries a "Start here" tag and a 8 % danger tint. Library frames fold into one row ("1 frame in the standard library (mean, statistics.py)"), which expands on tap. Actions: Go to line N (primary), Copy, Share. Structured / Raw switch: raw is exactly what CPython printed, selectable, with bundle paths shortened to `‹stdlib›/` and user paths made project-relative. |
| HUD | Floating capsule under the status bar, never blocks input. One call is one HUD: `hud(text, symbol=None, seconds=1.5)` (text, symbol `done`/`failed`/`info`/none, 0.5 to 10 s). Drawn: tick + text, dismisses by itself after `seconds` (Reduce Motion: no slide). **No progress bar and no update in place in v1** (T-0465, decided 2026-11-02: option (a)); a spinner-and-bar HUD is 1.1 and needs a wire change first, so it is not drawn. |
| Prompts | System components with our tint: `.alert` (destructive button in danger), alerts with a text or number field (keyboard type matches: `.decimalPad` for decimals), `.confirmationDialog` for 2 to 6 choices, a sheet with `Form` (Cancel / Done) for forms, and a searchable `List` sheet for long or multiple picks. At AX sizes the system stacks alert buttons. iPad: forms and lists as centred form sheets (540 wide), alerts centred. The calls under each frame are illustrations; the `pywidget.ui` API is Idris's. |

</div>


### 3.1 Key row rules (T-0232; ADR-004 rulings 3-4, Ines 2026-10-26 20:02 ET)

Maren, 2026-10-26. Under Runestone (ADR-004 option A). Where the section 5 fallback (TextKit 2) differs, it says so.

1. **Typing path.** A key tap calls the engine's `insertText`, never replace-range, so character pairs, skip-over-closing and undo grouping act as if typed. Indent sends `"\t"` (Runestone turns it into the file's indent unit). Undo is the engine's undo.
2. **Alternates.** `"` → `'` `"""` `f"`. A multi-character alternate inserts both halves with the caret between (`"""|"""`, `f"|"`), one undo step. **No `()` or `[]` alternate under Runestone**: with character pairs on, typing `(` already gives `()`. They return only under the fallback, which has no pairs: there, `(` → `()` and `[` → `[]`, same both-halves rule.
3. **Size.** 44 pt bar, keys 40 × 36 at every Dynamic Type size; the row does not grow, as the system keyboard does not. Glyphs `codeKey` 17 pt medium. At accessibility text sizes a long-press shows the key in the Large Content Viewer (`UILargeContentViewerInteraction`), except on `"`, whose long-press opens its alternates menu, which shows the glyphs large itself. **Ruled 2026-10-28 (Maren, T-0477, ADR-004 s7 "Key-row ruling"): alternates are the system button menu (glyph title, name subtitle), not a drawn bubble; the Large Content Viewer is one interaction on the bar, every key but `"`.**
4. **VoiceOver.** Each key is one element, trait `.keyboardKey`, label spoken as a name, never as the glyph:


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 3.1 Key row rules (T-0232; ADR-004 rulings 3-4, Ines 2026-10-26 20:02 ET), scrolls sideways" style="--tw:755px" markdown="1">

| Key | Label | Custom actions (alternates) |
|---|---|---|
| Indent | "Indent" | none |
| `(` `)` | "Left parenthesis", "Right parenthesis" | none (fallback: "Insert parentheses" on `(`) |
| `[` `]` | "Left bracket", "Right bracket" | none (fallback: "Insert brackets" on `[`) |
| `{` `}` | "Left brace", "Right brace" | none |
| `:` `=` | "Colon", "Equals" | none |
| `"` | "Double quote" | "Single quote", "Triple quotes", "F-string" |
| `'` | "Single quote" | none |
| `#` `_` | "Hash", "Underscore" | none |
| `.` `,` | "Period", "Comma" | none |
| `+` `-` `*` `/` | "Plus", "Minus", "Asterisk", "Slash" | none |
| `<` `>` `!` | "Less than", "Greater than", "Exclamation mark" | none |
| Undo | "Undo" | none; dimmed and trait `.notEnabled` when nothing to undo |
| Hide keyboard | "Hide keyboard" | none |

</div>


   Alternates are `UIAccessibilityCustomAction`s because long-press-and-slide cannot be done under VoiceOver; the rotor's Actions list reads them. The scroller is not an element; its keys are, in order, so swiping walks the row. <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span> covers the row as well as the text.
5. **Colour.** Bar `key.bgAlt`, keys `key.bg`, glyphs `key.text`: 4.5:1 on both fills, 7:1 in Increase Contrast (check_tokens.py rows `key.text on key.bg/key.bgAlt`). Pressed key: `key.bgAlt` for 120 ms (no scale; Reduce Motion the same).
6. **iOS 26 clear-bar rule.** If on iOS 26 the opaque 44 pt bar reads as a slab over the glass keyboard, the bar goes clear (no fill, no hairline) and each key keeps its `key.bg` fill, so `key.text` stays on a token fill and its contrast check still holds. Never `key.text` on the bare keyboard glass. G3's screenshot decides, one device check, inside the approved tokens (ruling 4); no new approval.
7. **Hardware keyboard.** Accessory view nil while one is attached, re-read on connect and disconnect (`GCKeyboard` notifications, **[recalled]**). iPad shows no bar with a hardware keyboard; G3 checks it.

### 3.2 Editor colours the engine asks for (T-0232)

Six syntax tokens per set in tokens.json (`syntax.Quill.light`, `syntax.Lumen.dark`; HC sets derived by appearance.py; asset names `Syntax<Key>`): `gutterBackground` (= bg), `gutterHairline` (= `line.hairline`; HC `line.strong`), `currentLineNumber` (= text), `invisibles` (`line.strong` moved to 3:1), `markedText` (= `accent.soft`), `findMatch` (= selection). The current-line gutter band is `currentLine`. Checks: every text role 4.5:1 on `markedText` and `findMatch` (7:1 HC); `gutter` and `currentLineNumber` on `gutterBackground` and `currentLine` (4.5 / 7); invisibles 3:1 on bg, currentLine, selection (4.5 HC). The mockups' current-match outline (`m-cur`, 1.5 pt accent ring) has no Runestone counterpart **[recalled: `HighlightedRange` carries a colour and a corner radius only]**, so with `findMatch` = selection the current match looks like the others; a distinct tint is outside creative/approved.md item 2 and waits on C51 (ops/questions.md).

### 3.3 Completion and lint states (T-1106, for T-0656; **DRAFT C51**, inside approved items)

Message shape is `pywidget_tooling/editor.py` (T-1101): `complete()` returns `mode` "jedi" or "fallback" (+ `reason`), items with `label`, `kind`, `detail` always "" and `replace`; `diagnostics()` returns `code` (a pyflakes class name such as `UnusedImport`), `message` (pyflakes text), `severity`, sorted by line then column. **Two corrections to the s3 table above:** (1) the module never returns a flake8 code, so the label is the `code` as words, sentence case (`UnusedImport` becomes "Unused import"), not `F401 unused`; the earlier frames keep the old text until Idris builds from this section. (2) `detail` is "", so the popover's one-line doc has no source; it shows only in jedi mode if Idris adds a docstring call, and 1.0 ships without it.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3.3 Completion and lint states (T-1106, for T-0656; DRAFT C51, inside approved…, scrolls sideways" style="--tw:851px" markdown="1">

| State | Rule | Frame |
|---|---|---|
| Fallback, keywords and builtins | `mode` "fallback" (reasons budget, cold, unavailable, error: the user is never told which). Same popover, same rows, same 120 ms. The doc line is replaced by the foot `cmp.basic`. No spinner, no retry button, no banner. Next keystroke asks jedi again (cold ends once `warm()` returns). | s3.3 sheet "complete", frame 1 |
| Fallback, module members | After `name.` where `name` is an imported module already loaded: its public names, kinds from the module (function, class, module, statement). Not loaded: no rows (next row). | frame 2 |
| No completions | `items` empty: **nothing is drawn.** No empty popover, no "no results" row, no haptic, no VoiceOver announcement. An open popover closes when the last row goes. | frame 3 |
| Two or more messages, one line | The label shows the first message by column, then a divider and `+N` (N is the rest). One gutter number in warning colour. Tap (44 pt target) opens a lens under the line: heading `lint.sheet.h`, then one row per message, `message` word for word. Tap again or edit the line closes it. Order is the module's. | "lint" sheet, frames 4, 5 |
| Label on a line too long for the screen | Decided on save, never while typing: if the line's text width + 8 pt + the label's width is more than the visible code width, the label does not draw and its message sits in a lens under the line (the AX mechanism, one path). A line wider than the screen on its own scrolls as before; the squiggle stays, the lens is pinned to the left edge. | frame 6 |
| Label at AX sizes, iPad | AX1 and up: no inline label at all. The lens replaces it, one row per message, `message` in full, wrapping; two or more adds the heading. Code soft-wraps flush left (s2); the lens margin follows the gutter. Portrait at AX3 is drawn; landscape follows the same rule. | "lint-ipad" sheet, frames 7, 8 |
| VoiceOver | Label: `va.lint` (one message) or `va.lint.n`; hint `va.lint.hint`. Popover rows are the system's list; the foot reads `va.cmp.basic`. | text only |

</div>


Strings (`python3 pywidget/docs/design/ide/draw_complete.py --strings`; all **DRAFT**): `cmp.basic` "Basic suggestions"; `lint.more` "+{n}"; `lint.sheet.h` "{n} messages on line {line}"; `va.lint` "Warning, {label}, line {line}. {message}"; `va.lint.n` "{n} warnings, line {line}. {first}. Double-tap to read all."; `va.lint.hint` "Opens the messages for this line."; `va.cmp.basic` "Basic suggestions". C6 word check: none banned.

Sheets: `A-` and `B-` `complete-phone.png`, `lint-phone.png`, `lint-ipad.png`; QA in `qa-complete.json` (8 frames per appearance, 0 clipped, 0 truncated, 0 overlap, 0 under 11 pt, 0 contrast fails, lowest 4.98:1). Source `draw_complete.py`. Not run: the sample messages were not compared to the module's output, because pyflakes does not import on the host Python (`--strings` prints the check as unchecked); Idris's UI test should assert the label text from a real `diagnostics()` answer.

## 4. Run states


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 4. Run states, scrolls sideways" style="--tw:894px" markdown="1">

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

1. **Projects.** *Replaced by s5.11 (T-0843): a project is a container, the filter is All, Scripts, Widgets, Lock Screen, and there is no Pinned section in 1.0. The iCloud and conflict states below stand.* Large title (display face), search, filter (All, Scripts, Widgets, Shortcuts), Pinned and Recent cards. Rows show a type tile (38, radius 10), name, one line of detail, and badges. iCloud: a not-downloaded row shows a download glyph and downloads on open. A conflict banner ("2 versions of util.py … Nothing was overwritten. Review") sits above the lists. The New button opens a menu: New script, New widget, New folder, Open a folder…, Import .py or .zip…, Start from an example. Empty state: three actions, no illustration.
2. **Editor.** Nav: back, project name, Run, ⋯. File tabs as chips, 30 tall. Gutter right-aligned, current line `sx.currentLine`. Find and replace is the system find interaction: every match on `sx.selection`, the current match outlined in accent, "2 of 4".
3. **Console.** Running opens the sheet at medium and streams output. Reading uses the large detent. `input()` raises the keyboard under the REPL bar.
4. **Traceback.** The screens show a real traceback. Host CPython 3.9.6 ran the sample at draw time; 3.15 adds `^` markers under the failing expression, which the raw view must keep. "Go to line" opens the editor with the error lens.
5. **Prompts.** As s3.
6. **Tour.** Four pages, with Skip on pages 1 to 3. 1: Python on this iPhone (a two-line script, its run and output). 2: your script can ask (a native prompt). 3: the free countdown premade with a date picker, on the gallery path; changing the date runs a gallery preview and redraws the widget. The page never says "as you type" and does not edit source (T-0173 ruling item 4; needs neither the editor pane nor redraw-as-you-type). 4: how to add a widget (iOS adds widgets from the Home Screen; three steps), then "Start writing" or "Open an example". At AX sizes the visual hides and the text and button grow. Shown once; available later in Settings. iPad: a centred page sheet, 560 × 700.
7. **Pro.** **DRAFT C51.** Redrawn 2026-10-26 22:30 ET (Maren, T-0333) to the revenue-gap memo (DECISION-2026-10-26-revenue-gap.md s3 and s8) and the state-spec split (chair ruling 2026-10-26 00:05, b8b4f0e4: Free 5, Pro 7). The text below replaces this item's 2026-10-25 version, which still said "the grid of the 9", "3 premade widgets" free and a `packages` row while widgets ship. Sheets: `A-pro-phone.png`, `A-proentry-phone.png`, `A-pro-ipad.png` (A Paper, light) and `B-pro-phone.png`, `B-proentry-phone.png` (B Studio, dark). Each sheet is drawn in the one appearance it ships in (#60 reading, creative/approved.md item 2); A dark and B light are not drawn. Idris builds T-0031 from this item; Pernille's flag file (T-0338) holds the rows.

   **7.1 What ships, by flag file.** One non-consumable (placeholder id `app.pywidget.pro`). Rows appear in this order, one per entitlement that is on; a row is on only if its feature ships in that build (2.5.19: nothing dormant, nothing "coming"). The headline follows the first row.


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 5. Screen notes, scrolls sideways" style="--tw:1403px" markdown="1">

   | Variant (flag file) | Rows | Headline | "Always free" box | Purchased line / button | Sheet frame |
   |---|---|---|---|---|---|
   | **Premades + themes** (memo s3 default) | `premades`, `themes` | `h.premades` | `free.base` + `free.widgets` (+ `free.packages` if the build bundles them free) | `done.premades` / `done.gallery` | A/B-pro-phone 1 |
   | **Premades only** (themes not approved by Day 12) | `premades` | `h.premades` | as above | as above | 2 |
   | **C1** (widgets cut, some packages pass) | `packages`, `themes` (themes only if approved) | `h.packages` | `free.base` only | `done.packages` / no button | 3 |
   | **C2** (widgets cut, none pass, themes approved) | `themes` | `h.themes` | `free.base` only | `done.themes` / `done.theme` | 4 |
   | C3 (widgets cut, none pass, themes not approved) | none: no product, no Pro screen, no entry point | | | | not drawn |

</div>


   The `premades` row's chips are the Pro tier read from the flag file, by premade.py name, in its order (Habit tracker, Shortcuts launcher, Storage, Day progress, Quote of the day, World clocks, GitHub repository). If GitHub repository misses the cut line it drops out; no string changes, because no string states a count. The `packages` row title is the passing names in ADR-003 s1 order (drawn: NumPy and Pillow). The `themes` row names follow PROPOSAL-004: if only some pairs are approved, the title and the swatches list those.

   Read from `pywidget/runtime/pro-flags.json` (Pernille, T-0338; variants in `pro-variants/`): a row shows when `entitlements.<row>.on`; the chips are the `premades` keys whose value is `"pro"`, in file order, shown by premade.py name; the `packages` title from `entitlements.packages.items`; the theme names from `entitlements.themes.items`; `free.widgets` is appended when `ships.widgets`; a file with no `product` (C3) means no Pro screen and no entry point.

   **7.2 Entry points and where each lands** (A/B-proentry-phone). Never a pop-up, never on launch, never after an error.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 5. Screen notes, scrolls sideways" style="--tw:1365px" markdown="1">

   | Entry | Shown when | Tap lands on | After purchase | Close / back returns to |
   |---|---|---|---|---|
   | 1. A Pro premade's detail sheet: `e.unlock` in the Add button's place | `premades` on, Pro not active | Pro screen as a sheet (large detent) over the detail sheet, the tapped premade's chip marked (accent.soft fill, 1.5 accent ring, semibold) | sheet dismisses; the detail button reads `e.add` (opens tour page 4's three steps) | the detail sheet |
   | 2. Settings, "Pro" group: `e.settings` row, detail `e.settings.off` / `e.settings.on` | every variant with a product | Pro screen pushed in the Settings stack (back "Settings", no close button) | the row opens the purchased screen (Restore stays there) | Settings |
   | 3. Gallery grid: `e.unlock` in the Pro section header (state-spec s6) | `premades` on, Pro not active | Pro screen as a sheet, nothing marked | header button goes; locked chips go | the gallery |
   | (Theme picker: a locked theme row) | `themes` on, Pro not active | Pro screen pushed, as entry 2 | the theme applies on the next tap | the picker |

</div>


   The Unlock buttons in entries 1 and 3 open the offer; they do not buy, so they carry no price. Every button that buys shows the price (7.4).

   **7.3 Redline** (iPhone 390 pt; iPad form sheet 560 × 700). Spacing and type tokens from tokens.json; colours by role, never hex in Swift.


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 5. Screen notes, scrolls sideways" style="--tw:1152px" markdown="1">

   | Element | Size and position | Type | Colour tokens |
   |---|---|---|---|
   | Close | 32 circle, 16 from the right, 62 from the top (iPad 16); hit 44 × 44; always visible; VoiceOver `close` | glyph 16 | `bg.sunken`, glyph `text.secondary` |
   | Eyebrow `eyebrow` | margin 20 | caption1 600, +0.04 em, uppercase | `accent` |
   | Headline | 2 below the eyebrow | title1 display (New York 600 in A, SF Pro Rounded 700 in B) | `text.primary` |
   | Sub `sub` | 6 below | body | `text.secondary` |
   | Row | padding 12 vertical, gap 14, hairline between rows | title headline 600; line footnote | tile 36, radius 10, `accent.soft`, glyph 20 `accent`; line `text.secondary`; hairline `line.hairline` |
   | Premade chips | min 28 tall, padding 4/10, radius 8, gap 6, wrap; no glyph (T-0474: the row tile carries it once) | footnote | `bg.sunken`, text `text.primary`; marked: `accent.soft`, inset 1.5 `accent`, text `accent` 600 |
   | Theme swatches | three equal, gap 8, padding 8/9, radius 10, 1 px `line.hairline`; name under in caption1 | code 12/16 Menlo (fixed: a sample, not text to read) | the theme's own `bg`, `text`, `keyword`, `function`, `string` for the frame's appearance (themes-pro/themes.json) |
   | "Always free" box | margin 6/20, padding 12/14, radius 14 | eyebrow + footnote | `bg.sunken` |
   | Pinned foot (every size) | bottom of the screen, padding 12/20/28, 1 px top hairline; the body scrolls above it with a matching bottom inset | | `bg.canvas`, `line.hairline` |
   | Buy button | min 50, pill, full width, gap 8 with an 18 icon | headline 600 | ready: `accent` (A), 135deg `accent` to `accent.2` (B); text `text.onAccent`; disabled: `bg.sunken`, `text.secondary`; restored: `status.success` |
   | Line under the button | 8 below, centred; at most 72 characters (`PRO_LINE_MAX`, checked with C6) | footnote | `text.secondary`; failed and restoreFailed: `status.danger` |
   | Links | row, gap 18, wrap; each 44 tall | footnote | `accent` |
   | Purchased screen | check 44 in an 84 circle (`status.success` at 14 % on `bg.canvas`), 150 from the top; title 20 below | title1 display; body | button as Buy; Done headline `accent` |

</div>


   **7.4 Purchase states** (sheet frame 7). The button and its line; StoreKit 2 names in brackets.


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: 5. Screen notes, scrolls sideways" data-n="1" style="--tw:1519px" markdown="1">

   | # | State | Button | Line | Tappable | Price shown |
   |---|---|---|---|---|---|
   | 1 | loading (products not yet returned) | `btn.loading`, spinner | `ln.loading` | no | no: nothing to buy yet |
   | 2 | ready | `btn.ready` | `ln.ready` | yes: `product.purchase()` | yes, `product.displayPrice` |
   | 3 | buying (purchase in flight, system sheet up) | `btn.buying`, spinner | `ln.buying` | no | in Apple's sheet |
   | 3b | restoring (`AppStore.sync()`) | `btn.restoring`, spinner | `ln.restoring` | no | n/a |
   | 4 | pending (`.pending`: Ask to Buy or a bank confirmation; this screen's own result, a new screen opens on 2) | `btn.ready` (T-0481) | `ln.pending` | yes: a declined Ask to Buy sends no transaction, so a disabled button would never come back; `Transaction.updates` turns Pro on later | yes |
   | 5 | failed (an error, or an unverified transaction) | `btn.failed` | `ln.failed` in `status.danger` | yes | yes |
   | 5b | restoreFailed (`AppStore.sync()` threw, product loaded) | `btn.ready`, never "Try again", which would buy (T-0482) | `ln.restoreFailed` in `status.danger`; on the purchased screen the same line in `text.secondary` (Pro is still active) | yes | yes |
   | 6 | offline (no products and no network) | `btn.offline` | `ln.offline` | no | no: the button cannot buy |
   | 7 | restored / purchased (verified entitlement) | `btn.restored` with check, then the purchased screen | `ln.restored` | no | n/a |
   | 8 | none found (restore ran, no entitlement) | `btn.none` | `ln.none` | yes | yes |

</div>


   `.userCancelled` returns to 2 with no message. Restore is always the first link; it is never a second button competing with Buy. No timer, count, "launch price" or urgency word anywhere (C6); `draw_ide.py --pro-strings` checks every string for them and checks the price on every buy button (seeded mutant "Launch price ends soon, only 3 left." and a price-less "Try again": both caught). Result in qa.json `_pro_c6`: 53 strings, 0 banned words, 0 buy buttons without a price. *T-0474 (2026-10-27):* `--pro-strings` also fails on any `ln.*` over 72 characters; today 0 (longest `ln.restoreFailed`, 71).

   **7.5 Accessibility.**
   - Dynamic Type: every text role scales; at AX1 and up the row tiles hide, the body scrolls, and the button and its line stay pinned, so the price is on screen at every size (frame 5, AX3). The links move to the end of the scrolled body at AX sizes. Chips wrap; nothing truncates (qa.json: 0 truncated).
   - VoiceOver order: Close; eyebrow and headline (one element, trait header); sub; each row as one element ("Pro premade widgets. Add them to your Home Screen… Habit tracker, Shortcuts launcher, …"); swatches hidden behind their row (the row names the themes); "Always free" box as one element; the button (label as shown); the state line as its own element, read next (T-0474 ruling 1: a hint is skipped when hints are off and is not in the tree a UI test reads, and the line is the only thing telling `none` from `ready`); Restore purchase, Terms of Use, Privacy Policy. Spinners are `accessibilityHidden`; a state change posts an announcement with the new line. The marked chip in entry 1 adds "selected".
   - Contrast, measured: every text node against its composited background in qa.json (A-pro-phone 233 nodes, lowest 5.79:1; A-proentry-phone 186, 5.95; A-pro-ipad 72, 5.95; B-pro-phone 223, 7.01; B-proentry-phone 162, 5.25). Skipped by the script (on B's gradient and widget card): onAccent on the B dark gradient's stops is 6.83 (`accent`) and 9.09 (`accent.2`); onAccent on `status.success` 5.79 (A) and 9.95 (B); onAccent on `accent` in A 7.38; `key.text` on `key.bgAlt` (the Pro chip) 13.44 (A) and 14.43 (B). Increase Contrast uses the 7:1 sets as everywhere else.
   - Reduce Motion: the state change is a crossfade (120 ms), no slide; nothing on this screen moves on its own.

   **7.6 Strings.** Every string is **DRAFT C51**: the paywall's look and copy are outside approved item 2 and go to the Investors with these sheets (ops/questions.md). Generated by `draw_ide.py --pro-strings` from `PRO_STR`, the same table the frames draw from; if a string changes, regenerate this table.


<div class="tbl" role="region" tabindex="0" aria-label="Table 12: 5. Screen notes, scrolls sideways" style="--tw:860px" markdown="1">

   | ID | String | Where | C51 |
   |---|---|---|---|
   | `eyebrow` | pywidget Pro | Pro screen, above the headline | DRAFT |
   | `h.premades` | Put every premade on your Home Screen. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; headline when `premades` is on | DRAFT |
   | `h.packages` | Scientific packages for your own scripts. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; headline when `packages` leads (C1) | DRAFT |
   | `h.refresh` | Widgets that keep themselves fresh. | 1.0 headline when `refresh` leads (T-2375 s4b; gate BR: drops whole if T-0795 cuts background refresh; row kind arrives with T-2373) | DRAFT |
   | `h.themes` | More editor themes, light and dark. | headline when only `themes` is on (C2) | DRAFT |
   | `h.optB` | What Pro adds. | headline, option B (C51 question) | DRAFT |
   | `sub` | One purchase, no subscription. | under the headline | DRAFT |
   | `row.premades.t` | Pro premade widgets | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; row title | DRAFT |
   | `row.premades.l` | Add them to your Home Screen, Lock Screen and StandBy, and open their source to change them. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; row line | DRAFT |
   | `row.refresh.t` | Background refresh | 1.0 row title (gate BR) | DRAFT |
   | `row.refresh.l` | Widgets that use it update through the day with the app closed. iOS decides when. | 1.0 row line (gate BR); any widget that declares background refresh, not only internet ones (T-2408 ruling); no figure (T-2375 s2) | DRAFT |
   | `row.themes.t` | Editor themes: Ember, Fern and Graphite | row title (names follow PROPOSAL-004's approval) | DRAFT |
   | `row.themes.l` | Each in light and dark, with a high-contrast set. | row line | DRAFT |
   | `row.packages.t` | NumPy and Pillow | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; row title: the packages that pass ADR-003's gate, s1 order | DRAFT |
   | `row.packages.l` | Bundled in the app, so import works offline with nothing to install. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; row line | DRAFT |
   | `free.eye` | Always free | box title | DRAFT |
   | `free.base` | Running any Python, internet from your scripts, the editor and console, projects and files, Shortcuts actions and the device modules | box text, every build | DRAFT |
   | `free.widgets` | , your own widgets and the free premades | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; box text, appended when widgets ship | DRAFT |
   | `free.all` | , your own widgets and every premade, updated when you open the app or a Shortcut runs | box text, appended in place of free.widgets once no premade is locked (T-2372; ProPaywallView picks it from the flag file) | DRAFT |
   | `free.packages` | , and NumPy and Pillow | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; box text, appended when packages ship free (widgets ship) | DRAFT |
   | `btn.loading` | Loading price… | button, loading (disabled) | DRAFT |
   | `btn.ready` | Unlock Pro · [price] | button, ready; [price] = product.displayPrice | DRAFT |
   | `btn.buying` | Waiting for the App Store… | button, buying (disabled) | DRAFT |
   | `btn.restoring` | Restoring… | button, restoring (disabled) | DRAFT |
   | `btn.failed` | Try again · [price] | button, failed | DRAFT |
   | `btn.offline` | Unlock Pro | button, offline (disabled; no price, so no tap) | DRAFT |
   | `btn.restored` | Pro is active | button, restored (success fill, not a button) | DRAFT |
   | `btn.none` | Unlock Pro · [price] | button after a restore that found nothing | DRAFT |
   | `ln.loading` | The price comes from the App Store. | line under the button | DRAFT |
   | `ln.ready` | One-time purchase through the App Store. | line under the button | DRAFT |
   | `ln.buying` | Confirm in the App Store sheet. | line under the button | DRAFT |
   | `ln.restoring` | Checking your Apple Account. | line under the button | DRAFT |
   | `ln.pending` | The purchase is waiting for approval. Pro turns on by itself. | line under the priced, enabled btn.ready after a .pending result (Ask to Buy or a bank confirmation); T-0474 | DRAFT |
   | `ln.failed` | The App Store couldn’t complete the purchase. | line under the button, status.danger | DRAFT |
   | `ln.restoreFailed` | The App Store couldn’t restore the purchase. Try Restore purchase again. | line under btn.ready after a failed Restore, status.danger; the purchased screen's line after one, text.secondary; Settings' Pro footer (T-0474) | DRAFT |
   | `ln.offline` | You’re offline. The price shows when you reconnect. | line under the button | DRAFT |
   | `ln.restored` | Restored from your Apple Account. | line under the button | DRAFT |
   | `ln.none` | No Pro purchase found for this Apple Account. | line under the button | DRAFT |
   | `link.restore` | Restore purchase | footer link | DRAFT |
   | `link.terms` | Terms of Use | footer link | DRAFT |
   | `link.privacy` | Privacy Policy | footer link | DRAFT |
   | `close` | Close | VoiceOver label of the close button | DRAFT |
   | `done.t` | Pro is active | purchased screen title | DRAFT |
   | `done.premades` | Thank you. The Pro premades are open in the Gallery, source included. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; purchased screen, premades on | DRAFT |
   | `done.packages` | Thank you. NumPy and Pillow are ready to import in any script. | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; purchased screen, C1 | DRAFT |
   | `done.refresh` | Thank you. Your widgets refresh in the background through the day, as iOS allows. | 1.0 purchased screen, refresh leads (gate BR) | DRAFT |
   | `done.themes` | Thank you. The new themes are in Settings, under Editor theme. | purchased screen, C2 | DRAFT |
   | `done.gallery` | Open the Gallery | RETIRING with T-2372/T-2373 (B-staged 1.0 has no Pro premade; packages are 1.2): kept only while the build's flag-file row still reads it, never drawn on the 1.0 screen; purchased screen button, premades on | DRAFT |
   | `done.theme` | Choose a theme | purchased screen button, C2 | DRAFT |
   | `done.done` | Done | purchased screen, second action | DRAFT |
   | `e.unlock` | Unlock with Pro | 1.0: the locked set is empty, so no premade shows it; the code stays for T-2316's locked Shortcut run. Pro premade detail sheet, in the Add button's place; gallery Pro section header (state-spec s6) | DRAFT |
   | `e.add` | Add widget | the same button once Pro is active: opens tour page 4's three steps | DRAFT |
   | `e.caption` | Live preview on your data. | premade tile and detail sheet caption; the old 'Source opens with Pro' contradicted T-0901 (opening a copy is free) | DRAFT |
   | `e.live` | Live with Pro | gallery chip, free user, on every premade that declares background refresh: GitHub repository, Storage, the 60-minute premade (T-2408 ruling; live-pro/spec.md). C51 question: Wrenna's 'Fresh with Pro' (T-2375 s4c) | DRAFT |
   | `e.live.on` | Live | the same chip once Pro is active | DRAFT |
   | `e.pro` | Pro | a free user's background-refresh widget on the Home Screen: the plain word, no offer, no price (Apple 4.4) | DRAFT |
   | `e.settings` | pywidget Pro | Settings row title | DRAFT |
   | `e.settings.off` | Not purchased | Settings row detail | DRAFT |
   | `e.settings.on` | Active | Settings row detail once purchased | DRAFT |
   | `e.theme` | Editor theme | Settings row; picker when `themes` is on | DRAFT |
   | `e.theme.foot` | Pro themes are previewed here. Tap one to see what Pro adds. | theme picker footer | DRAFT |

</div>


   **7.7 C51 question.** A (recommended): approve the Pro screen as drawn, headline by variant (`h.premades`, `h.packages`, `h.themes`). B: as A, with the plain headline `h.optB` "What Pro adds." in every variant (frame 8). C: neither; the company redraws. Not asked here: the price (`[price]` stays a placeholder, the Investors' call), which premades are Pro (questions item 10), and the theme pairs themselves (PROPOSAL-004).

   *Note, 2026-10-27 (Maren, T-0474, review of T-0473 and 0d5658e5):* rulings in pywidget/docs/reviews/t0473-pro-screen-design-maren.md. Changed here: chips carry no glyph; state 4 keeps the priced Buy; state 5b added; `btn.pending` dropped (no screen shows it); final `ln.pending` and `ln.restoreFailed`; the state line is read after the button, not as its hint; a 72-character <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on lines. The Pro sheets (A/B-pro-phone, A-pro-ipad) are owed a redraw from draw_ide.py with these changes.

   *Open for Idris (T-0031):* (a) the restore-in-progress state 3b is my addition to the eight; (b) in C1 a free user's `import numpy` needs a console line that points to Pro, not a pop-up; not drawn, Ines rules on it with the C1 case; (c) the purchased screen in C1 has no button, only Done.

8. **iPad.** *Library list and project tree: see s5.11.10.* `NavigationSplitView`: a floating sidebar (290) with Library, the project tree and Locations; the editor; and a resizable right pane (340 to 430) holding the console or the widget preview (family and mode switches, entry stepper, "Last run" time; redrawn on Run (⌘R) and on save, never while typing; no "Send to Home Screen": iOS gives an app no way to place a widget, the person adds it from the Home Screen). Divider: 9 wide with a 4 × 44 handle; double-tap resets. The sidebar collapses with ⌃⌘S. Holding ⌘ shows the shortcut list (two columns). Portrait: the console becomes a bottom split. On iPhone the sidebar is the Projects tab and the right pane is the console sheet.

   *Note, 2026-10-26 01:25 ET (Maren, T-0119, from PROPOSAL-003 "Found on the way" 1-2).* "Send to Home Screen" is gone from the preview pane. Sample rows: "Weather card" is now `trip_countdown` (weather is a Shortcut recipe, not a v1 widget: ADR-001 ruling, no MET Norway) and "Clean clipboard" reads "Run Script with Input" (a v1 App Intent), not "Share sheet action" (a share extension is 1.1). Changed in `draw_ide.py`; the four affected sheets (A-projects and A-ipad, phone and iPad) are redrawn on design-previews `ide/` (67c22ebc), QA 0 issues. The PNGs in this folder still show the old rows until the IDE screens are redrawn in the approved look.

   *Note, 2026-10-26 19:51 ET (Maren, T-0194, from the T-0173 chair ruling 2026-10-26 02:36, editor-preview-note.md s6).* s5.8: the network-off switch is gone from the preview pane for v1 (ruling item 3: it comes in 1.1 with redraw as you type, item 2); the pane header gains "Last run 9:41" so the frame says when it was drawn. s5.6: tour page 3 is the countdown premade with a date picker (title "Change the date. Watch the widget."; was "Change a line." over an edited source line, captioned "redraws as you type"). The iPad 1 store shot reuses this pane (store/draw_store.py `ipad_split`), so it now shows the pane as part A builds it, and its caption is Ines's "Write a widget and / see how it looks" (PROPOSAL-003 s2.6, ruling item 5). Redrawn: A-tour-phone, A-tour-ipad, A-ipad-phone, A-ipad-ipad, B-tour-phone, B-ipad-phone; qa.json 0 issues on all six (min contrast 4.62); store shots re-rendered to a temp folder, 0 faults, not pushed to design-previews.

9. **Gallery.** **Strings DRAFT C51.** Maren, 2026-10-26 22:40 ET (T-0334), for Idris's T-0191. Sheets: `A-gallery-phone.png` (A Paper, light, 9 frames), `B-gallery-phone.png` (B Studio, dark, the same 9), `A-gallery-ipad.png` (2 frames); drawn by `draw_gallery.py`, which imports draw_ide.py's frames and QA and renders every preview with `../widgets/render.py` from the 12 trees in `../widgets/trees/`. Layout, spacing and colour are inside the approved tokens (creative/approved.md item 2); only the words wait on C51. Reads: state-spec s6 (locked tile) and both chair rulings there, ADR-007 s5.2, editor-preview-note s2 and the T-0173 ruling (s6 items 4, 7, 8), runtime/pro-contract/CONTRACT.md s3-s4.

   **9.1 Tiers come from the flag file, never from code.** `pywidget/runtime/pro-flags.json` (T-0338), read through the contract's `resolve()`: a premade is locked when `premades.on && tier != "free" && !entitled` (contract s4 rule 5: an unlisted premade counts as Pro). Today's file: Free (5) countdown, sun, steps, distance, altitude; Pro (7) habits, shortcuts, storage, progress, quote, clocks, github, in premade.py order. No count is drawn anywhere; the sections list whatever the file says.


<div class="tbl" role="region" tabindex="0" aria-label="Table 13: 5. Screen notes, scrolls sideways" style="--tw:640px" markdown="1">

   | Flag file says | Gallery shows |
   |---|---|
   | `premades.on`, not entitled (today) | Two sections, Free then Pro. Free tiles: `chip.free`, `cap.free`, `src`. Pro tiles: lock chip, `pro:e.caption`, no source path. Pro header carries `pro:e.unlock`, the screen's one primary action (s5.7 entry 3). |
   | `premades.on`, entitled | Same two sections; the header button goes; Pro chip without the lock; every tile gets `src` and the detail sheet's `pro:e.add`. |
   | `premades.on` false (all free) | One section, `sec.all`, no chips. |
   | `premades` map empty (widgets cut, C1/C2/C3) | No Gallery tab or sidebar row. Tour pages 3 and 4 are off too (their owner's call, not this item). |
   | Closed state (file broken; the build check stops this shipping) | One section `sec.all`, every tile preview-only, no chips, no buttons, `st.closed` under the title. Never a buy path that cannot complete (contract s4 rule 4). |

</div>


   **9.2 Layout per device class.**
   - **iPhone** (frames 1-4, 9): large title, the mode switch (segmented, full width), then the sections, one tile per row, 16 margins, 20 between tiles. One column on purpose: Medium (338 pt) only fits at 100% in a full-width well; a two-column grid would draw it at 47%, about 5 pt text, which does not read. Tab bar item "Gallery" (s5 tabs as drawn).
   - **iPad** (frame 1 of the iPad sheet): a "Gallery" row at the top of the sidebar's Library (new; s5.8's list gains it), content column 870 wide with 20 margins, two columns of 395 pt tiles, 20 apart, title and a 360-wide mode switch on one line. Portrait, sidebar collapsed: still two columns (820 − 40 margins − 20 gap leaves two 380 tiles; Medium at 100%).
   - **Tile** (both): preview well (height 194, radius 16, the tile's width) / family line (family name, caption 1 secondary, and the pager dots) / name (headline) + tier chip / caption + `src` (free) / one state line and one button when a state needs them (9.4). The whole tile opens the detail sheet. The well shows the widget at its real point size when it fits (Small, Medium, every Lock Screen family); Large and Extra large draw at 50% with `fam.half` in the family line and 100% in the detail sheet. **Change to state-spec s6:** it said Extra large tiles at 100% on iPad; 715 pt does not fit a 395 tile, so the tile draws it at 50% and the iPad detail sheet presents `.presentationSizing(.page)` (wider than the 540 form sheet) when the selected family is Extra large **[recall: API name; Idris checks]**. No premade claims Extra large today (widgets/README "Systems claimed"), so nothing draws it yet.
   - **Well ground:** what the widget meets on the device (state-spec s4 surfaces): Full colour on `bg.sunken`; Accented on the tinted Home Screen ground; Small in Vibrant on black (StandBy); Lock Screen families always vibrant on a Lock Screen ground whatever the switch says (state-spec s6).
   - **Family pager:** swipe the well sideways, or the dots; order = the premade's `families` list; in Vibrant only Small and the Lock Screen families are pages (medium and larger never meet vibrant). The pager is per tile and remembered for the session; the mode switch is one for the screen and redraws every well. Changing mode or family never starts a run: one preview run returns every family (the tree has a view per family) and the mode is a render environment (`widgetRenderingMode`, editor-preview-note s2 item 2).

   **9.3 The preview run (ADR-007 s5.2; T-0173 items 7-8).** Each tile's preview is a real run of the premade in the app on the user's data, through the `preview` context only: its tree goes to the screen, never to `tree.json`, `status.json`, the Activity log or a WidgetKit reload, and a preview never coalesces with a Home Screen refresh (the queue-key fix lands first). A free user previews Pro premades; no Pro tree is written. Runs start for visible tiles first, one at a time on the run queue, budget 2 s each [est, replaced by the measured number]; results are kept for the session and rerun when the app returns to the foreground if older than the premade's `stale_after`. The gallery never raises a permission prompt by itself (9.4).

   **9.4 Tile states** (frame 5, "Tile states"; one at a time, first match wins):


<div class="tbl" role="region" tabindex="0" aria-label="Table 14: 5. Screen notes, scrolls sideways" data-n="1" style="--tw:1143px" markdown="1">

   | # | State | When | Well | Line / button |
   |---|---|---|---|---|
   | 1 | Loading | run in flight for over 300 ms (no flash under that) | the family's outline (bg.surface, hairline) with a spinner and `st.loading`; Reduce Motion: static ring | none |
   | 2 | Failed | the run raised, timed out or went over budget | outline card, x-circle, `st.failed`, `st.retry` | none. **Never a traceback or a line number in the gallery**: a Pro tile has no source path, and a free premade's error belongs to its editor after `src`. |
   | 3 | Permission needed | a free premade that needs a grant not yet asked (steps: Motion & Fitness; distance and altitude: Location) | the bundled preview tree with the `st.sample` chip | `st.perm.motion` or `st.perm.loc`, button `st.allow.*`; only that tap raises the system prompt (purpose string per L6). No Pro premade needs a permission (state-spec chair ruling 2026-10-26 00:05), so this state never appears on a Pro tile. |
   | 4 | Declined | the grant was refused or is off | outline card, the glyph, `st.off.loc` or `st.off.motion`, `st.settings` (opens the app's Settings page) | none; shown as a state, never re-asked or nagged (T-0063). The typed place (T-0063) adds a second button "Type a place" on distance if it lands by Day 12. |
   | 5 | Offline | a network premade (github) with no network and no result this session | bundled preview tree + `st.sample` | `st.offline` |
   | 6 | No data yet | the run returns the premade's empty case (no habits, no events, no shortcuts chosen, no repository) | bundled preview tree + `st.sample` | `st.empty` |
   | 7 | Live | a good run | the run's tree | `cap.free` or `pro:e.caption` |

</div>


   **Rerun over a live tile (T-1135).** A rerun on return to the foreground (9.3) never leaves state 7 while an earlier good tree is kept: the well keeps the last good tree, no spinner, no `st.loading`, no caption change, and the new tree replaces it when the run lands. Row 1 (spinner) shows only when the tile has no good result this session. A rerun that fails or goes offline keeps the last good tree and says nothing; the tile is Failed or Offline only with no result kept. This is the caller's duty in `GalleryTileRule.tile(...)` (hook below): while a rerun is in flight or after it fails, pass the kept result as `.good`, never `.inFlight`, `.failed` or `.offline`. The rule needs no change: it takes `run` as given, and 9.3 already says a result kept from earlier in the session is passed as `.good`.

   "Sample data" is the honesty rule here: whenever the well shows anything other than the user's own run, the chip says so. The caption "Live preview" appears only in state 7.

   **9.4 hook (T-1103, Pernille; for T-0191 and T-0901).** The gallery asks one pure function per tile and draws its answer; it decides no state itself: `GalleryTileRule.tile(locked: gates.isPremadeLocked(id), run:, grant:)` in `pywidget/ios/App/GalleryTileRule.swift` (in Core, `swift test`). `run` is `.notRun`, `.inFlight(milliseconds:)` (from when the tile asked, queue wait included), `.failed`, `.offline`, `.empty` or `.good`; `grant` is `.notNeeded`, `.notAsked`, `.granted` or `.declined`. It returns `state` (the seven rows above, numbered), `showsSpinner` and `actions` (`mayPreview`, `mayAdd`, `mayOpenSource`; the last two follow the lock alone, so a locked tile previews and has no add or `src`). Two things the caller owes: hold the run of a premade whose grant is not asked or is declined (pass `.notRun`), or its failure would hide the Allow or Settings button behind row 2; and pass a result kept from earlier in the session as `.good`, so `.offline` means none. With nothing matched (no run, or 300 ms or less in flight) the answer is Loading with `showsSpinner` false: the outline only. The file's header lists the six decisions.

   **9.5 Detail sheet** (frames 6-7; iPad: centred 540 form sheet, sheet frame 2). Phone: sheet, large detent. Header: name (title 3), tier chip, Done. Well 358 × 390 on phone, 508 × 390 on iPad: every claimed family at 100%. Family chips under it (wrap; selected = `text.primary` fill). "What it shows" and "Uses" (one line each, `about.*`), then the caption. Foot, pinned: free or entitled: `pro:e.add` (primary) and `src` (secondary); locked: `pro:e.unlock` with the lock glyph, which lands on the Pro screen as s5.7.2 entry 1 draws it (T-0333; not redrawn here). The state of 9.4 carries into the sheet unchanged.

   **9.6 Add-to-home hand-off** (frame 8). `pro:e.add` opens a medium-detent sheet over the detail sheet: `add.t` and three steps that name the premade, Home Screen or Lock Screen set by the selected family, and `add.foot`. iOS gives an app no way to place a widget; step 3 is T-0051's configuration (the widget's entity query lists the premade). This sheet takes the place of "tour page 4" in s5.7.2 entry 1's after-purchase cell: tour page 4's steps stop at "Search for pywidget" and never name the premade. Step wording for the Lock Screen and Edit Widget is **[recall]**; Idris checks it on the Simulator and corrects the strings, not the layout.

   **9.7 VoiceOver.** Order: title (header); mode switch (one segmented control, value = mode); per section: the header (trait header), then `pro:e.unlock` if shown, then the tiles in grid order (iPad: row by row, left to right). Each tile is **one element**:
   - label: free "{name}, {family} widget, Free. Live preview." Pro: "{name}, {family} widget, Pro. Live preview. Source opens with Pro." (state-spec s6). In states 3, 5, 6 "Live preview." becomes "Sample data."; in 1 "Running preview."; in 2 "Preview didn’t run."; in 4 the state line.
   - value: the premade's own VoiceOver string from the tree (premade.py `a11y`, e.g. "Lisbon trip, 53 days, Friday December 18"), so the preview is read, not skipped.
   - trait `.adjustable`: swipe up or down pages the family (the dots are hidden).
   - custom actions: `src` (free or entitled), `pro:e.add`, `pro:e.unlock` (locked), `st.retry`, `st.allow.*` or `st.settings` when the state has them. Double-tap opens the detail sheet.
   - Detail sheet: name + chip (one element, header), Done, the well (one element, same label and value, adjustable for family), the family chips (one segmented control), What it shows, Uses, the caption, the buttons.

   **9.8 Dynamic Type** (frame 9, AX3). Widgets in the wells do not scale with the app's text size (the system sizes widgets; the well draws the family at its point size). Everything around them scales. At AX1 and up: name and chip stack (`.hz` rule, s2), the family line becomes a menu button `fam.menu`, the mode switch becomes a menu button `mode.menu`, the section header's `pro:e.unlock` wraps under the header, and the detail sheet's body scrolls with the buttons pinned. The well keeps 194 pt.

   **9.9 Contrast, measured** (`qa-gallery.json`, every text node against its composited background, 4.5:1, 3:1 large): A-gallery-phone 498 nodes, lowest 5.95:1; A-gallery-ipad 166, 5.95; B-gallery-phone 307 checked, lowest 6.37, and 191 skipped on B's widget card gradient and glass sheets. Those pairs by hand from tokens: `widget.onCard.primary` 6.86 and `.secondary` 4.77 on the card's lighter stop (s1); render.py's pixel check gives full colour dark 5.18 worst (widgets/README). Widget text in Accented, Vibrant, StandBy and Lock Screen wells is the system's paint and is not counted here; render.py's per-mode table in widgets/README is the number for it, and the weak case there (white over a light wallpaper) is not a gallery ground: Lock Screen wells use the dark ground. Tier chips: `key.text` on `key.bgAlt` and `text.secondary` on `bg.sunken`, both inside the counted nodes.

   **9.10 QA and size.** 20 frames, 0 clipped, 0 truncated, 0 text over text, 0 under 11 pt, 0 contrast fails. All 12 premades are rendered across the A phone and A iPad sheets (`qa-gallery.json` `_coverage`, missing: none). PNG bytes: A phone 288,520 (@1.16x), A iPad 227,553 (@2x), B phone 281,395 (@0.99x), each under 300 KB (draw_ide.py's `MAX_BYTES`, palette PNG). Large at 50% in a tile is a thumbnail (about 6 pt text); the QA reads computed sizes, so it does not flag it, and the detail sheet is where Large reads.

   **9.11 Strings** (`draw_gallery.py --strings`; `pro:` ids are s5.7's, read from `PRO_STR` so the two screens cannot drift). Every one is DRAFT C51: no copy guide is approved.


<div class="tbl" role="region" tabindex="0" aria-label="Table 15: 5. Screen notes, scrolls sideways" style="--tw:853px" markdown="1">

   | ID | String | Where | C51 |
   |---|---|---|---|
   | `title` | Gallery | large title; tab and sidebar row | DRAFT |
   | `mode.full` | Full colour | mode switch | DRAFT |
   | `mode.acc` | Accented | mode switch | DRAFT |
   | `mode.vib` | Vibrant | mode switch | DRAFT |
   | `mode.menu` | Mode: {mode} | mode switch at AX sizes (menu button) | DRAFT |
   | `sec.free` | Free | section header | DRAFT |
   | `sec.pro` | Pro | section header | DRAFT |
   | `sec.all` | Premades | single section header when the flag file gates no premade | DRAFT |
   | `chip.free` | Free | tile chip | DRAFT |
   | `chip.pro` | Pro | tile chip (lock glyph while locked) | DRAFT |
   | `cap.free` | Live preview on your data. | free tile caption | DRAFT |
   | `src` | Open source | free tile button; Pro tile once Pro is active | DRAFT |
   | `fam.half` | {family} · half size | family line when Large or Extra large is drawn at 50% in a tile | DRAFT |
   | `fam.menu` | Family: {family} | family pager at AX sizes (menu button) | DRAFT |
   | `fam.lock` | {family} · Lock Screen | family line for accessory families | DRAFT |
   | `fam.standby` | Small · StandBy | family line for small in Vibrant | DRAFT |
   | `st.loading` | Running preview… | tile, run in flight (shown after 300 ms) | DRAFT |
   | `st.failed` | The preview didn’t run. | tile, run failed or over budget | DRAFT |
   | `st.retry` | Try again | tile button, failed | DRAFT |
   | `st.sample` | Sample data | chip on the well when the tree is the bundled preview | DRAFT |
   | `st.perm.motion` | Steps needs Motion & Fitness to show yours. | tile line, permission not asked yet | DRAFT |
   | `st.perm.loc` | {name} needs your location to show yours. | tile line, permission not asked yet | DRAFT |
   | `st.allow.motion` | Allow Motion & Fitness | tile button; the tap raises the system prompt | DRAFT |
   | `st.allow.loc` | Allow Location | tile button; the tap raises the system prompt | DRAFT |
   | `st.off.loc` | Location is off for PyWidget. | tile line, permission declined (T-0063) | DRAFT |
   | `st.off.motion` | Motion & Fitness is off for PyWidget. | tile line, permission declined | DRAFT |
   | `st.settings` | Open Settings | tile button, declined | DRAFT |
   | `st.offline` | You’re offline. This shows sample data. | tile line, network premade with no network | DRAFT |
   | `st.empty` | No data yet, so this shows sample data. | tile line, nothing to show yet | DRAFT |
   | `st.closed` | Premades can’t be added right now. | header line, closed state (contract s4) | DRAFT |
   | `d.done` | Done | detail sheet close | DRAFT |
   | `d.what` | What it shows | detail sheet label | DRAFT |
   | `d.uses` | Uses | detail sheet label | DRAFT |
   | `add.t` | Add {name} | add sheet title | DRAFT |
   | `add.home1` | Touch and hold the Home Screen, tap Edit, then Add Widget. | add sheet step 1, Home Screen families [recall] | DRAFT |
   | `add.home2` | Search for pywidget and add the widget. | add sheet step 2 | DRAFT |
   | `add.home3` | Touch and hold it, tap Edit Widget, then choose {name}. | add sheet step 3 (T-0051 entity query) | DRAFT |
   | `add.lock1` | Touch and hold the Lock Screen, then tap Customize. | add sheet step 1, Lock Screen families [recall] | DRAFT |
   | `add.lock2` | Tap the widget area and choose pywidget. | add sheet step 2, Lock Screen [recall] | DRAFT |
   | `add.lock3` | Tap the widget, then choose {name}. | add sheet step 3, Lock Screen | DRAFT |
   | `add.foot` | iOS adds widgets from the Home Screen and Lock Screen; PyWidget can’t place one. | add sheet footer | DRAFT |
   | `pro:e.unlock` | Unlock with Pro | owned by s5.7 (T-0333); used here | DRAFT |
   | `pro:e.add` | Add widget | owned by s5.7 (T-0333); used here | DRAFT |
   | `pro:e.caption` | Live preview on your data. | owned by s5.7 (T-0333); used here | DRAFT |
   | `pro:e.live` | Live with Pro | owned by s5.7 (T-0333); used here | DRAFT |
   | `pro:e.live.on` | Live | owned by s5.7 (T-0333); used here | DRAFT |
   | `about.countdown` | Days to a date you choose. / The clock and the dates you save. | detail sheet, What it shows / Uses | DRAFT |
   | `about.sun` | Sunrise and sunset for a place you save. / A saved place; worked out on this iPhone. | detail sheet, What it shows / Uses | DRAFT |
   | `about.steps` | Today’s steps and floors. / Motion & Fitness, asked once. | detail sheet, What it shows / Uses | DRAFT |
   | `about.distance` | How far you are from a saved place. / Your location while PyWidget is open, asked once. | detail sheet, What it shows / Uses | DRAFT |
   | `about.altitude` | Your altitude, with its accuracy. / Your location while PyWidget is open, asked once. | detail sheet, What it shows / Uses | DRAFT |
   | `about.habits` | A week of the habits you log. / What you log in PyWidget. | detail sheet, What it shows / Uses | DRAFT |
   | `about.shortcuts` | Your shortcuts, one tap away. / The shortcut names you pick. | detail sheet, What it shows / Uses | DRAFT |
   | `about.storage` | Free space on this iPhone. / The storage figure iOS gives PyWidget. | detail sheet, What it shows / Uses | DRAFT |
   | `about.progress` | How much of the day has gone. / The clock. | detail sheet, What it shows / Uses | DRAFT |
   | `about.quote` | A public-domain quote each day. / A list inside PyWidget. | detail sheet, What it shows / Uses | DRAFT |
   | `about.clocks` | The time in the places you pick. / The clock and time zones. | detail sheet, What it shows / Uses | DRAFT |
   | `about.github` | Stars, issues and checks for a repository. / GitHub, over the network; your token if you add one. | detail sheet, What it shows / Uses | DRAFT |

</div>


10. **Settings.** **Strings DRAFT C51.** Maren, 2026-10-26 22:45 ET (T-0335), for Idris's T-0031 (Pro row and Restore), T-0042 (Acknowledgements), T-0272 (theme picker), the tour (s5.6) and the Privacy Policy row (app-review-matrix row 41, gate G11). Sheets: `A-settings-phone.png` (A Paper, light, 10 frames), `B-settings-phone.png` (B Studio, dark, the same 10), `A-settings-ipad.png` (3 frames), drawn by `draw_settings.py`, which imports draw_ide.py's frames and QA and changes nothing there. Layout, spacing and colour stay inside the approved tokens (creative/approved.md item 2); only the words wait on C51. The rows are read from files, not typed: Pro and Editor groups from `pywidget/runtime/pro-flags.json` and `pro-variants/` (CONTRACT.md s3-s4), the Acknowledgements list from `log/assets.md` and `log/software.md`, the notice text from the vendored installer's own LICENSE, the version from `ios/project.yml`.

   **QA** (`qa-settings.json`): 23 frames, 0 clipped, 0 truncated, 0 text over text, 0 under 11 pt, 0 contrast fails; lowest 6.39:1 (A, 183 nodes per phone sheet, 57 on iPad) and 6.37:1 (B); none skipped. Bytes: 291,654 / 295,429 / 279,815, 8-bit palette PNGs (`tools/png_small.py`), each decoded back in Chromium at its stated size. C6 check over the 28 strings: no urgency or count word (`draw_settings.py --strings`).

   **10.1 Rows in v1.** Order top to bottom. A row exists only if its feature ships in that build (2.5.19).


<div class="tbl" role="region" tabindex="0" aria-label="Table 16: 5. Screen notes, scrolls sideways" style="--tw:1337px" markdown="1">

   | Group | Row (string id) | Shown when | Tap | Build line |
   |---|---|---|---|---|
   | (no header) | `e.settings` pywidget Pro; detail `e.settings.off`, `e.settings.on` or `set.pro.pending` | flag file `product` is not null | pushes the Pro screen in the Settings stack (s5.7.2 entry 2) | T-0031 |
   | | `link.restore` Restore purchase (accent title, no chevron) | as above | `AppStore.sync()` in place: the row dims, shows a spinner and `btn.restoring`; the result is the group's footer (`ln.restored`, `ln.none`, `set.restore.failed`). Cancelling Apple's sign-in sheet shows nothing | T-0031; review-notes-draft "Settings > [Pro] ... Restore" |
   | Editor | `e.theme` Editor theme; detail the chosen theme (`set.theme.default` or a Pro name) | `entitlements.themes.on` and a product | pushes the picker (10.3) | T-0272 |
   | Help | `set.tour` Show the tour again | always | presents the s5.6 tour from page 1 (iPhone full-screen cover; iPad 560 × 700 page sheet). Skip or the last page returns to Settings. Changes no project and does not reset "shown once" | s5.6 |
   | | `set.support` Support (trailing arrow up-right) | always | opens `[support URL]` in `SFSafariViewController` | matrix s2c (Support URL) |
   | About | `link.privacy` Privacy Policy (arrow) | always | opens `[privacy URL]`, the same URL as App Store Connect's field | matrix row 41, G11 |
   | | `link.terms` Terms of Use (arrow) | always | opens `[terms URL]`, the same URL as the Pro screen's link | s5.7 links |
   | | `set.ack` Acknowledgements | always | pushes the list (10.4) | T-0042, T-0345 |
   | page foot | `set.appear`, then `set.version` | always | none; long-press on the version: context menu Copy | |

</div>


   **Not on the screen, and why.**
   - **No Appearance switch.** It is not possible in v1, not a choice I made: creative/approved.md item 2 reads the #60 answer as "the app follows the system Light/Dark setting (no in-app theme switch)" and lists an in-app switch as not approved; ADR-004 ruling 3 picks the editor theme by trait collection. The foot line `set.appear` says where the setting lives instead.
   - **No editor preferences.** None exists in v1. Code size follows Dynamic Type (`UIFontMetrics`, ADR-004 ruling 3), the indent is the file's own unit (s3.1 item 1), soft wrap is automatic at AX sizes (s2). With `themes` off, the Editor group does not appear at all. The "Font size: Body" row in s5.7's entry-points frame (`A/B-proentry-phone.png`, frame "2 · Settings row") is wrong and this item replaces it; that frame gets redrawn the next time draw_ide.py runs (owed, Maren).
   - Nothing from 1.1: no package manager row, no sync, no network switch, no debugger.

   **10.2 States.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 17: 5. Screen notes, scrolls sideways" style="--tw:640px" markdown="1">

   | State | What shows |
   |---|---|
   | Entitlement not read yet (first frame after launch) | Pro row with an empty detail, still tappable; no spinner (`Transaction.currentEntitlements` is local) |
   | Not purchased / active / pending (Ask to Buy) | detail `e.settings.off` / `e.settings.on` / `set.pro.pending`; the Restore row stays in every state, as s5.7 keeps it on the purchased screen |
   | Restoring | frame 3: row disabled (trait `.notEnabled`), spinner, `btn.restoring` |
   | Restore result | frame 4: footer under the Pro group, and posted as a VoiceOver announcement; it clears when Settings is left |
   | Refund or revocation (`Transaction.updates`) | detail back to `e.settings.off`; a chosen Pro theme falls back to Quill and Lumen at once |
   | Offline | rows unchanged; Restore ends in `set.restore.failed`; the Pro screen shows its own offline state (s5.7.4 row 6); a web row opens Safari's own error page |
   | C3, no product (`product: null`) | frame 5: no Pro group, no Restore, no Editor group |
   | `themes` off, or a stored theme id not in `themes.items` | no Editor group; the editor uses Quill and Lumen |
   | A URL still a placeholder | does not ship: a Release-configuration unit test fails if any of the three URLs is empty, not `https`, or contains `[` (G11) |
   | Acknowledgements file missing or empty | does not ship: T-0042's UI test fails. No empty state is drawn, because an empty screen would breach the licences |

</div>


   **10.2 hook (T-1103, Pernille; for T-0657).** The Pro group asks `SettingsProRowRule.row(Facts(sellsPro: gates.sellsPro, entitlementRead:, entitled: store.isEntitled, purchasePending:, restore:))` in `pywidget/ios/App/SettingsProRowRule.swift` (in Core, `swift test`) and draws `showsProRow`, `showsRestore`, `detail` (string id `e.settings.off`, `e.settings.on`, `set.pro.pending`, or nil for an empty detail), `restoring` (disabled, spinner, `btn.restoring`) and `footer` (`ln.restored`, `ln.none`, `set.restore.failed`, or nil). The screen keeps three facts ProStore does not: `entitlementRead` (false until its first entitlement read returns), `purchasePending` (the Pro screen's last `PurchaseOutcome` was `.pending`), and `restore` (`.idle`, `.running`, `.finished(result)` with `RestoreOutcome` mapped case for case; set back to `.idle` when Settings is left). Entitled outranks pending; not read yet outranks both; a cancelled restore shows nothing; `unavailable` shows `set.restore.failed`. The Editor group, the URLs and Acknowledgements are not in it.

   **10.3 Editor theme picker** (frame 6; iPad frame 2). The free pair first (`set.theme.default`, swatch in `Quill`/`Lumen` for the frame's appearance), then `entitlements.themes.items` in file order by name (PROPOSAL-004 draft ids Ember, Fern, Graphite; only the approved ones appear). Rows 60 tall; swatch 120 wide in the theme's own colours (themes-pro/themes.json), hidden at AX sizes. Not entitled: each Pro row carries the Pro chip and pushes the Pro screen (s5.7.2 last row); back from a purchase returns to the picker and the next tap applies. Entitled: the chosen row has the check. The choice is a theme id in the app's `UserDefaults` (not the App Group; the widget extension draws no editor) and applies at once to open editors through the adapter (ADR-004 ruling 3). Footer `e.theme.foot` until Pro is active, then `set.theme.foot.on`.

   **10.4 Acknowledgements** (frames 7, 8, 10). Intro `set.ack.intro`, then the groups and rows of T-0345's resource file (group, name, version, licence name, full text) in its order; Swift hard-codes none of them. Row: name and version (body), licence name under it (footnote, secondary), chevron. Notice page: name (title3), licence name, then the full text in body type, `textSelection(.enabled)`, reflowed at every size; never monospaced, never truncated. Drawn from the logs today: Python (CPython 3.15.1 PSF-2.0; OpenSSL 3.5.9 Apache-2.0; xz 5.6.4 0BSD; zstd 1.5.7 BSD-3-Clause), Editor (Runestone, TreeSitterLanguages, Tree-sitter, tree-sitter-python, all MIT), Package installer (installer 0.7.0, MIT). **Found while drawing, for T-0345 (Odalys) and Idris:** (a) CPython and its static libraries are logged only in `log/software.md`, not `log/assets.md`, so a T-0345 script that reads assets.md rows would leave out the largest notice; Commandment 5 puts code libraries in assets.md, so I recommend Idris adds the rows there. (b) SQLite, libffi, bzip2, mpdecimal and zlib have no licence text read yet (software.md), and Tree-sitter's `lib/src/unicode/LICENSE` is unread (assets.md); each needs a row and its text before the release candidate. (c) Any package that ships under ADR-003 adds its row then.

   **10.5 Layout.**
   - **iPhone** (fourth tab): `NavigationStack` with an `.insetGrouped` `List`; large title in the display face; margins 16; rows at least 44 tall, padding 9/16; leading tile 30, radius 8, `accent.soft`, glyph 18 `accent`; trailing chevron 16 `text.tertiary` on rows that push, arrow up-right 16 on rows that open a web page, nothing on Restore (title `accent`). Group headers eyebrow, footers footnote `text.secondary`, cards `bg.surface` radius 14 with the hairline. The page foot lines are footnote `text.secondary`, centred. Bottom `contentInset` clears the floating tab bar (s1).
   - **iPad**: a "Settings" row with a gear and `⌘,` at the foot of the sidebar (s5.8) opens a 560 × 700 form sheet, the same size as the Pro sheet (s5.7.3), so the Pro screen, the picker, Acknowledgements and a notice push inside it without changing size. Inline title, Done on the right, margins 20. Esc closes (system).

   **10.6 Accessibility.**
   - Dynamic Type: every role scales. From AX1 the detail moves under the title (`ViewThatFits`), the tiles and picker swatches hide, the chevron stays at the right (frame 9; iPad portrait AX3). Notice text reflows (frame 10). Nothing truncates (qa).
   - VoiceOver: each row is one element, trait button; label the title, value the detail ("pywidget Pro, Not purchased"). Web rows add hint `set.hint.web`; the tour row `set.hint.tour`. Restore while running: value `btn.restoring`, trait `.notEnabled`; its result is posted as an announcement. Group headers trait header (rotor). The version is one element, `set.ax.version`. Acknowledgements rows read "Runestone, MIT License"; on a notice page each paragraph is one element. Picker rows: label the name, value "Pro" while locked, trait selected on the chosen one; swatches hidden.
   - Contrast as measured above; Increase Contrast uses the 7:1 sets as everywhere else. Reduce Motion: standard push and sheet only; nothing on these screens moves on its own.

   **10.7 Strings.** Generated by `draw_settings.py --strings` from `SET_STR` and the s5.7 ids it reuses (one string per meaning across both screens). Working name "pywidget" as elsewhere; question item 8's answer is one find-and-replace.


<div class="tbl" role="region" tabindex="0" aria-label="Table 18: 5. Screen notes, scrolls sideways" style="--tw:874px" markdown="1">

   | ID | String | Where | C51 |
   |---|---|---|---|
   | `set.title` | Settings | large title; fourth tab (iPhone); sidebar foot row (iPad) | DRAFT |
   | `set.pro.pending` | Waiting for approval | Pro row detail while a purchase is pending (Ask to Buy) | DRAFT |
   | `set.restore.failed` | The App Store couldn’t restore the purchase. Try Restore purchase again. (same text as `pro:ln.restoreFailed`; T-0474) | Pro group footer after a failed restore | DRAFT |
   | `grp.editor` | Editor | group header; the group exists only while `themes` is on | DRAFT |
   | `set.theme.default` | Quill and Lumen | Editor theme detail and the picker's first row: the free pair | DRAFT |
   | `set.theme.foot.on` | Each theme follows the Light and Dark setting, with a high-contrast set. | picker footer once Pro is active | DRAFT |
   | `grp.help` | Help | group header | DRAFT |
   | `set.tour` | Show the tour again | Help row: presents the s5.6 tour from page 1 | DRAFT |
   | `set.support` | Support | Help row: opens [support URL] | DRAFT |
   | `grp.about` | About | group header | DRAFT |
   | `set.ack` | Acknowledgements | About row; Acknowledgements screen title | DRAFT |
   | `set.ack.intro` | pywidget is built on open-source software. Thank you to the people who wrote it. | Acknowledgements, above the list | DRAFT |
   | `set.appear` | Light and dark follow your {device}’s setting in Display & Brightness. | page footer; {device} = UIDevice model name | DRAFT |
   | `set.version` | Version {version} ({build}) | page footer; CFBundleShortVersionString and CFBundleVersion | DRAFT |
   | `set.hint.web` | Opens a web page. | VoiceOver hint on Support, Privacy Policy, Terms of Use | DRAFT |
   | `set.hint.tour` | Shows the four tour pages again. Nothing in your projects changes. | VoiceOver hint on Show the tour again | DRAFT |
   | `set.ax.version` | Version {version}, build {build} | VoiceOver label of the version line | DRAFT |
   | `e.settings` | pywidget Pro | owned by s5.7; used here | DRAFT |
   | `e.settings.off` | Not purchased | owned by s5.7; used here | DRAFT |
   | `e.settings.on` | Active | owned by s5.7; used here | DRAFT |
   | `link.restore` | Restore purchase | owned by s5.7; used here | DRAFT |
   | `btn.restoring` | Restoring… | owned by s5.7; used here | DRAFT |
   | `ln.restored` | Restored from your Apple Account. | owned by s5.7; used here | DRAFT |
   | `ln.none` | No Pro purchase found for this Apple Account. | owned by s5.7; used here | DRAFT |
   | `e.theme` | Editor theme | owned by s5.7; used here | DRAFT |
   | `e.theme.foot` | Pro themes are previewed here. Tap one to see what Pro adds. | owned by s5.7; used here | DRAFT |
   | `link.privacy` | Privacy Policy | owned by s5.7; used here | DRAFT |
   | `link.terms` | Terms of Use | owned by s5.7; used here | DRAFT |

</div>


   **10.8 C51.** The layout is inside approved item 2; the copy is not, so the strings go to the Investors with these sheets (ops/questions.md, For the next report). *Open:* (a) review-notes-draft and store-page-draft say "Restore Purchases"; the app says `link.restore` "Restore purchase". The notes must quote the app, so they change when the string is approved. (b) There is no row that opens the app's page in iOS Settings, where location, motion and notifications are turned back on. The device-module `.fix` texts (C2-device-api) point there by words. A row would be cheap, but no build line asks for one, so Ines rules on it before I draw it.

11. **Projects as containers.** **Strings DRAFT C51.** Maren, 2026-10-31 (T-0843, an Investor on #41 c6536766504 and c6538547501; T-0887; the save rule of T-0866 is 11.7). Replaces s5.1's filter, type tiles, Pinned section and New menu, and s5.8's Library list. Layout and colour stay inside the approved tokens (creative/approved.md item 2); only the words wait on C51. Sheets: `A-parts-phone.png` (A Paper, light, 19 frames), `B-parts-phone.png` (B Studio, dark, the same 19), `A-parts-ipad.png`, `B-parts-ipad.png` (7 frames each), drawn by `draw_projects.py`, which imports draw_ide.py's frames and QA. **QA** (`qa-projects.json`): 52 frames, 0 clipped, 0 truncated, 0 text over text, 0 under 11 pt, 0 contrast fails; 1,829 text nodes checked, lowest 4.86:1, 19 skipped on B's glass. Bytes 272,940 / 297,147 / 284,997 / 292,502, each under 300 KB. Word check over 59 strings: 0 hits for "app".

   **11.1 The model.** A project is a folder, as T-0355 built it (`Documents/Scripts/<project>/`). Its files are its parts. There is no new record on disk: the code is the record, so Files, zip export and a rename stay as they are. A small reader, `ProjectParts`, sorts the files each time a list loads, using T-0748's Python scan. First match wins:


<div class="tbl" role="region" tabindex="0" aria-label="Table 19: 5. Screen notes, scrolls sideways" style="--tw:724px" markdown="1">

   | Part | Rule | Opens |
   |---|---|---|
   | **Widget** | `declaredID` finds a `Widget(` id in the file (T-0748). Its claim is the `families=` list, read the same way; no list means `["systemSmall"]`, the API's default | the editor, with Run and the preview |
   | **Script** | `pywidget.json` names it as `entry` | the editor |
   | **Shared** | another project file imports it (`import x`, `from x import`), or its first line is `# shared` | the editor; Run stays there, so nothing is lost |
   | **Script** | everything else | the editor |

</div>


   The sort is for showing only. Sending a project never reads an import line (T-0844), so a wrong row cannot break a run. `.py` files directly in the project are parts; other files and folders stay out of the lists in 1.0 but travel with the project (11.7).

   **11.2 The tab bar is settled: Projects, Gallery, Console, Settings.** Settings stays fourth, so s5.10 reads true. The third tab was drawn "Docs" in the #60 mockups and in `tabbar()`, and s5 never named it. No docs screen exists, `ops/v1_scope.json` has no row and the store page cut it (row 13), so it cannot hold a tab. Console holds it: the REPL bar, the run strip and the last run's output, with no project needed. These are built (`ReplBar`, `ConsoleTextView`); they lose their home when the editor moves inside the Projects stack. It shows the same transcript as the console sheet, one per window. The change from the approved mockup is one tab, drawn in the same tokens; it goes to the Investors on #41 with frame 14, which renders the three options. Gallery keeps the second tab under that name until T-0870 is ruled; a rename to Explore changes one word. `draw_ide.py`'s `tabbar()` now says Console; the older sheets show Docs until they are next redrawn (owed, Maren). **There is no build line for the tab bar**: at HEAD Projects is pushed from a toolbar. 11.12 counts it.

   **11.3 The Projects tab** (frames 1-5, 18). Large title, search over projects and files, the filter, then one list. The filter draws at 13 pt, the system control's size: at 15 pt "Lock Screen" does not fit a quarter of 358 pt. From AX1 it is a menu button. Newest change first; Pinned waits (it needs a record, and 1.0 has none).


<div class="tbl" role="region" tabindex="0" aria-label="Table 20: 5. Screen notes, scrolls sideways" style="--tw:739px" markdown="1">

   | View | Shows | Row |
   |---|---|---|
   | All | every project | name, "Changed …", up to 4 part tiles (24 pt, radius 7) then "+n"; opens the project screen |
   | Scripts | every Script part | file name, project name, Shortcuts chip (11.6); opens the editor |
   | Widgets | every Widget part | file name, project name, a chip for each claim; opens the editor |
   | Lock Screen | Widget parts that claim a Lock Screen size | file name, project name, a chip per size claimed; opens the editor |

</div>


   Shared files are in All and the project screen, and search finds them. **One change to the #41 sketch:** it says a part appears in each view it claims. I read Widgets as every widget, because a list called Widgets that hides a Lock Screen widget reads as a bug. So a Lock Screen-only part is in Widgets and Lock Screen. Back from a part returns to the view it came from. Long-press adds Show in Project. Empty views use the words in 11.13, no illustration. The New button opens a menu: New Project, Import Project…, Start from an Example (T-0811's iPhone entry; the Scripts and Widgets views keep the same menu).

   **11.4 The project screen** (frames 6-8). Replaces `ProjectFilesView`. Back to Projects, ⋯ (Rename, Import Files…, Export as Zip, Delete, as built). Large title, "Changed …", then groups Scripts, Widgets, Shared, each only if it has rows; three equal buttons Add Script, Add Widget, Add Shared; then the Home Screen group. Rows are 64 tall: tile 38, file name in mono, one line. The line says what the part does: a Widget's claim, a Shared file's users. Swipe and long-press keep Rename, Share, Delete. A status line appears only when something is wrong (frame 8, 11.7). At AX sizes the tiles and chevrons hide and the buttons stack.

   **11.5 One Widget part, Where It Shows** (frames 9, 11, 12). A Lock Screen widget is a size of a widget, so one part claims Home Screen, Lock Screen or both. Two parts share code through a Shared file when the layouts differ. The claim chip under the nav bar (`Home Screen + Lock Screen`, or the one it claims) opens **Where It Shows**, also on the row's long-press: a switch per place and cards for Small, Medium, Large, Circular, Rectangular, Inline. A change edits the `families=` list in the file as one undoable edit; the sheet holds no state of its own. Turning a place on selects its first size (Small, Rectangular); the last size cannot be turned off. If `families=` is not a plain list of string literals, the switches do not show and the sheet offers `where.goto`. **A limit, said plainly:** `TreeWidget` declares every family in one kind (`TreeFamilies.supported`), so a claim cannot hide a size in iOS's own widget gallery. A person can place a Lock Screen widget and choose a script that claims only Home Screen. Idris: check what the tree draws then; the claim should also filter the Edit Widget picker if the entity query can read the family **[recall]**. If it cannot, the unclaimed size needs a card in state-spec.

   **11.6 Shortcuts and Make App.** Shortcuts is something a Script part can do, not a part type, not a filter and not a tab: iOS gives no way to list or edit a person's shortcuts (L9). The Script row says `row.sc` "Runs from Shortcuts"; the flat view carries `chip.sc`. **Both appear only once T-0790 lists plain scripts in the Run Script picker**; until then the picker holds widgets only and the words would be false, so no row says it. Make App (T-0449) is the Home Screen group at the foot of the project screen, in home-setup.md's words: `menu.setup` before `pywidget.json` exists, then `menu.edit` with "Opens trip.py" and `menu.home`. The entry's row says `row.home`. home-setup.md s1's long-press menu keeps them too. The group shows only in builds with T-0449.

   **11.7 What a project save does (T-0866; decision, Maren).** **A project saves as one thing: at a boundary, if anything in the project changed, every Widget part in it gets the whole project, then one refresh.** Build from [`project-save.md`](project-save.html) (2026-11-01), which wins where it differs from this section: it adds `status.json`, finishing after the app leaves the foreground, run-file names and the widget's own marks, and it builds on T-0906.
   1. **When.** T-0747's boundaries only (Run, opening a file, Projects, a rename or delete, close, leaving the foreground), after every window has saved. Never at the pause in typing. "Changed" is a list of path, size and date for the project, compared with the list kept from the last send (`widgets/<id>/.sent.json`), so a saved sibling, a new, renamed, deleted or imported file, a fresh template and a file a script wrote all count.
   2. **What goes.** Everything in the project folder at any depth: `.py` files, package folders, data files. Not links (refused by name, as T-0844), hidden files, `__pycache__` or `pywidget.json`. The widget's own file lands as `main.py`; a project file called `main.py` stays out, as T-0844.
   3. **What goes away.** A path on the last `.sent.json` and not in this send is removed. `tree.json`, `status.json` and anything else the folder holds are not on that list and are not touched.
   4. **Budget.** `MiniZip.Limits`, 4 MiB a file and 32 MiB a project, checked from file attributes before any read (T-0881 L2). Over it, the send is refused and names the file.
   5. **All or nothing, per widget.** T-0881's rule: a refusal leaves that widget's folder as it was. One widget's refusal does not stop the others.
   6. **Refresh.** One `scriptSaved(id)` per widget per send, the open file's widget first, on the run queue. A widget file not open in an editor is sent from disk; T-0747's id tracking stays with the open editor.
   7. **A word to the person.** The widget's row carries the result (frame 8). A refusal is `st.notsent` with the reason, and the console says it. A refresh that fails after a real send is `st.fail` from `status.json`; a tap opens the file at that line. A good send clears both. Two parts with one id show `st.clash`.
   8. **`import main` stays impossible** for a widget whose file is not `main.py`: at refresh, `main` is the widget's own script, and changing that means changing the runner's contract for one rare case. The reader sees the import and shows `st.main` on the row and in the console. Templates name the file `widget.py`, so nobody walks into it.
   9. **Tests at 31b0ccf1.** `testEditedSiblingReachesTheWidgetOnlyWithItsScript`, `testRemovedSiblingStaysInTheWidget` and `testPackageFolderDoesNotReachTheWidget` invert, and so does T-0865's data file probe. `testImportOfTheProjectMainPyDoesNotReachTheWidget` stays and gains the row line.

   F3: no new row. "One file importing another" is true for widgets only with this rule; add one case, edit only a sibling, leave the editor, the widget's tree changes.

   **11.8 What New Project holds (T-0887; for Idris to build).** New Project stops being an alert. It is a sheet (frame 10): Name, then Start with **Widget** (default) or **Script**; Create opens the project screen. Keep the `projectName` and `confirmName` identifiers.
   - **Widget** writes one file, `widget.py`: the bytes of `pywidget/templates/new_widget.py`, bundled, with line 17's id and name filled in. Id: the project name lower-cased, each run of anything outside `a-z0-9` becoming `_`, trimmed; empty becomes `widget`; if the id is `new_widget` (held, T-0684), fails `WidgetID.problem`, or its key is already in `library.ids()`, append `_2`, `_3`. Name: the project name as a Python string literal, `\` and `"` escaped, control characters dropped. `families` stays `["systemSmall"]`. Creating it counts as a change (11.7 item 1), so the widget reaches the Edit Widget picker the first time the person leaves the project, with no edit.
   - **Script** writes `main.py`: `ProjectStore.template`, unchanged.
   - **One file, not all three parts.** A widget in every project adds a picker entry for projects that never wanted one, and a shared file nobody imports explains nothing. Widget is the default because a widget on the Home Screen is the first thing pywidget promises (state-spec, "View on New Project").
   - **Add Widget** (frame 11) writes `<name slug>.py`, the same template, with `families` from the sheet: Home Screen `systemSmall`, Lock Screen `accessoryRectangular`. **Add Script** writes `script.py`, next free name, with the Hello line. **Add Shared** writes `shared.py`, next free name, so:

     ```python
     # shared
     # Code here can be imported by every script and widget in this project:
     #     import shared


     def greeting():
         return "Hello"
     ```
   - **Done:** a UI test: New Project with the default, back out, the part is in Widgets, `widgets/<id>/main.py` exists and a run draws. A unit test: a list of hostile names (`"`, `\`, a newline, emoji only, `New widget`, a name already used) each gives a file whose `declaredID` is set, not held, and which Python accepts. Pernille confirms the template's API. The template's words are C51 with the rest.

   **11.9 Blocks \| Code, 1.2. Nothing of this ships in 1.0, not even dormant (2.5.19).** Frames 15-17 and iPad 6, for L17's recommendation, which Ines has not ruled on. A Builder widget is a Widget part: same project, same rows, same claim. The file pair (`trip_card.py` and `trip_card.blocks.json`) is one row. Add Widget gains Start with Blocks or Code. **The switch sits under the nav bar on iPhone, full width, and in the toolbar on iPad, where the file chips sit.** It shows only on a widget that has a blocks document: blocks compile one way (L17 s4), so a code widget has no blocks side and shows no dead switch. Blocks side: the preview well with the claim chip, then the block list. Code side: the compiled Python, read-only, the selected block's line marked, `b.ro` and `b.edit` at the foot.

   **11.10 iPad** (frames 1-7). s5.8's sidebar, with Library now All Projects, Scripts, Widgets, Lock Screen, Gallery, Console, Examples; the Shortcuts row goes. Settings stays at the foot. The tree lists a project's parts directly, with the kind's glyph. Locations stay under the tree as s5.8 and are not drawn. The project screen is two columns, Scripts and Shared, Widgets and Home Screen; one column in portrait at AX sizes. A Library row and the filter are the same state. An open Widget part keeps s5.8's preview pane; the claim chip sits under the toolbar. Where It Shows is a 540 form sheet.

   **11.11 Accessibility.** Project row, one element: "Trip Tracker, 1 script, 1 widget, 1 shared file, changed 2 minutes ago". Part row, one element: "trip_card.py, widget, Home Screen and Lock Screen", then any status line. In a flat view the project name follows the file name. Tiles and chips are hidden behind their row's label. Shape and words carry every state (warn and x-circle glyphs, never colour alone). Filter: one segmented control, a menu from AX1. Where It Shows: each switch and size card one element, trait selected; the size cards are a group under their switch. Reduce Motion: standard push and sheet only. iPhone at AX3 is frames 18-19, iPad portrait frame 7.

   **11.12 Size and date.** Read from main at c0b05d85 (`App/Projects`, `PyWidgetApp.swift`, `Tests`), not from a build and not measured. Idris has not checked it; his read is the first hour of the work. Yardstick: T-0355's 1,266 lines of `App/Projects` went from first commit to landing in about 2.4 days with two reviews (10-29 04:06 to 10-31 12:42).


<div class="tbl" role="region" tabindex="0" aria-label="Table 21: import shared, scrolls sideways" data-n="2" style="--tw:692px" markdown="1">

   | Work | Days | Note |
   |---|---|---|
   | `ProjectParts` reader over T-0748's scan, with tests | 0.5 | new |
   | iPhone tab bar: `TabView`, editor inside the Projects stack, Console tab; T-0355's UI test paths move | 1.0 | new; **no board line today**, needed by T-0191 and T-0657 anyway |
   | Projects list: All, three flat views, search | 0.75 | replaces `ProjectsView`'s list |
   | Project screen: groups, buttons, Home Screen group, status lines | 0.75 | replaces `ProjectFilesView` |
   | New Project, Add Widget, Where It Shows, `families=` edit | 0.75 | new |
   | Templates (11.8) | 0.25 | T-0887 |
   | iPad sidebar and project screen, on top of F4's sidebar | 0.5 | new |
   | Review and its fix round | 0.5 | new |
   | **New work** | **5.0** | |
   | T-0866 save rule (11.7) | 1.0 | on the board |
   | T-0881 staged send | 0.5 | on the board |
   | **Total** | **6.5** | |

</div>


   Not counted: T-0790 and T-0449, which have their own lines, and 1.2's Builder. **Date effect: Day 60 (2026-12-20) does not move.** The 5.0 new days go on the Nov 6-10 list; the working freeze (Day 21) and submit (Day 25) stand until Ines redraws the plan, and that redraw places them.

   **11.13 Strings** (`draw_projects.py --strings`). Every one is DRAFT C51. `menu.setup`, `menu.edit` and `menu.home` are home-setup.md's.


<div class="tbl" role="region" tabindex="0" aria-label="Table 22: import shared, scrolls sideways" style="--tw:839px" markdown="1">

   | ID | String (DRAFT) | Where | C51 |
   |---|---|---|---|
   | `tab.console` | Console | third tab (iPhone); Library row (iPad) | DRAFT |
   | `f.all` | All | Projects filter: one row per project | DRAFT |
   | `f.scripts` | Scripts | Projects filter: every Script part, naming its project | DRAFT |
   | `f.widgets` | Widgets | Projects filter: every Widget part, naming its project | DRAFT |
   | `f.lock` | Lock Screen | Projects filter: Widget parts that claim the Lock Screen | DRAFT |
   | `f.menu` | Showing: [view] | the filter at AX sizes (menu button) | DRAFT |
   | `search` | Search projects and files | Projects search field | DRAFT |
   | `new` | New | floating button on the Projects tab; opens the menu in s5.11.2 | DRAFT |
   | `new.t` | New Project | sheet title; menu row | DRAFT |
   | `new.name` | Name | New Project sheet, field label | DRAFT |
   | `new.start` | Start with | New Project sheet, section label | DRAFT |
   | `new.widget` | Widget | New Project sheet, the default | DRAFT |
   | `new.script` | Script | New Project sheet | DRAFT |
   | `new.foot.w` | Makes widget.py. Add a script or shared code later. | New Project sheet footer, Widget chosen | DRAFT |
   | `new.foot.s` | Makes main.py. Add a widget or shared code later. | New Project sheet footer, Script chosen | DRAFT |
   | `new.create` | Create | sheet button | DRAFT |
   | `new.cancel` | Cancel | sheet button | DRAFT |
   | `g.scripts` | Scripts | project screen group | DRAFT |
   | `g.widgets` | Widgets | project screen group | DRAFT |
   | `g.shared` | Shared | project screen group | DRAFT |
   | `g.home` | Home Screen | project screen group, Make App lives here (T-0449); rows are home-setup.md's menu.setup, menu.edit, menu.home | DRAFT |
   | `add.script` | Add Script | project screen button | DRAFT |
   | `add.widget` | Add Widget | project screen button; sheet title | DRAFT |
   | `add.shared` | Add Shared | project screen button; writes shared.py, or the next free name | DRAFT |
   | `row.sc` | Runs from Shortcuts | Script row; shown only once T-0790 lists plain scripts in the Run Script picker | DRAFT |
   | `row.home` | Opens from the Home Screen | the Script row that pywidget.json names as its entry | DRAFT |
   | `row.used` | Used by [a] and [b] | Shared row; or Used by [a], or Used by [n] files | DRAFT |
   | `row.unused` | Not imported yet | Shared row, nothing imports it | DRAFT |
   | `chip.sc` | Shortcuts | chip on a Script row in the flat view (same rule as row.sc) | DRAFT |
   | `claim.home` | Home Screen | claim, chip and line | DRAFT |
   | `claim.lock` | Lock Screen | claim, chip and line | DRAFT |
   | `claim.both` | Home Screen + Lock Screen | claim line on a Widget row; a chip in the editor | DRAFT |
   | `fam.small` | Small | Where It Shows | DRAFT |
   | `fam.medium` | Medium | Where It Shows | DRAFT |
   | `fam.large` | Large | Where It Shows | DRAFT |
   | `fam.circ` | Circular | Where It Shows | DRAFT |
   | `fam.rect` | Rectangular | Where It Shows | DRAFT |
   | `fam.inline` | Inline | Where It Shows | DRAFT |
   | `where.t` | Where It Shows | sheet title; opened from the claim chip in the editor and from a Widget row's menu | DRAFT |
   | `where.done` | Done | sheet button; the edit is already in the file | DRAFT |
   | `where.foot` | Saved in [file], line [n], as families=. | sheet footer | DRAFT |
   | `where.one` | One widget, one script, one layout per size. To show something else on the Lock Screen, add a second widget. | sheet footer, second line | DRAFT |
   | `where.code` | This widget sets its sizes in code. | sheet, when families= is not a plain list of names | DRAFT |
   | `where.goto` | Go to Line [n] | sheet button in that case; the switches do not show | DRAFT |
   | `st.fail` | Last refresh failed: [Error], line [n] | Widget row, danger; tap opens the file at that line | DRAFT |
   | `st.notsent` | Not sent: [reason] | Widget row, warning; the widget keeps what it had | DRAFT |
   | `st.big` | Over the 32 MB a widget can carry: [file] | the [reason] when the project is over budget | DRAFT |
   | `st.clash` | Same id as [file] in [project]; the later save wins | Widget row, warning | DRAFT |
   | `st.main` | A widget can’t import main.py; move that code to another file | Widget row and console line, warning | DRAFT |
   | `empty.scripts` | No scripts yet | Scripts view, empty | DRAFT |
   | `empty.widgets` | No widgets yet | Widgets view, empty | DRAFT |
   | `empty.lock` | No Lock Screen widgets yet | Lock Screen view, empty | DRAFT |
   | `empty.lock.b` | Open a widget and tap its Home Screen chip to add the Lock Screen. | Lock Screen view, empty, under the title | DRAFT |
   | `b.blocks` | Blocks | 1.2: the switch in a Builder widget's screen | DRAFT |
   | `b.code` | Code | 1.2: the switch | DRAFT |
   | `b.start` | Start with | 1.2: Add Widget sheet | DRAFT |
   | `b.add` | Add Block | 1.2: foot of the block list | DRAFT |
   | `b.edit` | Edit as Code | 1.2: Code side, the one action that leaves blocks | DRAFT |
   | `b.ro` | Written by your blocks. Read-only. | 1.2: Code side, the line above the action | DRAFT |

</div>


   **11.14 C51 and open.** The layout is inside approved item 2; the words go to the Investors with these sheets. *Open:* (a) T-0654 lets a window keep a deleted file's text as unsaved scratch. When the editor moves inside the Projects stack, back would lose that text; Idris, offer Save to `Recovered` there, and tell me if a screen is needed. (b) 11.5's check of an unclaimed size. (c) T-0790's answer sets whether 11.6's Shortcuts words ship. (d) A-projects-*, A-ipad-* and every sheet with a tab bar show the older filter or Docs until redrawn (owed, Maren).

12. **Activity, one widget's runs.** **Strings DRAFT C51.** Maren, 2026-11-02 (T-1104), for Idris's T-0048 (freeze row F9). Reads: PROPOSAL-002 s5 Logs row and its chair note (2026-10-26 02:36), state-spec s2 (the badge slot), s3 and s3.1 (cards and taps), s3.3 "What the tap opens" (1.1), ADR-007 7.1, 7.2 and 7.5, bridge-contract s7 and s8. Layout and colour stay inside the approved tokens (creative/approved.md item 2); only the words wait on C51. Sheets: `A-activity-phone.png` (A Paper, light, 12 frames), `B-activity-phone.png` (B Studio, dark, the same 12), `A-activity-ipad.png`, `B-activity-ipad.png` (4 frames each), drawn by `draw_activity.py`, which imports draw_ide.py's frames and QA and changes nothing there. The failed run is real: host CPython 3.9.6 runs the sample `trip_card.py` at draw time against a stand-in for the runner, and the finished run is the same script on good data. **QA** (`qa-activity.json`): 32 frames, 0 issues: 0 clipped, 0 truncated, 0 text over text, 0 under 11 pt, 0 contrast fails; 814 text nodes checked, lowest 4.86:1, 0 skipped. Bytes 298,657 / 285,505 / 263,632 / 283,283, each under 300 KB. Word check over 71 strings: 0 hits for "app".

   **12.1 What it is, and what it is not.** One screen per widget id: every run of that widget in the last 14 days, newest first, each with its output and traceback. v1 holds the list, the Failed filter, the run detail, Export through the share sheet, and Clear Activity. **Not in v1:** "Run as widget" and the entry stepper (1.1 with T-0192, Ines 2026-10-27 10:05, T-0441); the network-off switch (1.1, chair note 2026-10-26 02:36); interval statistics and trigger shares (1.1, PROPOSAL-002 s5); the taps-off banner and "Clear {n} failed runs" (1.1 with L5's `state.json`, 12.9). **Never:** a traceback, a message or any output on a widget. The app shows them here; a widget shows at most the type, the file and the line (state-spec s3). Rows come from widget runs only (`context: .widget`), from every trigger. A preview run writes no row (contract v5, s5.9.3). Neither does a console run of the same file (the console shows it) or a `getTimeline` row (L2 s3.3 `system`, estimator data for 1.1).

   **12.2 Ways in, and the one route.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 23: import shared, scrolls sideways" style="--tw:888px" markdown="1">

   | From | Opens on | How |
   |---|---|---|
   | Widget editor ⋯ menu, `menu.activity` (frame 1); a Widget row's long-press menu (s5.11.4) | All | push |
   | Badge slot, medium and larger (state-spec s2) | Failed | `pywidget://open?widget=<id>&view=activity&show=failed` |
   | Small widget with the badge, when the script set no `widgetURL` (s2) | Failed | the same |
   | Too-big card (s3.1) | All | `pywidget://open?widget=<id>&view=activity` |
   | Error card (s3) | not here: the editor at the line | `pywidget://open?widget=<id>&line=<n>`, unchanged |
   | 1.1 taps off (s3.3) | Failed, with s3.3's banner | the badge route |

</div>


   **One route answers s3.1 and s3.3** ("must become one route, Idris names it"): `pywidget://open?widget=<id>&view=activity`, with an optional `show=failed`. Any other `show` value opens All. It is unsigned because it only opens a screen (L5 s7.2). The id is checked with `WidgetID.problem` before use (contract v4.2 Swift item 4). At HEAD there is no `onOpenURL` anywhere in `App/` (grep, 2026-11-02), so T-0048 adds the handler for both routes. The stack is Projects → project → widget editor → Activity, so Back always goes to the widget's editor, and a link from a cold launch builds the same path. A deleted or renamed widget still opens Activity on the rows kept under its id, titled with the id: `act.open` hides and the strip adds `st.gone`. An id with no rows opens the empty state.

   **12.3 iPhone layout** (frames 2, 3, 6-8). A pushed screen. Nav: back with the widget's file name (the system truncates it if it must), the title `nav.title`, and a share button (`nav.export`) at the trailing end, hidden when there are no rows. Below that, one scroll view with 16 pt margins, top to bottom:
   1. **Status strip** (the s3 component), read from `status.json`: `st.fail` in `status.danger` with `failing_since`, type and line; `st.ok` in `status.success` with the last run's time; `st.big` in `status.warning`; `st.none` in `text.secondary`. It says what the widget shows now, so it matches the badge.
   2. **Primary button**, only while failing: `act.open`, which opens the editor at that line by the error card's route. In the too-big state it is `act.open.big`. One primary per screen.
   3. **Filter**: a segmented control, `f.all` and `f.failed` followed by the count of failed rows in 14 days (no count at 0). Not drawn in the empty state. The badge route selects Failed.
   4. **The 14-day note** `note` (footnote, secondary). From AX1 it moves below Clear Activity, so the rows come sooner.
   5. **Day groups**: an eyebrow (`day.today`, `day.yday`, then the locale's short weekday and date, e.g. "Fri, Oct 30") over a card of rows, newest first.
   6. **Clear Activity** (`clear`, `status.danger`), in its own card under the last group, hidden with no rows. It asks first (frame 10, `clear.t`, `clear.m`, `clear.ok` destructive, `clear.no`). It deletes this widget's rows and their output, nothing else: `status.json`, `tree.json` and the badge stay, and the next run decides the badge.

   **Row:** at least 60 tall. A 20 pt glyph at the leading edge, 14 pt from the top. Line 1: the reason (body) and, trailing on the same baseline, the time (subheadline, secondary, tabular). Line 2 (footnote, secondary): trigger · duration. The duration is left out where none was measured (`deferred`, `busy`, `killed`). Then a chevron. A tap opens the run detail. No swipe-to-delete in v1: Clear is the one removal (the smallest version). **<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>:** a row whose `lane` is `widget` carries the chip `lane.widget` after line 2. The extension lane flag is off in every Release build (`LaneGuard.swift:16`), so in v1 no row ever shows it and no app-lane row carries a chip, because the app is the default. The detail's "Ran in" fact always names the lane.

   **12.4 Outcomes** (T-1798, Maren, 2026-11-04; read at HEAD 09645bfb8 from `RunOutcomeWord` in RunRow.swift, WidgetStatus.swift, Shared/Bridge/WidgetRunLog.swift, Shared/ExtensionLane.swift and RunLogRecorder; supersedes the T-1104 table). Every word the code writes on a row, with its glyph, row reason and filter. The filter reads `RunOutcomeWord.failed`. Strings DRAFT C51. Frames 13-18: `A-activity-outcomes-phone.png`, `B-activity-outcomes-phone.png`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 24: import shared, scrolls sideways" style="--tw:1374px" markdown="1">

   | Outcome (writer) | Glyph and colour | Row reason | In Failed | Detail line / adds |
   |---|---|---|---|---|
   | `ok` (both lanes) | `checkmark.circle.fill`, `status.success` | `o.ok` | no | output |
   | `error` (both lanes) | `xmark.circle.fill`, `status.danger` | `o.error` with the bridge's type, or `NoTree` → `o.notree`, `schema_error` → `o.schema`, `InternalError` → `o.internal` | yes | output, traceback card |
   | `timeout` | as error | `o.timeout` | yes | the frame at the stop |
   | `stuck` (run, or launch recovery) | as error | `o.stuck` | yes | the frame, if known |
   | `killed` (launch recovery) | as error | `o.killed` | yes | `d.killed.bg` with `backgrounded`, else `d.killed.mem` |
   | `killed`, `lane_outcome=demoted`, `reason=marker` (widget) | as error | `o.killed` | yes | `d.moved.kill`, then the 12.4.3 card |
   | `tree_too_large` (recordRenderFaults; no trigger) | s3.1's glyph, `status.warning` | `o.big`, line 2 `t.draw` | yes | `d.big`; Started by hides |
   | `deferred`, editor_save yielded to Run (T-1681, no error named) | `clock`, `text.secondary` | `o.waited` | no | `d.wait.run`, `d.noran` (frame 15) |
   | `deferred`, `lane_outcome=late`, `reason=no_time` | as above | `o.waited` | no | `d.wait.time`, `d.noran` |
   | `deferred`, `lane_outcome=late`, `reason=gave_way` | as above | `o.waited` | no | `d.wait.turn`, `d.noran` |
   | `deferred`, `lane_outcome=closed` | as above | `o.waited` | no | `d.wait.stop`, `d.noran` |
   | `busy` | as above | `o.waited` | no | `d.wait.busy`, `d.noran` |
   | `oom_guard`, `lane_outcome=oom_guard` | `clock`, `text.secondary` | `o.lowmem` | no | `d.mem.skip`, `d.noran` (frame 14) |
   | `oom_guard`, `lane_outcome=demoted`, `reason=refused` | as above | `o.moved` | no | `d.moved.mem`, `d.noran`, the 12.4.3 card (frame 18, AX5) |
   | any word with `lane_outcome=deadline` | the word's own | the word's own | the word's | `d.late.show` first (frame 17) |
   | `expired` | `clock`, `text.secondary` | `o.expired` | no | **never written at HEAD**: `recordExpiry` has no caller (T2 not built) |
   | `conflict` | | | | **never written**: reserved word only |
   | `entitlement_lost` | no row: not a run (a locked premade logs nothing) | | | |

</div>


   **The oom_guard badge (T-1714).** From the second skip in a row, `status.json` badges a stale picture, but no oom_guard row is in Failed (nothing in the script failed). So while `last_outcome` is `oom_guard` with the badge, the strip reads `st.mem` · `st.mem.d` in `status.warning`, and `show=failed` opens **All**, so the badge's screen always holds the rows that set it (frame 13). Every other state keeps 12.2's route. Idris: confirm in T-0048.

   **12.4.1 Triggers** (line 2 and Started by). Written at HEAD: `app_foreground` → `t.open`; `editor_save` → `t.save`; `shortcut` → `t.sc` (T-1716, the Refresh Widgets intent); `system` → `t.sys` (every in-widget turn, and a run whose bridge info has none); no trigger → `t.draw` (too-big rows only). Recovery rows carry the crashed run's trigger. **Never written at HEAD:** `bg_refresh` (`t.bg`, which frames 2-11 still show in their sample rows), `intent`, `location_wake`, `push`, `widget_action`, `control`, `deep_link`.

   **12.4.2 In-widget rows.** The extension writes `deferred`, `killed`, `oom_guard`, its runs' own words, and `lane_outcome=deadline`. Each carries `lane.widget` on line 2 and `d.where.w` as Ran in. The lane flag is off in Release (LaneGuard.swift:16), so v1 shows none of them.

   **12.4.3 Lifting a move (T-1643, not built).** Where: a card `lift.t` under the status strip while the widget is moved to [appname] (frame 16), and the same card on the row that moved it (frame 18). What it says: `lift.wait` until a run in [appname] ends `ok`; then `lift.b` and one secondary button `lift.go`. The tap is the person's say-so: `LaneDemotions` drops the id and the body becomes `lift.done`, with no button. If it fails in the widget again, it moves back by the usual rule and the card returns. No alert: the <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> is easy to undo.

   **The Failed set is exactly ADR-007 7.1 rows 3 and 4** (error card and badge), so the list the badge opens always holds the run that set it. Not-failed rows sit in grey and never turn the strip red.

   **12.5 Run detail** (frames 4, 5, 12; the iPad's right column). Nav title `d.title` (e.g. "Today, 4:40 PM"). Its share button exports this one run in 12.7's format, as `trip_card-run-2026-11-02-1640.txt`. Header: a 28 pt glyph, the reason (title 3), then `d.failed` · trigger for a failed run, or the trigger alone. **Facts** card: `d.by`, `d.took`, `d.where` (`[appname]`, or `d.where.w` for the extension lane), `d.mem` (hidden when the peak is unknown). At AX sizes each fact stacks label over value. **Output** (`d.out`): console mono on `bg.console`, stdout and stderr in write order. stderr is not tinted, because the traceback has its own card. The traceback's own text is left out here, since the card shows it. Empty: `d.noout`; cut: `d.cut` as the first line; older than the newest 100: `d.nokept`. **Traceback** (`d.tb`): the s3 Traceback card, built from the same view the console uses: type, message, `d.yours`, `d.start` on the innermost user frame, library frames folded into one row labelled as 12.5.1 says, the repeat count and the frames-not-kept line of 12.5.1, Structured / Raw. Then `d.goto` (primary) and `d.copy` (the traceback text). If the file's modification date is later than the run's `ts`, Go to Line still jumps to the line but shows `d.changed` and draws no column underline (contract s8 "Stale positions"; `run_id` cannot be compared across launches, 12.8).

   **12.5.1 Traceback card copy** (T-1873, Maren, 2026-11-03; from `TracebackFold.Folded` at 52702d72d; review T-1829). Every word below is a 12.12 key, DRAFT, and goes to the Investors with the 12.13 sheets. T-0389 uses these keys and no other words: `d.yours`, `d.start`, `d.rep`, `d.rep.ax`, `d.lib`, `d.lib.one`, `d.lib.pkg`, `d.lib.pkg.one`, `d.lib.own`, `d.lib.own.one`, `d.lib.mix`, `d.lib.eg`, `d.lib.hint`, `d.lib.hint.one`, `d.omit`, `d.omit.one`, `d.goto`, `d.copy`, `d.changed`. A key ending `.one` is the plural "one" variant of the key before it, one String Catalog entry with two variants; the plain key is "other". English has only these two; other languages take their own categories from the catalog.
   - **Numbers.** Every `[n]` is the integer formatted for the locale (`n.formatted()`: 994, 1,994, 12,000 in en-US), never abbreviated (no "12K"), so it can be checked against Raw. Digits are monospaced (`.monospacedDigit()`). A long number wraps the line; it never truncates.
   - **(a) Repeat count.** A user-frame row with `repeats` of 2 or more shows `d.rep` after its file and line, in `text.secondary`: `walk  main.py:2  × 994` for the deep_recursion fixture, the same 994 that Raw's three printed lines plus "[Previous line repeated 991 more times]" make. `repeats` 1 shows nothing. `d.start` stays where s3 puts it on the innermost row; when that row repeats, both show. At 390 pt or AX sizes the count wraps below the file and line with the row's other text. VoiceOver: the row is one element, label `{function}, {file} line {N}` (a11y-labels `con.tb.frame`), then `d.rep.ax` when it repeats (`walk, main.py line 2. Repeated 994 times in a row.`), with "Start here." first on the innermost row as before.
   - **(b) Frames not kept.** When `Folded.omitted` is 1 or more, the frame list ends with one plain line under the folded row: `d.omit` (or `d.omit.one`), e.g. "37 frames from the middle not kept". `text.secondary`, no chevron, no tap, no jump; VoiceOver reads the text as static text. `omitted` is 0 when the cut sits inside one repeated row (the count went into `repeats`, case a) and after a SyntaxError; then no line. The string names no 50 or 100: those are runner.py's numbers, and they can change without a copy change.
   - **(c) The folded row's label** (Odalys, T-1829: `d.lib` alone was untrue when the row held site-packages or bundled frames). From the three counts: only `stdlib` above 0, `d.lib`; only `sitePackages`, `d.lib.pkg` (the packages bundled for import, 7.6 `row.packages.l`); only `bundled`, `d.lib.own` (the runner and anything else that ships inside [appname]; the runtime's `internal` kind counts here); two or three above 0, `d.lib.mix` with n = `folded`. All 0: no row. Each takes `.one` when its n is 1. Then `d.lib.eg` from `innermostLibrary`: its name as CPython gave it (`<module>` stays as written) and the last part of its path, e.g. "1 frame in the standard library (mean, statistics.py)". When the row is expanded and the label was `d.lib.mix`, each place above 0 gets its own line with its own key and count, in the order standard library, packages, [appname]. VoiceOver: label the visible text, hint `d.lib.hint` (`d.lib.hint.one` for 1); expanded or collapsed is the disclosure's own value.
   - **Not decided here:** whether Raw's text keeps the frames the runner cut. Until T-0389 checks it on the device, no string says "see Raw".

   **12.6 iPad** (iPad sheet). Activity takes the content column in place of the editor and its right pane. Landscape: the list is 400 pt wide with a hairline on its right, and the selected run fills the rest (frame 1). The newest row in the current filter is selected on open, and the selected row is `accent.soft`. The nav is 50 tall with 20 pt margins. Export is a popover on the share button (frame 2). The empty state is centred, 520 pt wide (frame 3). Portrait and Split View narrower than 700 pt: one column, at most 680 pt, centred, where a row pushes the run as on iPhone (frame 4, AX5). Back returns to the editor with its pane as it was.

   **12.7 Type, numbers, Export.**
   - Tabular figures on times, durations and counts. A number never breaks from its unit or its word ("0.05 s", "line 13", "3:58 PM" take a no-break space; draw_activity.py's `keep()`).
   - Times use the locale's short time style. Days: Today, Yesterday, then the short weekday and date. Durations: two decimals under 1 s, one decimal from 1 s. Memory: whole MB.
   - **Export is the share sheet and nothing else** (PROPOSAL-002 s5): `ShareLink`/`UIActivityViewController` with one file written to the temporary folder and deleted when the sheet closes. There is no mail composer, no upload and no "send to developer". Nothing leaves the device without that tap, which matches the privacy label draft (no data collected). The file is plain UTF-8 text named `x.file` (`trip_card-activity-2026-11-02.txt`, or `trip_card-failed-runs-2026-11-02.txt` with Failed on). It holds the runs the list shows, newest first. First line: `[appname] activity: <id> (<project>)`. Second line: the export time, the run count and the date range, with the device's UTC offset. Then one block per run: an ISO time with offset, outcome, reason, trigger, lane, duration and peak MB on one line, then `--- output` and the kept output, then `--- traceback` and the error's `text` (contract s8, bundle paths already shortened). A row whose output is gone says so in one line.

   **12.8 Data: what the screen reads, and what HEAD holds** (a6b390ba..b11fe55b, read 2026-11-02). **Neither file exists yet.** `status.json` is named only in comments (`RunResultSink.swift:9`, `:140`; project-save.md, opening list), and `log/runs.jsonl` "when they exist" (`LaneGuard.swift:203`). No product screen starts a `.widget` run yet (`WidgetRunView.swift:10`), T2 is not built (ADR-007 5.1), and nothing keeps a run's output after the console shows it. So this table is the build list, not a reading of files that exist:


<div class="tbl" role="region" tabindex="0" aria-label="Table 25: import shared, scrolls sideways" style="--tw:846px" markdown="1">

   | Screen field | File and key | At HEAD |
   |---|---|---|
   | strip state, failing since | `widgets/<id>/status.json`: `last_outcome`, `failing_since`, `error_type`, `line`, `ts` | not written; T-0866 writes the smallest version (project-save.md s3 item 1), T-0198 adds `expired_runs` |
   | time | row `ts` in `log/widgets/<id>/runs.jsonl` (one file per widget; 7.5) | no row writer |
   | outcome | row `outcome`, 7.2's words | `WidgetRunOutcome.Kind`: `ok`, `error`, `timeout`, `stuck`, `busy`; nothing yet produces `killed`, `expired`, `deferred`, `oom_guard` or `tree_too_large` |
   | reason type | row `error_type` (**new**; 7.5 has none) | `WidgetRunOutcome.errorType` exists |
   | line, file | row `line`, `file` (**new**): the innermost `user` frame of the contract s8 `error`, or the `syntax` position | in `bridge-outcome/1`; `WidgetRunOutcome` carries no line |
   | trigger | row `trigger`: L2's values plus **`editor_save`** (new; a save is <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> but reads differently) | no trigger recorded |
   | lane | row `lane`, `app` or `widget` (**new**) | flag off in Release |
   | duration | row `duration_ms` from `duration_s` | in `bridge-outcome/1` |
   | memory peak | row `peak_mb` (7.5) | not sampled |
   | killed copy | row `backgrounded`, true or absent (**new**) | in the crash marker (contract s7) |
   | output, traceback | `log/widgets/<id>/out/<row>.json` (**new**; ADR-007 chair line 2026-11-02 17:15): `output` as `[stream, text]` pairs, the last 16 KiB cut at a line boundary, with `cut: true`; `error` as the bridge sent it (message at most 4 KiB, at most 100 frames, `text` for Copy and Export); the whole file at most 24 KiB; none for `deferred`, `busy` or `oom_guard` | stdout and stderr records exist during the run only |

</div>


   **Row key.** `run_id` is Swift's increasing counter (contract s3), and the contract does not say it survives a relaunch. So each row carries `row`, a UUID, and the detail file is named by it. If Idris makes `run_id` unique across launches, key by that and drop `row`. **Retention:** rows older than 14 × 24 h, and their detail files, are deleted at launch and before each append. Details are kept for the newest 100 rows per widget and older ones are deleted (the row stays, with `d.nokept`). If `log/` passes 24 MiB, the oldest detail files across all widgets are deleted at launch until it is under, rows stay, and those rows also say `d.nokept`. `d.nokept` reads "Only recent runs keep it", true for both the 100-row cut and the 24 MiB trim. Worst case is about 3.4 MiB per widget. A widget's row, its detail file and its `status.json` are written in that order in one hold of that widget's `state.lock` (LaneGuard.swift:203's rule); `runs.jsonl` is per widget because one shared file would sit under many locks. Console runs write rows to `log/console.jsonl` and are **not listed in Activity**. **Ruled (Ines, ADR-007 chair line 2026-11-02 17:15, T-1138):** yes; the new keys and the per-widget log layout are accepted, Swift writes every key, and the detail kept is what this table says. The refusal path is gone, and the screen may claim each run's stdout, stderr and traceback for 14 days.

   **12.9 1.1, so the build leaves room.** When L5 ships, s3.3's banner sits above the strip, and its "Clear {n} failed runs" replaces `act.open` as the second action under it. Its rows read `failed.jsonl`. The route and the Failed filter do not change.

   **12.10 Accessibility.**
   - **VoiceOver order:** Back, title, Export; the strip as one element ("Failing since 3:58 PM. ValueError, line 13."); the primary button; the filter (the system segmented control); the 14-day note; then for each day its header (trait `.isHeader`, so the rotor's Headings jumps by day) and its rows; Clear Activity last.
   - **A row is one element.** Label: "4:40 PM. Failed. ValueError, line 13." for a failed run, "Finished" or the not-failed reason otherwise. Value: trigger and duration ("Background refresh, 0.06 seconds"). Hint: "Opens the run." The glyph is hidden; its meaning is in the label. The lane chip, when shown, joins the value.
   - **Detail order:** the header, each fact as one element (label and value), the output as one text view the reader can move through by line, then the traceback card in s3's order and its two buttons.
   - **Dynamic Type to AX5** (frames 11 and 12, iPad frame 4): from AX1 the filter is a menu button (`f.menu`), a row stacks time over reason over trigger and duration, glyphs grow with the text, buttons wrap and go full width, facts stack, and console text clamps at 32 pt (s2). The nav title and the share button do not scale; they use the Large Content Viewer.
   - **Colour:** no state is told by colour alone. Glyph shape and the reason word carry it, and a failed row reads apart from a waited one in grey. Contrast is measured in QA above; Increase Contrast uses the tokens' 7:1 pairs.
   - **Motion:** only the system push and sheet, so Reduce Motion needs nothing of ours.

   **12.11 What T-0048 shows in the Simulator** (its done condition, for this screen): iPhone and iPad, light and dark: All while failing; Failed from the badge route; a failed run's detail; a finished run with output; working; Failed with none; no runs; the share sheet; the Clear alert; AX5 list and detail. Plus one row of each outcome in 12.4 that a fixture can make (`ok`, `error`, `timeout`, `NoTree`, `deferred` at least).

   **12.12 Strings** (from `draw_activity.py --strings`; `[appname]` is `CFBundleDisplayName`, read at run time):


<div class="tbl" role="region" tabindex="0" aria-label="Table 26: import shared, scrolls sideways" style="--tw:846px" markdown="1">

   | ID | String (DRAFT) | Where | C51 |
   |---|---|---|---|
   | `nav.title` | Activity | nav title; the back button carries the widget's file name | DRAFT |
   | `nav.export` | Export | accessibility label of the share button, top right; opens the share sheet | DRAFT |
   | `menu.activity` | Activity | row in the widget editor's ⋯ menu and in a Widget row's long-press menu | DRAFT |
   | `note` | Runs from the last 14 days. Kept on this [device], never sent anywhere. | under the filter; [device] is iPhone or iPad | DRAFT |
   | `f.all` | All | filter | DRAFT |
   | `f.failed` | Failed | filter; the count follows in the segment, e.g. Failed 5 | DRAFT |
   | `f.menu` | Showing: [view] | the filter at AX1 and up (menu button), as s5.11's f.menu | DRAFT |
   | `st.ok` | Working | status strip word; detail st.ok.d | DRAFT |
   | `st.ok.d` | Last run [time] | status strip detail | DRAFT |
   | `st.fail` | Failing | status strip word, status.danger; detail st.fail.d | DRAFT |
   | `st.fail.d` | since [time] · [Error], line [n] | status strip detail; [time] is failing_since | DRAFT |
   | `st.big` | Too big to draw | status strip word, status.warning (state-spec s3.1) | DRAFT |
   | `st.big.d` | The script ran fine · [time] | status strip detail | DRAFT |
   | `st.none` | Not run yet | status strip word, text.secondary | DRAFT |
   | `st.gone` | File not found | appended to the strip detail when the widget's file is gone; the primary button hides | DRAFT |
   | `act.open` | Open [file] at Line [n] | primary button while failing (one primary per screen) | DRAFT |
   | `act.open.big` | Open [file] | primary button in the too-big state; there is no line | DRAFT |
   | `day.today` | Today | day header | DRAFT |
   | `day.yday` | Yesterday | day header; older days are the short date, e.g. Fri, Oct 30 | DRAFT |
   | `o.ok` | Finished | row reason, outcome ok | DRAFT |
   | `o.error` | [Error], line [n] | row reason, outcome error (no line known: [Error] alone) | DRAFT |
   | `o.notree` | No widget drawn | row reason, error type NoTree (the script ended or exited 0 before it built its widget) | DRAFT |
   | `o.schema` | View could not be read | row reason, error type schema_error (the tree failed the schema) | DRAFT |
   | `o.internal` | Internal error | row reason, error type InternalError | DRAFT |
   | `o.timeout` | Took too long | row reason, outcome timeout | DRAFT |
   | `o.stuck` | Would not stop | row reason, outcome stuck | DRAFT |
   | `o.killed` | Closed while it ran | row reason, outcome killed | DRAFT |
   | `o.big` | Too big to draw | row reason, tree_too_large | DRAFT |
   | `o.expired` | Cut short by iOS | row reason, outcome expired (not a failure) | DRAFT |
   | `o.waited` | Waited for the next run | row reason, outcome deferred or busy (not a failure) | DRAFT |
   | `o.lowmem` | Skipped: memory was low | row reason, outcome oom_guard (not a failure) | DRAFT |
   | `t.open` | When [appname] opened | trigger app_foreground (T1) | DRAFT |
   | `t.save` | After a save | trigger editor_save (T1 from the editor's save) | DRAFT |
   | `t.bg` | Background refresh | trigger bg_refresh (T2) | DRAFT |
   | `t.sc` | From Shortcuts | trigger shortcut (T3 Refresh Widgets, T4 Run Script) | DRAFT |
   | `lane.widget` | In widget | chip on a row that ran in the extension lane; only when the lane flag is on | DRAFT |
   | `clear` | Clear Activity | last row of the list, status.danger | DRAFT |
   | `clear.t` | Clear Activity? | alert title | DRAFT |
   | `clear.m` | Every run of [widget] and its output is deleted from this [device]. The widget keeps what it shows. | alert message | DRAFT |
   | `clear.ok` | Clear | alert, destructive | DRAFT |
   | `clear.no` | Cancel | alert | DRAFT |
   | `empty.t` | No runs yet | empty state title (All) | DRAFT |
   | `empty.b` | Each time [widget] runs, it shows here: when [appname] opens, after a save, when iOS refreshes it, or from Shortcuts. | empty state body; drop 'when iOS refreshes it' from any build without T2 | DRAFT |
   | `emptyf.t` | No failed runs | empty state title (Failed) | DRAFT |
   | `emptyf.b` | None in the last 14 days. | empty state body (Failed) | DRAFT |
   | `d.killed.bg` | iOS closed [appname] in the background. | run detail line under the header, killed with backgrounded (ADR-007 7.2 copy) | DRAFT |
   | `d.killed.mem` | Closed while it ran, possibly out of memory. | run detail line, killed without backgrounded (ADR-007 7.2 copy) | DRAFT |
   | `d.big` | Its view is more than a widget can hold in memory. The script ran fine. | run detail line, tree_too_large (state-spec s3.1) | DRAFT |
   | `d.changed` | This file changed since the run. | shown with Go to Line when the file is newer than the run (contract s8) | DRAFT |
   | `d.title` | [day], [time] | run detail nav title, e.g. Today, 4:40 PM | DRAFT |
   | `d.failed` | Failed | run detail, word under the reason for a failed run | DRAFT |
   | `d.by` | Started by | run detail fact | DRAFT |
   | `d.took` | Took | run detail fact; seconds, two decimals under 1 s, one above | DRAFT |
   | `d.where` | Ran in | run detail fact: [appname], or The widget (lane) | DRAFT |
   | `d.where.w` | The widget | value of Ran in for an extension-lane run | DRAFT |
   | `d.mem` | Memory peak | run detail fact, MB; hidden when unknown | DRAFT |
   | `d.out` | Output | run detail section; stdout and stderr in write order | DRAFT |
   | `d.noout` | Nothing was printed. | run detail, Output section, empty | DRAFT |
   | `d.cut` | Output cut to its last 16 KB. | run detail, first line of a cut output | DRAFT |
   | `d.nokept` | Output no longer kept. Only recent runs keep it. | run detail, Output section, for an older row | DRAFT |
   | `d.tb` | Traceback | run detail section | DRAFT |
   | `d.yours` | Your code · innermost first | traceback card label, as the s3 traceback card | DRAFT |
   | `d.lib` | [n] frames in the standard library | folded row when every folded frame is stdlib; expands on tap (12.5.1) | DRAFT |
   | `d.lib.one` | 1 frame in the standard library | d.lib, plural one | DRAFT |
   | `d.lib.pkg` | [n] frames in packages | folded row when every folded frame is site-packages (12.5.1) | DRAFT |
   | `d.lib.pkg.one` | 1 frame in a package | d.lib.pkg, plural one | DRAFT |
   | `d.lib.own` | [n] frames in [appname] | folded row when every folded frame is bundled (12.5.1) | DRAFT |
   | `d.lib.own.one` | 1 frame in [appname] | d.lib.own, plural one | DRAFT |
   | `d.lib.mix` | [n] frames outside your code | folded row when two or more places hold frames; n is always 2 or more (12.5.1) | DRAFT |
   | `d.lib.eg` | ([function], [file]) | after the folded row's label: the innermost folded frame, file as its last path part | DRAFT |
   | `d.lib.hint` | Shows them. | VoiceOver hint of the folded row | DRAFT |
   | `d.lib.hint.one` | Shows it. | d.lib.hint, plural one | DRAFT |
   | `d.rep` | × [n] | after file and line on a user-frame row when repeats is 2 or more (12.5.1) | DRAFT |
   | `d.rep.ax` | Repeated [n] times in a row. | VoiceOver, appended to that row's label; n is always 2 or more | DRAFT |
   | `d.omit` | [n] frames from the middle not kept | last line of the frame list when Folded.omitted is 1 or more (12.5.1) | DRAFT |
   | `d.omit.one` | 1 frame from the middle not kept | d.omit, plural one | DRAFT |
   | `d.start` | Start here | tag on the innermost user frame | DRAFT |
   | `d.goto` | Go to Line [n] | run detail primary | DRAFT |
   | `d.copy` | Copy | run detail; copies the traceback text | DRAFT |
   | `x.file` | [widget]-activity-[date].txt | export file name; with Failed on: [widget]-failed-runs-[date].txt | DRAFT |
   | `x.run` | [widget]-run-[date]-[hhmm].txt | file name when one run is exported from its detail | DRAFT |
   | `a11y.row` | [time]. [state]. [reason]. | VoiceOver label of a row; [state] is Failed for a failed run, left out otherwise | DRAFT |
   | `a11y.hint` | Opens the run. | VoiceOver hint of a row | DRAFT |
   | `x.kind` | Plain Text · [size] | share sheet header line (system) | DRAFT |

</div>


   **12.13 C51 and open.** The layout is inside approved item 2; the words go to the Investors with these sheets. *Open:* (a) Closed: Ines ruled yes on the ADR-007 7.5 chair line, 2026-11-02 17:15 (T-1138; per-widget `log/widgets/<id>/`). (b) Idris: glyph names in 12.4 are recalled, confirm them; the too-big glyph is drawn as a triangle stand-in and ships as s3.1's. (c) Closed: rows are keyed by `row`; `run_id` stays a per-launch counter and is never compared across launches (same chair line). (d) `empty.b` names background refresh; a build without T2 drops that clause.

## 6. Open

- ~~AX3 and xxxLarge sizes are recalled, not read from Apple.~~ Closed 2026-11-04 (T-1443): read from Apple's typography.md (`research/inbound/apple/developer.apple.com/design_human-interface-guidelines_typography.md-ac22ffc4.html`); three AX3 title sizes and eight leadings corrected, sheets redrawn (s2).
- iOS 26 alert, sheet and tab bar shapes are drawn as I understand them; the system draws the real ones and wins.
- Copy uses the working name "pywidget"; the name is the Investors' call.
- Direction A or B: the Investors' pick (C51). Nothing here ships until it is approved.
{% endraw %}

</div>
