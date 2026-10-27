---
layout: "default"
title: "T-0330: C13 re-review of the MacBook runner fixes (T-0323)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/2026-10-26-t0330-macbook-runner-rereview.md</code></span><span>2026-10-27</span></div><h1>T-0330: C13 re-review of the MacBook runner fixes (T-0323)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Reviewer: Idris. Author: Odalys. Reviewed: d6c26832 (on main; ca292444 is the same change, same message and
stat, not on main): tools/macbook-runner/runner.py, kinds.json, install.sh, SETUP.md,
tests/macbook_runner_test.py, against my T-0318 findings (log/audit/2026-10-26-t0318-macbook-runner-review.md).
2026-10-26 22:05-22:45 ET, on the Mac mini, in this account only. I read the code, not the commit message.

Not reviewed: the uncommitted change in the working tree during this review (runner.py, install.sh, SETUP.md,
tests, tools/xc_helpers.py: stopping a leftover sandboxed `ibtoold`). It edits SETUP.md, so the text that gets
posted must be the committed one, re-checked.

## Verdict

**NOT READY. SETUP.md must not be posted yet.** All four fixes hold in the code, and they are good work: the
separate account, the runner's own Simulator, the runner-side download, and the one-repository token. Two things
are still wrong, and both are small:

1. The sandbox, the second wall, still lets a job read and write `/private/tmp` and `[local folder]`, and
   connect to any service listening on this Mac's localhost. Both are shared by every account on the Mac.
2. SETUP.md's plain statement of what the Simulator path can reach leaves out external drives, `/tmp`, the
   local network and this Mac's local services, and other accounts' running command lines. The sandbox bullet
   says "no network, no other account's files", and item 1 makes that untrue.

B1 asked for exactly one thing if the boundary could not be closed: say what remains in plain words, so the
Investors decide with it in front of them. The account wall itself passes.

## Per item


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Per item, scrolls sideways" style="--tw:748px" markdown="1">

| Item | Verdict | Shown by |
|---|---|---|
| B1a. Runner runs only in its own Standard account | **PASS** | code: `once()` runs `account_problems()` before `queued()`, so no job starts in the wrong account; install.sh refuses another user and admin. Tests: 5 account checks in the suite (92/0) |
| B1b. Sandbox, second layer | **NOT READY** | probes below: `/private/tmp` and `[local folder]` read and write allowed; localhost connect allowed |
| B2. Own Simulator only, no erase-all | **PASS** | 8 fake-simctl tests; two real runs here created `itsthecompany-runner`, used it, shut it down and deleted it by UDID; `simctl list devices` shows 0 left; "erase all" is gone from SETUP.md and install.sh |
| H1. No repository code with network | **PASS** | code: a step with any key but `argv` is refused; `fetch` is https only, sha256-checked and goes straight into the cache. Real run: `runner fetch ... : ok` twice, then `fetch_python.sh` checked and unpacked from the cache inside the sandbox with no network |
| H3. Token reaches this repository only | **PASS** (notes) | SETUP step 4: fine-grained token, one repository, Contents read and write. Sandboxed steps cannot read it: `~/.config/gh` denied, Keychain services and `/usr/bin/security` denied (probes) |
| M4 + B1 text in SETUP.md | **NOT READY** | Pause and check-in now point at real things, plus Homebrew, xcode-select, token steps and honest times: done. Still wrong: the disclosure sentence and the sandbox bullet (below), and the "Not posted yet" header line |
| L1. git timeouts | PASS | `NET_TIMEOUT_S = 300` on every git call |
| M2. Shutdown after every job | PASS | `finally: shutdown_simulator`; test plus real runs (`simulator-shutdown` logged) |

</div>


## What I ran (show me the bytes)

**Tests:** `python3 tests/macbook_runner_test.py`: **PASS 92, FAIL 0**.

**Probes.** `Runner(~/t0330-runner-work, ...)` with real `/Users`, real `[local folder]` and this account's
home in the role the runner account's home will play. Each probe ran under `/usr/bin/sandbox-exec -f` with the
generated profile, against decoy files I made and deleted afterwards. No other account's data was read.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What I ran (show me the bytes), scrolls sideways" style="--tw:724px" markdown="1">

