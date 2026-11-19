---
layout: "default"
title: "Task states: what holds an open board line, and what clears it (T-4810, T-5034)"
section: "documents"
description: "Nothing else holds a line (T-4810): (waiting until D), dated head gates, owner items like after the spike, and title words like &quot;not waiting on StoreKit&quot; hold nothing (tools/board.py stuck, parse, lane_out\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/task-states.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 27 · Tue Nov 17</span><span><code>ops/plans/task-states.md</code></span></div><h1>Task states: what holds an open board line, and what clears it (T-4810, T-5034)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-17 to 2026-11-19. One page for two changes:

- T-4810, from an Investor #41 c6966023669 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 2026-11-17 8:17 PM ET in log/rulings.md): "Tasks should only wait on
  other tasks, not arbitrary dates, since nothing triggers these tasks once the date passes ... Tasks waiting on
  Investor responses to Issues are true Blocked tasks. Everything else should be in the Queued list."
- T-5034, from an Investor #325 c6999195621 (10:55 PM 11-18: "making sure no tasks are truly marked as blocked with
  nothing that causes them to get picked up. This should be fixed for all future tasks, not a one-time cleanup") and
  c6999279079 (11:01 PM: "If a task that another task is waiting for is taken off the board for any reason, the child
  task should either be removed too (if it is no longer needed) or reworded").

## The rule

A line waits only on another task or on an Investor issue, and each wait clears on its own or by a named answer:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The rule, scrolls sideways" style="--tw:638px" markdown="1">

| Holder | What clears it |
|---|---|
| `(waiting on #N)` on an issue that can close | `tools/requests_close.py sweep` (clear_waits) when #N closes |
| `(waiting on #N since YYYY-MM-DD HH:MM)` | the first Investor message on #N after that time (ET), read from `ops/inbox/messages.jsonl`: `requests_close.py sweep` runs it first, `requests_close.py answered` runs it alone with no GitHub read |
| `Links: needs T-Y` with T-Y open | T-Y's tick (`board_links.held_by` stops holding) |
| `Links: needs T-Y` with T-Y ticked | nothing holds: the need is met |
| an owner `after T-Y` | dispatch holds it only while T-Y is open (`dispatch.py parse_line` waits) |

</div>


Nothing else holds a line (T-4810): `(waiting until D)`, dated head gates, owner items like `after the spike`, and
title words like "not waiting on StoreKit" hold nothing (`tools/board.py` stuck, parse, lane_out; `tools/dispatch.py`
held_reasons). A `- [b]` line is Blocked; held_reasons names its issue, or says it names none.

Every road that writes a wait refuses one in other words (T-4810): `tools/board_tick.py` plan_add and plan_note (the
CLI, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> outbox replays, and the tools that call them, people and machine callers alike) refuse a new line or note
whose wait names no task (T-N) and no issue (#N); `wait` (a date) is refused whole; `block` takes an issue number by
its form, and on a thread that never closes (#39, #41, and every main thread in `ops/main_thread.json`, today #325) it
writes the `since` time itself (T-5034).

## Held by nothing (the standing check)

`python3 tools/board.py held` lists every open line held by something nobody will clear, and exits 1 when any:

- **blocked_no_issue**: a `- [b]` naming no issue, no date and no feature hold.
- **never_closing**: a `(waiting on #N)` on a never-closing thread without its `since` time.
- **need_left**: `Links: needs T-Y` where T-Y left the board unfinished (archived open, withdrawn, gone), or an owner
  parenthesis `after T-Y` whose every T-Y is off the board (dispatch stops holding it then, so the line would start
  with its stated need unmet: reword or drop it).
- **feature_hold**: `(held for its feature: ...)` from `tools/feature_place.py`; no tool releases it.
- **wait_until**: the old `(waiting until D)` text from `board_tick.py wait` (retired by T-4810).

It runs:

- as `tests/board_held_check_test.py` part 5, on the main checkout's live board (red when any line is listed);
- after every `board_tick.py` block, unblock, note, owner, title, answered and release (`held_hook`): a line the
  write leaves held by nothing is named on stderr with the way out; the write and its exit code are unchanged.

## The roads off the board

- `board.py archive-open` refuses a line any open line needs (`Links: needs`, an owner `after T-X`, a
  `(waiting on T-X`) and names those lines: archive them in the same call if they are no longer needed, or reword them
  first (`board_tick.py links`, `release`, `block`).
- `board.py archive-prose` and `prune-empty` refuse the same way for an unfinished line (`- [~]`, prose with an ID)
  that an open line still needs.
- `board.py tick` moves only ticked lines (and lines a `Supersedes:` field withdrew, which `board_tick.py` already
  refuses while another open line links to them): a need of a ticked line is met.

## The way out for a held line

`python3 tools/board_tick.py release "<ID>" "<why, and what it waits on now>"`: each `(waiting until D)` becomes
`(waited until D)`; an owner `after T-X` whose T-X left the board gets `; runnable now: T-X off the board`; a `- [b]`
with no issue wait left opens; the note is appended.

## T-4809: "done on a lane, waiting to merge" comes from the one count (11-18 11:55 PM ET)

Investor an Investor #41 c6966023669 (8:17 PM 11-17): "If an item is waiting to merge, it should be in the merge queue,
not the Queued page." The cause: each personal account's done list (state/<a>/done, written by tools/personal_tick.sh
when a session finishes) is never pruned. At 11:55 PM 11-18 the lists held 1,358 entries; `python3 tools/dispatch.py
order --json` showed 210 of 590 open lines as "done on a lane, waiting to merge", while the one count of tasks
waiting to merge (tools/merge_limit.py, ops/runs/.waiting.json) held 2 (T-4835, T-4925).

The rule now (tools/dispatch.py done_lists, done_waiting): a done entry holds its line only while that count names
its task, or while the entry is newer than the count can have seen (first seen less than 30 minutes before the
count was taken; first-seen times in ops/runs/.done_seen.json). A count that can't be read leaves every entry
holding, as before. The lists are ignored past the count, not edited (they sit in the accounts' own folders).
tools/personal_tick.sh no longer filters a dispatcher's list by the raw lists again.

The 11-17 note (T-2296 stayed counted by three earlier <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> drafts after 3a5c74b44e landed it): those refs are
gone (archived under an Investor c6990388141, T-4903: a parked ref with a salvage commit is a session's draft), and
T-2296 is not in tonight's count. The count's own rule was left as it is: making main's later work commit win over
a ref's own unlanded work commit turned tests/site_parked_landed_t4677_test.py red (its T-0014: part 1 on main
after the park, part 2 only on the ref, rightly waits). Telling a draft from a second part needs the files each
touches; that goes with T-5034's standing check.

Where the 210 lines went: 92 to Queued (nothing else holds them; 2 of these also had a loose wait T-4810 removed),
117 lose the done hold but stay held by something real (a feature step, a need, a claim), 1 stays: the count
holds it. 139 of the 210 have a commit on main that opens with their ID ("Main" below): a session that takes one
checks its Done when and ticks it, or does what is left.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: T-4809: &quot;done on a lane, waiting to merge&quot; comes from the one count (11-18…, scrolls sideways" style="--tw:818px" markdown="1">

| Line | Title | Main | Now |
|---|---|---|---|
| T-4758 | Keep the shortcut test's pictures out of the source tree | 2bdcb20e18 | Queued |
| T-4787 | Count failed merges by cause: bad test or broken code | 50efa07ea3 | Queued |
| T-4749 | Rewrite or drop outdated tests that read code text | 9589ac7e4f | done hold <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifted</span>; still held by pieces |
| T-1117 | Make the app's spoken labels read correctly for VoiceOver | none | done hold lifted; still held by feature |
| T-1119 | Investors answer two App Store Connect questions | c204bd38ca | done hold lifted; still held by feature |
| T-1154 | Ask the Investors to approve PyWidget's voice | d533d31d76 | done hold lifted; still held by feature |
| T-1181 | Fix a held finding from the Pernille review | none | done hold lifted; still held by feature |
| T-1652 | Fix two UI tests that fail only in full runs | 5711108623 | done hold lifted; still held by feature |
| T-1677 | Finish recording the last run report at launch | 91ea35ab2a | done hold lifted; still held by feature |
| T-2097 | Read free memory in the widget extension on a device | 926ae182e3 | done hold lifted; still held by feature |
| T-2266 | Run the stuck-signal tests on the MacBook | 28f6ba468e | done hold lifted; still held by feature |
| T-0678 | Run the refresh button inside the widget extension | 7500ae478a | done hold lifted; still held by after, feature |
| T-2629 | Finish the prompt alert checks once the suite is green | none | done hold lifted; still held by feature |
| T-3107 | Read the phones' real numbers from the gate build | 40af1480ea | Queued |
| T-2691 | Check every archive for the phone test marker, Organizer too | b810bba81a | done hold lifted; still held by feature, pieces |
| T-4182 | A failing widget says so and can recover | none | done hold lifted; still held by pieces |
| T-4184 | A person's own script becomes a Home Screen widget | none | done hold lifted; still held by pieces |
| T-4185 | Launcher widgets open the apps a person chose | none | done hold lifted; still held by pieces |
| T-4188 | Location, steps and notifications work in scripts and widget | 030410be76 | done hold lifted; still held by pieces |
| T-0043 | Strip unneeded Python modules from the release bundle | none | done hold lifted; still held by feature |
| T-0389 | Show a folded traceback with tappable frames | 3aee331c83 | done hold lifted; still held by feature |
| T-0656 | Add completions and inline errors to the editor | 54cc67adff | done hold lifted; still held by feature |
| T-0657 | Build the Settings screen | 13d6431a74 | done hold lifted; still held by feature |
| T-0972 | Decide how a script's refresh path is chosen on send | 420538d670 | done hold lifted; still held by feature |
| T-0811 | Give the bundled examples an iPhone entry point | none | done hold lifted; still held by feature |
| T-0687 | Run network fetches inside the extension on the Simulator | 12998ef7c6 | done hold lifted; still held by feature |
| T-0696 | Measure peak memory for fetches in the extension | 75e3142708 | done hold lifted; still held by feature |
| T-0790 | List saved scripts in the Shortcuts run picker | none | done hold lifted; still held by feature |
| T-0861 | Fix three red paywall pictures for the alpha | none | done hold lifted; still held by feature |
| T-0892 | Make the first-widget flow test start clean | none | done hold lifted; still held by feature |
| T-0956 | Replay the widget tests with the shipped Python layout | 0ba33e8b36 | done hold lifted; still held by feature |
| T-2260 | Make closed widget turns draw their timeline | none | done hold lifted; still held by feature |
| T-2261 | Build and test the editor completion changes | 17393d231c | done hold lifted; still held by feature |
| T-2512 | Editor checks never wait behind a stuck script or Stop | none | done hold lifted; still held by feature |
| T-3291 | Mark failed widgets with the red badge | none | done hold lifted; still held by feature |
| T-4615 | Widget taps on iPad reuse an open window | 5e776ea05b | Queued |
| T-3765 | Check a real widget tap on the TestFlight build | ce68534814 | done hold lifted; still held by after, feature |
| T-1764 | Write each widget run record when the run ends | 266014fca7 | done hold lifted; still held by feature |
| T-1643 | Let a person's say-so lift a widget demotion | 62abc37c68 | done hold lifted; still held by feature |
| T-3791 | Add the say-so button that lifts a widget demotion | none | done hold lifted; still held by feature |
| T-2583 | Prompt alerts never vanish unseen when UIKit drops them | cc5c7c2776 | done hold lifted; still held by feature |
| T-2943 | Send up the gate build and confirm it stays internal | bb4b184e34 | done hold lifted; still held by feature |
| T-2551 | Build all six app launcher premades | 656217e42b | done hold lifted; still held by feature |
| T-4031 | Check finished work before it ships | 6e932f8cbe | done hold lifted; still held by feature |
| T-4040 | Check finished work before it ships | 57f53dba4e | done hold lifted; still held by feature |
| T-4043 | Check finished work before it ships | 382010e28e | done hold lifted; still held by feature |
| T-4048 | Check finished work before it ships | f1d628cd48 | done hold lifted; still held by feature |
| T-4049 | Check finished work before it ships | 0bad33d9e8 | done hold lifted; still held by feature |
| T-4068 | Check finished work before it ships | c0e26ead25 | done hold lifted; still held by feature |
| T-4077 | Check finished work before it ships | c7353bcaa3 | done hold lifted; still held by feature |
| T-4192 | Python in the app: smaller bundle, installable packages | none | done hold lifted; still held by pieces |
| T-4282 | Measure real scripts inside the widget on phones | 741d6b44b7 | done hold lifted; still held by pieces |
| T-0198 | Record expired runs in the widget status file | none | done hold lifted; still held by feature |
| T-0272 | Add a theme picker to Settings | 1580b3c42b | done hold lifted; still held by feature |
| T-2076 | Build the site stages behind off-by-default switches | 295ff2f118 | Queued |
| T-2232 | Make the peak memory figure mean one thing | none | done hold lifted; still held by feature |
| T-1972 | Test that one refresh tap writes only one row | 46ab7f75c3 | done hold lifted; still held by feature |
| T-2154 | Stop a project folder colliding with the main script | none | done hold lifted; still held by feature |
| T-2155 | Note that old project copies stay after a rename | none | done hold lifted; still held by feature |
| T-2027 | Re-run the notification test on a fresh Simulator | a03869b2b2 | done hold lifted; still held by feature |
| T-2044 | Widen the timing margin of a flaky widget test | none | done hold lifted; still held by feature |
| T-3081 | Add the Python frameworks' debug symbols to test builds | none | done hold lifted; still held by feature |
| T-4286 | Check an imported font draws in a widget | 4091393426 | done hold lifted; still held by pieces |
| T-2317 | Compile the widget refresh code out of Release | none | done hold lifted; still held by feature |
| T-2458 | Compile and picture the new Pro screen words | 67d1630661 | done hold lifted; still held by feature |
| T-3098 | Keep input prompts from following a finished run | 7a766f16d8 | done hold lifted; still held by feature |
| T-4191 | VoiceOver and large text work on every screen | 2dccedd175 | done hold lifted; still held by pieces |
| T-0042 | Add an Acknowledgements screen for vendored packages | 61478da395 | done hold lifted; still held by feature |
| T-0213 | Measure the Python bundle options on the Simulator | none | done hold lifted; still held by feature |
| T-0273 | Ask for an App Store rating after a real success | none | done hold lifted; still held by feature |
| T-0510 | Save widget scripts where Shortcuts expects them | none | done hold lifted; still held by feature |
| T-0556 | Take the app pictures that were missing | f318613d0d | done hold lifted; still held by feature |
| T-0561 | Align the widget run scan test with its done rule | none | done hold lifted; still held by feature |
| T-0635 | Tint editor search matches amber | none | done hold lifted; still held by feature |
| T-0894 | Check the widget card at large text sizes | ff796232e0 | done hold lifted; still held by feature |
| T-1290 | Stop test runs rewriting time-based snapshot images | none | done hold lifted; still held by feature |
| T-2723 | Run the new earthquakes example in the Simulator | none | done hold lifted; still held by feature |
| T-2409 | Check the USGS earthquake feed before building on it | e6dc5a9e16 | done hold lifted; still held by feature |
| T-2492 | Record a widget <span title="A test written in advance. If it fires, we drop the idea.">kill</span> after it returns to the extension | none | done hold lifted; still held by feature |
| T-2493 | Keep locked premades out of the run log | none | done hold lifted; still held by feature |
| T-2513 | Completion sees the same modules during a run | none | done hold lifted; still held by feature |
| T-2870 | Close the small gaps left in the completion import guard | none | done hold lifted; still held by feature |
| T-3401 | Add a general web request call and an OpenSSL check | fd84215835 | done hold lifted; still held by feature, pieces |
| T-1100 | Dim the Toggle track in stripped color modes | none | done hold lifted; still held by feature |
| T-2538 | Land five smaller parked fixes the sweep could not merge | none | Queued |
| T-2040 | Investigate a paywall UI test that failed once | none | done hold lifted; still held by feature |
| T-2612 | Tidy the upload pin reading edge cases | none | done hold lifted; still held by feature |
| T-0299 | Keep real packages out until the sandbox is fixed | none | done hold lifted; still held by after, feature |
| T-4180 | Every premade widget draws on the iPhone | none | done hold lifted; still held by pieces |
| T-3113 | Build a timeline feed for every picked-up task | 7a6d6ec968 | Queued |
| T-4225 | Show the worker on the task regroup card | da3ee1b5b4 | Queued |
| T-4301 | Read fresh Pro gates after a queued wait | 4521663e49 | Queued |
| T-4624 | Drop Parents and Children from Home's task cards | 16ad57d812 | Queued |
| T-4635 | Clear the Settings restore line once Pro is bought | 040e64c499 | Queued |
| T-4678 | Close the iPhone premade feature and free its steps | 7ecee9b678 | Queued |
| T-3806 | Answer Investor messages that no session claims | none | done hold lifted; still held by claimed |
| T-4195 | Reuse an iPhone pass when the app's inputs are unchanged | 7c4074410c | Queued |
| T-4196 | Let app changes waiting to merge share one iPhone run | 99b598f7d7 | Queued |
| T-4823 | Group process changes into features | e3829feb09 | done hold lifted; still held by claimed |
| T-4010 | Rebuild This Session as a full flowchart | none | Queued |
| T-3680 | Review the launcher sheet fix over other sheets | 4e30ea040a | Queued |
| T-4455 | Fix the stage name test after the Retry Queue rename | 6c6594fa92 | Queued |
| T-4508 | Alarm when one account's work keeps being refused | 78311da7fc | Queued |
| T-4770 | Re-estimate the release date from measured build speed | c97dd70f37 | done hold lifted; still held by claimed |
| T-2474 | Bring back or retire the old Overview's dashboard tests | none | Queued |
| T-4092 | Audit and clean up the whole task queue | 332883072a | done hold lifted; still held by pieces |
| T-4103 | Build the queue-check sweep into the sweep system | d0cf915d37 | Queued |
| T-4446 | Commit the company's records once per supervisor round | 5a3e47f8e9 | Queued |
| T-4587 | Switch feature sessions on for every app feature | dc6e3455b6 | Queued |
| T-4194 | Build the feature session for app work | 16ac0847df | done hold lifted; still held by after, pieces |
| T-4401 | Keep the parked count test off the live mode file | a1e797f8c5 | Queued |
| T-4513 | Show the SSD's free space on the Machine bubble | 16aee134e7 | Queued |
| T-4181 | Widgets refresh on their own and by a tap | 1bcf95a054 | done hold lifted; still held by pieces |
| T-4516 | Prove the premade settings routes in a UI test | 09feb52d4d | Queued |
| T-4468 | Let people set each premade's place, events and lists | 30ea7b46f1 | Queued |
| T-4183 | The Gallery shows, previews and opens every premade | none | done hold lifted; still held by pieces |
| T-4190 | Settings and Pro: buy, restore, themes | none | done hold lifted; still held by pieces |
| T-4477 | People build a widget from blocks without code | 11abc3a827 | Queued |
| T-4193 | TestFlight builds and the App Store page are ready | none | done hold lifted; still held by pieces |
| T-0011 | Check motion, health and battery sensors on a device | 6401b148f3 | Queued |
| T-0044 | Test running marketplace Python inside a web view | none | Queued |
| T-0046 | Read Apple pages to confirm 24 device API facts | 26ec8170eb | done hold lifted; still held by feature |
| T-0063 | Add a location-off state to the distance premade | none | done hold lifted; still held by feature |
| T-0337 | Confirm the revenue memo's facts from Apple pages | 55ce5eab6f | done hold lifted; still held by feature |
| T-0392 | Move test sources into fixture files | none | done hold lifted; still held by feature |
| T-0518 | Draw the idle console input bar when ready | 29037ed917 | done hold lifted; still held by feature |
| T-0543 | Add limits to notification scheduling | 6ec7e29f14 | done hold lifted; still held by feature |
| T-0588 | Test the on-screen keyboard's delete key | none | done hold lifted; still held by feature |
| T-0590 | Test the widget extension's default widget choice | none | done hold lifted; still held by feature |
| T-0623 | Fix the licence wording in Acknowledgements rows | none | done hold lifted; still held by feature |
| T-0703 | Read time zone data in the extension on a phone | bfeeb6404b | done hold lifted; still held by feature |
| T-0725 | Fix small faults in project export | none | done hold lifted; still held by feature |
| T-0851 | Split the app guide into one document per section | 3510a9edd4 | Queued |
| T-0893 | Fix three small widget card faults | none | done hold lifted; still held by feature |
| T-1241 | Fix the backup mark on the location cache | 6b13e02d1b | done hold lifted; still held by feature |
| T-1242 | Fix two project note faults found in review | none | done hold lifted; still held by feature |
| T-3150 | Make the scoreboard's spend match the ledger | none | Queued |
| T-2296 | Finish the gallery pager, iPad layout and detail foot | 3a5c74b44e | done hold lifted; still held by feature |
| T-4226 | Emoji reactions on Chat messages | f85e030dab | Queued |
| T-4280 | Run each widget in the widget or app by size | f82659b8b3 | done hold lifted; still held by feature |
| T-4433 | Confirm the Lock Screen refresh tap first | ad226df1f4 | done hold lifted; still held by after |
| T-4435 | Draw the wrapped refresh glyph on both runtimes | 61d2556254 | Queued |
| T-4442 | Tidy the bundled first renders' small edges | 72284dc4c3 | Queued |
| T-4530 | Make Queued the one queue list on Home | fd7860eb42 | Queued |
| T-4533 | Make the premade settings save sturdier on disk errors | cc9297f4b9 | Queued |
| T-4835 | Show an all-day event on its own date after travel | none | stays: in the count (waiting to merge) |
| T-4897 | Check an all-day event keeps its date after travel | e575fee194 | Queued |
| T-4548 | Read one widget action value strictly | none | done hold lifted; still held by pieces |
| T-4549 | Store tap and button actions in the manifest | none | Queued |
| T-4550 | Python contract and action run for widget buttons | 948b42cb28 | done hold lifted; still held by after |
| T-4554 | One state commit per widget across app and widget | dadba11da4 | Queued |
| T-4565 | Send button actions from Swift, schema names checked | fb5366e735 | Queued |
| T-4575 | Stop an edit from rewriting a pasted Shortcut link | 9f4172b5a0 | Queued |
| T-4748 | Make the widget font check ignore lookalike letters | f70982a0db | Queued |
| T-4772 | Prove a refresh tap redraws the widget | 9496e859fa | Queued |
| T-4781 | Retest a fixed red on what failed, not every test | 77b9cddb04 | Queued |
| T-4866 | Rerun the Pro row large-text test after the footer fix | f29386684d | Queued |
| T-4889 | Check the PyWidget case fix in premade lines | f5532eb710 | Queued |
| T-4898 | Fix the Home Screen token test reading the gallery | 7044464c8f | Queued |
| T-3859 | Move everything not needed off the Mac mini disk | dad4cd3166 | Queued |
| T-3992 | Clear and merge the unfinished merge fixes | be1668eaf6 | Queued |
| T-3996 | Show one true record on Home and This Session | e332294d36 | Queued |
| T-3871 | Archive parked refs whose work main already has | da30ad6e88 | Queued |
| T-3879 | Recut Odalys's conflicting parked tasks onto main | 127f87e5bb | Queued |
| T-3976 | Show each drive's storage makeup on Home | 302d2bd0a2 | Queued |
| T-4012 | Retire the retry routes the send-back replaces | 60d0609964 | Queued |
| T-4109 | Add a newest-first view to the Reports page | 22dc5fa342 | Queued |
| T-4110 | Chart the task queue size on Home | 95893aa883 | Queued |
| T-4111 | Cut clutter text on Home and every page | a12fdd5194 | Queued |
| T-3773 | Decide how stuck review fix lines reach the board | none | Queued |
| T-1248 | Retry work from a session that did not end cleanly | none | Queued |
| T-2561 | Stop the Xcode lock waiting on a finished run | none | Queued |
| T-3329 | Deadline-nears alert when no site tab is open | 78277c9870 | Queued |
| T-3337 | Keep Plan mode answers only in the Investor's reply | 5a505f700c | Queued |
| T-3348 | Find why a Plan mode answer lost its end | none | Queued |
| T-3495 | Check the upload fix before build 4 goes out | f053892778 | done hold lifted; still held by after |
| T-3350 | Describe each TestFlight build in detail | none | done hold lifted; still held by feature |
| T-3396 | Finish twelve-hour times on every site page | a30ef03a0a | Queued |
| T-3412 | Twelve-hour times in live JS views and the personal page | none | Queued |
| T-4494 | Prove widgets move to the app by size | b08e93527f | Queued |
| T-4630 | Stop badging widgets moved to the app by size | dba150158f | Queued |
| T-4643 | Make the size <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span> measure each rung more than once | 98b2f14988 | Queued |
| T-4644 | Check the ladder's files in the gate build's own tests | 25655c430b | Queued |
| T-4640 | Drop a location fix that arrives too late | 1afa9858f7 | Queued |
| T-4570 | Launcher slot copy takes the premade file lock | none | Queued |
| T-4581 | Test a real widget tap in iPad windows | none | Queued |
| T-4679 | Make the unit tests pass in a launcher build | a16af47842 | Queued |
| T-4610 | Check finished work before it ships | b1a70397ed | Queued |
| T-4634 | Github hang test is cut before the GET under load | d3fa7f2382 | Queued |
| T-4656 | Let a cleaned script return to the widget on resend | 3b773e66f7 | Queued |
| T-4819 | Make sure a send never rewrites a project's settings file | a14bce7ae8 | Queued |
| T-4659 | Prove a widget button's tap reaches its Python handler | 6d2369339d | Queued |
| T-4660 | Count a family When's buttons per family | 0a15020671 | Queued |
| T-4662 | Place the cursor easily on a long line | 8ed2580aa9 | Queued |
| T-4670 | Draft the letter to Apple about the marketplace rules | none | Queued |
| T-4672 | Plan the 1.0 showcase premades | efded76eb6 | done hold lifted; still held by pieces |
| T-4682 | Hide the Issues page's raw list until it loads | 1fbb2dce43 | Queued |
| T-4688 | Build a Developer mode for testing Pro | none | done hold lifted; still held by pieces |
| T-4692 | Pro showcase widgets work free, editing them needs Pro | none | Queued |
| T-4693 | Research a permanent name for the app | 3150fc8160 | Queued |
| T-4796 | Say which premades carry the Pro tag | 94783c0bf1 | Queued |
| T-4743 | Fix a MacBook test job that failed | 76beaadcdd | Queued |
| T-4789 | Check finished work before it ships | a91b7a6521 | Queued |
| T-4759 | Check finished work before it ships | 60cde6a925 | Queued |
| T-4761 | Keep one layout for the widget state format | 093bcb77da | Queued |
| T-4762 | Let the run lock wrap a Python run | 2db76d4f2a | Queued |
| T-4840 | Read the sensor rows from the gate build's export | none | done hold lifted; still held by after |
| T-4841 | Decide whether the widget probe asks for HealthKit | a01c5780c9 | Queued |
| T-4295 | Let Chat messages pick model, effort and account | c77106b469 | done hold lifted; still held by pieces |
| T-4573 | Answer when the chosen account cannot take a message | f5108f64b4 | Queued |

</div>


## History

### The rewrite, 2026-11-17 9:1x-9:2x PM ET

Measured at 8:3x PM with `python3 tools/dispatch.py order --json`: 61 open lines carried a "wait" or "blocked" reason.
Each change went through tools/board_tick.py (unblock, note, links, block), one call per step; each line carries a
T-4810 note with its old wait.

53 lines rewritten: 8 wait on tasks (Links needs), 1 blocked on an issue, 44 back to Queued.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: The rewrite, 2026-11-17 9:1x-9:2x PM ET, scrolls sideways" data-n="2" style="--tw:739px" markdown="1">

| Line | Box before | Old wait | New wait |
|---|---|---|---|
| T-1441 | [b] | date Nov 6 (and needs T-1440) | its Links needs (already there) |
| T-0793 | [b] | date Nov 1 (and needs T-0675, T-0198) | its Links needs (already there) |
| T-0011 | [b] | date Oct 28; needs a device | none: Queued |
| T-0012 | [b] | date Oct 27; after T-0046's pages (an order, not a dependency) | none: Queued |
| T-0044 | [b] | date Nov 3 | none: Queued |
| T-0045 | [b] | date Oct 28; a person's trademark reads | [b] on Investor issue #90 |
| T-0046 | [b] | date Oct 27 | none: Queued |
| T-0047 | [b] | date Nov 3 | none: Queued |
| T-0063 | [b] | date Nov 3 | none: Queued |
| T-0101 | [b] | date Dec 9 (the day after submission; no task for it) | none: Queued |
| T-0337 | [b] | date Oct 27 | none: Queued |
| T-0349 | [b] | date Nov 9; after T-0275 (closed) | none: Queued |
| T-0392 | [b] | date Nov 3 | none: Queued |
| T-0553 | [b] | date Nov 3 | none: Queued |
| T-0588 | [b] | date Nov 3 | none: Queued |
| T-0590 | [b] | date Nov 3 | none: Queued |
| T-0591 | [b] | date Nov 3 | none: Queued |
| T-0630 | [b] | date Nov 3 | none: Queued |
| T-0631 | [b] | date Nov 9 | none: Queued |
| T-0749 | [b] | date Nov 3 | none: Queued |
| T-0771 | [b] | loose: bank and tax (no open issue) | none: Queued |
| T-0788 | [b] | date Dec 6 (release candidate; no task for it) | none: Queued |
| T-0795 | [b] | date Dec 1 (release candidate; no task for it) | none: Queued |
| T-0801 | [b] | date Nov 16 | none: Queued |
| T-0863 | [b] | date Nov 3 | none: Queued |
| T-0902 | [b] | date Dec 9 (no task for it) | none: Queued |
| T-1216 | [b] | date Nov 17 | none: Queued |
| T-2377 | [b] | date Dec 16 (after 1.0 ships; no task for it) | none: Queued |
| T-2378 | [b] | date Dec 16 (after 1.1 is planned; no task for it) | none: Queued |
| T-3402 | [b] | date Nov 23 (a check day) | none: Queued |
| T-1925 | [ ] | loose: after T-1466 frees the slot (T-1466 closed) | none: Queued |
| T-0024 | [ ] | loose: after the spike | none: Queued |
| T-0032 | [ ] | loose: a slot and a device | none: Queued |
| T-0306 | [ ] | loose: when the Xcode slot frees (T-0052, T-0286 closed) | none: Queued |
| T-0048 | [ ] | loose: after ADR-002 is accepted and a fixture tree renders | none: Queued |
| T-0050 | [ ] | loose: after v1 submission (no task for it) | none: Queued |
| T-0053 | [ ] | loose: after the first renderer fixture set | none: Queued |
| T-0192 | [ ] | loose: after the gallery line | none: Queued |
| T-0193 | [ ] | loose: after the gallery line | none: Queued |
| T-0212 | [ ] | loose: after the P0/P1 lines | none: Queued |
| T-0245 | [ ] | loose: after T-0206's measurement (T-0206 closed) | none: Queued |
| T-0422 | [ ] | loose: before the alpha build | none: Queued |
| T-0447 | [ ] | loose: after T-0355 (closed) | none: Queued |
| T-0472 | [ ] | loose: after the Day 10 alpha items | none: Queued |
| T-0479 | [ ] | loose: a device | none: Queued |
| T-1011 | [ ] | loose: after the disk gate reopens, #127 (closed) | none: Queued |
| T-1293 | [ ] | loose: T-0550's commit (closed) and a device | none: Queued |
| T-0802 | [ ] | loose: after T-0801 in its owner words | Links: needs T-0801 |
| T-4493 | [ ] | loose: blocked on, read from T-4812's note | Links: part of T-4111; needs T-4812 |
| T-0458 | [ ] | after T-0447 in its owner words | its Links needs (already there) |
| T-0682 | [ ] | after T-0680 in its owner words | its Links needs (already there) |
| T-0901 | [ ] | after T-0191 in its owner words | its Links needs (already there) |
| T-3399 | [ ] | loose: the Investors' answer on the card (answered 11-14) | its Links needs (already there) |

</div>


Left as they were, since no wait was there (title or quoted words the old reader took for one; the new reader does
not): T-2717, T-4302, T-2561, T-3995, T-4810, T-4811. Kept blocked on their issues: T-4092 (#41), T-4812 (#323).

### After (2026-11-17 9:2x PM, the new board.py over the live board)

- Lines held by a date or loose words: 0 (no `- [ ]` line is held by its words; every `- [b]` names an issue).
- `- [b]` lines: T-4092 (waiting on #41), T-0045 (waiting on #90).
- Test: tests/board_waits_test.py.

A note on the queue: 44 lines are back on Queued, many of them old P2 and P3 app lines and person or device lines
(T-0011, T-1293, T-0479 need a device; no Investor issue asks for one). Priority orders them; person-owned lines stay
off the lanes by owner, not by a wait.

### 2026-11-18 11:4x PM: two lines held by nothing (T-4810)

The two held lines found that night with nothing to clear them, rewritten through board_tick (unblock, note):


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2026-11-18 11:4x PM: two lines held by nothing (T-4810), scrolls sideways" style="--tw:724px" markdown="1">

| Line | Held by | Now |
|---|---|---|
| T-4195 | [b] date Nov 20; its tick read a count from T-4223, which left the board 11-17 (archive-open) | Queued; ticks when a land's record shows a reuse by its key |
| T-4092 | [b] on #41 (its start gate, spent by the go of 11-11; #41 is full and never closes) | open umbrella, held by dispatch on its open pieces |

</div>


`- [b]` lines after: T-4913 (#327), T-0045 (#90). 45 open lines still carry an old "(waiting until D)" text from
before the rule; it holds nothing (tools/board.py parse), and T-5034's standing check named them for the sweep below.

### The sweep of 2026-11-19 2:10-2:16 AM ET

Before: 50 open lines held by nothing on `ops/board.md` (46 `wait_until` texts on 44 lines, 6 `need_left`, 1 `blocked_no_issue`; T-0349
had two kinds). None was dropped: each was reworded, since none of them is plainly unneeded and dropping work is a
person's call. Each carries a `T-5034 sweep` note saying what changed and how to hold it again if it still waits.

- 43 lines reworded from `(waiting until D)` with `release`: T-0011, T-0012, T-0044, T-0045, T-0046, T-0047, T-0063,
  T-0101, T-0337, T-0392, T-0553, T-0588, T-0590, T-0591, T-0630, T-0631, T-0749, T-0788, T-0793, T-0795, T-0801,
  T-0863, T-0902, T-1216, T-1441, T-2377, T-2378, T-3402, T-4180 to T-4193 (14 lines), T-4195. Unsure, noted: eight
  had a date still ahead (T-0101, T-0788, T-0795, T-0902, T-2377, T-2378, T-3402, T-4195); the date held them out of
  the lanes until then and now does not. If one of them truly waits on a person or a build, its owner blocks it on an
  issue or links the task it needs.
- 6 lines reworded from an owner `after T-X` whose T-X left the board: T-0245, T-0306, T-0349 (its date too), T-0447,
  T-0901, T-1925.
- 1 line, T-4913 (`- [b]` naming nothing; stopped under Commandment 14 and needs a person), now waits on
  `#325 since 2026-11-19 02:15`: an Investor answer there clears it.

After: `python3 tools/board.py held` on the live board at 2:16 AM ET:

    held by nothing: 0 open line(s)
{% endraw %}

</div>
