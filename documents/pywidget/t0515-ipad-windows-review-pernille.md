---
layout: "default"
title: "T-0515 review: 11cb2531 (T-0478, iPad windows)"
section: "documents"
description: "Verdict: changes needed before this goes to TestFlight. The scene manifest, the per-window model, the undo separation and the title are sound. The run-ID filter breaks a contract rule on the iPhone path too (H1). A\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0515-ipad-windows-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0515-ipad-windows-review-pernille.md</code></span></div><h1>T-0515 review: 11cb2531 (T-0478, iPad windows)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Idris. Date: 2026-10-28. Read from the diff and the files on main at 228fbcce; no Xcode run.
Files: `pywidget/ios/App/PyWidgetApp.swift`, `App/SceneFile.swift`, `App/Info.plist`, `project.yml`,
`UITests/SceneWindowsUITests.swift`; read for context: `App/Bridge/PyBridge.swift`, `App/Bridge/pwbridge.c`,
`docs/design/bridge-contract.md` s7, `docs/design/ide/home-setup.md` s7.4.

**Verdict: changes needed before this goes to TestFlight.** The scene manifest, the per-window model, the
undo separation and the title are sound. The run-ID filter breaks a contract rule on the iPhone path too (H1).
A discarded window leaks its model and can orphan a run that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the one interpreter (H2). The second-window
Run queues without telling anyone (M1). The headline claim, output routed by run ID, has no test (M2).

## High

### H1. Output from a background thread after its run is dropped in every window, iPhone included
`PyWidgetApp.swift:308-312` (the `guard r.runID == lastRunID` on `.stdout, .stderr`).

`br_write` stamps output with `g_run_id` at write time (`pwbridge.c:349`), and `doRun` sets it to 0 when the run
returns (`pwbridge.c:631`). The contract says so (`bridge-contract.md:207`): run_id is "0 for output from a
daemon thread after its run ended (the console shows it dimmed, 'from a background thread')". `lastRunID` is
never 0 after a run, so every run-0 record is now thrown away. Before 11cb2531 the single console rendered it.

Failure: on iPhone, run
`import threading, time` / `threading.Thread(target=lambda: (time.sleep(1), print("tick")), daemon=True).start()`.
The run finishes at once ("1 background thread" in the summary), and "tick" never appears. The same goes for
a traceback from that thread (`threading.excepthook` writes to stderr). Nothing in the iPhone suite prints from
a thread after its run, which is why it stayed green. The iPhone path is not unchanged.

The second half is a misroute, not a drop: a daemon thread from window A's run that prints while window B's run
is current carries B's run ID, so it shows in B as B's output. Swift cannot tell these apart; the runtime would
have to stamp a thread's writes with the run that started the thread.

Fix (Swift, T-0566): let run-0 stdout and stderr through to one window: the window whose console run
finished last (a `lastFinishedConsoleRun` owner kept in `ConsoleModels`, or the bridge's last `.app`
run from `runInfo`). On iPhone that is the only window, which restores the old behaviour. Show it dimmed, or
with the contract's "from a background thread" prefix. Add a UI test with the daemon-thread script above,
on iPhone. The cross-window misroute needs a runtime change (origin run per thread). That is Python-side work,
and I raise it separately; it does not block this fix.

### H2. A discarded or disconnected window leaks its ConsoleModel, and its run is orphaned
`PyWidgetApp.swift:197-199` (`Task { for await r in stream { self.render(r) } }`), `PyWidgetApp.swift:104-110`
(`IDEScene`), `SceneFile.swift:39-55` (`ConsoleModels.take`, `SceneModelBox`).

The records task captures `self` strongly. It loops over a `records()` stream that never finishes, because the
bridge keeps the continuation in `subscribers` until termination (`PyBridge.swift:600-611`). The model is
therefore never freed. Each window that is closed leaves a model (transcript up to the s7 <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, editor source,
decoders) and one more subscriber that every record is yielded to, for the life of the process.

Worse, the model is tied to the scene's `StateObject`, and SwiftUI rebuilds it whenever UIKit disconnects the
scene. A disconnect is not a discard: iOS disconnects background scenes to reclaim memory, on iPhone as well as
iPad. On reconnect, `take()` has no spare, so it builds a fresh model.

