---
layout: "default"
title: "T-0428: independent review of 28fadd67 (T-0365, Button and Toggle drawn with no tap)"
section: "documents"
description: "Pass, with one medium finding. The shipped behaviour is right: no tap path reaches an intent or writes state. The Button case is a plain ZStack of its children, the Toggle is SwiftUI shapes with no control, nothing in\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/renderer-button-toggle-t0428-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/renderer-button-toggle-t0428-pernille.md</code></span></div><h1>T-0428: independent review of 28fadd67 (T-0365, Button and Toggle drawn with no tap)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. 2026-10-27. Author: Idris. Form: independent review (C13), code and sheets only.

Read: `pywidget/ios/Shared/TreeView.swift` (Button, Toggle cases), `Shared/TreeNodes.swift` (`TreeToggle`),
`Tests/TreeNodesTests.swift` (5 new tests), `Tests/mutants-t0365b.json`; against `viewtree.schema.json` (node
`allOf`, Button/Toggle block), `render.py` `greedy` and `content` (Button, Toggle), `TreePaint.ink`/`roleAlpha`,
`ViewTreeSchema.swift` (if/then), `RunResultSink.validate`, `Shared/RefreshWidgetsIntent.swift`,
L5-interactivity.md <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note 2026-10-26 00:15 row V1 and Ines's chair line 2026-10-27 09:20 (T-0430);
sheets `ops/site-checks/renderer-v1/gallery-09-focus_timer-light.png`.

Ran (tools/xc_mutants.py, iPhone 17e Simulator, iOS 27.0, 09:23-09:30):
- the author's `mutants-t0365b.json`: 5/5 KILLED. The claim <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.
- three reviewer mutants (below), each run against all five new tests: 3/3 SURVIVED (logs
  ops/runs/xcodebuild-20261027-092322.log, -092352.log, -092417.log; 5, 5 and 3 tests executed, 0 failures).

## Verdict

**Pass, with one medium finding.** The shipped behaviour is right: no tap path reaches an intent or writes state.
The Button case is a plain `ZStack` of its children, the Toggle is SwiftUI shapes with no control, nothing in
`TreeView.swift` or `TreeNodes.swift` names an intent, and a tap falls through to `widgetURL` or the app, as V1 and
T-0430 require. Decoding is right for this architecture: the schema's `action` (both) and `isOn` (Toggle) are
refused at the gate (`RunResultSink.validate` -> `ViewTreeSchema`, which implements `if`/`then`), and the renderer
stays tolerant (missing label draws nothing, missing or non-bool `isOn` draws off), which is ADR-002 ruling 3 and
what render.py does (`p.get("isOn")`). Swift and render.py draw the same switch: 38 x 22 track, 18 pt knob 2 pt in,
8 pt gap, label greedy along x; full colour accent / bg.sunken; stripped track white 1.0 / 0.24 (`roleAlpha`
accent 1.0, bg.sunken 0.24 = render.py `tint_fg`/`base_fg` in LUMA); knob white 0.9. The blank Pause pill and the
blank on-switch in the stripped panels of the gallery-09 sheet are render.py's rule drawn faithfully and are
already T-0429 (Maren); the dark-card tracks are F1 (T-0433 item 2). Not repeated here.

What fails is the guard: the one property Ines ruled on this morning is the one no test can see.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:1084px" markdown="1">

