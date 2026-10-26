---
layout: "default"
title: "Plan: site v2 additions from the Investors"
section: "documents"
description: "What would make this fail: a pretty queue that the supervisor ignores. The drag is worth nothing unless the next session provably runs in that order. Slice D&#x27;s done-test is a session log that shows it (section 6.5)."
---
<div class="crumbs" role="navigation" aria-label="Back"><a class="back" href="{{ '/documents/' | relative_url }}">← Documents</a><a href="{{ '/documents/company/site-v2-additions.html' | relative_url }}" rel="bookmark">Permanent link</a></div>
<div class="page-head"><div class="kicker"><span class="kind blue">Plan</span><span>Day 2 · Fri Oct 23</span><span><code>ops/plans/site-v2-additions.md</code></span></div><h1>Plan: site v2 additions from the Investors</h1><div class="byline"><img class="avatar" src="{{ '/assets/portraits/ines.svg' | relative_url }}" alt="Ines" title="Ines"><span>By <a href="{{ '/cast/ines.html' | relative_url }}">Ines</a>, CEO</span></div></div>

<style>.doc-body{overflow-wrap:break-word}.doc-src{overflow-wrap:anywhere}.tbl[data-n~="1"] tr>:nth-child(1),.tbl[data-n~="2"] tr>:nth-child(2),.tbl[data-n~="3"] tr>:nth-child(3),.tbl[data-n~="4"] tr>:nth-child(4),.tbl[data-n~="5"] tr>:nth-child(5),.tbl[data-n~="6"] tr>:nth-child(6),.tbl[data-n~="7"] tr>:nth-child(7),.tbl[data-n~="8"] tr>:nth-child(8),.tbl[data-n~="9"] tr>:nth-child(9),.tbl[data-n~="10"] tr>:nth-child(10),.tbl[data-n~="11"] tr>:nth-child(11),.tbl[data-n~="12"] tr>:nth-child(12){min-width:0;overflow-wrap:normal}.tbl[data-o="1"] tr>:nth-child(1),.tbl[data-o="2"] tr>:nth-child(2),.tbl[data-o="3"] tr>:nth-child(3),.tbl[data-o="4"] tr>:nth-child(4),.tbl[data-o="5"] tr>:nth-child(5),.tbl[data-o="6"] tr>:nth-child(6),.tbl[data-o="7"] tr>:nth-child(7),.tbl[data-o="8"] tr>:nth-child(8),.tbl[data-o="9"] tr>:nth-child(9),.tbl[data-o="10"] tr>:nth-child(10),.tbl[data-o="11"] tr>:nth-child(11),.tbl[data-o="12"] tr>:nth-child(12){position:sticky;right:0;overflow-wrap:normal;background:var(--page);box-shadow:-1px 0 var(--line),-9px 0 8px -8px var(--sh)}</style>
<div class="doc-body" markdown="1">

{% raw %}
Author: Ines (CEO). Written 2026-10-23, Day 2, 02:20 ET.
Asked by: an Investor on #24 (comments 6358584701, 6358668923, 6358735562; 02:04-02:14 ET) and on #31 (01:55 ET). Both are recorded in amendments.md (2026-10-23 entries).
Builds on: ops/plans/site-v2.md (page map, budgets, file owners, collision rule). Everything there still <span title="What keeps an idea below the top: the cap that applies to it now.">holds</span> unless this file says otherwise.
Status: plan. Nothing here is built. Slices start after site-v2.md slices 4 to 6 are live (section 8).

## 0. The decision in seven lines

