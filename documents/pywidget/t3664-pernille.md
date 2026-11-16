---
layout: "default"
title: "Review: T-3669 + T-3664, the launcher editor&#x27;s design and model (fcae7c7a9e, Maren; ca2863265f, Idris)"
section: "documents"
description: "I also read these files as they are now on personal/a3 (518a1e8c30). Since ca286326 they have changed in T-3688, T-3852, T-4211, T-4216, T-4218 and T-3674. Line numbers below are for the current files."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3664-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t3664-pernille.md</code></span></div><h1>Review: T-3669 + T-3664, the launcher editor's design and model (fcae7c7a9e, Maren; ca2863265f, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-4020, 2026-11-16. Independent review (Commandment 13): I read the commits and the code, not the
authors' notes. Scope: every commit up to ca286326 whose message names T-3669 or T-3664:
- fcae7c7a9e (Maren): `docs/design/launcher/editor.md`, `draw_editor.py`, `qa-editor.json`, editor-A/B-phone.png.
- ca2863265f (Idris, recut by T-3843): `ios/Shared/LauncherSlots.swift`, `ios/App/Launcher/launcher-apps.json`,
  `ios/App/Info.plist`, `ios/project.yml`, `ios/Tests/Core/LauncherEditorTests.swift`.
- beb40f0f2e and c61ec67f9f are a board tick and a memory note; nothing to review.

I also read these files as they are now on personal/a3 (518a1e8c30). Since ca286326 they have changed in T-3688,
T-3852, T-4211, T-4216, T-4218 and T-3674. Line numbers below are for the current files.

**Verdict: PASS with findings.** The model is correct, and the tests cover what it promises. The one rule set for
links (`refusal`/`check`), the lock on every write, and the refusal to overwrite a file it cannot read all hold up.
The "unreleased" part is off in every App Store and TestFlight build: `LauncherEditorGate.isOn` is false in Release
without `PYWIDGET_LAUNCHER`, the Settings group and the tap path both check it, and upload.sh refuses a launcher
build. One thing does ship that should not: the twelve `LSApplicationQueriesSchemes` (M1). M2 is a real bug: an
edit can silently change a saved Shortcut link. Neither is a crash, data loss in a shipped path, or an App Review
rejection I can name, so neither blocks TestFlight. Each has its own board line.

## What I checked

**1. One rule set for links (editor.md s4.1).** `evaluate` (LauncherSlots.swift:109-128) is the only body.
`check` (:98) and `refusal` (:104) both read it, so they cannot drift. The order matches the table in s4.1. The
special cases (`pywidget`, `app-prefs`, `prefs`) come before the `refusedSchemes` lookup, so `kind` never reports them.
The scheme is lower-cased before every comparison. `testEachRefusalHasItsReason` covers every case, and
`testCheckIsRefusalNil` covers the direction where a link is accepted.

**2. The new slot id (s7).** `newSlotID` (:45-69) matches `draw_editor.py` `slot_id()` (:379-388) rule by rule:
lower-case, runs of other characters become one hyphen, hyphens trimmed, cut to 32, then the cut is trimmed again,
`app` if empty, and `-n` cut to fit. A hyphen is added only after a kept character, so the id never starts with
one. Every output passes `isSlotID` (`testEveryNewIdIsASlotIdAndFree`, which includes emoji, Roman numerals and
`z-` x 40). Unicode lower-casing agrees with Python's `str.lower()` for the cases that turn into ASCII (Kelvin sign,
dotted capital I).

**3. The store writes.** `rewrite` (:375-408) is the single writer. It creates the folder, takes the bounded flock
on launcher/slots.lock, reads the file under the lock, refuses an unreadable file, writes nothing when `change`
returns false, refuses a result over `maxFileBytes`, and replaces the file atomically. A timed-out lock is `.busy`
and writes nothing. All of these have tests: `testAnUnreadableFileIsNeverOverwritten`,
`testAWriteOverTheFileCapIsRefusedAndKeepsTheFile`, `testAHeldLockWritesNothing` and
`testDeleteWithNoFileWritesNothing`.
- Save and edit (:298, :308-334): the name is trimmed, cut at 40 scalars, trimmed again and required. The hue must
  be 0-11. The link must pass `check`, and the stored url is `check`'s `absoluteString`. An existing entry is merged,
  so unknown keys stay and the slot keeps its place. A new entry is refused at 16 shown ids.
- Delete (:337) removes every entry with the id, hidden duplicates included. That is right: the next reader would
  otherwise show the hidden duplicate.
