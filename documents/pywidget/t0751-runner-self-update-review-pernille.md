---
layout: "default"
title: "T-0754: review of T-0751, MacBook runner self-update (commit 65869142)"
section: "documents"
description: "The swap itself is sound. The release is staged in a temp folder inside releases/, renamed into place, and both links are replaced with symlink + os.replace. Only 6 named paths come out of git archive, all regular\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0751-runner-self-update-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0751-runner-self-update-review-pernille.md</code></span></div><h1>T-0754: review of T-0751, MacBook runner self-update (commit 65869142)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Author: Odalys. Date: 2026-10-29.
Read: `git show 65869142`, `tools/macbook-runner/` as it stands (runner.py, launch.py, install.sh, kinds.json,
VERSION), `tests/macbook_runner_update_test.py`. Judged on code and tests only.

## Runs (foreground, /usr/bin/python3 3.9.6, nothing left running)

- `tests/macbook_runner_update_test.py`: PASS 46 FAIL 0 (20 s).
- `tests/macbook_runner_test.py`: PASS 143 FAIL 0. Side effect on the Mac mini: it stopped `ibtoold` pid 701
  (its own T-0343 cleanup). That suite already did this before the commit. Noted here, not counted against T-0751.
- My probe (`/tmp/pernille-probe/probe_offline.py`, a copy of the update test with one step added, not committed):
  after a good v4 is installed, the fake origin is moved away for exactly one poll. Result: `exit 1`, bin is back
  on `v3-install-1`, `blocked` = `4`, last event `rolled-back`. With the origin back, the next poll stays on 3 and
  `blocked` stays `4`. So one offline poll throws away a good release for good.

## Verdict

The swap itself is sound. The release is staged in a temp folder inside `releases/`, renamed into place,
and both links are replaced with symlink + `os.replace`. Only 6 named paths come out of `git archive`, all
regular files, with a 4 MB <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>. `launch.py` sits outside every release and only `install.sh` writes it.
The kind <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> works and is tested. The off switch and both Pauses hold. Nothing outside `<work>` is
touched. But the rollback only covers one failure mode (the first poll exits non-zero), and it confuses a
bad network with a bad release. The "same sandbox rules" requirement is not enforced. Four Medium
findings, so T-0751 is not ticked. The fix line is T-0755.

## Medium

**M1. A temporary failure on the new version's first poll rolls back a good release and blocks its VERSION
for good (probed).** `once()` runs `sync()` before `confirm_update()`. A failed fetch raises, so the runner exits 1,
and `launch.py after_poll` takes any non-zero exit as "new version broken". It then rolls back and sets
`blocked`. On a laptop, the update poll followed by a lid-close and a wake without Wi-Fi is the normal case,
not an edge case. The same happens if the confirming check-in push fails. `maybe_update` also sets `blocked` on
a temporary `git archive` timeout. Recovery is to bump VERSION on main, so the machine is not bricked. But the
company loses the release and sees "rolled back" for something that was never broken.
Fix: count a failure as the release's fault only after `sync()` succeeded. For example, the runner exits with a
distinct code (75) when sync or push fails, and launch.py counts that as an unconfirmed poll (towards the 3),
not a failure. Only set `blocked` on a refusal from py_compile, plutil or the self-test, never on a timeout.
Add a test: origin unreachable for the first poll, then the same release confirms.

**M2. A new version that hangs on its first poll is never rolled back.** `launch.py` calls `subprocess.run(...)`
with no timeout, and launchd does not start another copy while that one runs. If a release blocks before it
confirms (a network call without a timeout, a lock it never gets, an infinite loop), launch.py never reaches
`after_poll`. The runner is then dead until an Investor acts. This is exactly the "brick with no rollback" case.
Fix: when `state.update.pending` names the release about to run, launch.py waits with a deadline. Confirmation
happens before any job, so a few minutes is enough (for example 2 x NET_TIMEOUT_S + 60 s). If `pending` has not
cleared by then, it <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the process group and rolls back. Add a test with a patched `once` that sleeps.

**M3. "Same sandbox rules" is not enforced: an update can change the job sandbox without anyone approving it.**
The only sandbox check in `self_test` is that the profile contains `(deny network-outbound (remote ip))` and
compiles. A release that adds `(allow file-read* (subpath HOME))` or drops the Keychain deny passes every check
and goes live. T-0751 asks for "same sandbox rules, no new access". Before this commit an Investor saw every
runner.py change when they reinstalled. Now nobody does. New job kinds have a gate. The sandbox has none.
Fix: use the kind-hold mechanism for the sandbox too. The new release's `self-test` prints its profile for a
fixed job folder under the scratch work. The old runner builds its own profile for the same folder. If the two
differ, the update is held and the check-in shows `sandbox_pending_approval` with a short diff. It goes ahead
only after an Investor runs `runner.py approve-sandbox <sha256>`. Test it with a release that adds one allow rule.
For the Investors: the runner's own unsandboxed code (sync, fetch, push) still comes from main once self-update
is on. The real wall around that code is the runner's own macOS account, not anything this update checks.
The Investors should know that when they re-install, and SETUP.md should say it in one sentence.

