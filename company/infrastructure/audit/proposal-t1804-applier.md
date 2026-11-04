---
layout: "default"
title: "Proposal T-1804: the applier applies protected changes after an Investor's approve"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-t1804-applier.md</code></span><span>2026-11-04</span></div><h1>Proposal T-1804: the applier applies protected changes after an Investor's approve</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Author: Odalys, 2026-11-04. Diff: `log/audit/proposal-t1804-applier.diff` (27,015 bytes; `tools/apply_proposal.py` +142/-26 lines, `tests/apply_proposal_test.py` +169/-6). Not landed: `tools/apply_proposal.py` in main is unchanged until an Investor replies approve on the request. Commandment 59: the applier's own check needs that approve first.

Source: amendment 2026-11-03 21:48, an Investor, #41 c6621180287 ("Everything should be approvable via the site").

## What changes

Today the applier refuses four kinds of change even after an approve: files in `investors/`, `amendments.md`, the guard files (`GUARD_FILES`, `.github/`), and a Claude Code permission grant (an allow or additionalDirectories entry added, a deny or ask rule removed). With the diff, those four apply on the approve path only, and only when all of this holds:

1. The approve is the latest comment from an account in `investors/allowlist.md`, posted after the last body edit. This is the check it already makes; nothing about it changes.
2. The body holds exactly one ```diff block, and its text names every file (existing check). The diff goes onto HEAD in a private index, so what lands is exactly the diff.
3. The text states a revert rule, and has a `Tests:` line naming tests/ files.
4. Those tests pass on HEAD plus the exact diff in a throwaway worktree before anything is committed. A red refuses it.
5. After the commit, the post-apply check (the auto path's own) runs the named tests and `tests/run.sh --fast` on the applied commit. A new red reverts the change's files in an Operator commit and comments on the issue. Before this diff, an approved change was never re-tested.
6. Every settings grant is written word for word in the text outside the diff, so the Investor reads the grant as well as the diff.
7. A change to `investors/allowlist.md` (who may approve) must be the only file in its diff.

These are still refused, approve or not: Commandments 6, 7 and 11 in CLAUDE.md and item 7 of `rules/worker-rules.md`; in settings, `hooks`, `env`, `apiKeyHelper` and the other risky keys, `defaultMode`, `disableBypassPermissionsMode`, or a new top-level key; a grant of a whole tool or a bare wildcard (`Bash`, `Bash(*)`, `Read(/**)`, `*`) or a home or root directory; `.git/` or a path outside the repository; deletions, renames, mode changes, symlinks and binary files. The auto path and file proposals keep refusing all four kinds, with the same messages as today.

## Evidence

- Red first. The new and changed tests run against today's applier: 82 tests, 16 failures (10 of the 13 new `Protected` tests, and 6 `Refusals` tests whose expected reason changed). The other 3 new tests pass on today's code, as they should: hooks and defaultMode refused, no approve means no apply, and the auto path refuses.
- Green. On the proposed code: `Protected`, `Refusals` and `Allowed`, 31 tests, OK (422 s). The full file: 82 tests, OK (1,139 s, with other work on the machine). Run in a scratch worktree at d32b2d5e0 with the diff applied.
- The fold, #169 (`log/audit/proposal-t1777-amendments-fold.diff`, 57,819 bytes, 4 files). Under the proposed code: `amendments.md` reads as protected, `CLAUDE.md`, `rules/worker-rules.md` and `log/rulings.md` pass as they are, the content check finds no problem (Commandments 6, 7 and 11 and worker rule 7 unchanged), and it applies cleanly to d32b2d5e0.
- The asks, from `ops/requests/t1781-approvable.md` section 2.

## Predicted effect: section 2's 8 asks (of 19)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Predicted effect: section 2&#x27;s 8 asks (of 19), scrolls sideways" style="--tw:783px" markdown="1">

| Ask | Kind | After approve |
|---|---|---|
| #111 guard change | guard file | one click |
| #115/#143 the fold (now #169) | amendments.md | one click, once #169's body holds the diff, a Tests: line and a revert rule |
| #121 on/off switches in `investors/`, last guard changes | investors/, guard | one click |
| #135 step 1, four folders on the security guard's list | guard file | one click |
| #137 agent limit in `rules/api-settings.json` | `env` value | still refused (see Risks); already done by the Investors |
| #144 records-guard fix | guard file | one click |
| `investors/billing.json` switches | investors/ | one click |
| #155 delete 414 test files in ~/Library/Preferences | permission grant | the grant is one click if scoped and named; a session then deletes |

</div>


Prediction: 7 of the 8 become one approve each. #137's kind stays a hand edit. The before number is 8 of 8 as hand work (section 2, 2026-11-04).

#164 (the supervisor's Keychain lines): the company can't read `tools/supervisor.sh`, so it can't write that diff. That split stays with the Investors as #164 says. Afterwards, adding `rules/supervisor-keychain.sh` to `GUARD_FILES` is a normal approved change to the applier, and later guard changes go through approve under this diff.

## Risks

1. The allowlist through approve. An approved diff can add an account to `investors/allowlist.md`, but only alone, only with tests and a revert rule, and only on the approve of an account already on the list. Same trust as today's approve, one step wider.
2. A guard change that passes tests but weakens a guard. The tests can't judge intent. The Investor's reading of the diff is the safety, as for every approve today. The post-apply check catches breakage, not weakening.
3. A strict broad-grant test. A bare MCP tool name (`mcp__x__y`) counts as a whole tool and is refused. If that blocks a real ask, the Investors edit the file themselves, or a later diff relaxes it.
4. `env` stays refused because an env value can move credentials or endpoints. #137 was an env value. If more like it come, a named-key list (for example `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` only) is a follow-up proposal.
5. Time. Named tests count against the supervisor's 300 s run (AUTO_TEST_SECONDS 200). A slow test refuses the change; it never applies it half-way.
6. An auto-revert of an approved change. A new red on the applied commit reverts what the Investor approved. That is the intended trade, and the issue gets a comment naming the test.

## Revert rule

If any applier test goes red on main after this lands, or a protected change applies without its named tests, or the auto path applies a protected kind: `git revert <apply commit>`. That restores today's refusals, which are strictly narrower. Switchback: the diff's constants (`PROTECTED_PREFIXES`, `PROTECTED_FILES`) and `protected_path()`. Removing the `kind = protected_path(p)` line returns the approve path to today's behaviour.
{% endraw %}

</div>
