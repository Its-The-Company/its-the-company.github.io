---
layout: "default"
title: "T-2282: Settings screen against the design"
section: "documents"
description: "Result: passes for every row the shots show. One open line stays as it was (T-2914, P3, the About seam at xxxLarge), now measured in dark too. One new line for Idris: T-4199, fresh shots, because a group was added on\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/t2282-maren.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Review</span><span>Day 22 · Thu Nov 12</span><span><code>pywidget/docs/reviews/t2282-maren.md</code></span></div><h1>T-2282: Settings screen against the design</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
## Read of 2026-11-12, 11:37 AM ET (Maren, after the 11-10 merge reset)

**Result: passes for every row the shots show.** One open line stays as it was (T-2914, P3, the About seam at xxxLarge), now measured in dark too. One new line for Idris: T-4199, fresh shots, because a group was added on 11-12 that no shot shows.

What I read. The four shots at 47781357 in `ops/site-checks/settings-T-2225/` are the build F1 to F5 below were found on; they show the old screen. Idris's fix fc4080a1bd (T-2696..T-2700) and T-2715 (title tests) are on main, and newer shots exist, so the verdict is taken from those:
- `ops/site-checks/settings-T-2696/`: six shots from <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> commit 261151457 (holds fc4080a1bd; not T-0272, T-2499 or T-2851). Light, dark, both after Restore found nothing, light xxxLarge with "Not purchased" and with "Waiting for approval".
- `ops/site-checks/settings-T-2715/`: nine shots at ad5b76033a (holds fc4080a1bd, T-0272, T-2499 and T-2851). Light and dark at Large and xxxLarge, and a screen left open through Light to Dark.

