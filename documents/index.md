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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 438 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>56 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>3 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>124 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/t-5252-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 31 · Sat Nov 21</span></span><b>T-5252: hand-off of the pre-comparison work to the personal accounts (11-20, 11:05 AM ET)</b><p>Odalys. The main account reached 96% of its week at 11:00 AM on 11-20 (it resets Sun 11-22 2:00 AM ET) and is kept for the Investor inbox and the…</p></a><a class="card" href="{{ '/documents/company/t-4807-test-rules.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Pernille</span><span>Day 31 · Sat Nov 21</span></span><b>T-4807: rules for new tests</b><p>Pernille, 11-17 9:35 PM ET. Answers an Investor on #41 (c6965124089, 7:26 PM 11-17: "fix every bad test ... Consult real-world examples of how tests…</p></a><a class="card" href="{{ '/documents/company/t-4192-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 31 · Sat Nov 21</span></span><b>T-4192 handoff: T-0043</b><p>Stopped on the coordinator's word: an Investor on #325 at 2:23 PM ET (c7067981085), "Stop the app work until the comparison work is done". No commit…</p></a><a class="card" href="{{ '/documents/company/t-5257-home-map.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span></span><b>T-5257 (trim step 4): what Home reads today, and what each kept panel must be moved off</b><p>Shared home_look functions other pages use, so they stay: stage_map, js_stages, merged_holds (live_stage); blocked_html (tasks_panel); CSS…</p></a><a class="card" href="{{ '/documents/company/t-5256-merge-road-switch.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Odalys</span><span>Day 30 · Fri Nov 20</span></span><b>T-5256: a switch that sends the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span>' ready work through tools/merge.sh (design only, nothing built)</b><p>ops/merge_road.json &#123;"road": "old" | "merge.sh"&#125;; missing, unreadable or anything else means old. About 60 lines in three tools, about 120 lines of…</p></a><a class="card" href="{{ '/documents/company/t-5252-target-system.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 30 · Fri Nov 20</span></span><b>T-5252: the target system, and the steps that trim toward it</b><p>Since 11-13, main took 291 commits to pywidget/ and about as many to tools/ (219) and tests/ (248). tools/ holds 525 entries and about 200,000 lines…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
