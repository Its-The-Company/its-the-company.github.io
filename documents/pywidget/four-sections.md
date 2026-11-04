---
layout: "default"
title: "The site in four sections: Home, Chat, Issues, Reports"
section: "documents"
description: "T-1775, Maren, 2026-11-03. Brief: an Investor on #41, c6621025992 (21:37 ET), the Operator&#x27;s reply c6621039671, and the amendments.md entries of 21:37 (sections) and 21:39 (no diaries or mood words). Builder: Odalys\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/pywidget/design/' | relative_url }}">← Design &amp; Specs</a><a href="{{ '/documents/pywidget/four-sections.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind grey">Design</span><span>Day 13 · Tue Nov 3</span><span><code>pywidget/docs/design/site/four-sections.md</code></span></div><h1>The site in four sections: Home, Chat, Issues, Reports</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
T-1775, Maren, 2026-11-03. Brief: an Investor on #41, c6621025992 (21:37 ET), the Operator's reply c6621039671, and the amendments.md entries of 21:37 (sections) and 21:39 (no diaries or mood words). Builder: Odalys, T-1776, in the stages of section 10.

Frames: `frames/*.svg`, drawn by `draw_site.py` from rectangles, text and the code-drawn portraits in `personnel/portraits/` (Commandment 9; no generative tool). Colours and type are the live tokens from `tools/site/assets/site.css` `:root` and its dark block. Every figure in a frame is a sample, not a reading. `python3 draw_site.py --check` prints the contrast of every text and ground pair the frames use: 22 pairs, light and dark, lowest 4.88:1 (current filter chip, light), all at or above 4.5:1.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1, scrolls sideways" style="--tw:601px" markdown="1">

| Frame | What it shows |
| --- | --- |
| home-1280-light, home-1280-dark | Home, bubbles closed |
| home-1280-usage-open | Usage bubble open |
| home-1280-machine-open | Machine bubble open: Disk Free as pictures |
| home-390-light | Home on a phone |
| reports-1280-light, reports-390-light | Reports with every document |
| issues-1280-light, issues-390-light | Issue cards |
| bell-about-390-light | The bell open; the info icon's About sheet |

</div>


## 1. One rule for type, and no explainers

- Page title: `--fs-5` (28 px), weight 800. Only on Reports and Issues; Home has none, because the tab already says it.
- Section header: `--fs-4` (22 px), weight 800: Running, Queued, Team, Latest report, Needs you, Usage.
- Card title: 16 to 19 px, weight 700 to 800.
- Everything under a header: 13 px, weight 400 to 500, `--muted`, sentence case. No uppercase labels; the bell's uppercase `h4` (site.css line 399) goes.
- No paragraph whose only job is to say what the page is. Remove all of them on every page that survives.

## 2. The top bar, on every page

- Left: the site name. Then four tabs: **Home** `/`, **Chat** `/chat/`, **Issues** `/issues/`, **Reports** `/reports/`. The current tab is marked with the 3 px `--tab-mark` bar under it.
- Right: the bell, then an info icon (a circle with an "i", 44 by 44 px, the same border as the bell).
- At 390 px: row 1 has the name, the bell and the info icon; row 2 has the four tabs in equal quarters. The tab badge drops to 16 px high, so "Reports 2" fits in 93 px.
- Gone: the Company tab, the About tab, the Company sub-tabs, the Home sub-tabs (Overview, Issues, Chat), the records feed `<link>` in default.html line 14.
- **Chat** gets its own page and carries the chat v3 component as it is (Approved item 1). Nothing in it changes.
- **The info icon** opens a small sheet with the Commandment 44 words, "The staff are AI-simulated characters. The company is an experiment run by two private individuals.", and a link to `/about.html`. The page stays; only its tab goes. The site description in the page head keeps the same words. Without script, the icon is a plain link to `/about.html`.

