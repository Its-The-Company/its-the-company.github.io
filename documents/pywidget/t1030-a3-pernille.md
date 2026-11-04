---
layout: "default"
title: "T-1030: parked/a3/20261102-080926-31395, Commandment 13 review"
section: "documents"
description: "The first thing that broke was the contract, not the code. T-0063 stores Apple&#x27;s coordinates for good and lists Apple&#x27;s address results with no map, and Attachment 6 of the Developer Program License Agreement forbids\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1030-a3-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1030-a3-pernille.md</code></span></div><h1>T-1030: <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a3/20261102-080926-31395, Commandment 13 review</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-02. Branch tip 2f2b53ae, merge base 9c454fd1, 4 commits, 34 paths (26 added, 8 modified), tasks T-0039, T-0063, T-0444, T-0588, T-0590. I wrote none of it. Idris's triage (47cd0f7e) was read as a claim to test.

## Verdict: land after named fixes

The first thing that broke was the contract, not the code. T-0063 stores Apple's coordinates for good and lists Apple's address results with no map, and Attachment 6 of the Developer Program License Agreement forbids both. Neither the session nor the triage opened that attachment, and nothing in `pywidget/docs` cites it.

Do not retry the a3 name. Cut a new branch with three fixes. The rest of the stack is sound by reading, and F3 below is a live bug on main that should land soon.

### The three fixes


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The three fixes, scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | File and line (a3 tip) | Change | Why |
|---|---|---|---|
| 1 | commit 676b9b64 | Leave it out of the new branch. T-0588 stays on the old name | P3 |
| 2 | `ios/App/Places/SavedPlaces.swift`, inside `PlacesModel` after line 183; `ios/App/Places/PlacesView.swift` lines 23 to 65 | Add `static let typedPlaces = false`, with a comment naming this review. Wrap the Saved Places and Add a Place sections in `if PlacesModel.typedPlaces { ... }`. Change nothing else: `MapKitPlaceLookup` and the model stay, unreachable, and their tests keep running on stand-ins | P1. The screen keeps Location and the one Allow button, so the "ask" state's "More > Places" stays true. No shipped path reaches MapKit |
| 3 | `ios/App/Places/SavedPlaces.swift` line 212 | `static let footer = "Looking up a place sends what you type to Apple. Saved places are kept on your device. The Distance widget shows the first three."` DRAFT, for Maren | P2. Unreachable with fix 2 on, so it can't be forgotten when fix 2 comes off |

</div>


Recut, company session, worktree on main. Nothing was cherry-picked here; I checked only that no later commit touches `UITests/` (676b9b64 is the only one in the range):

```
git switch -c parked/a3/<new name> main
git cherry-pick 4cefcd61 e0a01015 2f2b53ae
# fixes 2 and 3, one commit, by someone other than its reader
```

Then one read of that commit by a second person. The other three commits don't need reading again. Retry line:

```
parked/a3/<new name> T-0039+T-0063+T-0444+T-0590 host xc
```

**T-0063 stays open after landing.** Its Python half and its Allow button land; the typed place does not. The line names T-0063 so the review covers its files. I was told to stay out of `tools/`, so I don't know whether land ticks what a line names; if it does, take T-0063 off the line and say why in the commit. Keep the old branch name. It's the source for T-0588, and a retry deletes a name.

**If the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> rules on P1 first**, a route from the list below replaces fix 2, and fix 3 stays. I'd still land the rest now over waiting: F3 is every Steps, Distance and Altitude run with a real fix drawing an error.

## What I ran

- Host suite, `run_host.py --both`, on a `git archive` of the tip in scratch: 14 of 16 suites pass on 3.9.6 and on 3.13.18, 1,112 tests per interpreter. `a11y` and `compat-corpus` fail in scratch only because they import from `tools/`, which the copy doesn't have. Land's host run is their first real run on this code.
- `test_location_states.py`: 12 tests pass. `widgets`: 121 pass.
- 12 seeded mutants on the premade changes, in scratch: 12 killed, all by the new file, none by the older premade tests. So the new file carries that coverage alone. They cover `local_aware` and its three callers, `location_state`, a premade that asks, the "ask" copy, and draw and describe.
- **No Swift was compiled or run**, by instruction. Every Swift statement here is by reading, plus the iPhoneSimulator 27.1 SDK's headers and `.swiftinterface` files. Land's xc is the first run of T-0063, T-0444 and T-0590 that anyone can vouch for.
- Contract text: the DPLA PDF in `research/inbound/` (printed 10/26/26), text extracted in scratch.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Findings, scrolls sideways" data-n="1" style="--tw:1089px" markdown="1">

