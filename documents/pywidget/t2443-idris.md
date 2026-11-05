---
layout: "default"
title: "Review: T-2235, tint refuses WidgetCard in each layer (8159bb54, with f17d6e523)"
section: "documents"
description: "Verdict: pass. The three new tests each pin one layer&#x27;s refusal, and each goes red when that layer alone is broken. No product file changed, so there is no crash, data-loss, concurrency or App Review exposure. Two low\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2443-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2443-idris.md</code></span></div><h1>Review: T-2235, tint refuses WidgetCard in each layer (8159bb54, with f17d6e523)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-05 (T-2443, Commandment 13). Author: Pernille. 8159bb54 is only the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-outbox tick (`ops/lane-outbox/b3-...-25788.json`); the work it ticks is f17d6e523 (the same tree change as 7afe6a4bd), which touches one file, `pywidget/tests/dsl/test_names_s75.py`. Read against review F1 in [`pywidget/docs/reviews/t0309-python-half-idris.md`](t0309-python-half-idris.html), the product code and the schema, not the author's notes. Line numbers are personal/a3 at 56fe5867a.

**Verdict: pass.** The three new tests each pin one layer's refusal, and each goes red when that layer alone is broken. No product file changed, so there is no crash, data-loss, concurrency or App Review exposure. Two low findings, both test hygiene. No board lines (nothing Medium or higher).

## What the change claims, and what I checked


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the change claims, and what I checked, scrolls sideways" data-n="2" style="--tw:706px" markdown="1">

| Claim | Result | How I checked |
|---|---|---|
| The writer refuses `tint(ui.WidgetCard())` | Yes | `test_ui_refuses_widget_card` (`test_names_s75.py:121`) asserts `ViewTreeError` and the reason's ending, from `_paint` (`python/pywidget_ui/__init__.py:385`) called by `Node.tint` (`:741`) |
| The schema alone refuses a tint modifier with widgetCard paint | Yes | `test_schema_refuses_widget_card_paint` (`:129`). It also asserts that `containerBackground` with the same paint gives no errors, so the first assertion cannot pass on a malformed node. Good control |
| `ui.validate` reports it on a hand-written tree | Yes | `test_validate_reports_widget_card_tint` (`:134`) asserts a clean baseline, then the exact path and message from `__init__.py:2045-2047` |
| The suite stays green | Yes | `python3 pywidget/tests/run_host.py dsl --both`: 281 tests on 3.9.6 and 3.13.18, 0 failed suites. The tick said 278; the 3 extra are later tests (2 in 3cc4f9096, T-1977; 1 in 1c357fee8, T-2340/T-2341), not a mismatch |

</div>


## Hand mutants (re-planted by me)

One at a time, in a scratch copy of `pywidget/python`, `pywidget/tests` and `pywidget/docs/design` under `/tmp`, never the checkout. `python3 -m unittest test_names_s75.TintTests`; baseline OK, OK again after restore.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Hand mutants (re-planted by me), scrolls sideways" style="--tw:589px" markdown="1">

| Mutant | Result |
|---|---|
| M2 `Node.tint` passes `"container_background"` to `_paint` (`__init__.py:741`) | killed (1 failure, 1 error; see F1) |
| M7 schema tint rule's `paint` ref `#/$defs/paint` changed to `#/$defs/containerPaint` | killed, 1 failure |
| M11 `validate` skips the card check when `m` is `tint` (`__init__.py:2045`) | killed, 1 failure |

</div>


## Findings

**F1, low. Under a writer break the Toggle case never runs, and the run shows an AttributeError rather than a clean failure.** `test_names_s75.py:123-127`: the `with self.subTest(...), self.assertRaises(...) as cm:` block holds only the `tint` call, and the reason check at `:126` sits after it, outside the subTest. When `tint` stops raising, the subTest records the failure and swallows it, then `cm.exception` raises `AttributeError: '_AssertRaisesContext' object has no attribute 'exception'` outside the subTest. That ends the loop, so the `Toggle` node is never tried. I reproduced this with M2: `FAIL ... (node='Text')` plus `ERROR ... AttributeError`, and no Toggle line. The test still goes red, so nothing gets through today; both nodes share `Node.tint`. But a later change that refuses for Text and not for Toggle would be reported as a Text failure, and the error line points a reader at the test instead of the product. Fix: open the subTest first, then the `assertRaises` block, and put the reason check inside the subTest after the inner `with`:

```python
for node in (...):
    with self.subTest(node=node.to_dict()["t"]):
        with self.assertRaises(ui.ViewTreeError) as cm:
            node.tint(ui.WidgetCard())
        self.assertTrue(cm.exception.reason.endswith(...), cm.exception.reason)
```

**F2, low. The validate test hard-codes the modifier index.** `:142` expects `.m[1]` because `widget_doc`'s render (`:34`) writes exactly one modifier before the appended tint. If that helper ever gains a modifier, this test fails with a confusing message, not a false pass. Fix: compute the index from the root before appending (`i = len(root["m"])`) and expect `".m[%d]: widgetCard paint ..." % i`.

## Notes (no finding)

- `CARD` is a mutable class attribute (`:119`). `test_validate_reports_widget_card_tint` copies it (`dict(self.CARD)`), and `CHECKER.errors` does not mutate its input, so sharing it is safe today.
- The Swift side of tint (T-1786, my own half, 574916ff1) is outside this review. Whether the renderer's decoder refuses a widgetCard tint when the schema check has been skipped belongs to that work's own reviewer.
{% endraw %}

</div>
