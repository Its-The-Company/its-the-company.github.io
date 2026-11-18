---
layout: "default"
title: "Review of T-4181 at b08e9352: every sent widget script starts in the widget (covers T-4494)"
section: "documents"
description: "The code does what the T-4280 rule and ADR-007 s3 item 4 say, and does it carefully. Both readers of the lane key agree (LaneEntry.inLane and lane.lane_of(strict=False): no key, or exactly &quot;widget&quot;, is the widget lane\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4181-b08e9352-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 27 · Tue Nov 17</span><span><code>pywidget/docs/reviews/t4181-b08e9352-pernille.md</code></span></div><h1>Review of T-4181 at b08e9352: every sent widget script starts in the widget (covers T-4494)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4696, Commandment 13). Author: Idris. Reviewed: T-4494's commits up to b08e93527f:
6d64e84bfe (item 1: every sent widget script mirrors to <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>-scripts and starts in the widget), b9aebdcba9 (item 2:
widgets/premade/lane.json and every reader gone) and b08e93527f (board note and memory; nothing to review there). I found
no earlier review of b9aebdcba9 (t4280-pernille.md says "reviewed separately", and no file under pywidget/docs/reviews/
reviews it), so it is covered here. 572ddeb878 (T-4656) is T-4759's review, not this one. Date: 2026-11-17.

Read at b08e93527f: the two diffs; `App/Projects/LaneMirror.swift` and `App/Projects/WidgetScriptSave.swift` (`send`,
`newText`, `siblings`) whole; `Shared/ExtensionLane.swift` `LaneEntry`; `App/Runtime/_pywidget_runtime/lane.py`
(`MESSAGES`, `lane_of`, `send_lane`, `check_project`, `mirror_entry`) and `app_manifest.py` (`check_id`, `check_name`);
`Shared/LaneGuard.swift` `LaneChoice.judge`; `Shared/WidgetID.swift` (`isIDScalar`); `App/Projects/ProjectStore.swift`
(`fileName`, `files`, `delete`); `Shared/Premades.swift` `laneEntry`; the T-4494, T-4280, T-4181, T-4630, T-4631 and
T-0972 board lines and `ops/board_notes/T-4494.md`; my T-4518 review of T-4280 ([`t4280-pernille.md`](t4280-pernille.html)). Paths are under
`pywidget/ios/` unless they start with `pywidget/`.

Runs:
- Host, the tree at b08e93527f exported whole to a scratch folder: `test_lane`, `test_lane_lazy`, `test_lane_reset`,
  81 tests, OK on Python 3.9.6 and 3.13.
- Probe, host, through the lane finder as the extension starts it (`FinderTests.scenario`), same tree and at HEAD, both
  Pythons. A script that wraps `from pywidget import http` in `try ... except Exception` ends `status=ok`, `error=None`,
  stdout `caught LaneImportError`. The same import at top level ends `error`, type `LaneImportError`. See H1. The probe
  is `company-scratch/T-4696-pernille/probe/probe_caught.py`; no product file was edited anywhere.
- Simulator, local (`XC_LOCAL=1`, `XC_TASK=T-4696`, iPhone 17e, iOS 27.0, this worktree at 3e6e534c06):
  `WidgetScriptSaveTests` (with LaneMirrorTests, an extension of it) 87, `ExtensionLaneTests` 118, `LaneChoiceTests`
  19, `WidgetRefusalRetryTests` 2, and BridgeTests' `testLaneEntryAgreesWithThePythonHalf` and
  `testASavedMirrorIsWhatBothHalvesRun`: 228 executed, 0 skipped, 0 failures (`ops/runs/xcodebuild-20261117-224708.log`).
  This is the HEAD tree, not b08e93527f: LaneMirror, WidgetScriptSave, ExtensionLane, lane.py and their tests have
  changed since (T-4656, T-4630, T-1764 and others). None of the findings below depends on those later changes; each
  holds at HEAD too.
