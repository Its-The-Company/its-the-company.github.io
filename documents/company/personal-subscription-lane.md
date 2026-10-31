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

Built tonight: the lane's checks (`rules/personal_lane.py`, tests in `tools/test_personal_lane.py`, 43 fakes-only cases). Nothing runs them: `tools/supervisor.sh` and `tools/governor.py` are unchanged, and a test fails the day either names the lane. That is why it is safe beside the alpha.

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
| Cloud sessions (`--cloud`, `--teleport`) | No setting found for a consumer account: the docs give an organization policy only. They need a command run in a session, so the security guard allows only a short known-good list of Claude Code commands. | Closed for commands the guard can read. |
| A nested `claude` command run from a session | It inherits the profile, and the profile's own settings hold the ban, which is why the ban is in the profile and not only on the flags. | Closed for connectors and sync. |
| The account's email address | **Can't be closed.** This session's context carries a `userEmail` line, and I expect a session on this profile to carry that account's address. That is a guess about the source; no setting found removes it (`IS_DEMO` only hides it from the header and `/status`). | **Open.** The Investor must accept this in writing, or the lane stays off. Measure it on the first real session. |
| The login token on the Mac | It lands in the macOS Keychain of the account that signs in, which is the company's macOS account, `thecompany`, the account every company process runs as. Mode 700 on the profile folder does nothing between processes of one user. The company's guards keep sessions from it; macOS doesn't. A second macOS user, made by an Investor, is the only option that puts the operating system between them. | **Open.** The Investor chooses before any sign-in: accept this in writing, or a second macOS user. |
| Local files in the profile | The guard proposal must cover the profile directory before sign-in. Preflight refuses until the guard names it. | Waiting on the proposal. |
| Usage credits on the account | At a limit they would bill the owner's card. Preflight refuses unless the reading says they are off; unknown counts as on. | Closed. |

</div>


The ban doesn't stop an Investor's own use of the account in other apps, and those apps can't see into this lane. Limits are shared, though: what the company spends is gone from the owner's allowance until the reset, even after the switch goes off.

## Design

**Profile.** `~/.claude-personal`, mode 700. Set up by the Investor's steps below, never by the supervisor. Sessions start with `CLAUDE_CONFIG_DIR` pointing there, the flags from `personal_lane.py flags`, and `ENABLE_CLAUDEAI_MCP_SERVERS=false`.

**Preflight.** `personal_lane.py preflight` returns every reason not to start; an empty list is the only yes. It reads the switch first, and with the switch off it reads nothing else. It refuses a missing or open profile, a symlink, the company's own directory, a login that landed in a file (checked by path, never opened), a missing setting, a setting that runs or loads something, a configured server, synced content, the guard not covering the profile, a key in the environment, a set stop flag, or a bad reading of the limits. It never reads or logs a credential.

**Switch.** `personal_lane` in `investors/billing.json`. On takes two literal `true`s: the file in this checkout, and the same file as committed on main at origin, read from a fetch made for that one read. Off takes either one. A missing key, a missing file, broken JSON, any other value or a read that can't be made is off. With the checkout's file off, no fetch is made. So a commit at origin turns the lane off with no pull, and on lands at the next pull.

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

## Several accounts

T-0828, first slice, Odalys, 2026-10-31. Amendments of 2026-10-31 10:50, 10:52 and 10:55. Two accounts today, built for more; each off by default, each with its own sign-in and its own written answer. Both can run at once, each to its own limits. Where this section and the ones above differ, this section stands.

### 1. Names and places


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 1. Names and places, scrolls sideways" style="--tw:804px" markdown="1">

