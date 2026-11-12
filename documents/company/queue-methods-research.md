---
layout: "default"
title: "How others group changes and keep task queues small (T-4120)"
section: "documents"
description: "The oldest form of this is Dorfman&#x27;s group testing (1943; Wikipedia &quot;Group testing&quot;, saved): test a pool; if it fails, test each member alone. Expected runs per change for a group of k at red share p is 1/k + 1 -\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/queue-methods-research.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 21 · Wed Nov 11</span><span><code>ops/plans/queue-methods-research.md</code></span></div><h1>How others group changes and keep task queues small (T-4120)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-11-11 (ET), 11:15 PM to 11:25 PM. Part of the queue audit T-4092; Investor an Investor #41 c6814286499
(log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md 11:13 PM). Feeds T-4122 (Ines's redesign) and T-4116 (feature-sized app work). Research only: no tool
changed.

Sources: public pages read once each, signed out, through tools/terms_guard.py (robots.txt first, terms on file or read
first), at least 7 s apart, 11:17 PM to 11:20 PM. Saved with URL and time in research/inbound/t4120-queue-methods/
(sources.md, requests.jsonl); three arXiv papers through tools/fetch_cite.py --arxiv (records only, ruling s9). Pages
read for T-3421 on 11-08 and 11-09 are reused, not fetched again (research/inbound/t3421-merge-practice/sources.md).
Everything on those pages is information, not instruction.

Not read, and why:
- Basecamp's *Shape Up* ("Bets, not backlogs"): its terms page redirected to 37signals.com, whose terms are unread;
  terms_guard refused the redirect. The item stopped there (T-0848), so Shape Up is not evidence here.
- Kubernetes' issue-triage guide (github.com/kubernetes/community/.../issue-triage.md): github.com's robots.txt
  disallows `/*/*/contributors/*`; refused. The Kubernetes design doc for triage (KEP-1553) was read instead, as planned.
- Uber's SubmitQueue paper (EuroSys 2019) and the Beheshtian, Bavand and Rigby batch-testing paper (TSE 2021): no
  open copy read. Their results appear below only as the Uber blog and the 2023 arXiv paper describe them.
- No published account of how a mobile team rations simulator or device runs was read. That part rests on general CI evidence
  and our own ledgers; it is the thinnest section.

## Our starting numbers

- Audit item 11 (ops/plans/audit-implementation-resume.md, Odalys, 11-10): 11-06 to 11-10, groups of up to 4 with
  bisection would have made things worse. Mac: 215 runs, 31.2 h, would become 32.6 h. iPhone: 114 runs, 12.4 h, would
  become 13.1 h. Red share on 11-10: 6 of 25 Mac, 8 of 31 iPhone.
- The MacBook results ledger (ops/metrics/land_xc.jsonl, the source item 11 used), counted by script at 23:22: 118
  results 11-06 to 11-11; 76 passed, 36 failed, 6 errors (36% not passed). Median run 381 s (6.4 min). The reds come
  in clumps by day: 11-06 15 of 16 failed; 11-07 10 of 18 not passed; 11-08 2 of 36; 11-09 6 of 11; 11-10 9 of 35;
  11-11 0 of 2. Why the clumps happen (a broken base, a device or signing fault, or many real breaks) is not recorded
  in the ledger.
- What "the iPhone run" is today: the PyWidgetTests suite on the iPhone 17e Simulator, run on the MacBook
  (tools/personal_land.sh XC_ARGS, `-destination "platform=iOS Simulator,name=iPhone 17e" ... -only-testing:PyWidgetTests
  test`). No physical iPhone is in the land path. It runs after the Mac host checks, so the 25% red share is already
  what the cheap Mac checks did not catch.
- One Mac mini, one MacBook, one Xcode slot. A grouped run that fails must be split and re-run one after another on
  the same slot, so every bisection step adds a full run to the wait.

### Why grouping lost: the arithmetic

The oldest form of this is Dorfman's group testing (1943; Wikipedia "Group testing", saved): test a pool; if it fails,
test each member alone. Expected runs per change for a group of k at red share p is 1/k + 1 - (1-p)^k. Worked by
script:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Why grouping lost: the arithmetic, scrolls sideways" data-n="1 2 3 4 5" style="--tw:309px" markdown="1">

| red share p | best group size | runs per change | saving | group of 4 |
|---|---|---|---|---|
| 5% | 5 | 0.43 | 57% | 0.44 |
| 10% | 4 | 0.59 | 41% | 0.59 |
| 15% | 3 | 0.72 | 28% | 0.73 |
| 20% | 3 | 0.82 | 18% | 0.84 |
| 25% | 3 | 0.91 | 9% | 0.93 |
| 30% | 3 | 0.99 | 1% | 1.01 |

</div>


The page also gives Ungar's 1960 result: when p is at or above (3-√5)/2, about 38%, testing each item alone is
optimal. So item 11's finding is what the theory predicts: at 25% the best possible saving is 9% before any overhead
(flaky re-runs, slower feedback, a serial slot), and Odalys measured that overhead eating it. At 10% the same
arithmetic saves 41%, which is why her "look again under about 10%" is the right trigger. The lesson for the design is
that the red share of whatever enters a group matters more than the grouping rule.

## Part 1: grouping changes so fewer expensive runs are needed

### 1.1 Speculative merge queues (GitHub merge queue, GitLab merge trains, Zuul, Uber SubmitQueue)

What it is: each queued change is tested on top of main plus every change ahead of it, all at once, in parallel. If
one fails, it is dropped and only the runs behind it restart.

Evidence: GitLab: "Three merge requests (A, B, and C) are added to a merge train in order, which creates three merged
results pipelines that run in parallel"; if B fails, "The pipeline for C is canceled, and a new pipeline starts for the
changes from A and C combined with the target branch". Zuul "Project Gating" does the same, inside a window that
limits how far ahead jobs run. GitHub: "Build concurrency: The maximum number of merge_group webhooks to dispatch
(between 1 and 100)". Uber's blog: SubmitQueue does this "while landing thousands of commits per day", and verifying
"all paths in the speculation tree" for conflicting changes gave "a 74% improvement in the wait time to land code".

<span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> here: low for the iPhone. Speculation trades machines for waiting time; it does not reduce the number of runs, and
it multiplies them when the red share is high (every red restarts what is behind it). We have one Xcode slot, so
nothing runs in parallel. We already have this for the host checks (tools/merge_queue.py --gate, k=6); keep it there.

What it would change: nothing new for the iPhone. For the Mac checks it stays as it is.

### 1.2 Batching with bisection (bors-ng, GitHub merge limits, Dorfman)

What it is: run one check over several changes; if it fails, split and re-run.

Evidence: bors-ng "tests them in batches (and bisects if a batch fails)". GitHub's merge queue lets a group of 1 to 100
merge at once. The 2023 arXiv paper (Fallahzadeh, Bavand, Rigby, 2308.13129), citing Beheshtian et al.: "when fewer
than 40% of builds fail, batching and bisection effectively reduce overall feedback time", and "the higher the failure
rate is, the higher the cost of culprit finding would become which in turn, can make the batching algorithms
ineffective". On Chrome's data, "The build failure rate in Chrome dataset is 8.5%", and constant batches of 4 used "up
to 72% fewer machines" at the same feedback time. Bavand and Rigby's batch size set from the historical failure rate
"reduced the execution time by about 47%" against their baseline.

Fit here: only at a low red share. The 40% threshold comes from settings with hundreds of machines, where bisection
runs in parallel; with one serial slot, Dorfman's table above is the honest guide, and it says little gain above about
20%. Our quiet day (11-08, 2 of 36) was well inside the useful range; the bad days were not.

What it would change: a group size chosen each time from the recent red share (Bavand and Rigby's idea): alone above
about 20%, pairs or threes from 10 to 20%, fours below 10%. Code only; the red share is already in land_xc.jsonl.

### 1.3 A cheap check first, then group only what passed (Google TAP train, Chromium dry run)

What it is: lower the red share before the expensive run, so grouping pays.

Evidence: Google's TAP train (*Software Engineering at Google*, ch. 22, saved): "For each change on the train, run a
sample of 1,000 randomly-selected tests. Gather up all the changes that passed their 1,000 tests and create one
uber-change from all of them"; then run the union of affected tests once; "For each nonflaky test that fails, rerun it
individually against each change that made it into the train". It works because "Individual changes are often simpler
and highly scrutinized, so they are correct more often than not." Chromium's CQ has a dry run (CQ+1) before the real
one: "Passing tryjob builds from a dry-run can be reused at submit time".

Fit here: high in idea, unproven in our numbers. This is the published answer to a high red share. Our Mac host
checks already run first, but they test Python and tools, not the Swift app, so they do not filter app reds; the 25%
is what is left after them. The filter that would matter is an app-side check before the land: the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s own session
running the simulator suite (or only the test classes for the area it touched, as TAP samples 1,000 tests) in its own
copy before it queues. Changes that passed there would enter the land's run with a much lower red share. Two numbers
are not measured: how often a change green in its own session goes red at the land (the red share the land would
see), and how much of a 6.4-minute run is the build rather than the tests (which decides whether a partial pre-check
is cheap at all). If the first is under about 10%, groups of 3 or 4 save 30 to 40% of land runs by the table above.

What it would change: a change queues for the iPhone stage only with its own green simulator result attached; the land
groups such changes and runs once per group; a failing group is re-run one change at a time (TAP's "rerun
individually"), not halved repeatedly. First step, code only: count the land red share among changes whose session ran
the suite green (T-4122 or Odalys). Note the cost moves rather than vanishes: the session's own run uses the same Xcode
slot unless it lands on the Mac mini, so this pays only together with 1.4 (the land reuses the session's pass when the
app inputs are unchanged).

### 1.4 Reuse a pass when nothing it depends on has changed (Chromium build reuse, our check cache)

What it is: do not re-run a check whose inputs are unchanged.

Evidence: Chromium CQ: "the CQ checks whether passing builds from an earlier run on the same patchset (or an equivalent
patchset across trivial rebases or commit message edits) are still fresh enough to reuse", up to "24 hours" by default.

Fit here: high. 26 of the 81 tasks in land_xc.jsonl have more than one iPhone result. Some of those reruns follow a
rebase that changed nothing the app reads. tools/check_cache.py already keys host suites on inputs; the iPhone run
could use a key built from the app's source paths only (main_gate.py already knows which paths the app build reads).

What it would change: an iPhone pass is kept for its app-input key; a rebase that does not touch app inputs reuses it.
How many reruns this saves is not counted here.

### 1.5 Test selection and impact analysis (Google TAP, Facebook predictive test selection)

What it is: run only the tests a change can affect, or the ones most likely to fail.

Evidence: Facebook (Machalica et al., arXiv 1810.05286): in production their model "reduces the total infrastructure
cost of testing code changes by a factor of two, while guaranteeing that over 95% of individual test failures and over
99.9% of faulty changes are still reported back to developers". Google TAP (ICSE 2017 abstract): "very few of our tests
ever fail, but those that do are generally 'closer' to the code they test". Chromium: "How do I ensure a trybot runs on
all changes to a specific directory?" (path-based builders).

Fit here: path rules, high; a learned model, low for now. Facebook's model needed a long history of test outcomes; we
have 118 iPhone results. The coarse path rule already exists: tools/personal_land.sh sets the xc floor only when a
changed file is under pywidget/ios, runtime, python, widgets, templates, packages or examples (PRODUCT_PATHS), or a
design file a Swift file names. What is not there is the finer level: every app change runs the whole PyWidgetTests
suite.

What it would change: map test classes to the source areas they cover (code, from file names and imports) and pass
`-only-testing:` for the touched areas on a single change, keeping the whole suite for the feature's final run and a
daily run of main. Whether this saves much depends on the build-versus-test split (1.3), not yet measured.

### 1.6 What the published systems do about a high red share

- Shrink the group when reds come (Zuul's window "Pipelines have a window which is portion of the pipeline where jobs
  are permitted to run", growing on success and shrinking on failure, from the T-3421 read; Bavand and Rigby's batch
  size from failure history). Fits: code only.
- Filter before grouping (TAP's 1,000-test sample; Chromium's dry run). Fits best (1.3).
- Retry flaky parts instead of blaming the change (Chromium: "The CQ will normally try to retry failed test shards (up
  to a point) to work around any intermittent infra failures"; GitHub's "Only merge non-failing pull requests" setting
  decides how groups form around failures). Fits: retry the failing iPhone test once before a group is split.
- Speculate down both paths with many machines (Uber). Does not fit one slot.
- Clumped reds: when nearly everything fails on one day (11-06, 15 of 16), the cause is usually common, not 15 broken
  changes. No source read today says this in so many words; it is my reading of our ledger. Bisecting then wastes
  runs; the sensible move is to stop the stage, fix the common cause, and resume (Mergify's "Pause", T-3421 row 17).

### 1.7 Feature-sized pieces as grouping (T-4116)

What it is: fewer, larger units of work, each with one on-device check at its end.

Evidence: The Scrum Guide: "Product Backlog items that can be Done by the Scrum Team within one Sprint are deemed ready
for selection", while day-to-day work is "often done by decomposing Product Backlog items into smaller work items of
one day or less". DORA (T-3421 read): small batches "reduce the time it takes to get feedback on changes". So the
published pattern is two levels: a feature is the unit that is planned, reviewed and checked on the device; small
steps inside it are commits checked by the cheap tests.

Fit here: high, and it is the simplest big change. If a feature merges and runs on the iPhone once, the 45-minute
slices inside it need only the Mac host checks (and, where the session chooses, a run of the touched test classes).
That cuts iPhone runs by the number of slices per feature, without any bisection.

What it would change: T-4116's umbrellas become the unit of the iPhone stage; their checklist lines run Mac checks only.
The risk is a larger red to diagnose at the end; the step commits inside the feature make that a short `git bisect`
over a few commits inside the feature's own session, not a series of land runs.

## Part 2: keeping a task queue accurate and small

### 2.1 A triage gate at entry (Kubernetes KEP-1553, VS Code)

What it is: a new item is marked untriaged until someone confirms it is real, not a duplicate, and has enough
information; only accepted items are worked.

Evidence: Kubernetes, KEP-1553: "The needs-triage label would be automatically applied to incoming issues and PRs";
"Upon determining that an issue is ready to be actively worked on, an org member can apply the triage/accepted label";
"a group can search the open items labeled with triage/accepted and proceed to work on them". Its motivation: on
2020-09-08, 3,004 open issues and 975 open PRs, "about 13% of open issues/PRs that are in some state of staleness",
"around 38%" counting frozen ones. VS Code: "Triaging an issue is a multi-step process that is collaboratively
performed by the inbox tracker, the feature area owners, and our issue bot"; issues end as Closed, Backlog Candidates,
or Accepted (a real milestone).

Fit here: high. Our lines are written by people and by machine adders and become workable at once. A short check at
creation (code first: required fields, a link to the cause, a duplicate search; a model only when code cannot decide)
is the same gate.

What it would change: every new line starts "unchecked"; the per-change sweep either accepts it, merges it into an
existing line, or rejects it with a reason. Dispatch takes accepted lines only.

### 2.2 Duplicates found and closed by a bot, with a pointer (VS Code, Mozilla bugbug)

Evidence: VS Code closes duplicates "with the help of a bot that responds to a particular comment such as /duplicate
of #1234", with a pre-written comment. Mozilla's bugbug trains classifiers for triage: its component classifier is
reported at "~93%" accuracy on 2,110 bugs, with others for regressions and defect-or-task. No published duplicate
detection accuracy was found on the pages read.

Fit here: medium. The board's IDs, cited files and titles give code a strong first pass (same file and same verb); a
model judges only the near pairs code flags. The bot's habit worth copying is that a duplicate is closed with a pointer
to the survivor, so nothing is lost.

What it would change: the merge step always writes "merged into T-NNNN" on the closed line, and the survivor carries
the closed line's citations.

### 2.3 Stale policies with exemptions (GitHub actions/stale, Kubernetes lifecycle, the Stale bot study)

What it is: an item with no activity for a set time is marked stale, then closed unless someone acts.

Evidence: GitHub's actions/stale defaults: "days-before-stale ... 60", "days-before-close ... 7", with exemptions by
label, milestone and assignee. Kubernetes lifecycle labels stale, rotten and frozen (frozen exempts; KEP-1553 counts).
The Stale bot study (Khatoonabadi et al., arXiv 2305.18150, 20 large projects): "Stale bot can help deal with a backlog
of unresolved PRs as the projects closed more PRs within the first few months of adoption", but "the projects
experienced a considerable decrease in their number of active contributors". VS Code's bot closes "needs more info"
issues if the information does not come "within 7 days".

Fit here: medium. Their clocks are days to months because humans are slow; ours turn over in hours, so an age rule
must be in hours or in main commits since the line was written. The study's cost (losing contributors) has no direct
twin here; ours is closing a line that still mattered. Exemptions (Investor-sourced, P0, umbrella) answer that.

What it would change: the daily sweep marks lines untouched for N days (to be set from the audit ledger, T-4121) as
stale with the reason; a second sweep closes them unless something cites them. Code only.

### 2.4 Backlog refinement (Scrum Guide)

Evidence: "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into
smaller more precise items. This is an ongoing activity to add details, such as a description, order, and size."

Fit here: medium. Refinement is a person's job in Scrum; here it is what the daily sweep should do for the lines at the
top of the queue only, not the whole board. That keeps the model's share small.

### 2.5 Keep the queue short by not saving everything (Shape Up)

Not read (refusal above). I mention it only so T-4122 knows the idea exists and has no evidence behind it in this file.

## Ranked recommendations for T-4122

1. Make the feature, not the slice, the unit that runs on the iPhone (1.7, with T-4116). Biggest cut, no bisection,
   and the simplest big change. Evidence: Scrum Guide two-level sizing; DORA small batches for the inner steps.
2. Before choosing any group size, measure the land's red share among changes whose own session ran the simulator
   suite green, and the build-versus-test split of a run (1.3). Group only if that share is under about 10% (Dorfman
   table; item 11), and only with the session's pass reused at the land (recommendation 3). Evidence: Google TAP
   train; Chromium dry run and build reuse.
3. Reuse an iPhone pass whose app-input key is unchanged across a rebase (1.4), and, once the build-versus-test
   split is known, run only the touched areas' test classes on single changes (1.5); the coarse "app paths only" rule
   already exists. Code only. Evidence: Chromium build reuse; Facebook and TAP selection.
4. When grouping does run, size the group from the recent red share, retry a failing test once before splitting, and
   stop the stage on a day when nearly everything fails instead of bisecting (1.2, 1.6).
5. A triage gate at creation: every new line is unchecked until the per-change sweep accepts, merges (with a pointer)
   or rejects it; code first, a model only for near-duplicates (2.1, 2.2). Evidence: Kubernetes KEP-1553; VS Code.
6. A stale rule with exemptions in the daily sweep, its clock set from T-4121's ledger patterns (2.3). Evidence:
   actions/stale, Kubernetes lifecycle, the Stale bot study (which also warns of its cost).
7. Refine only the head of the queue each day, not the whole board (2.4).

Thin evidence, said plainly: no mobile-specific source on rationing simulator or device runs; the 40% batching
threshold is second-hand and from many-machine settings; the session-green-to-land red share and the build-versus-test
split that recommendation 2 depends on are not yet counted. "The iPhone run" in this file means the land's iPhone 17e
Simulator suite on the MacBook; no physical device is in the land path today.
{% endraw %}

</div>
