---
layout: "default"
title: "T-2703: review of b37435587 (Idris, T-2663 + T-2664, the privacy scan fixes from my T-2410 F1-F4)"
section: "documents"
description: "What is on main. b37435587 never reached main. The same patch landed as fce7c8b50 (git show diffs of the two are byte-identical). Nothing after fce7c8b50 touches the six files. I reviewed main at a8034c87f."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2663-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 17 · Sat Nov 7</span><span><code>pywidget/docs/reviews/t2663-pernille.md</code></span></div><h1>T-2703: review of b37435587 (Idris, T-2663 + T-2664, the privacy scan fixes from my T-2410 F1-F4)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-07. Host only (no xcodebuild, no Simulator; Idris holds the Xcode slot).

**What is on main.** b37435587 never reached main. The same patch landed as fce7c8b50 (`git show` diffs of the two are byte-identical). Nothing after fce7c8b50 touches the six files. I reviewed main at a8034c87f.

**Verdict: PASS.** All four T-2410 findings are fixed, and I re-ran every check myself. I found two Lows. Neither blocks the first TestFlight upload, and on today's tree neither changes the shipped answer: 32 picked units, no listed read, and the App manifest stays C617.1 alone.

## What I ran (record: `pywidget/ios/bench/t2703-review-runs.txt`)

- Privacy suite, `python3 -m unittest discover` in pywidget/tests/privacy: main checkout 37 OK; scratch tree (`git archive HEAD pywidget`) 37 OK, with 1 skipped because the scratch tree has no Vendor/.
- `t2120_guard_mutants.py <scratch> t2703`: 46 mutants, all as expected. The output matches `t2663-guard-mutants.txt` line for line apart from the label. Y1 is CEILING. Y2, Y3 and Y4 are KILLED, and each <span title="A test written in advance. If it fires, we drop the idea.">kill</span> names its own unit (stampPair, stampHandle, stampFn). M5 is CEILING and M5n is KILLED.
- `t2664_suite_mutants.py <scratch> t2703`: unmutated green; S1-S7 all RED, each on the row it names. This matches `t2664-suite-mutants.txt`. S3 is my T-2410 seeded mutation, and it now turns the suite red.
- My own probes Z1-Z11 of the new rules (`pywidget/ios/bench/t2703_guard_probes.py`, results in the record). Real tree: `scope_units` = 32 units.

## The four T-2410 findings

