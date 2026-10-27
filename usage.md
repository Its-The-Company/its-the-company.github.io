---
layout: "default"
title: "Usage"
section: "usage"
---

# Claude usage

<p class="lead">One Claude Max 20x subscription runs the company, and it never buys extra usage. The plan meters a rolling 5-hour window, a weekly window, and a weekly Fable allowance; each bar shows how much of that limit is used. The company aims to use the whole weekly allowance by each reset, never early (Tenet 7), and a marker on each bar shows the plan by now.</p>

<div class="panel">
<p class="status-line warm"><b>24 points ahead of the week's even pace.</b> <span>Source: the plan's own meter, read Mon 11:19 PM.</span></p>
<div class="bar warm"><div class="bar-head"><span>This week</span><span>51% of the weekly limit · resets Sun 1:59 AM</span></div><div class="bar-track"><div class="bar-fill" style="width:51.0%"></div><i class="mark plan" style="left:27.0%" title="plan by now: 27%"></i></div><div class="bar-foot">Plan by now: 27% of your weekly allowance used, the marker.</div></div>
<div class="bar warm"><div class="bar-head"><span>Today</span><span>112% of today's share</span></div><div class="bar-track"><div class="bar-fill" style="width:100.0%"></div><i class="mark plan" style="left:97.2%" title="plan by now: 97%"></i><i class="mark reserve" style="left:100.0%" title="the evening report's reserve"></i></div><div class="bar-foot">Plan by now: 97% of today's share of your weekly allowance. The grey marker <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> back a reserve for the evening report; it is released once the report is done.</div></div>
<div class="bar ok"><div class="bar-head"><span>Last 5 hours</span><span>5% of the 5-hour limit · resets 3:59 AM</span></div><div class="bar-track"><div class="bar-fill" style="width:5.0%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Fable this week</span><span>3% of its weekly allowance</span></div><div class="bar-track"><div class="bar-fill" style="width:3.0%"></div></div><div class="bar-foot">A ceiling, not a target: Fable shares the weekly limit, so it is used as the work needs.</div></div>
</div>

## Why

- Today's share is used; work waits for tomorrow's share, while reports and replies still run.

## This week, hour by hour

What the run loop was doing in each hour of the pacing week.

