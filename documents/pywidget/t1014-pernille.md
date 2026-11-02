---
layout: "default"
title: "T-1014 review: one Simulator up through a test run"
section: "documents"
description: "Verdict: land after fixes. One High, and it is one moved line plus one fixture line. The thing you asked me to look hardest for, killing another task&#x27;s live test, I could not make happen. What broke is cost: the tool\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1014-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t1014-pernille.md</code></span></div><h1>T-1014 review: one Simulator up through a test run</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille. Commit a20c7cbe, branch odalys/t1014, parent b604b0ad. Date 2026-11-02. Author Odalys; I saw the work, not her reasoning.

**Verdict: land after fixes.** One High, and it is one moved line plus one fixture line. The thing you asked me to look hardest for, killing another task's live test, I could not make happen. What broke is cost: the tool turns a rare slow path in xc.sh into every run.

## High

**H1. Every test run on a Simulator that is down starts xcodebuild twice. `tools/xc.sh:129`, made routine by `tools/xc.sh:183`; hidden by `tests/xc_sim_test.py:58-59`.**

The first thing that broke was line 129. It asks `simctl listapps` whether app.pywidget is installed, and it asks before line 134 boots the Simulator. `listapps` does not work on a shut Simulator. Read on this machine, on iPhone Air (38CA581B), state 1 in its plist before and after: exit 149, "Unable to lookup in current state: Shutdown". Empty output reads as "no app", so xc.sh runs a whole extra `xcodebuild ... -only-testing:PyWidgetTests/ThemeTests` first.

Before this commit that was rare, because Simulators stayed up. The record has 25 rows of 1530 with 5 s or more of setup (6 to 133 s, median 35, nine rows at 84-133 s). Now `end` shuts the Simulator after every run, so the next run on it pays again.

The stand-in `listapps` prints app.pywidget whatever the state, so the suite cannot see this. With only that line made to behave as the real one does, on the real xc.sh, three runs in a row on one Simulator:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: High, scrolls sideways" style="--tw:519px" markdown="1">

| xc.sh | xcodebuild starts per run |
|---|---|
| parent b604b0ad | 2, 1, 1 |
| a20c7cbe | 2, 2, 2 |
| a20c7cbe with `bootstatus -b` moved ahead of `listapps` | 1, 1, 1 |

</div>


Scenario for land, the one that makes this High. `tools/personal_land.sh:136-139` records this double start on T-0915: xcodebuild twice, 102 s then 152 s, 558 s of LAND_TEST_SECONDS's 600, and it reads the 102 s as "a first install". The evidence here says it is any shut Simulator. Land tests on iPhone 17e. XC_SIM_KEEP=1 only protects that if nothing else runs between two lands: the first run on another destination has `begin` take 17e down, and the next land is cold. So 42 s of room becomes the normal case, `begin`'s own time comes out of it too, and a green branch goes red on time. That is a false red. Every other <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> also waits 100 s longer on the one lock, and land's lock wait is 60 s.

Fix: move the boot ahead of the `listapps` check, make the stand-in's `listapps` exit 149 on a Shutdown device, and add a row that a cold run starts xcodebuild once. The T-0532 order that matters (app installed before the grant) is unchanged. Then fix the sentence at `tools/personal_land.sh:136-139` and at `tools/xc_sim.py:27-28`.

## Medium

**M1. A byte in `ps` that isn't UTF-8 turns the whole limit off and counts nothing. `tools/xc_sim.py:95`, `:136`.**

`text=True` decodes strictly, and UnicodeDecodeError is a ValueError, so neither `except` catches it. One process anywhere with a Latin-1 argument: `begin` exits 1 with a traceback. Probe with a stand-in ps that passes raw bytes: xc.sh exit 0 (good, the run is not blocked), row `"sim": null, "sim_end": ""`, nothing stopped, the Simulator this run booted left up, and so on for every run while that process lives. That breaks "can't tell: leave it and count it in the row". `remove` exits 1, which also means "none found". A run with `devices()` empty because simctl failed gets the same `"sim": null`, which is what a macOS destination gets, so the row cannot tell "not a Simulator run" from "could not read". Fix: `errors="replace"` on both calls, and a row value that says unread on the machine's lock for a Simulator destination.

**M2. A kept Simulator never goes down on its own destination. `tools/xc.sh:180`; false sentences at `tools/xc_mutants.py:23`, `tools/personal_land.sh:139`, `tools/xc_sim.py:26`.**

`begin` reads a kept Simulator as "up before this run", so `SIM_UP=1` and the end step is skipped. Probe, same destination, KEEP, KEEP, none: `sim_end` kept, left, left; state Booted; no shutdown. So "goes down after the last one that runs" is false, and so is land's "the next run takes it down" unless the next run is on another destination. `tests/xc_mutants_test.py:100` passes its row on the environment alone, against a stand-in xc.sh, so nothing checks the claim. The limit <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> (one Simulator), so this is no High, but the ask was to shut it at the end of the run. Fix the behaviour or fix the three sentences. Either way "left" now means two things in the row.

**M3. Two safety lines the suite doesn't pin. `tests/xc_sim_test.py:33-34`, `:234-239`, `:273-275`.**

I seeded 18 mutants of my own on a scratch copy: 14 killed, 4 survived. Two survivors are near-equivalent (a failed ps read turned into empty rows: `in_use` and the last read still leave what is booted). Two are real gaps in the tests; the code itself is right.

