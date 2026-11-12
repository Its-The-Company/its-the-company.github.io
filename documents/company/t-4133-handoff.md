---
layout: "default"
title: "T-4133 handoff: the Direct session record (paused by an Investor #41 c6825558715)"
section: "documents"
description: "Hook start/end and title command in one tool. A typed session = COMPANY_RUN unset, CLAUDE_CODE_ENTRYPOINT not"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4133-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/T-4133-handoff.md</code></span></div><h1>T-4133 handoff: the Direct session record (paused by an Investor #41 c6825558715)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-12 9:0x AM ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> b3. Paused before commit: account b is now limited to audit and restructuring
work. Nothing of T-4133 is committed except this note. The main account carries on.

## Where the files are

`/Volumes/SANDISK SSD/company-scratch/T-4133-odalys/` (SSD scratch):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Where the files are, scrolls sideways" style="--tw:610px" markdown="1">

| File there | Goes to |
|---|---|
| direct_session.py | tools/direct_session.py |
| direct_session_test.py | tests/direct_session_test.py |
| 2026-11-12-direct-session-hook-card.md | ops/requests/ (the card; request_card.py passes it) |
| 2026-11-12-direct-session-hook.diff | ops/requests/ (the settings diff the card names) |
| issue-cards.patch | `git apply` it: ops/issue-cards.json entry that request_card.py wrote |

</div>


Also add these two lines to .gitignore (lost when this worktree was reset):

    # T-4133: one record per session typed into the Mac mini (tools/direct_session.py)
    ops/direct-sessions/

## What is done (measured)

1. Hook `start`/`end` and `title` command in one tool. A typed session = COMPANY_RUN unset, CLAUDE_CODE_ENTRYPOINT not
   sdk-*, CLAUDE_CODE_CHILD_SESSION unset (the SessionStart input of Claude Code 2.1.307 carries session_id, source,
   agent_type, model, session_title; session_title is never stored). Account from CLAUDE_CONFIG_DIR: main, a letter,
   or other. Effort from CLAUDE_EFFORT, filled in by `title` if the hook could not see it.
2. Title: tools/title_check.py rules plus public rules (email, @mention, Investor login or its later camelCase part
   read from investors/allowlist.md, full-name pairs, 5+ digit runs, 20-char tokens, links). Refused = exit 1,
   nothing stored.
3. Test red first (n=1: tool missing), then `tests/run.sh direct_session_test.py`: PASS 84, FAIL 0 (67 s wall,
   load 64). Hook time: 125 ms median, 144 ms max, n=20.
4. Applier check: tools/apply_proposal.py settings_problem refuses the diff ("it changes `hooks`") on every path, so
   the card asks for approve and two commands at the Mac mini, as the main-folder guard card did.

## What is next

1. Restore the files above into a worktree on main's tip; re-check the diff with `git apply --check` (settings
   blob was 82c095c on 11-12).
2. Run `tests/run.sh --fast`. Not done: my run was stopped at the pause, with no result.
3. Commit by path, author Odalys, "T-4133: ...". The Operator posts the card (request_card.py prints the line).
4. Owed after-number: count of ops/direct-sessions/ records vs typed sessions in the first week; any record from a
   COMPANY_RUN session is a bug.
{% endraw %}

</div>
