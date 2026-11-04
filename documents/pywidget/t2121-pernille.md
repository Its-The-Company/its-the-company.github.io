---
layout: "default"
title: "T-2121 review: T-2119 (4947c6e39) and T-2120 (fdff8a916)"
section: "documents"
description: "The two new manifests are right and can go to TestFlight. _ssl and _hashlib really can be aimed at a picked path, and C617.1 + 3B52.1 is the correct pair for both. The App manifest stays at C617.1, and that is still\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2121-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2121-pernille.md</code></span></div><h1>T-2121 review: T-2119 (4947c6e39) and T-2120 (fdff8a916)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Host only (no Xcode, no Simulator). I read the diffs, the shipped binaries and the
guard code. I did not use the authors' done-notes or board notes as evidence. Scratch:
`/Volumes/Company SSD/company-scratch/T-2121-pernille` (copy of pywidget/, Vendor linked to the same
python-3.15.1-ios cache).

## Verdict: approve with findings

The two new manifests are right and can go to TestFlight. `_ssl` and `_hashlib` really can be aimed at a picked
path, and C617.1 + 3B52.1 is the correct pair for both. The App manifest stays at C617.1, and that is still correct:
the only App/Shared Swift with a listed read near a file is `ProjectTransfer.removeOldExports` (on `tmp`), plus
container code in ProjectManifestReader, RunResultSink, LaneGuard and RunLog. None of it touches a granted file.

The widened App guard does <span title="A test written in advance. If it fires, we drop the idea.">kill</span> all ten of the author's mutants. My own mutants got four survivors through it (F1, F2,
F4, F5). One more was killed for the wrong reason (F3). None of these changes what ships today. They are holes in the
guard that protects the next change, so they need fixing but do not block the build.

Findings: 0 High, 2 Medium, 3 Low, 1 Info. No security weakness, so nothing is held.

## T-2119: what I checked against the binaries

- **Sweep.** I ran my own `nm -u -j` regex over all 204 `lib-dynload/*.so` (68 modules x 3 slices: ios-arm64,
  sim arm64, sim x86_64), covering the file-timestamp, disk-space and boot-time C symbols plus the Foundation names.
  Only three modules hit: `_ssl` (`_fstat _lstat _stat`), `_hashlib` (`_fstat _stat`) and `_remote_debugging`
  (`_fstat`), the same in every slice. This matches `t2119-openssl-picked-paths.txt`.
- **Static OpenSSL.** `otool -L` shows only `Python.framework` and `libSystem` for both modules. `_ssl` carries
  "OpenSSL 3.5.9 29 Sep 2026", so each module holds its own copy, and its own config-load state.
- **Upstream manifests.** All six `lib-dynload/_ssl.xcprivacy` / `_hashlib.xcprivacy` declare C617.1 only.
  `install_stdlib.sh:63-71` copies every `Privacy/Frameworks/*.xcprivacy` over them after `install_python` and
  re-signs. The new files pass `plutil -lint`.
- **by_dir route (_ssl).** I built a call graph with `otool -tV`. `__ssl__SSLContext_load_verify_locations` calls
  `SSL_CTX_load_verify_locations`, which calls `X509_STORE_load_path`, which calls `X509_LOOKUP_hash_dir`. The stat
  callers are `get_cert_by_subject_ex` (stat x2, lstat x3), `file_open` (x2), `process_include` (x1),
  `SSL_add_dir_cert_subjects_to_stack` (x1), and the rand pool (fstat). This matches the record.
- **OPENSSL_CONF .include route (_hashlib).** `def_load_bio` calls `process_include` and `ossl_safe_getenv`.
  `process_include` is the only config-path stat caller in `_hashlib`. Many functions load the config:
  `OPENSSL_init_crypto` is called with `w0 = 0x40` (LOAD_CONFIG) from `ossl_method_store_fetch`,
  `ossl_ctx_global_properties`, `OBJ_*` and others. So any first EVP fetch loads it, not only
  `ossl_provider_doall_activated`, and the route is wider than s4b says, though in the same direction. Declaring
  3B52.1 for `_hashlib` is right. It overturns T-2118's C617.1-alone expectation, and I agree.
- **Verdict rows.** `EXTENSION_VERDICTS` matches the sweep exactly. `_remote_debugging` is `stripped` in
  `runtime/stdlib-manifest.json`. On my scratch copy, `test_user_granted_files` ran 7 tests, all OK, with nothing
  skipped (the xcframework was present).

## T-2120: mutant results

The author's runner, rerun on my scratch copy (`mutants-rerun.txt`): unmutated guard passes, M0 SURVIVED as
expected, and M4, M5, M5b, M6, M6b, M7, M8, M9, M10 and M11 all KILLED as expected. This matches
`t2120-guard-mutants.txt`.

My mutants (`my_mutants.py`, `my-mutants.txt` in scratch; each one is applied, run and reverted, and the copy is green
again after the last):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: T-2120: mutant results, scrolls sideways" data-n="1" style="--tw:646px" markdown="1">

