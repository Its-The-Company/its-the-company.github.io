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
{% endraw %}

</div>