Failure 1 (iPad): window B runs a script that waits in `input()`. The user closes B from the window menu or the
App Switcher. B's run still holds the single interpreter, and no window can reach its Stop. Window A's Run
queues behind it (see M1), shows Stop, and prints nothing, indefinitely. Restart in A is the only way out,
and nothing tells the user that.

Failure 2 (iPhone, rare but real): edit the script, start a long run, background the app. The scene is
disconnected. On return the editor shows the bundled or default text, so the unsaved edit is lost. The console
is empty, and the old run keeps going in the leaked model. Before 11cb2531 the model lived in `PyWidgetApp`'s
`@State` and survived a disconnect. That makes this a data-loss path on iPhone.

Fix (T-0567): keep the models in `ConsoleModels`, keyed by scene identity (a UUID in `@SceneStorage`, or
the `UISceneSession.persistentIdentifier`), so that a reconnect gets its own model back. Release a model only
when its session is discarded (`application(_:didDiscardSceneSessions:)` through an app delegate adaptor).
At that point, stop its run (`PyBridge.stop(runID:)`), cancel the records task (store it and use `[weak self]`),
and let the stream terminate. Test: a unit test that a released model deinits (weak reference is nil after
release), and a UI test that closes a running window and then runs in the other.

## Medium

### M1. Two windows: a second Run silently queues; Stop on a queued run waits for the other window; Restart in one window <span title="A test written in advance. If it fires, we drop the idea.">kills</span> another's run
`PyWidgetApp.swift:209-224` (`run()`, `stop()`), `PyWidgetApp.swift:226-236` (`restart()`).

`run()` only guards its own `running == 0`. `PyBridge.run` with context `.app` never refuses a busy runtime: it
pushes onto the one queue (`PyBridge.swift:449-452`). This does not corrupt A's output, because the filter routes
by ID. But B's Run turns into Stop and then shows nothing until A's run ends, which with `input()` or a game
loop may be never. B's Stop is correctly scoped to B's own run ID. For a queued run, though, `stop` only adds the
ID to `cancelledQueued` (`PyBridge.swift:540-542`), and the "interrupted" `finished` arrives when the script
loop reaches it, after A's run. Until then B's Stop seems to do nothing, and B cannot run again. Restart is
runtime-wide: `PyBridge.restart` stops `currentRun` whichever window owns it (`PyBridge.swift:584-590`).
B's Restart therefore ends A's run and clears A's modules. A gets an "interrupted" summary with no reason, and
only B gets the "Restarted" line.

`home-setup.md` s7.4 asks for "one run at a time holds across windows" and, for an editor run that meets
another run, the "Stop X and run Y?" alert with X as the file name.

Fix (T-0568): track the console run's owner across windows in `ConsoleModels`. When another window's run is
current or queued, B's Run shows the s7.4 alert ("Stop <file> and run here?"). Without the alert frame (T-0505),
it refuses with a console line naming the other window's file. It must not queue silently. Restart, when another
window owns the current run, asks first or names it, and the "Restarted" line goes to every window, since every
window's modules were cleared. A UI test runs in two windows: A waits in `input()`, B's Run shows the alert or
refusal, B's Stop does not touch A, and A's output never appears in B.

### M2. The tests do not cover routing, the claim that carries the risk
`UITests/SceneWindowsUITests.swift:58-121`.

Both tests prove what they assert: the separate text and undo, and the restored title. Neither runs Python. So
"run output routed to the window that started it" (commit message) has no evidence, and neither do H1, H2 or
M1. Three smaller points:
- `testWindowReopensItsFileAfterRelaunch` compares against the pristine bundled text (`b0` is read before any
  edit). An edit lost on restore, which is H2's iPhone case, would still pass. That fits the test's name, but it
  should say restore drops edits today.
- The tests are not hermetic. The relaunch test leaves a restored `tip_splitter.py` session behind, and the
  Simulator keeps sessions across suite runs. On the next run, `open(app, fileB)` in the other test can bring an
  existing window forward instead of opening one, and the test still passes. Destroy the open sessions at launch
  under a test flag (`UIApplication.shared.openSessions` and `requestSceneSessionDestruction`).