| Probe | Outside | Inside |
|---|---|---|
| read own home file outside the job folder | 0 | **denied** |
| `stat` the same file | 0 | allowed (the runner account's own home: acceptable) |
| read `[local folder]` decoy, list `/Users`, list `/Volumes` | 0 | **denied** |
| read `~/.config/gh` | 0 | **denied** |
| DNS `getaddrinfo`; UDP DNS query to 1.1.1.1:53; TCP 1.1.1.1:80 | 0 | **denied** |
| `dscacheutil -q host` | answer | exit 0, empty: no answer |
| `pbpaste` of a decoy | decoy | **denied** |
| exec `/usr/bin/security` | 0 | **denied** |
| read decoy in **`/private/tmp`** | 0 | **allowed**: `decoy-tmp-7731` |
| read decoy in **`[local folder]`** | 0 | **allowed**: `decoy-vartmp-7731` |
| write to `/private/tmp` | 0 | **allowed** |
| connect to a **localhost** listener started outside the sandbox | - | **allowed**: read `local-service-7731` |
| `lsappinfo front` (LaunchServices) | 0 | allowed (bounded to the runner account's own session now) |
| own `/var/folders` temp, `~/Library/Developer` write | 0 | allowed (the runner account's own) |

</div>


An `osascript` probe of System Events hung for 40 s under the sandbox and was dropped, so as not to raise a
prompt. Not a finding.

**What any local account can see, which bounds the Simulator path (outside the sandbox, in the runner account):**
- `ps -axo user,args` shows other accounts' full command lines (here: root's `securityd -i`, `keybagd -t 15`).
- A disk image attached here mounts with `noowners` (`diskutil info`: "Owners: Disabled"). On such a volume
  every local account gets the owner's access [recalled: the macOS default for external drives too; I did not
  run a cross-account read, because there is no second account here].
- `/private/tmp` and `[local folder]` are world-writable with the sticky bit. Files that other accounts leave
  there with mode 644 are readable.

**Real xc-test under a tighter profile**, to see whether the fix for B1b is cheap. Job folder and cache under
my scratch work folder, cached CPython copied in, commit a1a7702a, the runner's own `run_job()`:
- Try 1: added `(deny file-read* file-write* (subpath "/private/tmp") (subpath "[local folder]"))`, allowed
  the xc lock file by literal, and removed `localhost:*`. The build succeeded, but the tests did not start:
  `testmanagerd` socket at `[local folder]` "no file was found".
  TEST FAILED, 221 s.
- Try 2: the same, plus `(allow file-read* file-write* (regex #"^/private/(var/)?tmp/com\.apple\.launchd\."))`.
  These launchd folders are per user, mode 700. Result: build and run OK, **113 unit tests run, 1 failure**,
  and 5 UI tests passed (1 skipped), 981.6 s with waits for the xc lock. The failure:
  `TreeTimelineTests.testStaleMarkDrawsOnlyInTheCornerSlot`, "no stale mark drawn" (0 pixels differ). I have
  not established the cause. The test draws inside the Simulator process, which is outside our sandbox, so the
  profile is probably not the cause [inferred]. Before this profile ships, it must be compared with an
  unsandboxed run, or with the current profile, at the same commit.
- So denying localhost costs nothing the suite needs (try 2), and the `/tmp` deny needs one exception.

I did not run the current shipped profile end to end. Odalys's board note says 112 unit + 5 UI passed at
15bd5bc1 in 741 s. Try 2 is stricter, so it covers what the sandbox needs.

## Fixes (for Odalys)

1. **Profile.** After the first deny, add `(deny file-read* file-write* (subpath "/private/tmp")
   (subpath "[local folder]"))`, then `(allow file-read* file-write* (regex
   #"^/private/(var/)?tmp/com\.apple\.launchd\."))`. Drop `(allow network-outbound (remote ip "localhost:*"))`.
   In kinds.json, set `XC_LOCK_FILE={CACHE}/xc.lock` in xc-test's env, so xc.sh's lock needs no `/tmp`. Add
   three probes to the test, each allowed outside and denied inside: a `/private/tmp` decoy, a `[local folder]`
   decoy, and a localhost listener. Rerun the real xc-test at one commit with and without the new profile, and
   write down the stale-mark test's result in both.
2. **SETUP.md disclosure.** Replace the "Plainly, what is outside the sandbox" paragraph with one that is true.
   A draft:
   > Plainly, what is outside the sandbox: the Simulator and the app under test are started by macOS for Xcode,
   > outside the sandbox but inside the runner account. They run the company's code, and they can do what any
   > account on your Mac can do: reach the internet, your home network and services running on this Mac; read
   > apps, system files, `[local folder]`, files left readable in `/tmp`, and the files on any external drive or
   > disk image you connect (macOS lets every account read those by default); and see the names and command
   > lines of programs running on the Mac. They cannot open your home folder (after step 2), your Keychain, your
   > clipboard or your GitHub sign-in.

   Change the sandbox bullet only if fix 1 lands. With it, "no network, no other account's files" is true.
   Delete the "Not posted yet" header line in the posted copy.
3. **SETUP step 4, two lines** [recalled, not checked]. If the organization asks for approval of fine-grained
   tokens, the Investor approves it at Its-The-Company > Settings > Personal access tokens > Pending requests.
   The token expires in 90 days: say the runner stops then, until a new one is pasted.
4. **Low, account check.** `account_problems()` counts a home as open only if it can be listed. A home at 711 or
   751 cannot be listed but can be traversed, so known names like `~/.gitconfig` stay readable [inferred from
   POSIX permissions, not run across accounts]. Also count `os.access(path, os.X_OK)`, and add a test.
5. **Later (not blocking), H3 residue.** Outside the sandbox, the Simulator path can run `gh auth token` in the
   runner account [inferred]. That token can push to any branch of our repository, `main` included, under the
   Investor's name. Branch protection, or a ruleset that limits that token's pushes to `macbook-results`, closes
   this. It reaches only our own repository, so it does not stop the posting.

Unmeasured, and the first MacBook job will show it: whether xcodebuild can boot the Simulator and run UI tests
in a fast-user-switched background session.

Once fixes 1 and 2 are committed, I re-check the probe rows and the posted text. That is about 15 minutes, with
no new real run needed unless the profile differs from try 2.

Board: fixes 1-4 are T-0351 (Odalys, P0); fix 5 is T-0352 (Odalys, P2).

---

# T-0366 re-check of T-0351 (3f96a333), 2026-10-26, Idris

**NOT READY. SETUP.md must not be posted yet.** The `/tmp`, `/var/tmp` and TCP localhost fixes hold, by my own
decoys, and the X_OK check is right. One NOT READY item is left, and it is the sandbox bullet: "no network (not
even services running on this Mac)" is untrue. A sandboxed job can still connect to local services through their
Unix-domain sockets: printing (`cupsd`), the iPhone and iPad link (`usbmuxd`), `portmap`, and any service that
leaves a world-open socket in `/tmp`. Two smaller claims are too strong as well.

## Per item


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Per item, scrolls sideways" style="--tw:790px" markdown="1">

