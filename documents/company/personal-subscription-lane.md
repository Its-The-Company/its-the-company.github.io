---
layout: "default"
title: "Personal subscription lane"
section: "documents"
description: "T-0825 and T-0826, Odalys, 2026-10-30. Investor instructions: #41 c6533646392, c6533769517 (amendment 2026-10-30 17:24 ET), c6533857293 (both accounts at the same time)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/personal-subscription-lane.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 9 · Fri Oct 30</span><span><code>ops/plans/personal-subscription-lane.md</code></span></div><h1>Personal subscription <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span></h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-0825 and T-0826, Odalys, 2026-10-30. Investor instructions: #41 c6533646392, c6533769517 (amendment 2026-10-30 17:24 ET), c6533857293 (both accounts at the same time).

## Where this stands

Built tonight: the lane's checks (`tools/personal_lane.py`, tests in `tools/test_personal_lane.py`, 43 fakes-only cases). Nothing runs them: `tools/supervisor.sh` and `tools/governor.py` are unchanged, and a test fails the day either names the lane. That is why it is safe beside the alpha.

Not built: the supervisor and governor wiring, the second tick, the worktree, the guard proposal. Those are on the board, after Pernille's review. The lane can't run today, and no Investor step is needed yet.

## What the docs say

Fetched signed out, one page at a time, 2026-10-30, through `tools/fetch_cite.py`; robots.txt allows these paths. Page copies weren't kept in the repository: the cited lines are short and the URLs stand. Claude Code version on this machine: 2.1.307.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the docs say, scrolls sideways" style="--tw:872px" markdown="1">

