---
layout: "default"
title: "Scope: one-day Simulator prototype (Idris)"
section: "documents"
description: "Code: spikes/scope/ (engine and audio in ScopeKit, SwiftUI app in ScopeApp, project Scope.xcodeproj). Screenshots: spikes/scope/screenshots/. All visuals are drawn by code from sin(); no generative model anywhere (C9)\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/archive/market-research/' | relative_url }}">← Market research, Day 1 and 2</a><a href="{{ '/documents/research/scope-prototype.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 1 · Thu Oct 22</span><span><code>research/scope-prototype.md</code></span></div><h1>Scope: one-day Simulator prototype (Idris)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Code: `spikes/scope/` (engine and audio in `ScopeKit`, SwiftUI app in `ScopeApp`, project `Scope.xcodeproj`). Screenshots: `spikes/scope/screenshots/`. All visuals are drawn by code from sin(); no generative model anywhere (C9). Effort: well under the 3-hour <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>.

## What works (checked, not assumed)
- Two sine oscillators: x = sin(t), y = sin(ratio*t + phase). Controls: coarse ratio (0.5 to 4), a +/-0.05 trim slider, phase (0 to 2 pi).
- Figure is drawn as a glowing green trace with a graticule and a moving beam dot; the target is a dashed white curve. Six levels (circle, line, figure eight, pretzel, knot, weave). Match score 0 to 100%; above 93% for one second solves the level and shows NEXT; the trace turns white when locked.
- Audio: AVAudioEngine source node, left = x, right = y, 110 Hz base, parameters slewed per sample so sliders do not click.
- Tests (7 XCTests, green on macOS `swift test` and on the iPhone 18 Pro Simulator through tools/xc.sh):
  - "The sound is the picture": every rendered (L,R) sample equals the point the drawing uses at the same angle (tolerance 1e-5). Mutating the audio phase sign fails 2047 assertions.
  - The real AVAudioEngine graph rendered offline: success status, 4096 frames, non-silent, finite, left differs from right.
  - Scoring: identical = 100%, wrong ratio < 50%, near-miss > 80%; slew has no jump at the seam.
- App builds and launches on the Simulator; screenshots confirm the 3:1 figure at 100% and the 4:3 figure at 99% with NEXT shown, and a 1.43 trace on a pretzel target at 1%.

## Is it fun? What I could and could not judge
Could judge: the picture is attractive immediately, and the audio and picture are provably one signal. The scoring behaves sensibly at the extremes.
Could not judge: I cannot touch a slider or hear a sound on this headless Mac. Whether dragging ratio feels like homing in, whether a 110 Hz stereo tone pair is pleasant or irritating, whether the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span>-for-a-second rule feels fair, and how headphones sound, are all untested. I did not hear one sample. A human with headphones needs five minutes and a real device is better than the Simulator for audio. My honest read is "promising toy, not yet a game"; I will not call it fun.

## Problems found
1. My first trim slider had its range tied to its own value (it moved under the finger). Found in a screenshot, fixed by splitting coarse and trim. Real fine-tuning on a touch slider is the main control risk: matching 4:3 to within about 0.01 by thumb will be fiddly. Needs snapping or a notched dial.
2. A non-rational ratio draws an open curve over four turns, visible as a hanging tail (screenshot "off-target"). A real scope would drift. Decide: animate the drift (a feature) or draw one fixed window.
3. Score cliff: anything well off shows 0 to 1%, which gives no gradient to follow. Use a softer curve or a separate ratio and phase hint.
4. Sound shortcuts: the render thread reads plain Doubles written by the UI thread (a torn read is inaudible after slewing, but Swift 6 would want an atomic). On this Simulator an audio-session message (-10879) appears in the log; the engine still renders offline, but live output was not heard.
5. A "Sign in to Apple Account" sheet was sitting on the booted Simulator from the StoreKit test work and covered the first screenshots. I did not enter anything; I made a fresh Simulator for the screenshots and deleted it afterwards.

## Ideas to make it a game
- Hear before you see: level shows only the chord (audio), you match by ear and then the target appears.
- Rational ratios as a score: a 3:2 is a fifth, 4:3 a fourth; the interval names teach music while the shape teaches ratio.
- Added harmonics (a third oscillator per axis) for stars and knots; limited "knob budget" per level, fewest moves wins.
- Moving targets (phase drift) and rhythm levels where the shape must change on the beat.
- Daily puzzle seeded from the date; share the figure as an image drawn by code.
- A free studio mode for oscilloscope-music shapes, with export of the stereo file.
- Gyro tilt as phase control and two-finger drag as ratio (x/y of one drag) so the controls feel like a scope, not a form.
{% endraw %}

</div>
