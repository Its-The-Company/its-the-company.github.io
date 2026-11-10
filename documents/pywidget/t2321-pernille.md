---
layout: "default"
title: "T-2321: review of T-2304 (Odalys, OPT-081), commit f0bf8244f"
section: "documents"
description: "Verdict: approve with changes. The backstop gate is right and the default is right. The second half of the gate, a regex over a free-text why, exists to silence one stale hand-written file. That file should go, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2321-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2321-pernille.md</code></span></div><h1>T-2321: review of T-2304 (Odalys, OPT-081), commit f0bf8244f</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Read cold: the diff, the proposal (ops/proposals/2026-11-04-land-ends-no-session.md) and the code around it, not Odalys's notes. Reviewed as committed. Every file:line below refers to f0bf8244f. While I was reviewing, T-2324 landed as 311270203 and touched the same file. I did not edit session_end.py. The fix lines (T-2349 to T-2351) apply on top of 311270203.

**Verdict: approve with changes.** The backstop gate is right and the default is right. The second half of the gate, a regex over a free-text `why`, exists to silence one stale hand-written file. That file should go, and the regex with it.

## Checked and fine

- **A missing key means the old path.** `DEFAULTS["land_ends_session"] = True` (session_end.py:56), and `config()` merges DEFAULTS before the file (:80-81), so a missing key is True. The `key missing` and `true` rows both expect `["land", "repo"]`. Mutant M2 (key dropped from DEFAULTS, so `config()` filters the file's key out) is killed, 4 FAIL.
- **Only the landing reasons are gated.** `lands` is read in two places only: the needs_repo condition (:171) and the backstop loop (:175). Push (:151-155), big file (:156-165), approve (:177-191), amendment (:192-195) and report (:196-207) don't read it. Nor do (b) and (c), which sit outside `jobs()`. The mutants that gate the applier (M11) or the amendment (M10) are killed.
- **The branch still lands.** supervisor.sh:308 runs `personal_land.sh land` on every tick, and it waits only while `ops/.session_pid` exists (personal_land.sh:503). `land-live` is the same `land` with LIVE=1 and longer limits (personal_land.sh:1381-1387). So a branch lands inside the session, or at whatever ends the session next: applier, amendment, push, report, no runnable task, the `hours` limit (3.0) or the supervisor's 225-minute guard. The bound is one session length, not "about 3 h later" from the moment it was marked. That's close enough to the proposal.
- `python3 tests/session_end_test.py`: **PASS 52, FAIL 0.**

## Mutants (scratch copy, run with SESSION_END_TOOL=…; 14 planted)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Mutants (scratch copy, run with SESSION_END_TOOL=…; 14 planted), scrolls sideways" data-n="1" style="--tw:422px" markdown="1">

| # | Mutant | Result |
|---|---|---|
| M1 | DEFAULTS False | killed |
| M2 | key missing from DEFAULTS | killed (4) |
| M3 | needs_repo not gated | killed (1) |
| M4 | backstop not gated | killed (4) |
| M5 | every needs_repo gated | killed (1) |
| M6 | regex inverted | killed (2) |
| M7 | `is not False` → `is True` | **survived** |
| M8 | → `bool(c.get(...))` | **survived** |
| M9 | regex widened to `land` | **survived** |
| M10 | amendment gated too | killed (2) |
| M11 | approve gated too | killed (2) |
| M12 | big-file reason gated too | **survived** |
| M13 | regex case-sensitive | survived (harmless) |
| M14 | string `"false"` also disables | **survived** |

</div>


## Findings

**F1, Medium.** tools/session_end.py:60 and :171, and ops/needs_repo.json: a stale file, and a gate on a substring of free text.
- No tool writes "waits to land". The only `needs_repo.json` that matches is the one the Operator wrote by hand on 2026-11-01 (0576758be, ops/needs_repo.json). Nothing in the repository ever removes the file: session_end.py is its only reader.
- The file's premise no longer holds. It says account a "takes nothing more until a tick between sessions lands it". Since then the account has had slots a2-a6 (T-0985) and land-live (T-1035), and it landed ffb2855c at 4:44 PM today. T-0945 already has its own line (board :327) and <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> retries (T-1447, T-1646).
- The file's key is a content hash (`repo:321d7e89991c59ea`), so with `lands` true it comes back every `seen_hours`. It was last seen 2026-11-04 6:07 PM, and ops/runs/supervisor.log holds 36 "end: (a) personal account a's first finished task" lines. It is one of the 4 of 18 in the proposal's own count.
- The regex also drops any genuine needs_repo whose why happens to contain "waits to land", for example "drop the blob first; T-x waits to land after it". The suite does not pin the regex's width: M9, which widens it to any "land", passes 52/0.
- Fix: `git rm ops/needs_repo.json` (it is in ops/, not log/). Drop `LAND_WAIT` and the needs_repo half of the gate, so the file means only what the docstring says: "a fix that needs the repository to itself". A <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> landing never needs that, because land-live exists. Update gate_rows: with false, a needs_repo.json ends the session whatever its why says. Land this after T-2324, which is editing the same block.

**F2, Low.** tests/session_end_test.py:134-190: no row checks push or big file at all, under any setting. The board line and the commit message both say these are "unchanged", but nothing checks it. M12 (the big-file reason gated on `lands`) passes 52/0. Fix: in the temp root, put a stub `tools/big_files.py` that prints a path. Then a false row expects `["repo"]` with key `big:`, and the same row with `.drop_blob_ran` present expects nothing. Add a push row if a fake `@{u}` can be set up in the temp root (a bare origin with one extra commit), or record why it can't.

**F3, Low.** tools/session_end.py:169: `c.get("land_ends_session", True) is not False`. Only a JSON `false` turns the gate off. `0`, `null` and `"false"` all keep the old path. That is the safe direction and I would keep it, but no row pins it: M7, M8 and M14 survive. The `True` default in `c.get` is also dead code, because `config()` always supplies the key. Fix: add one row where `"land_ends_session": "false"` gives the old path (`["land", ...]`), and use `c["land_ends_session"] is not False`.

Nothing to log from outside text. No guard refused a command.
{% endraw %}

</div>
