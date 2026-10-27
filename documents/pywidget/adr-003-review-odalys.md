---
layout: "default"
title: "Review: ADR-003 package policy (chair frame s0-s1, author&#x27;s sections s2-s4)"
section: "documents"
description: "Disclosure. I wrote L13, and its s3 (c) is the licence allowlist that certifi fails. Below I review an exception to my own rule. Weigh my view on certifi with that in mind."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/adr-003-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/ADR-003-review-odalys.md</code></span></div><h1>Review: ADR-003 package policy (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> frame s0-s1, author's sections s2-s4)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-10-26, task T-0244. Independent review (Commandment 13, hand-off with independent review). I read the ADR at 8acd8b8c, `pywidget/packages/manifest.toml`, `pywidget/packages/sizes.tsv` and `tools/pkg_measure.py`, not the author's summary. I also read ADR-001 3.1 C1, ADR-006 s3 and s9.5, ADR-007 s4, s6 and s8, the App Review matrix rows 1-4, 8 and 16 ([`pywidget/docs/release/app-review-matrix.md`](app-review-matrix.html)), L13 s3 and s7, and Urgent #77 with its answer. I made no edit to the ADR above its status lines. Pernille and Ines make the changes.

**Disclosure.** I wrote L13, and its s3 (c) is the licence allowlist that certifi fails. Below I review an exception to my own rule. Weigh my view on certifi with that in mind.

**Measured (n = 8 wheels, 2026-10-26 20:25:50-20:26:19 ET).** I fetched all eight pure pins again through `terms_guard.fetch`, each into its own fresh temp folder, using a new checker, `tools/pkg_verify.py` (tests in `tests/pkg_verify_test.py`: 17/0 on 3.9.6 and 3.13.18; 5 of 5 seeded mutants killed). Nothing from a wheel was imported or run. The checker reads bytes only, and `pkg_measure` ran under `-I` with the unpacked folders passed as arguments. Results:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
| --- | --- |
| Byte count and sha256 against `manifest.toml` | 8 of 8 match |
| PyPI's own hash (the blake2b-256 in the redirect path `/packages/aa/bb/<rest>/`) | 8 of 8 match. This is a second hash that our first download did not pick |
| Unpack: absolute paths, `..`, backslashes, symlinks, duplicates | 0 refused |
| The wheel's own RECORD: every member listed, every sha256 and size right, nothing listed that is absent | 8 of 8 clean (2,056 files) |
| Native files in any member (suffix or Mach-O/ELF/PE magic), all members rather than RECORD's list only | 0 |
| `sizes.tsv` rebuilt from my unpack | identical in all 12 columns for all 8 rows; totals 2,056 files, 6,653,241 B, 12,242,944 B on disk, 1,809,264 B deflate |

</div>


**Verdict.** The pure set is well chosen, pinned and measured, and the numbers reproduce exactly. The weak part is the native path: **as recorded, the #77 permission forbids the sdist build it was granted for**. Nothing on the board owns the app-side staging step that s1 item 3 needs. **2 blockers, 5 should-fix, 7 low.** None of them changes the pure list.

Severity: **Blocker**: fix before T-0243 runs a build or before the chair accepts. **Should-fix**: fix before the stage step ships or before Day 10. **Low**: a note, or a fix when the text is next touched.

## Blockers

**B1. #77's condition "nothing is run from inside an extracted archive" rules out every sdist build. The build toolchain is outside the manifest the permission names.** (Owner: Pernille, T-0275. Board line T-0280.)
- amendments.md records answer A as "never running anything from inside an extracted archive". Building numpy from its sdist means running the sdist's own `meson.build` and `pyproject.toml` backend, with the unpacked sdist as the working tree. That <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> for P1 (cibuildwheel) and for P2 (`pip wheel --no-build-isolation`) alike. ADR-003 s3.1 repeats the claim ("nothing is executed from inside an unpacked archive") and then designs builds that do exactly that. Read literally, the permission allows hashing, unpacking and the host import test, and nothing else.
- A also covers "only packages pinned in manifest.toml". cibuildwheel and its dependencies, and each sdist's build requirements (for numpy: meson-python, meson, Cython; others for Pillow and matplotlib), are PyPI packages that run in the session. None of them is in the manifest. The Homebrew tools in s3.3 (ninja, cmake, pkg-config, meson) are also outside code.
- Fix:
  - (1) T-0275's settings proposal states the carve-out in plain words, for an Investor to approve: "a pinned sdist's own build backend runs with its unpacked folder as the working tree, in a fresh /tmp folder, network blocked; our scripts stay in tools/ and get paths as arguments; no test suite or other script from any archive runs".
  - (2) The manifest gets a `tier = "build"` for every build-time wheel, pinned the same way and checked by `pkg_verify.py`. The wrapper refuses any wheel in `PIP_FIND_LINKS` that is not in the manifest. Homebrew tool versions and bottle sha256 are recorded in the same file.
  - (3) ADR-003 s3.1 gets a correction line. Without (1), T-0243 either cannot start or starts outside the Investors' words.

**B2. No board line owns the app-side package stage (s3.6). s1 item 3 cannot pass without it.** (Owner: Ines, to assign. Board line T-0281.)
- s1 item 3 counts only an import inside the Simulator app build through `tools/xc.sh`. For that, someone must build: the stage of `app_packages` under `bundle_root` (s3.6 item 2), one framework per `.so` in the PEP 730 layout, signing, the strip check re-run (matrix row 4), and the L12 denylist. The `.so`-to-framework conversion is in the Xcode phase. T-0052 (the stdlib strip in the build phase) is also still open, and s3.6's last paragraph says a smoke test without the strip makes the review note false.
- Today all of this exists only as a clause inside T-0243 ("Idris stages the wheel in the Xcode queue after the bridge"). Idris holds five P1 lines (T-0031, T-0041, T-0207, T-0208, T-0267). The pure set needs the same stage step for C5 completion and for row 3's "shipped in the binary".
- Fix: one board line with an owner and a date no later than 2026-10-30 (Day 9), split as Pernille's stage script plus Idris's Xcode phase. T-0052 is named as a prerequisite. Otherwise every native package fails item 3 on Day 10 whatever its wheel does, and the cause would be our scheduling, not the package.

## Should-fix

**S1. The Day 10 rule under answer B, and under A until the settings proposal lands.** (Owner: Ines, chair line.)
- Under B as #77 words it, the native half of the rule still works: it gives a clear answer (all three go to 1.1 on Day 10, and the IDE's L13 s6 message stays honest). The pure half does not. "Ships on the static checks alone" ships jedi, parso and pyflakes with no run at all. That breaks Worker Rule 1 ("never ship something untested") and leaves matrix row 8's mitigation ("jedi must not try to spawn") with no evidence. Any `xc.sh` Simulator test that imports jedi is also package code running in a session, so B blocks C5's own tests, not only the host test.
- A was answered, but A only takes effect through the settings proposal, which needs "approve". Until then we are effectively under B.
- Fix: s1 gets a dated trigger: "if the T-0275 settings rule is not applied by 2026-10-29 12:00 ET, numpy, Pillow and matplotlib are 1.1 that day". That frees the two build days for other work instead of spending them waiting. For the pure set under B, s2.5 names the only route left: a human check (an Investor runs a provided script and pastes its output).

**S2. The size ceilings mix units and measures, and the pure-set deflate figure leaves out the zip entries.** (Owner: Pernille, s2.6.)
- "16 MiB", "2.5 MB", "20 MB", "60 MB" and the chair's "25 MB compressed" are not one unit or one measure. "Deflate" sums raw deflate per file. An `.ipa` adds a local header and a central-directory entry per file, about 76 B plus the path twice. For 2,056 files (paths summed from the 8 wheels, plus an assumed 34-character `Payload/<app>.app/app_packages/` prefix) that is about **535 KB [estimate]**. The pure set's `.ipa` delta is then about 2.34 MB against the 2.5 MB ceiling, 94% used. The per-file signing hashes in `_CodeSignature/CodeResources` are not counted yet [unmeasured].
- The native alarm lines (7 + 3 + 10) sum exactly to the 20 MB set ceiling, so no line has slack. matplotlib's 10 MB includes the pure fonttools, which is unmeasured.
- Fix: one measure for every row, "bytes of `zip -9` of the device `.app`, with minus without", written to `sizes.tsv` with the measure's name. It can be built today with signing off, before the membership. MB means 10^6 B. The App Thinning report replaces it once an archive can be exported. Take one device-build measurement of the whole app before Day 10, so the 60 MB row is a measured number and not only a bound. The parts known now, on disk and uncompressed, are 22.32 + 10.80 + 11.68 = 44.8 MiB before any native package.

**S3. certifi MPL-2.0: option (i) is right, with four conditions written into s0's licence row.** (Owner: Ines, chair ruling. Commandments 4-5.)
- Commandment 5 asks for commercial use, attribution where required, and a log row. MPL-2.0 meets all three. The allowlist in L13 s3 (c) is a company rule, so the chair can grant the exception and no Investor is needed.
- Conditions:
  - (1) The full MPL-2.0 text goes on the Acknowledgements screen and in the log/assets.md row, with a line saying certifi ships as source inside the app and where upstream is. MPL requires the recipient to be told the terms and where to get the source, which is more than a notice.
  - (2) `cacert.pem` and certifi's `.py` ship unmodified and as source under every bytecode option, including (d) if it ever comes back.
  - (3) We never edit `cacert.pem`. Adding a root is a modification of an MPL file, and the modified file would have to be published.
  - (4) The exception names certifi, unmodified, source form. It is not a general MPL-2.0 pass. pathspec (Black, 1.1) gets its own check.
- s2.4 item 2 makes certifi load-bearing for the stdlib as well, which supports (i).

**S4. The allowlist as written would refuse Pillow's and matplotlib's bundled parts under s3.5's own extension.** (Owner: Pernille, read from the pinned sdists in T-0243. Ines rules the list.)
- The allowlist names MIT, BSD, Apache-2.0, PSF, HPND and ISC. Several licences are permissive but not on it by name [recall, unverified]:
  - In Pillow's libraries: the zlib licence, the libpng licence, the FreeType Licence (FTL), IJG (libjpeg-turbo), and libtiff's own licence.
  - In Pillow's METADATA: "MIT-CMU", an HPND variant that a literal string match would miss.
  - In matplotlib's `mpl-data`: the DejaVu fonts (Bitstream Vera licence), the STIX fonts (SIL OFL-1.1) and the Computer Modern fonts (BaKoMa licence).
  - Commandment 5 names fonts explicitly. s3.5 covers linked C libraries but not bundled fonts and data files.
- Fix: s3.5's gate covers `LICENSE_*` and data files too, and maps each SPDX id or licence file to a named family through an explicit table in s0. An unknown id is refused and goes to the chair. Before the matplotlib row, the chair either adds those named permissive licences (OFL-1.1 for unmodified fonts only) or rules the fonts out.

**S5. The dead proxy is not a network block.** (Owner: Pernille, T-0275 wrapper.)
- `HTTP_PROXY` to `127.0.0.1:9` stops tools that honour proxy variables. It does not stop git (meson wraps can name git sources), raw sockets, or a tool that clears its environment. macOS has no network namespace. s3.2's promise that "a hidden download then fails the build loudly" holds only for the polite tools.
- Fix:
  - (1) The wrapper runs a canary first. A deliberate fetch from inside the wrapped environment must fail, or the build does not start.
  - (2) Run the build under a `sandbox-exec` profile that denies outbound network, if the session permits it (deprecated but present). Test it with the same canary.
  - (3) After the build, the wrapper lists every file in the meson package cache and the pip cache that the manifest does not name.

## Low

- **L1. ADR-001 wording.** ADR-001 3.1 C1 says the wheels are "cp315 or abi3, built by us with cibuildwheel". s1 item 1 narrows this to cp315, and s3.3's P2 drops cibuildwheel. T-0243's board line also hardcodes `cibuildwheel --platform ios`. Fix: s1 item 1 reads "cp315 or abi3". If P2 is chosen, add a correction line to ADR-001's Revised row and T-0243's line.
- **L2. ADR-006 and ADR-007 agree.** The pure list matches ADR-006 s3 item 1 ("requests and its dependencies, jedi, pyflakes", with parso as jedi's dependency). Fetches are by predictable URL through `terms_guard`, never `/simple/` (s9.5). ADR-007 s4 is respected: the extension gets no package. Three notes:
  - (a) ADR-007 s8.2's reset puts `os.environ` back to its bootstrap state, so `SSL_CERT_FILE` (s2.4 item 2) and `MPLCONFIGDIR` (s4.1) must be set before the bootstrap snapshot, or the first reset clears them. This is C1, for Pernille.
  - (b) If ADR-007's (c) <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> ever opens, s1's "the widget extension never carries any of them" needs a line of its own.
  - (c) ADR-006 s9.5 pins on first download (trust on first use). The blake2b path check above is a second hash, but PyPI supplies both. Record the redirect target in the manifest (`final_url`) so a later re-fetch can compare.
- **L3. App Review 2.5.2, matrix rows 3, 4, 8 and 16.** They agree with the ADR. Row 3 ("shipped in the binary, so not downloaded") holds for every option in s2.3. 2.5.2's "completely viewable and editable" condition binds downloaded code, not bundled code, so s2.3's case against (d) is the product posture, which is a sound reason, but it is not a review requirement. 2.5.2's container clause supports s2.4 item 2: with no `SSL_CERT_FILE`, OpenSSL reaches for `/etc/ssl`, outside the bundle and container, while `pycache_prefix` and `MPLCONFIGDIR` in `Library/Caches` stay inside. Fix:
  - Row 3's mitigation names the MPL-2.0 text and parso.
  - s3.7 adds one row-8 test: a jedi completion with `InterpreterEnvironment` that makes no spawn attempt. `jedi/api/environment.py` imports `jedi.inference.compiled.subprocess` at module level. The import is fine; a spawn would raise.
- **L4. The static strip scan misses dynamic imports.** `pkg_measure --stripped` sees literal imports only. A grep of the unpacked set (outside `third_party`) found four `importlib.import_module` calls with computed names, all in charset-normalizer: `encodings.*` and the cjkcodecs providers. None of them is stripped. Keep the grep as a second check in the pipeline.
- **L5. `pkg_measure.py` gaps.**
  - (a) It skips RECORD paths that begin with `../` or `/` but not a `..` in mid-path (`a/../../x`), so it can read a file outside `--site`. It only reads, so the risk is a wrong number, not a write.
  - (b) It measures and scans RECORD-listed files only, so a member missing from RECORD is invisible to it. `pkg_verify.py`'s RECORD check covers that gap.
  - (c) `ast.parse` can raise `RecursionError`, which is not caught.
  - (d) s3.9's command runs it without `-I`.
  - Fix: refuse any `..` part, catch `RecursionError` as "unparsable", and run it with `-I`.
- **L6. pyflakes ships its own test package** (`pyflakes/test/`, which uses `subprocess`). It is small and harmless on iOS. Leave it, by the same no-local-patch reasoning s2.1 gives for django-stubs.
- **L7. Typo.** s2.3 has "read by parso on demand by parso on demand".

## Board lines added

- T-0280 Pernille, P0: B1 into the T-0275 proposal and the manifest (`build` tier), plus s3.1's correction line.
- T-0281 Ines, P1: B2 assignment (the package stage step plus the Xcode phase, by Day 9), then the ADR-003 chair line on S1-S4 and s4.2's questions.

## Files

- `tools/pkg_verify.py`, `tests/pkg_verify_test.py` (new). The re-fetch, hash, RECORD and native check that s3.9 ran by hand. T-0243 can call it, and T-0275's wrapper can reuse `verify()`.
{% endraw %}

</div>
