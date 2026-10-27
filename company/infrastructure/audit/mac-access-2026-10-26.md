---
layout: "default"
title: "Mac mini access audit (T-0241)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/mac-access-2026-10-26.md</code></span><span>2026-10-26</span></div><h1>Mac mini access audit (T-0241)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Odalys, 2026-10-26 20:09 ET (committed 818dc87b). Asked by an Investor on #41 (c6430213838, 19:58 ET): which settings on the Mac mini hinder work, and the full list to enable so the company has complete access, apps included. Read-only: no system setting was changed and no sudo command was run.

## Method

- **Transcripts.** 163 files: 32 live streams in `ops/runs/*.jsonl`, 123 archived streams in `ops/runs-archive/*.jsonl.gz`, 8 in `~/.claude/projects/-Users-thecompany-itsthecompany/` (the rest of that folder holds only tool-result spills and subagent metadata). Range 2026-10-22 01:28 ET to tonight. Every tool result was parsed as JSON and deduplicated by tool_use_id. The scripts are in /tmp/odalys-mac/ (scan.py: refusals and error patterns; uses.py: commands used). They are not committed.
- **Logs.** `ops/runs/supervisor.log` (2,764 lines), `ops/runs/launchd.log` (856), `ops/runs/watch-wake.log` (295), `log/sudo.log` (2 lines), `log/posture.jsonl`, `ops/posture.json`, `log/software.md`, and `ops/usage.json` (148 runs, 14 denials recorded).
- **Current state.** Read with `sw_vers`, `id`, `DevToolsSecurity -status`, `xcodebuild -checkFirstLaunchStatus`, `xcodebuild -license check`, `xcrun simctl list`, `pmset -g`, `pmset -g sched`, `fdesetup status`, `defaults read /Library/Preferences/com.apple.loginwindow`, `netstat -an` (listening ports), `security list-keychains` / `show-keychain-info`, `gh auth status`, `git config credential.helper`, the two LaunchAgent plists, and the process ancestry of this session.
- **Not readable.** The company can't read the privacy permission database, which records who holds Full Disk Access, Accessibility, Automation, Screen Recording, Developer Tools and App Management. macOS requires Full Disk Access to read it, and the company's own security guard (rules/hooks/security-guard.py) refuses any command that names it. The guard refused my scan script twice tonight for that reason; those are the 2 "changes privacy permissions" refusals below. Full Disk Access was tested indirectly instead (finding 3). Accessibility, Screen Recording and Automation were **not** probed, because a probe raises a macOS consent dialog that no session can answer.

## Findings

