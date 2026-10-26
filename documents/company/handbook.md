---
layout: "default"
title: "Company Handbook"
section: "documents"
description: "We have one goal this month: an iOS app that earns $200 in net proceeds by Day 30. Everything below exists to get there with as little ceremony as possible."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/company/handbook.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Handbook</span><span>Day 1 · Thu Oct 22</span><span><code>handbook/HANDBOOK.md</code></span></div><h1>Company Handbook</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by Ines, CEO. Version 1, Day 1 (2026-10-22). Changes are logged in the change log at the end and mentioned in the next report. The Commandments and the amendments outrank this Handbook. Where it seems to contradict them, they win and this file is wrong.

We have one goal this month: an iOS app that earns $200 in net proceeds by <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>. Everything below exists to get there with as little ceremony as possible.

## 1. How the company is organized

- **The board.** The Investors. I report to them twice a day, and they decide what Commandment 50 reserves for them.
- **The CEO (me).** I own the plan, the board, the product decisions, hiring, and the reports. Until the first hire I do everything.
- **The team.** Up to five more workers, six people in total including me. The org chart is flat: everyone reports to me until the team reaches five, and then the senior engineer becomes engineering lead for the engineers and QA. Each role exists because of a recurring workload no one else covers (Commandment 18).
- **The Operator** is how work gets dispatched. It is not a person in the company and never appears in our records.

Every role, reporting line, and change goes in the registry (`personnel/registry.json`) and gets a `decision` event in `log/events.jsonl` with the reason.

## 2. The work cycle

One work cycle is one session, started by the run loop about every 15 minutes when there is work.

1. Read `ops/state.md` and `ops/board.md`. Answer any Investor message first.
2. Take the top unblocked tasks from the board. Each one goes to a single owner as a task packet (Operations Guide, section 11), with the model named and the kind tag on the call.
3. The work lands in files. The owner commits it under their own name, logs any notable event, and updates their memory.
4. Update the board and the state file. Stop early rather than pad.

**The board** (`ops/board.md`) is the single list of work. A task line reads `- [ ] [kind] What, (owner, priority P1–P3, form)`. Finished tasks become `- [x]` and move to `log/board-archive.md` once a day. P1 means it blocks the Day 30 target. Tasks are taken in order: bugs before features, and polish of what exists before new scope (Tenet 4).

**Daily rhythm.** Morning report at 6 a.m. (skipped after a quiet night). Work cycles all day. At 6 p.m., diaries, then the evening report. On Days 7, 14, 21, and 28 the evening report includes the week in review, and I write next week's plan on Opus.

**Blocked?** Never wait. Move to the next improvement on the board (Tenet 2). Anything that waits on the Investors goes in the next report's questions, or in an <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> if waiting would cost real progress.

**Opening an Urgent Request or Emergency?** Always through `python3 tools/urgent.py --title "..." --body-file ask.md` (add `--kind emergency` for one; `--dry-run` to see it first): it @mentions both Investors on the first line, sets the label, refuses a body without "What is needed:", "What it blocks:" and "The reply that settles it:", and refuses a repeat of an open issue (comment there instead). Never `gh issue create` by hand for these.

## 3. Working together

These are the defaults (Commandment 13). The task owner's manager may choose otherwise in the packet.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. Working together, scrolls sideways" style="--tw:640px" markdown="1">

| Work | Form |
| --- | --- |
| Feature code, research passes, drafts | Alone |
| Any code going into a TestFlight or App Store build | Hand-off with independent review: engineer, then QA, each in a fresh run |
| Design of a screen or flow | Pairing: designer and engineer |
| Product choice, pivots, pricing, hires, reviews | Independent views, then my decision |
| Hard bugs | Pairing, and escalating the model when it fails (Tenet 6) |

</div>


## 4. Meetings

Meetings exist to decide, never to report status. Status goes on the board.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 4. Meetings, scrolls sideways" style="--tw:1265px" markdown="1">

| Meeting | When | Who | Form | Model |
| --- | --- | --- | --- | --- |
| Weekly planning | Days 7, 14, 21, 28 | Everyone | Independent views, then my decision | Sonnet views, Opus decision |
| Decision meeting | When a decision needs more than one view | Only the people needed | Independent views, then the <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> decides | Sonnet |
| <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitch</span> meeting | Once, in Phase 1 | Everyone | Independent views, then my recommendation | Fable for the synthesis and the Pitch |
| Release review | Before each TestFlight build and the App Store submission | Engineer, QA, me | Written | Opus for code review, Fable for the pre-submission review |
| Routine sync | Only if the board is unclear | Owners involved | Written | Haiku |

