---
layout: "default"
title: "T-0529: Commandment 13 review of the T-0353 Swift half (device modules)"
section: "documents"
description: "Changes requested before TestFlight. No Critical or High findings. Four Medium findings (M1 to M4) should be fixed before the build goes out: M2 is a privacy promise the contract makes (a person who turns location off\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0529-device-modules-c13-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 7 · Wed Oct 28</span><span><code>pywidget/docs/reviews/t0529-device-modules-c13-review-odalys.md</code></span></div><h1>T-0529: Commandment 13 review of the T-0353 Swift half (device modules)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys (not the author; Idris wrote the code). Date: 2026-10-28, 07:07 ET.
Commits reviewed: 1c327093 (clipboard, location, pedometer) and abe146d0 (files, notifications, keychain).
The Swift files under `pywidget/ios/App/Device/`, `App/Bridge/` and `App/Info.plist` are unchanged between abe146d0
and HEAD (`git diff --stat abe146d0 HEAD`; only an unrelated `project.yml` build-script change), so the line numbers
below are HEAD's.
Contract read: [`pywidget/docs/research/C2-device-api.md`](c2-device-api.html) (the C2 spec lives under research/, not design/) and
[`pywidget/docs/design/bridge-contract.md`](bridge-contract.html) s4, including v5.3 from Pernille's 339810b1.

## Verdict

**Changes requested before TestFlight.** No Critical or High findings. Four Medium findings (M1 to M4) should be fixed
before the build goes out: M2 is a privacy promise the contract makes (a person who turns location off is not left with
their last position on disk), and M1 is a containment claim the code does not fully keep. The five Low findings can
follow. Keychain accessibility, sync, the editor case and the "shared" rule are correct as written.

## Tests run (existing classes only, once each, main tree, `tools/xc.sh`, iPhone 17e Simulator, iOS 27.0)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Tests run (existing classes only, once each, main tree, tools/xc.sh, iPhone 17e…, scrolls sideways" data-n="2" style="--tw:833px" markdown="1">

| Run | Tests | Result | Log |
|---|---|---|---|
| `DeviceModulesFixtureTests` + `DeviceModulesSlice2Tests` | 17 | 17 passed, 0 failed | `ops/runs/xcodebuild-20261028-070456.log` |
| The six device tests in `BridgeTests` (clipboard, location, pedometer, files, notifications, keychain through the bridge) | 6 | 6 passed, 0 failed | `ops/runs/xcodebuild-20261028-070531.log` |

</div>


No new probes were written or run. Every finding below is from reading the code and Apple's SDK headers.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Findings, scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| ID | Severity | Where | One line |
|---|---|---|---|
| M1 | Medium | `Device/DeviceSupport.swift:275-279`, `Device/FilesCall.swift:267-278` | ".." is removed before symlinks are resolved, and the unresolved path is what gets bookmarked |
| M2 | Medium | `Device/LocationCall.swift:94-108, 133-136, 318-326, 362-366, 402-405` | The cached fix is deleted only when a script next calls location, and only for denied or restricted |
| M3 | Medium | `Device/LocationCall.swift:137-158`, `Device/PedometerCall.swift:81-88, 104-161`, `Device/ClipboardCall.swift:60-70` | Reads that can show a system prompt in the app still get Python's 10 s wait; sample's own timeout restarts after the prompt |
| M4 | Medium | `Device/NotificationsCall.swift:82-85, 144-149, 157` | Notification ids are global: a script can replace or cancel another script's notification |
| L1 | Low | `Device/NotificationsCall.swift:116-161` | No limit on how often a script schedules; `thread`, `title`, `body` have no length check |
| L2 | Low | `Device/FilesCall.swift:176, 263-278` | Picked paths are kept for the life of the process, not the run |
| L3 | Low | `Device/ClipboardCall.swift:91-100` | The paste prompt blocks a Swift-concurrency pool thread |
| L4 | Low | `Device/KeychainCall.swift:44, 63` | A script's secrets outlive it; a new script with the same id inherits them |
| L5 | Low | `Device/LocationCall.swift:145-150, 385-390` | A precise cached fix is still served after the person switches to Approximate |

</div>


### M1. Files: ".." after a directory symlink, and the bookmark is made from the unchecked path (Medium)

