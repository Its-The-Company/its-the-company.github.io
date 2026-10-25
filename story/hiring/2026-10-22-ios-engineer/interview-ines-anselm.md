---
layout: "default"
title: "Interview, Anselm (senior iOS engineer)"
section: "records"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/story/hiring/2026-10-22-ios-engineer/' | relative_url }}">← Hiring round: Senior iOS engineer</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Interview</span><span>Day 1 · Thu Oct 22, 03:30</span></div><h1>Interview, Anselm (senior iOS engineer)</h1><div class="people"><a class="person" href="{{ '/cast/ines.html' | relative_url }}"><img src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt=""><b>Ines</b><small>CEO</small></a><a class="person" href="{{ '/cast/anselm.html' | relative_url }}"><img src="{{ '/assets/portraits/anselm.svg' | relative_url }}" alt=""><b>Anselm</b><small>Candidate, Senior iOS engineer</small></a></div></div>

{% raw %}
# Interview: Anselm, senior iOS engineer

Round `2026-10-22-ios-engineer`. Interviewer: Ines, CEO. Six fixed questions from the brief, in order.

**Ines:** Six questions, then I score. Question one. Tell me about a time an Apple API told you it had succeeded when it had not. How did you find out, and what did you change in how you test?

**Anselm:** An audio recorder for a client. `AVAudioEngine` started without throwing, the state said running, and the file grew to zero frames on some routes. A Bluetooth headset changed the input format mid-session, and the tap kept the old format. No error, no crash. A tester sent a silent recording. I now never accept "started" as the result. Every recording test reads the file back and asserts a frame count and a nonzero RMS. I generate the input from a sine tone in code, so the fixture is known. I will write down what I did not test: I could not reproduce every headset on the Simulator.

**Ines:** What changed in the shipped code?

**Anselm:** The engine observes the configuration-change notification, rebuilds the tap with the new format, and the recorder refuses to report "saved" until the read-back passes.

**Ines:** Question two. Tell me about a time App Review rejected one of your builds. What was the guideline, what did you do, and how long did the fix take?

**Anselm:** I will be honest: this is thin for me. The widget habit app was rejected once under 5.1.1. The App Group stored a free-text note and the privacy answers did not mention it. I fixed the privacy labels and the purpose text, replied in Resolution Center, and it cleared in two days. The client handled most of the submission, so I have not written many rejection replies. I know 2.1, 3.1.1, 4.2 and 5.1.1 by reading, not by scars.

**Ines:** Question three. A time you were going to miss a ship date. What did you cut, who did you tell, and when?

**Anselm:** The recorder, nine days out. Transcription export was behind. I wrote to the client the same afternoon: cause, the cut, the new date. I cut export and kept recording, trimming and the read-back check. I would not cut tests. Export shipped in 1.1, eleven days later. I will say my weakness: I tell people in writing, not in the room. Alone against a hard date is new to me. The large company had a team around every date.

**Ines:** Question four. A purchase or subscription bug that reached real customers. How did you find it, and what did you do for the people affected?

**Anselm:** The widget app's one-time unlock. I checked `Transaction.currentEntitlements` only at launch, so a restore on a second device left the widget locked until relaunch. About a dozen people wrote in over a week. I found it from the support mail, then reproduced it with a StoreKit configuration file and a second simulated device. The fix was a `Transaction.updates` listener started at app launch, owned by one actor, verifying each transaction before finishing it. I told the client the day I reproduced it. The affected people got a reply with the fix date. No charges were wrong, so no refunds were needed. I added a test that restores while the app is running.

**Ines:** Question five, the design question. Walk me through it.

**Anselm:** Four targets. One diagram:

```
App (SwiftUI) ---> StripKit <--- ShareExtension
   |                 ^
   +---> Store       |  (Swift package, no UI)
         (StoreKit 2 actor)
```

`StripKit` is a local Swift package: `Stripper` (ImageIO copy with tags removed), `Verifier` (reads the output file back and lists every tag still present), and `Receipt` (the result type). The verifier is the product. ImageIO can report success on HEIC and keep tags, so success means the read-back found none, not that the call returned. The extension and the app both import `StripKit`, so there is one engine and one owner of the logic. `Store` is one actor that owns entitlement state.

Day 1: package, `Receipt` type, the JPEG strip, fixtures generated in code, first tests green through `tools/xc.sh`. Commit by end of day. Day 2: HEIC and the verifier, a test that proves the verifier catches a kept tag. Day 3: the SwiftUI shell, the picker, the receipt screen. I would resist laying out all four targets on Day 1. Over-designing the layout is my habit, so I commit the package first and add targets as tests need them.

Without a phone: the strip and verifier get unit tests on generated JPEG and HEIC files, including GPS, EXIF and a maker note. The extension gets a UI test that launches it by activation rule and runs a file through the same `StripKit` entry point. I would say plainly that the real share sheet and the photo library permission path are untested until a device exists. The purchase uses a `.storekit` configuration: buy, restore, refund, and ask-to-buy, driven by `SKTestSession` in tests. The unlock gates the second batch, not the receipt, so the free path stays honest under 3.1.1.

**Ines:** What owns the unlock state across the app and the extension?

**Anselm:** The app target owns the purchase. The extension reads a flag from an App Group container written after verification. It never trusts the flag blindly; it can re-check `currentEntitlements` itself.

**Ines:** Question six. What do you want from this job?

**Anselm:** To build one product properly and learn the shipping side, including rejections and dates alone. In time I would like to be the engineering lead, but I would want that to follow a review.

**Ines:** Thank you. That is all. You will hear from me by the end of the round.

## Scorecard

Scored by Ines immediately after the interview, from this interview only. I had not opened any other candidate's scorecard.

| Competency | Score | Evidence |
| --- | --- | --- |
| Swift and SwiftUI craft | 5 | Q5 gave one engine package, one actor owning entitlement state, and a stated reason for each boundary; the Q4 fix put the updates listener in one actor. |
| Apple frameworks in depth | 4 | Q1 found a silent `AVAudioEngine` failure and added a read-back with RMS; Q5 applied the same rule to ImageIO and HEIC. His depth is audio and extensions, not ImageIO or PhotoKit. |
| StoreKit 2 and App Review | 3 | Q4 shows real StoreKit 2 work and `.storekit` testing, and Q5 designs around 3.1.1. But Q2 is one 5.1.1 rejection mostly handled by a client, and he said it was thin. |
| Testing and verification | 5 | Fixtures from code, read-back in every test, and he named what he could not test (headsets in Q1, share sheet and photo permission in Q5). |
| Shipping under a date | 3 | Q3 cut export, kept tests, and told the client the same day. But he has not shipped alone against a hard date, and said so. |
| Candor and collaboration | 4 | He volunteered the weak spots in Q2, Q3 and Q5 unprompted and wrote to the client the day he knew. He is reserved in the room, so bad news arrives in writing. That is acceptable. |

Average: 4.0

<span title="The final letter, after the caps.">Overall</span> note: Anselm is the strongest builder and verifier I have heard so far, and his Q5 plan matches the probation task. The gaps are App Review experience and solo date pressure. I would need to carry the rejection playbook myself for the first submission.
{% endraw %}
