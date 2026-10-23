// Source with comments: tools/site/assets/chat.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var API = S.API, NAME = S.NAME, ALLOW = S.ALLOW, NO_TOKEN = S.NO_TOKEN, el = S.el, byId = S.byId, on = S.on, later = S.later;
var getToken = S.getToken, tokenStore = S.tokenStore, hdrs = S.hdrs, gh = S.gh, said = S.said, ago = S.ago, checkAuth = S.checkAuth;
var onDrawn = S.onDrawn, onReject = S.onReject, LS = localStorage, W = window;
function put(p, c) { return p.appendChild(c); }
function txt(t) { return document.createTextNode(t); }
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function attr(e, k, v) { e.setAttribute(k, v); return e; }
var KINDS = { urgent: 'Urgent', report: 'Report', pitch: 'Pitch', chat: 'Chat', other: 'Other' };
function labelsOf(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function kindOf(i) {
var ls = labelsOf(i);
if (ls.indexOf('emergency') >= 0 || ls.indexOf('urgent') >= 0) return 'urgent';
if (ls.indexOf('report') >= 0) return 'report';
if (ls.indexOf('pitch') >= 0) return 'pitch';
if (ls.indexOf('chat') >= 0 || ls.some((l) => l.indexOf('topic:') === 0)) return 'chat';
return 'other';
}
var DEADLINE = /^[ \t]*(?:[-*+][ \t]+)?\**[ \t]*(?:deadline\**[ \t]*:|(?:needed|answer|decide) by\**[ \t]*:?)\**[ \t]*(.+)$/im;
function etOffset(y, mo, d) {
function sunday(m, n) { var first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(); return 1 + (7 - first) % 7 + 7 * (n - 1); }
return ((mo > 3 && mo < 11) || (mo === 3 && d >= sunday(3, 2)) || (mo === 11 && d < sunday(11, 1))) ? 4 : 5;
}
function deadlineTime(text) {
var d = /(\d{4})-(\d{2})-(\d{2})/.exec(text);
if (!d) return null;
var y = +d[1], mo = +d[2], day = +d[3], rest = text.slice(d.index + d[0].length);
var h = /(?:^|[^\d])(\d{1,2}):(\d{2})/.exec(rest), hh = h ? +h[1] : 23, mm = h ? +h[2] : 59;
if (mo < 1 || mo > 12 || day < 1 || day > 31 || hh > 23 || mm > 59) return null;
var off = /\b(?:UTC|GMT)\b|\d{2}Z\b/.test(rest) ? 0 : etOffset(y, mo, day);
return Date.UTC(y, mo - 1, day, hh + off, mm);
}
function deadlineOf(i) {
var m = DEADLINE.exec(i.body || '');
if (!m) return null;
var text = m[1].replace(/\*+/g, '').trim().replace(/\.$/, '');
if (text.length > 80) text = text.slice(0, 77) + '...';
return text ? { text: text, t: deadlineTime(text) } : null;
}
function byDeadline(a, b) {
var x = a.d && a.d.t, y = b.d && b.d.t;
if (x && y) return x - y; if (x) return -1; if (y) return 1;
return Date.parse(a.i.created_at) - Date.parse(b.i.created_at);
}
function now() { return new Date(Date.now()); }
function clock(iso) { return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
function dayKey(d) { return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
function dayLabel(iso) { var d = new Date(iso); return dayKey(d) === dayKey(now()) ? 'Today' : d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }); }
function strip(b) { return String(b || '').replace(/<!--[\s\S]*?-->/g, '').replace(/\r/g, '').trim(); }
function stop(ev) { if (ev && ev.preventDefault) ev.preventDefault(); }
function isReceipt(b) { return /\(automatic receipt\)\s*$/.test(b || ''); }
function flat(o) { return [].concat.apply([], Object.keys(o).map((k) => o[k])); }
function summary(b) {
var ps = strip(b).split(/\n\s*\n/), k, p;
for (k = 0; k < ps.length; k++) {
p = ps[k].replace(/[*_\x60#>]/g, '').replace(/\s+/g, ' ').trim();
if (p && !/^(@[\w-]+[\s,]*)+$/.test(p)) return p.slice(0, 200);
}
return '';
}
var TOK = /(\*\*[^*\n]+\*\*|https?:\/\/[^\s<>()"']*[^\s<>()"'.,;:!?]|\B#\d+\b)/;
function inline(box, s) {
s.split(TOK).forEach((p, k) => {
if (!(k % 2)) { if (p) put(box, txt(p)); return; }
if (p.slice(0, 2) === '**') return mk(box, 'b', null, p.slice(2, -2));
var a = mk(box, 'a', null, p), t = p.charAt(0) === '#';
a.href = t ? '#t=' + p.slice(1) : p; if (!t) { a.rel = 'noopener'; a.target = '_blank'; }
});
}
function md(text, box) {
var para = null, list = null, ltag = '', li = null, m;
strip(text).split('\n').forEach((ln) => {
if (!ln.trim()) { para = list = li = null; return; }
if ((m = /^\s*([-*+]|\d{1,3}[.)])\s+(.*)$/.exec(ln))) {
var tag = /\d/.test(m[1]) ? 'ol' : 'ul';
if (!list || ltag !== tag) { para = null; list = mk(box, tag); ltag = tag; }
return inline(li = mk(list, 'li'), m[2]);
}
if (li && /^\s{2,}\S/.test(ln)) return inline(li, ' ' + ln.trim());
list = li = null;
if (para) mk(para, 'br'); else para = mk(box, 'p');
inline(para, ln);
});
}
function splitQuote(b) {
var t = strip(b), m = /^On [^\n]{4,200}(?:\n[^\n]{0,200})?wrote:\s*$/m.exec(t);
return m && m.index ? [t.slice(0, m.index), t.slice(m.index)] : [t, ''];
}
function long(t) { return t.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / 40)), 0) > 6; }
function chat(root) {
if (!getToken()) return;
var repo = root.getAttribute('data-repo'), composerOn = root.getAttribute('data-composer') === 'on';
function D(k) { return root.getAttribute('data-' + k) || ''; }
var etags = {}, cache = {}, names = [], issues = [], extra = {}, comments = [], threads = {}, lastDraw = null;
var tabs = [], cur = null, limit = 30;
try { tabs = (JSON.parse(LS.getItem('company.tabs')) || []).filter((n) => n > 0).slice(-8); } catch (e) { tabs = []; }
if (!LS.getItem('company.seen0')) LS.setItem('company.seen0', now().toISOString());
var seen0 = LS.getItem('company.seen0'), isDesk = !!(W.matchMedia && W.matchMedia('(min-width:880px)').matches);
var Q = (s) => document.querySelector ? document.querySelector(s) : null;
var main = byId('main'), stripEl = byId('strip'), links = Q('main > .links'), aside = Q('main > .aside'), tog = Q('.now-toggle');
[byId('composer'), byId('urgent'), aside, tog].forEach((x) => { if (x) x.hidden = true; });
var col = el('div', 'cv-col'), side = el('aside', 'cv-side'); attr(side, 'aria-label', 'At a glance');
if (main) { main.insertBefore(col, stripEl || main.firstChild); main.insertBefore(side, stripEl || main.firstChild); main.className = 'cv-desk'; }
else put(root, col);
if (stripEl) put(col, stripEl);
var bar = mk(col, 'div', 'cv-tabs'), scroller = mk(bar, 'div', 'cv-scroll');
attr(bar, 'role', 'tablist'); attr(bar, 'aria-label', 'Conversations');
var plus = mk(bar, 'button', 'cv-tab cv-new', '+'); plus.type = 'button'; attr(plus, 'role', 'tab'); attr(plus, 'aria-label', 'New conversation');
plus.onclick = () => { go('new'); };
var setRow = mk(col, 'p', 'meta cv-set'), setL = mk(setRow, 'a', null, 'Settings'); setL.href = (D('connect') || 'connect.html') + '#name';
put(setRow, txt(' · '));
var tokenLink = mk(setRow, 'a', 'meta', 'Token connected · change'); tokenLink.href = D('connect') || 'connect.html';
put(setRow, txt(' '));
var status = mk(setRow, 'span', 'chat-status muted', '');
var view = mk(col, 'div', 'cv-view');
if (links) put(col, links);
var dock = mk(col, 'div', 'cv-dock');
var jump = mk(col, 'button', 'cv-jump'); jump.type = 'button'; jump.hidden = true;
jump.onclick = () => { bottom(); jump.hidden = true; markSeen(cur); drawTabs(); };
function login(x) { return String((x && x.user && x.user.login) || '').toLowerCase(); }
function numOf(c) { return +String(c.issue_url || '').split('/').pop(); }
function isInv(l) { return names.indexOf(l) >= 0; }
function issue(n) { for (var k = 0; k < issues.length; k++) if (issues[k].number === n) return issues[k]; return extra[n] || null; }
function openIssues() { return issues.filter((i) => i.state === 'open'); }
function byAt(a, b) { return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0; }
function msgsOf(n) { return threads[n] || comments.filter((c) => numOf(c) === n).sort(byAt); }
function allComments() { var by = {}; comments.concat(flat(threads)).forEach((c) => { by[c.id] = c; }); return Object.keys(by).map((k) => by[k]); }
function seen(n) { var s = LS.getItem('company.seen.' + n); return s && s > seen0 ? s : seen0; }
function fresh(c, n) { return !isInv(login(c)) && !isReceipt(c.body) && c.created_at > seen(n); }
function unread(n) { return msgsOf(n).filter((c) => fresh(c, n)).length; }
function markSeen(n) { var l = msgsOf(n); if (typeof n === 'number' && l.length) LS.setItem('company.seen.' + n, l[l.length - 1].created_at); }
function parse() { var m = /^#t=(\w+)/.exec((W.location && W.location.hash) || ''); return m ? m[1] : 'home'; }
function go(k) { var h = '#t=' + k; if (W.location && W.location.hash !== h) W.location.hash = h; if (String(k) !== String(cur)) select(k); }
function select(k) {
if (k !== 'home' && k !== 'new') { k = +k; if (k > 0) openTab(k); else k = 'home'; }
saveDraft(); cur = k; limit = 30; jump.hidden = true; isOpen = isDesk || (k === 'new' && composerOn); drawTabs(); drawView(true); drawDock();
}
function openTab(n) {
if (tabs.indexOf(n) >= 0) return;
tabs.push(n);
while (tabs.length > 8) {
var drop = tabs.filter((t) => t !== n && !unread(t))[0] || tabs[0];
tabs.splice(tabs.indexOf(drop), 1);
}
LS.setItem('company.tabs', JSON.stringify(tabs));
}
function closeTab(n) {
var at = tabs.indexOf(n); tabs.splice(at, 1); LS.setItem('company.tabs', JSON.stringify(tabs));
go(tabs[at] || tabs[at - 1] || 'home');
}
function keys() { return ['home'].concat(tabs, ['new']); }
function drawTabs() {
scroller.textContent = '';
keys().slice(0, -1).forEach((k) => {
var b = mk(scroller, 'button', 'cv-tab'), sel = String(k) === String(cur), u = k === 'home' ? 0 : unread(k), i = k === 'home' ? null : issue(k);
b.type = 'button'; attr(b, 'role', 'tab'); attr(b, 'aria-selected', sel ? 'true' : 'false'); b.tabIndex = sel ? 0 : -1;
if (k !== 'home') mk(b, 'span', 'cv-n', '#' + k);
mk(b, 'span', 'cv-t', k === 'home' ? 'Home' : i ? i.title : '');
if (u) attr(mk(b, 'span', 'cv-badge', String(u)), 'aria-label', u + ' new');
if (sel && k !== 'home') { attr(b, 'aria-keyshortcuts', 'Delete'); var x = mk(b, 'span', 'cv-x', '×'); attr(x, 'aria-hidden', 'true'); x.onclick = (ev) => { if (ev && ev.stopPropagation) ev.stopPropagation(); closeTab(k); }; }
b.onclick = () => { go(k); };
b.k = k;
});
attr(plus, 'aria-selected', cur === 'new' ? 'true' : 'false'); plus.tabIndex = cur === 'new' ? 0 : -1; plus.k = 'new';
var h = bar.offsetHeight, de = document.documentElement;
if (h && de && de.style) de.style.setProperty('--cv-tabs-h', h + 'px');
}
bar.onkeydown = (ev) => {
var ks = keys(), at = ks.map(String).indexOf(String(cur)), k = ev.key;
if (k === 'Delete' && typeof cur === 'number') { stop(ev); closeTab(cur); }
else if (k === 'ArrowLeft' || k === 'ArrowRight') { stop(ev); go(ks[(at + (k === 'ArrowRight' ? 1 : ks.length - 1)) % ks.length]); }
else return;
var t = [].filter.call(bar.querySelectorAll('[role=tab]'), (b) => String(b.k) === String(cur))[0]; if (t) t.focus();
};
on(W, 'hashchange', () => { var k = parse(); if (String(k) !== String(cur)) select(k); });
function hue(l) { var h = 0, k; for (k = 0; k < l.length; k++) h = (h * 31 + l.charCodeAt(k)) >>> 0; return 'c' + (h % 6); }
function sender(l, body) {
var m = /<!--\s*as:\s*([^>]{1,40}?)\s*-->/.exec(body || ''), inv = isInv(l);
var chip = el('span', 'chip sender ' + (inv ? hue(l) : 'company'), inv ? (m ? m[1] : l) : 'Company');
chip.title = l; return chip;
}
function msgEl(x, clamp) {
var inv = isInv(x.l), m = el('div', 'cv-msg' + (inv ? ' cv-inv' : '')), from = mk(m, 'div', 'cv-from');
put(from, sender(x.l, x.body)); mk(from, 'span', null, clock(x.at));
var b = mk(m, 'div', 'cv-body'), parts = splitQuote(x.body), inner = mk(b, 'div');
md(parts[0], inner);
clamp = clamp && long(parts[0]);
if (parts[1] || clamp) {
if (clamp) inner.className = 'cv-clamp';
var more = mk(b, 'button', 'cv-quoted', 'Show the whole message' + (parts[1] ? ' (quoted email hidden)' : ''));
more.type = 'button';
more.onclick = () => { inner.className = ''; if (parts[1]) md(parts[1], inner); more.hidden = true; };
}
return m;
}
function sysEl(x) { var s = el('div', 'cv-sys'); mk(s, 'span', 'cv-ok', '✓'); put(s, txt('Received ' + clock(x.at))); return s; }
var log = null, head = null, pin = null, anchor = null, shown = {}, lastDay = '', lastAt = '', waitEl = null, pinObs = null;
function items(n) {
var i = issue(n), out = i ? [{ id: 'i' + n, l: login(i), body: i.body, at: i.created_at }] : [];
return out.concat(msgsOf(n).map((c) => { return { id: c.id, l: login(c), body: c.body, at: c.created_at }; }));
}
function add(x, clamp) {
shown[x.id] = 1; lastAt = x.at;
var d = dayKey(new Date(x.at)); if (d !== lastDay) { lastDay = d; mk(log, 'span', 'cv-day', dayLabel(x.at)); }
return put(log, !isInv(x.l) && isReceipt(x.body) ? sysEl(x) : msgEl(x, clamp));
}
function drawThread(open) {
var n = cur, i = issue(n), k = i ? kindOf(i) : 'chat', d = i && k === 'urgent' ? deadlineOf(i) : null;
head = mk(view, 'div', 'cv-head');
mk(head, 'span', 'chip ' + k, KINDS[k]); mk(head, 'span', 'meta', '#' + n);
mk(head, 'h2', null, i ? i.title + (i.state === 'closed' ? ' (closed)' : '') : 'Loading...');
if (d) mk(head, 'span', 'cv-dl', d.t ? due(d).textContent : d.text);
pin = mk(head, 'button', 'cv-pin'); pin.type = 'button'; pin.hidden = true;
log = mk(view, 'div', 'cv-log'); shown = {}; lastDay = ''; waitEl = null; anchor = null;
var all = items(n), start = Math.max(0, all.length - limit), q = -1, j;
for (j = all.length - 1; j >= 0; j--) if (isInv(all[j].l)) { q = j; break; }
var answered = q >= 0 && all.slice(q + 1).some((x) => !isInv(x.l) && !isReceipt(x.body));
if (q >= 0 && start > q) start = q;
if (start > 0) {
var e = mk(log, 'button', 'cv-earlier', 'Load ' + Math.min(30, start) + ' earlier message' + (start > 1 ? 's' : '')); e.type = 'button';
e.onclick = () => { var de = document.documentElement, below = de.scrollHeight - W.scrollY; limit += 30; drawView(false); W.scrollTo(0, de.scrollHeight - below); };
}
all.slice(start).forEach((x, j2) => { var m = add(x, answered && j2 + start === q); if (j2 + start === q) anchor = m; });
waitLine();
if (open) position();
if (!threads[n] || !i) readThread(n);
}
function headH() { return (bar.offsetHeight || 0) + (head ? head.offsetHeight || 0 : 0); }
function bottom() { if (W.scrollTo && document.documentElement) W.scrollTo(0, document.documentElement.scrollHeight); }
function nearBottom() { var de = document.documentElement; return !de || !W.innerHeight || de.scrollHeight - (W.scrollY + W.innerHeight) < 200; }
function position() {
if (W.scrollTo) { if (anchor && anchor.getBoundingClientRect) W.scrollTo(0, anchor.getBoundingClientRect().top + W.scrollY - headH() - 8); else bottom(); }
markSeen(cur); drawTabs();
if (pinObs) pinObs.disconnect();
if (!anchor || !W.IntersectionObserver) return;
var a = anchor, x = items(cur).filter((m) => isInv(m.l)).pop();
pin.textContent = ''; mk(pin, 'b', null, 'You asked, ' + clock(x.at)); mk(pin, 'span', null, summary(x.body).slice(0, 80));
pin.onclick = () => { W.scrollTo(0, a.getBoundingClientRect().top + W.scrollY - headH() - 8); };
pinObs = new W.IntersectionObserver((es) => {
var e = es[es.length - 1]; pin.hidden = e.isIntersecting || e.boundingClientRect.top > (e.rootBounds ? e.rootBounds.top : 0);
}, { rootMargin: '-' + headH() + 'px 0px 0px 0px' });
pinObs.observe(a);
}
function waitLine() {
if (waitEl && waitEl.parentNode) waitEl.parentNode.removeChild(waitEl); waitEl = null;
if (!log) return;
var last = items(cur).filter((x) => !isReceipt(x.body)).pop();
if (!last || !isInv(last.l)) return;
var s = ((S.status && S.status()) || {}).session || {};
var t = 'The company is reading this.' + (s.active && s.started ? ' Session running since ' + clock(s.started) : ' No session is running; one starts each tick');
waitEl = mk(log, 'div', 'cv-wait'); mk(waitEl, 'span', 'cv-dot'); put(waitEl, txt(t + '.'));
}
function update() {
if (typeof cur !== 'number' || !log) return;
var nw = items(cur).filter((x) => !shown[x.id]), de = document.documentElement;
if (!nw.length) return waitLine();
if (nw.some((x) => x.at < lastAt)) { var below = de ? de.scrollHeight - W.scrollY : 0; drawView(false); if (de && W.scrollTo) W.scrollTo(0, de.scrollHeight - below); return; }
var at = nearBottom();
nw.forEach((x) => { add(x); }); waitLine();
if (at) { bottom(); markSeen(cur); } else { jump.textContent = '↓ ' + nw.length + ' new'; jump.hidden = false; }
}
function readThread(n) {
if (!issue(n)) get('/repos/' + repo + '/issues/' + n).then((i) => { extra[n] = i; if (cur === n) { drawTabs(); drawView(true); } }, () => {});
var have = threads[n], i = issue(n), path = '/repos/' + repo + '/issues/' + n + '/comments?per_page=100';
if (have && have.length) path += '&since=' + have[have.length - 1].created_at;
else if (i && i.comments > 100) path += '&page=' + Math.ceil(i.comments / 100);
return get(path).then((list) => {
var by = {}, first = !have;
(have || []).concat(list || []).forEach((c) => { by[c.id] = c; });
threads[n] = Object.keys(by).map((k) => by[k]).sort(byAt);
if (cur !== n) return;
if (first) drawView(true); else update();
drawTabs();
}, () => {});
}
function tile(g, href, label, big, sub, frac) {
var a = mk(g, 'a', 'cv-tile'), b; a.href = href;
mk(a, 'small', null, label); b = mk(a, 'b', null, big);
if (frac != null) {
put(b, txt(' ')); mk(b, 'span', 'cv-sub', sub);
mk(mk(a, 'div', 'cv-meter'), 'i').style.width = Math.max(0, Math.min(100, 100 * frac || 0)).toFixed(1) + '%';
} else if (sub) mk(a, 'span', 'cv-sub', sub);
return b;
}
function glance() {
var g = el('div', 'cv-glance'), st = (S.status && S.status()) || {}, m = (st.meter || {}).five_hour || {}, ws = st.workers || [];
tile(g, D('company'), 'Day', D('day'), 'of ' + D('days'), D('day') / D('days'));
tile(g, D('company'), 'Net proceeds', '$' + D('rev'), 'of $' + D('goal'), +D('revf'));
tile(g, D('usage'), '5-hour usage', m.pct != null ? Math.round(m.pct) + '%' : '?', m.resets_at ? 'resets ' + clock(m.resets_at) : '');
var b = tile(g, D('company'), 'Right now', ws.length + ' at work', ws.map((w) => { var s = String(w.name || ''); return s.charAt(0).toUpperCase() + s.slice(1); }).join(', ') || 'No worker call is running');
b.parentNode.className += ' cv-live'; if (ws.length) b.insertBefore(el('span', 'cv-dot'), b.firstChild);
return g;
}
function sec(box, text, count) { var h = mk(box, 'h2', 'cv-sec', text + ' '); mk(h, 'span', 'cv-count', count); }
function row(ul, n, title, meta, sum, cls, k) {
var a = mk(mk(ul, 'li'), 'a', 'cv-row' + (cls || '')), rt; a.href = '#t=' + n;
a.onclick = (ev) => { stop(ev); go(n); };
rt = mk(a, 'span', 'cv-rt');
if (k) { mk(rt, 'span', 'chip ' + k, KINDS[k]); put(rt, txt(' ')); }
put(rt, txt('#' + n + ' ' + title));
if (meta) put(a, meta);
if (sum) mk(a, 'span', 'cv-rs', sum);
return a;
}
function urgentList() {
return openIssues().filter((i) => kindOf(i) === 'urgent').map((i) => { return { i: i, d: deadlineOf(i) }; }).sort(byDeadline);
}
function due(d) {
if (!d || !d.t) return null;
var e = el('span', 'cv-due' + (d.t - Date.now() < 864e5 ? ' cv-soon' : ''), new Date(d.t).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }));
attr(e, 'data-t', new Date(d.t).toISOString()); e.title = 'Deadline: ' + d.text; return e;
}
function needs() {
var box = el('div', 'cv-needs'), l = urgentList(); sec(box, 'Needs you', String(l.length));
if (!l.length) { mk(box, 'p', 'muted', 'Nothing is waiting on you.'); return box; }
var ul = mk(box, 'ul', 'cv-list');
l.forEach((x) => { row(ul, x.i.number, x.i.title, due(x.d), (x.d && !x.d.t ? 'Deadline: ' + x.d.text + '. ' : '') + summary(x.i.body)); });
return box;
}
function replies() {
var box = el('div'), l = allComments().filter((c) => !isInv(login(c)) && !isReceipt(c.body)).sort(byAt).reverse().slice(0, 5);
l.forEach((c) => { c.u = fresh(c, numOf(c)) ? 1 : 0; });
l.sort((a, b) => b.u - a.u);
var nu = l.filter((c) => c.u).length;
sec(box, 'Latest replies', nu ? nu + ' new' : '');
if (!l.length) { mk(box, 'p', 'muted', 'No replies yet.'); return box; }
var ul = mk(box, 'ul', 'cv-list');
l.forEach((c) => { var n = numOf(c), i = issue(n); row(ul, n, i ? i.title : '', el('span', 'cv-rm', clock(c.created_at)), 'Company: ' + summary(c.body), c.u ? ' cv-unread' : ''); });
return box;
}
function allConvos() {
var box = el('div', 'cv-all'), recent = Date.now() - 3 * 864e5, ul;
mk(box, 'h2', 'cv-sec', 'All conversations'); ul = mk(box, 'ul', 'cv-list');
issues.filter((i) => i.state === 'open' || Date.parse(i.closed_at || i.updated_at) > recent).slice(0, 30)
.forEach((i) => { row(ul, i.number, i.title + (i.state === 'closed' ? ' (closed)' : ''), el('span', 'cv-rm', ago(i.updated_at)), '', '', kindOf(i)); });
return box;
}
function drawView(open) {
view.textContent = ''; side.textContent = ''; log = head = anchor = null;
if (stripEl) stripEl.hidden = cur === 'home';
put(side, glance());
if (!lastDraw) { var p = mk(view, 'p', 'muted', S.rejected() ? NO_TOKEN + ' ' : 'Loading the conversations...'); if (S.rejected()) mk(p, 'a', null, 'Change the token').href = tokenLink.href; return; }
if (cur === 'home') { [glance(), needs(), replies(), allConvos()].forEach((x) => { put(view, x); }); return; }
put(side, needs());
if (cur === 'new') {
mk(mk(view, 'div', 'cv-head'), 'h2', null, 'New conversation');
mk(view, 'p', 'muted', 'Your message starts a new thread.');
return;
}
drawThread(open);
}
var isOpen = isDesk, urgentOn = false, sending = false;
var fake = el('button', 'cv-fake'), barSend = el('button', 'cv-send', '↑'), to = el('div', 'cv-to');
var topicIn = el('input', 'field'), ta = el('textarea'), tools = el('div', 'cv-tools'), out = el('p', 'cv-state', '');
var urg = mk(tools, 'button', 'cv-tool', '! Urgent'), hide = mk(tools, 'button', 'cv-tool cv-hide', 'Hide ⌄'), send = mk(tools, 'button', 'cv-send', '↑');
[fake, barSend, urg, hide, send].forEach((b) => { b.type = 'button'; });
attr(barSend, 'aria-label', 'Send'); attr(send, 'aria-label', 'Send'); attr(hide, 'aria-label', 'Hide the keyboard and the composer');
topicIn.type = 'text'; topicIn.maxLength = 30; topicIn.placeholder = 'Topic (letters, digits, dashes)'; attr(topicIn, 'aria-label', 'Topic for the new conversation');
ta.rows = 3; attr(ta, 'aria-label', 'Message'); ta.placeholder = 'Handled as if typed into Claude Code.';
attr(out, 'role', 'status');
function target() { return typeof cur === 'number' ? cur : 'new'; }
function draftKey() { return 'company.draft.' + target(); }
function saveDraft() { if (cur === null) return; if (ta.value.trim()) LS.setItem(draftKey(), ta.value); else LS.removeItem(draftKey()); }
function toText() { var n = target(), i = issue(n); return n === 'new' ? 'New conversation' : '#' + n + (i ? ' ' + i.title : ''); }
function canSend() { return !!ta.value.trim() && !S.rejected() && !sending; }
function drawDock() {
dock.textContent = '';
if (!composerOn) { mk(dock, 'p', 'muted', 'Sending is switched off; reply on GitHub.'); return; }
ta.value = LS.getItem(draftKey()) || '';
barSend.disabled = send.disabled = !canSend();
if (main) main.className = 'cv-desk' + (isOpen ? ' cv-open' : '');
if (!isOpen) {
var b = mk(dock, 'div', 'cv-bar'); put(b, fake); put(b, barSend);
fake.textContent = ta.value.trim() ? ta.value.trim().split('\n')[0] : target() === 'new' ? 'Message the company (new chat)...' : 'Reply to ' + toText() + '...';
return;
}
to.textContent = 'To '; mk(to, 'b', null, toText());
var nm = LS.getItem(NAME); if (nm) mk(to, 'span', null, '· as ' + nm);
attr(urg, 'aria-pressed', urgentOn ? 'true' : 'false');
[to].concat(target() === 'new' ? [topicIn] : [], [ta, tools, out]).forEach((x) => { put(dock, x); });
}
fake.onclick = () => { isOpen = true; drawDock(); if (ta.focus) ta.focus(); };
barSend.onclick = () => { doSend(); };
hide.onclick = () => { saveDraft(); if (ta.blur) ta.blur(); isOpen = false; drawDock(); };
urg.onclick = () => { urgentOn = !urgentOn; attr(urg, 'aria-pressed', urgentOn ? 'true' : 'false'); };
on(ta, 'input', () => {
saveDraft(); send.disabled = barSend.disabled = !canSend();
if (/failed/.test(out.className)) state('', '');
if (ta.style && ta.scrollHeight) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
});
var clearTimer = 0;
function state(kind, text, ms) {
S.stop(clearTimer); out.className = 'cv-state' + (kind ? ' cv-' + kind : ''); out.textContent = text;
if (ms) clearTimer = later(() => { out.className = 'cv-state'; out.textContent = ''; }, ms);
}
function post(path, body) {
var h = hdrs(); h['Content-Type'] = 'application/json';
return fetch(API + path, { method: 'POST', headers: h, body: JSON.stringify(body) })
.then(checkAuth).then((r) => { if (!r.ok) throw new Error(said(r) + (r.status === 401 ? ' (the token was not accepted)' : r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : '')); return r.json(); });
}
function cleanName(n) { return (n || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40); }
function splitNames(l) {
var s = {}, r = [[], []];
issues.concat(allComments()).forEach((x) => { s[login(x)] = 1; });
l.forEach((n) => { r[s[n] ? 0 : 1].push(n); });
return r;
}
function mentions(l) { return l.length ? 'Urgent: ' + l.map((n) => '@' + n).join(' ') : ''; }
function stamp(text, name, cc) { return text.replace(/<!--[\s\S]*?-->/g, '').trim() + (cc ? '\n\n' + cc : '') + (name ? '\n\n<!-- as: ' + name + ' -->' : ''); }
function doSend() {
if (!composerOn || sending || S.rejected()) return;
var text = ta.value.trim(), name = cleanName(LS.getItem(NAME)), urgent = urgentOn, n = target();
if (!text) { state('failed', 'Write a message first.', 4000); return; }
sending = true; send.disabled = barSend.disabled = true; state('', 'Sending...');
var warn = '', who = (!urgent || names.length) ? Promise.resolve(names) : allow();
who.then((l) => {
var w = splitNames(urgent ? l : []), cc = urgent ? mentions(w[0]) : '';
if (urgent) warn = (cc ? '' : ' No one was mentioned.') + (w[1].length ? ' Not mentioned (no post here yet): ' + w[1].join(', ') + '.' : '');
if (n === 'new') {
var topic = topicIn.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);
var labels = ['chat']; if (topic) labels.push('topic:' + topic); if (urgent) labels.push('urgent');
return post('/repos/' + repo + '/issues', { title: (topic ? topic + ': ' : 'Chat: ') + text.replace(/\s+/g, ' ').slice(0, 60), body: stamp(text, name, cc), labels: labels });
}
return post('/repos/' + repo + '/issues/' + n + '/comments', { body: stamp(text, name, cc) }).then((r) => {
return urgent ? post('/repos/' + repo + '/issues/' + n + '/labels', { labels: ['urgent'] })
.then(() => r, (e) => { warn = ' The urgent label was not added (' + e.message + ')' + (cc ? '; the mentions were sent.' : '.') + warn; return r; }) : r;
});
}).then((r) => {
LS.removeItem(draftKey()); ta.value = ''; urgentOn = false; topicIn.value = '';
state('sent', 'Sent' + (n === 'new' && r.number ? ' as #' + r.number : '') + '. A receipt follows within a tick.' + warn, warn ? 15000 : 8000);
etags = {}; sending = false;
if (n === 'new' && r.number) { extra[r.number] = r; threads[r.number] = []; go(r.number); }
else { if (r.id && threads[n]) threads[n].push(r); else if (r.id) comments.unshift(r); update(); drawDock(); }
load();
}).catch((e) => {
state('failed', 'Not sent: ' + e.message + '. Your text is kept; tap Send to retry.', 30000);
}).then(() => { sending = false; send.disabled = barSend.disabled = !canSend(); });
}
send.onclick = (ev) => { stop(ev); doSend(); };
function get(path) {
return gh(path, { etag: etags[path] }).then((r) => {
if (r.status === 304) return cache[path];
if (!r.ok) throw new Error(said(r));
etags[path] = r.headers.get('ETag'); return r.json().then((j) => { cache[path] = j; return j; });
});
}
function readAllow() {
try { var a = JSON.parse(tokenStore().getItem(ALLOW) || 'null'); return a && Array.isArray(a.names) ? a : null; } catch (e) { return null; }
}
function allow() {
var c = readAllow();
return gh('/repos/' + repo + '/contents/investors/allowlist.md', { etag: c && c.etag }).then((r) => {
if (r.status === 304 && c) return (names = c.names);
if (!r.ok) throw new Error(said(r));
var tag = r.headers.get('ETag');
return r.json().then((f) => {
names = S.parseAllow(atob(f.content.replace(/\n/g, '')));
if (getToken()) tokenStore().setItem(ALLOW, JSON.stringify({ names: names, etag: tag }));
return names;
});
});
}
function refresh() { drawTabs(); if (cur === 'home') drawView(false); else update(); }
function load() {
if (document.hidden && lastDraw) return;
var n = lastDraw ? 100 : 30, cached = !lastDraw && readAllow();
Promise.all([cached ? (names = cached.names) : allow(), get('/repos/' + repo + '/issues?state=all&per_page=' + n + '&sort=updated'), get('/repos/' + repo + '/issues/comments?per_page=' + n + '&sort=created&direction=desc')])
.then((res) => {
var same = lastDraw && lastDraw[1] === res[1] && lastDraw[2] === res[2] && String(lastDraw[0]) === String(res[0]);
names = res[0]; issues = res[1].filter((i) => !i.pull_request); comments = res[2] || [];
if (!lastDraw) { lastDraw = res; select(parse()); } else if (!same) { lastDraw = res; refresh(); }
onDrawn.splice(0).forEach((f) => { f(); });
if (cached) allow().then((a) => { if (String(a) !== String(cached.names)) refresh(); }, () => {});
if (typeof cur === 'number' && threads[cur] && n === 100) readThread(cur);
status.textContent = 'Updated ' + clock(now().toISOString()) + '.';
})
.catch((e) => { status.textContent = S.rejected() ? NO_TOKEN : 'Could not load the threads: ' + e.message + '.'; });
}
var waiting = Q('[data-filter="urgent"]');
if (waiting) {
var whoEl = waiting.querySelector ? waiting.querySelector('[data-who]') : null;
if (whoEl) whoEl.textContent = 'waiting on you';
waiting.onclick = (ev) => { stop(ev); go('home'); };
}
var sig = '';
if (S.onStatus) S.onStatus.push((st) => {
var s = JSON.stringify([st.meter && st.meter.five_hour, (st.workers || []).map((w) => w.name), st.session]);
if (s === sig || !lastDraw) return; sig = s;
[].slice.call(document.querySelectorAll ? document.querySelectorAll('.cv-glance') : []).forEach((g) => { g.parentNode.replaceChild(glance(), g); });
waitLine();
});
drawView(false); drawDock();
var loadTimer = setInterval(load, 30000);
onReject.push(() => {
clearInterval(loadTimer); send.disabled = barSend.disabled = true; tokenLink.textContent = 'Token rejected · change';
status.textContent = NO_TOKEN; var u = byId('urgent'); if (u) u.hidden = false; if (!lastDraw) drawView(false);
});
load();
}
var c = byId('chat-root'); if (c) chat(c);
})();
