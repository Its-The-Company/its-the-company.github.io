---
layout: "default"
title: "T-0935: the lane.py change in 892fd52e (T-0675 slice 3)"
section: "documents"
description: "Verdict: pass. The change is correct and no High came out of it. Two Mediums and two Lows sit around it. M1 stops part of the &quot;Not held&quot; order: the three widgets/&lt;id&gt;/ files can be reached by an ordinary script, so that\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0675-lane-py-t0935-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 11 · Sun Nov 1</span><span><code>pywidget/docs/reviews/t0675-lane-py-t0935-pernille.md</code></span></div><h1>T-0935: the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>.py change in 892fd52e (T-0675 slice 3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-01. Read: the diff, `pywidget/tests/bridge/test_lane.py`, `bench/t0675-lane-extension.txt`, the two real zips. Not read: the author's notes. Line numbers are HEAD's at 1b30969a; Idris has uncommitted Swift work in the same files, and nothing below rests on it.

**Verdict: pass. The change is correct and no High came out of it.** Two Mediums and two Lows sit around it. M1 stops part of the "Not held" order: the three `widgets/<id>/` files can be reached by an ordinary script, so that one route goes to the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> (T-0952), not on the list.

**Chair note, T-0959 (Ines, 2026-11-01).** The verdict stands, on the other rows. Three results are withdrawn and should not be cited: the "Before and after" row, the line below that says the bug was reproduced on the host, and M2's second paragraph (10 of 33, the 11 suites, the two failures). They ran by a method the chair does not accept. T-0956 gives the after half on the shipped zip. `build_zip.py`, `run_lane.py`, `run_suite.py`, `py_noI.sh` and their three output files stay in `t0935-evidence/` as the record of what ran; nobody reruns them. Pernille's text below is unchanged.

The first thing that broke, for the record, was `import zoneinfo`: refused at `sysconfig`, a stdlib frame named as user code. That is the bug, reproduced on the host below.

## What was checked


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What was checked, scrolls sideways" style="--tw:923px" markdown="1">

