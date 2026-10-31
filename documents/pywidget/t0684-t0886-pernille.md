---
layout: "default"
title: "T-0886: independent review of T-0684 (63104185, a72c63c4, b7e90c16)"
section: "documents"
description: "Verdict: PASS, two Mediums to fix. The token half of F19 tests what it says, and the card matches the ruling on the Home Screen. Shipped builds read no test-hook file: the answer is below and it is a clean yes. The\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0684-t0886-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/t0684-t0886-pernille.md</code></span></div><h1>T-0886: independent review of T-0684 (63104185, a72c63c4, b7e90c16)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-31. Commandment 13. Read from the diff, the code around it and the tests, not Idris's notes.

**Verdict: PASS, two Mediums to fix.** The token half of F19 tests what it says, and the card matches the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> on the Home Screen. Shipped builds read no test-hook file: the answer is below and it is a clean yes. The first thing that broke was not the code but the coverage: the one flow a new person walks, card then Edit Widget then their widget, is not what the suite runs.

## The question: does a shipped build read widgets/new_widget?

**No. The extension opens no file in that folder on a Release build.** One stat happens (L1). Traced by hand:

1. **The condition.** `TreeDrawable.testHooks` is `#if DEBUG` (WidgetPlacement.swift:150-156). `SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG` appears exactly once in project.pbxproj, line 1593, the project's Debug configuration. No Release config, no target and no `OTHER_SWIFT_FLAGS` sets it, there is no xcconfig, and project.yml does not touch it. pbxproj is generated and git-ignored, so project.yml and XcodeGen's default are what <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> this, not the file I read.
2. **What ships.** The scheme's ArchiveAction is Release, and tools/upload.sh passes `-configuration Release ... archive` with no override.
3. **The gate.** `chosen == nil && !(testHooks && hookTree())` (WidgetPlacement.swift:162). With `testHooks` false, the `&&` never calls `hookTree`, so `Self.document(for:)` never runs (PyWidget.swift:36).
4. **Every provider path.** `snapshot` goes through `timeline` (PyWidget.swift:31-33), so the gallery takes the same gate. `timeline` returns the card before `drawable`, `document` or the StoreKit gates. `placeholder` touches no file.
5. **Host run of the shipped lines.** I extracted lines 150-156 and 161-163 verbatim into a temp file and compiled them twice with swiftc:
   - no DEBUG, `-O`: `testHooks=false card=true fileProbes=0`
   - `-D DEBUG`: `testHooks=true card=false fileProbes=1`

**The writers side holds too.** `-widget-run` and `-widget-install` are wholly inside `#if DEBUG` (WidgetRunView.swift:3-64, WidgetInstallView.swift:4-51; PyWidgetApp.swift:69-71, 89-101). `WidgetLibrary.save` has one caller, behind the `heldID` refusal (WidgetScriptSave.swift:148, :258). RunResultSink writes only for ids WidgetWriter runs, and `new_widget` has no main.py to run. One edge in L2.

**Limits of this answer.** It is reasoning plus a host compile of those lines. I did not inspect a Release binary: the newest Release appex on this Mac is from 02:54 today and b7e90c16 is from 12:42. Xcode's slot is T-0881's, so no Release build ran. `testHooks` itself has no test and cannot have one in Debug; a change to that one constant would fail nothing. I do not think that earns a line.

The card does read `state-tokens.json` from the extension's own signed bundle. That is the words table, not a folder anyone writes, and it is what the ruling's "no file" means in practice.

On the app side, not the extension: `WidgetWriter.placedIDs` still maps unset to `new_widget` (WidgetWriter.swift:73), so a writer pass stats `widgets/new_widget/main.py` and skips with "no script". If a main.py were ever there it would run, and nothing would draw the result. No shipped path puts one there. No line.

## Findings

### M1. VoiceOver gives the wrong instruction on the Lock Screen (Medium)

ChooseCardView.swift:17, state-tokens.json:106, state-spec.md:258.

The ruling drops the instruction line from Lock Screen families because "editing a Lock Screen widget starts in Customize, not a touch-and-hold on the widget, and a wrong instruction is worse than a short card" (state-spec.md:261). The label is one string for all families, and it says "Touch and hold, then choose Edit Widget." So the card is short for sighted people and wrong for VoiceOver users, on every Lock Screen placement, since every one starts unset. The code follows the table; the table contradicts its own reason.

Fix: Lock Screen families read a label with no touch-and-hold sentence. One new row in `voiceover`, words from Maren, picked by `family.hasPrefix("accessory")`, with `check_states.py` and the words test covering it. **T-0891.**

### M2. The suite never walks card, then Edit Widget, then widget (Medium)

WidgetKitCheckTests.swift:198, :284, :344; WidgetPlacement.swift:166.

This is the person's real first flow, and the card's timeline is `.never`, so it depends entirely on WidgetKit asking again after the choice. It should (a configuration change brings a new timeline) and that is the right policy. But nothing here shows it:

