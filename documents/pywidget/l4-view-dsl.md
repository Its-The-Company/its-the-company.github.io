---
layout: "default"
title: "L4 \u2014 Widget view DSL and the versioned JSON view tree"
section: "documents"
description: "The widget extension never runs Python in v1 (see L3 question in section 12). It reads a cached tree from the App Group container and renders. So the tree must carry everything the renderer needs for the whole timeline\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l4-view-dsl.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L4-view-dsl.md</code></span></div><h1>L4 — Widget view DSL and the versioned JSON view tree</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>: L4 (brief Section 5, blocking C4, C6, C8, C13). Author: Idris. Date: 2026-10-25 (Day 4). Status: spec, no renderer yet (no Xcode in this task; another task <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the Simulator).

Companion files:
- [`pywidget/docs/decisions/ADR-002-widget-view-tree.md`](adr-002-widget-view-tree.html) (proposed)
- `pywidget/docs/design/viewtree.schema.json` (JSON Schema, draft 2020-12, version 1)
- `pywidget/python/pywidget_ui/` (reference serializer, stdlib only) and `pywidget/tests/test_viewtree.py`

Sources. Every platform claim below was checked against the local iOS 27.1 SDK Swift interfaces
(`/Applications/Xcode.app/.../iPhoneOS27.1.sdk/System/Library/Frameworks/{WidgetKit,SwiftUI,_AppIntents_SwiftUI}.framework/Modules/*.swiftmodule/arm64e-apple-ios.swiftinterface`),
which are the shipped API, not prose. Line numbers are given as `W:n` (WidgetKit), `S:n` (SwiftUI), `AI:n` (_AppIntents_SwiftUI). Claims I could not confirm from the SDK are marked **unverified** and listed in section 11. Rows that contradict the brief are in [`CORRECTIONS.md`](corrections.html).

## 0. What the view tree is for

One JSON document is the contract between four parties:

1. Python widget code (`import pywidget_ui as ui`) produces it.
2. Builder blocks compile to the same Python, so they produce it too (section 9).
3. The iOS widget extension renders it with a generic SwiftUI interpreter.
4. The web IDE renders it with an HTML/SVG interpreter (L14) and pixel-diffs against the Simulator.

The widget extension never runs Python in v1 (see L3 question in section 12). It reads a cached tree from the App Group container and renders. So the tree must carry everything the renderer needs for the whole timeline, for every family and rendering mode, with no callback into Python except through App Intents (section 6).

## 1. Shape of a document

```json
{
  "schema": "pywidget.viewtree",
  "version": 1,
  "generator": {"name": "pywidget_ui", "version": "0.1.0"},
  "widget": {"id": "com.example.steps", "name": "Steps", "families": ["systemSmall", "systemMedium"]},
  "timeline": {
    "sampled_at": "2026-10-25T23:20:00Z",
    "stale_after": 3600,
    "policy": {"kind": "after", "date": "2026-10-26T00:00:00Z"},
    "entries": [
      {"date": "2026-10-25T23:20:00Z", "view": {"t": "VStack", "p": {}, "m": [], "c": [...]}}
    ]
  },
  "actions": {"inc": {"handler": "on_inc", "timeout": 2.0}},
  "state": {"count": 3}
}
```

- `schema` and `version` come first and are the only keys a renderer must understand before deciding whether it can render (section 8).
- `timeline.entries[].view` is one node tree. An entry may instead carry `views`, a map from family name to node, for designs that differ per family. `view` is the fallback for any family not in `views`.
- Node: `{"t": <type>, "p": {<props>}, "m": [<modifier>...], "c": [<child>...]}`. `p`, `m`, `c` are optional and omitted when empty. A modifier is `{"m": <name>, ...args}`. Order of `m` is the SwiftUI application order (padding then background differs from background then padding).
- All dates are ISO 8601 in UTC with a `Z` suffix. All numbers are JSON numbers and every number is finite: JSON has no NaN or Infinity. Where SwiftUI takes `.infinity` (`frame` `maxWidth` and `maxHeight` only) the tree writes the string `"infinity"` (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G9</span>). Points are device-independent points.
- `timeline.entries` are strictly ascending by `date`; two entries with the same date are rejected (G6). JSON Schema cannot say this, so `pywidget_ui` refuses it at the caller's line and `ui.validate` reports it; a renderer stable-sorts by date and, for equal dates, keeps the first in document order and logs (fixtures: `pywidget/tests/fixtures/renderer-rules/`).
- Keys are sorted on output so two serializations of the same widget are byte-identical (the web and the phone can diff them).

## 2. Node catalog, version 1


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Node catalog, version 1, scrolls sideways" style="--tw:1636px" markdown="1">

