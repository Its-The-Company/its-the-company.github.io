---
layout: "default"
title: "T-1036: review of the plain editor targets (branch idris/t0642-plain-targets, 03177eef)"
section: "documents"
description: "Superseded for d3a5bc94: see &quot;Delta read, 2026-11-02&quot; at the end. F4 below was wrong."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0642-plain-targets-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0642-plain-targets-review-pernille.md</code></span></div><h1>T-1036: review of the plain editor targets (branch idris/t0642-plain-targets, 03177eef)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. Independent review, Commandment 13. Base 8701e80d; main is 20 commits past it and none of them touches `pywidget/ios/project.yml`. Read from the diff first, ADR-004 s7 only afterwards, for what it promised.

**Superseded for d3a5bc94: see "Delta read, 2026-11-02" at the end. F4 below was wrong.**

**Verdict: NO-GO to land 03177eef as it stands.** The design <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>. The first thing that broke was a host test, and the second problem is that no plain target has ever been built for a device. Land when F1 and F4 are fixed and the one Xcode run behind F2 and F3 comes back clean. Nothing here needs a redesign.

How it was read: no Xcode build and no Simulator. `git archive` of both commits into scratch, `xcodegen generate` on each, the two `project.pbxproj` files compared target by target, Xcode 27.1's own `.xcspec` files, the app copies still on this disk (all SwiftPM builds), and the host tests. `tools/acknowledgements.py`, its test, `macbook_runner_test.py` and `test_bundle_runtime.py` ran on the branch in scratch.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Findings, scrolls sideways" data-n="1" style="--tw:1320px" markdown="1">

| ID | Severity | Where (at 03177eef) | Finding | Fix |
| --- | --- | --- | --- | --- |
| F1 | **High** | `tests/macbook_runner_test.py:435, 453-462`; `fetch_editor.sh` | The branch turns this suite red. Base: PASS 143, FAIL 0. Branch: PASS 142, FAIL 1, "fetch_editor.sh --offline builds Vendor from the cached tarballs". The check still wants `Runestone/Package.swift` and `TreeSitterLanguages/Package.swift`, and line 457 opens the manifest this branch deletes (short-circuited today, so it fails rather than crashes). This is the runner's own suite, so landing puts a second certain red next to `testProgressSmallReadsItsTimeLeftInOneLine`. | Expected file list without either manifest; assert that neither appears in `Vendor/`. |
| F2 | Medium (gap, not a defect) | whole branch | Nothing on the branch has been compiled or linked for `iphoneos`. Every figure in ADR-004 s7 is a Simulator build, and `EditorBench`'s Release is not an install build. Main has a signed Debug device build behind it (T-0756) and no archive I can find. See "Archive and 27.2" below for what one run must read out. | One generic-iOS Release build of 03177eef, then `archive`. |
| F3 | Medium (gap) | `Metadata.appintents`, app and extension | Still not read for the spike: no plain-target build survives. What I could read points at noise in Apple's tool, not at the branch, but it does not close the question. See "The Metadata.appintents diff". | Compare one Release build of each commit, order ignored, both bundles. |
| F4 | **Withdrawn 2026-11-02: this finding was wrong, see Delta read** | `pywidget/ios/project.yml:213-215` | The comment says "dead stripping still applies". It doesn't. `DEAD_CODE_STRIPPING` is not in `project.yml`, not in the generated project for any target or configuration, and not in XcodeGen 2.46's presets; Xcode's default is NO (`Ld.xcspec:538`, `CoreBuildSystem.xcspec:1613`). So there is no `-dead_strip` on the link, and `-all_load` keeps every member of every static archive on the app's link line, not only the five editor libraries. The measured binary went down, so nothing has regressed, but that measure is the Simulator's link line, not the device's. Any static archive added later comes in whole. XcodeGen also added `-ObjC` to the same setting, unasked. | `-force_load` the five libraries by path, or keep `-all_load` and correct the comment. `DEAD_CODE_STRIPPING: YES` is a separate decision with its own measurement; don't fold it in. |
| F5 | Low (read from specs, not observed) | `project.yml:36` (`editorVendored`) | An archive may strip the editor's debug info before the app links it. `ProductTypes.xcspec` gives static libraries `AlwaysPerformSeparateStrip = YES` and `STRIP_STYLE = debugging`; `STRIP_INSTALLED_PRODUCT` defaults to YES and bites under `DEPLOYMENT_POSTPROCESSING`, which an archive sets and `EditorBench` doesn't. If that happens, the dSYM holds nothing for Runestone and crash reports from the editor stop at addresses. Users see no change; we lose the crash report. | Read the dSYM from F2's archive. If the editor is missing, `STRIP_INSTALLED_PRODUCT: NO` in `editorVendored`. |
| F6 | Low | `tools/acknowledgements.py:360` | `f"{vendor}/" in l` misses `- path: Vendor/Vend`, with no trailing slash. That reads as not bundled, the notice drops out of the app, and no check complains, because the `Vendor/` scan sees the folder as claimed. The branch's own lines all carry a longer path, so nothing is wrong today. The failure is silent and it is the failure this tool exists for. A trailing comment on a code line counts as a build line, which errs the safe way. | Match the folder at a path boundary; add the no-slash case to test 4b. |

