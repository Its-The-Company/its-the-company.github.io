---
layout: "default"
title: "Spec: the Now dashboard, the brief, and the task list (#37)"
section: "documents"
description: "There are two readings, and the page shows both. Each costs one short line and no new data."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/site-dashboard.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 2 · Fri Oct 23</span><span><code>ops/plans/site-dashboard.md</code></span></div><h1>Spec: the Now dashboard, the brief, and the task list (#37)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Author: Maren (product and visual design). Written 2026-10-23, Day 2, 19:45 ET. Status: sections 1 to 6 decided; reviewed against Odalys's build 2026-10-23 20:37 ET (section 9); frames in ops/site-checks/dash/.
Asked on #37 (Investor comment after the 18:45 ET reply): the priority list lists discrete tasks, not "Your open messages"; a dashboard of what is being worked on "and to what level", which "appears to be broken"; a button for a very brief summary of current work.
Data: Odalys's `tasks` key in tools/live_status.py (35920ef, WIP). Builder for the page: Odalys (queue.js). Chat.js lines: Idris. QA: Wrenna, live, 390 and 1280, light and dark.
Inside the approved system (site-v2.md section 9, option B; site-chat-v3.md). No new colour, size or token.

## 0. The decision in five lines

1. The "Right now" tile on the Home tab becomes the button. A tap opens the **brief** under the tiles: the project line, one entry per running worker with model and effort, one counts line, one usage line.
2. The priority list becomes **Tasks**, in four groups: Working now, Ready, Waiting or blocked, Just finished. The message run order stays, folded under the list.
3. "Level" is shown two ways: the model and effort of each running call, and sub-tasks done of total. A level the data does not carry is never printed.
4. The task list never asks the Investors for anything. Rows that wait on them get muted words, not the hot chip. Asking is the job of <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Requests</span>.
5. Board line 29: the dock's state line ("Sent as #N...") shows under the bar too. That fits chat.js with 2 B gz to spare (section 5).

## 1. Why it looks broken (read from the code and measured)


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1. Why it looks broken (read from the code and measured), scrolls sideways" data-n="1" style="--tw:1000px" markdown="1">

| # | Finding | Evidence | Owner of the fix |
|---|---|---|---|
| 1 | With a token there is no Now button and no Now panel on Home. chat.js hides `.aside` (the panel) and `.now-toggle` at start, and hides the strip on the Home tab. All an Investor sees of current work is the "Right now" tile: a count and first names. | chat.js line 129 (`[composer, urgent, aside, tog]` hidden), line 392 (`stripEl.hidden = cur === 'home'`) | This spec, then Odalys |
| 2 | **My error.** My v3 spec moved the Now cards off Home (site-chat-v3.md section 2) and made the tiles replace the strip (1.4). It kept the 5-hour % and reset time from the 19:51 amendment, but cut its other half, the brief description of current work, down to a list of names. | site-chat-v3.md 1.4 and 2 | Mine; section 3 puts it back |
| 3 | Running workers showed as idle. A worker resumed after its turn limit read as finished (3 of 3 at 19:02), and a refused call read as "just finished". | 35920ef commit message | Odalys, fixed in 35920ef. It is live once the status loop runs that code |
| 4 | The page will show two different "ready" numbers: the strip says 21 (read_board), the task list says 22 (`tasks.count.next`, which drops unrelated and superseded lines). | `live_status.build()`, 19:40 ET, n=1 | Odalys: the strip and tiles read `tasks.count` when it is present |
| 5 | The live public `status.json` has no `tasks` key yet. At 23:02 UTC it showed the session active, 0 workers, and all 5 <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> "next". | curl of the live file, 19:4x ET | Publish |

</div>


## 2. What "to what level" means here

There are two readings, and the page shows both. Each costs one short line and no new data.
- **Effort level** of each running call: model and effort (`m`, `e` on `tasks.run`), for example "Fable, max effort". The Investors set max effort on #37, so this line is how they check it. If `e` is missing, the line prints the model only and never guesses an effort.
- **Progress** of an open task with sub-lines: "18 of 21 done", from `p` = [done, total]. It shows only when total is 2 or more, because a "1 of 1" meter is noise.
- Effort is printed as words, not drawn as a meter. Until Sunday every call runs at max, so a five-step meter on every row would be full every time and would carry no information.

## 3. Layout

### 3.1 The button (Home tab, 390 and 1280)
- The fourth tile, "Right now · 3 at work · Ines, Maren, Odalys", stays as it is. It gains `role=button`, `aria-expanded` and `aria-controls="cv-brief"`. A tap toggles the brief. It no longer navigates; Company > Work is linked inside the brief.
- At 390 the tile is on the first screen (site-chat-v3.md 1.4). At 1280 it sits in the sticky side column, so it can be pressed from any scroll position.
- The brief is on the Home tab only. Home is always the first tab, one tap from any thread. This is what the 19:51 amendment asked for: "a button on the home page".
- The open or closed state is kept in a variable for the page's life, not in storage. The brief starts closed.

### 3.2 The brief (`#cv-brief`, directly under the tile grid)
At most 12 lines and 280 px tall at 390 with 3 workers. It never scrolls inside itself. Top to bottom:

1. **The project**, one line from the build's status sentence already in the page (`.hero .latest`), for example "No product chosen yet: ...". This is the 19:51 "what the project is working on".
2. **One entry per running call** (`tasks.run`, at most 5, then "+N more"). Each entry is two lines: line 1 is fs-0 muted, line 2 is fs-1 ink with a one-line ellipsis.
   `Ines · Fable, max effort · 6 min`
   `First-principles hunt H39`
   No call running, session on: "No worker call is running. The next tick is at 8:15 PM." (`next_tick`). No session: "No session is running. The next one starts at 8:15 PM."
3. **Counts**, from `tasks.count`: "22 ready · 18 waiting or blocked". There is no "on you" figure (section 4, rule 4). The `you` rows are already inside waiting and blocked, so adding them again would count them twice.
4. **Usage**: "5-hour 21% used, resets 8:00 PM ET · week 24%" (`meter`).
5. **Links**: "All tasks ↓" (scrolls to section 3.3) · "Each worker: Company › Work".
6. **Source**, muted: "Live copy, 12 s old" or "Public copy from the site build, 40 min ago". A public copy older than 2 minutes never says "running" (the same rule as app.js renderNow).


**Amended 2026-10-23 after the build review (Maren, section 9):**
- On open, if the brief shares the dock's columns (390; at 1280 it is in the side column) and its bottom is below the dock's top, the page scrolls by the difference plus s3 (12 px), with no smooth scroll. At 390 the brief opens at y 679, below the fold at 390x667. The tile stays on screen (top 386 at 844, 205 at 667).
- The project line (item 1) clamps to 2 lines like `.tk-t`, with no bottom margin. On one line it showed only its label. Measured 278 px with 3 running, under the 280 <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>.
- The "All tasks" link lands with the Tasks header below the sticky tab row: `#cv-tasks{scroll-margin-top:69px}` (tab row 57 + s3).
- The strip's second number is wait + blocked (live_status), so its word is "waiting or blocked", the brief's word. This changes the visitors' strip label too (an exception to 7.7: the old word was wrong).

**Amended 2026-10-26 01:50 ET (Maren, T-0121):** with 8 live calls (5 shown) the brief measured 361 px at 390, over the 280 cap; the 3-call sample hid it. Item 2 now shows at most 3 entries, same two-line format; with more than 3 running, the total leads the counts line: "8 running · 52 ready · 40 waiting or blocked" (no "+N more" line). The usage line has no top margin of its own. Measured at 390: live 254 px; worst case 274 px (8 running, 2-line project, 999 counts, 100% with a 12:59 PM reset). tools/site_dash_probe.py reads that worst case on every run.
### 3.3 Tasks (replaces "Your open messages"; same place: Home tab, above the dock)
Header: "Tasks" with the open count. Groups are `h3` with a count, in this order:


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3.3 Tasks (replaces &quot;Your open messages&quot;; same place: Home tab, above the dock), scrolls sideways" style="--tw:1003px" markdown="1">

| Group | Rows | Shown by default | Meta line (fs-0, muted), in this order |
|---|---|---|---|
| Working now | `tasks.run` | all (at most 8) | owner · model, effort · elapsed |
| Ready | `open`, s = next, board order | first 5, then "Show all 22" | owner · kind · progress |
| Waiting or blocked | s = wait or blocked | collapsed: "Show 18 waiting or blocked" | owner · "waiting" or "blocked" · "waits on the Investors" when y = 1 |
| Just finished | `tasks.done` | 3 (3 in the variable, up to 8 in status.json) | owner · ago · "stopped at its turn limit" or "failed" when `x` is set |

</div>


Row anatomy:
- Line 1 is the title: fs-1, weight 600, clamped to 2 lines. Line 2 is the meta.
- The group header already says the state, so rows carry no state chip.
- One chip only, for origin: `chip chat` "Investor ask" when o = i, followed by "#N" when the source is the variable (token). The company's own tasks get no chip. The word carries the meaning, so colour is never the only signal.
- Progress: a 48 x 6 px `.cv-meter` after the words "18 of 21 done", only when total is 2 or more.
- A row links to `/company/work.html#<owner>`, where the full scrubbed line is. Titles in the variable are cut to 48 characters (section 6).
- **Message run order**: the existing list and its drag code stay unchanged, under a "Reorder your messages (N)" disclosure at the foot of Tasks. The parser and investor.json depend on it, and the #37 complaint is about what the list shows first.

## 4. Colour and type rules (scripted with tools/site_contrast.py, 0 failing)

1. Every chip and meter uses a pair the contrast script already enforces. The origin chip is "chat chip" (accent on accent-soft): 4.88:1 light, 6.51:1 dark. Meta text is muted on bg: 6.11 light, 7.39 dark. The progress fill is accent on soft-2: 4.92 light, 6.75 dark, against the 3:1 rule for graphics.
2. Green, blue and amber chips stay state words wherever they appear (Running, Next, Blocked in the Now lanes). Tasks uses group headers instead, so it adds no state colour.
3. No number without its words: "18 of 21 done", never a bare meter.
4. **The hot colour and the word "you" are for Urgent Requests only.** On #37 eight open lines carry the waits-on-Investors flag. All eight are product spikes waiting on the product choice. If they were drawn hot, the page would prompt the Investors to decide, and the 2026-10-23 17:33 amendment says not to. So they show as muted words inside Waiting or blocked. They never appear in the bell, the badge or the brief's counts.
5. Motion: only the existing pulse dot, which is off under `prefers-reduced-motion`. The brief opens with no transition.

## 5. Board line 29: "Sent as #N" on a phone (decided)

- **Problem.** After "+" and Send, `go(N)` opens the new tab. On a phone the dock folds to its bar, and the state line is drawn only in the open dock, so it never shows.
- **Decision.** The bar shows the state line too, under the pill, for its usual 8 s.
- **Why not the head.** The sticky head <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the kind chip, `#N`, the title and the deadline. At 390 a confirmation there would push the title to an ellipsis.
- **Change** (Idris, chat.js `drawDock`):
  - In the bar branch, add `put(dock, out);` after `put(b, barSend);`.
  - The bar placeholder's two "Message the company..." branches collapse into one: `target() === 'new' || isMain(target()) ? 'Message the company...' : ...`.
  - site.css gets `.cv-dock .cv-state:empty{display:none}`, so an empty line adds no height.
- **Measured** with the builder's `slim_js` and gzip -9, 19:45 ET:


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 5. Board line 29: &quot;Sent as #N&quot; on a phone (decided), scrolls sideways" style="--tw:688px" markdown="1">

| Variant | chat.js size | Against the 10,752 B gz cap |
|---|---|---|
| Today | 30,168 raw / 10,746 gz | 6 B left |
| Conditional `if (out.textContent)` | 30,205 / 10,757 | 5 B over: refused |
| Unconditional put and the merged string | 30,158 / 10,750 | **fits, 2 B left** |

</div>


- **Height.** The bar plus the state line is about 83 px, inside the 96 px the footer already reserves at 390.

## 6. Bytes: where the code can go (measured 2026-10-23 19:40 ET, the builder's slim_js, gzip -9)


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6. Bytes: where the code can go (measured 2026-10-23 19:40 ET, the builder&#x27;s…, scrolls sideways" style="--tw:1031px" markdown="1">

| File | Shipped | Cap | Room |
|---|---|---|---|
| app.js | 25,581 raw | 25,600 raw, no further raise (site-v2.md 10 item 5) | 19 B |
| chat.js | 30,168 raw / 10,746 gz | 32,768 / 10,752, last raise (site-chat-v3.md 4.3 cond. 3) | 6 B gz; section 5 leaves 2 |
| queue.js | 14,702 raw / 6,027 gz | 16,384 / 6,656 | 1,682 raw / 629 gz |
| COMPANY_STATUS variable | 7,674 B, 5 trims applied (lane_next, queue_text, task_done, inbox_title, task_title) | 7,680 | 6 B |

</div>


These constraints decide the design:
- **app.js and chat.js cannot take the brief or the task list.** So both go in queue.js, which already loads with a token on Home and already listens to every status.
- queue.js finds the tile (`.cv-live`) and puts `#cv-brief` after `.cv-glance`. It puts them back whenever a redraw removes them (on feed, status and hashchange). It handles the tap with one delegated click listener, so no chat.js bytes are spent.
- If the brief and Tasks do not fit in 629 B gz, the cut is named now: drop "Just finished" first, then the "Reorder your messages" disclosure's count. The brief and the four-group list do not get cut, because they are the two asks. No second raise.
- **The variable has 6 B of room.** Nothing new may be added to it. Titles arrive at 48 characters, so rows clamp to 2 lines and link to the Work page for the full line.
- **Visitors without a token** keep today's Now panel (app.js), its button in the strip, and the static Company > Work page. app.js has no bytes for more.

## 7. Acceptance (Wrenna, live, 390 x 844, 390 x 667 and 1280 x 900, light and dark)
1. With a token, the Home tab's "Right now" tile is a button (`aria-expanded` flips). The brief opens under the tiles within one frame. At 390 with 3 running it is at most 280 px tall.
2. The brief shows each running worker with model and effort exactly as the variable carries them. A row without `e` shows no effort word.
3. The strip, the tiles and the brief show one "ready" number, the same as the Tasks header group.
4. Tasks shows the four groups in order. Ready shows 5 rows and "Show all N". Waiting or blocked starts collapsed. No row in Tasks uses `--hot` or the word "you".
5. "+" then Send at 390 shows "Sent as #N. A receipt follows within a tick." under the bar for 8 s. The bar is back to its normal height after the line clears.
6. chat.js is at most 10,752 B gz and queue.js at most 6,656 B gz (site_build_unit_test). The variable is under 7,680 B. There are 0 console and CSP errors and no overflow at 390.
7. Without a token: today's strip, Now button and panel are unchanged; status.json carries no Investor login (C42).

## 8. Open
- Frames: drawn 2026-10-23 in `ops/site-checks/dash/` by make.py: the real build with fixtures, with the section 3.2 amendments applied as an overlay (the target, not what is live). Brief closed and open, Tasks collapsed and expanded, at 390 and 1280, light and dark.
- The public copy keeps the issue number `i` on task rows, while plan 4 drops issue numbers from lanes. Odalys and Idris decide. The design prints "#N" only from the variable.
- Two board lines look open after their work is done: "Site v2 slices 2 and 4" (1 of 1) and "Site v2 slice 1 DONE". The task list will show them as Ready. That is board hygiene for their owners, not a fix in the page.
- <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>: the brief and Tasks change the live chat home. Screenshots of the live build go on #29 for the Investors' approval, as with v3.

## 9. Review of Odalys's build (Maren, 2026-10-23, C13 hand-off with independent review)
Build: b8799a3, 35920ef, 3a9bacf, bcfbdac, f1f67be, 0babaa7. Read with tools/site_dash_probe.py (text, not screenshots) and tools/site_v3_qa.py (34 states, 0 failing).


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 9. Review of Odalys&#x27;s build (Maren, 2026-10-23, C13 hand-off with independent…, scrolls sideways" data-n="1" style="--tw:559px" markdown="1">

| 7 | Result | Measured |
|---|---|---|
| 1 | Pass, with a finding | aria-expanded false/true/false; brief 262 px at 390. It opens below the fold at 390x667 and 158 px under the dock at 390x844 |
| 2 | Pass | "Wrenna · Opus, high effort · 11 min" as the variable carries m and e |
| 3 | Number passes, word fails | 23 ready and 19 in strip, brief and Tasks; the strip calls the 19 "blocked" |
| 4 | Pass | Four groups in order; Ready 5 + "Show all 23"; Waiting or blocked collapsed; 0 elements in --hot, 0 "you" in the brief and Tasks |
| 5 | Open | Idris's board line 30 not built yet (chat.js has no `put(dock, out)`) |
| 6 | Pass | site_build_unit_test 60/0; 0 console or CSP errors; scrollWidth 390 and 1280 |
| 7 | Pass | Visitors' strip, Now button and panel unchanged (anon states 0 failing) |

</div>


Contrast, scripted in the probe: meta 6.11 light / 7.39 dark, chip 4.88 / 6.51, meter 4.92 / 6.75, as section 4 says.
Findings outside section 7: the "All tasks" link hides the Tasks header under the tab row; the project line shows only its label; 23 of 42 open rows carry "Investor ask". All five are build lines on the board under the review line.
{% endraw %}

</div>
