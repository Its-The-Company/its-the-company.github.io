---
layout: "default"
title: "L13 \u2014 Package policy: bundled native packages, user installs, build pipeline"
section: "documents"
description: "Gap that matters: I cannot say which packages ship cp315 iOS wheels on PyPI itself. PyPI accepts iOS wheels (since early 2025, per secondary sources), and Pillow&#x27;s own notes say it ships iOS wheels from 11.3.0 (cp313\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/research/' | relative_url }}">← Research</a><a href="{{ '/documents/pywidget/l13-packages.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L13-packages.md</code></span></div><h1>L13 — Package policy: bundled native packages, user installs, build pipeline</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-10-25 19:25 ET. Research and pipeline design only; nothing built, no Xcode or Simulator run (Idris <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> them).
Feeds: the package-policy ADR (owner to be named by Ines), L3 (Idris), L6 (Wrenna). Wrenna's L6 is the authority on App Review; every App Review statement here defers to it.

## 0. Method and what I could not read


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. Method and what I could not read, scrolls sideways" style="--tw:960px" markdown="1">

| Source | Read how | Result |
|---|---|---|
| docs.python.org/3/using/ios.html (3.15 docs) | WebFetch | read |
| peps.python.org/pep-0730 | WebFetch | read |
| cibuildwheel.pypa.io platforms + changelog | WebFetch | read |
| github.com/beeware/mobile-forge README | WebFetch | read |
| pillow.readthedocs.io 11.3.0 release notes, platform-support page | WebFetch | read |
| pypi.anaconda.org/beeware/simple (BeeWare's iOS wheel index) | script through tools/terms_guard.fetch; HEAD for sizes | 53 projects listed; 13 probed |
| pypi.org JSON API and /simple/ | terms_guard | **refused**: robots.txt `Disallow: /pypi/*/json`, `Disallow: /simple/` (live copy 2026-10-25 19:18) |
| pypi.org/project/<name>/ HTML | terms_guard | robots allows it, but the reply is a JavaScript "Client Challenge". That is a human check (Commandment 11). Not bypassed. |
| Wheel files (METADATA, license files) | terms_guard | **refused**: anaconda redirects downloads to an S3 host whose terms are unread (P2 gate) |
| developer.apple.com (guidelines, ODR, MetricKit docs) | n/a | **refused by company <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>**: Apple's terms forbid scripted reads. A person must read these pages. |
| App Review 2.5.2 text | repo | human read by Ines, 2026-10-22 (research/guideline-4-2-5-6.md, page "Last Updated: October 16, 2026") |

</div>


Gap that matters: **I cannot say which packages ship cp315 iOS wheels on PyPI itself.** PyPI accepts iOS wheels (since early 2025, per secondary sources), and Pillow's own notes say it ships iOS wheels from 11.3.0 (cp313 only at that release). For anything else on PyPI I have no reading. The pipeline below doesn't depend on PyPI having them, because we build what we bundle.

## 1. Platform facts that set the policy (verified)

1. **One binary per framework, all binaries in `Frameworks/`.** docs.python.org: "all binary modules in an iOS app must be dynamic libraries, contained in a framework with appropriate metadata, stored in the `Frameworks` folder of the packaged app ... there can be no executable binary material outside the `Frameworks` folder." Each `.so` becomes `Frameworks/<dotted.name>.framework/<dotted.name>`, with a `.fwork` stub left in place and a `.origin` file inside the framework. Consequence: **native code can only reach a user's phone inside the signed app binary.** No download path exists for native code, by Apple's rules and by code signing.
2. **No subprocess, no fork.** PEP 730: `subprocess` raises, and `os.fork`/`os.spawn` raise `OSError`. Consequence: pip cannot build an sdist on the phone (PEP 517 builds run hooks in a subprocess). Tools that ship as executables (ruff, for example) cannot run. A pure-Python formatter (Black's `py3-none-any` wheel) can.
3. **On-device pip is out of PEP 730's scope.** PEP 730: a "create a virtual environment and pip install" workflow "will not be viable on iOS". The PEP gives Apple's restriction on downloading code as the reason.
4. **Wheel tags:** `ios_<min>_<arch>_<sdk>`, e.g. `ios_13_0_arm64_iphoneos`, `..._arm64_iphonesimulator`, `..._x86_64_iphonesimulator`. CPython and cibuildwheel default to a minimum of iOS 13.0 (`IPHONEOS_DEPLOYMENT_TARGET`).
5. **Privacy manifests:** a binary module (OpenSSL, for example) needs a `.xcprivacy` file next to the `.so`. The build step moves it into the framework (docs.python.org, April 2025 requirement).
6. **Runtime:** Idris pinned the python.org official iOS XCframework 3.15.1 (pywidget/ios/scripts/fetch_python.sh). Every native wheel we bundle must therefore be **cp315** or **abi3** (an abi3 wheel built for cp313 loads on 3.15).
7. **mobile-forge is semi-retired.** Its README says "we are no longer actively working on this project", with no plans for 3.14 or later, and points to cibuildwheel. It cannot build for our 3.15 runtime. See CORRECTIONS.md.
8. **cibuildwheel:** iOS since v3.0.0 (2025-06-11); CPython 3.15 for iOS since v4.0.0 (2026-06-07, behind `enable = cpython-prerelease` at first); latest v4.3.4 (2026-10-22). It needs macOS with full Xcode and an iOS SDK; this machine has Xcode 27.1. Tests run on a simulator of the host's arch through CPython's testbed. `test-command` must be a `python -m ...` form (no shell). Build tools such as cmake, ninja or rustc must be declared in `xbuild-tools`. Frontends: pip and build (uv not fully supported).

## 2. What exists today for 3.15 (BeeWare index, n = 13 projects probed of 53 listed)

Sizes are the compressed wheel (Content-Length from a HEAD on pypi.anaconda.org), arm64 device slice, newest cp313+ wheel. The simulator slice is extra and is not shipped in the App Store build.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. What exists today for 3.15 (BeeWare index, n = 13 projects probed of 53…, scrolls sideways" style="--tw:959px" markdown="1">

| Package | Newest iOS wheel (BeeWare) | cp315? | Size | License (project's stated; **not read from the wheel**, see gap) |
|---|---|---|---|---|
| numpy | 2.5.2.post1, tag **ios_17_0** | yes | 5.57 MB | BSD-3-Clause (plus bundled-component notices) |
| contourpy | 1.3.3.post1 | yes | 0.28 MB | BSD-3-Clause |
| cryptography | 47.0.0, cp313-**abi3** | yes via abi3 | 2.95 MB | Apache-2.0 OR BSD-3-Clause; bundles OpenSSL (Apache-2.0) |
| cffi | 2.0.0 | no (cp314 newest) | 0.19 MB | MIT |
| kiwisolver | 1.5.0.post1 | no (cp314) | 0.06 MB | BSD-3-Clause |
| pillow | 11.0.0 | no (cp313) | 1.03 MB | MIT-CMU (HPND) |
| aiohttp | 3.10.5 | no (cp313) | 0.38 MB | Apache-2.0 |
| pandas | 1.5.3 | no (cp312) | n/a | BSD-3-Clause |
| matplotlib | 3.6.0 | no (cp312) | n/a | Matplotlib license (PSF-style, BSD-compatible) |
| regex | none for iOS | no | | |
| scipy, lxml, pydantic-core | not in index (404) | no | | |

</div>


Reading: BeeWare's index is a stopgap with gaps. For 3.15 it covers only numpy, contourpy and (via abi3) cryptography. **We should build our own bundled set with cibuildwheel** and treat the BeeWare and PyPI wheels as cross-checks.

Note for L3 and Idris: the cp315 numpy wheel is tagged **iOS 17.0 minimum**. If we bundle it as is, the app's deployment target is at least iOS 17. We can rebuild it at a lower target if L3 picks an older floor.

## 3. Proposed bundled set for v1 (main app only; the widget extension gets none of it unless L3 says otherwise)

Selection rule: (a) the IDE pillar's own requirements in brief 2.5 (images, tables and plots in the console); (b) the package has a cibuildwheel or BeeWare iOS path; (c) permissive license (MIT, BSD, Apache-2.0, PSF, HPND, ISC); no GPL or LGPL; (d) total native payload kept small.

**Native (built here with cibuildwheel, cp315, arm64 device + arm64 simulator):**
1. **numpy.** The base of any data, plot or image work; the most-asked native package. A cp315 wheel exists upstream to check ours against.
2. **Pillow.** Images in the console and image widgets (the Share-sheet "Run Python on this" image case). Upstream ships official iOS wheels since 11.3.0.
3. **matplotlib, Agg backend only, plus contourpy and kiwisolver.** "Plots from bundled libraries" is a brief requirement. Only cp312 exists upstream (BeeWare), so this is the hardest build in the set: it pulls in freetype and libpng. It is the first risk to measure.

**Pure-Python (bundled for offline use and stable versions; no native code):** requests + urllib3 + idna + certifi + charset-normalizer (pure fallback), PyYAML (no libyaml), python-dateutil, packaging, pyparsing, cycler, fonttools, tabulate or rich (console tables, pick one), Black (formatter, pure wheel, brief 2.5), jedi + parso (autocompletion; pure Python), pypa `installer` (for section 4).

**Deferred to v1.1, measure first:** pandas (large; would need a fresh build of 2.x/3.x), cryptography (abi3 wheel exists, but it brings OpenSSL: a privacy manifest and an export-compliance answer, both human checks), cffi, aiohttp, pydantic-core (Rust; cibuildwheel needs `xbuild-tools` rustc).

**Excluded for now:** scipy (needs Fortran/BLAS; no iOS wheel found), lxml (no iOS wheel found), anything that runs an executable (ruff), anything GPL or LGPL.

Payload estimate (compressed, device slice): numpy 5.6 MB + Pillow ~1 MB + matplotlib stack: unknown until built (upstream desktop wheels are around 8 MB). That puts the native set at roughly **15 MB compressed, unmeasured**. Pure-Python adds about 5 MB more, also unmeasured. Measure after the first build.

## 4. User installs: pure-Python into a user site-packages folder

### How it would work
- The folder is `Application Support/pywidget/site-packages/` (or per project `.../<project>/site-packages`), added to `sys.path` after the bundled packages. Bundled packages win, so a user cannot shadow numpy with a broken copy.
- The installer is pypa `installer` (pure Python) driven by our own small resolver. Not stock pip: pip's sdist builds need a subprocess, and its VCS and build paths fail on iOS (fact 2).
- **Only `py3-none-any` (or `py2.py3-none-any`) wheels are accepted.** Before unpacking, the installer refuses any archive that contains `.so`, `.dylib`, `.dll`, Mach-O magic bytes, or a non-`any` platform tag. iOS would refuse to load unsigned native code anyway (fact 1). The check turns a crash into a clear message.
- Online: resolve against PyPI's simple index (the PEP 691 JSON form) at the user's request, the way pip does. PyPI's robots.txt disallows `/simple/` for crawlers, which binds our research scripts. A user-initiated installer request is ordinary client use (pip uses that path), but **Ines should rule on it before we build it**, given our robots discipline.
- Offline: "Install from file". The user picks a `.whl` or `.zip` from Files or iCloud Drive and the same `any`-only check applies. A requirements file resolves only against wheels already in a local folder.
- Every installed file can be opened, read and edited in the IDE's editor. Section 4.3 explains why that matters.

### App Review risk (Wrenna's L6 governs; this is my reading only)
- 2.5.2 (human-read text, 2026-10-22): apps may not "download, install, or execute code which introduces or changes features or functionality of the app". Per the brief, the exception requires code to be fully viewable and editable by the user. The exact conditions of that exception (whether it is limited to educational apps or to "students") must come from Wrenna's reading of the current text. **I have not verified them.**
- **Offline install from file: low risk.** The user brings their own code through Files, as with any document. No download by the app.
- **Online pip from PyPI: medium-to-high risk, and the main L6 question.** Packages are third-party code that changes what the user's scripts can do, though not what the app does. The defence is (a) source-only, viewable and editable; (b) user-initiated, never automatic; (c) never native; (d) no access to native APIs beyond what the user's own script already has. That last point touches 4.7.2 ("may not be given access to native platform APIs without Apple's prior permission", per the brief), so a person must read it against the current text.
- Precedents: Pyto and a-Shell are said to offer pure-Python pip on the App Store; Pythonista does not, officially. Unverified this session; L6 should confirm.

- Update after reading CORRECTIONS.md (Wrenna, 19:23): the 2.5.2 exception covers "Educational apps designed to teach, develop, or allow students to test executable code", "in limited circumstances". DPLA 3.3.1(B) also applies. Guideline 2.5.19 (2026-10-16) bars "hidden, dormant, or undocumented features".

**Verdict:** ship v1 with offline "Install from file" (pure-Python only, enforced). Develop online pip in a branch or debug-only build target, **compiled out of release builds**. Because of 2.5.19, it must not ship dormant behind a flag. It enters a release only after Wrenna's L6 ruling, in an update whose App Review notes describe it. If L6 rules against it, the fallback is a web page where users download wheels themselves and bring them in through Files.

## 5. Large packages on demand
- **ODR appears to be legacy.** Secondary sources (WWDC25 session 325 per a transcript index; an Apple DTS forum reply, seen only in search results) say On-Demand Resources is legacy and will be deprecated, with **Background Assets / Apple-hosted asset packs** as its successor (iOS 26 minimum per a third-party blog, unverified). A person must confirm this in Apple's docs (G2a). See CORRECTIONS.md.
- Either way, **native code cannot go in an asset pack** (fact 1). Asset packs can hold data and pure-Python only: matplotlib fonts and style sheets, sample datasets, the offline stdlib and package docs for the docs browser, `tzdata`, example projects.
- So "big package on demand" means the pure-Python or data part. A package with native parts is either in the binary or unavailable.

## 6. The IDE's "needs native code" message
Triggers:
1. **At install.** The resolver finds only platform wheels (no `any` wheel), or only an sdist that declares extension modules or a non-pure build backend.
2. **At import.** `ModuleNotFoundError` for a name in a shipped table of the top native packages (import name to distribution name: `cv2` to opencv-python, `sklearn` to scikit-learn, `scipy`, `lxml`, `pydantic_core`, ...), or an `ImportError` from a `.so` that is not a framework.

Draft text (Maren owns the final wording):
> **scipy needs native code that isn't in this version of the app.** iOS only runs compiled code that ships inside the app, so it can't be installed here. Bundled native packages: numpy, Pillow, matplotlib. [Request this package] [Why?]

"Request" goes into a local list the user can share. No network call without consent.

## 7. Build pipeline (this Mac mini, free tools only)
```
pywidget/packages/
  manifest.toml        # name, pinned version, sdist URL + sha256, license expected, min iOS, tier (native|pure)
  recipes/<name>/      # cibuildwheel config overrides, patches (upstream-first), .xcprivacy if needed
tools/pywidget_wheels.py   # one entry point; steps below
```
1. **Fetch** pinned sdists by URL and sha256 into `~/.cache/pywidget/sdists` (outside the repo, as fetch_python.sh does). Open: whether a build-time `pip download` from PyPI is allowed under our robots rule. pip is PyPI's intended client, but Ines rules (see section 4).
2. **Build** with cibuildwheel (BSD-2, `pipx run cibuildwheel` or a pinned venv): `--platform ios`, archs `arm64_iphoneos,arm64_iphonesimulator`, build `cp315-*`, `IPHONEOS_DEPLOYMENT_TARGET` set to the app's floor from L3.
3. **Test** each wheel on the simulator through cibuildwheel's testbed (`test-command = "python -m pytest <subset>"`, `test-sources` copied in). On top of that, our own import smoke test per package.
4. **Gate:** read each wheel's `METADATA` `License-Expression` and license files. Refuse anything not on the allowlist. Append the license to the app's Acknowledgements and a line to `log/assets.md` (Commandment 5). Check for a `.xcprivacy` where the library needs one.
5. **Stage:** host-side `pip install --target ios/app_packages --only-binary=:all: --platform ios_<min>_arm64_iphoneos --no-deps -f dist/` (pip supports iOS tags since 24.3). The Xcode build phase from the CPython docs (`install_python Python.xcframework app`) turns each `.so` into a framework with its `.fwork`/`.origin` files.
6. **Record** size per wheel and total app size delta into `pywidget/packages/sizes.tsv`, so a package's cost is a number before it is bundled.
7. **Rebuild triggers:** a version pin change, a new CPython patch release, or a new Xcode/iOS SDK (see L10).

## 8. Open, for others
- Ines: a ruling on (a) user-initiated PyPI requests from the app and (b) build-time `pip download`, given PyPI's robots.txt. Also: who owns the package-policy ADR.
- Idris (L3): the deployment-target floor. The numpy cp315 wheel is iOS 17.0 as published.
- Wrenna (L6): the exact 2.5.2 exception conditions, 4.7.2 against user-installed pure-Python, and the Pyto and a-Shell precedents.
- A person (G2a): Apple's ODR / Background Assets status and minimum iOS.
- Measure: the first matplotlib cp315 iOS build (time, size, test pass rate) before it enters the v1 set.
{% endraw %}

</div>
