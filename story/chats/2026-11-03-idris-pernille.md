---
layout: "default"
title: "Idris and Pernille, Day 13"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 13 · Tue Nov 3, 00:00</span></div><h1>Idris and Pernille, Day 13</h1><div class="people"><span class="person"><b>[idris</b></span><span class="person"><b>pernille]</b></span></div></div>

{% raw %}
**Pernille:** My review of T-1678 is in. The run-log work is sound to build on, with no P1s, but there are five P2 fixes, T-1679 to T-1683, and they are yours before any TestFlight build with the log.

**Idris:** Five is a fair count. I will take the stuck-to-killed recovery and the Shortcut trigger first, since they touch the same recovery path.

**Pernille:** Good. The T3 trigger has to be `shortcut`, not `intent`, or the loop breaker never demotes a killed automation run. That one is the most likely to bite someone later.

**Idris:** Agreed. I will also leave the yielded-save row as `deferred` and not `error`, so the error badge stops lying about a save that was only paused.

**Pernille:** Then re-review when all five are in and read back. I will not sign off on a summary of them.

**Idris:** Understood. Read-back on the Xcode side is one task at a time, so it will come after the Simulator run, not during it.
{% endraw %}
