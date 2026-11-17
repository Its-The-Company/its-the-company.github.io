---
layout: "default"
title: "Review of T-4280: lane choice per widget by its own measured runs (ADR-007 s3)"
section: "documents"
description: "The rule itself is written well. LaneChoice.judge is small, ordered as the ADR orders it, and pure. The move goes after the run&#x27;s row and before the judging that can end the process. The ask mark is taken before and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4280-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 26 · Mon Nov 16</span><span><code>pywidget/docs/reviews/t4280-pernille.md</code></span></div><h1>Review of T-4280: <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> choice per widget by its own measured runs (ADR-007 s3)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4518, Commandment 13), as the owner of the lane's Python half (`lane.py`, the bridge contract).
Author: Idris. Reviewed: c76347c124 (the code and tests) and f82659b8b3 (board note and memory only; nothing to review
there), against ADR-007 revision 2 s3, s5 and s7.1 as they stand at f82659b8, and the T-4280 board line's Done when.
`git log --grep T-4280` names no other commit of this work (b9aebdcba9 is T-4494's, reviewed separately). Line numbers
are at f82659b8. I checked HEAD (7a63576b8b) for each finding: the badge rule, `LaneDeviceRouter`, `lane.py`'s denials and
the premades' imports are as below there too, so every finding stands on main. Reading, plus one host Python check of
`lane.denied` (below); no Xcode, Simulator or phone run. Date: 2026-11-16.

## Verdict: FAIL (H1 and H2 before any lane-on TestFlight build)

The rule itself is written well. `LaneChoice.judge` is small, ordered as the ADR orders it, and pure. The move goes
after the run's row and before the judging that can end the process. The ask mark is taken before and after each run, so
an earlier run's ask is not charged to this one. `liftForNewText` keeps every other id and fails closed on an unreadable
list. The tests cover each reason the Done when names (fits, memory, time, refused import, killed, plus the app-only ask
and new text). The 9 MiB first-run figure is the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line's.

The trouble is what the rule now does to the ten premades, which this commit moved from a fixed list of three into the
widget lane. A move is drawn as an error, for good. And the one reason that should be known before any run, a refused
import, is only found when a run fails loudly. A premade that catches the failure (GitHub) is never found at all.

## Findings

### H1. Every size move draws the error badge on the Home Screen, and a premade can never lose it

- Where: `Shared/ExtensionLane.swift:433` (the move is `demotions.add`), `Shared/LaneGuard.swift:32-35`
  (`WidgetLane.badged` is "on `.lane-demoted.json`"), `Widget/PyWidget.swift:85` (every entry of a drawn timeline takes
  that badge); ADR-007 s7.1 row 4 ("or the id is on `.lane-demoted.json`").
- The failure: s7.1 row 4 was written when only a failure put an id on the list (a <span title="A test written in advance. If it fires, we drop the idea.">kill</span>, a repeated refusal). T-4280
  puts the normal fallback of s3 item 7 on the same list. So a widget that is simply too big for the widget, and runs
  correctly in the app, shows "last good render + badge", the error state. From the premades' own code, at least
  Altitude, Distance, Steps and Sun (location or pedometer, `NotAvailableHere` in the extension) and Shortcuts
  (`from urllib.parse import quote`, a `NEVER` root) move on their first widget-lane run. So five of ten premades carry
  an error badge on every lane-on build. A person's script can drop it with new text. A premade has no text to save,
  and `LaneDemotions.remove`, the only other <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span>, has no caller at f82659b8 (LaneGuard.swift:205, "nothing calls this
  yet"; T-1643's button since is switched off). So the badge stays until reinstall.
- Why High: the ADR's own words say the app lane is a fallback ("Nothing it shows claims more than that", s3 item 7),
  and the T-4181 feature's evidence is a screen recording of placed widgets. A badge on half the gallery is what that
  recording would show. The flag is on in the internal TestFlight build (`PYWIDGET_LANE_GATE`), and the store build's
  default is on unless the lane is proven impossible (s3, "The lane flag").
- Fix: Ines rules first. She needs to say whether s7.1 row 4 badges only the failure moves (`killed`, `refused`) or every
  id on the list. My reading of s3 item 7 is failures only. Then `badged` reads the reason: `lane-moved` holds it
  already, though not for a judged marker or the pre-T-4280 entries, which should stay badged. Test: a widget moved
  for `memory` is not badged, and one moved for `killed` is.

### H2. A refused import is found only by a failing run, and a caught one is never found (GitHub stays in the widget, offline)

- Where: `Shared/Premades.swift:100-103` (every premade is a lane entry now, with no scan); `Shared/LaneGuard.swift:422-423`
  (a refused import is known only from `errorType` or the router's ask mark); `Shared/Bridge/LaneDevice.swift:39` (the
  mark is set only for device calls); `widgets/premade/github.py:36-39, 62-65` (`from pywidget import keychain` and
  `from pywidget import http`, each in `try ... except Exception`); `App/Runtime/_pywidget_runtime/lane.py:288-291, 512-514`
  (the finder raises `LaneImportError`, an `ImportError`, for `pywidget.http` and `pywidget.keychain`).
- The failure, three ways:
  1. GitHub: in the extension both imports raise `LaneImportError`. Host check at f82659b8:
     `lane.denied('pywidget.http')` and `lane.denied('pywidget.keychain')` are True, and `LaneImportError` subclasses
     `ImportError`. GitHub's `except Exception` swallows both, so `fetch` returns the cache unchanged. The run ends `ok`
     with no `errorType` and no device call, and `judge` says `fits`. GitHub stays in the widget lane for good and never
     fetches. Before T-4280 it was off the list and ran in the app, where `http` works. This breaks T-4181's own Done
     when, "a widget that reads the web does the same". The same pattern in a person's script is caught by the save-time
     scan (s5, T-0972's `send_lane`); premades get no scan now.
  2. Shortcuts: its top-level `urllib.parse` import fails the first lane run with `LaneImportError`. That is an error row
     in Activity naming a premade the person did not write, an error status (a card if no tree yet), then H1's badge.
  3. Altitude, Distance, Steps, Sun: the first lane run asks the router, gets `NotAvailableHere`, catches it and writes a
     tree for the wrong state ("Motion is off", or no fix). Only then is the move made. That tree is what the widget shows
     until an app-lane trigger runs it: the app opened, a tap, or Pro background.
- Why High: a shipped premade shows no data, or a false state, with nothing the person can do. It is a regression from
  the list, which s5 says admitted a premade "only if its scan is clean and every device call it makes is answered in the
  extension". Under s3 the list stops being a fixed set, but s3 item 3's third condition is a static fact about the
  script, not a measured one.
- Fix (mine and Idris's): place each premade by the same check a person's send gets. Run `lane.send_lane`/`scan_source`
  and the device-module scan over the bundled premades at build time or in a host test, and send the ones that fail to
  the app lane before any run. Then `LaneChoice` judges only memory and time for premades. As a second guard for any
  script, the finder should note each refusal it raises, caught or not, the way the router notes an ask. That half is in
  `lane.py`, so it is mine. Tests: GitHub, Shortcuts and Steps never take a widget-lane turn, and a lane run whose
  script catches a `LaneImportError` is judged `refused_import`.

### M1. One run decides a time or memory move, and for a premade the move is permanent

- Where: `Shared/ExtensionLane.swift:400-404, 433`; `Shared/LaneGuard.swift:424-425`.
- The failure: one run past 2.0 s demotes at once. So does one run whose 2 x (peak - residue) is over W, for example a
  `pywidget.net.get` to a slow server or a cold run on a busy phone. The older `refused` move waits for a repeat in a
  later process because one sample proves little (s5, "two in one reload prove nothing"). Before T-4280 a timeout "came
  back: it stays" (the doc at ExtensionLane.swift:319). Now one timeout <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parks</span> Countdown in the app, and with H1 badges it,
  with no lift for a premade. The ADR says "from the widget's own measured runs" (s1 item 1) and is silent on how many.
- Fix: Ines rules whether time and memory need a repeat in a later process, like `refused`, or one run is enough. If one
  run is enough, premades need a way back, such as a lift when the app build changes the premade's file. Test either way.

### L1. The reason file and the list can disagree

- Where: `Shared/LaneGuard.swift:217-236` (`remove` lifts and leaves `lane-moved`); `ExtensionLane.swift:347` (a judged
  marker demotes and writes no reason, but an older `lane-moved` stays); `App/Projects/WidgetScriptSave.swift:309-312`
  (`clearLastRun` deletes the reason even when `liftForNewText` returns false, so the widget stays in the app with no
  reason); `RunLog/RunLogRecorder.swift:95-100` (the app's row reads the file, not the list).
- Effect: an app-lane row can name a stale reason or none. T-4281's editor line will read the same file. Fix: `remove`
  and the judged-marker path clear or rewrite `lane-moved`, and `newText` deletes it only after a lift that worked.

### L2. A lift can be undone by the old text's run, and resending unchanged text lifts a kill

- Where: `App/Projects/WidgetScriptSave.swift:289, 295` against `Shared/ExtensionLane.swift:405, 433`.
- Effect: (a) A save that lands while the extension is running the old text is lifted at once. The run then finishes,
  and `demotions.add` and `record(moved:)` charge the old text's figures to the new text. `record(peak:)` had the same
  race before; the demotion is new. (b) `newText` runs on every save the mirror commits, including one with unchanged
  text. A script that got the extension killed is lifted by resending it, at the cost of one more kill. Fix: (a) the
  extension re-reads the mirror's script, or a generation number, before it moves the widget. (b) Lift only when the
  text differs. Neither needs a phone; both are unit-testable with the injected run.

### L3. Two readings of s3 are open (no new line: T-4494 item 4 asks Ines)

- `LaneChoice.judge` uses 2 x (peak - residue) where s3 item 1 says P is "peak memory above the process's baseline". The
  doc at LaneGuard.swift:385-389 argues it well, and the cold case is the same. The rule also applies in the gate
  build, whose record-only margin does not cover it. So the device sitting stops measuring a widget after one
  over-budget run. Both are already on T-4494 for Ines; I agree they need her line before the sitting.

## Done when, as it stands

Tests for each reason: present (`Tests/LaneChoiceTests.swift`, 19 tests, through an injected run; the commit records
PyWidgetTests 1821 run, 0 failures). Not run by me. The Simulator and internal-build recording and the user-script mirror
went to T-4494 (items 1 and 3). The real router-to-lane wiring of the ask mark is right by reading
(`RunInfo.script` is `widgetID ?? scriptID`, PyBridge.swift:213), but no test drives it through `LaneDeviceRouter.handle`.
H2's fix tests should cover it.

## Board lines

- H1: T-4630, Idris, P1, with Ines's ruling on s7.1 row 4 first.
- H2: T-4631, Idris, P1 (the Swift and premade placement), with the finder's refusal note mine.
- M1: T-4632, Idris, P2, with Ines's ruling first.
- L1 + L2: T-4633, Idris, P3, one line.
{% endraw %}

</div>
