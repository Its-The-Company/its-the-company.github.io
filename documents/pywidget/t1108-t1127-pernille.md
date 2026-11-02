---
layout: "default"
title: "T-1127 review of T-1108 (692bfadb), Pernille"
section: "documents"
description: "Verdict: PASS with one fix (L1) and two Info notes. Read from git show 692bfadb and the files, not Odalys&#x27;s notes. No Xcode."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1108-t1127-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1108-t1127-pernille.md</code></span></div><h1>T-1127 review of T-1108 (692bfadb), Pernille</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Verdict: PASS with one fix (L1) and two Info notes. Read from `git show 692bfadb` and the files, not Odalys's notes. No Xcode.

## What I ran
- `python3 tests/swift_strings_catalog_test.py`, foreground: PASS 17 FAIL 0.
- `python3 tools/swift_strings_check.py pywidget/ios`: 3 findings (concat, verbatim, concat), 56 keys, 0 missing, 0 unused.
- Planted copy in scratch (never in the repo): 12 literals across Text, Button, Label, navigationTitle, alert, help, accessibilityLabel, Section, TextField, LocalizedStringKey(), String(localized:), plus an interpolated one. All 12 reported missing-key; a literal already in the catalog (Cancel) stayed clean; all 56 real keys became unused-key once the real Swift was gone.
- My mutants (scratch copy): (1) unused loop emptied: 3 tests fail; (2) manual exemption removed: 1 test fails. Both killed.

## Checks
1. Xcode shape: sourceLanguage en, version 1.0, strings object, every entry has en stringUnit state translated; %@ and %lld in keys match the values (the test compares specifier lists). Only difference from Xcode's own output is spacing (`"key": {` where Xcode writes `"key" : {`); Xcode reads it and rewrites it on first save. Info I1.
2. User-facing strings caught: yes, see the planted run.
3. Unused-key rule: matches a literal with interpolation to a key through FORMAT_SPEC, per table, so a misspelt key is reported. The manual exemption is the only way to hide an orphan, and no staged entry uses it (0 of 56). Info I2: a manual entry that is really a typo stays silent by design.
4. The 3 left findings are real: PyWidgetApp.swift:998 builds the alert message with `+` around a literal; ProPaywallView.swift:340 `joined(separator: ". ")` is flagged as concat (a separator, arguably not a user-facing fragment: see I3); ReplBar.swift:17 `Text(verbatim: "input()")` is a code token, shown untranslated on purpose. All three are in T-0025's <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>. None is a false positive of the scanner, but the first is the only one that truly needs a Swift change.
5. The word "app" (T-0506): the key `Offered under %@; this app uses it under %@.` and its value (Acknowledgements.swift:326) say "app".

## Findings
- L1 (fix): Acknowledgements.swift:326 and its catalog key carry "this app uses it under". Reword without "app" (Maren, wording), change Swift and catalog key together, rerun the test.
- I1 (Info): spacing differs from Xcode's writer; harmless.
- I2 (Info): have the report list manual-exempt keys, so a typo hidden by the flag is at least visible.
- I3 (Info): ProPaywallView.swift:340 joined(separator: ". ") is a join of VoiceOver parts, not a catalog fragment; consider `// l10n-ok` with a reason when T-0025 lands.
{% endraw %}

</div>
