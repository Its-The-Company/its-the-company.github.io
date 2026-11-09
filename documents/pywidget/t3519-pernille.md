---
layout: "default"
title: "T-3546: review of T-3519 (18a9d73e1, Odalys), the main gate&#x27;s derived test reads"
section: "documents"
description: "Verdict: FAIL, fixes needed. The idea is right and the 12 fixture paths it finds are real reads. But the scan misses whole classes of input that a red build or red unit run depends on. One of them is the licence\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t3519-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 19 · Mon Nov 9</span><span><code>pywidget/docs/reviews/t3519-pernille.md</code></span></div><h1>T-3546: review of T-3519 (18a9d73e1, Odalys), the main gate's derived test reads</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-09. Commandment 13: I read the commit and the code, not the author's notes.
Scope: `tools/main_gate.py` `test_reads()`, `WRITTEN`, and the four T-3519 cases in `tests/main_gate_test.py`.
No Xcode, no Simulator, nothing on the SSD. The scratch area fell back to `/private/tmp/company-scratch/T-3546-pernille`
(scratch.py: the SSD did not answer). Every probe ran in a `git clone --shared` of main at 993e57b38 under that folder.
The probe scripts are `probe1.py`, `probe2.py` and `mutants.py` in that folder. Nothing on main changed except this file.

Verdict: **FAIL, fixes needed.** The idea is right and the 12 fixture paths it finds are real reads. But the scan misses
whole classes of input that a red build or red unit run depends on. One of them is the licence registry, and a
fixture-only change to it goes onto main with no check at all, which is exactly what happened on 11-08.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" data-n="1" style="--tw:444px" markdown="1">

| # | Severity | Finding |
|---|----------|---------|
| H1 | High | Reads the scan cannot see: a fixture named only by its file name, and repo files the build phases reach through a variable or a tool's constants |
| M1 | Medium | The read set comes from the working copy, but the hook keys the staged tree, so another worker's unstaged edit decides what is gated |
| M2 | Medium | A `"../x"` literal in a path-refusal test pulls repo-root names into the key; one stray untracked file changes every key. The filter that stops it has no test |
| L1 | Low | The `"://"` skip is dead code, and the URL case in the test passes because of the regex, not the skip |

</div>


## Answers to the three questions

1. **Yes, the scan misses reads, and here are concrete ones.** See H1. `PremadeSnapshotTests.testClocksSmallDrawsTheWidestPairWhole` reads
   `pywidget/tests/widgets/fixtures/clocks-widest.json` as
   `Self.fixtures.deletingLastPathComponent().appendingPathComponent("clocks-widest.json")`. That path is built from
   parts and has no slash literal. The build reaches another set of files through `$REPO` or through a Python tool's
   constants.
2. **No other write-only path got in.** I checked all 13 derived entries against the Swift tests. Every one is read
   (with `Data(contentsOf:)`, a directory listing, or as a bundle resource from project.yml). The tests' other writes
   go to `ops/site-checks/{renderer-v1,widget-card,premade-snapshots}`. Those resolve outside every base the scan tries,
   so they are not keyed. That is correct. One note that predates T-3519 and is not a finding:
   `GalleryModesSnapshotTests` writes `pywidget/docs/design/t0039-gallery-modes`, which has been in the base set since
   T-3288. The write is opt-in (`TEST_RUNNER_T0039_DUMP=1`) and does not happen in the gate's unit run.
3. **Stale reuse: yes (M1). Needless reruns: yes (M2, and M1 in the other direction).**

## H1 (High): reads the scan cannot see

The scan finds `../` literals in project.yml and in the scripts it runs, and Swift string literals that contain a
slash. That misses three kinds of read.

- **A Swift path built from parts.** `pywidget/tests/widgets/fixtures/clocks-widest.json` (PremadeSnapshotTests,
  line 188). The unit test asserts that "24:45h" and "Wed" are drawn from that file's tree, so a bad edit to the
  fixture turns PyWidgetTests red.