**M4. Confirmation proves the check-in, not the update path, so a release can lock itself in.** A release counts
as confirmed once it pushes one check-in. If that release's `maybe_update` or `stage_release` is broken (a typo
in a path, a wrong VERSION comparison), it confirms and runs jobs normally. After that it can never install
the release that fixes it. Getting out needs an Investor (`launch.py --rollback`, or a reinstall), which breaks
"after that install no runner fix needs them".
Fix: the old runner checks the candidate's update path before the swap. The candidate's `self-test` takes
`--mirror` and stages a release from the mirror's main into its scratch folder with its own
`stage_release` + `check_release` (git archive is read-only on the mirror). It must report the VERSION it
found. Add a test with a release whose `maybe_update` returns None: it must be refused.

## Low

**L1. `pending` is saved after the swap.** In `maybe_update`, `point("bin", final)` runs before
`save_state(st)` records `pending`. If the process dies between the two (power loss, kill at the time limit),
the new release runs with no `pending` entry, so launch.py never protects it. Fix: save `pending` (with
`release`) first, then swap. `after_poll` already ignores a `pending` whose release is not the one that ran.

**L2. Changing the off switch writes config.json in place.** `self-update off|on` opens config.json with "w"
and dumps into it, and `Runner.__init__` catches only FileNotFoundError. A torn write leaves a JSONDecodeError
on every poll, so the runner stops. That fails closed (no update, no job), but it is a dead runner. Fix: write
to a temp file and `os.replace` it, as `save_state` already does.

**L3. Within approved kinds, an update now changes commands and `fetch` URLs on its own.** Before this commit,
kinds.json changes reached the MacBook only when an Investor reinstalled. Now a new command in an existing kind,
a changed argv, or a new `fetch` URL arrives with the update. The argv steps still run in the job sandbox, and a
fetch is https into the cache with a pinned sha256, so I do not count this as wider access. It is still a change
the Investors should hear about once. One line in SETUP.md, "Updates", covers it.

**L4. Test gaps.** Every poll runs with `--no-sandbox`. The sandbox appears only as the profile compile inside
`self-test`. `install.sh` is checked with grep and `bash -n` but never run, so its pre-T-0751 migration
(`rm -r bin` folder, `ln -sfn`, `record-install`) is not executed by any test. The fake HOME and fake origin are
real: HOME is set in the environment, `protect` resolves to it, the origin is a bare repo in the temp folder,
and the files outside `<work>` are hashed before and after. Running install.sh against a fake HOME with a stub
`launchctl` on PATH would close the migration gap.

## Checked and fine

- Half-copied files: impossible. The stage folder is renamed whole, the links change by `os.replace`, and failed
  stages are removed (tested: no `.stage-`/`.check-` left over).
- launch.py path: the LaunchAgent runs `<work>/launch.py`, which no update writes. `--rollback` works by hand
  (tested). After one rollback, a second is refused because bin already equals previous. That is correct.
- Blocked version: only that exact VERSION is skipped; a higher one is tried. `record-install` clears it.
- No new access in the update code: it reads only the mirror the runner already fetches (`git show`/`archive`
  on main). It writes only `<work>/releases`, `bin`, `previous` and `state.json`. Jobs cannot reach these files
  because the profile denies the home folder except the job folder and the cache.
- New kinds: held, with the old kinds.json kept and `kinds_pending_approval` in the check-in. They are installed
  only after `approve-kind` (tested).
- Off switch: the installed version checks it before any staging. Off survives updates because config.json is
  not part of a release (tested). Local PAUSE and the site Pause both hold updates (`maybe_update` runs after
  `paused()`). Local PAUSE is tested; the site Pause follows from the same code path.

# Re-review of aaf46f82 (T-0765)

Reviewer: Pernille. Author: Odalys. Date: 2026-10-30. Read: `git show aaf46f82 fdbb619d`, `launch.py`, the
changed parts of `runner.py` and the parts they call (`sync`, `push_files`, `checkin`, `profile`, `run_job`,
`machine`, simulator calls), and `tests/macbook_runner_update_test.py`. Judged on the code and tests only.

## Runs (foreground, /usr/bin/python3 3.9.6, `pgrep -x xcodebuild` empty before each)

