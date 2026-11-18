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

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 390 documents</small></a><a class="btn fld" href="{{ '/documents/restructuring/' | relative_url }}"><b>The Restructuring</b><small>2 folders · 25 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>51 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>2 documents</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>99 documents</small></a><a class="btn fld" href="{{ '/documents/write-ups/' | relative_url }}"><span id="write-ups"></span><b>Write-ups</b><small>2 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives. Every other document is in its folder.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/t-4784-handoff.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 28 · Wed Nov 18</span></span><b>T-4784 handoff (2026-11-17 11:59 PM, <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> a3)</b><p>Paused: the Mac mini's disk is under tools/xc.sh's 20 GB line (11 GB free after its clean), so the new test has not run. Nothing for T-4784 is…</p></a><a class="card" href="{{ '/documents/company/t-3765-device-check.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Idris</span><span>Day 28 · Wed Nov 18</span></span><b>T-3765: the phone check of a real widget tap on build 7 (draft for the main session)</b><p>Idris, Mon 11-16. Drafted here, then posted by the main session as #319 (task packet: no worker posts to GitHub).</p></a><a class="card" href="{{ '/documents/pywidget/t4688-f531d51b-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 28 · Wed Nov 18</span></span><b>Review of T-4688 at f531d51b: Developer mode in Settings (the tester Pro switch opens on an unread AppTransaction)</b><p>The key question: is the compile condition alone enough to keep Pro out of App Review and App Store copies? It is not alone, and it does not need to…</p></a><a class="card" href="{{ '/documents/pywidget/t4688-8e22b682-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 28 · Wed Nov 18</span></span><b>Review of T-4688 at 8e22b682: Developer mode's Reset to first launch and the App Store product check</b><p>No High finding. Nothing in this commit lets a customer unlock Pro without paying, and Reset to first launch cannot touch a purchase.</p></a><a class="card" href="{{ '/documents/pywidget/t4181-572ddeb8-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Pernille</span><span>Day 28 · Wed Nov 18</span></span><b>Review of T-4181 at 572ddeb8: the send writes no lane key (T-4656)</b><p>The question the task asks: does a script whose refused import was removed now return to the widget lane on resend? For the decision, yes. send_lane…</p></a><a class="card" href="{{ '/documents/pywidget/t4564-f377f5ca6a-idris.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Idris</span><span>Day 28 · Wed Nov 18</span></span><b>Review of f377f5ca6a: T-4564, bound a run Button's args numbers to 253 - 1</b><p>The runtime and the DSL refuse the same numbers with the same words, before user code runs, and the tests hold both the bound and the message. The…</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped when the Investors chose pywidget on 2026-10-25. They are kept in the <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, with <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a> and the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