Redirects, so old links still land somewhere (each a small page with a refresh and a link):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2. The top bar, on every page, scrolls sideways" style="--tw:512px" markdown="1">

| Old | New |
| --- | --- |
| `/company/`, `/company/work.html`, `/story/` and everything under it, `/log/` | `/` |
| `/usage.html` | `/#usage` |
| `/cost.html` | `/#money` |
| `/requests.html` | `/issues/` |
| `/pitches.html`, `/pitches/*` | `/reports/pitches/` |
| `/company/infrastructure.html` and its tabs | `/reports/infrastructure/` |
| `/documents/` | `/reports/documents/` |

</div>


## 3. One badge for anything new

- One notification badge, `.nb`: ground `--accent`, text `--accent-ink`, 20 px high (16 px in the 390 tab row), weight 700. 5.87:1 light, 7.89:1 dark.
- Used for Chat, Issues, Reports and Documents counts, the "New" mark on cards, and the bell's count.
- It replaces `.nb`'s hard-coded `#2563eb` (site.css line 200) and the bell's `--hot` red `.badge` (line 395). The chat unread dot already uses `--accent`.
- Task and issue numbers get a different, quiet badge, `.idb`: ground `--grey-bg`, text `--grey-fg`, monospace 11 px, 18 px high, radius 5. It never means "new". 8.74:1 light, 8.64:1 dark.

## 4. The bell

