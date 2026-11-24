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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 465 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>61 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>3 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>130 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/three-sessions.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Day 34 · Tue Nov 24</span></span><b>Three sessions, one for each account (T-5786)</b><p>The Operator, 2026-11-24, in the Mac mini session an Investor typed into. Asked by an Investor (typed 12:10 AM ET 11-24, log/<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">rulings</span>.md): "Build all…</p></a><a class="card" href="{{ '/documents/pywidget/t5047-da4c8d07-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 34 · Tue Nov 24</span></span><b>T-5047 at da4c8d07: Commandment 13 re-review (T-5508)</b><p>H1 is fixed. Every code begins with P. The six fresh letters of the id leave out every letter of the tokens, P and W included, and neither prefix…</p></a><a class="card" href="{{ '/documents/pywidget/t5047-50a2c3dd-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 34 · Tue Nov 24</span></span><b>T-5047 at 50a2c3dd: Commandment 13 review (T-5508)</b><p>The record is a Debug diagnostic, so letting it stop being the verdict is a fair call in principle. But on the runner the record has been empty in…</p></a><a class="card" href="{{ '/documents/company/t-4807-test-rules.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Pernille</span><span>Day 34 · Tue Nov 24</span></span><b>T-4807: rules for new tests</b><p>Pernille, 11-17 9:35 PM ET. Answers an Investor on #41 (c6965124089, 7:26 PM 11-17: "fix every bad test ... Consult real-world examples of how tests…</p></a><a class="card" href="{{ '/documents/company/testflight-test-widgets.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 33 · Mon Nov 23</span></span><b>Test widgets that ship only in TestFlight builds (T-5643)</b><p>The Gallery (T-4183) is proved by all seven: the "Test widgets" section shows, previews and opens each one.</p></a><a class="card" href="{{ '/documents/company/t-5620-drain-look.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 33 · Mon Nov 23</span></span><b>T-5620: the drain look at the three later flips</b><p>Odalys, Sun 11-22 7:45 PM ET, revised 8:25 PM ET for the Investor ruling of 7:04 PM ET, and Mon 11-23 1:30 AM ET for the moved start. Board line…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