- `testETokenOnTheHomeScreen` writes `widgets/new_widget` and never removes it (no teardown, line 198).
- `testISavedScriptReachesTheHomeScreen` runs later in the same pass and places a widget. F, between them, leaves that folder alone. In Debug the new widget draws E's leftover tree, not the card, so `setWidget` moves it from a hook tree to the token.
- `testJUnsetWidgetDrawsTheChooseCard` deletes the folder and sees the card, but never sets the widget.

Result: the card and the chosen widget are each proven; the step between them is not, and it is the step that this change alters. The tests and the shots do not show whether the card was up before the set in I.

Fix: in testI, remove the folder before placing and read "Choose a widget" off the widget before `setWidget`. Three lines. **T-0892**, with the exact run.

### L1. A shipped render still stats widgets/new_widget (Low)

PyWidget.swift:81. `TreeFamilyEntryView` passes `folder: TreeProvider.folderURL(for: entry.widgetID ?? TreeProvider.widgetID)`. `WidgetFolder.url` calls `attributesOfItem` on the folder (WidgetID.swift:170). The card ignores the result and no contents are read, so "reads no file" stands, but "decided from the configuration alone" deserves to be literally true. `entry.widgetID.flatMap(TreeProvider.folderURL)` does it: every drawn tree entry carries its id already (PyWidget.swift:40, :52). **T-0893.**

### L2. `heldID` compares case-sensitively (Low)

WidgetScriptSave.swift:148. `id == Self.heldID` lets `Widget("NEW_WIDGET")` through, though the ids rule compares by `WidgetID.key`. On a case-insensitive disk that is the same folder, so a Debug Simulator would draw it on unset widgets, and the new comment at :55-56 ("stays no one's folder") overclaims. A shipped extension cannot be affected: it reads nothing there. Fix: `WidgetID.key(id) == Self.heldID`. **T-0893.**

### L3. Two comments still describe the old behaviour (Low)

WidgetPlacement.swift:73 ("would turn the widget into the New widget") and :128 ("Unset: the New widget template's id"). Both are now the card. **T-0893.**

### L4. The Lock Screen check proves different pixels, not the right ones (Low)

WidgetPlacementTests.swift, `testEntryViewDrawsTheChooseCard`. It draws every family at 170 by 170 and asserts only "not the fallback, not the Pro card". By reading: blank the circular word and the glyph alone still passes. The real slots are far smaller. The spec's As built note says the Lock Screen is not on a device; I would go one further, it is not at the Lock Screen's sizes either. `placeLockWidgets` already exists for a real shot. **T-0894.**

### L5. Dynamic Type is unchecked on the card (Low, needs a Simulator)

ChooseCardView.swift:38-43. The Home Screen branch has no `lineLimit` or scale factor, and systemSmall already takes four lines at default size (t0684-unset-systemSmall.png). At accessibility sizes the caption is what gets clipped, and the caption is the instruction. I cannot say it breaks without a run. testJ's Vision assertion on the caption makes it a pass or fail as it stands. **T-0894.**

## Read and fine

- **F19 token half.** No hook, no script in the environment; `PW_PROJECTS_ROOT` is Debug-only and only picks a folder. Tokens are fresh per run; the id embeds the first token, but no state draws the id and the second token is not in the id at all. `waitForTree` is case-sensitive, so the lowercase id cannot satisfy it. The test proves save, tree, then pixels, twice, the second with the widget already placed.
- **Evidence.** Tokens PWYFKNNK and PWTH3KCV are on the two shots. The card reads correctly at small and medium, side by side on the Home Screen, with no fault colour and no id.
- **Spec against build.** Glyph, words, per-family layout, the secondary glyph and default tap all match the ruling. `square.dashed` is a real symbol. The extension bundles state-tokens.json (project.yml:214).
- **Words check.** `check_states.py` exits 0 on the repo. On a temp copy, three mutants (the id in a caption, a fault word in the VoiceOver line, inline differing from the title) each raised the unset rule's own FAIL. That temp copy also failed for an unrelated reason, with no unset line, so read those as "the rule fires", not as a clean pass or fail.
- **Choice query.** `WidgetChoiceQuery` has no default result, so a fresh placement really is nil. Stored ids resolve unless invalid (T-0589), so nothing falls to the card by accident.

**For Maren, no line:** the Add Widget gallery now previews this card, words included, because `snapshot` shares the gate (PyWidget.swift:32). It beats "No view for this size", but the ruling does not mention it, and "Touch and hold" reads oddly on a preview. Her call.

## Not run

No xcodebuild, no Simulator, and no swift test: no suite outside Xcode touches this diff. I did not re-run the UI or unit tests, and their results are not in this review. I read the evidence PNGs, the code and the tests.

## Board lines added

T-0891 (M1), T-0892 (M2), T-0893 (L1, L2, L3), T-0894 (L4, L5).
{% endraw %}

</div>
