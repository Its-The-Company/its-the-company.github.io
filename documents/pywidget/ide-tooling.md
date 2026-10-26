---
layout: "default"
title: "In-app Python tooling: jedi, pyflakes, black, ruff"
section: "documents"
description: "I measured neither, so neither is a v1 plan. Revisit after v1 only if black is too slow on a device."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/ide-tooling.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/ide-tooling.md</code></span></div><h1>In-app Python tooling: jedi, pyflakes, black, ruff</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Board line: "[research] Odalys, P1, in-app Python tooling read". Brief section 2.5 Editor asks for completion over stdlib, bundled packages and the app's own modules; inline errors and linting; formatting (Ruff or Black).

## Verdict for v1


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict for v1, scrolls sideways" style="--tw:795px" markdown="1">

| Tool | v1 | Condition |
|---|---|---|
| jedi 0.19.2 (completion, go to definition) | **GO** | `jedi.InterpreterEnvironment` only; run off the main thread; writable cache dir in the app's Caches; ship stdlib `.py` sources (see Risks) |
| pyflakes 3.4.0 (lint) | **GO** | Run on every pause (debounce about 300 ms); convert its UTF-8 byte columns |
| black 25.11.0, pure-Python wheel (format) | **GO, on command only** | "Format" button and format-on-save for files under about 1,000 lines; never format-as-you-type |
| ruff 0.17.2 (lint + format) | **NO-GO** | Native executable; iOS cannot start a process. See "Ruff on iOS" |

</div>


## Method

- Host Python: **3.9.6** (`/Applications/Xcode.app/.../Python3.framework/Versions/3.9`). It is the only Python on this Mac mini; no 3.13, 3.14 or 3.15 is installed. The app runs 3.15 (L13). Numbers are host numbers on Apple silicon, not iPhone numbers.
- Packages: venv `~/.venvs/idetool` outside the repo, wheels from PyPI via pip, logged in `log/software.md`. black is the `py3-none-any` wheel (pytokens too): the mypyc-compiled macOS wheels pip picks by default cannot exist for iOS, so the pure wheel is the honest one to time.
- Harness: `pywidget/tests/tooling/bench_tooling.py`. Each row runs in a fresh child interpreter. Inside the child, `subprocess.Popen`, `os.fork`, `os.posix_spawn*`, `os.system`, `os.popen`, `os.exec*`, `os.spawnv*` are replaced by functions that raise and count. Timing runs and memory runs are separate (tracemalloc slows these tools about 2-3x).
- 500-line file: stdlib `wave.py` (513 lines). Stdlib corpus: 652 `.py` files, 296,703 lines (stdlib minus tests, idle tests, site-packages). "big4": `argparse.py`, `typing.py`, `subprocess.py`, `asyncio/base_events.py`, 8,785 lines.
- jedi probes appended at the end of `wave.py`: `os.path.`, an instance of a class in the file (`w.get`), `asyncio.`, `argparse.ArgumentParser().add_`, `'a,b'.split(',')[0].st`, a bare name. Warm = new `Script` object after a one-line edit, median of 5 per probe, then median over probes.
- Sample: 2 full harness runs (19:31 and 19:34 ET), results in `pywidget/tests/tooling/results/host-py39.json` and `host-py39-run2.json`. Machine shared with other agents' work during both runs. Both values shown as run1 / run2.

## Numbers (host, Python 3.9.6, n = 2 runs)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Numbers (host, Python 3.9.6, n = 2 runs), scrolls sideways" style="--tw:1591px" markdown="1">

