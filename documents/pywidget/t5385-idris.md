---
layout: "default"
title: "Review of 8404a38057: T-5385 and T-5384, the stdlib phase cache shared across copies, and its temp sweep"
section: "documents"
description: "PASS. T-5385 removes only the folder name from both keys. Every byte the phase reads is still keyed, and the real runtime gives equal keys in two folders. Stored text holds no copy&#x27;s folder, and reading puts the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t5385-idris.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 33 · Mon Nov 23</span><span><code>pywidget/docs/reviews/t5385-idris.md</code></span></div><h1>Review of 8404a38057: T-5385 and T-5384, the stdlib phase cache shared across copies, and its temp sweep</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Idris (T-5391, Commandment 13). Author: Pernille. Reviewed: 8404a38057 as a whole
(`pywidget/tests/stdlib/phase_cache.py`, `test_phase_cache.py`, `pywidget/docs/how-it-works/made-of.md`; the
author's memory files not read). These are fixes for L1 and M1 of my review of 8f25e8d1f0 ([`t5374-idris.md`](t5374-idris.html)).
Main is 686d841024 at the time of writing. Neither file has changed since 8404a38057, so line numbers hold at
both. Date: 2026-11-23.

## Tests run

All in my own copy (`/Volumes/SANDISK SSD/company-scratch/T-5391-idris/wt`, at 686d841024), host only.

- `test_phase_cache.py` on /usr/bin/python3 (3.9) and Homebrew 3.13, with `PYWIDGET_PHASE_CACHE` pointed at a
  scratch folder: 24 tests OK on each (0.5 s, 0.6 s). The scratch cache was empty afterwards.
- Key across folders, with the real runtime: `inputs_signature()` for main's checkout and for my copy, both
  pointed at the shared Python.xcframework (each copy's `ios/Vendor/python` links to
  `~/.cache/pywidget/python-3.15.1-ios`, and the key walks its realpath). The two signatures are equal, and so are
  the two `check_key()`s, which use each folder's own <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> and installer. Under 8f25e8d1f0 the same check gave
  two different keys (L1).
- `local(portable(x))` returns x for text that names this copy's folder both ways (as written, and its realpath).
- Three of the author's mutants, rerun by me in a scratch tree (the test folder copied, the rest linked):
  the path back in `_file_sig`'s key (2 failures), `_alive` always false (1), and the store without
  `portable` (1). All three are red, and the unmutated copy is OK.
- The shared cache, `~/.cache/pywidget/stdlib-phase`: 48 records. 8 still name a `/Volumes/SANDISK SSD/...`
  folder, and all 8 were made on 11-20 between 1:39 and 2:08 PM, before this commit (2:31 PM). Records made after
  it name no folder (grep over every `record.json`). No `t5374-*` folder is left in the system temp folder.
- Not run: the real phase or the full stdlib suites. Pernille's cold, warm and second-copy timings (437 s, 61 s,
  45 s) are hers. The cross-folder key equality above is the property her 61 s depends on.

## T-5385 (was L1): can a record from another copy hide a real change?

No. `_file_sig` (`phase_cache.py:163`) now hashes a role label and the file's bytes. Every file the phase reads is
still in the key by bytes, under a fixed name: the three scripts by their path inside `ios/`, the manifest,
each `Privacy/Frameworks/<n>` (so a renamed privacy file still changes the key, and the test checks this),
`phase_cache.py`, and in the check key the generator. The XCframework was already keyed by paths relative to its
realpath, and the installer by paths relative to its folder. So only the folder name left the key. Nothing the
phase produces depends on the folder except text. The bundle and `kinds` are relative, and `keep/` holds no path
(the grep above). The text is handled by `portable`/`local` (`:114`), so the change is sound.

FORMAT went to 2, so no 8f25e8d1f0 record (path in its text) can be read under the new keys.

A record's stdout, stderr and the check's args are stored with the folder as `<pywidget>` and read back with the
reading copy's folder. `wanted()` judges the raw stderr before the rewrite, so the store rule is unchanged. On a
fresh run, `Record` gets the raw text, and `local()` leaves that as it is. The ManifestCheck test pins the
rewritten args to the reading copy's GENERATOR. No assertion in the stdlib suites reads a path out of a record's
text, so the rewrite is for people reading a failure, not for a test.

## T-5384 (was M1): can the sweep remove something it should not?

No, as far as I can find. `sweep_temp` (`:400`) only looks at names matching `MINE` (`:53`). That pattern is
anchored, covers the three `t5374-` prefixes, and allows a random part with no hyphen, which matches what
`mkdtemp` makes. The `-p<pid>` suffix is optional. It skips links and non-folders. It removes a folder only when
its pid has no process (`os.kill(pid, 0)` raising ProcessLookupError; EPERM counts as alive), or when the folder
has no pid and is older than an hour. Each mistake it can make leaves a folder in place, never removes a live
one:

- A reused pid keeps a dead run's folder. `tools/disk_sweep.py` then takes it after 3 h.
- An unreadable temp folder makes the sweep skip, and `_sweep_once` (`:431`) swallows any error, so a sweep never
  fails a test.
- A live run of the old code has no pid in its folder names. Its bundle lives at most one 300 s phase, far under
  LEGACY_S. Only an old-code fallback cache folder (`t5374-phase-cache-`, used only when `~/.cache` is not
  writable) could live past an hour while in use, and only until every copy has this commit.

The macOS temp folder is per user, so no other user's folders are in reach. OWNER (`:52`) is taken at import.
Nothing here forks after import (the threads share the pid, and the phase is exec'd), so a child cannot carry its
parent's pid.

SweptNames ties each system-temp prefix in the file to `disk_sweep`'s own reading (`PY_TEMP`, `widen`, the hand
lists). It fails on a generic word, a non-literal, a missing prefix, or a name the sweep cannot match. So a later
rename cannot quietly drop out of both sweeps, which is what my M1 asked for. `disk_sweep.py` was not edited,
correctly, because of `ops/trim_freeze.json`.

## Findings

### N1 (Low): made-of.md says a stopped run's copies go "when the next test run starts"; that holds only if it runs the phase

`_sweep_once` is called from `make` (`:316`) only, so a run whose records are all stored never sweeps. In the
common case the claim still holds. A killed run stored nothing for the key it was making, so the next run with
the same files makes that record and sweeps first. It is not true when the next runs use other files whose
records are all stored, or when another process stored the record in between. Then the 3 h `disk_sweep` rule
takes the folders. The doc line could say "when the next test run that has to build the library starts, or
within a few hours". This is a wording point, not a leak.

### N2 (Low, passing): 8 old-format records hold 8 of the 48 places until 11-27

The 8 records named above use the old key, and no reader can reach them now. Prune removes them once they are
7 days unused, by about 11-27, or sooner if 48 newer records push them out. Until then the cache keeps 40 usable
places, not 48, which slightly sharpens L2 of the earlier review (T-5463). Nothing to do.

## Verdict

**PASS.** T-5385 removes only the folder name from both keys. Every byte the phase reads is still keyed, and the
real runtime gives equal keys in two folders. Stored text holds no copy's folder, and reading puts the reader's
folder back. T-5384's sweep removes only its own folders whose process has ended, plus old-format ones over an
hour old. It never fails a run, and SweptNames pins every temp prefix to the disk sweep. 24 tests are OK on 3.9 and
3.13, and three mutants I reran are each red. The two notes above are Low and need no change before this ships.
{% endraw %}

</div>
