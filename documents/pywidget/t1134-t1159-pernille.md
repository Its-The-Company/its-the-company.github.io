---
layout: "default"
title: "T-1159: review of T-1134 (Idris, 1e317410), the outside-link refusal"
section: "documents"
description: "I could not get a widget tap out of the app. Both halves refuse every url in E5 and every outside scheme I tried; the prefix is compared byte for byte, so the scheme is pywidget to any parser. What broke first was not\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1134-t1159-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1134-t1159-pernille.md</code></span></div><h1>T-1159: review of T-1134 (Idris, 1e317410), the outside-link refusal</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. Independent review (Commandment 13): I read `git show 1e317410` against L12 section 12 item 5
and the escape corpus (`pywidget/tests/escape/cases.json`, T-1107), not the author's notes. Host only, in a detached
scratch worktree at 1e317410 (main has no later change to these files): Python 3.9.6 and 3.13.18, `swift test` on the
Core package. No Xcode, no Simulator.

## Verdict: PASS WITH FIXES

I could not get a widget tap out of the app. Both halves refuse every url in E5 and every outside scheme I tried;
the prefix is compared byte for byte, so the scheme is `pywidget` to any parser. What broke first was not the rule but
a gallery widget the rule now refuses (F1), and the renderer's wiring has no test that can see it go (F2). F1 and F2
should land before TestFlight. Six findings: two Medium, three Low, one held.
Fix lines for Idris: F1 T-1177, F2 T-1178, F3 T-1179, F4 T-1180, finding 5 T-1181, F6 T-1182.

## What I ran


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| `run_host.py dsl escape widgets --both` | 712 tests (356 on each of 3.9, 3.13), 0 failed |
| Author's escape mutants, `run_mutants.py` | 15 of 15 KILLED (claim holds) |
| Author's Core mutants `mutants-t1134.json`, `swift test --filter LinkRuleTests` only | 4 of 4 KILLED (claim holds, and by LinkRuleTests alone) |
| Three Python mutants of mine, against dsl + escape + widgets | 3 of 3 SURVIVED (F4) |
| Control: author's `E5-link-rule-accepts-any-scheme`, same command | KILLED (the harness works) |
| Three Swift mutants of mine | 3 of 3 SURVIVED (F2, F4) |
| 30 edge urls through `_link_url_problem` and `TreeRules.linkURL` | 16 accepted by Python, dropped by Swift (F3); none opens outside the app |

</div>


Not run: the full host set of 1218 (subset above), and `TreeNodesTests` (Xcode target). The scratch worktree was clean
after every Swift mutant (`git status` empty).

## Medium

**F1. Script output fails to build for a script whose name has a space.** `pywidget/widgets/gallery/script_output.py:76`,
`:85`; same pattern at `pinned_note.py:44`, `:57`, `package_updates.py:31`.

These gallery widgets build their link by gluing data onto `pywidget://` with no encoding. `shortcuts.py:32` does it
right (`urlquote(name, safe="")`). The script name is the person's own file, and a space in one is ordinary. With
state `{"script": "my backup.py"}` the widget no longer builds: `ViewTreeError: script_output.py, line 85: widget_url
'pywidget://runs/my backup.py' has a space...`. The whole widget goes, not just the link. Before T-1134 that url passed
Python and Foundation percent-encoded the space. `{"script": "backup|v2.py"}` builds, but the renderer drops the link
(F3), so the tap does nothing. `pinned_note` fails the same way on `{"id": "n 42"}`; its ids are app-made, so that one is
lower. Fix: `urlquote(segment, safe="")` in all three, and gallery states with a space and a `|` in the name.

**F2. Nothing checks that the renderer uses the rule.** `pywidget/ios/Shared/TreeView.swift:218`.

