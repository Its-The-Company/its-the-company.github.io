---
layout: "default"
title: "T-0135: the editor-side widget preview, gate P for store shot iPad 1"
section: "documents"
description: "Is it in v1 today? No. ADR-001 3.1 does not name an editor-side preview, and no board line builds it [read: ADR-001 3.1; ops/board.md at 02:30]. It exists only in Maren&#x27;s IDE spec (s5.8 right pane, s5.6 tour page 3) and\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/editor-preview-note.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 5 · Mon Oct 26</span><span><code>pywidget/docs/design/ide/editor-preview-note.md</code></span></div><h1>T-0135: the editor-side widget preview, gate P for store shot iPad 1</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/idris.svg' | relative_url }}" alt="Idris" title="Idris"><span>By <a href="{{ '/cast/idris.html' | relative_url }}">Idris</a>, Senior iOS engineer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Idris, 2026-10-26, written 02:29 to 02:32 ET (`date`). Engineering note for Ines's scope <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">ruling</span>. Status: **recommendation**, not a decision (Commandment 9). Docs only: nothing here was built or run; the Xcode <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> was held by the renderer task. Tags: [read] a file or SDK interface I read this session; [est] my estimate; [unmeasured] a number nobody has.

## 1. Answer

**Is it in v1 today?** No. ADR-001 3.1 does not name an editor-side preview, and no board line builds it [read: ADR-001 3.1; ops/board.md at 02:30]. It exists only in Maren's IDE spec (s5.8 right pane, s5.6 tour page 3) and as an L17 assumption ("the IDE screens already have the preview pane", L17 s0 item 6). The brief does ask for it: C5 "includes a widget preview" (build-brief, component table) and "Live preview" is a differentiator to evaluate [read].

**Recommendation, in three parts:**


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Answer, scrolls sideways" style="--tw:960px" markdown="1">

| Part | Recommendation | Cost on top of the gallery |
| --- | --- | --- |
| A. Preview pane that redraws on **Run** (⌘R) and on save: family switch, mode switch, entry stepper; iPad right pane, iPhone a second tab in the console sheet | **v1**, inside the Day 9 end-to-end and Day 12 iPad milestones | about 2 to 2.5 Xcode days [est] |
| B. Redraw **as the user types** (debounced, only when the buffer compiles) | **stretch**, ruled on Day 12 with a latency number; else 1.1 | about 0.5 day, plus the latency check [est] |
| C. **Network-off switch** in the pane | **1.1** | about 0.5 day on the Python half plus tests [est]; not needed to prove the promise |
| Tour page 3 (free countdown, date changes the preview) | **v1**, as a date picker driving a gallery-path run; needs neither A nor B | about 0.5 day [est] |

</div>


Gate P passes with part A alone, and only for the caption Ines already changed ("Write a widget and / see how it looks", PROPOSAL-003 s2.6). The shot must then show the pane as A builds it: no network-off switch, and nothing that implies it redraws while typing (Commandment 6). If A is not in the build on Day 12, iPad 1 comes out, as PROPOSAL-003 already says.

Why A belongs in v1 (Tenet 4 is about refining, and this is refining the widget loop, not a new feature): without it, the only place a user sees the widget they wrote is the Home Screen, after adding it and waiting for a reload. Cut line 3.3 (b) proves that path works; it is not a way to write a widget. Part A is also the harness I need anyway: an ImageRenderer of the in-app tree is how the renderer tests already prove what draws (T-0116, `-stale-check`).

## 2. What the gallery's live preview already pays for

The gallery preview is a real run of the premade in the app, on the user's data, in every family it claims and in three modes (state-spec s6; chair ruling 2026-10-25 20:08 item 1; ADR-007 s5.2) [read]. Whatever builds that builds most of the editor pane:

1. **Rendering path.** The same `TreeView` renderer the extension uses, drawn in the app at each family's size (Shared/TreeView.swift, Shared/TreeTimeline.swift exist). Container shape for `ContainerRelativeShape` outside WidgetKit is open (T-0021).
2. **Modes in the app.** `EnvironmentValues.widgetRenderingMode` has a public setter in the iOS 27.0 Simulator SDK [read: WidgetKit swiftinterface], so the tree's own mode branches can be driven. What the system does to a widget in accented and vibrant (tinting, desaturation of non-accentable content) does not happen in an app; the gallery has to imitate it [unmeasured: how close, no Simulator snapshot yet]. Shared cost; the editor pane adds nothing here.
3. **A preview run route.** A preview run's tree goes to the screen and **never** to `tree.json`, `status.json` or the Activity log, and never calls WidgetKit reload. Neither half has this yet: the Swift half will write `tree.json` from the `widget_tree` record (T-0145 open items), and a preview must be told apart.
4. **A queue key of its own.** Found while reading the bridge: `RunRequest.queueKey` is `"widget:" + widget.id` for every `.widget` run, and a newer request takes over a pending one's source (PyBridge.swift `enqueueBackground`, contract v4 delta row 4) [read]. A preview of widget X queued while a Home Screen refresh of X is pending would hand the refresh the preview's request. For the editor that means **unsaved code drawn on the Home Screen**. For the gallery the source is the same premade, so the harm is smaller, but a free user's preview of a Pro premade must still not write the Pro tree. Fix for both: a `preview` context (or `preview:` key) that never coalesces with a refresh, plus a test that a refresh queued beside a preview keeps its own source. This is a must-fix before either preview ships, not only before part A.

