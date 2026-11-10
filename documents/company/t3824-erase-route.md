---
layout: "default"
title: "T-3824: can a settings allow rule let the SanDisk erase run in auto mode?"
section: "documents"
description: "An exact rule with no , Bash(python3 -I tools/sandisk_erase.py --erase), is the narrowest form the docs describe and, by item 1, should resolve the call without the classifier. The docs do not say whether an exact rule\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t3824-erase-route.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/t3824-erase-route.md</code></span></div><h1>T-3824: can a settings allow rule let the SanDisk erase run in auto mode?</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-09. Investor instruction: an Investor #245 c6751800160 (4:22 PM ET), <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> log/rulings.md 16:22.
Pages read through tools/fetch_cite.py, one at a time, 2026-11-09 ~16:32 ET; raw copies in
`/Volumes/Company SSD/company-scratch/T-3824-odalys/docs/` (scratch, not committed).

1. https://code.claude.com/docs/en/permissions.md
2. https://code.claude.com/docs/en/permission-modes.md (section "How auto mode evaluates actions")

## What the docs say (quoted or close paraphrase)

1. Decision order in auto mode, first match wins (page 2): "Actions matching your allow, ask, or deny rules
   resolve immediately", with listed exceptions; only "Everything else goes to the classifier". So an allow rule
   that matches resolves the call before the classifier sees it.
2. The exceptions to step 1 (page 2): writes to protected paths; `rm`/`rmdir` critical-path removals; MCP tools
   marked requiresUserInteraction; shell commands carrying per-command allowed domains; ask rules that match on
   content; symlinked writes to protected paths; network-path reads. A `diskutil eraseDisk` run by a Python
   script is none of these.
3. Rules auto mode drops on entry (page 2): "broad allow rules that grant arbitrary code execution are dropped":
   blanket `Bash(*)`, "Wildcarded interpreters like `Bash(python*)`", package-manager run commands, `Agent` rules,
   `Monitor` rules. "Narrow rules like `Bash(npm test)` stay in effect." That is why our `Bash(python3 *)` rule
   does not cover the erase today.
4. Exact match (page 1): "A rule with no `*` matches one exact command." `Bash(npm run build)` "Matches the exact
   command `npm run build`." Compound commands: "Every subcommand must be allowed", so the erase must be run
   alone, not after `cd ... &&`.
5. Deny and ask rules apply in every mode. Our settings have no deny or ask rule naming diskutil, sandisk or erase
   (checked 2026-11-09). PreToolUse hooks still run before a rule resolves; none names diskutil.

## Finding

An exact rule with no `*`, `Bash(python3 -I tools/sandisk_erase.py --erase)`, is the narrowest form the docs
describe and, by item 1, should resolve the call without the classifier. The docs do not say whether an exact
rule that starts with an interpreter (`python3 ...`) counts as "arbitrary code execution" and is dropped; they
list only wildcarded interpreters. That part is untested. If the rule is dropped, the erase goes to the
classifier, it may be refused again, and we stop and say so (T-0848); the hand erase in Disk Utility stays the
fallback.

The earlier precedent does not settle it: `Bash(python3 tools/stop_stuck.py *)` (#185, 690336f2f) has a
trailing `*`, and log/stuck-stops.jsonl has no rows, so we have no measurement of it working in auto mode.

## Why a script, not a bare diskutil rule

`Bash(diskutil eraseDisk APFS CompanyWork GPT disk10)` would also be exact, but disk numbers change when drives
are replugged; that rule would erase whatever is disk10 then. tools/sandisk_erase.py takes no disk argument,
finds its own target and refuses (exit 2, nothing written) unless exactly one whole, physical, external,
non-internal ~1 TB disk named SanDisk holds one ExFAT data partition, no APFS container, no Company SSD volume,
and is not the boot disk. Once the SanDisk is APFS, the tool refuses it too, so the rule can do nothing a
second time. The rule is still removed after the one erase (revert rule in the card).

## Noted, not used

`Bash(tools/*)` is in the allow list and is not an interpreter rule, so the docs do not say auto mode drops it.
If it is kept, any executable file a session writes under tools/ runs without the classifier. We did not run
`tools/sandisk_erase.py` that way and will not: the Investors' route is the exact rule through the applier.
This is information for the Investors, not a request.
{% endraw %}

</div>
