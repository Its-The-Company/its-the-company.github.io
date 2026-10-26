---
layout: "default"
title: "Widget states v0: error badge, stale mark, error card, update card, locked premade tile"
section: "documents"
description: "A failed run also means old data, so the badge outranks the stale mark. Never a blank widget."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/pywidget/state-spec.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/design/states/state-spec.md</code></span></div><h1>Widget states v0: error badge, stale mark, error card, update card, locked premade tile</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-25. Status: **proposal** (<span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>; nothing approved). Source: PROPOSAL-002 s5 (error states on the widget) and s6 (premades: live preview, Pro lock, source after purchase). Direction A shown; every colour is a role from `../tokens.json`, so direction B is a token swap.

Files (all in this folder):
- `state-tokens.json`: priority, slot geometry, SF Symbol names, role per mode, surfaces per family, copy strings, VoiceOver strings. Single source for the drawings and for the build.
- `draw_states.py`: draws the six sheets and writes `qa.json`. Imports the shared widget drawings from `../mockups/draw.py`. Headless Chromium, no image model.
- `check_states.py`: runs `../check_tokens.py` (336 pairs, 0 fails), then 71 state pairs (60 token pairs, 11 mockup approximations), 0 fails, plus the copy rules of s3.1 and s3.2, the stale rule of s1 (`>=`, absent means never) and "Double-tap" in every VoiceOver string. Closest: vibrant white 0.66 on the accessory background, 5.30:1.
- Sheets (1x, 1,595,639 B for the first six): `states-small.png`, `states-medium.png`, `states-large.png`, `states-xl.png`, `states-lock.png`, `gallery-locked.png`. Added 2026-10-25 21:10: `states-too-large.png` (297,270 B) and `states-pro-card.png` (177,330 B), every family and every surface mode on one sheet each (`draw_states.py too-large`, `draw_states.py pro-card`; a one-sheet run now merges into `qa.json`). `qa.json`: 0 clipped, 0 truncated, 0 off canvas, 0 text over text, 0 under 11 pt, 0 slot over text, 0 traceback text, 0 exception types on the Lock Screen; on the two new sheets also 0 Pro-card words outside the allowed set, 0 prices, 0 slots on a Pro card, 0 blame words on the too-large card, 0 text outside the accessoryCircular circle.

## 1. Which state shows

One state at a time; first match wins (`state-tokens.json` `priority`):


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Which state shows, scrolls sideways" data-n="1" style="--tw:781px" markdown="1">

| # | State | Trigger (renderer) | Shows |
|---|---|---|---|
| 1 | Update card | tree `version` is not one this renderer reads | Card naming the update |
| 2 | Pro card | a Pro premade, and `entitlement.json` lacks its entitlement or is missing (<span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling item 3, ADR-007 7.1 row 2) | Card: lock, name, "Needs Pro", "Tap to open" (s3.2) |
| 3 | Error card | no good render in the App Group yet; **or** `render-fault.json` says `tree_too_large` | Card: "Script error", line, "Tap to open"; the too-large variant (s3.1) |
| 4 | Error badge | newest run failed, a last good render exists | Last good render plus badge in the slot |
| 5 | Stale mark | `stale_after` is set and `now >= sampled_at + stale_after` (at or after: ADR-007 7.1 row 5, chair line Ruling 3). Absent `stale_after`: never stale (ADR-007 7.4, chair line A1) | Last good render plus clock in the slot |

</div>


A failed run also means old data, so the badge outranks the stale mark. Never a blank widget.

**Stale needs its own timeline entry.** A widget only redraws at entries. The provider inserts one synthetic entry with `stale = true` at `T = sampled_at + stale_after`, wherever T falls among the entries, not only after the last one (ADR-007 7.4, S9); if T has already passed, the current entry is stale from the start. Without that entry the mark would wait for the next reload. The entry at T itself is stale, so the trigger is `>=`, not `>`; a `>` would leave it unmarked. If the synthetic entry ends up last, an `.atEnd` reload moves to T; that is the right moment to ask, not an extra reload (the 7.4 fixture asserts it). Closed by the ADR-007 chair line, Ruling 3 (Ines, 2026-10-25 21:08), which answers the earlier question to Idris.

