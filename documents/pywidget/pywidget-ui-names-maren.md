---
layout: "default"
title: "pywidget_ui public names: designer review (Maren)"
section: "documents"
description: "Not ready to freeze. Ready after 19 renames and 2 additions. The naming rule is sound and mostly kept. The renames are mechanical. The 2 additions are design-system rules the DSL cannot express today (A1\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/pywidget-ui-names-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/reviews/pywidget_ui-names-maren.md</code></span></div><h1>pywidget_ui public names: designer review (Maren)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
2026-10-25 21:09 ET. Form: hand-off with independent review (C13). I read the work as written and did not ask Pernille for her reasoning. Idris reviews separately.

Read: `pywidget/python/pywidget_ui/API.md` (5769e9c9, 130 rows, all proposed), `__init__.pyi` (signatures), [`pywidget/docs/research/L4-view-dsl.md`](l4-view-dsl.html) s2-s8 and s14, [`pywidget/docs/design/design-system-v0.md`](design-system-v0.html), my `widgets/README.md` R0-R6 and `states/state-spec.md`. SwiftUI and WidgetKit names checked by grep against the iPhoneSimulator 27.1 SDK swiftinterfaces, not from memory.

Not in this review: the error texts a user reads. API.md gives those to me too; they need their own pass with the full list of messages (open item at the end).

## Verdict

**Not ready to freeze. Ready after 19 renames and 2 additions.** The naming rule is sound and mostly kept. The renames are mechanical. The 2 additions are design-system rules the DSL cannot express today (A1 `ContainerRelativeShape`, A2 combined accessibility elements); without them no widget, premade or user-made, can follow those two rules of design-system-v0.

Count, by API.md row (130 rows; grouped rows below count once per API.md row): keep 100, rename 19, question 11. Two of the 19 (`AccessoryBackground`, `accented_rendering`) also rename a schema name.

## The rule I am checking against

1. Nodes and modifiers use SwiftUI's name, snake_cased: `containerBackground` becomes `container_background`. A user who finds a SwiftUI answer online can type it here.
2. String values keep SwiftUI's spelling: `"systemSmall"`, `"fullColor"`, `"ultraThin"`. Identifiers are snake_case; values are camelCase. This should be written in API.md's first paragraph, because a beginner will otherwise think one of the two is a mistake.
3. A SwiftUI suffix is dropped only when it carries no meaning. `Effect` carries meaning (visual only, layout unchanged) and `Mode` / `Style` / `Text` name what the argument is, so they stay.
4. Configuration that is ours, not a SwiftUI view (`Widget`, `Timeline`, `RenderContext`), may use plain words over Apple's (`edge_to_edge`, not `contentMarginsDisabled`).
5. Units go in the name when Python convention does not already fix them: bytes yes, seconds no (Python timeouts are seconds).

Pernille's five uncertain names, answered under this rule: `foreground` rename, `rotation` / `scale` rename, `invalidatable` rename, `symbol_rendering` / `accented_rendering` rename (add `_mode`, plus `widget_` for the second), `When(env, is_)` rename.

## Names

### Constants


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Constants, scrolls sideways" style="--tw:760px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `SCHEMA` | keep | |
| `VERSION` | rename to `SCHEMA_VERSION` | `ui.VERSION` reads as the library version to anyone who knows Python. It is the tree major. |
| `LIBRARY_VERSION` | keep | Also set `__version__ = LIBRARY_VERSION`; that is where Python users look. |
| `NODE_TYPES` | keep | |
| `MODIFIERS` | keep | |
| `FAMILIES` | rename to `ALL_FAMILIES` | It <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> `accessoryCorner`, which is watchOS-only. The short, obvious name should be the list that works. |
| `IOS_FAMILIES` | rename to `FAMILIES` | The list a `Widget` may declare. |
| `ENV_KEYS` | keep | Add value sets per key, see <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G10</span>. |
| `GAUGE_STYLES` | keep | |
| `DATE_STYLES` | keep | |
| `ACCENTED_MODES` | rename to `ACCENTED_RENDERING_MODES` | Two value sets share `fullColor` and `accented`: the widget rendering mode (`When("renderingMode")`) and the image's accented rendering mode. The short name invites the wrong one. |
| `MAX_INLINE_BITMAP` | rename to `MAX_INLINE_BITMAP_BYTES` | 65,536 of what. |
| `MAX_ACTION_TIMEOUT` | keep | Seconds, as Python expects. |
| `DEFAULT_ACTION_TIMEOUT` | keep | |
| `BUNDLED_FONTS` | keep | Empty in v0: design-system-v0 s3.1 bundles nothing. |

</div>


### Errors and helpers


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Errors and helpers, scrolls sideways" style="--tw:589px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `ViewTreeError` | keep | `.filename`, `.lineno`, `.reason` keep. The `widget.py, line 14:` prefix matches the error card in state-spec s1. |
| `iso(dt)` | question | Name is fine. The behaviour "naive means UTC" is a trap: a beginner writes `datetime.now()`, which is naive local time, and a clock widget runs hours off with no error. Treat naive as device local time, or raise "give the datetime a time zone". Same rule wherever a datetime goes in (`Entry`, `Text`, `ReloadPolicy.after`). |
| `dumps(doc, indent=None)` | keep | `json` vocabulary. |
| `validate(doc)` | keep | |

</div>


