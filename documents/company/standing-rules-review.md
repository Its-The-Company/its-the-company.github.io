---
layout: "default"
title: "Standing Investor instructions: keep, automate, edit or remove (T-5165)"
section: "documents"
description: "Investor an Investor, #325 c7016129138 (12:02 PM ET 2026-11-19): go through every entry in the Handbook&#x27;s Standing Investor instructions (handbook/rules.md) and say whether it stays a plain-text rule, becomes an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/standing-rules-review.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 29 · Thu Nov 19</span><span><code>ops/plans/standing-rules-review.md</code></span></div><h1>Standing Investor instructions: keep, automate, edit or remove (T-5165)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor, #325 c7016129138 (12:02 PM ET 2026-11-19): go through every entry in the Handbook's Standing Investor instructions (handbook/rules.md) and say whether it stays a plain-text rule, becomes an automated deterministic process (a tool or check, after which its text entry is removed), is edited (merged with, or brought in line with, a later or contradicting entry) or is removed. Reviewed by Ines on 2026-11-19 against the section as it stood at the start of T-5165 (270 entries).

How to read it. S-numbers count the entries in their order in the section at that time (S1 is the 2026-11-04 12:14 PM ET entry); the date and the issue comment identify each one for good. The Investors' exact words for every entry stay in log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md (the pre-2026-11-08 ones folded there from amendments.md), so a removed or merged entry loses no record. Every entry whose Handbook line leaves the section is listed with its reason in handbook/standing-retired.md, which `python3 tools/ruling_record.py check` reads.

Rules used.

