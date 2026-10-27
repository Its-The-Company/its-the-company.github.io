// Source with comments: tools/site/assets/lockin.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document;
if (!S) return;
var fixed = D.getElementById('lockin'), cr = D.getElementById('chat-root');
var repo = (cr && cr.getAttribute('data-repo')) || (fixed && fixed.getAttribute('data-repo'));
var sent = null, posted = 0, arm = 0, armT = 0, sentT = 0, err = '', tiles = [];
function day(x) { return new Date(x).toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); }
function now() {
var st = (S.status && S.status()) || {}, k = st.lock_in;
if (k) return { on: !!k.on && (!st.at || day(st.at) === day(Date.now())), pool: k.pool };
return { on: !!fixed && fixed.getAttribute('data-on') === '1', pool: fixed ? parseInt(fixed.getAttribute('data-pool'), 10) : 0 };
}
function mk(p, t, c, x) { var e = p.appendChild(D.createElement(t)); if (c) e.className = c; if (x) e.textContent = x; return e; }
function draw() {
var k = now(), on = k.on, n = k.pool;
if (sent !== null && sent === on) { sent = null; clearTimeout(sentT); }
tiles = tiles.filter((x) => x.box === fixed || (x.box.isConnected ? (x.in = 1) : !x.in));
tiles.forEach((x) => {
if (x.b) x.b.textContent = on ? 'Locked in' : 'Spread';
x.t.textContent = on ? 'Locked in for today: full speed until midnight'
: 'Work is spread over the day' + (n > 0 ? ' (about ' + n + (n === 1 ? ' agent)' : ' agents)') : '');
if (!x.btn) return;
x.btn.textContent = arm ? (on ? 'Tap again to unlock' : 'Tap again to lock in') : (on ? 'Unlock' : 'Lock in');
x.btn.disabled = sent !== null;
x.note.textContent = err || (sent === null ? '' : posted ? 'Sent. This changes when the company reads it, usually within 15 minutes.' : 'Sending...');
x.note.hidden = !x.note.textContent;
});
}
function send() {
var word = now().on ? 'UNLOCK' : 'LOCK IN';
sent = word === 'LOCK IN'; posted = 0; err = ''; draw();
S.gh('/repos/' + repo + '/issues?labels=main&state=open&per_page=5').then((r) => {
if (!r.ok) throw new Error(S.said(r));
return r.json();
}).then((a) => {
var i = (a || []).filter((x) => !x.pull_request)[0];
if (!i) throw new Error('no open Chat thread found');
var h = S.hdrs(); h['Content-Type'] = 'application/json';
return fetch(S.API + '/repos/' + repo + '/issues/' + i.number + '/comments', { method: 'POST', headers: h, body: JSON.stringify({ body: word }) }).then(S.checkAuth);
}).then((r) => {
if (!r.ok) throw new Error(S.said(r) + (r.status === 403 || r.status === 404 ? ' (does the token have Issues: read and write?)' : ''));
sentT = setTimeout(() => { if (sent !== null) { sent = null; err = 'No change yet. The company may not have read it; see Chat.'; draw(); } }, 12e5);
posted = 1; draw();
}).catch((e) => { sent = null; err = 'Not sent: ' + (e && e.message ? e.message : 'network error') + '.'; draw(); });
}
function tap() {
if (sent !== null || S.rejected()) return;
if (!arm) { arm = 1; err = ''; draw(); armT = setTimeout(() => { arm = 0; draw(); }, 5000); return; }
arm = 0; clearTimeout(armT); send();
}
if (fixed) tiles.push({ box: fixed, b: fixed.querySelector('b'), t: fixed.querySelector('span') });
function button(x, row) {
if (S.getToken() && repo && !S.rejected()) {
x.btn = mk(row, 'button', 'btn'); x.btn.type = 'button'; x.btn.onclick = tap;
x.note = mk(row, 'small', 'meta'); x.note.setAttribute('role', 'status');
}
tiles.push(x); draw();
}
S.lockTile = (g, before) => {
var box = D.createElement('div'); box.className = 'cv-tile cv-lock'; g.insertBefore(box, before || null);
mk(box, 'small', null, 'Lock in');
var x = { box: box, b: mk(box, 'b'), t: mk(box, 'span', 'cv-sub') };
button(x, mk(box, 'p'));
};
S.lockHead = (h) => {
var box = mk(h, 'span', 'cv-lockbar'), x = { box: box, t: mk(box, 'small', 'meta') };
button(x, box);
};
[].slice.call(D.querySelectorAll('.cv-glance')).forEach((g) => { if (!g.querySelector('.cv-lock')) S.lockTile(g, g.querySelector('.cv-live')); });
[].slice.call(D.querySelectorAll('.cv-view > .cv-head')).forEach((h) => { if (!h.querySelector('.chip') && !h.querySelector('.cv-lockbar')) S.lockHead(h); });
if (S.onReject) S.onReject.push(() => { tiles.forEach((x) => { if (x.btn) x.btn.hidden = x.note.hidden = true; }); });
if (S.onStatus) S.onStatus.push(draw);
draw();
})();
