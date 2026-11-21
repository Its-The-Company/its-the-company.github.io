---
layout: "default"
title: "Review of T-4192 at edacd96d: T-0043&#x27;s escape-test corpus (EscapeCorpusTests.swift)"
section: "documents"
description: "PASS with findings. Each L12 s12 case has a test on the built app and its running Python, and four of the five fail if the escape works: no vacuous pass, controls on every walk, and the STDLIB_MODE skip cannot hide a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4192-edacd96d-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 31 · Sat Nov 21</span><span><code>pywidget/docs/reviews/t4192-edacd96d-odalys.md</code></span></div><h1>Review of T-4192 at edacd96d: T-0043's escape-test corpus (EscapeCorpusTests.swift)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (T-5406, Commandment 13). Author: Idris. Reviewed: e51140f8a2 (T-0043, adds
ios/Tests/EscapeCorpusTests.swift, +272) against T-0043's board line and section 12 of docs/research/L12-security.md;
edacd96d6b carries no code (a board note and a memory file, not read for reasoning). Also read, for what the corpus
meets: ios/scripts/stdlib_cut.py (denylist, `present`, `check`), ios/scripts/install_stdlib.sh and
install_packages.sh (where the check runs), ios/project.yml (STDLIB_MODE per configuration and the build phases),
Shared/TreeView.swift and Shared/TreeRules.swift (the link rule), App/Device/DeviceRouter.swift and
Shared/Bridge/LaneDevice.swift (the two routers), tests/escape/cases.json (E1-E5, the corpus's own case list).
EscapeCorpusTests.swift is unchanged from e51140f8a2 to HEAD (02daf0949c). Paths are under pywidget/ unless they start
with ops/ or tools/. Date: 2026-11-21.

What I ran:
- No Xcode (the Mac mini is held clear under #325; this is a read review). The Simulator evidence is the runner's
  records: ops/metrics/xc.jsonl rows for ops/runs/xcodebuild-20261120-125339.log (T-3847, 2162 executed, 0 failed) and
  ops/runs/xcodebuild-20261121-134714.log (T-4181, whole PyWidgetTests, 2181 executed, 0 failed). In both, all six
  corpus tests passed and none skipped: BridgeTests testEscapeImportCtypesRaisesImportError,
  testEscapeNoTestModuleImportableOrFindable, testEscapeBridgeCallRefusesAnUnknownCapability; EscapeBundleTests
  testNoDenylistNameInTheBuiltBundle, testMeasureBundledExtensionModules, testLinkToAnOutsideURLIsDropped. The rows
  carry no commit hash, so which commit each built is not on record; the file was the same in both.
- Host: `python3 -m unittest pywidget/tests/escape/test_escape.py` (the host half of the corpus, E1-E3 and E5): 19
  tests, OK. `python3 -I pywidget/tests/stdlib/test_stdlib_cut.py`: 54 tests, OK.

## What holds

- The build-phase denylist check is at main and runs in every mode. ios/scripts/install_stdlib.sh:88-97 runs
  `stdlib_cut.py check` after the cut; it fails the build on any L12 denylist name (stdlib_cut.py:36-37, :298-300),
  in the tree, the zip, lib-dynload and Frameworks/, and on a `_ctypes` built into or frozen in the interpreter
  (T-2319). install_packages.sh:76 runs the same check after app_packages is filled. A configuration other than Debug
  refuses anything but zip (install_stdlib.sh:42-45); project.yml:16 and :30 set zip for every configuration. Only Debug
  with STDLIB_MODE=full warns instead of failing.
- The corpus does not lean on that check. It walks the installed bundle itself with its own copy of the denylist, and
  says so (EscapeCorpusTests.swift:11-12: the second witness). If the build check were removed, the corpus would still
  go red on a denylist name.
- Corpus 1 (`import ctypes` raises ImportError, :163-181) pins the exact output, ModuleNotFoundError for each of four
  statements. An import that works prints IMPORTED and fails the equality; a meta_path hook that refuses with a plain
  ImportError (files still present) also fails it, because the class is pinned.
- Corpus 2 (no `_ctypes*` file, :93-110) has controls for each place it reads (`json` from the zip or tree, `_socket`
  in lib-dynload and in Frameworks/, `certifi` in app_packages or site-packages), so an empty answer cannot come from a
  <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> walk; then a depth-unlimited file-name scan for `_ctypes*`. The zip is read from its central directory
  (:44-59), which fails loudly on a bad file rather than returning no names.
- Corpus 3 (no `_test*` importable, :186-226) does what the L12 measurement script says a hook cannot: it imports each
  probe, asks `PathFinder.find_spec` directly (past sys.meta_path), checks `sys.builtin_module_names`, and lists every
  sys.path entry under the app for any denylist name; controls show `_socket` found as a `.fwork` and `_socket` and
  `json` listed. Exceptions other than ImportError propagate and make the run not ok. A probe set that found nothing
  because it read nothing would print `control False ...` and fail.
- The STDLIB_MODE skip (:36-41) does not hide a red. It skips the two bundle tests only on a full build; corpus 1 and
  3 then fail (ctypes importable), so a full test build is never green. A missing STDLIB_MODE file errors.
- Corpus 4 (:231-271) sends eight escape-hatch names (objc, ctypes, subprocess, os.system, keychain.dump_all, the
  empty name, a dotted method, a path-like module) through the app router and the widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s router, the two
  handlers production installs (App/PyWidgetApp.swift:304, Shared/ExtensionLane.swift:724), and with no handler. A
  router that dispatched any of them would return no `error` key and the script would raise, so the run is not ok.
  The lane call in the test omits `script` and `group`, which only change the `lane.refused` and `files.shared`
  paths, neither probed. `_pwbridge` is the bridge's only native module (Shared/Bridge/pwbridge.c:531, :605); L12's
  `_pywidget_native` is an older name for it.
- The measurement L12 asks for is taken (:113-136): 51 extension modules and 51 module frameworks after the cut, 70
  before, with byte counts, in both runner logs.

## Findings

### M1 (Medium): the Link test skips on the very regression it exists to catch, and says item 5 is unbuilt

EscapeCorpusTests.swift:138-140, :145-148 (and the header, :9). If `TreeNodeView.url("https://example.com")` is not
nil, the test throws XCTSkip with "L12 s12 v1 item 5 ... is not built ... No board task builds it yet". But item 5 is
built and was built before this commit: `TreeNodeView.url` is `TreeRules.linkURL` (Shared/TreeView.swift:282, the
same at e51140f8a2), from T-1134, and L12 s12 item 5 says so. So today the skip never fires and the test runs (green
in both logs). If the rule ever regressed to keeping outside URLs, this corpus case would turn into a skip with a
message telling the reader the feature does not exist, not a red. LinkRuleTests and TreeNodesTests
testRefusedDestinationsDrawNoLink would still go red on that regression, so nothing ships unseen today; the harm is
that the corpus case the release drafts cite as "T-0043 Simulator run" (docs/release/rejection-replies-draft.md:36)
is vacuous on exactly its own failure, and its words contradict the code. It also checks the function only, not that
the renderer draws no link (TreeNodesTests does).

Fix: delete the skip and its comment; assert. Correct the header line 9 and the docstring to name T-1134 and
`TreeRules.linkURL`. Optionally read the outside list from tests/escape/cases.json E5 `urls_refused`, as
TreeNodesTests already does. Mutant: `TreeNodeView.url` returning `URL(string:)`; the test must be red, not skipped.
Board: T-5479 (Idris).

### M2 (Medium): corpus 4 leaves out a case its own case list gives this run

EscapeCorpusTests.swift:231-271 against tests/escape/cases.json E4. E4 is the one case the host half lists for "the
Simulator run of T-0043", and its check is three things: "an unknown capability name, a known name with a wrong
argument shape, and an empty name; each must raise, not dispatch". The test covers the unknown names and the empty
name. No call sends a registered capability a payload of the wrong shape (for example `keychain.set` with
`b'[1]'`, `b'not json'` or `b'{"name": 5}'`, `net.request` with `b'{}'`), so that a handler that indexes into a bad
payload, or treats it as defaults and acts, is unwatched here. Every probe today goes to a name that no handler owns,
which is the easy half.

Fix: add a case that sends two or three registered capabilities a wrong-shaped payload through the app router and
assert each reply is an error of the bad-argument kind, with nothing done (no keychain item written, no request sent).
If T-0043 decides that part belongs elsewhere, say so in cases.json E4 so the case list and the corpus agree. Board: T-5480 (Idris).

### L1 (Low): three copies of the denylist, none pinned to the others

EscapeCorpusTests.swift:15-16 and :194-196 hold the denylist by hand; stdlib_cut.py:36-37 holds the build's copy;
tests/escape/cases.json `denylist` holds the corpus's, which the host half reads (test_escape.py:42-43) precisely so
that a stdlib_cut.py that forgets an entry is still caught. The Swift half reads none of them. A name added to
cases.json would be checked on the host and not on the built app. Fix: bundle cases.json into the test target (or
generate the Swift set from it) and use its `denylist`, or add a host test that the Swift literals equal cases.json.

### L2 (Low): the corpus reads a Debug Simulator bundle only

EscapeCorpusTests.swift:34-35 says the test scheme builds zip "as Release must"; that holds at main (project.yml:16,
:30), and the cut and the check are the same code for both. But the corpus has never read a Release or device bundle,
and the check on a device build takes a different size row (`--sizes device`). No change asked; the release drafts
already pair "T-0043 Simulator run" with <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G8</span> on a Release archive, and that pairing should stay: this corpus is not
evidence for the archive by itself.

### L3 (Low): the after-measurement lives only in ignored logs

testMeasureBundledExtensionModules prints the numbers L12 asks for (51 modules, 16,288,151 B in Frameworks/,
11,081,068 B in python315.zip) to ops/runs/*.log, which .gitignore:8 keeps out of the repository. L12 s12 asks for
before and after; the before (70) is in L12, the after is nowhere tracked. Fix: write the after line beside the 70 in
L12 s12 (or the stdlib manifest's notes) with the run it came from.

## Verdict

PASS with findings. Each L12 s12 case has a test on the built app and its running Python, and four of the five fail
if the escape works: no vacuous pass, controls on every walk, and the STDLIB_MODE skip cannot hide a red. The
build-phase denylist check is at main, runs in every configuration, and the corpus does not depend on it. Two Mediums
go to Idris before the corpus is cited for TestFlight or App Review: M1, the Link case skips on its own failure and
says item 5 is unbuilt when it is (T-1134); M2, E4's wrong-argument-shape case is not in the corpus. The Lows can ride
with them.
{% endraw %}

</div>