### Paint


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Paint, scrolls sideways" style="--tw:832px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `Color` | keep | |
| `Color.rgb(r, g, b, a=1.0, dark=None)` | rename `a` to `opacity` | SwiftUI says `opacity`, and so does our own `.opacity()`. `a` is jargon. Also: reject values above 1 with "rgb takes 0 to 1; for 0-255 divide by 255". |
| `Color.semantic(name)` | keep | The name list is G5 plus my R1 token roles. |
| `Color.material(name)` | rename to `Material(name)` | A material is not a colour in SwiftUI (`.regularMaterial` is a `ShapeStyle`). Three paint classes, `Color`, `Gradient`, `Material`, read cleanly. |
| `Gradient` | keep | |
| `Gradient.linear(stops, start=(0, 0), end=(0, 1))` | question | Name keep. Two gaps: stops are `Sequence[Paint]` with no way to give a location (the schema has `location`), so accept `(paint, location)` pairs; and accept SwiftUI's `UnitPoint` names (`"top"`, `"bottomTrailing"`), which is what SwiftUI users type. |
| `Gradient.radial(stops, center, start_radius, end_radius)` | question | Names match SwiftUI. Units do not: L4 s5.1 makes radii unit space (0.7), SwiftUI's are points. A SwiftUI user writes `end_radius=100`. Say the unit in the docstring and reject radii above, say, 4 with a message. |
| `Gradient.angular(stops, center, start_angle, end_angle)` | keep | Degrees, consistent with `arc` and `rotation_effect`. |

</div>


### Fonts and number formats


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Fonts and number formats, scrolls sideways" style="--tw:724px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `Font` | keep | |
| `Font.text_style(style, design=None, weight=None)` | keep | Accessibility point: this is the form that follows Dynamic Type, so it must be the shortest one to type. Let `.font("headline")` accept a text style name as shorthand for `Font.text_style("headline")`. Today `Font.system(size=17)` is shorter and does not scale. |
| `Font.system(size, weight=None, design=None)` | keep | SwiftUI name. The IDE warning on fixed sizes (L4 s5.2) stays. |
| `Font.custom(name, size, relative_to=None)` | question | Name keep. In SwiftUI `Font.custom(_:size:)` scales relative to body; the non-scaling form is `fixedSize:`. What does `relative_to=None` render as? It should scale like SwiftUI, or users who know SwiftUI lose Dynamic Type silently. |
| `Number` | keep | Reads well as `format=Number.percent(1)`. |
| `Number.decimal(fraction_digits=0)` | keep | SwiftUI says `.number`; `decimal` is the Foundation style name and clearer. |
| `Number.percent(fraction_digits=0)` | keep | Docstring must say 0.42 shows as 42 %. A beginner passes 42. |
| `Number.currency(code, fraction_digits=2)` | keep | |

</div>


### Node and modifiers


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Node and modifiers, scrolls sideways" style="--tw:960px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `Node` | keep | |
| `Node.modifier(name, **args)` | keep | Escape hatch. |
| `Node.to_dict()` | keep | |
| `Node.padding(length=None, edges="all")` | keep | Length first reads better in Python than SwiftUI's order. Accept a list of edges (`["top", "leading"]`); SwiftUI's `Edge.Set` combines. |
| `Node.frame(...)` | keep | `"infinity"` and `float("inf")` both accepted: good (my R0). |
| `Node.offset(x=0, y=0)` | keep | |
| `Node.fixed_size(horizontal=True, vertical=True)` | keep | |
| `Node.layout_priority(value)` | keep | |
| `Node.foreground(paint)` | rename to `foreground_style` | SwiftUI's current name; `foregroundColor` is the deprecated one. "Foreground what?" has no answer in the short form. |
| `Node.background(paint_or_view, alignment=None)` | keep | |
| `Node.overlay(view, alignment=None)` | question | SwiftUI's `overlay` also takes a paint. Accept both, like `background`, so the two read as a pair. |
| `Node.clip_shape(shape="RoundedRectangle", corner_radius=None, corner_style="continuous")` | question | Name keep. Value set lacks `"ContainerRelativeShape"` (A1). Default `RoundedRectangle` with `corner_radius=None` draws what radius? SwiftUI takes a shape value: accepting `clip_shape(Circle())` as well as the string would match it. |
| `Node.opacity(value)` | keep | |
| `Node.rotation(degrees)` | rename to `rotation_effect` | `Effect` tells the user the layout does not rotate. A beginner rotating text in an `HStack` needs that word. |
| `Node.scale(x, y=None)` | rename to `scale_effect` | Same reason, and "scale" already means two other things here: `Image.bitmap(scale=3)` and `image_scale`. |
| `Node.shadow(color=None, radius=4, x=0, y=2)` | keep | Defaults differ from SwiftUI (radius required, y 0). Fine, but write them in the docstring. Dark mode drops shadows (design-system s4); the premades follow that, users choose. |
| `Node.blend_mode(mode)` | keep | |
| `Node.font(font)` | keep | Plus the string shorthand above. |
| `Node.font_weight(weight)` | keep | |
| `Node.bold()` | keep | |
| `Node.italic()` | keep | |
| `Node.monospaced_digit()` | keep | Design-system s3.3 uses it on every changing number. |
| `Node.line_limit(n)` | keep | |
| `Node.minimum_scale_factor(f)` | keep | Accessibility: the IDE should warn when size × factor falls under the 11 pt floor (design-system s3.2). |
| `Node.multiline_alignment(alignment)` | rename to `multiline_text_alignment` | Same shortening as `foreground`; SwiftUI keeps `Text`. |
| `Node.truncation_mode(mode)` | keep | |
| `Node.kerning(points)` | keep | Kerning is not tracking. See A3. |
| `Node.resizable()` | keep | |
| `Node.aspect_ratio(mode="fit", ratio=None)` | rename to `aspect_ratio(ratio=None, content_mode="fit")` | SwiftUI's order and label (`aspectRatio(_:contentMode:)`). `mode` collides in meaning with the four other `mode` arguments. |
| `Node.image_scale(scale)` | keep | |
| `Node.symbol_rendering(mode)` | rename to `symbol_rendering_mode` | SwiftUI `symbolRenderingMode`, and our own `truncation_mode` keeps `_mode`. |
| `Node.accented_rendering(mode)` | rename to `widget_accented_rendering_mode` | The SDK modifier is `widgetAccentedRenderingMode(_:)` (WidgetKit swiftinterface; the type is `WidgetAccentedRenderingMode`). L4 s4 and the schema call it `accentedRenderingMode`: rename there too before freeze. Widget-only modifiers all start `widget_`, which is useful. |
| `Node.widget_accentable(accentable=True)` | keep | |
| `Node.invalidatable()` | rename to `invalidatable_content` | SwiftUI name. Neither form is plain English; the searchable one wins. Docstring: "dims this view until the widget reloads after a tap". |
| `Node.widget_url(url)` | keep | |
| `Node.container_background(paint_or_view)` | keep | |
| `Node.privacy_sensitive()` | keep | |
| `Node.redacted(reason="placeholder")` | keep | |
| `Node.accessibility_label(text)` | keep | |
| `Node.accessibility_hidden(hidden=True)` | keep | |