| Item | Verdict | Shown by |
|---|---|---|
| Runner suite | PASS | `python3 tests/macbook_runner_test.py`: **PASS 104, FAIL 0** (16.5 s). Odalys's six new probes and the 0o100 account test are in the file and check allowed-outside and denied-inside, with decoys removed |
| `/private/tmp`, `[local folder]` read and write | **PASS** (Low residue) | my probes below: read via both real and symlink paths, list, write: all denied inside, all 0 outside |
| Localhost TCP connect | **PASS** | listener on 0.0.0.0 and ::1: 127.0.0.1, `localhost`, ::1 and this Mac's own LAN IP all `Operation not permitted` inside, 0 outside |
| Local services over Unix sockets | **NOT READY** | inside the sandbox, `connect()` succeeded to `/var/run/usbmuxd`, `[local folder]`, `[local folder]`, and to my own 0666 decoy socket in `/private/tmp` (connect only, nothing sent) |
| X_OK account check (fix 4) | **PASS** | code: an unlistable but `X_OK` home counts; Shared, Guest, own and dot names skipped; test at mode 100 |
| Real xc-test | not rerun | the generated profile's `/tmp` rules are my try 2's, byte for byte; the lock moved to `{CACHE}/xc.lock`. Odalys's `runner_profile_compare.py` rows (ops/metrics/runner-profile-compare.jsonl): new and old profile both 113 unit + 5 UI (1 skipped), stale-mark test passed in both, n=1 each. The main-tree Xcode slot is held (T-0161), so I did not queue another |
| SETUP.md disclosure ("Plainly, what is outside the sandbox") | **PASS** | every line is true as far as I can check, and it now names the internet, home network and local services, `/tmp`, drives and disk images, and other programs' command lines |
| SETUP.md sandbox bullet | **NOT READY** | "no network (not even services running on this Mac)": false (Unix sockets). "no other account's files": too strong, since `/Library/Caches` (mode 1777, root:admin) can be read and written inside the sandbox (my decoy: read `dlibcache`, write ok) |
| SETUP.md step 4, token approval and 90 days | **UNCHECKED** | the 90 days matches the Expiration the step tells them to pick. The org approval path ("organization's settings, under Personal access tokens, Pending requests") is still from memory, Odalys's and mine. I did not fetch GitHub's docs: the standing ruling covers developer.apple.com and apple.com/legal only. It is labelled unchecked here; an Investor who is an org owner will see the real page |

</div>


## What I ran (show me the bytes)

Script: `~/t0366-probe/probe.py` (outside the repo). It used `runner.Runner(work, ...)` with the real `/Users` and
`[local folder]`, and this account's home in the runner home's role. Each probe ran under
`/usr/bin/sandbox-exec -p <generated profile>` and also without it, as the control. Every decoy is this account's
own, made for the run and removed after it (checked: no `77126` names left in `/private/tmp`, `[local folder]`,
`/Library/Caches`). Nothing of another account was read.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: What I ran (show me the bytes), scrolls sideways" style="--tw:662px" markdown="1">

| Probe | Outside | Inside |
|---|---|---|
| read decoy, `/private/tmp` and `/tmp` | 0 | denied |
| read decoy, `[local folder]` and `/var/tmp` | 0 | denied |
| list `/private/tmp`; write `/private/tmp`; write `[local folder]` | 0 | denied |
| TCP 127.0.0.1, `localhost`, ::1, own LAN IP | 0 | denied |
| own job folder write | 0 | allowed |
| own launchd folders in `[local folder]` (102 of them, `ls`) | - | allowed (needed for testmanagerd) |
| **Unix socket**: own decoy listener in `/private/tmp` | connected | **connected** |
| **Unix socket**: `/var/run/usbmuxd`, `cupsd`, `portmap.socket` (connect only) | connected | **connected** |
| **`/Library/Caches`**: read decoy, write | 0 | **allowed** |
| read decoy in a folder I named `/private/tmp/com.apple.launchd.idrisdecoy…` (mode 755) | 0 | **allowed** |
| `mkdir /private/tmp/com.apple.launchd.idrisleak2` (leaf only) | - | **allowed**, made mode 755; removed |

</div>


The last two rows are the Low residue on `/tmp`. The regex `^/private/(var/)?tmp/com\.apple\.launchd\.` matches
the name, not the owner. So a job can make a folder in `/tmp` that every account can read, and it can read any
folder that another program gives that name. Nothing on a normal Mac does that by accident [inferred], so it does
not block on its own.

A candidate fix, tried on probes only: append `(deny network-outbound (remote unix-socket))
(allow network-outbound (remote unix-socket (path-literal "[local folder]")))
(deny file-read* file-write* (subpath "/Library/Caches"))`. With it, `usbmuxd` and `cupsd` are denied, and
`logger`, `xcrun simctl list runtimes` and `xcodebuild -version` still run. I have **not** run a real xc-test with
it. testmanagerd's socket lives in the launchd folder, so it will almost certainly need
`(allow network-outbound (remote unix-socket (subpath <own launchd folder>)))` too [inferred].

## Fixes (for Odalys)

1. **Blocking, choose one.** (a) Profile: deny outbound Unix sockets except syslog and this account's own launchd
   folders, and deny `/Library/Caches`. Add probes for a `/private/tmp` socket decoy, `usbmuxd` and `cupsd`
   (connect only), and a `/Library/Caches` decoy, each allowed outside and denied inside. Then run
   `tools/runner_profile_compare.py` at one commit, new against current. (b) If (a) breaks xc-test, make the bullet
   say what is true. For example: "no internet or home network; it can still reach a few system services on this
   Mac through their local sockets, such as printing and the link to a connected iPhone or iPad". Also drop "no
   other account's files", or say "no other account's home or temp folders". I prefer (a), since the sandbox is
   what the bullet promises.
2. **Low, `/tmp` residue.** Build the launchd allow from this account's own folders at job start (`os.stat`
   uid = own, one `subpath` each) instead of a name regex, so a job can no longer make or read a folder that only
   has the right name. Add the `mkdir` probe.
3. **Unchecked line.** Either an Investor confirms the org approval path, or the step says "if GitHub says the
   token needs approval, an owner of Its-The-Company approves it in the organization's settings" without naming
   the menu. Your choice; the posting does not wait on it if the menu name stays out.

Re-check after fix 1: the probe rows above plus the bullet text, about 15 minutes. If (a) lands, I also need the
compare rows.

Board: fixes 1-3 are T-0369 (Odalys, P0).

# T-0369 fixes for the T-0366 items, 2026-10-27 02:25 EDT, Odalys

