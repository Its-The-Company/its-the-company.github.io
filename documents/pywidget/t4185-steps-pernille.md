---
layout: "default"
title: "Review: the launcher steps that reached main on 11-12 (T-4214, feature T-4185)"
section: "documents"
description: "Verdict: FIX FIRST, two must-fix. The store, the premade copy and the lock (T-3852, T-4211) are sound: 8 of my 9 mutants are killed, and the survivor is older code (N1). T-3766 and T-4210 pass. Two problems are in the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4185-steps-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t4185-steps-pernille.md</code></span></div><h1>Review: the launcher steps that reached main on 11-12 (T-4214, feature T-4185)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-12, 5:30 PM ET. Commandment 13, independent. Pre-release standard: the launcher is unreleased
until #192, and the Investors are told before it ships.
Reviewed at main c0f745710a: f124f4b27e (T-3688, editor screens), 74bec6aa61 (T-3852, slot writes and reload),
80866b6e16 (T-3766, Debug URL scheme step), 6a18ecd77a (T-4210, launcher premades in PYWIDGET_LAUNCHER builds),
5ba672265d (T-4211, two saves crossing). **T-4212 (widget picker) was not on main when I finished; not reviewed.**

**Verdict: FIX FIRST, two must-fix.** The store, the premade copy and the lock (T-3852, T-4211) are sound: 8 of my 9
mutants are killed, and the survivor is older code (N1). T-3766 and T-4210 pass. Two problems are in the editor
screens. M1: in a plain Release build, a person's own script can open the whole editor through a widget link. M2: an
Add App save can silently write over a slot that was saved while the sheet was open.

## Runs (host; no Simulator or device run)

- Core, `tools/swift_test_head.py` at c0f745710a, `--filter Launcher`: 69 executed, 0 failures. A full Core run
  at the same commit: 769 executed, 0 failures.
