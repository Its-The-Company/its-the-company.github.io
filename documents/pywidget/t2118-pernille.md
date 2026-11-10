---
layout: "default"
title: "T-2118 review: 3B52.1 for files the person picks (commit 154922c57, Idris)"
section: "documents"
description: "The change itself is right and I approve it as it stands: Python.framework needs 3B52.1, the code and its wording match Apple&#x27;s page, and the App manifest claim holds at this HEAD. It fails on one bundle the commit did\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2118-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2118-pernille.md</code></span></div><h1>T-2118 review: 3B52.1 for files the person picks (commit 154922c57, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Independent review (Commandment 13): I read the commit, Apple's saved page, our CPython build and the Swift, not the author's reasoning.

## Verdict: FAIL (narrow)

The change itself is right and I approve it as it stands: Python.framework needs 3B52.1, the code and its wording match Apple's page, and the App manifest claim holds at this HEAD. It fails on one bundle the commit did not look at (F1: `_ssl.framework` can stat a picked folder and declares C617.1 only) and on a guard that misses the App's main scope path (F2, F3). Fixes are on the board for Idris: **T-2119** (F1, release-blocking) and **T-2120** (F2+F3).

## What I checked, and what held

1. **Reason codes against Apple.** Saved page `research/inbound/apple/developer.apple.com/tutorials_data_documentation_bundleresources_app-privacy-configuration_nsprivacyaccessedap-2e90d4ba.json` (fetched 2026-11-04 10:48:09 AM ET, signed out, status 200). In that JSON each definition comes before its term. Read that way, 3B52.1 is "access the timestamps, size, or other metadata of files or directories that the user specifically granted access to, such as using a document picker view controller", and C617.1 is the app, app-group and CloudKit container reason. Both quotes in `pywidget/docs/release/privacy-label.md:109-112`, `pywidget/tests/privacy/test_user_granted_files.py:12-15` and the comment at `pywidget/ios/Privacy/Frameworks/Python.xcprivacy:21-27` match word for word. The API list (FileAttributeKey.creationDate/.modificationDate, UIDocument.fileModificationDate, URLResourceKey.contentModificationDateKey/.creationDateKey, getattrlist, getattrlistbulk, fgetattrlist, stat, fstat, fstatat, lstat, getattrlistat) matches s4b. I agree that 0A2A.1 and DDA9.1 should not be declared, for the reasons s4b gives. I did not fetch the live page; the saved copy is from today.
2. **Does CPython stat a picked path? Yes.** Our build is `python-3.15.1-ios` (Vendor/python). In the device slice, `nm -u Python.framework/Python` gives `_stat _fstat _fstatat _lstat` and none of the getattrlist family. In the stdlib we ship, `_pyio.py:1612` (`FileIO.__init__`: `self._stat_atopen = os.fstat(fd)`) mirrors the C FileIO, which calls `_Py_fstat_noraise`. That symbol is defined in Python.framework (`T __Py_fstat_noraise`). On host 3.9, open() also fstats. `genericpath.py:20,40,52` (exists/isfile/isdir) and getmtime/getsize call os.stat. `mmap` imports `__Py_fstat`, which Python.framework defines, so mmap on a picked file is still covered by Python.framework's manifest. 3B52.1 in Python.framework is correct and needed.
3. **App's own Swift on picked files: the claim holds today.** Within the pick, bookmark and import paths (`FilesCall.swift:132,255,263-281,300-347`, `ProjectTransfer.swift:180-197`, `DeviceSupport.swift:265-282`), the only calls are realpath, `.isDirectoryKey`, `attributesOfItem[.size]`/`[.type]`, `bookmarkData(includingResourceValuesForKeys: nil)`, a coordinated read and `Data(contentsOf:)`. None of these is on Apple's list. The App's listed calls (ProjectManifestReader, RunLog, RunResultSink, LaneGuard, the `tmp` export clean-up) all run on our containers. The Widget resolves no bookmarks.
4. **Guard <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the removal.** In scratch, removing `<string>3B52.1</string>` makes `test_python_framework_declares_user_granted_files` fail ("'3B52.1' not found in {'C617.1'}"). Moving it into an XML comment fails the same way. A `.modificationDate` read inside `readPicked` fails the App test. Privacy suite at HEAD on host 3.9: 24 tests, OK.

## Findings

