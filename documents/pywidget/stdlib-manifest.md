---
layout: "default"
title: "Stdlib manifest for the embedded interpreter (RULED, manifest v2)"
section: "documents"
description: "Runtime: CPython 3.15.1 from pywidget/ios/Vendor/python/Python.xcframework (Idris&#x27;s spike, edbcb42c). No Xcode build: the generator rebuilds each mode&#x27;s python/ folder in a temp dir with the same steps as\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/stdlib-manifest.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/stdlib-manifest.md</code></span></div><h1>Stdlib manifest for the embedded interpreter (RULED, manifest v2)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-25. Board line "[build] Pernille, P1, Python runtime engineer probation", part (b). **Status: ruled (Ines, <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling 2026-10-25 21:09 ET, below): 29 strips accepted; `profiling.sampling` stripped, not all of `profiling`.** Sections 1-4 are the proposal as the chair read it, unchanged. Section 5 is manifest v2, which carries out the ruling, and the format the build phase reads.

- Data: `pywidget/runtime/stdlib-manifest.json` (every module, shipped or stripped, with its sizes and the reason for each strip).
- <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">Generator</span>: `pywidget/runtime/stdlib_manifest.py` (`--check` fails when the file no longer matches the vendored tree).
- Tests: `pywidget/tests/stdlib/test_stdlib_manifest.py`, 11 tests, green on host 3.9.6 and 3.13.18 (`run_host.py --both`).

