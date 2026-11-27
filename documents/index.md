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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 477 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>66 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>3 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>136 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/t-4181-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Day 37 · Fri Nov 27</span></span><b>T-4181 handoff (Operator, from Idris's report, 2026-11-26 ET, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a)</b><p>This session resumed the 11-25 <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> branch (parked/a/20261125-233308-38972) and did not start over.</p></a><a class="card" href="{{ '/documents/pywidget/t4183-cb4bce57-odalys.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Odalys</span><span>Day 37 · Fri Nov 27</span></span><b>Review of cb4bce57: T-4515, a Habits row's tap opens its Page at that habit</b><p>The link, the route and the match are right and narrow. WidgetTapLink.focus (Shared/WidgetTapLink.swift:98-107) reads a focus only from /habits/open…</p></a><a class="card" href="{{ '/documents/pywidget/widget-animation-limits.html' | relative_url }}"><span class="meta"><span class="kind grey">Research</span><span>Idris</span><span>Day 36 · Thu Nov 26</span></span><b>Widget animation limits: the timer-mask method, measured (T-5640)</b><p>WK_ANIM=1 WK_ONLY=testWAnimationLimitsOnTheHomeScreen pywidget/ios/scripts/widgetkit_check.sh &lt;out&gt; on the pywidget-wk-check Simulator (iPhone 17e…</p></a><a class="card" href="{{ '/documents/company/t-4188-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Day 36 · Thu Nov 26</span></span><b>T-4188 handoff (Idris, updated 2026-11-26)</b><p>Baseline, the session's build-for-testing at a57dd2807b: J-20261126-0346-land-chk-a5ab71-3-428d99, whole PyWidgetTests, 2456 run, 0 failures, 2…</p></a><a class="card" href="{{ '/documents/company/t-4182-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 36 · Thu Nov 26</span></span><b>T-4182 handoff (lane a2, 2026-11-26, Idris)</b><p>Rewritten at the end of the 4:40 PM ET session (branch personal/a2 from main 1f08000445). Pernille reviews once at the merge point. Earlier steps on…</p></a><a class="card" href="{{ '/documents/pywidget/t4185-3f8325e4-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 36 · Thu Nov 26</span></span><b>Review of T-4185 at 3f8325e4: launcher edits target the shown slot (T-5898), invisible marks (T-5904), checklist (T-5016)</b><p>PASS, with three Low findings. Nothing here is a crash, data loss or App Review risk; every case below needs a slots.json or a link written by…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped on 2026-10-25: <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a>, the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
