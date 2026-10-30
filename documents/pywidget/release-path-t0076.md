---
layout: "default"
title: "Release path proof (T-0076, Idris, 2026-10-30)"
section: "documents"
description: "Result: a signed placeholder archive was made with automatic signing on team 9VYY4TNQ75. No upload, no App Store Connect action, no export."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/' | relative_url }}">← Build Plan</a><a href="{{ '/documents/pywidget/release-path-t0076.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 9 · Fri Oct 30</span><span><code>ops/plans/pywidget/release-path-t0076.md</code></span></div><h1>Release path proof (T-0076, Idris, 2026-10-30)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Result: a signed placeholder archive was made with automatic signing on team 9VYY4TNQ75. No upload, no App Store Connect action, no export.

Archive (kept outside the repo, worktree removed): [local folder]
Placeholder sources (project.yml, Sources/App.swift): [local folder] (bundle id app.pywidget.placeholder, not the real app's id).

Why a placeholder: the real app's Release build fails on purpose until the privacy URL exists (T-0497 N7, #98 2A).

## Commands (from the repo root, in a detached worktree at HEAD)
```
git worktree add --detach [local folder]
# project.yml: DEVELOPMENT_TEAM 9VYY4TNQ75, CODE_SIGN_STYLE Automatic, PRODUCT_BUNDLE_IDENTIFIER app.pywidget.placeholder, GENERATE_INFOPLIST_FILE YES
xcodegen generate            # in the folder holding project.yml
tools/xc.sh -project <dir>/Placeholder.xcodeproj -scheme Placeholder -configuration Release \
  -destination generic/platform=iOS -archivePath <dir>/out/Placeholder.xcarchive \
  -allowProvisioningUpdates CODE_SIGN_IDENTITY="Apple Development" archive
```
Output: ARCHIVE SUCCEEDED, about 15 s, no prompt, no keychain access by us.

## Check
`codesign -dvv <archive>/Products/Applications/Placeholder.app` shows:
- Identifier=app.pywidget.placeholder
- Authority=Apple Development: <account holder> (N9WXVN3X65), then Apple Worldwide Developer Relations CA, Apple Root CA
- TeamIdentifier=9VYY4TNQ75
`codesign --verify --strict` passes. The archive's Info.plist records the same SigningIdentity and Team.

## For T-0077 (upload.sh via -exportArchive)
- The archive is an Apple Development one. An App Store upload needs distribution signing: use an ExportOptions.plist with method app-store-connect, teamID 9VYY4TNQ75, signingStyle automatic, and -allowProvisioningUpdates; Xcode then fetches/creates the Apple Distribution certificate. That may need an Investor sign-in or a certificate approval; this task did not test it.
- The real archive should use the same flags, with the real project and scheme, once LegalLinks is set.
- The placeholder created the App ID app.pywidget.placeholder in the developer portal through automatic signing; it is unused and harmless.

## T-0077 result (Odalys, 2026-10-30): export works, no upload
Tool: tools/upload.sh (usage line inside; test: tests/upload_test.sh, 13 checks, no Xcode). Default is export to a local folder; the upload destination is written to ExportOptions.plist only when `--upload` is passed. `--upload` was not used.

Run on the placeholder archive:
```
tools/upload.sh --archive [local folder] --out [local folder]
```
Output: `** EXPORT SUCCEEDED **`, exit 0, no prompt, no Investor sign-in needed. Folder <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> Placeholder.ipa, DistributionSummary.plist, Packaging.log, ExportOptions.plist (method app-store-connect, destination export, team 9VYY4TNQ75, automatic signing).

Signing of the app inside the .ipa (`codesign -dvv`, redacted): Identifier=app.pywidget.placeholder; Authority=Apple Distribution: <account holder> (9VYY4TNQ75), then Apple Worldwide Developer Relations CA, Apple Root CA; TeamIdentifier=9VYY4TNQ75; `codesign --verify --strict` passes.

So the Apple Distribution certificate exists or was created by Xcode's automatic signing during this export (we did not check or touch the keychain). Account holder may want to see it in the developer portal.

Remaining (not done, by design): the real upload (`--upload`) is untested; it needs the app record in App Store Connect and Investor review of the store page (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>). The real app still needs LegalLinks set before its Release archive builds.
{% endraw %}

</div>