</div>


**Notes, no work asked.** (N1) `SWIFT_INCLUDE_PATHS` at project level (`project.yml:25`) puts the editor's folder on the widget extension's compile line. It changes no code I can find; scoping it would make "the extension is untouched" true by construction. (N2) `knownRegions` goes from 2 to 18 because XcodeGen now sees the `.lproj` folders. They sit inside the resource bundle, so the app's root gains no language and the store listing's languages should not move. (N3) XcodeGen set `INFOPLIST_FILE` on the static `Runestone` target to `Documentation.docc/Info.plist`, despite the exclude. Harmless. (N4) `fetch_editor.sh:88` still says "What upstream's Package.swift names", and `Tests` is copied though nothing builds it. (N5) `ResourceBundle.swift` drops SwiftPM's build-path fallback, and the test bundle no longer carries its own copy of the two bundles. Both are fine while `PyWidgetTests` is hosted, because `Bundle.main` is the app.

## Does anything the app ships change?


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Does anything the app ships change?, scrolls sideways" style="--tw:960px" markdown="1">

| Item | Result | How I know |
| --- | --- | --- |
| Targets embedded | No change. Python and the extension as before; 5 static libraries, 0 embedded frameworks added | pbxproj compare |
| The two bundles | Same names, root of the app, through Copy Bundle Resources. Upstream's manifest matches on `_DARWIN_C_SOURCE`, `c11`, header paths, sources and resources | pbxproj against `Vendor/Runestone/Package.swift` and the deleted manifest |
| Info.plists, entitlements, privacy manifests, extension point | No target-level difference on `PyWidget` outside dependencies and `OTHER_LDFLAGS`; none at all on `PyWidgetExtension`, `PyWidgetTests`, `PyWidgetUITests` | pbxproj compare |
| Bundle Info.plist | The custom plist gives SwiftPM's keys; the surviving SwiftPM bundle has no `CFBundleExecutable`. `MinimumOSVersion` 15.0 there, 18.0 claimed for the spike | surviving bundle read; spike's value is ADR's, no spike bundle left |
| Bundle signature | Not a difference: SwiftPM's bundles are signed too (`_CodeSignature`, ad hoc on the Simulator), 24 and 7 files on disk, 4 of each in `_CodeSignature`, so ADR's "20 and 3" must leave those out | surviving bundle, `codesign -dv` |
| SwiftPM objects | 0 package references, 0 product dependencies | pbxproj |
| Licence notices | Identical. 42 bundled, 0 failures, `audit.json`, `Acknowledgements.json` and `.txt` byte-equal between base and branch; `acknowledgements_test.py` PASS 131, FAIL 0 | run in scratch |
| Binary | Measured by Idris, not by me. The iOS 15 to 18 reading fits: Runestone's `UIMenuItem` code is the legacy menu path | `EditMenuController.swift` |

