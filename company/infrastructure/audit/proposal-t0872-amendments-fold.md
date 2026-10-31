---
layout: "default"
title: "Fold amendments.md into the rules (T-0872, Commandment 59)"
section: "infra"
description: "An audit, proposal or trial from the company's operations records (log/audit/)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/company/infrastructure/audits.html' | relative_url }}">← Infrastructure: Audits</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Operations record</span><span><code>log/audit/proposal-t0872-amendments-fold.md</code></span><span>2026-10-31</span></div><h1>Fold amendments.md into the rules (T-0872, Commandment 59)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}

Status: needs an Investor's approve, then a hand-apply. The applier refuses any diff that touches `amendments.md`, even when approved, and a session can't remove an entry, so one of you applies it (steps below). Same route as #111.
Base: c60e98c4. The diff was built from the four files as they stand at that commit, and `git apply` refuses it if any of them has moved.
Builder: `python3 tools/amend_fold.py --root . --out <dir> --proposal <this file>`. Test: `tests/amend_fold_test.py`.

## Baseline

1. `amendments.md`: 5,916 bytes (`wc -c`), 1,820 over the 4,096-byte line. n = 7 entries (`grep -c '^## 20'`), 2026-10-29 07:33 to 2026-10-31 10:55 ET.
2. Amendments block in every worker's prompt: 4,850 characters, about 2,484 tokens (`tools/amend_cost.py`: 0.51 tokens per character, 95% interval 0.50 to 0.54, n = 163 streams).
3. `CLAUDE.md`: 62,362 bytes, loaded by the Operator only. `rules/worker-rules.md`: 10,443 bytes.

## Predicted effect

1. `amendments.md`: 5,916 to 1,101 bytes, 0 entries.
2. Worker prompts: 4,850 fewer characters on every call, about 2,484 tokens. `rules/worker-rules.md` loses 9 bytes.
3. Operator: `CLAUDE.md` gains 2,020 bytes and `amendments.md` loses 4,815, so its load falls by 2,795 bytes.
4. `log/rulings.md`, which no session loads: 39,129 to 44,488 bytes, 32 to 39 rulings.
5. No change in what the company may do. Each rule says today what the rulings already made it mean.

Measure after: `wc -c amendments.md`; the block size from `rules/build_agents.py`; `tools/amend_cost.py` on the next 7 days of worker streams.

## What changes, rule by rule


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What changes, rule by rule, scrolls sideways" style="--tw:809px" markdown="1">

| Ruling | Rule | Change |
| --- | --- | --- |
| 10-29 07:33 | The Mission, product line | "around Day 17" gains "(a flexible date; see Dates)". |
| 10-29 07:33 | The Mission, Dates row | The row reads "About Day 17 (2026-11-07), flexible", and says a solution to widget freshness takes priority over a quick launch. |
| 10-29 07:33, 10:17 | Tenet 1 | Adds the current priority: widget freshness, the search order, every option considered, each option's limits and delays reported. Says the work follows the Tenet 6 table and doesn't need Fable. |
| 10-30 17:24, 10-31 10:50, 10:52, 10:55 | Tenet 6 | New "Personal accounts" bullet. |
| 10-31 10:55 | Tenet 6, even pace | New sentence for the spread lift. Temporary: "this lift ends when that setup is done". |
| 10-30 17:24, 10-31 10:50, 10:52 | Commandment 2 | One sentence: the personal accounts are the one exception to "personal ... accounts", for running company sessions only, with personal data still banned. |
| 10-31 00:41 | Commandment 39 | Item 2 loses the Needs-you panel clause. |
| 10-31 00:41 | Commandment 52 | The report copy "never appears as a request". One added sentence: reports carry no list or panel, a report session opens no request issue, requests are raised outside reports and flagged on the Issues page. |
| 10-31 00:41 | Commandment 54 | No change. It has no clause about reports, though the ruling's Affects line names it. |
| 10-31 00:41 | Commandment 55 | Loses "or the report" as a place to answer, the panel sentence, and the report as a source of answers. |

</div>


Notes that say the fold happened: the Version 2 paragraph of `CLAUDE.md`, line 16 of `rules/worker-rules.md`, line 15 of `amendments.md`, and the count line of `log/rulings.md`.

## Two things to check

