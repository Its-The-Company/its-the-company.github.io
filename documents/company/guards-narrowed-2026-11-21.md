---
layout: "default"
title: "Guards narrowed to illegal acts, real money, the allowlist and machine security (T-5549)"
section: "documents"
description: "Where I was unsure whether a rule is money or machine security, it is kept and marked unsure below."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/guards-narrowed-2026-11-21.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 31 · Sat Nov 21</span><span><code>ops/plans/guards-narrowed-2026-11-21.md</code></span></div><h1>Guards narrowed to illegal acts, real money, the allowlist and machine security (T-5549)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-21 23:4x ET. From an Investor's two messages typed into a Claude session on the Mac mini at about
11:40 PM ET (recorded in `log/rulings.md` and the Handbook's Standing Investor instructions this commit, through
`tools/ruling_record.py`, which now takes a typed-in source). Earlier the same Investor asked to remove the guards
"except for guards that prevent illegal behavior or real-world spending".

Kept, by anyone's word:
- (a) illegal acts, and charter sections 6, 7 and 11 (bans, high-risk areas, human checks);
- (b) real money: API keys and credits, `apiKeyHelper`, `rules/api-settings*.json`, `billing=api`, the
  `ANTHROPIC_API_KEY`/`ANTHROPIC_AUTH_TOKEN`/`ANTHROPIC_BASE_URL` family, `api.anthropic.com`, purchases, top-ups and
  overage. A `claude` start still refuses when it would run on an API key instead of the subscription;
- (c) `investors/allowlist.md` and who may approve, Investor-only;
- (d) machine security: SSH, Screen Sharing, Remote Management, Keychain secret reads, root shells, firmware, TCC,
  quarantine, printing tokens.

Where I was unsure whether a rule is money or machine security, it is kept and marked **unsure** below.

## How each removal reaches main (and why this slice does not edit `rules/` itself)

Three roads, because the files sit behind different locks:

1. **Claude Code settings** (`.claude/settings.json`): the Investors paste them (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> 2 of 11-21). One issue,
   #341, carries the whole files: stage A, safe to paste now, and stage B, to paste after road 2 is applied (stage B
   drops deny rules that `rules/personal_lane.py`'s `REQUIRED_DENY` still demands; pasted first, it would stop every
   personal <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>). `~/.claude/settings.json` needs no change. The personal profiles' settings
   (`~/.claude-personal/*`) were not read: the deny rules keep them from sessions.
2. **The guard files** (`rules/**`, `rules/hooks/*`): the settings deny `Edit` on them in every checkout by path,
   and the hooks are the permission layer of the session doing the work. A session editing them from a copy whose
   path the deny list doesn't name would be going round that deny, not through it. So the changes go as one
   proposal with a diff and the guards' own tests (the road of the 2026-11-18 7:16 PM ruling, #327 c6995581028),
   applied by `tools/apply_proposal.py` after one "approve". Board line: T-5549 slice 2.
3. **Company tools** (`tools/*`): most of their Investor-owned refusals read `rules/file-guard.sh` PATHS, so they
   narrow by themselves when road 2 narrows PATHS. The few with their own copy of the list follow in slice 3,
   landed after road 2, so no tool lets through what a guard still restores.

Order: stage A settings (any time) -> slice 2 proposal approved and applied -> stage B settings -> slice 3.
At no step is a kept guard (a) to (d) lighter than today.

## Inventory

`keep` = stays as it is; `narrow` = the rule stays for the kept part only; `remove` = goes. Road = 1, 2 or 3 above.

### rules/hooks/security-guard.py (PreToolUse, Bash and Monitor)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: rules/hooks/security-guard.py (PreToolUse, Bash and Monitor), scrolls sideways" data-n="4" style="--tw:1012px" markdown="1">

