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
Maren, 2026-10-25, 19:55-20:13 ET by `date`. Board line: "[design] Maren, P1, 12 premade widget designs". Status: **proposal**. Nothing here is approved under <span title="Commandment 51: the Investors approve every visual before it ships.">Commandment 51</span>; the build keeps placeholders until the Investors pick a direction (ops/questions.md item 5). Drawn in direction A (Paper, recommended); `PW_DIRECTION=B python3 premade.py` switches the hero face to rounded, and the token table switches the colours.

List from ADR-001 3.1 (C11) and its Revised section: weather is an example recipe, not a premade. Data sources from L16. Nodes from L4 and viewtree.schema.json v1 only.

## How it is made (Commandment 9)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: How it is made (Commandment 9), scrolls sideways" style="--tw:449px" markdown="1">

| File | What |
|---|---|
| `premade.py` | The 12 widgets written with `pywidget_ui` (Idris's reference serializer). Writes `trees/NN-id.json`, one document per widget, a view per family; `pywidget_ui.validate` reports 0 problems on all 12. |
| `render.py` | A small HTML/SVG interpreter for viewtree v1 (CSS flex for stacks, SVG for Path and Gauge), rasterised by headless Chromium. Writes `sheets/NN-id.jpg`, `qa.json`, [`nodes-needed.md`](nodes-needed.html). |
| `trees/` | 12 documents, 166 KB. Odalys ports these to `pywidget_dsl` (board line "premade widget code"). |
| `sheets/` | 12 gallery sheets, 2.63 MB in total (JPEG q78 at 1.25x). `08-storage.jpg` is in the approved look (light A Paper, dark B Studio, #60); the other 11 are still direction A in both schemes until they are re-rendered (`PW_LOOK=direction` keeps the v0 look). |
| [`nodes-needed.md`](nodes-needed.html) | Generated: nodes, modifiers, text kinds and SF Symbol names per widget. |

</div>


No image model, stock art or photo. Fonts are the macOS system faces already logged in log/assets.md (row of 2026-10-25), read in place. SF Symbols are **not** drawn: each symbol is a stand-in glyph written in `render.py`; the tree names the real symbol and the app draws it through the system API.

Each sheet shows: every family the widget claims, in full colour light and dark and accented light and dark (sample tint #5AA9C8); Lock Screen accessories in vibrant over a dark and a light wallpaper; states (stale, failing) where the widget has them; and a header with families, data, update policy, nodes, modifiers and the VoiceOver label.

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

**Design.** Fill always means used, as Settings draws it; the hero is the free figure, which is what a person acts on. Small: eyebrow, free GB hero, "as of", bar, "70 GB used of 128". Medium: ring with percent used, free GB hero, used of total, and the change since the app's reading a week ago ("3.2 GB used since Oct 19", or "freed" with `arrow.up.right`), from the premade's own state file; the line needs at least one reading 6-8 days old (the app's own history, sample data here). Circular: capacity gauge, free GB in the centre. Rectangular: "Storage", "58 GB free of 128 GB", linear capacity gauge. Under 10 percent free the eyebrow becomes a warning symbol plus "LOW SPACE" and the hero and ring take `status.warning` (colour plus symbol plus words; it reads with colour stripped). Stale after 6 hours, not 30 minutes: free space moves by gigabytes over days, and a warning on most glances teaches people to ignore it.

**Check.** All four claimed families in full colour light and dark and accented light and dark, Lock Screen vibrant on two wallpapers, and three states (low small, low medium, stale): 15 renders, 0 faults. Contrast of the pairs used, computed from tokens.json at HEAD: A light on bg.surface, secondary 7.08, tertiary 5.72, warning 6.11, accent 7.38; B dark, secondary 8.03, tertiary 5.60, warning 10.98, accent 6.37 (all over 4.5:1).

**When T-0040's appearance tokens land.** Drawn from tokens.json at HEAD (`color.A.light`, `color.B.dark`); the uncommitted appearance block was not used. Expected changes: the dark hero face moves to SF Pro Rounded weight 600 (the tree says medium), the dark widget background may become the `widget.card` gradient (#5B33E6 to #1E1450) with `widget.onCard` text, which would replace `bg.surface` and change every dark contrast figure above; and the Increase Contrast sets give a 7:1 variant. Re-render with `render.py 08` then.

## The 15 L4 reference designs, taken from these

Each pair below is in `trees/`. Together they cover every family the premades claim and all three rendering modes; whether they also cover every node the premades use is not yet checked by script.


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: The 15 L4 reference designs, taken from these, scrolls sideways" data-n="1" style="--tw:601px" markdown="1">

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

- C51: the Investors pick A or B; these sheets are A.
- Idris: R0-R6 (sent to the L4 board line), and Simulator snapshots of the 15 reference designs in all modes.
- Odalys: port `trees/` to `pywidget_dsl` (premade widget code line). Data rules stay as L16 says (User-Agent, GitHub backoff, no shipped tokens).
- A person picks the quote list (L16 rule) before any quote ships.
{% endraw %}

</div>
