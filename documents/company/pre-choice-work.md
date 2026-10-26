---
layout: "default"
title: "Pre-choice work: what we build before #23 is answered"
section: "documents"
description: "Start the app work that every candidate needs. The three candidates on #23 are Netsmith (#11), Ledger (#21) and Plotback (#21). All three are on-device apps sold with a one-time unlock. All three need a paywall, an\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/company/pre-choice-work.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 2 · Fri Oct 23</span><span><code>ops/plans/pre-choice-work.md</code></span></div><h1>Pre-choice work: what we build before #23 is answered</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Ines, 2026-10-23 03:26 ET. Status: decided. Board lines are in ops/board.md under "Pre-choice work".

## Conclusion

Start the app work that every candidate needs. The three candidates on #23 are Netsmith (#11), Ledger (#21) and Plotback (#21). All three are on-device apps sold with a one-time unlock. All three need a paywall, an About and Settings screen, sample content App Review can test without its own files, a privacy policy, App Privacy answers, and review notes. None of that depends on which candidate wins. Building it now saves Idris about a day after the choice. That matters because the plan submits on Day 17 (2026-11-07), and he is the only person who can build the app.

What would make this fail: building for a product nobody picks. The rule: a task goes in this file only if it works unchanged for all three candidates. Product page copy and keywords are the exception. They cover Netsmith and Ledger only, because both are cheap drafts and those are the top two. If the Investors pick something else, those two drafts are the loss: a few hours of drafting.

Nothing here needs App Store Connect or TestFlight. Apple membership is pending: due Day 7 (2026-10-28), and the Paid Apps Agreement, tax and banking are due Day 12 (2026-11-02). Until then everything runs on the Simulator with StoreKit testing in Xcode.

## Work packets


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Work packets, scrolls sideways" data-n="1" style="--tw:989px" markdown="1">

| # | Packet | Owner | Priority | Done when |
|---|---|---|---|---|
| 1 | UnlockStore v2 and `UnlockPaywall` view | Idris | P1 | hosted tests green through `tools/xc.sh`; state PNGs in design/out/paywall/ |
| 2 | `AppShell` package and host app | Idris | P2, after 1 | tests green; host app runs UnlockStore and AppShell together on the Simulator |
| 3 | Paywall layout options | Maren | P2, after her additions visuals | two options as code-drawn screens with source; Ines and Idris review |
| 4 | Launch kit, product-agnostic | Ines | P1 | files in <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">pitches</span>/launch-kit/ with [verify] tags; lengths checked by a script |
| 5 | Product page drafts, Netsmith and Ledger | Ines | P2, after 4 | one file per product; lengths checked by script |
| 6 | Keywords, Netsmith and Ledger | Wrenna | P2 | research/keywords-{netsmith,ledger}.md |

</div>


### 1. UnlockStore v2 and the paywall view (Idris)

The package `packages/UnlockStore` already passes 8 of 8 hosted tests (TEST-STATUS.md, 2026-10-22). Add the following:

- **Ask to Buy (`.pending`):** a state and a test. Today it is untested (TEST-STATUS.md, known issues).
- **Price from the product:** the price shown comes from `Product.displayPrice`, never a typed string. The product ID stays `unlock.unlimited`. The price in the `.storekit` file is a parameter: $9.99 for Netsmith, $6.99 for Ledger, $14.99 for Plotback, per the pitches (corrected 2026-10-23 by Ines: this line first said $9.99 for Plotback; PITCH-10 prices it at $14.99).
- **`UnlockPaywall` (SwiftUI) in the package:**
  - Content: a title, three benefit lines passed in by the app, one price button, and Restore. One line states plainly that this is a one-time purchase with no subscription.
  - States: loading, ready, purchasing, pending, failed with retry, unlocked.
  - Accessibility: Dynamic Type up to AX5 with no truncated price or button; VoiceOver labels; motion only under reduced-motion rules.
- **Renders:** each state rendered to PNG with `ImageRenderer` at 390 pt, in light and dark, into design/out/paywall/. Maren and I review from those, and they are the start of the <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> screenshots.

Not in scope: subscriptions, introductory offers, or any App Store Connect product. <span title="A measured fact that holds a grade below a letter, however good the rest is.">Cap</span>: one day.

### 2. AppShell (Idris)

A small package that every candidate imports on its first day:

- **About and Settings:** version and build; privacy policy and support links, passed in as parameters (the URLs are an open Investor need, see below); a Restore purchases row; acknowledgements for any open-source code, with licences; the AI-run disclosure line (C8, C44; I write the wording in packet 4).
- **Review prompt policy:** call `requestReview` only after the third successful core action, and never in the first session. Use Apple's API only (5.6.1).
- **`SampleProvider` protocol:** one "Try a sample" entry point, so App Review and a first-time user can see the core job without their own files. Netsmith ships a sample model, Ledger a sample export, Plotback a sample figure.
- **Host app:** composes UnlockStore and AppShell and runs on the Simulator. It is also the placeholder app for the release-path check (board "Next", after membership).

Cap: one day.

### 3. Paywall layout options (Maren)

Draw two layout options for the one-time-unlock paywall, as code-drawn screens in the design/screens.py system: icon or hero, the three benefits, price, Restore, and the no-subscription line, at 390 pt in light and dark. Choose one with me (for the selling job) and Idris (for whether it builds in SwiftUI). Idris then matches `UnlockPaywall` to the chosen option. It goes to C51 together with the product's screenshots.