| `t` | props `p` | children `c` | SwiftUI | Notes |
|---|---|---|---|---|
| `VStack`, `HStack`, `ZStack` | `alignment`, `spacing` (ZStack: `alignment` only) | yes | same | alignment (G3): VStack `leading, center, trailing`; HStack `top, center, bottom, firstTextBaseline, lastTextBaseline`; ZStack the 9 `Alignment` names `topLeading, top, topTrailing, leading, center, trailing, bottomLeading, bottom, bottomTrailing` |
| `Spacer` | `minLength` | no | Spacer | |
| `Divider` | | no | Divider | |
| `Group` | | yes | Group | lets modifiers apply to several children |
| `Text` | `content` (section 3) | no | Text | the only node that self-updates without a new timeline entry |
| `Image` | `source` (section 4) | no | Image | symbols, bundled assets, bitmaps |
| `Gauge` | `value`, `min`, `max`, `style`, `label`, `currentValueLabel`, `minimumValueLabel`, `maximumValueLabel` (each a node, left out when absent; G2) | no | Gauge | styles: `accessoryCircular`, `accessoryCircularCapacity`, `accessoryLinear`, `accessoryLinearCapacity`, `linearCapacity` (S:32371, 13066, 19952, 24449, 16258) |
| `ProgressView` | `value`, `total` or `timerInterval` `{start,end}`, `countsDown`, `label`, `currentValueLabel` | no | ProgressView | `ProgressView(timerInterval:countsDown:label:currentValueLabel:)` S:1493–1501 |
| `Rectangle`, `RoundedRectangle`, `Circle`, `Capsule`, `Ellipse`, `ContainerRelativeShape` | `cornerRadius`, `cornerStyle` (`circular`/`continuous`), `fill`, `stroke`, `lineWidth` | no | shapes | `fill`/`stroke` take a Paint (section 5) |
| `Path` | `commands`, `space` (`unit`|`points`), `fill`, `stroke`, `lineWidth`, `lineCap`, `lineJoin`, `evenOdd` | no | Path in GeometryReader | section 5.3 |
| `Button` | `action`, `args` | yes (label) | `Button(intent:label:)` AI:186 | iOS 17+; section 6 |
| `Toggle` | `isOn`, `action`, `args` | yes (label) | `Toggle(isOn:intent:label:)` AI:237 | iOS 17+ |
| `Link` | `url` | yes (label) | Link | deep link into the app |
| `AccessoryWidgetBackground` | | no | `AccessoryWidgetBackground` W:622 | Lock Screen only |
| `When` | `env`, `is` (one value or a non-empty list of values from the key's set; G10) | yes (then) + `alt` (else) | resolved by the renderer | section 7; the one conditional. `env` in `family, renderingMode, showsContainerBackground, isLuminanceReduced, colorScheme, dynamicTypeSize, stale`. Values: family names; `fullColor, accented, vibrant`; `light, dark`; the 12 `DynamicTypeSize` names `xSmall` to `accessibility5`; booleans for `showsContainerBackground`, `isLuminanceReduced` and `stale` |

</div>


Not in v1, on purpose: `Grid`, `LazyVGrid`, `Chart` (Swift Charts works in widgets but is a large surface; a `Path` draws every chart in the 15-design gallery), `Canvas`, `TimelineView` (the timeline is ours), any scrolling or text input (WidgetKit has none), `Menu`.

## 3. Text content

`p.content` is one of:

```json
{"kind": "string", "value": "Steps"}
{"kind": "date", "date": "2026-10-26T07:00:00Z", "style": "time" | "date" | "relative" | "offset" | "timer"}
{"kind": "timer", "start": "...", "end": "...", "pauseTime": null, "countsDown": true, "showsHours": true}
{"kind": "number", "value": 12345, "format": {"style": "decimal" | "percent" | "currency", "code": "EUR", "fractionDigits": 0}}
```

- `date` maps to `Text(_:style:)` with `Text.DateStyle.timer` etc. (verified: SwiftUICore.swiftinterface lines 9818–9820); `timer` maps to `Text(timerInterval:pauseTime:countsDown:showsHours:)` (iOS 16; **unverified**, my grep did not find the init's signature, long-shipped public API). Both update on-screen without a timeline entry, which is why they exist.
- Text-only modifiers (`font`, `fontWeight`, `bold`, `italic`, `monospacedDigit`, `lineLimit`, `minimumScaleFactor`, `multilineTextAlignment`, `truncationMode`, `kerning`) are ordinary entries in `m`; the renderer applies them to the Text before view modifiers.
- Localization: v1 trees are rendered as given; the Python side formats with the device locale when it runs. `number` content exists so the renderer formats at display time (locale changes without a Python run).

## 4. Images

`p.source` is one of:

```json
{"kind": "symbol", "name": "figure.walk", "variableValue": 0.6}
{"kind": "asset", "name": "logo"}          // bundled in the widget extension: first-party only
{"kind": "bitmap", "format": "png", "scale": 3, "file": "images/(email withheld)"}
{"kind": "bitmap", "format": "png", "scale": 3, "data": "<base64>"}
```

The symbol source has no rendering mode; the `symbolRenderingMode` modifier sets it (names review s8 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Ruling</span> 1). `ContainerRelativeShape` (C:18147) is the widget's own corner shape (A1).


- `symbol` names are SF Symbols. The renderer validates with `UIImage(systemName:)` and falls back to `questionmark` plus a log line; the Python side ships a symbol-name list for completion.
- `bitmap` is the Pillow fallback (section 10). It carries exactly one of `data` and `file`, as a string; the other key is absent, never null (G14). `file` is relative to the widget's App Group folder; `data` inline is <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> at 64 KiB by the serializer (archives of large widgets are slow and WidgetKit limits the archive size; the number is unpublished, the cap is ours).
- Image-only modifiers: `resizable`, `aspectRatio` (`fit`/`fill`), `imageScale`, `symbolRenderingMode`, `widgetAccentedRenderingMode` with values `fullColor, accented, desaturated, accentedDesaturated` (W:176–179, iOS 18+). On iOS 17 the renderer ignores `widgetAccentedRenderingMode` and the image is tinted whole.

## 5. Paint, fonts, modifiers

### 5.1 Paint (used by `foregroundStyle`, `background`, `fill`, `stroke`, `containerBackground`)

```json
{"kind": "color", "r": 0.2, "g": 0.6, "b": 1.0, "a": 1.0}
{"kind": "color", "r": ..., "dark": {"r": ..., "g": ..., "b": ..., "a": ...}}
{"kind": "semantic", "name": "primary" | "secondary" | "tertiary" | "accent" | "background" | "secondaryBackground" | "separator" | "label" | "red" | ... }
{"kind": "linearGradient", "stops": [{"color": <color>, "location": 0.0}, ...], "start": [0, 0], "end": [1, 1]}
{"kind": "radialGradient", "stops": [...], "center": [0.5, 0.5], "startRadius": 0, "endRadius": 0.7}
{"kind": "angularGradient", "stops": [...], "center": [0.5, 0.5], "startAngle": 0, "endAngle": 360}
{"kind": "material", "name": "regular" | "thin" | "thick" | "ultraThin" | "ultraThick"}
```

Gradient points are in unit space of the painted view. `semantic` colors adapt to light/dark and to accented rendering; raw colors do not adapt unless a `dark` variant is given. The design system (C13) should hand out semantic names and tokens, not RGB.

### 5.2 Fonts

```json
{"kind": "textStyle", "style": "largeTitle" | "title" | "title2" | "title3" | "headline" | "subheadline" | "body" | "callout" | "footnote" | "caption" | "caption2", "design": "default" | "rounded" | "serif" | "monospaced", "weight": "regular" | ...}
{"kind": "system", "size": 28, "weight": "semibold", "design": "rounded"}
{"kind": "custom", "name": "Inter-SemiBold", "size": 20, "relativeTo": "headline"}
```

`textStyle` scales with Dynamic Type; `system` with a fixed size does not, and the renderer warns in the IDE preview. `custom` fonts must be registered in the widget extension bundle (`UIAppFonts`): first-party and design-system fonts only in v1. Marketplace widgets cannot ship fonts (code and assets downloaded at run time are the L6 problem); the serializer rejects `custom` unless the name is in the bundled list.

### 5.3 Path commands

```json
{"t": "Path", "p": {"space": "unit", "commands": [
  {"op": "move", "to": [0, 1]},
  {"op": "line", "to": [0.25, 0.4]},
  {"op": "quad", "to": [0.5, 0.6], "control": [0.4, 0.2]},
  {"op": "cubic", "to": [1, 0], "c1": [0.7, 0.9], "c2": [0.9, 0.1]},
  {"op": "arc", "center": [0.5, 0.5], "radius": 0.4, "startAngle": -90, "endAngle": 180, "clockwise": false},
  {"op": "rect", "rect": [0, 0, 1, 1], "cornerRadius": 0.1},
  {"op": "ellipse", "rect": [0.1, 0.1, 0.8, 0.8]},
  {"op": "close"}
], "stroke": {...paint}, "lineWidth": 3, "lineCap": "round"}}
```

`lineCap` is `butt, round, square` and `lineJoin` is `miter, round, bevel` (G3): `CGLineCap` and `CGLineJoin`, read in `CoreGraphics.framework/Headers/CGPath.h` of the iPhoneOS 27.1 SDK on 2026-10-26 (lines 35-37 `kCGLineCapButt, kCGLineCapRound, kCGLineCapSquare`; lines 27-29 `kCGLineJoinMiter, kCGLineJoinRound, kCGLineJoinBevel`), so no longer [recalled]. `fill` and `stroke` take a paint, `lineWidth` a number, `evenOdd` a boolean (G2).

`space: unit` means coordinates are multiplied by the view's size at render time (the renderer wraps the Path in a GeometryReader); `points` draws as given. Angles are degrees, clockwise positive in screen space, matching SwiftUI's `Path.addArc` with `clockwise: false` meaning increasing angle. Line width is always in points. This is enough for rings, sparklines, bar charts, dials and the gallery.

### 5.4 Modifier catalog (`m` entries)

Every modifier's arguments are typed in the schema (G1): a paint is `$defs/paint`, a view is `$defs/node` and is checked to the bottom (G2), a font is `$defs/font`. `background`, `overlay` and `containerBackground` take exactly one of `paint` and `view`. The widget card paint (`widgetCard`) is allowed in `containerBackground` only (`$defs/containerPaint`). Value sets (G3): alignments are the 9 `Alignment` names; `edges` are `all, horizontal, vertical, top, bottom, leading, trailing`; `blendMode` the 21 SwiftUI `BlendMode` names; `redacted` reasons `placeholder, privacy, invalidated`; `truncationMode` `head, middle, tail`; `multilineTextAlignment` `leading, center, trailing`; `imageScale` `small, medium, large`; `aspectRatio` mode `fit, fill`; `symbolRenderingMode` `monochrome, hierarchical, palette, multicolor`. Objects stay open: a renderer ignores a key it does not know (section 8).

Layout: `padding {edges, length}` (`edges` one name or a non-empty list of different names, SwiftUI's `Edge.Set`; Python writes a string for one name), `frame {width, height, minWidth, maxWidth, minHeight, maxHeight, alignment}` (only `maxWidth` and `maxHeight` take `"infinity"`, G9), `offset {x, y}`, `fixedSize {horizontal, vertical}` (booleans), `layoutPriority {value}`.
Appearance: `foregroundStyle {paint}`, `background {paint | view, alignment}`, `overlay {paint | view, alignment}`, `clipShape {shape, cornerRadius, cornerStyle}` (`shape` required, one of the six shape names; `cornerRadius` required for `RoundedRectangle` and written for it only; the Python default is `ContainerRelativeShape`, names review s8 Ruling 2), `opacity {value}`, `rotationEffect {degrees}`, `scaleEffect {x, y}`, `shadow {color, radius, x, y}` (`color` a `color` or `semantic`, G17 as the DSL has it), `blendMode {mode}`.
Text: listed in section 3. Image: listed in section 4.
Widget-specific: `widgetAccentable {accentable}` (W:1060), `invalidatableContent {}` (S:2785), `widgetURL {url}` (W:617, at most one per tree, renderer takes the first), `containerBackground {paint | view}` (root only, S:15907/15910, iOS 17), `privacySensitive {}`, `redacted {reason}`, `accessibilityLabel {text}`, `accessibilityHidden {hidden}`.

Unknown modifier names are **ignored** by the renderer and logged (forward compatibility); unknown node types are replaced by the node's `alt` child if present, else by an empty view and a logged error (section 8).

## 6. Interactivity (L5)

Verified: `Button(intent:label:)` (AI:186) and `Toggle(isOn:intent:label:)` (AI:237) exist; nothing else in a widget takes input. `invalidatableContent` (S:2785) exists for optimistic UI. `widgetURL` (W:617) and `Link` carry deep links.

Design:

- The extension declares one generic intent, `RunWidgetAction(widgetID: String, action: String, args: String)`. The tree's `Button`/`Toggle` nodes name an `action` key; the renderer fills the intent from `actions[action]` and the node's `args` (JSON-encoded string, under 1 KiB).
- Python side:

  ```python
  w = ui.Widget("habit", families=["systemSmall"])
  @w.action("check")
  def check(state, args):
      state["done"] = not state["done"]
      return state
  ```

  The handler receives the widget's state (a JSON object stored in the App Group at `widgets/<id>/state.json`) and returns the new state; the runtime re-runs the widget's `render(state)` to produce a fresh tree and calls `WidgetCenter.reloadTimelines(ofKind:)`.
- Where `perform()` runs and the time limit: the intent's `perform()` runs in the widget extension process (or in the app if `openAppWhenRun`) [**corrected 2026-10-26, Idris**: the parenthesis is wrong, `openAppWhenRun` "generates an error if the app intent runs in an app extension" (SDK doc comment), and the process is whichever target contains the intent, pinnable only from iOS 27 with `allowedExecutionTargets`; see L5-interactivity.md s0]; Apple publishes no number for the budget, only "keep it short" (WWDC23 "Bring widgets to life"; **unverified** against the SDK, there is nothing to grep). Our budget: the handler must return within `actions[action].timeout` (default 2.0 s, max 5.0 s); on timeout the runtime leaves state unchanged and the next tree carries an `error` banner node. How Python is reached from `perform()` is the L3 question (section 12).
- Optimistic UI: the Python author marks the view that changes with `.invalidatable_content()`; the renderer applies `invalidatableContent` so the system dims it until the reload lands.
- Multi-page widgets: `state["page"]` plus two Buttons with actions `next`/`prev`; the Python render function chooses the page. No new node type needed.
- Toggle semantics: `isOn` is a snapshot in the tree; the system flips it visually at once, then `perform()` runs, then the reload confirms. If the handler fails the toggle snaps back on reload.
- Deep links: `Link {url}` and `widgetURL {url}` take `pywidget://widget/<id>/<route>?...`; the app routes to the IDE screen for that widget.
- Out of v1 scope but on the same tree: Control Center controls (`ControlWidget`, W:522–545 exist; they take a Text status and action hint, not a view tree) and Live Activities (`ActivityConfiguration` W:369, `DynamicIsland` W:336). Both would get their own small schemas later; neither renders arbitrary views.

## 7. Families, locations, rendering modes

Verified families on iOS (W:938–974, availability lines at W:930–980): `systemSmall`, `systemMedium`, `systemLarge` (iOS 14), `systemExtraLarge` (iOS 15, iPad), **`systemExtraLargePortrait` (iOS 27.0, new; not in the brief)**, `accessoryCircular`, `accessoryRectangular`, `accessoryInline` (iOS 16). `accessoryCorner` is watchOS-only (`@available(iOS, unavailable)`) and is **not** in our enum for iOS; it is reserved in the schema for a watch target.

Rendering modes (W:1040–1043): `fullColor`, `accented`, `vibrant`; read from the environment `widgetRenderingMode` (W:1052). **There is no `tinted` or `clear` rendering mode in the API**: the iOS 18 Home Screen "Tinted" look and the iOS 26 "Clear" look both arrive as `.accented`; the system decides the fill. Design for `accented` once and both looks follow. (CORRECTIONS row.)

iOS 26 glass: `WidgetTexture.glass`/`.paper` and `widgetTexture(_:)` (W:21–24, W:1654) are **visionOS-only** (`@available(iOS, unavailable)`). On iOS 26 the system draws the Liquid Glass container; a widget opts into nothing. Our rule: never paint an opaque full-bleed `containerBackground` that fights the system material; prefer `semantic`/`material` paints there. (CORRECTIONS row.)

Container background and StandBy: `containerBackground(_:for: .widget)` (S:15907) is required on iOS 17+ for the system to remove it in StandBy, on the iPad Lock Screen and in the iOS 26 clear look; `showsWidgetContainerBackground` (W:1028, iOS 15) tells the renderer whether it is shown; `containerBackgroundRemovable(false)` (W:992) opts out (then the widget is excluded from those placements). The DSL exposes `containerBackground` only as a root modifier and `When(env="showsContainerBackground", is=False)` for a dim-friendly alternative layout. `widgetContentMargins` (W:634) are applied by the system; the tree never adds outer padding of its own (the renderer uses `contentMarginsDisabled()` only for `Path`-edge designs that ask for it with the widget-level flag `edgeToEdge`).

Lock Screen accessories and vibrant mode: everything renders as a luminance mask; colors are lost; `AccessoryWidgetBackground` gives the standard pill/circle; `isLuminanceReduced` (Always-On) is an env key for `When`. `Gauge` accessory styles exist only to be used here.

Locations (W:1588–1624): `homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, watchFace, smartStack, carPlay` with `disfavoredLocations(_:for:)` (W:1631) at configuration time. Not a render-time env value, so not a `When` key; the widget document carries an optional `disfavoredLocations` list. G16, same rule as families: the schema keeps all seven (a watch target later); `pywidget_ui` on iOS accepts `homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay` and refuses `watchFace` and `smartStack` (`@available(iOS, unavailable)`) at the caller's line. The renderer ignores the watch-only values and applies `carPlay` under `#available(iOS 26)`. The flat list applies to every family the widget declares (SwiftUI's call takes a family list); a per-family form would be a new optional key, additive in 1.1.

Per-family design: the Python author writes `render(ctx)` where `ctx.family` is known at run time and the runtime calls it once per family in `widget.families` and stores the results under `views`. So one Python function, several trees, no runtime branching in the extension beyond `When`.

## 8. Versioning and compatibility policy

- `version` is an integer major. Within a major, changes are additive only: new node types, new modifiers, new props, new enum values. A renderer at major N renders any document at major N and ignores unknown modifiers, props and enum values (falling back to defaults) and replaces unknown node types with `alt` or empty. So a widget saved by a newer app renders on an older app, degraded, never crashing.
- A removal or a semantic change (a prop meaning something else) bumps the major. The extension keeps the renderer for every major it ever shipped (`Renderer.v1`, `Renderer.v2`), chosen by `version`. Majors are expected to be rare; v1 is designed to live for the product's life.
- The document also carries `generator.version` so the IDE can offer "re-serialize with the current library" and show a diff.
- A widget project pins its `pywidget_ui` version; the bundled Python library keeps every public constructor and keyword argument working across minors (deprecation warnings in the IDE console, never removal within a major).
- Conformance: `viewtree.schema.json` is the normative shape; the Swift renderer and the web renderer each ship a fixture suite of documents (`pywidget/tests/fixtures/*.json`, generated by the Python tests) that both must render; L14's pixel-diff runs on that same set.
- Timelines: `sampled_at` is when Python ran; `stale_after` is seconds after which the renderer overlays a small stale mark (`When(env="stale")` is resolved by the renderer from `now - sampled_at > stale_after`). This is how a widget whose data source stopped shows honesty instead of a frozen number. (`stale` is the one env key computed, not read from SwiftUI.)
- Reload policy maps 1:1 to `TimelineReloadPolicy` (W:1659–1662): `atEnd`, `never`, `after(date)`.
- Relevance per entry maps to `TimelineEntryRelevance(score:duration:)` (W:32) for Smart Stack ordering. `score` is a finite number; `duration` is seconds, 0 or more, optional (WidgetKit's default is 0); Python takes a number or a `timedelta`, as for `stale_after` (G15).
- Entries are in time order, each date after the one before (s1, G6).

## 9. Builder blocks compile to the same Python (L17)

Option I favor: **(c) hybrid, built on (a)**. The Builder's saved form is a block document; the Builder compiles it to readable Python that calls exactly the `pywidget_ui` constructors (one block = one node or one modifier, no helper layer), with a header comment per block group. The code view is read-only until the user ejects; after ejecting, the Python file is the source and the block document is kept as `*.blocks.json` for reference only.

Why not (b) full round-trip: the view half of the DSL is declarative and *does* round-trip (a node is a constructor call with keyword arguments; `ast.parse` plus a 20-rule matcher recovers the block tree, which is the same thing the serializer does in reverse). The logic half (fetching data, loops, arithmetic) does not: any Python a user writes by hand escapes the block subset within minutes, and a Builder that refuses to open "your" file is worse than one that says "ejected". So: round-trip is offered automatically for files the Builder itself wrote and that still parse to the subset (cheap, safe), and the eject is explicit the first time the file is edited by hand. This gives (b) for the view-only case and (a)/(c) elsewhere, with one code path.

Code generation spec sketch (full spec is L17's deliverable):

```python
# Generated by pywidget Builder 1.0 from Steps.blocks.json. Edit freely: the Builder
# reopens this file while it still matches its blocks.
import pywidget_ui as ui

w = ui.Widget("steps", families=["systemSmall", "systemMedium"])

@w.render
def render(ctx):
    # Block: Vertical stack
    return ui.VStack(
        ui.Text("Steps").font(ui.Font.text_style("caption")).foreground_style(ui.Color.semantic("secondary")),
        ui.Text(ctx.state.get("steps", 0), format=ui.Number.decimal()).font(ui.Font.system(34, weight="bold", design="rounded")),
        ui.Gauge(ctx.state.get("steps", 0), 0, 10000, style="linearCapacity"),
        alignment="leading", spacing=4,
    ).container_background(ui.Color.semantic("background"))
```

Block editor: native SwiftUI (not a WebView), because the Builder's blocks are widget nodes and the live preview *is* the SwiftUI renderer; one renderer, one look, no bridge. Web gets the HTML renderer for preview anyway (L14).

## 10. Pillow bitmap fallback: what it loses

An `Image{source.kind: bitmap}` rendered by Pillow in Python covers anything the DSL cannot draw (text on a curve, blur, exotic charts). Costs, verified against the API surface:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 10. Pillow bitmap fallback: what it loses, scrolls sideways" style="--tw:575px" markdown="1">

| Lost | Why |
|---|---|
| Vibrant/Lock Screen correctness | the image becomes a luminance mask; anti-aliased color edges look muddy |
| Accented/tinted/clear correctness | the whole bitmap is tinted unless `widgetAccentedRenderingMode` is `desaturated`/`accentedDesaturated`/`fullColor` (iOS 18+); on iOS 17 it is tinted whole |
| Dynamic Type | text in the bitmap does not scale; the renderer cannot reflow |
| Self-updating text | no `date`/`timer` content; a countdown needs a timeline entry per second, which WidgetKit will not honor |
| Light/dark | needs two bitmaps (`dark` variant key) or looks wrong in one scheme |
| Scale | must render at the device scale (2x/3x) and family size; a size mismatch blurs |
| Accessibility | VoiceOver reads nothing unless `accessibilityLabel` is set |
| Archive size and memory | PNG bytes count against the widget archive and the extension's memory (30 MB-class; the number is Apple's unpublished limit, **unverified**) |
| Interactivity | a Button can wrap a bitmap, but hit regions inside it are impossible |
| Web parity | fine (same PNG), but the pixel-diff proves nothing about layout |

</div>


Rule for the gallery: none of the 15 reference designs may use a bitmap; the fallback is for user code.

## 11. Unverified or unchecked claims (to close when the renderer is built)

1. `Text(timerInterval:pauseTime:countsDown:showsHours:)`: public API since iOS 16; my SDK grep did not find the signature (SwiftUICore split). `Text(_:style:)` is verified (SwiftUICore:9818–9820). Check the timer init in the renderer task.
2. Intent `perform()` time budget in a widget: no published number; our 2 s default is a design choice.
3. Widget extension memory ceiling (commonly reported 30 MB): no SDK fact; measure on device.
4. Whether `isLuminanceReduced` applies on iPhone Always-On (Pro models) as well as watchOS: check docs.
5. WidgetKit archive size limit for timeline entries: unpublished; measure.

## 12. Open questions for the L3 (execution) decision

1. Does Python ever run inside the widget extension? This spec assumes **no**: Python runs in the app (foreground or BGAppRefreshTask) and the intent `perform()` must reach it. If L3 chooses to embed CPython in the extension, `actions[].timeout` and the memory table in section 10 change, and `When` could be dropped in favor of re-rendering. The tree format does not change either way.
2. Who writes `widgets/<id>/tree.json` and when: on every app foreground, on every BGAppRefresh, and after every action. The timeline's `stale_after` is the honest fallback when none of those fires.
3. `perform()` reaching Python: options are (a) `openAppWhenRun` (visible, poor), (b) a Darwin notification to the app if alive plus a queued action file the app drains next launch, (c) CPython in the extension. L3 should decide; the tree carries `actions` either way.

## 13. Follow-ups (board lines added)

- Renderer: `WidgetKit` extension target with `Renderer.v1` reading fixtures from `pywidget/tests/fixtures/`, plus a snapshot test per family and mode.
- Gallery: 15 reference designs from Maren's design system, written in the DSL, each verified in all three rendering modes and on the Lock Screen where the family allows.

## 14. DSL gaps (for Idris)

Found by Pernille while taking `pywidget_ui` to the v1 DSL package (2026-10-25). Each row is a gap in this spec or in `viewtree.schema.json`; none is fixed in the schema. Where the DSL had to pick a behaviour to stay correct, the "DSL now" column says so, and the pick is reversible on your ruling. Tests: `pywidget/tests/dsl/`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 14. DSL gaps (for Idris), scrolls sideways" data-n="1" style="--tw:1288px" markdown="1">

| # | Gap | Where | DSL now | Ask |
|---|---|---|---|---|
| G1 | Modifier arguments have no schema: `$defs/modifier` only checks `m`. `$defs/paint` and `$defs/font` are referenced nowhere, so a wrong paint in `foregroundStyle`, `background`, `containerBackground`, or a wrong font in `font`, passes the schema. | schema `$defs/modifier`, s5.4 | The DSL checks paint and font kinds; the dsl suite validates every modifier's paint and font against `$defs/paint`/`$defs/font` itself. | Add per-modifier argument schemas (`if m == ... then`), at least paint, font, view. |
| G2 | Nested trees and paints in props are untyped: Gauge and ProgressView labels, `background`/`overlay`/`containerBackground` `view`, shape and Path `fill`/`stroke`. A broken nested node validates. Stack, Spacer, ProgressView and shape props are unconstrained. | schema `$defs/node` | The suite walks nested nodes and validates each against `$defs/node`. | Type them as `$ref` node and paint. |
| G3 | Value sets missing from spec and schema: stack and frame alignments (s2 lists them with "..."), padding `edges`, `clipShape.shape`, `blendMode.mode`, `redacted.reason`, `truncationMode`, `imageScale`, `multilineTextAlignment`, Path `lineCap`/`lineJoin`, `aspectRatio.mode`, `fixedSize` args, `scaleEffect` args, `frame` fill value. | s2, s5.3, s5.4 | Enforces SwiftUI's sets: VStack leading/center/trailing; HStack top/center/bottom/firstTextBaseline/lastTextBaseline; ZStack and frame the 9 `Alignment` names; edges all/horizontal/vertical/top/bottom/leading/trailing; shapes the 5 shape nodes; 21 `BlendMode` names; reasons placeholder/privacy/invalidated. | Confirm the sets and put them in the schema. |
| G4 | Gradient stops take `$defs/color` (raw RGB) only, while s5.1 says to hand out semantic names; a semantic stop fails the schema. | schema `$defs/stop`, s5.1 | Raises "stops take ui.Color.rgb colors in view tree v1". | Allow `semantic` in stops (it interacts with Maren's R1)? |
| G5 | `semantic` color names are an open list ("red \| ..."), so a typo renders as the fallback with no error. | s5.1 | Any string. | Publish the list (with Maren's R1 token names). |
| G6 | Entry order and duplicate dates are unspecified. | s1, s8 | Left as given. | Must entries be ascending? Reject duplicates? |
| G7 | `stale_after` is per timeline, measured from `sampled_at`. A timeline precomputed for 12 hours with `stale_after` 3600 shows the stale mark on entries 2-12 even though their data was meant for those times. | s8 | `Timeline.stale_at` and `is_stale(at)` implement `now - sampled_at > stale_after` exactly. | Intended? Or stale relative to the entry date? |
| G8 | The spec does not say whether `sampled_at` may be left out of the API. | s8 | Defaults to the current time (UTC, to the second); pass it for byte-stable output. | Confirm the default. |
| G9 | JSON has no NaN or Infinity and the spec does not say "finite". Maren's R0: `frame(maxWidth: .infinity)` was written as `Infinity`. | s1, s5.4, schema `frame` | `dumps` uses `allow_nan=False`; every number is checked finite at the caller's line; `frame(max_width=float("inf"))` or `"infinity"` writes the string `"infinity"`, accepted only for `maxWidth`/`maxHeight`. | Put the `"infinity"` sentinel and "numbers are finite" in the spec and the frame argument schema. |
| G10 | `When.is` is untyped: no value set per env key, and "value or list" is prose only. | s2, s7, schema When | Checks each value against the key: family names; renderingMode fullColor/accented/vibrant; colorScheme light/dark; booleans for showsContainerBackground, isLuminanceReduced, stale; the 12 `DynamicTypeSize` names. | Add to the schema. |
| G11 | s2's When env list omits `stale`; s8 and the schema have it. | s2 | Accepts `stale`. | Fix the s2 row. |
| G12 | `containerBackground` is "root only" in s5.4 but the schema cannot say so. | s5.4 | Raises at the line that built the inner node. | Note it as a DSL-only rule, or a renderer rule too? |
| G13 | s6 says a timed-out action's next tree "carries an `error` banner node", but there is no such node type in v1. | s6, s2 | Nothing. | Add a node, or reword s6 (Maren's error card design). |
| G14 | Bitmap source: the schema allows `data` and `file` both null or both set. | schema `imageSource` | Exactly one is required. | `oneOf` in the schema. |
| G15 | `relevance.duration` has no unit; `stale_after` says seconds, this does not. | s8, schema | Passed through. | Say seconds. |
| G16 | `disfavoredLocations` lists `watchFace` and `carPlay` while `families` leaves `accessoryCorner` out on iOS. | s7, schema | Accepts the schema list. | Same iOS rule for locations? |
| G17 | `shadow.color` is a SwiftUI `Color`; s5.4 does not say whether a gradient or material is allowed. | s5.4 | Takes `color` or `semantic` only. | Confirm. |
| G18 | A widget run (bridge contract v3, `widget_tree` record) has no way for the script to give its own timeline: entry dates, reload policy, `stale_after`. `Widget.timeline(dates, state, ...)` exists, but nothing tells the runner which dates or policy a script wants. | bridge contract s7 (v3), s6 timelines | The runner builds one entry at `RunRequest.widget.date` with `sampled_at` = that date, default policy, no `stale_after`. Countdown and multi-entry widgets cannot be expressed in a widget run yet. | Decide a declaration on `Widget` (for example `Widget(..., timeline=...)` or a `@widget.timeline` hook returning dates and policy); public name to Idris and Maren. Added by Pernille 2026-10-25 21:09. |

</div>


### 14.1 Chair rulings on G1-G3, G6, G9, G10, G14-G16 (Ines, 2026-10-26 00:18 ET)

Board lines T-0019 and T-0020: these nine rows were the last thing between the 0.3.0 names (bdc83f8f, 53e9edb9, 086d9b47; 726 host tests green) and the freeze. Read: the table above; Idris's review s5-s7 and Maren's G rows (`pywidget/docs/reviews/pywidget_ui-names-*.md`); bridge contract v4 s7 (the `widget_tree` payload is `pywidget_ui.dumps` bytes, and Swift validates it against `viewtree.schema.json` before it writes `tree.json`; a failure is ADR-007's `schema_error`); `pywidget_ui/__init__.py` at HEAD for what the DSL does now. Checked myself in the iOS SDK's WidgetKit interface: `TimelineEntryRelevance(score: Float, duration: TimeInterval = 0)`; `watchFace` and `smartStack` are `@available(iOS, unavailable)`, `carPlay` is `@available(iOS 26.0)`; `disfavoredLocations(_:for families:)` is iOS 17+ and takes a family list. Chaired alone on two reviews that agree on every row (C13: independent views, then the chair).

**The rule behind all nine.** Idris's s5.2: the schema is strict for writers now and the renderer is tolerant always. In v1 the DSL is the only writer (the runner emits only `dumps` bytes; Builder blocks compile to the same Python), so a strict schema costs users nothing today, while closing it after Day 13 would turn saved documents invalid. Adding values later is additive. So every row below is **v1**, and none adds or removes a public Python name. App Review: none of these is visible to a reviewer except as "the widget draws or it doesn't"; the risk they cut is a premade that fails `schema_error` during review because the DSL and the schema disagree.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 14.1 Chair rulings on G1-G3, G6, G9, G10, G14-G16 (Ines, 2026-10-26 00:18 ET), scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Ruling | Public name | Why |
|---|---|---|---|
| G1 | **v1.** Per-modifier argument schemas (`if m == ... then`), every modifier; paint, font and view first. `background` and `overlay` take a paint or a node (s7.3). | none new | A wrong paint today renders a fallback with no message (Maren). The DSL already checks it, so the schema only catches up. |
| G2 | **v1.** Nested trees as `$ref` node (Gauge and ProgressView labels, `background`/`overlay`/`containerBackground` view); shape and Path `fill`/`stroke` as `$ref` paint; Stack, Spacer, ProgressView and shape props typed. | none | Same reason as G1. |
| G3 | **v1, the DSL's sets as the schema's**, confirmed by Idris against the SDK, plus: `clipShape.shape` includes `ContainerRelativeShape` (done in 53e9edb9) and is required; frame alignment is the 9 `Alignment` names (baseline alignments later, additive); `padding` `edges` takes one name or a non-empty list of unique names (schema: string or array; Python writes a string for one name, so today's bytes do not move). Line cap `butt/round/square` and join `miter/round/bevel` are [recalled] in both reviews: Pernille greps CoreGraphics `CGPath.h` before the schema commit and writes what she finds. The sets stay private in Python (API.md line 5). | none (`edges` widens its argument type; not a new name) | Both reviews agree; the list form is SwiftUI's `Edge.Set` and both asked for it. |
| G6 | **v1.** Entries strictly ascending by `date`; equal dates rejected. The DSL raises at the caller's line ("timeline entries must be in time order: entry 3 (09:00) is not after entry 2 (09:00)"; Maren reviews the text). The schema cannot say it, so s1 and s8 say it in words. The renderer stable-sorts by date and, for equal dates, keeps the first in document order and logs. | none | Out of order, a widget jumps back in time (Maren). A meaning that cannot change after the freeze (Idris s5.1). The renderer rule covers hand-written JSON in 1.1. |
| G9 | **v1.** s1 says "every number is finite"; the frame schema allows the string `"infinity"` only in `maxWidth` and `maxHeight`. The DSL keeps what it does (`allow_nan=False`; `float("inf")` or `"infinity"` writes `"infinity"`). | none (no `INFINITY` constant; `float("inf")` is Python's own) | Already built (5769e9c9, Maren's R0); this writes it into the spec and the schema. |
| G10 | **v1** for the schema: `When.is` is one value or a non-empty array of values from the key's set (families, `fullColor/accented/vibrant`, `light/dark`, booleans, the 12 `DynamicTypeSize` names). **1.1** for Maren's per-key constants (`RENDERING_MODES`, `COLOR_SCHEMES`, `DYNAMIC_TYPE_SIZES`). Instead, in v1, every "must be one of" error names the closest valid value ("did you mean 'accented'?", stdlib `difflib`), for G3, G10 and G16 alike. | none in v1 | Constants are additive, so they can wait for users to ask; every one we freeze we keep. And `RENDERING_MODES` beside `ACCENTED_RENDERING_MODES` and `symbol_rendering_mode` is three "rendering modes" in one completion list. The error hint gives the same answer at the moment it is needed, on a phone keyboard. Maren: if completion of these strings matters for the premade tutorials, tell me; the remedy is additive. |
| G14 | **v1.** `bitmap` source: exactly one of `data`, `file`, as a string; the other key absent (schema `oneOf`, no `null`). The serializer stops writing the null key (line 776 writes both today). | none | The null pair is what let "both null" through; one form per document, as in names review s8 Ruling 2. Changes the bytes of bitmap goldens only. |
| G15 | **v1.** `relevance.duration` is seconds, `minimum 0`, optional (WidgetKit's default is 0); `score` a finite number. Python accepts a number or a `timedelta` for `duration`, as `stale_after` does. | none (`Entry(relevance=)` keeps its dict) | SDK: `duration: TimeInterval`. Maren: the two durations should read alike. |
| G16 | **v1.** Same rule as families: the schema keeps all seven locations (a watch target later); the DSL on iOS accepts `homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay` and rejects `watchFace` and `smartStack` (Maren's catch) at the caller's line. The renderer ignores watch-only values and applies `carPlay` under `#available(iOS 26)` (our floor is iOS 18, ADR-001 3.1). Meaning, frozen now: the flat list applies to every family the widget declares, since SwiftUI's call takes a family list; a per-family form would be a new optional key, additive in 1.1. | none | SDK availability lines above. |

</div>


**What would make this fail.** (1) The DSL and the schema disagree, so a valid script ends in `schema_error`, worst during App Review. Check: every golden and every dsl-suite output validates against the tightened schema (it does today against the DSL's own checks), and one invalid document per row above goes in a shared folder, `pywidget/tests/fixtures/schema-invalid/`, that the Python checker and the Swift validator must both reject. (2) The Swift validator cannot read `if/then` or `oneOf`. That is Idris's call (a JSON Schema library under C4 and C5, or strict `Codable` with the same rules); the shared fixtures are the test either way, and a Codable path means the schema file is the spec and the Swift types must match it.

**Deltas for Pernille (T-0020).** No change to the frozen-name set: nothing added, nothing removed. Behaviour and schema only: G1, G2 schema; G3 schema sets, `edges` list, the CoreGraphics grep; G6 DSL ordering check and spec sentence; G9 spec and frame schema; G10 schema and the closest-name hint in `_one_of`; G14 schema `oneOf` and the serializer drops the null key; G15 schema unit and `timedelta`; G16 DSL rejects the two watch locations. One invalid fixture per row. API.md row 5 and the `edges`, `relevance` and `disfavored_locations` docstrings updated. **For Idris:** the Swift validator rejects every fixture in `schema-invalid/`; the renderer rules in G6 and G16 go in Renderer.v1.

**Applied (Pernille, 2026-10-26, T-0209).** Schema: per-modifier argument blocks for every modifier with arguments; nested nodes and paints typed; `$defs/containerPaint` holds the widget card; the G3 sets, `edges` string or list, frame `"infinity"` in max only, `When.is` per key, bitmap `oneOf` with no null, relevance `duration` seconds `minimum 0`, `$defs/location` with all seven. CGPath.h read for cap and join (s5.3). `pywidget_ui`: `padding(edges=)` takes a list; `Timeline` refuses entries out of order or on the same second, and `ui.validate` reports it; "must be one of" errors end in "did you mean ...?" (stdlib `difflib`, case ignored; also the family and `When` errors); the bitmap serializer drops the null key (catalog goldens only); `relevance` `duration` takes a `timedelta`; `Widget(disfavored_locations=)` refuses `watchFace` and `smartStack`; `When(env, [])` is refused, since the schema needs a non-empty list. Fixtures: `pywidget/tests/fixtures/schema-invalid/` (10 documents, one or two per schema row; G6 has no schema form) and `pywidget/tests/fixtures/renderer-rules/` (G6 equal and out-of-order dates, G16 watch locations: the schema accepts them, the renderer handles them as `index.json` says). Each is the `index.json` base plus one JSON Patch operation; `pywidget/tests/dsl/schema_invalid.py` writes them and `test_g_rows.py` checks them. The stdlib checker now refuses a non-finite number. New error texts for Maren: the G6 order message (Ines's wording), the G16 watch-location message, the empty `edges` and `When` lists, and the hint suffix. **Not ruled here:** G4, G5, G7, G8, G11-G13, G17 (both reviews agree on them; Pernille applies the agreed reading, and any one she finds contested comes to me), and G18 (timeline declaration; open).

Ines, CEO
{% endraw %}

</div>