- Not run: the whole PyWidgetTests target (the commit records 1,955 executed, 0 failures, 3 skipped on 11-16), anything
  on 26.0 or 27.1, and test L of widgetkit_check.sh.

## Verdict: PASS with findings (one High, one Medium, two Low)

The code does what the T-4280 rule and ADR-007 s3 item 4 say, and does it carefully. Both readers of the lane key agree
(`LaneEntry.inLane` and `lane.lane_of(strict=False)`: no key, or exactly `"widget"`, is the widget lane; `"app"`,
`"Widget"`, `1` and `null` run in the app; `NSNull` and Python `None` fall the same way). `LaneMirror.plan` keeps a widget
out only when a readable manifest says so, and otherwise mirrors under the project's manifest when it names the sent
file, else under `defaultManifest`. I checked `defaultManifest`: the version-8 and variant bits are set right, the id
passes `app_manifest.check_id`, and the name is the widget id cut to 64 characters. Widget ids are ASCII
(`WidgetID.isIDScalar`), so 64 characters are 64 scalars, within `NAME_MAX`. Keys are sorted and nothing in the
document varies, so a resend of unchanged text plans `.keep`, moves nothing and <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> nothing. That is the claim about
T-4518 L2(b), and it holds. Nothing at run time reads the manifest's id, so the name-based id cannot split a widget's
data between the two lanes. `check_project` and `send_lane` have no product caller, so `DEFAULT_LANE` changing to
"widget" moves no save-time behaviour. b9aebdcba9 leaves no code reader of lane.json (`git grep` at b08e93527f; the
ones left are comments and docs, L2).

Privacy (Commandment 6): the mirror holds the same files as widgets/<id>/ (the script and its project's .py siblings)
plus a manifest with no personal data, written with the same protection class
(`completeFileProtectionUntilFirstUserAuthentication`), in the same App Group. It now exists for every sent widget, flag
on or off. Nothing deletes widgets/<id>/ either (no widget delete exists; `ProjectStore.delete` removes the project
only), so the mirror lives exactly as long as the copy that was already there. A retired id takes its mirror with it. No
new kind of data, and nothing leaves the device. One row of the privacy label's evidence is now stale (L2).

What T-4494 was to settle from T-4518: the person's-script mirror (T-4518's "Done when, as it stands") is done.
L3 (Ines's two readings) is T-4494 item 4 and is still open at b08e93527f, as the board note says. Item 3 (Simulator
and internal-build recording) is open too. Those are why T-4494 stays open; they are not findings here.

## Findings

### H1. Every person's script now meets the H2 failure of T-4518, and neither guard against it exists yet

- Where: `App/Projects/LaneMirror.swift` `plan` (every send mirrors unless the manifest says otherwise);
  `lane.py` `send_lane` (no caller in the app: `git grep` at b08e93527f finds only tests); `Shared/LaneGuard.swift`
  `LaneChoice.judge` (an `ok` run with no `errorType` and no ask is `fits`).
- The failure: before 6d64e84bfe, a project with no pywidget.json, which is what `ProjectStore.create` makes, had no
  mirror and ran in the app, where `pywidget.http` and the rest work. Now it starts in the widget. A script that catches
  the lane's refusal (the GitHub premade's own pattern, so one a person copies) ends `ok` with no error type (probe
  above). `judge` says `fits`, and the widget stays in the widget lane, with no fetch, for good. The same script
  worked before this commit. A top-level app-only import fails its first widget run instead: an error row and, with no
  tree yet, an error card, before the move. That one at least moves to the app, and draws the next time the app runs
  it. The commit says plainly that this is not
  fixed here and names T-4631, which is honest. But the order matters: T-4518 H2 was about ten premades, and this
  makes it every person's widget, before either guard has landed. One guard is T-0972's send scan, which would put
  the script in the app before any run. The other is T-4631's finder note, which would judge a caught refusal
  `refused_import`.