**Absent `stale_after` means never stale**, as the shipped DSL does: no synthetic entry, no clock. The honest default sits in the IDE's "New widget" template instead, which sets `stale_after=timedelta(minutes=30)` as the premades do (chair line A1; template line is Pernille's and Idris's).

**Pro card row.** Ruling 3's third delta (Pro card between the update card and the error card) was already in this table and in `priority` from the 20:08 ruling; `check_states.py` fails if it moves.

## 2. The corner slot (badge and stale mark, Home Screen families)

- 16 pt glyph, centre 14 pt from the top and trailing edges, so it sits in the default 16 pt content margin and never moves or covers the user's layout. QA: 0 slot-over-text in every family.
- 2 pt halo in the widget's own container background (full colour and accented). No halo in vibrant.
- Margins under 14 pt (some devices, StandBy): same size and position; it overlaps the content corner and the halo keeps it legible.
- Badge = `exclamationmark.circle.fill` (filled, heavy: act). Stale = `clock` (outline, light: information). Same slot, different weight, so they read apart in grey.
- Small: one tap target, so the badge is not separately tappable; the widget keeps the user's `widgetURL`, or opens the run log if the script set none. Medium and larger: the slot is a `Link` to the widget's Activity screen.

## 3. The cards (renderer-drawn)


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. The cards (renderer-drawn), scrolls sideways" style="--tw:804px" markdown="1">

| Family | Error card | Update card |
|---|---|---|
| systemSmall | glyph + widget name, "Script error", "Line 12", "Tap to open" at the bottom | glyph + name, "Update", "Needs a newer pywidget", "Tap to open" |
| systemMedium | small composition left; right: exception type (mono, one line, tail truncation), "in trip.py", "Failing since 8:48" | right: "View tree v2", "This app reads v1", "Update in the App Store" |
| systemLarge | medium composition, then "Recent runs": 4 rows of time, glyph, "Failed", duration | medium composition, then "What to do": 3 numbered steps |
| systemExtraLarge | medium composition and the run list side by side, centred vertically | same with the steps |
| accessoryCircular | glyph, "Line 12" | glyph, "Update" |
| accessoryRectangular | glyph + "Script error"; "Line 12"; "Tap to open" | glyph + "Update needed"; "Needs a newer pywidget"; "Tap to open" |
| accessoryInline | glyph + "Error, line 12" (14 chars) | glyph + "Update pywidget" (15 chars) |

</div>


The whole card is the tap target: `widgetURL` to `pywidget://open?widget=<id>&line=<n>` (IDE at the failing line, ADR-001 "go to line"). The update card opens the app's update prompt.

**No traceback, anywhere.** No widget in any family shows the traceback or the exception message: messages can carry the script's data. The exception type and file name appear only on Home Screen medium, large and extra large. The Lock Screen is public, so its cards show the line number only (`check_states.py` and `qa.json` test both rules). The full traceback stays in the Activity screen.

### 3.1 Error card, `tree_too_large` variant (proposed copy, C51)

ADR-007 7.1 row 3 and 7.2: the extension's render rule (ADR-007 s6) refused the tree. The script ran and returned a valid tree; nothing in it failed. So the card says what happened and does not blame the script. Sheet: `states-too-large.png`.

- **Glyph:** `arrow.down.right.and.arrow.up.left.circle.fill` [recall, Idris confirms the name] in `status.warning`, never `status.danger`. Same colour family as the update card: both mean "nothing wrong in your code, one step to take". Accented: the glyph alone is accentable. Vibrant: white 1.0.
- **No line number, no exception type, no file name.** There is no failing line. Same position as the error card's words, so the card grammar <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span>.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 3.1 Error card, tree_too_large variant (proposed copy, C51), scrolls sideways" style="--tw:484px" markdown="1">

| Family | Copy |
|---|---|
| systemSmall | glyph + name, "Too big to draw", "Script ran fine", "Tap to open" |
| systemMedium | small composition left; right: "Its view is more than a widget can hold in memory.", "Details in Activity" |
| systemLarge | medium composition, then "What to do": 1 "Open it in pywidget", 2 "Show fewer rows or images", 3 "Run it to draw again" |
| systemExtraLarge | medium composition and the steps side by side |
| accessoryCircular | glyph, "Too big" |
| accessoryRectangular | glyph + "Too big to draw"; "Script ran fine"; "Tap to open" |
| accessoryInline | glyph + "Too big to draw" (15 chars) |