LinkRuleTests tests `TreeRules.linkURL`. TreeView is not in the Core package, so no host test reads `TreeNodeView.url`.
Mutant S1, putting back the old body (any url with a scheme), survives every host test by construction. By reading,
it also passes the only Xcode check, `TreeNodesTests.swift:302-304`: the old body also keeps the pywidget url and
drops `""` and nil. So the half that holds for a document that skipped the library can be undone without a red test.
Fix: in TreeNodesTests, `XCTAssertNil(TreeNodeView.url(u))` for every E5 `urls_refused` (read the corpus as
LinkRuleTests does), and one drawn `Link` to `https://example.com` that is not a Link. That runs in T-0043's Xcode queue.

## Low

**F3. Python passes urls the renderer drops, without a word.** `pywidget/python/pywidget_ui/__init__.py` `_link_url_problem`.

16 of my 30 urls: `pywidget://x|y`, `x^y`, `x{y}`, `x"y`, `x<y>`, `` x`y ``, `[`, `[::1`, `x%`, `x%zz`, `x:abc`, and
five outside ASCII. Each builds and validates, then `URL(string:)` returns nil, so the widget draws its children
unlinked. Nothing escapes, but the author gets no error and a dead tap. Fix: Python refuses what Foundation refuses
(RFC 3986 characters only, a `%` followed by two hex digits). Add a `urls_kept` list to E5 that both halves must
keep, so the halves are checked in both directions and not only on refusal.

**F4. Three clauses of the rule are unpinned.** `pywidget/tests/escape/test_escape.py`, `cases.json` E5.

Survivors on dsl + escape + widgets: P1 `ui.Link` built with `_str` instead of `_link_url`; P2 DEL and C1 allowed;
P3 tab allowed. P1 lives because `document()` calls `validate`, which still refuses, and `test_E5_outside_links_are_refused`
counts any `Exception` as a refusal. So the promised error at the caller's line for `ui.Link` has no test, though
`widget_url`'s has one. P2 and P3: the corpus has no tab, DEL or C1. In Swift, S2 and S3, the same two mutants in
`TreeRules.linkURL`, also survive LinkRuleTests. Foundation returns nil for those characters, so they do no harm on
this OS, but the clause is untested on its own. Fix: add `pywidget://x\ty`, `pywidget://x\u007fy`, `pywidget://x\u0085y`
to `urls_refused`. Add `test_E5_link_builder_refuses`: `ui.Link(url)` raises `ViewTreeError` naming the test file and line.
Narrow the `except` to `ViewTreeError`, and add P1 to P3 to `escape_mutants.json`.

**F5. Held.** Detail in the scratch folder for Idris (Commandment 42). It does not let a tap leave the app today.

**F6. L12 item 5 describes a router that is not there.** `pywidget/docs/research/L12-security.md:220`.

"The app router shows outside URLs instead of opening them ... The router half is unchanged." At 1e317410 the app has
no URL handler at all: no `onOpenURL`, no `CFBundleURLSchemes`. A widget tap opens the app and its url goes unread.
That is safe, but item 5 reads as two layers when there is one. Fix: write it as a duty for whoever builds the router,
and point to F5's note.

## Spec items, held to each


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Spec items, held to each, scrolls sideways" style="--tw:640px" markdown="1">

| L12 s12 item 5 | Result |
|---|---|
| `Link` limited to `pywidget://` | Holds in both halves (builder through `document()`, `validate`, renderer) |
| `widgetURL` limited to `pywidget://` | Holds in both halves |
| Refused `Link` drawn unlinked, refused `widgetURL` not applied | Holds by reading `TreeView.swift:162`, `:414`; untested (F2) |
| Every url sink in the renderer goes through the rule | Holds: the only two are `TreeView.swift:162` and `:414` |
| Nested views checked by `validate` | Holds: children, `alt`, modifier `view`, gauge labels |
| Schema carries the rule | No. Already a line: T-1158 |
| Router shows outside URLs | No router (F6) |

</div>
{% endraw %}

</div>
