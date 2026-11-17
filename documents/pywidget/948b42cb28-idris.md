---
layout: "default"
title: "Review of 948b42cb28: T-4550, the Python contract for widget buttons (slice 1)"
section: "documents"
description: "The contract reads the way ADR-011 s7 words it. The name rule is the exact pattern, compared exactly, and the case clash error names the first line and points at the second. _args_problem measures the canonical bytes\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/948b42cb28-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/948b42cb28-idris.md</code></span></div><h1>Review of 948b42cb28: T-4550, the Python contract for widget buttons (slice 1)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-4606, Commandment 13). Author: Pernille. Reviewed: T-4550 as it stands at 948b42cb28. The work
is 6d40381d88 ("slice 1, ADR-011 s7 items 1 to 5 in pywidget_ui"); 948b42cb28 itself carries only her note,
event and memory. Checked against ADR-011 ([`pywidget/docs/decisions/ADR-011-widget-actions.md`](adr-011-widget-actions.html), as accepted at
137c133087) s3, s6, s7 items 1 to 5 and "Called" (a) to (d), and s13 step 5. The task packet had me read T-4550's
board line and `ops/board_notes/T-4550.md`, so I saw the line's promise and its slice list; everything below I
checked against the code and my own probes, not against the note. Line numbers are at 948b42cb28. Nothing in
`pywidget_ui`, the <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> fixture or `test_actions_t4550.py` has changed since, so they hold at HEAD (1aa46af117)
too. Date: 2026-11-16.

## What landed in this cut, and what was sliced off

Landed in 6d40381d88:
- s7 item 1: the name rule `[A-Za-z0-9_-][A-Za-z0-9_.-]{0,63}` on `Widget.action`, `Button`, `Toggle` and in
  `validate`; the `pywidget.` prefix keeps its own message; a second declaration equal ignoring case is refused
  with one error naming both lines (`__init__.py:1977-2006`).
- s7 item 2: a run Button's `args` are a finite JSON object of string keys, at most 1 KiB canonical
  (`_args_problem`, `__init__.py:1299-1313`), refused where the Button is built.
- s7 item 3: `ui.Open` (page, code, home, link, app) and `Button(open, ..., name=)` write `p.open`; s5's https
  grammar, the slot id rule and the code path rule; the run/open name clash refused in `Widget.document`.
- s7 item 4: the caps lint per family, from `pywidget/tests/fixtures/widget-button-caps.json`; the no-text Button
  line.
- s7 item 5: the console line now for Toggle only; ADR-002's dated line made current.
- API.md rows: every one s13 step 5's Done when names is there (the `Widget.action` row's timeout note for
  in-widget runs, `args` as untrusted input and integral numbers arriving as `int`; the `Button` row's 44 pt
  target, one row in Small and the no-text line; `Open`; `Toggle`; the lint on `Widget.document`).

Sliced off, so not in this cut and not reviewed here:
- "Called" (a), (b), (d): `REQUEST_KEYS` gaining `action`, handler then render in one run, the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s same path
  through `_reset`. That is T-4564 (e1b4dfbdbf on main later). At 948b42cb28,
  `pywidget/ios/App/Runtime/_pywidget_runtime/widget_tree.py` is untouched: `REQUEST_KEYS` is still
  `("id", "date", "state", "first_party")` (line 64) and no handler runs.
- "Called" (c): Swift `RunRequest`, its contract version line, and the schema's name pattern and `p.open`. That is
  T-4565 (fb5366e735), reviewed in T-4605 by another session. I did not read its Swift.

So the run-path questions (state leaking between runs through `_reset`, handler errors, untrusted `args` reaching
a handler) have no code in this cut. The one piece of per-run state this cut adds, `Widget._lint_shown`, lives on
the `Widget`, which `runner._reset` drops with the user's modules every run; `_tap_notice_shown` is still cleared
by the runner between runs (`runner.py:664-667`). Nothing leaks there. T-4550's board line stays open, as it should.

## Tests run

- 948b42cb28, in a scratch worktree (`python3 tools/scratch.py worktree T-4606`, detached there):
  `python3 pywidget/tests/run_host.py --both dsl`: PASS, 314 tests on 3.9.6 and 314 on 3.13.18.
  `run_host.py root widgets` (3.9.6): the first run, which started alongside the full `tests/run.sh`, ended
  "1 failed suites", and I cut its output before the suite's name; the rerun passed both: root 36 tests, widgets
  416 tests (1 skipped, 2 expected failures). I did not identify the first failure. Neither suite is one this
  commit touches.
