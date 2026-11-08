---
layout: "default"
title: "T-3576: review of 52b931b10 (Idris, T-0272 slice 1): the editor theme picker and its catalog"
section: "documents"
description: "Verdict: PASS with findings. Nothing High. What a build 4 tester sees is unchanged: the shipping pro-flags.json has themes.on: false and items: [], so themeState is nil for every id, effective returns .standard, the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3576-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 18 · Sun Nov 8</span><span><code>pywidget/docs/reviews/t3576-pernille.md</code></span></div><h1>T-3576: review of 52b931b10 (Idris, T-0272 slice 1): the editor theme picker and its catalog</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-08. Commandment 13, before build 4 (T-3574). Investor bug #41.
Read: App/Editor/EditorThemeChoice.swift, the RunestoneEngine.swift change, App/Settings/EditorThemePicker.swift,
the SettingsView and ProPaywallView changes, scripts/export_editor_themes.py, Tests/EditorThemeCatalogTests.swift,
tests/editor_themes_test.py, Shared/ProFlags.swift (`themeState`, `proThemes`), runtime/pro-flags.json,
pro-variants/c2-themes.json, docs/design/themes-pro/ (themes.json, themes_pro.py), creative/approved.md items 3 and 5.

**Verdict: PASS with findings.** Nothing High. What a build 4 tester sees is unchanged: the shipping
pro-flags.json has `themes.on: false` and `items: []`, so `themeState` is nil for every id, `effective` returns
`.standard`, the Settings Editor group is not drawn (SettingsView.swift:77 checks `themes.on`), and the editor
resolves every slot through `EditorSlot.standard`, the same 22 Syntax* sets it read before. The mapping of all 22
slots to their old `ColorResource` is one to one (EditorThemeChoice.swift:29-53). The findings below matter when
T-0769 turns the row on.

## Runs

- Runner job J-20261108-0923-xc-test at 24b4a2b9c (contains 52b931b10): `PyWidgetTests/EditorThemeCatalogTests`,
  `ConsoleEditorOpenTests`, `EditorGateTests`, `EditorCaptureMapTests`: 31 executed, 0 skipped, 0 failures, exit 0
  (ops/runs/xcodebuild-20261108-092914.log).
- Host: `python3 pywidget/ios/scripts/export_editor_themes.py --check`: current (70 files).
  `python3 tests/editor_themes_test.py`: PASS 145 FAIL 0 (with its planted stale-value control).
- Size: `xcrun actool` on App/EditorThemes.xcassets alone (iphoneos, iOS 17): Assets.car 109,240 B. That is an
  upper bound; in the app it merges into the one Assets.car with Theme.xcassets. 280 KB of JSON on disk. Fine.

## What I checked and found sound

- Licences (Commandment 6). No theme comes from an outside source. Every colour is solved by Maren's
  themes_pro.py from OKLCH seeds the company wrote (themes.json `method`, `seeds`), and the script calls no
  generative model. The names and values are approved: creative/approved.md item 5 (#93, 2026-10-28) and
  Pro placement (#87, 2026-10-30). There is no third-party theme data, so there is nothing to attribute.
  preview.png is not bundled: project.yml takes only two named files from docs/design.
- Exporter versus catalog. `--check` builds the catalog again in a temporary folder and compares every file
  byte for byte, so an extra file or a missing file also fails. The Swift test reads all 264 renditions back
  from the compiled bundle, and it compares light and dark with themes.json directly, without the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>.
  The colour order (any, dark, high, dark+high) matches what the host test indexes.
- Persistence. The id goes into the app's own UserDefaults (`editor.theme`). An id that is unknown, has the
  wrong case, or is gated falls back to the free pair, and the stored id is kept. So a lapsed Pro user gets
  their theme back on restore. Tested at EditorThemeCatalogTests.swift:98-109.
- Crash and speed. No force unwrap or `fatalError` on the app path. A Pro set missing from the bundle falls back
  to the free pair (RunestoneEngine `resolve`). `applyTheme` still returns early when the key has not changed, and
  `redisplayVisibleLines` still runs only on a real change. The extra work per trait change is one UserDefaults
  read and one `ProGates` value. The selector-form observer on an NSObject removes itself, and each warm-up
  engine (EditorWarmup.swift:37) registers one observer that dies with it.
- The two compile fixes from the T-2225 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> that this commit carries: the `config?.themes.on` read and
  `nonisolated static let strings`. ProStrings is a value read once, so neither changes behaviour.

## Findings

**L1 (Low). A change in Pro does not re-theme an open editor.**
EditorThemeChoice.swift:97-100 is the only place that posts `EditorThemeStore.changed`, and `ProStore.setEntitled`
(ProStore.swift:303-307) only reloads widgets. Failure case, once T-0769 turns the row on: a user is on Graphite
with a script open, and the purchase is refunded, so the listener sets `isEntitled = false`. The editor keeps
drawing Graphite until the next change of appearance, contrast or text size, or until the script is reopened.
The reverse also happens: Restore Purchases with a stored Fern leaves the open editor on the free pair. The test
that claims "turns back when the gate closes" posts the notification by hand (EditorThemeCatalogTests.swift:142),
so it does not cover the real path. Fix: post `EditorThemeStore.changed` from `setEntitled`, and have the test
drive `setEntitled`. Does not block build 4, because the row is off. Should land before T-0769.

**L2 (Low). Nothing in a gate checks that the Increase Contrast renditions are fresh or reach 7:1.**
tests/editor_themes_test.py is the only check that the catalog matches the exporter (`--check`) and that the high
contrast sets reach 7:1, and no gate runs it: tools/main_gate.py and site_suites.py do not list it. For the HC
renditions the Swift test compares the bundle with the catalog JSON, which is circular. Failure case: someone
changes `appearance.syntax_hc` for the free pair (as T-0635 will do for the amber tint) and does not re-export.
EditorThemes.xcassets then ships the old HC values, which may be under 7:1, and every suite stays green. Fix:
run the host test in the main gate's host step, or port its 7:1 loop into EditorThemeCatalogTests.

**I1 (Info). The search-match tint is not in the Pro themes yet, and T-0635's line may skip them.**
themes.json `method`: "findMatch = selection (as approved now)". All three themes therefore have
FindMatch == Selection (Ember light #F9DDCA, dark #41261A), the same as the free pair today. Approved item 3 (#95)
says that extra themes follow the amber rule. T-0635's board line covers them only "if PROPOSAL-004 is approved",
and it was approved on 10-28 (item 5). Whoever does T-0635 should change themes.json too, then re-export.

**I2 (Info). Two files still call the themes an unapproved draft.**
themes.json:2 `status` says "DRAFT ... NOT SHIPPING". pro-flags.json:5 `note` says "PROPOSAL-004 themes are a
<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> draft (not approved)", and :19 has `themes_approved: false`. creative/approved.md items 5 and 4 (#87) settled
both points. The exporter now ships colours from a file that says it does not ship. Correct the text when T-0769
edits the flag file.

**I3 (Info). The "Pro" chip text is a Swift literal.**
EditorThemePicker.swift:18. The comment says so: `chip.pro` is not in a bundled strings file yet. This is a
user-facing word, so it is Maren's to place in the strings when localisation reaches Settings.
{% endraw %}

</div>
