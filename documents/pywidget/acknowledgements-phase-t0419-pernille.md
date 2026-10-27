---
layout: "default"
title: "C13 review: Acknowledgements resources and the &quot;Acknowledgements check&quot; phase (T-0419)"
section: "documents"
description: "I chose that seed because it does not repeat any of the author&#x27;s cases. An app_packages seed fails earlier, in Install Python packages (pkg_stage), so it never reaches this phase. App/Runtime is a folder reference, so\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/acknowledgements-phase-t0419-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/acknowledgements-phase-t0419-pernille.md</code></span></div><h1>C13 review: Acknowledgements resources and the "Acknowledgements check" phase (T-0419)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Change under review: 367abe7c (Idris, T-0412), pywidget/ios/project.yml: the two copyFiles resource lines (Acknowledgements/ at the bundle root) and the last PyWidget phase, "Acknowledgements check". Reviewed 2026-10-27 06:55-07:05 ET from the diff and the regenerated project.pbxproj; not from the commit or board notes. tools/acknowledgements.py itself is T-0417 (Odalys) and was not under review.

**Verdict: pass.** No fixes needed.

## Runs (Debug, iPhone 17e Simulator, `-derivedDataPath build/dd-t0419`, after `xcodegen generate`)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Runs (Debug, iPhone 17e Simulator, -derivedDataPath build/dd-t0419, after…, scrolls sideways" style="--tw:937px" markdown="1">

| Run | Result | Log |
|---|---|---|
| `clean build` | BUILD SUCCEEDED, with the 3 expected gap warnings (mpdecimal, hacl, mimalloc) | ops/runs/xcodebuild-20261027-065527.log |
| Seeded: an untracked `pywidget/ios/App/Runtime/LICENSE` (one line of text), incremental `build` | BUILD FAILED; the failing command is `PhaseScriptExecution Acknowledgements\ check`. Errors: `unclaimed Runtime/LICENSE in the app matches no notice`, `unclaimed pywidget/ios/App/Runtime/LICENSE is a licence file in the app sources`, and `stale` audit.json | ops/runs/xcodebuild-20261027-065617.log |
| Seed removed, incremental `build` | BUILD SUCCEEDED, 3 gap warnings; the folder-reference copy dropped the stale Runtime/LICENSE from the app | ops/runs/xcodebuild-20261027-065640.log |

</div>


I chose that seed because it does not repeat any of the author's cases. An `app_packages` seed fails earlier, in Install Python packages (pkg_stage), so it never reaches this phase. App/Runtime is a folder reference, so it copies every file and has no pkg_stage-style filter. That makes this phase the only thing between a vendored licence there and the store. Reverted: `git status` shows no change under pywidget/ios/App.

Every build exited on its own; xc_wait did not have to stop one.

## Checked

- **Resource lines.** The generated project has a PBXCopyFilesBuildPhase with `dstSubfolderSpec = 7` (Resources) and `dstPath = Acknowledgements`. Both files are in the built app at `PyWidget.app/Acknowledgements/` (91415 B and 88441 B), and `cmp` with the repo's .txt is equal.
- **Phase order.** "Acknowledgements check" is the last build phase of PyWidget. It comes after Embed Foundation Extensions, Embed Frameworks and every install phase. In the log it runs right before the final CodeSign (065527, line 5200, then CodeSign at 5836). So it sees the bundle as it will be signed, with the appex in PlugIns/.
- **Can Xcode skip it?** No. With `basedOnDependencyAnalysis: false`, the project gets `alwaysOutOfDate = 1` and no inputs or outputs. It ran on both incremental builds above, and Xcode prints no "will be run during every build" warning. Declaring inputs or outputs here would be wrong: the check reads the whole bundle, so any input list would be incomplete and would let Xcode skip a run that matters.
- **Exit status.** `/bin/bash` with `set -o pipefail`, and the pipeline is the script's only command, so the exit status is the tool's even through `sed`. A Python traceback would pass through without an `error:` prefix but would still fail the phase.
- **Extension target.** The phase is not in PyWidgetExtension, and it should not be. The appex ships only inside PyWidget.app. The app's phase runs after the appex is embedded, and the tool walks `PlugIns/*.appex/Frameworks` and the whole bundle for licence files. A copy in the extension would have to point `--app` at the appex. That bundle has no Acknowledgements/, so the check would always fail on app_copy.

## Notes (no action in this change)

- After 2026-11-02 the three gap warnings become failures in every build, Debug included (the tool's rule, T-0417). Debug builds will stop on that date unless the three notices are read before then.
- The tool checks linked libraries only for framework binaries. A static library linked into the app or appex executable would not show up. That will matter at the native-wheel stage (ADR-003 s3), not before, and I will cover it there.
{% endraw %}

</div>
