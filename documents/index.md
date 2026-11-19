---
layout: "default"
title: "Documents"
section: "documents"
description: "Every document the company can show in public, in folders: Pywidget (build plan, research, design and specs, App Store drafts), reports, the Handbook, operations; the Archive keeps the rest."
---

# Documents

<nav class="rv-sw" aria-label="View: folders or newest first"><a href="{{ '/documents/' | relative_url }}" data-view="folders" aria-current="page">Folders</a><a href="{{ '/documents/newest/' | relative_url }}" data-view="newest">Newest</a></nav>
<style>
.rv-sw{display:inline-flex;gap:4px;margin:0 0 var(--s4);padding:4px;border:1px solid var(--line);border-radius:999px;background:var(--bg)}
.rv-sw a{display:inline-flex;align-items:center;min-height:36px;padding:0 18px;border-radius:999px;color:var(--ink);font-size:15px;font-weight:600;text-decoration:none}
.rv-sw a[aria-current]{background:var(--accent-soft);color:var(--accent)}
.rv-sw a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.rv-new .rv-r{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.rv-new .rv-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 var(--s3)}
.rv-new .rv-row label{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 14px;border:1px solid var(--line);border-radius:18px;
  background:var(--bg);color:var(--ink);font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap}
.rv-new .rv-row label small{font-weight:500;color:var(--muted)}
.rv-new .rv-subs{display:none}
.rv-new .kind{max-width:100%;white-space:normal;text-transform:none;letter-spacing:0;font-size:13px;line-height:1.3;border-radius:12px}
.rv-new .kind.o{background:transparent;box-shadow:inset 0 0 0 1px currentColor}
.rv-new .lk-grid .card b{font-size:18px}
@media (max-width:760px){.rv-new .rv-row.rv-tops{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}}
</style>
<script src="{{ '/assets/reportsview.js' | relative_url }}"></script>

<nav class="subtabs doc-tabs" aria-label="Documents or Archive"><a href="{{ '/documents/' | relative_url }}" aria-current="page">Documents</a><a href="{{ '/documents/archive/' | relative_url }}">Archive</a></nav>
<style>.doc-tabs{margin:var(--s3) 0 var(--s4)}.fld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:var(--s2);margin:var(--s3) 0 var(--s5)}.fld-grid .btn.fld{flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;min-width:0;min-height:64px;padding:var(--s2) var(--s3);text-align:left}.btn.fld b{font-size:var(--fs-2);line-height:1.25}.btn.fld small{font-weight:400;font-size:var(--fs-0);color:var(--muted)}.btn.fld:hover{border-color:var(--accent)}.btn.fld:focus-visible{outline:2px solid var(--accent);outline-offset:2px}</style>

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 420 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>54 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>3 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>113 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/pywidget/v1-1.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 29 · Thu Nov 19</span></span><b>Version 1.1: the plan as it stands</b><p>Replaces the 1.1 row of plan.md's 11-04 note (the Builder, own AI key, Control Center button, install from file, Share extension), which plan.md's…</p></a><a class="card" href="{{ '/documents/company/t-5070-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 29 · Thu Nov 19</span></span><b>T-5070 handoff: gate and scheduler tasks waiting to merge</b><p>Nothing was built. About 35 minutes went to reading and measuring; no fix of this signal's own is small enough to ship tested in the time left…</p></a><a class="card" href="{{ '/documents/company/t-4891-queue-clear.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 29 · Thu Nov 19</span></span><b>T-4891: the process and site merge queue, task by task</b><p>python3 tools/merge_limit.py open --kind other on main at 03:16: exit 0, "new process and site work may start: ... process and site 2 of 8". The…</p></a><a class="card" href="{{ '/documents/company/batch-size.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 29 · Thu Nov 19</span></span><b>T-4843: how many steps merge together, worked out from measured records</b><p>One rule for every queue. It uses the last 14 days of records and is worked out again each day.</p></a><a class="card" href="{{ '/documents/company/t-4807-test-rules.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Pernille</span><span>Day 29 · Thu Nov 19</span></span><b>T-4807: rules for new tests</b><p>Pernille, 11-17 9:35 PM ET. Answers an Investor on #41 (c6965124089, 7:26 PM 11-17: "fix every bad test ... Consult real-world examples of how tests…</p></a><a class="card" href="{{ '/documents/company/t-4805-unknown-reds.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 29 · Thu Nov 19</span></span><b>T-4805: a cause for every failed merge</b><p>Odalys, 11-18 7:15 PM ET. Answers an Investor on #41 c6965124089 (7:26 PM 11-17: "Investigate all issues that failed due to an unknown reason –…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
