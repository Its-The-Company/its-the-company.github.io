---
layout: "default"
title: "pywidget_ui public names: engineer&#x27;s review (Idris)"
section: "documents"
description: "Not ready to freeze. Ready after 11 renames (2 of them in the schema), 8 questions ruled, and the schema tightened (G1-G3, G6, G7, G9, G10, G14-G16) before v1 freezes. The engine side is sound: every node maps to a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/pywidget-ui-names-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/reviews/pywidget_ui-names-idris.md</code></span></div><h1>pywidget_ui public names: engineer's review (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
2026-10-25, sections 0-6 written 21:11-21:15 ET and committed (789a4a72) before I opened Maren's review; section 7 written after, 21:16 ET. Form: hand-off with independent review (C13). Board line "[review] Idris + Maren, P1, review pywidget_ui public names".

Read: `pywidget/python/pywidget_ui/API.md` (130 rows, all proposed, 5769e9c9), `__init__.pyi` (two signatures), [`pywidget/docs/research/L4-view-dsl.md`](l4-view-dsl.html) s2-s8 and s14, the schema's name lists. Checked against the iOS 27.1 SDK interfaces (no build): **S** = SwiftUI.swiftinterface, **C** = SwiftUICore.swiftinterface, **W** = WidgetKit.swiftinterface (arm64e-apple-ios). A line number is a line I read. **[recalled]** marks what I did not read today.

## 0. Verdict

**Not ready to freeze. Ready after 11 renames (2 of them in the schema), 8 questions ruled, and the schema tightened (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>-G3, G6, G7, G9, G10, G14-G16) before v1 freezes.** The engine side is sound: every node maps to a public SwiftUI or WidgetKit API I found in the SDK, and no node costs more than the extension can carry, if two renderer rules <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> (Path as a `Shape`, a pixel <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on bitmaps; s4).

Two of the renames are my own slips in L4 s4 and the schema I wrote: `accentedRenderingMode` is not Apple's name (the modifier is `widgetAccentedRenderingMode`, W:189), and `AccessoryBackground` is not Apple's name (`AccessoryWidgetBackground`, W:622). Both are schema names, so they are the expensive ones: after the freeze they cost a major version.

## 1. The rule I propose for every name

1. **Schema names are SwiftUI's names, exactly.** A user who knows SwiftUI, or searches Apple's docs, finds the thing. Two schema names break this today (above).
2. **A Python modifier is `snake_case(schema name)`, no exceptions.** `Node.modifier(name, **args)` already takes schema names, the IDE maps errors back to lines, and docs can be generated. Six Python names shorten SwiftUI's (`foreground`, `rotation`, `scale`, `multiline_alignment`, `symbol_rendering`, `invalidatable`); each saves a few keystrokes and costs a lookup table and a second name to search for. Pernille named most of them herself as her least sure.
3. **Python argument order follows SwiftUI's unlabeled-first order** where SwiftUI has one, so the common call reads the same (`padding(8)` already does; `aspect_ratio(1.0)` does not, see s3).
4. Python's own words where Python forces it: no trailing-underscore keywords in the public surface.

## 2. SDK facts behind the verdicts


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. SDK facts behind the verdicts, scrolls sideways" style="--tw:491px" markdown="1">