1. **No macOS permission has blocked any work (n = 163 transcripts).** The raw pattern hits were 21, and all 21 are false. "Operation not permitted" ×3: `cp` setting times on /dev/null, the text of a quoted GitHub issue, and my own probe tonight. Apple-events code -1743 ×10: the digits occurred inside other numbers. "TCC" ×5: the word appeared in text. Keychain ×1, sudo ×1: my own grep. Simulator ×1: "Unable to boot device in current state: Booted", meaning it was already running. There were 0 Gatekeeper, 0 code-signing, 0 keychain and 0 "No space left" errors.
2. **What the company actually runs works without extra grants.** Bash calls: gh 850 (in 119 sessions), Playwright/site_browser 491 (61), xcodebuild/xc.sh 341 (40), simctl 82 (26), `simctl io … screenshot` 13 (6), osascript 31 (15), brew 13 (5; installs of xcodegen, ruby, python@3.13 all succeeded), pip install 22 (9). Every osascript call was `osascript -l JavaScript`, used as a JavaScript engine for site tests and as PDFKit for reading PDFs. None sent Apple events to another app, so none needed Automation.
3. **Full Disk Access: the session chain does not have it.** `ls "/Library/Application Support/com.apple.TCC/"` and `ls ~/Library/Mail` both return "Operation not permitted". The process chain is launchd → `/bin/bash tools/supervisor.sh` (LaunchAgent com.company.supervisor) → `claude` → `zsh`. macOS charges a permission to the launchd job's program, `/bin/bash`.
4. **Restart survival is the one real exposure. It has not happened yet.** FileVault is On. Automatic login is unset (no `autoLoginUser`), and macOS doesn't allow it while FileVault is on. Both company jobs are LaunchAgents (supervisor every 900 s, and the inbox watcher), and they run only inside a logged-in session. `pmset autorestart 1` means the Mac powers back on after a power cut, but it then waits at the FileVault unlock screen, and all work stops until a person unlocks it. An automatic security update that restarts the Mac has the same effect. Uptime is 5 days; the last boot was 2026-10-21 19:53 and wtmp shows 0 restarts since.
5. **Developer Mode (`DevToolsSecurity -status`) is disabled.** 0 lldb or Instruments runs in 163 transcripts, so nothing has been blocked yet. Attaching a debugger or Instruments to the pywidget app or its widget extension in the Simulator makes macOS ask for an administrator password in a dialog. A headless session can't answer it.
6. **Already in place, no action needed.** macOS 27.0.1 (26A434). The account `thecompany` is an admin (group 80) and in `_developer`. Xcode 27.1 (27A9275): first launch done (exit 0), licence accepted (exit 0). Simulator runtimes iOS 27.0, iOS 27.1 and tvOS 27.0, with iPhone 17e booted. Login keychain unlocked, no timeout. gh is logged in as itsthecompany with the token in the keyring. git uses osxkeychain. `pmset`: sleep 0, displaysleep 0, disksleep 10, autorestart 1, womp 1, powernap 1. Listening: 22 (Remote Login) and 5900 (Screen Sharing). Posture: firewall, FileVault, SIP, Gatekeeper and security updates all on, unchanged since 2026-10-22 01:13.
7. **Past blockers, all closed.** #27 (2026-10-23 00:50): the company asked for a headless browser (Chromium or `safaridriver --enable`). It was settled at 01:10 with Playwright and Chromium installed without sudo, and Safari automation was not needed. The supervisor's git push returned 403 ten times on 2026-10-22 between 03:01 and 03:48 ("Write access to repository not granted"); the GitHub token's access was fixed on Day 1. Neither was a Mac setting.
8. **Claude Code rules and hooks: 239 refusals, none of them macOS.**
   - Hooks, 190:
     - `protect-records.sh` ×145. By command shape, 32 were `git commit` whose message text named a protected folder, 1 actually moved or deleted a protected path, and 112 had an `rm`/`mv` somewhere in the command plus a protected path name elsewhere in it. A seeded sample of 6 of the 112 was false every time.
     - `security-guard.py` ×28: in-session `git pull`/`merge`/`rebase` 20, CLAUDE.md write 2, privacy-permission name 2 (mine, tonight), nested `claude -p` 2, investors/ 1, .claude/settings.json 1.
     - `model-guard.py` ×17: a task description without a kind tag.
     - By UTC day: 23 on 10-23, 48 on 10-24, 49 on 10-25, 65 on 10-26 and 10-27 (to tonight); 5 have no timestamp.
   - Auto-mode classifier, 43 (by UTC day below): Instruction Poisoning 7, Irreversible Local Destruction 6, Modify Shared Resources 4, External System Writes 4, Credential Exploration 4, Auto-Mode Bypass 3, Self-Modification 2, Remote Repoint 2, Unauthorized Persistence 2 (installing the inbox watcher LaunchAgent, #26), Bot Check Circumvention 2, Logging/Audit Tampering 1, Feature Flag Writes 1, PII Data Handling 1, Exfil Scouting 1, Stated Interface Sidestepped 1, Create Public Surface 1, no reason given 1. By day: 8 on 10-22, 21 on 10-23, 6 on 10-24, 3 on 10-25, 5 on 10-26.
   - Permission rules, 6:
     - the built-in removal safety check on `rm -f $D/*` (variable target) ×2;
     - a read of investors/allowlist.md auto-denied with no one to answer the prompt (`--permission-prompts none`) ×3;
     - `git push --force` (deny rule in .claude/settings.json) ×1.

## The list (posted to #41 at 20:09 ET: c6430371961)

### A. Settings the Investors can enable


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: A. Settings the Investors can enable, scrolls sideways" data-n="1" style="--tw:2280px" markdown="1">

| # | Setting | Unblocks | Evidence | Where / command | Add | Risk | Recommendation |
|---|---|---|---|---|---|---|---|
| A1 | A way to unlock FileVault remotely after a restart | Work starting again after a power cut or an update restart, with no one at the Mac | Not seen yet (0 restarts since 10-21); exposure is certain (finding 4) | Planned restarts: run `sudo fdesetup authrestart` instead of Restart. Unplanned: keep Remote Login on (System Settings > General > Sharing > Remote Login). macOS 26 and later can unlock FileVault over SSH at the pre-boot screen; test once with `ssh thecompany@<the Mac's address>`. If it then stops at the login window, log in through Screen Sharing (on). | nothing | None added: FileVault stays on. authrestart keeps the unlock key in memory for one restart only. | Yes: test the SSH unlock once at a quiet hour |
| A2 | Developer Mode | lldb and Instruments (`xctrace`) on the pywidget app and widget extension in the Simulator: crash debugging, memory and CPU against the widget limits | Not seen yet (0 runs); needed for profiling | `sudo DevToolsSecurity -enable` | nothing (applies to the `_developer` group, which includes thecompany) | Low: this account's processes can be debugged by this account without a password prompt | Yes |
| A3 | Full Disk Access | Reading other apps' data folders (Mail, Messages, Safari, Time Machine, the privacy database) | 0 blocks in 163 transcripts; probe shows it is off | System Settings > Privacy & Security > Full Disk Access > + (Cmd-Shift-G to type a path) | `/bin/bash` and `[local folder]` | High: every bash script on the Mac gains it. The claude entry must be re-added after each Claude Code update, because the path holds the version | No; no task needs it |
| A4 | Accessibility, and Screen & System Audio Recording | Driving GUI apps by click and keystroke, and seeing the screen (Xcode's UI, Simulator by mouse, the desktop app's computer use) | 0 attempts. Screenshots use Playwright (491) and simctl (13), neither of which needs these | Privacy & Security > Accessibility; Privacy & Security > Screen & System Audio Recording | `/bin/bash`, the claude binary above, and `/Applications/Claude.app` if computer use is wanted | High: a session could click through System Settings and turn off the protections that Commandment 2 keeps on. The security guard reads only shell commands, so it would not see this | No |
| A5 | Automation (Apple events) | One app scripting another (Terminal → Xcode, Simulator, Finder) | 0 attempts; all 31 osascript calls were JavaScript-only | Can't be added in advance: macOS asks the first time, in a dialog someone has to click (on Screen Sharing). It then appears under Privacy & Security > Automation | the pair macOS shows | Medium, per app pair | No, until a task names an app |
| A6 | App Management | Updating or deleting apps in /Applications that another installer put there | 0 blocks; brew installs worked (13 calls) | Privacy & Security > App Management | `/bin/bash` | Medium: can replace any app | No |

</div>


### B. Settings the company must not ask for (Commandment 2)

- **Firewall** (on): the only filter on what reaches the Mac from the network.
- **FileVault** (on): protects the disk, including the GitHub token and keychain, if the Mac is taken. A1 works around the restart cost without turning it off.
- **SIP** (on): stops even admin processes from changing the system. A session with passwordless admin could otherwise rewrite the OS.
- **Gatekeeper** (on), including the Privacy & Security > **Developer Tools** list, which lets the listed apps' child processes skip Gatekeeper checks. 0 Gatekeeper blocks were seen.
- **Automatic security updates** (on): the Mac runs unattended around the clock, so patches can't wait for a person.
- **The Investors' personal accounts or browser sessions** (Apple ID, iCloud, email, a signed-in browser profile): the company works only through its own accounts, and signed-in pages stay with the Investors (#64).

### C. Claude Code permission rules, not macOS settings

All 239 refusals in finding 8 come from Claude Code: 190 hook refusals, 43 from the auto-mode classifier, and 6 from permission rules. None can be fixed in System Settings. The largest group, `protect-records.sh` with 145, is mostly false matches: by command shape, only 1 of the 145 moved or deleted a protected path, and a sample of 6 of the others was false every time. Changes to hooks, rules/ or the Claude Code settings go through the Investors' proposal process (#41 c6407113363), and under #65 they need an explicit "approve".
{% endraw %}

</div>
