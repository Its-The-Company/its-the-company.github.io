---
layout: "default"
title: "T-0685: review of c9054763 (T-0676, widget-extension lane, Python half)"
section: "documents"
description: "Accept with three Medium follow-ups before the flag can default on. None of them blocks T-0675 from starting. The scan, the lane key, mirror_entry and the no-.pyc rule hold. The finder does its job on ordinary imports\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0676-lane-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0676-lane-review-odalys.md</code></span></div><h1>T-0685: review of c9054763 (T-0676, widget-extension <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, Python half)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. Independent review (Commandment 13): I read the diff, the board line and the runner code it touches, not the author's notes.
Scope: `pywidget/ios/App/Runtime/_pywidget_runtime/lane.py`, the runner's `bootstrap` / `_import_guards` / `_reset` hooks, `pywidget/tests/bridge/test_lane.py`, C2-device-api.md s1.7.
Method: real bypass attempts through the test harness (`test_runner.Scenario`, the real runner in a fresh `-I` interpreter, config `lane: widget, write_bytecode: false, app_packages: false`). Host 3.9.6 (`/usr/bin/python3`) and 3.13 (Homebrew), foreground, no Xcode. Probe scripts were kept outside the repo. Each row below is n=1 run per interpreter, and the result was the same on both unless the row says otherwise.

**The device interpreter is 3.15.1** (`Vendor/python/Python.xcframework`, `PY_VERSION "3.15.1"`), started with `-X lazy_imports=all` (pwbridge.c:586, PythonRuntime.swift:52; `extension_config` defaults `lazy_imports=True`). No host interpreter here is 3.15, so nothing below is measured on the interpreter that ships.

## Verdict

**Accept with three Medium follow-ups before the flag can default on.** None of them blocks T-0675 from starting. The scan, the lane key, `mirror_entry` and the no-.pyc rule <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. The finder does its job on ordinary imports: `import`, `__import__`, `importlib.import_module`, `importlib.__import__`, `exec('import x')`, `__import__(..., fromlist=['http'])` and a `builtins.__import__` swap are all refused with the scan's text. Three problems remain:
1. It refuses an ordinary call on an allowed module (`datetime.strptime`).
2. It does not hold "whoever imports it" across a reset.
3. Its evidence does not cover the 3.15 lazy-import interpreter it runs on.

## What held (n=1 each, 3.9 and 3.13)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What held (n=1 each, 3.9 and 3.13), scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| `import csv`, `__import__('sqlite3')`, `exec('import decimal')`, `importlib.import_module('fractions')`, `importlib.__import__('fractions')` | LaneImportError, scan text |
| `__import__('pywidget', fromlist=['http'])`, `from pywidget import http` | LaneImportError "pywidget.http" |
| `from pywidget import *` | ok: `__all__` is `errors, Reading`, nothing denied |
| NEVER name via a trusted frame (`threading.Thread(target=__import__, args=('ssl',))`) | refused (the thread raised; `ssl` not in sys.modules) |
| Finder removed by a run, then the next run | re-installed by `_reset` → `_import_guards`; count stays 1 |
| `sys.dont_write_bytecode = False` in a run, then reset | `True` again (install_finder sets it on every reset); PyConfig `write_bytecode = 0` already at init in pwbridge.c:581 |
| `mirror_entry`: symlinked folder, `..`, `/`, empty id, missing entry, entry symlinked outside the folder | LaneError `lane_entry` (the entry symlink gives detail `entry_outside` from app_manifest) |
| Allowed set on its normal paths: `re` with Unicode, `textwrap`, `string.Template`, `json`+`math`, `strftime('%A')`, `ZoneInfo('Europe/Paris')`, `str.encode('cp1252')` | ok |

</div>


## Findings

### Medium

