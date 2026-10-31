---
layout: "default"
title: "T-0900: independent review of T-0881 (staged send and rename commit)"
section: "documents"
description: "Verdict: no High, one Medium. T-0865&#x27;s M1, M2 and M3 are fixed for a link, a read-only folder and a refused rename. The first thing that broke was a really full disk: the commit stopped halfway and every put-back failed\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0881-t0900-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 10 · Sat Oct 31</span><span><code>pywidget/docs/reviews/t0881-t0900-pernille.md</code></span></div><h1>T-0900: independent review of T-0881 (staged send and rename commit)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-10-31. Reviewed 0aadb129 from the diff, the tests and the code they touch, against my T-0865 review ([`t0844-script-save-t0865-pernille.md`](t0844-script-save-t0865-pernille.html)); Idris's notes not read (Commandment 13). Line numbers are at 0aadb129. New fixes: T-0906, T-0907 (Idris).

**Verdict: no High, one Medium. T-0865's M1, M2 and M3 are fixed for a link, a read-only folder and a refused rename. The first thing that broke was a really full disk: the commit stopped halfway and every put-back failed with it.** It takes a narrow band of free space, and the person's text is safe in the project. It doesn't block anything now. Fix it before 1.0.

## Evidence

No Xcode or Simulator. I compiled the real `WidgetScriptSave`, `ProjectStore`, `MiniZip` and `WidgetID` with `swiftc` on the Mac, added two small stubs, and ran the sends on real APFS, including a 40 MiB image filled to the top. Source and raw lines: `pywidget/docs/reviews/t0881-t0900-evidence/`.

What this doesn't show: a device. A Mac APFS image isn't an iPhone's data volume, and the free-space figures are this image's. I didn't rerun Idris's 508 tests; results.txt reports them green and I read the 37 that matter here.

## Findings

### M1. On a full disk the commit can split, and the undo fails for the same reason

`WidgetScriptSave.swift:236-273`. Lines 32-33 treat a failed put-back as a second, unrelated accident. It isn't. Staging proves the bytes fit, but on APFS a rename needs free space too, so past the stage a swap can end in ENOSPC, and the put-back is a swap on the same full volume.

Measured: one 4 KiB file freed between sends, 12 siblings plus `main.py`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: M1. On a full disk the commit can split, and the undo fails for the same reason, scrolls sideways" data-n="1" style="--tw:536px" markdown="1">

| Sends | Free space (`statfs`) | Result |
|---|---|---|
| 48 | to 3,764,224 | refused at the stage, `widgets/` unchanged (the good case) |
| 49 | from 3,772,416 | step 0 ENOSPC, `widgets/` unchanged |
| 1 | 3,993,600 | step 1 ENOSPC, the put-back ENOSPC, `s0.py` left new |
| 1 | 3,981,312 | step 9 ENOSPC, nine put-backs ENOSPC, `s0.py` to `s8.py` left new |
| 1 | 4,001,792 | sent, all 13 renames |

</div>


The last two refusals are T-0865's M1 over again: old `main.py`, nine new siblings, "was saved, but not to its widget", no `scriptSaved`. An edit that renames a function ends in `AttributeError` at the next refresh, and the widget freezes on its last tree. The retry from M3 heals it at the first boundary after space frees up.

The band is small here, about 8 KiB. I would expect it to grow with the number of renames, but I didn't measure that.

The other shapes I forced with a stand-in, failing every rename after the chosen step. I did not catch them on the full disk:

- **Removal, the worst one.** Line 251 renames the old folder into staging, and line 225's `defer` deletes staging. If the put-back at line 255 fails, the `wea` folder is gone, tree included, the console says only "not to its widget", and the retry says nothing about `wea`. Lines 32-33 say the folder "stays mixed". This one doesn't stay at all.
- **Move.** The folder stays at the new id, T-0747's "went with it" line is never said, and the retry comes out `made: false`.

`.refused`'s comment at line 55 and T-0881's done-note ("stays exactly as it was", full disk named) claim more than this. Line 225 also deletes the old siblings of a failed swap.

Fix: make the commit one rename, so there is no middle to undo. Build the whole new folder in staging: `.moves` starts from the old folder, the rest from the target's current one, `tree.json` and stale siblings included, cloned so it costs almost no space. Then:

- **Same folder:** `renamex_np(staged, target, RENAME_SWAP)`.
- **New folder:** the same call with `RENAME_EXCL`.
- **`.moves` and `.goes`:** retire the old folder last, after the new one is in place. If that step fails, remove the new folder; a removal doesn't need free space.