</div>


- **Tap:** the widget's Activity screen, where the app logs the fault as a run row on its next launch (ADR-007 7.2): `pywidget://open?widget=<id>&view=activity` (proposed; Idris names the route).
- **VoiceOver:** "{widget}. Too big to draw in a widget. The script ran fine. Double-tap to open its activity."
- **Step 2 is advice, not a promise.** The rule compares render cost with live headroom (ADR-007 s6), so a smaller view is the user's one lever; the card does not quote MB figures we have not measured.
- `check_states.py` fails if any too-large string says error, fail, crash or bug, or carries a line number. The QA in `draw_states.py` checks the drawn text the same way.

### 3.2 Pro card (proposed copy, C51)

Chair ruling 2026-10-25 20:08 item 3, ADR-007 7.1 row 2. A placed Pro premade whose entitlement is gone (refund, Family Sharing removed, restore on a new device not yet run). The app has stopped writing its timeline. Sheet: `states-pro-card.png`.

- **Home Screen, every family:** lock glyph, the premade's name (caption, `text.secondary`, <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> as on the other cards), "Needs Pro" (headline, `text.primary`), "Tap to open" (caption). Nothing else. Centred in the widget: this is a whole-widget state, not a report on a run, and centring tells it apart from the error cards in grey. Large and extra large stay mostly empty; that is the honest picture of a widget that is not running.
- **Lock Screen:** glyph and "Needs Pro" only (circular: glyph above the words; rectangular: one line at the top; inline: glyph + "Needs Pro", 9 chars). No name.
- **Never the last good render** (it would keep Pro content running unpaid), never blank, never a price, a currency, "Buy", "Unlock", "trial" or "subscribe" (App Review 2.5.16, ruling item 3). No corner slot on a Pro card.
- **Glyph:** `lock.fill`. Full colour `text.secondary` (quiet, not an alarm: 3:1 checked in A and B, light and dark); accented: the glyph alone is accentable; vibrant: white 1.0.
- **Tap:** the premade's detail sheet (ruling item 3), which carries the offer in the app, not on the Home Screen. Small: `widgetURL`; medium and larger: the whole card is the target.
- **VoiceOver:** "{name}. Needs Pro. Double-tap to open in pywidget." Same string on the Lock Screen. Aligned 2026-10-25 from the 20:08 ruling's "Tap to open in pywidget": the ruling decides placement and the card's visible words; its item 4 quotes the VoiceOver string as the delta to draw, and nothing in its reasoning is about the verb. VoiceOver activates with a double tap, and the other four card strings already say "Double-tap", so a bare "Tap" would teach the wrong gesture on one card. The visible word stays "Tap to open", as on every card, so no sheet changes. `check_states.py` now fails on any VoiceOver string that says "Tap" without "Double-". Ines can reverse it in one line of `state-tokens.json`.
- `check_states.py` fails if `pro_card` is not between `update` and `error_card` in `priority`, if any Pro card string (or its VoiceOver) carries a price or sales word, or if the Lock Screen string is more than the title. `draw_states.py` QA fails on any drawn word outside {name, "Needs Pro", "Tap to open"} (Lock Screen: "Needs Pro"), any price, any slot on a Pro card, and any text outside the accessoryCircular circle.

## 4. Rendering modes


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 4. Rendering modes, scrolls sideways" style="--tw:987px" markdown="1">

| Mode | Glyphs | Words | Background |
|---|---|---|---|
| Full colour | badge `status.danger`, update `status.warning`, stale `text.secondary`; knock-out `bg.surface` | `text.primary`, `text.secondary` | `bg.surface` |
| Accented | the glyph alone takes `.widgetAccentable()` | default group (primary, secondary opacity) | system |
| Vibrant | white 1.0 (stale 0.66), knock-out transparent | white 1.0 and 0.66 | none; wallpaper or StandBy black |

</div>


Surfaces per family (`state-tokens.json` `surfaces`, [recall], Idris confirms): small meets full colour, accented and vibrant (StandBy); medium, large and extra large meet full colour and accented; the three Lock Screen families meet vibrant only. "Run as widget" offers only these combinations. The sheets draw exactly these.

## 5. Lock Screen families