Runtime: CPython 3.15.1 from `pywidget/ios/Vendor/python/Python.xcframework` (Idris's spike, edbcb42c). No Xcode build: the generator rebuilds each mode's `python/` folder in a temp dir with the same steps as `ios/scripts/install_stdlib.sh` and `make_stdlib_zip.py`, then counts on-disk blocks as `du` does. In a built app the `.so` files move to `Frameworks/` and leave `.fwork` stubs, so they are counted there.

## 1. What is stripped

29 names. The first thing that breaks if we skip this: the App Review note "no raw Objective-C or ctypes bridge" is false with a stock upstream build (L12 s4).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. What is stripped, scrolls sideways" style="--tw:767px" markdown="1">

| Group | Modules | Source |
|---|---|---|
| Spike strip rule | `test` (54.0 MB of pyc + data), `idlelib`, `tkinter`, `turtledemo`, `ensurepip`, `__phello__`, `pydoc_data`, `turtle`, every opt-1/opt-2 `.pyc` | install_stdlib.sh |
| L12 denylist, escape and attach | `_ctypes` (263 KB device), `ctypes`, `_ctypes_test`, `_remote_debugging` (2,098 KB device) | L12-security s11 step 1 |
| L12 denylist, CPython test modules | `_testbuffer`, `_testcapi`, `_testclinic`, `_testclinic_limited`, `_testimportmultiple`, `_testinternalcapi`, `_testlimitedcapi`, `_testmultiphase`, `_testsinglephase`, `_xxtestfuzz`, `xxlimited`, `xxlimited_35`, `xxlimited_3_13`, `xxsubtype` | L12 s11 (`_test*`, `xx*`) |
| Proposed on top, dead on iOS | `venv` (needs a python executable), `curses` (no `_curses` in the iOS build), `__hello__` | this doc |

</div>


Shipped: 228 modules and packages from `lib/` and `lib-dynload/`, plus 39 built into `Python.framework` (read from its `PyInit_*` symbols, plus `sys`, `builtins`, `marshal`, `_warnings` and the frozen importlib pair).

## 2. Measured sizes (MiB on disk)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Measured sizes (MiB on disk), scrolls sideways" data-n="4" style="--tw:618px" markdown="1">

| Mode | python/ | Frameworks/ | Spike python/ | Delta |
|---|---|---|---|---|
| full (upstream) | 236.57 | 32.00 | 237 | -0.2% |
| stripped (spike rule) | 24.57 | 32.00 | 25 | -1.7% |
| zip (spike recommendation) | 12.13 | 32.00 | 12 | +1.1% |
| **proposed** (zip + this cut), simulator | **11.89** | **27.71** | | |
| **proposed**, device arm64 | **11.90** | **22.32** | | |

</div>


- Frameworks/ (full) 32.00 MiB against the spike's 32 MB, 0.0%: `Python.framework` without `Headers/` (Xcode drops it on embed) plus one framework per `.so` (the binary and its Info.plist; the code signature is not modelled).
- All four bundle figures reconcile within 2%, inside the 5% pass condition. The spike's "about 2.1 MB" of test extension modules measures 1.96 MiB (2.06 decimal MB, -6.7% in MiB, -2% in MB). It is a rounded side note, not a bundle total, and the test does not gate on it.
- The cut saves 0.24 MiB in `python/` (the spike's zip already left out the big packages) and 4.3 MiB in `Frameworks/`, almost all of it `_remote_debugging` (2.1 MB) and the test extensions (2.0 MB).
- Device `Frameworks/` is 5.4 MiB smaller than the simulator's, because the simulator `Python.framework` is fat (arm64 + x86_64). App Store thinning is not measured.

## 3. Host import test

`test_stdlib_manifest.py` proves `pywidget_ui` and the 10 example scripts need nothing stripped, two ways:

1. **Dynamic.** A child interpreter (`-I`) puts a meta-path finder first that raises `ModuleNotFoundError` for any stripped name, then imports `pywidget_ui` and executes each example as a module. All 11 load; no stripped module was loaded before the finder; probes for `ctypes`, `_ctypes`, `curses` and `test.support` are refused, so the finder is live.
2. **Static.** Every import statement in those files, including imports inside functions, names a module the 3.15.1 runtime ships (manifest `shipped` plus `builtin`). The host's own stdlib differs from 3.15's, so this is the check that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for the device.

Seeded mutation: moving `socket` from shipped to stripped fails both checks (`http_status.py`).

## 4. For the chair

- **Import breaks inside the shipped set.** 11 module-level imports in shipped files name a stripped module: `_pyrepl/windows_console.py` (ctypes, Windows only), `multiprocessing/sharedctypes.py` (ctypes), `asyncio/tools.py` and three `profiling/sampling` files (`_remote_debugging`), three `profiling/sampling/live_collector` files (curses). None of them is reachable from our code. Options: also strip `profiling` (1.15 MB of pyc, the largest pure package we ship) and `multiprocessing.sharedctypes`, or leave them and let them fail with the finder's message. My recommendation: strip `profiling` (it is a sampling profiler that attaches to other processes, which iOS forbids) and leave the rest.
- **Not cut, and why.** `_ssl` (4.6 MB) and `_hashlib` (3.6 MB) are OpenSSL; requests and https need them. `_zstd` (2.1 MB) backs `compression.zstd`, new in 3.14; cutting it saves the most of anything left but `tarfile`, `zipfile` and `shutil` reach it, so it needs a check first. `multiprocessing` (0.43 MB) cannot fork on iOS but `concurrent.futures.process` imports it. `unittest` and `doctest` stay: users write tests.
- **Enforcement.** This manifest only describes the cut. The build phase must apply it (`install_stdlib.sh` today strips only the spike list) and fail on the L12 denylist; that is Idris's Xcode work, and the generator's `stripped` list is the input it should read.
- Not measured: a device build, App Store thinning, code-signature overhead per framework.

## Chair ruling (Ines), 2026-10-25 21:09 ET

Form: Pernille's proposal is the first view; my own read of the vendored 3.15.1 tree (`ios/Vendor/python/Python.xcframework/lib/python3.15/`) is the second, made before ruling. Idris applies it in the build phase.

**Ruling: the 29 strips are accepted as listed. On profiling, amended: strip `profiling.sampling`, not the whole `profiling` package.**

1. **The 29 names stand** (section 1): the spike strip rule, the L12 denylist (escape, attach, CPython test modules) and the three dead-on-iOS names. The L12 group is not a size choice; it is what makes the review note "no raw Objective-C or ctypes bridge" true. Sizes reconcile within 2% of the spike, inside the 5% pass.
2. **Profiling: strip `profiling.sampling` only.** Stripping all of `profiling` breaks `cProfile`, which ships: in 3.15 `cProfile.py` is a wrapper whose line 7 is `from profiling.tracing import run, runctx, Profile`. A Python IDE without `cProfile` loses the standard profiler its users reach for. Kept: `profiling/__init__.py` and `profiling.tracing` (12,790 bytes of pyc together). Stripped: `profiling.sampling`, 462,842 bytes of pyc and 676,110 bytes of data (1.09 MiB, 99% of what the whole-package strip saves). It is the part Pernille's reason actually covers: a sampling profiler that attaches to other processes through `_remote_debugging`, which is stripped and which iOS forbids. It also removes from the bundle a vendored `d3.min.js` 7.8.5, a `d3-flame-graph` folder and two logo PNGs (`python-logo-only.png`, `tachyon-logo.png`): third-party files and images we would otherwise ship and have to log (C5, C9). All six of the listed `profiling/sampling` import breaks go with it.
3. **The other import breaks stay as they are**: `_pyrepl/windows_console.py` (Windows only), `multiprocessing/sharedctypes.py`, `asyncio/tools.py` (only `python -m asyncio ps/pstree`, which attaches to another process). Each fails at import with `ModuleNotFoundError` naming the stripped module. Not worth a strip rule each.
4. **`_zstd`, `_ssl`, `_hashlib`, `multiprocessing`, `unittest`, `doctest` ship** (section 4 reasons). `_zstd` (2.1 MB) is not cut in v1: `tarfile`, `zipfile` and `shutil` reach it, and Install from file reads archives. A 22 MB device Frameworks folder does not cost us a sale; a broken `zipfile` would.
5. **The test gap this exposed.** The static scan covers our code (`pywidget_ui`, the 10 examples) but not shipped stdlib modules that import a stripped one; that is how a whole-package `profiling` strip would have passed while breaking `cProfile`. The manifest's `import_breaks` list becomes a pinned allowlist: a test fails when any shipped module gains a module-level import of a stripped name that is not on the list. With this ruling the list holds the five non-`sampling` entries.

Follow-ups (board lines):
- Pernille: manifest v2 for this ruling: generator supports a subpackage strip (`profiling.sampling`), `import_breaks` pinned with the test in item 5, a host probe that `import cProfile` and `cProfile.runctx("sum(range(10))", {}, {})` work on the shipped set (the 3.15 wrapper is a static check; host 3.9/3.13 cProfile differs), sizes re-measured; status `ruled` with a pointer to this section.
- Idris (build phase): `ios/scripts/install_stdlib.sh` reads the manifest's `stripped` list instead of its own spike list; the build fails if any L12 denylist name (`_ctypes`, `ctypes`, `_ctypes_test`, `_remote_debugging`, `_test*`, `xx*`) is present in the built `.app` (python/ zip or Frameworks/); bundle sizes checked against the manifest within 5%.

## 5. Manifest v2 (Pernille, 2026-10-25 21:17 ET)

v2 carries out the ruling. 30 names stripped: the 29 above plus `profiling.sampling`. The generator refuses to write (exit 1) if the cut breaks anything beyond the pinned allowlist.

### Sizes, re-measured


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Sizes, re-measured, scrolls sideways" style="--tw:562px" markdown="1">

| Mode | python/ | Frameworks/ |
|---|---|---|
| v1 proposed, simulator | 11.89 MiB (12,468,224 B) | 27.71 MiB |
| **v2 `app`, simulator** | **10.80 MiB (11,321,344 B)** | **27.71 MiB (29,061,120 B)** |
| **v2 `app_device_arm64`** | **10.80 MiB (11,329,536 B)** | **22.32 MiB (23,404,544 B)** |

</div>


- `profiling.sampling` takes 1,146,880 B on disk out of `python/` (462,842 B of pyc and 676,110 B of data, the figures in the ruling). Frameworks/ does not move: the subpackage is pure Python.
- `profiling` ships at 12,790 B of pyc (`__init__` and `tracing`), as the ruling measured.
- The full, stripped and zip rows and their spike reconciliation are unchanged (-0.2%, -1.7%, +1.1%, Frameworks 0.0%).

### What the tests now check (`tests/stdlib`, 20 tests, green on 3.9.6 and 3.13.18)

- **Pinned `import_breaks`** (ruling item 5). The scan covers every shipped `.py` in the vendored 3.15.1 tree, module-level imports only, relative imports resolved, and `from pkg import sub` counted as an import of `pkg.sub`. Each entry is `file:line imports name`. Five entries: `_pyrepl/windows_console.py` lines 26, 29 and 40 (`ctypes`, `ctypes.wintypes`, `ctypes`), `asyncio/tools.py:7` (`_remote_debugging`), `multiprocessing/sharedctypes.py:10` (`ctypes`). The v1 list showed `windows_console ... imports ctypes` twice; the line numbers tell the two statements apart. The pin is `IMPORT_BREAKS_ALLOWED` in the generator; the test fails when the scan differs from it in either direction.
- **cProfile, statically.** From `cProfile.py`, module-level imports are followed through the shipped tree to builtins, extensions or `.py` files; nothing may be unresolved (`cprofile_unresolved: []`). The chain reaches `profiling.tracing`, `_lsprof` and `pstats`.
- **cProfile on the host.** The child interpreter with the refusing finder (now dotted-aware, so `profiling.sampling` is refused while `profiling` is not) imports `cProfile` and runs `cProfile.runctx("sum(range(10))", {}, {})`. On 3.9 and 3.13 that is the host's own cProfile, which does not go through `profiling`; the 3.15 chain is the static check above.
- **Seeded mutations.** A strip of `profiling.tracing` fails five tests and the generator refuses: `new break: cProfile.py:7 imports profiling.tracing`, `cProfile needs profiling.tracing`. In-suite seeds also check that the whole-`profiling` strip the ruling rejected now fails, and that dropping `_lsprof` does.

Known and accepted, not module-level so not on the list: `from profiling import *` fails, because `profiling.__all__` names `"sampling"`; `python -m profiling.sampling` fails with the finder's message. Neither is reachable from our code.

### Format v2, for the build phase

`pywidget/runtime/stdlib-manifest.json`, JSON with sorted keys. `format_version` is 2. The test pins the top-level key set; renaming or removing a key bumps `format_version`, and so does changing what a `stripped` entry means.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Format v2, for the build phase, scrolls sideways" style="--tw:575px" markdown="1">

| Key | Meaning |
|---|---|
| `stripped` | Sorted names to remove. A name without a dot is top level: remove `lib/python3.15/<name>/` or `<name>.py`, the matching `lib/python3.15/__pycache__/<name>.*.pyc`, and `lib-dynload/<name>.*.so` (no `.fwork` stub, no framework). A dotted name is a path under `lib/python3.15` with dots as slashes: remove that directory or `.py` and the matching `<leaf>.*.pyc` in the parent's `__pycache__/`. Dotted names are pure Python in v2; the parent ships. |
| `strip_rules.also` | Also remove every opt-1/opt-2 `.pyc`. |
| `shipped`, `builtin` | Top-level names that ship as files, and those compiled into `Python.framework`. |
| `modes.app`, `modes.app_device_arm64` | `python_bytes` and `frameworks_bytes` on disk (st_blocks, as `du` counts) for the simulator and the device slice. Frameworks/ excludes `Python.framework/Headers` and code signatures. These are the figures for the 5% bundle check. `full`, `stripped`, `zip` are the spike comparisons. (v1 called the app rows `proposed` and `proposed_device_arm64`; nothing read them.) |
| `modules.<name>` | Per-unit sizes, `status`, `reason` when stripped; a shipped parent lists its `stripped_parts` and counts only what ships. |
| `import_breaks` | The pinned allowlist, `file:line imports name`. |
| `cprofile_unresolved` | Must be `[]`. |
| `status`, `chair`, `ruling` | `ruled`, `Ines`, and a link to the ruling above. |

</div>


`python3 pywidget/runtime/stdlib_manifest.py --check` exits 0 when the file matches the vendored tree, 1 when it is stale or the cut is refused, 2 when the vendored runtime is absent.
{% endraw %}

</div>
