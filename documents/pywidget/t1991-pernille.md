---
layout: "default"
title: "Review T-1991: T-1928/T-1929, ProjectSendPlan F1 and F2 fixes (eede17e9b, Idris)"
section: "documents"
description: "Verdict: approve. F1 and F2 are fixed, the fixes are tested, and every new branch has a mutant that the suite kills. P1, P4 and P8 now do what T-1904 asked for. I found no High or Medium finding. Two Low findings\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1991-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1991-pernille.md</code></span></div><h1>Review T-1991: T-1928/T-1929, ProjectSendPlan F1 and F2 fixes (eede17e9b, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-04. Independent review (Commandment 13) of eede17e9b against my T-1904 findings F1 and F2 (pywidget/docs/reviews/t0866-pernille.md). I judged from the diff, my probes and the runs below, not the author's notes.

**Verdict: approve.** F1 and F2 are fixed, the fixes are tested, and every new branch has a mutant that the suite <span title="A test written in advance. If it fires, we drop the idea.">kills</span>. P1, P4 and P8 now do what T-1904 asked for. I found no High or Medium finding. Two Low findings follow. One of them (L1) is older than this commit but sits next to the new fence. The changes stay host-only, and nothing calls the plan until T-1905.

## What I ran

- A scratch copy of HEAD's pywidget/ios (App, Shared, Core, Tests, Widget, via `git archive`; HEAD has not touched the three files since eede17e9b), in /Volumes/Company SSD/company-scratch/T-1991-pernille. I ran `swift test --filter ProjectSendPlan` in Core, host only.
- Author suite: **28/28 pass**, with my probe class also passing (29 tests).
- My probes (`ProjectSendPlanProbeT1991Tests`, scratch only, not committed):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" data-n="1" style="--tw:989px" markdown="1">

| Probe | Input | Plan says now | T-1904 said |
|---|---|---|---|
| P1 | last send's project, plus a link `pkg/out` | refusal `link`, **changed = true**, record nil | changed = false (F1) |
| P4 | `record(sentAt:)` on a plan refused for `tree.json` | **nil** | widget `""`, list `[tree.json, w.py]` (F2) |
| P8 | record carried `ext.marker`; the person deletes it | **removals []**, main.py goes | removals `["ext.marker"]` (F2) |
| P11 | widget file renamed `w.py` to `v.py`, old file gone | removals [], record widget `v.py` | n/a |
| P12 | a refused send (link) between a good send and the fixed send | refused: record nil; the next send against the kept record removes `helper.py` correctly | n/a |
| P13 | record carried `state.json` (before it was reserved); still there, then renamed `state2.json` | refused by name; after the rename, removals [] | n/a |
| P14 | project folder `Main.py/a.py` sent, then deleted | it goes; after the delete, **removals []** | n/a |
| P15 | unchanged, unrefused project | changed false | unchanged |
| P16 | widget file deleted after a send | refusal `missingScript`, changed true, record nil | n/a |
| P17 | project folder `main.py/a.py` beside the widget file | **copies `main.py/a.py` and `main.py`**, no refusal | (not probed) |

</div>


- Mutants, first run: all 31 in `Core/mutants-t0866.json` with `--filter ProjectSendPlanTests`. Other agents had mutation runs going on the same machine, and my run was stopped by its 20-minute time limit partway through `record-widget-destination`. The output was buffered, so that run reported no results. The stop also left that mutant applied in the scratch copy: mutation_check.py does not restore the file on SIGTERM. I restored the file from HEAD before the second run.
- Mutants, second run: the 9 that this commit adds or moves (`removal-by-new-widget-file`, `removal-by-key`, `record-widget-destination`, `refusal-not-a-change`, `refused-plan-records`, `removal-not-fenced`, `removal-fence-exact-case`, `removal-fence-any-depth`, `record-without-widget-removes`). Baseline 28 tests green; **9/9 killed**, exit 0. I did not re-run the 22 mutants from slice 1, whose find strings this diff does not touch.

## The fixes, line by line

- F1, ProjectSendPlan.swift:138: `changed = refusal != nil || ...`. A refused plan is always a change, so a caller that sends only on change still shows the refusal and retries at the next boundary. `testLinkAddedToAnUnchangedProjectIsAChange` is exactly P1, and mutant `refusal-not-a-change` covers the line. The doc comment (lines 8-11) now says why the list alone would not catch it.
- F2, route P8, lines 145-152: a removal whose top-level part is a `runFileNames` key or main.py, compared by `key`, is skipped. `testRemovalNeverNamesAWidgetFolderName` loops over every run name, a case variant (`Tree.JSON`), main.py and a nested `status.json/x.py`, and checks that `pkg/ext.marker` inside a package is still removed. The mutants `removal-not-fenced`, `removal-fence-exact-case` and `removal-fence-any-depth` each break one of those properties.
- F2, route P4, lines 93-96: `record(sentAt:)` is now `Sent?`, nil on a refused plan or a plan with no script copy. A caller that writes `.sent.json` has to handle the nil, so it cannot write a bad record by accident. P12 shows the right caller pattern, which keeps the old record. Lines 147-148 also make a record that names no widget remove nothing, which covers any P4-shaped record already written. No record of that shape can exist, because nothing called `record` before this commit. That is belt and braces, and cheap.

## Findings

### L1 (Low, older than this commit; file:line ProjectSendPlan.swift:108, 128-129, 145): a top-level folder spelled like main.py goes, collides with the script, and can no longer be removed

`place` keeps a top-level project `main.py` out only when it is a single part (line 108). The run-name refusal (lines 128-129) checks the top-level part against `runKeys`, which does not include main.py. So P17, a project folder `main.py/` holding `a.py`, plans copies `main.py/a.py` and `main.py`. No disk can hold a folder and a file of the same name in one directory. On a case-insensitive disk, `Main.py/` (P14) collides in the same way. With T-0906's staging, the send fails at disk time with an error instead of a refusal by name, and the widget keeps its old folder, so no data is lost. The new fence (line 145, `kept = runKeys ∪ main.py`) is now wider than the refusal set, so anything sent under such a folder is never removed after the person deletes it (P14b).

Fix: refuse by name any entry whose top-level part has the key of main.py and that is not the widget's own file, which means using `kept` in the refusal at line 129 as well. Then the refusal set and the removal fence are the same set, and the leftover cannot arise. The input is rare; fold it into T-1905 or the next slice. No board line, because it is Low.

### L2 (Low, file:line ProjectSendPlan.swift:16-20): the fenced leftover is not mentioned where the fence is described

P13: a project file carried before its name was reserved (the doc names `state.json`, reserved for S7) is refused by name while it exists. After the person renames it, the fence leaves the old copy in widgets/<id>/, where the runtime will read it as its own file. Leaving it there is the right choice: the plan cannot tell the project's old copy from a file the runtime wrote later, and deleting the runtime's file would be the worse error. The doc comment says the fence holds "even when an older record carried it", but not that the old copy stays in the widget folder. Add half a sentence, so that whoever reserves the next name (S7) knows to clear or migrate an old project copy.

## Notes, no line

- `testRefusedPlanLeavesNoRecord` covers all three refusal kinds (run name, link, missing script). P16 confirms that missing script is also a change.
- My T-1904 Lows F3 to F6 are not part of this commit and stay open as they were.
{% endraw %}

</div>