No margins, so the slot changes:
- accessoryCircular: 14 pt glyph in the top-trailing corner of the 72 pt square, outside the ring. **Unverified:** the square's corner may be clipped to the circle; if it is, the glyph moves to replace the label line. Idris checks in the Simulator.
- accessoryRectangular: the user's content is laid out 18 pt narrower (142 pt), the 14 pt glyph at the top-trailing end.
- accessoryInline: the leading symbol is replaced by the state glyph; the text stays.

## 6. Locked premade tile (gallery)

Anatomy: preview well (live render of the real premade in the selected mode) / name + chip / family / caption.
- Pro: chip `lock.fill` + "Pro" (`key.text` on `key.bgAlt`), caption "Live preview. Source opens with Pro." (`text.tertiary`).
- Free: chip "Free" (`text.secondary` on `bg.sunken`) and an "Open source" button.
- Locked tiles have **no source path**: no button, no "View source" in the context menu, no source in Share or drag. Tap opens the premade's detail sheet, which offers Pro.
- The gallery has one mode switch (Full colour, Accented, Vibrant) that redraws every preview. Lock Screen premades always preview vibrant; small previews StandBy in vibrant.
- One primary action per screen: "Unlock with Pro" in the section header (`accent`).
- Extra large tiles appear only in the iPad gallery, at 100%.
- VoiceOver: "{name}, {family} widget, Pro. Live preview. Source opens with Pro."

## 7. VoiceOver

Strings in `state-tokens.json` `voiceover`. Each state is one combined element: the badge, for example, reads "Trip. Last run failed at 9:12. Showing the result from 8:40." Glyphs alone are `accessibilityHidden`.

## 8. Open

1. Can a free user place a Pro premade on the Home Screen? PROPOSAL-002 s6 says "live preview to everyone, source after purchase" but does not say. The tile assumes no (preview only). Ines decides. **Answered:** no, by the chair ruling below; the Pro card (s3.2) is its item 3.
2. accessoryCircular corner clipping (section 5). Idris, Simulator.
3. The surfaces table is from memory of Apple's rules; Idris confirms with design-system-v0 s10.
6. Pro card VoiceOver: **Closed 2026-10-25**, aligned to "Double-tap" (s3.2 says why).
9. The five sheets drawn before 21:10 caption the stale mark "now − sampled_at > stale_after". The drawn state is unchanged by Ruling 3, so they were not redrawn; `draw_states.py` now writes "now ≥ sampled_at + stale_after", and the next redraw carries it. s1 is the rule.
7. The too-large glyph name and the `view=activity` route are [recall] and proposed; Idris confirms both. Dark extra large is not drawn on the two new sheets (same layout as light on dark tokens, dropped to keep the PNG under 300 KB); the dark token pairs are checked.
8. The too-large card is decided per render; `render-fault.json` is the record for the app, not a sticky state. When a smaller tree arrives and passes the rule, the card goes without the app clearing anything. Idris confirms the renderer reads it that way.
4. iOS 26 Clear style: treated as accented here [recall]; not drawn.
5. Ines reviews; then `state-tokens.json` merges into `tokens.json` under `widget.states`. C51 approval goes with the direction pick.

## Chair ruling, 2026-10-25 20:08 ET (Ines): may a free user place a Pro premade on the Home Screen

Open item 1 above. Read: PROPOSAL-001 (options 2 and 3, questions 1-2), PROPOSAL-002 s5-s6 (3 free, 9 Pro; 6 and 6 under option 3), ADR-001 3.1 (C11, C12), L11 s1 and s3 (window effects, conversion assumptions), app-review-matrix.md rows 25 and 32 and the 3.1.1 and 2.5.16 lines in its section 1.

**Ruling: no. Placement follows the lock.** A free user sees every Pro premade as a live preview and cannot put it on the Home Screen, the Lock Screen or StandBy. No time-boxed trial placement in v1. No "one Pro premade of your choice" slot. The free share of the library (3 now; 6 if the Investors approve PROPOSAL-001 option 3) is the free user's Home Screen presence, and the user's own scripts as widgets stay free and unlimited. This sits inside every PROPOSAL-001 option: which premades are locked is configuration (the one flag file in the Pro purchase line); placement reads the same flag. If the Investors make all premades free, the rule has nothing to act on.