- `tests/macbook_runner_update_test.py`: PASS 76 FAIL 0 (53 s).
- `tests/macbook_runner_test.py`: PASS 143 FAIL 0. As before, it stopped `ibtoold` pid 701 (its T-0343 cleanup).
- Mutants: `tests/macbook_runner_update_mutants.json` (new, 9) through `tools/mutants.py` on a throwaway copy.
  All 9 KILLED: M1 exit 75 counted as a failure; M1 TempFail exits 1; M1 first transient rollback blocks; M1
  archive timeout not transient; M2 hung first poll not stopped; M3 changed sandbox counts as unchanged; M3
  changed sandbox installs without approval; M4 self-test without `--mirror`; L1 pending saved after the swap.
  The M2 mutant leaves its sleeping runner behind, as it should. I killed it (one pid) after the run.
- Probe (`/tmp/pernille-probe/probe_m3.py`, the test harness plus one step, not committed): a release adding one
  allow rule is held with sha256 `1d6dcc43...`. Then three folders `/private/tmp/com.apple.launchd.pernilleprobe0..2`
  are created (mode 700, mine), which is what one Simulator boot does. Then `approve-sandbox 1d6dcc43...`, then
  a poll. Result: not installed. Held again with sha256 `d2be640d...`. The "added" diff is the same one rule.
  I removed the folders afterwards.

## Verdict

M1, M2 (as written), M4, L1 and L2 are fixed and tested. Each M1/M2/M3/M4/L1 test fails when its code is
broken. I found no path that swaps in a sandbox or code nobody approved. A changed profile is always held. The
held state only clears on the exact sha256 or a reinstall. A rollback cannot loop: the first transient rollback
of a VERSION sets `retry`, the second blocks it, and a refusal blocks at once. Two Medium findings remain, so
the runner is **not** ready for the Investors' re-install yet. The fix line is T-0766.

## Medium

**R1. The approval sha256 covers machine state that changes between jobs, so an Investor's approval goes stale
(probed).** `runner.py:798-805`: the profile lists this account's newest launchd folders in /tmp. Every
Simulator boot makes three new ones (T-0407, `runner.py:955`), and so does every login. `runner.py:620` hashes
that text as it is. While an update is held, the old version keeps running jobs. So any xc-test job, or a
reboot, between the check-in and `approve-sandbox` changes the sha256. The next poll then holds the release again
under a new one (probe above). The fix that needs a sandbox change can wait as long as jobs keep coming, and the
Investor is asked again with the same one-line diff. It fails closed, so no access leaks. But it breaks M3's
promise of one approval per change.
Fix: build the compared profile from fixed inputs on both sides. In the self-test (`runner.py:1195`) and for
"ours" (`runner.py:721`), set `own_launchd_folders` to one placeholder folder (and keep `PLACEHOLDER` for the
scratch path), then compare and hash that. Test: the probe above. Create launchd-named folders between the hold
and the approval, and the approved sha256 must install. Also key the hold (`runner.py:550-553`) on the
release's file contents (for example `git rev-parse <commit>:tools/macbook-runner` plus the xc_helpers.py blob),
not on the main commit. Today every company commit makes a held release go through a full stage and two
self-tests again on the next poll.

**R2. After the first poll confirms, nothing limits a poll, so one hung call stops the runner for good.**
`launch.py:184` runs every confirmed poll with no timeout. launchd does not start another while it runs. Calls on
the poll path with no timeout: `xcodebuild -version` in every check-in (`runner.py:1072`, via `checkin`); simctl
`list`/`create`/`shutdown` (`runner.py:833, 841, 855, 879`); `pmset` (`runner.py:399`); `tar -x` and the job's
`git archive` (`runner.py:942-946`). Job steps themselves are timed. CoreSimulator is known to wedge `simctl`. If
any of these blocks, no later poll runs, so no self-update can bring the fix. That is the same brick M2 was
about, only after confirmation instead of before. The test "a confirmed version's poll is not under the
deadline" asserts this gap rather than closing it.
Fix: (a) give each of those calls a timeout (simctl and xcodebuild 120 s, pmset/getconf 30 s, tar and git archive
`NET_TIMEOUT_S`). On a timeout, the job ends as an error or the check-in field is left empty. (b) launch.py
puts every poll under a ceiling: the largest `max_time_limit_s` in `bin/kinds.json` plus 30 min (simulator boot
600 s, fetches, push). At the ceiling it kills the group the same way and logs `poll-stopped`. No rollback
once the release is confirmed: the next poll's `maybe_update` can then install the fix. Test: a release
whose `machine()` sleeps after confirming is stopped at a small `--poll-ceiling`, and the next poll runs.

## Low

**R3. The first-poll deadline is shorter than the poll's own network limits.** `launch.py:27`: 2 x 300 + 60 s.
But `sync` makes two git network calls (`runner.py:354-357`), and the confirming check-in push makes a third
(up to 4 tries, `runner.py:409-447`). A slow network that still works can get a good release killed as
"hung". Bounded: the first time is only a retry, and it takes two slow first polls to block it. Fix:
`3 * NET_TIMEOUT_S + 120`, or count a deadline kill that came after a TempFail log line as an offline poll.