</div>


### Nodes


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Nodes, scrolls sideways" style="--tw:960px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `VStack`, `HStack`, `ZStack`, `Group` | keep | |
| `Spacer(min_length=None)` | keep | |
| `Divider()` | keep | |
| `AccessoryBackground()` | rename to `AccessoryWidgetBackground` | SDK struct is `AccessoryWidgetBackground` (WidgetKit swiftinterface line 622). Rename the node `t` too, before freeze. |
| `Text(value, style=None, format=None)` | keep | SwiftUI's `style:`. Raise if `style` comes with a string, or a user will think it is a font style. |
| `Text.timer(start, end, pause_time=None, counts_down=True, shows_hours=True)` | keep | Pairs with `ProgressView.timer`. |
| `Image` | keep | |
| `Image.symbol(name, variable_value=None, rendering_mode=None)` | keep | |
| `Image.asset(name)` | keep | |
| `Image.bitmap(png_bytes=None, file=None, scale=3)` | keep | Design-system s8.2: preview warns when a bitmap carries meaning by colour. |
| `Gauge(value, min, max, style, label, ...)` | keep | `min`/`max` shadow builtins only inside the call; harmless and readable. VoiceOver needs `label`; warn when it is missing. |
| `ProgressView(...)`, `ProgressView.timer(...)` | keep | |
| `Rectangle`, `RoundedRectangle`, `Circle`, `Capsule`, `Ellipse` | keep | `fill`/`stroke`/`line_width` as arguments read better than SwiftUI's modifiers. Missing `ContainerRelativeShape`: A1. |
| `PathBuilder()` | keep | |
| `PathBuilder.move(x, y)` | keep | Short names suit drawing code, as in SVG and Pillow. |
| `PathBuilder.line(x, y)` | keep | |
| `PathBuilder.quad(x, y, cx, cy)` | keep | End point first is SwiftUI's order (`to:control:`); SVG puts the control first. Show keyword use in the docs. |
| `PathBuilder.cubic(x, y, c1x, c1y, c2x, c2y)` | keep | Same note. |
| `PathBuilder.arc(cx, cy, radius, start_angle, end_angle, clockwise=False)` | question | SwiftUI's flipped `clockwise` is its best-known trap: `clockwise: false` draws clockwise on screen. A beginner who writes `clockwise=True` and sees the opposite stops trusting the preview. I ask that the Python flag mean what the eye sees, the serializer mapping it to the tree. If the tree must keep SwiftUI semantics, rename the argument so it does not claim a direction. |
| `PathBuilder.rect(x, y, w, h, corner_radius=None)` | rename `w, h` to `width, height` | `frame` spells them out; one spelling across the library. R6 (unit of `corner_radius` in unit space) still open. |
| `PathBuilder.ellipse(x, y, w, h)` | rename `w, h` to `width, height` | Same. |
| `PathBuilder.close()` | keep | |
| `Path(builder, space="unit", ...)` | keep | `even_odd` reads better than SwiftUI's `eoFill`. |
| `Button(action, *label, args=None)` | question | Names keep. Accept a plain string label as `Text` shorthand (`Button("check", "Done")`). Warn when the label is an image only and there is no `accessibility_label`. |
| `Toggle(is_on, action, *label, args=None)` | keep | |
| `Link(url, *label)` | keep | |
| `When(env, is_, *then, alt=())` | rename to `When(env, value, *then, otherwise=())` | The trailing underscore looks like a typo to a beginner, and `alt` is not a word they know. A list `value` means any of. JSON keys can stay `is` and `alt`. `When` itself keep: SwiftUI has no equivalent, so the plain word is free. |

</div>


### Timeline and widget


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Timeline and widget, scrolls sideways" style="--tw:724px" markdown="1">

| Name | Call | Note |
|---|---|---|
| `ReloadPolicy`, `.at_end()`, `.never()`, `.after(date)` | keep | SwiftUI `TimelineReloadPolicy` names. |
| `Entry(date, view=None, views=None, relevance=None)` | question | `view` and `views` one letter apart, both optional, is easy to misread. If `views` is the per-family map, `views_by_family` says so. |
| `Entry.to_dict()` | keep | |
| `Entry.roots()` | question | Reads as internal. Public only if users need it; otherwise `_roots`. |
| `Timeline(entries, policy=None, sampled_at=None, stale_after=None)` | keep | |
| `Timeline.stale_at`, `Timeline.is_stale(at)`, `Timeline.to_dict()` | keep | |
| `RenderContext` | keep | `family`, `date`, `state` keep. |
| `Widget(id, name=None, families=..., edge_to_edge=None, disfavored_locations=None)` | question | Names keep (rule 4). Missing `description`: the system widget gallery shows a name and a description line, and that line is our one sentence of selling in the gallery. |
| `Widget.action(name, timeout=2.0)` | keep | |
| `Widget.render(fn)` | keep | |
| `Widget.run_action(name, state, args=None)` | keep | |
| `Widget.entry(...)`, `Widget.timeline(...)` | keep | |
| `Widget.document(timeline, state=None)` | keep | |
| `Widget.to_json(timeline, state=None, indent=None)` | keep | |

</div>


## Additions the design system needs (not renames)

