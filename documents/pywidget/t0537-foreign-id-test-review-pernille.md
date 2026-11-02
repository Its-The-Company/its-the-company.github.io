---
layout: "default"
title: "T-0537 review: ProStoreCatchUpForeignIDTests (a1d17dd4), Pernille"
section: "documents"
description: "xcodegen generate, then tools/xc.sh ... test -only-testing:PyWidgetTests/ProStoreCatchUpForeignIDTests on iPhone 17e."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0537-foreign-id-test-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 11 · Sun Nov 1</span><span><code>pywidget/docs/reviews/t0537-foreign-id-test-review-pernille.md</code></span></div><h1>T-0537 review: ProStoreCatchUpForeignIDTests (a1d17dd4), Pernille</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: PASS

## What ran
- `xcodegen generate`, then `tools/xc.sh ... test -only-testing:PyWidgetTests/ProStoreCatchUpForeignIDTests` on iPhone 17e.
  Without the mutant: 1 test, 0 failures (0.039 s).
- With the mutant (ProStore.swift, refreshEntitlement: `grants(read.filter { $0.transactionID == owedID }, ...)` replaced
  by `grants(read, ...)`; the source names the id `owedID` there, not `aheadID`): same test, 5 failures: lines 36
  (Pro locked after receive), 38 (reloads 3, not 1), 44 and 46 (reloads 4, not 2). Source restored with
  `git checkout`; `git diff` on pywidget/ios/App is empty. The sources live in pywidget/ios/App/Store, not Sources.

## Done-line check
- tx(3) listed, tx(2) not: asserted (reload stays 1, Pro <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>).
- receive(tx(3, revoked)): Pro holds, `catchUp.isCancelled` false, no reload, reads == 3 (pins the scripted order).
- tx(2) read ends the window: reloads go 1 to 2, and a further read stays at 2.
- Deterministic: injected reader, 30 s catch-up delay never elapses, task cancelled and awaited at the end, no clock or I/O.

## Findings
- F1, Info: the window's end is observed through the reload count (owedID cleared) and not through `grantedAheadID`
  (private). The second refresh, which reads tx(2), also cannot tell a closed window from an open one. Acceptable: the
  mutant dies on four assertions. A final read returning `[]` that drops Pro would pin the close directly; optional.
- F2, Info: the test's final `catchUp.cancel()` is cleanup, not the window ending; the catch-up task is not what ends it
  here. The comment says the read ends it, which is right.

No change required.
{% endraw %}

</div>