</div>


`check_app` reads Frameworks and licence files, not static code or `.bundle` folders. That blindness is old, but the Vendor scan is now the only reverse check for the editor. It holds as long as `Vendor/` is on disk, which any build needs.

## The widget extension's size and memory

By reading, neither figure can move. Its sources (`Widget/`, `Shared/`) are outside the diff, it imports no editor module, its target settings and phases are identical, and `-all_load` and `-ObjC` are set on `PyWidget` only. The only thing that reaches it is N1's search path. But s7's table has no extension row. Nobody has measured the appex on the spike, so this is a reading, not a measurement. F2's run should settle it: appex Mach-O bytes, HEAD against spike.

## The Metadata.appintents diff

No spike build survives, and I was told not to make one, so I read what exists: 18 `PyWidget.app` copies on this disk that carry `RunScriptWithInputIntent`, every one a SwiftPM build (no `EditorResourceBundleName` in the binary; several are the same build, installed and in derived data).

1. **The `actions` block is not stable on SwiftPM alone.** `actions.RunScriptWithInputIntent.parameters[1].resolvableInputTypes` has three elements, and all six possible orders are on disk (counts 8, 4, 2, 2, 1, 1). `@Parameter(title: "Input") var text: String?` has not changed. It behaves like a Swift `Set`.
2. **Order is the only difference.** Sorted, seven builds with the same four actions were equal except for one field: `ChooseWidgetIntent.visibilityMetadata.isDiscoverable`, false in one build. That build's date and a <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> edit (`static let isDiscoverable = false`, 756f5739) line up, so it is a source change, not noise. Byte-compare any two of these and you see what s7 reports: a difference in `actions` with no path in it.
3. **The branch has no way in that I can find.** The metadata processor reads the app target's Swift; that target's sources are unchanged, and no vendored source mentions AppIntents.

My reading: the block Idris saw differ is almost certainly this array. I can't prove it was that array in his pair, because both builds are gone. One more thing varies with no spike involved: `nlu/` and `root.ssu.yaml` are in some builds of `Metadata.appintents` and not others, so compare the folder listing as well.

The check that closes F3, on one Release build of each commit, app and extension, `extract.actionsdata`:

```python
import json, sys
def norm(o):
    if isinstance(o, dict): return {k: norm(v) for k, v in o.items()}
    if isinstance(o, list): return sorted((norm(x) for x in o), key=lambda x: json.dumps(x, sort_keys=True))
    return o
a, b = (norm(json.load(open(p))) for p in sys.argv[1:3])
print("same" if a == b else "DIFFERENT")
```

"same" means only order moved; then read the raw diff once to confirm it is confined to `resolvableInputTypes`. "DIFFERENT" is a finding: stop and read it.

## Archive and 27.2: what stays unproven

Release differs from Debug in ways the spike has partly shown: `-O`, whole-module, a real executable instead of the debug dylib, no `#if DEBUG` in Runestone. `EditorBench` covered those on the Simulator. It did not cover:

