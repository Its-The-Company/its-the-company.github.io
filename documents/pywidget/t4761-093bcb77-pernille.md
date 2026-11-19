---
layout: "default"
title: "Review of T-4761 at 093bcb77: state.json in L5 s5.1&#x27;s layout under pywidget.state/1"
section: "documents"
description: "PASS with findings. The written layout is L5 s5.1&#x27;s subset field for field, the cap is s5.4&#x27;s measure, later files are read and carried, the T-4554 layout is refused and never overwritten, and the tests kill a wrong\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4761-093bcb77-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 29 · Thu Nov 19</span><span><code>pywidget/docs/reviews/t4761-093bcb77-pernille.md</code></span></div><h1>Review of T-4761 at 093bcb77: state.json in L5 s5.1's layout under pywidget.state/1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4937, Commandment 13). Author: Idris. Reviewed: 093bcb77da (ios/Shared/WidgetStateCommit.swift,
ios/Tests/Core/WidgetStateCommitTests.swift, tests/state_commit/test_state_commit_processes.py,
docs/research/L5-interactivity.md s5.1 dated line, docs/decisions/ADR-007-execution-architecture.md s8 dated line). It is
the only T-4761 commit on main. Also read, for what it leans on: L5 s5.1 (the layout), s5.3 (rebase and restore
windows), s5.4 (what the <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> measure), `ios/App/Runtime/pywidget/widgets.py` (`SCOPES_LIMIT`, the `state_read` and
`state_write` shapes), `tests/widget_state/fake_write_path.py` (the host model's file), and every reader of
`state.json` at 093bcb77 (`git grep`: WidgetStateCommit.swift is the only one; ProjectSendPlan.swift:115 only names the
file to leave it out of a send). Paths are under pywidget/ unless they start with tools/. Line numbers are 093bcb77's.
Date: 2026-11-18.

What I ran:
- A host harness, nothing kept in the tree: 093bcb77's WidgetStateCommit.swift (from `git show`) built with
  `xcrun swiftc -O -swift-version 6` and a scratch main.swift that ports the three new tests' assertions (<span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> top-level
  keys, T2 the cap at and one byte over, T3 a full L5 file read and carried) and adds two probes (P1: a carried
  `scopes` member of 40,000 bytes plus a 30,000-byte `shared`; P2: a file in T-4554's first layout). Original: green.
  Mutants, each on a scratch copy of the file:
  - MA, `scopesBytes()` measures `{"shared": ...}` only, ignoring carried `scopes` members: red on P1 only. T1-T3 stay
    green, and no test in the suite writes a carried `scopes` member near the cap (`git grep` at 093bcb77). Survives
    the suite (L1).
  - MB, the commit drops `carried: now.carried` (:336): red on T3 (every carried member) and P1. Killed.
  - MC, the under-lock cap measures `scopes` less its 11 wrapper bytes (:340): red on T2 (one byte over commits).
    Killed.
- `python3 -m unittest tests/state_commit/test_state_commit_processes.py` at the worktree head (fbf1569bf2, which has
  T-4762's async run over the same layout code): 3 tests, OK, 19.1 s.
- `XC_TASK=T-4937 XC_LOCAL=1 tools/xc.sh` WidgetStateCommitTests at the worktree head: no result here. The first
  run (11:28 PM ET) was stopped by my shell's 20-minute limit while still building at load ~320 (log
  ops/runs/xcodebuild-20261118-232806.log), so no test ran. The second (started 11:52 PM ET) was still waiting for the
  machine's Xcode lock when I committed. The verdict rests on the host harness and the two-process tests above.

## What holds

- **Layout, field for field.** `encoded()` (:173-183) writes `schema` "pywidget.state/1", `epoch` (string), `rev`
  (integer) and `scopes: {"shared": {...}}`, and on a fresh file nothing else; that is L5 s5.1's layout with
  `next_seq`, `pending`, `ops_log` and `failed_count` absent, which the s5.1 dated line (L5-interactivity.md:265) says
  1.1 reads as 1, empty, empty and 0. The T-4554 names `format` and `state` are gone from the writer and refused by
  the reader (`testDecodeRefusesEachBadShape`, :202). `testTheFileHasL5sTopLevelKeysAndTheStateUnderScopesShared`
  (:81) pins the exact key set at both levels, and the two-process test's `read_state` pins it on every file it reads,
  so a member added or renamed is red.
- **The cap is s5.4's measure.** Checked under `state.lock` on the whole `scopes` value as written (:338-340), with the
  same encoder and options as the file (`scopesBytes()` encodes the dictionary `encoded()` nests; the test checks the
  measured bytes are a substring of the file, :111). The early check on `shared` alone (:324) can only refuse what the
  late one would. MC is killed. widgets.py's `SCOPES_LIMIT` (65,536, "the whole `scopes` value, braces in") is the
  same number and the same object.
- **An older or a later file.** A file a later build wrote (L5's full layout) is read and its members are carried
  (MB is killed), `scopes` members other than `shared` included, and `carried` comes from the file read under the
  lock in the same hold as the write (:334-336), never from the snapshot, which is what s5.3 asks of `pending`,
  `next_seq` and `ops_log`. `readLimit` 512 KiB is above s5.4's 416,217-byte ceiling, and `encoded()` refuses anything
  past it, so 1.0 never writes a file it cannot read back. A file in T-4554's first layout is unreadable and left
  byte for byte (P2); the claim that no such file exists on a phone holds as far as code can show it: at 093bcb77 no
  code outside WidgetStateCommit.swift and its tests calls `WidgetStateCommit`, so no build wrote one.
- **Crash and concurrent writers.** Unchanged by this commit and still right: one `state.lock` hold covers the read,
  the `(epoch, rev)` check, the cap and the write; temp file in the same folder (`O_EXCL`), `fsync`, `rename`, read-back;
  temps of a killed writer swept under the lock. The two-process tests (lost-update count, <span title="A test written in advance. If it fires, we drop the idea.">kill</span> mid-hold) pass on the
  new layout.
- Wording, not a finding: "carried unchanged" (L5:265, test comment :120) is unchanged as values. Carried members are
  re-encoded with JSONSerialization (keys sorted; `-0` becomes `0`), so their bytes can differ from what a later build
  wrote. Nothing reads them as bytes.

## Findings

### M1 (Medium): a 1.0 commit over a file with a non-empty `ops_log` leaves a gap that s5.3's restore rule does not see

L5-interactivity.md:265 says "A 1.0 commit adds no `ops_log` entry, so a later rebase across it is `conflict` by the same
rule", and s5.3 (:283) ends "With this, every `state.json` commit is in `ops_log`". After this commit that is no longer
true. When 1.0 commits over a file a later build wrote (a TestFlight tester going back a build, the case the carrying
exists for), it carries `ops_log` as it found it (:336) and moves `rev` to n+1 with no entry for n+1, so the ring has a
hole inside its span. s5.3 gives two tests for "the window is in the ring". The rebase's (:282, "every commit r+1..r'
is in `ops_log`") catches the hole only if 1.1 checks each rev. The live-row restore's, as amended by T-0266 (:283,
"older than the ring when more than 16 entries ... lie after `rev_after`"), counts entries, and a hole makes the count
smaller, not larger. So a 1.1 build that implements :283 as written restores a failed live Toggle's `before` over the
state the 1.0 handler wrote, with no badge and no `conflict`. The same holds for a rebase coded as "r is not older than
the oldest entry". Nothing is broken in 1.0 alone, and no 1.1 code exists yet. That is why this is Medium and not High:
the spec now promises something its own rule does not deliver, and no test or gate row will catch it.

Fix (Idris, before 1.1's rebase is written): either (a) when the carried `ops_log` is non-empty, 1.0 appends the
`{"rev": n}` marker for its commit (s5.1's "older than the ring" marker, which both windows already treat as
`conflict` or badge), trimming the oldest entry if that makes 17. Or (b) state in s5.3 that a window holding any rev
with no entry is outside the ring, whichever test is used (count or rev), and add that case to s5.8's host-model
list. (a) is a few lines, and with a WidgetStateCommitTests case it closes the hole in 1.0's own code. (b) leaves it to
1.1.

### L1 (Low): the cap's carried-`scopes` branch has no test (mutant MA survives)

WidgetStateCommit.swift:155-169: `scopes()` merges carried `scopes` members into what the cap measures, as s5.4
requires (the whole `scopes` value). `testTheCapMeasuresTheWholeScopesValueBracesIn` (:99) has no carried members, and
`testAFileInL5sFullLayoutIsReadAndItsOtherMembersAreCarried` (:121) has a 13-byte `inst-1`. Measuring `shared` alone
(MA) passes every test in the suite. If it did, a 1.0 commit over a file whose per-instance `scopes` hold tens of KiB
would write a `scopes` past 64 KiB, which 1.1 would then carry as over its own cap. Fix: one test that seeds an L5 file
with a 40,000-byte `inst-1`, commits a 30,000-byte `shared` (`tooLarge`, nothing written), then a 25,000-byte one
(committed). My harness's P1 is the first half.

### L2 (Low, open from T-4604 L1, no board line): no `fsync` of the folder after the rename

WidgetStateCommit.swift:224. Still as in my review of dadba11da4 (L1): the temp file is fsynced, `widgets/<id>/` is not,
so a power loss after a reported commit can bring back the previous `state.json`, `rev` included. Not this commit's
change. I name it again only because the task asks whether the write is crash-safe, and T-4604 put no board line on
it. Fix: `open(folder, O_RDONLY)`, `fsync`, `close` after `rename`, before the read-back.

## Verdict

**PASS with findings.** The written layout is L5 s5.1's subset field for field, the cap is s5.4's measure, later files
are read and carried, the T-4554 layout is refused and never overwritten, and the tests kill a wrong layout, a lost
carry and a cap on `shared` alone. M1 and L1 go to Idris as T-5014, L2 as T-5015.
{% endraw %}

</div>