<div class="week-strip" role="img" aria-label="This week, hour by hour"><div class="wrow head"><span></span><span>0</span><span></span><span></span><span></span><span></span><span></span><span>6</span><span></span><span></span><span></span><span></span><span></span><span>12</span><span></span><span></span><span></span><span></span><span></span><span>18</span><span></span><span></span><span></span><span></span><span></span></div><div class="wrow"><span>Sun</span><i class="h out"></i><i class="h out"></i><i class="h c-limit_5h" title="Sun 2:00 · at the 5-hour limit"></i><i class="h c-work" title="Sun 3:00 · working"></i><i class="h c-work" title="Sun 4:00 · working"></i><i class="h c-work" title="Sun 5:00 · working"></i><i class="h c-work" title="Sun 6:00 · working"></i><i class="h c-share_spent" title="Sun 7:00 · today's share used"></i><i class="h c-work" title="Sun 8:00 · working"></i><i class="h c-share_spent" title="Sun 9:00 · today's share used"></i><i class="h c-share_spent" title="Sun 10:00 · today's share used"></i><i class="h c-share_spent" title="Sun 11:00 · today's share used"></i><i class="h c-share_spent" title="Sun 12:00 · today's share used"></i><i class="h c-share_spent" title="Sun 13:00 · today's share used"></i><i class="h c-share_spent" title="Sun 14:00 · today's share used"></i><i class="h c-share_spent" title="Sun 15:00 · today's share used"></i><i class="h c-share_spent" title="Sun 16:00 · today's share used"></i><i class="h c-share_spent" title="Sun 17:00 · today's share used"></i><i class="h c-work" title="Sun 18:00 · working"></i><i class="h c-work" title="Sun 19:00 · working"></i><i class="h c-work" title="Sun 20:00 · working"></i><i class="h c-work" title="Sun 21:00 · working"></i><i class="h c-work" title="Sun 22:00 · working"></i><i class="h c-work" title="Sun 23:00 · working"></i></div><div class="wrow"><span>Mon</span><i class="h c-offline" title="Mon 0:00 · no tick: offline or stopped"></i><i class="h c-work" title="Mon 1:00 · working"></i><i class="h c-work" title="Mon 2:00 · working"></i><i class="h c-limit_5h" title="Mon 3:00 · at the 5-hour limit"></i><i class="h c-limit_5h" title="Mon 4:00 · at the 5-hour limit"></i><i class="h c-share_spent" title="Mon 5:00 · today's share used"></i><i class="h c-work" title="Mon 6:00 · working"></i><i class="h c-share_spent" title="Mon 7:00 · today's share used"></i><i class="h c-share_spent" title="Mon 8:00 · today's share used"></i><i class="h c-share_spent" title="Mon 9:00 · today's share used"></i><i class="h c-share_spent" title="Mon 10:00 · today's share used"></i><i class="h c-share_spent" title="Mon 11:00 · today's share used"></i><i class="h c-share_spent" title="Mon 12:00 · today's share used"></i><i class="h c-share_spent" title="Mon 13:00 · today's share used"></i><i class="h c-share_spent" title="Mon 14:00 · today's share used"></i><i class="h c-share_spent" title="Mon 15:00 · today's share used"></i><i class="h c-share_spent" title="Mon 16:00 · today's share used"></i><i class="h c-share_spent" title="Mon 17:00 · today's share used"></i><i class="h c-work" title="Mon 18:00 · working"></i><i class="h c-work" title="Mon 19:00 · working"></i><i class="h c-offline" title="Mon 20:00 · no tick: offline or stopped"></i><i class="h c-offline" title="Mon 21:00 · no tick: offline or stopped"></i><i class="h c-work" title="Mon 22:00 · working"></i><i class="h c-share_spent" title="Mon 23:00 · today's share used"></i></div></div>
<div class="legend hours"><span><i class="h c-work"></i>working 6 h</span><span><i class="h c-limit_5h"></i>at the 5-hour limit 2.5 h</span><span><i class="h c-share_spent"></i>today's share used 27 h</span><span><i class="h c-offline"></i>no tick: offline or stopped 10 h</span></div>

## Where the usage went, last 7 days

<div class="stack"><i class="seg project" style="width:99.4%" title="product work 99.4%"></i><i class="seg reports" style="width:0.2%" title="reports 0.2%"></i><i class="seg hiring" style="width:0.4%" title="hiring 0.4%"></i><i class="seg talk" style="width:0.0%" title="small talk 0.0%"></i></div><div class="legend"><span><i class="seg project"></i>product work 99.4%</span><span><i class="seg reports"></i>reports 0.2% (<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> 3%)</span><span><i class="seg meetings"></i>meetings 0.0% (cap 3%)</span><span><i class="seg hiring"></i>hiring 0.4% (cap 3%)</span><span><i class="seg talk"></i>small talk 0.0% (cap 1%)</span></div>

<div class="bar ok"><div class="bar-head"><span>Product work</span><span>99.4% of all usage</span></div><div class="bar-track"><div class="bar-fill" style="width:99.4%"></div><i class="mark floor" style="left:90.0%" title="at least 90%"></i></div><div class="bar-foot">At least 90% goes to the product: the marker.</div></div>
<div class="bar ok"><div class="bar-head"><span>Reports</span><span>0.2% share of all tokens used so far (last 7 days) · 5% of its cap of 3%</span></div><div class="bar-track"><div class="bar-fill" style="width:5.3%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Meetings</span><span>0.0% share of all tokens used so far (last 7 days) · 0% of its cap of 3%</span></div><div class="bar-track"><div class="bar-fill" style="width:0.0%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Hiring</span><span>0.4% share of all tokens used so far (last 7 days) · 14% of its cap of 3%</span></div><div class="bar-track"><div class="bar-fill" style="width:14.0%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Small talk</span><span>0.0% share of all tokens used so far (last 7 days) · 1% of its cap of 1%</span></div><div class="bar-track"><div class="bar-fill" style="width:1.0%"></div></div></div>