- Mutants, `tools/mutation_check.py` on that export, `--filter "LauncherSlotSyncTests|LauncherPremadeSlotsTests"`,
  baseline 20 green:
  R1 copy after the lock (Idris's T-4211 mutant): KILLED. R2 premades copied before slots.json is written: KILLED.
  R3 reload on every write: KILLED. R4 url kept in the premade copy: KILLED. R5 unchanged premade file rewritten: KILLED.
  R6 a premade's other keys dropped: KILLED. R7 unreadable premade file overwritten: KILLED. R8 duplicate ids copied:
  KILLED. R9 `reorder` always reports a change: **SURVIVED** (N1).
- Python, in my copy: `test_launcher_premades.py` 11/0, `tests/debug_url_scheme_test.py` 9/0. Mutants, one at a time
  and restored after each run: P1 shipping archive not refused: KILLED. P2 install in every build: KILLED. P3 symlinked
  script followed: **SURVIVED** (N2). S1 empty CFBundleURLTypes left behind: KILLED. S2 scheme added in every
  configuration: KILLED.
- No UI run. M1 and M2 come from reading the code; I have not run either one.

## Must-fix

### M1. In Release, a script's widget link opens the full editor, so the launcher is not unreleased
`App/LauncherTapHandling.swift:59-74` (`handle`, no gate) and `:114-119` (`canFill` opens `LauncherSlotSheet`).
- `LauncherEditorGate` hides only the Settings group (`App/Settings/SettingsView.swift:96`). The tap path has never been
  gated. `TreeRules.linkURL` (`Shared/TreeRules.swift:85`) lets any script draw a `Link` or `widgetURL` to
  `pywidget://open?slot=lens`. In a plain Release build, tapping that link now opens the full editor sheet. Before
  T-3688 it opened a message sheet with a paste field. The sheet offers Choose an App (`canOpenURL` against the
  Release plist's schemes), Try It, and Save into launcher/slots.json. After a save, the same link opens the saved app.
  So the whole launcher works in an App Store build for anyone who writes that link. That is the #192 behaviour the
  Investors hold, and the sheet is the frame Maren marked unreleased (editor.md s2).
- I accepted the narrower form of this on 11-08 (t2551-tap-pernille.md: "only a person's own script `Link` can reach
  the handler"). That was a message-only sheet. It is now the product's editor, so I am raising it.
- If WidgetKit does not deliver the link in Release, this is moot. That delivery is T-3765's open question, and if it
  fails, nothing in the feature works anyway. The gate is right in both cases.
- Fix: in `handle`, return before `resolve` when `!LauncherEditorGate.isOn` (treat the link as `.notLauncher`, as today
  for any other pywidget link). Test: a Release-configuration unit test that `LauncherEditorGate.isOn` is false. Also a
  UI test without `PW_LAUNCHER` that sends `-ui-launcher-url pywidget://open?slot=x` (Debug hook) and expects no
  `launcher.setup.message`. It must be red with the gate removed.

### M2. Add App can write over a slot that was saved while the sheet was open (data loss)
`App/Launcher/LauncherEditor.swift:442` (the id comes from `existing`, a copy taken when the sheet opened) and
`Shared/LauncherSlots.swift:310-312` (`save(Edit)` merges into any entry with that id).
- Set Up App is presented by UIKit over any open sheet (editor.md s11a), and iPad runs two windows. Example: Add App is
  open with Name "Tunes", so the id is `tunes`. A widget tap naming `tunes` saves it through Set Up App, or a second
  window adds "Tunes". Then the first sheet's Save merges its name, url, symbol and hue into the slot just saved. That
  slot's link is replaced with no message, and the person expected two apps.
- Fix: give the store an add that fails when the id exists (`.taken`), or that picks the next free id
  (`newSlotID(for:taken:)`) under slots.lock. Use it for `.add` only; `.edit` and `.setUp` keep the merge. Core test:
  save `tunes`, then add an Edit with id `tunes`; expect `.taken` (or `tunes-2`) and the first slot unchanged.

## Should-fix

- **S1. Release declares query schemes for a feature it does not have.** `ios/project.yml:195`:
  `LSApplicationQueriesSchemes: [music, shortcuts]` is in every configuration. Once Wrenna's list lands (T-3674) it
  will be up to 25 schemes. In a Release build after M1, nothing calls `canOpenURL`. Declared schemes are what a
  reviewer asks about. They also tell anyone who reads the plist which apps we look for. Fix: add the key in a build
  phase only with PYWIDGET_LAUNCHER, the way `debug_url_scheme.sh` adds its URL type. Keep the plist-matches-list test
  against the built plist of that build. (Wrenna owns project.yml today.)
- **S2. Choose an App calls `canOpenURL` on every redraw.** `LauncherEditor.swift:800-806`: `installed` is a computed
  property used twice in `body`, and `body` runs on each search keystroke. That is up to 25 x 2 synchronous LaunchServices
  queries per letter on the main thread. Fix: work it out once in `.task` into `@State`, then filter that.
- **S3. VoiceOver reads raw SF Symbol names.** The Symbol row's value (`:535`) and each grid cell's label (`:855`) are
  `Text(verbatim: s)`, so VoiceOver says "music dot note". editor.md s8 asks for the plain name. Fix: add a `label` per
  symbol in launcher-apps.json `symbols` (or a small table) and use it for both.
- **S4. Nothing fails if the Settings gate is removed.** `SettingsView.swift:96`: every UI test launches with
  `PW_LAUNCHER`. Fix: one SettingsUITests case without it that expects no `settings.launcher`.
- **S5. A premade that could not be written is dropped silently.** `LauncherSlots.swift:384` and
  `LauncherPremadeSlots.swift:134`: `failed` is never logged or shown. The done-when is "the widget follows". If one of
  them doesn't, nothing anywhere says why. Fix: `os_log` each failed id and its Problem (no slot contents). The editor
  can stay quiet.
- **S6. The gate on the sync can go untested.** `Tests/LauncherEditorSyncTests.swift:60` skips when the test host has
  no App Group. Fix: test `LauncherSlotSync.app`'s presence through a store built from a temp file, not the App Group,
  or record that the runner's host has the group.

## Notes (no line needed)

- **N1** (older code, T-3664): `reorder` reporting a change when nothing moved survives (R9). The premade dedupe hides
  it, so the only cost is a rewrite of slots.json. A Core test on file modification time would catch it.
- **N2** (T-4210): `launcher_premades.py:53` skips symlinked scripts, and no test covers it (P3). A symlink in
  `widgets/premade/launcher/` would otherwise be copied as its target.
- **N3** (T-4210): an internal TestFlight upload may carry PYWIDGET_LAUNCHER (`PW_INTERNAL_TESTFLIGHT`). App Store
  Connect can add that same build to an external group without a rebuild. That step belongs to the Investors. Worth one
  line in the #192 checklist: never add a launcher build to an external group.
- **N4** (T-4212): `LauncherSlotSync.widgetKinds` is `["PyTreeWidget"]`. If the picker step adds a launcher kind, the
  reload must name it, and `testTheReloadedKindIsTheTreeWidgetsKind` must change with it.
- **N5**: a second widget tap replaces an open Set Up App sheet without asking (`LauncherTapHandling.swift:104-107`),
  so typed edits are lost. That overlaps T-3848. Whether `.interactiveDismissDisabled` (`LauncherEditor.swift:597`)
  holds when UIKit presents the host is unverified. Check both in the Simulator.
- **N6**: the Settings row counts slots with `appGroup?.slots()` (`:231`), so an unreadable file shows "None". A list
  write failure (`:136-163`) shows in the footer but is not announced to VoiceOver, unlike the sheet's (`:773`).
- **N7**: `@State private var model = LauncherAppsModel()` (`:253`) runs the init, a file read and a catalog parse each
  time the parent redraws. The result is thrown away, so it is cost, not a bug.
- **N8**: Release carries the editor's code and 72 DRAFT strings. They are unreachable after M1, and that is fine.
- **N9**: the name is cut at 40 Unicode scalars (`:496`), so it can split an emoji sequence. It matches `read_slots`
  in Python, which is why I accept it.
- T-3766 passes: it deletes only its own entry, removes the key only when it emptied it, and its tests are red on the
  old script (S1, S2).
- Accessibility: every control I measured has a 44 x 44 pt target or larger: +, Copy, swatches, symbol cells, and
  sheet rows. Swatches carry names and the selected trait. Refusals are announced and become the field's hint. The
  list row is one element. I did not do a VoiceOver pass on a device.

## Widget picker, 3d68e5a96b

Reviewer: Pernille, 2026-11-12, 5:51 PM ET (T-4217). Commandment 13, independent. Commit 3d68e5a96b (T-4212, Idris):
`Shared/LauncherPremade.swift`, `ProFlags.swift`, `WidgetPlacement.swift`, `Tests/LauncherPickerTests.swift`,
`WidgetPlacementTests.swift`, `UITests/WidgetKitCheckTests.swift`, `UITestLaunch.swift`. M1 and M2 above (T-4215,
T-4216) are not repeated here.

**Verdict: FIX FIRST, one must-fix.** Nothing of the launchers reaches a plain build through this commit, and the
widget kind and intent are unchanged. The picker, lock and titles are correct. M3 is a feature gap that this commit
exposes: after an edit, a placed launcher keeps drawing the old apps.

### Runs

- Runner, plain Debug build at 3d68e5a9 (job J-20261112-1748-xc-test): LauncherPickerTests, WidgetPlacementTests,
  GatePremadeTests, FirstOpenPassTests, LauncherEditorSyncTests:
  21 executed, 0 skipped, 0 failures (161.5 s). The plain half of LauncherPickerTests passed: no launcher in a plain
  picker.
- No launcher-build run. The runner cannot build with PYWIDGET_LAUNCHER: a KEY=VALUE argument keeps a run local, and
  this session allows no local suite. I rely on Idris's Mac mini runs (27/0, shots in `ops/site-checks/T-4212/`). I
  looked at two shots: the small Pegboard draws Web and Blank, and the Blank tap opens Set Up App naming it.
- No host or Core test covers these files (`Core/Package.swift` does not include them).
- Mutants, by reading, not run (they need the launcher build). Drop `LauncherPremade.names` from `listed`: killed by
  LauncherPickerTests (six expected). Drop the ProGates line: killed (entitled false locks them, so `offered` drops
  them). Drop the title override: killed by `testTheListIsTheBundledCatalog` and WidgetPlacementTests. Add a launcher
  to a plain build's list: killed by the plain half of LauncherPickerTests, which runs on the runner.

### Release reach (checked by reading)

- Every line that names `LauncherPremade` is inside `#if PYWIDGET_LAUNCHER`, in the app, the extension and the tests. A
  plain build compiles `LauncherPremade.swift` as an empty file.
- The commit adds no Info.plist key, no bundled file and no build phase. The eight PNGs (4,528,520 bytes) are in
  `ops/site-checks/`, not in the app.
- No new widget kind and no change to `ChooseWidgetIntent` or `WidgetChoiceEntity`. A launcher is the tree widget
  (`PyTreeWidget`) set to `pywidget.premade.launcher-<name>`. So N4 above is closed: `LauncherSlotSync.widgetKinds`
  is right as it stands.
- No path uploads a launcher build today. `launcher_premades.py` refuses an archive without `PW_INTERNAL_TESTFLIGHT`.
  `upload.sh --gate-session` would compile the condition, but then it is refused because the archive has no gate mark.

### Must-fix

#### M3 (T-4218). After an edit, a placed launcher keeps drawing the old apps until the app is opened again
`Shared/LauncherPremadeSlots.swift:117-136` (`run`: write the premade copies, then `reloadIfChanged`) and
`App/PyWidgetApp.swift:118` (the only pass trigger: `scenePhase == .active`, unforced, spaced 30 s by `WidgetPasses`).
- The extension does not run a launcher. Launchers are in no `lane.json` (`launcher_premades.py` leaves it alone), so
  only the app's pass writes `widgets/pywidget.premade.launcher-*/tree.json`. After a save, T-3852 rewrites the premade
  copies and reloads `PyTreeWidget`. The extension then redraws from the old tree.json, so the reload changes nothing
  on screen.
- What a person sees: they add or remove an app in Launcher Apps and go to the Home Screen. The widget still shows the
  old tiles, and on a first set-up it still says "No apps yet". It changes only after the app becomes active again,
  and not within 30 s of the last pass. Meanwhile a tile that was removed still draws, and its tap opens Set Up App
  for an app the person just deleted, because the tap reads slots.json.
- The feature's done-when (T-4185) says "the widget follows". `testPLauncherPlacedDrawsTheSlotsAndTaps` avoids this
  case: it terminates the app and opens it again before it looks. editor.md s7 says it plainly: "Not yet tested: a
  real launcher widget redrawing after a reload".
- My miss as well. In T-4214 I passed T-3852's reload without asking what it redraws from. Nothing could be placed
  then, but the question was there to ask.
- Read, not run: the runner cannot build a launcher build.
- Fix (Idris's call on the shape): when `LauncherSlotSync` changed a premade file, run the placed launcher ids
  through `WidgetWriter` (forced, not spaced), then reload. Or have the editor ask for that pass when it closes. Test:
  extend the Simulator check. Place Pegboard, open Launcher Apps without terminating, rename Web, go Home, and expect
  the new name by Vision within 10 s. It must be red on 3d68e5a96b.

### Should-fix

- **S7. The launcher build has no binary mark, and since this commit it changes the extension.** The only archive
  check is `launcher_premades.py`, which runs in the app target's "Install premades" phase and reads that target's
  settings. Before 3d68e5a96b, PYWIDGET_LAUNCHER changed only the app. Now `Shared/` code in the widget extension
  depends on it: the picker offers six unpriced widgets. A condition set on the extension target alone (a per-target
  setting or xcconfig) would pass that check and reach an App Store archive. The <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> gate (T-2662) and the tester Pro
  switch (T-4093 H1) each compile a mark string into both executables, and `upload.sh` refuses an archive that holds
  one unless it goes by `--internal --upload`. Fix: a `LauncherMark` in `LauncherPremade.swift`, kept alive the way
  `TesterProMark` is, a matching refusal in `upload.sh`, and a test like `test_tester_pro_flag.py`. Do this before any
  path uploads a launcher build.
- **S8. No recurring run builds PYWIDGET_LAUNCHER, so its tests guard nothing between hand runs.** Nothing in
  `tools/` or `ops/jobs/` sets the condition. The evidence: WidgetPlacementTests was red in a launcher build from
  6a18ecd77a (T-4210) until this commit, and no gate noticed. The positive half of LauncherPickerTests, the titles
  check, and the Simulator check run only when someone types the xcodebuild line. Fix: a nightly runner job, or one
  on land for paths under `App/Launcher`, `Shared/Launcher*` and `widgets/premade/launcher`, that builds with the
  condition and runs `-only-testing` the launcher classes. That means teaching the runner one approved extra setting.

### Notes (no line needed)

- **N10**: in a plain build, a launcher placed earlier from a launcher build keeps its id (`resolve` keeps any valid
  premade id). Its name is in no `freePremades`, and `premades.on` is true, so `isPremadeLocked` holds it locked and
  the extension draws the Pro card. Buying Pro would then show a frozen tree that no script rewrites. Today this
  reaches only a Simulator. For #192: keep the ids `launcher-<name>`. If they change, every placed launcher on a
  tester's phone becomes that Pro card.
- **N11**: #192 has to delete `LauncherPremade` in the same commit that moves the launchers into `pro-flags.json`.
  Otherwise `order + LauncherPremade.names` lists each launcher twice in Edit Widget. Only the launcher-build half of
  LauncherPickerTests would notice (12 against 6), and per S8 nothing runs it.
- **N12**: the launchers stay unlocked in the closed state (no trusted flag file), as the gate premade does. I accept
  it for an internal build.
- **N13**, the Simulator check: `XCTAssertNotEqual(reopened.state, .runningForeground)` comes after a Home press, so
  it cannot fail. The tap offsets (-33,-33) and (33,-39) depend on Pegboard's small layout and on `_launch.AREA` being
  centred. A layout change will show up as a missed tap, not as a clear failure.
- **N14**: in WidgetPlacementTests, `gateTail` now means every conditioned tail, gate and launcher alike. `extraTail`
  would describe it better. Cosmetic.
{% endraw %}

</div>
