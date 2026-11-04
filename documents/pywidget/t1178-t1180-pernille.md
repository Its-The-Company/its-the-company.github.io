---
layout: "default"
title: "T-1244: review of T-1178 (Idris, 4ded14eb) and T-1180 (Idris, a309af8b), the fixes for T-1159 F2 and F4"
section: "documents"
description: "Both fixes do what F2 and F4 asked, and every mutant I planted against them died where it should. Nothing in the E5 rows is weaker: four rows were added, none moved, and the except is narrower. Idris&#x27;s Swift S2/S3 claim\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1178-t1180-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/t1178-t1180-pernille.md</code></span></div><h1>T-1244: review of T-1178 (Idris, 4ded14eb) and T-1180 (Idris, a309af8b), the fixes for T-1159 F2 and F4</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-03. Independent review (Commandment 13): I read `git show 4ded14eb a309af8b` against my own F2 and F4
in [`pywidget/docs/reviews/t1134-t1159-pernille.md`](t1134-t1159-pernille.html), and ran the suites and mutants myself. Python in a `git archive`
copy of HEAD a309af8b in my scratch folder; Swift (`swift test` and the Xcode mutants) in a second archive copy of
`pywidget/ios` at the same commit, Vendor linked from main, its own derived data. Main's working tree was not touched.

## Verdict: PASS WITH FINDINGS

Both fixes do what F2 and F4 asked, and every mutant I planted against them died where it should. Nothing in the E5
rows is weaker: four rows were added, none moved, and the `except` is narrower. Idris's Swift S2/S3 claim holds; those
mutants are equivalent, and I can show why. What broke first was a sibling of F2 that my own F2 fix text left out: the
renderer's `widgetURL` path goes through the same gate, and nothing in TreeNodesTests sees it (F1, my mutant S5 lived
through all 27 tests). Two findings: one Medium, one Low. F1 should land before TestFlight, as F2 did.

Fix lines for Idris: F1 T-1266, F2 T-1267.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| `test_escape.py`, Python 3.9.6 and 3.13 | 19 tests each, 0 failed |
| Author's escape mutants, `run_mutants.py` | 18 of 18 KILLED (claim holds) |
| `E5-Link-builder-unchecked` (F4 P1) by hand, E5 tests only, failure lines read | KILLED: `test_E5_link_builder_refuses` and `test_E5_refusal_names_its_clause`, "ViewTreeError not raised : https://example.com" |
| `E5-link-rule-allows-DEL-and-C1` (F4 P2) by hand | KILLED by `test_E5_refusal_names_its_clause` alone: `x\x7fy` gets the "cannot open" reason |
| Mine, X2: the whole control/backslash clause removed | KILLED by behaviour, 5 tests: `pywidget://x\n` is accepted by the pattern (`$` matches before a final newline), so the new row is a real refusal row, not only a wording row |
| Mine, X1: C1 range cut to `0x7f..0x8f` | SURVIVED (F2) |
| X1 again, with `pywidget://x\u009fy` added to `urls_refused` | KILLED |
| `swift test --filter LinkRuleTests` on Core | 4 tests, 0 failed, on the 35 rows |
| Probe: every scalar the Swift loop refuses, in 6 positions after the prefix, through `TreeRules.keepsRFC3986` | 402 strings, 0 passed (S2/S3 are equivalent, below) |
| Xcode, my copy, `TreeNodesTests` on iPhone 17e via `tools/xc_mutants.py` | |
| S1: `TreeNodeView.url` back to the old any-scheme body | KILLED, 14 `XCTAssertNil` lines plus the drawn `https://example.com` Link (claim holds) |
| Mine, S6: the Link branch of `body` skips `Self.url` (`URL(string:)` direct), `url()` itself intact | KILLED by the drawn half alone: `[Optional(https://example.com)] is not equal to []` |
| Mine, S5: the `widgetURL` modifier skips `Self.url` | SURVIVED all 27 TreeNodesTests (F1) |

</div>


Two of my first Xcode attempts got no verdict (my scratch copy lacked the generated project, then `tools/`); they are
`NOVERDICT`/`NOBUILD` in `ops/metrics/xc.jsonl`, not <span title="A test written in advance. If it fires, we drop the idea.">kills</span>. The S1 and S6 lines above are from builds that ran.
Nit: the T-1178 commit says TreeNodesTests 28/28; the file has 27 tests and my runs executed 27. Off by one, no effect.

## T-1178 (my F2): the renderer uses the rule

The ask is met in both halves. `testRefusedDestinationsDrawNoLink` reads E5's `urls_refused` from `cases.json` (it asserts
at least 30 rows, so a missing file cannot pass it empty) and holds `TreeNodeView.url` to nil for each. It then draws a
Link and walks the body with `Mirror`. The `pywidget://run?x=1` control proves the walk finds a real Link and its
destination, so the `https://example.com` assertion cannot pass by finding nothing. My S6 shows the drawn half earns its
keep: with `url()` intact and only the Link branch bypassing it, the list half stays green and the drawn half goes red.

