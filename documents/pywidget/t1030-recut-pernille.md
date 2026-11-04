---
layout: "default"
title: "T-1030 recuts and T-1014&#x27;s kept Simulator, Commandment 13 reviews"
section: "documents"
description: "Order doesn&#x27;t matter. b2&#x27;s patch applies to a3&#x27;s tree in scratch (git apply --check, one hunk offset 14 lines). Both lines fit retry_one&#x27;s format. check_lane and check_tests pass by reading: every path is under\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1030-recut-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1030-recut-pernille.md</code></span></div><h1>T-1030 recuts and T-1014's kept Simulator, Commandment 13 reviews</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. Three independent reads. I wrote none of this code. No Swift was compiled, no Xcode, no Simulator, by instruction: every Swift statement here is by reading, and neither branch has ever been built. Land's xc is the first run of both.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="3" style="--tw:585px" markdown="1">

| Item | Verdict | High |
|---|---|---|
| 1. <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a3/20261102-t1030-recut, tip 90ac5f64 | **Land** | None |
| 2. parked/b2/20261102-t1030-recut, tip ceee6428 | **Land** | None |
| 3. 651230b5, on main as ca1ae810 | **Pass**, M2 closed, three Lows | None |

</div>


Retry lines:

```
parked/a3/20261102-t1030-recut T-0039+T-0063+T-0444+T-0590 host xc
parked/b2/20261102-t1030-recut T-0953+T-0974 host xc
```

Order doesn't matter. b2's patch applies to a3's tree in scratch (`git apply --check`, one hunk offset 14 lines). Both lines fit `retry_one`'s format. `check_lane` and `check_tests` pass by reading: every path is under `pywidget/`, and every test path on both branches is new.

## 1. a3 recut

**The first thing I looked for was anything else moving under the fix. Nothing did.**

**Does the rest equal what I reviewed? Yes.** Base d82f3007, 4 commits: three cherry-picks, then 90ac5f64. Every path in 9c454fd1..2f2b53ae, less 676b9b64's two UITests files, has the same blob at 756f5739: 32 of 32. The only names missing are those two files, and nothing on the branch refers to them. 90ac5f64 touches two files. With whitespace ignored, `PlacesView.swift` changes by two lines, the `if` and its brace. `SavedPlaces.swift` gains the flag and swaps the footer.

**Fix 2 holds.** The Saved Places and Add a Place sections are the app's only callers of `Copy.footer`, `model.search()` and `model.add`, and all sit under `if PlacesModel.typedPlaces`, which is false. `Deps.system` builds a `MapKitPlaceLookup` value and sends nothing. So no shipped path reaches `MKLocalSearch`. `import MapKit` stays until the restart, as the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> says. The location row and the Allow button sit outside the `if`, so "More > Places" stays true. By reading it builds: the flag is main-actor state read from `body`, and `fieldFocused` is still used.

**Is the footer true of the app as it lands? It isn't in the app as it lands: it's unreachable.** Its words are also true if it ever is reached, and they follow the ruling's base.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 1. a3 recut, scrolls sideways" style="--tw:540px" markdown="1">

| Claim | Check |
|---|---|
| "kept on your device" | `PlacesFile.save` writes `premade.json` in the App Group, no network. No iCloud code in `App/` or `Shared/` (grep for ubiquity and CKContainer) |
| "can be in your own backups" | Nothing excludes this file. The one `isExcludedFromBackup` is in `LocationCall.swift:481`, another file. The backup behaviour itself is the policy draft's line 35, which I didn't retest |
| "shows the first three" | `distance.py:68`, `saved[:3]` |

</div>


**The mutants don't belong to this branch.** See item 2. A sweep of every `mutants*.json` in the repo against a3's changed files found no `find` string whose count moved, 11 checked.

**Land ticks nothing a line names.** Confirmed, Idris's claim: `try_land` only adds the `[review]` line through `review_line`. So my T-1030 question is answered, and T-0063 can stay on the line. That review line will name the rebased hash. If the rebase is clean, this read covers it.

Host: `widgets`, 121 tests on 3.9.6 and on 3.13.18, on a `git archive` of the tip, 242 pass. That includes `test_location_states.py`. No Python changed since my first review, so that is a smoke check, not new evidence.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1. a3 recut, scrolls sideways" data-n="1 2" style="--tw:987px" markdown="1">

| # | Severity | Where | What | Fix |
|---|---|---|---|---|
| A1 | Low | `distance.py:91` | "Save a place in pywidget." can't be done as this lands. Not new: main shows it today with no Places screen at all. The ruling's route and T-1031's store gate cover it, so a build must not go to TestFlight first | With T-0063's restart |
| A2 | Low | `SavedPlaces.swift`, `Copy.notAsked` | This is the one line the screen now leads with: "Distance needs your location to show yours." Altitude's "ask" sends people here, and Distance with no places never reads location: it returns "empty" at `distance.py:49-52` first. Reachable DRAFT copy naming the wrong widget | Maren, one string, not a <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> |
| A3 | Low | `PlacesView.swift:4-6`, `distance.py:5`, `Copy.unreadable` | Two comments still say places are typed or looked up. "Your places can't be read" (my P11) is now on a screen with no places | With the restart |

