---
layout: "default"
title: "T-2133 review: 2b77b0dc5 (T-2127 to T-2132, App privacy guard fixes after T-2121)"
section: "documents"
description: "What ships is still right. The App manifest stays at C617.1, and the widened reader finds 32 units on the real tree with no listed read in them. The _ssl and _hashlib manifests changed only in comments: plutil -lint\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2133-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2133-pernille.md</code></span></div><h1>T-2133 review: 2b77b0dc5 (T-2127 to T-2132, App privacy guard fixes after T-2121)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Host only (no Xcode, no Simulator). I judged the diff and what it does on a scratch
copy, not the commit message or board notes. Scratch: `/Volumes/Company SSD/company-scratch/T-2133-pernille` (copy of
pywidget/, Vendor linked to the repo's python-3.15.1-ios cache). Files there: `mutants-rerun.txt` (author's runner),
`tools/q_mutants.py` and `my-mutants.txt` (mine), `old-guard-q8.txt` (mine against the parent commit's guard). The
scratch App tree matched the repo again after every run (`diff -r -q`).

## Verdict: approve with findings

What ships is still right. The App manifest stays at C617.1, and the widened reader finds 32 units on the real tree
with no listed read in them. The `_ssl` and `_hashlib` manifests changed only in comments: `plutil -lint` passes, and
their JSON form matches the parent commit exactly. The privacy suite runs 30 tests, all OK. The author's runner
gives all 21 results as expected.

T-2121's F1, F3, F5 and F6 are closed. F2 is closed for the shape I seeded (P3), but the T-2128 unique-name rule
leaves the same hole open for any wrapper whose name is not unique, and most names in this tree are not. F4 is
closed for raw-value keys, but the fix opened a new false green: a `//` or `/*` inside a string literal now hides
code from the API matcher. My eleven mutants got nine survivors.

None of this changes what ships today. These are holes in the guard that protects the next change, so nothing blocks
TestFlight. These are gaps in test coverage, not security weaknesses in the product, so nothing needs to be held
back from publication (Commandment 42).

Findings: 0 High, 3 Medium, 2 Low, 1 Info.

## T-2121 findings against the fix


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: T-2121 findings against the fix, scrolls sideways" style="--tw:1017px" markdown="1">

| T-2121 | fix | closed? | evidence |
|--------|-----|---------|----------|
| F1 paren depth | `members()` tracks `(`/`[` depth per brace frame; braces at non-zero depth are not units | yes | P2, P2b KILLED with `peekPicked` named; new real-tree test: 0 unnamed of 1384 units |
| F2 caller tracing | callers to a fixpoint through scope-passing wrappers with a unique name | partly | P3 KILLED; Q1, Q5, Q7b survive (F2 below) |
| F3 init naming | init named by its type, matched as `T(` / `T.init(`; deinit, subscript, operators get labels no call can match | yes | P4 KILLED naming `stampHeld`; P4c control SURVIVED (no false red). Q6 is a leftover edge (F5 below) |
| F4 raw-value keys | units cut on string-blanked text, matched on comment-stripped text with strings kept | yes, with a regression | P5 KILLED; Q8, Q8b survive (F1 below) |
| F5 module-qualified calls | `(Darwin\|Glibc\|Foundation)\.` allowed before the C name | yes | P6 KILLED; new test covers `box.stat(` and `MyDarwin.lstat(` as negatives |
| F6 wording | s4b and both manifest comments name `SSL_CERT_DIR`, `SSL_CERT_URI`, `OPENSSL_CONF_INCLUDE`, any first EVP fetch | yes | privacy-label.md s4b; reasons unchanged (JSON diff identical) |

</div>


The new <span title="A test written in advance. If it fires, we drop the idea.">kill rule</span> in the runner (`MUST_NAME`: a kill only counts if the message names the unit that holds the read)
is a real improvement. It is why P4's wrong-reason kill now shows up as `KILLED-WRONG` and does not pass as a kill.

## Mutant results

The author's runner on my scratch copy: unmutated guard passes; M0 and P4c SURVIVED (controls); M4-M11, P1, P2, P2b,
P3, P4, P5, P6, P7 and P8 KILLED, each as expected. This matches `pywidget/ios/bench/t2120-guard-mutants.txt`.

My mutants (`tools/q_mutants.py` in scratch). It loads the author's runner and swaps in my list, so each mutant is
applied, run and reverted the same way, under the same `MUST_NAME` rule. "Should be" means what a correct guard does.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Mutant results, scrolls sideways" data-n="1" style="--tw:567px" markdown="1">

| id | seeded change | should be | got |
|----|---------------|-----------|-----|
| Q1 | P3's `withPickedScope(u, body)` (calls `access(u)`), plus a same-named overload `withPickedScope(_ s: String, _ body:)` in ProjectTransfer; caller reads `.creationDate` in the closure | KILLED | **SURVIVED** (F2) |
| Q2 | `PickedQueue.enqueue(body)` stores the closure; `drain(u)` opens the scope with `access(u)` and runs the jobs; the caller only enqueues a `.creationDate` read | KILLED | **SURVIVED** (F6) |
| Q3 | `extension SystemFiles { func withLastPicked(_ body: (URL) -> Void) }` opens the scope directly; caller `f.withLastPicked { u in _ = u.creationDate }` (no parentheses) | KILLED | **SURVIVED** (F3) |
| Q4 | P3 with `typealias PickedWork = () -> Void` and `_ body: PickedWork` | KILLED | **SURVIVED** (F4) |
| Q5 | `struct ScopedRun` with `init(_ u:, _ body:)` that runs the closure inside `access(u)`, and a second convenience `init(path:, _ body:)`; caller `ScopedRun(u) { _ = u.creationDate }` | KILLED | **SURVIVED** (F2) |
| Q5c | control for Q5: the same type with only the first init | KILLED | KILLED |
| Q6 | P4's `PickedScope` holder; caller `let s: PickedScope = .init(u)` then `.creationDate` | KILLED | **SURVIVED** (F5) |
| Q7 | `protocol PickedAccess { func withScope(_:_:) }`, one conformer (`extension SystemFiles`) implements it with `access(u)`; caller `a.withScope(u) { read }` | KILLED | KILLED |
| Q7b | Q7 plus a second conformer `FakeAccess` (the usual test double) | KILLED | **SURVIVED** (F2) |
| Q8 | readPicked: `let note = "file://\(url.path) \(String(describing: (try? url.resourceValues(forKeys: [.creationDateKey]))?.creationDate))"` | KILLED | **SURVIVED** (F1) |
| Q8b | readPicked: `let glob = "picked/*"`, then `attributesOfItem(...)?[.creationDate]`, then `let tail = "*/"` | KILLED | **SURVIVED** (F1) |

</div>


Against the parent commit's guard (`old-guard-q8.txt`), Q8 and Q8b are KILLED, so 2b77b0dc5 introduced them. Q3
SURVIVED there too, so it predates this diff.

## Findings

**F1 (Medium, regression from the F4 fix) A `//` or `/*` inside a string hides code from the API matcher.**
`pywidget/tests/privacy/test_user_granted_files.py:187, 223` feed `tms.uses` a unit text with comments already
removed and strings kept. `tms.uses` then runs `COMMENTS` (`//[^\n]*|/\*.*?\*/`) over it again
(`pywidget/tests/privacy/test_manifest_sources.py:46`), and that regex does not know about strings. So
`"file://\(...)"` drops the rest of its line, interpolations included (Q8). `"picked/*"` drops everything up to the
next `*/` anywhere in the unit, across lines (Q8b). Before this commit the strings were blanked first, so both were
caught. A log line with a URL scheme and an interpolated date is an ordinary thing to write. Fix: in
`swift_code(strings=False)`, also blank the `/` and `*` characters of string literals (no key name contains them, and
offsets stay the same). Or give `uses()` a way to skip its own comment pass for text that is already clean. Add Q8 and
Q8b as mutants.

**F2 (Medium) The unique-name rule stops the fixpoint at the first common name, and common names are the norm here.**
`test_user_granted_files.py:268, 279`. 219 callable names in App and Shared are declared more than once. On the real
tree today, three of the six callers of the openers already fail the rule: `respond` (7 declarations), `resolve` (7)
and `pick` (2). So their callers are never followed. A new scope wrapper hides a read as soon as its name is
shared: an overload (Q1), or a protocol method with a test fake, the usual Swift shape for anything you want to test
(Q7b). The rule also counts the inits of one type as rival callees (Q5 survives; Q5c, the same type with one init, is
killed). `T(` reaches that type's inits and nothing else, so for an init the count should be one per type.
To answer the question in the task: yes, a hiding wrapper still gets through, by three routes: a shared name, a
second init, or a protocol with two conformers.
Fix: drop the uniqueness test, and narrow on what hiding actually needs. Past the first level, follow a unit's
callers only when it takes a closure parameter and the call site passes a closure literal (a trailing closure, or
a `{` inside the argument list). Keep following callers of a returned function type (see F4). I measured the
closure half on the real tree: no first-level caller takes a closure parameter, so the fixpoint stops after one
round with the same 9 units before the same-file step. That means no new false red, and the 541 and 1083 blow-ups
do not happen. I did not measure the returned-function half. Count init uniqueness per type either way. Add Q1,
Q5 and Q7b as mutants, with Q5c and Q7 as controls.

**F3 (Medium, predates this diff) Calls without parentheses are not seen.** `test_user_granted_files.py:236`. The
call pattern is `\bname\s*\(`, so a closure-only API called with trailing-closure syntax, `f.withLastPicked { u in ... }`,
matches nothing (Q3). This hits the first level too, so it applies to an opener directly, not only to wrappers. It
is the idiomatic way to call a scoped API that takes only a closure. Fix: `\bname\s*[({]` for call references. A
computed property of the same name followed by `{` could over-match, which is the safe direction.

**F4 (Low) `passes_scope` reads the signature too loosely in one direction and too narrowly in the other.**
`test_user_granted_files.py:240-252`. Line 252 counts any return type as handing the scope on. The docstring says
"returns a function", but `-> Bool` qualifies too, and that is why `respond`, `pick` and `resolve` pass. Meanwhile
a closure parameter typed by a typealias has no `->` in the signature, so it is missed (Q4). Fix: treat a return
as handing on only when its type is a function type. Resolve the typealiases declared in App and Shared whose right
side contains `->`, and treat `@escaping` as a closure parameter. Add Q4.

**F5 (Low) Two init spellings are still missed.** `test_user_granted_files.py:218, 236`. `let s: PickedScope = .init(u)`
calls the init through type inference and matches no pattern (Q6). `extension Outer.Inner { init(...) }` names
the init `Outer`, because the owner regex takes the first word only, so `Inner(` is not followed. Fix: take the
last component of a dotted owner. For `.init(`, either match `: T = .init(` / `as T` on the same line, or treat a
bare `.init(` in a unit as a call of every scope-opening init (there are few). Add Q6.

**F6 (Info) A wrapper that stores the closure is out of reach of name matching.** Q2: `enqueue` keeps the closure,
and `drain`, which nothing links to `enqueue` by name, runs it inside the scope. No call-graph-by-name fix gets
this without data flow, and I do not ask for one. But `scope_units`' docstring (`test_user_granted_files.py:257-266`)
and s4b's Guard paragraph (`pywidget/docs/release/privacy-label.md:126`) should say the guard follows calls by name,
not stored closures. Then nobody reads a green run as proof for queued or deferred work on a granted file. Add Q2 to
the runner as an expected SURVIVED, so the limit stays on the record.

## Board lines

T-2135 (F1), T-2136 (F2), T-2137 (F3), T-2138 (F4), T-2139 (F5), T-2140 (F6), all owner Idris.
{% endraw %}

</div>
