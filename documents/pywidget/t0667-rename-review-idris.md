---
layout: "default"
title: "T-0667: review of db243c3c (manifest app.json renamed pywidget.json)"
section: "documents"
description: "Accept, with one Medium to land before T-0449&#x27;s Swift reader replays the fixtures. The rename is complete in code: one constant (app_manifest.FILENAME), eleven messages, docstrings, the limits.py comment, the schema\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0667-rename-review-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0667-rename-review-idris.md</code></span></div><h1>T-0667: review of db243c3c (manifest app.json renamed pywidget.json)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-29. Independent review (Commandment 13): I read the diff, the board line and the
ADR-001 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line of 2026-10-29 04:08 (T-0506), not the author's reasoning. Also checked
against the later commits c9054763 (T-0676, `lane.py`) and 1c47322e (T-0677).

## Verdict

**Accept, with one Medium to land before T-0449's Swift reader replays the fixtures.** The rename
is complete in code: one constant (`app_manifest.FILENAME`), eleven messages, docstrings, the
`limits.py` comment, the schema title and description, bridge contract s7 and its v5.4 history
row, the fixture README, 75 fixture cases and the host suite. No reader or writer of `app.json`
is left in Python or Swift. `lane.py` (T-0676) and `runner.py` reach the file only through
`app_manifest.read` / `run_setup`, so they follow `FILENAME`; `lane.py`'s own messages already say
`pywidget.json`. T-0677 does not touch the manifest. No Swift code reads a manifest yet.

Migration: none is needed and none was asked. Nothing shipped ever wrote `app.json` (no Swift
caller of `write()` exists; the chair line says the same). A PyWidget-schema `app.json` alone now
reads `not_found` with the new message, which is the right answer for a file no build produced.

## Evidence

- `python3 pywidget/tests/run_host.py --both bridge runner`: 2 interpreters (3.9.6, 3.13.18),
  346 tests, 0 failed suites (bridge includes `test_app_manifest.py` and `test_lane.py`).
- `git grep "app\.json" -- pywidget ':!*.md'`: every hit is `tokens-app.json` (design tokens)
  or a design drawing script (L4). No runtime, test or Swift hit.
- A throwaway probe on the runtime (not committed), output:
  - foreign `app.json` `{"name": "My Flask site", "env": {}}` plus `write(p, "Tide", "main.py")`:
    writes `pywidget.json` beside it; `app.json` byte-identical.
  - PyWidget-schema `app.json` and no `pywidget.json`: `not_found`, "This project has no
    pywidget.json file, so it can't be opened from the Home Screen."

The behaviour is right today. The Medium is that nothing pins it.

## Findings

### Medium

**M1. The case that justified the rename has no test, in either half.**
`pywidget/tests/bridge/test_app_manifest.py:283` and
`pywidget/tests/bridge/fixtures/app_manifest/cases.expect.json` (75 cases, all name only
`pywidget.json`). The chair line gives the reason for the rename: `app.json` is already the
manifest of Expo and Heroku projects, so keeping it meant an imported one was refused
(`wrong_schema`) until the user deleted someone else's file. After the rename that project should
set up cleanly, with `app.json` untouched. No case checks this. The one case that held a foreign
file (the Heroku-shaped `schema-less` subtest) was relabelled "another tool's pywidget.json", so the
real situation dropped out of the suite.
*Failure scenario:* T-0449 builds the Swift reader against these fixtures. Someone adds an
`app.json` fallback "for older projects", or the Swift constant is left as `app.json` in one of
its two call sites (entity query vs Make App). Every replayed case still passes, because no case
has an `app.json`. On device, an imported Expo project then shows up in the Open Project picker as
damaged (`wrong_schema`), or Make App refuses it. That is the exact fault Ines ruled to remove.
*Wanted:* two shared fixture cases that both halves replay: (a) a foreign `app.json` alone gives
`not_found`; (b) a foreign `app.json` beside a valid `pywidget.json` gives `ok`, with the expected
id. Also one host `Write` test: `write()` beside a foreign `app.json` succeeds and leaves it
byte-identical. Board line T-0688.

### Low

**L1. Grammar from the search-and-replace.** `pywidget/ios/App/Runtime/_pywidget_runtime/app_manifest.py:179`:
"Bytes of an pywidget.json" should say "a". Docstring only.

**L2. T-0453's example now reads as a guess.** `app_manifest.py:288` ("another tool's
pywidget.json in an imported project"), `test_app_manifest.py:283`, and bridge-contract s7
("another tool's file of the same name, say"). No known tool writes `pywidget.json`. The guard is
still right (any JSON object without `"schema": "pywidget.app"` is never overwritten), but the
example no longer matches a real case. Better: "a JSON object that is not ours, such as a
hand-made file". Fold into T-0688 if Pernille is in the file anyway.

**L3. The ruling item 5 test strips an exception that no longer exists.**
`test_app_manifest.py:15` and `:350-355` ("the file name pywidget.json is the one exception"), and
the last sentence of bridge-contract s7. The file name no longer contains the word "app", so the
`replace` does nothing and the stated exception is dead text. Harmless; it could be dropped so
the test states the rule plainly.

**L4. The design drawing scripts still say `app.json`.**
`pywidget/docs/design/ide/draw_home_setup.py:5,31-33,43,64,102,170,337,346` and
`draw_run_screen.py:32,68,248`. These are annotation and caption strings in the rendered frames,
so the PNGs say `app.json` while the copy tables (updated below) say `pywidget.json`. No user sees
them. Maren can re-render the next time she touches those sheets. I did not edit the scripts,
because editing without re-rendering would split each script from its picture.

## Design docs updated in this pass (board line, Ines's chair line 04:08)

- [`pywidget/docs/design/ide/home-setup.md`](home-setup.html): every `app.json` now says `pywidget.json` (16 places),
  except s7.5's question, which is kept as asked; the ruled answer follows it. The header's
  ruling citation notes the rename and its chair line.
- [`pywidget/docs/design/ide/run-screen.md`](run-screen.html): 2 places (the nav title source and its copy-table row).
- [`pywidget/docs/design/ide/spec.md`](ide-spec.html) and [`pywidget/docs/decisions/ADR-004-editor-engine.md`](adr-004-editor-engine.html): no
  change. Their only hit is `tokens-app.json`, the design-token file, not the manifest.
- Left as written: ADR-001 item 1 (line 228, the 2026-10-27 ruling text; the 04:08 chair line at
  line 265 says item 1 now reads `pywidget.json`) and bridge-contract's v5.2 history row. Both are
  records of what was decided at the time.

## Not in scope, noted for T-0685

`lane.py:67` tells the user to set `"lane"` to `"app"`. That is a key value, not a name for the
project, but Maren's word check counts it. That is for T-0685's reviewer, not this rename.
{% endraw %}

</div>
