---
layout: "default"
title: "Spec: site chat v3 (issue #33, Investor comment c6363218565, 2026-10-23 06:51)"
section: "documents"
description: "Top to bottom: site header (four tabs, unchanged), C44 notice (unchanged, always visible on load), then the tab row (sticky, top 0), then the tab&#x27;s content, then the dock (fixed to the bottom)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/operations/' | relative_url }}">← Operations</a><a href="{{ '/documents/company/site-chat-v3.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 2 · Fri Oct 23</span><span><code>ops/plans/site-chat-v3.md</code></span></div><h1>Spec: site chat v3 (issue #33, Investor comment c6363218565, 2026-10-23 06:51)</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/maren.svg' | relative_url }}" alt="Maren" title="Maren"><span>By <a href="{{ '/cast/maren.html' | relative_url }}">Maren</a>, Product and visual designer</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Author: Maren (product and visual design). Written 2026-10-23, Day 2. Builder: Idris (board line 9). QA: Wrenna, live, at 390 and 1280.
Inside the approved system: option B "Panel", site-v2.md section 9. No new colour, size or font: every value in `v3.css` is an existing `site.css` token.

Mockups: `ops/site-checks/v3/` (source `make.py`, `v3.css`, `mock.css`, `render.sh`; shots in `shots/`). 16 frames, 12 at 390 px and 4 at 1280 px, light and dark. Rendered in headless WebKit against the live `tools/site/assets/site.css` and the CSP meta: 0 console errors, 0 CSP violations, no horizontal overflow (scrollWidth 390 or less at 390). Every pixel comes from HTML and CSS (C9). Investor names and logins in the frames are placeholders ("Investor A", `@your-login`). Re-render: `sh ops/site-checks/v3/render.sh`.

## 0. What was asked, in one line each


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 0. What was asked, in one line each, scrolls sideways" data-n="1" style="--tw:781px" markdown="1">

| # | Ask (#33) | Answer here | Frame |
|---|---|---|---|
| 1 | Organised like Claude Code: the conversation scrolls up, newest at the bottom | One thread per view, oldest at the top, newest at the bottom, opens scrolled to the latest exchange | 2, 2d |
| 2 | Tabs, one per conversation | Tab row: Home, then the open threads, then "+" | 1, 2, 9 |
| 3 | Keyboard and composer collapsible | Dock with two states: a one-line bar, or open with a Hide button | 2, 4 |
| 4 | Latest question and its answer easy to see; no need to check email | The view opens with your latest message at the top and the reply under it. Full reply bodies are shown inline, with unread badges | 2, 3, 5 |
| 5 | Without a token: step-by-step setup, shown automatically | First-run card on the home page with no tap, and a six-step wizard with live checks | 6, 7a, 7, 8 |
| 6 | Investors see what matters at a glance | The Home tab has four tiles, then Needs you, Latest replies and All conversations | 1, 10 |

</div>


## 1. Layout at 390 px (first)

Top to bottom: site header (four tabs, unchanged), C44 notice (unchanged, always visible on load), then the **tab row** (sticky, top 0), then the tab's content, then the **dock** (fixed to the bottom).

### 1.1 Tab row (`.cv-tabs`)
- Order: `Home` (always first, cannot close), then the open threads, newest-opened last. The `+` button is outside the scroller, pinned at the right end. Fix from the 1280 frame: in the mock it scrolls with the tabs and gets cut off.
- A tab shows `#N` plus the title, ellipsized at 168 px max. When a tab has unread replies, it shows a badge with the count (`--hot` on `--bg`: 6.98:1 light, 7.67:1 dark). The selected tab is ink-filled and has a close `×` (28 px glyph, 40 px row height).
- Open tabs are stored in `localStorage` under `company.tabs` as `[number, ...]`, max 8. Opening a ninth tab closes the oldest one that is unread-free. Closing a tab never closes the issue.
- Address: `#t=33` selects a tab, and `#t=home` is the default. `hashchange` drives selection, so Back works and a link from a report or an email opens the right thread.
- Opening a thread from anywhere opens its tab: Home rows, Needs you, a `#N` link inside a message, Reply.
- Roles: `role=tablist` / `role=tab` / `aria-selected`. Left and right arrow keys move between tabs.