| # | Severity | Where | Finding | Fix |
|---|---|---|---|---|
| R1 | Medium | `Tests/TreeNodesTests.swift:318-331`, `Tests/mutants-t0365b.json` | No test fails if a tap is wired in. Reviewer mutants that wrap the Button case (`TreeView.swift:164-168`) in `SwiftUI.Button(intent: RefreshWidgetsIntent()) { ... }.buttonStyle(.plain)`, or the Toggle (`TreeView.swift:171`) likewise, build and pass all five new tests: a plain-style intent button draws exactly the same pixels, and `placeholder(button)` (line 324) only catches UIKit controls. PreviewQueueTests' source scan does not catch it either: it greps `reloadAllTimelines`, which the mutant never names. V1 and T-0430 rest on "drawn, no tap"; the next person who reads `RefreshWidgetsIntent.swift`'s doc comment will wire it. | Add a source-scan test beside PreviewQueueTests' (same `sources` walk, comment lines stripped): over Shared/ and Widget/ only (the app's own screens may use buttons), `users(#"\b(Button\|Toggle)\s*\((intent\|action\|isOn):"#) == []`; over all three, `users(#"RefreshWidgetsIntent\(\)"#) == []` (no source calls it today; Shortcuts uses the type). Message names T-0430. Today the only hit of either pattern is the comment in R2, hence the stripping. Add the two "wired to RefreshWidgetsIntent" mutants below to `mutants-t0365b.json` with that test in their `tests`; both must be KILLED. |
| R2 | Low | `Shared/RefreshWidgetsIntent.swift:4-7` | The doc comment says the intent is in Shared "so the widget extension can put it behind a `Button(intent:)` (T-0365)". Ines rejected exactly that at 09:20 (T-0430 reason 2: the extension runs no Python, so the reload redraws the same tree.json and spends the reload budget). A comment that invites the rejected design is how R1's regression gets written. | Reword: in Shared for Shortcuts and the app; "not behind a widget Button in v1: T-0430 rejected it (L5 chair line 2026-10-27 09:20)". Ride with R1. |
| R3 | Low | `Shared/TreeNodes.swift:399` | `.widgetAccentable(isOn)` is untested and untestable here: the reviewer mutant `.widgetAccentable(false)` survives all three Toggle tests, because ImageRenderer does not apply the accented tint. On a device that mutant turns an on-switch's tinted track white in accented mode, i.e. T-0429 <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span>'s blank pill gets worse. | Add "a Toggle on and off, accented mode, home screen" to T-0433 item (1)'s extension-process check (gallery 09 systemMedium), and assert the on track takes the tint and the off track does not. No code change. |
| R4 | Low | `docs/design/widgets/render.py:694` vs `Shared/TreeNodes.swift:404` | The one drawing delta: render.py draws the knob's black `box-shadow` in every mode; Swift draws it in full colour only. Swift is the better rule (stripped modes carry luminance only, s8.3; a black shadow has no place in vibrant), and it is commented and mutant-guarded, but the reference and the renderer now disagree and the next sheet comparison will flag it. | render.py: emit the `box-shadow` only when `ctx.mode == "fullColor"`, so the reference matches. Maren's file; it belongs with T-0429 G2 (same knob), so no separate line. |

</div>


Not findings, checked: the Toggle's `accessibilityElement(children: .combine)` plus `accessibilityValue("On"/"Off")`
with no `.isToggle` or button trait is right for a control that takes no tap (VoiceOver does not promise an action);
a tree `accessibilityValue` modifier still overrides it from outside. `drawnNodes` now equals the schema's node enum
and the premade test pins it. The `writeSheet` extraction is a pure refactor of the T-0206 loop. The V1 console line
is on the Python side (`tests/dsl/test_reservations.py`), not the renderer's job.

Open, mine: the shared invalid corpus (`pywidget/tests/fixtures/schema-invalid/`, 10 documents) has no Button or
Toggle row, so the Swift validator's refusal of a Toggle without `isOn` or a Button without `action` is asserted
only in the Python suite. Low; I add two rows (board line below), no renderer change.

## Reviewer mutants (for R1 and R3)

```json
[
 {"name": "Button wired to RefreshWidgetsIntent (plain style)", "file": "Shared/TreeView.swift",
  "find": "            ZStack { childViews(children) }\n        case \"Toggle\":",
  "replace": "            SwiftUI.Button(intent: RefreshWidgetsIntent()) { ZStack { childViews(children) } }.buttonStyle(.plain)\n        case \"Toggle\":"},
 {"name": "Toggle wired to RefreshWidgetsIntent (plain style)", "file": "Shared/TreeView.swift",
  "find": "TreeToggle(isOn: props[\"isOn\"]?.bool ?? false) { ZStack { childViews(children) } }",
  "replace": "SwiftUI.Button(intent: RefreshWidgetsIntent()) { TreeToggle(isOn: props[\"isOn\"]?.bool ?? false) { ZStack { childViews(children) } } }.buttonStyle(.plain)"},
 {"name": "toggle track never accentable", "file": "Shared/TreeNodes.swift",
  "find": "                    .widgetAccentable(isOn)", "replace": "                    .widgetAccentable(false)"}
]
```

All three SURVIVED against the five new TreeNodesTests at 28fadd67. The first two must be KILLED after R1; the
third stays a device check (R3).
{% endraw %}

</div>
