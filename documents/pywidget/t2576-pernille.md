---
layout: "default"
title: "T-2576 review: the five landed parked fixes, before TestFlight"
section: "documents"
description: "Parked-only dependencies: none left. The only one was UIKitRunScreenHost (T-0449, parked) in 531aa51ac, which 679f72ef6 replaced. Everything else the series calls is on main: unset_lock in state-tokens.json (since\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2576-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2576-pernille.md</code></span></div><h1>T-2576 review: the five landed <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> fixes, before TestFlight</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-05. Independent review (C13): I read the six commits and the code they touch on main,
not the author's notes. Evidence of the author's run read: `pywidget/ios/bench/t2537-redo-tests.txt`. No Xcode build
of my own; F1 is one a Simulator run would settle, and is written as a finding instead.

## Verdict per commit


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Verdict per commit, scrolls sideways" style="--tw:727px" markdown="1">

| Commit | Task | Verdict |
|---|---|---|
| 531aa51ac | T-0464 DeviceCall timeout, PromptDesk | Fix first (F1, F2); F3 ship with a note |
| 679f72ef6 | compile fix, three test expectations | Fix first, with 531aa51ac (F1 is in the placement this commit wrote) |
| a291bce51 | T-0891 Lock Screen VoiceOver label | Ship |
| 574916ff1 | T-1786 tracking, contentTransition, tint, type clamp, radial radii | Ship (F4, F5, F6 Low) |
| de81cd4d5 | T-2268 GalleryFace states, bundled trees | Ship (F7, F8 Low) |
| b3131df07 | T-2097 extension memory recording | Ship |

</div>


Parked-only dependencies: none left. The only one was `UIKitRunScreenHost` (T-0449, parked) in 531aa51ac, which
679f72ef6 replaced. Everything else the series calls is on main: `unset_lock` in state-tokens.json (since
e3293237d), `PYWIDGET_LANE_GATE`/`PYWIDGET_LANE_FORCED` and `scripts/gate_session_build.sh`, `WidgetLane.extensionFlag`,
`pw_footprint`, the catalog's `trees` map (all 12 premades, each file present in fixtures/premade-trees),
`TASK_VM_INFO_REV4_COUNT` in the iPhoneOS SDK, and both purpose strings in project.yml. Run 2 of the evidence built
the whole test target, widget extension included, after 679f72ef6; run 4 covers T-0891 and T-2097. The two reds still
in run 3 (Updated node, PremadeSnapshotTests and TreeNodesTests) predate the series (T-1440).

## Findings

**F1 (Medium, fix first; T-2583).** `UIKitPromptPresenter.present` (PromptDesk.swift, 679f72ef6) returns true as soon
as it has called `top.present(a, animated: true)`; it never checks that UIKit took the presentation. `top(in:)` skips
only a controller that `isBeingDismissed`, so it can return a controller that is itself still being presented (a
sheet sliding up as the run starts and the script asks on its first line), or, after skipping, the presenter whose
`presentedViewController` is still on its way out. In both cases UIKit drops the request with a console warning.
PromptDesk then records `.presented`, and the script blocks for the call's whole timeout with nothing on screen, which
is the case contract v5.8 rule 6 says never happens. The fix is cheap: `presentingViewController` is set synchronously
when UIKit accepts, so check it right after `present` and return false (the existing "no window" refusal) when it is
nil, or present from the transition coordinator's completion. Whether UIKit drops it in each case is a Simulator
question I did not run (shared slot); the code has no guard either way. Today only a script calling `_pwbridge.call`
directly reaches this, since the public `pywidget.prompts` module is T-0447's; it must be fixed before that lands.

**F2 (Low, fix first with F1; T-2583).** Tests that would not fail on a regression: `testTheRunEndingDismissesItsPrompt`
calls `d.runEnded(50)` itself, so deleting the observer loop in `PyBridge.swift` (`for o in ... runEndObservers`)
leaves every test green. Nothing covers the "another prompt is on screen" refusal, the "no window" refusal, or the
re-check after presenting (`if currentRun() != call.runID { close(...) }`). One real-bridge test where a Stop takes
down `PromptDesk.shared`'s alert covers the observer; the rest are fake-presenter tests.

