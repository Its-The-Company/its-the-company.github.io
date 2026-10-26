---
layout: "default"
title: "L19: iMessage extension, desk feasibility and scope"
section: "documents"
description: "Here is the shape of it. Messages gives an extension a card, a URL and a nameless list of people. It never gives it the conversation, and it never sends anything without a person&#x27;s tap. That makes the safe uses (a\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/l19-imessage.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Research</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/research/L19-imessage.md</code></span></div><h1>L19: iMessage extension, desk feasibility and scope</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/wrenna.svg' | relative_url }}" alt="Wrenna" title="Wrenna"><span>By <a href="{{ '/cast/wrenna.html' | relative_url }}">Wrenna</a>, Market and product researcher</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Wrenna, 2026-10-25 (started 19:33 ET by `date`). Desk research only. No prototype was built: the brief's prototype and any C14 build wait for a human approval (brief section 0, Phase 6). Status: **draft for Ines and the Investors; recommends nothing that needs App Store Connect before the membership is active.**

> "This NSUUID identifies the message's sender. This value is scoped to the current device and will be different on all devices that participate in the conversation."
> (Messages.framework, `MSMessage.h`, `senderParticipantIdentifier`, iOS 27.1 SDK)

Here is the shape of it. Messages gives an extension a card, a URL and a nameless list of people. It never gives it the conversation, and it never sends anything without a person's tap. That makes the safe uses (a picture of a widget, a script's output, a source-visible share) cheap, and the founder's headline use (creator-made Python running on a friend's phone) the same High-risk marketplace question L6 already <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span>. My recommendation: **go for a narrow C14 in Phase 6 (static cards, script output, share-to-import), no-go on runnable received messages.** None of it serves the <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span> target, and v1 already shares code through the share sheet.

## 0. How this was read

- **[SDK]**: read from the local Xcode 27.1 iOS Simulator SDK, `iPhoneSimulator27.1.sdk/System/Library/Frameworks/Messages.framework/Headers/` (16 headers), and the Xcode "iMessage Extension" project template. Header comments are Apple's text; availability macros give the iOS version.
- **[M]**: needs a person's browser read of developer.apple.com (<span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G2a</span>: no fetch from that site by us). Until then, treat as unverified.
- **[recall]**: my memory or press coverage, not read today. Lowest weight.
- **[bench]**: Idris's uncommitted runtime bench in `pywidget/ios/bench/*.txt` (Simulator, app process, n=6 per variant). Not an extension measurement.

## 1. Background facts, verified


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Background facts, verified, scrolls sideways" data-n="1" style="--tw:1005px" markdown="1">