- Both skip on iPhone, and no test checks that the iPhone More menu lacks "Open in New Window".

Fix (T-0569): the UI tests named in H1, H2 and M1; the session reset; and an iPhone assertion that
`openInNewWindow` does not exist.

## Low

### L1. The crash-recovery line is printed in every new window
`PyWidgetApp.swift:202`. `lastRunReport` belongs to the launch, but every model's `boot()` says it. A window
opened an hour later announces that the last run didn't finish. Fix (T-0570): `ConsoleModels` hands the report
to the first model only, or the bridge offers a take-once accessor.

### L2. The title probe reads back what it just set
`SceneFile.swift:75-83`. `accessibilityValue = scene.title`, right after `scene.title = title`, proves the setter
round-trips. It does not prove what the window chrome or the App Switcher shows. The test comment "so the title
is checked too" claims more than that. Fix (T-0570): reword the comment, and take one screenshot of the App
Switcher as the device evidence (the ADR-004 s7 device checks).

### L3. A missing example leaves the wrong file runnable
`PyWidgetApp.swift:188-195`, `SceneFile.swift:39-44`. When `open()` cannot find the example, it leaves
`example` as it was. On the spare model that is the launch's `PW_EXAMPLE`, so the title names one file and Run
runs another (UI tests only). In a restore after an update that renamed an example, the window keeps the old
title over the default script. Fix (T-0570): on failure set `example = nil` and show the not-found line in the
editor's place.

## What holds
- The iPhone launch takes the model built in `init`, with the same banner, bridge flag and `PW_EXAMPLE`. Its
  menu is gated on `supportsMultipleWindows`. App-level `scenePhase` is the aggregate across scenes, which is
  right for the crash marker. Apart from H1 and H2, single-scene behaviour is as it was.
- No print is lost before the run ID is set. `run()` sets `lastRunID` synchronously on the main actor, and
  `render` runs on the main actor, so no record can be rendered in between.
- The filter keeps stderr, input prompts, echoes and the traceback summary for the run's own window. `.status`
  ("stuck", "unstuck") reaches every window, which is right for one runtime. Shortcut, widget and preview runs no
  longer leak their output, `input()` prompts or summaries into the console. Before this commit they could set
  `pendingInput` in the console. That is an improvement, and the console spec should say it.
- Stop sends only its own run ID.

## Re-review (T-0571): 79251e3d (T-0567, H2) and db9403be (T-0566, H1)

Reviewer: Pernille. 2026-10-28. Read from `git show` and the files on main at db9403be; logs grepped, no Xcode run.

**Verdict: H1 closed. H2 closed for the leak and the lost-text halves; the orphaned-run half is fixed in code but
no test fails without it, so T-0567 stays open.** One new Medium (N1) and three Lows; N1 is T-0572.

### H1: closed
- `render` sends run-0 stdout/stderr to `ConsoleModel.backgroundOwner` only, with its own decoders and filters,
  under "From a background thread:". On iPhone the one window is the owner after its first run, so the old
  behaviour is back (with the label).
- Ordering against the run's own `finished`: `finished` is emitted while `g_run_id` still holds the run
  (`pwbridge.c:459`), and the run ID drops to 0 only after the run returns, so every run-0 record is after its
  run's `finished` in seq order. A thread write in between carries the run's ID and shows as the run's own output
  after "Finished". Correct.
- "Started last": while any run is executing, a daemon thread's writes carry that run's ID, not 0. So run 0
  exists only between runs, and the started-last owner matters only for a run that is still queued. That is fine.
- Label repetition: the label repeats only when the window's own run output comes between two run-0 stretches.
  Since run 0 exists only between runs, that happens about once per run boundary, not per line. Acceptable.
- Tests: `ops/runs/xcodebuild-20261028-120032.log` (mutant without the routing) has three of the four new unit
  cases red (lines 6622, 6633/6637, 6642) and `testDaemonThreadPrintAfterTheRunShows` red (6781).
  `testRunZeroIsDroppedBeforeAnyRunAndOtherRunsStayFiltered` passes under the mutant. That is expected, because
  it is a guard test, but the commit's "fails all of them" is one too many. Green in `-115522.log`.

