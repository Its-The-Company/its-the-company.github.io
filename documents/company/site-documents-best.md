---
layout: "default"
title: "Documents: &quot;Best ideas so far&quot; (board H51)"
section: "documents"
description: "Five rows at the top of /documents/, above Write-ups and the hunt cards. A stranger reads the company&#x27;s five best concepts, how good each is, who said so, and the counted need behind it, in one screen at 1280 and about\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/company/site-documents-best.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 3 · Sat Oct 24</span><span><code>ops/plans/site-documents-best.md</code></span></div><h1>Documents: "Best ideas so far" (board H51)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-10-24 ~03:00 ET. Spec only; Odalys builds it on top of her plain version (uncommitted at writing: `hunt.overall_records`, `documents.best_ideas`, `documents.best_html`). Form: hand-off, Odalys builds, I review the shots. Commandments 46 (the site) and 51 (creative approval).

## 1. What it is

Five rows at the top of `/documents/`, above Write-ups and the hunt cards. A stranger reads the company's five best <span title="One product idea inside a lane. C1 is the lane&#x27;s first idea.">concepts</span>, how good each is, who said so, and the counted need behind it, in one screen at 1280 and about one and a half at 390. Every letter comes from a row of `tools/hunt.py` (`overall_records`, the same rows `hunt.py list` and the cards' grade chips read). No letter, name or count is typed into the <span title="The starting recipe a lane uses to look for ideas. G2, for example, starts from public datasets.">generator</span>.

## 2. Each row: field, source, rule


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 2. Each row: field, source, rule, scrolls sideways" style="--tw:832px" markdown="1">

| Field | Source | Rule |
|---|---|---|
| Rank | `best_ideas` order | Competition rank on (letter, number of grades): equal pairs share a numeral (1, 2, 2, 4, 5). Rendered as `<li value="N">` so the `ol` marker prints it; no extra text. |
| Concept | origin row's `concept` (oldest <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lane</span> in the idea) | As Odalys has it: parentheticals kept, `one_line` at 110 characters. Bold markers stripped. It is the link to the lane (`url_of(home)`): a 44 px-tall tap target instead of a 3-letter "H39". |
| <span title="The final letter, after the caps.">Overall</span> | newest decision in the idea: its latest <span title="The worker who reads both graders and decides. The decision, a ruling, is one row in the rulings file.">chair</span> Ruling row, else its latest Overall grade row (`gradebook.current`; <span title="A second worker who grades the idea without seeing the first worker&#x27;s grades, and records them first.">blind</span> and second-grader rows never count) | The grade chip (`span.kind.grade[data-grade]`, section 6), placed before the concept. Never the best letter the idea ever had. |
| Grader | owner of the note that gave the newest decision | Comma list in name order ("Ines, Maren"). No owner: the word "unnamed" in muted text, never a guess. |
| <span title="How many people show, in their own words, that they want this.">Need</span>, one counted phrase | origin row, section 3 | Its own line, ink colour. |
| Lane | `lane`, and `home` when they differ | "H39", or "H51a, graded in H61" when the row lives in a grading note. In the meta line, plain text (the concept is already the link). |
| Date graded | title-line date of the note that gave the newest decision | Not the note's last change. Today H39's card date is its commit date (2026-10-24); its title says 2026-10-23. `hunt.py` already reads the title date; use that. If a note has no title date, fall back to the change date and say nothing. |
| Grades | `grades` | "6 grades". It tells the reader that rows were grouped (section 4). |

</div>


**Rows 15, 16, 19 changed, signed Maren, 2026-10-24 05:11 ET** (Odalys d13f2fd; code in af56a7f and c5e7035). 'Best letter' became 'newest decision'. Reason: a superseded letter is not the company's view. The Atmos planner held B in earlier rows and fell to C+ by Ines's Ruling (H61 pass 3); the best-letter rule would have shown B forever. Rank (row 13) sorts on the shown letter, so it follows. One condition, checked: a second grader's letters are never the decision. `gradebook.current` skips 'blind' rows, but only when the nearest heading says blind; my grades-maren-h59 and -h69 tables did not, and 12 of my rows parsed as 'grade'. Fixed in my files (fa7b8ad), all 12 now 'blind'. Known limit, not fixed here: a note with no title date sorts first, so its rows can never be newest.