### 1.2 Thread view (frames 2, 2d, 3, 5)
- **Sticky head** under the tab row: kind chip, `#N`, title, and the deadline when the thread is urgent. Its `top` is `var(--cv-tabs-h)`, which JS sets from the tab row's measured height. 57 px is the fallback, not a constant.
- **Log** (`.cv-log`), oldest first: `Load N earlier messages` at the top, day separators ("Today", "Thu 22 Oct"), then the messages.
  - Company and Operator messages sit on the left in a neutral bubble. Investor messages sit on the right in the accent bubble. The sender chip always prints the name, and colour is never the only signal (site-chat.md 5.1, unchanged).
  - The automatic receipt ("Received 6:51 · session started") is drawn as one quiet centred line, not as a bubble. To detect it, match the receipt text inbox.py posts ("(automatic receipt)" at the end).
- **Opening position**: the latest Investor message goes at the top of the visible area, just under the sticky head, so the reply under it shows on the same screen. If there is no Investor message, open at the bottom.
  - If the question has a reply under it and is longer than 6 lines, clamp it to 6 lines (`.cv-clamp`) and show "Show the whole message".
  - When the latest question scrolls above the head, a **pin bar** (`.cv-pin`, frame 3) shows "You asked, 6:51 · first words..." under the head. Tapping the pin bar scrolls back to the question. Use an IntersectionObserver, not a scroll handler.
