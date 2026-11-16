---
layout: "default"
title: "Review: ADR-011 widget actions, sections 3, 8 and 9 (Maren, T-4542)"
section: "documents"
description: "The setting is in the right place, uses ordinary iOS rows and a checkmark list, and needs nothing outside approved item 2. The caps hold at 44 pt on the smallest iOS 18 phone. One thing will not work as written: the\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/adr-011-review-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/reviews/adr-011-review-maren.md</code></span></div><h1>Review: ADR-011 widget actions, sections 3, 8 and 9 (Maren, T-4542)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/pernille.svg' | relative_url }}" alt="Pernille" title="Pernille"><span>By <a href="{{ '/cast/pernille.html' | relative_url }}">Pernille</a>, Python runtime engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
- Reviewed: [`pywidget/docs/decisions/ADR-011-widget-actions.md`](adr-011-widget-actions.html) at bec23284ba (status proposed, revised after Pernille's review), as the owner of the app's look and words. Sections 4 to 7 are Pernille's and Idris's; I read them only where a word or a target depends on them.
- Checked against: `creative/approved.md` item 2 (A Paper light, B Studio dark; work inside it needs no further approval, <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>); the Set Up App sheet's strings in `pywidget/ios/App/Launcher/LauncherEditor.swift` (`LauncherSlotSheet.why`, line 705) and [`pywidget/docs/design/launcher/tap-path.md`](tap-path.html) steps 5 to 7; [`documents/restructuring/03-structure.md`](../restructuring/03-structure.html) (the project page; working assumption "Pages in 1.1").
- Apple, saved signed out under the Investors' <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span> of 2026-10-26 12:31 AM ET:
  - [H-W] HIG, Widgets, `research/inbound/apple/developer.apple.com/design_human-interface-guidelines_widgets.md-d0d8b773.html` (saved 2026-11-04, T-1443): the iOS size table, "16 points for most widgets ... margins of 11 points can work well", "Pay attention to the size of targets", "fonts at 11 points or larger", "widgets support Dynamic Type sizes from Large to AX5".
  - [H-A] HIG, Accessibility, https://developer.apple.com/design/human-interface-guidelines/accessibility.md, fetched for this review 2026-11-15 9:53 PM ET (one page; `research/inbound/apple/developer.apple.com/design_human-interface-guidelines_accessibility.md-b15ad1b2.html`): iOS "Default control size 44x44 pt, Minimum control size 28x28 pt"; "about 12 points of padding around elements that include a bezel"; "Minimize use of time-boxed interface elements ... Prefer dismissing views with an explicit action"; Reduce Motion "reducing automatic and repetitive animations".

## Verdict: FIX FIRST (one High, small)

The setting is in the right place, uses ordinary iOS rows and a checkmark list, and needs nothing outside approved item 2. The <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> hold at 44 pt on the smallest iOS 18 phone. One thing will not work as written: the fallback notice leaves after 6 s, which is before VoiceOver reaches it (H1). The Mediums are words and one renderer rule. I made the small wording fixes in s8 and s9 myself (listed at the end); H1 is written into s8 as a proposal for Idris, because it changes behaviour, not words.

## s3: the caps against 44 pt targets

Smallest iPhone on iOS 18 is 375 x 667 pt [H-W]. Content after 16 pt margins, and a row of 44 pt targets with 12 pt between them [H-A] (one: 44, two: 100, four: 212):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: s3: the caps against 44 pt targets, scrolls sideways" data-n="4" style="--tw:878px" markdown="1">

| Family | Size (375 x 667) | Content at 16 pt (at 11 pt) | Cap | Fits? |
|---|---|---|---|---|
| `accessoryInline` | 225 x 26 | one target [A4] | 0 | yes |
| `accessoryCircular` | 68 x 68 | 36 x 36 (46 x 46) | 0 | agreed: one 44 pt button would be the whole face |
| `accessoryRectangular` | 153 x 68 | 121 x 36 (131 x 46) | 1 | only at Lock Screen margins, which are smaller [H-W]; at 16 pt the 36 pt height is under 44 |
| `systemSmall` | 148 x 148 | 116 x 116 (126 x 126) | 2 | yes, as one row (100 of 116 wide, 60 pt left above it); stacked, 100 of 116 tall leaves 16 pt of background to tap |
| `systemMedium` | 321 x 148 | 289 x 116 | 4 | yes, one row (212 of 289) |
| `systemLarge` | 321 x 324 | 289 x 292 | 8 | yes, two rows of four |

</div>


On iPad the small widget is drawn at 141 pt and shown at 120 pt [H-W], so a 44 pt target lands at 37.4 pt on the device: above the 28 pt minimum, below the default (L4).

I agree with all six caps. They count buttons; nothing yet sets their size (M1).

## High

**H1. The notice leaves before VoiceOver reaches it (s8).** "Dismissed by a tap or after 6 s." A person using VoiceOver lands on the opened screen; by the time focus reaches the notice it may be gone, and with it the only explanation of why their button did something else. Apple: "Minimize use of time-boxed interface elements ... Prefer dismissing views with an explicit action" [H-A]. This is the channel s8 relies on for "never silently".
Fix (written into s8 as a proposal for Idris to take or answer): no timer. The notice stays until the person closes it (an X with the label "Close") or leaves that screen. It is posted to VoiceOver as an announcement when it appears. A notice that tells the person to change a setting carries a **Change** button that opens that widget's settings. Under Reduce Motion it fades in rather than sliding (L1).

## Medium

**M1. The caps limit how many buttons, not how small (s3, s7 item 4).** A script can draw five 20 pt buttons in a medium widget and pass the lint. Apple: "Pay attention to the size of targets" [A4]; 44 x 44 pt default, 28 x 28 minimum [H-A].
Fix: the renderer gives every drawn `Button` (and its `Link` form) a hit area of at least 44 x 44 pt (`.frame(minWidth: 44, minHeight: 44)` with `.contentShape(Rectangle())`), so the label may be small but the target is not. API.md's `Button` row says so and recommends one row of buttons in Small. The lint at `entry()` stays a count. On the Lock Screen (`accessoryRectangular`) the button's shape must read without colour, since the vibrant rendering drops it: a filled capsule, not a tint. Step 6's frames check one Small widget with two buttons at 148 pt and one Rectangular at 153 x 68.

**M2. The default row named the wrong default for half the widgets (s9). Fixed.** It read "Default (opens its Page)". A person's script widget defaults to `code` (s2). Now: "Default: opens its Page" for a premade, "Default: opens its code" for a script widget, first in the list.

**M3. The notices did not say whether anything ran, or where to fix it (s8). Fixed in words.** Someone who tapped "Add glass" and sees pywidget open needs to know first whether the glass counted. N2, N4 and N5 now start "Nothing ran:". N1 said "its default opened", which is our word, not theirs; it now says "pywidget opened its usual screen instead". N2 said "Choose another in the project's page": a person reads "page" as a Page, the output. The notices now say "the widget's settings", and s9 names the detail screen that. N6 sent a person who chose a file to Projects with no notice; with a chosen `file` it now gets one. N2's straight quotes are now curly, as the launcher's strings are.

**M4. "Run a function" on the tap opens pywidget, and the picker did not say so (s9). Fixed.** The plain summary says it; the setting did not. Footer under the choice: "A tap on the widget opens pywidget to run it. To run it without opening pywidget, use a button." Under "Open a web page" and "Open an app": "pywidget opens first, then the page or app." This claims order only, not time, so it stays true whatever #192 and step 9 find.

**M5. A button with only a symbol has nothing for VoiceOver to read (s7 item 2, s9).** `Button(action, *label)` accepts an image-only label. VoiceOver would read the symbol's name or nothing, and the Buttons row would have no title.
Fix: the renderer uses the label's text as the button's accessibility label. When the label has no text, it uses the action name with `_` read as a space ("add glass"), and the `entry()` lint prints one console line: "Button 'add_glass' has no text; VoiceOver will read its name." s9's Buttons rows are titled by the first instance's text label, else the name (fixed in s9). A button drawn as a `Link` carries the hint "Opens pywidget", so a VoiceOver user knows the tap leaves the Home Screen; an in-widget one carries none.

**M6. The link field has no words yet (s9; step 7 asks for them).** Proposed, DRAFT, for step 7's frames: keyboard `.URL`, no autocorrect or capitals; typing `example.com` with no scheme saves `https://example.com` and shows it. Errors under the field, one at a time: "Links start with https://." (any other scheme, `http` included); "This isn't a web address." (no host, or bad characters); "This link is too long (2,048 characters at most)." Save stays disabled until the field passes. The row shows the host only: "Opens example.com".

**M7. The Set Up App sheet blames the script when the setting is at fault (s5a, s8 N7).** `LauncherSlotSheet.why` `.badLink` says "Check the widget's script." For an `app` action chosen in the setting there is no script to check. `.unknown` for a removed slot shows the slot id ("music-2"), because the name went with the slot.
Fix (step 3, code, Idris): when the tap came from a stored `app` action, the sheet's reason ends "Choose another app in the widget's settings." and offers Change, as H1's notice does; a removed slot shows "The app this widget opened was removed from your saved apps." No change to the launcher's own taps.

**M8. Choices with nothing to pick (s9).** Script projects have no Pages in 1.0 (03-structure, working assumption "Pages in 1.1"), so "Open its Page" would open an empty list. Fixed in s9: hidden when the project has no Page. Still open for step 7: "Run a function" with no declared functions shows "This widget has no functions yet. Add one with @widget.action in its script." "Open an app" with no saved apps shows only "Add an app".

## Low

**L1. Reduce Motion (s4, s8).** The ADR does not mention it. The notice fades under Reduce Motion (H1). The renderer adds no moving `.transition` to a redraw after a button press; the system's default content change stays, and Apple caps animated updates at 2 s anyway [H-W].
**L2. The badge after a refused tap (s4 M2, ADR-007 s7) is the error badge.** A `busy` or `oom_guard` refusal is not the script's error. Its accessibility label should say what happened: "Didn't run. Tap again, or open pywidget." The look of the badge does not change.
**L3. Dynamic Type in the widget.** Widgets take Large to AX5 [H-W]. A button label is one line with `.minimumScaleFactor(0.8)` and never under 11 pt [H-W]; past that it shows the symbol alone with its accessibility label. On the project page the rows stack at accessibility sizes and a long link or file path truncates in the middle.
**L4. iPad's scaled Small widget.** 44 pt targets land at 37.4 pt (above). Acceptable; noted for step 9 if an Investor uses an iPad.
**L5. Done versus apply-at-once (s9).** iOS's pushed checkmark lists apply when you choose a row and go back (as Settings does). Keep "Done" only on the link field's screen, as Save. One fix for step 7.
**L6. Imported projects: confirmed.** Keeping `page`, `code`, `home` and `run` and resetting `link` and `app` is right in words as well: a person should never find their Home Screen opening a site they did not choose. The summary said "2 widget taps were reset", which is wrong when buttons were reset too. Fixed in s9: "2 widget actions that opened links or other apps were reset. You can set them again in each widget's settings.", with plural forms in the strings file.
**L7. Two spellings.** The ADR's strings say "pywidget"; the shipped launcher strings say "PyWidget". The product name is not approved (`creative/approved.md` "Not yet approved" item 12). Not changed here; the copy guide settles it once for every string.
**L8. "Paper and Studio, in light and dark" could read as four panels (s9). Fixed:** A Paper is the light appearance, B Studio the dark; two frames per screen.

## What I changed in the ADR (s8 and s9 words only; status untouched)

- s8 intro: H1 added as a proposal for Idris, after the original sentence, which stays until he takes or answers it.
- s8 N1 to N6: the notice text (M3).
- s9 When tapped: the six choice names, the default row per widget kind (M2), "Open its Page" hidden with no Page (M8), the two footers (M4), example row values.
- s9 Buttons: row titles (M5).
- s9 imported projects: the summary text (L6).
- s9 look line: Paper light, Studio dark (L8); VoiceOver reading of rows; "the widget's settings" named (M3).

Every string stays DRAFT until a copy guide is approved (C51).
{% endraw %}

</div>
