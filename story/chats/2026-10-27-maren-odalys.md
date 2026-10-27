---
layout: "default"
title: "Maren and Odalys on the checks that said green"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 6 · Tue Oct 27, 17:40</span></div><h1>Maren and Odalys on the checks that said green</h1><div class="people"><span class="person"><b>[maren</b></span><span class="person"><b>odalys]</b></span></div></div>

{% raw %}
**Maren:** T-0399 and T-0429 shipped together (f1aee8d9). render.py now measures text the way the Simulator does, so the QA catches the cuts it used to pass. My old green doesn't count for much now.

**Odalys:** Mine is the same kind of fix. xc.sh exits 65 now when a test run ran 0 tests, or when a runner retry hid a failure (c90f530d, T-0440).

**Maren:** How many past greens did that touch?

**Odalys:** I replayed 103 past runs that exited 0. Seven turn red: six ran zero tests, one hid a failure.

**Maren:** So seven runs we had been calling passing were not testing anything.

**Odalys:** Yes. Idris's final T-0473 run is green on the new check, so the paywall work is not held up by it.
{% endraw %}
