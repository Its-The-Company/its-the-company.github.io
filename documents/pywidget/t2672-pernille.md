---
layout: "default"
title: "T-2678: review of T-2672 (5944f6aa5), the pinned diff file on the approve path"
section: "documents"
description: "Verdict: not safe to apply the charter (#198) with it yet. The hash binds the applied bytes to the body, which is correct and well built. The gap is between the pinned bytes and the bytes an Investor can actually read\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2672-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 15 · Thu Nov 5</span><span><code>pywidget/docs/reviews/t2672-pernille.md</code></span></div><h1>T-2678: review of T-2672 (5944f6aa5), the pinned diff file on the approve path</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (independent; I read the code and the tests, not the author's notes).
Scope: `tools/apply_proposal.py` (`PIN_LINE`, `pin_lines`, `pinned_patch`, the branch in `handle`) and
`tests/apply_proposal_pin_test.py`. Question asked: can the `Diff file: <path> sha256 <hash>` pin apply anything an
Investor did not approve byte for byte?

Verdict: **not safe to apply the charter (#198) with it yet.** The hash binds the applied bytes to the body, which is
correct and well built. The gap is between the pinned bytes and the bytes an Investor can actually read. The
applier reads local HEAD, and nothing checks that GitHub shows the same file (H1). The body parser also disagrees
with GitHub about what is visible (M1, M2). Fix H1 before #198 applies. M1 and M2 are small and should go in the
same change.

`python3 tests/apply_proposal_pin_test.py`: 16 tests, OK (36.9 s). Probes: 22 cases in
`company-scratch/T-2678-pernille/probe_pin.py` and `probe_pin2.py`. Both subclass the test's `Pinned` fixture and run
only in throwaway repos with the stand-in gh. Nothing was posted to GitHub.

## High

**H1. The pinned bytes come from local HEAD, not from what the Investor reads on GitHub.** `pinned_patch` runs
`git ls-tree HEAD` and `git cat-file blob`. It never compares against `origin/main` or any pushed commit. Nobody
checks a 64-digit sha256 by eye. So in practice the approve covers "the file at that path as GitHub shows it", and
the applier applies "the file at that path at local HEAD". The two drift whenever commits are local and not yet
pushed, which is a normal state here. The body can be edited before the approve without voiding anything. So a hash
updated in the body for a local recommit, with the old file still on GitHub, applies bytes no Investor saw. There
is no edit after the approve and no hash mismatch.

Probe q01: a bare `origin` remote, `origin/main` holds the pinned path with `+A = 3`, local HEAD holds it with
`+A = 2`, and the body pins the `A = 2` hash. Result: `#5: applied`, `tools/x.py` is now `A = 2`, and GitHub's copy
of the file says `A = 3`. Probe p15: the repo has no remote at all, so the file was never readable by anyone outside,
and the pin still applies.

Fix: read the pinned blob from the pushed tree (fetch, then `origin/main:<path>`), require its sha256 to equal the
pin, and require HEAD's blob at that path to be identical. A missing or unpushed file is refused with "push it
first". Better still, put a commit in the pin line (`Diff file: <path> at <commit> sha256 <hash>`) and require that
commit to be an ancestor of `origin/main`. Then the Investor's GitHub link is a permalink to exactly those bytes. Add
a test with a bare remote where the two copies differ (seen red first).

## Medium

**M1. A pin inside an HTML comment applies, and GitHub renders nothing.** `pin_lines` strips code fences but not
``, while `plain_word` and `says_hold` in the same file do strip them. Probe p01: the body is
`**Proposal**: change tools/x.py.` followed by ``. The Investor sees one sentence and no
diff and no pin. Result: `applied`. The same hole already exists for an inline ```` ```diff ```` block inside a
comment (probe p02: applied). This is not new, but a pin is a single short line and much easier to hide than a
200 KB block. Fix: on the approve path, refuse a body that has a `<!--` outside a code fence (closed or not, since an
unclosed `<!--` hides the rest of the page), or strip comments before `diff_blocks`, `pin_lines` and `prose` alike.
The applier's own marks are in comments, not bodies, so the refusal costs nothing.

**M2. The pin parser's idea of a code fence is not GitHub's, so a pin can apply next to a diff the Investor reads as
the change.** The stripper's regex is `^(```|~~~).*?^\1[ \t]*$`, and CommonMark differs from it in several ways:

- p06: a ```` ``` diff ```` block (with a space) renders as a diff on GitHub showing `+A = 9`. `diff_blocks` does
  not count it, so the "pin plus a diff block" refusal does not fire, and the pin applies `A = 2`. The Investor read
  one diff and approved; a different one applied. The same applies to `~~~diff`, ```` ```patch ````, ```` ```Diff ````
  and an indented block.
- p03, p04, p05: a pin inside a 3-space-indented fence, an unclosed fence, or a ```` ```` ```` fence. GitHub shows
  each as an example in a code block, and each applies.
- q02: a line `` ```x``` is the style. `` at column 0 is inline code to GitHub (a backtick fence's info string can't
  hold a backtick). The stripper takes it as a fence opener and hides everything up to the next bare ```` ``` ````.
  With a decoy pin in that span and a real pin after it, the Investor sees two pins, the parser counts one, and it
  applies.

Fix: once a body carries a pin, it should be plain prose plus that one line. Refuse any line that, after up to three
spaces, starts with ```` ``` ```` or `~~~`, and any `<!--`. That is stricter than parsing Markdown and does not
depend on matching GitHub's parser.

## Low

- **L1. A CRLF pinned file fails rather than being refused.** Inline bodies get `\r\n` normalised. Pinned bytes are
  hashed and applied as they are, so a CRLF diff fails `git apply --check` (probe p17: `failed: git apply --check
  failed`). This is safe, but it is a RuntimeError path, not a clean refusal with one comment. Refuse a pinned file
  containing `\r` with a plain reason.
- **L2. The apply record does not name the pin.** The commit message is `Apply proposal #5 (approved by ...)` (the
  test asserts exactly that). It says nothing about which file or sha256 was applied, so the audit trail depends on
  the issue body staying readable. Add `diff file <path> sha256 <first 12>` to the message.
- **L3. The realpath check reads the working tree, not HEAD.** A working-tree symlink at the path refuses a good HEAD
  blob. That is over-refusal only, since the bytes come from the blob, so it is noted and no fix is needed.

## Probed and held (no finding)

- Path: glob `ops/plans/x/*.diff`, pathspec magic `:(top)...`, case change `OPS/...`, `.GIT/config`, `..`,
  absolute path, a committed symlink (mode 120000), a path through a committed symlinked directory, and a path into a
  submodule (160000). All refused as "isn't a file committed at HEAD" or "not a plain relative path". The
  `name != path` check plus the blob-mode check is right. Also, any blob that matches the hash has identical bytes, so
  path tricks cannot change content.
- Hash: uppercase is accepted and lowercased (fine). A 40-digit hash, `sha256:` with a colon, and a malformed line
  that starts like a pin are all refused, not ignored. Tabs, leading and trailing spaces, and a CRLF body line all
  parse.
- File changed after the pin, a working-tree edit, uncommitted, missing, two pins, a pin plus a real
  ```` ```diff ```` block (also inside `~~~`), and an edit after the approve are all refused (existing tests plus
  p18).
- Other approval paths: `pin_lines` is called only in `handle`, and only for a non-merge cid. Under a permission
  (`amend`) it is refused. `handle_auto`, `handle_standing` and file proposals still read `diff_blocks` alone, so a
  pin there is inert prose. The size limit is checked on bytes before decoding, and every check `apply_one` runs on an
  inline block runs on the pinned text.
{% endraw %}

</div>
