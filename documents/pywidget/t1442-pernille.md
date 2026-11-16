---
layout: "default"
title: "Review: T-1442, the s9 system strings (c70fdd74f5, Idris)"
section: "documents"
description: "Verdict: PASS with findings. The swap is exactly the s9 table: all 15 rows and the 6 phrases are in the Swift source word for word, and nothing else changed. The DRAFT strings are not kept from users by any build\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1442-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t1442-pernille.md</code></span></div><h1>Review: T-1442, the s9 system strings (c70fdd74f5, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4022, 2026-11-16. Independent review (Commandment 13). I read the diff, the files as they
stand on personal/a3 at 518a1e8c30 (c70fdd74f5 is on main and an ancestor of this branch), state-spec s9 and
creative/approved.md. Test run: see "Tests" at the end.

**Verdict: PASS with findings.** The swap is exactly the s9 table: all 15 rows and the 6 phrases are in the Swift
source word for word, and nothing else changed. The DRAFT strings are not kept from users by any build switch, but
they do not need to be for an internal TestFlight build (M1). One Medium (an open <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> placement before anything
leaves the company) and three Lows. No FIX FIRST: nothing here blocks TestFlight. The
Simulator run did not happen here (Tests), so the PASS is on the read and a host check only.

Board: M1 (Ines) and L1-L3 (Idris) are not on the board yet. My `board_tick.py add` for them was refused by a
classifier (rule 14), so the Operator places them from this file.

## What I checked

**1. The strings against the table.** I matched every `| \`id\` | text |` row of state-spec.md s9 against the four
files as they stand. All 15 (`kind.name` to `tile.runinput`) are present as literals, including the three that the
test class does not list (`picker.param.widget`, `picker.entity.type`, the three `tile.*`). The six phrases match the
phrase table, `{app}` read as `\(.applicationName)`. Since c70fdd74f5, later commits touched RunScriptIntents.swift
(T-4205 prune), WidgetPlacement.swift (T-4212 launchers, T-4440/41 first render) and PyWidget.swift (T-4414 rerun
rule), and none of them moved a T-1442 string.

**2. What the change does to users.** Only words. Titles keep their values ("Run Script", "Refresh Widgets"), so
no intent identity, parameter or Shortcut a person has already built changes; App Intents keys on the type, not the
title. The two new phrases each carry the app token once. "PyWidget" leaves the two intent descriptions, which is
the point: the name is not approved (approved.md, Not yet approved item 12).

**3. The tests (Tests/SystemStringsTests.swift).**
- `testSwiftStringsAreTheS9Table` (:35) reads the four files from `#filePath` and checks each literal is present,
  plus the three old words are gone (:41). It is a source read, not a compiled-value read, so a string built by
  concatenation or moved to a catalog would read as missing. For four literals that is the right trade.
- `testNoTitleDescriptionOrPhraseNamesTheProduct` (:48) scans 260 characters after each marker (:50) for "PyWidget"
  in a literal. Correct for what it targets; see L1 for what it does not.
- `testTableMatchesSpec` (:68) ties the test's table to the spec when the docs are in the tree and skips otherwise
  (:70). The cell parse (split on " \| ", second cell) is right for every s9 row; none holds " \| ".

**4. The history.** At c70fdd74f5 two other tests used the old description "Draws your script's widget." as their
byte-read control (ExtensionBridgeTests, WidgetKindsTests), so this commit turned them red; that was seen on 11-08
and fixed by T-3844 (9a18044e3f), which moved both controls to "additionalProperties" (ExtensionBridgeTests.swift:97,
WidgetKindsTests.swift:136). Closed. I count it here because it says the commit landed without the suites that read
the widget's own words being run.

## C51: are DRAFT strings kept from users, and is that acceptable for TestFlight?

They are not kept from anyone. There is no `#if`, no flag: every build, Debug or Release, internal or not, carries
these words. The question is whether that matters.

- C51 (rule 51) puts **identity** behind approval: name, icon, visual direction, voice and tone. Interface text
  inside the style guide needs nothing more, and while waiting the company builds "with neutral placeholders".
- These strings are plain functional descriptions ("Runs one of your scripts and returns what it prints."). They
  carry no name, no slogan, no voice choice beyond saying what the button does. They are as close to neutral
  placeholders as an intent description can be. The strings they replaced were just as unapproved and also shipped,
  and they named the product, so T-1442 lowers the C51 exposure, it does not add to it.
- Internal TestFlight reaches only the company's own testers (the Investors). That is not "public" in the rule's
  sense. **Acceptable for internal TestFlight.**
