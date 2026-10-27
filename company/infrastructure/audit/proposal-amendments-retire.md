---
layout: "default"
title: "Proposal: retire spent amendments and fold the standing ones into the Commandments (T-0126)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-amendments-retire.md</code></span><span>2026-10-26</span></div><h1>Proposal: retire spent amendments and fold the standing ones into the Commandments (T-0126)</h1></div>
<p class="meta">Ledger entries named here: <a href="{{ '/company/infrastructure/experiments.html' | relative_url }}#opt-030">OPT-030</a>.</p>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Draft by Ines, CEO, 2026-10-26 01:14 ET, for the Investors' ruling #65 c6408374269 item 4 (amendments.md entry 2026-10-26 00:39, due 2026-10-27 00:39). Opened 2026-10-26 02:31 ET as PR #71 ((private) branch proposal/retire-amendments, commit c2def76c on origin/main cbdc9100), label `proposal`. Re-checked at 02:30 against amendments.md as it stands (no entry after 00:39): tools/amend_fold.py rebuilt a byte-identical diff and its verbatim check passes. Preconditions met: the 00:31/00:39 records are committed (51c47619), and log/optimizations.md lines 15-16 record the #62 and #63 approvals with their links (applier, 02:25, 23f9b67d). It touches Investor words, so it needs "approve" (item 2, last bullet); it can never auto-apply.

**Rebuilt 2026-10-26 19:49 ET (T-0214).** #71 showed CONFLICTING: two entries landed in `amendments.md` after its base cbdc9100, 2026-10-26 02:33 (#67 c6409798674, 766bfc11) and 02:38 (#41 c6409883275, 2492f088). an Investor wrote "Merge PR #71" on #72 at 19:48. #71's branch now ends in merge commit adba096f (parents c2def76c and main f6b26ba9), pushed as a fast-forward (a force-update was refused in-session). The only change from the approved version: as #71 promised ("it lands in `amendments.md` as usual and stays an amendment"), the two new entries stay in `amendments.md`, byte for byte; they are not folded or retired. `CLAUDE.md` and `rules/worker-rules.md` are byte-identical to c2def76c (checked with cmp). Totals now: of 35 entries, keep 3, fold 21, retire 11. Worker carry 39,188 -> 12,005 characters; the cut (27,183) is unchanged because the two entries stay in both the before and the after. Exact diff against f6b26ba9: `log/audit/proposal-amendments-retire-v2.diff` (79,604 bytes, sha256 c23089ab45621a554fdd7b75bdeb5189377e92058fff51df8851b58bb95bdf66). GitHub shows #71 MERGEABLE, CLEAN, three files. The session did not merge it: approved changes are applied by code outside the session (#41 c6407113363), and `tools/apply_proposal.py` refuses `amendments.md`. Folding 02:33 and 02:38 is a later proposal. A replacement PR (#75) was opened first and closed unused.

**Recommendation.** Approve. Of the 33 amendments in effect, retire 11 that are spent, fold 21 standing ones word for word into `CLAUDE.md` under the Commandment, Tenet or section each changes, and keep 1 (the Apple gate, which is time-bound). Every worker prompt drops from 37,914 to 10,731 characters of rules and amendments (-72%). No Investor word that stays in force is changed, shortened, reworded or dropped; a script checks that on every run.

## How it reaches main