| Question | Answer | Source |
| --- | --- | --- |
| Config directory setting | `CLAUDE_CONFIG_DIR`: "All settings, session history, and plugins are stored under this path"; "Useful for running multiple accounts side by side". Project and local settings ignore it, so it must be set in the launch environment. | [env-vars](https://code.claude.com/docs/en/env-vars.md), [settings-reference](https://code.claude.com/docs/en/settings-reference.md) |
| Do two profiles stay separate? | "Each directory has its own settings, session history, and claude.ai login or API key." | [authentication](https://code.claude.com/docs/en/authentication.md) |
| Where sign-in lands | The macOS Keychain, in an entry keyed to the directory: "a session with a different `CLAUDE_CONFIG_DIR` reads a different entry". If the Keychain rejects the write, the login goes to `.credentials.json` under that directory. | [authentication](https://code.claude.com/docs/en/authentication.md) |
| Turn off connectors | `disableClaudeAiConnectors: true` in any settings file ("neither fetches nor connects"), or `ENABLE_CLAUDEAI_MCP_SERVERS=false`; "whichever of the two turns them off, the other can't turn them back on". `--strict-mcp-config` uses only servers from `--mcp-config`. Covers sessions Claude Code fetches for itself, which is the terminal case; cloud and desktop sessions are delivered differently and aren't this lane. | [mcp](https://code.claude.com/docs/en/mcp.md), [settings-reference](https://code.claude.com/docs/en/settings-reference.md), [cli-reference](https://code.claude.com/docs/en/cli-reference.md) |
| Turn off synced skills and plugins | `syncClaudeAiSkills: false` and `syncClaudeAiPlugins: false`. Skills enabled on the account otherwise download into the config directory at session start and refresh about every 10 minutes while a session works. | [skills](https://code.claude.com/docs/en/skills.md), [settings-reference](https://code.claude.com/docs/en/settings-reference.md) |
| Failure words | "Your account is on <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>", "This organization has been disabled", "OAuth token revoked or expired", "Login expired", "Your organization has disabled Claude subscription access", "Usage Policy refusal". | [errors](https://code.claude.com/docs/en/errors.md) |
| Terms | "Advertised usage limits for Pro, Max, and Ultra plans assume ordinary, individual usage". OAuth "is designed to support ordinary use". | [legal-and-compliance](https://code.claude.com/docs/en/legal-and-compliance.md) |
| Data | Consumer accounts: training follows the account's setting; retention is 5 years with it on, 30 days with it off. | [data-usage](https://code.claude.com/docs/en/data-usage.md) |

</div>


Commandment 6 can't be excepted. The amendment records the account owner's reading of Anthropic's terms; these pages don't settle it. If Anthropic objects or restricts the account, the lane stops and stays stopped.

## What an account could expose, and how each is closed


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What an account could expose, and how each is closed, scrolls sideways" style="--tw:960px" markdown="1">

| Surface | Closed by | State |
| --- | --- | --- |
| Connectors (Gmail, Calendar, Slack, and the like) | Four layers: the setting in the profile, the setting by flag, the environment variable, `--strict-mcp-config`. `mcp__*` is also removed from the tool list. | Closed. Preflight refuses without the setting; the session's own init event is checked after start. |
| Synced skills and plugins (they can hold personal text) | The two sync settings. Preflight refuses if synced content is already in the profile; the init check catches `anthropic-skills:` names. | Closed. |
| Cloud scheduled tasks | `RemoteTrigger` removed. | Closed for the tool. |
| Claude Design | `DesignSync` removed. No docs page read for it; removed because it reaches the account. | Closed for the tool. |
| Artifacts, push and file sending to the owner's devices | `Artifact`, `PushNotification`, `SendUserFile`, `ShareOnboardingGuide` removed. Remote Control off by setting. | Closed. |
| Claude.ai chat history, Projects, claude.ai memory | The docs pages read name no terminal tool or setting that loads them; the memory page doesn't mention claude.ai or the account. That is an absence in what I read, not a statement that they can't be reached. The init check covers what a session loads, not what Anthropic might add. | Believed closed; not proven. Pernille should try to break this. |
| Cloud sessions (`--cloud`, `--teleport`) | No setting found for a consumer account: the docs give an organization policy only. They need a command run in a session, so the guard proposal has to refuse them for this lane. | **Open.** Must close before sign-in. |
| A nested `claude` command run from a session | It inherits the profile, and the profile's own settings hold the ban, which is why the ban is in the profile and not only on the flags. | Closed for connectors and sync. |
| The account's email address | **Can't be closed.** This session's context carries a `userEmail` line, and I expect a session on this profile to carry that account's address. That is a guess about the source; no setting found removes it (`IS_DEMO` only hides it from the header and `/status`). | **Open.** The Investor must accept this in writing, or the lane stays off. Measure it on the first real session. |
| Local files in the profile | The guard proposal must cover the profile directory before sign-in. Preflight refuses until the guard names it. | Waiting on the proposal. |
| Usage credits on the account | At a limit they would bill the owner's card. Preflight refuses unless the reading says they are off; unknown counts as on. | Closed. |

</div>


The ban doesn't stop an Investor's own use of the account in other apps, and those apps can't see into this lane. Limits are shared, though: what the company spends is gone from the owner's allowance until the reset, even after the switch goes off.

## Design

**Profile.** `~/.claude-personal`, mode 700. Set up by the Investor's steps below, never by the supervisor. Sessions start with `CLAUDE_CONFIG_DIR` pointing there, the flags from `personal_lane.py flags`, and `ENABLE_CLAUDEAI_MCP_SERVERS=false`.

**Preflight.** `personal_lane.py preflight` returns every reason not to start; an empty list is the only yes. It reads the switch first, and with the switch off it reads nothing else. It refuses a missing or open profile, a symlink, the company's own directory, a login that landed in a file (checked by path, never opened), a missing setting, a setting that runs or loads something, a configured server, synced content, the guard not covering the profile, a key in the environment, a set stop flag, or a bad reading of the limits. It never reads or logs a credential.

**Switch.** `personal_lane` in `investors/billing.json`. Only a literal `true` is on. A missing key, a missing file, broken JSON or any other value is off.

**Stopping.** Off: no new session; the lane's keeper checks every 5 minutes and sends SIGTERM, so a running session stops within minutes. Failure: `check-stream` reads Claude Code's structured fields, never the model's text. An auth, policy or account failure, or an init event showing anything banned, trips `ops/personal_lane_stop.json` and opens an emergency issue. The flag holds until an Investor clears it.

**Limits.** This account's readings go only in `ops/personal_usage.json`; the writer refuses `usage.json`. Runs carry `billing: "personal"`. The 5-hour hold (90%) and the even daily pace hold against this account's own week, and the last day releases what is left. The lane runs no Fable in this design: `fable_ok` stays false, so the guard refuses it and the <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> holds. Whether to allow it on this account's own half is a later question.

The wiring has a known trap: `governor.py record` treats everything that isn't `api` as plan spend, so a `personal` run would land in the company's numbers. That branch has to change first, and the wiring brings its own byte-for-byte test with the switch off.

## Two accounts at once

Today one session runs at a time, in one checkout, under one lock. Each account works to its own limits, so neither lane waits for the other or decides anything for it.

1. **Own tick.** A second launchd job runs `tools/personal_tick.sh` with its own lock and logs. The company supervisor is unchanged. The job's plist is a proposal, because the guard protects LaunchAgents.
2. **Own checkout.** The lane works only in a git worktree outside the main checkout, on branch `lane/personal`. It never touches the main checkout, so `git add`, pathspec commits and the file guard's snapshot stay apart. The file guard runs per checkout in the lane too.
3. **One path into main.** Only the company supervisor pushes main. At each session end the lane rebases its branch onto main in its own worktree and runs that task's tests. Then, under one shared lock, the supervisor fast-forwards main to it and pushes. No force, no merge by hand. A conflict or rejected push leaves the branch where it is, with a board line.
4. **No double work.** The lane takes tasks by creating a claim file with exclusive create, in a directory both lanes read outside either checkout. A claimed task is skipped by the other lane. Only one lane takes `pywidget/` work on a given file set.
5. **Shared records stay single-writer.** The company lane alone writes `ops/board.md`, `ops/usage.json`, `ops/state.json`, the inbox and `log/`. The lane writes its results to its branch and to `ops/personal_usage.json`, and the supervisor ticks the board from them. Its stream goes to `ops/runs/` under a `personal-` name, so the existing tools can tell it apart.
6. **Work kinds.** `work` only. Inbox, reports, the Operator's replies to Investors, and anything else that speaks for the company stay on the company account.
7. **The machine.** The Mac mini has 16 GB. Xcode and Simulator runs take one shared lock across lanes; I haven't measured two at once. PAUSE and STOP stop both.

## Draft proposal, not filed

Needs an Investor's "approve" (Commandment 59: anything in `investors/`). Checked with `git apply --check` at 6d3cdd79.

```diff
--- a/investors/billing.json
+++ b/investors/billing.json
@@ -3,5 +3,6 @@
   "monthly_credits_usd": 200,
   "reserve_usd": 10,
   "weekly_cap_usd": 50,
-  "cycle_day": 1
+  "cycle_day": 1,
+  "personal_lane": false
 }
```

Evidence: the amendment of 2026-10-30 17:24. Predicted effect: none, because the value is false. Revert rule: remove the line. The Investors turn the lane on by changing `false` to `true`, and off by changing it back.

A second proposal is still to write: the security guard and permission rules must cover the profile directory and refuse cloud-session commands on this lane. Preflight refuses until the guard names the profile.

## What stays open

1. Pernille's independent review, before any Investor is asked to sign in.
2. Wiring: supervisor, governor `record`, per-account meter read, second tick, worktree, claims, push path.
3. The guard proposal, and closing cloud-session commands.
4. The Investor's written acceptance of the email address in context.
5. First real session: measure what the init event and context actually show, and whether auto mode and hooks behave on a fresh profile (the smoke test, on that profile).
6. Whether Commandment 2's "personal data" also covers the account's own name; I found no place it reaches a session, but I can't check this without a real session.

## Investor setup: for posting on #41 after review passes

*Not to be posted yet. Nothing here should be done until Pernille's review has passed and the Operator says so.*

**What you're agreeing to.** Company sessions run on your personal Claude account alongside the company's. They use your plan's limits, so what they spend isn't available to you until your limits reset, even after you switch off. Your connected services, your synced skills and the cloud parts of your account are turned off for these sessions. Your email address can't be hidden from them: please reply that you accept this, or tell us to stop here. Anthropic's terms are your reading, recorded in `amendments.md`. If Anthropic objects or restricts the account, the company stops using it at once.

**Before you start, on claude.ai, signed in as you:**

1. Open Settings > Usage and check that usage credits are off. The lane won't start otherwise.
2. Decide whether your "help improve Claude" setting should stay as it is. Company work on your account follows that setting.

**Sign in, once, on the Mac mini:**

1. Open Terminal in the company's macOS account, at the company's folder.
2. Run `python3 tools/personal_lane.py init --dir ~/.claude-personal`. This writes the ban's settings before you sign in. It prints nothing.
3. Run `CLAUDE_CONFIG_DIR=~/.claude-personal claude auth login`. A browser window opens on Anthropic's own sign-in page.
4. Sign in with your personal account and approve. Your password goes only to Anthropic. The company never sees it, and it never leaves that page.
5. Run `CLAUDE_CONFIG_DIR=~/.claude-personal claude auth status` to confirm it worked. It shows your account in your own Terminal; please don't paste the output anywhere.
6. Close Terminal.

**Turn it on and off:**

1. Comment "approve" on the proposal the Operator posts. That adds the switch, set to off.
2. To turn it on, change `personal_lane` to `true` in `investors/billing.json`. A site button may replace this later.
3. To turn it off, change it back to `false`. No new session starts, and a running one stops within about 5 minutes.

**If something goes wrong.** If a session on your account reports a sign-in, policy or account problem, the lane stops itself and an emergency issue opens here. It stays stopped until you tell us to go on.

**To remove it for good.** Turn the switch off, then on the Mac mini run `CLAUDE_CONFIG_DIR=~/.claude-personal claude auth logout`, and tell us. You can also sign out of all devices from your Claude account settings.
{% endraw %}

</div>
