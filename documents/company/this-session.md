---
layout: "default"
title: "This Session flowchart (Plan mode, an Investor #41)"
section: "documents"
description: "A flowchart of how the company&#x27;s work runs, live, so the Investors see at a glance where every piece of work is."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/this-session.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 17 · Sat Nov 7</span><span><code>ops/plans/this-session.md</code></span></div><h1>This Session flowchart (Plan mode, an Investor #41)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Written by the Operator, 2026-11-07 10:1x ET, from Evan's Plan mode answers: c6708569654 (ask), c6708675175 and
c6708725795 (answers); company questions c6708703496 and the 09:59 block. Builds on ops/plans/sessions-main-vs-<span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>.md,
ops/plans/one-dispatcher.md and ops/plans/one-coordinator.md (T-3247, being written now).

## The goal

A flowchart of how the company's work runs, live, so the Investors see at a glance where every piece of work is.

## What the answers decided


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What the answers decided, scrolls sideways" style="--tw:442px" markdown="1">

| Question | Answer |
| --- | --- |
| Where it lives | Both: a simplified flowchart inside Home's This Session panel, linking to a full page with the whole chart. |
| How live | Re-read every 30 s with the token saved in the browser, as Chat does (Home's status already reads the live COMPANY_STATUS variable every 5 s; the chart uses that feed). |
| Which flow | The one-coordinator flow only: one coordinating session; each account (main plan, personal accounts, API keys) is drawn as a source of workers, not as its own lane. Today's per-account sessions are not drawn. |
| Priority | The coordinator steps are built first, at P1, right after the main-branch test gate (T-3288). |
| Path shown | The current step highlighted; steps already passed shaded, each with the time spent at it. |

</div>


## Steps

1. **Coordinator** (Odalys, P1, after T-3288): the steps in ops/plans/one-coordinator.md, on top of T-2641 (cut the old
   per-account split, running now), T-2677 (the dispatcher's own clock) and T-2719 (main work in its own copies).
2. **Step feed** (Odalys, P1, after step 1's first runnable slice): the coordinator writes each task's step changes
   (claimed, packet out, worker running on account X, tests queued, tests on the MacBook, landing, landed or failed, with
   start time) into the live status, so a chart needs no extra reads.
3. **Design** (Maren, P1, may start now from ops/plans/one-coordinator.md): frames for the simplified panel and the full
   page, light and dark, 390 and 1280 wide: one coordinator box, account sources feeding workers, the task path with the
   current step highlighted and passed steps shaded with time spent. Code-drawn (Commandment 9), inside the approved look.
4. **Build** (Odalys, P1, after 2 and 3): panel and full page from Maren's frames, reading the feed every 30 s with the
   token (public status.json for visitors), inside the site's byte budgets and the scrub (Commandment 42). The saved
   patch in scratch T-2667-odalys/this-session.patch is a starting point only where it fits the new flow.

## Risks

- The coordinator is a large change to how sessions run; the chart must not wait on its last step. Step 2 ships with
  its first slice, and the chart draws what the feed carries.
- Until the coordinator is live, the chart would show a flow that isn't running yet; it goes on Home only once the
  coordinator runs (a short "coming" note before that).

## Left out

Today's per-account session view (Evan chose not to draw it), history beyond the current session, and any new tab.
{% endraw %}

</div>