| # | Brief's claim | Verdict | Evidence |
|---|---|---|---|
| F1 | Extensions use `MSMessagesAppViewController` with compact and expanded styles | **True, and incomplete.** There is a third style, `MSMessagesAppPresentationStyleTranscript` (iOS 11), used when the extension draws a bubble in the transcript. `requestPresentationStyle:` can ask for compact or expanded, never transcript. There is also `presentationContext`: Messages, or Media (over a photo or camera feed, iOS 12), where most send APIs return `MSMessageErrorCodeAPIUnavailableInPresentationContext`. | [SDK] `MSMessagesAppViewController.h`, `MSConversation.h`. Extension point `com.apple.message-payload-provider` [SDK, Xcode template]. |
| F2 | Template layout (image and caption) or `MSMessageLiveLayout`, where the extension renders the bubble | **True.** `MSMessageTemplateLayout` (iOS 10): `caption`, `subcaption`, `trailingCaption`, `trailingSubcaption`, `image` or `mediaFileURL` (image or movie), `imageTitle`, `imageSubtitle`. `MSMessageLiveLayout` (iOS 11) renders through a new `MSMessagesAppViewController` instance in transcript style, sized by `contentSizeThatFits:`. Its only initializer takes an `alternateLayout` (a template layout). New in iOS 26: `messageTintColor`, `invalidateMessageTintColor`, `messageCornerRadius` for transcript bubbles. | [SDK] `MSMessageTemplateLayout.h`, `MSMessageLiveLayout.h`, `MSMessagesAppViewController.h` |
| F3 | State travels in the message's URL | **True.** `MSMessage.URL` is "a HTTP(S) or data URL used to encode data". A size <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> exists (`MSMessageErrorCodeURLExceedsMaxSize`), but **the number is not in the headers [M]**. If no app on the receiving device can consume the message and the URL is HTTP(S), "it will be loaded in a web browser". | [SDK] `MSMessage.h`, `MSMessageError.h` |
| F4 | `MSSession` lets a message update in place | **Partly wrong.** Messages in one session "are represented as a single entry in the conversation transcript", and an earlier one "will be updated and moved to the bottom of the conversation transcript when another message created with the same session is sent". It moves to the bottom; it is not updated where it sat. It also only changes when someone **sends** a new message: the extension cannot edit a sent bubble on its own. `MSSession` has no properties beyond `NSSecureCoding`. CORRECTIONS row. | [SDK] `MSSession.h`, `MSMessage.h` `initWithSession:` |
| F5 | Recipients without the app see a fallback image and caption | **True, with one more channel.** A live layout falls back to its `alternateLayout` "on devices that don't support live layout or don't have the iMessage app installed". An HTTP(S) URL opens in the browser when nothing can consume it. What SMS or RCS (non-iMessage) recipients get is **not in the headers [M]**. | [SDK] `MSMessageLiveLayout.h`, `MSMessage.h` |
| F6 | Anonymized participant identifiers; can't read the conversation | **True, and the identifiers are per device.** `localParticipantIdentifier` and `remoteParticipantIdentifiers` are `NSUUID`s "scoped to this device", stable only while the extension stays enabled, and they change on disable/re-enable or reinstall. The same person has a different UUID on each phone in the chat. The only message objects the extension sees are `selectedMessage` (one the user tapped) and its own messages through the selection/receive callbacks. No API returns transcript text [SDK, absence; M to confirm `didReceiveMessage` covers only the extension's own messages]. CORRECTIONS row (omission). | [SDK] `MSConversation.h`, `MSMessage.h` |
| F7 | Since iOS 17, iMessage apps sit behind the "+" menu | **Not checkable from the SDK** (UI placement, not API). Matches my memory of iOS 17 coverage [recall; M]. Treat as true for planning: the extension is not a discovery channel. | none local |
| F8 | iOS 26 built-in polls may overlap | **Built-in polls in iOS 26 Messages match my recall [recall; M].** There is **no developer API for polls** in Messages.framework 27.1: `grep -ri poll` over the 16 headers returns nothing. So we can't extend or read the built-in polls; they're competition only. | [SDK] absence |
| F9 | (new) Sending needs a person | `sendMessage`, `sendText`, `sendAttachment` work only if "the app must be visible and have had a recent touch interaction since either last launch or last send" (errors `SendWithoutRecentInteraction`, `SendWhileNotVisible`, iOS 11). `insertMessage` only stages into the input field. | [SDK] `MSConversation.h`, `MSMessageError.h` |
| F10 | (new) Other levers | `shouldExpire` (expires after read unless kept), `summaryText`, `accessibilityLabel`; `insertSticker`/`sendSticker` with `MSSticker(contentsOfFileURL:localizedDescription:)`. Sticker file size and format limits exist as error codes (`StickerFileImproperFileSize`, `...Format`, `...Attributes`), values **[M]**. iOS 27 adds `MSUPIRequest` (UPI device validation, managed entitlement, SMS only): irrelevant, and a payments area we stay out of. | [SDK] `MSMessage.h`, `MSSticker.h`, `MSMessageError.h`, `MSUPIRequest.h` |

</div>


Unknowns that only a measurement or a browser read can settle: the extension memory limit [M; prototype], the URL size cap [M; bisect in prototype], sticker limits [M], the SMS/RCS fallback [M; device], whether the "+" placement changed in iOS 26 or 27 [M].

## 2. Use cases: go or no-go

Effort is my estimate in engineer-days for one iOS engineer, after the membership is active and v1 has shipped; nothing here is measured. Risk columns cite L6 (App Review) and L12 (security).


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. Use cases: go or no-go, scrolls sideways" data-n="1" style="--tw:1965px" markdown="1">

