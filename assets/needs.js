// Source with comments: tools/site/assets/needs.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, root = document.getElementById('needs-root'), C = S && S.core, hm = root && /^#i(\d+)$/.exec(location.hash);
if (hm) location.replace(root.getAttribute('data-view') + '#' + hm[1]);
if (!C || !root || !S.getToken()) return;
var anon = document.getElementById('needs-anon'); if (anon) anon.hidden = true;
var chatTab = document.querySelector('nav.hometabs [data-chat-tab]'); if (chatTab) chatTab.hidden = false;
var repo = root.getAttribute('data-repo'), RI = C.use(repo), el = S.el, VIEW = root.getAttribute('data-view');
var DAY = 864e5, answered = C.answered, day = C.day, getJ = C.getJ, allow = C.allow, thread = C.thread;
function nums(a) { return (root.getAttribute(a) || '').split(/\s+/).filter(Boolean).map(Number); }
var named = nums('data-named'), skip = nums('data-skip'), props = nums('data-props'), rest = nums('data-rest')[0] || 0, shut = document.getElementById('needs-closed'), names = [];
var KEEP = ['emergency', 'urgent', 'approval', 'pitch'];
function mk(p, tag, cls, text) { return p.appendChild(el(tag, cls, text)); }
function labels(i) { return (i.labels || []).map((x) => String(x.name || x).toLowerCase()); }
function inv(l) { return names.indexOf(l) >= 0; }
function off(i) { var l = labels(i), q = l.indexOf('proposal') >= 0; return skip.indexOf(i.number) >= 0 || l.indexOf('main') >= 0 || l.indexOf('site-state') >= 0 || (q && props.indexOf(i.number) < 0); }
function cap(k) { return k.charAt(0).toUpperCase() + k.slice(1); }
function row(i, note) {
var li = el('li', 'ny iq-row'), a, m, k = KEEP.concat('chat').filter((x) => labels(i).indexOf(x) >= 0)[0];
li.id = 'i' + i.number; mk(li, 'span', 'iq-dot off');
a = mk(li, 'a', 'iq-a'); a.href = VIEW + '#' + i.number;
mk(a, 'b', 'iq-t', i.title); mk(a, 'span', 'iq-d', note || C.clean(C.plain(i.body).split('\n').filter((x) => x.trim())[0] || ''));
m = mk(a, 'span', 'iq-m'); if (k) mk(m, 'span', 'tag ' + k, cap(k));
mk(m, 'span', 'iq-num ref', '#' + i.number);
return li;
}
function meta(li, i) {
var m = li.querySelector('.iq-m');
if (m && i.comments > 0 && !m.querySelector('.iq-n')) mk(m, 'span', 'iq-n', i.comments + ' repl' + (i.comments === 1 ? 'y' : 'ies'));
}
var ROWS = [], ansU = null, ansN = null, OPEN = {}, QST = null, QS = null;
function place(x) {
if (!ansU) {
var sec = el('section', 'ny-ans-sec'), h = mk(sec, 'h2', 'iq-h', 'Answered, waiting on the company ');
h.id = 'ny-ans-h'; sec.setAttribute('aria-labelledby', h.id); ansN = mk(h, 'span', 'iq-c ny-count', '0');
mk(sec, 'p', 'iq-note', 'You have replied to these. The company reads your reply and closes the issue; they do not count in the Issues badge. Open one to add to it or close it.');
ansU = mk(sec, 'ul', 'iq-list'); ansU.setAttribute('data-group', 'answered');
(shut ? shut.parentNode : root).insertBefore(sec, shut);
}
var m = x[0].querySelector('.iq-m');
if (m && !m.querySelector('.ny-tag-ans')) m.insertBefore(el('span', 'tag ny-tag-ans', 'Answered'), m.firstChild);
x[0].classList.add('ny-ans'); ansU.appendChild(x[0]); fold();
}
function ox(x) { var i = OPEN[x[1]]; return { l: labels(i), dl: window.IssueQ.dl(i.body) }; }
function lab(v, now) {
if (!v) return ['No date', 1];
var d = C.ymd(v), t = S.clock(v), m = Math.round((now - v) / 6e4);
if (v <= now) return [m < 1 ? 'Due now' : m < 60 ? m + ' min late' : m < 2880 ? Math.round(m / 60) + ' h late' : Math.round(m / 1440) + ' d late', 1];
if (d === C.ymd(now)) return ['Due ' + t, 0];
return [fd(d) + (h23(v) === '23:59' ? '' : ', ' + t), 0];
}
function h23(t) { return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(t)); }
function qsec(k) {
var sec = el('section', 'iq-q'), h = mk(sec, 'h2', 'iq-h', k === 'N' ? 'Now ' : 'Later '), q = QS[k] = { sec: sec, g: {} };
h.id = 'ny-q-' + k; sec.setAttribute('aria-labelledby', h.id);
q.n = mk(h, 'span', 'iq-c ny-count', '0');
mk(sec, 'p', 'iq-note', k === 'N' ? 'Due within 24 hours, or no date. Drag an issue here to make it due now; open one to answer it.' : 'Due more than 24 hours from now, by day. Drag an issue onto a day, or tap its date to change it.');
q.ul = mk(sec, 'ul', 'iq-list'); q.ul.setAttribute('data-queue', k);
q.none = mk(sec, 'p', 'iq-empty');
mk(q.none, 'b', null, k === 'N' ? 'Nothing needs you now.' : 'Nothing is waiting for later.');
if (k === 'N') mk(q.none, 'span', null, 'New issues and anything due within a day land here.');
return sec;
}
function fd(d) { return new Date(d + 'T12:00Z').toLocaleDateString([], { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short' }); }
function gsec(g) {
var o = QS.L.g[g[0]];
if (!o) {
o = QS.L.g[g[0]] = { li: el('li', 'iq-g') }; o.li.setAttribute('data-g', g[0]);
o.h = mk(o.li, 'h3', 'iq-gh', g[1] + ' '); o.sp = mk(o.h, 'span', 'iq-gs');
o.ul = mk(o.li, 'ul', 'iq-list'); o.ul.setAttribute('data-grp', g[0]);
}
o.g = g; o.sp.textContent = g[2] === g[3] ? fd(g[2]) : g[3] ? fd(g[2]) + ' to ' + fd(g[3]) : 'from ' + fd(g[2]);
QS.L.ul.appendChild(o.li);
return o;
}
function xr(li) { return ROWS.filter((x) => x[0] === li)[0]; }
function due(x) { return window.IssueQ.due(x[1], ox(x), QST); }
function paint() {
var Q = window.IssueQ;
if (!QST || !Q || (D && D.on)) return;
var now = Date.now(), vis = ROWS.filter((x) => !x[0].hidden && !x.ans && OPEN[x[1]]), by = { N: [], L: [] }, G = C.groups(now), GL;
if (!QS) {
QS = {}; var b = BD = el('div', 'iq-board'), a = document.querySelector('ul[data-group="open"]');
b.appendChild(qsec('N')); b.appendChild(qsec('L'));
if (a && a.parentNode) a.parentNode.insertBefore(b, a); else root.appendChild(b);
}
vis.forEach((x) => { by[Q.queue(x[1], ox(x), QST, now)].push(x); });
GL = G.map(gsec);
var rs = document.querySelectorAll('li.iq-rest'), a0 = document.querySelector('ul[data-group="open"]');
Array.prototype.forEach.call(rs, (li) => { QS.N.ul.appendChild(li); });
Object.keys(QS.L.g).forEach((k) => { if (!G.some((g) => g[0] === k)) { QS.L.g[k].li.remove(); delete QS.L.g[k]; } });
['N', 'L'].forEach((k) => {
by[k].sort((a, b) => due(a) - due(b)).forEach((x) => {
var src = x[0].parentNode; (k === 'N' ? QS.N : QS.L.g[C.grp(due(x), G)[0]]).ul.appendChild(x[0]);
if (src && !src.closest('[data-queue]') && !src.children.length) { src.removeAttribute('data-group'); src.hidden = true; }
});
var c = by[k].length + (k === 'N' ? rs.length : 0); QS[k].n.textContent = String(c); QS[k].none.hidden = c > 0;
});
if (a0 && !a0.children.length) { a0.removeAttribute('data-group'); a0.hidden = true; }
GL.forEach((o) => { o.li.classList.toggle('iq-e', !o.ul.children.length); });
vis.forEach((x) => {
var o = ox(x), bd = Q.badged(x[1], o, QST, now), li = x[0], dot = li.querySelector('.iq-dot'), m = li.querySelector('.iq-m'), nw = li.querySelector('.iq-new');
var dt = li.querySelector('.iq-due'), L = lab(due(x), now);
if (!dt || dt.tagName !== 'BUTTON') { var bt = el('button', 'iq-due'); bt.type = 'button'; bt.onclick = () => { sheet(x, bt); }; if (dt) dt.replaceWith(bt); else li.appendChild(bt); dt = bt; grab(x); }
dt.textContent = L[0]; dt.className = 'iq-due' + (L[1] ? ' late' : ''); dt.setAttribute('aria-label', 'Deadline ' + L[0] + ', change');
if (dot) { dot.className = 'iq-dot' + (bd ? '' : ' off'); dot.title = bd ? 'New' : ''; }
if (bd && !L[1] && !nw && m) m.insertBefore(el('span', 'tag iq-new', 'New'), m.querySelector('.iq-num'));
if ((!bd || L[1]) && nw) nw.remove();
});
}
var D = null, BD = null, BAR = null, UT = 0, swallow = 0;
function line(t, undo, top) {
if (!BAR) { BAR = mk(document.body, 'p', 'iq-bar'); BAR.setAttribute('role', 'status'); }
clearTimeout(UT); BAR.textContent = t; BAR.hidden = !t; BAR.classList.toggle('top', !!top);
if (undo) { var u = mk(BAR, 'button', 'cv-tool', 'Undo'); u.type = 'button'; u.onclick = () => { undo(); line(''); }; UT = setTimeout(() => { line(''); }, 6e3); }
}
function where(v, now) { var G = C.groups(now); return v - now <= DAY ? 'Now, due ' + (v > now + 6e4 ? lab(v, now)[0].replace('Due ', '') : 'now') : C.grp(v, G)[1] + ', ' + lab(v, now)[0]; }
function set(x, v) {
var Q = window.IssueQ, keep = JSON.stringify(QST), now = Date.now();
Q.act(QST, x[1], ox(x), 'delay', v, now); Q.save(QST); paint(); tally();
line('#' + x[1] + ' moved to ' + where(v, now) + '. ', () => { Object.assign(QST, JSON.parse(keep)); Q.save(QST); paint(); tally(); });
}
function grab(x) {
var li = x[0];
li.addEventListener('dragstart', (e) => { e.preventDefault(); });
li.addEventListener('contextmenu', (e) => { if (D) e.preventDefault(); });
li.addEventListener('pointerdown', (e) => {
if (D || !e.isPrimary || e.button || e.target.closest('.iq-due') || x.ans) return;
var t = e.pointerType === 'touch';
D = { x: x, li: li, id: e.pointerId, x0: e.clientX, y0: e.clientY, t: t };
if (t) { D.p = setTimeout(() => { li.classList.add('iq-press'); }, 150); D.h = setTimeout(() => { lift(D.x0, D.y0); }, 450); }
});
}
function aim(cx, cy) {
var e = document.elementFromPoint(cx, cy), s = e && e.closest('.iq-q'), g, o, b = null, best = 1e9;
if (!s) return null;
if (s === QS.N.sec) return { k: 'N', ul: QS.N.ul, b: QS.N.ul.firstChild };
g = e.closest('.iq-g');
if (!g) Array.prototype.forEach.call(QS.L.ul.children, (li) => { var r = li.getBoundingClientRect(), d = Math.abs(cy - (r.top + r.bottom) / 2); if (d < best) { best = d; g = li; } });
if (!g) return null;
o = QS.L.g[g.getAttribute('data-g')];
var rows = Array.prototype.filter.call(o.ul.children, (r) => r !== D.li && r !== D.slot);
if (e.closest('.iq-gh')) return { o: o, ul: o.ul, b: rows[0] || null, h: 1 };
rows.some((r) => { var q = r.getBoundingClientRect(); if (cy < q.top + q.height / 2) { b = r; return true; } return false; });
return { o: o, ul: o.ul, b: b };
}
function val(t, now) {
if (!t.o) return now;
var g = t.o.g, sib = (k) => { for (var e = D.slot[k]; e && e === D.li; e = e[k]); return e && xr(e); }, a = sib('previousElementSibling'), b = sib('nextElementSibling'), v;
if (t.h || (!a && !b)) return Math.max(C.at(g), now + DAY + 6e4);
v = a && b ? (due(a) + due(b)) / 2 : a ? due(a) + 6e4 : due(b) - 6e4;
return Math.min(g[3] ? C.at([0, 0, g[3]]) : 1e15, Math.max(C.at(g, '00:00'), now + DAY + 6e4, Math.floor(v / 6e4) * 6e4));
}
function lift(cx, cy) {
var li = D.li, r = li.getBoundingClientRect();
clearTimeout(D.p); D.on = 1; D.dx = D.x0 - r.left; D.dy = D.y0 - r.top; D.cx = cx; D.cy = cy;
D.slot = el('li', 'iq-slot'); li.parentNode.insertBefore(D.slot, li);
li.style.width = r.width + 'px'; li.classList.remove('iq-press'); li.classList.add('iq-lift'); BD.classList.add('iq-dragging');
move(); tick();
}
function move() {
var t = aim(D.cx, D.cy), now = Date.now(), on = BD.querySelectorAll('.iq-on');
D.li.style.transform = 'translate(' + (D.cx - D.dx) + 'px,' + (D.cy - D.dy) + 'px)';
Array.prototype.forEach.call(on, (e) => { e.classList.remove('iq-on'); });
D.t2 = t; D.slot.hidden = !t;
var w = !t ? '' : t.o ? fd(C.ymd(val(t, now))) + ', ' + S.clock(val(t, now)) : 'due now (' + S.clock(now + 6e4) + ')';
if (w !== D.w) { D.w = w; line('Moving #' + D.x[1] + '. ' + (w ? 'Drop: ' + w : 'Let go on a day, or over Now to make it due now') + '. Esc cancels.', null, 1); }
if (!t) return;
t.ul.insertBefore(D.slot, t.b);
(t.o ? t.o.li : QS.N.sec).classList.add('iq-on');
D.slot.textContent = 'Drop: ' + w;
}
function tick() {
if (!D || !D.on) return;
var y = D.cy, h = innerHeight, s = y < 64 ? y - 64 : y > h - 64 ? y - h + 64 : 0;
if (s) { scrollBy(0, Math.round(s * 12 / 64)); move(); }
requestAnimationFrame(tick);
}
function end(go) {
var d = D, t = d && d.on && d.t2, v = t && go ? val(t, Date.now()) : 0;
if (!d) return;
clearTimeout(d.p); clearTimeout(d.h); D = null;
d.li.classList.remove('iq-press');
if (!d.on) return;
swallow = 1;
d.li.classList.remove('iq-lift'); d.li.style.width = d.li.style.transform = ''; d.slot.remove(); BD.classList.remove('iq-dragging');
Array.prototype.forEach.call(BD.querySelectorAll('.iq-on'), (e) => { e.classList.remove('iq-on'); });
line('');
if (v) set(d.x, v); else paint();
}
document.addEventListener('pointermove', (e) => {
if (!D || e.pointerId !== D.id) return;
var m = Math.hypot(e.clientX - D.x0, e.clientY - D.y0);
if (D.on) { D.cx = e.clientX; D.cy = e.clientY; move(); } else if (D.t ? m >= 10 : m >= 4) { if (D.t) end(); else lift(e.clientX, e.clientY); }
});
document.addEventListener('pointerup', (e) => { if (D && e.pointerId === D.id) end(1); });
document.addEventListener('pointercancel', (e) => { if (D && e.pointerId === D.id && !(D.on && D.t)) end(); });
document.addEventListener('touchmove', (e) => { if (D && D.on && D.t) { e.preventDefault(); D.cx = e.touches[0].clientX; D.cy = e.touches[0].clientY; move(); } }, { passive: false });
document.addEventListener('touchend', () => { if (D && D.on && D.t) end(1); });
document.addEventListener('keydown', (e) => { if (D && e.key === 'Escape') end(); });
document.addEventListener('click', (e) => { if (swallow) { e.preventDefault(); e.stopPropagation(); swallow = 0; } }, true);
document.addEventListener('pointerdown', () => { swallow = 0; }, true);
function sheet(x, bt) {
var n = x[1], now = Date.now(), v = due(x), G = C.groups(now), d = mk(document.body, 'dialog', 'iq-sheet'), f = mk(d, 'form'), q, di, ti, nw = 0, row, sv, no;
f.method = 'dialog';
mk(f, 'h2', null, 'When is #' + n + ' due?'); mk(f, 'p', 'iq-d', OPEN[n] ? OPEN[n].title : '');
q = mk(f, 'div', 'iq-qk');
function fill(dd, tt, b, isNow) { di.value = dd; ti.value = tt; nw = isNow; Array.prototype.forEach.call(q.children, (c) => { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); }); }
var mon = G.filter((g) => g[0] === 'X')[0][2], cur = v ? C.ymd(v) : '';
[['Now', C.ymd(now), h23(now), 1], ['Tomorrow', G[0][2], ''], [cur && fd(cur), cur, v && h23(v) !== '23:59' ? h23(v) : ''], [fd(mon), mon, '']].forEach((k, i) => {
if (!k[0] || (i === 2 && (cur === G[0][2] || cur === mon))) return;
var b = mk(q, 'button', 'cv-tool', k[0]); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
b.onclick = () => { fill(k[1], k[2], b, k[3]); };
});
row = mk(f, 'div', 'iq-dt');
function inp(lb, ty) { var l = mk(row, 'label', null, lb), i = mk(l, 'input', 'iq-in'); i.type = ty; i.oninput = () => { nw = 0; }; return i; }
di = inp('Day', 'date'); ti = inp('Time, Eastern', 'time'); di.required = true;
mk(f, 'p', 'iq-note', 'Left blank, the time is the end of the day (23:59).');
row = mk(f, 'div', 'iq-sb'); no = mk(row, 'button', 'cv-tool', 'Cancel'); sv = mk(row, 'button', 'cv-tool iq-save', 'Save');
no.type = 'button'; no.onclick = () => { d.close(); };
if (cur) { di.value = cur; ti.value = h23(v) === '23:59' ? '' : h23(v); Array.prototype.forEach.call(q.children, (c) => { if (c.textContent === fd(cur) || (cur === G[0][2] && c.textContent === 'Tomorrow')) c.setAttribute('aria-pressed', 'true'); }); }
f.onsubmit = (e) => { e.preventDefault(); var t = nw ? Date.now() : window.IssueQ.et(di.value, ti.value || '23:59'); if (!di.value || !t) { di.focus(); return; } d.close(); set(x, t); };
d.onclose = () => { d.remove(); bt.focus(); };
d.showModal();
if (innerWidth >= 900) { var r = bt.getBoundingClientRect(); d.classList.add('pop'); d.style.top = Math.min(r.bottom + 6, innerHeight - d.offsetHeight - 8) + 'px'; d.style.left = Math.max(8, r.right - d.offsetWidth) + 'px'; }
}
function ready() {
if (!window.IssueQ) return;
window.IssueQ.load(repo).then((s0) => {
QST = s0;
function round() {
var qs = {}; ROWS.forEach((x) => { if (!x[0].hidden && OPEN[x[1]]) qs[x[1]] = ox(x); });
window.IssueQ.sync(QST, qs, Date.now(), false); paint(); tally();
}
round(); setInterval(round, 6e4);
});
}
function tally() {
var n = rest, a = 0, lt = 0, red = 0, now = Date.now(), Q = window.IssueQ;
ROWS.forEach((x) => { if (!x[0].hidden) { if (x.ans) a++; else if (!QST || Q.badged(x[1], ox(x), QST, now)) { n++; if (QST && Q.queue(x[1], ox(x), QST, now) === 'L') lt++; if (QST && Q.tier(x[1], ox(x), QST, now) === 'r') red++; } } });
if (ansN) ansN.textContent = String(a);
if (window.IssueCount) window.IssueCount.put(n, a, lt, red);
}
function fold() {
Array.prototype.forEach.call(document.querySelectorAll('ul[data-group]'), (ul) => {
if (Array.prototype.every.call(ul.children, (li) => li.hidden)) for (var e = ul; e && (e === ul || e.tagName !== 'UL'); e = e.previousElementSibling) { e.hidden = true; if (e.tagName === 'H2') break; }
});
}
var al = allow().then((a) => { names = a.map((x) => String(x).toLowerCase()); });
Promise.all([al, getJ(RI + '?state=open&per_page=100')]).then((res) => {
var open = {}, rows = [], shown = {}, hidden = 0;
res[1].filter((i) => !i.pull_request && !off(i)).forEach((i) => { open[i.number] = i; });
Array.prototype.forEach.call(document.querySelectorAll('li[data-nums]'), (li) => {
var ns = li.getAttribute('data-nums').split(' ').map(Number).filter((n) => open[n]);
li.getAttribute('data-nums').split(' ').forEach((n) => { shown[n] = 1; });
if (!ns.length) { li.hidden = true; hidden++; return; }
rows.push([li, ns[0], ns]);
});
var fresh = Object.keys(open).map((k) => open[k]).filter((i) => !shown[i.number] && named.indexOf(i.number) < 0 && labels(i).indexOf('unrelated') < 0 && labels(i).some((l) => KEEP.indexOf(l) >= 0));
if (fresh.length) {
var ul = document.querySelector('ul[data-group="open"]') || mk(root, 'ul', 'iq-list');
fresh.forEach((i) => { var li = ul.appendChild(row(i)); rows.push([li, i.number, [i.number]]); });
}
if (hidden) mk(root, 'p', 'iq-note', hidden + ' request' + (hidden === 1 ? '' : 's') + ' answered and closed since this page was built ' + (hidden === 1 ? 'is' : 'are') + ' hidden.');
fold();
ROWS = rows; OPEN = open;
rows.forEach((x) => { meta(x[0], open[x[1]]); });
var wait = rows.length, done = () => { if (!--wait) { tally(); ready(); } };
if (!wait) { tally(); ready(); }
rows.forEach((x) => {
var i = open[x[1]];
thread(i).then((cs) => { if (answered(i, cs[cs.length - 1] || null, inv)) { x.ans = true; place(x); } done(); }, done);
});
}, (e) => { mk(root, 'p', 'iq-warn', 'GitHub did not answer: ' + e.message + '. These rows are from the build.'); });
if (shut) al.then(() => getJ(RI + '?state=closed&per_page=100&sort=updated')).then((l) => {
l = l.filter((i) => !i.pull_request && !off(i));
var d = mk(shut, 'details', 'ny-closed'), h = mk(mk(d, 'summary'), 'h2', null, 'Closed issues ');
mk(h, 'span', 'iq-c ny-count', String(l.length));
mk(d, 'p', 'iq-note', 'Open one to read it and its replies. A follow-up from its page reopens it.' + (l.length > 99 ? ' Older ones are on GitHub.' : ''));
var ul = mk(d, 'ul', 'iq-list');
l.forEach((i) => { var li = ul.appendChild(row(i, 'Closed ' + day(i.closed_at))); li.classList.add('ny-cl'); });
}, (e) => { mk(shut, 'p', 'iq-warn', 'Could not read the closed issues: ' + e.message + '.'); });
})();
