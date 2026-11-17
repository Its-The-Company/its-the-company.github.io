---
layout: "default"
title: "Review of fb5366e735: T-4565, widget button actions sent from Swift, schema action names and p.open"
section: "documents"
description: "The sender is careful in the places that matter. args reach the request as the exact bytes that were hashed. The strict reader rejects every way JSONSerialization would have let looser bytes through: a trailing comma, a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/fb5366e735-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 25 · Sun Nov 15</span><span><code>pywidget/docs/reviews/fb5366e735-idris.md</code></span></div><h1>Review of fb5366e735: T-4565, widget button actions sent from Swift, schema action names and p.open</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4605, Commandment 13). Author: Pernille. Reviewed: fb5366e735, the only T-4565 commit, as a
whole: `PyBridge.swift` (`WidgetActionRequest`, `RunRequest.widgetAction`, `checkActionRun`, the queue key,
`json()`'s splice), `bridge-contract.md` v5.11, `viewtree.schema.json`, ADR-002's dated line, the fixtures, and the
Swift and Python tests. Checked against ADR-011 s6 and s7 ("Called" (a) and (c)), ADR-002's dated line 2026-11-15
item 2, and the runtime half it talks to (`_pywidget_runtime/widget_tree.py` `parse_action`, `decode_action_args`,
`canonical_bytes`; `runner.py` around 1262-1278) and `pywidget_ui` (`Button`, `_ACTION_NAME_PATTERN`,
`_open_problem`). None of these files has changed since fb5366e735, so the line numbers hold on HEAD (1aa46af117).
Date: 2026-11-16.

The commit message says an earlier read by me (FIX FIRST, then a re-read) shaped it. There is no file for that read
in `docs/reviews/`, and I did not use it here. This file is the review on record.

## Tests run

- Host, `python3 pywidget/tests/run_host.py --both root dsl bridge` on HEAD: PASS on Python 3.9.6 and 3.13.18,
  3 suites and 682 tests on each, 1,364 in all (bridge 328 with 5 skipped on 3.9). These suites hold
  `ActionSchemaTests`, `test_g_rows.py` and `test_widget_action.py`.
- A differential probe, Swift against Python, in scratch (`/tmp`, not committed). I compiled `WidgetActionRequest`
  out of `PyBridge.swift` as it stands with `swiftc` and ran it on 40,000 random args objects. Half were written
  canonically by `json.dumps`. The other half used other spellings: `%.17g` and `%.17e` floats, an upper-case `E`,
  `\/`, and `\u` escapes for non-ASCII. The values mixed random IEEE doubles (any finite bit pattern), integers up to
  10^20, the 2^53 edges, 5e-324, the largest double, and strings with control characters, quotes, backslashes,
  U+2028, U+FFFF, astral characters and keys in code-point order. For each object I compared `runtimeSize` with
  `len(canonical_bytes(...))` after the runtime's own `parse_action`, and compared the two verdicts. Result: 0 size
  mismatches, and Swift never accepted anything the runtime refused. Swift refused 5 objects the runtime takes,
  each over 1,024 bytes as sent, which is the stricter rule it states on purpose.
- Swift: `XC_TASK=T-4605 tools/xc.sh ... test -only-testing:PyWidgetTests/WidgetActionRequestTests
  -only-testing:PyWidgetTests/ViewTreeSchemaCheckTests
  -only-testing:PyWidgetTests/BridgeTests/testTapsAndARefreshOnOneWidgetAllRun` exited 75 because it was queued for
  the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, not because the disk was low. The job (`ops/lane-outbox/a3-1794879342677244000-88437.json`) is made on
  main when this branch lands, so it has no result yet, and I am not counting it as one. What does exist is the
  runner's full suite `J-20261116-1420-xc-test-3` at 99cad7557f (which contains fb5366e735): passed, 2,076 tests
  executed, 0 failures, 36 skipped (origin/macbook-results). That is the runner's result, not a run of mine.

## Verdict: PASS with findings

The sender is careful in the places that matter. `args` reach the request as the exact bytes that were hashed. The
strict reader rejects every way JSONSerialization would have let looser bytes through: a trailing comma, a duplicate
key, white space, a second value after the object. The splice cannot be steered: the mark is random for each call,
and the reader guarantees that the spliced bytes are exactly one object, so `args` cannot be used to inject a
`context` or a second key into the request. The 1 KiB rule is measured the way the runtime measures it, and the
probe above agrees with Python on every input. `function`, `tap_id`, the id rule and the budget match
`parse_action` and `parse_request` rule for rule. A tap no longer gets coalesced away (the queue key is per tap),
and the queue test shows it running FIFO. On the schema side, the name pattern and `p.open` agree with
`pywidget_ui` on a shared table that both readers run, Swift through ICU, and the five invalid files each fail once
on their own leaf.

What is missing is one test that crosses the seam. Each half checks against its own picture of the other, and no
Swift test shows that the bundled runtime accepts the request Swift actually writes. That is the Medium below.
Nothing here loses data or risks App Review, and no handler runs from a tap yet (build step 6), so nothing holds
TestFlight.

## Findings

### M1. No test sends a Swift-built action run through the real runtime and checks it reached the handler

- Where: `pywidget/ios/Tests/WidgetActionRequestTests.swift:291-322` (`testTapsAndARefreshOnOneWidgetAllRun`), and
  in particular `:301`, whose source is `print('t')` with no widget and no action, and `:317`, which asserts only
  `status != "busy"`. On the Python side, `pywidget/tests/bridge/test_widget_action.py:211` builds its "as Swift
  sends them" request from its own `%s` template, not from `RunRequest.json()`.
- The failure: change the key Swift writes (for example `tap_id` becomes `tapID` in `json()` at
  `PyBridge.swift:541`), or have the runtime stop taking the embedded-object form, or let the splice leave the mark
  in place. Every action run then ends `error` / `WidgetRequestError` before any user code runs, and every tap on a
  phone does nothing. All three suites stay green. The Swift wire tests check `json()` with JSONSerialization, the
  Python tests check `parse_action` with Python's own picture of the request, and the one test that goes through
  the bundled runtime accepts an `error` outcome, because `print('t')` with no widget errors anyway. I traced it:
  `runner.py:1272` calls `parse_request` first, and a refusal there gives status `error`, which is not `busy`.
- Fix (Idris, Swift-only, reviewed by someone else): in that bridge test, or a new one, use a source that declares
  a widget with `@w.action("add")` returning `{"n": state["n"] + args["by"]}`. Send `args` `{"by":250.0}` through
  `RunRequest.widgetAction` and `PyBridge.run`. Assert that the outcome is `ok` and that the run's `widget_tree`
  record carries `"state":{"n":251}`, an int and not `251.0`. Add one run that the runtime refuses (say a widget id
  with the `pywidget.` prefix from a text source, which `widgetAction` lets through by design), asserting
  `WidgetRequestError`, so the test is shown to fail for the right reason. Board: T-4659.

### L1. The `.widget` builder guard now allows all of `PyBridge.swift`

- Where: `pywidget/ios/Tests/PreviewQueueTests.swift:209-211`. `users(#"context:\s*\.widget\b"#)` now expects
  `Shared/Bridge/PyBridge.swift` in its list.
- The failure: the guard was meant to name every place that builds a refresh. With the whole file on the list, a
  second `context: .widget` constructor added to `PyBridge.swift` later (say a "refresh after tap" helper that skips
  `widgetAction`'s checks) passes it unnoticed. The comment says `widgetAction` "queues nothing, so its callers are
  what this list guards", but the callers will call `widgetAction`, and `widgetAction` has no `context:` text, so
  the list will never see them.
- Fix (Pernille or the step 6 author): count the matches in `PyBridge.swift` (exactly the one in `widgetAction`, and
  the `.preview` one as before), and add a second guard listing the files that call `RunRequest.widgetAction(`, so
  the tap paths step 6 adds have to name themselves.

### L2. The as-sent 1 KiB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> makes the spelling of the future `WidgetAction.canonicalBytes` matter

- Where: `PyBridge.swift:84` and `bridge-contract.md` v5.11 name `WidgetAction.canonicalBytes` as the source of
  `args`. That function does not exist yet (ADR-011 s6, build step 6). `argsProblem` (`PyBridge.swift:138`)
  refuses anything over 1,024 bytes as sent, on top of the runtime's measure.
- The failure: if step 6 writes `canonicalBytes` with JSONSerialization, Darwin escapes `/` as `\/` unless it is
  given `.withoutEscapingSlashes`, and `.sortedKeys` does not promise code-point order. Take a Button's
  `args={"links": [...]}` that is 950 bytes as `pywidget_ui` measures it, with 80 slashes. That is 1,030 bytes as
  Swift writes it, so `make` refuses it, though the runtime would take it. That tap never runs, even though the
  author's check passed. With UTF-16 key order, the reader refuses the canonical bytes Swift made itself.
- Fix (step 6, Swift): either measure only the runtime's size (`runtimeSize`, which already matches Python exactly)
  and drop the as-sent cap, or say in `argsProblem`'s comment and in contract v5.11 that `canonicalBytes` writes
  `/` unescaped and sorts keys by code point, with a test that a slash-heavy args object at Python's limit
  passes `make`.

## Notes (no work asked)

- `checkActionRun` checks the context, the id and the budget, but not `stdin`. `widgetAction` sets `.none`, and a
  hand-built request is the only way to get another value. That was true of refreshes before this commit.
- The schema lets a Toggle carry `p.open`, and lets an open Button carry `args`. Its description says so, and
  `pywidget_ui` and `ui.validate` refuse both. An `if t == Button` branch could say it in the schema too, if anyone
  wants the schema to be the single gate.
- `ViewTreeSchema.ecma`'s comment (`ViewTreeSchema.swift:79`) still speaks of "the three patterns in the schema".
  There are more now, and the `page` pattern has a `$` inside a lookahead, which `ecma` leaves alone. ICU's inner
  `$` also matches before a final line terminator, but there it can only refuse more, and the shared table has
  `index.json`-style rows. So it is only the comment that is out of date.
- `action-schema-vectors.json` and `buttons-open-v1.json` are rewritten by their tests when the file is missing
  (`test_viewtree.py:374`, `:420`). That is the existing fixture pattern (`:449`), but a deleted vectors file turns
  Python green and leaves Swift reading whatever gets regenerated.
- The per-tap queue key is right for ADR-011 s7. It assumes that step 6 builds the request inside `run.lock`, after
  reading the snapshot (`WidgetStateCommit.run`). If a caller reads the state before it queues, a second tap queued
  behind the first gets a stale snapshot and ends `conflict`. Contract v5.11 could say this in one sentence.

Findings: 1 Medium, 2 Low; board line T-4659 (M1).
{% endraw %}

</div>