**R4. M4 checks the update path from VERSION 0 (`runner.py:1153`).** It catches a `maybe_update` that does nothing
(tested). It misses a comparison that only breaks one step up (for example a string compare, "10" vs "9").
Fix: `running_version = str(int(VERSION) - 1)`, which is the real case.

**R5. The sandbox compared is the one the self-test chooses to print (`runner.py:1195`), not the one `_run_steps`
writes (`runner.py:1018`).** Today they are the same call, `profile(job_dir)`. If `profile` ever takes the
command or the Simulator, rules that apply to one kind only would not be compared. Fix when that happens: one
helper used by both, printed per command. As SETUP.md now says, the self-test is the candidate's own code, so
this is a check against honest mistakes. The wall is the runner's account.

**L4 (from T-0754) is still open:** install.sh is never run by a test.

## Checked and fine

- M1: `sync` and the push raise `TempFail`, `once` exits 75, and `after_poll` counts 75 as an unconfirmed poll
  (`offline_polls`). Three offline polls give a transient rollback that does not block, and the old version
  re-installs the release once it syncs (tested). An archive or self-test timeout defers the release. It is
  refused only after 3 in a row (tested). A buggy `sync` that raises `RuntimeError` is also called transient,
  but `retry` bounds that at two cycles.
- M2: the release runs in its own session. At the deadline the group gets TERM, then KILL, then a transient
  rollback; a second hang blocks it (tested, the pid is dead). The deadline applies only while `pending` names the
  running release, so jobs never run under it. launchd's TERM to launch.py stops the group too.
- M3: a held sandbox is not staged again on the same commit. A wrong sha256 keeps it held. The exact one
  installs it, and the check-in shows `sandbox_pending_approval` with the added and removed rules (tested). A
  candidate that prints no profile is refused. An error building our own profile ends that poll before any
  swap. Neither one passes.
- M4: the candidate stages main from a read-only mirror inside its scratch folder. The mirror's `main` is
  unchanged (tested), and a `maybe_update` that returns None is refused before any swap.
- L1: `pending` is written before `bin` moves. A pending entry for a release that is not running is ignored
  (tested with a kill between the two). L2: `write_config` uses a temp file, fsync and rename for all four
  setters (tested by inode).
- SETUP.md now says that runner code comes from main and that the account is the wall (M3 note and L3 line).

# Re-review of 39439a9d (T-0767)

Reviewer: Pernille. Author: Odalys. Date: 2026-10-30. Read: `git show 39439a9d` (launch.py, runner.py, SETUP.md,
the new tests and mutants), plus the code it touches (`own_launchd_folders`, `profile`, `stage_release`,
`self_test`, `once`, `_run_steps`, `push_files`, `queued`). Judged on the code, tests and my own runs only.

## Runs (foreground or waited on, /usr/bin/python3 3.9.6, `pgrep -x xcodebuild` empty before each)