**M1. `datetime.datetime.strptime` fails in the lane, and the scan passes the script.** lane.py:245-263 (`_from_user`), 270.
`datetime` is implemented in C (`_datetime`). `strptime` imports `_strptime` from C with no Python frame of its own, so the nearest frame the finder sees is the user's line. `_strptime` is off the allowlist, so the call is refused.
Failure scenario: a widget parses "9:05" into a time, which is an ordinary bus or countdown widget. It saves clean, then every extension run fails with "_strptime can't be used in a widget that runs on its own", a module the user never wrote.
Proof (3.9 and 3.13):
```python
import datetime
datetime.datetime.strptime('9:05', '%H:%M')
# -> LaneImportError: _strptime can't be used in a widget that runs on its own. ...
```
Fix direction: an implied set that the finder allows and the scan does not need to know about, starting with `_strptime`. Audit the C halves of the allowed modules for C-level imports (`_datetime`, `_zoneinfo`, `_json`, `_sre`, `_collections`, `posix`). Add a host test for `strptime` in the lane, and recheck on 3.15, where `datetime` may or may not be the C build.

**M2. The guard does not survive a reset, so the NEVER set does not hold "whoever imports it."** lane.py:21-23 (docstring), lane.py:268-271, 291-302; runner.py:340-352 (`_keep_module`); C2 s1.7 table ("Everyone, stdlib included").
The docstring already says "not a sandbox" and names two gaps: `sys.modules` hand-outs and faked file names. It then claims more than the code does. Three proofs, each in a fresh process, 3.9 and 3.13:
```python
# (a) inside one run: drop the finder, or skip meta_path entirely
import sys; sys.meta_path.pop(0); import ssl          # ok, ssl loaded
import importlib.machinery, importlib.util             # both already in sys.modules
s = importlib.machinery.PathFinder.find_spec('_ssl')   # C half loaded with no finder call;
                                                       # then ssl.py the same way -> ok
# (b) across reset: run 1 does (a); reset; run 2:
import ssl            # ok, finder first on meta_path, never asked
# _keep_module keeps every stdlib-rooted module across reset, so ssl stays for every
# later run in that extension process, other widgets included.
# (c) across reset, by poisoning the lane's state (the runtime package is in sys.modules):
import _pywidget_runtime.lane as L
L.LaneFinder.find_spec = classmethod(lambda *a, **k: None)
# reset; next run: import ssl -> ok. install_finder re-inserts the same patched class.
```
Failure scenario: a user's script, or a snippet pasted from a forum, does (a) once. After that, `ssl`, `asyncio` and the rest stay resident in the shared extension process, and every widget's later reload carries that memory toward the jetsam ceiling. The finder can no longer tell, because it is never asked. The boundary at stake is memory, not privilege: it is the user's own code, and the app lane can do all of this anyway.
Fix direction (cheap, still not a sandbox):
1. In the widget lane, `_reset` drops NEVER-rooted modules even when they are stdlib (exclude them in `_keep_module`). It also restores the lane's state: freeze `NEVER`, `ALLOWED`, `trusted`, `user_roots` and `find_spec` at the first install, and put them back on every reset.
2. After each widget-lane run, add a result field saying whether any NEVER name is in `sys.modules`. T-0675 can then demote that widget to the app lane.
3. Change the docstring and the C2 s1.7 "who it binds" cell to say: ordinary imports are refused; deliberate in-process tampering is not; the backstop is demotion when the extension is killed for memory.

**M3. The lazy-import interpreter is untested.** The board line asks for this check, and host Python cannot run it.
The device runs 3.15.1 with `-X lazy_imports=all`. All 21 lane tests and every probe here ran on 3.9 and 3.13, which have no lazy imports. Open questions, each needing one Simulator or testbed run:
1. A refused lazy import raises at first use, not on the import line, so the run's line differs from the scan's line.
2. Does the LaneImportError type and text survive reification, or does it arrive wrapped? T-0675 may key off the type.
3. Which modules are already in `sys.modules` after bootstrap? The runner's own module-level imports become lazy, so which names the finder never sees differs from the host's set.
4. Does a user's attribute access (`mod.name`) reify an off-list module-level import of an allowed module from the user's frame? That would be a refusal of the M1 kind.
5. Do `_strptime` (M1) and the zoneinfo fallback (L5) behave the same way?

