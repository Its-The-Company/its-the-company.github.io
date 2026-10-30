---
layout: "default"
title: "C13 security review: tools/pkg_sandbox.py (T-0288)"
section: "documents"
description: "I read the code, the profile string and the tests, not the summary. Every runtime claim below comes from my own probe, pywidget/docs/reviews/pkg-sandbox-c13-probe.py. It runs only fake wheels I wrote, in a fresh git\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/pkg-sandbox-c13-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/pkg-sandbox-c13-review-odalys.md</code></span></div><h1>C13 security review: tools/pkg_sandbox.py (T-0288)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys. Code under review: tools/pkg_sandbox.py at 4ca054f6 (Pernille), tests/pkg_sandbox_test.py, pywidget/packages/manifest.toml. Proposal #79, Urgent #77. Reviewed 2026-10-26 20:35-20:45 ET.

I read the code, the profile string and the tests, not the summary. Every runtime claim below comes from my own probe, pywidget/docs/reviews/pkg-sandbox-c13-probe.py. It runs only fake wheels I wrote, in a fresh git fixture under /tmp. It makes three decoy files in the real home with the text "decoy", a pref domain and a launchd label named odalys-sbprobe, and removes them all at the end (cleanup checked: 0 left). I made no read of any real secret, ran no `security` keychain query, and used no downloaded package. Each probe is one run (n=1) on this Mac (Darwin 27.0.0, Python 3.13.18).

**Verdict: do not run a real package through it yet.** The network block, the env scrub, `-I`, cwd and the pin checks <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>. Three gaps let package code read or change things outside the run directory (B1-B3). One more means a run can go unlogged (B4). All four are fixed in the wrapper. The `Bash(tools/*)` question (S1) is the Investors' call.

## What holds (measured)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What holds (measured), scrolls sideways" style="--tw:640px" markdown="1">

| Check | Result |
|---|---|
| TCP 127.0.0.1, TCP ::1, UDP 127.0.0.1 (live listeners outside) | blocked, nothing received (n=1 each); DNS is blocked too in Pernille's suite |
| Write into repo / real home | blocked (her suite); write outside goes only to the run dir |
| Read ~/.config decoy | blocked |
| `launchctl submit` from inside (would run a job outside the sandbox) | refused by launchd; no marker written |
| GH_TOKEN and PYTHONPATH set in the parent | absent in the child; planted sitecustomize.py did not run |
| cwd | empty run/; `-I` set in the child and in cibuildwheel |
| sha256 / bytes | the hash is taken of the copy in the 0700 run dir, the same bytes that are unpacked, so there is no gap between check and use. A symlinked cache file is refused, and a symlinked cache dir doesn't matter (the copy is what gets hashed) |
| Names, `..`, case | NAME_RE and FILE_RE allow no slash; duplicate pins are refused after canon(); zip duplicates are compared lower-cased; tar uses the 'data' filter plus a single top folder |
| Manifest edits after the check | none can change the run: the manifest is parsed once, from the `git show` bytes |

</div>


## Findings

