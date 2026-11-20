---
layout: "default"
title: "Review of d2fefc0c: T-4575, a Shortcut link with more than a name is shown as a Link"
section: "documents"
description: "The fix is what M2 asked for, and it is the right shape. shortcutName (Shared/LauncherSlots.swift:146-151) gives a name only when shortcutLink(named:) builds exactly the same string back (:149). That single comparison\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t4575-d2fefc0c-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span><span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> · Fri Nov 20</span><span><code>pywidget/docs/reviews/t4575-d2fefc0c-pernille.md</code></span></div><h1>Review of d2fefc0c: T-4575, a Shortcut link with more than a name is shown as a Link</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille (T-4939, Commandment 13). Author: Idris. Reviewed: d2fefc0cc6 as a whole (Shared/LauncherSlots.swift,
Tests/Core/LauncherEditorTests.swift), against the T-4575 and T-4185 board lines and my M2 in
docs/reviews/t3664-pernille.md, which this commit fixes. The author's memory and handoff notes were not read. Also read,
for what the change sits inside: LauncherTarget whole (`check`, `refusal`, `evaluate`, `shortcutLink`,
`hasUnsafeCharacter`), `LauncherCatalog.way(of:)`, `LauncherSlotStore.save` (it stores `check(url).absoluteString`), the
tap's open path (`:275`), and the editor's `fill()`, `builtURL`, `save()` and `subtitle` (App/Launcher/LauncherEditor.swift).
Line numbers are at ec63ed6caf (main). Since d2fefc0c only fc31b49a8e (T-4574) has touched these files, in the test
file's header and plist test, not in the lines cited. Paths are under pywidget/ios/. Date: 2026-11-20.

## Tests run

- MacBook runner: `XC_TASK=T-4939 tools/xc.sh ... -only-testing:PyWidgetTests/LauncherEditorTests
  -only-testing:PyWidgetTests/LauncherSlotsTests test`, job J-20261120-0224-xc-test at ec63ed6c, iPhone 17e Simulator,
  Xcode 27.2. Passed: 52 executed, 0 skipped, 0 failures, 82.2 s (result.json on origin/macbook-results). The new
  `testAShortcutLinkWithMoreThanANameIsALink` ran in that job, so the round-trip holds under iOS's `URL(string:)`
  and not only under the host's Foundation.
- Host, scratch worktree, `swift test` in Core: 29 LauncherEditorTests + 1 probe executed, 1 failure,
  `testTheBuiltPlistCarriesTheBundledListOnlyInALauncherBuild` ("not hosted in the app"). That test is T-4574's and
  must be app-hosted; it is not this commit's. Core does not build on main without help: I had to replace its
  `LauncherEditorGate.canBeOn`, which only the App target defines, in the scratch copy (board line T-4906). The new test
  and the two older Shortcut tests passed.
- Host mutants. Each was planted in `Shared/LauncherSlots.swift` in the scratch copy and run with the filter
  `LauncherEditorTests/test(AShortcut|ASavedURL)` (the three Shortcut and display tests):
  (A) round-trip guard replaced by `true` (the old behaviour): 10 failures, all in the new test. KILLED.
  (B) the comparison made case-insensitive: 2 failures in the new test (the `%c3%a9` link). KILLED.
  (C) `&` no longer encoded by `shortcutLink`: 2 failures, both in the older `testAShortcutNameBecomesItsLinkAndBack`;
      the new test passed. KILLED by the suite, but not by the new test (L2).
  (D) `shortcutLink` no longer trims: 4 failures (2 new test, 2 older). KILLED.
  (E) guard weakened to `url.hasPrefix(shortcutLink(name))`: 2 failures in the new test. KILLED.
  My first run of all five was stopped at my shell's 10-minute limit while E was running. I restored the file and
  ran E alone; the result above comes from that second run.
- Host probe, a scratch-only test that does not land: 16 links and 16 names. Its results are under "Checked and fine"
  and in L1.
- No phone run. Nothing here shows what the Shortcuts app does with a link; that stays with #192 (editor.md s11).

## Verdict: PASS with findings

The fix is what M2 asked for, and it is the right shape. `shortcutName` (`Shared/LauncherSlots.swift:146-151`) gives a
name only when `shortcutLink(named:)` builds exactly the same string back (`:149`). That single comparison guarantees
the property for every saved link: a slot is shown and edited as "Shortcut · n" only when its stored url is exactly
`shortcutLink(n)`. So the link a tap opens, the link an untouched edit saves again (`LauncherEditor.swift:483`, with
`fill()` at `:745`), and the name on the row are always the same thing. Every other form becomes a Link:
`&input=text`, a second `name=`, a `#fragment`, a raw `+`, a padded or lower-case-encoded name, a `;` parameter, a
different scheme case, or a `/` before the `?`. In Link mode `fill()` keeps the url verbatim (`:747`) and the row shows
the whole link (`LauncherCatalog.way(of:)`, `:497`), so an edit can no longer rewrite it. Every link still passes
`check` when it is saved and again when it is opened (`:275`, `:319`). This commit does not touch `check`, so it opens
no scheme that was refused before.