| Check | Result | Evidence (in `t0935-evidence/`) |
|---|---|---|
| Is one prefix true of the whole zip? | Yes. All 543 modules (today's Debug Simulator build) and 544 (an earlier Release iphoneos build) sit under `Platforms/Apple/iOS/Frameworks/arm64-iphoneos/lib/python3.15/`. The one other name, `Lib/keyword.py`, is text in keyword's docstring. | `zip-names.txt` |
| Reading the name from json, not a constant | Right call. The Simulator's zip says `arm64-iphoneos` too, so the name is the builder's, not the slice's. | same |
| Before and after, on a real sourceless zip (host 3.13) | Before: `import zoneinfo` refused at `sysconfig`. After: loads. `fractions`, `ssl`, `import_module('fractions')` and `__import__('statistics')` are refused both ways. | `finder-before-after.txt` |
| Seeded mutants on a copy | 6 of 6 caught: guard removed, root not in `extra`, one and three `dirname`s, `realpath` of the name, `__file__` for `co_filename`. | run in review; list in the Appendix |
| Host suites | `test_lane` passes on 3.9 and 3.13. `test_lane_lazy`, `test_lane_reset`, `test_lane_t0734_odalys` pass on 3.13. | rerun after the docstring edits below |
| Forged names | `compile(src, "Platforms/.../x.py")` is trusted, as a forged absolute stdlib path was already. "Not a sandbox" in lane.py's header covers it, NEVER and denied names don't ask, and an ordinary script's frames are absolute. No new "Not held" entry. | `_user_frame`, lane.py |
| Odd names from json | `<frozen json>` or `json/__init__.py` gives `""`, which `configure` skips: stdlib frames stay user code and the lane fails loudly at bootstrap, as test K would show. | read |
| The commit's numbers | Start 75.5 ms, run 53.7 ms, 23.5 MB, peak 25.4 MB: the bench lines agree. | `bench/t0675-lane-extension.txt` |

</div>


## Medium

**M1. `widgets/<id>/` is a script's own folder, so an ordinary script can delete `ext.marker`, `lane-peak` and `lane-refused`.** Not in this diff. It is against the 13:03 chair line's condition, and it decides what can go under "Not held".

The chair line says the three files "stay outside `scripts/<id>/`, the condition T-0720's bullet sets for the list". True, and not enough. T-0720's bullet rests on the list being in *no* script's folder. `scripts/<id>/` is the folder of a lane run only. The same widget's app-lane run, its refresh in the app and its Shortcut, runs `widgets/<id>/main.py`:

- `WidgetWriter.swift:60` and `RunScriptIntents.swift:103`: the file is `<widgets>/<id>/main.py`.
- `runner.py:1041-1042`: `main.__file__ = path`, and its folder goes on `sys.path`.

So this script, with nothing from 16:54 item 2c's list, reaches them. There is no cwd for such a run, so it has to go through `__file__`, which is the usual idiom:

```python
import os
here = os.path.dirname(os.path.abspath(__file__))
for n in os.listdir(here):
    if not n.endswith(".py"):
        os.remove(os.path.join(here, n))
```

Read from the lines above, not run on a phone. What it costs, delete only, since an ordinary script writes neither name:

- `ext.marker`, left by a killed run or in flight: one demotion missed. The next <span title="A test written in advance. If it fires, we drop the idea.">kill</span> leaves a new marker.
- `lane-peak`: back to the first run's 18 MB need.
- `lane-refused`: the count starts over.

No widget is blamed for anything, so I read no break in 2a, 2b or 2c. It also deletes `tree.json`, which is the larger loss and already possible. But 16:54 item 3 says "Not held" may not list a route an ordinary script can hit, and T-0720's branch sends exactly this case to the chair.

Done: the deliberate routes are on the list. The ordinary one is named as outside it. T-0952 asks Ines to pick:

- (a) Accept it as a stated limit, off the "Not held" list. No code. **My view:** this one. The harm is one missed demotion, and a repeat kill leaves its own marker.
- (b) Move the three files to a folder no script runs from. Small in `LaneRunFiles`, but an id rename and a widget delete carry them for free today and would need their own steps.

**M2. On 3.15 the shipped layout has seen one script.** The bug lived until the first real extension run because every lane suite ran on a stdlib with source. `device_replay.py` is no exception: it uses the testbed's `Python.xcframework/lib/python3.15/json/__init__.py`, not the zip. So the false-alarm suite that 16:54 item 2c names has never run on what ships. On 3.15, with the zip and lazy imports, the evidence is test K's token script.

It is not true that a host can't see this. Run with the stdlib as a sourceless zip (`build_zip.py`, `run_suite.py`), the pre-fix runtime fails 10 of 33 in `test_lane` (`test_lane-prefix-on-zip.txt`), and the fixed one has no false alarm in any of the 11 lane suites (`suites-on-zip.txt`). That run needs one patch in a temp copy, because my host home keeps the zip outside `bundle_root`, where the app has it inside; `_keep_module` would purge what the app keeps. Two tests still fail there, both from the layout, neither from the lane:

- `test_the_compiled_root_is_found_from_json` compares with `os.__file__`, which assumes source on disk. That assumption is in the test.
- `test_M3_...` misses `_ssl`, because my `lib-dynload` is a symlink out of the home.

3.13 has no lazy imports, so this says nothing about the record on the zip. T-0956 (mine): replay the lane suites in the Simulator with the zipped stdlib, and make that one test layout-free, before the flag defaults on.

## Low

**L1. The lock's open wait now has extension callers.** `LaneGuard.swift:183`, `while flock(fd, LOCK_EX) != 0`, with no bound; T-0737 L3 said so. `ExtensionLane.swift:118`, `:142` and the `carryOut` at `:149` now call it, and turns chain at `:98`, so one held lock stalls every later turn in that process. Only a script taking the lock on purpose gets there, but "ends with the holder's process" is not one of item 3's three ends. T-0953 (Idris): the bounded wait `WidgetStateLock` already has. `add` then returns false, and the code after it already copes: the marker stays, `carryOut` ends the process.

**L2. A deliberately deleted marker has an effect item 3 doesn't name.** A script that removes its own marker in every run hides its kills across processes, not "for the rest of that process", and its backstop is the kill itself, each reload, with its neighbours. It is listed because 13:03 orders it and it does end at the memory kill. T-0952 carries it for the chair to read.

**L3. Fixed here.** `_user_frame`'s docstring still said a relative name means user code. It no longer always does.

## "Not held" (chair line 13:03, item 1)

Added to both places the list lives, as T-0720's route was (16:54 item 5): lane.py's header, which <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the full list, and C2 1.7, which carries the routes since T-0731. `.lane-demoted.json` was already there. New bullets: `.lane-demoted.lock`, and `ext.marker`, `lane-peak`, `lane-refused` together. My only lane.py edits are those docstring texts and L3: no code.

## Appendix: mutants

Applied to a temp copy, `test_lane` compared with that copy's own baseline (11 scenario tests fail there for want of the tree around them, the same 11 every time). New failures: guard removed, `test_a_relative_root_is_not_also_taken_from_the_working_directory`; root not in `extra`, realpath of the name and `__file__` for `co_filename`, `test_install_finder_trusts_what_the_stdlib_was_compiled_as`; one and three `dirname`s, that test and `test_the_compiled_root_is_found_from_json`.
{% endraw %}

</div>