- **The build reaching the repo root through a variable.** `scripts/install_packages.sh` (the "Install Python
  packages" phase, which runs in every configuration) sets `REPO="$PROJECT_DIR/../.."` and runs
  `STAGE="$REPO/tools/pkg_stage.py"`. `UP_REF` matches `../..`, `_existing` drops it as `.`, and
  `$REPO/tools/pkg_stage.py` has no `../`. pkg_stage.py fails the phase on licence (3), denylist (4), binary (5) and
  size (6), and it imports `tools/pkg_verify.py`. Neither file is keyed.
- **What a keyed tool reads.** `tools/acknowledgements.py` is keyed, but the "Acknowledgements check" phase reads its
  constants: `pywidget/licenses/components.json`, `notices/`, `audit.json` and `upstream/`. None of `pywidget/licenses`
  is keyed.

Probe (`probe1.py`, clone at 993e57b38): for each file, append a line, stage it, key the staged tree and run `cmd_hook`
as a non-Operator author.

```
pywidget/tests/widgets/fixtures/clocks-widest.json  in gated(): False; key HEAD 21ec7effca57 staged 21ec7effca57 same=True; hook exit 0
pywidget/licenses/components.json                   in gated(): False; key HEAD 21ec7effca57 staged 21ec7effca57 same=True; hook exit 0
tools/pkg_stage.py                                  in gated(): False; key HEAD 21ec7effca57 staged 21ec7effca57 same=True; hook exit 0
tools/pkg_verify.py                                 in gated(): False; key HEAD 21ec7effca57 staged 21ec7effca57 same=True; hook exit 0
```

Seeded mutant to show the registry decides a build: I set cpython's licence in `components.json` to `GPL-3.0-only`,
and `python3 -I tools/acknowledgements.py check` in the clone went from `ok` (exit 0) to `4 failures` (exit 1). That is
the same tool and the same failure kinds the build's last phase runs. So a commit that changes only the registry goes
onto main unchecked, and it reuses whatever verdict the unchanged key holds. That is the 11-08 failure again.

Fix, the owner's call: stop deriving these from text. The build phases call tools through variables, and the tools
read constants, so a static scan of project.yml cannot follow them. Add a reviewed `EXTRA_READS` (`pywidget/licenses`,
`tools/acknowledgements.py`, `tools/pkg_stage.py`, `tools/pkg_verify.py`) with a test that fails when a project.yml
script or a keyed tool names a `tools/` file or a `pywidget/` folder that is not keyed. For the Swift side, key the
data files under `pywidget/tests` (everything except `*.py` and `__pycache__`) and do not chase literals. A little
over-gating costs one MacBook run. Under-gating cost a day on 11-08.

## M1 (Medium): read set from the working copy, key from the staged tree

`gated()` → `test_reads()` reads the Swift tests and checks `os.path.exists` in the working copy. `cmd_hook` keys
`git write-tree`, which is the index. In this repository several workers share one checkout and commit with
`git commit <path>`, so the working copy routinely holds other people's unstaged edits.

Probe (`probe2.py`): commit a Swift test that reads `tests/probe/fixtures/case.json`, then stage a change to the
fixture.

```
A) staged fixture change, clean working copy:                      hook exit 1 (refused, as it should be)
B) same staged change, someone's unstaged edit drops the literal:  in gated(): False, hook exit 0
```

The same staged content is refused in case A and let through in case B, and the only difference is another worker's
unstaged file. It also fails the other way. An unstaged edit that adds a literal grows the path list between `check`
and `commit`, so the key changes and a green check is refused (a needless rerun). `cmd_audit` has the same weakness
across history: it applies today's working-copy set to commits from 11-01.

Fix: derive from the tree that is being keyed (`git ls-tree -r` / `cat-file` of `<tree>:pywidget/ios/...`), cache on
the tree id, and test existence with `<tree>:<path>`, not `os.path.exists`.

## M2 (Medium): repo-root names from path-refusal literals

The scan joins each Swift literal onto three bases, and one of them is `pywidget/`. `Tests/Core/RunLogTests.swift:630`
has `store.clear("../b")`, a refusal test, and that resolves to repo-root `b`. An empty `b/` directory has been sitting
in the main checkout since 11-06. Today only the `git ls-files -c -o` filter keeps it out of the key.

Probe (clone, same HEAD): one untracked file `b/notes.txt` puts `b` in `gated()` and the key of HEAD changes from
`21ec7effca57` to `669654e0fdcf`. Every existing green verdict stops matching, and every check reruns, until somebody
deletes a scratch file they did not know mattered. The key reads the tree, so `b` adds `b=-` and only the path list
moves. Nothing becomes stale, but every verdict goes to waste.

Mutant (`mutants.py`, the four T-3519 cases): with the ls-files filter disabled (`if res:` → `if False:`), all 4
**still pass**. So the one guard against this has no test. On the real checkout, filter on against filter off differs
by exactly `['b']`.

Fix: only keep a resolved literal that lies under `pywidget/tests` (or a reviewed list of fixture roots), never at the
repo root. Add a test with a stray untracked directory that a `"../x"` literal names.

## L1 (Low): dead URL skip

`SWIFT_LIT` needs the literal to start right after the quote and allows no `:`, so `"https://example.invalid/tests/x"`
never matches (`SWIFT_LIT.findall(...) == []`). The `if "://" in lit: continue` cannot fire, and the test's URL line
passes because of the regex. Mutant M1 in `mutants.py` (skip removed): 4 of 4 still pass. No harm today. Either delete
the skip or make the test literal path-shaped so that the skip is what it tests.

## Mutant table (the four T-3519 cases, clone at 993e57b38)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Mutant table (the four T-3519 cases, clone at 993e57b38), scrolls sideways" style="--tw:561px" markdown="1">

| Mutant | Result |
|---|---|
| baseline | 4 OK |
| drop the `"://"` skip | 4 OK (survives, L1) |
| drop the `git ls-files` filter | 4 OK (survives, M2) |
| drop `pywidget` as a literal base | 4 FAILED (killed) |
| ignore project.yml `../` refs | 2 FAILED (killed) |
| cache keyed by root only | 4 OK (survives; harmless: `base` is fixed per process) |

</div>


The four cases do test what they claim: fixture-only change → new key and gated; docs, host test and shots → same
key; a new fixture folder is picked up; the check's candidate carries the fixture. None of them covers the miss
classes in H1, the working-copy split in M1 or the stray-directory case in M2.
{% endraw %}

</div>
