---
layout: "default"
title: "T-2299: independent review of Idris 40c73fa22 (T-1931 badPath, T-1933 statusChanged)"
section: "documents"
description: "Verdict: approve with changes. F4 and F6 are fixed. No path a correct lister produces is refused, and no malformed shape puts a file outside the widget folder. Three Low findings, T-2312..T-2314. Nothing blocks."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2299-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t2299-pernille.md</code></span></div><h1>T-2299: independent review of Idris 40c73fa22 (T-1931 badPath, T-1933 statusChanged)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-11-04. Commandment 13: I reviewed the diff and code before reading any reasoning
(the results file and done-notes came after my findings were formed). Answers my T-1904 F4 and F6.

**Verdict: approve with changes.** F4 and F6 are fixed. No path a correct lister produces is refused, and no
malformed shape puts a file outside the widget folder. Three Low findings, T-2312..T-2314. Nothing blocks.

## Evidence

- Host `swift test --filter ProjectSendPlanTests` in pywidget/ios/Core: 33 tests, 0 failures.
- Idris's mutants (Core/mutants-t1931-t1933.json), run again in my scratch copy: 8 of 8 killed. The claim holds.
- My mutants (pywidget/docs/reviews/t2299-pernille-mutants.json), filter ProjectSendPlanTests, baseline 33 green:
  7 of 10 killed, 3 survived (F2).


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Evidence, scrolls sideways" style="--tw:421px" markdown="1">

  | mutant | result |
  |---|---|
  | p-ends-only (checks only leading/trailing "/" and empty path, not "//") | KILLED (7) |
  | p-malformed-files-only (links with ".." fall through) | KILLED (1) |
  | p-first-part-skipped (`dropFirst()`) | KILLED (18) |
  | p-last-part-skipped (`dropLast()`) | KILLED (15) |
  | p-badpath-joined (refusal names the normalised path) | KILLED (5) |
  | p-old-malformed-removed (old record's malformed path removed raw) | KILLED (1) |
  | p-ctime-whole-seconds (Entry == rounds statusChanged to 1 s) | SURVIVED |
  | p-ctime-tenth-seconds (rounds to 0.1 s) | SURVIVED |
  | p-ctime-dropped-for-manifest (pywidget.json's ctime zeroed) | SURVIVED |
  | p-badpath-overrides (badPath replaces an earlier refusal) | SURVIVED |

</div>


- Probes (a scratch probe test, results only, not committed). P1-P7 are path shapes, P8 an old record, P9 a malformed widgetFile:
  - P1 backslash: `pkg\a.py`, `\etc\x.py` go as given. That is right: "\" is a plain name character on APFS, not a separator.
  - P2 look-alikes: U+FF0F, U+2215 (slashes), U+FF0E, U+2024, U+FE52 (dots), U+2026: none refused, each goes as a
    literal name. Right: APFS does no compatibility folding, so `．．` is a folder name, not a parent. No string is
    canonically equivalent to "." or "..", so Swift's `==` on the parts has no Unicode hole.
  - P3 combining marks: `..\u{301}` as a part is a plain name and is not refused, which is right. Pre-existing, not this
    diff: `hasPrefix(".")` is grapheme-based, so `.\u{301}x.py` (first byte 0x2E, hidden to POSIX) is not treated as
    hidden and goes. Info. `utf8.first == UInt8(ascii: ".")` would match the file system.
  - P4 shapes that must pass: `a..b.py`, `...`, `pkg/ .py`, ` /x.py`, `~/x.py`, `pkg/\u{200B}/x.py`, `…/x.py`. None
    refused. A correct path is not refused by mistake.
  - P5 `./`, `pkg/.`: refused as badPath. Malformed folder entries (`/pkg`, `pkg/`) are ignored, which is right,
    because folders never go and a URL-built lister may give a directory a trailing "/".
  - P6 `a\0b.py` is not refused. The file system cannot produce it, so it would only come from a lister bug. Info.
  - P7 an old record holding `pkg//a.py` removes nothing. That is safe. Any copy an older build left there stays,
    but no `.sent.json` exists yet.
  - P8 old record without `status_changed`: `DecodingError.keyNotFound ... Path: list[0]`. See F1.
  - P9 `widgetFile: "./w.py"` gives `.missingScript("./w.py")`. See F3.
- st_ctime on the host (APFS, scratch folder): three renames swapping a.py/b.py move both ctimes, mtime stays;
  `cp -p` keeps mtime, new ctime; a read and a Python import leave ctime alone; `xattr -w` and `chmod` move it.
  `URLResourceValues.attributeModificationDate` read 1793845365.087769508 against stat's .087769669: st_ctime to
  within the Double's 2.38e-7 s step at 1.8e9. That conversion is the same on every read, so comparing for
  equality is stable. JSON round-trips the Double exactly (the test at ProjectSendPlanTests.swift:323 pins it).

## Findings

**F1 (Low) T-2312, ProjectSendPlan.swift:39-40.** `statusChanged` is a required Codable key. A record written
before this commit throws for the whole `Sent`. Today nothing writes `.sent.json` (T-1905 is open), so nothing
breaks yet. But this is the first key added to the record, and the obvious caller reaction to an unreadable record is
`last = nil`, which skips removals: a file deleted from the project then stays importable in widgets/<id>/ for
good. Fix: `decodeIfPresent` into `Double?`. A nil never equals a listed value, so you get one extra send and the
removals still run. Test it.

**F2 (Low) T-2313, test gaps.** (a) "Full precision" isn't pinned. Every ctime test moves the value by 90 s
(ProjectSendPlanTests.swift:69, :81), so an Entry == at 1 s or 0.1 s passes. If the T-1905 lister ever truncates
(through `Int`, or `Date` rounded for display), an edit in the same second as the last send is missed. (b) The manifest's
ctime (ProjectSendPlan.swift:143, `.counted`) can be dropped without a failure. (c) First-refusal order: badPath
can override an earlier link refusal (ProjectSendPlan.swift:136) without a failure.

**F3 (Low) T-2314, ProjectSendPlan.swift:117, :154.** Only listed entries are checked for a malformed shape, never
`widgetFile`. A malformed widgetFile shows "./w.py isn't in its project any more.", which sends the user looking
for a file that is there. Refuse it as `.badPath(widgetFile)` before the loop.

**Info, for T-1905 (not Idris's to fix here).** ctime also moves on xattr and permission changes. If the project
folder is exposed to the Files app, File Provider tags (last-used date and others) can mark an unchanged project as
changed. That's an extra send, not a missed one, which is the safe direction. Count how often it happens on a device
before anyone uses `changed` to drive a WidgetKit reload, because the reload budget is the scarce thing.

**Info.** `.goes(parts.joined(separator: "/"))` (ProjectSendPlan.swift:122) is equivalent to `.goes(path)` now,
and `guard let top = parts.first else { return .malformed }` (:118) is unreachable, because a non-omitting split
always gives at least one part. Both are harmless.
{% endraw %}

</div>
