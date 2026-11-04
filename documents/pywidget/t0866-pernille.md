---
layout: "default"
title: "Review T-1904: T-0866 slice 1, ProjectSendPlan (1c955ed79, Idris)"
section: "documents"
description: "Verdict: approve with changes. The rule is small, pure and mostly right. Exclusions, the main.py placement, renames of the widget file, removals inside packages and the refusals all do what the design says, and the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0866-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t0866-pernille.md</code></span></div><h1>Review T-1904: T-0866 slice 1, ProjectSendPlan (1c955ed79, Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-04. Independent review (Commandment 13) against pywidget/docs/design/ide/project-save.md s1 cases 1-3 and s2 items 2-4. I read the diff and the code it names, not the author's notes.

**Verdict: approve with changes.** The rule is small, pure and mostly right. Exclusions, the main.py placement, renames of the widget file, removals inside packages and the refusals all do what the design says, and the record round-trips at full precision. Two Medium findings (F1, F2) should land before WidgetScriptSave calls this (T-1905). Nothing calls it yet, so nothing ships with them.

## What I ran

- A scratch copy of HEAD's pywidget/ios (App, Shared, Core, Tests, Widget; HEAD contains 1c955ed79 and has not touched these two files since), `swift test --filter ProjectSendPlan` in Core, host only, one build.
- Author suite: **24/24 pass.**
- My 10 probes (`ProjectSendPlanProbeT1904Tests`, scratch only, not committed). Each one prints what the plan does:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran, scrolls sideways" data-n="1" style="--tw:699px" markdown="1">

| Probe | Input | Plan says |
|---|---|---|
| P1 | last send's project, plus a link `pkg/out` | refusal `link("pkg/out")`, **changed = false** |
| P2 | `helper.py` becomes a link | refusal link, changed true, removals [] |
| P3 | `/etc/x.py`, `pkg//a.py`, `../up.py`, `pkg/./b.py` | copies `/etc/x.py`, `pkg//a.py`; the other two dropped silently as hidden |
| P4 | `record(sentAt:)` on a plan refused for `tree.json` | widget `""`, list `[tree.json, w.py]` |
| P5 | same paths, sizes and dates (two files swapped by renames) | changed false |
| P6 | `café.py` NFC to NFD | changed false, no removal |
| P7 | `helper.py` and `Helper.py` both in the project | both copied, no refusal |
| P8 | record carried `ext.marker`; the person deletes it | **removals `["ext.marker"]`** |
| P9 | widget file `.w.py`, top-level `Main.py` | `.w.py` goes as main.py; `Main.py` stays out |
| P10 | mtime moves backwards | changed true |

</div>


- Mutants: I did not re-run `tools/mutation_check.py`, because the packet allows one swift build on this loaded machine. The 25 seeded mutants cover every branch of `place` and `make`. None of them covers F1 or F2, because no test exercises those inputs.

## Data loss: can the plan remove a file the person still has?

From the project: never. The plan reads a listing and returns names; every removal is a destination in widgets/<id>/. Sibling removals are what the last send carried and this one doesn't (P2, the package test, the rename tests), and the widget file's own rename removes nothing. The one route to a wrong removal is F2: a removal that names a file the widget folder keeps for itself.

## Findings

### F1 (Medium): a link added to an unchanged project is refused with `changed == false`

`list` <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> files only (line 117 skips links after setting the refusal), so a link is invisible to the change signal. P1: same files as the last send plus a link gives `refusal = .link`, `changed = false`. s2 item 2 tells the caller to send only when the list differs. If it does, the person never sees the word, and no later boundary retries the send. The doc comment (lines 8-9) and the message in `testLinkIsRefusedByName` ("a refused widget's list still differs") are true in that test only because its listing also drops `pywidget.json`.

Fix: carry links in the change signal (put `.link` entries in `list`, or force `changed` to true whenever there is a refusal), and test the case where the link is the only difference.

### F2 (Medium): removals are not fenced off from the widget folder's own names

