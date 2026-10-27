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
{% endraw %}

</div>