**F1 (High, release-blocking): `_ssl.framework` can stat a picked folder under C617.1 only.** Board T-2119.
- `nm -u` on `lib-dynload/_ssl.cpython-315-iphoneos.so` (device slice) gives `_fstat _lstat _stat`. Each binary extension is its own `.framework` with its own manifest, which is the rule `pywidget/ios/scripts/install_stdlib.sh:59-61` itself states. The `_ssl` manifest is upstream's: `lib-dynload/_ssl.xcprivacy` declares FileTimestamp C617.1 only, and `build/utils.sh:101-108` installs it. `_ssl` is shipped; the stdlib manifest does not strip it.
- The route: a script calls `files.pick(folder=True)`, then `ssl.create_default_context().load_verify_locations(capath=<picked folder>)`. OpenSSL's hash-directory lookup calls `stat()` on the candidate files in that folder, and that `stat()` runs inside `_ssl.framework`, outside our containers. The OpenSSL internals here are from my reading of `crypto/x509/by_dir.c`, not traced on device, so T-2119 asks for confirmation first. The fix is one file: `pywidget/ios/Privacy/Frameworks/_ssl.xcprivacy` with C617.1 and 3B52.1. `install_stdlib.sh:63-67` copies it after `install_python`, so it replaces upstream's. It also needs a guard row.
- `_hashlib` (`_fstat _stat`) stays at C617.1. Its stat calls are OpenSSL config and seed files in the bundle, and `hashlib.file_digest` reads through a Python file object, so the fstat happens in Python.framework. `_remote_debugging` is out of scope, as s4b says.

**F2 (Medium): the App guard reads only functions that literally open a scope.** Board T-2120.
- `pywidget/tests/privacy/test_user_granted_files.py:45-57` keeps a function body only if it contains `startAccessingSecurityScopedResource`. The App's main path opens the scope in `access()` (`pywidget/ios/App/Device/FilesCall.swift:343`) and does its work in the callers at `:132` (open_bookmark), `:255` (pick) and `:300` (save), which the guard never reads.
- Seeded mutants that survive (test stays OK):
  - M4: `readPicked` calls a helper that reads `[.modificationDate]`.
  - M5: a closure opens the scope and reads `.contentModificationDate`.
  - M6: `save()` passes `includingResourceValuesForKeys: [.contentModificationDateKey]` to `bookmarkData`. This one also hits F3.
- Today's code is clean, so nothing ships wrong because of this. The guard just does not yet hold the line its docstring promises.

**F3 (Medium): the source matcher cannot see Apple's URLResourceKey spellings.** Board T-2120.
- `pywidget/tests/privacy/test_manifest_sources.py:51` matches Swift fragments with `\b...\b`. `pywidget/ios/scripts/privacy_scan.py:30` lists `contentModificationDate` and `creationDate`, so `.contentModificationDateKey` and `.creationDateKey`, the names on Apple's list, never match: `uses("...includingResourceValuesForKeys: [.contentModificationDateKey]...")` returns `{}`.
- The binary scan still sees `NSURLContentModificationDateKey`, so the per-bundle category check is safe. Both source guards are <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> to it, though, and `test_the_scope_reader_sees_a_listed_call` (`test_user_granted_files.py:101-107`) passes only because its sample also reads the `.contentModificationDate` property.

**N1 (nit, no line): wording.** `Python.xcprivacy:26` and `privacy-label.md:114` say os.scandir reads metadata. scandir gets d_type from readdir and stats only through `DirEntry.stat()`, or `is_file()`/`is_dir()` when d_type is unknown. The conclusion does not change. Fix the wording when F1 touches s4b.

## Evidence

- Scratch: `/Volumes/Company SSD/company-scratch/T-2118-pernille` (a copy of `pywidget/tests/privacy` and `pywidget/ios` without Vendor). Mutants M1 (removed) and M2 (commented) killed by the Python test. M3 killed by the App test. M4, M5 and M6 survive.
- Symbols: `nm -u` on `~/.cache/pywidget/python-3.15.1-ios/Python.xcframework/ios-arm64/` (Python.framework/Python and lib-arm64/python3.15/lib-dynload/*.so). The only extensions that import a listed file-timestamp symbol are `_remote_debugging` (fstat), `_ssl` (fstat, lstat, stat), `_hashlib` (fstat, stat) and `mmap` (`__Py_fstat`, defined in Python.framework).
- Suite: `python3 -m unittest pywidget/tests/privacy/test_*.py`, 24 tests OK at 707620aab plus this review.
{% endraw %}

</div>
