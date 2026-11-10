---
layout: "default"
title: "Moving merge checks off the Mac mini: what it costs and what it buys (T-3902)"
section: "documents"
description: "Nothing was bought, signed up for or connected. Every price below comes from the seller&#x27;s own page, read once, signed out, saved with its address and time in research/inbound/t3902-merge-compute/ (index: sources.md\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/merge-compute-options.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 19 · Mon Nov 9</span><span><code>ops/plans/merge-compute-options.md</code></span></div><h1>Moving merge checks off the Mac mini: what it costs and what it buys (T-3902)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, Monday 2026-11-09, 7:00 PM ET. Asked by an Investor, 6:49 PM (#41 c6754641345): "are we able to unload a lot of
the compute work to the macbook as well, or are there any services that can handle merging for us? We are potentially
willing to spend some money on this if it will drastically improve our merge time."

Nothing was bought, signed up for or connected. Every price below comes from the seller's own page, read once, signed
out, saved with its address and time in `research/inbound/t3902-merge-compute/` (index: `sources.md` there).

## The short answer

- **Recommended: rent GitHub's Linux test machines for the Python and website checks, with a spending <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> of $400 a
  month.** Our estimate at today's volume is **$240 to $405 a month** on the current plan. Those checks are about
  **87% of the check work** on the Mac mini today. Each one would run on its own machine instead of sharing the mini
  with every agent. That should bring a typical check down from **13½ minutes today** to **about 5 to 8 minutes**,
  with up to 20 running at once.
- **Keep the app build check (Xcode) on the MacBook, with the Mac mini as the backup.** Renting GitHub's Mac machines
  for it would cost about **$840 to $2,140 a month**. That is too much for 13% of the work.
- **Don't buy a merge-queue service now.** They put changes in order, but they don't run any tests, and the tests are
  where the time goes. They also expect every change to come in as a pull request, and ours don't.
- **Free and first: get the MacBook back online.** Today 48 of 134 attempts to merge stopped while waiting for the
  app build check. The MacBook has been silent since 7:36 PM Sunday, and its request card is open.

## 1. Where the check time goes (measured today, midnight to 6:47 PM)

I added up check time on the Mac mini from four records. A row in `ops/runs/land_steps.jsonl` gives each step of a
merge with how long it took. A row in `ops/runs/test-runs.jsonl` gives each run of our tests and each suite's own
seconds. `ops/metrics/main_gate.jsonl` gives the app's Python checks, and `ops/metrics/xc.jsonl` the Xcode runs.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Where the check time goes (measured today, midnight to 6:47 PM), scrolls sideways" data-n="2 3" style="--tw:438px" markdown="1">

| Kind of check | Hours today | Share |
|---|---|---|
| Python tests of our tools and the app's Python | 20.2 | 60% |
| Website checks (`tests/site_*`, 42 of 96 drive a Chromium browser) | 9.1 | 27% |
| App build and unit tests (Xcode) on the mini | 4.3 | 13% |
| **Total** | **33.6** | |

</div>


The rows behind it:
- Merges' "host" step on the mini: 39 runs, 8.9 hours, typical (median) 813 seconds, slowest tenth over 1,500 seconds.
  That step mixes Python and website suites. I split it the way the other test runs split (67% Python, 33% site),
  which is an assumption.
- Other test runs (the main gate's checks and workers' own runs): 135 runs, 13.5 hours of clock time. Inside that,
  Python suites took 12.6 suite-hours and website suites 6.2. Suites run side by side, so suite-hours are more than
  clock hours.
- The app's Python checks through the main gate: 12 runs, 1.6 hours, typical 301 seconds.
- Xcode on the mini: 26 merge-step runs over a minute (3.9 hours, typical 506 seconds), one main-gate run (1,055
  seconds) and one other run (202 seconds). The MacBook ran none today. On Sunday it ran 36, typical 327 seconds
  across its 68 results since 11-06 (`ops/metrics/land_xc.jsonl`).

Three things stand out:
- **Load doubles the time.** The same merge step took 406 seconds (typical) on Sunday and 813 seconds today. A note in
  `tools/personal_land.sh` records 267 seconds for one run on a quiet machine.
