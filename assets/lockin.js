// Source with comments: tools/site/assets/lockin.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document;
if (!S) return;
var fixed = D.getElementById('lockin'), cr = D.getElementById('chat-root');
var repo = (cr && cr.getAttribute('data-repo')) || (fixed && fixed.getAttribute('data-repo'));
var sent = null, posted = 0, arm = 0, armOn = null, armT = 0, sentT = 0, err = '', tiles = [];
var W = { spread: 'UNLOCK', midnight: 'LOCK IN', daily: 'LOCK IN DAILY' };
var N = { spread: 'Spread', midnight: 'Lock In until midnight', daily: 'Lock In until daily usage' }, Y = 'Sent. This changes when the company reads it, usually within 15 minutes.';
function day(x) { return new Date(x).toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); }
function today(t) { return !!t && day(t) === day(Date.now()); }
function now() {
var st = (S.status && S.status()) || {}, k = st.lock_in, f = fixed && fixed.getAttribute.bind(fixed);
var o = k ? { on: !!k.on && today(k.at || st.at), pool: k.pool, m: k.mode }
: { on: !!f && f('data-on') === '1' && today(f('data-at')), pool: f ? parseInt(f('data-pool'), 10) : 0, m: f && f('data-mode') };
o.mode = !o.on ? 'spread' : o.m === 'daily' ? 'daily' : 'midnight';
return o;
}
function mk(p, t, c, x) { var e = p.appendChild(D.createElement(t)); if (c) e.className = c; if (x) e.textContent = x; return e; }
function draw() {
var k = now(), on = k.on, n = k.pool, md = D.getElementById('lk-mode');
var lp = D.getElementById('lk-lockpace'); if (lp) lp.hidden = k.mode !== 'midnight';
if (md) md.textContent = N[k.mode];
if (sent === k.mode) { sent = null; clearTimeout(sentT); }
tiles.forEach((x) => {
var pill = x.box === fixed && fixed.hasAttribute('data-btn');
if (pill) x.box.classList.toggle('on', on);
if (x.b) x.b.textContent = on ? 'Locked in' : (pill ? 'Lock In' : 'Spread');
x.t.textContent = on ? 'Locked in ' + (k.mode === 'daily' ? 'until each account has used its share of today' : 'for today: full speed until midnight')
: 'Work is spread over the day' + (n > 0 ? ' (about ' + n + (n === 1 ? ' agent)' : ' agents)') : '');
if (!x.btn) return;
x.btn.textContent = arm ? (on ? 'Tap again to unlock' : 'Tap again to lock in') : pill ? (on ? 'Locked in' : 'Lock In') : (on ? 'Unlock' : 'Lock in');
if (pill) x.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
x.btn.setAttribute('aria-disabled', sent !== null ? 'true' : 'false');
x.note.textContent = err || (sent !== null ? (posted ? Y : 'Sending...')
: arm ? (on ? 'Tap again within 5 seconds to unlock.' : 'Tap again within 5 seconds to lock in.') : '');
});
}
function send(to) {
sent = to = to || (now().on ? 'spread' : 'midnight');
var word = W[to]; posted = 0; err = ''; draw();
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
var t = Date.now();
if (!arm) { arm = t; armOn = now().on; err = ''; draw(); armT = setTimeout(() => { arm = 0; draw(); }, 5000); return; }
if (t - arm < 400) return;
arm = 0; clearTimeout(armT);
if (now().on !== armOn) { draw(); return; }
send();
}
var fx = fixed && { box: fixed, b: fixed.querySelector('b'), t: fixed.querySelector('span') };
function button(x, row) {
if (S.getToken() && repo && !S.rejected()) {
x.btn = mk(row, 'button', 'btn'); x.btn.type = 'button'; x.btn.onclick = tap;
x.note = mk(row, 'small', 'meta cv-locknote'); x.note.setAttribute('role', 'status');
}
tiles.push(x); draw();
}
if (fx) { if (fixed.hasAttribute('data-btn')) button(fx, fixed); else tiles.push(fx); }
S.lockMode = () => now().mode;
S.lockSet = (m) => !W[m] || S.rejected() ? 'Not sent.' : sent !== null ? 'Already sent; waiting.'
: now().mode === m ? 'Already ' + N[m] + '; nothing sent.' : (send(m), Y);
if (S.onReject) S.onReject.push(() => { tiles.forEach((x) => { if (x.btn) x.btn.hidden = x.note.hidden = true; }); });
if (S.onStatus) S.onStatus.push(draw);
draw();
})();
