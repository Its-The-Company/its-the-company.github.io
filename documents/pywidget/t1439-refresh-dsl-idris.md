---
layout: "default"
title: "Review: T-1439, ui.RefreshButton and ui.Updated (ebb68f4b1, with 3ae4d2a56)"
section: "documents"
description: "Verdict: pass with fixes. B1 and the DSL half of B3 do what the spec asks. The tests kill every mutant on the new checks except one. Nothing here blocks T-1440. Three fix lines go to Pernille (T-1833 for F1, T-1834 for\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1439-refresh-dsl-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1439-refresh-dsl-idris.md</code></span></div><h1>Review: T-1439, ui.RefreshButton and ui.Updated (ebb68f4b1, with 3ae4d2a56)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-03 (T-1792, Commandment 13). Read against state-spec s10 (a) to (c) and its build lines B1 and B3 ([`pywidget/docs/design/states/state-spec.md`](state-spec.html)), not the author's notes. Line numbers are main at 657afa5ca.

**Verdict: pass with fixes.** B1 and the DSL half of B3 do what the spec asks. The tests <span title="A test written in advance. If it fires, we drop the idea.">kill</span> every mutant on the new checks except one. Nothing here blocks T-1440. Three fix lines go to Pernille (T-1833 for F1, T-1834 for F2 and F3, T-1835 for F4 and F5) and one question goes to Maren (T-1836). None of them is a crash, data loss or App Review risk. No security findings, so nothing is held.

## The four checks the task names


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The four checks the task names, scrolls sideways" style="--tw:960px" markdown="1">

| Check | Result | How I checked |
|---|---|---|
| `RefreshButton()` writes `{"t":"Button","p":{"action":"pywidget.refresh"}}` with an `arrow.clockwise` label | Yes | `python/pywidget_ui/__init__.py:1302`; `test_refresh.py` `test_writes_the_reserved_button_exactly` pins the whole dict, label included |
| `@widget.action` refuses every name starting `pywidget.` | Yes, but case-sensitive (F2) | `__init__.py:1736`; mutant M1 killed (3 failures) |
| `ui.validate` and the schema accept that Button with no `actions` entry, and still refuse other unknown actions | Yes for `ui.validate` (`__init__.py:1308`, `:2056`). The schema never checks a Button's action against `actions`, so it accepts everything (F4) | M4 (a Toggle may use refresh) and M5 (the whole prefix exempt) both killed |
| `Updated` carries what the renderer needs to pick the oldest shown time | Yes. The node needs no data of its own. `sampled_at` is required on every timeline (schema `:38`). Bound fields' `at` lives in `data/<id>/fetch.json`, and the tree names its fields in `p.bind.field` (bound-fields s3, s4). bound-fields s5 step 7 says "the renderer reads no file", so the provider has to carry each drawn field's `at` into the entry beside the resolved value. That is T-1440's job, not the node's. `bind` is not on main yet (the schema has no `textBind`, and bound-fields s10 names an unmerged branch), so on main the rule can only reach `sampled_at` today. Notes for T-1440 are below | Read the schema and bound-fields s3 to s6 |

</div>


## Host suites and hand mutants

- `python3 pywidget/tests/run_host.py --both dsl widgets` on main: dsl 259 tests, widgets 137 tests (1 expected failure), on 3.9.6 and 3.13.18. 0 failed suites.
- I made one hand mutant at a time in a scratch copy of `pywidget/python`, `pywidget/tests` and the schema, never the checkout, and ran `python3 -m unittest test_refresh` (baseline OK):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Host suites and hand mutants, scrolls sideways" style="--tw:640px" markdown="1">

| Mutant | Result |
|---|---|
| M1 `Widget.action` prefix check removed (`:1736`) | killed, 3 failures |
| M2 schema Updated rule emptied (`viewtree.schema.json:837`) | killed, 2 failures |
| M3 `validate` reserved-name check on `actions` removed (`:1999`) | killed, 1 |
| M4 `_undeclared_action` lets a Toggle use `pywidget.refresh` | killed, 1 |
| M5 `_undeclared_action` exempts the whole `pywidget.` prefix | killed, 4 |
| M6 schema Updated: `p` half dropped | killed, 1 |
| M7 schema Updated: `c` half dropped | killed, 1 |
| M8 schema Updated: `alt` half dropped | **survived** test_refresh. On the whole dsl suite it gave the same 2 failures and 9 errors as the scratch baseline (those come from files the scratch copy lacks), so it survives there too (F5) |

</div>


## Findings

**F1, medium. The IDE console says taps do nothing, including the refresh tap.** `__init__.py:1855` sets `has_tap` for any Button, so a widget whose only control is `RefreshButton()` prints `_TAP_NOTICE` (`:1916`), "Buttons and toggles are drawn but do not respond to taps until PyWidget 1.1." That is true today. It stops being true when T-0678 and T-1440 connect the refresh button to the Refresh intent in 1.0. A message that tells the person their refresh button does nothing, while it works, is the kind of console line people learn to ignore. Fix: in `_check_trees`, count a Button whose action is `_REFRESH_ACTION` as no tap. Add a test: a tree whose only control is `RefreshButton()` prints nothing on stderr, and one with `RefreshButton()` plus `Button("add")` prints the notice once. Land it in the same window as T-1440, not before.