What it means in the build:
1. **Gallery and detail sheet (s6 as drawn).** The live preview runs the real premade on the user's own data, in every family it claims and in the gallery's three modes. The detail sheet's one primary action for a free user is "Unlock with Pro"; after purchase it becomes the add action. No source path, as drawn.
2. **The system widget picker.** The configuration list (the widget's App Intent entity query) offers the user's own widgets, the free premades, and Pro premades only when the entitlement is present. A free user never configures a Pro premade from the Home Screen side, so no locked widget is ever placed.
3. **Entitlement lost after placement** (refund, Family Sharing removed, restore on a new device not yet run). The app stops writing that premade's timeline and the widget shows a new state, the **Pro card**: lock glyph, the premade's name, "Needs Pro", "Tap to open". Never the last good render (that would keep the Pro content running unpaid), never blank, never a price or "Buy" on the Home Screen. Tap opens the premade's detail sheet. Priority: after the update card, before the error card (no run is made, so there is nothing to badge). Lock Screen families: glyph and "Needs Pro" only.
4. **Deltas:** Maren draws the Pro card in all families and the three modes, with its VoiceOver string ("{name}. Needs Pro. Tap to open in pywidget."), adds it to `state-tokens.json` `priority`, and checks it with `check_states.py`. Idris builds items 2 and 3 with the Pro purchase line, tested with the StoreKit configuration file (purchase, refund, restore). Board lines added.

Why, on conversion (arithmetic on L11's stated assumptions, not a forecast):
- The highest-intent moment we get is a free user tapping a Pro premade because they want it on their Home Screen. Preview-only meets that moment with the offer, every time. A trial spends it and moves the decision to the trial's end.
- The window is 10-13 selling days (L11 s1). With a 7-day trial and downloads spread evenly, users who arrive in the last 7 days reach the end of their trial after <span title="Our arithmetic estimate of what the idea would earn by day 30 (the $200 deadline) or day 90. It never raises a grade.">Day 30</span>: 54% to 70% of the window (7 of 13, 7 of 10). For a one-time purchase that is the same effect L11 found for trials on subscriptions: money moves out of the window.
- The live preview already removes most of what a trial would teach: it is the real widget with the user's own steps, sunrise and repository. What a trial adds is ownership on the Home Screen, and we could not tell whether it worked: the privacy label is "Data Not Collected", so the app measures no trial conversion. App Store Connect gives downloads and purchases in aggregate only.
- Pro must hold something worth $9.99 (PROPOSAL-001 s2: 29 sales at 30%, 24 at 15%). A free pick of one Pro premade gives away a ninth of option 2's contents to every user, and adds a choice screen and saved state, to save a decision the preview already makes easy.

Why, on App Review (tags as in the matrix; the guideline page is unread until #59, so these may only move up):
- 3.1.1 [snippet]: Pro is unlocked by one in-app purchase and nothing else; preview-only adds nothing beside it. A time-boxed trial of a non-consumable is, as I recall the guideline [recall], a second, zero-price non-consumable named as a trial, which must state its length, what stops at the end and the price before it starts. That is a second App Store Connect product (waits on the membership, Day 7, and the Paid Apps Agreement, Day 12), a second item for the reviewer to test, and a clock in our code. Not for a first submission.
- 2.5.16 [snippet]: widgets "should be related to the content and functionality of your app". A placed widget that turns into a sales notice when a trial ends is an advertisement on the Home Screen. Under this ruling no free user ever has one; the Pro card in item 3 appears only after a refund or a revoked share, and carries no price or sales copy.
- 2.3.1 and 2.5.19 (matrix rows 25 and 32): locked premades stay visible, previewable and named in the store text, so nothing is hidden and Pro's contents match the build. Rows 25 and 32 are unchanged by this ruling.

PROPOSAL-001: the ruling does not change options 1-5 or the price. A free trial is a price shape, so it is the Investors' (final pricing is a human checkpoint in the build brief, as PROPOSAL-001 states), not mine: question 2 now names it, with the company's recommendation (none in the launch window) and the default (none). ops/questions.md item 1 says the same.

Revisit: in 1.1, if App Store Connect shows Pro purchases under 1% of downloads (L11's low assumption) over the first 30 days on sale, test a trial then, with the Investors' approval of the price shape.
{% endraw %}

</div>