| Thing | For account `a` (`b` the same) | Note |
| --- | --- | --- |
| Account id | `a` | One lower-case letter, listed in `ACCOUNTS` in `rules/personal_lane.py`. Not initials. Which Investor holds which letter is said only on #41 and in the private label file below. A third account is one more letter, two more keys and its own sign-in; no code branches on a letter, and a test runs three ids to prove it. |
| Switch | `personal_lane_a` in `investors/billing.json` | Literal `true` is on. Missing or anything else is off. |
| Mode | `personal_lane_a_lock_in` in the same file | Literal `true` is Lock In. Missing or anything else is Spread, the stricter one. |
| Profile folder | `~/.claude-personal/a`, mode 700 | `CLAUDE_CONFIG_DIR`. The Keychain entry is keyed to this path, so each account has its own entry. The parent `~/.claude-personal` is mode 700 and holds no login. |
| State folder | `~/.claude-personal/state/a/` | Made by the tick, not by the Investor's steps. Same path from every checkout, so nothing here depends on which tree the code runs in (M5). Outside the repository, so it never reaches GitHub (L5). |
| Meter | `state/a/usage.json` | One reading, marked `billing: "personal"` and `account: "a"`. A reading with the wrong account or no mark is refused (H7). `write_meter` keeps its refusal of `usage.json`. |
| Stop flag | `state/a/stop.json` | A trip on `a` stops `a`, not `b`. First reason stands. |
| Run rows and streams | `state/a/runs.jsonl`, `state/a/streams/` | One row a session: type, exit, cost, turns. Streams stay here and not in `ops/runs/`, so no company tool picks them up. The cost: a company session can't read a lane stream; it reads the row and `status`. |
| Worktree, branch | `~/company-personal/a`, branch `personal/a` | The name `lane` is taken on the board by another feature. |
| Tick | launchd job `com.company.personal-tick.a`, running `tools/personal_tick.sh a` | One job per account, own lock in the state folder. The plist is a proposal. Refuses to run from inside a session. |
| Keeper | `rules/personal_lane.py keep --account a --pid PID` | T-0831's `keep`, with the account's key. Each pass also reads PAUSE and STOP (`ops/paused`), the stop flag, and the two synced folders; a find trips the flag (M3, M4). |
| Claims | `personal-claims/T-0123` under git's common directory | Exclusive create. Every checkout finds it with `git rev-parse --git-common-dir`; it sits outside every tree, and `git add -A` can't reach it. |

</div>


**<span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> with T-0831's reader.** The reader takes a key and answers one question: is this key a literal `true` in the checkout's file and on `origin/main`? On takes both; off takes either. Both per-account keys are top-level booleans, so this design adds no second reader and no nested shape. A word for the mode, such as `"spread"`, would have needed one. `switch_on(key=SWITCH_KEY)` keeps its default; `SWITCH_KEY` stays in the file as that default, no running path uses it, and the key `personal_lane` is not added to `billing.json`. Every lane call takes `account`, and `None` keeps today's single-profile behaviour, so T-0831's tests stand unchanged. An id outside `ACCOUNTS` gets no key and reads as off.

**Modes.** Spread is the even daily share of this account's own week, the check `meter_refusals` already makes. Lock In skips that one check. The 5-hour hold at 90% and the weekly limit hold in both, as does one session at a time per account. The mode stays until an Investor changes it; it does not end at midnight as the company's Lock In does, because a dated value wouldn't fit the reader. If either Investor wants it to end at midnight, that is a small change, and it should be said before the build.

**The CLI.** The subcommand comes first: `status --account a`, never `--account a status`. Sessions may run `status`, `preflight`, `flags` and `check-stream`, and that list reads the first word after the file name, so it doesn't change. `meter`, `trip`, `clear`, `init` and `keep` stay closed to sessions.

**Clearing a stop.** "Only an Investor's word clears it" gets code (M2): an Investor replies `LANE CLEAR a` on the emergency issue, and `tools/inbox.py` runs `clear --account a` between sessions, with no model call. A company session can't clear it.

**Usage.** One line, "Usage added by personal accounts", in percentages of the company's weekly limit (`weekly_budget_usd`), today and this week, both accounts summed, no account named: "Usage added by personal accounts: equal to 1.2% of the plan's weekly limit today and 6.0% this week". Commandment 39 outranks this plan's first text (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> and Operator, T-0874): a report's Usage is in percentages, never dollars. Dollars at plan rates stay in the file only. Nothing about a personal run enters `ops/usage.json`: `governor.py record --billing personal` branches at its first line and writes only `state/a/runs.jsonl`. `governor.py personal-total` sums the rows into `ops/personal_added.json`, called from the supervisor's one hook; it prints the line or nothing and exits 0. It is the one committed file. It holds daily totals and no percentages of anyone's own plan. No rows, no file. The setup text says this total is published. `tools/ops_metrics.py` shows personal runs apart: a task finished on a personal account must not read as a free task in the cost-per-finished-task line. Its cost counts there, in `--pace`, and in `tools/metric_series.py`'s `cost_per_task`; `finished_per_100usd` leaves such a task out, since its cost is in no company session.

