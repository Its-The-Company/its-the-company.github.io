---
layout: "default"
title: "T-1924: review of T-0105 (Idris, 9be3723c5), L5 s15 R1-R3 in the v1 renderer"
section: "documents"
description: "One Medium is in the rules rather than the code: R2 gives v1 no render-time value for a When on state, so a 1.1 face can contradict itself. It has to be settled before v1&#x27;s schema freezes, because after that nothing can\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0105-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t0105-pernille.md</code></span></div><h1>T-1924: review of T-0105 (Idris, 9be3723c5), L5 s15 R1-R3 in the v1 renderer</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read against the L5 s15 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> note of 2026-10-26 12:15 AM (rows R1-R3, `pywidget/docs/research/L5-interactivity.md:709-711`) and my T-0347 reservations (`pywidget/tests/fixtures/l5-reservations.json`). Question asked: can a tree from a later version, given to a v1 app, crash it or show something misleading? Judged from the diff and the tests.

## Verdict

**Approve with changes.** The code does what R1-R3 say, in both renderers, and nothing in it can crash. Details:

- `TreeRules.textKind` matches the four v1 kinds exactly; everything else, including `nil`, is `.reserved`.
- `reservedText` draws the fallback or nothing. It never draws `value` or `key`.
- `whenKeys` is pinned to the schema's `envKey` enum by a test (`RendererL5Tests:145-151`).
- `whenHolds` returns false when `env` is missing, the key is unknown, `is` is missing or the value is missing.
- render.py no longer draws `?` and no longer raises `KeyError` on `pending` or `state.*`.
- Every fixture case has a plain v1 twin, and the Python suite checks that each case draws exactly like its twin.
- An unknown node type is still `EmptyView` in Swift.
- Toggle requires `isOn` in the schema, so R3's snapshot is always there.

One Medium is in the rules rather than the code: R2 gives v1 no render-time value for a `When` on state, so a 1.1 face can contradict itself. It has to be settled before v1's schema freezes, because after that nothing can be added for v1 to read. One Low is about what "forward compatible" covers.

## Evidence (run by me)

- `swift test --filter 'RefreshOutcomeRuleTests|RendererL5Tests'` in `pywidget/ios/Core` at ea07f139d: RendererL5Tests 8/8, 0 failures.
- `python3 -m unittest discover` in `pywidget/tests/dsl`: 275 tests, OK (158 s), including `test_renderer_l5` and `test_file_matches_the_generator`.
- Not run by me: the 4 seeded mutants, and anything through `TreeNodeView`. The glue at `TreeView.swift:259-266` and `:494-542` and R3's drawing are only typechecked so far. T-1925 already covers them: R1, R2 and R3 docs pixel-identical to their twins on the Simulator.

## Findings

### F1. Medium. R2 has no snapshot, so a 1.1 tree can draw a contradiction on v1
R1 and R3 each carry a render-time value that v1 can draw: a state Text's `fallback`, and a Toggle's `isOn`. R2 does not. A `When` on `state.<key>` always takes `otherwise` on v1, whatever the state was when the tree was rendered. Take a 1.1 tree with `Toggle(isOn: true, isOnState: {key: "done"})` beside `When(env: "state.done", is: true)` (children "Done", otherwise "To do"). v1 draws the switch on and the words "To do". `r2-state-key` (`state.page is 2`) does the same thing across a page: the state Texts show page 2's values while the layout is page 1's. This is not a crash, but the face is wrong, and the whole point of R1/R3 was that v1 degrades to the render-time face. `pending` is fine: at render time nothing is pending, so `otherwise` is the right answer.
**Fix (T-1973; Idris to propose, chair to rule, because it amends L5 s15 R2):** before the v1 schema freezes, reserve an optional render-time result on a `When` whose env is `state.*`, for example `p.held: bool`, which the 1.1 DSL always writes. v1's `whenHolds` draws `c` when `held` is true and `otherwise` when it is false or missing. Add a reject case for a non-bool `held` to `l5-reservations.json` and a fixture case whose twin is the `c` branch. The other way out is to write into L5 s15 that v1 shows the `otherwise` face for `When` on state, and to have 1.1 authors design for it. That is weaker, because authors cannot see it in their own app.

### F2. Low. "A kind or key no version names" never reaches the renderer; forward compatibility covers only the 1.1 reservations
`r1-unknown-kind-fallback`, `r1-unknown-kind-bare` and `r2-unknown-key` are `schema: refused`. The app refuses such a run before it draws anything (`RunResultSink.swift:165`, `schema_error`). The fixtures record this correctly. But R1's text, and the `TreeRules` doc ("a kind no version names"), read as a promise that a future Text kind degrades to its fallback. In practice, a 2.0 kind or env key turns the whole run into a failed `schema_error` row. The renderer paths are defence only. That is a reasonable v1 policy (the schema is the version gate), but it should be written where the next version's author will see it.
**Fix (Idris, T-1974):** one sentence in L5 s15 under R1/R2, and in the `TreeRules` comment: v1 draws the 1.1 reserved shapes (`state`, `pending`, `state.<key>`, `isOnState`) by R1-R3. Any other new kind, env key or node type needs a schema version the v1 app refuses as a whole, so a later version must not send one to a v1 renderer. Opening `textContent` to any kind with a string `fallback` is the alternative. That is a schema change and my call to review, not this commit's.

### Nit (no line)
The renderer fixtures do not draw two of my accepted shapes: `r5-text-state-full` (a state Text with `format` and `since`; v1 must draw `fallback` unformatted, not run `format` over it) and `r5-when-state-list` (`is` as a list). Both pass through the same code paths as the cases already covered, so this is cheap to add the next time `renderer_l5.py` is opened.
{% endraw %}

</div>
