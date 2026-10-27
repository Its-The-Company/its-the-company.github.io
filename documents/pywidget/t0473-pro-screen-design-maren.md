---
layout: "default"
title: "T-0474: design review of the Pro screen (T-0473, 307297b1; fixes 0d5658e5)"
section: "documents"
description: "Summary: four of the six choices stand as built, one stands as built only for internal builds (4), and one needs a change (5, the chip glyph). Choice 2 is fixed by 0d5658e5, but the new line needs one colour change\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t0473-pro-screen-design-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 6 · Tue Oct 27</span><span><code>pywidget/docs/reviews/t0473-pro-screen-design-maren.md</code></span></div><h1>T-0474: design review of the Pro screen (T-0473, 307297b1; fixes 0d5658e5)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-27. Against IDE spec s5.7 (pywidget/docs/design/ide/spec.md). Read: the ten screenshots in ops/site-checks/pro-paywall-T-0473/ (they predate 0d5658e5), `ProPaywallView.swift` and `pro-strings.json` at 0d5658e5, and PRO_STR in `draw_ide.py`. No Xcode, no Simulator.

Summary: four of the six choices stand as built, one stands as built only for internal builds (4), and one needs a change (5, the chip glyph). Choice 2 is fixed by 0d5658e5, but the new line needs one colour change. Both draft strings now have final wording. Idris's changes are in T-0484. The links are T-0485. Three conditions are attached as notes to T-0191, T-0042 and T-0272.

## The six choices

**1. The state line is its own element, read after the button, not the button's hint. As built.** This is better than what s5.7.5 asked for. VoiceOver skips a hint when the person has turned hints off. For `ready` and `none` the button label is the same ("Unlock Pro · $0.99"), so the line is the only thing that tells them apart. It has to be in the tree. The announcement on a state change stays. I changed the spec to match (s5.7.5, VoiceOver order).

**2. A failed restore showed `ln.failed`, which says "purchase". Fixed by 0d5658e5. One change needed.** `restoreFailed` has its own line and keeps the priced `btn.ready`. It never shows "Try again", which would start a purchase. That is right. Spec s5.7.4 now has row 5b for it.
- **Change (T-0484 a):** on the offer screen `ln.restoreFailed` is drawn in `text.secondary`. The foot only colours `.failed` with `status.danger` (`ProPaywallView.swift`, `foot()`). A failed restore is a failed action, so it gets the same colour as a failed purchase.
- On the purchased screen the same line stays `text.secondary`. Pro is still active there, and a red line under a green check would say the opposite.

