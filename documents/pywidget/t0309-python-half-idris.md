---
layout: "default"
title: "T-1801: review of T-0309 Python half (66c442a3d), Idris, 2026-11-04"
section: "documents"
description: "Verdict: pass with fixes. Read against names review s7.3 (Widget description) and s7.5 (A3 tracking, A4 contentTransition, A5 clamp, A6 tint), not the author&#x27;s notes. Branch copy 93b970bfd is byte-identical to 66c442a3d\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0309-python-half-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t0309-python-half-idris.md</code></span></div><h1>T-1801: review of T-0309 Python half (66c442a3d), Idris, 2026-11-04</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
**Verdict: pass with fixes.** Read against names review s7.3 (Widget description) and s7.5 (A3 tracking, A4 contentTransition, A5 clamp, A6 tint), not the author's notes. Branch copy 93b970bfd is byte-identical to 66c442a3d under pywidget/.

## What I checked
- Host suites dsl + widgets: 3.9.6 412/0 (1 expected failure), 3.13 412/0.
- .pyi matches: `tint(paint: Paint)`, `tracking(points: Num)`, `content_transition(Literal["numericText"])`, `Widget.description` attribute and `description=` last in `__init__`, same order as the .py.
- Goldens: catalog-v1.json adds only the three modifier entries (twice, one per entry) and `widget.description`; compact differs only by those after a structural diff (the rest is list-position shift).
- 11 mutants planted in the real tree, each restored with git checkout (tree clean after):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I checked, scrolls sideways" style="--tw:512px" markdown="1">

| Mutant | Red? |
|---|---|
| M1 writer drops widget.description | red (goldens, stability) |
| M2 `tint` accepts WidgetCard (`_paint(..., "container_background")`) | **survives** |
| M3 tracking writes kerning | red |
| M4 content_transition unchecked | red |
| M5 schema tracking block gone | red |
| M6 schema transition any string | red |
| M7 schema tint paint -> containerPaint (card allowed) | **survives** |
| M8 schema description untyped | red |
| M9 tint not in schema enum | red |
| M10 tint not in MODIFIERS | red |
| M11 validate() lets a card through in tint | **survives** |

</div>


## Findings
- **F1 (fix).** The WidgetCard refusal on `tint` is claimed by the commit and API.md (`any paint but WidgetCard()`) but tested nowhere: three independent mutants (Python writer, schema, `validate`) survive the whole host run. pywidget/tests/dsl/test_names_s75.py:102-115 needs one test per layer: `ui.Text("x").tint(ui.WidgetCard())` raises; schema refuses `{"m":"tint","paint":{"kind":"widgetCard"}}`; `validate()` reports it.
- **F2 (fix).** pywidget/tests/widgets/test_gallery.py:59-62 exempts by subtraction (`MODIFIERS - mods - mods_not_yet == set()`): when the gallery starts using one of the three, the exemption stays silently. Use equality: `assertEqual(ui.MODIFIERS - mods, mods_not_yet)` with a comment naming T-1786, so drawing one turns it red until the set shrinks.
- **F3 (note, T-1786).** The T-1786 board line says tracking carries `{value, points}`; the schema writes only `value`. Checklist below is the authority.
- **F4 (note, T-1786, design risk).** `.description()` sits on a WidgetConfiguration, which is compiled into the extension, not read per document. A per-widget string from the tree may have nowhere to go except the intent/entity picker's subtitle. T-1786 must decide and say so in API.md before the row is marked agreed.
- Not a finding: `widget` has no `additionalProperties: false` (pre-existing); `When("dynamicTypeSize", accessibility…)` inside a widget writes a branch that never draws under A5, a possible later warning.

## T-1786 checklist (schema changes the Swift half must draw)
1. `widget.description` (string, optional): to the configuration's `.description()` or the agreed substitute (F4); absent means no call.
2. modifier `tracking` `{value: number}` (points) -> `.tracking(value)` (C:21954), not kerning.
3. modifier `contentTransition` `{transition: "numericText"}` -> `.contentTransition(.numericText())` (C:20740); no other value is valid.
4. modifier `tint` `{paint: $defs/paint}` -> `.tint(paint as ShapeStyle)` (C:25091); widgetCard never arrives (schema refuses it).
5. A5, no tree field: clamp every widget tree at `.dynamicTypeSize(...DynamicTypeSize.xxxLarge)` (C:14957), per `$defs.dynamicTypeSize.description`.
6. Then drop `mods_not_yet` (test_gallery.py:62), use the three in a gallery widget, one Simulator snapshot.
{% endraw %}

</div>