## Product work by kind, last 7 days

Each worker call names its kind of work; the Operator's own turns count as operations.

<div class="bar ok"><div class="bar-head"><span>Research</span><span>33% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:33.5%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Build</span><span>18% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:17.6%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Tools</span><span>14% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:14.1%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Operations</span><span>10% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:9.5%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Plan</span><span>8% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:8.4%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Design</span><span>7% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:7.3%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Review</span><span>5% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:5.1%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Test</span><span>3% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:2.6%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Release</span><span>1% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:1.1%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Ops</span><span>1% of product work</span></div><div class="bar-track"><div class="bar-fill" style="width:0.8%"></div></div></div>

## Models this week

<div class="bar ok"><div class="bar-head"><span>Fable</span><span>1% of this week's usage</span></div><div class="bar-track"><div class="bar-fill" style="width:0.9%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Opus</span><span>98% of this week's usage</span></div><div class="bar-track"><div class="bar-fill" style="width:98.1%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Sonnet</span><span>1% of this week's usage</span></div><div class="bar-track"><div class="bar-fill" style="width:0.9%"></div></div></div>
<div class="bar ok"><div class="bar-head"><span>Haiku</span><span>0% of this week's usage</span></div><div class="bar-track"><div class="bar-fill" style="width:0.1%"></div></div></div>

## API credits

The plan includes API credits each month. The company uses them only as overflow while a plan limit has paused work, never for Fable, and never past the Investors' caps.

<div class="bar ok"><div class="bar-head"><span>This cycle</span><span>0% of the included credits</span></div><div class="bar-track"><div class="bar-fill" style="width:0.0%"></div><i class="mark cap" style="left:95.0%" title="the reserve: overflow stops here"></i></div></div>
<div class="bar ok"><div class="bar-head"><span>This week</span><span>0% of the weekly overflow cap</span></div><div class="bar-track"><div class="bar-fill" style="width:0.0%"></div></div></div>
<div class="bar-foot">Overflow is off: no API key in the Keychain.</div>

## Past weeks

<div class="bar hot"><div class="bar-head"><span>Week of 2026-10-18</span><span>102% of the weekly limit</span></div><div class="bar-track"><div class="bar-fill" style="width:100.0%"></div></div></div>

## The figures

<details markdown="1"><summary>The exact figures</summary>

| Window | Used | Plan by now |
| --- | --- | --- |
| This 5-hour window | 5% of the 5-hour limit (resets 3:59 AM) | |
| Today | 112% of the daily pace | 97% |
| This week | 51% of the weekly limit (resets Sun Nov 1, 1:59 AM) | 27% |
| Fable this week | 3% of its weekly allowance | |

24 points ahead of the week's even pace. Why: Today's share is used; work waits for tomorrow's share, while reports and replies still run. (Source: the plan's own meter.)

| Model | Share of this week's usage |
| --- | --- |
| Fable | 1% |
| Opus | 98% |
| Sonnet | 1% |
| Haiku | 0% |

Product work by kind, last 7 days: research 33%, build 18%, tools 14%, operations 10%, plan 8%, design 7%, review 5%, test 3%, release 1%.

Running the site: about 0.077% of this week's allowance (cap 3%; 6 run(s) with a model call).

| Category | Share | Cap |
| --- | --- | --- |
| project | 99.4% | at least 90% |
| reports | 0.2% | 3% |
| meetings | 0.0% | 3% |
| hiring | 0.4% | 3% |
| talk | 0.0% | 1% |

</details>