- **Exact diff:** `log/audit/proposal-amendments-retire.diff` (79,227 bytes, sha256 7f3cb257acecb0646e6f4eb417f29bb9b6ac499a89f892ec2c30568f57829f09). Files: `amendments.md`, `CLAUDE.md`, `rules/worker-rules.md`. Nothing else.
- **Why not through the applier.** `tools/apply_proposal.py` refuses any diff that touches `amendments.md` (NEVER_FILES), by design. And the diff is longer than a GitHub issue body allows (65,536 characters). So the route is a pull request: the Operator pushes one commit of this diff on a branch and links it from the `proposal` issue; an Investor's merge is the approval (#41 c6407113363: "Approval is a reply or a merge from an allowlisted account"). If you prefer to reply "approve", apply it yourselves with `git apply log/audit/proposal-amendments-retire.diff`, without `--whitespace=fix`: 18 quoted lines keep the trailing spaces you typed.
- **Base.** It applies to HEAD plus the 00:31 (#64) and 00:39 (#65) records, which were still uncommitted in the working tree at 01:05. Checked: `git apply --check --exclude=amendments.md` at HEAD 7f25adb8 passes, and `amendments.md` as of the 00:39 record passes. The Operator commits those two records first.
- **If you send a new instruction before this is merged,** `python3 tools/amend_fold.py --root . --out <dir>` rebuilds the diff. A new entry has no plan, so the script keeps it as an amendment, untouched, and says so; only the diff's last context lines change.

## Preconditions (company work, before the merge)

1. The 00:31 and 00:39 records are committed (Operator).
2. `log/optimizations.md` carries the #62 approval (2026-10-25 23:09, #62 c6407343671) and the #63 approval (2026-10-26 00:09, #63 c6408016416) under "Proposal record", with their links (#65 item 3). Neither is there at 01:14. Owner: Odalys. This proposal retires them from `amendments.md` only once that record exists.

## Every entry

"Fold" means the entry's lines after its header (the quote, `Affects:` and `Effect:`) move unchanged into `CLAUDE.md`, under a line naming its date, author and link. A pointer is one line under each other Commandment it affects: "See also the Investor ruling of <date> (<author>, <link>); it is quoted under <place> and changes this too." `rules/lookup.py <n>` prints the fold and the pointers with the Commandment.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Every entry, scrolls sideways" data-n="1" style="--tw:1252px" markdown="1">

| # | Entry | By | Link | Decision | Where | Why |
|---|---|---|---|---|---|---|
| 1 | 2026-10-22 01:09 | an Investor | typed into a session | keep | amendments.md | Standing and time-bound: Apple membership is still pending (due Day 7, 2026-10-28; Paid Apps Agreement, tax and banking Day 12, 2026-11-02). Workers who build need it in their prompt. Retire it once the membership and the agreements are active. |
| 2 | 2026-10-22 02:54 | an Investor | #1 | fold into CLAUDE.md | Commandment 54 | Standing: urgent requests at any hour. The Operator opens them; workers don't. |
| 3 | 2026-10-22 04:05 | an Investor | #3 | fold into CLAUDE.md | Commandment 56; pointers under Commandment 53, Tenet 2, Tenet 7 | Standing: always working, urgent request at once, board kept stocked. The Operator assigns work. |
| 4 | 2026-10-22 04:10 | an Investor | #4 | fold into CLAUDE.md | Commandment 52; pointers under Commandment 53, Commandment 57 | Standing: every request for feedback is a GitHub issue. Operator's channel rule. |
| 5 | 2026-10-22 08:30 | an Investor | typed into a session | fold into CLAUDE.md | Commandment 53; pointers under Commandment 56 | Standing: every blocker is its own Urgent Request. The site fix it asked for was done the same day. |
| 6 | 2026-10-22 11:14 | an Investor | #6 | fold into CLAUDE.md | The Pitch; pointers under Commandment 50 | Standing for any later pitch (a pivot or a second product, C60 item 7): pitches go out as-needed, not at a fixed meeting. Its question about #7 was answered. |
| 7 | 2026-10-22 11:48 | an Investor | #8 | fold into CLAUDE.md | Choosing; pointers under Commandment 50 | Split: the search half ended 10-25 18:39, but 'keep these ideas stored' still binds (pitches/ is not under the never-delete rule). Folded whole, with a dated note saying which half ended; no word of it changed. |
| 8 | 2026-10-22 14:13 | an Investor | #10 c6347909996 | fold into CLAUDE.md | The Pitch | Standing for any later pitch: plain-English description and target demographic first. |
| 9 | 2026-10-22 15:24 | an Investor | #10 c6349362685 | retire | removed; text stays in git history and in this diff | Idea-hunt round (three non-game pitches). Superseded by the product choice of 2026-10-25 18:39 and by 2026-10-25 22:49 (other pitch research stops). |
| 10 | 2026-10-22 16:40 | an Investor | #10 c6350823709 | retire | removed; text stays in git history and in this diff | Idea-hunt round (beat all earlier pitches). Superseded by the product choice of 2026-10-25 18:39; its usage note covered 'today and tomorrow' (2026-10-22 and 2026-10-23) and has expired. |
| 11 | 2026-10-22 16:42 | an Investor | #18 | retire | removed; text stays in git history and in this diff | Idea-hunt round (two specialised-technical pitches). Superseded by the product choice of 2026-10-25 18:39 and by 2026-10-25 22:49. |
| 12 | 2026-10-22 18:51 | an Investor | #18 c6353056834 | retire | removed; text stays in git history and in this diff | Idea-hunt round (batch of ten, subject list). Superseded by the product choice of 2026-10-25 18:39 and by 2026-10-25 22:49. |
| 13 | 2026-10-22 19:51 | an Investor | #10 c6353900801 | fold into CLAUDE.md | Commandment 46 | Standing site feature (status button). |
| 14 | 2026-10-23 17:02 | an Investor | #35 c6374681598 | fold into CLAUDE.md | Tenet 2; pointers under Commandment 56 | Standing: idle work is product, site and process, never unrelated work. Its own text covers the move from ideas to the product. |
| 15 | 2026-10-23 17:33 | an Investor | #23 c6375164710 | retire | removed; text stays in git history and in this diff | No building until the Investors choose, and no prompting them to choose. The Investors chose on 2026-10-25 18:39 and told the company to start building; both halves are spent. |
| 16 | 2026-10-23 19:46 | an Investor | #39 | fold into CLAUDE.md | Commandment 37; pointers under Commandment 52 | Standing: per-session status in #39. |
| 17 | 2026-10-24 09:02 | an Investor | #41 c6384543023 | retire | removed; text stays in git history and in this diff | Idea-search method (method v2). Superseded by the product choice of 2026-10-25 18:39 and by 2026-10-25 22:49. |
| 18 | 2026-10-24 09:56 | an Investor | #41 c6385074661 | fold into CLAUDE.md | Commandment 57 | Standing: Investor messages handled within minutes. |
| 19 | 2026-10-24 10:30 | an Investor | #41 c6385424643 | retire | removed; text stays in git history and in this diff | Idea-grading weights (complexity and novelty beside earning power). Superseded by the product choice of 2026-10-25 18:39. |
| 20 | 2026-10-25 18:53 | an Investor | #41 c6404533692 | fold into CLAUDE.md | Commandment 2; pointers under Commandment 53 | Standing: tamper entries go to Needs You (now Issues) with Approve/Disapprove. |
| 21 | 2026-10-25 18:57 | an Investor | #41 c6404576763 | retire | removed; text stays in git history and in this diff | One-day concession (20% of the weekly budget on 2026-10-25 only); expired 2026-10-26 00:00 ET. |
| 22 | 2026-10-25 20:44 | an Investor | #41 c6405707388 | fold into CLAUDE.md | Commandment 39; pointers under Commandment 40 | Standing: reports carry documents, images and links. |
| 23 | 2026-10-25 22:08 | an Investor | #54 c6406649834 | fold into CLAUDE.md | Commandment 46; pointers under Commandment 2, Commandment 52, Commandment 53, Commandment 57 | Standing: site layout, answered issues close, Investor-owned files hold only rules. The Needs You tab placement is overridden by 10-25 23:46, which sits after it under the same Commandment. |
| 24 | 2026-10-25 18:39 | an Investor | #41 c6404397645 | fold into CLAUDE.md | Phase 1: Finding the Product; pointers under Commandment 50, Tenet 6 | Standing: the product is pywidget, building started, even daily pace. Placed at the top of Phase 1 so it reads first. |
| 25 | 2026-10-25 22:44 | an Investor | #57 c6407064758 | fold into CLAUDE.md | Commandment 3; pointers under Commandment 55 | Standing: the company installs its own tools and hooks without asking. |
| 26 | 2026-10-25 22:49 | an Investor | #41 c6407113363 | fold into CLAUDE.md | Tenet 7; pointers under Tenet 2, Commandment 3 | Standing: work is pywidget, the site, or process; continuous measured improvement. |
| 27 | 2026-10-25 22:49#2 | an Investor | #41 c6407113363 | fold into CLAUDE.md | Commandment 59; pointers under Commandment 3 | Standing: how rule and settings changes are proposed and approved. |
| 28 | 2026-10-25 22:55 | an Investor | #41 c6407181591 | retire | removed; text stays in git history and in this diff | One-day start: the next day's share opened at 22:55 until 00:00 (expired 2026-10-26 00:00 ET), and process tasks ran first at the start of Day 2 (log/audit/audit-1.md landed; app tasks have run since). Even daily pacing stands under 2026-10-25 18:39. |
| 29 | 2026-10-25 23:09 | an Investor | #62 c6407343671 | retire | removed; text stays in git history and in this diff | Approval of proposal #62 ([ops] kind tag). Per #65 item 3 approvals are recorded in log/optimizations.md with the link, not in amendments.md; the record there must exist before this applies. |
| 30 | 2026-10-25 23:46 | an Investor | #41 c6407765312 | fold into CLAUDE.md | Commandment 46; pointers under Commandment 44, Commandment 54, Commandment 57 | Standing: site changes (Issues under Home, folders, no notice, no receipt-only replies). |
| 31 | 2026-10-26 00:09 | an Investor | #63 c6408016416 | retire | removed; text stays in git history and in this diff | Approval of proposal #63 (experiments due check at close). Per #65 item 3 approvals are recorded in log/optimizations.md with the link, not in amendments.md; the record there must exist before this applies. |
| 32 | 2026-10-26 00:31 | an Investor | #64 c6408282742 | fold into CLAUDE.md | Commandment 58 + worker-rules item 5; pointers under Commandment 10 | Standing: Apple public pages, one at a time. Workers fetch pages, so it is also quoted in worker-rules item 5 (C58). Not placed under C6: C6 can't be overridden and apply_proposal.py refuses edits inside it. |
| 33 | 2026-10-26 00:39 | an Investor | #65 c6408374269 | fold into CLAUDE.md | Commandment 59; pointers under Commandment 3, Commandment 55 | Standing: proposal labels, 12-hour auto-apply, approvals in log/optimizations.md. Dated note: item 4 is this proposal. |

</div>


Totals: keep 1, fold 21, retire 11. The 11 retired: 8 from the idea hunt (ended by the product choice of 10-25 18:39 and the 22:49 stop on other pitch research), 2 one-day pace concessions that expired at 2026-10-26 00:00, and the 2 approval records that #65 item 3 sends to `log/optimizations.md`. Their words stay in git history and in the removed lines of the diff.

## Text the diff adds (all of it, besides the moved entries and the 28 pointers)

Under the precedence list at the top of `CLAUDE.md`, after "Commandments 6, 7 and 11 ... can never be overridden by anyone.":

> **Folded rulings.** Investor instructions folded from `amendments.md` into this file are quoted word for word, with their date, author and link, under the Commandment, Tenet or section they change, and a short pointer sits under each other one they affect. They keep the rank of item 1: each overrides the text it sits under, and a later ruling overrides an earlier one. Retired amendments stay in git history, and the T-0126 proposal (`log/audit/proposal-amendments-retire.md`) gives the reason for each.

In `amendments.md`, after the format block and before the first entry:

> Entries folded into `CLAUDE.md` (proposal T-0126) keep their force there: each is quoted word for word under the Commandment, Tenet or section it changes, and `rules/lookup.py` prints it with that Commandment. Retired entries stay in git history; log/audit/proposal-amendments-retire.md gives the reason for each.

In `rules/worker-rules.md`, after "Where to look":

> Standing Investor rulings that were amendments are now quoted inside the Commandments they change, so `python3 rules/lookup.py <number>` prints them with the rule; they override its text. Where to find them: Urgent Requests, blockers and issues (52-54, 56); Investor messages and site replies (57); reports (37, 39); the site (46); tampered files (2); own tools and proposals (3, 59); the chosen product and even daily pace ("Phase 1: Finding the Product", Tenet 6); what to work on (Tenets 2 and 7).

And inside worker-rules item 5 (Commandment 58), the 10-26 00:31 Apple-pages ruling, indented three spaces, words unchanged. Two dated notes sit under folds: 10-22 11:48 (which half ended) and 10-26 00:39 (item 4 is this proposal); both are shown in the diff.

What it does not touch: no word of any Commandment, Tenet, section, the `amendments.md` opening text or the worker rules is changed; it only inserts. Nothing goes inside Commandments 6, 7 or 11 or worker-rules item 7 (the 00:31 ruling's C6 pointer is left out for that reason; it sits under C58 and C10). No hook, guard, `rules/lookup.py` or `rules/build_agents.py` change.

## Evidence: what each reader carries

Measured with `rules/build_agents.py`'s own `amendments_block()` on the current files and on the files after the diff (characters):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Evidence: what each reader carries, scrolls sideways" style="--tw:610px" markdown="1">

| | Now | After | Change |
|---|---|---|---|
| Amendments block in every persona prompt | 30,455 | 1,751 | -28,704 |
| `rules/worker-rules.md` | 7,459 | 8,980 | +1,521 |
| **Worker carry (block + worker rules)** | **37,914** | **10,731** | **-27,183 (-72%)** |
| Operator carry (`CLAUDE.md` + `amendments.md`, which it imports) | 101,829 | 98,413 | -3,416 |

</div>


At Odalys's measured 0.495 to 0.715 tokens per character (`log/audit/proposal-amendments-block.md`, item 2), the cut is 13,500 to 19,400 tokens on every persona model call, out of a 35,822-token median first-call prompt. At her measured $0.472 per 1,000 carried tokens per work session (item 4), that is $6.35 to $9.17 per work session at list prices. The block has grown about 4,000 characters a day; after this it grows only by new instructions until they are folded too.

## Predicted effect, metric, revert rule

- **Metric:** median first-call prompt size of persona threads per work session (`tools/amend_cost.py`), read on an XmR chart.
- **Prediction:** a drop of 13,500 to 19,400 tokens from the first work session after the merge, a signal on its own XmR chart within 3 sessions; measured over 10 work sessions.
- **Guards:** `rules/lookup.py` calls per persona thread (expected to rise a little; workers now print a Commandment to see a folded ruling); any Investor correction of a worker or the Operator for missing a folded ruling.
- **Revert rule:** revert the merge commit (one `git revert`, by an Investor or the applier path the Investors choose) if (a) any Investor says "hold", "no" or "revert"; (b) one action breaks a folded ruling and the miss traces to the ruling not being in the prompt; or (c) the median drops by less than 5,000 tokens over 10 work sessions (then it saved nothing and is undone, per the ledger's rule).

**Interaction with OPT-030** (the compact amendments block, approved #65, switchback `amend_compact`, its `rules/build_agents.py` diff not at HEAD at 01:14). Both change the same metric, and the ledger allows one change in flight per metric. After this merge the block holds one entry, so OPT-030's compact arm can save at most about 1,000 characters, below what its switchback can detect. Recommendation: when this merges, Odalys stops OPT-030 under its revert rule and records it as superseded, and this change takes the metric. If you would rather keep OPT-030 running, its comparison stays fair (both arms lose the same entries), but it will read "no effect".

## What would make this fail

- A worker acts without printing the Commandment and misses a folded ruling. Mitigation: the worker-rules paragraph names where each group sits; the Operator still carries every ruling in `CLAUDE.md`; task packets name the Commandments a task touches.
- `rules/lookup.py <n>` still ends with "(No amendment changes this ...)" when only a folded ruling changes the Commandment. The folded ruling prints above that line, so nothing is hidden, but the line reads oddly. A one-line fix to `rules/lookup.py` is a separate proposal; it is not in this diff.
- A new instruction lands before the merge: rebuild with `tools/amend_fold.py` (above).

## How this was checked

- `python3 tools/amend_fold.py --root . --out /tmp/amendfold4`: builds the three files and the diff from the plan in its `PLAN` table, fails if a planned entry is missing or an entry is unplanned, and checks that every kept or folded entry's lines (quote, `Affects:`, `Effect:`) sit exactly once, unchanged, where the plan sends them (and once more in worker-rules item 5 for 00:31). Run twice; the two diffs are byte-identical.
- `git apply --check` as described under Base.
- `rules/lookup.py` from HEAD, run against the new `CLAUDE.md` and `amendments.md`: `54`, `55`, `10`, `T6`, `"Phase 1: Finding the Product"`, `--search` and `--map` print the folds and pointers in place.
{% endraw %}

</div>