- `tests/macbook_runner_update_test.py`: PASS 100 FAIL 0 (103 s).
- `tests/macbook_runner_test.py`: PASS 143 FAIL 0. It stopped `ibtoold` pid 701 again (T-0343 cleanup).
- Mutants: the 15 in `tests/macbook_runner_update_mutants.json` through `tools/mutants.py`, in four chunks:
  all 15 KILLED (M1 x4, M2, M3 x2, M4, L1, and the six T-0766 ones for R1 x2, R2 x2, R3, R4). The
  repo was never mutated (`git status` clean for tools/ and tests/ after each chunk). Two of mine for R1 (in `/tmp/pernille-probe/t0767/mut_3.json`, not committed):
  "ours reads this Mac's /tmp" (the old side of the comparison, which Odalys's R1 mutant does not touch) and
  "the fixture is the real /tmp on both sides": both KILLED. The R1 tests catch a
  comparison that reads the real /tmp on either side.
- R1 probe: my T-0765 probe is now the test "R1 (Pernille's probe)" (three launchd-named folders, mode 700,
  made in /private/tmp between the hold and `approve-sandbox`). It passes: the approved sha256 installs and
  confirms. The same test run also shows that an unrelated company commit does not stage the held release again,
  and that a change to the release's files at the same VERSION is staged again with the same sha256.
- R2 probe (`/tmp/pernille-probe/t0767/probe_r2_child.py`, not committed): `launch.run_watched` with a 3 s
  ceiling runs a fake poll that calls the real `runner.run_limited(["/bin/sleep", "300"], 200)`. Result: stopped
  after 3.2 s, exit -15, and `sleep 300` still alive afterwards in its own process group (pid 57533, pgid
  57533). I killed it.

## Verdict

R1, R3, R4 and the same-second release folder are fixed and tested. R2 is half fixed. Every tool call now has a
limit, and a poll that hangs inside runner.py is stopped at the ceiling. But the ceiling stops only runner.py's own
process group, and every child that matters runs in a group of its own. So a stopped poll can leave a wedged
tool, or a sandboxed job, running with nothing watching it (R6, probed). That is Medium, so the runner is **not**
ready for the Investors' re-install yet. The fix line is T-0768. It is small: one signal handler and one test.

On the question I was asked to press hardest, R1: the approval still describes the real sandbox. The compared
profile and the job's real profile come from the same `profile()` code with the same home, account temp folder
and root-owned folders. They differ only in the list of launchd subpaths: the fixture's two folders against this
Mac's own. That list comes from the same `own_launchd_folders`, and the fixture exercises its name, mode and
symlink filters (it holds one open folder, one wrongly named folder and one link, and none of them is listed).
Hashing a fixed list is the right thing to approve: the rules, not the day's folder names. R9 below lists the
three parts of that function the fixture does not exercise. None of them can widen access past the account's
own file permissions.

## Medium

**R6. A stopped poll leaves its children running (probed).** `launch.py:154-164` sends TERM, then KILL, to
runner.py's process group only. But `run_limited` (`runner.py:143`) and every job step (`runner.py:1107-1109`)
start their own sessions, and runner.py has no SIGTERM handler. The probe above shows the child survives.
This happens on all three stop paths: the R2 ceiling, the M2 first-poll deadline (the confirming check-in calls
`machine()`, which runs `xcodebuild -version` under `run_limited`), and launchd's own TERM (`on_term`).
What it costs:
- A wedged `simctl` or `xcodebuild -version` caught by the ceiling runs on forever. Clearing those was the point
  of R2.
- If the ceiling lands during a job step (possible once the time before the job passes 30 min, see R7), the
  sandboxed `xcodebuild` keeps running with no time limit and no runner watching it. No result is posted, so
  `queued()` (`runner.py:411`) offers the same job on the next poll. That poll runs 2 min later, because the lock
  died with runner.py. `run_job` then deletes `jobs/<id>` under the running build and starts a second one.
  The R2b test does not see this, because its hang is a `time.sleep` inside runner.py itself.
Fix: runner.py keeps a module-level set of the process groups it started (`run_limited` and the `_run_steps`
Popen add theirs and remove them when they end). `main` installs a SIGTERM handler that SIGKILLs each of
those groups, then exits 143. launch.py's 5 s grace after TERM is enough, because the handler kills at once.
Test: the R2b release hangs in `run_limited(["/bin/sleep", "300"], 200)` instead of `time.sleep`, and a
second case hangs in a job step. After the ceiling, both pids are dead. Add a mutant that removes the handler.

## Low

**R7. The ceiling's margin is smaller than the sum of the limits before and after a job.** The ceiling is 5400
+ 1800 s (`launch.py:137-145`). The bounded steps before a job can add up to more than 1800 s on a bad day:
sync 2 x 300, a held or deferred staging (archive 300, plutil 30, self-test 360), the busy check-in's push,
the job's archive 300 and tar 300, simctl 3 x 120, and `bootstatus` 600. Add a job that uses most of its 5400
s, and the ceiling kills it before or during the result push, so the job runs again from the start. That needs
several slow or wedged tools in one poll, so it is rare. Fix: in `once`, before `run_job`, if the poll has
already used more than 900 s, check in as `waiting` and return. The job then starts fresh on the next poll, with
the whole margin left for its result.

**R8. The ceiling trusts the release's kinds.json without a cap (`launch.py:142`).** A typo such as
`"max_time_limit_s": 5400000` in a release turns the ceiling off in practice, and launch.py is the part a
release cannot change. Fix: `min(job, FALLBACK_JOB_LIMIT_S)`, and a test with a huge value.

**R9. Three parts of `own_launchd_folders` are not covered by the R1 comparison.** (a) The owner check
(`runner.py:819`): every fixture folder is ours, and only root can make one owned by someone else. (b) The
`LAUNCHD_MAX` cap (48): the fixture lists 2. (c) Runner's default `tmp_roots` (`runner.py:275`): both sides
now pass the fixture explicitly (`runner.py:784`, `:1261`), so a release that changes the default is
compared as unchanged. Before T-0766, (a) and (c) were exercised, if noisily, by the real /tmp. None of the
three can grant more than the account's own file permissions allow: other accounts' launchd folders are mode
700, and an empty default breaks xc-test rather than opening anything. Fix, cheap: the self-test also prints
the default `tmp_roots` (from `inspect.signature(Runner)`), and the old side checks it equals its own. For (b),
a fixture with `LAUNCHD_MAX + 1` qualifying folders, or a note beside R5 that the cap is not compared.

**R3b. The first-poll deadline (1020 s, `launch.py:28`) is still 60 s short of the confirming path's own
limits.** `getconf` 30 + sync 600 + the check-in's `machine()` (`sw_vers` 30 + `xcodebuild -version` 120,
`runner.py:510`) + one push 300 = 1080 s. Bounded as R3 was: a retry first, and a block only after two. Fix:
add 180 s, or leave `xcode` out of the confirming check-in.