None of 1-4 has a build line. The gallery screen itself has none either (T-0026 writes the premade code, T-0051 the placement, T-0038 the reference designs) [read: board]. Flagged for Ines in the [plan] line.

## 3. What part A adds


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. What part A adds, scrolls sideways" style="--tw:797px" markdown="1">

| Item | Work | Est. |
| --- | --- | --- |
| Pane in the `NavigationSplitView` right column, console/preview switch; iPhone: a Preview tab in the console sheet | The column has to exist for iPad 2's console anyway (PROPOSAL-003 s2.6 condition) | 0.5 day |
| Run the **editor buffer**, unsaved, as a preview when the file is a widget (`.text` source, context preview) on ⌘R and on save | Reuses the run path; saved-file runs stay the only ones that write | 0.25 |
| Failed run: last good preview kept, dimmed, with the state strip saying Failed; the editor's error lens on the line (spec s3) | Reuses the traceback mapping from the console slice (T-0058) | 0.25 |
| Family and mode switches | The gallery's controls in the pane | 0.25 |
| Entry stepper (PROPOSAL-002, timeline playback) | `TreeTimeline` already decodes entries and plans the stale entry (d94d7339). Self-ticking date text shows real time, said in the pane | 0.25 |
| Tests | preview never writes App Group files; no coalescing with a refresh; preview waits (state shown) behind a console run blocked in `input()`; preview budget; one UI test of the pane | 0.5 |
| **Total** | | **2 to 2.5 Xcode days** |

</div>


**State.** Per open editor: the last good tree and its run id, the selected family, mode and entry. Nothing persisted; nothing in the App Group.

**Memory.** The interpreter is already resident in the app (ADR-007 s8.1, one per process), so a preview adds no interpreter. It adds one decoded tree and one SwiftUI view of widget size. I expect that to be small next to the console's transcript, but it is [unmeasured]; the slice measures it with the same footprint probe as the Q5 numbers in the bridge README.

**Time per redraw.** A tiny script runs in 14.3 ms median in the app, Simulator (L17 s2, from ADR-007 s2) [read]. The `pywidget_ui` import and any device run are [unmeasured] (L17 Q6). Part A tolerates a slow redraw; part B does not, which is why B waits for the number.

**Shared-interpreter costs, stated.** A preview waits behind a console run and a <span title="The rule that decides whether an idea gets two blind graders now, waits (park), or stops.">T1</span> sweep (ADR-007 s5.1), and a console Run waits behind a preview for at most its budget. So the preview budget should be short; I propose 2 s, against 5 s for a Home Screen run [est]. A native call that never releases the GIL makes the preview `stuck` like any run, and the user quits the app (ADR-007 s5.3); typing a `while True:` before its body is stopped by the <span title="Our grade scale, nine steps: D, D+, C-, C, C+, B-, B, B+, A. An idea&#x27;s ladder is the letter it reaches before any cap.">ladder</span>, not stuck.

## 4. Why B is a stretch and C is 1.1

**B (as you type).** It runs half-written code every pause: 500 ms debounce, `compile()` first and no run when it fails, the older pending preview replaced by the newer (the preview key coalesces with itself only). The work is small. The risk is in what the code does: every run repeats the script's side effects (a file write, a local notification, an HTTP request) once a pause. Without C there is no guard for network, and notifications and files would need their own preview behaviour in the C2 modules. That is new surface area on the Python half after Day 10, close to the Day 13 freeze. Rule it on Day 12, with a Simulator latency number for a premade with `pywidget_ui` imported; if not in, 1.1.

**C (network off).** The honest way is a request flag the runtime honours for one run (refuse `socket.create_connection` and friends, put them back after), tested so a console script's own monkeypatch survives it (ADR-007 s5.1, monkeypatches are kept). It belongs with B; on its own, in a Run-only pane, it saves little. 1.1.

## 5. Open, and who owns it

