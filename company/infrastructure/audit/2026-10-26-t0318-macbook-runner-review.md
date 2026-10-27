---
layout: "default"
title: "T-0318: C13 review of the MacBook job runner (T-0304)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/2026-10-26-t0318-macbook-runner-review.md</code></span><span>2026-10-26</span></div><h1>T-0318: C13 review of the MacBook job runner (T-0304)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Reviewer: Idris. Author: Odalys. Reviewed: 2643a84c (tools/macbook-runner/runner.py, kinds.json, install.sh,
SETUP.md, tools/jobs.py, tests/macbook_runner_test.py) and the first job f206a07a
(ops/jobs/J-20261026-2134-xc-test.json). 2026-10-26 21:35-21:55 ET. I read the code, not the notes.

## Verdict

**SETUP.md may not be posted to the Investors yet.** The runner code is careful, and the commit pin, the
allowlist, the time limit and Pause all work as written (tests rerun here: PASS 63, FAIL 0). The fault is the
promise. SETUP.md tells the Investors the sandbox "stops the job from reading or writing anything else in your
home folder ... and from reaching the internet". I ran the generated profile on the Mac mini, and that is not
true. The part outside the sandbox, the Simulator and the test host, has the full reach of the Investor's user
account. Every commit on `main` runs on their personal machine within 2 minutes, with no person in between.
Commandment 2 says we must not access the Investors' personal files. A design where that depends on no bad
commit ever reaching `main` is not good enough on their own laptop. The fix (B1) is a one-time separate macOS
user account, which makes the boundary the operating system's, not ours.

## What I ran (show me the bytes)

`Runner('/tmp/t0318/work', 'x', protect='/tmp/t0318/fakehome').profile(...)` written to /tmp/t0318/p.sb, then
each probe under `/usr/bin/sandbox-exec -f p.sb` on the Mac mini (no runner, no repository, no network push):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran (show me the bytes), scrolls sideways" data-n="1" style="--tw:692px" markdown="1">

| # | Probe | Result |
|---|---|---|
| 1 | read a file in the protected home | denied (good) |
| 10 | list the protected home | denied (good) |
| 11 | `stat` a file in the protected home | allowed (prints its size: names and sizes leak) |
| 5 | TCP connect to 1.1.1.1:80 | denied (good) |
| 4 | DNS lookup `example.com` (getaddrinfo) | **allowed**: answer returned, through mDNSResponder |
| 2 | read a file in the user's own temp folder (`getconf DARWIN_USER_TEMP_DIR`, [local folder]) | **allowed** |
| 3 | create a file in `~/Library/Developer/Xcode/UserData` | **allowed** |
| 6 | `pbpaste` (clipboard) | **allowed**, exit 0 |
| 7 | `lsappinfo front` (LaunchServices) | **allowed**, so `open <url or app>` is reachable [inferred, not run] |
| 8, 9 | list `/Volumes`, `[local folder]` | **allowed** (an external drive mounts under /Volumes) |

</div>


The last 60 lines of output are pushed to GitHub, so anything a job can read can reach the company through the
summary, even without network.

## Findings

### B1. Blocker: the isolation SETUP.md promises is not what the job gets

- The Simulator, the test host app and the XCTest bundle are started by launchd services (CoreSimulatorService,
  testmanagerd) outside the sandbox. They run as the Investor's user, with network, and can read whatever that
  user can outside the TCC-protected folders: `~/.ssh`, `~/.config` (gh's `hosts.yml` if it ever fell back to
  file storage), `~/.aws`, shell history, other projects. [recalled: iOS Simulator processes are plain macOS
  processes and can open host paths; not run on this Mac]. SETUP.md's "one limit, stated plainly" says they run
  outside the sandbox, but not what that means.
- The sandboxed part leaks too (table above): DNS as a channel out, the clipboard, LaunchServices (`open`
  starts an app outside the sandbox), the user's /var/folders caches and temp files, external volumes, and write
  access to all of `~/Library/Developer` (the Investor's own DerivedData, Archives, Simulator data, Xcode
  UserData) and to `com.apple.dt.*` preferences.
- A sandboxed job that tries Apple Events or a TCC-protected folder through an outside helper can raise a macOS
  permission prompt on the Investor's screen. That breaks "never asks for any macOS permission" [inferred].

**Fix (preferred):** run the runner as its own standard macOS user (System Settings > Users & Groups > Add
User, Standard, e.g. "itsthecompany-runner"; the Investor logs in once, runs the install there, and leaves the
account logged in under fast user switching). Its files are unreadable by the Investor's account and the
reverse; Simulators, Keychain, clipboard and TCC are per user; Xcode in /Applications and the brew tools are
shared read-only. The sandbox stays as a second layer. SETUP.md then says plainly: "Jobs run in a separate
account on your Mac that cannot open your files." The setup gets about 5 minutes longer, and it needs the
Investor's admin password once, for their own action in System Settings. Reword "never asks for a password" to
"the runner itself never asks for one".
**Fix (if the Investors decline a second account):** SETUP.md must say exactly what the Simulator path can
reach, in one plain sentence, and the Investors choose with that in front of them; plus all of H2.