**3. No Terms of Use or Privacy Policy links until their URLs are decided. As built for internal builds. It blocks submission.** A link to a placeholder is worse than no link (Guideline 2.1(a), app-review-matrix row 65). Guideline 5.1.1(i) needs a privacy link inside the app (matrix row 41, gate <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">G11</span>). Settings is where it lives, so the Pro screen alone does not block. The spec still puts both links in this footer, after Restore. T-0485 brings them back once the URL exists, from the same constant Settings uses. Who decides the Terms target (Apple's standard EULA or our own terms) is not my call, and I have not made it. It is an open item for Ines and the Investors.

**4. `done.premades` names the Gallery, which T-0191 has not built. As built for internal builds only.** The string is true for the build that ships, so it stays. On a build without the Gallery it tells a buyer something false. Today the purchased screen is only reachable through the temporary More-menu entry, so the risk stays internal. The condition goes on T-0191: wire `onDoneAction` to the Gallery so `done.gallery` shows, add a UI test that taps it and lands on the Gallery, and send no external TestFlight or App Review build that sells Pro without the Gallery.

**5a. One SF Symbol (`square.grid.2x2`) on every chip. Change: no glyph on the chips (T-0484 b).** The same glyph seven times tells the reader nothing, and the row tile already shows it once. It also costs 20 pt of width per chip (15 glyph, 5 gap), which forces more lines on the 390 pt phone (four lines for seven chips today). It is fixed at 15 pt, so at AX5 it stays tiny next to the scaled text (`pro-ipad-light-ax5-offer.png`). Drawing a separate glyph for each premade is the other option. Every new premade would then need a glyph and a place to record it, and in this context a glyph does not help a buyer pick a premade. The smallest version that still reads is text-only chips. The marked-chip style for entry 1 stays. Spec s5.7.3 and `draw_ide.py` are changed.

**5b. Theme swatches not drawn while the themes row is off. As built.** Nothing ships that is not drawn. The condition is a note on T-0272: the build that turns the `themes` row on draws the swatches as s5.7.3 specifies, hidden at AX sizes.

**5c. Theme and package titles joined with `ListFormatter` (en_US, serial comma). As built.** That is the right tool. The hand-written strings on the same screen do not use the serial comma ("Home Screen, Lock Screen and StandBy"). The two styles only meet once the themes row ships. Which style wins is a question for the <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> copy pass, not a change now. Note for T-0272: the drawn `row.themes.t` "Ember, Fern and Graphite" will read "Ember, Fern, and Graphite".

**6. On iPad the screen is pushed full size with a 560 pt column. As built until Settings exists.** The column is centred, the foot is pinned, and the type matches the sheet. The empty middle on a 1180 pt tall screen is the cost of a full-size push. It goes away when the screen pushes inside the 560 × 700 Settings form sheet (s5.10.6). That condition is a note on T-0042.

## The two strings (final; still DRAFT C51 like every Pro string)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: The two strings (final; still DRAFT C51 like every Pro string), scrolls sideways" style="--tw:884px" markdown="1">

| ID | Was (Idris draft) | Now | Chars |
|---|---|---|---|
| `ln.pending` | This purchase needs approval or confirmation first. You can close this screen; Pro turns on once it goes through. | The purchase is waiting for approval. Pro turns on by itself. | 61 (was 113) |
| `ln.restoreFailed` | The App Store couldn’t restore the purchase. Try again later. | The App Store couldn’t restore the purchase. Try Restore purchase again. | 71 |

</div>


- **Why `ln.pending` is shorter.** The line is pinned under the button at every size (s5.7.5). At AX5 on the 390 pt phone it fits about 17 characters per line: `ln.ready`, at 41 characters, already takes 3 lines (`pro-phone-light-ax5-offer.png`). The 113-character draft would take about 7 lines, and the foot would cover most of the screen. "Approval" covers both Ask to Buy and a bank confirmation from the buyer's side. "By itself" says what "You can close this screen" said, in two words. Buy stays priced and enabled, and the line does not ask them to tap it again.
- **Why `ln.restoreFailed` changes.** It names the control by its label instead of "later". "Later" is vague, and next to a priced Buy button "Try again" reads as "buy again". "Restore purchase" is the link's label on both Pro screens and the row's label in Settings. That makes the line true in all three places. Settings' `set.restore.failed` now has the same text. T-0042 should read `ln.restoreFailed` and drop its own copy.
- **`btn.pending` is dropped.** No screen shows it since T-0481, and a string we ship but never show would still go to the Investors as copy.
- **New check.** `draw_ide.py --pro-strings` now fails on any `ln.*` longer than 72 characters (`PRO_LINE_MAX`; 72 is 5 lines at AX5 on the phone). Run today: 53 strings, 0 banned words, 0 buy buttons without a price, 0 lines over 72. `scripts/export_pro_strings.py --check`: 53 strings match.

## Also found

- **Settings `set.pro.pending` has no source.** Since T-0481, pending belongs to the open screen and is not stored, so the Settings row can only show "Not purchased" or "Active". This is a note on T-0042. I have not changed the s5.10 spec row yet. It is the Settings build's to settle.
- **Sheets owed.** The A/B-pro-phone and A-pro-ipad sheets still show the old chips, the disabled pending button and no 5b. `draw_ide.py` now draws the new ones. A redraw is owed (mine) the next time the IDE sheets run.

## Changed in this commit

`pywidget/docs/design/ide/draw_ide.py` (PRO_STR; PRO_STATES pending/restoreFailed; chips without glyph; line <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> in the C6 check), `pywidget/ios/App/Store/pro-strings.json` (regenerated), `pywidget/docs/design/ide/draw_settings.py` (`set.restore.failed` text), [`pywidget/docs/design/ide/spec.md`](ide-spec.html) (s5.7.3, s5.7.4, s5.7.5, s5.7.6, note), this file.
{% endraw %}

</div>