**The button (T-0847).** The page and the built site hold only `a` and `b`. The names come from `investors/personal_accounts.json`, shaped `{"a": "<label>", "b": "<label>"}`, read by the Contents API with the Investor's saved token after the page has loaded. An Investor commits that file by hand: a proposal's diff shows on Company > Infrastructure, so it never goes through the applier. No file, and the button says "Account a". A test greps the built site for the labels. Enabling writes the account's two keys in one commit.

### 2. Is a second folder covered? By reading; the guard was not asked

Yes, if the folders nest as above. No guard change and no settings change for a second account.

1. **The guard.** `PROFILE` is `.claude-personal`, and its checks compare the first folder under the home folder, so everything inside is covered at any depth: `a`, `b`, `state`, and a third letter.
2. **The deny rules.** `Read(~/.claude-personal/**)` and `Edit(~/.claude-personal/**)` are in `.claude/settings.json` and in `REQUIRED_DENY`. `**` covers the same folders. `REQUIRED_DENY` doesn't change.
3. **`DEFAULT_PROFILE`.** Stays `~/.claude-personal`, now the parent. `profile_dir(env, account)` joins the letter. `guard_cases(profile)` already takes the path, so preflight asks the real guard on that account's own path.
4. **A folder beside the first would not be covered.** It would need `PROFILE` to become a list, two more deny rules and an Investor trip. That is why they nest.
5. **The stop flag and the meter.** The guard protects two exact file names in `ops/`. Per-account files beside them wouldn't be covered; in the state folder they are, by point 1. The two old names stay protected and unused.
6. **`check_init`** gets the account's own folder, so a session on `b` can't pass as `a`.

T-0828's guard proposal still carries one item from the worktree design. It is not about folders. It is in the held folder, Commandment 42, and goes on the same Investor trip.

### What changes in "Two accounts at once"

- **Item 3, the path into main.** The rebase moves into the supervisor's own step. Main moves with every company commit, so a branch rebased at session end is stale by the time the supervisor looks, and with sessions back to back it could stay stale. Between sessions, holding `ops/.lock`, `tools/personal_land.sh` takes each ready branch in turn: rebase in its worktree, run that task's tests, `merge --ff-only`, push. No force. A conflict or a red test leaves the branch and main as they were, with a board line. The time this adds to a tick is unmeasured.
- **Item 4, claims.** A lane takes only board lines marked `lanes ok`. The Operator adds that mark while planning, so it holds when the company is at its limit and no session is running. `tools/board.py` hides a claimed line from the runnable view. A company session that starts a `lanes ok` line claims it first. A claim older than the session limit is stale.
- **Item 5, records.** Streams and readings are in the state folder, as above.
- **Items 4 to 6 of "What stays open"** are per account. Each Investor answers for their own account, and each account's first session is measured on its own. If an Investor picks the second macOS user, that account's setup stops until it is planned; the other account is not held up.
- **Fable.** The tick sets `COMPANY_BILLING=personal` and `COMPANY_FABLE_OK=false`, so the guard's Fable refusal holds as designed.

### The split

Order: T-0831 lands, then T-0877, then T-0878. T-0874, T-0875 and T-0876 can start now: they touch different files, none needs `rules/personal_lane.py`, and each lands inert. T-0833 stays the gate on any sign-in ask. T-0828's own rule on the alpha commit still applies to landing.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: The split, scrolls sideways" style="--tw:1208px" markdown="1">