### B2. Blocker: SETUP.md tells the Investor to erase every Simulator on the Mac, and the runner uses theirs

`Runner.simulator()` picks the highest-sorting existing iPhone Simulator, which is likely the one the Investor
uses for their own projects. Our app and UI tests then run on it. SETUP.md's uninstall says
`xcrun simctl erase all`, which wipes every Simulator's data, including theirs.
**Fix:** at install (or on first job), the runner creates its own device (`xcrun simctl create
itsthecompany-runner "iPhone 16" <runtime>`), keeps its UDID in config.json, and uses only that. Uninstall
runs `xcrun simctl delete <that udid>`. Remove `erase all` from SETUP.md. Add a test where a fake simctl lists
an Investor device and the runner must not choose it.

### H1. High: the one network step runs repository code

kinds.json allows network for `scripts/fetch_python.sh` at the pinned commit. The allowlist fixes the path, not
the content: any commit on `main` can change that script and get open network, plus every read in B1/H2.
**Fix:** the runner downloads the file itself, from a URL and sha256 written in the installed kinds.json
(`{"fetch": {"url": ..., "sha256": ..., "to": "{CACHE}/..."}}`), and checks the hash. No repository code runs
with network. A new Python version is then a runner update, which is right: it changes what the MacBook
downloads.

### H2. High: narrow the sandbox profile, measured on the Mac mini

Add, then rerun the xc-test job on the Mac mini under the sandbox with deny logging (`log stream --predicate
'sender=="Sandbox"'`) and keep only what it needs:
- `(deny file-read-metadata (subpath home))` beside the read-data deny, except the allowed folders;
- deny file-read and file-write on `/Volumes`, `[local folder]` and the user's `DARWIN_USER_CACHE_DIR`; the job's
  TMPDIR is already its own folder;
- deny mach-lookup `com.apple.pasteboard.1`, `com.apple.coreservices.launchservicesd`, `com.apple.dnssd.service`
  and `com.apple.mDNSResponder` in the steps without network, if xcodebuild runs without them [unmeasured];
- narrow `~/Library/Developer` to `CoreSimulator` and `Xcode/iOS DeviceSupport` (read) and whatever the deny
  log shows; the job's DerivedData is already in its own folder. No writes to `com.apple.dt.*` preferences
  unless the log shows a need.
Keep my probe table as a test (tests/macbook_runner_test.py, sandbox section): each probe must be denied. With
B1 in place this becomes defence in depth, not the only wall.

### H3. High: the Investor's gh sign-in is a key to all their repositories

`gh auth git-credential` hands git the Investor's gh OAuth token. gh's default scopes (`repo`, `read:org`,
`gist`, often `workflow`) [recalled] give read and write on every repository their account can reach, not just
ours. The runner process uses it only to fetch and to push `macbook-results`, and the sandboxed job cannot
reach it (Keychain services and the home folder are denied). The Simulator path can, though, by running
`/opt/homebrew/bin/gh auth token` [inferred]. SETUP.md doesn't say any of this.
**Fix:** in the runner account (B1), sign in to gh with a fine-grained personal access token limited to
Its-The-Company/itsthecompany, with Contents: read and write and nothing else (GitHub > Settings > Developer
settings > Fine-grained tokens; free; about 2 minutes). Then `gh auth login --with-token`. SETUP.md says in one
line what the token can do. Better still, but later: branch protection so this token can push only
`macbook-results`.

### M1. Medium: Stop and Uninstall do not stop a running job

