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
{% endraw %}

</div>