| # | Severity | Where | Failure | Fix |
|---|---|---|---|---|
| P1 | **High** | T-0063: `PlacesFile.save`, `SavedPlaces.swift:82`; `MapKitPlaceLookup`, :112; the results list, `PlacesView.swift:52-64` | DPLA, "Location and Maps" item (v): all MapKit use must follow Attachment 6. "Map Data" is defined to include "latitude and longitude coordinates". s2.5: "Map Data may not be cached, pre-fetched, or stored by You or Your Application" other than "on a temporary and limited basis", "after which, in all cases, You must delete any such Map Data". s2.4: "You may not surface Map Data ... without displaying the corresponding Apple map (e.g., if You surface an address result through the Apple Maps Service, You must display the corresponding map with the address result)." The screen does exactly that example, then writes the coordinates to `premade.json` for good. Commandment 6 (platform terms), and s4 lets Apple review a MapKit implementation and revoke access. This is my plain reading of the text, not a lawyer's, and I don't know how Apple enforces it. L16's "store the coordinates with the place" was written from CLGeocoder's page and never met this attachment; its `MKGeocodingRequest` branch is MapKit API, so it has the same problem | Fix 2 now, a chair's route before the typed place ships |
| P2 | **High** | `SavedPlaces.swift:212`, and four release documents | F4 confirmed, and it reaches further. "Your places stay on this iPhone" sits beside a field whose text goes to Apple: a false claim under Commandment 6's consumer protection. iCloud backups also leave the phone (policy draft line 35 says so). Once a lookup ships, `store-page-draft.md:179` ("only your scripts' own network calls ... need a connection") is false, and `privacy-policy-draft.md:51` needs a sentence about the screen. Its pre-publish check at :145 greps for URLSession, which MapKit passes silently. `privacy-label.md` condition 6 needs a note. The label answer likely stands: "You are not responsible for disclosing data collected by Apple" (A1) | Fix 3. I disagree with the triage's "doesn't block": it's one string, main is what a build is cut from, and nothing else would catch it. Documents: Wrenna, when a lookup route is chosen |
| P3 | Medium | 676b9b64 | See "T-0588" below | Fix 1 |
| P4 | Medium | `SavedPlaces.swift:255`, `allowLocation` | A grant reloads nothing. `refreshPlaced(force: false)` on scene active (`PyWidgetApp.swift:116`) is skipped within `WidgetPasses.spacing`, 30 s. So a person who taps Allow soon after launch may keep "Location needed" on the widget until the next 15-minute reload, with no fix taken. No test. With fix 2 this button is the screen's main job | After landing: on a change to `.allowed`, run Distance and Altitude. One test. New file, so a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> can land it |
| P5 | Medium | `WidgetPlacement.swift`, `isDiscoverable = false`; `testChooseWidgetIntentIsNotDiscoverable` | The test proves the literal. Nothing shows Edit Widget still lists the choices with the flag off, and that's the only way to set a widget. The "measured true by default" comment has no record behind it; the SDK shows only that the default exists | Add "Edit Widget still lists choices" to T-0590's device recheck, which stays open |
| P6 | Medium | `SavedPlacesBridgeTests` | F5 confirmed: the test goes through `premade_file`, never `files.shared`. By reading the two paths do meet at `scripts/pywidget.premade.distance/premade.json` (`FilesCall.swift:204`, `_premade.py` Store.open). "What the Places screen writes is what distance.py reads" is still a claim until a test writes the real way | One test, before fix 2 comes off |
| P7 | Low | `SavedPlaces.swift:285`, :311; `UIApplicationSupportsMultipleScenes` | Data loss on iPad: two windows on Places each hold a list, and the second save writes its stale list over the first's add | Build `next` from a fresh read in `commit` |
| P8 | Low | `testEntriesDistancePyWouldSkipAreSkipped`, `SavedPlaces.swift:24` | The name overclaims. distance.py doesn't skip string coordinates (`float("10")`) or latitude 91, and it draws them; Swift drops them from the file on the next save. Extra keys on an entry go too: only top-level keys are "written back as read". Only the app writes this file, so nothing is lost today | Rename, or keep unknown entries |
| P9 | Low | `testPrePickerConfigurationStillResolvesToNewWidget` | Says "decoded from an empty parameter set" and decodes nothing: it's the first test again. The real proof is T-0590's device recheck | Cut the claim |
| P10 | Low | `WidgetWriter.swift:36` | `unsetWidgetID = "new_widget"` is still a second literal; T-0590 moved the default so there'd be one | `= DefaultWidgetID.id` |
| P11 | Low | `SavedPlaces.swift:247`; `PlacesView.swift:11`, :44 | Any `load()` failure says "until this iPhone is unlocked", including a missing App Group. `fieldFocused` is written and never read: the one sign of a half-made commit I found | Tidy when the screen is next opened |
| P12 | Low | `SavedPlaces.swift:109-111`; `Copy.allow` | Two claims I can't check. "Sends the typed text, not the person's position" is unread on Apple's side, and the purpose string promises the fix is never sent. From memory, Apple's HIG wants a pre-permission button to say Continue or Next, not Allow; no HIG page is saved here | Wrenna reads each, one public page, before TestFlight. Marked [recall] |
| P13 | Low | `_premade.py` LOCATION_STATES | "Settings > Apps > PyWidget" hard-codes the display name, and NAME is open until #90. "iPhone" on iPad: F6 confirmed | Maren, with #90 |