| Line | What | Files | Needs the lane file | Proof with the switch off |
| --- | --- | --- | --- | --- |
| T-0874 | `record`'s billing branch, the per-account meter read, the usage line | `tools/governor.py`, `tools/ops_metrics.py`, usage page and report facts | No, starts now | `tests/governor_personal_test.py`: goldens made at the base commit before the first edit; plan and api runs give byte-equal `usage.json`, `state.json` and stdout; a personal run leaves both files byte-equal; no rows, no line |
| T-0875 | Claims, the runnable view, the Xcode lock | `tools/personal_claims.py`, `tools/board.py`, `tools/xc.sh` | No, starts now | `tests/personal_claims_test.py`: with no claims folder, every `board.py` view and `xc.sh`'s summary are byte-equal to goldens on a fixture |
| T-0876 | Worktree set-up, the single push path, the supervisor's one hook | `tools/personal_land.sh`, `tools/supervisor.sh` | No, starts now | `tests/personal_land_test.sh`: the tick in a test repo with and without the hook gives the same tree hash, pushes and log, times masked |
| T-0877 | Accounts, keys, modes and the state root in the lane; H7's lane half, H8, M2, M3, M4, M5, L5; finding 4 of the T-0831 stop, moving the Inert test | `rules/personal_lane.py`, `tools/test_personal_lane.py`, by proposal | Yes, after T-0831 | `tests/personal_lane_test.py`: `account=None` answers as today on every existing case; every key off or absent reads nothing past the switch |
| T-0878 | The tick, keeper start, meter run, emergency issue, `LANE CLEAR`, the plist template; the whole-lane off test | `tools/personal_tick.sh`, `tools/inbox.py`, plist text as a draft in this file | Yes, after T-0877 | `tests/personal_off_test.sh`: all keys off, a stand-in `claude` records zero calls, and the main checkout's tree hash and every company file are byte-equal after a full tick and a tick of each account |
| T-0879 | The Investor trip: billing keys, plists, guard proposal, the chair's line | Proposals only | After T-0877 | The draft keeps every key `false`; `git apply --check` at filing |
| T-0880 | Pernille's review of the wired lane, before either switch goes on | Review file | After T-0878, T-0879 | Runs `tests/personal_off_test.sh` herself |

</div>


## Draft proposal, not filed

Needs an Investor's "approve" (Commandment 59: anything in `investors/`). Checked with `git apply --check` at c60e98c4. T-0879 files it.

```diff
--- a/investors/billing.json
+++ b/investors/billing.json
@@ -3,5 +3,9 @@
   "monthly_credits_usd": 200,
   "reserve_usd": 10,
   "weekly_cap_usd": 50,
-  "cycle_day": 1
+  "cycle_day": 1,
+  "personal_lane_a": false,
+  "personal_lane_a_lock_in": false,
+  "personal_lane_b": false,
+  "personal_lane_b_lock_in": false
 }
```

Evidence: the amendments of 2026-10-30 17:24, 2026-10-31 10:50, 10:52 and 10:55. Predicted effect: none, because every value is false. Revert rule: remove the four lines. The Investors turn an account on by changing its `false` to `true`, and off by changing it back.

The security guard and permission rules cover the profile directory and refuse cloud-session commands. Preflight asks the real guard on the profile's own path and refuses unless every case answers as it must.

## What stays open

1. Pernille's independent review, before any Investor is asked to sign in.
2. Wiring: supervisor, governor `record`, per-account meter read, second tick, worktree, claims, push path.
3. The guard proposal, and closing cloud-session commands.
4. The Investor's written acceptance of the email address in context, and the choice on where the login token sits: accept it in the company's macOS account, or a second macOS user made by an Investor. A second user changes the sign-in steps and the wiring, and neither has been planned yet.
5. First real session: measure what the init event and context actually show, and whether auto mode and hooks behave on a fresh profile (the smoke test, on that profile).
6. Whether Commandment 2's "personal data" also covers the account's own name; I found no place it reaches a session, but I can't check this without a real session.

## Investor setup: for posting on #41 after review passes

*Not to be posted yet. Nothing here should be done until Pernille's review has passed and the Operator says so.*

**Two accounts, one letter each.** Each of you sets up your own account, and neither depends on the other. The Operator's post on #41 says which letter is yours, `a` or `b`. Wherever these steps say `a`, use your letter. Each account is off until its own owner turns it on, and each answers the questions below for itself: one Investor's reply doesn't cover the other's account. Both accounts can run at the same time, each to its own limits.

**What you're agreeing to.** Company sessions run on your personal Claude account alongside the company's. They use your plan's limits, so what they spend isn't available to you until your limits reset, even after you switch off. Your connected services, your synced skills and the cloud parts of your account are turned off for these sessions. Your email address can't be hidden from them: please reply on #41 that you accept this for your account, or tell us to stop here. The company publishes one total, "Usage added by personal accounts", summed over both accounts, in dollars at plan rates. Your own percentages and readings stay on the Mac mini. Anthropic's terms are your reading, recorded in `amendments.md`. If Anthropic objects or restricts the account, the company stops using it at once.