The encoder is sound for a standard parser. I probed 16 names: `&+=?#`, `%`, `;`, `/`, `'`, quotes and brackets, CJK,
emoji, NFD, a newline and a bidi override. For each, `URLComponents.queryItems` of the built link is exactly one item,
`name`, equal to the name. `URL(string:).absoluteString` gives the link back unchanged, so what `save` stores is what
was built.

There are two Low findings. L1 is older than this commit.

## Findings

### L1 (Low): a Shortcut name with control or format characters is shown as a name

- Where: `Shared/LauncherSlots.swift:146-151`, and `:134-140`, which encodes these characters.
- Probe: `shortcuts://run-shortcut?name=%E2%80%AEgoL` comes back as `.shortcut("\u{202E}goL")`. The right-to-left
  override reverses it, so the list row draws "Shortcut · Log" while the link runs a Shortcut named U+202E + `goL`.
  `name=Log%0AX` comes back as `.shortcut("Log\nX")`, a newline inside a one-line field. `check` refuses a raw control
  character in a link (`hasUnsafeCharacter`, `:156`), but not the same character once it is percent-decoded into a
  name.
- Why it is Low: the editor shows a pasted link in encoded form, Link mode, before it is saved. Shortcuts runs only
  Shortcuts the person has. The behaviour predates d2fefc0c. But the row is the one place where a person checks what a
  slot opens, and a name that draws as another name is the kind of mismatch this line exists to stop. A slots.json
  written by anything other than the editor could also carry such a link.
- Fix: in `shortcutName`, return nil (Link, whole url shown) when the decoded name contains a scalar that
  `hasUnsafeCharacter` would refuse, or a bidi or zero-width format character (U+200B-U+200F, U+202A-U+202E,
  U+2066-U+2069). Add a Core case for the two probe links.

### L2 (Low): the new round-trip loop cannot catch an encoder fault by itself

- Where: `Tests/Core/LauncherEditorTests.swift:127-132`.
- The second loop builds a link with `shortcutLink` and reads it back with `shortcutName`, which calls `shortcutLink`
  again. An encoder that leaves `&` or `#` raw builds the same wrong link both times, so the loop passes. Mutant C shows
  this: with `&` left unencoded, the new test passed, and only the older exact-string assertion (`:88-89`) went red.
  The suite as a whole catches it; the new test alone is weaker than its name says.
- Fix: in that loop, also assert what a standard parser reads from the link:
  `URLComponents(string: link)?.queryItems == [URLQueryItem(name: "name", value: name)]` (the probe's check). Then
  mutant C would turn the new test red as well.
- For the #192 phone list (T-3765), since only the Shortcuts app can answer it: test a Shortcut whose name contains
  `;` and `+`. The encoder leaves `;` raw (`:138`). Foundation does not split on `;`, but I do not know whether
  Shortcuts' own parser does. If it does, `name=a;b` would run `a`.

## Checked and fine

- The M2 case itself: `name=Log&input=text&text=hi` is `.link` with the whole url, and Edit opens it in Link mode with
  the url unchanged. A raw `+` (`name=a+b`) is a Link; `a%2Bb` is the Shortcut `a+b`.
- Two names in one link (`name=Log&name=Other`) is a Link. `name=Log%26name%3DOther` is the single Shortcut
  `Log&name=Other`, and its built link parses to that one item.
- Bad escapes (`%ZZ`, `%FF`): `removingPercentEncoding` is nil, so Link. A double-encoded name (`Log%2520`) is the
  Shortcut `Log%20` and is built back the same, which is consistent.
- Swift's `==` compares strings by canonical equivalence. The built link is pure ASCII, because every non-ASCII scalar
  of a decoded name is percent-encoded, so a url with a raw non-ASCII character can never equal it. In the probe, a raw
  Kelvin sign (U+212A, which normalises to `K`) is a Link. NFD names round-trip as NFD.
- `!name.isEmpty` at `:148` is now redundant (`shortcutLink("")` is nil and never equals a url). It is harmless.
- Links the editor built before this commit still round-trip, so no saved slot changes from Shortcut to Link.
- Display only: a pasted link with lower-case hex escapes (`%c3%a9`) now shows as a Link rather than a Shortcut. That
  is the safe side, and the link opens as before.

## Board lines

- T-5268 (L1, L2): hide control and format characters in a Shortcut row's name, and make the round-trip test parse
  the link (Idris, P3).
{% endraw %}

</div>