**F2, low. The reserved prefix is case-sensitive, but the Widget.id rule is not.** `__init__.py:1736` and `:1999` use `startswith("pywidget.")`, so `PyWidget.refresh`, `PYWIDGET.x` and `Pywidget.anything` are accepted (I checked this on the host). API.md's `Widget.id` row refuses `pywidget.` "compared ignoring case". An author's `PyWidget.refresh` action is a different name, and it reads like the system one in Activity and in error messages. Fix: compare `name.lower().startswith(_RESERVED_ACTION_PREFIX)` in both places, keep the message, and add `PyWidget.refresh` and `PYWIDGET.x` to `test_action_refuses_the_pywidget_prefix` and to the `validate` test.

**F3, low. `ui.Button("pywidget.refresh", ...)` gets past the one-glyph rule.** `ui.Button` (`:1287`) accepts the reserved action with any label and with `args`, and `_check_trees` lets it through (`ui.validate` returns `[]` for `Button("pywidget.refresh", "Go", args={"a": 1})`; I checked this on the host). s10 (a) asks for "one name, one glyph, one behaviour". The document check must keep accepting a refresh Button, because B1 says so and the renderer maps it. The DSL entry point is a different matter. Fix: `ui.Button` and `ui.Toggle` refuse an action starting `pywidget.` with "use ui.RefreshButton()". `validate` refuses `args` on a `pywidget.refresh` Button, because the intent takes none. Add one test for each.

**F4, low. The schema and `ui.validate` disagree on reserved names in `actions`.** `ui.validate` refuses `actions["pywidget.refresh"]` (`:1999`). The schema's `actions` object (`viewtree.schema.json:79`) does not. Swift checks no action names at all (no hits in `ios/` outside Tests). A hand-written or Shortcut-built document with that key passes the schema. Fix: add `"propertyNames": {"not": {"pattern": "^(?i:pywidget\\.)"}}` to `actions`. Use a plain `^[Pp][Yy]...` class if the Swift checker lacks inline flags; match F2's case rule either way. Add a schema test with `deep_errors` on a document that has that key. Move the sentence "A Button whose action is pywidget.refresh ... needs no actions entry" out of the Updated rule's description (`:839`) into the `actions` or Button description, where a reader looking for it will find it.

**F5, low. `ui.validate` does not mirror the Updated rule, and the `alt` clause is untested.** The schema refuses `p`, `c` and `alt` on Updated (`:837`). `ui.validate` returns `[]` for all three (I checked this on the host). That matters wherever the schema checker is not run: the DSL cannot build such a node, but a document from elsewhere can. M8 shows the `alt` clause has no test. Fix: in `validate`, report `Updated takes no props or children` for any of the three, and add the `alt` case to `test_schema_refuses_a_time_or_children_on_the_age_node` and a `ui.validate` twin.

## For T-1440 and T-1793 (renderer and AgeLine rule; no fix in T-1439)

The node carries nothing, so the renderer has to resolve these points itself. None of them is a defect in T-1439.

1. **"Draws" means after `When` resolution, per family and per entry.** A bound field in an untaken `When` branch, or in another family's tree, does not count.
2. **A bound field with no value yet** (the `--` placeholder) has no `at`. It is skipped, as in bound-fields s6 ("fields ... that have a value").
3. **Mixed trees: the spec has a gap, and it needs a <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>.** s10 (c) says "the earliest `at` among the bound fields the tree draws, else `sampled_at`". A tree that draws a bound field and also a number the script computed would then show the field's newer `at`, while the script's number is as old as `sampled_at`. That breaks the same paragraph's rule: "never claims a newer picture than the oldest number on it". Using `min(sampled_at, at)` everywhere would be wrong for bound-only widgets, because a reload refetches fields without rerunning the script (bound-fields s5, "with the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> flag off"). So it needs a rule, for example an author marker, or "`min` when the tree has a `Text` that is not bound and not a literal". I have put this question to Maren.
4. **VoiceOver:** the DSL writes no label on the refresh Button, so the renderer has to supply "Refresh", and "Refreshing" while pending (s10 a). The `Updated` label "Updated at {time}" is the renderer's too.
5. **B1's Swift half** ("a tree with it validates in ... Swift") is not in this pair of commits. The board's T-1440 line carries it. No iOS test reads `tests/dsl/golden/catalog-v1.json`, which already <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a `RefreshButton`, so feeding that golden to the Swift decoder would cover it cheaply.
6. **The exemptions are scoped correctly:** `ios/Tests/TreeNodesTests.swift:504` and `tests/widgets/test_gallery.py` exempt only `Updated` and name T-1440 and T-1441. Until T-1440 lands, `TreeView` draws an `Updated` node as `EmptyView`. `PremadeSnapshotTests` reports unknown nodes in premades, so B4 cannot adopt `Updated` early without a test going red.
{% endraw %}

</div>