**Note, no action needed:** a VERSION 4 runner has no fixture, so it would hold VERSION 5 as a sandbox change
under a sha256 that drifts. The Investors re-install VERSION 5 by hand, so this never happens. From VERSION 5
on, both sides make and read the same fixture.

**Still open:** R5 (the profile compared is the one the self-test prints, not the one `_run_steps` writes) and
L4 (install.sh is never run by a test).

## Checked and fine

- R1 hold: `release_key` hashes `git ls-tree <commit> -- UPDATE_FILES` (mode, blob id, path). The hold matches
  on version and key, so an unrelated commit is a no-op (tested). A file change at the same VERSION is staged
  again (tested). An approval covers the sandbox sha256, not the files. That is right, because the files go
  through every other check again anyway. If ls-tree fails, the key is constant, and the release stays held:
  it fails closed.
- R1 fixture: the old runner makes it in the scratch folder before the release's self-test runs, and both
  `launchd_fixture` calls then return that same folder. The release's self-test can change the fixture
  before "ours" reads it. But that can only make both sides equal on fixture paths; the real profile still
  comes from the real /tmp. `PLACEHOLDER` scrubs the scratch path, so the sha256 is stable across stagings
  (tested: same sha256 on the restage).
- R2 limits: every `subprocess.run` in runner.py has a timeout (an AST test enforces it). Each wedged tool
  ends its step the safe way: no Simulator, the job waits, an account problem means no job, an empty
  check-in field (tested, each group killed at its limit). If `id -Gn` fails, the account is not known to be
  Standard, so no job runs (fail closed). The confirmed hang is stopped with no rollback, and the next poll
  installs the fix (tested). An unreadable kinds.json falls back to 4 h + 30 min.
- R3: 3 x 300 + 120. SETUP.md says 17 minutes. R4: `max(int(VERSION) - 1, 0)`, with a mutant.
- Same-second staging: `-1`, `-2` suffixes, and pending names the real folder (tested).
- SETUP.md's new sentences match the code.

My two R1 mutants (also in /tmp/pernille-probe/t0767/mut_3.json while it lasts), for tests/macbook_runner_update_mutants.json (T-0768):

```json
{"name": "T-0767 R1 runner: 'ours' reads this Mac's /tmp (old side of the comparison)", "file": "tools/macbook-runner/runner.py", "find": "ours = Runner(scratch, \"self-test\", tmp_roots=(fixture,)).profile(", "replace": "ours = Runner(scratch, \"self-test\").profile("},
{"name": "T-0767 R1 runner: the fixture is the real /tmp on both sides", "file": "tools/macbook-runner/runner.py", "find": "    root = os.path.join(os.path.realpath(work), LAUNCHD_FIXTURE)\n", "replace": "    return \"/private/tmp\"\n    root = os.path.join(os.path.realpath(work), LAUNCHD_FIXTURE)\n"}
```

# Re-review of 5691ea44 (T-0775)

Reviewer: Pernille. Author: Odalys. Date: 2026-10-30. Read: `git show 5691ea44` (launch.py, runner.py, SETUP.md), the
T-0768 tests, `git diff 5691ea44 HEAD` for the suite, `tools/mutants_slice.py`, `ops/mutants/t0774-progress.tsv` and all
of `ops/mutants/t0774-output.log`, plus `install.sh`, `tools/xc.sh` and `tools/xc_helpers.py`. Judged on code, tests and
my own runs only.

## Runs (foreground, /usr/bin/python3 3.9.6, `pgrep -x xcodebuild` and `pgrep -x ibtoold` empty before each)

- `tests/macbook_runner_update_test.py`, once: PASS 125 FAIL 0 (185 s). No `sleep` left behind.
- `tests/macbook_runner_test.py`: PASS 143 FAIL 0 (14 s). `tests/mutants_slice_test.py`: PASS 16 FAIL 0.
- Same code: `git diff 5691ea44 HEAD -- tools/macbook-runner tests/macbook_runner_update_mutants.json
  tests/macbook_runner_test.py` is empty. The sha256 of runner.py and launch.py at HEAD, computed by hand as
  `code_hash` does, equals the first line of the progress file (`d0eaa98e...`).
- Sandbox probe (`/tmp/pernille-probe/t0775/probe_sb.py`, not committed): `spawn` of
  `sandbox-exec -p "(version 1)(allow default)" /bin/sh -c "/bin/sleep 297 & wait"`. sandbox-exec execs in place, so
  sh keeps the spawned pid, the sleep has that pgid, and `stop_groups` leaves nothing. The T-0768 job test runs
  `--no-sandbox`, so this was the one R6 path the suite could not show.
- L4 and R10 probes: below.