| id | seeded change | should be | got |
|----|---------------|-----------|-----|
| P1 | file-level opener `stampScope(u)`; a caller in ProjectsView reads `.creationDate` (control for P2) | KILLED | KILLED |
| P2 | P1 with `private let probe = Box(make: { 0 })` just before the opener | KILLED | **SURVIVED** (F1) |
| P3 | `withPickedScope(u, body)` calls `access(u)`; its caller reads `.creationDate` inside the closure | KILLED | **SURVIVED** (F2) |
| P4 | an `init(_ u:)` opens the scope; `stampHeld` builds `PickedScope(u)` and reads `.creationDate` | KILLED | KILLED, wrong reason (F3) |
| P5 | readPicked: `resourceValues(forKeys: [URLResourceKey(rawValue: "NSURLCreationDateKey")])` | KILLED | **SURVIVED** (F4) |
| P6 | readPicked: `Darwin.lstat(url.path, &st)` | KILLED | **SURVIVED** (F5) |
| P7 | readPicked: raw multi-line string `#"""` with unbalanced `{`, `}}` and `\#(url.path)`, then `[.creationDate]` | KILLED | KILLED |
| P8 | `extension SystemFiles { func touch }` in ProjectsView calls `access(u)` and reads `.contentModificationDate` | KILLED | KILLED |

</div>


The string blanking holds up against raw and multi-line strings with interpolation (P7). Cross-file callers and
extensions work (P8).

## Findings

**F1 (Medium) A unit after an unbalanced `)` loses its name, so its callers are never followed.**
`pywidget/tests/privacy/test_user_granted_files.py:163-173`. `members()` splits on every `{`, including braces inside
parentheses. These cases leave a `)` or `,` in the next header:

- a closure argument (`let x = Foo(make: { ... })`)
- a default-closure parameter (`firstFrame: ... = { ... }`)

The "keyword outside parentheses" test then rejects the next `func`/`var`, and the unit's name is `None`. Nothing
reaches a `None` unit by name (line 197), and `openers` drops `None`. An opener declared after such a member therefore
has no traced callers (P2 survives). In the real tree, 21 units in 12 App/Shared files are already unnamed. Examples
are LocationCall `status()`, ProPaywallView `body`, and functions in ProStore, ExtensionLane and RunLogStore that
have default-closure parameters. None of them opens a scope today. The sanity set at lines 240-243 protects only nine
names. Fix: track paren depth while matching braces, and treat a `{` at non-zero paren depth as part of the enclosing
header or body instead of a sibling unit. Add P2 and a default-closure-parameter opener as mutants.

**F2 (Medium) Only one level of callers is traced.** `test_user_granted_files.py:186-190`. A wrapper that calls
`access()` and runs a closure (`withPickedScope(url) { ... }`, the usual Swift shape for a scoped resource) is
picked, but its caller, where the closure body and the read actually are, is not (P3 survives). The same-file
fixpoint (lines 192-199) only adds units that picked units name. It never adds callers of picked units. Fix: run the
caller step to a fixpoint as well (callers of any picked named unit, across App and Shared), or treat a picked unit
that takes a closure parameter as an opener. Add P3 as a mutant.

**F3 (Low) An `init` opener is named "init", which over-matches and under-matches at once.**
`test_user_granted_files.py:172-173, 189`. The call regex becomes `\binit\s*\(`. That matches every `.init(` and
`super.init(` in App and Shared: with P4's holder type added, 116 extra units in 19 files are pulled in, including
RunLogStore's container reads. That is a false red that pushes toward a wrong 3B52.1 in the App manifest. Meanwhile
the real caller `PickedScope(u)` is not traced. On P4's code alone, `scope_units` returns only `init`, not
`stampHeld`. The same applies to `deinit`, `subscript`, and operator `func`s (which get the name "func").
Fix: name an `init` by its enclosing type and match `Type(` / `.init(` on that type, and skip unnamed keywords as
helper names.

**F4 (Low) Blanked strings hide raw-value keys.** `test_user_granted_files.py:144, 174`. Units are cut from
`swift_code()` output, so `tms.uses` never sees `"NSURLCreationDateKey"` / `"NSFileModificationDate"` inside
`URLResourceKey(rawValue:)` / `FileAttributeKey(...)` (P5 survives). Blanking keeps offsets, so the fix is cheap:
match braces on the blanked text, but pass the same slice of the comment-stripped original to `tms.uses`.

**F5 (Low, matcher predates this diff) Module-qualified C calls are not seen.**
`pywidget/tests/privacy/test_manifest_sources.py:49`. The lookbehind `(?<![\w.])` skips `Darwin.lstat(` and
`Darwin.stat(`, so P6 survives here and in `target_uses` for every target. The binary scan in `privacy_scan.py`
still sees the `_lstat` import, so the category is still caught. The reason-level guard is not. Fix: allow `Darwin.`,
`Glibc.` and `Foundation.` before the name.

**F6 (Info, wording) `_ssl` is reachable by more routes than s4b names.** `pywidget/docs/release/privacy-label.md:121`
and `pywidget/ios/Privacy/Frameworks/_ssl.xcprivacy`. `ssl.create_default_context()` calls
`load_default_certs` and `set_default_verify_paths`, which calls `X509_STORE_set_default_paths_ex`. That function adds
`X509_LOOKUP_hash_dir`, whose `dir_ctrl` reads `X509_get_default_cert_dir_env` (SSL_CERT_DIR), and
`X509_LOOKUP_store`, whose `by_store_ctrl_ex` calls `OSSL_STORE_open_ex` and then `file_open`, which stats
(SSL_CERT_URI). A script that sets `SSL_CERT_DIR` to a picked folder reaches the same stats as `capath=`, through
the most common TLS entry point. Also, `OPENSSL_CONF_INCLUDE` steers `.include` (s4b line 122). The declared reasons
already cover all of this, so no manifest change is needed. Only s4b and the manifest comments should name these
routes, so that nobody later "narrows" the manifest on the strength of `capath=` being rare.

## Board lines

T-2127 (F1), T-2128 (F2), T-2129 (F3), T-2130 (F4), T-2131 (F5), T-2132 (F6), all owner Idris.
{% endraw %}

</div>
