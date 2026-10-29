---
layout: "default"
title: "pywidget design system v0 (C13)"
section: "documents"
description: "Constraint I am keeping on purpose: one token file feeds the app (generated asset catalog and a Theme struct), the website (generated CSS custom properties) and the premade widgets. No colour ships that is not a token."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/design-system-v0.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/design/design-system-v0.md</code></span></div><h1>pywidget design system v0 (C13)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-25; appearances added 2026-10-26. Status: **direction approved** (creative/approved.md item 2, #60, an Investor 2026-10-25 23:59 ET: "Keep both themes as light-mode and dark-mode options"). The app's **light appearance is A Paper and its dark appearance is B Studio**, following the system Light/Dark setting. Icon, App Store screenshots and store copy are not approved and come back as their own proposals.

Source of truth: `tokens.json` (this folder; the `appearances` block maps light and dark). `appearance.py all` resolves it into `tokens-app.json` (four sets with the same keys: light, dark, lightHC, darkHC), the asset catalog `pywidget/ios/Shared/Theme.xcassets` and `tokens.css`. Contrast is checked by script, not by eye: `python3 pywidget/docs/design/check_tokens.py` checks 820 pairs, 0 below their floor (336 direction pairs as before, plus 484 for the four shipped sets), and fails if the catalog or the CSS is stale. Mockups: `mockups/draw.py` renders 10 PNGs and writes `mockups/qa.json`: all 10 screens report 0 on each check. Previews of the four sets and of the dark widget in the stripped modes: `preview_appearances.py OUTDIR` (PNGs on the design-previews branch, `appearances/`).

Constraint I am keeping on purpose: one token file feeds the app (generated asset catalog and a `Theme` struct), the website (generated CSS custom properties) and the premade widgets. No colour ships that is not a token.

## 1. Principles

1. **The code is the hero.** Chrome recedes; the editor, the console and the user's widget get the contrast and the space.
2. **System first.** Navigation bars, tab bars, sheets and menus are the iOS 26 system components, so the Liquid Glass chrome comes from Apple and stays current. We theme content, not chrome.
3. **Identity in type, not only in colour.** Colour is stripped in accented, vibrant and clear widget modes. A widget's voice has to survive in grey: one hero number in the direction's display face.
4. **Readable in grey first.** Every state has a shape or text cue as well as a colour (lint squiggle plus label, run dot plus word).
5. **Measured, not judged.** Contrast, fit and clipping are scripts in this folder.

## 2. Colour

### 2.0 The two appearances (approved, #60)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2.0 The two appearances (approved, #60), scrolls sideways" style="--tw:958px" markdown="1">

| | Light | Dark |
|---|---|---|
| Colour set | `color.A.light` (Paper) | `color.B.dark` (Studio) |
| Syntax theme | Quill light | Lumen dark |
| Display face (titles, widget hero numbers) | New York (`.serif`), titles 600, numbers 500 | SF Pro Rounded (`.rounded`), titles 700, numbers 600 |
| Primary action | Solid ink-blue pill (`accent.2` = `accent`) | Violet-to-coral gradient pill (`accent` to `accent.2`) |
| Glass | None: `glass.fill` = `bg.surface` (solid) | `glass.fill` rgba(30,35,51,0.55) |
| Widget card | White card (`widget.card.start` = `end` = `bg.surface`) | Gradient card `#5B33E6` to `#1E1450`, white text |
| Increase Contrast | `lightHC` (7:1) | `darkHC` (7:1) |

</div>


One code path draws both: in light the gradient's second stop equals the first and glass is the solid surface, so a view that asks for the gradient pill draws A's solid pill. A dark and B light are not shipped; their sets stay in tokens.json only for reference and checking.

**Fix inside the approved style (listed for the next report).** The B gallery's dark card started at `#A08BFF`; its 78% white "TRIP" label measured **2.25:1** on that end of the gradient. The shipped card starts at `#5B33E6`, B's own violet from its light set: the worst text point on the card is now **4.77:1** (11 points along the gradient checked, `card_pairs` in appearance.py). Same hue family, darker start. Preview: `appearances/dark-widget-modes.png`, panels 1 and 2.

**Increase Contrast (7:1).** The high-contrast sets are derived, not hand-picked: each text role keeps its hue and moves only in OKLCH lightness (darker in light, lighter in dark; chroma reduced only to stay in sRGB) until its worst pair over all six surfaces reaches 7:1 (`accent` also on `accent.soft`, `key.text` on both key fills, `text.onAccent` on both gradient stops). `line.hairline` takes the standard `line.strong`; `line.strong` reaches 3:1 on every surface. Overrides: dark glass rises to 0.85 alpha and the card's secondary text to 90% white; the dark card start darkens to `#511ED6`. Colours already over the floor do not move. Moved: 11 colours in lightHC, 8 in darkHC, and 11 and 7 syntax roles. One consequence to know: in lightHC `text.secondary` (#514D46) and `text.tertiary` (#514D45) become the same colour; at 7:1 on `bg.sunken` there is no room for a third grey, so hierarchy in that set rides on size and weight.

### 2.1 Exports

- **Asset catalog** `pywidget/ios/Shared/Theme.xcassets`: 43 colour sets (27 in `Theme/`, 16 in `Syntax/` prefixed `Syntax`), each with four appearances: Any, Dark, Any + High Contrast, Dark + High Contrast. Names are UpperCamel of the token (`text.primary` to `TextPrimary`, `accent.2` to `Accent2`). It compiles with `actool` (iOS 18, iPhone and iPad) with no warnings: 172 colour renditions, 4 per name. `Shared/` is a source path of both the app and the widget extension in `project.yml`, so after `xcodegen generate` both targets get it. Xcode's generated asset symbols then give `Color(.textPrimary)`, `Color(.syntaxKeyword)` and so on. No set is named `AccentColor`, so the system tint is untouched until we choose to set it.
- **CSS** `tokens.css` (5,281 B): `:root` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> light; `prefers-color-scheme: dark` holds dark; `prefers-contrast: more` holds the 7:1 sets. Includes `--font-display` per appearance, the type scale, space and radius. Never names SF Mono.
- **Display face by appearance (Swift, for Idris):**

```swift
struct DisplayFont: ViewModifier {
    @Environment(\.colorScheme) private var scheme
    let style: Font.TextStyle
    func body(content: Content) -> some View {
        content.font(.system(style, design: scheme == .dark ? .rounded : .serif,
                             weight: scheme == .dark ? .semibold : .medium))
    }
}
```

### 2.2 Roles and rules

Roles (both directions, light and dark): `bg.canvas`, `bg.surface`, `bg.raised`, `bg.sunken`, `bg.editor`, `bg.console`, `line.hairline`, `line.strong`, `text.primary|secondary|tertiary|onAccent`, `accent`, `accent.soft`, `status.success|warning|danger`, `key.bg|bgAlt|text`. Direction B adds `accent.2` (gradient partner) and `glass.fill|stroke`.

Rules:
- Text roles reach 4.5:1 on every surface they can sit on (all 6 backgrounds checked, not only the canvas).
- `line.hairline` is decoration and never the only separator of meaning. Correction to v0: standard `line.strong` measures 1.74:1 (light) and 1.73:1 (dark) on `bg.surface` (worst surface 1.46 and 1.54), so it is **not** a 3:1 boundary and v0's script never checked it at 3:1 (it used 1.0). In the standard sets a boundary that matters is carried by a fill change or a system control, not by the line alone. In the Increase Contrast sets `line.strong` is 3:1 on every surface.
- `accent` is for the one primary action per screen (Run, New) and for selection. Never for body text.
- Status colours always travel with an icon or a word.
- Dark mode is its own palette, not an inversion: surfaces step up in lightness, shadows go away.
- Increase Contrast (iOS setting): the `lightHC` and `darkHC` sets in section 2.0, all text at 7:1, boundaries at 3:1. They live in the asset catalog's high-contrast appearances, so the system picks them; no code switches.

## 3. Type

### 3.1 Families
All system fonts through the OS API; nothing is bundled. SF Mono's own licence (read from its name table) limits the font file to Apple-branded apps and bars making content with it, so the website never names or loads it, and the mockups set code in Menlo (macOS system font, used for display under the macOS licence). In the app, SF Mono comes only from `Font.system(design: .monospaced)`, the route Apple provides to apps.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.1 Families, scrolls sideways" style="--tw:734px" markdown="1">

| Role | iOS | Web fallback |
|---|---|---|
| UI | SF Pro (`.default`) | system-ui stack |
| Code | SF Mono (`.monospaced`) | ui-monospace, Menlo, Consolas (never `SF Mono` by name) |
| Display, A | New York (`.serif`) for large titles and widget hero numbers | ui-serif, Georgia |
| Display, B | SF Pro Rounded (`.rounded`) for titles and hero numbers | ui-rounded, system-ui |

</div>


### 3.2 Scale (Dynamic Type, default size Large)

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.2 Scale (Dynamic Type, default size Large), scrolls sideways" style="--tw:607px" markdown="1">

| Token | Text style | pt / leading | Use |
|---|---|---|---|
| largeTitle | .largeTitle | 34/41 bold | Screen titles |
| title1 | .title | 28/34 bold | Empty states |
| title2 | .title2 | 22/28 bold | Sheets, medium widget hero |
| title3 | .title3 | 20/25 semibold | Doc sections |
| headline | .headline | 17/22 semibold | Row titles, buttons |
| body | .body | 17/22 | Prose |
| callout | .callout | 16/21 | Inline help |
| subheadline | .subheadline | 15/20 | Row subtitles, tabs |
| footnote | .footnote | 13/18 | Metadata |
| caption1 | .caption | 12/16 | Badges, widget labels |
| caption2 | .caption2 | 11/13 medium | Floor for all text, widgets included |

</div>


Code: editor 15/22 relative to `.body` (user range 11-24, clamps at 32 under AX sizes and soft-wraps at AX1 and up, flush left in 1.0 because Runestone has no hanging indent, T-0583); console 13/19 relative to `.subheadline`; gutter 12 with the editor's leading; extra keys 17 medium.

Dynamic Type: app chrome goes to AX5. Rows switch from horizontal to stacked at AX1 and up (`ViewThatFits`). Widgets clamp at `.xxxLarge`.

### 3.3 Typesetting rules
Tabular figures (`.monospacedDigit()`) for every changing number: timers, run times, console tables, widget values. Sentence case everywhere except the small <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> eyebrow labels (`caption1`, +0.04 em tracking).

### 3.4 Optional licensed editor font
If the Investors want a non-system code face: JetBrains Mono, SIL Open Font License 1.1 (commercial use allowed, may be bundled). Not bundled in v0; it would be logged in log/assets.md before use.

## 4. Space, radius, elevation

4 pt base: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Screen margin 16 (iPhone), 20 (iPad). Rows at least 44 tall; hit targets 44×44 even when the drawn key is smaller.

Radii 6, 10, 14, 20, 28, pill. Concentric rule: inner radius = outer minus padding. Widgets use `ContainerRelativeShape`, never a fixed radius.

Elevation: light mode uses a hairline plus one soft shadow (e1, e2, e3 in tokens); dark mode uses surface steps and no shadow except e3 for popovers.

## 5. Motion

Durations 120 (quick), 220 (standard), 360 (emphasized) ms. Springs: `.snappy` for keys, toggles and tabs; `.smooth` for sheets, console expand and split resize; `.bouncy` only for the run-succeeded tick.

- Run: the button morphs Run to Stop (standard); the status strip slides in from the top of the console.
- Completion menu: appears in 120 ms with no scale; never animates while the user types.
- Reduce Motion: every moving transition becomes a 120 ms crossfade; no springs, no scale, no parallax; the running indicator becomes a static filled dot.
- Never: animate the caret, loop anything longer than 2 s without user action, or animate widget content beyond `.contentTransition(.numericText())`.

## 6. Accessibility

- Contrast: 4.5:1 text, 3:1 large text and non-text marks (caret, focus ring); with Increase Contrast, 7:1 text, 4.5:1 caret, 3:1 `line.strong`. Script: `check_tokens.py`.
- VoiceOver: editor lines read as "line 3, import sys, warning: F401 unused import"; the rotor offers Lines, Errors, Functions. Console outputs carry a summary label ("Table, 3 rows: rides 24, total 548.4, mean 22.8"; "Line chart, 24 points, highest 34.8 at ride 21"). Each extra key has a spoken name ("Indent", "Open parenthesis"). Widgets give one combined label per element group.
- Reduce Motion as in section 5. Reduce Transparency: glass surfaces become `bg.surface` solid.
- Hardware keyboard on iPad: every toolbar action has a shortcut (⌘R run, ⌘. stop, ⌘B breakpoint, ⌘/ comment, ⌘⇧C console, ⌘P open file) and appears in the ⌘-hold menu.
- Never colour alone: lint squiggle plus label; run history dot plus word ("failed").

## 7. Editor syntax themes

Two themes, each with light and dark variants, all roles checked at 4.5:1 on the background, the current-line band and the selection.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7. Editor syntax themes, scrolls sideways" style="--tw:526px" markdown="1">

| Role | Quill light | Quill dark | Lumen light | Lumen dark |
|---|---|---|---|---|
| bg | #FCFBF8 | #17160F | #F8F9FC | #0E1120 |
| text | #1C1B19 | #ECE8DF | #141826 | #E6E9F5 |
| comment (italic) | #6B675E | #A6A195 | #5C6280 | #9198B5 |
| keyword | #8A2F8F | #DDA0E6 | #5B33E6 | #C59BFF |
| string | #1D6B40 | #93D3A2 | #086848 | #7FE3BA |
| number | #9A4500 | #F2AA70 | #92440A | #FFB86E |
| function | #2350B0 | #93B6FF | #1757BD | #72BBFF |
| type | #795700 | #E9D07E | #735200 | #FFD970 |
| builtin | #0B6670 | #74D0D6 | #A91E55 | #FF93B6 |

</div>


Gutter, current line, selection, error and caret are in tokens.json.

**Editor tokens for the engine (T-0232, 2026-10-26).** Runestone's theme asks for six colours the set lacked; each is an approved token, so they sit inside creative/approved.md item 2. Shipped sets only (Quill light, Lumen dark):


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7. Editor syntax themes, scrolls sideways" style="--tw:978px" markdown="1">

| Token | Quill light | Lumen dark | From | Floor (std / HC) |
|---|---|---|---|---|
| gutterBackground | #FCFBF8 | #0E1120 | bg (the mockups' gutter) | gutter, currentLineNumber 4.5 / 7 on it |
| gutterHairline | #E3DFD6 | #262C3E | color line.hairline; HC line.strong (#C9C4B8, #394158) | decorative, exempt |
| currentLineNumber | #1C1B19 | #E6E9F5 | text | 4.5 / 7 on gutterBackground and currentLine |
| invisibles | #8B867B | #68728B | line.strong moved in OKLCH lightness only to 3:1 (HC #6E695F, #858FA9) | 3 / 4.5 on bg, currentLine, selection |
| markedText | #E4EBF8 | #2A2350 | color accent.soft | every text role 4.5 / 7 |
| findMatch | #E3EAF8 | #28234F | selection (as the find state is drawn) | every text role 4.5 / 7 |

</div>


Derived fixes, for the next report: invisibles (above), and six dark Increase Contrast roles that moved one step to reach 7:1 on markedText (comment #ACB3D1 to #ACB4D1, keyword #C8A3FD to #C9A4FE, builtin and decorator #FC95B6 to #FC96B7, operator #ADB4CA to #AEB4CB, error #FF96A0 to #FF97A0). check_tokens.py: 1,024 pairs, 0 fails. Open under <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>: a find-match tint distinct from the selection (IDE spec s3.2). Highlighting in the mockups uses Python's own `tokenize` module, so the colours fall where a real tokenizer puts them. Quill is calm and low-chroma for long sessions; Lumen is brighter with more hue separation.

## 8. Widget template rules (every family, every mode)

### 8.1 Families (393 pt iPhone; flex to the container, never to these numbers)

<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 8.1 Families (393 pt iPhone; flex to the container, never to these numbers), scrolls sideways" style="--tw:812px" markdown="1">

| Family | Size | Layout | Content rule |
|---|---|---|---|
| systemSmall | 158×158 | 2×2 zones | One hero value, one label, at most one mark. One tap target (`widgetURL`). |
| systemMedium | 338×158 | 4×2 | Hero left (≈ 1/3), series or list right. Up to 4 `Link`/Button regions. |
| systemLarge | 338×354 | 4×4 | Header row (eyebrow + hero) then a list or grid; interactive Buttons/Toggles via App Intents (L5). |
| systemExtraLarge (iPad) | 715×338 | 8×4 | Two medium compositions side by side, sharing one header. |
| accessoryCircular | 72×72 | ring or gauge | `Gauge` or one number + a 2-word label. |
| accessoryRectangular | 160×72 | 3 lines | Title with symbol, one value line, one sparkline or progress. |
| accessoryInline | 1 line | text + symbol | Under 20 characters; no custom fonts (system decides). |
| StandBy | large rendering of small | | Background removed; content must sit on black at night (red-tinted vibrant). |

</div>


Common: 16 pt content margins (`contentMargins` default); 11 pt text floor; at most three type levels; tabular figures; `containerBackground(for: .widget)` always set so the system can remove it on the Lock Screen and in StandBy.

### 8.2 Rendering modes

<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 8.2 Rendering modes, scrolls sideways" style="--tw:1124px" markdown="1">

| Mode | Where | What the system does | Our rule |
|---|---|---|---|
| fullColor | Home Screen default | Our colours | Design here last, not first. |
| accented | Tinted Home Screen (iOS 18+) and iOS 26 tinted styles | Two groups, both recoloured from the user's tint; background replaced | Only the hero value and its mark take `.widgetAccentable()`; labels stay default. Images declare `widgetAccentedRenderingMode` (`.desaturated` unless the image is the content). |
| vibrant | Lock Screen, StandBy | Luminance only, over the wallpaper | Use white at the luminance <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> in section 8.3 item 2 (text 1.0 and 0.66; marks 1.0 and 0.36; grounds 0.24 and 0.18); no colour meaning. |
| clear (iOS 26 glass) | Home Screen "Clear" style | Background becomes glass; content rendered light | Same as vibrant; check legibility over a light and a dark wallpaper. |

</div>


Pillow image fallback (L4): bitmaps lose colour in accented, vibrant and clear modes. The DSL should warn at preview time when an image carries information by colour.

Every premade widget is drawn and checked in all four modes before it ships; the iPad preview pane has a mode switch (mockup B-ipad/A-ipad) so users get the same check.

### 8.3 Dark (B Studio) widgets when colour is stripped

In accented, vibrant and clear the system removes the container background, so B's gradient card is gone, and content is repainted by luminance (accented: two tint groups). B's identity in those modes is not its colour. What carries a dark widget:

1. **The SF Pro Rounded hero numeral** (600). It is the one thing that survives every mode, as New York does in light.
2. **Two text levels, and a short ladder for everything else** (render.py `ROLE_ALPHA`, Swift `TreeToken.roleAlpha`; corrected 2026-10-26 by T-0200, see 8.4): text primary 1.0, text secondary and tertiary 0.66 (tertiary joins secondary, as it does on the full-colour card); value marks 1.0 (`accent`, `status.*`); quiet marks 0.36 (`line.strong`: missed days, past bars); tracks 0.24 (`bg.sunken`); tile grounds and hairlines 0.18 (`accent.soft`, `line.hairline`). The levels are separated by luminance only. Never a level that only colour separates. (v0 said "three levels, 1.0, 0.66, 0.24"; neither renderer ever drew that: text tertiary was 0.5 and the mark and ground steps were not listed.)
3. **The hero and its mark are the accent group** (`.widgetAccentable()`); labels stay in the default group.
4. **Nothing means anything by hue or gradient.** Status travels with a symbol or a word; no text sits on meaning carried by the gradient.
5. **Every paint is a token**, so the system can remap it per mode. No literal colours on Text or Image.

`check_widget_modes.py` reads the 12 premade trees (52 family views) and counts what must be 0: literal colours 0, gradient paints 0, system-family views with no accentable node 0, colour-only status marks 0 (`--strict` fails on any). It also counted two gaps the dark appearance opened in the trees, which were work for the DSL and renderer owners. **Both closed** (checked 2026-10-26 19:46 by T-0200: `serif 0`, `cardbg 0`; the trees carry 27 `design: "display"` fonts and 28 `widgetCard` container paints; Idris's renderer draws both, 238c5e1e, section 8.4):

- ~~**26 hero Text nodes hard-code `design: serif`.**~~ In dark they would draw New York, not the approved rounded face. Needed: an appearance-aware display design in viewtree (for example `"design": "display"`, resolved by the Swift renderer from `colorScheme`: serif in light, rounded in dark), and `pywidget_ui` emitting it for hero numbers.
- ~~**28 views set `containerBackground` to `bg.surface`.**~~ In dark full colour that draws B's flat surface, not its gradient card. Needed: a `widget.card` paint (gradient `widget.card.start` to `widget.card.end`; solid in light because both stops are `bg.surface`).

Preview (approximation of the system, `preview_appearances.py`): `appearances/dark-widget-modes.png` on design-previews, the countdown widget in full colour (mockup card and shipped card), accented, clear on a dark wallpaper and clear on a light wallpaper. Clear on a light wallpaper is where white content is weakest; the system adapts the glass there, and only Idris's device check can say how much.

### 8.4 Renderer check against this spec (T-0200, 2026-10-26 19:46)

Idris's tree renderer (238c5e1e: `Shared/TreePaint.swift`, `TreeView.swift`, `Widget/PyWidget.swift`) compared value by value with sections 2.0, 2.1, 8.2 and 8.3 and with render.py, the drawn reference. Evidence: the code, the asset catalog's colour sets, and pixels read from `ops/site-checks/widget-card/card-{light,dark}.png` (1.5x; card 237 px = 158 pt). No Xcode run.


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 8.4 Renderer check against this spec (T-0200, 2026-10-26 19:46), scrolls sideways" data-n="1" style="--tw:1255px" markdown="1">

| # | What | Spec | Renderer draws | Verdict |
|---|---|---|---|---|
| 1 | Display face | New York light, SF Pro Rounded dark (2.0) | `design: "display"` resolves through `DisplayFont.spec(.number)` by `colorScheme` | Match. 4x crops: serif "53" light; rounded terminals on "53" and "6:05 PM" dark |
| 2 | Display weight | hero numbers 500 light, 600 dark (2.0) | medium / semibold when the tree sets no weight; a set weight wins (as render.py) | Match. "A set weight wins" was not written here; accepted and written now |
| 3 | Display titles (600 / 700) | 2.0 | not reachable from a tree; trees only get the number role | Accepted: widgets carry hero numbers, not screen titles. 2.1's snippet shows the number weights only; `Shared/DisplayFont.swift` holds both roles |
| 4 | Card stops | light `bg.surface` both stops; dark `#5B33E6` to `#1E1450`; darkHC start `#511ED6` (2.0) | `WidgetCardStart`/`End` from the catalog: light and lightHC `#FFFFFF`/`#FFFFFF` (= `BgSurface`), dark `#5B33E6`/`#1E1450`, darkHC `#511ED6`/`#1E1450` | Match. Light card pixels `#FFFFFF` |
| 5 | Solid or gradient | solid in light because the stops are equal (8.3) | solid when the resolved stops differ by under 0.002 per channel | Match |
| 6 | Gradient angle | not stated | 150 degrees, CSS convention (render.py `linear-gradient(150deg)`), CSS line length converted to unit points | **Spec gap, accepted: the card gradient is 150 degrees, start top-left, end bottom-right, line long enough that the corners reach 0% and 100%.** 11 points on the dark small card against that reference: worst 4/255 per channel, every sample darker than the reference (relative luminance 0.93 to 0.99 of it), so white text on it only gains contrast (2.0's 4.77:1 worst holds) |
| 7 | Text on the card, full colour | "white text" (2.0); mapping not stated | `text.primary` to `widget.onCard.primary`; `text.secondary` and `text.tertiary` to `widget.onCard.secondary`; `line.strong` to `widget.onCard.track`; `accent` to `widget.onCard.accent` (render.py `ONCARD`); only when the container paint is `widgetCard` | **Spec gap, accepted** as the rule: on the card, text has two levels; quiet and accent marks take their 3:1 card tokens (T-0040, T-0147, T-0159) |
| 8 | Stripped modes, text | 1.0, 0.66 (8.2, 8.3 item 2) | 1.0, 0.66, **0.5** for `text.tertiary` | **Delta, fixed.** Tertiary goes to 0.66: it already joins secondary on the card, and 0.5 was the weakest white over glass. render.py changed in this commit; Swift is T-0219 (Idris). Premade QA, 12 sheets re-rendered to a temp folder: 0 faults; worst text on the stand-in grounds rose: accented dark 4.48 to 6.05, accented light 2.84 to 4.15, clear dark wallpaper 5.07 to 7.56 (dark) and 2.78 to 3.46 (light); full colour unchanged. Clear and vibrant over a light wallpaper stay under 4.5 on the stand-ins (Idris's device check, T-0039) |
| 9 | Stripped modes, marks and grounds | "tracks 0.24" only | `accent`, `status.*` 1.0; `line.strong` 0.36; `bg.sunken` 0.24; `accent.soft`, `line.hairline` 0.18 | **Spec gap, accepted** as drawn (T-0147's graphics check measured these); written into 8.3 item 2 |
| 10 | `bg.surface` as a fill, stripped | not stated | white 1.0 (render.py the same; 12 uses, all in the clocks tree) | Known open, not new: clear-mode clock dials read as white discs (T-0159 note). Not changed here |
| 11 | Literal colours, stripped | none allowed (8.3 item 5) | white at the literal's own alpha (render.py the same) | Match in effect: the trees hold 0 literals |
| 12 | Light card outline | not stated | none | Accepted. render.py's 1 px `line.hairline` border on light cards is a sheet convention; WidgetKit gives the extension no outline to draw |
| 13 | Sheet grounds in accented, light | n/a | the Swift sheet shows the extension's output (white at the ladder) on a dark stand-in; render.py simulates the system's tint recolouring on a light stand-in | Sheet-only difference, no fix: what the extension hands WidgetKit is the same in both |

</div>


Result: the display design and the `widgetCard` paint are cleared. One fix (row 8, Idris, T-0219); three spec gaps closed by writing the renderer's values in (rows 6, 7, 9). Everything stays inside creative/approved.md item 2 (the approved tokens and faces); row 8 is a contrast fix inside the approved style and is listed here for the next report.

**T-0399 and T-0429 fixes (Maren, 2026-10-27 13:13 ET), listed for the next report.** All inside creative/approved.md item 2: approved tokens rearranged, and two on-card values drawn from the approved B mockup's translucent card fills.


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 8.4 Renderer check against this spec (T-0200, 2026-10-26 19:46), scrolls sideways" data-n="1" style="--tw:907px" markdown="1">

| # | What | Change | Measured |
|---|---|---|---|
| 14 | Grounds on the dark card (F1) | Two rows: `widget.onCard.ground` (`bg.sunken` on the card) white 0.28, the B mockup's card track; `widget.onCard.soft` (`accent.soft` on the card) black 0.24, a well. Light: `bg.sunken` and `accent.soft` unchanged. Row 7's map gains both | ground under primary marks 3.87:1 (darkHC 4.56); soft under primary text 9.71:1, under accent 4.40:1 (darkHC 6.08). A white well under accent glyphs measured 1.92-2.63:1, so tiles that carry glyphs moved to soft |
| 15 | Tree roles | Shortcut tiles, the altitude area, the night clock dial, the moon's unlit disc and the script console move to `accent.soft` (wells under accent glyphs or text); tracks and the day dial stay `bg.sunken` | premade and gallery QA 0 faults, 0 card mark faults |
| 16 | Clock dials (F2) | hands, hub and ticks are primary and secondary on every dial; day `bg.sunken`, night `accent.soft` | stripped: 1.0 hands on 0.24 / 0.18 grounds, where night dials were blank |
| 17 | Steps today bar (F5) | primary, not accent | against past bars 5.41:1 light, 2.16:1 dark (was 1.13), 1.86:1 darkHC: a luminance step, under 3:1 |
| 18 | Stripped controls (T-0429) | Pause pill: full colour solid accent; stripped 0.4 under a 1.0 label (`When renderingMode`). On toggle: track 0.5 (tinted), knob default group 1.0; off: track 0.24, knob 0.9. Knob shadow in full colour only | gallery 09 QA 0 faults |

</div>


## 9. Two directions (history: the #60 choice)

The Investors kept both (#60, 2026-10-25 23:59 ET): A is the light appearance, B the dark one (section 2.0). The table and the recommendation below are the proposal as it was put to them; the recommendation for A alone was not taken.


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 9. Two directions (history: the #60 choice), scrolls sideways" style="--tw:739px" markdown="1">

| | A, Paper | B, Studio |
|---|---|---|
| Mood | Warm paper and ink; editorial; calm | Dark-first; violet-to-coral gradients; glass panels |
| Display face | New York serif | SF Pro Rounded |
| Syntax | Quill | Lumen |
| Primary action | Solid ink-blue pill | Gradient pill |
| Widgets | White/ink cards, serif hero numbers | Gradient cards, rounded hero numbers |
| Primary appearance | Light (dark fully specified) | Dark (light fully specified) |

</div>


Mockups (each direction): `mockups/{A,B}-editor.png` (iPhone editor, extra key row, lint, completion), `{A,B}-console.png` (table, plot, image, `input()`), `{A,B}-projects.png`, `{A,B}-ipad.png` (sidebar, editor with breakpoint, console traceback linking to the line, widget preview with family and mode switches; drawn in the other appearance), `{A,B}-gallery.png` (small light and dark, medium, large interactive, accented, clear, Lock Screen vibrant with circular, rectangular and inline). Generating code: `mockups/draw.py`.

### Recommendation: A (Paper)
1. Identity survives the modes. In accented, vibrant and clear modes B's gradients are stripped and its widgets become generic; A's identity is the serif hero numeral, which survives every mode (compare the accented and clear panels in both galleries).
2. It sits under iOS 26's own glass chrome instead of competing with it; B adds its own glass on top of Apple's.
3. Long sessions: Quill is lower in chroma than Lumen, and A's light paper is softer than white for hours of reading code.
4. Cost: A is mostly system components plus tokens; B's gradients and custom glass cost build and review time on every screen.

What B does better: it reads as "creative tool" at a glance and photographs well for App Store screenshots. If the Investors like that, option 3 in ops/questions.md keeps A for the app and offers B's gradient cards as one optional premade widget style.

## 10. Open
- ~~The Investors choose a direction~~: done, #60 (section 2.0, creative/approved.md item 2).
- ~~High-contrast palette variants (7:1)~~: done 2026-10-26 (section 2.0).
- Idris: run `xcodegen generate` in pywidget/ios so `Shared/Theme.xcassets` joins both targets, build, and check in the Simulator: Light, Dark, and both with Increase Contrast (Settings, Accessibility, Display and Text Size). Then the widget family sizes and the four rendering modes, clear on a light wallpaper first (section 8.3).
- ~~DSL and renderer owners: the display design and the `widget.card` paint (section 8.3), then the premade trees regenerate.~~ Done: trees regenerated (`check_widget_modes.py` serif 0, cardbg 0), renderer 238c5e1e checked value by value 2026-10-26 19:46 (section 8.4); one fix left, T-0219 (Idris, stripped-mode tertiary 0.66).
- For the next report (C51 visibility, inside the approved style): the dark card start `#A08BFF` to `#5B33E6` (section 2.0), and the Increase Contrast sets.
- App icon and App Store screenshots: separate C51 proposal in the approved appearances (board line).
- QA note: both galleries report 1 element past the canvas edge in qa.json (`offcanvas`); no text is clipped (clip 0) and the PNGs show no cut content. Not yet traced.
{% endraw %}

</div>
