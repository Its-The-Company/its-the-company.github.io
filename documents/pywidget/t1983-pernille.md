---
layout: "default"
title: "T-1983: review of 6edcfd497 (Idris, T-1910/T-1911/T-1946), AgeLine"
section: "documents"
description: "Verdict: approve with changes. No High, no Medium. The three findings it was answering are closed. Three Lows below."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t1983-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 14 · Wed Nov 4</span><span><code>pywidget/docs/reviews/t1983-pernille.md</code></span></div><h1>T-1983: review of 6edcfd497 (Idris, T-1910/T-1911/T-1946), AgeLine</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Pernille, 2026-11-04. Independent review (Commandment 13). Judged from the diff and from runs, not from the commit notes.

**Verdict: approve with changes.** No High, no Medium. The three findings it was answering are closed. Three Lows below.

## What I ran

A scratch copy of HEAD (`git archive HEAD pywidget/ios`, in `company-scratch/T-1983-pernille`), host only, `pywidget/ios/Core`:

- `swift test --filter AgeLineTests`: **47/47 pass**. The same under `TZ=America/Santiago`, `Pacific/Kiritimati`, `Asia/Tokyo` and `UTC`: 47/47 each, so no test depends on the host's zone.
- `tools/mutation_check.py . mutants-t1793.json --filter AgeLineTests`: baseline 47 green, **53/53 killed**.
- Six mutants of my own (not committed, kept in the scratch copy as `extra.json`): 3 killed, 3 survived (F1, F2).

## The earlier findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The earlier findings, scrolls sideways" data-n="4" style="--tw:1127px" markdown="1">

| Finding | Status | How I checked |
|---|---|---|
| t1840 F1 (field selection had no code or test) | **Closed**, option (a) | `Field.drawnAt(now:)` drops never fetched, `cleared`, and `now >= until`. Tests cover each of those, past `max_age_s` before `until` (example 5), `stale_after: 0`, and the `until` instant itself on both sides. Mutants `field-cleared-counts`, `field-until-*`, `field-trusted-t1840`, `stale-after-zero-unset` and my `|| fields.isEmpty` are all killed. |
| t1840 F2 (example 6 widths and comment) | **Closed** | 166.8 / 93.0 / 35.8 at xxxLarge. Example 6 now passes the `steps` field. That field is at 23:50 and `sampled_at` is 9:02 on the same Monday, so the assertion on `date` really does tell "steps counted" apart from "steps dropped". |
| t1859 F1 (the UTC calendar line was invisible from a New York host) | **Closed for the deleted line** | `utc-calendar-zone-dropped` (6 failures) and `local-zone-dropped` (4) are both committed and killed. A smaller version of the same gap remains: F1. |

</div>


Against s10 (c) "Which time" and bound-fields s6: the rule in the code is the rule in the spec. A field counts when it is drawn with its value, the script counts when `stale_after` is set (0 included), with no drawn field `sampled_at` is used, and with no `sampled_at` there is no line. All six worked examples are tested by name, through `line`.

## Findings

### F1. Low. Setting the phone's zone through `TimeZone.current` still passes on a New York host.
`AgeLine.swift:77`, `Tests/Core/AgeLineTests.swift:175-196`. The T-1946 test moves `NSTimeZone.default`. Its own fixture comment (line 180) says `TimeZone.current` does not follow `NSTimeZone.default`. So the edit `utc.timeZone = .current`, the natural way to "tidy" the force-unwrap, **survives: 47/47 on this host**. The same goes for `.autoupdatingCurrent`. Under `TZ=America/Santiago` the same mutant **fails 4 tests** (lines 155, 156, 185, 187). On a phone in Santiago, Havana or Cairo, that edit brings back the bug from T-1837 F2, where yesterday reads as the time. `Calendar.current` and the deleted line are both caught; only this variant is not.
Fix: in the test's loop, also move the process zone itself: `setenv("TZ", z.identifier, 1); NSTimeZone.resetSystemTimeZone()`. Restore the old `TZ` (or `unsetenv`) and reset again in the `defer`. On this host, a small Swift probe showed that `TimeZone.current` follows this (New York, then Havana). Then add `utc-zone-current` (`utc.timeZone = .current`) to `mutants-t1793.json`.

### F2. Low. A `cleared` field is tested only without `until`.
`AgeLine.swift:41`, `Tests/Core/AgeLineTests.swift:351-356`. Mutant: `cleared` is honoured only when `until == nil` (`guard let at else ...; if let until, now >= until {...}; if cleared, until == nil { return nil }`). It **survives**. The test's cleared field has no `until`, so a reorder that lets a cleared sensor field with `until` still ahead count its old time is not seen. That field draws "--", and the line would still date it.
Fix: give the cleared field in `testAFieldClearedByDeclaredHasNoAge` an `until: tonight` (or add a second one with it), and commit the mutant.

### F3. Low. Two meanings of `now` for the same face.
`AgeLine.swift:51` says `now` "is the entry's date". `WidgetFaceRule.swift:53` (`Facts.now`, the clock the stale mark reads) says "the entry's date, or now if that is later". `Field.drawnAt` (line 39) says the drawing asks it too, "so the face and the line agree". That only <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> if T-1440 passes the same `now` to both. If WidgetKit draws an entry late, after a `steps` field's `until`, the face's rule says "--" while the line, at the entry date, still dates `steps`.
Fix: one sentence in the `time`/`line` doc saying `now` is the same moment as `WidgetFaceRule.Facts.now`. Also add an acceptance item to T-1440: one `now` feeds the face rule, `drawnAt` and `AgeLine.line`.

## Not in scope, noted

- `AgeLine` still has no caller outside the tests (grep over `pywidget/ios`). That is expected until T-1440, and it was the reason for t1840 F1 (a): the rule is now whole and host-tested.
- `WidgetFaceRule.isStale` reads only T(tree). There is no T(field) clock yet, so example 5's stale mark ("since 1:50") does not exist in code. The line's rule is ready for it, and that clock belongs to the bound-fields build, not this commit.
{% endraw %}

</div>
