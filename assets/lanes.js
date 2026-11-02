// Source with comments: tools/site/assets/lanes.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S) return;
var D = document, el = S.el, ago = S.ago, LIVE_MS = 42e4, LANE_MS = 27e5, read = 0, built = null;
function mk(p, t, c, x) { return p.appendChild(el(t, c, x)); }
function old(st, isPub) { return Date.now() - Date.parse(st.at) > (isPub ? 12e4 : LIVE_MS); }
function rows(st) { var p = st.personal || {}; return p.running && Date.now() - Date.parse(p.read_at) < LANE_MS ? p.running : []; }
function main(st, isPub) { return old(st, isPub) ? [] : (st.tasks || {}).run || []; }
function word(r) { return r.lane ? 'Personal: ' + (r.n || 'account ' + r.lane) : 'Main lane'; }
function level(r) { return r.m ? r.m.charAt(0).toUpperCase() + r.m.slice(1) + (r.e ? ', ' + r.e + ' effort' : '') : ''; }
function row(ul, r, work) {
var a = mk(mk(ul, 'li'), 'a', 'tk-r'), m;
a.href = work + (r.w ? '#' + String(r.w).toLowerCase() : '');
mk(a, 'b', 'tk-t', r.t || r.task || '');
m = mk(a, 'span', 'tk-m');
if (r.o === 'i') { mk(m, 'span', 'chip chat', 'Investor ask' + (r.i ? ' #' + r.i : '')); m.appendChild(D.createTextNode(' ')); }
m.appendChild(D.createTextNode([r.w, word(r), level(r), r.at && ago(r.at)].filter(x => x).join(' · ')));
}
function draw(box, st, isPub) {
var m = main(st, isPub), l = rows(st), p = st.personal || {}, s = st.session || {}, n = m.length + l.length, r = D.querySelector('#chat-root'),
work = ((r && r.getAttribute('data-company')) || '/company/') + 'work.html', ul, h;
box.textContent = '';
h = mk(box, 'h2', 'cv-sec', 'Working now '); mk(h, 'span', 'cv-count', String(n));
if (n) { ul = mk(box, 'ul', 'tk'); ul.setAttribute('aria-label', 'Working now'); m.slice(0, 8).concat(l).forEach(x => { row(ul, x, work); }); }
if (!m.length) mk(box, 'p', 'tk-m', 'Main lane: ' + (old(st, isPub) ? (st.at ? 'last status ' + ago(st.at) + ' ago.' : 'no status yet.')
: s.active ? 'a session is running, no worker call right now.' : 'between sessions.'));
mk(box, 'p', 'tk-m', 'Personal accounts: ' + (!p.read_at ? 'no reading yet.' : (l.length ? 'read ' : (p.running || []).length ? 'nothing current, last read ' : 'none running when read ') + ago(p.read_at) + ' ago.'));
}
function words(st, isPub) {
var stale = old(st, isPub), n = stale ? 0 : (st.workers || []).length, l = rows(st).length;
if (n + l) return (n + l) + ' at work' + (l ? ', ' + l + ' on a personal account' : '') + '.';
return stale ? (isPub ? 'Status from the site build ' : 'Last status ') + ago(st.at) + ' ago.'
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
S.lane = { old: old, rows: rows, main: main, word: word, draw: draw };
function seen(st, isPub) {
var e = S.byId('now-words');
if (!isPub) fromBuild(st);
if (e) e.textContent = words(st, isPub);
}
S.onStatus.unshift(seen);
if (S.status()) seen(S.status(), true);
})();