All verified in the SDK. Additive, so s8 allows them after freeze, but A1 and A2 should land before the first premade ships.


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: Additions the design system needs (not renames), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Add | Design-system rule it serves | SDK |
|---|---|---|---|
| A1 | `ContainerRelativeShape` node and `clip_shape` value | s4: widgets use `ContainerRelativeShape`, never a fixed radius | `struct ContainerRelativeShape : Shape` |
| A2 | `accessibility_element(children="combine")` (`combine`/`contain`/`ignore`) and `accessibility_value(text)` | s6: one combined VoiceOver label per element group; gauges read their value | `accessibilityElement(children:)`, `accessibilityValue(_:)` |
| A3 | `tracking(points)` | s3.3: eyebrow labels +0.04 em tracking. Kerning is the wrong tool (it adjusts pairs; tracking spaces evenly) | `tracking(_:)` |
| A4 | `content_transition("numericText")` | s5: the one motion widgets may use | `contentTransition(_:)` |
| A5 | Dynamic Type clamp at `xxxLarge`: a renderer default for widgets, or `dynamic_type_size(max=...)` | s3.2: widgets clamp at `.xxxLarge` | `dynamicTypeSize(_ range:)` |
| A6 | `tint(paint)` | my R4, still open | `tint` |
| A7 | `Color.hex("#1C1B19", dark=...)` | Our tokens are hex; designers and beginners paste hex. Python-side only, no schema change | none needed |

</div>


## Gaps G1-G17 (L4 s14), designer's view


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: Gaps G1-G17 (L4 s14), designer&#x27;s view, scrolls sideways" data-n="1" style="--tw:365px" markdown="1">

| # | View |
|---|---|
| G1 | Agree. A wrong paint today renders a fallback with no message: the user sees an empty widget and no reason. Per-modifier schemas first for paint, font, view. |
| G2 | Agree, same reason. |
| G3 | The DSL's sets match SwiftUI; confirm and put them in the schema. Add `ContainerRelativeShape` to `clipShape.shape` (A1). Let `edges` take a list. |
| G4 | Yes, allow `semantic` in stops. Direction B's gradient cards are token pairs (`accent` to `accent.2`); with RGB-only stops they lose their dark variant. In accented mode the gradient is stripped either way. |
| G5 | Publish one list: SwiftUI's semantic colours plus my R1 roles from design-system s2 (`bg.canvas` to `key.text`). A typo raises with the closest name ("did you mean text.secondary?"). I will supply the role list as a file Pernille can import. |
| G6 | Require ascending dates and reject duplicates, with a plain message at the caller's line. A timeline out of order shows a widget that jumps back in time. |
| G7 | Intended. The data was sampled at `sampled_at`; entries 2-12 project old data and are stale by design (state-spec s1 row 4 uses this rule). An author whose future entries are truly valid for their time (a calendar) sets `stale_after` longer or leaves it out. Put that sentence in s8. |
| G8 | Confirm the default to now. Byte-stable output matters to the IDE diff (s8 `generator.version`); the docstring says to pass it there. |
| G9 | Agree. Matches my R0; add "numbers are finite" and the `"infinity"` sentinel to the spec. |
| G10 | Agree, and expose each set as a constant (`RENDERING_MODES`, `COLOR_SCHEMES`, `DYNAMIC_TYPE_SIZES`) so completion offers them. |
| G11 | Fix s2. |
| G12 | Both. The DSL raises; the renderer ignores a nested one and logs, for hand-written JSON. Also: preview warns when the root has no `container_background` at all (design-system s8.1: always set, so the system can remove it in StandBy and on the Lock Screen). |
| G13 | No node. Reword s6: a timed-out action is a failed run, so the renderer draws state-spec state 1 (error badge on the last good render) or state 2 (error card if there is none). Both are drawn by the renderer around the user's tree, not inside it, so no user tree carries them. |
| G14 | Agree, `oneOf`. |
| G15 | Seconds, and accept a `timedelta` like `stale_after`, so the two read alike. |
| G16 | Same rule as families. The SDK settles it: `watchFace` and `smartStack` are `@available(iOS, unavailable)` (watchOS 26); `carPlay` is iOS 26. The iOS list is `homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay`. Note `smartStack` is missing from the gap row but has the same problem. |
| G17 | Agree, colour or semantic only, as SwiftUI's `shadow(color:)`. |

</div>


## Follow-ups that are mine

- Rename my type tokens `title1` and `caption1` to SwiftUI's `title` and `caption` in design-system-v0 s3.2 and tokens.json, so a user never meets two names for one style.
- Express tracking in points as well as em in s3.3, once A3 exists.
- Error-text review: I need the full list of user-facing messages (`ViewTreeError.reason` strings and IDE warnings) to review them line by line.

## Check after 0.3.0 (T-0020), 2026-10-26 02:41 ET

A short check, not a new review (Idris s7.7). Read against bdc83f8f, 53e9edb9, 086d9b47 at HEAD 01142fc1: `pywidget_ui/__init__.py` and `.pyi`, API.md, viewtree.schema.json, L4 s4. Method: a probe script (/tmp, not committed) imported the package and checked each name, each signature and the JSON each call writes; old names checked absent. `run_host.py --both`: 1,026 tests, 0 failed suites (3.9.6 and 3.13.18).

**Renames, s7.1-7.2 (19 rows): 19 applied, 0 missing, 0 different.**


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: Check after 0.3.0 (T-0020), 2026-10-26 02:41 ET, scrolls sideways" style="--tw:892px" markdown="1">