**Correction, mine.** My last three runs in this file say the runner suite "stopped ibtoold pid 701" on the Mac mini. It
did not. Pid 701 is a row in that suite's fake machine (`tests/macbook_runner_test.py:958`, `XC_HELPERS_FAKE`); a real
`pgrep -x ibtoold` was empty before today's run and the line still printed. Neither suite touched a real ibtoold. I
reported a side effect that never happened, three times, and it reached the task packets. The update suite prints no
such line at all.

## Verdict

R6, R7, R8, R9 and R3b are closed. No Medium or High is open. The first thing that broke was not the runner: it was
my own note, above. The Investors may re-install once the alpha commit is made.

The reason that holds with Lows still open: launch.py is the one file a self-update cannot change, and I found nothing
against it. R10 and R11 are in runner.py, so their fix reaches the MacBook by self-update with no Investor. R12 and L4
never reach the MacBook. The update changes no access: `profile()` and `kinds.json` are untouched by 5691ea44, and the
`(default-tmp-roots ...)` rule is compared text, never run (Commandment 2, 61). Install from main at this code. If a
later runner commit lands first, it needs its re-review before the install.

## The five findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The five findings, scrolls sideways" data-n="1" style="--tw:477px" markdown="1">

| Finding | Verdict | Why |
|---|---|---|
| R6 | Closed | All three stop paths and the job step are tested with real pids, plus TERM during a start. `spawn` is the only start of an own-session child (grep), and the `started groups` mutant shows the tests depend on it. launch.py's SIGKILL now follows every TERM, which covers tools in the poll's own group. The handler has no thread to miss: runner.py has none. |
| R7 | Closed | The check sits before `run_job`, on launch.py's clock (`time.monotonic`, so a closed lid counts on neither). A poll over the limit starts nothing, and the job runs on a later poll (both tested). Starvation needs 900 s of network or staging on every poll, and deferrals end after 3. |
| R8 | Closed | `min(job, FALLBACK_JOB_LIMIT_S)`, and `int(Infinity)` falls back. `self_test` already refuses a limit under 60 s, so a release cannot shrink the ceiling to nothing. |
| R9 | Closed | Part (c) is compared, held with its rule in the diff, and a release that does not report it is refused. Parts (a) and (b) are written down at `runner.py:839`, the "note beside R5" I asked for. The reported value is the candidate's own word, as R5 says. |
| R3b | Closed | 1200 s against 1080 s (getconf 30, sync 600, sw_vers 30, xcodebuild 120, push 300). `id -Gn` is in `account_problems`, after confirmation, so it is not on this path. SETUP.md says 20 minutes. |

</div>


Residual on R7, no action: after the check, a slow path can still use up to 1680 s (archive 300, tar 300, simctl 360,
shutdown 120, bootstatus 600). 900 + 1680 + 5400 = 7980 s is over the 7200 s ceiling. It needs every tool near its limit
and a job near its own, on one poll. The job then runs again. Accepted.

## The mutant proof: complete, and I accept it

28 of 28 KILLED on this code. I read every run, not only the first FAIL.

**The 8 kills that crashed after their first FAIL are not a gap.** `killer()` takes the first FAIL, and in all 8 a FAIL
comes before the Traceback. No kill is Traceback-only, TIMEOUT or a bare exit code. The crash only costs the checks
after it, which were not what that mutant was for.
- Five die on the check named for them: M1 first transient rollback, M2, M3 x2, L1. Their Tracebacks are the test
  indexing a state the mutant broke (`KeyError: 'sha256'`, `'pending'`, a missing file).
- Two R1 mutants ("self-test reads this Mac's /tmp", "'ours' reads this Mac's /tmp") die at the suite's first update
  with 31 FAILs. That is the defect itself: the two sides differ, so every release is held.
- One deserves care: "M4 self-test without --mirror" also dies at the first update, because the old side still demands
  `staged_version`. So it proves that demand, not the check at `tests/macbook_runner_update_test.py:476`. The R4 mutant
  covers that mechanism: it dies on its named check, a release with a broken update path refused through "update path".
  M4 is proved, by a neighbour.

**The lost BASELINE FAILS is not a gap in the kills. It is an open question about the suite.** A flake cannot make these
kills: each of the 28 first FAILs is the mutant's own check or a direct result of its change. I listed every FAIL in all
28 runs and found none unrelated. 9 runs reached the end of the suite and 11 stopped at the guard at line 728. So: 0
stray FAILs in 28 runs, which alone bounds a stray failure at about 10% per run (95%), and only 9 of those reached the
T-0768 checks. My clean run and the three in the commit message add to that. The cause stays unknown. The pgrep overlap
is a candidate, not an explanation, and I cannot rule out a real intermittent failure. `tools/mutants.py` now prints the
tail, so the next one will have a cause.

Not proved by these 28: the `PermissionError` branches in `run_limited` and `_run_steps`, and `OverflowError` in
`poll_ceiling` (tested, no mutant). All three are one-word excepts. Mutants prove the checks that exist. R10 and R11
below have no check, so no mutant could find them.

## Low

