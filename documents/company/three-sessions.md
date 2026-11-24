---
layout: "default"
title: "Three sessions, one for each account (T-5786)"
section: "documents"
description: "The Operator, 2026-11-24, in the Mac mini session an Investor typed into. Asked by an Investor (typed 12:10 AM ET 11-24, log/rulings.md): &quot;Build all of this in this session ... Do not stop until it is fully built\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/three-sessions.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 34 · Tue Nov 24</span><span><code>ops/plans/three-sessions.md</code></span></div><h1>Three sessions, one for each account (T-5786)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
The Operator, 2026-11-24, in the Mac mini session an Investor typed into. Asked by an Investor (typed 12:10 AM ET
11-24, `log/rulings.md`): "Build all of this in this session ... Do not stop until it is fully built. Explain if
there need to be any changes to Tasks or Features (or if this system even still makes sense)." It was built while
the company was paused (an Investor, 11:16 PM ET 11-23); nothing here starts by itself before a RESUME.

## In six lines

1. **Three sessions do the work, one for each account.** Each has its own area of the app (`ops/areas.json`).
2. **The two personal accounts each run one session**, on slot 1, started by the hand-out as before, which now gives
   an account work of its own area only. `"slots"` in `ops/areas.json` is that number (1 to 3).
3. **The main account's kept-running session is the third.** It answers the Investors, sends the reports, and builds
   its own area itself with its own agents (`ops/prompts/coordinator.md`). No main one-task workers are started.
4. **A session takes a feature's steps a few at a time and merges them as one piece** with `tools/merge.sh`: one
   review, one run of the checks, one merge.
5. **The merge script lost its two big wastes.** A check that passed is not run again while what it reads is
   unchanged, and one app change is checked at a time, so a change that passed is no longer refused because another
   landed first.
6. **Nothing was deleted.** One switch (`ops/areas.json` "on": false) puts the many-worker hand-out back.

## Why (the records, 11-23)

- Both merge roads delivered the same: about 22 app code commits and 12 app tasks a day on the old road (11-13 to
  11-19), 20 and 13 in the new road's first 24 hours (`ops/plans/T-5265-measure.py`).
- On the new road, after the evening restart, 25 app merge attempts used 15.6 hours of checks and 4 merged. One
  change was refused three times with every test green because another app change had landed first.
- The main account's one-task workers merged 9 of 113 app attempts; the personal accounts' sessions 13 of 32.
- 14 sessions shared one Simulator slot on the Mac mini, three on the MacBook, and one fast-forward of main at a
  time. More workers than that made queues, not app work.
- **Correction to what the Operator told Jeremy on 11-23:** feature sessions were not "never switched on". They have
  been on for every feature since 11-17 (T-4788). What kept them small was two faults found on 11-24, both fixed here:
  - *One step a session.* The rule that sizes a feature's batch (`tools/batch_size.py`, an Investor 11-18) read the
    old gate's run time, 454 s, and so gave one step a merge. On the road in use a merged app run took about
    1,440 to 1,500 s (the median of the 21 to 24 merged app runs in the window). The rule now reads the road in use
    and gives three steps (T-5787).
  - *Most app lines ran alone.* A session takes the steps `ops/plans/app-features.json` lists. 117 open app lines
    whose own Links say "part of" a feature were not in that list, so they were handed out one at a time, each with
    a merge of its own. They are listed now (`ops/plans/app-features-sync.py`): 285 open steps, up from 168.

## How it runs


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it runs, scrolls sideways" style="--tw:868px" markdown="1">

| Session | Account | Area (`ops/areas.json`) | Started by |
|---|---|---|---|
| The kept-running session | main | App screens, Pages and the Builder | `tools/supervisor.sh`, as the coordinator was |
| One <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> session | a (slot 1) | Widgets on the Home Screen | `tools/personal_tick.sh`, from `dispatch.py tick` |
| One lane session | b (slot 1) | Scripts and Python | the same |

</div>


- **An area** is its features, their steps, and for an app line in no feature the area whose paths hold most of the
  line's files. `python3 tools/areas.py show` prints them; `areas.py check` fails on a feature in no area or in two.
  To move a feature, change its entry and commit the file.
- **A personal account's session** is what it was on 11-23: the lane's Operator takes one feature (or one line in
  no feature), gives its steps to the worker, has another worker review the change, and the lane's tick runs
  `tools/merge.sh` when the session ends. Only the count (one session an account) and the area are new.