Fix direction: run test_lane.py and the M1/M2 probes under the bundled 3.15.1 with `-X lazy_imports=all` (the testbed, or the Simulator through tools/xc.sh), record the results beside t0676-evidence/test-results.txt, and turn any differences into tests.

### Low

**L1. "Same names, same text" holds only for single-name imports.** lane.py:158, 174 vs 267-271.
- `import xml.etree.ElementTree`: the scan names "xml.etree.ElementTree" and the finder names "xml". The same goes for `import urllib.request` (scan "urllib.request", finder "urllib").
- `from . import helper`: the scan gives the lane text for ".", but at run time CPython raises its own `ImportError: attempted relative import with no known parent package`, not LaneImportError.
- Names the runtime has already loaded (`threading`, `traceback`, `importlib`, `signal`, `linecache` on host) are refused by the scan and allowed by the finder. The scan is stricter, which is the safe direction, but the C2 line "enforced twice with one text" overstates it.
Fix: name the top-level package in the scan for dotted `Import` nodes, or say in C2 which name each side reports.

**L2. Deliberate in-run bypasses of the allowlist (not of NEVER).** lane.py:245-263.
- `threading.Thread(target=__import__, args=('csv',))` loads `csv`, because the nearest frame is threading.py, which is trusted.
- `exec(compile('import csv', os.__file__, 'exec'))` loads `csv`. The docstring already names this one.
These cost memory, not safety. Add the thread case to the docstring's list of gaps.

**L3. A `builtins.__import__` swap turns into a runner `internal_error` on 3.13.** The status is `internal_error` with "LookupError: unknown encoding: utf-16-le". The runner's own codec lookup ran through the user's `__import__`, so its frame looked like user code and the finder refused it. 3.9 gives the correct LaneImportError for the user's import. Only deliberate code triggers this, but T-0675 should not read `internal_error` from a lane run as a runtime fault without looking at the cause.

**L4. A NUL byte in `widget_id` raises ValueError, not LaneError, on 3.13.** lane.py:349-351. In that case the extension would not fall back to the app. 3.9 gives LaneError `not_found`. Fix: refuse `"\x00"` with the other id checks, or catch ValueError.

**L5. zoneinfo's fallback imports `urllib` on 3.9.** `ZoneInfo('Nowhere/Fake')`, `ZoneInfo` with an empty TZPATH, and `available_timezones()` go through importlib.resources → pathlib → urllib.parse and are refused with "urllib can't be used". On 3.13 all three work. On the device (3.15) this is unverified, and so is whether the iOS sandbox gives a readable TZPATH. If it does not, every `ZoneInfo` takes the importlib.resources path, which also counts against the 15 MB. Check once on the Simulator together with M3.

## Hand-offs to T-0675 (Idris), as listed on the board line, checked

- RuntimeConfig gains `lane`, `write_bytecode` and `app_packages`. The runner reads all three (runner.py bootstrap). `extension_config` emits them, and the bootstrap reply still says `contract: 5`. The bridge-contract s3 row and the contract bump are still T-0675's job.
- The extension calls `lane.containing_app`, `extension_config` and `mirror_entry`, and turns a `LaneError(lane_entry)` into "run in the app".
- From this review: treat the extension's memory <span title="A test written in advance. If it fires, we drop the idea.">kill</span> as the real boundary and demote that widget to the app lane (M2). Do not read `internal_error` from a lane run as a runtime fault (L3).
- Maren reviews `lane.MESSAGES`. Not done here.

## Board lines added

T-0692 (M1), T-0693 (M2), T-0694 (M3), all for Pernille.
{% endraw %}

</div>