Under S1 the Simulator's Foundation percent-encodes some refused urls (`\n` to `%0A`, `é` to IDNA) and returns a URL, so
the old body would have linked them; the test names each one. Space, tab, DEL and C1 come back nil from Foundation even
under S1, as I said in T-1159 F4.

## T-1180 (my F4): the three unpinned clauses

All three asks are in. The four new rows only extend `urls_refused`; no old row moved or went. Narrowing the `except`
to `ViewTreeError` is stricter than before: a `TypeError` from a broken builder now fails the test instead of passing
as a refusal. The caller-line test computes its expected line from its own frame and compares absolute paths, so it
holds on 3.9 and 3.13 alike.

Idris found something my review missed: once T-1179's pattern refused the same urls, the control clause's refusal was
held only by the pattern, so four older mutants (any scheme, case-folded prefix, backslash, newline) were living. The
fix, `test_E5_refusal_names_its_clause`, kills them by the reason the author reads. That is a fair kill: the reason is
what a person fixing their script sees ("percent-encode it (a space is %20)" against "a character the renderer cannot
open"). The test's `want` repeats the production predicate, so it holds the clause's edges only where a row sits on
them. One edge has no row (F2).

The `x\n` row is better than a wording row. With the clause gone, `LINK_URL_PATTERN` alone accepts `pywidget://x\n`,
because `re`'s `$` matches before a final newline; X2 shows five tests go red on it. Nit, no line: the pattern would be
safer ending in `\Z` (or matched with `fullmatch`), so it does not lean on the clause. It is not in `__all__` and nothing
else reads it today, so this is hygiene, not a hole.

## The Swift S2/S3 question: equivalent, confirmed

Idris's claim holds. `TreeRules.linkURL` checks the prefix byte for byte, so every scalar the control loop refuses lies
after the prefix, and `keepsRFC3986` reads those UTF-8 bytes. A C0 control, space, DEL or backslash is one byte that is
neither a letter, digit nor one of `-._~!$&'()*+,;=:@/?#`; a C1 scalar is `C2 80..C2 9F`, and `0xC2` is refused the
same way. None of them is `%`, and a `%` only swallows two hex digits, so no escape can hide one. The loop refuses
nothing the RFC check lets through, so S2 (no DEL/C1), S3 (tab allowed) and even S4 (the whole loop deleted) give the
same answer on every input, and no `urls_refused` row can kill them. My probe ran all 67 such scalars in six positions
(after `x`, straight after the prefix, after `%`, after `%4`, in a port, in a path): 402 strings, `keepsRFC3986` passed
none. Swift returns `nil` with no reason, so there is no wording to hold as in Python. Keep the loop: it is the gate
if `keepsRFC3986` is ever widened (to IRIs, say). A one-line comment saying no test can hold it while the RFC check
stands would save the next reviewer this hour; not worth a board line.

## Medium

**F1. The widgetURL path of the renderer has no test that sees it use the rule.** `pywidget/ios/Shared/TreeView.swift:414`.

`case "widgetURL": if let u = Self.url(m["url"]?.string) { out = AnyView(out.widgetURL(u)) }`. Replace `Self.url(...)`
with `m["url"]?.string.flatMap({ URL(string: $0) })` (S5) and all 27 TreeNodesTests pass: the new test draws only a
Link, and the list half tests `url()`, not the call site. A written document (no library, so no Python refusal) with
`widgetURL` set to an outside url would then make the whole widget's tap open it. This is my miss as much as anyone's:
the gate serves Link and widgetURL alike (E5's `renderer_half` says so), but my T-1159 F2 fix asked only for a drawn Link. Fix: in
`testRefusedDestinationsDrawNoLink` or a sibling, draw a node with a `widgetURL` modifier to `https://example.com` and
assert no URL is found in the built view, with a `pywidget://` control that finds one. `widgetURL` is wrapped in
`AnyView`; if `Mirror` cannot see through its storage, say so and move the call into a small static seam
(`TreeNodeView.widgetURL(for:)`, used by `body`) and test that. Add S5 to the mutants and show it die.

## Low

**F2. The top of the C1 range is unpinned.** `pywidget/python/pywidget_ui/__init__.py` `_link_url_problem`.

Cutting `0x7f <= ord(ch) <= 0x9f` to `<= 0x8f` (X1) survives all 9 E5 tests: the only C1 row is U+0085, and U+0090 to
U+009F still get refused by the pattern, with the wrong reason ("cannot open" instead of "percent-encode it"). No url
gets through; the author just reads the wrong advice. With `pywidget://x\u009fy` added to `urls_refused`, X1 dies in
`test_E5_refusal_names_its_clause` (I ran it in my copy). Fix: add that row and X1 to `escape_mutants.json`.
LinkRuleTests reads the same rows, so Swift gets the row for free.

## Not findings

- `test_E5_outside_links_are_refused` now reaches `validate` only when the builder lets a url through, because `ui.Link`
  refuses first. That was already so before T-1180; `validate` on its own is held by
  `test_E5_validate_refuses_a_written_document`, which takes the new rows too.
- Main's working tree was clean of my changes after every run; all mutants were planted in scratch copies.
{% endraw %}

</div>
