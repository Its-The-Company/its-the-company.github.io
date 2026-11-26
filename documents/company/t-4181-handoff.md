---
layout: "default"
title: "T-4181 handoff (Operator, from Idris&#x27;s report, 2026-11-26 ET, lane a)"
section: "documents"
description: "This session resumed the 11-25 parked branch (parked/a/20261125-233308-38972) and did not start over."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-4181-handoff.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span><span><code>ops/plans/T-4181-handoff.md</code></span></div><h1>T-4181 handoff (Operator, from Idris's report, 2026-11-26 ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a)</h1></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
This session resumed the 11-25 <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch (parked/a/20261125-233308-38972) and did not start over.

## On the branch

- T-0972 9d56c0ef55, T-0696 81adbe496b, T-2260 f328df850c: the parked commits, cherry-picked onto main 43b99322cd.
- T-0700 00c00b9c47: the in-extension assertion now runs (1 run, 0 failed); samples in t0700-hang.jsonl.
- T-4404 c370633ea5: the parked uncommitted fix (158fe55b15) was read, went red with the fix removed and green with
  it, and has a new mutant in mutants-t1852.json.
- PyWidgetTests at c370633e: 2415 run, 0 failed, 2 skipped (J-20261126-0048-land-chk-a5ab71-4-265223).
- Review: Pernille, no blocking findings. Non-blocking: ExtensionLaneTests.swift:1859 now takes only the after-end
  exit, so the T-2260 count check rests on :1616; the 1 s hold at :1599 can expire under load (false red); the
  t0972 bench note says J-20261125-2221 passed after one retry, while the runner marks that job failed (exit 65).

## Not committed, and why

- T-4280: its rule is already on main (c76347c124). What is left is the Simulator and internal-build recording,
  T-4494 item 3, which needs the Investors' iPhone.
- T-1882: part (1) needs B5's fields.json. Nothing writes it yet and no open board line builds it.

## For the next session

- `plan` printed 29 unit filters for T-4404, but the runner takes at most 20 `-only-testing` filters; more send the
  run to the Mac mini, unbuilt, and nothing runs. Split them (20 + 9).
{% endraw %}

</div>
