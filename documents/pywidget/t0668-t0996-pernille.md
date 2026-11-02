---
layout: "default"
title: "T-0996: review of T-0668 at 3a77d37e (Idris)"
section: "documents"
description: "Verdict: PASS. L1 and L4 are fixed and tested, L3 is written down. One routing gap (L2) and one residual Low."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0668-t0996-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0668-t0996-pernille.md</code></span></div><h1>T-0996: review of T-0668 at 3a77d37e (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-02. Author: Idris. Independent read (Commandment 13). I wrote the T-0666 re-review
these Lows came from (t0355-projects-review-pernille.md); I did not write the fix.

**Verdict: PASS.** L1 and L4 are fixed and tested, L3 is written down. One routing gap (L2) and one residual Low.

## What the line asked

T-0666 Lows: L1 next-launch note can name a copy another window renamed or deleted; L3 an inactive moment moves the
editor to the copy (write it down); L4 save-all in `renameProjectFile` untested. L2 ("app" in the recovered line)
to Maren for wording.

## Checked

1. **L1, stored note.** `noteMoved` (PyWidgetApp.swift, after `recoveredLine`) rewrites the shared UserDefaults list
   once per move, called by the window that moved: `renameProject`, `deleteProject`, `renameProjectFile`,
   `deleteProjectFile`. Folder case matches the prefix `head + old folder + "/"`, so `p` does not catch `pp/`. File
   case matches the whole line built from the old URL. Delete drops the line; an emptied list removes the key.
2. **L1, each window's own line.** `projectMoved` and `projectFileMoved` mend `recoveredNotice` the same way, so
   `sceneBecameActive` still finds and removes the stored line (tests assert the key is gone after B comes back).
3. **Mutants by reading.** Remove `noteMoved` from rename-file or delete-file or delete-project: one test red each.
   Remove the `recoveredNotice` mend in `projectMoved` or `projectFileMoved`: the `sceneBecameActive` assertion goes
   red. Remove the save-all loop from `renameProjectFile`: `testRenameProjectFileSavesEveryWindowFirst` red, since
   window 2's unsaved text reaches the file only through that loop (my L4 probe, now a test).
4. **L3.** project-save.md section 7 states the behaviour and why. Matches what I asked.
5. **Green.** All four `ProjectNoteFollowsMoveTests` passed in ops/runs/xcodebuild-20261102-093615.log (test case
   lines only).
6. **Host suite.** `run_host.py --both` at HEAD 462dc137 (no Python touched; land:host floor only).

## Findings

**L1 (Low, routing). L2 never reached Maren.** The T-0668 line says "L2 (recovered line says 'app') goes to Maren
for wording", and no board line carries it. The line "A save was refused when the app left the screen" still ships
against the T-0506 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>. Fix line T-1115 for Maren. When she changes the wording, notes stored by an older build
keep the old head and will not follow a later move; harmless (one launch), but worth a sentence in her change.

**L2 (Low, residual, optional). Moves outside the four model methods still leave the note stale.** A user script
(Python in the app can reach the Projects folder) or a future Files-app path that renames or deletes the copy
bypasses `noteMoved`; the next launch names a file that is gone. No text is lost. My T-0666 note offered the
fallback: at launch (SceneFile.swift:47) say a stored line only if its `folder/file` exists under the projects root.
Not filed; Idris's call.

Fix line: T-1115 (Maren, P3), L1 (the T-0666 L2 wording).
{% endraw %}

</div>