`DevicePath.isInside` (`DeviceSupport.swift:275-279`) runs `standardizedFileURL` first and then
`resolvingSymlinksInPath()`. `standardizedFileURL` is `URLByStandardizingPath`. The iOS 27 SDK header
(`NSURL.h:1480`) says it "resolves '..' references in absolute paths. The resulting path may still contain symbolic
links". It does not say that a ".." which follows a symlink is resolved against the link's target. The kernel resolves
it against the target. Take `<picked>/d/../x`, where `d` is a directory symlink to `/elsewhere/deep`. The check sees
`<picked>/x`, which is inside the picked folder. The file actually opened is `/elsewhere/x`. If Foundation removes
the ".." without looking at the disk, the check passes for a file outside the folder. The contract claims the
opposite (commit message: "nothing that escapes a picked folder through '..' or a symlink"). The existing test
(`DeviceModulesSlice2Tests.swift:119-155`) covers `<picked>/../secret.txt` and a file symlink, but not a directory
symlink followed by "..".

Second part: `SystemFiles.picked` returns `asked` (`FilesCall.swift:274`), the path as Python sent it, not the path
that was checked. `save` then makes `bookmarkData` from it (`FilesCall.swift:297-300`). The check and the use can
therefore see different files. A script has write access inside a folder it picked, and other Python threads keep
running while the calling thread waits on the bridge. So a path component can be swapped for a link between the check
and the bookmark.

Impact is limited. The app process can only bookmark what it can already reach: its own container, which Python can
read anyway, or a scope picked in this run. But the containment rule is the module's stated guarantee, and the fix is
small.

Fix: resolve the path that exists with `realpath(3)` (or `URL.resolvingSymlinksInPath()` before any ".." handling),
require that the item exists, compare the resolved paths component by component, and bookmark the resolved URL.
Add the test: a directory symlink inside the picked folder, then `link/../x`.

### M2. Location: the cached fix outlives a revoked permission (Medium)

Contract v5.3 item 3: "the cached fix in the App Group is deleted ... so a person who turned location off is not left
with their last position on disk." In the code, `forgetCache()` runs only inside `gate` (`LocationCall.swift:106`) and
`last_known` (`:134`). So it runs only when some script next makes a location call. Three gaps:

1. If the person turns Location off in Settings and no script asks again, `device/location.json` stays in the App Group
   indefinitely. `locationManagerDidChangeAuthorization` (`:318-326`) only wakes waiters. It never drops the cache.
   Nothing checks the status at launch or when the app becomes active.
2. `isOff` (`:94`) covers only `denied` and `restricted`. After "Reset Location & Privacy" the status is
   `not_determined`. `last_known` then still returns the old fix (`:134-136`). `gate` answers
   `PermissionNotDetermined` outside the app (`:102`) without reaching `forgetCache`, so the file stays.
3. The cache is a plain file at `<App Group>/device/location.json` (`:362-366`). Python's own file I/O can reach the
   App Group (that is how `files.shared()` works). So any script can read the last position directly, without a
   location call and without any permission check. Deleting the file is the only protection, which makes gaps 1 and
   2 matter.

Fix: drop the cache whenever the status is anything other than `when_in_use` or `always`. Do it in
`locationManagerDidChangeAuthorization`, at app launch, on becoming active, and in `last_known` and `sample`. Add tests
for revoking with no later call, and for `not_determined` after a reset. Separately, consider keeping the cache outside
the folders Python can name, for example under Application Support with a Swift-only reader. That is a contract
question for Pernille: today `last_known` is the only sanctioned reader.

### M3. Permission prompts: the first reads that prompt still wait 10 s (Medium)

This answers Pernille's open item in contract v5.3 item 1 ("Idris to say" which first reads prompt). From the code,
these calls can show a system prompt in the app context and are not covered by `PERMISSION_WAIT_S`:

- `location.sample` and `location.updates_start`: `gate` calls `requestPermission()` when the status is
  `not_determined` (`LocationCall.swift:99-104, 144, 166`).
- `pedometer.today`, `history`, `by_day` and `updates_start`: `gate` lets the app context through when the status is
  `not_determined`, and CoreMotion's first query shows the prompt (`PedometerCall.swift:81-88`).
- `clipboard.get_text` and `get_texts`: `UIPasteboard.string` shows the iOS 16+ paste prompt and blocks until it is
  answered (`ClipboardCall.swift:60-70`). This one is not on Pernille's list.

