---
layout: "default"
title: "Card: should code from someone else run in 1.0? (answered: A)"
section: "documents"
description: "On 11-14 you chose that a project someone else made can run in PyWidget, with less access than your own projects and its code shown first. Our plan for doing that safely does not hold yet. It kept someone else&#x27;s code\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/build-plan/decisions/' | relative_url }}">← Decisions</a><a href="{{ '/documents/pywidget/adr-012-investor-question.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Decision</span><span>Day 36 · Thu Nov 26</span><span><code>pywidget/docs/decisions/ADR-012-investor-question.md</code></span></div><h1>Card: should code from someone else run in 1.0? (answered: A)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Draft by Idris, 1:30 AM ET 11-26, revised after review the same morning, for the CEO to carry. **Answered:** the Investors chose **A** on card #368 (an Investor, 10:05 AM ET 11-26, `log/rulings.md`). What A asks is built for projects opened from a file (T-5891, merged at 4f8813f02e), and ADR-012 section 7 records the answer. The card's text as drafted is kept below for the record.

On 11-14 you chose that a project someone else made can run in PyWidget, with less access than your own projects and its code shown first. Our plan for doing that safely does not hold yet. It kept someone else's code walled off by running it in a separate copy of the app's Python. Our runtime engineer's review found that this wall can be got round, and the rest of the plan rests on it. We can't yet promise it holds.

**A (we recommend this).** In 1.0, a project opened from a file is shown, never run. You see every file and, in plain words, what it says it uses. If you read it and want it, one button makes it your own project. The app warns you first that it will then have the same access as code you wrote. Nothing runs until you choose that.

A gives up three things. It drops the "less access" in your 11-14 answer: someone else's code either doesn't run, or, once you make it yours, has all the access your own code has. It stops imported projects from running in today's test build, where they run now. And it depends on people reading the code before they press the button: the warning comes first, but nothing checks the code for them.

**B.** We build the walled-off way before 1.0, as you asked on 11-14. It is new work deep in the app's Python engine, larger than the notice and check your 11-14 answer was planned with. We haven't sized it, and it may move the release date. One part of it may not be possible at all, and we won't know until we try. Even when it works, such projects' widgets would refresh less often than your own, and they couldn't use the common add-ons for charts and images unless we also rebuild those add-ons, which is more work again.

Reply A or B.
{% endraw %}

</div>