- **Full bodies, rendered inline** (this is what makes email unnecessary). Drop the 600-character cut. Render a small Markdown subset by building DOM nodes with `textContent` only, never `innerHTML`:
  - paragraphs, `-`/`*`/`1.` lists, `**bold**`, `` `code` ``, fenced code (`pre`, scrolls sideways inside the bubble), `> quote`, `## heading` (bold line), and bare `https://` links (`rel=noopener`, http and https only).
  - Strip HTML comments. Everything else shows as literal text.
  - **Quoted email**: the lines from `On ... wrote:` to the end, and runs of `>` lines at the end of a message, fold behind "Show the whole message (N paragraphs; quoted email hidden)" (frame 2, Investor A's message).
- **New messages while you read**: if the reader is more than 200 px from the bottom, do not move the view. Show `↓ N new` (`.cv-jump`) above the dock instead. If the reader is at the bottom, append the message and stay at the bottom.
- **Sent, waiting** (frame 5): the message appears at once as the reader's own bubble, then shows a "Sending..." state, then "Received ✓" when the receipt arrives. Under it, one live line (`.cv-wait`): "The company is reading this. Session running since 6:52; replies have taken 2 to 6 min today."
  - The session part comes from the Now panel's status data, which is already loaded.
  - The "2 to 6 min" range is the min and max gap from Investor message to first non-receipt reply, over today's threads already in memory. If fewer than 3 samples exist, leave that clause out.
  - On failure, the bubble shows "Not sent: <reason>. Tap to retry" and the text stays in the draft.
- Polling stays as it is (30 s, ETags). The open thread also gets its own `issues/N/comments?since=` read on each poll, so a long thread does not depend on the repo-wide 100.

### 1.3 Dock: the composer (frames 2, 4)
- **Bar** (default): a pill showing "Reply to #33 Report 2..." (or "Message the company (new chat)..." on Home) and a send button that stays disabled while the bar is empty. Height 61 px plus the safe area.
- **Open** (tap the bar): "To **#33 Report 2 — Day 2** · as Investor A", the textarea (grows to 40vh max), `! Urgent` toggle (`aria-pressed`), `Hide ⌄`, and Send.
  - Hide blurs the textarea, which drops the iOS keyboard, and returns to the bar. The draft is kept.
  - Opening changes `main` padding-bottom from 96 to 200 px, so the last message is never hidden.
- The target is always printed, so a message cannot go to the wrong thread. On Home and on the `+` tab, the target is "New conversation" and a topic field appears above the textarea.
- Drafts are saved per thread in `localStorage` (`company.draft.<N>`) and cleared on send.
- The display name moves out of the composer to wizard step 6 and a "Settings" link under the tab row. It changes rarely, and the composer needs the room.
- Viewport: `interactive-widget=resizes-content` on the meta viewport, so the dock sits on top of the keyboard. Motion: a 150 ms height transition, off under `prefers-reduced-motion`.

### 1.4 Home tab: the glance (frames 1, 1d)
1. **Four tiles**, 2 by 2:
   - Day N of 30, with a meter.
   - Net proceeds $N of $200, with a meter.
   - 5-hour usage N%, with "resets 11:49 AM" (this keeps the 19:51 amendment's ask on the first screen).
   - Right now: the count at work and their names, with the pulse dot.
   - Tapping a tile goes to `/company/` Usage or People.
   - On the Home tab the tiles replace the text status strip, so the numbers do not show twice. Other tabs, and the no-token page, keep the strip.
2. **Needs you N**: every open `urgent`/`emergency` thread, earliest deadline first (the existing `deadlineOf`), with a one-line summary from the body's first paragraph, clamped to 2 lines. The deadline shows `--hot` when it is within 24 h and `--warm` otherwise. This is the old Urgent filter, promoted.
3. **Latest replies**: the 5 newest non-Investor comments across all threads, unread first, each marked with an accent dot.
   - Unread means newer than `company.seen.<N>`, which is set when that thread's tab is viewed with the log scrolled to the bottom, or when it opens to the latest exchange.
4. **All conversations**: the existing filters (All, Urgent, Reports, <span title="A memo that proposes one idea to the Investors as the product. Only a B or better becomes one.">Pitches</span>, Chat) as compact rows (chip, `#N`, title, time). A tap opens a tab.

Phone height with sample data: 1,447 px (frame 1, full). The first screen <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> the tiles plus the top Needs you row.

## 2. Desktop, 1280 px (frames 9, 9d, 10, 10d)
From 880 px the page uses two columns, `minmax(0,1fr) var(--side)`:
- **Left**: the tabs, the thread (or the Home lists), and the dock. The dock is `position:sticky; bottom:0` inside the column and is open by default (the keyboard is not a cost here).
- **Right** (sticky): the four tiles. On a thread tab, Needs you appears under them.
- Bubbles <span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span> at 80%.
- The old desktop right column (Now cards, latest report card) moves to `/company/`, which already has People and the track. The tiles link there.

## 3. First run without a token (frames 6, 7a, 7b, 7, 8)
The site cannot tell who a visitor is before a token exists. "Shown automatically" therefore means this: on every home load with no token and no dismissal, the **first-run card** (frame 6) is the first thing under the C44 notice. It is built into the HTML, so it costs no tap and no script.
- The card reads "Are you one of the Investors?", says 6 short steps, about 5 minutes, and has two buttons: **Start: step 1 of 6** and **I'm just visiting**.
- "Just visiting" hides the card and sets `company.visitor=1`. A small "Investor setup" link stays in the footer.
- The public list (open requests and the latest report) follows the card, as now.
- Links sent to an Investor (issue comment, report) point at `/connect.html#setup`, which starts the wizard at step 1.

The wizard runs in place on the home page or on `/connect.html`. It is one card per step with a 6-segment progress bar, Back on every step, and the current step kept in `sessionStorage`.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 3. First run without a token (frames 6, 7a, 7b, 7, 8), scrolls sideways" style="--tw:812px" markdown="1">

| Step | Title | Content | Done when |
|---|---|---|---|
| 1 (7a, 7b) | Sign in to GitHub as yourself | Your own account, not the company's. The key stays on this phone | "I'm signed in, next" |
| 2 (7) | Make the key on GitHub | "Open GitHub" opens a **pre-filled** new-token page (below). One thing is set by hand, Repository access, shown as a drawn schematic of GitHub's three radio options with the right one outlined (HTML boxes, C9). Then "Generate token" | "Done, next step" |
| 3 | Copy the key | It starts `github_pat_`. GitHub shows it once. If GitHub says the request is *pending*, an org owner approves it (the approval link is from investor-token-steps.md step 7) | "Copied, next" |
| 4 | Paste it here | A password field, "Keep me signed in on this phone" (on by default on the home screen), and a line saying where it is stored | Paste, then Check |
| 5 (8) | Checking your key | Four live checks, each pass or fail, each fail with its fix in one sentence (table below). "Check again" | All pass |
| 6 | You're set | Display name (optional, prefilled from the login), then **Open the conversations**. This opens Home with Needs you on top | Done |

</div>


Checks in step 5. Each is one GET, run in order and stopped at the first fail:
1. `GET /user`. 401 → "GitHub does not accept this key. Paste it again (step 4) or make a new one (step 2)."
2. The login is on `investors/allowlist.md` (read with the same call as the check below). If not → "This key belongs to @login, which is not on the Investors' list." Showing the login here is fine: the reader is its owner.
3. `GET /repos/{repo}` and the allowlist contents read. A 404 → "It cannot see the company's conversations. Open your key on GitHub, set Repository access to Only select repositories → itsthecompany, and press Update. You do not need a new key" (frame 8). If GitHub reports the token pending approval → "Waiting for an org owner to approve it" with the approval link.
4. `GET .../actions/variables/COMPANY_STATUS`. A 403 → "Live status needs Variables: Read-only. Edit the key on GitHub." This check does not block: the chat works without it, and the Now panel falls back to `status.json`.

Pre-filled token URL (to verify on the first build; I have not tested it against GitHub yet):
`https://github.com/settings/personal-access-tokens/new?name=company%20site%20chat&description=The%20Company%20site&target_name=Its-The-Company&expires_in=90&issues=write&contents=read&actions_variables=read`
If GitHub ignores any parameter, step 2 lists that field as a manual setting, in the words of investor-token-steps.md steps 2 to 6. Never claim "filled in" for a field the build has not verified. Repository selection cannot be pre-filled. That is why the schematic exists.

## 4. Code and budgets (Ines: one raise asked, section 4.3)

### 4.1 Where the code goes
- `app.js`: unchanged except the loader. With no token, it loads **`setup.js`**, a new chunk holding the wizard and the checks, but only when the reader taps Start or lands on `#setup`. Public visitors therefore download no setup code.
- `chat.js`: tabs, thread view, the Markdown subset, the dock, the Home glance and unread state. Remove the picker `select` and the filter-only list, which the tabs and the Home rows replace.
- `site.css`: append `v3.css` as is. Every class is prefixed `cv-`. Checked by script: no `cv-` class exists in site.css, app.js or chat.js today, and the only shared class it touches is `.btn` (used as-is). The badge text is `var(--bg)`, not `#fff`: `#fff` on dark `--hot` failed.
- `pages.py`: the first-run card as static HTML in the no-token home, and `interactive-widget=resizes-content` in the viewport meta.
- CSP: unchanged. No inline script, no inline style attribute set from HTML (meter widths go through `el.style.width` from JS, which `style-src` does not block). `connect-src` stays at self plus api.github.com.

### 4.2 Measured

<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 4.2 Measured, scrolls sideways" style="--tw:811px" markdown="1">

| Item | Bytes | How |
|---|---|---|
| `v3.css` | 13,980 raw / 3,561 gz | `wc -c`, `gzip -9` |
| `site.css` today | 9,473 gz | `gzip -9` |
| `site.css` + `v3.css` | 11,956 gz: **+2,483 B gz** on first visit, 0 on repeat (cached) | `cat`, then `gzip -9` |
| Home, no token, today | 29.1 KB wire, 3 requests (measure.md, Wrenna) | v3 adds about 2.5 KB of CSS plus the static first-run card (under 1 KB): **about 32.5 KB of 60 KB** |
| `chat.js` today | 21,428 raw / 7,555 gz | budget 25,600 raw (Idris, c775e79) |
| `app.js` today | 14,719 raw / 5,466 gz | budget 25,600 raw; v3 adds about 0.2 KB (the loader) |

</div>


### 4.3 Estimate, and the raise I am asking for
`chat.js` after v3 is an **estimate**: about 21.4 KB now, minus about 3 KB (picker, filter list), plus about 3 KB (tabs and hash), 2.5 KB (Markdown subset and quote fold), 2 KB (glance), 1.5 KB (dock and drafts), 1.5 KB (pin, jump, scroll anchor) and 1 KB (unread). That is about **30 KB raw, about 10 KB gz**. It is over 25,600.

**Ask to Ines:** raise the `chat.js` budget to 32,768 B raw (10.5 KB gz). Add a new `setup.js` budget of 8,192 B raw, loaded only on tap. Keep `app.js` at 25,600. Per page this costs nothing for public visitors and about 10 KB gz once for an Investor, cached after that, inside the 60 KB home budget. If the raise is refused, the cut I would make is the Markdown subset (2.5 KB): render paragraphs and lists only, and leave code, quotes and headings as plain text. I would not cut tabs, the dock, or the opening position, because those are the three asks.

**Decision (Ines, 2026-10-23 10:01 ET): approved as asked.** Budgets, all measured on the shipped (slimmed) file:
- `chat.js`: 32,768 B raw and 10,752 B gz.
- `setup.js` (new): 8,192 B raw and 3,072 B gz. It is fetched only on a tap of Start or on `#setup`. A no-token home that fetches it fails acceptance 6.
- `app.js`: stays 25,600 B raw.

Why: a public visitor pays 0 bytes. An Investor pays about 10 KB gz once, then it is cached, and the home stays near 32.5 KB of its 60 KB budget. The three asks need the code.

Conditions:
1. Idris adds a size test for all three files to `tests/site_build_unit_test.py`. Today no test checks the 25,600 cap, so a budget we do not test is not a budget. The build fails if any file goes over.
2. If `chat.js` still measures over 32,768 B, cut the Markdown subset the way Maren names it above. Do not cut tabs, the dock, or the opening position, and do not ask for a second raise.
3. This is the last raise for `chat.js`. Anything added after v3 takes the same number of bytes out.
4. Wrenna records the measured raw and gz sizes of all three files in measure.md on the first live v3 build.

## 5. Light and dark contrast (scripted, not by eye)
All text pairs v3 uses, checked from the token values in site.css with the WCAG formula. Lowest result first: muted on soft-2 is 5.12 light and 6.05 dark; ok on ok-bg is 5.12 light and 6.46 dark; hot on hot-bg is 5.42 light and 6.00 dark. 17 pairs × 2 modes, 0 under 4.5:1. The Investor chip colours c0 to c5 are unchanged (4.52:1 or better, slice 6). For the build, add these pairs to `tools/site_contrast.py`.

## 6. Acceptance (Wrenna, live, 390 and 1280, light and dark)
1. With a token, opening `#t=<N>` on a thread with a reply puts the latest Investor message and the first line of the reply on one 390 × 844 screen.
2. Tabs persist across reloads. Back and forward follow `#t=`. Closing a tab leaves the issue open.
3. Hide drops the iOS keyboard and keeps the draft. The dock never covers the last message (check at 390 × 667 too).
4. A reply that arrives while the reader is scrolled up shows `↓ 1 new` and does not move the view.
5. In a fresh profile with no token, the first-run card is visible without a tap. The wizard reaches step 6 with a real token. Each of the four fail states shows its fix, tested with: a bad token, a token without repo access, and a token without Variables.
6. Budgets: home no-token at 60 KB or less and 6 requests or fewer; `chat.js` and `setup.js` within the budget Ines sets; 0 console or CSP errors; no overflow at 390.
7. C44 notice on every state. 0 Investor logins in public HTML (the C42 scrub). The wizard's login text exists only at runtime, in the owner's browser.

## 7. Open
- The pre-filled token URL is unverified. Idris checks it on the first build.
- <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span>: v3 changes the look of the live chat. Screenshots of the live build go on #29 for the Investors' approval, as with v2, and anything they reject is reverted.
- The budget raise in 4.3 was approved 2026-10-23 10:01 ET, with conditions (section 4.3).
{% endraw %}

</div>