</div>


P4 to P13 stand as written. P4 matters more now, since Allow is the screen's only job.

## 2. b2 recut

**The first thing that broke was a claim, not the code.** The triage says "mutants that name LaneGuard.swift unaffected" (t1030-parked-branches-idris.md line 54). They are affected: B1.

**Nothing rejected came along.** Base d82f3007, one commit, four paths, each with the same blob as dc0070a1. No ops commit, no `EditorKeyRow.swift`, no `WidgetProjectFilesTests.swift`, no `EditorKeyRowUITests.swift`, no `preferredElementOrder` anywhere under `pywidget/ios`.

**T-0953 meets its line.** `add` takes `WidgetStateLock`'s bounded wait, `with(folder:)` now calls the new `with(file:wait:)` with its default of 0.5 unchanged, and `add` says false on a held lock. The false path is what the line says it is: `takeTurn` keeps the marker, `refused` keeps the refusal, `carryOut` ends the process. Those are the only callers, all from `ExtensionLane`. A false from `carryOut` also ends the script that held the lock, if it's in that process. Two tests hold the lock, one more than the line asks. `lockWait` 1.0 over the 0.5 default is argued in its comment and I accept it. Dropping `NSLock` is safe: each call opens its own descriptor, so `flock` excludes threads too, and T-0737 L2 measured that at 8,000 adds. Existing `testConcurrentAddsLoseNoID` (8 adds a trial) and `testAddWaitsForTheFileLock` (0.3 s hold) stay inside 1.0 s.

**T-0974 meets its line.** All three ids are in the bundled `Acknowledgements.json`, one entry each, and `AckFile.load(from: .main)` reads that file. Land's xc is `-only-testing:PyWidgetTests`, so it runs the Swift acknowledgement tests T-0903 couldn't.

**It builds by reading.** Checked against the tree: no leftover use of `locked` or `local`; `addLocked` is called from a non-escaping closure; `LaneDecision(demote:)` and `carryOut`'s non-escaping `exit` match `LaneGuardTests.swift:464`; `addTeardownBlock`, `open` and `flock` follow existing tests in the Swift 6 package; `NSLock.withLock` is already used by `LaneFootprint` in that package; `AckFile`, `licenseInUse` and `LicenseName.display` exist; `Box`'s tuple assignment is a literal, so `Bool` converts to `Bool?`. `Tests/Core/` compiles in both the Xcode tests and SwiftPM.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 2. b2 recut, scrolls sideways" data-n="1" style="--tw:1084px" markdown="1">

| # | Severity | Where | What | Fix |
|---|---|---|---|---|
| B1 | Medium | `pywidget/ios/Core/mutants-t0719.json` | See below. Doesn't block landing | Rewrite before T-0953 is ticked |
| B2 | Low | `testCallersAtOnceDoNotQueueBehindTheHeldLock` | Idris's F8 stands. `concurrentPerform` promises no parallelism, and a pool short of threads reads as queueing. Serial would be 4 s, so `bound * 3` would catch the same bug with a wider margin. A red here at land isn't a code red | Watch at land. Widen before landing or in a company session: a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can't edit it once it's on main |
| B3 | Low | `LaneGuard.swift` | F9 stands. The T-0737 L3 rule, `add` only from the extension or inside a background-task assertion, went with the removed comment. Nothing breaks it today: `ExtensionLane` is the only caller | One sentence on `add`, next time the file is open |
| B4 | Low | `lane.py:173`, `C2-device-api.md:121` | Both say `add` "waits with no bound" and go stale on landing. Their last sentences already name T-0953. Mine, I wrote them | I'll correct both after landing. Needs a board line |
| B5 | Low | `LicenseName.names` | F10 stands. `Unicode-DFS-2016` stays raw (tree-sitter-icu, in the bundle). "dtoa License" breaks the table's own rule if SPDX's name is "David M. Gay dtoa License", which is my memory and Idris's too, unread. Maren's `LIC_NAME` has no entry. The full notice shows either way, so no licence duty is missed | Wrenna reads the SPDX entry. Then one company-session edit, since the test becomes an existing path |

</div>


**B1, the mutants.** The packet says `pywidget/ios/scripts` and a3. The file is in `pywidget/ios/Core/`, it's run by `scripts/core_mutants.sh`, and it's about b2's `LaneGuard.swift`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 2. b2 recut, scrolls sideways" data-n="2 3" style="--tw:646px" markdown="1">

| Mutant | Main | b2 | Result on b2 |
|---|---|---|---|
| no lock at all | 1 | 0 | MISSING |
| flock dropped | 1 | 0 | MISSING |
| NSLock dropped | 1 | 0 | MISSING |
| lock file open failure ignored | 2 | 1 | Already MISSING on main. On b2 it runs, and by reading its `return body()` won't compile in a `rethrows` function: NOBUILD |

</div>


Idris's three are right. There's a fourth: the file already exits 1 on main, and nobody noticed.

