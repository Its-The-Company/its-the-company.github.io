---
layout: "default"
title: "T-2410: review of 46a446b94 (App privacy guard, third round, T-2392, T-2393)"
section: "documents"
description: "Where the commit is. 46a446b94 is on no branch. The same change is on main as 9a2217e95 (git diff 9a2217e95 46a446b94 touches only settings and billing files, none of the four files under review). I reviewed main at\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2392-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2392-pernille.md</code></span></div><h1>T-2410: review of 46a446b94 (App privacy guard, third round, T-2392, T-2393)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (Commandment 13). Judged from the diff, the suite and my own runs.

**Where the commit is.** 46a446b94 is on no branch. The same change is on main as 9a2217e95 (`git diff 9a2217e95 46a446b94` touches only settings and billing files, none of the four files under review). I reviewed main at 2e295e964. The four files have not changed since 9a2217e95, except `test_check_legal_links.py` in the same folder (71dfa93df, unrelated).

**An earlier round of this review never landed.** On 2026-11-04 23:00 I reviewed 9a2217e95 and wrote `t2410-pernille.md` with F1-F4 as T-2436..T-2439. That commit (d38877cee, acab362d9, d10a2fc2e) sits only on <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branches. Its last land went red on an unrelated widgets test (T-2633), so the four board lines were never added. This file replaces it. I re-ran every check on today's main. The findings stand, and the line numbers are unchanged. The new board ids are T-2663 and T-2664. T-2436..T-2439 are not used.

**Verdict: changes requested.** Two Mediums (F1, F2) and two Lows (F3, F4). Nothing is High, and nothing blocks the first TestFlight upload. The shipped answer is right: on the real tree the guard picks 32 units, none of them makes a listed read, and the App manifest correctly declares C617.1 alone. The findings are about whether the guard holds when the Swift next changes, and about one sentence in the label that claims a gap that does not exist.

## What I ran (record: `pywidget/ios/bench/t2410-guard-probes.txt`)