Line 141 turns every `.goes` destination on the last record that this send doesn't carry into a removal, with no check against `runFileNames` or `main.py`. There are two routes to deleting a run file:

- P8: a record written before a name joined `runFileNames` (the list will grow; `state.json` is already reserved for S7 state code). If the person deletes or renames that project file, the plan tells the caller to remove `ext.marker`, or whatever the name is, from widgets/<id>/.
- P4: `record(sentAt:)` on a refused plan returns `widget: ""` and the refused `tree.json` in `list`. Written as `.sent.json`, it makes the next send remove `tree.json`, and also `w.py`, because `place` with an empty widget file never maps it to main.py.

T-0906's staging clones the old folder to keep `tree.json`'s date (s2 item 5). With that clone in place, the caller would delete the widget's last picture.

Fix: a removal never names a top-level `runFileNames` key or `main.py`. `record` is unavailable on a refused plan (it returns nil or traps). Test both routes.

### F3 (Low): the run-file-names test checks the list against itself

`testRunFileNamesHoldEveryNameTheWidgetFolderKeeps` checks `runFileNames` against the same constants it was built from, so a new writer into widgets/<id>/ would not fail it. s2 item 4 asks for "a test that every name written to `widgets/<id>/` is in it". My sweep at HEAD found no name missing. The writers are `tree.json` (a bare literal in RunResultSink.swift:116 and WidgetInstallView.swift:41), `status.json`, `render-fault.json`, `state.lock`, `ext.marker`, `lane-peak` and `lane-refused`; `.sent.json` and atomic-write temporaries are hidden. `runs.jsonl`, `console.*`, `run.marker` and `faulthandler.txt` live elsewhere (log/widgets/<id>/, Caches). The widget <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> sets `dont_write_bytecode`.

Fix: name `tree.json` once (one constant used by its writers), and have the test drive the Core writers into a temporary widgets/<id>/ and check that every top-level name left there is in `runFileNames` or hidden.

### F4 (Low): destinations are the raw listed path

P3: `/etc/x.py` and `pkg//a.py` come out as given, while `../up.py` and `pkg/./b.py` are dropped as if they were hidden files. WidgetScriptSave builds paths with `appendingPathComponent`, which is safe. `URL(fileURLWithPath:relativeTo:)` would escape on a leading `/`, and a later listing spelled `pkg/a.py` gives the same file under a second name.

Fix: build the destination from `parts.joined(separator: "/")`, and refuse an entry with a leading `/`, an empty part, `.` or `..` by name. That is a lister bug, not a hidden file.

### F5 (Low): case-insensitive disks

(a) P7: a case-sensitive project (iOS APFS, or Files) can hold `helper.py` and `Helper.py`. Both go, and on a case-insensitive destination one silently replaces the other. Refuse the second by name on a `key` collision, as ProjectStore.nameKey already does for new files.

(b) The case-only rename is right only if the caller removes before it copies (lines 14-15). That order is stated in a comment and checked nowhere. Return one ordered operation list, or carry a caller-side test in T-1905 on a case-insensitive host folder.

### F6 (Low): the change signal misses a swap of two same-size, same-date files

Renames keep mtime. Two same-size files swapped by renames, or one replaced by a copy that keeps its mtime (zip import at the 2 s DOS granularity, `cp -p`), keep path, size and date, so P5 reports no change. Clock moves are fine: the test is inequality, not newer-than (P10). The precision is fine as well: a Double holds about 238 ns at 1.8e9 s, and APFS records ns.

Fix: add the status-change time (`attributeModificationDate`, st_ctime, which moves on rename and on every write) to `Entry`, or the file identifier.

## Notes, no line

- P6: an NFC to NFD rename is no change and no removal, because Swift `String ==` is canonical equivalence. This is harmless on APFS, which is normalization-insensitive.
- P9: a top-level `Main.py` stays out by key. On case-sensitive iOS, `import Main` works in Run and fails on the widget. It is rare, and the exclusion is right for case-insensitive hosts.
- The `link` and `missingScript` messages are this slice's draft wording, for Maren (<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>), as the code says.
{% endraw %}

</div>