**F3 (Medium, ship; note for the contract).** Contract v5.8 rule 3 and PromptDesk's doc say a prompt is shown only for
"the run on the script thread". `br_call` stamps every call with the global `g_run_id`, not the calling thread's own
run, so a daemon thread left over from run A that asks during run B arrives as run B, passes both checks, and shows
over B; Stop or the end of B takes it down. The `run id != current` check only closes the race window. This is the
same root as the open daemon-thread item from T-0515 H1 (records are stamped with the origin run; device calls are
not). No crash and nothing leaves the device; the person sees a question from a script that has finished. Either
reword rule 3 to what is built, or stamp calls with the thread's origin run when that item is done.

**F4 (Low, ship).** `tools/swift_typecheck.sh` (574916ff1) checks `Shared/` only, so it cannot see `App/`, where
PromptDesk broke main. It is also fail-open: the output is filtered to lines containing `error:`, so a failure that
prints no such line (an empty SDK path from `xcrun`, a missing Python.xcframework slice, a crash in `swiftc`) prints
"clean" and exits 0. Check `swiftc`'s exit status, and either add `App/` and `Widget/` or say in the header which
targets it does not cover.

**F5 (Low, ship).** `testTrackingSpacesEveryCharacterByItsPoints` draws "IIIII", which has no ligatures, so it passes
just as well if `tracking` were mapped to `.kerning`, the one mistake A3 exists to rule out. A string with a ligature
pair in the system font ("fi", "ffi") would tell them apart.

**F6 (Low, ship).** A `tint` paint that is a radialGradient resolves with `side: 0` everywhere (`TreeTint.mark` from
TreeGauge, TreeProgress, TreeToggle and the `tint` modifier), so both radii are 0 and the mark draws as the last stop
only. The DSL allows any paint but `WidgetCard()` there. Either measure the side as the foreground path does, or say in
API.md that a radial tint draws its outer colour.

**F7 (Low, ship).** `GalleryAsk.LocationAsker` resumes only when the authorization changes to something other than
`notDetermined`. If `requestWhenInUseAuthorization()` shows no app prompt (Location Services switched off for the
whole phone: iOS offers its own Settings alert and the app's status stays `notDetermined`), the continuation waits
for the rest of the session, the Allow tap looks dead, and each further tap leaves another waiter. A bound (resume
when the app next becomes active, or after a timeout) keeps the tile honest.

**F8 (Low, ship; copy, for Maren).** `st.perm.loc` fills `{name}` with the full catalog name, so the distance tile
reads "Distance to a saved place needs your location to show yours." The spec's own mock (draw_gallery.py) uses the
first word. GalleryFaceTests uses the one-word "Altitude", so it cannot tell. Copy is DRAFT (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>); Maren decides which.

## Checked and fine

- PromptDesk ordering: `pw_current_run()` is set to 0 under the GIL before `pw_rt_run` returns, and the observers run
  after it returns, so a `take` that reaches the main actor after the run ended is refused, and one that presented
  first is closed by `runEnded` or by the re-check. The timer and taps go through the token, so a late tap or timer
  after a dismissal does nothing. `received` is taken before C starts its wait, so the alert goes slightly before
  Python's wait ends, never after. An infinite timeout has no timer and goes at run end.
- `prompts` is in `LaneDeviceRouter.appOnlyModules`, so the widget extension never tries to show one.
- T-0891: the pick is by the `accessory` prefix and the view passes TreeTimeline's family names. A table without
  `unset_lock` would blank the card on every family (the init returns nil); the bundled table carries it and the test
  pins it.
- T-1786: radial radii in units of the smaller side now match `Gradient.radial` (end 0.5 default) and API.md; the shadow
  default is the same black; the centre tolerance moved from 20 to 40 against a Simulator reading of [247, 30, 37]
  and still separates red from blue. The Dynamic Type clamp test fails if the clamp goes.
- T-2268: Allow is the only path to a system prompt; both purpose strings are present; Open Settings uses
  `openSettingsURLString`; the sample cache keeps a missing file as nil; the bundle copy is checked byte for byte by
  PremadesTests and test_bundle_runtime.py.
- T-2097: records only in the two gate builds (compile-time false otherwise); one `O_APPEND` write per row; once per
  process; `testGetTimelineTakesTheReadingFirst` covers the call site.
{% endraw %}

</div>
