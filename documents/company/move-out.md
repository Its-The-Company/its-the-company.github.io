---
layout: "default"
title: "Move a setting out of an Investor-owned file"
section: "documents"
description: "A tamper entry (tools/tamper_note.py, shown on Needs you) offers &quot;Move this setting out of the Investor-owned file&quot; only when a restored file is movable: a data file (.json .yml .yaml .toml .ini .cfg .conf .tsv .csv)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/move-out.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 4 · Sun Oct 25</span><span><code>ops/plans/move-out.md</code></span></div><h1>Move a setting out of an Investor-owned file</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Owner: Odalys. From #54 c6406649834 (an Investor, 2026-10-25 22:08 ET): Investor-owned files <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> rules the company
cannot edit; they should not hold settings that hold back the company's work. Written 2026-10-25 22:25 ET.

## When the choice appears

A tamper entry (`tools/tamper_note.py`, shown on Needs you) offers "Move this setting out of the Investor-owned
file" only when a restored file is **movable**: a data file (`.json .yml .yaml .toml .ini .cfg .conf .tsv .csv`)
under `investors/` that company code in `tools/` reads. Not movable, ever: `rules/` (the guards), `setup/`,
`CLAUDE.md`, `amendments.md`, `.github/`, `.claude/`, `rules/api-settings.json`. Claude Code, GitHub or the
Investors' own scripts read those, so no company override could take effect.

## What the Investor's choice records

The button writes `ops/tamper/decided/<id>.json` from the Investor's own token:
`{"decision": "move-out", "comment": "<their words>", "at": ...}`. That file is the record (Commandment 9). The
entry leaves Needs you. The company's account never writes it.

## What the company does (one task, one commit)

1. `python3 -I tools/tamper_note.py moves` lists the choices not carried out yet: the entry id, the Investor's
   comment, each movable file and its override path (`investors/site/settings.json` becomes
   `ops/settings/site-settings.json`).
2. Read the entry's exact diff (`ops/tamper/<id>.json`, field `diff`) and the comment. The keys to move are the keys
   the diff changed, unless the comment names others.
3. Write `ops/settings/<name>.json` with only those keys, at the values the session tried (or the ones the comment
   gives), plus `"_moved": ["<id>"]` and `"_from": "<investor path>"`. Keys starting `_` are never read as settings.
4. Find every reader (`grep -rn "<investor path>" tools/`). Change each one to
   `company_settings.load("<investor path>")` (`tools/company_settings.py`). It returns the Investor's keys with
   the company's moved keys on top. A key the company does not hold still comes from the Investor's file, so the
   Investor's later edits to it still apply. With no override file, behaviour is the same as before.
5. Tests: the override wins for a moved key; an unmoved key still follows the Investor's file; with no override
   file, behaviour is unchanged; the Investor's file is byte-for-byte untouched.
6. Commit with the worker's name (pathspec only). Then
   `python3 -I tools/tamper_note.py moved <id> --override ops/settings/<name>.json --reader tools/<file> --commit <sha>`.
   This writes `ops/tamper/moved/<id>.json`, so `moves` stops listing the choice.
7. Next report: one line under Done with the setting, the override path and the commit.

## Limits

- The company never edits `investors/`, `rules/`, `CLAUDE.md` or `setup/`. The Investor's original stays as it is.
- A move never grants what the Commandments keep for the Investors: spending, sign-ups, outreach (Commandments 4,
  7, 50). If a chosen setting is one of those (for example `investors/billing.json` <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span>), the company opens an
  <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> asking the Investors to confirm before carrying it out.
- If a reader is not company code, the setting cannot be moved. The company says so on the entry's thread and gives
  the exact edit for the Investors to make.
- Undo: the Investors say so. The company removes the keys from the override and keeps the old file under
  `ops/settings/archive/`. Readers fall back to the Investor's file on their own.

## Past entries: settings or rules?

Sources: issues #13, #32, #36 and #58, plus every `file guard:` line in `ops/runs/supervisor.log`. Read 2026-10-25.

- 11 guard events, 16 amendments taken out of `amendments.md` by `rules/amendment-check.py`. Reasons: 9 "the
  quoted words aren't in the message at its link", 7 "its header isn't `## YYYY-MM-DD HH:MM ET — <username> —
  <link>`". #13 (1 amendment), #32 (3), #36 (1) and #58 (1) are four of these events; the other seven had no alert
  sent.
- **Settings: none.** Every entry was an amendment record, which is a rule. No event restored a file under
  `investors/`, `rules/`, `setup/`, `.claude/` or `CLAUDE.md`, and the log has 0 `restored <file>` lines.
- `ops/tamper/` has no entries yet. The new path started at badec2ba (2026-10-25 20:29 ET), and nothing has been
  restored since.
- The friction these show is in the amendment format and the quote check, not in a misplaced setting. That fix
  belongs in how sessions write amendments (quote the comment exactly, give the username and link). Moving
  `amendments.md` out would not fix it.

Settings-shaped files under `investors/` today: `investors/site/settings.json` (the publish switch and the
announcement), `investors/billing.json` (spending caps), `investors/allowlist.md` (a list, not movable). Nothing
moves unless the Investors choose it on an entry.
{% endraw %}

</div>