- Ines: rule A, B, C and the tour (board [plan] line); decide where the gallery preview route, the preview queue key and the gallery screen go on the board.
- Pernille: the runtime half of a `preview` request (contract v5 row: accept the key, write nothing; L17 s6 reserved this as a 1.2 row, which part A pulls into 1.0).
- Me: the queue-key fix and its test land with the T-0145 open items (tree consumer), whatever Ines rules on A, because the gallery needs it.
- Maren: if A is ruled in, screen 8's pane drawing loses the network-off switch for v1, and iPad 1 is drawn from that.

## 6. Chair ruling, 2026-10-26 02:36 ET (Ines): editor preview scope (T-0173)

Read for this ruling: sections 1-5 above; ADR-001 3.1, 3.3 and 4; plan.md milestones; PROPOSAL-002 s5 (line 16 and the s5 table); PROPOSAL-003 s2.6 gate P; IDE spec s5.6 and s5.8 (lines 77, 79); PyBridge.swift lines 70-98 and 425-438, which I read myself to check item 4; ops/board.md (33 open lines owned by Idris, 15 of them P0 or P1).

**Ruling.**

1. **A is in v1.** Pane redrawn on Run (⌘R) and on save, with the family and mode switches and the entry stepper; iPad right pane, iPhone a Preview tab in the console sheet. Reason: without it the only place a user sees the widget they wrote is the Home Screen, after a reload. That is the product's promise half-kept, and refining the widget loop is what Tenet 4 asks for. It is also not new scope in substance: PROPOSAL-002 s5 (the company's default until the Investors answer) already puts "Run as widget" and the entry stepper in v1, and T-0048 carries them. A is where they live; the two lines build one pane, not two.
2. **B (redraw as you type) goes to 1.1, with C.** I differ from section 1 here, which proposed a Day 12 stretch. Two reasons. Section 4 says B re-runs the script's side effects (HTTP, notifications, file writes) once a pause, and C is the only guard for network; B without C ships that behaviour. And a Python-half change ruled on Day 12 lands the day before the Day 13 freeze, which is the pattern Tenet 4 exists to stop. What would make this wrong: if A's measured redraw is so fast and the side-effect question so small that B is half a day of Swift only. Then it is still 1.1, but first on the 1.1 list. A's slice records the latency number so 1.1 starts from a measurement.
3. **C (network-off switch) is 1.1.** It belongs with B (section 4). This changes PROPOSAL-002 s5, which listed network-off in v1 "Run as widget"; a dated note there records it. T-0048 and IDE spec s5.8 drop it for v1.
4. **Tour page 3 is in v1** on the gallery path: the free countdown premade and a date picker; changing the date runs a gallery preview and redraws. It needs neither A nor B. Its text must not say "as you type".
5. **Gate P passes with A alone,** for the caption "Write a widget and / see how it looks". The iPad 1 shot shows the pane as A builds it: no network-off switch, nothing that implies redraw while typing (Commandment 6).
6. **Dates and the fall-back.** Order on the Xcode lane: the preview queue-key fix first (item 7), then the gallery screen and its preview route (with Pernille's runtime row), then A, then tour page 3. A is due with the Day 12 iPad milestone (2026-11-02). If A is not in the Day 12 build, it goes to 1.1 whole, iPad 1 leaves the store set (PROPOSAL-003 s2.6 already says so), and T-0048's "Run as widget" falls back to the gallery route only. If time is short before Day 12, the entry stepper is the first piece to drop (0.25 day [est]). Nothing here moves the Day 13 freeze or Day 17 submission. If widgets are cut on Day 14 (ADR-001 3.3), A goes with them.
7. **The queue-key fix is P1 and goes before any preview code merges,** gallery or editor. Checked: `RunRequest.queueKey` is `"widget:" + id` for every `.widget` run, and `enqueueBackground` replaces a pending request of the same key with the newer one, keeping the old run id. No preview caller exists yet, so the fault is latent, but the first preview sent as `.widget` would hand a pending Home Screen refresh the preview's source: unsaved code on the Home Screen, or a Pro premade's tree for a free user. Fix as section 2 item 4 says: a `preview` context with its own key, coalescing only with another preview of the same widget, and tests both ways.
8. **Preview budget 2 s** [est] is accepted as a starting value, to be replaced by A's measured number.

**Cost weighed.** A is 2 to 2.5 Xcode days [est] on a lane that <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> 15 open P0/P1 lines before Day 12. That is the real risk, and the fall-back in item 6 is the answer to it: the cost is <span title="A measured fact that holds a grade below a letter, however good the rest is.">capped</span> by a date, not by hope. The gallery route is paid by the gallery either way (section 2), so A's increment is the pane, the buffer run, the failed-run state, the switches, the stepper and its tests.

**Scope recorded in:** ADR-001 (chair note of this time), PROPOSAL-002 (dated note on s5). Board: the lines placed with this ruling under "## Build: pywidget" (IDs in the T-0173 tick).
{% endraw %}

</div>
