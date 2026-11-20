---
layout: "default"
title: "T-5252: the prompt for a Mac mini session that carries out the trim"
section: "documents"
description: "Your word: by sending this message we pause, for the length of the trim, our 11-17 9:20 PM ruling that a bottleneck automatically opens a big-picture fix task, and our 11-08 rulings that process tasks go first. [Delete\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/t-5252-mac-mini-prompt.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>ops/plans/T-5252-mac-mini-prompt.md</code></span></div><h1>T-5252: the prompt for a Mac mini session that carries out the trim</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-11-20; revised by the Operator 2026-11-20 for an Investor #325 c7032478115 and c7032577205 (areas follow
the work, accounts, no fixed numbers where a signal can decide, reports and Investor issues kept). For an Investor
to paste into a Claude Code session they start on the main account in the main checkout on the Mac mini
(`[local folder]`). It counts only when an Investor sends it (charter 57). The paragraph marked
"Your word" is a choice.

```
You are carrying out T-5252: trimming the company's system to the target in
ops/plans/T-5252-target-system.md. You run on the main account, in this main checkout.

0. Bring in the brief. The page and this prompt are on lane a2's branch, not yet on main:
   git checkout personal/a2 -- ops/plans/T-5252-target-system.md ops/plans/T-5252-mac-mini-prompt.md
   Commit those two files by path. Read the page in full. Your checklist is its twelve board lines,
   T-5254 to T-5265 ("Trim step 1" to "Trim step 12", each "Links: part of T-5252"). Work them in
   order, respecting each line's "after". Step 10 (T-5263) is the same work as T-5247 part 2: do
   them as one. Use subagents for independent parts inside a step; never run two steps that touch
   the same files at once. Sign commits as Odalys.

1. Keep everything. Delete no file, ref, branch, board line, record or rule. A part that leaves
   the system is retired: switch it off or stop calling it, then git mv it to the same path under
   retired/, with one row in retired/MANIFEST.tsv (path, step, switch-off commit, why, how to
   restore). Step 2 writes tools/retire.sh for this, with --restore. Touch log/, story/, reports/,
   ops/runs/ and ops/metrics/ only to add rows. Board lines are held or closed, never removed.
   Handbook rules are retired with tools/ruling_record.py.

2. Keep the Investors informed the whole time. These stay on and are never paused:
   - the Investor inbox: every message answered once and recorded;
   - the morning and evening reports, built and checked as now (report_check.py);
   - Investor issues: request cards, Urgent Requests, Emergencies and the watchdog heartbeat;
   - the site's Home page.
   Before you retire anything a Home panel or a report section reads, move it to its new source,
   as the page's Home section lists. Only retire a panel about retired machinery, with a note on
   Home. Post a short note in this chat when each step finishes.

3. Decide by signals, not fixed numbers. Wherever the page or a step gives a fixed count, cadence
   or waiting period, replace it with a rule driven by a measured signal. Write the rule into the
   page and say what it reads:
   - Area sessions: start one for each area that has ready app work and usage left on its account.
     Add a session when ready app work waits while an Xcode machine (Mac mini or MacBook) sits idle.
     Drop one when sessions spend more time waiting on Xcode or merges than working. Check this
     whenever those signals change, not on a timer.
   - Areas: the three on the page are a starting split. Re-cut them whenever the ready app work
     shifts: an area with none hands its session to the one with the most, and areas split or merge
     as the work needs. A feature that fits no area goes to the area owning most of its files, and
     that session owns it end to end. Work that needs another area's work names it ("needs T-X"); the
     owning area does that piece first, and the waiting session takes other ready work meanwhile.
   - Accounts: the main account has about twice the usage of each personal account. It runs this
     trim, then the Builder area (the critical path to the firm date). The two personal accounts run
     the other areas. Once the trim is done, give any account with usage to spare to the area with
     the most ready work.
   - A step's check: instead of "for 24 hours" or "for 48 hours", a step is confirmed when its check
     passes on the real traffic it changes. For example, the next merges through the new merge
     script, the next Investor message answered, the next morning or evening report built and
     checked, the next heartbeat. Say which events confirmed it.
   - Measuring before and after: compare windows of equal length, using the page's commands.

4. While you run, the task queue's process work is paused. Step 1 switches off its process kinds in
   the hand-out first, so nothing lands into files you are retiring. App work goes on. Freeze new
   process features: no new tool, suite or [tools]/[measure] line except these steps and fixes to
   something broken.

   Your word: by sending this message we pause, for the length of the trim, our 11-17 9:20 PM
   ruling that a bottleneck automatically opens a big-picture fix task, and our 11-08 rulings that
   process tasks go first. [Delete this paragraph if you do not want that; the session then asks
   before step 1.]

5. Limits that do not move. Charter sections 6, 7 and 11, the bans and the three gates stay exactly
   as they are: nothing illegal, no high-risk area, no human check, no spending, no outreach, no
   AI-made images or audio, true records. Do not weaken or retire any guard in rules/hooks/, or
   tools/ssd_guard.py, tools/main_folder_guard.py, tools/terms_guard.py or tools/hooks/pre-commit.
   Investor-owned files (CLAUDE.md, rules/, setup/, investors/, .github/, the Claude Code settings)
   change only with our word in this chat or as a proposal through the applier. Ask us here for
   each one, naming the file and the change. A refusal by a guard or hook stops that item: do not
   reword it or route around it; tell us.

6. After every step: tests/guard_test.sh and the other guard suites, and tests/run.sh --fast, must
   pass before the next step. Run Xcode only through tools/xc.sh. Run the step's own check from its
   board line. Add "Step N done:" with the date, commit, evidence and the events that confirmed it
   to the page's Progress section. Commit by path (never git add -A), and tick the line with
   python3 tools/board_tick.py and a done-note. If a check fails: stop, restore what the step
   retired (retire.sh --restore), and tell us what failed.

7. Stop and ask us if anything would need a real deletion, spending, or a change to the limits
   above. When step 12 is done, post the before-and-after figures here and on #325.
```
{% endraw %}

</div>
