// Source with comments: tools/site/assets/badges.js in the company repository.
(() => {
'use strict';
var S = window.CompanySite, D = document, W = window;
var MARK = '<!-- site-state -->', LS = W.localStorage;
function ids(x) { return Array.isArray(x) ? x.filter((v) => typeof v === 'string') : []; }
function merge() {
var out = [], seen = {};
[].slice.call(arguments).forEach((l) => { ids(l).forEach((v) => { if (!seen[v]) { seen[v] = 1; out.push(v); } }); });
return out;
}
function parseState(body) {
var t = String(body || '');
if (t.trim().indexOf(MARK) !== 0) return null;
try { return ids(JSON.parse(t.trim().slice(MARK.length)).seen); } catch (e) { return null; }
}
function stateBody(list) { return MARK + '\n' + JSON.stringify({ seen: list }); }
function unseen(docs, seen) { var s = {}; ids(seen).forEach((v) => { s[v] = 1; }); return docs.filter((d) => !s[d.i]); }
function under(docs, path, tab) {
return docs.filter((d) => {
var arch = d.f === 'archive' || d.f.indexOf('archive/') === 0;
if (tab && path === '') return !arch;
return path === '' || d.f === path || d.f.indexOf(path + '/') === 0;
}).length;
}
W.DocBadges = { merge: merge, parseState: parseState, stateBody: stateBody, unseen: unseen, under: under };
if (!S || !S.getToken || !S.getToken()) return;
var me = D.currentScript, base = me && me.src ? me.src.replace(/assets\/badges\.js.*$/, '') : '', basePath = '';
try { basePath = new URL(base).pathname; } catch (e) { return; }
function local(p) { var q = new URL(p, W.location.href).pathname; return q.indexOf(basePath) === 0 ? '/' + q.slice(basePath.length) : q; }
function tokKey() { var t = S.getToken(), h = 5381, k; for (k = 0; k < t.length; k++) h = ((h * 33) ^ t.charCodeAt(k)) >>> 0; return h.toString(36); }
var man = null, login = '', seen = [], remote = null, busy = false, last = 0;
function key() { return 'company.docs.seen.' + login; }
function readLocal() { try { return ids(JSON.parse(LS.getItem(key()))); } catch (e) { return []; } }
function saveLocal() { try { LS.setItem(key(), JSON.stringify(seen)); } catch (e) { /* full or blocked: the comment still holds it */ } }
function pill(n, text) {
var b = S.el('span', 'nb', text || String(n)); b.setAttribute('role', 'img'); b.setAttribute('aria-label', (n > 1 ? n + ' new' : 'New')); return b;
}
function put(host, n, text) {
var old = host.querySelector(':scope > .nb'); if (old) old.remove();
if (n > 0) host.appendChild(pill(n, text));
}
function draw() {
if (!man) return;
var fresh = unseen(man.docs, seen), byUrl = {};
fresh.forEach((d) => { byUrl[d.u] = d; });
[].slice.call(D.querySelectorAll('main a.card[href]')).forEach((a) => { put(a, byUrl[local(a.getAttribute('href'))] ? 1 : 0, 'New'); });
[].slice.call(D.querySelectorAll('a.btn.fld[href]')).forEach((a) => {
var m = /^\/documents\/(.*?)\/?$/.exec(local(a.getAttribute('href'))); if (m) put(a, under(fresh, m[1]));
});
[].slice.call(D.querySelectorAll('.doc-tabs a[href]')).forEach((a) => {
var m = /^\/documents\/(.*?)\/?$/.exec(local(a.getAttribute('href'))); if (m) put(a, under(fresh, m[1], true));
});
[].slice.call(D.querySelectorAll('header.site .tabs a[href], nav[aria-label="Company"] a[href]')).forEach((a) => {
var p = local(a.getAttribute('href')), top = !!a.closest('header.site');
if (top && p === '/reports/') put(a, under(fresh.filter((d) => d.f === 'reports'), ''));
else if ((top && p === '/company/') || (!top && p === '/documents/')) put(a, under(fresh, ''));
});
}
function opened() {
var here = local(W.location.pathname), hit = man.docs.filter((d) => d.u === here || d.u === here.replace(/index\.html$/, ''))[0];
if (hit && seen.indexOf(hit.i) < 0) { seen = merge(seen, [hit.i]); saveLocal(); return true; }
return false;
}
function json(r) { if (!r.ok) throw new Error(S.said(r)); return r.json(); }
function send(method, path, obj) { return fetch(S.API + path, { method: method, headers: Object.assign({ 'Content-Type': 'application/json' }, S.hdrs()), body: JSON.stringify(obj) }).then(S.checkAuth).then(json); }
function issueNo() {
var n = +LS.getItem('company.docs.issue');
if (n) return Promise.resolve(n);
return S.gh('/repos/' + man.repo + '/issues?labels=site-state&state=all&per_page=1').then(json).then((l) => {
n = l[0] && l[0].number; if (n) LS.setItem('company.docs.issue', String(n)); return n || 0;
});
}
function mine(list) {
return list.filter((c) => c.user && String(c.user.login).toLowerCase() === login && parseState(c.body) !== null)
.sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
}
function sync() {
if (busy || !man.repo) return Promise.resolve();
busy = true; last = Date.now();
var n = 0;
return issueNo().then((no) => {
if (!no) return null;
n = no;
return S.gh('/repos/' + man.repo + '/issues/' + n + '/comments?per_page=100').then(json);
}).then((list) => {
if (!list) return;
var mm = mine(list), got = [];
mm.forEach((c) => { got = merge(got, parseState(c.body)); });
remote = mm[0] || null;
var all = merge(seen, got);
if (all.length !== seen.length) { seen = all; saveLocal(); draw(); }
if (all.length === got.length && remote) return;
if (!all.length) return;
return remote ? send('PATCH', '/repos/' + man.repo + '/issues/comments/' + remote.id, { body: stateBody(all) })
: send('POST', '/repos/' + man.repo + '/issues/' + n + '/comments', { body: stateBody(all) }).then((c) => { remote = c; });
}).catch(() => { /* offline or rejected: the local copy keeps the views; the next page load tries again */ }).then(() => { busy = false; });
}
function who() {
var k = 'company.docs.login', c = null;
try { c = JSON.parse(LS.getItem(k)); } catch (e) { c = null; }
if (c && c.k === tokKey() && c.l) return Promise.resolve(c.l);
return S.gh('/user').then(json).then((u) => { var l = String(u.login || '').toLowerCase(); if (l) LS.setItem(k, JSON.stringify({ k: tokKey(), l: l })); return l; });
}
W.fetch(base + 'doc-new.json').then(json).then((m) => {
man = { repo: m.repo || '', docs: (m.docs || []).filter((d) => d && typeof d.i === 'string' && typeof d.u === 'string' && typeof d.f === 'string') };
return who();
}).then((l) => {
if (!l) return;
login = l; seen = readLocal();
opened(); draw();
return sync();
}).catch(() => {});
D.addEventListener('visibilitychange', () => { if (!D.hidden && man && login && Date.now() - last > 60000) sync(); });
})();