- **One test of the merge tool itself is the biggest single cost.** `personal_land_test.sh` ran 42 times today and
  took 5.9 hours, 18% of all check time.
- **A correction to a figure in the task.** "276 main_gate checks, median 479 s, 1 in 10 over 1279 s" counts suite
  rows, not checks. The 276 are today's rows for suites that passed or failed (69 app, 149 tools, 58 site). The 479
  and 1,279 come from the 69 app rows alone, and each of those rows repeats its whole run's time once per suite. So a
  21-minute run that covered 9 suites counts 9 times. There were 12 distinct app runs, typically 301 seconds. The
  tools and site rows have no time recorded. The same figure is in [`ops/plans/t3875-merge-capacity.md`](t3875-merge-capacity.html).

Xcode's 13% is low today only because the MacBook is silent. When it answers, about 30 to 46 app build checks a day
run there instead.

## 2. Option A: the MacBook also runs the Python and website suites

**Cost:** nothing to buy.

**What it would take in our code.** This is my reading, not a measured estimate. Engineers would need a few days.
1. Add a new kind of job to `tools/macbook-runner/kinds.json`, for example "host-suites", which runs `tests/run.sh`
   and `pywidget/tests/run_host.py`. An Investor approves each new kind once, on the MacBook (the kinds.json note,
   Commandment 61). It reaches the MacBook when the runner updates itself (VERSION goes up).
2. <span title="Whether we may and can build it: our rules and banned areas, and a first version Idris can finish by Day 22. A subject off the Investors&#x27; list is noted, not dropped.">Fit</span> it to the runner's protected box. Jobs there get no network and no `/tmp`. Tests would need their temporary
   files in the job's own folder. The 42 browser tests need Chromium, which the runner would have to download and
   check itself (a `fetch` step with a checksum). If not, they stay on the mini.
3. Have the merge step and `tools/main_gate.py` send the suites as a job and wait, the way the Xcode check already does
   through `tools/land_xc.py` and the `land/m` slots. Results would be turned into `suite_pass` rows.
4. Keep a fallback to the mini when the runner is silent, as T-3891 already does for Xcode.
5. Use the same Python version on both machines.

**Expected cut.** Up to 87% of the mini's check work would move to the laptop, and at quiet-machine speed checks would
run about twice as fast. But one laptop would then carry about 12 to 16 hours a day of Python and website checks, on
top of 3 to 5 hours of Xcode (my estimate from the hours above at quiet speed). That's nearly a full day, so it would
need to run jobs side by side.

**The catch.** Every merge would then depend on the machine that has been silent since 7:36 PM Sunday, about 23
hours. On 11-05, 20 of its 34 jobs failed (`ops/metrics/runner_health.jsonl`). Doing this makes the most fragile part
of our setup carry more of the load.

### Restart the runner

