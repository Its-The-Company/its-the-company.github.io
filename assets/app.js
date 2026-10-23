// Source with comments: tools/site/assets/app.js in the company repository.
(function () {
'use strict';
var API = 'https://api.github.com';
var KEY = 'company-chat-token', NAME = 'company-chat-name';
var later = setTimeout;
var stop = typeof clearTimeout === 'function' ? clearTimeout : function () {};
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function add(box, tag, cls, text) { return box.appendChild(el(tag, cls, text)); }
function byId(id) { return document.getElementById(id); }
function on(target, ev, fn) { if (target && target.addEventListener) target.addEventListener(ev, fn); }
function getToken() { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''; }
var ALLOW = 'company.allow';
function tokenStore() { return localStorage.getItem(KEY) ? localStorage : sessionStorage; }
function parseAllow(t) {
var out = [], f = 0;
String(t || '').replace(/<!--[\s\S]*?-->/g, '').split('\n').forEach(function (l) {
l = l.replace(/^\s*([*-]\s+)?@?/, '').trim().toLowerCase();
if (/^(\x60{3}|~~~)/.test(l)) f = !f; else if (!f && l.length < 40 && /^[a-z0-9](-?[a-z0-9])*$/.test(l) && out.indexOf(l) < 0) out.push(l);
});
return out;
}
function setToken(t, remember) {
[sessionStorage, localStorage].forEach(function (s) { s.removeItem(KEY); s.removeItem(ALLOW); });
if (t) (remember ? localStorage : sessionStorage).setItem(KEY, t);
}
var onDrawn = [];
var lastSt = null, onStatus = [];
var rejected = false, onReject = [];
var NO_TOKEN = 'GitHub did not accept the token (401): nothing can be read or sent. Change it on the connect page.';
function checkAuth(r) {
if (r && r.status === 401 && !rejected && getToken()) { rejected = true; onReject.forEach(function (f) { f(); }); }
return r;
}
function hdrs() { var h = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, t = getToken(); if (t) h['Authorization'] = 'Bearer ' + t; return h; }
function gh(path, opts) {
var h = hdrs();
if (opts && opts.etag) h['If-None-Match'] = opts.etag;
return fetch(API + path, { headers: h, cache: 'no-store' }).then(checkAuth);
}
function said(r) { return 'GitHub answered ' + r.status; }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function ago(iso) {
var s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
if (isNaN(s)) return '';
return s < 90 ? Math.round(s) + ' s' : s < 5400 ? Math.round(s / 60) + ' min' : s < 172800 ? Math.round(s / 3600) + ' h' : Math.round(s / 86400) + ' d';
}
function clock(iso) { return iso ? new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''; }
function setText(id, text) { var e = byId(id); if (e && text != null) e.textContent = text; }
function when(iso, wk) { return iso ? new Date(iso).toLocaleString([], wk ? { weekday: 'short', hour: 'numeric', minute: '2-digit' } : { hour: 'numeric', minute: '2-digit' }) : ''; }
function tail(m, wk) { var r = when(m.resets_at, wk); return (m.left != null ? ' · ' + Math.round(m.left) + '% left' : '') + (r ? ' · resets ' + r : ''); }
function pts(x) { return String(+(+x).toFixed(x < 1 ? 2 : 1)); }
function meters(st) {
var box = el('div'), m = st.meter || {}, ui = st.ui || {};
[['5-hour', m.five_hour], ['Week', m.weekly, 1]].forEach(function (x) {
var v = x[1]; if (!v || v.pct == null) return;
var d = add(box, 'div', 'meter'), p = add(d, 'p'), t = add(d, 'div', 'bar-track');
add(p, 'b', null, x[0] + ': ' + Math.round(v.pct) + '%');
add(p, 'span', null, ' ' + v.used_words + ' ');
add(p, 'span', 'muted', tail(v, x[2]).slice(1));
t.setAttribute('role', 'img'); t.setAttribute('aria-label', Math.round(v.pct) + '% ' + v.used_words);
add(t, 'div', 'bar-fill').style.width = Math.max(0, Math.min(100, v.pct)) + '%';
});
if (ui.week_pct != null) {
var u = add(box, 'p', 'meta', 'Running the site: about ' + pts(ui.week_pct) + '% ' + ui.words
+ (ui.five_hour_pct != null ? ' and ' + pts(ui.five_hour_pct) + '% of your 5-hour allowance' : '')
+ (ui.over ? ' (over its cap: chat replies are batched)' : ui.warn ? ' (near its cap: chat replies are batched)' : '')
+ (ui.show_coverage ? '; cost measured for ' + Math.round(100 * ui.coverage) + ' in 100 runs' : '') + '.');
if (ui.warn || ui.over) u.style.color = 'var(--warm)';
}
return box;
}
function tiles(g, tile, href) {
var st = lastSt || {}, m = st.meter || {}, ui = st.ui || {};
[['5-hour', m.five_hour], ['Week', m.weekly, 1]].forEach(function (x) {
var v = x[1] || {};
tile(g, href, x[0] + ' usage', v.pct != null ? Math.round(v.pct) + '%' : '?', (v.used_words || 'not read yet') + tail(v, x[2]), v.pct != null ? v.pct / 100 : null);
});
if (ui.week_pct != null) tile(g, href, 'Running the site', pts(ui.week_pct) + '%', ui.words + ' (about)');
}
function list(items, fmt) { var ul = el('ul'); items.forEach(function (x) { add(ul, 'li', null, fmt(x)); }); return ul; }
var toggled = false;
function showNow(box, open) {
box.hidden = !open;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); var d = b.querySelector('.dot'); if (d) d.className = 'dot ' + (open ? 'live' : 'idle'); }
}
function renderStrip(st) {
var m = st.meter || {}, q = st.queue || {};
if (m.five_hour && m.five_hour.pct != null) {
setText('s-5h', Math.round(m.five_hour.pct) + '%');
setText('s-5h-r', tail(m.five_hour).slice(1));
}
if (m.weekly && m.weekly.pct != null) {
setText('s-wk', Math.round(m.weekly.pct) + '%');
var w = byId('s-wk'), r = byId('s-wk-r');
if (w && !r && w.parentNode) { r = add(w.parentNode, 'small'); r.id = 's-wk-r'; }
if (r) r.textContent = ' ' + tail(m.weekly, 1).slice(1);
}
if (q.runnable_count != null) setText('s-ready', String(q.runnable_count));
if (q.blocked_count != null) setText('s-blocked', String(q.blocked_count));
}
function taskLine(w) { return (w.task || '') + (w.model ? ' [' + w.model + ']' : '') + (w.started ? ', for ' + ago(w.started) : ''); }
function renderNow(box, st, source, isPublic) {
var s = st.session || {}, ws = st.workers || [];
var stale = isPublic && Date.now() - Date.parse(st.at) > 12e4;
var headLine = stale ? 'Status from the site build ' + ago(st.at) + ' ago.'
: s.active ? 'A ' + (s.kind || 'work') + ' session is running' + (s.started ? ' (started ' + ago(s.started) + ' ago).' : '.') : 'No session is running; one starts each tick.';
var head = box.querySelector ? box.querySelector('.now-head') : null;
var body = box.querySelector ? box.querySelector('.now-body') : null;
if (!body) { box.textContent = ''; add(box, 'h3', null, 'Now'); head = add(box, 'p', 'now-head'); body = add(box, 'div', 'now-body'); }
head.textContent = headLine;
var carded = {};
var cards = box.querySelectorAll ? Array.prototype.slice.call(box.querySelectorAll('[data-worker]')) : [];
cards.forEach(function (c) {
var slug = c.getAttribute('data-worker'), w = null, k;
for (k = 0; k < ws.length; k++) if ((ws[k].name || '').toLowerCase() === slug) w = ws[k];
var t = c.querySelector('.t'), d = c.querySelector('.dot');
c.className = 'card ' + (w ? 'live' : 'idle');
if (d) d.className = 'dot ' + (w ? 'live' : 'idle');
if (t) t.textContent = w ? taskLine(w) : stale ? 'no task then' : 'idle';
if (w) carded[slug] = true;
});
body.textContent = '';
var rest = ws.filter(function (w) { return !carded[(w.name || '').toLowerCase()]; });
if (rest.length) {
add(body, 'p', 'now-sub', 'Working now');
body.appendChild(list(rest, function (w) { return cap(w.name) + ': ' + taskLine(w); }));
} else if (s.active && !ws.length && !stale) add(body, 'p', 'muted', 'No worker call is running.');
var rec = (st.recent || []).slice(0, 3);
if (rec.length) {
add(body, 'p', 'now-sub', 'Just finished');
body.appendChild(list(rec, function (w) { return cap(w.name) + ': ' + (w.task || '') + (w.finished ? ', ' + ago(w.finished) + ' ago' : ''); }));
}
var q = st.queue || {};
add(body, 'p', 'now-sub', 'Queue: ' + (q.runnable_count || 0) + ' tasks ready, ' + (q.blocked_count || 0) + ' blocked');
if ((q.runnable || []).length) body.appendChild(list(q.runnable.slice(0, 5), function (t) { return '[' + t.kind + '] ' + t.text; }));
body.appendChild(meters(st));
add(body, 'p', 'muted', source + (st.at ? ' · updated ' + ago(st.at) + ' ago' : ''));
renderStrip(st);
if (!toggled) showNow(box, !!s.active && !stale);
lastSt = st; onStatus.forEach(function (f) { f(st); });
}
function nowPanel(box) {
var repo = box.getAttribute('data-repo'), etag = null, last = null, busy = false;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) b.onclick = function () { toggled = true; showNow(box, box.hidden); };
function pub(first) {
return fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
.then(function (st) { if (first && last) return; renderNow(box, st, 'public copy, from the last site build', true); }).catch(function () {});
}
function live(force) {
if (busy || (document.hidden && force !== true)) return; busy = true;
var p = (!getToken() || !repo || rejected) ? pub() : gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(function (r) {
if (r.status === 304 && last) return last;
if (!r.ok) throw new Error(r.status);
etag = r.headers.get('ETag'); return r.json().then(function (v) { last = JSON.parse(v.value); return last; });
}).then(function (st) { renderNow(box, st, 'live copy, seconds old while a session runs'); }).catch(function () { etag = null; last = null; return pub(); });
p.then(function () { busy = false; }, function () { busy = false; });
}
var timer, started = false, tokenPath = getToken() && repo && !rejected;
function start() { if (started || rejected) return; started = true; timer = setInterval(live, 5000); live(true); }
onReject.push(function () { clearInterval(timer); started = true; etag = null; last = null; timer = setInterval(live, 60000); });
var frame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : later;
if (tokenPath) { pub(true); onDrawn.push(function () { frame(function () { later(start, 0); }); }); later(start, 5000); }
else { timer = setInterval(live, 60000); live(true); }
on(document, 'visibilitychange', function () { if (!document.hidden && (started || !tokenPath)) live(); });
}
var NL = 'company.notify', NC = 'company.notify.count', GAP = 12e4;
var bellB = null, bellP = null, bellOpen = false, items = null, known = null, lastNote = 0, held = [], heldT = 0, chatOpen = null, title0 = '';
function flagOn() { var r = byId('chat-root'); return !(r && r.getAttribute('data-notify') === 'off'); }
function hasN() { return typeof Notification !== 'undefined'; }
function iPhone() { var n = typeof navigator !== 'undefined' ? navigator : {}; return /iP(hone|ad|od)/.test(n.userAgent || '') && !n.standalone; }
function allowed() { return flagOn() && hasN() && Notification.permission === 'granted' && localStorage.getItem(NL) === 'on'; }
function weekKey() { var d = new Date(Date.now()); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d.toDateString(); }
function weekCount(add) {
var c; try { c = JSON.parse(localStorage.getItem(NC)) || {}; } catch (e) { c = {}; }
if (c.w !== weekKey()) c = { w: weekKey(), n: 0 };
if (add) { c.n += add; localStorage.setItem(NC, JSON.stringify(c)); }
return c.n;
}
function plain(b) {
b = String(b || '').replace(/<!--[\s\S]*?-->|<[^>]*>/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
.replace(/^\s*(#+|>|[-*+]|\d+\.)\s+/gm, '').replace(/[*_\x60~]+/g, '').replace(/\s+/g, ' ').trim(); return b.length > 140 ? b.slice(0, 137) + '...' : b; }
function btn(box, text, cls, fn) { var b = add(box, 'button', 'btn' + (cls ? ' ' + cls : ''), text); b.type = 'button'; b.onclick = fn; return b; }
function toThread(n) { showBell(false); location.hash = '#t=' + n; }
function compose(n, text) { showBell(false); if (chatOpen) chatOpen(n, text); else toThread(n); }
function dueWords(ms) {
var a = Math.abs(ms), t = a < 36e5 ? Math.max(1, Math.round(a / 6e4)) + ' min' : a < 1728e5 ? Math.round(a / 36e5) + ' h' : Math.round(a / 864e5) + ' d';
return ms < 0 ? 'Overdue by ' + t : 'Due in ' + t;
}
function feed(issues, comments, names, dl, kind, open) {
chatOpen = open;
var s0 = localStorage.getItem('company.seen0') || '', need = [], rep = [], info = [];
function seen(n) { var x = localStorage.getItem('company.seen.' + n); return x && x > s0 ? x : s0; }
issues.forEach(function (i) {
var ap = (i.labels || []).some(function (l) { return String(l.name || l).toLowerCase() === 'approval'; }), k = kind(i);
if (i.state === 'open' && (k === 'urgent' || ap)) need.push({ k: 'i' + i.number, n: i.number, i: i, ap: ap && k !== 'urgent', d: dl(i) });
else if (k === 'report' && Date.now() - Date.parse(i.created_at) < 2592e5) info.push({ n: i.number, i: i });
});
need.sort(function (a, b) { var x = a.d && a.d.t, y = b.d && b.d.t; return x && y ? x - y : x ? -1 : y ? 1 : a.i.created_at < b.i.created_at ? -1 : 1; });
comments.forEach(function (c) {
var n = +String(c.issue_url || '').split('/').pop(), who = String((c.user && c.user.login) || '').toLowerCase();
if (names.indexOf(who) < 0 && !/\(automatic receipt\)\s*$/.test(c.body || '') && c.created_at > seen(n)) rep.push({ k: 'c' + c.id, n: n, c: c });
});
rep.sort(function (a, b) { return a.c.created_at < b.c.created_at ? 1 : -1; });
items = { need: need, rep: rep, info: info.slice(0, 3) };
var fresh = need.concat(rep).filter(function (x) { return known && !known[x.k]; });
known = known || {}; need.concat(rep).forEach(function (x) { known[x.k] = 1; });
if (!bellB) bellUI();
if (fresh.length && allowed()) { held = held.concat(fresh); if (!heldT) heldT = later(flush, Math.max(0, lastNote + GAP - Date.now())); }
drawBell();
}
function flush() {
heldT = 0; var h = held; held = [];
if (!h.length || !allowed()) return;
lastNote = Date.now();
var one = h.length === 1 ? h[0] : null, all = h.every(function (x) { return x.c; });
var n = new Notification(one ? (one.c ? 'Reply on #' : 'Needs you: #') + one.n : h.length + (all ? ' new replies' : ' new items'),
{ body: one ? (one.c ? plain(one.c.body) : one.i.title) : 'Open the bell on the company site.', tag: 'company-bell' });
weekCount(1);
n.onclick = function () { if (window.focus) window.focus(); if (one) toThread(one.n); else showBell(true); if (n.close) n.close(); };
drawBell();
}
function svg(tag, a) {
var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); return e;
}
function bellUI() {
var w = document.querySelector && document.querySelector('header.site .wrap');
if (!w || !document.createElementNS) return;
title0 = document.title;
w.style.position = 'relative';
bellB = add(w, 'button', 'bell'); bellB.type = 'button';
bellP = add(w, 'div', 'bellp'); bellP.setAttribute('role', 'dialog'); bellP.setAttribute('aria-label', 'Notifications'); bellP.hidden = true;
bellB.onclick = function () { showBell(!bellOpen); };
on(document, 'keydown', function (e) { if (bellOpen && e.key === 'Escape') { showBell(false); bellB.focus(); } });
on(document, 'click', function (e) { var t = e.target; if (bellOpen && bellP.contains && !bellP.contains(t) && !bellB.contains(t)) showBell(false); });
onReject.push(function () { bellB.hidden = bellP.hidden = true; document.title = title0; });
}
function showBell(open) { bellOpen = open; drawBell(); }
function drawBell() {
if (!bellB || !items) return;
var n = items.need.length + items.rep.length, s = svg('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'aria-hidden': 'true' });
s.appendChild(svg('path', { d: 'M12 3.5a5.5 5.5 0 0 0-5.5 5.5v3.6L4.8 15.8h14.4l-1.7-3.2V9A5.5 5.5 0 0 0 12 3.5z', 'stroke-linejoin': 'round' }));
s.appendChild(svg('path', { d: 'M9.8 18.6a2.3 2.3 0 0 0 4.4 0', 'stroke-linecap': 'round' }));
bellB.textContent = ''; bellB.appendChild(s);
if (n) add(bellB, 'span', 'badge', String(n));
bellB.setAttribute('aria-label', 'Notifications, ' + (n ? n + ' need you' : 'nothing waiting on you'));
bellB.setAttribute('aria-expanded', bellOpen ? 'true' : 'false');
document.title = (n ? '(' + n + ') ' : '') + title0;
bellP.hidden = !bellOpen;
if (!bellOpen) return;
bellP.textContent = '';
trial(add(bellP, 'div', 'trial'));
[['Needs you', items.need, needItem], ['Replies', items.rep, repItem], ['For information', items.info, infoItem]].forEach(function (g) {
if (!g[1].length) return;
add(bellP, 'h4', null, g[0]);
g[1].forEach(function (x) { bellP.appendChild(g[2](x)); });
});
if (!n && !items.info.length) add(bellP, 'p', 'muted', 'Nothing is waiting on you.');
}
function trial(t) {
function say(b, small) { add(t, 'b', null, b); if (small) add(t, 'small', 'muted', small); }
if (!flagOn()) return say('Notifications are off', 'Turned off for both of you on #24. The bell still lists everything.');
if (iPhone()) return say('Notifications', 'On iPhone, Safari sends them only to a site added to the Home Screen (iOS 16.4 or later). Share, then Add to Home Screen.');
if (!hasN()) return say('Notifications', 'This browser does not offer them. The bell still lists everything.');
if (Notification.permission === 'denied') return say('Notifications', 'Blocked in this browser’s settings for this site. The bell still lists everything.');
if (Notification.permission !== 'granted' || !localStorage.getItem(NL)) {
add(t, 'b', null, 'Try notifications (trial)');
btn(t, 'Turn on', 'primary', function () {
function done() { if (Notification.permission === 'granted') localStorage.setItem(NL, 'on'); drawBell(); }
var r = Notification.requestPermission(done); if (r && r.then) r.then(done);
});
return add(t, 'small', 'muted', 'Only while this tab is open. One per item, at most one every 2 minutes.');
}
add(t, 'b', null, 'Notifications');
var seg = add(t, 'span', 'seg2'), cur = localStorage.getItem(NL);
['On', 'Off'].forEach(function (w) {
var a = add(seg, 'a', null, w); a.href = '#';
if (cur === w.toLowerCase()) a.setAttribute('aria-current', 'true');
a.onclick = function (e) { if (e && e.preventDefault) e.preventDefault(); localStorage.setItem(NL, w.toLowerCase()); drawBell(); };
});
add(t, 'small', 'muted', 'Trial · ' + weekCount(0) + ' this week · off for both of you: write "notifications off" on #24');
}
function needItem(x) {
var d = el('div', 'item'), top = add(d, 'div', 'acts'), dl = x.d, a;
add(top, 'span', 'chip ' + (x.ap ? 'pitch' : 'urgent'), x.ap ? 'Approval (C51)' : 'Urgent');
add(top, 'span', 'ref', '#' + x.n);
add(d, 'b', null, x.i.title);
if (dl && dl.t) {
var left = dl.t - Date.now(), span = dl.t - Date.parse(x.i.created_at), w = dueWords(left), bar = add(d, 'div', 'due');
bar.setAttribute('role', 'img'); bar.setAttribute('aria-label', w);
add(bar, 'i').style.width = Math.max(0, Math.min(100, span > 0 ? 100 * left / span : 0)).toFixed(1) + '%';
add(d, 'small', 'muted', w + ' · ' + when(new Date(dl.t).toISOString(), 1));
} else if (dl) add(d, 'small', 'muted', 'Deadline: ' + dl.text);
a = add(d, 'div', 'acts');
if (x.ap) {
[['Approve', 'Approved'], ['Ask for changes', 'Changes asked'], ['Reject', 'Rejected']].forEach(function (b, k) {
btn(a, b[0], k ? '' : 'primary', function () { compose(x.n, b[1] + ': ' + x.i.title); });
});
add(d, 'small', 'muted', 'Each opens the composer with your words pre-filled; nothing posts until you press Send.');
} else {
btn(a, 'Reply', 'primary', function () { compose(x.n, ''); });
btn(a, 'Open thread', '', function () { toThread(x.n); });
}
return d;
}
function repItem(x) {
var d = el('div', 'item'), top = add(d, 'div'), a;
add(top, 'span', 'chip sender company', 'Company');
add(top, 'small', 'muted', ' ' + clock(x.c.created_at) + ' · #' + x.n);
add(d, 'span', null, plain(x.c.body));
a = add(d, 'div', 'acts');
btn(a, 'Reply', '', function () { compose(x.n, ''); });
btn(a, 'Mark seen', '', function () {
var k = 'company.seen.' + x.n; if ((localStorage.getItem(k) || '') < x.c.created_at) localStorage.setItem(k, x.c.created_at);
items.rep = items.rep.filter(function (y) { return y.n !== x.n || y.c.created_at > x.c.created_at; }); drawBell();
});
return d;
}
function infoItem(x) {
var d = el('div', 'item'), s = add(d, 'span'), a;
add(s, 'span', 'chip report', 'Report'); add(s, 'span', null, ' ');
a = add(s, 'a', null, x.i.title); a.href = '#t=' + x.n;
add(d, 'small', 'muted', ago(x.i.created_at) + ' ago');
return d;
}
function tokenBox(root) {
var repo = root.getAttribute('data-repo');
var bar = el('div', 'chat-bar'), input = el('input'); input.type = 'password'; input.autocomplete = 'off';
input.placeholder = 'Fine-grained GitHub token (github_pat_...)'; input.setAttribute('aria-label', 'GitHub token');
var remember = el('input'); remember.type = 'checkbox'; var rl = el('label', null, ' remember on this device'); rl.insertBefore(remember, rl.firstChild);
var save = el('button', 'btn primary', 'Save token'), forget = el('button', 'btn', 'Forget token'), out = el('p', 'state', '');
save.type = forget.type = 'button'; out.setAttribute('role', 'status');
[input, rl, save, forget].forEach(function (x) { bar.appendChild(x); });
root.appendChild(bar); root.appendChild(out);
function show() {
var t = getToken();
out.className = 'state'; out.textContent = t ? 'A token is saved in this browser (' + (localStorage.getItem(KEY) ? 'on this device' : 'until this tab closes') + ').' : 'No token is saved in this browser.';
}
save.onclick = function () {
var t = input.value.trim(); if (!t) { out.textContent = 'Paste the token first.'; return; }
setToken(t, remember.checked); input.value = ''; out.textContent = 'Checking the token with GitHub...';
gh('/repos/' + repo).then(function (r) {
if (!r.ok) throw new Error(said(r) + (r.status === 401 ? ' (the token was not accepted)' : r.status === 404 ? ' (the token cannot see the repository: steps 3 and 5)' : ''));
out.className = 'state sent'; out.textContent = 'Saved, and it can read the company repository. ';
var a = el('a', null, 'Go to the home page to send a message.'); a.href = root.getAttribute('data-home') || './'; out.appendChild(a);
}).catch(function (e) { out.className = 'state failed'; out.textContent = 'Saved, but it does not work yet: ' + e.message + '. Forget it and try again.'; });
};
forget.onclick = function () {
[sessionStorage, localStorage].forEach(function (s) { for (var i = s.length; i--;) { var k = s.key(i); if (/^company/.test(k || '')) s.removeItem(k); } });
show();
};
show();
}
window.CompanySite = { API: API, KEY: KEY, NAME: NAME, ALLOW: ALLOW, NO_TOKEN: NO_TOKEN, el: el, byId: byId, on: on, later: later, stop: stop,
getToken: getToken, setToken: setToken, tokenStore: tokenStore, hdrs: hdrs, gh: gh, said: said, ago: ago, checkAuth: checkAuth, parseAllow: parseAllow,
onDrawn: onDrawn, onReject: onReject, rejected: function () { return rejected; },
status: function () { return lastSt; }, onStatus: onStatus, tiles: tiles, feed: feed };
var n = byId('now-panel'); if (n) nowPanel(n);
var c = byId('chat-root'), t = byId('token-root');
function load(src) { var s = document.createElement('script'); s.src = src; (document.head || document.body).appendChild(s); }
var js = c && c.getAttribute('data-js'), wiz = (c || t) && (c || t).getAttribute('data-setup'), wizOn = false;
if (js && getToken()) load(js);
function setup() { if (wiz && !wizOn) { wizOn = true; load(wiz); } }
function hashSetup() { if (/^#(setup|name)/.test(location.hash || '')) setup(); }
var first = byId('first-run');
if (first && (getToken() || localStorage.getItem('company.visitor'))) first.hidden = true;
on(document, 'click', function (ev) {
var b = ev.target && ev.target.closest ? ev.target.closest('[data-start],[data-visit]') : null;
if (!b) return;
if (b.hasAttribute('data-visit')) { localStorage.setItem('company.visitor', '1'); if (first) first.hidden = true; return; }
if (wiz) { ev.preventDefault(); if (location.hash !== '#setup') location.hash = '#setup'; setup(); }
});
on(window, 'hashchange', hashSetup); hashSetup();
if (t) tokenBox(t);
})();
