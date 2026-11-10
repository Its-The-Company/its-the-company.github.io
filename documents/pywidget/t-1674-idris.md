---
layout: "default"
title: "T-1674: independent read of T-1642 (Pernille, 290d666d5; 9694c853e is outbox only)"
section: "documents"
description: "Reader: Idris. Date: 2026-11-03. Read the diff and the code it touches, not the reasoning in T-1642-pernille.md (only its finding IDs, to avoid duplicates)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t-1674-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/reviews/T-1674-idris.md</code></span></div><h1>T-1674: independent read of T-1642 (Pernille, 290d666d5; 9694c853e is outbox only)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reader: Idris. Date: 2026-11-03. Read the diff and the code it touches, not the reasoning in T-1642-pernille.md
(only its finding IDs, to avoid duplicates).

**Verdict: holds with fixes.** Two doc fixes made here (F1, F2). One small hardening goes on the board (T-1677). The
two open LaneRunFiles cases stay with T-1650 (Ines), and are not repeated here, except for one fact added to it (F4).

**Disclosure.** `compiled_stdlib_root` and its use in `install_finder` are mine (892fd52ef, T-0675). T-1642 changed no
line of that code. It added a test and changed docstrings and doc text. My review covers that diff. F3 is a finding
about my own code, and someone other than me reviews its fix.

## What I checked, and how

- `python3 pywidget/tests/run_host.py --both bridge`, before and after my fixes: 269 tests on 3.9.6 and on 3.13.18,
  0 failed (538 total). There is no pytest on this host. run_host runs `unittest`, which is the way the suite runs.
- Replayed `t1642-evidence/compiled_root_mutants.json` with the command in `mutants_result.txt`: 13 of 13 killed,
  the same result as the evidence.
- To confirm the <span title="A test written in advance. If it fires, we drop the idea.">kill</span> has the right cause, I applied the ordering mutant by hand in a scratch copy. Exactly one test
  fails, and it is the new one: `test_a_user_root_inside_a_trusted_root_stays_user_code`. 40 tests ran.
- Checked each claim in the Not held bullet against the Swift: `LaneMargin.need`/`firstRunPeak` (LaneGuard.swift:239-246),
  `LaneRunFiles.refusal`/`record(refusal:)` (LaneGuard.swift:300-340), `ExtensionLane.refused` (ExtensionLane.swift:147-155),
  `WidgetStatus.showsBadge` (WidgetStatus.swift:222, false for `oom_guard`).
- Checked the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> lines in ADR-007: 2026-10-29 4:54 PM (line 512) and 2026-11-02 4:02 AM (line 716), plus 2026-11-03
  2:24 PM (line 810) for the 21 MiB.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1 2" style="--tw:1052px" markdown="1">

| # | Sev | Finding | Where | Status |
|---|---|---|---|---|
| F1 | Low | C2 1.7's Not held intro cites "ADR-007 2026-11-02 line, item 4" with no time. There are two 2026-11-02 lines (4:02 AM and 5:15 PM). T-1642 fixed the same ambiguity in the stated-limit line two paragraphs down, but not here. | pywidget/docs/research/C2-device-api.md:112 | Fixed: "2026-11-02 04:02 line, item 4". |
| F2 | Nit | One line of the new bullet runs to 116 columns, where the header elsewhere wraps at 100. | pywidget/ios/App/Runtime/_pywidget_runtime/<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py:194 | Fixed: rewrapped. Docstring only, no code. |
| F3 | Low | The new test's docstring says a learned root wider than the stdlib (a builder that compiled at "/") "can't make a person's script trusted". That is true for files under a user root, and the test proves it. But with "/" trusted, every other absolute file name is trusted too: `_under(x, "/")` holds for any absolute x. Nothing checks that the learned root looks like a stdlib folder. On a sane build the root is relative (`Platforms/Apple/iOS/.../lib/python3.15`) or the stdlib folder, so this is a build-shape risk and does not affect any current build. A cheap guard would keep the learned root only if its basename starts with `python3`. Without that, a wide root makes the lane fail open, and the guard makes it fail closed. | lane.py:1044-1052, 1063; tests/bridge/test_lane.py:200-204 | Line T-1677 (mine, with an independent review). |
| F4 | Info | For T-1650 (2): the ordinary route (4:02 AM item 3's stated limit) also deletes `lane-refused`, because an app run that clears `widgets/<id>/` takes it. That reaches "never demoted, only skipped" only if an app run lands between every two refusals. Those app runs paint the widget's picture themselves, so the cached tree is not left stale. When they stop, the next refusal in a later process demotes. This is my reading of the code, not a run, and nothing in the code I read contradicts it. So the stale picture with no badge needs a deliberate deleter, such as another widget's script deleting by path, and not an ordinary script. | ExtensionLane.swift:147-155; ADR-007:743-744 | Added as a note on T-1650. No new line. |
| F5 | Info | The packet and T-1642's board line date the first chair line "2026-11-01 16:54". It is 2026-10-29 4:54 PM (ADR-007:512). Pernille's I1 says the same. lane.py and C2 cite the right date or the time only. | ops/board.md (T-1642 line) | No change: a ticked line stays as written. |

</div>


## What holds, checked against the code

- **The compiled-root trust.** A relative trusted root is kept as a name and is never resolved against the working
  directory (configure, lane.py:459). A relative frame name is trusted only under that name. Everything else relative
  is user code (`<string>`, `<editor:...>`, look-alike prefixes; `_under` needs the separator). User roots are asked
  before trusted ones, and the new test now pins that order. Forging the compiled name with `compile()` is the
  "fakes its own file name" route that the header already lists (lane.py:34), so it needs deliberate reach (2c).
- **The `mirror_entry` docstring.** It now says `lane-scripts`, which matches `SCRIPTS_DIR` (lane.py:1077) and 4:02 AM
  item 1.
- **The Not held bullet, effect by effect.**
  - A marker written: wrong blame among the person's own widgets.
  - A marker deleted in every run: 4:02 AM item 4's named row. Its words match the chair's backstop.
  - `lane-peak` high: the widget is refused, then demoted in a later process (`refused()`).
  - Another widget's `lane-refused` with foreign text: it demotes at that widget's next refusal, and the file alone
    does nothing.
  - `lane-peak` deleted or unreadable: it reads as `firstRunPeak`. `need` maps nil and 0 to 21 MiB, so the bullet's
    "lets through only a widget whose real peak was higher" is correct. On the 2:24 PM figures (need 42 MiB against
    C = 30) it lets nothing through on a device. Only a headroom of 0, the Simulator's answer, passes.
- **The two effects outside item 3** (low `lane-peak`, and `lane-refused` deleted every time). They are marked as
  waiting on the chair, with "none yet" for the backstop. Item 3 says the list may not hold a route that has no
  backstop. The text says so openly and points to T-1650, which is the honest state. T-1650 blocks the flag default.
  It does not block this verdict, because the flag is off.
- **The stated limit.** The text in lane.py and C2 is word for word the text in 4:02 AM item 3.

## Tests

The fixes are text only: a rewrap and a date. No test pins them, and I added none. A test for column width would
check style, not behaviour. The mutation evidence and the new test are Pernille's. I re-ran both and did not edit
them.
{% endraw %}

</div>
