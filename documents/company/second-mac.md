---
layout: "default"
title: "A second Mac as a test runner (plan)"
section: "documents"
description: "Take the test load off this Mac mini, so merges, test runs and agents stop waiting for it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/second-mac.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 37 · Fri Nov 27</span><span><code>ops/plans/second-mac.md</code></span></div><h1>A second Mac as a test runner (plan)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Operator, 2026-11-27 6:4x PM ET, for Investor an Investor's plan-mode message on #325 (c7229285317, 5:23 PM ET) and
his answers (c7230277289, 6:37 PM ET). Buying needs the Investors' "approve" (the charter's real-money gate); nothing
here is bought until one of them says so.

## The goal
Take the test load off this Mac mini, so merges, test runs and agents stop waiting for it.

## What the answers decided
- Q1 Runpod: no. It rents Linux machines with GPUs; it can't build the app or run the iOS Simulator.
- Q2 A second Mac, and Q3 which one: Jeremy asked what the company recommends. The recommendation is below.

## The recommendation: buy now, a Mac mini M6 with 32 GB
- **Why now, not after two days of measuring.** This evening already measured it. With 3 sessions working, the
  Mac mini's load ran between 129 and 393 on its 8 cores. Its test tool (xc.sh) refused Pernille's WidgetKit run for
  about 90 minutes; two guard suites in T-5890's merge timed out under load and turned it red; the T-4188, T-5795
  and T-5890 merges and four agents' test runs waited for load to fall. The MacBook runner itself kept up (235 jobs
  today, median wait 22 seconds): the Mac mini is the narrow part.
- **Why this one.** The M6 has a 12-core CPU (this Mac mini's M1 has 8) and takes up to 32 GB of memory (this one
  has 16 GB). Builds and Simulators are what load the Mac mini; more cores and memory let one runner hold more test
  jobs at once. The M6 starts at $899 (16 GB, 256 GB); the 32 GB and 512 GB options are priced at checkout on Apple's
  store. The M5 Pro (from $1,699) adds cores but costs about twice as much; it isn't needed for a test runner.
- **What it costs in usage.** Little: the MacBook runner's software and its route already exist
  (ops/plans/macbook-merge-checks.md, T-5247); a second runner reuses them.

## Steps
1. **The Investors approve the purchase and buy it** (gate 3). Their step, as every purchase is.
2. **One of them sets it up in person**: the macOS account, Xcode from the App Store, and the sign-ins (human
   checks stay with the Investors). The company writes the exact checklist from the MacBook's setup when it arrives.
3. **The company installs the runner and proves it** (T-5948): one probe job first, then route the Mac mini's
   Simulator and Xcode checks, and its heavy host suites, to the runners by measured time, as the MacBook's route does.
4. **The company measures the change** (T-5949): merge waits for tests, the Mac mini's load and the day's app merges,
   for two days before and after, posted on #325.

## Risks
- It does not fix the other limit: work a session may start (features waiting on an iPhone, App Store Connect or
  the Investors). T-5945 and the area moves work on that.
- Setup needs one of the Investors at the machine, and neither is at the Mac mini until Sunday 11-29.
- Delivery time is Apple's.

## What it leaves out
Runpod (Q1: no); a Mac Studio; any paid cloud Mac service.
{% endraw %}

</div>
