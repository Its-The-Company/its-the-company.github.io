---
layout: "default"
title: "T-2152: review of 80804f361 (T-1803 port, #162 part 2: site Approve no longer stacks copies)"
section: "documents"
description: "Approve with findings. The port is faithful and the T-1818 refusals hold. One Medium (finding 3 from Pernille&#x27;s review is still live and has no board line), one Low, two Info."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2152-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2152-idris.md</code></span></div><h1>T-2152: review of 80804f361 (T-1803 port, #162 part 2: site Approve no longer stacks copies)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris, 2026-11-04. Author: Odalys. Read cold: `git show 80804f361`, tools/site/assets/tamper.js,
tests/tamper_note_test.py, tools/site/build.py (JS_BUDGETS), Pernille's review of 5d76fbaa5
(ops/reviews/t1803-tamper-approve-pernille.md). The T-1818 half (f0ec37e00) had no review before this one.

## Verdict

Approve with findings. The port is faithful and the T-1818 refusals hold. One Medium (finding 3 from
Pernille's review is still live and has no board line), one Low, two Info.

## What I ran

- `tests/run.sh tamper_note_test.py site_build_unit_test.py`: tamper_note 79/79, site_build_unit 103/103.
- Shipped tamper.js measured from `site_build.TAMPER_SLIM`: 8,154 B raw / 3,336 B gz against the 8,320 / 3,456 <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>.
  That matches the build.py comment (8,154 / 3,336), so the raise is the measured size plus headroom, not a guess.
- Two probes of my own under osascript JavaScript (scratch, not committed): `next()` on short appends, and an
  Approve and a Move out started together against the test's fake GitHub contents API.

## Port fidelity (5d76fbaa5, f0ec37e00 -> 80804f361)

- `git diff f0ec37e00 80804f361 -- tools/site/assets/tamper.js` is empty: the page code is the <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> code byte for byte.
- tests/tamper_note_test.py: the only difference from the parked tip is the supervisor-order row, where main's
  version (exact `tamper_note.py capture "$GUARD_BASE"` < `file-guard.sh check "$GUARD_BASE"` < record) was kept.
  It is stricter than the parked fallback that accepted either base. Not weakened.
- tools/site/build.py and tests/site_build_unit_test.py: tamper.js (8320, 3456) sits on main's line, and main's
  lanes.js (5632, 2368, T-2058) is kept. The table and the test's literal agree; the loop that measures every
  shipped asset against its cap passes. Nothing else from main was reverted.
- Pernille's review file is identical to b33230e8d/2e7acfb4d.

## T-1818 refusals (checked cold)

`unless()` (tamper.js:96) reads the record: `approve` blocks everything (Approve gets "Already approved",
Disapprove and Move out get "Already approved and applied ... edit the file by hand"); `move-out` blocks only when
`ops/tamper/moved/<id>.json` exists on GitHub; a disapprove, a pending move-out or no record lets the latest answer
through. A read error other than 404 rejects, so the page fails closed ("Not done: ..."), never open. A 404 or an
unparseable record falls to '' (no decision), which is right. Each branch has a test row with its writes asserted
empty, the record text asserted kept, and the mounted button's status text checked. Good tests: they assert on the
fake API's write log, not on the message alone.

## Findings

1. **Medium: a short append that exists anywhere in the file as a whole line counts as applied, and the mistake
   then sticks.** tools/site/assets/tamper.js:33-34 (`next()`). Pernille's finding 3, unchanged by this commit, and
   T-1819 does not exist on main's board: the fix was named but never filed. Probe: an append of `---\n` to
   `title\n---\nbody\n` returns false; an append of `- Bash(git log:*)\n` (to the end of a list) where the same line
   sits in an earlier `deny:` list returns false. Failure scenario: the Investor presses Approve; no file is written;
   the record says approve with `applied: []`; the page says "The change is already in place on GitHub". It is not
   (Commandment 2). Because the record now says approve, every later press answers "Already approved; nothing
   written", so the Investor cannot retry from the site (Amendment 2026-11-03 9:48 PM made the site the way to approve).
   Fix: decide "already applied" by count, not presence: the line block appears in the file now more times than it
   appears in the file the session started from (`f.after` minus the appended `f['new']`). That still catches the
   stacking case (a second copy at any position) and stops matching lines that were there before. Pin it with test
   rows for `---` and for a list item present elsewhere. Fix line T-2157.

2. **Low: the sha that `unless()` read is not the sha `decide()` writes with, so a write between them is not
   refused.** tools/site/assets/tamper.js:89 (`decide` reads the record again) and :96. Probe: Approve and Move out
   on the same item started together; both pass `unless()` (no record), Move out writes its record, Approve writes
   amendments.md and then replaces the move-out record using the fresh sha. End state: file applied, record approve,
   which is consistent; but the Move out page said "Recorded. The company moves the setting ..." and that is false.
   The narrower interleaving (Disapprove's two reads straddling Approve's record write) would put a disapprove over an
   applied file, the exact state T-1818 refuses. Needs two presses on one item within seconds, two tabs or both
   Investors. Fix: carry the sha from `unless()` into `decide()` so GitHub answers 422 to any record written in between,
   and say "Changed since you pressed; reload". Included in T-2157.

3. **Info: a part-applied Approve misreports on retry.** tools/site/assets/tamper.js:112-124. If file 1 is written
   and the write of file 2 fails, no record is written; a second press finds file 1 (a replace edit) no longer
   matching and lists it as "not applied (changed on GitHub since)", though the Investor's own first press changed
   it. Pre-existing, not widened by this commit. Same family as finding 1; worth a test row when T-2157 lands.

4. **Info: Pernille's finding 4 (comment placement) stands.** tools/site/assets/tamper.js:16-19: the T-1803 and
   T-1818 notes sit inside the API list of the header comment. Cosmetic; whole-line comments are stripped from what
   ships, so no bytes are spent.

## Commandments

- 13: independent review; I did not read the author's reasoning beyond the commit message's claims, which I checked
  (79/79, 103/103, tamper.js unchanged from the parked tip, finding 3 unfixed).
- 59: no new write path; the page reads `ops/tamper/decided/<id>.json` and `ops/tamper/moved/<id>.json` and writes
  the same files as before.
- 42: no private data in the page or tests; fixture text is the public 7:16 PM amendment.
{% endraw %}

</div>
