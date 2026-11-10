---
layout: "default"
title: "T-0883: the changed rows in tools/alpha_rows.tsv, reading half"
section: "documents"
description: "Measured with pywidget/docs/reviews/t0883-evidence/shot_checks.py (standard library, on shots in git)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0883-alpha-rows-odalys.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 12 · Mon Nov 2</span><span><code>pywidget/docs/reviews/t0883-alpha-rows-odalys.md</code></span></div><h1>T-0883: the changed rows in tools/alpha_rows.tsv, reading half</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/odalys.svg' | relative_url }}" alt="Odalys" title="Odalys"><span>By <a href="{{ '/cast/odalys.html' | relative_url }}">Odalys</a>, Process and operations engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Odalys, 2026-11-02. Independent read of T-0862 (a35a4d00, cbd4094a). No build, no Xcode, no Simulator: the Mac mini's disk gate is
closed (df 4.7 GB, #127). The code half is T-1011, owner Idris, after the gate reopens.

Read: both commits, tools/alpha_rows.tsv, tools/alpha_run.sh, tools/alpha_wk_inputs.sh, the record's README and INDEX, WidgetKitCheckTests,
TreeToggle, the timer code, gallery 09's source and tree, the two shots. Not read: the dry run's results.json, logs and xcresult.
`~/.cache/t0862-dry` is gone, so only the committed files stand behind it.

Measured with `pywidget/docs/reviews/t0883-evidence/shot_checks.py` (standard library, on shots in git).

## Answers

1. **The rows are right, with one row that can pass while broken.** A5b-inputs is sound. A5b can pass with a broken Toggle, because
   testC asserts nothing. A second, smaller hole came in with T-0862 at one shot, wk-distance-systemMedium.
2. **Yes, testC should get a real assertion.** Exact change below. A Python port of it passes the real pair and fails 7 of 7 damaged
   pairs. The Swift has not been compiled or run.
3. **Yes, 0:00 is expected.** The fixture's interval ended on 2026-10-26. Keep it that way: it is what makes item 2 possible.

## Item 1: the rows

The change: A5b-inputs is new, and A5b gains tests B and C and reads trees and fixtures from `<out>/wk-inputs`.

Clean, with the check behind each:

- **A5b-inputs cannot pass empty.** A script step is valid only on exit 0 and a kept line (`run_script`, alpha_run.sh line 212). The line
  prints after all 12 trees are written, under `set -eu`. If the step fails, alpha_run's `mkdir -p` still makes the empty folders, and
  testA fails on `files.count == 12`. It does not skip, because WK_TREES is set.
- **The timer tree holds at any clock.** n=326 clocks over 2026-11-02 to 11-04, 11-30 and the year's end: 0 bad. Each has one timer on
  systemMedium, start at the floored minute, end 5:25:00 later, and the kept line prints that end. This is wider than the fixture test,
  which has one clock.
- **Order holds.** inputs, flags, A5b, restore. tools/xc.sh and project.yml set no parallel, retry or random order, so A places the
  widgets before B and C. If A's widgets are missing, B and C fail on XCTUnwrap.
- **testB is a real check.** Over 6,000 red and 6,000 blue pixels can only come from chart.png. The record has 18,240 of each.
- **A frozen timer fails the grader's read.** A timer stuck at 5:25:00 gives the tree's start, which falls before A5b's window opens (dry run:
  11:25:00 AM against 11:25:52 AM). 0:00 fails too: the window ends hours before the card's end. No test asserts this value; the F1 grader's
  read is the only check, and it holds.

Rows that pass when the thing is broken:


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Item 1: the rows, scrolls sideways" data-n="1" style="--tw:1258px" markdown="1">

| # | Row | Broken thing | Why it passes | Backstop | Severity |
|---|---|---|---|---|---|
| 1 | A5b, testC | The Toggle: isOn ignored, inverted, knob invisible, or the Home Screen never went Tinted | No assertion. It can fail only at install or placing | None in the row. T-0862's README read one pair by eye | P1, item 2 |
| 2 | A5b, testA | distance's medium view does not redraw | Line 56 compares bytes, and since T-0862 the shot before it (countdown) has a running timer, so a stale shot differs by a digit | systemSmall is checked first and has no timer, so a whole failed redraw still fails there. A medium-only failure leaves the crash rule, if it crashed, and the grader's read of that shot | Low, new with T-0862 |