| Measure | jedi | pyflakes | black (pure) | ruff (host binary, reference only) |
|---|---|---|---|---|
| Import | 220 / 199 ms | 137 / 121 ms | 305 / 327 ms | n/a |
| First op, empty disk cache (first launch) | `os.path.` 531 / 509 ms; `asyncio.` 717 / 721 ms | 6.8 / 7.8 ms | 272 / 305 ms | check 27 / 16 ms, format 16 / 15 ms (process start included) |
| First op, disk cache kept (relaunch) | 150 / 147 ms | (no disk cache) | (same as first) | n/a |
| Warm op, 513-line file | 19 / 19 ms median (range 10-60; str chain slowest) | 6.6 / 9.1 ms (median of 20) | 284 / 306 ms (median of 5) | n/a |
| Go to definition (`struct.pack`) | 10 / 12 ms (lands in compiled `_struct`, no line) | n/a | n/a | n/a |
| Stdlib corpus | n/a | 652 files in 3.97 / 4.44 s = 74,797 / 66,905 lines/s; slowest file 89 ms (`_pydecimal.py`) | big4: 7.26 / 5.87 s = 1,209 / 1,496 lines/s | check F, 652 files: 81 / 74 ms |
| tracemalloc peak | 43 MB | 9.7 MB (file), 29 MB (corpus) | 25 MB (file), 41 MB (big4) | n/a |
| Peak RSS growth over bare interpreter | +53 / +55 MB | +11 MB (file), +33 MB (corpus) | +31 MB (file), +49 MB (big4) | n/a |
| Spawn attempts in-process | 0 with `InterpreterEnvironment`; default environment: `subprocess.Popen`, fails | 0 | 0 | is a process |
| Wheel size | jedi 1.57 MB + parso 0.11 MB | 0.06 MB | 0.20 MB + deps 0.39 MB | 9.4 MB wheel, 22.2 MB executable |
| Installed size | jedi 9.2 MB (6.4 MB is bundled typeshed) + parso 0.38 MB | 0.33 MB | black 0.51 MB + blib2to3 0.16 MB + click 0.37 MB + small deps | 22.2 MB |

</div>


Reading the table:

1. jedi: the first completion after launch costs about half a second on the host and 0.7 s for a big package; with parso's disk cache kept between launches it drops to about 150 ms. After that a keystroke completion costs about 19 ms (n = 2 runs x 6 probes x 5). The iPhone will be slower by a factor I have not measured.
2. pyflakes: under 10 ms on a 500-line file, 67-75 thousand lines a second. Cheap enough to run on every pause.
3. black, pure Python: about 0.3 s for a 500-line file, about 1,200-1,500 lines a second. Acceptable behind a button; too slow to run while typing. The compiled macOS wheel is faster, but compiled wheels do not exist for iOS.
4. ruff is about 100x faster than pyflakes on the corpus (81 ms vs 4 s, process start included), but it is an executable.

## Licences

- jedi: MIT. It bundles typeshed stubs (Apache-2.0, some parts MIT): the Apache notice ships with the app.
- parso: MIT; `parso/pgen2/*` is PSF-licensed (modifications dual MIT/PSF).
- pyflakes: MIT.
- black: MIT; its `blib2to3` (fork of lib2to3) is PSF-licensed. Runtime deps on 3.15: click (BSD-3-Clause), mypy_extensions (MIT), packaging (Apache-2.0 OR BSD-2-Clause), pathspec (MPL-2.0, file-level copyleft: ship unmodified, offer its source), platformdirs (MIT), pytokens (MIT). tomli and typing_extensions are needed only below 3.11.
- ruff: MIT.
- All permit commercial closed-source distribution with notices. The acknowledgements screen must list them (L13 policy).

## Embedded interpreter, no subprocess, no JIT