### H2: leak and reconnect closed; orphaned run fixed but not pinned
- The leak: the records task holds `[weak self]` and `close()` cancels it. `AsyncStream`'s `onTermination` then
  removes the subscriber (`PyBridge.swift:608`). `testADiscardedWindowsModelIsFreed` is red under the strong-task
  mutant (`ops/runs/xcodebuild-20261028-110609.log`, "was not freed") and green in `-114523` and `-115522`.
- Reconnect: models are keyed by `persistentIdentifier` in `ConsoleModels`, so a disconnected scene gets its model,
  text and run back. `testTheSameSceneGetsTheSameModelBack` pins it. The unit test cannot tell whether a real
  reconnect reports the same session ID, but UIKit keeps the session across disconnects, so I accept it.
- Discard while waiting in `input()`: `close()` calls `stop()`. The bridge posts Stop to every <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> slot of the
  current run (contract s4), so `input()` wakes, the run ends and the interpreter is free. A queued run goes to
  `cancelledQueued`. Correct in code.
- Bridge callbacks into a released model: none. The device handler is static (`DeviceRouter.handle`). The <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>
  timer holds a run ID, not the model. `sink` is cleared. The flush, boot and hold tasks hold the model strongly
  only for their own short lives.
- `persistentIdentifier` reuse: UIKit never reuses one. A discard at launch for a session from an earlier process
  is a no-op (the "never-seen" case). A restored session in a new process takes the spare or a new model, which is
  right.
- iPhone single scene: the launch model is still built and booted in `init`. The window shows a blank
  `systemBackground` for one main-actor hop before the probe reports the session. 309 green includes the iPhone
  UI tests, so nothing waits on that frame.
- **Not pinned:** remove `stop()` from `close()`, or the `ConsoleModels.app = consoles` line, and every test
  stays green. Those two lines are H2's Failure 1. **Is unit coverage enough without the close-window UI
  test? No, not for Failure 1.** One unit test closes the stop half, and Idris can write it without XCUITest:
  model A (bridge on) runs `input()` and waits for `pendingInput`, `consoles.discard([A])`, then model B runs
  `print("after")` and must show it within 5 s. With `stop()` deleted it hangs, so it is red. The wiring line
  still needs the UI test, or one device check recorded on T-0567. Until then T-0567 stays open; no new line.

### New
- **N1 (Medium), T-0572: closing the owner window drops run-0 output again.** `backgroundOwner` is weak and
  `discard` removes the model, and nothing hands ownership on. Window A runs and finishes, B runs and finishes
  (owner B), and the user closes B. A thread from A's run then prints, and the line goes to no window until some
  window runs again. A thread left behind by B's stopped run is lost the same way. This is H1's drop on iPad.
  Fix: in `ConsoleModels.discard`, if a closed model is the owner, make the owner the most recently used
  remaining model, or the only one. Test: two models, B the owner, discard B, run-0 output shows in A.
- **N2 (Low): run-0 output before the first console run is dropped, iPhone included.** Before 11cb2531 the console
  showed a widget or preview run's daemon thread output at any time. Now it is dropped until the console has run
  once. The guard test pins this as intended. If it is not intended, set the owner to the launch model in
  `ConsoleModels.init`. Folded into T-0572 as optional.
- **N3 (Low): the label is not repeated after an app line.** `say`/`sayLine` (for example "Restarted: N modules
  cleared ... background thread is still running") do not end the stretch. A thread that survives Restart then
  prints under the app's line, with no label. Fix: end the stretch in `sayLine`. Folded into T-0572.
- **N4 (Low): own output after a run-0 partial line joins it.** Thread text with no newline, then the next run's
  print, makes one line, because only the app's lines start on a fresh line. This is cosmetic, and N3's fix does
  not cover it. Note only.
- Runtime: the cross-window misroute (a thread's writes carry the current run's ID) is still mine, a Python-side
  origin-run stamp. It is not on the board yet.
{% endraw %}

</div>