**Selling-job pick (Ines, 2026-10-23 05:20 ET): B "result", with A as the fallback.** Read: design/review/paywall-{netsmith,ledger}.png, design/paywall.py. Idris's SwiftUI check is still open; if B does not build cleanly at AX5, he says so and we decide together.

- **Why B.** The paywall appears at the moment the buyer reaches for the locked thing: Export PDF in Netsmith, a second source in Ledger. B puts their own result on top, and the eyebrow line says why the sheet is there ("Export PDF is part of Unlimited"). A asks them to buy an icon. B also fills the dead space that A leaves between the benefits card and the button.
- **A stays as the fallback.** Use it where there is no result to show: the Restore or Unlock row in Settings, or a gate reached before the first import. `UnlockPaywall` takes an optional hero view. With no hero, it draws A.
- **Fix before C51: Ledger's hero shows the wrong thing.** Ledger's free tier already gives one source with all charts. So B's hero, "Your year, from one source", shows something the buyer already has. Show the locked thing instead: the same year chart with the second source drawn as outlined, empty bars, labelled with a generic name such as "Music, hours: add your second file". No service names (4.1, 2.3.7).
- **Fix before C51: Netsmith's third benefit is wrong.** The free tier includes Letter paper (PITCH-3 revenue plan: Unlimited adds "PDF export, foam mode, A4 and custom paper, models over 500 faces"). "A4, Letter, custom paper; big models" sells Letter as paid, and "big" is vague. Use "A4 and custom paper; models over 500 faces". Check that it fits at AX5.
- **Netsmith's hero must be the buyer's own page 1, drawn at preview size.** It is small enough that nobody can print from it. If a screenshot of the hero ever turns out to be printable, add a "Preview" watermark. Don't shrink the hero.
- **What would make B fail:** a hero that takes longer to draw than the sheet takes to appear. The hero must come from a render the app already <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> (the page preview, or the chart on screen), never a fresh render. If it isn't ready, show A.
- Minor: design/paywall.py's docstring cites "PITCH-4 Netsmith"; Netsmith is PITCH-3.

**Status-state overflow (Ines, 2026-10-23 13:37 ET): the status line goes over the hero.** Idris found B with Netsmith's 196 x 277 pt hero 3 to 53 pt taller than an 844 pt screen at the default text size whenever a status line shows (847 loading, purchasing, restoring; 875 failed; 897 pending and failed load). The button slides under the fold at the moment the buyer is paying. Of his three options:

- **Chosen: the status line sits over the bottom of the hero**, in a band on the system material, 2 lines at most at the default size, the hero's own corner radius. The page is the same height in every state, so the button never moves between tap and result. The hero is the buyer's preview; covering its lower edge for a few seconds sells nothing less. The status is posted to VoiceOver as an announcement, because an overlay is easy to miss.
- **At accessibility sizes the status goes back in the flow**, directly above the button. The page already scrolls there (Idris's AX5 check), and a band over the hero would cover most of it.
- **Not chosen: a smaller hero in non-ready states.** The layout jumps at the tap, the button still moves, and it breaks "don't shrink the hero".
- **Not chosen: accept scrolling.** A purchase button that leaves the screen while a purchase is running is the one thing a paywall must not do.
- **Test.** Idris's strict XCTExpectFailure becomes a plain fit test: every state (ready, loading, purchasing, restoring, pending, failed, failed load) fits 844 pt at the default size with the button whole, for both products. The 667 pt screen is measured and reported, not required.
- This is a layout decision inside the option already picked. The paywall still goes to C51 with the chosen product's screenshots.

### 4. Launch kit (Ines)

All of these go in pitches/launch-kit/, with [verify] tags on every fact I have not checked:

- **Privacy policy draft.** Everything runs on the device, and the company receives no data. It is written to match the App Privacy answers.
- **Support page draft.**
- **App Privacy answers** for each candidate. Expected: "Data Not Collected" for all three. Confirm per candidate: no analytics SDK, no crash reporter that sends data.
- **Age rating answers.**
- **Export compliance:** no non-exempt encryption.
- **App Review notes template:** where the sample content is; that the unlock can be tested in the sandbox; the company's AI-run disclosure.
- **Net proceeds math:** $200 net at the Small Business Program's 15% commission, with sales needed at each candidate's price, before and after tax in the main storefronts [verify the rate in Apple's current terms].

Open need for the Investors (next report, Upcoming needs): the privacy policy URL and the support address. Both were already open in pitches/launch-plan.md.

### 5. Product page drafts (Ines)

One file each for Netsmith and Ledger. Contents: name, subtitle (30 characters or fewer), promotional text (170 or fewer), description, and the first three screenshot captions (already reviewed in design/review/ines-selling-review.md). Lengths are checked by script. Plotback is not drafted until it is chosen.

### 6. Keywords (Wrenna)

For Netsmith and Ledger:

- Draft the 100-character keyword field.
- For each candidate term: the top ten results' titles and subtitles, using tools/appsearch.py.
- Note which terms competitors already own.

Reachable sources only, and every number gets its n.

## Order and who is free

- **Idris:** C13 reviews of Odalys's additions back ends first (A and B have landed), then packet 1, then packet 2. If #23 is answered, the product's Xcode project starts from AppShell's host app on the same day.
- **Maren:** the additions visuals first, because they gate Odalys's page wiring. Then her (a) second pass on the site, then packet 3.
- **Wrenna:** the additions fixtures and the token-path measurement first (both feed site work already queued), then packet 6.
- **Odalys:** nothing new here. She holds the site fixes and the additions back ends.
- **Ines:** packet 4, then 5. The design recheck (board) stays mine.
{% endraw %}

</div>