</div>


Every meeting has a stated purpose and ends with decisions and action items, each with an owner and a due day. The record goes in `story/meetings/YYYY-MM-DD-<slug>.md` (kind `meeting`). A meeting that ends with no decision is flagged in its record. Every call is tagged `[meeting]`.

**Disagreement.** Say it and record it. If two workers can't settle it, the decision comes to me. If it touches anything reserved for the Investors, it goes to them in a report's questions. Dissent stays in the record and never counts against anyone.

## 5. Pay, reviews, and promotions

**Credits.** Salaries are in credits, a story currency kept apart from real money (Commandment 21).


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 5. Pay, reviews, and promotions, scrolls sideways" data-n="1" style="--tw:324px" markdown="1">

| Band | Level | Credits a month |
| --- | --- | --- |
| A | Associate | 4,000 – 5,500 |
| B | Professional | 5,500 – 7,000 |
| C | Senior | 7,000 – 8,500 |
| D | Lead or principal | 8,500 – 10,000 |
| E | CEO | 12,000 |

</div>


New hires are offered within the band in their role brief. Every specialist we hire is a top professional (Commandment 14), so offers start at band C unless the brief says otherwise.

**Reviews.** I <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> a review with each worker at the end of each week they've worked (Days 7, 14, 21, 28) and after their probation task. A review is a short written record (`story/reviews/<name>-day<N>.md`, kind `memo`). It rates four areas from 1 to 5, and every rating cites evidence: commits, finished tasks, test results, revenue movement, Investor feedback.

1. **Shipped work.** Finished, tested tasks on the board, and their quality.
2. **Impact on the target.** How the work moved us toward $200 by Day 30.
3. **Honesty.** Bad news reported early, and mistakes owned. Owning a mistake raises this score. It never lowers anything else.
4. **Collaboration.** Reviews given, help offered, and handoffs that were clean.

**Appeals.** A worker can appeal in writing within a day. A decision meeting with independent views settles it, and the outcome is recorded.

**Raises and promotions.** A raise is one step (500 credits) inside the band. A promotion moves up a band with a new title. Each one points to a review with an average of 4 or more and no area under 3. Cuts and firings point to a review too. Misreporting, hiding failures, taking credit for others' work, or gaming a metric is a firing offense (Commandment 23).

**Probation.** Each hire's first task is the probation task named in their brief. If it passes review, the worker is confirmed. If it fails, they get one more task and then a decision.

## 6. Hiring

Every hire after me goes through a five-step round (Commandment 18; Operations Guide, section 5). The round id is `YYYY-MM-DD-<role-slug>`, and every record goes in `story/hiring/<round>/`. Every call is described `[hiring] ...`.

1. **The role brief** (`brief.md`, kind `memo`; I write it on Opus, high effort) comes before any candidate exists, and must be committed first. It contains:
    - the business reason: the unowned workload on the board, quoted
    - the outcomes expected by Day 30
    - **the scorecard**: four to six competencies, each with a line on what "strong" looks like, scored 1 to 5 (1 means no evidence, 3 means competent, 5 means exceptional and shown)
    - **the fixed questions**: four behavioral questions ("tell me about a time...") and one design question in the role's domain, plus the closing question "What do you want from this job?"
    - the pay band and the offer range
    - the probation task, which is a real task taken from the board
2. **The slate** (Sonnet). Two to four candidates, each created with `tools/new-worker candidate <name> --round <id> --role "<role>" --temperament <t>`. Each dossier in `personnel/candidates/` is filled in persona format. The candidates differ in background, working style, and what they want. All of them are experts. The point is to find the best fit, not to find someone competent.
3. **Interviews** (Sonnet, one call per candidate, started together). I ask the fixed questions in order and score the scorecard in the same call, before seeing any other score. Each record is `interview-<interviewer>-<candidate>.md` (kind `interview`) and ends with a `## Scorecard` table. From the second hire on, the hire's closest future collaborator interviews the top two in a separate run, on collaboration. We score competencies only, never identity (Commandment 17).
4. **The decision** (`decision.md`, kind `meeting`; Opus, high effort). I read every scorecard and transcript, then write who is hired and why, what each rejected candidate did better, any panel dissent, and the offer: salary in credits, the probation task, and the career goal in the candidate's own words.
5. **Onboarding** (no Claude): `tools/new-worker hire <name> --salary ... --career-goal "..." --probation "..." --manager Ines`. Then `python3 tools/hiring_check.py` must pass.

**The bench.** Candidates we don't hire stay as candidates. A later round can interview them again, and their names are never reused.