A rename that fails has changed nothing. A tree the sink writes between the clone and the swap lands in the old folder and is lost, which is fine after a send because `scriptSaved` runs behind it. T-0865's L1 stays possible for a run that spans the swap. Needed proof: the full-disk sweep in the evidence folder, with the widget folder on the image, shows `widgets/` unchanged at every refusal. The test sweep's four shapes are kept.

### L1. The retry remembers one file and forgets the id change

`PyWidgetApp.swift:372`, `:383`, `:293`. Two gaps:

- A refused, B refused, back to A: A's record was overwritten, so A isn't retried. The test's `helper.py` declares no id, so it can't see this.
- A refused id change, then leaving the file: line 293 clears `widgetSent`, so the retry runs with `last` nil. Measured at send level: `wrote(weather)` with `wea` still there and no console line. T-0747 promises the console says what happened to the old folder, and the retry in place (`testRefusedSiblingStopsTheMove`) keeps that promise. This path doesn't.

Fix: keep the refusals by path, with the `Sent` that went with each.

### L2. The L1 note doesn't cover a refused commit

Lines 34-36 say the `scriptSaved` run draws the new pair. After `undone` there is no such run (`PyWidgetApp.swift:401`), so a run spanning a commit that is then undone can leave a tree of a pair no save held, until the next refresh. It needs an in-flight run and a failed rename together. The one-rename fix leaves one failure point and no undo. Correct the sentence.

### L3. Nothing pins "main.py last", or a failed put-back

The doc comment leans on `main.py` going last, but no test does. In `assertEveryFailedRenamePutsItBack` (test line 713) the put-backs succeed, so by reading it stays green with `main.py` first. Nothing else sees the order. My host log confirms the order is right today. `failing` (line 701) fails one step per send, so a failed put-back has no test. results.txt names the "the fix switched off" run as one mutation of everything at once, so it doesn't speak to each part. Add a renamer that records the order and a case that fails every step from n on; with T-0906's single rename, the order test becomes "exactly one rename reaches `widgets/` per send".

## Requested checks that held

- **Stage on a real full disk.** 48 sends ended ENOSPC at the stage: `widgets/` unchanged, staging gone. Idris's read-only-folder test stands for that path.
- **M1, M2, M3 for every other cause.** Adopted probes A, B, B2, C read as they should, and `.refused` keeps `last`, so `made` survives. T-0865 L4's four comments are fixed.
- **Undo order and forward failures.** Steps undo in reverse, the swap's undo is its own inverse, `rename(dest, source, 0)` returns a new file to staging. A real failure with no stand-in, an immutable widget copy (EPERM), left `widgets/` unchanged. A script could do this with `os.chflags`, if iOS lets it, which I didn't check.
- **RENAME_SWAP and RENAME_EXCL.** Both work as the code expects on Mac APFS, a swap on resend and EXCL on a first send. Unproved on a device still.
- **`.refused` retrying each boundary.** Refusal at each boundary repeats the read, and over budget stops before any read. The cost at the worst case is one 32 MiB read per boundary with a link in the way. Acceptable.
- **Budget.** A link in a project can't pass it: `files(in:)` uses `attributesOfItem`, which doesn't follow links, so `Data(contentsOf:)` never reads through one. A file that grows between the size check and the read can pass; a running script could do that, and I leave it.
- **Queued widget run.** `scriptSaved` starts after `send` returns, on the same actor, so a run queued behind it starts after the commit; a pending run coalesces and reads the final `main.py` (`PyBridge.swift:504`). A run in flight is T-0865's L1, and its window went from whole file writes to a few renames.
- **One send at a time.** `ConsoleModel` is `@MainActor` and it is the only caller, so `.widget-send` has one user. The extension never sends.

## Limits, written down and accepted

- A crash mid-commit has no recovery, and the next launch reads the file as already sent, so a mixed folder stays until the next edit. Same for a refusal at the foreground boundary followed by a <span title="A test written in advance. If it fires, we drop the idea.">kill</span>. Very rare; line 371 states the second.
- Not from this commit, by reading: a `wea` run in flight during a move ends in `RunResultSink.swift:87-88`, which remakes `widgets/wea/` with only `tree.json`. It is T-0747's and a Low at most. Worth a look in T-0866, so I have not filed it.

## Which goes where


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Which goes where, scrolls sideways" style="--tw:517px" markdown="1">

| Item | Goes to |
|---|---|
| M1, L2, L3 | T-0906, new (P1, before 1.0) |
| L1 | T-0907, new (P2) |
| A remade `wea` folder after a move | T-0866's look at leftovers, no line |

</div>
{% endraw %}

</div>