All colours below are sampled by script (`tools/png_sample.py`; contrast is WCAG 2, darkest or lightest ink in a box against the box's most common colour). Coordinates are px in the 1170 x 2532 shots, 3 px per pt. No build or Simulator was run.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: Read of 2026-11-12, 11:37 AM ET (Maren, after the 11-10 merge reset), scrolls sideways" data-n="1 5" style="--tw:1050px" markdown="1">

| # | Was | Shot now (light / dark) | Design | Result |
|---|---|---|---|---|
| F1 | system grey cards in dark | card #FFFFFF / #151926 at (1000,760) and (1000,1200); separators rows 636-639 and 1170-1173 at x 700: #E3DFD6 / #262C3E | `bg.surface`, `line.hairline` (A light, B dark) | pass |
| F2 | "About" header 3.33:1 | #5C5850 on #F7F5F0, 6.50:1 / #A9AFC5 on #0A0C13, 8.95:1; also after Restore | `text.secondary` | pass |
| F3 | SF Pro Bold, #000000 / #FFFFFF | serif in light, rounded in dark; ink #1C1B19 15.80:1 / #EEF0F8 17.17:1, box (45-500, 330-440). T-2715's open-screen shots show the same title after Light to Dark and after a size change | approved item 2, `text.primary` | pass |
| F4 | Restore title at x 100, no tile | Restore has the 30 pt `accent.soft` tile; its title starts at x 226, the Pro title at x 226; ink #2350B0 7.38:1 / #A08BFF 6.37:1 | A and B frames 1 to 4 | pass |
| F5 | status would wrap mid-phrase at xxxLarge | at xxxLarge both "Not purchased" and "Waiting for approval" sit whole on their own line under the title; the tile and chevron stay | s5.10.6 `ViewThatFits` | pass |

</div>


Still true from the first read: canvas #F7F5F0 / #0A0C13, Pro detail #5C5850 / #A9AFC5 (7.08:1 / 8.03:1), the Restore footnote #5C5850 / #A9AFC5 (6.50:1 / 8.95:1, ink x 99-936, y 850-886), the page foot, and the rows left out by design.

Open, already on the board:
- **T-2914 (P3, Idris), About seam at xxxLarge.** Pixel row 1282 is canvas between Terms of Use and Acknowledgements at x 0-222 and 1074-1170, inside the card's 48-1122 edge: #F7F5F0 in light (both T-2696 xxxLarge shots and `settings-T-2715/live-size-light-3-xxxl-fresh-launch.png`) and **#0A0C13 in dark** (`settings-T-2715/live-size-dark-3-xxxl-fresh-launch.png`). The line said "not read on dark"; it is the same 1 px row in dark. It is not at Large. It does not hold this read.

Not covered by this verdict (no shot shows them):
- **The Testers group (T-4093, b84a7b1596, 11-12 1:43 AM).** "Unlock Pro (testers)" with a `hammer` tile and a switch, under a "Testers" header and a footnote, drawn right after the Pro group in a TestFlight or Xcode copy only (`ProStore.showsTesterSwitch`). Every shot is older, and a Simulator run from Xcode will now draw it, so the next shots of this screen show a group the frames do not have. By reading it uses the same parts as the rest (`SettingsRowLabel`, `settingsRow()`, `header(_:)`, footer in `text.secondary`, switch tint `accent`). It is not in the App Store build. s5.10 has no row for it; I owe a one-line entry there. Fresh shots: T-4199.
- **The Restore footer after a trip to the Pro screen (T-2499, de343f7e24).** A still cannot show it. By reading, the `onDisappear` reset is gone, so the footer stays after the Pro screen is popped, and Restore keeps its VoiceOver label with the running state as its value. That agrees with s5.10 10.2.
- Not counted, as the line says: tour (T-0193, still nil), Editor theme (T-0272 is built but `pro-flags.json` keeps themes off, so the group is hidden), Support (T-0485), Privacy Policy (`LegalLinks.privacyPolicy` still nil). The gate build's Export measurements row (T-2851, T-3814) is behind `PYWIDGET_LANE_GATE` and is not in a shipping build.
- Dark xxxLarge is read from the T-2715 shot only (fresh launch and screen left open); there is no dark xxxLarge "Waiting for approval" shot.

The <span title="An idea that reaches B or better but is held below B by a measured cap. No graders until a permitted reading lifts the cap.">parked</span> patch named in the notes (`refs/archive/parked/b3/20261104-223405-57288`) holds other tasks' files (workflow map, WidgetFolderAppNames tests) and nothing from this read, so nothing was reused from it. This file's earlier reads below were already on main (7ec61279c2, ae7405d10e).

---

## Earlier read, 2026-11-05 (build 47781357)


Maren, 2026-11-05. Build 47781357 (T-2225). Read from the four Simulator shots in `ops/site-checks/settings-T-2225/` (1170 x 2532 px, 3 px per pt): light, dark, and each after Restore with nothing bought. Compared with `pywidget/docs/design/ide/A-settings-phone.png` and `B-settings-phone.png` (frames 1 and 4), spec s5.10 (T-0657), `creative/approved.md` item 2 and `pywidget/docs/design/tokens.json`. No Simulator or build was run.

Colours are sampled by script, not by eye (`tools/png_sample.py`; contrast is WCAG 2 relative luminance, the darkest or lightest ink in a box against the box's most common colour). Coordinates are px in the 1170 x 2532 shots. Crops are in `pywidget/docs/reviews/t2282/`.

Not flagged, by design until their feature exists: the tour row (T-0193), Editor theme (T-0272), Support (T-0485), Privacy Policy (LegalLinks unset). Also not flagged: the back button and the missing tab bar. Settings is pushed from a toolbar because no build line exists for the tab bar yet (s5.11.2).

Result: **does not pass.** Three P2 and two P3 findings, each with a board line for Idris.

## Findings


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: Findings, scrolls sideways" data-n="1 3" style="--tw:1129px" markdown="1">

| # | Board | Pri | What the shot shows | Design / rule | Where |
|---|---|---|---|---|---|
| F1 | T-2696 | P2 | In dark, the cards are #1C1C1E and the separators #38383B. These are the system grouped cell and separator. | B frame 1 has `bg.surface` #151926 and `line.hairline` #262C3E. Light matches only because the system cell and `bg.surface` are both #FFFFFF. Light separators are #E8E8E8 against #E3DFD6; you cannot see that difference, and the same fix covers it. | Card fill sampled at (1000,760) and (1000,1200). Separators are rows 636-639 and 1170-1173 at x 700. Crops: `t2282/f1-dark-card-shot.png` (shot), `t2282/f1-dark-card-design-B1.png` (design, #151926 sampled) |
| F2 | T-2697 | P2 | In light, the "About" header is #878688 on the canvas #F7F5F0, which is **3.33:1**. The text is about 17 pt semibold (ink rows 913-951). It is not large text, so the minimum is 4.5:1. Dark is 6.32:1. | s5.10.5 puts headers in `text.secondary`, and the spec QA's lowest ratio is 6.39:1. #5C5850 here would be 6.50:1. | Box (95-245, 905-965); after Restore, (95-245, 942-1000). Crop: `t2282/f2-about-header-light.png` |
| F3 | T-2698 | P2 | The large title "Settings" is SF Pro Bold, #000000 in light and #FFFFFF in dark. | Approved item 2 includes the display faces: New York in light and SF Pro Rounded in dark (A and B frame 1), in `text.primary` #1C1B19 / #EEF0F8. Nothing in `pywidget/ios/App` sets a navigation-title font, so every screen has the same gap. | Box (45-450, 330-430). Crops: `t2282/f3-title-light.png`, `t2282/f3-title-dark.png`, `t2282/f3-title-design-A1.png`, `t2282/f3-title-design-B1.png` |
| F4 | T-2699 | P3 | Restore purchase has no leading tile. Its title starts at x 100 px, while the Pro and Terms titles start at 226 and 224 px, so it sits 42 pt further left. The left edge looks broken in the first card the buyer reads. | A frames 1 to 4 draw a 30 pt `accent.soft` tile with a download glyph on Restore. Spec 10.1 drops only the chevron. | Restore ink (100-496, 710-756). Crops: `t2282/f4-restore-light.png`, `t2282/f4-restore-design-A1.png` |
| F5 | T-2700 | P3 | Large-text risk, worked out from measured widths. A still cannot show it. The Pro row keeps the title and the status on one line until AX1 (`isAccessibilitySize`, `SettingsView.swift:211`). At Large, the title is 98 pt and "Not purchased" is 110 pt, in about 261 pt of room. At xxxLarge (x1.35) they need about 292 pt, so the status wraps in the middle of the phrase before the stacked layout starts. The Ask to Buy status "Waiting for approval" is about 165 pt and is close to the limit even at Large. | s5.10.6 names `ViewThatFits`: use one line when it fits, otherwise put the status under the title. | Detail ink x 674-1003, title from x 226, chevron at x 1046, row y 520-580. Crop: `t2282/f5-pro-row-light.png` |

</div>


## Matches


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Matches, scrolls sideways" style="--tw:844px" markdown="1">

| Check | Shot (light / dark) | Design |
|---|---|---|
| Canvas | #F7F5F0 / #0A0C13 | `bg.canvas` A / B |
| Light card | #FFFFFF, margins 48 px = 16 pt | `bg.surface` A, margins 16 |
| Tile | #E4EBF8 / #2A2350, glyph #2350B0 / #A08BFF (6.16:1 / 5.25:1) | `accent.soft`, `accent` |
| Row titles | #1C1B19 / #EEF0F8 (17.21:1 / 14.95:1) | `text.primary` |
| Pro detail "Not purchased" | #5C5850 / #A9AFC5 (7.08:1 / 7.80:1) | `text.secondary` |
| Restore | accent #2350B0 / #A08BFF (7.38:1 / 6.18:1), no trailing mark | 10.1 row 2 |
| Restore found nothing | "No Pro purchase found for this Apple Account." under the Pro card, footnote, #5C5850 / #A9AFC5 (6.50:1 / 8.95:1); About moves down 36 px (12 pt) | frame 4 |
| Web arrow (Terms) | #6A665D / #8A91AA (5.72:1 / 5.44:1) | `text.tertiary` |
| Page foot | `set.appear` and "Version 0.1 (1)", centred footnote, #5C5850 / #A9AFC5 (6.50:1 / 8.95:1) | 10.1 page foot |
| Rows, glyphs | Pro (sparkles), Restore, About: Terms (doc, arrow), Acknowledgements (heart, chevron) | frame 1, minus the rows left out by design |

</div>


The code backs what a still cannot show. The footer is posted as a VoiceOver announcement (`SettingsView.swift:116`), and Restore is disabled with a spinner while it runs (:141-151). The spinner sits at the trailing edge, while frame 3 draws it leading. That is a system-standard placement, so it is not flagged.

## Accepted as built (Tenet 3; the spec now says so)

These come from the iOS 26 system `List`. Settings should follow Apple's conventions, so s5.10.5 now records them instead of asking the code to change:
- Rows are 60 pt (two-row cards are 360 px), not the 44 drawn. The spec says "at least 44", so this is within it.
- Cards use the system corner radius instead of 14 and have no outline. White on #F7F5F0 is the system grouped look.
- Group headers are title case ("About") instead of the eyebrow. Their colour still goes to `text.secondary` (F2).
- The disclosure chevron is the system's #C5C5C7 / #5A5A5E (1.72:1 / 2.48:1; crop `t2282/a1-chevron-arrow-light.png`). It is a standard `NavigationLink` mark, Increase Contrast darkens it, and it is not the only sign that a row opens something, so it stays. The web arrow keeps `text.tertiary`, because it is the only sign that a row leaves the app.
- The Pro glyph is `sparkles`, not the frames' lock. A lock next to "Active" would look locked.

Apple conventions met: Restore Purchases sits on the Settings screen next to the product (App Review 3.1.1), the large title is used, rows that open the web carry the up-right arrow, and the version is at the foot.

## Recheck, 2026-11-05 2:50 PM ET (code read of 1e1ff0619)

Maren. Idris's fix for T-2696..T-2700 is commit 1e1ff0619. At 2:43 PM ET it was on `personal/b2`, `b5`, `b6` and two parked branches, not on main or origin/main. `ops/jobs/` has no job at that commit; the newest Settings job is J-20261105-1335 (T-2456) at 92b062d47. The shots in `ops/site-checks/settings-T-2225/` are still build 47781357. **No new shot exists, so every finding below is confirmed by reading the code only.** No build or Simulator was run.

The MacBook run cannot produce the shots. `testScreenshotsForReview` and the new `testProRowAtXXXLargeWithPendingForReview` skip unless `TEST_RUNNER_PW_SETTINGS_SHOTS` is set. `tools/xc_route.py:139` keeps any `TEST_RUNNER_*` run local ("settings the runner can't carry"). The MacBook run gives the green tests. The PNGs need one run on the local Mac mini slot with that variable set, at a build that holds 1e1ff0619, saved to a new folder (`ops/site-checks/settings-T-2696/`).


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Recheck, 2026-11-05 2:50 PM ET (code read of 1e1ff0619), scrolls sideways" data-n="1" style="--tw:764px" markdown="1">

| # | Board | Code read | Shot still needed to pass |
|---|---|---|---|
| F1 | T-2696 | **Passes by reading.** `settingsRow()` = `listRowBackground(bgSurface)` + `listRowSeparatorTint(lineHairline)`, on all six row kinds: Pro, Restore, theme, tour, each web link, Acknowledgements. `SettingsLookTests` pins #151926 / #262C3E in dark. | Dark: #151926 at (1000,760) and a #262C3E separator. |
| F2 | T-2697 | **Passes by reading.** All three Section headers go through `header(_:)`, which sets `text.secondary`. The Pro group has no header, in the design or the code. The test pins #5C5850 and at least 4.5:1 on the canvas in both appearances. | Light: #5C5850 in the "About" header box. |
| F3 | T-2698 | **Right in intent, unproven in two cases.** App-wide `UINavigationBar.appearance(for:)` per style, serif 600 in light and rounded 700 in dark (DisplayFont.spec, approved item 2), ink `text.primary`. Large and inline titles are both set. The scroll edge stays nil, so the system's transparent look keeps the same title attributes. Two risks a fresh-launch shot cannot show: (1) the ink is resolved to a fixed colour per style. If a bar that is already on screen does not pick up the other style's proxy when the user switches Light/Dark, the dark title is drawn #1C1B19 on #0A0C13. (2) A text-size change re-sets only the proxies, so a bar already on screen keeps the old size. New line T-2715. | Light and dark: the serif / rounded title in #1C1B19 / #EEF0F8, plus T-2715's shots. |
| F4 | T-2699 | **Passes by reading.** Restore uses `SettingsRowLabel` with `arrow.down.to.line`, the same 30 pt `accent.soft` tile, title in `accent`, no trailing mark, the spinner kept at the trailing edge (`busy`), and the row disabled while it runs. From AX1 the tile hides on every row, so the titles still line up. | Light: Restore title x equals the Pro title x (about 226 px). |
| F5 | T-2700 | **Passes by reading.** `ViewThatFits(in: .horizontal)` tries the one-line HStack at its ideal width, then falls back to the stacked layout (s5.10.6). The AX path is unchanged. The new UI test shoots xxxLarge with "Not purchased" and with Ask to Buy's "Waiting for approval". | Both xxxLarge shots: each status is whole, either beside the title or under it. |

</div>


Result: **T-2282 stays open.** It does not pass until the shots exist. Four of the five fixes read as correct. F3 also needs T-2715.

---

## Addendum, 2026-11-12 1:57 PM ET, T-4199 shots

Maren. **Result: pass.** No finding at Medium or above, so no board line. Read from the seven PNGs at c0e368a779 in `ops/site-checks/settings-T-4199/` (iPhone 17e Simulator, a copy at 3635ad994a that holds b84a7b1596). Sampled by script with `tools/png_sample.py`, WCAG 2 as above; px in the 1170 x 2532 shots, 3 px per pt. No build or Simulator was run.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: Addendum, 2026-11-12 1:57 PM ET, T-4199 shots, scrolls sideways" style="--tw:1493px" markdown="1">

| Check | Shot(s) | Measured (light / dark) | Design | Result |
|---|---|---|---|---|
| Place | all seven | Testers sits between the Pro card and About, in its own card; About keeps its order | T-4093: after the Pro group, TestFlight or Xcode copy only | pass |
| Wording | all seven | "Testers", "Unlock Pro (testers)", footer "For testing only. Nothing is charged, and your purchase, if any, is unchanged. Turn it off to see what you've bought." | `grp.testers`, `set.tester.pro`, `set.tester.foot` in `draw_settings.py` | pass, word for word |
| Header | `settings-phone-light.png`, `-dark.png` | ink x 98-270, y 915-951, the same box as About (98, 1399); #5C5850 6.50:1 / #A9AFC5 8.95:1 | `header(_:)`, `text.secondary` | pass |
| Row | same | `hammer` tile x 107-173, #2350B0 on #E4EBF8 6.16:1 / #A08BFF on #2A2350 5.25:1; title from x 226 like every other row, #1C1B19 17.21:1 / #EEF0F8 15.39:1; card #FFFFFF / #151926 | `SettingsRowLabel`, `settingsRow()` | pass |
| Footer | same | ink x 98-1063, y 1205-1336, three lines, #5C5850 6.50:1 / #A9AFC5 8.95:1 | footnote `text.secondary` | pass |
| Spacing | same, and both xxxLarge | Pro card foot (y 819) to Testers header ink (915) 96 px, where the About header sat in the 11-05 shots (ink from 913); Testers footer ink to About header ink 63 px. That is the system `List`'s header and footer spacing | s5.10.5, system spacing accepted | pass |
| After Restore found nothing | `settings-phone-light-restore-none.png`, `-dark-restore-none.png` | "No Pro purchase found for this Apple Account." stays under the Pro card (ink y 851-886, 6.50:1 / 8.95:1), above the Testers header; everything below moves down 36 px (12 pt) | frame 4 | pass |
| xxxLarge | `settings-phone-light-xxxl.png`, `-dark-xxxl.png` | "Unlock Pro (testers)" on one line, ink x 227-804, switch from x 891 (29 pt clear); the footer reflows to four whole lines (ink to x 1001, y 1319-1569); "Not purchased" stacks whole under the title (x 227-656). Nothing clipped or truncated; the page foot is on screen | s5.10.6 | pass |
| Waiting for approval | `settings-phone-dark-xxxl-pending.png` | "Waiting for approval" whole under the title, ink x 224-805, #A9AFC5 on #151926 8.03:1; tile and chevron stay | `set.pro.pending`, s5.10.6 `ViewThatFits` | pass |
| Dark contrast | the four dark shots | lowest text pair 8.03:1 (Pro detail); tiles 5.25:1; canvas #0A0C13, cards #151926 | `text.*`, `accent` on `accent.soft` | pass |
| About seam (T-2914) | both xxxLarge | column x 100 is card from y 1741 to 2089 with no canvas row between Terms of Use and Acknowledgements | | not seen in these shots; T-2914 is Idris's line to close or keep |

</div>


Not findings:
- The switch is the system `Toggle`. Its off track on the white card is #C5C5C7 at 1.72:1 in light, the same system grey as the chevron that was accepted on 11-05. The thumb and the track's outline mark the control, and Increase Contrast darkens it. Tenet 3 applies, so it stays as built.
- No shot shows the switch turned on, or a light xxxLarge "Waiting for approval". The first is a tester-only state, and the second is the same layout as the dark shot. Neither holds this read.

Owed, by me (Low; seen in `settings-phone-light.png`): s5.10.1 still has no row for the Testers group, and `draw_settings.py` has its three strings but no frame. I add the s5.10 row myself. These shots are of a tester copy and must not be used for App Store screenshots, because an App Store copy does not draw this group.
{% endraw %}

</div>
