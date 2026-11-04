---
layout: "default"
title: "T-0963: suites seen red at clean HEAD"
section: "documents"
description: "governor 88/0, guard 496/0, personal_land 182/0, site_personal 207/0. personal_off 1 pass, 1 fail and personal_lane 1 failure, 2 skipped: only the two by-design rows. Raw output was in scratch; these counts are from it."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0963-red-suites-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0963-red-suites-odalys.md</code></span></div><h1>T-0963: suites seen red at clean HEAD</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-02, read at d358a841 before the fixes in this commit. Runs through `tests/run.sh` only. No Xcode, no
Simulator, no tick, no live account. Switch state read first: `personal_lane_a` and `personal_lane_b` both true.

## Red rows


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Red rows, scrolls sideways" style="--tw:1430px" markdown="1">

| Suite | Row | Commit that turned it red | Cause | What was done |
|---|---|---|---|---|
| governor_test | the week's overflow <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> used | a9a554fb, an Investor, 11-01 13:35 ET (`weekly_cap_usd` 50 to 200) | The row pinned the old cap | Already fixed, 607f3add. Green today: 88/0, n=3 |
| guard_test | the Investors' billing switch ships, with the caps | a9a554fb, as above | The row pinned `==50` | Already fixed, 2055e967. Green today: 496/0, n=3 |
| personal_land_test | a real tick lands a ready branch through the hook, on a tick with no session | 08e0c113, itsthecompany, 11-01 10:05 (guard_test row added) | Leftover, below | Fixed here |
| personal_land_test | a real skip tick with a red branch leaves no more dirty than one without | 08e0c113 | Same | Fixed here |
| personal_land_test | a pause set before the tick holds the landing back | 08e0c113 | Same | Fixed here |
| personal_lane_test | Inert.test_no_running_path_names_the_lane | bcbba40d, Odalys, 11-01 18:46 (then dba5aade, d98a9e8e, d6928f04) | Real row, mine, three times. Tools named the tick, none starts it | Fixed here |
| site_personal_test | the real file's bytes: name and on for b leave every other key as it was | 32b5d092, an Investor, 11-01 21:10 (b turned on) | Test defect: read live Investor bytes | Fixed here |
| site_personal_test | the real file's bytes: the <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span>'s reader sees b on and a as it was | 32b5d092 | Same | Fixed here |
| personal_off_test | no account key reads true in the file this tree holds | b9566c53, an Investor, 11-01 12:26 (a turned on) | By design, t0880-<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span>-line-2 L5 | Left red, not a defect |
| personal_lane_test | Inert.test_billing_file_holds_no_true_switch | b9566c53 | By design, L5 | Left red, not a defect |

</div>


## Causes

1. personal_land_test (n=2 red in order, n=2 green without guard_test first, n=1 green after the fix). It is not the
   temporary checkout. It reproduces here. guard_test line 439 makes an empty `$HOME/company-personal/a` in the shared
   `$T/home`. personal_land_test copies that home into its tick folder, and `personal_land.sh setup a` refuses a path
   that exists and is not a worktree. Pairs at d358a841: governor then land 182/0; guard then land 179/3; land alone
   182/0. Any full run in SH_ORDER had it. Fix: guard_test removes the folder after its rows.
   08e0c113 is named by reading (`git log -S`), and only guard_test makes the folder in the shared home. The other suites that name it set their own HOME. The suite was not run at that
   commit's parent.
2. My note of 11-01 said 4 land rows. Today's reading is 3, twice. I can't name the fourth. Nothing read today shows it.
3. test_no_running_path: its third grep goes red when a tool names the tick. Three do: a comment in tools/disk_free.py,
   a comment in tools/personal_land.sh, and tools/site/running.py, which reads the tick's logs and `ps`. Starting it is
   the thing the row guards, so an exclude alone would weaken it. The three are now excluded from the name grep, and a
   new check says no line of theirs that names the tick holds a word that runs something, with a control that the
   pattern fires. This is a judgment call on a row meant to go red on purpose. Ines can overrule it.
4. site_personal_test real_bytes: `confirm` turns b on, but b was already on in the live file, so the click turned it off.
   The stand-in now starts from the real bytes with b off. The live file is only compared. One new row pins that start.
5. The two by-design reds hid a real one. personal_lane_test read red for a known reason from 11-01 12:26, so nobody
   looked when a second row went red at 18:46. Failure count by row is the check, not the suite's colour.

## After the fixes (n=1, this tree, read before 04:51 ET)

governor 88/0, guard 496/0, personal_land 182/0, site_personal 207/0. personal_off 1 pass, 1 fail and
personal_lane 1 failure, 2 skipped: only the two by-design rows. Raw output was in scratch; these counts are from it.

## Open, no line raised

- While a switch is on, personal_off_test stops before section 2, so the tick's stand-in rows have not run since
  11-01 12:26. 10 commits changed tools/personal_tick.sh in that time. The chair accepted this cost in L5. It is Ines's to
  reopen.
- One guard refusal, between 04:27 and 04:28: my own command chained a listing of the home folder's Claude paths onto
  the switch read. The guard named the lane's profile. Nothing ran. No suite needed that listing and it was dropped, not
  retried. The chair line and the switch value were then read as separate plain reads, which the task asks for.

## Not run

The full `tests/run.sh`. Only these six suites ran, in order.
{% endraw %}

</div>
