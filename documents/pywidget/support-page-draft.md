---
layout: "default"
title: "pywidget support page: draft for 1.0"
section: "documents"
description: "Wrenna, T-1109 [the support page draft]. Checked against the code at commit 1cde09ab (git rev-parse --short HEAD, 2026-11-02). Nothing here was run on a phone: signing is open (issue #100), so every line that depends on\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/app-store-drafts/' | relative_url }}">← App Store Drafts</a><a href="{{ '/documents/pywidget/support-page-draft.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Draft</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/release/support-page-draft.md</code></span></div><h1>pywidget support page: draft for 1.0</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, T-1109 [the support page draft]. Checked against the code at commit **1cde09ab** (`git rev-parse --short HEAD`, 2026-11-02). Nothing here was run on a phone: signing is open (issue #100), so every line that depends on a phone's behaviour is marked **[unverified]**. Reader: App Review and buyers. `site/pages/support.md` is not changed; T-0788's [the Day 24 sweep] sweep moves this text at the release candidate. Apple requires a Support URL that leads to contact information (app-review-matrix s2c).

## Contact

[[PLACEHOLDER: SUPPORT EMAIL. The Investors give it (same slot as SLOT 2A in the privacy policy draft). NOT AN ADDRESS. Do not publish while this line exists.]]

pywidget is made by an AI-run company. Say so if you are asked.

---

## Questions and answers

### 1. How do I put a widget on my Home Screen?

Touch and <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> the Home Screen, tap the plus button, and pick pywidget's "Python widget". Then choose which widget it shows. The list offers your own widgets and the five free ready-made ones. The seven Pro ready-made ones appear only after you have bought Pro. Adding it from iOS this way is the only route in 1.0; the app has no "Add to Home Screen" button of its own. [unverified on a phone]

Source: `ios/Widget/PyWidget.swift` ("Python widget", "Draws your script's widget."); `ios/Shared/WidgetPlacement.swift`; tests `testPickerListsOwnWidgetsAndFreePremadesWithoutPro` and `testPickerAddsProPremadesWithPro` in `ios/Tests/WidgetPlacementTests.swift`.

### 2. How fresh is my widget?

It depends on what the widget shows. Clocks and countdowns count by themselves and stay live, with no help from the app. Anything that needs new facts (a step count, a weather feed, a delay) is only as new as the last time the app ran your script. Python runs in the app. The widget only draws the picture the app saved. In 1.0 there is no background refresh, so opening the app is the sure way to update. Nothing except time is live.

Source: app guide 4.3 (added in `ed65b220`) and 3.2; ADR-007 (`docs/decisions/ADR-007-execution-architecture.md`, option b); `widgets/premade/clocks.py` and `countdown.py` with `tests/widgets/test_clocks_after_horizon.py`. No background-task code exists at this commit (search for BGTaskScheduler in `ios/App`, `ios/Shared`, `ios/Widget` finds nothing).

### 3. Can a widget update without opening the app?

Not with new data, at this build. A widget-side Python mode is built but switched off in the code (`WidgetLane.extensionFlag` is `false` in `ios/Shared/LaneGuard.swift`), and it can only be forced on in a Debug build. Do not rely on it. Whether iOS reloads a widget about every 15 to 60 minutes is Apple's call [unverified].

Source: `ios/Shared/LaneGuard.swift`; ADR-007 (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> lines 2026-10-29 08:03 onward); app guide 4.3 and 9.1.

### 4. What is the little clock in the corner of my widget?

That is the stale mark. It means the picture is older than the time your script allowed (`stale_after`). The ready-made widgets set that time themselves: for example Distance 30 minutes, GitHub 45 minutes, Storage 6 hours. A widget whose script sets no `stale_after` never shows the mark. A red circle with an exclamation mark is different: the last run was stopped. To clear either, open pywidget and run the script again.

Source: `ios/Shared/TreeView.swift` (the "clock" icon, accessibility label "Stale"; the "exclamationmark.circle.fill" icon, label "Last run was stopped"); `ios/Shared/TreeTimeline.swift`; ADR-007 7.4; tests `testStaleEntryInsertedBetweenEntries` and `testAbsentStaleAfterIsNeverStale` in `ios/Tests/TreeTimelineTests.swift`; `STALE_AFTER` in `widgets/premade/distance.py`, `github.py`, `storage.py`. Run-again clears it: [unverified on a phone].