- **The device slice.** arm64 `iphoneos` compile of five libraries, and the device link line with `-all_load`.
- **Device binary size.** The 7,520,352 B is a Simulator figure.
- **Signing the two bundle targets.** `CODE_SIGNING_ALLOWED` is YES for `product-type.bundle`, the project default identity is `-`, and the iOS SDK sets `AD_HOC_CODE_SIGNING_ALLOWED` NO. T-0757's command line passes an Apple Development identity and that should carry them: they need no profile, by the spec. SwiftPM's bundles went through this in T-0756; plain ones never have.
- **`tools/upload.sh:58-59`, on HEAD too.** It passes the team and `CODE_SIGN_STYLE=Automatic` but no identity, unlike T-0757's line. If `archive` refuses on the identity, that is this and not the branch. I have not run it.
- **`SKIP_INSTALL`.** Set on all seven targets, and no target has a headers phase, so I expect an iOS App Archive and not a Generic one. Expected, not seen.
- **Strip in an archive** (F5), **`uploadSymbols`**, and **export validation** of the two nested bundles.
- **Xcode 27.2.** Nothing has run on it. Nothing here is version-specific that I can name, and that is all I can say.
- **The sandboxed job.** Odalys's step, and it depends on none of the above.

One run reads out most of this. The T-0321 command against 03177eef (`CODE_SIGNING_ALLOWED=NO`) proves the link. Then `archive`, and from it: archive type, app and appex Mach-O bytes, `dwarfdump` of the dSYM for a Runestone symbol, `_CodeSignature` in both bundles, F3's compare. Any change to `project.yml` after this review comes back to me as a delta read before landing.

## ADR-004 s7 claims, checked


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: ADR-004 s7 claims, checked, scrolls sideways" style="--tw:640px" markdown="1">

| Claim | Result |
| --- | --- |
| No `Package.swift` runs; project has no package dependency | Holds (pbxproj) |
| Five static libraries, two bundles with SwiftPM's names | Holds |
| `acknowledgements.py` sees what it saw | Holds, byte-equal output |
| Same C flags, same `-O` | Language standard and defines hold against the manifest; the Release compile lines I could not read then (read in the Delta read: they hold) |
| `fetch_editor.sh` gives the same files by all three routes | Script diff is the manifest copy and comments only; the host test for it is what F1 broke |
| "dead stripping still applies" (`project.yml`, not s7) | True. I wrote False here; F4 was wrong, see Delta read |
| `Metadata.appintents` unexplained | Open (F3) |

</div>


## Delta read, 2026-11-02 (T-1045): 03177eef..d3a5bc94

