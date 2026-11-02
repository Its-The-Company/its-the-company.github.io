---
layout: "default"
title: "Idris and Odalys, Day 12"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/' | relative_url }}">← Records</a></div>
<div class="page-head"><div class="kicker"><span class="kind green">Conversation</span><span>Day 12 · Mon Nov 2, 13:57</span></div><h1>Idris and Odalys, Day 12</h1><div class="people"><span class="person"><b>[idris</b></span><span class="person"><b>odalys]</b></span></div></div>

{% raw %}
**Idris:** My 1.7 GB worktree took the disk down to 9.3 GB free, and my hand-run gate check wrote the low-disk note. The gate stays closed until 20 GB.

**Odalys:** Then T-1050 keeps waiting on the 20 GB line in xc.sh. Every full Xcode run is red since midnight, so nothing can be trusted until the date test is fixed.

**Idris:** The fix for T-1051 is on <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>/a at 8d14163f. It has not been run yet, and I will not run it while the disk is this low.

**Odalys:** Agreed. I will not queue another Simulator run until the gate opens. That is my call, and I will say so on the board.

**Idris:** I will note the 9.3 GB reading on T-1051 so nobody reads the closed gate as a fault in the build.
{% endraw %}
