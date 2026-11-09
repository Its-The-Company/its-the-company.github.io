---
layout: "default"
title: "Review: T-3323 (343724ece, Idris), upload.sh&#x27;s export folder left out of the dirty check"
section: "documents"
description: "PASS with fixes. The path build 4 takes is right: gate_session_build.sh --testflight passes no --out, so the export folder is ops/runs/export-&lt;ts&gt;/ in the clone, it is left out by its exact literal path, and every\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3323-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3323-pernille.md</code></span></div><h1>Review: T-3323 (343724ece, Idris), upload.sh's export folder left out of the dirty check</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, T-3495, 2026-11-09. Independent review (Commandment 13), release standard.
Read: `git show 343724ece` (tools/upload.sh, tests/upload_test.sh, tests/upload_mutants.json), the whole of
tools/upload.sh at main 66ac4d5b8 (no later commit touches it or its test), pywidget/ios/scripts/gate_session_build.sh:24,
the writes tools/xc.sh makes into its own checkout, and the folder references in PyWidget.xcodeproj.

## Verdict

**PASS with fixes.** The path build 4 takes is right: `gate_session_build.sh --testflight` passes no `--out`, so the
export folder is `ops/runs/export-<ts>/` in the clone, it is left out by its exact literal path, and every sibling
still trips the check. Neither Medium below is reachable on that path; both need a hand-given `--out` inside the
checkout. Build 4 may go from a fresh clone. Fix M1 and M2 before anyone gives `--out` inside a checkout.

Counts: High 0, Medium 2, Low 3.

## What I ran (scratch /private/tmp/company-scratch/T-3495-pernille, host only, stand-in xc.sh, no Xcode, no network)