- No voice and tone entry exists in creative/approved.md, so there is no guide these strings can be "inside". s9
  itself says they go "with the next creative batch". Until that happens, or someone with the authority records that
  these neutral strings need no approval, they should not reach external testers or the App Store. That is M1.

## Findings

**M1 (Medium): s9's C51 placement is open, and nothing stops these words leaving the company.**
state-spec.md:194-196 labels the table "DRAFT C51, NOT APPROVED ... goes with the next creative batch"; the four
Swift files compile it unconditionally (PyWidget.swift:105, WidgetPlacement.swift:148-149,
RefreshWidgetsIntent.swift:16-17, RunScriptIntents.swift:226, :242, :259-266). The Investors' one review before each
App Store submission covers the store page and screenshots, not these strings, so they would ride an external
TestFlight or a submission unseen. Fix: Ines either puts s9 in the next creative batch, or records in a decision that
neutral system strings with no product name are interface text that needs no approval (and says so in s9), before the
first external TestFlight. Owner: Ines. Not a code change.

**L1 (Low): four Shortcuts error messages still name the product, and the test cannot see them.**
RunScriptIntents.swift:79, :81, :82, :83 (`ShortcutRunError.localizedStringResource`): "PyWidget has no script
named ...", "Open PyWidget and try again.", "PyWidget is already running a script ...", "Quit and reopen PyWidget
...". iOS shows these in Shortcuts when a run fails, so they are words outside the app too, and they break s9's
"The name" rule. The name test (SystemStringsTests.swift:50) has no marker for them. The exposure is no worse than
the bundle's display name today (project.yml:211), so this is tidy-up, not a C51 breach. Fix: the same
`\(.applicationName)`-free wording ("Open the app and try again.") or a token, add `localizedStringResource` to the
markers, and add the rows to s9.

**L2 (Low): s9 claims "every other string in the build", and the build has moved on.**
T-0678 added RefreshWidgetIntent (Shared/RefreshWidgetIntent.swift:15, title "Refresh Widget", parameter "Widget",
header comment "Copy is DRAFT (C51)"). It is `isDiscoverable = false` (:16), so it is not in Shortcuts. Whether
iOS shows its title anywhere else I have not checked [recall: probably not], but it is a user-facing literal in
neither the s9 table nor SystemStringsTests, so a later rename to something carrying the name would pass. The PYWIDGET_LAUNCHER titles (LauncherPremade.titles) are build-switched off a release, so
they are fine. Fix: add `refresh.widget.title` to s9 and to `expected`.

**L3 (Low): the Simulator evidence s9 asked for is not on file.**
s9's build line (state-spec.md, "Proposed build line") asks for WidgetKit Simulator shots of the Add Widget sheet,
Edit Widget sheet and Shortcuts tiles beside the mock, and its Open list asks which of `kind.description` and
`picker.intent.description` the Edit Widget sheet shows. I found no such shots in the tree and no answer to the
question. The words are right either way; the shots are what M1's creative batch would show the Investors. Fix: take
them when M1 is placed, as its previews.

## Tests

Command: `xcodegen generate` in pywidget/ios, then `XC_TASK=T-4022 tools/xc.sh -scheme PyWidget -destination
'platform=iOS Simulator,name=iPhone 16' -only-testing:PyWidgetTests/SystemStringsTests
-only-testing:PyWidgetTests/WidgetKindsTests -only-testing:PyWidgetTests/ExtensionBridgeTests test`.

**Nothing ran. No Simulator result backs this review.** Five runs in four tries on 2026-11-16, all on a shared Mac
with other <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> holding the Xcode lock:
1. Default route: exit 75, queued as a MacBook lane job that is only made when this branch lands.
2. `XC_LOCAL=1`, iPhone 16: stopped by my own 20-minute limit while waiting for the lock.
3. `XC_LOCAL=1`, iPhone 16, then iPhone 17 / OS 27.1: exit 70 after a 13-minute lock wait each; neither device
   exists on this Mac (my destination, not a code fault).
4. `XC_LOCAL=1`, iPhone 18 Pro: exit 75 after a 9.7-minute lock wait; a waiter judged the run stalled and took the
   lock, and the log (ops/runs/xcodebuild-20261116-071512.log) is empty, so xcodebuild never got as far as building.
The verdict rests on the read and the host check below. SystemStringsTests, WidgetKindsTests and ExtensionBridgeTests
on the iPhone 18 Pro Simulator are still owed. Whoever lands the next app change runs them in its gate.

Host check, by me, read only: a script matched every s9 table row against the four sources; 15 of 15 present.
{% endraw %}

</div>
