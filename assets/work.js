// Source with comments: tools/site/assets/work.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document, box = D.getElementById('wk-live');
if (!S || !box) return;
var repo = box.getAttribute('data-repo'), built = box.getAttribute('data-built'), etag = null, last = null, busy = 0,
src = box.querySelector('.wk-src'), ul = box.querySelector('ul'), el = S.el, ago = S.ago;
var LABEL = { running: ['Working now', 'run', 'Now'], next: ['Up next', 'q', 'First up'], blocked: ['Blocked', 'wait', 'Waiting on'], idle: ['Idle', 'done', 'Now'] };
function mk(p, t, c, x) { return p.appendChild(el(t, c, x)); }
function et(t) { var d = new Date(t); return isNaN(d) ? '' : d.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }) + ' ET'; }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function lvl(m, e) { return m ? cap(m) + (e ? ', ' + e + ' effort' : '') : ''; }
function pub(t, who) {
t = String(t || '').replace(/\[([^\]\n]{1,300})\]\([^)\s]*\)/g, '$1').replace(/\s*\([^()]{0,60}#\d+[^()]{0,60}\)/g, '')
.replace(/\b[ci]\d{6,20}\b/g, '').replace(/https?:\/\/\S+/g, '').replace(/#\d+/g, '')
.replace(/\b(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|io|net|dev|app|ai)\/\S*/gi, '').replace(/^\s*\[\w+\]\s*/, '');
if (who) t = t.replace(new RegExp('^' + who + '\\b[:,]?\\s*', 'i'), '');
return t.replace(/\(\s*[,;]?\s*\)/g, '').replace(/\s+([,.;:)])/g, '$1').replace(/\s+/g, ' ').trim();
}
function since(t) { return t ? 'started ' + et(t) + ' (' + ago(t) + ' ago)' : ''; }
function draw(st, live) {
var at = st && st.at, s = (st && st.session) || {}, fresh = live && s.active && Date.now() - Date.parse(at) < 36e4,
lanes = (st && st.lanes) || [], run = ((st && st.tasks) || {}).run || [], seen = {}, rows = [];
ul.textContent = '';
box.classList.toggle('on', !!fresh);
if (fresh) {
run.forEach(r => { seen[String(r.w).toLowerCase()] = 1; rows.push([r.w, r.t, r.m, r.e, r.at]); });
lanes.forEach(l => { if (l.state === 'running' && !seen[String(l.name).toLowerCase()]) rows.push([l.name, l.task, l.model, l.effort, l.since]); });
rows.forEach(r => {
var li = mk(ul, 'li', 'wk-i ready'), m = mk(li, 'p', 'wk-m');
mk(m, 'b', null, cap(r[0]));
m.appendChild(D.createTextNode(' ' + [lvl(r[2], r[3]), since(r[4])].filter(x => x).join(' · ')));
mk(li, 'p', null, pub(r[1], r[0]));
});
if (!rows.length) mk(ul, 'li', 'wk-i', 'A session is running; no worker call is running this moment.');
src.textContent = 'Live, from the company’s status, updated ' + ago(at) + ' ago. Cards and queue below: board as of ' + et(built) + ', ' + ago(built) + ' ago.';
lanes.forEach(card);
} else {
src.textContent = (live && !s.active ? 'No session is running now. ' : '') + 'Live status not available here' + (S.getToken() ? '' : ' without a token') +
'. Below: the board and the last status as of the site build, ' + et(built) + ' (' + ago(built) + ' ago).';
}
box.hidden = false;
if (st && !live && Date.parse(at) - Date.parse(built) > 6e4) { var a = mk(mk(ul, 'li', 'wk-i'), 'a', null, 'The site was rebuilt ' + ago(at) + ' ago; reload for the newer board.'); a.href = location.pathname; }
}
function card(l) {
var c = D.getElementById(String(l.name).toLowerCase()), L = LABEL[l.state] || LABEL.idle, ch, n, sm;
if (!c || !c.classList.contains('wk-lane')) return;
ch = c.querySelector('.wk-h .chip'); n = c.querySelector('.wk-now');
if (ch) { ch.className = 'chip ' + L[1]; ch.textContent = ''; mk(ch, 'span', 'dot ' + (l.state === 'running' ? 'live' : 'idle')); ch.appendChild(D.createTextNode(L[0])); }
if (n && l.task) {
n.textContent = ''; mk(n, 'span', 'wk-k', L[2]); n.appendChild(D.createTextNode(pub(l.task, l.name)));
sm = [l.model || '', l.state === 'running' ? since(l.since) : ''].filter(x => x).join(' · ');
if (sm) mk(n, 'small', null, sm);
}
}
function read() {
if (busy || D.hidden) return; busy = 1;
var tok = S.getToken() && repo && !S.rejected();
var p = tok ? S.gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(r => {
if (r.status === 304 && last) return last;
if (!r.ok) throw new Error(r.status);
etag = r.headers.get('ETag'); return r.json().then(v => (last = JSON.parse(v.value)));
}).then(st => draw(st, 1)) : Promise.reject();
p.catch(() => { etag = null; return fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(r => r.json()).then(st => draw(st, 0), () => draw(null, 0)); })
.then(() => { busy = 0; }, () => { busy = 0; });
}
read();
setInterval(read, S.getToken() ? 15e3 : 6e4);
D.addEventListener('visibilitychange', read);
S.work = { draw: draw, pub: pub };  // test hook
})();