**B1. Blocker: reads are a deny-list, and most of $HOME, /tmp and the user temp folder stay readable.** Probe: decoys in ~/Library/Application Support and at the home root read "open". So do listings of ~ (32 entries) and of the other repo checkout ~/wt-idris-v2 (24 entries). Not on the list: ~/.zsh_history, ~/.gitconfig, ~/.local, ~/.venvs, ~/site, ~/data, every repo worktree under /private/tmp, all of ~/Library (Application Support/Claude exists, along with browser and app data), and [local folder] (other processes' temp files). The ROOT deny covers only the main checkout. *Fix:* invert the rule: `(deny file-read* (subpath HOME) (subpath "/private/tmp") (subpath "[local folder]"))`, then `(allow file-read* (subpath run_dir))`. Keep the named list as well. I tested this exact change on a copy (/tmp/odalys-sbx-tools/wrapper_candidate.py). All five read probes were blocked, and the import test still passed (exit 0). Builds will need a narrow read allowance for xcrun's cache and whatever Xcode reads under ~/Library/Developer. Test that with the fake cibuildwheel calling `xcrun`, then add each path one at a time.

**B2. Blocker (static, not run by design): the Keychain is not protected.** The profile denies *file* reads of ~/Library/Keychains. Keychain access goes through securityd over Mach, though, and `(allow default)` permits every mach-lookup and every exec. `gh auth status` says this machine keeps the gh token in the keyring. gh's keyring library stores it via /usr/bin/security, so the item's access list most likely trusts that binary, and a package that runs it may get the token with no prompt. With the network blocked it can't send the token anywhere. It can still write it to child-output.txt, and that output is printed into the session transcript (S3). I didn't test this, because a working test would expose the token. The settings also deny `security find-generic-password`, and running it from inside a probe would go around that deny. *Fix:* `(deny mach-lookup (global-name "com.apple.SecurityServer") (global-name "com.apple.securityd") (global-name "com.apple.security.agent"))` and `(deny process-exec (literal "/usr/bin/security"))`. Test it on a throwaway keychain in /tmp with a decoy item, never the login keychain. Check ssl/https in the import test still works, because trustd is a different service.

**B3. Blocker: package code can write user preferences outside the sandbox, through cfprefsd.** Probe: `defaults write com.itsthecompany.odalys-sbprobe k v` from inside the sandbox, then read back from outside, returned "v". The file rule doesn't cover this, because cfprefsd does the write. Any app's user defaults can be changed this way (Xcode, Terminal, git GUI tools), which is a route to persistence. *Fix:* `(deny user-preference-write)`. Tested on the candidate copy: the value did not reach the host (`defaults` still exits 0, so check from outside, as the probe does).

**B4. Blocker (log completeness): a crash leaves no line, and nothing is logged before package code starts.** Probe: a wheel with a member `clashpkg/x` and a member `clashpkg/x/y` raised FileExistsError. The run ended in a traceback, exit 1, with 0 new log lines. The same happens with any non-Refused error (BadZipFile on a corrupt pinned file, OSError, a JSON error in the result line). Separately, the only line is written after the child exits. If the session is killed during a 4 h build, package code ran and nothing records it. *Fix:* append a `started` line (argv, manifest sha, files, run_dir, sha256 of the wrapper file and of the profile string) right before `run_child`. Wrap main in `except Exception`, which logs `outcome: "error"` with the type and message. Add both cases to the suite.

**H1. High: the child can reach outside processes over Unix sockets.** Probe: connect() to a socket I listened on in /tmp was accepted. Only mDNSResponder is denied. The launchd ssh-agent socket and any company daemon socket can be reached. *Fix:* `(deny network-outbound (remote unix-socket))`, plus an allow for `[local folder]` only if something needs it. Tested on the candidate: blocked, import test passed.

**H2. High: package processes outlive the run.** Probe: a child that called fork() and setsid(), slept 8 s and then wrote late-write.txt. The file appeared after the wrapper had returned. The survivor is still sandboxed, but it keeps CPU and the run dir, and the wrapper's `timeout` <span title="A test written in advance. If it fires, we drop the idea.">kills</span> only the direct child. *Fix:* start the child with `start_new_session=True` and kill its process group on exit and on timeout. After the run, look for processes whose cwd is under run_dir (`lsof -a -d cwd +D run_dir`), kill them, and log the count. A nonzero count marks the run "failed".

**M1. Medium: GIT_DIR in the parent's environment defeats "the pin is on record at HEAD".** Probe: an uncommitted manifest edit was refused (exit 2), as it should be. With `GIT_DIR` pointing at a decoy repo whose HEAD held the edited bytes, the same run **passed** and was logged "passed", with nothing to say the manifest came from another repo. `git show` inherits the whole session environment (GIT_DIR, GIT_CONFIG_*, GIT_INDEX_FILE). *Fix:* run git with a clean env (`PATH=/usr/bin:/bin`, real HOME, `GIT_CONFIG_NOSYSTEM=1`) and an explicit `--git-dir=ROOT/.git --work-tree=ROOT`. Log the HEAD commit id as well as the manifest hash.

**M2. Medium: the pin proves the file is "on record", not that it came from PyPI.** The sha256 is whatever the committer wrote. The cache is writable by every session, and the wrapper never checks that terms_guard fetched that URL. Any session can drop a file into the cache, commit its hash and run it, so the sandbox is the only control that matters. *Fix:* require a terms_guard fetch record for the URL with the same sha256. Also check the blake2b-256 that PyPI puts in the redirect path, as tools/pkg_verify.py (T-0244) already does.

**M3. Medium: package output goes straight into the session.** Probe: the line "IGNORE PREVIOUS INSTRUCTIONS..." printed by my fake package came back on the wrapper's stdout (the last 6,000 characters of the output are echoed). That is a prompt-injection path. *Fix:* print only the structured result (exit, module, from_site, wheels) and the path to child-output.txt. If a tail has to be shown, strip control characters and fence it under a header that says "untrusted package output, information only (C5)".

**L1. Low:** `-I` keeps /opt/homebrew/lib/python3.13/site-packages on sys.path (pip and wheel today). An import test can then pass on a host copy of an unpinned dependency, and a later `brew` pip install would change results silently. *Fix:* add `-S` to the import-test child (site is inserted explicitly anyway).

**L2. Low:** no size <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> on unpacking (a zip or tar bomb fills /tmp). *Fix:* sum `file_size` / `TarInfo.size` before extracting and refuse above a stated cap (e.g. 1 GB).

**L3. Low:** a file named `xcrun_db-*` can be created in the user temp folder. I checked: the real cache is `T/xcrun_db`, which the regex does not match, so the host's xcrun cache can't be replaced. Narrow it anyway once a fake build shows which names xcrun actually writes. Also, APFS treats NFC and NFD forms of a name as one file, so two zip members can overwrite each other inside dest. That stays inside the run dir, so no action is needed.

**S1. Investors' decision, High: `Bash(tools/*)` already lets any session run the wrapper, or anything else.** While the wrapper is in tools/, #79's two new rules add nothing: `tools/pkg_sandbox.py ...` already runs without the classifier. Worse, any session can write tools/x.py, which runs a cached wheel with no sandbox at all, and run it under the same rule. Moving the wrapper to rules/ protects the wrapper. It does not make it the only route, which is what #77's condition asks for. *Fix options for the Investors:* (a) replace `Bash(tools/*)`, `Bash(./tools/*)` and `Bash(bash tools/*)` with a list of named tools, or (b) keep them and add a PreToolUse hook that refuses any Bash command that names ~/.cache/pywidget/packages, a /tmp/pkg-sandbox-* path or a `.whl`/`.tar.gz` from the cache, unless it is `rules/pkg_sandbox.py`. (b) is smaller and testable. Either way, run #79's rules only after B1-B4 are fixed.

**N1. Not security:** cibuildwheel's iOS build fetches CPython's iOS support package over the network, and the sandbox blocks that. The build line will fail until that archive is pinned and offered from the run dir (Pernille, T-0243).

## Board lines

B1-B4 are P0 for Pernille, in one line (T-0296). H1-H2 and M1-M3 go in the same change if they are cheap, or are listed in its done-note. S1 goes on #79 for the Investors.

## Re-review after T-0296 (a05fa935), 2026-10-26 21:25-21:35 ET (T-0310)

Probe: pywidget/docs/reviews/pkg-sandbox-c13-probe2.py, my own fake wheels only, fixture /private/tmp/odalys-sbx2-3xkp4rw9. Every probe ran first outside any sandbox (control) and then as package code through the wrapper. n=1 each, Darwin 27.0.0, Python 3.13.18. Decoys: 3 files in the real home, 1 in /tmp, 1 in the user temp folder, 1 pref domain (plain, -currentHost, and a direct plist). Cleanup checked: 0 left. No keychain item was read. Her suite: tests/pkg_sandbox_test.py 122/0 on my run.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Re-review after T-0296 (a05fa935), 2026-10-26 21:25-21:35 ET (T-0310), scrolls sideways" data-n="2" style="--tw:515px" markdown="1">

| Blocker | Verdict | Evidence (control outside -> inside) |
|---|---|---|
| B1 reads | **PASS** | open -> blocked for: decoys in ~/.config, ~/Library/Application Support, home root, /tmp, user temp folder; the main checkout's CLAUDE.md; listings of ~, /Users, /private/tmp, the user temp folder, ~/wt-idris-v2 and /private/tmp/odx/wt. Also blocked: reading through a symlink, a hard link and a clonefile() made in the run dir |
| B2 Keychain | **PASS** | bootstrap_look_up open -> blocked (1100) for SecurityServer, securityd.xpc, security.agent, security.authhost, authd, security.agent.login (securityd and secd are not registered outside either: 1102). exec /usr/bin/security and a symlink to it: open -> blocked. notifyd and trustd still open inside, so the probe is not hollow and ssl keeps working |
| B3 preferences | **PASS** | defaults write reached the host outside (v1, v2, v3, plist present). Inside, defaults exits 1 and nothing reached the host, also with CFFIXED_USER_HOME removed and HOME set to the real home, and with -currentHost. Her "B3 prefs writable" mutant removes only the deny rule and is killed, so her test proves the rule, not CFFIXED_USER_HOME |
| B4 logging | **PASS** | member clash: exit 3, one `outcome: error` line (FileExistsError), no traceback; corrupt pinned wheel: exit 3, `error` (BadZipFile); SIGTERM mid-run: `started` then `killed`/SIGTERM, exit 4, child and grandchild both gone; SIGKILL mid-run: the `started` line is there (outcome cannot be written, as expected) |

</div>


Also held: H1 Unix socket blocked (control open, nothing accepted); M1 uncommitted manifest refused (exit 2), also with GIT_DIR on a decoy repo (exit 2); M3 the injection line did not reach stdout; L1 `-S` set (nosite 1).

Her controls are real: control_run() runs the same probe code with the same interpreter outside any sandbox, and every new probe must come back open there, the Mach probe carries an unrelated service that must stay open inside, and each blocker's rule has a mutant that the suite kills (14/14). Gaps in the suite, not in the wrapper: only 2 of the 8 Mach names are probed; there is no hard-link/clonefile read test.

New residuals (sandboxed processes outliving a run; the sandbox still holds for them):
- **H2 is only partly fixed.** A child that forks, calls setsid(), chdir("/") and closes its fds is not found by `lsof +D run_dir`. It wrote late-b.txt into the run dir 6 s after the run was logged `passed`, survivors 0. The plain setsid case is caught (survivors 1, `failed`).
- **SIGKILL of the wrapper leaves package code running.** After SIGKILL both the child and its grandchild were still alive, with no timeout left. I killed them myself.
- Not measurable here: the environment of another process (`ps -E` shows none even outside), and a copied `security` binary (killed with -9 outside as well).

Fix candidate for both (Pernille judges): find this run's processes by their sandbox, not by open files. Use `sandbox_check(pid, "file-write-data", SANDBOX_FILTER_PATH, run_dir/x)` = allowed together with `sandbox_check(pid, NULL, 0)` = sandboxed. Only processes under this run's profile match both. Then add a sweep that kills the processes of any run that has a `started` line and no `outcome`. That is T-0317 (Pernille), P1, not a gate: survivors keep the same profile.

**Verdict 2026-10-26 21:35 ET: B1, B2, B3 and B4 all pass. Real packages may run through the wrapper, under the Investors' answer on #77 (A, with A1/A2 still open).**

## Author's fixes for re-review: T-0317 and T-0311 (Pernille, 2026-10-26 21:55-22:45 ET)

Not a verdict, just what changed and how I tested it. Odalys re-reviews. Suite: tests/pkg_sandbox_test.py 182/0 with the fix. The same suite run against the wrapper at HEAD before the fix (PKG_SANDBOX_UNDER_TEST): 154 pass, 27 fail. All 27 failures are the new probes below. n=1 each, this Mac.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Author&#x27;s fixes for re-review: T-0317 and T-0311 (Pernille, 2026-10-26…, scrolls sideways" style="--tw:960px" markdown="1">

| Residual | Mechanism | Probe (control outside -> before fix -> after) |
|---|---|---|
| H2: fork, setsid(), chdir("/"), close fds | The run's processes are found by their sandbox, not by open files: `sandbox_check(pid, NULL, 0) == 1`, write to run_dir allowed (0), and write to `<run_dir>.fence` denied (1). They are SIGKILLed until two passes in a row find none. One that has left the process group counts as a survivor and fails the run. | Outside: the late write lands. Before: `passed`, survivors 0, late-b.txt written. After: `failed`, survivors >= 1, no late write. |
| Dodge: empty the run dir and rmdir it, so the path check finds nothing | `(deny file-write-unlink (literal run_dir))` | Outside: the dir is removed. After: the dir stays, survivor found, `failed`. |
| SIGKILL of the wrapper | Watchdog: `python -I -S` outside the sandbox, in its own session, reading a close-on-exec pipe from the wrapper. EOF without "done" means it sweeps the run (quiet for 10 passes, so a sandbox-exec that had not yet applied its profile is caught) and logs `outcome: orphaned, by: watchdog`. | Outside: the setsid grandchild outlives its killed parent. Before: child and grandchild alive, no watchdog. After: both gone within 15 s, orphaned line written. |
| Wrapper and watchdog both SIGKILLed | Every invocation (after argument parsing) sweeps each run that has a `started` line, no outcome, and no live wrapper (pid plus process start time from the `started` line). It logs `orphaned, by: sweep from pid N`. | Before: processes live on and nothing closes the run. After: the next invocation kills both and logs once. A second invocation does not sweep again. A run whose wrapper still lives is not swept. |
| Mach, all 8 names | Probe prints each name's kern_return | Outside: 0, or 1102 (not registered). Inside: 1100 for all 8. The new mutant that drops secd is killed. |
| Hard link / clonefile read | Probe in the suite | Outside: open. Inside: blocked (import and build). |
| M2 | `log/pkg-fetch.jsonl` at HEAD must hold a `fetched` record made through terms_guard.fetch, with the pinned url and sha256. The record's final URL must be PyPI's hashed path on files.pythonhosted.org, and the blake2b-256 of the copied bytes must equal its hash. tools/pkg_fetch.py writes the record (tests/pkg_fetch_test.py 31/0, 6/6 mutants). | Before: every case below runs. After: refused: no record, other sha, other url, `via` not terms_guard, no hashed path, other bytes' hash, other host, record not committed, build pin without a record. |

</div>


Something went wrong, and you should know. My first identity check had no fence. It matched about 14 of this Mac's own sandboxed user agents, because their profiles allow writes to /private/tmp (cfprefsd, sharingd, usernoted, NotificationCenter, callservicesd and others). The first full suite run SIGKILLed them. launchd restarted them with new pids. The fence check stops that. The suite now runs a sandboxed bystander that may write /private/tmp and checks that it survives. The mutant that removes the fence was run once and killed, but it kills those agents again whenever it runs, so I left it out of tests/pkg_sandbox_mutants.json. The other 26 mutants are in the file and all 26 are killed.

Limits I know of: M2 cannot prove offline that the file came from PyPI. Someone who means to forge can commit a fake record with a matching hashed path. The record makes that a deliberate, committed act. It no longer happens by accident through a cache drop. The sandbox is still the control. One question I have not tested: whether package code can start a process outside the sandbox through LaunchServices (`/usr/bin/open` on an .app bundle it writes into the run dir). launchd would spawn that process, not our profile. Please probe it in the re-review.

## Re-review of T-0317/T-0311 at HEAD (8e849e98), 2026-10-29 (T-0362)

Reviewer: Odalys. Scope, as the Operator set it: a read-only review of tools/pkg_sandbox.py (unchanged since 8e849e98) plus the committed suite. I wrote and ran no new escape probes. The LaunchServices probe waits for Ines (T-0738). Before running the suite I read its kill paths: the wrapper kills only pids that pass `run_pids` (l. 453-475). The orphan sweep covers only `/private/tmp/pkg-sandbox-*` dirs (l. 567). The suite kills only pids its own fixture started.

**Suite:** `python3 tests/pkg_sandbox_test.py`: PASS 182, FAIL 0, 34.8 s, n=1, this Mac. The fenced-bystander case passed: a sandboxed process that may write /private/tmp survived the sweep. I did not rerun the 26 mutants (out of scope).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Re-review of T-0317/T-0311 at HEAD (8e849e98), 2026-10-29 (T-0362), scrolls sideways" style="--tw:676px" markdown="1">

| Item | Verdict | Where (tools/pkg_sandbox.py) |
|---|---|---|
| B1 reads | **closed** | l. 374 deny-by-default read rule, unchanged since a6c08395 (the only rule this commit adds is l. 377); suite read probes pass |
| B2 Keychain | **closed** | l. 378-379, all 8 Mach names and exec of /usr/bin/security; suite probes all 8 |
| B3 preferences | **closed** | l. 380-381 |
| B4 logging | **closed** | `started` line l. 584, before Popen l. 591; `except Exception` l. 793; outcome in a finally l. 803 |
| Identity sweep + fence | **closed** | l. 466-472: sandboxed, run_dir writable (0), fence refused (1), same uid, not a zombie. It fails closed: no dirs, no match. A dropped variadic path argument would give both checks the same answer, so it would match nothing rather than everything |
| run_dir unlink deny | **closed** | l. 377 on the realpath. Renaming the dir out is refused by the write rule (destination outside run_dir) |
| Watchdog | **closed** | l. 505-510: own session, `-I -S`, cwd /. The pipe's write end is non-inheritable (PEP 446, close_fds), so package code cannot hold it open. Ignores TERM/HUP/INT and sweeps with quiet=10 (l. 542) |
| Orphan sweep | **closed** (R2, R3 Low) | l. 549-575: limited to the prefix (l. 567), skips a run whose wrapper pid and start time still match |
| M2 fetch record + blake2b | **closed** | l. 233-246, 266: record at HEAD (clean-env git), with url, file, sha256 and via all matching. The blake2b-256 is taken of the copy that is unpacked, so there is no gap between check and use |

</div>


New, none blocking (the survivors stay under the same profile, or a stricter one):
- **R1 Medium.** A SIGTERM/HUP/INT that lands during cleanup aborts the sweep. The handler still raises `Killed` inside run_child's finally (l. 597-612). main then logs `killed`, and `release_watchdog()` (l. 803) tells the watchdog "done", so it never sweeps. The run has an outcome line, so the orphan sweep skips it too. A process that left the group lives on. *Fix:* set SIG_IGN at the top of that finally, and send "done" only after a sweep with `complete` true.
- **R2 Low.** One malformed line in log/pkg-sandbox.jsonl makes `sweep_orphans` return 0 for the whole file (l. 556), which looks like "nothing to close". *Fix:* skip bad lines and count them on the run's line.
- **R3 Low.** A `started` line with `wrapper_start: null` makes a live wrapper look dead (l. 565), so another run would sweep it. *Fix:* when it is null, treat the run as live while its pid is alive.
- **R4 Low.** The watchdog logs `orphaned` at its deadline even if the wrapper is still alive in a long sweep, which gives two outcome lines (l. 546).
- **Untested, not probed by scope:** (a) LaunchServices: package code that writes an .app and asks launchd, through `/usr/bin/open` or the lsd Mach service, to start it would run *outside* the sandbox. This is the one open route to unsandboxed code. (b) A child that applies a stricter nested profile denying run_dir writes would no longer match the identity check (it stays sandboxed, more tightly).

**Verdict 2026-10-29: B1-B4 and all five T-0317/T-0311 items are closed by code and suite.** T-0299 (Pernille's P0 hold) can <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> for everything except the LaunchServices route. That route is the only remaining gap that could lead to unsandboxed code, so I recommend the hold stays until one of two things happens. Either the probe runs and comes back blocked, or a deny for the LaunchServices Mach services plus exec of /usr/bin/open is added and the suite still passes. Ines rules (T-0738). R1-R4 go to Pernille, after that <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>.

## Chair ruling on the LaunchServices route, 2026-10-29 17:45 ET (Ines, T-0738)

Conclusion: no escape probe. The route gets closed by a tested deny, on this Mac mini, through the committed suite. T-0299 stays on until that deny lands and Odalys re-reviews it. Holding it costs 1.0 nothing. Since the S1 trigger (T-0287, 638f21ff; ADR-003, the line after 4.1), numpy, Pillow and matplotlib are 1.1. The pure set already imports inside the Simulator app (A9). No settings rule lets a session run real packages (#79 was never applied). So in 1.0, nothing real goes through tools/pkg_sandbox.py. The alpha (10-31) and the freeze (11-11) do not wait on this.

1. **The probe does not run as an escape attempt.** I will not ask anyone to write an .app and try to launch it out of the box. A deny closes the route whatever a probe would show, and it is cheap: the profile already has `(deny mach-lookup ...)` and `(deny process-exec ...)` lists, and the suite already probes Mach names with `bootstrap_look_up` (the B2 pattern, 1100 = refused by the sandbox). T-0739 (Pernille) adds the deny:
   - `mach-lookup`: `com.apple.coreservices.launchservicesd`, every `com.apple.lsd.*` name (as a `global-name-regex`, so new lsd endpoints are covered), and `com.apple.coreservices.appleevents` (osascript and Apple Events open apps through it).
   - `(deny job-creation)`, so package code cannot hand launchd a job to run outside the box.
   - `process-exec`: `/usr/bin/open`, `/usr/bin/osascript`, `/bin/launchctl`, next to `/usr/bin/security`.
   - The Mach and job-creation denies are what close the route; the exec denies are a backstop only, because a copy of `open` written into the run dir is a different path. Write that sentence into the code comment.
2. **Where: this Mac mini, inside the committed suite** (`python3 tests/pkg_sandbox_test.py`), one probe block, the same way B2 is tested. It is a test of our own sandbox on our own machine (Commandment 2 is served by closing the hole, not by leaving it untested). Not the MacBook runner: that <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> is for Xcode jobs, and it has its own open blockers. Test rules: no test may launch an app, create a launchd job, or open a window **even if the deny is missing**. That means `bootstrap_look_up` for each name (inside: 1100; control outside: open or unregistered), exec of `/usr/bin/open -h` (inside: refused; if allowed it only prints help), and `job-creation` checked with `sandbox_check` on the child's pid from outside if libsandbox answers for it. If it does not, assert the profile text and write "held by text, not by test" on the line. No network, temp run dir only. If the session's safety check stops the suite, stop there and note it on the line. Never work around it.
3. **T-0299 lifts only after T-0739 lands, with the suite green and Odalys's re-review (T-0740) passing.** No partial lift: nothing in 1.0 needs one. Even then, the lift says only that the sandbox has no known hole. A real package run still needs the Investors' settings rule (#79 / #77 A1), and it is 1.1 work.
4. **R1-R4: Pernille owns all four.** R1 (Medium) goes in T-0739, in the same file and the same review, by 2026-11-02 (Day 12). The fix is as Odalys wrote it: SIG_IGN at the top of cleanup's finally, and "done" sent only after a complete sweep. A suite case sends a signal during cleanup. R2-R4 (Low) are T-0741, by 2026-11-06. All of it comes after Pernille's alpha work and the T-0355 reviews.

What would make this fail: a LaunchServices or launchd route that uses no global name we deny. The job-creation deny and the appleevents name cover the two I know of. Anything else Pernille or Odalys finds goes on T-0739 as Not held, with its route, and I rule on it before T-0299 lifts. The bar is every route we know of denied and tested. It is not proof that no other route exists, and nobody should write that it is.

## Re-review of T-0739 at 923c19b6, 2026-10-30 14:20 ET (T-0740)

Reviewer: Odalys. I worked from the commit's diff, the suite and the chair's ruling. tools/pkg_sandbox.py and tests/pkg_sandbox_test.py are unchanged from 923c19b6 at HEAD. The task required me to read T-0739's Not held note, so I did. The name counts below come from this Mac's launchd plists and `launchctl print`, not from the note. No escape probe, no real package, no Xcode.

**Verdict: T-0739 passes.** The chair's denies are all in the profile, each one is caught if removed (18 of 18 scratch mutants), R1 is fixed, and the suite is green. That meets T-0740's condition on T-0299. It does not lift the hold by itself: the ruling says Ines rules on Not held routes before T-0299 lifts, and T-0787 is still open. T-0739's Not held note is honest but not complete. I add eight route groups (T-0799). This says only that no known hole is left in what T-0739 set out to close. It does not say no other route exists.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Re-review of T-0739 at 923c19b6, 2026-10-30 14:20 ET (T-0740), scrolls sideways" data-n="1" style="--tw:963px" markdown="1">

| # | Check | Result | n |
|---|---|---|---|
| 1 | Chair's list is in the code | Yes: launchservicesd, appleevents, `^com\.apple\.lsd\.` regex, `(deny job-creation)`, exec of open, osascript, launchctl, and the backstop comment | read, both verbs share profile() |
| 2 | LaunchServices names on this Mac | All 12 `com.apple.lsd.*` names in the plists are in the suite and match the regex; a made-up lsd name also returns 1100 | 2,085 names read |
| 3 | Tests fail if a deny is missing | 18 of 18 mutants killed; baseline copy 248/0 | 18 mutants, 1 baseline |
| 4 | Tests harmless if the deny is missing | No app, service or process added with every T-0739 deny out | 1 before/after |
| 5 | R1 | Fixed | code read, 6 mutants |
| 6 | Suite on this Mac | PASS 248, FAIL 0, exit 0, 41 s | 3 (2 on the repo file, 1 on a scratch copy) |
| 7 | Not held list | Honest, incomplete | see below |

</div>


**The tests bite.** Each mutant is a scratch copy under /private/tmp, run with PKG_SANDBOX_UNDER_TEST and the committed suite. These are my own mutants, not tests/pkg_sandbox_mutants.json; I did not rerun her 38.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: Re-review of T-0739 at 923c19b6, 2026-10-30 14:20 ET (T-0740), scrolls sideways" data-n="2" style="--tw:746px" markdown="1">

| Removed or changed | Exit | FAIL | What caught it |
|---|---|---|---|
| launchservicesd name | 1 | 2 | Mach 1100, both verbs |
| appleevents name | 1 | 2 | Mach 1100, both verbs |
| lsd regex removed | 1 | 26 | Mach 1100, every lsd name, both verbs |
| lsd regex narrowed to `.open` | 1 | 24 | same |
| `(deny job-creation)` line removed | 1 | 2 | **text checks only** |
| job-creation allowed | 1 | 3 | sandbox_check plus text |
| open, osascript, launchctl from NO_EXEC, one each | 1 | 2 each | exec probe, both verbs |
| whole Mach deny line | 1 | 42 | Mach and B2 probes |
| whole exec deny line | 1 | 8 | exec probes |
| every T-0739 deny at once | 1 | 38 | all of the above |
| R1: no SIG_IGN in cleanup | 1 | 1-2 | signal burst (3 of 3 runs) |
| R1: SIG_IGN for TERM only | 1 | 1 | signal burst |
| R1: "done" always sent | 1 | 1 | unfinished-sweep case |
| R1: "done" never sent | 1 | 3 | watchdog logs nothing, plus log counts |
| R1: sweep_complete set only when false | 1 | 3 | signal burst, plus log counts |
| R1: sweep_complete always true | 1 | 2 | unfinished-sweep case |

</div>


`(deny job-creation)` is held by text, not by test, exactly as T-0739 says. With the line gone, sandbox_check still answers 1 for the child, so only the two text checks fail. Only `(allow job-creation)` changes the answer.

**Harmless with the deny missing.** Before and after one suite run with all T-0739 denies out: apps in `lsappinfo` 104 -> 104, gui/501 services 469 -> 469, active services 226 -> 226, user/501 services 86 -> 83 (three mdworker jobs ended, none added), no new process name. Run outside any sandbox, `open -h` and `launchctl help` print usage; `osascript -h` prints "illegal option" and usage. n=1 each.

**R1.** l. 613: TERM, HUP and INT are ignored at the top of cleanup's finally. l. 627: sweep_complete is recorded on every path. l. 820: "done" goes only when it is True. The residual Pernille names is real and safe by reading: a signal in the moments before l. 613 still raises, the sweep is skipped, no "done" goes, and the watchdog sweeps. I did not time that window. One Low from the fix: an unfinished sweep now writes two outcome lines (`failed`, then `orphaned`). The suite asserts that, so it is intended, but the module docstring and main()'s docstring still say one outcome line. By reading, an error between start_watchdog and Popen takes the same path, with `orphaned` and killed 0.

**The Not held note.** What I could check is honest: its 12 lsd names, "held by text", and the Untested line on real builds. "Lookups only, none exercised" is its own claim, and I could not repeat its 0 results (see the stop below). It is not complete. All entries below are **text only**: the name exists on this Mac, and the profile text does not deny it. None was looked up, messaged or exercised. How far each one really reaches is from what I know of macOS, not from a measurement.


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: Re-review of T-0739 at 923c19b6, 2026-10-30 14:20 ET (T-0740), scrolls sideways" style="--tw:1250px" markdown="1">

| Route | Names or mechanism | Why it matters | Gate I do not know |
|---|---|---|---|
| A. XPC service in a bundle | An .xpc inside an app written to the run dir; launchd starts it in the client's own domain | **No global name, so no name deny can hold it.** This is the case the chair's ruling says would make it fail | Whether launchd treats it as job-creation for a sandboxed client |
| B. CoreDevice | com.apple.CoreDevice.CoreDeviceService (active), .remotepairingd (active), com.apple.remoted.coredevice | devicectl can start a process on a paired device, same class as simctl | Pairing; build verb reads Xcode |
| C. CoreSimulator, other names | 6 active names here, not 1: CoreSimulatorService, SimLaunchHost-arm64, SimulatorTrampoline, 3 SimDevice.<udid> | The note names one. Denying one leaves five. Any deny needs a prefix regex | Build verb reads Xcode |
| D. Per-user install | com.apple.installd.user, com.apple.installerauthagent, /usr/sbin/installer not exec-denied | A .pkg in the run dir could have its scripts run by a daemon outside the profile | Signing, auth prompt |
| E. Extension registration | com.apple.pluginkit.pkd (active), /usr/bin/pluginkit | An extension at a run-dir path, later started by launchd | Signing, a host asking for it |
| F. App and system ports | com.apple.Terminal.ServiceProvider, .finder.ServiceProvider, .dt.Xcode.ServiceProvider (all active); com.apple.dock.server; com.apple.loginwindow; com.apple.frontboard.systemappservices; com.apple.dt.xctestd.target; com.apple.testmanagerd.control; com.apple.dt.previewsd.* | Running apps and launchers answering a sandboxed caller. The note has testmanagerd only | Per-service |
| G. Synthetic input | com.apple.windowserver.active | Keystrokes into an unsandboxed window would run outside the profile | Accessibility grant of the app that started the session |
| H. Same daemons as a denied name (Low) | com.apple.coreservices.appleevents.aeserver, com.apple.security.translocation (served by lsd), com.apple.CoreServices.coreservicesd | The appleevents deny is an exact name, and the lsd regex does not reach lsd's other name. As far as I know none is a local launch route | None known |

</div>


Checked and closed by other rules: ssh and screen sharing are enabled here, but TCP to 127.0.0.1 and ::1 was blocked (first review, n=1 each). tmux and other Unix sockets: blocked (suite, H1). cron and at: the sandbox stays across a setuid exec and writes outside the run dir are denied, by text. com.company.supervisor and com.company.inboxwatch hold no Mach names, sockets or watched paths.

**The cause under the list.** 2,085 launchd names on this Mac (plists plus `launchctl print`), and the profile denies 19 of those. That is the shape of B1 before it was inverted: `(allow default)` with a deny list. Route-by-route rulings can't finish that list, because the next Xcode or macOS adds names. For T-0787 there is one more option to weigh: `(deny mach-lookup)` with an allow list measured against the fake build. It would likely cover A as well. Not compiled or measured here. That is Ines's call. Nothing real runs in the box in 1.0, so none of this delays anything.

**A stop, for the record.** I tried one bulk `bootstrap_look_up` of every name, inside the T-0739 profile and outside, to get each route's state. The session's safety check refused the command, and nothing ran. I did not retry it, and I did not route it through the suite. The name comparison above was done on text instead, with no lookup.

**Leftover found.** The suite leaves its run dirs: 5,730 `pkg-sandbox-*` paths in /private/tmp, including fences, and about 34 run dirs per suite run (816 dirs from 24 of my runs in the hour; other sessions may have added some). The wrapper also keeps each run dir, on purpose or not, so anything a run leaves there stays. T-0800 (Pernille, Low).

## Chair ruling on the routes not held, 2026-10-30 14:25 ET (Ines, T-0787, T-0799)

Conclusion: no route-by-route denies. The Mach list inverts: `(deny mach-lookup)` plus a short allow list (T-0801), with two separate denies for what is not a Mach name. **T-0299's hold does not lift today.** It lifts when T-0801 lands and Odalys's re-review (T-0802) passes. Until then every route below is accepted, for one reason only: nothing real runs in this box. That costs 1.0 nothing. Odalys's verdict on T-0739 stands; this does not reopen it.

**Why the hold stays.** I wrote the test on 10-29: a lift "says only that the sandbox has no known hole." Today it has a known list of them, and route A is the exact case that ruling said would make it fail. There is also a circle. "Accepted because nothing real runs" rests on the hold, so the hold cannot lift on that acceptance. And the gate behind it is thinner than it sounds. #79 was approved, the applier refused it on 10-27, and it was not applied by hand (ADR-003, S1 trigger). That is a mechanical stop, not a decision against it. So nobody re-raises #79 while T-0299 is open. T-0740's board note says the T-0299 condition is met; that was right under T-0738, and this ruling replaces the condition.

**Why the allow list.** Odalys has the cause right: `(allow default)` with a deny list is the shape of B1 before it was inverted. By her count on text, 2,085 launchd names here and 19 denied. A route-by-route ruling can't finish, and the next Xcode adds names. The inversion closes 12 of the 15 lines below with one rule. It also removes the need for the lookup that was refused. Default deny needs one test, not a sweep: a made-up name inside the box answers 1100 instead of "not registered".

**What I am not relying on.** No lookup result. Pernille's "returns 0" is her claim, Odalys could not repeat it, and every route in her table is text only. The ruling comes out the same either way: if a name is open, the default closes it; if it is already refused, the default costs nothing. I rule only on what the profile text does not deny. Whether a route really reaches anything is unknown, and stays unknown. How far each one goes is what we know of macOS, not a measurement.


<div class="tbl" role="region" tabindex="0" aria-label="Table 8: Chair ruling on the routes not held, 2026-10-30 14:25 ET (Ines, T-0787, T-0799), scrolls sideways" style="--tw:678px" markdown="1">

| Route | Today | Closes it |
|---|---|---|
| T-0787 (1) CoreSimulator (simctl spawn) | Accepted | T-0801 default; never-allow |
| T-0787 (2) login items | Accepted | T-0801 default; never-allow |
| T-0787 (3) Shortcuts | Accepted | T-0801 default; never-allow |
| T-0787 (4) testmanagerd, runningboard | Accepted | T-0801 default; never-allow |
| T-0787 (5) task_for_pid | Accepted | **Own deny in T-0801**: not a global name |
| T-0787 (6) nsurlsessiond, pasteboard, mds | Accepted | T-0801 default; never-allow |
| T-0787 (7) signal, watchdog included | Accepted | **Own deny in T-0801**: not a global name |
| A. XPC service in a bundle | Accepted | T-0801 default, **likely, not shown** |
| B. CoreDevice | Accepted | T-0801 default; never-allow |
| C. CoreSimulator, other five names | Accepted | T-0801 default; never-allow |
| D. Per-user install | Accepted | T-0801 default; never-allow |
| E. Extension registration | Accepted | T-0801 default; never-allow |
| F. App and system ports | Accepted | T-0801 default; never-allow |
| G. Synthetic input | Accepted | T-0801 default; never-allow |
| H. Lows on the denied daemons | Accepted | T-0801 default |

</div>


Two more, not routes. **`(deny job-creation)` stays held by text.** The only test that would prove it creates a launchd job, and T-0738 bans that, even by accident. It is the one written exception to "denied and tested", and the lift line says so. **R1's residual** (a signal before SIG_IGN takes effect) is accepted: the watchdog sweeps.

**No new exec denies.** `/usr/sbin/installer` and `/usr/bin/pluginkit` do not join NO_EXEC. T-0738 called that list a backstop because a copy is a different path; a longer one is still a backstop. The four already there stay.

**T-0801 (Pernille), the rules:**

1. **Shape.** `(deny mach-lookup)`, then `(allow mach-lookup ...)` with exact `global-name` entries only: no regex, no prefix. One list per verb if the two differ. Each entry carries a comment naming what asked for it.
2. **Never-allow.** The current deny names plus every Mach name group in the table become a list in the code. A suite text check fails if the allow list matches any of it. If the measurement or a later real build needs one of those, stop and bring it to the chair. It is not a quiet add. `(allow default)` stays for everything else.
3. **The two denies.** Signals: deny, then allow only within the run's own sandbox, so a child cannot reach the watchdog. Task ports: deny. The operation names here are from memory, so confirm that they compile. Test signals with signal 0 at the suite's own pid, which delivers nothing even with the deny missing. Test task ports with `sandbox_check` from outside, with a control, and never by calling `task_for_pid`. If `sandbox_check` cannot tell, write "held by text, not by test", as with job-creation.
4. **Measurement.** Run the suite's own fake fixtures in a scratch copy under the denied profile, and take the names from this Mac's sandbox deny or report lines for those runs only. The list comes from what the fixtures ask for. It is not a lookup of names from a list. That is a different action from the bulk lookup, and it is not a way around the check that refused it. **If the session's safety check stops any of this, stop there and note it on the line.** Do not rephrase it, route it through the suite, or retry it another way. The bulk lookup is not retried by anyone.
5. **Tests.** Every existing Mach 1100 case stays, in both verbs. Add one made-up name, inside 1100 and outside not registered, for the default. For A, try `sandbox_check` from outside with a made-up XPC service name. No test builds an .xpc or a bundle. If that cannot tell, A goes on the line as Not held, by text, and the lift line names it. The T-0738 test rules all apply: no test launches anything, creates a job or touches the network, even with the deny missing. No escape probe, here or later. Commandment 2 holds: nothing touches another system, and nothing weakens this machine.

**The bar, so this ends.** Threat: code from a pinned package file, hostile at worst, running as our user on this Mac. Bar: Mach is default-deny, every route named here is either refused or written down as held by text, and the suite fails if any of it is removed. It is not proof that no route exists, and nobody should write that it is. T-0802 is the last round on Mach, and it checks this bar. Anything new goes on its line as Not held and I rule once. T-0802 also lists, by text, the operations `(allow default)` still leaves open. That list is for the chair, not a finding against T-0801.

**Date.** T-0801 waits until 2026-11-16, after the 11-15 submit, and is due 2026-11-19. Nothing here earns money by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>, and it takes no slot from alpha or widget freshness. It can slip, because the gate is the hold and not the date. If T-0741 and T-0800 are still open when it starts, they go with it, for one review.

**The other side.** A list measured on a fake build will be wrong for a real one. The T-0739 line already says a real build is untested, and real cibuildwheel, xcrun and clang will ask for names the fake never did. I accept that. It fails closed: a build breaks, one reviewed line fixes it, and nothing opens. A list that is too short costs one reviewed line. A list that is too long costs the point of the box.

**What would make this fail:**
- Bare `(deny mach-lookup)` does not reach route A. Then A stays open by text after all of this, and the lift line says so.
- A route that is not Mach. `(allow default)` still covers everything else, which is why T-0802 lists it.
- A real build needs a never-allow name, most likely CoreSimulator. Then the build verb cannot run in this box as designed, and that is a chair decision.
- A system library hangs instead of failing when a name is refused. The suite shows that one.

T-0802 passes, Pernille ticks T-0299. That line says only that the known routes are closed, and names what is held by text. A real package run still needs the Investors' settings rule (#79 / #77 A1), and it is 1.1 work.
{% endraw %}

</div>
