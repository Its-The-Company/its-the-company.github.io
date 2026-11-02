---
layout: "default"
title: "Documents"
section: "documents"
description: "Every document the company can show in public, in folders: Pywidget (build plan, research, design and specs, App Store drafts), reports, the Handbook, operations; the Archive keeps the rest."
---

# Documents

<p class="lead">Every document the company can show in public, in folders. Open a folder to see its sub-folders and documents; open a document to read it on its own page.</p>

<nav class="subtabs doc-tabs" aria-label="Documents or Archive"><a href="{{ '/documents/' | relative_url }}" aria-current="page">Documents</a><a href="{{ '/documents/archive/' | relative_url }}">Archive</a></nav>
<style>.doc-tabs{margin:var(--s3) 0 var(--s4)}.fld-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:var(--s2);margin:var(--s3) 0 var(--s5)}.fld-grid .btn.fld{flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;min-width:0;min-height:64px;padding:var(--s2) var(--s3);text-align:left}.btn.fld b{font-size:var(--fs-2);line-height:1.25}.btn.fld small{font-weight:400;font-size:var(--fs-0);color:var(--muted)}.btn.fld:hover{border-color:var(--accent)}.btn.fld:focus-visible{outline:2px solid var(--accent);outline-offset:2px}</style>

<nav class="fld-grid" aria-label="Folders"><a class="btn fld" href="{{ '/documents/pywidget/' | relative_url }}"><span id="pywidget-plan"></span><span id="pywidget-research"></span><span id="pywidget-design"></span><span id="pywidget-release"></span><b>Pywidget</b><small>5 folders · 153 documents</small></a><a class="btn fld" href="{{ '/documents/reports/' | relative_url }}"><span id="reports"></span><b>Reports</b><small>23 documents</small></a><a class="btn fld" href="{{ '/documents/company/' | relative_url }}"><span id="company"></span><b>Company</b><small>1 document</small></a><a class="btn fld" href="{{ '/documents/operations/' | relative_url }}"><b>Operations</b><small>11 documents</small></a></nav>

<div class="ix">

<h2 id="newest">Newest documents</h2>
<p class="meta">By the date each document gives. Every other document is in its folder.</p>
<div class="cards"><a class="card" href="{{ '/documents/company/week2-review-inputs.html' | relative_url }}"><span class="meta"><span class="kind blue">Plan</span><span>Ines</span><span>Day 12 · Mon Nov 2</span></span><b>Week 2 review inputs: OPT-051 at n=10, and the product share</b><p>(3) Redo lines left out: 1, beside the deciding number (T-0896). 2553f710; its title names T-0841, which was not yet ticked when the line was added…</p></a><a class="card" href="{{ '/documents/pywidget/t1107-t1130-odalys.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Odalys</span><span>Day 12 · Mon Nov 2</span></span><b>T-1130 review of T-1107 (4ccfbb1a): escape-test corpus, host half</b><p>Run: python3 pywidget/tests/run_host.py --both escape -&gt; py3.9.6 and py3.13.18 each 12 tests, 1 expected failure, 0 failed suites (n=2 interpreters…</p></a><a class="card" href="{{ '/documents/pywidget/t1103-t1129-odalys.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Odalys</span><span>Day 12 · Mon Nov 2</span></span><b>T-1129 review of T-1103 at b11fe55b</b><p>Verdict: PASS. Code read from the commit, not from the notes. No fix needed before T-0191 or T-0657 build on it. Two Info items.</p></a><a class="card" href="{{ '/documents/pywidget/t1108-t1127-pernille.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Odalys</span><span>Day 12 · Mon Nov 2</span></span><b>T-1127 review of T-1108 (692bfadb), Pernille</b><p>Verdict: PASS with one fix (L1) and two Info notes. Read from git show 692bfadb and the files, not Odalys's notes. No Xcode.</p></a><a class="card" href="{{ '/documents/pywidget/t1102-t1126-maren.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Maren</span><span>Day 12 · Mon Nov 2</span></span><b>T-1126 review of T-1102 at 9ed0c983 (Maren)</b><p>Verdict: PASS with two fixes (F1, F2) and two notes. Read from the commit and the sources at HEAD, not Odalys's notes.</p></a><a class="card" href="{{ '/documents/pywidget/t1111-t1118-idris.html' | relative_url }}"><span class="meta"><span class="kind grey">Review</span><span>Idris</span><span>Day 12 · Mon Nov 2</span></span><b>T-1118: review of T-1111 (Pernille, 56556c09)</b><p>All three items are fixed as decided. Two Info notes below, no fix rows.</p></a></div>

<p class="meta"><span id="hunt"></span><span id="best-ideas"></span><span id="method-v2"></span><span id="v2-rulings"></span><span id="hunt-funnel"></span><span id="hunt-looked"></span><span id="hunt-notes"></span><span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, the idea hunt and the Day 1 and 2 market research stopped when the Investors chose pywidget on 2026-10-25. They are kept in the <a href="{{ '/documents/archive/' | relative_url }}">Archive</a>, with <a href="{{ '/documents/hunt/' | relative_url }}">the idea hunt at a glance</a> and the <a href="{{ '/documents/ideas/' | relative_url }}">Ideas library</a>.</p>

<p class="meta" id="held">18 documents stay off the public site; each folder names its own with the reason.</p>

</div>
