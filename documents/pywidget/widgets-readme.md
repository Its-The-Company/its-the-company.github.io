---
layout: "default"
title: "The 12 premade widgets: designs v0"
section: "documents"
description: "List from ADR-001 3.1 (C11) and its Revised section: weather is an example recipe, not a premade. Data sources from L16. Nodes from L4 and viewtree.schema.json v1 only."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/widgets-readme.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 4 · Sun Oct 25</span><span><code>pywidget/docs/design/widgets/README.md</code></span></div><h1>The 12 premade widgets: designs v0</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-25, 19:55-20:13 ET by `date`. Board line: "[design] Maren, P1, 12 premade widget designs". Status: **proposal**. Nothing here is approved under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>; the build keeps placeholders until the Investors pick a direction (ops/questions.md item 5). Drawn in direction A (Paper, recommended); `PW_DIRECTION=B python3 premade.py` switches the hero face to rounded, and the token table switches the colours. **Update 2026-10-26 (T-0104):** the Investors chose on #60 (light A Paper, dark B Studio); all 12 sheets are redrawn in that look, section "Re-render in the approved look".

List from ADR-001 3.1 (C11) and its Revised section: weather is an example recipe, not a premade. Data sources from L16. Nodes from L4 and viewtree.schema.json v1 only.

## How it is made (Commandment 9)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it is made (Commandment 9), scrolls sideways" style="--tw:449px" markdown="1">