- `tests/upload_test.sh` under /bin/bash 3.2.57: **PASS 124, FAIL 0** (88 s), all 8 T-3323 cases included.
- The 5 T-3323 mutants through tools/mutants.py: **5 of 5 killed**.
- `probe/probe.sh` and `probe/probe2.sh` (my own, same stand-in shape: GitHub-origin main, a clone with tracked
  `ops/runs`, `src`, `pywidget/ios/App/Runtime`, the company .gitignore). Results, `rc` of an `--internal --upload` run:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: What I ran (scratch /private/tmp/company-scratch/T-3495-pernille, host only…, scrolls sideways" style="--tw:776px" markdown="1">

| Probe | Result | Verdict |
|---|---|---|
| `--out "ops/runs/ex [1]* a"` (spaces, glob characters), nothing else changes | rc 0 | ok |
| same, sibling `ex [1]* ab` written during the archive | rc 2, "changed during the archive" | ok |
| same, sibling `ex 1 a` (what the glob would match) | rc 2 | ok |
| trailing slash, write to `<out>/../evil` | rc 2 | ok |
| `--out` spelled `ops/runs/../runs/./dd//` | rc 0 | ok |
| relative `--out runs/rel`, run from `ops/` | rc 0 | ok |
| `--out` = repo root; `--out` = its parent | rc 2, "not empty", 0 xcodebuild calls | ok |
| `--out` outside, a symlink into the clone | rc 0 (the folder written is the one left out) | ok |
| `--out` a symlink in the clone pointing outside | rc 2 before the archive (untracked link) | ok, fails closed |
| `--out newdir/exp` in a new untracked folder; plus `newdir/evil` written | rc 0; rc 2 | ok |
| project in a subfolder (`pywidget/ios`), tracked change in `src/` during the archive | rc 2 | ok |
| `git rm -r src` (staged), `--out src` | **rc 0, 2 calls** | **M1** |
| `git rm -r --cached src; rm -rf src`, `--out src` | **rc 0, 2 calls** | **M1** |
| `--out pywidget/ios/App/Runtime/x`, `sitecustomize.py` written there during the archive | **rc 0, 2 calls** | **M2** |
| refused runs (no `--scheme`, project not found, dirty clone, bad team, archive not found) | each leaves an empty export folder | L1 |
| `--out` typed `OPS/runs/cs` on case-insensitive APFS | rc 2 only **after** the archive | L2 |

</div>


bash 3.2 expansion of the status pathspec (upload.sh:122): with `OUT_X=()`,
`${OUT_X[@]+-- :/ "${OUT_X[@]}"}` gives 0 arguments (status runs exactly as before T-3323); with one element holding
two spaces, `*`, `[c]` and `?`, it gives exactly `--`, `:/`, and that element whole, unglobbed, even with the
current directory at `/`. `:/` keeps the status whole-tree when the project is in a subfolder. No finding.

## Findings

### M1 (Medium): a staged deletion under `--out` is hidden. The tracked-files guard reads the index, not HEAD

tools/upload.sh:147. `git ls-files -- ":(top,literal)$rel"` lists the index. When the folder's tracked files are
deleted *and the deletion is staged* (`git rm -r src`, or `git rm -r --cached` plus `rm`), the index holds nothing
there, the guard passes, and the `:(exclude,literal)src` pathspec then hides `D  src/...` from both statuses.

Failure scenario: in a clone, `git rm -r pywidget/ios/SomeFolder`, then `upload.sh --project ... --internal --upload
--out pywidget/ios/SomeFolder`. The archive is built without that folder, PWSourceCommit and both ledger rows name
HEAD as a clean commit, and the build cannot be made again from the commit the ledger names. Probes P2a/P2b: rc 0, 2
xcodebuild calls. The suite's case (upload_test.sh, "an --out naming a folder of tracked files (deleted)") only
covers the unstaged deletion.

Fix: refuse when HEAD *or* the index has anything at that path, and do not swallow a git failure as "nothing":
```
t="$(git -C "$top" ls-files --with-tree=HEAD -- ":(top,literal)$rel")" || die "cannot list tracked files under $OUT"
[ -z "$t" ] || die "export folder $OUT holds files tracked in $top: ..."
```
(`ls-tree -r --name-only HEAD -- ":(top,literal)$rel"` as a second check does the same.) Test: both P2 shapes refused
with 0 xcodebuild calls. Mutant: the HEAD half of the check dropped.

### M2 (Medium): the exclusion covers any folder inside the checkout, including folders the build copies into the app

tools/upload.sh:142-149 (`case "$OUT_P" in "$top"/?*)`). The exclusion is safe only for a folder the build never
reads. PyWidget.xcodeproj has folder references copied verbatim into the bundle: `App/Runtime`,
`../widgets/premade/first-renders`, `../tests/bridge/fixtures` (project.pbxproj:359, 297, 48). Any new subfolder of
those is an acceptable `--out` today.

Failure scenario: `--out pywidget/ios/App/Runtime/x`. ExportOptions.plist (written at :181, before the archive) is
copied into the app's Runtime folder; anything another <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> or a build step writes there during the archive goes in
too, and the dirty check is <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> to all of it. Probe P3: a `sitecustomize.py` written there during the archive,
rc 0, uploaded under a clean hash. A Python file in the app's stdlib path, unreviewed, unrecorded, in a TestFlight build.

Fix: leave the folder out only where the default puts it, a direct child of `$top/ops/runs/`:
```
case "$rel" in ops/runs/*/*) return 0;; ops/runs/?*) ;; *) return 0;; esac
```
(`return 0` = no exclusion, so any other in-checkout `--out` fails closed at the first write, or refuse it up front
with "give an --out outside the source or under ops/runs/"). gate_session_build.sh passes no `--out`, so it loses
nothing. Test: P3 refused; mutant: the `ops/runs/` restriction dropped.

### L1 (Low): every refusal after line 135 now leaves an empty folder behind

tools/upload.sh:133-136. The default folder (and the whole `mkdir -p` chain of a given `--out`) is made before
`--project needs --scheme`, project not found, the tracked-files guard (which recreates the deleted tracked folder,
P4f), the dirty and origin/main refusals, archive not found, `read_build`, the internal-mark checks and the team id
check. Before 343724ece none of these made anything. Git never lists an empty folder, so no dirty check is affected;
it is litter in the main checkout's `ops/runs/` and in mistyped `--out` paths, and "refused" no longer means
"touched nothing". The `--archive` mode does not need the early folder at all.

Fix: note whether the script made it (`[ -e "$OUT" ] || MADE_OUT=1` before the mkdir) and in `die()`
`[ -z "${MADE_OUT:-}" ] || rmdir "$OUT" 2>/dev/null`; in `--archive` mode keep the mkdir where it was (after the team
check). Test: a refusal leaves no `ops/runs/export-*`.

### L2 (Low): the first status cannot test the exclusion, so a mismatch costs a full archive

tools/upload.sh:156 vs :181 and :207. At the first status the export folder is empty, which git never lists, so the
exclusion first matters after the archive. Seen: `--out` typed `OPS/runs/cs` on a case-insensitive volume; `pwd -P`
keeps the typed case, the literal pathspec does not match `ops/runs/cs/ExportOptions.plist`, and the run is refused
only after the archive (rc 2, 1 xcodebuild call, the archive left in `ops/runs/`). Fails closed, but slowly.

Fix: write ExportOptions.plist (lines 178-196) before the first `src_state`, so both statuses see the same tree and a
mismatch is refused in seconds with 0 xcodebuild calls.

### L3 (Low): a rerun from the same clone is refused by the previous run's export folder, and does not say so

A failed export (network, signing) leaves `ops/runs/export-<ts>/ExportOptions.plist` in the clone; the next
`gate_session_build.sh --testflight` there is refused "not a clean git checkout". That is the sibling rule working,
and it is right, but the message reads like someone else's edit. Fix: in the refusal at :157, if `git status` lists
only `ops/runs/export-*`, say "a previous upload.sh export folder: use a fresh clone"; or say "a fresh clone per run"
in gate_session_build.sh's header.

## Not covered by anything run here

The T-3323 gate case uses the stand-in xc.sh. I checked the real tools/xc.sh's writes into its checkout during an
archive: `ops/runs/xcodebuild-<ts>.log` and `ops/metrics/xc.jsonl` / `xc_route.jsonl`, all ignored by the company
.gitignore (lines 8, 127, 128), and the archive itself (`*.xcarchive`, line 43). Proof that a real Release archive
leaves the clone clean is the first real `--testflight` run; if it is refused "changed during the archive", the
refusal names the path.
{% endraw %}

</div>