- Reorder (:348-361): only the first entry for each named id is ranked. Every other entry keeps its relative order
  after the named ones, so "first of two wins" survives a reorder. The change test compares index sequences, not
  contents, which is correct. Covered by `testReorderKeepsUnshownEntriesBehind`.
- `hue(_:)` (:256) refuses Bool and floating-point NSNumbers. `readTop` (:415) refuses `format: true`. Both agree
  with T-3663's reader.

**4. The known-app list.** `LauncherCatalog.parse` (:457) keeps an entry only if its url passes `check`, is its own
`absoluteString` (so `way(of:)`'s exact-match lookup works on what `save` stores), is not http(s), has a hue of
0-11, and is not a duplicate. It keeps at most 25. `testTheBundledListMatchesLSApplicationQueriesSchemes` reads the
committed Info.plist. I ran `xcodegen generate` and Info.plist did not change, so project.yml (:200) and the plist
match: twelve schemes, twelve apps, none dropped.

**5. Is the unreleased part off in a TestFlight build?**
- The Settings group: SettingsView.swift:96, `if LauncherEditorGate.isOn`. The gate (LauncherEditor.swift:15-24) is
  `true` only with `PYWIDGET_LAUNCHER`, reads `PW_LAUNCHER` only in DEBUG, and is otherwise `false`. Off.
- The tap path: LauncherTapHandling.swift:88 returns `.notLauncher` when the gate is off. Off.
- The premade sync: `LauncherSlotStore.editor` sets `sync` only when the gate is on (LauncherEditor.swift:42). Off.
- The launcher premades: launcher_premades.py adds them only with the flag, and upload.sh refuses an archive that
  carries `LauncherMark`. Off.
- **Still shipped:** `LSApplicationQueriesSchemes` (twelve third-party schemes) is in every configuration (M1).
  Also launcher-apps.json (2,037 bytes) and the editor's code. Those two are inert, and I accept them (N1).

**6. The design (T-3669).** editor.md asks for exactly what the model built: `refusal` (s4.1), `symbol`/`hue`,
`delete` and `reorder` (s7), the id rule (s7), and a list file with a test that it matches the plist (s5). The two
PNGs are drawn by draw_editor.py. Its only imports are stdlib and the company's own draw_ide, draw_settings,
appearance and draw_launcher, so no generative model is involved (rule 6). The PNGs are under docs/ and are not in
the app bundle. s11 is honest about what is unconfirmed (`run-shortcut`, the schemes on a device, `openURL`'s
completion).

## Runs

- `xcodegen generate` in pywidget/ios: App/Info.plist unchanged, so project.yml and the plist agree.
- Core on the Mac mini, `XC_TASK=T-4020 tools/xc.sh -scheme PyWidgetCore-Package -destination 'platform=macOS' test`
  with only LauncherEditorTests, LauncherSlotsTests and LauncherSlotSyncTests: exit 0. 64 tests ran, 0 failures
  (28 + 23 + 13), log ops/runs/xcodebuild-20261116-065931.log. One warning in the reviewed tests:
  LauncherEditorTests.swift:328, `ran` is inferred as `()?` (the test still checks it is non-nil).
- Simulator (PyWidgetTests: LauncherEditorTests, LauncherSlotsTests, LauncherEditorSyncTests): xc.sh queued it as a
  <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> job (exit 75, ops/lane-outbox), so **nothing ran on a Simulator for this review**. The job runs on main when
  this branch lands.
- Not run: a `PYWIDGET_LAUNCHER` build. T-4220 owns that gap.
- Host check for L4 (a scratch Swift script, outside the repository): `URL(string:)` turns a 2,020-byte link into a
  6,020-byte `absoluteString`.

## Findings

**M1 (Medium, ship hygiene): `ios/project.yml:200`, `ios/App/Info.plist:23-37`.** Every build, including the
Release build that goes to TestFlight and the App Store, declares twelve `LSApplicationQueriesSchemes` (twodo, bear,
googlechrome, comgooglemaps, noteplan, omnifocus, pythonista, slack, things, timepage, ulysses, waze). With the gate
off, nothing in that build calls `canOpenURL`. This is the only piece of the unreleased launcher that is not behind
`PYWIDGET_LAUNCHER`. A reviewer reading the plist may ask what the queries are for, and the list tells anyone which
apps we look for. I raised it as S1 in t4185-steps-pernille.md:63. There is no board line for it, and it has grown
from 2 schemes to 12. Fix: add the key only in a `PYWIDGET_LAUNCHER` build, through a build phase guarded by the
flag the way debug_url_scheme.sh adds its URL type. Then point the matching test at that build's plist, or at
project.yml's source of the list.

**M2 (Medium, silent link change): `Shared/LauncherSlots.swift:143-147`, `App/Launcher/LauncherEditor.swift:734` and
`:472`.** `shortcutName(in:)` takes everything after `name=` as the name, other query items included. Take a pasted
`shortcuts://run-shortcut?name=Log&input=text&text=hi` (`input` and `text` are Shortcuts' own parameters). The list
shows it as "Shortcut · Log&input=text&text=hi". Opening Edit puts the sheet in Shortcut mode with that string as
the name. Save then rebuilds the url with `shortcutLink(named:)`, so it becomes `...name=Log%26input%3Dtext%26text%3Dhi`:
a Shortcut that does not exist. The person only renamed the slot, and the link is broken with no message. The same
thing happens to a `+` in a pasted name (`a+b` becomes `a%2Bb`). Fix: `shortcutName` returns a name only when
`shortcutLink(named: decoded) == url` (it round-trips). Otherwise the url is shown and edited as a Link. Core test: the
url above shows `.link`, and `shortcutName` round-trips for "Open Mail", "a&b+c=d?e#f" and "音楽".

**L1 (Low, wrong message): `Shared/LauncherSlots.swift:395`, `App/Launcher/LauncherEditor.swift:183`.** The 64 KiB
file <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> throws `.full`, which is the same case as the 16-slot cap. The editor shows "A launcher shows up to 16 apps"
for both. Sixteen slots of 2,048-byte ASCII links come to about 37 KB. So the file cap is reached with fewer than 16
apps only when another writer has added content to the file, or when stored links have grown past 2,048 bytes
(L4). In both cases the message is wrong. Fix: a separate case (`.fileFull`) with its own
`bad.write`-style string.

**L2 (Low, editor and widget disagree): `Shared/LauncherSlots.swift:248` and `:366`, `LauncherEditor.swift:371`, vs
`widgets/premade/launcher/_launch.py:123` and `:130`.** For a file written by something other than the editor:
- An entry with no name is shown and counted toward the 16 by Swift but skipped by Python.
- An entry with no hue (or one outside 0-11) is drawn in the list as hue 0, but the widget colours it `index % 12`.
Fix: make `readSlots` skip nameless entries as `read_slots` does. Expose the widget's fallback hue, or apply it at
read time, so the list shows the colour the widget draws.

**L3 (Low, stale wording and a lax parse): `docs/design/launcher/editor.md:293`, `Shared/LauncherSlots.swift:459`.**
s11a says the tap path "was never gated by a flag". Since T-4215 it is gated (LauncherTapHandling.swift:88).
`LauncherCatalog.parse` accepts `"format": true` and `1.5`, because `NSNumber.intValue == 1`, while `readTop`
refuses both. The file is bundled, so this is tidiness, not risk. Fix: correct the s11a sentence, and use readTop's
NSNumber test in `parse`.

**L4 (Low, a saved link the tap refuses): `Shared/LauncherSlots.swift:112` and `:121`, stored at `:317` and
`:285`.** The 2048-byte cap is checked on the text the person typed. What gets stored is `URL(string:)`'s
`absoluteString`, and that percent-encodes non-ASCII characters. I checked this on the host: `https://example.com/`
followed by 1,000 `é` is 2,020 bytes typed and 6,020 bytes once stored. `save` accepts it. Then the tap path's `check`
of the stored url (:271) refuses it as too long, and the list shows it as refused (`way(of:)` :486). The link has to
contain about 700 non-ASCII characters before this happens, which is why I rate it Low. It breaks "what save accepts,
the tap opens", and no test covers it because every url in `testCheckIsRefusalNil` is ASCII. Fix: in `evaluate`,
also refuse `.tooLong` when `url.absoluteString.utf8.count > maxBytes`. Core test: that url gets `.tooLong` from
`refusal`.

## Notes (no change asked)

- N1: Release still carries launcher-apps.json (2,037 bytes) and the editor's code. Neither can be reached without
  the gate, so I accept it (as N8 in t4185-steps).
- N2: `delete` and `reorder` with no file still create the launcher/ folder (`rewrite` :377) before they find nothing
  to write. That is harmless.
- N3: `save(_:for:name:)`, the tap path's save (:279), has no caller in the app any more; Set Up App writes through
  `save(Edit)`/`add`. It is kept and tested, and the slots it writes have no hue (see L2). Delete it or leave it.
- N4: `Edit.symbol` is not checked against the catalog's `symbols`, and its length is not limited. The editor offers
  only the grid, so I accept it.

Board lines (owner Idris, from T-4020): M1 = T-4574, M2 = T-4575, L1-L4 = T-4576.
{% endraw %}

</div>