- Privacy suite (`python3 -m unittest discover`, pywidget/tests/privacy, main checkout): 34 tests OK.
- `t2120_guard_mutants.py` on `git archive HEAD pywidget`: 41 mutants, all as expected. It is line-for-line identical to `pywidget/ios/bench/t2392-guard-mutants.txt` apart from the label. X1-X6 are killed and name their unit. M0, P4c, Q2, X5c and X6c survive as intended.
- Real tree: `scope_units(app_and_shared_sources())` picks 32 units with no FILE_TS hit. This matches the record.
- Probes Y1-Y4 (`pywidget/ios/bench/t2410_guard_probes.py`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran (record: pywidget/ios/bench/t2410-guard-probes.txt), scrolls sideways" data-n="1" style="--tw:977px" markdown="1">

| id | shape | result | should be |
|---|---|---|---|
| Y1 | FilesCall gains `map(_ u: URL, _ f: (URL) -> T)` that opens the scope, so every `.map(` call is followed | KILLED on the 3B52.1 assertion: **742 units, 5 false hits** | stopped by the ceiling |
| Y2 | `openPair(u) -> (ok: Bool, stop: () -> Void)`, and the caller reads | KILLED | KILLED (s4b says a tuple is not linked) |
| Y3 | `final class PickedHandle`: its init opens the scope and `close()` is a method; `openHandle(u) -> PickedHandle`; the caller reads | SURVIVED | KILLED |
| Y4 | `let openPickedFn: (URL) -> () -> Void = { u in SystemFiles().access(u) }`, and the caller reads | SURVIVED | KILLED |

</div>


- Seeded mutation of the guard: with `token_types` returning `set()` and `returns_opener_call` returning False, the suite stays **green** (34 OK, 1 skipped for no Vendor/ in the scratch tree).

## Findings

### F1. Medium. The ceiling is checked after the 3B52.1 assertion, so a blow-up that has false hits never reaches it
`pywidget/tests/privacy/test_user_granted_files.py:421-431`
- **Failure.** `if hits: self.assertIn(USER_GRANTED, ...)` runs at :421, and `assertLessEqual(len(units), PICKED_CEILING)` runs at :430. A blow-up is exactly the case that drags container code into the picked set, and listed reads come in with it (T-2128). Y1 shows this on today's tree: 742 units, with false hits in ProjectManifestReader `kind` and `realPath`, ProjectTransfer `removeOldExports`, LaneGuard `owedSince` and RunLogStore `appendLine`. The run goes red with "the app's own Swift reads file metadata of a file the person granted". That message points the next engineer toward adding a false 3B52.1 to the App manifest, which is the outcome the ceiling exists to prevent. The ceiling assertion never runs.
- **Fix.** Assert the ceiling before the hits check. Give a ceiling failure its own verdict (CEILING, not ERROR) in `t2120_guard_mutants.py` `run()`. Add Y1 to the record with that verdict as expected.

### F2. Medium. No suite row holds the T-2392/T-2393 rules; only the bench script does
`test_user_granted_files.py:263` (`token_types`), `:314` (`returns_opener_call`), `:353` (`hands_on`). The sample rows are at `:473-540`.
- **Failure.** Each of the earlier rounds added a `test_the_scope_reader_...` row that pins its fixes inside the suite (`:487`, `:511`). This round adds none. X1-X6 live only in `pywidget/ios/bench/t2120_guard_mutants.py`, which no suite runs, and the real tree has no token return and no Bool wrapper. I removed both new rules (the seeded mutation above) and the suite stayed green. A later refactor of `scope_units` can drop T-2392 and T-2393 silently, and the App row will still pass.
- **Fix.** Add one sample row, `test_the_scope_reader_follows_forwarded_bodies_tokens_and_bool_openers`, in the shape of `:511`. It should cover a forwarded body, a local closure, an `@autoclosure`, a function reference, a token return, a token init and a chained Bool opener. It should also hold X5c and X6c as controls that must stay out. Seed the same mutation and confirm the row goes red.

### F3. Low. A handle class whose stop is a method is not a token (Y3)
`test_user_granted_files.py:263-284` (`token_types`)
- **Failure.** The idiomatic Swift scope handle is a final class whose init opens the scope and whose `close()` or `deinit` stops it. It has no function-typed stored property, so `openHandle(u) -> PickedHandle` does not hand the scope on, and the caller's read is missed. s4b does list "a type with no function-typed stored property", so the label is not false. The gap is cheap to close: in the 2026-11-04 round I measured that counting as a token any type whose own body calls `start`/`stopAccessingSecurityScopedResource` adds only `SystemFiles` and keeps the real tree at 32 units with 0 hits.
- **Fix.** Add that rule to `token_types`, add Y3 to the record as KILLED, and take the handle-class case off the s4b limit list.

### F4. Low. The s4b and docstring limit lists name a case the guard covers and leave out one it misses
`pywidget/docs/release/privacy-label.md:126` ("follows calls by name, not values"); `test_user_granted_files.py:340` (the `scope_units` docstring); `:297` (`passes_scope`).
- **Tuple (Y2).** Both lists say "a stop handle carried out in a tuple ... is not linked". It is linked: a tuple return that holds a function type contains `->`, so `hands_on` follows it, and Y2 is killed. The label has to be accurate in both directions, so it should not claim a gap that does not exist. Drop "a tuple", or narrow it to a tuple that holds neither a function nor a token type.
- **Stored closure (Y4).** A `let` closure that calls `access()` and returns its stop handle is picked, but `passes_scope` returns `(False, "")` for anything that is not a func or init (`:297`). Its callers are not followed, and neither list names this limit. Either follow a stored closure whose annotated type returns a function, a token or a Bool, and add Y4 as KILLED; or name the case in both lists and record Y4 as an expected survivor, as Q2 is.

## Checked and fine
- `passes_scope` takes `@autoclosure` (X3), and bracket balancing still stops a default value from ending the list early.
- `token_types` reads only the type's own depth-1 text, so a nested type's property does not make the outer type a token.
- The Bool-opener fixpoint runs over the picked set only, so `isPickedName` (X6c) stays out, as s4b says.
- `MUST_NAME` covers X1-X6, and each <span title="A test written in advance. If it fires, we drop the idea.">kill</span> names its own unit (`stampFwd`, `stampLocal`, `stampAuto`, `stampNow`, `stampTok`, `stampBool`).
- `PICKED_CEILING = 64` is twice today's 32 and well below both blow-ups (742 here, 1155 for every non-Void return).
- s4b's description of X1-X6, the ceiling and the 32 units matches the code.

## Board lines (for Idris)
- T-2663 (F1).
- T-2664 (F2, with the Lows F3 and F4, which belong to the same edit to the guard and the label).
{% endraw %}

</div>