Timing bug in `sample` (`LocationCall.swift:137-158`). Python waits `timeout + 2` from the moment it sends the call.
Swift spends however long the person takes on the prompt, then starts `sample(timeout:)` with the full timeout. If the
person taps Allow after 3 s, Python raises `BridgeTimeout` while Swift is still waiting for a fix. When the fix
arrives, Swift writes it to the App Group cache (`:152-153`) for a call that nobody is waiting on. A permission waiter
that is never answered (for example, `requestWhenInUseAuthorization` while the app is in the background) is likewise
never cancelled (`:259-265`).

Not a deadlock: the main thread never waits on Python (`PyBridge.swift`, "The main thread never enters the C API"),
every handler runs on `deviceQueue` and Swift tasks, and the Python thread is freed by its own timeout. The cost is a
wrong error for the person and a GPS fix taken and stored after the script gave up.

Fix (Swift, Idris): take the prompt time off `sample`'s timeout, or answer at the Python deadline. Do not store a fix
for a call that has already been answered or has timed out. Write the list above into contract s4 v5.3 item 1, so that
Pernille can give those calls the 120 s wait in the app context.

### M4. Notifications: one script can replace or cancel another's notification (Medium)

`schedule` uses the script's `id` as the `UNNotificationRequest` identifier as given (`NotificationsCall.swift:144-149`).
iOS replaces a pending request that has the same identifier (C2 s5, "same id replaces the pending one"). So script B
scheduling `id="morning"` silently replaces script A's "morning". `cancel {id}` (`:82-85`) removes any identifier,
whichever script made it. The script tag itself cannot be spoofed: `pywidget.script` in `userInfo` comes from the
bridge's record (`:169`), so a tap always opens the script that actually scheduled the notification. That part is
right. The 64-<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> count (`:157`) also leaves out the replaced id, which is correct for a same-script replacement.

Fix: namespace the identifier as `/<id>` inside Swift, strip the prefix in `pending` replies,
limit `cancel` to the caller's own namespace, and have `cancel_all(script_only=False)` stay the one cross-script
action. Add tests: B scheduling A's id leaves A's request in place, and B cancelling A's id does nothing.

### L1. Notifications: no rate limit, unchecked lengths (Low)

The only limit is 64 pending. An app-context loop with `after=1` and fresh ids can deliver about one notification a
second for as long as the run lasts, because delivered notifications leave the pending count. `thread`
(`:150-154`) skips `DeviceName.problem`, and `title`/`body` have no size cap. Fix: a per-run cap on `schedule` calls
(for example 16), a floor on `after` (1 s), and length checks on `thread`, `title` and `body`. The values are for
Pernille and Idris to agree and write into contract s4.

### L2. Files: picked paths outlive the run (Low)

`pickedURLs` (`FilesCall.swift:176`) is filled by every pick (`:263-265`) and never cleared. In a later run, another
script can pass `bookmark()` a path that an earlier script's pick allowed. The earlier run's security scope has
already been given back, so this most likely fails at `bookmarkData`. But the rule "a path the picker gave" should mean
"gave this run". Fix: key `pickedURLs` by run id and drop the run's entries in `DeviceStreams.endRun`. Separately, and
not a code fix: bookmarks are one list for all scripts (`bookmarks`, `open_bookmark` and `forget` take any name). C2 s4
does not scope them. Whether they should be per-script, like the keychain, is Pernille's call as contract owner.

### L3. Clipboard: the paste prompt blocks a cooperative-pool thread (Low)

`SystemPasteboard.string()`/`strings()` (`ClipboardCall.swift:99-100`) runs inside `Task {}`. While the paste prompt
is up, a Swift-concurrency pool thread is blocked, and Python's timeout does not free it. Only one run happens at a
time, so this is one thread, not starvation. Fix: do the read on a dedicated `DispatchQueue` and resume a
continuation, as `SystemFiles.coordinatedRead` already does (`FilesCall.swift:319-331`).

### L4. Keychain: secrets outlive their script (Low)

The account is `/<name>` (`KeychainCall.swift:44, 63`). Script ids are names a person can reuse. If a
widget is deleted and a new one later gets the same id, the new one reads the old one's secrets, and nothing ever
deletes them. Fix: when a widget is purged from `.trash`, delete its `<id>/` accounts. Note this in C2 s9.

### L5. Location: a precise cached fix after the person chose Approximate (Low)

In a background run, `sample` and `last_known` serve the cached fix as stored (`LocationCall.swift:145-150, 385-390`).
If it was taken with full accuracy and the person has since turned Precise Location off, the precise position is still
served. Fix: when `accuracy()` is `reduced`, drop or do not serve a cached fix whose `horizontal_accuracy` is below
about 1 km.