| Fact | Where |
|---|---|
| `widgetAccentedRenderingMode(_:)` on Image; values `accented, desaturated, accentedDesaturated, fullColor` | W:189, W:175-179 |
| `AccessoryWidgetBackground` | W:622 |
| `foregroundStyle` takes 1, 2 or 3 styles (palette symbols need 2-3) | C:11803, 11807, 11812 |
| `rotationEffect(_:anchor:)`, `scaleEffect(_:anchor:)`, `scaleEffect(x:y:anchor:)` | C:1923, 24523, 24527 |
| `invalidatableContent(_ invalidatable: Bool = true)` | C:2785 |
| `privacySensitive(_ sensitive: Bool = true)` | C:3473 |
| `symbolRenderingMode(_:)`; modes `monochrome, multicolor, hierarchical, palette` | C:8743, 8732-8735 |
| `Image(systemName:variableValue:)`: no rendering-mode argument | C:11384 |
| `Text(timerInterval:pauseTime:countsDown:showsHours:)` (**closes L4 s3's "unverified"**) | C:9830 |
| `Text.DateStyle` `time, date, relative, offset, timer` | C:9814-9818 |
| `ProgressView(timerInterval:countsDown:...)` | S:1493-1501 |
| `shadow(color: = black 0.33 sRGBLinear, radius:, x: = 0, y: = 0)`; color is `Color` | C:5444 |
| `BlendMode`: 21 cases | C:8042-8062 |
| `RedactionReasons` `placeholder, privacy, invalidated` | C:7859-7863 |
| `Text.TruncationMode` `head, tail, middle`; `TextAlignment` `leading, center, trailing`; `Image.Scale` `small, medium, large` | C:10966, 21524, 21848 |
| `kerning` and `tracking` both exist | C:21951, 21954 |
| `Font.custom(_:size:relativeTo:)` | C:22836 |
| `Path.addQuadCurve(to:control:)`, `addCurve(to:control1:control2:)`, `addArc(center:radius:startAngle:endAngle:clockwise:)`, `addRoundedRect(in:cornerSize:style:)`, `addEllipse(in:)` | C:13116-13127 |
| `ContainerRelativeShape` is a public `Shape` | C:18147 |
| `accessibilityElement(children:)` | S:30390 |
| `Material` `regular, thick, thin, ultraThin, ultraThick` | C:8154-8158 |
| `WidgetLocation.watchFace` and `.smartStack` are `@available(iOS, unavailable)`; `.carPlay` is iOS 26.0+ | W:1607-1624 |
| `systemExtraLargePortrait` iOS 27.0+ | W:951-954 |
| `TimelineEntryRelevance(score: Float, duration: TimeInterval = 0)`: seconds | W:35 |
| `contentMarginsDisabled()` is a `WidgetConfiguration` modifier | W:652 |

</div>


## 3. Per name (130 rows of API.md)

K = keep, R = rename, Q = question for the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>. "Add" notes are additive after the freeze unless marked.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Per name (130 rows of API.md), scrolls sideways" data-n="2" style="--tw:680px" markdown="1">

| Name | V | Note |
|---|---|---|
| `SCHEMA`, `VERSION`, `LIBRARY_VERSION` | K | |
| `NODE_TYPES` | K | 22 if ContainerRelativeShape lands (s5) |
| `MODIFIERS` | K | |
| `FAMILIES`, `IOS_FAMILIES` | K | `systemExtraLargePortrait` is iOS 27+ (W:951); our floor is 18, so the renderer gates it |
| `ENV_KEYS`, `GAUGE_STYLES`, `DATE_STYLES` | K | gauge styles and date styles verified (L4 s2; C:9814) |
| `ACCENTED_MODES` | R | `ACCENTED_RENDERING_MODES`, follows the modifier |
| `MAX_INLINE_BITMAP` | K | Add `MAX_BITMAP_PIXELS` (s4): bytes do not bound decode memory |
| `MAX_ACTION_TIMEOUT`, `DEFAULT_ACTION_TIMEOUT` | K | ADR-007's batch rule uses these |
| `BUNDLED_FONTS` | K | |
| `ViewTreeError` | K | |
| `iso`, `dumps`, `validate` | K | |
| `Color`, `Color.rgb`, `Color.semantic` | K | semantic list: G5 |
| `Color.material` | Q | Name fine (C:8154). Whether a widget draws a blur at all, or a flat fill, is [recalled] and unmeasured; in accented and vibrant modes it is a mask. Keep in v1 only after one Simulator snapshot shows what it draws |
| `Gradient`, `.linear`, `.radial`, `.angular` | K | match SwiftUI's three gradients and their parameter names |
| `Font`, `.text_style`, `.system`, `.custom` | K | `relativeTo` verified C:22836 |
| `Number`, `.decimal`, `.percent`, `.currency` | K | |
| `Node`, `Node.modifier`, `Node.to_dict` | K | |
| `padding` | K | `padding(8)` is the common call, as in SwiftUI |
| `frame`, `offset`, `fixed_size`, `layout_priority` | K | |
| `foreground` | R | `foreground_style` (C:11803). Add later: `secondary=`, `tertiary=`; without them `palette` symbol rendering has nothing to paint with |
| `background`, `overlay` | K | |
| `clip_shape` | Q | Name K. Default `shape="RoundedRectangle", corner_radius=None` has no meaning (SwiftUI needs a radius). Either require `shape`, or default to `ContainerRelativeShape`, which is what a widget usually wants |
| `opacity` | K | |
| `rotation` | R | `rotation_effect` (C:1923). Add `anchor=` later |
| `scale` | R | `scale_effect` (C:24523/24527). `scale` also collides with `Image.bitmap(scale=)` (pixel density), two meanings for one word |
| `shadow` | Q | Name K. Defaults `radius=4, y=2` differ from SwiftUI (radius required, y=0, C:5444). Fine as a design default if the serializer always writes the values; Maren's call |
| `blend_mode` | K | 21 names verified |
| `font`, `font_weight`, `bold`, `italic`, `monospaced_digit` | K | |
| `line_limit`, `minimum_scale_factor`, `truncation_mode` | K | |
| `multiline_alignment` | R | `multiline_text_alignment` (C:11030) |
| `kerning` | K | Add `tracking` later (C:21954); it is the one designers usually mean |
| `resizable`, `image_scale` | K | |
| `aspect_ratio` | R | Signature, not name: today `aspect_ratio(mode="fit", ratio=None)`, so `aspect_ratio(1.0)` passes 1.0 as the mode. SwiftUI is `aspectRatio(_ ratio:, contentMode:)`. Make it `aspect_ratio(ratio=None, content_mode="fit")` |
| `symbol_rendering` | R | `symbol_rendering_mode` (C:8743) |
| `accented_rendering` | R | `widget_accented_rendering_mode`; schema `accentedRenderingMode` to `widgetAccentedRenderingMode` (W:189). My slip in L4 s4 |
| `widget_accentable`, `widget_url`, `container_background` | K | W:1060, W:617, S:15907 |
| `invalidatable` | R | `invalidatable_content` (C:2785) |
| `privacy_sensitive`, `redacted` | K | SwiftUI takes a Bool and a required reason; the defaults are harmless |
| `accessibility_label`, `accessibility_hidden` | K | Add `accessibility_element(children=)` (S:30390) and `accessibility_value`: a widget is one VoiceOver stop and a number needs its value spoken |
| `VStack`, `HStack`, `ZStack`, `Group`, `Spacer`, `Divider` | K | |
| `AccessoryBackground` | R | `AccessoryWidgetBackground`, Python and schema (W:622). My slip |
| `Text`, `Text.timer` | K | timer init now verified (C:9830) |
| `Image`, `Image.asset`, `Image.bitmap` | K | |
| `Image.symbol` | Q | Name K. `rendering_mode=` duplicates the `symbolRenderingMode` modifier, and SwiftUI's init has no such argument (C:11384). Two places for one fact and no stated precedence. Drop `renderingMode` from the symbol source before the freeze (removing it later is a major) |
| `Gauge` | Q | Name K. `min=`/`max=` shadow Python builtins (lint A002); SwiftUI says `in: bounds`. Minor; I would keep them for readability |
| `ProgressView`, `ProgressView.timer` | K | S:1493 |
| `Rectangle`, `RoundedRectangle`, `Circle`, `Capsule`, `Ellipse` | K | |
| `PathBuilder`, `.move`, `.line`, `.quad`, `.cubic`, `.rect`, `.ellipse`, `.close` | K | `to` before control, as SwiftUI (C:13116-13117) |
| `PathBuilder.arc` | Q | Name K. `clockwise=False` draws clockwise on screen (SwiftUI's flag is in y-up terms; L4 s5.3 says so). A Python user reads the word literally. Rule before the freeze: either keep SwiftUI's meaning and say so in the docstring, or define `clockwise` as on-screen and have the renderer invert it. I lean on-screen: the schema is ours and the user sees the screen |
| `Path` | K | |
| `Button`, `Toggle` | K | AppIntents verified (L4 s6). Lint, not name: [recalled] no Button or Toggle acts on Lock Screen accessories |
| `Link` | K | Lint: [recalled] a `Link` in `systemSmall` is not its own tap target; warn there |
| `When` | R | `is_` to `value`: `When(env, value, *then, alt=())`; a list means any of. Keep `alt`: the schema uses the same word for the unknown-node fallback |
| `ReloadPolicy`, `.at_end`, `.never`, `.after` | K | |
| `Entry` | Q | Name K. `view=` and `views=` both optional; say exactly one, and that `view` means every family |
| `Entry.to_dict`, `Entry.roots` | K | |
| `Timeline`, `.stale_at`, `.is_stale`, `.to_dict` | K | semantics: G7 |
| `RenderContext` | K | |
| `Widget` | Q | Name K. `edge_to_edge` is not Apple's name (`contentMarginsDisabled()`, W:652) but it is configuration, not a modifier, and says what it does. I would keep it, with the Apple name in the docstring. `disfavored_locations`: G16 |
| `Widget.action`, `.render`, `.run_action`, `.entry`, `.timeline`, `.document`, `.to_json` | K | |

</div>


Totals over the 130 rows: **R 11** (`ACCENTED_MODES`, `foreground`, `rotation`, `scale`, `multiline_alignment`, `aspect_ratio` signature, `symbol_rendering`, `accented_rendering` + schema, `invalidatable`, `AccessoryBackground` + schema, `When.is_`), **Q 8** (`Color.material`, `clip_shape`, `shadow`, `Image.symbol`, `Gauge`, `PathBuilder.arc`, `Entry`, `Widget`), the rest K.

## 4. Renderer cost per node

Our numbers so far (L3 spike, Simulator): extension cold about 375 ms with Python +23 ms; resident 7.7 to 11.9 MB, heavy 21.6 MB. The memory ceiling is 30 MB [recalled]; under ADR-007 option b the extension links no Python, so the renderer has the headroom. Costs below are an engineer's estimate, not measured, except where noted.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4. Renderer cost per node, scrolls sideways" style="--tw:916px" markdown="1">

| Node | Cost | Rule for the renderer |
|---|---|---|
| VStack, HStack, ZStack, Group, Spacer, Divider | trivial | Recursive render returns `AnyView`; fine for a static snapshot. Cap depth and node count (Maren's `tree_too_large` card exists) |
| Text (string, number) | trivial | number formatted at display time |
| Text (date styles, timer) | low; system updates it | the reason these exist |
| Image symbol | low | validate name, fall back to `questionmark` |
| Image asset | low | first-party only |
| Image bitmap | **the one real risk** | Decode memory is pixels x 4, not file bytes: a 64 KiB PNG of flat colour can decode to a 1092 x 1146 systemLarge @3x, about 5 MB. Cap pixels (`MAX_BITMAP_PIXELS`), downsample at decode, never decode more than one copy |
| Gauge, ProgressView | low | system controls |
| Rectangle ... Ellipse, ContainerRelativeShape | trivial | |
| Path | low if done right | Build it as a `Shape` whose `path(in:)` scales unit coordinates by the rect it is given, not a `GeometryReader` as L4 s5.3 says: same result, no extra layout pass, and it sizes like every other shape |
| Button, Toggle, Link | low | intent built from `actions[action]` |
| AccessoryWidgetBackground | trivial | |
| When | none | env read once; only the chosen branch is built |
| modifiers: shadow, blendMode, opacity on a container | offscreen pass at system render time | unmeasured; the snapshot is drawn by the system, so this is time, not our memory |

</div>


## 5. Schema stability

1. **What actually freezes is the schema.** Python names can be deprecated across minors (L4 s8); a schema name or meaning cannot change without a major and a second renderer kept forever. So the two schema renames, and every rule that changes a meaning (arc `clockwise`, G6 ordering, G7 stale, G15 units, the symbol `renderingMode` duplicate), go in before v1 freezes. Python renames should also land before the first user saves a widget, because the IDE ships their code.
2. **Tighten now, loosen later.** Closing an open schema after the freeze (G1, G2, G3, G10, G14) turns saved documents invalid in the IDE's validator even though the tolerant renderer still draws them. Adding enum values, nodes and modifiers later is additive and safe. So: writer-strict schema now; renderer tolerant always (unknown enum value falls back to default, unknown modifier ignored, unknown node to `alt`).
3. Additions that are safe after the freeze: `ContainerRelativeShape` node and clip value, `accessibility_element`/`accessibility_value`, `tracking`, `foreground_style` secondary/tertiary, rotation and scale `anchor`.
4. One correction to L4 s7 (mine): `smartStack` and `watchFace` are watchOS-only locations (W:1607-1618); `carPlay` is iOS 26+ (W:1619).

## 6. G1-G17


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. G1-G17, scrolls sideways" data-n="1" style="--tw:365px" markdown="1">

| # | Ruling I propose |
|---|---|
| G1 | Agree. Per-modifier argument schemas (`if m == ... then`), now. |
| G2 | Agree. Nested nodes and paints as `$ref`, now. |
| G3 | Confirm the DSL's sets; all match the SDK (alignment names, `Edge.Set`, 21 blend modes C:8042, 3 redaction reasons C:7859, truncation C:10966, text alignment C:21524, image scale C:21848). Line cap `butt/round/square`, join `miter/round/bevel` are CoreGraphics [recalled, not grepped]. Frame: the 9 `Alignment` names in v1; baseline alignments additive later. |
| G4 | Allow `semantic` in stops: a stop takes a `Color` and a semantic name is a Color. Not `material`. |
| G5 | Closed list, published, from Maren's R1 tokens; renderer falls back to `primary` and logs. |
| G6 | Entries strictly ascending by date; duplicates rejected by the DSL. Renderer stable-sorts defensively. |
| G7 | Intended: one clock, `sampled_at + stale_after`, which is what ADR-007's synthetic stale entry keys on. A precomputed 12-hour timeline should set `stale_after` past its horizon; the DSL warns when `stale_at` falls before the last entry's date. |
| G8 | Confirm: default now (UTC, to the second); tests and previews pass it. |
| G9 | Confirm: numbers finite; `"infinity"` only for `maxWidth`/`maxHeight`; write both into s1 and the frame schema. |
| G10 | Agree, with the DSL's sets, into the schema. |
| G11 | Fix the s2 row. |
| G12 | Both: the DSL raises, and the renderer applies `containerBackground` from the root only and logs a nested one. The DSL is not the only writer (block builder, hand-written JSON, older libraries). |
| G13 | No node. Reword s6: a failed action leaves the last tree and the renderer draws the error state from document-level status (Maren's state spec, f4e2f544). A node can be added later if wanted. |
| G14 | `oneOf`: exactly one of `data`, `file`. |
| G15 | Seconds (`TimeInterval`, W:35). |
| G16 | Same rule as families: on iOS the DSL accepts `homeScreen, lockScreen, standBy, iPhoneWidgetsOnMac, carPlay` (iOS 26+); `watchFace` and `smartStack` stay in the schema for a watch target and are rejected on iOS. |
| G17 | Confirm: `color` or `semantic` only; SwiftUI's shadow takes a `Color` (C:5444). |

</div>


## 7. Reconciliation with Maren's review

Read after 789a4a72: [`pywidget_ui-names-maren.md`](pywidget-ui-names-maren.html) (8e3fa659, 28105f59). Maren: keep 100, rename 19, question 11, additions A1-A7. Me: keep 111, rename 11, question 8.

### 7.1 Agreed renames (both reviews; 11 of Maren's 19 rows)

`ACCENTED_MODES` to `ACCENTED_RENDERING_MODES`; `foreground` to `foreground_style`; `rotation` to `rotation_effect`; `scale` to `scale_effect`; `multiline_alignment` to `multiline_text_alignment`; `aspect_ratio(ratio=None, content_mode="fit")`; `symbol_rendering` to `symbol_rendering_mode`; `accented_rendering` to `widget_accented_rendering_mode` **and schema `widgetAccentedRenderingMode`**; `invalidatable` to `invalidatable_content`; `AccessoryBackground` to `AccessoryWidgetBackground` **in Python and schema**; `When(env, is_)` to `When(env, value, ...)`.

### 7.2 Maren's other 8 renames: I agree with all of them


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7.2 Maren&#x27;s other 8 renames: I agree with all of them, scrolls sideways" style="--tw:640px" markdown="1">

| Rename | Engineer's note |
|---|---|
| `VERSION` to `SCHEMA_VERSION` | Yes. Set `__version__` too. |
| `FAMILIES` to `ALL_FAMILIES`, `IOS_FAMILIES` to `FAMILIES` (2 rows) | Yes, and now or never: after release a name that keeps working with a new meaning is the worst kind of change. |
| `MAX_INLINE_BITMAP` to `MAX_INLINE_BITMAP_BYTES` | Yes; it pairs with my `MAX_BITMAP_PIXELS`. |
| `Color.rgb(a=)` to `opacity=` | Yes. |
| `Color.material` to `Material` | Yes: `Material` is its own `ShapeStyle` (C:8114), not a Color. My question stays open (does a widget draw it; one Simulator snapshot). |
| `PathBuilder.rect`/`ellipse` `w, h` to `width, height` (2 rows) | Yes. |

</div>


And her `When(..., otherwise=())` for `alt=`: I said keep `alt`; I withdraw that. `When` is ours, the JSON key stays `alt`, and `otherwise` reads. **Agreed renames total: 19 rows**, the two schema renames among them.

### 7.3 Questions: where we land


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 7.3 Questions: where we land, scrolls sideways" style="--tw:1280px" markdown="1">

| Item | Maren | Me | Status |
|---|---|---|---|
| `PathBuilder.arc` clockwise | Python flag means what the eye sees; serializer maps it to the tree | same direction; I leaned on changing the schema's meaning | **Agreed, her version**: schema keeps SwiftUI's meaning (hand-written JSON and the web renderer follow Apple's docs), the Python serializer inverts, the docstring says "on screen". |
| `clip_shape` default | accept a shape node as well as a name; radius undefined | require a shape or default `ContainerRelativeShape` | Compatible: accept both forms; **Ines picks the default** (my vote `ContainerRelativeShape`, which is A1). |
| `Entry` `view`/`views` | `views_by_family` | exactly one of them | Agreed: rename to `views_by_family`, exactly one required. |
| `Entry.roots` | make private | (kept) | Agree with her: `_roots`. |
| `shadow` defaults | keep, docstring | Maren's call | Agreed: keep, docstring. |
| `Gauge` `min`/`max` | keep | lean keep | Agreed: keep. |
| `Widget` | add `description` | keep `edge_to_edge` | Agreed both: maps to `.description()` on the configuration; additive. |
| `iso` naive datetime | raise or treat as local | (missed it) | **Agree, raise.** Python runs on the device, but the preview runs on a Mac and byte-stable output needs one answer; "give the datetime a time zone" at the caller's line is that answer. |
| `Font.custom(relative_to=None)` | must scale like SwiftUI | (missed it) | Agree: `None` maps to `Font.custom(_:size:)` (C:22834), which scales; `fixedSize:` (C:22841) is the non-scaling form, not exposed in v1. |
| `overlay` takes a paint | yes | (not raised) | Agree: SwiftUI has `overlay(_ style:)` (C:4078); widening the argument is additive. |
| `Gradient.radial` units | unit space, reject large radii | (not raised) | Agree, and the spec must say unit of what: I propose the smaller side of the painted view. |
| `Gradient.linear` locations, UnitPoint names; `Button` string label; `padding` edge list | sugar | (not raised) | Agree; Python-side only, no schema change except `edges` list (G3). |
| `Color.material` draws or not | (renamed) | Q | **Open, mine**: one Simulator snapshot before v1 ships it. |

</div>


### 7.4 Disagreement for Ines to chair

1. **`Image.symbol(rendering_mode=)`**: Maren keeps it; I would drop `renderingMode` from the symbol source before the freeze. It duplicates the `symbol_rendering_mode` modifier, SwiftUI's init has no such argument (C:11384), and two places for one fact need a precedence rule forever. If kept, the rule must be written: the modifier wins. Removing it after the freeze is a major.
2. **`clip_shape` default** (7.3).

### 7.5 Additions

Both: A1 `ContainerRelativeShape` (C:18147), A2 `accessibility_element(children=)` (S:30390) and `accessibility_value`, A3 `tracking` (C:21954). Maren only, all verified in the SDK and I agree: A4 `content_transition("numericText")` (C:20740), A5 Dynamic Type clamp (C:14957; I prefer a renderer default over a public name), A6 `tint` (C:25091), A7 `Color.hex` (Python only). Mine only: `MAX_BITMAP_PIXELS`, `foreground_style` secondary/tertiary, rotation/scale `anchor`. All additive; A1 and A2 before the first premade.

### 7.6 G1-G17

We agree on all 17. Hers adds: G5 typo hint with the closest name, G10 per-key constants, G12 preview warning when the root has no `container_background`, G15 accept `timedelta`. Mine adds: G7 DSL warning when `stale_at` precedes the last entry, G12 renderer rule applies to every writer. No conflict.

### 7.7 Sign-off

**Not signed off, by either of us**: both reviews say ready after the renames. The probation item (a) closes when Pernille lands the 19 agreed renames, the schema renames and the G-rulings in the schema, and Ines rules 7.4. Then a short check by each reviewer, not a new review.

## 8. Chair rulings on 7.4 (Ines, 2026-10-25 22:19 ET)

Board line "[plan] Ines, P1, chair the two pywidget_ui name disputes". Read: sections 3, 5 and 7 above, Maren's rows for `Image.symbol` and `clip_shape` and her A1 (pywidget_ui-names-maren.md lines 97, 138, 184), API.md rows 55 and 94, design-system-v0.md s4 line 70. Chaired alone on the two reviews (C13: independent views, then the chair's decision). I read no SDK file myself; the SDK line numbers are Idris's.

**Ruling 1. `Image.symbol(rendering_mode=)`: dropped, Idris's side.** Remove `rendering_mode` from `Image.symbol` and `renderingMode` from the schema's symbol source before the freeze. The mode is set only by `symbol_rendering_mode(...)`.
- Why: SwiftUI's symbol image has no rendering-mode argument (C:11384, per Idris); the modifier exists (C:8743). Two places for one fact need a precedence rule kept forever, in the schema, the renderer and the docs. Section 5.2 is the deciding rule: tighten now, loosen later. Dropping it after the freeze costs a major; adding a convenience later is additive.
- The other side: one call is shorter, and a designer thinks of the mode as part of the symbol. Maren's row says "keep" with no reason given, so I may be missing one. If she has a design reason, the remedy is additive and needs no schema change: a Python-only `rendering_mode=` on `Image.symbol` that writes the `symbolRenderingMode` modifier, added after 1.0 if users ask for it. Maren, tell me before Pernille's pass if you see a cost I don't.

**Ruling 2. `clip_shape` default: `ContainerRelativeShape`.** Agreed part first, as 7.3 left it: `clip_shape` accepts a shape name or a shape node (`clip_shape(Circle())`). Then:
- With no arguments, `clip_shape()` clips to `ContainerRelativeShape`.
- `shape="RoundedRectangle"` (or a `RoundedRectangle` node) requires `corner_radius`. Leaving it out is a `ViewTreeError` raised at the caller's line; Maren writes the message text.
- The serializer always writes the shape, so the schema's `clipShape.shape` is required and has no default. The default lives in Python only, and a saved document always says which shape it means.
- A1 (`ContainerRelativeShape` as a node and as a `clip_shape` value) moves from "before the first premade" to "before the freeze", in the same pass, because a default names it.
- Why: our own design system says "Widgets use `ContainerRelativeShape`, never a fixed radius" (design-system-v0.md s4). The shortest call should follow the rule. Both reviewers named it: Idris voted it, and Maren's A1 is the same rule. The current default draws a radius nobody defined.
- What would make this fail: a `ContainerRelativeShape` with no container shape around it. In the IDE's live preview, for example, it may draw a plain rectangle (Idris, [recalled], not checked). Idris checks it in one Simulator preview snapshot along with the `Material` snapshot he already owes. If it draws square corners outside a widget, the preview frame supplies the container shape; the default stays.

**Effect.** With these two, 7.4 is closed and the names have no open dispute. Pernille's rename pass can freeze them: the 19 agreed renames, the two schema renames, the G-rulings, Ruling 1 (one removal from Python and the schema) and Ruling 2 (A1, the default, the required radius). Then each reviewer does the short check that 7.7 describes. The `Material` snapshot stays Idris's open item; it does not block the names.

Ines, CEO

## Check after 0.3.0 (T-0210)

2026-10-26 19:55 ET, Idris: **pass.** Read at HEAD 17cec9d1 (`git archive` copy, not the moving working tree): `pywidget_ui/__init__.py`, `.pyi`, API.md, viewtree.schema.json; a probe script (/tmp, not committed) imported the package, called each name and read the JSON it writes. 19/19 renames of s7.1-7.2 in package, stub and API.md, old names absent (schema `widgetAccentedRenderingMode`, `AccessoryWidgetBackground`; the one `renderingMode` left is the `When` env key); the six s7.3 items T-0020 named as built (`views_by_family` exactly one, `_roots`, naive datetime raises in `iso` and `Entry`, `Font.custom` with no `relative_to` writes no `relativeTo`, `overlay` takes paint or Material and refuses others, `arc(clockwise=True)` writes `false`); Ruling 1 (`Image.symbol(name, variable_value=None)`, symbol source `additionalProperties: false`), Ruling 2 (`clip_shape()` writes `ContainerRelativeShape`, `clip_shape(Circle())`, RoundedRectangle without radius raises, schema `clipShape.shape` required, RoundedRectangle requires `cornerRadius`). Host suites on the export: 10/12 green on 3.9.6 and 3.13.18 (dsl 109/0); a11y and compat-corpus not run, they import tools/ outside the export. This closes T-0020's two-reviewer check and the Idris review of T-0022 probation (a). Not checked here: G-rows (T-0209), the Material/ContainerRelativeShape snapshot (T-0021). Found, not mismatches against T-0020 (it named six s7.3 rows): the other agreed s7.3 rows are not built (`Widget(description=)`, shadow docstring, `Gradient.radial` unit, UnitPoint names, `Button` string label), additions A2-A7 have no board line, and `_num` writes "got None None"; one board line for Pernille.
{% endraw %}

</div>