| Rename | Package | Stub | API.md | Schema |
|---|---|---|---|---|
| `VERSION` to `SCHEMA_VERSION` (+ `__version__` 0.3.0) | applied | applied | applied | n/a |
| `FAMILIES` to `ALL_FAMILIES` (9, `accessoryCorner` in) | applied | applied | applied | n/a |
| `IOS_FAMILIES` to `FAMILIES` (8, `accessoryCorner` out) | applied | applied | applied | n/a |
| `ACCENTED_MODES` to `ACCENTED_RENDERING_MODES` | applied | applied | applied | n/a |
| `MAX_INLINE_BITMAP` to `MAX_INLINE_BITMAP_BYTES` | applied | applied | applied | n/a |
| `Color.rgb(a=)` to `opacity=` (still written `a`) | applied | applied | applied | n/a |
| `Color.material` to `Material` | applied | applied | applied | n/a |
| `foreground`, `rotation`, `scale`, `multiline_alignment` to `foreground_style`, `rotation_effect`, `scale_effect`, `multiline_text_alignment` (4) | applied | applied | applied | n/a |
| `symbol_rendering` to `symbol_rendering_mode` | applied | applied | applied | n/a |
| `accented_rendering` to `widget_accented_rendering_mode`; schema `widgetAccentedRenderingMode` | applied | applied | applied | applied (emitted; old name 0 in schema, L4 s4 uses the new one) |
| `invalidatable` to `invalidatable_content` | applied | applied | applied | n/a |
| `aspect_ratio(ratio=None, content_mode="fit")` | applied | applied | applied | n/a |
| `AccessoryBackground` to `AccessoryWidgetBackground`, node `t` too | applied | applied | applied | applied |
| `PathBuilder.rect` / `ellipse` `w, h` to `width, height` (2) | applied | applied | applied | n/a |
| `When(env, value, *then, otherwise=())` | applied | applied | applied | n/a (keys stay `is`, `alt`) |

</div>


**s7.3 agreed items: all applied.** `views_by_family` (no `views`; neither given raises "an entry takes view ... exactly one"); `Entry._roots`; `iso` on a naive datetime raises "give the datetime a time zone, for example datetime.now(timezone.utc) ..."; `Font.custom(relative_to=None)`; `overlay` takes a paint; `arc(clockwise=True)` writes SwiftUI's `"clockwise": false`.

**<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">Chair</span> rulings (s8): both applied.** Ruling 1: `Image.symbol(name, variable_value=None)`, and the schema's symbol source has no `renderingMode` (the one `renderingMode` left is the `When` env key, correct). Ruling 2: `clip_shape()` writes `"shape": "ContainerRelativeShape"`; `clip_shape(Circle())` writes `Circle`; schema `clipShape` requires `shape`, no default, and requires `cornerRadius` for `RoundedRectangle`; A1 node `ContainerRelativeShape` exists and is in `shapeName`.

**The RoundedRectangle radius message** (the board line had it as mine to write). Pernille's text is in: "clip_shape('RoundedRectangle') needs corner_radius, for example corner_radius=12; or call clip_shape() to follow the widget's corners". It names the fix, gives a value and offers the rule-following default. I adopt it as written; no change.

**Not checked here:** the G-rows (G1-G3, G6, G9, G10, G14-G16) in the schema and spec, which this check does not cover; my design-system follow-ups above (title1/caption1) are mine and still open.

**Result: pass.**

## Chair ruling on item 3 of the run_action review (T-0215), 2026-10-26 19:49 ET (Ines)