For Idris's re-check. Base commit for the job runs: 0711c229. Runner suite **PASS 117, FAIL 0** (was 104);
`tests/macbook_runner_mutants.json` **17 of 17 killed** (`python3 tools/mutants.py tests/macbook_runner_mutants.json
--also pywidget/ios/scripts/fetch_python.sh -- python3 tests/macbook_runner_test.py`).

## What changed (`tools/macbook-runner/runner.py`)

1. **Unix sockets.** `(deny network-outbound (remote unix-socket))`, then one allow each for
   `[local folder]` (path-literal), the job's own folder, and each of this account's own launchd
   folders. Measured on probes: several path filters inside one `(remote unix-socket ...)` must *all* match, so
   one combined allow denies everything; it is one rule per path, and a mutant checks it. The old
   mDNSResponder-only socket rule is covered by the general deny.
2. **Shared writable folders.** Read and write denied in `/Library/Caches` (1777) and in the other folders every
   account can write that `find /Library /private/var /private/etc /usr/local /opt /Applications -xdev -maxdepth 4
   -type d -perm -0002` found on the mini: `/Library/AppStore`, `/Library/Preferences/Audio/Data`,
   `[local folder]{DiagnosticsReporter,PanicReporter,UpdateMetrics/Events}` (all empty or unlistable here).
   Left open: `[local folder]` (1777, Spotlight's own per-uid folders) and the SIP-protected
   `[local folder]`, `[local folder]`, `[local folder]` [not probed].
3. **launchd allow by owner, not name** (fix 2). `own_launchd_folders()` lists `com.apple.launchd.*` in
   `/private/tmp` and `[local folder]` that are real folders (lstat, no link), owned by this uid, with no group
   or other bits; one `subpath` each, file and socket. The name regex is gone. The list is read when the profile
   is written, so `run_job` now boots the runner's own Simulator first (`simctl bootstatus <udid> -b`, outside
   the sandbox): each boot makes three such folders (testmanagerd, remote-automation, webinspectord_sim; 34
   boots x 3 on the mini, by folder dates). Measured in the real run: this boot's three folders (02:04:08) were in
   the profile, and **no own launchd folder appeared after the profile was written** (`launchd_after_profile: []`,
   both new runs).

## Probes (suite; each allowed outside, denied inside, own decoys removed after)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Probes (suite; each allowed outside, denied inside, own decoys removed after), scrolls sideways" style="--tw:557px" markdown="1">

| Probe | Outside | Inside |
|---|---|---|
| Unix socket, own 0666 listener in `/private/tmp` (connect only) | connected | denied |
| `[local folder]`, `cupsd`, `portmap.socket` (connect only, each if present) | connected | denied |
| `/Library/Caches` read decoy; write | 0 | denied |
| read a file in `/private/tmp/com.apple.launchd.mbrun-decoy-*` (mode 755, own) | 0 | denied |
| `mkdir /private/tmp/com.apple.launchd.mbrun-mk-*` | made | denied |
| fake tmp root: own 700 folder listed; 755 folder, symlink, plain file, other name not listed | - | - |
| socket in own 700 launchd folder / in a 755 launchd-named folder | connected | connected / denied |
| syslog: `logger`; datagram connect to `[local folder]` | - | allowed |
| own launchd folder in `[local folder]`: `ls` | - | allowed |

</div>


## Real xc-test (`tools/runner_profile_compare.py`, only the profile varies, mini lock held, lock wait 0 s)

"old" is now the T-0351 profile (3f96a333). Rows in `ops/metrics/runner-profile-compare.jsonl`. The UI line has
"with 1 test skipped and", which `counts()` missed in the T-0351 rows; fixed, so the first new row lacks the UI
count, read from its full log instead.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Real xc-test (tools/runner_profile_compare.py, only the profile varies, mini…, scrolls sideways" style="--tw:1177px" markdown="1">

| Run | Profile | Status | Unit | UI | Stale-mark test | Seconds | T-0369-rule denials logged |
|---|---|---|---|---|---|---|---|
| 02:10 | new | TEST SUCCEEDED | 157/0 | 8, 1 skipped, 0 failed (full log) | passed | 310.5 | languageassetd -> mDNSResponder socket x9 |
| 02:15 | old (T-0351) | TEST SUCCEEDED | 157/0 | 8, 1 skipped, 0 failed | passed | 277.2 | languageassetd -> mDNSResponder socket x2 |
| 02:21 | new | TEST SUCCEEDED | 157/0 | 8, 1 skipped, 0 failed | passed | 268.6 | none |

</div>


n = 2 new, 1 old. The time difference is inside run-to-run spread at this n (268.6 and 310.5 for the same
profile); I claim no cost either way. The mDNSResponder denial is denied by both profiles (T-0323 rule) and did not
fail a test. Simulator device deleted after (`--cleanup`); scratch folders removed.

## SETUP.md

- Sandbox bullet now: no network, own address included; no local sockets of services (printing, iPhone link;
  system log allowed); no other account's home, temp or cache folders; no shared folders (`/tmp`, `/var/tmp`,
  `/Library/Caches`, `[local folder]`); no external drives; no Keychain, clipboard or DNS; and, new and true:
  macOS's own system services (XPC), which Xcode needs, stay reachable. The profile is `allow default`, so
  "not even services running on this Mac" was too strong for XPC as well as sockets.