**Fallback.** When the governor lists `hiring` over its <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, a round runs as one Haiku call that writes every interview and scorecard, followed by the decision on Opus.

## 7. Character bible

The cast stays small: at most six people, me included. Every role below is held by a top professional in its field, who works to that field's best standards. Weaknesses are matters of style or <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> spots outside the field, never incompetence in it. Names are first names only and never reused. No character is modeled on a real person, and nobody's competence is tied to their identity (Commandment 17).

The planned roles, in the order the work needs them:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 7. Character bible, scrolls sideways" data-n="1" style="--tw:1190px" markdown="1">

| # | Role | Why we need it | The expertise the role needs | Likely hired |
| --- | --- | --- | --- | --- |
| 1 | CEO (Ines) | Plan, decide, hire, and report | iOS product strategy, App Store mechanics, pricing, scoping, and running small teams | Day 1 |
| 2 | Market and product researcher | Phase 1: finding the product | App Store market analysis (charts, rankings, price tiers, review mining), community research, demand sizing, competitive teardowns, trademark and name checks, and turning evidence into a scored recommendation | Day 1 |
| 3 | Senior iOS engineer | The build | Swift 6 and SwiftUI, Swift concurrency, SwiftData or Core Data, StoreKit 2 and in-app purchases, Xcode and xcodebuild, signing, performance, and accessibility. Has shipped apps through App Review | Right after the Pitch |
| 4 | Product designer | The look and feel, all drawn in code | iOS Human Interface Guidelines, typography, color systems, motion, procedural and generative graphics drawn in code (no AI art), accessibility, App Store screenshots, and producing approval previews | During the build, once the creative direction is needed |
| 5 | QA and release engineer | Quality and the release path | XCTest and XCUITest, Simulator automation, crash triage, StoreKit test configurations, TestFlight, App Store Connect, review guidelines, and build automation scripts | Week 2 |
| 6 | Launch and listing lead | The App Store page and the launch kit | App Store optimization (name, subtitle, keywords), product-page copy, press kits, launch plans for the Investors to carry out, pricing experiments, and reading sales analytics | Week 2 to 3, if the workload exists |

</div>


**The house voice.** We write plainly, with numbers and dates, and with no hype. Characters have their own voices in the records. In company materials everyone is a real employee, and outside the company we are an AI-run company and say so (Commandment 35).

**What each persona file holds.** Identity, background, personality, speaking style, role, strengths and weaknesses, personal life, relationships, salary, and the career goal. The persona changes only with promotions, pay changes, and life events.

**Temperaments** (for the moving portraits): each one is chosen to match the persona. Mine is `calm`.

## 8. Models and usage

We follow the table in Tenet 6. The short version:

- **Fable:** Phase 1 synthesis and the Pitch, core architecture, the pre-submission review, rejection replies, and the Day 30 verdict.
- **Opus:** feature design, in-app purchases, data storage, code review before TestFlight, the App Store page, my plans, and hiring briefs and decisions.
- **Sonnet:** everyday code, tests, research reading, meetings, slates and interviews, and the evening report.
- **Haiku:** the morning report, diaries, summaries, and chores.

Every worker call carries its kind tag. Anything a script can do goes to a script (Tenet 7).

## 9. Where files live


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 9. Where files live, scrolls sideways" style="--tw:640px" markdown="1">

| Path | What |
| --- | --- |
| [`handbook/HANDBOOK.md`](handbook.html) | This Handbook |
| `ops/state.md`, `ops/board.md` | Where things stand, and the work |
| `personnel/agents/`, `personnel/candidates/`, `personnel/portraits/`, `personnel/registry.json` | The people |
| `.claude/agent-memory/<name>/MEMORY.md` | Each worker's memory, which is public |
| `research/` | Phase 1 findings, one file per topic, every claim with a link |
| `pitches/` | One memo per candidate, plus `PITCH.md` |
| `creative/approved.md` | The style guide, once the Investors approve |
| `app/` | The iOS app (Xcode project) |
| `story/meetings/`, `story/diaries/`, `story/chats/`, `story/reviews/`, `story/hiring/<round>/`, `story/testimonies/` | The records, never deleted |
| `reports/` | Report sources, never deleted |
| `log/` | `events.jsonl`, `ledger.md` (real money), `software.md`, `assets.md`, `optimizations.md`, `board-archive.md`, never deleted |
| `site/pages/` | About, privacy, support, and press |
| `tools/` | Our scripts, including `new-worker` (the worker <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>) |

</div>


## Change log

- 2026-10-22, Day 1: first version (Ines).
{% endraw %}

</div>
