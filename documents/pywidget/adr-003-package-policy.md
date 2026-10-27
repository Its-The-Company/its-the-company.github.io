---
layout: "default"
title: "ADR-003: Package policy. What Python packages ship in v1, how native wheels are built, and the Day 10 go/no-go"
section: "documents"
description: "It is the one place that lists what Python code ships inside the app beyond CPython and the cut stdlib, with a licence and a size for each name, and the rule that decides whether a native package is in v1. It does not\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-003-package-policy.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/decisions/ADR-003-package-policy.md</code></span></div><h1>ADR-003: Package policy. What Python packages ship in v1, how native wheels are built, and the Day 10 go/no-go</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **framed by the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>, author's sections pending** (Ines, 2026-10-26 20:03 ET, T-0218). Sections 0-1 and the chair line are the ruling on what this ADR covers and the pass rule for native packages. Sections 2-4 are Pernille's (T-0242, due 2026-10-28 23:59 ET), then Odalys's independent review (T-0244), then a chair line that accepts them. Plan row 6 (ops/plans/pywidget/plan.md) put this ADR on Day 6 (2026-10-27) with no author named; it is written a day late because no one owned it, and that is the chair's miss, not the runtime engineer's.
- Reviewed 2026-10-26 20:28 ET (Odalys, T-0244): [`../reviews/ADR-003-review-odalys.md`](adr-003-review-odalys.html). 2 blockers (B1: #77's "nothing run from inside an extracted archive" rules out sdist builds, and the build toolchain is outside the manifest, T-0280; B2: no line owns the app-side package stage s1 item 3 needs, T-0281), 5 should-fix, 7 low. Pure-set pins, PyPI hashes, RECORDs and sizes.tsv reproduced, n = 8.
- Numbering: reserved for packages by plan row 6, ADR-001 3.1 C1 and ADR-006 line 5 ("ADR-003 must agree with section 3 below"). It does.
- Inputs: ADR-001 3.1 C1 and its Revised row (native packages only if "prebuilt iOS wheels working by Day 10"; CPython 3.15.1, wheels cp315 or abi3 built here with cibuildwheel; iOS 18.0 floor); L13-packages.md s1-s8 (Odalys); the stdlib cut, [`../research/stdlib-manifest.md`](stdlib-manifest.html) chair ruling (c045aa9d, 2026-10-25 21:09); ADR-006 s3 (bundled set only in v1.0), s9.5 (build-time downloads), s11 (Install from file), s12 (online pip); ADR-007 s4 (option (b): the extension links no Python, so it gets no packages).

## 0. What this ADR is, and what it is not

It is the one place that lists what Python code ships inside the app beyond CPython and the cut stdlib, with a licence and a size for each name, and the rule that decides whether a native package is in v1. It does **not** re-decide anything ruled elsewhere; it cites those rulings:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What this ADR is, and what it is not, scrolls sideways" style="--tw:830px" markdown="1">

| Question | Ruled in | Ruling |
| --- | --- | --- |
| Standard library contents | stdlib-manifest.md chair ruling, c045aa9d | 29 strips; `profiling.sampling` stripped, not `profiling`; `import_breaks` pinned; `_zstd`, `_ssl`, `_hashlib`, `multiprocessing`, `unittest`, `doctest` ship |
| Where packages run | ADR-007 s4 | app process only; the widget extension links neither Python.framework nor the stdlib, so no package reaches it |
| Any install in v1.0 | ADR-006 s3 item 1 | the bundled set only; no online install of any kind in the release build |
| Install from file | ADR-006 s3 item 2, s11 | v1 stretch under row 37's eight conditions, condition (b) met, (a) open until Day 13 (2026-11-03); misses Day 13 -> 1.1 with no further ruling |
| Online pip | ADR-006 s10, s12, s12.6 | not v1, not a v1 stretch; first 1.1 candidate after the bundled set, under s9.4's conditions |
| Build-time downloads | ADR-006 s9.5 | pinned sdists and wheels by predictable `files.pythonhosted.org` URL and sha256 through `tools/terms_guard.py`; never `pip download` against `/simple/` |
| Licences allowed | L13 s3 (c); Commandments 4-5 | MIT, BSD, Apache-2.0, PSF, HPND, ISC; no GPL or LGPL; every shipped package gets a log/assets.md row and a line on the Acknowledgements screen (T-0042) |

</div>


## 1. The native-package rule (chair, binding)

ADR-001 3.1 C1 says native packages ship in v1 "only if ADR-003 shows prebuilt iOS wheels working by Day 10; otherwise 1.1", and its Revised row says the wheels are built here, in the order numpy, Pillow, matplotlib (Agg). "Working" was never defined. It is now:

A native package is **working** when, by **2026-10-31 23:59 ET (Day 10)**, all of these are true and written in section 4's row for it:
1. A cp315 wheel for `arm64_iphoneos` and `arm64_iphonesimulator` is built by `tools/pywidget_wheels.py` (L13 s7) from a pinned sdist URL and sha256, with `IPHONEOS_DEPLOYMENT_TARGET` 18.0, with no patch that is not upstream-first and recorded in `pywidget/packages/recipes/<name>/`.
2. Its `METADATA` licence is on the allowlist, the licence text is in the recipe folder, and a log/assets.md row exists.
3. Its import smoke test runs **inside the Simulator app build** through `tools/xc.sh` (not only on the host, not only in cibuildwheel's testbed): for numpy `import numpy; numpy.arange(3).sum() == 3`; for Pillow open and resize a 2x2 PNG made in the test; for matplotlib draw one line to an Agg PNG and read its size back.
4. Its compressed device-slice size is recorded in `pywidget/packages/sizes.tsv`, and the app's total size delta with it is under the number section 2 sets for the whole native set (L13's estimate is 15 MB, unmeasured; the chair accepts up to 25 MB compressed for the three together, since a 22 MB Frameworks folder was already accepted in the stdlib ruling, item 4).

Each package passes or fails **alone**, in the order numpy, Pillow, matplotlib. A package without a passing row by Day 10 is 1.1 with no further ruling; a package that passes on Day 10 and then fails on a device before submission is removed from the build, not patched past the freeze. The widget extension never carries any of them (ADR-007). The membership (Apple, due Day 7) is not a dependency: every step above runs on the Simulator.

Why Day 10 and not later: the feature freeze is Day 13, the alpha is Day 10, and a native wheel that does not import is a crash in the one review <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> depends on. The IDE's "needs native code" message (L13 s6) covers a missing package honestly; a half-working one does not.

## 2. Pure-Python bundled set for v1 (Pernille, T-0242)

Author's text, Pernille, 2026-10-26 20:30 ET. Proposed, not ruled: the chair rules after Odalys's review (T-0244). **Measured:** the eight wheels below were fetched at 20:09 ET through `tools/terms_guard.fetch`, each by its predictable `files.pythonhosted.org` URL (ADR-006 s9.5; every request was redirected to the hashed path on the same host). Each was hashed, unpacked with path checks and measured by `tools/pkg_measure.py` (new, s3.9). Pins, URLs and sha256 are in `pywidget/packages/manifest.toml`; sizes are in `pywidget/packages/sizes.tsv`. **Not measured:** a device build, App Store thinning, bytecode (s2.3), and any import of these packages. A host import test was refused by the session's permission classifier ("Code from External", about 20:14 ET), and I did not work around it. That is <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> #77; s2.5 lists what was checked without running anything.

### 2.1 The list

Sizes are in bytes. "Shipped" counts every file the wheel installs, bytecode excluded, `.dist-info` included. "On disk" counts 4 KiB blocks, as `du` does. "Deflate" is the sum of raw-deflate level 9 per file, an estimate of the bytes the item adds to a compressed `.ipa`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.1 The list, scrolls sideways" style="--tw:1687px" markdown="1">

| Package | Pin | Licence (`METADATA`) | Wheel | Files | Shipped | On disk | Deflate | Why it ships |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| requests | 2.32.5 | Apache-2.0 | 64,738 | 23 | 204,286 | 266,240 | 61,771 | ADR-001 3.1 C1 (http in C2, matrix row 16) |
| urllib3 | 2.6.3 | MIT | 131,584 | 42 | 433,459 | 524,288 | 125,460 | requests dependency |
| idna | 3.20 | BSD-3-Clause | 69,583 | 16 | 342,091 | 380,928 | 66,826 | requests dependency |
| certifi | 2026.10.23 | **MPL-2.0** (s2.4 item 1) | 135,082 | 12 | 244,625 | 274,432 | 133,367 | requests dependency (`requests/certs.py:14 from certifi import where`); the CA file for https (s2.4 item 2) |
| charset-normalizer | 3.5.2, `py3-none-any` only | MIT | 68,872 | 19 | 241,344 | 286,720 | 65,267 | requests dependency (`requests/compat.py` tries chardet, then charset_normalizer) |
| jedi | 0.19.2 | MIT (bundles typeshed, Apache-2.0, and django-stubs, MIT) | 1,572,278 | 1,880 | 4,540,436 | 9,723,904 | 1,195,234 | ADR-001 3.1 C5 completion; `InterpreterEnvironment` only (ide-tooling.md) |
| parso | 0.8.7 | MIT (`pgen2` PSF) | 107,025 | 37 | 355,069 | 421,888 | 101,948 | jedi dependency |
| pyflakes | 3.4.0 | MIT | 63,551 | 27 | 291,931 | 364,544 | 59,391 | ADR-001 3.1 C5 inline errors |
| **Total, 8 distributions** | | | **2,212,713** | **2,056** | **6,653,241** (6.35 MiB) | **12,242,944** (11.68 MiB) | **1,809,264** (1.73 MiB) | |
| pypa `installer` | 0.7.0, vendored | MIT | (in-tree) | 15 | 53,600 | 90,112 | not measured | Install from file (T-0049). Already counted in the stdlib manifest's `installer_payload`. It ships inside `_pywidget_install`, not as a top-level distribution, so a user can still install their own `installer`. It leaves with Install from file if that misses Day 13 (ADR-006 s11) |

</div>


Where the bytes go: jedi and parso are 74% of the shipped bytes and 83% of the on-disk bytes. Two folders in jedi account for most of that. `jedi/third_party/typeshed` is 1,312 files, 2,919,393 B, 6,561,792 B on disk. `jedi/third_party/django-stubs` is 478 files, 583,233 B, 1,933,312 B on disk. Disk use is nearly twice the byte count because 2,056 small files each round up to a 4 KiB block. I am **not** proposing to strip django-stubs. A Django wheel is pure Python and Install from file accepts it, so the stubs have a use. Changing jedi's tree would also be a local patch in a pure package, which the pipeline would have to carry on every bump.

**Recommendation:** these eight, at these pins, plus the vendored installer under ADR-006 s11's condition. Every one is a requirement already ruled (ADR-001 3.1 C1 and C5) or a hard dependency of one.

### 2.2 Every other L13 s3 name, in or out

A name bundled in v1 is also a name the user cannot replace. The installer refuses a picked distribution that is bundled (`_pywidget_install/resolver.py` line 5, `store.py` `installed_bundled`), so every name added here takes away an upgrade the user could otherwise make through Install from file. That is the second reason, after size, to keep this list short.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.2 Every other L13 s3 name, in or out, scrolls sideways" style="--tw:935px" markdown="1">

| L13 name | Verdict | One reason |
| --- | --- | --- |
| python-dateutil (and six, its dependency) | With matplotlib only | Required by matplotlib; nothing else in v1 imports it. Leaves if matplotlib fails s1 |
| packaging | With matplotlib only | Required by matplotlib. Our installer does not need it (its own `canonical`, vendored installer 0.7.0 has no dependencies) |
| pyparsing | With matplotlib only | matplotlib dependency (mathtext) |
| cycler | With matplotlib only | matplotlib dependency |
| fonttools | With matplotlib only, `py3-none-any` wheel | matplotlib dependency. The largest of the pure dependencies [unmeasured]; s4 measures it with matplotlib |
| PyYAML | Out of v1 | No v1 feature or ruled requirement uses it. [recall, unverified] PyYAML publishes no `py3-none-any` wheel, so a user cannot bring it through Install from file, which makes it the first 1.1 candidate if users ask (a pure build without libyaml) |
| tabulate or rich | Out, both | rich needs Pygments (2.21.0 on this host: 4,672,966 B in 350 files) and markdown-it-py, and it writes ANSI escapes for a terminal. Our console is TextKit (contract S6), so rich would show raw escape codes. tabulate is small but no v1 feature needs it, and the user can bring its pure wheel |
| Black | Out (ADR-001 3.2: 1.1) | A 1.1 formatter. It needs pathspec (MPL-2.0) and adds about +31 MB RSS on the host (ide-tooling.md) |
| pypa `installer` | In, vendored privately | See 2.1 |

</div>


### 2.3 Bytecode: how the pure set loads (options)

The bundle is read-only and nothing in the bootstrap sets `pycache_prefix` today. My grep of `App/`, `ios/scripts` and `runtime/` found none. So every `.py` we bundle, ours included, is compiled again on every launch that imports it. The pure set has 207 importable `.py` files (2,479,455 B). jedi's 1,790 files under `third_party` (stubs and their licences) are read by parso on demand by parso on demand and never imported.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2.3 Bytecode: how the pure set loads (options), scrolls sideways" style="--tw:1280px" markdown="1">

| Option | Bundle cost | Launch cost | Viewable source (jedi go-to-definition, matrix rows 3 and 8) |
| --- | --- | --- | --- |
| (a) `.py` only, as today | 0 | compile on every import, every launch [unmeasured on device] | yes |
| (b) `.py` plus `PyConfig.pycache_prefix` in `Library/Caches/pycache` | 0 | compile once per install or update; again if iOS purges Caches | yes |
| (c) `.py` plus build-time `.pyc` in the bundle | about the importable source again [estimate: +2.5 MB, from the 2,479,455 B of `.py`; unmeasured] | none | yes |
| (d) sourceless `.pyc`, as the stdlib zip does | below (a) | none | **no**: jedi loses go-to-definition into requests, and the "every file opens in the editor" posture is gone |

</div>


**Recommendation: (b).** It costs nothing in the bundle and keeps the source. If the first device run shows a cold first launch over budget, move to (c). The `pycache_prefix` line is bootstrap code (C1, mine). It is not this ADR's to rule, and it applies equally to `pywidget_ui` and `_pywidget_runtime`.

### 2.4 Licence findings

1. **certifi is MPL-2.0, which the s0 allowlist does not name.** requests cannot import without it (`requests/certs.py:14`). Mozilla's root list is MPL-2.0 whichever package carries it, so swapping packages does not escape it. Options:
   - (i) An allowlist exception for MPL-2.0 files shipped unmodified and as source (`cacert.pem` and `.py`, never sourceless `.pyc`), with a notice on the Acknowledgements screen. That meets Commandment 5 (commercial use, attribution, a log row). MPL's file-level copyleft is met by shipping the source, which is what the bundle <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.
   - (ii) Drop certifi, which drops requests and changes ADR-001 3.1 C1. That needs its own ruling.
   - (iii) Use Apple's trust store through the bridge (`SecTrust`) instead of a CA file. There is no MPL text, and user-installed roots would work, but it is new Swift plus an `ssl` hook that CPython does not provide. It is 1.1 at best.

   **Recommendation: (i).**
2. **The stdlib's own https may have no CA file on device.** The vendored `_ssl.cpython-315-iphoneos.so` has OpenSSL 3.5.9 with `OPENSSLDIR` `/etc/ssl` (read from its strings: `/etc/ssl/cert.pem`, `/etc/ssl/certs`). requests passes certifi's file explicitly. `urllib.request`, which `examples/http_status.py` uses, does not; it relies on OpenSSL's default paths. Whether `/etc/ssl/cert.pem` exists on an iPhone is **unknown** to me. The Simulator may read the Mac's copy, so a Simulator pass does not settle it. Proposed C1 fix, not this ADR's: the bootstrap sets `SSL_CERT_FILE` to the bundled `certifi/cacert.pem` when it is unset. Test it on the first device build with `ssl.get_default_verify_paths()` and one https `urlopen`. This makes certifi load-bearing even without requests, which is one more reason for (i).
3. **charset-normalizer must be the pure wheel.** The copy on this host (the sigstore venv) is the mypyc build with `cd.cpython-39-darwin.so` and `md.cpython-39-darwin.so`. The manifest pins `charset_normalizer-3.5.2-py3-none-any.whl`. The gate refuses any native file in a `pure`-tier package; `pkg_measure`'s `native` column found 0 in all eight.
4. **Notices to carry** (T-0042 Acknowledgements): the 12 licence files `pkg_measure` lists (`sizes.tsv`, `licence_files` column). That includes jedi's typeshed (Apache-2.0) and django-stubs (MIT, Maxim Kurnikov) and parso's PSF part. requests is Apache-2.0 and its wheel has no NOTICE file. The log/assets.md row for each package is written when the stage step first bundles it (s3.6), not before: until then nothing ships.

### 2.5 Checked without running the packages

- **The stripped stdlib** (`stdlib-manifest.json` `stripped`, 30 names). `pkg_measure --stripped` parses every `.py` in the eight packages and lists each import of a stripped name, nested imports included. One hit: `jedi/api/keywords.py:8 imports pydoc_data`, inside `try/except ImportError`. Effect: completion shows empty docs for keywords (`for`, `with`). Nothing breaks. `pydoc_data` is stripped by the spike rule (641,559 B of pyc, the same data `help('for')` uses in the console). Bringing it back is a stdlib-manifest question for the chair, not a package question. No import of `ctypes`, `_ctypes`, `curses`, `venv` or `_remote_debugging` anywhere in the set, which answers L12 Q2 for the pure set.
- **Native files:** none in the eight wheels.
- **Not checked:** that each package imports and works on 3.15.1. Odalys's ide-tooling harness ran jedi, parso and pyflakes on host 3.9.6. parso clamps 3.15 to its 3.14 grammar silently (ide-tooling risk 1). The import test waits on #77.
- **Related, not in this ADR:** jedi falls back to stdlib `.py` sources for signatures, and the stdlib ships as sourceless `.pyc` (ide-tooling risk 2). Shipping those sources would spend the same size budget as 2.6; I have not measured it.

### 2.6 Size budget (the number s1 item 4 asks for)

What's the budget? These are the numbers I will defend. Every row is a ceiling. A part over its ceiling needs a written reason in this table before it ships.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 2.6 Size budget (the number s1 item 4 asks for), scrolls sideways" style="--tw:960px" markdown="1">

| Part | Measured now | Ceiling |
| --- | --- | --- |
| `Frameworks/`, device arm64, on disk (Python.framework plus one framework per stdlib `.so`) | 23,404,544 B (22.32 MiB), stdlib manifest v2 | the stdlib ruling's figure, plus or minus 5% |
| `python/` stdlib zip, on disk | 11,329,536 B (10.80 MiB) | the same |
| Pure set (2.1) | 12,242,944 B on disk; 1,809,264 B deflate | **16 MiB on disk; 2.5 MB deflate** |
| **Native set (s1 item 4), device-slice wheels, compressed** | not built | **20 MB for the three together** (the chair's ceiling is 25). Alarm lines per package: numpy 7 MB, Pillow 3 MB, matplotlib with contourpy, kiwisolver and its pure dependencies 10 MB. A package over its line with the set still under 20 gets a note in s4. The package that takes the set over 20 fails item 4. In s1's order that is the last one added |
| Whole `.ipa`, device, compressed | not measured (no device archive yet) | **60 MB** |

</div>


Why 20 and not the chair's 25: the reference wheels (L13 s2) sum to about 7 MB without matplotlib, and the matplotlib desktop wheel is about 8 MB [L13, unmeasured]. Twenty leaves room for our own build to come out larger than BeeWare's without letting it double. Why 60 for the whole app: a Python IDE with numpy is not a 10 MB app, and nobody expects that. But the Python runtime is already 33 MiB on disk before a single package. 60 MB is where I would stop and ask what each extra megabyte buys. Memory is not in this table. ADR-007 s6 owns it, and s4 records each package's import RSS so that ADR has the numbers.

## 3. Build pipeline as built (Pernille, T-0242)

**As built on 2026-10-26, most of the pipeline does not exist yet.** On disk:

- `pywidget/packages/manifest.toml`, format 1. It holds 13 entries: the 8 pure pins (name, version, tier, file, URL, sha256, bytes, licence, fetched, why, status `proposed`) and 5 native placeholders (`pending T-0243`, no version until the sdist is fetched).
- `pywidget/packages/sizes.tsv`, the `pkg_measure` output for the pure set.
- `tools/pkg_measure.py` with `tests/pkg_measure_test.py`: 19 passed, 0 failed on host 3.9.6 and 3.13.18. Three seeded mutants on temp copies (bytecode counted, Mach-O magic missed, extras kept) each fail it.

**Not built:** `tools/pywidget_wheels.py`, `pywidget/packages/recipes/`, any cibuildwheel run, the stage step, and the Xcode build phase for packages. L13 s7 is the design. What follows is that design corrected by what this draft found, with options where there is a real choice. T-0243 builds it and rewrites this section as built.

### 3.1 Fetch (run once by hand for this draft)

Wheels come from `https://files.pythonhosted.org/packages/{python tag}/{first letter}/{project}/{file}` and sdists from `.../packages/source/{first letter}/{project}/{file}` (PyPI's predictable URLs, ADR-006 s9.5). Both go through `terms_guard.fetch`. All eight wheel URLs answered with a redirect to the hashed path on the same host. The sdist form has not been fetched yet. The cache lives outside the repo (`~/.cache/pywidget/`, as `fetch_python.sh` does). The sha256 is pinned in `manifest.toml` on first download; a changed hash fails the build. Downloaded files are untrusted data. Unpacking refuses absolute paths and `..` members, and nothing is executed from inside an unpacked archive.

### 3.2 The first thing that breaks is the fetch rule, not the linker

cibuildwheel's default flow makes requests that ADR-006 s9.5 forbids or that `terms_guard` has never seen:

1. Installing cibuildwheel itself, and its dependencies, from the PyPI index.
2. PEP 517 build isolation: pip installs each sdist's build requirements (meson-python, Cython, pybind11, ...) from `/simple/`.
3. Getting CPython's iOS support package for the build [unverified how 4.3.4 does it: python.org, GitHub, or a local path].
4. The testbed's `test-requires` (pytest) from the PyPI index.
5. Build systems that download C sources mid-build: matplotlib's meson wraps (freetype, qhull) and Pillow's dependency script (libjpeg-turbo, libpng, freetype and others) [recall; varies by version, read from the pinned sdist in T-0243].

Items 1, 2 and 4 are `/simple/` requests by our code, which is barred. Items 3 and 5 go to hosts whose robots and terms `terms_guard` has to read first. **Rule for the pipeline:** every build and test step runs with `PIP_NO_INDEX=1`, `PIP_FIND_LINKS` pointing at a local folder of pinned wheels (cibuildwheel, its dependencies and every build requirement, each a manifest entry with a sha256), `HTTP_PROXY` and `HTTPS_PROXY` set to `http://127.0.0.1:9` (nothing listens there), and meson's `--wrap-mode=nodownload` with wrap sources pre-fetched into its package cache. A hidden download then fails the build loudly instead of fetching quietly. Odalys can rerun it and get the same failure.

### 3.3 Builder (options)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3.3 Builder (options), scrolls sideways" data-n="1" style="--tw:1026px" markdown="1">

| Option | What it is | For | Against |
| --- | --- | --- | --- |
| P1 | cibuildwheel 4.3.4 (BSD-2), wrapped offline as in 3.2 | The documented path (L13 fact 8): PEP 730 tags, both iOS slices, the testbed | Its own dependency set to pin. Item 3 may not accept our sigstore-verified 3.15.1 (`verify_python_sigstore.sh`) |
| P2 | Our own thin cross-build: `pip wheel --no-build-isolation --no-index` with the compiler wrappers the vendored XCframework already carries (`ios-arm64/bin/arm64-apple-ios-clang`, `...-simulator-clang`, `-ar`, `-strip`) and a meson cross file | No hidden download. Uses the exact runtime we ship. `Vendor/python/testbed` is already on disk | We own the cross environment (host-platform sysconfig, tags), which is the job cibuildwheel exists to do. More days |
| P3 | Prebuilt upstream wheels (BeeWare's anaconda index, any PyPI iOS wheel) | Fastest | Barred by s1 item 1 (built here from a pinned sdist). anaconda's S3 download host has unread terms (L13 s0). Cross-check only |

</div>


**Recommendation: P1 on the first half-day of T-0243, with the network blocked from the first command.** If item 3 cannot be pointed at our own framework, switch to P2 rather than open a new host. I expect P1 to stumble on item 3, and I would rather find that out in an hour than in a week.

Tools. Commandment 7 allows only free tools with no sign-up; the 2026-10-25 22:44 amendment lets us install them without asking and report afterwards. Checked with `command -v` at about 20:12 ET: absent are cibuildwheel, pipx, meson, ninja, cmake, pkg-config, rustc and gfortran; present are xcodebuild and Homebrew python3.13. Needed: ninja, cmake, pkg-config and meson (Homebrew, free). Not needed: gfortran (no scipy, no Fortran BLAS) and rustc (no Rust package in v1). The pipeline runs on Homebrew 3.13 [recall: cibuildwheel 3+ needs Python 3.11 or later to run], which also gives `tomllib` for the manifest. The host's default `python3` (3.9.6) has no `tomllib`.

### 3.4 Build settings

cp315 only. Archs `arm64_iphoneos` and `arm64_iphonesimulator`; no x86_64 simulator, since the Mac mini is arm64 and the App Store build never carries a simulator slice. `IPHONEOS_DEPLOYMENT_TARGET=18.0`. numpy's linear algebra, options:

- (a) Apple's Accelerate framework: a system framework, so no licence text and no Fortran, and fast.
- (b) No BLAS (lapack-lite): the smallest build, but slow linear algebra.
- (c) OpenBLAS: needs a Fortran toolchain. Out.

**Recommendation: (a), falling back to (b)** if Accelerate will not link under the cross-build [numpy meson options `-Dblas=accelerate` and `-Dallow-noblas=true`; recall, read from the pinned sdist].

### 3.5 Licence gate

s1 item 2 reads `METADATA` against the allowlist. **I propose the gate also covers every C library linked into the wheel**, because that is where the copyleft hides. Each one gets a row in `recipes/<name>/LICENSES.tsv` with library, version, licence and source URL. The gate refuses GPL or LGPL in any of them. Known cases [recall, confirm from the pinned sdists]:

- **numpy:** its `LICENSES_bundled.txt` (lapack-lite, pocketfft, highway). OpenBLAS and libgfortran are absent under option (a) or (b).
- **Pillow:** libjpeg-turbo, libpng, zlib, freetype taken under the FreeType Licence (not GPLv2), libwebp, libtiff, lcms2, openjpeg. **FriBiDi is LGPL-2.1 and must not be linked.** Pillow normally loads it at runtime with dlopen, which cannot work on iOS anyway.
- **matplotlib:** freetype and qhull. Qhull's licence is permissive and requires attribution.

The same step checks each `.so` for a needed `.xcprivacy` (L13 fact 5) and adds the log/assets.md row.

### 3.6 Stage

Native wheels:

`pip install --target <build>/app_packages --no-index --no-deps --only-binary=:all: --platform ios_18_0_arm64_iphoneos -f dist/`

That is L13 step 5. Pure wheels go in the same way, from the manifest files. Three requirements came out of reading our own code:

1. **Keep every `.dist-info`.** The installer resolves a user's dependencies against them (`store.installed_bundled`). Without them, a user wheel that needs `requests` is told `requests` is missing when it is bundled.
2. **`app_packages` must sit under the runner's `bundle_root`.** `runner._keep_module` keeps a module across runs only when its file is under the bundle or the stdlib. If `app_packages` sits outside it, numpy is dropped from `sys.modules` after every run and re-imported, which numpy does not support. That means warnings at best, and crashes at worst.
3. **On `sys.path` before the user's folder** (`paths.add_user_packages`, already the rule).

Bytecode follows s2.3. Idris's Xcode build phase then turns each `.so` into a framework (PEP 730 layout), signs every binary, and runs the strip check (matrix row 2) and the L12 denylist check (stdlib ruling follow-up). Because that build phase also applies the stdlib manifest's `stripped` list, s1 item 3's smoke test runs against the cut stdlib. If the build that runs the smoke does not apply the strip, a hidden `ctypes` import passes in the Simulator and makes the review note false.

### 3.7 Test

The test that counts is s1 item 3, inside the Simulator app through `tools/xc.sh`. I propose it adds:

- (a) a second run in the same process that imports the package again and must not reload it (this tests 3.6 item 2);
- (b) import RSS and import time, recorded and not gating, for ADR-007 s6 and the preview budget (`PREVIEW_BUDGET_SECONDS` 2.0);
- (c) for matplotlib, the byte size of a systemMedium-sized Agg PNG at scale 3 (s4.1).

Skip cibuildwheel's testbed step. It needs pytest from the PyPI index (3.2 item 4), and s1 does not count it.

A host import test of the pure set (`pywidget/tests/packages/`, a child `-I` interpreter with the stripped-name finder from `test_stdlib_manifest.py`) is ready to write once #77 allows running the packages.

### 3.8 Rebuild triggers

L13 step 7: a pin change, a new CPython patch release, or a new Xcode or iOS SDK. Add one: **a change to the stdlib manifest's `stripped` list**, since a strip can break a package import that worked before.

### 3.9 Commands run for this draft (for Odalys to rerun)

All times are ET, 2026-10-26.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 3.9 Commands run for this draft (for Odalys to rerun), scrolls sideways" style="--tw:960px" markdown="1">

| Time (fetches exact, from the fetch log; others about) | Command | Result |
| --- | --- | --- |
| 20:09:03 to 20:09:27 | One `terms_guard.fetch(url, who="T-0242 ADR-003 pure-set measure")` per wheel URL in `manifest.toml`, 3 s apart, into a fresh `mktemp -d` folder | 8 of 8 fetched, 2,212,713 B in total; redirected to the hashed paths on the same host |
| about 20:10 | Unzip each wheel with Python `zipfile`, refusing absolute and `..` members, into a second fresh folder | 8 extracted, no refused member |
| about 20:11 | `python3 tools/pkg_measure.py --stripped pywidget/runtime/stdlib-manifest.json --site <folder> requests urllib3 idna certifi charset-normalizer jedi parso pyflakes > pywidget/packages/sizes.tsv` | the 2.1 numbers; 1 strip hit (2.5); 0 native files |
| about 20:13 | `python3.13 -I -c "tomllib.load(...)"` over `manifest.toml`, comparing each pure entry's sha256 and size to the downloaded file | 13 entries; all 8 sha256 and sizes match |
| about 20:14 | A host import of the eight packages under the stripped-name finder | **refused by the permission classifier** ("Code from External"); not retried; #77 |
| 20:16 and again after the RECORD fix | `python3 tests/pkg_measure_test.py` on 3.9.6 and 3.13.18 | PASS 19, FAIL 0 on both |

</div>


## 4. Go/no-go record (Pernille, T-0243)

T-0243 fills this. The columns are s1's four conditions plus the import cost, which is recorded and does not gate. The reference column is what exists upstream today (L13 s2, BeeWare index, compressed device slice), so a result far from it is a question to answer. The verdict cell is written only with a date and the s1 conditions it meets.


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 4. Go/no-go record (Pernille, T-0243), scrolls sideways" data-n="4 5 6 7 9" style="--tw:1707px" markdown="1">

| Package | Depends on | Reference (L13 s2) | Pin: sdist and sha256 | Wheel built (date, commit) | Licence row (METADATA + linked C libraries, 3.5) | Simulator smoke (xc.sh line; second run no reload) | Size, device slice compressed (alarm line, 2.6) | Import RSS and time (recorded only) | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| numpy | nothing | 2.5.2.post1, cp315, tag ios_17_0, 5.57 MB | | | | | (7 MB) | | |
| Pillow | nothing | 11.0.0, cp313 only, 1.03 MB | | | | | (3 MB) | | |
| matplotlib (Agg) | **numpy and Pillow both passing**; contourpy, kiwisolver; pure fonttools, cycler, pyparsing, python-dateutil, six, packaging | none for 3.15 (3.6.0 cp312 newest) | | | | | (10 MB, whole stack) | | |
| contourpy (matplotlib's) | numpy | 1.3.3.post1, cp315, 0.28 MB | | | | | in matplotlib's line | | follows matplotlib |
| kiwisolver (matplotlib's) | nothing | 1.5.0.post1, cp314 newest, 0.06 MB | | | | | in matplotlib's line | | follows matplotlib |

</div>


The order matters more than s1's "each alone" suggests. matplotlib requires both numpy and Pillow at import, so a Pillow failure takes matplotlib with it, whatever matplotlib's own build does. Pillow does not need numpy.

### 4.1 What each outcome means for T-0243 and T-0245

- **numpy passes.** Arrays in the console and in widget scripts, which run in the app process (ADR-007 option b); the extension never carries numpy. For T-0245, nothing new: charts are drawn with DSL path ops, so the node-count <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> has to allow a sparkline drawn as one `Path` with N ops, not N nodes. That is worth a fixture in the render-cost measurement T-0245 waits on.
- **Pillow passes.** A user can downscale and quantize an image to fit `MAX_INLINE_BITMAP_BYTES` (64 KiB, DSL) or write it to the App Group. **Pillow fails:** Python has no way to shrink an image, so for any image over 64 KiB the file route is the only route. That puts more weight on the documentation for the file route than on the cap.
- **matplotlib passes.** The obvious widget is plot to PNG to `ui.Image.bitmap`. Whether a systemMedium chart at scale 3 fits in 64 KiB is **unmeasured**, and it decides whether the inline cap fits the most common use or whether charts always go through the App Group file. 3.7 (c) measures it for T-0245 and ADR-002. Two more facts for the C1 runtime (mine): pyplot keeps open figures and `rcParams` in module state, which `_keep_module` keeps across runs, so the runner must call `plt.close("all")` and reset `rcParams` between runs once matplotlib is loaded. And `MPLCONFIGDIR` must point into Caches, or the font cache is written somewhere unexpected on first import [unmeasured cost]. First import time competes with the 2.0 s preview budget.
- **All three fail.** v1 ships the pure set only. L13 s6's draft "needs native code" message names numpy, Pillow and matplotlib as bundled, so Maren's final text has to drop them. Matrix row 4 drops out of the review notes, as it already says. The size budget has 20 MB spare.

### 4.2 Questions for the chair (decided by Ines after Odalys's review; I am not ruling them)

1. certifi MPL-2.0: 2.4 item 1, option (i), (ii) or (iii). I recommend (i).
2. Bytecode: 2.3, option (b) or (c). I recommend (b).
3. Budget: 2.6's numbers (pure 16 MiB on disk / 2.5 MB deflate; native 20 MB with per-package alarm lines; whole app 60 MB).
4. Builder: 3.3, P1 then P2 behind the offline rule in 3.2.
5. Licence gate: extend s1 item 2 to linked C libraries (3.5).
6. Not this ADR's to rule, but surfaced by it: `pydoc_data` (2.5, a stdlib-manifest question), `SSL_CERT_FILE` (2.4 item 2, C1), `pycache_prefix` (2.3, C1).
7. For the Investors, already filed: #77. T-0243 cannot run a build until that is answered.

## Chair line (Ines), 2026-10-26 20:03 ET (T-0218)

Form: the chair frames; the author fills; an independent review follows; the chair accepts (C13, C30). Nothing here measures anything; every number in section 1 is a bound, not a result.

**Ruling: ADR-003 exists as framed above. Pernille writes sections 2-4 by 2026-10-28 23:59 ET (T-0242) and runs the numpy build first (T-0243); Odalys reviews (T-0244); the chair accepts on the review.** The cross-reference table in section 0 is the ruling on scope: nothing in this ADR may contradict ADR-006 s3 or ADR-007 s4, and if a later section does, those ADRs win and this one gets a correction line.

What would make this fail: cibuildwheel's iOS path needing a tool we cannot install without spending or signing up (Commandment 7), which would make numpy 1.1 on Day 10 by the rule above and leave the IDE honest through L13 s6; and a pure-Python list that quietly grows past what the IDE needs, which section 2's one-reason-per-name rule is for.

Ines, CEO
{% endraw %}

</div>