- An entry that names a ban, a security limit, a refusal stop, the three gates or Commandments 6, 7, 11 or 57 to 59 stays as written, even when the rest of it is spent (the brief: never weaken those).
- keep: still a live rule a session or worker has to follow, and not something a tool can decide alone.
- automate: a deterministic tool or check can hold the rule. When the tool is already built the board line says (done) and the text leaves the section now; otherwise the line builds it and retires the text when it lands (tools/ruling_record.py retire).
- edit: merged into a later entry on the same subject (the target column names the survivor, which carries any clause still live), or brought in line with a later entry that changed it. A row whose target says (survivor) is the entry the others merge into; its new words are in handbook/rules.md.
- remove: spent (day-scoped, one-time, or a finished task's order) or fully replaced by a later entry.

Counts: keep 135, automate 12, edit 58, remove 65; total 270.

New board lines for automations: T-5183 (12-hour times in replies), T-5184 (no emojis on the site), T-5185 (replies name whose message), T-5186 (American spelling), T-5187 (day-scoped entries retire themselves). Already built: T-3373, T-4100, T-4284, T-4810.

Applied on 2026-11-19 (part b): 107 lines left the section through `ruling_record.py retire` (65 removed, 36 merged into a survivor, 6 already automated) and 20 survivors were rewritten through `amend`; 163 lines remain. The 5 automations still to build keep their text until their lines land. Follow-up: T-5188, so rules/lookup.py stops showing a retired ruling as in force (an Investor-owned file, through the applier).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="1" style="--tw:1338px" markdown="1">

| S | Date (ET) | Source | Short name | verdict | Reason | Board line or merges with |
|---|---|---|---|---|---|---|
| S1 | 2026-11-04 12:14 PM | #41 c6637079457 | <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lane</span>'s own stop <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> itself | edit | the lane-stop entries say one thing; merged so the rule reads in one place | S89 |
| S2 | 2026-11-04 7:40 PM | #41 c6646315642 | Lock In runs the full pool | edit | Lock In entries merged into the modes entry | S24 |
| S3 | 2026-11-04 8:00 PM | #178 c6646648113 | Settings changes and open issues | keep | standing; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S4 | 2026-11-04 8:09 PM | #41 c6646787730 | Chat hides Cost and profit | keep | still true of the site; its return is still promised |  |
| S5 | 2026-11-04 8:45 PM | #41 c6647335197 | Site share counts only own site work | edit | work order now set by S261; its one live clause (Investor-asked site work is outside the 5% share) moves there | S261 |
| S6 | 2026-11-04 10:32 PM | #183 c6648940379 | Personal API keys run sessions | keep | standing (never Fable, never past what a key holds) |  |
| S7 | 2026-11-04 10:53 PM | #41 c6649223061 | File guard and amendments.md | keep | spent since amendments.md was retired (S31), but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S8 | 2026-11-04 11:01 PM | #41 c6649323509 | Evan's lane runs again | keep | spent start-up order, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S9 | 2026-11-04 11:16 PM | #188 c6649529283 | Fold proposals approved in advance | remove | amendments.md was retired 2026-11-08 (S31); nothing is left to fold |  |
| S10 | 2026-11-04 11:21 PM | #41 c6649596327 | 5-hour limit pauses one lane only | keep | standing dispatch rule |  |
| S11 | 2026-11-04 11:22 PM | #41 c6649615785 | Every lane answers Investors | keep | standing |  |
| S12 | 2026-11-05 12:06 AM | #41 c6650214142 | Runner changes need no approve | keep | standing; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S13 | 2026-11-05 1:07 AM | #41 c6651078949 | Simplify in one go | keep | standing way of working |  |
| S14 | 2026-11-05 1:21 AM | #41 c6651295775 | Approvals for the 11-04/05 night | keep | spent, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S15 | 2026-11-05 9:14 AM | #196 c6660183695 | Lane start check | keep | standing; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S16 | 2026-11-05 10:21 AM | #41 c6661761095 | Charter, macOS permissions | keep | keeps the ban on switching off the Mac mini's security |  |
| S17 | 2026-11-05 8:46 AM | typed into a Mac mini session | Landing first on 11-05 | keep | its day has passed, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) (the job sandbox) |  |
| S18 | 2026-11-05 8:05 AM | typed into a Mac mini session | Runner tests land branches | keep | standing; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S19 | 2026-11-05 7:46 PM | #41 c6673535023 | Report sections | keep | standing report format |  |
| S20 | 2026-11-05 11:35 PM | #41 c6677001798 | Merge-queue process first | edit | the merge-queue-first entries merged into the latest | S226 |
| S21 | 2026-11-06 8:01 PM | #41 c6700015760 | Process week to 11-08 | remove | ended at the 2026-11-08 weekly reset |  |
| S22 | 2026-11-06 10:50 PM | #41 c6701880080 | Simulator reset at 20 GB | keep | later widened by S190 and S263, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S23 | 2026-11-06 10:56 PM | #41 c6701941684 | One Lock In control | edit | Lock In entries merged into the modes entry | S24 |
| S24 | 2026-11-06 11:07 PM | #41 c6702049968 | Lock In modes | edit | absorbs S2 and S23: one Lock In entry | S24 (survivor) |
| S25 | 2026-11-06 11:24 PM | #41 c6702207354 | Efficiency first, pool sizing | edit | order now S261, pool size S228; its plan-approval clause moves to S261 | S261 |
| S26 | 2026-11-06 11:47 PM | #214 c6702431447 | Any approving comment counts | keep | standing approval reading |  |
| S27 | 2026-11-07 1:09 AM | #41 c6703194946 | Rule changes under standing approval | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S28 | 2026-11-07 8:41 PM | #41 c6715749219 | Retire amendments.md (P0) | remove | done; S31 records reading A |  |
| S29 | 2026-11-08 12:23 AM | #41 c6717696401 | Merge-queue fixes P0 | edit | the merge-queue-first entries merged into the latest | S226 |
| S30 | 2026-11-08 12:28 AM | #41 c6717736981 | Process tasks by impact | keep | standing ordering rule |  |
| S31 | 2026-11-08 12:39 AM | #41 c6717825935 | Rules recorded in one step | automate | tools/ruling_record.py add does it (built); the section's intro already says so | T-3373 (done) |
| S32 | 2026-11-08 7:50 AM | #228 c6721709832 | Move data to the SSD | edit | disk entries merged into the latest | S263 |
| S33 | 2026-11-08 9:13 AM | #41 c6722553927 | Free disk past 20 GB | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S34 | 2026-11-08 6:08 PM | #41 c6728454947 | Process day 11-09, erase Simulators | keep | day part spent, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S35 | 2026-11-08 6:42 PM | #41 c6728815352 | Process changes approved by rule | keep | keeps Commandment 57 and 6, 7, 11; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S36 | 2026-11-08 7:06 PM | #235 c6729077213 | Keep the disk clear without asking | edit | disk entries merged into the latest | S263 |
| S37 | 2026-11-08 7:46 PM | #41 c6729576810 | Merge <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> work first | edit | merged with the reds-and-parked-first entry | S221 |
| S38 | 2026-11-08 10:18 PM | #41 c6731410956 | 12-hour clock for the Investors | automate | a deterministic text check on what the Investors read | T-5183 |
| S39 | 2026-11-08 10:55 PM | #232 c6731840760 | No formalities (#232 A) | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S40 | 2026-11-08 11:09 PM | #41 c6732013819 | Land merges Investor-owned paths | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S41 | 2026-11-09 7:30 AM | #41 c6740097433 | Process and site first on 11-09 | remove | day-scoped (11-09); Tenet 1 shares returned 11-10 |  |
| S42 | 2026-11-09 9:23 AM | #41 c6742422211 | Merging parked work on 11-09 | remove | day-scoped; its 'never that large again' lives on as the merge limit (S228) |  |
| S43 | 2026-11-09 10:22 AM | #41 c6743771068 | Merge queue by priority | keep | standing |  |
| S44 | 2026-11-09 11:33 AM | #41 c6745465728 | Lock In for 11-09 | remove | day-scoped, ended |  |
| S45 | 2026-11-09 1:30 PM | #41 c6748118057 | Company data off the internal disk | edit | disk entries merged into the latest | S263 |
| S46 | 2026-11-09 1:34 PM | #244 c6748186319 | Undo the 10-31 guard tightening | keep | spent security-guard change; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S47 | 2026-11-09 1:39 PM | #41 c6748284039 | Merge past Spread on 11-09 | remove | day-scoped (until midnight 11-09) |  |
| S48 | 2026-11-09 4:21 PM | #246 c6751782955 | Delete eight checked folders | keep | spent, but keeps the whole-scratch cleanup refused; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S49 | 2026-11-09 4:22 PM | #245 c6751800160 | Erase the SanDisk | keep | spent, but keeps 'never the internal disk or the Company SSD'; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S50 | 2026-11-09 4:23 PM | #247 c6751816017 | Narrower security undo | keep | spent security change; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S51 | 2026-11-09 6:49 PM | #41 c6754641345 | Merge sizing; spend research | keep | keeps 'any spend needs the Investors' approve' (Commandment 7) |  |
| S52 | 2026-11-09 7:34 PM | #251 c6755404626 | Merge checks on the MacBook, no spend | keep | standing; keeps the no-spend line |  |
| S53 | 2026-11-09 7:43 PM | #251 c6755547646 | New runner job kinds | keep | keeps the runner's box, limits and self-test |  |
| S54 | 2026-11-09 7:45 PM | #248 c6755583965 | Delete safe company files | keep | keeps the Investors' personal files off limits |  |
| S55 | 2026-11-09 7:49 PM | #41 c6755649043 | No Needs-you for Investor-owned files | keep | keeps the charter-reserved approve items (59) |  |
| S56 | 2026-11-09 7:58 PM | #41 c6755788886 | Investor-owned edits stay off the Investors' list | edit | says the same as S55, which stays | S55 |
| S57 | 2026-11-09 8:00 PM | #253 c6755814517 | One approve per issue | keep | standing approval reading (59) |  |
| S58 | 2026-11-09 9:06 PM | #41 c6756912112 | Merge improvements never parked | edit | the merge-queue-first entries merged into the latest | S226 |
| S59 | 2026-11-09 9:10 PM | #41 c6756983435 | Merge-queue-only mode on | edit | S111 is the latest word on merge-queue-only mode | S111 |
| S60 | 2026-11-09 9:13 PM | #41 c6757020253 | Stop Simulators for merge CPU | edit | merged into the Simulators-on-demand entry | S61 |
| S61 | 2026-11-09 9:47 PM | #41 c6757537203 | Raise fixes as issues; Simulators on demand | edit | absorbs S60 | S61 (survivor) |
| S62 | 2026-11-09 10:17 PM | #41 c6757983354 | Personal sessions unchanged | remove | superseded: every account takes board work (S158, S183) |  |
| S63 | 2026-11-09 10:22 PM | #41 c6758049770 | Per-worker copies | keep | standing |  |
| S64 | 2026-11-09 10:32 PM | #41 c6758189230 | Workers get what they need | keep | standing |  |
| S65 | 2026-11-10 12:12 AM | #41 c6759690460 | Idle is fine; merge-only exit | edit | 'idle is fine' is reversed by S183 and the exit rule by S111 | S183 |
| S66 | 2026-11-10 12:13 AM | #41 c6759690836 | One merge limit | edit | the merge-limit entries merged into the latest | S228 |
| S67 | 2026-11-10 12:19 AM | #41 c6759701394 | November audit approvals | keep | audit closed, but names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) (the three gates) |  |
| S68 | 2026-11-10 12:31 AM | #41 c6759870942 | Fable reset for the audit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S69 | 2026-11-10 8:10 AM | #41 c6768271815 | Audit runs to done | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S70 | 2026-11-10 9:29 AM | #41 c6769965368 | Fable near 100% of the window | keep | standing |  |
| S71 | 2026-11-10 4:41 PM | #41 c6779999925 | Audit sessions' agent count | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S72 | 2026-11-10 5:20 PM | #41 c6780842871 | Personal usage paused | remove | superseded by S114, S154, S158 and S183 |  |
| S73 | 2026-11-10 6:07 PM | #41 c6781793272 | Audit resumes on main | remove | superseded by S158 and S183 |  |
| S74 | 2026-11-10 6:28 PM | #41 c6782171902 | Audit not held by usage limits | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S75 | 2026-11-10 10:17 PM | #41 c6785957460 | This Session waits on the audit | remove | superseded by S202 (after the efficiency batch); carried on T-4010's line |  |
| S76 | 2026-11-11 12:15 AM | #41 c6787708643 | Personal accounts fix sent-back pieces | remove | superseded by S114, S154 and S158 |  |
| S77 | 2026-11-11 8:35 AM | #41 c6797291498 | Lock In on 11-11 | remove | day-scoped, ended |  |
| S78 | 2026-11-11 8:37 AM | #261 c6797318759 | Investors' lane stop at any percent | edit | the lane-stop entries merged | S89 |
| S79 | 2026-11-11 8:46 AM | #41 c6797513466 | No emojis on the site | automate | a deterministic site check; its This Session half is on T-4010's line. Note: T-4226 (emoji reactions in Chat, an Investor 11-12) is a later Investor ask that the check must allow or the Investors must rule on | T-5184 |
| S80 | 2026-11-11 9:00 AM | #41 c6797836020 | Home stage names | keep | standing site rule |  |
| S81 | 2026-11-11 9:21 AM | #41 c6798332977 | Queue audit and sweep | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md; the sweep is T-4103 |  |
| S82 | 2026-11-11 9:23 AM | #41 c6798394283 | Queue audit main-only | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S83 | 2026-11-11 9:26 AM | #261 c6798460306 | Company may trip a lane stop | keep | keeps the guard change behind an approve |  |
| S84 | 2026-11-11 10:17 AM | #41 c6799650908 | Umbrellas apart from dependencies | keep | standing queue rule |  |
| S85 | 2026-11-11 10:20 AM | #41 c6799724387 | Links at creation | automate | board_tick add requires the Links field (built); S86 replaced its one-label design | T-4100 (done) |
| S86 | 2026-11-11 10:22 AM | #41 c6799769890 | Typed links | automate | tools/board_links.py records typed links and derives roles (built) | T-4100 (done) |
| S87 | 2026-11-11 10:29 AM | #41 c6799931210 | Queue holds only ready tasks | keep | standing queue rule |  |
| S88 | 2026-11-11 10:36 AM | #41 c6800100308 | Audit waits for a go | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S89 | 2026-11-11 1:15 PM | #261 c6803710746 | Lane stops | edit | absorbs S1 and S78: one lane-stop entry | S89 (survivor) |
| S90 | 2026-11-11 1:30 PM | #41 c6804043560 | Audit on Evan's account | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S91 | 2026-11-11 1:34 PM | #41 c6804132446 | Audit after the notes migration | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S92 | 2026-11-11 3:33 PM | #41 c6806546659 | Go for the audit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S93 | 2026-11-11 3:37 PM | #41 c6806603393 | Audit start rule | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S94 | 2026-11-11 5:09 PM | #41 c6808244114 | Audit past half a week | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S95 | 2026-11-11 8:11 PM | #41 c6811398048 | Audit main priority | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S96 | 2026-11-11 8:48 PM | #41 c6811975662 | Audit removes cited lines | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S97 | 2026-11-11 9:09 PM | #41 c6812296895 | Site: fewest words | keep | standing site rule |  |
| S98 | 2026-11-11 10:21 PM | #41 c6813391969 | An Investor ask keeps no line by itself | keep | still how queue maintenance judges site and process lines |  |
| S99 | 2026-11-11 10:23 PM | #41 c6813432627 | Re-judge earlier keeps | remove | one-time re-judging, done in the audit |  |
| S100 | 2026-11-11 11:13 PM | #41 c6814286499 | Task-process redesign research | remove | done (T-4122) |  |
| S101 | 2026-11-11 11:19 PM | #41 c6814398967 | Audit tasks on Fable | remove | superseded by S158 and S177 |  |
| S102 | 2026-11-11 11:25 PM | #41 c6814496533 | Report slow setups at once | keep | standing |  |
| S103 | 2026-11-12 12:42 AM | #41 c6815739441 | Fable 5.2 for the audits | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md; S177 sets model use |  |
| S104 | 2026-11-12 12:44 AM | #41 c6815771051 | Web fetching allowed | keep | keeps Commandments 6 and 58's limits |  |
| S105 | 2026-11-12 12:54 AM | #41 c6815915432 | Restructuring session setup | keep | spent, but keeps 'nothing adopted without approve' (creative gate) |  |
| S106 | 2026-11-12 12:57 AM | #41 c6815964526 | Audit pause before the Fable limit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S107 | 2026-11-12 1:04 AM | #41 c6816067946 | Merge-only mode ended 11-12 1:05 AM | edit | reversed 57 minutes later by S111 | S111 |
| S108 | 2026-11-12 1:10 AM | #41 c6816169923 | No Set aside stage | keep | standing |  |
| S109 | 2026-11-12 1:13 AM | #41 c6816236288 | Any account runs any model | keep | standing |  |
| S110 | 2026-11-12 1:55 AM | #41 c6816978003 | Audits on Fable 5.2 | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S111 | 2026-11-12 2:01 AM | #41 c6817072037 | Merge-queue-only mode | keep | the latest word on that mode; absorbs S59 and S107. Its 'while the audits run' clause is spent; whether the mode is still on is read from tools/governor.py, not this text |  |
| S112 | 2026-11-12 2:04 AM | #41 c6817131437 | Audit first, 11-12 | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S113 | 2026-11-12 7:49 AM | #41 c6824063725 | Restructuring concurrency | remove | the Restructuring is done |  |
| S114 | 2026-11-12 8:54 AM | #41 c6825519278 | Audit on Jeremy's account | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S115 | 2026-11-12 8:55 AM | #41 c6825558715 | Personal accounts only on audits | remove | superseded by S158 and S177 |  |
| S116 | 2026-11-12 4:19 PM | #41 c6836228832 | Restructuring at two agents | remove | the Restructuring is done |  |
| S117 | 2026-11-12 4:35 PM | #41 c6836577790 | Restart audit sessions | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S118 | 2026-11-12 5:22 PM | #41 c6837559986 | Living documentation | keep | standing |  |
| S119 | 2026-11-12 5:23 PM | #41 c6837583046 | Docs tools research; paid needs approve | keep | keeps the spend approve (Commandment 7) |  |
| S120 | 2026-11-12 7:59 PM | #41 c6840578140 | Operators on Opus high | edit | narrowed by S122; merged there | S122 |
| S121 | 2026-11-12 8:01 PM | #41 c6840603861 | App lines into features | edit | merged into the every-task-in-a-Feature entry | S235 |
| S122 | 2026-11-12 8:02 PM | #41 c6840619567 | Work-session Operators on Opus | edit | absorbs S120 | S122 (survivor) |
| S123 | 2026-11-12 8:50 PM | #41 c6841419857 | Restructuring before the audit | remove | ended by S155 |  |
| S124 | 2026-11-12 9:00 PM | #41 c6841572370 | Restructuring alternates accounts | remove | the Restructuring is done |  |
| S125 | 2026-11-12 9:02 PM | #41 c6841598799 | More than two Fable workers | remove | the Restructuring is done |  |
| S126 | 2026-11-12 9:02 PM | #41 c6841609331 | Two-worker fallback | remove | the Restructuring is done |  |
| S127 | 2026-11-12 9:43 PM | #41 c6842238940 | Fable audits use the whole window | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S128 | 2026-11-12 9:47 PM | #41 c6842298562 | Smallest change for one-time audits | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S129 | 2026-11-13 7:12 AM | #41 c6852529471 | Restructuring not held by burn | remove | the Restructuring is done |  |
| S130 | 2026-11-13 8:18 AM | #41 c6854106654 | Restructuring decisions as Urgent issues | keep | still how open Restructuring decisions reach the Investors |  |
| S131 | 2026-11-13 10:23 AM | #282 c6857295904 | A phone proof per phase | edit | S156 replaced it (no TestFlight test until the restructuring is done) | S156 |
| S132 | 2026-11-13 10:34 AM | #282 c6857553642 | Phase B beside the premades fix | remove | the premades failure is closed (S156) |  |
| S133 | 2026-11-13 10:41 AM | #270 c6857711513 | 1.0 waits for the Builder | keep | standing product decision; its date range is history (current date in ops/milestones.json) |  |
| S134 | 2026-11-13 10:42 AM | #271 c6857734527 | Nothing out near Day 60 | keep | standing |  |
| S135 | 2026-11-13 10:43 AM | #281 c6857762837 | The Project is the unit | keep | product decision |  |
| S136 | 2026-11-13 10:46 AM | #283 c6857824620 | Python inside the widget first | keep | product decision |  |
| S137 | 2026-11-13 10:47 AM | #272 c6857855411 | Pages in 1.0 | keep | product decision |  |
| S138 | 2026-11-13 10:50 AM | #276 c6857924837 | Components and Gallery | keep | product decision |  |
| S139 | 2026-11-13 11:22 AM | #280 c6858665300 | Restructuring 11 tables | keep | product decision |  |
| S140 | 2026-11-13 11:24 AM | #297 c6858715463 | App page with diagrams | keep | standing site rule |  |
| S141 | 2026-11-13 11:26 AM | #296 c6858751865 | iPad in the Simulator | edit | says the same as S178, which stays | S178 |
| S142 | 2026-11-13 11:35 AM | #41 c6858956333 | Audit without the Fable pause | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S143 | 2026-11-13 11:43 AM | #41 c6859129775 | Audit mode may be built | automate | built as tools/audit_mode.py; the tool holds the rule | T-4284 (done) |
| S144 | 2026-11-13 11:51 AM | #41 c6859329861 | Audit mode spends all on its audit | automate | tools/audit_mode.py does it (built) | T-4284 (done) |
| S145 | 2026-11-13 12:27 PM | #301 c6860138726 | Fable pause off for the audit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S146 | 2026-11-13 1:15 PM | #41 c6861215001 | Audit helpers on Fable | remove | withdrawn by S149 |  |
| S147 | 2026-11-13 1:35 PM | #41 c6861701678 | Account a stops near its limit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S148 | 2026-11-13 1:48 PM | #41 c6861969242 | Audit mode not to enforce 1:15 | remove | moot once S146 was withdrawn |  |
| S149 | 2026-11-13 1:54 PM | #41 c6862096217 | 1:15 ruling withdrawn | remove | with S146 gone nothing is left to withdraw; S177 sets model use |  |
| S150 | 2026-11-13 5:01 PM | #41 c6866000821 | Jeremy's audit without the pause | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S151 | 2026-11-13 5:04 PM | #41 c6866054849 | Account names | keep | standing |  |
| S152 | 2026-11-13 9:53 PM | #41 c6870537007 | Audit changes checked against Restructuring | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md |  |
| S153 | 2026-11-13 10:11 PM | #41 c6870768748 | Personal accounts start the audit | remove | the one-time audit closed on 2026-11-17 (S219); the words stay in log/rulings.md; S183 covers idle accounts |  |
| S154 | 2026-11-14 2:45 AM | #41 c6874035194 | Personal accounts full speed | edit | merged into the every-account-takes-work entry | S183 |
| S155 | 2026-11-14 5:36 AM | #41 c6876003674 | Audit hold ends | remove | spent |  |
| S156 | 2026-11-14 5:51 AM | #282 c6876177229 | Premades failure closed | edit | absorbs S131 | S156 (survivor) |
| S157 | 2026-11-14 1:22 PM | #41 c6882155483 | Lock In 1:40-2:00 PM 11-14 | remove | expired |  |
| S158 | 2026-11-14 4:09 PM | #41 c6884234782 | Board order, fitting model | keep | standing (audit half spent) |  |
| S159 | 2026-11-14 4:23 PM | #41 c6884413186 | Audit and Restructuring changes first | remove | superseded by S261 |  |
| S160 | 2026-11-14 4:34 PM | #303 c6884544941 | Supervisor may start the main session elsewhere | keep | keeps the security-guard change behind an approve |  |
| S161 | 2026-11-14 4:51 PM | #287 c6884749815 | Two-way editing | keep | product decision |  |
| S162 | 2026-11-14 4:55 PM | #306 c6884793369 | Premade inputs | keep | product decision |  |
| S163 | 2026-11-14 4:56 PM | #290 c6884802614 | Mission statement | keep | product decision |  |
| S164 | 2026-11-14 4:58 PM | #286 c6884824220 | Four tabs | keep | product decision |  |
| S165 | 2026-11-14 4:59 PM | #289 c6884835911 | iOS 27 optional | keep | product decision |  |
| S166 | 2026-11-14 5:21 PM | #300 c6885108538 | Snap drag and drop | keep | product decision |  |
| S167 | 2026-11-14 5:23 PM | #273 c6885131684 | No Messages part in 1.0 | keep | product decision |  |
| S168 | 2026-11-14 5:24 PM | #279 c6885141527 | Maybe-later list | edit | S236 took Controls (the Control Center button) out of 'maybe later' | in line with S236 |
| S169 | 2026-11-14 5:35 PM | #295 c6885275925 | No outside testers | keep | product decision |  |
| S170 | 2026-11-14 5:36 PM | #277 c6885282942 | Shared items: text and symbols | keep | product decision |  |
| S171 | 2026-11-14 5:37 PM | #274 c6885292665 | Marketplace in stages | keep | product decision |  |
| S172 | 2026-11-14 5:38 PM | #284 c6885304072 | Less reach for others' code | keep | product decision |  |
| S173 | 2026-11-14 5:39 PM | #285 c6885317294 | Gallery updates by choice | keep | product decision |  |
| S174 | 2026-11-14 5:40 PM | #288 c6885326341 | No server or account | keep | product decision |  |
| S175 | 2026-11-14 5:41 PM | #292 c6885342790 | Reports and DMCA later | keep | product decision |  |
| S176 | 2026-11-14 5:42 PM | #293 c6885351357 | 13 and over | keep | keeps the children-under-13 ban |  |
| S177 | 2026-11-14 6:16 PM | #41 c6885758301 | Opus unless Fable is needed | keep | standing (first half spent) |  |
| S178 | 2026-11-14 6:27 PM | #299 c6885880386 | No iPad: Simulator steps | edit | absorbs S141 (no change of text) | S178 (survivor) |
| S179 | 2026-11-15 8:55 AM | #41 c6895366504 | Quit apps the company opened | keep | keeps Investors' apps off limits |  |
| S180 | 2026-11-15 9:00 AM | #41 c6895455412 | Replies name whose message | automate | a deterministic check on the reply line | T-5185 |
| S181 | 2026-11-15 11:32 AM | #41 c6897679914 | Queue check on (option B) | remove | done (T-4448, T-4449, T-4105, T-4129) |  |
| S182 | 2026-11-15 5:24 PM | #41 c6902363948 | Clean instead of pausing | edit | disk entries merged into the latest | S263 |
| S183 | 2026-11-15 5:48 PM | #41 c6902677325 | Every account takes work | edit | absorbs S65 and S154 | S183 (survivor) |
| S184 | 2026-11-15 8:59 PM | #41 c6905224905 | Tap actions | keep | product decision |  |
| S185 | 2026-11-15 9:11 PM | #41 c6905386313 | Buttons in 1.0 | keep | product decision |  |
| S186 | 2026-11-15 9:38 PM | #41 c6905759408 | Feature sessions on early | remove | superseded by S223 |  |
| S187 | 2026-11-15 10:00 PM | #41 c6906066865 | Delete safely; refused deletions to the Investors | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S188 | 2026-11-16 8:57 AM | #41 c6918472330 | Feature mode for T-4191 | remove | superseded by S223 (every feature, no switch) |  |
| S189 | 2026-11-16 8:57 AM | #41 c6918474720 | Smooth animations | keep | product decision |  |
| S190 | 2026-11-16 9:21 AM | #313 c6919054417 | Simulator deletion rules | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S191 | 2026-11-16 9:29 AM | #41 c6919278591 | Feature sessions on, two at once | edit | feature-session entries merged into the latest | S223 |
| S192 | 2026-11-16 9:42 AM | #41 c6919597118 | Clear false main-broken holds | keep | standing |  |
| S193 | 2026-11-16 11:55 AM | #41 c6923065128 | Feature sessions for every feature | edit | feature-session entries merged into the latest | S223 |
| S194 | 2026-11-16 2:34 PM | #41 c6926970950 | Queue order by files | keep | standing; built in part (T-4617), the rest not confirmed |  |
| S195 | 2026-11-16 2:40 PM | #41 c6927100090 | Merge limit 12 to 20 | edit | the merge-limit entries merged into the latest; its first clause is spent | S228 |
| S196 | 2026-11-16 2:46 PM | #41 c6927252062 | Overlapping site and tools lines grouped | edit | merged into the batching entry | S201 |
| S197 | 2026-11-16 4:13 PM | #41 c6929518971 | Queue-audit lines first, 11-16 | remove | applied through ops/kind_first.json; superseded by S261 |  |
| S198 | 2026-11-16 4:21 PM | #41 c6929735241 | P0 efficiency lines first everywhere | keep | standing |  |
| S199 | 2026-11-16 4:26 PM | #41 c6929872372 | Efficiency lines tonight, 11-16 | remove | night-scoped (11-16) |  |
| S200 | 2026-11-16 8:47 PM | #41 c6935343478 | Disk and load without asking | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S201 | 2026-11-16 9:24 PM | #41 c6936049142 | Batch process and site changes | edit | absorbs S196; its 'built now' clause is spent | S201 (survivor) |
| S202 | 2026-11-16 9:32 PM | #41 c6936208952 | Batch build; This Session after it | keep | standing |  |
| S203 | 2026-11-16 9:43 PM | #294 c6936383204 | Bank and tax; app name timing | keep | money steps stay with the Investors |  |
| S204 | 2026-11-16 9:43 PM | #278 c6936377709 | Pro contents | edit | S240 (#324 A) narrowed Pro's 'Python within the widget' to button runs | in line with S240 |
| S205 | 2026-11-16 9:44 PM | #275 c6936395981 | Letter to Apple | keep | product decision |  |
| S206 | 2026-11-16 9:45 PM | #141 c6936422488 | Voice rule | keep | standing |  |
| S207 | 2026-11-16 9:55 PM | #278 c6936602056 | Themes and showcase premades | keep | product decision |  |
| S208 | 2026-11-16 10:21 PM | #41 c6937099886 | American spelling | automate | a deterministic spelling check on app, site and reply text | T-5186 |
| S209 | 2026-11-16 10:42 PM | #291 c6937530068 | Visual direction | keep | product decision |  |
| S210 | 2026-11-16 10:57 PM | #41 c6937796378 | Build sessions trimmed | keep | standing |  |
| S211 | 2026-11-16 11:03 PM | #41 c6937891783 | Worker changes approved | keep | standing approval |  |
| S212 | 2026-11-16 11:07 PM | #41 c6937976848 | No hiring rounds | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S213 | 2026-11-16 11:26 PM | #41 c6938306456 | IDE and Builder above premades | keep | product priority |  |
| S214 | 2026-11-16 11:37 PM | #41 c6938494530 | Phase A done; Developer mode | keep | product decision |  |
| S215 | 2026-11-17 12:01 AM | #41 c6938954005 | No 150-turn <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> | keep | standing |  |
| S216 | 2026-11-17 12:27 AM | #41 c6939492685 | Pro showcase; name research | keep | product decision |  |
| S217 | 2026-11-17 12:56 AM | #41 c6940053735 | Bad tests never block merges | keep | standing test policy |  |
| S218 | 2026-11-17 6:35 AM | #41 c6946899890 | Audit wind-up | edit | S219 already carries it | S219 |
| S219 | 2026-11-17 6:45 AM | #41 c6947112898 | Audit closes; unbuilt process archived | edit | absorbs S218 (no change of text) | S219 (survivor) |
| S220 | 2026-11-17 9:37 AM | #41 c6951158380 | Source-text test lint | keep | standing; its lint is open work (T-4749) |  |
| S221 | 2026-11-17 11:34 AM | #41 c6954285088 | Reds and parked work first | edit | absorbs S37 | S221 (survivor) |
| S222 | 2026-11-17 5:19 PM | #41 c6962666833 | Red means broken behavior | keep | standing test policy |  |
| S223 | 2026-11-17 6:23 PM | #41 c6963972184 | Feature sessions for every feature | edit | absorbs S191 and S193 | S223 (survivor) |
| S224 | 2026-11-17 7:26 PM | #41 c6965124089 | False reds top priority | keep | standing |  |
| S225 | 2026-11-17 8:17 PM | #41 c6966023669 | Waits only on a task or an issue | automate | board_tick.py refuses a wait by date and any other wait (built) | T-4810 (done) |
| S226 | 2026-11-17 8:33 PM | #41 c6966293652 | Merge-queue fixes first | edit | absorbs S20, S29 and S58; its split-queue question was answered by S228 | S226 (survivor) |
| S227 | 2026-11-17 8:43 PM | #41 c6966450021 | Gate waits on progress; live Home | keep | standing |  |
| S228 | 2026-11-17 8:46 PM | #41 c6966497074 | Merge limit by kind | edit | absorbs S66 and S195 | S228 (survivor) |
| S229 | 2026-11-17 9:06 PM | #41 c6966826517 | Process fixes override limits | keep | standing |  |
| S230 | 2026-11-17 9:10 PM | #323 c6966883854 | Routine test-fix refusals not urgent | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S231 | 2026-11-17 9:20 PM | #41 c6967047801 | Bottlenecks open fix tasks | keep | standing; keeps 'unless illegal or spending money' |  |
| S232 | 2026-11-17 9:55 PM | #41 c6967619284 | Flow signals | keep | standing site rule |  |
| S233 | 2026-11-17 10:31 PM | #41 c6968175224 | Process changes in features | edit | merged into the every-task-in-a-Feature entry | S235 |
| S234 | 2026-11-17 11:40 PM | #41 c6969248114 | Name not about widgets | keep | product decision |  |
| S235 | 2026-11-18 12:06 AM | #41 c6969647537 | Every task in a Feature | edit | absorbs S121 and S233 | S235 (survivor) |
| S236 | 2026-11-18 12:09 AM | #41 c6969694208 | Controls in the Widgets feature | keep | product decision |  |
| S237 | 2026-11-18 12:15 AM | #41 c6969786057 | Batch size from data | keep | standing |  |
| S238 | 2026-11-18 12:23 AM | #41 c6969915295 | Batch sizing on Flow | keep | standing site rule |  |
| S239 | 2026-11-18 12:33 AM | #325 c6970075616 | 11-17 asks P0; storage fix | edit | storage half merged into the disk entry; P0 half is S267 | S263 |
| S240 | 2026-11-18 12:36 AM | #324 c6970133683 | #324 A: Pro is button runs | keep | product decision |  |
| S241 | 2026-11-18 12:40 AM | #325 c6970198211 | Safety check allows safe deletions | keep | standing approval of a settings change |  |
| S242 | 2026-11-18 6:23 AM | #325 c6977134306 | Small date moves in reports | keep | standing |  |
| S243 | 2026-11-18 11:42 AM | #325 c6985066876 | Builder rename and delete | keep | product decision |  |
| S244 | 2026-11-18 11:57 AM | #325 c6985477493 | Investor P0 lines past the limit | keep | standing |  |
| S245 | 2026-11-18 11:59 AM | #325 c6985508097 | Failed process change recoded at once | keep | standing |  |
| S246 | 2026-11-18 12:37 PM | #325 c6986480696 | Old parked copy archived on redo | keep | standing |  |
| S247 | 2026-11-18 3:40 PM | #325 c6991006083 | Adaptive time limits | keep | standing |  |
| S248 | 2026-11-18 3:51 PM | #325 c6991291968 | Review guard refusals | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S249 | 2026-11-18 6:05 PM | #327 c6994246056 | Guard changes in plain English | keep | names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) |  |
| S250 | 2026-11-18 6:23 PM | #325 c6994603018 | Open process changes as soon as possible | edit | merged into the latest process-order entry | S267 |
| S251 | 2026-11-18 6:52 PM | #325 c6995142803 | Machine check in sessions | keep | standing |  |
| S252 | 2026-11-18 7:13 PM | #327 c6995516064 | Guard changes <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G1</span>(a), G2, G3, G5 | edit | merged into S253, which widened it | S253 |
| S253 | 2026-11-18 7:16 PM | #327 c6995581028 | Company writes approved guard changes | edit | absorbs S252; names a ban, a security limit, a refusal stop or Commandments 6, 7, 11, 57-59 (T-5165 brief: those entries stay) | S253 (survivor) |
| S254 | 2026-11-18 8:22 PM | #325 c6996741003 | Tool lines join their group | edit | merged into the latest tool-line entry | S257 |
| S255 | 2026-11-18 9:27 PM | #325 c6997806892 | Lock In into 11-19 | automate | day-scoped; a day-scoped entry should retire itself when its day ends | T-5187 |
| S256 | 2026-11-18 9:27 PM | #325 c6997813151 | Lock In 11-19; finished work first | automate | day-scoped Lock In half retires itself at its day's end; the finished-work half is S221 | T-5187 |
| S257 | 2026-11-18 10:15 PM | #325 c6998574912 | Tool lines update open ones | edit | absorbs S254 | S257 (survivor) |
| S258 | 2026-11-18 10:47 PM | #325 c6999077633 | Chat picker back | remove | a task order carried by T-4295's own line, which cites the ruling |  |
| S259 | 2026-11-18 10:52 PM | #325 c6999151206 | Four archived changes back at P0 | keep | task order still open |  |
| S260 | 2026-11-18 10:55 PM | #325 c6999195621 | Every wait can clear itself | keep | T-5034 names held lines (board_tick held_hook, board.py held); a failing standing check is not confirmed built |  |
| S261 | 2026-11-18 10:58 PM | #325 c6999237029 | Process first, app when none startable | edit | absorbs S5 and S25 | S261 (survivor) |
| S262 | 2026-11-18 11:01 PM | #325 c6999279079 | Waits on removed lines | keep | standing |  |
| S263 | 2026-11-18 11:06 PM | #325 c6999358319 | Disk cleanup | edit | absorbs S32, S36, S45, S182 and S239's storage half | S263 (survivor) |
| S264 | 2026-11-18 11:42 PM | #325 c6999922719 | One coordinator P0; midnight Lock In | edit | absorbs S265, which narrowed its Lock In half | S264 (survivor) |
| S265 | 2026-11-18 11:58 PM | #325 c7000166889 | Midnight Lock In for 11-19 only | edit | merged into the entry it narrows | S264 |
| S266 | 2026-11-19 1:40 AM | #325 c7001841415 | Task-queue changes forward | keep | task order still open (11-19) |  |
| S267 | 2026-11-19 1:49 AM | #325 c7001994967 | Recent process changes as soon as possible | edit | absorbs S250 | S267 (survivor) |
| S268 | 2026-11-19 9:17 AM | #325 c7011717982 | One merge route, deep dive first | keep | standing |  |
| S269 | 2026-11-19 11:55 AM | #325 c7015950358 | Other accounts merge stuck work | keep | standing |  |
| S270 | 2026-11-19 12:02 PM | #325 c7016129138 | Standing list stays current | keep | standing; T-5165 part c builds the update step into tools/ruling_record.py, but judging which entry a ruling contradicts stays a person's call |  |

</div>
{% endraw %}

</div>
