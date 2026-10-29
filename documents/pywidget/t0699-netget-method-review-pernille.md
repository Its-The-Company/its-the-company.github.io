---
layout: "default"
title: "T-0699: review of 0c464a26 (T-0698), net.get escapedSize and the cold peak method"
section: "documents"
description: "Approve; merge. No Critical, High or Medium. 4 Low, 2 Nit. Nothing here blocks TestFlight."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0699-netget-method-review-pernille.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0699-netget-method-review-pernille.md</code></span></div><h1>T-0699: review of 0c464a26 (T-0698), net.get escapedSize and the cold peak method</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Pernille, 2026-10-29. Seen: the diff of 0c464a26 and the T-0699 board line, nothing else of the author's.

## Verdict

**Approve; merge.** No Critical, High or Medium. 4 Low, 2 Nit. Nothing here blocks TestFlight.

- `escapedSize` is exact, not just an upper bound, for every scalar I could throw at it on the iOS 27.0 Simulator, through every charset path I tried. It never undercounts.
- The `.generated` stub and the cold mode do what C2 s6a says they do. The table matches the samples to the hundredth.
- run-cold.sh's guard stops on a missing sample, an extra sample and a red run. The Swift guard that stops an unknown case name from falling through to the warm run is correct.

## What I ran

1. `tools/xc.sh ... -destination "platform=iOS Simulator,name=iPhone 17" test -only-testing:PyWidgetTests/NetFetchTests`: **22 tests, 0 failures**, TEST SUCCEEDED (ops/runs/xcodebuild-20261029-111137.log). That includes the new `testANewlineDenseBodyThatFitsIsNotRefused` and the equality form of `testEscapedSizeBoundsTheBuiltReply`.
2. Simulator probe (reproduced below; built with `xcrun -sdk iphonesimulator swiftc -target arm64-apple-ios27.0-simulator`, run with `simctl spawn` on the booted iPhone 17, iOS 27.0 build 24A434). It uses verbatim copies of `escapedSize` and `text(_:charset:)` from 0c464a26, and it compares each against `JSONSerialization.data(withJSONObject: [s], options: [.withoutEscapingSlashes]).count - 2`:
   - Every BMP scalar except surrogates (U+0000-U+FFFF), plus non-BMP every 4096th, U+1F68B and U+10FFFF, each repeated 3 times: **63,746 equal, 0 over, 0 under**. That set covers `/` (written raw under `.withoutEscapingSlashes`), U+007F, the C1 controls U+0080-U+009F, U+2028/2029 (written raw, 3 bytes), U+FFFD and astral scalars (4 bytes raw).
   - `text()` with charsets utf-8, iso-8859-1, windows-1252, us-ascii, utf-16/le/be, utf-32, shift_jis, euc-jp, gb18030, big5, koi8-r and macintosh, on all 256 bytes, 4 KiB of random bytes and hand-made lone-surrogate byte pairs: worst `escapedSize - built` = **0** on every one.
   - Lone surrogates: see L1. `escapedSize` does not undercount there, because nothing gets built at all.
3. Host check of run-cold.sh, using a copy in a fake tree whose `tools/xc.sh` writes 0, 1 or 2 lines and exits 0 or 65: one line and exit 0 continues (4 lines after 2 rounds x 2 cases). No line, two lines or exit 65 each **exit 1** with the right message. A relative `OUT` exits 1 (L3).
4. `python3 summarize.py cold-t0698.jsonl` reproduces cold-t0698-table.md exactly. 55 lines, all tagged with the T-0698 stub and `cold`. 37 of them are `ext` (6+7+6+6+6+6), which matches "largest of 37". The C2 s6a numbers (4.19, 3.34, medians 0.4-3.3, old bad bodies 11.2-17.4) all match the table.

## Findings

### L1 (Low): a body that decodes to a lone surrogate gives an empty reply, and Python gets RuntimeError, not PyWidgetError

- Where: `pywidget/ios/Shared/NetFetch.swift:124` (`(try? JSONSerialization.data(...)) ?? Data()`), fed by `text(_:charset:)` at :192-201. The code predates this diff. I found it while checking item 1's "every charset path".
- Scenario: a server answers `Content-Type: text/plain; charset=utf-7` with body `+2AA-` (UTF-7 for U+D800). `String(data:encoding:)` returns an NSString-backed String that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the lone surrogate. Its Swift views show U+FFFD, so `escapedSize` says 5. `JSONSerialization` throws on it on iOS 27.0, the `try?` turns that into a **0-byte reply**, and `device.parse_reply` raises `RuntimeError("net.get: the device reply is not JSON")`. That is outside C2's error contract ("anything else: PyWidgetError"), so a script's `except errors.PyWidgetError` misses it. Only `utf-7` and `unicode-1-1-utf-7` did this out of 26 charsets tried. Every UTF-16 and UTF-32 path repairs or refuses the bad data before it gets this far.
- Fix: in `text()`, normalise a charset-decoded string to native UTF-8 (`String(decoding: Array(s.utf8), as: UTF8.self)`, which turns a lone surrogate into U+FFFD, as the docs promise). Separately, in `reply()`, make a failed build of a `.success` answer a `PyWidgetError` reply ("the answer from <host> could not be passed as text"), not empty Data. Add a test: `charset=utf-7`, body `+2AA-`, expect `ok` with text "\u{FFFD}".