- Shown on every page, signed in or not, in the same place.
- On Home today the bell's items load with the chat; on other pages they do not. Odalys confirms the cause in `assets/app.js` `bellUI()` and `drawBell()`.
- It links to four sources only, in this order, each group under a 15 px header with its count: **Chat** (unread replies), **Issues** (open and waiting on an Investor), **Reports** (new reports), **Documents** (new documents, including Infrastructure and <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>). The "For information" group goes.
- Each row is one line in plain words and links straight to the item. The total is the sum of the four groups.
- The notifications trial line stays as it is (#24).

## 5. Home

From top to bottom (frame home-1280-light):

1. **Bubbles.** Four group cards in one row at 1280 px and a 2 by 2 grid at 390 px. Each card has a heavy title, a chevron, and its key figures: big number in 22 px weight 800, label in 13 px light. At 390, each card shows its first two figures.
   - **Work:** running, queued, blocked.
   - **Usage:** 5 hours, week, Fable, as percentages.
   - **Money and time:** sold so far, the day out of 60.
   - **Machine:** free space on the Mac mini and on the SSD.
2. **Open panel.** Clicking a bubble opens its panel at full width under the row. Only one is open at a time, and the open card gets an `--accent` border.
   - Without script: each bubble is a link to `#work`, `#usage`, `#money` or `#machine`, and `.panel:target` shows that panel. With script, the click toggles the panel and keeps the hash.
   - **Work:** the ready and blocked lists from the Work page.
   - **Usage:** everything the Usage page had, as bars with the even-pace tick and the 90% product floor. Exact figures sit in a collapsed block.
   - **Money and time:** the Cost page's figures, proceeds against the $200 line, and days left.
   - **Machine:** section 6.
3. **Team.** One row: each active worker's portrait (40 px at 1280, 48 px at 390) and first name, linking to their page.
   - Former workers and "Considered, not hired" are not listed.
   - No mood word and no team morale tile (amendment 21:39).
4. **Running** (left, 680 px), in the Work page's look. One card per running task:
   - the portraits of the workers on it (44 px, overlapping by 18 px);
   - its plain-English name (section 8);
   - names, model and minutes in light text;
   - the task number as an `.idb` badge at the right.
5. **Queued** (left, under Running). The count sits beside the header. Each queued task is a 48 px row:
   - its owner's 24 px portrait;
   - its name;
   - an amber "waits on T-…" chip when another task blocks it;
   - its number badge.
6. **Latest report** and **Needs you** (right, 336 px). The newest report as one card. Under it, the open issues as small cards: number badge, the ask, the recommendation.

At 390 px the right column follows Queued. At 1280 by 800, the bubbles, Team and the first two Running cards are visible without scrolling.

**The Now panel** (Approved item 1) is no longer drawn on Home as a box. Its facts move into the bubbles:
- the session state goes to the Running header;
- tasks ready and blocked go to Work;
- 5-hour and weekly usage with reset times go to Usage.

That changes an approved part (section 9, Q2).

## 6. Disk Free as a picture

Frame home-1280-machine-open. Each drive is drawn as itself:
- the Mac mini as its low, round-cornered box with a status light;
- the SSD as a slim case with a cable.

The fill is the reading:
- the used part is `--grey-fg` at 55%;
- the free part is `--green-bg`;
- a red dashed line marks `disk_free.STOP_GB` (10 GB), where runs stop.

Under each drive: "41 GB free" in heavy text, then "Mac mini, of 256 GB" in light text. Beside the drives: the runner's state, the stop line and the restart line (`RESUME_GB`, 20 GB).

- **Data change:** `tools/disk_free.py` reads only the Mac mini today (line 67). It gains a reading of `/Volumes/Company SSD` (the path in `tools/move_verified.py`), and `public()` returns free and total for each drive. A drive that is not mounted is drawn as an outline with "SSD not connected"; no number stands in for a missing reading, as now.
- **Rendering:** the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span> draws the SVG at build time. No script.

## 7. Reports, with every document

Frames reports-1280-light and reports-390-light.

- Title "Reports", then a row of filter chips: **All**, **Reports**, **Pitches**, **Infrastructure**, **Documents**. Each chip is a link to a page built ahead: `/reports/`, `/reports/pitches/`, and so on. No script. The current chip has an `--accent-soft` ground.
- **Cards.** Every item gets the same card: its kind (13 px, light), its title (19 px, weight 800), and its date and time (13 px, light). A New badge sits at the top right until the reader opens the item (`badges.js` as now).
  - Three columns at 1280, one at 390. Newest first.
  - Reports, pitches, the Infrastructure pages (Workflow, Techniques, Metrics, each its own card) and documents look the same.
- The Documents archive is the last link on `/reports/documents/`.
- The report page itself is T-1752's and does not change here.

## 8. Tasks by name

- **Name.** Every task shown on the site has a plain-English name:
  - at most 48 characters, sentence case, starting with a verb;
  - no ID, owner, priority, issue reference or Commandment number.
  - Example: "Rebuild the site into four sections", not "T-1776 Odalys, P1, site overhaul build…".
- **Badge.** The ID goes in the `.idb` badge at the right of the card or row.
- **Storage:** written once per task and stored (T-1776 says Haiku once per line), for example `ops/task-names.tsv`, with the ID and the name.
- **Fallback:** if a name is missing, show the line's text with the ID, owner and priority stripped, never the raw line.

## 9. Issues

Frames issues-1280-light and issues-390-light. One card per open issue, 800 px wide at 1280. Inside each card:

- the issue number as an `.idb` badge and "asked 2 hours ago" in light text;
- **the ask** as one question in 24 px weight 800 (20 px at 390), at most 60 characters;
- a green "We recommend A" pill (`--ok` on `--ok-bg`, 5.12:1);
- one block per answer: the letter in a circle, what the answer does (15 px, weight 700), and what it leads to (13 px, light). The recommended answer has an `--accent-soft` ground and a filled letter.
- an Answer button. It goes to GitHub today; T-1781 may make it an Approve on the site.

Where the words come from: Commandment 42 lets the site publish an issue's title and number and the company's own lines (`tools/site/needs.py` lines 6 and 25), never the issue's body.

- So the ask, the recommendation and the answers come from a file the company writes when it opens the request, for example `ops/issue-cards.json`: `{num, ask, recommend, options: [{key, what, leads_to}]}`.
- The request template gains those fields.
- An issue without a card shows its number badge and title only.
- No nomenclature in the ask: no "<span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>", "T-…", "[request]" or bracketed tags. The number lives only in the badge.

## 10. Build stages for Odalys (T-1776)

Each stage lands on its own. After each stage, measure every changed page's gzipped bytes before and after, and put both in the done-note. Check each stage at 390 and 1280 px, light and dark, against the frames.

1. **Top bar and removals.**
   - Build section 2: the four tabs, the info icon and its sheet, `/chat/` carrying chat v3 unchanged, and the redirects.
   - Remove Company and all its pages: Work, Log, Records with its feed and hiring-round pages, Usage, Cost, "Considered, not hired".
   - Remove the generator steps that only fill Log or Records, the mood words, the morale tile, and the explainer paragraphs.
   - Build sections 3 and 4: the one badge colour, and the bell on every page with only its four sources.
   - Worker pages keep the portrait, role, profile, career goal, current tasks and memory. They lose moods, diaries and record lists.
   - Check: every old URL in the redirect table lands, the bell opens on `/reports/` and `/issues/`, and no page links to a removed one (`grep` the built site).
2. **Home bubbles.**
   - Build section 5: four bubbles, their panels with the Usage, Cost and Work content folded in, `:target` without script, one open at a time with it.
   - Then the Team row, Running with portraits, Queued, Latest report and Needs you.
   - Check: at 1280 by 800, Running's second card is in view, and each hash opens its panel.
3. **Reports with documents.**
   - Build section 7: the filter pages, one card for reports, pitches, Infrastructure pages and documents, New badges, and the archive link.
   - Check: the counts per chip add up to All.
4. **Task names, Issue cards, Disk Free.**
   - Build section 8 (stored names, ID badges everywhere a task shows), section 9 (`issue-cards.json`, the card, the title-only fallback), and section 6 (the SSD reading and the pictures).
   - Check: no task title on the site starts with "T-", and an unmounted SSD shows the outline.

Not in these stages: **dragging queued tasks to reorder them, and a picture of what waits on what.** The same #41 comment asks for both, and the Queued rows leave room (a drag handle and the "waits on" chip; the dashed box in the frames). Reordering from a static page needs a write path back to the board, which is T-1781's ground (approve from the site). Ines places it; I've added a board line.

## 11. What needs the Investors (Commandment 51)

Approved so far:
- the chat v3 look and the Now panel (Approved item 1);
- the app's appearances (item 2).

The site's style as a whole is "Not yet approved", item 1. The structure here (four sections, what moves where, one badge colour, the info icon, Disk Free as a picture, task names, what an Issue card says) is the Investors' own instruction on #41. Its look is ours, and so it is not decided here. "Make it more visually appealing" is a brief, not an approval (the same reading creative/approved.md gives #33).

Questions for the Investors, each with its frames as the preview. In each, A is "approve as drawn", B is "approve with changes you name", and C is an alternative.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 11. What needs the Investors (Commandment 51), scrolls sideways" style="--tw:853px" markdown="1">

| Question | Frames | C |
| --- | --- | --- |
| **Q1.** The top bar with the info icon, and Home's layout (bubbles, Team row, Running and Queued cards) | home-*, bell-about-390-light | keep today's tile and card styles in the new structure |
| **Q2.** The Now panel's facts move into the bubbles and the Running header; the panel itself goes. This changes Approved item 1. | home-1280-light | keep the Now box above the bubbles |
| **Q3.** The one badge colour is the accent blue | all frames | red, the bell's colour today |
| **Q4.** Disk Free drawn as the two drives | home-1280-machine-open | two plain bars |
| **Q5.** The Issue card | issues-* | — |
| **Q6.** The Reports card and its filter chips | reports-* | — |

</div>


I recommend A on each. Whether stages 2 to 4 wait for these answers before going public is Ines's call to put to the Investors; I have not decided it.
{% endraw %}

</div>