For the Investors, when the MacBook runner has gone quiet (the site shows no check-in for over 2 hours) or after the
MacBook restarts. About 5 minutes. Nothing here needs a password beyond your normal login, and nothing is approved:
the runner turns on its own job kinds under your standing <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> (#251, 11-09 7:43 PM).

1. Plug the MacBook into power and open the lid.
2. In your own account, System Settings > Battery: set Low Power Mode to "Never". Under Options, turn on "Prevent
   automatic sleeping on power adapter when the display is off". (You asked for both on 11-09.)
3. Log in to the runner account, `itsthecompany runner`, with fast user switching (menu bar, your name, then the
   runner account). After any restart the runner stays stopped until this account is logged in again.
4. In the runner account, open Terminal and paste:
   `tail -3 ~/itsthecompany-runner/runner.log`
   A line with `idle`, `checkin` or `job` dated in the last 2 minutes means it is running. Go to step 7.
5. If the last line is old, check for a pause: `ls ~/itsthecompany-runner/PAUSE`. If that file is listed, remove it
   with `rm ~/itsthecompany-runner/PAUSE`, wait 2 minutes, and repeat step 4.
6. If it is still quiet, install it again from a fresh copy of `main` (this is the documented install; it refuses to
   run in any other account):
   `rm -rf ~/itsthecompany-setup && gh repo clone Its-The-Company/itsthecompany ~/itsthecompany-setup && bash ~/itsthecompany-setup/tools/macbook-runner/install.sh`
   Wait 2 minutes and repeat step 4. If it still shows nothing new, paste the last 20 lines
   (`tail -20 ~/itsthecompany-runner/runner.log`) into the issue thread; do not try anything else.
7. Switch back to your own account with fast user switching. Do not log the runner account out; it keeps working in
   the background.

The company then checks, without you: the next check-in on `macbook-results` shows runner 28 or later, kinds `build`
and `host` on, and up to 8 jobs side by side. If the runner stays silent, the Mac mini runs every check itself (Xcode
since T-3891; the Python suites once T-3907's gate route lands), so merges slow down but do not stop.

## 3. Option B: rented test machines and merge-queue services

### GitHub's own test machines (GitHub Actions)

From GitHub's pages, read today:
- Price per minute: Linux 2-core $0.006, Linux 4-core $0.012 (only on the Team or Enterprise plans), Mac with 3 cores
  (M1) $0.062, Mac 5-core (M2 Pro) $0.102. GitHub rounds each job up to a whole minute
  (`gh-actions-runner-pricing.html`).
- Included each month: $12 of machine time on the free organization plan, $18 on Team, $300 on Enterprise Cloud
  (`gh-actions-limits.html`). The watchdog already uses about 1,500 of the free plan's 2,000 minutes (its own note in
  `.github/workflows/watchdog.yml`). Machines we run ourselves are not charged (`gh-actions-billing.html`).
- At most 20 jobs at once on Free and 60 on Team, but only 5 Mac jobs at once on either. Enterprise allows 500 and 50.
- What a private repository gets: a Linux machine with 2 cores and 8 GB of memory, or a Mac with 3 M1 cores and 7 GB
  (`gh-hosted-runners.html`).
- Plans: Team $4 per user a month, Enterprise $21 per user a month (`gh-pricing.html`).

**Monthly cost at our volume.** I took today's 186 Python and website check runs over 18.8 hours, which comes to about
237 a day. The machine time scales to about 1,840 minutes a day as measured on the loaded mini, plus about 2 minutes
per run to set up (fetching the code, Python, the browser).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: GitHub&#x27;s own test machines (GitHub Actions), scrolls sideways" style="--tw:844px" markdown="1">

| What runs there | Minutes a month | Cost a month |
|---|---|---|
| Python and website checks on Linux 2-core, at half today's speed up to today's speed | 41,900 to 69,500 | **$240 to $405** (after the $12 included) |
| The same checks on GitHub's Macs instead | same | $2,600 to $4,300 |
| App build checks on GitHub's Macs: 30 to 46 a day, 15 to 25 minutes each from a cold start | 13,500 to 34,500 | **$840 to $2,140** |
| Xcode only as a backup on days the MacBook is silent | about 600 to 1,150 a silent day | about $37 to $71 a silent day |

</div>


The 15 to 25 minutes for a cold Xcode build is my estimate and hasn't been tried. Our warm MacBook takes 5½ minutes.
One trial run would settle it.

On Enterprise Cloud ($21 a person a month), the included $300 covers about 50,000 Linux minutes. That's most of the
estimate above, so for a small organization Enterprise could cost less than paying by the minute. With 3 members it
would be $63, plus $0 to $117 for extra minutes. I don't know how many members the organization has. The Investors do.

**Setup.** The workflow file goes in `.github/workflows/`, and the Investors own that folder, so they write and commit
it. We would draft its text in a request card. Our tools would push the merge candidate to a `land/...` branch on
GitHub, which starts the workflow. They would read the result through GitHub's API and record it as they do now. About
34 of 438 test files call Mac-only commands (`launchctl`, `diskutil`, `osascript` and similar). Those stay on the mini
or get skipped on Linux. A spending cap ("budget") is set by the Investors in GitHub billing.

**What changes in our flow.** Very little. <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">Lanes</span> still <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">park</span> their work, and `tools/personal_land.sh`,
`tools/park_batch.py` and `tools/merge_queue.py` still rebase and merge on the mini. Only the "run the suites" step
moves: it would wait on GitHub instead of running here, like the Xcode step waits on the MacBook today.

### GitHub's merge queue

It only works in a private repository if the organization uses **GitHub Enterprise Cloud**
(`research/inbound/t3421-merge-practice/github-merge-queue.html`, read 2026-11-08). Every change must be a pull
request, and the checks still run on rented or our own machines, paid as above. The queue sends up to 100 check
builds at once.

### Merge-queue services

- **Mergify:** free for private teams of up to 5 users, merge queue included. The Max plan is $21 per seat a month,
  for up to 100 users (`mergify-pricing.html`).
- **Trunk:** free for up to 5 committers, merge queue included. Team is $0 per committer a month plus $3 per extra
  million test records (`trunk-pricing.html`).
- **Aviator:** not priced. Its legal page answered with a redirect twice and I didn't chase it.

At our size, both Mergify and Trunk could be $0. I can't tell whether they would count our workers as separate
committers, since all our commits come from one GitHub account. Either way, they don't run tests, so they would not
speed up a single check. They need the pull-request flow, and our own tools already do the queueing. They aren't
worth the change now.

### Security

- **Secrets:** our tests need none. A workflow should get read-only access (`permissions: contents: read`), no
  repository secrets, and run only on pushes to company branches. A private repository has no outside pull requests
  to worry about.
- **Where the code goes:** it already lives on GitHub, so renting GitHub's machines adds GitHub's test machines and
  their logs (kept for a set time) and nothing new outside.
- **Merge-queue apps** are outside companies (Mergify is in France, Trunk in the US). They would need write access to
  the repository and permission to merge to main. That's a bigger step than renting machines.
- **`.github/` is Investor-owned:** every workflow, and any change to one, is theirs to write and commit (charter
  rule 7). Workers propose the text only.
- **Spending** is the Investors' gate (gate 3). They would set the plan and the budget cap themselves.

### Terms that limit automated use

- **GitHub, Acceptable Use, section 4:** no "excessive automated bulk activity" and nothing that would "place undue
  burden on our servers through automated means" (`gh-acceptable-use.html`).
- **GitHub, Actions terms:** hosted machines may not be used for "any other activity unrelated to the production,
  testing, deployment, or publication of the software project associated with the repository"
  (`gh-additional-terms.html`). Running this repository's tests is the permitted use. Running agents or unrelated jobs
  there is not.
- **Trunk:** its Master Services Agreement (3.3) limits use of the service to the customer and its "Authorized
  Users" (`trunk-msa.html`). Whether AI workers count as users would need asking before any sign-up.
- **Mergify:** I searched its terms for robot, scraping and automated use and found nothing that forbids automated use
  (`mergify-tos.html`).
- None of the pricing pages I read forbade a single signed-out read.

## 4. Recommendation

**Rent GitHub's Linux machines for the Python and website checks, capped at $400 a month. Keep Xcode on the MacBook
with the mini as backup, and skip merge-queue services for now.**

The numbers behind it:
- **Cost:** $240 to $405 a month on the current plan. With few members, Enterprise Cloud could cost less ($63 for 3
  people with $300 of machine time included).
- **What it frees:** about 87% of today's check work on the Mac mini (29.3 of 33.6 hours), which leaves the mini's
  cores to the agents and to Xcode.
- **Speed:** a typical merge check of about 5 to 8 minutes instead of 13½ minutes typical and 25 minutes for the
  slowest tenth today. Up to 20 run at once instead of queuing. This is an estimate from quiet-machine runs (267 to
  406 seconds) and needs a trial to confirm.
- **What it doesn't fix:** checks waiting on the MacBook (48 of 134 merge attempts today) and changes held back
  (29 today: 20 that wouldn't rebase cleanly, 9 on failing checks). Those need the MacBook awake and the work fixed.

**Steps if the Investors agree:**
1. Wake the MacBook (the open request card). It's free and today's biggest blocker.
2. Investors choose the plan (stay on the current one, or Enterprise) and set a $400 monthly budget in GitHub billing.
3. We draft the workflow text and the small tool change. The Investors commit the workflow. A trial of about 20 real
   checks (a dollar or two) measures the true minutes before anything else moves.
4. If the MacBook's silences continue, a separate decision: GitHub's Macs as a backup on silent days only, about $37 to
   $71 per silent day, with its own budget.

**Option A** stays the no-spend choice. It frees the same mini time for $0, but it puts every merge on one laptop that
has been silent for most of today.
{% endraw %}

</div>
