---
layout: "default"
title: "Review of f377f5ca6a: T-4564, bound a run Button&#x27;s args numbers to 253 - 1"
section: "documents"
description: "The runtime and the DSL refuse the same numbers with the same words, before user code runs, and the tests hold both the bound and the message. The Swift side, which is not part of this commit, does not yet hold the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4564-f377f5ca6a-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 28 · Wed Nov 18</span><span><code>pywidget/docs/reviews/t4564-f377f5ca6a-idris.md</code></span></div><h1>Review of f377f5ca6a: T-4564, bound a run Button's args numbers to 253 - 1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4854, Commandment 13). Author: Pernille. Reviewed: f377f5ca6a (commit message, the diff in
`widget_tree.py`, `pywidget_ui/__init__.py`, `API.md`, `tests/bridge/test_widget_action.py`,
`tests/dsl/test_actions_t4550.py`). Checked against my own finding L3 in [`pywidget/docs/reviews/948b42cb28-idris.md`](948b42cb28-idris.html)
(the T-4606 review, d8d80fea25; also T-4603's L1 in [`e1b4dfbdbf-idris.md`](e1b4dfbdbf-idris.html)), ADR-011 s6 and s7 (a), and
`pywidget/ios/Shared/Bridge/PyBridge.swift` (`argsProblem`, `CanonicalJSON.number`) for the Swift half. I did not see the
author's reasoning beyond the commit message. Date: 2026-11-18.

## Tests run

All in the foreground, in this worktree, no Xcode.

- `python3 pywidget/tests/run_host.py --both bridge dsl`: PASS on 3.9.6 and 3.13.18, 332 bridge and 316 dsl tests
  each (5 bridge tests skipped on 3.9.6), 0 failed suites. `test_widget_action.py` (35) and `test_actions_t4550.py` (34)
  alone also pass on both.
- Probes (`/tmp`, not added to the repository), on both interpreters: 16 args texts through `decode_action_args` as
  text, as an already-decoded object (the embedded form), and through `ui._args_problem`: 2^53-1 and -(2^53-1) as
  int and as `.0` float, 2^53 as int and `9007199254740992.0`, `9007199254740991.5` (rounds up to 2^53), `.4`
  (rounds down, kept), `1e16`, `-0`, `1E15`, bools, 1000 and 4400 digits, `1e400`, `NaN`, a 1 KiB string with
  `1e300`; IntEnum 2**60; a tuple; `Button` on a 4400-digit int.
- Mutants, one at a time on the committed tree, each restored with `git checkout`, tree clean after:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run, scrolls sideways" style="--tw:695px" markdown="1">

  | Mutant | bridge test | dsl test |
  |---|---|---|
  | `_args_bound` never refuses | 19 fail | pass (correct: DSL is separate) |
  | text form without `parse_int` | 7 fail | pass |
  | embedded ints unchecked | 4 fail | pass |
  | runtime bound `2**53` | 2 fail | pass |
  | DSL bound `2**53` | 1 fail (the equality test) | fails |
  | DSL does not walk dicts | 5 errors | fails |
  | DSL checks ints only, not floats | 2 errors | fails |

</div>


  Every mutant that changes either side is caught, and a bound that differs between the sides is caught by the
  equality test.

## Verdict: PASS with findings

The runtime and the DSL refuse the same numbers with the same words, before user code runs, and the tests hold both
the bound and the message. The Swift side, which is not part of this commit, does not yet hold the bound; that is
the one open item (L1), and it is a refusal that arrives one step late, not a loss.

## What I checked, and found sound

1. **Same numbers, same message.** Table from my probes (identical on 3.9.6 and 3.13.18, and identical across the text
   form, the embedded form and the DSL unless noted):
   - 9007199254740991 and -9007199254740991: kept, as `int`. `9007199254740991.0`, `.4` and `1E15`: kept, arrive as
     `int`. `-0` arrives as `0`. Bools pass through untouched.
   - 9007199254740992 (int and `.0`), -(2^53), `9007199254740991.5` (a Python float of 2^53, so refused as
     `9007199254740992.0`), `1e16`, 1e300, a 1000-digit int: refused with `holds the number N; numbers in args must be
     between -9007199254740991 and 9007199254740991 (2**53 - 1), the range the app and Python both keep exactly`. The
     number is cut to 20 characters plus `... (N characters)` past 24, in both. The DSL's string is the runtime's
     minus the `widget.action.args ` lead, and `test_number_bound_matches_the_dsl` asserts exactly that, on the bound,
     the rule text and five values (including a 300-digit int).
   - `inf` and `nan` stay with the pre-existing "JSON has no NaN or infinity" message (the finite check runs first in
     `_args_number`, so `1e400` never reaches the bound). Same words in the DSL.
2. **Order of the checks.** In `_args_number` the finite test precedes the bound and the bound precedes the int
   conversion, so `int(inf)` never raises and an integral float within range still arrives as `int`. The text form
   checks ints through `parse_int` before `json.loads` builds them, so no huge int is held; the 1 KiB as-sent check
   runs first, so the text form never builds more than ~1000 digits.
3. **Nested and mixed.** Lists and dicts at depth are walked in the runtime (`_normal_args`) and in the DSL
   (`_args_number_out_of_range`, which also takes tuples); a bool is not a number in either (`not isinstance(.., bool)`
   in both places).
4. **The test edits that go with it.** `1e300` is replaced by `1e-7` in the "grows past 1 KiB" cases (canonical writes
   it `1e-07`, three more bytes each: 203 of them are 1022 bytes as sent and over 1024 canonical, and the test asserts
   both), and by `1e-300` and `9007199254740991.0` in the "integral numbers arrive as int" case. The meaning of those
   cases is kept.
5. **API.md.** Both rows match the code: the Button row says "every number between -9007199254740991 and
   9007199254740991 (2**53 - 1 ...; a 64-bit row id past it goes in as a string)", and the Widget.action row says the
   args are checked before any code runs. The bound is the commit's, not wider or narrower than the code.
6. **L3 as I raised it.** I asked for integers to be bounded; the commit bounds floats too, so `1e300` and `1e16` are
   refused as well. That is stricter than my finding and I take it: a float past 2^53 has no integer reading for
   Swift to hold exactly, and the Python repr of one (`1e+16`) is what `pythonSize` has to reproduce byte for byte.
   One rule, "every number", is simpler for a script author and for Swift's reader. Swift must apply it to floats, too (L1).

## Findings

### L1. Low: Swift's reader does not yet hold the bound

- Where: `pywidget/ios/Shared/Bridge/PyBridge.swift`, `argsProblem` (line 137) through `CanonicalJSON.number()`
  (lines 320-345). Unchanged by this commit, as its message says ("Swift's argsProblem mirror, Idris, step 1"); the note
  on T-4548 (`ops/board_notes/T-4548.md`, Pernille 11-18) names it, and no Swift line was written.
- What it does today: `number()` refuses only a token whose Double is not finite (a 309-digit integer, `1e400`), and
  line 339 keeps an integral float to `d.magnitude <= 9_007_199_254_740_992` (2^53, inclusive) for the size it
  measures. So Swift sends `9007199254740992`, `-9007199254740992`, `1e16` and `1e300` when the runtime refuses
  them. The tap then ends `WidgetRequestError` before user code (error shown, no state or data lost), instead of being
  refused at the app.
- The line must hold: after the `isFinite` guard, `guard d.magnitude <= 9_007_199_254_740_991 else { return <the
  DSL's rule text> at byte N }`, for every token, integer or float. The Double of a token is enough to decide: both
  readers round correctly, so `9007199254740991.5` is 2^53 in both (refused) and `9007199254740991.4` is 2^53-1 in
  both (kept), and any integer token past 2^53-1 maps to a Double of at least 2^53. Then the 2^53 in the `pythonSize`
  branch (line 339) becomes 2^53-1 or goes, and the "309 or more digits" comment (lines 332-333) is covered. The
  same bound belongs in `WidgetAction`'s canonical reader when T-4548 builds it, with one table of values both
  readers check: 2^53-1, -(2^53-1) and `.0` forms accepted; 2^53, -(2^53), `9007199254740992.0`, `9007199254740991.5`,
  `1e16`, `1e300`, a 309-digit int refused.
- Board: T-4856 (mine, P2, "part of T-4548"), added with `tools/board_tick.py add`, carries the Swift line, its tests
  and the two doc sentences in L2.

### L2. Low: the bound is in API.md and the code, not in the contract documents

- Where: [`pywidget/docs/decisions/ADR-011-widget-actions.md`](adr-011-widget-actions.html) lines 44 and 183 ("finite numbers only", "args a JSON
  object of finite numbers at most 1 KiB canonical") and [`pywidget/docs/design/bridge-contract.md`](bridge-contract.html) line 272 (v5.11,
  the `widget.action` row). None says the range, though they are what a Swift reader is built from and what T-4606 L3
  and T-4603 L1 said to settle "on both sides".
- Fix: one sentence in the contract's args line (a new version row) and in ADR-011 s7 (a), beside "finite numbers": every
  number within plus or minus 2^53-1, int or float, refused before user code. Folded into T-4856.

### Info (no action asked)

- The sides give different messages for input that breaks two rules at once. A 1.1 KB args with a `1e300` in it is
  "is 1118 bytes; the limit is 1024" in the text form and the DSL, and "holds the number 1e+300" in the embedded form
  (which checks numbers before size). All refuse before user code; neither is wrong.
- A 4,400-digit int, on Python 3.11 and later (the app embeds 3.15), fails inside `json.loads` of the whole request
  in the runner (`runner.py:1262`) before `parse_action`, and the DSL reads it as "a value JSON cannot carry".
  Swift refuses any integer of 309 or more digits before it gets there, and the line is inside the runner's
  `try`, so no user code runs (I did not trace the status it ends with). Not worth a test.
- `ui._args_problem` quotes `repr` of the value, so an `IntEnum` 2**60 reads `<E.A: 1152...> (26 characters)` rather
  than the number. A script author hit by this still sees the bound and the cause.
- `Toggle(..., args=)` goes through `_args` only (a dict check), so a Toggle's numbers are not bounded. It is drawn
  and inert in 1.0 (ADR-002's 2026-11-15 line), so no run reads them; apply the same rule when 1.1 arms it.
- The tests pin the bound at 2^53-1 and 2^53 in both forms and the message in both, but `9007199254740991.5`
  (the float that rounds up to the bound) is not in a table. The code handles it correctly; it belongs in the shared
  table T-4856 asks for.
{% endraw %}

</div>