**Verdict: GO. d3a5bc94 can land on main now, so the MacBook runner can use it.** This is a lower bar than T-1036 set, which asked for a clean archive, and I am lowering it on purpose. No archive can run on either commit until the privacy URL exists (#98 2A), so waiting buys no evidence. I can find no archive of main either, so nothing that works today stops working. Landing ships nothing. It moves the first-archive risk from "SwiftPM, never archived" to "plain targets, never archived", and the commit can be reverted if that archive goes badly. The runner needs the branch now.

The first thing that broke was my own review. F4 was wrong. Details below.

How it was read: the diff first, then the host tests, then `xcodegen` on both commits, then the Xcode SDK's own settings. Idris's evidence came after that. No Xcode build. Nothing in `/private/tmp/company-scratch/T-1038-idris` is taken from his summary where the artefact survives; I re-read the Mach-O files, dSYMs, logs and metadata myself.

### Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Findings, scrolls sideways" data-n="1" style="--tw:680px" markdown="1">

| ID | Status | What I saw |
| --- | --- | --- |
| F1 | **Closed** | `macbook_runner_test.py` on d3a5bc94 in scratch: PASS 144, FAIL 0. Planting the manifest copy in `fetch_editor.sh`, for Runestone and then for TreeSitterLanguages: FAIL 2 each. The check covers `--offline`, the route the runner uses; the clone route copies from the same two lines. |
| F2 | **Half closed** | The device link holds. `ops/runs/xcodebuild-20261102-121110.log` and `-122442.log` link for `arm64-apple-ios18.0` with `-all_load`, `-ObjC` and `-dead_strip`. No archive. See "What stays unproven". |
| F3 | **Closed** | My own compare of `extract.actionsdata`, Release, HEAD against branch: "same" for app and extension. Raw difference in the app: one array, `actions.RunScriptWithInputIntent.parameters[1].resolvableInputTypes`, order only. Extension bytes identical. Folder listings identical. `nlu` differs in one byte of a 7,640 B decompressed file, a timestamp field 72 s apart, which matches the gap between the two builds. Not the branch. |
| F4 | **Withdrawn, my error** | See below. |
| F5 | **Closed for the setting; open for the archive read** | Generated projects differ by 10 lines, all `STRIP_INSTALLED_PRODUCT = NO`: five static libraries, two configurations. Nothing on the app, the extension or the bundles. The log shows 5 library `Strip` steps before the setting (`-121110`) and 0 after (`-122442`). dSYM by my count: 353 compile units, 140 from Vendor; HEAD 377, 140. My F5 said "may"; it did, and Idris caught it by reading the result. |
| F6 | **Closed** | `acknowledgements_test.py`: PASS 136, FAIL 0. Planted: old substring FAIL 3, no leading boundary FAIL 1, no trailing boundary FAIL 1, comment counts FAIL 1. `vendor` in the registry has no trailing slash, so the pattern is sound. The two real components match. |

</div>


### F4, corrected

I said `-dead_strip` was not on the link. It is. `DefaultProperties` in `SDKSettings.plist` sets `DEAD_CODE_STRIPPING = YES` in both `iPhoneOS.sdk` and `iPhoneSimulator.sdk` (Xcode 27.1), and an SDK default sits above the `.xcspec` default I read. I checked `project.yml`, the generated project, XcodeGen's presets and the spec files, and I did not check the SDK or read one link line. The link lines settle it: `-dead_strip` on branch and HEAD in Release, and on the Debug Simulator line of `-092959`.

So the original comment was right about the effect, I told Idris it was false, and aaa131a9 wrote my mistake into `project.yml`. T-1044 cost him a correction commit that was mine to pay for. The comment at d3a5bc94 is true: `-all_load` takes every member of every static archive on that line, the pbxproj shows those are the five editor libraries (Python is an xcframework), and `-dead_strip` runs after it. A later static archive is loaded whole and then dead-stripped; it does not stay whole, as F4 said. No fix owed. `-force_load` is not needed.

### What the app and extension binaries show


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: What the app and extension binaries show, scrolls sideways" style="--tw:854px" markdown="1">

| Item | Branch | HEAD | Reading |
| --- | --- | --- | --- |
| App Mach-O, stripped | 3,759,576 B | 3,843,352 B | 83,776 B smaller. `__text` 2,204,212 against 2,252,692 |
| Appex Mach-O | 685,632 B | 685,632 B | Same but for 16 bytes, which are the `LC_UUID`. The N1 search path changed no code, now measured |
| Bundles | 20 and 3 files, `Assets.car` 36,312 B | same | Same file lists |
| `python/lib` | 11,105,004 B, 54 files | same | Same |

</div>


The worry with `-all_load` is a conformance going missing, so I diffed the dSYM symbols. HEAD has 5 conformance descriptors the branch lacks, all on the imported `NSStringEnumerationOptions`, and 3 type descriptors: that type and two `BundleFinder` (SwiftPM's generated accessor, gone on purpose). The branch adds none. No conformance or type of Runestone's own is lost. I did not trace why the five went; nothing I can find in Runestone asks for them at run time, and the editor's behaviour on a Release build at this commit has not been exercised (below).

Release compile lines, the row I could not read in T-1036: Swift differs by `-enable-bare-slash-regex`, `-suppress-warnings` and `-iquote` on the branch, and `-parse-as-library`, `-DXcode`, `-plugin-path`, the resource-bundle define and localized strings on HEAD. C differs in warning flags only. No difference in `-O` or whole-module on the lines compared.

Merge: `git merge-tree` against main is clean. Main's 22 commits since the base touch none of `project.yml`, `pywidget/ios/scripts`, the licences, the app's sources, the two tests, `tools/acknowledgements.py`, `tools/macbook-runner` or `tools/xc.sh`.

### What stays unproven

Every row is unproven on main too, unless it says otherwise.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: What stays unproven, scrolls sideways" style="--tw:960px" markdown="1">

| Item | State | Proved by |
| --- | --- | --- |
| An archive exists, and it is an iOS App Archive | Not run. Encouraging only: the failed archive of `-122325` put the libraries and bundles under `UninstalledProducts` with nothing installed from them, so `SKIP_INSTALL` is holding | T-1039 |
| Both bundles copied into the app in an archive, through the symlinks that path makes | Not reached: legal links stops `PyWidget` first | T-1039 |
| `_CodeSignature` in both bundles in the final archive | Half. `-122325` shows `CodeSign` of both bundles under an Apple Development identity, for the branch. The files are gone from scratch; this is the log, not the artefact | T-0757 first, T-1039 |
| The Python frameworks signed by the install script in an archive | Not reached. Same on both commits; the editor adds nothing to it | T-1039 |
| dSYM from a real archive | The setting holds under `DEPLOYMENT_POSTPROCESSING=YES`, and `-122325` shows an archive strips the libraries the same way without it. Not read from an archive | T-1042, stays open |
| Export validation, `uploadSymbols` | Not reached | T-1039 |
| Running on a real device | Nothing plain has been installed. Link only, `CODE_SIGNING_ALLOWED=NO`, and the Release app above was built with `PW_EDITOR_BENCH=YES` | **T-0757: needs no privacy URL.** Its next signed Debug device build goes through plain targets. Read `_CodeSignature` in both bundles and open the editor on the phone |
| Xcode 27.2 | Not run | First run on it |
| The sandboxed job | Odalys's step, after landing | Odalys, the next step on T-1045's line |

</div>


**The line that proves the archive is T-1039, once #98 2A is done.** Its "before landing" no longer applies; it stays open with this read-out: archive type; app and appex Mach-O bytes against 3,759,576 and 685,632; dSYM compile units from Vendor, 140 of 140; `_CodeSignature` in both bundles; `codesign` identity across `Frameworks/`; `exportArchive` validation. A failure there is a reason to fix or revert, not a surprise.

### New findings, both not the branch's


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: New findings, both not the branch&#x27;s, scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| ID | Severity | Finding | Line |
| --- | --- | --- | --- |
| F7 | High for the first upload, none for landing | **The privacy URL alone will not unblock `tools/upload.sh`.** Its line, no identity, fails on HEAD at the extension's entitlements, and on the branch at that plus "Ad Hoc code signing is not allowed" on both bundles. Those failures are ahead of the legal links check. With `CODE_SIGN_IDENTITY="Apple Development"` both commits reach legal links. T-1036 flagged this as unrun; it is now observed. The branch adds two more errors with one cause | T-1047 |
| F8 | Medium | One Release build in four failed the stdlib size check: 12,349,440 B on disk against 11,329,536, +9.0%, in `-122442`, with the same cut and zip lines as the passing builds. The next run on the same derived data read 11,321,344 B. Cause unknown; six host zip writes did not reproduce it, and the failing bytes are gone. The scripts involved are not on the branch and the bytes are in `python/lib`, not the editor, so landing does not touch it. Neither the T-1042 commit message nor my brief mentioned this run. It has to be found before an archive trips on it | T-1048 |

</div>


**Notes, no work asked.** (N6) Main's working `Vendor/` still holds both old manifests. With 0 package references they do nothing, and `fetch_editor.sh` replaces both folders on its next run. The runner's job fetches each time. (N7) The new boundary no longer counts `-IVendor/Runestone/include`, with no separator before the path; the old substring did. Nothing in `project.yml` is written that way. (N8) `tests/macbook_runner_mutants.json` has one stale `find`, "T-0323 account: admin allowed": the string is not in `runner.py`, and that file is unchanged on the branch. The mutants file has no row for the new checks; I planted those by hand.
{% endraw %}

</div>