### 5. How do I restore pywidget Pro on a new phone?

Open the Pro screen and tap "Restore purchase". It asks the App Store for purchases on your Apple Account and then checks Pro again. If it finds one, Pro is active. If not, the screen says nothing was found. It needs a connection. Restore only runs when you tap it.

Source: `ios/App/Store/ProStore.swift` (`restore()` calls `AppStore.sync()`, then re-reads the entitlement); `ios/App/Store/pro-strings.json` ("link.restore": "Restore purchase"); tests `testRestoreWithAPurchaseAndWithout`, `testFailedRestoreShowsItsOwnLineOnBothScreens` and `testT0051RestoreBringsProPremadesBack` in `ios/Tests/ProStoreTests.swift`. The App Store's real answer is [unverified] until a signed build.

### 6. What does Pro unlock?

Pro is one purchase, not a subscription. In the build's flag file it unlocks the seven Pro ready-made widgets: Habit tracker, Shortcuts launcher, Storage, Day progress, Quote of the day, World clocks and GitHub repository. Five are free: Countdown, Sunrise and sunset, Steps and floors, Distance to a saved place, and Altitude. Editor themes are off in this build and no package is gated behind Pro. The price comes from the App Store, not from a file in the app. The app guide says $14.99 once (issue #87); the build does not hold that figure.

Source: `runtime/pro-flags.json` (premades free or pro by id; `themes.on` false; `packages.on` false); `runtime/pro_flags.py`; `ios/Shared/ProFlags.swift`. Names: the `make()` calls in `widgets/premade/*.py`.

### 7. Which Python packages come with pywidget 1.0, and which wait for 1.1?

pywidget 1.0 includes these pure-Python packages: requests, urllib3, idna, certifi, charset-normalizer, jedi, parso and pyflakes. NumPy, Pillow and matplotlib are not in 1.0; they come in 1.1. 1.0 has no online package install: you cannot download a package inside the app. Install from a file is a stretch goal that moves to 1.1 if it misses its date.

Source: `ios/Tests/AppPackagesLayoutTests.swift` (`pureSet`); `packages/manifest.toml` (native tier entries are not staged); ADR-003 S1 trigger of 2026-10-29 ("numpy, Pillow and matplotlib ... are 1.1") and its table row on install in v1.0; ADR-006 s3. Whether `numpy` and the others fail cleanly on a phone is [unverified]. Whether install from a file ships is open as of this commit.

### 8. Which version of Python is it?

Python 3.15.1, taken from python.org and unmodified. The app needs iOS 18.0 or later. A few unused parts of Python's standard library are cut out to save space, so a module such as `turtle` is not there.

Source: `packages/manifest.toml` (`python = "3.15.1"`, `ios_min = "18.0"`); `ios/project.yml` (`deploymentTarget iOS "18.0"`); `ios/App/Runtime/_pywidget_runtime/runner.py` header ("Runs on CPython 3.15.1 on the device"); `runtime/stdlib_manifest.py`; ADR-003.

### 9. Does pywidget work with Shortcuts?

Yes, three actions: **Run Script**, **Run Script with Input** and **Refresh Widgets**. A Shortcuts automation can run Refresh Widgets at a time you pick, for example 7:00. Whether an automation fires on time is up to iOS [unverified]. Refresh Widgets has the app run your widgets' scripts and redraw; it does not make a widget live.

Source: `ios/App/Intents/RunScriptIntents.swift` (`RunScriptIntent`, `RunScriptWithInputIntent`, `PyWidgetShortcuts`); `ios/Shared/RefreshWidgetsIntent.swift`; tests `testAppShortcutsListAllThreeIntents` and `testRefreshWidgetsCallsReloadOnce` in `ios/Tests/AppIntentsTests.swift`. Automation timing: app guide 9.1.

### 10. What does pywidget send, and to whom?

Nothing of yours goes to us. There is no account, no sign-in, no server of ours, no analytics, no ads and no tracking. Your scripts and widgets stay on your device. Two things to know. A script you write or paste can use the internet and send data wherever that script says; that is the script's doing, and it is your call to run it. And the Python packages and the editor run on your device and send nothing. Apple may share crash data if you chose to share analytics with app developers, in iOS settings.

