// Source with comments: tools/site/assets/lanes.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var D = document, el = S.el, ago = S.ago, LIVE_MS = 42e4, LANE_MS = 27e5, read = 0, built = null;
function mk(p, t, c, x) { return p.appendChild(el(t, c, x)); }
function age(st) { return Date.now() - Date.parse(st.at); }
function old(st, isPub) { return age(st) > (isPub ? 12e4 : LIVE_MS); }
function rows(st) {
var p = st.personal || {}, a = {};
return p.running && Date.now() - Date.parse(p.read_at) < LANE_MS ? p.running.map(r => { var f = a[r.lane] || {}; return (a[r.lane] = Object.assign({ at: f.at, n: f.n }, r)); }) : [];
}
function main(st, isPub) {
return old(st, isPub) && !(age(st) < LANE_MS) ? [] : (st.tasks || {}).run
|| (st.workers || []).map(w => ({ w: String(w.name || '').replace(/^./, c => c.toUpperCase()), t: w.task, m: w.model, e: w.effort, at: w.started }));
}
function word(r) { return r.lane ? (r.n ? r.n + "'s account" : 'Personal account') + ' (session ' + (r.lane.slice(1) || 1) + ')' : 'Main account'; }
function level(r) { return r.m ? r.m.charAt(0).toUpperCase() + r.m.slice(1) + (r.e ? ', ' + r.e + ' effort' : '') : ''; }
function et(t) { var d = new Date(t); return isNaN(d) ? '' : d.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }) + ' ET'; }
function pl(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }
function sessions(l) { var o = {}, a = []; l.forEach(r => { var k = r.lane + r.at; if (!o[k]) a.push(o[k] = { r: r, t: [] }); o[k].t.push(r); }); return a; }
function row(ul, r, work) {
var a = mk(mk(ul, 'li'), 'a', 'tk-r'), m;
a.href = work + (r.w ? '#' + String(r.w).toLowerCase() : '');
mk(a, 'b', 'tk-t', r.t || r.task || '');
m = mk(a, 'span', 'tk-m');
if (r.o === 'i') { mk(m, 'span', 'chip chat', 'Investor ask' + (r.i ? ' #' + r.i : '')); m.appendChild(D.createTextNode(' ')); }
m.appendChild(D.createTextNode([r.w, word(r), level(r), r.at && 'started ' + et(r.at), r.lane && (r.d ? 'done' : 'not done yet')].filter(x => x).join(' · ')));
}
function draw(box, st, isPub) {
var m = main(st, isPub), l = rows(st), ss = sessions(l), p = st.personal || {}, s = st.session || {}, r = D.querySelector('#chat-root'),
work = ((r && r.getAttribute('data-company')) || '/company/') + 'work.html', ul, h, n = m.slice(0, 8).length + ss.length;
box.textContent = '';
h = mk(box, 'h2', 'cv-sec', 'Working now '); mk(h, 'span', 'cv-count', String(n));
if (m.length) { ul = mk(box, 'ul', 'tk'); ul.setAttribute('aria-label', 'Main account'); m.slice(0, 8).forEach(x => { row(ul, x, work); }); }
mk(box, 'p', 'tk-m', 'Main account: ' + (old(st, isPub) ? (st.at ? (m.length ? 'as of its last status, ' : 'last status ') + ago(st.at) + ' ago.' : 'no status yet.')
: m.length ? pl(m.length, 'call') + ' running.' : s.active ? 'a session is running, no worker call right now.' : 'between sessions.'));
ss.forEach(x => {
var d = x.t.filter(y => y.d).length;
mk(box, 'p', 'tk-m cv-sess', word(x.r) + ': ' + pl(x.t.length, 'task') + ' in this session, worked a few at a time; ' + d + ' done. Which of the rest are running now is not reported.');
ul = mk(box, 'ul', 'tk'); ul.setAttribute('aria-label', word(x.r)); x.t.forEach(y => { row(ul, y, work); });
});
mk(box, 'p', 'tk-m', 'Personal accounts: ' + (!p.read_at ? 'no reading yet.' : (l.length ? 'read ' : (p.running || []).length ? 'nothing current, last read ' : 'none running when read ') + ago(p.read_at) + ' ago.'));
}
function who(a) {
var c = {}, o = [];
a.forEach(x => { if (!x) return; if (!c[x]) { c[x] = 0; o.push(x); } c[x]++; });
return o.sort((x, y) => c[y] - c[x]).map(x => x + (c[x] > 1 ? ' ×' + c[x] : '')).join(', ');
}
function line(st, isPub, names) {
var o = old(st, isPub), m = o ? [] : main(st, isPub), l = rows(st).filter(r => !r.d), ss = sessions(l).length;
if (!m.length && !l.length) return null;
return (o ? 'main account last read ' + ago(st.at) + ' ago' : m.length + ' at work on the main account') + (ss ? ', ' + pl(l.length, 'task') + ' in ' + pl(ss, 'personal session') : '')
+ (names ? ' · ' + who(m.map(r => r.w).concat(l.map(r => r.w || word(r)))) : '');
}
function words(st, isPub) {
var w = line(st, isPub);
if (w) return w.charAt(0).toUpperCase() + w.slice(1) + '.';
return old(st, isPub) ? (isPub ? 'Status from the site build ' : 'Last status ') + ago(st.at) + ' ago.'
: (st.session || {}).active ? 'A session is running; no worker call right now.' : 'No session is running.';
}
function fromBuild(st) {
var p = st.personal || {}, box = S.byId('now-panel');
if (Date.now() - read > 6e4 && box) {
read = Date.now();
fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then((j) => { if (j && j.personal) built = j.personal; }).catch(() => {});
}
if (!p.running && built && built.running) st.personal = Object.assign({}, p, { running: built.running, read_at: built.read_at });
}
S.lane = { old: old, rows: rows, main: main, word: word, draw: draw, line: line, et: et };
function seen(st, isPub) {
var e = S.byId('now-words');
if (!isPub) fromBuild(st);
if (e) e.textContent = words(st, isPub);
}
S.onStatus.unshift(seen);
if (S.status()) seen(S.status(), true);
})();