- **The main account's session** does the same for its own area inside the kept-running session: `feature_session.py
  packet`, a build agent in a copy, a review agent, then `tools/merge.sh` in the background.
- **The merge script** (T-5776, T-5781): passes are kept by what the check reads (`tools/check_cache.py`: the guard
  suites by the guard code, the host tests by the app's files, each other suite by the whole tree); an app change
  takes "the app turn" before its checks and holds it until it merges or stops, so app changes are checked one at
  a time on the tree that will be merged; and an app change with no good review record ends before the turn and
  before any check. `MERGE_REUSE=0` and `MERGE_APP_TURN=0` switch the first two off.
- **Seen on the real repository, 11-24:** the three changes themselves merged through `tools/merge.sh` (12:49 PM, 1:41
  and 2:11 AM ET). A say-only run on a real reviewed app change (T-5059's, 8 files, the Simulator run stubbed) took
  500 s; the same run again took 5 s, the guard suites and the host tests reused. **Not yet seen:** a real app change
  merged by the new script with its unit tests on the MacBook, and two app changes waiting on the turn. The first
  leftover copy after the RESUME is that test.

## What is off, and how each comes back


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: What is off, and how each comes back, scrolls sideways" style="--tw:937px" markdown="1">

| Part | Switch | To bring it back |
|---|---|---|
| Slots 2 and 3 of each personal account; the main account's one-task workers; work outside an account's area | `ops/areas.json` "on": true | "on": false |
| The old landing road (`tools/personal_land.sh`, the land job, the merge queue, retry and parking) | `ops/merge_road.json` "road": "merge.sh" (since 11-22) | "road": "old" |
| Process lines (tools, ops, site, measure, plan, review of tools) | `ops/trim_freeze.json` (since 11-20), and no area holds them | its "allow" list, or an Investor's word |
| The comparison of the two roads (T-5265's four days, T-5567) | ended by an Investor's 12:10 AM ET 11-24 instruction | an Investor's word |

</div>


Nothing was moved to `retired/` and no file was deleted.

## Tasks and features: what changes

- **A feature is the unit a session takes, a step is one commit inside it.** That was already the rule; the two
  faults above kept it from happening.
- **Every app line should sit in a feature.** 301 of the 446 open app lines do (285 of them listed steps after the
  sync). 16 are part of two things and 129 fit none or two (`python3 tools/feature_place.py sweep`); until a person
  places them they run one at a time, in the area their files fall in.
- **Pages, the Builder and Foundations (T-4478, T-4477, T-4476) are not in the feature list file**, so they cannot be
  taken as packets. The main session works them from their board lines. Adding their three cards to
  `ops/plans/app-features.json` is the next change worth making to Features. The Builder, which sets the firm
  release date, has no step on the board yet (its first is ADR-008).
- **Stages that no longer happen:** Retry Queue (<span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>), Merge queue, Merging, sent back. The site still names them.
- **The site and the reports** still count by the old stages in places (see "Known gaps").

## Added on the morning of 11-24, while the sessions ran

an Investor resumed the company at 7:00 AM ET. an Investor then asked for these in the Mac mini session (7:20, 7:30,
7:38, 8:15 and 8:16 AM ET, `log/rulings.md`). Each was built in a copy and landed through `tools/merge.sh`.

- **A worker holds categories (T-5791).** `ops/areas.json` now names ten categories, each with its features and
  paths; an account's area is a list of categories. `python3 tools/areas.py show` prints them; `python3
  tools/areas.py move <category> <account> --write` moves one and checks the file. Main: Gallery, Settings and Pro;
  release; Foundations; the Builder; Pages; the 1.0 showcase premades. Account a: Widgets on the Home Screen.
  Account b: the editor; running scripts, device features and the network; packages. One queue, one label a task:
  a worker's queue is the lines of its categories. A line has one category, its feature's; a line in no feature
  goes where most of its files are.
- **Every app line in one feature (T-5794).** Foundations, the Builder and Pages (T-4476, T-4477, T-4478) are in
  the feature list, and three features were made from lines the Investors had asked for: the 1.0 showcase premades
  (T-5795), the internal TestFlight test widgets (T-5796) and widget animation as a Pro component (T-5797). 367 of
  the 444 open app lines now sit in a feature (301 before); 63 are still flagged
  (`python3 tools/feature_place.py sweep`): not app work, machine lines that tick themselves, lines that fit only
  the closed premade-drawing feature, drafts for the Investors or for after 1.0, phone measurements, and seven the
  pass could not place with confidence.
- **The features record (`ops/plans/features.json`, F-1 to F-258)** was rebuilt from the feature list and the lines'
  Links: F-1 to F-20 are the twenty app features, each with its category and worker (`areas.py stamp --write`
  writes them; a rebuild drops them, so stamp after a rebuild). The 200 process features are left as they are
  while process work is frozen.
- **Host tests and unit tests together (T-5793).** For app code under `pywidget/ios` the two long checks start at
  the same time when the unit tests go to the MacBook, so the pair takes the longer of the two
  (`MERGE_TOGETHER=0` is the way back). A run started with a copy's older `tools/merge.sh` hands over to the main
  folder's script: the first two leftover copies were merged with their own older script on 11-24, and one of
  those runs took 51 minutes to reach a stale review.
- **A mockup of the new displays (T-5792)** is in `design/three-sessions/` (mockup.html and four screenshots), in the
  site's own stylesheet, with a list of the 54 displays that still describe the old flow. Nothing on the site was
  changed: removing those waits for the 48-hour check below (an Investor's <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of 11-20 8:15 AM ET holds Home
  until the new system is proven).
- **Waiting on purpose:** new app lines joining a feature by category at the add step, and automatic moves of a
  category between workers. Both wait for the 48-hour check.
- **Found while building, and the rule that follows:** this session's own test runs held both of the Mac mini's
  heavy test slots at 8:00 AM ET while a worker's app tests waited. A build made while the sessions work runs one
  suite at a time, and only when `python3 tools/heavy_slot.py status` shows nobody waiting.

## How we will know (48 hours from the RESUME)

Same script as the comparison: `python3 ops/plans/T-5265-measure.py "<start>" "<end>"`. Before: about 22 app code
commits and 12 app tasks a day on either road. The bar: 40 or more app code commits a day with main's unit tests
green at each day's end. If it misses, `ops/areas.json` "on": false and `ops/merge_road.json` "road": "old" put
the old system back, and the Investors decide.

## Known gaps

**The leftover copies (T-5788):** still to land. When they are, the main session writes the line that task's
Done-when asks for here, with the time.

- **Work held by slots 2 and 3.** Slot 1 takes back the parked tasks of its account's slots 2 and 3. A slot that is
  set aside is never given a task, but it still starts with none while its branch waits to land or is held, so its
  tick lands or parks it (on 11-24 personal/b2 and personal/b3 each held one finished review). A retry line of a
  set-aside slot lands nothing on the merge road (`tools/personal_land.sh` refuses retry there).
- **Finished work left in copies (T-5788).** When the many-worker hand-out stopped, 22 workers' copies held app
  commits main does not have, 16 of them already reviewed. The main session lands them first
  (`ops/coord_handoff.md` lists them). The 16 open lines of accounts a and b that have such a copy wait on T-5788
  (their Links say "needs T-5788"), so no session does that work twice; ticking T-5788 frees them.
- **A line in no feature runs alone.** With one task a session (COORD on), each such line is its own session and its
  own merge. On 11-24 account a's first eleven startable lines are of that kind, ahead of its feature T-4181, which
  the board's stale check ranks last.
- **Lines of no area: 351** (247 tools, ops and site lines, frozen; 104 app lines that name only tests, shared files
  or documents). No personal account takes them; `python3 tools/areas.py lines main` lists the app ones for the main
  session.
- **The unit tests are not kept between tries for a worker's copy** (`tools/land_xc.py premerge` reuses none; a
  personal account's branch does reuse them). A retry of the main session's merge runs them again, about 10 minutes.
- **Not done, on purpose:** T-5772 (the app's host tests on the MacBook; taken off the freeze's allow list so no
  session picks it up), T-5768 and T-5750's follow-ups (they patch the main account's one-task workers, which no
  longer start). An Investor's word brings any of them back.
- **Three suites were red on main before any of this and still are:** `merge_limit_split_test.py`,
  `records_test.py` and `dispatch_tick_test.sh` (10 of 23). None is in the merge script's checks for an app change.
- **Record correction:** the done-notes of T-5776 and T-5781 name aa17e49add and 9c38533b7c, the commits in the
  copy; on main they are 35b42411da and ab71393e2c.
- **The site.** The main session's features show as in flight only while one of its agents runs. "Handed in to
  merge", "sent back" and "first try" in the reports no longer mean anything; the Home text still describes the
  old road. Left as they are: app work only.
- **Account b** had used 73% of its week at 11:16 PM 11-23 (resets Sat 11-28 2:00 PM ET).
- **A step that needs a real iPhone or an Investor's answer** stops its feature's session, as before.
{% endraw %}

</div>
