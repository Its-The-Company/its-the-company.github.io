// Source with comments: tools/site/assets/app.js in the company repository.
(function () {
'use strict';
var API = 'https://api.github.com';
var KEY = 'company-chat-token', NAME = 'company-chat-name';
var later = setTimeout;
var stop = typeof clearTimeout === 'function' ? clearTimeout : function () {};
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function byId(id) { return document.getElementById(id); }
function on(target, ev, fn) { if (target && target.addEventListener) target.addEventListener(ev, fn); }
function getToken() { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''; }
var ALLOW = 'company.allow';
function tokenStore() { return localStorage.getItem(KEY) ? localStorage : sessionStorage; }
function parseAllow(t) {
var out = [], f = 0;
String(t || '').replace(/<!--[\s\S]*?-->/g, '').split('\n').forEach(function (l) {
l = l.replace(/^\s*([*-]\s+)?@?/, '').trim().toLowerCase();
if (/^(\x60{3}|~~~)/.test(l)) f = !f; else if (!f && l.length < 40 && /^[a-z0-9](-?[a-z0-9])*$/.test(l) && out.indexOf(l) < 0) out.push(l);
});
return out;
}
function setToken(t, remember) {
[sessionStorage, localStorage].forEach(function (s) { s.removeItem(KEY); s.removeItem(ALLOW); });
if (t) (remember ? localStorage : sessionStorage).setItem(KEY, t);
}
var onDrawn = [];
var lastSt = null, onStatus = [];
var rejected = false, onReject = [];
var NO_TOKEN = 'GitHub did not accept the token (401): nothing can be read or sent. Change it on the connect page.';
function checkAuth(r) {
if (r && r.status === 401 && !rejected && getToken()) { rejected = true; onReject.forEach(function (f) { f(); }); }
return r;
}
function hdrs() { var h = { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, t = getToken(); if (t) h['Authorization'] = 'Bearer ' + t; return h; }
function gh(path, opts) {
var h = hdrs();
if (opts && opts.etag) h['If-None-Match'] = opts.etag;
return fetch(API + path, { headers: h, cache: 'no-store' }).then(checkAuth);
}
function said(r) { return 'GitHub answered ' + r.status; }
function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function ago(iso) {
var s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000);
if (isNaN(s)) return '';
return s < 90 ? Math.round(s) + ' s' : s < 5400 ? Math.round(s / 60) + ' min' : s < 172800 ? Math.round(s / 3600) + ' h' : Math.round(s / 86400) + ' d';
}
function clock(iso) { return iso ? new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''; }
function pctText(m) {
if (!m || m.pct == null) return 'not read yet';
var r = clock(m.resets_at);
return Math.round(m.pct) + '% ' + (m.used_words || 'used') + (r ? ', resets ' + r : '');
}
function setText(id, text) { var e = byId(id); if (e && text != null) e.textContent = text; }
function list(items, fmt) { var ul = el('ul'); items.forEach(function (x) { ul.appendChild(el('li', null, fmt(x))); }); return ul; }
var toggled = false;
function showNow(box, open) {
box.hidden = !open;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); var d = b.querySelector('.dot'); if (d) d.className = 'dot ' + (open ? 'live' : 'idle'); }
}
function renderStrip(st) {
var m = st.meter || {}, q = st.queue || {};
if (m.five_hour && m.five_hour.pct != null) {
setText('s-5h', Math.round(m.five_hour.pct) + '%');
if (m.five_hour.resets_at) setText('s-5h-r', '(resets ' + clock(m.five_hour.resets_at) + ')');
}
if (m.weekly && m.weekly.pct != null) setText('s-wk', Math.round(m.weekly.pct) + '%');
if (q.runnable_count != null) setText('s-ready', String(q.runnable_count));
if (q.blocked_count != null) setText('s-blocked', String(q.blocked_count));
}
function taskLine(w) { return (w.task || '') + (w.model ? ' [' + w.model + ']' : '') + (w.started ? ', for ' + ago(w.started) : ''); }
function renderNow(box, st, source, isPublic) {
var s = st.session || {}, ws = st.workers || [];
var stale = isPublic && Date.now() - Date.parse(st.at) > 12e4;
var headLine = stale ? 'Status from the site build ' + ago(st.at) + ' ago.'
: s.active ? 'A ' + (s.kind || 'work') + ' session is running' + (s.started ? ' (started ' + ago(s.started) + ' ago).' : '.') : 'No session is running; one starts each tick.';
var head = box.querySelector ? box.querySelector('.now-head') : null;
var body = box.querySelector ? box.querySelector('.now-body') : null;
if (!body) { box.textContent = ''; box.appendChild(el('h3', null, 'Now')); head = box.appendChild(el('p', 'now-head')); body = box.appendChild(el('div', 'now-body')); }
head.textContent = headLine;
var carded = {};
var cards = box.querySelectorAll ? Array.prototype.slice.call(box.querySelectorAll('[data-worker]')) : [];
cards.forEach(function (c) {
var slug = c.getAttribute('data-worker'), w = null, k;
for (k = 0; k < ws.length; k++) if ((ws[k].name || '').toLowerCase() === slug) w = ws[k];
var t = c.querySelector('.t'), d = c.querySelector('.dot');
c.className = 'card ' + (w ? 'live' : 'idle');
if (d) d.className = 'dot ' + (w ? 'live' : 'idle');
if (t) t.textContent = w ? taskLine(w) : stale ? 'no task then' : 'idle';
if (w) carded[slug] = true;
});
body.textContent = '';
var rest = ws.filter(function (w) { return !carded[(w.name || '').toLowerCase()]; });
if (rest.length) {
body.appendChild(el('p', 'now-sub', 'Working now'));
body.appendChild(list(rest, function (w) { return cap(w.name) + ': ' + taskLine(w); }));
} else if (s.active && !ws.length && !stale) body.appendChild(el('p', 'muted', 'No worker call is running.'));
var rec = (st.recent || []).slice(0, 3);
if (rec.length) {
body.appendChild(el('p', 'now-sub', 'Just finished'));
body.appendChild(list(rec, function (w) { return cap(w.name) + ': ' + (w.task || '') + (w.finished ? ', ' + ago(w.finished) + ' ago' : ''); }));
}
var q = st.queue || {};
body.appendChild(el('p', 'now-sub', 'Queue: ' + (q.runnable_count || 0) + ' tasks ready, ' + (q.blocked_count || 0) + ' blocked'));
if ((q.runnable || []).length) body.appendChild(list(q.runnable.slice(0, 5), function (t) { return '[' + t.kind + '] ' + t.text; }));
var m = st.meter || {};
body.appendChild(el('p', null, '5-hour: ' + pctText(m.five_hour) + '. Week: ' + pctText(m.weekly) + '.'));
body.appendChild(el('p', 'muted', source + (st.at ? ' · updated ' + ago(st.at) + ' ago' : '')));
renderStrip(st);
if (!toggled) showNow(box, !!s.active && !stale);
lastSt = st; onStatus.forEach(function (f) { f(st); });
}
function nowPanel(box) {
var repo = box.getAttribute('data-repo'), etag = null, last = null, busy = false;
var b = document.querySelector && document.querySelector('.now-toggle');
if (b) b.onclick = function () { toggled = true; showNow(box, box.hidden); };
function pub(first) {
return fetch(box.getAttribute('data-status'), { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
.then(function (st) { if (first && last) return; renderNow(box, st, 'public copy, from the last site build', true); }).catch(function () {});
}
function live(force) {
if (busy || (document.hidden && force !== true)) return; busy = true;
var p = (!getToken() || !repo || rejected) ? pub() : gh('/repos/' + repo + '/actions/variables/COMPANY_STATUS', { etag: etag }).then(function (r) {
if (r.status === 304 && last) return last;
if (!r.ok) throw new Error(r.status);
etag = r.headers.get('ETag'); return r.json().then(function (v) { last = JSON.parse(v.value); return last; });
}).then(function (st) { renderNow(box, st, 'live copy, seconds old while a session runs'); }).catch(function () { etag = null; last = null; return pub(); });
p.then(function () { busy = false; }, function () { busy = false; });
}
var timer, started = false, tokenPath = getToken() && repo && !rejected;
function start() { if (started || rejected) return; started = true; timer = setInterval(live, 5000); live(true); }
onReject.push(function () { clearInterval(timer); started = true; etag = null; last = null; timer = setInterval(live, 60000); });
var frame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : later;
if (tokenPath) { pub(true); onDrawn.push(function () { frame(function () { later(start, 0); }); }); later(start, 5000); }
else { timer = setInterval(live, 60000); live(true); }
on(document, 'visibilitychange', function () { if (!document.hidden && (started || !tokenPath)) live(); });
}
function tokenBox(root) {
var repo = root.getAttribute('data-repo');
var bar = el('div', 'chat-bar'), input = el('input'); input.type = 'password'; input.autocomplete = 'off';
input.placeholder = 'Fine-grained GitHub token (github_pat_...)'; input.setAttribute('aria-label', 'GitHub token');
var remember = el('input'); remember.type = 'checkbox'; var rl = el('label', null, ' remember on this device'); rl.insertBefore(remember, rl.firstChild);
var save = el('button', 'btn primary', 'Save token'), forget = el('button', 'btn', 'Forget token'), out = el('p', 'state', '');
save.type = forget.type = 'button'; out.setAttribute('role', 'status');
[input, rl, save, forget].forEach(function (x) { bar.appendChild(x); });
root.appendChild(bar); root.appendChild(out);
function show() {
var t = getToken();
out.className = 'state'; out.textContent = t ? 'A token is saved in this browser (' + (localStorage.getItem(KEY) ? 'on this device' : 'until this tab closes') + ').' : 'No token is saved in this browser.';
}
save.onclick = function () {
var t = input.value.trim(); if (!t) { out.textContent = 'Paste the token first.'; return; }
setToken(t, remember.checked); input.value = ''; out.textContent = 'Checking the token with GitHub...';
gh('/repos/' + repo).then(function (r) {
if (!r.ok) throw new Error(said(r) + (r.status === 401 ? ' (the token was not accepted)' : r.status === 404 ? ' (the token cannot see the repository: steps 3 and 5)' : ''));
out.className = 'state sent'; out.textContent = 'Saved, and it can read the company repository. ';
var a = el('a', null, 'Go to the home page to send a message.'); a.href = root.getAttribute('data-home') || './'; out.appendChild(a);
}).catch(function (e) { out.className = 'state failed'; out.textContent = 'Saved, but it does not work yet: ' + e.message + '. Forget it and try again.'; });
};
forget.onclick = function () {
[sessionStorage, localStorage].forEach(function (s) { for (var i = s.length; i--;) { var k = s.key(i); if (/^company/.test(k || '')) s.removeItem(k); } });
show();
};
show();
}
window.CompanySite = { API: API, KEY: KEY, NAME: NAME, ALLOW: ALLOW, NO_TOKEN: NO_TOKEN, el: el, byId: byId, on: on, later: later, stop: stop,
getToken: getToken, setToken: setToken, tokenStore: tokenStore, hdrs: hdrs, gh: gh, said: said, ago: ago, checkAuth: checkAuth, parseAllow: parseAllow,
onDrawn: onDrawn, onReject: onReject, rejected: function () { return rejected; },
status: function () { return lastSt; }, onStatus: onStatus };
var n = byId('now-panel'); if (n) nowPanel(n);
var c = byId('chat-root'), t = byId('token-root');
function load(src) { var s = document.createElement('script'); s.src = src; (document.head || document.body).appendChild(s); }
var js = c && c.getAttribute('data-js'), wiz = (c || t) && (c || t).getAttribute('data-setup'), wizOn = false;
if (js && getToken()) load(js);
function setup() { if (wiz && !wizOn) { wizOn = true; load(wiz); } }
function hashSetup() { if (/^#(setup|name)/.test(location.hash || '')) setup(); }
var first = byId('first-run');
if (first && (getToken() || localStorage.getItem('company.visitor'))) first.hidden = true;
on(document, 'click', function (ev) {
var b = ev.target && ev.target.closest ? ev.target.closest('[data-start],[data-visit]') : null;
if (!b) return;
if (b.hasAttribute('data-visit')) { localStorage.setItem('company.visitor', '1'); if (first) first.hidden = true; return; }
if (wiz) { ev.preventDefault(); if (location.hash !== '#setup') location.hash = '#setup'; setup(); }
});
on(window, 'hashchange', hashSetup); hashSetup();
if (t) tokenBox(t);
})();
