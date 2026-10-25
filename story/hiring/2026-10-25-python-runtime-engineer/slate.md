---
layout: "default"
title: "Slate, Python runtime engineer"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-25-python-runtime-engineer/' | relative_url }}">← Hiring round: Python runtime engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Memo</span><span>Day 4 · Sun Oct 25, 19:33</span></div><h1>Slate, Python runtime engineer</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a></div></div>

{% raw %}
# Slate

Three candidates, dossiers in personnel/candidates/. Each has hosted CPython in a shipped program and built C extensions for a target they were not written for, as the brief's scorecard requires. They differ in where their depth sits.

- **Teodor**: runtime first. Nine years hosting CPython in lab-instrument control software; a stop button rebuilt three times, cold start cut from 1.9 s to 340 ms. Thinnest on Python API design and has never built for a mobile target. Wants to own a runtime end to end where every megabyte counts. Asks 8,200.
- **Pernille**: packaging first. Cross-compiled a scientific stack for Android and iOS, embedded the interpreter for the iOS port, and rebased onto PEP 730. Thinnest on public API design. Wants to own packaging and publish the build recipes with their licences. Asks 7,600.
- **Ruairi**: API first. Designed an immutable node-graph DSL that serialised to versioned JSON for a native renderer, on a host he embedded. Desktop wheels only, never iOS, and he has not measured start-up closely. Wants to design the language users write widgets in. Asks 8,000.

Teodor's ask sits above the brief's offer range (7,000 to 8,000) and Ruairi's at its top, which the brief reserves for an exceptional interview; the decision memo settles pay. No interviews held, no decision made. Interviews follow in separate runs with the brief's six fixed questions, then Idris's panel on the top two.
{% endraw %}