| Rule (refusal text) | Class | Verdict | Road |
|---|---|---|---|
| firewall, packet filter, FileVault, Gatekeeper, SIP, automatic updates off | charter ban, (d) | keep | - |
| Remote Login / remote Apple events / wake on network (`systemsetup`) | (d) | keep | - |
| SSH or Screen Sharing (`launchctl` sshd, screensharing, RemoteDesktop) | (d) | keep | - |
| Remote Management (`kickstart`) | (d) | keep | - |
| users or the admin group (`dscl`, `sysadminctl`, ...) | (d) | keep | - |
| sudo, PAM, authorization database | (d) | keep | - |
| firmware, boot, configuration profiles | (d) | keep | - |
| privacy permissions (`TCC.db`, `tccutil`) | (d) | keep | - |
| quarantine flags (`xattr`) | (d) | keep | - |
| root shell (`sudo -s/-i`, `su`) | (d) | keep | - |
| Keychain secret reads and changes (`security find-*`, `dump-keychain`, `-i/-p`) | (d) | keep | - |
| "starts another Claude session outside the governor" (`claude -p`/`--print`) | not a-d | **narrow**: refuse only when the start names an API key or endpoint (`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_BASE_URL`, `apiKeyHelper`), `--settings rules/api-settings*.json`, or a `CLAUDE_CODE_USE_BEDROCK/VERTEX` provider | 2 |
| `git clean -x` "deletes ignored files" | **unsure** (ignored files include `ops/secrets.local`) | keep | - |
| Claude Code login, `setup-token`, `config set`, `mcp add`, plugins | (b) login can switch to an API key; MCP and plugins run code outside the hooks | keep | - |
| `api.anthropic.com` | (b) | keep | - |
| company sessions: `git pull/merge/rebase` (COMPANY_RULES) | not a-d | remove | 2 |
| PROTECTED_DIRS / PROTECTED_FILES writes (setup, rules, investors, .github, .claude/agents, commands, rules, hooks, output-styles; CLAUDE.md, CLAUDE.local.md, .mcp.json, settings, personal_lane_stop.json, personal_usage.json) | mixed | **narrow** to: `investors/allowlist.md` (c), `investors/billing.json`, `rules/api-settings*.json` (b), `rules/hooks/`, `rules/file-guard.sh`, `rules/posture.sh`, `rules/supervisor-keychain.sh`, `rules/personal_lane.py`, `rules/pkg_sandbox.py`, `.claude/hooks/`, `.mcp.json`, `.claude/settings*.json` (the carriers of a to d), `CLAUDE.md` (**unsure**: the only lock on sections 6, 7 and 11), `ops/personal_lane_stop.json` (**unsure**: some trips are for an API key) | 2 |
| HOME_PROTECTED (`~/.claude/settings*.json`, `~/.claude.json`, `~/Library/LaunchAgents`) | (b) settings and login; LaunchAgents **unsure** (d) | keep | - |
| SYSTEM_PROTECTED (`/etc/sudoers`, `/etc/pam.d`, managed settings) | (d) | keep | - |
| second pass: Claude Code started at all outside CLI_OK ("starts Claude Code outside the governor") | not a-d | **narrow** like `claude -p` above: any start allowed unless it names a key, an endpoint, a provider or `rules/api-settings*.json` | 2 |
| second pass: "points Claude Code at another profile" (`CLAUDE_CONFIG_DIR`) | **unsure** (a profile holds an account's credentials) | keep | - |
| second pass: "reaches the personal lane's profile" | (d) credentials | keep | - |
| second pass: "changes the personal lane's state" (`personal_lane.py` beyond LANE_OK) | not a-d | remove | 2 |
| second pass: "reads or copies the whole home folder" | (d) `.ssh`, Keychain files | keep | - |
| second pass: reads a secret (`.ssh`, `.appstoreconnect/private_keys`, `ops/secrets.local`) | (d) | keep | - |
| second pass: "prints the GitHub login's token" | (d) | keep | - |
| second pass: "nests commands deeper than the guard reads" | the reader's bound; without it every kept rule can be nested past | keep | - |
| second pass: writes from inside code to protected paths | follows PROTECTED_DIRS | narrow as above | 2 |
| `log_sudo` (logs every sudo) | not a refusal | keep | - |

</div>


### rules/hooks/model-guard.py (PreToolUse, Agent)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: rules/hooks/model-guard.py (PreToolUse, Agent), scrolls sideways" data-n="4" style="--tw:793px" markdown="1">

| Rule | Class | Verdict | Road |
|---|---|---|---|
| no Fable when `billing` is `api` | (b) | keep | - |
| no Fable past the week's allowance (`fable_ok`): past it the plan bills paid usage credits | (b) overage | keep | - |
| diaries and talk on Haiku only; weekly talk <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> | not a-d | remove | 2 |
| a work or inbox call must start with a kind tag | not a-d | remove (the usage page may still read the tag when present) | 2 |

</div>


### rules/hooks/config-guard.py (ConfigChange)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: rules/hooks/config-guard.py (ConfigChange), scrolls sideways" data-n="4" style="--tw:800px" markdown="1">

| Rule | Class | Verdict | Road |
|---|---|---|---|
| a settings file changed mid company session is ignored | (b) a settings change can add `apiKeyHelper`/`env`; settings are the Investors' to paste (ruling 2) | keep, **unsure** | - |

</div>


### rules/hooks/protect-records.sh (PreToolUse, Bash)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: rules/hooks/protect-records.sh (PreToolUse, Bash), scrolls sideways" data-n="4" style="--tw:1012px" markdown="1">

| Rule | Class | Verdict | Road |
|---|---|---|---|
| delete or move of `log/`, `story/`, `reports/`, `amendments.md` | **unsure**: the record of what was spent and decided (charter "records are true") | keep | - |
| delete or move of `rules/`, `setup/`, `investors/`, `CLAUDE.md` | mixed | **narrow** to the kept paths of the PROTECTED list above | 2 |

</div>


### rules/hooks/session-canary.sh (SessionStart)

Not a refusal: it marks that the hooks loaded, so a session that skipped them pauses the company. Keep; its file list
changes only if a hook file is renamed (none is).

### rules/file-guard.sh (the supervisor's restore after every session; tools/supervisor.sh step 11)


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: rules/file-guard.sh (the supervisor&#x27;s restore after every session…, scrolls sideways" data-n="4" style="--tw:1012px" markdown="1">

| Path restored | Class | Verdict | Road |
|---|---|---|---|
| `investors/allowlist.md` | (c) | keep | - |
| `investors/billing.json` | (b) | keep | - |
| rest of `investors/` (favorites.json, site/) | not a-d | remove | 2 |
| `rules/hooks/`, `rules/api-settings*.json`, `rules/file-guard.sh`, `rules/posture.sh`, `rules/supervisor-keychain.sh`, `rules/personal_lane.py`, `rules/pkg_sandbox.py` | carriers of (b) and (d) | keep | - |
| rest of `rules/` (amendment-check.py, build_agents.py, lookup.py, watchdog.sh, worker-rules.md) | not a-d | remove | 2 |
| `setup/` | not a-d | remove | 2 |
| `.github/` | `.github/workflows/` **unsure** (b): Actions minutes past the free quota are billed, and workflows hold secrets | keep workflows, remove the rest | 2 |
| `CLAUDE.md` | **unsure** (a): the only lock on sections 6, 7 and 11 | keep; other sections change through the applier | - |
| `CLAUDE.local.md`, `.claude/CLAUDE.md`, `.claude/agents`, `commands`, `rules`, `output-styles` | not a-d (ruling 1: files that let agents start agents) | remove | 2 |
| `.mcp.json`, `.claude/settings.json`, `.claude/settings.local.json`, `.claude/hooks` | (b), (d), and settings are pasted by the Investors | keep | - |
| `~/.claude/settings.json` risky keys (hooks, permissions, env, apiKeyHelper, ...) | (b) | keep | - |

</div>


### rules/posture.sh, rules/watchdog.sh, rules/supervisor-keychain.sh

posture.sh (firewall, FileVault, SIP, Gatekeeper, updates) is (d): keep. watchdog.sh only opens an Emergency when the
heartbeat stops; it refuses nothing: keep. supervisor-keychain.sh holds the API key path for `billing=api`: (b), keep.

### rules/personal_lane.py (the personal lane's checks)


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: rules/personal_lane.py (the personal lane&#x27;s checks), scrolls sideways" data-n="4" style="--tw:1012px" markdown="1">

| List or check | Class | Verdict | Road |
|---|---|---|---|
| `RISKY_SETTING_WORDS` (api, key, token, credential, secret, login, env, url, endpoint, provider, ...) | (b) | keep | - |
| `ALLOWED_KEY_SOURCES = ("none",)`, `apiKeySource` in the init event | (b) | keep | - |
| `ENV_NAMESPACES` (ANTHROPIC, AWS_, CLAUDE, GOOGLE_, VERTEX_) / `SAFE_ENV` | (b) keys and paid providers | keep | - |
| `BILLING_FILE`/`BILLING_MARK`, credits check | (b) | keep | - |
| `FIVE_HOUR_HOLD_PCT` 97 and the meter freshness checks | (b) overage past the plan | keep | - |
| `REQUIRED_DENY` | follows the settings | narrow to stage B's deny list | 2 |
| `REQUIRED_SETTINGS` / `REQUIRED_ENV` (claude.ai connectors and MCP servers off) | **unsure** (d): connectors run code outside the hooks | keep | - |
| `DENIED_TOOLS` (mcp, Artifact, RemoteTrigger, DesignSync, PushNotification, SendUserFile) | **unsure** (d) remote and outside reach | keep | - |
| `PROFILE_ENTRIES` (what may sit in the profile folder) | **unsure** (b): an unknown file there may be a key | keep | - |
| `ALLOWED_VERSION` pin (a new Claude Code version refused until reviewed) | not a-d | remove | 2 |
| `ALLOWED_TOOLS`, `ALLOWED_SKILLS`, `ALLOWED_COMMANDS`, `ALLOWED_PLUGIN_SOURCES` | not money | remove | 2 |
| `KNOWN_EVENTS`, `KNOWN_SYSTEM`, `BENIGN_ERRORS` ("a failure outside the known list") | not money | remove (an unknown event is logged, not a trip) | 2 |
| `guard_cases` (the lane checks the security guard refuses its rows) | follows security-guard | keep the rows of kept rules, drop the rest | 2 |
| `trip` / stop file "only an Investor's word clears it" | **unsure**: some trip reasons are a key source or billing | keep; trips whose reason is a removed list go with it | 2 |

</div>


### tools/


<div class="tbl" role="region" tabindex="0" aria-label="Table 7: tools/, scrolls sideways" data-n="4" style="--tw:975px" markdown="1">

| Tool | What refuses | Verdict | Road |
|---|---|---|---|
| tools/supervisor.sh step 11 | runs rules/file-guard.sh check | no change: narrows with PATHS | 2 |
| tools/supervisor.sh `billing=api` (`--settings rules/api-settings.json`), the billing alert | (b) | keep | - |
| tools/personal_tick.sh `owned_dirty` ("no session: an Investor-owned file ... changed", trip) | reads PATHS; its own `must` list (CLAUDE.md setup rules investors .github .claude/settings.json) | must list shrinks to what PATHS keeps | 3 |
| tools/personal_land.sh `owned`, `OWNED_MUST` | a notice since T-3751; same `must` list | as personal_tick.sh | 3 |
| tools/land_causes.py, tools/lane_landcheck.py, tools/merge_queue.py | read PATHS | no change | 2 |
| tools/retire.sh ("is a guard, a record, Investor-owned") | own list | narrow to the kept guards | 3 |
| tools/session_salvage.py, tools/tamper_note.py, tools/guard_base.py | read PATHS | no change | 2 |
| tools/main_folder_guard.py, tools/ssd_guard.py (hooks) | the main folder and the SSDs, not Investor-owned paths | out of scope here | - |

</div>


Counts (table rows): 22 removed or narrowed, 44 kept (12 rows carry an **unsure**), 3 tool rows narrow by
themselves when PATHS does, 1 out of scope. Settings: the deny list has 174 entries; stage A
leaves 108 (the `claude -p`, `--print` and `--bg` denies, and per checkout form `setup/**`, `CLAUDE.local.md`,
`.claude/CLAUDE.md`, `agents`, `commands`, `rules`, `output-styles` go; `.github/**` becomes `.github/workflows/**`);
stage B leaves 163, because `rules/**` and `investors/**` become their kept files one by one and
`ops/personal_usage.json` goes.

## Tests the proposal (slice 2) carries

- tests/guard_test (security-guard rows): `claude -p "x"` and `claude --print` pass; `ANTHROPIC_API_KEY=k claude -p x`,
  `env ANTHROPIC_BASE_URL=u claude -p x`, `claude -p --settings rules/api-settings.json x`,
  `claude -p --settings rules/api-settings-b.json x`, `CLAUDE_CODE_USE_BEDROCK=1 claude -p x` still refuse; writes to
  `setup/`, `rules/lookup.py`, `investors/favorites.json`, `.claude/agents/x.md` pass; writes to
  `investors/allowlist.md`, `investors/billing.json`, `rules/hooks/x`, `rules/api-settings.json`, `.mcp.json`,
  `.claude/settings.json` still refuse; `personal_lane.py trip` passes; `git pull` in a company session passes; every
  (d) row unchanged.
- model-guard rows: an untagged work call and a `[diary]` call on Opus pass; Fable on `billing=api` and past
  `fable_ok` still refuse.
- file-guard rows (tests/file_guard_test.sh): a session's edit to `setup/OPERATIONS.md` stays; one to
  `investors/allowlist.md` or `rules/hooks/security-guard.py` goes back.
- tools/test_personal_lane.py: a new Claude Code version, an unknown tool or skill, an unknown event pass; an
  `apiKeySource` other than none, an `ANTHROPIC_*` variable and a risky settings key still refuse.

## Not done in this slice

The guard diff itself (slice 2) and the tools' own lists (slice 3); see the board lines. Older Standing Investor
instructions that ruling 2 may overtake (2026-11-18 6:05 PM "No permission rule changes", 7:16 PM "only through the
applier after an approve") are left for the Operator's T-5165 reading: this slice still uses the applier, so it
contradicts neither.
{% endraw %}

</div>