Jobs start in a new session (`start_new_session=True`), and runner.py has no SIGTERM handler. `launchctl
bootout` ends runner.py, but xcodebuild can keep running for up to the 90-minute limit [recalled: launchd
kills the job's process group, and these are outside it]. `--uninstall` then deletes the folder under a live
build. **Fix:** a SIGTERM handler that `killpg`s the current job and shuts down the runner's Simulator before
it exits. Have install.sh `--stop`/`--uninstall` wait for the lock (`runner.lock`) to free, up to 30 s. Add a
test that stops the runner mid-job and checks that no child is left.

### M2. Medium: a timeout or failure leaves the Simulator booted

The Simulator and the test host are not in the job's process group, so `killpg` at the limit leaves them
running, using memory on the Investor's laptop. **Fix:** in a `finally` after every job, run `xcrun simctl
shutdown <runner udid>` (B2's device) and log it.

### M3. Medium: job folders are never deleted

Each job keeps `jobs/<id>/src` and `derived` (DerivedData, gigabytes for a Simulator test build with the Python
framework) [size not measured]. Near-24/7 use will fill the Investor's disk. **Fix:** after the result is
pushed, delete `src` and `derived`, keep `output.log`, and keep at most the last 20 job folders. Log free disk
space in the check-in, and refuse to start a job below 30 GB free.

### M4. Medium: SETUP.md, fix before posting

- It names a "Pause button on the site" and a check-in "on the site (Home > Issues, MacBook)". Neither exists
  yet (T-0319 is open). Say "coming soon", or leave them out until T-0319 ships; until then, the way to check
  it worked is `tail -3 ~/itsthecompany-runner/runner.log`.
- Step 2 assumes Homebrew. For a non-engineer, give the one-line Homebrew install, and say it asks for their
  Mac password, which is their own install and not the runner.
- If Homebrew put the Command Line Tools in first, `xcodebuild` points at them and install.sh's "open Xcode
  once" won't fix it. Add: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` [recalled].
- Say what `gh auth login` will ask, and which answers to give (GitHub.com, HTTPS, browser), or switch to the
  token of H3.
- State the time honestly: about 15 minutes of steps, plus the Xcode and iOS Simulator downloads (several GB;
  an hour on a slow line).
- One sentence on what the token can do (H3), and on what the Simulator path can reach (B1).

### L1. Low: git network calls have no timeout

A hung fetch or push holds `runner.lock`, and the runner goes silent. **Fix:** `timeout=300` on the
`subprocess.run` calls in `git()` and `sync()`. The stale check-in alarm (T-0320) covers detection.

### L2. Low: battery and load are checked only at start

A job keeps running for up to 90 minutes after the laptop is unplugged. **Fix:** check `pmset` every 60 s while
a job runs; on battery, stop the job and post `status: "deferred"` with no result.json, so it runs again later.
Or at least say in SETUP.md that a running job finishes.

### L3. Low: `ProcessType Background` may hold jobs to the efficiency cores [recalled]

That could make the run much slower than the 253 s measured on the Mac mini. Compare the first job's seconds;
if it is over 2x, try `ProcessType Standard` with `Nice 10`.

### L4. Low: a check-in commit every 30 minutes, forever

That is about 48 commits a day on `macbook-results`. Fine for now; push a check-in only on a status change plus
once every 6 hours, and keep the "at" time in the commit.

### L5. Low: `ls-tree --name-only` output is split on whitespace

A file name with a space becomes two names. It is harmless today (each gets refused or skipped). Use `-z` and
split on NUL.

## Passes (checked in the code)

- **Pinned commit, allowlisted commands.** The job needs a full 40-character sha (`SHA_RE`), `merge-base
  --is-ancestor <sha> main` against a mirror fetched only from our remote, and a command from the *installed*
  kinds.json, so the repository cannot add one. The job id regex blocks path tricks, the file name must match
  the id, and kinds need local approval in config.json. One note: the allowlist fixes the entry point, not the
  code. `xc.sh`, `project.yml` build phases and every test are repository code at that commit. That is
  inherent in "run our tests", and it is why B1 matters.
- **Time limits.** `time_limit_s` is 60 up to the installed command's maximum (5400 s), and covers the pre-steps
  too. At the limit the job's process group gets SIGTERM, then SIGKILL after 10 s, and status is `timeout`.
  Caveats in M1 and M2.
- **Results.** Commits are built on a private index (`GIT_INDEX_FILE`), pushed only to
  `refs/heads/macbook-results`, with a fetch-and-retry loop. The credential helper is set on the mirror only, and
  the Investor's git config is untouched. Paths and the user name are scrubbed from the summary.
- **Pause.** The local `PAUSE` file and `ops/jobs/pause.json` on `main` are both checked before any job is
  picked, and both are tested (lines 253-264). A running job finishes, as SETUP.md says.
- **`-Xfrontend -disable-sandbox`.** This turns off the sandbox swift-frontend puts around macro plugin
  processes (`#Preview`, `@Observable` and the like). Without it, the nested `sandbox_apply` is refused inside
  sandbox-exec, as Odalys saw. The plugins still run inside the runner's sandbox, which they inherit. That
  sandbox is looser than Swift's (it allows writes to the job folder, cache and Xcode folders), but still bounded.
  Acceptable. Once H2 narrows the profile, the difference shrinks.
- **Uninstall** removes the LaunchAgent plist and `~/itsthecompany-runner`. It leaves the Investor's own Xcode,
  brew tools and gh sign-in (right), plus the Simulator data (B2) and a live job (M1).
- **Python 3.9.** runner.py compiles under macOS's `/usr/bin/python3` (3.9.6), which the plist uses.

## Board

T-0323 (Odalys, P0): B1, B2, H1, H3 and the M4 SETUP.md text, then a re-review by Idris before posting.
T-0324 (Odalys, P1): H2 with the probe test, M1, M2, M3, L1, L2. The queued job f206a07a must not run on the
MacBook before T-0323 is done; it can't, because SETUP.md hasn't been posted.
{% endraw %}

</div>
