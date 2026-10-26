---
layout: "default"
title: "ADR-002: Widgets are described by a versioned JSON view tree produced by a Python DSL"
section: "documents"
description: "C4 needs Python to describe widget UI that WidgetKit renders with SwiftUI. WidgetKit renders only an archived SwiftUI view hierarchy produced by the widget extension; Python cannot create SwiftUI views directly, and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/adr-002-widget-view-tree.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/decisions/ADR-002-widget-view-tree.md</code></span></div><h1>ADR-002: Widgets are described by a versioned JSON view tree produced by a Python DSL</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Status: proposed (Idris, 2026-10-25). Needs: Maren's design read, Ines's <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line, and the L3 execution decision (ADR-001 or later) before it is accepted.

## Context

C4 needs Python to describe widget UI that WidgetKit renders with SwiftUI. WidgetKit renders only an archived SwiftUI view hierarchy produced by the widget extension; Python cannot create SwiftUI views directly, and (L3, open) may not run in the extension at all. C6 (Builder blocks), C8 (web IDE preview) and C13 (design system templates) all need the same description. Full spec: [`../research/L4-view-dsl.md`](l4-view-dsl.html); schema: `../design/viewtree.schema.json`.

## Options considered

1. **Python builds a JSON view tree; a generic SwiftUI interpreter in the extension renders it.** One format serves iOS, web and the Builder. Python never has to be present at render time.
2. **Python renders bitmaps (Pillow) and the widget shows an image.** Simplest renderer. Loses Dynamic Type, vibrant and accented modes, self-updating text, accessibility and light/dark (spec section 10). Kept as a fallback node, not the design.
3. **Python emits SwiftUI source compiled at build time.** Impossible on device (no compiler) and against Guideline 2.5.2 for marketplace code.
4. **A fixed set of template widgets parameterized by Python values.** Easy, inexpressive; fails the "fully customizable" founder decision.
5. **Expose SwiftUI through a live bridge (Python objects wrapping views, rendered in-process).** Requires Python inside the extension on every render and ties the format to the Python process; the web IDE would need a second description anyway.

## Decision

Option 1. Specifically:

- Document shape `{schema, version, generator, widget, timeline, actions, state}`; node shape `{t, p, m, c}` with ordered modifiers; all dates ISO 8601 UTC; sorted keys so serializations are byte-stable.
- Node catalog v1: stacks, Spacer, Divider, Group, Text (string, date styles, timer interval, locale-formatted number), Image (SF Symbol, bundled asset, bitmap), Gauge, ProgressView (value or timer interval), five shapes, Path with seven commands in unit or point space, Button and Toggle bound to one generic App Intent by action name, Link, AccessoryBackground, and one conditional `When` keyed on render-time environment (family, renderingMode, showsContainerBackground, isLuminanceReduced, colorScheme, dynamicTypeSize, stale).
- Paint: raw color with optional dark variant, semantic colors, linear/radial/angular gradients, materials. Fonts: text styles (Dynamic Type), system size/weight/design, custom (bundled only).
- Timeline: entries with per-family `views` and a `view` fallback, relevance, `TimelineReloadPolicy` mirror, `sampled_at`/`stale_after`.
- Interactivity: `actions` map, Python handlers `(state, args) -> state` with a default 2 s timeout, state in the App Group, optimistic UI through `invalidatableContent`.
- Versioning: integer major; additive within a major; renderer ignores unknown modifiers/props and swaps unknown nodes for `alt`; the extension ships a renderer per major ever released.
- Builder: blocks compile to the same `pywidget_ui` calls (L17 option c on a); round-trip only for Builder-written files that still parse to the subset.

## Consequences

- Good: one contract, three renderers (SwiftUI, HTML/SVG, Builder preview is the SwiftUI one); old widgets keep rendering after app updates; a widget can be previewed on the web without a phone; the extension needs no Python.
- Good: the format is testable without Xcode (`pywidget/tests/test_viewtree.py` runs on the system Python 3.9).
- Cost: every SwiftUI feature we want must be added to the catalog, the schema, two renderers and the Builder; novel visuals wait for a release. Mitigation: `Path` covers charts and dials now; the bitmap fallback covers the rest with documented losses.
- Cost: a `When` conditional in the tree is a small interpreter inside a renderer. Kept to one node and seven env keys on purpose.
- Risk: the catalog grows into "SwiftUI in JSON". Rule: a node enters v1 only when one of the 15 gallery designs needs it.
- Depends on L3: if Python does run in the extension, `When` and `views` become optional optimizations; the format is unchanged.

## Evidence

- iOS 27.1 SDK interfaces (families W:938–974; rendering modes W:1040–1052; `widgetAccentedRenderingMode` W:176–189, iOS 18; `WidgetTexture.glass` visionOS-only W:12–24; `TimelineReloadPolicy` W:1659–1662; `containerBackground` S:15907; `invalidatableContent` S:2785; `Button(intent:label:)` AI:186; `Toggle(isOn:intent:label:)` AI:237; Gauge styles S:13066, 16258, 19952, 24449, 32371).
- Reference serializer and 20 unit tests: `pywidget/python/pywidget_ui/`, `pywidget/tests/test_viewtree.py`.
- Corrections to the brief recorded in [`../research/CORRECTIONS.md`](corrections.html) (tinted/clear are not API rendering modes; iOS 26 glass has no iOS widget API; `systemExtraLargePortrait` exists on iOS 27).
{% endraw %}

</div>