</div>


Row 2 is narrow. n=1 family of 1 premade, and only a failure that hits medium alone. The fix is 5 lines in the same file, so it goes on T-1011.
Before T-0862 the guard held at this step: the fixed tree's timer stood still outside 10-31.

Two notes for the graders, neither a defect:

- On the moved tree, countdown's "Lisbon in N days" reads 52 at 83 of the 326 clocks and 53 at 243. It is a calendar count, so it depends on the run's
  hour. Grade it against the run's clock, not the checked-in tree.
- If the WK_TREES token were ever dropped, all four tests would skip and the step would exit 0. tests/alpha_run_test.py pins the tokens, and
  INDEX.md prints the skip count.

## Item 2: the assertion

Yes. In 1.0 a Toggle takes no tap (TreeToggle's comment, L5 V1), so drawing isOn is all it does, and that is what must be asserted.
"The two shots differ" alone is too weak: an inverted Toggle differs.

What the T-0862 pair shows (n=1 pair, 1038 x 566 px, 3x): 6,686 of 587,508 pixels differ, all inside 865,373 to 978,438. That is 114 x 66 px, the
38 x 22 pt track TreeToggle draws. 0 pixels differ outside it. Pernille's "they differ at the switch" stands.

The check takes the box from the pair itself, so no coordinate is hard-coded:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Item 2: the assertion, scrolls sideways" style="--tw:1052px" markdown="1">

| Assertion | Real pair | Required | Fails when |
|---|---|---|---|
| Some pixel differs by more than 8 in a channel | yes | yes | isOn ignored; a tree that did not install |
| The changed box is 38 x 22 pt, within 2 pt | 114 x 66 px | 108-120 x 60-72 | Anything else changed; the timer began to tick; the switch has moved size |
| On: knob in the right third, not the left | right 1,398, left 0 | right at least 882, left under 50 | Inverted; knob missing |
| Off: knob in the left third, not the right | left 1,380, right 0 | left at least 882, right under 50 | Inverted; knob missing |
| On: knob stands out from its track | 255.0 against 165.6 | gap at least 60 | Track back at full strength in accented, the fault T-0429 <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2</span> fixed |
| On track lighter than off track | 165.6 against 114.6 | gap at least 25 | The state shown by the knob alone |
| No colour on the on track | 6 | at most 24 | Tinted did not take: full-colour accent is 90 dark, 141 light |

</div>


Pixels at 230 or more on all channels count as knob. 882 is half of a 14 pt square at 3x. The margins come from one pair, so T-1011 checks them on a
real run. If the Tinted tint ever carries colour, the last row goes red loudly, and that is the right failure.

Port against damaged copies of the real pair, each made by painting the shot:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Item 2: the assertion, scrolls sideways" data-n="2" style="--tw:520px" markdown="1">

| Case | Result | Reason |
|---|---|---|
| Real pair | pass | |
| isOn ignored: on twice | fail | same pixels |
| Inverted: shots swapped | fail | knob on the wrong side |
| On track at full strength, knob lost | fail | knob 255 against 255 |
| Track the same on and off | fail | track 113 against 115 |
| Home Screen not Tinted: blue track | fail | colour 150 |
| Something else changed too | fail | changed area 919 x 189 |
| Switch missing from the off shot | fail | knob 0 and 0 |

</div>


The exact change, in pywidget/ios/UITests/WidgetKitCheckTests.swift. It throws rather than asserts, because with `continueAfterFailure = false` an
assertion may not run the `defer` that puts the Home Screen back.

```swift
    /// T-0435: gallery 09 at systemMedium on a Tinted Home Screen, Toggle on, then off.
    /// T-0883: the shots have to show it (toggleProblems). The fixture's timer is over, so the switch is all that may differ.
    func testCToggleOnTheAccentedHomeScreen() throws {
        let fixtures = try XCTUnwrap(env["WK_FIXTURES"])
        try setHomeScreenStyle("Tinted")
        defer { try? setHomeScreenStyle("Default") }
        var shots: [String: UIImage] = [:]
        var points: CGFloat = 0
        for state in ["on", "off"] {
            try install(fixtures + "/toggle-\(state)")
            let medium = try XCTUnwrap(try homeWidgets()["systemMedium"], "place the widgets first (test A)")
            let shot = medium.screenshot()
            save(shot.pngRepresentation, "wk-gallery-09-toggle-\(state)-accented-systemMedium")
            shotScreen("wk-gallery-09-toggle-\(state)-accented-home")
            shots[state] = shot.image
            points = medium.frame.width
        }
        let problems = Self.toggleProblems(on: try XCTUnwrap(shots["on"]), off: try XCTUnwrap(shots["off"]), points: points)
        print("T-0883 WK toggle: \(problems)")
        // Thrown, not asserted: the defer above has to run.
        guard problems.isEmpty else {
            throw NSError(domain: "T-0883", code: 1, userInfo: [NSLocalizedDescriptionKey: problems.joined(separator: "; ")])
        }
    }
```

Replacing `count`, with the helpers beside it:

```swift
    typealias Pixels = (w: Int, h: Int, px: [UInt8])

    /// An image's pixels, RGBA in sRGB, top row first.
    static func rgba(_ image: UIImage) -> Pixels? {
        guard let cg = image.cgImage else { return nil }
        let w = cg.width, h = cg.height
        var buf = [UInt8](repeating: 0, count: w * h * 4)
        let drew: Bool = buf.withUnsafeMutableBytes { raw in
            guard let ctx = CGContext(data: raw.baseAddress, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                                      space: CGColorSpace(name: CGColorSpace.sRGB)!,
                                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return false }
            ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
            return true
        }
        return drew ? (w, h, buf) : nil
    }

    static func count(_ image: UIImage, _ test: (Int, Int, Int) -> Bool) -> Int {
        guard let p = rgba(image) else { return 0 }
        var n = 0
        for i in stride(from: 0, to: p.px.count, by: 4) where test(Int(p.px[i]), Int(p.px[i + 1]), Int(p.px[i + 2])) { n += 1 }
        return n
    }

    /// T-0883: the share of pixels that differ by more than 8 in a channel; 0 if the two cannot be compared.
    static func changedShare(_ a: Data, _ b: Data) -> Double {
        guard let x = UIImage(data: a).flatMap(rgba), let y = UIImage(data: b).flatMap(rgba), x.w == y.w, x.h == y.h else { return 0 }
        var n = 0
        for i in stride(from: 0, to: x.px.count, by: 4)
        where (0..<3).contains(where: { abs(Int(x.px[i + $0]) - Int(y.px[i + $0])) > 8 }) { n += 1 }
        return Double(n) / Double(x.w * x.h)
    }

    /// T-0883: what gallery 09's on and off shots must show; empty means they do. Only the 38 x 22 pt track (TreeToggle) changes,
    /// the knob sits trailing when on and leading when off, it stands out from the on track, the on track is lighter than the
    /// off track and has no colour, which a full-colour accent would. Numbers: docs/reviews/t0883-alpha-rows-odalys.md.
    static func toggleProblems(on: UIImage, off: UIImage, points: CGFloat) -> [String] {
        guard let a = rgba(on), let b = rgba(off), a.w == b.w, a.h == b.h else { return ["no pixels to compare"] }
        let s = Int((CGFloat(a.w) / points).rounded())
        func rgb(_ i: Pixels, _ x: Int, _ y: Int) -> [Int] {
            let o = (y * i.w + x) * 4
            return [Int(i.px[o]), Int(i.px[o + 1]), Int(i.px[o + 2])]
        }
        var x0 = a.w, y0 = a.h, x1 = -1, y1 = -1
        for y in 0..<a.h {
            for x in 0..<a.w where zip(rgb(a, x, y), rgb(b, x, y)).contains(where: { abs($0 - $1) > 8 }) {
                x0 = min(x0, x); y0 = min(y0, y); x1 = max(x1, x); y1 = max(y1, y)
            }
        }
        guard x1 >= 0 else { return ["on and off drew the same pixels"] }
        var out: [String] = []
        let w = x1 - x0 + 1, h = y1 - y0 + 1, third = w / 3, need = (14 * s) * (14 * s) / 2
        if abs(w - 38 * s) > 2 * s || abs(h - 22 * s) > 2 * s { out.append("changed area \(w) x \(h) px") }
        func knob(_ i: Pixels, _ xs: Range<Int>) -> Int {
            var n = 0
            for y in y0...y1 { for x in xs where rgb(i, x, y).min()! >= 230 { n += 1 } }
            return n
        }
        let left = x0..<(x0 + third), right = (x1 + 1 - third)..<(x1 + 1)
        let onL = knob(a, left), onR = knob(a, right), offL = knob(b, left), offR = knob(b, right)
        if onR < need || onL >= 50 { out.append("on: knob px left \(onL), right \(onR)") }
        if offL < need || offR >= 50 { out.append("off: knob px left \(offL), right \(offR)") }
        let mid = (y0 + y1) / 2
        func band(_ i: Pixels, _ xs: Range<Int>) -> [[Int]] {
            ((mid - 2 * s)..<(mid + 2 * s)).flatMap { y in xs.map { rgb(i, $0, y) } }
        }
        func mean(_ v: [[Int]]) -> Double { Double(v.joined().reduce(0, +)) / Double(v.count * 3) }
        let onTrack = band(a, (x0 + 2 * s)..<(x0 + third - s))
        let offTrack = band(b, (x1 - third + s)..<(x1 - 2 * s))
        let onKnob = band(a, (x1 - third - s)..<(x1 - 4 * s))
        let colour = onTrack.map { $0.max()! - $0.min()! }.max() ?? 0
        if mean(onKnob) - mean(onTrack) < 60 { out.append("knob on the track \(mean(onKnob)) against \(mean(onTrack))") }
        if mean(onTrack) - mean(offTrack) < 25 { out.append("track on \(mean(onTrack)), off \(mean(offTrack))") }
        if colour > 24 { out.append("colour on the on track: \(colour), so not accented") }
        return out
    }
```

The `count` rewrite also moves off `CGContext(data: &buf, ...)`, whose pointer is only good for that call.

For row 2, in testAPremadesInTheExtensionProcess, in place of line 55-57:

```swift
                    // Passed must mean redrawn: each premade's shot differs from the one before it by more than a timer's
                    // digits (T-0883: countdown's timer runs on A5b's tree, so unequal bytes prove nothing after it).
                    if let before = previous[family] {
                        let share = Self.changedShare(png, before)
                        print("T-0883 WK \(stem) \(family): \(share) of the pixels changed")
                        XCTAssertGreaterThan(share, 0.03, "\(stem) \(family): nearly the same pixels as the previous tree")
                    }
                    previous[family] = png
```

The 3% comes from tracked shots. Smallest gap between consecutive premades at alpha 8428b332: 8.95% small (n=11), 7.51% medium (n=11),
14.43% large (n=3). Every timer digit and the end text changing together moves countdown's medium shot 1.26% (n=1 pair).

T-1011's proof, in a worktree only:

1. On a real run, read the `T-0883 WK` lines and check the margins above.
2. Flip the alignment at TreeNodes.swift:398: testC goes red.
3. Drop the `.opacity` at TreeNodes.swift:400: testC goes red.
4. Give a WK_TREES copy a distance.json whose systemMedium view is countdown's: testA goes red at distance systemMedium. Run it before and after the
   patch. That is the before number: the old guard passes it.

## Item 3: gallery 09's timer

Expected.

- The fixture is the committed tree, `pywidget/docs/design/widgets/gallery/trees/09-focus_timer.json`. `make_widgetkit_fixtures.py` changes `isOn` only
  (`set_toggles`), never a date.
- The interval is 2026-10-26T17:58:00Z to 18:23:00Z: `SAMPLE` in `pywidget/widgets/gallery/focus_timer.py` line 28, start plus 25 minutes at lines 63-64.
- `ui.Text.timer(start, end, shows_hours=False)` at line 66 reaches `Text(timerInterval: s...e, pauseTime: nil, countsDown: true, showsHours: false)`
  at `pywidget/ios/Shared/TreeView.swift` lines 523-524. The run was 2026-10-31, five days past the end, so the system timer rests at 0:00.
- The bar is empty for the same reason: `ProgressView(timerInterval:)` at `TreeNodes.swift` line 338. "Ends 2:23 PM" is 18:23Z in EDT, so the shot agrees
  with the tree.

This agrees with checklist s9's rule, 0:00 passes only after the end time. Gallery 09 is not one of F1's 12 premades, so nobody value-reads it.

Do not move this fixture to the run's clock as T-0862 did for countdown. A running timer would change pixels between the two shots, and the
changed box in item 2 would stop being the switch.
{% endraw %}

</div>
