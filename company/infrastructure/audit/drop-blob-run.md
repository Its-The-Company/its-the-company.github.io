---
layout: "default"
title: "Drop-blob clone test, current HEAD (Odalys, 2026-10-25 23:44 ET)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/drop-blob-run.md</code></span><span>2026-10-26</span></div><h1>Drop-blob clone test, current HEAD (Odalys, 2026-10-25 23:44 ET)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Board: "[tools] Odalys, P1, option A for #54". Investors' answer: A on #54 (an Investor c6406362659): the supervisor runs tools/drop_blob.sh with all four paths, then pushes.

## Method

Script: /tmp/droptest54-scripts/clone_test.sh (throwaway, not committed). Steps:

1. `git clone --no-hardlinks` of the live repo into /tmp, checked out at live HEAD 795c47f9.
2. A local bare remote seeded with origin/main (2e4251f9, the last commit GitHub accepted, 2026-10-24 20:12). Its pre-receive hook refuses any blob over 104,857,600 B, which is GitHub's GH001 rule.
3. Push before the drop, then run tools/drop_blob.sh (working-tree version, with the new lock-owner check) inside an ops/.lock held by the calling shell, passing DROP_BLOB_LOCK_OWNER the way the supervisor does.
4. Check with tools/big_files.py (100 MB and 50 MB), then a plain push with no force.

## Result (n=1 run, 782 unpushed commits)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Result (n=1 run, 782 unpushed commits), scrolls sideways" style="--tw:617px" markdown="1">

| Check | Result |
|---|---|
| Push before the drop | refused by the hook: kaikki.org-dictionary-Irish.jsonl (112,227,977 B). Same refusal as GitHub's |
| drop_blob exit | 0, in 110 s |
| Commits origin/main..HEAD | 782 before, 782 after |
| Files that differ in any commit | 19: the kaikki file, H226-raw/sdk/decls.tsv, 4 H231-raw/sdk/grep-*.txt, 13 H246-raw/sdk/*.swiftinterface. Nothing else |
| Final tree, old vs new HEAD | identical |
| origin/main an ancestor of the new HEAD | yes (fast-forward) |
| big_files.py range, 100 MB / 50 MB | exit 0 / exit 0 (nothing over either limit) |
| Push after the drop, no force | accepted in 2 s; remote main = new HEAD fb937c2f (clone only) |
| Whole run | 140 s, clone included |

</div>


The clone's new shas are not the ones the live run will produce: commits keep landing until the supervisor runs it.

## What the live run does (supervisor, not run by hand)

tools/supervisor.sh push_if_ahead: when tools/big_files.py finds a file over 100 MB in @{u}..HEAD, drop_blobs runs only if all of these hold:

- every big path is in the approved list (the four paths above);
- there is no ops/.session_pid;
- no tracked file is modified or staged;
- ops/.drop_blob_ran is absent.

It then calls drop_blob.sh with DROP_BLOB_LOCK_OWNER set to its own PID. drop_blob accepts ops/.lock only when ops/.lock/pid names that live process. The script runs at most once per tick, and the push follows. The tick tries in two places: right after the sync, before any session (new), and again at step 12 after the session's commit. A refusal before the rewrite starts is tried again at the next tick. A rewrite that starts and then fails is never retried automatically; ops/.drop_blob_ran says why. The old history stays in backup/pre-drop-<date>. Every unpushed sha changes.
{% endraw %}

</div>