**Where your login sits.** Your password stays with Anthropic. What stays on the Mac mini is a login token: signing in saves it in the macOS Keychain of the account you sign in from. In the steps below that is the company's macOS account, `thecompany`, the same account every company program runs under. So macOS doesn't keep the token apart from company sessions; the company's own guards do. We haven't tested whether macOS would ask before giving that entry to a program in the same account, because the test would mean touching your login. If you want macOS itself to keep them apart, an Investor can create a second macOS user for the lane. Only an Investor can do that, and it changes these steps. We'll ask you to choose one before any sign-in, and nothing below should be done until you have.

**Before you start, on claude.ai, signed in as you:**

1. Open Settings > Usage and check that usage credits are off. The lane won't start otherwise.
2. Decide whether your "help improve Claude" setting should stay as it is. Company work on your account follows that setting.

**Sign in, once each, on the Mac mini.** Each of you does this for your own account, on your own browser sign-in. The second person repeats all of it with the other letter.

1. Open Terminal in the company's macOS account, at the company's folder.
2. Run `python3 rules/personal_lane.py init --dir ~/.claude-personal/a`. This writes the ban's settings before you sign in. It prints nothing.
3. Run `CLAUDE_CONFIG_DIR=~/.claude-personal/a claude auth status`. It should say no one is signed in. If it shows any account, stop here and tell us: the two logins must stay apart.
4. Run `CLAUDE_CONFIG_DIR=~/.claude-personal/a claude auth login`. A browser window opens on Anthropic's own sign-in page.
5. Sign in with your personal account and approve. Check that the browser isn't already signed in to the other Investor's account. Your password goes only to Anthropic. The company never sees it, and it never leaves that page. The login token lands in the Keychain of this macOS account, as "Where your login sits" says.
6. Run `CLAUDE_CONFIG_DIR=~/.claude-personal/a claude auth status` to confirm it worked. It shows your account in your own Terminal; please don't paste the output anywhere.
7. Close Terminal.

**Turn it on and off.** Each account has its own switch and its own mode.

1. Comment "approve" on the proposal the Operator posts. That adds both accounts' switches, set to off, and both modes, set to Spread.
2. To turn your account on, commit `personal_lane_a` as `true` in `investors/billing.json` at GitHub. It lands at the company's next pull. The supervisor pulls at the start of each tick, every 15 minutes, and no tick starts while a session runs; a session can run up to 150 minutes. If the pull keeps failing, the lane stays off and says the switch is off while GitHub shows it on. A site button may replace this later; it will let you pick the account and the mode.
3. To pick the mode, set `personal_lane_a_lock_in`. `false` is Spread: sessions keep to an even daily share of your week. `true` is Lock In: no daily share, so one session at a time uses what is left of your week. Your 5-hour hold at 90% and your weekly limit hold in both. The mode stays as you set it until you change it; unlike the company's Lock In, it doesn't end at midnight.
4. To turn your account off, commit `personal_lane_a` as `false` at GitHub. No pull is needed. A change made only on the Mac stops the lane at once but may not last, because a pull can keep GitHub's version, so the off is a commit at GitHub. No new session starts, and a running one stops within about 5 minutes. The other account isn't affected.

PAUSE and STOP stop every account as well as the company.

**If something goes wrong.** If a session on your account reports a sign-in, policy or account problem, your account's lane stops itself and an emergency issue opens here. The other account keeps running. Yours stays stopped until you reply `LANE CLEAR a` on that issue, with your letter.

**To remove your account for good.** Turn your switch off, then in Terminal in the company's macOS account on the Mac mini:

1. Run `CLAUDE_CONFIG_DIR=~/.claude-personal/a claude auth logout`. Do this first: the Keychain entry is tied to the folder.
2. Run `CLAUDE_CONFIG_DIR=~/.claude-personal/a claude auth status` and check that it no longer shows your account. No login has been made on this profile yet, so we haven't seen this step on a real one. If it still shows your account, stop here and tell us.
3. Run `rm -rf ~/.claude-personal/a ~/.claude-personal/state/a`. This deletes your profile folder, its settings and session history, and your readings. With the folder gone, your account's lane can't start, whatever the switch says. The other account's folders stay as they are.
4. Tell us. You can also sign out of all devices from your Claude account settings.
{% endraw %}

</div>