**R10. A job step over its time limit can leave a child running (probed).** `runner.py:1176-1185` sends TERM to the
group, and if the leader exits inside the grace it breaks, so the SIGKILL never goes. This is the same hole 5691ea44
closed in launch.py, one file over. Probe (`Runner._run_steps`, limit 2 s, not committed):
`/bin/sh -c 'trap "" TERM; echo $$ > PIDFILE; exec /bin/sleep 299' & wait` as the step. Result: status `timeout`,
`OWN_GROUPS` empty, and the sleep alive after the job ended. I killed it. For `xc.sh` the leader's own trap stops its
tree (`stop_tree`, TERM then KILL), so xc-test's main step is covered. The `pre` scripts are not. A survivor stays in the
sandbox, so this is no new access. Fix: always send the SIGKILL to the group after the TERM, with the grace kept for the
leader, as launch.py does. Test: the probe's step. A mutant that restores the break.

**R11. A stopped job's sandboxed helper survives every later job (read, not probed; needs real Xcode).** A stop runs
`os._exit`, so `run_job`'s `finally` (`shutdown_simulator`, `stop_helpers`) is skipped. That is right: launch.py gives 5 s.
But on the next job `before = self.helper_pids()` (`runner.py:1082`) counts the orphan as already there, and
`stop(exclude=before)` leaves it. `xc.sh` does not clean it either: its T-0343 stop runs only on the machine's own lock,
and xc-test sets `XC_LOCK_FILE={CACHE}/xc.lock`. So an ibtoold left by a ceiling or a `launchctl bootout` mid-job keeps a
dead job's profile, and T-0343's failure comes back for every later job in the runner account ("Contents.json couldn't
be opened"), until that account's session ends. It is rare, visible in the job result, and limited to the runner's
account. It existed before T-0768, but the new SETUP.md sentence "whatever that run started is stopped with it" now claims
otherwise: a reparented helper and a booted Simulator are not. Fix: save `before` in state.json as the job starts and
clear it when the job ends; if the next job finds it still set, use the saved set, so the orphan counts as the old job's.
Correct the sentence. Test: `XC_HELPERS_FAKE` with a kill between the two jobs.

**R12. `tools/mutants_slice.py`: the record does not fully say what ran.** `code_hash` covers only the mutated files, so
a change to the suite between slices does not reset the proof. Here it did no harm: the first kill's 124/1 shows the
poll() fix was already in. And a passing baseline's line goes to stdout only, so `--output` cannot show that each of the
three scratch runs had a clean one (T-0774's commit records n=1). Fix: hash the suite file named in the command too, and
append `=== baseline exit 0, N s, <last line>` to `--output`.

## R5 and L4: what they are worth now

**R5: still Low, no action.** `profile(job_dir)` still takes only the folder, so the profile compared and the one
`_run_steps` writes are the same call. It stays a trigger, not a task: if `profile` ever takes the command or the
Simulator, one helper must feed both. R9's reported `tmp_roots` sits beside it.

**L4: Low, worth less than I feared, and still worth 30 lines.** This is the path the Investors are about to run by hand,
so I ran it. Probe: `install.sh` from `stop` on, on a fake HOME, stub `launchctl`, with its account and tool checks cut
(they refuse any account but the runner's), over the pre-T-0751 layout (bin a folder, config.json, state.json, cache).
Exit 0, n=1. bin became a link to the new release, all 6 files present, launch.py identical to the repo's, config.json and
cache kept, state.json keeps `checkin` and gains `installed-by-hand`, bootout then bootstrap in that order, the plist
passes `plutil -lint` and starts launch.py. A second install over the first also exits 0. So the migration works; the
account checks at the top were not run. It does not gate the install. A committed test keeps it working the next time
launch.py needs an install.

## Checked and fine

- `launch.py stop`: the unconditional `p.wait()` after ESRCH or EPERM cannot hang. The leader cannot leave its group, and
  EPERM means only a zombie is left. A TERM landing while `p.wait(timeout=1)` holds the waitpid lock could block on that
  path, for microseconds every 50 ms; launchd's own exit timeout ends it.
- `spawn`'s race: TERM before the flag, inside Popen, between add and clear, and on a failed exec all end with the group
  killed or no group. Popen returns only after exec, so `setsid` has happened.
- `poll()` now writing to files weakens nothing: same text back, and the mutant it unblocked now dies on its named check.
- launch.py's SIGKILL now lands milliseconds after the TERM, so a `git` in the poll's group gets no time to clear a ref
  lock. A stale lock would fail every sync. The window is the milliseconds git holds a ref lock, and `subprocess.run`'s
  timeout already had the same exposure. Not a finding.
- A kind above 4 h would be stopped at the ceiling and re-offered for ever. Today's only kind is 5400 s, and the comment
  at `launch.py:34` says the limit needs an install. Noted, nothing to do.
{% endraw %}

</div>