| File | What |
|---|---|
| `premade.py` | The 12 widgets written with `pywidget_ui` (Idris's reference serializer). Writes `trees/NN-id.json`, one document per widget, a view per family; `pywidget_ui.validate` reports 0 problems on all 12. |
| `render.py` | A small HTML/SVG interpreter for viewtree v1 (CSS flex for stacks, SVG for Path and Gauge), rasterised by headless Chromium. Writes the sheets to `--out DIR` (a design-previews worktree, not main), and `qa.json` and [`nodes-needed.md`](nodes-needed.html) here. |
| `trees/` | 12 documents, 166 KB. Odalys ports these to `pywidget_dsl` (board line "premade widget code"). |
| sheets | 12 gallery sheets in the approved look (light A Paper, dark B Studio, #60), 4.32 MB (JPEG q78 at 1.25x), on the `design-previews` branch in `widgets/premade/` (20dd9177), not on main. `PW_LOOK=direction` still draws the v0 look. |
| [`nodes-needed.md`](nodes-needed.html) | Generated: nodes, modifiers, text kinds and SF Symbol names per widget. |

</div>


No image model, stock art or photo. Fonts are the macOS system faces already logged in log/assets.md (row of 2026-10-25), read in place. SF Symbols are **not** drawn: each symbol is a stand-in glyph written in `render.py`; the tree names the real symbol and the app draws it through the system API.

Each sheet shows: every family the widget claims, in full colour light and dark and accented light and dark (sample tint #5AA9C8); iOS 26 clear in light and dark, each over a light and a dark wallpaper; Lock Screen accessories in vibrant in light and dark appearance, each over a dark and a light wallpaper; states (stale, failing) where the widget has them; and a header with families, data, update policy, nodes, modifiers and the VoiceOver label.

QA by script (`qa.json`): 168 widget renders, 0 faults (premade 8 redrawn 2026-10-26: 15 renders, 0 faults). Checked per render: text truncated, text or graphics outside the widget, text inside the 16 pt content margin, text over text, text under 11 pt. The first full run found faults in 55 renders (long relative dates, a stale label too wide for small, a dial pushed out of a medium widget, which the text-only check missed; the graphics check was added for it). Fixed in the designs, not hidden.

**What the drawings are not.** `render.py` approximates SwiftUI layout; it is not SwiftUI. Accented and vibrant colours follow design-system-v0 8.2 and are my reading of what the system does. Idris's renderer snapshots in the Simulator are the check that counts, and ADR-001 3.3 (a) on Day 14 is judged on those, not on these sheets.

## The 12


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: The 12, scrolls sideways" data-n="1" style="--tw:1290px" markdown="1">

| # | Widget | Families | Data (L16) | Time model |
|---|---|---|---|---|
| 1 | Countdown | S, M, circular, rectangular, inline | clock, user's events | days per midnight entry; bar (`ProgressView` timerInterval) and under-a-day timer (`Text` timer) tick alone |
| 2 | Sunrise and sunset | S, M, circular, rectangular, inline | local almanac (H249, bridged); saved place | times and "in 3 hr, 55 min" tick alone; sun dot per 15 min entry |
| 3 | Steps and floors | S, M, L, circular, rectangular, inline | CMPedometer, read by the app | "as of 1:52 PM" always; stale after 60 min |
| 4 | Distance to a saved place | S, M, rectangular, inline | When-In-Use fix taken by the app | "as of" always; stale after 30 min |
| 5 | Altitude | S, M, circular, rectangular | CoreLocation altitude and accuracy | as distance |
| 6 | Habit tracker | S, M, L, circular | user's entries in the App Group | rows are `Link`s into the app (no widget buttons in v1) |
| 7 | Shortcuts launcher | S, M, L, circular | user's shortcut names | static; small is one `widgetURL`, medium 4 and large 8 `Link`s |
| 8 | Storage (was Battery and storage; ADR-001 <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> ruling, Ines, 2026-10-25 21:16 (09dc55c8): battery goes to 1.1) | S, M, circular, rectangular | `shutil.disk_usage` (os.statvfs) in the app's Python run; the extension reads nothing (ADR-007 s4.1). See "Premade 8" below | "as of" always; stale after 6 hours; "Low space" under 10 percent free |
| 9 | Day progress | S, M, circular, rectangular, inline | clock only | bars tick alone; percent per 15 min entry |
| 10 | Quote of the day | S, M, L, rectangular | bundled public-domain list | one entry per midnight |
| 11 | World clocks | S, M, rectangular, inline | system time zones | per-minute entries until R2 |
| 12 | GitHub repository | S, M, rectangular | GitHub REST, user's own token optional | "as of"; stale after 45 min; CI failing shown with icon and word |

</div>


Design rules applied to all 12 (design-system-v0 sections 3 and 8): one hero value in the display face with `.widgetAccentable()`, labels in the default group; at most three type levels; tabular figures on every changing number; 11 pt floor; meaning never by colour alone (done habit = filled dot, not done = ring; CI = icon plus word); every value that comes from a sample says when it was read, and turns into "Last read 1:52 PM" with a warning icon when `stale` (L4 section 8). Samples are fictional (`example/weather-cli`, places "Home", "Studio", "Library"); the three quotes are layout samples by authors who died before 1956 from works published before 1931 (Dickinson 1891, Thoreau 1854, Franklin 1748) and still go through the person's pick under the L16 rule.

Systems claimed: no premade claims `systemExtraLarge` yet (ADR-001 Revised: only where designs pass); the medium compositions are built to sit side by side for it. Not one premade needs a bitmap (L4 section 10 rule).

## Nodes needed

Generated table: [`nodes-needed.md`](nodes-needed.html). Across the 12: 15 of 22 node types and 15 of 37 modifiers (pywidget_ui at HEAD, 53e9edb9). Unused: Button and Toggle (no interactivity in v1), Capsule, ContainerRelativeShape, Ellipse, Group, Rectangle.

### Requests to the L4 owner (Idris)


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: Requests to the L4 owner (Idris), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Request | Why, and the widget | Without it |
|---|---|---|---|
| R0 | Spell `frame(maxWidth: .infinity)` in the tree as the string `"infinity"`, and make `pywidget_ui` reject or convert `float('inf')`. | `ui.dumps` writes `"maxWidth":Infinity` today, which is not JSON (seen in my first trees). Every premade uses it. | The trees here use `"infinity"`; a strict JSON parser in Swift or the web rejects the other form. |
| R1 | Semantic paints that name design tokens (`{"kind":"semantic","name":"text.secondary"}`), resolved by the renderer from the bundled tokens, with a role table for accented and vibrant (primary 1.0, secondary 0.66, tertiary 0.5, tracks 0.24). | All 12. Lets one tree render in direction A or B and keeps the hierarchy when colour is stripped. L4 5.1 already says "hand out semantic names and tokens, not RGB". | Raw `color` with `dark` variants; accented mode would flatten primary and secondary text to one tone. |
| R2 | A `timeZone` field on `date` text content (IANA name), mapped to `.environment(\.timeZone, ...)` on that Text. | 11 World clocks. | 60 entries an hour, reload `atEnd`; more trees, more reloads, and a minute can lag. |
| R3 | **Dropped for v1** by the ADR-001 chair ruling, Ines, 2026-10-25 21:16 (09dc55c8). Was: check whether the widget extension may read `UIDevice` battery level when it builds a timeline; if so, a device-value content kind filled by the extension. Unverified. | 8 Battery (1.1). | Battery shows "as of" and ages within minutes; storage is the steadier value. |
| R4 | A `tint` modifier (SwiftUI `.tint`) for `ProgressView` and `Gauge`. | 8 storage bar wanted ink, not accent, and warning colour under 10 percent free (the medium ring is a `Path`, so it already turns); 3, 9 per-row colour. | They take the app accent colour. Acceptable for v1. |
| R5 | Confirm whether a widget `Link` may open another app's URL scheme (`shortcuts://run-shortcut?name=`), or only our app. Unverified. | 7 Shortcuts launcher. | Our app receives the link and forwards it: one visible hop through the app. |
| R6 | Say what `cornerRadius` means for a `rect` path command in `unit` space under a non-square frame (points, I suggest). | Found while drawing bars: a 0.5 radius stretched into an ellipse. | I used `ProgressView` for bars and square-cornered rects in charts. |
| R7 | A semantic display face in the tree (`Font.system(size, design: "display")` or a font token), resolved per appearance: New York in light, SF Pro Rounded in dark (#60, creative/approved.md item 2). | All 12 heroes. Found redrawing premade 8 in the approved look. | One tree names one design; `render.py` (`PW_LOOK=approved`) swaps serif and rounded by scheme, which the app cannot do from the tree today. |

</div>


Also small: `pywidget_ui` has no helper for `kerning` (I used `.modifier("kerning", value=0.5)`), and Lock Screen text styles render smaller than Home Screen ones; the renderer should not force Home Screen sizes there.

## Premade 8: Storage (redrawn 2026-10-26, T-0090)

Maren, 2026-10-26 00:13 ET by `date`. Battery is 1.1 (ADR-001 chair ruling, Ines, 2026-10-25 21:16, 09dc55c8); premade 8 is Storage only. Tree `trees/08-storage.json` (was `08-battery.json`), sheet `sheets/08-storage.jpg`, id `pywidget.premade.storage`.

**Where the figures come from.** `shutil.disk_usage(path)` from the stdlib (it calls `os.statvfs`), run by the premade's Python in the app process on each app run and background refresh. Under ADR-007 option (b) the widget extension links no Python and reads no device value; it only draws the tree from the App Group. No new bridge API. Shown in decimal GB (10^9 bytes), as Settings counts.

For Idris to confirm (none of this is read on a device yet):
- **Which number Settings shows.** `statvfs` free (`f_bavail`) on iOS likely excludes purgeable space, while Settings > General > iPhone Storage counts some of it, so our "free" may read lower than Settings. If it does, the honest fix is in Swift: the app writes `URLResourceValues.volumeAvailableCapacityForImportantUsage` and `volumeTotalCapacity` into the App Group and the premade reads them, or the label says "free now". Also check that `total` matches the capacity Settings shows (128 GB) and not the data volume's share.
- **Privacy manifest.** Disk space is a required-reason API category; reason `85F4.1` ("display disk space information to the person using the device"; the value may not leave the device) is my recall of Apple's list, unverified. The app bundle declares it (privacy-label.md s4). The widget extension calls no disk-space API under (b), so it needs no entry; under (c) in 1.1 it would.
- **Extension-filled value (not v1).** If a live figure is ever wanted, the extension could read `volumeAvailableCapacityForImportantUsage` itself in `getTimeline`; that is a Swift device-value content kind like dropped R3, and needs its own manifest entry. Not requested for v1.

**Answer (Idris, T-0097, 2026-10-26 00:29 ET by `date`).** Measured on the iPhone 17e Simulator (iOS 27.0) by `Tests/DiskSpaceProbeTests.swift`, in the app's own Python run through the C1 bridge; no device read yet.
- `shutil.disk_usage(Documents).free` is `statvfs f_bavail * f_frsize` exactly, and equals `volumeAvailableCapacity` to one 4,096-byte block (110,771,671,040 vs 110,771,675,136). `total` equals `volumeTotalCapacity`. So our "free" is the plain available figure.
- It is **not** the important-usage figure. The SDK's own doc comment (Foundation `NSURL.h`, `NSURLVolumeAvailableCapacityForImportantUsageKey`) says that one includes "space expected to be cleared by purging non-essential and cached resources"; `statvfs` does not. On this Simulator the host had nothing purgeable at the time (available = important = opportunistic), so the gap could not be shown here; on a phone with purgeable space our number will read lower.
- Settings: that Settings > iPhone Storage shows a figure close to important-usage, and that its "128 GB" is the advertised size rather than the data volume's `total`, are my recall, not read. Needs one device check (Settings next to the probe). Until then I recommend the label say "free now" or, better, the app writes `volumeAvailableCapacityForImportantUsage` and `volumeTotalCapacity` from Swift for the premade (a C2 device value), which is the number Apple tells apps to use for user-requested content.
- Privacy manifest: the embedded Python binary (`Python.xcframework/ios-arm64`) imports `_statfs` and `_fstatfs` (`nm -u`; `os.statvfs` is built on `statfs` on Apple platforms). Those are disk-space APIs, so the app needs a DiskSpace entry whether or not premade 8 ships. `85F4.1` (display to the person, not sent off-device) is still recall: no local primary source (Xcode and the SDK carry no reason list; developer.apple.com is refused by terms_guard). One wrinkle for the chair: user scripts can send what they read off the device; `85F4.1` binds the app, and whether a user's own script counts is a question for the privacy review, not something I can settle from here.

**Design.** Fill always means used, as Settings draws it; the hero is the free figure, which is what a person acts on. Small: eyebrow, free GB hero, "as of", bar, "70 GB used of 128". Medium: ring with percent used, free GB hero, used of total, and the change since the app's reading a week ago ("3.2 GB used since Oct 19", or "freed" with `arrow.up.right`), from the premade's own state file; the line needs at least one reading 6-8 days old (the app's own history, sample data here). Circular: capacity gauge, free GB in the centre. Rectangular: "Storage", "58 GB free of 128 GB", linear capacity gauge. Under 10 percent free the eyebrow becomes a warning symbol plus "LOW SPACE" and the hero and ring take `status.warning` (colour plus symbol plus words; it reads with colour stripped). Stale after 6 hours, not 30 minutes: free space moves by gigabytes over days, and a warning on most glances teaches people to ignore it.

**Check.** All four claimed families in full colour light and dark and accented light and dark, Lock Screen vibrant on two wallpapers, and three states (low small, low medium, stale): 15 renders, 0 faults. Contrast of the pairs used, computed from tokens.json at HEAD: A light on bg.surface, secondary 7.08, tertiary 5.72, warning 6.11, accent 7.38; B dark, secondary 8.03, tertiary 5.60, warning 10.98, accent 6.37 (all over 4.5:1).

**When T-0040's appearance tokens land** (done 2026-10-26 01:23 ET, T-0104; see below). Drawn from tokens.json at HEAD (`color.A.light`, `color.B.dark`); the uncommitted appearance block was not used. Expected changes: the dark hero face moves to SF Pro Rounded weight 600 (the tree says medium), the dark widget background may become the `widget.card` gradient (#5B33E6 to #1E1450) with `widget.onCard` text, which would replace `bg.surface` and change every dark contrast figure above; and the Increase Contrast sets give a 7:1 variant. Re-render with `render.py 08` then.

## Re-render in the approved look (T-0104, 2026-10-26)

Maren, 01:16-01:23 ET by `date`. All 12 sheets redrawn from `trees/*.json` at HEAD with the T-0040 appearance tokens (`tokens-app.json`) and Pernille's display design and `widgetCard` paint (5fac59ec). Sheets on design-previews `widgets/premade/` (20dd9177). `check_widget_modes.py`: literal, gradient, accent, colouronly, serif and cardbg all 0 over 52 views.

**One renderer rule added.** Text on the widget card takes `widget.onCard.*`: `text.primary` to `widget.onCard.primary`, `text.secondary` and `text.tertiary` to `widget.onCard.secondary` (three levels on the card). Without it B's `text.secondary` (#A9AFC5) measured 3.62:1 on the violet card ("NEXT UP", Countdown medium). With it full colour dark is 5.18 at worst. The Swift renderer needs the same rule (Idris); the tree does not change.

**QA** (`qa.json`): 328 widget renders, 0 layout faults (truncation, outside, margin, text over text, under 11 pt). New: text contrast measured from the pixels (text hidden, background sampled at 9 points per text box, median; floor 4.5, or 3.0 at 18 pt and up or 14 pt bold), 233 Home Screen texts per panel and 50 Lock Screen texts:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: Re-render in the approved look (T-0104, 2026-10-26), scrolls sideways" data-n="2" style="--tw:471px" markdown="1">

| Panel | Worst | Under floor |
|---|---|---|
| Full colour light | 7.08 | 0 |
| Full colour dark (widget card) | 5.18 | 0 |
| Accented dark | 4.48 | 2 |
| Accented light | 2.84 | 150 |
| Clear dark, dark wallpaper | 5.07 | 0 |
| Clear light, dark wallpaper | 2.78 | 159 |
| Clear, either appearance, light wallpaper | 1.09 | 466 of 466 |
| Vibrant, dark Lock Screen wallpaper | 6.89 | 0 |
| Vibrant, light Lock Screen wallpaper | 2.17 | 100 of 100 |

</div>


Only full colour is our paint, and it passes. The other rows are my approximation of what the system does (tint mix, glass, white at 1.0/0.66/0.24), so they are not faults in the designs; they say where to look on a device. White content over a light wallpaper is the weak case in clear and vibrant, and the 0.66 secondary level is the first to fail. Idris's Simulator check, clear on a light wallpaper first, decides whether the system's glass rescues it or whether secondary text needs to go to 1.0 in those modes.

**Seen, not fixed.** Habit tracker in full colour dark: a missed day's dot is close to the violet card (a gap rather than a mark; graphics are not contrast-checked yet). Needs a track colour on the card (`widget.onCard` track token) before the premade ships.

## The 15 L4 reference designs, taken from these

Each pair below is in `trees/`. Together they cover every family the premades claim and all three rendering modes; whether they also cover every node the premades use is not yet checked by script.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: The 15 L4 reference designs, taken from these, scrolls sideways" data-n="1" style="--tw:601px" markdown="1">

| # | Widget, family | What it exercises |
|---|---|---|
| 1 | Countdown, small | `ProgressView` timerInterval, number text, lastTextBaseline |
| 2 | Countdown, medium | `Text` timer, `Divider`, two columns |
| 3 | Countdown, circular | `Gauge` accessoryCircularCapacity with a node label, `AccessoryWidgetBackground` |
| 4 | Sunrise and sunset, small | `Path` curve and ellipse, date `time` and `relative` |
| 5 | Sunrise and sunset, rectangular | `Gauge` accessoryLinear, vibrant |
| 6 | Steps, medium | `Path` bar chart, goal line with `opacity` |
| 7 | Steps, large | hourly chart, `When` stale, week row |
| 8 | Distance, medium | `rotationEffect` arrows, list with dividers |
| 9 | Altitude, medium | `Path` area fill plus line |
| 10 | Habit tracker, large | `Circle` fill and stroke, `Link` per row |
| 11 | Shortcuts launcher, medium | `RoundedRectangle` background, `padding`, four `Link`s |
| 12 | Storage, medium | ring from two `Path` arcs in a `ZStack`, warning colour on the arc in the low-space state |
| 13 | Day progress, inline | accessoryInline, symbol plus text |
| 14 | Quote of the day, large | serif long text, `lineLimit`, `minimumScaleFactor` |
| 15 | World clocks, medium | analog dials from `Path`, `Circle` faces, day and night symbols |

</div>


## Open

- C51: answered on #60 (light A, dark B); the sheets are in that look (T-0104).
- Idris: R0-R6 (sent to the L4 board line), and Simulator snapshots of the 15 reference designs in all modes.
- Odalys: port `trees/` to `pywidget_dsl` (premade widget code line). Data rules stay as L16 says (User-Agent, GitHub backoff, no shipped tokens).
- A person picks the quote list (L16 rule) before any quote ships.

## Non-text marks on the card (T-0147, 2026-10-26)

Maren, 01:39-01:51 ET by `date`. WCAG 1.4.11: a mark that carries data (dots, rings, bars, paths, glyphs) needs 3:1 against what it sits on.

- **Token.** `widget.onCard.track` (tokens.json `appearances`; generated into `tokens-app.json`, `ios/Shared/Theme.xcassets` `WidgetOnCardTrack`, `tokens.css`). On the card the renderer draws `line.strong` with it. Light `#959085` (was `line.strong` `#C9C4B8`, 1.74:1 on the white card; now 3.18:1). Dark `rgba(255,255,255,0.56)` (was `#394158`, 1.48:1 at the violet stop; now 3.17:1 at the worst point). Increase Contrast: `card_mark` 4.5:1 (`#7B766C`, white 0.67). `appearance.py` refuses a source value under 3:1; `check_tokens.py` checks it at 11 points of the card (864 pairs, 0 fails).
- **Check.** `render.py` draws a QA-only card page per premade (every system family plus the stale state, full colour, in light, dark, lightHC and darkHC; never saved as an image). Every shape, path, glyph and gauge part carries `data-g`. At points where hit testing finds the mark, its declared colour (times ancestor opacity) is composited over the ground: the next tagged element below, else the bare card pixel. Median per mark, floor 3:1. `bg.sunken` and `accent.soft` shapes are tracks and tile grounds: measured (`track_min`), not floored, because the mark on them and the text beside them carry the value. Results in `qa.json` per premade: `card`, `graphics_faults`, `card_text_faults`.
- **Habits, missed day, worst mark:** dark 1.04 to 3.53; light 1.74 to 3.18; darkHC 2.27 to 5.39; lightHC 3.58 to 4.52. Steps, sun and the horizon line moved with it (02 dark 1.21 to 4.73).
- **Fixed in T-0159 (01:56):** dark `accent` glyphs near the violet start stop (03, 04, 05, 08, 10) were 2.75-2.91: on the card the renderer now draws `accent` with `widget.onCard.accent` (dark `#B0A3FD`, OKLCH lightness only from `#A08BFF`, 3.10:1 worst token pair; light = `accent`; Increase Contrast 4.5:1, `#BEB6FC` / `#1B47A6`), measured 3.30-3.56 dark. 03 Steps goal line was `text.secondary` at 0.5 opacity (2.61 dark, 2.28 light): now `line.strong` solid, so `widget.onCard.track` on the card (3.30 dark, 3.18 light). 11 Clocks dial <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> was an accent dot on the hands (2.05-2.75): now a hub in the hands' colour under them; hands and hub carry `.widgetAccentable()`, which also makes the hands show in accented mode (they vanished into the face before). Graphics faults 30 -> 0. Still open: in clear mode (luminance) the dial face and hands are both white, so the day dials read as discs.
{% endraw %}

</div>