### L2 (Low): C2 s6a's exclusions leave out the charset path, and two phrases read stronger than the evidence

- Where: `pywidget/docs/research/C2-device-api.md:283`.
- (a) Every stub row is `Content-Type: text/plain` with no charset, so all 55 samples take the `String(decoding:as: UTF8.self)` path. A server that names a charset goes through `String(data:encoding:)`, which gives an NSString-backed (UTF-16) string. That costs differently: about 2 bytes per unit for Latin text, and `escapedSize` and `JSONSerialization` then walk foreign storage. "Still left out" names only the HTTP/TLS stack. Fix: add "bodies with a named charset (the `String(data:encoding:)` path)" to the exclusions, or take one cold `iso-8859-1` 0xFF sample in T-0687.
- (b) "So in the extension the largest of 37 cold samples is 4.19 MiB": the samples were taken in the app under the extension's limits, and the paragraph above says so. This summary sentence is the one people will quote, though. Fix: "under the extension's limits (measured in the app)".
- (c) "which errs high": the queued-chunk effect is plausible but was not measured against real transport, which also delivers bursts and has its own buffers. Fix: "which may err high".

### L3 (Low): run-cold.sh's documented `OUT=file.jsonl` cannot work as a relative path

- Where: `pywidget/docs/reviews/t0691-evidence/run-cold.sh:2,9,11`.
- Scenario: `OUT=new.jsonl run-cold.sh 1 "ext ascii"`. The script `cd`s to `pywidget/ios` and counts lines there. The test runner opens the same relative name from its own working directory (my fake wrote to `/tmp/rel.jsonl`), so the count stays 0 and the script exits 1 on the first sample. This fails closed and no bad data gets in, but the usage line suggests exactly this call.
- Fix: before the `cd`, add `case $OUT in /*) ;; *) OUT="$PWD/$OUT";; esac`, and show an absolute path in the usage line.

### L4 (Low): a red run's sample stays in OUT

- Where: `run-cold.sh:20-24`, with the test writing the line at NetFetchTests.swift:482-483, before its outcome assertion at :484-485.
- Scenario: a case whose outcome assertion fails (e.g. `ext binary` comes back `ok` after a <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> change) appends its line, then xc.sh exits 65. The script stops, correctly, but the line stays in `cold-t0698.jsonl` and `summarize.py` counts it with the rest.
- Fix: on a non-zero status, when the file grew by one line, drop that last line (`sed -i '' '$d' "$OUT"`) or move it to `$OUT.rejected`. Or have the test write the line only after its assertion.

### N1 (Nit): net.py's help says a control character counts six bytes, "(a tab, newline or carriage return two)"

- Where: `pywidget/ios/App/Runtime/pywidget/net.py:24`. Backspace and form feed are 2 bytes too. The text errs high, so nobody gets refused by surprise. Add them, or say "most control characters six".

### N2 (Nit): the equality test could cover more than ASCII

- Where: `NetFetchTests.swift:270`. My probe shows equality over the whole BMP on iOS 27.0. Looping `0...0xFFFF` (skipping surrogates) costs under a second and would catch a future OS that starts escaping U+2028/2029 or DEL.

## Item 2 in detail: does the cold mode measure what C2 s6a says?

- The body is made after the reset. `.generated` stores only (byte, count, chunk) at `NetStub.set`, and `startLoading` makes each `Data(repeating:count:)` (NetFetchTests.swift:37-46). `startLoading` runs from `DeviceRouter.handle`, which the handler calls after `box.mark()` resets the interval. Correct.
- The chunks are 16 KiB (`16 << 10`), and `Loader.didReceive` appends each one to `body`. The Loader never reserves from Content-Length (which the stub does not send anyway), so the stub and real transport both grow `body` by appends. Correct.
- The session is made at the call. In cold mode the handler assigns `NetFetch.session = makeSession(protocolClasses: [NetStub.self])` after `mark()`, and nothing in the cold path touches `NetFetch.session` before that. `run(session: nil)` then reads the new session through the getter. Correct. In a real fresh extension the lazy getter makes it at the same point.
- Guards: an unknown or empty `T0691_CASE` fails the assertion and returns before any write. A missing `T0691_OUT` fails at `XCTUnwrap` before writing. So `$T0691_OUT` is never overwritten by the warm run. Correct.
- The claim is "largest of n samples, not a bound", and the evidence supports it. The exclusions are named (L2a adds one).

## Probe source (item 1)

```swift
// escapedSize and text(_:charset:) copied verbatim from NetFetch.swift @ 0c464a26, then:
func built(_ s: String) -> Int? {
    guard let d = try? JSONSerialization.data(withJSONObject: [s], options: [.withoutEscapingSlashes]) else { return nil }
    return d.count - 2
}
for v in UInt32(0)...0x10FFFF {                      // BMP in full, astral sampled
    guard let u = UnicodeScalar(v) else { continue }
    if v > 0xFFFF && v % 4096 != 0 && v != 0x10FFFF && v != 0x1F68B { continue }
    let s = String(repeating: String(u), count: 3)
    // compare escapedSize(s) with built(s)
}
// L1 repro: text(Data("+2AA-".utf8), charset: "utf-7") -> built(...) == nil; reply() bytes == 0
```
{% endraw %}

</div>