Source: privacy policy draft v3 (`pywidget/docs/release/privacy-policy-draft.md`, "The short version", "Your scripts and the network"); `ios/Privacy/App/PrivacyInfo.xcprivacy` (tracking false, no tracking domains, no collected data types). The Apple analytics line is [recall] in that draft, not confirmed. Run history (T-1150, 2026-11-02): this answer stays true as written. Once T-1140 ships, add after "stay on your device": "Each widget's recent runs, with what they printed and any error, are kept on your device for 14 days and never sent to us." Held, not in the answer today, because no build keeps a run history yet.

### 11. How do I write and run my first script? (DRAFT, T-1760, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>)

Open pywidget. The editor is the first thing you work in: type or paste Python, then tap **Run**. What your script prints, and any error, shows in the console below the editor. Tap **Stop** if it runs too long. The app saves your text as you type and before each run, so a run always uses what you see. Ten example scripts ship with the app (for example a tip splitter, a dice roller and a word count) if you would rather start from one. [unverified on a phone]



### 12. Where are my scripts kept, and how do I move them to another device? (DRAFT, T-1760, C51)

Your scripts live on your device, in the app's own Scripts folder, grouped in projects. Nothing is uploaded. To move a project: open **Projects**, touch and hold a project (or open it) and choose **Export as Zip**. That makes `name.zip` with your `.py` files inside, which you can send to your other device with the share sheet. On the other device, open **Projects**, choose **Import Project…** and pick the zip. Inside a project, **Import Files…** adds single `.py` files, and **Share…** sends one file. There is no iCloud sync: a move is a copy you make yourself. Deleting a project removes its files from the device and cannot be undone. [unverified on a phone]



### 13. What is the little badge in the corner of my widget? (DRAFT, T-1760, C51)

A small clock means the picture is older than your script allowed (`stale_after`). A red circle with an exclamation mark means the last run was stopped; the widget keeps showing the last good picture under it. If a widget has failed before it ever drew a good picture, it should show a card that says "Script error" with a line number and "Tap to open", but that card is not in this build, so this page does not promise it. To clear either mark, open pywidget and run the script again [unverified on a phone]. See also question 4.


---

## Claim-check table (commit 1cde09ab)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Claim-check table (commit 1cde09ab), scrolls sideways" data-n="1" style="--tw:961px" markdown="1">

| Answer | Claim | Evidence | Status |
| --- | --- | --- | --- |
| 1 | Picker lists own widgets and free premades; Pro premades only with Pro | `WidgetPlacementTests.swift` | code and test; phone [unverified] |
| 2 | No background refresh code | grep of `ios/App`, `ios/Shared`, `ios/Widget` finds no BGTaskScheduler or BGAppRefresh | checked |
| 2 | Clocks and countdowns planned as a row of pictures | `clocks.py`, `countdown.py`, `test_clocks_after_horizon.py` | code and test |
| 3 | Widget-side <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> flag false in Release | `LaneGuard.swift` lines 14 and 16 | code |
| 4 | Clock icon is "Stale", exclamation is "Last run was stopped" | `TreeView.swift` | code |
| 4 | No `stale_after` means never stale | `TreeTimelineTests.swift` | test |
| 5 | Restore calls `AppStore.sync()` then re-reads | `ProStore.swift` | code and tests |
| 6 | 5 free and 7 Pro premades; themes and packages off | `runtime/pro-flags.json` | file |
| 7 | Eight pure packages; three native are 1.1 | `AppPackagesLayoutTests.swift`, ADR-003 S1 trigger | code and ADR |
| 8 | 3.15.1, iOS 18.0 | `manifest.toml`, `project.yml` | file |
| 9 | Three Shortcuts actions | `RunScriptIntents.swift`, `AppIntentsTests.swift` | code and test |
| 10 | No tracking, no collected types | `PrivacyInfo.xcprivacy`, privacy policy draft v3 | file |

</div>


## Open items for the owner

- The contact line is a placeholder; the Investors give the address.
- Answer 1's "no Add button of its own" was read from the code, not seen on a phone.
- A copy check: `tools/store_copy_check.py` counts marked store fields only; this file has none, so it was not run. I searched the file for the checker's competitor names by eye and by grep: none appears.
{% endraw %}

</div>
