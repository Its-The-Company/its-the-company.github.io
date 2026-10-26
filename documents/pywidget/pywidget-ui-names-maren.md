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
{% endraw %}

</div>
