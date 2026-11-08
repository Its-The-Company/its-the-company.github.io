// Source with comments: tools/site/assets/chat.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var API = S.API, NAME = S.NAME, ALLOW = S.ALLOW, NO_TOKEN = S.NO_TOKEN, el = S.el, byId = S.byId, on = S.on, later = S.later;
var getToken = S.getToken, tokenStore = S.tokenStore, hdrs = S.hdrs, gh = S.gh, said = S.said, ago = S.ago, checkAuth = S.checkAuth;
var onDrawn = S.onDrawn, onReject = S.onReject, LS = localStorage, W = window, DE = document.documentElement;
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
function now() { return new Date(Date.now()); }
function clock(iso) { return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
function dayKey(d) { return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
function dayLabel(iso) { var d = new Date(iso); return dayKey(d) === dayKey(now()) ? 'Today' : d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }); }
function newestPages(count) { var p = Math.ceil((+count || 0) / 100); return p > 1 ? [p - 1, p] : [1]; }
var NOTE = /<!--[\s\S]*?(?:-->|$)/g, AS = /<!-- ?as: ?([^>]{1,40}?) ?-->/;
var PTAG = '<!-- plan-mode v1 -->';
function isPlan(b) { return /^<!-- plan-mode v1 -->[ \t]*$/m.test(String(b || '').replace(/\r/g, '')); }
function strip(b) { return String(b || '').replace(NOTE, '').replace(/\r/g, '').trim(); }
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
function repoLink(href, repo) {
var m = /^https?:\/\/(?:github\.com\/([^/]+\/[^/]+)\/(blob|tree|raw)|raw\.githubusercontent\.com\/([^/]+\/[^/]+))\/([^/?#]+)\/([^?#]+)/.exec(href || '');
if (!m || !repo || (m[1] || m[3]).toLowerCase() !== repo.toLowerCase() || /(^|\/)(\.|%2e){1,2}(\/|$)/i.test(m[5])) return null;
return { ref: m[4], path: m[5].replace(/\/+$/, ''), dir: m[2] === 'tree' };
}
function long(t) { return t.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / 40)), 0) > 6; }
function chat(root) {
if (!getToken()) return;
var repo = root.getAttribute('data-repo'), RI = '/repos/' + repo + '/issues', composerOn = root.getAttribute('data-composer') === 'on';
function D(k) { return root.getAttribute('data-' + k) || ''; }
var etags = {}, cache = {}, names = [], issues = [], extra = {}, comments = [], threads = {}, lastDraw = null;
if (D('queue')) (document.head || root).appendChild(Object.assign(el('script'), { src: D('queue') }));
on(root, 'click', (e) => {
var a = e.target.closest && e.target.closest('a'), f = a && D('peek') && repoLink(a.href, repo);
if (!f || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
stop(e); f.url = a.href; f.repo = repo;
if (S.peek) return S.peek(f);
var q = S.peekQ; S.peekQ = f; if (!q) (document.head || root).appendChild(Object.assign(el('script'), { src: D('peek') }));
});
var cur = null, limit = 30;
if (W.history && 'scrollRestoration' in W.history) W.history.scrollRestoration = 'manual';
if (!LS.getItem('company.seen0')) LS.setItem('company.seen0', now().toISOString());
var isDesk = !!(W.matchMedia && W.matchMedia('(min-width:880px)').matches);
var Q = (s) => document.querySelector ? document.querySelector(s) : null;
var main = byId('main'), stripEl = byId('strip'), links = Q('main > .links'), aside = Q('main > .aside'), tog = Q('.now-toggle');
var homeRow = Q('nav.hometabs');
[byId('composer'), byId('urgent'), aside, tog, homeRow].forEach((x) => { if (x) x.hidden = true; });
var col = el('div', 'cv-col');
if (main) { main.insertBefore(col, stripEl || main.firstChild); main.className = 'cv-desk'; }
else put(root, col);
if (stripEl) put(col, stripEl);
var connect = D('connect') || 'connect.html';
if (DE && DE.style) DE.style.setProperty('--cv-tabs-h', '0px');  // the sticky head has no tab row above it now
var view = mk(col, 'div', 'cv-view');
var status = mk(col, 'p', 'meta chat-status muted cv-upd', '');
function noToken() { status.textContent = NO_TOKEN + ' '; mk(status, 'a', null, 'Change the token').href = connect; }
if (links) put(col, links);
var dock = mk(col, 'div', 'cv-dock');
if (W.ResizeObserver) new W.ResizeObserver(() => { DE.style.setProperty('--cv-dock-fit', 'calc(' + dock.getBoundingClientRect().height + 'px + var(--s2))'); }).observe(dock);
var jump = mk(col, 'button', 'cv-jump', 'Latest'); jump.type = 'button'; jump.hidden = true; jump.setAttribute('aria-label', 'Go to the latest message');
function seenAll() { jump.textContent = 'Latest'; markSeen(cur); drawTabs(); }
jump.onclick = () => { bottom(); jump.hidden = true; seenAll(); };
function atLast() {
var m = log && log.lastElementChild; if (!m || !m.getBoundingClientRect) return true;
var d = dock.getBoundingClientRect(), v = Math.min(W.innerHeight || 0, d.height ? d.top : 1e9);
return m.getBoundingClientRect().bottom <= v + 2;
}
function latestShow() { var at = atLast(); if (at && jump.textContent !== 'Latest') seenAll(); jump.hidden = at; }
if (W.addEventListener) { W.addEventListener('scroll', latestShow, { passive: true }); W.addEventListener('resize', latestShow); }
function login(x) { return String((x && x.user && x.user.login) || '').toLowerCase(); }
function numOf(c) { return +String(c.issue_url || '').split('/').pop(); }
function isInv(l) { return names.indexOf(l) >= 0; }
function issue(n) { for (var k = 0; k < issues.length; k++) if (issues[k].number === n) return issues[k]; return extra[n] || null; }
function ttl(i) { return labelsOf(i).indexOf('main') >= 0 ? 'Chat' : i.title; }
function mainN() { var i = issues.concat(flat(extra)).filter((x) => x.state === 'open' && labelsOf(x).indexOf('main') >= 0)[0]; return i ? i.number : 0; }
function byAt(a, b) { return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0; }
function msgsOf(n) { return threads[n] || comments.filter((c) => numOf(c) === n).sort(byAt); }
function allComments() { var by = {}; comments.concat(flat(threads)).forEach((c) => { by[c.id] = c; }); return Object.keys(by).map((k) => by[k]); }
function markSeen(n) { var l = msgsOf(n); if (typeof n === 'number' && l.length) LS.setItem('company.seen.' + n, l[l.length - 1].created_at); }
function parse() { var m = /^#t=(\w+)/.exec((W.location && W.location.hash) || ''); return m ? m[1] : 'main'; }
function go(k) { if (k === 'main') k = mainN() || k; var h = '#t=' + k; if (W.location && W.location.hash !== h) W.location.hash = h; if (String(k) !== String(cur)) select(k); }
function select(k) {
if (k === 'main') k = mainN() || k;
if (k !== 'main') { k = +k; if (!(k > 0)) k = 'main'; }
saveDraft(); cur = k; limit = 30; jump.hidden = true; isOpen = isDesk || (isMain(k) && composerOn); drawTabs(); drawView(true); drawDock();
bottom();
if (isDesk && composerOn && isMain(k) && ta.focus) ta.focus();
}
function drawTabs() {}
on(W, 'hashchange', () => { var k = parse(); if (String(k) !== String(cur)) select(k); });
function hue(l) { var h = 0, k; for (k = 0; k < l.length; k++) h = (h * 31 + l.charCodeAt(k)) >>> 0; return 'c' + (h % 6); }
function sender(l, body) {
var m = AS.exec(body || ''), inv = isInv(l);
var chip = el('span', 'chip sender ' + (inv ? hue(l) : 'company'), inv ? (m ? m[1] : l) : 'Company');
chip.title = l; return chip;
}
function msgEl(x, clamp) {
var inv = isInv(x.l), pm = isPlan(x.body), m = el('div', 'cv-msg' + (inv ? ' cv-inv' : '') + (pm ? ' cv-plan' : '')), from = mk(m, 'div', 'cv-from');
put(from, sender(x.l, x.body)); if (pm) mk(from, 'span', 'cv-pm', 'Plan mode'); mk(from, 'span', null, clock(x.at));
var b = mk(m, 'div', 'cv-body'), parts = splitQuote(x.body), inner = mk(b, 'div');
md(parts[0], inner);
clamp = clamp && long(parts[0]);
if (parts[1] || clamp) {
if (clamp) inner.className = 'cv-clamp';
var more = mk(b, 'button', 'cv-quoted', 'Show the whole message');
more.type = 'button';
more.onclick = () => { inner.className = ''; if (parts[1]) md(parts[1], inner); more.hidden = true; };
}
copyBtn(m, x.body);
if (!inv && String(x.body || '').indexOf('<!-- plan-questions v1 -->') >= 0) {
if (S.plan) S.plan(m, b, x);
else { (S.planQ = S.planQ || []).push([m, b, x]); if (!S.planL && D('plan')) { S.planL = 1; (document.head || root).appendChild(Object.assign(el('script'), { src: D('plan') })); } }
}
return m;
}
function copyText(t) {
var nav = W.navigator, fb = () => {
var a = document.createElement('textarea'); a.value = t; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
document.body.appendChild(a); a.select(); a.setSelectionRange(0, t.length);
var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
document.body.removeChild(a); return ok;
};
if (nav && nav.clipboard && nav.clipboard.writeText) return nav.clipboard.writeText(t).then(() => true, () => fb());
return Promise.resolve(fb());
}
function copyBtn(m, body) {
var t = String(body || '').replace(NOTE, '').trim(), b = mk(m, 'button', 'cv-copy', 'Copy'), tm = 0;
b.type = 'button'; b.setAttribute('aria-label', 'Copy message');
b.onclick = () => { copyText(t).then((ok) => {
b.textContent = ok ? 'Copied' : 'Copy failed'; b.setAttribute('aria-label', b.textContent); b.classList.add('on');
clearTimeout(tm); tm = setTimeout(() => { b.textContent = 'Copy'; b.setAttribute('aria-label', 'Copy message'); b.classList.remove('on'); }, 1500);
}); };
return b;
}
function sysEl(x) { var s = el('div', 'cv-sys'); mk(s, 'span', 'cv-ok', '✓'); put(s, txt('Received ' + clock(x.at))); copyBtn(s, 'Received ' + clock(x.at)); return s; }
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
var n = cur, i = issue(n), k = i ? kindOf(i) : 'chat', m0 = isMain(n), d = i && k === 'urgent' && !m0 ? deadlineOf(i) : null;
head = mk(view, 'div', 'cv-head' + (m0 ? ' cv-bare' : ''));
if (!m0) {
mk(head, 'span', 'chip ' + k, KINDS[k]); mk(head, 'span', 'meta', '#' + n);
mk(head, 'h2', null, i ? ttl(i) + (i.state === 'closed' ? ' (closed)' : '') : 'Loading...');
mk(head, 'a', 'meta', '← Chat').href = '#t=main';
}
if (d) put(head, d.t ? due(d) : el('span', 'cv-due', d.text));
pin = mk(head, 'button', 'cv-pin'); pin.type = 'button'; pin.hidden = true;
log = mk(view, 'div', 'cv-log'); shown = {}; lastDay = ''; waitEl = null; anchor = null;
var all = items(n), start = Math.max(0, all.length - limit), q = -1, j;
for (j = all.length - 1; j >= 0; j--) if (isInv(all[j].l)) { q = j; break; }
var answered = q >= 0 && all.slice(q + 1).some((x) => !isInv(x.l) && !isReceipt(x.body));
if (q >= 0 && start > q) start = q;
if (start > 0) {
var e = mk(log, 'button', 'cv-earlier', 'Load earlier messages'); e.type = 'button';
e.onclick = () => { var de = DE, below = de.scrollHeight - W.scrollY; limit += 30; drawView(false); W.scrollTo(0, de.scrollHeight - below); };
}
all.slice(start).forEach((x, j2) => { var m = add(x, answered && j2 + start === q); if (j2 + start === q) anchor = m; });
waitLine();
if (open) position();
if (!threads[n] || !i) readThread(n);
}
function headH() { return head ? head.offsetHeight || 0 : 0; }
function bottom() { if (W.scrollTo && DE) W.scrollTo(0, DE.scrollHeight); }
function toMsg(a) { W.scrollTo(0, a.getBoundingClientRect().top + W.scrollY - headH() - 8); }
function nearBottom() { var de = DE; return !de || !W.innerHeight || de.scrollHeight - (W.scrollY + W.innerHeight) < 200; }
function position() {
bottom();
markSeen(cur); drawTabs();
if (pinObs) pinObs.disconnect();
if (!anchor || !W.IntersectionObserver) return;
var a = anchor, x = items(cur).filter((m) => isInv(m.l)).pop();
pin.textContent = ''; mk(pin, 'b', null, 'You asked, ' + clock(x.at)); mk(pin, 'span', null, summary(x.body).slice(0, 80));
pin.onclick = () => { toMsg(a); };
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
var nw = items(cur).filter((x) => !shown[x.id]), de = DE;
if (!nw.length) return waitLine();
if (nw.some((x) => x.at < lastAt)) { var below = de ? de.scrollHeight - W.scrollY : 0; drawView(false); if (de && W.scrollTo) W.scrollTo(0, de.scrollHeight - below); return; }
var at = nearBottom();
nw.forEach((x) => { add(x); }); waitLine();
if (at) { bottom(); markSeen(cur); } else { jump.textContent = 'Latest · ' + nw.length + ' new'; jump.hidden = false; }
}
function readThread(n) {
if (!issue(n)) get(RI + '/' + n).then((i) => { extra[n] = i; if (cur === n) { drawTabs(); drawView(true); } }, () => {});
var have = threads[n], i = issue(n), base = RI + '/' + n + '/comments?per_page=100';
var paths = have && have.length ? [base + '&since=' + have[have.length - 1].created_at] : newestPages(i && i.comments).map((p) => p > 1 ? base + '&page=' + p : base);
return Promise.all(paths.map((p) => get(p))).then((lists) => {
var by = {}, first = !have;
(have || []).concat(comments.filter((c) => numOf(c) === n)).concat([].concat.apply([], lists.map((l) => l || []))).forEach((c) => { by[c.id] = c; });
threads[n] = Object.keys(by).map((k) => by[k]).sort(byAt);
if (cur !== n) return;
if (first) drawView(true); else update();
drawTabs();
}, () => {});
}
function due(d) {
if (!d || !d.t) return null;
var e = el('span', 'cv-due' + (d.t - Date.now() < 864e5 ? ' cv-soon' : ''), new Date(d.t).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }));
attr(e, 'data-t', new Date(d.t).toISOString()); e.title = 'Deadline: ' + d.text; return e;
}
function drawView(open) {
view.textContent = ''; log = head = anchor = null;
if (!lastDraw) { var p = mk(view, 'p', 'muted', S.rejected() ? NO_TOKEN + ' ' : 'Loading...'); if (S.rejected()) mk(p, 'a', null, 'Change the token').href = connect; return; }
if (cur === 'main') return;  // no Chat issue yet: nothing above the box until the first message (T-3080)
drawThread(open);
}
var isOpen = isDesk, sending = false;
var fake = el('button', 'cv-fake'), barSend = el('button', 'cv-send', '↑'), to = el('div', 'cv-to');
var ta = el('textarea'), tools = el('div', 'cv-tools'), out = el('p', 'cv-state', '');
var pmb = mk(tools, 'button', 'cv-tool cv-pmb', 'Plan mode'), hide = mk(tools, 'button', 'cv-tool cv-hide', 'Hide ⌄'), send = mk(tools, 'button', 'cv-send', '↑');
var hint = el('p', 'cv-hint', 'Plan mode: the company reads the code, the board and past decisions first, then replies with questions to tap. Slower than chat, and it uses more of the week.');
[fake, barSend, pmb, hide, send].forEach((b) => { b.type = 'button'; });
attr(barSend, 'aria-label', 'Send'); attr(send, 'aria-label', 'Send'); attr(hide, 'aria-label', 'Hide the composer');
ta.rows = 3; attr(ta, 'aria-label', 'Message'); ta.placeholder = 'Handled as if typed into Claude Code.';
attr(out, 'role', 'status');
function isMain(k) { return k === 'main' || (k > 0 && k === mainN()); }
function target() { return typeof cur === 'number' ? cur : mainN() || 'main'; }
function draftKey() { return 'company.draft.' + target(); }
function pOn() { return LS.getItem(draftKey() + '.plan') === '1'; }
function dc(x) { dock.className = 'cv-dock' + (pOn() ? ' cv-plan' : '') + (x || ''); }
function saveDraft() { if (cur === null) return; if (ta.value.trim()) LS.setItem(draftKey(), ta.value); else LS.removeItem(draftKey()); }
function toText() { var n = target(), i = issue(n); return isMain(n) ? 'Chat' : '#' + n + (i ? ' ' + i.title : ''); }
function canSend() { return !!ta.value.trim() && !S.rejected() && !sending; }
function dragVerdict(dy, ms) { var d = dy > 0 ? dy : 0; return { y: d, hide: d >= 60 || (d >= 24 && ms > 0 && d / ms >= 0.6) }; }
var grip = el('div', 'cv-grip'), g0 = null, g0t = 0;
attr(grip, 'aria-hidden', 'true'); mk(grip, 'span', 'cv-grip-bar');
function gy(e) { var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]); return t ? t.clientY : 0; }
function gripTo(y) { dock.style.transform = y ? 'translateY(' + y + 'px)' : ''; }
var gx = 0, gOn = false, gSc = null;
function scr(t) { while (t && t !== dock) { if (t.scrollHeight > t.clientHeight + 1 && /auto|scroll/.test((W.getComputedStyle(t) || {}).overflowY || '')) return t; t = t.parentNode; } return null; }
function tp(e) { var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]); return t ? t.clientX : 0; }
function gripEnd(e, cancel) {
if (g0 === null) return;
var v = dragVerdict(gy(e) - g0, Date.now() - g0t), was = gOn; g0 = null; gOn = false; gSc = null; dc();
if (was && v.hide && !cancel) { gripTo(0); doHide(); } else gripTo(0);
}
dock.addEventListener('touchstart', (e) => { if (!isOpen || (e.touches && e.touches.length > 1)) { g0 = null; return; } g0 = gy(e); gx = tp(e); g0t = Date.now(); gOn = false; gSc = scr(e.target); if (gSc && gSc.scrollTop > 0) g0 = null; }, { passive: true });
dock.addEventListener('touchmove', (e) => {
if (g0 === null) return;
var dy = gy(e) - g0, dx = tp(e) - gx;
if (!gOn) {
if (dy < 8 || dy < Math.abs(dx)) { if (dy < -8 || (Math.abs(dx) > 8 && Math.abs(dx) > dy)) g0 = null; return; }
gOn = true; dc(' cv-dragging');
}
if (e.cancelable) e.preventDefault();
gripTo(dragVerdict(dy, 1).y);
}, { passive: false });
on(dock, 'touchend', (e) => { gripEnd(e, false); });
on(dock, 'touchcancel', (e) => { gripEnd(e, true); });
function drawDock() {
dock.textContent = ''; dock.hidden = false;
if (!composerOn) { mk(dock, 'p', 'muted', 'Sending is off.'); return; }
ta.value = LS.getItem(draftKey()) || ''; dc();
barSend.disabled = send.disabled = !canSend();
if (main) main.className = 'cv-desk' + (isOpen ? ' cv-open' : '');
if (!isOpen) {
var b = mk(dock, 'div', 'cv-bar'); put(b, fake); put(b, barSend); put(dock, out);
fake.textContent = ta.value.trim() ? ta.value.trim().split('\n')[0] : isMain(target()) ? 'Message the company...' : 'Reply to ' + toText() + '...';
return;
}
put(dock, grip);
var p = pOn(), nm = LS.getItem(NAME);
to.textContent = 'To '; mk(to, 'b', null, toText());
if (p) { put(to, txt(' ')); mk(to, 'span', 'cv-pm', 'Plan mode'); }
if (nm) mk(to, 'span', null, '· as ' + nm);
attr(pmb, 'aria-pressed', p ? 'true' : 'false'); hint.hidden = !p;
[to, ta, tools, hint, out].forEach((x) => { put(dock, x); });
fitTa();
}
function fitTa() { if (ta.style && ta.scrollHeight) { ta.style.height = ''; ta.style.height = ta.scrollHeight + ((ta.offsetHeight - ta.clientHeight) || 0) + 'px'; } }
fake.onclick = () => { isOpen = true; drawDock(); if (ta.focus) ta.focus(); };
barSend.onclick = () => { doSend(); };
function doHide() { saveDraft(); if (ta.blur) ta.blur(); isOpen = false; drawDock(); }
hide.onclick = doHide;
pmb.onclick = () => { var k = draftKey() + '.plan'; if (pOn()) LS.removeItem(k); else LS.setItem(k, '1'); drawDock(); };
on(ta, 'input', () => {
saveDraft(); send.disabled = barSend.disabled = !canSend();
if (/failed/.test(out.className)) state('', '');
fitTa();
});
var clearTimer = 0;
function state(kind, text, ms) {
S.stop(clearTimer); out.className = 'cv-state' + (kind ? ' cv-' + kind : ''); out.textContent = text;
if (ms) clearTimer = later(() => { out.className = 'cv-state'; out.textContent = ''; }, ms);
}
function post(path, body) {
var h = hdrs(); h['Content-Type'] = 'application/json';
return fetch(API + path, { method: 'POST', headers: h, body: JSON.stringify(body) })
.then(checkAuth).then((r) => { if (!r.ok) throw new Error(said(r) + (r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : '')); return r.json(); });
}
function cleanName(n) { return (n || '').replace(/[^A-Za-z0-9 _.-]/g, '').trim().slice(0, 40); }
function stamp(text, name, p) { return text.replace(NOTE, '').trim() + (p ? '\n\n' + PTAG : '') + (name ? '\n\n<!-- as: ' + name + ' -->' : ''); }
function doSend() {
if (!composerOn || sending || S.rejected()) return;
var text = ta.value.trim(), name = cleanName(LS.getItem(NAME)), p = pOn(), n = target(), dk = draftKey();
if (!text) { state('failed', 'Write a message first.', 4000); return; }
sending = true; send.disabled = barSend.disabled = true; state('', 'Sending...');
var w0 = Promise.resolve();
var who = n === 'main' ? get(RI + '?labels=main').then((l) => { if (l && l[0]) extra[n = l[0].number] = l[0]; return w0; }) : w0;
who.then(() => {
if (typeof n !== 'number') return post(RI, { title: 'Chat', body: stamp(text, name, p), labels: ['chat', 'main'] });
return post(RI + '/' + n + '/comments', { body: stamp(text, name, p) });
}).then((r) => {
LS.removeItem(dk); LS.removeItem(dk + '.plan'); ta.value = '';
var made = typeof n !== 'number' && r.number;
state('sent', 'Sent' + (made ? ' as #' + r.number : '') + '. A receipt follows within a tick.', 8000);
etags = {}; sending = false;
if (made) { extra[r.number] = r; threads[r.number] = []; go(r.number); }
else { if (r.id && threads[n]) threads[n].push(r); else if (r.id) comments.unshift(r); if (cur !== n) go(n); else { update(); drawDock(); } }
load();
}).catch((e) => {
state('failed', 'Not sent: ' + e.message + '. Your text is kept; tap Send to retry.', 30000);
}).then(() => { sending = false; send.disabled = barSend.disabled = !canSend(); });
}
send.onclick = (ev) => { stop(ev); doSend(); };
S.planCtx = { md: md, items: () => items(cur), isInv: isInv, clock: clock, name: () => cleanName(LS.getItem(NAME)),
send: (t) => post(RI + '/' + cur + '/comments', { body: t }).then((r) => { if (threads[cur]) threads[cur].push(r); else comments.unshift(r); update(); return r; }) };
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
function refresh() { drawTabs(); update(); }
function load() {
if (document.hidden && lastDraw) return;
var n = lastDraw ? 100 : 30, cached = !lastDraw && readAllow();
Promise.all([cached ? (names = cached.names) : allow(), get(RI + '?state=all&per_page=' + n + '&sort=updated'), get(RI + '/comments?per_page=' + n + '&sort=created&direction=desc')])
.then((res) => {
var same = lastDraw && lastDraw[1] === res[1] && lastDraw[2] === res[2] && String(lastDraw[0]) === String(res[0]);
names = res[0]; issues = res[1].filter((i) => !i.pull_request && labelsOf(i).indexOf('site-state') < 0);
comments = (res[2] || []).filter((c) => String(c.body || '').trim().indexOf('<!-- site-state') !== 0);
if (!lastDraw) { lastDraw = res; select(parse()); } else if (!same) { lastDraw = res; refresh(); }
onDrawn.splice(0).forEach((f) => { f(); });
S.feed(issues, allComments(), names, deadlineOf, kindOf, (k, t) => { go(k); if (t && !ta.value.trim()) { ta.value = t; saveDraft(); } isOpen = true; drawDock(); });
if (cached) allow().then((a) => { if (String(a) !== String(cached.names)) refresh(); }, () => {});
if (typeof cur === 'number' && threads[cur] && n === 100) readThread(cur);
status.textContent = 'Updated ' + clock(now().toISOString()) + '.';
})
.catch((e) => { if (S.rejected()) noToken(); else status.textContent = 'Could not load the threads: ' + e.message + '.'; });
}
var sig = '';
if (S.onStatus) S.onStatus.push((st) => {
var s = JSON.stringify([st.meter, st.personal, st.api_credits, st.session]);
if (s === sig || !lastDraw) return; sig = s;
waitLine();
});
drawView(false); drawDock();
var loadTimer = setInterval(load, 30000);
on(document, 'visibilitychange', () => { if (!document.hidden && !S.rejected()) load(); });
on(W, 'pageshow', (e) => { if (e.persisted && !S.rejected()) load(); });
onReject.push(() => {
clearInterval(loadTimer); send.disabled = barSend.disabled = true;
noToken(); var u = byId('urgent'); if (u) u.hidden = false; if (!lastDraw) drawView(false);
});
load();
}
var c = byId('chat-root'); if (c) chat(c);
})();
