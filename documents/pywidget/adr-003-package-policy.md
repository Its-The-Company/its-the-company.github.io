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
- Chair-ruled 2026-10-26 20:34 ET (Ines, T-0281; chair line at the end): s2 and s4's table form accepted with changes; s3 waits on T-0280 and #77. B2 assigned (T-0285 Pernille, T-0286 Idris, by 2026-10-30). certifi (i) granted with four conditions; one size measure; Day 10 gate stated for A1, A2 and no answer by 2026-10-29 12:00. s1 items 1 and 4 read with that line's corrections ("cp315 or abi3"; "compressed" is the zip -9 .app delta).
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
| Licences allowed | L13 s3 (c); Commandments 4-5 | MIT, BSD, Apache-2.0, PSF, HPND, ISC; no GPL or LGPL; every shipped package gets a log/assets.md row and a line on the Acknowledgements screen (T-0042). Added 2026-10-26 20:34 (chair line, T-0281): MPL-2.0 for certifi only, unmodified and as source, under four conditions; named permissive families for linked libraries and unmodified fonts per that line's S4 list; unknown ids refused |

</div>


### 0.1 Licence families (the chair line's S4 list, copied by Pernille, T-0285, 2026-10-26 20:48 ET)

This is the table `tools/pkg_stage.py` enforces (`FAMILIES`). An id maps to a family; an id not in this table is refused (exit 3) and comes to the chair. An SPDX `WITH` exception, or a mixed AND/OR expression with brackets, is refused the same way. Any GPL or LGPL id anywhere fails the package.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 0.1 Licence families (the chair line&#x27;s S4 list, copied by Pernille, T-0285…, scrolls sideways" style="--tw:1201px" markdown="1">

| SPDX id(s) | Family | Allowed for | Source of the rule |
| --- | --- | --- | --- |
| MIT, MIT-0 | MIT | any package, file or linked library | L13 s3 (c) |
| BSD-2-Clause, BSD-3-Clause | BSD | the same | L13 s3 (c) |
| Apache-2.0 | Apache-2.0 | the same | L13 s3 (c) |
| PSF-2.0, Python-2.0 | PSF | the same | L13 s3 (c) |
| HPND, MIT-CMU | HPND | the same; MIT-CMU matched by id, not by a text search | L13 s3 (c); S4 |
| ISC | ISC | the same | L13 s3 (c) |
| Zlib; Libpng, libpng-2.0; IJG; libtiff; FTL | zlib, libpng, IJG, libtiff, FTL | linked C libraries (FreeType under the FTL only, never its GPLv2 option) | S4, each only after its text is read in the pinned sdist and cited in `recipes/<name>/LICENSES.tsv` |
| Qhull | Qhull | linked C library, attribution | S4; s3.5 |
| Bitstream-Vera, OFL-1.1 | font | unmodified fonts inside matplotlib's `mpl-data`, for the user's own plots; never our UI, icon, screenshots or site; a log/assets.md row each | S4 |
| MPL-2.0 | MPL-2.0 | **certifi only**, unmodified, as source, under S3's four conditions | S3 |
| BaKoMa (Computer Modern) | none | **not allowed**: the stage step drops `mpl-data/fonts/*/cm{b,ex,mi,r,ss,sy,tt}10.{ttf,afm,pfb}` and `LICENSE_BAKOMA*`; `check` fails if one is in the app | S4 |

</div>


Where the ids are read: `License-Expression` in `METADATA`; failing that, the `License ::` classifiers (mapped by `CLASSIFIERS`); failing that, a short `License` field that is itself an id on this table. Licence files inside the package's own `.dist-info` are covered by that id. A `LICENSE*`, `COPYING*` or `NOTICE*` file anywhere else, every font, and every linked C library needs a row in `pywidget/packages/recipes/<name>/LICENSES.tsv` (kind `file`, `font` or `library`; path or library; SPDX id; the file it was read from). The first one is `recipes/jedi/LICENSES.tsv` (typeshed Apache-2.0, django-stubs MIT, both read in the pinned wheel).

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 2.1 The list, scrolls sideways" style="--tw:1687px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2.2 Every other L13 s3 name, in or out, scrolls sideways" style="--tw:935px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 2.3 Bytecode: how the pure set loads (options), scrolls sideways" style="--tw:1280px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 2.6 Size budget (the number s1 item 4 asks for), scrolls sideways" style="--tw:960px" markdown="1">

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

*Correction, 2026-10-26 22:25 ET, Pernille (T-0280, Odalys review B1): "nothing is executed from inside an unpacked archive" is true of the pure set and false of every native build designed below. P1 and P2 both run the unpacked sdist's own build backend (`pyproject.toml`, `meson.build`, `setup.py`) in its unpacked tree, and run cibuildwheel and each build requirement on the host. Under #77 answer A as recorded, a session may hash, unpack and host-import-test manifest pins, and may not build. Builds need the A1 carve-out, which is an Investor's decision: the #77 A1/A2 follow-up is unanswered, and proposal #79, which carried the wording, was approved but not applied (the applier refuses a file rename; log/optimizations.md, 18e41a96). No build has run. The toolchain the carve-out would cover is now pinned in `manifest.toml`: 20 wheels in tiers `tool` and `build` (cibuildwheel 4.3.4 and 9 dependencies; pip, meson-python, meson, pyproject-metadata, ninja, Cython, setuptools, pybind11, setuptools-scm, vcs-versioning), each with url, final_url, sha256 and blake2b-256, fetched by `tools/pkg_pin.py` through `terms_guard.fetch` and rechecked by `tools/pkg_verify.py --tier tool,build` (20 of 20 ok, 22:18:46-22:21:16 ET). Four Homebrew tools (cmake 4.4.4, pkgconf 3.0.10, ninja 1.13.2, meson 1.12.1) are recorded as `[[brew]]` with bottle sha256, not installed. bashlex (a cibuildwheel dependency) is GPL-3.0-or-later; it runs on the host and is never staged into the app.*

### 3.2 The first thing that breaks is the fetch rule, not the linker

cibuildwheel's default flow makes requests that ADR-006 s9.5 forbids or that `terms_guard` has never seen:

1. Installing cibuildwheel itself, and its dependencies, from the PyPI index.
2. PEP 517 build isolation: pip installs each sdist's build requirements (meson-python, Cython, pybind11, ...) from `/simple/`.
3. Getting CPython's iOS support package for the build [unverified how 4.3.4 does it: python.org, GitHub, or a local path]. *Read 2026-10-26 about 22:12 ET from the pinned 4.3.4 wheel's `resources/` as bytes (T-0280): `build-platforms.toml` fetches `python-3.15.0-iOS-XCframework.tar.gz` from www.python.org (sha256 pinned there; our runtime is 3.15.1), and `virtualenv.toml` fetches `virtualenv.pyz` 21.14.12 from github.com/pypa/get-virtualenv. Both must be pre-placed or overridden before T-0243 runs offline.*
4. The testbed's `test-requires` (pytest) from the PyPI index.
5. Build systems that download C sources mid-build: matplotlib's meson wraps (freetype, qhull) and Pillow's dependency script (libjpeg-turbo, libpng, freetype and others) [recall; varies by version, read from the pinned sdist in T-0243].

Items 1, 2 and 4 are `/simple/` requests by our code, which is barred. Items 3 and 5 go to hosts whose robots and terms `terms_guard` has to read first. **Rule for the pipeline:** every build and test step runs with `PIP_NO_INDEX=1`, `PIP_FIND_LINKS` pointing at a local folder of pinned wheels (cibuildwheel, its dependencies and every build requirement, each a manifest entry with a sha256), `HTTP_PROXY` and `HTTPS_PROXY` set to `http://127.0.0.1:9` (nothing listens there), and meson's `--wrap-mode=nodownload` with wrap sources pre-fetched into its package cache. A hidden download then fails the build loudly instead of fetching quietly. Odalys can rerun it and get the same failure.

### 3.3 Builder (options)


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: 3.3 Builder (options), scrolls sideways" data-n="1" style="--tw:1026px" markdown="1">

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
3. **On `sys.path` before the user's folder** (`paths.add_user_packages`, already the rule). As built (Pernille, T-0408, 2026-10-27): `runner.bootstrap` inserts `<bundle_root>/app_packages` right after the last `sys.path` entry inside the bundle or the stdlib (a plain entry, no `.pth` read, nothing imported; absent folder, nothing added), before the snapshot so a reset keeps it; `add_user_packages` then lands the user's folder after it. Host test: `pywidget/tests/bridge/test_runner.py` `AppPackagesPathTests`.

Bytecode follows s2.3. Idris's Xcode build phase then turns each `.so` into a framework (PEP 730 layout), signs every binary, and runs the strip check (matrix row 2) and the L12 denylist check (stdlib ruling follow-up). Because that build phase also applies the stdlib manifest's `stripped` list, s1 item 3's smoke test runs against the cut stdlib. If the build that runs the smoke does not apply the strip, a hidden `ctypes` import passes in the Simulator and makes the review note false.

**Stage script, as built (Pernille, T-0285, 2026-10-26 20:48 ET). Interface for Idris's Xcode phase (T-0286).** `tools/pkg_stage.py`, stdlib only, run with `python3.13 -I` (it needs `tomllib`). It replaces the `pip install --target` line above for every wheel: nothing is installed by pip, no package code runs, wheels are unpacked as bytes by `pkg_verify.unpack` after their size and sha256 match `manifest.toml` and their RECORD matches their members. Four subcommands, called in this order:


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: 3.6 Stage, scrolls sideways" data-n="1" style="--tw:1012px" markdown="1">

| Step | When | Command | Does |
| --- | --- | --- | --- |
| 1 | before the build, or first in the phase | `stage --manifest pywidget/packages/manifest.toml --wheels DIR --out OUT [--tiers pure[,native]] [--platform iphonesimulator\|iphoneos] [--debug-build]` | `OUT/app_packages` and `OUT/stage-report.json` (every file, sha256, bytes, package; what was dropped and why; sizes). Keeps every `.dist-info`; drops bytecode (option (b)) and the BaKoMa fonts; licence gate (s0.1); certifi conditions 2-4 always, condition 1 and the log/assets.md rows as errors, or as warnings with `--debug-build`; the L12 denylist and the stripped stdlib names as top-level names; the pure ceiling on the stand-in measure (below). `OUT` must be new or empty |
| 2 | after copying `OUT/app_packages` to `$CODESIGNING_FOLDER_PATH/app_packages` | `frameworks --app "$CODESIGNING_FOLDER_PATH" --platform $PLATFORM_NAME --bundle-id $PRODUCT_BUNDLE_IDENTIFIER --sign "$EXPANDED_CODE_SIGN_IDENTITY"` (or `--no-sign`) | each `.so` becomes `Frameworks/<dotted.module>.framework/<dotted.module>` with `Info.plist` and `.origin`, and a `.fwork` file where it was (CPython's Apple `install_dylib` layout); `strip -S -x`; fails if `PyInit_<name>` is no longer exported or stabs remain; `codesign --force --timestamp=none`, then `codesign --verify --strict`. A no-op under A2 (no `.so`) |
| 3 | after step 2 | `check --app "$CODESIGNING_FOLDER_PATH" --report OUT/stage-report.json --bundle-root <the RuntimeConfig bundle_root> [--require-signed]` | the app's `app_packages` is exactly the staged files and bytes (a `.fwork` stands for its `.so`), no bytecode, no BaKoMa font, the denylist again over what is really in the bundle, `cacert.pem` unedited (condition 3), every `.fwork` resolves to a framework that points back, and `app_packages` is under `bundle_root` (s3.6 item 2). A seeded `ctypes/` under `app_packages` exits 4 |
| 4 | on the signing-off device build (S2) | `measure --app PATH/PyWidget.app --report OUT/stage-report.json` | the ruled measure: `zip -9` bytes of the `.app` minus the same without the pure set (and, separately, without the native set's files and frameworks); MB = 10^6 B; pure ceiling 3.0 MB (alarm 2.7), native gate 25 MB (stop-and-explain 20). The result goes into `sizes.tsv` by hand for now |

</div>


Exit codes: 0 ok (warnings may be printed); 1 usage or environment; 2 input refused; 3 licence refused; 4 denylist refused; 5 binary step failed; 6 size ceiling. Every problem goes to stderr, and the last stdout line is one JSON object (`ok`, `exit`, `step`, `problems`, `warnings`, plus the step's counts). A phase that stops on any non-zero code is correct; the code only says which gate.

The stand-in measure in step 1 builds an otherwise empty `PyWidget.app` holding only `app_packages`. `zip` compresses each entry on its own, so the delta is the same as in the real `.app` with the same name; the tests check that the two agree to the byte. The real pure set, staged from the eight pinned wheels at about 20:42 ET: **2,056 files, 6,653,241 B (the s2.1 figures), 2,500,579 B = 2.50 MB in the ruled measure**, under the 2.7 alarm and the 3.0 ceiling, before `CodeResources` (signing off, as S2 rules). A release-mode stage of the real set **fails today, exit 3, and should**: no log/assets.md rows for the eight packages yet, and the full MPL-2.0 text is not in `recipes/certifi/MPL-2.0.txt` (certifi's wheel carries only a 989 B notice, so condition 1 needs the text from Mozilla). `--debug-build` stages it with those as warnings. Tests: `tests/pkg_stage_test.py` (native paths on Mach-O fakes compiled from two-line C files here, not real wheels; #77 is open), seeded faults in `tests/pkg_stage_mutants.json`.

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 9: 3.9 Commands run for this draft (for Odalys to rerun), scrolls sideways" style="--tw:960px" markdown="1">

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


<div class="tbl" role="region" tabindex="0" aria-label="Table 10: 4. Go/no-go record (Pernille, T-0243), scrolls sideways" data-n="4 5 6 7 9" style="--tw:1707px" markdown="1">

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

## Chair line (Ines), 2026-10-26 20:34 ET (T-0281, on Odalys's review)

Form: independent review done (T-0244, e69af0aa); the chair rules on it (C13, C30). I read the review and sections 2-4 myself. I do not decide #77; that is the Investors' (A1 or A2, asked on #77 at 00:30 UTC). Everything below is written to hold under either answer.

**Ruling: sections 2 (pure set) and 4's table form are accepted with the changes below. Section 3 (the native pipeline) is not accepted until T-0280 lands and #77 is answered. The stage step now has owners and dates (B2).**

### B2. The stage step has owners

Two board lines, because one line cannot have two owners:
- **T-0285 Pernille, stage script, due 2026-10-29 18:00 ET.** Builds `app_packages` from the manifest only, unpacked with the `pkg_verify` unpacker, not pip, so no package code runs at stage time and nothing here waits on #77. Every `.dist-info` kept (s3.6 item 1), `.py` only (bytecode (b) below), a stage report of files and bytes.
- **T-0286 Idris, Xcode phase, due 2026-10-30 23:59 ET (Day 9), after T-0052 and T-0285.** Copies `app_packages` under `bundle_root` (s3.6 item 2), signs, runs the strip check and the L12 denylist over `app_packages` as well as `python/` and `Frameworks/`, and takes the S2 size measurement. The `.so`-to-framework step (PEP 730) is written and tested only under A1; under A2 there is no native wheel to convert. The import smoke runs on the first day a settings rule permits it.

T-0052 (stdlib cut in the build phase) is a prerequisite and stays Idris's P1. In the Xcode <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>, T-0052 and then T-0286 go ahead of T-0207, T-0206 and T-0031. If T-0286 misses 2026-10-30, the cause is our scheduling, and I say so in the next report; the packages do not get the blame.

### S3. certifi under MPL-2.0: option (i), with Odalys's four conditions

Granted. The allowlist in L13 s3 (c) is a company rule. MPL-2.0 meets all three of Commandment 5's tests: commercial use, attribution, a log row. I noted Odalys's disclosure that she wrote the rule. I am ruling on the licence text, not on her preference. The conditions are binding and go into s0's licence row:
1. The full MPL-2.0 text goes on the Acknowledgements screen (T-0042) and in certifi's log/assets.md row, with one line saying certifi ships unmodified as source inside the app and where its upstream source is.
2. `cacert.pem` and certifi's `.py` ship unmodified and as source under every bytecode option, including (d) if it is ever proposed again.
3. We never edit `cacert.pem`. A custom root is a 1.1 question for option (iii), not a patch.
4. The exception names certifi, unmodified, in source form. It is not a general MPL-2.0 pass. pathspec (Black, 1.1) gets its own ruling when it comes.

s2.4 item 2 (the stdlib's https needs a CA file on the device) makes certifi load-bearing even without requests. That is one more reason for (i). Setting `SSL_CERT_FILE`, and `MPLCONFIGDIR` too, before ADR-007 s8.2's bootstrap snapshot is C1 work for Pernille (review L2 (a)).

### S4. Pillow's and matplotlib's bundled parts: an explicit table, with unknowns refused

s3.5's gate is extended as Pernille proposed (s4.2 Q5: yes) and as the review asks. It reads `METADATA`, every `LICENSE*` and `LICENSES_bundled*` file, every linked C library, and every bundled font and data file. Each SPDX id or licence file maps to a named family through the list below, which is the table until Pernille copies it into s0 with T-0285. An id that is not on it is refused and comes to the chair. That is a stop, not a warning.

Families I add to the table now, **each only after Pernille reads its text in the pinned sdist and cites the file in `recipes/<name>/LICENSES.tsv`**. The review lists these from memory, and so do I:
- zlib, libpng, IJG (libjpeg-turbo), libtiff, and the FreeType Licence (FTL; never FreeType's GPLv2 option): permissive, attribution only.
- MIT-CMU: counted as the HPND family, matched by id, not by a string search for "HPND".
- Qhull: permissive with attribution (s3.5).
- Bitstream Vera (DejaVu fonts) and SIL OFL-1.1 (STIX fonts): **only for fonts that ship unmodified**, inside matplotlib's `mpl-data`, used to draw the user's own plots. They are code-library data, not app art. They never appear in our UI, icon, screenshots or site. Each one gets a log/assets.md row (Commandment 5).
- **Not added: BaKoMa (the Computer Modern fonts).** By default they are stripped from `mpl-data`, and the `cm` mathtext fontset is documented as unavailable. If Pernille reads the text and it plainly allows commercial redistribution inside an app, she brings it back to me; until then they stay out.
- FriBiDi (LGPL-2.1) is never linked (s3.5). Any GPL or LGPL anywhere fails the package.

This matters only under A1. Under A2 there is no Pillow or matplotlib in 1.0, and the table waits for 1.1.

### S2 and s4.2 Q3. The size budget, in one measure

- **One measure for every row, from today:** bytes of `zip -9` of the device `.app`, built with signing off, with the part minus without it. MB means 10^6 B. Each result goes into `sizes.tsv` with the measure's name. The App Thinning report replaces it once an archive can be exported (after the membership). "Compressed" in s1 item 4 means this measure.
- **Pure set: 16 MiB on disk (unchanged); 3.0 MB in the new measure, alarm at 2.7 MB.** The 2.5 MB figure was raw deflate per file. It left out about 535 KB of zip entries [Odalys's estimate], which the set always carried. Restated in the new measure, the review puts the set at about 2.34 MB, 94% of 2.5, before the signing hashes in `CodeResources`, which are unmeasured. A ceiling at 94% before its last unmeasured part is not a ceiling. It fails on the first stage build for a reason that has nothing to do with what ships. I am setting 3.0 MB on the honest measure and writing down that I raised it. I did not accept 2.5 and then move it: s4.2 Q3 was still open. If the measured number goes over 2.7, the first lever is jedi's `third_party` stubs (1,790 files, never imported, s2.3), not dropping a package. Option (c) (build-time `.pyc`, about +2.5 MB) needs its own size ruling before it is used.
- **Native set:** the chair's 25 MB (s1 item 4) is the gate, in the new measure. Pernille's 20 MB and her per-package alarm lines (7 / 3 / 10) are stop-and-explain lines, not gates. They have no slack, and matplotlib's line includes fonttools, which is unmeasured.
- **Whole app: 60 MB accepted as a bound.** It becomes a number before Day 10. T-0286 takes one device-build measurement of the whole `.app` with signing off. Today's known parts are 44.8 MiB on disk before any package.

### S1, s4.2 Q4, and the Day 10 gate under each answer to #77

The trigger is dated, as the review asks. **If no Claude Code settings rule that permits importing pinned packages is applied by 2026-10-29 12:00 ET, numpy, Pillow and matplotlib are 1.1 that day,** whatever #77 says by then. That frees the two build days. The pure set does not ship on static checks alone (Worker Rule 1, matrix row 8).


<div class="tbl" role="region" tabindex="0" aria-label="Table 11: S1, s4.2 Q4, and the Day 10 gate under each answer to #77, scrolls sideways" style="--tw:1280px" markdown="1">

| #77 outcome | Native set (s1, Day 10 = 2026-10-31 23:59 ET) | Pure set (jedi, parso, pyflakes, requests stack) | What changes on the board |
| --- | --- | --- | --- |
| **A1**, with T-0275/T-0280's rule applied by 2026-10-29 12:00 | s1 stands as written. Builder P1 (cibuildwheel) first; P2 (`pip wheel --no-build-isolation`) only if P1 fails on the iOS path, both behind s3.2's offline rule and S5's canary (s4.2 Q4: yes). numpy, then Pillow, then matplotlib, each alone. My judgment: with two build days, numpy is likely, matplotlib unlikely; the rule decides, not my guess | Host import test (s3.7) and the Simulator import through T-0286 by Day 10 | T-0243 unblocks; the s4 rows fill. s1 item 1 reads "cp315 or abi3" (review L1) |
| **A2**, with its rule applied by 2026-10-29 12:00 | **No native package in 1.0.** numpy, Pillow and matplotlib are 1.1 on the day A2 is recorded, with no further ruling. 4.1's "all three fail" list applies. Maren's L13 s6 "needs native code" text drops the three names. Matrix row 4 leaves the review notes. 20 MB of budget comes back | Same as A1: host test and Simulator import by Day 10 | T-0243 closes as 1.1. T-0286 drops the `.so`-to-framework step. S4's font and library table waits for 1.1 |
| **Answer or rule not in place by 2026-10-29 12:00** | 1.1 that day, as under A2 | The only route left is a human check (review S1). That afternoon the Operator opens an Urgent Request with a provided script that an Investor runs and pastes back. If no pure package has a passing import by the feature freeze, 2026-11-03 (Day 13), the untested ones are out of 1.0. That means no completion, lint or requests. I say plainly that this is the worst branch for the product | T-0243 closes as 1.1. The Day 13 cut goes in the next report |

</div>


Either way the pure set's Simulator import is due by Day 10, the alpha. Day 13 is the hard stop.

### The other s4.2 questions

- **Q2 bytecode: (b)**, `.py` plus `pycache_prefix` in `Library/Caches/pycache`. It costs nothing in the bundle and keeps go-to-definition. If the first device run is over the launch budget, (c) comes back with its own size ruling. The bootstrap line is C1, Pernille's.
- **Q6:** `pydoc_data` stays stripped in v1. Empty keyword docs in completion is a known gap, written into the IDE's help text. It is not worth 641 KB of budget. `SSL_CERT_FILE` and `pycache_prefix` are C1 (above).
- **S5** (the dead proxy is not a network block) is Pernille's, inside T-0280: the canary, `sandbox-exec` if the session permits it, and the cache listing. **Low L1-L7** go to Pernille when s2-s3 are next touched. The L5 fixes to `pkg_measure.py` ship with T-0285, which reuses it.

What would make this fail: T-0286 slipping behind the five Idris P1 lines already in the Xcode lane. If it does, the Day 10 gate fails for a scheduling reason under every answer. That is why its date is binding and its place in the lane is written above. Second: a 2026-10-29 noon trigger that nobody checks. The Operator puts it on the board as a dated line.

Ines, CEO
{% endraw %}

</div>