**Does it block landing? No. Does land run them? No.** `run_tests` runs named suites, `host` and `xc`. `core_mutants.sh` has no caller in `tools/` or `tests/`, and the header at `personal_land.sh:141` says Core's `swift test` isn't a check. `mutation_check.py` exits 1 only when someone runs it by hand. The other 17 LaneGuard mutants across the repo are untouched.

The cost is proof, not safety. T-0953 retires the mutants that showed the lock matters and adds none. The rewrite, before the tick: "no lock" on the new `add` line; "flock dropped" on the new loop; `return try body()` for the open failure; delete "NSLock dropped"; add `LOCK_EX | LOCK_NB` to `LOCK_EX`, the mutant the new tests exist to <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. Then one run of `core_mutants.sh` goes in the done-note, because land never will. The path isn't a test path, so a lane may do it.

## 3. T-1014's kept Simulator, 651230b5

**M2 is closed.** The `tools/` and test files I read are identical at 651230b5, ca1ae810 and HEAD.

`keep` writes the boot's `launchd_sim` pid beside the lock, `begin` spends the note, and a boot it names reads as this run's, so `end` takes it. Same destination, KEEP, KEEP, none: kept, kept, shut. Another destination: `begin` takes it. Rebooted by someone else: the pid differs, so it stays. No ps: it stays, the safe way. All of it runs under the lock, and only on the machine's lock. The fixture's own lock keeps the host tests off the real note.

My three false sentences: `personal_land.sh:139` is gone, `xc_sim.py` is true on test runs (S3), and `xc_mutants.py:23` is nearly true (S3). "left" no longer covers a kept boot, and the row has `kept`.

Ran: `xc_sim_test.py` 148/0, `xc_mutants_test.py` passed, each alone through `tests/run.sh`. Three probes on that fixture, in scratch. No real cold run yet: all 1,530 rows in `ops/metrics/xc.jsonl` predate the tool and carry no `sim` field, so "1, 1, 1" is stand-ins, as her done-note says.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 3. T-1014&#x27;s kept Simulator, 651230b5, scrolls sideways" data-n="1 2" style="--tw:922px" markdown="1">

| # | Severity | Where | What ran | Fix |
|---|---|---|---|---|
| S1 | Low | `xc_sim.py` `begin` | `take_kept` runs first, so a test run on a non-Simulator destination spends the note and touches nothing. Rows: kept, none, left, left, state Booted. A failed device list spends it the same way, by reading. Rare: the project is iOS only | Move `take_kept` below `if use is None` |
| S2 | Low | `xc.sh` end step | M2's shape, without KEEP. A run's own boot that reads `busy` at `end` writes no note, so the next run on that destination reads it as someone's. Rows: busy, left, state Booted. One foreign `simctl` in the 2 s watch does it, and a lane can supply one. The limit holds: `begin` on another destination sweeps it | On `busy`, call `keep` too |
| S3 | Low | `xc_mutants.py:23`, `xc_sim.py` | "the next run of any kind" and "the note lasts one run". A `build` doesn't call `begin`: rows kept, none, state Booted, note there; the next test shuts it | Say "next test run" |

</div>


None of these breaks the one-Simulator limit or Rule (d). They leave one Simulator up longer than asked.

## Open item: `personal_land.sh` lines 136-139

Numbers are HEAD's. The live file has an uncommitted change above them, so they sit at 148-151 there. Not changed here.

Odalys took XC_SIM_KEEP out and the last sentence with it. What's left is still wrong in two places, and it's what the next person will read.

1. **"by reading, xc.sh's first install, when the Simulator has no app" is the wrong cause.** It was listapps before boot on any shut Simulator: my H1, fixed by T-1014. Only a Simulator with no app still starts twice.
2. **"A cold Simulator leaves 42 s of room" is out of date.** 42 s is 600 less 558, from that double-start run. Don't subtract the 102 s either: by reading, the first start did the compile, so the build moves into the only start, and only the install and one test class come off. Nobody has measured the new figure.

It also needs what's new: land keeps no Simulator up, so every land boots cold unless something else left it up.

Suggested text, hers to word:

```
#   host and xc together took 414-469 s of LAND_TEST_SECONDS on a quiet machine (n = 1 each), and 558 s on T-0915's run
#   under env -i, host 267 s, xc 289 s (n = 1). That xc run started xcodebuild twice, 102 s then 152 s: xc.sh asked listapps
#   before it booted, so any shut Simulator read as no app. xc.sh boots first now (T-1014), so a cold run starts once unless
#   the Simulator really has no app. Land keeps no Simulator up, so a land usually boots cold. The 42 s of room that run
#   left is not remeasured, and the first start's build moves into the second, so its 102 s doesn't all come back.
#   Past LAND_TEST_SECONDS the branch is held as red, and `ready` again tries it again.
```

The a3 and b2 lands will be the first real cold figures: read them from each land's log. If a green branch is held at 600 s, that is this, not the code. `tests/personal_land_product_test.sh` has no row on this comment, so it needs no change.
{% endraw %}

</div>