- Why High: on a lane-on build (the internal TestFlight build has the flag on) a person's working widget can stop
  updating, with no error shown and nothing they can do in the app (see M1). That is T-4181's "a widget that reads the
  web does the same", broken for exactly the widgets that read the web the old way.
- Fix: no new code line; the work is on two lines already. T-4631's finder half is mine (lane.py notes every refusal
  it raises, caught or not; ExtensionLane takes it like `askedAppOnly`). It now comes before any lane-on TestFlight
  build that carries 6d64e84bfe, and I have noted that on T-4631. T-0972's send scan closes the loud case too; noted
  there. Test, on T-4631 already: a lane run whose script catches a `LaneImportError` is judged `refused_import`.

### M1. The refusal text tells every person to edit a file the app does not let them make

- Where: `lane.py` `MESSAGES[CODE_IMPORT]`, "<name> can't be used in a widget that runs on its own. Remove the import,
  or set "lane" to "app" in pywidget.json." (one text for the scan and the finder); `App/Projects/ProjectStore.swift`
  `fileName` (only .py names) and `files` (lists .py only); `ProjectStore.create` (writes no manifest).
- The failure: before T-4494 only someone who had written `"lane": "widget"` by hand could see this line. Now any
  person whose script imports an app-only module sees it on the first widget run's error, in the run detail. They
  cannot follow it: the app has no way to make or edit pywidget.json. Nor do they need to, because the widget moves to
  the app by itself (`refused_import`). The advice is wrong for the person reading it.
- Fix: reword `CODE_IMPORT` for a lane that moves on its own, in the spirit of T-0972's `CODE_SEND` line ("updates
  when PyWidget runs it"); Maren reviews the words. Keep one text for the scan and the finder, and update the tests
  that pin it. Board: T-4836.

### L1. Widgets sent before 6d64e84bfe have no mirror and stay in the app until they are sent again

- Where: `LaneMirror.plan` runs only inside a send; nothing mirrors an existing widgets/<id>/.
- Effect: on the Investors' iPhone, a widget placed under an older build keeps running in the app on the new build.
  T-4494 item 3 (a small script runs in the widget, on an internal build) would see the old lane and could read that
  as a failure of the rule. Store users start with no widgets, so a launch-time pass is not needed for release.
- Fix: item 3's steps say to send each script again first. Noted on T-4494; no new line.

### L2. Comments and docs still describe lane.json and the opt-in key

- Where, at b08e93527f: [`pywidget/docs/research/C2-device-api.md`](c2-device-api.html) s1.7 (`(default "app")`; "the save-time scan refuses
  `"lane": "widget"`"); [`pywidget/docs/release/privacy-label.md`](privacy-label.html) s8b row "Network fetch, widget extension" ("the
  extension lane runs only lane.json's premades ... Only for a person's own lane script": now every premade and every
  sent script; the row's label conclusion, s3, is unchanged); `Shared/LauncherPremadeSlots.swift:108` ("The extension
  never runs a launcher (no lane.json names one)": in a launcher build `Premades.laneEntry` now returns the launcher
  premades, so check whether the forced redraw's reason still holds); `Shared/GatePremade.swift:5`;
  `scripts/lane_premade_diff.py:11`; `scripts/widgetkit_check.sh:43` (the `WK_LANE_NAMES` default hard-codes
  `countdown habits quote`, which `test_lane.py` now derives, so the two can drift); ADR-007 s5 bullets "What may run
  there", "The mirror" and "The premade list" (Ines's text).
- Effect: the next reader follows the old rule. C2 is the bridge contract the Swift comments cite. The privacy label
  evidence is what we would show if asked.
- Fix: rewrite each to T-4494's rule; Ines rewords the ADR s5 bullets. Board: T-4837.

## Board lines

- H1: no new line. Notes on T-4631 (my finder half now gates lane-on TestFlight) and T-0972.
- M1: T-4836, Idris, P2 (Maren reviews the words).
- L1: note on T-4494 (item 3's steps).
- L2: T-4837, Idris, P3 (ADR part to Ines).
{% endraw %}

</div>