| # | Use case | Verdict | Effort | L6 risk | L12 / safety risk | Why |
|---|---|---|---|---|---|---|
| U1 | **Widget as a static card.** The main app renders the widget's last snapshot (SwiftUI `ImageRenderer`) into the App Group; the extension lists them; one tap stages an `MSMessageTemplateLayout` (image, caption = widget name, subcaption = time) whose URL is an https link to the companion site. | **Go** (Phase 6) | 3-5 | Low: a picture and a link (L6 matrix "iMessage extension: Low (static)") | Low. The person sees the card in the input field before sending (F9). Snapshot may show personal data ("my steps"): the picker shows the exact image that will be sent. | Cheapest real value; every card is a link back to us for recipients without the app (F5). |
| U1b | Widget as a **live** card (`MSMessageLiveLayout` that refreshes data on the recipient's phone, "my ETA") | **No-go** | 8-12 | High once the bubble runs the sender's code on the recipient's phone (4.7, 4.7.2, DPLA 3.3.1(B)) | High. Live location or ETA in a group chat is tracking (L12 abuse paths); refresh would run on the recipient's device with whose permissions? Every visible bubble spawns a view controller (F2): cost grows with the chat. | Use U1 and re-send. |
| U2 | **Creator-made interactive messages in Python** (games, custom polls, checklists) | **No-go** | 20+ plus a separate-process runtime | **High** (L6 s3: runnable code sent to others is the marketplace question; 4.7.2 bars native APIs without Apple's permission) | High. Needs tier M (L12 s6: separate process, unproven M2 spike), per-item consent (4.7.3), reporting and blocking (4.7.1, 1.2) inside Messages, where participant IDs differ per device (F6) so "block this creator" must key on a creator account, not a participant. | Waits on the same Apple-permission answer as the marketplace. Overlaps built-in polls (F8) and established iMessage games [recall]. |
| U2b | **First-party interactive templates**, our Swift compiled in (dice, bill/tip splitter arithmetic, a turn counter), state in the URL, `MSSession` for the one-entry transcript | **<span title="What keeps an idea below the top: the cap that applies to it now.">Hold</span>** (revisit after U1/U3 data) | 8-10 | Low-Medium: our code, no download; but it has nothing to do with Python, so a reviewer may ask why it is in a Python IDE (2.5.2 purpose framing, L6 s7) | Medium. URL state is readable by anyone in the chat and by the browser fallback: put no personal data in it; use the URL fragment (`#...`) on the https fallback so it is not sent to our server. | Real but weak: it is a different product next to polls and existing apps. A bill splitter is arithmetic, not financial advice (C7), but keep the copy plain. |
| U3 | **Run my script, insert its output.** The extension lists scripts the user marked "Messages-ready"; runs one; inserts text (`insertText`), an image or table as an attachment (`insertAttachment`), or a template card | **Go** (Phase 6), with a runtime spike first | 6-10 (incl. embedding Python in a second extension) | Low: the user's own code on their own phone; only output is sent (L6 matrix: own code, 4.7.2 not engaged) | Low-Medium. Output can leak data the user didn't look at: always stage with `insert*`, never `send*`. L12 strip list (no `_ctypes`) must apply to the extension build too. Extension memory limit unknown [M]. Fallback: run in the main app (open app, return) if the spike fails. | The one use only a Python app can offer. [bench]: app-process cold start to first result about 0.32 s median, peak 16-19.5 MB with heavy imports (Simulator, n=6 per variant). The extension figure is still to measure. |
| U4 | **Share code or a widget.** A template card (preview image, name, "Open in pywidget"); tap opens the main app's source-visible import screen; received code never runs on its own | **Go**, but **v1 needs no extension**: share the `.py` or bundle through the share sheet now; the extension only adds a nicer card later | v1: 0 (share sheet); Phase 6 card: 3-4 | Low-Medium: person-to-person, source-visible, user-initiated run (L6 option (a) pattern, no storefront) | Medium. Code may hide a payload: the import screen shows source, the L12 manifest card, and imports into the local tier with the local-tier banner. Small scripts can ride in the URL fragment (cap [M]); larger ones need hosting (CloudKit or the web gallery), which **changes the privacy label** (my draft says no server). | Strongest growth case: a recipient without the app lands on the companion site with the code readable there. |
| U5 | **Python-generated stickers** (Pillow) | **Fold into U3** | +1-2 on top of U3 | Low | Low. Procedural images only (C9 allows code-drawn visuals, no generative model). | A sticker is one more output type of U3, not its own feature. Pillow is the L13 #2 package. Sticker limits [M]. |
| U6 | (found) **Media context**: extension over the camera or a photo | **No-go** | n/a | n/a | n/a | Most send APIs are unavailable there (F1); no fit. |
| U7 | (found) **Card as a growth link**: every outgoing card's https URL lands on a companion-site page that renders the card from the fragment and offers the App Store link | **Go with U1/U4** | 1-2 (site) | Low | Low, if state stays in the fragment and the page loads no tracker | Turns the "+" menu problem (F7) around: discovery comes from recipients, not the drawer. |

</div>


## 3. App Review and safety risks, with mitigations


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3. App Review and safety risks, with mitigations, scrolls sideways" style="--tw:860px" markdown="1">

| Risk | Source | Mitigation |
|---|---|---|
| Runnable code delivered to another person's phone | L6 4.7, 4.7.2, DPLA 3.3.1(B) | No runnable received messages (U2 no-go). Received code goes only to the source-visible import screen; nothing runs without the recipient's tap in the main app. |
| Spam through the extension | 1.2 | The platform helps: no send without a visible extension and a recent touch (F9). We add nothing that sends in bulk; no contact access. |
| Tracking participants | 5.1.1, L12 | Never store or send participant UUIDs off the device; they are per device anyway (F6). No live location cards (U1b no-go). |
| Data leaking through URL state | 5.1.1, L12 | No personal data in URLs; state in the https fragment; `shouldExpire` offered for one-off cards; cards built from an image the sender sees first. |
| Logging message content | brief Privacy constraint | No analytics SDK, no server (privacy draft conditions hold). The extension reads only what the user taps. |
| Objectionable content in shared code or cards | 1.2, 4.7.1 | Person-to-person: the recipient uses Messages' own block and report. If shared items ever pass through our host (U4 large scripts), they inherit the L12 s10 report and takedown flow. |
| Purpose drift ("why is a game in a Python IDE?") | 2.5.2 framing, L6 s7 | Keep C14 to Python outputs and sharing (U1, U3, U4); hold U2b. |
| Hidden features | 2.5.19 | Don't ship the extension dormant in v1; it arrives in a release that says so. |

</div>


## 4. Suggested phase for C14

**Phase 6, as the brief has it, scoped to U1 + U3 (+U5) + U4 card + U7.** Not before v1 ships and not in the Day 30 plan: the extension is behind the "+" menu (F7 [recall]), needs real devices and the active membership to test sending and fallback, and v1's share sheet already covers sharing code. Order inside Phase 6: the U3 runtime spike first (it decides whether Python runs in the extension at all), then U1 and U7, then the U4 card. U2 waits on the marketplace's Apple-permission answer (L6 s4 option (d)); U2b stays on hold.

## 5. Prototype plan (for later approval; nothing built)

Target `pywidget/ios/prototypes/imessage/`, throwaway, after a human approves the prototype.
1. Extension target from the Xcode template (`com.apple.message-payload-provider`), sharing the widget's App Group.
2. **Card A (U1):** a template-layout card from a snapshot the main app wrote with `ImageRenderer`; https URL with state in the fragment.
3. **Card B (turn-based):** a counter or tic-tac-toe with `MSSession`, live layout plus alternate layout, state in a data URL. Whose turn is decided per device as "sender UUID == my local UUID" (F6), never by comparing UUIDs across phones.
4. **Measure:** extension memory at idle, after Python init, and after a heavy import, using the `pywidget/ios/bench` harness fields; cold start in the extension vs the app [bench]; a transcript holding 20 live bubbles (memory, controller count, scroll); the URL cap by bisection until `URLExceedsMaxSize`.
5. **Simulator first** (Xcode's Messages simulator conversation [recall]); the fallback for recipients without the app, and the SMS/RCS case, need two real devices and the active membership (due Day 7).
Estimate: 2-3 engineer-days.

## 6. Changes C14 would need elsewhere

- **C1 runtime:** embed Python in a second extension (shared framework or a copy; app size, L13 payload); the L12 v1 strip list applies to that build.
- **C4 widget engine:** a main-app snapshot export to the App Group per widget (also useful for the share sheet).
- **Companion site:** a card landing page that reads state from the URL fragment client-side and loads no tracker (U7).
- **Privacy:** label unchanged for U1, U3, U4-small; hosting shared code (U4-large) or CloudKit references changes it (privacy-label.md build conditions).
- **Marketplace / permissions (only if U2 is ever revived):** a manifest field for Messages use, tier M runtime, and blocking keyed on creator accounts, since participant IDs are per device.

## Sources

- iOS 27.1 Simulator SDK, Messages.framework headers: `MSMessagesAppViewController.h`, `MSMessage.h`, `MSSession.h`, `MSMessageLayout.h`, `MSMessageTemplateLayout.h`, `MSMessageLiveLayout.h`, `MSConversation.h`, `MSMessageError.h`, `MSSticker.h`, `MSStickerBrowserView.h`, `MSUPIRequest.h` (read 2026-10-25). Xcode 27.1 template "iMessage Extension.xctemplate/TemplateInfo.plist".
- pywidget/docs/research/L6-app-review.md (s1, s3 matrix row "iMessage extension", s4, s7); L12-security.md (s0, s6, s9, s10); L13-packages.md (Pillow); pywidget/docs/release/privacy-label.md.
- pywidget/ios/bench/{full,stripped,zip,zip-lazy}.txt (uncommitted, Simulator, app process).
- Owed browser reads [M]: Messages framework docs and HIG for iMessage apps (URL cap, memory, sticker limits, SMS fallback, "+" placement); iOS 26 polls feature page.
{% endraw %}

</div>
