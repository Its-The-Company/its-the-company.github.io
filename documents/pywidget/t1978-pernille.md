---
layout: "default"
title: "T-1978: review of Idris&#x27;s R2a build (T-1977, commit 3cc4f9096, When p.held)"
section: "documents"
description: "The shape matches the chair line and my F1. held decides only off the v1 keys, only a JSON true draws the children, and on the v1 keys the live value decides. Swift and Python agree on every well-formed input I could\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1978-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1978-pernille.md</code></span></div><h1>T-1978: review of Idris's R2a build (T-1977, commit 3cc4f9096, When p.held)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent review (Commandment 13). I judged from the diff, RendererL5Tests and
test_renderer_l5, against the T-1973 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line (L5 s15, 2026-11-04 01:05) and my F1 in [`t0105-pernille.md`](t0105-pernille.html). I did
not read the done-note first. The 1.1 DSL writing `held` is 1.1 work and is out of scope here.

## Verdict: approve with changes

The shape matches the chair line and my F1. `held` decides only off the v1 keys, only a JSON `true` draws the
children, and on the v1 keys the live value decides. Swift and Python agree on every well-formed input I could
build. Two Low findings, both test gaps that mutants got through, go to Idris. Neither changes the reserved shape,
so revert rule (b) does not trigger and the chair has nothing to rule again.

## What I ran

- `swift test --filter RendererL5Tests` in `pywidget/ios/Core` at HEAD: 11 tests, 0 failures.
- `python3 -m unittest discover -s . -p 'test_*.py'` in `pywidget/tests/dsl`: 280 tests, OK.
- **A parity grid, Swift against Python, 630 `p` shapes.** Envs: family, stale, colorScheme, isLuminanceReduced,
  state.done, pending, locale, Stale, missing. `is`: true, false, "systemSmall", "light", two lists, missing.
  `held`: missing, true, false, 1, 0, "true", null, [true], {"v": true}, 1.0. Python drew each one through
  `render.render`, using the R2a fixture doc. Swift compiled the real `TreeRules.swift` with a verbatim copy of
  `JSONValue` (TreeTimeline.swift:11-33) and of `TreeNodeView.when` (TreeView.swift:261-268). It decoded each `p`
  with `JSONDecoder`, as the app does. Result: **0 disagreements on the 480 shapes that have both `env` and `is`.**
  On this host's Foundation, `held: 1` and `held: 1.0` decode as `.number`, not `.bool`. Swift takes `otherwise` for
  them, as Python's `is True` does, so Idris's "1 is not true" holds on the real decoder path and not only in the
  test's `isBool` model. The other 150 shapes, with `env` or `is` missing, are in Nit 2.
- **Mutants (12)**, planted in a scratch worktree at 3cc4f9096, with the L5 suites run each time:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" data-n="1" style="--tw:680px" markdown="1">

| id | change | result |
|---|---|---|
| S1 | TreeRules.swift:140 `held == true` to `held != false` (missing held draws children) | killed |
| S2 | :140 `return true` (old R2 inverted) | killed |
| S3 | drop `"stale"` from `whenKeys` (held now overrides a v1 key) | killed |
| S4 | drop `"dynamicTypeSize"` from `whenKeys` | killed |
| S5 | v1 key with no lookup value falls back to `held` | killed |
| P1 | render.py:734 `is True` to `== True` (1 draws children) | killed |
| P2 | `is not False` (missing draws children) | killed |
| P3 | `in (True, "true")` | killed |
| P4 | render.py:728 drop `"dynamicTypeSize"` from `have` | **survived**, also against the full 280-test DSL suite (F2) |
| P5 | v1 key: `and held is not False` (held false overrides the live value) | killed |
| C1 | viewtree.schema.json:860 `"type": ["boolean", "null"]` | **survived** (F1) |
| C2 | schema: `held` with no type | killed |

</div>


## Checks asked for

- **v1 keys ignore `held`.** Yes. TreeRules.swift:140-142 tests membership in `whenKeys` before it reads `held`, and
  render.py:731-734 tests `env in have` first. The fixture covers this with `r2a-v1-key-held-true` and
  `-held-false`, plus `testR2aHeldIsReadOnlyOffTheV1KeysAndOnlyWhenTrue`. Mutants S2, S3, S5 and P5 were killed.
