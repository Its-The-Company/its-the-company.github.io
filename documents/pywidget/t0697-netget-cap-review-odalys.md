---
layout: "default"
title: "T-0697: review of 5d4754b8 (T-0691, net.get reply cap)"
section: "documents"
description: "Verdict: ship. The cap code does what it says. One Medium on how the measurement is described, to fix before T-0687 or anyone sizing the extension uses the 3.55 MiB number. Counts: High 0, Medium 1, Low 3."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0697-netget-cap-review-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 8 · Thu Oct 29</span><span><code>pywidget/docs/reviews/t0697-netget-cap-review-odalys.md</code></span></div><h1>T-0697: review of 5d4754b8 (T-0691, net.get reply <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Reviewer: Odalys, 2026-10-29. I read the diff, the board line, the current `Shared/NetFetch.swift`, `App/Device/NetCall.swift`, the NetStub in `ios/Tests/NetFetchTests.swift`, C2 s1.7 and s6a, and the runner and raw results the diff adds (`run-cold.sh`, `summarize.py`, `cold.jsonl`, `cold-table.md`, `test-results.txt`). I did not read the author's notes or done-note.

Verdict: **ship.** The cap code does what it says. One Medium on how the measurement is described, to fix before T-0687 or anyone sizing the extension uses the 3.55 MiB number. Counts: High 0, Medium 1, Low 3.

## What I checked, and the numbers

1. **escapedSize is never below what JSONSerialization writes.** I checked this on the host, not only by reading. I copied `escapedSize`/`replySize` verbatim into a standalone Swift program (macOS 27 host Foundation, `[.sortedKeys, .withoutEscapingSlashes]`, the same options as `reply`). This is the host's Foundation, not the iOS 27 Simulator's. Both are swift-foundation, but that is a proxy.
   - Every Unicode scalar U+0000-U+10FFFF except surrogates, each tried as a run of three: 1,112,064 strings, 0 counted below the real size, 0 serialization failures. The largest overcount was 12 bytes per 3 characters, which is the 2-byte escapes counted as 6 (see L1).
   - The only scalars at or above 0x20 that JSONSerialization does not write as plain UTF-8 are `"` and `\`. With slashes left unescaped, `/` is written as is. U+007F, the C1 controls U+0080-U+009F, U+2028 and U+2029 are written as plain UTF-8, so the count is exact for them.
   - Charset paths through the same `CFStringConvertIANACharSetNameToEncoding` + `String(data:encoding:)` code as `NetFetch.text`. I tried 15 byte sequences: a lone high surrogate, a lone low surrogate, a BOM followed by a lone surrogate, and a surrogate in UTF-32 (UTF-16LE/BE, utf-16, utf-32be); a valid surrogate pair; odd-length UTF-16; CESU-8 surrogate bytes and an overlong `C0 AF` in UTF-8; C1 bytes in windows-1252 and iso-8859-1; iso-2022-jp; shift_jis. Every unpaired surrogate came back as U+FFFD (a Swift String cannot <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> one). None of them was undercounted and none threw. So the `?? Data()` empty reply is not reachable from these.
   - Numbers: `replySize` adds a fixed 64 bytes. The built wrapper is 42-61 bytes for status 0, 200, 999, Int.max and Int.min. 40 headers, each with control characters, `"`, `\`, `/`, U+007F and U+2028: 1057 counted against 1034 built. Booleans and null never appear in the ok reply. The error reply carries no cap (`cap` defaults to Int.max) and is small.
   - 2000 random strings mixing the full scalar range and Latin-1: the smallest margin (count minus built) was 0, so the count never fell below the built size.
   - The second check (`data.count > cap` once the reply is built) makes the cap hold even if the count were ever low. Its only cost would be one extra reply-sized buffer.
2. **The limits are the process's own.** The only production caller is `NetCall.handle` -> `NetFetch.run(call.payload)`, which passes no limits, so it uses `limits` -> `inExtension` (`Bundle.main.bundleURL.pathExtension == "appex"`). Inside the widget extension `Bundle.main` is the `.appex` bundle, so it gets `.widgetExtension`. Only tests set the override. Nothing in this commit runs inside the extension yet (T-0675), so detection inside an appex is unexercised (L2).
3. **The refusal names the host only.** `tooBigAsText(req.host, size, cap)` and `tooBig(host, cap)` take `req.host`, which comes from `URLComponents.host`. For `https://user:(email withheld):8443/p/secret?key=s#f` it is `h.example.test`: no user information, port, path, query or fragment. `testAControlOrBinaryBodyIsRefusedByItsSizeAsText` checks that neither the path nor `key` appears. After a redirect the message still names the first host, which is also safe. No findings.
4. **Does the measurement measure what C2 s6a says?** Partly (M1). The method is sound: `ri_interval_max_phys_footprint` reset in the device handler, malloc pressure relief before the reset (which lowers the baseline, so it errs toward a bigger delta), one sample per fresh process, interleaved cases, the trial sample disclosed (n=7 for ext ascii, 55 lines = 54 + 1). The C2 text also says plainly that this was measured in the app, not the extension, and that the absolute 15 MB question waits for T-0687. But the stub leaves out costs that a real cold `net.get` has (M1).

## Findings

### M1 (Medium): the stubbed measurement leaves out the body buffer and the network stack, yet C2 states the result as "costs at most 3.55 MiB"

- Where: `pywidget/ios/Tests/NetFetchTests.swift:383` and `:405` (session and stub body made before the reset at `:379`), NetStub `startLoading` at :25-31 (the whole body in one chunk), and `pywidget/docs/research/C2-device-api.md:283` (the "at most 3.55 MiB" sentence).
- Failure scenario: three costs a real cold `net.get` in the extension pays happen before the interval reset, or never happen under the stub.
  - (a) `NetStub.set(... chunks: [Data(repeating:count:)])` allocates the whole body before the reset, so that body copy is in the baseline. In production, the bytes arrive after the call.
  - (b) The stub delivers the body in one `didLoad`, so `Loader.body.append` runs once. Real transport delivers 16-64 KiB chunks, and `Data` grows geometrically. Capacity can reach about 2x the body, with old and new buffers live together during a realloc.
  - (c) `NetFetch.session` is made before the reset. The URLProtocol stub never loads the real HTTP/TLS/DNS stack (Network.framework, boringssl, connection state). The first request in a fresh extension process pays that cost after the call.

  So "one `net.get` costs at most 3.55 MiB above the footprint at the call" undercounts the real cold cost by roughly 1-2 body sizes (0.25-0.5 MiB in the extension) plus the cost of loading the network stack, which nobody has measured yet. Also, "at most" is the largest of 6-7 samples, not a bound. If T-0687 adds this delta to a <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> script's footprint to check the 15 MB target, it could pass a configuration that fails on a device.
- Suggested fix:
  - (1) Reword C2 s6a:283 to say "the largest of n samples" and to name the three exclusions.
  - (2) In the cold runner, have the stub build its body lazily inside `startLoading` (after the reset) and deliver it in 16 KiB chunks.
  - (3) Do not set `NetFetch.session` before the call, so the cold case includes session creation.
  - (4) T-0687 takes at least one sample per body over real transport. A local HTTPS server on the Mac serves the Simulator, so no outside site is read.

### L1 (Low): escapedSize counts `\b \f \n \r \t` as 6 bytes; JSONSerialization writes 2, so newline-dense text is falsely refused

- Where: `pywidget/ios/Shared/NetFetch.swift:134-140`, and the size the message reports at :176.
- Failure scenario, measured on the host: a 262,140-byte body of `12.5\r\n` lines. `escapedSize` counts 699,042 bytes, over the extension's 524,288. The real reply would be 349,522 bytes, which fits. The extension refuses it with "would be 699042 bytes as text", which overstates the size by 2x. The same happens in the app at 1 MiB against the 2 MiB cap. Any CRLF line list with lines under about 10 bytes, or LF lines under about 5 bytes, is refused although it fits.
- Suggested fix: count 0x08, 0x09, 0x0A, 0x0C and 0x0D as 2. The count then equals the built size for every scalar, which matches the host check above. Add a case to `testEscapedSizeBoundsTheBuiltReply` asserting the count equals the built size for 0x00-0x7F.

### L2 (Low): three copies of "am I the extension", and the extension limits are never selected inside an appex

- Where: `pywidget/ios/Shared/NetFetch.swift:59` (`bundleURL.pathExtension`), `Shared/TreeNodes.swift:260` (`bundlePath.hasSuffix(".appex")`), `Shared/PythonRuntime.swift:18`. The setter at `NetFetch.swift:66-69` can be called from production code.
- Failure scenario: the three checks drift apart, or a later change sets `NetFetch.limits` outside tests. Then the extension runs with the app's 1 MiB/2 MiB limits, and nothing fails until jetsam. `testTheLimitsPerProcess` only shows that the app picks `.app`.
- Suggested fix: use one shared `ProcessKind.isWidgetExtension`. Restrict the setter to tests (`#if DEBUG`, or an injected parameter only). When T-0675 lands, add a test that runs inside the extension and asserts `NetFetch.limits == .widgetExtension`.

### L3 (Low): run-cold.sh does not notice a missing sample

- Where: `pywidget/docs/reviews/t0691-evidence/run-cold.sh:9-15`.
- Failure scenario: if the build-for-testing step is missing or a run fails, `xc.sh ... | tail -1` prints one line and the loop goes on. No line is added to `cold.jsonl`, and `summarize.py` builds its table from whatever is there. n then drops without anyone noticing. This time n is 6-7 for every case, so the current numbers are not affected.
- Suggested fix: compare the number of lines in `cold.jsonl` before and after each run, and exit non-zero when it did not grow by exactly one.

Nit (not counted): `net.py` defines `REPLY_MAX_BYTES` and `EXTENSION_REPLY_MAX_BYTES` but leaves them out of `__all__`, unlike `MAX_BYTES` and `EXTENSION_MAX_BYTES`.

## Method

Standalone host programs only. I did not build or run anything in Xcode for this review. `escapedSize` and `replySize` were copied from `Shared/NetFetch.swift` at HEAD. Sample sizes: 1,112,064 scalars, 15 charset sequences, 5 statuses, 1 header set, 2000 random strings, 1 CRLF body, 1 URL.
{% endraw %}

</div>
