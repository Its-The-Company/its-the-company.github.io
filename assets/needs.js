// Source with comments: tools/site/assets/needs.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, root = document.getElementById('needs-root'), C = S && S.core, hm = root && /^#i(\d+)$/.exec(location.hash);
if (hm) location.replace(root.getAttribute('data-view') + '#' + hm[1]);
if (!C || !root || !S.getToken()) return;
var anon = document.getElementById('needs-anon'); if (anon) anon.hidden = true;
var chatTab = document.querySelector('nav.hometabs [data-chat-tab]'); if (chatTab) chatTab.hidden = false;
var repo = root.getAttribute('data-repo'), RI = C.use(repo), el = S.el, VIEW = root.getAttribute('data-view');
var answered = C.answered, day = C.day, getJ = C.getJ, allow = C.allow, thread = C.thread;
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
if (m && !m.querySelector('.ny-tag-ans')) m.insertBefore(el('span', 'tag ny-tag-ans', '✓ Answered'), m.firstChild);
x[0].classList.add('ny-ans'); ansU.appendChild(x[0]); fold();
}
function ox(x) { var i = OPEN[x[1]]; return { l: labels(i), dl: window.IssueQ.dl(i.body) }; }
function lab(v, now) {
if (!v) return ['No date', 1];
var d = new Date(v), t = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), m = Math.round((now - v) / 6e4);
if (m > 0) return [m < 60 ? m + ' min late' : m < 2880 ? Math.round(m / 60) + ' h late' : Math.round(m / 1440) + ' d late', 1];
if (d.toDateString() === new Date(now).toDateString()) return ['Due ' + t, 0];
return [d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }) + (t === '23:59' ? '' : ', ' + t), 0];
}
function qsec(k) {
var sec = el('section', 'iq-q'), h = mk(sec, 'h2', 'iq-h', k === 'N' ? 'Needs you ' : 'Later '), q = QS[k] = { sec: sec };
h.id = 'ny-q-' + k; sec.setAttribute('aria-labelledby', h.id);
q.n = mk(h, 'span', 'iq-c ny-count', '0');
mk(sec, 'p', 'iq-note', k === 'N' ? 'A deadline within 24 hours, or none. Open an issue to answer it; opening it marks it read.' : 'A deadline more than 24 hours away. It moves to Needs you by itself when the deadline is within 24 hours.');
q.ul = mk(sec, 'ul', 'iq-list'); q.ul.setAttribute('data-queue', k);
q.none = mk(sec, 'p', 'iq-empty');
mk(q.none, 'b', null, k === 'N' ? 'Nothing needs you now.' : 'Nothing is waiting for later.');
if (k === 'N') mk(q.none, 'span', null, 'New issues and anything due within a day land here.');
return sec;
}
function paint() {
var Q = window.IssueQ;
if (!QST || !Q) return;
var now = Date.now(), vis = ROWS.filter((x) => !x[0].hidden && !x.ans && OPEN[x[1]]), by = { N: [], L: [] };
if (!QS) {
QS = {}; var b = el('div', 'iq-board'), a = document.querySelector('ul[data-group="open"]');
b.appendChild(qsec('N')); b.appendChild(qsec('L'));
if (a && a.parentNode) a.parentNode.insertBefore(b, a); else root.appendChild(b);
}
vis.forEach((x) => { by[Q.queue(x[1], ox(x), QST, now)].push(x); });
['N', 'L'].forEach((k) => {
by[k].sort((a, b) => Q.due(a[1], ox(a), QST) - Q.due(b[1], ox(b), QST)).forEach((x) => {
var src = x[0].parentNode; QS[k].ul.appendChild(x[0]);
if (src && !src.hasAttribute('data-queue') && !src.children.length) { src.removeAttribute('data-group'); src.hidden = true; }
});
QS[k].n.textContent = String(by[k].length); QS[k].none.hidden = by[k].length > 0;
});
vis.forEach((x) => {
var o = ox(x), bd = Q.badged(x[1], o, QST, now), li = x[0], dot = li.querySelector('.iq-dot'), m = li.querySelector('.iq-m'), nw = li.querySelector('.iq-new');
var dt = li.querySelector('.iq-due') || mk(li, 'span', 'iq-due'), L = lab(Q.due(x[1], o, QST), now);
dt.textContent = L[0]; dt.className = 'iq-due' + (L[1] ? ' late' : ''); dt.setAttribute('aria-label', 'Deadline ' + L[0]);
if (dot) { dot.className = 'iq-dot' + (bd ? '' : ' off'); dot.title = bd ? 'New' : ''; }
if (bd && !L[1] && !nw && m) m.insertBefore(el('span', 'tag iq-new', 'New'), m.querySelector('.iq-num'));
if ((!bd || L[1]) && nw) nw.remove();
});
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