1. **Commandment 56 changes, and the ruling's Affects line doesn't name it.** "Keep waiting and raise it again in the next report" becomes "raise it again on its own issue". Left alone, the fold would leave a rule telling the company to put an open request in a report, which the 00:41 ruling ended.
2. **Commandment 55 keeps one part of the panel sentence.** The panel goes. The part on how it works (live from GitHub through the saved token, posted as your own account, nothing private in the public page) moves to the Issues tab, because that is how the Issues tab works (`tools/site/needs.py`). "A reader without a token sees only how many requests are open" goes: it described the panel, and the Issues tab shows public readers titles and numbers.

## What must hold, and where it sits

1. Commandment 6 limit: Tenet 6, Personal accounts: "Commandment 6 is not excepted and still applies: this use stands on the account owner's reading of Anthropic's terms, and it stops if Anthropic says otherwise." Commandment 6's own text is untouched, including its line on extra accounts.
2. Off by default, personal data banned: same bullet: "Every personal account is off by default" and "Commandment 2's ban on personal data holds in every such session"; Commandment 2 repeats the ban.
3. Spread lift temporary: Tenet 6, even pace: "For a limited time ... this lift ends when that setup is done". The sentence is spent once the setup is done, and the next fold drops it.
4. Day 17 flexibility: in the date row.
5. Reports: the four Commandments lose the clauses above and nothing else. "Report sweeps never close a request" stays.

The builder refuses to write the diff if any of these phrases is missing.

## Checks run

1. Entries: 7 in `amendments.md`, 7 folded, 0 left. The builder refuses an entry with no plan, and an Affects item with no edit and no written reason.
2. Words: each of the 7 entries sits in the new `log/rulings.md` exactly once, byte for byte, with its header, quote, Affects and Effect lines.
3. Commandments 6, 7, 11 and worker-rules item 7: unchanged, checked with the applier's own section list.
4. The diff turns the old files into the new ones and back, byte for byte, with plain `git apply` and `git apply -R`.
5. `tools/ruling_quote_check.py`: 192 ruling quotes and 20 cited sentences checked. 13 flagged, all 13 in `amendments.md`, which is the move this diff makes. None in the other three files.
6. Tests: `tests/amend_fold_test.py`, 27 of 27. `tests/run.sh --fast` on a clone with the fold applied: 3 suites red. `amend_compact_test.py` failed because of the fold: it assumed live entries. Fixed, and the fix lands first (it is in this commit, 10 of 10 on both trees). `macbook_runner_update_test.py` and `site_report_needs_test.py` hit the runner's 240 s limit on a loaded machine. Run alone with no limit on the folded tree: 125 passed, 0 failed, and 182 passed, 0 failed. `site_report_needs_test.py` also times out on the unfolded tree and scores 182 there, so that timeout is not this change.
7. `rules/lookup.py --amendments` prints "No amendments in effect." The worker block is 0 characters, and `rules/build_agents.py` handles that, as it did after Commandments v2.

## Not in this diff

Three lines in `setup/` still name the report's Needs-you panel: `setup/OPERATIONS.md` lines 267 and 284, `setup/INVESTORS.md` line 157. They are guides, Investor-owned, and the amendment already overrides them. A follow-up proposal can bring them in line.

## How to apply

On the Mac mini, between sessions:

1. Reply `approve` on the issue, then reply `PAUSE` so no session is running.
2. In the company folder, run `git pull`, then `git apply --index log/audit/proposal-t0872-amendments-fold.diff`. If it refuses, stop and say so on the issue: a file moved, or a new amendment landed, and the company rebuilds the diff.
3. Run `python3 rules/lookup.py --amendments`. It must print `No amendments in effect.`
4. Run `git commit -m "Fold the amendments into the rules (T-0872)"`, then `git push`.
5. Reply `RESUME`.

## Revert rule

One `git revert` of that commit puts all four files back, entries included. Do it if a rule reads wrongly after the fold, or if `tests/run.sh --fast` goes red on main because of this commit. The company checks that within a day of the apply. With no approve, nothing changes.

## The diff

````diff
diff --git a/amendments.md b/amendments.md
index 6f2566d..a1fa2f6 100644
--- a/amendments.md
+++ b/amendments.md
@@ -14,44 +14,2 @@ Effect: <one line on what changed, written by the Operator>
 