## 3. Where the counted phrase comes from

Measured on research/hunt/*.md at 02:50 ET: 42 tables carry an Overall column; 13 of them have a counted column (69 rows); 29 have none. The phrase is read, never written, in this order, from the idea's origin row:

1. **Counted column.** The first header (lower-cased) containing `counted`, `hand-read`, `hand-counted` or `demand`. Today that matches "Counted need (hand-read, links in H39-raw)", "Counted buyer", "Displaced buyer (counted, dated)", "Asks for a tool (12 months, hand-counted)", "Demand, hand-read (links)", "Tool asks, 12 months, 6 sites (hand-read)". In the cell:
   - the first `**bold**` span, if it <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> a digit (8 of 69 rows open this way, e.g. H31 "43 disputed damage claims in a year");
   - else the text up to the first `; `, `. ` or `, e.g`; then, if a `(` is left open, cut before it;
   - links reduced to their text, `**` removed.
2. **Need column with words.** A header that is `need` or starts `need (`: the text after the letter, outer brackets removed, if it holds a digit (H6 "B (993 reviews on the top 4 gigs)" gives "993 reviews on the top 4 gigs").
3. **Neither, or no digit** ("Not counted: the <span title="The App Store results a buyer sees for a search phrase. The top 10 is the first ten, dated the day we read them.">shelf</span> settles it", "Thin", "none counted"): the line reads "No counted need in the note." in muted text. That is a true statement and it is useful: an idea at the top with no count is a finding.

Length: whole up to 110 characters; past that, cut at the last space before 110 and add "…". On today's cells, 38 of the 54 with a digit fit whole.

What it gives today (top 5 from Odalys's `best_ideas`, 02:40 ET; letters as `hunt.py` read them, copied here for the spec only):


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. Where the counted phrase comes from, scrolls sideways" style="--tw:802px" markdown="1">

| Concept (lane) | Phrase by the rule | Tier |
|---|---|---|
| Surround and Atmos layout planner (H39) | r/hometheater, titles with "placement", 12 months: 530 titles | 1, bold |
| Ledger, TV-first (H21) | Trakt 204 likes (H19) | 1, clause |
| Home machine cycle listener (H41) | r/hvacadvice, "short cycling" in the title, 2025-10-23 to 2026-10-23: 205 titles, about 192 distinct | 1, bold, 105 characters |
| Claim matcher for rental cars (H31) | 43 disputed damage claims in a year | 1, bold |
| iPad print-interior typesetter (H6) | No counted need in the note. | 3 |

</div>


"Trakt 204 likes" is weak, and the rule shows it as weak. That is the point of reading, not writing.

Code home: the phrase is a cell of the row, so it belongs in `hunt.overall_records` as a `counted` key next to `concept` and `lane` (Odalys's file). When `tools/gradebook.py` (board H68) lands, it can own the same rule; one rule, one place.

Request to the graders (Ines decides; not a blocker): open the counted cell with the count in bold. Tier 1 then picks the grader's own phrase every time.

## 4. Ties, grouping, short and empty lists

- **Tie at the cut.** If rows after the fifth share the fifth row's letter and grade count, one line after the list: "Also C+ with 2 grades: H13, H15, H30." Lane ids only, each a link, in the order `best_ideas` gives. Today slot 5 is H6, tied with H13, H15 and H30; without the line the list picks H6 by lane number and does not say so.
- **Grouping.** `best_ideas` joins rows that share two words with an idea's first row (H39 Atmos and its H51a/H56/H58/H59 re-grades). The "6 grades" count shows it. Odalys's commit lists, for today's top 5, which rows each idea absorbed, so a wrong merge is caught by a reader, not by luck.
- **Fewer than 5 ideas:** show what there is; the lead line says the number ("The 3 best concepts...").
- **No idea with an Overall grade:** no section at all, no heading. Same rule as the empty Write-ups section (b15dc9c): an empty block only pushes the cards down at 390.
- **No grader, no phrase, no title date:** each says so in muted text as above; the row still shows.

## 5. Markup and class names

Keeps Odalys's names; adds three. One `li`:

```html
<li class="best-idea" value="1" data-rank="1" data-grade="B">
  <a class="best-concept" href="/documents/hunt/h39.html"><span class="kind grade" data-grade="B">B</span> Surround and Atmos layout planner in your own room (generator 1; ...)</a>
  <span class="best-need">r/hometheater, titles with "placement", 12 months: 530 titles</span>
  <span class="best-meta">Ines · 2026-10-23 · H39 · 6 grades</span>
</li>
```

- The chip in the list drops "Best" (the heading already says it); on the cards it stays "Best B".
- `best-meta` is not `.pc-src`. `.pc-src` carries `opacity:.75`, which takes muted text below the 5.56:1 that `tools/site_contrast.py` measures on page, and the script cannot see opacity. The lead line under the heading should leave `.pc-src` for the same reason and use `.meta`.
- Missing values: `<span class="best-need muted">No counted need in the note.</span>`.
- Tie line: `<p class="best-tie meta">Also C+ with 2 grades: <a>H13</a>, <a>H15</a>, <a>H30</a>.</p>`
- Heading stays `<h2 id="best-ideas">Best ideas so far</h2>`.

## 6. How it reads

CSS goes in the index page's own `<style>` (next to `card_css()`), not site.css: only `/documents/` uses it, and every other page would pay for the bytes. Budget 600 B raw. Only tokens already in site.css: `--s1`..`--s5`, `--fs-0`, `--fs-1`, `--ink`, `--muted`, `--line`.

```css
.best-ideas{margin:var(--s3) 0 var(--s4);padding-left:1.75em;max-width:var(--measure)}
.best-idea{padding:var(--s2) 0;border-bottom:1px solid var(--line)}
.best-idea::marker{font-weight:700;font-variant-numeric:tabular-nums}
.best-concept{display:block;font-weight:600;line-height:var(--lh-tight);text-decoration:none;color:var(--ink);padding:var(--s1) 0}
.best-concept:hover{text-decoration:underline}
.best-concept .kind{margin-right:var(--s2);vertical-align:1px}
.best-need{display:block;font-size:var(--fs-1);margin-top:var(--s1)}
.best-meta{display:block;font-size:var(--fs-0);color:var(--muted);margin-top:2px}
```

**Budget ruling, signed Maren, 2026-10-24 05:44 ET (board line 132; Odalys's test guard).** The budget is raised, and no row element is dropped: **390 px: section at most 900 px** (heading top to the bottom of the list or the tie line); **1280 px: at most 680 px**. The 700 and ~480 of my first draft (kept below for reference) were estimates, and they were wrong. I assumed 110 px a row and a one-line lead. Measured on the local build, 05:40 ET, headless Chromium, 358 px column (`/tmp` probe on `best_html`, same page as the test): section 823 px at 390 and 621 at 1280; the live page measures the same 823 (Odalys had 861 and 640 at 02:19 on that day's top 5). At 390 the rows are 113 to 179 px: the 110-character concept runs 3 lines with the chip, the phrase up to 3, the meta 1, plus 23 px of padding and rule. The lead is 4 lines (81 px).

Why a phone reader is fine at 900, measured on the live page at 390x844: the section starts at y 484, under the page header and tabs. The first screen shows the heading, the lead and row 1 whole (letter, concept, counted need, grader; it ends at y 794). That is what an Investor on a phone needs above the fold: the top idea, its grade and its evidence. The section height does not change that; the header above it does. The second reason for the old number still holds at 900: the Hunt notes heading lands at y 1339 today and at most about 1416 at the 900 budget, inside the second screen (1688). At 1280x900 the section starts at y 337; rows 1 to 4 sit above the fold (they end at 846), row 5 does not. All five above the fold would need 563 px or less, which today's rows reach only with both cuts below; I do not take them now.

If the guard trips, the fix is a cut, not a new number, in this order: (1) the lead becomes one sentence, keeping "current grade, never its best ever" (row 16's rule); (2) the concept drops its parentheticals in this list and <span title="A measured fact that holds a grade below a letter, however good the rest is.">caps</span> at 80 characters (the lane page keeps the full name). Measured together on today's rows: 823 to 725 at 390, 621 to 563 at 1280. The counted phrase and the meta line never go: they are the evidence and who said so.

**Second budget ruling, signed Maren, 2026-10-24 (board line 263; Idris 13956cc2).** The budget stays at 900 and 680. One row element is cut, on one kind of row: when the idea's current row is a <span title="Our written method for finding and grading ideas, revised for issue #41.">method-v2</span> row (it has a <span title="Can a buyer find it? Yes if the phrase is a store search suggestion or a top-10 app under it has over 100 ratings.">Pull</span> cell), the muted line "No counted need in the note." is left out. Reason: v2 has no counted-need column; Pull took its place. Under v1 an empty count at the top was a finding (section 3). Under v2 the method never asked for one, so the line reads as a gap that is not there, and it cost 27 px a row (23 px line plus 4 px margin). A v2 row that does carry a counted phrase from its origin row keeps it, and v1 rows keep the muted line. Measured on the local build, headless Chromium, the same page as the test: 918 px at 390 before, three 172 px rows (concept 3 lines, muted line, meta with Why on 3 lines); 835 px after, those rows 145 px. At 1280: 563 before, 481 after. No new colour, font, class or asset; the change removes markup only. Not taken: showing the Pull cell in that slot. Today's cells run 60 to 200 characters, so they would add height, and that needs its own spec and <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> look.

For reference, my original estimate (superseded): 390, about 110 px a row, 5 rows about 560 px, with heading and lead about 640, budget 700 so the first hunt card's title shows by the second screen; 1280, 1008 px column, list at 70ch, about 80 px a row, section about 480, all of it above the fold at 900. Nothing scrolls sideways at either width; long words wrap (`overflow-wrap:anywhere` is not needed: the longest token today is "r/hometheater").

Dark mode: nothing new; every colour is a token that already flips.

## 7. Tests Odalys adds (with her row test at 390 and 1280)

1. Top row's letter equals the first row of `hunt.py`'s own ranking on the same notes (fixture and live).
2. Each tier of section 3 on a fixture row, including an open bracket and a 140-character cell.
3. Tie line appears on a fixture with a tie at slot 5 and not without one.
4. No section when no note has an Overall grade.
5. Section height ≤ 900 px at 390 and ≤ 680 px at 1280 (ruling in section 6), and no element wider than the column; `tools/site_contrast.py` 0 failing.

## 8. Creative approval (Commandment 51)

- `creative/approved.md` does not exist yet. The site's current look is the v2/v3 proposal on #29 (Investor deadline 2026-10-24 20:00 ET). So "inside the approved guide" means, today: inside the styles already on the live site and on #29, with no new decision.
- This spec adds no colour, no type size, no spacing value and no image. It reuses `.kind`, `.meta`, `.muted`, the scale tokens and the line rule. No C51 question is needed for it.
- **Not in this spec, and it needs C51:** colouring the grade chip by letter band (for example green from B+ up, amber B to C+, grey below). Colour that means "good idea" is a new decision. Until the Investors approve one, the chip stays neutral (board P3 chip line). If the company wants it, I draw two or three options as shots for the next report's questions.
{% endraw %}

</div>