</div>


## T-0588: is landing it acceptable, given land runs no UI test?

No. The triage's "lands with the stack" follows from "land can't split a stack", and the stack can be recut for the price of leaving out its bottom commit.

1. The chair's T-1030 line says half done restarts from the branch. Idris classes T-0588 half done, and so do I.
2. Its first run would come after it's on main. By reading it goes red on this Simulator: it has no raise step, and T-0758's note says the Mac keyboard is attached and iOS keeps the on-screen keyboard minimized. A test that is red for a known reason teaches people to read past red.
3. The header's fix is a machine-wide `defaults write`, which F7 says works against testG2 and the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G3</span> hardware tests.
4. On main the file becomes an existing test path, and a lane can't edit one (the triage's own T-0392 and T-0863 rows). The restart Idris wrote would then need a company session. Off main it's still a new file, so a lane can land it.
5. The selection step expects `" betZ\n"`. Our code sets no `smartInsertDeleteType`, so iOS's smart delete may also take the space. Only a run can say.
6. It reads as coverage. T-0584 F3 would look closed with a test nobody has seen pass.

What it costs to leave out: nothing. It's two new files that no other commit touches. Whether land's xc even compiles the UI target I can't say without reading `tools/`; if it doesn't, a compile error here would stop every UI test.

## Idris's claims, tested


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Idris&#x27;s claims, tested, scrolls sideways" style="--tw:640px" markdown="1">

| Claim | Result |
|---|---|
| Every path under `pywidget/`; every test path new; main moved only in files a3 doesn't touch | Confirmed. The 8 modified paths are all product files |
| T-0063 is (a), finished | **Overturned**: (b), held by P1. Otherwise complete against its line |
| No Pro premade needs a grant | Confirmed: none of the 7 declares location or motion |
| F3, naive `sampled_at` draws a ViewTreeError | Confirmed on the host: with `local_aware` cut, 2 tests fail, and each caller's mutant dies. The source is `_wire.py:215-221`. I take that line: it's the runtime, and any person's script hits it |
| T-0444 ids, 18 "as in" entries | Confirmed in the bundled file, 42 entries. `certifi-mpl` is already renamed. The list sheet asked for is still not on the branch: the done-note needs one run with `TEST_RUNNER_ACK_SHEET_DIR` |
| T-0039, 370 rows, D1 14 of 14 and 0 of 24, 1.18:1 | Recounted from measure.json: all agree. One sheet looked at, it's real. `lostVsFullColor` can't see D1's "26", because the header date carries the same token: the doc's count stands by exact label, not by that field. Flagged runs delete the output folder first; git has it |
| F5, F6, F7 | F5 and F6 confirmed. F7 not rechecked |
| Copy "doesn't block landing" | Overturned, P2 |

</div>


T-0039, T-0444 and T-0590 pass this review. Their tests prove what they claim, except where P5 and P9 say.

## Routes for the chair on P1, not chosen here


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Routes for the chair on P1, not chosen here, scrolls sideways" style="--tw:960px" markdown="1">

| Route | What it gets | What's unknown |
|---|---|---|
| Bundled city list, no lookup | No network, no Apple terms, and the footer's old sentence becomes true. It also answers Sun's typed city (matrix row 27). Only named places, not any address | Size and licence of the data: mine to measure against a budget |
| CLGeocoder | Core Location is not "MapKit API" as defined, and L16 has read its page, which has no storage term | A reading, not a permission. Deprecated from iOS 26 with "Use MapKit" |
| A map on screen plus Place IDs (`MKMapItem.identifier`, iOS 18) | Meets s2.4. The widget still needs coordinates, so s2.5 stays open | Apple's Place ID page, unread |
| Written permission from Apple | The only clean yes under s2.5 | Investors only, Commandment 10 |

</div>


Each route needs a read of the DPLA and of 5.1.1(iv), since matrix row 43 wants a manually entered address where possible. Row 43 stays open until one lands. The board already lets the typed place drop to 1.1 (Ines, T-0331).

## b2's recut recipe

It looks right. `git apply --check` of that patch passes on copies of main and of a3's tip, `WidgetStateLock` lives in `LaneGuard.swift` so nothing is left behind, and `Tests/Core/` is under the `Tests` source. Not reviewed beyond that; b2's work needs its own Commandment 13 review.
{% endraw %}

</div>