## Focus items with no finding

- **Path tricks other than M1.** Percent-encoding: paths go through `URL(fileURLWithPath:)`, which takes `%` literally,
  and nothing decodes it. Absolute paths: only `bookmark` takes a path, and it must start with `/` and must be picked.
  `documents()` and `shared()` take no path. Unicode normalisation: Swift's `hasPrefix` compares by canonical
  equivalence, and APFS looks names up the same way, so a mismatch fails closed. `scriptFolder`
  (`FilesCall.swift:213-222`) checks the id with the widget-id rule (ASCII letters, digits, `_ - .`, no leading dot),
  refuses symlinks at `scripts/` and `scripts/<id>`, and checks again after making the folder. Bookmarks that resolve
  outside the container do so by design: the person picked them.
- **Keychain accessibility and sync.** `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` on add and on update
  (`KeychainCall.swift:134-135`), `kSecAttrSynchronizable = false` on every query (`:109`), and the app's default
  access group. Correct per C2 s9. The existing test `testSystemKeychainStoresThisDeviceOnlyAfterFirstUnlock` reads
  the stored class back.
- **Per-script scope.** The prefix comes from `RunInfo.script` (the bridge's record), never from Python (`:44`).
  Names may not contain `/` (`:62`), and ids cannot contain it either, so one script cannot name another's account.
  Premade ids carry the reserved `pywidget.` prefix that user ids are refused. This is a boundary only while Python
  cannot call `SecItem*` itself. Release builds require `STDLIB_MODE=zip` (`project.yml:16, 27`;
  `scripts/install_stdlib.sh:44`), which strips `ctypes` (`scripts/stdlib_cut.py:28`). Debug builds still carry
  `_ctypes.framework`. Fine for TestFlight, which is Release.
- **"shared".** Refused for the per-script scope, compared without case (`:50-53`). `shared=True` still works.
  Matches v5.3 item 4.
- **The editor.** With no script id, the per-script calls answer `PyWidgetError` with the v5.3 fix text (`:44-47`),
  and `files.shared()` answers `ValueError` (`FilesCall.swift:64-66`). Matches v5.3 item 4.
- **Location cache on denial.** When a call is made, it works: `gate` and `last_known` both delete the cache (pinned by
  `testDeniedLocationDropsTheCachedFix`). M2 covers the cases where no call is made.
- **Info.plist (Commandment 6).** `NSLocationWhenInUseUsageDescription`,
  `NSLocationTemporaryUsageDescriptionDictionary/ScriptLocation` and `NSMotionUsageDescription` are present in
  `App/Info.plist` and `project.yml`, and they say truthfully that one fix is kept on the device. No Always key and no
  background location mode. Notifications, clipboard, files and keychain need no string (C2 1.4). Collection is on
  demand only: nothing reads a sensor unless a script asks, and one fix is cached, overwritten each time.

## For the record

- Contract text versus code: v5.3 item 4 says Swift allows another script's `files.shared(id)` "only for ids with a
  folder". The code allows any saved widget or premade id, and makes the folder if it is missing
  (`FilesCall.swift:74, 219`). Harmless. The contract wording should match the code.
- Not a finding, by design (C2 s4): Python's plain file I/O reaches the whole app container and App Group. Per-script
  folders are a convention, not a boundary, and Swift's path checks govern only what Swift opens for Python.

## Board lines for Idris

T-0539 (M1), T-0540 (M2), T-0541 (M3), T-0542 (M4), all P1; T-0543 (L1-L5), P3.

## T-0549 re-review (Odalys, 2026-10-28, commit ad580920 by Idris)

Read-only review. I read the code and the tests in `git show ad580920`. No probes were written or run. I did not
read the commit message's claims as evidence.

### Verdict

**M1 to M4 are resolved. No Medium or higher finding is left. Approved for TestFlight from the device-module side.**
I found six Lows (R1 to R6). They go to Idris as T-0550 (files) and T-0551 (location). None of them blocks the build.

### Tests run (once, main tree, `tools/xc.sh`, iPhone 17e Simulator, iOS 27.0)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Tests run (once, main tree, tools/xc.sh, iPhone 17e Simulator, iOS 27.0), scrolls sideways" style="--tw:917px" markdown="1">

| Run | Tests | Result | Log |
|---|---|---|---|
| `DeviceModulesFixtureTests` + `DeviceModulesSlice2Tests` + `BridgeTests` | 83 (11 + 13 + 59) | 83 passed, 0 failed | `ops/runs/xcodebuild-20261028-082259.log` |

</div>


This matches Idris's 83/83 in `ops/runs/xcodebuild-20261028-074548.log`. One thing is unexplained. Idris also had a
red run at 07:41 (`ops/runs/xcodebuild-20261028-074128.log`, exit 65, stopped by xc.sh on "Selected tests failed").
The commit does not mention it, and it is not one of his three red-before logs. I did not read the raw log
(Worker Rule 11). The new tests depend on timing: they poll 50 x 20 ms, sleep 200 ms, and wait on 2.5 s and 6 s fake
prompts. That makes them the first suspects for a flaky test. The question is in T-0551.

### M1 (T-0539): files containment. Resolved.

- `DevicePath.isInside` (`DeviceSupport.swift:285`) now runs `realpath(3)` on both sides and compares path
  components. realpath walks the path the way the kernel does, so I checked each case from the packet against it:
  - `..` after a directory link is resolved against the link's target.
  - Link chains are followed to the end.
  - A dangling link, or a missing item, gives nil and is refused.
  - A sibling prefix such as `/picked2` vs `/picked` fails the component test.
  - `/var` vs `/private/var` resolves the same on both sides.
- `picked()` (`FilesCall.swift:270`) returns the resolved URL. `save()` bookmarks that URL, so the bookmark and the
  check now name the same path. An exact pick still returns the picker's own scoped URL. The two callers outside
  `picked()` are fine: `scriptFolder` creates the folder before `isInside` checks it, so "must exist" breaks nothing.
- The new test fails on the old code where it matters. Idris made `picked/x` exist, so the old code's text-only
  `..` handling landed inside the folder and passed. The `alias` case also failed on the old code, because the old
  code returned the path as sent. The chain cases passed before and after; they guard against regressions.
- **R1 (Low): the gap between the check and the bookmark is smaller but still there.** realpath checks a path that
  has no links in it. `bookmarkData` then walks that path again a moment later. The script has write access inside
  the folder it picked, and other Python threads keep running during the call. So one of them can replace a
  directory in that path with a link between the two steps, and the bookmark follows the link. As in T-0529, the
  impact is limited to what the process can already reach. Fix: after `bookmarkData`, read the bookmark's target
  back (`URL.resourceValues(forKeys: [.pathKey], fromBookmarkData:)`), run the same `isInside` check against the
  picked root, and refuse and drop the bookmark if it fails. A test can stand in for the swap with a `FakeFiles`
  hook, or with a link created between the two steps through an internal seam.
- **R2 (Low, check on a device): `picked()` now needs realpath to succeed even for the exact picked item.** The
  picker opens in place (`asCopy: false`), so picked items live under File Provider paths, and realpath has to
  stat every parent folder. `notePicked` falls back to the standardised path when realpath fails, but `picked()`
  returns nil before it looks the path up. The Simulator cannot show whether the sandbox allows this. Fix: in
  `picked()`, look up the exact standardised key before resolving (an exact pick needs no link resolution), and
  confirm on a device that bookmarking an iCloud Drive file, and a file inside a picked folder, still works.
- Stale bookmarks: `resolve()` (`:314`) saves a stale bookmark again without checking containment. That is C2 s4
  as written: a bookmark follows its file. A script cannot use it to move a file anywhere it could not already
  reach. Not a finding.

### M2 (T-0540): the location cache. Resolved.

- The cache is deleted for any status except `when_in_use` and `always`. That happens in four places:
  - in the CoreLocation callback (`LocationCall.swift:364`);
  - at launch and on `didBecomeActive` (`LocationCacheGuard`, installed by `PyWidgetApp.init`);
  - in `gate`;
  - in `last_known`.

  `not_determined` after a privacy reset is covered. `sample` outside the app reaches `gate` first, so it also
  deletes the cache before it would read it.
- The move to Application Support is safe. The widget extension compiles only `Widget/` and `Shared/`
  (`project.yml`, target `PyWidgetExtension`). It has no device code and never read `location.json`. No Python,
  fixture or test outside Swift names the file. The only doc left is C2-device-api.md s7, which T-0548 already
  covers. Nothing that used the cache breaks.
- The tests fail on the old code: the old `last_known` returned the cached fix when the status was
  `not_determined`, and the other two tests use API that did not exist before.
- **R3 (Low): the old App Group copy is deleted only when location is off.** `forgetCache()` removes
  `legacyURL`, but only `forgetCache()` does. For a person who keeps location on, the copy written before T-0540
  stays in the App Group, where the extension's Python can read it. It is never updated and never removed. Fix:
  delete `legacyURL` once, unconditionally, at launch (in `LocationCacheGuard.install`). Small today, because no
  build with the old path has gone to testers.
- **R4 (Low): a fix can be written after a revocation deletes the cache.** `store()` (`:448`) does not look at
  the status. Here is the sequence:
  1. A `sample` reply or an `updates` fix is already on its way when the person turns location off.
  2. The callback deletes the file.
  3. `store()` then writes the fix again.

  The window is a few milliseconds, and the next launch or activation removes the file. Fix: the callback sets a
  "not allowed" flag under `cacheLock`, and `store()` does not write while the flag is set.
- **R5 (Low): Application Support is included in device backups.** The last position therefore goes into iCloud
  and Finder backups (so did the App Group copy). Fix: set `isExcludedFromBackup` on the cache folder after each
  write.
- **R6 (Low, test gap): the tests do not cover the code that actually runs.** The production callback calls
  `SystemLocation.shared.forgetCache()` directly. The test's "authorisation callback" step calls
  `LocationCall.authorizationChanged` instead, and only `LocationCacheGuard` uses that function. Removing line 364,
  or the `_ = LocationCacheGuard.app` line in `PyWidgetApp`, would leave every test green. Fix: route the callback
  through `LocationCall.authorizationChanged(s, source: SystemLocation.shared)` so the test covers the code that
  runs, and add one test that `LocationCacheGuard.app` installs on the shared source (or a short comment saying
  why it cannot be tested).

### M3 (T-0541): the 120 s prompt race and sample's timeout. Resolved.

- `ask` races the prompt against a 120 s timer through `Once`, so it resumes exactly once. After cancellation the
  timer still calls `resume(nil)`, which does nothing because `Once` has already resumed. If the timer wins, `gate`
  answers `PermissionNotDetermined` and deletes the cache.
- `sample` arithmetic (`:181`): `left = timeout - (time since started)`. Prompt time is measured from before
  `gate`.
  - Answered in e < timeout: CoreLocation gets `left`, the reply lands by about `timeout`, and Python's
    `timeout + 2` still covers it.
  - e >= timeout: `no_fix` comes back with no CoreLocation call, so there is no fix to store.
  - Timed-out `fixWaiters` are removed, and a late `didUpdateLocations` stores nothing (only the reply path
    stores).

  I found no path that stores a fix after an answer or a timeout.
- Until T-0548 lands, Python still waits `timeout + 2` for `sample`. A slow prompt therefore gives a
  `BridgeTimeout` first and a late `no_fix` reply after it, with nothing stored. That is correct, and T-0548 then
  makes the wait match.
- Notes, not findings:
  - Each unanswered `gate` leaves one continuation in `permissionWaiters` until the status changes. There is one
    per call, and they clear on the next change.
  - `request_full_accuracy` can show two prompts within one 120 s Python wait. Nothing is stored either way.
  - The test's `took < max(120, 2.2)` bound is loose. The `sampleTimeouts == []` and `stored == nil` checks do the
    real work, and both fail on the old code. The second case (`given <= 2.05`) fails on the old code too.

### M4 (T-0542): notification ids per script. Resolved.

- Identifiers are `/<id>`, or `.editor/<id>` for the editor.
  - `pending` removes the prefix using the script named in the request's `userInfo`, and shows identifiers from
    any other source whole.
  - `cancel` builds the identifier from the caller's own namespace only.
  - The 64-request count and the read-back after `add` both use the full identifier.
- Can a script forge another's namespace? No. Script ids come from the bridge's `RunInfo`. That is either a widget
  folder name that passed `WidgetID.problem`, a premade, or the constant `new_widget`. The `WidgetID` character set
  is `[A-Za-z0-9_.-]` with no `/`, and a leading `.` is refused, so no script id contains `/` and none equals
  `.editor`. A notification id that contains `/` stays inside the caller's namespace: B cancelling `a/morning`
  removes `b/a/morning`, and the test pins this.
- The test fails on the old code: there, B's schedule replaced A's request, so the count was 1, not 2.

### New board lines

- T-0550 (Idris, P3): R1 and R2, files.
- T-0551 (Idris, P3): R3 to R6, location, plus the 07:41 red run.
{% endraw %}

</div>
