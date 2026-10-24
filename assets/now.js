// Source with comments: tools/site/assets/now.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite; if (!S || !S.getToken()) return;
var D = document, W = window, el = S.el, ago = S.ago, pub = null, on = false, all = {}, sig = '', bs = '', br = null, sec = null, jump = 0;
function mk(p, t, c, x) { return p.appendChild(el(t, c, x)); }
function at(e, k, v) { e.setAttribute(k, v); return e; }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function Q(s) { return D.querySelector(s); }
function QA(s) { return [].slice.call(D.querySelectorAll(s)); }
function et(t, wk) { var d = new Date(t); return isNaN(d) ? '' : d.toLocaleString('en-US', { timeZone: 'America/New_York', weekday: wk ? 'short' : undefined, hour: 'numeric', minute: '2-digit' }) + ' ET'; }
function lvl(m, e) { return m ? cap(m) + (e ? ', ' + e + ' effort' : '') : ''; }
function dot(a) { return a.filter(x => x).join(' · '); }
function stt() { return (S.status && S.status()) || null; }
function stale(st) { return pub !== false && Date.now() - Date.parse(st.at) > 12e4; }
function brief() {
var st = stt() || {}, t = st.tasks || {}, c = t.count || {}, m = st.meter || {}, f = m.five_hour || {}, k = m.weekly || {},
run = t.run || [], old = !st.at || stale(st), hl = Q('.hero .latest'), p, a, n = st.next_tick && et(st.next_tick);
br.textContent = '';
if (hl) mk(br, 'p', 'cv-bp', String(hl.textContent || '').split('. ')[0].replace(/\.$/, '') + '.');
if (!old) {
run.slice(0, 5).forEach(r => { mk(br, 'p', 'cv-bm', dot([r.w, lvl(r.m, r.e), r.at && ago(r.at)])); mk(br, 'p', 'cv-bt', r.t || ''); });
if (run.length > 5) mk(br, 'p', 'cv-bm', '+' + (run.length - 5) + ' more');
if (!run.length) mk(br, 'p', null, st.session && st.session.active ? 'No worker call is running.' + (n ? ' The next tick is at ' + n + '.' : '')
: 'No session is running.' + (n ? ' The next one starts at ' + n + '.' : ''));
}
if (t.count) mk(br, 'p', 'cv-bc', (c.next || 0) + ' ready · ' + ((c.wait || 0) + (c.blocked || 0)) + ' waiting or blocked');
mk(br, 'p', 'cv-bc', '5-hour ' + (f.pct != null ? Math.round(f.pct) + '% used' + (f.resets_at ? ', resets ' + et(f.resets_at) : '') : 'not read yet')
+ (k.pct != null ? ' · week ' + Math.round(k.pct) + '%' : ''));
p = mk(br, 'p', 'cv-bl'); a = mk(p, 'a', null, 'All tasks ↓'); a.href = '#cv-tasks';
a.onclick = e => { e.preventDefault(); if (sec.hidden) { jump = 1; W.location.hash = '#t=home'; } else sec.scrollIntoView({ block: 'start' }); };
p.appendChild(D.createTextNode(' · '));
mk(p, 'a', null, 'Each worker: Company › Work').href = work();
mk(br, 'p', 'cv-bm', !st.at ? 'No status read yet.' : (pub === false ? 'Live copy, ' + ago(st.at) + ' old' : 'Public copy from the site build, ' + ago(st.at) + ' ago') + '.');
}
function work(o) { var r = Q('#chat-root'); return ((r && r.getAttribute('data-company')) || '/company/') + 'work.html' + (o ? '#' + String(o).toLowerCase() : ''); }
function tiles() {
QA('.cv-live').forEach(x => { at(at(at(x, 'role', 'button'), 'aria-controls', 'cv-brief'), 'aria-expanded', String(on)); });
}
function toggle() {
on = !on; place();
var d = Q('.cv-dock'), a, b;
if (on && d && !br.hidden) { a = br.getBoundingClientRect(); b = d.getBoundingClientRect(); if (a.left < b.right && b.left < a.right && a.bottom > b.top) W.scrollBy(0, a.bottom - b.top + 12); }
}
D.addEventListener('click', e => { var t = e.target.closest && e.target.closest('.cv-live'); if (t) { e.preventDefault(); toggle(); } });
D.addEventListener('keydown', e => { var t = e.key === ' ' && e.target.closest && e.target.closest('.cv-live'); if (t) { e.preventDefault(); toggle(); } });
var END = { limit: 'stopped at its turn limit', failed: 'failed', killed: 'stopped', cancelled: 'stopped' };
function row(ul, r, g) {
var a = mk(mk(ul, 'li'), 'a', 'tk-r'), m, p = r.p || [];
a.href = work(r.w);
mk(a, 'b', 'tk-t', r.t || '');
m = mk(a, 'span', 'tk-m');
if (r.o === 'i') { mk(m, 'span', 'chip chat', 'Investor ask' + (r.i ? ' #' + r.i : '')); m.appendChild(D.createTextNode(' ')); }
m.appendChild(D.createTextNode(dot(g === 'r' ? [r.w, lvl(r.m, r.e), r.at && ago(r.at)]
: g === 'w' ? [r.w, r.s === 'blocked' ? 'blocked' : 'waiting', r.y ? 'waits on the Investors' : '']
: g === 'd' ? [r.w, r.at && ago(r.at) + ' ago', END[r.x]] : [r.w, r.k])));
if (g === 'n' && p[1] >= 2) {
m.appendChild(D.createTextNode(' · ' + p[0] + ' of ' + p[1] + ' done '));
mk(mk(m, 'span', 'cv-meter tk-p'), 'i').style.width = Math.round(100 * p[0] / p[1]) + '%';
}
}
function group(k, h, rs, n, more, N) {
N = Math.max(N || 0, rs.length);
if (!N) return;
var ul, b;
mk(mk(sec, 'h3', 'tk-h', h + ' '), 'span', 'cv-count', String(N));
if (all[k]) n = rs.length;
if (n) { ul = at(mk(sec, 'ul', 'tk'), 'aria-label', h); rs.slice(0, n).forEach(r => { row(ul, r, k); }); }
if (rs.length > n) {
b = mk(sec, 'button', 'btn tk-more', more ? more.replace('N', N) : 'Show all ' + N); b.type = 'button';
b.onclick = () => { all[k] = 1; sig = ''; place(); };
} else if (N > rs.length) mk(mk(sec, 'p', 'tk-m'), 'a', null, (rs.length ? N - rs.length + ' more' : 'See them') + ' on Company › Work').href = work();
}
function tasks(st) {
var t = st.tasks || {}, op = t.open || [], c = t.count || {};
sec.textContent = '';
mk(mk(sec, 'h2', 'cv-sec', 'Tasks '), 'span', 'cv-count', String((c.next || 0) + (c.wait || 0) + (c.blocked || 0)));
if (!st.tasks) { mk(sec, 'p', 'muted', 'The task list arrives with the next status.'); return; }
if (!stale(st)) group('r', 'Working now', (t.run || []).slice(0, 8), 8);
group('n', 'Ready', op.filter(r => r.s === 'next'), 5, 0, c.next);
group('w', 'Waiting or blocked', op.filter(r => r.s !== 'next'), 0, 'Show N waiting or blocked', (c.wait || 0) + (c.blocked || 0));
group('d', 'Just finished', t.done || [], 3);
}
function place() {
var st = stt(), col = Q('.cv-col'), desk = W.matchMedia && W.matchMedia('(min-width:880px)').matches, gs = QA('.cv-glance'), g, home, tab, z;
if (!st || !col) return;
if (!br) { br = at(el('div', 'cv-brief'), 'id', 'cv-brief'); sec = at(at(el('section', 'cv-tasks'), 'id', 'cv-tasks'), 'aria-label', 'Tasks'); }
tiles();
g = gs.filter(x => !!(x.closest && x.closest('.cv-side')) === !!desk)[0] || gs[0];
br.hidden = !on || !g;
if (g && br.previousSibling !== g) g.parentNode.insertBefore(br, g.nextSibling);
tab = Q('.cv-tabs [role=tab]'); home = !!tab && tab.getAttribute('aria-selected') === 'true';
sec.hidden = !home;
var q = col.querySelector('.cv-queue'), d = col.querySelector('.cv-dock'), b4 = q || d;
if (b4 && sec.nextSibling !== b4) col.insertBefore(sec, b4);
var mn = Math.floor(Date.now() / 6e4);
z = JSON.stringify([st.at, st.tasks && st.tasks.run, st.tasks && st.tasks.count, st.meter, st.session, st.next_tick, pub, mn]);
if (on && !br.hidden && z !== bs) { bs = z; brief(); }
if (!on) bs = '';
z = JSON.stringify([home, st.tasks, pub, all, stale(st), mn]);
if (home && z !== sig) { sig = z; tasks(st); }
if (home && jump) { jump = 0; sec.scrollIntoView({ block: 'start' }); }
}
S.onStatus.push((st, isPub) => { pub = !!isPub; place(); });
if (W.MutationObserver) new MutationObserver(place).observe(S.byId('main') || D.body, { childList: true, subtree: true });
W.addEventListener('hashchange', place);
W.addEventListener('resize', place);
W.setInterval(place, 6e4);
place();
S.dash = { place: place, toggle: toggle };
})();