**Yes, with one fix first.** Maren's item 3 (board T-0199): a handler that edits state and returns None has its edit
dropped with no word. Probe at HEAD 3a0436b3 (/tmp, not committed): `state['n'] += 1` with no return gives back the old
state, silently; `state['items'].append(1)` with no return **keeps** the edit and also changes the caller's dict,
because run_action hands the handler `dict(before)`, a shallow copy. So R12 ("returns None leaves the state as it came
in") holds for top-level keys only. Ruling: (1) run_action gives the handler a deep copy and compares it with the input
after a None return, so a None return never keeps or leaks any edit, nested or not; (2) when they differ, one stderr
line, Maren's words: "add() changed state but returned None, so the change was dropped; end it with return state",
named at the handler's @widget.action line like the wrong-return error; (3) no hint when the handler changed nothing,
and none when it returns a dict. Pernille, board line. Why: the slip is the commonest one a new Python user makes with
this API, and the shallow copy makes the same slip behave two ways; fix the bug before adding the message.

## Error texts from T-0209 (T-0268), 2026-10-26 20:25 ET (Maren; DRAFT, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>)

Draft copy, not approved. Source: `pywidget_ui/__init__.py` at a6d8a527 (Pernille). I have not edited the code; Pernille applies (she is in the file on T-0250/T-0233). Method: a probe (/tmp, not committed) raised every new text from an extract of HEAD and printed it; word counts by script, on the filled-in text.

**Voice** (as the PWL003/PWL012 drafts, fb0e859d, and the installer review, b05bf5c6): what happened, then what to do; short; a beginner can act on it without the docs. Line prefix ("probe.py, line 13: ") is already right in all of them.

**Result: 11 numbered items, 10 edits (edit 2 is Ines's call) and 1 keep (8); 3 more texts kept with no edit, listed last.** Two are faults, not wording: edit 1 (the times can read false) and edit 3 (the action tells a beginner to do the opposite of what they want). Edit 9 is a wrong hint.

**Tests that pin these strings** (Pernille updates them with the text): `tests/dsl/test_g_rows.py` lines 92, 234-235, 241, 248, 266-267, 377.

### Edits

1. **G6 timeline order, mixed time zones (fault).** Ines's wording stays. But `_clock` prints each date in the zone it was given, without the zone, and `_check_order` compares in UTC. Entry 1 at 10:00 UTC and entry 2 at 11:00 +02:00 (09:00 UTC) gives "entry 2 (11:00) is not after entry 1 (10:00)", which reads false. Fix: when the two UTC offsets differ, add the offset to both times. Recommended (18): "timeline entries must be in time order: entry 2 (11:00 +02:00) is not after entry 1 (10:00 +00:00)". Same offsets: no change (16 words, as now).
2. **G6, the second half (Ines's call).** The text says what happened and stops. Proposed suffix (26 with it): "...; give each entry a later time than the one before". It covers both cases a beginner hits: out of order, and two entries at the same time (where "is not after" alone can read as "fine, they are equal"). Ines's wording, so Ines decides; Pernille applies only if she says yes.
3. **G16 'watchFace' (fault).** Now: "disfavored location 'watchFace' is for Apple Watch only; on iOS use homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay" (16). "use homeScreen" reads as an instruction, and disfavoring homeScreen hides the widget from the place most people want it. The right action is to remove the entry; the widget never appears on a watch face anyway. Recommended (25): "disfavored location 'watchFace' is for Apple Watch only, and this widget runs on iOS; remove it. The iOS locations are homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay".
4. **G16 'smartStack'.** "smartStack is for Apple Watch only" confuses anyone who has a Smart Stack on their iPhone Home Screen. Give it its own text. Recommended (27): "disfavored location 'smartStack' means the Smart Stack on Apple Watch, and this widget runs on iOS; remove it. The iOS locations are homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay". I have not put any claim about where the iPhone stack belongs into the copy; Idris can say whether one is true and worth adding.
5. **padding edges, empty list.** Keep, one word: "name" to "edge", the word the parameter uses. Recommended (19): "padding edges is an empty list; give one edge such as 'all', or a list such as ['top', 'leading']".
6. **padding edges, a name twice.** Now (5): "padding edges lists 'top' twice" says what happened only. Recommended (9): "padding edges lists 'top' twice; list each edge once".
7. **When, empty list.** Now (13): "When('family') got an empty list; give one value or a list of values". "a list of values" is what they just gave. Recommended (18): "When('family') got an empty list; give one value such as 'systemSmall', or a list of one or more". The example is the key's first allowed value, written with %r (True for the boolean keys).
8. **"did you mean" hint, the text.** Keep "; did you mean 'accented'?" as written, on every "must be one of", the family and the When errors. It names the fix in four words, matches the "no action 'ad'; did you mean 'add'?" text already shipped, and the case-ignored match finds 'top' for 'Top'. No hint when nothing is close is right; a wrong guess is worse than none.
9. **Family 'accessoryCorner' (wrong hint).** It gets "is not an iOS widget family; did you mean 'accessoryCircular'?". accessoryCorner is a real family, on Apple Watch; the hint sends the person to a different shape. Same treatment as G16: a named text, no hint. Recommended (21): "family 'accessoryCorner' is for Apple Watch only, and this widget runs on iOS; remove it, or pick another family from ui.FAMILIES". It is the one family in ALL_FAMILIES and not in FAMILIES, so the check is `fam in ALL_FAMILIES`.
10. **Family, no close match.** "family 'big' is not an iOS widget family" (8) gives no next step and no list. Recommended (15): "family 'big' is not an iOS widget family; pick one from ui.FAMILIES, such as 'systemSmall'". With a close match, the hint form stays as it is.
11. **When on a boolean key, a quoted 'true'.** `When("showsContainerBackground", "true")` gets no hint, because the hint skips non-string allowed values. The slip is common (quotes around True). Recommended (13): "When('showsContainerBackground') compares against True, False, got 'true'; did you mean True (no quotes)?"; only for 'true' and 'false', case ignored. Pernille's call whether it is worth the branch.

**Kept with no edit:** the "must be one of" form itself (37 call sites, one pattern; the hint fixes its weak case); `When env` typo ("got 'famly'; did you mean 'family'?"); `ui.validate`'s order line ("entries[1]: date ... is not after entries[0] (...); entries must be in time order"; zero-based paths match its other lines), unless Ines takes edit 2, when it ends with the same suffix so the two texts agree.

## Chair ruling on edit 2, the G6 timeline-order suffix (T-0277), 2026-10-26 20:33 ET (Ines)

**Yes.** Edit 2 is taken as Maren wrote it: "; give each entry a later time than the one before" goes at the end of the G6 text. Why: the voice rule for these messages is what happened, then what to do, and mine stopped halfway; and with two equal times "is not after" can read as "they are equal, so fine", while "a later time" settles it. Exact texts, for Pernille under T-0276:
- Same offsets: "timeline entries must be in time order: entry 3 (09:00) is not after entry 2 (09:00); give each entry a later time than the one before".
- Mixed offsets, with edit 1: "timeline entries must be in time order: entry 2 (11:00 +02:00) is not after entry 1 (10:00 +00:00); give each entry a later time than the one before". The day and seconds rules stay as they are.
- `ui.validate`'s order line: the suffix **replaces** the trailing clause rather than being added after it, so the line carries one instruction, not two: "entries[1]: date 2026-10-25T23:20:00Z is not after entries[0] (2026-10-26T00:20:00Z); give each entry a later time than the one before". The pinned test at `tests/dsl/test_g_rows.py` line 92 then asserts the suffix, not "entries must be in time order".
Still draft copy under C51 like the rest of this section; this ruling settles the wording the company proposes, not its approval.

## Error texts from T-0233 and T-0231, and T-0276 as built (T-0307), 2026-10-26 (Maren; DRAFT, C51)

Draft copy, not approved. Source: `pywidget_ui/__init__.py` at 2482f19d (Pernille: T-0233 ea3c8617, T-0276 f2499d39, T-0231 33055c4b). I have not edited the code; Pernille applies. Method: probes in /tmp (not committed) raised each text from HEAD, plus the slips a beginner makes (city without region, 'PST', 'UTC+2', 'onAccent', 'red'). Length by `tools/console_fit.py` (new, T-0307): 45 columns, iPhone 390 pt, SF Mono 13 pt, with the location prefix "widget.py, line 12: "; an estimate from the spec, not a device measurement.

**Voice** (as T-0268): what happened, then what to do; one example; a "did you mean" only when the guess is the same thing spelled differently. Two house rules this review sets as copy owner, both draft under C51:
- **"color", not "colour", in every text the user sees.** The user has just typed `ui.Color`; SwiftUI says Color; the store is US. One line that reads `Color.semantic: 'blue' is not a colour role` carries two spellings. Company docs keep their own spelling. Three strings change (lines 470, 474, 1842).
- **A hint replaces a long list, never sits after it.** `_semantic_problem` already does this; the UnitPoint text does not (item 19).

**Result: 22 rows: 13 change, 7 keep, 2 questions.** Three are faults, not wording: wrong hints that send the person to a different zone or role (items 2, 11, 12), as T-0268 edit 9 was for accessoryCorner.


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: Error texts from T-0233 and T-0231, and T-0276 as built (T-0307), 2026-10-26…, scrolls sideways" data-n="1" style="--tw:1335px" markdown="1">

| # | Text (as built, filled in) | Verdict | Exact replacement | Why | Lines now / new |
|---|---|---|---|---|---|
| 1 | `Color.semantic: 'text.secondry' is not a colour role; did you mean 'text.secondary'?` | change | `... is not a color role; did you mean 'text.secondary'?` | Spelling rule above. Otherwise right: names the fix. "role" is the docs' term (design-system-v0 s3, ADR-002 ruling 3). | 3 / 3 |
| 2 | `'onAccent' is not a colour role; did you mean 'accent'?` | change (fault) | `'onAccent' is not a color role; did you mean 'text.onAccent'?` | Wrong hint: accent is a fill, onAccent is the text on it. Fix the hint, not the words: before difflib, if exactly one role ends with "." + the name (case ignored), suggest it. Also gives 'warning' to status.warning and 'track' to widget.onCard.track by rule, not by luck. | 3 / 3 |
| 3 | `'blue' is not a colour role; the roles are text.primary, ... tertiary` (25 names) | question (Pernille, Idris) | A, recommended: `Color.semantic: 'blue' is not a color role, such as text.primary or accent (all: ui.COLOR_ROLES); for a fixed color use ui.Color.hex('#3A7BD5')`. B, if no new name: `Color.semantic: 'blue' is not a color role; for a fixed color use ui.Color.hex('#3A7BD5'). The roles are ...` (list as now). | 12 lines on a phone now: the console sheet's medium detent shows less than that, so the first thing a person sees is a wall of names. The commonest cause is a colour name ('red', 'white', 'gray' all land here), and the text never says what to do for that. A needs a public tuple `COLOR_ROLES` (= `_SEMANTIC_NAMES`), precedent `ui.FAMILIES`; a public name is the names review's call, so it is a question. | 12 / A 4, B 13 |
| 4 | `'background' is not a colour role; use ui.WidgetCard() for the widget's card` | change | For 'background' only: `Color.semantic: 'background' is not a color role; for the widget's card use ui.WidgetCard(), for a view's fill a role such as bg.surface`. For 'card', 'widgetcard', 'containerbackground', 'widget.card': `Color.semantic: 'card' is not a color role; for the widget's card use ui.WidgetCard()` | `Color.semantic` cannot see where its paint goes. A person who writes `.background(ui.Color.semantic("background"))` wants a fill behind one view, and WidgetCard() there is refused by item 5's text, so the hint sends them in a circle. The other four names can only mean the card. The ADR-002 ruling's hint ("use ui.WidgetCard()") stays as the first half. | 3 / 4 |
| 5 | `ui.WidgetCard() is the widget's card and goes in container_background only, not foreground_style` | change | `... goes in container_background only, not in foreground_style` | One word. "not foreground_style" reads as if the card is not a foreground style; "not in" says where. | 4 / 4 |
| 6 | `validate: ...m[0].paint: widgetCard paint goes in containerBackground only` | keep | | validate speaks JSON names in every line; consistent. | |
| 7 | `Text time_zone takes an IANA zone name such as 'Europe/Paris', got int 5` | change | `Text time_zone takes a zone name such as 'Europe/Paris' or 'UTC', got int 5` | "IANA" is a word a beginner has to look up and the example already teaches the form. The docs keep "IANA name" (ADR-002 R2); the user does not need it to act. 'UTC' is valid and the second thing people reach for. | 3 / 3 |
| 8 | `Text time_zone 'Paris France' is not an IANA zone name such as 'Europe/Paris'` | change | `Text time_zone 'Paris France' is not a zone name; zone names look like 'Europe/Paris' or 'UTC'` | As 7. Pinned test `test_semantic.py` line 253 ("is not an IANA zone name") changes with it. Optional, Pernille's call: run item 10's city rule with spaces as underscores before the shape check, so 'New York' gets "did you mean 'America/New_York'?" instead. | 3 / 3 |
| 9 | `Text time_zone 'Europe/Pariss' is not in the time zone database; did you mean 'Europe/Paris'?` | keep | | Says what and the fix, 3 lines. | 3 |
| 10 | `Text time_zone 'Paris' is not in the time zone database` (no hint; 'Tokyo' gets one) | change | `Text time_zone 'Paris' is not in the time zone database; did you mean 'Europe/Paris'?` | City without region is the commonest slip, and the hint finds it by luck: 'Tokyo' scores over difflib's cutoff, 'Paris' does not. Rule, as item 2: a name with no '/' that exactly one zone ends with ("/" + name, case ignored) gets that zone. | 3 / 3 |
| 11 | `Text time_zone 'PST' is not in the time zone database; did you mean 'MST'?` | change (fault) | `Text time_zone 'PST' is an abbreviation, not a zone name; use a city zone such as 'America/Los_Angeles'` | Wrong hint: MST is a different zone, an hour off. Not in the database and 2 to 5 capitals: this text, no difflib hint. | 3 / 3 |
| 12 | `Text time_zone 'UTC+2' is not in the time zone database; did you mean 'UTC'?` (and 'GMT+2' to 'GMT+0') | change (fault) | `Text time_zone 'UTC+2' is an offset, not a zone name; use a city zone such as 'Europe/Paris'` | Wrong hint, two hours off. 'Etc/GMT-2' is the database's +2 (the sign is inverted), so no offset hint is safe; a city zone also follows summer time, which an offset does not. Rule: UTC or GMT followed by + or - and a digit. | 3 / 3 |
| 13 | not in the database, no rule and no close name: `Text time_zone 'Mars/Olympus' is not in the time zone database` | change | `Text time_zone 'Mars/Olympus' is not in the time zone database; zoneinfo.available_timezones() lists the names` | Said what, not what to do. This text only appears when zoneinfo has a database (no database means shape check only), so the pointer always works. | 3 / 4 |
| 14 | `Text time_zone is for a date; this Text holds str` | change | `Text time_zone is for a datetime, and this Text holds a str; pass a datetime or remove time_zone` | "holds str" is a bare type name; `_a_type` already gives "a str". "datetime" is the type they pass. The action was missing. | 2 / 3 |
| 15 | `Text time_zone does nothing for a 'relative' date; it is for style 'time' or 'date'` | change | `Text time_zone does nothing for a 'relative' date; use style 'time' or 'date', or remove time_zone` | Makes the two actions explicit; a relative date ("in 5 min") needs no zone, so removing it is the likely fix. Pinned test line 222 ("time_zone is for a date") changes with item 14. | 3 / 3 |
| 16 | `accessibility_element children must be one of ignore, combine, contain, got 'combined'; did you mean 'combine'?` | keep | | The "must be one of" form, 37 call sites, kept in T-0268. Three short names: the list is the action, and the hint after it is fine at this length. SwiftUI's own names, as the docstring. | 4 |
| 17 | `When('showsContainerBackground') compares against True, False, got 'true'; did you mean True (no quotes)?` | keep | | T-0268 edit 11 as built, word for word; 'False' and 'TRUE' also handled. | 4 |
| 18 | `disfavored location 'smartStack' means the Smart Stack on Apple Watch, and this widget runs on iOS; remove it. The iOS locations are ...` | keep | | T-0268 edit 4 as built, word for word; watchFace is edit 3, also exact. 6 lines on a phone, but the five names are the action and the error is rare. | 6 |
| 19 | `Gradient.linear start must be a pair (x, y) or one of zero, center, ... bottomTrailing, got 'Top'; did you mean 'top'?` | change | With a hint: `Gradient.linear start must be a pair (x, y) or a UnitPoint name, got 'Top'; did you mean 'top'?`. Without a hint: keep the list as now. | House rule 2: a hint replaces a list of ten. "UnitPoint name" is the docstring's and SwiftUI's term. Same for radial and angular `center`, which share `_unit_point`. | 5 / 3 |
| 20 | `Color.hex takes a hex code such as '#3A7BD5' (3, 6 or 8 hex digits), got '#3A7BD'` | keep | | Example, the rule, and what they gave. Covers the dropped digit and a colour name ('red') alike. | 3 |
| 21 | `Color.rgb r must be a number, got None` (and `Color.hex opacity ...`) | keep | | Plain and short; every Python user knows None. Better than "got None None" (T-0231). | 2 |
| 22 | `'EST'` (and 'MST', 'HST') is accepted with no word | question (Idris, Pernille) | none yet | Not copy, behaviour: these are in the database as fixed offsets with no summer time, so a New York clock written 'EST' is an hour wrong from March to November. A note in the docstring at least; a stderr line like `_dropped_edit_hint` if Idris agrees it is worth one. | |

</div>


**Pinned tests that change with these** (Pernille): `tests/dsl/test_semantic.py` lines 75, 126, 133, 141-142, 222, 253. **Line 151 must change too:** it asserts no problem contains "semantic colour"; after the spelling change it would pass with every name wrong. Change it to "semantic color" in the same commit.

**C51.** No voice or copy guide is approved (creative/approved.md holds the site look and the two appearances), so these texts, the two house rules and T-0268's ruling all stay draft until the Investors approve an error-message voice. Asked in ops/questions.md "For the next report"; the preview it needs is a board line of mine.

### Applied (T-0341, Pernille), 2026-10-26; answers to questions 3 and 22 (Pernille's part; DRAFT, C51)

All 13 "change" rows applied as written in `pywidget_ui/__init__.py`, still marked DRAFT C51. Where I went past the row: the suffix rule runs after a same-name-other-case match, not before it, or 'Accent' finds 'widget.onCard.accent' instead of 'accent'; the rule is one helper (`_did_you_mean(..., sep=)`) for roles ('.') and zones ('/'), so 'onCard.accent' and a zone with a region also use it. Item 8's optional rule is in: a name with a space that fails the shape check gets the city rule with spaces as underscores ('New York' to 'America/New_York', 3 lines by `console_fit.py`). The abbreviation and offset rules run only on names the database lacks, so 'GMT+0', 'CET' and 'EST' are still accepted. Pinned tests changed as listed; line 151 now seeds a bad name into each shipped tree first and requires the filter to catch every one, so a wording change fails it instead of passing it. Mutants: `tests/pywidget_ui_matcher_mutants.json`, 14 of 14 killed.

**3 (`ui.COLOR_ROLES`).** My vote is A: 4 lines against 13 by `console_fit.py`, and the hex hint is the line people need. But A adds a public name, and public names go to Idris (my probation terms; names review). So **B is applied now** (hex hint first, then the list), and A is a two-line change (`COLOR_ROLES = _SEMANTIC_NAMES`, one `__all__` entry, the text) once Idris rules. Idris: if yes, name it `COLOR_ROLES` (it matches `FAMILIES`, a tuple of everything accepted) and say whether it should include the three aliases. I would include them, since they are accepted.

**22 ('EST' accepted silently).** Python half: keep accepting it. 'EST', 'MST' and 'HST' are real database names, the schema takes them, and refusing a valid name would make the DSL stricter than the renderer. Applied now: a `ui.Text` docstring that says to prefer a city zone and gives the New York example (DRAFT C51). Not applied: a stderr line. I would take one, printed once per name per run like `_dropped_edit_hint`, for exactly those three names. The 'EST5EDT' family follows summer time and needs no line. A console line is runtime behaviour that the bridge contract covers, so that is Idris's call. Until he says yes, the docstring is all.
{% endraw %}

</div>
