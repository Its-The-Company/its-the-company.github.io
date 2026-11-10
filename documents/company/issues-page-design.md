---
layout: "default"
title: "Issues: compact list, a page per issue, timing by drag (T-3581 design)"
section: "documents"
description: "Inside the approved look (creative/approved.md entry 1): site.css tokens, .tag, .chip, .nb-r/.nb-b, the chat thread (.cv-msg, .cv-body) and composer (.cv-bar, .cv-send), .cv-tool buttons. No new colours. New rules use\u2026"
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/issues-page-design.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 18 · Sun Nov 8</span><span><code>ops/plans/issues-page-design.md</code></span></div><h1>Issues: compact list, a page per issue, timing by drag (T-3581 design)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Maren, 2026-11-08. For ops/plans/issues-page-redesign.md (an Investor, Plan mode #41 c6723293041, answers c6723335442).
Builds: T-3582 (issue page, compact list) and T-3583 (drag, Now/Later, tap the date), Odalys.
Frames: ops/site-checks/t3581/shots/{list,issue,drag,date,states,keys}-{390,1280}-{light,dark}.png (24 shots),
drawn by ops/site-checks/t3581/draw.py (HTML and CSS only, no script, no generated image). Its contrast check passes
on every text node in all 24 (4.5:1, or 3:1 for large text), with no horizontal overflow. All samples; the Investor is
"Investor A".

Inside the approved look (creative/approved.md entry 1): site.css tokens, `.tag`, `.chip`, `.nb-r`/`.nb-b`, the chat
thread (`.cv-msg`, `.cv-body`) and composer (`.cv-bar`, `.cv-send`), `.cv-tool` buttons. No new colours. New rules use
the `iq-` prefix (grepped: no collision in site.css, the js or the site Python). The NEW block in
ops/site-checks/t3581/iq.css is the CSS to start from.

Reference: GitHub Mobile (docs.github.com/en/get-started/using-github/github-mobile, fetched 2026-11-08, saved in
research/inbound/github-mobile/). The page says only what the app does. The row pattern below is the one GitHub uses
on its public issue lists: an unread dot, the title, one quiet line, labels and #number, and the reply count. The
issue opens to the title, the body, the timeline and a reply bar at the bottom.

## 1. The list row (frame `list`)
- Grid: `14px | 1fr | auto`. Min height 64 px, padding 12/8/12/4.
- Column 1 is the unread dot: 8 px, `--accent`. It shows while the issue counts on the badge (IssueQ `badged`).
- Column 2 is a link to the issue page, with three lines:
  - The title: `--fs-1`, 700, up to 2 lines.
  - The short line: the card's site `Ask:` line, else the body's first non-empty line, with Markdown stripped (needs.js `clean`). `--fs-0`, muted, one line, ellipsis.
  - The meta line: the kind tag (`.tag.ny-tag-decide` / `ny-tag-ask`), New (`.tag.iq-new`: blue-bg/blue-fg, when unread and not past due), `#n` in mono, and the reply count if above 0.
- Column 3 is the date button: a pill 32 px high, with a 44 px hit area from a `::after` inset. It is its own button, not inside the link.
- Date labels:
  - In Now: `2 h late` or `No date` (red: `--hot-bg`/`--hot`), or `Due 18:00` when due today.
  - In Later: `Mon 9 Nov`. The time shows only when it is not 11:59 PM (`Thu 12 Nov, 14:00`).
- Desktop (900 px and up) puts the two queues side by side, Now \| Later. Phones stack Now, then Later.
- Later's groups are calendar days in Eastern time, Monday to Sunday weeks:
  - Tomorrow
  - This week: from the day after tomorrow to Sunday
  - Next week
  - Later: from the Monday after next week
- Each group header shows its date span. A group with no rows is hidden at rest and drawn only during a drag, as a drop target.
- Order is soonest first, as today.
- **Asks with no issue of their own (T-3754, an Investor #41 c6732384794: "All issues should either be Now or Later").**
  There is no "Other asks" group. A tamper entry, or an ops/needs-you.tsv row with `-` for its numbers, is a row of
  the same list (`li.iq-rest`). It keeps the words its old row had, and a tamper entry keeps its diff and Approve box
  (assets/tamper.js), so the page shows no more than before. Same rule as an issue row: no deadline means Now. Nothing
  can give it one (no issue holds a `Deadline:` line, and IssueQ keys its state by issue number), so it is always in
  Now, first, with no date pill, no drag and no page of its own. Now's count includes it. Without a token it sits in
  the build's one list, first among its kind.
- The header badge keeps T-3417's rules: red is past due or no deadline, blue is the other unread issues.

## 2. The issue page (frame `issue`)
- The route is my proposal; Odalys decides. One static page reads the number from the URL, e.g. `/issues/view/#212`, because issues opened after the build need a page too. Home's `/issues/#iN` links should go there.
- Order on a phone: back link, title with `#n`, the meta line (tags, opener, reply count, On GitHub), the card, Due and Move to, the thread, the reply box.
- On desktop, Due and Move to sit in a 300 px side column (sticky) and the rest is the main column.
- The card is the Ask on `--accent-soft` with an `--accent` border, then its options as `.cv-tool` buttons at least 44 px high (the needs.js parser, unchanged).
- The thread shows every message, oldest first, in the chat bubbles. Investor messages use the `.cv-inv` accent bubble. Day separators use `.cv-day`.
- The reply box is chat.js's dock with T-3357's focus fix, pinned to the bottom on a phone. The frames draw it at rest, at the end.
- Opening the page marks the issue read: IssueQ `act(..., 'read')` once the thread has loaded. Mark Read and Mark Unread are gone.
- T-3418 (fold long threads) is separate. The plan asks for the whole thread, so nothing folds here.

## 3. Now and Later, drag (frames `drag`, `date`)
Drops write only through IssueQ `act(st, n, o, 'delay', v, now)`. That keeps the badge rules and the saved state in step: numbers and times only.


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 3. Now and Later, drag (frames drag, date), scrolls sideways" style="--tw:638px" markdown="1">

| Drop | Deadline set (Eastern) |
|---|---|
| Into Now, anywhere | `now` (ms at the drop). The row shows `Due now`, then `n min late`. It stays in Now until answered. |
| On a Later group header, or an empty group | The group's first day, at 11:59 PM. Tomorrow is tomorrow. This week is the day after tomorrow. Next week is next Monday. Later is the Monday after. The earliest day is the safe one; tap the date to push it out. |
| Between two Later rows | The midpoint of their deadlines, to the minute. First in a group: the row below minus 1 min, but not before the group's first day 12:00 AM. Last: the row above plus 1 min, but not past the group's last day 11:59 PM. |
| From Now into Later | The same Later rules. |

</div>


- **Constraint, named:** "tomorrow at end of day" is always more than 24 h away when it is set, so it lands in Later. At 11:59 PM tonight it crosses into Now (the existing 24 h rule) and counts again. That is the rule working, not a bug. I did not add a new rule to stop it.

**Desktop, pointer (mouse or pen):**
- Uses Pointer Events, not HTML5 drag and drop: the HTML5 kind cannot draw the <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lift</span> and does not run on iOS.
- A press on the row, then 4 px of movement, starts the drag. A click without movement opens the issue.
- The click after a drag is swallowed.
- The grip (6 dots, muted) replaces the unread dot on hover and while dragging.

**Phone, touch:**
- Touch and hold for 450 ms with less than 10 px of movement, then the row lifts.
- Any move of 10 px or more before 450 ms is a scroll, and nothing lifts.
- From 150 ms the row takes the pressed background (`--soft`), so the <span title="What keeps an idea below the top: the cap that applies to it now.">hold</span> is visible.
- Rows carry `touch-action: pan-y`, `-webkit-touch-callout: none` and `user-select: none`. Prevent `contextmenu` on rows. Otherwise iOS opens the link preview and the text selection at about 500 ms.
- Once lifted, a non-passive `touchmove` calls `preventDefault`.

**During a drag:**
- The row lifts: `scale(1.02)`, the shadow, a 1 px `--accent` border, the grip showing.
- Its place closes up.
- A dashed slot (64 px, `--accent-soft`, a 2 px dashed `--accent` border) opens where it would land.
- The target group's header turns `--accent-soft`/`--blue-fg` and says what a drop sets ("a drop here sets 23:59").
- Over Now, the whole queue is outlined and the slot reads "Drop: due now (time)".
- A dark status line at the top says "Moving #n. Let go on a day, or over Now to make it due now. Esc cancels." (`role=status`).
- The page auto-scrolls within 64 px of the top or bottom edge, at up to 12 px a frame, faster nearer the edge.

**Cancel and undo:**
- Esc, a drop outside both queues, or `pointercancel` puts the row back.
- After every move, an Undo line shows for 6 s or until the next move: "#201 moved to Tomorrow, Mon 9 Nov. Undo" (`role=status`).

**Motion:**
- The lift takes 150 ms ease-out. Siblings shift by `transform` over 150 ms. The drop settles in 200 ms.
- With `prefers-reduced-motion: reduce`: no scale, no sliding, instant moves. The slot and outline stay.

**Tap the date (frame `date`):**
- The date button opens a sheet from the bottom on a phone, or a 340 px popover under the date on desktop.
- The sheet has the title "When is #n due?", the issue title, and quick buttons: Now, Tomorrow, the current day, and next Monday.
- It has two native inputs, `type=date` and `type=time`, labelled Day and Time, Eastern. An empty time means 11:59 PM.
- Cancel and Save. Save calls the same `act`.
- Focus is trapped while it is open, and Esc closes it.
- This is not a "Set Deadline" button. It is the date itself, made tappable.

## 4. The non-drag move (frame `keys`)
- On the issue page, "Move to" is a group of `.cv-tool` buttons, each 44 px high: Now, Tomorrow, This week, Next week, Later, Pick a date. Pick a date opens the date sheet.
- The current queue or group shows `aria-pressed=true`.
- Each button sets the same deadline as a drop on that group header.
- Tab or arrow keys move between the buttons, and Space or Enter moves the issue. Focus stays on the button.
- The status line reads "#212 moved to Later, Mon 9 Nov. Undo", so VoiceOver speaks the result.
- On the list, each date button's label is "Deadline Mon 9 Nov, change". The date sheet is the list's keyboard path.
- Dragging rows by keyboard is not in this pass. The Move buttons cover it with less to learn.

## 5. States Odalys needs (frame `states`)
- **Empty Now:** a dashed box: "Nothing needs you now." and "New issues and anything due within a day land here." An ask with no issue of its own is a row, so Now is not empty while one waits (T-3754).
- **Empty Later:** the heading and count 0, with no groups.
- **No token:** rows read only. There is no drag, the date is a dashed static pill, there is no Move to, and the note reads "Read only. Add your token to reply and move issues."
- **Read failed:** an amber line: "GitHub did not answer at 14:02. These rows are from the 13:40 build." with a Try again button.
- **Loading:** the build's rows show at once, as today. There is no skeleton.
- **Issue page, closed issue:** the meta line shows Closed, and there is no Move to. The reply box stays, because a follow-up reopens the issue, as needs.js does now.
- **Unread:** shown by the dot and the New tag. They go when the page is opened.

## 6. Sizes and the byte budget (a constraint, named)
- Minimum widths: the row is 320 px, the side column 300 px, and the two-column board starts at 900 px.
- All tap targets are 44 px or more. The date pill has 32 px of paint and a 44 px hit area.
- **The budget constraint:** needs.js ships 37,577 B raw and 13,438 B gzip (measured 2026-11-08 with `site_build.slim_js`). Its ceiling is 38,400 / 13,824 (tests/site_needs_test.py), which leaves 823 B raw.
- **So the page and the drag cannot fit inside needs.js.** The build needs a split:
  - a small shared module: the option parser and Markdown
  - the list and drag code, on /issues/ only
  - the issue page code, on its own page
- Each file needs its own ceiling. That is a company decision on sizes, as in 1f48cc35, for Ines to set before T-3582 lands, not a reason to raise needs.js again.
- The NEW CSS block is 8,544 B raw, measured, including mock-only rules (the float position and the frame-6 focus ring). It goes in needs.css or site.css within their budgets.

## Departures, T-3721
Maren, 2026-11-09. Odalys's build (397c59924) named three departures. Read against the shots in
ops/site-checks/t3583/ and the code in tools/site/assets/.

1. **Accepted: Pick a date on the issue page opens inline Day and Time, not the sheet.** issue.js is 5,944 B of a
   6,144 B gzip ceiling, so 200 B are left and the sheet does not fit. The sheet's quick buttons are already the Move to
   row above it. The fields are the native date and time inputs with the labels Day and Time, Eastern; an empty time
   means 11:59 PM; Save calls the same `act`. issue-390 shows them at 390 px with no overflow. Section 4's "opens the date
   sheet" now means these fields on the issue page.
2. **Accepted, with one change: the slot, not the group header, says what a drop sets.** The slot is the right
   place, because a drop between two rows sets their midpoint, not 11:59 PM, so a sentence on the header would be wrong
   for most drops. But the lifted row sits on top of the slot: in drag-390 and drag-1280 the slot's words cannot be
   read. The change: the status line at the top, which nothing covers, also says what a drop sets, for example
   "Moving #302. Drop: Thu 12 Nov, 23:59. Esc cancels." It is `role=status`, so it changes only when the drop value
   changes, not on every pointer move. needs.js has 825 B gzip left (6,855 of 7,680), and this needs about 60 B.
   The header keeps its tint.
3. **Accepted: a drop into Later always lands more than 24 hours out.** The floor is now + 24 h + 1 min. My section 3
   sentence, that tomorrow at end of day is always more than 24 h away, was wrong. It fails after 11:59 PM Eastern and on
   the spring-forward day, when tomorrow 11:59 PM can be as little as 23 h 29 min away (from Sat 13 Mar 2027, 11:30 PM). A
   row dropped in Later would then show up in Now at once. The floor stops that. In that edge a drop on Tomorrow lands
   on the next day, and the Undo line names the day it actually went to, so nothing is hidden. Read section 3's
   constraint with this floor.
{% endraw %}

</div>