- **Only JSON `true` draws the children; 1 and "true" draw `otherwise`.** Yes, on both renderers and on the real
  decoder (see the grid). The fixture records `held: 1` and `"true"` as `refused` by the schema, so on device they
  never reach the renderer (RunResultSink, my T-0105 F2). The renderer paths are defence, and they are correct.
- **Swift and Python agree.** On every well-formed case, yes (grid). The two sides differ only on shapes the schema
  refuses (Nit 2).
- **Schema row.** `held` is optional and boolean, not in `required`, and allowed on any env (the accept case
  `r2a-when-held-v1-key` covers a v1 key). The L5 s13 R2a row and the s15 view say what the code does. `pending`
  with `held: true` draws the children (`r2a-pending-held-true`), as the chair line says ("`state.<key>`,
  `pending` ... draws its children if `held` is true"), and 1.1 writes no `held` on `pending`.

## Findings

### F1. Low. No reject case pins `held: null`
`pywidget/tests/dsl/l5_reservations.py:118-121` rejects `1` and `"true"`. Nothing rejects `null`: mutant C1
(viewtree.schema.json:860, `"type": ["boolean", "null"]`) passes every test. `null` is the slip a Python package is
most likely to make (`held=None` serialises as `null`), and it is the one that matters at the freeze. If a later
edit widens the type, a v1 validator on a phone accepts `null` for good. Both renderers already read it as
missing, so the face is right today. The gap is only in the fixture.
**Fix:** add `r2a-when-held-null` to REJECT (pointer `WHEN + "/p/held"`) and regenerate `l5-reservations.json`.

### F2. Low. Nothing pins render.py's v1 key set to the schema's `envKey`, and R2a makes a missing key a wrong face
Mutant P4 drops `"dynamicTypeSize"` from `have` (render.py:726-728) and passes all 280 DSL tests. The Swift twin
(S4, `whenKeys`) is killed, so the two lists can drift on the Python side only. Before R2a, a key missing from
`have` took `otherwise`. Now, if `held` is true, the children are drawn, so a v1 `When` on a dropped key would
follow `held` in the design renderer and the live value in the app. `test_r2a_held_decides_off_the_v1_keys_and_nowhere_else`
(test_renderer_l5.py:98) splits on `ui.ENV_KEYS`, the DSL's list, never on render.py's `have`, so it cannot see the drift.
**Fix:** a test that render.py's `When` treats every schema `envKey` as a v1 key. Either assert that `have`'s keys
equal `$defs.envKey.enum` (<span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> `have`'s keys to a module constant so the test can read it), or draw
`When(env=k, is=<a value it does not hold>, held=True)` for each `k` in `envKey` and expect `otherwise`. Mutant P4
must then fail.

### Nit 1 (no line). `assertIn(True, ...)` is also satisfied by the `1` case
test_renderer_l5.py:115: `True in [..., 1, ...]` is true in Python, so the "covers held true" check would pass
without a `held: true` case. The count of 8 and the per-case expectations hide this today. `any(v is True for v in held.values())` says what it means.

### Nit 2 (no line). Shapes the schema refuses: Swift lets `held` decide, Python raises
With `env` or `is` missing (the schema requires both), render.py:725 `p["env"], p["is"]` raises KeyError. That is
older than this commit. On the same input, TreeRules.swift:140 returns `held == true`, so a `When` with no `env` and
`held: true` draws its children (11 of the 150 such shapes). The app never reaches this, because RunResultSink refuses
the run first. If someone later touches the defence path, `guard let env` failing could take `otherwise` without
reading `held`, which is what "names something v1 cannot look up" means.

### Note. The TreeView call is proved off the host only by my grid
`RendererL5Tests.whenHolds` models `held` with `ViewTreeSchema.isBool`, not with `JSONValue.bool`. TreeView.swift:267
and `JSONValue` are app-target code. The grid above uses the real decoder and a verbatim copy of the call. The
Simulator twin still rides T-1925, as Idris's view says. No new line.

## Board lines added for Idris
- T-2340 (F1, a reject case for `held: null`) and T-2341 (F2, render.py's v1 keys pinned to `envKey`), both P3 host-only, under Build: pywidget.
{% endraw %}

</div>
