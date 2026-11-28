---
layout: "default"
title: "ADR-007: Where a widget&#x27;s Python runs. In the widget first; the app when the widget is too small for it (revision 2, one text)"
section: "documents"
description: "The Investor&#x27;s words (#283): &quot;We should continue to prioritize running the code in the widget unless this is proven impossible. If small code files can run in-widget but large ones cannot, some widgets must run in-app\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-007-execution-architecture.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 23 · Fri Nov 13</span><span><code>pywidget/docs/decisions/ADR-007-execution-architecture.md</code></span></div><h1>ADR-007: Where a widget's Python runs. In the widget first; the app when the widget is too small for it (revision 2, one text)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Status: **accepted, revision 2** (Ines, CEO, 2026-11-13, T-4272). One text, written after the Investors approved the Restructuring's keep, change or drop tables (Restructuring 11, an Investor, #280 c6858665300, A, 11:22 AM ET 11-13), whose row for this ADR read "one new text". Its content follows the Investor's answer to Restructuring 14 (#283 c6857824620, 10:46 AM ET 11-13) and my <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> line of 11:37 AM ET that day (T-4267), which this text folds in without changing its meaning. One correction to that line, mine: its sentence "No new text replaces this ADR" went further than the answer. Item 14 changed what this ADR decides, not whether it is one text, and #280's A had approved the one-text row; that sentence is withdrawn here, and the rest of the 11:37 AM line stands. Revision 1 (Idris's proposal of 2026-10-25 8:12 PM ET, Odalys's review, 4 amendments and 20 chair lines from the 9:08 PM acceptance to the 11-13 11:37 AM line, about 33,000 words) is archived word for word at `archive/ADR-007-r1-2026-10-25-to-11-13.md`. "r1 s5.3" below means section 5.3 there; "r1 10-29 8:03 AM" means the chair line of that time (the archive's headings give such times in 24-hour form). Where the two differ, this text wins.
- Authors: Idris (r1's design and its engineering detail), Pernille (the bridge contract and the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s Python half), Odalys (r1's review), Maren (r1 amendment 4); this text, Ines. Nothing here was measured for this revision; every figure is from the record it cites.
- Interface: [`pywidget/docs/design/bridge-contract.md`](bridge-contract.html) (its names and rules win where this text is silent). Widget format: ADR-002. Scope: ADR-001.

## 1. The decision

**The Investor's words** (#283): "We should continue to prioritize running the code in the widget unless this is proven impossible. If small code files can run in-widget but large ones cannot, some widgets must run in-app, and this should show during development and be measurable".

1. **Two lanes.** A widget's Python runs either inside the widget extension (the **widget lane**) or in the app (the **app lane**). Each widget tries the widget lane first; the app lane is its fallback. The size rule in section 3 decides, from the widget's own measured runs.
2. **The widget lane is <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> only if it is proven impossible** (section 3 item 9), and then only after the Investors see the figures. Gates <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span> to G3 (r1 s6) no longer decide whether the lane exists; their figures feed the size rule.
3. **The IDE is untouched by any widget limit.** Console runs, previews, Pages and Shortcut runs use the app's full runtime.
4. **The renderer draws only the view tree** (ADR-002), in either lane. No widget draws anything a tree did not describe, and the state cards, badge and stale mark are the renderer's, never the tree's (ADR-002 Ruling 3).
5. **Tenet 1's priority of 2026-10-29 stands** ("Python in the widget preferred"; #283).

What this replaces from r1: section 4's option (b), "Python runs in the app; the extension only renders", as the default for every widget (withdrawn 11-13 11:37 AM). What it keeps: option (b)'s whole app-lane design, now the fallback, and option (c)'s lane, now the first choice. Options (d), cloud execution, and (e), another interpreter, stay rejected for r1 s3's reasons. Lazy imports stay on in both processes (r1 s3 row e).

## 2. What runs where


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. What runs where, scrolls sideways" style="--tw:640px" markdown="1">

| Widget extension | App |
| --- | --- |
| The view-tree decoder and SwiftUI renderer, every family and mode (ADR-002) | CPython 3.15.1 with the full bundled runtime; the bridge (section 11) |
| **Widget-lane runs:** a `lane: widget` script from `lane-scripts/<id>/`, under the allowlist, the margin and the 2.0 s budget (section 5) | **App-lane runs:** every widget not in the widget lane, on the triggers in section 4; every console, preview, Page and Shortcut run |
| State precedence from `tree.json`, `status.json`, `entitlement.json` and the tree's `version` (section 7) | Writes `entitlement.json` (StoreKit); keeps the widget library and `lane-scripts/` current |
| Timeline construction, the badge, the synthetic stale entry (section 7.3) | Schedules background refresh (section 12) |
| `getSnapshot` and `placeholder`: last good tree, else the premade's bundled preview tree, else the renderer's placeholder; never a run | Gallery previews: real runs in the app; they write nothing to the App Group |
| The Swift network primitive `pywidget.net.get(url, timeout)`, through `URLSession` (`device_call("net", ...)`), the same call in both processes | The same primitive; urllib and the rest of the stdlib as bundled |

</div>


The widget lane is a memory guard and a fair way to assign blame, not a security boundary (section 13).

## 3. The size rule (chair line 2026-11-13 11:37 AM, folded in)

A widget's size is what its runs measure, not its file length: a ten-line script that imports a large module is large.