- `on_machine_lock()` returning True always survives. That function is what keeps the MacBook runner and every fixture off. The "nothing is called" rows pass under the mutant because the stand-in logs no `list` call and, with the flag off, `/bin/ps` shows no launchd_sim for fixture ids, so they read "can't tell". Log every call in the stand-in and test the function directly.
- `judge` reading runners on the first read only survives. The one later-read row uses a simctl that names the Simulator, so `in_use` catches it. Add a bare xcodebuild on read 3 that names no id.

This is not 18 of 18 against her figure in `ops/metrics/t1014-rule-d.txt`: her set isn't in the commit, so I can't check it.

## Low

- **L1.** `tools/xc_sim.py:27-28` "most of them 10-45 s and 120 s with a first install": recounted, 13 of 25 at 10-44 s, nine at 84-133 s. Cold is not first install (H1).
- **L2.** `tools/disk_free.py:29` "20 GB is about 44 minutes of work": the 44 minutes was 11.5 GB. Line 19 has it right, 10 GB is 18-40 minutes at those rates. At the later 96 MB/min it is 106 minutes. The board line owes this figure, so write it once, correctly.
- **L3.** `tools/disk_free.py:251`, `:273`: a dip opens an episode with 10-20 GB free, and the emergency then says, say, "15 GB free" and "no new heavy work under 10 GB". An Investor reading that can't see why it is an emergency. Say what the gate saw.
- **L4.** Land's and a lane's xc.jsonl rows go with their worktree (`tools/personal_land.sh:140`, `tools/xc_sim.py:19-20`), so "the row says so" holds in the main checkout only. Lane runs missing the limit aren't in the kept record.
- **L5.** `tools/xc_sim.py:13-14`, `:70`: `--task` is what the caller says, as the docstring admits, so "only the task that made it" stops mistakes, not another task typing the number. There is no identity to check against, so I accept it. `T-1234a` is refused though the board and scratch.py allow it.
- **L6.** `tools/xc_sim.py:355`: "could not remove" exits 1, the same as "none found". `:272`: a Simulator in Booting or Shutting Down reads as "shut". `:347`: the shutdown's answer is ignored.
- **L7.** `tests/personal_pool_test.sh:180` and `tests/inbox_watch_test.sh:193` run the gate under the line with no DISK_LOW_FILE, so each run leaves a note in /tmp. The key is a hash of the fixture's path, so the live gate isn't touched.
- **L8.** Cold Simulators are now the norm and the tests have little history on them: of those 25 rows 12 are red (48%), against 486 of 1505 (32%) for the rest. Builds are mixed in and first installs too, so that proves nothing. Watch `sim_setup_s` and reds for the first day.

## The bar, held to each


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The bar, held to each, scrolls sideways" style="--tw:640px" markdown="1">

| Item | Result |
|---|---|
| One lock across sessions and worktrees | Holds. `tools/xc.sh:37` is a fixed path, not built from $ROOT; no lane sets XC_LOCK_FILE; the MacBook's kinds.json does, to its own cache. `begin` runs on `LOCK=held` only |
| `begin`, `end`: leave what a live run uses | Holds. Real process table, read offline from a fresh `ps` with the Simulators' plists and no simctl: a live xcodebuild stops everything, all 9 left. With that row removed, 8 read idle and T0553 Idris stays for its app. Column parsing is right on all 2518 real rows |
| Stop only what reads idle; can't tell stays, in the row | Holds, except M1 |
| Scripts | Holds. All seven scripts that drive simctl are in SIM_SCRIPTS; the pin covers tools/ and pywidget/ios/scripts; no tool calls xcodebuild outside xc.sh |
| Exit 75 stays a wait | Holds. `begin` runs after the lock and the gate, so a wait touches nothing. `tools/xc_mutants.py` reports it as WAITED, no verdict |
| Task Simulator removable by its task | Holds, with L5 |
| tools/supervisor.sh unchanged, no `settle` | Holds. No diff; no such command |
| A crash fails or blocks a run | Doesn't. Checked by forcing it (M1); simctl and ps calls have timeouts |
| Stale lock | None. `remove`'s flock dies with the process, and the fd isn't inherited; a row <span title="A test written in advance. If it fires, we drop the idea.">kills</span> the holder with -9 |
| Race, begin against a run | The lock covers xc.sh. A bare run that starts after the last read can still lose its Simulator; the window is the last read to the shutdown, and it can't be closed from here |
| A test touching a real Simulator | None found. Stand-ins first on PATH, XC_LOCK_FILE a temp file; other suites have no destination, a stand-in xc.sh, no xc_sim.py in the fixture, or XC_SIM_SETUP=0 |
| `disk_free.py`, `personal_land.sh`, `xc_mutants.py` | Figures in rule-d.txt recount from disk.jsonl (257, 567, 96 MB/min; 84 min, n=10). 12 of 12 and 25 of 1530 recount. Findings above |

</div>


## What I ran

In the worktree, with their fakes: xc_sim 107/0, xc_mutants 16/0, xc_evidence 18/0, xc_hang 10/0, xc_lock 20/0, xc_helpers 19/0, xc_verdict 27/0, xc_idle_evidence 6/0, xc_metrics 5/0, personal_claims 107/0, macbook_runner 143/0. disk_free stops with a traceback at line 136 in that worktree, which has no investors/; with DISK_URGENT at the main checkout's urgent.py and the stand-in gh first on PATH, 99/0. tests/personal_land_product_test.sh not run: the Operator runs it at landing. Its changed row is pinned only statically.

Two things outside the plain packet. `python3 tools/scratch.py new T-1014-review` refused that task form, so the scratch folder is T-1014-pernille, the tool's documented form. And the one `xcrun simctl listapps` in H1, a read on a shut Simulator: nothing booted, shut down or deleted. Probes and mutants are in /private/tmp/company-scratch/T-1014-pernille.
{% endraw %}

</div>