1. jedi's **default** environment starts a helper Python with `subprocess.Popen` to inspect compiled modules. Blocked, it fails (measured, and pinned by `test_default_environment_tries_to_spawn`). `jedi.InterpreterEnvironment()` inspects the running interpreter instead: 0 spawn attempts. Side effect: jedi imports and inspects real module objects in the app's own interpreter. Run it on a worker thread (or a sub-interpreter once Idris's runtime allows one), never the thread running the user's script.
2. pyflakes and black are plain Python: 0 spawn attempts, no native code (checked: no `.so` in either package when installed from pure wheels).
3. None of the three needs a JIT.
4. Disk: jedi writes parso caches to `jedi.settings.cache_directory`; black's blib2to3 writes grammar pickles through platformdirs. Point both at the app's Caches directory.

## Ruff on iOS

Ruff ships as a native executable; iOS gives an app no way to start one, and an app cannot launch downloaded executables at all. The only routes are:
- build ruff's Rust crates as a static library for `aarch64-apple-ios` and call them through a C shim. Ruff publishes no library API; its internal crates change between releases, so we would own a fork;
- run ruff's WebAssembly build (the one its online playground uses) inside a web view.

I measured neither, so neither is a v1 plan. Revisit after v1 only if black is too slow on a device.

## Risks and gaps

1. **Python 3.15 is untested.** parso 0.8.7 has grammars up to 3.14 and silently clamps 3.15 to the 3.14 grammar (no error, no warning; pinned by test). New 3.15 syntax will show as parse errors in completion contexts until parso ships a 3.15 grammar. jedi's `_SUPPORTED_PYTHONS` stops at 3.13; that list only matters for finding system environments, which we do not use. pyflakes 3.4.0 handles 3.14 template strings and falls back to a generic handler for unknown nodes. Rerun this harness on the app's 3.15 runtime first.
2. **jedi's bundled typeshed uses the old layout** (`stdlib/2`, `2and3`, `3`, `3.7`). Modules added after that snapshot get no stubs, so jedi falls back to reading the stdlib's `.py` source. If the app ships the stdlib as `.pyc` only, completion for those modules drops to live-object inspection (no signatures for pure-Python code). Ship `.py` sources, or a newer typeshed, and decide this with Idris's L13 packaging.
3. Go to definition into C modules returns no line (`_struct`). The editor should show "defined in compiled module" rather than jump.
4. Device numbers are missing. Memory: jedi + pyflakes + black together add roughly 90-110 MB RSS on the host (rows summed; not measured together). Measure on the oldest supported iPhone before committing to all three loaded at once.
5. Sample is 2 runs on a shared machine; run-to-run spread is up to 20% on black's corpus and 38% on pyflakes' warm median.

## Interface the editor needs (for ADR-004)

Reference implementation and tests: `pywidget/tests/tooling/bridge.py`, `test_tooling.py` (13 tests). Positions on the bridge are editor positions: **line 1-based, column 0-based in UTF-16 code units** (what TextKit and NSString count). The tools count differently, so the Python side converts:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Interface the editor needs (for ADR-004), scrolls sideways" style="--tw:631px" markdown="1">

| Tool | Line | Column unit |
|---|---|---|
| jedi | 1-based | 0-based code points |
| pyflakes | 1-based | 0-based UTF-8 bytes (`ast` col_offset); syntax errors: 1-based code points |
| black | whole text in, whole text out | parse errors as "line:col" in the message |

</div>


Calls (JSON-shaped dicts):

```
complete({text, line, col, path?})
  -> {items: [{label, kind, detail, insert, replace: {line, col, end_col}}], elapsed_ms}
diagnostics({text, path?})
  -> {items: [{line, col, end_line, end_col, severity, code, message, source}], elapsed_ms}
format({text, line_length?})
  -> {text, changed} | {error: {line, col, message}}
```

Editor-side rules that follow from the numbers:
1. Completion is asynchronous and cancellable: the editor sends a document version with each request and drops stale replies. Ask for completion after a trigger character (`.`) or a 2-character identifier prefix, not on every keystroke.
2. `detail` (type, signature) is fetched on focus: computing it for every item costs inference per item.
3. Warm jedi at app launch (one throwaway completion on `os.`) so the first real completion is not the 0.5 s one.
4. Diagnostics run 300 ms after the last keystroke over the whole file; a syntax error replaces the other diagnostics for that pass (pyflakes stops at the first syntax error).
5. Format replaces the whole buffer as one undo step.
{% endraw %}

</div>