1. **Two figures per widget:** P, its peak memory above the process's baseline, and T, its run time. Both are on every lane run row (`peak_mb`, `duration_ms`).
2. **The widget budget W** is the lowest free memory at rest the phones have shown: 23 MB today (iPhone 15, iOS 26.6.2, build 4, 44 cold extension processes, 23.0 to 25.2 MB free; C = 30 MB on that phone). The phone sitting replaces it, with the oldest supported phone's figure if lower.
3. **A widget runs in the widget** when 2 x P <= W (the 2 x margin, r1 11-01 1:03 PM, stays; at W = 23 that is P <= 11 MB), T <= 2.0 s (the lane's `budget_s`), and it imports nothing the lane refuses (section 5). Otherwise it runs in the app.
4. **Before any measurement, the widget lane first.** A new or edited script starts in the widget. Its first run assumes 9 MB, the phone's cold Countdown peak, in place of 21 MiB, a Debug Simulator figure (r1 11-03 2:24 PM) that made every first run need 42 MB, over C. With 9, a first run needs 18 MB against 23 to 25 MB free. `LaneMargin`'s first-run figure changes to 9 under T-4280; the sitting confirms it or raises it.
5. **The app's estimate, labelled as one.** The editor may measure a run in the app (the run's peak above the app's footprint at its start) to warn before a script reaches the widget. The estimate never moves a widget to the app unless 2 x the estimate is over W, and it is always shown as "estimated in the app". The widget's own figure replaces it at the first lane run. Whether the two agree is unmeasured; the sitting compares them.
6. **On the phone, the existing paths stand:** a marker found (killed) moves the widget to the app at once; a refusal moves it only when it repeats in a later process (section 5). Saving new script text clears both, so an edited script tries the widget again.
7. **The app as fallback.** A widget in the app lane refreshes by section 4's triggers: when the app is open, by the refresh tap, and in the background with Pro (section 12). Nothing it shows claims more than that.
8. **Shown during development.** For the open widget script the editor shows: the lane ("Runs in the widget" or "Runs in the app"); the reason (fits; needs N MB, the widget has W; took N s, the widget allows 2.0; imports a module the widget cannot load; moved to the app after the widget was stopped on this phone); P against W and T against 2.0 s; and where the figures come from ("measured in the widget on this phone, n runs", "estimated in the app", or "not measured yet"). The Run log rows carry the same figures. The words are Maren's to draft (T-4281).
9. **Proven impossible** means: on a Release build, on the oldest supported phone, Countdown (the smallest lane premade) cannot complete in the widget in 6 or more cold processes (killed, or no headroom for its measured peak at rest). Only that parks the lane, and it goes to the Investors with the figures before anything is parked.

**What the phone has shown** (11:37 AM line; `ops/plans/T-4267-lane-numbers.py` on the #231 export): Countdown ran in the widget 69 times from 11-09 to 11-13, 69 `ok`, none killed; 14 to 283 ms, median 15; 9 MB above baseline on all 7 cold runs, 11 to 15 MB on warm runs. The margin as then built would have refused 4 of the 69; they ran because the gate build only records. Not yet shown: a large script, the oldest supported phone, two lane widgets in one process (G2), a deliberate kill (G3).

**The lane flag.** Internal builds keep the lane on, as build 4 does. The sitting's chair line sets W, the first-run figure and the flag's default for the store build, which is on unless the sitting proves the lane impossible (item 9). Turning the flag off is one build with no data change: `lane: widget` widgets then run as `app` and nothing a person saved breaks (r1 10-29 8:03 AM item 6).

## 4. App-lane runs

### 4.1 Triggers


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4.1 Triggers, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Trigger | What runs | Reload |
| --- | --- | --- | --- |
| <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> | The app comes to the front; the editor saves a widget script; a premade is added or configured | every placed app-lane widget in one batched run, changed ones first | `reloadAllTimelines()` once, from the active scene (foreground reloads are budget-free, saved Apple page K:64) |
| T2 | Background refresh, `BGAppRefreshTask` `com.pywidget.refresh` (Pro; section 12) | app-lane and demoted widgets, under the batch rule | `reloadTimelines(ofKind:)` only for widgets whose tree changed |
| T3 | App Intent Refresh Widgets (a Shortcuts automation) | the named widgets, or all, under the batch rule | as T2 |
| T4 | App Intents Run Script, Run Script with Input | the script, `budget_s` 20; a widget script's tree is written too | as T2 |
| T5 | Widget action intents (after 1.0; ADR-002 Ruling 5) | the handler, then the render | the system's, on iOS 27+ |
| T6 | WidgetKit asks for a timeline (`getTimeline`) | no app run. A `lane: widget` widget may run in the widget (section 5); an app-lane widget reads its saved tree, and with no `tree.json` writes `wants-run` and shows the error card | it is the reload |
| T7 | Location wake, push | not in 1.0 (push needs a server) | - |

</div>


iOS tells the app nothing when a widget is placed, removed or reconfigured, so a new placement is written at the next T1 or T3 (r1 s5.1, Idris's T-0684 limit). `wants-run` is honoured by the next T1 to T4 run. A tree's `reload_policy` is clamped to the expected interval of Apple's budget.

Dated line (Idris), 2026-11-15, T-4542, **in force when ADR-011 is accepted** (proposed until then): T5 becomes 1.0 for Buttons only (the Investors' ruling of 11-15 9:11 PM ET, #41 c6905386313). A button's handler runs in the extension on iOS 18 to 26 when the widget is in the lane and its `timeout` plus T fits 2.0 s; otherwise in the app, from a signed link, as a foreground run; on iOS 27+ in the app in the background. ADR-011 s4 and s7 carry the rules; Toggle stays inert (ADR-011 M9).

### 4.2 One run queue

The app has one interpreter, never finalized, and one script thread (contract s1, s2; r1 s8.1). Every app run, of every kind, goes through **one run queue**: console runs, previews, app-lane widget runs, Page runs (a Page's taps call Python on it) and Shortcut runs. Runs take the queue in arrival order, queue-then-busy (contract Q1). Two rules sit beside that order:

- A T2 or T3 batch that finds a run in progress defers its widgets (`deferred`) rather than waiting.
- A console script's change to a stdlib or bundled module stays in place for later runs until the app quits (contract s6, Kept); the Restart help says so.

On a refresh the queue calls each source once and hands the same data to every output that asked for it ([`documents/restructuring/03-structure.md`](../restructuring/03-structure.html), the Project's outputs; built with the Project, phase C).

### 4.3 The batch rule, expiry and stuck runs

- **Batch rule (T2, T3).** A widget run with `budget_s` is stopped by the contract's <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> (interrupt and SIGURG wake at 0, every 250 ms; hard stop at 2.0 s; deadline 5.0 s; then `stuck`), so its worst case is `budget_s + 5.0` s. A batch starts the next widget only if `elapsed + budget_s + 5.0 <= 25 s`; the rest are `deferred` and keep `wants-run`. A widget deferred twice in a row for time runs first next batch. Default `budget_s` 5; the manifest may set up to 20.
- **Expiration handler (T2).** Set before the first run. When iOS calls it: stop the run in flight, write `expired` for it and `deferred` for the rest (neither badges), append the run's `run_id` to that widget's `status.json` `expired_runs` (the last 8), put `backgrounded` in the crash marker, reschedule, and call `setTaskCompleted(success: false)` at once. The run is stopped, not resumed (r1 s5.3; amendment 3 item 1; 10-26 2:40 AM item 3).
- **Stuck.** A run past the 5.0 s deadline holds the only interpreter. The stuck widget gets `stuck` and its badge; the batch ends; the rest are `deferred`; T2 completes and reschedules; T3 returns "Python is busy in PyWidget. Open the app to continue." Every run then refuses until the thread returns (`unstuck`) or the app is quit. The app never quits itself (r1 s5.3).
- **Our scheduling never counts as the script's failure.** `expired` and `deferred` count toward neither the loop breaker nor a handler's attempts; `stuck` and a dead process count toward both (r1 amendment 3 item 3).

## 5. Widget-lane runs

- **What may run there.** A script whose manifest says `lane: widget`. A person never types it: the send decides (r1 11-01 6:17 PM item 3, T-0972) by running `lane.py`'s scan in the app's Python, one scanner, no Swift port. A clean scan gets `lane: widget`; a banned import gets `app`, the save still succeeds, and one line names the import and says the widget updates when the app runs. A script that reads `pywidget.device` modules the extension cannot answer (location, pedometer, until T-0053's second extension) gets `app` the same way (r1 11-02 4:02 AM item 2).
- **Allowlist.** `json`, `datetime`, `math`, `os`, `re`, `zoneinfo`, `collections`, `itertools`, `string`, `textwrap`, `pywidget`, `pywidget_ui`. Never in the extension: `ssl`, `urllib`, `http`, `email`, `sqlite3`, `asyncio`, `ctypes`, `_decimal`, `multiprocessing`, `concurrent`, and every native package. Enforced twice: the save-time scan, and a `sys.meta_path` finder installed only in the extension that raises `ImportError` with the same text (r1 10-29 8:03 AM item 2).
- **The mirror.** The app copies each `lane: widget` script and its manifest into `lane-scripts/<id>/` on save, as one directory rename; the extension reads it and never writes it (r1 11-02 4:02 AM item 1).
- **Time.** `budget_s` 2 s, deadline 4 s; `getTimeline` returns the cached tree at its own wall-clock deadline and never waits on the script thread.
- **Marker and demotion.** `widgets/<id>/ext.marker` is written before the run and cleared after. A marker found at the next call means killed or stuck: the id joins `widgets/.lane-demoted.json`, the widget shows its last good tree with the badge, the app lane refreshes it, and it returns to the widget lane only after a successful app run and the person's say-so, or when new script text is saved (section 3 item 6). The declared lane stays in `pywidget.json` (r1 11-01 1:03 PM item 1).
- **Margin, in the lane.** <span title="How many people show, in their own words, that they want this.">Need</span> = 2 x (peak - residue), never below 0, where residue is the process's footprint now minus its baseline and peak is `widgets/<id>/lane-peak`, or the first-run figure with none (section 3 item 4). A run that did not raise the process's lifetime peak leaves `lane-peak` alone. A run the margin refuses is `oom_guard`: skipped, cached tree, stale clock, `lane-refused` down. A refusal in a later process demotes; two in one reload prove nothing. A completed run clears `lane-refused` (r1 11-01 1:03 PM item 2).
- **The premade list** (`widgets/premade/lane.json`): a premade goes on only if its scan is clean and every device call it makes is answered in the extension (r1 11-02 4:02 AM item 2). Under the size rule the list stops being a fixed set: each premade is placed by its own figures.
- **The Refresh button.** On iOS 18 to 26 the Button intent runs in the extension, so a lane widget reruns there; `getTimeline` reruns Python only when the tree's `sampled_at` is older than the widget's minimum interval, and treats a future `sampled_at` as old (r1 10-29 8:03 AM item 2; 11-01 6:17 PM item 1).
- **Pro premades** are gated before their script runs in the extension, as before drawing.
- **A run that cannot start** (no runtime config, Python unavailable, not queued, no marker) is `error`, type `InternalError`: one row per turn with reason `start_failed`, `status.json` updated, the badge, no demotion (r1 amendment 4).
- **End of every lane run.** The extension's runner writes the row, the detail file and `status.json` through the same store, under the same lock, as the app (r1 11-03 9:09 PM Fix A, T-1764).

## 6. Memory

- **C**, the extension's ceiling: 30 MB on the one phone measured (iPhone 15); it may differ by device class. **A**, the app's background limit: unmeasured, read, never assumed. **B**, the render path's own baseline: not measured on its own; that phone's extension footprint at rest was 4.8 to 7.0 MB.
- **One margin rule** for every process: a run or a render starts only if headroom >= 2 x its last measured peak above baseline. Headroom comes from `os_proc_available_memory()`; C is never compiled in. On the Simulator that call returns 0, read as "unknown": the check passes and the row records `headroom=unknown`; a unit test drives the rule with stubbed headroom (r1 s6).
- **App first run:** 2 x 13.4 MB, about 27 MB, because the app runs heavy scripts (r1 s6; 11-01 1:03 PM). **Widget first run:** section 3 item 4.
- **Render path.** Decode, then render only if headroom >= 2 x the render cost of this widget's last tree, measured after the SwiftUI render; otherwise the error card's `tree_too_large` variant. No older tree is kept to fall back to.
- **<span title="A measured fact that holds a grade below a letter, however good the rest is.">Caps</span>** (tree bytes, inline bitmap bytes) are numbers outside the schema (ADR-002 Ruling 4).
- **The app's background batch:** the margin per widget at its start; a refusal is `oom_guard`, no badge, and the batch goes on.

## 7. What a widget shows when something goes wrong

### 7.1 Precedence (first match wins, per timeline entry)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 7.1 Precedence (first match wins, per timeline entry), scrolls sideways" data-n="1" style="--tw:781px" markdown="1">

| # | State | Source | Shows |
| --- | --- | --- | --- |
| 1 | Update card | `tree.json` `version` is not one this renderer reads | card |
| 2 | Pro card | a Pro premade whose entitlement is missing from `entitlement.json` (a missing file means none) | card; the app stops writing its timeline and reloads it |
| 3 | Error card | no `tree.json` yet ("Script error", line, "Tap to open"); or `render-fault.json` says `tree_too_large` (its own copy) | card |
| 4 | Error badge | `last_outcome` in {`error`, `timeout`, `stuck`, `killed`}, or the badge rules of 7.2, and a tree exists; or the id is on `.lane-demoted.json` and its `lane-moved` is not exactly `memory`, `time` or `refused_import` (a failure move, `killed` or `refused`, or no reason, or a word that is not one of those three); an unreadable list badges every id (chair line 4:58 PM ET 11-16, in 7.2) | last good render + badge |
| 5 | Stale mark | the entry is at or after `sampled_at + stale_after` | last good render + clock |
| - | Normal | otherwise | the entry's view |

</div>


Never a blank widget. The traceback never leaves `status.json` and the Activity screen; the card shows exception type and file on medium and larger, the line on the Lock Screen. `last_outcome` is for display only: nothing that counts or labels a failure reads it (r1 10-26 2:40 AM item 2).

### 7.2 Outcomes

The bridge's `status` maps to the widget's outcome (contract s11 A4): `ok` with a tree, or `exit` 0 with a tree, is `ok`; `error`, `syntax_error`, `internal_error`, `exit` non-zero and `exit` 0 without a tree are `error`; `interrupted` after our budget stop is `timeout`; `stuck` is `stuck`. `oom_guard`, `killed`, `expired`, `deferred`, `entitlement_lost` and `tree_too_large` never reach Python. The per-outcome table (what each writes, shows and does next) is r1 s7.2, with these changes since:

- **`killed` after an expiry.** Launch recovery for a marker whose `run_id` is in `expired_runs` writes nothing to `status.json`: no badge, the streak neither counts nor resets; the run row is `killed` with the "iOS closed PyWidget in the background" copy (r1 10-26 2:40 AM item 1). The list is trusted only for ids the expiration handler listed in this process; a <span title="A test written in advance. If it fires, we drop the idea.">kill</span> matched only by the file counts, and four in a row on background triggers demote (r1 11-03 9:09 PM Fix B, T-1765).
- **Loop breaker.** Two `killed` or `stuck` in a row on background triggers set `background=false`; the widget runs only on T1 until a T1 run succeeds.
- **Dated line (Idris), 2026-11-27, T-0793 slice 7** (where `background` is written and read; for Pernille's review).
  Written: by RunLogRecorder, in the hold of every widget row it writes (a run's row, a lane turn, a run that never
  started, launch recovery), after that row's status write: the widget's newest rows are read back (the last 64 KiB of
  `runs.jsonl`) and `LoopBreaker.decide` sets `status.json` `background` to `false`, or removes it on a T1 `ok`. Only
  `false` is ever written; a missing key, or anything that is not the JSON `false`, reads as true. Either process may
  write it (the extension's `system` turns are background triggers). A streak that runs back past the 64 KiB counts
  short and does not demote. Read, in 1.0 so far: T2 only, through `RefreshAsks.asks` (the firing's ids and the
  reschedule's ask). Not read yet, each a later slice of T-0793 that needs its own line here: T3's batch (Refresh
  Widgets from Shortcuts) and the extension's `system` runs of a `lane: widget` widget, which "runs only on T1" also
  covers.
- **Dated line (Idris), 2026-11-27, T-0793 slice 7 fix** (Pernille's review of 17e8665241, blocking). A firing picks
  its widgets before this launch's pass (launch recovery, after the first Python start) records the last launch's kill,
  so a second kill in a row demoted the widget only after the pick, and it ran and was killed a third time. Each T2
  widget now reads `background` again after the launch-log step, before its run is queued; demoted, it is skipped with
  no row, as one left out of the pick. The check is run by every row, of any kind, so history from before slice 7
  counts at the next row; a lost restore write keeps the widget off background triggers until the next T1 `ok`.
- **Dated line (Idris), 2026-11-27, T-0793 slice 8** (T3 reads `background`; for Pernille's review). The app's run
  path reads `background` again after the launch-log step for every trigger on the loop breaker's background side
  (`bg_refresh` and `shortcut`; WidgetWriter.readsBackground), so the Refresh Widgets intent (T3, and T4 through it)
  leaves a demoted widget out, with no row, as T2 does. A tap on the widget's refresh button (`intent`) still runs
  it: a person is looking, and `intent` neither counts nor restores. T1 runs it, and its `ok` restores. Still not
  read: the extension's `system` runs of a `lane: widget` widget (a later slice, its own line here).
- **Dated line (Idris), 2026-11-27, T-0793 slice 9** (T1 after a background pass; for Pernille's review of slice 8,
  Low 1). T3's pass counts as the full pass, so it spaces out a T1 within 30 s, and a T1 can join a T2 or T3 pass in
  flight; either way the T1 got no run of the widgets that pass left out. WidgetPasses now keeps the ids the last full
  pass left out, and a T1 (any trigger outside the background side) runs, as a pass of its own after the one it got
  (forced, not counted), the left-out widgets it has not run: those its outcomes show left out and those the last
  full pass left out. Each is handed out once, so a second T1 within the spacing does not run it again.
- **Dated line (Idris), 2026-11-27, T-0793 slice 10** (Pernille's review of slice 9, items 1 to 4). Slice 9's "handed
  out once" did not hold for two T1s that joined one pass (two iPad scenes): both read the left-out widget from the
  shared outcomes and ran it. WidgetPasses now keeps what is owed per widget, set by each pass's own task before its
  outcomes reach anyone: a widget a pass left out is owed, one a pass ran (a tree written or not) is not, any other
  outcome leaves it as it was. A T1 is handed only what is owed, and taking it clears it, so the second joiner gets
  nothing. A pass a waiter let go still settles what it owes when it ends, as its runs happened. A widget handed out
  whose T1 pass stood down for a console run (or was let go with no outcome) is owed again; one that pass deferred is
  not, as the next activation's full pass runs it. A T1 whose own outcome for the widget is not a run (it stood down)
  is not handed it, and it stays owed. Counting is unchanged: only a pass that is seen to end, is counted and did not
  stand down sets the spacing; a pass a waiter let go no longer counts (slice 9). A widget a firing (T2, not counted)
  left out is now owed too, so a T1 spaced out by an earlier pass runs it (T1 is its restore).
- **Dated line (Idris), 2026-11-27, T-0793 slice 11** (Pernille's review of slice 10, items 1 to 3; for her review).
  Slice 10 said a widget whose restore pass deferred it is not owed, as "the next activation's full pass runs it";
  inside T3's 30 s spacing that next T1 is spaced out and was handed nothing. Now a widget handed out stays owed until
  a pass runs it (a tree written or not): one the restore deferred, stood down on, or was let go before reaching is
  handed to the next T1. While its restore pass has not ended it is marked handed and not handed out again, and that
  pass clears the mark in the same step that settles its outcomes; so a restore let go that later runs the widget
  leaves nothing owed and no second run (slice 10 put it back after the fact). A pass that never ends keeps its
  widgets marked until the process ends; the next full T1 pass still runs them, as it runs every placed widget. A T1
  drops owed ids no longer placed, so one removed and placed again is not run once more; a T1 whose WidgetKit read came
  back empty drops nothing, as a failed read reads as no widgets.
- **Dated line (Idris), 2026-11-27, T-0793 slice 12** (Pernille's review of slice 11, items 1 and 2; for her review).
  A T1's restore that waited behind a pass in flight (a firing) ran again an owed widget that pass had just run: its
  ids were not looked at again when it started. Now, in the step that starts the restore's pass, the owed widgets no
  pass still owes are dropped from it (and no longer marked handed); each gets the outcome of the pass that ran it,
  and a restore left with nothing to run starts no pass. A pass a waiter let go that runs the widget after the
  restore has started still runs it twice, as before (one extra run, only after 85 s with no progress). A widget a
  pass finds locked (Pro lapsed) or with no script is no longer owed: neither changes until the person buys Pro or
  gives it a script, so owed it started a forced restore pass at every spaced-out T1 with no end. The next full T1
  pass after that runs it, as it runs every placed widget. What else stays owed is bounded by the pass itself: a
  deferral (busy, a timed-out step, not queued, a stopped batch) or a stand-down is retried once a spaced-out T1, and
  a Python that failed to start fails the full T1 pass the same way.
- **`oom_guard` and the badge.** `oom_guard_since` is set by the first refusal and kept by later ones and by `deferred`; any outcome of a run that started clears it. A refusal reads as already under way, and badges at once, unless the old status is a fresh picture's (an outcome present and no `failing_since`); this covers a missing status and a refusal during a failure streak. Otherwise `showsBadge` is true for `oom_guard` when `ts` is at least 60 s after `oom_guard_since`, so one reload's refusals stay unbadged and the next reload's badge; the "already under way" fallback is `ts` minus 61 s (r1 11-03 7:51 PM item 2; 8:00 PM; 11-05 2:12 AM; 2:48 PM, rule D).
- **The drawn badge** is the demotion read or `showsBadge`, never `showsBadge` alone (r1 11-05 7:55 PM item 7). The demotion read badges an id when the list does not read, or when the id is on the list and `widgets/<id>/lane-moved` is anything but exactly `memory`, `time` or `refused_import`. A size move draws no badge; a failure move, a missing reason and an unknown one do (chair line 4:58 PM ET 11-16, below).
- **Chair line (Ines), 4:58 PM ET 11-16, T-4630** (from T-4518 H1, `docs/reviews/t4280-pernille.md`; part of T-4181). Row 4 badges only the failure moves. The app lane is the widget's fallback (s3 item 7), and a widget the size rule placed there is working as designed; drawing it as an error would put a badge on half the premades for good. The badge says a run failed or the lane stopped trusting the widget, nothing more.
  1. **No badge** from the demotion read when `lane-moved` decodes to `LaneChoice.Reason` `.memory`, `.time` or `.refusedImport` (the bytes `memory`, `time`, `refused_import`, exactly as `record(moved:)` writes them, no newline). These are s3 item 3's three conditions; s3 item 8 shows them in the editor as the lane's reason, not as an error.
  2. **Badge** for `.killed` and `.refused` (a marker found, a margin refusal repeated in a later process: s5), and, failing closed (s13 (b)), for everything else: no `lane-moved` file, one that does not decode or is over `LaneRunFiles.readLimit`, `fits` on a listed id, any other word, a folder that cannot be resolved, and a judged marker's demotion (it names no size reason). An unreadable list badges every id, as now.
  3. **No stale size reason under a failure move.** The judged-marker demotion deletes `lane-moved` before its `add`, and `LaneDemotions.remove` deletes it after a <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> that read back. Otherwise an old `memory` left by a lift would hide a later tamper demotion's badge. These two parts of T-4633 (L1) land with T-4630; the rest of T-4633 stays its own.
  4. **Unchanged.** The run's own outcome still badges by `showsBadge`: a `time` move from a `timeout` run, or a `refused_import` move from an `error` run, carries its status badge until the app lane's next `ok` run, like any failing run. With the flag off nothing reads differently. How many slow runs move a widget, and a premade's way back, stay with T-4632 (M1); placing premades before any run stays with T-4631 (H2). A script that writes its own `lane-moved` by path changes only its own widget's demotion badge, never another's; that is s13's "forging a runtime file by path" entry, and its status badge still stands.
  5. **Tests** (Idris builds; the card's reviewer reviews, Commandment 13): listed with `memory`, `time`, `refused_import`: not badged. Listed with `killed`, `refused`, no file, `fits`, `Memory`, `memory` plus a newline, over the read limit: badged. An unreadable list: badged. A judged marker over an old `memory`: badged. Not listed: not badged by the read.
- **Dated line (Idris), 2026-11-23, T-4804** (from T-4699, Pernille's M1, `docs/reviews/t4181-dba15015-pernille.md`). Item 2's judged demotion has a second path besides the marker: `WidgetLaneGuard.carryOut`, which adds this run's blamed ids (`lane_tampered`, `never_resident`, `lane_tampered_before`, a malformed payload) directly. It now deletes each blamed id's `lane-moved` before its `add`, as item 3 has the marker path do; a folder that cannot be resolved is skipped. Without it, a run over the size rule that is also judged (`ExtensionLane.turn` makes the size move first), or a widget size-moved earlier in the process and then blamed by the next run's `lane_tampered_before`, kept `memory`, `time` or `refused_import` and drew no badge. Tests: ExtensionLaneTests, each of those three cases badged with no reason on file.
- **`entitlement_lost`.** The app rewrites `entitlement.json`, stops writing Pro widgets' timelines, and reloads each Pro kind at once; Pro timelines are written at most 24 h ahead, which bounds the refund lag (r1 s7.2, A2).

### 7.3 Timeline and the stale entry

Entries are taken from `tree.json` in date order, keeping the newest past one. Let T = `sampled_at + stale_after`: if T has passed the current entry is stale from the start; otherwise one synthetic entry is inserted at T wherever it falls, cloning the entry before it, and every entry at or after T is stale. An absent `stale_after` means never stale, as the DSL does; the IDE's New-widget template sets 30 minutes (r1 s7.4, A1, Ruling 3).

## 8. Writers and the App Group

- **Every App Group file is written atomically:** temp file, `fsync`, `rename` in the same directory (r1 amendment 2 item 1).
- **The extension writes only:** `widgets/<id>/wants-run`; `widgets/.lane-demoted.json` and `.lane-demoted.lock`; `widgets/<id>/ext.marker`, `lane-peak`, `lane-refused`; for lane runs, `tree.json`, `status.json` and the run log through the shared store under `state.lock`; `widgets/<id>/render-fault.json`; `data/<id>/fields.json` only if the bound-fields build starts (section 14); from after 1.0, `widgets/<id>/state.json` under `state.lock`. It never creates `widgets/<id>/` or `state.lock`. The app writes every other file.
- **Two writers of a tree.** A writer does not replace a tree whose `sampled_at` is newer than its own, not past the clock, and whose `tree.json` was modified after this run started (r1 11-01 6:17 PM item 2). With the flag on, a run that started before the folder's `sent_at` (and that `sent_at` is not past the clock) writes no tree and no status; the send's rename goes under `state.lock` (r1 11-01 6:38 PM). No script can freeze its widget.
- **Reserved names.** `widgets/` holds id folders, `index.json`, `.trash/`, `.lane-demoted.json` and its lock, and nothing else; widget ids have no leading dot, are not `index.json`, take no `pywidget.` prefix in a user script, and are unique without regard to case. Any new file needs a dated line here (r1 amendment 2 item 4; 11-01 1:03 PM item 1).
- **Names held for after 1.0, nothing written in 1.0:** `state.json` (schema `pywidget.state/1`), `state.lock`'s state use, `failed.jsonl`, `controls/`, `secrets/`, `state_at` in `tree.json` (r1 amendment 2 item 4).
- **Dated line (Idris), 2026-11-15, T-4542, in force when ADR-011 is accepted** (proposed until then; ADR-011 s6, s7, s10 and Pernille's review M6, M8, H2). New in 1.0: `widgets/<id>/state.json` (`pywidget.state/1`, `(epoch, rev)`, one result commit per run; no ops, no `pending`, and `failed.jsonl` stays held) and `state.lock`'s state use, for the short commit of `state.json`; new: `widgets/<id>/run.lock`, held by a handler run from its snapshot to its commit, in either process, with `state.lock`'s short holds (tree, `state.json`, each run-log row) taken inside it, in the order `run.lock`, `state.lock`, premade lock (ADR-011 s7; Pernille's re-read, H2). The app creates `run.lock` as it creates `state.lock`; the extension never creates it, and with none it draws a button's link form. The extension writes `state.json` for an in-widget button run, after step 6a's gates (G-L5-1 (a), G-L5-5 widened to two processes with its kill test, Odalys's review of the L5 s5 delta). New, written by the app only: `widgets/<id>/actions.json` (the actions cache, one rename on save) and `widgets/.action-key` (the link-signing key: exclusive create, then re-read; the extension reads it, never creates it; excluded from backups and exports). `widgets/` reserved names gain `.action-key`. `controls/`, `secrets/` and `state_at` stay held.
- **Dated line (Idris), 2026-11-17, T-4761** (Pernille's review of dadba11da4, M2). The 1.0 `state.json` of the 2026-11-15 line is L5 s5.1's layout, not a layout of its own: 1.0 writes `{"schema": "pywidget.state/1", "epoch", "rev", "scopes": {"shared": {...}}}` and nothing else, with the 64 KiB cap on the whole `scopes` value (L5 s5.4). 1.1 reads it as an L5 file with `next_seq`, `pending`, `ops_log` and `failed_count` absent (1, empty, empty, 0); 1.0 reads a later build's file by those four members and carries every other member into its commit unchanged. One id, one layout, in both releases. No build has written `state.json` on a phone, so nothing is migrated. Details and tests: L5 s5.1, dated line 2026-11-17.

## 9. The run log (Activity)

Per widget, outside `widgets/<id>/`: `log/widgets/<id>/runs.jsonl` and `log/widgets/<id>/out/<row>.json`; console runs in `log/console.jsonl`. Swift writes every key; the Python runner writes nothing in `log/` or in `status.json`. Kept 14 days; a detail file at most 24 KiB (output's last 16 KiB, cut at a line start only if that keeps 8 KiB; the error's 8 KiB, innermost user frame always kept); details for the newest 100 rows per widget; `runs.jsonl` at most 1 MiB; all of `log/` at most 24 MiB. On the device only, never sent; it leaves only through Export on the share sheet. The widget never reads `log/`. Row keys and the full rules: r1 11-02 5:15 PM. A row's `trigger` is one of L2's values plus two the app adds: `editor_save` (a save in the editor) and `settings_saved` (T-4468, added 2026-11-26 by T-4641: the person saved a premade's settings Page, so the premade runs; `WidgetWriter.settingsSaved`). Both are foreground runs, and neither counts as a background trigger for the loop breaker (`WidgetStatus`, `RefreshOutcomeRule`).

## 10. What a widget may claim

"A widget shows its script's last run, not a live feed." No launch document, store text or post gives a refresh figure, and none says the app refreshes in the background until a signed phone has seen it fire. A number comes back only by a new chair line with all four of r1 10-30 5:14 PM's conditions (the widget-lane form final, the reload log's count, `lane: widget` widgets only, Apple's wording attributed); new store copy also goes through creative approval. Apple's range may appear in the App Guide, attributed, with "typically".

## 11. The bridge interface

Contract names win (r1 s8.3): `run(RunRequest{run_id, source, argv, cwd, stdin, context: .app | .widget | .shortcut, budget_s})` returns a `RunHandle`; output streams as records with `seq`; the run ends with `finished` carrying `bridge-outcome/1`. A widget run emits one `widget_tree` record before `finished`, which names it as `tree_seq`; Swift validates it against `viewtree.schema.json` and writes `tree.json` atomically only on `ok`. `stop(run_id)` is run-scoped and idempotent; `restart()` returns `RestartReport`. `peak_mb` and the trigger are Swift's. Every run starts with the contract's reset (s6): user modules cleared, the interpreter kept. Widget runs get `stdin: .none`.

## 12. Background refresh (T2)

- **For whom.** With the lane flag on, T2 runs app-lane and demoted widgets only; a `lane: widget` widget already reruns on its budgeted reloads. With the flag off, every placed widget. It runs only while the person has Pro (plan 11-04 item 6).
- **When it asks.** Per placed widget, from its saved timeline: `after(d)` asks d; `atEnd` asks the last entry's date; `never` asks nothing; a stale mark earlier than that asks the stale mark; no tree, an unreadable tree or `wants-run` asks now. Any ask more than 24 h out reads as 24 h. The earliest ask, from the moment of the reschedule call, never under 15 minutes, goes to `submit` (r1 11-05 7:55 PM items 1 to 6).
- **When it is scheduled.** The task is registered before launch ends. The app submits at the end of every T1 and T3 batch and when the scene goes to the background, and T2 submits at its start and its end. Expired and stuck reschedule by the same rule, with no back-off.
- **Whether it ships.** In 1.0 only if a signed phone sees it fire (plan phase B's proof); otherwise it is cut by one build with no data change, and the strike list of r1 10-30 1:35 PM item 5 applies. Apple promises no cadence and no time of day.

## 13. Threat model

The widget lane runs the person's own scripts on their own phone inside our sandbox. It is a memory guard and a fair way to assign blame; it gives a script nothing the app lane lacks (r1 10-29 4:54 PM).

- **Must hold before the store build turns the lane on:** (a) no route crashes the app, loses or corrupts anything saved, or makes the runtime write another widget's tree or status, and a stale picture always carries its badge; (b) Swift fails closed (an unreadable report key means demote and end the process; a memory blow-up ends at the marker); (c) an ordinary script never demotes or blames another widget, and the false-alarm suite stays at zero; (d) ordinary concurrency loses nothing.
- **"Not held" may list** a route that needs deliberate reach into runtime internals when its worst effect is wrong blame among the person's own widgets, the lane's checks off for the rest of that process, or an off-list import; and forging a runtime file by path, where the effect ends at that widget's next status write by Swift or at demotion. Each entry names its route, effect and backstop. It may not list a route an ordinary script can hit, a break in (a) or (b), or a fail-open with no backstop (r1 10-29 4:54 PM item 3, widened 11-02 4:02 AM item 4, 11-03 7:51 PM item 1, 9:09 PM item 1).
- **Stated limit:** a script run in the app sits in `widgets/<id>/`, so one that clears the folder beside its `__file__` deletes its own widget's runtime files only (r1 11-02 4:02 AM item 3).
- A new review round opens only for a false alarm, a route an ordinary script can hit, a break in (a), (b) or (d), or the phone sitting.

## 14. Held for later, with their triggers

- **C2-Q1, a Swift-only location fix** in a second widget extension that alone carries `NSWidgetWantsLocation`, for widgets whose manifest declares `location`; at most 3 s inside `getTimeline`; When In Use only, never Always (r1 Ruling 2 and its 10-26 7:57 PM line; T-0053). It ships when that second extension is built and measured.
  - **Chair line (Ines), 2026-11-20 11:57 AM ET, C2-Q1 placement (T-0053; views: Idris's question in [`ops/plans/T-4188-handoff.md`](../company/t-4188-handoff.html), Wrenna's privacy row, taken apart).** The App Group premise, "no Python in the extension", no longer holds: lane scripts run Python in both extensions, and the App Group is open to every one of them, as T-0540 found for the app's own cache. So:
    1. **No `location/last.json` in the App Group,** and no other copy of a fix there; section 8's write list drops it.
    2. **Where.** The refreshed fix lives in the second extension's own container only: `Library/Application Support/pywidget/device/location-refresh.json`, with `source="refresh"` and `sampled_at`, written atomically, excluded from backups (as the app's cache is). PyWidgetExtension and the app cannot reach that container, so a script that never declared `location` in PyWidgetExtension, the app lane or the console has no path to it.
    3. **Who reads it.** Only the second extension's Swift: its location route answers `sample()` from it as `source="refresh"` while it is younger than `max_age`, to lane runs in that extension. The app never reads it; app-lane and demoted location widgets keep `app_cache` (C2 s7's first bullet), honest but old.
    4. **Deletion is the guard,** as in T-0540: that extension's Swift deletes the file before any read, at each `getTimeline`, when location is not `when_in_use` or `always` or `isAuthorizedForWidgetUpdates` is false.
    5. **Stated limit.** A script running in the second extension (a steps-only widget included, since T-0671 put steps there) can open the file by path, as the app's Python can open the app's cache. It holds only a fix the person allowed PyWidget to take and leaves the phone only if their own script sends it; `sample()` stays the only supported reader. This is a stated limit, not a section 13 row.
    6. **Privacy (Wrenna's row):** location, refreshed fix, When In Use only, on the device in the extension's container, deleted when either permission goes; App Privacy label unchanged (nothing reaches us or a partner). Before C2-Q1 ships, a Simulator test shows the file survives between extension launches and the app cannot read it, and the second extension carries its own privacy manifest. C2-Q1 itself stays open until that extension is built and measured.
- **Bound fields** (`data/<id>/fields.json`, schema `pywidget.fields`; ADR-002's bound-fields row): built only if the widget lane is proven impossible (section 3 item 9). This restates r1's trigger, "the lane fails its gates", because gates G1 to G3 no longer decide the lane (section 1 item 2).
- **Widget interactivity after 1.0** (T5; state ops in the extension; the `pending` queue): the design is r1's amendments 1 to 3 and the 10-26 2:40 AM line, gated by their G-L5 tests. Dated line (Idris), 2026-11-15, T-4542, in force when ADR-011 is accepted: Button handler runs move to 1.0 under ADR-011; Toggle, state ops and the `pending` queue stay here.

## 15. What changes the numbers

The phone sitting (T-4282, from T-0680): the Investors' phones and, if one can be had, the oldest supported phone, on an internal build carrying a size ladder (scripts of rising memory and time) and an over-allocation premade for G3. It reports per phone: free at rest; each rung's P and T in the widget and in the app; the first rung killed or refused; two lane widgets in one process; and the 3-day reload log. Its chair line sets W, the first-run figure and the store build's flag default. The 2 x margin moves only if a rung that fits is killed or a rung that would have fitted is refused. The 60 s badge gap, the 25 s batch end and the 5 s default budget each come back to the chair if the phone's log contradicts them.

**What would make this fail.** A first run at 9 MB that is really a 15 MB script: it is killed once, its neighbours in that reload lose a run, and it moves to the app; that cost is accepted, because the ruling puts the widget first and the kill is how the phone proves the script too large. A phone with less free memory than the iPhone 15 refuses more first runs; the sitting finds that. And 11 MB is small: the lane holds scripts a little larger than Countdown, not much more. That is the ruling's own picture: small in the widget, large in the app.

## 16. Board

Building this text: T-4280 (the lane choice per widget, part of T-4181), T-4281 (the editor's lane-and-measure display, part of T-4186), T-4282 (the phone sitting), T-0972 (the send decides the lane), T-0976 (a run from before the send), T-1765 (Fix B), T-0793 (background refresh), T-0053 (C2-Q1), T-0682 (bound fields, held). The archive's chair lines name the rest.

Ines, CEO
{% endraw %}

</div>