-Every entry made before Commandments v2 (2026-10-27) is written into `CLAUDE.md` and `rules/worker-rules.md`. Their exact words are in `log/rulings.md` and git history.
-
-## 2026-10-29 07:33 ET — an Investor — (private)
-> We can confirm that this is a critical design decision, and the Investors approve the decision to research these solutions (A preferred) on the highest model. This should be your current priority. Please note that the Day 17 launch is flexible, and a solution to the redraw limitations easily takes priority over a quick launch. The Company should consider all options that allow for a more dynamic product for the user regardless of any impact on the launch date, and let us know about any limitations (delays included) with each idea. A truly live widget that’s open without the app running in the background is preferred, so perform a deep search about this possibility before looking into other options that concede more of the efficiency.
-
-Affects: Mission (Dates: Day 17 submission), Tenet 1, Tenet 6
-Effect: The Day 17 submission is flexible; solving widget freshness (a widget that updates live without the app running, Python in the widget preferred) is the current priority and runs on Fable, with every option's limits and launch delay reported to the Investors.
-
-## 2026-10-29 10:17 ET — an Investor — (private)
-> You don't need to use Fable for this
-
-Affects: Tenet 6 (the 2026-10-29 07:33 entry's model)
-Effect: Widget-freshness work no longer has to run on Fable; it follows the Tenet 6 table (Opus high for its design and build, Fable only for that table's own rows). The 07:33 entry's priority and the flexible Day 17 date stand.
-
-## 2026-10-30 17:24 ET — an Investor — (private)
-> This is within normal usage limits, so it fits all of Anthropic's requirements. Additionally, we can use my account as long as it bans access to personal data.This is also an exception to Commandment/Tenet 6
-
-Affects: Tenet 6, 2
-Effect: an Investor's personal Claude subscription may run company sessions, off by default and toggled by the Investors, as an exception to Tenet 6's extra-accounts ban, with Commandment 2's ban on personal data enforced. Commandment 6 can't be excepted: it still applies, this stands as the account owner's reading of Anthropic's terms, and the use stops if Anthropic says otherwise.
-
-## 2026-10-31 00:41 ET — an Investor — (private)
-> All open issues should no longer be included in the daily reports, and reports should never create a Needs You issue. Instead, all issues should continue to be flagged from the Issues page of the site, as needed, and reports should be reserved for a daily update
-
-Affects: 39, 52, 54, 55
-Effect: Reports carry no list or panel of open requests, report sessions open no request issues, and the report's notification copy never appears as a request; requests are raised outside reports and flagged on the site's Issues page.
-
-## 2026-10-31 10:50 ET — an Investor — (private)
-> Also make sure that multiple personal accounts can be set up to contribute to the project, not just one extra. The investors have 2 total
-
-Affects: Tenet 6, 2
-Effect: The personal lane is built for more than one Investor account, two today, each under the 2026-10-30 17:24 terms; an account runs only after its own owner agrees and signs in.
-
-## 2026-10-31 10:52 ET — an Investor — (private)
-> I approve! Include the option to use my personal Claude usage as well
-
-Affects: Tenet 6, 2
-Effect: an Investor's personal Claude account joins the personal lane on the same terms: off by default, personal data banned, Commandment 6 still applies, and the use stops if Anthropic says otherwise.
-
-## 2026-10-31 10:55 ET — an Investor — (private)
-> You may use as many subagents as needed right now to finish the personal account setup, ignoring the Spread usage limits until this is done.  When enabling personal usage, the investors can choose which account they are enabling (Evan or Jeremy) and whether they want the mode to be Spread or Lock In. The usage from these personal accounts should be tracked separately, though this can be simplified (for example "Usage added by personal accounts" is sufficient)
-
-Affects: Tenet 6
-Effect: The daily spread is lifted for personal lane work until that work is done (lock_in.json, renewed each day; weekly and 5-hour limits still hold); enabling picks the account and Spread or Lock In; personal usage is tracked apart, one line is enough.
+Every entry up to 2026-10-31 10:55 ET is written into `CLAUDE.md` and `rules/worker-rules.md`. Their exact words are in `log/rulings.md` and git history.
diff --git a/CLAUDE.md b/CLAUDE.md
index fa36394..f9ba512 100644
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -13,3 +13,3 @@ Commandments 6, 7 and 11 (the law, high-risk areas, human checks) can never be o
 
-**Version 2.** Every rule here says what it means today. The Investors' rulings up to 2026-10-26 23:16 ET are written into the rules they changed, and the Investors approved this text as written. Their exact words are archived in `log/rulings.md`, which no session loads; read it only when the original wording matters. Numbers are unchanged from version 1, so every tool, hook and guard that cites a Commandment still points to the same subject. One ruling stays quoted word for word under Commandment 58, because it is an exact operating permission that the fetch tools check.
+**Version 2.** Every rule here says what it means today. The Investors' rulings up to 2026-10-26 23:16 ET are written into the rules they changed, and the Investors approved this text as written. The seven rulings from 2026-10-29 07:33 to 2026-10-31 10:55 ET were folded into the rules the same way (T-0872). Their exact words are archived in `log/rulings.md`, which no session loads; read it only when the original wording matters. Numbers are unchanged from version 1, so every tool, hook and guard that cites a Commandment still points to the same subject. One ruling stays quoted word for word under Commandment 58, because it is an exact operating permission that the fetch tools check.
 
@@ -19,3 +19,3 @@ Commandments 6, 7 and 11 (the law, high-risk areas, human checks) can never be o
 
-**The product is pywidget**, the Python IDE and widget builder the Investors chose on 2026-10-25 (build brief: `ops/plans/pywidget/build-brief.md`). The company builds the best version of it that it can: a complete, polished first version submitted around Day 17, then improved without stopping (Tenet 2). A pivot or a new product line needs the Investors (Commandment 50). Earlier candidates stay stored in `pitches/`.
+**The product is pywidget**, the Python IDE and widget builder the Investors chose on 2026-10-25 (build brief: `ops/plans/pywidget/build-brief.md`). The company builds the best version of it that it can: a complete, polished first version submitted around Day 17 (a flexible date; see Dates), then improved without stopping (Tenet 2). A pivot or a new product line needs the Investors (Commandment 50). Earlier candidates stay stored in `pitches/`.
 
@@ -51,3 +51,3 @@ Commandments 6, 7 and 11 (the law, high-risk areas, human checks) can never be o
 | Day 12 (2026-11-02) | The Paid Apps Agreement, tax and banking are active (the Investors). |
-| About Day 17 (2026-11-07) | App Store submission of a complete first version. App Review usually takes one to three days and can reject a build. |
+| About Day 17 (2026-11-07), flexible | App Store submission of a complete first version. The date is flexible: a solution to widget freshness takes priority over a quick launch (Investors, 2026-10-29). App Review usually takes one to three days and can reject a build. |
 | Launch to Day 30 | Sell and improve (Tenet 2). |
@@ -62,3 +62,3 @@ These tenets come before every numbered Commandment. Where a Commandment sets a
 
-**Tenet 1: The mission comes first.** Every task traces back to earning $200 by Day 30 with pywidget. The product is the main priority. Until the Day 17 submission, at least 70% of each week's project usage goes to the product itself (its design, code, tests, review, release, and research for it), at most 10% to improving the company's own processes (`[ops]`), and at most 5% to the site (`[site]`); the Operator and planning share the rest. The usage page shows all four against these lines. The story is produced alongside the work, never instead of it.
+**Tenet 1: The mission comes first.** Every task traces back to earning $200 by Day 30 with pywidget. The product is the main priority. Its current priority is solving widget freshness: a truly live widget that updates without the app running, with Python in the widget preferred. The company searches that possibility in depth before options that concede efficiency, considers every option that makes the product more dynamic whatever it does to the launch date, and tells the Investors each option's limits and delays. This work follows the Tenet 6 table; it doesn't need Fable (Investors, 2026-10-29). Until the Day 17 submission, at least 70% of each week's project usage goes to the product itself (its design, code, tests, review, release, and research for it), at most 10% to improving the company's own processes (`[ops]`), and at most 5% to the site (`[site]`); the Operator and planning share the rest. The usage page shows all four against these lines. The story is produced alongside the work, never instead of it.
 
@@ -86,4 +86,5 @@ Escalate one row when a task fails: after two failed attempts on Sonnet, or one
 - **Hard limits.** Fable uses at most half of the weekly limit, counted against the same total, so every Fable token is one the other models can't use. It is used as much as its work needs, never to fill its share. The governor and a hook stop Fable at its cap, and the company uses Opus until the reset. Usage credits on the subscription stay off. Diaries and small talk run only on Haiku.
-- **An even daily pace.** The governor holds each day to about an even share of what remains of the week's limit, spread over the days left before the weekly reset, so the whole limit is used by the reset without being reached early. By default it also spreads the day's share to midnight, sizing the pool so work runs steadily instead of in bursts; an Investor's "LOCK IN" lifts the spread for that day (Investors, 2026-10-26). When a day's share is spent, Claude work waits for the next day's share; this is intended. In the last day before the weekly reset, whatever remains of the week is released, so none of it expires. The usage page and the reports show today and the week against an even pace.
+- **An even daily pace.** The governor holds each day to about an even share of what remains of the week's limit, spread over the days left before the weekly reset, so the whole limit is used by the reset without being reached early. By default it also spreads the day's share to midnight, sizing the pool so work runs steadily instead of in bursts; an Investor's "LOCK IN" lifts the spread for that day (Investors, 2026-10-26). For a limited time, work on the personal-account setup also runs without the spread and with as many subagents as it needs (`ops/lock_in.json`, renewed each day); the weekly and 5-hour limits still hold, and this lift ends when that setup is done (Investors, 2026-10-31). When a day's share is spent, Claude work waits for the next day's share; this is intended. In the last day before the weekly reset, whatever remains of the week is released, so none of it expires. The usage page and the reports show today and the week against an even pace.
 - **Never idle.** When a limit is reached, keep making progress with code that doesn't need Claude: builds, tests, Simulator runs, and scripts already written. Never get around the limits with extra accounts, paid API usage, or usage credits.
+- **Personal accounts.** Each Investor's personal Claude subscription (two today) may run company sessions. This is the one exception to the ban on extra accounts (Investors, 2026-10-30 and 2026-10-31). Every personal account is off by default: the Investors turn it on and off, and it runs only after its own owner agrees and signs in. When enabling one, the Investors choose which account and whether its mode is Spread or Lock In. Commandment 2's ban on personal data holds in every such session. Commandment 6 is not excepted and still applies: this use stands on the account owner's reading of Anthropic's terms, and it stops if Anthropic says otherwise. Usage from these accounts is tracked apart, and one line is enough ("Usage added by personal accounts").
 - **Sessions end for a reason.** A session ends when a between-session job is waiting (a push, an applied change, a new amendment, a report, or a fix that needs the repository to itself), when its context has grown past the size the supervisor sets, or when it reaches its time limit. It never ends by letting a full pool of agents drain. Progress lives in files, not in conversation history.
@@ -126,2 +127,4 @@ When usage is tight, cut small talk first, then hiring rounds to their fallback
 
+The personal Claude accounts under Tenet 6 are the one exception to the first item, for running company sessions only, and access to the Investors' personal data stays banned in every such session (Investors, 2026-10-30).
+
 A hook (`rules/hooks/security-guard.py`) refuses commands that would weaken the machine's security, and every `sudo` command is logged to `log/sudo.log`. A check that runs every tick (`rules/posture.sh`) raises an emergency if the firewall, FileVault, SIP, Gatekeeper, or automatic security updates are switched off.
@@ -302,3 +305,3 @@ Every ID, code name, and technical term is explained the first time it appears,
 1. **A headline** that says what happened, with the report number, day number, date, and time.
-2. **At a glance:** a summary of the period; the status of each date under The Mission as on track, at risk, or late, with the reason; the Needs-you panel of open requests (Commandment 55); and the day, money, and usage strip.
+2. **At a glance:** a summary of the period; the status of each date under The Mission as on track, at risk, or late, with the reason; and the day, money, and usage strip.
 3. **The story of the period:** the highlights, what went wrong and how it was fixed, the decisions made and why, and what was learned.
@@ -393,5 +396,5 @@ The Investors decide the ending on the Final Report's issue.
 - **Request**: one decision or action per issue, @mentioning both Investors, labeled `urgent` when work is waiting on it and otherwise by its kind (`proposal`, `approval`, `pitch`, or another the company defines).
-- **Report** (`report`): the notification copy of each report. It asks nothing.
+- **Report** (`report`): the notification copy of each report. It asks nothing and never appears as a request.
 
-No request is left only in a report, buried in another thread, or typed into a session on the Mac mini (Investors, 2026-10-22).
+No request is left only in a report, buried in another thread, or typed into a session on the Mac mini (Investors, 2026-10-22). Reports are a daily update: they carry no list or panel of open requests, and a report session opens no request issue. Requests are raised outside reports and flagged on the site's Issues page (Investors, 2026-10-31).
 
@@ -414,3 +417,3 @@ Someone who has read nothing else should be able to decide from the card alone.
 
-**55. Answering and closing requests.** Answering is one step: a reply of "approve", "no", or an option's letter, from either Investor, on the issue, the site, or the report, is enough. The company carries it out, or the applier does for Investor-owned files, including merging a pull request. If something truly needs an Investor's own click on GitHub, the card says so first and links to it. A request stays open until it is answered, withdrawn, or its default is applied, and then closes with a comment saying which. It reopens only for a follow-up. Report sweeps never close a request. Every report's Needs-you panel lists each open request as its card, with a button for each option and a box for a comment; it loads live from GitHub through the token already saved in the Investor's browser and posts as their own account, as the Chat page does, so nothing private is written into the public page, and a reader without a token sees only how many requests are open. The site's Issues tab shows each one with a button for each option. An answer from the report, the issue, or the Chat page lands in the same issue.
+**55. Answering and closing requests.** Answering is one step: a reply of "approve", "no", or an option's letter, from either Investor, on the issue or the site, is enough. The company carries it out, or the applier does for Investor-owned files, including merging a pull request. If something truly needs an Investor's own click on GitHub, the card says so first and links to it. A request stays open until it is answered, withdrawn, or its default is applied, and then closes with a comment saying which. It reopens only for a follow-up. Report sweeps never close a request. The site's Issues tab shows each open request with a button for each option and a box for a comment; it loads live from GitHub through the token already saved in the Investor's browser and posts as their own account, as the Chat page does, so nothing private is written into the public page. An answer from the Issues tab, the issue, or the Chat page lands in the same issue.
 
@@ -420,3 +423,3 @@ Someone who has read nothing else should be able to decide from the card alone.
 - Never take over a task reserved for the Investors (Commandments 10, 11, and 50).
-- If a deadline passes with no answer, take the default action only if it is reversible, within budget, and not a creative-identity or outreach decision. Otherwise, keep waiting and raise it again in the next report.
+- If a deadline passes with no answer, take the default action only if it is reversible, within budget, and not a creative-identity or outreach decision. Otherwise, keep waiting and raise it again on its own issue.
 - An answer that arrives after a default was taken still counts, and the default is reversed if it can be.
diff --git a/rules/worker-rules.md b/rules/worker-rules.md
index 1129272..84424de 100644
--- a/rules/worker-rules.md
+++ b/rules/worker-rules.md
@@ -15,3 +15,3 @@ Where to look: the product, money and the dates (The Mission); models, usage and
 
-The Investors' rulings up to Commandments v2 (2026-10-27) are written into the rules themselves. Their exact words are in `log/rulings.md`, if the wording ever matters.
+The Investors' rulings up to 2026-10-31 10:55 ET are written into the rules themselves. Their exact words are in `log/rulings.md`, if the wording ever matters.
 
diff --git a/log/rulings.md b/log/rulings.md
index 9653a4a..308dd2d 100644
--- a/log/rulings.md
+++ b/log/rulings.md
@@ -4,3 +4,5 @@ An archive, loaded by no session. It holds every Investor ruling that was in eff
 
-32 rulings, oldest first.
+The first 32 are the rulings v2 replaced. The rest were folded into the rules later, each with a line saying where.
+
+39 rulings, oldest first.
 
@@ -357 +359,57 @@ Effect: Answers Urgent #85 with A as written there: the Operator may save a docu
 *In version 1: amendments.md.*
+
+## 2026-10-29 07:33 ET — an Investor — (private)
+> We can confirm that this is a critical design decision, and the Investors approve the decision to research these solutions (A preferred) on the highest model. This should be your current priority. Please note that the Day 17 launch is flexible, and a solution to the redraw limitations easily takes priority over a quick launch. The Company should consider all options that allow for a more dynamic product for the user regardless of any impact on the launch date, and let us know about any limitations (delays included) with each idea. A truly live widget that’s open without the app running in the background is preferred, so perform a deep search about this possibility before looking into other options that concede more of the efficiency.
+
+Affects: Mission (Dates: Day 17 submission), Tenet 1, Tenet 6
+Effect: The Day 17 submission is flexible; solving widget freshness (a widget that updates live without the app running, Python in the widget preferred) is the current priority and runs on Fable, with every option's limits and launch delay reported to the Investors.
+
+*In version 2: folded by T-0872 into The Mission, Tenet 1, Tenet 6.*
+
+## 2026-10-29 10:17 ET — an Investor — (private)
+> You don't need to use Fable for this
+
+Affects: Tenet 6 (the 2026-10-29 07:33 entry's model)
+Effect: Widget-freshness work no longer has to run on Fable; it follows the Tenet 6 table (Opus high for its design and build, Fable only for that table's own rows). The 07:33 entry's priority and the flexible Day 17 date stand.
+
+*In version 2: folded by T-0872 into Tenet 6.*
+
+## 2026-10-30 17:24 ET — an Investor — (private)
+> This is within normal usage limits, so it fits all of Anthropic's requirements. Additionally, we can use my account as long as it bans access to personal data.This is also an exception to Commandment/Tenet 6
+
+Affects: Tenet 6, 2
+Effect: an Investor's personal Claude subscription may run company sessions, off by default and toggled by the Investors, as an exception to Tenet 6's extra-accounts ban, with Commandment 2's ban on personal data enforced. Commandment 6 can't be excepted: it still applies, this stands as the account owner's reading of Anthropic's terms, and the use stops if Anthropic says otherwise.
+
+*In version 2: folded by T-0872 into Tenet 6, Commandment 2.*
+
+## 2026-10-31 00:41 ET — an Investor — (private)
+> All open issues should no longer be included in the daily reports, and reports should never create a Needs You issue. Instead, all issues should continue to be flagged from the Issues page of the site, as needed, and reports should be reserved for a daily update
+
+Affects: 39, 52, 54, 55
+Effect: Reports carry no list or panel of open requests, report sessions open no request issues, and the report's notification copy never appears as a request; requests are raised outside reports and flagged on the site's Issues page.
+
+*In version 2: folded by T-0872 into Commandment 39, Commandment 52, Commandment 55.*
+
+## 2026-10-31 10:50 ET — an Investor — (private)
+> Also make sure that multiple personal accounts can be set up to contribute to the project, not just one extra. The investors have 2 total
+
+Affects: Tenet 6, 2
+Effect: The personal lane is built for more than one Investor account, two today, each under the 2026-10-30 17:24 terms; an account runs only after its own owner agrees and signs in.
+
+*In version 2: folded by T-0872 into Tenet 6, Commandment 2.*
+
+## 2026-10-31 10:52 ET — an Investor — (private)
+> I approve! Include the option to use my personal Claude usage as well
+
+Affects: Tenet 6, 2
+Effect: an Investor's personal Claude account joins the personal lane on the same terms: off by default, personal data banned, Commandment 6 still applies, and the use stops if Anthropic says otherwise.
+
+*In version 2: folded by T-0872 into Tenet 6, Commandment 2.*
+
+## 2026-10-31 10:55 ET — an Investor — (private)
+> You may use as many subagents as needed right now to finish the personal account setup, ignoring the Spread usage limits until this is done.  When enabling personal usage, the investors can choose which account they are enabling (Evan or Jeremy) and whether they want the mode to be Spread or Lock In. The usage from these personal accounts should be tracked separately, though this can be simplified (for example "Usage added by personal accounts" is sufficient)
+
+Affects: Tenet 6
+Effect: The daily spread is lifted for personal lane work until that work is done (lock_in.json, renewed each day; weekly and 5-hour limits still hold); enabling picks the account and Spread or Lock In; personal usage is tracked apart, one line is enough.
+
+*In version 2: folded by T-0872 into Tenet 6.*
````
{% endraw %}

</div>
