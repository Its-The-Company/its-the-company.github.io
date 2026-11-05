---
layout: "default"
title: "T-2141: review of 91cc14f20 (App privacy guard, second round, T-2135..T-2140)"
section: "documents"
description: "Verdict: changes requested. Two Medium findings, F1 and F2. Both are regressions against the guard at 91cc14f20^. No High. The real tree is fine today: the guard finds 32 units, none of them makes a listed read, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2141-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2141-pernille.md</code></span></div><h1>T-2141: review of 91cc14f20 (App privacy guard, second round, T-2135..T-2140)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent review (Commandment 13). I judged from the diff, the suite and my own runs, not the author notes.

**Verdict: changes requested.** Two Medium findings, F1 and F2. Both are regressions against the guard at 91cc14f20^. No High. The real tree is fine today: the guard finds 32 units, none of them makes a listed read, and the App manifest is right at C617.1.

## What I ran

All runs used a scratch tree made by `git archive` of HEAD 873c8f983 (`/Volumes/Company SSD/company-scratch/T-2141-pernille/tree2`). The guard file there is byte-identical to 91cc14f20's. The recorded output is in `pywidget/ios/bench/t2141-guard-probes.txt`.

- `t2120_guard_mutants.py`: the unmutated guard passes, and all 33 mutants behave as expected. Q2 and P4c survive as intended; the other 31 are killed and name the right unit.
- Privacy suite (`unittest discover`, pywidget/tests/privacy): 34 tests OK, 1 skipped. The skipped test is `test_every_stdlib_extension_with_a_listed_api_has_a_verdict`, because the scratch tree has no Vendor/. I ran that test in the main tree, where it is OK. The commit message says "31 OK"; tests added since then make the count 34.
- Real tree: `scope_units(app_and_shared_sources())` gives 32 units out of 1460, with no FILE_TS hit. `Privacy/App/PrivacyInfo.xcprivacy` declares only C617.1, which is correct.
- My probes X1-X6 (`pywidget/ios/bench/t2141_guard_probes.py`) on the same tree. All six **survive the guard at 91cc14f20 and are killed by the guard at 91cc14f20^**.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" data-n="1" style="--tw:528px" markdown="1">

| id | shape | new | old |
|---|---|---|---|
| X1 | forwarding wrapper `withPickedFolder(u, body)` calls `withPickedScope(u, body)`; the caller passes `{ read }` | SURVIVED | KILLED |
| X2 | local closure: `let work = { read }; withPickedScope(u, work)` | SURVIVED | KILLED |
| X3 | `@autoclosure` wrapper: `pickedValue(u, u.creationDate)` | SURVIVED | KILLED |
| X4 | function reference: `withPickedScope(u, stampNow)` | SURVIVED | KILLED |
| X5 | `openPicked(u) -> PickedToken`, a struct that holds `access()`'s stop; the caller reads, then calls `t.stop()` | SURVIVED | KILLED |
| X6 | `beginPicked(u) -> Bool` wraps a Bool opener; `if beginPicked(u) { read; stop }` | SURVIVED | KILLED |

</div>


## Findings

### F1. Medium. A closure-taking wrapper is followed only at calls that contain a `{`
`pywidget/tests/privacy/test_user_granted_files.py:252` (`passes_closure`), used at `:336` and `:348`.
- **Failure.** The unique-name rule was dropped (F2 of T-2133). Its replacement follows a unit that takes a closure parameter only at call sites that pass a closure literal. If the body is forwarded (X1), held in a local (X2), passed as an `@autoclosure` (X3) or passed as a function reference (X4), the caller is never linked to the scope. The old guard caught all four. On X4, the same-file-helper pass also reached `stampNow`. The docstring's limit paragraph names a closure "passed by its name to a wrapper in another file". X4 is in the same file, and X1-X3 are not covered by that wording at all.
- **Cost of the fix, measured.** I patched `passes_closure` to return True, so every call of a closure-taking unit is followed. The real tree still gives the same 32 units and no hit. The literal-only rule buys nothing on today's tree, and it loses four <span title="A test written in advance. If it fires, we drop the idea.">kills</span>.
- **Fix.** Follow every call of a closure-taking unit. Assert a ceiling on the picked set (for example, at most 64 units) so that the T-2128 blow-up cannot come back unnoticed. Add X1-X4 to `t2120_guard_mutants.py` as KILLED. Correct the limit wording.

### F2. Medium. `-> Bool` and non-function returns no longer hand the scope on, and the stated limit does not say so
`test_user_granted_files.py:301` (`passes_scope` return rule), together with the docstring at `scope_units` and privacy-label.md s4b.
- **Failure.** Before this change, any return type handed the scope on. Now only a function type does. A wrapper that returns a token type holding the stop handle (X5) or the `Bool` from `startAccessingSecurityScopedResource()` (X6) is a common Swift shape, and its caller's read is now missed. T-2138 made this narrowing on purpose for `-> Bool`. Neither the docstring's "What this cannot see" paragraph nor privacy-label.md s4b mentions it, so a green run claims more than the guard checks.
- **Why not just widen it.** I measured the old rule (any return that is not Void) without the unique-name rule. On the real tree the picked set grows from 32 to 1155 units with 8 false hits (ProjectManifestReader, RunLogStore and others). That is exactly the false red T-2128 removed. So the fix is a narrow rule or an honest limit, not a revert.
- **Fix.** Either follow returns that carry the scope: a returned type whose declaration has a function-typed stored property, and a `Bool` return whose body returns an opener's call. Or, if Idris judges that too fragile, list X5 and X6 in the docstring and s4b beside the stored-closure limit and add them to the mutant record as expected SURVIVED, the way Q2 is. Either way, X5 and X6 go in the record.

## Lows (review file only)
- L1. The `name {` call rule also matches a control-flow brace after a call, as in `if f.check(u) { }`, so `passes_closure` counts that `if` body as a closure. This errs toward following more units, and I measured no effect on the real tree.
- L2. The type-inference init rule misses `let h: Hold! = .init(u)` and `let h: Hold<X> = .init(u)`.
- L3. Swift allows nested block comments, but `swift_code` ends a block comment at the first `*/`. Text after the inner `*/` is read as code. This only ever adds hits. It predates this commit.
- L4. The string-aware stripping (F1 of T-2133) is sound as far as I could read it. Literal segments lose only `/` and `*`, and interpolations go through `code()`, which strips their comments itself. With strings=False and comments already blanked, the `COMMENTS` regex in `tms.uses` has nothing left to match in strings.

Board lines: F1 T-2392, F2 T-2393 (Idris).
{% endraw %}

</div>