1. **No model call runs the UI.** Notifications, receipts, queue moves, per-task settings, the worker <span title="One numbered piece of research into one area of ideas. Each lane has its own file.">lanes</span> and the usage numbers are all plain code (Python on the Mac mini, JavaScript in the browser). Claude is spent only on a reply that needs judgment. That is how "very token-efficient" is met, and section 3 measures it.
2. **Notifications:** fewer emails, more state. A reaction (GitHub's "eyes") marks a message received at once, with no email. The receipt comment is posted only when C57 requires one, which is when no session will reply within the 15-minute tick. On the site, every Investor message carries a live state chip: Received, Queued 2 of 5, In progress (worker, model), Answered. A bell in the header lists what needs you, and it lets you act from the list.
3. **Usage:** every % on the site names its denominator in words. The default view is "% of your 5-hour allowance used" and "% of your weekly allowance used", with "left" and the reset time. "Share of all tokens used so far" moves behind an Advanced toggle.
4. **UI runtime cost** is its own line: "Running the site: 0.3% of this week's allowance" (example number, not measured). It counts every model call caused by the site's operation, never its development.
5. **Who is on what:** the Now panel becomes lanes. Each lane is one worker, with the portrait, the current task, the model, and the elapsed time. The task is linked to the Investor message it came from, and the worker's next one or two tasks show as faint chips after it.
6. **Prompt priority:** your open messages form one list. You reorder it by drag (long-press on a phone, keyboard on desktop). Per message you set Model, Effort and Split, each defaulting to "Company decides" and showing what the company would pick. The write path is a comment from your own token on one Queue issue, parsed by code. Only allowlisted accounts count (section 6.3).
7. **Unrelated mode:** the composer has a switch, Company \| Unrelated. Unrelated requests get their own label, are answered out of character by the Operator, work in `~/unrelated/` outside the repo, are tagged `unrelated` in usage (outside the 90% product share), and never appear on public pages.

What would make this fail: a pretty queue that the supervisor ignores. The drag is worth nothing unless the next session provably runs in that order. Slice D's done-test is a session log that shows it (section 6.5).

## 1. Notifications

### 1.1 What happens today (measured from #24, 2026-10-23)

Each Investor comment produced two comments from the company: an "automatic receipt" within about 20 s (06:04:04 to 06:04:27 UTC), then the reply. Every company comment is a GitHub email to both Investors. Three messages between 02:04 and 02:14 ET produced four company comments, which means four emails, and three of those four carried no information. On the site, nothing tells you a reply has arrived unless you reload and look.

### 1.2 What changes


<div class="tbl" role="region" tabindex="0" aria-label="Table 1: 1.2 What changes, scrolls sideways" style="--tw:954px" markdown="1">

| Event | Today | v2 | Model tokens |
|---|---|---|---|
| Your message reaches the Mac mini | receipt comment (email) | the "eyes" reaction on your comment within seconds (no email); state chip "Received" on the site | 0 |
| No session will reply within the tick (<span title="A measured fact that holds a grade below a letter, however good the rest is.">cap</span>, pause, limit, quiet) | receipt comment | receipt comment, as C57 requires, with when the reply is expected; chip "Waiting: reply expected by 9:40 AM" | 0 |
| A session picks it up | nothing | chip "In progress: Odalys, Opus" (from COMPANY_STATUS, already polled every 5 s with ETag) | 0 |
| The reply | comment (email) | the same comment. It stays the one email per message that carries the answer. | the reply only |
| <span title="A GitHub issue asking the Investors for something that is blocking work.">Urgent Request</span> opened | issue (email, @mentions) | unchanged, plus a bell item with its deadline and a countdown | 0 |
| <span title="Commandment 51: the Investors approve every visual before it ships.">C51</span> approval requested | report question | bell item with the screenshots inline and three buttons: Approve, Ask for changes, Reject. Each opens the composer with the words pre-filled ("Approved: <item>"). Nothing posts until you press Send, so the record is always your words in your comment (C51, C9 of the Worker Rules). | 0 |
| Report published | issue (email) | bell item, low priority, no badge count | 0 |

</div>


C57 check: "every Investor message gets a reply confirming it arrived" stays true, because the reply itself confirms it. The receipt comment remains exactly where C57 asks for it. The reaction is an addition, not a replacement for anything the rule requires.

### 1.3 The bell (site, token holders only)

- In the header, right of the four tabs. The number counts only what waits on you: open Urgent Requests, C51 approvals, and company replies you haven't seen. Reports and status never raise the number. The page title becomes "(2) It's The Company" while the number is above 0.
- "Seen" is a timestamp in your browser (localStorage), per Investor. No server, no write.
- Items, newest first, grouped: Needs you · Replies · For information. Each item has one primary action, in place: Reply (opens the composer on that thread), Approve / Ask for changes / Reject (pre-filled composer), Open thread. Swipe or "Mark seen" clears it.
- Style: B "Panel" system. Items are the chat-bubble card at a smaller size, the sender chip with the name printed, and a deadline as a thin bar that shortens. The colour states are the existing tokens, and colour is never the only signal (the words say "Due in 6 h").
- No Web Push in v2. Push needs a service worker, a push service and a stored subscription, and GitHub's email already reaches your phone.
- **In-tab system notifications: a trial, approved 2026-10-23 02:31 ET (#24, comment 6358965333).** While the site is open in a tab, an item that reaches "Needs you" or "Replies" also raises a system notification (the browser Notification API, no server, zero model tokens). How it runs:
  - The browser asks permission only after a tap. The first time the bell opens, its top row reads "Try notifications (trial)" with a Turn on button. Nothing prompts on page load.
  - Off switches, both one tap: "Notifications: On \| Off" at the top of the bell (per browser, localStorage), and a site-wide `notify_trial` flag in site.json. Either Investor can turn it off for both with one line on #24 ("notifications off"); the company flips the flag in the next build and records it.
  - Limits: one notification per item, at most one per 2 minutes (more are grouped: "3 new replies"). Reports and status never notify. Tapping the notification focuses the tab and opens the item.
  - iPhone: Safari allows this only for a site added to the Home Screen (iOS 16.4 and later). On a normal Safari tab the bell says so, in those words, instead of offering a button that does nothing.
  - Review on Day 5 (2026-10-26): Wrenna counts the notifications fired per Investor per day from a client-side counter shown in the bell ("12 this week"). I ask on #24 whether to keep them. No answer means they stay on, and the off switch stays.

### 1.4 Data, at no new cost

All bell data comes from what the page already fetches: the comments poll (30 s, ETag) and the COMPANY_STATUS variable (5 s, ETag). One field is added to the variable: `inbox` = [{id, state, position, eta}] for open Investor messages, IDs only, no text. A 304 answer costs nothing against GitHub's rate limit.

## 2. Usage labelling

### 2.1 The rule

Every percentage on the site carries its denominator in words, next to the number. "16%" alone is a bug. Wrenna's site_qa.py gets a check: no `%` in rendered text without one of the approved phrases within the same element.


<div class="tbl" role="region" tabindex="0" aria-label="Table 2: 2.1 The rule, scrolls sideways" style="--tw:640px" markdown="1">

| Phrase (exact) | Means |
|---|---|
| "of your 5-hour allowance used" / "left" | the plan meter's session %, with its reset time |
| "of your weekly allowance used" / "left" | the plan meter's weekly %, with its reset time |
| "of the Fable weekly allowance used" | the scoped Fable meter |
| "of this week's allowance" (for a slice, e.g. "Running the site: 0.3% of this week's allowance") | a part, measured in points of the weekly allowance, so the parts add up to the headline number |
| "share of all tokens used so far" | the old share view. Advanced toggle only. |

</div>


### 2.2 Where

- Status strip (home): `5-hour: 16% used · 84% left · resets 4:49 AM` and `Week: 9% used · resets Sun 3:00 AM`. A thin bar under each, with the filled part labelled "used".
- Company > Usage: the two meters on top, then "Where this week's allowance went", in points of the weekly allowance by bucket: Product, Running the site, Hiring, Reports, Meetings, Talk, Unrelated. Below that, a `<details>` element labelled "Advanced: share of all tokens used so far", which holds today's share charts unchanged. It costs no JavaScript.
- Every chart's axis title includes the denominator words.

## 3. UI runtime cost ("Running the site")

### 3.1 What counts

Model spend caused by the site operating, not by building it:
- (a) inbox-type sessions (`type: inbox` in ops/usage.json runs). So far: 2 runs, $0.455 together, about 0.03% of the weekly allowance (estimate basis below).
- (b) the reply step inside a work session that answers chat messages. Today this is not separable. Fix: the supervisor runs the Investor replies as their own tagged step (`[chat]`), so the governor can attribute it.
- (c) the Unrelated bucket is not UI runtime. It has its own line.

What costs nothing, and is shown as 0 with the count so the point is visible: watcher polls (304s), reactions, receipt comments, /status-style command replies (tools/inbox_route.py), queue moves, live_status pushes.

### 3.2 The number

`ui_pct_5h = UI cost in the current 5-hour window / five_hour_budget_usd`, and `ui_pct_week = UI cost since week_anchor / weekly_budget_usd`. The budgets are the governor's estimates calibrated from the plan meter (ops/usage.json `estimates`), so the site prints "about" and the method sits behind an info button. Coverage (the share of runs with a measured cost) is printed when it is under 95%.

### 3.3 The runtime budget, and what happens when it is exceeded

- Running the site: at most 3% of the weekly allowance in any week, and at most 5% of any 5-hour window.
- At 80% of either, the strip shows it in the warning colour, and the governor batches chat replies to one session per 30 minutes. Urgent and emergency messages are never batched.
- Review: Odalys, Day 5 (2026-10-26), together with the watcher review already on the board.

## 4. Who is on what (worker lanes)

- The Now panel becomes one lane per worker who has a task, in the order: running, next, blocked. A lane shows the portrait (animated while running, still otherwise), name, task text (one line, ellipsis, full on tap), model chip, elapsed bar, and "for your message of 2:10 AM" when the task came from an Investor message. After it, up to two faint chips for that worker's next runnable board lines. A blocked lane says what it is waiting on ("waiting on you: #29").
- Idle workers collapse to a row of small portraits labelled "idle" (honest, not hidden).
- Data: tools/live_status.py adds `lanes` = [{name, state, task, model, since, from_msg, next: [..2]}]. Owners are read from the board's `(owner: X` field, which already exists on every line. The public copy keeps scrubbed task text (no URLs or issue numbers, 120 chars) and drops `from_msg`.
- Board convention, from now: a board line made from an Investor message ends its parenthesis with `from: c6358668923` (or `i31`). The Operator does it when filing; tools/board.py validates the form.
- Budget: COMPANY_STATUS stays under 8 KB (the GitHub limit is 48 KB). Public status.json stays under 4 KB gzipped.

## 5. Unrelated mode

- The composer gets a two-way switch above the text box: Company \| Unrelated. Unrelated starts a new issue labelled `unrelated` (one per request; a reply in the thread continues it). The switch is remembered per thread.
- Answered by the Operator, out of character: no worker persona, no story records, no diary mentions. C6 to C8 apply: no banned areas, no spending, no outreach, no art from a model.
- Workspace: `~/unrelated/<issue>/` on the Mac mini, never inside the repo, never committed. Downloads go in their own empty subfolder (untrusted-download rule). The Collatz side project lives in `~/unrelated/collatz/` and stays the lowest priority (#31).
- Usage: governor category `unrelated`, outside the 90% product share and outside "Running the site". It is shown on Company > Usage as its own line, in points of the weekly allowance.
- Site: unrelated threads never appear in public HTML, the public request list, status.json, reports' narrative, or the log page. With a token, they appear under a fifth filter, "Unrelated". The C42 scrub test gets a fixture: an `unrelated` issue must produce zero public bytes.
- Queue: unrelated requests sit in the same draggable list with a grey "Unrelated" chip. New ones land at the bottom; you can drag them anywhere.
- First check (Odalys, before any build): can a session write to `~/unrelated/`? If the permission classifier refuses it, that is a blocker. She opens an Urgent Request at once, per the 08:30 amendment.

## 6. Prompt priority: drag, settings, safe write path

### 6.1 What is in the list

Every open Investor message that needs judgment (ops/inbox/pending.json, plus messages already replied to whose `from:` board lines are still open). One row per message: the first 80 characters, who sent it, when, the state chip (section 1.2), and the board lines it spawned as a count ("3 tasks, 1 done"). A row leaves the list when all its board lines are `[x]`.

### 6.2 Interaction

- Phone: a long-press of 300 ms on the row's grip (six code-drawn dots) <span title="A new, permitted reading that removes a cap. A lift rule is that reading, written down before we look.">lifts</span> it, and dragging moves it. The page auto-scrolls near the edges. There is a haptic tick where supported.
- Desktop: drag with the mouse, or focus the row and press Alt+Up / Alt+Down. Every row also has "Move to top" in its menu, so dragging is never the only way (accessibility).
- Screen readers: a live region announces "Moved to 2 of 5".
- Either Investor can move any row, including the other's (the Investors' words). The row then shows "Moved by <name>, 2:31 AM" for an hour. Names are read at runtime from the allowlist, never written into public HTML.
- Saving: drops are batched. After 3 s with no further move, one comment is posted. The chip reads "Saving", then "Saved" when COMPANY_STATUS shows the new order (normally under 20 s). If that doesn't happen within 2 minutes, the chip reads "Not saved: retry", and the list goes back to the company's order. No silent divergence.

### 6.3 The write path (safe by construction)

- One pinned issue, "Queue", labelled `queue`. The browser posts, with the Investor's own token (Issues: write, already in the token steps), one comment of machine lines only:
  `/order c6358668923 i31 c6358735562`
  `/set c6358668923 model=opus effort=high split=team`
- tools/inbox.py poll already keeps only allowlisted authors (C57). tools/inbox_route.py gains a strict grammar for `/order` and `/set`. The IDs must exist in the open list. The values come from the enums in 6.4, and anything else rejects the whole comment. Nothing is passed to a model, and no text is copied anywhere (C58: chat text is data).
- Applied to `ops/queue/investor.json` (`{order: [...], settings: {id: {...}}, by, at}`) and appended to `log/`. Last write wins, by the comment's created_at.
- Confirmation: the "eyes" reaction at once (no email), then the new order in COMPANY_STATUS. Strict C57 reading: every Investor message gets a reply. A template comment per queue comment would email both Investors on every drag. So the company posts one code-written summary comment on the Queue issue at most once an hour ("Order now: 1. ..., 2. ..."), and the Investors may mute that one issue on GitHub. If the Investors would rather have the reaction alone count as the reply for queue moves, they can say so on #24. Until they do, the summary stands.
- Why not a repository variable written by the browser: it would need a write scope on Variables (a new token step for both Investors), and a variable does not record who wrote it. The comment path proves authorship through the allowlist and needs no new scope.

### 6.4 Per-message settings

A sheet opens on tap, with three segmented controls. Each defaults to "Company decides" and shows, greyed, what the company would choose and why in five words.


<div class="tbl" role="region" tabindex="0" aria-label="Table 3: 6.4 Per-message settings, scrolls sideways" style="--tw:724px" markdown="1">

| Control | Options | Notes |
|---|---|---|
| Model | Company decides · Fable · Opus · Sonnet · Haiku | Hard limits still win. If Fable is chosen while blocked or over its weekly share, the row says "Fable paused until Sat 3:00 AM; running on Opus" (no silent swap). |
| Effort | Company decides · Low · Medium · High · Max | Passed to the session as the effort setting for every call on that message's tasks. |
| Split | Company decides · One worker · Team | Team means the manager may run parallel worker calls on it; One worker forbids that. |

</div>


Cost hint under each choice: "Typical: about 2% of your 5-hour allowance" only where the governor has at least 5 measured runs of that model and kind. Otherwise it says "Not measured yet". No invented numbers (C33).

### 6.5 The supervisor obeys it

- The governor reads ops/queue/investor.json. Runnable board lines with `from:` IDs run in the list's order, ahead of company-originated lines. Emergencies (C-defined) and the rule that blocked lines are skipped still win.
- The per-message settings override the governor's model, effort and split choice for those lines, within the hard limits.
- Done-test (slice D): two Investor messages, reordered from the phone; the next session's run file shows the tasks started in the new order, with the chosen model and effort recorded in ops/usage.json. Wrenna verifies on the live site, and Odalys attaches the run file.

### 6.6 Conditions and ties: "do B after A" (Investor, #24 comment 6358965333, 02:31 ET)

The list stays one ordered list. A condition is a property of a row, never a second structure to learn. Three kinds, and no more in v2:


<div class="tbl" role="region" tabindex="0" aria-label="Table 4: 6.6 Conditions and ties: &quot;do B after A&quot; (Investor, #24 comment 6358965333…, scrolls sideways" style="--tw:875px" markdown="1">

| Kind | Meaning | Written as | Met when |
|---|---|---|---|
| After | B starts only when A is done | `/after B A` | every board line from A is `[x]` |
| Tied | A and B move as one block and run back to back | `/tie A B` | (no wait; it fixes position) |
| Not before | B waits for a time | `/notbefore B 2026-10-25T09:00` | the clock passes it (ET) |

</div>


`/clear B` removes every condition on B. A row may wait on at most three others. Chains may be at most four deep.

**The three-wait limit is per block** (Ines, 2026-10-23 22:15 ET, answering Idris's note that MAX_WAITS counts one row's waits, so a tied block of k rows could wait on 3k). A tied block is one card, one chip and one run, and the depth limit already counts it as one node, so the wait limit counts it the same way: the distinct rows that any member of the block waits on, outside the block, are at most three. A row that is not tied is a block of one, so nothing changes for it. The check runs on the merged state, so a `/tie` that would give the new block a fourth wait is refused as `too_many_waits` and names the tie line, exactly as a fourth `/after` is. Waited-on rows are counted as rows, not blocks, because the chip names rows ("After: Fix the bell").

**How it looks (one list, no graph view).**
- A row that waits sits in the list wherever its order puts it. On its left, under the grip, a 2 px rail in the row's state colour runs up to the row it waits for, with a small elbow. Rows that are next to each other show a short rail; for distant rows the rail is replaced by a chip, so the list never becomes a wiring diagram.
- The waiting row is dimmed to 70% and carries a chip in words: "After: Fix the bell (2 of 3 done)" or "Not before Sun 9:00 AM". When the condition is met, the chip turns to "Ready" for an hour and the dimming goes. Colour is never the only signal.
- Tied rows share one card with a hairline between them and a single grip. Dragging the grip moves the block.
- The row's state chip (section 1.2) gains one state, "Waiting on 1", so the bell and the lanes read the same way.
- Drawn in CSS and inline SVG from code (C9). No library.

```
 ⠿ 1  Fix the bell                     In progress · Odalys
 │
 └⠿ 2  Then: add the sound toggle      After: 1 (2 of 3 done)
  ⠿ 3  Usage labels                    Queued
 ┌───────────────────────────────────┐
 │⠿ 4  Lanes on home                 │ Tied
 │   5  Lanes on Company > People    │
 └───────────────────────────────────┘
```

**How you set one.** In the row's menu: "Run after…", "Tie with…", "Not before…". Each opens a picker of the other open rows (or a time). On desktop, holding Shift while dropping a row onto another sets "After" in one move. The pending link shows dashed until "Saved".

**Drag rules, enforced in the browser and again by the parser.**
- A waiting row cannot be dropped above the row it waits for. It snaps back, and the live region says "Can't move above Fix the bell: it waits for it. Remove the link first."
- Moving a row that others wait on asks once: "Move the 1 waiting row with it?" Yes moves them as a block, right after it; No cancels the move (left in place they would sit above their wait, which the parser refuses as `order_conflict`). Amended 2026-10-23 (Odalys, Idris C13 F7/F8 note).
- A tied block moves whole.

**Conditions the company finds.** When a reply finds a dependency in your words ("do this after the bell ships") or a board line carries one, the company shows it as a dashed rail marked "Suggested". One tap on Keep writes the `/after` line from your token; nothing applies until you do. The company writes no queue line itself.

**The parser (safe by construction, same path as 6.3).**
- Only comments on the Queue issue from allowlisted accounts are read (C57). Each line must match one of six fixed patterns: `/order`, `/set`, `/after`, `/tie`, `/notbefore`, `/clear`, each with IDs of the form `c<digits>` or `i<digits>`, and a time only as `YYYY-MM-DDTHH:MM`. Any other line rejects the whole comment, with a code-written reason in the hourly summary.
- IDs must be in the open list. A cycle (A after B after A), a fourth wait, a fifth level, or a "Not before" more than 30 days out rejects the comment. The check is a depth-first walk in tools/inbox_route.py, with tests for each case.
- Nothing reaches a model, and no text from the comment is copied anywhere. Only IDs, enums and the time are stored.
- `ops/queue/investor.json` gains `after: {id: [ids]}`, `tied: [[ids]]`, `notbefore: {id: time}`. The COMPANY_STATUS `inbox` field gains `wait: [ids]` per row (IDs only), so the page needs no new request.

**Token cost.** Zero model tokens. About 40 bytes per row in COMPANY_STATUS. queue.js grows by an estimated 2.5 KB gzipped, still inside 7.1.

**The governor obeys it.** A row whose condition is unmet is skipped like a blocked line, and the next runnable row moves up; the order otherwise holds. When A's last board line goes `[x]`, B becomes runnable in the next session, with no session started for it alone. Tied rows run in one session where the cap allows; otherwise back to back.

**What would make this fail.** A condition the governor skips silently. So every skip is written to the run file ("skipped c… : waits on c…"), and slice D2's done-test is a run file that shows B started only after A's lines closed.

## 7. Budgets

### 7.1 Page weight (amends site-v2.md section 5; I own this change)

- app.js (home, all visitors) stays at or under 25 KB raw. The bell and lanes go here; the bell code runs only with a token.
- A new `queue.js`, at or under 10 KB raw, loads only after a token is present (dynamic ``, same origin, CSP unchanged). It is not counted in the anonymous 60 KB home budget, and it is counted in the "with token" column.
- CSS additions at or under 4 KB raw and 1.5 KB gzipped in site.css (raised from 3 KB raw on 2026-10-23, see below). Requests to first paint: unchanged (6 anonymous).
- **Cap raised, 2026-10-23 (Ines).** Maren's additions.css came in at 3,846 B raw, 1,350 B gzipped, 774 B raw over my 3 KB cap. I raise the cap rather than drop a component. Reason: every component in the file is one the Investors asked for on #24 and #31 (bell and trial, lanes, state chips, meters with denominators, settings sheet, condition rails and tied card), and my 3 KB was a guess made before any CSS existed, not a measurement. That is my error. The consequence: site.css is inlined into every page and not cached, so the whole 1,350 B gzipped rides on every page view, first and repeat. The 774 B over the old cap is 219 B of that (3,072 B raw gzips to 1,145 B). Measured against section 5 with Wrenna's slice 8 numbers: home first visit about 20.1 to 21.5 KB wire (cap 60 KB), repeat visit about 13.4 to 14.8 KB (cap 25 KB), every other page plus 1.4 KB (cap 80 KB). Requests unchanged. The new cap leaves 250 B raw of room. Any further additions CSS beyond it comes out of an existing rule, one in, one out; it does not move the cap again. make.py now checks both numbers (gzipped is what travels) and exits 0 at today's file.
- **queue.js cap set, 2026-10-23 14:07 ET (Ines).** Measured: 13,993 B raw / 5,695 B gzipped shipped (6e2d728, comments stripped by build.py), against my 10 KB raw guess. Odalys proposed 14,336 / 6,144. I accept the measurement and set the cap at **16,384 B raw / 6,656 B gzipped shipped**, above her proposal, for one reason: Idris's C13 review (board, F1-F8) found real bugs (false "Saved", a drag that lands one row off, Retry that drops a batch, the Queue issue lost past 30 updates, dialog focus). Those fixes add code, and a cap with 343 B of room would bring the same question back within the hour or tempt someone to trim a fix. Who pays: the file loads only after a token is present, so anonymous home weight is unchanged (0 B); the two Investors load it once per cache life, about 6.5 KB gzipped at most. Nothing is cut. Conditions: (1) this is the last raise for queue.js; after F1-F8, any new piece is one in, one out; (2) the unbuilt pieces ('Moved by', 'Suggested' rails, Fable-paused note) fit inside the cap or wait; (3) cost hints are not built until a measured number exists to show; no row says "not measured yet" from this file; (4) build.py's JS_BUDGETS carries 16384/6656 and the build fails above either. Odalys sets it with her F1 fix.
- Polling: unchanged. No new poll; one new field in the variable.

### 7.2 Runtime model budget

Section 3.3: Running the site, at most 3% of the weekly allowance and 5% of any 5-hour window.

### 7.3 Build budget (model spend to build this, my estimates; the governor's actuals replace them)

The weekly allowance is estimated at about $1,420 (ops/usage.json `estimates.week`, median of 5). At 02:16 ET today the meter read 9% of the weekly allowance used.


<div class="tbl" role="region" tabindex="0" aria-label="Table 5: 7.3 Build budget (model spend to build this, my estimates; the governor&#x27;s…, scrolls sideways" style="--tw:775px" markdown="1">

| Slice | Owner | Estimate | % of weekly allowance |
|---|---|---|---|
| A notifications (backend, bell) | Odalys, Maren styling | $25 | 1.8% |
| B usage labels and Running the site | Odalys (data), Maren (page) | $15 | 1.1% |
| C worker lanes | Odalys (data), Maren (visual) | $12 | 0.8% |
| D queue, drag, settings, supervisor | Odalys, Idris review | $35 | 2.5% |
| E Unrelated mode | Odalys | $15 | 1.1% |
| QA, each slice | Wrenna | $3 each, $15 | 1.1% |
| Total | | about $117 | about 8% |

</div>


Models: Opus at high for build and review, as the board's v2 rule says. Sonnet for Wrenna's repeat QA runs once the checks are scripted.

## 8. Owners per file, and slice order

Owners follow site-v2.md 6.1. The one change: after Idris's slice 5 first pass is live, `site.css` and `templates.py` pass from Idris to Maren (her probation (a) is the site's second pass, and Idris leaves for the app the moment #23 is answered). Idris remains reviewer (C13) on JavaScript.


<div class="tbl" role="region" tabindex="0" aria-label="Table 6: 8. Owners per file, and slice order, scrolls sideways" style="--tw:851px" markdown="1">

| File | Owner | Additions |
|---|---|---|
| tools/inbox.py | Odalys | reaction receipts; comment receipt only when no session within the tick |
| tools/inbox_route.py | Odalys | `/order`, `/set` grammar; hourly queue summary |
| ops/queue/investor.json (new) | Odalys (written by code only) | order and settings |
| tools/governor.py, tools/supervisor.sh | Odalys | `[chat]` tag and the UI cost line; `unrelated` category; queue order and per-message settings |
| tools/live_status.py | Odalys | `lanes`, `inbox` states |
| tools/site/assets/app.js | Odalys | bell, lanes, usage strip words; Idris reviews |
| tools/site/assets/queue.js (new) | Odalys | drag, settings sheet, write path; Idris reviews |
| tools/site/assets/site.css, templates.py | Idris, then Maren | bell, lanes, sheet, chips, meters |
| tools/site/pages.py (company: Usage) | Idris, then Maren | the meters, the buckets, the Advanced details |
| tools/board.py | Odalys | validate `from:` |
| tools/site_qa.py | Wrenna | denominator check, unrelated-zero-bytes check, queue round-trip |
| tests/ | owner of the code under test | the C42 unrelated fixture; grammar tests for `/order` and `/set` |

</div>


Order. These start after site-v2.md slices 4 to 6 are live, because they build on the new home, Company and stylesheet.

1. **E0 (now, 10 minutes, Odalys):** test whether a session can write `~/unrelated/`. If refused, open an Urgent Request at once.
2. **B (first):** the usage labels and Running the site line. These are the smallest and the clearest win, and the Investors' 06:14 UTC comment is about trust in the numbers. Due Day 3 (2026-10-24), 12:00 ET.
3. **A:** notifications. Due Day 3, 20:00 ET (with v2's #29 deadline).
4. **C:** worker lanes. Due Day 4 (2026-10-25), 12:00 ET.
5. **D:** queue, drag and settings. It needs C's `from:` links. Due Day 4, 20:00 ET.
6. **D2:** conditions and ties (6.6). It needs D's list and parser. Due Day 5 (2026-10-26), 08:00 ET.
7. **E:** Unrelated mode. Due Day 5 (2026-10-26), 12:00 ET. It is lowest because the Investors can already ask unrelated things in any issue meanwhile. The Operator routes them by hand to `~/unrelated/` and tags them.

**What runs now, before v2 slice 6 is live (amendment #3: nobody idles).** The back half of every slice touches no page and can start today: Odalys builds the code paths (inbox.py reactions, the `/order` `/set` `/after` `/tie` `/notbefore` `/clear` parser with its cycle tests, investor.json, the governor reading it, the `lanes` and `inbox` fields in live_status.py) behind tests. Wrenna writes the site_qa checks against fixtures. Maren draws the bell, lanes, chips, rail and sheet as static code-rendered screenshots in ops/site-checks/additions/ for the C51 post. Idris reviews each back-end commit. Only the page wiring waits on slice 6. Board lines carry one slice each.

Each slice: tests, the C13 review, Wrenna's live QA at 390 px and desktop, and before/after screenshots posted on #29 for C51. Visual changes go live per the Investors' standing "ship it live, revert what we reject" instruction (board, site v2). If #23 is answered first, the app takes Idris at once, and Maren takes his site files.

## 9. What needs the Investors

Nothing blocks this plan today, so no Urgent Request is opened. Three non-blocking questions go on #24:
1. Queue moves: is the reaction plus the live order enough as the company's reply, or do you want the hourly summary comment (the default)?
2. If you keep the Queue issue's summary, mute that one issue on GitHub to avoid the emails.
3. The bell's in-tab system notifications: answered 2026-10-23 02:31 ET, a trial with an off switch (section 1.3). Review question goes on #24 on Day 5.

The token already has Issues: write and Variables: read (ops/plans/investor-token-steps.md step 6), so no new token step is needed.

## 10. Decisions log

- 2026-10-23 02:20 ET, Ines: this plan. Zero model calls in the UI path. Reaction receipts, with the comment receipt only where C57 requires it. Every % names its denominator. A Running the site line with a 3% weekly cap. Worker lanes linked to Investor messages by a `from:` field. The queue is written by allowlisted comments parsed by code. Unrelated mode with its own label, workspace and bucket. Slices B, A, C, D, E after v2 slices 4 to 6. site.css and templates.py move to Maren after slice 5's first pass.
- 2026-10-23 02:48 ET, Ines (per #24 comment 6358965333): in-tab notifications ship as a trial, turned on by a tap in the bell, with a per-browser and a site-wide off switch; review Day 5. The priority list gains conditions (After, Tied, Not before) shown as rails and word chips inside the one list, set from the row menu, parsed by code from allowlisted Queue comments with cycle and depth checks; new slice D2, due Day 5 08:00 ET. Back-end halves of B, A, C, D, D2 start now behind tests; only page wiring waits on v2 slice 6.
{% endraw %}

</div>