- **F1 (T-2663): fixed.** `assert_picked_units_need_no_undeclared_reason` (test_user_granted_files.py:460) checks the ceiling at :466, before it builds the hits. The harness has a CEILING verdict. `test_the_app_row_reports_a_blow_up_before_any_hit` (:668) pins the order in both directions. At 65 units the red names the ceiling and does not mention 3B52.1. At 64 units the same hit is the guard's own red. Suite mutant S4 puts the old order back and turns that row red.
- **F2 (T-2664): fixed.** Three rows now hold the rules: :591 (X1-X6 with the X5c and X6c controls), :632 (Y2-Y4, plus a no-token class, a Void stored closure and an open-and-stop-in-place store as controls) and :668 (the ceiling). Removing `token_types`, the Bool-opener rule, the handle-class rule or the stored-closure rule turns the suite red (S1-S3, S5, S6). So does widening the handle-class rule back to my first proposal (S7).
- **F3 (T-2664): fixed, and the rule is narrower than the one I proposed, which is better.** :312 counts a type as a token when one of its member bodies stops a scope that the same body did not open. My rule (any body that calls start or stop) is S7. It makes the store type in M5 a token and takes the set past the ceiling. On the real tree every stop sits in the same body as its start (ProjectTransfer.swift:182-183, FilesCall.swift:324-325 and :344-346), so the new rule adds no token there. deinit, actor and struct-with-`mutating func` handles are all caught (Z1, Z3, Z4).
- **F4 (T-2664): fixed.** The docstring and privacy-label.md s4b now limit the tuple gap to "a tuple that holds neither a function nor a token type". Y4 is linked: `passes_scope` reads a `let`/`var` from its annotated function type, and `@Sendable`, `static`, computed-var and closure-taking forms all work (Z7, Z8, Z9). The stored closures it does not follow (Optional or typealias type, or one that returns a Bool opener's call) are named in both lists. Z10 confirms the Optional case is a real gap and that it is named.
- **M5's record:** expects CEILING, and the reason is stated: its closure is named `stamp`, which collides with two `static func stamp(_ date:)` and gives 66 units. M5n, the same closure under a name nothing else declares, keeps the kill. I agree with the change. M5 was only ever killed because of the order F1 removed.

## Findings

### 1. Low. A stop in an extension of the handle type, or in a helper, does not make a token, and the limit lists say it does
`pywidget/tests/privacy/test_user_granted_files.py:290` (only `struct`/`class`/`actor` spans are read) and `:312`. The wording is at `:382-383` (scope_units docstring) and `pywidget/docs/release/privacy-label.md:126` (s4b).
- **Failure.** Probe Z2 is `final class H` with an init that opens the scope, plus `extension H { func close() { url.stopAccessingSecurityScopedResource() } }`. It is not a token, and the caller's `.creationDate` read is missed. Z5 is the same class with `close()` calling a file-level `stopScope(url)`, and it is also missed. In Swift an extension method is a member of the type, and putting `close()` in a conformance extension is ordinary style. Both lists say a stop handle is unlinked only "in a type with ... no member that stops a scope it did not open", so for Z2 they claim coverage that does not exist. For a user: nothing changes today, because the real tree has no handle class. If a future handle class puts its stop in an extension and its caller reads a modification date, the app could ship without 3B52.1 while the guard shows green. That is the false-negative direction the label is meant to rule out.
- **Fix.** The cheapest fix: also gather the member bodies of `extension <Name>` spans (TYPE_HEAD already finds them) and add the name when the type is declared as a struct, class or actor in the sources. Add Z2 as a KILLED mutant. This should not change the real tree, because every real stop shares a body with its start. Otherwise, name "a stop in an extension or in a helper the member calls" in both lists and record Z2 and Z5 as expected survivors, as Q2 is.

### 2. Low. The ceiling message tells the reader that a hit past the ceiling is never a reason to declare, but M5's hit is real
`pywidget/tests/privacy/test_user_granted_files.py:466-468`
- **Failure.** M5 plants a genuine scope-opening closure that reads `.contentModificationDate`. It now fails on the ceiling with "this is not a reason to declare anything". The red stays red, which is the part that matters, and narrowing the set will surface the hit afterwards. But the message as written tells the engineer to dismiss the hits, and some of them may be true. For a user: at worst, a narrowing that drops the real reader along with the blow-up turns the row green, and 3B52.1 is never declared.
- **Fix.** Put the number of FILE_TS hits in the ceiling message without naming 3B52.1, for example "...; N listed reads in the set: re-check them once it is back under the ceiling". This keeps `assertNotIn(USER_GRANTED, ...)` at :676 true.

## Checked and fine
- The harness's CEILING test (`"AssertionError"` and `"scope_units picked"` in stderr) cannot hide a KILLED expectation: a mutant expected as KILLED that hits the ceiling is reported as a mismatch.
- In `token_types` the blanking of nested types keeps each nested type's braces, so the outer type still sees an empty member body, never a merged one.
- For `let`/`var` units, `passes_scope` rejects `(URL)` alone and a closure type wrapped in an Optional, so only a top-level function type counts. The Bool-opener fixpoint still calls `passes_scope` without aliases, as it did before.
- The real tree gives 34 token types, almost all of them from the earlier function-typed-property rule, and 32 picked units, half of the ceiling of 64.

## Board
T-2663 and T-2664 are already ticked and were archived on 2026-11-06 (e455d277c), so Idris has no lines left to tick. This review closes the review those ticks were waiting for. The two Lows are for Idris, and I have not added board lines for them.
{% endraw %}

</div>