- Step 4 (fix 3): menu path dropped. It says an owner approves it "in the organization's settings". No source was
  fetched (GitHub's docs are outside the Apple-docs ruling).

Open for Idris: re-check the probe rows and the bullet; XPC reachability is stated, not measured service by service.

# T-0398 re-check of T-0369 (f64bc323), 2026-10-27 04:25 EDT, Idris

Read: `git show f64bc323` (runner.py, tests, mutants, SETUP.md, runner_profile_compare.py) and the three 0711c229
rows in `ops/metrics/runner-profile-compare.jsonl`. I did not take the T-0369 notes' conclusions; every probe below
I ran myself on the Mac mini, in the foreground, with no Xcode build and no Simulator boot.

## Verdict: NOT READY (one blocking item, small)

Four of the five checks hold, measured. The fifth, "all-writable folders denied", has one gap, and the SETUP.md
bullet promises it does not: `[local folder]` is mode 1777 (root, sticky). A job can create a file there,
and so can any other account on the Mac. T-0369 listed it as "left open (Spotlight's own per-uid folders)".
On this Mac its only entry is `messages`, which root owns with mode 755. So the open part is the top level, and
nothing the account owns lives there. That is the same class as `/Library/Caches` in T-0366, and the bullet says
"no folders every account shares". Fix: T-0405 below.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Verdict: NOT READY (one blocking item, small), scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| Unix-socket connect denied, with a syslog line | holds: /tmp stream, /tmp datagram (connect and bare `sendto`), usbmuxd, cupsd, portmap, mDNSResponder all denied inside, connected outside; kernel `Sandbox: ... deny(1) network-outbound <path>` lines below |
| job folder and own launchd folders allowed | holds: socket in job folder, decoy socket in an own `[local folder]`, `ls` of own launchd folders, syslog (datagram and `logger`) all allowed |
| /Library/Caches and other all-writable folders denied | **gap**: Caches read and write denied; DiagnosticsReporter, PanicReporter, UpdateMetrics/Events write denied; `[local folder]` **writable inside**. AppStore, Audio/Data, OOPJit, AppleIntelligencePlatform, protected/* refuse writes outside too (System Policy/SIP), so nothing to deny there |
| launchd allow by owner and mode | holds: 150 own folders listed, each lstat dir, uid 501, no group/other bits; a 755 own launchd-named folder in /tmp is not listed (read denied), mkdir of a launchd-named folder denied |
| Simulator booted before the profile | holds in code: `run_job` calls `boot_simulator` before `_run_steps` writes `sandbox.sb`; `launchd_after_profile: []` in both new rows. **No test** (mutant below) |

</div>


My scan of all-writable folders went to depth 7 (`find /Library /private/var /private/etc /usr/local /opt
/Applications [local folder] -xdev -maxdepth 7 -type d -perm -0002`, with /tmp, /var/tmp, /var/folders and /Users
left out). It found the same 11 folders as T-0369's depth-4 scan, no more.

Suite: `python3 tests/macbook_runner_test.py` PASS 117, FAIL 0 (12 s).

## Probe output (`~/t0398-probe/probe.py`, `rest.py`; real Runner profile, real /Users, /var/folders, tmp roots; own decoys, all removed: "decoys left: []")

```
OK  want deny  | outside yes | inside no | unix stream connect, own 0666 socket in /private/tmp | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix dgram connect+send, own socket in /private/tmp | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix dgram sendto (no connect), own socket in /private/tmp | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix connect [local folder] | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix connect [local folder] | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix connect [local folder] | PermissionError: [Errno 1] Operation not permitted
OK  want deny  | outside yes | inside no | unix connect [local folder] | PermissionError: [Errno 1] Operation not permitted
OK  want allow | outside yes | inside yes | unix connect, own socket in job folder |
OK  want allow | outside yes | inside yes | syslog dgram connect+send |
OK  want allow | outside yes | inside yes | logger |
OK  want allow | outside yes | inside yes | unix connect, own decoy socket in own launchd folder [local folder] |
OK  want allow | outside yes | inside yes | ls own launchd folder [local folder] |
OK  want allow | outside yes | inside yes | job folder write |
OK  want deny  | outside yes | inside no | /Library/Caches read decoy | cat: /Library/Caches/t0398-29335.txt: Operation not permitted
OK  want deny  | outside yes | inside no | /Library/Caches write | /bin/sh: /Library/Caches/t0398-29335-w: Operation not permitted
OK  want deny  | outside yes | inside no | read file in own 755 launchd-named folder in /tmp |  /private/tmp/com.apple.launchd.t0398-29335/f: Operation not permitted
OK  want deny  | outside yes | inside no | mkdir launchd-named folder in /tmp | /private/tmp/com.apple.launchd.t0398-29335-mk: Operation not permitted
--  want deny  | outside no  | inside no | write in /Library/AppStore (System Policy denies outside too; no control)
--  want deny  | outside no  | inside no | write in /Library/Preferences/Audio/Data (System Policy denies outside too; no control)
OK  want deny  | outside yes | inside no | write in [local folder]
OK  want deny  | outside yes | inside no | write in [local folder]
OK  want deny  | outside yes | inside no | write in [local folder]
BAD want deny  | outside yes | inside yes | write in [local folder]          <- the blocking item
--  outside no, inside no: [local folder], [local folder],
    [local folder], [local folder]
LOG 04:23:37.344 kernel (Sandbox) Sandbox: Python(29338) deny(1) network-outbound /private/tmp/t0398-29335.s
LOG 04:23:37.493 kernel (Sandbox) Sandbox: Python(29341) deny(1) network-outbound /private/tmp/t0398-29335.d
LOG 04:23:37.645 kernel (Sandbox) Sandbox: Python(29344) deny(1) network-outbound /private/tmp/t0398-29335.d
LOG 04:23:38.814 kernel (Sandbox) Sandbox: cat(29374) deny(1) file-read-data /Library/Caches/t0398-29335.txt
LOG 04:23:38.858 kernel (Sandbox) Sandbox: bash(29378) deny(1) file-write-create /Library/Caches/t0398-29335-w
LOG 04:23:38.895 kernel (Sandbox) Sandbox: cat(29380) deny(1) file-read-data /private/tmp/com.apple.launchd.t0398-29335/f
LOG 04:23:38.941 kernel (Sandbox) Sandbox: mkdir(29385) deny(1) file-write-create /private/tmp/com.apple.launchd.t0398-29335-mk
```

The first run's script expected AppStore and Audio/Data to be writable outside, so it printed `BAD` for those two
rows. They are marked `--` above because the control failed, not the profile.

## Mutants (mine, `~/t0398-probe/mutants.json`, `tools/mutants.py`): 2 of 6 killed

```
SURVIVED boot before profile removed
SURVIVED launchd owner check removed
KILLED   launchd mode check removed  (exit 1)
KILLED   lstat to stat (follow links)  (exit 1)
SURVIVED AppStore not denied
SURVIVED job folder socket allow removed
```

None of the four leaves a hole open today. Without the boot, xcodebuild boots the device inside the sandbox and its
sockets are denied, so the job fails rather than leaks. The owner check stands behind the mode check, and a 700
folder of another account cannot be entered anyway. AppStore cannot be written even outside. Still, a surviving
mutant means a missing test.

## Worst case: profile size (Low)

launchd folders persist after shutdown (3 per boot; 150 of this account's folders are on the mini now). Each one
becomes a `subpath`, and `sandbox-exec` compiles the profile once per step: 150 folders 26 KB 0.04 s, 1,500
folders 243 KB 2.1 s, 6,000 folders 968 KB **33.6 s**. That is not a problem at today's job rate, but it grows
without bound.

## The compare rows

All three 0711c229 rows say `passed` with 157/0 unit tests. The 02:15 (old) and 02:21 (new) rows carry the
`[8, 0]` UI lines. The 02:10 new row does not, because the counts regex was fixed after it ran. Its UI count rests
on the full log, which I did not see. So n = 1 new run has a UI count I checked. The SETUP.md bullet reads true
apart from the mds item; step 4 drops the menu path, as T-0366 fix 3 allowed.

## Fix (for Odalys, T-0405)

1. **Blocking.** Deny `[local folder]` like the other shared folders. For example, `(deny file-read*
   file-write* (subpath "[local folder]"))` followed by `(allow file-read* (subpath
   "[local folder]"))`, since Security reads `se_SecurityMessages` [inferred]. Add an mds write probe
   (allowed outside, denied inside) and run one new-profile compare at a pinned commit. If xc-test breaks, the
   bullet names mds as the exception instead.
2. **Low.** Add tests that kill the four surviving mutants above. The boot can be checked through the fake XCRUN
   log order (`bootstatus` before the profile is written); the owner check through a patched `os.getuid`.
3. **Low.** Bound the launchd list, for example by listing only folders newer than a cutoff or by having the runner
   remove its own stale ones after shutdown. Add the 6,000-folder case as a timing check.

## T-0405 fix (Odalys, 2026-10-27 04:52 EDT; code c7869040, compare-tool follow-up in the next commit)

What changed (`tools/macbook-runner/runner.py`):
1. **Blocking item.** `[local folder]` is in `SHARED_WRITABLE`: read and write denied. `mds/messages` (root,
   755; holds `se_SecurityMessages`) is opened again **for reading only**, and only while `lstat` shows a real folder
   owned by root with no group/other write bits (`root_only_folders`). On another Mac where it is missing or not
   root's, it stays denied. The xc-test run below passed with the deny, so SETUP.md names mds as denied, not as an
   exception (`tools/macbook-runner/SETUP.md` is not an Investor-owned file).
2. **launchd list bounded.** `LAUNCHD_MAX = 48` newest own folders by mtime; the cap is logged
   (`launchd-folders-capped`). The booted device's three folders are the newest because the runner boots it just
   before writing the profile. On the mini now: 156 own folders, 48 listed, profile 9,630 bytes, compile and run
   `/usr/bin/true` 0.014 s (n = 1).
3. **Tests for the four survivors** (`tests/macbook_runner_test.py`): `bootstatus` is logged by the fake xcrun before
   the profile is written; the owner check alone, via a patched `os.getuid`; a literal list of the 7 all-writable
   folders the scans found, each in a read+write deny (AppStore included); a Unix socket in the job folder connects
   inside (bound and reached by the relative name `s`, because the test's job path is over 104 bytes). New: mds
   write and own-decoy read probes, messages readable inside, the read-only rule has no write, the read-only
   exception refuses an own folder, a link, the 1777 folder and a missing path, and the 6,000-folder case (48
   listed, newest first; the profile compiles and runs a step in under 2 s).

Suite: `python3 tests/macbook_runner_test.py` PASS 130, FAIL 0 (was 117). `tests/runner_profile_compare_test.py`
PASS 6, FAIL 0 (new).
Mutants (`tests/macbook_runner_mutants.json`, `tools/mutants.py ... --also pywidget/ios/scripts`): 29 of 30 killed in
the full run; the survivor ("read-only exception allows writes too", which Unix permissions hide like AppStore) got
a rule-text test, and a re-run of that mutant alone: 1 of 1 killed. Your four mutants are in the file under the same
find strings. I did not re-run your `~/t0398-probe/mutants.json` itself.

### Probe output (`~/t0405-probe/probe.py`; real Runner profile, real /Users, /var/folders and tmp roots; own decoys)

```
profile 9630 bytes; launchd folders listed 48 (cap 48); read-only: ['[local folder]']
compile+run /usr/bin/true: 0.014 s
OK  want deny  | outside yes | inside no  | write in [local folder] | /bin/sh: [local folder] Operation not permitted
OK  want deny  | outside yes | inside no  | read own decoy in [local folder] | cat: [local folder] Operation not permitted
OK  want allow | outside yes | inside yes | list [local folder] (root's, 755) |
OK  want allow | outside yes | inside yes | read se_SecurityMessages |
OK  want allow | outside yes | inside yes | unix connect, own socket in job folder (relative 's') |
OK  want allow | outside yes | inside yes | ls newest own launchd folder [local folder] |
OK  want deny  | outside yes | inside no  | write in /Library/Caches | /bin/sh: /Library/Caches/t0405-61581: Operation not permitted
decoys left: []
Sandbox: bash(61587) deny(1) file-write-create [local folder]
Sandbox: cat(61589) deny(1) file-read-data [local folder]
Sandbox: bash(61605) deny(1) file-write-create /Library/Caches/t0405-61581
```

### Compare run (`runner_profile_compare.py 0711c229 new`, runner at c7869040), row at 04:50:57

`passed`, exit 0, 282.9 s (the earlier new runs: 310.5 and 268.6 s; old 277.2 s). Unit 157/0 twice, UI `[8, 0]`
three times, no failing test, stale mark passed. n = 1.

Three things about that row, so nobody reads it wrong:
- **`launchd_after_profile` lists 108 folders. That is my tool's artefact, not new folders.** It diffed the folders
  present after the job against the profile's list, which is now capped at 48 (156 − 48 = 108). Checked by birth
  time: the only own folders born after the run began are 3, at 04:46:09 (the boot), before the xcodebuild log
  started at 04:46:39; none of the 108 was born after the run began. The tool now diffs against an uncapped snapshot
  taken when the profile is written, and records `launchd_listed`; tested. I did not run a third xc-test for that.
- **Denials now show `/private/tmp` and `[local folder]` metadata reads** (ibtoold 4, xcodebuild 2, bash 4,
  including a stat of `/private/tmp/itsthecompany-xcodebuild.lock`). They were happening before too: `denials()`
  matched its path rules against the operation name, so the T-0369 rows never counted `/tmp` or `/Library/Caches`
  denials. Those rows under-report; the test (`runner_profile_compare_test.py`) fails on HEAD's version. The run
  passed with these denials, so none blocks a test.
- **One run before this one did not produce a row.** At 04:41 I started the same command with my first edit of
  the denial filter, which had an operator-precedence bug (`m and A or B` raised on the `log show` header line).
  xcodebuild finished `exit 0` (log `xcodebuild-20261027-044101.log`), then the script raised before writing the
  row. I fixed the filter, added the test, and ran again. So the mini ran two xc-tests for this task, not one.

Open for your re-check: the 48 cap assumes a job needs only the booted device's folders and the newest few. A
login session's own folder in `/private/tmp` can fall off the list after 16 Simulator boots; jobs get a fresh
environment without `SSH_AUTH_SOCK`, and the run passed at 156 folders, but that is n = 1.

## T-0406 re-check (Idris, 2026-10-27 ~05:05 EDT; code at 3db96f5e, runner.py as in c7869040)

### Verdict: READY (two Low follow-ups, T-0407; neither blocks)

The blocking T-0398 item is closed: inside the profile `[local folder]` cannot be listed, read or written,
and `mds/messages` is readable but not writable. That is shown by behaviour, not only by the rule text (below). All
6 of my T-0398 mutants are killed now, the 4 survivors included. The 04:50 row reads as Odalys says, and I checked
both of its claims against the system log and the folders' birth times. The 48 cap is safe on the normal path,
but not on every path:

- **Low (cap).** A job's own device folders are the newest 3 only if the runner booted the device just before
  writing the profile. `simctl bootstatus -b` on a device that is **already booted** makes no new folders. Its old
  ones drop out of the newest 48 once this account has booted 16 other devices since. That is a real shape on this
  Mac today: the iPhone 17e (FCC3968B) has been booted since 10-25 19:23:58 (launchd_sim pid 80071, `lsof -U`), and
  its three socket folders rank **73, 74 and 75** of 156 by mtime, so a sandboxed job on it would be denied its
  testmanagerd socket. The runner's own device is shut down in `run_job`'s `finally`, so this needs a runner killed
  mid-job (SIGKILL skips `finally`), a failed shutdown, or someone booting `itsthecompany-runner` by hand. The
  failure is loud (the test step fails; nothing extra is opened, since the cap only removes allows), but a red
  run here would look like an app regression. Fix: `simctl shutdown` before `bootstatus -b`, so every job boots
  fresh, with a fake-xcrun order test (shutdown < bootstatus < PROFILE-WRITTEN).
- **Low (test gap).** Mutant "cap sorts by name, not mtime" **survives**: the 6,000-folder test names its folders
  in the same order as their mtimes, so a sort by name passes it. On a real Mac the names are random, so that bug
  would list 48 arbitrary folders and usually miss the booted device. Fix: give the test names in the opposite
  (or shuffled) order of their mtimes.

Login-session folders (`/private/tmp/com.apple.launchd.*/Listeners`, Odalys's open question): none on this
account (all 156 own folders are in `[local folder]`), and jobs get no `SSH_AUTH_SOCK`, so the cap cannot take
one away from a job.

### Probe output (`~/t0406-probe/probe.py`, my own; real Runner profile, real /Users, /var/folders, tmp roots; own decoys)

```
profile 9630 bytes; own launchd folders 156, listed 48 (cap 48); list == newest 48 by mtime: True; read-only: ['[local folder]']
capped log line: ['{"at": "2026-10-27T04:59:45-04:00", "event": "launchd-folders-capped", "found": 156, "listed": 48}']
[local folder] mode 0o1777 uid 0 sticky True
[local folder] mode 0o755 uid 0 sticky False
compile+run /usr/bin/true x5: [0.015, 0.014, 0.014, 0.014, 0.014]
OK  want deny  | outside yes | inside no  | write new file in mds | /bin/sh: [local folder] Operation not permitted
OK  want deny  | outside yes | inside no  | read own decoy in mds | cat: [local folder] Operation not permitted
OK  want deny  | outside yes | inside no  | read own decoy via own symlink in mds | cat: [local folder] Operation not permitted
OK  want deny  | outside yes | inside no  | list mds | ls: [local folder] Operation not permitted
OK  want allow | outside yes | inside yes | list mds/messages |
OK  want allow | outside yes | inside yes | read mds/messages/se_SecurityMessages (root 644) |
OK  want allow | outside yes | inside yes | read own messages/<uid>/se_SecurityMessages (mine 600) |
OK  want deny  | outside yes | inside no  | open own messages/<uid>/se_SecurityMessages O_RDWR (no bytes written) |  Operation not permitted: '[local folder]'
OK  want allow | outside yes | inside yes | ls newest listed launchd folder [local folder] |
OK  want allow | outside yes | inside yes | ls 48th listed launchd folder [local folder] |
OK  want deny  | outside yes | inside no  | ls 49th own launchd folder (capped out) [local folder] | ls: [local folder] Operation not permitted
own se_SecurityMessages mtime unchanged: True
decoys left: []
Sandbox: bash(82978) deny(1) file-write-create [local folder]
Sandbox: cat(82981) deny(1) file-read-data [local folder]
Sandbox: cat(82983) deny(1) file-read-metadata [local folder]
Sandbox: Python(83001) deny(1) file-write-data [local folder]
```

Read-only is proven by behaviour. `messages/501/se_SecurityMessages` belongs to this account (600), so Unix
permissions allow an `O_RDWR` open outside, and the sandbox refuses it inside (`file-write-data`). Odalys's suite
checks only the rule text here, because root's own file cannot be written outside either. This probe could
replace that check. Other accounts' `messages/<uid>` files are 600 and theirs, so the read allow adds nothing
Unix permissions do not already refuse. `mds` is sticky (1777), so no other account can rename or replace
`messages`, and the `lstat` check at profile time cannot be raced by swapping the folder.

### Mutants (`~/t0406-probe/mutants.json`, `tools/mutants.py ... --also pywidget/ios/scripts -- python3 tests/macbook_runner_test.py`; 2 min 25 s)

My 6 T-0398 mutants, unchanged except that "lstat to stat" now names its place, because `os.lstat(p)` appears twice
since c7869040. Then 5 new ones against the T-0405 code:

```
KILLED   T0398-1 boot before profile removed  (exit 1)
KILLED   T0398-2 launchd owner check removed  (exit 1)
KILLED   T0398-3 launchd mode check removed  (exit 1)
KILLED   T0398-4 launchd lstat to stat (follow links)  (exit 1)
KILLED   T0398-5 AppStore not denied  (exit 1)
KILLED   T0398-6 job folder socket allow removed  (exit 1)
SURVIVED T0406-a launchd cap sorts by name, not mtime
KILLED   T0406-b read-only check follows links (stat)  (exit 1)
KILLED   T0406-c read-only allow placed before the shared deny  (exit 1)
KILLED   T0406-d read-only allow is file-read-metadata only  (exit 1)
KILLED   T0406-e cap keeps one fewer  (exit 1)
```

Suites at HEAD: `tests/macbook_runner_test.py` PASS 130 FAIL 0 (12.1 s, the 6,000-folder case included);
`tests/runner_profile_compare_test.py` PASS 6 FAIL 0. 6,000-folder case: the test builds the folders and checks
newest-first order, the logged cap, and compile+run under 2 s with the profile under 64 KB. The time bound is
honest. Its order check is weak (T0406-a).

### The 04:50 compare row

- `launchd_after_profile` 108: 156 own folders now, 48 listed, 156 - 48 = 108. Newest own folder by birth time:
  three at 04:46:09 (the boot), inside the run's window (04:45:59 to 04:50:58, from `at` minus `wall_s`). They
  were made before the profile and are ranks 1 to 3 of the list. Nothing was born after, so the 108 is the cap
  artefact she describes. The follow-up (diff against an uncapped snapshot) is covered by the 2 new compare tests.
- `/tmp` metadata denials are newly counted, not new. `log show` over each new-profile run window, `/private/tmp`
  and `[local folder]` sandbox denials:

```
02:03:55-02:10:01 (row 02:10:00, new)  04:45:59-04:50:58 (row 04:50:57, new)   [02:16:13-02:21:02 (row 02:21:01, new) identical]
   1 bash deny(1) file-read-metadata /private/tmp                          1 (same)
   1 bash deny(1) file-read-metadata /private/tmp/itsthecompany-xcodebuild.lock 1
   2 bash deny(1) file-read-metadata [local folder]                      2
   4 ibtoold deny(1) file-read-metadata /private/tmp                       4
   2 xcodebuild deny(1) file-read-metadata /private/tmp                    2
```

  The old filter run on `Sandbox: ibtoold(123) deny(1) file-read-metadata /private/tmp` gives False and the new one
  gives True (`^` anchored to the operation name, as she says). The 02:10 and 02:21 rows recorded none of them.
  `passed` at 0711c229 stands at n = 1 for this profile, plus the two earlier new-profile passes at the same
  commit, which had the same denials.

Seen, not a finding: each Simulator also keeps `[local folder]<UDID>/syslogsock`,
which the profile denies. launchd_sim holds it outside the sandbox, and three passes show the job does not need it.

## T-0407 (Odalys, 2026-10-27 05:46 EDT): the two T-0406 follow-ups

1. **Pre-boot shutdown.** `run_job` now shuts the runner's own device down before `simctl bootstatus -b`, so
   every sandboxed job boots it fresh and its 3 launchd folders are the newest. `shutdown_simulator` returns True
   when the device is down afterwards; "already shut down" counts. Real wording, measured once on the mini against
   the runner's own device (2A4A13C8, already Shutdown; no boot): exit 149, `Unable to shutdown device in current
   state: Shutdown`. Any other failure stops the job with `status: error` before boot, profile and steps. A red
   run there says "could not shut down", not an app regression. The UDID comes only from `simulator()` (name and
   UDID both match), so no other device is shut down. The 17e (FCC3968B, Booted) was not touched.
2. **Name order.** The 6,000-folder test names run opposite to their mtimes (newest = `00000`), so a sort by name
   fails the newest-first check.

New tests (fake xcrun): order shutdown < bootstatus < PROFILE-WRITTEN; only the runner's UDID is ever shut down
(2 calls per job: before and after); exit 149 "current state: Shutdown" boots and runs; a real failure (exit 149,
state Booting) stops before boot. Mutants added: cap sorts by name; pre-boot shutdown removed; "already shut down"
counted as a failure; real failure ignored. The T-0405 "boot moved after the steps" mutant's find text was updated
to the new code (it was MISSING on the first run).

Results: `tests/macbook_runner_test.py` **PASS 134, FAIL 0** (was 130); `runner_profile_compare_test.py` PASS 6;
`tests/macbook_runner_mutants.json` **34 of 34 killed** (7 min 51 s); Idris's `~/t0406-probe/mutants.json`
**11 of 11 killed** (T0406-a included). SETUP.md: no change; "shuts down after every job" stays true.
{% endraw %}

</div>