- HEAD (1aa46af117): `run_host.py --both dsl`: PASS, 314 and 314.
- `tests/run.sh` (the kit's suites): not finished, so no result. I started it at HEAD, chained to a second run at
  948b42cb28. The Mac mini was at load 220 to 300 with other sessions' kit runs. After 60 minutes the HEAD run had
  finished about 207 of 549 suites, and my background limit stopped it. The 948b42cb28 run never started. No suite
  in `tests/` reads a file this commit changes (6d40381d88 touches only `pywidget/`), so the kit run says nothing
  about T-4550 either way. I did not restart it.
- Probes against 948b42cb28's `pywidget_ui`, run from `/tmp` with `python3 -I`, not added to the repository: the
  When(family) lint (M1), labels with no readable text (L1), `validate` on hand-edited documents (L2), large
  integers in `args` (L3), case-variant button names (L4), and the link, slot and key-type edges below.

## Verdict: PASS with findings

The contract reads the way ADR-011 s7 words it. The name rule is the exact pattern, compared exactly, and the
case clash error names the first line and points at the second. `_args_problem` measures the canonical bytes the
ADR names (sorted keys, `,`/`:` separators, UTF-8 with no ASCII escaping), and it refuses non-string keys at any
depth (int, bool, float and None keys all probed). The link check refuses `HTTPS://`, user info, `%zz`, port 0
and a non-ASCII host, and it says what to fix. An Open value that an author mutates after `ui.Open` is caught
again by `validate` at `document()`. The tests are the right kind: the caps table must equal the fixture's, and
every fixture case is counted.

One Medium: the caps count is wrong for the one `When` the lint can resolve. The lint then tells authors who
followed the recommended pattern that buttons are dropped, and the shared fixture carries the wrong count to the
Swift renderer tests that are to read it. Nothing here loses data or risks App Review. Buttons are still inert on
the phone until build step 6, so nothing holds TestFlight.

## Findings

### M1. The caps lint and the shared fixture count a `When` on `family` as its larger branch in every family

- Where: `pywidget/python/pywidget_ui/__init__.py:2226-2237` (`_tap_count`: "A When draws its then or its
  otherwise, never both, so it counts the larger"), called per family at `__init__.py:2110-2114`;
  `pywidget/tests/fixtures/widget-button-caps.json:28-31` (the case "a When counts its larger branch", one `count`
  of 3 for every family); API.md's `Widget.document` row ("a `When` counts its larger branch").
- The failure, probed: a widget for `systemSmall` and `systemMedium` whose render returns
  `ui.When("family", ["systemMedium"], ui.HStack(<4 Buttons>), otherwise=[ui.HStack(<2 Buttons>)])`. That is the
  way to stay inside s3's caps with one view. Small draws 2, at its cap. `document()` prints:
  "systemSmall draws at most 2; this tree has 4 buttons and toggles, so the widget draws the first 2 and drops the
  rest". Nothing is dropped. The author has no way to silence the line short of splitting the view per family.
- The fixture: its When case is `{"env": "family", "is": ["systemSmall"]}` with 1 Button in `c` and 3 in `alt`,
  `count` 3, and the `about` says "drawn is min(count, cap) per family". In `systemSmall` the renderer draws the
  `c` branch: 1 button, not min(3, 2) = 2. The file exists so that "Swift's renderer tests read the same file, so
  both drop the same buttons" (s3, s7 item 4). Build step 6's renderer test would either fail against a correct
  renderer or push the renderer to count wrongly.
- Why only `family`: the lint runs once per family (`_roots_by_family`), so a `family` When is known at lint time.
  For the other `ENV_KEYS` (colorScheme, dynamicTypeSize, renderingMode and the rest), the larger branch is the
  right, cautious count.
- Fix: in `_tap_count`, take a family argument and count only the matching branch of a When whose `env` is
  `family`; give family Whens per-family counts in the fixture (for example `"count": {"systemSmall": 1, "*": 3}`);
  add the probed tree as a test. Board: T-4660.

### L1. A Button whose label is an empty Text, or a Text hidden from VoiceOver, gets no no-text line

- Where: `__init__.py:2240-2249` (`_has_text`: any `Text` node, or any `accessibilityLabel` modifier, counts).
- The failure, probed: `ui.Button("add", "")` and `ui.Button("add", ui.Text("+").accessibility_hidden())` both
  print nothing. In the first the label's text is empty. In the second VoiceOver skips the text, so ADR-011 s3's
  "the label's text" is nothing VoiceOver reads. The line exists to catch exactly that case. An empty
  `accessibility_label("")` passes the same way.
- Fix: count a Text only when its string content is non-empty and it carries no `accessibilityHidden`, and an
  `accessibilityLabel` only when its text is non-empty. Two tests.

### L2. `ui.validate` misses two things `document()` and the DSL refuse

- Where: `__init__.py:2405-2423`.
- (a) The run/open name clash (s7 item 3, M4) is checked only in `Widget._check_trees`
  (`__init__.py:2145-2149`). Probed: a document with `Button("home")` (run, declared) beside an Open button whose
  `p.action` I edited to `"home"` gives `validate(doc) == []`.
- (b) The name check skips `pywidget.refresh` (`__init__.py:2411`), and the Open branch does not refuse it. Probed:
  `{"t": "Button", "p": {"action": "pywidget.refresh", "open": {"do": "link", "url": "https://example.com"}}}`
  passes `validate`. A Swift reader that maps `pywidget.refresh` to the Refresh intent first would treat it as a
  refresh, and one that looks at `open` first would treat it as a link.
- Neither can come from the DSL (`_author_action` refuses the reserved name, and `document()` checks the clash).
  But `validate` is the documented structural check that the Swift side mirrors, and a hand-written tree or a test
  fixture would pass it. Fix: move the clash check into `validate` (document() already calls it), and refuse
  `open` on the refresh name.

### L3. `args` take integers of any size

- Where: `__init__.py:1299-1313` with `_finite_json` (`__init__.py:368-380`), which only checks floats.
- The failure, probed: `ui.Button("a", "x", args={"n": 10**300})` is accepted. The 300 digits fit inside 1 KiB.
  ADR-011 s6 says the bytes hashed are the bytes run, made by Swift's `WidgetAction.canonicalBytes`, and that a
  handler gets an integral number as an `int`. A Swift reader that holds numbers as Int64 or Double would refuse
  that value, or change it. The same goes for a realistic 64-bit row id above 2^53 (9007199254740993 becomes
  9007199254740992 through a Double). Then `v` never matches and every tap is N4, or the handler gets another id.
  `WidgetAction` is build step 1, mine, and not built yet. So this is a contract point to settle on both sides now,
  not a failure that can happen today.
- Fix: bound integers in run `args` to the exact range both readers keep (I propose plus or minus 2^53 - 1), say
  so in the `Button` row, and I will mirror the bound and its test in step 1.

### L4. Button names in one tree may differ only by case

- Where: `__init__.py:2121-2124` and `2145`, where names are compared exactly.
- The failure, probed: a run `Button("home")` and `Button(ui.Open.home(), name="Home")` in one Medium tree are
  accepted. So are two Open buttons named `Home` and `home`. The project page then shows two button settings a
  person cannot tell apart. Declarations already refuse names equal ignoring case (s7 item 1); the button names
  that become settings rows do not. ADR-011 words the case rule only for declarations, so this is consistency, not
  a breach. Fix: refuse button names in one document that are equal ignoring case and not equal, with the same
  wording as the declaration clash.

## Notes (no change asked)

- The lint runs in `Widget.document`, over every entry and family, not "at `entry()`" as s7 item 4 words it. That
  is the same path: the runtime builds every tree through `widget.document` (`widget_tree.py:349`), and it covers
  timelines too. Fine.
- The fixture and `_BUTTON_CAPS` give `systemExtraLargePortrait` 8. ADR-011 s3's table names only `systemLarge`
  and `systemExtraLarge` for 8; s3's Apple list includes the portrait family. That is reasonable. The ADR's table
  could name it.
- `Open.page` ids take the widget id rule (`first_party=True`); ADR-011 s1 names no rule for a Page id. That is
  reasonable, and the Swift twin must use the same rule.
- Text outside this line's targets still says buttons are 1.1: `pywidget/app-guide-04-limits.md:21`,
  `app-guide-08-lock-screen.md:35`, `app-guide-09-what-you-can-build.md:68`,
  `pywidget/docs/release/review-notes-draft.md:152` ("Moved out of 1.0: ... widget buttons"),
  `pywidget/widgets/gallery/focus_timer.py:3`, `pywidget/widgets/premade/habits.py:5`, and the comments at
  `pywidget/ios/Shared/TreeNodes.swift:21` and `runner.py:664`. Right for today, because buttons are inert until
  step 6. They have to change when step 6 ships, the App Review notes most of all.
- ADR-002's dated line, made current: the header now says "In force since ADR-011 was accepted (Idris,
  2026-11-15 10:05 PM ET, 137c133087)", and git agrees (137c133087, Idris, 10:05 PM -0500). The added paragraph says
  correctly what is in and what waits for the schema slice.
{% endraw %}

</div>
