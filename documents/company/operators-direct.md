---
layout: "default"
title: "Operators &amp; Direct: a Home section for the sessions that aren&#x27;t workers"
section: "documents"
description: "A new section on Home, above In flight, called Operators &amp; Direct. It shows every session that isn&#x27;t a worker&#x27;s: one card for each running Operator session on any account (main and every personal lane), and one card for\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/operators-direct.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 22 · Thu Nov 12</span><span><code>ops/plans/operators-direct.md</code></span></div><h1>Operators &amp; Direct: a Home section for the sessions that aren't workers</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Investor an Investor, Plan mode on #41: request c6816980644 (1:55 AM 11-12), questions c6817013353, answers c6817045232
(1:59 AM 11-12, all four A). Plan written by the Operator, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a3.

## Goal

A new section on Home, above In flight, called **Operators & Direct**. It shows every session that isn't a worker's: one
card for each running Operator session on any account (main and every personal lane), and one card for each session
typed into Claude on the Mac mini ("Direct"). A card is drawn like an In flight card but has no stage timeline and no
task ID. It shows:

1. the worker: "Operator" or "Direct", with its face;
2. the account badge, drawn as In flight draws it;
3. the model and effort;
4. how long it has been on its current activity;
5. a name: "Inbox – {Investor}'s {time} Message on {channel}" while answering a message, otherwise a short label for
   what it is doing now. A Direct card shows the session's own short title for the request.

## What the answers decided

- **Q1 A, finding Direct sessions:** a Claude Code start/end hook writes a small record (session id, account, model,
  effort, start, end) for each session typed into the Mac mini. The Claude Code settings are Investor-owned, so the
  hook goes in by proposal through the applier. It spends no money and needs no "approve".
- **Q2 A, Direct card's name:** the session writes its own short title at its start, with one command the start hook
  reminds it to run. The title is checked like a task title (tools/title_check.py) and kept public-safe: no private
  details, names past first names, or issue contents (the bans). No extra model call.
- **Q3 A, Operator card's name outside the inbox:** what it is doing now, e.g. "Work session – 2 tasks",
  "Landing lane a3", "Evening report".
- **Q4 A, freshness:** through the live feed during sessions, within a minute, the same feed T-3986 extends. The
  built page is the fallback.

## Steps (board lines)

1. **T-4133** (Odalys): the Direct session record. A hook script writes start/end records under ops/ with model and
   effort, plus a `title` command the session runs once. The settings change goes as an applier proposal. Tests first.
2. **T-4134** (Odalys): the Operator activity record. Each Operator session (main supervisor runs and personal lanes)
   writes what it is doing now, read from records that already exist: its inbox claim (who, when, channel), its
   session kind (work, inbox, report), its lane's claimed tasks, and landing. One small file per session, written only
   on change.
3. **T-4135** (Maren): two code-drawn portraits in personnel/portraits/, in the same style as the workers' portraits.
   Operator is grey and looks like an operator. Direct is a right-facing arrow. Shots in light and dark.
4. **T-4136** (Maren): the Home section. live_status.py's public-safe copy gets an "operators" block from T-4133 and
   T-4134's records, written only when it changes. tools/site/home_look.py draws the section above In flight from the
   live variable when it is present, with the built page as fallback. Tests red first, then shots.

Order: 1, 2 and 3 can run in parallel. 4 needs all three, and also T-3986 (the live feed's new blocks).

## Risks

- **Private words on a public page.** A Direct title is the Investor's request in short form. The title check refuses
  personal data, and a refused title shows as "Direct session" rather than guessing.
- **A hook that fails.** The hook must never stop or slow a session. It exits 0 on any error, and a missing record only
  leaves the card off.
- **Pipeline files.** supervisor.sh and personal_tick.sh belong to the audit implementation session until T-3992 to
  T-3997 are ticked. T-4134 reads their existing outputs and leaves those files alone. If a change there is needed,
  it goes as a note on that session's line.
- **Cost.** No model calls. Variable writes happen only on change, plus the existing heartbeat.

## Left out

- Usage and cost per non-worker session. The All tasks panel's "No task ID" group was raised separately (c6816434915)
  and is part of T-4124's review, not this plan.
- Sessions on other machines (the MacBook runner runs tests, not Claude sessions).
{% endraw %}

</div>
